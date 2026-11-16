export const programParticipationStatuses = [
  "APPLIED",
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "DECLINED",
] as const;

export type ProgramParticipationStatus =
  (typeof programParticipationStatuses)[number];

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
