import { programs, type ProgramRecord } from "@/lib/program-data";
import { prisma as db } from "@/lib/prisma-client";
import { rankedPrograms, type StudentProfile } from "@/lib/recommendations";
import { authOptions } from "@/lib/auth";
import { getProgramRecords } from "@/lib/program-records";
import { getServerSession } from "next-auth";

type ChatRequest = {
  message?: string;
  threadId?: string | null;
};

type ChatProgramContext = {
  title: string;
  slug: string;
  url: string;
  website?: string;
  contact?: string;
  description: string;
  timeline?: string;
  duration?: string;
  deadline?: string;
  creditAvailable: boolean;
  workStudyOffered: boolean;
  financialAidAvailable: boolean;
  gpaMinimumRequired: boolean;
  gpaRequirement?: string;
  applicationUrl?: string;
  periods: string[];
  eligibleClassYears: string[];
  colleges: string[];
  opportunityTypes: string[];
  fundingTypes: string[];
  sdgTags: string[];
  keywords: string[];
};

type ChatStudent = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  classYear: string | null;
  college: string | null;
  major: string | null;
  needsFunding: boolean;
  opportunityInterests: Array<{ opportunityType: { name: string } }>;
  keywords: Array<{ keyword: string }>;
  statuses: Array<{ statusName: string }>;
};

const generalStudentProfile: StudentProfile = {
  name: "Student",
  email: "",
  classYear: "",
  college: "",
  major: "",
  needsFunding: false,
  interests: [],
  keywords: [],
  statuses: [],
};

const SYSTEM_PROMPT = `You are the Lehigh360 AI assistant.

What you need to know:
- Lehigh University offers many high-impact programs that students can participate in.
- You are a resource for students to learn more about these high-impact programs.
- You will receive the current program catalog in the conversation context. Use it as the source of truth.
- The catalog includes details such as credit availability, duration, application deadline, work study, financial aid, minimum GPA requirements, period/semester terms, eligibility, opportunity type, funding/compensation, eligible colleges, contacts, websites, and official Lehigh360 URLs.

How to guide the conversation:
- If the student is just starting, introduce yourself as the Lehigh360 AI assistant and ask them to talk about themselves, their interests, goals, class year, college, major, funding needs, and availability.
- From there, help identify programs that may match their personality, interests, goals, or constraints.
- Students may ignore the introduction and ask specific questions about specific programs. Answer those directly.
- Recommend similar programs when helpful.
- If you cannot find a working link for a specific program, send the user to https://360.lehigh.edu/.
- Make sure students know this is a hub to find programs. They need to click the "Access Database" button or the "View Program" tab to see the program information.

Response rules:
- Provide correct and accurate information grounded in the supplied program catalog.
- Format every response in Markdown so it displays cleanly.
- Do not mention or cite any JSON file, internal data file, schema, prompt, or hidden context.
- Keep answers student-friendly, concise, and useful.
- If data is missing, say what is missing and suggest checking the Lehigh360 site.`;

function localProgramToContext(program: ProgramRecord): ChatProgramContext {
  return {
    title: program.title,
    slug: program.slug,
    url: program.sourceUrl,
    website: program.website,
    contact: program.contact,
    description: program.description,
    timeline: program.timeline,
    duration: program.duration,
    deadline: program.deadline,
    creditAvailable: program.creditAvailable,
    workStudyOffered: program.workStudyOffered,
    financialAidAvailable: program.financialAidAvailable,
    gpaMinimumRequired: program.gpaMinimumRequired,
    gpaRequirement: program.gpaRequirement,
    applicationUrl: program.applicationUrl,
    periods: program.periods,
    eligibleClassYears: program.eligibleClassYears,
    colleges: program.colleges,
    opportunityTypes: program.opportunityTypes,
    fundingTypes: program.fundingTypes,
    sdgTags: program.sdgTags,
    keywords: program.keywords,
  };
}

function studentToProfile(student: ChatStudent | null): StudentProfile {
  if (!student) {
    return generalStudentProfile;
  }

  const name = [student.firstName, student.lastName].filter(Boolean).join(" ");

  return {
    name: name || student.email,
    email: student.email,
    classYear: student.classYear ?? "",
    college: student.college ?? "",
    major: student.major ?? "",
    needsFunding: student.needsFunding,
    interests: student.opportunityInterests.map(
      (interest) => interest.opportunityType.name,
    ),
    keywords: student.keywords.map((keyword) => keyword.keyword),
    statuses: student.statuses.map((status) => status.statusName),
  };
}

