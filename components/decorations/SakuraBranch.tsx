export function SakuraBranch({ flip = false }: { flip?: boolean }) {
  const blossoms = [
    { x: 38, y: 16, s: 1.0, r: -10 },
    { x: 110, y: 70, s: 1.2, r: 18 },
    { x: 152, y: 38, s: 0.9, r: 35 },
    { x: 200, y: 100, s: 1.1, r: -5 },
    { x: 232, y: 155, s: 0.85, r: 22 },
    { x: 270, y: 118, s: 1.0, r: 50 },
    { x: 78, y: 60, s: 0.7, r: 0 },
    { x: 175, y: 80, s: 0.7, r: 60 },
  ]
  const fallingPetals = [
    { x: 90, y: 130 }, { x: 280, y: 60 }, { x: 50, y: 110 },
    { x: 250, y: 30 }, { x: 160, y: 150 }, { x: 300, y: 90 },
  ]
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet"
      style={{ transform: flip ? 'scaleX(-1)' : 'none', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="branchG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6650" />
          <stop offset="1" stopColor="#5a4030" />
        </linearGradient>
      </defs>
      <path d="M-10 30 Q 60 50 110 70 Q 170 95 240 110 Q 290 122 330 130"
        stroke="url(#branchG)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M110 70 Q 130 55 150 40"
        stroke="url(#branchG)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M200 102 Q 215 130 230 155"
        stroke="url(#branchG)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M55 48 Q 50 28 40 18"
        stroke="url(#branchG)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {blossoms.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.s})`}>
          {[0, 72, 144, 216, 288].map(d => (
            <g key={d} transform={`rotate(${d + b.r})`}>
              <ellipse cx="0" cy="-7" rx="4.5" ry="7"
                fill="#F5D6D2" stroke="#E8B4B0" strokeWidth=".5" />
            </g>
          ))}
          <circle cx="0" cy="0" r="2.2" fill="#F2C2A0" />
          <circle cx="0" cy="0" r=".9" fill="#C4827E" />
        </g>
      ))}
      {fallingPetals.map((p, i) => (
        <g key={'p' + i} transform={`translate(${p.x} ${p.y}) rotate(${i * 47})`}>
          <path d="M0 -5 C -3 -2, -3 3, 0 5 C 3 3, 3 -2, 0 -5 Z" fill="#F5D6D2" opacity=".85" />
        </g>
      ))}
    </svg>
  )
}
