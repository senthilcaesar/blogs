import { Link } from 'react-router-dom';
import { CodeCard } from '../../components/CodeCard';
import { ArticleToc } from '../../components/ArticleToc';

const comparisonImg = new URL('../../../images/semantic-model-ontology-knowledge-graph.jpg', import.meta.url).href;
const ontologyFlowImg = new URL('../../../images/semantic-model-to-ontology.png', import.meta.url).href;

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
const figureStyle = {
  margin: '1.25rem 0 0',
  padding: '1rem',
  border: '1px solid var(--border)',
  borderRadius: '16px',
};

function ArrowMarker({ id, color = 'var(--text-muted)' }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" style={{ fill: color }} />
    </marker>
  );
}

const edgeStyle = { stroke: 'var(--text-muted)', strokeWidth: 2, fill: 'none' };
const monoFont = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function TaxonomyDiagram() {
  const box = {
    fill: 'color-mix(in srgb, var(--text-muted) 10%, transparent)',
    stroke: 'var(--text-muted)',
    strokeWidth: 1.5,
  };
  const types = [
    { x: 20, title: 'T-shirt' },
    { x: 285, title: 'Clothing' },
    { x: 550, title: 'Product' },
  ];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 170"
        role="img"
        aria-label="Taxonomy diagram. T-shirt is a kind of Clothing. Clothing is a kind of Product."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id="tax-arrow" />
        </defs>
        <text x="20" y="28" style={{ ...svgMuted, fontSize: 13, letterSpacing: '0.08em' }}>
          TAXONOMY: WHAT&rsquo;S A KIND OF WHAT
        </text>
        {types.map((t) => (
          <g key={t.title}>
            <rect x={t.x} y="58" width="150" height="56" rx="28" style={box} />
            <text x={t.x + 75} y="92" textAnchor="middle" style={{ ...svgText, fontSize: 18, fontWeight: 700 }}>
              {t.title}
            </text>
          </g>
        ))}
        <line x1="174" y1="86" x2="281" y2="86" style={edgeStyle} markerEnd="url(#tax-arrow)" />
        <text x="227" y="76" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontStyle: 'italic' }}>
          is a kind of
        </text>
        <line x1="439" y1="86" x2="546" y2="86" style={edgeStyle} markerEnd="url(#tax-arrow)" />
        <text x="492" y="76" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontStyle: 'italic' }}>
          is a kind of
        </text>
        <text x="360" y="152" textAnchor="middle" style={{ ...svgMuted, fontSize: 13 }}>
          Narrow on the left, broad on the right. It can&rsquo;t say who bought the t-shirt.
        </text>
      </svg>
      <figcaption>A taxonomy only sorts things into types.</figcaption>
    </figure>
  );
}

function OntologyDiagram() {
  const box = {
    fill: 'color-mix(in srgb, var(--accent-purple) 12%, transparent)',
    stroke: 'var(--accent-purple)',
    strokeWidth: 2,
  };
  const classes = [
    { x: 20, title: 'Customer', props: 'id · name · region' },
    { x: 285, title: 'Order', props: 'id · date · status' },
    { x: 550, title: 'Product', props: 'id · name · price' },
  ];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 240"
        role="img"
        aria-label="Ontology diagram. Three concept boxes: Customer, Order and Product. Clothing and T-shirt are kinds of Product. Customer places Order. Order lists Product. Rule: every Order must have a Customer."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id="onto-arrow" />
          <ArrowMarker id="onto-arrow-accent" color="var(--accent)" />
        </defs>
        <text x="20" y="28" style={{ ...svgMuted, fontSize: 13, letterSpacing: '0.08em' }}>
          TYPES, RELATIONSHIPS &amp; RULES
        </text>
        <text x="625" y="52" textAnchor="middle" style={{ ...svgMuted, fontSize: 12 }}>
          kinds: Clothing, T-shirt&hellip;
        </text>
        {classes.map((c) => (
          <g key={c.title}>
            <rect x={c.x} y="64" width="150" height="80" rx="12" style={box} />
            <text x={c.x + 75} y="98" textAnchor="middle" style={{ ...svgText, fontSize: 19, fontWeight: 700 }}>
              {c.title}
            </text>
            <text x={c.x + 75} y="124" textAnchor="middle" style={{ ...svgMuted, fontSize: 12 }}>
              {c.props}
            </text>
          </g>
        ))}
        <line
          x1="172"
          y1="104"
          x2="281"
          y2="104"
          style={{ ...edgeStyle, stroke: 'var(--accent)' }}
          markerEnd="url(#onto-arrow-accent)"
        />
        <text x="227" y="94" textAnchor="middle" style={{ ...svgText, fontSize: 14, fontStyle: 'italic' }}>
          places
        </text>
        <line x1="437" y1="104" x2="546" y2="104" style={edgeStyle} markerEnd="url(#onto-arrow)" />
        <text x="492" y="94" textAnchor="middle" style={{ ...svgText, fontSize: 14, fontStyle: 'italic' }}>
          lists
        </text>
        <rect
          x="200"
          y="162"
          width="320"
          height="32"
          rx="16"
          style={{ fill: 'color-mix(in srgb, var(--accent) 16%, transparent)', stroke: 'var(--accent)', strokeWidth: 1.5 }}
        />
        <text x="360" y="183" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontWeight: 600 }}>
          Rule: every Order must have a Customer
        </text>
        <text x="360" y="226" textAnchor="middle" style={{ ...svgMuted, fontSize: 13 }}>
          A blueprint: it defines what a Customer, Order and Product are, not which ones exist.
        </text>
      </svg>
      <figcaption>An ontology keeps the types, then adds how things relate and the rules they must follow.</figcaption>
    </figure>
  );
}

