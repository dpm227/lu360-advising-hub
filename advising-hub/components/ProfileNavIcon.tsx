"use client";

import { useSession } from "next-auth/react";

function DefaultProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="nav-icon"
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="20"
    >
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function ProfileNavIcon() {
  const { data: session } = useSession();

  if (!session?.user) {
    return <DefaultProfileIcon />;
  }

  if (session.user.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt=""
        className="nav-profile-image"
        referrerPolicy="no-referrer"
        src={session.user.image}
      />
    );
  }

  return (
    <span className="nav-profile-fallback" aria-hidden="true">
      {session.user.name?.slice(0, 1).toUpperCase() ?? "U"}
    </span>
  );
}
