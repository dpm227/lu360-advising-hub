"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Modal } from "@/components/Modal";
import {
  type ProgramParticipationStatus,
  type StudentProgramExperience,
  programParticipationStatusLabels,
  programParticipationStatuses,
} from "@/lib/program-participation";

type ProgramOption = {
  slug: string;
  title: string;
};

type ExperienceForm = {
  programSlug: string;
  status: ProgramParticipationStatus;
  term: string;
  reflection: string;
  liked: "" | "true" | "false";
};

type ProfileExperiencesProps = {
  initialExperiences: StudentProgramExperience[];
  programs: ProgramOption[];
};

function blankForm(programSlug = ""): ExperienceForm {
  return {
    programSlug,
    status: "APPLIED",
    term: "",
    reflection: "",
    liked: "",
  };
}

function experienceToForm(experience: StudentProgramExperience): ExperienceForm {
  return {
    programSlug: experience.programSlug,
    status: experience.status,
    term: experience.term ?? "",
    reflection: experience.reflection ?? "",
    liked:
      experience.liked === null ? "" : experience.liked ? "true" : "false",
  };
}

export function ProfileExperiences({
  initialExperiences,
  programs,
}: ProfileExperiencesProps) {
  const router = useRouter();
  const [experiences, setExperiences] = useState(initialExperiences);
  const [form, setForm] = useState(() => blankForm(programs[0]?.slug));
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");
  const availablePrograms = programs.filter(
    (program) =>
      !experiences.some(
        (experience) => experience.programSlug === program.slug,
      ),
  );
  const selectablePrograms = editingSlug
    ? programs.filter((program) => program.slug === editingSlug)
    : availablePrograms;

  function openNewExperience() {
    setEditingSlug(null);
    setForm(blankForm(availablePrograms[0]?.slug));
    setError("");
    setOpen(true);
  }

  function openExistingExperience(experience: StudentProgramExperience) {
    setEditingSlug(experience.programSlug);
    setForm(experienceToForm(experience));
    setError("");
    setOpen(true);
  }

  async function saveExperience(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBusy(true);
    setError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experience: {
            action: "upsert",
            programSlug: form.programSlug,
            status: form.status,
            term: form.term,
            reflection: form.reflection,
            liked: form.liked === "" ? null : form.liked === "true",
          },
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        experience?: StudentProgramExperience;
      };

      if (!response.ok || !payload.experience) {
        setError(payload.error ?? "Could not save this experience.");
        return;
      }

      setExperiences((current) => [
        payload.experience!,
        ...current.filter(
          (experience) =>
            experience.programSlug !== payload.experience!.programSlug,
        ),
      ]);
      setOpen(false);
      router.refresh();
    } catch {
      setError("Could not save this experience. Please try again.");
    } finally {
      setIsBusy(false);
    }
  }

  async function deleteExperience() {
    if (!editingSlug) {
      return;
    }

    setIsBusy(true);
    setError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experience: {
            action: "delete",
            programSlug: editingSlug,
          },
        }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Could not remove this experience.");
        return;
      }

      setExperiences((current) =>
        current.filter((experience) => experience.programSlug !== editingSlug),
      );
      setOpen(false);
      router.refresh();
    } catch {
      setError("Could not remove this experience. Please try again.");
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <section className="profile-experiences">
      <div className="profile-experiences-heading">
        <div>
          <h3>My experiences</h3>
          <p>Track programs you applied to, joined, or completed.</p>
        </div>
        <button
          className="program-action"
          disabled={availablePrograms.length === 0}
          onClick={openNewExperience}
          type="button"
        >
          Add experience
        </button>
      </div>

      {experiences.length > 0 ? (
        <div className="profile-experience-list">
          {experiences.map((experience) => (
            <button
              className="profile-experience-card"
              key={experience.programSlug}
              onClick={() => openExistingExperience(experience)}
              type="button"
            >
              <span>
                <strong>{experience.programTitle}</strong>
                <small>
                  {programParticipationStatusLabels[experience.status]}
                  {experience.term ? ` · ${experience.term}` : ""}
                </small>
              </span>
              <span aria-hidden="true">Edit</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="profile-empty">
          No program experiences saved yet. Add one to improve future
          recommendations.
        </p>
      )}

      <Modal
        labelledBy="experience-dialog-title"
        onClose={() => setOpen(false)}
        open={open}
        panelClassName="experience-dialog"
      >
        <form className="profile-dialog-form" onSubmit={saveExperience}>
          <div className="profile-dialog-header">
            <div>
              <p className="eyebrow">Past experience</p>
              <h2 id="experience-dialog-title">
                {editingSlug ? "Edit experience" : "Add experience"}
              </h2>
              <p>
                This history helps LU360 avoid repeated recommendations and
                find related opportunities.
              </p>
            </div>
          </div>

          <div className="profile-form-grid">
            <label className="profile-form-wide">
              <span>Program</span>
              <select
                disabled={Boolean(editingSlug)}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    programSlug: event.target.value,
                  }))
                }
                required
                value={form.programSlug}
              >
                {selectablePrograms.map((program) => (
                  <option key={program.slug} value={program.slug}>
                    {program.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Status</span>
              <select
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as ProgramParticipationStatus,
                  }))
                }
                value={form.status}
              >
                {programParticipationStatuses.map((status) => (
                  <option key={status} value={status}>
                    {programParticipationStatusLabels[status]}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Term (optional)</span>
              <input
                maxLength={80}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    term: event.target.value,
                  }))
                }
                placeholder="Summer 2026"
                value={form.term}
              />
            </label>

            <label className="profile-form-wide">
              <span>Would you recommend this experience?</span>
              <select
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    liked: event.target.value as ExperienceForm["liked"],
                  }))
                }
                value={form.liked}
              >
                <option value="">Not specified</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>

            <label className="profile-form-wide">
              <span>Reflection (optional)</span>
              <textarea
                maxLength={1000}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    reflection: event.target.value,
                  }))
                }
                placeholder="What did you like or dislike?"
                rows={4}
                value={form.reflection}
              />
            </label>
          </div>

          {error ? <p className="profile-dialog-error">{error}</p> : null}

          <div className="profile-dialog-actions experience-dialog-actions">
            {editingSlug ? (
              <button
                className="experience-delete-button"
                disabled={isBusy}
                onClick={deleteExperience}
                type="button"
              >
                Remove
              </button>
            ) : null}
            <span />
            <button
              disabled={isBusy}
              onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button disabled={isBusy || !form.programSlug} type="submit">
              {isBusy ? "Saving..." : "Save experience"}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
