import type { ReactNode } from 'react';

type PillVariant = 'default' | 'coral' | 'sun' | 'sky' | 'meadow' | 'sage';

interface PillProps {
  variant?: PillVariant;
  children: ReactNode;
  className?: string;
}

export default function Pill({ variant = 'default', children, className }: PillProps) {
  const variantClass = variant !== 'default' ? `hb-pill--${variant}` : '';

  const classes = ['hb-pill', variantClass, className ?? '']
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}
