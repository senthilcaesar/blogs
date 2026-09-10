import {
  Check,
  Cloud,
  Code2,
  Copy,
  Database,
  Layers,
  Palette,
  Route,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  TECH_STACK_INTRO,
  TECH_STACK_SUMMARY,
  TECH_STACK_TITLE,
  formatTechStackForCopy,
} from '../lib/techStack';

const iconMap = {
  react: Code2,
  zap: Zap,
  route: Route,
  code: Code2,
  palette: Palette,
  sparkles: Sparkles,
  cloud: Cloud,
  shield: ShieldCheck,
  database: Database,
};

const iconSizeFor = { feature: 26, wide: 20, small: 18 };

export function TechStackModal({ isOpen, onClose, stack }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Drop the "Copied" state when the dialog is dismissed, so reopening it
  // always starts from the idle label.
  useEffect(() => {
    if (isOpen) return undefined;

    setCopied(false);
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!copied) return undefined;

    const timerId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timerId);
  }, [copied]);

  if (!isOpen) return null;

  async function handleCopy() {
    let success = false;

    try {
      await navigator.clipboard.writeText(formatTechStackForCopy(stack));
      success = true;
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy tech stack:', err);
    }

    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: {
          message: success ? 'Tech stack copied' : 'Copy failed',
          type: success ? 'success' : 'error',
        },
      }),
    );
  }

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal-card modal-card--tech-stack"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-stack-title"
      >
        <div className="modal-header">
          <div className="modal-header__title-group">
            <div className="modal-header__badge">
              <Layers size={13} />
              <span>{stack.length} Core Technologies</span>
            </div>
            <h2 id="tech-stack-title">{TECH_STACK_TITLE}</h2>
            <p className="modal-intro">{TECH_STACK_INTRO}</p>
          </div>

          <div className="modal-header__actions">
            <button
              className={`modal-copy ${copied ? 'modal-copy--done' : ''}`}
              type="button"
              aria-label="Copy tech stack details to clipboard"
              onClick={handleCopy}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              className="modal-close"
              type="button"
              aria-label="Close tech stack dialog"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="tech-bento">
          {stack.map((item) => {
            const Icon = iconMap[item.icon] ?? Code2;
            const size = item.size ?? 'small';
            return (
              <article
                className={`tech-card tech-card--${size} tech-card--${item.tone}`}
                key={item.key}
              >
                <div className="tech-card__icon">
                  <Icon size={iconSizeFor[size] ?? 18} />
                </div>
                <div className="tech-card__content">
                  <h3 className="tech-card__name">{item.name}</h3>
                  <p className="tech-card__desc">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="modal-footer">
          <span className="modal-footer__text">{TECH_STACK_SUMMARY}</span>
        </div>
      </div>
    </div>
  );
}
