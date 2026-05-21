// Hanami artboards — composed views for the design canvas.

const { useState: useState_, useEffect: useEffect_ } = React;

/* ─────────────────────────── Shared data ─────────────────────────── */
const TREE = [
  {
    id: 'react', label: 'React patterns', icon: 'layers', iconColor: 'var(--rose-deep)',
    children: [
      { id: 'react-hooks',    label: 'Hook recipes',         status: 'rose',  count: 12 },
      { id: 'react-state',    label: 'State management',     status: 'rose',  count: 8 },
      { id: 'react-suspense', label: 'Suspense & streaming', status: 'peach', count: 5, fresh: true },
      { id: 'react-perf',     label: 'Performance',          status: 'mute',  count: 9 },
    ],
  },
  {
    id: 'backend', label: 'Backend recipes', icon: 'db', iconColor: 'var(--sage-deep)',
    children: [
      { id: 'be-postgres', label: 'Postgres tricks',  status: 'sage',  count: 21 },
      { id: 'be-queue',    label: 'Queues & jobs',    status: 'sage',  count: 7 },
      { id: 'be-cache',    label: 'Caching',          status: 'mute',  count: 6 },
      { id: 'be-auth',     label: 'Auth flows',       status: 'lav',   count: 4 },
    ],
  },
  {
    id: 'tooling', label: 'Tooling', icon: 'cmd', iconColor: 'var(--peach-deep)',
    children: [
      { id: 'tool-shell',  label: 'Shell snippets',   status: 'peach', count: 33 },
      { id: 'tool-git',    label: 'Git workflows',    status: 'peach', count: 14 },
      { id: 'tool-docker', label: 'Docker recipes',   status: 'mute',  count: 10 },
    ],
  },
  {
    id: 'debug', label: 'Debugging playbooks', icon: 'bug', iconColor: '#9388A6',
    children: [
      { id: 'dbg-mem',     label: 'Memory leaks',     status: 'lav',   count: 5 },
      { id: 'dbg-prod',    label: 'Prod incidents',   status: 'rose',  count: 11, fresh: true },
      { id: 'dbg-network', label: 'Networking',       status: 'mute',  count: 8 },
    ],
  },
  {
    id: 'notes', label: 'Notes & journal', icon: 'book', iconColor: 'var(--ink-faint)',
    children: [
      { id: 'n-today',     label: 'Today',            status: 'sage' },
      { id: 'n-week',      label: 'This week',        status: 'mute' },
      { id: 'n-archive',   label: 'Archive',          status: 'mute' },
    ],
  },
];

