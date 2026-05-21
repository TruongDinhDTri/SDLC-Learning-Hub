import React from 'react'

interface RcBulletsProps {
  items: React.ReactNode[]
}

export function RcBullets({ items }: RcBulletsProps) {
  return (
    <ul style={{ margin: '8px 0 18px 0', paddingLeft: 4, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          padding: '4px 0', fontSize: 14, lineHeight: 1.6, color: 'var(--ink)',
        }}>
          <span style={{ color: '#FF8FA3', fontSize: 14, lineHeight: 1.4, flex: '0 0 auto' }}>✿</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
