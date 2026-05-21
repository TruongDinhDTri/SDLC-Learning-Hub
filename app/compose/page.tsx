'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { MobileSidebarBackdrop, MobileBottomNav } from '@/components/layout/MobileControls'
import { Icon, type IconName } from '@/components/ui/Icon'

// ---------------------------------------------------------------------------
// Sidebar groups (hardcoded for this client page)
// ---------------------------------------------------------------------------

const SIDEBAR_GROUPS = [
  {
    id: 'sdlc',
    label: 'SDLC',
    icon: 'git' as IconName,
    iconColor: 'var(--sage-deep)',
    children: [
      { id: 'sdlc-01', label: 'Idea & Requirements',  href: '/sdlc/01-ideation',           status: 'sage'  as const },
      { id: 'sdlc-02', label: 'System Design',         href: '/sdlc/02-system-design',       status: 'sage'  as const },
      { id: 'sdlc-03', label: 'Technical Planning',    href: '/sdlc/03-technical-planning',  status: 'sage'  as const },
      { id: 'sdlc-04', label: 'Development',            href: '/sdlc/04-development',         status: 'sage'  as const },
      { id: 'sdlc-05', label: 'Testing & QA',           href: '/sdlc/05-testing',             status: 'sage'  as const },
      { id: 'sdlc-06', label: 'Deployment',             href: '/sdlc/06-deployment',          status: 'peach' as const },
      { id: 'sdlc-07', label: 'Monitoring',             href: '/sdlc/07-monitoring',          status: 'peach' as const },
      { id: 'sdlc-08', label: 'Documentation',          href: '/sdlc/08-documentation',       status: 'mute'  as const },
      { id: 'sdlc-09', label: 'Maintenance',            href: '/sdlc/09-maintenance',         status: 'mute'  as const },
    ],
  },
  {
    id: 'codebase-understanding',
    label: 'Codebase Understanding',
    icon: 'eye' as IconName,
    iconColor: '#6E94A0',
    children: [
      { id: 'cbu-01', label: 'Orient Yourself',         href: '/codebase-understanding/01-orient',          status: 'sage'  as const },
      { id: 'cbu-02', label: 'Find Entry Points',       href: '/codebase-understanding/02-entry-points',    status: 'sage'  as const },
      { id: 'cbu-03', label: 'Understand Architecture', href: '/codebase-understanding/03-architecture',    status: 'sage'  as const },
      { id: 'cbu-04', label: 'Trace Data Flow',         href: '/codebase-understanding/04-data-flow',       status: 'peach' as const },
      { id: 'cbu-05', label: 'Map Dependencies',        href: '/codebase-understanding/05-dependencies',    status: 'peach' as const },
      { id: 'cbu-06', label: 'Read the Tests',          href: '/codebase-understanding/06-tests',           status: 'peach' as const },
      { id: 'cbu-07', label: 'Dev Environment',         href: '/codebase-understanding/07-dev-environment', status: 'mute'  as const },
      { id: 'cbu-08', label: 'Domain Language',         href: '/codebase-understanding/08-domain-language', status: 'mute'  as const },
      { id: 'cbu-09', label: 'Team Conventions',        href: '/codebase-understanding/09-conventions',     status: 'mute'  as const },
      { id: 'cbu-10', label: 'Pain Points',             href: '/codebase-understanding/10-pain-points',     status: 'mute'  as const },
      { id: 'cbu-11', label: 'Mental Model',            href: '/codebase-understanding/11-mental-model',    status: 'mute'  as const },
    ],
  },
  {
    id: 'feature-development',
    label: 'Feature Development',
    icon: 'sparkle' as IconName,
    iconColor: 'var(--peach-deep)',
    children: [
      { id: 'fd-01', label: 'Understand Requirements', href: '/feature-development/01-understand', status: 'sage'  as const },
      { id: 'fd-02', label: 'Design the Solution',     href: '/feature-development/02-design',     status: 'sage'  as const },
      { id: 'fd-03', label: 'Plan Implementation',     href: '/feature-development/03-plan',       status: 'sage'  as const },
      { id: 'fd-04', label: 'Implement',                href: '/feature-development/04-implement',  status: 'sage'  as const },
      { id: 'fd-05', label: 'Test',                     href: '/feature-development/05-test',       status: 'peach' as const },
      { id: 'fd-06', label: 'Code Review',              href: '/feature-development/06-review',     status: 'peach' as const },
      { id: 'fd-07', label: 'Deploy',                   href: '/feature-development/07-deploy',     status: 'mute'  as const },
      { id: 'fd-08', label: 'Monitor',                  href: '/feature-development/08-monitor',    status: 'mute'  as const },
      { id: 'fd-09', label: 'Refactor & Document',      href: '/feature-development/09-refactor',   status: 'mute'  as const },
    ],
  },
]

