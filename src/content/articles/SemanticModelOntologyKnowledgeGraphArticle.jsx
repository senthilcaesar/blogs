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

function MenuDiagram() {
  const modelBracket = {
    fill: 'color-mix(in srgb, var(--accent-purple) 6%, transparent)',
    stroke: 'var(--accent-purple)',
    strokeWidth: 1.5,
    strokeDasharray: '6 5',
  };
  const card = {
    fill: 'color-mix(in srgb, var(--accent-purple) 12%, transparent)',
    stroke: 'var(--accent-purple)',
    strokeWidth: 2,
  };
  const pantryBox = {
    fill: 'color-mix(in srgb, var(--text-muted) 8%, transparent)',
    stroke: 'var(--text-muted)',
    strokeWidth: 1.5,
  };
  const highlight = {
    fill: 'color-mix(in srgb, var(--accent) 18%, transparent)',
    stroke: 'var(--accent)',
    strokeWidth: 1.5,
  };
  const readerRing = {
    fill: 'color-mix(in srgb, var(--accent) 12%, transparent)',
    stroke: 'var(--accent)',
    strokeWidth: 2,
  };
  const thin = { stroke: 'var(--text-muted)', strokeWidth: 1 };
  const steps = ['1. Use the invoices table', '2. Leave out cancelled', '    and test rows', '3. Add up invoice_amount'];
  const columns = ['invoice_amount', 'status', 'is_test'];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 760 330"
        role="img"
        aria-label="Restaurant menu analogy for a semantic model. You, a dashboard or an AI agent order Net Revenue by name. The semantic model has two parts: the menu you see, listing Net Revenue, Units sold and Average order value, and the recipe in the kitchen, hidden from you: use the invoices table, leave out cancelled and test rows, add up invoice_amount. The recipe reads raw ingredients from the pantry, which is the database: the invoices table with columns invoice_amount, status and is_test. One trusted number comes back to you."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id="menu-arrow" />
          <ArrowMarker id="menu-arrow-accent" color="var(--accent)" />
        </defs>
        <text x="20" y="28" style={{ ...svgMuted, fontSize: 13, letterSpacing: '0.08em' }}>
          ORDER BY NAME, NEVER SEE THE KITCHEN
        </text>

        {/* Who asks */}
        <circle cx="60" cy="150" r="30" style={readerRing} />
        <PersonIcon cx={60} cy={150} />
        <text x="60" y="202" textAnchor="middle" style={{ ...svgText, fontSize: 12, fontWeight: 600 }}>
          You, a dashboard
        </text>
        <text x="60" y="219" textAnchor="middle" style={{ ...svgText, fontSize: 12, fontWeight: 600 }}>
          or an AI agent
        </text>
        <line x1="94" y1="150" x2="191" y2="150" style={edgeStyle} markerEnd="url(#menu-arrow)" />
        <text x="135" y="138" textAnchor="middle" style={{ ...svgText, fontSize: 11, fontStyle: 'italic' }}>
          &ldquo;Net Revenue&rdquo;
        </text>

        {/* The semantic model = menu + recipe */}
        <rect x="180" y="40" width="380" height="230" rx="16" style={modelBracket} />
        <text x="370" y="62" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em' }}>
          SEMANTIC MODEL
        </text>

        <rect x="195" y="76" width="145" height="178" rx="12" style={card} />
        <text x="267" y="102" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700, letterSpacing: '0.1em' }}>
          MENU
        </text>
        <text x="267" y="120" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5 }}>
          what you see
        </text>
        <rect x="207" y="134" width="121" height="32" rx="8" style={highlight} />
        <text x="267" y="155" textAnchor="middle" style={{ ...svgText, fontSize: 13.5, fontWeight: 700 }}>
          Net Revenue
        </text>
        <text x="267" y="194" textAnchor="middle" style={{ ...svgText, fontSize: 13 }}>
          Units sold
        </text>
        <text x="267" y="228" textAnchor="middle" style={{ ...svgText, fontSize: 13 }}>
          Average order value
        </text>

        <line x1="340" y1="150" x2="351" y2="150" style={edgeStyle} markerEnd="url(#menu-arrow)" />

        <rect x="355" y="76" width="190" height="178" rx="12" style={card} />
        <text x="450" y="102" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700, letterSpacing: '0.1em' }}>
          RECIPE
        </text>
        <text x="450" y="120" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5 }}>
          in the kitchen, hidden from you
        </text>
        {steps.map((step, i) => (
          <text key={step} x="370" y={152 + i * 22} style={{ ...svgText, fontSize: 12.5, whiteSpace: 'pre' }}>
            {step}
          </text>
        ))}

        {/* The database = pantry of raw ingredients */}
        <line x1="545" y1="150" x2="596" y2="150" style={edgeStyle} markerEnd="url(#menu-arrow)" />
        <text x="579" y="140" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5 }}>
          reads
        </text>
        <rect x="600" y="76" width="145" height="178" rx="12" style={pantryBox} />
        <text x="672" y="102" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700, letterSpacing: '0.1em' }}>
          PANTRY
        </text>
        <text x="672" y="120" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5 }}>
          the database
        </text>
        <rect x="614" y="134" width="117" height="104" rx="6" style={{ ...pantryBox, strokeWidth: 1 }} />
        <text x="672" y="153" textAnchor="middle" style={{ ...svgText, fontSize: 12, fontWeight: 700, fontFamily: monoFont }}>
          invoices
        </text>
        <line x1="614" y1="162" x2="731" y2="162" style={thin} />
        {columns.map((col, i) => (
          <g key={col}>
            <text x="672" y={182 + i * 22} textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5, fontFamily: monoFont }}>
              {col}
            </text>
            {i < columns.length - 1 && <line x1="614" y1={190 + i * 22} x2="731" y2={190 + i * 22} style={thin} />}
          </g>
        ))}

        {/* Answer back */}
        <path d="M370 270 V292 H60 V234" style={{ ...edgeStyle, stroke: 'var(--accent)' }} markerEnd="url(#menu-arrow-accent)" />
        <text x="215" y="314" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontWeight: 600 }}>
          One trusted number comes back
        </text>
      </svg>
      <figcaption>
        The semantic model is both the menu and the recipe. The database is just the pantry of raw ingredients.
      </figcaption>
    </figure>
  );
}

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

