import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const img1 = new URL('../../../images/neo4j-1.jpg', import.meta.url).href;
const img2 = new URL('../../../images/neo4j-2.jpg', import.meta.url).href;
const img3 = new URL('../../../images/neo4j-3.jpg', import.meta.url).href;

const createInstanceImg = new URL(
  '../../../images/neo4j-createinstance.png',
  import.meta.url,
).href;
const generateWithAiImg = new URL(
  '../../../images/neo4j-generatewithai.png',
  import.meta.url,
).href;
const graphModelImg = new URL(
  '../../../images/neo4j-graphmodel.png',
  import.meta.url,
).href;
const importImg = new URL('../../../images/neo4j-import.png', import.meta.url)
  .href;
const queryImg = new URL('../../../images/neo4j-query.png', import.meta.url)
  .href;
const bloomImg = new URL('../../../images/neo4j-bloom.png', import.meta.url)
  .href;
const board1Img = new URL('../../../images/neo4j-board1.png', import.meta.url)
  .href;
const board2Img = new URL('../../../images/neo4j-board2.png', import.meta.url)
  .href;
const instanceMcpUrlImg = new URL(
  '../../../images/neo4j-instance-mcp-url.png',
  import.meta.url,
).href;

const grammarRuleCode = `(:Person)-[:PLACED]->(:Order)-[:CONTAINS]->(:Product)`;

const step3Query = `// Find a pattern in the database
MATCH (p:Person)-[r:ACTED_IN]->(m:Movie)

// Filter on a node property
WHERE m.title = "Toy Story"

// Choose what to return
RETURN p.name AS actor, r.role AS role`;

const sampleQuery1 = `//Find a Movie you like
MATCH (m:Movie) RETURN m.title`;

const sampleQuery2 = `// Use the ACTED_IN relationship to find who acted in the movie
MATCH (p:Person)-[:ACTED_IN]->(m:Movie {title: 'Jumanji'})
RETURN p.name`;

const sampleQuery3 = `// Use the DIRECTED relationship to find who directed the movie
MATCH (p:Person)-[:DIRECTED]->(m:Movie)
WHERE m.title = 'Jumanji'
RETURN p.name AS Director`;

const sampleQuery4 = `// The movie with the most rating
MATCH (m:Movie)<-[r:RATED]-()
RETURN m.title AS title, count(r) AS rating_count
ORDER BY rating_count DESC
LIMIT 1`;

const sampleQuery5 = `// Top 10 movies based on average rating
MATCH (u:User)-[r:RATED]->(m:Movie)
WITH m, avg(r.rating) AS avgRating
ORDER BY avgRating DESC
LIMIT 10
RETURN m.title AS title, avgRating`;

const step5WriteQuery1 = `// This query links a person named Senthil Palanivelu to the movie Jumanji with the role "caesar"
MERGE (p:Person {personTmdbId: 12345, name: "Senthil Palanivelu"})
MATCH (m:Movie {title: "Jumanji"})
MERGE (p)-[r:ACTED_IN]->(m)
SET r.roles = "caesar"`;

const step5WriteQuery2 = `// Find your role in the movie
MATCH (p:Person {name: "Senthil Palanivelu"})-[r:ACTED_IN]->(m:Movie {title: "Jumanji"})
RETURN r.roles AS role`;

function CodeCard({ code, lang = 'cypher', children }) {
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
    <div
      className='code-card'
      style={{ marginTop: '1rem', marginBottom: '1.25rem' }}
    >
      <div className='code-card__header'>
        <span className='code-card__lang'>{lang}</span>
        <div className='code-card__actions'>
          <button
            type='button'
            className={`code-copy-btn ${copied ? 'code-copy-btn--copied' : ''}`}
            onClick={handleCopy}
            title='Copy code snippet to clipboard'
            aria-label='Copy code snippet to clipboard'
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
      </div>
      <pre className='code-block'>
        <code>{children || code}</code>
      </pre>
    </div>
  );
}

