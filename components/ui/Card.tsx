import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  soft?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Card({ children, soft = false, className = '', style }: CardProps) {
  return (
    <div className={`hb-card${soft ? ' hb-card--soft' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}
