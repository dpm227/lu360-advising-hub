import type {
  ProgramParticipationStatus,
  StudentProgramExperience,
} from "./program-participation";

type ParticipationProgram = {
  slug: string;
  title: string;
};

export type ChatProfileUpdate = StudentProgramExperience & {
  kind: "PROGRAM_PARTICIPATION";
};

const STATUS_PATTERNS: Array<{
  status: ProgramParticipationStatus;
  pattern: RegExp;
}> = [
  {
    status: "ACCEPTED",
    pattern:
      /\b(?:i|we)\s+(?:was|were|have been|got)\s+accepted\s+(?:to|into|for)\b/i,
  },
  {
    status: "IN_PROGRESS",
    pattern:
      /\b(?:i(?:'m| am)|we(?:'re| are))\s+(?:currently\s+)?(?:doing|participating in|enrolled in|working on)\b/i,
  },
  {
    status: "APPLIED",
    pattern: /\b(?:i|we)\s+(?:have\s+)?applied\s+(?:to|for)\b/i,
  },
  {
    status: "DECLINED",
    pattern:
      /\b(?:i|we)\s+(?:was|were|have been|got)\s+(?:declined|rejected)\b/i,
  },
  {
    status: "COMPLETED",
    pattern:
      /\b(?:i|we)\s+(?:have\s+)?(?:completed|finished|did|participated in)\b/i,
  },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function aliasesFor(program: ParticipationProgram) {
  const parentheticalAliases = Array.from(
    program.title.matchAll(/\(([A-Z][A-Z0-9+& -]{1,})\)/g),
    (match) => match[1],
  );

  return [
    program.title,
    program.slug.replaceAll("-", " "),
    ...parentheticalAliases,
  ].map(normalize);
}

function messageMentionsProgram(message: string, program: ParticipationProgram) {
  const normalizedMessage = ` ${normalize(message)} `;

  return aliasesFor(program).some(
    (alias) => alias.length > 1 && normalizedMessage.includes(` ${alias} `),
  );
}

function termFromMessage(message: string) {
  return (
    message.match(
      /\b(?:last\s+(?:summer|fall|spring|winter|semester|year)|(?:summer|fall|spring|winter)\s+\d{4})\b/i,
    )?.[0] ?? null
  );
}

function likedFromMessage(message: string) {
  if (/\b(?:didn't|did not)\s+like\b|\b(?:hated|disliked)\b/i.test(message)) {
    return false;
  }

  if (/\b(?:loved|enjoyed|liked)\b/i.test(message)) {
    return true;
  }

  return null;
}

export function detectProgramParticipationUpdates(
  message: string,
  catalog: ParticipationProgram[],
): ChatProfileUpdate[] {
  if (
    /\b(?:i|we)\s+(?:did not|didn't|have not|haven't|never)\b/i.test(
      message,
    )
  ) {
    return [];
  }

  const status = STATUS_PATTERNS.find(({ pattern }) => pattern.test(message))
    ?.status;

  if (!status) {
    return [];
  }

  const liked = likedFromMessage(message);
  const reflection = liked === null ? null : message.trim().slice(0, 1000);
  const term = termFromMessage(message);

  const normalizedMessage = ` ${normalize(message)} `;

  return catalog
    .filter((program) => {
      if (!messageMentionsProgram(message, program)) {
        return false;
      }

      if (
        status === "COMPLETED" &&
        /\b(?:i|we)\s+did\b/i.test(message)
      ) {
        return aliasesFor(program).some((alias) =>
          normalizedMessage.includes(` i did ${alias} `),
        );
      }

      return true;
    })
    .map((program) => ({
      kind: "PROGRAM_PARTICIPATION",
      programSlug: program.slug,
      programTitle: program.title,
      status,
      term,
      reflection,
      liked,
    }));
}