function PersonIcon({ cx, cy }) {
  const stroke = { stroke: 'var(--text)', strokeWidth: 2, fill: 'none' };
  return (
    <g>
      <circle cx={cx} cy={cy - 7} r="6" style={stroke} />
      <path d={`M${cx - 11} ${cy + 12} a11 9 0 0 1 22 0`} style={stroke} />
    </g>
  );
}

function RobotIcon({ cx, cy }) {
  const stroke = { stroke: 'var(--text)', strokeWidth: 2, fill: 'none' };
  return (
    <g>
      <rect x={cx - 12} y={cy - 8} width="24" height="18" rx="4" style={stroke} />
      <line x1={cx} y1={cy - 8} x2={cx} y2={cy - 14} style={stroke} />
      <circle cx={cx - 5} cy={cy + 1} r="2" style={{ fill: 'var(--text)' }} />
      <circle cx={cx + 5} cy={cy + 1} r="2" style={{ fill: 'var(--text)' }} />
    </g>
  );
}

function SharedDefinitionDiagram() {
  const teamBox = {
    fill: 'color-mix(in srgb, var(--text-muted) 8%, transparent)',
    stroke: 'var(--text-muted)',
    strokeWidth: 1.5,
  };
  const defBox = {
    fill: 'color-mix(in srgb, var(--accent-purple) 12%, transparent)',
    stroke: 'var(--accent-purple)',
    strokeWidth: 2,
  };
  const readerRing = {
    fill: 'color-mix(in srgb, var(--accent) 12%, transparent)',
    stroke: 'var(--accent)',
    strokeWidth: 2,
  };
  const teams = [
    { x: 20, team: 'Sales', line1: 'Bought something', line2: 'in the last year' },
    { x: 255, team: 'Marketing', line1: 'Opened one of our', line2: 'emails this month' },
    { x: 490, team: 'Finance', line1: 'Paid an invoice', line2: 'this quarter' },
  ];
  const dashed = { ...edgeStyle, strokeWidth: 1.5, strokeDasharray: '4 4' };
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 330"
        role="img"
        aria-label="Shared definition diagram. Sales, Marketing and Finance each define active customer differently. The ontology replaces them with one written definition of Active customer, which people and AI agents both read, so they get the same answer."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <text x="20" y="28" style={{ ...svgMuted, fontSize: 13, letterSpacing: '0.08em' }}>
          &ldquo;ACTIVE CUSTOMER&rdquo;: SAME TWO WORDS, THREE MEANINGS
        </text>
        {teams.map((t) => (
          <g key={t.team}>
            <rect x={t.x} y="44" width="210" height="80" rx="12" style={teamBox} />
            <text x={t.x + 105} y="70" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700 }}>
              {t.team}
            </text>
            <text x={t.x + 105} y="92" textAnchor="middle" style={{ ...svgMuted, fontSize: 12.5 }}>
              {t.line1}
            </text>
            <text x={t.x + 105} y="110" textAnchor="middle" style={{ ...svgMuted, fontSize: 12.5 }}>
              {t.line2}
            </text>
            <line x1={t.x + 105} y1="124" x2="360" y2="172" style={dashed} />
          </g>
        ))}
        <rect x="215" y="172" width="290" height="86" rx="14" style={defBox} />
        <text x="360" y="200" textAnchor="middle" style={{ ...svgText, fontSize: 18, fontWeight: 700 }}>
          Active customer
        </text>
        <text x="360" y="220" textAnchor="middle" style={{ ...svgMuted, fontSize: 12, fontFamily: monoFont }}>
          skos:definition
        </text>
        <text x="360" y="242" textAnchor="middle" style={{ ...svgText, fontSize: 13 }}>
          &ldquo;Placed a paid order in the last 12 months&rdquo;
        </text>
        <line x1="215" y1="215" x2="122" y2="232" style={edgeStyle} />
        <line x1="505" y1="215" x2="598" y2="232" style={edgeStyle} />
        <circle cx="90" cy="238" r="32" style={readerRing} />
        <PersonIcon cx={90} cy={238} />
        <text x="90" y="290" textAnchor="middle" style={{ ...svgText, fontSize: 14, fontWeight: 600 }}>
          People
        </text>
        <circle cx="630" cy="238" r="32" style={readerRing} />
        <RobotIcon cx={630} cy={240} />
        <text x="630" y="290" textAnchor="middle" style={{ ...svgText, fontSize: 14, fontWeight: 600 }}>
          AI agents
        </text>
        <text x="360" y="318" textAnchor="middle" style={{ ...svgMuted, fontSize: 13 }}>
          Written down once, read the same way by both, so both get the same answer.
        </text>
      </svg>
      <figcaption>The ontology writes down what each term means, so nobody has to guess.</figcaption>
    </figure>
  );
}

