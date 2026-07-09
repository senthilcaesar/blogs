export function PythonOrmsSqlalchemyArticle() {
  return (
    <>
      <p className="article-lead">
        In modern software development, applications constantly need to store, retrieve, and manipulate data. 
        However, a fundamental friction exists between object-oriented programming (OOP) in languages like Python and relational database management systems (RDBMS). 
        This friction is known as the <em>object-relational impedance mismatch</em>.
      </p>
      <p className="article-lead" style={{ marginTop: '1rem' }}>
        SQLAlchemy serves as the premier bridge for this gap. To understand SQLAlchemy, it helps to first understand the problem it solves.
      </p>

      <section className="article-grid article-grid--two">
        <article className="article-panel">
          <h2>The Problem</h2>
          <p>
            Databases (like PostgreSQL, MySQL, or SQLite) speak <strong>SQL</strong>. 
            Python speaks in <strong>objects</strong> (classes and instances).
          </p>
          <p style={{ marginTop: '1rem' }}>
            Historically, if you wanted a Python application to talk to a database, you had to write 
            raw SQL queries as strings inside your Python code.
          </p>
          <div className="pain-point-badge" style={{ marginTop: '1.5rem' }}>
            ❌ Hard to read & maintain. Vulnerable to SQL injection.
          </div>
        </article>

        <article className="article-panel">
          <h2>What is an ORM?</h2>
          <p>
            <strong>ORM</strong> stands for <strong>Object-Relational Mapper</strong>.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Think of it as a translator. An ORM sits between your Python code and your database. 
            It lets you interact with your database using regular Python code instead of raw SQL.
          </p>
        </article>
      </section>

      <section className="article-panel">
        <h2>The ORM Mental Model</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Here is how an ORM translates concepts between the object-oriented Python world and the relational database world:
        </p>

        <div className="mapping-container">
          <div className="mapping-row">
            <div className="mapping-col python-side">
              <span className="tech-badge python">Python Class</span>
              <code>class User(Base):</code>
            </div>
            <div className="mapping-arrow">↔</div>
            <div className="mapping-col sql-side">
              <span className="tech-badge sql">Database Table</span>
              <code>users</code>
            </div>
          </div>

          <div className="mapping-row">
            <div className="mapping-col python-side">
              <span className="tech-badge python">Python Object (Instance)</span>
              <code>user = User(name="Alice")</code>
            </div>
            <div className="mapping-arrow">↔</div>
            <div className="mapping-col sql-side">
              <span className="tech-badge sql">Table Row</span>
              <code>| 1 | Alice | alice@example.com |</code>
            </div>
          </div>

          <div className="mapping-row">
            <div className="mapping-col python-side">
              <span className="tech-badge python">Python Attribute</span>
              <code>user.name</code>
            </div>
            <div className="mapping-arrow">↔</div>
            <div className="mapping-col sql-side">
              <span className="tech-badge sql">Table Column</span>
              <code>name (VARCHAR)</code>
            </div>
          </div>
        </div>
      </section>

      <section className="article-panel">
        <h2>What is SQLAlchemy?</h2>
        <p>
          <strong>SQLAlchemy</strong> is the most popular and powerful ORM library for Python. 
          It is the industry standard for connecting Python applications to relational databases.
        </p>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: 600 }}>
          Code Comparison
        </h3>
        
        <div className="comparison-grid">
          <div className="comparison-card">
            <div className="card-header-label sql-label">Raw SQL Approach</div>
            <pre>
              <code>
                <span className="code-keyword">SELECT</span> * <span className="code-keyword">FROM</span> users <span className="code-keyword">WHERE</span> id = <span className="code-number">1</span>;
              </code>
            </pre>
          </div>

          <div className="comparison-card">
            <div className="card-header-label sqlalchemy-label">SQLAlchemy ORM Approach</div>
            <pre>
              <code>
                user = session.query(User).get(<span className="code-number">1</span>)
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="article-panel">
        <h2>Why do people use SQLAlchemy?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>🐍 Stay in Python</h3>
            <p>You don't have to switch your brain back and forth between Python logic and SQL syntax. You just write Python.</p>
          </div>
          <div className="feature-item">
            <h3>⚙️ Database Independence</h3>
            <p>Different databases have slightly different SQL dialects. SQLAlchemy abstracts that. Write Python once, switch underlying databases with minimal configuration changes.</p>
          </div>
          <div className="feature-item">
            <h3>🔒 Built-in Security</h3>
            <p>It automatically sanitizes input data, protecting your application from common vulnerabilities like SQL injection.</p>
          </div>
          <div className="feature-item">
            <h3>🚀 Less Repetitive Code</h3>
            <p>It handles connection pooling, transaction lifecycles, and statement generation behind the scenes, eliminating boilerplate code.</p>
          </div>
        </div>
      </section>

      <div className="article-panel article-panel--accent">
        <h2>Summary</h2>
        <p className="article-lead">
          In short, SQLAlchemy is a tool that lets you manage your database using the Python skills you already have, making your code cleaner and much easier to manage.
        </p>
      </div>

      <style>{`
        .pain-point-badge {
          display: inline-block;
          padding: 8px 16px;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border-left: 3px solid var(--accent);
          color: var(--text);
          font-weight: 500;
          font-size: 0.95rem;
          border-radius: 0 8px 8px 0;
        }

        .mapping-container {
          display: grid;
          gap: 16px;
          margin-top: 1rem;
        }

        .mapping-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: var(--surface-soft);
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .mapping-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mapping-arrow {
          font-size: 1.5rem;
          color: var(--accent);
          font-weight: bold;
          text-align: center;
        }

        .tech-badge {
          display: inline-block;
          width: fit-content;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .tech-badge.python {
          background: color-mix(in srgb, var(--accent-secondary) 15%, transparent);
          color: var(--accent-secondary);
        }

        .tech-badge.sql {
          background: color-mix(in srgb, var(--accent-tertiary) 15%, transparent);
          color: var(--accent-tertiary);
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 1rem;
        }

        @media (min-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .comparison-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }

        .card-header-label {
          padding: 8px 12px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 1px solid var(--border);
        }

        .sql-label {
          background: color-mix(in srgb, var(--accent-tertiary) 10%, transparent);
          color: var(--accent-tertiary);
        }

        .sqlalchemy-label {
          background: color-mix(in srgb, var(--accent-secondary) 10%, transparent);
          color: var(--accent-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 1rem;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .feature-item {
          padding: 16px;
          background: var(--surface-soft);
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .feature-item h3 {
          margin: 0 0 8px 0;
          font-size: 1.1rem;
          color: var(--accent);
        }

        .feature-item p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-soft);
        }

        /* Code block styles */
        code {
          font-family: 'IBM Plex Mono', monospace;
          background: var(--surface-soft);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--accent-secondary);
          font-size: 0.9em;
        }

        pre {
          margin: 0;
          padding: 16px;
          background: var(--surface-soft);
          height: 100%;
          overflow-x: auto;
        }

        pre code {
          background: none;
          padding: 0;
          border: none;
          color: var(--text);
          font-size: 0.9em;
        }

        .code-keyword {
          color: var(--accent);
          font-weight: bold;
        }

        .code-number {
          color: var(--accent-secondary);
        }
      `}</style>
    </>
  );
}
