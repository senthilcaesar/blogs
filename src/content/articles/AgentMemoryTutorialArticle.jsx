import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import {
  checkTools,
  cloneRepo,
  devModule1,
  devModule2,
  devModule3,
  devModule4,
  devModule5,
  diff12,
  diff23,
  diff34,
  diffOneFile,
  diffSample,
  envFile,
  m1Agent,
  m1Terminal2,
  m1Tool,
  m2Limits,
  m2Query,
  m2Recent,
  m2Settings,
  m2Terminal2,
  m2Turn,
  m3Hydrate,
  m3Ontology,
  m3Query,
  m3Settings,
  m3Terminal2,
  m3Tools,
  m4Open,
  m4Query,
  m4Record,
  m4Similar,
  m4Terminal2,
  m5Check,
  m5Compare,
  m5Env,
  m5Fallback,
  m5Fresh,
  m5Hosted,
  m5Skill,
  makeCheck,
  makeSetup,
  mondayPy,
  takeHome,
} from './agentMemoryTutorialCode';

const image = (name) =>
  new URL(`../../../images/agent-memory-${name}.webp`, import.meta.url).href;

const appImg = image('app');
const arcImg = image('arc');
const overviewImg = image('overview');
const threeTypesImg = image('three-types');
const twoStoresImg = image('two-stores');
const statelessImg = image('stateless');
const messageChainImg = image('message-chain');
const contextAssemblyImg = image('context-assembly');
const ontologyExtractionImg = image('ontology-extraction');
const ontologyCompareImg = image('ontology-compare');
const hydrationImg = image('hydration');
const traceImg = image('trace');
const similarTasksImg = image('similar-tasks');
const distillationImg = image('distillation');
const skillGraphImg = image('skill-graph');

/* ---------------------------------------------------------------------------
   A tiny syntax highlighter, so the samples stay readable without
   hand-written <span>s. It only needs to be good enough for this page.
   ------------------------------------------------------------------------- */

const PY_KEYWORDS = new Set(
  'and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None not or pass raise return True try while with yield'.split(
    ' ',
  ),
);

const CYPHER_KEYWORDS = new Set(
  'MATCH OPTIONAL WHERE RETURN WITH MERGE CREATE SET ORDER BY DESC ASC LIMIT AS AND OR NOT IN IS NULL STARTS'.split(
    ' ',
  ),
);

const PATTERNS = {
  python:
    /([rbfRBF]?"""[\s\S]*?"""|[rbfRBF]?"(?:[^"\\\n]|\\.)*"|[rbfRBF]?'(?:[^'\\\n]|\\.)*')|(#[^\n]*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/g,
  cypher:
    /('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|(\/\/[^\n]*)|(\b\d+(?:\.\d+)?\b)|(:[A-Za-z_]\w*|\b[A-Za-z_]\w*\b)/g,
  bash: /("(?:[^"\\\n]|\\.)*"|'[^'\n]*')|((?:^|(?<=\s))#[^\n]*)/gm,
  yaml: /("(?:[^"\\\n]|\\.)*")|(#[^\n]*)|^(\s*-?\s*[A-Za-z_][\w ]*)(?=:)/gm,
};

function classify(lang, match, code) {
  const [text, g1, g2, g3, g4] = match;
  const next = code[match.index + text.length];

  if (g1) return 'syn-string';
  if (g2) return 'syn-comment';
  if (lang === 'yaml') return g3 ? 'syn-var' : null;
  if (lang === 'bash') return null;
  if (g3) return 'syn-val';
  if (!g4) return null;

  if (lang === 'python') {
    if (PY_KEYWORDS.has(g4)) return 'syn-keyword';
    if (next === '(') return 'syn-fn';
    return null;
  }
  if (lang === 'cypher') {
    if (g4.startsWith(':')) return 'syn-label';
    if (CYPHER_KEYWORDS.has(g4)) return 'syn-keyword';
    if (next === '(') return 'syn-fn';
  }
  return null;
}

function highlight(code, lang) {
  const pattern = PATTERNS[lang];
  if (!pattern) return code;

  const parts = [];
  let last = 0;
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

function CodeCard({ code, lang = 'python', file }) {
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
      <pre className='code-block'>
        <code>{highlight(code, lang)}</code>
      </pre>
    </div>
  );
}

// Width and height reserve the space up front, so sidebar jumps land accurately.
function Figure({ src, alt, caption, width = 1800, height = 941 }) {
  return (
    <figure className='am-figure'>
      <img src={src} alt={alt} width={width} height={height} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Note({ title, children }) {
  return (
    <div className='am-note'>
      {title && <p className='am-note__title'>{title}</p>}
      {children}
    </div>
  );
}

function OptionalCode({ children }) {
  return (
    <Note title='Not a programmer? This section is optional'>
      <p>
        <strong>The takeaway:</strong> {children} You can skip to the next module
        and lose nothing you need to finish the tutorial.
      </p>
    </Note>
  );
}

function Checkpoint({ next, minutes }) {
  return (
    <Note title='Good place to stop'>
      <p>
        Next up is {next}, which takes about {minutes} minutes. If you're taking
        a break, see <strong>Taking a break</strong> in Part 2 for how to pick up
        where you left off.
      </p>
    </Note>
  );
}

function Steps({ children }) {
  return <ol className='am-steps'>{children}</ol>;
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} target='_blank' rel='noreferrer'>
      {children}
    </a>
  );
}

function YoutubeIcon() {
  return (
    <svg width='20' height='14' viewBox='0 0 20 14' aria-hidden='true' style={{ flexShrink: 0 }}>
      <rect width='20' height='14' rx='4' fill='#ff0000' />
      <path d='M8 4l5 3-5 3z' fill='#ffffff' />
    </svg>
  );
}

function YoutubeLink({ href, children }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', verticalAlign: 'bottom' }}
    >
      <YoutubeIcon />
      {children}
    </a>
  );
}

const tocGroups = [
  {
    id: 'part-1',
    label: 'Part 1: The ideas',
    items: [
      { id: 'why-forget', label: 'Why agents forget' },
      { id: 'what-is-agent', label: 'What is an agent?' },
      { id: 'knowledge-graph', label: 'What is a knowledge graph?' },
      { id: 'context-graph', label: 'What is a context graph?' },
      { id: 'three-memories', label: 'Three kinds of memory' },
      { id: 'scorecard', label: 'How we measure progress' },
    ],
  },
  {
    id: 'part-2',
    label: 'Part 2: Set up',
    items: [
      { id: 'need', label: 'What you need' },
      { id: 'clone', label: 'Step 1: Get the code' },
      { id: 'aura', label: 'Step 2: Create the database' },
      { id: 'openai', label: 'Step 3: Get an OpenAI key' },
      { id: 'env', label: 'Step 4: Fill in .env' },
      { id: 'check', label: 'Step 5: Check and start' },
      { id: 'tour', label: 'A tour of the app' },
      { id: 'rhythm', label: 'How each module works' },
      { id: 'break', label: 'Taking a break' },
    ],
  },
  {
    id: 'module-1',
    label: 'Module 1: Stateless',
    items: [
      { id: 'm1-run', label: 'Run it' },
      { id: 'm1-code', label: 'Read the code (optional)' },
    ],
  },
  {
    id: 'module-2',
    label: 'Module 2: Short-term',
    items: [
      { id: 'm2-idea', label: 'The idea' },
      { id: 'm2-run', label: 'Run it' },
      { id: 'm2-code', label: 'Read the code (optional)' },
    ],
  },
  {
    id: 'module-3',
    label: 'Module 3: Long-term',
    items: [
      { id: 'm3-idea', label: 'Entities and ontologies' },
      { id: 'm3-hydration', label: 'Hydration' },
      { id: 'm3-run', label: 'Run it' },
      { id: 'm3-code', label: 'Read the code (optional)' },
    ],
  },
  {
    id: 'module-4',
    label: 'Module 4: Reasoning',
    items: [
      { id: 'm4-idea', label: 'Anatomy of a trace' },
      { id: 'm4-run', label: 'Run it' },
      { id: 'm4-code', label: 'Read the code (optional)' },
      { id: 'm4-measure', label: 'Does recall help?' },
    ],
  },
  {
    id: 'module-5',
    label: 'Module 5: Skills',
    items: [
      { id: 'm5-idea', label: 'From memory to skill' },
      { id: 'm5-key', label: 'Step 1: Get a key' },
      { id: 'm5-distill', label: 'Step 2: Distill' },
      { id: 'm5-compare', label: 'Step 3: Fresh agent' },
      { id: 'm5-inspect', label: 'Step 4: Trace the evidence' },
      { id: 'm5-drift', label: 'When memory changes' },
    ],
  },
  {
    id: 'finish',
    label: 'Finishing up',
    items: [
      { id: 'why-graph', label: 'Why a graph at all?' },
      { id: 'own-agent', label: 'Your own agent' },
      { id: 'troubleshooting', label: 'Troubleshooting' },
      { id: 'commands', label: 'Command cheat sheet' },
      { id: 'cleanup', label: 'Clean up' },
      { id: 'further-reading', label: 'Further reading' },
    ],
  },
];

// Every target in document order: each part heading, then its sections
const tocIds = tocGroups.flatMap((group) => [
  group.id,
  ...group.items.map((item) => item.id),
]);

// Distance from the viewport top at which a heading counts as "being read"
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

  // The list is taller than most screens, so keep the current section in view.
  // This scrolls only the rail: scrollIntoView would also move the page.
  useEffect(() => {
    const rail = document.querySelector(
      mobileOpen ? '.toc-mobile > nav' : '.toc-rail .toc',
    );
    const link = rail?.querySelector('.toc__link--active');
    if (!link) return;
    const offset =
      link.getBoundingClientRect().top - rail.getBoundingClientRect().top;
    if (offset < 0 || offset > rail.clientHeight - link.offsetHeight) {
      rail.scrollTop += offset - rail.clientHeight / 2;
    }
  }, [activeId, mobileOpen]);

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

function PartBanner({ id, title, children }) {
  return (
    <div className='article-panel am-part'>
      <h2 id={id} className='am-part__title'>
        {title}
      </h2>
      <p className='am-part__lead'>{children}</p>
    </div>
  );
}

const PASS = '✅';
const FAIL = '❌';

const scorecardRows = [
  {
    name: 'Named lookup',
    asks: "What name and email did this customer give?",
    needs: 'A saved message',
    results: [FAIL, PASS, PASS, PASS],
  },
  {
    name: 'Conversation phrase',
    asks: 'What was my exact verification phrase?',
    needs: 'A saved message',
    results: [FAIL, PASS, PASS, PASS],
  },
  {
    name: 'Account fact',
    asks: "What is this customer's signup date?",
    needs: 'A fact checked against business records',
    results: [FAIL, FAIL, PASS, PASS],
  },
  {
    name: 'Decision quote',
    asks: 'What exactly did we say when we refused?',
    needs: 'A recorded trace',
    results: [FAIL, FAIL, FAIL, PASS],
  },
];

