import { useRef, useState } from 'react';

const criteria = [
  {
    id: 'volume',
    term: 'Volume',
    description:
      'Volume means the task recurs frequently enough to generate meaningful data in 30 days. A one-off project doesn\u2019t qualify regardless of complexity.',
  },
  {
    id: 'complexity',
    term: 'Complexity',
    description:
      'Complexity means Claude adds real leverage, not just speed. If a junior developer could do the task in an afternoon, Claude\u2019s contribution is marginal. If it takes a senior engineer three weeks, there\u2019s structural gain available.',
  },
  {
    id: 'measurability',
    term: 'Measurability',
    description:
      'Measurability means you can capture a baseline before Day 1. If you can\u2019t measure it before the pilot starts, you can\u2019t close the ROI loop at Day 30. This is non-negotiable.',
  },
  {
    id: 'developer-readiness',
    term: 'Developer readiness',
    description:
      'Developer readiness means the team is willing to change their workflow, not just try a tool. A pilot where developers use Claude occasionally around their existing habits produces flat metrics. Adoption has to be designed in.',
  },
];

const sections = [
  {
    id: 'use-case',
    title: 'Use Case Identification',
    content: (
      <ul className="bullet-list">
        <li>
          Name the use case in one sentence. State what Claude Code will do in the context of a specific codebase or workflow.
        </li>
        <li>
          Label it structural or marginal and explain why in two sentences. Reference the unit of work that changes (or doesn&apos;t).
        </li>
        <li>
          Score it on the four criteria:
          <ul className="dash-list">
            {criteria.map((criterion) => (
              <li key={criterion.id}>
                <span className="term-tip" tabIndex={0} aria-describedby={`tip-${criterion.id}`}>
                  {criterion.term}
                  <span className="term-tip__popup" role="tooltip" id={`tip-${criterion.id}`}>
                    {criterion.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          Flag any criterion that is weak and note whether it can be addressed before the pilot starts.
        </li>
      </ul>
    ),
  },
  {
    id: 'pilot-design',
    title: 'Pilot Design',
    content: (
      <ul className="bullet-list">
        <li>
          Name your cohort: how many developers, which team, and why they are the right owners for the use case.
        </li>
        <li>
          Write your primary success criterion in the format: &ldquo;<mark className="highlight-violet">[Metric] will [improve/decrease] by [threshold] compared to the Day 1 baseline by [date]</mark>.&rdquo;
        </li>
        <li>State how the baseline will be captured and from which system.</li>
        <li>Define scope protection: what is explicitly out of scope for this pilot period.</li>
      </ul>
    ),
  },
  {
    id: 'roi-measurement',
    title: 'ROI Measurement',
    content: (
      <ul className="bullet-list">
        <li>Name the headline metric and state the Day 1 baseline value.</li>
        <li>
          Write the business translation of your headline metric in one sentence: how does this metric map to roadmap velocity, engineering capacity or cost?
          <h3 style={{ marginTop: '1.25rem', textDecoration: 'underline', textUnderlineOffset: '0.25em', textDecorationThickness: '1px', textDecorationColor: '#d4d4d2' }}>Convert Metrics to Business Language</h3>
          <p>
            The headline is &ldquo;PR cycle time dropped 34%.&rdquo; Now translate it into business language for the CIO presentation:
          </p>
          <blockquote>
            <p>
              &ldquo;The team ships features in 5.4 days that previously took 8.2 days, equivalent to accelerating the roadmap by roughly 35% for this use case.&rdquo;
            </p>
          </blockquote>
          <p>
            This is precise, scoped to the use case, and directly translatable to roadmap velocity.
          </p>
        </li>
        <li>
          List the three supporting metrics you&apos;ll track from the four categories (Developer Productivity, Code Quality, Usage/Adoption and Sentiment).
        </li>
        <li>
          Draft the Day 30 scorecard structure: use case story, headline metric comparison, supporting metrics, one champion anecdote and the Day 60 goal.
        </li>
      </ul>
    ),
  },
];

export function DeliveryMethodologyArticle() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  // Left/Right arrow keys move between tabs, as in a standard tab list
  const handleKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + sections.length) % sections.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="article-panel">
      <div className="tab-card" data-active={active}>
        <div className="tab-card__tabs" role="tablist" aria-label="Pilot steps">
          {sections.map((section, index) => (
            <button
              key={section.id}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              role="tab"
              id={`tab-${section.id}`}
              aria-selected={active === index}
              aria-controls={`panel-${section.id}`}
              tabIndex={active === index ? 0 : -1}
              className={`tab-card__tab${active === index ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
              onKeyDown={handleKeyDown}
            >
              {section.title}
            </button>
          ))}
        </div>

        {sections.map((section, index) => (
          <div
            key={section.id}
            role="tabpanel"
            id={`panel-${section.id}`}
            aria-labelledby={`tab-${section.id}`}
            hidden={active !== index}
            className="shadow-box tab-card__panel"
          >
            {section.content}
          </div>
        ))}
      </div>
    </section>
  );
}
