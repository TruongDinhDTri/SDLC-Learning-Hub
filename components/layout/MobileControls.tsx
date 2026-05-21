'use client'

import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

function closeSidebar() {
  document.querySelector('.hanami-sidebar')?.classList.remove('sidebar-open')
  document.querySelector('.hb-sidebar-backdrop')?.classList.remove('sidebar-open')
}

export function MobileSidebarBackdrop() {
  return (
    <div
      className="hb-sidebar-backdrop"
      onClick={closeSidebar}
    />
  )
}

export function MobileBottomNav() {
  const leftItems = [
    { icon: 'home'   as const, label: 'HOME',   href: '/'      },
    { icon: 'search' as const, label: 'SEARCH',  href: null     },
  ]

  const rightItems = [
    { icon: 'bookmark' as const, label: 'SAVED',  href: null  },
    { icon: 'book'     as const, label: 'NOTES',  href: null  },
  ]

  return (
    <nav className="hb-bottom-nav" style={{ alignItems: 'center' }}>
      {/* Left items */}
      {leftItems.map(item =>
        item.href ? (
          <Link key={item.label} href={item.href} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, padding: '4px 12px', textDecoration: 'none', color: 'var(--ink-faint)',
            flex: 1,
          }}>
            <Icon name={item.icon} size={20} />
            <span style={{
              fontSize: 9.5, fontFamily: 'var(--font-body)',
              letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600,
            }}>{item.label}</span>
          </Link>
        ) : (
          <button key={item.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, padding: '4px 12px', background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--ink-faint)', flex: 1,
          }}>
            <Icon name={item.icon} size={20} />
            <span style={{
              fontSize: 9.5, fontFamily: 'var(--font-body)',
              letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600,
            }}>{item.label}</span>
          </button>
        )
      )}

      {/* Center compose button */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link
          href="/compose"
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'linear-gradient(160deg, var(--peach), var(--rose))',
            boxShadow: '0 4px 16px rgba(196, 130, 126, 0.45)',
            color: '#fff',
            textDecoration: 'none',
            // Lift slightly above nav baseline
            marginBottom: 10,
            flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.35)',
          }}
          aria-label="Compose new entry"
        >
          <Icon name="plus" size={22} strokeWidth={2.2} color="#fff" />
        </Link>
      </div>

      {/* Right items */}
      {rightItems.map(item =>
        item.href ? (
          <Link key={item.label} href={item.href} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, padding: '4px 12px', textDecoration: 'none', color: 'var(--ink-faint)',
            flex: 1,
          }}>
            <Icon name={item.icon} size={20} />
            <span style={{
              fontSize: 9.5, fontFamily: 'var(--font-body)',
              letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600,
            }}>{item.label}</span>
          </Link>
        ) : (
          <button key={item.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, padding: '4px 12px', background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--ink-faint)', flex: 1,
          }}>
            <Icon name={item.icon} size={20} />
            <span style={{
              fontSize: 9.5, fontFamily: 'var(--font-body)',
              letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600,
            }}>{item.label}</span>
          </button>
        )
      )}
    </nav>
  )
}
