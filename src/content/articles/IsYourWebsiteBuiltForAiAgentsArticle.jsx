import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const ariraImg = new URL('../../../images/arira.webp', import.meta.url).href;

const snippet1 = `<div className="btn-primary" onClick={handleBook}>
  Book
</div>`;

const snippet2 = `<button
  type="button"
  aria-label="Book a table for two at 7pm"
  onClick={handleBook}
>
  Book
</button>`;

function CodeCard({ code, children }) {
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
        <span className='code-card__lang'>html</span>
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
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function IsYourWebsiteBuiltForAiAgentsArticle() {
  return (
    <>
      <p className='article-lead'>
        Websites are typically built for human users, but AI agents increasingly
        interact with the same interfaces. Semantic HTML and accessibility
        attributes provide the context agents need to understand and act
        reliably.
      </p>

      <section className='article-panel'>
        <h2>The Problem: Ambiguous Elements</h2>
        <p>Take a common pattern:</p>

        <CodeCard code={snippet1}>
          <span className='syn-bracket'>&lt;</span>
          <span className='syn-tag'>div</span>{' '}
          <span className='syn-attr'>className</span>
          <span className='syn-punct'>=</span>
          <span className='syn-string'>&quot;btn-primary&quot;</span>{' '}
          <span className='syn-attr'>onClick</span>
          <span className='syn-punct'>=&#123;</span>
          <span className='syn-val'>handleBook</span>
          <span className='syn-punct'>&#125;</span>
          <span className='syn-bracket'>&gt;</span>
          {'\n  '}
          <span className='syn-text'>Book</span>
          {'\n'}
          <span className='syn-bracket'>&lt;/</span>
          <span className='syn-tag'>div</span>
          <span className='syn-bracket'>&gt;</span>
        </CodeCard>

        <p style={{ marginTop: '1.25rem' }}>
          A human sees the styling and figures out what it does. But an
          automated agent or screen reader is left guessing:
        </p>
        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>Is this clickable?</li>
          <li>Is it a button, a link, or something else?</li>
          <li>What are we booking? A flight, a hotel, or a table?</li>
          <li>Is it enabled right now?</li>
        </ul>
      </section>

      <section className='article-panel'>
        <h2>The Fix: Semantic HTML and Explicit Context</h2>
        <p>Now look at the native alternative:</p>

        <CodeCard code={snippet2}>
          <span className='syn-bracket'>&lt;</span>
          <span className='syn-tag'>button</span>
          {'\n  '}
          <span className='syn-attr'>type</span>
          <span className='syn-punct'>=</span>
          <span className='syn-string'>&quot;button&quot;</span>
          {'\n  '}
          <span className='syn-attr'>aria-label</span>
          <span className='syn-punct'>=</span>
          <span className='syn-string'>
            &quot;Book a table for two at 7pm&quot;
          </span>
          {'\n  '}
          <span className='syn-attr'>onClick</span>
          <span className='syn-punct'>=&#123;</span>
          <span className='syn-val'>handleBook</span>
          <span className='syn-punct'>&#125;</span>
          {'\n'}
          <span className='syn-bracket'>&gt;</span>
          {'\n  '}
          <span className='syn-text'>Book</span>
          {'\n'}
          <span className='syn-bracket'>&lt;/</span>
          <span className='syn-tag'>button</span>
          <span className='syn-bracket'>&gt;</span>
        </CodeCard>

        <p style={{ marginTop: '1.25rem' }}>Instantly, the intent is clear:</p>
        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Element type:</strong> Button
          </li>
          <li>
            <strong>Action:</strong> Booking
          </li>
          <li>
            <strong>Context:</strong> Restaurant table
          </li>
          <li>
            <strong>Details:</strong> Two people at 7:00 PM
          </li>
        </ul>
      </section>

      <section className='article-panel'>
        <h2>How to Build for Agents and Humans Alike</h2>
        <ol className='resource-list' style={{ marginTop: '1rem' }}>
          <li>
            <strong>Use real HTML tags.</strong> Prefer{' '}
            <code>&lt;button&gt;</code>, <code>&lt;nav&gt;</code>,{' '}
            <code>&lt;form&gt;</code>, and <code>&lt;table&gt;</code> over
            generic <code>&lt;div&gt;</code> tags.
          </li>
          <li>
            <strong>Add clear labels.</strong> Use descriptive ARIA labels, form
            labels, and clear element names.
          </li>
          <li>
            <strong>Make state visible.</strong> Use attributes like{' '}
            <code>aria-expanded</code>, <code>aria-selected</code>, and{' '}
            <code>aria-disabled</code>.
          </li>
          <li>
            <strong>Leverage structured data.</strong> Use Schema.org or JSON-LD
            where relevant.
          </li>
        </ol>
      </section>

      <section className='article-panel'>
        <h2>The Payoff</h2>
        <p>
          Writing semantic, accessible markup isn&apos;t just about good habits.
          It directly helps:
        </p>
        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>AI agents and future agentic browsers navigate reliably.</li>
          <li>Assistive technologies serve users better.</li>
          <li>
            Testing platforms (like TestEase) discover elements easily, heal
            broken tests automatically, and run without brittle selectors.
          </li>
        </ul>
        <p style={{ marginTop: '1.5rem' }}>
          When you build for accessibility, you build for the future of the web.
        </p>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={ariraImg}
          alt='Is Your Website Built for AI Agents?'
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '16px',
            border: '1px solid var(--border)',
          }}
        />
      </div>

      <section className='article-panel'>
        <h2>References</h2>
        <ul className='bullet-list' style={{ marginTop: '0.75rem' }}>
          <li>
            <a
              href='https://docs.copilotkit.ai/'
              target='_blank'
              rel='noreferrer'
            >
              https://docs.copilotkit.ai/
            </a>
          </li>
          <li>
            <a
              href='https://developer.chrome.com/docs/ai/webmcp'
              target='_blank'
              rel='noreferrer'
            >
              https://developer.chrome.com/docs/ai/webmcp
            </a>
          </li>
          <li>
            <a
              href='https://jamesqquick.com/blog/a-beginners-guide-to-webmcp-with-react/'
              target='_blank'
              rel='noreferrer'
            >
              https://jamesqquick.com/blog/a-beginners-guide-to-webmcp-with-react/
            </a>
          </li>
          <li>
            <a
              href='https://modelcontextprotocol.io/extensions/client-matrix'
              target='_blank'
              rel='noreferrer'
            >
              https://modelcontextprotocol.io/extensions/client-matrix
            </a>
          </li>
        </ul>
      </section>

      <style>{`
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

        .syn-bracket {
          color: #8b949e;
        }

        .syn-tag {
          color: #7ee787;
          font-weight: 600;
        }

        .syn-attr {
          color: #79c0ff;
        }

        .syn-punct {
          color: #8b949e;
        }

        .syn-string {
          color: #a5d6ff;
        }

        .syn-val {
          color: #ffa657;
        }

        .syn-text {
          color: #f0f6fc;
        }
      `}</style>
    </>
  );
}
