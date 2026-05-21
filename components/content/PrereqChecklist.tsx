interface Item {
  text: string
  done?: boolean
}

interface Props {
  title?: string
  items: Item[]
}

export default function PrereqChecklist({ title = 'Before you run it', items }: Props) {
  return (
    <div className="hb-prereq">
      <div className="hb-prereq__header">{title}</div>
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            className={`hb-prereq__item${item.done ? ' hb-prereq__item--done' : ''}`}
          >
            <span className="hb-prereq__check">
              {item.done ? '✓' : '○'}
            </span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
