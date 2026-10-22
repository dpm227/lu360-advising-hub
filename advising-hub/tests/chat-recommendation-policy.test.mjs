import assert from "node:assert/strict";
import test from "node:test";
import { recommendationLimitForMessage } from "../lib/chat-recommendation-policy.ts";

test("factual questions and recommendation follow-ups do not create tags", () => {
  assert.equal(recommendationLimitForMessage("What is the Marcon Fellows deadline?"), 0);
  assert.equal(recommendationLimitForMessage("Tell me about Peer Health Advisors."), 0);
  assert.equal(recommendationLimitForMessage("Why did you recommend Marcon Fellows?"), 0);
  assert.equal(recommendationLimitForMessage("Tell me about the program you recommended."), 0);
  assert.equal(recommendationLimitForMessage("What did you recommend earlier?"), 0);
});

test("recommendation requests honor smaller counts and cap larger counts", () => {
  assert.equal(recommendationLimitForMessage("Recommend one funded research program."), 1);
  assert.equal(recommendationLimitForMessage("Suggest me 2 programs."), 2);
  assert.equal(recommendationLimitForMessage("Recommend 100 programs."), 3);
  assert.equal(recommendationLimitForMessage("Show me 100 programs."), 3);
  assert.equal(recommendationLimitForMessage("Which programs should I consider?"), 3);
  assert.equal(
    recommendationLimitForMessage("Recommend Marcon Fellows for me.", [
      "Marcon Fellows",
      "Peer Health Advisors",
    ]),
    1,
  );
});
