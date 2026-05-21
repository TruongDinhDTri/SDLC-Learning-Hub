'use client'
import { useState } from 'react'
import { Icon, IconName } from '@/components/ui/Icon'
import { StatusDot } from '@/components/ui/StatusDot'

export interface TreeItem {
  id: string
  label: string
  status?: string
  count?: number
  isNew?: boolean
  href?: string
  children?: TreeItem[]
}

interface TreeNodeProps {
  item: TreeItem
  depth?: number
  currentPath?: string
}

export function TreeNode({ item, depth = 0, currentPath = '' }: TreeNodeProps) {
  const hasChildren = Boolean(item.children && item.children.length > 0)
  const [open, setOpen] = useState(depth < 2)
  const isActive = currentPath === item.href
  const iconName: IconName = hasChildren ? 'folder' : 'file'

  return (
    <div>
      <div
        role={item.href ? 'link' : 'button'}
        tabIndex={0}
        onClick={() => {
          if (hasChildren) setOpen(!open)
          if (item.href) window.location.href = item.href
        }}
        onKeyDown={e => e.key === 'Enter' && (hasChildren ? setOpen(!open) : item.href && (window.location.href = item.href))}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: `5px ${8 + depth * 14}px`,
          cursor: 'pointer',
          borderRadius: 6,
          background: isActive ? 'rgba(255,255,255,0.55)' : 'transparent',
          color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
          fontSize: 13,
          fontWeight: isActive ? 500 : 400,
          transition: 'background .1s',
          userSelect: 'none',
          outline: 'none',
        }}
        onMouseEnter={e => {
          if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.3)'
        }}
        onMouseLeave={e => {
          if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'
        }}
      >
        {/* Chevron or spacer */}
        {hasChildren ? (
          <Icon
            name={open ? 'chevronDown' : 'chevronRight'}
            size={12}
            style={{ color: 'var(--ink-faint)', flexShrink: 0 }}
          />
        ) : (
          <span style={{ width: 12, flexShrink: 0 }} />
        )}

        <StatusDot status={item.status ?? 'seed'} />
        <Icon name={iconName} size={13} style={{ flexShrink: 0 }} />

        <span style={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {item.label}
        </span>

        {item.isNew && (
          <span style={{
            fontSize: 9, fontWeight: 600, color: 'var(--sage-deep)',
            background: 'var(--sage-soft)', padding: '1px 5px', borderRadius: 999,
            flexShrink: 0,
          }}>
            new!
          </span>
        )}
        {item.count != null && (
          <span style={{
            fontSize: 10, color: 'var(--ink-ghost)',
            minWidth: 16, textAlign: 'right', flexShrink: 0,
          }}>
            {item.count}
          </span>
        )}
      </div>

      {hasChildren && open && (
        <div>
          {item.children!.map(child => (
            <TreeNode key={child.id} item={child} depth={depth + 1} currentPath={currentPath} />
          ))}
        </div>
      )}
    </div>
  )
}
