import React from 'react'

interface RcOrderedProps {
  items: React.ReactNode[]
}

export function RcOrdered({ items }: RcOrderedProps) {
  return (
    <ol style={{ margin: '8px 0 18px 0', paddingLeft: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{
          display: 'flex', gap: 14, alignItems: 'flex-start',
          padding: '8px 0',
          borderBottom: i < items.length - 1 ? '1px dashed var(--line)' : 'none',
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'linear-gradient(160deg, #FFC8D2, #FF8FA3)',
            color: '#7a1f33', display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600,
            flex: '0 0 auto', boxShadow: '0 2px 6px rgba(212,90,117,.2)',
          }}>{i + 1}</span>
          <span style={{ flex: 1, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink)', paddingTop: 3 }}>
            {item}
          </span>
        </li>
      ))}
    </ol>
  )
}
