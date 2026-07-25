export function ReactUiPackagesArticle() {
  return (
    <>
      <p className="article-lead">
        Building a React UI package is tricky. You want to share a button or a form so other developers can use it. But you have no idea what their website looks like.
      </p>
      <p className="article-lead" style={{ marginTop: '1rem' }}>
        Their site might have heavy global CSS. If you aren&apos;t careful, their styles will crush your component. Or worse, your styles will leak out and break their website.
      </p>
      <p className="article-lead" style={{ marginTop: '1rem' }}>
        This is called CSS leakage. It happens when styles bleed where they shouldn&apos;t. And it is the biggest headache when building reusable UI components.
      </p>
      <p className="article-lead" style={{ marginTop: '1rem' }}>
        Here is how you fix it. You need to isolate your package completely.
      </p>

      <section className="article-panel">
        <h2>The Problem: Global CSS</h2>
        <p>
          Most web projects use a global CSS reset to clear out default browser margins and fonts. That is fine for a single website. But it is a disaster for a UI package.
        </p>
        <p style={{ marginTop: '1rem' }}>
          If your package includes a global reset, it will wipe out the styles of any website that installs it.
        </p>
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Here is what a bad setup looks like.
        </p>

        <div className="code-card">
          <div className="code-card__header code-card__header--bad">
            BAD: Unprotected Component
          </div>
          <pre className="code-block">
            <code>
              <span className="syn-comment">// BAD: This component has no protection.</span>{'\n'}
              <span className="syn-comment">// It relies on global styles and generic class names.</span>{'\n'}
              <span className="syn-keyword">import</span> <span className="syn-string">&apos;./global.css&apos;</span>; <span className="syn-comment">// This will ruin the host app</span>{'\n'}
              {'\n'}
              <span className="syn-keyword">export function</span> <span className="syn-func">PrimaryButton</span>() {'{'}{'\n'}
              {'  '}<span className="syn-keyword">return</span> ({'\n'}
              {'    '}&lt;<span className="syn-tag">button</span> <span className="syn-attr">className</span>=<span className="syn-string">&quot;bg-blue-500 text-white p-4 rounded&quot;</span>&gt;{'\n'}
              {'      '}Click Me{'\n'}
              {'    '}&lt;/<span className="syn-tag">button</span>&gt;{'\n'}
              {'  '});{'\n'}
              {'}'}
            </code>
          </pre>
        </div>

        <p style={{ marginTop: '1rem' }}>
          If the host app also uses a generic class like <code>bg-blue-500</code> but defines it as a different shade of blue, your button will look wrong.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Solution: Prefixes and Scoped Containers</h2>
        <p>
          To fix this, we build walls around our components. We do this in two steps.
        </p>
        <p style={{ marginTop: '1rem' }}>
          First, we use Tailwind CSS prefixes. You configure your package to add a unique prefix to every utility class. Instead of <code>bg-blue-500</code>, you use something like <code>my-lib-bg-blue-500</code>. Now your class names will never collide with the host app.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Second, we use a scoped root container. Instead of resetting global styles for the whole page, we create a specific wrapper. We only reset the styles inside this wrapper.
        </p>
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Here is how you build a protected component.
        </p>

        <div className="code-card" style={{ marginBottom: '1.5rem' }}>
          <div className="code-card__header">
            tailwind.config.js
          </div>
          <pre className="code-block">
            <code>
              <span className="syn-comment">// tailwind.config.js</span>{'\n'}
              <span className="syn-comment">// Configure your unique prefix here</span>{'\n'}
              <span className="syn-keyword">module</span>.<span className="syn-keyword">exports</span> = {'{'}{'\n'}
              {'  '}<span className="syn-prop">prefix</span>: <span className="syn-string">&apos;my-lib-&apos;</span>,{'\n'}
              {'  '}<span className="syn-prop">content</span>: [<span className="syn-string">{`'./src/**/*.{js,jsx}'`}</span>],{'\n'}
              {'  '}<span className="syn-comment">// ... rest of config</span>{'\n'}
              {'}'};
            </code>
          </pre>
        </div>

        <div className="code-card">
          <div className="code-card__header code-card__header--good">
            GOOD: Protected Component
          </div>
          <pre className="code-block">
            <code>
              <span className="syn-comment">// GOOD: Uses a scoped wrapper and prefixed classes.</span>{'\n'}
              <span className="syn-keyword">import</span> <span className="syn-string">&apos;./scoped-reset.css&apos;</span>; <span className="syn-comment">// Only affects things inside .my-lib-root</span>{'\n'}
              {'\n'}
              <span className="syn-keyword">export function</span> <span className="syn-func">PrimaryButton</span>() {'{'}{'\n'}
              {'  '}<span className="syn-keyword">return</span> ({'\n'}
              {'    '}&lt;<span className="syn-tag">div</span> <span className="syn-attr">className</span>=<span className="syn-string">&quot;my-lib-root&quot;</span>&gt;{'\n'}
              {'      '}&lt;<span className="syn-tag">button</span> <span className="syn-attr">className</span>=<span className="syn-string">&quot;my-lib-bg-blue-500 my-lib-text-white my-lib-p-4 my-lib-rounded&quot;</span>&gt;{'\n'}
              {'        '}Click Me{'\n'}
              {'      '}&lt;/<span className="syn-tag">button</span>&gt;{'\n'}
              {'    '}&lt;/<span className="syn-tag">div</span>&gt;{'\n'}
              {'  '});{'\n'}
              {'}'}
            </code>
          </pre>
        </div>
      </section>

      <section className="article-panel">
        <h2>Why This Works</h2>
        <p>
          By wrapping your exported component in a scoped container, you stop the host app&apos;s styles from creeping in. And by using prefixes, you guarantee your styles won&apos;t leak out.
        </p>
        <p style={{ marginTop: '1rem' }}>
          It takes a little extra work to set up. But it saves a lot of debugging later.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Always test your package in a completely empty app, and then test it again in a messy, complex app. If your components look exactly the same in both places, you have built a truly isolated UI package.
        </p>
      </section>

      <style>{`
        .code-card {
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }

        .code-card__header {
          padding: 8px 14px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          background: var(--surface-soft);
          color: var(--text-soft);
          border-bottom: 1px solid var(--border);
        }

        .code-card__header--bad {
          background: color-mix(in srgb, #ef4444 15%, transparent);
          color: #ef4444;
        }

        .code-card__header--good {
          background: color-mix(in srgb, #10b981 15%, transparent);
          color: #10b981;
        }

        .code-block {
          margin: 0;
          padding: 16px;
          background: #0d1117;
          overflow-x: auto;
        }

        .code-block code {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.92em;
          line-height: 1.6;
          color: #c9d1d9;
          background: none;
          padding: 0;
        }

        .syn-comment {
          color: #8b949e;
          font-style: italic;
        }

        .syn-keyword {
          color: #ff7b72;
          font-weight: 600;
        }

        .syn-string {
          color: #a5d6ff;
        }

        .syn-func {
          color: #d2a8ff;
          font-weight: 600;
        }

        .syn-tag {
          color: #7ee787;
          font-weight: 600;
        }

        .syn-attr {
          color: #79c0ff;
        }

        .syn-prop {
          color: #ffa657;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}
