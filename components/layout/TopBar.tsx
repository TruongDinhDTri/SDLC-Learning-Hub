'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

interface TopBarProps {
  breadcrumb?: BreadcrumbItem[]
  actions?: React.ReactNode
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
  onToggleToc?: () => void
  tocOpen?: boolean
}

const SEASONS = [
  { key: 'pond',   label: '池', name: 'Pond' },
  { key: 'spring', label: '春', name: 'Spring' },
  { key: 'summer', label: '夏', name: 'Summer' },
  { key: 'autumn', label: '秋', name: 'Autumn' },
] as const

function SeasonBtn() {
  const [idx, setIdx] = useState(0)
  const cycle = () => {
    const next = (idx + 1) % SEASONS.length
    setIdx(next)
    document.documentElement.dataset.season = SEASONS[next].key
  }
  return (
    <button className="hb-btn hb-btn--ghost" onClick={cycle} style={{ padding: '7px 12px' }}>
      <Icon name="sun" size={13} />
      <span style={{ fontFamily: 'var(--font-hand)', fontSize: 15 }}>
        {SEASONS[idx].label}
      </span>
    </button>
  )
}

function MobileHamburger() {
  const toggle = () => {
    const sidebar = document.querySelector('.hanami-sidebar')
    const backdrop = document.querySelector('.hb-sidebar-backdrop')
    const isOpen = sidebar?.classList.contains('sidebar-open')
    sidebar?.classList.toggle('sidebar-open', !isOpen)
    backdrop?.classList.toggle('sidebar-open', !isOpen)
  }
  return (
    <button
      className="hb-hamburger"
      onClick={toggle}
      style={{
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 8,
        border: '1px solid var(--line)',
        background: 'rgba(255,255,255,0.6)',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <Icon name="menu" size={18} color="var(--ink-soft)" />
    </button>
  )
}

export function TopBar({ breadcrumb = [], actions, onToggleSidebar, sidebarOpen = true, onToggleToc, tocOpen = true }: TopBarProps) {
  return (
    <div style={{
      height: 60,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 20px 0 16px',
      borderBottom: '1px solid var(--line)',
      background: 'rgba(255,251,244,.55)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <MobileHamburger />
      {/* Desktop sidebar toggle */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: sidebarOpen ? 'var(--paper)' : 'rgba(255,143,163,.12)',
            border: '1px solid var(--line)',
            cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
            color: sidebarOpen ? 'var(--ink-faint)' : 'var(--rose-deep)',
            flexShrink: 0,
          }}
          className="hb-panel-toggle"
        >
          <Icon name="sidebar" size={14} />
        </button>
      )}
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', minWidth: 0 }}>
        {breadcrumb.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ color: 'var(--ink-ghost)', fontSize: 12 }}>›</span>}
            {item.href ? (
              <Link href={item.href} style={{
                fontSize: 12.5,
                color: 'var(--ink-faint)',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none',
              }}>
                {item.icon && <Icon name={item.icon as any} size={12} />}
                {item.label}
              </Link>
            ) : (
              <span style={{
                fontSize: 12.5,
                color: i === breadcrumb.length - 1 ? 'var(--ink)' : 'var(--ink-faint)',
                fontWeight: i === breadcrumb.length - 1 ? 600 : 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}>
                {item.icon && <Icon name={item.icon as any} size={12} />}
                {item.label}
              </span>
            )}
          </span>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      {actions}
      {onToggleToc && (
        <button
          onClick={onToggleToc}
          title={tocOpen ? 'Hide outline' : 'Show outline'}
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: tocOpen ? 'var(--paper)' : 'rgba(255,143,163,.12)',
            border: '1px solid var(--line)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: tocOpen ? 'var(--ink-faint)' : 'var(--rose-deep)',
            flexShrink: 0,
          }}
        >
          <Icon name="list" size={14} />
        </button>
      )}
      <SeasonBtn />
      <Avatar initials="T" />
    </div>
  )
}