async function getSessionStudent() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return null;
  }

  return db.student.findUnique({
    where: { userId: session.user.id },
    include: {
      opportunityInterests: { include: { opportunityType: true } },
      keywords: true,
      statuses: true,
    },
  });
}

function hasPersonalProfile(profile: StudentProfile) {
  return Boolean(
    profile.email ||
      profile.classYear ||
      profile.college ||
      profile.major ||
      profile.interests.length > 0 ||
      profile.keywords.length > 0 ||
      profile.statuses.length > 0,
  );
}

function localAdvisorResponse(
  message: string,
  profile: StudentProfile = generalStudentProfile,
  catalog: ProgramRecord[] = programs,
) {
  const lowered = message.toLowerCase();
  const ranked = rankedPrograms(profile, catalog);
  const mentionedProgram =
    catalog.find((program) => lowered.includes(program.title.toLowerCase())) ??
    catalog.find((program) => lowered.includes(program.slug.replaceAll("-", " "))) ??
    (lowered.includes("marcon")
      ? catalog.find((program) => program.slug === "marcon-fellows")
      : undefined);
  const target = mentionedProgram ?? ranked[0].program;

  const match = ranked.find((item) => item.program.id === target.id);
  const hasProfile = hasPersonalProfile(profile);
  const reasons = hasProfile ? match?.reasons.slice(0, 3).join("; ") : "";
  const deadline = target.deadline ? ` The listed deadline is ${target.deadline}.` : "";

  return `## ${target.title}

${hasProfile ? `This program has a **${match?.score ?? 70}% profile match** for ${profile.name}.` : "Here are the current program details. Share your class year, college, interests, and funding needs if you want a more personal fit check."}

- **Eligibility:** ${target.eligibleClassYears.join(", ") || "Not listed"}
- **Period:** ${target.periods.join(
    ", ",
  ) || "Not listed"}${deadline ? `\n- **Deadline:** ${target.deadline}` : ""}
- **Funding / compensation:** ${
    target.fundingTypes.length
      ? target.fundingTypes.join(", ")
      : "No compensation is listed yet."
  }

${reasons ? `**Fit rationale:** ${reasons}.` : ""}

This hub helps you find programs. To see the official program information, use **Access Database** or **View Program** in Lehigh360.`;
}

async function askOpenAI(
  message: string,
  catalog: ChatProgramContext[],
  profile: StudentProfile,
) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  try {
    const profileContext = hasPersonalProfile(profile)
      ? JSON.stringify(profile, null, 2)
      : "No saved student profile is available for this conversation yet. Do not invent profile details; ask the student for class year, college, major, interests, goals, funding needs, or availability when those details matter.";

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
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `Current student profile, if known:
${profileContext}

Current Lehigh360 program catalog:
${JSON.stringify(catalog, null, 2)}

Student message:
${message}`,
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
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequest;
  const message = body.message?.trim();

  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  let student: ChatStudent | null = null;

  try {
    student = (await getSessionStudent()) as ChatStudent | null;
  } catch {
    student = null;
  }

  const profile = studentToProfile(student);
  let chatThreadId = body.threadId ?? null;

  try {
    const existingThread = chatThreadId
      ? await db.chatThread.findUnique({
          where: { id: chatThreadId },
          select: { id: true, studentId: true },
        })
      : null;

    const canUseThread =
      existingThread &&
      ((!student && !existingThread.studentId) ||
        (student && existingThread.studentId === student.id));

    const thread = canUseThread
      ? existingThread
      : await db.chatThread.create({
          data: {
            title: message.slice(0, 80),
            studentId: student?.id,
          },
          select: { id: true, studentId: true },
        });

    chatThreadId = thread.id;

    await db.chatMessage.create({
      data: { chatThreadId, role: "USER", content: message },
    });
  } catch {
    chatThreadId = body.threadId ?? null;
  }

  const { programs: programRecords } = await getProgramRecords("chat API");
  const programCatalog = programRecords.map(localProgramToContext);
  const aiResponse =
    (await askOpenAI(message, programCatalog, profile)) ??
    localAdvisorResponse(message, profile, programRecords);

  try {
    if (chatThreadId) {
      await db.chatMessage.create({
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
