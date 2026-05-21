export function Avatar({ initials = 'T', hue = '#E8B4B0' }: { initials?: string; hue?: string }) {
  return (
    <div style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: `linear-gradient(160deg, ${hue}, #F5D6D2)`,
      color: '#5a3a2f',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      fontWeight: 600,
      boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,.5)',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}
