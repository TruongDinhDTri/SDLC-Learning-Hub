interface Props {
  filename?: string
  lines: string[]
}

function lineClass(line: string): string {
  if (line.startsWith('~/') || line.startsWith('$ ') || line.startsWith('❀')) {
    return 'hb-terminal__line--prompt'
  }
  if (line.startsWith('ERROR')) {
    return 'hb-terminal__line--error'
  }
  if (line.startsWith('HINT')) {
    return 'hb-terminal__line--hint'
  }
  if (line.startsWith('DETAIL')) {
    return 'hb-terminal__line--detail'
  }
  return ''
}

export default function Terminal({ filename, lines }: Props) {
  return (
    <div className="hb-terminal">
      <div className="hb-terminal__header">
        <div className="hb-terminal__lights">
          <span className="hb-code-file__light hb-code-file__light--red" />
          <span className="hb-code-file__light hb-code-file__light--yellow" />
          <span className="hb-code-file__light hb-code-file__light--green" />
        </div>
        {filename && <span className="hb-terminal__filename">{filename}</span>}
      </div>

      <pre className="hb-terminal__body">
        <code>
          {lines.map((line, i) => {
            const cls = lineClass(line)
            return (
              <span key={i} className={`hb-terminal__line${cls ? ` ${cls}` : ''}`}>
                {line}
                {'\n'}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
