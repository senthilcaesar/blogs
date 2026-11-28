import { ArticleToc } from '../../components/ArticleToc';

const ontologyDeckPdf = new URL(
  '../../../files/ontology-driven-semantic-layer-stardog.pdf',
  import.meta.url,
).href;

const vendorQuestions = [
  'What kinds of business relationships and rules can it represent?',
  'Can that knowledge be shared across different applications and AI agents?',
  'Who defines, validates, and governs that meaning?',
  'Can the knowledge be reused independently of a single platform?',
  'Does it support reasoning over relationships, or primarily organize definitions and metrics?',
];

const svgText = { fill: 'var(--text)', fontFamily: 'inherit' };
const svgMuted = { fill: 'var(--text-muted)', fontFamily: 'inherit' };
const figureStyle = {
  margin: '1.5rem 0',
  padding: '1rem',
  border: '1px solid var(--border)',
  borderRadius: '16px',
};
const edgeStyle = { stroke: 'var(--text-muted)', strokeWidth: 1.5, fill: 'none' };

function ArrowMarker({ id, color = 'var(--text-muted)' }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" style={{ fill: color }} />
    </marker>
  );
}

// Colours, layout and curved links follow slide 5 of the deck. The plate keeps its own
// light palette in both themes so it reads like the original image.
const graphInk = '#1f2328';
const graphPlate = '#f3f5f8';
const NODE_R = 40;

const graphNodes = [
  { key: 'customer', x: 80, y: 85, lines: ['Customer'], fill: '#f2a487' },
  { key: 'order', x: 245, y: 205, lines: ['Order'], fill: '#e8a63e' },
  { key: 'shipper', x: 440, y: 95, lines: ['Shipper'], fill: '#93b95a' },
  { key: 'detail', x: 450, y: 215, lines: ['Order', 'Detail'], fill: '#dcc54d' },
  { key: 'manager', x: 440, y: 335, lines: ['Account', 'Manager'], fill: '#62a3b4' },
  { key: 'product', x: 615, y: 125, lines: ['Product'], fill: '#d6e05c' },
  { key: 'category', x: 745, y: 270, lines: ['Category'], fill: '#e16a3f' },
];

const graphEdges = [
  { d: 'M120 85 C170 85 165 205 201 205', label: 'Places Order', lx: 148, ly: 152 },
  { d: 'M285 198 C345 198 360 95 396 95', label: 'Order Shipper', lx: 352, ly: 128 },
  { d: 'M285 205 C340 205 370 215 406 215', label: 'has Detail', lx: 345, ly: 202 },
  { d: 'M285 212 C340 212 360 335 396 335', label: 'has Account Manager', lx: 352, ly: 290 },
  { d: 'M490 215 C545 215 540 125 571 125', label: 'for Product', lx: 520, ly: 160 },
  { d: 'M655 125 C705 125 690 225 715 243', label: 'Product Category', lx: 735, ly: 182 },
];

