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
    <main className="app-canvas">
      <section className="browser-frame" aria-label="LU360 Advising Hub">
        <div className="browser-bar" aria-hidden="true">
          <div className="browser-controls">
            <span />
            <span />
            <span />
          </div>
          <div className="address-bar">
            <span className="lock-mark" />
            <span>www.lu360-hub.com</span>
          </div>
          <div className="browser-avatar">M</div>
          <span className="kebab" />
        </div>

        <div className="app-surface">
          <div className="top-app-bar">
            <button className="icon-button" type="button" aria-label="Back">
              <span className="arrow-left" aria-hidden="true" />
            </button>
            <h1>{title}</h1>
            <button className="icon-button" type="button" aria-label="More">
              <span className="kebab dark" aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>

        <nav className="navigation-rail" aria-label="Primary navigation">
          <button className="rail-menu" type="button" aria-label="Menu">
            <span className="hamburger" aria-hidden="true" />
          </button>
          <Link className="rail-fab" href="/chat" aria-label="Ask advisor">
            <span className="pencil" aria-hidden="true" />
          </Link>
          <div className="rail-links">
            {navItems.map((item) => (
              <Link
                className={`rail-link ${active === item.id ? "active" : ""}`}
                href={item.href}
                key={item.id}
              >
                <span className="rail-icon">
                  <MaterialIcon type={item.icon} />
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </section>
    </main>
  );
}

