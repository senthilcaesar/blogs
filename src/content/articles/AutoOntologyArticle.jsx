import { Link } from 'react-router-dom';
import { CodeCard } from '../../components/CodeCard';
import { ArticleToc } from '../../components/ArticleToc';

function YoutubeIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect width="20" height="14" rx="4" fill="#ff0000" />
      <path d="M8 4l5 3-5 3z" fill="#ffffff" />
    </svg>
  );
}

const svgText = { fill: 'var(--text)', fontFamily: 'inherit' };
const svgMuted = { fill: 'var(--text-muted)', fontFamily: 'inherit' };
const monoFont = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const figureStyle = {
  margin: '1.25rem 0 0',
  padding: '1rem',
  border: '1px solid var(--border)',
  borderRadius: '16px',
};
const svgStyle = { width: '100%', height: 'auto', display: 'block' };
const edgeStyle = { stroke: 'var(--text-muted)', strokeWidth: 2, fill: 'none' };
const neutralBox = {
  fill: 'color-mix(in srgb, var(--text-muted) 8%, transparent)',
  stroke: 'var(--text-muted)',
  strokeWidth: 1.5,
};
const purpleBox = {
  fill: 'color-mix(in srgb, var(--accent-purple) 12%, transparent)',
  stroke: 'var(--accent-purple)',
  strokeWidth: 2,
};
const accentBox = {
  fill: 'color-mix(in srgb, var(--accent) 12%, transparent)',
  stroke: 'var(--accent)',
  strokeWidth: 2,
};
const headingLabel = { ...svgMuted, fontSize: 13, letterSpacing: '0.08em' };

function ArrowMarker({ id, color = 'var(--text-muted)' }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" style={{ fill: color }} />
    </marker>
  );
}

function JoinPathDiagram() {
  const steps = [
    { x: 10, title: 'Invoice line', note: 'price → revenue' },
    { x: 155, title: 'Invoice', note: 'invoice date' },
    { x: 300, title: 'Customer', note: 'who bought it' },
    { x: 445, title: 'City', note: 'delivery city' },
    { x: 590, title: 'State', note: 'Pennsylvania' },
  ];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label="Join path diagram. Invoice line joins to Invoice, then Customer, then City, then State. Invoice line also joins to Stock item, the sushi roll flash drive."
        style={svgStyle}
      >
        <defs>
          <ArrowMarker id="ao-join-arrow" />
        </defs>
        <text x="10" y="28" style={headingLabel}>
          ONE QUESTION, SIX TABLES
        </text>
        {steps.map((s) => (
          <g key={s.title}>
            <rect x={s.x} y="62" width="120" height="64" rx="12" style={purpleBox} />
            <text x={s.x + 60} y="90" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700 }}>
              {s.title}
            </text>
            <text x={s.x + 60} y="110" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5 }}>
              {s.note}
            </text>
          </g>
        ))}
        {[130, 275, 420, 565].map((x) => (
          <line key={x} x1={x + 2} y1="94" x2={x + 23} y2="94" style={edgeStyle} markerEnd="url(#ao-join-arrow)" />
        ))}
        <line x1="70" y1="128" x2="70" y2="164" style={edgeStyle} markerEnd="url(#ao-join-arrow)" />
        <rect x="10" y="166" width="120" height="64" rx="12" style={purpleBox} />
        <text x="70" y="194" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700 }}>
          Stock item
        </text>
        <text x="70" y="214" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5 }}>
          sushi roll drive
        </text>
        <text x="430" y="190" textAnchor="middle" style={{ ...svgMuted, fontSize: 13 }}>
          Five joins, and each one is a chance
        </text>
        <text x="430" y="210" textAnchor="middle" style={{ ...svgMuted, fontSize: 13 }}>
          to follow the wrong path.
        </text>
      </svg>
      <figcaption>
        The tables the agent has to connect to answer the Pennsylvania question in the Wide World Importers sample
        database.
      </figcaption>
    </figure>
  );
}

function TwoReadings() {
  const card = {
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '1rem 1.1rem',
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginTop: '1.25rem',
      }}
    >
      <div style={{ ...card, borderColor: 'var(--accent)' }}>
        <p style={{ margin: 0, fontWeight: 700 }}>Reading A ✓</p>
        <p style={{ margin: '0.5rem 0 0' }}>
          Revenue is the sum of the <strong>invoice line prices</strong>. &ldquo;In Pennsylvania&rdquo; means the{' '}
          <strong>customer&rsquo;s delivery city</strong> is in Pennsylvania.
        </p>
        <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>Answer: $588.80</p>
      </div>
      <div style={card}>
        <p style={{ margin: 0, fontWeight: 700 }}>Reading B ✗</p>
        <p style={{ margin: '0.5rem 0 0' }}>
          Revenue is the sum of <strong>whole payments, tax included</strong>. &ldquo;In Pennsylvania&rdquo; means
          the <strong>supplier&rsquo;s city</strong> is in Pennsylvania.
        </p>
        <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>Answer: a different, wrong number</p>
      </div>
    </div>
  );
}

function StorageDiagram() {
  const tables = [
    { x: 26, name: 'term', cols: ['name', 'description', 'synonyms', 'name_certified'] },
    { x: 190, name: 'table_join', cols: ['source_table_id', 'target_table_id', 'join_columns'] },
  ];
  const sources = [
    { x: 392, y: 76, label: 'Snowflake' },
    { x: 556, y: 76, label: 'Databricks' },
    { x: 392, y: 150, label: 'MySQL' },
    { x: 556, y: 150, label: 'and more' },
  ];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 300"
        role="img"
        aria-label="Storage diagram. On the left, the map lives in Postgres with pgvector, in a term table with columns name, description, synonyms and name_certified, and a table_join table with columns source_table_id, target_table_id and join_columns. On the right, your data stays in its own systems such as Snowflake, Databricks and MySQL."
        style={svgStyle}
      >
        <defs>
          <ArrowMarker id="ao-store-arrow" />
        </defs>
        <text x="16" y="28" style={headingLabel}>
          THE MAP · POSTGRES + PGVECTOR
        </text>
        <rect x="10" y="44" width="340" height="246" rx="16" style={{ ...neutralBox, strokeDasharray: '0' }} />
        {tables.map((t) => (
          <g key={t.name}>
            <rect x={t.x} y="64" width="148" height={28 + t.cols.length * 26} rx="10" style={purpleBox} />
            <rect
              x={t.x}
              y="64"
              width="148"
              height="28"
              rx="10"
              style={{ fill: 'var(--accent-purple)', stroke: 'var(--accent-purple)' }}
            />
            <text x={t.x + 12} y="83" style={{ fontFamily: monoFont, fontSize: 13, fontWeight: 700, fill: 'var(--bg)' }}>
              {t.name}
            </text>
            {t.cols.map((c, i) => (
              <text key={c} x={t.x + 12} y={111 + i * 26} style={{ ...svgText, fontFamily: monoFont, fontSize: 12 }}>
                {c}
              </text>
            ))}
          </g>
        ))}
        <line x1="175" y1="78" x2="188" y2="78" style={edgeStyle} markerEnd="url(#ao-store-arrow)" />
        <text x="100" y="230" style={{ ...svgMuted, fontSize: 12 }}>
          tables for terms
        </text>
        <text x="216" y="230" style={{ ...svgMuted, fontSize: 12 }}>
          tables for the links
        </text>
        <text x="180" y="270" textAnchor="middle" style={{ ...svgText, fontSize: 12.5 }}>
          + embeddings, so terms can be found by meaning
        </text>
        <line x1="368" y1="50" x2="368" y2="285" style={{ ...edgeStyle, strokeWidth: 1.5, strokeDasharray: '4 4' }} />
        <text x="392" y="28" style={headingLabel}>
          YOUR DATA STAYS WHERE IT IS
        </text>
        {sources.map((s) => (
          <g key={s.label}>
            <rect x={s.x} y={s.y} width="150" height="58" rx="12" style={neutralBox} />
            <text x={s.x + 75} y={s.y + 35} textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 600 }}>
              {s.label}
            </text>
          </g>
        ))}
        <text x="548" y="244" textAnchor="middle" style={{ ...svgMuted, fontSize: 12.5 }}>
          Only schemas, column profiles and sample
        </text>
        <text x="548" y="262" textAnchor="middle" style={{ ...svgMuted, fontSize: 12.5 }}>
          values go into the map. The rows stay put.
        </text>
      </svg>
      <figcaption>The map and the data live apart: the map is a small Postgres database, and your data stays in its own systems.</figcaption>
    </figure>
  );
}

