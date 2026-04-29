import type { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { AuthButton } from "@/components/AuthButton";

type AppShellProps = {
  active: "discover" | "chat" | "profile";
  title: string;
  hidePageHeader?: boolean;
  children: ReactNode;
};

const navItems = [
  { id: "discover", label: "Discover", href: "/", icon: "search" },
  { id: "chat", label: "Chat", href: "/chat", icon: "chat" },
  { id: "profile", label: "Profile", href: "/profile", icon: "profile" },
] as const;

function NavIconBase({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="20"
    >
      {children}
    </svg>
  );
}

function NavIcon({ type }: { type: (typeof navItems)[number]["icon"] }) {
  const iconProps = {
    "aria-hidden": true,
    className: "nav-icon",
  };

  if (type === "search") {
    return (
      <NavIconBase {...iconProps}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </NavIconBase>
    );
  }

  if (type === "chat") {
    return (
      <NavIconBase {...iconProps}>
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </NavIconBase>
    );
  }

  return (
    <NavIconBase {...iconProps}>
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="12" r="10" />
    </NavIconBase>
  );
}

export function AppShell({
  active,
  title,
  hidePageHeader = false,
  children,
}: AppShellProps) {
  return (
    <main className="site-shell">
      <nav className="site-navbar" aria-label="Primary navigation">
        <Link className="site-brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            LU
          </span>
          <span>
            <strong>LU360</strong>
            <small>Advising Hub</small>
          </span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              className={`nav-link ${active === item.id ? "active" : ""}`}
              href={item.href}
              key={item.id}
            >
              <NavIcon type={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
          <AuthButton />
        </div>
      </nav>

      <section className="app-surface" aria-label={title}>
        {!hidePageHeader ? (
          <header className="page-header">
            <p className="eyebrow">LU360 Advising Hub</p>
            <h1>{title}</h1>
          </header>
        ) : null}
        {children}
      </section>
    </main>
  );
}
