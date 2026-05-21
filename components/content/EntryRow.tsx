import Link from 'next/link'

type Status = 'done' | 'draft' | 'in-progress'

interface Props {
  title: string
  summary?: string
  tags?: string[]
  readTime?: string
  tendedDate?: string
  accent?: string
  href?: string
  status?: Status
}

const STATUS_LABEL: Record<Status, string> = {
  done: 'Done',
  draft: 'Draft',
  'in-progress': 'In Progress',
}

function RowContent({ title, summary, tags, readTime, tendedDate, status }: Omit<Props, 'href' | 'accent'>) {
  return (
    <>
      <div className="hb-entry-row__main">
        <span className="hb-entry-row__title">{title}</span>
        {status && (
          <span className={`hb-entry-row__status hb-entry-row__status--${status}`}>
            {STATUS_LABEL[status]}
          </span>
        )}
      </div>
      {summary && <p className="hb-entry-row__summary">{summary}</p>}
      <div className="hb-entry-row__meta">
        {tags && tags.length > 0 && (
          <div className="hb-entry-row__tags">
            {tags.map(tag => (
              <span key={tag} className="hb-tag">{tag}</span>
            ))}
          </div>
        )}
        {readTime && <span className="hb-entry-row__time">{readTime}</span>}
        {tendedDate && <span className="hb-entry-row__date">{tendedDate}</span>}
      </div>
    </>
  )
}

export default function EntryRow({
  title,
  summary,
  tags,
  readTime,
  tendedDate,
  accent,
  href,
  status,
}: Props) {
  const style = accent ? { '--entry-accent': accent } as React.CSSProperties : undefined

  if (href) {
    return (
      <Link href={href} className="hb-entry-row" style={style}>
        <RowContent
          title={title}
          summary={summary}
          tags={tags}
          readTime={readTime}
          tendedDate={tendedDate}
          status={status}
        />
      </Link>
    )
  }

  return (
    <div className="hb-entry-row" style={style}>
      <RowContent
        title={title}
        summary={summary}
        tags={tags}
        readTime={readTime}
        tendedDate={tendedDate}
        status={status}
      />
    </div>
  )
}
