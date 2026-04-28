import { AppShell } from "@/components/AppShell";
import { ProgramCard } from "@/components/ProgramCard";
import { demoProfile, rankedPrograms } from "@/lib/recommendations";

export default function ProfilePage() {
  const matches = rankedPrograms().slice(0, 2);

  return (
    <AppShell active="profile" title="Profile">
      <section className="profile-layout">
        <div className="profile-panel">
          <div className="profile-header">
            <div className="profile-avatar">MC</div>
            <div>
              <p className="eyebrow">Student profile</p>
              <h2>{demoProfile.name}</h2>
              <p>{demoProfile.email}</p>
            </div>
          </div>

          <div className="profile-fields">
            <div>
              <span>Class year</span>
              <strong>{demoProfile.classYear}</strong>
            </div>
            <div>
              <span>College</span>
              <strong>{demoProfile.college}</strong>
            </div>
            <div>
              <span>Major</span>
              <strong>{demoProfile.major}</strong>
            </div>
            <div>
              <span>Funding needed</span>
              <strong>{demoProfile.needsFunding ? "Yes" : "No"}</strong>
            </div>
          </div>

          <div className="preference-block">
            <h3>Opportunity interests</h3>
            <div className="chip-row">
              {demoProfile.interests.map((interest) => (
                <span className="chip" key={interest}>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="preference-block">
            <h3>Keywords</h3>
            <div className="chip-row">
              {demoProfile.keywords.map((keyword) => (
                <span className="chip" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="profile-side">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Saved path</p>
              <h2>Top matches</h2>
            </div>
          </div>
          {matches.map(({ program }) => (
            <ProgramCard compact program={program} key={program.id} />
          ))}
        </aside>
      </section>
    </AppShell>
  );
}

