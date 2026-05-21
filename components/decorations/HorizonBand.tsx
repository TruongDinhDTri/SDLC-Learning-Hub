export function HorizonBand({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  const ripples = [
    { x: 120, y: 200, rx: 30, ry: 5 },
    { x: 300, y: 215, rx: 35, ry: 5 },
    { x: 500, y: 225, rx: 40, ry: 5 },
    { x: 680, y: 235, rx: 45, ry: 5 },
  ]
  const lilyPads = [
    { x: 200, y: 230, rx: 14, ry: 7 },
    { x: 450, y: 240, rx: 14, ry: 7 },
    { x: 620, y: 245, rx: 14, ry: 7 },
  ]

  return (
    <svg
      viewBox="0 0 800 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B9D6E0" />
          <stop offset="100%" stopColor="#EEF4E8" />
        </linearGradient>
        <linearGradient id="water-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7BB8B4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3F7C7A" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="800" height="180" fill="url(#sky-grad)" />

      {/* Sun */}
      <circle cx="640" cy="70" r="32" fill="#F2C2A0" opacity="0.7" />
      <circle cx="640" cy="70" r="22" fill="#FADFC9" opacity="0.9" />

      {/* Far hills */}
      <path
        d="M0 160 C100 110 200 130 300 120 C400 110 500 130 600 115 C700 100 750 120 800 115 L800 180 L0 180Z"
        fill="var(--sage-soft)" opacity="0.5"
      />
      {/* Near hills */}
      <path
        d="M0 175 C80 145 180 155 280 148 C380 141 460 160 560 150 C660 140 730 158 800 152 L800 180 L0 180Z"
        fill="var(--sage)" opacity="0.6"
      />

      {/* Water */}
      <rect y="180" width="800" height="120" fill="url(#water-grad)" />

      {/* Water ripples */}
      {ripples.map((r, i) => (
        <ellipse key={i} cx={r.x} cy={r.y} rx={r.rx} ry={r.ry}
          stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
      ))}

      {/* Lily pads */}
      {lilyPads.map((l, i) => (
        <ellipse key={i} cx={l.x} cy={l.y} rx={l.rx} ry={l.ry}
          fill="var(--sage-deep)" opacity="0.5" />
      ))}
    </svg>
  )
}
