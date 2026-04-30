import { programs, type ProgramRecord } from "@/lib/program-data";
import { getPrisma } from "@/lib/prisma";

type DbProgramRecord = {
  id: string;
  title: string;
  slug: string;
  sourceUrl: string;
  website?: string | null;
  contact?: string | null;
  descriptionText: string;
  timeline?: string | null;
  durationLabel?: string | null;
  deadlineDate?: Date | string | null;
  creditAvailable: boolean;
  workStudyOffered: boolean;
  financialAidAvailable: boolean;
  gpaMinimumRequired: boolean;
  gpaRequirement?: string | null;
  applicationUrl?: string | null;
  periods: string[];
  fundingTypes: string[];
  keywords: string[];
  imageUrl?: string | null;
  featured: boolean;
  colleges?: Array<{ college?: { name?: string } }>;
  eligibleClassYears?: Array<{ classYear?: { name?: string } }>;
  opportunityTypes?: Array<{ opportunityType?: { name?: string } }>;
  sdgTags?: Array<{ sdgTag?: { name?: string } }>;
};

type ProgramRecordsResult = {
  programs: ProgramRecord[];
  source: "database" | "program-data";
};

const programInclude = {
  eligibleClassYears: { include: { classYear: true } },
  colleges: { include: { college: true } },
  opportunityTypes: { include: { opportunityType: true } },
  sdgTags: { include: { sdgTag: true } },
} as const;

function warnFallback(context: string, reason: unknown) {
  console.warn(
    `[LU360_PROGRAM_DATA_FALLBACK] ${context}: using lib/program-data.ts because the database is unavailable.`,
    reason,
  );
}

function dateToIsoDate(value: Date | string | null | undefined) {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value.slice(0, 10);
}

function relationNames<T extends { name?: string }>(
  entries: Array<Record<string, T | undefined>> | undefined,
  key: string,
) {
  return (
    entries
      ?.map((entry) => entry[key]?.name)
      .filter((name): name is string => Boolean(name)) ?? []
  );
}

export function dbProgramToProgramRecord(program: DbProgramRecord): ProgramRecord {
  return {
    id: program.slug,
    title: program.title,
    slug: program.slug,
    sourceUrl: program.sourceUrl,
    description: program.descriptionText,
    website: program.website ?? undefined,
    contact: program.contact ?? undefined,
    timeline: program.timeline ?? undefined,
    deadline: dateToIsoDate(program.deadlineDate),
    duration: program.durationLabel ?? undefined,
    creditAvailable: program.creditAvailable,
    workStudyOffered: program.workStudyOffered,
    financialAidAvailable: program.financialAidAvailable,
    gpaMinimumRequired: program.gpaMinimumRequired,
    gpaRequirement: program.gpaRequirement ?? undefined,
    applicationUrl: program.applicationUrl ?? undefined,
    periods: program.periods,
    colleges: relationNames(program.colleges, "college"),
    eligibleClassYears: relationNames(
      program.eligibleClassYears,
      "classYear",
    ),
    opportunityTypes: relationNames(program.opportunityTypes, "opportunityType"),
    fundingTypes: program.fundingTypes,
    sdgTags: relationNames(program.sdgTags, "sdgTag"),
    keywords: program.keywords,
    imageUrl: program.imageUrl ?? "",
    imageAlt: program.title,
    photoUrls: program.imageUrl ? [program.imageUrl] : [],
    featured: program.featured,
  };
}

export async function getProgramRecords(
  context = "program records",
): Promise<ProgramRecordsResult> {
  if (!process.env.DATABASE_URL) {
    warnFallback(context, "DATABASE_URL is not set.");
    return { programs, source: "program-data" };
  }

  const prisma = await getPrisma();

  if (!prisma) {
    warnFallback(context, "Prisma client is unavailable.");
    return { programs, source: "program-data" };
  }

  try {
    const dbPrograms = (await prisma.program.findMany({
      orderBy: [{ featured: "desc" }, { title: "asc" }],
      include: programInclude,
    })) as DbProgramRecord[];

    if (dbPrograms.length === 0) {
      warnFallback(context, "Program table is empty.");
      return { programs, source: "program-data" };
    }

    return {
      programs: dbPrograms.map(dbProgramToProgramRecord),
      source: "database",
    };
  } catch (error) {
    warnFallback(context, error);
    return { programs, source: "program-data" };
  }
}

export function getProgramOptions(catalog: ProgramRecord[]) {
  return {
    classYears: Array.from(
      new Set(catalog.flatMap((program) => program.eligibleClassYears)),
    ),
    colleges: Array.from(
      new Set(catalog.flatMap((program) => program.colleges)),
    ),
    opportunityTypes: Array.from(
      new Set(catalog.flatMap((program) => program.opportunityTypes)),
    ),
  };
}
