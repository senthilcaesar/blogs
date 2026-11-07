const loopImg = new URL('../../../images/skills-you-still-need.webp', import.meta.url).href;

const stepGroups = [
  {
    name: 'Human skills',
    tone: 'human',
    steps: [
      { number: 1, label: 'Understand the problem' },
      { number: 2, label: 'Write the spec' },
      { number: 3, label: 'Design the system' },
      { number: 4, label: 'Manage the agents' },
      { number: 10, label: 'User testing' },
    ],
  },
  {
    name: 'Delegate to AI',
    tone: 'ai',
    steps: [
      { number: 5, label: 'Write the code' },
      { number: 6, label: 'Write the tests' },
    ],
  },
  {
    name: 'Shared',
    tone: 'shared',
    steps: [
      { number: 7, label: 'Review the work' },
      { number: 8, label: 'Ship it' },
      { number: 9, label: 'Scale and operate' },
    ],
  },
];

const surveyColumns = ['Slide step', 'Slide says', 'Closest survey item', 'Use AI today', 'Fit with slide'];

const surveyRows = [
  {
    step: '5. Write the code',
    slide: 'Agents',
    item: 'Generating code in a familiar area',
    use: '69.3%',
    fit: 'Good',
  },
  {
    step: '6. Write the tests',
    slide: 'Agents',
    item: 'Writing or improving tests',
    use: '58.1%',
    fit: 'Good',
  },
  {
    step: '3. Design the system',
    slide: 'Human',
    item: 'Exploring architecture or technical design',
    use: '47.4%',
    fit: 'Mixed: AI is used here a lot',
  },
  {
    step: '9. Scale and operate',
    slide: 'Shared',
    item: 'Analyzing data, logs and metrics',
    use: '41.9%',
    fit: 'Good',
  },
  {
    step: '7. Review the work',
    slide: 'Shared',
    item: 'Reviewing code, pull requests or design decisions',
    use: '40.5%',
    fit: 'Good',
  },
  {
    step: '2. Write the spec',
    slide: 'Human',
    item: 'Writing tickets, requirements and plans',
    use: '27.8%',
    fit: 'Good',
  },
  {
    step: '8 and 9. Ship and operate',
    slide: 'Shared',
    item: 'Deploying, operating or troubleshooting production systems',
    use: '19.9%',
    fit: 'Weak: still mostly human',
  },
  {
    step: '1, 4 and 10',
    slide: 'Human',
    item: 'No matching item',
    use: 'n/a',
    fit: 'Not measured',
  },
];

const sources = [
  {
    label: 'Stack Overflow Developer Survey 2026, AI data',
    href: 'https://survey.stackoverflow.co/2026/ai/data',
  },
  {
    label: 'Kief Morris, Humans and Agents in Software Engineering Loops (March 2026)',
    href: 'https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html',
  },
  {
    label: 'Stack Overflow Developer Survey 2025, AI section',
    href: 'https://survey.stackoverflow.co/2025/ai',
  },
  {
    label: 'Faros AI, The AI Productivity Paradox (2025)',
    href: 'https://www.faros.ai/blog/ai-software-engineering',
  },
  {
    label: 'Google Cloud, Announcing the 2025 DORA Report (September 2025)',
    href: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report',
  },
];

