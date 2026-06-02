'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { HorizonBand } from '@/components/decorations/HorizonBand'
import { SakuraBranch } from '@/components/decorations/SakuraBranch'
import { Icon, type IconName } from '@/components/ui/Icon'
import { MobileSidebarBackdrop, MobileBottomNav } from '@/components/layout/MobileControls'

// ---------------------------------------------------------------------------
// Hub definitions (with phase counts)
// ---------------------------------------------------------------------------

const HUBS = [
  {
    id: 'sdlc',
    title: 'SDLC',
    description: 'From idea to production — a verified 9-phase engineering lifecycle',
    accent: 'sage',
    icon: 'git' as IconName,
    kanji: '道',
    count: 9,
    phases: [
      { slug: '01-ideation', label: 'Idea & Requirements', status: 'sage' as const },
      { slug: '02-system-design', label: 'System Design', status: 'sage' as const },
      { slug: '03-technical-planning', label: 'Technical Planning', status: 'sage' as const },
      { slug: '04-development', label: 'Development', status: 'sage' as const },
      { slug: '05-testing', label: 'Testing & QA', status: 'sage' as const },
      { slug: '06-deployment', label: 'Deployment', status: 'peach' as const },
      { slug: '07-monitoring', label: 'Monitoring', status: 'peach' as const },
      { slug: '08-documentation', label: 'Documentation', status: 'mute' as const },
      { slug: '09-maintenance', label: 'Maintenance', status: 'mute' as const },
    ],
  },
  {
    id: 'codebase-understanding',
    title: 'Codebase Understanding',
    description: 'How to read, navigate and deeply understand any codebase',
    accent: 'sky',
    icon: 'eye' as IconName,
    kanji: '解',
    count: 11,
    phases: [
      { slug: '01-orient', label: 'Orient Yourself', status: 'sage' as const },
      { slug: '02-entry-points', label: 'Find Entry Points', status: 'sage' as const },
      { slug: '03-architecture', label: 'Map the Architecture', status: 'sage' as const },
      { slug: '04-data-flow', label: 'Trace Real Flows', status: 'sage' as const },
      { slug: '05-data-model', label: 'Understand Data Model', status: 'peach' as const },
      { slug: '06-run-system', label: 'Run the System', status: 'peach' as const },
      { slug: '07-failure-paths', label: 'Study Failure Paths', status: 'peach' as const },
      { slug: '08-module-boundaries', label: 'Module Boundaries', status: 'peach' as const },
      { slug: '09-tests', label: 'Read the Tests', status: 'sage' as const },
      { slug: '10-operations', label: 'Operations & Deployment', status: 'sage' as const },
      { slug: '11-mental-model', label: 'Create Your System Map', status: 'sage' as const },
    ],
  },
  {
    id: 'feature-development',
    title: 'Feature Development',
    description: 'Enterprise feature lifecycle from requirements to shipping',
    accent: 'peach',
    icon: 'sparkle' as IconName,
    kanji: '創',
    count: 9,
    phases: [
      { slug: '01-understand', label: 'Understand Requirements', status: 'sage' as const },
      { slug: '02-design', label: 'Design the Solution', status: 'sage' as const },
      { slug: '03-plan', label: 'Plan Implementation', status: 'sage' as const },
      { slug: '04-implement', label: 'Implement', status: 'sage' as const },
      { slug: '05-test', label: 'Test', status: 'peach' as const },
      { slug: '06-review', label: 'Code Review', status: 'peach' as const },
      { slug: '07-deploy', label: 'Deploy', status: 'mute' as const },
      { slug: '08-monitor', label: 'Monitor', status: 'mute' as const },
      { slug: '09-refactor', label: 'Refactor & Document', status: 'mute' as const },
    ],
  },
]

