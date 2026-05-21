// Extra content screens: Browse (hub detail) + Composer (editor + preview)
// Reuses Sidebar, Breadcrumb, Icon, Avatar, Callout, CodeBlock, etc.

const { useState: _useS } = React;

/* ─────────────────────────── Browse · entry data ─────────────────────────── */
const ENTRIES = [
  { id: 1, title: 'useTransition vs useDeferredValue', summary: 'When to spell out the deferral vs let React decide.',
    tags: ['hooks', 'perf', 'concurrent'], updated: '2d ago', read: '4 min', pinned: true, status: 'tended',
    hue: 'rose', kanji: '楓' },
  { id: 2, title: 'A state machine for tri-state buttons', summary: 'idle → loading → success/err — without the bugs.',
    tags: ['state-machine', 'forms'], updated: '4d ago', read: '6 min', status: 'tended', hue: 'sage', kanji: '機' },
  { id: 3, title: 'Suspense waterfalls (and how to avoid them)', summary: 'Streaming, parallel fetches, the one tax you pay.',
    tags: ['suspense', 'streaming', 'rsc'], updated: '6d ago', read: '8 min', status: 'draft', hue: 'water', kanji: '川' },
  { id: 4, title: 'A small portal pattern for modals', summary: 'Stack-aware, focus-trapping, escapable. 40 lines.',
    tags: ['portals', 'a11y'], updated: '1w ago', read: '3 min', status: 'tended', hue: 'wood', kanji: '門' },
  { id: 5, title: 'Hydration mismatches in plain language', summary: 'What it actually means, and the four causes you will see.',
    tags: ['ssr', 'hydration'], updated: '2w ago', read: '5 min', pinned: true, status: 'tended', hue: 'pond', kanji: '霧' },
  { id: 6, title: 'A safer useEffect for stale closures', summary: 'A wrapped effect that names its dependencies out loud.',
    tags: ['hooks', 'effects'], updated: '3w ago', read: '4 min', status: 'tended', hue: 'rose', kanji: '輪' },
  { id: 7, title: 'Refs are not state — and that is the point', summary: 'A small mental model for when to reach for which.',
    tags: ['refs', 'fundamentals'], updated: '3w ago', read: '3 min', status: 'tended', hue: 'sage', kanji: '影' },
  { id: 8, title: 'Animating list reorders with FLIP', summary: 'The trick is that browsers already know how.',
    tags: ['animation', 'css'], updated: '1mo ago', read: '7 min', status: 'tended', hue: 'water', kanji: '波' },
  { id: 9, title: 'When to escape the React tree', summary: 'Imperative islands inside a declarative garden.',
    tags: ['ergonomics'], updated: '1mo ago', read: '5 min', status: 'tended', hue: 'pond', kanji: '島' },
];

const accentMap = {
  rose:  { bg: 'linear-gradient(160deg, #FFE9E2, #F5D6D2)', ink: '#6b3f37', dot: '#C4827E' },
  sage:  { bg: 'linear-gradient(160deg, #E8F2DC, #D6E3CB)', ink: '#3e5234', dot: '#7E9968' },
  pond:  { bg: 'linear-gradient(160deg, #DCEDD0, #B4C99A)', ink: '#2e4a2a', dot: '#3A5C2E' },
  water: { bg: 'linear-gradient(160deg, #D6E9E7, #9FCFCB)', ink: '#1e4847', dot: '#3F7C7A' },
  wood:  { bg: 'linear-gradient(160deg, #EDDBC2, #D4B58A)', ink: '#4a3520', dot: '#8a5e30' },
};

