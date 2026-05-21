import { getHubs, getSearchEntries } from '@/lib/content'
import { HubCard } from '@/components/dashboard/HubCard'
import { StatCard } from '@/components/dashboard/StatCard'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { HorizonBand } from '@/components/decorations/HorizonBand'
import { SakuraBranch } from '@/components/decorations/SakuraBranch'
import type { TreeItem } from '@/components/layout/TreeNode'
import type { ContentNode } from '@/lib/content'

function toTreeItems(nodes: ContentNode[]): TreeItem[] {
  return nodes.map(node => ({
    id: node.id,
    label: node.title,
    status: node.frontmatter.status ?? 'seed',
    href: '/' + node.slug.join('/'),
    children: toTreeItems(node.children),
  }))
}

function countAllNodes(nodes: ContentNode[]): number {
  return nodes.reduce((acc, n) => acc + 1 + countAllNodes(n.children), 0)
}

export default function Dashboard() {
  const hubs = getHubs()
  const tree = toTreeItems(hubs)
  const searchEntries = getSearchEntries()
  const totalEntries = hubs.reduce((acc, h) => acc + countAllNodes(h.children), 0)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar tree={tree} searchEntries={searchEntries} />

      <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
        <TopBar breadcrumb={[{ label: 'Garden' }]} title="おかえり" />

        <div style={{ padding: '28px 32px', position: 'relative' }}>
          {/* Decorative sakura branch — top right */}
          <div style={{
            position: 'absolute',
            top: -20,
            right: 0,
            width: 360,
            pointerEvents: 'none',
            zIndex: 0,
          }}>
            <SakuraBranch />
          </div>

          {/* Hero scene */}
          <div style={{
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            marginBottom: 24,
            height: 180,
            position: 'relative',
            boxShadow: 'var(--shadow-md)',
            zIndex: 1,
          }}>
            <HorizonBand style={{ width: '100%', height: '100%' }} />
            <div style={{
              position: 'absolute',
              left: 24,
              bottom: 18,
              fontFamily: 'var(--font-hand)',
              color: 'white',
              fontSize: 22,
              lineHeight: 1.2,
              textShadow: '0 1px 6px rgba(0,40,60,.45)',
            }}>
              Welcome back to the garden
            </div>
          </div>

          {/* Stat cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginBottom: 28,
            position: 'relative',
            zIndex: 1,
          }}>
            <StatCard label="Total entries" value={totalEntries} icon="book" accent="peach" />
            <StatCard label="Active hubs" value={hubs.length} icon="layers" accent="sage" />
            <StatCard label="Last updated" value="Today" icon="clock" accent="sky" />
          </div>

          {/* Hub cards */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--ink)',
              margin: '0 0 14px',
            }}>
              Knowledge Hubs
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}>
              {hubs.map(hub => (
                <HubCard
                  key={hub.id}
                  title={hub.frontmatter.title ?? hub.title}
                  description={hub.frontmatter.description ?? ''}
                  accent={(hub.frontmatter.accent as string) ?? 'sage'}
                  entryCount={countAllNodes(hub.children)}
                  href={'/' + hub.slug.join('/')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
