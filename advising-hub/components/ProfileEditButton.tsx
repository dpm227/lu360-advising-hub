"use client";

import { useState } from "react";
import {
  type EditableProfile,
  type ProfileOptions,
  ProfileSetupDialog,
} from "@/components/ProfileSetupDialog";

type ProfileEditButtonProps = {
  initialProfile: EditableProfile;
  options: ProfileOptions;
};

export function ProfileEditButton({
  initialProfile,
  options,
}: ProfileEditButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Edit profile"
        className="profile-edit-button"
        onClick={() => setOpen(true)}
        title="Edit profile"
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>
      {open ? (
        <ProfileSetupDialog
          initialProfile={initialProfile}
          intro="Update the details LU360 uses to personalize recommendations and saved program context."
          onClose={() => setOpen(false)}
          open={open}
          options={options}
          title="Edit your student profile"
        />
      ) : null}
    </>
  );
}
