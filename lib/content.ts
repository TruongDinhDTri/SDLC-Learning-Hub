// Thin adapter — no more MDX, no more filesystem reads.
// All content lives in hub-content.ts as typed TypeScript objects.

export interface SearchEntry {
  title: string
  slug: string
  description?: string
  hub: string
}

export const HUB_DEFS = [
  {
    id: 'sdlc',
    title: 'SDLC',
    description: 'From idea to production — a verified 9-phase engineering lifecycle',
    accent: 'sage',
    icon: 'git',
    phases: [
      { slug: '01-ideation',           title: 'Ideation & Requirements', status: 'growing' as const },
      { slug: '02-system-design',       title: 'System Design',           status: 'growing' as const },
      { slug: '03-technical-planning',  title: 'UI/UX Design',            status: 'growing' as const },
      { slug: '04-development',         title: 'Database Design',         status: 'growing' as const },
      { slug: '05-testing',             title: 'Backend Implementation',  status: 'growing' as const },
      { slug: '06-deployment',          title: 'Frontend Implementation', status: 'growing' as const },
      { slug: '07-monitoring',          title: 'Testing & QA',            status: 'growing' as const },
      { slug: '08-documentation',       title: 'Deploy & Launch',         status: 'growing' as const },
      { slug: '09-maintenance',         title: 'Maintenance & Iteration', status: 'growing' as const },
    ],
  },
  {
    id: 'codebase-understanding',
    title: 'Codebase Understanding',
    description: 'How to read, navigate and deeply understand any codebase',
    accent: 'sky',
    icon: 'eye',
    phases: [
      { slug: '01-orient',          title: 'Orient Yourself',        status: 'growing' as const },
      { slug: '02-entry-points',    title: 'Find Entry Points',      status: 'growing' as const },
      { slug: '03-architecture',    title: 'Understand Architecture', status: 'growing' as const },
      { slug: '04-data-flow',       title: 'Trace Data Flow',        status: 'growing' as const },
      { slug: '05-dependencies',    title: 'Map Dependencies',       status: 'seed' as const },
      { slug: '06-tests',           title: 'Read the Tests',         status: 'seed' as const },
      { slug: '07-dev-environment', title: 'Dev Environment',        status: 'seed' as const },
      { slug: '08-domain-language', title: 'Domain Language',        status: 'seed' as const },
      { slug: '09-conventions',     title: 'Team Conventions',       status: 'seed' as const },
      { slug: '10-pain-points',     title: 'Pain Points',            status: 'seed' as const },
      { slug: '11-mental-model',    title: 'Mental Model',           status: 'seed' as const },
    ],
  },
  {
    id: 'feature-development',
    title: 'Feature Development',
    description: 'Enterprise feature lifecycle from requirements to shipping',
    accent: 'peach',
    icon: 'sparkle',
    phases: [
      { slug: '01-understand', title: 'Understand Requirements', status: 'growing' as const },
      { slug: '02-design',     title: 'Design the Solution',     status: 'growing' as const },
      { slug: '03-plan',       title: 'Plan Implementation',     status: 'growing' as const },
      { slug: '04-implement',  title: 'Implement',               status: 'growing' as const },
      { slug: '05-test',       title: 'Test',                    status: 'seed' as const },
      { slug: '06-review',     title: 'Code Review',             status: 'seed' as const },
      { slug: '07-deploy',     title: 'Deploy',                  status: 'seed' as const },
      { slug: '08-monitor',    title: 'Monitor',                 status: 'seed' as const },
      { slug: '09-refactor',   title: 'Refactor & Document',     status: 'seed' as const },
    ],
  },
]

export function getAllSlugs(): string[][] {
  const slugs: string[][] = []
  for (const hub of HUB_DEFS) {
    slugs.push([hub.id])
    for (const phase of hub.phases) {
      slugs.push([hub.id, phase.slug])
    }
  }
  return slugs
}

export function getSearchEntries(): SearchEntry[] {
  const entries: SearchEntry[] = []
  for (const hub of HUB_DEFS) {
    entries.push({ title: hub.title, slug: `/${hub.id}`, description: hub.description, hub: hub.title })
    for (const phase of hub.phases) {
      entries.push({ title: phase.title, slug: `/${hub.id}/${phase.slug}`, hub: hub.title })
    }
  }
  return entries
}
