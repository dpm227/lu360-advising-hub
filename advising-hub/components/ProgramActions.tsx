"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

type ProgramActionsProps = {
  programSlug: string;
  initialSaved?: boolean;
  initialHidden?: boolean;
};

type ProgramAction = "save" | "unsave" | "hide" | "unhide";

export function ProgramActions({
  programSlug,
  initialSaved = false,
  initialHidden = false,
}: ProgramActionsProps) {
  const { status } = useSession();
  const [saved, setSaved] = useState(initialSaved);
  const [hidden, setHidden] = useState(initialHidden);
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
        hidden?: boolean;
      };

      setSaved(Boolean(payload.saved));
      setHidden(Boolean(payload.hidden));
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
      <button
        className={hidden ? "program-action muted active" : "program-action muted"}
        disabled={isBusy}
        type="button"
        onClick={() => updateProgram(hidden ? "unhide" : "hide")}
      >
        {hidden ? "Hidden" : "Hide"}
      </button>
    </div>
  );
}
