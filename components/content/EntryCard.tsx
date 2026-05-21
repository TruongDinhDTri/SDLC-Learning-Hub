import Link from 'next/link'

type Accent = 'rose' | 'peach' | 'sage' | 'lav' | 'sky' | 'pond' | 'water' | 'wood' | 'cream'

interface Props {
  title: string
  summary?: string
  tags?: string[]
  readTime?: string
  accent?: Accent
  freshLabel?: string
  href?: string
  onClick?: () => void
}

const ACCENT_GRADIENTS: Record<Accent, string> = {
  rose: 'linear-gradient(160deg, #FFE9E2, #F5D6D2)',
  peach: 'linear-gradient(160deg, #FFE8D2, #FADFC9)',
  sage: 'linear-gradient(160deg, #E8F2DC, #D6E3CB)',
  sky: 'linear-gradient(160deg, #DDEAEF, #B9D6E0)',
  lav: 'linear-gradient(160deg, #EDE8F5, #D9D0EE)',
  pond: 'linear-gradient(160deg, #D8EEE8, #C2DDD5)',
  water: 'linear-gradient(160deg, #D6E8F0, #BDD5E2)',
  wood: 'linear-gradient(160deg, #EDE0D0, #DDD0BC)',
  cream: 'linear-gradient(160deg, #FAF5EC, #F0E9DA)',
}

function CardContent({ title, summary, tags, readTime, freshLabel }: Omit<Props, 'href' | 'onClick' | 'accent'>) {
  return (
    <>
      {freshLabel && (
        <span
          className="hb-entry-card__fresh"
          style={{ transform: 'rotate(-3deg)' }}
        >
          {freshLabel}
        </span>
      )}
      <h3 className="hb-entry-card__title">{title}</h3>
      {summary && <p className="hb-entry-card__summary">{summary}</p>}
      <div className="hb-entry-card__meta">
        {tags && tags.length > 0 && (
          <div className="hb-entry-card__tags">
            {tags.map(tag => (
              <span key={tag} className="hb-tag">{tag}</span>
            ))}
          </div>
        )}
        {readTime && (
          <span className="hb-entry-card__time">{readTime}</span>
        )}
      </div>
    </>
  )
}

export default function EntryCard({
  title,
  summary,
  tags,
  readTime,
  accent,
  freshLabel,
  href,
  onClick,
}: Props) {
  const bg = accent ? ACCENT_GRADIENTS[accent] : undefined
  const style = bg ? { background: bg } : undefined

  if (href) {
    return (
      <Link href={href} className="hb-entry-card" style={style}>
        <CardContent
          title={title}
          summary={summary}
          tags={tags}
          readTime={readTime}
          freshLabel={freshLabel}
        />
      </Link>
    )
  }

  return (
    <div className="hb-entry-card" style={style} onClick={onClick} role={onClick ? 'button' : undefined}>
      <CardContent
        title={title}
        summary={summary}
        tags={tags}
        readTime={readTime}
        freshLabel={freshLabel}
      />
    </div>
  )
}
