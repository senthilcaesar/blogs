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
        aria-label="Two-layer diagram. On top, ontology.yaml, the new part: business concepts and how they relate. Underneath, semantic_model.yaml, the data layer: tables, columns and metrics, close to a dbt semantic model. Both export to and import from other tools."
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
          The new part
        </text>
        <text x="500" y="74" textAnchor="end" style={{ ...svgText, fontSize: 13, fontFamily: monoFont }}>
          ontology.yaml
        </text>
        <text x="40" y="102" style={{ ...svgMuted, fontSize: 13 }}>
          Business concepts and how they relate to each other
        </text>
        <rect x="20" y="134" width="500" height="78" rx="14" style={neutralBox} />
        <text x="40" y="164" style={{ ...svgText, fontSize: 17, fontWeight: 700 }}>
          The data layer
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
    db: 'A person marking a term as certified',
    onto: 'A curator signing off',
    std: '—',
  },
];

const ossieYaml = `# ontology.yaml
ontology:
- concept: Customer
  type: EntityType
  relationships:
  - name: deliverycityid
    roles:
    - concept: City
    multiplicity: ManyToOne
    verbalizes:
    - '{Customer} has {City}'

# semantic_model.yaml
metrics:
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
  { id: 'sharing-the-map', label: 'Sharing the map' },
  {
    id: 'how-it-builds-the-map',
    label: 'How it builds the map',
    items: [
      { id: 'stage-generate', label: 'Stage 1: Generate' },
      { id: 'stage-certify', label: 'Stage 2: Certify' },
      { id: 'stage-answer', label: 'Stage 3: Answer' },
    ],
  },
  { id: 'back-to-pennsylvania', label: 'Back to Pennsylvania' },
  { id: 'does-the-model-matter', label: 'Does the model matter?' },
  { id: 'trying-it-yourself', label: 'Trying it yourself' },
  { id: 'where-it-falls-short', label: 'Where it falls short' },
  { id: 'references', label: 'References' },
];

export function AutoOntologyArticle() {
  return (
    <>
      <ArticleToc groups={tocGroups} />

      <p className="article-lead">
        Ask an AI agent a simple question about your company&rsquo;s data, &ldquo;How much did we sell last
        June?&rdquo;, and it&rsquo;ll write a database query, run it and hand you a number. It sounds sure of
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
          Ontology&rsquo;s own quickstart uses Wide World Importers, a sample sales database from Microsoft with 51
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
          ontology keeps those types and adds two things: how things relate (a customer <em>places</em> an order)
          and the rules (every order must have a customer).
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
        <p>Auto Ontology&rsquo;s map holds three kinds of definition:</p>
        <ul>
          <li>
            <strong>Terms.</strong> Business concepts such as <em>Customer</em> or <em>Invoice Line</em>, each with a
            plain description and synonyms, mapped to the columns that hold them.
          </li>
          <li>
            <strong>SQL attributes.</strong> Saved, reviewed formulas that belong to a term, such as how to calculate
            revenue or a rolling total. The agent reuses them instead of reinventing them each time.
          </li>
          <li>
            <strong>Relationships.</strong> How tables join, worked out from the database&rsquo;s keys and from the
            data itself.
          </li>
        </ul>
        <p>
          If you already know the vocabulary of ontologies, each piece has a familiar counterpart. If you
          don&rsquo;t, the left column is all you need; the right-hand columns are the formal names you&rsquo;ll
          meet elsewhere. (OWL is the Web Ontology Language, the main standard for writing ontologies.)
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
          Two things you might expect are missing. The terms aren&rsquo;t arranged into types from broad to narrow,
          so there&rsquo;s no &ldquo;a t-shirt is a kind of clothing&rdquo;. And there&rsquo;s no reasoner, a program
          that works out new facts from the rules you&rsquo;ve given it. In the words of Syed Humair, who tested the
          tool on video, it&rsquo;s &ldquo;an ontology in spirit, built for one job&rdquo;: helping an AI agent write
          the correct SQL.
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
        <h2 id="sharing-the-map">How is the map shared with other tools?</h2>
        <p>
          A map locked inside one tool would bring back the problem it was meant to solve. So Auto Ontology can
          export and import its map using Apache Ossie, a new open standard for exchanging semantic models.
          We can think of Ossie as a common file format for business meaning: terms, metrics and how they connect,
          written in YAML (a plain-text format of indented key-value pairs). According to Humair, it was started by
          Snowflake, dbt Labs and Salesforce and is now an Apache project, still at an early stage.
        </p>
        <p style={{ marginTop: '1rem' }}>Here&rsquo;s a trimmed piece of an export from the sample database:</p>
        <CodeCard code={ossieYaml} lang="yaml" file="Apache Ossie export" />
        <p style={{ marginTop: '1rem' }}>
          Read it from the top. <code>concept: Customer</code> is a term. Its relationship, named after the{' '}
          <code>deliverycityid</code> column, points to the City concept. <code>ManyToOne</code> says many customers
          can share one city, and <code>verbalizes</code> gives the link as a plain sentence, &ldquo;Customer has
          City&rdquo;. Below that, the semantic model file holds the metrics, like{' '}
          <code>revenue_by_state_and_month</code>.
        </p>
        <OssieLayersDiagram />
        <p style={{ marginTop: '1rem' }}>
          If you use dbt, a popular tool for transforming data with SQL, the bottom layer will look familiar: it is
          very close to a dbt semantic model. The new part is the ontology file on top, which describes the business
          concepts and how they relate.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="how-it-builds-the-map">How does it build the map?</h2>
        <p>Auto Ontology works in three stages: it generates a draft, people certify it, and the agent answers from it.</p>
        <PipelineDiagram />

        <h3 id="stage-generate">Stage 1: Generate</h3>
        <p>
          First, a background service reads each database: its tables, columns, keys and some sample values. This
          part is plain code, with no AI involved. Then an AI model looks at the tables one at a time, drafts a
          business term and description for each, and suggests links between tables that nobody declared in the
          database. Plain code then checks those suggested links against the real data.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Going table by table takes time, and the model you choose matters a lot. On the sample database,
          Humair&rsquo;s build took about two and a half minutes with Anthropic&rsquo;s Claude Haiku, and more than
          20 minutes with NVIDIA&rsquo;s free hosted model. That works out to roughly three seconds per table with
          Haiku. At that rate, a company with 5,000 tables would wait about four hours for a first draft.
        </p>
        <p style={{ marginTop: '1rem' }}>
          His build left out 17 old archive tables (copies of customers, cities and so on, which had confused the AI
          into linking customers to outdated city data). It produced 34 business terms, one per remaining table, and
          92 links between them, which you can explore as a graph in the web app.
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
        <p>When you ask a question in plain English, the agent:</p>
        <ol>
          <li>Works out what you&rsquo;re asking and picks out the things you named.</li>
          <li>Searches the map for matching terms, columns and saved formulas.</li>
          <li>Writes the SQL from what it found.</li>
          <li>Checks the filter values and the query against the database, and repairs the SQL if a check fails.</li>
          <li>Runs the query and returns the answer, along with the SQL and the steps it took.</li>
        </ol>
        <p>
          If the map has nothing that fits the question, the agent says the data can&rsquo;t answer it rather than
          inventing something.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="back-to-pennsylvania">Back to Pennsylvania</h2>
        <p>
          So what happens to our question? According to the project&rsquo;s README, the agent matches
          &ldquo;revenue&rdquo;, the product and the state to terms in the map, follows their relationships to find
          the joins, and comes back with &ldquo;$588.80, from 3 invoice lines&rdquo;, along with this query:
        </p>
        <CodeCard code={answerSql} lang="sql" />
        <p style={{ marginTop: '1rem' }}>
          That&rsquo;s Reading A: invoice line prices, and the customer&rsquo;s delivery city. Humair checked the
          figure by hand against the database and got the same answer. But when he asked again and again, about one
          time in three the agent drifted to Reading B, adding up whole payments with tax and using the
          supplier&rsquo;s city. Same question, different meaning, the same confident tone.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The fix was one human-written example: a saved query named &ldquo;revenue by state and month&rdquo;, with a
          plain note saying that revenue means invoice line prices and that the state belongs to the
          customer&rsquo;s delivery city. After that, it was right every time in his tests. Crucially, nobody changed
          the model. It simply had the meaning written down.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The second test was a trick question: the return on ad spend for the same product. Wide World Importers
          has no advertising data at all, so the only honest answer is &ldquo;I can&rsquo;t&rdquo;. That&rsquo;s
          what came back:
        </p>
        <CodeCard code={adSpendExchange} lang="chat" file="MCP session" />
        <p style={{ marginTop: '1rem' }}>
          It then offered sales revenue instead, which is helpful. But in Humair&rsquo;s run it calculated that
          revenue from orders rather than invoices, yet another meaning of the word. The agent knew what data was
          missing; it still needed the meaning written down.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="does-the-model-matter">Does the AI model matter?</h2>
        <p>
          Auto Ontology uses two kinds of model. A <em>chat model</em> reads tables and writes SQL, and you can swap
          it: NVIDIA&rsquo;s hosted models are the default, but Humair also ran it with GPT, Claude and Gemini models
          and with local models through Ollama. An <em>embedding model</em> powers the search, and that one has to
          stay on NVIDIA for now, because the database expects vectors of one exact size and other embedding models
          don&rsquo;t match it.
        </p>
        <p style={{ marginTop: '1rem' }}>
          He then asked the Pennsylvania question to 11 chat models, three times each, with and without the example
          query. Without it, almost every model got it wrong. With it, almost every model got it right. Only one,
          Claude Sonnet, was right every time with no help, and even that depended on the map: on a map built by
          Haiku instead, Sonnet was right two times out of three. Speed varied just as much, from about 30 seconds
          per answer with Sonnet to four and a half minutes with NVIDIA&rsquo;s free default model.
        </p>
        <p style={{ marginTop: '1rem' }}>
          To be sure, that&rsquo;s one question asked many times, so it&rsquo;s a quick check rather than a ranking.
          But the pattern was clear, and Humair put it in one line: context mattered more than the model.
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
        <p>The quickstart, shortened from the README, comes down to four steps:</p>
        <CodeCard code={quickstart} lang="bash" />
        <p style={{ marginTop: '1rem' }}>
          Expect some rough edges. Humair needed three fixes before his first map would build: two because
          NVIDIA&rsquo;s cloud API had changed underneath the tool, and one real bug that missed every link crossing
          from one part of the database to another (in the sample, 59 of the 98 links). Some of this may already be
          fixed; the current README, for instance, now uses the embedding model he switched to as its default. He
          also told the map to skip the archive tables and to ignore the &ldquo;last edited by&rdquo; column that
          almost every table points to, so it wouldn&rsquo;t treat that as a meaningful join.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Once it&rsquo;s running, you aren&rsquo;t limited to the built-in chat. The project also ships an MCP
          server, a standard plug-in point that lets AI assistants such as Claude Desktop or Cursor call tools like{' '}
          <code>check_answerable</code> and <code>ask_question</code>, as well as a REST API.
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
          means. Auto Ontology&rsquo;s real contribution is to write the first draft of those sentences for every
          table, and to make it easy for a person to say &ldquo;yes, that one&rsquo;s right&rdquo;.
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
            <a href="https://ossie.apache.org/" target="_blank" rel="noreferrer">
              Apache Ossie
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