/* ─────────────────────────── DESKTOP · DASHBOARD ─────────────────────────── */
const DesktopDashboard = () => {
  return (
    <div className="hanami-surface" style={{ display: 'flex' }}>
      <Sidebar tree={TREE} activeId="react" onSelect={() => {}} />

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* SKY band — bright turquoise behind everything */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 340,
          background: 'linear-gradient(180deg, #5FCEDB 0%, #87DDEA 50%, transparent 100%)',
          zIndex: 0, pointerEvents: 'none',
        }} />

        {/* Sun */}
        <div style={{ position: 'absolute', right: 90, top: 70, zIndex: 1 }}>
          <Sun size={100} opacity={0.95} />
        </div>

        {/* Drifting clouds */}
        <div className="hb-drift" style={{ position: 'absolute', left: '20%', top: 50, zIndex: 1 }}>
          <PuffyCloud size={200} opacity={0.95} />
        </div>
        <div className="hb-drift hb-drift--rev" style={{ position: 'absolute', left: '52%', top: 110, zIndex: 1 }}>
          <PuffyCloud size={140} opacity={0.85} />
        </div>
        <div className="hb-drift" style={{ position: 'absolute', left: '4%', top: 130, zIndex: 1 }}>
          <PuffyCloud size={110} opacity={0.7} />
        </div>

        {/* Flower field across the bottom — the star of the show */}
        <FlowerField height={160} density={1.4} />

        {/* Topbar — over the sky */}
        <div style={{
          height: 60, display: 'flex', alignItems: 'center', gap: 16,
          padding: '0 32px',
          background: 'rgba(255,251,244,.3)',
          backdropFilter: 'blur(8px)',
          position: 'relative', zIndex: 5,
        }}>
          <Breadcrumb items={[
            { icon: 'home', label: 'Home' },
            { label: 'Library' },
          ]} />
          <div style={{ flex: 1 }} />
          <button className="hb-btn hb-btn--ghost">
            <Icon name="sun" size={14} /> Season
          </button>
          <button className="hb-btn">
            <Icon name="plus" size={14} /> New entry
          </button>
          <Avatar initials="YT" />
        </div>

        {/* Scrollable content */}
        <div style={{ padding: '32px 36px 44px 36px', position: 'relative', zIndex: 2, height: 'calc(100% - 60px)', overflow: 'hidden' }}>
          {/* Hero greeting band — sits ON the sky, so no card background */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 20 }}>
            <div style={{ maxWidth: 620, position: 'relative' }}>
              <div style={{
                fontFamily: 'var(--font-hand)', fontSize: 24, color: '#D45A75',
                marginBottom: 4, transform: 'rotate(-1deg)', display: 'inline-block',
              }}>
                おかえり, Yuki ·
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1.08,
                fontWeight: 500, color: '#1d3a52', margin: 0, letterSpacing: '-0.015em',
                textShadow: '0 1px 0 rgba(255,255,255,.5)',
              }}>
                A bright field of half-<br/>
                finished <span className="hb-marker">ideas</span>.
              </h1>
              <p style={{
                marginTop: 12, color: '#2d4a5c', fontSize: 14.5, maxWidth: 500, lineHeight: 1.6,
              }}>
                <strong>3 drafts</strong> waiting and <strong style={{ color: '#D45A75' }}>5 new entries</strong> the
                team planted while you were tending other things.
              </p>

              {/* Hand-drawn arrow pointing at "new entry" */}
              <div style={{ position: 'absolute', right: -120, top: 30, transform: 'rotate(20deg)', opacity: .8 }}>
                <HandArrow length={90} color="#D45A75" rotate={-30} />
              </div>
            </div>

            {/* Compact stat tiles */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'entries', value: '184', sub: '+5 this week', dot: 'coral' },
                { label: 'streak',  value: '12d', sub: 'longest 27d',  dot: 'sun' },
                { label: 'pinned',  value: '08',  sub: '2 expiring',   dot: 'sage' },
              ].map(s => (
                <div key={s.label} className="hb-card hb-lift" style={{
                  padding: '12px 16px', minWidth: 112, borderRadius: 14,
                  background: 'rgba(255,252,246,.92)',
                  backdropFilter: 'blur(6px)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5,
                    letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
                    <span className={'hb-dot hb-dot--' + s.dot} />
                    {s.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ink)',
                    marginTop: 4, lineHeight: 1, fontWeight: 500 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue learning band */}
          <div className="hb-card hb-lift" style={{
            padding: '14px 18px', borderRadius: 16, marginBottom: 18,
            background: 'linear-gradient(160deg, rgba(255,255,255,.95), rgba(255,232,238,.6))',
            border: '1px solid rgba(255,143,163,.25)',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(160deg, #FFC8D2, #FF8FA3)',
              display: 'grid', placeItems: 'center', color: '#7a1f33',
              flex: '0 0 auto',
            }}>
              <Icon name="bug" size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
                color: 'var(--ink-faint)' }}>
                pick up where you left off
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)',
                fontWeight: 500, marginTop: 2 }}>
                Untangling a flaky Postgres deadlock
              </div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, maxWidth: 320 }}>
                  <div className="hb-progress" style={{ height: 5 }}>
                    <div className="hb-progress__fill" style={{ width: '35%' }} />
                  </div>
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>
                  step 2 of 4 · 5 min left
                </span>
              </div>
            </div>
            <button className="hb-btn hb-btn--primary">
              <Icon name="arrow" size={13} /> Resume
            </button>
          </div>

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500,
              color: 'var(--ink)', margin: 0,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <BellFlower size={22} hue="#FF8FA3" />
              Learning hubs
            </h2>
            <div style={{ display: 'flex', gap: 6 }}>
              {['All', 'Pinned', 'In progress', 'Owned by me'].map((t, i) => (
                <span key={t} className="hb-chip" style={{
                  background: i === 0 ? 'rgba(255,143,163,.25)' : 'rgba(255,255,255,.7)',
                  color: i === 0 ? '#7a1f33' : 'var(--ink-soft)',
                  fontWeight: i === 0 ? 600 : 500,
                  borderColor: i === 0 ? 'rgba(212,90,117,.3)' : 'var(--line)',
                  cursor: 'pointer',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Hub grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            <HubCard accent="rose"  icon="layers" title="React patterns"
              blurb="Hooks, suspense, state machines."
              count="34" kanji="花" fresh
              slotId="hub-react" slotPlaceholder="painted scene" />
            <HubCard accent="sky"   icon="db" title="Backend recipes"
              blurb="Postgres tricks, queues, idempotency."
              count="38" kanji="水"
              slotId="hub-be" slotPlaceholder="painted scene" />
            <HubCard accent="cream" icon="cmd" title="Tooling & shell"
              blurb="Tiny snippets that save five minutes, fifty times a day."
              count="57" kanji="道"
              slotId="hub-tool" slotPlaceholder="painted scene" />
            <HubCard accent="sage"  icon="bug" title="Debugging playbooks"
              blurb="When prod burns: scripts, queries, calm checklists."
              count="24" kanji="雨" fresh
              slotId="hub-debug" slotPlaceholder="painted scene" />
          </div>

          {/* Recent + Today row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginTop: 18 }}>
            <div className="hb-card" style={{ padding: 16, borderRadius: 16, background: 'rgba(255,252,246,.95)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, margin: 0, fontWeight: 500, color: 'var(--ink)' }}>
                  Recently opened
                </h3>
                <span style={{ fontSize: 11, color: 'var(--ink-faint)', display: 'inline-flex', gap: 4, alignItems: 'center' }}>
                  <Icon name="clock" size={11} /> last 7 days
                </span>
              </div>
              {[
                { icon: 'bug',    title: 'Debugging a flaky Postgres deadlock',  meta: 'Backend · 7 min',  tags: ['postgres', 'incident'], when: 'yesterday' },
                { icon: 'layers', title: 'useTransition vs useDeferredValue',    meta: 'React · 4 min',    tags: ['hooks', 'perf'],        when: '2d ago' },
                { icon: 'cmd',    title: 'Shell snippets I reach for weekly',    meta: 'Tooling · 12 entries', tags: ['zsh', 'fzf'],       when: '4d ago' },
              ].map((r, i) => (
                <div key={i} className="hb-lift" style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 6px', borderTop: i === 0 ? 'none' : '1px dashed var(--line)',
                  borderRadius: 8,
                }}>
                  <div style={{ width: 30, height: 30, borderRadius: 10, background: 'rgba(255,143,163,.18)',
                    display: 'grid', placeItems: 'center', color: '#D45A75' }}>
                    <Icon name={r.icon} size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{r.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-faint)', marginTop: 2,
                      display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{r.meta}</span>
                      <span style={{ color: 'var(--ink-ghost)' }}>·</span>
                      <span style={{ display: 'inline-flex', gap: 4 }}>
                        {r.tags.map(t => <span key={t} style={{ color: '#447A2A' }}>#{t}</span>)}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>{r.when}</span>
                </div>
              ))}
            </div>

            {/* Today panel */}
            <div className="hb-card" style={{
              padding: 16, borderRadius: 16,
              background: 'linear-gradient(160deg, #FFE9F0, #FFD3DE)',
              position: 'relative', overflow: 'hidden',
              border: '1px solid rgba(212,90,117,.15)',
            }}>
              {/* Small flower decoration */}
              <div style={{ position: 'absolute', right: 10, bottom: 8, opacity: .9 }}>
                <BellFlower size={42} hue="#FF8FA3" />
              </div>
              <div style={{ position: 'absolute', right: 36, bottom: 10, opacity: .85 }}>
                <Daisy size={20} />
              </div>

              <div style={{
                fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a1f33', opacity: .8,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Icon name="sun" size={11} /> today · 立夏
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500,
                color: '#7a1f33', marginTop: 4 }}>
                A small thing to tend
              </div>
              <div style={{ marginTop: 8, fontSize: 12.5, color: '#5a2934', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                Your draft on <em>migration locks</em> is
                <span style={{ fontWeight: 700 }}> 2 steps </span> from finished.
              </div>
              <div className="hb-margin-note" style={{ marginTop: 8, color: '#7a1f33' }}>
                ↘ open and play
              </div>
              <button className="hb-btn hb-btn--primary" style={{ marginTop: 8, position: 'relative', zIndex: 1 }}>
                <Icon name="leaf" size={13} /> Open draft
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
/* ─────────────────────────── DESKTOP · ARTICLE ─────────────────────────── */
const DesktopArticle = () => {
  const [progress, setProgress] = useState_(35);
  const [openStep, setOpenStep] = useState_(2);
  return (
    <div className="hanami-surface" style={{ display: 'flex' }}>
      <Sidebar tree={TREE} activeId="dbg-prod" onSelect={() => {}} />

      <main style={{ flex: 1, minWidth: 0, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Hero meadow scene at the very top of the main area */}
        <div className="hb-hero-meadow" style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 220,
          zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
          background: 'linear-gradient(180deg, #6FD6E0 0%, #95E2EA 70%, transparent 100%)',
        }}>
          {/* Sun */}
          <div style={{ position: 'absolute', right: 80, top: 30 }}>
            <Sun size={70} opacity={0.9} />
          </div>
          {/* Drifting clouds */}
          <div className="hb-drift" style={{ position: 'absolute', left: '8%', top: 30 }}>
            <PuffyCloud size={180} opacity={0.95} />
          </div>
          <div className="hb-drift hb-drift--rev" style={{ position: 'absolute', left: '46%', top: 60 }}>
            <PuffyCloud size={120} opacity={0.85} />
          </div>
          {/* Flower field at bottom of hero */}
          <FlowerField height={110} density={1.2} />
        </div>

        {/* Topbar — sits ON the sky */}
        <div style={{
          height: 56, display: 'flex', alignItems: 'center', gap: 12,
          padding: '0 28px',
          background: 'rgba(255,251,244,.4)',
          backdropFilter: 'blur(10px)',
          position: 'relative', zIndex: 5,
        }}>
          <Breadcrumb items={[
            { icon: 'home', label: 'Home' },
            { label: 'Debugging' },
            { label: 'Prod incidents' },
            { label: 'Postgres deadlocks' },
          ]} />
          <div style={{ flex: 1 }} />
          <span className="hb-pill hb-pill--meadow">
            <span className="hb-dot hb-dot--sage" /> 1 of 4 done
          </span>
          <button className="hb-btn hb-btn--ghost" style={{ padding: '6px 9px' }}><Icon name="bookmark" size={13} /></button>
          <button className="hb-btn hb-btn--ghost" style={{ padding: '6px 9px' }}><Icon name="copy" size={13} /></button>
          <Avatar initials="YT" />
        </div>

        {/* Page body */}
        <div style={{
          position: 'relative', zIndex: 2, height: 'calc(100% - 56px)',
          overflow: 'hidden',
          display: 'flex', gap: 0,
        }}>
          {/* Article body */}
          <div style={{ flex: 1, minWidth: 0, padding: '20px 64px 60px 64px', overflow: 'hidden', position: 'relative' }}>

            {/* Hero card — sits on top of the meadow */}
            <div style={{
              position: 'relative', marginTop: 80,
              padding: '34px 38px 28px 38px',
              background: 'rgba(255, 252, 246, 0.96)',
              borderRadius: 22,
              border: '1px solid rgba(63,54,44,.06)',
              boxShadow: '0 8px 32px rgba(60,40,30,.10), 0 2px 6px rgba(60,40,30,.06)',
            }}>
              {/* Floating margin note */}
              <div style={{ position: 'absolute', right: -30, top: -18, zIndex: 2 }}>
                <div className="hb-bobble" style={{
                  background: '#FFE38B', color: '#5a3f0a',
                  padding: '8px 12px', borderRadius: 10,
                  fontFamily: 'var(--font-hand)', fontSize: 17,
                  boxShadow: '0 6px 16px rgba(180,140,30,.25)',
                  transform: 'rotate(4deg)',
                }}>
                  ★ read this one!
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="hb-pill hb-pill--coral">
                  <Icon name="bug" size={11} /> Playbook
                </span>
                <span className="hb-pill hb-pill--sun">
                  <Icon name="flame" size={11} /> Intermediate
                </span>
                <span className="hb-pill hb-pill--sky">
                  <Icon name="clock" size={11} /> 7 min read · 25 min practice
                </span>
                <span className="hb-pill">
                  Last tended <strong style={{ color: 'var(--ink)' }}>3 days ago</strong>
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1.1,
                fontWeight: 500, margin: '14px 0 4px 0', color: 'var(--ink)', letterSpacing: '-0.015em',
                maxWidth: 780,
              }}>
                Untangling a flaky <span className="hb-marker">Postgres deadlock</span>
              </h1>
              <p style={{
                fontSize: 15.5, color: 'var(--ink-soft)', maxWidth: 720, lineHeight: 1.65,
                margin: '8px 0 18px 0',
              }}>
                Three times this month our jobs queue stalled at 2am. Each time the trail led back
                to the same pair of tables holding their breath, waiting for the other to let go.
                Here's the quiet method to untangle them — for good.
              </p>

              {/* Author + actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14,
                paddingTop: 14, borderTop: '1px dashed var(--line)' }}>
                <Avatar initials="YT" hue="#FF8FA3" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 600 }}>Yuki Tanaka</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>
                    Staff engineer · maintains this playbook ·
                    <span className="hb-pulse hb-dot hb-dot--coral"
                      style={{ display: 'inline-block', marginLeft: 6, verticalAlign: 'middle' }} />
                    <span style={{ marginLeft: 4 }}>2 reading right now</span>
                  </div>
                </div>
                <button className="hb-btn hb-btn--ghost"><Icon name="copy" size={13} /> Cite</button>
                <button className="hb-btn hb-btn--primary"><Icon name="leaf" size={13} /> Start practicing</button>
              </div>
            </div>

            {/* "What you'll learn" outcomes panel */}
            <div style={{
              marginTop: 18,
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 22, alignItems: 'start',
              padding: '18px 22px',
              background: 'linear-gradient(160deg, rgba(255,255,255,.85), rgba(196,227,172,.4))',
              border: '1px solid rgba(111,175,84,.25)',
              borderRadius: 16,
              position: 'relative',
            }}>
              <div style={{
                fontFamily: 'var(--font-hand)', fontSize: 22, color: '#447A2A',
                transform: 'rotate(-2deg)', lineHeight: 1.1,
                whiteSpace: 'nowrap',
              }}>
                what you'll<br/>walk away with —
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
              }}>
                {[
                  { i: 'sparkle', t: 'Read pg_locks like a map', s: 'See which transactions are waiting on which.' },
                  { i: 'leaf',    t: 'Pick a canonical lock order', s: 'The one rule that prevents the whole class.' },
                  { i: 'check',   t: 'Catch it before users do', s: 'A regression test + a quiet alert.' },
                ].map((o, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: '#FFE38B', color: '#8a6a18',
                      display: 'grid', placeItems: 'center', flex: '0 0 auto',
                    }}>
                      <Icon name={o.i} size={14} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{o.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2, lineHeight: 1.4 }}>{o.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky progress strip */}
            <div style={{
              marginTop: 18, padding: '12px 18px',
              background: 'rgba(255,255,255,.92)', borderRadius: 14,
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--rose-deep)', whiteSpace: 'nowrap' }}>
                your progress —
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="hb-progress">
                  <div className="hb-progress__fill" style={{ width: progress + '%' }} />
                </div>
              </div>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)' }}>
                {progress}% · step 2 of 4
              </span>
              <button className="hb-btn hb-btn--ghost" style={{ padding: '4px 10px', fontSize: 12 }}
                onClick={() => setProgress(Math.min(100, progress + 25))}>
                ↓ jump to next
              </button>
            </div>

            {/* TL;DR — pinned wisdom */}
            <div style={{ marginTop: 22, position: 'relative' }}>
              <div style={{
                position: 'absolute', left: -78, top: 8,
                width: 60, textAlign: 'right',
              }}>
                <div className="hb-margin-note" style={{ color: '#1d6975' }}>
                  the gist↘
                </div>
              </div>
              <Callout kind="quote" title="TL;DR">
                Order your writes the same way everywhere. Add{' '}
                <code style={{ background: 'rgba(255,255,255,.6)', padding: '1px 6px', borderRadius: 4,
                  fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  SELECT … FOR UPDATE
                </code>{' '}
                with deterministic sorting, and let migrations take an{' '}
                <code style={{ background: 'rgba(255,255,255,.6)', padding: '1px 6px', borderRadius: 4,
                  fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  ACCESS EXCLUSIVE
                </code>{' '}
                lock for less than a heartbeat.
              </Callout>
            </div>

            {/* Steps — proper learning steps with header + key takeaway */}
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500,
              color: 'var(--ink)', marginTop: 28, marginBottom: 14,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <BellFlower size={22} hue="#FF8FA3" />
              The four steps
              <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 400, fontFamily: 'var(--font-body)' }}>
                · click any to expand
              </span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <LearningStep
                n={1} title="Reproduce it on a quiet branch"
                summary="Done · committed in #4821" kind="done"
                meta={{ time: '5 min', diff: 'easy' }}
                takeaway="The repro is two psql sessions touching parent and child rows in opposite orders."
                open={openStep === 1} onToggle={() => setOpenStep(openStep === 1 ? null : 1)}
              >
                <p style={{ margin: '0 0 12px 0', color: 'var(--ink-soft)', fontSize: 13.5, lineHeight: 1.65 }}>
                  The deadlock only shows under contention, so we build the smallest
                  two-transaction reproduction we can.
                </p>
                <CodeBlock lang="sql · session A" code={
                  `<span class="c">-- session A</span>\n` +
                  `<span class="k">BEGIN</span>;\n` +
                  `<span class="k">UPDATE</span> orders   <span class="k">SET</span> total = total + <span class="n">1</span> <span class="k">WHERE</span> id = <span class="n">7</span>;\n` +
                  `<span class="k">UPDATE</span> invoices <span class="k">SET</span> sent  = <span class="k">true</span>      <span class="k">WHERE</span> order_id = <span class="n">7</span>;\n` +
                  `<span class="k">COMMIT</span>;`
                } />
              </LearningStep>

              <LearningStep
                n={2} title="Inspect pg_locks while it stalls"
                summary="The two tables holding each other's hand"
                meta={{ time: '8 min', diff: 'medium' }}
                takeaway="pg_blocking_pids() + pg_stat_activity tells you who is waiting on whom — in one query."
                open={openStep === 2} onToggle={() => setOpenStep(openStep === 2 ? null : 2)}
              >
                <p style={{ margin: '0 0 12px 0', color: 'var(--ink-soft)', fontSize: 13.5, lineHeight: 1.65 }}>
                  While the reproduction hangs, this query tells you who is waiting on whom. Save it
                  to your snippets — it's the <span className="hb-marker" style={{ fontWeight: 600 }}>single most useful query</span> in
                  your debugging kit.
                </p>
                <CodeBlock lang="sql · diagnosis" code={
                  `<span class="k">SELECT</span> a.pid, a.query, b.pid <span class="k">AS</span> blocked_by\n` +
                  `<span class="k">FROM</span>   pg_stat_activity a\n` +
                  `<span class="k">JOIN</span>   pg_locks l <span class="k">ON</span> l.pid = a.pid\n` +
                  `<span class="k">JOIN</span>   pg_stat_activity b\n` +
                  `       <span class="k">ON</span> b.pid = <span class="k">ANY</span>(pg_blocking_pids(a.pid));`
                } />
                <div style={{ marginTop: 14 }}>
                  <Callout kind="tip">
                    Run this from a <strong>read-replica</strong> when you can — the primary is busy enough.
                  </Callout>
                </div>
                {/* Your turn prompt */}
                <div style={{
                  marginTop: 14, padding: '14px 16px',
                  background: 'linear-gradient(160deg, rgba(255,227,139,.25), rgba(255,201,58,.15))',
                  border: '1.5px dashed rgba(229,169,60,.5)',
                  borderRadius: 14,
                  display: 'flex', gap: 14, alignItems: 'center',
                }}>
                  <div style={{ flex: '0 0 auto' }}>
                    <Sparkle size={22} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-hand)', fontSize: 19, color: '#8a6a18',
                      transform: 'rotate(-1deg)', display: 'inline-block', lineHeight: 1,
                    }}>your turn ·</div>
                    <div style={{ fontSize: 13.5, color: '#5a4a18', marginTop: 4, lineHeight: 1.5 }}>
                      Run this against your dev DB. Can you spot a blocked PID right now?
                    </div>
                  </div>
                  <button className="hb-btn" style={{ background: '#FFE38B', borderColor: 'transparent', color: '#5a4a18' }}>
                    <Icon name="check" size={13} /> mark tried
                  </button>
                </div>
              </LearningStep>

              <LearningStep
                n={3} title="Pick a canonical lock order"
                summary="The shape of the fix"
                meta={{ time: '6 min', diff: 'medium' }}
                takeaway="Sort batches by primary key before UPDATE — alphabetical by table is a fine convention."
                open={openStep === 3} onToggle={() => setOpenStep(openStep === 3 ? null : 3)}
              >
                <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 13.5, lineHeight: 1.65 }}>
                  Decide, once, the order your code touches related rows.
                </p>
              </LearningStep>

              <LearningStep
                n={4} title="Add a regression test and a quiet alert"
                summary="So you find out before users do"
                meta={{ time: '6 min', diff: 'easy' }}
                takeaway="A two-session test + a Grafana alert on pg_stat_database.deadlocks closes the loop."
                open={openStep === 4} onToggle={() => setOpenStep(openStep === 4 ? null : 4)}
              />
            </div>

            {/* Closing — practice CTA */}
            <div style={{
              marginTop: 28, padding: '22px 24px',
              background: 'linear-gradient(160deg, rgba(95,206,219,.18), rgba(255,143,163,.18))',
              border: '1.5px solid rgba(95,206,219,.3)',
              borderRadius: 18,
              display: 'flex', alignItems: 'center', gap: 18,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', right: -10, bottom: -20, opacity: .5 }}>
                <PuffyCloud size={180} opacity={0.6} />
              </div>
              <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-hand)', fontSize: 22, color: '#1d6975',
                  transform: 'rotate(-1deg)', display: 'inline-block' }}>
                  · ready to try? ·
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)',
                  fontWeight: 500, marginTop: 4 }}>
                  Practice this on a real database in 10 minutes
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4 }}>
                  We'll spin up a sandbox Postgres and a pair of stalling queries — your job is to find them.
                </div>
              </div>
              <button className="hb-btn hb-btn--primary" style={{ position: 'relative', zIndex: 1 }}>
                <Icon name="arrow" size={13} /> Open sandbox
              </button>
            </div>
          </div>

          {/* On this page (TOC) — sticky-ish right rail */}
          <aside style={{
            width: 240, flex: '0 0 auto',
            borderLeft: '1px solid var(--line)',
            padding: '24px 22px',
            background: 'rgba(255,251,244,.55)',
            backdropFilter: 'blur(6px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
              color: 'var(--ink-faint)', marginBottom: 12,
            }}>On this page</div>
            {[
              { t: 'Reproduce it', a: false, done: true },
              { t: 'Inspect pg_locks', a: true },
              { t: 'Pick a lock order', a: false },
              { t: 'Regression test', a: false },
              { t: 'Open sandbox →', a: false, cta: true },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px',
                color: s.a ? 'var(--ink)' : s.cta ? 'var(--rose-deep)' : 'var(--ink-faint)',
                fontWeight: s.a ? 600 : s.cta ? 600 : 500,
                fontSize: 12.5,
                borderLeft: s.a ? '2px solid var(--rose-deep)' : '2px solid transparent',
                paddingLeft: 10, marginLeft: -10,
                cursor: 'pointer',
              }}>
                {!s.cta ? (
                  <span className={'hb-dot hb-dot--' + (s.done ? 'sage' : (s.a ? 'coral' : 'mute'))} />
                ) : (
                  <Icon name="arrow" size={12} />
                )}
                {s.t}
              </div>
            ))}

            <div style={{
              marginTop: 22, padding: 14, borderRadius: 14,
              background: 'rgba(255,255,255,.7)', border: '1px solid var(--line)',
            }}>
              <div style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
                color: 'var(--ink-faint)' }}>Up next in this path</div>
              <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>
                Migration locks — and how to take them fast
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-faint)', marginTop: 4 }}>
                6 min · intermediate
              </div>
              <button className="hb-btn hb-btn--ghost" style={{ marginTop: 10, fontSize: 11.5, padding: '5px 10px' }}>
                <Icon name="arrow" size={11} /> continue path
              </button>
            </div>

            {/* Bottom margin doodle */}
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, textAlign: 'center' }}>
              <div className="hb-divider">·</div>
              <div className="hb-margin-note" style={{ marginTop: 6, fontSize: 14 }}>
                tended 4× · ♡ saved by 12
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

