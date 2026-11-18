import assert from "node:assert/strict";
import test from "node:test";
import { detectProgramParticipationUpdates } from "../lib/chat-profile-updates.ts";

const catalog = [
  {
    slug: "lussi-student-guides",
    title: "Lehigh University Student Scholars Institute (LUSSI) Student Guides",
  },
  { slug: "marcon-fellows", title: "Marcon Fellows" },
];

test("detects a completed program without saving it", () => {
  assert.deepEqual(
    detectProgramParticipationUpdates(
      "I did LUSSI last summer and loved the mentoring experience.",
      catalog,
    ),
    [
      {
        kind: "PROGRAM_PARTICIPATION",
        programSlug: "lussi-student-guides",
        programTitle:
          "Lehigh University Student Scholars Institute (LUSSI) Student Guides",
        status: "COMPLETED",
        term: "last summer",
        reflection:
          "I did LUSSI last summer and loved the mentoring experience.",
        liked: true,
      },
    ],
  );
});

test("detects applications but ignores hypothetical intent", () => {
  assert.equal(
    detectProgramParticipationUpdates(
      "I applied to Marcon Fellows for summer 2026.",
      catalog,
    )[0]?.status,
    "APPLIED",
  );
  assert.deepEqual(
    detectProgramParticipationUpdates(
      "I want to apply to Marcon Fellows.",
      catalog,
    ),
    [],
  );
  assert.deepEqual(
    detectProgramParticipationUpdates(
      "Did I complete Marcon Fellows?",
      catalog,
    ),
    [],
  );
  assert.deepEqual(
    detectProgramParticipationUpdates(
      "I didn't like LUSSI and want another option.",
      catalog,
    ),
    [],
  );
});
