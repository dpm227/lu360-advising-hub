import type { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { AuthButton } from "@/components/AuthButton";
import { ProfileNavIcon } from "@/components/ProfileNavIcon";

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

  return <ProfileNavIcon />;
}

export function AppShell({
  active,
  title,
  hidePageHeader = false,
  children,
}: AppShellProps) {
  const activeItem = navItems.find((item) => item.id === active) ?? navItems[0];

  return (
    <main className="site-shell">
      <nav className="site-navbar" aria-label="Primary navigation">
        <Link className="site-brand" href="/">
          <span>
            <strong>Lehigh360</strong>
            <small>AI Chat Assistant</small>
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

        <details className="mobile-nav-selector">
          <summary>
            <span className="mobile-nav-current">
              <NavIcon type={activeItem.icon} />
              <span>{activeItem.label}</span>
            </span>
            <svg
              aria-hidden="true"
              className="mobile-nav-chevron"
              fill="none"
              height="18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="18"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="mobile-nav-menu">
            {navItems.map((item) => (
              <Link
                className={`mobile-nav-option ${
                  active === item.id ? "active" : ""
                }`}
                href={item.href}
                key={item.id}
              >
                <NavIcon type={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="mobile-nav-auth">
              <AuthButton />
            </div>
          </div>
        </details>
      </nav>

      <section className="app-surface" aria-label={title}>
        {!hidePageHeader ? (
          <header className="page-header">
            <p className="eyebrow">LU360 AI Chat Assistant</p>
            <h1>{title}</h1>
          </header>
        ) : null}
        {children}
      </section>
    </main>
  );
}
