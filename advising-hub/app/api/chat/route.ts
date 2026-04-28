import { programs } from "@/lib/program-data";
import { getPrisma } from "@/lib/prisma";
import { demoProfile, rankedPrograms } from "@/lib/recommendations";

type ChatRequest = {
  message?: string;
  threadId?: string | null;
};

function localAdvisorResponse(message: string) {
  const lowered = message.toLowerCase();
  const ranked = rankedPrograms();
  const mentionedProgram =
    programs.find((program) => lowered.includes(program.title.toLowerCase())) ??
    programs.find((program) => lowered.includes(program.slug.replaceAll("-", " "))) ??
    (lowered.includes("marcon")
      ? programs.find((program) => program.slug === "marcon-fellows")
      : undefined);
  const target = mentionedProgram ?? ranked[0].program;

  const match = ranked.find((item) => item.program.id === target.id);
  const reasons = match?.reasons.slice(0, 3).join("; ");
  const deadline = target.deadline ? ` The listed deadline is ${target.deadline}.` : "";

  return `${target.title} has a ${match?.score ?? 70}% profile match for ${
    demoProfile.name
  }. It is eligible for ${target.eligibleClassYears.join(", ")} and the listed periods are ${target.periods.join(
    ", ",
  )}.${deadline} ${
    target.fundingTypes.length
      ? `Funding or compensation: ${target.fundingTypes.join(", ")}.`
      : "No compensation is listed yet."
  } ${reasons ? `Fit rationale: ${reasons}.` : ""}`;
}

async function askOpenAI(message: string) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  const context = programs
    .map(
      (program) =>
        `${program.title}: deadline=${program.deadline ?? "not listed"}; periods=${program.periods.join(
          ", ",
        )}; eligible=${program.eligibleClassYears.join(", ")}; colleges=${program.colleges.join(
          ", ",
        )}; funding=${program.fundingTypes.join(", ") || "none listed"}; credit=${
          program.creditAvailable ? "yes" : "no"
        }; description=${program.description}`,
    )
    .join("\n\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are the LU360 Advising Hub. Give concise, grounded advising answers using only the supplied program and student profile context. Mention uncertainty when data is missing.",
        },
        {
          role: "user",
          content: `Student profile: ${JSON.stringify(
            demoProfile,
          )}\n\nPrograms:\n${context}\n\nStudent question: ${message}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    output_text?: string;
    output?: Array<{
      content?: Array<{ text?: string }>;
    }>;
  };

  return (
    payload.output_text ??
    payload.output?.flatMap((item) => item.content ?? []).find((item) => item.text)
      ?.text ??
    null
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequest;
  const message = body.message?.trim();

  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const prisma = await getPrisma();
  let chatThreadId = body.threadId ?? null;

  try {
    if (prisma) {
      const thread = chatThreadId
        ? await prisma.chatThread.findUnique({ where: { id: chatThreadId } })
        : await prisma.chatThread.create({
            data: { title: message.slice(0, 80) },
          });

      chatThreadId = thread?.id ?? chatThreadId;

      if (chatThreadId) {
        await prisma.chatMessage.create({
          data: { chatThreadId, role: "USER", content: message },
        });
      }
    }
  } catch {
    chatThreadId = body.threadId ?? null;
  }

  const aiResponse = (await askOpenAI(message)) ?? localAdvisorResponse(message);

  try {
    if (prisma && chatThreadId) {
      await prisma.chatMessage.create({
        data: { chatThreadId, role: "ASSISTANT", content: aiResponse },
      });
    }
  } catch {
    // Chat should stay usable even if persistence is temporarily unavailable.
  }

  return Response.json({
    response: aiResponse,
    threadId: chatThreadId,
  });
}