const taxonomyTurtle = `:TShirt   rdfs:subClassOf :Clothing .
:Clothing rdfs:subClassOf :Product .`;

const relationsTurtle = `:places a owl:ObjectProperty ;
  rdfs:domain :Customer ;
  rdfs:range  :Order .

:lists a owl:ObjectProperty ;
  rdfs:domain :Order ;
  rdfs:range  :Product .`;

const orderShape = `:OrderShape a sh:NodeShape ;
  sh:targetClass :Order ;
  sh:property [
    sh:path [ sh:inversePath :places ] ;
    sh:class :Customer ;
    sh:minCount 1 ] .`;

const definitionTurtle = `:ActiveCustomer a owl:Class ;
  rdfs:subClassOf :Customer ;
  skos:definition "A customer who placed a paid order in the last 12 months." .`;

function KnowledgeGraphDiagram() {
  const node = {
    fill: 'color-mix(in srgb, var(--accent) 14%, transparent)',
    stroke: 'var(--accent)',
    strokeWidth: 2,
  };
  const nodes = [
    { cx: 95, type: 'Customer', id: 'C102', prop: 'region: EU' },
    { cx: 360, type: 'Order', id: 'O501', prop: 'status: shipped' },
    { cx: 625, type: 'Product', id: 'P20', prop: 'name: Laptop Pro' },
  ];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 210"
        role="img"
        aria-label="Knowledge graph diagram. Node Customer C102 has a PLACED relationship to node Order O501, which has a CONTAINS relationship to node Product P20."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id="kg-arrow" />
        </defs>
        <text x="20" y="28" style={{ ...svgMuted, fontSize: 13, letterSpacing: '0.08em' }}>
          ACTUAL ENTITIES &amp; FACTS
        </text>
        {nodes.map((n) => (
          <g key={n.id}>
            <text x={n.cx} y="62" textAnchor="middle" style={{ ...svgMuted, fontSize: 13, letterSpacing: '0.06em' }}>
              {n.type.toUpperCase()}
            </text>
            <circle cx={n.cx} cy="115" r="42" style={node} />
            <text x={n.cx} y="122" textAnchor="middle" style={{ ...svgText, fontSize: 20, fontWeight: 700 }}>
              {n.id}
            </text>
            <text x={n.cx} y="182" textAnchor="middle" style={{ ...svgMuted, fontSize: 13 }}>
              {n.prop}
            </text>
          </g>
        ))}
        <line x1="139" y1="115" x2="314" y2="115" style={edgeStyle} markerEnd="url(#kg-arrow)" />
        <text x="227" y="105" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em' }}>
          PLACED
        </text>
        <line x1="404" y1="115" x2="579" y2="115" style={edgeStyle} markerEnd="url(#kg-arrow)" />
        <text x="492" y="105" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em' }}>
          CONTAINS
        </text>
      </svg>
      <figcaption>Knowledge graph: real records connected by the relationships the ontology allows.</figcaption>
    </figure>
  );
}

