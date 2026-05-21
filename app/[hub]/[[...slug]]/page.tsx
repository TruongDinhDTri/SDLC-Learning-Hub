import { notFound } from 'next/navigation'
import { getHubs, getContentBySlug, getAllSlugs } from '@/lib/content'
import { renderMdx } from '@/lib/mdx'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { Chip } from '@/components/ui/Chip'
import { StatusBadge } from '@/components/mdx/StatusBadge'
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

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({
    hub: slug[0],
    slug: slug.slice(1).length > 0 ? slug.slice(1) : undefined,
  }))
}

interface PageProps {
  params: Promise<{ hub: string; slug?: string[] }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { hub, slug } = await params
  const fullSlug = [hub, ...(slug ?? [])]

  const data = getContentBySlug(fullSlug)
  if (!data) notFound()

  const hubs = getHubs()
  const tree = toTreeItems(hubs)
  const { content } = await renderMdx(data.raw)
  const fm = data.frontmatter

  // Build breadcrumb from slug segments
  const breadcrumb = fullSlug.map((part, i) => ({
    label: part.replace(/-/g, ' '),
    href: i < fullSlug.length - 1 ? '/' + fullSlug.slice(0, i + 1).join('/') : undefined,
  }))

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar tree={tree} currentPath={'/' + fullSlug.join('/')} />

      <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
        <TopBar breadcrumb={breadcrumb} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px' }}>
          {/* Main content */}
          <div style={{ padding: '32px 40px', maxWidth: 820 }}>
            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <StatusBadge status={fm.status ?? 'seed'} />
              {fm.tags?.map(tag => (
                <Chip key={tag}>#{tag}</Chip>
              ))}
            </div>

            {/* Title with underline highlight */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 30,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.3,
              margin: '0 0 8px',
            }}>
              <span className="hb-underline">{fm.title}</span>
            </h1>

            {fm.lastUpdated && (
              <p style={{ fontSize: 12, color: 'var(--ink-faint)', margin: '0 0 28px' }}>
                Last updated: {fm.lastUpdated}
              </p>
            )}

            {/* MDX content */}
            <div>{content}</div>

            {/* Prev/Next placeholder */}
            <div style={{
              marginTop: 48,
              paddingTop: 20,
              borderTop: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              color: 'var(--ink-faint)',
            }}>
              <a href="/" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>← Back to garden</a>
            </div>
          </div>

          {/* Right TOC */}
          <div style={{
            padding: '32px 20px',
            borderLeft: '1px solid var(--line)',
            position: 'sticky',
            top: 52,
            height: 'calc(100vh - 52px)',
            overflowY: 'auto',
          }}>
            <div style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: 'var(--ink-faint)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 10,
            }}>
              In this article
            </div>
            {fm.description && (
              <p style={{ fontSize: 12, color: 'var(--ink-faint)', lineHeight: 1.5 }}>
                {fm.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
