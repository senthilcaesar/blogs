export function AiAgentsMasteryArticle() {
  return (
    <>
      <p className="article-lead">
        Based on the insights from Jack Clark&apos;s discussion, here are 10
        steps to master AI agents and Claude Code.
      </p>

      <section className="article-stack">
        <article className="insight-card">
          <span className="insight-index">01</span>
          <div>
            <h2>Master specification writing</h2>
            <blockquote>
              The mistake is thinking Claude Code is like a knowledgeable
              person versus an extremely literal person.
            </blockquote>
            <ul>
              <li>Write a detailed specification document before you begin.</li>
              <li>
                Ask Claude to interview you first, then let it draft the spec.
              </li>
              <li>
                Treat prompts like a message in a bottle: they should work
                without follow-up clarification.
              </li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">02</span>
          <div>
            <h2>Start small, then add complexity</h2>
            <blockquote>
              In about 10 minutes it wrote a basic simulation... something that
              would take a skilled programmer several hours.
            </blockquote>
            <ul>
              <li>Begin with small projects like simulations or tiny tools.</li>
              <li>Use each project to learn how the system thinks and fails.</li>
              <li>Keep notes on what worked and what broke.</li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">03</span>
          <div>
            <h2>Learn multi-agent orchestration</h2>
            <blockquote>
              I&apos;ve got my five agents being minded by another agent.
            </blockquote>
            <ul>
              <li>Practice running multiple agent sessions in parallel.</li>
              <li>Have one agent review or coordinate another&apos;s work.</li>
              <li>Build specialized swarms for repeated workflows.</li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">04</span>
          <div>
            <h2>Separate schlep work from creative work</h2>
            <blockquote>
              Most people can do about two to four hours of genuinely useful
              creative work a day.
            </blockquote>
            <ul>
              <li>
                Use AI for documentation, boilerplate, synthesis, and
                transformation.
              </li>
              <li>
                Save your best energy for strategy, creative leaps, and
                relationships.
              </li>
              <li>
                Optimize your day around your most valuable human thinking.
              </li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">05</span>
          <div>
            <h2>Develop self-knowledge outside AI</h2>
            <blockquote>
              You have to know yourself... to be able to critique how this AI
              system gives you advice.
            </blockquote>
            <ul>
              <li>Keep a daily journaling practice without AI at first.</li>
              <li>Understand your own biases before outsourcing judgment.</li>
              <li>
                Stay grounded so AI advice does not define your personality.
              </li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">06</span>
          <div>
            <h2>Use AI as a perspective-taking tool</h2>
            <blockquote>
              I&apos;m in conflict with someone... Could you ask me questions about
              how they&apos;re feeling?
            </blockquote>
            <ul>
              <li>
                Use AI to rehearse empathy before hard conversations.
              </li>
              <li>Explore how the other person may be experiencing events.</li>
              <li>Let it sharpen your questions, not replace your judgment.</li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">07</span>
          <div>
            <h2>Build technical foundations</h2>
            <ul>
              <li>Learn the basics of Python and JavaScript.</li>
              <li>
                Understand how agents interact with tools, files, and
                environments.
              </li>
              <li>
                Study the difference between chatbots that talk and agents that
                act.
              </li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">08</span>
          <div>
            <h2>Study prompt engineering patterns</h2>
            <blockquote>
              Maybe I&apos;m in the wrong place.
            </blockquote>
            <ul>
              <li>Notice how agents think out loud and self-correct.</li>
              <li>Write prompts that reward error detection and recovery.</li>
              <li>
                Structure tasks so agents can spot and fix their own mistakes.
              </li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">09</span>
          <div>
            <h2>Read the AI safety and interpretability literature</h2>
            <blockquote>
              We recently published a constitution for our AI system.
            </blockquote>
            <ul>
              <li>Follow Import AI for regular research updates.</li>
              <li>Study Anthropic&apos;s work on interpretability and behavior.</li>
              <li>
                Understand evaluation gaming, alignment risks, and emergent
                behavior.
              </li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">10</span>
          <div>
            <h2>Position yourself for the future</h2>
            <blockquote>
              There will be people who have co-created their personality
              through AI... and people who worked on understanding themselves
              outside the bubble.
            </blockquote>
            <ul>
              <li>
                Build skills AI cannot easily replicate: relationships, taste,
                synthesis, and physical-world expertise.
              </li>
              <li>
                Become great at translating human intent into agent-ready
                instructions.
              </li>
              <li>
                Keep the discipline to do hard thinking even when shortcuts are
                available.
              </li>
            </ul>
          </div>
        </article>
      </section>

      <section className="article-panel">
        <h2>Recommended books from the interview</h2>
        <ol className="resource-list">
          <li>
            <strong>A Wizard of Earthsea</strong> by Ursula Le Guin
          </li>
          <li>
            <strong>The True Believer</strong> by Eric Hoffer
          </li>
          <li>
            <strong>There Is No Antimemetics Division</strong> by qntm
          </li>
        </ol>
      </section>

      <section className="article-panel">
        <div className="panel-header">
          <h2>Watch the interview</h2>
          <a
            className="panel-link"
            href="https://www.youtube.com/watch?v=lIJelwO8yHQ"
            target="_blank"
            rel="noreferrer"
          >
            Open on YouTube
          </a>
        </div>
        <div className="video-frame">
          <iframe
            src="https://www.youtube.com/embed/lIJelwO8yHQ?rel=0"
            title="Jack Clark interview on YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
