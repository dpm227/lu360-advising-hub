import { AppShell } from "@/components/AppShell";
import { DiscoverCarousel } from "@/components/DiscoverCarousel";
import { ProgramCard } from "@/components/ProgramCard";
import {
  demoProfile,
  rankedPrograms,
  type StudentProfile,
} from "@/lib/recommendations";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma-client";
import { getProgramRecords } from "@/lib/program-records";
import { ensureStudentForUser } from "@/lib/student-profile";
import { getServerSession } from "next-auth";

async function getStudentProgramLists() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return {
      savedSlugs: new Set<string>(),
      hiddenSlugs: new Set<string>(),
      profileName: demoProfile.name,
      profile: demoProfile,
    };
  }

  try {
    const ensuredStudent = await ensureStudentForUser({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name ?? null,
    });
    const student = await prisma.student.findUniqueOrThrow({
      where: { id: ensuredStudent.id },
      include: {
        opportunityInterests: { include: { opportunityType: true } },
        keywords: true,
        statuses: true,
      },
    });

    const [savedPrograms, hiddenPrograms] = await Promise.all([
      prisma.studentSavedProgram.findMany({
        where: { studentId: student.id },
        include: { program: { select: { slug: true } } },
      }),
      prisma.studentHiddenProgram.findMany({
        where: { studentId: student.id },
        include: { program: { select: { slug: true } } },
      }),
    ]);

    const name =
      [student.firstName, student.lastName].filter(Boolean).join(" ") ||
      session.user.name ||
      student.email;
    const profile: StudentProfile = {
      name,
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

    return {
      savedSlugs: new Set(savedPrograms.map((saved) => saved.program.slug)),
      hiddenSlugs: new Set(hiddenPrograms.map((hidden) => hidden.program.slug)),
      profileName: name,
      profile,
    };
  } catch (error) {
    console.warn(
      "[LU360_DATABASE_UNAVAILABLE] discover page: unable to load student program state; using anonymous profile context.",
      error,
    );

    return {
      savedSlugs: new Set<string>(),
      hiddenSlugs: new Set<string>(),
      profileName: demoProfile.name,
      profile: demoProfile,
    };
  }
}

export default async function Home() {
  const { savedSlugs, hiddenSlugs, profileName, profile } =
    await getStudentProgramLists();
  const { programs } = await getProgramRecords("discover page");
  const visiblePrograms = programs.filter((program) => !hiddenSlugs.has(program.slug));
  const rankedVisiblePrograms = rankedPrograms(profile, visiblePrograms);
  const featuredPrograms = rankedVisiblePrograms
    .filter(({ program }) => program.featured || program.imageUrl)
    .map(({ program, score }) => ({ program, score }));
  const recommendations = rankedVisiblePrograms.slice(0, 3);

  return (
    <AppShell active="discover" title="Discover">
      <DiscoverCarousel programs={featuredPrograms} />

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recommended for {profileName}</p>
            <h2>Best current fits</h2>
          </div>
          <span className="score-pill">Live profile match</span>
        </div>
        <div className="recommendation-list">
          {recommendations.map(({ program, score, reasons }) => (
            <article className="recommendation-row" key={program.id}>
              <div>
                <h3>{program.title}</h3>
                <p>{reasons.slice(0, 2).join("; ")}</p>
              </div>
              <strong>{score}%</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="all-programs">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lehigh360 programs</p>
            <h2>Explore opportunities</h2>
          </div>
        </div>
        <div className="program-grid">
          {visiblePrograms.map((program) => (
            <ProgramCard
              initialHidden={hiddenSlugs.has(program.slug)}
              initialSaved={savedSlugs.has(program.slug)}
              program={program}
              key={program.id}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
