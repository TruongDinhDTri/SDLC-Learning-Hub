export function BrandMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="14" cy="14" rx="5" ry="9"
            transform={`rotate(${angle},14,14) translate(0,-5)`}
            fill="var(--rose)" opacity="0.85"
          />
        ))}
        <circle cx="14" cy="14" r="3.5" fill="var(--peach)" />
      </svg>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 15,
          color: 'var(--ink)',
          lineHeight: 1.1,
        }}>
          Hanami
        </div>
        <div style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 11,
          color: 'var(--ink-faint)',
          lineHeight: 1,
        }}>
          playbook
        </div>
      </div>
    </div>
  )
}
