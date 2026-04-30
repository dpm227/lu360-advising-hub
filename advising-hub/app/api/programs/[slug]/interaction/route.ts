import { getServerSession } from "next-auth";
import { programs } from "@/lib/program-data";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma-client";
import { ensureStudentForUser } from "@/lib/student-profile";

type InteractionRequest = {
  action?: "save" | "unsave" | "hide" | "unhide";
};

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function deadlineToDate(deadline?: string) {
  return deadline ? new Date(`${deadline}T00:00:00Z`) : null;
}

async function findOrCreateProgram(slug: string, organizationId: string) {
  const existing = await prisma.program.findFirst({
    where: { organizationId, slug },
    select: { id: true },
  });

  if (existing) {
    return existing;
  }

  const localProgram = programs.find((program) => program.slug === slug);

  if (!localProgram) {
    return null;
  }

  return prisma.program.create({
    data: {
      organizationId,
      title: localProgram.title,
      slug: localProgram.slug,
      sourceUrl: localProgram.sourceUrl,
      website: localProgram.website,
      contact: localProgram.contact,
      descriptionText: localProgram.description,
      timeline: localProgram.timeline,
      durationLabel: localProgram.duration,
      deadlineDate: deadlineToDate(localProgram.deadline),
      creditAvailable: localProgram.creditAvailable,
      workStudyOffered: localProgram.workStudyOffered,
      financialAidAvailable: localProgram.financialAidAvailable,
      gpaMinimumRequired: localProgram.gpaMinimumRequired,
      gpaRequirement: localProgram.gpaRequirement,
      applicationUrl: localProgram.applicationUrl,
      periods: localProgram.periods,
      fundingTypes: localProgram.fundingTypes,
      keywords: localProgram.keywords,
      imageUrl: localProgram.imageUrl,
      featured: Boolean(localProgram.featured),
    },
    select: { id: true },
  });
}

async function getProgramState(studentId: string, programId: string) {
  const [savedProgram, hiddenProgram] = await Promise.all([
    prisma.studentSavedProgram.findUnique({
      where: { studentId_programId: { studentId, programId } },
      select: { id: true },
    }),
    prisma.studentHiddenProgram.findUnique({
      where: { studentId_programId: { studentId, programId } },
      select: { id: true },
    }),
  ]);

  return {
    saved: Boolean(savedProgram),
    hidden: Boolean(hiddenProgram),
  };
}

export async function POST(request: Request, context: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return Response.json({ error: "Sign in is required." }, { status: 401 });
  }

  const body = (await request.json()) as InteractionRequest;
  const { slug } = await context.params;
const action = body.action;

  if (!action || !["save", "unsave", "hide", "unhide"].includes(action)) {
    return Response.json({ error: "Action is required." }, { status: 400 });
  }

  const student = await ensureStudentForUser({
    id: session.user.id,
    email: session.user.email,
    name: session.user.name ?? null,
  });
  const program = await findOrCreateProgram(slug, student.organizationId);

  if (!program) {
    return Response.json({ error: "Program was not found." }, { status: 404 });
  }

  if (action === "save") {
    await prisma.studentSavedProgram.upsert({
      where: { studentId_programId: { studentId: student.id, programId: program.id } },
      update: {},
      create: { studentId: student.id, programId: program.id },
    });
    await prisma.studentHiddenProgram.deleteMany({
      where: { studentId: student.id, programId: program.id },
    });
  }

  if (action === "unsave") {
    await prisma.studentSavedProgram.deleteMany({
      where: { studentId: student.id, programId: program.id },
    });
  }

  if (action === "hide") {
    await prisma.studentHiddenProgram.upsert({
      where: { studentId_programId: { studentId: student.id, programId: program.id } },
      update: {},
      create: { studentId: student.id, programId: program.id },
    });
    await prisma.studentSavedProgram.deleteMany({
      where: { studentId: student.id, programId: program.id },
    });
  }

  if (action === "unhide") {
    await prisma.studentHiddenProgram.deleteMany({
      where: { studentId: student.id, programId: program.id },
    });
  }

  return Response.json(await getProgramState(student.id, program.id));
}
