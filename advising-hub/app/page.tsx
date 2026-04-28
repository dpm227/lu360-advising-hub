import { AppShell } from "@/components/AppShell";
import { DiscoverCarousel } from "@/components/DiscoverCarousel";
import { ProgramCard } from "@/components/ProgramCard";
import { programs } from "@/lib/program-data";
import { rankedPrograms } from "@/lib/recommendations";

export default function Home() {
  const featuredPrograms = programs.filter((program) => program.featured || program.imageUrl);
  const recommendations = rankedPrograms().slice(0, 3);

  return (
    <AppShell active="discover" title="Discover">
      <DiscoverCarousel programs={featuredPrograms} />

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recommended for Maya</p>
            <h2>Best current fits</h2>
          </div>
          <span className="score-pill">Live profile match</span>
        </div>
        <div className="recommendation-list">
          {recommendations.map(({ program, score, reasons }) => (
            <article className="recommendation-row" key={program.id}>
              <div>
                <h3>{program.title}</h3>
                <p>{reasons.slice(0, 2).join("; ")}</p>
              </div>
              <strong>{score}%</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="all-programs">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lehigh360 programs</p>
            <h2>Explore opportunities</h2>
          </div>
        </div>
        <div className="program-grid">
          {programs.map((program) => (
            <ProgramCard program={program} key={program.id} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