const ontologyVsGraph = [
  {
    aspect: 'Question it answers',
    ontology: 'What kinds of things exist, and how are they allowed to relate?',
    graph: 'Which actual things exist, and how are they connected right now?',
  },
  {
    aspect: 'What it contains',
    ontology: 'Concepts and rules: Customer, Order, Product, “an Order belongs to one Customer”',
    graph: 'Real records and links: C102 placed O501, O501 contains P20',
  },
  {
    aspect: 'Everyday analogy',
    ontology: 'A blank form template',
    graph: 'The stack of filled-in forms',
  },
  {
    aspect: 'Size and change',
    ontology: 'Small; changes only when the business itself changes',
    graph: 'Large; grows every day as new data arrives',
  },
  {
    aspect: 'Who builds it',
    ontology: 'Domain experts and data architects agree on it',
    graph: 'Data pipelines load it from CRM, ERP and other systems',
  },
  {
    aspect: 'What it achieves',
    ontology: 'Shared meaning: everyone (and every AI agent) uses the same definitions',
    graph: 'Connected facts: you can look up and trace real relationships',
  },
  {
    aspect: 'Example question',
    ontology: '“Can an order exist without a customer?” → No',
    graph: '“Which products did customer C102 buy?” → P20',
  },
  {
    aspect: 'Without it',
    ontology: 'Data is linked, but each team means something different by “customer”',
    graph: 'Definitions exist, but there are no real records to reason over',
  },
];

const tocGroups = [
  { id: 'semantic-model', label: 'Semantic Model' },
  {
    id: 'ontology',
    label: 'Ontology',
    items: [
      { id: 'taxonomy', label: 'First, a taxonomy' },
      { id: 'what-an-ontology-adds', label: 'What an ontology adds' },
      { id: 'one-map-two-readers', label: 'One map, two readers' },
      { id: 'tables-to-business-context', label: 'From tables to business context' },
    ],
  },
  { id: 'knowledge-graph', label: 'Knowledge Graph' },
  { id: 'ontology-vs-knowledge-graph', label: 'Ontology vs Knowledge Graph' },
  { id: 'how-they-work-together', label: 'How they work together' },
  { id: 'references', label: 'References' },
];

