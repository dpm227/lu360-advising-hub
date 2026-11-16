import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { parseProgramParticipationInput } from "@/lib/program-participation";
import {
  findOrCreateProgram,
  serializeProgramParticipation,
  upsertProgramParticipation,
} from "@/lib/program-participation-service";
import { prisma } from "@/lib/prisma-client";

type InteractionRequest = {
  action?: "save" | "unsave" | "hide" | "unhide" | "participate";
  participation?: unknown;
};

type RouteContext = {
  params: Promise<{ slug: string }>;
};

async function getProgramState(studentId: string, programId: string) {
  const [savedProgram, hiddenProgram, participation] = await Promise.all([
    prisma.studentSavedProgram.findUnique({
      where: { studentId_programId: { studentId, programId } },
      select: { id: true },
    }),
    prisma.studentHiddenProgram.findUnique({
      where: { studentId_programId: { studentId, programId } },
      select: { id: true },
    }),
    prisma.studentProgramParticipation.findUnique({
      where: { studentId_programId: { studentId, programId } },
      include: { program: { select: { slug: true, title: true } } },
    }),
  ]);

  return {
    saved: Boolean(savedProgram),
    hidden: Boolean(hiddenProgram),
    participation: participation
      ? serializeProgramParticipation(participation)
      : null,
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

  if (
    !action ||
    !["save", "unsave", "hide", "unhide", "participate"].includes(action)
  ) {
    return Response.json({ error: "Action is required." }, { status: 400 });
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: { id: true, organizationId: true },
  });

  if (!student) {
    return Response.json(
      { error: "Sign in again to set up your student profile." },
      { status: 409 },
    );
  }
  const program = await findOrCreateProgram(slug, student.organizationId);

  if (!program) {
    return Response.json({ error: "Program was not found." }, { status: 404 });
  }

  if (action === "participate") {
    const parsed = parseProgramParticipationInput(body.participation);

    if ("error" in parsed) {
      return Response.json({ error: parsed.error }, { status: 400 });
    }

    await upsertProgramParticipation({
      studentId: student.id,
      organizationId: student.organizationId,
      programSlug: slug,
      input: parsed.data,
    });
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
