'use client'

// NOTE: This file uses 'use client' because ReadingProgress and StepBlock require
// client-side hooks. The data-fetching is done synchronously from the in-memory store.

import { useState, useEffect, useRef } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { HorizonBand } from '@/components/decorations/HorizonBand'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { MobileSidebarBackdrop, MobileBottomNav } from '@/components/layout/MobileControls'
import TOCPanel from '@/components/layout/TOCPanel'
import Pill from '@/components/ui/Pill'
import EntryCard from '@/components/content/EntryCard'
import WisdomBlock from '@/components/content/WisdomBlock'
import QuoteBlock from '@/components/content/QuoteBlock'
import DoDontBlock from '@/components/content/DoDontBlock'
import FigureBlock from '@/components/content/FigureBlock'
import PrereqChecklist from '@/components/content/PrereqChecklist'
import CodeFile from '@/components/content/CodeFile'
import Terminal from '@/components/content/Terminal'
import StepBlock from '@/components/content/StepBlock'
import { PullQuote } from '@/components/content/PullQuote'
import { BlockQuote } from '@/components/content/BlockQuote'
import { KeyTerm } from '@/components/content/KeyTerm'
import { DropCap } from '@/components/content/DropCap'
import { RcBullets } from '@/components/content/RcBullets'
import { RcOrdered } from '@/components/content/RcOrdered'
import { RcTable } from '@/components/content/RcTable'
import { Diff } from '@/components/content/Diff'
import { DeadlockDiagram } from '@/components/content/DeadlockDiagram'
import { FootnotesList } from '@/components/content/FootnotesList'
import { HUB_DEFS } from '@/lib/content'
import { HUBS, getHubPage, getHub, type ContentBlock } from '@/lib/hub-content'

/* ─── Accent maps ─── */
const ACCENT_MAP: Record<string, { bg: string; ink: string; iconColor: string }> = {
  sage:  { bg: 'linear-gradient(160deg, #E8F2DC, #D6E3CB)', ink: '#3e5234', iconColor: 'var(--sage-deep)' },
  sky:   { bg: 'linear-gradient(160deg, #E1EEF3, #C9DEE6)', ink: '#2e4a55', iconColor: '#6E94A0' },
  peach: { bg: 'linear-gradient(160deg, #FFE8D2, #FADFC9)', ink: '#6a4628', iconColor: 'var(--peach-deep)' },
  rose:  { bg: 'linear-gradient(160deg, #FFE9E2, #F5D6D2)', ink: '#5a3a2f', iconColor: 'var(--rose-deep)' },
}

const SIDEBAR_GROUPS = HUB_DEFS.map(hub => ({
  id: hub.id,
  label: hub.title,
  icon: hub.icon as IconName,
  iconColor: ACCENT_MAP[hub.accent]?.iconColor ?? 'var(--ink-faint)',
  children: hub.phases.map(p => ({
    id: `${hub.id}-${p.slug}`,
    label: p.title,
    href: `/${hub.id}/${p.slug}`,
    status: p.status === 'growing' ? 'sage' : 'mute' as 'sage' | 'mute',
  })),
}))

