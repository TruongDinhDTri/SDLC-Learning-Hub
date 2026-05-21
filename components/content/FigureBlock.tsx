interface Props {
  label: string
  figNum?: number
  description?: string
  diagramContent?: string
}

export default function FigureBlock({ label, figNum, description, diagramContent }: Props) {
  return (
    <figure className="hb-figure">
      <div className="hb-figure__caption">
        <div className="hb-code-file__lights">
          <span className="hb-code-file__light hb-code-file__light--red" />
          <span className="hb-code-file__light hb-code-file__light--yellow" />
          <span className="hb-code-file__light hb-code-file__light--green" />
        </div>
        <span>
          {figNum != null ? `FIG ${figNum} · ` : ''}{label}
        </span>
      </div>

      <div className="hb-figure__content">
        {diagramContent ? (
          <div
            className="hb-figure__diagram"
            dangerouslySetInnerHTML={{ __html: diagramContent }}
          />
        ) : (
          <div className="hb-figure__diagram" aria-label="diagram placeholder" />
        )}
      </div>

      {description && (
        <figcaption className="hb-figure__note">{description}</figcaption>
      )}
    </figure>
  )
}
