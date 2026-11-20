export const programParticipationStatuses = [
  "APPLIED",
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "DECLINED",
] as const;

export type ProgramParticipationStatus =
  (typeof programParticipationStatuses)[number];

export type ProgramParticipationInput = {
  status: ProgramParticipationStatus;
  term: string | null;
  reflection: string | null;
  liked: boolean | null;
};

export type StudentProgramExperience = ProgramParticipationInput & {
  programSlug: string;
  programTitle: string;
};

export type StudentProgramExperiences = Record<
  string,
  StudentProgramExperience
>;

type ProgramParticipationParseResult =
  | { data: ProgramParticipationInput; error?: never }
  | { data?: never; error: string };

export const programParticipationStatusLabels: Record<
  ProgramParticipationStatus,
  string
> = {
  APPLIED: "Applied",
  ACCEPTED: "Accepted",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  DECLINED: "Declined",
};

const excludedRecommendationStatuses = new Set<ProgramParticipationStatus>([
  "IN_PROGRESS",
  "COMPLETED",
]);

export function isProgramParticipationStatus(
  value: unknown,
): value is ProgramParticipationStatus {
  return (
    typeof value === "string" &&
    programParticipationStatuses.includes(value as ProgramParticipationStatus)
  );
}

export function excludesProgramFromRecommendations(
  status: ProgramParticipationStatus,
) {
  return excludedRecommendationStatuses.has(status);
}

function optionalText(value: unknown, maximumLength: number) {
  if (value === undefined || value === null) {
    return { value: null };
  }

  if (typeof value !== "string") {
    return { error: "Expected text." };
  }

  const cleaned = value.trim();

  if (cleaned.length > maximumLength) {
    return { error: `Text must be ${maximumLength} characters or fewer.` };
  }

  return { value: cleaned || null };
}

export function parseProgramParticipationInput(
  value: unknown,
): ProgramParticipationParseResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { error: "Experience details are required." };
  }

  const input = value as Record<string, unknown>;

  if (!isProgramParticipationStatus(input.status)) {
    return { error: "Select a valid experience status." };
  }

  const term = optionalText(input.term, 80);
  if (term.error) {
    return { error: `Term: ${term.error}` };
  }

  const reflection = optionalText(input.reflection, 1000);
  if (reflection.error) {
    return { error: `Reflection: ${reflection.error}` };
  }

  if (
    input.liked !== undefined &&
    input.liked !== null &&
    typeof input.liked !== "boolean"
  ) {
    return { error: "Experience rating must be yes, no, or not specified." };
  }

  return {
    data: {
      status: input.status,
      term: term.value ?? null,
      reflection: reflection.value ?? null,
      liked: typeof input.liked === "boolean" ? input.liked : null,
    },
  };
}
