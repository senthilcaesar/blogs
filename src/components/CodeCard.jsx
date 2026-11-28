import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, Maximize2, Minimize2 } from 'lucide-react';
import { highlight } from '../lib/highlight';

const LANG_LABELS = {
  bash: 'Terminal',
  shell: 'Terminal',
  sh: 'Terminal',
  python: 'Python',
  py: 'Python',
  js: 'JavaScript',
  javascript: 'JavaScript',
  jsx: 'JSX',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  tsx: 'TSX',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  sql: 'SQL',
  html: 'HTML',
  xml: 'XML',
  css: 'CSS',
  cypher: 'Cypher',
  turtle: 'Turtle',
  markdown: 'Markdown',
  md: 'Markdown',
  chat: 'Transcript',
  text: 'Text',
};

const labelFor = (lang) => LANG_LABELS[lang?.toLowerCase()] || lang || 'Code';

/**
 * A code block drawn as a small app window: traffic-light dots, a file tab,
 * and a copy button in the header.
 *
 * - `code`     the exact text that is copied (and highlighted when no children);
 *              when omitted, the rendered text is copied
 * - `lang`     language key for the built-in highlighter and the default tab label
 * - `title` / `file`  override the tab label
 * - `children` pre-rendered (hand-highlighted) code; `code` is still what's copied
 * - `tall`     caps the body height and scrolls
 * - `tabs`     [{ label, code, lang, content? }] shows one tab per snippet;
 *              the copy button copies the active one
 * - `expandable` adds a button that opens the card full screen (Esc closes it)
 */
export function CodeCard({ code = '', lang, file, title, tall = false, children, style, className = '', tabs, expandable = false }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(0);
  const preRef = useRef(null);

  const panes = tabs?.length
    ? tabs.map((t) => ({ ...t, label: t.label || labelFor(t.lang) }))
    : [{ label: title || file || labelFor(lang), code, lang, content: children }];
  const pane = panes[Math.min(active, panes.length - 1)];
  const label = pane.label;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pane.code || preRef.current?.textContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy snippet:', err);
    }
  };

  useEffect(() => {
    if (!expanded) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [expanded]);

  const renderWindow = (full) => (
    <figure
      className={`code-window ${full ? 'code-window--full' : ''} ${className}`.trim()}
      style={full ? undefined : style}
      role={full ? 'dialog' : undefined}
      aria-modal={full ? 'true' : undefined}
      aria-label={full ? label : undefined}
      onClick={full ? (e) => e.stopPropagation() : undefined}
    >
      <div className="code-window__bar">
        <span className="code-window__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {panes.length > 1 ? (
          <span className="code-window__tabs" role="tablist">
            {panes.map((p, i) => (
              <button
                key={p.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`code-window__tab ${i === active ? '' : 'code-window__tab--idle'}`.trim()}
                onClick={() => {
                  setActive(i);
                  setCopied(false);
                }}
              >
                {p.label}
              </button>
            ))}
          </span>
        ) : (
          <span className="code-window__tab">{label}</span>
        )}
        <button
          type="button"
          className={`code-window__copy ${copied ? 'code-window__copy--copied' : ''}`}
          onClick={handleCopy}
          title="Copy snippet"
          aria-label={copied ? 'Copied' : `Copy ${label} to clipboard`}
        >
          {copied ? <Check size={16} strokeWidth={2.25} /> : <Copy size={16} strokeWidth={2.25} />}
        </button>
        {expandable && (
          <button
            type="button"
            className="code-window__copy code-window__expand"
            onClick={() => setExpanded(!full)}
            title={full ? 'Exit full screen (Esc)' : 'Full screen'}
            aria-label={full ? 'Exit full screen' : `Open ${label} full screen`}
            autoFocus={full}
          >
            {full ? <Minimize2 size={16} strokeWidth={2.25} /> : <Maximize2 size={16} strokeWidth={2.25} />}
          </button>
        )}
      </div>
      <pre
        ref={full ? undefined : preRef}
        className={`code-block ${tall && !full ? 'code-block--tall' : ''}`.trim()}
      >
        <code>{pane.content ?? highlight(pane.code ?? '', pane.lang)}</code>
      </pre>
    </figure>
  );

  return (
    <>
      {renderWindow(false)}
      {expanded &&
        createPortal(
          <div className="code-window-overlay" onClick={() => setExpanded(false)}>
            {renderWindow(true)}
          </div>,
          document.body,
        )}
    </>
  );
}