function OssieLayersDiagram() {
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 230"
        role="img"
        aria-label="Two-layer diagram. On top, ontology.yaml, the vocabulary: business concepts and how they relate. Underneath, semantic_model.yaml, the where and how: tables, columns and metrics, close to a dbt semantic model. Both export to and import from other tools."
        style={svgStyle}
      >
        <defs>
          <ArrowMarker id="ao-ossie-arrow" />
        </defs>
        <text x="20" y="28" style={headingLabel}>
          AN APACHE OSSIE EXPORT HAS TWO LAYERS
        </text>
        <rect x="20" y="44" width="500" height="78" rx="14" style={purpleBox} />
        <text x="40" y="74" style={{ ...svgText, fontSize: 17, fontWeight: 700 }}>
          The vocabulary
        </text>
        <text x="500" y="74" textAnchor="end" style={{ ...svgText, fontSize: 13, fontFamily: monoFont }}>
          ontology.yaml
        </text>
        <text x="40" y="102" style={{ ...svgMuted, fontSize: 13 }}>
          Business concepts and how they relate to each other
        </text>
        <rect x="20" y="134" width="500" height="78" rx="14" style={neutralBox} />
        <text x="40" y="164" style={{ ...svgText, fontSize: 17, fontWeight: 700 }}>
          The where and how
        </text>
        <text x="500" y="164" textAnchor="end" style={{ ...svgText, fontSize: 13, fontFamily: monoFont }}>
          semantic_model.yaml
        </text>
        <text x="40" y="192" style={{ ...svgMuted, fontSize: 13 }}>
          Tables, columns and metrics, close to a dbt semantic model
        </text>
        <line x1="526" y1="128" x2="574" y2="128" style={edgeStyle} markerStart="url(#ao-ossie-arrow)" markerEnd="url(#ao-ossie-arrow)" />
        <rect x="580" y="92" width="125" height="72" rx="14" style={accentBox} />
        <text x="642" y="124" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700 }}>
          Other tools
        </text>
        <text x="642" y="144" textAnchor="middle" style={{ ...svgMuted, fontSize: 12 }}>
          export · import
        </text>
      </svg>
      <figcaption>The map can be exported as Apache Ossie YAML files and loaded into another tool.</figcaption>
    </figure>
  );
}

function PipelineDiagram() {
  const stages = [
    {
      x: 10,
      n: '1',
      title: 'Generate',
      who: 'plain code + an AI model',
      lines: ['Read schemas and samples', 'Draft a term per table', 'Work out the joins'],
      style: purpleBox,
    },
    {
      x: 250,
      n: '2',
      title: 'Certify',
      who: 'people',
      lines: ['Fix names and descriptions', 'Add synonyms and formulas', 'Sign off each part'],
      style: accentBox,
    },
    {
      x: 490,
      n: '3',
      title: 'Answer',
      who: 'the agent',
      lines: ['Look up matching terms', 'Write and check the SQL', "Run it, or say it can't"],
      style: purpleBox,
    },
  ];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 260"
        role="img"
        aria-label="Pipeline diagram with three stages. Generate, done by plain code and an AI model: read schemas and samples, draft a term per table, work out the joins. Certify, done by people: fix names and descriptions, add synonyms and formulas, sign off each part. Answer, done by the agent: look up matching terms, write and check the SQL, run it or say it can't."
        style={svgStyle}
      >
        <defs>
          <ArrowMarker id="ao-pipe-arrow" />
        </defs>
        <text x="10" y="28" style={headingLabel}>
          GENERATE → CERTIFY → ANSWER
        </text>
        {stages.map((s) => (
          <g key={s.title}>
            <rect x={s.x} y="44" width="220" height="172" rx="16" style={s.style} />
            <text x={s.x + 18} y="76" style={{ ...svgText, fontSize: 18, fontWeight: 700 }}>
              {s.n}. {s.title}
            </text>
            <text x={s.x + 18} y="98" style={{ ...svgMuted, fontSize: 12.5, fontStyle: 'italic' }}>
              {s.who}
            </text>
            {s.lines.map((l, i) => (
              <text key={l} x={s.x + 18} y={134 + i * 26} style={{ ...svgText, fontSize: 13 }}>
                · {l}
              </text>
            ))}
          </g>
        ))}
        <line x1="232" y1="130" x2="248" y2="130" style={edgeStyle} markerEnd="url(#ao-pipe-arrow)" />
        <line x1="472" y1="130" x2="488" y2="130" style={edgeStyle} markerEnd="url(#ao-pipe-arrow)" />
        <text x="360" y="246" textAnchor="middle" style={{ ...svgMuted, fontSize: 13 }}>
          The AI drafts. People decide. The agent uses what people signed off.
        </text>
      </svg>
      <figcaption>Auto Ontology works in three stages, and only the middle one needs a person.</figcaption>
    </figure>
  );
}

