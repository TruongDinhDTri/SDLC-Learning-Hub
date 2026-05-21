import type { ReactNode, CSSProperties } from 'react';

interface TwoColumnLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  rightPanel?: ReactNode;
  className?: string;
}

export default function TwoColumnLayout({
  sidebar,
  main,
  rightPanel,
  className,
}: TwoColumnLayoutProps) {
  const surfaceClass = ['hanami-surface', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={surfaceClass} style={{ display: 'flex' }}>
      {/* Fixed sidebar — 272px wide */}
      <div style={{ width: 272, flexShrink: 0 }}>{sidebar}</div>

      {/* Scrollable main content area */}
      <div
        className="hanami-main-content"
        style={{ flex: 1, overflow: 'auto', height: '100vh' }}
      >
        <main
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            padding: '0 32px 48px',
            position: 'relative',
          }}
        >
          {rightPanel ? (
            <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
              {/* Primary article column */}
              <div style={{ flex: 1, maxWidth: 660, minWidth: 0 }}>{main}</div>

              {/* Right panel */}
              <div style={{ width: 220, flexShrink: 0 }}>{rightPanel}</div>
            </div>
          ) : (
            main
          )}
        </main>
      </div>
    </div>
  );
}
