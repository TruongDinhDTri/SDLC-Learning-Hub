'use client'

import { useState } from 'react'

interface Props {
  filename?: string
  language?: string
  lines: string[]
  highlight?: number[]
  className?: string
}

export default function CodeFile({ filename, language, lines, highlight, className }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div style={{
      margin: '16px 0', borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(63,54,44,.12)',
      boxShadow: '0 6px 18px rgba(60,40,30,.06)',
    }} className={className}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #f5ede0, #ecddc4)',
        padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(63,54,44,.1)',
      }}>
        {/* Traffic lights */}
        <span style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff8e7e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbc14d' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#8fcb6f' }} />
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5a4a3a',
          flex: 1, textAlign: 'center',
        }}>{filename ?? 'code'}</span>
        {language && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#8a7256',
            background: 'rgba(255,255,255,.6)', padding: '2px 8px', borderRadius: 999,
            letterSpacing: '.08em',
          }}>{language}</span>
        )}
        <button
          onClick={handleCopy}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#8a7256',
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'inline-flex', gap: 4, alignItems: 'center',
          }}
          aria-label="Copy code"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>

      {/* Body */}
      <pre style={{
        margin: 0, padding: '14px 0',
        background: '#fffbf2',
        fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.7,
        color: '#5a4a3a', overflow: 'auto',
      }}>
        {lines.map((line, i) => {
          const lineNum = i + 1
          const isHighlighted = highlight?.includes(lineNum)
          return (
            <div key={i} style={{
              display: 'flex',
              background: isHighlighted ? 'rgba(255,201,58,.18)' : 'transparent',
              borderLeft: isHighlighted ? '3px solid #FFC93A' : '3px solid transparent',
              paddingRight: 14,
            }}>
              <span style={{
                display: 'inline-block', width: 38, paddingLeft: 14,
                color: 'rgba(63,54,44,.28)', userSelect: 'none', fontSize: 11,
                flex: '0 0 auto',
              }}>{lineNum}</span>
              <span>{line || ' '}</span>
            </div>
          )
        })}
      </pre>
    </div>
  )
}