/* LearningStep — richer step with time/difficulty, key takeaway, open animation */
const LearningStep = ({ n, title, summary, open, onToggle, children, kind = 'normal', meta, takeaway }) => {
  const isDone = kind === 'done';
  return (
    <div className="hb-card hb-lift" style={{
      padding: 0, borderRadius: 18, overflow: 'hidden',
      border: '1px solid ' + (open ? 'rgba(255,143,163,.45)' : 'var(--line)'),
      background: open ? 'var(--paper)' : 'rgba(255,251,244,.7)',
      boxShadow: open ? '0 8px 28px rgba(212,90,117,.12)' : 'var(--shadow-sm)',
    }}>
      <div
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '18px 22px', cursor: 'pointer',
        }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: isDone ? 'linear-gradient(160deg, #B8E098, #8FCB6F)'
            : open ? 'linear-gradient(160deg, #FFC8D2, #FF8FA3)'
            : 'linear-gradient(160deg, #FADFC9, #F5D6D2)',
          color: isDone ? '#1f4818' : '#7a1f33',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600,
          flex: '0 0 auto',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.4), 0 3px 8px rgba(212,90,117,.2)',
        }}>
          {isDone ? <Icon name="check" size={16} strokeWidth={2.6} /> : n}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)', fontWeight: 500 }}>
              {title}
            </div>
            {meta && (
              <>
                <span className="hb-pill" style={{ fontSize: 10, padding: '3px 8px' }}>
                  <Icon name="clock" size={10} /> {meta.time}
                </span>
                <span className="hb-pill" style={{ fontSize: 10, padding: '3px 8px',
                  background: meta.diff === 'easy' ? 'rgba(143,203,111,.2)'
                    : meta.diff === 'medium' ? 'rgba(255,227,139,.45)'
                    : 'rgba(255,143,163,.2)',
                  color: meta.diff === 'easy' ? '#355a23'
                    : meta.diff === 'medium' ? '#8a6a18'
                    : '#B0445A',
                }}>
                  {meta.diff}
                </span>
              </>
            )}
          </div>
          {summary && (
            <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginTop: 4 }}>
              {summary}
            </div>
          )}
        </div>
        <span style={{
          color: 'var(--ink-faint)',
          transform: open ? 'rotate(90deg)' : 'rotate(0)',
          transition: 'transform .25s',
        }}>
          <Icon name="chevron" size={14} />
        </span>
      </div>
      {open && children && (
        <div className="hb-step-in" style={{
          padding: '0 26px 22px 76px',
          borderTop: '1px dashed var(--line)',
          paddingTop: 16,
        }}>
          {children}
          {takeaway && (
            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: 'linear-gradient(160deg, rgba(255,143,163,.12), rgba(255,143,163,.05))',
              borderLeft: '3px solid #FF8FA3',
              borderRadius: '0 12px 12px 0',
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{
                fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--rose-deep)',
                flex: '0 0 auto', transform: 'rotate(-2deg)', whiteSpace: 'nowrap',
                paddingTop: 1,
              }}>
                key takeaway —
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                {takeaway}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Inline tag row (helper)
const TagRowInline = ({ tags }) => (
  <span style={{ display: 'inline-flex', gap: 6 }}>
    {tags.map(t => <span key={t} style={{ color: 'var(--sage-deep)' }}>#{t}</span>)}
  </span>
);

/* ─────────────────────────── MOBILE · DASHBOARD ─────────────────────────── */
const MobileDashboard = () => {
  return (
    <div className="hb-phone">
      <div className="hb-phone__notch" />
      <div className="hb-phone__screen">
        <div className="hanami-surface" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Sky band */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 290,
            background: 'linear-gradient(180deg, #5FCEDB 0%, #87DDEA 60%, transparent 100%)',
            zIndex: 0, pointerEvents: 'none',
          }} />
          {/* Sun */}
          <div style={{ position: 'absolute', right: 24, top: 56, zIndex: 1 }}>
            <Sun size={50} opacity={0.95} />
          </div>
          {/* Drifting cloud */}
          <div className="hb-drift" style={{ position: 'absolute', left: '10%', top: 80, zIndex: 1 }}>
            <PuffyCloud size={120} opacity={0.9} />
          </div>
          {/* Flower field bottom */}
          <FlowerField height={130} density={1.1} />

          {/* Status bar */}
          <div style={{ height: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '0 22px 6px 22px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#1d3a52',
            position: 'relative', zIndex: 5 }}>
            <span>9:41</span>
            <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
              <span style={{ width: 16, height: 10, border: '1px solid currentColor', borderRadius: 2, position: 'relative' }}>
                <span style={{ position: 'absolute', inset: 1, right: '30%', background: 'currentColor', borderRadius: 1 }} />
              </span>
            </span>
          </div>

          {/* Header */}
          <div style={{ padding: '6px 22px 10px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'relative', zIndex: 5 }}>
            <BrandMark size={24} />
            <Avatar initials="YT" />
          </div>

          {/* Hero greeting */}
          <div style={{ padding: '6px 22px 14px 22px', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 19, color: '#D45A75', marginBottom: 2 }}>
              おかえり, Yuki ·
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: 1.12,
              margin: 0, fontWeight: 500, color: '#1d3a52', textShadow: '0 1px 0 rgba(255,255,255,.4)' }}>
              A bright field<br />of <span className="hb-marker">ideas</span>.
            </h1>
            <p style={{ marginTop: 6, fontSize: 12.5, color: '#2d4a5c', lineHeight: 1.5 }}>
              <strong>3 drafts</strong> · <strong style={{ color: '#D45A75' }}>5 new</strong> from the team
            </p>
          </div>

          {/* Continue learning */}
          <div style={{ padding: '0 18px 12px 18px', position: 'relative', zIndex: 3 }}>
            <div className="hb-card" style={{
              padding: 12, borderRadius: 14,
              background: 'rgba(255,252,246,.95)',
              border: '1px solid rgba(255,143,163,.25)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(160deg, #FFC8D2, #FF8FA3)',
                display: 'grid', placeItems: 'center', color: '#7a1f33',
                flex: '0 0 auto',
              }}>
                <Icon name="bug" size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
                  continue —
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Postgres deadlock
                </div>
                <div className="hb-progress" style={{ height: 4, marginTop: 4 }}>
                  <div className="hb-progress__fill" style={{ width: '35%' }} />
                </div>
              </div>
              <button className="hb-btn hb-btn--primary" style={{ padding: '6px 10px', fontSize: 11 }}>
                <Icon name="arrow" size={11} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div style={{ padding: '0 22px 12px 22px', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px',
              background: 'rgba(255,252,246,.95)',
              border: '1px solid var(--line-strong)',
              borderRadius: 14,
              boxShadow: 'var(--shadow-sm)',
            }}>
              <Icon name="search" size={14} color="var(--ink-faint)" />
              <span style={{ fontSize: 13, color: 'var(--ink-faint)' }}>Search 184 entries…</span>
            </div>
          </div>

          {/* Chips */}
          <div style={{ padding: '0 22px 12px 22px', display: 'flex', gap: 6, overflow: 'hidden', position: 'relative', zIndex: 2 }}>
            {['All', 'Pinned', 'Drafts', 'Recent'].map((t, i) => (
              <span key={t} className="hb-chip" style={{
                background: i === 0 ? 'rgba(255,143,163,.3)' : 'rgba(255,255,255,.75)',
                color: i === 0 ? '#7a1f33' : 'var(--ink-soft)',
                fontWeight: i === 0 ? 600 : 500,
                borderColor: i === 0 ? 'rgba(212,90,117,.3)' : 'var(--line)',
                flex: '0 0 auto',
              }}>{t}</span>
            ))}
          </div>

          {/* Hub cards stacked */}
          <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 2 }}>
            <HubCardMobile accent="rose"  icon="layers" title="React patterns"   blurb="Hooks, suspense, state machines." count="34" kanji="花" fresh />
            <HubCardMobile accent="sky"   icon="db"     title="Backend recipes"  blurb="Postgres tricks, queues."          count="38" kanji="水" />
            <HubCardMobile accent="cream" icon="cmd"    title="Tooling & shell"  blurb="Tiny snippets, big time saved."    count="57" kanji="道" />
            <HubCardMobile accent="sage"  icon="bug"    title="Debugging"        blurb="When prod burns, calm checklists."  count="24" kanji="雨" fresh />
          </div>

          <div style={{ height: 100 }} />

          {/* Bottom nav */}
          <div style={{
            marginTop: 'auto', height: 76, paddingBottom: 18,
            display: 'flex', justifyContent: 'space-around', alignItems: 'center',
            background: 'rgba(255,251,244,.92)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--line)',
            position: 'relative', zIndex: 4,
          }}>
            {[
              { i: 'home', l: 'Home', a: true },
              { i: 'search', l: 'Search' },
              { i: 'plus', l: 'New', big: true },
              { i: 'bookmark', l: 'Saved' },
              { i: 'book', l: 'Notes' },
            ].map((t, i) => t.big ? (
              <div key={i} style={{
                width: 50, height: 50, borderRadius: '50%',
                background: 'linear-gradient(160deg, #FFC8D2, #FF8FA3)',
                display: 'grid', placeItems: 'center', color: '#7a1f33',
                boxShadow: '0 6px 18px rgba(212,90,117,.45)',
              }}><Icon name="plus" size={18} strokeWidth={2.2} /></div>
            ) : (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                color: t.a ? '#D45A75' : 'var(--ink-faint)' }}>
                <Icon name={t.i} size={18} />
                <span style={{ fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600 }}>{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HubCardMobile = ({ accent, icon, title, blurb, count, kanji, fresh }) => {
  const a = {
    rose:  { bg: 'linear-gradient(120deg, #FFE9F0, #FFC8D2)', ink: '#7a1f33' },
    peach: { bg: 'linear-gradient(120deg, #FFE8D2, #FADFC9)', ink: '#6a4628' },
    sage:  { bg: 'linear-gradient(120deg, #DDF1CC, #B8E098)', ink: '#355a23' },
    lav:   { bg: 'linear-gradient(120deg, #ECE5F5, #E2DCEB)', ink: '#48405a' },
    pond:  { bg: 'linear-gradient(120deg, #DCEDD0, #B4C99A)', ink: '#2e4a2a' },
    sky:   { bg: 'linear-gradient(120deg, #DCF0F4, #95E2EA)', ink: '#1d6975' },
    cream: { bg: 'linear-gradient(120deg, #FFF7EA, #FFE38B)', ink: '#5a4a32' },
    water: { bg: 'linear-gradient(120deg, #D6E9E7, #9FCFCB)', ink: '#1e4847' },
    wood:  { bg: 'linear-gradient(120deg, #EDDBC2, #D4B58A)', ink: '#4a3520' },
  }[accent];
  return (
    <div className="hb-lift" style={{
      position: 'relative', padding: 14, borderRadius: 16,
      background: a.bg, overflow: 'hidden',
      border: '1px solid rgba(63,54,44,.06)',
      display: 'flex', gap: 12, alignItems: 'center',
      boxShadow: '0 2px 8px rgba(120,90,60,.08)',
    }}>
      {kanji && (
        <div style={{
          position: 'absolute', right: -6, bottom: -22,
          fontFamily: 'var(--font-display)', fontSize: 90, lineHeight: 1,
          color: a.ink, opacity: .1, fontWeight: 600,
        }}>{kanji}</div>
      )}
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: 'rgba(255,255,255,.7)',
        display: 'grid', placeItems: 'center', color: a.ink,
        flex: '0 0 auto',
      }}>
        <Icon name={icon} size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: a.ink, fontWeight: 500 }}>{title}</div>
          {fresh && <span className="hb-bobble" style={{ fontFamily: 'var(--font-hand)', fontSize: 13, color: '#D45A75' }}>new!</span>}
        </div>
        <div style={{ fontSize: 12, color: a.ink, opacity: .72, marginTop: 2 }}>{blurb}</div>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: a.ink, opacity: .6, marginTop: 4 }}>
          {count} entries
        </div>
      </div>
      <Icon name="arrow" size={14} color={a.ink} />
    </div>
  );
};

