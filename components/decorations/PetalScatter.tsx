function lcg(seed: number): number {
  return ((seed * 1664525 + 1013904223) & 0xffffffff) >>> 0
}

interface PetalData {
  x: number; y: number; rot: number; scale: number; opacity: number
}

export function PetalScatter({
  count = 18,
  width = 400,
  height = 300,
  className = '',
}: {
  count?: number
  width?: number
  height?: number
  className?: string
}) {
  const petals: PetalData[] = []
  let s = 42
  for (let i = 0; i < count; i++) {
    s = lcg(s); const x = s % width
    s = lcg(s); const y = s % height
    s = lcg(s); const rot = s % 360
    s = lcg(s); const scale = 0.6 + (s % 100) / 200
    s = lcg(s); const opacity = 0.35 + (s % 40) / 100
    petals.push({ x, y, rot, scale, opacity })
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ opacity: 'var(--petal-opacity, 0.65)' }}
    >
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx={p.x} cy={p.y}
          rx={4 * p.scale} ry={6 * p.scale}
          transform={`rotate(${p.rot},${p.x},${p.y})`}
          fill="var(--rose-soft)"
          opacity={p.opacity}
        />
      ))}
    </svg>
  )
}
