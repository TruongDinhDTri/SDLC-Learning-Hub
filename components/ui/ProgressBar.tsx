import type { CSSProperties } from 'react';

interface ProgressBarProps {
  value: number;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function ProgressBar({ value, glow = false, className, style }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const containerClass = [
    'hb-progress',
    glow ? 'hb-progress--glow' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass} style={style}>
      <div
        className="hb-progress__fill"
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
