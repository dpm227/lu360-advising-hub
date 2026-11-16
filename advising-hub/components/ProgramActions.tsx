"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  type ProgramParticipationStatus,
  type StudentProgramExperience,
  programParticipationStatusLabels,
} from "@/lib/program-participation";

type ProgramActionsProps = {
  programName: string;
  programSlug: string;
  applicationUrl?: string;
  sourceUrl: string;
  initialSaved?: boolean;
  initialExperience?: StudentProgramExperience;
  saved?: boolean;
  onSavedChange?: (saved: boolean) => void;
  hideChatAction?: boolean;
};

type ProgramAction = "save" | "unsave";

export function ProgramActions({
  programName,
  programSlug,
  applicationUrl,
  sourceUrl,
  initialSaved = false,
  initialExperience,
  saved: savedOverride,
  onSavedChange,
  hideChatAction = false,
}: ProgramActionsProps) {
  const { status: sessionStatus } = useSession();
  const [localSaved, setSaved] = useState(initialSaved);
  const saved = savedOverride ?? localSaved;
  const [isBusy, setIsBusy] = useState(false);
  const [experience, setExperience] = useState(initialExperience);

  async function updateProgram(action: ProgramAction) {
    if (sessionStatus !== "authenticated") {
      signIn("google");
      return;
    }

    setIsBusy(true);

    try {
      const response = await fetch(
        `/api/programs/${encodeURIComponent(programSlug)}/interaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        },
      );

      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as {
        saved?: boolean;
      };

      setSaved(Boolean(payload.saved));
      onSavedChange?.(Boolean(payload.saved));
    } finally {
      setIsBusy(false);
    }
  }

  async function updateParticipation(
    participationStatus: ProgramParticipationStatus,
  ) {
    if (sessionStatus !== "authenticated") {
      signIn("google");
      return;
    }

    setIsBusy(true);

    try {
      const response = await fetch(
        `/api/programs/${encodeURIComponent(programSlug)}/interaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "participate",
            participation: {
              status: participationStatus,
              term: experience?.term ?? null,
              reflection: experience?.reflection ?? null,
              liked: experience?.liked ?? null,
            },
          }),
        },
      );

      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as {
        participation?: StudentProgramExperience | null;
      };

      if (payload.participation) {
        setExperience(payload.participation);
      }
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="program-action-groups">
      <div className="program-actions">
        <button
          className={saved ? "program-action active" : "program-action"}
          disabled={isBusy}
          type="button"
          onClick={() => updateProgram(saved ? "unsave" : "save")}
        >
          {saved ? "Saved" : "Save"}
        </button>
        {applicationUrl ? (
          <a
            className="program-action program-action-link"
            href={applicationUrl}
            rel="noreferrer"
            target="_blank"
          >
            Apply
          </a>
        ) : null}
        {!hideChatAction ? (
          <Link
            className="program-action program-action-link"
            href={`/chat?prompt=${encodeURIComponent(`Please give me an overview of ${programName}, including eligibility, funding, deadlines, and how well it may fit my profile.`)}&autoSend=1`}
          >
            Chat
          </Link>
        ) : null}
        <a
          className="program-action program-action-link"
          href={sourceUrl}
          rel="noreferrer"
          target="_blank"
        >
          View source
        </a>
      </div>
      <div className="program-participation-actions">
        {experience &&
        experience.status !== "APPLIED" &&
        experience.status !== "COMPLETED" ? (
          <span className="participation-badge">
            {programParticipationStatusLabels[experience.status]}
          </span>
        ) : null}
        <button
          className={
            experience?.status === "APPLIED"
              ? "program-action active"
              : "program-action"
          }
          disabled={isBusy}
          onClick={() => updateParticipation("APPLIED")}
          type="button"
        >
          {experience?.status === "APPLIED" ? "Applied" : "I applied"}
        </button>
        <button
          className={
            experience?.status === "COMPLETED"
              ? "program-action active"
              : "program-action"
          }
          disabled={isBusy}
          onClick={() => updateParticipation("COMPLETED")}
          type="button"
        >
          {experience?.status === "COMPLETED"
            ? "Completed"
            : "I've done this"}
        </button>
      </div>
    </div>
  );
}
