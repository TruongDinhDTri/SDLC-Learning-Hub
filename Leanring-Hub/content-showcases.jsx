// Two long-form article showcases demonstrating every content block in context.
// Each lives inside the standard Sidebar + topbar + TOC chrome so it reads as a real page.

const { useState: _useS3 } = React;

/* Shared chrome: topbar with breadcrumb + actions + progress */
const ContentChrome = ({ crumbs, progress = 35, children, toc }) => (
  <main style={{ flex: 1, minWidth: 0, height: '100%', position: 'relative', overflow: 'hidden' }}>
    {/* Soft sky background band */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 140,
      background: 'linear-gradient(180deg, #B6E9EE 0%, transparent 100%)',
      zIndex: 0, pointerEvents: 'none', opacity: .7,
    }} />
    {/* Drifting cloud */}
    <div className="hb-drift" style={{ position: 'absolute', left: '55%', top: 20, zIndex: 0, opacity: .6 }}>
      <PuffyCloud size={140} />
    </div>

    {/* Topbar */}
    <div style={{
      height: 56, display: 'flex', alignItems: 'center', gap: 12,
      padding: '0 28px',
      background: 'rgba(255,251,244,.4)',
      backdropFilter: 'blur(10px)',
      position: 'relative', zIndex: 5,
      borderBottom: '1px solid var(--line)',
    }}>
      <Breadcrumb items={crumbs} />
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>
          {progress}%
        </span>
        <div style={{ width: 120 }}>
          <div className="hb-progress" style={{ height: 5 }}>
            <div className="hb-progress__fill" style={{ width: progress + '%' }} />
          </div>
        </div>
      </div>
      <button className="hb-btn hb-btn--ghost" style={{ padding: '6px 9px' }}><Icon name="bookmark" size={13} /></button>
      <button className="hb-btn hb-btn--ghost" style={{ padding: '6px 9px' }}><Icon name="copy" size={13} /></button>
      <Avatar initials="YT" />
    </div>

    <div style={{
      display: 'flex',
      height: 'calc(100% - 56px)',
      position: 'relative', zIndex: 2,
    }}>
      <div style={{
        flex: 1, minWidth: 0, padding: '32px 64px 80px 80px',
        overflow: 'hidden',
        maxWidth: 880,
      }}>
        {children}
      </div>
      <aside style={{
        width: 260, flex: '0 0 auto',
        borderLeft: '1px solid var(--line)',
        padding: '32px 22px',
        background: 'rgba(255,251,244,.55)',
        backdropFilter: 'blur(6px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {toc}
      </aside>
    </div>
  </main>
);

/* TOC rail content */
const TocRail = ({ items, related, footer }) => (
  <>
    <div style={{
      fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
      color: 'var(--ink-faint)', marginBottom: 12,
    }}>On this page</div>
    {items.map((s, i) => (
      <div key={i} style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '7px 4px',
        color: s.a ? 'var(--ink)' : 'var(--ink-faint)',
        fontWeight: s.a ? 600 : 500, fontSize: 12.5,
        borderLeft: s.a ? '2px solid var(--rose-deep)' : '2px solid transparent',
        paddingLeft: 10, marginLeft: -10,
      }}>
        <span className={'hb-dot hb-dot--' + (s.done ? 'sage' : (s.a ? 'coral' : 'mute'))} />
        {s.t}
      </div>
    ))}
    {related && (
      <>
        <div style={{
          marginTop: 22, fontSize: 10.5, letterSpacing: '.16em',
          textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 10,
        }}>Related</div>
        {related.map((l, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px',
            fontSize: 12.5, color: 'var(--ink-soft)',
          }}>
            <Icon name={l.icon} size={12} color="var(--sage-deep)" />
            {l.t}
          </div>
        ))}
      </>
    )}
    {footer}
  </>
);

/* ═════════════════════════════════════════════════════════════════
   SHOWCASE 1 · RICH READING — typography, quotes, lists, callouts
   ═════════════════════════════════════════════════════════════════ */
