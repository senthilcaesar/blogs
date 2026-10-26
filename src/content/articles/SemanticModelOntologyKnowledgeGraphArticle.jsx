const comparisonImg = new URL('../../../images/semantic-model-ontology-knowledge-graph.jpg', import.meta.url).href;

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
          <strong>Example:</strong> Instead of asking for <code>SUM(invoice_amount)</code>, a business user asks,
          &ldquo;What is our total revenue this quarter?&rdquo;
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Think of it as:</strong> The business-friendly interface to your data.
        </p>
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
    </>
  );
}
