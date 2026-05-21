interface Props {
  text: string
  attribution?: string
}

export default function QuoteBlock({ text, attribution }: Props) {
  return (
    <blockquote className="hb-quote">
      <span className="hb-quote__mark hb-quote__mark--open">&ldquo;</span>
      <p className="hb-quote__text">{text}</p>
      <span className="hb-quote__mark hb-quote__mark--close">&rdquo;</span>
      {attribution && (
        <footer className="hb-quote__attribution">{attribution}</footer>
      )}
    </blockquote>
  )
}
