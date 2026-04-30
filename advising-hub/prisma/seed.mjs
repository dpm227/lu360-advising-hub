import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { programs } from "../lib/program-data.ts";

const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

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

async function main() {
  const organization = await getOrCreateOrganization();

  for (const name of [
    "First Year",
    "Sophomore",
    "Junior",
    "Senior",
    "Graduate Student",
  ]) {
    await prisma.classYear.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const program of programs) {
    const createdProgram = await prisma.program.upsert({
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
        deadlineDate: program.deadline ? new Date(`${program.deadline}T00:00:00Z`) : null,
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
        deadlineDate: program.deadline ? new Date(`${program.deadline}T00:00:00Z`) : null,
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
      },
    });

    for (const name of program.colleges) {
      const college = await prisma.college.upsert({
        where: {
          organizationId_name: {
            organizationId: organization.id,
            name,
          },
        },
        update: {},
        create: { organizationId: organization.id, name },
      });
      await prisma.programCollege.upsert({
        where: {
          programId_collegeId: {
            programId: createdProgram.id,
            collegeId: college.id,
          },
        },
        update: {},
        create: { programId: createdProgram.id, collegeId: college.id },
      });
    }

    for (const name of program.eligibleClassYears) {
      const classYear = await prisma.classYear.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      await prisma.programEligibleClassYear.upsert({
        where: {
          programId_classYearId: {
            programId: createdProgram.id,
            classYearId: classYear.id,
          },
        },
        update: {},
        create: { programId: createdProgram.id, classYearId: classYear.id },
      });
    }

    for (const name of program.opportunityTypes) {
      const opportunityType = await prisma.opportunityType.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      await prisma.programOpportunityType.upsert({
        where: {
          programId_opportunityTypeId: {
            programId: createdProgram.id,
            opportunityTypeId: opportunityType.id,
          },
        },
        update: {},
        create: {
          programId: createdProgram.id,
          opportunityTypeId: opportunityType.id,
        },
      });
    }

    for (const name of program.sdgTags) {
      const sdgTag = await prisma.sdgTag.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      await prisma.programSdgTag.upsert({
        where: {
          programId_sdgTagId: {
            programId: createdProgram.id,
            sdgTagId: sdgTag.id,
          },
        },
        update: {},
        create: { programId: createdProgram.id, sdgTagId: sdgTag.id },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
