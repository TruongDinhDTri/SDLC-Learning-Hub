import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ContentFrontmatter {
  title: string
  order?: number
  status?: 'seed' | 'growing' | 'mature'
  tags?: string[]
  lastUpdated?: string
  description?: string
  accent?: string
  [key: string]: unknown
}

export interface ContentNode {
  id: string
  slug: string[]
  title: string
  frontmatter: ContentFrontmatter
  children: ContentNode[]
  hasContent: boolean
}

const CONTENT_DIR = path.join(process.cwd(), 'content')

function readFrontmatter(filePath: string): ContentFrontmatter {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return {
    title: path.basename(filePath, '.mdx').replace(/-/g, ' '),
    ...data,
  } as ContentFrontmatter
}

function buildTree(dir: string, slugPrefix: string[] = []): ContentNode[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const nodes: ContentNode[] = []

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'index.mdx') continue
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const slug = [...slugPrefix, entry.name]
      const indexPath = path.join(entryPath, 'index.mdx')
      const hasFm = fs.existsSync(indexPath)
      const fm = hasFm ? readFrontmatter(indexPath) : { title: entry.name.replace(/-/g, ' ') }
      nodes.push({
        id: slug.join('/'),
        slug,
        title: fm.title,
        frontmatter: fm as ContentFrontmatter,
        children: buildTree(entryPath, slug),
        hasContent: hasFm,
      })
    } else if (entry.name.endsWith('.mdx')) {
      const baseName = entry.name.replace(/\.mdx$/, '')
      const slug = [...slugPrefix, baseName]
      const fm = readFrontmatter(entryPath)
      nodes.push({
        id: slug.join('/'),
        slug,
        title: fm.title,
        frontmatter: fm,
        children: [],
        hasContent: true,
      })
    }
  }

  return nodes.sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99))
}

export function getHubs(): ContentNode[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter(d => d.isDirectory())

  return dirs.map(d => {
    const slug = [d.name]
    const indexPath = path.join(CONTENT_DIR, d.name, 'index.mdx')
    const fm = fs.existsSync(indexPath)
      ? readFrontmatter(indexPath)
      : { title: d.name.replace(/-/g, ' ') }
    return {
      id: d.name,
      slug,
      title: fm.title,
      frontmatter: fm as ContentFrontmatter,
      children: buildTree(path.join(CONTENT_DIR, d.name), slug),
      hasContent: fs.existsSync(indexPath),
    }
  })
}

export function getAllSlugs(): string[][] {
  function collect(nodes: ContentNode[]): string[][] {
    return nodes.flatMap(n => [n.slug, ...collect(n.children)])
  }
  return collect(getHubs())
}

export function getContentBySlug(slug: string[]): { frontmatter: ContentFrontmatter; raw: string } | null {
  const candidates = [
    path.join(CONTENT_DIR, ...slug) + '.mdx',
    path.join(CONTENT_DIR, ...slug, 'index.mdx'),
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const { data, content } = matter(fs.readFileSync(p, 'utf-8'))
      return {
        frontmatter: { title: slug[slug.length - 1].replace(/-/g, ' '), ...data } as ContentFrontmatter,
        raw: content,
      }
    }
  }
  return null
}
