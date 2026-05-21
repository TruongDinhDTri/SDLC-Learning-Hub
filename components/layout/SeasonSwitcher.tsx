'use client'

import { useState } from 'react'

const SEASONS = [
  { key: 'pond',   label: '池', name: 'Pond' },
  { key: 'spring', label: '春', name: 'Spring' },
  { key: 'summer', label: '夏', name: 'Summer' },
  { key: 'autumn', label: '秋', name: 'Autumn' },
] as const

type SeasonKey = typeof SEASONS[number]['key']

export function SeasonSwitcher() {
  const [current, setCurrent] = useState<SeasonKey>('pond')

  const cycle = () => {
    const idx = SEASONS.findIndex(s => s.key === current)
    const next = SEASONS[(idx + 1) % SEASONS.length]
    setCurrent(next.key)
    document.documentElement.dataset.season = next.key
  }

  const season = SEASONS.find(s => s.key === current)!

  return (
    <button
      onClick={cycle}
      className="hb-btn hb-btn--ghost"
      title={`Switch season (currently ${season.name})`}
      style={{ padding: '5px 10px', gap: 5 }}
    >
      <span style={{
        fontFamily: 'var(--font-hand)',
        fontSize: 17,
        lineHeight: 1,
        color: 'var(--ink-soft)',
      }}>
        {season.label}
      </span>
      <span style={{
        fontFamily: 'var(--font-hand)',
        fontSize: 12,
        color: 'var(--ink-faint)',
      }}>
        {season.name}
      </span>
    </button>
  )
}
