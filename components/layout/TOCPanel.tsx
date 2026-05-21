'use client';

import type { ReactNode } from 'react';

interface TOCItem {
  id: string;
  label: string;
  level?: number;
}

interface UpNext {
  title: string;
  description: string;
  href: string;
}

interface RelatedItem {
  label: string;
  href: string;
  icon?: string;
}

interface SandboxCta {
  label: string;
  href: string;
}

interface TOCPanelProps {
  items: TOCItem[];
  activeId?: string;
  upNext?: UpNext;
  related?: RelatedItem[];
  sandboxCta?: SandboxCta;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function TOCPanel({
  items,
  activeId,
  upNext,
  related,
  sandboxCta,
}: TOCPanelProps) {
  return (
    <nav className="hb-toc hanami-toc-panel">
      {/* ON THIS PAGE */}
      <div className="hb-toc__section-label">On this page</div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          const indent = item.level && item.level > 1 ? (item.level - 1) * 12 : 0;

          return (
            <li key={item.id}>
              <button
                type="button"
                className={['hb-toc__item', isActive ? 'hb-toc__item--active' : ''].filter(Boolean).join(' ')}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  paddingLeft: indent ? `${4 + indent}px` : undefined,
                  fontFamily: 'inherit',
                }}
                onClick={() => scrollToId(item.id)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Divider */}
      {(upNext || related || sandboxCta) && (
        <div
          style={{
            height: 1,
            background: 'var(--line-strong)',
            margin: '16px 0',
          }}
        />
      )}

      {/* UP NEXT IN THIS PATH */}
      {upNext && (
        <div style={{ marginBottom: related || sandboxCta ? 16 : 0 }}>
          <div className="hb-toc__section-label" style={{ marginBottom: 8 }}>
            Up next in this path
          </div>
          <a
            href={upNext.href}
            className="hb-up-next"
            style={{ display: 'block', textDecoration: 'none' }}
          >
            <div className="hb-up-next__title">{upNext.title}</div>
            <div className="hb-up-next__desc">{upNext.description}</div>
            <div className="hb-up-next__link">
              Continue <span aria-hidden="true">→</span>
            </div>
          </a>
        </div>
      )}

      {/* RELATED */}
      {related && related.length > 0 && (
        <div style={{ marginBottom: sandboxCta ? 16 : 0 }}>
          <div className="hb-toc__section-label" style={{ marginBottom: 8 }}>
            Related
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {related.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hb-toc__item"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {item.icon && (
                    <span aria-hidden="true" style={{ fontSize: 13 }}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SANDBOX CTA */}
      {sandboxCta && (
        <a
          href={sandboxCta.href}
          className="hb-up-next hb-btn--primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            textDecoration: 'none',
            fontSize: 12,
            fontWeight: 600,
            padding: '10px 12px',
            borderRadius: 'var(--r-md)',
            marginTop: 4,
          }}
        >
          <span aria-hidden="true">⚡</span>
          {sandboxCta.label}
        </a>
      )}
    </nav>
  );
}
