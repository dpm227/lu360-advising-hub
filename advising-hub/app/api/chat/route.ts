import { programs, type ProgramRecord } from "@/lib/program-data";
import { prisma as db } from "@/lib/prisma-client";
import {
  evaluateProgramEligibility,
  rankedPrograms,
  scoreProgram,
  type StudentProfile,
} from "@/lib/recommendations";
import { authOptions } from "@/lib/auth";
import { getProgramRecords } from "@/lib/program-records";
import {
  hasGeographicConstraint,
  programMatchesRequestedRegion,
  recommendationLimitForMessage,
} from "@/lib/chat-recommendation-policy";
import { ChatRole, RecommendationSource } from "@prisma/client";
import { getServerSession } from "next-auth";
import {
  type StudentProgramExperience,
  excludesProgramFromRecommendations,
  parseProgramParticipationInput,
  programParticipationStatusLabels,
} from "@/lib/program-participation";
import {
  type ChatProfileUpdate,
  detectProgramParticipationUpdates,
} from "@/lib/chat-profile-updates";

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
  profileUpdates?: ProfileUpdateReference[];
};

type ProfileUpdateReference = {
  kind: "PROGRAM_PARTICIPATION";
  programSlug: string;
  status: StudentProgramExperience["status"];
  term: string | null;
  reflection: string | null;
  liked: boolean | null;
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
  programParticipations: Array<{
    status: StudentProgramExperience["status"];
    term: string | null;
    reflection: string | null;
    liked: boolean | null;
    program: { slug: string; title: string };
  }>;
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
    profileUpdates: {
      type: "array",
      description:
        "Past or current program participation explicitly stated by the student. These are pending updates that require confirmation in the UI. Leave empty for questions, hypotheticals, or inferred participation.",
      items: {
        type: "object",
        properties: {
          kind: {
            type: "string",
            enum: ["PROGRAM_PARTICIPATION"],
          },
          programSlug: {
            type: "string",
            description: "An exact slug from the supplied program catalog.",
          },
          status: {
            type: "string",
            enum: [
              "APPLIED",
              "ACCEPTED",
              "IN_PROGRESS",
              "COMPLETED",
              "DECLINED",
            ],
          },
          term: { type: ["string", "null"] },
          reflection: { type: ["string", "null"] },
          liked: { type: ["boolean", "null"] },
        },
        required: [
          "kind",
          "programSlug",
          "status",
          "term",
          "reflection",
          "liked",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["reply", "recommendations", "profileUpdates"],
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
- Only recommend programs when the student explicitly asks for recommendations or suitable programs. Factual questions about a program should not create new recommendations.
- Use the student's supplied participation history when it is available. Never recommend a program marked In progress or Completed, but you may reference a positive completed experience when explaining a similar recommendation.
- When the student clearly states that they applied to, were accepted to, are participating in, completed, or were declined from a catalog program, add a PROGRAM_PARTICIPATION item to profileUpdates and ask them to confirm it in the UI. Never claim the update was already saved.
- Leave profileUpdates empty for questions, hypothetical plans, recommendations, or participation you merely inferred. Use the exact catalog slug and preserve only term, reflection, or positive/negative sentiment that the student explicitly stated.
- If you cannot find a working link for a specific program, send the user to https://360.lehigh.edu/.
- Make sure students know this is a website to find programs. They need to click the "Access Database" button or the "View Program" tab to see the program information.

Response rules:
- Provide correct and accurate information grounded in the supplied program catalog.
- Format the reply field in Markdown so it displays cleanly.
- Recommend only programs from the supplied catalog and use their exact slugs.
- Include one short reason for every recommended program.
- Recommend only programs that fit the student's stated constraints, including location. Honor a requested number of programs; otherwise include the relevant matches without a fixed count.
- When the student asks you to recommend one named program, do not add other programs.
- Leave recommendations empty when the reply only answers a factual question.
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

function studentToExperiences(
  student: ChatStudent | null,
): StudentProgramExperience[] {
  return (
    student?.programParticipations.map((participation) => ({
      programSlug: participation.program.slug,
      programTitle: participation.program.title,
      status: participation.status,
      term: participation.term,
      reflection: participation.reflection,
      liked: participation.liked,
    })) ?? []
  );
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
      programParticipations: {
        include: { program: { select: { slug: true, title: true } } },
        orderBy: { updatedAt: "desc" },
      },
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

function validateProfileUpdates(
  updates: ProfileUpdateReference[],
  catalog: ProgramRecord[],
): ChatProfileUpdate[] {
  const programsBySlug = new Map(
    catalog.map((program) => [program.slug.toLowerCase(), program]),
  );
  const seenSlugs = new Set<string>();
  const validated: ChatProfileUpdate[] = [];

  for (const update of updates) {
    const slug = update.programSlug.trim().toLowerCase();
    const program = programsBySlug.get(slug);
    const parsed = parseProgramParticipationInput(update);

    if (!program || seenSlugs.has(slug) || "error" in parsed) {
      continue;
    }

    seenSlugs.add(slug);
    validated.push({
      kind: "PROGRAM_PARTICIPATION",
      programSlug: program.slug,
      programTitle: program.title,
      ...parsed.data,
    });
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
      !Array.isArray(parsed.recommendations) ||
      !Array.isArray(parsed.profileUpdates)
    ) {
      return null;
    }

    const reply = parsed.reply.trim();
    const recommendations: RecommendationReference[] = [];
    const profileUpdates: ProfileUpdateReference[] = [];

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

    for (const update of parsed.profileUpdates) {
      if (
        !isRecord(update) ||
        update.kind !== "PROGRAM_PARTICIPATION" ||
        typeof update.programSlug !== "string"
      ) {
        return null;
      }

      const parsedParticipation = parseProgramParticipationInput(update);

      if ("error" in parsedParticipation) {
        return null;
      }

      profileUpdates.push({
        kind: "PROGRAM_PARTICIPATION",
        programSlug: update.programSlug.trim(),
        ...parsedParticipation.data,
      });
    }

    return { reply, recommendations, profileUpdates };
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
  replaceActiveRecommendations,
}: {
  student: ChatStudent | null;
  profile: StudentProfile;
  chatThreadId: string | null;
  reply: string;
  recommendations: ChatRecommendation[];
  replaceActiveRecommendations: boolean;
}) {
  if (!chatThreadId && (!student || !replaceActiveRecommendations)) {
    return;
  }

  await db.$transaction(async (transaction) => {
    if (chatThreadId) {
      await transaction.chatMessage.create({
        data: { chatThreadId, role: "ASSISTANT", content: reply },
      });
    }

    if (!student || !replaceActiveRecommendations) {
      return;
    }

    await transaction.studentProgramRecommendation.updateMany({
      where: {
        studentId: student.id,
        source: RecommendationSource.CHAT,
        isActive: true,
      },
      data: { isActive: false },
    });

    if (recommendations.length === 0) {
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
          isActive: true,
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
          isActive: true,
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
  experiences: StudentProgramExperience[] = [],
): AdvisorResult {
  const lowered = message.toLowerCase();
  const recommendationLimit = recommendationLimitForMessage(
    message,
    catalog.map((program) => program.title),
  );
  const shouldRecommend = recommendationLimit !== 0;
  const detectedProfileUpdates = detectProgramParticipationUpdates(
    message,
    catalog,
  );

  if (detectedProfileUpdates.length > 0) {
    return {
      reply: `I understood that you marked ${detectedProfileUpdates
        .map(
          (update) =>
            `**${update.programTitle}** as **${programParticipationStatusLabels[update.status]}**`,
        )
        .join(" and ")}. Please confirm below before I add this to your profile.`,
      recommendations: [],
      profileUpdates: detectedProfileUpdates,
    };
  }

  const ranked = rankedPrograms(profile, catalog, experiences);
  const topMatch = ranked[0];
  const mentionedProgram =
    catalog.find((program) => lowered.includes(program.title.toLowerCase())) ??
    catalog.find((program) =>
      lowered.includes(program.slug.replaceAll("-", " ")),
    ) ??
    (lowered.includes("marcon")
      ? catalog.find((program) => program.slug === "marcon-fellows")
      : undefined);

  if (!topMatch && !mentionedProgram) {
    return {
      reply:
        "I couldn't find any new programs to recommend in the current catalog. Please check Lehigh360 for the latest program information.",
      recommendations: [],
    };
  }

  const hasProfile = hasPersonalProfile(profile);

  const hasLocationConstraint = hasGeographicConstraint(message);

  if (
    shouldRecommend &&
    !mentionedProgram &&
    (hasLocationConstraint || (recommendationLimit !== null && recommendationLimit > 1))
  ) {
    const matchingPrograms = ranked
      .filter(({ program }) =>
        programMatchesRequestedRegion(message, program),
      )
      .filter(({ eligible }) => !profile.classYear || !profile.college || eligible)
      .slice(0, recommendationLimit ?? undefined);

    if (matchingPrograms.length === 0) {
      return {
        reply: "I couldn't verify a program that fits your request and profile in the current catalog. Please check Lehigh360 for the latest requirements.",
        recommendations: [],
      };
    }

    return {
      reply: `I found these programs in the current catalog that may fit your request:\n\n${matchingPrograms
        .map(({ program, reasons }) =>
          `- **${program.title}** — ${reasons.slice(0, 2).join("; ") || "check the official listing for details"}.`,
        )
        .join("\n")}\n\nCheck each official Lehigh360 listing for current details and eligibility.`,
      recommendations: matchingPrograms.map(({ program, reasons }) => ({
        slug: program.slug,
        reason: reasons.slice(0, 2).join("; ") || "Matches the request.",
      })),
    };
  }

  let match = topMatch ?? scoreProgram(mentionedProgram!, profile);
  const mentionedExperience = mentionedProgram
    ? experiences.find(
        (experience) => experience.programSlug === mentionedProgram.slug,
      )
    : undefined;

  if (mentionedProgram) {
    match =
      ranked.find((item) => item.program.id === mentionedProgram.id) ??
      scoreProgram(mentionedProgram, profile);
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
    shouldRecommend &&
      (!hasProfile || mentionedProgram || match.eligible) &&
      !(
        mentionedExperience &&
        excludesProgramFromRecommendations(mentionedExperience.status)
      ),
  );
  let responseSummary = "Here are the current program details.";

  if (mentionedExperience) {
    responseSummary = `You marked this program as **${programParticipationStatusLabels[mentionedExperience.status]}**${mentionedExperience.term ? ` for ${mentionedExperience.term}` : ""}.`;
  } else if (shouldRecommend && hasProfile) {
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
  experiences: StudentProgramExperience[],
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

Student program participation history:
${experiences.length > 0 ? JSON.stringify(experiences, null, 2) : "No program participation history is saved."}

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
  const experiences = studentToExperiences(student);
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
  const recommendationLimit = recommendationLimitForMessage(
    message,
    programRecords.map((program) => program.title),
  );
  const isRecommendationRequest = recommendationLimit !== 0;
  const aiResult = await askOpenAI(
    message,
    programCatalog,
    profile,
    experiences,
  );
  const validatedAiRecommendations = aiResult
    ? validateRecommendations(aiResult.recommendations, programRecords)
    : [];
  const historyFilteredAiRecommendations = validatedAiRecommendations.filter(
    ({ program }) =>
      !experiences.some(
        (experience) =>
          experience.programSlug === program.slug &&
          excludesProgramFromRecommendations(experience.status),
      ),
  );
  const filteredAiRecommendations = historyFilteredAiRecommendations
    .filter(({ program }) => programMatchesRequestedRegion(message, program))
    .slice(0, recommendationLimit ?? undefined);
  const recommendationsRemovedForHistory = Boolean(
    isRecommendationRequest &&
      validatedAiRecommendations.length !==
        historyFilteredAiRecommendations.length,
  );
  const shouldUseLocalFallback = Boolean(
    aiResult &&
      (recommendationsRemovedForHistory ||
        (isRecommendationRequest &&
          hasGeographicConstraint(message) &&
          aiResult.recommendations.length > 0 &&
          filteredAiRecommendations.length === 0)),
  );
  const advisorResult =
    aiResult && !shouldUseLocalFallback
      ? aiResult
      : localAdvisorResponse(message, profile, programRecords, experiences);
  const recommendations = !isRecommendationRequest
    ? []
    : advisorResult === aiResult
      ? filteredAiRecommendations
      : validateRecommendations(advisorResult.recommendations, programRecords)
          .filter(
            ({ program }) =>
              !experiences.some(
                (experience) =>
                  experience.programSlug === program.slug &&
                  excludesProgramFromRecommendations(experience.status),
              ),
          )
          .slice(0, recommendationLimit ?? undefined);
  const profileUpdates = validateProfileUpdates(
    advisorResult.profileUpdates ?? [],
    programRecords,
  );

  try {
    await persistAssistantResult({
      student,
      profile,
      chatThreadId: confirmedChatThreadId,
      reply: advisorResult.reply,
      recommendations,
      replaceActiveRecommendations: isRecommendationRequest,
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
    profileUpdates,
  });
}
