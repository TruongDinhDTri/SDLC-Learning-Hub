import React from 'react'

// Parses **bold** and `code` inline markers into React nodes.
// Returns a string as-is when there are no markers (fast path).
export function renderInline(text: string): React.ReactNode {
  if (!text.includes('**') && !text.includes('`')) return text

  const parts: React.ReactNode[] = []
  // Split on **bold** or `code`
  const re = /(\*\*(.+?)\*\*|`([^`]+)`)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[0].startsWith('**')) {
      parts.push(<strong key={match.index} style={{ fontWeight: 700, color: 'inherit' }}>{match[2]}</strong>)
    } else {
      parts.push(
        <code key={match.index} style={{
          fontFamily: 'var(--font-mono, monospace)', fontSize: '0.88em',
          background: 'rgba(0,0,0,.07)', borderRadius: 4, padding: '1px 5px',
        }}>{match[3]}</code>
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 ? parts[0] : <>{parts}</>
}
