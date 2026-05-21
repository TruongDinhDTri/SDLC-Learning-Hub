export function BrandMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 10,
        background: 'linear-gradient(160deg, #F2C2A0, #E8B4B0 60%, #C4827E)',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 4px 10px rgba(196,130,126,.32), inset 0 1px 0 rgba(255,255,255,.5)',
        flexShrink: 0,
      }}>
        <svg viewBox="0 0 60 60" width={21} height={21} style={{ opacity: 0.95 }}>
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <g key={i} transform={`rotate(${deg} 30 30)`}>
              <path d="M30 30 C 24 22, 24 12, 30 8 C 36 12, 36 22, 30 30 Z"
                fill="#F5D6D2" stroke="#E8B4B0" strokeWidth=".5" />
            </g>
          ))}
          <circle cx="30" cy="30" r="3" fill="#F2C2A0" />
          <circle cx="30" cy="30" r="1.2" fill="#C4827E" />
        </svg>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, color: 'var(--ink)' }}>
          Hanami
        </div>
        <div style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 2 }}>
          playbook
        </div>
      </div>
    </div>
  )
}
