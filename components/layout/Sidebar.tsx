import { BrandMark } from './BrandMark'
import { TreeNode, TreeItem } from './TreeNode'
import { Icon } from '@/components/ui/Icon'

interface SidebarProps {
  tree: TreeItem[]
  currentPath?: string
}

export function Sidebar({ tree, currentPath = '' }: SidebarProps) {
  return (
    <aside style={{
      width: 240,
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'rgba(255, 251, 244, 0.72)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRight: '1px solid var(--line)',
    }}>
      {/* Brand */}
      <div style={{ padding: '20px 18px 16px' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <BrandMark />
        </a>
      </div>

      {/* Search */}
      <div style={{ padding: '0 12px 14px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          padding: '7px 10px',
          fontSize: 12.5,
          color: 'var(--ink-faint)',
          cursor: 'pointer',
        }}>
          <Icon name="search" size={13} />
          <span style={{ flex: 1 }}>Search the garden…</span>
          <span style={{
            fontSize: 10,
            color: 'var(--ink-ghost)',
            background: 'rgba(63,54,44,0.06)',
            padding: '1px 5px',
            borderRadius: 4,
          }}>
            ⌘K
          </span>
        </div>
      </div>

      {/* Pinned section */}
      <div style={{ padding: '0 12px 6px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 10.5,
          fontWeight: 600,
          color: 'var(--ink-faint)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          padding: '0 6px 6px',
        }}>
          <Icon name="pin" size={11} />
          Pinned
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 18px 8px', height: 1, background: 'var(--line)' }} />

      {/* Library label */}
      <div style={{
        padding: '0 18px 6px',
        fontSize: 10.5,
        fontWeight: 600,
        color: 'var(--ink-faint)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        Library
      </div>

      {/* Tree */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 6px' }}>
        {tree.map(item => (
          <TreeNode key={item.id} item={item} currentPath={currentPath} />
        ))}
      </div>

      {/* Haiku footer card */}
      <div style={{
        margin: 12,
        padding: '12px 14px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        border: '1px solid var(--line)',
        flexShrink: 0,
      }}>
        <div style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 13,
          color: 'var(--ink-soft)',
          lineHeight: 1.6,
        }}>
          each step a seedling —<br />
          watered by what you have lived,<br />
          slowly becomes oak
        </div>
        <div style={{
          marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 10,
          color: 'var(--ink-faint)',
        }}>
          <Icon name="leaf" size={11} />
          garden haiku
        </div>
      </div>
    </aside>
  )
}
