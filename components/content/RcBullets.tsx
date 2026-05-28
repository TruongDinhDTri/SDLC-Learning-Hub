import React from 'react'

interface RcBulletsProps {
  items: React.ReactNode[]
}

export function RcBullets({ items }: RcBulletsProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      margin: '10px 0 20px 0',
    }}>
      {items.map((item, i) => (
        <span key={i} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 12px',
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.4,
          color: 'var(--ink)',
          background: 'rgba(255, 255, 255, 0.55)',
          border: '1px solid var(--line-strong)',
          backdropFilter: 'blur(4px)',
        }}>
          <span style={{ color: '#FF8FA3', fontSize: 11 }}>✿</span>
          {item}
        </span>
      ))}
    </div>
  )
}
