import React from 'react'

interface PullQuoteProps {
  children: React.ReactNode
  attribution?: string
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote style={{
      margin: '28px 0', padding: '20px 36px',
      fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.35,
      color: '#1d3a52', letterSpacing: '-0.01em', fontStyle: 'italic',
      textAlign: 'center', position: 'relative',
    }}>
      <span style={{
        position: 'absolute', left: 0, top: -8,
        fontFamily: 'Georgia, serif', fontSize: 96, lineHeight: 1,
        color: '#FFC93A', opacity: 0.6, fontStyle: 'normal',
        userSelect: 'none',
      }}>&ldquo;</span>
      <span style={{
        position: 'absolute', right: 0, bottom: -52,
        fontFamily: 'Georgia, serif', fontSize: 96, lineHeight: 1,
        color: '#FFC93A', opacity: 0.6, fontStyle: 'normal',
        userSelect: 'none',
      }}>&rdquo;</span>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      {attribution && (
        <div style={{
          marginTop: 12, fontFamily: 'var(--font-body)', fontSize: 12,
          fontStyle: 'normal', color: 'var(--ink-faint)',
          letterSpacing: '.16em', textTransform: 'uppercase',
        }}>— {attribution}</div>
      )}
    </blockquote>
  )
}
