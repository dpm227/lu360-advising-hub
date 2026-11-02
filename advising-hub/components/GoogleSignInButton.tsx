"use client";

import { useRef, useState } from "react";
import { signIn } from "next-auth/react";

type GoogleSignInButtonProps = {
  callbackUrl?: string;
  className?: string;
};

export function GoogleSignInButton({
  callbackUrl,
  className = "google-signin-button",
}: GoogleSignInButtonProps) {
  const pendingRef = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSignIn() {
    if (pendingRef.current) return;
    pendingRef.current = true;
    setIsPending(true);
    setError(false);

    try {
      await signIn("google", { callbackUrl: callbackUrl ?? window.location.href });
    } catch {
      pendingRef.current = false;
      setIsPending(false);
      setError(true);
    }
  }

  return (
    <>
      <button
        className={className}
        type="button"
        disabled={isPending}
        aria-busy={isPending}
        onClick={() => void handleSignIn()}
      >
        {isPending ? "Connecting to Google..." : "Sign in with Google"}
      </button>
      {error ? <span role="alert">Sign-in could not start. Please try again.</span> : null}
    </>
  );
}
