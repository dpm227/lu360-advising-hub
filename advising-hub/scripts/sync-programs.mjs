import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { programs } from "../lib/program-data.ts";

if (!process.env.DATABASE_URL) {
  console.error("[LU360_PROGRAM_SYNC] DATABASE_URL is required.");
  process.exit(1);
}

const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

function deadlineToDate(deadline) {
  return deadline ? new Date(`${deadline}T00:00:00Z`) : null;
}

async function getOrCreateOrganization() {
  return prisma.organization.upsert({
    where: { domain: "lehigh.edu" },
    update: {},
    create: {
      name: "Lehigh University",
      domain: "lehigh.edu",
      orgSlug: "lehigh_university",
    },
  });
}

async function syncProgramRelations(programId, organizationId, program) {
  await Promise.all([
    prisma.programCollege.deleteMany({ where: { programId } }),
    prisma.programEligibleClassYear.deleteMany({ where: { programId } }),
    prisma.programOpportunityType.deleteMany({ where: { programId } }),
    prisma.programSdgTag.deleteMany({ where: { programId } }),
  ]);

  for (const name of program.colleges) {
    const college = await prisma.college.upsert({
      where: { organizationId_name: { organizationId, name } },
      update: {},
      create: { organizationId, name },
    });

    await prisma.programCollege.create({
      data: { programId, collegeId: college.id },
    });
  }

  for (const name of program.eligibleClassYears) {
    const classYear = await prisma.classYear.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    await prisma.programEligibleClassYear.create({
      data: { programId, classYearId: classYear.id },
    });
  }

  for (const name of program.opportunityTypes) {
    const opportunityType = await prisma.opportunityType.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    await prisma.programOpportunityType.create({
      data: { programId, opportunityTypeId: opportunityType.id },
    });
  }

  for (const name of program.sdgTags) {
    const sdgTag = await prisma.sdgTag.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    await prisma.programSdgTag.create({
      data: { programId, sdgTagId: sdgTag.id },
    });
  }
}

async function syncPrograms() {
  if (programs.length === 0) {
    throw new Error("Expected at least one program to sync, found 0.");
  }

  console.info(
    `[LU360_PROGRAM_SYNC] Syncing ${programs.length} programs from lib/program-data.ts to the database.`,
  );

  const organization = await getOrCreateOrganization();
  const activeSlugs = programs.map((program) => program.slug);
  let syncedCount = 0;

  for (const program of programs) {
    const syncedProgram = await prisma.program.upsert({
      where: {
        organizationId_slug: {
          organizationId: organization.id,
          slug: program.slug,
        },
      },
      update: {
        title: program.title,
        sourceUrl: program.sourceUrl,
        website: program.website,
        contact: program.contact,
        descriptionText: program.description,
        timeline: program.timeline,
        durationLabel: program.duration,
        deadlineDate: deadlineToDate(program.deadline),
        creditAvailable: program.creditAvailable,
        workStudyOffered: program.workStudyOffered,
        financialAidAvailable: program.financialAidAvailable,
        gpaMinimumRequired: program.gpaMinimumRequired,
        gpaRequirement: program.gpaRequirement,
        applicationUrl: program.applicationUrl,
        periods: program.periods,
        fundingTypes: program.fundingTypes,
        keywords: program.keywords,
        imageUrl: program.imageUrl,
        featured: program.featured ?? false,
        isActive: true,
      },
      create: {
        organizationId: organization.id,
        title: program.title,
        slug: program.slug,
        sourceUrl: program.sourceUrl,
        website: program.website,
        contact: program.contact,
        descriptionText: program.description,
        timeline: program.timeline,
        durationLabel: program.duration,
        deadlineDate: deadlineToDate(program.deadline),
        creditAvailable: program.creditAvailable,
        workStudyOffered: program.workStudyOffered,
        financialAidAvailable: program.financialAidAvailable,
        gpaMinimumRequired: program.gpaMinimumRequired,
        gpaRequirement: program.gpaRequirement,
        applicationUrl: program.applicationUrl,
        periods: program.periods,
        fundingTypes: program.fundingTypes,
        keywords: program.keywords,
        imageUrl: program.imageUrl,
        featured: program.featured ?? false,
        isActive: true,
      },
    });

    await syncProgramRelations(syncedProgram.id, organization.id, program);
    syncedCount += 1;
  }

  const deactivatedPrograms = await prisma.program.updateMany({
    where: {
      organizationId: organization.id,
      slug: { notIn: activeSlugs },
      isActive: true,
    },
    data: { isActive: false },
  });

  console.info(
    `[LU360_PROGRAM_SYNC] Synced ${syncedCount} programs to the database and deactivated ${deactivatedPrograms.count} missing programs.`,
  );
}

syncPrograms()
  .catch((error) => {
    console.error("[LU360_PROGRAM_SYNC] Program sync failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
