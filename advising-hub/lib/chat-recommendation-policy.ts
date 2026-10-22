export const MAX_CHAT_RECOMMENDATIONS = 3;

const RECOMMENDATION_INTENT_PATTERNS = [
  /\brecommend\b/i,
  /\bsuggest\b/i,
  /\b(?:find|show|list)\s+(?:me\s+)?(?:(?:\d+|a|some)\s+)?(?:funded\s+|paid\s+)?(?:research\s+)?(?:programs?|opportunities)\b/i,
  /\b(?:which|what)\s+(?:programs?|opportunities)\s+(?:should|would|could|might|do)\b/i,
  /\bwhat\s+should\s+i\s+(?:apply\s+to|join|choose)\b/i,
  /\b(?:best|good|strong)\s+(?:fit|match)\b/i,
  /\b(?:programs?|opportunities)\s+(?:for\s+me|that\s+(?:fit|match))\b/i,
];

const FACTUAL_FOLLOW_UP_PATTERN =
  /\b(?:why|when|how)\s+(?:(?:did|do|would|could)\s+)?(?:you\s+)?(?:recommend|suggest)\b|\bwhat\s+did\s+you\s+(?:recommend|suggest)\b/i;

const COUNT_WORDS: Record<string, number> = {
  a: 1,
  one: 1,
  single: 1,
  two: 2,
  three: 3,
};

export function recommendationLimitForMessage(
  message: string,
  programTitles: readonly string[] = [],
): number {
  if (
    FACTUAL_FOLLOW_UP_PATTERN.test(message) ||
    !RECOMMENDATION_INTENT_PATTERNS.some((pattern) => pattern.test(message))
  ) {
    return 0;
  }

  const requestedCount = message.match(
    /\b(?:recommend|suggest|find|show|list)\s+(?:me\s+)?(?:just\s+)?(?:the\s+)?(?:top\s+)?(\d+|one|two|three|single|a)\b/i,
  )?.[1]?.toLowerCase();
  const count = requestedCount
    ? (COUNT_WORDS[requestedCount] ?? Number(requestedCount))
    : Number.NaN;

  const requestedLimit = Number.isFinite(count)
    ? Math.min(MAX_CHAT_RECOMMENDATIONS, Math.max(0, count))
    : MAX_CHAT_RECOMMENDATIONS;
  const normalizedMessage = message.toLowerCase();
  const mentionedProgramCount = programTitles.filter((title) =>
    normalizedMessage.includes(title.toLowerCase()),
  ).length;

  return Math.min(requestedLimit, mentionedProgramCount || requestedLimit);
}