const ContentShowcaseReading = () => {
  return (
    <div className="hanami-surface" style={{ display: 'flex' }}>
      <Sidebar tree={TREE} activeId="dbg-prod" onSelect={() => {}} compact />
      <ContentChrome
        crumbs={[
          { icon: 'home', label: 'Home' },
          { label: 'Backend' },
          { label: 'Reading the database' },
          { label: 'pg_locks like a map' },
        ]}
        progress={42}
        toc={
          <TocRail
            items={[
              { t: 'A 2am phone call', a: true },
              { t: 'What pg_locks actually shows' },
              { t: 'The query I save forever' },
              { t: 'Pitfalls', done: false },
              { t: 'Take this with you' },
            ]}
            related={[
              { t: 'The Postgres lock zoo', icon: 'book' },
              { t: 'pg snippets', icon: 'cmd' },
              { t: 'Migration locks runbook', icon: 'flame' },
            ]}
            footer={
              <div style={{
                marginTop: 22, padding: 14, borderRadius: 14,
                background: 'rgba(255,255,255,.85)', border: '1px solid var(--line)',
              }}>
                <div className="hb-margin-note" style={{ color: '#1d6975', fontSize: 15 }}>
                  reading this with you →
                </div>
                <div style={{ display: 'flex', gap: -8, marginTop: 8 }}>
                  {['YT', 'MA', 'JR'].map((n, i) => (
                    <div key={i} style={{ marginLeft: i ? -8 : 0 }}>
                      <Avatar initials={n} hue={['#FF8FA3', '#5FCEDB', '#8FCB6F'][i]} />
                    </div>
                  ))}
                  <span style={{
                    width: 30, height: 30, borderRadius: '50%',
                    marginLeft: -8, background: 'rgba(255,255,255,.7)',
                    border: '1px solid var(--line)',
                    display: 'grid', placeItems: 'center',
                    fontSize: 11, color: 'var(--ink-soft)',
                  }}>+5</span>
                </div>
              </div>
            }
          />
        }
      >
        {/* ── Article header ── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span className="hb-pill hb-pill--coral"><Icon name="book" size={11} /> Long read</span>
          <span className="hb-pill hb-pill--sky"><Icon name="clock" size={11} /> 8 min</span>
          <span className="hb-pill hb-pill--meadow">Beginner-friendly</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 52, lineHeight: 1.04,
          fontWeight: 500, color: 'var(--ink)', margin: '4px 0 8px 0',
          letterSpacing: '-0.02em',
        }}>
          Reading <span className="hb-marker">pg_locks</span><br/>
          like a map
        </h1>

        <RcLead>
          Every Postgres deadlock is a tiny conversation between two transactions, each one
          quietly insisting <em>after you</em>. This is how I learned to listen.
        </RcLead>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '12px 0', borderTop: '1px dashed var(--line)',
          borderBottom: '1px dashed var(--line)', margin: '8px 0 24px 0',
        }}>
          <Avatar initials="YT" hue="#FF8FA3" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 600 }}>Yuki Tanaka</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>
              Staff engineer · published <strong>3 days ago</strong> · tended <strong>4×</strong>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <span style={{ color: '#447A2A', fontSize: 12 }}>#postgres</span>
            <span style={{ color: '#447A2A', fontSize: 12 }}>#fundamentals</span>
          </div>
        </div>

        {/* ── Section 1: drop cap intro ── */}
        <RcH2 kanji="一">A 2am phone call</RcH2>

        <DropCap first="T">
          he page came in at 2:14am. Three customers couldn't check out, the queue was filling,
          and the symptom was familiar but not quite: every retry succeeded after a few seconds,
          like a door that sticks before it opens. I poured tea. I opened psql. I asked the
          database the only question that has ever mattered in moments like this — <Hi>who is
          waiting on whom?</Hi>
        </DropCap>

        <RcP>
          The answer lives in a system view called <Code>pg_locks</Code>, and for a long time I
          read it the way you read a foreign menu: I could see there were dishes, I just
          couldn't tell which ones I'd ordered. This piece is the tour I wish I'd been given
          back then.
        </RcP>

        {/* Aside note */}
        <RcCallout kind="note" title="who this is for">
          You've used a database in anger, you've seen a query hang, and you've wondered
          whether you should just kill it and run again. You should not just kill it and
          run again<Foot n="1" />.
        </RcCallout>

        {/* ── Key term ── */}
        <KeyTerm
          term="Lock"
          kana="ロック"
          def={<>A promise a transaction makes to the database: <em>nobody else gets to touch
            this row the way I'm touching it, until I'm done.</em> Locks aren't a problem —
            they're how Postgres keeps your data sane. Deadlocks are what happens when two
            promises depend on each other.</>}
          see="The Postgres lock zoo"
        />

        {/* ── Section 2 ── */}
        <RcH2 kanji="二">What pg_locks actually shows</RcH2>

        <RcP>
          <Code>pg_locks</Code> is a flat table where every row is a single lock currently held
          or wanted. It has eleven columns and most of them are irrelevant most of the time.
          Here are the three you'll reach for:
        </RcP>

        <RcOrdered items={[
          <><strong>The transaction</strong> — <Code>pid</Code>, the process holding or
            requesting this lock. Join to <Code>pg_stat_activity</Code> to see what it's
            actually doing.</>,
          <><strong>The thing being locked</strong> — usually <Code>relation</Code>
            (a table) or <Code>tuple</Code> (one row). Joining to <Code>pg_class</Code> turns
            an oid into a readable name.</>,
          <><strong>Whether it's been granted</strong> — <Code>granted = false</Code> is the
            magic word. It means this PID is <Hi>waiting</Hi> for something else to let go.</>,
        ]} />

        <PullQuote attribution="someone in the docs, probably">
          A deadlock is just two transactions, each politely waiting for the other.
          The only way out is for one of them to be impolite first.
        </PullQuote>

        <RcP>
          Postgres detects this automatically after about a second and kills one of the
          transactions with a <Code>40P01: deadlock detected</Code>. The killed query gets the
          error; the surviving query gets its lock. The deadlock is over, but the cause — the
          two pieces of code that disagree about lock ordering — is still there, ready to
          stall again the next night.
        </RcP>

        <RcCallout kind="tip" title="reading order">
          When you join <Code>pg_locks</Code> against <Code>pg_stat_activity</Code>, sort by
          <Code>granted ASC</Code>. The waiters come first; the holders sit underneath them.
          The shape of the deadlock falls out of the page.
        </RcCallout>

        {/* ── Section 3 ── */}
        <RcH2 kanji="三">The query I save forever</RcH2>

        <RcP>
          There's one query that has saved me more late nights than any other. It uses
          Postgres's built-in <Code>pg_blocking_pids()</Code> function, which does the join for
          you — so you can stop thinking about lock graphs and start reading them.
        </RcP>

        <BlockQuote attribution="me, at 2:18am, every time">
          If you only memorise one thing about debugging the database, memorise this query.
          The rest is just practice.
        </BlockQuote>

        {/* ── A short checklist ── */}
        <RcH3>Before you run it</RcH3>
        <RcChecklist items={[
          { t: 'You have read access to pg_stat_activity (most roles do).', done: true },
          { t: 'You\'re on a replica, or you\'re comfortable with a couple of ms on the primary.', done: true },
          { t: 'You\'ve got a second psql window ready to grab the offending PID.', done: false },
          'Press ' + ' to expand any blocked query in place.',
        ]} />

        <RcP>
          When you run it on a healthy system, you get an empty result, which is the
          best possible answer. When you run it during a stall, you get one or two rows that
          tell the whole story.
        </RcP>

        {/* ── Section 4: pitfalls ── */}
        <RcH2 kanji="四">Three pitfalls</RcH2>
        <RcBullets items={[
          <><strong>Reading the wrong replica</strong> — locks live on the primary. A
            read-replica will tell you nothing about contention there.</>,
          <><strong>Filtering too aggressively</strong> — it's tempting to add
            <Code>WHERE granted = false</Code>, but you lose the holders, and the holders are
            the half of the story you need.</>,
          <><strong>Killing the wrong PID</strong> — kill the <em>waiter</em>, not the
            <em>holder</em>. The holder is doing useful work; the waiter is the one stuck.</>,
        ]} />

        <RcCallout kind="warn" title="don't do this">
          Never <Code>pg_terminate_backend()</Code> a transaction you don't recognise. If it's
          a long-running migration, you've just rolled back ten minutes of work and left a
          half-written schema. Always check <Code>pg_stat_activity.query</Code> first.
        </RcCallout>

        {/* ── Closing ── */}
        <RcH2 kanji="五" ornament>Take this with you</RcH2>

        <RcP>
          The next time the queue stalls, the move is small and quiet: open psql, run the
          query, read the waiters, decide. Most deadlocks turn out to be the same shape,
          repeated. Once you can see them you can fix them — usually with a one-line change
          to the order your code holds locks.
        </RcP>

        <RcP>
          And then you write it down, in a place like this, so the next 2am phone call lands
          on someone who already knows the answer. Including future you.
        </RcP>

        {/* End card */}
        <div style={{
          marginTop: 28, padding: '24px 26px',
          background: 'linear-gradient(160deg, rgba(255,232,238,.7), rgba(255,255,255,.95))',
          border: '1.5px solid rgba(255,143,163,.25)',
          borderRadius: 18,
          display: 'flex', alignItems: 'center', gap: 18,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -10, bottom: -16, opacity: .5 }}>
            <BellFlower size={64} hue="#FF8FA3" />
          </div>
          <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
            <div className="hb-margin-note" style={{ color: '#D45A75' }}>before you close the tab —</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)',
              fontWeight: 500, marginTop: 4 }}>
              Tend this entry: what would you add?
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4 }}>
              The best playbooks grow. Drop a comment, a counter-example, or a query you reach for.
            </div>
          </div>
          <button className="hb-btn hb-btn--primary" style={{ position: 'relative', zIndex: 1 }}>
            <Icon name="leaf" size={13} /> Add a note
          </button>
        </div>

        {/* Footnotes */}
        <FootnotesList items={[
          <>You can, of course, just kill it and run again. It will work, until the night it
            doesn't and you can't remember which retry succeeded.</>,
        ]} />
      </ContentChrome>
    </div>
  );
};


