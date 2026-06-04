"use client";

import { useRef, useState } from "react";
import type { ProgramRecord } from "@/lib/program-data";
import { ProgramActions } from "@/components/ProgramActions";

export type FeaturedProgramMatch = {
  program: ProgramRecord;
  score: number;
};

type DiscoverCarouselProps = {
  programs: FeaturedProgramMatch[];
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

export function DiscoverCarousel({ programs }: DiscoverCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedMatch = programs[selectedIndex];
  const selectedProgram = selectedMatch?.program;

  function selectProgram(index: number) {
    const nextIndex = (index + programs.length) % programs.length;
    setSelectedIndex(nextIndex);
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
        />
        <div className="selected-program-content">
          <div className="selected-program-heading">
            <div>
              <p className="eyebrow">Selected program</p>
              <h2>{selectedProgram.title}</h2>
            </div>
            <div className="selected-program-links">
              <ProgramActions
                applicationUrl={selectedProgram.applicationUrl}
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
