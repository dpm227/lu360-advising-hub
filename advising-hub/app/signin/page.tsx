"use client";

import { signIn } from "next-auth/react";
import { AppShell } from "@/components/AppShell";

export default function SignInPage() {
  return (
    <AppShell active="profile" title="Sign In">
      <section className="signin-panel">
        <div>
          <p className="eyebrow">Google OAuth</p>
          <h2>Sign in to LU360 Advising Hub</h2>
          <p>
            Use your Google account to save profile details, chat history, and
            program recommendations.
          </p>
        </div>
        <button type="button" onClick={() => void signIn("google")}>
          Sign in with Google
        </button>
      </section>
    </AppShell>
  );
}

