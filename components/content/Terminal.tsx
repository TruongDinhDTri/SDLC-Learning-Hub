// A string line = command; an object line = output with kind classification
type TerminalLine = string | { k: 'err' | 'ok' | 'dim' | 'out'; t: string }

interface Props {
  filename?: string
  lines: (string | TerminalLine)[]
}

export default function Terminal({ filename, lines }: Props) {
  return (
    <div style={{
      margin: '16px 0', borderRadius: 14, overflow: 'hidden',
      background: '#1f1a14',
      boxShadow: '0 12px 30px rgba(20,15,5,.25)',
      border: '1px solid #2c2519',
    }}>
      {/* Header */}
      <div style={{
        background: '#2c2519', padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff8e7e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbc14d' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#8fcb6f' }} />
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#a89880',
          flex: 1, textAlign: 'center',
        }}>
          {filename ?? '~ / yuki / hanami'}
        </span>
      </div>

      {/* Body */}
      <div style={{
        padding: '14px 16px',
        fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.75,
      }}>
        {lines.map((line, i) => {
          if (typeof line === 'string') {
            return (
              <div key={i} style={{ color: '#e8dfcf' }}>
                <span style={{ color: '#FF8FA3' }}>❀</span>{' '}
                <span style={{ color: '#FFE38B' }}>~/hanami</span>{' '}
                <span style={{ color: '#8FCB6F' }}>›</span>{' '}
                <span>{line}</span>
              </div>
            )
          }
          const color = line.k === 'err' ? '#ff8e7e'
                      : line.k === 'ok'  ? '#8FCB6F'
                      : line.k === 'dim' ? '#7a6e5a'
                      : '#cfc3a8'
          return (
            <div key={i} style={{ color, paddingLeft: 16 }}>{line.t}</div>
          )
        })}
        {/* Blinking cursor at end */}
        <div style={{ color: '#cfc3a8' }}>
          <span style={{ color: '#FF8FA3' }}>❀</span>{' '}
          <span style={{ color: '#FFE38B' }}>~/hanami</span>{' '}
          <span style={{ color: '#8FCB6F' }}>›</span>{' '}
          <span style={{
            display: 'inline-block', width: 8, height: 14,
            background: '#FFE38B', verticalAlign: '-3px', marginLeft: 2,
            animation: 'hb-blink 1s step-end infinite',
          }} />
        </div>
      </div>
    </div>
  )
}