const EntryCard = ({ e }) => {
  const a = accentMap[e.hue] || accentMap.sage;
  return (
    <div className="hb-card" style={{
      padding: 14, borderRadius: 16, position: 'relative', overflow: 'hidden',
      background: 'var(--paper)', display: 'flex', flexDirection: 'column', gap: 8,
      minHeight: 168,
    }}>
      {/* Top: painted scene slot */}
      <div style={{
        height: 76, borderRadius: 10, position: 'relative', overflow: 'hidden',
        background: a.bg, border: '1px solid rgba(63,54,44,.05)',
      }}>
        {/* kanji wash */}
        <div style={{
          position: 'absolute', right: -6, bottom: -16,
          fontFamily: 'var(--font-display)', fontSize: 70, lineHeight: 1,
          color: a.ink, opacity: .14, fontWeight: 600,
        }}>{e.kanji}</div>
        {/* tiny petal/leaf accent */}
        <div style={{ position: 'absolute', left: 8, top: 8 }}>
          {e.hue === 'water' || e.hue === 'pond' ? (
            <Koi size={22} hue={a.dot} rotate={-6} opacity={0.85} />
          ) : (
            <Sakura5 size={22} opacity={0.85} />
          )}
        </div>
        {e.pinned && (
          <span style={{
            position: 'absolute', right: 8, top: 8,
            fontFamily: 'var(--font-hand)', fontSize: 13, color: a.ink,
            background: 'rgba(255,255,255,.7)', borderRadius: 8, padding: '2px 7px',
            transform: 'rotate(-3deg)',
          }}>📌 pinned</span>
        )}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 14.5, color: 'var(--ink)',
        fontWeight: 500, lineHeight: 1.25,
      }}>
        {e.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.45 }}>
        {e.summary}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
          {e.tags.slice(0, 2).map(t => (
            <span key={t} style={{
              fontSize: 10, padding: '2px 6px', borderRadius: 5,
              background: 'rgba(126,153,104,.15)', color: 'var(--sage-deep)',
            }}>#{t}</span>
          ))}
        </div>
        <span style={{ fontSize: 10.5, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>
          {e.read}
        </span>
      </div>
    </div>
  );
};

