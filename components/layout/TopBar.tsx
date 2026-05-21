import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'
import { Avatar } from '@/components/ui/Avatar'

interface TopBarProps {
  breadcrumb?: BreadcrumbItem[]
  title?: string
}

export function TopBar({ breadcrumb = [], title }: TopBarProps) {
  return (
    <div style={{
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      borderBottom: '1px solid var(--line)',
      background: 'rgba(255, 251, 244, 0.6)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <Breadcrumb items={breadcrumb} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {title && (
          <span style={{
            fontSize: 12.5,
            color: 'var(--ink-faint)',
            fontFamily: 'var(--font-hand)',
          }}>
            {title}
          </span>
        )}
        <Avatar initials="T" />
      </div>
    </div>
  )
}
