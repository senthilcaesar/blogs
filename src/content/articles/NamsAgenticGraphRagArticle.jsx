import { Link } from 'react-router-dom';
import { CodeCard } from '../../components/CodeCard';
import { ArticleToc } from '../../components/ArticleToc';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function ExternalLink({ href, children }) {
  return (
    <a href={href} target='_blank' rel='noreferrer'>
      {children}
    </a>
  );
}

/** A small numbered marker that matches the step badges in the diagram. */
function Step({ n }) {
  return (
    <span
      style={{
        display: 'inline-block',
        minWidth: '1.6em',
        padding: '0 0.35em',
        borderRadius: '999px',
        background: 'var(--text-soft)',
        color: 'var(--bg)',
        fontSize: '0.78em',
        fontWeight: 700,
        lineHeight: '1.6em',
        textAlign: 'center',
        verticalAlign: '0.1em',
      }}
    >
      {n}
    </span>
  );
}

const svgText = { fill: 'var(--text)', fontFamily: 'inherit' };
const svgMuted = { fill: 'var(--text-muted)', fontFamily: 'inherit' };
const monoFont = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const figureStyle = {
  margin: '1.5rem 0 0',
  padding: '1rem',
  border: '1px solid var(--border)',
  borderRadius: '16px',
};

function ArrowMarker({ id, color = 'var(--text-muted)' }) {
  return (
    <marker id={id} viewBox='0 0 10 10' refX='9' refY='5' markerWidth='8' markerHeight='8' orient='auto-start-reverse'>
      <path d='M0 0L10 5L0 10z' style={{ fill: color }} />
    </marker>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 1: the architecture, redrawn                                */
/* ------------------------------------------------------------------ */

/**
 * The workshop diagram, redrawn. `active` is an optional list of step ids
 * ('1', '2', '3a' … '6'); when given, every other step is dimmed.
 */
function ArchitectureDiagram({ active, idPrefix = 'arch', caption, label }) {
  const on = (step) => {
    if (!active) return 1;
    if (step === '3') return active.some((s) => s.startsWith('3')) ? 1 : 0.22;
    return active.includes(step) ? 1 : 0.22;
  };
  const panel = {
    fill: 'color-mix(in srgb, var(--text-muted) 5%, transparent)',
    stroke: 'var(--border-strong)',
    strokeWidth: 1.5,
  };
  const box = {
    fill: 'var(--bg)',
    stroke: 'var(--text-muted)',
    strokeWidth: 1.4,
  };
  const flow = { stroke: 'var(--text-soft)', strokeWidth: 1.8, fill: 'none' };
  const memFlow = { ...flow, strokeDasharray: '2 5', strokeLinecap: 'round', strokeWidth: 2.2 };
  const arrow = `url(#${idPrefix}-arrow)`;

  const Badge = ({ x, y, n }) => (
    <g style={{ opacity: on(n) }}>
      <circle cx={x} cy={y} r='12' style={{ fill: 'var(--text-soft)' }} />
      <text x={x} y={y + 4} textAnchor='middle' style={{ fill: 'var(--bg)', fontSize: 11, fontWeight: 700 }}>
        {n}
      </text>
    </g>
  );
  const Label = ({ x, y, lines, size = 13, weight = 600, muted = false }) => (
    <text x={x} textAnchor='middle' style={{ ...(muted ? svgMuted : svgText), fontSize: size, fontWeight: weight }}>
      {lines.map((l, i) => (
        <tspan key={l} x={x} y={y + i * (size + 4)}>
          {l}
        </tspan>
      ))}
    </text>
  );

  const tools = [
    { n: '3a', y: 100, lines: ['Vector + graph', 'retriever'] },
    { n: '3b', y: 195, lines: ['Text2Cypher', 'retriever'] },
    { n: '3c', y: 290, lines: ['SME Cypher', 'templates'] },
    { n: '3d', y: 385, lines: ['MCP'] },
  ];
  const memories = [
    { y: 110, lines: ['Conversation', 'memory'] },
    { y: 205, lines: ['Entity / long-term', 'memory'] },
    { y: 300, lines: ['Reasoning', 'memory'] },
  ];

  return (
    <figure style={figureStyle}>
      <svg
        viewBox='0 0 1060 625'
        role='img'
        aria-label={
          label ||
          'The NAMS plus Agentic GraphRAG architecture. Step 1: the user query goes to the planner agent. Step 2: the planner LLM reads relevant memories from NAMS memory, which holds conversation memory, entity or long-term memory and reasoning memory. Step 3: the planner calls tools: 3a a vector plus graph retriever, 3b a Text2Cypher retriever and 3c SME Cypher templates, all of which query the domain knowledge graph, and 3d MCP, which reaches an external source. Step 4: the evidence goes to the output LLM, which writes the answer. Step 5: the response goes back to the user. Step 6: the conversation, entities and reasoning are stored in NAMS.'
        }
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id={`${idPrefix}-arrow`} color='var(--text-soft)' />
        </defs>

        {/* Column headings */}
        {[
          ['User', 95],
          ['Agent', 320],
          ['Memory', 575],
          ['Tools', 820],
          ['Data', 990],
        ].map(([t, x]) => (
          <text key={t} x={x} y='26' textAnchor='middle' style={{ ...svgMuted, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em' }}>
            {t.toUpperCase()}
          </text>
        ))}

        {/* User column */}
        <rect x='20' y='70' width='150' height='440' rx='16' style={panel} />
        <rect x='35' y='100' width='120' height='56' rx='10' style={box} />
        <Label x={95} y={133} lines={['User query']} />
        <circle cx='95' cy='262' r='15' style={{ fill: 'none', stroke: 'var(--text-muted)', strokeWidth: 1.6 }} />
        <path d='M68 312 C68 288 122 288 122 312 Z' style={{ fill: 'none', stroke: 'var(--text-muted)', strokeWidth: 1.6 }} />
        <text x='95' y='340' textAnchor='middle' style={{ ...svgMuted, fontSize: 12 }}>
          the analyst
        </text>
        <rect x='35' y='420' width='120' height='56' rx='10' style={box} />
        <Label x={95} y={453} lines={['Response']} />

        {/* Planner agent */}
        <rect x='220' y='70' width='200' height='230' rx='16' style={panel} />
        <Label x={320} y={98} lines={['Graph retrieval', 'agent (planner)']} size={13} />
        <rect x='245' y='150' width='150' height='72' rx='10' style={box} />
        <Label x={320} y={180} lines={['LLM', '(planning)']} size={14} />
        <Badge x={320} y={150} n='2' />

        {/* Output LLM */}
        <rect x='220' y='340' width='200' height='170' rx='16' style={panel} />
        <Label x={320} y={405} lines={['LLM', '(output)']} size={15} />
        <text x='320' y='484' textAnchor='middle' style={{ ...svgMuted, fontSize: 12 }}>
          writes the answer
        </text>

        {/* NAMS memory */}
        <rect x='480' y='70' width='190' height='440' rx='16' style={panel} />
        <Label x={575} y={96} lines={['NAMS memory']} size={15} weight={700} />
        {memories.map((m) => (
          <g key={m.lines[0]}>
            <rect x='498' y={m.y} width='154' height='72' rx='10' style={box} />
            <Label x={575} y={m.y + 32} lines={m.lines} size={12.5} />
          </g>
        ))}
        <text x='575' y='420' textAnchor='middle' style={{ ...svgMuted, fontSize: 12 }}>
          <tspan x='575'>all three stored as</tspan>
          <tspan x='575' dy='16'>one graph</tspan>
        </text>

        {/* Tools */}
        <rect x='740' y='70' width='160' height='440' rx='16' style={panel} />
        {tools.map((t) => (
          <g key={t.n} style={{ opacity: on(t.n) }}>
            <rect x='755' y={t.y} width='130' height='64' rx='10' style={box} />
            <Label x={820} y={t.lines.length === 1 ? t.y + 37 : t.y + 28} lines={t.lines} size={12.5} />
          </g>
        ))}

        {/* Data sources */}
        <g>
          <path d='M948 190 V290 A42 11 0 0 0 1032 290 V190' style={{ ...box, fill: 'var(--bg)' }} />
          <ellipse cx='990' cy='190' rx='42' ry='11' style={box} />
          <Label x={990} y={318} lines={['Domain', 'knowledge graph']} size={12} />
        </g>
        <rect x='945' y='392' width='92' height='50' rx='25' style={{ ...box, strokeDasharray: '5 4' }} />
        <Label x={991} y={413} lines={['External', 'source']} size={12} />

        {/* 1: query → planner */}
        <g style={{ opacity: on('1') }}>
          <line x1='155' y1='128' x2='218' y2='128' style={flow} markerEnd={arrow} />
        </g>
        <Badge x={187} y={108} n='1' />

        {/* 2: planner ↔ memory (dotted) */}
        <g style={{ opacity: on('2') }}>
          <line x1='422' y1='186' x2='478' y2='186' style={memFlow} markerStart={arrow} markerEnd={arrow} />
          <text x='450' y='160' textAnchor='middle' style={{ ...svgMuted, fontSize: 11 }}>
            <tspan x='450'>read</tspan>
            <tspan x='450' dy='13'>memories</tspan>
          </text>
        </g>

        {/* 3: planner → tools (bus over the memory column) */}
        <g style={{ opacity: on('3') }}>
          <path d='M370 70 V50 H712 V417' style={flow} />
          <text x='575' y='44' textAnchor='middle' style={{ ...svgMuted, fontSize: 11.5 }}>
            the planner calls the tools it picked
          </text>
        </g>
        {tools.map((t) => (
          <g key={`b-${t.n}`} style={{ opacity: on(t.n) }}>
            <line x1='712' y1={t.y + 32} x2='753' y2={t.y + 32} style={flow} markerEnd={arrow} />
          </g>
        ))}
        {tools.map((t) => (
          <Badge key={`badge-${t.n}`} x={727} y={t.y + 32} n={t.n} />
        ))}

        {/* tools → data */}
        <g style={{ opacity: on('3a') }}>
          <line x1='885' y1='132' x2='944' y2='196' style={flow} markerEnd={arrow} />
        </g>
        <g style={{ opacity: on('3b') }}>
          <line x1='885' y1='227' x2='944' y2='234' style={flow} markerEnd={arrow} />
        </g>
        <g style={{ opacity: on('3c') }}>
          <line x1='885' y1='322' x2='944' y2='274' style={flow} markerEnd={arrow} />
        </g>
        <g style={{ opacity: on('3d') }}>
          <line x1='885' y1='417' x2='943' y2='417' style={flow} markerEnd={arrow} />
        </g>

        {/* 4: planner → output */}
        <g style={{ opacity: on('4') }}>
          <line x1='320' y1='300' x2='320' y2='338' style={flow} markerEnd={arrow} />
        </g>
        <Badge x={344} y={318} n='4' />

        {/* 5: output → response */}
        <g style={{ opacity: on('5') }}>
          <line x1='220' y1='448' x2='157' y2='448' style={flow} markerEnd={arrow} />
        </g>
        <Badge x={187} y={428} n='5' />

        {/* 6: output → memory (dotted) */}
        <g style={{ opacity: on('6') }}>
          <path d='M320 510 V550 H575 V512' style={memFlow} markerEnd={arrow} />
          <text x='448' y='574' textAnchor='middle' style={{ ...svgMuted, fontSize: 11.5 }}>
            store the conversation, entities and reasoning
          </text>
        </g>
        <Badge x={448} y={550} n='6' />

        {/* Legend */}
        <line x1='24' y1='606' x2='70' y2='606' style={flow} markerEnd={arrow} />
        <text x='80' y='610' style={{ ...svgMuted, fontSize: 12 }}>
          data / control flow
        </text>
        <line x1='220' y1='606' x2='266' y2='606' style={memFlow} markerEnd={arrow} />
        <text x='276' y='610' style={{ ...svgMuted, fontSize: 12 }}>
          memory flow
        </text>
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 2: two graphs                                               */
/* ------------------------------------------------------------------ */

function TwoGraphsDiagram() {
  const panel = {
    fill: 'color-mix(in srgb, var(--text-muted) 5%, transparent)',
    stroke: 'var(--border-strong)',
    strokeWidth: 1.5,
  };
  const node = { fill: 'var(--bg)', stroke: 'var(--text-muted)', strokeWidth: 1.5 };
  const edge = { stroke: 'var(--text-soft)', strokeWidth: 1.6, fill: 'none' };
  const relLabel = { ...svgMuted, fontSize: 10.5, fontFamily: monoFont };

  const Node = ({ x, y, label, value, w = 132 }) => (
    <g>
      <rect x={x - w / 2} y={y - 22} width={w} height='44' rx='22' style={node} />
      <text x={x} y={y - 3} textAnchor='middle' style={{ ...svgMuted, fontSize: 10.5, fontFamily: monoFont }}>
        :{label}
      </text>
      <text x={x} y={y + 13} textAnchor='middle' style={{ ...svgText, fontSize: 12, fontWeight: 600 }}>
        {value}
      </text>
    </g>
  );

  return (
    <figure style={figureStyle}>
      <svg
        viewBox='0 0 780 330'
        role='img'
        aria-label='Two separate graphs. Left, the domain knowledge graph, which holds what is true about the business: the Organization ACME Inc. has a HAS_PARTY relationship to the Contract C-1042, which has status active and a renewal date, and the contract has a HAS_CLAUSE relationship to a termination Clause, which holds text and an embedding. Right, the memory graph kept by NAMS, which holds what happened between the analyst and the agent: a Conversation has a HAS_MESSAGE relationship to a Message, which MENTIONS the Entity ACME Inc.; a ReasoningTrace was INITIATED_BY that message, has a HAS_STEP relationship to a ReasoningStep, which USES_TOOL a ToolCall to the template active_contracts_for_org.'
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id='tg-arrow' color='var(--text-soft)' />
        </defs>

        {/* Domain graph */}
        <rect x='10' y='10' width='360' height='310' rx='16' style={panel} />
        <text x='190' y='38' textAnchor='middle' style={{ ...svgText, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}>
          DOMAIN KNOWLEDGE GRAPH
        </text>
        <text x='190' y='56' textAnchor='middle' style={{ ...svgMuted, fontSize: 12 }}>
          what is true about the business
        </text>
        <Node x={120} y={100} label='Organization' value='ACME Inc.' />
        <Node x={120} y={185} label='Contract' value='C-1042' />
        <Node x={120} y={270} label='Clause' value='termination' />
        <line x1='120' y1='122' x2='120' y2='161' style={edge} markerEnd='url(#tg-arrow)' />
        <text x='128' y='146' style={relLabel}>HAS_PARTY</text>
        <line x1='120' y1='207' x2='120' y2='246' style={edge} markerEnd='url(#tg-arrow)' />
        <text x='128' y='231' style={relLabel}>HAS_CLAUSE</text>
        <text x='200' y='180' style={{ ...svgMuted, fontSize: 11 }}>
          <tspan x='200'>status: active</tspan>
          <tspan x='200' dy='15'>renewal_date</tspan>
        </text>
        <text x='200' y='265' style={{ ...svgMuted, fontSize: 11 }}>
          <tspan x='200'>text</tspan>
          <tspan x='200' dy='15'>embedding</tspan>
        </text>

        {/* Memory graph */}
        <rect x='400' y='10' width='370' height='310' rx='16' style={panel} />
        <text x='585' y='38' textAnchor='middle' style={{ ...svgText, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}>
          MEMORY GRAPH (NAMS)
        </text>
        <text x='585' y='56' textAnchor='middle' style={{ ...svgMuted, fontSize: 12 }}>
          what happened between the analyst and the agent
        </text>
        <Node x={490} y={100} label='Conversation' value='Monday' w={124} />
        <Node x={490} y={185} label='Message' value='"…ACME…"' w={124} />
        <Node x={490} y={270} label='Entity' value='ACME Inc.' w={124} />
        <line x1='490' y1='122' x2='490' y2='161' style={edge} markerEnd='url(#tg-arrow)' />
        <text x='497' y='146' style={relLabel}>HAS_MESSAGE</text>
        <line x1='490' y1='207' x2='490' y2='246' style={edge} markerEnd='url(#tg-arrow)' />
        <text x='497' y='231' style={relLabel}>MENTIONS</text>

        <Node x={700} y={100} label='ReasoningTrace' value='Monday task' w={136} />
        <Node x={700} y={185} label='ReasoningStep' value='find contracts' w={136} />
        <Node x={700} y={270} label='ToolCall' value='template ✓' w={136} />
        <line x1='700' y1='122' x2='700' y2='161' style={edge} markerEnd='url(#tg-arrow)' />
        <text x='707' y='146' style={relLabel}>HAS_STEP</text>
        <line x1='700' y1='207' x2='700' y2='246' style={edge} markerEnd='url(#tg-arrow)' />
        <text x='707' y='231' style={relLabel}>USES_TOOL</text>
        <path d='M632 100 H594 V185 H554' style={edge} markerEnd='url(#tg-arrow)' />
        <text x='594' y='90' textAnchor='middle' style={{ ...relLabel, fontSize: 9.5 }}>INITIATED_BY</text>
      </svg>
      <figcaption>
        Two graphs with two jobs. The contract schema on the left is our own example; the memory labels on the right are the
        ones NAMS uses.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Snippets                                                            */
/* ------------------------------------------------------------------ */

const toolDescriptionsSnippet = `active_contracts_for_org(org_name)
  "List the active contracts we have with one organisation."

search_clauses(question)
  "Find contract clauses whose wording matches the question,
   with the contract and party each one belongs to."

news_lookup(company)
  "Recent news about a company, from the external news service."

text2cypher(question)
  "Write a Cypher query for any other question about contracts.
   When the other tools don't fit, use this one."`;

const vectorGraphSnippet = `from neo4j_graphrag.retrievers import VectorCypherRetriever

# After the vector search finds similar clauses, this Cypher runs once per
# clause. 'node' is the clause that matched; 'score' is how close it was.
retrieval_query = """
MATCH (node)<-[:HAS_CLAUSE]-(c:Contract)<-[:HAS_PARTY]-(o:Organization)
RETURN o.name AS party, c.contract_id AS contract,
       node.text AS clause, score
"""

retriever = VectorCypherRetriever(
    driver,
    index_name="clause_embeddings",
    retrieval_query=retrieval_query,
    embedder=embedder,
)`;

const templateSnippet = `// Template: active_contracts_for_org
// Written once by someone who knows the data. The planner only fills in $org_name.
MATCH (o:Organization)-[:HAS_PARTY]->(c:Contract {status: 'active'})
WHERE toLower(o.name) CONTAINS toLower($org_name)
RETURN c.contract_id, c.contract_type, c.effective_date, c.renewal_date
ORDER BY c.renewal_date`;

const text2cypherSnippet = `// Written by the LLM on Tuesday, from the schema and the question
// "Which of those renew before March?" plus what memory said "those" meant
MATCH (o:Organization {name: 'ACME Inc.'})-[:HAS_PARTY]->(c:Contract {status: 'active'})
WHERE c.renewal_date < date('2027-03-01')
RETURN c.contract_id, c.renewal_date
ORDER BY c.renewal_date`;

const memoryWriteSnippet = `# Abridged, after the neo4j-agent-memory examples
await client.short_term.add_message(session, "user", question)
await client.short_term.add_message(session, "assistant", answer)

trace = await client.reasoning.start_trace(session, "ACME termination terms")
step = await client.reasoning.add_step(trace.id, action="find active contracts")
await client.reasoning.record_tool_call(
    step.id, "active_contracts_for_org", {"org_name": "ACME"},
    status=ToolCallStatus.SUCCESS,
)
await client.reasoning.complete_trace(
    trace.id, outcome=TraceOutcome(success=True, summary="3 contracts, terms found"),
)`;

/* ------------------------------------------------------------------ */
/* Article                                                             */
/* ------------------------------------------------------------------ */

const tocGroups = [
  { id: 'what-it-shows', label: 'What the diagram shows' },
  { id: 'the-problem', label: 'What problem it solves' },
  { id: 'two-graphs', label: 'Two graphs, not one' },
  {
    id: 'components',
    label: 'The components',
    items: [
      { id: 'c-planner', label: 'The planner' },
      { id: 'c-memory', label: 'NAMS memory' },
      { id: 'c-tools', label: 'The four tools' },
      { id: 'c-output', label: 'The output LLM' },
      { id: 'c-summary', label: 'All of it on one page' },
    ],
  },
  {
    id: 'end-to-end',
    label: 'How they talk',
    items: [
      { id: 'monday', label: "Monday's question" },
      { id: 'tuesday', label: "Tuesday's follow-up" },
    ],
  },
  { id: 'emerges', label: 'What nobody wrote down' },
  { id: 'still-open', label: "What's still open" },
  { id: 'further-reading', label: 'Further reading' },
];

export function NamsAgenticGraphRagArticle() {
  return (
    <>
      <ArticleToc groups={tocGroups} />

      <p className='article-lead'>
        Picture a legal-operations analyst at a mid-sized company. On Monday they type a question into the company's AI
        assistant: <em>What are the termination terms in our active contracts with ACME Inc., and is there any recent
        news about ACME we should know about?</em> On Tuesday they come back with a follow-up: <em>Which of those renew
        before March?</em>
      </p>
      <p>
        A plain chatbot fails on both days, for two different reasons. On Monday it has never seen the company's
        contracts, so it either says so or, worse, invents plausible-sounding terms. On Tuesday it has no idea what
        "those" means, because nothing from Monday survived. The diagram from the workshop is one answer to both
        problems. Simply put, it's an AI assistant that looks things up in a graph database before it answers, picks
        the right way to look each thing up, and remembers what happened so the next conversation starts where the
        last one ended.
      </p>
      <p>
        We'll follow the analyst's two questions all the way through. First we'll decode the diagram and the problem
        it solves, then take each component in turn, and finally watch the components pass the two questions from
        one to the next.
      </p>

      <section className='article-panel'>
        <h2 id='what-it-shows'>What the Diagram Shows</h2>
        <p>
          The title, <strong>NAMS + Agentic GraphRAG Architecture</strong>, packs three ideas into five words, so it's
          worth unpacking them one at a time.
        </p>
        <ul className='bullet-list'>
          <li>
            <strong>RAG</strong> stands for retrieval-augmented generation. Before a large language model (LLM) writes
            an answer, a program <em>retrieves</em> relevant facts from somewhere trustworthy and pastes them into the
            prompt, so the model writes from evidence instead of from memory.
          </li>
          <li>
            <strong>GraphRAG</strong> is RAG where that trustworthy somewhere is a knowledge graph: nodes,
            relationships and properties stored in a graph database such as Neo4j.
          </li>
          <li>
            <strong>Agentic</strong> means an LLM decides <em>how</em> to retrieve. Instead of one fixed lookup, it
            looks at the question and picks from several retrieval tools, one or more per question.
          </li>
          <li>
            <strong>NAMS</strong> is the{' '}
            <ExternalLink href='https://memory.neo4jlabs.com/'>Neo4j Agent Memory Service</ExternalLink>, a hosted
            service that gives an agent memory that lasts between conversations. It stores that memory as a graph too.
          </li>
        </ul>
        <p>
          Here is the diagram, redrawn. The numbers are the order things happen in, and we'll keep using them
          throughout.
        </p>
        <ArchitectureDiagram caption='The architecture from the workshop, redrawn. Solid arrows carry questions, data and results; dotted arrows carry memory.' />
        <p>
          Read it left to right. The <strong>user</strong> column is where a question starts <Step n='1' /> and where
          the answer lands <Step n='5' />. The <strong>agent</strong> column holds two LLM jobs: one that plans the
          lookups <Step n='2' /> and one that writes the answer <Step n='4' />. The <strong>memory</strong> column is
          NAMS, which the planner reads from before it plans <Step n='2' /> and which gets written to after the answer
          goes out <Step n='6' />. The <strong>tools</strong> column holds four ways to fetch evidence{' '}
          <Step n='3a' />–<Step n='3d' />: three of them query the company's own knowledge graph, and one reaches out
          to the wider world. Each tool hands its results back to the planner (the diagram doesn't draw that return
          trip), and step <Step n='4' /> passes everything on to the output LLM.
        </p>
        <p>
          (One small liberty: in the original slide, the tool arrows start from beside the memory column, which makes
          it look as if memory calls the tools. It's the planner that calls them, so the redrawn version routes those
          arrows from the planner.)
        </p>
      </section>

      <section className='article-panel'>
        <h2 id='the-problem'>What Problem It Solves</h2>
        <p>
          Every box in the diagram exists because a simpler design broke somewhere. The quickest way to see why the
          pieces are there is to build the system up from nothing and watch where each version fails.
        </p>
        <p>
          Start with the LLM on its own. It was trained on public text up to a cut-off date, so it has never read the
          analyst's contracts, and it can't reliably tell you when it doesn't know. "LLMs are not reasoning engines," write Tomaž
          Bratanič and Oskar Hane in <em>Essential GraphRAG</em>. "They are probabilistic language models trained to
          predict what sounds like a good next token." Ask one about ACME's termination terms and you'll get something
          that <em>sounds</em> like a termination clause.
        </p>
        <p>
          The first fix is RAG. The usual recipe is to cut the contracts into passages called chunks, turn each chunk
          into an <em>embedding</em> (a list of numbers that captures what the text is about, so that passages with
          similar meaning get similar numbers), and store the embeddings in a <em>vector index</em>, a lookup table
          that finds the stored chunks closest in meaning to a question. This is vector search. For "what do our ACME
          contracts say about termination?" it works well, because the answer really is sitting in a few passages
          whose wording resembles the question.
        </p>
        <p>
          The catch shows up on questions that aren't about wording at all. "How many active contracts do we have
          with ACME?" isn't answered by any passage. It needs a filter (only ACME, only active) and a count. The
          authors of <em>Essential GraphRAG</em> put it plainly: unstructured text "lacks the structure needed for
          precise operations such as filtering, counting, or aggregating." Vector search returns the passages most
          similar to the question, and a list of similar passages can't be counted into an answer.
        </p>
        <p>
          So the second fix is to store the contracts as a graph. Organisations, contracts and clauses become nodes,
          joined by relationships, and you query them in <em>Cypher</em>, Neo4j's query language, which describes the
          pattern of nodes and relationships you want to find. A graph query can filter on <code>status</code>, count
          contracts and follow a contract to its clauses in one go.
        </p>
        <p>
          Why a graph, though, and not an ordinary relational database, which can filter and count too? Two reasons
          matter here. First, the contracts aren't only records; they're also text. A graph holds both in one place:
          the organisation, the contract and its renewal date as nodes and properties, and each clause's wording and
          embedding on a clause node connected to its contract. <em>Essential GraphRAG</em> makes exactly this point,
          that one graph can hold structured and unstructured data together. Second, questions about contracts tend to
          follow chains, from a company to its contracts to their clauses and on to the other parties. In tables, each
          hop is a join somebody has to write; in a graph, the relationships are stored, so a query just follows them.
          Neo4j's developer's guide to knowledge graphs lists "complex JOINs" and slow "multi-hop operations" among the
          places relational databases struggle. That leaves one question: who writes the Cypher?
        </p>
        <p>
          This is where the real trade-off appears. You can let an LLM write the Cypher for each question, which
          handles anything but sometimes gets it wrong, or you can have an expert write the queries in advance, which
          is reliable but covers only the questions somebody thought of. Neither is enough alone. That's why the
          diagram has <em>several</em> tools and an <em>agent</em> in front of them: the planner picks the expert's
          query when one fits, falls back to the LLM-written query when none does, and uses vector search when the
          question really is about wording. One more tool, MCP, covers what the company's graph doesn't hold at all,
          such as this week's news about ACME.
        </p>
        <p>
          That handles Monday. Tuesday's problem is different: each request to an LLM starts with a blank slate, and
          the model keeps nothing between them. The common workaround is to paste the whole chat history back into
          every prompt, which grows without limit and still loses everything once the chat is closed. NAMS is the
          diagram's answer: a store outside the model that keeps the conversation, the people and companies it
          mentioned, and what the agent did, and hands back just the relevant parts next time. William Lyon, who wrote
          Neo4j's tour of the service, sums up why it's a graph: "vector stores give you recall; the graph gives you
          understanding."
        </p>
      </section>

      <section className='article-panel'>
        <h2 id='two-graphs'>Two Graphs, Not One</h2>
        <p>
          The single most useful thing to notice in the diagram is that it contains <em>two</em> graphs, and they hold
          different kinds of knowledge. Mixing them up is, I suspect, most of what makes the diagram look muddy.
        </p>
        <p>
          The <strong>domain knowledge graph</strong> (the domain graph, for short), the cylinder on the right, holds what's true about the
          business: which organisations exist, which contracts they're party to, what each clause says. It changes
          when the business changes, and every user of the assistant sees the same one. The <strong>memory
          graph</strong>, kept by NAMS in the middle, holds what happened between one user and the agent: what they
          asked, which companies they mentioned, which tools the agent tried and whether they worked. It grows with
          every conversation, and it belongs to that user.
        </p>
        <TwoGraphsDiagram />
        <p>
          A useful picture is a law firm's records room next to one paralegal's notebook. The records room has the
          contracts, and it's the same for everyone. The notebook has "Monday: the analyst asked about ACME's
          termination terms; I listed ACME's contracts with the active-contracts template and searched them for
          termination wording," and it's what lets the paralegal pick up on
          Tuesday without asking the analyst to start over. Notice that "ACME Inc." appears in both graphs. That's not
          a mistake: the records room knows ACME as a party to contracts, and the notebook knows ACME as something
          this analyst cares about.
        </p>
        <p>
          In practice, three of the four tools in column three read only the domain graph (the fourth, MCP, leaves it
          altogether), and the memory reads and writes in steps{' '}
          <Step n='2' /> and <Step n='6' /> touch only the memory graph. The planner is the one component that looks
          at both.
        </p>
      </section>

      <section className='article-panel'>
        <h2 id='components'>The Components, One at a Time</h2>
        <p>
          With the two graphs separated, each box has a clear job. We'll go roughly in the order a question meets
          them, and say for each one what it takes in, what it does and what it hands on. The user box needs no
          explanation beyond this: it's where a question in plain English starts, and where the answer comes back.
        </p>

        <h3 id='c-planner' style={{ marginTop: '1.75rem' }}>
          The Planner: An LLM That Chooses, Not Answers
        </h3>
        <p>
          The <strong>graph retrieval agent</strong>, or planner, is an LLM given a different job from the usual one.
          It doesn't answer the question. It reads the question and the relevant memories, then decides which tools
          to call and with what inputs. For Monday's question it might decide: look up ACME's active contracts, search
          those contracts for termination wording, and check the news.
        </p>
        <p>
          How does an LLM "call" a tool? It doesn't, strictly. The program gives the model a short description of each
          tool, and the model replies with the name of the tool it wants and the inputs to pass. This is known as tool
          calling or function calling. Your own code then runs the tool and hands the result back. As{' '}
          <em>Essential GraphRAG</em> puts it, "the LLM can't make actual calls to your retrievers; it can only make a
          decision on which retriever to use and what parameters to pass." The descriptions are the planner's whole
          view of the toolbox, so they're worth writing with care:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={toolDescriptionsSnippet} lang='text' title='What the planner sees (illustrative)' />
        </div>
        <p>
          Notice the last line. Giving the flexible tool an explicit "use me when nothing else fits" is the pattern the
          book recommends, and it's how the planner settles the trade-off from earlier: specific tools first, the
          catch-all last. Neo4j's <code>neo4j-graphrag</code> Python package has a ready-made version of this job,
          called <code>ToolsRetriever</code>, which "uses an LLM to intelligently select and execute appropriate tools
          based on user queries."
        </p>
        <p>
          In practice, the planner is where the word <em>agentic</em> lives. Take it away and every question would go
          down the same single path, whatever it asked for. (Some designs add a second check here, which{' '}
          <em>Essential GraphRAG</em> calls an answer critic, that looks at what came back and sends the planner out
          again if something's missing. The workshop diagram leaves it out.)
        </p>

        <h3 id='c-memory' style={{ marginTop: '1.75rem' }}>
          NAMS Memory: Three Notebooks in One Graph
        </h3>
        <p>
          NAMS is a hosted service from Neo4j Labs, Neo4j's group for experimental projects. An agent talks to it over
          a web API or over MCP (more on MCP below), and NAMS keeps everything in a Neo4j graph. It sorts memory into
          the three kinds the diagram lists, and each answers a different question the planner might ask.
        </p>
        <p>
          <strong>Conversation memory</strong> answers <em>what have we said so far?</em> It stores each conversation
          and its messages in order, as <code>(Conversation)-[:HAS_MESSAGE]-&gt;(Message)</code>. Long histories
          would eventually overflow a prompt, so NAMS compresses them in the background. Batches of messages are
          summarised into short notes it calls <em>observations</em>, and the observations are rolled up into a single
          current summary, a <em>reflection</em>. When the planner asks for context, it gets the reflection, the
          observations and the most recent messages word for word. It's the same trade a person makes: last few
          sentences remembered exactly, last month remembered as a gist.
        </p>
        <p>
          <strong>Entity, or long-term, memory</strong> answers <em>who and what does this user care about?</em> As
          messages arrive, NAMS pulls out the people, organisations, places, events and objects they mention, and
          stores each as an <code>Entity</code> node linked back to the messages that mentioned it. The hard part is
          noticing that "ACME", "ACME Inc." and "Acme Incorporated" are the same company. This step is called entity
          resolution. NAMS runs it in three passes before creating anything new: an exact match on the name, then a
          fuzzy match that tolerates spelling differences, then a match on meaning using embeddings. A confident match
          is merged into the existing entity; a borderline one is flagged for review instead of being guessed.
        </p>
        <p>
          <strong>Reasoning memory</strong> answers <em>what did I do last time, and did it work?</em> It records the
          agent's steps and tool calls as a <code>ReasoningTrace</code> with <code>ReasoningStep</code> and{' '}
          <code>ToolCall</code> nodes, including each call's inputs and whether it succeeded or failed. (This is a log
          of actions the application chose to record, not the model's hidden thought process.) Because traces are
          searchable by similarity, the planner can ask "have I handled a question like this before?" and see which
          tools worked.
        </p>
        <details className='article-details'>
          <summary>Under the hood (optional): how the three memories connect</summary>
          <p>
            All three kinds live in one graph, so they're joined by ordinary relationships. A message{' '}
            <code>MENTIONS</code> the entities found in it. A reasoning trace is <code>INITIATED_BY</code> the message
            that prompted it, has steps via <code>HAS_STEP</code>, and each step <code>USES_TOOL</code> to record a
            tool call. A step also links to the entities it <code>TOUCHED</code>. That means the agent can walk from a
            failed tool call to the company it was about, and on to the message where the user first mentioned that
            company.
          </p>
          <p>
            Writes are fast because the slow work is deferred: adding a message returns at once, and entity
            extraction, embedding and resolution run afterwards in background queues. Reads use vector search when
            embeddings are available and fall back to plain text matching when they aren't.
          </p>
        </details>
        <p>
          In practice, step <Step n='2' /> is one or two calls to NAMS (get the recent context for this session,
          search entities and past traces related to the question), and what comes back is a short bundle of text the
          planner can read. The hands-on version is in this site's{' '}
          <Link to='/posts/agent-memory-tutorial'>agent memory tutorial</Link>, which builds each kind of memory one
          module at a time.
        </p>

        <h3 id='c-tools' style={{ marginTop: '1.75rem' }}>
          The Four Tools
        </h3>
        <p>
          Each tool is a different answer to the question "how do I get the right facts out?" The first three query
          the domain knowledge graph; the fourth leaves it.
        </p>
        <p>
          <Step n='3a' /> <strong>Vector + graph retriever.</strong> This is vector search with a second step bolted
          on. First it finds the clauses whose embeddings are closest to the question. Then, for each clause it found,
          it runs a short Cypher query that walks the graph outwards: up to the contract the clause belongs to, and on
          to the organisation on the other side. A bare passage of text says "either party may terminate on ninety
          days' notice"; after the graph step it arrives labelled with contract C-1042 and ACME Inc. In the{' '}
          <code>neo4j-graphrag</code> package this is the <code>VectorCypherRetriever</code>:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={vectorGraphSnippet} lang='python' title='Vector search, then a walk through the graph' />
        </div>
        <p>
          Use it when the answer lives in the <em>wording</em> of the documents, and you also need to know where each
          passage came from.
        </p>
        <p>
          <Step n='3b' /> <strong>Text2Cypher retriever.</strong> Here the LLM writes the Cypher. The program gives it
          the graph's schema, which is the list of node labels, relationship types and properties, plus a handful of
          example questions paired with correct queries (known as few-shot examples). The model writes a query, the
          program runs it, and the rows that come back become the evidence. It can answer questions nobody planned
          for, including the counting and filtering that vector search can't do. The catch is that it's sometimes
          wrong, as the book notes, "especially when the input questions are complex or ambiguous or if the database
          schema elements aren't semantically named." The usual fix is iterative: when you find a kind of question it keeps
          getting wrong, add an example that shows the right query.
        </p>
        <p>
          <Step n='3c' /> <strong>SME Cypher templates.</strong> SME most likely stands for subject-matter expert:
          someone who knows both the data and the questions people ask. A template is a Cypher query that expert wrote
          once and tested, with blanks (parameters) for the parts that change. The planner doesn't write any Cypher; it
          just fills in the blank:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={templateSnippet} lang='cypher' title='A template with one blank' />
        </div>
        <p>
          Templates are precise and fast. They skip the LLM call that writing a query would need, and they can't
          invent a relationship that doesn't exist. But they only cover the questions somebody foresaw. Neo4j's own guidance for its Aura Agent product says the same, calling templates "highly recommended
          for most scenarios" and keeping LLM-written Cypher for the questions nobody anticipated.
        </p>
        <p>
          <Step n='3d' /> <strong>MCP.</strong> The Model Context Protocol (MCP) is an open standard for connecting
          AI applications to outside systems; its own documentation calls it "a USB-C port for AI applications." A
          service that speaks MCP describes its tools in a standard format, so any MCP-aware agent can use them
          without custom glue code. In the diagram it's the door to the "external source", anything the company's
          graph doesn't hold. For our analyst that's a news service. (NAMS itself also offers an MCP server, which is
          one way an agent can do steps <Step n='2' /> and <Step n='6' />, but in this diagram MCP's job is reaching
          outside data.)
        </p>
        <p>
          In practice, the four tools differ mainly in <em>who decides the query</em>. With vector search, the
          question's meaning decides. With Text2Cypher, the LLM decides. With a template, an expert decided in
          advance. With MCP, someone else's system decides.
        </p>

        <h3 id='c-output' style={{ marginTop: '1.75rem' }}>
          The Domain Graph, the Outside World and the Output LLM
        </h3>
        <p>
          Two boxes in the diagram never act on their own; they only answer queries. The <strong>domain knowledge
          graph</strong> has to be built before any of this works, typically by loading structured records directly
          and using an LLM to pull entities out of the documents, with an embedding added to each clause so vector
          search has something to search. The <strong>external source</strong> is whatever sits behind MCP.
        </p>
        <p>
          The <strong>output LLM</strong> <Step n='4' /> gets the original question, the memory context and everything
          the tools returned, and writes the answer. Its instructions are the classic RAG ones, which{' '}
          <em>Essential GraphRAG</em> phrases as "You will only use the information provided to you in the prompt…
          You are not allowed to make anything up." It can be the same model as the planner, called a second time with
          a different prompt, or a smaller, cheaper one, since its job is to write well rather than to know things.
          The answer goes back to the user <Step n='5' />, and the exchange is sent to NAMS <Step n='6' />. The
          diagram draws that last arrow from the output LLM; in a real system it's the application code around the
          model that makes the call, once the answer exists.
        </p>

        <h3 id='c-summary' style={{ marginTop: '1.75rem' }}>
          All of It on One Page
        </h3>
        <div className='table-wrap' style={{ marginTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Its job</th>
                <th>Takes in</th>
                <th>Hands on</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Planner (LLM)</td>
                <td>Decide what to look up, and with which tool</td>
                <td>The question, memory context</td>
                <td>Tool calls with inputs</td>
              </tr>
              <tr>
                <td>NAMS memory</td>
                <td>Remember across turns and sessions</td>
                <td>Messages, tool calls, outcomes</td>
                <td>Recent context, entities, similar past traces</td>
              </tr>
              <tr>
                <td>Vector + graph retriever</td>
                <td>Find passages by meaning, then attach graph context</td>
                <td>The question</td>
                <td>Passages labelled with contract and party</td>
              </tr>
              <tr>
                <td>Text2Cypher retriever</td>
                <td>Write a new query for an unforeseen question</td>
                <td>The question, the schema, examples</td>
                <td>Rows from the graph</td>
              </tr>
              <tr>
                <td>SME Cypher templates</td>
                <td>Run a tested query with the blanks filled in</td>
                <td>Parameter values</td>
                <td>Rows from the graph</td>
              </tr>
              <tr>
                <td>MCP</td>
                <td>Reach systems outside the graph</td>
                <td>Tool name and inputs</td>
                <td>Whatever the outside system returns</td>
              </tr>
              <tr>
                <td>Output LLM</td>
                <td>Write the answer from the evidence only</td>
                <td>Question, memory, tool results</td>
                <td>The response</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className='article-panel'>
        <h2 id='end-to-end'>How They Talk: Two Questions, End to End</h2>
        <p>
          Now we can put the parts in motion. The contract numbers and dates below are made up for the example, but
          the path each question takes is exactly the one the diagram draws.
        </p>

        <h3 id='monday' style={{ marginTop: '1.75rem' }}>
          Monday's Question
        </h3>
        <p>
          <Step n='1' /> The analyst asks: <em>What are the termination terms in our active contracts with ACME Inc.,
          and is there any recent news about ACME we should know about?</em> The question goes to the planner.
        </p>
        <p>
          <Step n='2' /> Before planning, the planner asks NAMS for anything relevant. This is the analyst's first
          conversation about ACME, so very little comes back: no earlier messages on the subject, no ACME entity, no
          similar past traces. The planner works from the question alone.
        </p>
        <p>
          <Step n='3' /> The planner breaks the question into three lookups and picks a tool for each.
        </p>
        <ul className='bullet-list'>
          <li>
            <Step n='3c' /> "Which contracts are active with ACME?" matches a template exactly, so it calls{' '}
            <code>active_contracts_for_org</code> with <code>org_name = "ACME"</code>. Back come three contracts:
            C-1042, C-1187 and C-1203.
          </li>
          <li>
            <Step n='3a' /> "What do they say about termination?" is a question about wording, so it calls{' '}
            <code>search_clauses</code>, the vector + graph retriever. Vector search finds clauses that read like termination terms; the graph step attaches
            each clause's contract and party, so the planner can keep the ones belonging to ACME.
          </li>
          <li>
            <Step n='3d' /> "Any recent news?" isn't in the graph at all, so it calls <code>news_lookup</code>,
            which goes out through MCP to the news service.
          </li>
        </ul>
        <p>
          <Step n='4' /> The results come back to the planner, which passes all three sets to the output LLM along
          with the question. It writes an answer
          that names each contract, quotes its termination clause and summarises the news, using only what it was
          given. <Step n='5' /> The answer appears on the analyst's screen.
        </p>
        <p>
          <Step n='6' /> Finally, the exchange is stored. The question and answer are added as messages. In the
          background NAMS extracts "ACME Inc." as an organisation entity linked to those messages, and entity
          resolution should match the bare "ACME" from the same question to that entity rather than create a second
          one. The application
          also records a reasoning trace: three steps, three tool calls, all successful. With the{' '}
          <code>neo4j-agent-memory</code> Python client, that write looks roughly like this:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={memoryWriteSnippet} lang='python' title='Step 6: writing to memory' />
        </div>

        <h3 id='tuesday' style={{ marginTop: '1.75rem' }}>
          Tuesday's Follow-Up
        </h3>
        <p>
          <Step n='1' /> The analyst returns and asks: <em>Which of those renew before March?</em> On its own the
          question is unanswerable. Those <em>what</em>?
        </p>
        <p>
          <Step n='2' /> This time memory has plenty to say. Conversation memory returns Monday's exchange, so "those"
          can be read as ACME's three active contracts. Entity memory returns ACME Inc. as a company this analyst
          cares about. Reasoning memory returns Monday's trace, which shows that the template{' '}
          <code>active_contracts_for_org</code> worked for ACME.
        </p>
        <ArchitectureDiagram
          idPrefix='arch-tue'
          active={['1', '2', '3b', '4', '5', '6']}
          caption="Tuesday's path. Memory turns an unanswerable follow-up into a precise question, and Text2Cypher covers the part no template does."
          label="The same architecture, with Tuesday's path highlighted: 1 the follow-up question reaches the planner, 2 the planner reads memories from NAMS, 3b it calls the Text2Cypher retriever against the domain knowledge graph, 4 the output LLM writes the answer, 5 the response returns, 6 the exchange is stored in NAMS. The other tools are dimmed."
        />
        <p>
          <Step n='3b' /> The planner now knows the question means "which of ACME's active contracts renew before 1
          March 2027?" No template filters by renewal date, so it falls back to Text2Cypher. Given the schema and the
          rewritten question, the LLM writes a query like this:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={text2cypherSnippet} lang='cypher' title='A query nobody wrote in advance' />
        </div>
        <p>
          (Turning "before March" into a real date only works if the prompt also tells the model today's date. It's a
          small detail, and it's easy to forget.)
        </p>
        <p>
          <Step n='4' /> <Step n='5' /> The output LLM turns the rows into a sentence naming the contracts and their
          renewal dates, and the analyst reads it. <Step n='6' /> Tuesday's exchange and its trace go into NAMS,
          ready for Wednesday.
        </p>
        <div className='table-wrap' style={{ marginTop: '1.5rem' }}>
          <table>
            <thead>
              <tr>
                <th>Step</th>
                <th>Arrow</th>
                <th>Monday carries</th>
                <th>Tuesday carries</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Step n='1' /></td>
                <td>User → planner</td>
                <td>The full question about ACME</td>
                <td>"Which of those renew before March?"</td>
              </tr>
              <tr>
                <td><Step n='2' /></td>
                <td>Planner ↔ NAMS</td>
                <td>Almost nothing comes back</td>
                <td>Monday's messages, the ACME entity, Monday's trace</td>
              </tr>
              <tr>
                <td><Step n='3' /></td>
                <td>Planner → tools</td>
                <td>Template, vector + graph, MCP</td>
                <td>Text2Cypher</td>
              </tr>
              <tr>
                <td><Step n='4' /></td>
                <td>Planner → output LLM</td>
                <td>Question, three result sets</td>
                <td>Rewritten question, query rows</td>
              </tr>
              <tr>
                <td><Step n='5' /></td>
                <td>Output LLM → user</td>
                <td>Termination terms and news</td>
                <td>Contracts renewing before March</td>
              </tr>
              <tr>
                <td><Step n='6' /></td>
                <td>Output → NAMS</td>
                <td>Messages, the ACME entity, a 3-step trace</td>
                <td>Messages, a 1-step trace</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          Compare the two days and the division of labour becomes clear. The domain graph answered the same kind of
          question both times, about contracts and their properties. What changed on Tuesday was everything around
          it: memory supplied the meaning of "those", the planner chose a different tool because the question had a
          new shape, and Monday's reasoning trace showed which lookup had already found ACME's contracts.
        </p>
      </section>

      <section className='article-panel'>
        <h2 id='emerges'>What Nobody Wrote Down</h2>
        <p>
          Look again at Tuesday. No one wrote a rule saying "when the analyst says <em>those</em>, check Monday's
          contracts." No one told the planner that ACME and ACME Inc. are the same company. Those behaviours came out
          of the parts working together: the conversation was stored, the entity was resolved, the planner read both,
          and an LLM did what it's good at, which is reading context and filling in the obvious.
        </p>
        <p>
          The system also gets better over time in a way that's easy to miss. Reasoning memory builds up a record of
          which tools worked for which kinds of question. And the people running the system get a record too: every
          time Text2Cypher is used for a question it gets wrong, that's a candidate for a new template.{' '}
          <em>Essential GraphRAG</em> describes exactly this pattern, specialised retrievers "built over time as we
          identify questions that the generic retrievers have problems generating queries to answer." Today's
          catch-all query is next quarter's tested template.
        </p>
      </section>

      <section className='article-panel'>
        <h2 id='still-open'>What's Still Open</h2>
        <p>
          A few things are worth knowing before you build this, because the diagram makes it look more settled than it
          is.
        </p>
        <p>
          <strong>NAMS is young.</strong> It's a Neo4j Labs project, described as "experimental and community
          supported," and its APIs are still changing. The underlying <code>neo4j-agent-memory</code> package can also
          run against your own Neo4j database instead of the hosted service, which is worth knowing if you can't send
          conversations to a third party.
        </p>
        <p>
          <strong>The diagram is a design, not a product.</strong> Each box is real and documented, but I couldn't
          find a Neo4j reference that wires NAMS to the <code>neo4j-graphrag</code> retrievers in exactly this shape. It
          reads best as the workshop's recommended way to combine pieces that exist separately. In the same spirit,
          you'll see vendor figures such as "2x more accurate than vector-only RAG" in Neo4j's material. They come
          without a published method, so I'd treat them as encouragement to run your own comparison rather than as
          results.
        </p>
        <p>
          <strong>LLM-written queries need guard rails.</strong> Text2Cypher can produce a query that runs but answers
          a slightly different question, and nothing in the pipeline will notice. It should also run with read-only
          access: Neo4j's own MCP server keeps a separate <code>write-cypher</code> tool and warns that "LLM-generated
          queries can cause harm."
        </p>
        <p>
          <strong>Every step can fail on its own.</strong> The planner can pick the wrong tool, a retriever can fetch
          the wrong evidence, and the output LLM can misread good evidence. A single score for the final answer can't
          tell you which one happened, so it pays to test each stage separately. This site's post on{' '}
          <Link to='/posts/benchmarking-rag-systems'>benchmarking RAG systems</Link> walks through how.
        </p>
        <p>
          None of that changes the shape of the idea. So come back to the analyst one last time. On Tuesday they typed six words that only made sense because of
          Monday, and they got an answer built from a query nobody had written before. Each part of the diagram did one
          small job: remember, choose, fetch, write. The skill isn't in any single box. It's in the arrows.
        </p>
      </section>

      <section className='article-panel'>
        <h2 id='further-reading'>Further Reading</h2>
        <ul className='bullet-list'>
          <li>
            <ExternalLink href='https://memory.neo4jlabs.com/'>Neo4j Agent Memory Service (NAMS)</ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://neo4j.com/blog/genai/a-tour-of-the-neo4j-agent-memory-service-nams/'>
              A Tour of the Neo4j Agent Memory Service
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://neo4j.com/docs/neo4j-graphrag-python/current/user_guide_rag.html'>
              neo4j-graphrag for Python: the RAG user guide and retrievers
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://neo4j.com/blog/genai/build-context-aware-graphrag-agent/'>
              Build a Context-Aware GraphRAG Agent (Cypher templates and Text2Cypher)
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://neo4j.com/docs/mcp/current/'>Neo4j MCP server documentation</ExternalLink>
          </li>
          <li>
            <ExternalLink href='https://modelcontextprotocol.io/docs/getting-started/intro'>
              What is the Model Context Protocol?
            </ExternalLink>
          </li>
          <li>
            Tomaž Bratanič and Oskar Hane, <em>Essential GraphRAG</em> (Manning, 2025), chapters 2–5
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
            <Link to='/posts/agent-memory-tutorial'>Give Your AI Agent a Memory</Link>
          </li>
          <li>
            <Link to='/posts/benchmarking-rag-systems'>Benchmarking RAG Systems</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
