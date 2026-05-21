import React from 'react'

interface FootnotesListProps {
  items: string[]
}

export function FootnotesList({ items }: FootnotesListProps) {
  return (
    <div style={{
      margin: '28px 0 0 0', paddingTop: 18,
      borderTop: '1.5px dashed var(--line-strong)',
    }}>
      <div style={{
        fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--rose-deep)',
        transform: 'rotate(-1deg)', display: 'inline-block', marginBottom: 8,
      }}>
        footnotes —
      </div>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.6,
          padding: '4px 0',
        }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#D45A75',
            background: 'rgba(255,143,163,.18)', borderRadius: 4,
            padding: '0 5px', flex: '0 0 auto', marginTop: 2,
          }}>{i + 1}</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}
