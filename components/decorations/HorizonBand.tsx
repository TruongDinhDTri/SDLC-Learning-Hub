export function HorizonBand({ height = 220 }: { height?: number }) {
  return (
    <svg viewBox="0 0 800 220" preserveAspectRatio="xMidYMid slice"
      width="100%" height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="hzSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe4ec" />
          <stop offset="1" stopColor="#B9D6E0" />
        </linearGradient>
        <linearGradient id="hzWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7BB8B4" stopOpacity=".9" />
          <stop offset="1" stopColor="#7BB8B4" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="800" height="140" fill="url(#hzSky)" />
      <circle cx="600" cy="60" r="22" fill="#fbe7c7" opacity=".55" />
      <circle cx="600" cy="60" r="14" fill="#fad59c" opacity=".75" />
      <g opacity=".95">
        <path d="M40 60 Q 30 45 50 42 Q 58 30 75 35 Q 90 26 110 35 Q 130 30 138 50 Q 152 54 144 66 L 50 66 Q 35 66 40 60 Z" fill="#fff" />
        <path d="M260 40 Q 254 28 270 28 Q 280 18 295 24 Q 312 18 325 30 Q 340 30 336 44 L 270 44 Q 256 44 260 40 Z" fill="#fff" opacity=".9" />
        <path d="M460 70 Q 450 55 470 50 Q 480 38 500 44 Q 520 36 538 50 Q 558 50 552 66 L 470 66 Q 458 66 460 70 Z" fill="#fff" opacity=".95" />
      </g>
      <path d="M0 140 Q 100 100 200 120 T 400 110 T 600 115 T 800 100 L 800 150 L 0 150 Z"
        fill="#7E9968" opacity=".55" />
      <path d="M0 145 Q 120 120 240 130 T 480 125 T 800 130 L 800 160 L 0 160 Z"
        fill="#7E9968" opacity=".75" />
      <rect x="0" y="145" width="800" height="75" fill="url(#hzWater)" />
      <g stroke="rgba(255,255,255,.55)" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M30 175 Q 60 173 90 175" />
        <path d="M120 190 Q 160 188 200 190" />
        <path d="M260 178 Q 290 176 320 178" />
        <path d="M400 195 Q 440 193 480 195" />
        <path d="M540 180 Q 570 178 600 180" />
        <path d="M650 200 Q 690 198 730 200" />
      </g>
    </svg>
  )
}
