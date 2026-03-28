import {
  Cloud,
  Code2,
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
};

export function TechStackModal({ isOpen, onClose, stack }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-stack-title"
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Close tech stack dialog"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="modal-copy">
          <p className="modal-eyebrow">Inside this project</p>
          <h2 id="tech-stack-title">Project Tech Stack</h2>
          <p className="modal-intro">
            This app is built using the following technologies:
          </p>
        </div>

        <div className="tech-stack-list">
          {stack.map((item) => {
            const Icon = iconMap[item.icon] ?? Code2;
            return (
              <article className="tech-item" key={item.key}>
                <div className={`tech-item__icon tech-item__icon--${item.tone}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
