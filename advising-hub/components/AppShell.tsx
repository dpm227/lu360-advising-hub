import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

type AppShellProps = {
  active: "discover" | "chat" | "profile";
  title: string;
  hidePageHeader?: boolean;
  children: React.ReactNode;
};

const navItems = [
  { id: "discover", label: "Discover", href: "/", icon: "search" },
  { id: "chat", label: "Chat", href: "/chat", icon: "chat" },
  { id: "profile", label: "Profile", href: "/profile", icon: "profile" },
] as const;

function MaterialIcon({ type }: { type: (typeof navItems)[number]["icon"] }) {
  const iconProps = {
    "aria-hidden": true,
    className: "nav-icon",
    fontSize: "small" as const,
  };

  if (type === "search") {
    return <SearchIcon {...iconProps} />;
  }

  if (type === "chat") {
    return <ChatBubbleOutlineOutlinedIcon {...iconProps} />;
  }

  return <AccountCircleIcon {...iconProps} />;
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
              <MaterialIcon type={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
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
