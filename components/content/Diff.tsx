import React from 'react'

interface DiffHunk {
  k?: '+' | '-' | ' '
  t: string
}

interface DiffProps {
  filename: string
  hunks: DiffHunk[]
  added?: number
  removed?: number
}

export function Diff({ filename, hunks, added = 0, removed = 0 }: DiffProps) {
  const totalAdded = added || hunks.filter(h => h.k === '+').length
  const totalRemoved = removed || hunks.filter(h => h.k === '-').length

  return (
    <div style={{
      margin: '16px 0', borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(63,54,44,.12)',
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #f5ede0, #ecddc4)',
        padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(63,54,44,.1)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5a4a3a', flex: 1 }}>
          {filename}
        </span>
        {totalAdded > 0 && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#447A2A' }}>+{totalAdded}</span>
        )}
        {totalRemoved > 0 && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#B0445A' }}>−{totalRemoved}</span>
        )}
      </div>
      <div style={{
        background: '#fffbf2',
        fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.7,
      }}>
        {hunks.map((h, i) => {
          const bg = h.k === '+' ? 'rgba(143,203,111,.18)'
                   : h.k === '-' ? 'rgba(255,143,163,.16)'
                   : 'transparent'
          const ink = h.k === '+' ? '#355a23' : h.k === '-' ? '#7a1f33' : '#5a4a3a'
          const borderColor = h.k === '+' ? '#8FCB6F' : h.k === '-' ? '#FF8FA3' : 'transparent'
          return (
            <div key={i} style={{
              display: 'flex', background: bg, color: ink,
              borderLeft: `3px solid ${borderColor}`,
            }}>
              <span style={{
                width: 18, textAlign: 'center', userSelect: 'none', flex: '0 0 auto',
                color: h.k === '+' ? '#447A2A' : h.k === '-' ? '#B0445A' : 'rgba(63,54,44,.3)',
              }}>
                {h.k || ' '}
              </span>
              <span style={{ flex: 1, paddingRight: 14 }}>{h.t || ' '}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