/* ─── Reading Progress ─── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const articleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const el = articleRef.current
      if (!el) return
      const { scrollTop, scrollHeight, clientHeight } = el
      const total = scrollHeight - clientHeight
      if (total <= 0) {
        setProgress(100)
        return
      }
      setProgress(Math.min(100, Math.round((scrollTop / total) * 100)))
    }

    const el = articleRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return { progress, articleRef }
}

/* ─── Callout helper (internal) ─── */
function Callout({ kind, title, text }: { kind: string; title?: string; text: string }) {
  const styles: Record<string, { bg: string; border: string; ink: string; icon: IconName; handle: string }> = {
    tip:     { bg: 'linear-gradient(160deg, #DDF1CC, #B8E098)', border: 'rgba(111,175,84,.4)',  ink: '#2e4818', icon: 'leaf',    handle: 'pro tip —' },
    note:    { bg: 'linear-gradient(160deg, #DCF0F4, #B6E9EE)', border: 'rgba(95,206,219,.35)', ink: '#1d6975', icon: 'sparkle', handle: 'good to know —' },
    warn:    { bg: 'linear-gradient(160deg, #FFE5D2, #FAC8A8)', border: 'rgba(198,138,99,.4)',  ink: '#7a3f1f', icon: 'flame',   handle: 'watch out —' },
    quote:   { bg: 'linear-gradient(160deg, #FFF7E1, #FFEAB3)', border: 'rgba(229,169,60,.4)',  ink: '#5a3f0a', icon: 'sparkle', handle: 'remember —' },
    danger:  { bg: 'linear-gradient(160deg, #FFE0E6, #FFC8D2)', border: 'rgba(212,90,117,.4)',  ink: '#5c1f2d', icon: 'flame',   handle: 'careful —' },
    success: { bg: 'linear-gradient(160deg, #E0F0CC, #C4E3AC)', border: 'rgba(111,175,84,.5)',  ink: '#2e4818', icon: 'check',   handle: 'you did it —' },
  }
  const s = styles[kind] ?? styles.note
  return (
    <div style={{
      margin: '14px 0', padding: '14px 18px',
      background: s.bg, border: `1.5px solid ${s.border}`,
      borderRadius: 14, display: 'flex', gap: 14,
    }}>
      <div style={{
        flex: '0 0 auto', width: 30, height: 30, borderRadius: 10,
        background: 'rgba(255,255,255,.7)', display: 'grid', placeItems: 'center',
        color: s.ink,
      }}>
        <Icon name={s.icon} size={15} color={s.ink} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: 'var(--font-hand)', fontSize: 16, color: s.ink,
            transform: 'rotate(-1deg)', display: 'inline-block',
          }}>{s.handle}</span>
          {title && (
            <span style={{ fontSize: 11, color: s.ink, opacity: .7, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              {title}
            </span>
          )}
        </div>
        <div style={{ marginTop: 4, fontSize: 13.5, color: s.ink, lineHeight: 1.6 }}>{text}</div>
      </div>
    </div>
  )
}