const ACCENT_MAP: Record<string, { bg: string; ink: string; dot: string; iconColor: string }> = {
  sage:  { bg: 'linear-gradient(160deg, #E8F2DC, #D6E3CB)', ink: '#3e5234', dot: '#7E9968', iconColor: 'var(--sage-deep)' },
  sky:   { bg: 'linear-gradient(160deg, #DDEAEF, #B9D6E0)', ink: '#2e4a55', dot: '#6E94A0', iconColor: '#6E94A0' },
  peach: { bg: 'linear-gradient(160deg, #FFE8D2, #FADFC9)', ink: '#6a4628', dot: '#C68A63', iconColor: 'var(--peach-deep)' },
  rose:  { bg: 'linear-gradient(160deg, #FFE9E2, #F5D6D2)', ink: '#6b3f37', dot: '#C4827E', iconColor: 'var(--rose-deep)' },
}

// ---------------------------------------------------------------------------
// Sidebar groups
// ---------------------------------------------------------------------------

const PINNED_ITEMS = [
  { id: 'onboarding', label: 'Onboarding checklist', href: '/', icon: 'leaf' as IconName, status: 'sage' as const },
  { id: 'runbook', label: 'Production runbook', href: '/', icon: 'book' as IconName, status: 'peach' as const },
]

const SIDEBAR_GROUPS = HUBS.map(hub => ({
  id: hub.id,
  label: hub.title,
  icon: hub.icon,
  iconColor: ACCENT_MAP[hub.accent]?.iconColor ?? 'var(--ink-faint)',
  children: hub.phases.map(p => ({
    id: `${hub.id}-${p.slug}`,
    label: p.label,
    href: `/${hub.id}/${p.slug}`,
    status: p.status,
  })),
}))

// ---------------------------------------------------------------------------
// Hub card thumbnails (the 4-column grid includes a placeholder)
// ---------------------------------------------------------------------------