function WorkTogetherDiagram() {
  const questionBox = {
    fill: 'color-mix(in srgb, var(--text-muted) 10%, transparent)',
    stroke: 'var(--text-muted)',
    strokeWidth: 1.5,
  };
  const answerBox = {
    fill: 'color-mix(in srgb, var(--accent) 16%, transparent)',
    stroke: 'var(--accent)',
    strokeWidth: 2,
  };
  const layers = [
    { x: 20, title: 'Ontology', ask: 'What do the words mean?', line1: '“Active” = paid order in 12 months', line2: 'A t-shirt counts as clothing' },
    { x: 255, title: 'Knowledge Graph', ask: 'Which records match?', line1: 'C215 placed O733', line2: 'O733 lists a t-shirt' },
    { x: 490, title: 'Semantic Model', ask: 'What’s the number?', line1: 'Sum net revenue', line2: 'Leave out cancelled orders' },
  ];
  const layerBox = {
    fill: 'color-mix(in srgb, var(--accent-purple) 12%, transparent)',
    stroke: 'var(--accent-purple)',
    strokeWidth: 2,
  };
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 720 350"
        role="img"
        aria-label="How the three layers work together. The question 'How much did our active customers spend on clothing last quarter?' splits into three smaller questions. The ontology answers what the words mean: active means a paid order in the last 12 months, and a t-shirt counts as clothing. The knowledge graph answers which records match: customer C215 placed order O733, which lists a t-shirt. The semantic model answers what the number is: it sums net revenue and leaves out cancelled orders. Together they give one number that matches the finance report."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id="work-arrow" />
        </defs>
        <rect x="110" y="16" width="500" height="44" rx="22" style={questionBox} />
        <text x="360" y="44" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontStyle: 'italic' }}>
          &ldquo;How much did our active customers spend on clothing last quarter?&rdquo;
        </text>
        {layers.map((l) => (
          <g key={l.title}>
            <line x1="360" y1="60" x2={l.x + 105} y2="98" style={edgeStyle} markerEnd="url(#work-arrow)" />
            <rect x={l.x} y="102" width="210" height="140" rx="12" style={layerBox} />
            <text x={l.x + 105} y="132" textAnchor="middle" style={{ ...svgText, fontSize: 17, fontWeight: 700 }}>
              {l.title}
            </text>
            <text x={l.x + 105} y="156" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontStyle: 'italic' }}>
              {l.ask}
            </text>
            <text x={l.x + 105} y="190" textAnchor="middle" style={{ ...svgMuted, fontSize: 12.5 }}>
              {l.line1}
            </text>
            <text x={l.x + 105} y="212" textAnchor="middle" style={{ ...svgMuted, fontSize: 12.5 }}>
              {l.line2}
            </text>
            <line x1={l.x + 105} y1="242" x2="360" y2="280" style={edgeStyle} markerEnd="url(#work-arrow)" />
          </g>
        ))}
        <rect x="170" y="284" width="380" height="44" rx="22" style={answerBox} />
        <text x="360" y="311" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 600 }}>
          One number that matches the finance report
        </text>
      </svg>
      <figcaption>One question, three smaller questions, one answer.</figcaption>
    </figure>
  );
}

