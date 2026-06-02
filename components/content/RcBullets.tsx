import React from 'react'
import { renderInline } from '@/lib/richText'

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
      {items.map((item, i) => {
        const rendered = typeof item === 'string' ? renderInline(item) : item
        return (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.4,
            color: 'var(--ink)',
            background: 'var(--paper)',
            border: '1.5px solid var(--line-strong)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <span style={{ color: '#E8856A', fontSize: 10, flexShrink: 0 }}>◆</span>
            {rendered}
          </span>
        )
      })}
    </div>
  )
}
