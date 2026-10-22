import { programs, type ProgramRecord } from "@/lib/program-data";
import { prisma as db } from "@/lib/prisma-client";
import {
  evaluateProgramEligibility,
  rankedPrograms,
  type StudentProfile,
} from "@/lib/recommendations";
import { authOptions } from "@/lib/auth";
import { getProgramRecords } from "@/lib/program-records";
import { ChatRole, RecommendationSource } from "@prisma/client";
import { getServerSession } from "next-auth";

type ChatRequest = {
  message?: string;
  threadId?: string | null;
};

type RecommendationReference = {
  slug: string;
  reason: string;
};

type AdvisorResult = {
  reply: string;
  recommendations: RecommendationReference[];
};

type ChatRecommendation = {
  program: ProgramRecord;
  reason: string;
};

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
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
  organizationId: string;
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

const ADVISOR_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    reply: {
      type: "string",
      description: "The student-facing answer, formatted as Markdown.",
    },
    recommendations: {
      type: "array",
      description:
        "Programs explicitly recommended in the reply. Leave empty for factual answers that do not recommend a program.",
      items: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "An exact slug from the supplied program catalog.",
          },
          reason: {
            type: "string",
            description: "One short reason this program fits the student.",
          },
        },
        required: ["slug", "reason"],
        additionalProperties: false,
      },
    },
  },
  required: ["reply", "recommendations"],
  additionalProperties: false,
} as const;

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
- Make sure students know this is a website to find programs. They need to click the "Access Database" button or the "View Program" tab to see the program information.

Response rules:
- Provide correct and accurate information grounded in the supplied program catalog.
- Format the reply field in Markdown so it displays cleanly.
- Recommend only programs from the supplied catalog and use their exact slugs.
- Include one short reason for every recommended program.
- Leave recommendations empty when the reply only answers a factual question and does not recommend a program.
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

