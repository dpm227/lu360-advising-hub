"use client";

import { signOut, useSession } from "next-auth/react";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="auth-status">Loading...</span>;
  }

  if (session?.user) {
    return (
      <div className="auth-user">
        <button type="button" onClick={() => void signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return <GoogleSignInButton />;
}
