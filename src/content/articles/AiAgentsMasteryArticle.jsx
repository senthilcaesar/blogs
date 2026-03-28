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
              <li>Before starting any project, write a detailed specification document.</li>
              <li>
                Ask Claude to interview you about what you want to build, then let it create the spec.
              </li>
              <li>
                The "message in a bottle" approach - your instructions must be detailed enough to work without clarification.
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
              <li>Practice running multiple Claude sessions in parallel.</li>
              <li>Design workflows where one agent reviews another's work.</li>
              <li>Build "swarms" - specialized agents for specialized tasks.</li>
            </ul>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">04</span>
          <div>
            <h2>Separate schlep work from creative work</h2>
            <blockquote>
              Most people can do about two to four hours of genuinely useful creative work a day. After that, you're doing turn-your-brain-off schlep work.
            </blockquote>
            <ul>
              <li>
                Use AI for: documentation, boilerplate, research synthesis, data transformation.
              </li>
              <li>
                Reserve YOUR energy for: strategic decisions, creative leaps, relationship building.
              </li>
              <li>
                The goal: spend your 2-4 creative hours on actual hard thinking.
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
              <li>Maintain a daily journaling practice (without AI initially.</li>
              <li>Understand your own biases before letting AI shape your thinking.</li>
              <li>
                If you discover yourself in partnership with AI, you're vulnerable to its failures and personality.
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
                Practice using AI to see situations from others' perspectives.
              </li>
              <li>Use it for empathy exercises before difficult conversations.</li>
              <li>Don't let it replace your judgment.</li>
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
              <li>Notice how agents "think out loud" and course-correct.</li>
              <li>Learn to write prompts that encourage self-correction.</li>
              <li>
                Structure tasks so agents can recognize and recover from mistakes.
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
              <li>Follow Jack Clark's newsletter "Import AI" for weekly updates.</li>
              <li>Study Anthropic's research on interpretability and AI personality emergence.</li>
              <li>
                Understand the risks: evaluation gaming, emergent behaviors, alignment challenges.
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
                Become a translator: someone who can specify what humans want to AI systems.
              </li>
              <li>
                Develop the discipline to do hard thinking even when AI makes shortcuts tempting.
              </li>
              <li>
                Learn to evaluate AI output critically - don't just accept B+ reports 
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
