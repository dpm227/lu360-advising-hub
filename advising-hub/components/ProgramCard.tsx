import type { ProgramRecord } from "@/lib/program-data";
import { ProgramActions } from "@/components/ProgramActions";
import Link from "next/link";
import type { ChatRecommendationInfo } from "@/lib/chat-recommendations";

type ProgramCardProps = {
  program: ProgramRecord;
  compact?: boolean;
  initialSaved?: boolean;
  chatRecommendation?: ChatRecommendationInfo;
};

export function ProgramCard({
  program,
  compact = false,
  initialSaved = false,
  chatRecommendation,
}: ProgramCardProps) {
  return (
    <article className={`program-card ${compact ? "compact" : ""}`}>
      <div
        className={`program-image ${program.imageUrl ? "" : "no-image"}`}
        style={
          program.imageUrl
            ? { backgroundImage: `url("${program.imageUrl}")` }
            : undefined
        }
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
          {chatRecommendation ? (
            <div className="chat-recommendation-detail">
              <span className="chat-recommendation-badge">Recommended by Chatbot</span>
              {chatRecommendation.explanation ? (
                <p>{chatRecommendation.explanation}</p>
              ) : null}
              {chatRecommendation.threadId ? (
                <Link href={`/chat?thread=${encodeURIComponent(chatRecommendation.threadId)}`}>
                  Continue chat
                </Link>
              ) : null}
            </div>
          ) : null}
          <p>{program.description}</p>
        </div>
        <div className="chip-row">
          {program.opportunityTypes.slice(0, 3).map((type) => (
            <span className="chip" key={type}>
              {type}
            </span>
          ))}
        </div>
        <ProgramActions
          applicationUrl={program.applicationUrl}
          initialSaved={initialSaved}
          programName={program.title}
          programSlug={program.slug}
          sourceUrl={program.sourceUrl}
        />
      </div>
    </article>
  );
}
