import { getAllSlugs } from '@/lib/content'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({
    hub: slug[0],
    slug: slug.slice(1).length > 0 ? slug.slice(1) : undefined,
  }))
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
