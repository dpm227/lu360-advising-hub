import assert from "node:assert/strict";
import test from "node:test";
import {
  excludesProgramFromRecommendations,
  isProgramParticipationStatus,
  parseProgramParticipationInput,
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

test("normalizes valid experience details", () => {
  assert.deepEqual(
    parseProgramParticipationInput({
      status: "COMPLETED",
      term: "  Summer 2026  ",
      reflection: "  Strong faculty mentorship.  ",
      liked: true,
    }),
    {
      data: {
        status: "COMPLETED",
        term: "Summer 2026",
        reflection: "Strong faculty mentorship.",
        liked: true,
      },
    },
  );
});

test("rejects invalid experience details", () => {
  assert.match(
    parseProgramParticipationInput({ status: "WAITLISTED" }).error,
    /valid experience status/i,
  );
  assert.match(
    parseProgramParticipationInput({
      status: "APPLIED",
      reflection: "a".repeat(1001),
    }).error,
    /1000 characters/i,
  );
  assert.match(
    parseProgramParticipationInput({ status: "APPLIED", liked: "yes" }).error,
    /rating/i,
  );
});

test("only active and completed experiences suppress recommendations", () => {
  assert.equal(excludesProgramFromRecommendations("IN_PROGRESS"), true);
  assert.equal(excludesProgramFromRecommendations("COMPLETED"), true);
  assert.equal(excludesProgramFromRecommendations("APPLIED"), false);
  assert.equal(excludesProgramFromRecommendations("ACCEPTED"), false);
  assert.equal(excludesProgramFromRecommendations("DECLINED"), false);
});
