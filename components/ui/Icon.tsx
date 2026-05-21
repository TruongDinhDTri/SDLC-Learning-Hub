import type { CSSProperties } from 'react'

const PATHS: Record<string, React.ReactNode> = {
  folder:       <><path d="M3 7 L3 17 Q3 18 4 18 L20 18 Q21 18 21 17 L21 9 Q21 8 20 8 L11 8 L9 6 L4 6 Q3 6 3 7 Z" /></>,
  file:         <><path d="M6 4 L14 4 L18 8 L18 20 Q18 21 17 21 L6 21 Q5 21 5 20 L5 5 Q5 4 6 4 Z" /><path d="M14 4 L14 8 L18 8" /></>,
  chevronRight: <><path d="M9 6 L15 12 L9 18" /></>,
  chevronDown:  <><path d="M6 9 L12 15 L18 9" /></>,
  chevron:      <><path d="M9 6 L15 12 L9 18" /></>,
  search:       <><circle cx="11" cy="11" r="6" /><path d="M16 16 L21 21" /></>,
  sun:          <><circle cx="12" cy="12" r="4" /><path d="M12 2 L12 5 M12 19 L12 22 M2 12 L5 12 M19 12 L22 12 M4.5 4.5 L6.5 6.5 M17.5 17.5 L19.5 19.5 M4.5 19.5 L6.5 17.5 M17.5 6.5 L19.5 4.5" /></>,
  moon:         <><path d="M20 14 Q15 19 9 17 Q4 14 5 8 Q6 4 11 3 Q9 9 13 13 Q17 16 20 14 Z" /></>,
  plus:         <><path d="M12 5 L12 19 M5 12 L19 12" /></>,
  star:         <><path d="M12 4 L14 10 L20 10 L15 14 L17 20 L12 16 L7 20 L9 14 L4 10 L10 10 Z" /></>,
  bookmark:     <><path d="M7 4 L17 4 Q18 4 18 5 L18 20 L12 16 L6 20 L6 5 Q6 4 7 4 Z" /></>,
  tag:          <><path d="M3 12 L12 3 L21 3 L21 12 L12 21 Z" /><circle cx="16" cy="8" r="1.4" /></>,
  book:         <><path d="M4 5 Q4 4 5 4 L19 4 L19 19 L5 19 Q4 19 4 20 L4 5 Z M4 19 Q4 18 5 18 L19 18" /></>,
  clock:        <><circle cx="12" cy="12" r="8" /><path d="M12 7 L12 12 L16 14" /></>,
  sparkle:      <><path d="M12 3 L13.5 10 L20 11.5 L13.5 13 L12 20 L10.5 13 L4 11.5 L10.5 10 Z" /><path d="M19 4 L19.6 6 L21.5 6.5 L19.6 7 L19 9 L18.4 7 L16.5 6.5 L18.4 6 Z" /></>,
  leaf:         <><path d="M5 19 Q4 11 11 5 Q19 4 19 12 Q19 19 11 19 Q8 19 5 19 Z" /><path d="M5 19 L13 11" /></>,
  pin:          <><path d="M12 3 L17 8 L14 11 L16 18 L12 15 L8 18 L10 11 L7 8 Z" /></>,
  arrow:        <><path d="M5 12 L19 12 M13 6 L19 12 L13 18" /></>,
  home:         <><path d="M4 11 L12 4 L20 11 L20 19 Q20 20 19 20 L14 20 L14 14 L10 14 L10 20 L5 20 Q4 20 4 19 Z" /></>,
  flame:        <><path d="M12 3 Q10 7 8 9 Q5 12 6 16 Q7 20 12 20 Q17 20 18 16 Q19 12 16 9 Q13 7 12 3 Z" /></>,
  git:          <><circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="12" r="2" /><path d="M6 8 L6 16 M8 6 Q12 6 12 10 L12 14 Q12 18 8 18 M12 12 L16 12" /></>,
  db:           <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6 L5 12 Q5 15 12 15 Q19 15 19 12 L19 6 M5 12 L5 18 Q5 21 12 21 Q19 21 19 18 L19 12" /></>,
  bug:          <><ellipse cx="12" cy="13" rx="5" ry="6" /><path d="M12 7 L12 6 M9 4 L11 6 M15 4 L13 6 M5 11 L7 12 M5 17 L7 16 M19 11 L17 12 M19 17 L17 16 M12 9 L12 19" /></>,
  cmd:          <><path d="M6 6 Q4 6 4 8 Q4 10 6 10 L18 10 Q20 10 20 8 Q20 6 18 6 Q16 6 16 8 L16 16 Q16 18 18 18 Q20 18 20 16 Q20 14 18 14 L6 14 Q4 14 4 16 Q4 18 6 18 Q8 18 8 16 L8 8 Q8 6 6 6 Z" /></>,
  layers:       <><path d="M12 3 L21 8 L12 13 L3 8 Z M3 13 L12 18 L21 13 M3 18 L12 23 L21 18" /></>,
  menu:         <><path d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17" /></>,
  dots:         <><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>,
  check:        <><path d="M5 12 L10 17 L20 6" /></>,
  copy:         <><rect x="7" y="7" width="13" height="13" rx="2" /><path d="M5 14 L5 5 Q5 4 6 4 L15 4" /></>,
  eye:          <><path d="M2 12 Q7 5 12 5 Q17 5 22 12 Q17 19 12 19 Q7 19 2 12 Z" /><circle cx="12" cy="12" r="3" /></>,
  sidebar:      <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3 L9 21" /></>,
  list:         <><path d="M9 6 L21 6 M9 12 L21 12 M9 18 L21 18 M4 6 L4 6.01 M4 12 L4 12.01 M4 18 L4 18.01" strokeWidth="2" /></>,
  panelright:   <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M15 3 L15 21" /></>,
}

export type IconName = keyof typeof PATHS

interface IconProps {
  name: IconName
  size?: number
  color?: string
  strokeWidth?: number
  style?: CSSProperties
  className?: string
}

export function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.6, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      {PATHS[name] ?? null}
    </svg>
  )
}
