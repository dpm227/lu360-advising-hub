import assert from "node:assert/strict";
import test from "node:test";
import {
  programMatchesRequestedRegion,
  recommendationLimitForMessage,
} from "../lib/chat-recommendation-policy.ts";
import { programs } from "../lib/program-data.ts";

test("factual questions and recommendation follow-ups do not create tags", () => {
  assert.equal(recommendationLimitForMessage("What is the Marcon Fellows deadline?"), 0);
  assert.equal(recommendationLimitForMessage("Tell me about Peer Health Advisors."), 0);
  assert.equal(recommendationLimitForMessage("Why did you recommend Marcon Fellows?"), 0);
  assert.equal(recommendationLimitForMessage("Tell me about the program you recommended."), 0);
  assert.equal(recommendationLimitForMessage("What did you recommend earlier?"), 0);
});

test("geographic requests use specific destinations before shared keywords", () => {
  const sharedKeywords = ["Africa", "Central Asia", "Southeast Asia"];
  const india = { title: "India Global Social Impact Fellowship", keywords: sharedKeywords };
  const sierraLeone = {
    title: "Sierra Leone Global Social Impact Fellowship",
    keywords: sharedKeywords,
  };

  assert.equal(programMatchesRequestedRegion("Recommend programs in Africa", india), false);
  assert.equal(programMatchesRequestedRegion("Recommend programs in Africa", sierraLeone), true);
  assert.equal(programMatchesRequestedRegion("Đề xuất chương trình ở châu Á", india), true);
  assert.equal(programMatchesRequestedRegion("Đề xuất chương trình ở châu Á", sierraLeone), false);
});

test("the current catalog separates named African and Asian programs", () => {
  const bySlug = new Map(programs.map((program) => [program.slug, program]));
  const africaRequest = "Recommend programs in Africa";
  const asiaRequest = "Recommend programs in Asia";

  assert.equal(
    programMatchesRequestedRegion(africaRequest, bySlug.get("uganda-sustainable-livelihoods-program")),
    true,
  );
  assert.equal(
    programMatchesRequestedRegion(africaRequest, bySlug.get("india-global-social-impact-fellowship")),
    false,
  );
  assert.equal(
    programMatchesRequestedRegion(asiaRequest, bySlug.get("india-global-social-impact-fellowship")),
    true,
  );
});

test("recommendation requests honor requested counts without a fixed cap", () => {
  assert.equal(recommendationLimitForMessage("Recommend one funded research program."), 1);
  assert.equal(recommendationLimitForMessage("Suggest me 2 programs."), 2);
  assert.equal(recommendationLimitForMessage("Recommend 100 programs."), 100);
  assert.equal(recommendationLimitForMessage("Show me 100 programs."), 100);
  assert.equal(recommendationLimitForMessage("Which programs should I consider?"), null);
  assert.equal(recommendationLimitForMessage("Đề xuất cho tôi 3 chương trình."), 3);
  assert.equal(recommendationLimitForMessage("Gợi ý các chương trình ở châu Phi."), null);
  assert.equal(
    recommendationLimitForMessage("Recommend Marcon Fellows for me.", [
      "Marcon Fellows",
      "Peer Health Advisors",
    ]),
    1,
  );
});
