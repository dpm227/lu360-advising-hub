"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import {
  type EditableProfile,
  type ProfileOptions,
  ProfileSetupDialog,
} from "@/components/ProfileSetupDialog";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ProfileOnboardingPrompt />
    </SessionProvider>
  );
}

type ProfilePayload = {
  profile: EditableProfile;
  options: ProfileOptions;
  requiresOnboarding: boolean;
};

function ProfileOnboardingPrompt() {
  const { data: session, status } = useSession();
  const [payload, setPayload] = useState<ProfilePayload | null>(null);
  const [open, setOpen] = useState(false);
  const checkedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const userId = session?.user?.id;

    if (
      status !== "authenticated" ||
      !userId ||
      checkedUserIdRef.current === userId
    ) {
      return;
    }

    checkedUserIdRef.current = userId;

    async function loadProfile() {
      const response = await fetch("/api/profile");

      if (!response.ok) {
        return;
      }

      const nextPayload = (await response.json()) as ProfilePayload;
      setPayload(nextPayload);

      if (nextPayload.requiresOnboarding) {
        setOpen(true);
      }
    }

    void loadProfile();
  }, [session?.user?.id, status]);

  if (!payload || !open) {
    return null;
  }

  return (
    <ProfileSetupDialog
      initialProfile={payload.profile}
      onClose={() => setOpen(false)}
      onSaved={(profile) =>
        setPayload((current) => (current ? { ...current, profile } : current))
      }
      open={open}
      options={payload.options}
    />
  );
}
