import { ReactNode } from 'react'
import { Icon, IconName } from '@/components/ui/Icon'

const KINDS: Record<string, { bg: string; border: string; icon: IconName; label: string }> = {
  tip:   { bg: 'var(--sage-soft)',     border: 'var(--sage)',     icon: 'leaf',    label: 'Tip' },
  note:  { bg: 'var(--cream)',         border: 'var(--line)',     icon: 'sparkle', label: 'Note' },
  warn:  { bg: 'var(--peach-soft)',    border: 'var(--peach)',    icon: 'flame',   label: 'Warning' },
  quote: { bg: 'var(--lavender-soft)', border: 'var(--lavender)', icon: 'book',    label: 'Quote' },
}

interface CalloutProps {
  type?: 'tip' | 'note' | 'warn' | 'quote'
  title?: string
  children: ReactNode
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const k = KINDS[type] ?? KINDS.note
  return (
    <div style={{
      background: k.bg,
      border: `1px solid ${k.border}`,
      borderRadius: 'var(--r-md)',
      padding: '14px 16px',
      margin: '16px 0',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginBottom: 8,
        fontWeight: 600,
        fontSize: 12.5,
        color: 'var(--ink-soft)',
      }}>
        <Icon name={k.icon} size={14} />
        {title ?? k.label}
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  )
}
