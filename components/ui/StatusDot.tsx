type DotColor = 'rose' | 'peach' | 'sage' | 'lav' | 'mute'

const statusToColor: Record<string, DotColor> = {
  seed: 'mute',
  growing: 'peach',
  mature: 'sage',
}

interface StatusDotProps {
  color?: DotColor
  status?: string
  className?: string
}

export function StatusDot({ color, status, className = '' }: StatusDotProps) {
  const c = color ?? (status ? (statusToColor[status] ?? 'mute') : 'mute')
  return <span className={`hb-dot hb-dot--${c} ${className}`} />
}
