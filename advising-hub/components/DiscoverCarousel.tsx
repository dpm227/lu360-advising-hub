"use client";

import { useRef, useState } from "react";
import type { ProgramRecord } from "@/lib/program-data";
import { ProgramActions } from "@/components/ProgramActions";
import { MOBILE_QUERY } from "@/lib/use-mobile-viewport";

export type FeaturedProgramMatch = {
  program: ProgramRecord;
  score: number;
};

type DiscoverCarouselProps = {
  programs: FeaturedProgramMatch[];
  savedSlugs: string[];
};

function formatDate(date?: string) {
  if (!date) {
    return "Not listed";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function DiscoverCarousel({ programs, savedSlugs }: DiscoverCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [savedBySlug, setSavedBySlug] = useState<Record<string, boolean>>({});
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const selectedMatch = programs[selectedIndex];
  const selectedProgram = selectedMatch?.program;

  function selectProgram(index: number) {
    const nextIndex = (index + programs.length) % programs.length;
    setSelectedIndex(nextIndex);
    // Mobile controls live in the detail tile; never scroll the page to a hidden thumbnail.
    if (window.matchMedia(MOBILE_QUERY).matches) return;
    itemRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  if (!selectedProgram) {
    return null;
  }

  return (
    <section className="carousel-section" aria-label="Top programs">
      <div className="carousel-header">
        <div>
          <p className="eyebrow">Top programs</p>
          <h2>Browse featured opportunities</h2>
        </div>
        <a className="text-action" href="#all-programs">
          Show all
        </a>
      </div>

      <div className="carousel-shell">
        <button
          className="carousel-arrow left"
          type="button"
          aria-label="Previous program"
          onClick={() => selectProgram(selectedIndex - 1)}
        >
          <span aria-hidden="true" />
        </button>

        <div className="program-carousel">
          {programs.map(({ program, score }, index) => (
            <button
              className={`hero-program ${index === selectedIndex ? "selected" : ""} ${
                program.imageUrl ? "" : "no-image"
              }`}
              key={program.id}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              style={
                program.imageUrl
                  ? { backgroundImage: `url("${program.imageUrl}")` }
                  : undefined
              }
              type="button"
              onClick={() => selectProgram(index)}
            >
              <span>{program.title}</span>
              {score > 0 ? (
                <strong className="hero-program-match-label">{score}% Match</strong>
              ) : null}
            </button>
          ))}
        </div>

        <button
          className="carousel-arrow right"
          type="button"
          aria-label="Next program"
          onClick={() => selectProgram(selectedIndex + 1)}
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <article className="selected-program-panel">
        <div
          className={`selected-program-image ${selectedProgram.imageUrl ? "" : "no-image"}`}
          style={
            selectedProgram.imageUrl
              ? { backgroundImage: `url("${selectedProgram.imageUrl}")` }
              : undefined
          }
          aria-label={selectedProgram.imageAlt || selectedProgram.title}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            swipeStart.current = window.matchMedia(MOBILE_QUERY).matches && event.touches.length === 1
              ? { x: touch.clientX, y: touch.clientY }
              : null;
          }}
          onTouchCancel={() => { swipeStart.current = null; }}
          onTouchEnd={(event) => {
            const start = swipeStart.current;
            swipeStart.current = null;
            const touch = event.changedTouches[0];
            if (!start || !touch) return;
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              selectProgram(selectedIndex + (dx < 0 ? 1 : -1));
            }
          }}
        >
          <div className="mobile-carousel-controls">
            {selectedMatch.score > 0 ? (
              <strong className="hero-program-match-label">{selectedMatch.score}% Match</strong>
            ) : null}
            <button
              className="carousel-arrow left"
              type="button"
              aria-label="Previous program"
              aria-controls="selected-program-details"
              disabled={programs.length < 2}
              onClick={() => selectProgram(selectedIndex - 1)}
            >
              <span aria-hidden="true" />
            </button>
            <span className="mobile-carousel-position" aria-live="polite" aria-atomic="true">
              {selectedIndex + 1} / {programs.length}
              <span className="sr-only">: {selectedProgram.title}</span>
            </span>
            <button
              className="carousel-arrow right"
              type="button"
              aria-label="Next program"
              aria-controls="selected-program-details"
              disabled={programs.length < 2}
              onClick={() => selectProgram(selectedIndex + 1)}
            >
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="selected-program-content" id="selected-program-details">
          <div className="selected-program-heading">
            <div>
              <p className="eyebrow">Selected program</p>
              <h2>{selectedProgram.title}</h2>
            </div>
            <div className="selected-program-links">
              <ProgramActions
                key={selectedProgram.slug}
                applicationUrl={selectedProgram.applicationUrl}
                saved={savedBySlug[selectedProgram.slug] ?? savedSlugs.includes(selectedProgram.slug)}
                onSavedChange={(saved) =>
                  setSavedBySlug((current) => ({ ...current, [selectedProgram.slug]: saved }))
                }
                programName={selectedProgram.title}
                programSlug={selectedProgram.slug}
                sourceUrl={selectedProgram.sourceUrl}
              />
            </div>
          </div>
          <p>{selectedProgram.description}</p>
          <dl className="program-facts">
            <div>
              <dt>Deadline</dt>
              <dd>{formatDate(selectedProgram.deadline)}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{selectedProgram.periods.join(", ") || "Not listed"}</dd>
            </div>
            <div>
              <dt>Eligibility</dt>
              <dd>
                {selectedProgram.eligibleClassYears.join(", ") || "Not listed"}
              </dd>
            </div>
            <div>
              <dt>Funding</dt>
              <dd>{selectedProgram.fundingTypes.join(", ") || "Not listed"}</dd>
            </div>
            <div>
              <dt>Credit</dt>
              <dd>{selectedProgram.creditAvailable ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt>GPA Requirement</dt>
              <dd>
                {selectedProgram.gpaMinimumRequired
                  ? selectedProgram.gpaRequirement || "Required, not listed"
                  : "No minimum listed"}
              </dd>
            </div>
          </dl>
          <div className="chip-row">
            {selectedProgram.opportunityTypes.slice(0, 5).map((type) => (
              <span className="chip" key={type}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