export function SkillsYouStillNeedArticle() {
  return (
    <>
      <p className="article-lead">
        When an AI agent can write the code, it's fair to ask what's left for you. Quite a lot, as it turns out. One useful way to picture building software is as a loop of ten steps, and writing the code is only one of them. The map below shows who leads each step: five still need human skills, two can be delegated to agents, and three are shared.
      </p>

      <figure style={{ margin: '0 0 1.75rem' }}>
        <img
          src={loopImg}
          alt="Ten software development steps arranged in a loop. Humans lead understanding the problem, writing the spec, designing the system, managing the agents and user testing. Agents mostly write the code and the tests. Review, shipping, and scaling and operating are shared. An iterate arrow runs from review back to writing the code."
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </figure>

      <section className="article-panel">
        <h2>The ten steps at a glance</h2>
        <div className="step-map">
          {stepGroups.map((group) => (
            <div key={group.name} className={`step-map__column step-map__column--${group.tone}`}>
              <div className="step-map__header">
                <span className="step-map__name" id={`step-map-${group.tone}`}>{group.name}</span>
                <span className="step-map__count">{group.steps.length} of 10 steps</span>
              </div>
              <ul className="step-map__steps" aria-labelledby={`step-map-${group.tone}`}>
                {group.steps.map((step) => (
                  <li key={step.number} className="step-map__step">
                    <span className="step-map__number">{String(step.number).padStart(2, '0')}</span>
                    <span>{step.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1rem' }}>
          To make each step concrete, we'll follow one small feature all the way round: a search bar for a blog.
        </p>
      </section>

      <section className="article-panel">
        <h2>The steps that need human skills</h2>
        <p>
          These five steps decide what gets built and whether it was worth building. An agent can help with each one, but a person has to lead, because the answers depend on goals and on people.
        </p>

        <h3>1. Understand the problem</h3>
        <p>
          Work out who is struggling, and why. Perhaps readers can't find older posts, or perhaps they never knew those posts existed, and only the first problem calls for a search bar. An agent can summarize reader feedback, but a person has to decide which problem matters. The skill here is asking good questions and listening to the answers.
        </p>

        <h3>2. Write the spec</h3>
        <p>
          A spec, short for specification, describes what the finished feature must do. Ours might say that search covers titles and tags, and that an empty search shows every post. Anything left out, the agent will have to guess. The skill is clear, precise writing.
        </p>

        <h3>3. Design the system</h3>
        <p>
          Decide how the parts fit together. Should the search run in the reader's browser, or on a server? For a small blog the browser is simple and cheap, but a much larger site might need a server. An agent can lay out the options, while the person who has to live with the result makes the choice. The skill is weighing trade-offs.
        </p>

        <h3>4. Manage the agents</h3>
        <p>
          This is the new step on the list. It means splitting the work into clear tasks, giving the agent the right context and setting the checks it must pass. When the output is wrong, you can fix the output or improve the setup that produced it. Kief Morris, writing on Martin Fowler's site, calls that setup the harness: the specifications, quality checks and workflow guidance that steer the agent. The skill is delegation, much like briefing a capable new teammate.
        </p>

        <h3>10. User testing</h3>
        <p>
          Put the feature in front of real people and watch what happens. Maybe readers type a topic the tags don't cover, and the search comes back empty. An agent can help organize the notes, but seeing where people get confused, and judging what it means, is a person's job. The skill is observation, and what you learn feeds straight back into step 1.
        </p>
      </section>

      <section className="article-panel">
        <h2>The steps you can delegate to AI</h2>
        <p>
          These two steps turn clear decisions into working files, which is exactly what agents do well. Delegating them doesn't mean ignoring them: the slide's label is "mostly done by agents", and the results still go to review in step 7.
        </p>

        <h3>5. Write the code</h3>
        <p>
          Given our spec and design, an agent can write the search bar, connect it to the list of posts and fix its own errors as it goes. People step in when the agent gets stuck, or when a part is sensitive enough to deserve closer attention.
        </p>

        <h3>6. Write the tests</h3>
        <p>
          Tests are small programs that check the code does what it should. Agents can write them quickly and in large numbers. There's one trap to watch for. If an agent wrongly decides that an empty search returns nothing, it may also write a test that expects nothing, and the test will pass. That's why the tests need to be traced back to the spec.
        </p>
      </section>

      <section className="article-panel">
        <h2>The steps that are shared</h2>
        <p>
          In these three steps, agents can do much of the work, but a person remains answerable for the outcome. A useful rule of thumb is that the agent does the checking and the running, while the person makes the calls that carry risk.
        </p>

        <h3>7. Review the work</h3>
        <p>
          An agent can make the first pass, flagging likely bugs, style problems and failed checks. A person then asks the harder questions: does this solve the right problem, and would we be happy to maintain it? This step matters more as agents produce more code. In Stack Overflow's 2025 survey, 66% of respondents named AI answers that are "almost right, but not quite" as their top frustration. Faros AI, which sells engineering analytics, saw review time rise 91% on teams with high AI adoption.
        </p>
        <p>
          The slide's dashed "iterate" arrow starts here. If the review finds a problem, the work goes back to step 5, and the code, test and review cycle repeats until the feature is ready. Much of the day-to-day work now happens inside this small loop.
        </p>

        <h3>8. Ship it</h3>
        <p>
          Shipping means releasing the feature to real users. Agents can run the build, the final checks and the deployment, and draft the release notes. A person decides whether it's ready and what to do if it fails. Google's 2025 DORA report, a survey of nearly 5,000 technology professionals, found that AI adoption goes with faster delivery but also with less stable delivery, so that decision still counts.
        </p>

        <h3>9. Scale and operate</h3>
        <p>
          Once the search bar is live, it has to keep working as traffic grows. Agents can watch the logs, spot unusual errors and suggest fixes. People decide what to spend, what level of reliability is good enough, and how to respond when something serious breaks.
        </p>
      </section>

      <section className="article-panel">
        <h2>How does this compare with what developers do today?</h2>
        <p>
          The best match is Stack Overflow's 2026 survey (12,547 responses), which asked what people currently use AI or agents for. It doesn't use these ten steps, so each row below pairs a step with the closest survey item.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {surveyColumns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {surveyRows.map((row) => (
                <tr key={row.item}>
                  <td>
                    <strong>{row.step}</strong>
                  </td>
                  <td>{row.slide}</td>
                  <td>{row.item}</td>
                  <td>{row.use}</td>
                  <td>{row.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem' }}>
          These figures show who uses AI at each step, not who leads it, so they can only partly test the map. Still, the pattern is broadly the same: AI use is highest for code and tests and lowest for production work.
        </p>
      </section>

      <section className="article-panel">
        <h2>Closing the loop</h2>
        <p>
          Follow the search bar around the circle and the pattern is plain. People decide what's worth building and whether it worked, agents do most of the building in between, and the two meet wherever a mistake could reach users. This split is one useful map rather than a fixed rule, and the boundaries will likely keep moving. For now, the code is the easiest part to hand over, and knowing what to ask for is the hardest.
        </p>
      </section>

      <section className="article-panel">
        <h2>Sources</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          {sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