function SavedQueryTablesDiagram() {
  const header = { fill: 'var(--accent-purple)', stroke: 'var(--accent-purple)' };
  const headText = { fontFamily: monoFont, fontSize: 13, fontWeight: 700, fill: 'var(--bg)' };
  const key = { ...svgMuted, fontFamily: monoFont, fontSize: 12 };
  const val = { ...svgText, fontSize: 12 };
  const mono = { ...svgText, fontFamily: monoFont, fontSize: 11.5 };
  const rule = { stroke: 'var(--accent-purple)', strokeWidth: 1, opacity: 0.4 };
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 290"
        role="img"
        aria-label="Storage diagram for the saved query. The custom_analysis table holds id a1, the name revenue by state and month, and the description: revenue means invoice line prices, and the state is the customer's delivery city. The sql_query table holds id q7 and the full SQL, and its other rows are queries from your query history. A small link table, custom_analysis__sql, holds analysis_id a1 and sql_query_id q7, recording which name goes with which SQL."
        style={svgStyle}
      >
        <defs>
          <ArrowMarker id="ao-tables-arrow" />
        </defs>
        <text x="10" y="32" style={headingLabel}>
          HOW THE SAVED QUERY IS STORED
        </text>

        {/* custom_analysis */}
        <rect x="10" y="56" width="270" height="184" rx="10" style={purpleBox} />
        <rect x="10" y="56" width="270" height="30" rx="10" style={header} />
        <text x="22" y="76" style={headText}>
          custom_analysis
        </text>
        <text x="22" y="106" style={key}>id</text>
        <text x="118" y="106" style={mono}>a1</text>
        <line x1="10" y1="116" x2="280" y2="116" style={rule} />
        <text x="22" y="136" style={key}>name</text>
        <text x="118" y="136" style={val}>revenue by state</text>
        <text x="118" y="152" style={val}>and month</text>
        <line x1="10" y1="162" x2="280" y2="162" style={rule} />
        <text x="22" y="182" style={key}>description</text>
        {['Revenue means invoice', 'line prices; the state is', "the customer's delivery", 'city'].map((l, i) => (
          <text key={l} x="118" y={182 + i * 16} style={val}>
            {l}
          </text>
        ))}

        {/* link table */}
        <rect x="305" y="56" width="145" height="90" rx="10" style={neutralBox} />
        <rect
          x="305"
          y="56"
          width="145"
          height="30"
          rx="10"
          style={{ fill: 'var(--text-muted)', stroke: 'var(--text-muted)' }}
        />
        <text x="377" y="76" textAnchor="middle" style={{ ...headText, fontSize: 11 }}>
          custom_analysis__sql
        </text>
        <text x="315" y="106" style={key}>analysis_id</text>
        <text x="425" y="106" style={mono}>a1</text>
        <line x1="305" y1="116" x2="450" y2="116" style={{ ...rule, stroke: 'var(--text-muted)' }} />
        <text x="315" y="136" style={key}>sql_query_id</text>
        <text x="425" y="136" style={mono}>q7</text>

        {/* sql_query */}
        <rect x="495" y="56" width="215" height="184" rx="10" style={purpleBox} />
        <rect x="495" y="56" width="215" height="30" rx="10" style={header} />
        <text x="507" y="76" style={headText}>
          sql_query
        </text>
        <text x="507" y="106" style={key}>id</text>
        <text x="603" y="106" style={mono}>q7</text>
        <line x1="495" y1="116" x2="710" y2="116" style={rule} />
        <text x="507" y="136" style={key}>sql_full_query</text>
        {['SELECT SUM(il.extendedprice)', 'FROM sales.invoicelines il', 'JOIN … (six tables)'].map((l, i) => (
          <text key={l} x="507" y={156 + i * 16} style={mono}>
            {l}
          </text>
        ))}
        <line x1="495" y1="200" x2="710" y2="200" style={rule} />
        <text x="507" y="218" style={{ ...svgMuted, fontSize: 11.5, fontStyle: 'italic' }}>
          other rows: queries collected
        </text>
        <text x="507" y="233" style={{ ...svgMuted, fontSize: 11.5, fontStyle: 'italic' }}>
          from your query history
        </text>

        {/* links */}
        <line x1="303" y1="101" x2="284" y2="101" style={edgeStyle} markerEnd="url(#ao-tables-arrow)" />
        <path d="M452 131 H468 V101 H491" style={{ ...edgeStyle, strokeLinejoin: 'round' }} markerEnd="url(#ao-tables-arrow)" />

        <text x="360" y="272" textAnchor="middle" style={{ ...svgMuted, fontSize: 13 }}>
          The middle table only records which name goes with which SQL.
        </text>
      </svg>
      <figcaption>
        Where the saved query lives in the map&rsquo;s database. The ids are shortened here; the real ones are long
        random strings.
      </figcaption>
    </figure>
  );
}

function AgentRetrievalDiagram() {
  const tools = [
    {
      x: 10,
      name: 'retrieve',
      style: accentBox,
      lines: ['searches the map by meaning', 'and by name'],
    },
    {
      x: 250,
      name: 'run_sql',
      style: neutralBox,
      lines: ['checks table and column', 'names against the catalog,', 'then tests a draft', 'and returns rows'],
    },
    {
      x: 490,
      name: 'submit',
      style: neutralBox,
      lines: ['same checks, then runs', 'the final query; an error', 'goes back to the model', 'to fix'],
    },
  ];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 470"
        role="img"
        aria-label="Answer loop diagram. Your question goes to a reasoning model, which calls one tool at a time and reads each result. The retrieve tool searches the map by meaning and by name, and finds the custom analysis revenue by state and month with its description of what revenue means. The run_sql tool checks table and column names against the catalog, tests a draft and returns rows. The submit tool applies the same checks and runs the final query; an error goes back to the model to fix. The answer is $588.80 from 3 invoice lines, returned with the SQL it ran. If no query is accepted, the agent says it can't answer."
        style={svgStyle}
      >
        <defs>
          <ArrowMarker id="ao-agent-arrow" />
        </defs>
        <text x="10" y="28" style={headingLabel}>
          HOW THE AGENT FINDS THE SAVED QUERY
        </text>
        <rect x="10" y="44" width="700" height="50" rx="12" style={neutralBox} />
        <text x="28" y="74" style={{ ...svgText, fontSize: 15, fontWeight: 700 }}>
          Your question
        </text>
        <text x="146" y="74" style={{ ...svgMuted, fontSize: 13 }}>
          &ldquo;Revenue for the sushi roll flash drive in Pennsylvania in June 2015?&rdquo;
        </text>
        <line x1="360" y1="96" x2="360" y2="118" style={edgeStyle} markerEnd="url(#ao-agent-arrow)" />
        <rect x="210" y="120" width="300" height="56" rx="14" style={purpleBox} />
        <text x="360" y="144" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700 }}>
          Reasoning model
        </text>
        <text x="360" y="164" textAnchor="middle" style={{ ...svgMuted, fontSize: 12 }}>
          reads each result, picks the next tool
        </text>
        {[
          [300, 120],
          [360, 360],
          [420, 600],
        ].map(([x1, x2]) => (
          <line
            key={x2}
            x1={x1}
            y1="180"
            x2={x2}
            y2="226"
            style={edgeStyle}
            markerStart="url(#ao-agent-arrow)"
            markerEnd="url(#ao-agent-arrow)"
          />
        ))}
        <text x="20" y="198" style={{ ...svgMuted, fontSize: 11.5 }}>
          One tool at a time;
        </text>
        <text x="20" y="214" style={{ ...svgMuted, fontSize: 11.5 }}>
          it reads each result.
        </text>
        {tools.map((t) => (
          <g key={t.name}>
            <rect x={t.x} y="230" width="220" height="150" rx="14" style={t.style} />
            <text x={t.x + 16} y="258" style={{ ...svgText, fontFamily: monoFont, fontSize: 15, fontWeight: 700 }}>
              {t.name}
            </text>
            {t.lines.map((l, i) => (
              <text key={l} x={t.x + 16} y={284 + i * 18} style={{ ...svgText, fontSize: 12.5 }}>
                {l}
              </text>
            ))}
          </g>
        ))}
        <rect
          x="22"
          y="312"
          width="196"
          height="58"
          rx="8"
          style={{ fill: 'var(--bg)', stroke: 'var(--accent)', strokeWidth: 1.5 }}
        />
        <text x="32" y="333" style={{ ...svgText, fontFamily: monoFont, fontSize: 11.5, fontWeight: 700 }}>
          revenue by state and month
        </text>
        <text x="32" y="355" style={{ ...svgMuted, fontSize: 11.5 }}>
          + its description of revenue
        </text>
        <line x1="600" y1="382" x2="600" y2="398" style={edgeStyle} markerEnd="url(#ao-agent-arrow)" />
        <rect
          x="330"
          y="400"
          width="380"
          height="56"
          rx="14"
          style={{
            fill: 'color-mix(in srgb, var(--success) 16%, transparent)',
            stroke: 'var(--success)',
            strokeWidth: 2,
          }}
        />
        <text x="520" y="424" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700 }}>
          $588.80, from 3 invoice lines
        </text>
        <text x="520" y="444" textAnchor="middle" style={{ ...svgMuted, fontSize: 12 }}>
          returned with the SQL it ran
        </text>
        <text x="20" y="424" style={{ ...svgMuted, fontSize: 12 }}>
          If no query is accepted, the agent
        </text>
        <text x="20" y="442" style={{ ...svgMuted, fontSize: 12 }}>
          says it can&rsquo;t answer instead.
        </text>
      </svg>
      <figcaption>
        How the agent answers the Pennsylvania question. A reasoning model calls one tool at a time, and{' '}
        <code>retrieve</code> is the step that finds the saved query and its description.
      </figcaption>
    </figure>
  );
}

