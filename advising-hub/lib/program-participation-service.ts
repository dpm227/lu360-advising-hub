import { programs } from "@/lib/program-data";
import type {
  ProgramParticipationInput,
  StudentProgramExperience,
} from "@/lib/program-participation";
import { prisma } from "@/lib/prisma-client";

const participationInclude = {
  program: { select: { slug: true, title: true } },
} as const;

function deadlineToDate(deadline?: string) {
  return deadline ? new Date(`${deadline}T00:00:00Z`) : null;
}

export function serializeProgramParticipation(participation: {
  status: ProgramParticipationInput["status"];
  term: string | null;
  reflection: string | null;
  liked: boolean | null;
  program: { slug: string; title: string };
}): StudentProgramExperience {
  return {
    programSlug: participation.program.slug,
    programTitle: participation.program.title,
    status: participation.status,
    term: participation.term,
    reflection: participation.reflection,
    liked: participation.liked,
  };
}

export async function findOrCreateProgram(
  slug: string,
  organizationId: string,
) {
  const existing = await prisma.program.findUnique({
    where: { organizationId_slug: { organizationId, slug } },
    select: { id: true },
  });

  if (existing) {
    return existing;
  }

  const localProgram = programs.find((program) => program.slug === slug);

  if (!localProgram) {
    return null;
  }

  return prisma.program.upsert({
    where: { organizationId_slug: { organizationId, slug } },
    update: {},
    create: {
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

export async function upsertProgramParticipation({
  studentId,
  organizationId,
  programSlug,
  input,
}: {
  studentId: string;
  organizationId: string;
  programSlug: string;
  input: ProgramParticipationInput;
}) {
  const program = await findOrCreateProgram(programSlug, organizationId);

  if (!program) {
    return null;
  }

  return prisma.studentProgramParticipation.upsert({
    where: {
      studentId_programId: { studentId, programId: program.id },
    },
    update: input,
    create: { studentId, programId: program.id, ...input },
    include: participationInclude,
  });
}

export async function deleteProgramParticipation({
  studentId,
  organizationId,
  programSlug,
}: {
  studentId: string;
  organizationId: string;
  programSlug: string;
}) {
  const program = await prisma.program.findUnique({
    where: { organizationId_slug: { organizationId, slug: programSlug } },
    select: { id: true },
  });

  if (!program) {
    return;
  }

  await prisma.studentProgramParticipation.deleteMany({
    where: { studentId, programId: program.id },
  });
}
