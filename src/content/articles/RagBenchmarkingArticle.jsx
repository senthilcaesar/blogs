import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import {
  askPy,
  askRunSh,
  assistantPy,
  benchRunSh,
  clientsPy,
  compareRunsPy,
  configPy,
  dockerSh,
  envSh,
  explore1,
  explore2,
  explore3,
  judgePy,
  layoutTxt,
  newQuestionJson,
  questionsJson,
  requirementsTxt,
  resetCypher,
  retrieversPy,
  runBenchmarkPy,
  sampleOut,
  seedPy,
  seedRunSh,
  setupSh,
} from './ragBenchmarkCode';

const pipelineImg = new URL(
  '../../../images/rag-benchmark-pipeline.webp',
  import.meta.url,
).href;
const scoringImg = new URL(
  '../../../images/rag-benchmark-scoring.webp',
  import.meta.url,
).href;

/* ---------------------------------------------------------------------------
   A tiny syntax highlighter, so long code samples stay readable without
   hand-written <span>s. It only needs to be good enough for this page.
   ------------------------------------------------------------------------- */

const PY_KEYWORDS = new Set(
  'and as assert break class continue def del elif else except False finally for from global if import in is lambda None not or pass raise return True try while with yield'.split(
    ' ',
  ),
);

const CYPHER_KEYWORDS = new Set(
  'MATCH OPTIONAL WHERE RETURN WITH UNWIND MERGE CREATE SET ON CALL YIELD ORDER BY DESC ASC LIMIT AS AND OR NOT IN IS NULL FOREACH CASE WHEN THEN ELSE END DROP INDEX IF EXISTS DETACH DELETE SHOW VECTOR CONSTRAINT FOR REQUIRE UNIQUE OPTIONS INDEXES NONE ALL'.split(
    ' ',
  ),
);

const SHELL_COMMANDS = new Set(
  'python python3 pip docker export source cd mkdir'.split(' '),
);

const PATTERNS = {
  python:
    /([rbfRBF]?"""[\s\S]*?"""|[rbfRBF]?"(?:[^"\\\n]|\\.)*"|[rbfRBF]?'(?:[^'\\\n]|\\.)*')|(#[^\n]*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/g,
  cypher:
    /('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|(\/\/[^\n]*)|(\b\d+(?:\.\d+)?\b)|(:[A-Za-z_]\w*|\b[A-Za-z_]\w*\b)/g,
  bash: /("(?:[^"\\\n]|\\.)*"|'[^'\n]*')|((?:^|(?<=\s))#[^\n]*)|((?<=\s)--?[\w-]+)|(\b[A-Za-z_][\w.-]*\b)/gm,
  json: /("(?:[^"\\\n]|\\.)*")(?=\s*:)|("(?:[^"\\\n]|\\.)*")|(\btrue\b|\bfalse\b|\bnull\b|-?\b\d+(?:\.\d+)?\b)/g,
};

function classify(lang, match, code) {
  const [text, g1, g2, g3, g4] = match;
  const next = code[match.index + text.length];

  if (lang === 'json') {
    if (g1) return 'syn-var';
    if (g2) return 'syn-string';
    if (g3) return 'syn-val';
    return null;
  }
  if (g1) return 'syn-string';
  if (g2) return 'syn-comment';
  if (g3) return 'syn-val';
  if (!g4) return null;

  if (lang === 'python') {
    if (PY_KEYWORDS.has(g4)) return 'syn-keyword';
    if (next === '(') return 'syn-fn';
    return null;
  }
  if (lang === 'cypher') {
    if (g4.startsWith(':')) return 'syn-label';
    if (CYPHER_KEYWORDS.has(g4.toUpperCase()) && g4 === g4.toUpperCase())
      return 'syn-keyword';
    if (next === '(') return 'syn-fn';
    return null;
  }
  if (lang === 'bash') {
    return SHELL_COMMANDS.has(g4) ? 'syn-fn' : null;
  }
  return null;
}

