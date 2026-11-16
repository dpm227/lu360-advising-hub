import assert from "node:assert/strict";
import test from "node:test";
import {
  excludesProgramFromRecommendations,
  isProgramParticipationStatus,
  programParticipationStatusLabels,
  programParticipationStatuses,
} from "../lib/program-participation.ts";

test("recognizes every supported participation status", () => {
  for (const status of programParticipationStatuses) {
    assert.equal(isProgramParticipationStatus(status), true);
    assert.equal(typeof programParticipationStatusLabels[status], "string");
  }

  assert.equal(isProgramParticipationStatus("WAITLISTED"), false);
  assert.equal(isProgramParticipationStatus(null), false);
});

test("only active and completed experiences suppress recommendations", () => {
  assert.equal(excludesProgramFromRecommendations("IN_PROGRESS"), true);
  assert.equal(excludesProgramFromRecommendations("COMPLETED"), true);
  assert.equal(excludesProgramFromRecommendations("APPLIED"), false);
  assert.equal(excludesProgramFromRecommendations("ACCEPTED"), false);
  assert.equal(excludesProgramFromRecommendations("DECLINED"), false);
});