export function SemanticModelOntologyKnowledgeGraphArticle() {
  return (
    <>
      <ArticleToc groups={tocGroups} />

      <p className="article-lead">
        Data leaders and AI architects often use three terms interchangeably when building an enterprise context
        layer: Semantic Models, Ontologies, and Knowledge Graphs.
      </p>
      <p className="article-lead">
        While they all add business context to raw data, treating them as synonyms leads to failed data projects
        and brittle AI agents. They are complementary tools designed for fundamentally different jobs.
      </p>

      <figure style={{ margin: '0 0 1.75rem' }}>
        <img
          src={comparisonImg}
          alt="Three columns. Semantic Model: how structured data is understood and queried (business meaning, metrics and calculations, joins and relationships, enables natural-language queries). Ontology: defines business concepts and allowed relationships (shared vocabulary, business concepts, relationship rules, conceptual model). Knowledge Graph: connects actual enterprise entities and facts (real entities, connected facts, traversable links, enterprise context). Footer: related, complementary, not interchangeable."
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
        <figcaption>Related, complementary, not interchangeable.</figcaption>
      </figure>

      <section className="article-panel">
        <h2 id="semantic-model">Semantic Model - Make data meaningful</h2>
        <p>
          A semantic model translates technical data structures into business-friendly concepts, relationships,
          and calculations. It helps people and software interpret data consistently.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Example:</strong> Instead of every analyst or agent writing{' '}
          <code>SUM(invoice_amount) WHERE status &lt;&gt; 'cancelled' AND is_test = false</code>, the semantic
          model defines <strong>Net Revenue</strong> once, and anyone can simply ask, &ldquo;What was net revenue
          this quarter?&rdquo;
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Think of it as:</strong> The business-friendly interface to your data.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Why it matters:</strong> Before an executive business review, your VP of Sales asks an AI
          assistant, &ldquo;What was net revenue for our top enterprise accounts last quarter?&rdquo; In seconds,
          the agent returns a polished chart. Unfortunately, the numbers don&rsquo;t match the finance report.
          Why? Because the agent counted cancelled orders as revenue and pulled from an unvalidated staging
          table.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The agent didn&rsquo;t fail because of the LLM, or because it couldn&rsquo;t translate a user question
          into a query. It failed because it didn&rsquo;t understand your business. The real kicker is that this
          understanding often already exists in the form of a semantic model in a Power BI / Microsoft Fabric,
          Looker, dbt, Snowflake, Databricks, or SAP system. But because each definition stays locked inside its own tool, every agent
          guesses at it&hellip; and often gets it wrong.
        </p>
        <p style={{ marginTop: '1rem' }}>
          By grounding your AI agents in those models, they get the same business definitions your analysts rely
          on, so their answers line up with the numbers your business trusts.
        </p>
        <div className="article-panel article-panel--accent">
          <p>
            <strong>One option:</strong> bring the semantic models from all of those tools into one{' '}
            <mark>context graph</mark>, a connected map of your metric definitions, data sources, and business
            rules that any agent can query. Reconcile conflicting definitions along the way, so every agent draws
            on a single, trusted version of each metric.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2 id="ontology">Ontology - Define what things mean</h2>
        <p>
          Ask your sales, marketing and finance teams the same question, &ldquo;What&rsquo;s an active
          customer?&rdquo;, and you&rsquo;ll probably get three answers. Sales means anyone who bought something in
          the last year. Marketing means anyone who opened an email this month. Finance means anyone with a paid
          invoice this quarter. Now ask an AI agent how many active customers you have. Which definition does it
          use? It has to guess, however good the model is.
        </p>
        <p style={{ marginTop: '1rem' }}>
          An ontology is the fix for that guess. Simply put, it&rsquo;s a shared map of the things your business
          cares about and how they connect, written so that people and machines read it the same way. To see what
          goes into that map, it helps to start with something simpler that people often confuse it with.
        </p>
        <div className="article-panel article-panel--accent">
          <p>
            <strong>A business-facing ontology</strong> is a simple description of the real-world concepts of your
            business and how they relate, articulated in a way that makes sense to human users.
          </p>
        </div>

        <h3 id="taxonomy">First, a taxonomy</h3>
        <p>
          A taxonomy sorts things into types, from broad to narrow. A cat is a kind of mammal, and a mammal is a
          kind of animal. A business works the same way: if you sell t-shirts, a t-shirt is a kind of clothing,
          and clothing is a kind of product. That&rsquo;s all a taxonomy says: what&rsquo;s a kind of what.
        </p>
        <TaxonomyDiagram />
        <p style={{ marginTop: '1rem' }}>
          That&rsquo;s useful, because a report on product revenue now knows to include t-shirt sales. But a
          taxonomy is silent about everything else. It can&rsquo;t tell you that someone bought the t-shirt, that
          the purchase was an order, or that an order without a buyer is a mistake.
        </p>

        <h3 id="what-an-ontology-adds">What an ontology adds</h3>
        <p>
          An ontology keeps those types and adds two things on top: how things relate, and the rules they must
          follow. Our running example is a shop with three concepts, Customer, Order and Product. In plain words:
          a customer places an order, an order lists products, and every order must have a customer.
        </p>
        <OntologyDiagram />
        <p style={{ marginTop: '1rem' }}>
          There are open standards for writing each of these three layers down, and you&rsquo;ll see their names
          in most ontology tools:
        </p>
        <ul>
          <li>
            <strong>Types</strong>, written with <code>rdfs:subClassOf</code>. RDFS (RDF Schema) is the basic
            vocabulary for saying &ldquo;this kind of thing is a narrower kind of that one&rdquo;.
          </li>
          <li>
            <strong>Relationships</strong>, written with <code>owl:ObjectProperty</code>. OWL (the Web Ontology
            Language) adds named links between concepts, like <em>places</em> and <em>lists</em>.
          </li>
          <li>
            <strong>Rules</strong>, written in SHACL (the Shapes Constraint Language), with checks such as{' '}
            <code>sh:minCount</code>, &ldquo;at least this many&rdquo;.
          </li>
        </ul>
        <p>
          All three are usually written in Turtle, a compact text format where each line is a small statement:
          a subject, a verb and an object, ending with a full stop. The taxonomy above takes just two lines:
        </p>
        <CodeCard code={taxonomyTurtle} lang="turtle" />
        <p style={{ marginTop: '1rem' }}>
          Relationships take a little more. Each one names the kind of thing the arrow starts from, called its{' '}
          <em>domain</em>, and the kind of thing it points to, called its <em>range</em>:
        </p>
        <CodeCard code={relationsTurtle} lang="turtle" />
        <p style={{ marginTop: '1rem' }}>
          In practice, an agent that reads this knows the only way to get from a customer to a product is through
          an order. It doesn&rsquo;t have to guess which tables join to which.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The rule, &ldquo;every order must have a customer&rdquo;, is written as a SHACL <em>shape</em>, which
          we can picture as a stencil every Order must fit. The <em>places</em> arrow points from customer to
          order, so to check it from the order&rsquo;s side, the shape follows the arrow backwards (that&rsquo;s
          what <code>sh:inversePath</code> means) and demands at least one customer at the other end:
        </p>
        <CodeCard code={orderShape} lang="turtle" file="SHACL shape" />
        <p style={{ marginTop: '1rem' }}>
          What this means is that an order loaded without a customer gets flagged as broken data before an agent
          ever counts it as revenue.
        </p>

        <h3 id="one-map-two-readers">One map, two readers</h3>
        <p>
          Notice that the diagram and the Turtle say exactly the same thing. The boxes and arrows are for people,
          and the text is for machines. That&rsquo;s the &ldquo;shared&rdquo; in shared map: every team reads
          one version, and so does every AI agent, without anyone translating between them.
        </p>
        <p style={{ marginTop: '1rem' }}>
          That brings us back to the active customer. An ontology writes down what each term means, usually with{' '}
          <code>skos:definition</code>. SKOS (the Simple Knowledge Organization System) is a small vocabulary for
          labels, synonyms and definitions. The business picks one meaning, writes it down once, and every reader
          uses it:
        </p>
        <CodeCard code={definitionTurtle} lang="turtle" />
        <SharedDefinitionDiagram />
        <p style={{ marginTop: '1rem' }}>
          This matters more than it might seem. In one hands-on test of NVIDIA&rsquo;s open-source Auto Ontology
          tool (linked in the references), the same revenue question came back wrong about one time in three: the
          agent sometimes summed whole payments including tax, and sometimes used the supplier&rsquo;s city
          instead of the customer&rsquo;s. Adding a single human-written note that said what &ldquo;revenue&rdquo;
          meant made it right on every later run. That was one question asked many times, so it&rsquo;s a quick
          check rather than a benchmark. Still, the presenter&rsquo;s conclusion is hard to argue with: context
          mattered more than the model.
        </p>
        <p style={{ marginTop: '1rem' }}>
          To be sure, not every tool that calls itself an ontology uses these standards. Auto Ontology, for
          example, keeps its terms and links in ordinary Postgres tables and shares them as YAML files, and it
          has no broad-to-narrow type hierarchy and no reasoner (a program that works out new facts from the
          rules). It&rsquo;s an ontology in spirit, built for one job: helping an agent write correct SQL. The
          idea is the same either way. Write the meaning down, and stop making the machine guess.
        </p>
        <div className="article-panel article-panel--accent">
          <p>
            <strong>Want to see one in action?</strong>{' '}
            <Link to="/posts/auto-ontology">Auto Ontology</Link> walks through how NVIDIA&rsquo;s tool drafts this
            kind of map straight from a database, how people certify it, and how an agent uses it to answer a real
            revenue question.
          </p>
        </div>
        <p style={{ marginTop: '1rem' }}>
          <strong>Think of it as:</strong> The blueprint and rulebook for business knowledge.
        </p>

        <div
          style={{
            margin: '2rem 0 0',
            paddingLeft: '1.25rem',
          }}
        >
        <h3 id="tables-to-business-context" style={{ marginTop: 0 }}>From Tables to Business Context</h3>
        <ul>
          <li>
            <strong>Tables</strong> tell you where and how the data is stored.
          </li>
          <li>
            <strong>Semantic models</strong> tell you how that data is structured to analyze and answer specific
            business questions.
          </li>
          <li>
            <strong>Ontologies</strong> tell you what that business means. In platforms like Microsoft Fabric, the
            ontology becomes the business context layer on top of the semantic model, and it lets AI agents reason
            across <em>many</em> semantic models.
          </li>
        </ul>
        <figure style={{ margin: '1.5rem 0 0' }}>
          <img
            src={ontologyFlowImg}
            alt="Flow diagram: a Semantic model feeds an analytical engine (Power BI icon), producing Analytical Engine output. That flows down into an Ontology, which feeds an AI assistant (Copilot icon), producing Business Context."
            style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
          />
          <figcaption>The semantic model powers analytics; the ontology turns it into business context for AI.</figcaption>
        </figure>
        </div>
      </section>

      <section className="article-panel">
        <h2 id="knowledge-graph">Knowledge Graph - Connect actual facts</h2>
        <p>
          A knowledge graph represents specific entities and the relationships between them. It connects
          information from different systems, making it possible to explore how people, products, transactions,
          and events relate.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Example:</strong> Customer C102 placed Order O501, which contains Product P20.
        </p>
        <KnowledgeGraphDiagram />
        <p style={{ marginTop: '1rem' }}>
          <strong>Think of it as:</strong> The populated network of connected business facts.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="ontology-vs-knowledge-graph">Ontology vs Knowledge Graph - What&rsquo;s the Difference?</h2>
        <p>
          They look alike because both talk about customers, orders and products. The difference is simple: the
          ontology describes the <em>kinds</em> of things, while the knowledge graph holds the <em>actual</em>{' '}
          things.
        </p>
        <div className="article-panel article-panel--accent">
          <p>
            <strong>The ontology says what <em>can</em> be true. The knowledge graph records what <em>is</em>{' '}
            true.</strong>
          </p>
        </div>
        <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Ontology</th>
                <th>Knowledge Graph</th>
              </tr>
            </thead>
            <tbody>
              {ontologyVsGraph.map((row) => (
                <tr key={row.aspect}>
                  <td>
                    <strong>{row.aspect}</strong>
                  </td>
                  <td>{row.ontology}</td>
                  <td>{row.graph}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem' }}>
          In practice, the ontology acts as the schema for the knowledge graph: every node and link in the graph
          should fit a concept and relationship the ontology defines. You need both. One gives the meaning, the
          other gives the facts.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="how-they-work-together">How They Work Together</h2>
        <p>
          Consider an enterprise AI agent asked: <em>&ldquo;Which high-value customers in the EU are at risk of
          non-compliance?&rdquo;</em>
        </p>
        <ul>
          <li>
            The <strong>Ontology</strong> tells the agent what &ldquo;non-compliance&rdquo; means according to
            corporate policy and what attributes define a customer.
          </li>
          <li>
            The <strong>Knowledge Graph</strong> navigates actual customer records, tracing which EU accounts are
            connected to unreviewed third-party vendors.
          </li>
          <li>
            The <strong>Semantic Model</strong> reliably calculates the exact customer revenue numbers to
            determine who qualifies as &ldquo;high-value&rdquo; without hallucinating SQL joins.
          </li>
        </ul>
        <p>
          Without the semantic model, your AI calculates wrong metrics. Without the ontology, it lacks the logic
          to reason about operational rules. Without the knowledge graph, it cannot navigate connections between
          real-world records. Building a robust enterprise context layer requires orchestrating all three.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Think of these three as parts of a single team rather than competitors. The semantic model handles the
          math so your numbers and metrics stay consistent. The ontology acts as the rulebook and dictionary,
          defining what things mean and how they relate. The knowledge graph then connects the actual dots,
          linking real-world records like customers, products, and accounts. Using all three together gives both
          people and AI the complete, reliable context needed to make sense of your business.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="references">References</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem', paddingLeft: 0 }}>
          <li style={{ listStyle: 'none' }}>
            <a
              href="https://youtu.be/y1iw0tf4lzY"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              Is Ontology REPLACING the Semantic Model? (Guy in a Cube, YouTube)
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            <a
              href="https://youtu.be/VGN22pPpb-8"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              Thinner Agents on a Smarter Substrate: The Ontology-based Semantic Layer &mdash; Emil Eifrem, Neo4j
              (AI Engineer, YouTube)
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            <a
              href="https://youtu.be/Zksf5xKOo-s"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              NVIDIA Auto Ontology: Give Your AI a Map of Your Database &mdash; Syed Humair (CodeUCraftAI, YouTube)
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            Related post: <Link to="/posts/auto-ontology">Auto Ontology</Link>, a beginner&rsquo;s introduction to
            NVIDIA&rsquo;s tool
          </li>
        </ul>
      </section>
    </>
  );
}
