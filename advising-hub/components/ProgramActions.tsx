"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

type ProgramActionsProps = {
  programSlug: string;
  applicationUrl?: string;
  sourceUrl: string;
  initialSaved?: boolean;
};

type ProgramAction = "save" | "unsave";

export function ProgramActions({
  programSlug,
  applicationUrl,
  sourceUrl,
  initialSaved = false,
}: ProgramActionsProps) {
  const { status } = useSession();
  const [saved, setSaved] = useState(initialSaved);
  const [isBusy, setIsBusy] = useState(false);

  async function updateProgram(action: ProgramAction) {
    if (status !== "authenticated") {
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
    } finally {
      setIsBusy(false);
    }
  }

  return (
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
      <a
        className="program-action program-action-link"
        href={sourceUrl}
        rel="noreferrer"
        target="_blank"
      >
        View source
      </a>
    </div>
  );
}
