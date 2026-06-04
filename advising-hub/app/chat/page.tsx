import { getServerSession } from "next-auth";
import { AdvisorChat, type ChatPageContext } from "@/components/AdvisorChat";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma-client";
import type { StudentProfile } from "@/lib/recommendations";
import { ensureStudentForUser } from "@/lib/student-profile";

const generalStudentProfile: StudentProfile = {
  name: "Student",
  email: "",
  classYear: "",
  college: "",
  major: "",
  needsFunding: false,
  interests: [],
  keywords: [],
  statuses: [],
};

function profileSummary(profile: StudentProfile, isSignedIn: boolean) {
  if (!isSignedIn) {
    return "Sign in or tell the advisor about your class year, college, major, interests, and funding needs for more personalized answers.";
  }

  const academicDetails = [
    profile.classYear ? `a ${profile.classYear.toLowerCase()}` : "",
    profile.major ? `studying ${profile.major}` : "",
    profile.college ? `in ${profile.college}` : "",
  ].filter(Boolean);
  const fundingPreference = profile.needsFunding
    ? "You prefer paid or funded opportunities."
    : "Funding is marked as optional.";

  return academicDetails.length > 0
    ? `The advisor is using your profile: ${academicDetails.join(" ")}. ${fundingPreference} Saved interests and keywords are included too.`
    : "Your account is connected, but your profile still needs class year, college, major, interests, or funding details.";
}

function buildChatContext(profile: StudentProfile, isSignedIn: boolean) {
  return {
    isSignedIn,
    profileName: profile.name,
    summary: profileSummary(profile, isSignedIn),
  } satisfies ChatPageContext;
}

async function getChatContext() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return buildChatContext(generalStudentProfile, false);
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

  return buildChatContext(profile, true);
}

type ChatPageProps = {
  searchParams?: Promise<{ autoSend?: string; prompt?: string }>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const context = await getChatContext();
  const params = await searchParams;
  const initialPrompt = params?.prompt?.trim() ?? "";
  const autoSendInitialPrompt = params?.autoSend === "1";

  return (
    <AdvisorChat
      autoSendInitialPrompt={autoSendInitialPrompt}
      context={context}
      initialPrompt={initialPrompt}
    />
  );
}
