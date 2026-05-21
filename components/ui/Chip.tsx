import { ReactNode } from 'react'

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`hb-chip ${className}`}>{children}</span>
}
