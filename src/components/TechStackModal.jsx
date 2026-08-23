import {
  Cloud,
  Code2,
  Database,
  Layers,
  Palette,
  Route,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { useEffect } from 'react';

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

export function TechStackModal({ isOpen, onClose, stack }) {
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

  if (!isOpen) return null;

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
            <h2 id="tech-stack-title">Architecture & Tech Stack</h2>
            <p className="modal-intro">
              The modern tools, cloud storage, and libraries powering this blog.
            </p>
          </div>

          <button
            className="modal-close"
            type="button"
            aria-label="Close tech stack dialog"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="tech-stack-grid">
          {stack.map((item) => {
            const Icon = iconMap[item.icon] ?? Code2;
            return (
              <article className={`tech-card tech-card--${item.tone}`} key={item.key}>
                <div className={`tech-card__icon tech-card__icon--${item.tone}`}>
                  <Icon size={20} />
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
          <span className="modal-footer__text">
            Client-side React 19 App with Firebase Cloud Firestore Realtime Backend
          </span>
        </div>
      </div>
    </div>
  );
}
