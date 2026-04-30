import Link from "next/link";
import { getServerSession } from "next-auth";
import { AppShell } from "@/components/AppShell";
import { ProgramCard } from "@/components/ProgramCard";
import { ProfileEditButton } from "@/components/ProfileEditButton";
import { authOptions } from "@/lib/auth";
import {
  classYears,
  colleges,
  opportunityTypes,
  programs,
} from "@/lib/program-data";
import { prisma } from "@/lib/prisma-client";
import { rankedPrograms, type StudentProfile } from "@/lib/recommendations";
import { ensureStudentForUser } from "@/lib/student-profile";

function initialsFor(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "LU"
  );
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return (
      <AppShell active="profile" title="Profile">
        <section className="signin-panel">
          <p className="eyebrow">Student profile</p>
          <h2>Sign in to use your profile</h2>
          <p>
            Google sign-in creates your student profile and lets the hub save
            programs, hide programs, and keep chat history connected to you.
          </p>
          <Link className="profile-link-button" href="/signin">
            Sign in with Google
          </Link>
        </section>
      </AppShell>
    );
  }

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
      savedPrograms: { include: { program: { select: { slug: true } } } },
      hiddenPrograms: { include: { program: { select: { slug: true } } } },
    },
  });

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
  const editableProfile = {
    firstName: student.firstName ?? "",
    lastName: student.lastName ?? "",
    email: student.email,
    classYear: profile.classYear,
    college: profile.college,
    major: profile.major,
    needsFunding: profile.needsFunding,
    interests: profile.interests,
    keywords: profile.keywords,
    statuses: profile.statuses,
  };
  const profileOptions = {
    classYears,
    colleges,
    opportunityTypes,
    statusSuggestions: [
      "F1RST+ Student",
      "Transfer Student",
      "International Student",
      "Graduate Student",
      "Student Athlete",
      "Commuter Student",
      "Veteran",
    ],
  };
  const savedSlugs = new Set(
    student.savedPrograms.map((saved) => saved.program.slug),
  );
  const hiddenSlugs = new Set(
    student.hiddenPrograms.map((hidden) => hidden.program.slug),
  );
  const savedPrograms = programs.filter((program) => savedSlugs.has(program.slug));
  const matches = rankedPrograms(profile)
    .filter(({ program }) => !hiddenSlugs.has(program.slug))
    .slice(0, 2);

  return (
    <AppShell active="profile" title="Profile">
      <section className="profile-layout">
        <div className="profile-panel">
          <div className="profile-header">
            <div className="profile-header-main">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt=""
                  className="profile-avatar profile-avatar-image"
                  referrerPolicy="no-referrer"
                  src={session.user.image}
                />
              ) : (
                <div className="profile-avatar">{initialsFor(name)}</div>
              )}
              <div>
                <p className="eyebrow">Student profile</p>
                <h2>{name}</h2>
                <p>{student.email}</p>
              </div>
            </div>
            <ProfileEditButton
              initialProfile={editableProfile}
              options={profileOptions}
            />
          </div>

          <div className="profile-fields">
            <div>
              <span>Class year</span>
              <strong>{profile.classYear || "Not set"}</strong>
            </div>
            <div>
              <span>College</span>
              <strong>{profile.college || "Not set"}</strong>
            </div>
            <div>
              <span>Major</span>
              <strong>{profile.major || "Not set"}</strong>
            </div>
            <div>
              <span>Funding needed</span>
              <strong>{profile.needsFunding ? "Yes" : "No"}</strong>
            </div>
          </div>

          <div className="preference-block">
            <h3>Opportunity interests</h3>
            <div className="chip-row">
              {profile.interests.length > 0 ? (
                profile.interests.map((interest) => (
                  <span className="chip" key={interest}>
                    {interest}
                  </span>
                ))
              ) : (
                <span className="profile-empty">No interests saved yet.</span>
              )}
            </div>
          </div>

          <div className="preference-block">
            <h3>Keywords</h3>
            <div className="chip-row">
              {profile.keywords.length > 0 ? (
                profile.keywords.map((keyword) => (
                  <span className="chip" key={keyword}>
                    {keyword}
                  </span>
                ))
              ) : (
                <span className="profile-empty">No keywords saved yet.</span>
              )}
            </div>
          </div>
        </div>

        <aside className="profile-side">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Saved path</p>
              <h2>{savedPrograms.length > 0 ? "Saved programs" : "Top matches"}</h2>
            </div>
          </div>
          {(savedPrograms.length > 0
            ? savedPrograms.map((program) => ({ program }))
            : matches
          ).map(({ program }) => (
            <ProgramCard
              compact
              initialHidden={hiddenSlugs.has(program.slug)}
              initialSaved={savedSlugs.has(program.slug)}
              program={program}
              key={program.id}
            />
          ))}
        </aside>
      </section>
    </AppShell>
  );
}