// ---------------------------------------------------------------------------
// TopBar actions
// ---------------------------------------------------------------------------

function ComposerActions() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Draft status chip */}
      <div className="hb-chip" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 10px',
        borderRadius: 99,
        background: 'rgba(63,54,44,.05)',
        border: '1px solid var(--line)',
        fontSize: 11.5,
        color: 'var(--ink-faint)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '.04em',
      }}>
        <span style={{ fontSize: 12 }}>↺</span>
        Draft · autosaved 12s ago
      </div>

      <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 14px', fontSize: 12.5 }}>
        <Icon name="eye" size={13} /> Preview
      </button>

      <button className="hb-btn hb-btn--ghost" style={{ padding: '7px 14px', fontSize: 12.5 }}>
        <Icon name="copy" size={13} /> Share draft
      </button>

      <button className="hb-btn hb-btn--primary" style={{ padding: '7px 16px', fontSize: 12.5 }}>
        <Icon name="leaf" size={13} /> Plant entry
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Editor Pane
// ---------------------------------------------------------------------------

const DEMO_BODY = `## The shape of the bug

Three times this month our jobs queue stalled at \`2am\`. Each time the trail led back to the same pair of tables.

:::tip
Run pg_locks queries from a read-replica when you can.
:::

### Step 1 · Reproduce on a quiet branch

Open two psql sessions side by side; one updates parent then child, the other goes the other way...`

