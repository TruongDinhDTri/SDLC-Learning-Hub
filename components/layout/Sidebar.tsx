'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandMark } from './BrandMark'
import { Icon, type IconName } from '@/components/ui/Icon'

interface TreeLeaf {
  id: string
  label: string
  href: string
  status?: 'rose' | 'peach' | 'sage' | 'lav' | 'mute'
  count?: number
  fresh?: boolean
}

interface TreeGroup {
  id: string
  label: string
  icon: IconName
  iconColor: string
  children: TreeLeaf[]
}

interface SidebarProps {
  groups: TreeGroup[]
}

function TreeItem({ leaf, currentPath }: { leaf: TreeLeaf; currentPath: string }) {
  const active = currentPath === leaf.href || currentPath.startsWith(leaf.href + '/')
  return (
    <Link href={leaf.href} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px 6px 28px',
        margin: '1px 8px',
        borderRadius: 10,
        background: active ? 'linear-gradient(90deg, rgba(242,194,160,.35), rgba(232,180,176,.18))' : 'transparent',
        color: active ? '#5a3a2f' : 'var(--ink-soft)',
        fontWeight: active ? 600 : 500,
        fontSize: 13,
        cursor: 'pointer',
        transition: 'background .1s',
      }}>
        <span className={`hb-dot hb-dot--${leaf.status ?? 'mute'}`} />
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {leaf.label}
        </span>
        {leaf.count !== undefined && (
          <span style={{
            fontSize: 10.5,
            fontFamily: 'var(--font-mono)',
            background: 'rgba(63,54,44,.06)',
            padding: '2px 6px',
            borderRadius: 6,
            color: 'var(--ink-faint)',
          }}>{leaf.count}</span>
        )}
        {leaf.fresh && (
          <span style={{
            fontSize: 9.5,
            fontFamily: 'var(--font-hand)',
            color: 'var(--rose-deep)',
            transform: 'rotate(-6deg)',
          }}>new!</span>
        )}
      </div>
    </Link>
  )
}

function TreeGroup({ group, currentPath }: { group: TreeGroup; currentPath: string }) {
  const isGroupActive = group.children.some(c => currentPath.startsWith(c.href))
  const [open, setOpen] = useState(true)
  return (
    <div>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 10px',
          margin: '1px 8px',
          borderRadius: 10,
          color: 'var(--ink-soft)',
          fontWeight: 500,
          fontSize: 13,
          cursor: 'pointer',
          transition: 'background .1s',
        }}
      >
        <span style={{
          display: 'inline-flex',
          width: 12,
          transition: 'transform .15s',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          color: 'var(--ink-faint)',
        }}>
          <Icon name="chevron" size={11} strokeWidth={2} />
        </span>
        <span style={{ color: group.iconColor }}>
          <Icon name={group.icon} size={14} />
        </span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {group.label}
        </span>
      </div>
      {open && (
        <div style={{
          borderLeft: '1px dashed rgba(63,54,44,.12)',
          marginLeft: 18,
        }}>
          {group.children.map(leaf => (
            <TreeItem key={leaf.id} leaf={leaf} currentPath={currentPath} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar({ groups }: SidebarProps) {
  const pathname = usePathname()
  const [q, setQ] = useState('')

  const filtered = q
    ? groups.map(g => ({
        ...g,
        children: g.children.filter(c => c.label.toLowerCase().includes(q.toLowerCase())),
      })).filter(g => g.children.length > 0)
    : groups

  return (
    <aside className="hanami-sidebar" style={{
      width: 272,
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(255,251,244,0.82)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRight: '1px solid var(--line)',
      zIndex: 2,
    }}>
      {/* Brand */}
      <div style={{ padding: '18px 18px 14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <BrandMark />
        </Link>
        <button className="hb-btn hb-btn--ghost" style={{ padding: '6px 8px', borderRadius: 8 }}>
          <Icon name="menu" size={14} />
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '0 14px 12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'var(--paper)',
          border: '1px solid var(--line-strong)',
          borderRadius: 12,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <Icon name="search" size={14} color="var(--ink-faint)" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search the garden…"
            style={{
              flex: 1,
              border: 0,
              outline: 0,
              background: 'transparent',
              fontFamily: 'var(--font-body)',
              fontSize: 12.5,
              color: 'var(--ink)',
            }}
          />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-faint)',
            border: '1px solid var(--line-strong)',
            borderRadius: 5,
            padding: '1px 5px',
          }}>⌘K</span>
        </div>
      </div>

      {/* Pinned */}
      <div style={{ padding: '6px 18px 4px' }}>
        <div style={{
          fontSize: 10.5,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-faint)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <Icon name="pin" size={10} />
          pinned
        </div>
      </div>
      <div style={{ padding: '4px 0 8px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', margin: '1px 12px', borderRadius: 10,
            fontSize: 12.5, color: 'var(--ink-soft)', cursor: 'pointer',
          }}>
            <span style={{ color: 'var(--sage-deep)' }}><Icon name="home" size={13} /></span>
            <span>Garden home</span>
          </div>
        </Link>
      </div>

      {/* Library */}
      <div style={{ padding: '8px 18px 4px' }}>
        <div style={{
          fontSize: 10.5,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-faint)',
        }}>library</div>
      </div>

      {/* Tree */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0 12px' }}>
        {filtered.map(g => (
          <TreeGroup key={g.id} group={g} currentPath={pathname} />
        ))}
      </div>

      {/* Haiku footer */}
      <div style={{ padding: 14 }}>
        <div className="hb-card" style={{
          padding: 14,
          borderRadius: 16,
          background: 'linear-gradient(160deg, #FADFC9, #F5D6D2)',
          border: '1px solid rgba(196,130,126,.2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.4 }}>
            <svg viewBox="0 0 60 60" width={70} height={70}>
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <g key={i} transform={`rotate(${deg} 30 30)`}>
                  <path d="M30 30 C 24 22, 24 12, 30 8 C 36 12, 36 22, 30 30 Z"
                    fill="#F5D6D2" stroke="#E8B4B0" strokeWidth=".5" />
                </g>
              ))}
              <circle cx="30" cy="30" r="3" fill="#F2C2A0" />
            </svg>
          </div>
          <div style={{
            fontFamily: 'var(--font-hand)',
            fontSize: 17,
            lineHeight: 1.15,
            color: '#6b3f37',
          }}>
            "small commits, like<br />petals — one by one"
          </div>
          <div style={{ marginTop: 8, fontSize: 10.5, color: '#8b5a52', letterSpacing: '.12em', textTransform: 'uppercase' }}>
            today · haiku #042
          </div>
        </div>
      </div>
    </aside>
  )
}
