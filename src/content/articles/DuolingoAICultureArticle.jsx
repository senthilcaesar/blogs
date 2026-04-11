export function DuolingoAICultureArticle() {
  return (
    <>
      <p className="article-lead">
        Insights into the evolving relationship between product management, engineering, and culture at one of the world&apos;s most successful learning platforms.
      </p>

      <div className="article-content-stack">
        <section className="article-stack">
          <div className="section-header">
            <h2>Advice for the AI Era</h2>
          </div>

          <article className="insight-card-group">
            <div className="insight-entry">
              <h3>Prototypes over Documents</h3>
              <p>
                Product managers are encouraged to bring working AI prototypes to meetings instead of written proposals. Seeing a prototype makes decision-making much faster and more accurate.
              </p>
            </div>

            <div className="insight-entry">
              <h3>&quot;Just Start&quot;</h3>
              <p>
                The biggest hurdle for most people is overthinking. My primary advice is to simply sit down and start building with tools like Cursor.
              </p>
            </div>

            <div className="insight-entry">
              <h3>Technical Literacy</h3>
              <p>
                While you don&apos;t need to be a software engineer, having a baseline &quot;technical knowledge&quot; helps in guiding the AI to better results.
              </p>
            </div>
          </article>
        </section>

        <section className="article-stack">
          <div className="section-header">
            <h2>Duolingo’s Internal AI Culture</h2>
          </div>

          <article className="insight-card-group">
            <div className="insight-entry">
              <h3>The Golden Rule</h3>
              <p>
                AI is only used if it directly benefits the learners.
              </p>
            </div>

            <div className="insight-entry">
              <h3>Performance Reviews</h3>
              <p>
                The company briefly experimented with making &quot;AI usage&quot; a KPI in performance reviews but backtracked. We realized it incentivized using AI for its own sake rather than focusing on quality outcomes.
              </p>
            </div>

            <div className="insight-entry">
              <h3>&quot;Vibe Coding&quot; Days</h3>
              <p>
                Every employee, including those in HR and Finance, participated in a day dedicated to building something with AI (vibe coding) to demystify the technology.
              </p>
            </div>

            <div className="insight-entry">
              <h3>Transparency and Learning</h3>
              <p>
                We maintain internal Slack channels like <code>#best-ai-practices</code> and <code>#ai-fails</code> to share successes and learn from mistakes across the organization.
              </p>
            </div>

            <div className="insight-entry">
              <h3>Self-Service Data</h3>
              <p>
                Product managers and other non-technical staff now build their own custom KPI dashboards using AI, rather than waiting for data engineering teams.
              </p>
            </div>
          </article>
        </section>

        <section className="article-stack">
          <div className="section-header">
            <h2>Key Takeaways</h2>
          </div>

          <article className="insight-card-group">
            <div className="insight-entry">
              <h3>Outcomes Over Input</h3>
              <p>
                Focus on the final product or result; use AI as the engine to get there faster, but don&apos;t force its use where it doesn&apos;t add value.
              </p>
            </div>

            <div className="insight-entry">
              <h3>The Rise of the &quot;Generalist Creator&quot;</h3>
              <p>
                AI is enabling non-technical people to build products, shifting the value from &quot;knowing how to code&quot; to &quot;knowing what to build.&quot;
              </p>
            </div>

            <div className="insight-entry">
              <h3>Low Friction Prototyping</h3>
              <p>
                The cost of testing an idea has dropped to nearly zero. If you have an idea, &quot;vibe coding&quot; a prototype is now the standard for proving its worth.
              </p>
            </div>

            <div className="insight-entry">
              <h3>Adapt or Be Left Behind</h3>
              <p>
                Proficiency with AI tools is becoming a baseline requirement for professional survival and growth.
              </p>
            </div>
          </article>
        </section>
      </div>

      <style>{`
        .article-content-stack {
          display: grid;
          gap: 32px;
        }
        .insight-card-group {
          padding: 30px;
          border-radius: var(--radius-lg);
          background: var(--surface-strong);
          border: 1px solid var(--border);
          display: grid;
          gap: 28px;
        }
        .insight-entry {
          display: grid;
          gap: 8px;
        }
        .insight-entry:not(:last-child) {
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }
        .insight-entry h3 {
          margin: 0;
          font-size: 1.35rem;
          color: var(--accent);
          line-height: 1.2;
        }
        .insight-entry p {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-soft);
        }
        code {
          font-family: 'IBM Plex Mono', monospace;
          background: var(--surface-soft);
          padding: 2px 6px;
          border-radius: 6px;
          color: var(--accent-secondary);
          border: 1px solid var(--border);
          font-size: 0.95em;
        }
      `}</style>
    </>
  );
}