/* ─── Block renderer ─── */
function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={block.text.toLowerCase().replace(/\s+/g, '-')}
          style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500,
            color: 'var(--ink)', margin: '36px 0 10px', letterSpacing: '-0.012em',
            lineHeight: 1.18, position: 'relative',
            display: 'flex', alignItems: 'baseline', gap: 14,
          }}
        >
          {block.kanji !== undefined ? (
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, marginRight: -4,
              borderRadius: 8, background: 'linear-gradient(160deg, #FFE38B, #FFC93A)',
              color: '#5a3f0a', fontFamily: 'var(--font-display)',
              fontSize: 14, fontWeight: 700, flex: '0 0 auto',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.5)',
            }}>{block.kanji || '§'}</span>
          ) : null}
          <span style={{ flex: 1, minWidth: 0 }}>{block.text}</span>
        </h2>
      )
    case 'h3':
      return (
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600,
          color: 'var(--ink)', margin: '24px 0 8px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span className="hb-dot hb-dot--coral" style={{ flex: '0 0 auto' }} />
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.72, margin: '0 0 14px' }}>
          {block.text}
        </p>
      )
    case 'drop-cap':
      return <DropCap first={block.first}>{block.text}</DropCap>
    case 'list':
      return <RcBullets items={block.items} />
    case 'bullets':
      return <RcBullets items={block.items} />
    case 'ordered':
      return <RcOrdered items={block.items} />
    case 'callout':
      return <Callout kind={block.kind} title={block.title} text={block.text} />
    case 'step':
      return (
        <StepBlock
          key={block.n}
          n={block.n}
          title={block.title}
          summary={block.summary}
          done={block.done}
          defaultOpen={block.n === 1}
          content={block.content}
          renderBlock={(child, i) => <BlockRenderer key={i} block={child} />}
        />
      )
    case 'code':
      return (
        <CodeFile
          filename={block.lang}
          lines={block.code.split('\n')}
        />
      )
    case 'code-file':
      return (
        <CodeFile
          filename={block.filename}
          language={block.language}
          lines={block.lines}
          highlight={block.highlight}
        />
      )
    case 'terminal':
      return (
        <Terminal
          filename={block.filename}
          lines={block.lines}
        />
      )
    case 'checklist':
      return (
        <PrereqChecklist
          items={block.items.map(item => ({ text: item.label, done: item.done }))}
        />
      )
    case 'prereq':
      return (
        <PrereqChecklist
          title={block.title}
          items={block.items.map(item => ({ text: item.text, done: item.done }))}
        />
      )
    case 'table':
      return (
        <div style={{ margin: '18px 0', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: `repeat(${block.headers.length}, 1fr)`,
            background: 'linear-gradient(180deg, #f5ede0, #ecddc4)',
            borderBottom: '1px solid rgba(63,54,44,.1)',
            fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
            color: '#5a4a3a', fontWeight: 600,
          }}>
            {block.headers.map((h, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                borderRight: i < block.headers.length - 1 ? '1px solid rgba(63,54,44,.08)' : 'none',
              }}>{h}</div>
            ))}
          </div>
          {block.rows.map((row, ri) => (
            <div key={ri} style={{
              display: 'grid', gridTemplateColumns: `repeat(${block.headers.length}, 1fr)`,
              borderBottom: ri < block.rows.length - 1 ? '1px solid var(--line)' : 'none',
              background: ri % 2 === 1 ? 'rgba(250,245,238,.5)' : 'var(--paper)',
              fontSize: 13,
            }}>
              {row.map((cell, ci) => (
                <div key={ci} style={{
                  padding: '11px 14px',
                  borderRight: ci < row.length - 1 ? '1px solid rgba(63,54,44,.05)' : 'none',
                  color: ci === 0 ? 'var(--ink)' : 'var(--ink)',
                  fontWeight: ci === 0 ? 600 : 400,
                  lineHeight: 1.55,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
      )
    case 'mindset':
      return (
        <div style={{ margin: '16px 0', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '10px 14px', background: 'linear-gradient(180deg, rgba(242,194,160,.3), rgba(242,194,160,.15))', fontWeight: 600, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.14em', color: '#7a4a2a' }}>Junior Mindset</div>
            <div style={{ padding: '10px 14px', background: 'linear-gradient(180deg, rgba(181,201,166,.3), rgba(181,201,166,.15))', fontWeight: 600, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.14em', color: '#3e5234' }}>Senior Mindset</div>
          </div>
          {block.rows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--line)' }}>
              <div style={{ padding: '10px 14px', color: 'var(--ink)', fontSize: 13.5, lineHeight: 1.55, background: i % 2 ? 'rgba(242,194,160,.06)' : 'transparent' }}>{row.junior}</div>
              <div style={{ padding: '10px 14px', color: 'var(--ink)', fontSize: 13.5, lineHeight: 1.55, background: i % 2 ? 'rgba(181,201,166,.06)' : 'transparent' }}>{row.senior}</div>
            </div>
          ))}
        </div>
      )
    case 'wisdom':
      return <WisdomBlock body={block.body} />
    case 'pull-quote':
      return <PullQuote attribution={block.attribution}>{block.text}</PullQuote>
    case 'blockquote':
      return <BlockQuote attribution={block.attribution}>{block.text}</BlockQuote>
    case 'quote':
      return <QuoteBlock text={block.text} attribution={block.attribution} />
    case 'key-term':
      return <KeyTerm term={block.term} kana={block.kana} def={block.def} see={block.see} />
    case 'deadlock-diagram':
      return <DeadlockDiagram caption={block.caption} />
    case 'diff':
      return <Diff filename={block.filename} hunks={block.hunks} />
    case 'figure':
      return (
        <FigureBlock
          label={block.label}
          figNum={block.figNum}
          description={block.description}
          diagramContent={block.diagramContent}
        />
      )
    case 'rc-table':
      return <RcTable caption={block.caption} headers={block.headers} rows={block.rows} />
    case 'footnotes':
      return <FootnotesList items={block.items} />
    case 'do-dont':
      return (
        <DoDontBlock
          doLabel={block.doLabel}
          dontLabel={block.dontLabel}
          doCode={block.doCode}
          dontCode={block.dontCode}
          doCaption={block.doCaption}
          dontCaption={block.dontCaption}
        />
      )
    case 'numbered-callout': {
      const variantColors: Record<string, { bg: string; ink: string }> = {
        rose:  { bg: 'linear-gradient(160deg, #FFE9E2, #F5D6D2)', ink: '#5a3a2f' },
        sage:  { bg: 'linear-gradient(160deg, #E8F2DC, #D6E3CB)', ink: '#3e5234' },
        peach: { bg: 'linear-gradient(160deg, #FFE8D2, #FADFC9)', ink: '#6a4628' },
        sun:   { bg: 'linear-gradient(160deg, #FFF3CC, #FFE888)', ink: '#5a4a00' },
      }
      const vc = variantColors[block.variant ?? 'rose'] ?? variantColors.rose
      return (
        <div style={{
          display: 'flex', gap: 16, margin: '16px 0', padding: '16px 18px',
          background: vc.bg, borderRadius: 14, border: '1px solid rgba(0,0,0,.05)',
        }}>
          <div style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,.7)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
            color: vc.ink,
          }}>
            {block.num}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: vc.ink, marginBottom: 4 }}>
              {block.heading}
            </div>
            <div style={{ fontSize: 13.5, color: vc.ink, lineHeight: 1.6, opacity: .85 }}>
              {block.body}
            </div>
          </div>
        </div>
      )
    }
    default:
      return null
  }
}

/* ─── Article scroll wrapper (client component for reading progress) ─── */
function ArticleWithProgress({
  children,
  accentInk,
}: {
  children: React.ReactNode
  accentInk: string
}) {
  const [progress, setProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    function onScroll() {
      if (!el) return
      const { scrollTop, scrollHeight, clientHeight } = el
      const total = scrollHeight - clientHeight
      setProgress(total <= 0 ? 100 : Math.min(100, Math.round((scrollTop / total) * 100)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Reading progress bar */}
      <div className="hb-reading-progress" style={{
        height: 3,
        background: 'var(--line)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        flexShrink: 0,
      }}>
        <div
          className="hb-reading-progress__fill"
          style={{
            height: '100%',
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${accentInk}, var(--rose-deep))`,
            transition: 'width .1s linear',
          }}
        />
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
        {children}
      </div>
    </div>
  )
}

/* ─── Hub index (redirects to /[hub] page) ─── */
function HubIndexContent({ hubId, showSidebar, onToggleSidebar }: { hubId: string; showSidebar?: boolean; onToggleSidebar?: () => void }) {
  const hub = getHub(hubId)
  const hubDef = HUB_DEFS.find(h => h.id === hubId)
  if (!hub || !hubDef) return null

  const accentKey = hub.accent ?? 'rose'
  const a = ACCENT_MAP[accentKey] ?? ACCENT_MAP.rose
  const allTags = Array.from(new Set(hub.phases.flatMap(p => p.tags ?? []))).slice(0, 12)

  return (
    <>
      <TopBar
        breadcrumb={[
          { label: 'Home', href: '/', icon: 'home' },
          { label: 'Library', href: '/' },
          { label: hub.title },
        ]}
        onToggleSidebar={onToggleSidebar}
        sidebarOpen={showSidebar}
      />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ position: 'relative', borderRadius: 16, margin: '16px 24px 0', overflow: 'hidden' }}>
          <HorizonBand height={160} />
        </div>
        <div style={{ padding: '24px 32px 60px' }}>
          {/* Hub header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 14, color: 'var(--ink-faint)', transform: 'rotate(-1deg)', display: 'inline-block', marginBottom: 8 }}>
                a quiet grove
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: a.bg, border: '1px solid rgba(0,0,0,.06)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name={hub.icon as IconName} size={22} color={a.ink} />
                </div>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                    {hub.title}
                  </h1>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginTop: 4 }}>
                    {hub.phases.length} entries · {allTags.length} tags · last tended yesterday
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, paddingTop: 4 }}>
              <button className="hb-btn hb-btn--ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
                <Icon name="bookmark" size={13} /> Subscribe
              </button>
              <button className="hb-btn hb-btn--ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
                <Icon name="link" size={13} /> Share
              </button>
            </div>
          </div>

          {/* Tag bar */}
          <div className="hb-tag-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {allTags.map(tag => (
              <span key={tag} className="hb-tag-item" style={{ fontSize: 11.5, padding: '4px 10px', borderRadius: 20, background: 'var(--paper)', border: '1px solid var(--line-strong)', color: 'var(--ink-faint)', cursor: 'pointer' }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Entry grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {hub.phases.map(phase => (
              <EntryCard
                key={phase.slug}
                href={`/${hubId}/${phase.slug}`}
                title={phase.title}
                summary={phase.description}
                tags={phase.tags?.slice(0, 3)}
                readTime={phase.duration}
                accent={accentKey as 'sage' | 'sky' | 'peach' | 'rose'}
                freshLabel={phase.status === 'growing' ? 'growing' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Main page component ─── */
export default function ArticlePage() {
  const params = useParams()
  const hubId = typeof params.hub === 'string' ? params.hub : ''
  const slugArr = Array.isArray(params.slug) ? params.slug : (params.slug ? [params.slug as string] : [])

  // Panel toggle state — must be before any conditional returns
  const [showSidebar, setShowSidebar] = useState(true)
  const [showToc, setShowToc] = useState(true)

  // Hub index
  if (!slugArr || slugArr.length === 0) {
    const hub = getHub(hubId)
    const hubDef = HUB_DEFS.find(h => h.id === hubId)
    if (!hub || !hubDef) return notFound()

    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <MobileSidebarBackdrop />
        <Sidebar groups={SIDEBAR_GROUPS} collapsed={!showSidebar} />
        <main style={{ flex: 1, minWidth: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <HubIndexContent hubId={hubId} showSidebar={showSidebar} onToggleSidebar={() => setShowSidebar(p => !p)} />
        </main>
        <MobileBottomNav />
      </div>
    )
  }

  // Article page
  const phaseSlug = slugArr[0]
  const page = getHubPage(hubId, phaseSlug)
  if (!page) return notFound()

  const hubData = getHub(hubId)
  const hubDef = HUB_DEFS.find(h => h.id === hubId)
  if (!hubData || !hubDef) return notFound()

  const accentKey = hubData.accent ?? 'rose'
  const a = ACCENT_MAP[accentKey] ?? ACCENT_MAP.rose

  // Collect TOC items from h2 blocks
  const tocItems = page.content
    .filter(b => b.type === 'h2')
    .map(b => {
      const h2 = b as Extract<ContentBlock, { type: 'h2' }>
      return { id: h2.text.toLowerCase().replace(/\s+/g, '-'), label: h2.text }
    })

  // Step items as secondary TOC (if no h2s, use steps)
  const stepTocItems = tocItems.length === 0
    ? page.content
        .filter(b => b.type === 'step')
        .map(b => {
          const step = b as Extract<ContentBlock, { type: 'step' }>
          return { id: `step-${step.n}`, label: step.title }
        })
    : []

  const finalTocItems = tocItems.length > 0 ? tocItems : stepTocItems

  // Up next
  const currentIdx = hubDef.phases.findIndex(p => p.slug === phaseSlug)
  const nextPhase = currentIdx >= 0 && currentIdx < hubDef.phases.length - 1
    ? hubDef.phases[currentIdx + 1]
    : null

  const upNext = nextPhase ? {
    title: nextPhase.title,
    description: `Next phase in ${hubData.title}`,
    href: `/${hubId}/${nextPhase.slug}`,
  } : undefined

  // Related: 2 other phases from same hub (not current)
  const related = hubDef.phases
    .filter(p => p.slug !== phaseSlug)
    .slice(0, 2)
    .map(p => ({ label: p.title, href: `/${hubId}/${p.slug}` }))

  // Outcome chips: first 3 tags
  const outcomes = page.tags?.slice(0, 3) ?? []

  const STATUS_DOT: Record<string, string> = { growing: 'sage', mature: 'sage', seed: 'mute' }
  const STATUS_LABEL: Record<string, string> = { growing: 'Growing', mature: 'Mature', seed: 'Seed' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MobileSidebarBackdrop />
      <Sidebar groups={SIDEBAR_GROUPS} collapsed={!showSidebar} />

      <main style={{ flex: 1, minWidth: 0, height: '100vh', display: 'flex', overflow: 'hidden', position: 'relative', background: 'var(--surface)' }}>
        {/* Sky gradient band */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 200,
          background: 'linear-gradient(180deg, rgba(182,233,238,.35) 0%, transparent 100%)',
          zIndex: 0, pointerEvents: 'none',
        }} />

        <ArticleWithProgress accentInk={a.ink}>
          <TopBar
            breadcrumb={[
              { label: 'Home', href: '/', icon: 'home' },
              { label: hubData.title, href: `/${hubId}` },
              { label: page.title },
            ]}
            onToggleSidebar={() => setShowSidebar(p => !p)}
            sidebarOpen={showSidebar}
            onToggleToc={() => setShowToc(p => !p)}
            tocOpen={showToc}
            actions={
              <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 10px' }}>
                <Icon name="bookmark" size={13} />
              </button>
            }
          />

          {/* Hero band */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <HorizonBand height={180} />
          </div>

          {/* Reading column — centered within the scrollable area */}
          <div className="hanami-reading-col" style={{
            maxWidth: 1060,
            margin: '0 auto',
            padding: '0 48px',
            boxSizing: 'border-box',
          }}>

          {/* Article header */}
          <div style={{ padding: '32px 0 0' }}>
            {/* Pills row */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              <Pill variant="coral">Playbook</Pill>
              <Pill variant="sun">
                {STATUS_LABEL[page.status] ?? 'Mature'}
              </Pill>
              {page.duration && (
                <Pill variant="sky">
                  <Icon name="clock" size={11} /> {page.duration}
                </Pill>
              )}
            </div>

            {/* H1 */}
            <h1 className="hanami-article-h1" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 52,
              lineHeight: 1.04,
              fontWeight: 500,
              margin: '4px 0 8px',
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}>
              <span className="hb-marker">{page.title}</span>
            </h1>

            {/* Lead */}
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 19,
              color: 'var(--ink)',
              lineHeight: 1.55,
              margin: '8px 0 18px',
              letterSpacing: '-0.005em',
            }}>
              {page.description}
            </p>

            {/* Author row */}
            <div className="hb-author-row" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 0',
              borderTop: '1px dashed var(--line)',
              borderBottom: '1px dashed var(--line)',
              marginBottom: 16,
            }}>
              <Avatar initials="YT" hue={a.bg.split(',')[1]?.trim().split(')')[0] ?? '#E8B4B0'} />
              <div>
                <div className="hb-author-row__name" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                  Yuki Tanaka
                </div>
                <div className="hb-author-row__role" style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>
                  Staff engineer · this is my playbook
                </div>
              </div>
              <div className="hb-author-row__reading" style={{
                marginLeft: 'auto',
                fontSize: 11.5,
                color: 'var(--ink-faint)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#7BB8B4' }} />
                2 reading right now
              </div>
            </div>

            {/* Action row */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
              <button className="hb-btn hb-btn--ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
                Cite
              </button>
              <button
                className="hb-btn"
                style={{
                  padding: '8px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  background: a.bg,
                  color: a.ink,
                  border: '1px solid rgba(0,0,0,.06)',
                  borderRadius: 10,
                  cursor: 'pointer',
                }}
              >
                Start practicing
              </button>
            </div>

            {/* Outcomes */}
            {outcomes.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 8 }}>
                  What you&apos;ll walk away with
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {outcomes.map(o => (
                    <span key={o} style={{
                      fontSize: 12,
                      padding: '5px 12px',
                      borderRadius: 20,
                      background: a.bg,
                      color: a.ink,
                      border: '1px solid rgba(0,0,0,.05)',
                      fontWeight: 500,
                    }}>
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Article body */}
          <div className="rc-article" style={{ paddingBottom: 80 }}>
            {page.content.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}

            {/* Navigation */}
            <div style={{
              marginTop: 48,
              paddingTop: 20,
              borderTop: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              color: 'var(--ink-faint)',
            }}>
              <Link href={`/${hubId}`} style={{ color: 'var(--ink-faint)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="arrow" size={13} style={{ transform: 'scaleX(-1)' }} /> Back to {hubData.title}
              </Link>
              {nextPhase && (
                <Link href={`/${hubId}/${nextPhase.slug}`} style={{ color: 'var(--ink-faint)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {nextPhase.title} <Icon name="arrow" size={13} />
                </Link>
              )}
            </div>
          </div>

          </div>{/* end reading column */}
        </ArticleWithProgress>

        {/* TOC Panel */}
        <aside className="hanami-toc-panel" style={{
          width: showToc ? 260 : 0,
          flex: '0 0 auto',
          borderLeft: showToc ? '1px solid var(--line)' : 'none',
          padding: showToc ? '32px 22px' : '32px 0',
          background: 'rgba(255,251,244,.55)',
          backdropFilter: 'blur(6px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100%',
          position: 'relative',
          transition: 'width 0.22s cubic-bezier(.4,0,.2,1), padding 0.22s cubic-bezier(.4,0,.2,1)',
        }}>
          <TOCPanel
            items={finalTocItems}
            upNext={upNext}
            related={related}
          />
        </aside>
      </main>

      <MobileBottomNav />
    </div>
  )
}
