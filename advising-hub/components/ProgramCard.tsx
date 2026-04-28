import type { ProgramRecord } from "@/lib/program-data";

type ProgramCardProps = {
  program: ProgramRecord;
  compact?: boolean;
};

export function ProgramCard({ program, compact = false }: ProgramCardProps) {
  return (
    <article className={`program-card ${compact ? "compact" : ""}`}>
      <div
        className="program-image"
        style={{ backgroundImage: `url("${program.imageUrl}")` }}
      />
      <div className="program-content">
        <div>
          <div className="program-meta">
            {program.deadline ? (
              <span>
                Deadline{" "}
                {new Intl.DateTimeFormat("en", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(`${program.deadline}T00:00:00Z`))}
              </span>
            ) : (
              <span>Rolling details</span>
            )}
            {program.fundingTypes[0] ? <span>{program.fundingTypes[0]}</span> : null}
          </div>
          <h2>{program.title}</h2>
          <p>{program.description}</p>
        </div>
        <div className="chip-row">
          {program.opportunityTypes.slice(0, 3).map((type) => (
            <span className="chip" key={type}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

