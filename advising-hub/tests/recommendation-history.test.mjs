import assert from "node:assert/strict";
import test from "node:test";
import {
  experienceSimilarity,
  recommendationHistoryContext,
} from "../lib/recommendation-history.ts";

function program(slug, opportunityTypes = [], keywords = []) {
  return {
    slug,
    title: slug.replaceAll("-", " "),
    opportunityTypes,
    keywords,
  };
}

function experience(programSlug, status, liked = null) {
  return {
    programSlug,
    programTitle: programSlug,
    status,
    term: null,
    reflection: null,
    liked,
  };
}

test("history excludes completed and in-progress programs", () => {
  const catalog = [program("completed"), program("active"), program("applied")];
  const context = recommendationHistoryContext(catalog, [
    experience("completed", "COMPLETED", true),
    experience("active", "IN_PROGRESS"),
    experience("applied", "APPLIED"),
  ]);

  assert.deepEqual([...context.excludedSlugs].sort(), ["active", "completed"]);
  assert.deepEqual(
    context.positiveExperiencePrograms.map(({ slug }) => slug),
    ["completed"],
  );
});

test("only positive completed experiences create a similarity boost", () => {
  const completed = program("completed-research", ["Research"], ["AI"]);
  const similar = program("similar-research", ["Research"], ["ai"]);
  const unrelated = program("unrelated");

  const positiveMatch = experienceSimilarity(similar, [completed]);
  const noMatch = experienceSimilarity(unrelated, [completed]);

  assert.equal(positiveMatch.boost, 12);
  assert.deepEqual(positiveMatch.programTitles, ["completed research"]);
  assert.equal(noMatch.boost, 0);
});
