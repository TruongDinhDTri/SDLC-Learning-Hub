import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { StatusDot } from '@/components/ui/StatusDot'

const ACCENTS: Record<string, { bg: string; text: string; kanji: string }> = {
  sage:  { bg: 'linear-gradient(160deg, var(--sage-soft), var(--sage))',         text: 'var(--sage-deep)',   kanji: '育' },
  peach: { bg: 'linear-gradient(160deg, var(--peach-soft), var(--peach))',       text: 'var(--peach-deep)', kanji: '創' },
  sky:   { bg: 'linear-gradient(160deg, var(--sky-soft), var(--sky))',           text: '#4a7282',            kanji: '解' },
  rose:  { bg: 'linear-gradient(160deg, var(--rose-soft), var(--rose))',         text: 'var(--rose-deep)',   kanji: '道' },
  lav:   { bg: 'linear-gradient(160deg, var(--lavender-soft), var(--lavender))', text: '#7060a0',            kanji: '智' },
  cream: { bg: 'linear-gradient(160deg, var(--cream), var(--cream-deep))',       text: 'var(--ink-soft)',    kanji: '知' },
  pond:  { bg: 'linear-gradient(160deg, #B6D8D6, #7BB8B4)',                      text: '#3F7C7A',            kanji: '水' },
  water: { bg: 'linear-gradient(160deg, #D6EAF8, #A9CCE3)',                      text: '#2E6DA4',            kanji: '流' },
  wood:  { bg: 'linear-gradient(160deg, #D6C5A8, #BFA882)',                      text: '#7A5C3A',            kanji: '木' },
}

interface HubCardProps {
  title: string
  description: string
  accent?: string
  entryCount: number
  matureCount?: number
  growingCount?: number
  href: string
}

export function HubCard({
  title,
  description,
  accent = 'sage',
  entryCount,
  matureCount = 0,
  growingCount = 0,
  href,
}: HubCardProps) {
  const a = ACCENTS[accent] ?? ACCENTS.sage

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
          cursor: 'pointer',
          transition: 'transform .15s, box-shadow .15s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-2px)'
          el.style.boxShadow = 'var(--shadow-md)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = ''
          el.style.boxShadow = 'var(--shadow-sm)'
        }}
      >
        {/* Thumbnail with gradient + kanji watermark */}
        <div style={{
          height: 92,
          background: a.bg,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <span style={{
            position: 'absolute',
            right: 12,
            bottom: -8,
            fontFamily: 'var(--font-display)',
            fontSize: 72,
            color: a.text,
            opacity: 0.18,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}>
            {a.kanji}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: '14px 16px 16px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--ink)',
            marginBottom: 4,
          }}>
            {title}
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--ink-faint)',
            marginBottom: 12,
            lineHeight: 1.5,
          }}>
            {description}
          </div>

          {/* Status row */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--ink-ghost)' }}>
              <Icon name="book" size={11} />
              {entryCount} entries
            </span>
            {matureCount > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--ink-ghost)' }}>
                <StatusDot status="mature" /> {matureCount}
              </span>
            )}
            {growingCount > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--ink-ghost)' }}>
                <StatusDot status="growing" /> {growingCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
