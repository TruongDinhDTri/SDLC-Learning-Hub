export function Koi({
  className = '',
  slow = false,
  reversed = false,
}: {
  className?: string
  slow?: boolean
  reversed?: boolean
}) {
  const animClass = [
    'hb-koi',
    slow ? 'hb-koi--slow' : '',
    reversed ? 'hb-koi--rev' : '',
  ].filter(Boolean).join(' ')

  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animClass} ${className}`}
    >
      {/* Body */}
      <ellipse cx="38" cy="20" rx="28" ry="14" fill="var(--rose)" opacity="0.85" />
      {/* Tail upper */}
      <path d="M66 20 C74 12 78 8 76 4 C74 10 72 14 68 17Z" fill="var(--rose-soft)" opacity="0.7" />
      {/* Tail lower */}
      <path d="M66 20 C74 28 78 32 76 36 C74 30 72 26 68 23Z" fill="var(--rose-soft)" opacity="0.7" />
      {/* White spot */}
      <ellipse cx="30" cy="17" rx="7" ry="5" fill="white" opacity="0.6" />
      {/* Eye */}
      <circle cx="14" cy="19" r="3" fill="var(--ink)" />
      <circle cx="13" cy="18" r="1" fill="white" opacity="0.7" />
    </svg>
  )
}