export async function GET(request: Request) {
  const threadId = new URL(request.url).searchParams.get("threadId")?.trim();

  if (!threadId) {
    return Response.json({ error: "Thread ID is required." }, { status: 400 });
  }

  try {
    const student = await getSessionStudent();

    if (!student) {
      return Response.json({ error: "Authentication is required." }, { status: 401 });
    }

    const thread = await db.chatThread.findFirst({
      where: { id: threadId, studentId: student.id },
      select: {
        id: true,
        messages: {
          where: { role: { in: [ChatRole.USER, ChatRole.ASSISTANT] } },
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: { id: true, role: true, content: true },
        },
      },
    });

    if (!thread) {
      return Response.json({ error: "Conversation not found." }, { status: 404 });
    }

    return Response.json({
      threadId: thread.id,
      messages: thread.messages.map((message) => ({
        id: message.id,
        role: message.role === ChatRole.USER ? "user" : "assistant",
        content: message.content,
      })),
    });
  } catch {
    return Response.json(
      { error: "Unable to load the conversation." },
      { status: 503 },
    );
  }
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

function sentenceCase(value: string) {
  return value ? `${value[0].toUpperCase()}${value.slice(1)}` : value;
}

const RECOMMENDATION_INTENT_PATTERNS = [
  /\brecommend(?:ed|ing|ations?)?\b/i,
  /\bsuggest(?:ed|ing|ions?)?\b/i,
  /\b(?:find|show|list)\s+(?:me\s+)?(?:a\s+|some\s+)?(?:funded\s+|paid\s+)?(?:research\s+)?(?:programs?|opportunities)\b/i,
  /\b(?:which|what)\s+(?:programs?|opportunities)\s+(?:should|would|could|might|do)\b/i,
  /\bwhat\s+should\s+i\s+(?:apply\s+to|join|choose)\b/i,
  /\b(?:best|good|strong)\s+(?:fit|match)\b/i,
  /\b(?:programs?|opportunities)\s+(?:for\s+me|that\s+(?:fit|match))\b/i,
];

function isRecommendationRequest(message: string) {
  return RECOMMENDATION_INTENT_PATTERNS.some((pattern) =>
    pattern.test(message),
  );
}

function validateRecommendations(
  recommendations: RecommendationReference[],
  catalog: ProgramRecord[],
): ChatRecommendation[] {
  const programsBySlug = new Map(
    catalog.map((program) => [program.slug.toLowerCase(), program]),
  );
  const seenSlugs = new Set<string>();
  const validated: ChatRecommendation[] = [];

  for (const recommendation of recommendations) {
    const slug = recommendation.slug.trim().toLowerCase();
    const reason = recommendation.reason.trim();
    const program = programsBySlug.get(slug);

    if (!program || !reason || seenSlugs.has(slug)) {
      continue;
    }

    seenSlugs.add(slug);
    validated.push({ program, reason });
  }

  return validated;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseAdvisorResult(value: string | null): AdvisorResult | null {
  if (!value) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (
      !isRecord(parsed) ||
      typeof parsed.reply !== "string" ||
      !Array.isArray(parsed.recommendations)
    ) {
      return null;
    }

    const reply = parsed.reply.trim();
    const recommendations: RecommendationReference[] = [];

    if (!reply) {
      return null;
    }

    for (const recommendation of parsed.recommendations) {
      if (
        !isRecord(recommendation) ||
        typeof recommendation.slug !== "string" ||
        typeof recommendation.reason !== "string"
      ) {
        return null;
      }

      recommendations.push({
        slug: recommendation.slug,
        reason: recommendation.reason,
      });
    }

    return { reply, recommendations };
  } catch {
    return null;
  }
}

function extractResponseText(payload: OpenAIResponsePayload) {
  return (
    payload.output_text ??
    payload.output
      ?.flatMap((item) => item.content ?? [])
      .find((item) => typeof item.text === "string")?.text ??
    null
  );
}

async function persistAssistantResult({
  student,
  profile,
  chatThreadId,
  reply,
  recommendations,
}: {
  student: ChatStudent | null;
  profile: StudentProfile;
  chatThreadId: string | null;
  reply: string;
  recommendations: ChatRecommendation[];
}) {
  const shouldSaveRecommendations = Boolean(
    student && recommendations.length > 0,
  );

  if (!chatThreadId && !shouldSaveRecommendations) {
    return;
  }

  await db.$transaction(async (transaction) => {
    if (chatThreadId) {
      await transaction.chatMessage.create({
        data: { chatThreadId, role: "ASSISTANT", content: reply },
      });
    }

    if (!student || recommendations.length === 0) {
      return;
    }

    const databasePrograms = await transaction.program.findMany({
      where: {
        organizationId: student.organizationId,
        slug: {
          in: recommendations.map(({ program }) => program.slug),
        },
      },
      select: { id: true, slug: true },
    });
    const programsBySlug = new Map(
      databasePrograms.map((program) => [program.slug, program]),
    );
    const generatedAt = new Date();

    for (const recommendation of recommendations) {
      const program = programsBySlug.get(recommendation.program.slug);

      if (!program) {
        continue;
      }

      const eligibility = evaluateProgramEligibility(
        recommendation.program,
        profile,
      );

      await transaction.studentProgramRecommendation.upsert({
        where: {
          studentId_programId_source: {
            studentId: student.id,
            programId: program.id,
            source: RecommendationSource.CHAT,
          },
        },
        update: {
          explanation: recommendation.reason,
          eligibilityPassed: eligibility.eligible,
          eligibilityReason: eligibility.reason,
          generatedAt,
          ...(chatThreadId ? { chatThreadId } : {}),
        },
        create: {
          studentId: student.id,
          programId: program.id,
          source: RecommendationSource.CHAT,
          chatThreadId,
          explanation: recommendation.reason,
          eligibilityPassed: eligibility.eligible,
          eligibilityReason: eligibility.reason,
          generatedAt,
        },
      });

      if (chatThreadId) {
        await transaction.chatThreadProgram.upsert({
          where: {
            chatThreadId_programId: {
              chatThreadId,
              programId: program.id,
            },
          },
          update: {},
          create: { chatThreadId, programId: program.id },
        });
      }
    }
  });
}

function localAdvisorResponse(
  message: string,
  profile: StudentProfile = generalStudentProfile,
  catalog: ProgramRecord[] = programs,
): AdvisorResult {
  const lowered = message.toLowerCase();
  const shouldRecommend = isRecommendationRequest(message);
  const ranked = rankedPrograms(profile, catalog);
  const topMatch = ranked[0];

  if (!topMatch) {
    return {
      reply:
        "I couldn't find any programs in the current catalog. Please check Lehigh360 for the latest program information.",
      recommendations: [],
    };
  }

  const mentionedProgram =
    catalog.find((program) => lowered.includes(program.title.toLowerCase())) ??
    catalog.find((program) =>
      lowered.includes(program.slug.replaceAll("-", " ")),
    ) ??
    (lowered.includes("marcon")
      ? catalog.find((program) => program.slug === "marcon-fellows")
      : undefined);
  const hasProfile = hasPersonalProfile(profile);
  let match = topMatch;

  if (mentionedProgram) {
    match =
      ranked.find((item) => item.program.id === mentionedProgram.id) ??
      topMatch;
  } else if (shouldRecommend && hasProfile) {
    match = ranked.find((item) => item.eligible) ?? topMatch;
  }

  const target = match.program;
  const reasons = hasProfile ? match.reasons.slice(0, 3) : [];
  const fitRationale = reasons.join("; ");
  let recommendationReason =
    "A starting point from the current program catalog; share your profile for a personalized eligibility check.";

  if (hasProfile && !match.eligible) {
    recommendationReason = `Not currently eligible. ${match.eligibilityReason}`;
  } else if (fitRationale) {
    recommendationReason = `${sentenceCase(fitRationale)}.`;
  } else if (mentionedProgram) {
    recommendationReason = "Matches the program requested in this conversation.";
  } else if (hasProfile) {
    recommendationReason =
      "A strong starting point from the current program catalog.";
  }

  const profileMatchSummary = match.eligible
    ? `This program has a **${match.score}% profile match** for ${profile.name}.`
    : `This program matches some of your interests, but you are **not currently eligible**. ${match.eligibilityReason}`;
  const shouldReturnRecommendation = Boolean(
    shouldRecommend && (!hasProfile || mentionedProgram || match.eligible),
  );
  let responseSummary = "Here are the current program details.";

  if (shouldRecommend && hasProfile) {
    responseSummary = profileMatchSummary;
  } else if (shouldRecommend) {
    responseSummary =
      "Here is a starting recommendation from the current program catalog. Share your profile for a personalized eligibility check.";
  }

  const reply = `## ${target.title}

${responseSummary}

- **Eligibility:** ${target.eligibleClassYears.join(", ") || "Not listed"}
- **Period:** ${
    target.periods.join(", ") || "Not listed"
  }${target.deadline ? `\n- **Deadline:** ${target.deadline}` : ""}
- **Funding / compensation:** ${
    target.fundingTypes.length
      ? target.fundingTypes.join(", ")
      : "No compensation is listed yet."
  }

${shouldRecommend && fitRationale ? `**${match.eligible ? "Fit rationale" : "Interest alignment"}:** ${fitRationale}.` : ""}

This hub helps you find programs. To see the official program information, use **Access Database** or **View Program** in Lehigh360.`;

  return {
    reply,
    recommendations: shouldReturnRecommendation
      ? [{ slug: target.slug, reason: recommendationReason }]
      : [],
  };
}

async function askOpenAI(
  message: string,
  catalog: ChatProgramContext[],
  profile: StudentProfile,
): Promise<AdvisorResult | null> {
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
        text: {
          format: {
            type: "json_schema",
            name: "advisor_response",
            strict: true,
            schema: ADVISOR_RESPONSE_SCHEMA,
          },
        },
      }),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as OpenAIResponsePayload;
    return parseAdvisorResult(extractResponseText(payload));
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
  let confirmedChatThreadId: string | null = null;

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
    confirmedChatThreadId = thread.id;
  } catch {
    chatThreadId = body.threadId ?? null;
  }

  const { programs: programRecords } = await getProgramRecords("chat API");
  const programCatalog = programRecords.map(localProgramToContext);
  const advisorResult =
    (await askOpenAI(message, programCatalog, profile)) ??
    localAdvisorResponse(message, profile, programRecords);
  const recommendations = validateRecommendations(
    advisorResult.recommendations,
    programRecords,
  );

  try {
    await persistAssistantResult({
      student,
      profile,
      chatThreadId: confirmedChatThreadId,
      reply: advisorResult.reply,
      recommendations,
    });
  } catch (error) {
    console.warn(
      "[LU360_RECOMMENDATION_PERSISTENCE_FAILED] Unable to save the assistant response or its recommended programs.",
      error,
    );
  }

  return Response.json({
    response: advisorResult.reply,
    threadId: chatThreadId,
    recommendations,
  });
}
