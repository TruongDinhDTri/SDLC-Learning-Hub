interface Props {
  body: string
}

export default function WisdomBlock({ body }: Props) {
  return (
    <div className="hb-wisdom">
      <div className="hb-wisdom__header">
        <span className="hb-wisdom__star">✦</span>
        WISDOM — TL;DR
      </div>
      <p className="hb-wisdom__body">{body}</p>
    </div>
  )
}
