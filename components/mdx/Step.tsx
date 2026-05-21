'use client'
import { useState, ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'
import { StatusDot } from '@/components/ui/StatusDot'

interface StepProps {
  number?: number
  title: string
  status?: string
  done?: boolean
  children: ReactNode
}

export function Step({ number, title, status = 'seed', done = false, children }: StepProps) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      margin: '12px 0',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-md)',
      background: 'rgba(255, 251, 244, 0.7)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 14px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {/* Numbered circle or check */}
        <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: done ? 'var(--sage-soft)' : 'var(--cream-deep)',
          border: `1.5px solid ${done ? 'var(--sage)' : 'var(--line-strong)'}`,
          fontSize: 12,
          fontWeight: 600,
          color: done ? 'var(--sage-deep)' : 'var(--ink-soft)',
        }}>
          {done ? <Icon name="check" size={12} /> : number}
        </div>

        <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--ink)', textAlign: 'left' }}>
          {title}
        </span>

        <StatusDot status={status} />
        <Icon
          name={open ? 'chevronDown' : 'chevronRight'}
          size={13}
          style={{ color: 'var(--ink-faint)' }}
        />
      </button>

      {open && (
        <div style={{
          padding: '0 14px 14px',
          fontSize: 13.5,
          color: 'var(--ink-soft)',
          lineHeight: 1.7,
          borderTop: '1px solid var(--line)',
        }}>
          {children}
        </div>
      )}
    </div>
  )
}
