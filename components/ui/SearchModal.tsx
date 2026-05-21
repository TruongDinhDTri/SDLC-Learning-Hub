'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { HUBS } from '@/lib/hub-content'
import { Icon } from '@/components/ui/Icon'

interface SearchResult {
  hubId: string
  hubTitle: string
  hubAccent: string
  slug: string
  title: string
  description: string
  tags: string[]
  duration?: string
  href: string
}

const ACCENT_DOT: Record<string, string> = {
  sage:  '#7E9968',
  sky:   '#6E94A0',
  peach: '#C68A63',
  rose:  '#D45A75',
}

const ACCENT_BG: Record<string, string> = {
  sage:  'linear-gradient(160deg, #E8F2DC, #D6E3CB)',
  sky:   'linear-gradient(160deg, #E1EEF3, #C9DEE6)',
  peach: 'linear-gradient(160deg, #FFE8D2, #FADFC9)',
  rose:  'linear-gradient(160deg, #FFE9E2, #F5D6D2)',
}

// Build the search index once
const SEARCH_INDEX: SearchResult[] = HUBS.flatMap(hub =>
  hub.phases.map(phase => ({
    hubId: hub.id,
    hubTitle: hub.title,
    hubAccent: hub.accent,
    slug: phase.slug,
    title: phase.title,
    description: phase.description,
    tags: phase.tags ?? [],
    duration: phase.duration,
    href: `/${hub.id}/${phase.slug}`,
  }))
)

function search(q: string): SearchResult[] {
  if (!q.trim()) return SEARCH_INDEX.slice(0, 8)
  const lower = q.toLowerCase()
  return SEARCH_INDEX.filter(r =>
    r.title.toLowerCase().includes(lower) ||
    r.description.toLowerCase().includes(lower) ||
    r.tags.some(t => t.toLowerCase().includes(lower)) ||
    r.hubTitle.toLowerCase().includes(lower)
  ).slice(0, 10)
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [q, setQ] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const results = search(q)

  useEffect(() => {
    if (open) {
      setQ('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const navigate = useCallback((href: string) => {
    router.push(href)
    onClose()
  }, [router, onClose])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
      if (e.key === 'Enter' && results[activeIdx]) { navigate(results[activeIdx].href) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, activeIdx, navigate, onClose])

  useEffect(() => { setActiveIdx(0) }, [q])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(40,30,24,.45)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '14vh',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          background: 'var(--paper)',
          borderRadius: 20,
          boxShadow: '0 24px 80px rgba(40,30,24,.3), 0 4px 16px rgba(40,30,24,.12)',
          border: '1px solid var(--line)',
          overflow: 'hidden',
          animation: 'hb-modal-in .18s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Input row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 20px',
          borderBottom: '1px solid var(--line)',
        }}>
          <Icon name="search" size={16} color="var(--ink-faint)" />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search the garden…"
            style={{
              flex: 1, border: 0, outline: 0,
              background: 'transparent',
              fontFamily: 'var(--font-body)',
              fontSize: 15, color: 'var(--ink)',
            }}
          />
          <kbd style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'var(--ink-faint)',
            border: '1px solid var(--line-strong)',
            borderRadius: 5, padding: '2px 6px',
          }}>esc</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 420, overflowY: 'auto' }}>
          {results.length === 0 ? (
            <div style={{
              padding: '32px 20px', textAlign: 'center',
              fontFamily: 'var(--font-hand)', fontSize: 17, color: 'var(--ink-faint)',
            }}>
              nothing bloomed for "{q}"
            </div>
          ) : (
            <>
              {!q && (
                <div style={{ padding: '10px 20px 6px', fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
                  All entries
                </div>
              )}
              {results.map((r, i) => {
                const dot = ACCENT_DOT[r.hubAccent] ?? '#C4827E'
                const bg = ACCENT_BG[r.hubAccent] ?? ACCENT_BG.rose
                return (
                  <div
                    key={r.href}
                    onClick={() => navigate(r.href)}
                    onMouseEnter={() => setActiveIdx(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 20px',
                      cursor: 'pointer',
                      background: i === activeIdx ? 'rgba(255,143,163,.08)' : 'transparent',
                      borderLeft: i === activeIdx ? '3px solid var(--rose-deep)' : '3px solid transparent',
                      transition: 'background .08s',
                    }}
                  >
                    {/* Accent badge */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: bg, display: 'grid', placeItems: 'center',
                      border: '1px solid rgba(0,0,0,.05)',
                    }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, display: 'block' }} />
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 2 }}>
                        {r.title}
                      </div>
                      <div style={{
                        fontSize: 11.5, color: 'var(--ink-faint)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {r.hubTitle} · {r.description}
                      </div>
                    </div>

                    {/* Tags + time */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                      {r.duration && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-faint)' }}>
                          {r.duration}
                        </span>
                      )}
                      {r.tags[0] && (
                        <span style={{
                          fontSize: 10.5, padding: '2px 8px', borderRadius: 12,
                          background: bg, color: dot, fontWeight: 500,
                        }}>
                          #{r.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--line)',
          display: 'flex', gap: 16, alignItems: 'center',
          fontSize: 10.5, color: 'var(--ink-faint)',
          fontFamily: 'var(--font-mono)',
        }}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
          <span style={{ marginLeft: 'auto' }}>{SEARCH_INDEX.length} entries indexed</span>
        </div>
      </div>
    </div>
  )
}