function ScorecardTable() {
  return (
    <div className='table-wrap'>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>What it asks</th>
            <th>What it needs</th>
            <th>M1</th>
            <th>M2</th>
            <th>M3</th>
            <th>M4</th>
          </tr>
        </thead>
        <tbody>
          {scorecardRows.map((row) => (
            <tr key={row.name}>
              <td>
                <strong>{row.name}</strong>
              </td>
              <td>{row.asks}</td>
              <td>{row.needs}</td>
              {row.results.map((result, index) => (
                <td key={index}>{result}</td>
              ))}
            </tr>
          ))}
          <tr className='am-total'>
            <td colSpan={3}>Expected score</td>
            <td>0/4</td>
            <td>2/4</td>
            <td>3/4</td>
            <td>4/4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function AgentMemoryTutorialArticle() {
  return (
    <>
      <ArticleToc />

      <div className='article-panel am-banner'>
        <p className='article-lead' style={{ margin: 0, fontWeight: 500 }}>
          This tutorial assumes you've never heard of a knowledge graph, a
          context graph or agent memory. If you can copy a command into a
          terminal, you can finish it. You won't write any code: you'll run a
          working app and watch it improve one stage at a time. The sections
          called "Read the code" are there for the curious, and you can skip
          them.
        </p>
        <ul className='bullet-list' style={{ marginTop: '1rem' }}>
          <li>
            <strong>Part 1: The ideas</strong>: agents, graphs and the three
            kinds of memory, with no setup needed.
          </li>
          <li>
            <strong>Part 2: Set up</strong>: the tools, a copy of the code
            on your computer, a free database and the app running in your browser.
          </li>
          <li>
            <strong>Modules 1 to 5</strong>: for each stage, what it adds, how
            to run it, how to check the result and where to read the code.
          </li>
          <li>
            <strong>Finishing up</strong>: applying this to your own agent,
            fixes for common errors and a command cheat sheet.
          </li>
        </ul>
        <p className='am-credit'>
          Based on Will Lyon's{' '}
          <YoutubeLink href='https://youtu.be/ybekhrF4HUY'>
            Road to NODES workshop
          </YoutubeLink>{' '}
          at Neo4j and its{' '}
          <ExternalLink href='https://github.com/johnymontana/road-to-agent-memory'>
            road-to-agent-memory
          </ExternalLink>{' '}
          repository. The diagrams are slides from the workshop deck, and the
          code is condensed from the repository, where <code># ...</code> marks
          a gap. The steps follow the repository, which differs from the
          recording in a few places. For example, the recording uses GitHub
          Codespaces, and here you'll run everything on your own computer. Expected results come from the repository's
          November 2026 rehearsal notes, and yours may vary because model
          replies do.
        </p>
      </div>

      {/* =====================================================================
          PART 1: THE IDEAS
         ===================================================================== */}
      <section className='article-panel'>
        <h2 id='part-1' className='main-heading'>
          Part 1: The Ideas
        </h2>

        <h3 id='why-forget' className='sub-heading'>
          Why agents forget
        </h3>
        <p>
          Picture a customer named Maya, who contacts a support chatbot because
          she was charged $49 twice. She gives her email address, and the bot
          finds her account. She sends one more message, and the bot asks for
          her email address again. It's a small annoyance, but it points at
          something surprising about how these systems work: the language model
          behind the chat keeps nothing between messages. Every call starts
          from a blank page.
        </p>
        <p>
          The obvious fix is to paste the whole chat history into every call,
          and for a short chat that works fine. The trouble is that it only
          solves today's conversation. Next week, Maya comes back in a new chat
          and the bot has never heard of her. And when the bot works out how to
          process a refund correctly, the method disappears the moment the chat
          ends, so it works it all out again for the next customer, paying for
          the same thinking every time.
        </p>
        <p>
          That gap is what <strong>agent memory</strong> fills. Simply put,
          agent memory is a store outside the model where an agent keeps what
          was said, what it learned and what it did, along with the code that
          brings the right pieces back at the right moment. In this tutorial,
          we'll follow Maya's $49 charge through five versions of the same
          support agent, each one remembering a little more than the last.
        </p>
        <Figure
          src={arcImg}
          alt='Five stages left to right: stateless with tools only; short-term with message history; long-term with typed entities and SQL-grounded fields; reasoning with execution records; and a derived skill with a portable procedure.'
          caption='The five stages. Each adds one layer, and the last builds a reusable procedure from the others. (Slide from the workshop.)'
        />

        <h3 id='what-is-agent' className='sub-heading'>
          What is an agent?
        </h3>
        <p>
          A large language model (LLM) is a program that reads text and writes a
          plausible continuation. On its own, it can't look anything up or do
          anything. An <strong>agent</strong> pairs that model with instructions
          and <strong>tools</strong>, which are ordinary functions the model is
          allowed to ask for. If you ask an agent about Maya's plan, the model
          can't know the answer, so it replies, in effect, "please call{' '}
          <code>lookup_account</code> with this email". The program runs that
          function, hands back the result, and the model writes its answer.
        </p>
        <p>
          The agent in this tutorial is called SupportBot, and it works for a
          made-up company called Acme Cloud. It's built with{' '}
          <strong>PydanticAI</strong>, a library for building agents in Python, a
          popular programming language.
          The ideas transfer to other agent frameworks, so you don't need to
          know PydanticAI to follow along.
        </p>

        <h3 id='knowledge-graph' className='sub-heading'>
          What is a knowledge graph?
        </h3>
        <p>
          A <strong>knowledge graph</strong> is an organized representation of
          real-world things, their attributes and the relationships between
          them. Think of a detective's wall of photos joined by string. The
          photos are the things, and the string is what makes the wall useful:
          it lets you start at one photo and follow the connections. The{' '}
          <Link to='/posts/neo4j-intro-workshop'>Neo4j Intro Workshop</Link>{' '}
          covers this from scratch, but you only need four words for this
          tutorial:
        </p>
        <ul className='bullet-list'>
          <li>
            <strong>Node:</strong> a thing, drawn as a circle. Maya is a node,
            and so is the Pro plan.
          </li>
          <li>
            <strong>Label:</strong> a tag saying what kind of thing a node is,
            like <code>Customer</code> or <code>Message</code>.
          </li>
          <li>
            <strong>Property:</strong> a fact stored on a node as a key and a
            value, like <code>email: maya.chen@northwind.example</code>.
          </li>
          <li>
            <strong>Relationship:</strong> a named arrow between two nodes,
            like <code>SUBSCRIBES_TO</code>. Nodes are the nouns, and
            relationships are the verbs.
          </li>
        </ul>
        <p>
          <strong>Neo4j</strong> is a database built to store graphs, and{' '}
          <strong>Cypher</strong> is its query language. A Cypher query is
          drawn more than written, with round brackets for nodes and arrows for
          relationships. Read this one aloud and it's nearly a sentence: a
          customer named Maya subscribes to some plan.
        </p>
        <CodeCard
          lang='cypher'
          code={`MATCH (c:Customer {name: "Maya Chen"})-[:SUBSCRIBES_TO]->(p:Plan)\nRETURN p.name`}
        />
        <p>
          That's an illustration of the pattern. (The memory graph we'll build
          stores these connections a little differently, as you'll see in module
          3.) One more distinction is worth having now: an{' '}
          <strong>ontology</strong> is the blueprint, which says that customers
          can subscribe to plans, while the knowledge graph is the populated
          network, which says that Maya subscribes to Pro. If you'd like more on
          that, see{' '}
          <Link to='/posts/semantic-model-vs-ontology-vs-knowledge-graph'>
            Semantic Model vs Ontology vs Knowledge Graph
          </Link>
          .
        </p>

        <h3 id='context-graph' className='sub-heading'>
          What is a context graph?
        </h3>
        <p>
          A knowledge graph usually records how the world is: Maya is on the Pro
          plan. A <strong>context graph</strong> is what you get when an agent's
          own experience goes into the same graph, connected to those facts: the
          message where Maya mentioned Pro, the refund the agent issued and the
          tool it used. In this tutorial, the context graph is that one graph
          holding conversations, entities and the record of the agent's actions.
        </p>
        <p>
          Why does the connection matter? Suppose someone asks, a month later,
          why Maya got that refund. With three separate stores, you'd have to
          stitch together a chat log, a customer database and a tool log. In a
          context graph, you start at the refund and follow the arrows back to
          the policy check and to the message that asked for it. In practice,
          you can always ask where a piece of knowledge came from, which is
          known as <strong>provenance</strong>.
        </p>

        <h3 id='three-memories' className='sub-heading'>
          Three kinds of memory
        </h3>
        <p>
          The open source <code>neo4j-agent-memory</code> Python package splits
          memory into three kinds, each answering a different question.
        </p>
        <Figure
          src={overviewImg}
          width={1800}
          height={870}
          alt='Four cartoon robots in a row. A stateless agent takes input and gives output, but starts fresh every turn. Short-term memory holds the current conversation and immediate context. Long-term memory stores history, facts and past experiences in a filing cabinet. Reasoning memory evaluates, plans and solves problems.'
          caption='Where we start, on the far left, and the three kinds of memory we add, one per module.'
        />
        <div className='table-wrap'>
          <table>
            <thead>
              <tr>
                <th>Memory</th>
                <th>The question it answers</th>
                <th>What it stores</th>
                <th>In Maya's case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Short-term</strong>
                </td>
                <td>What was said?</td>
                <td>Conversations and messages</td>
                <td>"I was charged twice"</td>
              </tr>
              <tr>
                <td>
                  <strong>Long-term</strong>
                </td>
                <td>Who and what is this about?</td>
                <td>Entities and preferences</td>
                <td>Maya, the Pro plan, prefers email</td>
              </tr>
              <tr>
                <td>
                  <strong>Reasoning</strong>
                </td>
                <td>How did the agent act?</td>
                <td>Tasks, steps, tool calls and outcomes</td>
                <td>Looked up her account, issued $49</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The names can mislead. "Short-term" doesn't mean temporary: these
          messages sit in the database and survive restarts. And "reasoning"
          doesn't mean the model's private thoughts. It's a record of what the
          application saw the agent do.
        </p>
        <Figure
          src={threeTypesImg}
          alt='A Conversation node connects through HAS_MESSAGE to a Message node, which connects through MENTIONS to an Entity node. A Reasoning Trace connects to the Message through INITIATED_BY. One client exposes short_term, long_term and reasoning.'
          caption='All three kinds of memory live in one graph, and the message is what joins them. (Slide from the workshop.)'
        />

        <h3 id='scorecard' className='sub-heading'>
          How we measure progress
        </h3>
        <p>
          It's easy to feel that an agent got better. So, as the workshop
          recommends, we'll measure it. The repository includes a small{' '}
          <strong>evaluation</strong>, or eval: a fixed set of questions with
          known answers, run against each version of the agent. There are four
          questions, and each one needs a specific kind of memory to answer.
          This table is our map for the whole tutorial.
        </p>
        <ScorecardTable />
        <p>
          The grading is strict. An answer passes only if it has the right facts{' '}
          <em>and</em> cites the ID of an acceptable source. So the right phrase
          with no valid source still fails. This eval tests retrieval only, and
          it won't tell you whether the agent is safe or generally good. (For
          more on the idea, see{' '}
          <Link to='/posts/agent-evaluations-foundations'>
            our guide to agent evaluations
          </Link>
          .)
        </p>
      </section>

      {/* =====================================================================
          PART 2: SET UP
         ===================================================================== */}
      <PartBanner id='part-2' title='Part 2: Set Up'>
        We'll get three things ready: the code on your computer, a database for
        the memory and an AI model to talk to. Allow about 30 minutes, or longer
        if you need to install the tools first.
      </PartBanner>

      <section className='article-panel'>
        <h3 id='need' className='sub-heading'>
          What you need
        </h3>
        <ul className='bullet-list'>
          <li>
            <strong>A Mac, Linux or Windows computer.</strong> On Windows, use{' '}
            <ExternalLink href='https://learn.microsoft.com/windows/wsl/install'>
              WSL
            </ExternalLink>{' '}
            (Windows Subsystem for Linux), because the project's commands expect a
            Linux-style terminal.
          </li>
          <li>
            <strong>A code editor</strong>, also called an IDE.{' '}
            <ExternalLink href='https://code.visualstudio.com/'>
              VS Code
            </ExternalLink>{' '}
            is free and is what this tutorial describes, but any editor works.
          </li>
          <li>
            <strong>A free Neo4j Aura account</strong>, for the database.
          </li>
          <li>
            <strong>An OpenAI account with billing enabled</strong>. The
            workshop expects the whole run to cost under $1.
          </li>
          <li>
            <strong>A free Neo4j Agent Memory Service account</strong>, for
            module 5 only. You can finish the tutorial without one.
          </li>
          <li>
            <strong>About 2.5 hours.</strong> That's the workshop's length, and
            you can stop between modules.
          </li>
        </ul>
        <Note title='Three words you will see a lot'>
          <p>
            A <strong>terminal</strong> is a window where you type commands
            instead of clicking. A <strong>repository</strong> (or repo) is a
            project's folder of code on GitHub. And <code>make</code> is a tool
            that runs a saved recipe: <code>make check</code> means "run the
            recipe named check". Every step here is a <code>make</code> command,
            and you run them all from the repo's top folder.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='clone' className='sub-heading'>
          Step 1: Get the code
        </h3>
        <p>
          <strong>Cloning</strong> means downloading your own copy of a repository.
          Before we do that, your computer needs four small tools:
        </p>
        <ul className='bullet-list'>
          <li>
            <ExternalLink href='https://git-scm.com/downloads'>Git</ExternalLink>
            , which downloads the code.
          </li>
          <li>
            <ExternalLink href='https://docs.astral.sh/uv/getting-started/installation/'>
              uv
            </ExternalLink>
            , which installs the Python packages. The project needs Python 3.11
            or later, and uv can fetch a suitable version for you.
          </li>
          <li>
            <ExternalLink href='https://nodejs.org/'>Node.js</ExternalLink> (the
            LTS version), which runs the web app.
          </li>
          <li>
            <code>make</code>, which runs the project's commands. On a Mac,{' '}
            <code>xcode-select --install</code> provides it along with Git. On
            Linux and WSL, install it with your package manager.
          </li>
        </ul>
        <p>
          Open a terminal (<strong>Terminal</strong> on a Mac, your distribution's
          terminal on Linux, or your Linux terminal in WSL) and check them. Each
          line should print a version number. If one says "command not found",
          install that tool, then open a new terminal and try again.
        </p>
        <CodeCard code={checkTools} lang='bash' file='Terminal' />
        <p>
          Now download the code and move into its folder. This creates a folder
          called <code>road-to-agent-memory</code> inside whichever folder your
          terminal is in.
        </p>
        <CodeCard code={cloneRepo} lang='bash' file='Terminal' />
        <p>Next, open that folder in your editor:</p>
        <Steps>
          <li>
            In VS Code, choose <strong>File &rarr; Open Folder</strong> and select{' '}
            <code>road-to-agent-memory</code>. In another editor, use its
            equivalent. Open that top folder itself, not a folder inside it.
          </li>
          <li>
            If your editor asks whether you trust the folder, say yes. If it
            offers to reopen in a container, say no.
          </li>
          <li>
            Open the editor's built-in terminal. In VS Code, that's{' '}
            <strong>Terminal &rarr; New Terminal</strong>. From now on, use this
            terminal. In an editor without one, keep using your own terminal in
            the same folder.
          </li>
        </Steps>
        <p>
          Finally, create your private settings file and install the project. The
          first run downloads a lot of packages, so it can take a few minutes.
        </p>
        <CodeCard code={makeSetup} lang='bash' file='Terminal 1' />
        <Note title='What you should see'>
          <p>
            The output ends with a line starting <em>Seeded</em>, followed by row
            counts such as <em>customers: 3 rows</em>. That means the sample
            business data is ready. A message from npm about an audit is normal
            and you can ignore it.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='aura' className='sub-heading'>
          Step 2: Create the database
        </h3>
        <p>
          <strong>AuraDB</strong> is Neo4j's hosted database service, so there's
          nothing to install. This is where your agent's memory will live, which
          is why each person needs their own.
        </p>
        <Steps>
          <li>
            Sign in at{' '}
            <ExternalLink href='https://console.neo4j.io/'>
              console.neo4j.io
            </ExternalLink>{' '}
            and create a free account if you need one.
          </li>
          <li>
            Create a <strong>free</strong> instance, which just means your own
            running copy of the database. If you can choose a region,
            pick the one closest to you: every memory write is a round trip, and
            a distant region can stretch a chat turn to 20 seconds or more.
          </li>
          <li>
            <strong>Download the credentials file straight away.</strong> The
            password is only shown once.
          </li>
          <li>Wait until the instance shows as running.</li>
        </Steps>
        <Note title='Coming back later?'>
          <p>
            Free instances pause when idle. If the app can't reach the database
            on another day, resume the instance from the Aura console.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='openai' className='sub-heading'>
          Step 3: Get an OpenAI key
        </h3>
        <p>
          The agent uses OpenAI for three jobs: writing replies, turning text
          into searchable numbers and, from module 3, extracting facts from
          messages. Create an API key at{' '}
          <ExternalLink href='https://platform.openai.com/'>
            platform.openai.com
          </ExternalLink>
          . An API (application programming interface) is how one program talks to
          another, and an API key is the password for it. Keep it out of chats,
          screenshots and anything you commit to Git, the tool that tracks
          changes to code. You'll need a small balance on the account, and there's
          no way around this one: every module calls the model. (If you watch the recording, you'll see a
          temporary shared key that was only for that session. Use your own.)
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='env' className='sub-heading'>
          Step 4: Fill in .env
        </h3>
        <p>
          <code>.env</code> is a private settings file that Git is set up to
          ignore, so your secrets stay on your machine. Open it from the file
          list in your editor and fill in the values from your credentials file and
          OpenAI. Your file has a few extra comment lines, which you can leave
          alone. Just change these lines:
        </p>
        <CodeCard code={envFile} lang='bash' file='.env' />
        <Note title='Replace the whole placeholder, including the angle brackets'>
          <p>
            Everything from <code>&lt;</code> to <code>&gt;</code> gets replaced,
            with no spaces or quotation marks around the value. For example,{' '}
            <code>NEO4J_URI=&lt;URI from your Aura credentials file&gt;</code>{' '}
            becomes something like{' '}
            <code>NEO4J_URI=neo4j+s://abcd1234.databases.neo4j.io</code>. Save
            the file when you're done.
          </p>
        </Note>
        <Note title='Leave NEO4J_DATABASE alone'>
          <p>
            The credentials file may include a database name. Don't copy it. The
            app asks the server for the right one, and newer instances name it
            after the instance ID.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='check' className='sub-heading'>
          Step 5: Check and start
        </h3>
        <p>
          In your terminal, check that everything can connect. This takes under a
          minute.
        </p>
        <CodeCard code={makeCheck} lang='bash' file='Terminal 1' />
        <Note title='What you should see'>
          <p>
            Green ✅ marks and <em>All required checks passed</em>. A warning
            that NAMS is optional is normal for now. (One check mentions a "Codespaces
            secret", which you can ignore, since your key is in{' '}
            <code>.env</code>.) If a line shows ❌, note its name and see <strong>Troubleshooting</strong> at the end.
          </p>
        </Note>
        <p>Now start the first version of the agent:</p>
        <CodeCard code={devModule1} lang='bash' file='Terminal 1' />
        <p>
          This starts two programs: the agent's backend (the part that does the
          work behind the web page) on port 8000 and the web app on port 5173. A <strong>port</strong> is a numbered door on a
          computer. When you see <em>Ready: http://localhost:5173 (module 1)</em>, open{' '}
          <code>http://localhost:5173</code> in your browser. Here,{' '}
          <code>localhost</code> means your own computer.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='tour' className='sub-heading'>
          A tour of the app
        </h3>
        <p>
          The same web app serves every module. It looks busy, but there are
          only a few parts to know.
        </p>
        <Figure
          src={appImg}
          width={1600}
          height={1000}
          alt='The SupportBot app with a chat panel on the left, a memory graph panel on the right, an execution evidence panel below it, a row of controls along the top and an Evaluation lab button at the top right.'
          caption='The app with a graph from module 4 in the Memory Graph panel. At module 1, that panel is empty.'
        />
        <ul className='bullet-list'>
          <li>
            <strong>Chat</strong> (left) is where you talk to SupportBot. The
            badge at the top shows which module is running.
          </li>
          <li>
            <strong>Memory Graph</strong> (top right) draws the stored memory.
            The first dropdown chooses what to show, and the second chooses a
            memory layer. Click a node to read its properties.
          </li>
          <li>
            <strong>Execution Evidence</strong> (bottom right) shows what
            happened on each turn: tools called, memory retrieved and the SQL that
            ran. SQL (Structured Query Language) is the standard language for
            asking questions of a table-based database.
          </li>
          <li>
            <strong>Customer</strong>, <strong>Billing case</strong> and{' '}
            <strong>Authorize selected refund for this message</strong> (top
            row) are safety controls, which we'll use for refunds.
          </li>
          <li>
            <strong>Evaluation lab</strong> (top right) runs the scorecard in
            the browser.
          </li>
        </ul>
        <Figure
          src={twoStoresImg}
          alt='SQLite, the authority holding accounts, catalog, policy and refund writes, connects through business tools to SupportBot, which reads and writes memory in Neo4j, holding messages, entities and traces.'
          caption='The most important picture in the tutorial: the current policy in SQLite governs actions, and retrieved memory is evidence. (Slide from the workshop.)'
        />
        <p>
          Behind the app sit two databases with two different jobs.{' '}
          <strong>SQLite</strong>, a small database in a single file, stands in
          for the company's real systems: accounts, products and policies.{' '}
          <strong>Neo4j</strong> holds what the agent learned. Hold on to this
          boundary, because it's a safety rule: if memory says Maya's refund
          limit is $250 but the live policy says $150, the live policy wins.
          Memory is evidence and never permission.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='rhythm' className='sub-heading'>
          How each module works
        </h3>
        <p>
          Every <code>module_N</code> folder is a complete copy of the agent at
          that stage, and you'll repeat the same rhythm in each one. Once you
          have the rhythm, the rest of the tutorial is just new ideas on a
          familiar routine.
        </p>
        <Steps>
          <li>
            <strong>Switch.</strong> In Terminal 1, press Ctrl+C, run{' '}
            <code>make dev MODULE=N</code>, wait for <em>Ready</em>, reload the
            browser and check the <strong>Module N</strong> badge.
          </li>
          <li>
            <strong>Try it.</strong> Chat in the browser. Open a second terminal
            (in VS Code, the <strong>+</strong> in the terminal panel) for the module's
            commands, and leave Terminal 1 running.
          </li>
          <li>
            <strong>Inspect.</strong> Terminal scenarios don't appear in the
            browser chat. To see one, click <strong>Refresh graph</strong> and
            pick it from the first dropdown. <strong>Saved replay</strong> shows
            what happened, and <strong>Live memory</strong> shows the nodes it
            wrote to Neo4j.
          </li>
          <li>
            <strong>Measure.</strong> Run the eval.
          </li>
          <li>
            <strong>Read the code (optional).</strong> Start at{' '}
            <code>module_N/app/agent.py</code>, then compare it with the previous
            module.
          </li>
        </Steps>
      </section>

      <section className='article-panel'>
        <h3 id='break' className='sub-heading'>
          Taking a break
        </h3>
        <p>
          The whole tutorial runs about 2.5 hours, and you don't have to do it in
          one sitting. Your memory graph lives in Aura, so it's still there when
          you come back, and your code and <code>.env</code> stay on your computer.
          To pause, press <strong>Ctrl+C</strong> in Terminal 1. To come back:
        </p>
        <Steps>
          <li>
            Open the <code>road-to-agent-memory</code> folder in your editor and
            open a terminal.
          </li>
          <li>
            In the{' '}
            <ExternalLink href='https://console.neo4j.io/'>Aura console</ExternalLink>
            , resume your instance if it has paused.
          </li>
          <li>
            Run <code>make dev MODULE=N</code> with the module you're on, and open{' '}
            <code>http://localhost:5173</code>.
          </li>
        </Steps>
        <Note title='Two habits that save confusion'>
          <p>
            <strong>Run commands one line at a time.</strong> When a box shows
            several, paste the first and wait for the terminal to finish before
            you paste the next. Some take a minute or more.
          </p>
          <p>
            <strong>Don't expect replies to match word for word.</strong> AI models
            phrase things differently each time. What should match is the facts and
            the tools listed under <strong>Execution Evidence</strong>.
          </p>
        </Note>
      </section>

      {/* =====================================================================
          MODULE 1
         ===================================================================== */}
      <PartBanner id='module-1' title='Module 1: The Stateless Agent'>
        Before we fix the problem, we need to see it. This agent has tools and no
        memory.
      </PartBanner>

      <section className='article-panel'>
        <h3 id='m1-run' className='sub-heading'>
          Run it
        </h3>
        <p>
          Your app should already show the <strong>Module 1</strong> badge. Send
          these two messages, one at a time:
        </p>
        <CodeCard
          lang='chat'
          file='Message 1'
          code='Hi, Maya Chen here (maya.chen@northwind.example). Look up my Acme Cloud account.'
        />
        <CodeCard
          lang='chat'
          file='Message 2'
          code='What email did I just give you? Do not look it up; say unknown if it is absent.'
        />
        <Note title='What you should see'>
          <p>
            The first reply finds Northwind Robotics, the Pro plan and a $250
            refund limit, and <strong>Execution Evidence</strong> shows{' '}
            <code>lookup_account</code> with the SQL it ran. The second reply
            says the email is unknown. The graph panel says{' '}
            <em>Module 1 is stateless. It does not create memory.</em>
          </p>
        </Note>
        <p>
          The email is right there on your screen, yet the agent can't see it.
          The chat window is a picture for you, and it isn't what gets sent to
          the model. In the slide's phrase, the visible chat isn't the model's
          context. The first answer was only possible because the message
          contained the email, and a tool could use it. That's lookup, and it
          isn't memory.
        </p>
        <Figure
          src={statelessImg}
          alt='Turn 1 is self-contained because the email is supplied and tools can answer. Turn 2 asks what email was given, but no message history is supplied. Visible chat does not equal model context.'
          caption='Nothing carries over from turn 1 to turn 2 unless the application supplies it. (Slide from the workshop.)'
        />
        <p>
          Now measure it. Open a second terminal and run the scripted version of
          that chat, followed by the eval:
        </p>
        <CodeCard code={m1Terminal2} lang='bash' file='Terminal 2' />
        <Note title='What you should see'>
          <p>
            The eval scores <strong>0/4</strong>. To view the scenario, click{' '}
            <strong>Refresh graph</strong> and choose{' '}
            <strong>Saved replay · s1-baseline</strong>. You can also open{' '}
            <strong>Evaluation lab</strong> to see the same scorecard in the
            browser.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='m1-code' className='sub-heading'>
          Read the code (optional)
        </h3>
        <OptionalCode>
          each turn sends the model the new message and nothing else, which is why
          it forgets.
        </OptionalCode>
        <Note title='A 30-second guide to reading Python'>
          <p>
            You only need to recognize a few things. A line starting with{' '}
            <code>#</code> is a comment for humans, and the repo's comments are
            written for you. <code>def</code> defines a function, a named set of
            steps. <code>await</code> means "wait for this slow step to finish",
            such as a call to the model. And <code>f"...{'{'}name{'}'}"</code> is
            text with a value filled in. Read the comments and the names first, and
            let the rest wash over you.
          </p>
        </Note>
        <p>
          Open <code>module_1/app/agent.py</code> from the file list. Most of it
          is plumbing, and two moments matter. First, the agent is built from a
          model, some tools and written instructions. Second, each turn calls{' '}
          <code>agent.run</code> with the new message and nothing else.
        </p>
        <CodeCard code={m1Agent} file='module_1/app/agent.py' />
        <p>
          That last line is the whole problem, and the repo's comment says so.
          Now open <code>module_1/app/tools.py</code>, where each tool is a
          Python function that runs a SQL query. Look at how{' '}
          <code>issue_refund</code> is registered:
        </p>
        <CodeCard code={m1Tool} file='module_1/app/tools.py' />
        <p>
          <code>prepare_refund</code> runs before the model is offered the tool.
          Unless a customer and a billing case are selected and this message is
          authorized, the model isn't even told the refund tool exists. In
          practice, no clever wording in a chat message can make it issue a
          refund. <code>guardrails.py</code> adds more checks, and it's the same
          in every module, so you can skip it when comparing them.
        </p>
      </section>

      <section className='article-panel'>
        <Checkpoint next='module 2' minutes={20} />
      </section>

      {/* =====================================================================
          MODULE 2
         ===================================================================== */}
      <PartBanner id='module-2' title='Module 2: Short-Term Memory'>
        Now the agent saves every message to Neo4j and gets the relevant ones
        back before it replies. It remembers what was said.
      </PartBanner>

      <section className='article-panel'>
        <h3 id='m2-idea' className='sub-heading'>
          The idea
        </h3>
        <p>
          Saving messages is the easy half. The harder question is what to send
          back to the model. You can't always send everything, because a long
          conversation gets expensive and may not fit. If a chat reached 500
          messages at around 50 tokens each (a token is roughly a word
          fragment, and it's how models are billed), every single reply would
          carry 25,000 tokens of history. The space a model can read at once is
          called its <strong>context window</strong>, and it's the desk the
          model works on. So this module keeps the desk tidy with two kinds of
          retrieval:
        </p>
        <ul className='bullet-list'>
          <li>
            <strong>Recent history:</strong> the newest 10 messages of this
            conversation, passed to the model as real prior turns.
          </li>
          <li>
            <strong>Semantic search:</strong> up to 5 earlier user messages from
            any conversation that mean something similar to the new one.
          </li>
        </ul>
        <p>
          Semantic search is what lets the agent recall something when the words
          don't match. It relies on an{' '}
          <strong>embedding</strong>, a list of numbers that
          captures the meaning of a text. Imagine a map where each message is a
          pin, and messages about similar things land close together. "I was
          double-charged" and "you billed me twice" share almost no words, but
          their pins sit near each other. Finding related messages then means
          measuring the distance between pins, and that measure is called{' '}
          <strong>cosine similarity</strong>.
        </p>
        <Figure
          src={contextAssemblyImg}
          alt='Each turn runs left to right: write the user message with add_message, retrieve recent history and semantic evidence, run the agent, then persist the assistant reply with add_message.'
          caption='One turn in module 2: save, retrieve, answer, save. (Slide from the workshop.)'
        />
      </section>

      <section className='article-panel'>
        <h3 id='m2-run' className='sub-heading'>
          Run it
        </h3>
        <p>
          Click into Terminal 1, press <strong>Ctrl+C</strong> to stop the running
          app, then start module 2:
        </p>
        <CodeCard code={devModule2} lang='bash' file='Terminal 1' />
        <p>
          Wait for <em>Ready</em>, reload the browser and check for the{' '}
          <strong>Module 2</strong> badge. (A "connection refused" message just
          means you reloaded too early. Wait a few seconds and reload again.)
          Then send:
        </p>
        <CodeCard
          lang='chat'
          file='Message 1'
          code='Remember that I am Maya Chen, maya.chen@northwind.example, at Northwind Robotics. My ticket phrase is violet comet.'
        />
        <CodeCard
          lang='chat'
          file='Message 2'
          code='What was the exact ticket phrase I shared earlier in this conversation?'
        />
        <p>
          It should answer "violet comet". Now for the real test: click{' '}
          <strong>New conversation</strong> and ask from a blank chat.
        </p>
        <CodeCard
          lang='chat'
          file='Message 3, in the new conversation'
          code='Which ticket phrase did Maya Chen give us? Cite the retrieved message ID.'
        />
        <Note title='What you should see'>
          <p>
            It finds the phrase again. In <strong>Execution Evidence</strong>,
            expand <strong>Retrieved evidence and memory writes</strong>. In the
            first conversation, you should see both{' '}
            <code>recent_conversation</code> and <code>semantic_message</code>.
            In the new conversation there's no recent history, so only{' '}
            <code>semantic_message</code> can have found it.
          </p>
        </Note>
        <p>
          In the graph, a <code>Conversation</code> node connects to each{' '}
          <code>Message</code> through <code>HAS_MESSAGE</code>, and{' '}
          <code>NEXT_MESSAGE</code> arrows chain them in order. Choose{' '}
          <strong>All stored memory</strong> if you want to see both
          conversations together. Now run the scenarios and the eval in Terminal
          2. <code>s2-return</code> recalls a phrase across conversations, and{' '}
          <code>s2-restart</code> proves that it survives restarting the program
          by using two separate processes (a process is one running copy of a
          program). Expect each to take a minute or two.
        </p>
        <CodeCard code={m2Terminal2} lang='bash' file='Terminal 2' />
        <Note title='What you should see'>
          <p>
            The eval scores <strong>2/4</strong>, because both questions about
            what was said now pass. The signup date and the refusal quote still
            fail, since nobody has told the agent those things. Open{' '}
            <strong>Saved replay</strong> for <code>s2-restart</code> and compare
            its two process IDs: different programs, one shared memory.
          </p>
        </Note>
        <Figure
          src={messageChainImg}
          alt='A Conversation node connected by four HAS_MESSAGE relationships to Messages 1 to 4, alternating user and assistant, which are chained by NEXT_MESSAGE. Each message has id, role, content, timestamp and a hidden embedding.'
          caption='What you just built. Each message stores its role, content, timestamp and embedding. (Slide from the workshop.)'
        />
        <p>
          You can also look at the data in the database itself. In the Aura
          console, open your instance's <strong>Query</strong> tool, connect if
          asked, and paste this:
        </p>
        <CodeCard code={m2Query} lang='cypher' file='Aura Query tool' />
        <p>
          You'll see your messages, along with some whose conversation names
          begin with <code>replay-</code> or <code>eval-</code>. Those are
          written by scenarios and evals, and the prefix, called a{' '}
          <strong>namespace</strong>, keeps each run's memory separate in one
          graph.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='m2-code' className='sub-heading'>
          Read the code (optional)
        </h3>
        <OptionalCode>
          the app now saves each message, fetches the relevant ones and hands them
          to the model. That's the whole trick behind "remembering".
        </OptionalCode>
        <p>
          Here's the most useful command in the tutorial. It shows exactly what
          changed between two stages:
        </p>
        <CodeCard code={diff12} lang='bash' file='Terminal 2' />
        <p>
          This prints around 200 lines, so scroll up to read it. To see just the
          main file, use this shorter version instead:
        </p>
        <CodeCard code={diffOneFile} lang='bash' file='Terminal 2' />
        <p>
          Don't let the symbols put you off. A line starting with <code>-</code>{' '}
          was removed, a line starting with <code>+</code> was added, and anything
          else is unchanged and only there for context. A line saying{' '}
          <em>Only in module_2/app: memory.py</em> means the whole file is new.
          Here's the heart of this diff, tidied up, showing the model call before
          and after:
        </p>
        <CodeCard code={diffSample} lang='diff' file='What changed in agent.py' />
        <p>
          Three things stand out in the full output. First,{' '}
          <code>memory.py</code> configures the memory package:
        </p>
        <CodeCard code={m2Settings} file='module_2/app/memory.py' />
        <p>
          <code>backend="bolt"</code> means "talk directly to my own Neo4j
          database" (Bolt is Neo4j's connection protocol). The two model lines
          name the chat and embedding models, and{' '}
          <code>"extractor_type": "none"</code> keeps this module about messages
          only. Second, <code>agent.py</code> wraps the model call in four
          numbered steps. It's worth reading these comments slowly, since every
          later module grows from this skeleton:
        </p>
        <CodeCard code={m2Turn} file='module_2/app/agent.py' />
        <p>
          Compare step 3 with module 1: the only change to the call is{' '}
          <code>message_history</code>, plus some extra instructions. That one
          argument is why the agent appears to remember. Third,{' '}
          <code>context.py</code> holds the retrieval settings and queries:
        </p>
        <CodeCard code={m2Limits} file='module_2/app/context.py' />
        <CodeCard
          code={m2Recent}
          lang='cypher'
          file='module_2/app/context.py'
        />
        <p>
          Read that Cypher as a sentence: find this conversation's messages,
          skip the one we just saved, and return the newest ones. A real product
          would need one more thing here. Semantic search in this workshop
          covers everyone in the namespace, so in production you'd limit it to
          the customer's own memory.
        </p>
      </section>

      <section className='article-panel'>
        <Checkpoint next='module 3' minutes={40} />
      </section>

      {/* =====================================================================
          MODULE 3
         ===================================================================== */}
      <PartBanner id='module-3' title='Module 3: Long-Term Memory'>
        So far, the agent has transcripts. Now it builds knowledge from them:
        who Maya is, what she uses and what she prefers.
      </PartBanner>

      <section className='article-panel'>
        <h3 id='m3-idea' className='sub-heading'>
          Entities and ontologies
        </h3>
        <p>
          Think of the difference between a stack of meeting notes and an address
          book. Short-term memory is the stack: everything's in there, but you
          have to dig. Long-term memory is the address book. Pulling it out of
          the notes is called <strong>entity extraction</strong>: finding the
          people, companies and products a message mentions (the entities) and
          storing each as a node, linked back to the message by a{' '}
          <code>MENTIONS</code> relationship.
        </p>
        <p>
          But what should count as an entity? The package's default answer is a
          general model called <strong>POLE+O</strong>: Person, Organization,
          Location, Event and Object. It's a good starting point, and its catch
          is that those five types cover nearly everything. Will Lyon's advice in
          the workshop was blunt: "You don't necessarily want to remember
          everything." A support agent needs to know that a person is a{' '}
          <em>customer</em> and that a problem is an <em>incident</em>.
        </p>
        <p>
          So we write an <strong>ontology</strong>: a short file (in YAML, a
          plain-text settings format) naming the kinds
          of things that matter to this business and how they connect. The model
          reads it as instructions during extraction, and the package then
          validates the result. The descriptions also say what a type is{' '}
          <em>not</em>, which is what stops one label from absorbing everything.
        </p>
        <CodeCard
          code={m3Ontology}
          lang='yaml'
          file='module_3/ontology/acme_cloud.yaml'
        />
        <Figure
          src={ontologyCompareImg}
          alt='The default POLE+O side shows generic Person, Org and Object nodes. The Acme Cloud side shows a Customer that SUBSCRIBES_TO a Plan and REPORTED an Incident, which AFFECTS a Product.'
          caption='The same world, modelled for anyone (left) and for this business (right). (Slide from the workshop.)'
        />
        <p>
          The <code>aliases</code> line solves another problem: "Maya", "Maya C."
          and "Maya Chen" are one person. Recognizing that different mentions
          refer to the same thing, and keeping one node for them, is called{' '}
          <strong>entity resolution</strong>. Without it, the graph would slowly
          fill with near-duplicates.
        </p>
        <Note title='Which model does the extracting?'>
          <p>
            This workshop sends each message to the LLM, which is accurate but
            relatively slow and expensive. The package also offers a staged
            pipeline: spaCy, a fast statistical language library, goes first,
            then GLiNER, a small model that needs no special hardware and accepts
            your ontology, with the LLM kept for hard cases. The workshop skips
            those because they use more memory and processing power.
          </p>
        </Note>
        <Figure
          src={ontologyExtractionImg}
          alt='An ontology YAML file feeds a prompt to the LLM extractor, which validates its output and produces a Customer node, Maya Chen, and a Product node, Acme Cloud Compute.'
          caption='The ontology guides the extractor, but actual results still vary with what the model returns. (Slide from the workshop.)'
        />
      </section>

      <section className='article-panel'>
        <h3 id='m3-hydration' className='sub-heading'>
          Hydration: where facts really come from
        </h3>
        <p>
          Extraction can tell us that Maya exists. It shouldn't be trusted to say
          what plan she's on. Models make things up, and people misremember: if
          Maya types "I'm on Enterprise", that doesn't make it so. So once an
          entity is extracted, the app looks it up in the system of record and
          copies the real values onto the node. This is called{' '}
          <strong>hydration</strong>, like adding water to something dried out.
        </p>
        <p>
          In other words, the model supplies the structure and SQL supplies the
          facts. Each hydrated node carries a <code>hydrated_from</code> marker,
          such as <code>sqlite:customers</code>, recording where its facts came
          from. If a name doesn't match exactly one known record, or the type is
          wrong, the app adds nothing rather than guess.
        </p>
        <Figure
          src={hydrationImg}
          alt='The LLM supplies types and relationships to a Customer node, and SQLite supplies authoritative fields: email, plan, signup date and hydrated_from. An optional Wikimedia lab adds an Organization description to a replay only.'
          caption='Two sources for one node: the model finds the entity, and SQL grounds it. (Slide from the workshop.)'
        />
      </section>

      <section className='article-panel'>
        <h3 id='m3-run' className='sub-heading'>
          Run it
        </h3>
        <p>
          In Terminal 1, press <strong>Ctrl+C</strong> to stop the running app and
          run the command below. Wait for <em>Ready</em>, reload the browser and
          check the <strong>Module 3</strong> badge.
        </p>
        <CodeCard code={devModule3} lang='bash' file='Terminal 1' />
        <p>
          <strong>First, see an extraction.</strong> Click{' '}
          <strong>New conversation</strong>, keep the graph on{' '}
          <strong>Current conversation</strong>, and send:
        </p>
        <CodeCard
          lang='chat'
          code="I'm Maya Chen from Northwind Robotics."
        />
        <Note title='What you should see'>
          <p>
            The graph grows yellow long-term nodes. Click your message, follow a{' '}
            <code>MENTIONS</code> arrow to the customer and read its properties:
            email, plan and <code>signup_date</code>. You typed none of those,
            so they came from SQL. Extraction varies between runs, so if Maya
            doesn't appear as a customer, look at what was extracted instead.
          </p>
        </Note>
        <p>
          <strong>Next, save a preference.</strong> In the top row, set{' '}
          <strong>Customer</strong> to Maya Chen, because a preference must
          belong to a selected person. Send the first message below, then look
          for <code>save_preference</code> in the evidence.
        </p>
        <CodeCard
          lang='chat'
          file='Message 1'
          code='Please save this contact preference: email me before calling.'
        />
        <p>
          Click <strong>New conversation</strong>, select Maya Chen again and
          send the second message:
        </p>
        <CodeCard
          lang='chat'
          file='Message 2'
          code='Which contact preference is on file for me?'
        />
        <Note title='What you should see'>
          <p>
            The agent reports "email me before calling" in a brand-new
            conversation. In the graph, look for{' '}
            <code>User &rarr; HAS_PREFERENCE &rarr; Preference</code>.
          </p>
        </Note>
        <p>
          <strong>Then, compare the ontologies.</strong> These two commands push
          one fixed transcript through each ontology, so the difference comes
          from the ontology and not from the input.
        </p>
        <CodeCard code={m3Terminal2} lang='bash' file='Terminal 2' />
        <Note title='What you should see'>
          <p>
            Click <strong>Refresh graph</strong> and compare the two{' '}
            <strong>Saved replay</strong> views. In the rehearsal, the default
            ontology found six entities and two relationships, and the Acme
            ontology found seven entities and five relationships, including
            Maya's subscription to Pro. The transcript hash on each view, a short
            fingerprint of the text, confirms that the inputs match. The eval now scores{' '}
            <strong>3/4</strong>: the signup date, never spoken in the eval's
            conversation, came from a grounded entity.
          </p>
        </Note>
        <p>
          To see the same thing in the database, run this in the Aura{' '}
          <strong>Query</strong> tool:
        </p>
        <CodeCard code={m3Query} lang='cypher' file='Aura Query tool' />
      </section>

      <section className='article-panel'>
        <h3 id='m3-code' className='sub-heading'>
          Read the code (optional)
        </h3>
        <OptionalCode>
          the app pulls entities out of each message, fills in their facts from the
          business database, and gives the model tools for searching memory and
          saving preferences.
        </OptionalCode>
        <CodeCard code={diff23} lang='bash' file='Terminal 2' />
        <p>
          This diff is larger, with two new files, but it comes down to three
          moves. <strong>Turn on extraction</strong> by changing a setting and
          loading the ontology. Compare this with the{' '}
          <code>"none"</code> from module 2:
        </p>
        <CodeCard code={m3Settings} file='module_3/app/memory.py' />
        <p>
          <strong>Hydrate</strong> after each message is saved. Two writes are
          needed because <code>add_entity</code> refreshes the description but
          not the attributes of an existing node, so a small helper called{' '}
          <code>PropertyWriter</code> sets those directly. (The word "upsert" in
          the comment means "create it, or update it if it already exists".) The
          note at the top of that file explains why, and it's a good example of a
          workaround that's been written down.
        </p>
        <CodeCard code={m3Hydrate} file='module_3/app/hydrate.py' />
        <p>
          <strong>Give the agent memory tools.</strong> Until now, memory arrived
          before each turn whether the model wanted it or not. This module also
          adds three tools the model can call itself mid-turn:{' '}
          <code>search_memory</code>, <code>save_preference</code> and{' '}
          <code>recall_preferences</code>. Notice the check at the start of the
          preference tool: with no customer selected, it refuses.
        </p>
        <CodeCard code={m3Tools} file='module_3/app/memory_tools.py' />
        <p>
          So memory now reaches the agent by two routes: some is placed in its
          context up front, and some it goes looking for. In the database,
          extracted connections are stored as a generic{' '}
          <code>RELATED_TO</code> relationship with a <code>type</code> property,
          such as <code>WORKS_AT</code>, which is why the Cypher example back in
          Part 1 was only an illustration.
        </p>
      </section>

      <section className='article-panel'>
        <Checkpoint next='module 4' minutes={30} />
      </section>

      {/* =====================================================================
          MODULE 4
         ===================================================================== */}
      <PartBanner id='module-4' title='Module 4: Reasoning Memory'>
        The agent knows what was said and who it's about. Now it records what it
        did, so we can ask why, and so it can learn from similar tasks.
      </PartBanner>

      <section className='article-panel'>
        <h3 id='m4-idea' className='sub-heading'>
          Anatomy of a trace
        </h3>
        <p>
          Here's a pair of requests that differ by one detail. Maya asks for a
          $49 refund for a duplicate charge. Then she asks for $400 for unused
          capacity. Her Pro plan's limit is $250, so the first should be issued
          and the second refused. The same customer, the same words and two
          different answers. A week later, a manager asks why the $400 request
          was turned down. Nothing in the first three modules can answer that,
          because nothing recorded the decision.
        </p>
        <p>
          A <strong>trace</strong> is that record, like the black box on an
          aircraft or a receipt that lists every step. Each turn opens a{' '}
          <code>ReasoningTrace</code> connected to the message that started it.
          Every tool call adds a <code>ReasoningStep</code> and a{' '}
          <code>ToolCall</code> holding its inputs, outputs and the SQL it ran. A{' '}
          <code>TOUCHED</code> relationship links the step to the customer and
          plan involved, and the trace finishes with its outcome.
        </p>
        <Figure
          src={traceImg}
          alt='A Reasoning Trace connects through HAS_STEP to a Reasoning Step, through USES_TOOL to a ToolCall and through INSTANCE_OF to a Tool. The trace connects through INITIATED_BY to a Message, and the step connects through TOUCHED to a Customer or Plan.'
          caption='Follow the arrows to answer "why did you issue that refund?" (Slide from the workshop.)'
        />
        <p>
          What makes this memory, and not just logging, is that the agent can
          read it. Before answering, it embeds the new task, searches past
          completed traces for up to three similar ones, and receives them as
          examples: here's what was tried, and how it ended. Refusals count too,
          since a declined case is often the most instructive example. The
          instructions are careful to label these "not current policy", so the
          agent still has to check the live rules.
        </p>
        <Figure
          src={similarTasksImg}
          alt='A new task is embedded and scoped by namespace to completed traces. Up to three matches at similarity 0.45 or above, both successes and declines, prime the agent run, which reads actual steps and rechecks current SQL policy.'
          caption='Similar-task retrieval. Past runs are examples, and the live policy still decides. (Slide from the workshop.)'
        />
      </section>

      <section className='article-panel'>
        <h3 id='m4-run' className='sub-heading'>
          Run it
        </h3>
        <p>
          In Terminal 1, press <strong>Ctrl+C</strong> to stop the running app and
          run the command below. Wait for <em>Ready</em>, reload the browser and
          check the <strong>Module 4</strong> badge.
        </p>
        <CodeCard code={devModule4} lang='bash' file='Terminal 1' />
        <p>
          Then, in Terminal 2, run the commands below. The first two are Maya's
          pair of requests, at over a minute each. The third, which we'll return
          to shortly, takes two to three minutes. Each scenario prints its
          dialogue and the tools it called.
        </p>
        <CodeCard code={m4Terminal2} lang='bash' file='Terminal 2' />
        <Note title='What you should see'>
          <p>
            Maya's $49 refund is issued. Her $400 request is rejected by the
            server, with no refund written. The eval scores{' '}
            <strong>4/4</strong>, including the exact refusal quote, which is
            cited from a trace.
          </p>
        </Note>
        <p>
          <strong>Inspect the trace.</strong> Click{' '}
          <strong>Refresh graph</strong>, pick a <strong>Saved replay</strong>{' '}
          for <code>s4-refund</code> and read the SQL and the receipt, which is the
          record of what the tool actually did. Then choose
          its <strong>Live memory</strong> view and set the second dropdown to{' '}
          <strong>reasoning</strong>. Follow the arrows from trace to step to
          tool call, and click each one to read it. You can also get this as a
          table in the Aura <strong>Query</strong> tool:
        </p>
        <CodeCard code={m4Query} lang='cypher' file='Aura Query tool' />
        <p>
          <strong>Try the refund safety yourself.</strong> Maya's $49 charge is
          now refunded, so we'll use another sample customer. Click{' '}
          <strong>New conversation</strong>, set <strong>Billing case</strong> to
          Dana's $129 duplicate Storage charge (this selects Dana as the
          customer too), tick{' '}
          <strong>Authorize selected refund for this message</strong> and send:
        </p>
        <CodeCard
          lang='chat'
          file='Message 1'
          code='Please refund the duplicate $129 Storage charge.'
        />
        <p>
          The checkbox clears after each message, because authorization lasts
          for one turn. Tick it again and repeat the request, or ask without
          ticking it:
        </p>
        <CodeCard
          lang='chat'
          file='Message 2'
          code='Please refund the duplicate $129 Storage charge again.'
        />
        <Note title='What you should see'>
          <p>
            The first refund is issued once. A repeat, with or without
            authorization, should report the existing refund and not pay twice.
            This changes your local SQLite data, so a second run through this
            step will find the refund already issued. That's the safety working,
            and it isn't a bug.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='m4-code' className='sub-heading'>
          Read the code (optional)
        </h3>
        <OptionalCode>
          the app opens a record before each turn, saves every tool call to it, and
          searches finished records for similar past tasks.
        </OptionalCode>
        <CodeCard code={diff34} lang='bash' file='Terminal 2' />
        <p>
          Look at where the trace opens in <code>agent.py</code>. It's step 0,
          before anything else, so even a turn that crashes gets recorded.
        </p>
        <CodeCard code={m4Open} file='module_4/app/agent.py' />
        <p>
          After the reply, <code>record_execution</code> in{' '}
          <code>reasoning.py</code> saves each tool call as a step. Notice{' '}
          <code>executed_sql</code>: the trace holds what actually ran, which is
          better evidence than what the model said it did.
        </p>
        <CodeCard code={m4Record} file='module_4/app/reasoning.py' />
        <p>
          Retrieval is one Cypher query. The important line is{' '}
          <code>t.completed_at IS NOT NULL</code>. This turn's own trace is
          already open and its task is this exact message, so without that line
          it would always find itself as the best match.
        </p>
        <CodeCard
          code={m4Similar}
          lang='cypher'
          file='module_4/app/reasoning.py'
        />
      </section>

      <section className='article-panel'>
        <h3 id='m4-measure' className='sub-heading'>
          Does recalling past runs actually help?
        </h3>
        <p>
          It's tempting to assume so, and <code>make s4-refund-repeat</code>{' '}
          exists to check. It runs the same ticket twice on identical copies of
          the data, once with reasoning retrieval off and once on. Removing one
          part of a system to measure what it was doing is called{' '}
          <strong>ablation</strong>. Open its <strong>Saved replay</strong> and
          compare the two branches.
        </p>
        <p>
          The honest answer is that it varies. In the repository's rehearsal on
          November 5, retrieval let the agent skip two tool calls, using 2,288
          input tokens in 13.5 seconds compared with 2,546 tokens in 16.6
          seconds. In the rehearsal the day before, retrieval saved one tool call
          but added 647 input tokens and about 1.6 seconds. Those are single
          runs, so neither proves much. Both branches reached the same safe
          outcome each time. I find this more persuasive than a clean win would
          have been: a benefit you have to measure for yourself is one you can
          actually trust. If your run shows no difference, that's a valid result.
        </p>
      </section>

      <section className='article-panel'>
        <Checkpoint next='module 5' minutes={20} />
      </section>

      {/* =====================================================================
          MODULE 5
         ===================================================================== */}
      <PartBanner id='module-5' title='Module 5: Skill Distillation'>
        Memory tells an agent what happened. A skill tells it what to do. Here,
        we turn one agent's experience into something another agent can load.
      </PartBanner>

      <section className='article-panel'>
        <h3 id='m5-idea' className='sub-heading'>
          From memory to skill
        </h3>
        <p>
          Our agent has refunded Maya, but it had to find its way there, and
          another agent would have to find it again. What we want is a written
          procedure, the kind a new hire gets on their first day. An{' '}
          <strong>agent skill</strong> is exactly that: a folder containing a{' '}
          <code>SKILL.md</code> file of instructions written in Markdown (simple
          formatted text), in an open format that many
          agents can read. The agent first sees only each skill's name and
          description, and opens the full instructions when it picks one. This
          is called progressive disclosure, and it means skills don't crowd the
          context window. (To write one by hand, see{' '}
          <Link to='/posts/writing-your-first-skill-md-file'>
            Writing Your First SKILL.md
          </Link>
          .)
        </p>
        <p>
          Hand-written skills have a trade-off: they're easy to create, but
          nothing ties them to reality. When the refund policy changes, a
          paragraph of text doesn't know it's out of date. And an agent has to
          reinterpret that text on every run.
        </p>
        <p>
          <strong>Skill distillation</strong> tackles the first half by building
          the skill from real memory. It reads selected conversations and traces,
          works out the repeatable procedure, and keeps a link from each step
          back to its evidence. To tackle the second half, Neo4j researchers
          Zachary Blumenfeld and Jim Webber proposed modelling a skill as a graph
          of typed steps. Their{' '}
          <ExternalLink href='https://arxiv.org/abs/2606.04781'>
            AIP paper
          </ExternalLink>{' '}
          reports that on 27 SkillsBench tasks, using Claude Sonnet, compiling
          human-written skills this way raised the pass rate from 53% to 67%.
          That's one paper on one benchmark, so treat it as promising.
        </p>
        <Figure
          src={distillationImg}
          alt='Agent memory, made up of conversations, entities and traces, flows through four stages: select scope, distill observed patterns into a procedure, review and package a versioned SKILL.md with provenance, and consume it in a fresh agent with current SQL tools.'
          caption='Distillation keeps the evidence and publishes a reusable skill. (Slide from the workshop.)'
        />
        <p>
          This module uses the <strong>Neo4j Agent Memory Service</strong> (NAMS),
          a free hosted version of the memory system with its own API and an
          MCP server (the Model Context Protocol is a standard way for agents to
          connect to outside tools). Modules 1 to 4 talked directly to your own database. The hosted
          service suits you when you can't run a Python package next to your
          agent, and the package suits you when you want more control. The
          support app keeps using your Aura database, and NAMS holds a separate
          workspace with sample data. The service is an experimental early-access
          project, so if it's unavailable, a fallback lets you finish.
        </p>
        <Note title="Can't get a key, or short on time?">
          <p>
            Skip to <strong>Step 3</strong> and use the fallback commands. They
            use a skill checked into the repo and need no NAMS account. You'll
            miss the provenance steps, but you'll still see a fresh agent load a
            skill.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='m5-key' className='sub-heading'>
          Step 1: Get a key
        </h3>
        <Steps>
          <li>
            Open{' '}
            <ExternalLink href='https://memory.neo4jlabs.com/'>
              memory.neo4jlabs.com
            </ExternalLink>{' '}
            and choose <strong>Sign In</strong>. Use your Neo4j account, or
            choose <strong>Sign up</strong>. Your first login creates a default
            workspace, which is your private area in the service.
          </li>
          <li>
            Go to{' '}
            <ExternalLink href='https://memory.neo4jlabs.com/dashboard/api-keys'>
              Dashboard &rarr; API Keys
            </ExternalLink>{' '}
            and create a workspace-bound <strong>data key</strong>. (Admin keys
            have broader powers than you need. Keys expire after 90 days.)
          </li>
          <li>
            Add it to <code>.env</code> and save, replacing the whole placeholder
            as you did in setup:
          </li>
        </Steps>
        <CodeCard code={m5Env} lang='bash' file='.env' />
        <p>
          In Terminal 1, press <strong>Ctrl+C</strong> and start module 5. Once
          you see <em>Ready</em>, check the hosted service in Terminal 2.
        </p>
        <CodeCard code={devModule5} lang='bash' file='Terminal 1' />
        <CodeCard code={m5Check} lang='bash' file='Terminal 2' />
        <Note title='What you should see'>
          <p>
            The check reports that the workspace is reachable and distillation
            is enabled. It also checks that the workspace's ontology will accept
            the sample data. A custom ontology from another project can reject
            it, so if that happens, create a new workspace and key. If it reports
            that distillation is unavailable, use the fallback in Step 3.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='m5-distill' className='sub-heading'>
          Step 2: Distill
        </h3>
        <p>
          These two commands write to your hosted workspace, so run them once, one
          at a time. The second takes about 1 to 2 minutes.
          The first seeds it with the story so far: five entities (Maya,
          Northwind, Compute, Pro and the refund policy), one four-message
          conversation and two completed $49 refund traces. The second distills
          that conversation into a skill.
        </p>
        <CodeCard code={m5Hosted} lang='bash' file='Terminal 2' />
        <Note title='What you should see'>
          <p>
            A new folder, <code>artifacts/distilled/</code>, containing:
          </p>
          <ul className='bullet-list'>
            <li>
              <code>SKILL.md</code>: the procedure the next agent will read.
            </li>
            <li>
              <code>references/</code>: supporting material.
            </li>
            <li>
              <code>provenance.json</code>: which evidence IDs support each step.
            </li>
            <li>
              <code>skill.json</code>: a local receipt of the skill, version and
              run.
            </li>
          </ul>
        </Note>
        <p>
          The script approves and publishes the result automatically, to keep
          the workshop moving. In real use, this review is a human's job. The
          generated scores for grounding (how much of the procedure has
          evidence) and coverage (how much of the evidence the procedure uses)
          tell you where to look, but they don't prove it's correct. Both seed
          traces are successful $49 refunds, so ask yourself what this skill
          can't know about a refused case.
        </p>
        <Note title='Prefer clicking?'>
          <p>
            In the recorded workshop, the skill was distilled from the hosted
            console: choose a conversation or the whole workspace as the scope,
            and the console generates a procedure to review and download. The
            console is evolving, so the exact screens may differ.
          </p>
        </Note>
      </section>

      <section className='article-panel'>
        <h3 id='m5-compare' className='sub-heading'>
          Step 3: Give it to a fresh agent
        </h3>
        <p>
          Here's the payoff. A brand-new agent, with no memory and no history,
          gets a ticket from another customer: Ravi, who was double-charged $49.
          We run it twice, without the skill and with it, each on a private copy
          of the data.
        </p>
        <CodeCard code={m5Compare} lang='bash' file='Terminal 2' />
        <p>If you don't have a distilled skill, use the checked-in one:</p>
        <CodeCard code={m5Fallback} lang='bash' file='Terminal 2 (fallback)' />
        <Note title='What you should see'>
          <p>
            Each run prints the reply and the tools in order. In the rehearsal,
            every run refunded Ravi. Without a skill, the agent called{' '}
            <code>lookup_account</code> &rarr; <code>issue_refund</code>. With
            one, it called <code>lookup_account</code> &rarr;{' '}
            <code>fetch_policy</code> &rarr; <code>issue_refund</code>. So the
            outcome matched, but the agent with the skill checked the policy
            first. Your run may differ, and a matching pair is a valid result.
          </p>
        </Note>
        <p>
          How does the skill get in? As plain text, added to the agent's
          instructions. If you're curious, open{' '}
          <code>module_5/app/fresh_agent.py</code>:
        </p>
        <CodeCard code={m5Fresh} file='module_5/app/fresh_agent.py' />
        <p>
          That's all there is to it: <code>instructions += skill</code>, with the
          agent's own tools. The skill brings the method, and the receiving agent
          brings its own tools and permissions, so the safety checks from module
          1 still apply. Here's the checked-in version, which is shortened from{' '}
          <code>artifacts/pre-distilled-skill/SKILL.md</code>. Your distilled one
          will be worded differently, since it's generated.
        </p>
        <CodeCard
          code={m5Skill}
          lang='markdown'
          file='artifacts/pre-distilled-skill/SKILL.md'
        />
      </section>

      <section className='article-panel'>
        <h3 id='m5-inspect' className='sub-heading'>
          Step 4: Trace a step back to its evidence
        </h3>
        <p>
          This step needs the hosted route. It's also the part a plain text file
          can't do.
        </p>
        <Steps>
          <li>
            In the Module 5 browser, tick <strong>NAMS</strong> in the graph
            panel.
          </li>
          <li>
            Follow <strong>Skill</strong> &rarr; <code>HAS_VERSION</code> &rarr;{' '}
            <strong>SkillVersion</strong> &rarr; <code>HAS_STEP</code> &rarr;{' '}
            <strong>SkillStep</strong> &rarr; <code>GROUNDED_IN</code> to the
            source evidence.
          </li>
          <li>
            Open <code>artifacts/distilled/SKILL.md</code> and choose one step.
          </li>
          <li>
            Find a <code>groundedIn</code> ID for it in{' '}
            <code>provenance.json</code>, under <code>claims</code> or{' '}
            <code>steps</code>, and compare it with the graph.
          </li>
        </Steps>
        <Figure
          src={skillGraphImg}
          alt='A Skill connects through HAS_VERSION to a Skill Version, through HAS_STEP to a Skill Step, and through GROUNDED_IN to an Entity, Agent step or ToolCall. A version links to its prior version through SUPERSEDES.'
          caption='A skill has versions, a version has steps, and each grounded step links to its evidence. (Slide from the workshop.)'
        />
      </section>

      <section className='article-panel'>
        <h3 id='m5-drift' className='sub-heading'>
          What happens when memory changes?
        </h3>
        <p>
          Because each step points at its evidence, the service can notice when
          that evidence changes. If an entity a skill relies on is deleted or a
          required tool disappears, the skill can be flagged as stale, down to
          the affected steps. Then you distill it again, which creates a new
          version under the same skill. This is called <strong>drift</strong>{' '}
          detection, and it answers the trade-off from earlier: a skill as easy
          as generated text, which knows when it's out of date.
        </p>
        <p>
          There's a limit worth seeing clearly, though. The service watches the
          memory it holds, and it can't see your other systems. If the refund
          limit changes only in SQLite, the hosted skill won't be flagged. That's
          the boundary from the app tour coming back, and it's why the receiving
          agent always checks the live policy.
        </p>
        <Note title='Watch this one, and do not run it'>
          <p>
            The repo has <code>make nams-drift</code>,{' '}
            <code>make policy-change</code> and{' '}
            <code>make nams-redistill</code> for this demonstration, but they're
            meant for instructors using a disposable workspace.{' '}
            <code>nams-drift</code> deletes hosted entities. For this tutorial,
            reading about it is enough.
          </p>
        </Note>
      </section>

      {/* =====================================================================
          FINISHING UP
         ===================================================================== */}
      <PartBanner id='finish' title='Finishing Up'>
        You've taken one agent from forgetting an email address to producing a
        procedure that another agent can use.
      </PartBanner>

      <section className='article-panel'>
        <h3 id='why-graph' className='sub-heading'>
          Why a graph at all?
        </h3>
        <p>
          A viewer asked this at the end of the workshop: why not store memories
          in Postgres, a relational database? The presenter noted that many
          agents start with Markdown files, which are simple formatted text, and that the first reason to
          move to any database is having several agents or users read and write
          at once. The case for a graph specifically was the last module: you can
          build on the memory, tying a skill's steps to the exact evidence
          beneath them and flagging the specific step that goes stale.
        </p>
        <p>
          To be sure, you could model those connections in other databases, and
          the Neo4j documentation itself says that graph storage involves
          trade-offs and doesn't guarantee faster queries. What the graph gives
          you is that the connections are part of the data, so asking "where did
          this come from?" means following arrows. It's fair to say that the
          question of how much that matters for your agent is still one to
          measure and not assume.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='own-agent' className='sub-heading'>
          Bringing memory to your own agent
        </h3>
        <p>
          The workshop ends with a small take-home script that shows the whole
          pattern: open a client, write a message, read it
          back.
        </p>
        <CodeCard code={takeHome} lang='bash' file='Terminal 2' />
        <CodeCard code={mondayPy} file='scripts/monday_memory.py' />
        <p>
          From there, a sensible order is the one you just followed. Start with
          an eval, so you can tell whether anything helps. Add short-term memory.
          Write an ontology for your own domain and ground its entities in your
          real data. Record traces. Only then consider distilling skills. The
          package also has integrations for other agent frameworks, and it's
          pinned here at version 0.8.0. It's a Neo4j Labs project, which means
          it's actively developed but experimental, with no support guarantees,
          so check the release notes before you upgrade.
        </p>
        <p>
          Back to Maya, then. She was charged $49 twice, and in module 1 the bot
          couldn't remember her email from one message to the next. Now it knows
          who she is from a trusted source, remembers how she likes to be
          contacted, can explain any decision it made about her account, and has
          taught the procedure to an agent that has never met her. Whether all
          of that makes an agent better at your problem is the one thing this
          tutorial can't tell you. But you do now have a scorecard.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='troubleshooting' className='sub-heading'>
          Troubleshooting
        </h3>
        <div className='table-wrap'>
          <table>
            <thead>
              <tr>
                <th>What you see</th>
                <th>What to do</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>make check</code> shows ❌ for Neo4j
                </td>
                <td>
                  Check the three <code>NEO4J_</code> values in{' '}
                  <code>.env</code>, and that the instance is running. Free
                  instances pause when idle, so resume it in the Aura console.
                </td>
              </tr>
              <tr>
                <td>
                  <code>make check</code> shows ❌ for OpenAI
                </td>
                <td>
                  Check the key and that your OpenAI account has billing enabled
                  and a small balance.
                </td>
              </tr>
              <tr>
                <td>Chat turns take 20 seconds or more</td>
                <td>
                  Your database may be far from you. Run{' '}
                  <code>make check</code>, which prints the time per query, and
                  consider an instance in a closer region.
                </td>
              </tr>
              <tr>
                <td>
                  <code>make check</code> still fails after you filled in{' '}
                  <code>.env</code>
                </td>
                <td>
                  Check that you saved the file and removed the angle brackets,
                  with no spaces or quotation marks around any value.
                </td>
              </tr>
              <tr>
                <td>"Connection refused" after switching modules</td>
                <td>
                  The backend is still starting. Wait for <em>Ready</em> in
                  Terminal 1, then reload.
                </td>
              </tr>
              <tr>
                <td>The browser shows the wrong module badge</td>
                <td>
                  Check that Terminal 1 is running the module you expect, then
                  reload the page.
                </td>
              </tr>
              <tr>
                <td>A terminal scenario isn't in the chat</td>
                <td>
                  That's by design. Click <strong>Refresh graph</strong> and pick
                  it from the first graph dropdown.
                </td>
              </tr>
              <tr>
                <td>The agent won't issue a refund</td>
                <td>
                  Check that <strong>Billing case</strong> is selected and{' '}
                  <strong>Authorize</strong> is ticked. It resets after each
                  message.
                </td>
              </tr>
              <tr>
                <td>A chat reply doesn't match what's described here</td>
                <td>
                  Replies vary, so check the facts and the tools under{' '}
                  <strong>Execution Evidence</strong>. If they differ too, confirm
                  the module badge, click <strong>New conversation</strong> and try
                  again.
                </td>
              </tr>
              <tr>
                <td>The eval misses a score shown here</td>
                <td>
                  Model replies vary. Open <strong>Evaluation lab</strong>, read
                  the failed question and check whether the answer or the cited
                  source was wrong, then run it again.
                </td>
              </tr>
              <tr>
                <td>
                  <code>make nams-check</code> or <code>nams-seed</code> reports
                  an ontology problem
                </td>
                <td>
                  The workspace has a custom ontology. Create a new workspace and
                  key.
                </td>
              </tr>
              <tr>
                <td>
                  NAMS reports no capacity, or <code>nams-distill</code> fails
                </td>
                <td>
                  Use <code>make s5-fresh-agent WITH_SKILL=fallback</code>. This
                  happened live in the workshop, when new databases ran out of
                  capacity.
                </td>
              </tr>
              <tr>
                <td>"command not found" for git, uv, node or make</td>
                <td>
                  Install that tool using the links in Step 1, then open a new
                  terminal, which picks up the newly installed command.
                </td>
              </tr>
              <tr>
                <td>"No such file" or "No rule to make target"</td>
                <td>
                  You're in the wrong folder. Run <code>cd road-to-agent-memory</code>{' '}
                  from where you cloned it, or open a terminal from that folder in
                  your editor.
                </td>
              </tr>
              <tr>
                <td>
                  <code>make dev</code> says port 5173 or 8000 is already in use
                </td>
                <td>
                  Another program is using it, possibly an earlier run. Press{' '}
                  <strong>Ctrl+C</strong> in any terminal still running the app,
                  or close the other program, then try again.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className='article-panel'>
        <h3 id='commands' className='sub-heading'>
          Command cheat sheet
        </h3>
        <p>
          Run these from the repo's top folder. <code>make help</code> lists
          them all.
        </p>
        <div className='table-wrap'>
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Start the app (Terminal 1)</th>
                <th>Commands (Terminal 2)</th>
                <th>Expected eval</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Setup</td>
                <td>
                  <code>make check</code>
                </td>
                <td>None</td>
                <td>None</td>
              </tr>
              <tr>
                <td>Module 1</td>
                <td>
                  <code>make dev MODULE=1</code>
                </td>
                <td>
                  <code>make s1-baseline</code>
                </td>
                <td>0/4</td>
              </tr>
              <tr>
                <td>Module 2</td>
                <td>
                  <code>make dev MODULE=2</code>
                </td>
                <td>
                  <code>make s2-return</code>, <code>make s2-restart</code>
                </td>
                <td>2/4</td>
              </tr>
              <tr>
                <td>Module 3</td>
                <td>
                  <code>make dev MODULE=3</code>
                </td>
                <td>
                  <code>make s3-default</code>, <code>make s3-ontology</code>
                </td>
                <td>3/4</td>
              </tr>
              <tr>
                <td>Module 4</td>
                <td>
                  <code>make dev MODULE=4</code>
                </td>
                <td>
                  <code>make s4-refund</code>, <code>make s4-fail</code>,{' '}
                  <code>make s4-refund-repeat</code>
                </td>
                <td>4/4</td>
              </tr>
              <tr>
                <td>Module 5</td>
                <td>
                  <code>make dev MODULE=5</code>
                </td>
                <td>
                  <code>make nams-check</code>, <code>make nams-seed</code>,{' '}
                  <code>make nams-distill</code>,{' '}
                  <code>make s5-fresh-agent WITH_SKILL=off</code>, then{' '}
                  <code>WITH_SKILL=on</code> or <code>WITH_SKILL=fallback</code>
                </td>
                <td>None</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          To evaluate any module, run <code>make eval MODULE=N</code>. To see
          what a stage added, run the <code>diff</code> command from that module's
          "Read the code" section. <code>make seed</code> rebuilds the SQLite sample data,
          including refunds. <code>make reset-memory</code> wipes your Neo4j
          memory graph, and you shouldn't need it.
        </p>
      </section>

      <section className='article-panel'>
        <h3 id='cleanup' className='sub-heading'>
          Clean up
        </h3>
        <p>
          Save anything you want to keep first, such as a distilled skill in{' '}
          <code>artifacts/distilled/</code>.
        </p>
        <Steps>
          <li>
            <strong>The code:</strong> delete the{' '}
            <code>road-to-agent-memory</code> folder. This also removes your{' '}
            <code>.env</code> file and the local sample data.
          </li>
          <li>
            <strong>AuraDB:</strong> delete or pause your instance at{' '}
            <ExternalLink href='https://console.neo4j.io/'>
              console.neo4j.io
            </ExternalLink>
            .
          </li>
          <li>
            <strong>NAMS:</strong> revoke your key in the{' '}
            <ExternalLink href='https://memory.neo4jlabs.com/dashboard/api-keys'>
              API Keys dashboard
            </ExternalLink>
            .
          </li>
          <li>
            <strong>OpenAI:</strong> delete the key if you made one just for
            this.
          </li>
        </Steps>
      </section>

      <section className='article-panel'>
        <h3 id='further-reading' className='sub-heading'>
          Further reading
        </h3>
        <p>
          <strong>Start here</strong>
        </p>
        <ul className='bullet-list'>
          <li>
            <ExternalLink href='https://github.com/johnymontana/road-to-agent-memory'>
              Workshop repository
            </ExternalLink>
            , including question-and-answer guides in{' '}
            <code>docs/modules/</code> and a <code>docs/glossary.md</code>
          </li>
          <li style={{ listStyle: 'none', marginLeft: '-1.65rem' }}>
            <YoutubeLink href='https://youtu.be/ybekhrF4HUY'>
              The recorded workshop
            </YoutubeLink>{' '}
            with Will Lyon
          </li>
          <li>
            <ExternalLink href='https://graphacademy.neo4j.com/courses/workshop-agent-memory'>
              GraphAcademy: Neo4j Agent Memory Workshop
            </ExternalLink>
            , a longer guided course
          </li>
        </ul>
        <p>
          <strong>Reference</strong>
        </p>
        <ul className='bullet-list'>
          <li>
            <ExternalLink href='https://neo4j.com/labs/agent-memory/'>
              Neo4j Agent Memory documentation
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://neo4j.com/labs/agent-memory/explanation/memory-types/'>
              The three memory types
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://neo4j.com/labs/agent-memory/explanation/graph-architecture/'>
              Why graph memory?
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://github.com/neo4j-labs/agent-memory'>
              neo4j-agent-memory on GitHub
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://memory.neo4jlabs.com/'>
              Neo4j Agent Memory Service
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://arxiv.org/abs/2606.04781'>
              AIP: A Graph Representation for Learning and Governing Agent Skills
            </ExternalLink>
          </li>
        </ul>
        <p>
          <strong>Related posts on this site</strong>
        </p>
        <ul className='bullet-list'>
          <li>
            <Link to='/posts/neo4j-intro-workshop'>Neo4j Intro Workshop</Link>
          </li>
          <li>
            <Link to='/posts/semantic-model-vs-ontology-vs-knowledge-graph'>
              Semantic Model vs Ontology vs Knowledge Graph
            </Link>
          </li>
          <li>
            <Link to='/posts/context-engineering'>Context Engineering</Link>
          </li>
          <li>
            <Link to='/posts/traces'>Traces: The New Type of Data for AI Agents</Link>
          </li>
          <li>
            <Link to='/posts/benchmarking-rag-systems'>
              Benchmarking RAG Systems
            </Link>
          </li>
        </ul>
      </section>

      <style>{`
        /* Lets the rail stretch the full height of the article body */
        .article-content:has(> .toc-rail) {
          position: relative;
        }

        .article-content h2[id],
        .article-content h3[id] {
          scroll-margin-top: 96px;
        }

        /* Wide screens: a plain list in the left gutter that sticks while you read */
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

        /* Prefixed to outrank the global .article-content list spacing */
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

        /* Narrow screens: the same list, collapsed above the article */
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

        .article-panel h2.sub-heading,
        .article-panel h3.sub-heading,
        .article-panel .sub-heading,
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

        .am-banner {
          background: color-mix(in srgb, var(--accent) 7%, var(--surface));
          margin-bottom: 2rem;
          padding: 1.25rem 1.5rem;
          border-radius: 8px;
        }

        .am-credit {
          margin: 1rem 0 0 0;
          font-size: 0.9rem;
          color: var(--text-soft);
        }

        .am-part {
          background: color-mix(in srgb, var(--accent) 8%, var(--surface));
          margin: 2.5rem 0 1.5rem 0;
          padding: 1.25rem 1.5rem;
          border-radius: 8px;
        }

        .article-panel h2.am-part__title {
          font-size: 1.4rem;
          margin: 0 0 0.5rem 0;
          background: transparent;
          border: none;
          padding: 0;
        }

        .am-part__lead {
          margin: 0;
          color: var(--text-soft);
        }

        .am-figure {
          margin: 1.5rem 0;
        }

        .am-figure img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .am-figure figcaption {
          margin-top: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-soft);
        }

        .am-note {
          margin: 1.25rem 0;
          padding: 1rem 1.25rem;
          background: var(--surface-soft);
          border: 1px solid var(--border);
          border-radius: 10px;
        }

        /* Long inline values, like a sample .env line, must wrap on phones */
        .article-content .am-note code,
        .article-content .am-steps code,
        .article-content .table-wrap code {
          white-space: normal;
          overflow-wrap: anywhere;
        }

        .am-note p {
          margin: 0;
          color: var(--text-soft);
          line-height: 1.6;
        }

        .am-note p + p,
        .am-note .bullet-list {
          margin-top: 0.6rem;
        }

        .am-note .am-note__title {
          margin: 0 0 0.4rem 0;
          font-weight: 600;
          color: var(--text);
        }

        .article-content .am-steps {
          margin: 0.75rem 0 1rem 0;
          padding-left: 1.5rem;
          list-style: decimal;
        }

        .article-content .am-steps li {
          margin-bottom: 0.45rem;
        }

        .am-total td {
          border-top: 1px solid var(--border-strong);
          font-weight: 600;
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
          gap: 12px;
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
          font-size: 0.78rem;
          font-weight: 500;
          overflow-wrap: anywhere;
        }

        .code-copy-btn {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
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

        .code-block code {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.92rem;
          line-height: 1.7;
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
