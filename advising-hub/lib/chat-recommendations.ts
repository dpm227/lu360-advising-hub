export type ChatRecommendationInfo = {
  explanation: string;
  threadId: string | null;
};

export type ChatRecommendedPrograms = Record<string, ChatRecommendationInfo>;
