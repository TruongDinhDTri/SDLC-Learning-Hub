import { Icon, IconName } from '@/components/ui/Icon'

interface StatCardProps {
  label: string
  value: string | number
  icon: IconName
  accent?: string
}

export function StatCard({ label, value, icon, accent = 'peach' }: StatCardProps) {
  return (
    <div style={{
      background: 'rgba(255, 251, 244, 0.78)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 'var(--r-md)',
        background: `linear-gradient(135deg, var(--${accent}-soft), var(--${accent}))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon name={icon} size={16} style={{ color: `var(--${accent}-deep)` }} />
      </div>
      <div>
        <div style={{
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          color: 'var(--ink)',
          lineHeight: 1.1,
        }}>
          {value}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-faint)', marginTop: 1 }}>
          {label}
        </div>
      </div>
    </div>
  )
}