export function Neo4jIntroWorkshopArticle() {
  return (
    <>
      {/* Roadmap & Overview Banner */}
      <div
        className='article-panel'
        style={{
          background: 'color-mix(in srgb, var(--accent) 7%, var(--surface))',
          marginBottom: '2rem',
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
        }}
      >
        <p className='article-lead' style={{ margin: 0, fontWeight: 500 }}>
          This guide is for complete beginners and is split into two sections:
        </p>
        <ul className='bullet-list' style={{ marginTop: '1rem' }}>
          <li>
            <strong>Part 1: Neo4j Introduction &amp; Core Concepts</strong>: An
            overview of Neo4j, including nodes, relationships, and the Cypher
            query language.
          </li>
          <li>
            <strong>Part 2: Hands-On Workshop</strong>: A practical tutorial
            where you set up a free cloud instance, import a movie dataset, run
            queries, and build knowledge graphs.
          </li>
        </ul>
      </div>

      {/* =========================================================================
          PART 1: INTRO & CONCEPTS
         ========================================================================= */}
      <section className='article-panel'>
        <h2 className='main-heading'>
          Part 1: Neo4j Introduction &amp; Core Concepts
        </h2>

        <h3 className='sub-heading' style={{ marginTop: '1.5rem' }}>
          1. The Building Blocks: Nodes, Labels, and Properties
        </h3>
        <p style={{ marginTop: '0.75rem' }}>
          Neo4j is a graph database that stores and connects data in the form of
          a graph. Instead of organizing information into tables and rows like a
          traditional relational database, Neo4j represents data as nodes,
          relationships, and properties, making it easier to model and query
          highly connected information. The diagram below shows how a single
          record for a movie is created:
        </p>

        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>The Center Circle (The Node):</strong> In Neo4j
            visualizations, a circle is called a <strong>node</strong>. A node
            is simply a fancy word for a &apos;thing&apos;, person, or object.
            In the real world, a node can be anything: a person, a city, a
            product, or in this case, the movie <em>Toy Story</em>.
          </li>
          <li>
            <strong>The Tags on Top (Labels):</strong> Those little tags sitting
            above the circle are called <strong>labels</strong>. Think of them
            just like tags or categories on a blog post. They tell the database
            what kind of thing this node is. A node can have more than one tag -
            here, <em>Toy Story</em> is tagged as both a <code>Movie</code> and{' '}
            <code>Animated</code>.
          </li>
          <li>
            <strong>The Box at the Bottom (Properties):</strong> These are the{' '}
            <strong>properties</strong> - the specific facts and details about
            the item. They work in simple key-value pairs (a key name, and the
            value itself). For example: <code>title: Toy Story</code> and{' '}
            <code>released: 1995</code>.
          </li>
        </ul>

        <p style={{ marginTop: '1rem' }}>
          Put all three pieces together, and the diagram simply tells the
          database:
          <br />
          <em>&apos;Toy Story is an animated movie released in 1995.&apos;</em>
          <br />
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <img
            src={img1}
            alt='Neo4j Node, Labels, and Properties Diagram'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>2. Connecting the Dots: Relationships</h3>
        <p>
          In the real world, things don&apos;t just exist by themselves - they
          connect to each other. In Neo4j, these connections are the secret
          sauce:
        </p>

        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Two Nodes (People or Things):</strong> On the left, we have
            a circle for <strong>Tom Hanks</strong>. On the right, we have a
            circle for the movie <strong>Toy Story</strong>.
          </li>
          <li>
            <strong>Their Labels (Tags):</strong> Each node has a tag telling us
            what it is - Tom Hanks is tagged as an <code>Actor</code>, and Toy
            Story is tagged as a <code>Movie</code>.
          </li>
          <li>
            <strong>The Arrow (The Relationship):</strong> The arrow connecting
            them is called a <strong>relationship</strong>. It has three simple,
            powerful features:
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
              <li>It connects the two nodes together.</li>
              <li>
                It has a name or type - here it is labeled <code>ACTED_IN</code>
                .
              </li>
              <li>
                It points in a specific direction - the arrow points from Tom
                Hanks to Toy Story, meaning{' '}
                <em>&apos;Tom Hanks acted in Toy Story&apos;</em>.
              </li>
            </ul>
          </li>
          <li>
            <strong>Details on the Arrow:</strong> Relationships can hold
            properties too! The little box on the arrow stores the role he
            played: <code>roles: Woody</code>.
          </li>
        </ul>

        <p style={{ marginTop: '1rem' }}>
          When you read the whole picture together, it forms a natural sentence:
          <br />
          <em>
            &apos;Tom Hanks, the actor, acted in the movie Toy Story, playing
            the role of Woody.&apos;
          </em>
          <br />
          That is essentially how Neo4j connects the dots across your data.
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <img
            src={img2}
            alt='Neo4j Relationships Diagram'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>3. From Visual Diagrams to Cypher Code</h3>
        <p>How do these visual drawings translate into database queries?</p>
        <p style={{ marginTop: '0.75rem' }}>
          Neo4j uses a query language called <strong>Cypher</strong>. Cypher is
          a declarative language that allows you to identify patterns in your
          data using an ASCII-art syntax consisting of brackets, dashes, and
          arrows. The diagram below shows how the example translates into Cypher
          code:
        </p>

        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Circles become Parentheses:</strong> Because nodes are drawn
            as round circles, in Cypher you type them using round parentheses:{' '}
            <code>(p:Person)</code> and <code>(m:Movie)</code>. The letter
            before the colon (<code>p</code>, <code>m</code>) is just a short
            nickname so you can refer to it in your query, while{' '}
            <code>Person</code> and <code>Movie</code> are the labels.
          </li>
          <li>
            <strong>Arrows become Code Arrows:</strong> In code, an arrow is
            drawn using dashes, square brackets, and an arrow sign:{' '}
            <code>-[r:ACTED_IN]-&gt;</code>. The square brackets hold the
            nickname (<code>r</code>) and relationship type (
            <code>ACTED_IN</code>), and <code>-&gt;</code> shows the direction.
          </li>
        </ul>

        <p style={{ marginTop: '1rem' }}>
          Put it all together:
          <br />
          <code>(p:Person)-[r:ACTED_IN]-&gt;(m:Movie)</code>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          It simply says: <em>&apos;A person acted in a movie.&apos;</em>
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <img
            src={img3}
            alt='Cypher Code Translation Diagram'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>

        <h3 className='sub-heading' style={{ marginTop: '1.5rem' }}>
          The Golden Rule of Graph Modeling
        </h3>
        <p style={{ marginTop: '0.75rem' }}>
          This simple grammar rule is the secret to getting graph data modeling
          right on your very first try:
        </p>

        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Nodes are Nouns:</strong> People, places, things, entities
            &mdash; <code>(:Person)</code>, <code>(:Product)</code>,{' '}
            <code>(:Order)</code>.
          </li>
          <li>
            <strong>Relationships are Verbs:</strong> Actions, connections,
            states &mdash; <code>[:PURCHASED]-&gt;</code>,{' '}
            <code>[:PLACED]-&gt;</code>, <code>[:CONTAINS]-&gt;</code>.
          </li>
        </ul>

        <p style={{ marginTop: '1rem' }}>
          When you read a Cypher pattern out loud, it naturally forms an
          everyday sentence:
        </p>

        <CodeCard code={grammarRuleCode}>
          (<span className='syn-label'>:Person</span>)-[
          <span className='syn-label'>:PLACED</span>]-&gt;(
          <span className='syn-label'>:Order</span>)-[
          <span className='syn-label'>:CONTAINS</span>]-&gt;(
          <span className='syn-label'>:Product</span>)
        </CodeCard>

        <blockquote style={{ marginTop: '0.5rem' }}>
          &quot;A person placed an order that contains a product.&quot;
        </blockquote>
      </section>

      {/* =========================================================================
          PART 2: HANDS-ON WORKSHOP TUTORIAL
         ========================================================================= */}
      <div
        className='article-panel'
        style={{
          background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))',
          margin: '2.5rem 0 1.5rem 0',
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
        }}
      >
        <h2
          style={{
            fontSize: '1.4rem',
            margin: '0 0 0.5rem 0',
            background: 'transparent',
            border: 'none',
            padding: 0,
          }}
        >
          Part 2: Hands-On Workshop Walkthrough
        </h2>
        <p style={{ margin: 0, color: 'var(--text-soft)' }}>
          Now that you understand the concepts, let&apos;s get hands-on! In this
          practical walkthrough, you will create a free cloud instance in Neo4j
          AuraDB, import a sample movie dataset, run queries with Cypher,
          explore the data with Bloom, and build knowledge graphs.
        </p>
      </div>

      <section className='article-panel'>
        <h3 className='sub-heading'>Workshop Setup: AuraDB Free Instance</h3>
        <p>
          Sign up using the link (
          <a href='https://console.neo4j.io/' target='_blank' rel='noreferrer'>
            https://console.neo4j.io/
          </a>
          )
        </p>

        <p style={{ marginTop: '1rem' }}>
          It will ask you to create a free instance. Click it - it might take
          around 10 minutes, so wait for it. Meanwhile, make sure to download
          the admin credentials for your instance as they are only shown once!
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <img
            src={createInstanceImg}
            alt='Create Neo4j Free Instance'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>Step 0: Download the Sample dataset</h3>
        <p>
          <a
            href='http://dev.neo4j.com/ga-movie-graph'
            target='_blank'
            rel='noreferrer'
          >
            http://dev.neo4j.com/ga-movie-graph
          </a>{' '}
          (Download the Sample dataset)
        </p>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>
          Step 1: Data Import &amp; Model Generation
        </h3>
        <p>
          Click <strong>Import</strong> in the sidebar menu &rarr; Click{' '}
          <strong>New data source</strong> &rarr; click{' '}
          <strong>.csv/.tsv local</strong>
        </p>

        <p style={{ marginTop: '1rem' }}>
          Import all the following 5 .csv files:
        </p>
        <ul className='bullet-list' style={{ marginTop: '0.5rem' }}>
          <li>
            <code>acted_in.csv</code>
          </li>
          <li>
            <code>directed.csv</code>
          </li>
          <li>
            <code>movies.csv</code>
          </li>
          <li>
            <code>persons.csv</code>
          </li>
          <li>
            <code>ratings.csv</code>
          </li>
        </ul>

        <p style={{ marginTop: '1rem' }}>
          Then in the top right corner Click <strong>Generate model</strong>{' '}
          &rarr; <strong>Generate with AI</strong>
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <img
            src={generateWithAiImg}
            alt='Generate Model with AI in Neo4j'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>

        <p>You can see the graphing model is generated on the screen</p>

        <div style={{ margin: '1.5rem 0' }}>
          <img
            src={graphModelImg}
            alt='Neo4j Generated Graph Model'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>

        <div
          style={{
            marginTop: '1.25rem',
            padding: '1.25rem',
            background: 'var(--surface-soft)',
            borderRadius: '10px',
            border: '1px solid var(--border)',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem' }}>
            Understanding the Graph Data Model in Neo4j
          </h4>

          <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            In traditional relational databases (SQL), data is split across
            tables and connected through foreign keys and join tables. In Neo4j
            the graph model is essentially the blueprint or schema-like
            representation of how your data will be organized as nodes,
            relationships, and properties.
          </p>
          <ul
            className='bullet-list'
            style={{ marginTop: '0.75rem', marginBottom: 0 }}
          >
            <li>
              <strong>Nodes (The Entities):</strong> The core objects from your
              data - such as <code>Movie</code>, <code>Person</code>, and{' '}
              <code>User</code> - each become distinct nodes.
            </li>
            <li>
              <strong>Relationships (First-Class Connections):</strong> Instead
              of hidden join tables, connections like <code>:ACTED_IN</code>,{' '}
              <code>:DIRECTED</code>, and <code>:RATED</code> directly link
              nodes together with direction and purpose.
            </li>
            <li>
              <strong>Properties (Rich Context):</strong> Attributes like an
              actor&apos;s character role, movie release year, or review rating
              are stored directly on both nodes and relationships.
            </li>
          </ul>
          <p
            style={{
              marginTop: '0.75rem',
              marginBottom: 0,
              color: 'var(--text-soft)',
              lineHeight: 1.6,
            }}
          >
            When you click <em>Generate with AI</em>, Neo4j scans the column
            headers and data patterns across all 5 CSV files, automatically
            constructing this whiteboard-friendly graph model so your data is
            ready to query as a connected network.
          </p>
        </div>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>Step 2: Run Import into AuraDB</h3>
        <p>
          Click <strong>&quot;Run import&quot;</strong> on the top right corner,
          select the instance and run import. This will load the dataset into
          Aura db
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <img
            src={importImg}
            alt='Run Import to Neo4j AuraDB instance'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>

        <p>You can close the window once the import finishes.</p>

        <p style={{ marginTop: '1rem' }}>
          Click <strong>Query</strong> in the sidebar menu. Copy and paste the
          query from Step 3 into the stream window. When you click run, it will
          ask you to connect to the instance - simply select your free instance
          to connect.
        </p>

        <p style={{ marginTop: '1rem' }}>
          Remember: Cypher is the query language Neo4j uses. It is a declarative
          language that allows you to identify patterns in your data using an
          intuitive ASCII-art syntax consisting of brackets, dashes, and arrows.
        </p>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>Step 3: Query</h3>
        <p>
          Run the following Cypher statement to find the people who acted in the
          movie &apos;Toy Story&apos;.
        </p>
        <p style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
          The query searches for any Person connected to the Movie titled
          &quot;Toy Story&quot; via an <code>ACTED_IN</code> relationship and
          returns their names along with their roles.
        </p>
        <CodeCard code={step3Query}>
          <span className='syn-comment'>// Find a pattern in the database</span>
          {'\n'}
          <span className='syn-keyword'>MATCH</span> (
          <span className='syn-var'>p</span>
          <span className='syn-label'>:Person</span>)-[
          <span className='syn-var'>r</span>
          <span className='syn-label'>:ACTED_IN</span>]-&gt;(
          <span className='syn-var'>m</span>
          <span className='syn-label'>:Movie</span>){'\n\n'}
          <span className='syn-comment'>// Filter on a node property</span>
          {'\n'}
          <span className='syn-keyword'>WHERE</span>{' '}
          <span className='syn-var'>m</span>.title ={' '}
          <span className='syn-string'>&quot;Toy Story&quot;</span>
          {'\n\n'}
          <span className='syn-comment'>// Choose what to return</span>
          {'\n'}
          <span className='syn-keyword'>RETURN</span>{' '}
          <span className='syn-var'>p</span>.name{' '}
          <span className='syn-keyword'>AS</span> actor,{' '}
          <span className='syn-var'>r</span>.role{' '}
          <span className='syn-keyword'>AS</span> role
        </CodeCard>

        <div style={{ margin: '1rem 0' }}>
          <img
            src={queryImg}
            alt='Neo4j Cypher Query Output'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>
      </section>

      <section className='article-panel'>
        <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-soft)' }}>
          Following are few sample queries you can try
        </p>
        <h3 className='sub-heading'>Step 4: Sample queries to try</h3>

        <CodeCard code={sampleQuery1}>
          <span className='syn-comment'>//Find a Movie you like</span>
          {'\n'}
          <span className='syn-keyword'>MATCH</span> (
          <span className='syn-var'>m</span>
          <span className='syn-label'>:Movie</span>){' '}
          <span className='syn-keyword'>RETURN</span>{' '}
          <span className='syn-var'>m</span>.title
        </CodeCard>

        <CodeCard code={sampleQuery2}>
          <span className='syn-comment'>
            // Use the ACTED_IN relationship to find who acted in the movie
          </span>
          {'\n'}
          <span className='syn-keyword'>MATCH</span> (
          <span className='syn-var'>p</span>
          <span className='syn-label'>:Person</span>)-[
          <span className='syn-label'>:ACTED_IN</span>]-&gt;(
          <span className='syn-var'>m</span>
          <span className='syn-label'>:Movie</span> &#123;title:{' '}
          <span className='syn-string'>&apos;Jumanji&apos;</span>&#125;)
          {'\n'}
          <span className='syn-keyword'>RETURN</span>{' '}
          <span className='syn-var'>p</span>.name
        </CodeCard>

        <CodeCard code={sampleQuery3}>
          <span className='syn-comment'>
            // Use the DIRECTED relationship to find who directed the movie
          </span>
          {'\n'}
          <span className='syn-keyword'>MATCH</span> (
          <span className='syn-var'>p</span>
          <span className='syn-label'>:Person</span>)-[
          <span className='syn-label'>:DIRECTED</span>]-&gt;(
          <span className='syn-var'>m</span>
          <span className='syn-label'>:Movie</span>){'\n'}
          <span className='syn-keyword'>WHERE</span>{' '}
          <span className='syn-var'>m</span>.title ={' '}
          <span className='syn-string'>&apos;Jumanji&apos;</span>
          {'\n'}
          <span className='syn-keyword'>RETURN</span>{' '}
          <span className='syn-var'>p</span>.name{' '}
          <span className='syn-keyword'>AS</span> Director
        </CodeCard>

        <CodeCard code={sampleQuery4}>
          <span className='syn-comment'>// The movie with the most rating</span>
          {'\n'}
          <span className='syn-keyword'>MATCH</span> (
          <span className='syn-var'>m</span>
          <span className='syn-label'>:Movie</span>)&lt;-[
          <span className='syn-var'>r</span>
          <span className='syn-label'>:RATED</span>]-()
          {'\n'}
          <span className='syn-keyword'>RETURN</span>{' '}
          <span className='syn-var'>m</span>.title{' '}
          <span className='syn-keyword'>AS</span> title,{' '}
          <span className='syn-fn'>count</span>(
          <span className='syn-var'>r</span>){' '}
          <span className='syn-keyword'>AS</span> rating_count
          {'\n'}
          <span className='syn-keyword'>ORDER BY</span> rating_count{' '}
          <span className='syn-keyword'>DESC</span>
          {'\n'}
          <span className='syn-keyword'>LIMIT</span>{' '}
          <span className='syn-val'>1</span>
        </CodeCard>

        <CodeCard code={sampleQuery5}>
          <span className='syn-comment'>
            // Top 10 movies based on average rating
          </span>
          {'\n'}
          <span className='syn-keyword'>MATCH</span> (
          <span className='syn-var'>u</span>
          <span className='syn-label'>:User</span>)-[
          <span className='syn-label'>:RATED</span>]-&gt;(
          <span className='syn-var'>m</span>
          <span className='syn-label'>:Movie</span>){'\n'}
          <span className='syn-keyword'>WITH</span>{' '}
          <span className='syn-var'>m</span>,{' '}
          <span className='syn-fn'>avg</span>(<span className='syn-var'>r</span>
          .rating) <span className='syn-keyword'>AS</span> avgRating
          {'\n'}
          <span className='syn-keyword'>ORDER BY</span> avgRating{' '}
          <span className='syn-keyword'>DESC</span>
          {'\n'}
          <span className='syn-keyword'>LIMIT</span>{' '}
          <span className='syn-val'>10</span>
          {'\n'}
          <span className='syn-keyword'>RETURN</span>{' '}
          <span className='syn-var'>m</span>.title{' '}
          <span className='syn-keyword'>AS</span> title, avgRating
        </CodeCard>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>Step 5: Writing to Neo4j</h3>

        <CodeCard code={step5WriteQuery1}>
          <span className='syn-comment'>
            // This query links a person named Senthil Palanivelu to the movie
            Jumanji with the role &quot;caesar&quot;
          </span>
          {'\n'}
          <span className='syn-keyword'>MERGE</span> (
          <span className='syn-var'>p</span>
          <span className='syn-label'>:Person</span> &#123;personTmdbId:{' '}
          <span className='syn-val'>12345</span>, name:{' '}
          <span className='syn-string'>&quot;Senthil Palanivelu&quot;</span>
          &#125;)
          {'\n'}
          <span className='syn-keyword'>MATCH</span> (
          <span className='syn-var'>m</span>
          <span className='syn-label'>:Movie</span> &#123;title:{' '}
          <span className='syn-string'>&quot;Jumanji&quot;</span>&#125;)
          {'\n'}
          <span className='syn-keyword'>MERGE</span> (
          <span className='syn-var'>p</span>)-[
          <span className='syn-var'>r</span>
          <span className='syn-label'>:ACTED_IN</span>]-&gt;(
          <span className='syn-var'>m</span>){'\n'}
          <span className='syn-keyword'>SET</span>{' '}
          <span className='syn-var'>r</span>.roles ={' '}
          <span className='syn-string'>&quot;caesar&quot;</span>
        </CodeCard>

        <CodeCard code={step5WriteQuery2}>
          <span className='syn-comment'>// Find your role in the movie</span>
          {'\n'}
          <span className='syn-keyword'>MATCH</span> (
          <span className='syn-var'>p</span>
          <span className='syn-label'>:Person</span> &#123;name:{' '}
          <span className='syn-string'>&quot;Senthil Palanivelu&quot;</span>
          &#125;)-[
          <span className='syn-var'>r</span>
          <span className='syn-label'>:ACTED_IN</span>]-&gt;(
          <span className='syn-var'>m</span>
          <span className='syn-label'>:Movie</span> &#123;title:{' '}
          <span className='syn-string'>&quot;Jumanji&quot;</span>&#125;)
          {'\n'}
          <span className='syn-keyword'>RETURN</span>{' '}
          <span className='syn-var'>r</span>.roles{' '}
          <span className='syn-keyword'>AS</span> role
        </CodeCard>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>
          Step 6: Bloom (Graphical representation)
        </h3>
        <p>
          <strong>Neo4j Bloom</strong> is an interactive graph exploration and
          visualization tool. Instead of writing Cypher queries, it allows
          anyone to search in natural language, visually expand node connections
          on the fly, and uncover hidden relationship patterns across the graph.
        </p>
        <p style={{ marginTop: '1rem' }}>
          In the left side bar click <strong>&quot;Bloom&quot;</strong> and then
          click <strong>&quot;Show me a graph&quot;</strong>
        </p>
        <div style={{ margin: '1rem 0' }}>
          <img
            src={bloomImg}
            alt='Neo4j Bloom Graphical Representation'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>Step 7: Dashboard (Analyze logs, chart)</h3>
        <p>
          <strong>Neo4j Dashboards</strong> provide real-time reporting and
          analytics powered by Cypher queries. They let you assemble interactive
          charts, KPI counters, and tables to monitor graph trends and track
          system data in a single unified view.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Click <strong>dashboard</strong> &rarr;{' '}
          <strong>Create from scratch</strong>
        </p>

        <div style={{ margin: '1rem 0' }}>
          <img
            src={board1Img}
            alt='Neo4j Dashboard View 1'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>

        <div style={{ margin: '1rem 0' }}>
          <img
            src={board2Img}
            alt='Neo4j Dashboard View 2'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>
          Step 8: Document Intelligence (Unstructured Data)
        </h3>
        <p>
          So far we have been working with structured data (CSV files). But what
          about unstructured data like PDFs, Word files, emails, reports,
          contracts, manuals, etc.? Neo4j can help you extract knowledge from
          unstructured documents.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Document Intelligence in Neo4j provides a powerful way to transform
          unstructured documents (PDFs, Word files, emails, reports, contracts,
          manuals, etc.) into a knowledge graph that can be searched, queried,
          and analyzed.
        </p>

        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>
            Tutorial video 1:{' '}
            <a
              href='https://youtu.be/7MoHbvJjzEQ'
              target='_blank'
              rel='noreferrer'
            >
              https://youtu.be/7MoHbvJjzEQ
            </a>
          </li>
          <li>
            Tutorial video 2:{' '}
            <a
              href='https://youtu.be/NgeDak5uW7Y'
              target='_blank'
              rel='noreferrer'
            >
              https://youtu.be/NgeDak5uW7Y
            </a>
          </li>
        </ul>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>Step 9: Neo4j Instance Inspect MCP URL</h3>
        <p>
          The Neo4j Instance Inspect MCP URL is used by AI agents and
          MCP-compatible tools to connect to a Neo4j database and inspect its
          structure automatically.
        </p>

        <p style={{ marginTop: '1rem' }}>
          Click <strong>Instance</strong> and then click the three dots{' '}
          <strong>...</strong> that you see at the right side of the screen, and
          then click <strong>Inspect</strong>.
        </p>

        <p style={{ marginTop: '1rem', fontWeight: 600 }}>
          It allows an AI assistant or agent to:
        </p>
        <ul className='bullet-list' style={{ marginTop: '0.5rem' }}>
          <li>
            Discover node labels (e.g., <code>Person</code>,{' '}
            <code>Company</code>, <code>Document</code>)
          </li>
          <li>
            Discover relationship types (e.g., <code>WORKS_FOR</code>,{' '}
            <code>OWNS</code>, <code>DEPENDS_ON</code>)
          </li>
          <li>View graph schema and metadata</li>
          <li>Understand available properties on nodes and relationships</li>
          <li>Generate Cypher queries based on the graph structure</li>
          <li>
            Explore and analyze the graph without requiring manual schema
            documentation
          </li>
        </ul>

        <div style={{ margin: '1.5rem 0' }}>
          <img
            src={instanceMcpUrlImg}
            alt='Neo4j Instance Inspect MCP URL in AuraDB'
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          />
        </div>
      </section>

      <section className='article-panel'>
        <h3 className='sub-heading'>Resources</h3>
        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>
            <a
              href='https://graphacademy.neo4j.com/'
              target='_blank'
              rel='noreferrer'
            >
              https://graphacademy.neo4j.com/
            </a>
          </li>
          <li>
            <a
              href='https://graphacademy.neo4j.com/courses/neo4j-fundamentals'
              target='_blank'
              rel='noreferrer'
            >
              https://graphacademy.neo4j.com/courses/neo4j-fundamentals
            </a>
          </li>
          <li>
            <a
              href='https://memory.neo4jlabs.com/'
              target='_blank'
              rel='noreferrer'
            >
              https://memory.neo4jlabs.com/
            </a>
          </li>
          <li>
            <a
              href='https://neo4j.com/startup-program/'
              target='_blank'
              rel='noreferrer'
            >
              https://neo4j.com/startup-program/
            </a>
          </li>
        </ul>
      </section>

      <style>{`
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

        .code-card {
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
        }

        .code-card__actions {
          display: flex;
          align-items: center;
          gap: 8px;
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
