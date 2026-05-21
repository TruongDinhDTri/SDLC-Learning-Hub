'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import type { ContentBlock } from '@/lib/hub-content'

interface StepBlockProps {
  n: number | string
  title: string
  summary?: string
  takeaway?: string
  items?: string[]
  done?: boolean
  defaultOpen?: boolean
  content?: ContentBlock[]
  renderBlock: (block: ContentBlock, idx: number) => React.ReactNode
}

export default function StepBlock({
  n,
  title,
  summary,
  takeaway,
  items,
  done: initialDone = false,
  defaultOpen,
  content,
  renderBlock,
}: StepBlockProps) {
  const [open, setOpen] = useState(defaultOpen ?? n === 1)
  const [done, setDone] = useState(initialDone)

  return (
    <div className={['hb-step', open ? 'hb-step--open' : '', done ? 'hb-step--done' : ''].filter(Boolean).join(' ')}>
      <div
        className="hb-step__header"
        onClick={() => setOpen(o => !o)}
        style={{ cursor: 'pointer' }}
      >
        {/* Done checkbox */}
        <div
          className="hb-step__circle"
          onClick={e => { e.stopPropagation(); setDone(d => !d) }}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            flexShrink: 0,
            background: done
              ? 'var(--sage-deep)'
              : 'linear-gradient(160deg, #FADFC9, #F5D6D2)',
            color: done ? 'white' : '#6b3f37',
            display: 'grid',
            placeItems: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background .2s',
          }}
        >
          {done
            ? <Icon name="check" size={14} strokeWidth={2.4} color="white" />
            : n}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="hb-step__title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            color: 'var(--ink)',
            fontWeight: 500,
          }}>
            {title}
          </div>
          {summary && (
            <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginTop: 2 }}>
              {summary}
            </div>
          )}
        </div>

        <span style={{
          color: 'var(--ink-faint)',
          transition: 'transform .2s',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          flexShrink: 0,
        }}>
          <Icon name="chevron" size={14} />
        </span>
      </div>

      {open && (
        <div className="hb-step__body">
          {content && content.map((child, i) => renderBlock(child, i))}
          {items && items.length > 0 && (
            <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
              {items.map((item, i) => (
                <li key={i} style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 4 }}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {takeaway && (
            <div className="hb-step__takeaway">
              {takeaway}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