const HUB_CARDS = [
  ...HUBS.map(h => ({ ...h, placeholder: false })),
  {
    id: 'debugging-playbooks',
    title: 'Debugging Playbooks',
    description: 'Systematic patterns for diagnosing and fixing production incidents',
    accent: 'rose',
    icon: 'bug' as IconName,
    kanji: '解',
    count: 0,
    phases: [],
    placeholder: true,
  },
]

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="hanami-surface" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <MobileSidebarBackdrop />
      <Sidebar groups={SIDEBAR_GROUPS} collapsed={!showSidebar} />

      {/* Main scrollable area */}
      <div
        className="hanami-main-content"
        style={{ flex: 1, overflowY: 'auto', height: '100vh', position: 'relative', minWidth: 0 }}
      >
        <TopBar
          breadcrumb={[{ label: 'Home', href: '/', icon: 'home' }]}
          onToggleSidebar={() => setShowSidebar(p => !p)}
          sidebarOpen={showSidebar}
        />

        {/* ── HERO BAND ─────────────────────────────────────────────── */}
        <div style={{ position: 'relative' }}>
          {/* Horizon scene sits at the very top */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 220, zIndex: 0, pointerEvents: 'none' }}>
            <HorizonBand height={220} />
          </div>

          {/* Content layer — overlaps the horizon band */}
          <div className="hanami-home-content" style={{ padding: '32px 36px 0', position: 'relative', zIndex: 1 }}>

            {/* ── HERO + STATS ROW ──────────────────────────────── */}
            <div className="hanami-hero-row" style={{ display: 'flex', gap: 28, marginBottom: 18, alignItems: 'flex-start' }}>

              {/* LEFT — greeting + headline + subtitle */}
              <div className="hanami-hero-text" style={{ flex: '0 0 58%', minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: 18,
                  color: 'var(--rose-deep)',
                  marginBottom: 8,
                  display: 'inline-block',
                }}>
                  おかえり, Yuki
                </div>
                <h1 className="hanami-home-h1" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 46,
                  fontWeight: 500,
                  letterSpacing: '-0.018em',
                  lineHeight: 1.08,
                  color: 'var(--ink)',
                  margin: '0 0 10px 0',
                  maxWidth: 560,
                }}>
                  A bright field of half-finished ideas.
                </h1>
                <p style={{
                  fontSize: 14,
                  color: 'var(--ink-soft)',
                  margin: 0,
                  lineHeight: 1.6,
                  maxWidth: 480,
                }}>
                  3 drafts waiting and 5 new entries the team planted while you were tending other things.
                </p>
              </div>

              {/* RIGHT — three stat cards */}
              <div className="hanami-stat-grid" style={{ flex: 1, display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: 4 }}>
                {/* ENTRIES */}
                <div className="hb-stat-card" style={{ flex: 1 }}>
                  <div className="hb-stat-card__label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="hb-dot hb-dot--rose" />
                    ENTRIES
                  </div>
                  <div className="hb-stat-card__number">184</div>
                  <div className="hb-stat-card__delta">+2 this week</div>
                </div>

                {/* STREAK */}
                <div className="hb-stat-card" style={{ flex: 1 }}>
                  <div className="hb-stat-card__label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="hb-dot hb-dot--peach" />
                    STREAK
                  </div>
                  <div className="hb-stat-card__number">12d</div>
                  <div className="hb-stat-card__delta">longest: 21d</div>
                </div>

                {/* FINISHED */}
                <div className="hb-stat-card" style={{ flex: 1 }}>
                  <div className="hb-stat-card__label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="hb-dot hb-dot--sage" />
                    FINISHED
                  </div>
                  <div className="hb-stat-card__number">08</div>
                  <div className="hb-stat-card__delta">2 waiting</div>
                </div>
              </div>
            </div>

            {/* ── CONTINUE BAR ──────────────────────────────────── */}
            <div className="hb-continue-bar hb-card" style={{ marginBottom: 24 }}>
              <div className="hb-continue-bar__icon">
                <Icon name="bug" size={18} color="var(--rose-deep)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="hb-continue-bar__label">PICK UP WHERE YOU LEFT OFF →</div>
                <div className="hb-continue-bar__title">Untangling a flaky Postgres deadlock</div>
                <div className="hb-continue-bar__progress">step 2 of 4 · 5 min left</div>
              </div>
              <button className="hb-btn hb-btn--resume">→ Resume</button>
            </div>

            {/* ── LEARNING HUBS ─────────────────────────────────── */}
            <div style={{ marginBottom: 20 }}>
              {/* Section header row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>
                  Learning hubs
                </span>
                <div className="hb-filter-tabs">
                  <button className="hb-filter-tab hb-filter-tab--active">All</button>
                  <button className="hb-filter-tab">Pinned</button>
                  <button className="hb-filter-tab">In progress</button>
                  <button className="hb-filter-tab">Owned by me</button>
                </div>
              </div>

              {/* 4-column hub card grid */}
              <div className="hanami-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {HUB_CARDS.map(hub => {
                  const a = ACCENT_MAP[hub.accent]
                  const href = hub.placeholder ? '#' : `/${hub.id}`
                  return (
                    <Link
                      key={hub.id}
                      href={href}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div
                        className="hb-card"
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'transform .15s, box-shadow .15s',
                          border: '1px solid rgba(63,54,44,.06)',
                        }}
                      >
                        {/* Thumbnail / scene area */}
                        <div style={{
                          height: 92,
                          background: a.bg,
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '15px 15px 0 0',
                        }}>
                          {/* Kanji watermark */}
                          <div style={{
                            position: 'absolute',
                            right: -8,
                            bottom: -22,
                            fontFamily: 'var(--font-display)',
                            fontSize: 90,
                            lineHeight: 1,
                            color: a.ink,
                            opacity: 0.1,
                            pointerEvents: 'none',
                            fontWeight: 600,
                            userSelect: 'none',
                          }}>
                            {hub.kanji}
                          </div>
                          {/* Icon in top-left */}
                          <div style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            width: 32,
                            height: 32,
                            borderRadius: 10,
                            background: 'rgba(255,255,255,.55)',
                            display: 'grid',
                            placeItems: 'center',
                            boxShadow: 'inset 0 0 0 1px rgba(63,54,44,.08)',
                            color: a.ink,
                          }}>
                            <Icon name={hub.icon} size={16} strokeWidth={1.7} />
                          </div>
                          {/* Placeholder badge */}
                          {hub.placeholder && (
                            <div style={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              background: 'rgba(255,255,255,.65)',
                              borderRadius: 999,
                              padding: '3px 8px',
                              fontSize: 9.5,
                              fontWeight: 700,
                              letterSpacing: '.1em',
                              textTransform: 'uppercase',
                              color: a.ink,
                            }}>
                              Coming soon
                            </div>
                          )}
                        </div>

                        {/* Card body */}
                        <div style={{ padding: '12px 14px 14px' }}>
                          <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 15,
                            fontWeight: 500,
                            color: 'var(--ink)',
                            lineHeight: 1.25,
                            marginBottom: 4,
                          }}>
                            {hub.title}
                          </div>
                          <div style={{
                            fontSize: 12,
                            color: 'var(--ink-soft)',
                            lineHeight: 1.45,
                            marginBottom: 10,
                          }}>
                            {hub.description}
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                            <span style={{
                              fontSize: 11,
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--ink-faint)',
                            }}>
                              {hub.count > 0 ? `${hub.count} phases` : 'draft'}
                            </span>
                            <span style={{
                              width: 22,
                              height: 22,
                              borderRadius: 7,
                              background: a.bg,
                              display: 'grid',
                              placeItems: 'center',
                              color: a.ink,
                            }}>
                              <Icon name="arrow" size={11} strokeWidth={2} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* ── BOTTOM ROW: recently opened + haiku widget ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.62fr', gap: 16, paddingBottom: 40 }}>

              {/* LEFT — Recently opened */}
              <div className="hb-card" style={{ padding: 18 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Recently opened</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10.5,
                    color: 'var(--ink-faint)',
                    letterSpacing: '.06em',
                  }}>
                    ↺ last 7 days
                  </span>
                </div>

                {[
                  {
                    icon: 'bug' as IconName,
                    href: '/sdlc/05-testing',
                    title: 'Debugging a flaky Postgres deadlock',
                    meta: 'Backend · 7min · #postgres #incident',
                    time: 'yesterday',
                  },
                  {
                    icon: 'leaf' as IconName,
                    href: '/sdlc/01-ideation',
                    title: 'Writing clear commit messages',
                    meta: 'SDLC · 4min · #git',
                    time: '2 days ago',
                  },
                  {
                    icon: 'layers' as IconName,
                    href: '/codebase-understanding/03-architecture',
                    title: 'Component lifecycle patterns',
                    meta: 'Codebase · 6min · #react',
                    time: '3 days ago',
                  },
                ].map((row, i) => (
                  <Link key={i} href={row.href} style={{ textDecoration: 'none' }}>
                    <div className="hb-recent-row">
                      <div className="hb-recent-row__icon">
                        <Icon name={row.icon} size={15} color="var(--rose-deep)" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="hb-recent-row__title">{row.title}</div>
                        <div className="hb-recent-row__meta">{row.meta}</div>
                      </div>
                      <div className="hb-recent-row__time">{row.time}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* RIGHT — Haiku / Today widget */}
              <div className="hb-haiku-card" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Decorative sakura branch */}
                <div style={{
                  position: 'absolute',
                  right: -30,
                  bottom: -20,
                  width: 180,
                  height: 130,
                  opacity: 0.35,
                  pointerEvents: 'none',
                  transform: 'scale(0.5)',
                  transformOrigin: 'bottom right',
                }}>
                  <SakuraBranch flip />
                </div>

                <div className="hb-haiku-card__label">
                  <span className="hb-dot hb-dot--rose" />
                  TODAY · 立夏
                </div>

                <div className="hb-haiku-card__text">
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    color: 'var(--ink)',
                    marginBottom: 10,
                  }}>
                    A small thing to tend
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    Your draft on migration/rookie is 2 steps from finished.
                  </div>
                </div>

                <Link href="/feature-development/01-understand" className="hb-haiku-card__cta">
                  → continue path
                </Link>
              </div>
            </div>
          </div>
        </div>

        <MobileBottomNav />
      </div>
    </div>
  )
}
