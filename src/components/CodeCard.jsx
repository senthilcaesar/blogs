import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { highlight } from '../lib/highlight';

// A code block with an icon-only copy button in its top-right corner.
export function CodeCard({ code, lang, file, style }) {
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

  const label = copied ? 'Copied' : `Copy ${file || lang || 'code'} to clipboard`;

  return (
    <div className="code-snippet" style={{ marginTop: '1rem', ...style }}>
      <button
        type="button"
        className={`code-snippet__copy ${copied ? 'code-snippet__copy--copied' : ''}`}
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy'}
        aria-label={label}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre className="code-block">
        <code>{highlight(code, lang)}</code>
      </pre>
    </div>
  );
}
