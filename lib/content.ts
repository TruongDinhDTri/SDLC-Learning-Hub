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
      { slug: '01-orient',            title: 'Orient Yourself',          status: 'growing' as const },
      { slug: '02-entry-points',      title: 'Find Entry Points',        status: 'growing' as const },
      { slug: '03-architecture',      title: 'Map the Architecture',     status: 'growing' as const },
      { slug: '04-data-flow',         title: 'Trace Real Flows',         status: 'growing' as const },
      { slug: '05-data-model',        title: 'Understand Data Model',    status: 'growing' as const },
      { slug: '06-run-system',        title: 'Run the System',           status: 'growing' as const },
      { slug: '07-failure-paths',     title: 'Study Failure Paths',      status: 'growing' as const },
      { slug: '08-module-boundaries', title: 'Module Boundaries',        status: 'growing' as const },
      { slug: '09-tests',             title: 'Read the Tests',           status: 'growing' as const },
      { slug: '10-operations',        title: 'Operations & Deployment',  status: 'growing' as const },
      { slug: '11-mental-model',      title: 'Create Your System Map',   status: 'growing' as const },
    ],
  },
  {
    id: 'feature-development',
    title: 'Feature Development',
    description: 'The complete lifecycle for building features — from understanding to mastery',
    accent: 'peach',
    icon: 'sparkle',
    phases: [
      { slug: '00-intro',             title: "The Builder's Lifecycle",      status: 'growing' as const },
      { slug: '01-understand',        title: 'Understand the Feature',       status: 'growing' as const },
      { slug: '02-analyze-impact',    title: 'Analyze System Impact',        status: 'growing' as const },
      { slug: '03-design',            title: 'Design the Solution',          status: 'growing' as const },
      { slug: '04-vertical-slices',   title: 'Slice Vertically',             status: 'growing' as const },
      { slug: '05-ordering-slices',   title: 'Identify & Order Slices',      status: 'growing' as const },
      { slug: '06-execution-loop',    title: 'The Execution Loop',           status: 'growing' as const },
      { slug: '07-done-gate',         title: 'The Done Gate',                status: 'growing' as const },
      { slug: '08-test',              title: 'Test Deeply',                  status: 'growing' as const },
      { slug: '09-deploy',            title: 'Deploy Safely',                status: 'growing' as const },
      { slug: '10-observe',           title: 'Observe in Production',        status: 'growing' as const },
      { slug: '11-refine',            title: 'Refine & Improve',             status: 'growing' as const },
      { slug: '12-hidden-curriculum', title: 'The Hidden Curriculum',        status: 'growing' as const },
      { slug: '13-practice',          title: 'Practice Exercises',           status: 'growing' as const },
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
