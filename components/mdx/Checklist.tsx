'use client'
import { useState } from 'react'

interface ChecklistItem {
  label: string
  done?: boolean
}

export function Checklist({ items }: { items: ChecklistItem[] }) {
  const [checked, setChecked] = useState<Set<number>>(
    new Set(items.flatMap((it, i) => (it.done ? [i] : [])))
  )

  const toggle = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div style={{ margin: '12px 0' }}>
      {items.map((item, i) => (
        <label
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '5px 0',
            cursor: 'pointer',
            fontSize: 13.5,
            color: checked.has(i) ? 'var(--ink-faint)' : 'var(--ink-soft)',
          }}
        >
          <input
            type="checkbox"
            checked={checked.has(i)}
            onChange={() => toggle(i)}
            style={{ accentColor: 'var(--sage-deep)', width: 15, height: 15, flexShrink: 0 }}
          />
          <span style={{ textDecoration: checked.has(i) ? 'line-through' : 'none' }}>
            {item.label}
          </span>
        </label>
      ))}
    </div>
  )
}
