import { useEffect, useMemo, useState } from 'react';

// Distance from the viewport top at which a heading counts as "being read"
const spyOffset = 120;

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= spyOffset) current = id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids]);

  return activeId;
}

// HashRouter owns the URL hash, so jump with scrollIntoView instead of #anchors
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}

function TocLink({ id, label, activeId, onNavigate, className = '' }) {
  const active = id === activeId;
  return (
    <button
      type="button"
      className={`toc__link ${className} ${active ? 'toc__link--active' : ''}`}
      aria-current={active ? 'location' : undefined}
      onClick={() => onNavigate(id)}
    >
      {label}
    </button>
  );
}

function TocList({ groups, activeId, onNavigate }) {
  return (
    <ul className="toc__groups">
      {groups.map((group) => (
        <li key={group.id}>
          <TocLink
            id={group.id}
            label={group.label}
            activeId={activeId}
            onNavigate={onNavigate}
            className="toc__group"
          />
          {group.items?.length > 0 && (
            <ul className="toc__items">
              {group.items.map((item) => (
                <li key={item.id}>
                  <TocLink id={item.id} label={item.label} activeId={activeId} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * "On this page" navigation. On wide screens it sits in the left gutter and
 * sticks while you read; on narrow screens it collapses above the article.
 * `groups` is [{ id, label, items?: [{ id, label }] }], where each id matches
 * a heading id in the article.
 */
export function ArticleToc({ groups }) {
  const ids = useMemo(
    () => groups.flatMap((group) => [group.id, ...(group.items ?? []).map((item) => item.id)]),
    [groups],
  );
  const activeId = useActiveSection(ids);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="toc-rail" aria-label="On this page">
        <nav className="toc">
          <p className="toc__title">On this page</p>
          <TocList groups={groups} activeId={activeId} onNavigate={scrollToSection} />
        </nav>
      </aside>

      <details className="toc-mobile" open={mobileOpen} onToggle={(e) => setMobileOpen(e.currentTarget.open)}>
        <summary className="toc__title">On this page</summary>
        <nav className="toc" aria-label="On this page">
          <TocList
            groups={groups}
            activeId={activeId}
            onNavigate={(id) => {
              setMobileOpen(false);
              scrollToSection(id);
            }}
          />
        </nav>
      </details>
    </>
  );
}
