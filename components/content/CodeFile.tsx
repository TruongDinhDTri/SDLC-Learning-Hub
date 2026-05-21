'use client'

import { useState } from 'react'

interface Props {
  filename?: string
  language?: string
  lines: string[]
  className?: string
}

export default function CodeFile({ filename, lines, className }: Props) {
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
    <div className={`hb-code-file${className ? ` ${className}` : ''}`}>
      <div className="hb-code-file__header">
        <div className="hb-code-file__lights">
          <span className="hb-code-file__light hb-code-file__light--red" />
          <span className="hb-code-file__light hb-code-file__light--yellow" />
          <span className="hb-code-file__light hb-code-file__light--green" />
        </div>
        {filename && (
          <span className="hb-code-file__name">{filename}</span>
        )}
        <button
          className="hb-code-file__copy"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <pre className="hb-code-file__body">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="hb-code-file__line">
              <span className="hb-code-file__lineno">{i + 1}</span>
              {line}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
