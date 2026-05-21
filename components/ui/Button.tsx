import { ReactNode } from 'react'

type Variant = 'default' | 'primary' | 'ghost'

interface ButtonProps {
  variant?: Variant
  children: ReactNode
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ variant = 'default', children, onClick, className = '', style, type = 'button' }: ButtonProps) {
  const variantClass = variant === 'primary' ? ' hb-btn--primary' : variant === 'ghost' ? ' hb-btn--ghost' : ''
  return (
    <button
      type={type}
      className={`hb-btn${variantClass} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}
