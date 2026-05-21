import { Icon } from '@/components/ui/Icon'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--ink-faint)',
    }}>
      <Icon name="home" size={13} />
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="chevronRight" size={11} />
          {item.href ? (
            <a
              href={item.href}
              style={{
                color: i === items.length - 1 ? 'var(--ink-soft)' : 'var(--ink-faint)',
                textDecoration: 'none',
                textTransform: 'capitalize',
              }}
            >
              {item.label}
            </a>
          ) : (
            <span style={{
              color: i === items.length - 1 ? 'var(--ink-soft)' : 'var(--ink-faint)',
              textTransform: 'capitalize',
            }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
