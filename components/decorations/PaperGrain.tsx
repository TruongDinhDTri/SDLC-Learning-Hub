export function PaperGrain({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: 100, mixBlendMode: 'multiply' as const, opacity: 0.4 }}
    >
      <filter id="hb-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hb-noise)" opacity="0.08" />
    </svg>
  )
}
