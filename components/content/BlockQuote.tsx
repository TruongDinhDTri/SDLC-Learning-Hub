import React from 'react'
import { renderInline } from '@/lib/richText'

interface BlockQuoteProps {
  children: React.ReactNode
  attribution?: string
}

export function BlockQuote({ children, attribution }: BlockQuoteProps) {
  const content = typeof children === 'string' ? renderInline(children) : children
  return (
    <blockquote style={{
      margin: '24px 0',
      padding: '20px 24px 20px 28px',
      position: 'relative',
      background: 'linear-gradient(100deg, rgba(255,201,58,.13) 0%, rgba(255,201,58,.04) 100%)',
      border: '1px solid rgba(229,169,60,.28)',
      borderLeft: '5px solid #FFC93A',
      borderRadius: '0 14px 14px 0',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 19,
        fontWeight: 500,
        lineHeight: 1.45,
        color: 'var(--ink)',
        letterSpacing: '-0.01em',
        fontStyle: 'italic',
      }}>
        {content}
      </div>
      {attribution && (
        <div style={{
          marginTop: 10, fontSize: 11.5, color: 'var(--ink-faint)',
          letterSpacing: '.08em', fontStyle: 'normal',
        }}>— {attribution}</div>
      )}
    </blockquote>
  )
}
