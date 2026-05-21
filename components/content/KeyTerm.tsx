import React from 'react'

interface KeyTermProps {
  term: string
  kana?: string
  def: string
  see?: string
}

export function KeyTerm({ term, kana, def, see }: KeyTermProps) {
  return (
    <div style={{
      margin: '20px 0', padding: '18px 22px',
      background: 'linear-gradient(160deg, #FFF7E1, #FFEAB3)',
      border: '1.5px solid #FFC93A',
      borderRadius: 16, position: 'relative',
      boxShadow: '0 6px 18px rgba(229,169,60,.15)',
    }}>
      <div style={{
        position: 'absolute', left: -10, top: -10,
        background: '#FFC93A', color: '#5a3f0a',
        padding: '4px 10px', borderRadius: 8,
        fontFamily: 'var(--font-hand)', fontSize: 15,
        transform: 'rotate(-3deg)',
        boxShadow: '0 4px 10px rgba(229,169,60,.4)',
      }}>
        key term
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 6 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
          color: '#5a3f0a',
        }}>{term}</span>
        {kana && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8a6a18',
            opacity: 0.8,
          }}>· {kana}</span>
        )}
      </div>
      <div style={{
        marginTop: 6, fontSize: 14, color: '#3a2a08', lineHeight: 1.6,
      }}>{def}</div>
      {see && (
        <div style={{
          marginTop: 8, fontSize: 11.5, color: '#8a6a18',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          see also: <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{see}</span>
        </div>
      )}
    </div>
  )
}