function OrderGraphDiagram() {
  const labelStyle = {
    fill: graphInk,
    fontFamily: 'inherit',
    fontSize: 12.5,
    fontWeight: 600,
    paintOrder: 'stroke',
    stroke: graphPlate,
    strokeWidth: 5,
    strokeLinejoin: 'round',
  };
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 830 410"
        role="img"
        aria-label="A small ontology drawn as a graph. A Customer places an Order. The Order has an Order Shipper, has a Detail, and has an Account Manager. The Order Detail is for a Product, and the Product has a Product Category."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <pattern id="order-graph-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#dfe3ea" strokeWidth="1" />
          </pattern>
          <ArrowMarker id="order-graph-arrow" color={graphInk} />
        </defs>

        <rect x="1" y="1" width="828" height="408" rx="22" fill={graphPlate} stroke="#c9ced6" />
        <rect x="1" y="1" width="828" height="408" rx="22" fill="url(#order-graph-grid)" />

        {graphEdges.map((edge) => (
          <g key={edge.label}>
            <path d={edge.d} fill="none" stroke={graphInk} strokeWidth="1.6" markerEnd="url(#order-graph-arrow)" />
            <text x={edge.lx} y={edge.ly} textAnchor="middle" style={labelStyle}>
              {edge.label}
            </text>
          </g>
        ))}

        {graphNodes.map((node) => (
          <g key={node.key}>
            <circle cx={node.x} cy={node.y} r={NODE_R} fill={node.fill} stroke={graphInk} strokeWidth="3" />
            {node.lines.map((line, i) => (
              <text
                key={line}
                x={node.x}
                y={node.y + 5 + (i - (node.lines.length - 1) / 2) * 15}
                textAnchor="middle"
                style={{ fill: graphInk, fontFamily: 'inherit', fontSize: 13, fontWeight: 700 }}
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
      <figcaption>
        One small slice of a business, modelled as concepts and relationships. It crosses order processing, shipping and product data without caring which system each one lives in.
      </figcaption>
    </figure>
  );
}

const layerPatterns = [
  {
    x: 15,
    title: 'Inside each BI tool',
    layers: ['SL', 'SL', 'SL'],
    verdict: ['Metrics-centred,', 'tied to one tool'],
    shared: false,
  },
  {
    x: 268,
    title: 'Inside each data platform',
    layers: ['SL', 'SL'],
    verdict: ['Metadata-centred,', 'tied to one platform'],
    shared: false,
  },
  {
    x: 521,
    title: 'Shared across everything',
    layers: ['Shared ontology'],
    verdict: ['Business-centred,', 'reusable everywhere'],
    shared: true,
  },
];

function SemanticLayerPatternsDiagram() {
  const colW = 224;
  const plain = {
    fill: 'color-mix(in srgb, var(--text-muted) 8%, transparent)',
    stroke: 'var(--text-muted)',
    strokeWidth: 1.2,
  };
  const sharedBox = {
    fill: 'color-mix(in srgb, var(--accent) 12%, transparent)',
    stroke: 'var(--accent)',
    strokeWidth: 1.5,
  };
  return (
    <figure style={figureStyle}>
      <svg
        viewBox="0 0 760 300"
        role="img"
        aria-label="Three ways to place a semantic layer. First, inside each BI tool: every tool between the data and its users has its own semantic layer, which is metrics-centred and tied to one tool. Second, inside each data platform: each platform has its own semantic layer, which is metadata-centred and tied to one platform. Third, shared across everything: one shared ontology sits between all data sources and all consumers, which is business-centred and reusable everywhere."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <ArrowMarker id="sl-arrow" />
        </defs>
        {layerPatterns.map((pattern) => {
          const gap = 10;
          const slW = (colW - gap * (pattern.layers.length - 1)) / pattern.layers.length;
          return (
            <g key={pattern.title}>
              <text
                x={pattern.x + colW / 2}
                y="22"
                textAnchor="middle"
                style={{ ...svgText, fontSize: 14, fontWeight: 700 }}
              >
                {pattern.title}
              </text>

              <rect x={pattern.x} y="40" width={colW} height="36" rx="8" style={plain} />
              <text x={pattern.x + colW / 2} y="63" textAnchor="middle" style={{ ...svgText, fontSize: 12.5 }}>
                Dashboards, apps, AI agents
              </text>

              {pattern.layers.map((label, i) => {
                const lx = pattern.x + i * (slW + gap);
                return (
                  <g key={`${pattern.title}-${i}`}>
                    <line x1={lx + slW / 2} y1="116" x2={lx + slW / 2} y2="80" style={edgeStyle} markerEnd="url(#sl-arrow)" />
                    <rect x={lx} y="118" width={slW} height="40" rx="8" style={pattern.shared ? sharedBox : plain} />
                    <text
                      x={lx + slW / 2}
                      y="143"
                      textAnchor="middle"
                      style={{ ...svgText, fontSize: 12.5, fontWeight: pattern.shared ? 700 : 500 }}
                    >
                      {label}
                    </text>
                    <line x1={lx + slW / 2} y1="198" x2={lx + slW / 2} y2="162" style={edgeStyle} markerEnd="url(#sl-arrow)" />
                  </g>
                );
              })}

              <rect x={pattern.x} y="200" width={colW} height="36" rx="8" style={plain} />
              <text x={pattern.x + colW / 2} y="223" textAnchor="middle" style={{ ...svgText, fontSize: 12.5 }}>
                Data sources
              </text>

              {pattern.verdict.map((line, i) => (
                <text
                  key={line}
                  x={pattern.x + colW / 2}
                  y={262 + i * 17}
                  textAnchor="middle"
                  style={{ ...(pattern.shared ? svgText : svgMuted), fontSize: 12.5, fontStyle: 'italic' }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <figcaption>
        SL = semantic layer. The first two patterns give you several versions of the business. The third aims for just one.
      </figcaption>
    </figure>
  );
}

const semanticStack = [
  {
    name: 'Ontology',
    detail: 'the model of the business itself: concepts, relationships and rules, readable by both people and machines.',
  },
  {
    name: 'Virtualization',
    detail: 'reaching data where it already lives, so nothing has to be copied into yet another store first.',
  },
  {
    name: 'Inference and reasoning',
    detail: 'reusable business logic and metrics that derive new facts from the ones you have.',
  },
  {
    name: 'Context layer',
    detail: 'governed, secured access, so each person or agent only sees what they are allowed to see.',
  },
  {
    name: 'Consumption',
    detail: 'wherever the question is asked: an AI agent over MCP, an API, a BI dashboard or a notebook.',
  },
];

const tocGroups = [
  { id: 'intro', label: 'Introduction' },
  { id: 'what-is-an-ontology', label: 'First, What Even Is an Ontology?' },
  { id: 'why-now', label: 'So… Why Is Everyone Suddenly Interested?' },
  { id: 'talking-about-meaning', label: 'The Industry Is Finally Talking About Meaning' },
  { id: 'same-thing', label: 'But Are We All Talking About the Same Thing?' },
  { id: 'where-it-sits', label: 'So Where Does the Ontology Actually Sit?' },
  { id: 'funny-thing', label: 'The Funny Thing About All of This…' },
  { id: 'main-character-moment', label: 'So, Are Ontologies Having Their Main Character Moment?' },
  { id: 'resources', label: 'Resources' },
];

export function OntologiesMainCharacterArticle() {
  return (
    <>
      <ArticleToc groups={tocGroups} />

      <p className="article-lead" id="intro">Okay, can we talk about something for a second?</p>

      <section className="article-panel">
        <p>
          Because apparently, the entire tech industry woke up one morning and decided that ontologies are cool now.
        </p>
        <p style={{ marginTop: '1rem' }}>In just the past few weeks:</p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>Databricks announced the general availability of Genie Ontology.</li>
          <li>Snowflake introduced Business Ontology, with a public preview on the way.</li>
          <li>
            Oracle announced new capabilities involving AI-assisted enterprise ontologies and semantic reasoning.
          </li>
          <li>
            Neo4j launched its Context Engine, focused on creating a reusable knowledge layer for AI agents.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          And Gartner? They&apos;re talking about AI context platforms and the importance of ontologies, knowledge graphs, and semantic technologies for agentic AI.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The word ontology is suddenly showing up in product announcements, industry research, and enterprise AI conversations.
        </p>
        <p style={{ marginTop: '1rem' }}>So naturally, I have questions.</p>
        <p style={{ marginTop: '1rem' }}>
          Why now? What changed? And have we all finally agreed that giving AI access to a bunch of data doesn&apos;t automatically make it intelligent?
        </p>
        <p style={{ marginTop: '1rem' }}>Let&apos;s get into it.</p>
      </section>

      <section className="article-panel">
        <h2 id="what-is-an-ontology">First, What Even Is an Ontology?</h2>
        <p>
          Imagine you work at a company where every department has a slightly different definition of a customer.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Marketing says a customer is anyone who has engaged with the company. Sales says a customer is someone who&apos;s signed a contract. Finance says a customer is someone who&apos;s actually paid an invoice. Customer Success says a customer is an organization with an active contract.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Everyone is using the same word and thinks they&apos;re right. (And depending on the business question, they might be!)
        </p>
        <p style={{ marginTop: '1rem' }}>Now imagine asking an AI agent:</p>
        <blockquote>
          <p>&quot;How many active customers do we have?&quot;</p>
        </blockquote>
        <p>Whose definition should it use?</p>
        <p style={{ marginTop: '1rem' }}>This is where ontologies come in.</p>
        <p style={{ marginTop: '1rem' }}>
          <mark className="highlight-green">
            An ontology is a structured representation of what things mean, how they&apos;re related, and the rules that govern those relationships within a particular domain.
          </mark>
        </p>
        <p style={{ marginTop: '1rem' }}>Think of it as a shared understanding of how your business works.</p>
        <p style={{ marginTop: '1rem' }}>
          It can define concepts like customers, accounts, contracts, and invoices. It can also describe how those concepts relate to one another, which distinctions matter, and what conditions must be satisfied.
        </p>
        <p style={{ marginTop: '1rem' }}>
          For example, an ontology might distinguish between a prospective customer and an active customer, define how organizations relate to contracts, and represent the conditions required for an account to be considered active.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And when you connect actual business data using those concepts and relationships, you&apos;re getting into knowledge graph territory. A knowledge graph represents connected information. An ontology can provide the formal meaning and structure behind those connections.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Not every knowledge graph uses a formal ontology, but the combination can be incredibly powerful.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The ontology helps establish what things mean. The knowledge graph helps connect what we know about them.
        </p>
        <p style={{ marginTop: '1rem' }}>Here&apos;s what that looks like in practice.</p>
        <OrderGraphDiagram />
        <p>
          A customer places an order. The order is shipped by a shipper, has an account manager, and has order details. Each order detail is for a product, and each product belongs to a category.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Simple, right? But look at what&apos;s quietly going on.
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>It cuts across domains.</strong> Order processing, shipping, and product data usually belong to different teams, and often live in different systems. The ontology connects them anyway.
          </li>
          <li>
            <strong>It&apos;s abstracted from where the data lives.</strong> Customers might sit in a CRM, orders in an ERP, and products in a spreadsheet someone really should have retired in 2019. The model doesn&apos;t care. It describes the business, not the database.
          </li>
          <li>
            <strong>It gives AI something to follow instead of guess.</strong> When an agent is asked &quot;Which categories did our biggest customers buy from last quarter?&quot;, it doesn&apos;t have to work out which tables join to which. It can walk the path: customer → order → order detail → product → category.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          And suddenly, we&apos;re not just looking at isolated data points anymore.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>We&apos;re looking at information in context.</strong>
        </p>
      </section>

      <section className="article-panel">
        <h2 id="why-now">So… Why Is Everyone Suddenly Interested?</h2>
        <p>Here&apos;s the plot twist.</p>
        <p style={{ marginTop: '1rem' }}>
          Ontologies didn&apos;t suddenly become useful. AI just made their absence a LOT harder to ignore.
        </p>
        <p style={{ marginTop: '1rem' }}>
          For years, enterprises have been collecting enormous amounts of data. Data lakes. Data warehouses. Databases. Dashboards. Applications. More dashboards. We&apos;ve gotten very good at storing information.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Understanding what that information means across an entire organization? Well. That&apos;s another story.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And for a while, businesses could work around that. A data analyst knew which table to query. A finance team knew which revenue calculation to use. An experienced employee knew that &quot;customer&quot; meant something different depending on which department was asking. A lot of important business knowledge lived in people&apos;s heads, documentation, or application logic.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Then generative AI entered the chat. At first, we were mostly asking AI to summarize documents, answer questions, and generate content. But now we&apos;re asking it to do much more.
        </p>
        <p style={{ marginTop: '1rem' }}>
          We want AI agents to analyze business performance, investigate problems, make recommendations, and execute workflows across multiple enterprise systems.
        </p>
        <p style={{ marginTop: '1rem' }}>
          That&apos;s a pretty significant promotion. And there&apos;s one tiny problem.
        </p>
        <p style={{ marginTop: '1rem' }}>
          An AI model can be incredibly good at language without knowing your company&apos;s specific definitions, policies, or relationships.
        </p>
        <p style={{ marginTop: '1rem' }}>
          It might know what revenue means generally… Does it know whether your organization includes refunds in a particular revenue metric? Does it know which subsidiary belongs to which parent organization? Does it know that a customer must satisfy certain contractual conditions before an action can be taken?
        </p>
        <p style={{ marginTop: '1rem' }}>
          Not unless that knowledge is made available to it in a usable form.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And here&apos;s the part that worries me a little. When a person doesn&apos;t know which revenue number to use, they pause. They message a colleague. They pick up the phone. People bring the operational intelligence of the enterprise with them, and they know when they&apos;re out of their depth.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Agents don&apos;t. An agent that&apos;s missing context rarely says &quot;I&apos;m not sure.&quot; It just answers. Often with words like <em>definitely</em> and <em>certainly</em>. Sometimes while being completely wrong.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The analysts have noticed too. Gartner predicts that by 2028, 50% of AI failures will be traced back to missing or inadequate semantic frameworks.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And this is where the industry&apos;s interest in semantics starts making a lot more sense today.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="talking-about-meaning">The Industry Is Finally Talking About Meaning</h2>
        <p>
          What&apos;s interesting about these recent announcements isn&apos;t just that major technology companies are using the word ontology.
        </p>
        <p style={{ marginTop: '1rem' }}>It&apos;s what they&apos;re trying to accomplish.</p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            Databricks is introducing ways for agents to use modeled and learned organizational knowledge.
          </li>
          <li>
            Snowflake is focusing on governed business definitions, relationships, and metrics that can be reused across applications and agents.
          </li>
          <li>
            Oracle is emphasizing enterprise ontologies and semantic reasoning to connect business concepts, policies, and workflows.
          </li>
          <li>
            Neo4j is building on graph technology to provide reusable business context for AI agents.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Different products. Different architectures. Different capabilities. But there&apos;s a common theme.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>
            AI needs more than information. It needs a reliable way to interpret information within the business.
          </strong>
        </p>
        <p style={{ marginTop: '1rem' }}>
          And we&apos;re starting to see that reflected in how major platforms are positioning their AI strategies.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Which brings me to something I think is worth discussing.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="same-thing">But Are We All Talking About the Same Thing?</h2>
        <p>
          Because here&apos;s where things get interesting. Just because two vendors use the word ontology doesn&apos;t necessarily mean they&apos;re offering the same thing.
        </p>
        <p style={{ marginTop: '1rem' }}>
          SHOCKING, I know. The tech industry using the same terminology to describe different capabilities? Never happened before.
        </p>
        <p style={{ marginTop: '1rem' }}>
          An ontology can range from a relatively lightweight model of business terms and relationships to a highly expressive, formally defined representation of knowledge.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Some approaches focus on standardizing business metrics and definitions. Others support richer semantic relationships, logical reasoning, constraints, and inference.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Some are tightly integrated into a particular data platform. Others are designed to be reused across systems using open semantic standards.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And those differences matter. For example, defining what revenue means is valuable.
        </p>
        <p style={{ marginTop: '1rem' }}>
          But there&apos;s a difference between defining a metric and modeling how customers, contracts, products, regions, transactions, and business policies relate to one another.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Both solve important problems. They just don&apos;t necessarily solve the same problems. This is why I think the questions enterprises should be asking are changing. Instead of simply asking, &quot;Does your platform have an ontology?&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>Maybe we should be asking:</p>
        <ol className="question-list">
          {vendorQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
        <p style={{ marginTop: '1rem' }}>
          And perhaps most importantly: Are we building a shared understanding of the business, or are we just creating another version of it inside another platform?
        </p>
        <p style={{ marginTop: '1rem' }}>
          Because the last thing enterprises need is five different AI systems, each with its own definition of reality. We&apos;ve already tried that with data silos.
        </p>
        <p style={{ marginTop: '1rem' }}>The reviews were mixed…</p>
      </section>

      <section className="article-panel">
        <h2 id="where-it-sits">So Where Does the Ontology Actually Sit?</h2>
        <p>
          One way to cut through the noise is to ask where a product puts its semantic layer, the layer that translates raw data into business meaning. Broadly, there are three patterns.
        </p>
        <SemanticLayerPatternsDiagram />
        <p>
          In the first, every BI tool keeps its own definitions. Great for dashboards, but the meaning of &quot;active customer&quot; lives inside one tool and doesn&apos;t travel. In the second, each data platform keeps its own business glossary and metadata. Better, but now you have one version of the business per platform.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The third pattern is the one ontologies are really aiming at: a single model of the business that sits between all your data sources and everything that consumes them, including AI agents.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And the ontology isn&apos;t the whole story there. It&apos;s the foundation of a stack. Reading from the bottom up:
        </p>
        <ol className="question-list">
          {semanticStack.map((layer) => (
            <li key={layer.name}>
              <span>
                <strong>{layer.name}</strong>: {layer.detail}
              </span>
            </li>
          ))}
        </ol>
        <p>
          This is also where the question of open standards comes in. Some ontologies are built on W3C standards, the same body behind HTML. RDF describes facts as simple subject–predicate–object statements (&quot;Customer <em>places</em> Order&quot;), OWL adds the rules and definitions on top, and SPARQL is the query language for both. Because the standards are public, the model can move between tools.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Other implementations use their own query languages and bake meaning into application logic. That can work well inside one product, but it makes the knowledge harder to take with you. Which is exactly why &quot;Can the knowledge be reused independently of a single platform?&quot; made my list of questions above.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="funny-thing">The Funny Thing About All of This…</h2>
        <p>For years, the conversation around enterprise AI was largely about models.</p>
        <p style={{ marginTop: '1rem' }}>
          Bigger models. Better models. More parameters. More data. More computing power. And don&apos;t get me wrong. Those advancements matter.
        </p>
        <p style={{ marginTop: '1rem' }}>
          But increasingly, the conversation is expanding beyond what the model can do to what the model actually understands about the environment it&apos;s operating in.
        </p>
        <p style={{ marginTop: '1rem' }}>That&apos;s an important distinction.</p>
        <p style={{ marginTop: '1rem' }}>
          A model can be extremely capable and still produce the wrong answer if it&apos;s working with the wrong business definition. And no amount of confidence in an AI-generated response changes that.
        </p>
        <p style={{ marginTop: '1rem' }}>
          What&apos;s exciting about the renewed interest in ontologies is that the industry is paying more attention to something knowledge engineers have been working on for a very long time: <mark className="highlight">making meaning explicit, connected, and reusable</mark>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Of course, the real test won&apos;t be how many vendors add &quot;ontology&quot; to their product pages.
        </p>
        <p style={{ marginTop: '1rem' }}>
          It&apos;ll be whether organizations can actually use these technologies to create consistent, governed business knowledge that improves how their AI systems operate.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Knowledge engineers already have a neat way to run that test, called competency questions. Before building an ontology, you write down the real questions it must be able to answer. Then you check whether it can.
        </p>
        <p style={{ marginTop: '1rem' }}>Going back to our customers and orders, that might look like:</p>
        <blockquote>
          <p>
            &quot;Which customers ordered products from the Seafood category, and which shippers delivered those orders late?&quot;
          </p>
        </blockquote>
        <p>
          That one question touches customers, orders, order details, products, categories, and shippers. If the ontology can&apos;t connect them, no amount of clever prompting will. If it can, the agent&apos;s answer comes from following real relationships, not from guessing which tables to join.
        </p>
        <p style={{ marginTop: '1rem' }}>That&apos;s the part worth watching.</p>
      </section>

      <section className="article-panel">
        <h2 id="main-character-moment">So, Are Ontologies Having Their Main Character Moment?</h2>
        <p>To be honest, kind of.</p>
        <p style={{ marginTop: '1rem' }}>
          And as someone who spends an arguably unhealthy amount of time thinking about knowledge graphs and semantic technologies, I&apos;m here for it. Not because ontologies are some shiny new invention.
        </p>
        <p style={{ marginTop: '1rem' }}>
          They&apos;re not. But because we&apos;re finally having a much broader conversation about something that&apos;s been overlooked for years.
        </p>
        <p style={{ marginTop: '1rem' }}>
          AI doesn&apos;t just need access to enterprise information. It needs the definitions, relationships, and rules that make that information meaningful.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And as more organizations move toward AI agents, that understanding becomes increasingly important.
        </p>
        <p style={{ marginTop: '1rem' }}>
          So yes, I&apos;m enjoying watching ontologies get their moment in the spotlight. But I&apos;ll leave you with one thought.
        </p>
        <blockquote>
          <p>
            AI didn&apos;t invent the need for ontologies. It just made the consequences of not having shared business meaning a whole lot more obvious.
          </p>
        </blockquote>
      </section>

      <section className="article-panel">
        <h2 id="resources">Resources</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <a href={ontologyDeckPdf} target="_blank" rel="noreferrer">
              Building Enterprise AI Agents with Claude and an Ontology-Driven Semantic Layer
            </a>{' '}
            (PDF, Navin Sharma, Stardog)
          </li>
          <li>
            <a
              href="https://info.stardog.com/building-enterprise-ai-agents-with-claude"
              target="_blank"
              rel="noreferrer"
            >
              Building Enterprise AI Agents with Claude
            </a>{' '}
            (Stardog)
          </li>
        </ul>
      </section>
    </>
  );
}
