export function PetalScatter({ count = 14, seed = 1 }: { count?: number; seed?: number }) {
  const rng = (n: number) => {
    const x = Math.sin(n * 9301 + seed * 49297) * 233280
    return x - Math.floor(x)
  }
  const hues = ['#F5D6D2', '#FADFC9', '#E8B4B0', '#F2C2A0']
  return (
    <div className="deco deco--petals" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: count }).map((_, i) => {
        const left = rng(i + 1) * 100
        const top = rng(i + 1.5) * 100
        const rotate = rng(i + 2) * 360
        const size = 6 + rng(i + 3) * 8
        const opacity = 0.45 + rng(i + 4) * 0.35
        const hue = hues[i % hues.length]
        return (
          <svg key={i} viewBox="0 0 24 24" width={size} height={size}
            style={{ position: 'absolute', left: `${left}%`, top: `${top}%`, transform: `rotate(${rotate}deg)`, opacity }}>
            <path d="M12 2 C 8 6, 8 12, 12 16 C 16 12, 16 6, 12 2 Z" fill={hue} />
            <path d="M12 4 C 10 7, 10 12, 12 15" stroke="rgba(170,90,90,.35)" strokeWidth=".6" fill="none" />
          </svg>
        )
      })}
    </div>
  )
}
