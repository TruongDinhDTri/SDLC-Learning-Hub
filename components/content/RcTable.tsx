import React from 'react'

interface RcTableProps {
  caption?: string
  headers: string[]
  rows: string[][]
}

export function RcTable({ caption, headers, rows }: RcTableProps) {
  return (
    <div style={{ margin: '18px 0' }}>
      {caption && (
        <div style={{
          fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--rose-deep)',
          marginBottom: 6,
        }}>{caption}</div>
      )}
      <div style={{
        borderRadius: 14, overflow: 'hidden',
        border: '1px solid var(--line)',
        background: 'var(--paper)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
          background: 'linear-gradient(180deg, #f5ede0, #ecddc4)',
          borderBottom: '1px solid rgba(63,54,44,.1)',
          fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
          color: '#5a4a3a', fontWeight: 600,
        }}>
          {headers.map((h, i) => (
            <div key={i} style={{
              padding: '10px 14px',
              borderRight: i < headers.length - 1 ? '1px solid rgba(63,54,44,.08)' : 'none',
            }}>{h}</div>
          ))}
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
            borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none',
            fontSize: 13, color: 'var(--ink)',
            background: i % 2 === 1 ? 'rgba(250,245,238,.5)' : 'transparent',
          }}>
            {row.map((cell, j) => (
              <div key={j} style={{
                padding: '12px 14px',
                borderRight: j < row.length - 1 ? '1px solid rgba(63,54,44,.05)' : 'none',
                fontFamily: j === 0 ? 'var(--font-body)' : 'inherit',
                fontWeight: j === 0 ? 600 : 400,
                color: j === 0 ? 'var(--ink)' : 'var(--ink-soft)',
              }}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
