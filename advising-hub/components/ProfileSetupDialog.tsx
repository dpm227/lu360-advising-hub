"use client";

import { type FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";

export type EditableProfile = {
  firstName: string;
  lastName: string;
  email: string;
  classYear: string;
  college: string;
  major: string;
  needsFunding: boolean;
  interests: string[];
  keywords: string[];
  statuses: string[];
};

export type ProfileOptions = {
  classYears: string[];
  colleges: string[];
  opportunityTypes: string[];
  statusSuggestions: string[];
};

type ProfileSetupDialogProps = {
  initialProfile: EditableProfile;
  open: boolean;
  options: ProfileOptions;
  onClose: () => void;
  onSaved?: (profile: EditableProfile) => void;
  intro?: string;
  title?: string;
};

function listToText(value: string[]) {
  return value.join(", ");
}

function textToList(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean),
    ),
  );
}

export function ProfileSetupDialog({
  initialProfile,
  open,
  options,
  onClose,
  onSaved,
  intro = "Add a few details so LU360 can tune recommendations around your year, college, interests, and funding needs.",
  title = "Set up your student profile",
}: ProfileSetupDialogProps) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [keywordText, setKeywordText] = useState(listToText(initialProfile.keywords));
  const [statusText, setStatusText] = useState(listToText(initialProfile.statuses));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedInterests = useMemo(
    () => new Set(profile.interests),
    [profile.interests],
  );

  function updateField(field: keyof EditableProfile, value: string | boolean) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function toggleInterest(interest: string) {
    setProfile((current) => {
      const nextInterests = new Set(current.interests);

      if (nextInterests.has(interest)) {
        nextInterests.delete(interest);
      } else {
        nextInterests.add(interest);
      }

      return { ...current, interests: Array.from(nextInterests) };
    });
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...profile,
        keywords: textToList(keywordText),
        statuses: textToList(statusText),
      }),
    });

    setSaving(false);

    if (!response.ok) {
      setError("Profile could not be saved. Please try again.");
      return;
    }

    const payload = (await response.json()) as { profile: EditableProfile };
    onSaved?.(payload.profile);
    onClose();
    router.refresh();
  }

  if (!open) {
    return null;
  }

  return (
    <Modal labelledBy="profile-dialog-title" onClose={onClose} open={open}>
      <form
        className="profile-dialog-form"
        onSubmit={(event) => void saveProfile(event)}
      >
        <div className="profile-dialog-header">
          <div>
            <p className="eyebrow">Student profile</p>
            <h2 id="profile-dialog-title">{title}</h2>
            <p>{intro}</p>
          </div>
        </div>

        <div className="profile-form-grid">
          <label>
            <span>First name</span>
            <input
              autoComplete="given-name"
              onChange={(event) => updateField("firstName", event.target.value)}
              value={profile.firstName}
            />
          </label>
          <label>
            <span>Last name</span>
            <input
              autoComplete="family-name"
              onChange={(event) => updateField("lastName", event.target.value)}
              value={profile.lastName}
            />
          </label>
          <label>
            <span>Class year</span>
            <select
              onChange={(event) => updateField("classYear", event.target.value)}
              value={profile.classYear}
            >
              <option value="">Select year</option>
              {options.classYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>College</span>
            <select
              onChange={(event) => updateField("college", event.target.value)}
              value={profile.college}
            >
              <option value="">Select college</option>
              {options.colleges.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </label>
          <label className="profile-form-wide">
            <span>Major or intended field</span>
            <input
              onChange={(event) => updateField("major", event.target.value)}
              placeholder="Example: Population health, finance, mechanical engineering"
              value={profile.major}
            />
          </label>
          <label className="profile-funding-toggle">
            <input
              checked={profile.needsFunding}
              onChange={(event) => updateField("needsFunding", event.target.checked)}
              type="checkbox"
            />
            <span>I need paid or funded opportunities</span>
          </label>
        </div>

        <div className="profile-dialog-section">
          <h3>Opportunity interests</h3>
          <div className="profile-choice-grid">
            {options.opportunityTypes.map((interest) => (
              <label
                className={`profile-choice ${
                  selectedInterests.has(interest) ? "selected" : ""
                }`}
                key={interest}
              >
                <input
                  checked={selectedInterests.has(interest)}
                  onChange={() => toggleInterest(interest)}
                  type="checkbox"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="profile-form-grid">
          <label className="profile-form-wide">
            <span>Keywords</span>
            <input
              onChange={(event) => setKeywordText(event.target.value)}
              placeholder="research, public health, entrepreneurship"
              value={keywordText}
            />
          </label>
          <label className="profile-form-wide">
            <span>Student statuses</span>
            <input
              list="profile-status-suggestions"
              onChange={(event) => setStatusText(event.target.value)}
              placeholder="F1RST+ Student, Transfer Student"
              value={statusText}
            />
            <datalist id="profile-status-suggestions">
              {options.statusSuggestions.map((status) => (
                <option key={status} value={status} />
              ))}
            </datalist>
          </label>
        </div>

        {error ? <p className="profile-dialog-error">{error}</p> : null}

        <div className="profile-dialog-actions">
          <button onClick={onClose} type="button">
            Cancel
          </button>
          <button disabled={saving} type="submit">
            {saving ? "Saving..." : "Save profile"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
