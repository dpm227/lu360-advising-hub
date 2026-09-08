import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { classYears, colleges, opportunityTypes } from "@/lib/program-data";
import { prisma } from "@/lib/prisma-client";

type ProfileRequest = {
  firstName?: string;
  lastName?: string;
  classYear?: string;
  college?: string;
  major?: string;
  needsFunding?: boolean;
  interests?: string[];
  keywords?: string | string[];
  statuses?: string | string[];
};

const statusSuggestions = [
  "F1RST+ Student",
  "Transfer Student",
  "International Student",
  "Graduate Student",
  "Student Athlete",
  "Commuter Student",
  "Veteran",
];

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(value: unknown) {
  const text = cleanText(value);
  return text.length > 0 ? text : null;
}

function cleanList(value: unknown) {
  const list =
    typeof value === "string"
      ? value.split(",")
      : Array.isArray(value)
        ? value
        : [];

  return Array.from(
    new Set(
      list
        .map((entry) => cleanText(entry))
        .filter((entry) => entry.length > 0)
        .slice(0, 12),
    ),
  );
}

function profileNeedsSetup(student: {
  classYear: string | null;
  college: string | null;
  major: string | null;
  opportunityInterests: unknown[];
  keywords: unknown[];
}) {
  return (
    !student.classYear ||
    !student.college ||
    !student.major ||
    (student.opportunityInterests.length === 0 && student.keywords.length === 0)
  );
}

function profileResponse(student: NonNullable<Awaited<ReturnType<typeof getStudent>>>) {
  return {
    profile: {
      firstName: student.firstName ?? "",
      lastName: student.lastName ?? "",
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
    },
    options: {
      classYears,
      colleges,
      opportunityTypes,
      statusSuggestions,
    },
    requiresOnboarding: profileNeedsSetup(student),
  };
}

async function getSessionStudent() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return null;
  }

  return getStudent(session.user.id);
}

async function getStudent(userId: string) {
  return prisma.student.findUnique({
    where: { userId },
    include: {
      opportunityInterests: { include: { opportunityType: true } },
      keywords: true,
      statuses: true,
    },
  });
}

export async function GET() {
  const student = await getSessionStudent();

  if (!student) {
    return Response.json(
      { error: "Sign in again to load your student profile." },
      { status: 401 },
    );
  }

  return Response.json(profileResponse(student));
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return Response.json({ error: "Sign in is required." }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!student) {
    return Response.json(
      { error: "Sign in again to set up your student profile." },
      { status: 409 },
    );
  }
  const body = (await request.json()) as ProfileRequest;
  const interests = cleanList(body.interests).filter((interest) =>
    opportunityTypes.includes(interest),
  );
  const keywords = cleanList(body.keywords);
  const statuses = cleanList(body.statuses);

  const updatedStudent = await prisma.$transaction(async (tx) => {
    const interestRecords = await Promise.all(
      interests.map((name) =>
        tx.opportunityType.upsert({
          where: { name },
          update: {},
          create: { name },
          select: { id: true },
        }),
      ),
    );

    await tx.student.update({
      where: { id: student.id },
      data: {
        firstName: optionalText(body.firstName),
        lastName: optionalText(body.lastName),
        classYear: classYears.includes(cleanText(body.classYear))
          ? cleanText(body.classYear)
          : null,
        college: colleges.includes(cleanText(body.college))
          ? cleanText(body.college)
          : null,
        major: optionalText(body.major),
        needsFunding: Boolean(body.needsFunding),
      },
    });

    await Promise.all([
      tx.studentOpportunityInterest.deleteMany({
        where: { studentId: student.id },
      }),
      tx.studentKeyword.deleteMany({ where: { studentId: student.id } }),
      tx.studentStatus.deleteMany({ where: { studentId: student.id } }),
    ]);

    if (interestRecords.length > 0) {
      await tx.studentOpportunityInterest.createMany({
        data: interestRecords.map((interest) => ({
          studentId: student.id,
          opportunityTypeId: interest.id,
        })),
        skipDuplicates: true,
      });
    }

    if (keywords.length > 0) {
      await tx.studentKeyword.createMany({
        data: keywords.map((keyword) => ({
          studentId: student.id,
          keyword,
        })),
        skipDuplicates: true,
      });
    }

    if (statuses.length > 0) {
      await tx.studentStatus.createMany({
        data: statuses.map((statusName) => ({
          studentId: student.id,
          statusName,
        })),
        skipDuplicates: true,
      });
    }

    return tx.student.findUniqueOrThrow({
      where: { id: student.id },
      include: {
        opportunityInterests: { include: { opportunityType: true } },
        keywords: true,
        statuses: true,
      },
    });
  });

  return Response.json(profileResponse(updatedStudent));
}
