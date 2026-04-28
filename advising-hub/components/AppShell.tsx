import Link from "next/link";

type AppShellProps = {
  active: "discover" | "chat" | "profile";
  title: string;
  children: React.ReactNode;
};

const navItems = [
  { id: "discover", label: "Discover", href: "/", icon: "search" },
  { id: "chat", label: "Chat", href: "/chat", icon: "chat" },
  { id: "profile", label: "Profile", href: "/profile", icon: "profile" },
] as const;

function MaterialIcon({ type }: { type: (typeof navItems)[number]["icon"] }) {
  return <span aria-hidden="true" className={`material-symbol ${type}`} />;
}

export function AppShell({ active, title, children }: AppShellProps) {
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
              <MaterialIcon type={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <section className="app-surface" aria-label={title}>
        <header className="page-header">
          <p className="eyebrow">LU360 Advising Hub</p>
          <h1>{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
