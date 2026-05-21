import React from 'react'

interface BlockQuoteProps {
  children: React.ReactNode
  attribution?: string
}

export function BlockQuote({ children, attribution }: BlockQuoteProps) {
  return (
    <blockquote style={{
      margin: '20px 0', padding: '14px 18px',
      borderLeft: '3px solid #FF8FA3',
      background: 'linear-gradient(90deg, rgba(255,143,163,.08), transparent)',
      borderRadius: '0 12px 12px 0',
    }}>
      <div style={{ fontSize: 14, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.6 }}>
        {children}
      </div>
      {attribution && (
        <div style={{
          marginTop: 8, fontSize: 11.5, color: 'var(--ink-faint)',
          letterSpacing: '.06em',
        }}>— {attribution}</div>
      )}
    </blockquote>
  )
}
