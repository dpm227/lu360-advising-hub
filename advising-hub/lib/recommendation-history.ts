import type { StudentProgramExperience } from "./program-participation";

export type RecommendationProgramTraits = {
  slug: string;
  title: string;
  opportunityTypes: string[];
  keywords: string[];
};

export function recommendationHistoryContext<T extends RecommendationProgramTraits>(
  catalog: T[],
  experiences: StudentProgramExperience[],
) {
  const excludedSlugs = new Set(
    experiences
      .filter(
        (experience) =>
          experience.status === "COMPLETED" ||
          experience.status === "IN_PROGRESS",
      )
      .map((experience) => experience.programSlug),
  );
  const positiveExperienceSlugs = new Set(
    experiences
      .filter(
        (experience) =>
          experience.status === "COMPLETED" && experience.liked === true,
      )
      .map((experience) => experience.programSlug),
  );

  return {
    excludedSlugs,
    positiveExperiencePrograms: catalog.filter((program) =>
      positiveExperienceSlugs.has(program.slug),
    ),
  };
}

export function experienceSimilarity(
  program: RecommendationProgramTraits,
  positiveExperiencePrograms: RecommendationProgramTraits[],
) {
  const similarExperiences = positiveExperiencePrograms
    .map((experienceProgram) => {
      const sharedOpportunityTypes = program.opportunityTypes.filter((type) =>
        experienceProgram.opportunityTypes.includes(type),
      );
      const sharedKeywords = program.keywords.filter((keyword) =>
        experienceProgram.keywords.some(
          (experienceKeyword) =>
            experienceKeyword.toLowerCase() === keyword.toLowerCase(),
        ),
      );

      return {
        program: experienceProgram,
        score: sharedOpportunityTypes.length * 8 + sharedKeywords.length * 4,
      };
    })
    .filter(({ score }) => score > 0);

  return {
    boost:
      similarExperiences.length > 0
        ? Math.min(
            18,
            Math.max(...similarExperiences.map(({ score }) => score)),
          )
        : 0,
    programTitles: similarExperiences
      .slice(0, 2)
      .map(({ program: experienceProgram }) => experienceProgram.title),
  };
}
