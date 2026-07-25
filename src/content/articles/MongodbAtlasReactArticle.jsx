export function MongodbAtlasReactArticle() {
  return (
    <>
      <p className="article-lead">
        I attended a meetup recently about MongoDB Atlas and React. It made me rethink how we handle app state and backend infrastructure.
      </p>
      <p className="article-lead" style={{ marginTop: '1rem' }}>
        We have a memory problem in modern web apps. Standard React state is tied directly to the component you are looking at. If you hit refresh or close the tab, that context is gone. Your search history or your half-written notes are completely wiped out.
      </p>
      <p className="article-lead" style={{ marginTop: '1rem' }}>
        To fix this, we need to stop thinking about static views and start treating memory as a continuous workspace. But building that permanent memory usually creates a massive headache.
      </p>

      <section className="article-panel">
        <h2>The Translation Problem</h2>
        <p>
          Think about a traditional stack. Your React app speaks JSON. But your traditional database speaks SQL and uses rigid, spreadsheet-like tables. To make them talk, you have to add a translator (an ORM) in the middle.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Then you want a good search experience. So you bolt on an external search engine.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Then you want to add AI features. So you set up a separate vector database to handle the data embeddings.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Now you have three different backend systems. You have to build complex data pipelines just to keep them all in sync. It is a lot of overhead.
        </p>
        <p style={{ marginTop: '1rem', marginBottom: '1.25rem' }}>
          Here is a quick look at how the traditional approach compares to using a single data platform:
        </p>

        <div className="table-wrap">
          <table className="capability-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Capability</th>
                <th style={{ width: '37.5%' }}>Traditional Multi-Tool Stack</th>
                <th style={{ width: '37.5%' }} className="atlas-col-header">MongoDB Atlas Data Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Data flow</strong>
                </td>
                <td>SQL Rows &rarr; ORM mapping &rarr; React state</td>
                <td>
                  <strong className="atlas-highlight">Native JSON</strong> &rarr; Direct React Props/State
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Search &amp; Autocomplete</strong>
                </td>
                <td>Requires external tools (Elastic Search)</td>
                <td>
                  <strong className="atlas-highlight">Native Atlas search</strong> in same cluster
                </td>
              </tr>
              <tr>
                <td>
                  <strong>AI &amp; Vector Retrieval</strong>
                </td>
                <td>Sync data to external vector DBs</td>
                <td>
                  <strong className="atlas-highlight">Built-in Vector search</strong> &amp; Embeddings
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Serverless function</strong>
                </td>
                <td>Connection pooling &amp; cold-start issues</td>
                <td>
                  <strong className="atlas-highlight">Optimized Data API</strong> over HTTP
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="article-panel">
        <h2>The Single Platform Shift</h2>
        <p>
          The alternative is moving to a single platform that speaks the same language as your code.
        </p>
        <p style={{ marginTop: '1rem' }}>
          MongoDB stores data as documents. These documents map naturally to the JSON data your React app already uses. There is no ORM translation slowing things down. Data flows directly from your frontend state into your database. It is a natural fit.
        </p>
        <p style={{ marginTop: '1rem' }}>
          But the biggest advantage is how it handles the extras.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Atlas builds Lucene search and AI vector storage into the exact same database. Your user profiles, your chat history, and your AI embeddings all live in one place.
        </p>
      </section>

      <section className="article-panel">
        <h2>Why This Matters for AI</h2>
        <p>
          When your application data and your AI vectors are stored in separate databases, your AI is often working with stale information.
        </p>
        <p style={{ marginTop: '1rem' }}>
          By keeping them together, you completely eliminate the need for sync pipelines. You can run a semantic AI search (using HNSW) and a standard keyword search (using BM25) at the exact same time, in the same query. The AI always has the most current context.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And because Atlas uses a stateless Data API, you don&apos;t have to worry about connection pooling or cold-starts crashing your app when serverless functions wake up.
        </p>
        <p style={{ marginTop: '1rem' }}>
          We spend a lot of time as developers just managing infrastructure and stitching tools together. Moving to a platform that removes those middle layers just makes sense. It lets you focus on actually building the app.
        </p>
      </section>

      <style>{`
        .atlas-col-header {
          color: var(--text) !important;
          background: color-mix(in srgb, #10b981 22%, var(--surface-soft)) !important;
        }

        .capability-table th:nth-child(3),
        .capability-table td:nth-child(3) {
          background: color-mix(in srgb, #10b981 12%, transparent);
          color: var(--text);
        }

        .capability-table tr:nth-child(even) td:nth-child(3) {
          background: color-mix(in srgb, #10b981 18%, transparent);
        }

        .capability-table tr:hover td:nth-child(3) {
          background: color-mix(in srgb, #10b981 26%, transparent);
        }

        .atlas-highlight {
          color: var(--text);
          font-weight: 700;
        }

        .capability-table td:first-child {
          font-weight: 600;
          color: var(--text);
        }
      `}</style>
    </>
  );
}
