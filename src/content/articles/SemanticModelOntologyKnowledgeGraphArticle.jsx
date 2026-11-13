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

export function SemanticModelOntologyKnowledgeGraphArticle() {
  return (
    <>
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
        <h2>Semantic Model — Make data meaningful</h2>
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
        <h2>Ontology — Define what things mean</h2>
        <p>
          An ontology formally defines the concepts in a domain, their properties, how they relate, and sometimes
          the rules governing those relationships. It establishes a shared vocabulary that machines can
          interpret.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Example:</strong> A Customer can place an Order; an Order contains Products; and each order
          belongs to a customer.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Think of it as:</strong> The blueprint and rulebook for business knowledge.
        </p>

        <div
          style={{
            margin: '2rem 0 0',
            paddingLeft: '1.25rem',
            borderLeft: '3px solid color-mix(in srgb, var(--accent-tertiary) 70%, transparent)',
          }}
        >
        <h3 style={{ marginTop: 0 }}>From Tables to Business Context</h3>
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
        <h2>Knowledge Graph — Connect actual facts</h2>
        <p>
          A knowledge graph represents specific entities and the relationships between them. It connects
          information from different systems, making it possible to explore how people, products, transactions,
          and events relate.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Example:</strong> Customer C102 placed Order O501, which contains Product P20.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Think of it as:</strong> The populated network of connected business facts.
        </p>
      </section>

      <section className="article-panel">
        <h2>How They Work Together</h2>
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
        <h2>References</h2>
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
        </ul>
      </section>
    </>
  );
}
