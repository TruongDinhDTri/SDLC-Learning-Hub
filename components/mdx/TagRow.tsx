export function TagRow({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '8px 0' }}>
      {tags.map(tag => (
        <span key={tag} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11.5,
          fontWeight: 500,
          padding: '4px 8px',
          borderRadius: 999,
          color: 'var(--ink-soft)',
          background: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid var(--line)',
        }}>
          #{tag}
        </span>
      ))}
    </div>
  )
}
