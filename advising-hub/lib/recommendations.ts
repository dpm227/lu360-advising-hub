import { programs, type ProgramRecord } from "./program-data";

export type StudentProfile = {
  name: string;
  email: string;
  classYear: string;
  college: string;
  major: string;
  needsFunding: boolean;
  interests: string[];
  keywords: string[];
  statuses: string[];
};

export const demoProfile: StudentProfile = {
  name: "Maya Chen",
  email: "mc26@lehigh.edu",
  classYear: "Sophomore",
  college: "College of Arts and Sciences",
  major: "Sociology and Health, Medicine, and Society",
  needsFunding: true,
  interests: ["Research", "Community Engagement", "Leadership Development"],
  keywords: ["equity", "public health", "anti-racism", "mentoring"],
  statuses: ["F1RST+ Student"],
};

export function evaluateProgramEligibility(
  program: ProgramRecord,
  profile: StudentProfile,
) {
  const classYearEligible = program.eligibleClassYears.includes(
    profile.classYear,
  );
  const collegeEligible = program.colleges.includes(profile.college);
  const ineligibilityReasons: string[] = [];

  if (!profile.classYear) {
    ineligibilityReasons.push("The student's class year is missing.");
  } else if (!classYearEligible) {
    ineligibilityReasons.push(
      program.eligibleClassYears.length > 0
        ? `${profile.classYear} is not among the eligible class years: ${program.eligibleClassYears.join(", ")}.`
        : "The program does not list any eligible class years.",
    );
  }

  if (!profile.college) {
    ineligibilityReasons.push("The student's college is missing.");
  } else if (!collegeEligible) {
    ineligibilityReasons.push(
      program.colleges.length > 0
        ? `${profile.college} is not among the eligible colleges: ${program.colleges.join(", ")}.`
        : "The program does not list any eligible colleges.",
    );
  }

  const eligible = classYearEligible && collegeEligible;

  return {
    eligible,
    reason: eligible
      ? `Eligible based on class year (${profile.classYear}) and college (${profile.college}).`
      : ineligibilityReasons.join(" "),
  };
}

export function scoreProgram(program: ProgramRecord, profile = demoProfile) {
  let score = 0;
  const reasons: string[] = [];
  const eligibility = evaluateProgramEligibility(program, profile);

  if (program.eligibleClassYears.includes(profile.classYear)) {
    score += 20;
    reasons.push(`open to ${profile.classYear.toLowerCase()} students`);
  }

  if (program.colleges.includes(profile.college)) {
    score += 20;
    reasons.push("fits your college");
  }

  const matchedInterests = profile.interests.filter((interest) =>
    program.opportunityTypes.includes(interest),
  );
  score += matchedInterests.length * 18;
  if (matchedInterests.length > 0) {
    reasons.push(`matches ${matchedInterests.join(", ").toLowerCase()}`);
  }

  const matchedKeywords = profile.keywords.filter((keyword) =>
    program.keywords.some(
      (programKeyword) =>
        programKeyword.toLowerCase() === keyword.toLowerCase(),
    ),
  );
  score += matchedKeywords.length * 12;
  if (matchedKeywords.length > 0) {
    reasons.push(`connects to ${matchedKeywords.join(", ").toLowerCase()}`);
  }

  if (profile.needsFunding && program.fundingTypes.length > 0) {
    score += 16;
    reasons.push(`offers ${program.fundingTypes.join(" or ").toLowerCase()}`);
  }

  return {
    program,
    score: Math.min(score, 100),
    reasons,
    eligible: eligibility.eligible,
    eligibilityReason: eligibility.reason,
  };
}

export function rankedPrograms(profile = demoProfile, catalog = programs) {
  return catalog
    .map((program) => scoreProgram(program, profile))
    .sort((first, second) => second.score - first.score);
}
