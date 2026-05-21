'use client';

interface TagRowProps {
  tags: string[];
  active?: string;
  onTagClick?: (tag: string) => void;
}

export default function TagRow({ tags, active, onTagClick }: TagRowProps) {
  return (
    <div className="hb-tag-bar">
      {tags.map((tag) => {
        const display = tag.startsWith('#') ? tag : `#${tag}`;
        const isActive = active !== undefined && (active === tag || active === display);

        return (
          <button
            key={tag}
            className={['hb-tag-item', isActive ? 'hb-tag-item--active' : ''].filter(Boolean).join(' ')}
            onClick={() => onTagClick?.(tag)}
            type="button"
          >
            {display}
          </button>
        );
      })}
    </div>
  );
}