const mapQuestions = [
  {
    question: 'What does it mean?',
    element: 'Concept',
    detail: 'A term, such as Customer or Invoice Line, with a plain description and synonyms',
  },
  {
    question: 'Where is it?',
    element: 'Mapping',
    detail: 'Column attributes, which tie each term to the tables and columns that hold its data',
  },
  {
    question: 'What’s connected?',
    element: 'Relationship',
    detail:
      'How tables join: the keys the database declares, plus links the AI suggests and the data confirms. This includes bridge tables, tables that exist only to link two others',
  },
  {
    question: 'How do I calculate it?',
    element: 'Metric',
    detail:
      'SQL attributes: saved, reviewed formulas that belong to a term, such as how to calculate revenue, so every answer works it out the same way',
  },
  {
    question: 'Where does it come from?',
    element: 'Lineage',
    detail: 'Each term and attribute points back to the tables and columns it came from, and each answer shows the SQL it ran',
  },
  {
    question: 'Should I use it?',
    element: 'Certification',
    detail: 'Experts sign off names, descriptions and attributes, and the app marks those parts as reviewed',
  },
];

const ontologyTerms = [
  {
    db: 'A term, such as Customer or Order, with a description and synonyms',
    onto: 'A class',
    std: 'owl:Class (description: rdfs:comment, synonyms: skos:altLabel)',
  },
  {
    db: 'A column, such as a name, a date or a price',
    onto: 'A property',
    std: 'owl:DatatypeProperty',
  },
  {
    db: 'A link between two tables',
    onto: 'A relationship',
    std: 'owl:ObjectProperty',
  },
  {
    db: 'A saved formula (an SQL attribute), such as revenue',
    onto: 'A derived property',
    std: '—',
  },
  {
    db: 'A person marking a term as certified (more on this in Stage 2)',
    onto: 'A curator signing off',
    std: '—',
  },
];

const ossieOntologyYaml = `ontology:
- concept: Customer
  type: EntityType
  relationships:
  - name: deliverycityid
    roles:
    - concept: City
    multiplicity: ManyToOne
    verbalizes:
    - '{Customer} has {City}'`;

const ossieSemanticModelYaml = `metrics:
- name: revenue_by_state_and_month`;

const answerSql = `SELECT SUM(il.extendedprice) AS revenue, COUNT(*) AS invoice_lines
FROM sales.invoicelines il
JOIN sales.invoices i              ON il.invoiceid = i.invoiceid
JOIN warehouse.stockitems si       ON il.stockitemid = si.stockitemid
JOIN sales.customers c             ON i.customerid = c.customerid
JOIN application.cities ct         ON c.deliverycityid = ct.cityid
JOIN application.stateprovinces sp ON ct.stateprovinceid = sp.stateprovinceid
WHERE si.stockitemname = 'USB food flash drive - sushi roll'
  AND sp.stateprovincename = 'Pennsylvania'
  AND i.invoicedate >= '2015-06-01' AND i.invoicedate < '2015-07-01'`;

const adSpendExchange = `You:    What was return on ad spend for the sushi roll flash drive in June 2015?
Agent:  check_answerable -> coverage 0.5; no term covers "ad spend"
Agent:  I can find revenue for that product, but this data has no
        advertising spend, so I can't compute return on ad spend.`;

const quickstart = `# 1. Get the code and create your settings file
git clone https://github.com/NVIDIA/auto-ontology.git && cd auto-ontology
cp .env.example .env      # then add your NVIDIA key and new passwords

# 2. Start Postgres and load the sample sales database
docker compose up -d --wait postgres
git clone https://github.com/NVIDIA/auto-ontology-eval.git ../auto-ontology-eval
(cd ../auto-ontology-eval && uv sync && cp .env.example .env && \\
  POSTGRES_PASSWORD='<your password>' \\
  uv run python scripts/seed/seed_wwi.py --database-name wideworldimporters --drop)

# 3. Build and start everything else
docker compose up -d --build

# 4. Open http://localhost:3000, sign in, and turn on
#    Settings → Semantic Compilation`;

const linkStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem' };

const tocGroups = [
  { id: 'why-agents-get-it-wrong', label: 'Why agents get it wrong' },
  { id: 'why-not-tell', label: 'Why not just tell the agent?' },
  { id: 'what-is-an-ontology', label: 'What’s an ontology?' },
  { id: 'whats-in-the-map', label: 'What’s in the map' },
  { id: 'where-the-map-lives', label: 'Where the map lives' },
  {
    id: 'how-it-builds-the-map',
    label: 'How it works',
    items: [
      { id: 'stage-generate', label: 'Stage 1: Generate' },
      { id: 'stage-certify', label: 'Stage 2: Certify' },
      { id: 'stage-answer', label: 'Stage 3: Answer' },
    ],
  },
  {
    id: 'back-to-pennsylvania',
    label: 'Back to Pennsylvania',
    items: [
      { id: 'the-answer-and-the-drift', label: 'The answer, and the drift' },
      { id: 'inside-the-saved-query', label: 'Inside the saved query' },
      { id: 'a-trick-question', label: 'A trick question' },
    ],
  },
  { id: 'sharing-the-map', label: 'Sharing the map' },
  { id: 'trying-it-yourself', label: 'Trying it yourself' },
  { id: 'where-it-falls-short', label: 'Where it falls short' },
  { id: 'references', label: 'References' },
];

