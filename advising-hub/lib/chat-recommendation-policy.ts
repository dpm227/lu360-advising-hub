const RECOMMENDATION_INTENT_PATTERNS = [
  /\brecommend(?:ed|ing|ations?)?\b/i,
  /\bsuggest(?:ed|ing|ions?)?\b/i,
  /\b(?:find|show|list)\s+(?:me\s+)?(?:(?:\d+|some)\s+|a\s+(?:(?:few|couple|handful)(?:\s+of)?\s+)?)?(?:funded\s+|paid\s+)?(?:research\s+)?(?:programs?|opportunities)\b/i,
  /\b(?:which|what)\s+(?:programs?|opportunities)\s+(?:should|would|could|might|do)\b/i,
  /\bwhat\s+should\s+i\s+(?:apply\s+to|join|choose)\b/i,
  /\b(?:best|good|strong)\s+(?:fit|match)\b/i,
  /\b(?:programs?|opportunities)\s+(?:for\s+me|that\s+(?:fit|match))\b/i,
  /đề xuất|gợi ý/i,
];

const FACTUAL_FOLLOW_UP_PATTERN =
  /\b(?:why|when|how)\s+(?:(?:did|do|would|could)\s+)?(?:you\s+)?(?:recommend|suggest)\b|\bwhat\s+did\s+you\s+(?:recommend|suggest)\b|\b(?:programs?|opportunities|options?|ones?)\s+(?:(?:that|which)\s+)?(?:you\s+)?(?:recommended|suggested)\b/i;

const SINGLE_PROGRAM_REQUEST_PATTERN =
  /(?:\b(?:recommend|suggest|find|show)\b|đề xuất|gợi ý)\s+(?:(?:me|cho tôi|tôi|mình)\s+)?(?:just\s+)?a\s+(?!few\b|couple\b|handful\b)(?:[a-z-]+\s+){0,4}(?:program|opportunity)\b/i;

const COUNT_WORDS: Record<string, number> = {
  one: 1,
  single: 1,
  two: 2,
  three: 3,
};

type GeographicProgram = {
  title: string;
  keywords: readonly string[];
};

const REGION_PATTERNS = [
  { name: "africa", query: /\bafrica\b|châu phi/i },
  { name: "asia", query: /\basia\b|châu á/i },
] as const;

// These destinations are named in current catalog titles. Prefer the specific
// destination over broad keywords shared by some fellowship program pages.
const TITLE_DESTINATIONS = [
  { name: "india", region: "asia" },
  { name: "kazakhstan", region: "asia" },
  { name: "philippines", region: "asia" },
  { name: "sierra leone", region: "africa" },
  { name: "uganda", region: "africa" },
] as const;

export function hasGeographicConstraint(message: string): boolean {
  return REGION_PATTERNS.some(({ query }) => query.test(message));
}

export function programMatchesRequestedRegion(
  message: string,
  program: GeographicProgram,
): boolean {
  const requestedRegions = REGION_PATTERNS.filter(({ query }) => query.test(message)).map(
    ({ name }) => name,
  );

  if (requestedRegions.length === 0) {
    return true;
  }

  const title = program.title.toLowerCase();
  const titleDestination = TITLE_DESTINATIONS.find(({ name }) =>
    title.includes(name),
  );

  if (titleDestination) {
    return requestedRegions.includes(titleDestination.region);
  }

  return requestedRegions.some((region) =>
    program.keywords.some((keyword) => keyword.toLowerCase().includes(region)),
  );
}

export function recommendationLimitForMessage(
  message: string,
  programTitles: readonly string[] = [],
): number | null {
  if (
    FACTUAL_FOLLOW_UP_PATTERN.test(message) ||
    !RECOMMENDATION_INTENT_PATTERNS.some((pattern) => pattern.test(message))
  ) {
    return 0;
  }

  const requestedCount = message.match(
    /(?:\b(?:recommend|suggest|find|show|list)\b|đề xuất|gợi ý)\s+(?:(?:me|cho tôi|tôi|mình)\s+)?(?:just\s+)?(?:the\s+)?(?:top\s+)?(\d+|one|two|three|single)\b/i,
  )?.[1]?.toLowerCase();
  const count = requestedCount
    ? (COUNT_WORDS[requestedCount] ?? Number(requestedCount))
    : SINGLE_PROGRAM_REQUEST_PATTERN.test(message)
      ? 1
      : Number.NaN;

  const requestedLimit = Number.isFinite(count) ? Math.max(0, count) : null;
  const normalizedMessage = message.toLowerCase();
  const mentionedProgramCount = programTitles.filter((title) =>
    normalizedMessage.includes(title.toLowerCase()),
  ).length;

  return mentionedProgramCount
    ? Math.min(requestedLimit ?? mentionedProgramCount, mentionedProgramCount)
    : requestedLimit;
}