function EditorPane() {
  return (
    <div className="hb-composer__pane">
      <div className="hb-composer__pane-label" style={{ fontFamily: 'var(--font-mono)' }}>
        ↖ Writing
      </div>

      {/* Title */}
      <input
        className="hb-composer__title-input"
        defaultValue="Untangling a flaky Postgres deadlock"
        placeholder="Untitled draft"
      />

      {/* Subtitle */}
      <input
        className="hb-composer__subtitle-input"
        defaultValue=""
        placeholder="Subtitle · a short note about what this teaches"
      />

      {/* Toolbar */}
      <div className="hb-composer__toolbar">
        {[
          { icon: 'plus',     label: '+ Step'      },
          { icon: 'sparkle',  label: '⊕ Callout'   },
          { icon: 'cmd',      label: 'M Code'       },
          { icon: 'tag',      label: '# Tag'        },
          { icon: 'star',     label: '✦ Wisdom'     },
          { icon: 'check',    label: '✓ Step done'  },
        ].map(t => (
          <button key={t.label} className="hb-composer__tool">
            <Icon name={t.icon as IconName} size={12} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div
        className="hb-composer__body"
        contentEditable
        suppressContentEditableWarning
        style={{ minHeight: 320 }}
      >
        {/* Paragraph intro */}
        <p style={{ marginBottom: 16, lineHeight: 1.72, color: 'var(--ink)' }}>
          Three times this month our jobs queue stalled at <code style={{
            fontFamily: 'var(--font-mono)', fontSize: 12.5,
            background: 'rgba(63,54,44,.07)', padding: '1px 5px', borderRadius: 4,
          }}>2am</code>. Each time the trail led back to the same pair of tables.
        </p>

        {/* h2 */}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500,
          color: 'var(--ink)', margin: '20px 0 10px',
        }}>The shape of the bug</h2>

        {/* tip callout inline in editor */}
        <div style={{
          background: 'rgba(143,203,111,0.12)',
          borderLeft: '3px solid var(--sage)',
          borderRadius: '0 8px 8px 0',
          padding: '10px 14px',
          margin: '12px 0',
          fontSize: 13.5,
          color: 'var(--ink-soft)',
          lineHeight: 1.6,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--sage-deep)', display: 'block', marginBottom: 4 }}>:::tip</span>
          Run pg_locks queries from a read-replica when you can.
        </div>

        {/* h3 */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600,
          color: 'var(--ink)', margin: '20px 0 8px',
        }}>Step 1 · Reproduce on a quiet branch</h3>

        <p style={{ marginBottom: 0, lineHeight: 1.72, color: 'var(--ink-soft)' }}>
          Open two psql sessions side by side; one updates parent then child, the other goes the other way...
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Preview Pane
// ---------------------------------------------------------------------------

function PreviewPane() {
  return (
    <div className="hb-composer__pane" style={{ borderLeft: '1px solid var(--line)', borderRight: 'none' }}>
      <div className="hb-composer__pane-label" style={{ fontFamily: 'var(--font-mono)' }}>
        Live Preview
      </div>

      {/* Article title */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 28,
        fontWeight: 500,
        color: 'var(--ink)',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        margin: '0 0 8px',
      }}>
        Untangling a flaky Postgres deadlock
      </h1>

      {/* Subtitle */}
      <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 22px', lineHeight: 1.55 }}>
        Three times this month our jobs queue stalled at 2am.
      </p>

      {/* TIP callout */}
      <div className="hb-callout hb-callout--tip" style={{ marginBottom: 20 }}>
        <div className="hb-callout__icon">
          <Icon name="leaf" size={13} />
        </div>
        <div className="hb-callout__body">
          <div className="hb-callout__title">Tip</div>
          <div className="hb-callout__text">Run pg_locks queries from a read-replica when you can.</div>
        </div>
      </div>

      {/* Step header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
      }}>
        <div style={{
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(160deg, #FFC8D2, #FF8FA3)',
          display: 'grid',
          placeItems: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: '#6b1f2a',
          flexShrink: 0,
        }}>1</div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--ink)',
        }}>Reproduce on a quiet branch</span>
      </div>

      {/* Two-column code blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {/* Session A */}
        <div className="hb-code-file">
          <div className="hb-code-file__header">
            <div className="hb-code-file__lights">
              <span className="hb-code-file__light hb-code-file__light--red" />
              <span className="hb-code-file__light hb-code-file__light--yellow" />
              <span className="hb-code-file__light hb-code-file__light--green" />
            </div>
            <span className="hb-code-file__name">session-a.sql</span>
          </div>
          <div className="hb-code-file__body">
            <span className="k">BEGIN</span>;<br />
            <span className="k">UPDATE</span> <span className="n">parent</span> <span className="k">SET</span> ...<br />
            <span className="k">UPDATE</span> <span className="n">child</span> <span className="k">SET</span> ...<br />
            <span className="k">COMMIT</span>;
          </div>
        </div>

        {/* Session B */}
        <div className="hb-code-file">
          <div className="hb-code-file__header">
            <div className="hb-code-file__lights">
              <span className="hb-code-file__light hb-code-file__light--red" />
              <span className="hb-code-file__light hb-code-file__light--yellow" />
              <span className="hb-code-file__light hb-code-file__light--green" />
            </div>
            <span className="hb-code-file__name">session-b.sql</span>
          </div>
          <div className="hb-code-file__body">
            <span className="k">BEGIN</span>;<br />
            <span className="k">UPDATE</span> <span className="n">child</span> <span className="k">SET</span> ...<br />
            <span className="k">UPDATE</span> <span className="n">parent</span> <span className="k">SET</span> ...<br />
            <span className="k">COMMIT</span>;
          </div>
        </div>
      </div>

      {/* NOTE callout */}
      <div className="hb-callout hb-callout--note" style={{ marginBottom: 24 }}>
        <div className="hb-callout__icon">
          <Icon name="book" size={13} />
        </div>
        <div className="hb-callout__body">
          <div className="hb-callout__title">Good to know — Run order</div>
          <div className="hb-callout__text">
            Session A locks parent then child. Session B locks child then parent.
            When both run simultaneously, each waits for the other's lock — classic deadlock.
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hb-divider" style={{ margin: '24px 0' }} />

      {/* Entry Properties panel */}
      <div>
        <div style={{
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-ghost)',
          marginBottom: 14,
        }}>
          Entry Properties
        </div>

        {[
          {
            label: 'Hub',
            value: (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon name="layers" size={11} color="var(--ink-faint)" />
                Debugging
                <span style={{ color: 'var(--ink-ghost)' }}>→</span>
                Prod incidents
              </span>
            ),
          },
          {
            label: 'Tags',
            value: (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' as const }}>
                {['#postgres', '#incident', '#sql'].map(t => (
                  <span key={t} className="hb-pill hb-pill--sage" style={{ fontSize: 11 }}>{t}</span>
                ))}
                <button className="hb-btn hb-btn--ghost" style={{ padding: '2px 7px', fontSize: 11, borderRadius: 6 }}>
                  + tag
                </button>
              </span>
            ),
          },
          {
            label: 'Season',
            value: (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon name="sun" size={11} color="var(--ink-faint)" />
                Summer · 夏
              </span>
            ),
          },
          {
            label: 'Visibility',
            value: (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon name="eye" size={11} color="var(--ink-faint)" />
                Team — engineering
              </span>
            ),
          },
        ].map((row, i) => (
          <div key={row.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '7px 0',
            borderTop: i === 0 ? 'none' : '1px dashed var(--line)',
          }}>
            <span style={{
              width: 80,
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-ghost)',
              flexShrink: 0,
            }}>
              {row.label}
            </span>
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ComposePage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MobileSidebarBackdrop />
      <Sidebar groups={SIDEBAR_GROUPS} />

      <main style={{ flex: 1, minWidth: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar
          breadcrumb={[
            { label: 'Home',      href: '/',          icon: 'home'  },
            { label: 'Debugging', href: '/debugging'              },
            { label: 'Untitled draft'                             },
          ]}
          actions={<ComposerActions />}
        />

        {/* Split composer area */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div className="hb-composer">
            <EditorPane />
            <PreviewPane />
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  )
}