function InActionDiagram() {
  const plainBox = {
    fill: 'color-mix(in srgb, var(--text-muted) 8%, transparent)',
    stroke: 'var(--text-muted)',
    strokeWidth: 1.5,
  };
  const agentBox = {
    fill: 'color-mix(in srgb, var(--accent) 14%, transparent)',
    stroke: 'var(--accent)',
    strokeWidth: 2,
  };
  const layerBox = {
    fill: 'color-mix(in srgb, var(--accent-purple) 12%, transparent)',
    stroke: 'var(--accent-purple)',
    strokeWidth: 2,
  };
  // Subtle sage green so the context layer reads as a separate band from the purple layer boxes
  const contextLayer = {
    fill: 'color-mix(in srgb, #9caf88 16%, transparent)',
    stroke: '#8a9f7b',
    strokeWidth: 1.5,
    strokeDasharray: '6 5',
  };
  const layers = [
    {
      x: 36,
      title: 'Ontology',
      arrowX: 200,
      role: 'the meaning',
      line1: '“Active” = paid order in 12 months',
      line2: 'A t-shirt is a kind of clothing',
    },
    {
      x: 273,
      title: 'Knowledge Graph',
      arrowX: 380,
      role: 'the facts',
      line1: 'C215 → placed O733 → t-shirt',
      line2: '…and every other match',
    },
    {
      x: 510,
      title: 'Semantic Model',
      arrowX: 560,
      role: 'the math',
      line1: 'Net Revenue of those orders',
      line2: 'Cancelled and test rows left out',
    },
  ];
  const dataSources = ['Sales system', 'Warehouse system', 'Invoices table'];
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 760 486"
        role="img"
        aria-label="All three layers in action. A question, how much did our active customers spend on clothing last quarter, goes to an AI agent, which works in three steps across the enterprise context layer, a box holding the ontology, the knowledge graph and the semantic model. First, the ontology supplies the meaning: active means a paid order in the last 12 months, and a t-shirt is a kind of clothing. Next, the knowledge graph supplies the facts: customer C215 placed order O733, which lists a t-shirt, plus every other match. The ontology defines the shape of the knowledge graph. Finally, the semantic model supplies the math: net revenue of those orders, with cancelled and test rows left out. A scheduled job copies records into the knowledge graph, and the semantic model runs its recipe on the tables, from the raw data in the sales system, warehouse system and invoices table. The agent returns one figure that matches the finance report."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id="action-arrow" />
          <ArrowMarker id="action-arrow-accent" color="var(--accent)" />
        </defs>

        {/* Question -> agent -> answer */}
        <rect x="20" y="24" width="230" height="72" rx="14" style={plainBox} />
        <text x="135" y="44" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5, letterSpacing: '0.08em' }}>
          QUESTION
        </text>
        <text x="135" y="65" textAnchor="middle" style={{ ...svgText, fontSize: 12.5, fontStyle: 'italic' }}>
          &ldquo;How much did our active
        </text>
        <text x="135" y="83" textAnchor="middle" style={{ ...svgText, fontSize: 12.5, fontStyle: 'italic' }}>
          customers spend on clothing?&rdquo;
        </text>

        <line x1="250" y1="60" x2="301" y2="60" style={edgeStyle} markerEnd="url(#action-arrow)" />

        <rect x="305" y="24" width="150" height="72" rx="14" style={agentBox} />
        <RobotIcon cx={334} cy={58} />
        <text x="398" y="56" textAnchor="middle" style={{ ...svgText, fontSize: 15, fontWeight: 700 }}>
          AI agent
        </text>
        <text x="398" y="76" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5 }}>
          works in 3 steps
        </text>

        <line
          x1="455"
          y1="60"
          x2="516"
          y2="60"
          style={{ ...edgeStyle, stroke: 'var(--accent)' }}
          markerEnd="url(#action-arrow-accent)"
        />

        <rect x="520" y="24" width="220" height="72" rx="14" style={agentBox} />
        <text x="630" y="44" textAnchor="middle" style={{ ...svgMuted, fontSize: 11.5, letterSpacing: '0.08em' }}>
          ANSWER
        </text>
        <text x="630" y="65" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontWeight: 600 }}>
          One figure that matches
        </text>
        <text x="630" y="83" textAnchor="middle" style={{ ...svgText, fontSize: 13, fontWeight: 600 }}>
          the finance report
        </text>

        {/* Agent consults each layer */}
        {layers.map((l) => (
          <line
            key={`link-${l.title}`}
            x1="380"
            y1="96"
            x2={l.arrowX}
            y2="196"
            style={edgeStyle}
            markerStart="url(#action-arrow)"
            markerEnd="url(#action-arrow)"
          />
        ))}

        {/* Enterprise context layer wraps all three */}
        <rect x="12" y="150" width="736" height="202" rx="20" style={contextLayer} />
        <text x="32" y="174" style={{ ...svgText, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>
          ENTERPRISE CONTEXT LAYER
        </text>

        {/* The three layers */}
        {layers.map((l) => (
          <g key={l.title}>
            <rect x={l.x} y="200" width="214" height="132" rx="14" style={layerBox} />
            <text x={l.x + 107} y="230" textAnchor="middle" style={{ ...svgText, fontSize: 16, fontWeight: 700 }}>
              {l.title}
            </text>
            <text x={l.x + 107} y="250" textAnchor="middle" style={{ ...svgMuted, fontSize: 12, fontStyle: 'italic' }}>
              {l.role}
            </text>
            <text x={l.x + 107} y="284" textAnchor="middle" style={{ ...svgText, fontSize: 12 }}>
              {l.line1}
            </text>
            <text x={l.x + 107} y="306" textAnchor="middle" style={{ ...svgText, fontSize: 12 }}>
              {l.line2}
            </text>
          </g>
        ))}

        {/* Ontology shapes the knowledge graph */}
        <line x1="250" y1="266" x2="269" y2="266" style={edgeStyle} markerEnd="url(#action-arrow)" />

        {/* Raw data underneath */}
        <line x1="380" y1="408" x2="380" y2="336" style={edgeStyle} markerEnd="url(#action-arrow)" />
        <text x="388" y="394" style={{ ...svgMuted, fontSize: 12 }}>
          copied in
        </text>
        <line
          x1="617"
          y1="408"
          x2="617"
          y2="336"
          style={edgeStyle}
          markerStart="url(#action-arrow)"
          markerEnd="url(#action-arrow)"
        />
        <text x="625" y="394" style={{ ...svgMuted, fontSize: 12 }}>
          queried live
        </text>

        <rect x="273" y="412" width="451" height="56" rx="14" style={plainBox} />
        <text x="291" y="445" style={{ ...svgMuted, fontSize: 11.5, letterSpacing: '0.08em' }}>
          RAW DATA
        </text>
        {dataSources.map((d, i) => (
          <text key={d} x={420 + i * 108} y="445" textAnchor="middle" style={{ ...svgText, fontSize: 12.5 }}>
            {d}
          </text>
        ))}
        <text x="143" y="394" textAnchor="middle" style={{ ...svgMuted, fontSize: 12 }}>
          Written down once by the
        </text>
        <text x="143" y="411" textAnchor="middle" style={{ ...svgMuted, fontSize: 12 }}>
          business; no tables needed
        </text>
      </svg>
      <figcaption>
        The agent asks the ontology what business terms in the question, like &ldquo;active customer&rdquo; and
        &ldquo;clothing&rdquo;, mean. Next, it asks the knowledge graph to find the actual clothing orders placed
        by active customers, such as order O733. Finally, it asks the semantic model to add up the net revenue of
        those orders, leaving out cancelled and test ones. The small arrow between the first two shows the ontology setting the
        shape of the knowledge graph. Underneath, the knowledge graph keeps its own copy of the shop&rsquo;s records, copied in
        from the sales and warehouse systems before anyone asks a question. The semantic model keeps no copy: it
        queries the tables live, at the moment someone asks.
      </figcaption>
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
      { id: 'semantic-model-vs-ontology', label: 'Semantic model vs ontology' },
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
        When companies give their AI agents the background knowledge they need to answer business questions correctly, sometimes called an enterprise context layer, three terms get used as if they meant the same
        thing: Semantic Models, Ontologies, and Knowledge Graphs.
      </p>
      <p className="article-lead">
        While they all add business context to raw data, treating them as synonyms leads to failed data projects
        and AI agents that break easily. They are complementary tools designed for fundamentally different jobs.
      </p>
      <p className="article-lead">
        This post takes them one at a time, using one small example throughout: an online shop with customers,
        orders and products, some of which are t-shirts. We&rsquo;ll meet them in this order:
      </p>
      <ol className="article-lead" style={{ paddingLeft: '1.5rem' }}>
        <li>
          <strong>The semantic model</strong> defines how business numbers like &ldquo;net revenue&rdquo; are
          calculated from the raw data, so everyone who asks for one gets the same figure.
        </li>
        <li>
          <strong>The ontology</strong> writes down exactly what business terms like &ldquo;customer&rdquo; or
          &ldquo;active customer&rdquo; mean, so every team and every AI agent uses the same definition.
        </li>
        <li>
          <strong>The knowledge graph</strong> stores the shop&rsquo;s actual customers, orders and products and
          the links between them, such as which customer placed which order.
        </li>
      </ol>
      <p className="article-lead">
        At the end, we&rsquo;ll ask the shop one question and watch all three answer it together.
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
          A company&rsquo;s data sits in database tables built for computers, not people. A column is called{' '}
          <code>invoice_amount</code>, a row marked <code>is_test</code> is fake data, and some invoices were
          cancelled but are still in the table. Anyone who wants a simple number, like how much the company earned,
          first has to know all of those quirks.
        </p>
        <p style={{ marginTop: '1rem' }}>
          A semantic model is a layer that sits on top of those tables and gives them plain business names. We
          can picture it as a restaurant menu. You order &ldquo;Net Revenue&rdquo; by name, and the kitchen
          already knows the recipe: which table to use, which rows to leave out and how to add them up. You never
          have to see the kitchen.
        </p>
        <MenuDiagram />
        <p style={{ marginTop: '1rem' }}>
          <strong>Example:</strong> Here&rsquo;s the recipe behind that menu item, written in SQL, the language
          databases understand: <code>SELECT SUM(invoice_amount) FROM invoices WHERE status &lt;&gt; 'cancelled' AND is_test = false</code>.
          Without a semantic model, every analyst or agent has to write that out themselves and remember every
          part of it. With one, the semantic model defines <strong>Net Revenue</strong> once, and anyone can simply
          ask, &ldquo;What was net revenue this quarter?&rdquo;
        </p>
        <ul>
          <li>
            <strong>Tables</strong> tell you where and how the data is stored.
          </li>
          <li>
            <strong>Semantic models</strong> tell you how that data is structured to analyze and answer specific
            business questions.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          In practice, this means everyone who asks for net revenue, whether an analyst, a dashboard or an AI
          agent, gets the same number, because they all use the same recipe.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Who builds it:</strong> Usually the data team, but the business decides what goes in it. The
          people who write it are often business intelligence (BI) developers, who build reports and dashboards
          in tools like Power BI or Looker, or analytics engineers, who write it as code in tools like dbt. They
          don&rsquo;t get to decide what net revenue means, though. That&rsquo;s usually finance&rsquo;s call:
          whether refunds come out, whether tax is included, what counts as cancelled. The data team then turns
          that agreement into the recipe. Skip that step and you get a semantic model that&rsquo;s technically
          correct and still disagrees with the finance report.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Why it matters:</strong> Before an executive business review, your VP of Sales asks an AI
          assistant, &ldquo;What was net revenue for our top enterprise accounts last quarter?&rdquo; In seconds,
          the agent returns a polished chart. Unfortunately, the numbers don&rsquo;t match the finance report.
          Why? Because the agent counted cancelled orders as revenue and pulled from a staging table, a rough
          working copy of the data that nobody had checked yet.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The agent didn&rsquo;t fail because of the large language model (LLM) behind it, or because it couldn&rsquo;t translate a user question
          into a query. It failed because it didn&rsquo;t understand your business. The real kicker is that this
          understanding often already exists, in the semantic models behind the company&rsquo;s own reports
          and dashboards. But because each definition stays locked inside its own tool, every agent
          guesses at it&hellip; and often gets it wrong.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Connect your AI agents to those same semantic models, and they get the same business definitions your analysts rely
          on, so their answers line up with the numbers your business trusts.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Think of it as:</strong> The business-friendly interface to your data.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="ontology">Ontology - Define what things mean</h2>
        <p>
          A semantic model gets the math right, but only once everyone agrees on what&rsquo;s being counted.
          That&rsquo;s harder than it sounds. Ask your sales, marketing and finance teams the same question, &ldquo;What&rsquo;s an active
          customer?&rdquo;, and you&rsquo;ll probably get three answers. Sales means anyone who bought something in
          the last year. Marketing means anyone who opened an email this month. Finance means anyone with a paid
          invoice this quarter. Now ask an AI agent how many active customers you have. Which definition does it
          use? It has to guess, however good the model is.
        </p>
        <p style={{ marginTop: '1rem' }}>
          An ontology is the fix for that guess. Simply put, it&rsquo;s a shared map of the things your business
          cares about and how they connect, written so that people and machines read it the same way.
        </p>
        <div className="article-panel article-panel--accent">
          <p>
            <strong>A business-facing ontology</strong> is a simple description of the real-world concepts of your
            business and how they relate, articulated in a way that makes sense to human users.
          </p>
        </div>
        <p style={{ marginTop: '1rem' }}>
          To see what goes into that map, it helps to start with something simpler that people often confuse it
          with.
        </p>

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
          In practice, an agent that reads this map knows the only way to get from a customer to a product is
          through an order, so it doesn&rsquo;t have to guess which tables join to which. And because of the
          rule, an order loaded without a customer gets flagged as broken data before an agent ever counts it as
          revenue.
        </p>

        <details className="article-details">
          <summary>Under the hood (optional): how an ontology is written down</summary>
          <p>
            You don&rsquo;t need this part to follow the rest of the post, but you&rsquo;ll see these names in
            most ontology tools. There are open standards for writing each layer down:
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
            <li>
              <strong>Definitions</strong>, written with <code>skos:definition</code>. SKOS (the Simple Knowledge
              Organization System) is a small vocabulary for labels, synonyms and definitions.
            </li>
          </ul>
          <p>
            All of them are usually written in Turtle, a compact text format where each line is a small statement:
            a subject, a verb and an object, ending with a full stop. The taxonomy above takes just two lines:
          </p>
          <CodeCard code={taxonomyTurtle} lang="turtle" />
          <p style={{ marginTop: '1rem' }}>
            Relationships take a little more. Each one names the kind of thing the arrow starts from, called its{' '}
            <em>domain</em>, and the kind of thing it points to, called its <em>range</em>:
          </p>
          <CodeCard code={relationsTurtle} lang="turtle" />
          <p style={{ marginTop: '1rem' }}>
            The rule, &ldquo;every order must have a customer&rdquo;, is written as a SHACL <em>shape</em>, which
            we can picture as a stencil every Order must fit. The <em>places</em> arrow points from customer to
            order, so to check it from the order&rsquo;s side, the shape follows the arrow backwards (that&rsquo;s
            what <code>sh:inversePath</code> means) and demands at least one customer at the other end:
          </p>
          <CodeCard code={orderShape} lang="turtle" file="SHACL shape" />
          <p style={{ marginTop: '1rem' }}>And the definition of an active customer, which we&rsquo;ll meet next:</p>
          <CodeCard code={definitionTurtle} lang="turtle" />
        </details>

        <h3 id="one-map-two-readers">One map, two readers</h3>
        <p>
          The ontology we just drew has two kinds of reader. People read it as the boxes and arrows in the
          diagram. AI agents read the very same map, written as text instead of a picture (the optional box above
          shows what that text looks like). Because everyone reads one map, nobody has to translate it, and
          there&rsquo;s no second copy to fall out of date. When the business changes a rule, people and agents
          see the change at the same time.
        </p>
        <p style={{ marginTop: '1rem' }}>
          That brings us back to the active customer. An ontology also writes down what each term means, in plain
          words. The business picks one meaning, writes it down once, and every reader uses it:
        </p>
        <SharedDefinitionDiagram />
        <p style={{ marginTop: '1rem' }}>
          This matters more than it might seem. In one hands-on test of NVIDIA&rsquo;s open-source Auto Ontology
          tool (linked in the references), the same revenue question came back wrong about one time in three,
          partly because the agent sometimes counted tax as revenue. Adding a single human-written note that said
          what &ldquo;revenue&rdquo; meant made it right on every later run. That was one question asked many
          times, so it&rsquo;s a quick check rather than a benchmark. Still, the presenter&rsquo;s conclusion is
          hard to argue with: context mattered more than the model.
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

        <h3 id="semantic-model-vs-ontology">Semantic model vs ontology</h3>
        <p>
          At first glance the two look alike. Both talk about customers, orders and invoices, and both describe
          how those things connect. The difference is the job each one does. The semantic model is about{' '}
          <strong>numbers</strong>: it holds the recipe for turning rows in a table into a figure like Net
          Revenue. The ontology is about <strong>meaning</strong>: it says what a term like &ldquo;active
          customer&rdquo; means, and that definition stays the same whichever database the data is stored in.
        </p>
        <p style={{ marginTop: '1rem' }}>
          In practice, you need both: the ontology settles what &ldquo;active
          customer&rdquo; means, and the semantic model does the sum. A semantic model on its own will happily
          total revenue for &ldquo;active customers&rdquo; using whatever definition someone typed into that one
          dashboard, and that&rsquo;s how sales and finance end up with different numbers.
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
          The ontology is a blueprint. It says a customer can place an order, but it doesn&rsquo;t contain a single
          real customer. We can picture it as a blank form: it has a box for the customer&rsquo;s name and a box
          for the order number, and every box is empty. So where do the filled-in forms live?
        </p>
        <p style={{ marginTop: '1rem' }}>
          That&rsquo;s the knowledge graph. Simply put, it&rsquo;s the shop&rsquo;s real records, drawn as dots
          and lines. Each dot, called a <em>node</em>, is one actual thing: a particular customer, a particular
          order, a particular product. Each line, called a <em>relationship</em>, is a real fact connecting two of
          them. The records often come from different systems, such as the sales system and the warehouse system,
          and the graph links them into one picture.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Example:</strong> Customer C102 placed Order O501, which contains Product P20, a laptop.
        </p>
        <KnowledgeGraphDiagram />
        <p style={{ marginTop: '1rem' }}>
          In practice, an agent can start at customer C102 and follow the lines to find every order they placed
          and every product in those orders, without anyone writing a complicated query.
        </p>
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
          In practice, the ontology acts as the schema for the knowledge graph, the set of shapes the data has to
          fit: every node and link in the graph should match a concept and relationship the ontology defines. You need both. One gives the meaning, the
          other gives the facts.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="how-they-work-together">How They Work Together</h2>
        <p>
          To see all three at work, let&rsquo;s go back to the shop from earlier and ask an AI agent one plain
          question: <em>&ldquo;How much did our active customers spend on clothing last quarter?&rdquo;</em>
        </p>
        <p style={{ marginTop: '1rem' }}>
          It sounds like one question, but the agent has to answer three smaller ones first, and each layer
          answers exactly one of them.
        </p>
        <WorkTogetherDiagram />
        <ol style={{ marginTop: '1.25rem' }}>
          <li>
            <strong>What do the words mean?</strong> The <strong>ontology</strong> answers this. &ldquo;Active
            customer&rdquo; means someone who placed a paid order in the last 12 months, the definition we wrote
            down earlier. &ldquo;Clothing&rdquo; includes t-shirts, because the taxonomy says a t-shirt is a kind of
            clothing.
          </li>
          <li>
            <strong>Which real records match?</strong> The <strong>knowledge graph</strong> answers this. It finds
            the actual customers who fit that definition, follows each one to their orders, and follows each order
            to its products, keeping only orders that list clothing. Say, customer C215 placed order O733, which
            lists a t-shirt, so that order is in.
          </li>
          <li>
            <strong>What&rsquo;s the number?</strong> The <strong>semantic model</strong> answers this. It adds up
            net revenue for those orders with the one agreed formula, so cancelled orders and test data stay out.
          </li>
        </ol>
        <p>
          Take any one away and the answer goes wrong in a way that&rsquo;s easy to miss. Without the ontology,
          the agent guesses what &ldquo;active&rdquo; means and might count everyone who opened an email. Without
          the knowledge graph, it knows what an active customer is but can&rsquo;t find which ones are, or which
          of their orders had clothing in them. Without the semantic model, it finds the right orders but adds
          them up its own way, cancelled orders included, and the total won&rsquo;t match the finance report.
        </p>
        <div className="article-panel article-panel--accent">
          <p>
            <strong>The ontology supplies the meaning, the knowledge graph supplies the facts, and the semantic
            model supplies the math.</strong>
          </p>
        </div>
        <p style={{ marginTop: '1rem' }}>
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
        <p style={{ marginTop: '1rem' }}>Here&rsquo;s the whole picture in one place, from question to answer:</p>
        <InActionDiagram />
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
              Is Ontology Replacing the Semantic Model? &mdash; Guy in a Cube
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
              The Ontology-based Semantic Layer &mdash; Emil Eifrem, Neo4j
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
              NVIDIA Auto Ontology &mdash; Syed Humair
            </a>
          </li>
          <li style={{ listStyle: 'none' }}>
            Related post:{' '}
            <a href="#/posts/auto-ontology" target="_blank" rel="noreferrer">
              Auto Ontology
            </a>
            , a beginner&rsquo;s introduction to
            NVIDIA&rsquo;s tool
          </li>
        </ul>
      </section>
    </>
  );
}
