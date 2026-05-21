const paths: Record<string, string | string[]> = {
  folder: 'M2 6h5l2-2h9a1 1 0 011 1v11a1 1 0 01-1 1H2a1 1 0 01-1-1V7a1 1 0 011-1z',
  file: ['M4 2h9l5 5v13a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z', 'M13 2v5h5'],
  chevronRight: 'M9 5l7 7-7 7',
  chevronDown: 'M5 9l7 7 7-7',
  search: ['M11 11m-4 0a4 4 0 108 0 4 4 0 00-8 0z', 'M21 21l-4.35-4.35'],
  sun: ['M12 12m-4 0a4 4 0 108 0 4 4 0 00-4 0z', 'M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'],
  moon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
  plus: 'M12 5v14M5 12h14',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  bookmark: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01',
  book: ['M4 19.5A2.5 2.5 0 016.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z'],
  clock: ['M12 12m-9 0a9 9 0 1018 0 9 9 0 00-18 0z', 'M12 7v5l3 3'],
  sparkle: 'M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM5 16l.75 2.25L8 19l-2.25.75L5 22l-.75-2.25L2 19l2.25-.75L5 16zM19 14l.5 1.5L21 16l-1.5.5L19 18l-.5-1.5L17 16l1.5-.5L19 14z',
  leaf: 'M17 8C8 10 5.9 16.17 3.82 19.92 3.82 19.92 8 20 12 15c0 0-2 5 5 7 0 0 3-4 1-8s-7-4-7-4 4-4 6-4z',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  home: ['M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', 'M9 22V12h6v10'],
  flame: 'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z',
  git: ['M18 15a3 3 0 100-6 3 3 0 000 6z', 'M6 9a3 3 0 100-6 3 3 0 000 6z', 'M6 21a3 3 0 100-6 3 3 0 000 6z', 'M18 12h-6M6 9v6'],
  db: ['M12 12m-9 0a9 3 0 1018 0 9 3 0 00-18 0z', 'M3 12v6a9 3 0 0018 0v-6', 'M3 6v6a9 3 0 0018 0V6'],
  bug: ['M8 2l1.88 1.88M14.12 3.88 16 2', 'M9 7.13v-1a3.003 3.003 0 116 0v1', 'M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 018 0v3c0 3.3-2.7 6-6 6z', 'M12 20v-9'],
  cmd: 'M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z',
  layers: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  menu: 'M3 12h18M3 6h18M3 18h18',
  dots: 'M12 13a1 1 0 100-2 1 1 0 000 2zM19 13a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z',
  check: 'M20 6L9 17l-5-5',
  copy: ['M8 8H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2', 'M8 8V6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2h-2'],
  eye: ['M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z', 'M12 15a3 3 0 100-6 3 3 0 000 6z'],
  pin: ['M12 17v5', 'M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6h1a2 2 0 000-4H8a2 2 0 000 4h1v4.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24V17z'],
}

export type IconName = keyof typeof paths

interface IconProps {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
  style?: React.CSSProperties
}

export function Icon({ name, size = 16, className = '', strokeWidth = 1.75, style }: IconProps) {
  const d = paths[name]
  const pathList = Array.isArray(d) ? d : [d]
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {pathList.map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}
