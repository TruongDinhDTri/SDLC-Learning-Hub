// Inline typography primitives — use within rich text JSX content

import React from 'react'

export function Hi({ children, hue = '#FFC93A' }: { children: React.ReactNode; hue?: string }) {
  return (
    <span style={{
      backgroundImage: `linear-gradient(transparent 58%, ${hue}80 58%, ${hue}80 92%, transparent 92%)`,
      padding: '0 3px',
    }}>
      {children}
    </span>
  )
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      fontFamily: 'var(--font-mono)', fontSize: 13,
      background: 'rgba(255,143,163,.12)', color: '#7a1f33',
      padding: '1px 6px', borderRadius: 5,
      border: '1px solid rgba(212,90,117,.18)',
    }}>{children}</code>
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd style={{
      fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600,
      display: 'inline-block',
      padding: '2px 7px', borderRadius: 5,
      background: 'linear-gradient(180deg, #fff, #f4ece0)',
      border: '1px solid rgba(63,54,44,.18)',
      boxShadow: '0 1px 0 rgba(63,54,44,.12), inset 0 -1px 0 rgba(63,54,44,.06)',
      color: 'var(--ink)',
      verticalAlign: '1px',
    }}>{children}</kbd>
  )
}

export function Foot({ n }: { n: number | string }) {
  return (
    <sup style={{
      fontSize: 9.5, fontWeight: 700, color: '#D45A75',
      background: 'rgba(255,143,163,.18)', borderRadius: 4,
      padding: '0 4px', marginLeft: 1, verticalAlign: 'super',
      cursor: 'pointer',
    }}>{n}</sup>
  )
}
