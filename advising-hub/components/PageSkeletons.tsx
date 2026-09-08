import type { CSSProperties, ReactNode } from "react";

function Skeleton({
  width = "100%",
  height = 14,
  className = "",
}: {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
}) {
  return <span className={`skeleton ${className}`} style={{ width, height }} />;
}

function Lines({ count = 3 }: { count?: number }) {
  return (
    <div className="skeleton-lines">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton width={index === count - 1 ? "72%" : "100%"} key={index} />
      ))}
    </div>
  );
}

function Heading() {
  return (
    <div className="skeleton-heading">
      <Skeleton width={140} height={12} />
      <Skeleton width={300} height={26} />
    </div>
  );
}

function Chips() {
  return (
    <div className="chip-row">
      {[92, 120, 76].map((width) => (
        <Skeleton className="skeleton-pill" width={width} height={30} key={width} />
      ))}
    </div>
  );
}

function Actions() {
  return (
    <div className="program-actions">
      {[58, 62, 100].map((width) => (
        <Skeleton className="skeleton-pill" width={width} height={34} key={width} />
      ))}
    </div>
  );
}

function ProgramCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`program-card ${compact ? "compact" : ""}`}>
      <div className="program-image skeleton" />
      <div className="program-content">
        <div className="skeleton-lines">
          <div className="program-meta">
            <Skeleton className="skeleton-pill" width={120} height={24} />
            <Skeleton className="skeleton-pill" width={64} height={24} />
          </div>
          <Skeleton width="80%" height={22} />
          <Lines count={4} />
        </div>
        <Chips />
        <Actions />
      </div>
    </article>
  );
}

function SkeletonPage({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <p className="sr-only" role="status">{label}</p>
      <div className="page-skeleton" aria-hidden="true">{children}</div>
    </>
  );
}

export function DiscoverSkeleton() {
  return (
    <SkeletonPage label="Loading programs…">
      <section className="carousel-section">
        <div className="carousel-header">
          <Heading />
          <Skeleton width={60} height={18} />
        </div>
        <div className="carousel-shell">
          <div className="carousel-arrow skeleton" />
          <div className="program-carousel">
            {[0, 1, 2, 3].map((index) => (
              <div className="hero-program skeleton" key={index}>
                <div className="skeleton-hero-label"><Skeleton width={180} height={20} /></div>
              </div>
            ))}
          </div>
          <div className="carousel-arrow skeleton" />
        </div>
        <article className="selected-program-panel">
          <div className="selected-program-image skeleton" />
          <div className="selected-program-content">
            <div className="selected-program-heading">
              <Heading />
              <div className="selected-program-links"><Actions /></div>
            </div>
            <Lines count={4} />
            <dl className="program-facts">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index}>
                  <dt><Skeleton width="55%" height={12} /></dt>
                  <dd><Skeleton width="85%" height={18} /></dd>
                </div>
              ))}
            </dl>
            <Chips />
          </div>
        </article>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <Heading />
          <Skeleton className="skeleton-pill" width={128} height={32} />
        </div>
        <div className="recommendation-list">
          {[0, 1, 2].map((index) => (
            <article className="recommendation-row" key={index}>
              <div className="skeleton-lines">
                <Skeleton width="45%" height={20} />
                <Skeleton width="80%" />
              </div>
              <Skeleton width={44} height={24} />
            </article>
          ))}
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading"><Heading /></div>
        <div className="program-grid">
          {[0, 1, 2, 3].map((index) => <ProgramCardSkeleton key={index} />)}
        </div>
      </section>
    </SkeletonPage>
  );
}

export function ChatSkeleton() {
  return (
    <SkeletonPage label="Loading advisor chat…">
      <section className="chat-layout">
        <div className="chat-summary">
          <div className="chat-title-block">
            <p className="eyebrow">LU360 AI Chat Assistant</p>
            <h1>Advisor Chat</h1>
          </div>
          <Skeleton width="70%" height={12} />
          <Skeleton height={26} />
          <Lines count={5} />
        </div>
        <div className="chat-panel">
          <div className="messages">
            <div className="message assistant skeleton-message">
              <Skeleton width="85%" height={22} />
              <Lines count={5} />
            </div>
          </div>
          <div className="quick-prompts">
            {[232, 220, 200].map((width) => (
              <Skeleton className="skeleton-pill" width={width} height={36} key={width} />
            ))}
          </div>
          <div className="composer">
            <Skeleton className="skeleton-pill skeleton-input" height={44} />
            <Skeleton className="skeleton-pill" width={82} height={44} />
          </div>
        </div>
      </section>
    </SkeletonPage>
  );
}

export function ProfileSkeleton() {
  return (
    <SkeletonPage label="Loading your profile…">
      <section className="profile-layout">
        <div className="profile-panel">
          <div className="profile-header">
            <div className="profile-header-main">
              <div className="profile-avatar profile-avatar-image skeleton" />
              <div className="skeleton-heading">
                <Skeleton width={110} height={12} />
                <Skeleton width={150} height={26} />
                <Skeleton width={180} />
              </div>
            </div>
            <Skeleton className="skeleton-pill" width={40} height={40} />
          </div>
          <div className="profile-fields">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <Skeleton width="55%" height={12} />
                <Skeleton width="80%" height={20} />
              </div>
            ))}
          </div>
          {[0, 1].map((index) => (
            <div className="preference-block" key={index}>
              <Skeleton width={170} height={20} />
              <Chips />
            </div>
          ))}
        </div>
        <aside className="profile-side">
          <div className="section-heading"><Heading /></div>
          <ProgramCardSkeleton compact />
          <ProgramCardSkeleton compact />
        </aside>
      </section>
    </SkeletonPage>
  );
}