function highlight(code, lang) {
  const pattern = PATTERNS[lang];
  if (!pattern) return code;

  const parts = [];
  let last = 0;
  pattern.lastIndex = 0;
  for (const match of code.matchAll(pattern)) {
    const cls = classify(lang, match, code);
    if (!cls) continue;
    if (match.index > last) parts.push(code.slice(last, match.index));
    parts.push(
      <span key={match.index} className={cls}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
}

function CodeCard({ code, lang = 'python', file, tall = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy snippet:', err);
    }
  };

  return (
    <div className='code-card'>
      <div className='code-card__header'>
        <div className='code-card__meta'>
          <span className='code-card__lang'>{lang}</span>
          {file && <span className='code-card__file'>{file}</span>}
        </div>
        <button
          type='button'
          className={`code-copy-btn ${copied ? 'code-copy-btn--copied' : ''}`}
          onClick={handleCopy}
          title='Copy code snippet to clipboard'
          aria-label={`Copy ${file || 'code snippet'} to clipboard`}
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className={`code-block ${tall ? 'code-block--tall' : ''}`}>
        <code>{highlight(code, lang)}</code>
      </pre>
    </div>
  );
}

function Figure({ src, alt, caption }) {
  return (
    <figure className='rb-figure'>
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Note({ title, children }) {
  return (
    <div className='rb-note'>
      {title && <p className='rb-note__title'>{title}</p>}
      {children}
    </div>
  );
}

/* The running example, drawn as the path GraphRAG walks for Q3. */
function TwoHopDiagram() {
  const nodes = [
    { x: 70, label: 'Chunk C1', sub: 'release notes' },
    { x: 250, label: 'BUG-101', sub: 'SSO timeout' },
    { x: 430, label: 'TCK-501', sub: 'support ticket' },
    { x: 610, label: 'Acme Corp', sub: 'Enterprise' },
  ];
  const edges = [
    { from: 0, to: 1, label: 'MENTIONS', dir: 'right', tag: 'entry point' },
    { from: 1, to: 2, label: 'REPORTS', dir: 'left', tag: 'hop 1' },
    { from: 2, to: 3, label: 'FILED_BY', dir: 'right', tag: 'hop 2' },
  ];

  return (
    <figure className='rb-figure'>
      <svg
        className='rb-diagram'
        viewBox='0 0 680 170'
        role='img'
        aria-label='Path from chunk C1 to bug BUG-101, then back along REPORTS to ticket TCK-501, then along FILED_BY to customer Acme Corp'
      >
        <defs>
          <marker
            id='rb-arrow'
            viewBox='0 0 10 10'
            refX='9'
            refY='5'
            markerWidth='7'
            markerHeight='7'
            orient='auto-start-reverse'
          >
            <path d='M0,0 L10,5 L0,10 z' className='rb-diagram__arrowhead' />
          </marker>
        </defs>
        {edges.map((e) => {
          const x1 = nodes[e.from].x + 58;
          const x2 = nodes[e.to].x - 58;
          return (
            <g key={e.label}>
              <line
                x1={x1}
                y1='95'
                x2={x2}
                y2='95'
                className={`rb-diagram__edge ${e.tag === 'entry point' ? 'rb-diagram__edge--muted' : ''}`}
                markerEnd={e.dir === 'right' ? 'url(#rb-arrow)' : undefined}
                markerStart={e.dir === 'left' ? 'url(#rb-arrow)' : undefined}
              />
              <text
                x={(x1 + x2) / 2}
                y='86'
                textAnchor='middle'
                className='rb-diagram__rel'
              >
                {e.label}
              </text>
              <text
                x={(x1 + x2) / 2}
                y='118'
                textAnchor='middle'
                className='rb-diagram__tag'
              >
                {e.tag}
              </text>
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <rect
              x={n.x - 58}
              y='70'
              width='116'
              height='50'
              rx='25'
              className={`rb-diagram__node ${i === 3 ? 'rb-diagram__node--answer' : ''}`}
            />
            <text
              x={n.x}
              y='92'
              textAnchor='middle'
              className='rb-diagram__label'
            >
              {n.label}
            </text>
            <text
              x={n.x}
              y='108'
              textAnchor='middle'
              className='rb-diagram__sub'
            >
              {n.sub}
            </text>
          </g>
        ))}
        <text x='70' y='40' textAnchor='middle' className='rb-diagram__tag'>
          found by vector search
        </text>
        <text x='610' y='40' textAnchor='middle' className='rb-diagram__tag'>
          the answer to Q3
        </text>
        <line
          x1='70'
          y1='48'
          x2='70'
          y2='64'
          className='rb-diagram__edge rb-diagram__edge--muted'
        />
        <line
          x1='610'
          y1='48'
          x2='610'
          y2='64'
          className='rb-diagram__edge rb-diagram__edge--muted'
        />
      </svg>
      <figcaption>
        Q3 needs two hops past the chunk. Vector search finds the release
        notes; only the graph walk reaches the customer. (Globex is reached the
        same way, through ticket TCK-502.)
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   Data for the tables
   ------------------------------------------------------------------------- */

const questionTypes = [
  {
    type: 'Simple factual',
    tests: 'A single lookup: one fact in one place',
    example: 'Which release fixed the SAML SSO login timeout bug?',
  },
  {
    type: 'Multi-hop',
    tests: 'Reasoning across 2–3 connected facts',
    example: 'Which customers were affected by the SSO login timeout bug?',
  },
  {
    type: 'Comparison / aggregation',
    tests: 'Counting or comparing across several entities',
    example: 'Compare the SLA response time for Enterprise vs Starter tier.',
  },
  {
    type: 'Temporal',
    tests: 'Ordering, and what changed between versions',
    example: 'What changed between Aurora 3.1 and 3.2?',
  },
  {
    type: 'Unanswerable',
    tests: 'Correct refusal: catches hallucination directly',
    example: "What's the refund policy on hardware purchases?",
  },
];

const diagnosis = [
  {
    pattern: 'High faithfulness + low recall',
    meaning: 'Retrieval problem',
    why: "The model stayed true to what it was given, but it wasn't given enough.",
  },
  {
    pattern: 'Low faithfulness + high recall',
    meaning: 'Prompting or generation problem',
    why: 'Good context was retrieved, but the model ignored it or embellished it.',
  },
  {
    pattern: 'Low faithfulness + answer looks correct',
    meaning: 'Caution',
    why: 'The model skipped retrieval and answered from its training data. It looks fine until the facts drift.',
  },
  {
    pattern: 'Unanswerable question, no refusal',
    meaning: 'Hallucination',
    why: 'The model invented an answer. The appropriate-refusal check catches this.',
  },
];

// Scores from the original talk's runs: [correctness, faithfulness]
const results = [
  { id: 'Q1', cat: 'simple', v: [2, 2], g: [2, 1], j: [1.98, 0.72] },
  { id: 'Q2', cat: 'simple', v: [2, 2], g: [2, 2], j: [1.99, 1.12] },
  { id: 'Q3', cat: 'multi-hop', v: [0, 0], g: [2, 2], j: [1.26, 1.01] },
  { id: 'Q4', cat: 'multi-hop', v: [0, 0], g: [2, 2], j: [1.99, 0.91] },
  { id: 'Q5', cat: 'multi-hop', v: [0, 0], g: [0, 0], j: [0.01, 0.04] },
  { id: 'Q6', cat: 'aggregation', v: [2, 2], g: [2, 2], j: [1.99, 0.84] },
  { id: 'Q7', cat: 'aggregation', v: [0, 0], g: [2, 2], j: [1.97, 1.03] },
  { id: 'Q8', cat: 'temporal', v: [2, 2], g: [2, 2], j: [1.95, 0.6] },
  { id: 'Q9', cat: 'temporal', v: [2, 2], g: [2, 2], j: [1.94, 0.74] },
  { id: 'Q10', cat: 'unanswerable', v: [0, 0], g: [0, 0], j: [1.08, 1.97] },
  { id: 'Q11', cat: 'unanswerable', v: [2, 2], g: [2, 2], j: [1.86, 1.99] },
  { id: 'Q12', cat: 'multi-hop', v: [1, 1], g: [2, 2], j: [1.99, 0.68] },
];

const sum = (key, i) =>
  results.reduce((total, r) => total + r[key][i], 0).toFixed(key === 'j' ? 2 : 0);

const timings = [
  { label: 'Vector RAG + LLM judge', seconds: 73, shown: '1:13' },
  { label: 'GraphRAG + LLM judge', seconds: 90, shown: '1:30' },
  { label: 'GraphRAG + Jev judge', seconds: 37, shown: '0:37' },
];

/* ---------------------------------------------------------------------------
   Table of contents (same pattern as the Neo4j workshop article)
   ------------------------------------------------------------------------- */

const tocGroups = [
  {
    id: 'part-1',
    label: 'Part 1: Concepts',
    items: [
      { id: 'why-benchmark', label: 'Why benchmark RAG?' },
      { id: 'rag-basics', label: 'RAG in one picture' },
      { id: 'graphrag', label: 'What GraphRAG adds' },
      { id: 'question-types', label: 'Five kinds of question' },
      { id: 'scoring', label: 'Three scores per answer' },
      { id: 'llm-judge', label: 'An LLM as the judge' },
      { id: 'reading-scores', label: 'Reading scores together' },
    ],
  },
  {
    id: 'part-2',
    label: 'Part 2: Workshop',
    items: [
      { id: 'prerequisites', label: 'What you need' },
      { id: 'step-1', label: 'Step 1: Start Neo4j' },
      { id: 'step-2', label: 'Step 2: Project setup' },
      { id: 'step-3', label: 'Step 3: Seed the graph' },
      { id: 'step-4', label: 'Step 4: Look at the graph' },
      { id: 'step-5', label: 'Step 5: Two retrievers' },
      { id: 'step-6', label: 'Step 6: The assistant' },
      { id: 'step-7', label: 'Step 7: The questions' },
      { id: 'step-8', label: 'Step 8: The judge' },
      { id: 'step-9', label: 'Step 9: The runner' },
      { id: 'step-10', label: 'Step 10: Run it' },
      { id: 'step-11', label: 'Step 11: Read the results' },
      { id: 'step-12', label: 'Step 12: Grow the benchmark' },
    ],
  },
  {
    id: 'part-3',
    label: 'Part 3: Going further',
    items: [
      { id: 'other-approaches', label: 'Other approaches' },
      { id: 'troubleshooting', label: 'Troubleshooting' },
      { id: 'resources', label: 'Resources' },
    ],
  },
];

const tocIds = tocGroups.flatMap((group) => [
  group.id,
  ...group.items.map((item) => item.id),
]);

const spyOffset = 120;

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= spyOffset) current = id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids]);

  return activeId;
}

// HashRouter owns the URL hash, so jump with scrollIntoView instead of #anchors
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}

function TocLink({ id, label, activeId, onNavigate, className = '' }) {
  const active = id === activeId;
  return (
    <button
      type='button'
      className={`toc__link ${className} ${active ? 'toc__link--active' : ''}`}
      aria-current={active ? 'location' : undefined}
      onClick={() => onNavigate(id)}
    >
      {label}
    </button>
  );
}

function TocList({ activeId, onNavigate }) {
  return (
    <ul className='toc__groups'>
      {tocGroups.map((group) => (
        <li key={group.id}>
          <TocLink
            id={group.id}
            label={group.label}
            activeId={activeId}
            onNavigate={onNavigate}
            className='toc__group'
          />
          <ul className='toc__items'>
            {group.items.map((item) => (
              <li key={item.id}>
                <TocLink
                  id={item.id}
                  label={item.label}
                  activeId={activeId}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function ArticleToc() {
  const activeId = useActiveSection(tocIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className='toc-rail' aria-label='On this page'>
        <nav className='toc'>
          <p className='toc__title'>On this page</p>
          <TocList activeId={activeId} onNavigate={scrollToSection} />
        </nav>
      </aside>

      <details
        className='toc-mobile'
        open={mobileOpen}
        onToggle={(e) => setMobileOpen(e.currentTarget.open)}
      >
        <summary className='toc__title'>On this page</summary>
        <nav className='toc' aria-label='On this page'>
          <TocList
            activeId={activeId}
            onNavigate={(id) => {
              setMobileOpen(false);
              scrollToSection(id);
            }}
          />
        </nav>
      </details>
    </>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} target='_blank' rel='noreferrer'>
      {children || href}
    </a>
  );
}

/* ---------------------------------------------------------------------------
   The article
   ------------------------------------------------------------------------- */

export function RagBenchmarkingArticle() {
  return (
    <>
      <ArticleToc />

      <div className='article-panel rb-banner'>
        <p className='article-lead' style={{ margin: 0, fontWeight: 500 }}>
          This guide is for anyone who has built a RAG system, or is about to,
          and wants to know whether it actually works. No background in
          evaluation is assumed. It comes in three parts:
        </p>
        <ul className='bullet-list' style={{ marginTop: '1rem' }}>
          <li>
            <strong>Part 1: Concepts</strong>: what RAG and GraphRAG are, the
            kinds of question a benchmark should ask, and how answers get
            scored.
          </li>
          <li>
            <strong>Part 2: Hands-on workshop</strong>: build a small support
            assistant on Neo4j in Python, then benchmark vector RAG against
            GraphRAG on the same 12 questions.
          </li>
          <li>
            <strong>Part 3: Going further</strong>: other ways to evaluate,
            fixes for common errors, and further reading.
          </li>
        </ul>
        <p className='rb-credit'>
          Based on Jennifer Reif's talk <em>Benchmarking RAG for Accuracy</em>{' '}
          (NODES 26) and her{' '}
          <ExternalLink href='https://github.com/JMHReif/graphrag-benchmark-demo'>
            graphrag-benchmark-demo
          </ExternalLink>{' '}
          repository, which is written in Java. The code here is a Python port,
          with two small changes to the judge that are flagged where they
          appear. The two slide images are from the talk.
        </p>
      </div>

      {/* =====================================================================
          PART 1: CONCEPTS
         ===================================================================== */}
      <section className='article-panel'>
        <h2 id='part-1' className='main-heading'>
          Part 1: Concepts
        </h2>

        <h3 id='why-benchmark' className='sub-heading'>
          Why benchmark a RAG system?
        </h3>
        <p>
          Ask a support chatbot which release fixed a login bug, and it will
          tell you in a fluent, confident sentence. Ask it which customers were
          hit by that same bug, and it will answer just as fluently. This time
          it may well be wrong, and nothing in its tone will tell you so. A
          wrong answer and a right one sound exactly alike.
        </p>
        <p>
          That's the whole reason benchmarking exists. Simply put,{' '}
          <strong>benchmarking a RAG system</strong> means asking it a fixed
          set of questions whose right answers you already know, scoring every
          reply the same way, and keeping the scores. Then, when you change
          something (the retriever, the prompt, the model), you run the same
          questions again and see what moved.
        </p>
        <p>
          The obvious alternative is to try a few questions by hand after each
          change. The catch is that the questions people try are the ones they
          already know work, so the demo always looks fine. Checking by hand is
          also slow, and nobody checks the same way twice. Automating it with a
          plain text match swings too far the other way: it's fast and
          repeatable, but it marks "Aurora 3.2 fixed it" wrong because the
          expected answer said "the fix shipped in release 3.2 of Aurora". You
          either get judgement without repeatability, or repeatability without
          judgement. The method in this guide uses a second language model as
          the marker to get both, and we'll see later what that costs.
        </p>
        <p>
          Throughout this guide we'll follow two questions about one fictional
          bug, a login timeout in a product called Aurora:
        </p>
        <ul className='bullet-list'>
          <li>
            <strong>Q1:</strong> <em>Which release fixed the SAML SSO login
            timeout bug?</em>
          </li>
          <li>
            <strong>Q3:</strong> <em>Which customers were affected by the SSO
            login timeout bug?</em>
          </li>
        </ul>
        <p>
          (SAML SSO is single sign-on: logging in once with your company
          account instead of a separate password. The details don't matter
          here; it's just the feature that broke.) The two questions are about
          the same bug and differ in one detail: where the answer lives. The
          answer to Q1 is written in a release note. The answer to Q3 isn't
          written down in any one place. So how does a system get one right and
          the other wrong, and how would you ever notice?
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='rag-basics' className='sub-heading'>
          RAG, in one picture
        </h3>
        <p>
          A language model knows a great deal about the world and nothing at
          all about your bug tracker. <strong>Retrieval-augmented
          generation</strong> (RAG) gets around this in the plainest way
          possible: before the model answers, you look up the passages of your
          own documents that seem relevant, paste them into the prompt, and
          tell the model to answer from them. The lookup is the "retrieval";
          the answer is the "generation".
        </p>
        <p>
          The lookup works on meaning rather than keywords. Each passage of
          text, called a <strong>chunk</strong>, is turned into a long list of
          numbers called an <strong>embedding</strong>. We can imagine an
          embedding as coordinates on a map of meaning: passages about similar
          things land near each other, even when they share no words. To answer
          a question, you embed the question too and fetch the few chunks that
          sit closest to it on the map. That step is called{' '}
          <strong>vector search</strong>, and the number of chunks it returns
          is usually written as <em>k</em> (we'll use k = 4).
        </p>
        <p>
          Follow our two questions through it. Q1 lands right next to a release
          note that says, in so many words, "Aurora 3.2 fixes BUG-101, a
          critical issue where SAML-based SSO logins would time out." The answer
          is in the chunk, and the model just has to read it out. Q3 lands next
          to the very same release note, which says only that "affected
          customers should no longer see login failures". It mentions customers
          without naming a single one. The names sit in support tickets, which
          are records in a database rather than paragraphs of prose. Plain
          vector RAG stops here, with the right chunk and the wrong
          information.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='graphrag' className='sub-heading'>
          What GraphRAG adds
        </h3>
        <p>
          A <strong>knowledge graph</strong> stores facts as things and the
          connections between them: a bug, a ticket, a customer, and arrows
          saying the ticket <code>REPORTS</code> the bug and was{' '}
          <code>FILED_BY</code> the customer. The things are called{' '}
          <strong>nodes</strong> and the arrows <strong>relationships</strong>.
          (If these are new, the{' '}
          <Link to='/posts/neo4j-intro-workshop'>Neo4j Intro Workshop</Link>{' '}
          covers them from scratch.)
        </p>
        <p>
          <strong>GraphRAG</strong> keeps the first two steps of vector RAG
          and adds a third. Vector search still finds the closest chunks. But
          each chunk is also linked to the nodes it talks about, so the
          retriever can then walk outward along the graph's relationships and
          collect the connected facts. Each relationship crossed is called a{' '}
          <strong>hop</strong>. In the pipeline below, the vector search and a
          2-hop walk happen in a single database call, and the chunk text and
          the graph facts are merged before the model sees them.
        </p>
        <Figure
          src={pipelineImg}
          alt='Pipeline diagram: question, embed, vector search for a seed chunk, answer. GraphRAG branches after embedding into vector search plus 2-hop graph traversal in one database call, merges chunk text and graph facts, then answers.'
          caption='Both pipelines embed the question and run a vector search. Vector-only RAG stops there; GraphRAG also walks two hops through the graph. (Slide from the talk.)'
        />
        <p>
          For Q3, the walk goes like this. The release note mentions the bug
          BUG-101. One hop back from the bug reaches the tickets that reported
          it; one more hop reaches the customers who filed those tickets.
        </p>
        <TwoHopDiagram />
        <p>
          In practice, the model now receives the release note plus a few
          lines of plain facts, including "Ticket TCK-501, filed by Customer
          Acme Corp (tier: Enterprise)". The answer to Q3 is now sitting in the
          prompt. Why two hops and not one? Because one hop from the bug
          reaches only the ticket, and a ticket number is not a customer's
          name.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='question-types' className='sub-heading'>
          Five kinds of question
        </h3>
        <p>
          A benchmark is only as good as its questions. If all twelve
          questions are like Q1, vector RAG and GraphRAG will score the same,
          and you'll conclude, wrongly, that the graph adds nothing. So the
          question set deliberately mixes five types, each probing a different
          way to fail:
        </p>
        <div className='table-wrap'>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>What it tests</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              {questionTypes.map((q) => (
                <tr key={q.type}>
                  <td>
                    <strong>{q.type}</strong>
                  </td>
                  <td>{q.tests}</td>
                  <td>{q.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The last row deserves a second look. An{' '}
          <strong>unanswerable</strong> question is one whose answer is
          genuinely not in the data: our knowledge base has a refund policy for
          software subscriptions, but nothing at all about hardware. The right
          response is "I don't know". A system that invents a hardware refund
          policy instead is <strong>hallucinating</strong>, which means stating
          things with confidence that nothing in its sources supports. These
          questions catch it in the act.
        </p>
        <p>
          Every question also comes with a <strong>gold answer</strong>: a
          reference answer written by someone who knows the data. Gold answers
          are what the scoring compares against. The workshop set has 12
          questions: two simple factual, four multi-hop, two comparison, two
          temporal and two unanswerable.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='scoring' className='sub-heading'>
          Three scores for every answer
        </h3>
        <p>
          Each answer gets three marks, and they're kept separate on purpose,
          because each catches a different failure:
        </p>
        <ul className='bullet-list'>
          <li>
            <strong>Correctness</strong> (0, 1 or 2): does the answer contain
            the key facts from the gold answer? 0 means wrong or missing them,
            1 partly right, 2 fully right.
          </li>
          <li>
            <strong>Faithfulness</strong> (0, 1 or 2): is every claim in the
            answer backed by the context the retriever handed over? 0 means it
            states things that weren't there, 1 means minor unsupported
            additions, 2 means fully grounded.
          </li>
          <li>
            <strong>Appropriate refusal</strong> (pass or fail): on an
            unanswerable question, did the system decline instead of guessing?
            On answerable questions this is simply marked as a pass.
          </li>
        </ul>
        <Figure
          src={scoringImg}
          alt='Scoring rubric. Correctness: 0 wrong or missing key facts, 1 partially correct, 2 fully correct. Faithfulness: 0 facts not in context, 1 minor unsupported context, 2 fully grounded. Appropriate refusal: fail if it guesses instead of declining, pass if it declines to answer.'
          caption='The rubric: correctness and faithfulness score 0–2, appropriate refusal is pass/fail. (Slide from the talk.)'
        />
        <p>
          Why not just score correctness? Because an answer can be right for
          the wrong reason. If the model ignores the retrieved context and
          answers from what it absorbed during training, it might happen to be
          correct today. Next quarter the facts change, the documents get
          updated, and the model keeps confidently repeating the old answer.
          Faithfulness is the score that spots this while it's still harmless.
        </p>
        <p>
          One more term falls out of the third score. A{' '}
          <strong>hallucination risk</strong> is any unanswerable question
          where the system failed to refuse. It's the single number most worth
          driving to zero.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='llm-judge' className='sub-heading'>
          An LLM as the judge
        </h3>
        <p>
          Who does the marking? A person would be ideal and very slow. A text
          match is quick and very brittle. The middle path is called{' '}
          <strong>LLM-as-judge</strong>: a second, separate call to a language
          model that receives the question, the gold answer, what the system
          retrieved, and what the system said, along with a strict rubric. It
          replies with the three scores and a one-sentence reason.
        </p>
        <p>
          Picture an exam marker holding a marking scheme. The scheme is fixed
          and strict ("only award full credit when the answer actually contains
          the key facts, not just plausible-sounding text"), so when a score
          moves between two runs, it should be because the system changed, not
          the marking.
        </p>
        <Note title='The catch: judges are not deterministic'>
          <p>
            A language model can mark the same answer differently on two runs.
            Setting its temperature (its randomness dial) to 0 narrows the
            spread but doesn't remove it. Treat a one-point change on one
            question as noise, look for patterns across a category, and when a
            decision matters, run the benchmark a few times and average.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='reading-scores' className='sub-heading'>
          Reading the scores together
        </h3>
        <p>
          The scores are most useful in combination, because together they
          point to <em>which part</em> of the pipeline broke. Two more terms
          help here. <strong>Recall</strong> is the share of the facts the
          question needed that the retriever actually fetched.{' '}
          <strong>Precision</strong> is the share of what it fetched that was
          actually relevant. A retriever that returns everything has perfect
          recall and terrible precision.
        </p>
        <div className='table-wrap'>
          <table>
            <thead>
              <tr>
                <th>Pattern</th>
                <th>What it means</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              {diagnosis.map((d) => (
                <tr key={d.pattern}>
                  <td>
                    <strong>{d.pattern}</strong>
                  </td>
                  <td>{d.meaning}</td>
                  <td>{d.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Our running example fits the first row. Vector RAG answering Q3 can
          be perfectly faithful (it only repeats what the release note says)
          and still be useless, because the customer names were never
          retrieved. That's a retrieval problem, and no amount of prompt
          tweaking will fix it. The workshop's harness adds a rough recall
          measure so you can see this directly.
        </p>
      </section>

      {/* =====================================================================
          PART 2: WORKSHOP
         ===================================================================== */}
      <div className='article-panel rb-part'>
        <h2 id='part-2' className='rb-part__title'>
          Part 2: Hands-On Workshop
        </h2>
        <p className='rb-part__lead'>
          Now we build it. You'll load a small fictional support knowledge base
          into Neo4j, build a support assistant with two swappable retrievers,
          write a judge, and run the same 12 questions through vector RAG and
          GraphRAG. Every file is shown in full, so you can copy them as you
          go.
        </p>
      </div>

      <section className='article-panel'>
        <h3 id='prerequisites' className='sub-heading'>
          What you need
        </h3>
        <ul className='bullet-list'>
          <li>
            <strong>Python 3.10 or newer.</strong> Check with{' '}
            <code>python3 --version</code>.
          </li>
          <li>
            <strong>A Neo4j database</strong>, version 5.11 or newer (that's
            when vector indexes arrived). Either Docker on your machine, or a
            free cloud instance on Neo4j AuraDB. Step 1 covers both.
          </li>
          <li>
            <strong>An OpenAI API key</strong> from{' '}
            <ExternalLink href='https://platform.openai.com/api-keys'>
              platform.openai.com
            </ExternalLink>
            . We use it for embeddings, for the assistant, and for the judge.
          </li>
          <li>About 30 minutes.</li>
        </ul>
        <p>
          What will it cost? One benchmark run makes 36 API calls: 12
          questions, each needing an embedding, an answer and a judgement. With
          the default small models, the bulk of it is the judge prompts, which
          carry the retrieved context: call it 12 × 3,000 tokens, or roughly
          40,000 tokens a run. At small-model prices that comes to a fraction
          of a US cent per run. (Check current pricing; it changes.)
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='step-1' className='sub-heading'>
          Step 1: Start Neo4j
        </h3>
        <p>
          <strong>Option A: Docker (recommended for local work).</strong> One
          command downloads and starts Neo4j 5.26, the version the original
          demo used:
        </p>
        <CodeCard code={dockerSh} lang='bash' />
        <p>
          It opens two ports. Port <code>7474</code> is Neo4j Browser, a web
          page where you can type queries and see the graph; open{' '}
          <code>http://localhost:7474</code> and log in as{' '}
          <code>neo4j</code> / <code>letmein123</code>. Port{' '}
          <code>7687</code> speaks the Bolt protocol, which is what the Python
          driver uses. The password is only set the first time the container
          starts, so if you change it later, remove the container (
          <code>docker rm -f neo4j-rag-bench</code>) and start again.
        </p>
        <p>
          <strong>Option B: AuraDB Free (no install).</strong> Create a free
          instance at{' '}
          <ExternalLink href='https://console.neo4j.io/'>
            console.neo4j.io
          </ExternalLink>
          . The{' '}
          <Link to='/posts/neo4j-intro-workshop'>Neo4j Intro Workshop</Link>{' '}
          walks through it with screenshots. Download the credentials file when
          it's offered, because the password is shown only once. Your
          connection address will look like{' '}
          <code>neo4j+s://xxxxxxxx.databases.neo4j.io</code>; the{' '}
          <code>+s</code> means the connection is encrypted.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='step-2' className='sub-heading'>
          Step 2: Set up the project
        </h3>
        <p>Here's where we're heading. Eleven small files, no framework:</p>
        <CodeCard code={layoutTxt} lang='text' />
        <p>
          Create the folder and a virtual environment, which is a private copy
          of Python for this project so its packages don't collide with
          anything else on your machine. Then save the requirements file and
          install:
        </p>
        <CodeCard code={requirementsTxt} lang='text' file='requirements.txt' />
        <CodeCard code={setupSh} lang='bash' />
        <p>
          Next, tell the code where everything is. We use{' '}
          <strong>environment variables</strong>, settings that live in your
          terminal session rather than in the code, so the API key never ends
          up in a file you might commit:
        </p>
        <CodeCard code={envSh} lang='bash' />
        <p>
          The two files below read those settings and create the two
          connections every other file shares: one to Neo4j, one to OpenAI.
          Note that <code>JUDGE_MODEL</code> defaults to the same model as the
          assistant. That keeps the setup simple, but a stronger or different
          judge model is a good idea once things work, since a model marking
          its own homework is not the most impartial examiner.
        </p>
        <CodeCard code={configPy} file='config.py' />
        <CodeCard code={clientsPy} file='clients.py' />
      </section>

      <section className='article-panel'>
        <h3 id='step-3' className='sub-heading'>
          Step 3: Seed the knowledge graph
        </h3>
        <p>
          The data is a made-up software company with two products, Aurora and
          Beacon, plus their features, releases, bugs, customers and support
          tickets, and two policy documents. It's small enough to hold in your
          head and connected enough to need graph traversal. Written as
          patterns, the model is:
        </p>
        <CodeCard
          code={`(:Feature)-[:PART_OF]->(:Product)
(:Release)-[:OF_PRODUCT]->(:Product)
(:Release)-[:FIXES]->(:Bug)-[:AFFECTS]->(:Feature)
(:Customer)-[:SUBSCRIBES_TO]->(:Product)
(:Ticket)-[:FILED_BY]->(:Customer)
(:Ticket)-[:REPORTS]->(:Bug)
(:Chunk)-[:MENTIONS]->(:Bug | :Release | :Feature | :Policy)`}
          lang='cypher'
        />
        <p>
          There are two kinds of node here. The <code>Chunk</code> nodes hold
          free text (release notes and policy summaries) and carry embeddings,
          so they're what vector search finds. Everything else is structured
          fact: which release fixed which bug, who filed which ticket, what
          tier each customer is on. The <code>MENTIONS</code> relationships are
          the bridge between the two, and they're what lets GraphRAG step from
          a passage of text into the graph.
        </p>
        <p>
          A few things in the seed script are worth knowing before you read it:
        </p>
        <ul className='bullet-list'>
          <li>
            <code>MERGE</code> means "find this, or create it if it isn't
            there". Every write uses it, so running the script twice won't
            create duplicates.
          </li>
          <li>
            The <strong>constraints</strong> tell Neo4j that, say, each bug ID
            is unique. They also make lookups by that ID fast.
          </li>
          <li>
            The <strong>vector index</strong> named{' '}
            <code>chunkEmbeddings</code> is what makes vector search fast. Its
            size, 1,536, has to match the embedding model's output, and{' '}
            <code>cosine</code> is how closeness on the map is measured.
          </li>
          <li>
            <code>db.create.setNodeVectorProperty</code> stores an embedding on
            a node in the format the index expects.
          </li>
        </ul>
        <CodeCard code={seedPy} file='seed.py' tall />
        <p>Run it once. It calls the embedding API six times, once per chunk:</p>
        <CodeCard code={seedRunSh} lang='bash' />
      </section>

      <section className='article-panel'>
        <h3 id='step-4' className='sub-heading'>
          Step 4: Look at the graph
        </h3>
        <p>
          Before benchmarking anything, it's worth a minute to check the data
          looks the way you think it does. Open Neo4j Browser (or the Query
          tab in the Aura console) and run these one at a time:
        </p>
        <CodeCard code={explore1} lang='cypher' />
        <CodeCard code={explore2} lang='cypher' />
        <CodeCard code={explore3} lang='cypher' />
        <p>
          The second query draws exactly the path from the running-example
          diagram, ending at Acme Corp. If it comes back empty, the seed step
          didn't finish. The third should show <code>chunkEmbeddings</code> as{' '}
          <code>ONLINE</code> at 100%. The seed script waits for this, but it's
          a useful check if a benchmark later complains it can't find the
          index.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='step-5' className='sub-heading'>
          Step 5: Build the two retrievers
        </h3>
        <p>
          A <strong>retriever</strong> is the function that takes a question
          and returns the context the model will see. Both of ours take a
          question and return a list of strings, so the rest of the code
          doesn't care which one it's using. That's the point: to compare two
          pipelines fairly, change one thing and hold everything else still.
        </p>
        <p>
          <code>vector_only</code> is a single query. It embeds the question,
          asks the vector index for the four nearest chunks, and returns their
          text.
        </p>
        <p>
          <code>graph_rag</code> runs the same vector search and keeps going,
          in the same query:
        </p>
        <ul className='bullet-list'>
          <li>
            <code>OPTIONAL MATCH (chunk)-[:MENTIONS]-&gt;(entity)</code> finds
            the nodes each chunk talks about. In this example, for chunk C1 that's
            BUG-101, Aurora 3.2 and the SSO Login feature.
          </li>
          <li>
            <code>path = (entity)-[*1..2]-(other)</code> walks one or two hops
            from each of those nodes, in either direction.
          </li>
          <li>
            The <code>WHERE none(...)</code> line refuses to walk back along{' '}
            <code>MENTIONS</code>. Without it, the walk would bounce from a bug
            into every other chunk that mentions the bug and flood the
            context with repeats.
          </li>
          <li>
            <code>collect(path)[..30]</code> caps the facts per entity, so a
            busy node can't swamp the prompt.
          </li>
        </ul>
        <p>
          The Python after the query turns each path into a readable line, so
          the model sees "<code>&lt;-[REPORTS]- Ticket TCK-501 ... -[FILED_BY]-&gt;
          Customer Acme Corp (tier: Enterprise)</code>" rather than raw
          database objects.
        </p>
        <CodeCard code={retrieversPy} file='retrievers.py' tall />
      </section>

      <section className='article-panel'>
        <h3 id='step-6' className='sub-heading'>
          Step 6: The assistant
        </h3>
        <p>
          The assistant is one chat call. The system prompt does two jobs: it
          tells the model to answer only from the retrieved context, and it
          gives the model explicit permission to say "I don't have that
          information". That second line is what the unanswerable questions
          are testing. Temperature is 0 so the assistant answers as
          consistently as it can.
        </p>
        <CodeCard code={assistantPy} file='assistant.py' />
        <p>
          Add a small script to ask one question and print both the context
          and the answer. It's the quickest way to see what a retriever is
          actually handing the model:
        </p>
        <CodeCard code={askPy} file='ask.py' />
        <p>Now try the running example, both ways:</p>
        <CodeCard code={askRunSh} lang='bash' />
        <p>
          Read the "Retrieved context" sections. For Q1, both retrievers
          return the Aurora 3.2 release note and the answers match. For Q3,
          the vector-only context contains the same release note and nothing
          naming a customer, so the best the model can honestly do is say it
          doesn't know. The GraphRAG context contains the same note followed
          by graph facts naming Acme Corp and Globex. You've just seen the
          difference with your own eyes. The benchmark's job is to measure it
          across every type of question at once.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='step-7' className='sub-heading'>
          Step 7: Write the benchmark questions
        </h3>
        <p>
          The questions live in a plain JSON file, separate from the code, so
          anyone can add one without touching Python. Each entry has five
          fields:
        </p>
        <ul className='bullet-list'>
          <li>
            <code>id</code>: a stable label like <code>Q3</code>. Never reuse
            or renumber one, or comparisons with old runs stop meaning
            anything.
          </li>
          <li>
            <code>category</code>: one of the five question types, so results
            can be averaged per type.
          </li>
          <li>
            <code>question</code>: what gets sent to the assistant.
          </li>
          <li>
            <code>goldAnswer</code>: the reference answer the judge compares
            against.
          </li>
          <li>
            <code>unanswerable</code>: <code>true</code> if the right response
            is to decline.
          </li>
        </ul>
        <CodeCard
          code={questionsJson}
          lang='json'
          file='benchmark_questions.json'
          tall
        />
        <p>
          Notice Q5, whose correct answer is "None". Questions whose right
          answer is a negative are some of the most revealing, because a model
          eager to help will often find <em>something</em> to say.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='step-8' className='sub-heading'>
          Step 8: The judge
        </h3>
        <p>
          The judge builds one prompt per answer, asks for JSON back, and
          turns the reply into a <code>ScoredAnswer</code>. Passing{' '}
          <code>response_format=&#123;"type": "json_object"&#125;</code> asks
          the OpenAI API to guarantee the reply is valid JSON, which saves
          parsing headaches.
        </p>
        <Note title='Two changes from the original Java demo'>
          <p>
            <strong>1. The judge sees the retrieved context.</strong> In the
            original, the judge got the question, gold answer and system answer
            but not the context, so it had to guess at faithfulness. You can
            see the effect in the talk's results: GraphRAG lost a faithfulness
            point on Q1 because the judge called the release date "unsupported",
            even though the date was right there in the release note.
          </p>
          <p>
            <strong>2. A plain refusal counts as correct.</strong> In the
            original, the answer "I don't have that information in the
            knowledge base" to the hardware-refund question scored 0 for
            correctness. The judge wanted it to explain that the refund policy
            covers only software. The system did exactly the right thing, so
            the rubric now says so.
          </p>
        </Note>
        <p>
          There's also a third, non-AI score: <code>context_recall</code>. It
          pulls the bug IDs, ticket IDs and release names out of the gold
          answer with a regular expression (a text pattern) and checks how
          many of them appear anywhere in the retrieved context. It's crude (it
          can't see customer names, for instance), but it's deterministic, free,
          and it separates "retrieval missed it" from "the model fumbled it",
          the first row of the diagnosis table. For Q3 the IDs it looks for are
          TCK-501 and TCK-502.
        </p>
        <CodeCard code={judgePy} file='judge.py' tall />
      </section>

      <section className='article-panel'>
        <h3 id='step-9' className='sub-heading'>
          Step 9: The runner
        </h3>
        <p>
          The runner ties it together. For each question it retrieves,
          answers and scores, printing a short progress line as it goes. Then
          it prints a full report with per-category averages and saves two
          files to a <code>results/</code> folder:
        </p>
        <ul className='bullet-list'>
          <li>
            <code>scorecard-&lt;pipeline&gt;-&lt;timestamp&gt;.csv</code>: one row per
            question with the numbers, for comparing runs.
          </li>
          <li>
            <code>report-&lt;pipeline&gt;-&lt;timestamp&gt;.txt</code>: the full
            report, including every answer and the judge's reason, for working
            out <em>why</em> a score is what it is.
          </li>
        </ul>
        <CodeCard code={runBenchmarkPy} file='run_benchmark.py' tall />
        <p>
          And a small helper that lines up two scorecards so you can see,
          question by question, what a change did:
        </p>
        <CodeCard code={compareRunsPy} file='compare_runs.py' />
      </section>

      <section className='article-panel'>
        <h3 id='step-10' className='sub-heading'>
          Step 10: Run the benchmarks
        </h3>
        <p>
          Run the baseline first, then GraphRAG, then compare. Swap{' '}
          <code>&lt;timestamp&gt;</code> for the real file names the runner
          prints at the end of each run:
        </p>
        <CodeCard code={benchRunSh} lang='bash' />
        <p>
          Each run takes about a minute to a minute and a half: in the talk,
          vector RAG took 1:13 and GraphRAG 1:30. The report looks like this
          (your answers, wording and scores will differ):
        </p>
        <CodeCard code={sampleOut} lang='text' />
        <p>
          Read the per-category lines first, then the overall line, then go
          back to any question that scored below 2 and read the judge's reason.
          The averages tell you <em>where</em> to look; the reasons tell you{' '}
          <em>what</em> happened.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='step-11' className='sub-heading'>
          Step 11: Read the results
        </h3>
        <p>
          Here are the scores from the talk's own runs: vector RAG and GraphRAG
          graded by the LLM judge, and GraphRAG graded a second time by a
          different judge called Jev (more on it below). Each cell is
          correctness / faithfulness, and our running example is highlighted.
        </p>
        <div className='table-wrap'>
          <table className='rb-results'>
            <thead>
              <tr>
                <th>Question</th>
                <th>Type</th>
                <th>Vector RAG</th>
                <th>GraphRAG</th>
                <th>GraphRAG, Jev judge</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr
                  key={r.id}
                  className={
                    r.id === 'Q1' || r.id === 'Q3' ? 'rb-results__focus' : ''
                  }
                >
                  <td>
                    <strong>{r.id}</strong>
                  </td>
                  <td>{r.cat}</td>
                  <td>
                    {r.v[0]} / {r.v[1]}
                  </td>
                  <td>
                    {r.g[0]} / {r.g[1]}
                  </td>
                  <td>
                    {r.j[0].toFixed(2)} / {r.j[1].toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className='rb-results__total'>
                <td>
                  <strong>Total</strong>
                </td>
                <td>out of 24</td>
                <td>
                  {sum('v', 0)} / {sum('v', 1)}
                </td>
                <td>
                  {sum('g', 0)} / {sum('g', 1)}
                </td>
                <td>
                  {sum('j', 0)} / {sum('j', 1)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Start with the running example.</strong> On Q1, both
          pipelines score full marks for correctness. On Q3, vector RAG scores
          0 and GraphRAG scores 2. That one pair of rows is the whole argument
          for GraphRAG in miniature, and the rest of the table shows it holds
          up across categories.
        </p>
        <p>
          <strong>The graph pays off exactly where the answer is spread
          out.</strong> Across the four multi-hop questions, vector RAG scored
          1 out of 8 for correctness and GraphRAG 6 out of 8. Q7, a comparison
          question about support response times, is a subtler case. The
          policy chunk only says that response times "vary by tier"; the actual
          numbers (4 hours for Enterprise, 2 business days for Starter) live
          on the policy node it mentions. One hop fixes that. Meanwhile the
          simple factual and temporal questions score the same either way,
          which is what you'd hope: the graph didn't break anything that
          already worked.
        </p>
        <p>
          <strong>Some zeros are the judge's fault, not the system's.</strong>{' '}
          Both pipelines scored 0 on Q10, the hardware refund question, yet
          both replied "I don't have that information in the knowledge base",
          which is the right response. The hallucination-risk count was 0 out
          of 2 in every run. The judge marked correctness down because the gold
          answer also mentions that the refund policy covers only software.
          This is why the Python judge in Step 8 treats a plain refusal as
          correct, and why you should always read the reasons before trusting
          a zero.
        </p>
        <p>
          <strong>Some zeros are honest unknowns.</strong> Every run scored 0
          on Q5 ("Which open bugs affect Enterprise customers?", where the
          right answer is "none"). The screenshots from the talk don't show the
          answer the system gave, so the scores alone can't tell us why. It's a
          good exercise for your own run: open the report, read the answer and
          the context, and decide whether retrieval or generation is to blame.
          (One hint: answering "none" means checking every open bug against
          every customer, which is a question about the whole graph rather
          than a neighbourhood of it.)
        </p>
        <p>
          <strong>Judges disagree, and faithfulness is where they disagree
          most.</strong> Jev is a model from TypeSafe AI that, instead of
          writing an answer, returns a probability for each level of the rubric
          and a weighted score such as "1.28, leaning partially correct, 67%".
          On correctness it agreed closely with the LLM judge (20.01 against 20
          out of 24). On faithfulness it was far harsher (11.65 against 19).
          Neither judge saw the retrieved context, so both were guessing at
          what was grounded, and they guessed differently. It also illustrates
          the non-determinism warning: a different Jev run from the same
          session, shown on screen during the talk, averaged 1.57 correctness
          per question rather than 1.67.
        </p>
        <p>The judge also changes how long a run takes:</p>
        <div className='rb-bars' role='img' aria-label='Total time per run: Vector RAG plus LLM judge 1 minute 13 seconds; GraphRAG plus LLM judge 1 minute 30 seconds; GraphRAG plus Jev judge 37 seconds.'>
          {timings.map((t) => (
            <div key={t.label} className='rb-bars__row'>
              <span className='rb-bars__label'>{t.label}</span>
              <span className='rb-bars__track'>
                <span
                  className='rb-bars__fill'
                  style={{ width: `${(t.seconds / 90) * 100}%` }}
                />
              </span>
              <span className='rb-bars__value'>{t.shown}</span>
            </div>
          ))}
        </div>
        <p>
          GraphRAG adds about 17 seconds over 12 questions, roughly 1.4 seconds
          a question, for the larger prompt and graph walk. Swapping the
          judge cut the whole run to 37 seconds. On a set of 12 questions that
          hardly matters. On a set of 1,200 questions, the same per-question
          times (7.5 seconds against about 3) add up to roughly two and a half
          hours against one.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='step-12' className='sub-heading'>
          Step 12: Grow the benchmark
        </h3>
        <p>
          A benchmark is never finished. Every time a user finds a question
          the assistant gets wrong, that question belongs in the file. Adding
          one is just another entry:
        </p>
        <CodeCard code={newQuestionJson} lang='json' />
        <p>
          Some experiments to try, changing one thing at a time and comparing
          scorecards after each:
        </p>
        <ul className='bullet-list'>
          <li>
            <strong>Fewer hops.</strong> Change <code>*1..2</code> to{' '}
            <code>*1..1</code> in <code>retrievers.py</code>. Q3 should fall
            back to the ticket numbers without the customer names.
          </li>
          <li>
            <strong>More or fewer chunks.</strong> Change <code>TOP_K</code>{' '}
            in <code>config.py</code>. More chunks raise recall and lower
            precision.
          </li>
          <li>
            <strong>A different judge.</strong> Set <code>JUDGE_MODEL</code> to
            a larger model and see how much the scores move with the assistant
            unchanged. That movement is your judge's noise.
          </li>
          <li>
            <strong>Repeat runs.</strong> Run the same pipeline three times and
            compare. Any question whose score changes between identical runs
            needs a sharper gold answer or a stricter rubric.
          </li>
        </ul>
      </section>

      {/* =====================================================================
          PART 3: GOING FURTHER
         ===================================================================== */}
      <div className='article-panel rb-part'>
        <h2 id='part-3' className='rb-part__title'>
          Part 3: Going Further
        </h2>
        <p className='rb-part__lead'>
          The harness you built is one way to benchmark. Here's how it fits
          among the others, what to do when something breaks, and where to
          read more.
        </p>
      </div>

      <section className='article-panel'>
        <h3 id='other-approaches' className='sub-heading'>
          Other approaches
        </h3>
        <ul className='bullet-list'>
          <li>
            <strong>Deterministic scoring</strong>: exact match or a regular
            expression. Ideal when the gold answer is a short fact like a
            version number. Our <code>context_recall</code> is a small example.
          </li>
          <li>
            <strong>Retrieval-only metrics</strong>: precision, recall and MRR
            (mean reciprocal rank, which rewards a retriever for putting the
            first relevant result near the top), scored on the chunks or
            entities retrieved, before any answer is generated.
          </li>
          <li>
            <strong>Pairwise comparison</strong>: the judge sees two answers
            to the same question and picks the better one. Handy for old
            pipeline versus new, tracked over time.
          </li>
          <li>
            <strong>Existing frameworks</strong>:{' '}
            <ExternalLink href='https://github.com/explodinggradients/ragas'>
              Ragas
            </ExternalLink>
            ,{' '}
            <ExternalLink href='https://github.com/confident-ai/deepeval'>
              DeepEval
            </ExternalLink>{' '}
            and{' '}
            <ExternalLink href='https://github.com/Arize-ai/phoenix'>
              Arize Phoenix
            </ExternalLink>{' '}
            package many of these metrics. Having built one by hand, you'll
            know what their numbers mean.
          </li>
          <li>
            <strong>Production signals</strong>: thumbs up and down, how often
            users escalate to a human, and similar. They measure real use, but
            arrive late and noisy.
          </li>
        </ul>
      </section>

      <section className='article-panel'>
        <h3 id='troubleshooting' className='sub-heading'>
          Troubleshooting
        </h3>
        <div className='table-wrap'>
          <table>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Likely cause and fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>ServiceUnavailable</code> or "Unable to retrieve
                  routing information"
                </td>
                <td>
                  Neo4j isn't running or <code>NEO4J_URI</code> is wrong. Check{' '}
                  <code>docker ps</code>; for Aura, use the{' '}
                  <code>neo4j+s://</code> address.
                </td>
              </tr>
              <tr>
                <td>
                  <code>AuthError</code> / "The client is unauthorized"
                </td>
                <td>
                  Wrong password. A Docker container keeps the password it
                  first started with; recreate it, or use the password from
                  your Aura credentials file.
                </td>
              </tr>
              <tr>
                <td>"There is no such vector schema index: chunkEmbeddings"</td>
                <td>
                  The seed step hasn't run against this database. Run{' '}
                  <code>python seed.py</code>.
                </td>
              </tr>
              <tr>
                <td>Index dimension errors after changing the embedding model</td>
                <td>
                  The index has a fixed size (1,536). Run the reset below in
                  Neo4j Browser, set <code>EMBEDDING_DIMENSION</code> to match
                  the new model, and seed again.
                </td>
              </tr>
              <tr>
                <td>
                  <code>openai.AuthenticationError</code>
                </td>
                <td>
                  <code>OPENAI_API_KEY</code> isn't set in this terminal. Every
                  new terminal needs the <code>export</code> lines again.
                </td>
              </tr>
              <tr>
                <td>
                  <code>openai.RateLimitError</code> (429)
                </td>
                <td>
                  Too many calls too fast, or no credit on the account. Wait a
                  minute and rerun, or check billing.
                </td>
              </tr>
              <tr>
                <td>Scores change between identical runs</td>
                <td>
                  Expected: the judge is not deterministic. Compare categories,
                  not single questions, and average several runs.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeCard code={resetCypher} lang='cypher' />
      </section>

      <section className='article-panel'>
        <h3 id='resources' className='sub-heading'>
          Resources
        </h3>
        <ul className='bullet-list'>
          <li>
            Original Java code:{' '}
            <ExternalLink href='https://github.com/JMHReif/graphrag-benchmark-demo' />
          </li>
          <li>
            NICD report on reducing hallucinations with GraphRAG:{' '}
            <ExternalLink href='https://neo4j.com/whitepapers/nicd-reducing-hallucinations-graphrag/' />
          </li>
          <li>
            GraphRAG retrievers with LangChain4j (blog):{' '}
            <ExternalLink href='https://neo4j.com/blog/developer/langchain4j-graphrag-vector-stores-retrievers/' />
          </li>
          <li>
            LangChain4j Neo4j docs:{' '}
            <ExternalLink href='https://docs.langchain4j.dev/integrations/embedding-stores/neo4j/' />
          </li>
          <li>
            Neo4j Python driver manual:{' '}
            <ExternalLink href='https://neo4j.com/docs/python-manual/current/' />
          </li>
          <li>
            Neo4j GraphRAG package for Python, with ready-made retrievers:{' '}
            <ExternalLink href='https://neo4j.com/docs/neo4j-graphrag-python/current/' />
          </li>
          <li>
            Neo4j vector indexes:{' '}
            <ExternalLink href='https://neo4j.com/docs/cypher-manual/current/indexes/semantic-indexes/vector-indexes/' />
          </li>
          <li>
            What is GraphRAG?{' '}
            <ExternalLink href='https://neo4j.com/blog/genai/what-is-graphrag/' />
          </li>
        </ul>
        <p className='rb-closing'>
          Back to Q3, one last time. The vector-only assistant didn't lie about
          the customers. It said it didn't know, which was faithful, honest and
          no help at all. Only a benchmark that asked both questions, and kept
          score, could tell that apart from an assistant that worked. The
          benchmark doesn't make the assistant any smarter. It just means the
          next time it's confidently wrong, you'll be the first to know rather
          than the customer.
        </p>
      </section>

      <style>{`
        .article-content:has(> .toc-rail) {
          position: relative;
        }

        .article-content h2[id],
        .article-content h3[id] {
          scroll-margin-top: 96px;
        }

        .toc-rail {
          position: absolute;
          top: 0;
          bottom: 0;
          right: calc(100% + 32px);
          width: 200px;
          display: none;
        }

        .toc-rail .toc {
          position: sticky;
          top: 88px;
          max-height: calc(100vh - 112px);
          overflow-y: auto;
          scrollbar-width: thin;
        }

        @media (min-width: 1380px) {
          .toc-rail {
            display: block;
          }

          .toc-mobile {
            display: none;
          }
        }

        .toc__title {
          margin: 0 0 0.6rem 0;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text);
        }

        .article-content .toc__groups,
        .article-content .toc__items {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .article-content .toc li {
          margin: 0;
          padding: 0;
          line-height: inherit;
        }

        .article-content .toc__groups > li + li {
          margin-top: 0.75rem;
        }

        .toc__link {
          display: block;
          width: 100%;
          margin: 0;
          padding: 0.2rem 0 0.2rem 0.75rem;
          font-family: var(--font-body);
          font-size: 0.82rem;
          line-height: 1.45;
          text-align: left;
          color: var(--text-soft);
          background: none;
          border: 0;
          border-left: 2px solid var(--border);
          cursor: pointer;
        }

        .toc__group {
          font-weight: 600;
          color: var(--text);
        }

        .toc__link:hover {
          color: var(--text);
        }

        .toc__link--active,
        .toc__link--active:hover {
          color: var(--accent);
          border-left-color: var(--accent);
        }

        .toc__link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 1px;
        }

        .toc-mobile {
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }

        .toc-mobile summary {
          margin: 0;
          cursor: pointer;
        }

        .toc-mobile[open] summary {
          margin-bottom: 0.6rem;
        }

        .main-heading {
          background: var(--accent-glow);
          padding: 0.6rem 1rem;
          border-radius: 8px;
          margin-top: 0.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.35;
        }

        .article-panel h3.sub-heading,
        .sub-heading {
          background: var(--surface-soft);
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          margin-top: 1.25rem;
          margin-bottom: 0.85rem;
          font-family: var(--font-display);
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          line-height: 1.4;
          color: var(--text);
        }

        .article-panel > .sub-heading:first-child {
          margin-top: 0.25rem;
        }

        .article-panel p + p {
          margin-top: 0.75rem;
        }

        .rb-banner {
          background: color-mix(in srgb, var(--accent) 7%, var(--surface));
          margin-bottom: 2rem;
          padding: 1.25rem 1.5rem;
          border-radius: 8px;
        }

        .rb-credit {
          margin: 1rem 0 0 0;
          font-size: 0.9rem;
          color: var(--text-soft);
        }

        .rb-part {
          background: color-mix(in srgb, var(--accent) 8%, var(--surface));
          margin: 2.5rem 0 1.5rem 0;
          padding: 1.25rem 1.5rem;
          border-radius: 8px;
        }

        .article-panel h2.rb-part__title {
          font-size: 1.4rem;
          margin: 0 0 0.5rem 0;
          background: transparent;
          border: none;
          padding: 0;
        }

        .rb-part__lead {
          margin: 0;
          color: var(--text-soft);
        }

        .rb-figure {
          margin: 1.5rem 0;
        }

        .rb-figure img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .rb-note {
          margin: 1.25rem 0;
          padding: 1rem 1.25rem;
          background: var(--surface-soft);
          border: 1px solid var(--border);
          border-radius: 10px;
        }

        .rb-note p {
          margin: 0;
          color: var(--text-soft);
          line-height: 1.6;
        }

        .rb-note p + p {
          margin-top: 0.6rem;
        }

        .rb-note .rb-note__title {
          margin: 0 0 0.4rem 0;
          font-weight: 600;
          color: var(--text);
        }

        .rb-diagram {
          display: block;
          width: 100%;
          height: auto;
          max-width: 680px;
          margin: 0 auto;
          font-family: var(--font-body);
        }

        .rb-diagram__node {
          fill: var(--surface-soft);
          stroke: var(--border-strong);
          stroke-width: 1.2;
        }

        .rb-diagram__node--answer {
          stroke: var(--accent);
        }

        .rb-diagram__label {
          fill: var(--text);
          font-size: 13px;
          font-weight: 600;
        }

        .rb-diagram__sub {
          fill: var(--text-soft);
          font-size: 11px;
        }

        .rb-diagram__edge {
          stroke: var(--text-soft);
          stroke-width: 1.4;
        }

        .rb-diagram__edge--muted {
          stroke-dasharray: 4 4;
          opacity: 0.7;
        }

        .rb-diagram__arrowhead {
          fill: var(--text-soft);
        }

        .rb-diagram__rel {
          fill: var(--text);
          font-size: 10.5px;
          font-family: 'IBM Plex Mono', monospace;
        }

        .rb-diagram__tag {
          fill: var(--text-soft);
          font-size: 11px;
          font-style: italic;
        }

        .rb-results td,
        .rb-results th {
          white-space: nowrap;
        }

        .rb-results__focus td {
          background: color-mix(in srgb, var(--accent) 6%, transparent);
        }

        .rb-results__total td {
          border-top: 1px solid var(--border-strong);
          font-weight: 600;
        }

        .rb-bars {
          margin: 1.25rem 0;
          display: grid;
          gap: 0.6rem;
        }

        .rb-bars__row {
          display: grid;
          grid-template-columns: minmax(0, 12rem) minmax(0, 1fr) 3rem;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
        }

        .rb-bars__label {
          color: var(--text);
        }

        .rb-bars__track {
          height: 0.9rem;
          background: var(--surface-soft);
          border-radius: 4px;
          overflow: hidden;
        }

        .rb-bars__fill {
          display: block;
          height: 100%;
          background: color-mix(in srgb, var(--accent) 55%, var(--surface-soft));
          border-radius: 4px;
        }

        .rb-bars__value {
          font-family: 'IBM Plex Mono', monospace;
          color: var(--text-soft);
        }

        @media (max-width: 560px) {
          .rb-bars__row {
            grid-template-columns: minmax(0, 1fr) 3rem;
          }

          .rb-bars__label {
            grid-column: 1 / -1;
          }
        }

        .rb-closing {
          margin-top: 1.5rem !important;
        }

        .code-card {
          margin: 1rem 0 1.25rem 0;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--surface-strong);
          box-shadow: var(--shadow-sm);
        }

        .code-card__header {
          padding: 10px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--surface-soft);
          color: var(--text);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .code-card__meta {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .code-card__lang {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          text-transform: lowercase;
          padding: 2px 8px;
          border-radius: 4px;
          background: var(--accent-glow);
          color: var(--accent);
          font-weight: 600;
        }

        .code-card__file {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.8rem;
          color: inherit;
          opacity: 0.75;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .code-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-soft);
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          transition: all 150ms ease;
          flex-shrink: 0;
        }

        .code-copy-btn:hover {
          color: var(--accent);
          background: var(--surface-soft);
          border-color: var(--border-strong);
        }

        .code-copy-btn--copied {
          color: #16a34a;
          background: rgba(22, 163, 74, 0.12);
          border-color: rgba(22, 163, 74, 0.3);
        }

        body[data-theme='dark'] .code-copy-btn--copied {
          color: #4ade80;
          background: rgba(74, 222, 128, 0.18);
          border-color: rgba(74, 222, 128, 0.4);
        }

        .code-block {
          margin: 0;
          padding: 16px 20px;
          background: #0d1117;
          overflow-x: auto;
        }

        .code-block--tall {
          max-height: 560px;
          overflow-y: auto;
        }

        .code-block code {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.86rem;
          line-height: 1.65;
          color: #e6edf3;
          background: none;
          padding: 0;
          border: none;
          display: block;
          white-space: pre;
        }

        .syn-keyword {
          color: #ff7b72;
          font-weight: 600;
        }

        .syn-var {
          color: #79c0ff;
        }

        .syn-label {
          color: #7ee787;
          font-weight: 600;
        }

        .syn-string {
          color: #a5d6ff;
        }

        .syn-val {
          color: #ffa657;
        }

        .syn-fn {
          color: #d2a8ff;
        }

        .syn-comment {
          color: #8b949e;
          font-style: italic;
        }
      `}</style>
    </>
  );
}
