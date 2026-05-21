'use client'

import { useState, useEffect, useRef } from 'react'
import { Icon } from '@/components/ui/Icon'
import type { SearchEntry } from '@/lib/content'

interface SearchModalProps {
  entries: SearchEntry[]
}

export function SearchModal({ entries }: SearchModalProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const results = query.trim().length === 0
    ? entries.slice(0, 8)
    : entries.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.description?.toLowerCase().includes(query.toLowerCase()) ||
        e.hub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          padding: '7px 10px',
          fontSize: 12.5,
          color: 'var(--ink-faint)',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}
      >
        <Icon name="search" size={13} />
        <span style={{ flex: 1, textAlign: 'left' }}>Search the garden…</span>
        <span style={{
          fontSize: 10,
          color: 'var(--ink-ghost)',
          background: 'rgba(63,54,44,0.06)',
          padding: '1px 5px',
          borderRadius: 4,
        }}>
          ⌘K
        </span>
      </button>

      {!open ? null : (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(63, 54, 44, 0.4)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 120,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 580,
          maxWidth: '90vw',
          background: 'var(--paper)',
          borderRadius: 'var(--r-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--line)',
          overflow: 'hidden',
        }}
      >
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 18px',
          borderBottom: '1px solid var(--line)',
        }}>
          <Icon name="search" size={16} style={{ color: 'var(--ink-faint)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search the garden…"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--ink)',
            }}
          />
          <kbd style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: 'var(--ink-ghost)',
            background: 'var(--cream-deep)',
            border: '1px solid var(--line-strong)',
            borderRadius: 4,
            padding: '2px 5px',
          }}>
            esc
          </kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 360, overflowY: 'auto' }}>
          {results.length === 0 ? (
            <div style={{
              padding: '32px 20px',
              textAlign: 'center',
              fontFamily: 'var(--font-hand)',
              fontSize: 17,
              color: 'var(--ink-faint)',
            }}>
              no leaves found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map(entry => (
              <a
                key={entry.slug}
                href={entry.slug}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '11px 18px',
                  borderBottom: '1px solid var(--line)',
                  textDecoration: 'none',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,251,244,0.9)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '' }}
              >
                <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>
                  {entry.title}
                </div>
                {entry.description && (
                  <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 2, lineHeight: 1.4 }}>
                    {entry.description}
                  </div>
                )}
                <div style={{ fontSize: 11, color: 'var(--ink-ghost)', marginTop: 3 }}>
                  {entry.hub}
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
      )}
    </>
  )
}