export function AutoOntologyArticle() {
  return (
    <>
      <ArticleToc groups={tocGroups} />

      <p className="article-lead">
        Ask an AI agent a simple question about your company&rsquo;s data,{' '}
        <mark>&ldquo;How much did we sell last June?&rdquo;</mark>, and it&rsquo;ll write a database query, run it and hand you a number. It sounds sure of
        itself. But is the number right?
      </p>
      <p className="article-lead">
        Often the honest answer is &ldquo;sometimes&rdquo;. The agent is reading tables with names like{' '}
        <code>invoicelines</code> and columns like <code>deliverymethodid</code>, and it has to guess what they mean
        and how they fit together. NVIDIA&rsquo;s Auto Ontology is a free, open-source tool built to take the
        guessing out. Simply put, it reads your databases, drafts a map of what the data means, lets people check
        that map, and then gives it to the agent so the agent writes the right query.
      </p>

      <section className="article-panel">
        <h2 id="why-agents-get-it-wrong">Why do agents get database questions wrong?</h2>
        <p>
          When you ask an agent a question about data that lives in a database, it has to turn your words into
          SQL, the language databases understand. This is called <em>text-to-SQL</em>. The model is usually good at
          the grammar of SQL. What it can&rsquo;t know on its own is the meaning of your particular tables: which
          column holds the price, which table holds the customer, and which path connects them.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Let&rsquo;s make that concrete with the example we&rsquo;ll follow through this whole post. Auto
          Ontology&rsquo;s own quickstart uses{' '}
          <a
            href="https://learn.microsoft.com/en-us/sql/samples/wide-world-importers-what-is"
            target="_blank"
            rel="noreferrer"
          >
            Wide World Importers
          </a>
          , a sample sales database from Microsoft with 51
          tables, close to 600 columns and around 2 million rows. One of its test questions is:
        </p>
        <div className="article-panel article-panel--accent">
          <p>
            <em>
              &ldquo;What was revenue for the USB food flash drive &ndash; sushi roll in Pennsylvania in June
              2015?&rdquo;
            </em>
          </p>
        </div>
        <p style={{ marginTop: '1rem' }}>
          It reads like one question, but answering it means connecting six tables. The price sits on the invoice
          line, the date on the invoice, the product in the stock items, and &ldquo;Pennsylvania&rdquo; is three
          hops away, through the customer and their city.
        </p>
        <JoinPathDiagram />
        <p style={{ marginTop: '1rem' }}>
          Worse, there&rsquo;s more than one way to read the question that looks reasonable. Here are two readings
          that differ in just two details:
        </p>
        <TwoReadings />
        <p style={{ marginTop: '1rem' }}>
          Both readings produce valid SQL, and both return a number with total confidence. Only one of them matches
          what the business means by &ldquo;revenue&rdquo;. So how is an agent supposed to tell the two apart?
        </p>
      </section>

      <section className="article-panel">
        <h2 id="why-not-tell">Why not just tell the agent?</h2>
        <p>
          There are two obvious fixes, and each solves only half the problem. The first is to hand the agent the
          database schema, the list of tables and columns. That&rsquo;s quick and always up to date. The catch is
          that a schema says what exists, not what it means. It lists a <code>deliverycityid</code> column, but it
          doesn&rsquo;t say that this, and not the supplier&rsquo;s city, is what &ldquo;in Pennsylvania&rdquo; refers
          to.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The second fix is to have people write the meaning down by hand, in a semantic model: a layer that defines
          business terms like &ldquo;Net Revenue&rdquo; once, so everyone calculates them the same way. That gets
          the meaning right. The catch is the effort. Someone has to describe every table, and a large company may
          have thousands of tables spread across many databases, each with its own naming habits.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Auto Ontology tries to keep the good half of each. Like the first fix, it starts from the database
          itself, so nobody writes the first draft. Like the second, it produces written-down meaning that people
          check and approve. Before we see how, it helps to know what kind of map it&rsquo;s building.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="what-is-an-ontology">First, what&rsquo;s an ontology?</h2>
        <p>
          An ontology is a shared map of the things a business cares about and how they connect. &ldquo;Shared&rdquo;
          is the important word. Every team reads the same map, and it&rsquo;s written so that a machine can read it
          too, which means an AI agent gets the same definitions as the people.
        </p>
        <p style={{ marginTop: '1rem' }}>
          It&rsquo;s easiest to understand next to its simpler cousin, the taxonomy. A taxonomy only sorts things
          into types, from broad to narrow: a t-shirt is a kind of clothing, and clothing is a kind of product. An
          ontology keeps those types and adds three more things: what each term means (a written definition), how
          things relate (a customer <em>places</em> an order) and the rules things must follow (every order must have
          a customer). That makes four parts in all, and we&rsquo;ll check Auto Ontology&rsquo;s map against them
          shortly.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Why does that matter for our question? Ask sales, marketing and finance what an &ldquo;active
          customer&rdquo; is and you may get three different answers. &ldquo;Revenue&rdquo; has the same problem,
          as our two readings show. An ontology writes down which meaning the business uses, so people and agents
          stop guessing. (For a longer, diagram-by-diagram introduction, see{' '}
          <Link to="/posts/semantic-model-vs-ontology-vs-knowledge-graph">
            Semantic Model vs Ontology vs Knowledge Graph
          </Link>
          .)
        </p>
      </section>

      <section className="article-panel">
        <h2 id="whats-in-the-map">What&rsquo;s in Auto Ontology&rsquo;s map?</h2>
        <p>
          Auto Ontology sums up the map as the answers to six questions that a person, or an agent,
          might ask about a piece of data. Each question has its own part of the map:
        </p>
        <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
          <table style={{ fontSize: '1.05rem' }}>
            <thead>
              <tr>
                <th style={{ fontSize: '0.85rem' }}>Question</th>
                <th style={{ fontSize: '0.85rem' }}>Part of the map</th>
                <th style={{ fontSize: '0.85rem' }}>In Auto Ontology</th>
              </tr>
            </thead>
            <tbody>
              {mapQuestions.map((row) => (
                <tr key={row.element}>
                  <td>{row.question}</td>
                  <td>
                    <strong>{row.element}</strong>
                  </td>
                  <td>{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem' }}>
          Alongside SQL attributes, which belong to a single term, the map can hold <em>custom analyses</em>: whole
          saved SQL queries, each with a name and a plain description of what it calculates. People add them in the
          app or through its API, and the agent can find and reuse them just as it finds terms. We&rsquo;ll see one
          at work in Back to Pennsylvania.
        </p>
        <p style={{ marginTop: '1rem' }}>
          If you already know the vocabulary of ontologies, each piece has a familiar counterpart. If you
          don&rsquo;t, the first column of the next table is all you need; the right-hand columns are the formal names you&rsquo;ll
          meet elsewhere. (OWL is the Web Ontology Language, the main standard for writing ontologies.) They&rsquo;re
          equivalents, not what the tool writes: as the next section shows, Auto Ontology stores its map without any
          of these standards.
        </p>
        <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>In Auto Ontology</th>
                <th>In ontology terms</th>
                <th>Standard name</th>
              </tr>
            </thead>
            <tbody>
              {ontologyTerms.map((row) => (
                <tr key={row.onto}>
                  <td>{row.db}</td>
                  <td>
                    <strong>{row.onto}</strong>
                  </td>
                  <td>
                    <code>{row.std}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem' }}>
          Measured against the four parts of an ontology, the map has two in full and two only partly or not at all.
          It has <strong>definitions</strong>, in each term&rsquo;s description and synonyms, and it has{' '}
          <strong>relationships</strong>, in the links between tables. It has <strong>types</strong> too, since each
          term is a class, but only as a flat list: what it lacks is a <strong>type hierarchy</strong>. Its terms sit
          side by side rather than from broad to narrow, so there&rsquo;s no &ldquo;a t-shirt is a kind of
          clothing&rdquo;. (Since November 2026, the map can group the parts of one thing split across tables, such as{' '}
          <code>customer</code> and <code>customer_ext</code>, into a single entity, but that grouping says &ldquo;part
          of&rdquo;, not &ldquo;kind of&rdquo;.) And it lacks <strong>rules</strong>: there&rsquo;s no reasoner, the program that would
          apply a rule like &ldquo;every order must have a customer&rdquo; and work out new facts from it. What the
          map adds instead
          is something ontologies usually don&rsquo;t hold: saved formulas, such as how to calculate revenue. In the
          words of{' '}
          <a href="https://www.linkedin.com/in/syedmuhammadhumair/" target="_blank" rel="noreferrer">
            Syed Humair
          </a>
          , who tested the
          tool, it&rsquo;s &ldquo;an ontology in spirit, built for one job&rdquo;:{' '}
          <mark>helping an AI agent write the correct SQL query</mark>.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="where-the-map-lives">Where does the map live?</h2>
        <p>
          If you&rsquo;ve worked with ontologies before, you might expect the usual standards: OWL, Turtle (a
          compact text format for writing ontology statements), SPARQL (a query language for that kind of data)
          and SHACL (a language for writing rules). Auto Ontology uses none of them. Instead, it&rsquo;s built the
          way data teams already work, with SQL and YAML files.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The map itself lives in an ordinary Postgres database. There&rsquo;s a table for terms, with columns for
          the name, description, synonyms and whether the name has been certified, and a table for the links, which
          records which table joins to which and on which columns. Alongside them sit <em>embeddings</em>: each term
          is turned into a long list of numbers so that terms with similar meanings end up close together. We can
          picture it as a library shelved by topic rather than by title, so a search for &ldquo;sales&rdquo; also
          finds &ldquo;revenue&rdquo;. (The Postgres add-on that stores them is called pgvector.)
        </p>
        <StorageDiagram />
        <p style={{ marginTop: '1rem' }}>
          Crucially, the map and your data live apart. Your data stays where it already is; Auto Ontology only
          reads the structure, profiles the columns and takes some sample values. In his walkthrough, Humair found
          connectors for Snowflake, Databricks and MySQL, among others. In practice, you don&rsquo;t have to move or
          copy your data to give an agent a map of it.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="how-it-builds-the-map">How does it work?</h2>
        <p>Auto Ontology works in three stages: it generates a draft, people certify it, and the agent answers from it.</p>
        <PipelineDiagram />

        <h3 id="stage-generate">Stage 1: Generate</h3>
        <p>
          First, a background service reads each database: its tables, columns, keys and some sample values. This
          part is plain code, with no AI involved. Then an AI model looks at the tables one at a time, drafts a
          business term and description for each, and suggests links between tables that nobody declared in the
          database. Plain code then checks those suggested links against the real data.
        </p>

        <h3 id="stage-certify">Stage 2: Certify</h3>
        <p>
          The draft is a set of good guesses, not facts. So the second stage is a person, someone who knows the
          business, going through it. They correct descriptions, add synonyms (people also call an order a
          &ldquo;sales order&rdquo;), add formulas and take ownership of terms. Then they certify each part: first
          the name and description, then each column.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The app tracks this closely. A term with only its name checked shows as <em>partially certified</em>; once
          every column has been checked, it shows as <em>certified</em>. In practice, anyone using the map can see
          which parts a human has vouched for and which parts are still the AI&rsquo;s guess.
        </p>

        <h3 id="stage-answer">Stage 3: Answer</h3>
        <p>
          When you ask a question in plain English, it goes to the agent&rsquo;s <em>reasoning model</em>, the AI model
          that runs the agent. The model starts out knowing nothing about your database, so it works in a loop,
          calling one tool at a time and reading what each one returns:
        </p>
        <ul>
          <li>
            <code>retrieve</code> searches the map, by meaning and by name, for matching terms, columns, saved formulas
            and saved queries.
          </li>
          <li>
            <code>run_sql</code> checks a draft query&rsquo;s table and column names against the catalog, then runs it
            and returns rows.
          </li>
          <li>
            <code>submit</code> applies the same checks and runs the final query. An error goes back to the model to
            fix; a clean run is the answer, returned with its SQL.
          </li>
        </ul>
        <p>
          If no query is accepted, the agent says the data can&rsquo;t answer the question rather than inventing
          something.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="back-to-pennsylvania">Back to Pennsylvania</h2>
        <h3 id="the-answer-and-the-drift">The answer, and the drift</h3>
        <p>
          So what happens to our question,{' '}
          <mark>
            &ldquo;What was revenue for the USB food flash drive &ndash; sushi roll in Pennsylvania in June
            2015?&rdquo;
          </mark>{' '}
          The agent matches
          &ldquo;revenue&rdquo;, the product and the state to terms in the map, follows their relationships to find
          the joins, and comes back with &ldquo;$588.80, from 3 invoice lines&rdquo;, along with this query:
        </p>
        <CodeCard code={answerSql} lang="sql" />
        <p style={{ marginTop: '1rem' }}>
          That&rsquo;s Reading A, the correct one: invoice line prices, and the customer&rsquo;s delivery city.
          Humair worked the figure out himself against the database and also got $588.80. But the agent didn&rsquo;t
          land on it every time. When he asked the same question again and again, about one time in three it drifted
          to Reading B, adding up whole payments with tax and using the supplier&rsquo;s city. Same question,
          different meaning, the same confident tone.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The fix was to write the meaning down once. Humair added a saved query named <mark className="highlight-sea">&ldquo;revenue by state and
          month&rdquo;</mark> to the map, with a plain description saying that revenue
          means invoice line prices and that the state belongs to the customer&rsquo;s delivery city. After that, the
          agent stopped drifting in his tests.
          Crucially, nobody changed the model. The agent simply had the meaning written down.
        </p>
        <h3 id="inside-the-saved-query">Inside the saved query</h3>
        <p>
          This saved query is the custom analysis we met in What&rsquo;s in Auto Ontology&rsquo;s map. It holds three things, and it&rsquo;s stored in
          two forms in the map&rsquo;s Postgres database: once as ordinary rows, and once as an embedding the agent
          can search by meaning.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>What it contains</strong>
        </p>
        <div className="table-wrap" style={{ marginTop: '0.75rem' }}>
          <table style={{ fontSize: '1.05rem' }}>
            <thead>
              <tr>
                <th style={{ fontSize: '0.85rem' }}>Part</th>
                <th style={{ fontSize: '0.85rem' }}>What it is</th>
                <th style={{ fontSize: '0.85rem' }}>In our example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>name</code>
                </td>
                <td>A short label</td>
                <td><mark className="highlight-sea">&ldquo;revenue by state and month&rdquo;</mark></td>
              </tr>
              <tr>
                <td>
                  <code>description</code>
                </td>
                <td>The plain-English description</td>
                <td>Revenue means invoice line prices, and the state is the customer&rsquo;s delivery city</td>
              </tr>
              <tr>
                <td>SQL</td>
                <td>The full query</td>
                <td>
                  The six-table join that adds up <code>extendedprice</code> by state and month
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem' }}>
          <strong>Where it lives</strong>
        </p>
        <ul>
          <li>
            <strong>As ordinary records, which the app and its API read and edit.</strong> Our saved query is split
            across three small tables in the map&rsquo;s database. One, <code>custom_analysis</code>, holds its name
            and description. Another, <code>sql_query</code>, holds the SQL itself; it&rsquo;s the same table that keeps the
            queries Auto Ontology collects from your databases&rsquo; query history. A third table simply records which
            name goes with which SQL. Before anything is stored, Auto Ontology checks the SQL against its catalog,
            the list of tables and columns it read from your databases. A query that can&rsquo;t be read as SQL, or
            that names a table the catalog doesn&rsquo;t have, isn&rsquo;t saved.
          </li>
          <li>
            <strong>As an embedding, for the agent.</strong> At the same moment, Auto Ontology joins the name, the
            description and the SQL into one line of text and stores it in pgvector as an embedding, the same kind of
            meaning-based index the terms get. Deleting the analysis deletes its embedding too.
          </li>
        </ul>
        <SavedQueryTablesDiagram />
        <p style={{ marginTop: '1rem' }}>
          <strong>How the agent finds it</strong>
        </p>
        <p>
          Now let&rsquo;s ask our question again, this time with the saved query in the map:{' '}
          <mark className="highlight-green">
            &ldquo;What was revenue for the USB food flash drive &ndash; sushi roll in Pennsylvania in June 2015?&rdquo;
          </mark>{' '}
          As Stage 3 described, the reasoning model&rsquo;s first move is to search the map with <code>retrieve</code>.
          That tool looks in two ways at once: by meaning,
          using the embeddings, and by name, matching the question&rsquo;s words against the names in the map.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The search by meaning is what finds the saved query. Because its description and SQL are part of what&rsquo;s
          embedded, our question sits close to{' '}
          <mark className="highlight-sea">&ldquo;revenue by state and month&rdquo;</mark>, even though it says
          &ldquo;Pennsylvania&rdquo; and &ldquo;June 2015&rdquo; rather than &ldquo;state&rdquo; and &ldquo;month&rdquo;.
          The match comes back to the model as the analysis&rsquo;s name and description, with the SQL underneath. The
          model can then copy that SQL or adapt it, here by adding the filter for the sushi roll flash drive, before
          checking and running it, as the diagram below shows.
        </p>
        <p style={{ marginTop: '1rem' }}>
          In practice, the description does as much work as the SQL. It&rsquo;s part of what gets searched, so a clear
          description makes the analysis easier to find, and once it&rsquo;s found, the description is what tells the model
          which meaning of &ldquo;revenue&rdquo; to use. It&rsquo;s still a search, though, not a rule: the tool keeps
          only the closest few analyses, and the model decides whether to use what it&rsquo;s shown.
        </p>
        <AgentRetrievalDiagram />
        <h3 id="a-trick-question">A trick question</h3>
        <p>
          The saved query fixed a question the data could answer. Humair&rsquo;s second test asked one it couldn&rsquo;t:
          the return on ad spend for the same product. Wide World Importers
          has no advertising data at all, so the only honest answer is &ldquo;I can&rsquo;t&rdquo;. That&rsquo;s
          what came back. Humair asked this one through the project&rsquo;s MCP server, a plug-in point that lets
          an AI assistant call Auto Ontology&rsquo;s tools, such as <code>check_answerable</code>, directly (more on it
          in Trying it yourself):
        </p>
        <CodeCard code={adSpendExchange} lang="chat" file="MCP session" />
        <p style={{ marginTop: '1rem' }}>
          The coverage score is <code>check_answerable</code>&rsquo;s quick grade, made without running the full
          agent, of how many of the things the question names the map covers. Here it&rsquo;s half, because nothing
          covers ad spend. The agent then offered sales revenue instead, which is helpful. But in Humair&rsquo;s run it calculated that
          revenue from orders rather than invoices, yet another meaning of the word. Knowing which data is missing,
          it turns out, isn&rsquo;t the same as knowing what a word means.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="sharing-the-map">How is the map shared with other tools?</h2>
        <p>
          A map locked inside one tool would bring back the problem it was meant to solve. So Auto Ontology can
          export and import its map using{' '}
          <a href="https://ossie.apache.org/" target="_blank" rel="noreferrer">
            Apache Ossie
          </a>
          , a new open standard for exchanging semantic models.
          We can think of Ossie as a common file format for business meaning: terms, metrics and how they connect,
          written in YAML (a plain-text format of indented key-value pairs). According to Humair, it was started by
          Snowflake, dbt Labs and Salesforce and is now an Apache project, still at an early stage.
        </p>
        <p style={{ marginTop: '1rem' }}>
          An export comes as two main files, because it answers two different questions. Picture a new employee&rsquo;s
          first week. First they learn the business&rsquo;s vocabulary: what a customer is, what an invoice is, and
          that every customer has a delivery city. Separately, they learn where those things are kept: which table in
          the database holds the customers, which column holds the city, and how to add up revenue. An Ossie export
          writes each kind of knowledge into its own file:
        </p>
        <ul>
          <li>
            <code>ontology.yaml</code> is <strong>the vocabulary</strong>. It lists the business concepts and how they
            relate, in the words a business person would use.
          </li>
          <li>
            <code>semantic_model.yaml</code> is <strong>the where and how</strong>. It lists the tables and columns
            behind each concept, plus the metrics, saved calculations such as revenue.
          </li>
        </ul>
        <p>
          (A full export also has a small third file, <code>mapping.yaml</code>, which ties each concept in the first
          file to its table in the second.)
        </p>
        <OssieLayersDiagram />
        <p style={{ marginTop: '1rem' }}>
          If you use dbt, a popular tool for transforming data with SQL, the second file will look familiar: it is
          very close to a dbt semantic model. The new part is the vocabulary file on top.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Here&rsquo;s a trimmed piece of each file from the sample database, one per tab:
        </p>
        <CodeCard
          tabs={[
            { label: 'ontology.yaml', code: ossieOntologyYaml, lang: 'yaml' },
            { label: 'semantic_model.yaml', code: ossieSemanticModelYaml, lang: 'yaml' },
          ]}
        />
        <p style={{ marginTop: '1rem' }}>
          In plain English, the <code>ontology.yaml</code> tab says one thing: <em>a customer is something the
          business keeps records about, and each customer has one delivery city</em>. Here&rsquo;s how each line
          contributes to that sentence:
        </p>
        <ul>
          <li>
            <code>concept: Customer</code> names the concept. It&rsquo;s the same Customer term that lives in the map.
          </li>
          <li>
            <code>type: EntityType</code> says Customer is a thing the business keeps records about, not a plain value
            such as a date or a number.
          </li>
          <li>
            <code>relationships</code> lists how Customer connects to other concepts. The one shown is named{' '}
            <code>deliverycityid</code>, after the database column that holds the link, and its <code>roles</code>{' '}
            entry says the other end of the link is the City concept.
          </li>
          <li>
            <code>multiplicity: ManyToOne</code> says many customers can share one city, but each customer has only
            one delivery city.
          </li>
          <li>
            <code>verbalizes</code> spells the link out as a sentence a person can read, &ldquo;Customer has
            City&rdquo;. The curly braces mark which words are concepts.
          </li>
        </ul>
        <p>
          The <code>semantic_model.yaml</code> tab is trimmed to a single line: the name of one metric,{' '}
          <code>revenue_by_state_and_month</code>. In the full file, that metric also carries the calculation
          itself, and the rest of the file lists the tables and columns behind each concept. It&rsquo;s the saved
          query from Back to Pennsylvania, now in a form other tools can read.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="trying-it-yourself">Trying it yourself</h2>
        <p>
          You don&rsquo;t need a GPU. By default the AI models run on NVIDIA&rsquo;s cloud, so an ordinary laptop is
          fine. You&rsquo;ll need:
        </p>
        <ul>
          <li>
            <strong>Docker</strong>, which runs the web app, the two Python services and the database as containers
            on your machine.
          </li>
          <li>
            <strong>Git</strong>, to download the code.
          </li>
          <li>
            <strong>uv</strong>, a small Python tool that installs packages and runs scripts. Run{' '}
            <code>uv self-update</code> first, because the setup needs a recent version.
          </li>
          <li>
            <strong>A free NVIDIA API key</strong> from <code>build.nvidia.com</code>, which looks like{' '}
            <code>nvapi-&hellip;</code>.
          </li>
        </ul>
        <p>The quickstart, shortened here, comes down to four steps:</p>
        <CodeCard code={quickstart} lang="bash" />
        <p style={{ marginTop: '1rem' }}>
          There are two kinds of model you&rsquo;ll choose. The reasoning model, which runs the agent, can be swapped: NVIDIA&rsquo;s hosted models
          are the default, but Humair also ran it with GPT, Claude and Gemini models and with local models through
          Ollama. An <em>embedding model</em> powers the search, and that one has to stay on NVIDIA for now, because
          the database expects vectors of one exact size and other embedding models don&rsquo;t match it.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Expect some rough edges. Humair needed three fixes before his first map would build: two because
          NVIDIA&rsquo;s cloud API had changed underneath the tool, and one real bug that missed every link crossing
          from one part of the database to another (in the sample, 59 of the 98 links). Some of this may already be
          fixed; the project, for instance, now uses the embedding model he switched to as its default. He
          also told the map to skip 17 old archive tables (copies of customers, cities and so on, which had confused
          the AI into linking customers to outdated city data), and to ignore the &ldquo;last edited by&rdquo; column that
          almost every table points to, so it wouldn&rsquo;t treat that as a meaningful join.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Once it&rsquo;s running, you aren&rsquo;t limited to the built-in chat. The MCP server from the trick-question
          test lets AI assistants such as Claude Desktop or Cursor call tools like <code>check_answerable</code> and{' '}
          <code>ask_question</code>, and there&rsquo;s a REST API too.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="where-it-falls-short">Where it falls short</h2>
        <p>
          It&rsquo;s new, and the setup shows it. The map is a draft, not the truth: its terms are good guesses that
          still need someone who knows the business to check them. It only works on structured data in the
          databases it supports, not on documents or other unstructured data. It has no type hierarchy and no
          reasoner. And the project isn&rsquo;t accepting outside code contributions yet, though you can report
          issues.
        </p>
        <p style={{ marginTop: '1rem' }}>
          What persuades me, though, is the Pennsylvania result. The agent had all the data it needed from the
          start, and a capable model to read it. What it lacked was one sentence saying what &ldquo;revenue&rdquo;
          means. Auto Ontology&rsquo;s real contribution is to draft those sentences for every table, to make it easy
          for a person to say &ldquo;yes, that one&rsquo;s right&rdquo;, and to give them a place to add the ones it
          can&rsquo;t guess, like what &ldquo;revenue&rdquo; means.
        </p>
        <p style={{ marginTop: '1rem' }}>Smart models, it turns out, still need someone to tell them what we meant.</p>
      </section>

      <section className="article-panel">
        <h2 id="references">References</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem', paddingLeft: 0 }}>
          <li style={{ listStyle: 'none' }}>
            <a href="https://github.com/NVIDIA/auto-ontology" target="_blank" rel="noreferrer">
              NVIDIA Auto Ontology (GitHub)
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            <a href="https://github.com/NVIDIA/auto-ontology-eval" target="_blank" rel="noreferrer">
              Auto Ontology sample data and evaluation (GitHub)
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            <a
              href="https://learn.microsoft.com/en-us/sql/samples/wide-world-importers-what-is"
              target="_blank"
              rel="noreferrer"
            >
              Wide World Importers sample databases (Microsoft Learn)
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            <a href="https://ossie.apache.org/" target="_blank" rel="noreferrer">
              Apache Ossie
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            <a href="https://neo4j.com/docs/ontology-graph-spec/" target="_blank" rel="noreferrer">
              Ontology Graph Spec &mdash; Neo4j Docs
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            <a href="https://youtu.be/Zksf5xKOo-s" target="_blank" rel="noreferrer" style={linkStyle}>
              <YoutubeIcon />
              NVIDIA Auto Ontology: Give Your AI a Map of Your Database &mdash; Syed Humair (CodeUCraftAI, YouTube)
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