/* ─────────────────────────── MOBILE · ARTICLE ─────────────────────────── */
const MobileArticle = () => {
  return (
    <div className="hb-phone">
      <div className="hb-phone__notch" />
      <div className="hb-phone__screen">
        <div className="hanami-surface" style={{ display: 'flex', flexDirection: 'column' }}>
          <PetalScatter count={8} seed={5} />

          {/* Status bar */}
          <div style={{ height: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '0 22px 6px 22px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)' }}>
            <span>9:41</span>
            <span style={{ width: 16, height: 10, border: '1px solid currentColor', borderRadius: 2 }} />
          </div>

          {/* Header */}
          <div style={{ padding: '6px 18px 10px 18px', display: 'flex', alignItems: 'center', gap: 12, zIndex: 2, position: 'relative' }}>
            <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 10px', borderRadius: 10 }}>
              <Icon name="chevron" size={14} strokeWidth={2.2} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                Debugging · Prod
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Flaky Postgres deadlocks
              </div>
            </div>
            <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 10px', borderRadius: 10 }}>
              <Icon name="bookmark" size={14} />
            </button>
            <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 10px', borderRadius: 10 }}>
              <Icon name="dots" size={14} />
            </button>
          </div>

          {/* Sakura branch */}
          <div className="deco deco--branch" style={{ position: 'absolute', top: 60, right: -50, width: 220, height: 130, zIndex: 1, opacity: .8 }}>
            <SakuraBranch />
          </div>

          {/* Body scroll */}
          <div style={{ padding: '6px 22px 110px 22px', position: 'relative', zIndex: 2, overflow: 'hidden', flex: 1 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              <span className="hb-chip" style={{ background: 'rgba(232,180,176,.4)', color: '#6b3f37', fontWeight: 600 }}>
                <Icon name="bug" size={10} /> Playbook
              </span>
              <span className="hb-chip"><Icon name="clock" size={10} /> 7 min</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.18,
              fontWeight: 500, margin: '4px 0 8px 0', color: 'var(--ink)' }}>
              Untangling a flaky <span className="hb-underline">Postgres deadlock</span>
            </h1>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0 }}>
              Three times this month our jobs queue stalled at 2am. Each time the trail led back
              to the same pair of tables…
            </p>

            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar initials="YT" hue="#F2C2A0" />
              <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>
                <strong style={{ color: 'var(--ink)' }}>Yuki Tanaka</strong><br/>
                <span style={{ color: 'var(--sage-deep)' }}>#postgres #incident</span>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <Callout kind="quote" title="TL;DR">
                Order writes the same way everywhere; <code style={{ background: 'rgba(255,255,255,.5)', padding: '1px 4px', borderRadius: 4 }}>FOR UPDATE</code> with deterministic sort.
              </Callout>
            </div>

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Step n={1} title="Reproduce on a quiet branch" summary="Done · #4821" kind="done" open={false} />
              <Step n={2} title="Inspect pg_locks while it stalls" summary="Who waits on whom" open={true}>
                <p style={{ margin: '0 0 10px 0', fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                  Save this one — it's the single most useful query I know.
                </p>
                <CodeBlock lang="sql" code={
                  `<span class="k">SELECT</span> a.pid, a.query,\n` +
                  `       b.pid <span class="k">AS</span> blocked_by\n` +
                  `<span class="k">FROM</span>   pg_stat_activity a\n` +
                  `<span class="k">JOIN</span>   pg_locks l <span class="k">ON</span> ...;`
                } />
              </Step>
              <Step n={3} title="Pick a canonical lock order" summary="The shape of the fix" open={false} />
              <Step n={4} title="Regression test + alert" open={false} />
            </div>
          </div>

          {/* Floating action bar */}
          <div style={{
            position: 'absolute', left: 16, right: 16, bottom: 24,
            display: 'flex', gap: 10, alignItems: 'center',
            background: 'rgba(255,251,244,.92)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--line-strong)',
            borderRadius: 18,
            padding: 8,
            boxShadow: 'var(--shadow-md)',
            zIndex: 5,
          }}>
            <button className="hb-btn hb-btn--ghost" style={{ flex: 1, justifyContent: 'center' }}>
              <Icon name="check" size={13} /> Mark tended
            </button>
            <button className="hb-btn hb-btn--primary" style={{ flex: 1, justifyContent: 'center' }}>
              <Icon name="plus" size={13} /> Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { DesktopDashboard, DesktopArticle, MobileDashboard, MobileArticle });