/* ═════════════════════════════════════════════════════════════════
   SHOWCASE 2 · TECHNICAL — code, terminal, diff, table, do/don't, diagram
   ═════════════════════════════════════════════════════════════════ */
const ContentShowcaseTechnical = () => {
  return (
    <div className="hanami-surface" style={{ display: 'flex' }}>
      <Sidebar tree={TREE} activeId="dbg-prod" onSelect={() => {}} compact />
      <ContentChrome
        crumbs={[
          { icon: 'home', label: 'Home' },
          { label: 'Backend' },
          { label: 'Postgres tricks' },
          { label: 'The shape of a deadlock' },
        ]}
        progress={68}
        toc={
          <TocRail
            items={[
              { t: 'A minimum repro', done: true },
              { t: 'Watching it stall' },
              { t: 'The diagnosis query', a: true },
              { t: 'The one-line fix' },
              { t: 'Before / after' },
              { t: 'A regression test' },
            ]}
            related={[
              { t: 'pg_locks like a map', icon: 'book' },
              { t: 'Idempotent jobs', icon: 'db' },
              { t: 'Postgres snippet pack', icon: 'cmd' },
            ]}
            footer={
              <div style={{
                marginTop: 18, padding: 12, borderRadius: 12,
                background: 'linear-gradient(160deg, rgba(255,227,139,.35), rgba(255,201,58,.18))',
                border: '1px solid rgba(229,169,60,.4)',
              }}>
                <div style={{ fontFamily: 'var(--font-hand)', fontSize: 17, color: '#5a3f0a',
                  transform: 'rotate(-1deg)', display: 'inline-block' }}>
                  practice in 10 min →
                </div>
                <div style={{ fontSize: 11.5, color: '#5a3f0a', marginTop: 4, lineHeight: 1.45 }}>
                  Spin up a sandbox DB with the two stalling queries pre-loaded.
                </div>
                <button className="hb-btn" style={{
                  marginTop: 8, fontSize: 11.5, padding: '5px 10px',
                  background: '#FFC93A', borderColor: 'transparent', color: '#5a3f0a',
                }}>
                  <Icon name="arrow" size={11} /> Open sandbox
                </button>
              </div>
            }
          />
        }
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span className="hb-pill hb-pill--coral"><Icon name="bug" size={11} /> Playbook</span>
          <span className="hb-pill hb-pill--sun"><Icon name="flame" size={11} /> Intermediate</span>
          <span className="hb-pill hb-pill--sky"><Icon name="clock" size={11} /> 25 min practice</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1.06,
          fontWeight: 500, color: 'var(--ink)', margin: '4px 0 8px 0',
          letterSpacing: '-0.02em',
        }}>
          The <span className="hb-marker">shape</span> of a deadlock<br/>
          <span style={{ fontSize: 22, color: 'var(--ink-faint)', fontWeight: 400, fontStyle: 'italic' }}>
            — and the one-line fix
          </span>
        </h1>

        <RcLead>
          Today we'll build a deadlock on purpose, watch Postgres detect it, and remove the
          whole class of bug with a single change to how our code orders writes.
        </RcLead>

        {/* "what you'll build" */}
        <div style={{
          margin: '18px 0',
          padding: '14px 18px',
          background: 'linear-gradient(160deg, rgba(95,206,219,.12), transparent)',
          border: '1px solid rgba(95,206,219,.3)',
          borderRadius: 14,
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'center',
        }}>
          <div className="hb-margin-note" style={{ color: '#1d6975', whiteSpace: 'nowrap' }}>
            you'll build →
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12.5, color: 'var(--ink)' }}>
            <span>① a stalling reproduction</span>
            <span>② a diagnosis query</span>
            <span>③ a sorted-write fix</span>
            <span>④ a regression test</span>
          </div>
        </div>

        {/* ── Section: A minimum repro ── */}
        <RcH2 kanji="①">A minimum repro</RcH2>

        <RcP>
          Open two psql sessions side by side. We'll have session A touch <Code>orders</Code>
          first and <Code>invoices</Code> second; session B will do them in the opposite order.
          Each session works fine alone — the trouble starts when both run together.
        </RcP>

        <CodeFile
          filename="session-a.sql"
          lang="postgresql"
          highlight={[3, 4]}
          code={
            `<span style="color:#7a6e5a">-- session A: orders, then invoices</span>\n` +
            `<span style="color:#B0445A">BEGIN</span>;\n` +
            `<span style="color:#B0445A">UPDATE</span> orders   <span style="color:#B0445A">SET</span> total = total + <span style="color:#C68A63">1</span> <span style="color:#B0445A">WHERE</span> id = <span style="color:#C68A63">7</span>;\n` +
            `<span style="color:#B0445A">UPDATE</span> invoices <span style="color:#B0445A">SET</span> sent  = <span style="color:#447A2A">true</span>      <span style="color:#B0445A">WHERE</span> order_id = <span style="color:#C68A63">7</span>;\n` +
            `<span style="color:#B0445A">COMMIT</span>;`
          }
        />

        <CodeFile
          filename="session-b.sql"
          lang="postgresql"
          highlight={[3, 4]}
          code={
            `<span style="color:#7a6e5a">-- session B: invoices, then orders</span>\n` +
            `<span style="color:#B0445A">BEGIN</span>;\n` +
            `<span style="color:#B0445A">UPDATE</span> invoices <span style="color:#B0445A">SET</span> sent  = <span style="color:#447A2A">false</span>     <span style="color:#B0445A">WHERE</span> order_id = <span style="color:#C68A63">7</span>;\n` +
            `<span style="color:#B0445A">UPDATE</span> orders   <span style="color:#B0445A">SET</span> total = total - <span style="color:#C68A63">1</span> <span style="color:#B0445A">WHERE</span> id = <span style="color:#C68A63">7</span>;\n` +
            `<span style="color:#B0445A">COMMIT</span>;`
          }
        />

        <RcCallout kind="note" title="run order">
          Run A's first <Code>UPDATE</Code>, then B's first <Code>UPDATE</Code>, then A's
          second. That last statement is where the stall lands.
        </RcCallout>

        {/* ── Section: Watching it stall ── */}
        <RcH2 kanji="②">Watching it stall</RcH2>

        <RcP>
          From a third terminal, watch the activity log. Postgres won't shout — it'll just
          quietly wait, and after a beat or so, kill one of the two transactions with a
          <Code>deadlock_timeout</Code> error.
        </RcP>

        <Terminal lines={[
          `psql -c <span style="color:#FFE38B">"SET application_name = 'watcher'"</span>`,
          { k: 'ok', t: 'SET' },
          `tail -f /var/log/postgresql/<span style="color:#FFE38B">postgresql.log</span>`,
          { k: 'dim', t: 'waiting for input on shared memory…' },
          { k: 'err', t: '2026-05-21 02:14:33 UTC  ERROR:  deadlock detected' },
          { k: 'dim', t: 'DETAIL: Process 18432 waits for ShareLock on transaction 9711;' },
          { k: 'dim', t: '        blocked by process 18510.' },
          { k: 'dim', t: '        Process 18510 waits for ShareLock on transaction 9710;' },
          { k: 'dim', t: '        blocked by process 18432.' },
          { k: 'ok',  t: 'HINT:   See server log for query details.' },
        ]} />

        {/* ── Diagram ── */}
        <DeadlockDiagram />

        {/* ── Section: Diagnosis query ── */}
        <RcH2 kanji="③">The diagnosis query</RcH2>

        <RcP>
          When you don't have the log handy — or you want to catch it <em>while</em> it's
          stuck, before Postgres has decided — this query is the one you reach for. Save it as
          a snippet, give it a short alias, and never type it again.
        </RcP>

        <CodeFile
          filename="who-waits-on-whom.sql"
          lang="postgresql"
          highlight={[4, 5]}
          code={
            `<span style="color:#B0445A">SELECT</span>\n` +
            `  a.pid,\n` +
            `  a.usename,\n` +
            `  <span style="color:#7a6e5a">-- the smoking gun ↓</span>\n` +
            `  pg_blocking_pids(a.pid) <span style="color:#B0445A">AS</span> blocked_by,\n` +
            `  a.state, a.wait_event_type, a.wait_event,\n` +
            `  <span style="color:#B0445A">substring</span>(a.query, <span style="color:#C68A63">1</span>, <span style="color:#C68A63">80</span>) <span style="color:#B0445A">AS</span> q\n` +
            `<span style="color:#B0445A">FROM</span> pg_stat_activity a\n` +
            `<span style="color:#B0445A">WHERE</span> cardinality(pg_blocking_pids(a.pid)) > <span style="color:#C68A63">0</span>;`
          }
        />

        {/* The result */}
        <RcTable
          caption="↑ what it looks like during our deadlock"
          headers={['pid', 'usename', 'blocked_by', 'wait_event', 'query']}
          rows={[
            ['18432', 'app', '{18510}', 'transactionid', 'UPDATE invoices SET sent = true …'],
            ['18510', 'app', '{18432}', 'transactionid', 'UPDATE orders SET total = total − 1 …'],
          ]}
        />

        <RcP>
          The cycle is right there in the <Code>blocked_by</Code> column: A is blocked by B,
          B is blocked by A. Postgres saw the same cycle before us — that's why it killed one
          of them<Foot n="1" />.
        </RcP>

        {/* ── Section: the fix ── */}
        <RcH2 kanji="④">The one-line fix</RcH2>

        <RcP>
          The whole class of bug disappears if every piece of code that touches both tables
          touches them in the same order. We pick alphabetical — <Code>invoices</Code>
          before <Code>orders</Code> — and update <em>session B</em> to match.
        </RcP>

        <DoDont
          doItem={{
            title: 'Always lock alphabetically',
            body: 'Touch invoices first, orders second — everywhere, no exceptions. One simple rule, zero ambiguity.',
            code: `<span style="color:#447A2A">-- invoices first, then orders</span>\n` +
              `UPDATE <span style="color:#2e4818;font-weight:600">invoices</span> SET sent = false …;\n` +
              `UPDATE <span style="color:#2e4818;font-weight:600">orders</span>   SET total = total − 1 …;`
          }}
          dontItem={{
            title: '"It works most of the time"',
            body: 'Two paths that touch the same rows in different orders will deadlock under load. Retries make this look intermittent, but it isn\'t.',
            code: `<span style="color:#7a1f33">-- order varies by code path</span>\n` +
              `UPDATE <span style="color:#5c1f2d;font-weight:600">orders</span>   SET total …;\n` +
              `UPDATE <span style="color:#5c1f2d;font-weight:600">invoices</span> SET sent …;`
          }}
        />

        <RcCallout kind="tip" title="lock helpers">
          For batch updates, sort by primary key before you <Code>UPDATE</Code>. Postgres locks
          rows in the order it visits them, so a stable order at the application layer means
          a stable order at the storage layer.
        </RcCallout>

        {/* ── Diff ── */}
        <RcH3>The change, as a diff</RcH3>
        <Diff
          filename="services/billing/refund.go"
          hunks={[
            { t: '<span style="color:#7a6e5a">func RefundOrder(ctx context.Context, id int64) error {</span>' },
            { t: '  tx, _ := db.BeginTx(ctx, nil)' },
            { k: '-', t: '  tx.Exec(<span style="color:#B0445A">"UPDATE orders SET total = total − 1 WHERE id = $1"</span>, id)' },
            { k: '-', t: '  tx.Exec(<span style="color:#B0445A">"UPDATE invoices SET sent = false WHERE order_id = $1"</span>, id)' },
            { k: '+', t: '  <span style="color:#7a6e5a">// alphabetical: invoices, then orders (matches session-a.sql)</span>' },
            { k: '+', t: '  tx.Exec(<span style="color:#B0445A">"UPDATE invoices SET sent = false WHERE order_id = $1"</span>, id)' },
            { k: '+', t: '  tx.Exec(<span style="color:#B0445A">"UPDATE orders SET total = total − 1 WHERE id = $1"</span>, id)' },
            { t: '  return tx.Commit()' },
            { t: '}' },
          ]}
        />

        {/* ── Comparison table ── */}
        <RcH3>What changes for you</RcH3>
        <RcTable
          headers={['', 'Before', 'After']}
          rows={[
            ['Deadlock rate / day', '12 errors', '0 errors'],
            ['Retry budget',        'Burning 8%',  '< 0.1%'],
            ['Mean p99 commit',     '420 ms',      '38 ms'],
            ['On-call pages',       '3 last month','0 last month'],
          ]}
        />

        {/* ── Final test ── */}
        <RcH2 kanji="⑤">A regression test</RcH2>

        <RcP>
          One last move: write the test you wish you'd had on day one. Open two transactions,
          run the offending statements in the offending order, and assert that no
          <Code>40P01</Code> ever shows up. Then run it on every CI build. The night the team
          accidentally reintroduces the bug, the test catches it before users do.
        </RcP>

        <CodeFile
          filename="billing/deadlock_test.go"
          lang="go"
          code={
            `<span style="color:#B0445A">func</span> <span style="color:#1d6975">TestNoDeadlockOnRefund</span>(t *testing.T) {\n` +
            `  ctx, cancel := context.WithTimeout(t.Context(), <span style="color:#C68A63">5</span>*time.Second)\n` +
            `  <span style="color:#B0445A">defer</span> cancel()\n\n` +
            `  <span style="color:#7a6e5a">// run the offending pair 100x in parallel</span>\n` +
            `  err := runConcurrently(ctx, <span style="color:#C68A63">100</span>, RefundOrder, ReissueInvoice)\n\n` +
            `  <span style="color:#B0445A">if</span> err != <span style="color:#B0445A">nil</span> && strings.Contains(err.Error(), <span style="color:#447A2A">"deadlock"</span>) {\n` +
            `    t.Fatalf(<span style="color:#447A2A">"deadlock under contention: %v"</span>, err)\n` +
            `  }\n` +
            `}`
          }
        />

        <RcCallout kind="success" title="checkpoint">
          You can reproduce a deadlock on purpose, find it in <Code>pg_locks</Code>, fix it
          with a one-line ordering rule, and regression-test it. That's the whole playbook —
          press <Kbd>⌘</Kbd>+<Kbd>S</Kbd> on it and move on.
        </RcCallout>

        {/* Practice CTA */}
        <div style={{
          marginTop: 28, padding: '22px 24px',
          background: 'linear-gradient(160deg, rgba(255,143,163,.15), rgba(95,206,219,.15))',
          border: '1.5px solid rgba(212,90,117,.25)',
          borderRadius: 18,
          display: 'flex', alignItems: 'center', gap: 18,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -10, bottom: -20, opacity: .5 }}>
            <PuffyCloud size={160} opacity={0.6} />
          </div>
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <div className="hb-margin-note" style={{ color: '#1d6975' }}>your turn —</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)',
              fontWeight: 500, marginTop: 4 }}>
              Try this on a real database in 10 minutes
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4 }}>
              We'll start a sandbox Postgres, drop in the offending pair, and time how fast you find it.
            </div>
          </div>
          <button className="hb-btn hb-btn--primary" style={{ position: 'relative', zIndex: 1 }}>
            <Icon name="arrow" size={13} /> Open sandbox
          </button>
        </div>

        <FootnotesList items={[
          <>If you want to control which side gets killed, set
            <Code>deadlock_priority</Code> at the start of each transaction. Lower priority
            loses first.</>,
        ]} />
      </ContentChrome>
    </div>
  );
};

Object.assign(window, { ContentShowcaseReading, ContentShowcaseTechnical });
