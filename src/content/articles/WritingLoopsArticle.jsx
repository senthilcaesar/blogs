export function WritingLoopsArticle() {
  return (
    <>
      <p className="article-lead">
        Instead of prompting an agent to build a feature or fix a specific problem and then supervising each step of the work, they hand the Al an ambitious goal.
      </p>

      <section className="article-panel">
        <ol className="resource-list">
          <li>Build this</li>
          <li>Test it</li>
          <li>Fix the bugs</li>
          <li>Optimize the code</li>
          <li>Document what you built, keep testing until there are no apparent bugs - and let a team of agents work for hours without interruption.</li>
        </ol>
      </section>

      <p style={{ marginTop: '1.5rem' }}>
        In the background, Al is prompting other Al agents, over and over, to get the job done.
      </p>
    </>
  );
}

