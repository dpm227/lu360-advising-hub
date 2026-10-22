import Link from "next/link";
import { RecommendationSource } from "@prisma/client";
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
import type { ChatRecommendedPrograms } from "@/lib/chat-recommendations";
import { getServerSession } from "next-auth";

async function getStudentProgramLists() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return {
      savedSlugs: new Set<string>(),
      hiddenSlugs: new Set<string>(),
      chatRecommended: {} as ChatRecommendedPrograms,
      profileName: demoProfile.name,
      profile: demoProfile,
    };
  }

  try {
    const student = await prisma.student.findUniqueOrThrow({
      where: { userId: session.user.id },
      include: {
        opportunityInterests: { include: { opportunityType: true } },
        keywords: true,
        statuses: true,
      },
    });

    const [savedPrograms, hiddenPrograms, chatRecommendations] = await Promise.all([
      prisma.studentSavedProgram.findMany({
        where: { studentId: student.id },
        include: { program: { select: { slug: true } } },
      }),
      prisma.studentHiddenProgram.findMany({
        where: { studentId: student.id },
        include: { program: { select: { slug: true } } },
      }),
      prisma.studentProgramRecommendation.findMany({
        where: {
          studentId: student.id,
          source: RecommendationSource.CHAT,
          isActive: true,
        },
        orderBy: [{ generatedAt: "desc" }, { id: "desc" }],
        select: {
          explanation: true,
          chatThreadId: true,
          program: { select: { slug: true } },
        },
      }),
    ]);

    const chatRecommended: ChatRecommendedPrograms = Object.fromEntries(
      chatRecommendations.map((recommendation) => [
        recommendation.program.slug,
        {
          explanation: recommendation.explanation ?? "",
          threadId: recommendation.chatThreadId,
        },
      ]),
    );

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
      chatRecommended,
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
      chatRecommended: {} as ChatRecommendedPrograms,
      profileName: demoProfile.name,
      profile: demoProfile,
    };
  }
}

export default async function Home() {
  const [{ savedSlugs, hiddenSlugs, chatRecommended, profileName, profile }, { programs }] =
    await Promise.all([getStudentProgramLists(), getProgramRecords("discover page")]);
  const visiblePrograms = programs.filter((program) => !hiddenSlugs.has(program.slug));
  const rankedVisiblePrograms = rankedPrograms(profile, visiblePrograms).sort(
    (first, second) =>
      Number(Boolean(chatRecommended[second.program.slug])) -
      Number(Boolean(chatRecommended[first.program.slug])),
  );
  const featuredPrograms = rankedVisiblePrograms
    .filter(({ program }) => chatRecommended[program.slug] || program.featured || program.imageUrl)
    .map(({ program, score }) => ({ program, score }));
  const chatMatches = rankedVisiblePrograms.filter(
    ({ program }) => chatRecommended[program.slug],
  );
  const recommendations =
    chatMatches.length > 0 ? chatMatches : rankedVisiblePrograms.slice(0, 3);

  return (
    <AppShell active="discover" title="Discover">
      <DiscoverCarousel
        programs={featuredPrograms}
        savedSlugs={[...savedSlugs]}
        chatRecommended={chatRecommended}
      />

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recommended for {profileName}</p>
            <h2>Best current fits</h2>
          </div>
          <span className="score-pill">Chat recommendations and profile matches</span>
        </div>
        <div className="recommendation-list">
          {recommendations.map(({ program, score, reasons }) => {
            const chatRecommendation = chatRecommended[program.slug];

            return (
              <article className="recommendation-row" key={program.id}>
                <div>
                  <h3>{program.title}</h3>
                  <p>
                    {chatRecommendation?.explanation ||
                      reasons.slice(0, 2).join("; ")}
                  </p>
                  {chatRecommendation?.threadId ? (
                    <Link
                      href={`/chat?thread=${encodeURIComponent(chatRecommendation.threadId)}`}
                    >
                      Continue chat
                    </Link>
                  ) : null}
                </div>
                {chatRecommendation ? (
                  <span className="chat-recommendation-badge">
                    Recommended by Chatbot
                  </span>
                ) : (
                  <strong>{score}%</strong>
                )}
              </article>
            );
          })}
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
              initialSaved={savedSlugs.has(program.slug)}
              chatRecommendation={chatRecommended[program.slug]}
              program={program}
              key={program.id}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
