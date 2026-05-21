export function SakuraBranch({ className = '' }: { className?: string }) {
  const blossomPositions = [
    [100, 240], [160, 195], [210, 155], [265, 125],
    [310, 95], [355, 68], [185, 130], [240, 100],
  ]
  const fallingPetals = [
    [130, 170, 25], [200, 220, -15], [290, 160, 40],
    [340, 200, -30], [80, 190, 10], [250, 245, 20],
  ]

  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity: 'var(--branch-opacity, 0.85)' }}
    >
      <defs>
        <linearGradient id="branch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--sage-deep)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--sage-deep)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Main branch */}
      <path
        d="M 20 280 C 80 220 160 180 220 140 C 280 100 340 80 380 60"
        stroke="url(#branch-grad)" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Sub-branches */}
      <path d="M 160 195 C 170 165 190 145 210 130" stroke="url(#branch-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 260 125 C 260 100 270 85 285 75" stroke="url(#branch-grad)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Blossom clusters */}
      {blossomPositions.map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx},${cy})`}>
          {[0, 72, 144, 216, 288].map((angle, j) => (
            <ellipse
              key={j}
              transform={`rotate(${angle})`}
              cx="0" cy="-7" rx="4" ry="6"
              fill="var(--rose-soft)" opacity="0.85"
            />
          ))}
          <circle cx="0" cy="0" r="2.5" fill="var(--peach)" opacity="0.9" />
        </g>
      ))}

      {/* Falling petals */}
      {fallingPetals.map(([x, y, rot], i) => (
        <ellipse
          key={i} cx={x} cy={y} rx="4" ry="6"
          transform={`rotate(${rot},${x},${y})`}
          fill="var(--rose-soft)" opacity="0.6"
        />
      ))}
    </svg>
  )
}
