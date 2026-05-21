import { Icon, IconName } from '@/components/ui/Icon'

interface PhaseHeaderProps {
  title: string
  subtitle?: string
  icon?: IconName
  accent?: string
  duration?: string
}

export function PhaseHeader({ title, subtitle, icon = 'layers', accent = 'sage', duration }: PhaseHeaderProps) {
  return (
    <div style={{
      background: `linear-gradient(160deg, var(--${accent}-soft), var(--${accent}))`,
      borderRadius: 'var(--r-xl)',
      padding: '24px 28px',
      marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--r-md)',
          background: 'rgba(255, 255, 255, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name={icon} size={22} style={{ color: `var(--${accent}-deep)` }} />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 600,
            color: 'var(--ink)',
            lineHeight: 1.2,
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--ink-soft)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {duration && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.5)',
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 12,
            color: 'var(--ink-soft)',
            flexShrink: 0,
          }}>
            {duration}
          </div>
        )}
      </div>
    </div>
  )
}