const EntryRow = ({ e }) => {
  const a = accentMap[e.hue] || accentMap.sage;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '44px 1fr 200px 80px 100px',
      gap: 14, alignItems: 'center',
      padding: '12px 14px',
      borderRadius: 12,
      transition: 'background .15s',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, background: a.bg,
        display: 'grid', placeItems: 'center', color: a.ink, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -4, bottom: -10,
          fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1,
          color: a.ink, opacity: .22, fontWeight: 600,
        }}>{e.kanji}</div>
        <Icon name={e.status === 'draft' ? 'file' : 'check'} size={14} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--ink)' }}>{e.title}</span>
          {e.pinned && <Icon name="pin" size={11} color="var(--rose-deep)" />}
          {e.status === 'draft' && (
            <span style={{
              fontSize: 9.5, padding: '2px 6px', borderRadius: 5,
              background: 'rgba(196,130,126,.18)', color: 'var(--rose-deep)',
              letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600,
            }}>draft</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {e.summary}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {e.tags.map(t => (
          <span key={t} style={{ fontSize: 10.5, color: 'var(--sage-deep)' }}>#{t}</span>
        ))}
      </div>
      <span style={{ fontSize: 11.5, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>{e.read}</span>
      <span style={{ fontSize: 11.5, color: 'var(--ink-faint)', textAlign: 'right' }}>{e.updated}</span>
    </div>
  );
};

/* ─────────────────────────── DESKTOP · BROWSE ─────────────────────────── */
const DesktopBrowse = () => {
  const [view, setView] = _useS('grid');
  return (
    <div className="hanami-surface" style={{ display: 'flex' }}>
      <PetalScatter count={12} seed={9} />
      <Sidebar tree={TREE} activeId="react" onSelect={() => {}} />

      <main style={{ flex: 1, minWidth: 0, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Sakura branch corner */}
        <div className="deco deco--branch" style={{ position: 'absolute', top: -15, right: -30, width: 320, height: 200, zIndex: 1, opacity: .8 }}>
          <SakuraBranch />
        </div>
        <div className="deco" style={{ position: 'absolute', left: 30, bottom: 30, zIndex: 1, opacity: .7 }}>
          <FrondTuft count={5} size={90} hue="var(--sage-deep)" />
        </div>

        {/* Topbar */}
        <div style={{
          height: 60, display: 'flex', alignItems: 'center', gap: 16,
          padding: '0 32px',
          borderBottom: '1px solid var(--line)',
          background: 'rgba(255,251,244,.55)',
          backdropFilter: 'blur(10px)',
          position: 'relative', zIndex: 3,
        }}>
          <Breadcrumb items={[
            { icon: 'home', label: 'Home' },
            { label: 'Library' },
            { label: 'React patterns' },
          ]} />
          <div style={{ flex: 1 }} />
          <button className="hb-btn hb-btn--ghost"><Icon name="bookmark" size={13} /> Save view</button>
          <button className="hb-btn"><Icon name="plus" size={13} /> New entry</button>
          <Avatar initials="YT" />
        </div>

        {/* Hub header */}
        <div style={{ padding: '24px 36px 8px 36px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', minWidth: 0 }}>
              <div className="hb-card" style={{
                width: 84, height: 84, borderRadius: 18,
                background: 'linear-gradient(160deg, #DCEDD0, #B4C99A)',
                border: '1px solid rgba(58,92,46,.15)',
                display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden',
                color: '#2e4a2a',
              }}>
                <Icon name="layers" size={32} strokeWidth={1.5} />
                <div style={{
                  position: 'absolute', right: -8, bottom: -16,
                  fontFamily: 'var(--font-display)', fontSize: 80, color: '#2e4a2a', opacity: .12,
                }}>森</div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--sage-deep)',
                  transform: 'rotate(-1deg)', display: 'inline-block' }}>
                  · a quiet grove ·
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1.12,
                  fontWeight: 500, color: 'var(--ink)', margin: '2px 0 4px 0', letterSpacing: '-0.01em',
                }}>
                  React patterns
                </h1>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                  <strong>34</strong> entries &nbsp;·&nbsp; <strong>12</strong> tags &nbsp;·&nbsp;
                  last tended <strong>yesterday</strong>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="hb-btn hb-btn--ghost"><Icon name="bookmark" size={13} /> Subscribe</button>
              <button className="hb-btn hb-btn--ghost"><Icon name="copy" size={13} /> Share</button>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{
          padding: '14px 36px',
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          borderBottom: '1px solid var(--line)',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 12px', background: 'var(--paper)',
            border: '1px solid var(--line-strong)', borderRadius: 10,
            minWidth: 220, boxShadow: 'var(--shadow-sm)',
          }}>
            <Icon name="search" size={13} color="var(--ink-faint)" />
            <span style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>Filter in React patterns…</span>
          </div>
          <span className="hb-chip" style={{ background: 'rgba(126,153,104,.3)', color: '#2e4a2a',
            borderColor: 'rgba(58,92,46,.25)', fontWeight: 600 }}>
            All <span style={{ opacity: .6, marginLeft: 4 }}>34</span>
          </span>
          <span className="hb-chip">Pinned <span style={{ opacity: .6, marginLeft: 4 }}>2</span></span>
          <span className="hb-chip">Drafts <span style={{ opacity: .6, marginLeft: 4 }}>1</span></span>
          <span className="hb-chip">Tended this month <span style={{ opacity: .6, marginLeft: 4 }}>6</span></span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Sort:</span>
          <span className="hb-chip" style={{ background: 'var(--paper)' }}>Recently tended ▾</span>
          <div style={{
            display: 'flex', borderRadius: 8, overflow: 'hidden',
            border: '1px solid var(--line-strong)', background: 'var(--paper)',
          }}>
            {['grid', 'list'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '6px 10px', border: 0, cursor: 'pointer',
                background: view === v ? 'rgba(126,153,104,.25)' : 'transparent',
                color: view === v ? '#2e4a2a' : 'var(--ink-faint)',
                fontSize: 11.5, fontWeight: 600, fontFamily: 'inherit',
                textTransform: 'capitalize',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <Icon name={v === 'grid' ? 'layers' : 'menu'} size={12} /> {v}
              </button>
            ))}
          </div>
        </div>

        {/* Tag cloud bar */}
        <div style={{ padding: '12px 36px 0 36px', display: 'flex', gap: 6, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          {[
            ['hooks', 12], ['perf', 8], ['suspense', 5], ['state-machine', 4], ['forms', 6],
            ['a11y', 7], ['portals', 2], ['effects', 9], ['ssr', 4], ['animation', 3],
          ].map(([t, n]) => (
            <span key={t} style={{
              fontSize: 11.5,
              padding: '4px 9px', borderRadius: 999,
              background: 'rgba(126,153,104,.10)',
              color: 'var(--sage-deep)',
              border: '1px dashed rgba(126,153,104,.25)',
              cursor: 'pointer',
            }}>
              #{t} <span style={{ opacity: .55, fontFamily: 'var(--font-mono)', fontSize: 10 }}>{n}</span>
            </span>
          ))}
        </div>

        {/* Body — grid or list */}
        <div style={{ padding: '18px 36px 36px 36px', position: 'relative', zIndex: 2, overflow: 'hidden', height: 'calc(100% - 240px)' }}>
          {view === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {ENTRIES.slice(0, 8).map(e => <EntryCard key={e.id} e={e} />)}
            </div>
          ) : (
            <div className="hb-card" style={{ padding: 8, borderRadius: 14 }}>
              {/* Column headers */}
              <div style={{
                display: 'grid', gridTemplateColumns: '44px 1fr 200px 80px 100px', gap: 14,
                padding: '8px 14px', fontSize: 10.5, letterSpacing: '.16em',
                textTransform: 'uppercase', color: 'var(--ink-faint)',
                borderBottom: '1px solid var(--line)',
              }}>
                <span /><span>Title</span><span>Tags</span><span>Read</span>
                <span style={{ textAlign: 'right' }}>Tended</span>
              </div>
              {ENTRIES.map(e => <EntryRow key={e.id} e={e} />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

/* ─────────────────────────── DESKTOP · COMPOSER ─────────────────────────── */
const DesktopComposer = () => {
  return (
    <div className="hanami-surface" style={{ display: 'flex' }}>
      <PetalScatter count={8} seed={13} />
      <Sidebar tree={TREE} activeId="dbg-prod" onSelect={() => {}} compact />

      <main style={{ flex: 1, minWidth: 0, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* corner */}
        <div className="deco deco--branch" style={{ position: 'absolute', top: -20, right: -40, width: 260, height: 170, zIndex: 1, opacity: .7 }}>
          <SakuraBranch />
        </div>

        {/* Topbar */}
        <div style={{
          height: 60, display: 'flex', alignItems: 'center', gap: 12,
          padding: '0 28px',
          borderBottom: '1px solid var(--line)',
          background: 'rgba(255,251,244,.55)',
          backdropFilter: 'blur(10px)',
          position: 'relative', zIndex: 3,
        }}>
          <Breadcrumb items={[
            { icon: 'home', label: 'Home' },
            { label: 'Debugging' },
            { label: 'Untitled draft' },
          ]} />
          <span className="hb-chip" style={{
            background: 'rgba(196,130,126,.18)', color: 'var(--rose-deep)',
            borderColor: 'rgba(196,130,126,.3)', fontWeight: 600,
          }}>
            <Icon name="file" size={11} /> Draft · autosaved 12s ago
          </span>
          <div style={{ flex: 1 }} />
          <button className="hb-btn hb-btn--ghost"><Icon name="eye" size={13} /> Preview</button>
          <button className="hb-btn hb-btn--ghost"><Icon name="copy" size={13} /> Share draft</button>
          <button className="hb-btn"><Icon name="check" size={13} /> Plant entry</button>
          <Avatar initials="YT" />
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 'calc(100% - 60px)', position: 'relative', zIndex: 2 }}>
          {/* Editor pane */}
          <div style={{
            padding: '24px 32px',
            borderRight: '1px dashed var(--line-strong)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
              color: 'var(--ink-faint)', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Icon name="file" size={11} /> writing
            </div>

            {/* Title input */}
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--ink)',
              fontWeight: 500, lineHeight: 1.15, position: 'relative',
            }}>
              Untangling a flaky Postgres deadlock<span style={{
                display: 'inline-block', width: 2, height: 28, background: 'var(--rose-deep)',
                marginLeft: 2, verticalAlign: '-4px', animation: 'hb-blink 1s steps(1) infinite',
              }} />
            </div>
            <div style={{ marginTop: 6, fontSize: 12.5, color: 'var(--ink-faint)' }}>
              Subtitle · a short note about what this teaches
            </div>

            {/* Toolbar */}
            <div style={{
              marginTop: 14, display: 'flex', gap: 4, padding: 6, borderRadius: 12,
              background: 'rgba(255,251,244,.85)', border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-sm)', width: 'fit-content',
            }}>
              {[
                { i: 'plus',    l: 'Step' },
                { i: 'leaf',    l: 'Callout' },
                { i: 'cmd',     l: 'Code' },
                { i: 'tag',     l: 'Tag' },
                { i: 'sparkle', l: 'Wisdom' },
              ].map(t => (
                <button key={t.l} className="hb-btn hb-btn--ghost" style={{
                  padding: '5px 9px', fontSize: 12, borderRadius: 8, boxShadow: 'none',
                }}>
                  <Icon name={t.i} size={12} /> {t.l}
                </button>
              ))}
              <div style={{ width: 1, background: 'var(--line)', margin: '2px 4px' }} />
              <button className="hb-btn hb-btn--ghost" style={{ padding: '5px 9px', fontSize: 12, borderRadius: 8, boxShadow: 'none' }}>
                <Icon name="check" size={12} /> Step done
              </button>
            </div>

            {/* "Markdown" source view */}
            <div style={{ marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 12.5,
              lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              <div><span style={{ color: 'var(--rose-deep)' }}>##</span> The shape of the bug</div>
              <div style={{ marginTop: 4 }}>
                Three times this month our jobs queue stalled at <span style={{
                  background: 'rgba(126,153,104,.15)', padding: '0 4px', borderRadius: 3,
                  color: 'var(--sage-deep)',
                }}>2am</span>. Each time the trail led back to the same pair of tables…
              </div>

              <div style={{ marginTop: 14 }}>
                <span style={{ color: 'var(--peach-deep)' }}>:::tip</span>
              </div>
              <div style={{
                marginTop: 4, padding: '10px 14px',
                background: 'linear-gradient(160deg, #E8F2DC, #DCEACE)',
                border: '1px dashed rgba(126,153,104,.35)',
                borderRadius: 10,
                color: '#3e5234', fontFamily: 'var(--font-body)',
              }}>
                Run pg_locks queries from a read-replica when you can.
              </div>
              <div style={{ marginTop: 4 }}>
                <span style={{ color: 'var(--peach-deep)' }}>:::</span>
              </div>

              <div style={{ marginTop: 14 }}>
                <span style={{ color: 'var(--rose-deep)' }}>### Step 1</span> · Reproduce on a quiet branch
              </div>
              <div style={{ marginTop: 4 }}>Open two psql sessions side by side; one updates parent then child, the other goes the other way…</div>

              <div style={{ marginTop: 14 }}>
                <span style={{ color: 'var(--peach-deep)' }}>```sql</span>
              </div>
              <div style={{
                marginTop: 4, padding: '10px 14px',
                background: '#FFF7EC', border: '1px dashed rgba(196,130,126,.35)',
                borderRadius: 8, color: '#5a4a3a',
              }}>
                BEGIN;<br/>UPDATE orders SET total = total + 1 WHERE id = 7;<br/>
                UPDATE invoices SET sent = true WHERE order_id = 7;<br/>COMMIT;
              </div>
              <div style={{ marginTop: 4 }}>
                <span style={{ color: 'var(--peach-deep)' }}>```</span>
              </div>
            </div>
          </div>

          {/* Preview pane */}
          <div style={{ padding: '24px 32px', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
              color: 'var(--ink-faint)', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Icon name="eye" size={11} /> live preview
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1.15,
              fontWeight: 500, margin: '4px 0 6px 0', color: 'var(--ink)',
            }}>
              Untangling a flaky <span className="hb-underline">Postgres deadlock</span>
            </h1>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: 0 }}>
              Three times this month our jobs queue stalled at 2am…
            </p>

            <div style={{ marginTop: 14 }}>
              <Callout kind="tip">
                Run pg_locks queries from a read-replica when you can.
              </Callout>
            </div>

            <div style={{ marginTop: 12 }}>
              <Step n={1} title="Reproduce on a quiet branch" summary="Open two psql sessions">
                <p style={{ margin: '0 0 10px 0', fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                  Open two psql sessions side by side; one updates parent then child,
                  the other goes the other way.
                </p>
                <CodeBlock lang="sql" code={
                  `<span class="k">BEGIN</span>;\n` +
                  `<span class="k">UPDATE</span> orders   <span class="k">SET</span> total = total + <span class="n">1</span> <span class="k">WHERE</span> id = <span class="n">7</span>;\n` +
                  `<span class="k">UPDATE</span> invoices <span class="k">SET</span> sent  = <span class="k">true</span>      <span class="k">WHERE</span> order_id = <span class="n">7</span>;\n` +
                  `<span class="k">COMMIT</span>;`
                } />
              </Step>
            </div>

            {/* Metadata panel */}
            <div className="hb-card" style={{
              marginTop: 18, padding: 14, borderRadius: 14,
              background: 'rgba(255,255,255,.7)',
            }}>
              <div style={{
                fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
                color: 'var(--ink-faint)', marginBottom: 10,
              }}>Entry properties</div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', rowGap: 8, fontSize: 12.5 }}>
                <span style={{ color: 'var(--ink-faint)' }}>Hub</span>
                <span style={{ color: 'var(--ink)' }}>Debugging playbooks → Prod incidents</span>
                <span style={{ color: 'var(--ink-faint)' }}>Tags</span>
                <span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--sage-deep)' }}>#postgres</span>
                  <span style={{ color: 'var(--sage-deep)' }}>#incident</span>
                  <span style={{ color: 'var(--sage-deep)' }}>#sql</span>
                  <span style={{
                    fontSize: 11, padding: '2px 7px', border: '1px dashed var(--line-strong)',
                    color: 'var(--ink-faint)', borderRadius: 999, cursor: 'pointer',
                  }}>+ add tag</span>
                </span>
                <span style={{ color: 'var(--ink-faint)' }}>Season</span>
                <span style={{ color: 'var(--ink)' }}>Summer · 立夏</span>
                <span style={{ color: 'var(--ink-faint)' }}>Visibility</span>
                <span style={{ color: 'var(--ink)' }}>Team — engineering</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cursor blink keyframes */}
        <style>{`@keyframes hb-blink { 50% { opacity: 0; } }`}</style>
      </main>
    </div>
  );
};

/* ─────────────────────────── MOBILE · BROWSE ─────────────────────────── */
const MobileBrowse = () => {
  return (
    <div className="hb-phone">
      <div className="hb-phone__notch" />
      <div className="hb-phone__screen">
        <div className="hanami-surface" style={{ display: 'flex', flexDirection: 'column' }}>
          <PetalScatter count={8} seed={17} />

          <div style={{ height: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '0 22px 6px 22px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)' }}>
            <span>9:41</span>
            <span style={{ width: 16, height: 10, border: '1px solid currentColor', borderRadius: 2 }} />
          </div>

          {/* Header */}
          <div style={{ padding: '4px 18px 10px 18px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 2, position: 'relative' }}>
            <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 9px', borderRadius: 10 }}>
              <Icon name="chevron" size={14} strokeWidth={2.2} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                Library · 34 entries
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>
                React patterns
              </div>
            </div>
            <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 9px', borderRadius: 10 }}>
              <Icon name="search" size={14} />
            </button>
            <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 9px', borderRadius: 10 }}>
              <Icon name="dots" size={14} />
            </button>
          </div>

          {/* Sakura branch */}
          <div className="deco deco--branch" style={{ position: 'absolute', top: 40, right: -50, width: 200, height: 120, zIndex: 1, opacity: .75 }}>
            <SakuraBranch />
          </div>

          {/* Filter chips */}
          <div style={{ padding: '0 18px 10px 18px', display: 'flex', gap: 6, overflow: 'hidden', position: 'relative', zIndex: 2 }}>
            {[['All', 34, true], ['Pinned', 2], ['Drafts', 1], ['Recent', 6]].map(([t, n, a]) => (
              <span key={t} className="hb-chip" style={{
                background: a ? 'rgba(126,153,104,.3)' : 'rgba(255,255,255,.6)',
                color: a ? '#2e4a2a' : 'var(--ink-soft)',
                fontWeight: a ? 600 : 500,
                borderColor: a ? 'rgba(58,92,46,.25)' : 'var(--line)',
                flex: '0 0 auto',
              }}>{t} <span style={{ opacity: .6, marginLeft: 3 }}>{n}</span></span>
            ))}
          </div>

          {/* Tag pills */}
          <div style={{ padding: '0 18px 14px 18px', display: 'flex', gap: 5, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
            {['#hooks', '#perf', '#suspense', '#a11y', '#effects'].map(t => (
              <span key={t} style={{
                fontSize: 10.5, padding: '3px 8px', borderRadius: 999,
                background: 'rgba(126,153,104,.10)', color: 'var(--sage-deep)',
                border: '1px dashed rgba(126,153,104,.25)',
              }}>{t}</span>
            ))}
          </div>

          {/* List */}
          <div style={{ padding: '0 14px 90px 14px', display: 'flex', flexDirection: 'column', gap: 10,
            overflow: 'hidden', position: 'relative', zIndex: 2, flex: 1 }}>
            {ENTRIES.slice(0, 6).map(e => {
              const a = accentMap[e.hue] || accentMap.sage;
              return (
                <div key={e.id} className="hb-card" style={{
                  padding: 12, borderRadius: 14, display: 'flex', gap: 12, alignItems: 'center',
                }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, background: a.bg,
                    display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden',
                    color: a.ink, flex: '0 0 auto',
                  }}>
                    <Icon name={e.status === 'draft' ? 'file' : 'check'} size={16} />
                    <div style={{
                      position: 'absolute', right: -4, bottom: -8,
                      fontFamily: 'var(--font-display)', fontSize: 36, color: a.ink, opacity: .15,
                    }}>{e.kanji}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.title}</span>
                      {e.pinned && <Icon name="pin" size={11} color="var(--rose-deep)" />}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 2,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {e.summary}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 10, color: 'var(--ink-faint)' }}>
                      <span style={{ color: 'var(--sage-deep)' }}>#{e.tags[0]}</span>
                      <span>·</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{e.read}</span>
                      <span>·</span>
                      <span>{e.updated}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAB */}
          <div style={{
            position: 'absolute', right: 18, bottom: 30, zIndex: 5,
            width: 54, height: 54, borderRadius: '50%',
            background: 'linear-gradient(160deg, #B4C99A, #7E9968)',
            display: 'grid', placeItems: 'center', color: '#1f3318',
            boxShadow: '0 8px 20px rgba(58,92,46,.45)',
          }}>
            <Icon name="plus" size={20} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── MOBILE · COMPOSER ─────────────────────────── */
const MobileComposer = () => {
  return (
    <div className="hb-phone">
      <div className="hb-phone__notch" />
      <div className="hb-phone__screen">
        <div className="hanami-surface" style={{ display: 'flex', flexDirection: 'column' }}>
          <PetalScatter count={6} seed={21} />

          <div style={{ height: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '0 22px 6px 22px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)' }}>
            <span>9:41</span>
            <span style={{ width: 16, height: 10, border: '1px solid currentColor', borderRadius: 2 }} />
          </div>

          {/* Header */}
          <div style={{ padding: '4px 16px 10px 16px', display: 'flex', alignItems: 'center', gap: 8, zIndex: 2, position: 'relative' }}>
            <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 9px', borderRadius: 10 }}>
              <Icon name="chevron" size={14} strokeWidth={2.2} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
              <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                New entry
              </div>
              <div style={{ fontSize: 11, color: 'var(--rose-deep)', fontFamily: 'var(--font-hand)' }}>
                · autosaved 12s ago ·
              </div>
            </div>
            <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 9px', borderRadius: 10, fontSize: 12 }}>
              <Icon name="eye" size={13} />
            </button>
            <button className="hb-btn" style={{ padding: '7px 12px', fontSize: 12 }}>
              <Icon name="check" size={12} /> Plant
            </button>
          </div>

          {/* Sakura branch */}
          <div className="deco deco--branch" style={{ position: 'absolute', top: 50, right: -60, width: 180, height: 110, zIndex: 1, opacity: .65 }}>
            <SakuraBranch />
          </div>

          {/* Hub picker */}
          <div style={{ padding: '0 18px 8px 18px', position: 'relative', zIndex: 2 }}>
            <div className="hb-card" style={{
              padding: '8px 12px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(160deg, #DCEDD0, #B4C99A)',
                display: 'grid', placeItems: 'center', color: '#2e4a2a',
              }}>
                <Icon name="bug" size={13} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9.5, color: 'var(--ink-faint)', letterSpacing: '.14em', textTransform: 'uppercase' }}>Hub</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 600,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Debugging → Prod incidents
                </div>
              </div>
              <Icon name="chevron" size={12} color="var(--ink-faint)" />
            </div>
          </div>

          {/* Title */}
          <div style={{ padding: '8px 22px 4px 22px', position: 'relative', zIndex: 2 }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500,
              color: 'var(--ink)', lineHeight: 1.18,
            }}>
              Untangling a flaky Postgres deadlock<span style={{
                display: 'inline-block', width: 2, height: 22, background: 'var(--rose-deep)',
                marginLeft: 2, verticalAlign: '-4px', animation: 'hb-blink 1s steps(1) infinite',
              }} />
            </div>
          </div>

          {/* Tags input */}
          <div style={{ padding: '8px 22px', display: 'flex', gap: 5, flexWrap: 'wrap',
            position: 'relative', zIndex: 2 }}>
            {['#postgres', '#incident', '#sql'].map(t => (
              <span key={t} style={{
                fontSize: 10.5, padding: '3px 8px', borderRadius: 999,
                background: 'rgba(126,153,104,.15)', color: 'var(--sage-deep)',
              }}>{t}</span>
            ))}
            <span style={{
              fontSize: 10.5, padding: '3px 8px', borderRadius: 999,
              border: '1px dashed var(--line-strong)', color: 'var(--ink-faint)',
            }}>+ tag</span>
          </div>

          {/* Body */}
          <div style={{ padding: '8px 22px', flex: 1, overflow: 'hidden', position: 'relative', zIndex: 2,
            fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--ink)', fontWeight: 600 }}>
              The shape of the bug
            </div>
            <p style={{ margin: '6px 0 0 0' }}>
              Three times this month our jobs queue stalled at <span style={{
                background: 'rgba(126,153,104,.15)', padding: '0 4px', borderRadius: 3,
                color: 'var(--sage-deep)', fontFamily: 'var(--font-mono)', fontSize: 11.5,
              }}>2am</span>. Each time the trail led back to the same pair of tables.
            </p>

            <div style={{ marginTop: 12 }}>
              <Callout kind="tip">
                Run pg_locks queries from a read-replica when you can.
              </Callout>
            </div>

            <div style={{ marginTop: 14, fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--ink)', fontWeight: 600 }}>
              Step 1 · Reproduce on a quiet branch
            </div>
            <p style={{ margin: '6px 0 0 0' }}>
              Open two psql sessions side by side; one updates parent then child…
            </p>
          </div>

          {/* Bottom toolbar */}
          <div style={{
            position: 'absolute', left: 12, right: 12, bottom: 24,
            padding: 8, borderRadius: 18,
            background: 'rgba(255,251,244,.92)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--line-strong)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex', gap: 4, justifyContent: 'space-around',
            zIndex: 5,
          }}>
            {[
              { i: 'plus',    l: 'Step' },
              { i: 'leaf',    l: 'Tip' },
              { i: 'cmd',     l: 'Code' },
              { i: 'sparkle', l: 'Quote' },
              { i: 'tag',     l: 'Tag' },
            ].map(t => (
              <button key={t.l} style={{
                background: 'transparent', border: 0, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '6px 10px', color: 'var(--ink-soft)', fontFamily: 'inherit',
              }}>
                <Icon name={t.i} size={15} />
                <span style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600 }}>{t.l}</span>
              </button>
            ))}
          </div>

          <style>{`@keyframes hb-blink { 50% { opacity: 0; } }`}</style>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { DesktopBrowse, DesktopComposer, MobileBrowse, MobileComposer });
