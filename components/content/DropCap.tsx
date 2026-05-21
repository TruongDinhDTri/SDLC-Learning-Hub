import React from 'react'

interface DropCapProps {
  first: string
  children: React.ReactNode
}

export function DropCap({ first, children }: DropCapProps) {
  return (
    <p style={{
      fontSize: 15, color: 'var(--ink)', lineHeight: 1.72,
      margin: '0 0 14px 0',
    }}>
      <span style={{
        float: 'left', fontFamily: 'var(--font-display)',
        fontSize: 64, lineHeight: 0.86, fontWeight: 500,
        color: '#D45A75', margin: '8px 10px 0 0',
        background: 'linear-gradient(160deg, #FFE9F0, #FFC8D2)',
        padding: '10px 12px 4px 12px', borderRadius: 12,
        boxShadow: 'inset 0 -3px 0 rgba(212,90,117,.15)',
      }}>{first}</span>
      {children}
    </p>
  )
}
