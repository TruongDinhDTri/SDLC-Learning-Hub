'use client'
import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'

interface CodeBlockProps {
  children: string
  language?: string
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{
      background: '#FFF7EC',
      border: '1px dashed rgba(196, 130, 126, 0.35)',
      borderRadius: 'var(--r-md)',
      margin: '12px 0',
      position: 'relative',
    }}>
      {language && (
        <div style={{
          padding: '6px 14px 0',
          fontSize: 10.5,
          fontFamily: 'var(--font-mono)',
          color: 'var(--ink-faint)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          {language}
        </div>
      )}
      <pre style={{
        margin: 0,
        padding: '12px 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12.5,
        color: '#5a4a3a',
        lineHeight: 1.7,
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}>
        {children}
      </pre>
      <button
        onClick={copy}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid var(--line)',
          borderRadius: 6,
          padding: '4px 6px',
          cursor: 'pointer',
          color: copied ? 'var(--sage-deep)' : 'var(--ink-faint)',
          display: 'flex',
          alignItems: 'center',
          transition: 'color .15s',
        }}
        title="Copy code"
      >
        <Icon name={copied ? 'check' : 'copy'} size={12} />
      </button>
    </div>
  )
}
