import { compileMDX } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/mdx-components'

export async function renderMdx(raw: string) {
  return compileMDX({
    source: raw,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  })
}
