"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="auth-status">Loading...</span>;
  }

  if (session?.user) {
    return (
      <div className="auth-user">
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" />
        ) : (
          <span className="auth-avatar">{session.user.name?.slice(0, 1) ?? "U"}</span>
        )}
        <button type="button" onClick={() => void signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      className="google-signin-button"
      type="button"
      onClick={() => void signIn("google")}
    >
      Sign in with Google
    </button>
  );
}

