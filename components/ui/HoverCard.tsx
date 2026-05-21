'use client'

import type { CSSProperties, ReactNode } from 'react'

interface HoverCardProps {
  href?: string
  style?: CSSProperties
  hoverStyle?: CSSProperties
  children: ReactNode
  className?: string
}

export function HoverCard({ href, style, hoverStyle, children, className }: HoverCardProps) {
  const defaultBase = style ?? {}
  const defaultHover = hoverStyle ?? { transform: 'translateY(-2px)', boxShadow: 'var(--shadow-md)' }

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    Object.assign((e.currentTarget as HTMLElement).style, defaultHover)
  }
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    for (const key of Object.keys(defaultHover)) {
      ;(e.currentTarget as HTMLElement).style[key as any] = ''
    }
  }

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className={className}
          style={{ ...defaultBase, transition: 'transform .15s, box-shadow .15s' }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {children}
        </div>
      </a>
    )
  }

  return (
    <div
      className={className}
      style={{ ...defaultBase, transition: 'transform .15s, box-shadow .15s' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
