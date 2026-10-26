import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Lehigh360 AI Chat Assistant</p>
      <nav aria-label="Legal">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms and Conditions</Link>
      </nav>
    </footer>
  );
}
