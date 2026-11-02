import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  sections: LegalSection[];
};

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <AppShell title={title} hidePageHeader>
      <article className="legal-page">
        <header className="legal-header">
          <p className="eyebrow">Lehigh360 AI Chat Assistant</p>
          <h1>{title}</h1>
          <p className="legal-date">
            Effective Date: <time dateTime="2026-10-26">October 26, 2026</time>
          </p>
        </header>

        <div className="legal-layout">
          <aside className="legal-contents">
            <details open>
              <summary>On this page</summary>
              <nav aria-label={`${title} sections`}>
                <ol>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.title}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          </aside>

          <div className="legal-content">
            {sections.map((section, index) => (
              <section
                aria-labelledby={section.id}
                className="legal-section"
                key={section.id}
              >
                <h2 id={section.id}>
                  {index + 1}. {section.title}
                </h2>
                {section.content}
              </section>
            ))}
            <p className="legal-updated">
              Last Updated: <time dateTime="2026-10-26">October 26, 2026</time>
            </p>
          </div>
        </div>
      </article>
    </AppShell>
  );
}
