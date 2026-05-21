import { StatusDot } from '@/components/ui/StatusDot'

const labels: Record<string, string> = {
  seed: 'Seed',
  growing: 'Growing',
  mature: 'Mature',
}

export function StatusBadge({ status = 'seed' }: { status?: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 8px',
      borderRadius: 999,
      fontSize: 11.5,
      fontWeight: 500,
      background: 'rgba(255, 255, 255, 0.6)',
      border: '1px solid var(--line)',
    }}>
      <StatusDot status={status} />
      {labels[status] ?? status}
    </span>
  )
}
