interface Props {
  doLabel?: string
  dontLabel?: string
  doCode?: string
  dontCode?: string
  doCaption?: string
  dontCaption?: string
}

export default function DoDontBlock({
  doLabel,
  dontLabel,
  doCode,
  dontCode,
  doCaption,
  dontCaption,
}: Props) {
  return (
    <div className="hb-do-dont">
      <div className="hb-do-dont__side hb-do-dont__side--do">
        <div className="hb-do-dont__badge">
          <span>✓</span>
          <span className="hb-do-dont__label">{doLabel ?? 'DO'}</span>
        </div>
        {doCode && <pre className="hb-code">{doCode}</pre>}
        {doCaption && <p>{doCaption}</p>}
      </div>

      <div className="hb-do-dont__side hb-do-dont__side--dont">
        <div className="hb-do-dont__badge">
          <span>✗</span>
          <span className="hb-do-dont__label">{dontLabel ?? 'NOT THIS'}</span>
        </div>
        {dontCode && <pre className="hb-code">{dontCode}</pre>}
        {dontCaption && <p>{dontCaption}</p>}
      </div>
    </div>
  )
}
