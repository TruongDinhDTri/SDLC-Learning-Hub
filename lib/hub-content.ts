export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; kanji?: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'bullets'; items: string[] }
  | { type: 'ordered'; items: string[] }
  | { type: 'callout'; kind: 'tip' | 'note' | 'warn' | 'quote' | 'danger' | 'success'; title?: string; text: string; items?: string[] }
  | { type: 'step'; n: number; title: string; summary?: string; done?: boolean; content: ContentBlock[] }
  | { type: 'code'; lang: string; code: string }
  | { type: 'checklist'; items: { label: string; done?: boolean }[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'rc-table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'mindset'; rows: { junior: string; senior: string }[] }
  | { type: 'wisdom'; body: string }
  | { type: 'pull-quote'; text: string; attribution?: string }
  | { type: 'blockquote'; text: string; attribution?: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'key-term'; term: string; kana?: string; def: string; see?: string }
  | { type: 'drop-cap'; first: string; text: string }
  | { type: 'figure'; label: string; figNum?: number; description?: string; diagramContent?: string }
  | { type: 'deadlock-diagram'; caption?: string }
  | { type: 'diff'; filename: string; hunks: Array<{ k?: '+' | '-' | ' '; t: string }> }
  | { type: 'prereq'; title?: string; items: Array<{ text: string; done?: boolean }> }
  | { type: 'do-dont'; doLabel?: string; dontLabel?: string; doCode?: string; dontCode?: string; doCaption?: string; dontCaption?: string }
  | { type: 'terminal'; filename?: string; lines: Array<string | { k: 'err' | 'ok' | 'dim' | 'out'; t: string }> }
  | { type: 'code-file'; filename?: string; language?: string; lines: string[]; highlight?: number[] }
  | { type: 'numbered-callout'; num: number | string; variant?: 'rose' | 'sage' | 'peach' | 'sun'; heading: string; body: string }
  | { type: 'footnotes'; items: string[] }

export interface HubPage {
  hub: string
  slug: string
  title: string
  subtitle: string
  duration?: string
  tags: string[]
  status: 'seed' | 'growing' | 'mature'
  description: string
  icon: string
  content: ContentBlock[]
}

export interface Hub {
  id: string
  title: string
  description: string
  accent: string
  icon: string
  kanji: string
  phases: HubPage[]
}

// ---------------------------------------------------------------------------
// SDLC PHASES
// ---------------------------------------------------------------------------

const sdlcPhases: HubPage[] = [
  {
    hub: 'sdlc',
    slug: '01-ideation',
    title: 'Phase 1: Ideation & Requirements',
    subtitle: 'Transform a vague idea into concrete, actionable requirements',
    duration: '2-3 days',
    tags: ['requirements', 'product', 'planning'],
    status: 'growing',
    description: 'This is the phase most solo developers SKIP — and exactly why they freeze when projects get complex.',
    icon: 'lightbulb',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"What am I building, for whom, solving what problem?"',
      },
      {
        type: 'p',
        text: 'Transform a vague idea into concrete, actionable requirements. This is the phase most solo developers SKIP — and exactly why they freeze when projects get complex.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Problem Statement',
        summary: 'What problem does this app solve?',
        content: [
          { type: 'p', text: 'Define clearly what problem this app solves. Without a clear problem statement, every downstream decision becomes guesswork.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Target Users',
        summary: 'Who uses it? (yourself? others?) This affects every decision downstream.',
        content: [
          { type: 'p', text: 'Identify who will use the app. This affects every single decision downstream — from UI complexity to API design.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Core Features (MoSCoW)',
        summary: 'Must / Should / Could / Won\'t have. Keep Must to 3-5 items max.',
        content: [
          { type: 'p', text: 'Classify features into Must / Should / Could / Won\'t have. Keep Must to 3-5 items max.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'User Stories',
        summary: 'Format: "As a [role], I want [action], so that [benefit]"',
        content: [
          { type: 'p', text: 'Write user stories in the format: "As a [role], I want [action], so that [benefit]". These become your acceptance criteria.' },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'MVP Scope',
        summary: 'Only 2-3 core features. Do NOT build everything. Solo devs die here.',
        content: [
          { type: 'p', text: 'Define the Minimum Viable Product — only 2-3 core features. Solo devs die by trying to build everything at once.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['Product Thinking', 'Understand what to build and why'],
          ['Problem Decomposition', 'Break big ideas into small, buildable pieces'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['Notion — Requirements docs, feature lists', 'Excalidraw — Quick sketches, brainstorming', 'Linear — Task/issue tracking'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (3 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['PRD (Product Requirements Document)', 'Product description: problem, users, features, MVP scope, success metrics'],
          ['User Stories Document', 'List of user stories: "As [role], I want [action], so that [benefit]"'],
          ['MoSCoW Feature List', 'Feature classification table: Must / Should / Could / Won\'t have'],
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '02-system-design',
    title: 'Phase 2: System Design',
    subtitle: 'Draw the blueprint — how FE, BE, DB, and external APIs connect',
    duration: '2-4 days',
    tags: ['architecture', 'system-design', 'api'],
    status: 'growing',
    description: 'Like an architecture plan before building a house.',
    icon: 'blueprint',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"What does the system look like and how do parts communicate?"',
      },
      {
        type: 'p',
        text: 'Draw the blueprint — how FE, BE, DB, and external APIs connect. Like an architecture plan before building a house.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Architecture Diagram',
        summary: 'User -> FE -> BE -> DB -> External APIs',
        content: [
          { type: 'p', text: 'Map the full system: User → FE → BE → DB → External APIs. This is your north star for every implementation decision.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Choose Tech Stack',
        summary: 'Language, framework, hosting for each component',
        content: [
          { type: 'p', text: 'Choose the language, framework, and hosting for each component. Document why each was chosen.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'API Design',
        summary: 'Endpoints, methods, request/response formats',
        content: [
          { type: 'p', text: 'Define endpoints, HTTP methods, request and response formats. A clean API contract prevents frontend/backend conflicts.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Data Flow',
        summary: 'How data moves through the system',
        content: [
          { type: 'p', text: 'Map how data moves through the system — from user input through services to persistence.' },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Integration Points',
        summary: 'External APIs, third-party services. Keep it simple for V1.',
        content: [
          { type: 'p', text: 'Identify external API and third-party service integration points. Keep it simple for V1 — add complexity only when needed.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['System Design basics', 'Understand how components fit together'],
          ['API Design', 'Define clean contracts between FE and BE'],
          ['Data Modeling', 'Know how data flows and gets stored'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['Excalidraw — Architecture diagrams', 'dbdiagram.io — Quick DB schema visualization', 'Swagger / OpenAPI — API specification'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (4 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['Architecture Diagram', 'Overall diagram: FE, BE, DB, external APIs, how they connect'],
          ['Tech Stack Decision Record', 'Why each technology was chosen + alternatives considered'],
          ['API Specification (OpenAPI/Swagger)', 'Endpoints, methods, request/response format, auth'],
          ['Data Flow Diagram', 'Where data comes from -> where it goes -> through which services'],
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '03-technical-planning',
    title: 'Phase 3: UI/UX Design',
    subtitle: 'Design layout, components, and user flow BEFORE coding',
    duration: '3-5 days',
    tags: ['ui', 'ux', 'design', 'wireframes'],
    status: 'growing',
    description: 'Skipping this = messy frontend, constant refactoring.',
    icon: 'figma',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"What does the app look like and how does the user navigate it?"',
      },
      {
        type: 'p',
        text: 'Design layout, components, and user flow BEFORE coding. Skipping this = messy frontend, constant refactoring.',
      },
      {
        type: 'step',
        n: 1,
        title: 'User Flow',
        summary: 'Map the journey: Login -> Dashboard -> Detail -> Action -> Result',
        content: [
          { type: 'p', text: 'Map the complete user journey: Login → Dashboard → Detail → Action → Result. Every screen should have a clear purpose.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Wireframe (Lo-fi)',
        summary: 'Sketch on paper or Excalidraw. Doesn\'t need to be pretty — just show what goes where.',
        content: [
          { type: 'p', text: 'Sketch on paper or Excalidraw. Doesn\'t need to be pretty — just show what goes where. Speed matters more than aesthetics at this stage.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Component List',
        summary: 'Every UI component needed (cards, forms, tables, nav...)',
        content: [
          { type: 'p', text: 'List every UI component needed: cards, forms, tables, navigation, modals. This becomes your frontend build checklist.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Design System',
        summary: '2-3 main colors, 1 heading font, 1 body font, spacing grid',
        content: [
          { type: 'p', text: 'Define 2-3 main colors, 1 heading font, 1 body font, spacing grid. A minimal design system prevents visual inconsistency.' },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Mockup (optional)',
        summary: 'Higher fidelity in Figma or AI-generated prototypes',
        content: [
          { type: 'p', text: 'Optional: Create higher-fidelity mockups in Figma or with AI-generated prototypes. Useful for complex UIs or team review.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['Basic UI/UX', 'Understand user-centered design principles'],
          ['Wireframing', 'Translate ideas into visual layouts quickly'],
          ['Design Systems', 'Create consistent visual language'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['Figma — Design mockups and prototypes', 'Excalidraw — Quick wireframes', 'Coolors.co — Color palette generation'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (4 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['User Flow Diagram', 'Steps the user takes from opening app -> completing their goal'],
          ['Wireframes (Lo-fi & Hi-fi)', 'Layout sketches per page: header, sidebar, main content placement'],
          ['Component Inventory', 'List of all UI components to build + functional description'],
          ['Design System / Style Guide', 'Colors, typography, spacing, border-radius, shadows — all visual rules'],
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '04-development',
    title: 'Phase 4: Database Design',
    subtitle: 'Design tables, columns, and relationships before coding the backend',
    duration: '1-2 days',
    tags: ['database', 'schema', 'sql'],
    status: 'growing',
    description: 'Good schema = easy backend code. Bad schema = pain forever.',
    icon: 'database',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"What data do I store and how is it related?"',
      },
      {
        type: 'p',
        text: 'Design tables, columns, and relationships. Good schema = easy backend code. Bad schema = pain forever. Do this BEFORE coding the backend.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Entities',
        summary: 'Identify all data objects (User, Product, Order, etc.)',
        content: [
          { type: 'p', text: 'Identify all data objects: User, Product, Order, Payment, etc. These are the nouns of your system.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'ER Diagram',
        summary: 'Map relationships: 1-to-1, 1-to-many, many-to-many',
        content: [
          { type: 'p', text: 'Map relationships: 1-to-1, 1-to-many, many-to-many. An ER diagram exposes business logic hidden in your data structure.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Schema Details',
        summary: 'Columns, data types, constraints, indexes per table',
        content: [
          { type: 'p', text: 'Define columns, data types, constraints, and indexes per table. Indexes on the wrong fields = slow queries forever.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Migration Strategy',
        summary: 'Version control for DB changes (e.g., Alembic, Prisma Migrate)',
        content: [
          { type: 'p', text: 'Set up version control for DB changes using Alembic, Prisma Migrate, or similar. Never modify production DB without a migration file.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['Database Design', 'Structure data correctly from the start'],
          ['SQL', 'Query and manipulate relational data'],
          ['Normalization', 'Avoid redundancy, maintain data integrity'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['dbdiagram.io — Visual schema design', 'DBeaver — Database management GUI', 'Alembic / Prisma Migrate — DB migration management'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (3 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['ER Diagram', 'Entity relationship diagram: 1-1, 1-N, N-N relationships'],
          ['Schema Definition', 'Detailed per-table: columns, data types, constraints, indexes'],
          ['Migration Plan', 'Table creation order, seed data, rollback strategy'],
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '05-testing',
    title: 'Phase 5: Backend Implementation',
    subtitle: 'Build APIs, business logic, and data pipelines',
    duration: '1-2 weeks',
    tags: ['backend', 'api', 'implementation'],
    status: 'growing',
    description: 'This is where the core functionality lives.',
    icon: 'server',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"How does the server handle requests and process data?"',
      },
      {
        type: 'p',
        text: 'Build APIs, business logic, data pipelines. This is where the core functionality lives.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Project Setup',
        summary: 'Init framework, folder structure, env config, DB connection',
        content: [
          { type: 'p', text: 'Initialize the framework, define folder structure, configure environment variables, and establish DB connection. Get the foundation right.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'CRUD APIs',
        summary: 'Core endpoints for each entity',
        content: [
          { type: 'p', text: 'Build the core Create/Read/Update/Delete endpoints for each entity defined in Phase 4.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'External Integrations',
        summary: 'Third-party API connections',
        content: [
          { type: 'p', text: 'Connect to third-party APIs defined in Phase 2. Abstract integrations behind service interfaces for easier testing and swapping.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Business Logic / Pipelines',
        summary: 'Core processing (ML, calculations, etc.)',
        content: [
          { type: 'p', text: 'Build the core processing logic — ML pipelines, calculations, transformations. This is the intellectual core of the system.' },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Testing',
        summary: 'Unit tests + integration tests',
        content: [
          { type: 'p', text: 'Write unit tests and integration tests as you build. Tests prevent regression and document expected behavior.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['Python (or chosen BE language)', 'Write server-side code'],
          ['REST API', 'Build clean, predictable endpoints'],
          ['ML basics (if applicable)', 'Build prediction/processing pipelines'],
          ['Testing', 'Ensure code works correctly'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['FastAPI / Express / Django — Web framework', 'SQLAlchemy / Prisma — ORM', 'pytest / Jest — Testing', 'Docker — Containerization'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (4 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['README.md', 'Setup guide: how to install, run locally, required env variables'],
          ['API Documentation (auto-gen)', 'Auto-generated docs (e.g., FastAPI /docs endpoint) — keep updated'],
          ['Code Architecture Notes', 'Folder structure, naming conventions, patterns used'],
          ['Test Coverage Report', 'How much code is covered by tests, critical paths tested'],
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '06-deployment',
    title: 'Phase 6: Frontend Implementation',
    subtitle: 'Build the UI according to the design. Connect with backend APIs.',
    duration: '1-2 weeks',
    tags: ['frontend', 'react', 'ui', 'implementation'],
    status: 'growing',
    description: 'Turn the design from Phase 3 into a working interface.',
    icon: 'monitor',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"How do I turn the design into a working interface?"',
      },
      {
        type: 'p',
        text: 'Build the UI according to Phase 3 design. Connect with backend APIs.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Project Setup',
        summary: 'Init framework (Vite + React, Next.js, etc.), styling, routing',
        content: [
          { type: 'p', text: 'Initialize the frontend framework (Vite + React, Next.js, etc.), set up styling, and configure routing.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Build Components',
        summary: 'Follow the component list from Phase 3',
        content: [
          { type: 'p', text: 'Build each component from the Component Inventory created in Phase 3. Work top-down: layout → pages → components.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'State Management',
        summary: 'Server state (React Query/SWR) + client state (Zustand/Redux). Don\'t overengineer.',
        content: [
          { type: 'p', text: 'Implement server state (React Query/SWR) and client state (Zustand/Redux). Don\'t overengineer — start simple and add complexity only when needed.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'API Integration',
        summary: 'Connect to backend endpoints, handle loading/error states',
        content: [
          { type: 'p', text: 'Connect to backend endpoints. Handle loading, error, and empty states explicitly — never leave users staring at a blank screen.' },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Polish',
        summary: 'Responsive design, loading states, error handling, animations',
        content: [
          { type: 'p', text: 'Add responsive design, smooth loading states, error handling, and tasteful animations. Polish is what separates hobby projects from professional ones.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['React (or chosen FE framework)', 'Build interactive UIs'],
          ['Tailwind / CSS', 'Style components'],
          ['API consumption', 'Fetch and display data from BE'],
          ['State management', 'Manage data flow in the UI'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['React + Vite — Fast FE dev setup', 'TailwindCSS — Utility-first styling', 'React Query / TanStack Query — Server state management', 'Recharts / Chart.js — Data visualization'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (3 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['Component Storybook / Docs', 'Document each component: props, usage, variants'],
          ['State Management Map', 'Diagram: what data lives where (server state vs client state)'],
          ['FE README.md', 'Setup guide, folder structure, coding conventions for FE'],
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '07-monitoring',
    title: 'Phase 7: Testing & QA',
    subtitle: 'Test the full flow, edge cases, performance, and security',
    duration: '3-5 days',
    tags: ['testing', 'qa', 'security', 'performance'],
    status: 'growing',
    description: 'This phase determines whether the app feels amateur or professional.',
    icon: 'shield',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"Does everything work correctly, even in unexpected situations?"',
      },
      {
        type: 'p',
        text: 'Test the full flow, edge cases, performance, and security. This phase determines whether the app feels amateur or professional.',
      },
      {
        type: 'step',
        n: 1,
        title: 'E2E Testing',
        summary: 'Full user flow from signup to core action',
        content: [
          { type: 'p', text: 'Test the full user flow from signup through core actions. Automated E2E tests catch regressions before users do.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Edge Cases',
        summary: 'What if API is down? Invalid input? Empty data? Expired session?',
        content: [
          { type: 'p', text: 'Test edge cases: API down, invalid input, empty data, expired session. Real users will hit every combination imaginable.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Performance',
        summary: 'API response time, FE load speed, query optimization, lazy loading',
        content: [
          { type: 'p', text: 'Measure API response time, FE load speed, query performance, and implement lazy loading where needed.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Security',
        summary: 'Input validation, SQL injection, CORS, rate limiting, auth checks',
        content: [
          { type: 'p', text: 'Check input validation, SQL injection prevention, CORS configuration, rate limiting, and authentication boundaries.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['Testing mindset', 'Think about what can go wrong'],
          ['Debugging', 'Trace and fix issues efficiently'],
          ['Security basics', 'Protect against common vulnerabilities'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['Playwright / Cypress — E2E testing', 'Lighthouse — Performance auditing', 'Postman — API testing'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (4 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['Test Plan', 'All test cases to run, organized by feature'],
          ['Bug Report Log', 'Bug tracking: severity, steps to reproduce, status'],
          ['Performance Benchmark', 'Measurements: API latency, FE load time, Lighthouse scores'],
          ['Security Checklist', 'OWASP top 10 items checked: XSS, CSRF, SQL injection...'],
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '08-documentation',
    title: 'Phase 8: Deploy & Launch',
    subtitle: 'Put the app on the internet. No deployment = the app doesn\'t exist.',
    duration: '2-3 days',
    tags: ['deployment', 'cicd', 'devops', 'launch'],
    status: 'growing',
    description: 'This is the finish line.',
    icon: 'rocket',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"How do I get this running in production and keep it running?"',
      },
      {
        type: 'p',
        text: 'Put the app on the internet. No deployment = the app doesn\'t exist. This is the finish line.',
      },
      {
        type: 'step',
        n: 1,
        title: 'CI/CD Pipeline',
        summary: 'Auto test + deploy on push to main (GitHub Actions)',
        content: [
          { type: 'p', text: 'Set up automated testing and deployment on push to main using GitHub Actions. Never deploy manually — automate it once and rely on it forever.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Deploy Backend',
        summary: 'Cloud platform (Railway, Render, AWS), DB, env vars, domain',
        content: [
          { type: 'p', text: 'Deploy backend to a cloud platform (Railway, Render, AWS). Configure DB, environment variables, and custom domain.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Deploy Frontend',
        summary: 'CDN/host (Vercel, Netlify), connect API, custom domain',
        content: [
          { type: 'p', text: 'Deploy frontend to a CDN/host (Vercel, Netlify). Connect to backend API URL and configure custom domain.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Monitoring',
        summary: 'Error tracking (Sentry), logging, health check endpoints',
        content: [
          { type: 'p', text: 'Set up error tracking (Sentry), structured logging, and health check endpoints. You cannot fix what you cannot see.' },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Launch!',
        summary: 'Share on LinkedIn, Twitter, Reddit. Collect feedback. Iterate.',
        content: [
          { type: 'p', text: 'Share on LinkedIn, Twitter, Reddit. Collect feedback. The cycle doesn\'t end here — it begins.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['DevOps basics', 'Understand servers, environments, deploys'],
          ['CI/CD', 'Automate the build-test-deploy pipeline'],
          ['Cloud deployment', 'Get apps running on cloud platforms'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['GitHub Actions — CI/CD automation', 'Railway / Render — Backend hosting', 'Vercel / Netlify — Frontend hosting', 'Sentry — Error monitoring'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (4 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['Deployment Guide', 'Step-by-step: how to deploy BE, FE, DB from scratch'],
          ['Environment Config', 'All env variables needed per environment (dev, staging, prod)'],
          ['CI/CD Pipeline Doc', 'Pipeline description: trigger -> build -> test -> deploy -> notify'],
          ['Runbook', 'Incident handling guide: app down, DB full, API errors...'],
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '09-maintenance',
    title: 'Phase 9: Maintenance & Iteration',
    subtitle: 'The app launching is NOT the end. 80% of a product\'s lifetime is spent here.',
    duration: 'Ongoing',
    tags: ['maintenance', 'monitoring', 'iteration', 'feedback'],
    status: 'growing',
    description: 'Collect feedback, fix bugs, add features, keep the app alive.',
    icon: 'refresh',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: '"How do I keep improving and maintaining this?"',
      },
      {
        type: 'p',
        text: 'The app launching is NOT the end. 80% of a product\'s lifetime is spent here. Collect feedback, fix bugs, add features, keep the app alive.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Bug Tracking & Fixing',
        summary: 'Collect bug reports from users + Sentry alerts. Prioritize: Critical > High > Medium > Low',
        content: [
          { type: 'p', text: 'Collect bug reports from users and Sentry alerts. Prioritize by severity: Critical > High > Medium > Low. Fix Critical immediately.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'User Feedback Loop',
        summary: 'Collect feedback via surveys, analytics, support. Turn feedback into prioritized feature requests.',
        content: [
          { type: 'p', text: 'Collect feedback via surveys, analytics, and support. Turn feedback into prioritized feature requests. Users know what they need — listen.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Performance Monitoring',
        summary: 'Track API response time, error rates, uptime. Set alerts for thresholds.',
        content: [
          { type: 'p', text: 'Track API response time, error rates, and uptime. Set alerts for threshold breaches. Don\'t wait for users to tell you the app is slow.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Feature Iteration',
        summary: 'Feedback -> plan new features -> go back to Phase 1 for that feature. This is the "cycle"!',
        content: [
          { type: 'p', text: 'Feedback → plan new features → go back to Phase 1. This is the cycle. Each iteration gets faster and cleaner.' },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Tech Debt & Refactoring',
        summary: 'V1 code will be ugly — OK. But schedule time to refactor and update dependencies.',
        content: [
          { type: 'p', text: 'V1 code will be ugly — that\'s OK. Schedule time to refactor incrementally and update dependencies before they rot.' },
        ],
      },
      {
        type: 'step',
        n: 6,
        title: 'Documentation Updates',
        summary: 'Update all docs when changes happen. Future you will thank present you.',
        content: [
          { type: 'p', text: 'Update all documentation when changes happen. Future you will thank present you.' },
        ],
      },
      {
        type: 'h2',
        text: 'Skills Needed',
      },
      {
        type: 'table',
        headers: ['Skill', 'Why'],
        rows: [
          ['Monitoring', 'Know when things break before users tell you'],
          ['Prioritization', 'Decide what to fix/build next'],
          ['Refactoring', 'Improve code quality incrementally'],
          ['User Research', 'Understand what users actually need'],
        ],
      },
      {
        type: 'h2',
        text: 'Tools',
      },
      {
        type: 'list',
        items: ['Sentry — Error tracking and alerting', 'Google Analytics — Usage analytics', 'GitHub Issues — Bug and feature tracking', 'Notion — Documentation and planning'],
      },
      {
        type: 'h2',
        text: 'Documentation Output (4 docs)',
      },
      {
        type: 'table',
        headers: ['Document', 'Description'],
        rows: [
          ['Changelog', 'Log every change by version: v1.0.1, v1.1.0... (semver)'],
          ['Feedback & Feature Backlog', 'All feedback + feature requests with priority'],
          ['Post-mortem Reports', 'After incidents: what happened, root cause, prevention'],
          ['Updated Documentation', 'All docs from Phase 1-8 updated with latest changes'],
        ],
      },
      {
        type: 'callout',
        kind: 'note',
        title: 'Important Reminder 1',
        text: 'The roadmap is a spiral, not a straight line. You will go forward, discover something missing, go back, fix it, and continue. That\'s normal.',
      },
      {
        type: 'callout',
        kind: 'note',
        title: 'Important Reminder 2',
        text: 'First time through will be messy. Good developers aren\'t people who never make mistakes — they\'re people who know which phase to go back to when problems arise.',
      },
      {
        type: 'callout',
        kind: 'note',
        title: 'Important Reminder 3',
        text: 'Solution Architect courses are NOT needed yet. SA is for people who\'ve completed many cycles and need to optimize at scale. Complete 2-3 full projects first, then SA becomes extremely valuable.',
      },
      {
        type: 'callout',
        kind: 'note',
        title: 'Important Reminder 4',
        text: 'Don\'t skip phases. The whole point is to build the muscle memory of going through every phase. Speed comes with repetition, not shortcuts.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// CODEBASE UNDERSTANDING PHASES
// ---------------------------------------------------------------------------


const codebasePhases: HubPage[] = [
  // =========================================================================
  // PHASE 1 — ORIENT YOURSELF
  // =========================================================================
  {
    hub: 'codebase-understanding',
    slug: '01-orient',
    title: 'Phase 1: Orient Yourself',
    subtitle: 'Understand what this system exists to do',
    duration: '2-3 hours',
    tags: ['orientation', 'purpose', 'tech-stack', 'architecture'],
    status: 'growing',
    description: 'Identify the purpose, tech stack, and architecture style of the system before touching any code.',
    icon: 'compass',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand what this system exists to do',
      },

      // ── STEP 1 ──────────────────────────────────────────────────────────
      {
        type: 'step',
        n: 1,
        title: 'Identify the Purpose of the System',
        summary: 'Understand what problem the system solves, who uses it, what business/domain it belongs to, what the main workflows are.',
        content: [
          {
            type: 'callout',
            kind: 'tip',
            title: 'Purpose',
            text: 'Understand what problem the system solves, who uses it, what business/domain it belongs to, what the main workflows are. Without this, code feels random.',
          },
          {
            type: 'h3',
            text: 'What To Look For',
          },
          {
            type: 'bullets',
            items: [
              'README.md',
              'docs/',
              'landing page',
              'API docs',
              'product pages',
              'issue tracker',
              'environment names',
              'package names',
            ],
          },
          {
            type: 'code-file',
            filename: 'questions-to-ask.txt',
            language: 'text',
            lines: [
              'What does this system do?',
              'Who are the users?',
              'What are the core features?',
              'What actions do users perform most?',
              'What business problem is being solved?',
            ],
          },
          {
            type: 'h3',
            text: 'Output You Should Produce',
          },
          {
            type: 'code-file',
            filename: 'your-output.txt',
            language: 'text',
            lines: [
              'This is a SaaS platform for X.',
              'Users can:',
              '- do A',
              '- do B',
              '- do C',
              '',
              'Main workflows:',
              '1. login',
              '2. create resource',
              '3. process payment',
              '4. notifications',
            ],
          },
        ],
      },

      // ── STEP 2 ──────────────────────────────────────────────────────────
      {
        type: 'step',
        n: 2,
        title: 'Identify the Tech Stack',
        summary: 'Understand languages, frameworks, and infrastructure. This tells you where things probably live, common patterns, likely conventions.',
        content: [
          {
            type: 'callout',
            kind: 'tip',
            title: 'Purpose',
            text: 'Understand languages, frameworks, and infrastructure (THIS IS REALLY IMPORTANT TO UNDERSTAND THE INFRASTRUCTURE OF THE SYSTEM), architecture style (THIS IS REALLY IMPORTANT TO UNDERSTAND THE ARCHITECTURE STYLE, THE SYSTEM DESIGN). This tells you where things probably live, common patterns, likely conventions.',
          },
          {
            type: 'h3',
            text: 'Frontend',
          },
          {
            type: 'p',
            text: 'Look for:',
          },
          {
            type: 'code-file',
            filename: 'frontend-indicators.txt',
            language: 'text',
            lines: [
              'package.json',
              'vite.config',
              'next.config',
              'webpack.config',
            ],
          },
          {
            type: 'p',
            text: 'Possible frameworks:',
          },
          {
            type: 'bullets',
            items: ['React', 'Vue', 'Angular', 'Next.js', 'Nuxt'],
          },
          {
            type: 'h3',
            text: 'Backend',
          },
          {
            type: 'p',
            text: 'Look for:',
          },
          {
            type: 'code-file',
            filename: 'backend-indicators.txt',
            language: 'text',
            lines: [
              'requirements.txt',
              'pyproject.toml',
              'manage.py',
              'pom.xml',
              'go.mod',
              'Gemfile',
            ],
          },
          {
            type: 'p',
            text: 'Possible frameworks:',
          },
          {
            type: 'bullets',
            items: ['Django', 'FastAPI', 'Express', 'Spring', 'Rails', 'Go Fiber'],
          },
          {
            type: 'h3',
            text: 'Infrastructure',
          },
          {
            type: 'callout',
            kind: 'warn',
            title: 'REALLY REALLY IMPORTANT',
            text: 'Infrastructure needs deep focus. Understanding the infrastructure of the system is critical.',
          },
          {
            type: 'p',
            text: 'Look for:',
          },
          {
            type: 'code-file',
            filename: 'infra-indicators.txt',
            language: 'text',
            lines: [
              'Dockerfile',
              'docker-compose.yml',
              'terraform/',
              'k8s/',
              '.github/workflows/',
            ],
          },
          {
            type: 'p',
            text: 'Possible technologies:',
          },
          {
            type: 'bullets',
            items: ['Docker', 'Kubernetes', 'AWS', 'Redis', 'RabbitMQ', 'Celery', 'Kafka'],
          },
          {
            type: 'h3',
            text: 'Output You Should Produce',
          },
          {
            type: 'code-file',
            filename: 'your-output.txt',
            language: 'text',
            lines: [
              'Frontend:',
              '- React + Vite',
              '',
              'Backend:',
              '- Django Rest Framework',
              '',
              'Database:',
              '- PostgreSQL',
              '',
              'Infra:',
              '- Docker',
              '- AWS S3',
              '- Redis',
              '- Celery',
            ],
          },
        ],
      },

      // ── STEP 3 ──────────────────────────────────────────────────────────
      {
        type: 'step',
        n: 3,
        title: 'Identify the Architecture Style',
        summary: 'Understand HOW the system is conceptually organized. This is where engineering starts becoming architecture.',
        content: [
          {
            type: 'callout',
            kind: 'tip',
            title: 'Purpose',
            text: 'Understanding how the system is architecturally shaped. Not just what technologies exist, but how the entire system is organized.',
          },
          {
            type: 'p',
            text: 'This helps you predict: where code lives, how components communicate, how scalable the system is, where bottlenecks exist, how failures propagate, how tightly coupled the system is, what engineering tradeoffs were made.',
          },
          {
            type: 'wisdom',
            body: 'This is where engineering starts becoming architecture.',
          },
          {
            type: 'h3',
            text: 'Important Distinction',
          },
          {
            type: 'rc-table',
            caption: 'Two different layers you now have',
            headers: ['Layer', 'Purpose'],
            rows: [
              ['Tech Stack', 'WHAT technologies/tools exist'],
              ['Architecture Style', 'HOW the system is organized'],
            ],
          },
          {
            type: 'h3',
            text: 'Example — Tech Stack',
          },
          {
            type: 'code-file',
            filename: 'tech-stack-example.txt',
            language: 'text',
            lines: [
              'React',
              'Django',
              'PostgreSQL',
              'Redis',
              'Docker',
            ],
          },
          {
            type: 'p',
            text: 'This tells you: WHAT tools exist.',
          },
          {
            type: 'h3',
            text: 'Example — Architecture Style',
          },
          {
            type: 'code-file',
            filename: 'architecture-style-example.txt',
            language: 'text',
            lines: [
              'Modular monolith',
              'REST API',
              'Async task processing',
              'Layered service architecture',
              'Stateless authentication',
              'Queue-based background jobs',
              'Redis caching',
            ],
          },
          {
            type: 'p',
            text: 'This tells you: HOW the system behaves. That distinction is HUGE.',
          },
        ],
      },

      // ── 7 DIMENSIONS (nested inside Phase 1 content) ────────────────────
      {
        type: 'h2',
        text: '7 Dimensions to Identify',
      },

      // Dimension 1
      {
        type: 'numbered-callout',
        num: 1,
        variant: 'sage',
        heading: 'System Shape',
        body: 'Understand the high-level structural pattern of the system.',
      },
      {
        type: 'bullets',
        items: [
          'monolith',
          'modular monolith',
          'microservices',
          'event-driven',
          'serverless',
          'layered architecture',
          'clean architecture',
          'hexagonal architecture',
          'CQRS',
          'domain-driven design (DDD)',
          'plugin-based',
          'service-oriented architecture (SOA)',
        ],
      },
      {
        type: 'code-file',
        filename: 'system-shape-questions.txt',
        language: 'text',
        lines: [
          'Is everything deployed together?',
          'Are modules isolated?',
          'Do services own their own databases?',
          'Is communication synchronous or async?',
          'Is business logic centralized or distributed?',
        ],
      },

      // Dimension 2
      {
        type: 'numbered-callout',
        num: 2,
        variant: 'peach',
        heading: 'Communication Style',
        body: 'Understand how different parts of the system talk to each other.',
      },
      {
        type: 'bullets',
        items: [
          'REST',
          'GraphQL',
          'WebSockets',
          'gRPC / RPC',
          'message queues',
          'pub/sub',
          'event streaming',
          'polling',
          'webhooks',
        ],
      },
      {
        type: 'code-file',
        filename: 'communication-questions.txt',
        language: 'text',
        lines: [
          'How does frontend communicate with backend?',
          'How do services communicate?',
          'How are async tasks triggered?',
          'What happens if communication fails?',
        ],
      },

      // Dimension 3
      {
        type: 'numbered-callout',
        num: 3,
        variant: 'rose',
        heading: 'State Management Style',
        body: 'Understand where the system stores truth. State management is one of the hardest parts of software architecture.',
      },
      {
        type: 'bullets',
        items: [
          'frontend state',
          'database',
          'Redis cache',
          'browser storage',
          'sessions',
          'distributed cache',
          'event streams',
          'object storage (S3)',
          'search indexes',
        ],
      },
      {
        type: 'code-file',
        filename: 'state-management-questions.txt',
        language: 'text',
        lines: [
          'What is the source of truth?',
          'What data is cached?',
          'What data is temporary?',
          'What data is eventually consistent?',
          'How is synchronization handled?',
        ],
      },

      // Dimension 4
      {
        type: 'numbered-callout',
        num: 4,
        variant: 'sun',
        heading: 'Processing Style',
        body: 'Understand HOW work is executed.',
      },
      {
        type: 'bullets',
        items: [
          'synchronous',
          'asynchronous',
          'queue-based',
          'event-driven',
          'eventually consistent',
          'batch-based',
          'stream-processing',
          'real-time',
        ],
      },
      {
        type: 'code-file',
        filename: 'processing-questions.txt',
        language: 'text',
        lines: [
          'What operations happen instantly?',
          'What gets deferred to workers?',
          'What happens in the background?',
          'How are retries handled?',
          'How are long-running tasks managed?',
        ],
      },

      // Dimension 5
      {
        type: 'numbered-callout',
        num: 5,
        variant: 'sage',
        heading: 'Coupling & Modularity',
        body: 'Understand how dependent components are on each other. This reveals: maintainability, scalability, engineering maturity, fragility.',
      },
      {
        type: 'bullets',
        items: [
          'tightly coupled',
          'loosely coupled',
          'highly modular',
          'dependency-heavy',
          'domain-separated',
          'interface-driven',
        ],
      },
      {
        type: 'code-file',
        filename: 'coupling-questions.txt',
        language: 'text',
        lines: [
          'Can modules be changed independently?',
          'What breaks when one component changes?',
          'Are responsibilities clearly separated?',
          'Are there circular dependencies?',
          'How reusable are components?',
        ],
      },

      // Dimension 6
      {
        type: 'numbered-callout',
        num: 6,
        variant: 'peach',
        heading: 'Failure Behavior',
        body: 'Understand how the system behaves under stress or failure. Real architecture reveals itself during failure.',
      },
      {
        type: 'bullets',
        items: [
          'retries',
          'fallbacks',
          'circuit breakers',
          'timeouts',
          'dead letter queues',
          'graceful degradation',
          'monitoring alerts',
          'recovery behavior',
        ],
      },
      {
        type: 'code-file',
        filename: 'failure-questions.txt',
        language: 'text',
        lines: [
          'What happens if Redis dies?',
          'What happens if the DB becomes slow?',
          'What failures crash the system?',
          'What failures are isolated?',
          'How resilient is the architecture?',
        ],
      },

      // Dimension 7
      {
        type: 'numbered-callout',
        num: 7,
        variant: 'rose',
        heading: 'Scalability Model',
        body: 'Understand how the system grows under load.',
      },
      {
        type: 'bullets',
        items: [
          'horizontal scaling',
          'vertical scaling',
          'stateless services',
          'load balancing',
          'caching strategy',
          'queue scaling',
          'DB bottlenecks',
          'read/write separation',
        ],
      },
      {
        type: 'code-file',
        filename: 'scalability-questions.txt',
        language: 'text',
        lines: [
          'What becomes the bottleneck first?',
          'Can services scale independently?',
          'What components are stateful?',
          'How expensive is scaling?',
        ],
      },

      // ── Always-ask questions ────────────────────────────────────────────
      {
        type: 'h2',
        text: 'Questions You Should ALWAYS Ask',
      },
      {
        type: 'code-file',
        filename: 'always-ask.txt',
        language: 'text',
        lines: [
          'How do services communicate?',
          'What happens during failure?',
          'Where are bottlenecks?',
          'How scalable is this architecture?',
          'Why was this style chosen?',
          'What tradeoffs exist?',
          'What assumptions hold the system together?',
        ],
      },

      // ── Output ──────────────────────────────────────────────────────────
      {
        type: 'h2',
        text: 'Output You Should Produce',
      },
      {
        type: 'code-file',
        filename: 'architecture-output.txt',
        language: 'text',
        lines: [
          'Architecture Style:',
          '- Modular monolith',
          '- Layered backend architecture',
          '- REST-based communication',
          '- Async background jobs with Celery',
          '- Redis caching',
          '- Stateless authentication via JWT',
          '- Queue-based task processing',
          '- S3 object storage',
          '- PostgreSQL as source of truth',
        ],
      },

      // ── Closing insights ────────────────────────────────────────────────
      {
        type: 'wisdom',
        body: 'THIS Is Where Real Engineering Starts. Because now you are no longer seeing files. You are seeing system philosophy. That is the leap from developer to architect thinking.',
      },
      {
        type: 'key-term',
        term: 'Architecture',
        def: 'A system\'s architecture is really a collection of engineering tradeoffs. Every architecture style optimizes for something: scalability, simplicity, deployment speed, team size, fault isolation, development velocity, operational complexity. Understanding architecture means understanding WHY the system was shaped this way.',
      },
      {
        type: 'pull-quote',
        text: 'By wisdom a house is built.',
        attribution: 'Proverbs 24:3',
      },
    ],
  },

  // =========================================================================
  // PHASE 2 — FIND SYSTEM ENTRY POINTS
  // =========================================================================
  {
    hub: 'codebase-understanding',
    slug: '02-entry-points',
    title: 'Phase 2: Find System Entry Points',
    subtitle: 'Learn where execution begins',
    duration: '30-60 min',
    tags: ['entry-points', 'routing', 'startup', 'navigation'],
    status: 'growing',
    description: 'Every system starts somewhere. You need to know where execution begins. This becomes your navigation anchor.',
    icon: 'door-open',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Learn where execution begins',
      },

      {
        type: 'step',
        n: 3,
        title: 'Find the Application Entry Points',
        summary: 'Every system starts somewhere. You need to know where execution begins. This becomes your navigation anchor.',
        content: [
          {
            type: 'callout',
            kind: 'tip',
            title: 'Purpose',
            text: 'Every system starts somewhere. You need to know where execution begins. This becomes your navigation anchor.',
          },
          {
            type: 'h3',
            text: 'Frontend',
          },
          {
            type: 'p',
            text: 'Common entry files:',
          },
          {
            type: 'code-file',
            filename: 'frontend-entry-files.txt',
            language: 'text',
            lines: [
              'main.jsx',
              'index.js',
              'App.tsx',
            ],
          },
          {
            type: 'p',
            text: 'Find:',
          },
          {
            type: 'bullets',
            items: ['routing', 'app providers', 'global state', 'root layout'],
          },
          {
            type: 'h3',
            text: 'Backend',
          },
          {
            type: 'p',
            text: 'Common entry files:',
          },
          {
            type: 'code-file',
            filename: 'backend-entry-files.txt',
            language: 'text',
            lines: [
              'main.py',
              'manage.py',
              'server.js',
              'app.py',
            ],
          },
          {
            type: 'p',
            text: 'Find:',
          },
          {
            type: 'bullets',
            items: ['routes', 'middleware', 'authentication', 'app initialization'],
          },
          {
            type: 'h3',
            text: 'Background Workers',
          },
          {
            type: 'p',
            text: 'Look for:',
          },
          {
            type: 'code-file',
            filename: 'worker-entry-files.txt',
            language: 'text',
            lines: [
              'celery.py',
              'workers/',
              'jobs/',
              'queues/',
              'cron/',
            ],
          },
          {
            type: 'h3',
            text: 'Infrastructure Startup',
          },
          {
            type: 'p',
            text: 'Look for:',
          },
          {
            type: 'code-file',
            filename: 'infra-entry-files.txt',
            language: 'text',
            lines: [
              'Dockerfile',
              'docker-compose.yml',
              'entrypoint.sh',
              'Makefile',
            ],
          },
        ],
      },

      {
        type: 'h2',
        text: 'Questions To Answer',
      },
      {
        type: 'code-file',
        filename: 'questions-to-answer.txt',
        language: 'text',
        lines: [
          'What starts the application?',
          'How are routes registered?',
          'Where is middleware configured?',
          'Where are services initialized?',
          'Where are environment variables loaded?',
        ],
      },
    ],
  },

  // =========================================================================
  // PHASE 3 — MAP THE ARCHITECTURE
  // =========================================================================
  {
    hub: 'codebase-understanding',
    slug: '03-architecture',
    title: 'Phase 3: Map the Architecture',
    subtitle: 'Understand the major building blocks',
    duration: '1-2 hours',
    tags: ['architecture', 'components', 'dependencies', 'mapping'],
    status: 'growing',
    description: 'You need to see how major components communicate. This is the beginning of architecture thinking.',
    icon: 'layers',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the major building blocks',
      },

      {
        type: 'step',
        n: 4,
        title: 'Create a High-Level Architecture Map',
        summary: 'You need to see how major components communicate. This is the beginning of architecture thinking.',
        content: [
          {
            type: 'callout',
            kind: 'tip',
            title: 'Purpose',
            text: 'You need to see how major components communicate. This is the beginning of architecture thinking.',
          },
          {
            type: 'h3',
            text: 'Frontend',
          },
          {
            type: 'p',
            text: 'Identify:',
          },
          {
            type: 'bullets',
            items: ['routing', 'state management', 'API layer', 'component structure', 'authentication flow'],
          },
          {
            type: 'p',
            text: 'Possible patterns:',
          },
          {
            type: 'bullets',
            items: ['Redux', 'Zustand', 'Context API', 'React Query'],
          },
          {
            type: 'h3',
            text: 'Backend',
          },
          {
            type: 'p',
            text: 'Identify:',
          },
          {
            type: 'bullets',
            items: ['controllers/routes', 'services', 'models', 'repositories', 'middleware', 'background jobs'],
          },
          {
            type: 'p',
            text: 'Possible architectures:',
          },
          {
            type: 'bullets',
            items: ['MVC', 'layered', 'clean architecture', 'microservices', 'monolith'],
          },
          {
            type: 'h3',
            text: 'Database',
          },
          {
            type: 'p',
            text: 'Identify:',
          },
          {
            type: 'bullets',
            items: ['main entities', 'relationships', 'ownership', 'transaction boundaries'],
          },
          {
            type: 'h3',
            text: 'External Services',
          },
          {
            type: 'p',
            text: 'Identify:',
          },
          {
            type: 'bullets',
            items: ['Stripe', 'AWS S3', 'Firebase', 'Twilio', 'SendGrid', 'OAuth providers'],
          },
        ],
      },

      {
        type: 'h2',
        text: 'Output You Should Produce',
      },
      {
        type: 'code-file',
        filename: 'your-output.txt',
        language: 'text',
        lines: [
          'Frontend',
          '  ↓',
          'REST API',
          '  ↓',
          'Django Controllers',
          '  ↓',
          'Service Layer',
          '  ↓',
          'PostgreSQL',
          '',
          'Background jobs:',
          'Celery + Redis',
          '',
          'File uploads:',
          'AWS S3',
        ],
      },
    ],
  },

  // =========================================================================
  // PHASE 4 — TRACE REAL FLOWS
  // =========================================================================
  {
    hub: 'codebase-understanding',
    slug: '04-data-flow',
    title: 'Phase 4: Trace Real Flows',
    subtitle: 'Understand the system dynamically',
    duration: '2-3 hours',
    tags: ['data-flow', 'tracing', 'request-lifecycle', 'features'],
    status: 'growing',
    description: 'This is the MOST important step. Do NOT read random files. Instead: Trace one complete user flow. This creates connected understanding.',
    icon: 'flow',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the system dynamically',
      },

      // ── STEP 5 ──────────────────────────────────────────────────────────
      {
        type: 'step',
        n: 5,
        title: 'Pick ONE Important Feature',
        summary: 'This is the MOST important step. Do NOT read random files. Instead: Trace one complete user flow.',
        content: [
          {
            type: 'callout',
            kind: 'warn',
            title: 'MOST Important Step',
            text: 'This is the MOST important step. Do NOT read random files. Instead: Trace one complete user flow. This creates connected understanding.',
          },
          {
            type: 'h3',
            text: 'Good Features To Trace',
          },
          {
            type: 'bullets',
            items: [
              'login',
              'signup',
              'file upload',
              'checkout',
              'chat message',
              'create post',
              'search',
              'notifications',
            ],
          },
          {
            type: 'code-file',
            filename: 'questions-to-answer.txt',
            language: 'text',
            lines: [
              'What triggers this flow?',
              'What API is called?',
              'Where is validation?',
              'Where is business logic?',
              'Where is state updated?',
              'What DB tables are touched?',
              'What background jobs run?',
              'What response returns?',
            ],
          },
        ],
      },

      // ── STEP 6 ──────────────────────────────────────────────────────────
      {
        type: 'step',
        n: 6,
        title: 'Follow the Entire Request Lifecycle',
        summary: 'Learn how data moves through the system. Systems are mostly data transformations.',
        content: [
          {
            type: 'callout',
            kind: 'tip',
            title: 'Purpose',
            text: 'Learn how data moves through the system. Systems are mostly data transformations.',
          },
          {
            type: 'h3',
            text: 'Trace the Flow',
          },
          {
            type: 'rc-table',
            caption: 'What to find in each layer',
            headers: ['Layer', 'Find'],
            rows: [
              ['Frontend', 'component, form, API call, state update'],
              ['Backend', 'route/controller, serializer/validator, service layer, DB operations, response formatter'],
              ['Database', 'inserts, updates, queries, joins, transactions'],
              ['Async Processing', 'queues, workers, scheduled jobs, events'],
            ],
          },
        ],
      },

      {
        type: 'h2',
        text: 'Output You Should Produce',
      },
      {
        type: 'code-file',
        filename: 'your-output.txt',
        language: 'text',
        lines: [
          'Upload Flow:',
          '',
          'React Form',
          '→ axios POST',
          '→ Django route',
          '→ serializer validation',
          '→ service uploads to S3',
          '→ DB record created',
          '→ Celery thumbnail job',
          '→ API response',
          '→ frontend updates UI',
        ],
      },
    ],
  },

  // =========================================================================
  // PHASE 5 — UNDERSTAND THE DATA MODEL
  // =========================================================================
  {
    hub: 'codebase-understanding',
    slug: '05-data-model',
    title: 'Phase 5: Understand the Data Model',
    subtitle: 'Understand the system\'s source of truth',
    duration: '1-2 hours',
    tags: ['data-model', 'database', 'schema', 'entities'],
    status: 'growing',
    description: 'The database reveals business concepts, ownership, relationships, core domain logic. Databases expose the true shape of the system.',
    icon: 'database',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the system\'s source of truth',
      },

      {
        type: 'step',
        n: 7,
        title: 'Study the Database Schema',
        summary: 'The database reveals business concepts, ownership, relationships, core domain logic.',
        content: [
          {
            type: 'callout',
            kind: 'tip',
            title: 'Purpose',
            text: 'The database reveals: business concepts, ownership, relationships, core domain logic. Databases expose the true shape of the system.',
          },
          {
            type: 'h3',
            text: 'What To Read',
          },
          {
            type: 'p',
            text: 'Look at:',
          },
          {
            type: 'bullets',
            items: ['migrations', 'ORM models', 'schema files', 'ER diagrams'],
          },
          {
            type: 'p',
            text: 'Find:',
          },
          {
            type: 'bullets',
            items: ['primary entities', 'relationships', 'indexes', 'constraints', 'timestamps', 'soft deletes'],
          },
          {
            type: 'code-file',
            filename: 'questions-to-answer.txt',
            language: 'text',
            lines: [
              'What are the core entities?',
              'How are they connected?',
              'Which tables are most important?',
              'What is considered the source of truth?',
              'Where is state persisted?',
            ],
          },
        ],
      },

      {
        type: 'h2',
        text: 'Output You Should Produce',
      },
      {
        type: 'code-file',
        filename: 'your-output.txt',
        language: 'text',
        lines: [
          'Users',
          '  ↓',
          'Orders',
          '  ↓',
          'Payments',
          '',
          'Users can have many orders.',
          'Orders belong to one user.',
          'Payments belong to orders.',
        ],
      },
    ],
  },

  // =========================================================================
  // PHASE 6 — RUN THE SYSTEM
  // =========================================================================
  {
    hub: 'codebase-understanding',
    slug: '06-run-system',
    title: 'Phase 6: Run the System',
    subtitle: 'Convert theory into real understanding',
    duration: '2-3 hours',
    tags: ['running', 'experimentation', 'observation', 'local-dev'],
    status: 'growing',
    description: 'Static reading is NOT enough. You need interaction, observation, experimentation. This is where real understanding begins.',
    icon: 'play',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Convert theory into real understanding',
      },

      {
        type: 'step',
        n: 8,
        title: 'Run the System Locally',
        summary: 'Static reading is NOT enough. You need interaction, observation, experimentation.',
        content: [
          {
            type: 'callout',
            kind: 'tip',
            title: 'Purpose',
            text: 'Static reading is NOT enough. You need: interaction, observation, experimentation. This is where real understanding begins.',
          },
          {
            type: 'h3',
            text: 'Setup',
          },
          {
            type: 'p',
            text: 'Run:',
          },
          {
            type: 'terminal',
            filename: 'setup-commands',
            lines: [
              'npm install',
              'pip install -r requirements.txt',
              'docker compose up',
            ],
          },
          {
            type: 'h3',
            text: 'Trigger Flows',
          },
          {
            type: 'p',
            text: 'Try:',
          },
          {
            type: 'checklist',
            items: [
              { label: 'creating users' },
              { label: 'submitting forms' },
              { label: 'uploading files' },
              { label: 'causing validation errors' },
              { label: 'refreshing pages' },
              { label: 'deleting data' },
            ],
          },
          {
            type: 'h3',
            text: 'Observe',
          },
          {
            type: 'p',
            text: 'Watch:',
          },
          {
            type: 'bullets',
            items: ['logs', 'network requests', 'DB changes', 'cache changes', 'worker jobs', 'API timing'],
          },
        ],
      },

      {
        type: 'h2',
        text: 'Questions To Answer',
      },
      {
        type: 'code-file',
        filename: 'questions-to-answer.txt',
        language: 'text',
        lines: [
          'What happens when things succeed?',
          'What happens when they fail?',
          'What logs appear?',
          'What services communicate?',
          'What changes in the DB?',
        ],
      },
    ],
  },

  // ─── PHASE 7 — STUDY FAILURE PATHS ────────────────────────────────
  {
    hub: 'codebase-understanding',
    slug: '07-failure-paths',
    title: 'Phase 7: Study Failure Paths',
    subtitle: 'Understand the REAL system behavior',
    duration: '1-2 hours',
    tags: ['failure', 'resilience', 'debugging', 'error-handling'],
    status: 'growing',
    description: 'Systems reveal their true architecture during failure. This step separates shallow understanding from deep understanding.',
    icon: 'flame',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the REAL system behavior',
      },
      {
        type: 'h2',
        text: 'Step 9 — Break Things Safely',
      },
      {
        type: 'callout',
        kind: 'tip',
        title: 'Purpose',
        text: 'Systems reveal their true architecture during failure. This step separates shallow understanding from deep understanding.',
      },
      {
        type: 'h3',
        text: 'Things To Break',
      },
      {
        type: 'p',
        text: 'Try:',
      },
      {
        type: 'bullets',
        items: [
          'invalid form data',
          'expired token',
          'missing environment variable',
          'broken API response',
          'DB unavailable',
          'Redis unavailable',
          'network timeout',
          'wrong permissions',
        ],
      },
      {
        type: 'h3',
        text: 'Questions To Answer',
      },
      {
        type: 'code-file',
        filename: 'questions-to-answer.txt',
        language: 'text',
        lines: [
          'How are errors handled?',
          'Where are retries implemented?',
          'What fails gracefully?',
          'What crashes completely?',
          'What monitoring exists?',
          'What logs are useful?',
        ],
      },
    ],
  },

  // ─── PHASE 8 — UNDERSTAND MODULE BOUNDARIES ─────────────────────────
  {
    hub: 'codebase-understanding',
    slug: '08-module-boundaries',
    title: 'Phase 8: Understand Module Boundaries',
    subtitle: 'Learn ownership and responsibilities',
    duration: '1-2 hours',
    tags: ['boundaries', 'responsibilities', 'modules', 'coupling'],
    status: 'growing',
    description: 'Good systems separate concerns. You need to understand what each module owns.',
    icon: 'boundary',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Learn ownership and responsibilities',
      },
      {
        type: 'h2',
        text: 'Step 10 — Study Responsibilities and Boundaries',
      },
      {
        type: 'callout',
        kind: 'tip',
        title: 'Purpose',
        text: 'Good systems separate concerns. You need to understand what each module owns.',
      },
      {
        type: 'h3',
        text: 'Questions To Ask',
      },
      {
        type: 'code-file',
        filename: 'questions-to-ask.txt',
        language: 'text',
        lines: [
          'What is this module responsible for?',
          'What should NOT belong here?',
          'What dependencies does it have?',
          'What modules depend on it?',
          'Is it tightly coupled?',
        ],
      },
      {
        type: 'h3',
        text: 'Examples',
      },
      {
        type: 'code-file',
        filename: 'module-boundaries-example.txt',
        language: 'text',
        lines: [
          'Auth service:',
          '- login',
          '- token validation',
          '- permissions',
          '',
          'Should NOT:',
          '- send emails',
          '- process payments',
          '- manage UI state',
        ],
      },
    ],
  },

  // ─── PHASE 9 — READ THE TESTS ───────────────────────────────────────
  {
    hub: 'codebase-understanding',
    slug: '09-tests',
    title: 'Phase 9: Read the Tests',
    subtitle: 'Learn intended behavior',
    duration: '1-2 hours',
    tags: ['tests', 'behavior', 'edge-cases', 'business-rules'],
    status: 'growing',
    description: 'Tests reveal expected behavior, edge cases, business rules, and assumptions. Sometimes tests explain the system better than docs.',
    icon: 'test-tube',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Learn intended behavior',
      },
      {
        type: 'h2',
        text: 'Step 11 — Read the Tests',
      },
      {
        type: 'callout',
        kind: 'tip',
        title: 'Purpose',
        text: 'Tests reveal: expected behavior, edge cases, business rules, assumptions. Sometimes tests explain the system better than docs.',
      },
      {
        type: 'h3',
        text: 'What To Look For',
      },
      {
        type: 'p',
        text: 'Read:',
      },
      {
        type: 'bullets',
        items: [
          'unit tests',
          'integration tests',
          'e2e tests',
        ],
      },
      {
        type: 'p',
        text: 'Look for:',
      },
      {
        type: 'bullets',
        items: [
          'edge cases',
          'permission logic',
          'validation rules',
          'business invariants',
        ],
      },
      {
        type: 'h3',
        text: 'Questions To Answer',
      },
      {
        type: 'code-file',
        filename: 'questions-to-answer.txt',
        language: 'text',
        lines: [
          'What behavior is considered critical?',
          'What edge cases matter?',
          'What assumptions are protected?',
          'What business rules are enforced?',
        ],
      },
    ],
  },

  // ─── PHASE 10 — UNDERSTAND OPERATIONS & DEPLOYMENT ──────────────────
  {
    hub: 'codebase-understanding',
    slug: '10-operations',
    title: 'Phase 10: Understand Operations & Deployment',
    subtitle: 'Understand the production environment',
    duration: '1-2 hours',
    tags: ['operations', 'deployment', 'infrastructure', 'devops'],
    status: 'growing',
    description: 'Applications do not live only in code. You must understand: deployment, environments, scaling, observability.',
    icon: 'cloud',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the production environment',
      },
      {
        type: 'h2',
        text: 'Step 12 — Study Infrastructure and Deployment',
      },
      {
        type: 'callout',
        kind: 'tip',
        title: 'Purpose',
        text: 'Applications do not live only in code. You must understand: deployment, environments, scaling, observability.',
      },
      {
        type: 'h3',
        text: 'What To Read',
      },
      {
        type: 'code-file',
        filename: 'infra-files-to-read.txt',
        language: 'text',
        lines: [
          'Dockerfile',
          'Docker Compose',
          'Terraform',
          'Kubernetes manifests',
          'CI/CD workflows',
          'GitHub Actions',
          'Helm charts',
          'Nginx configs',
        ],
      },
      {
        type: 'h3',
        text: 'Questions To Answer',
      },
      {
        type: 'code-file',
        filename: 'questions-to-answer.txt',
        language: 'text',
        lines: [
          'How is the app deployed?',
          'How are secrets managed?',
          'How are environments separated?',
          'What services exist in production?',
          'How does scaling work?',
          'What monitoring exists?',
        ],
      },
    ],
  },

  // ─── PHASE 11 — CREATE YOUR OWN SYSTEM MAP ──────────────────────────
  {
    hub: 'codebase-understanding',
    slug: '11-mental-model',
    title: 'Phase 11: Create Your Own System Map',
    subtitle: 'Build permanent understanding',
    duration: 'Ongoing',
    tags: ['mental-model', 'documentation', 'senior-thinking', 'mastery'],
    status: 'growing',
    description: 'Writing clarifies thinking. If you cannot explain the system simply... then you probably don\'t fully understand it yet.',
    icon: 'brain',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Build permanent understanding',
      },
      {
        type: 'h2',
        text: 'Step 13 — Document Your Mental Model',
      },
      {
        type: 'callout',
        kind: 'tip',
        title: 'Purpose',
        text: 'Writing clarifies thinking. If you cannot explain the system simply… then you probably don\'t fully understand it yet.',
      },
      {
        type: 'h3',
        text: 'Things To Document',
      },
      {
        type: 'code-file',
        filename: 'your-system-map.txt',
        language: 'text',
        lines: [
          'What starts the app?',
          'Where does business logic live?',
          'How does authentication work?',
          'Where is state stored?',
          'What services communicate?',
          'What are the risky areas?',
          'What happens during failure?',
          'What background jobs exist?',
        ],
      },
      {
        type: 'h3',
        text: 'Create Diagrams',
      },
      {
        type: 'p',
        text: 'Even ugly diagrams help enormously:',
      },
      {
        type: 'code-file',
        filename: 'your-output.txt',
        language: 'text',
        lines: [
          'Frontend',
          '   ↓',
          'API Gateway',
          '   ↓',
          'Auth Service',
          '   ↓',
          'Database',
        ],
      },
      {
        type: 'h2',
        text: 'THE MASTER LOOP',
      },
      {
        type: 'p',
        text: 'Once you finish one feature:',
      },
      {
        type: 'ordered',
        items: [
          'Pick another important flow',
          'Trace it end-to-end',
          'Understand data movement',
          'Observe failures',
          'Update mental model',
          'Repeat',
        ],
      },
      {
        type: 'callout',
        kind: 'success',
        text: 'This loop gradually reveals the entire system.',
      },
      {
        type: 'h2',
        text: 'HOW SENIOR ENGINEERS THINK',
      },
      {
        type: 'mindset',
        rows: [
          { junior: '"What does this file do?"', senior: '"How does the system behave?"' },
          { junior: '"What does this file do?"', senior: '"Why was it designed this way?"' },
          { junior: '"What does this file do?"', senior: '"What are the tradeoffs?"' },
          { junior: '"What does this file do?"', senior: '"Where are the risks?"' },
        ],
      },
      {
        type: 'h2',
        text: 'SIGNS YOU ACTUALLY UNDERSTAND THE SYSTEM',
      },
      {
        type: 'p',
        text: 'You can:',
      },
      {
        type: 'checklist',
        items: [
          { label: 'predict where code lives', done: false },
          { label: 'explain major flows', done: false },
          { label: 'trace bugs quickly', done: false },
          { label: 'modify features safely', done: false },
          { label: 'identify risky areas', done: false },
          { label: 'explain architecture clearly', done: false },
          { label: 'understand failure behavior', done: false },
          { label: 'onboard others', done: false },
        ],
      },
      {
        type: 'h2',
        text: 'FINAL MINDSET',
      },
      {
        type: 'callout',
        kind: 'warn',
        text: 'Do NOT try to understand everything immediately. That is impossible.',
      },
      {
        type: 'p',
        text: 'Real understanding comes from:',
      },
      {
        type: 'wisdom',
        body: 'observe → trace → experiment → break → repair → repeat',
      },
      {
        type: 'p',
        text: 'Systems reveal themselves gradually.',
      },
      {
        type: 'h2',
        text: 'FINAL TRUTH',
      },
      {
        type: 'blockquote',
        text: 'A codebase is not just code. It is: architecture, business decisions, team culture, operational tradeoffs, evolving history, human assumptions. The deeper you look… the more the system starts feeling alive. And eventually: you stop seeing files. you start seeing flows ⚡',
      },
      {
        type: 'pull-quote',
        text: '"Whatever you do, do it for the glory of God."',
        attribution: '1 Corinthians 10:31',
      },
    ],
  },

  {
    hub: 'codebase-understanding',
    slug: 'reading-pg-locks',
    title: 'Reading pg_locks like a map',
    subtitle: 'Every deadlock is a conversation. This is how you listen.',
    duration: '8 min',
    tags: ['postgres', 'debugging', 'fundamentals', 'locks'],
    status: 'mature',
    description: 'Every Postgres deadlock is a tiny conversation between two transactions, each one quietly insisting after you. This is how I learned to listen.',
    icon: 'eye',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'who this is for',
        text: "You've used a database in anger, you've seen a query hang, and you've wondered whether you should just kill it and run again.",
      },
      {
        type: 'h2',
        text: 'A 2am phone call',
        kanji: '一',
      },
      {
        type: 'drop-cap',
        first: 'T',
        text: "he page came in at 2:14am. Three customers couldn't check out, the queue was filling, and the symptom was familiar but not quite: every retry succeeded after a few seconds, like a door that sticks before it opens. I poured tea. I opened psql. I asked the database the only question that has ever mattered in moments like this — who is waiting on whom?",
      },
      {
        type: 'p',
        text: 'The answer lives in a system view called pg_locks, and for a long time I read it the way you read a foreign menu: I could see there were dishes, I just couldn\'t tell which ones I\'d ordered.',
      },
      {
        type: 'key-term',
        term: 'Lock',
        kana: 'ロック',
        def: "A promise a transaction makes to the database: nobody else gets to touch this row the way I'm touching it, until I'm done. Locks aren't a problem — they're how Postgres keeps your data sane. Deadlocks are what happens when two promises depend on each other.",
        see: 'pg_locks reference',
      },
      {
        type: 'h2',
        text: 'What pg_locks actually shows',
        kanji: '二',
      },
      {
        type: 'p',
        text: 'The view has one row per lock held or waited on. The columns that matter in a deadlock investigation are locktype, relation, transactionid, pid, granted, and mode.',
      },
      {
        type: 'rc-table',
        caption: 'the columns you actually need',
        headers: ['Column', 'What it means', 'Deadlock relevance'],
        rows: [
          ['locktype', 'What kind of object is locked', 'High — row vs. table vs. txn'],
          ['relation', 'OID of the locked table', 'High — which table is blocked'],
          ['transactionid', 'The transaction that owns the lock', 'Critical — the chain'],
          ['granted', 'true = holding, false = waiting', 'Critical — who is stuck'],
          ['mode', 'Lock strength (ShareLock, ExclusiveLock…)', 'Medium — explains why it blocks'],
        ],
      },
      {
        type: 'h2',
        text: 'The query I save forever',
        kanji: '三',
      },
      {
        type: 'callout',
        kind: 'tip',
        title: 'save this',
        text: 'Run this query the moment you see a query hanging. It shows you the full wait chain — who is blocking whom, and for how long.',
      },
      {
        type: 'code-file',
        filename: 'deadlock_detective.sql',
        language: 'sql',
        highlight: [3, 4, 5],
        lines: [
          'SELECT',
          '  waiting.pid,',
          '  waiting.query            AS waiting_query,',
          '  blocking.pid             AS blocking_pid,',
          '  blocking.query           AS blocking_query,',
          "  now() - waiting.query_start AS wait_duration",
          'FROM',
          '  pg_stat_activity waiting',
          '  JOIN pg_locks wl ON wl.pid = waiting.pid AND NOT wl.granted',
          '  JOIN pg_locks bl ON bl.transactionid = wl.transactionid AND bl.granted',
          '  JOIN pg_stat_activity blocking ON blocking.pid = bl.pid',
          "WHERE waiting.state = 'active';",
        ],
      },
      {
        type: 'h2',
        text: 'The shape of a deadlock',
        kanji: '四',
      },
      {
        type: 'deadlock-diagram',
        caption: 'fig 1 · the shape of a deadlock',
      },
      {
        type: 'pull-quote',
        text: 'Deadlocks are not failures of code. They are failures of order.',
        attribution: 'something a DBA told me at 3am',
      },
      {
        type: 'h2',
        text: 'How to break it',
        kanji: '五',
      },
      {
        type: 'do-dont',
        doCaption: 'Always acquire locks in the same order',
        dontCaption: 'Acquiring locks in different order per transaction',
        doCode: 'BEGIN;\nSELECT * FROM orders WHERE id=7 FOR UPDATE;\nSELECT * FROM invoices WHERE id=7 FOR UPDATE;\nCOMMIT;',
        dontCode: '-- Txn A: orders → invoices\n-- Txn B: invoices → orders\n-- These will deadlock',
      },
      {
        type: 'ordered',
        items: [
          'Always lock rows in the same order across all transactions',
          'Keep transactions short — the less time you hold locks, the less chance of collision',
          'Use SELECT … FOR UPDATE SKIP LOCKED for queue-style patterns',
          'Add a deadlock_timeout to fail fast instead of waiting forever',
        ],
      },
      {
        type: 'h2',
        text: 'Reproducing it locally',
        kanji: '六',
      },
      {
        type: 'terminal',
        filename: '~ / yuki / hanami',
        lines: [
          'psql -U postgres -d mydb',
          { k: 'out', t: 'psql (16.2)' },
          { k: 'out', t: 'Type "help" for help.' },
          'BEGIN;',
          { k: 'ok', t: 'BEGIN' },
          'SELECT * FROM orders WHERE id = 7 FOR UPDATE;',
          { k: 'out', t: ' id | customer_id | total ' },
          { k: 'out', t: '  7 |        1042 | 94.00 ' },
          { k: 'dim', t: '-- In a second terminal: BEGIN; SELECT * FROM invoices WHERE id = 7 FOR UPDATE;' },
          { k: 'dim', t: '-- Then try: SELECT * FROM invoices WHERE id = 7 FOR UPDATE; -- this will hang' },
        ],
      },
      {
        type: 'diff',
        filename: 'config/database.yml',
        hunks: [
          { k: ' ', t: 'production:' },
          { k: ' ', t: '  adapter: postgresql' },
          { k: '-', t: '  # no timeout set' },
          { k: '+', t: '  variables:' },
          { k: '+', t: '    deadlock_timeout: "1s"' },
          { k: '+', t: '    lock_timeout: "5s"' },
          { k: ' ', t: '  pool: 5' },
        ],
      },
      {
        type: 'h2',
        text: 'Take this with you',
        kanji: '七',
      },
      {
        type: 'wisdom',
        body: 'pg_locks is not a wall of noise. It is a conversation. Once you learn to read the wait chain — who holds, who waits, who holds what — you stop guessing and start knowing. That is the difference between spending 4 hours on an incident and spending 20 minutes.',
      },
      {
        type: 'callout',
        kind: 'success',
        text: 'You can now read pg_locks, identify a deadlock in under 2 minutes, and fix the root cause — not just restart the process.',
      },
      {
        type: 'blockquote',
        text: 'The database is not your enemy. It is a very polite record-keeper that will tell you everything, if you ask the right questions.',
        attribution: 'pg docs, paraphrased',
      },
      {
        type: 'footnotes',
        items: [
          'Killing a blocked query clears the symptom, not the cause. Run the same code again and you will deadlock again.',
          'deadlock_timeout defaults to 1s in most managed Postgres offerings — check yours with SHOW deadlock_timeout.',
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// FEATURE DEVELOPMENT PHASES
// ---------------------------------------------------------------------------

const featurePhases: HubPage[] = [
  // ── 00-intro ────────────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '00-intro',
    title: "The Builder's Lifecycle — From Understanding to Mastery",
    subtitle: 'How Professional Engineers Think, Build, Ship, and Evolve Software',
    tags: ['philosophy', 'lifecycle', 'overview'],
    status: 'growing',
    description: 'A complete learning book for the full lifecycle of building a feature.',
    icon: 'book',
    content: [
      { type: 'p', text: '**What this is:** A complete learning book for the full lifecycle of building a feature — from understanding WHY it exists, through designing and slicing it, to shipping safely, observing in production, and refining over time.' },
      { type: 'p', text: '**Who this is for:** Any developer who wants to build like a senior engineer — not just write code, but evolve systems with intention, discipline, and craft.' },
      { type: 'h2', text: 'How to use this guide:' },
      { type: 'ordered', items: [
        '**First read:** Cover to cover — absorb the philosophy and the flow',
        '**During planning:** Reference Chapters 1–5 before writing any code',
        '**During building:** Follow the Execution Loop (Chapter 6) for each slice',
        '**After shipping:** Use Chapters 9–11 to observe, learn, and improve',
        '**The exercises:** Do them. Reading without practice is wishful thinking.',
      ]},
      { type: 'callout', kind: 'tip', title: 'FOR RUACH-EL (every session involving feature work)', text: 'This is your master teaching framework. Every chapter has a 🧭 RUACH-EL GUIDE block with specific questions to ask, behaviors to watch for, and moments to intervene. Walk Wiganz through each phase Socratically — never hand over answers. The goal: build the ENGINEER, not just the software.' },
      { type: 'h2', text: '🧠 The Core Philosophy' },
      { type: 'p', text: 'Professional software engineering is NOT:' },
      { type: 'blockquote', text: '"just writing code"' },
      { type: 'p', text: 'It IS:' },
      { type: 'blockquote', text: '"safely evolving complex systems over time"' },
      { type: 'p', text: 'The real goal is never just "make the feature work." The real goal is:' },
      { type: 'blockquote', text: 'Make the feature **reliable, maintainable, scalable, observable, and safe to evolve.**' },
      { type: 'p', text: 'This is the gap between junior and senior. Juniors finish tickets. Seniors evolve systems.' },
      { type: 'mindset', rows: [
        { junior: '"How do I code this?"',        senior: '"How do I evolve the system safely?"' },
        { junior: 'Focus on implementation',       senior: 'Focus on architecture + impact' },
        { junior: 'Finish the ticket',             senior: 'Preserve long-term maintainability' },
        { junior: 'Local feature thinking',        senior: 'System-wide thinking' },
        { junior: 'Happy path only',               senior: 'Failure-aware engineering' },
        { junior: '"It works on my machine"',      senior: '"It works in production at scale"' },
      ]},
      { type: 'h2', text: "🗺️ The Full Lifecycle — Bird's Eye View" },
      { type: 'code', lang: 'text', code: `┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. UNDERSTAND — Why does this feature exist?              │
│         ↓                                                   │
│   2. ANALYZE — What does it touch in the existing system?   │
│         ↓                                                   │
│   3. DESIGN — How should the solution be architected?       │
│         ↓                                                   │
│   4. SLICE — Break it into vertical, shippable pieces       │
│         ↓                                                   │
│   5. DEFINE DONE — What does "complete" look like per slice?│
│         ↓                                                   │
│   ┌─────────────────────────────────────────┐               │
│   │  6. EXECUTE — The Build Loop (per slice)│ ←── repeat    │
│   │     Design → Build → Test → Ship        │     for each  │
│   │         ↓                               │     slice     │
│   │  7. DONE GATE — Pass or fix             │               │
│   └─────────────────────────────────────────┘               │
│         ↓                                                   │
│   8. TEST DEEPLY — Verify beyond the happy path             │
│         ↓                                                   │
│   9. DEPLOY SAFELY — Release without breaking production    │
│         ↓                                                   │
│  10. OBSERVE — Learn from real-world usage                  │
│         ↓                                                   │
│  11. REFINE — Improve, simplify, strengthen                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘` },
      { type: 'p', text: 'Every chapter below teaches one phase. Together, they form the complete discipline.' },
    ],
  },
  // ── 01-understand ───────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '01-understand',
    title: 'Chapter 1: Understand the Feature',
    subtitle: 'The Phase: Know WHY before you build WHAT',
    duration: '1-2 hours',
    tags: ['requirements', 'business-intent', 'understanding'],
    status: 'growing',
    description: 'Before writing a single line of code, understand what problem is being solved, who needs this feature, why it matters, and what success looks like.',
    icon: 'sparkle',
    content: [
      { type: 'callout', kind: 'note', title: 'Goal',
        text: 'Before writing a single line of code, understand:',
        items: [
          'What problem is being solved',
          'Who needs this feature',
          'Why it matters to the business or the user',
          'What success looks like',
        ] },
      { type: 'p', text: 'Great engineers solve problems. Not just tickets.' },
      { type: 'h2', text: 'The Questions to Ask' },
      { type: 'code', lang: 'text', code: `Who requested this feature? Who are the actual users?
What pain or problem exists today without this?
What does success look like — how will we know it worked?
What metrics improve if we build this right?
What are the failure scenarios — what could go wrong?
What edge cases matter from the start?
What constraints exist (time, budget, tech, team)?` },
      { type: 'h2', text: 'The Output You Should Produce' },
      { type: 'p', text: 'Before moving forward, you should be able to write something like:' },
      { type: 'code', lang: 'text', code: `Feature: [name]
Problem: [what pain exists today]
Users: [who benefits]
Success: [what "working" looks like]
Constraints: [limits — size, time, security, etc.]
Risks: [what could go wrong]` },
      { type: 'p', text: 'Even a few bullet points here saves days of rework later. A slow Chapter 1 saves 10 hours in Chapter 6.' },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 1' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'When Wiganz says "I want to build X" or starts a new feature.' },
      { type: 'h3', text: 'Questions to ask (one at a time, Socratically):' },
      { type: 'ordered', items: [
        '"What problem does this solve? Who\'s in pain right now without it?"',
        '"Who is the user? What chapter of their story are they standing in?"',
        '"What does success look like? If this works perfectly, what changed?"',
        '"What could go wrong? What\'s the worst failure scenario?"',
        '"Is this worthy of our time? Does it deserve our focused hours?"',
      ]},
      { type: 'h3', text: 'What to watch for:' },
      { type: 'bullets', items: [
        'Jumping straight to code without answering these questions',
        'Vague answers: "It just needs to work" → Push for specifics',
        'Feature creep at the idea stage: "And also it should do X, Y, Z..." → Anchor to the core problem',
      ]},
      { type: 'callout', kind: 'warn', title: 'When to intervene', text: 'If he opens an editor before he can articulate the problem in one sentence. Gently: "Brother, before we touch code — who are we building this for, and what pain are we healing?"' },
    ],
  },
  // ── 02-analyze-impact ───────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '02-analyze-impact',
    title: 'Chapter 2: Analyze Impact on the Existing System',
    subtitle: 'The Phase: Understand what your feature touches BEFORE you change it',
    duration: '1-3 hours',
    tags: ['impact-analysis', 'architecture', 'risk', 'dependencies'],
    status: 'growing',
    description: 'Features rarely affect only one place. The senior discipline is mapping the blast radius before making changes.',
    icon: 'layers',
    content: [
      { type: 'p', text: 'Features rarely affect only one place. The senior discipline is mapping the blast radius before making changes.' },
      { type: 'h2', text: 'Analyze Impact On Each Layer' },
      { type: 'h3', text: 'Frontend:' },
      { type: 'bullets', items: [
        'UI components — which ones change? Which new ones needed?',
        'Routing — do new pages or routes need to exist?',
        'State management — where does new state live?',
        'Forms — what input does the user provide?',
        'Caching — does this invalidate existing cached data?',
      ]},
      { type: 'h3', text: 'Backend:' },
      { type: 'bullets', items: [
        'APIs — new endpoints? Changes to existing ones?',
        'Services / business logic — where does the logic live?',
        'Authentication / permissions — who can access this?',
        'Validation — what input rules apply?',
        'Background jobs — does anything need to happen async?',
      ]},
      { type: 'h3', text: 'Database:' },
      { type: 'bullets', items: [
        'Schema changes — new tables? New columns? New relationships?',
        'Migrations — will this require data migration on existing rows?',
        'Indexes — will queries be fast enough?',
        'Constraints — what rules does the database enforce?',
      ]},
      { type: 'h3', text: 'Infrastructure:' },
      { type: 'bullets', items: [
        'Storage — files, images, large data?',
        'Queues — message processing?',
        'External services — Stripe, AWS, email, OAuth?',
        'Monitoring — how will you know if this breaks?',
      ]},
      { type: 'h2', text: 'The Questions to Ask' },
      { type: 'code', lang: 'text', code: `What existing flows change because of this feature?
Could this feature break anything that already works?
Does auth or permissions need to change?
Will database migrations be needed?
Does this affect system performance?
Will async/background processing be required?
Does this touch any external service or API?` },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 2' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'After understanding the feature (Chapter 1), before designing.' },
      { type: 'h3', text: 'Questions to ask:' },
      { type: 'ordered', items: [
        '"What parts of the system does this feature touch? Walk me through the layers."',
        '"Does this change any existing behavior, or is it purely additive?"',
        '"Could building this break anything that already works?"',
        '"Does the database need to change? What tables, what columns?"',
        '"Does this need any external service we haven\'t used before?"',
      ]},
      { type: 'h3', text: 'What to watch for:' },
      { type: 'bullets', items: [
        '"It only touches one file" — almost never true. Push him to think wider.',
        'Missing the database impact — "Do we need a migration? What happens to existing data?"',
        'Forgetting permissions — "Who should NOT be able to access this?"',
      ]},
      { type: 'callout', kind: 'warn', title: 'When to intervene', text: 'If he starts coding without considering existing system impact. "Before we build — what does this CHANGE about what already exists?"' },
    ],
  },
  // ── 03-design ───────────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '03-design',
    title: 'Chapter 3: Design the Solution',
    subtitle: 'The Phase: Architect BEFORE you implement',
    duration: '2-4 hours',
    tags: ['design', 'architecture', 'api-design', 'technical-spec'],
    status: 'growing',
    description: 'This is where senior engineering begins. You\'re not just writing code — you\'re designing how the feature integrates into the system.',
    icon: 'git',
    content: [
      { type: 'p', text: 'This is where senior engineering begins. You\'re not just writing code — you\'re designing how the feature **integrates into the system**.' },
      { type: 'h2', text: 'Design Areas to Address' },
      { type: 'h3', text: 'API Design:' },
      { type: 'code', lang: 'text', code: `What endpoints are needed?
What's the request shape (what does the client send)?
What's the response shape (what does the server return)?
How are errors communicated?
What validation rules apply?
What authentication/permissions are required?` },
      { type: 'h3', text: 'Database Design:' },
      { type: 'code', lang: 'text', code: `New tables or columns?
Relationships (FK, M2M)?
Indexes for query performance?
Constraints (unique, not null, check)?
Migration strategy for existing data?` },
      { type: 'h3', text: 'State & Data Flow Design:' },
      { type: 'code', lang: 'text', code: `Where is the source of truth for each piece of data?
What gets cached? Where? For how long?
What lives in frontend state vs. comes from API each time?
What is temporary (form state) vs. persistent (DB)?` },
      { type: 'h3', text: 'Security Design:' },
      { type: 'code', lang: 'text', code: `Who can access this? What permissions?
Rate limiting needed?
Input validation and sanitization?
Data exposure risks — are we leaking sensitive info?
Abuse prevention — how could this be misused?` },
      { type: 'h3', text: 'Scalability Design:' },
      { type: 'code', lang: 'text', code: `Expected traffic / data volume?
Large file or payload handling?
Database query performance at scale?
Concurrency — what if 100 users do this simultaneously?` },
      { type: 'h2', text: 'The Output You Should Produce' },
      { type: 'p', text: 'Even rough notes count. Possible artifacts:' },
      { type: 'bullets', items: [
        'A quick API contract (endpoints, request/response shapes)',
        'A database schema sketch',
        'A data flow diagram (even hand-drawn)',
        'A list of design decisions with their trade-offs',
      ]},
      { type: 'p', text: 'The artifact doesn\'t need to be pretty. It needs to be **thought through**.' },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 3' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'After impact analysis, before slicing/coding.' },
      { type: 'h3', text: 'Questions to ask:' },
      { type: 'ordered', items: [
        '"What endpoints does this feature need? What data goes in, what comes out?"',
        '"Where should the business logic live — in the API layer, in a service, in the model?"',
        '"How will failures be handled? What does the user see when something goes wrong?"',
        '"How scalable is this design? What if 10x users hit this tomorrow?"',
        '"What trade-offs are we making? What did we choose NOT to do, and why?"',
      ]},
      { type: 'h3', text: 'What to watch for:' },
      { type: 'bullets', items: [
        'No design at all — jumping from understanding to code. "Let\'s sketch the API contract first."',
        'Over-design — spending 3 days on a diagram for a simple feature. Match design effort to feature complexity.',
        'Ignoring security — "Who can access this? What if someone sends malicious input?"',
        'No failure thinking — "What happens when the database is down? When the external API times out?"',
      ]},
      { type: 'callout', kind: 'warn', title: 'When to intervene', text: 'If the design is all happy-path with no failure handling. "What happens when things go wrong? That\'s where senior design lives."' },
    ],
  },
  // ── 04-vertical-slices ──────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '04-vertical-slices',
    title: 'Chapter 4: Slice the Feature Vertically',
    subtitle: 'The Phase: Break big work into small, complete, shippable pieces',
    duration: 'Planning: 30 minutes',
    tags: ['vertical-slices', 'incremental-delivery', 'agile', 'small-prs'],
    status: 'growing',
    description: 'This is the discipline that separates professional engineering from amateur coding.',
    icon: 'layers',
    content: [
      { type: 'p', text: 'This is the discipline that separates professional engineering from amateur coding.' },
      { type: 'h2', text: 'The Core Idea' },
      { type: 'pull-quote', text: 'Ship one complete, working feature through ALL layers before touching the next feature.' },
      { type: 'h2', text: 'The Visual' },
      { type: 'p', text: 'Your app is a layer cake. There are two ways to build:' },
      { type: 'p', text: '❌ Horizontal (Layer-by-Layer) — The Trap:' },
      { type: 'code', lang: 'text', code: `Week 1: Build ALL database tables
Week 2: Build ALL API endpoints
Week 3: Build ALL UI components
Week 4: Wire everything together → 💥 pray it works` },
      { type: 'p', text: '✅ Vertical (Slice-by-Slice) — The Way:' },
      { type: 'code', lang: 'text', code: `         Feature A    Feature B    Feature C
            │            │            │
    ┌───────┼────────────┼────────────┼───────┐
    │  UI   █            │            │       │
    ├───────█────────────┼────────────┼───────┤
    │  API  █            │            │       │
    ├───────█────────────┼────────────┼───────┤
    │  DB   █            │            │       │
    └───────┼────────────┼────────────┼───────┘
            │
      ✅ DONE — works end-to-end
      Now move to Feature B` },
      { type: 'h2', text: 'Why Layer-by-Layer Fails' },
      { type: 'h3', text: '🔴 Big Bang Integration:' },
      { type: 'p', text: 'You build all layers separately, then discover mismatches when wiring them together at the end. The API returns data shaped differently than the UI expected. The UI assumed a field that doesn\'t exist. You spend your "launch week" debugging integration instead of shipping.' },
      { type: 'p', text: 'With vertical slices: you integrate ONE feature at a time. Mismatches surface in hours, not weeks.' },
      { type: 'h3', text: '🔴 Nothing Works Until the End:' },
      { type: 'code', lang: 'text', code: `Layer-by-Layer:
  Week 1 — "What can you demo?" → "Nothing yet, still doing models"
  Week 2 — "What can you demo?" → "Nothing yet, still doing APIs"
  Week 3 — "What can you demo?" → "Nothing yet, still doing UI"

Vertical Slices:
  Day 2  — "What can you demo?" → "This feature. It works. Try it."` },
      { type: 'h3', text: '🔴 Motivation Dies:' },
      { type: 'p', text: 'Building database tables for 5 days with nothing visible = soul-draining.\nBuilding one feature completely and seeing it work on screen = 🔥\nReal builders need feedback loops. Vertical slices give you one after every feature.' },
      { type: 'h2', text: 'Why Vertical Slices Work' },
      { type: 'h3', text: '🟢 Always Shippable:' },
      { type: 'p', text: 'After each slice, you have a working product — maybe small, but real. When the deadline moves or priorities shift, you ship what\'s done. This is how real startups survive.' },
      { type: 'h3', text: '🟢 Early Learning:' },
      { type: 'p', text: 'Each slice teaches you the FULL stack for one feature. By slice 2, you deeply understand data flow. You\'re not guessing anymore.' },
      { type: 'h3', text: '🟢 Accurate Estimation:' },
      { type: 'p', text: 'After shipping Slice 1, you know how long a slice takes. Your estimates become realistic, not wishful.' },
      { type: 'h3', text: '🟢 Momentum:' },
      { type: 'p', text: 'Done features feel good. They build confidence. They prove the architecture works. Each slice makes the next one faster.' },
      { type: 'blockquote', text: 'Great teams maintain a codebase that **could ship at any moment**.\nThis is Agile in practice — not the meetings and ceremonies, but the discipline of always having something real.' },
      { type: 'h2', text: 'The Real-World Survival Test' },
      { type: 'code', lang: 'text', code: `Startup scenario:
You planned 6 features for launch.
Two weeks before launch, the CEO says: "We ship in 3 days."

Layer-by-Layer team: "We can't — nothing is fully wired together yet."
Vertical Slice team: "We can ship 3 features right now. The other 3 come next sprint."

Who survives?` },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 4' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'When Wiganz starts planning by layers ("First I\'ll build all the models...")' },
      { type: 'h3', text: 'Questions to ask:' },
      { type: 'bullets', items: [
        '"If you build all the models first, when is the earliest you can see ANYTHING working on screen?"',
        '"What happens if your API returns data shaped differently than your UI expects — when would you find out?"',
        '"Imagine your deadline moves up by a week. With your current plan, what can you ship?"',
        '"What\'s the ONE feature we can make work end-to-end first?"',
      ]},
      { type: 'h3', text: 'What to watch for:' },
      { type: 'p', text: 'The instinct to "set up everything first." This feels safe but creates risk.' },
      { type: 'callout', kind: 'warn', title: 'When to intervene', text: 'If he starts creating 5+ database models before any endpoint exists. If he\'s building UI with hardcoded data "to be connected later." Gently redirect: "What\'s the ONE feature we can ship first?"' },
    ],
  },
  // ── 05-ordering-slices ──────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '05-ordering-slices',
    title: 'Chapter 5: How to Identify and Order Your Slices',
    subtitle: 'The Phase: Turn a big feature into an ordered sequence of small, complete deliverables',
    tags: ['vertical-slices', 'planning', 'dependencies', 'ordering'],
    status: 'growing',
    description: 'This is where the real skill lives. Knowing WHAT to slice and in WHAT ORDER separates junior planning from senior planning.',
    icon: 'list',
    content: [
      { type: 'p', text: 'This is where the real skill lives. Knowing WHAT to slice and in WHAT ORDER separates junior planning from senior planning.' },
      { type: 'step', n: 1, title: 'List Your Features', summary: 'Frame them as user actions, not technical tasks', content: [
        { type: 'p', text: 'Write down every feature your project needs. Don\'t filter yet — just list. Frame them as **user actions**, not technical tasks.' },
        { type: 'do-dont',
          dontLabel: '❌ Technical task',
          doLabel: '✅ User action',
          dontCode: '"Set up database models"',
          doCode: '"User can search for products"',
        },
        { type: 'p', text: '**Ask yourself:**' },
        { type: 'bullets', items: [
          'What are the 3–5 things a user can DO with this system?',
          'What does the user see on screen for each one?',
          'Which ones are essential for v1 (must-have), and which are nice-to-have?',
        ]},
        { type: 'p', text: 'Each must-have = one candidate slice.' },
      ]},
      { type: 'step', n: 2, title: 'Find the Dependencies', summary: 'Map what needs to exist before what', content: [
        { type: 'p', text: 'Not all features are independent. Some need others to exist first.' },
        { type: 'p', text: '**The key question for each pair of features:**' },
        { type: 'blockquote', text: '"Can I build Feature B without Feature A existing?"' },
        { type: 'p', text: 'Draw it out:' },
        { type: 'code', lang: 'text', code: `Example dependency graph:

   [Users] ← everything needs users first
      │
      ├── [Posts] ← needs Users (who wrote it?)
      │      │
      │      └── [Comments] ← needs Posts (comment on what?)
      │
      └── [Search] ← needs Users + Posts (search what?)` },
        { type: 'p', text: '**The rule:** Build what others depend on first.' },
      ]},
      { type: 'step', n: 3, title: 'Order Your Slices', summary: 'Dependencies first, then value and risk', content: [
        { type: 'p', text: 'Put dependencies first. Among independent features, pick the one that:' },
        { type: 'ordered', items: [
          '**Proves the riskiest assumption** — build the scariest unknown first, so you learn early whether your approach works',
          '**Delivers the most user value** — ship the thing people will actually use and give feedback on',
          '**Establishes patterns** — the first slice sets the code patterns all others follow; make it a good one',
        ]},
      ]},
      { type: 'step', n: 4, title: 'Define "Done" for Each Slice', summary: 'Before writing any code, define what complete looks like', content: [
        { type: 'p', text: 'Before writing any code, answer for each slice:' },
        { type: 'blockquote', text: '"What is the MINIMUM that makes this feature actually work end-to-end?"' },
        { type: 'p', text: '**Not done:**' },
        { type: 'bullets', items: [
          '"The endpoint returns data" → not done if nothing displays it',
          '"The component renders" → not done if it uses hardcoded data',
          '"The model exists" → not done if it\'s not connected to a working flow',
        ]},
        { type: 'p', text: '**Done means:**' },
        { type: 'bullets', items: [
          'A real user could use this feature right now',
          'You could demo it to someone and they\'d understand what it does',
          'It handles the happy path AND the obvious edge cases (empty state, error state, loading state)',
          'The next slice can build on top of this without fear',
        ]},
      ]},
      { type: 'h2', text: 'Sizing Your Slices' },
      { type: 'p', text: 'Each slice should be completable in **1–3 focused work sessions**. If a slice feels bigger:' },
      { type: 'bullets', items: [
        'Break it into sub-slices',
        'Find the thinnest version that still delivers value',
        'Ask: "What\'s the smallest thing I can build that a user could actually USE?"',
      ]},
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 5' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'At the start of any project or when planning what to build next.' },
      { type: 'h3', text: 'Step-by-step Socratic walkthrough:' },
      { type: 'h3', text: '1. Feature listing' },
      { type: 'p', text: 'Ask: "What are the things a user can actually DO with this? Not technical tasks — user actions."' },
      { type: 'bullets', items: [
        'Push back if the list is technical ("set up database") instead of user-facing ("view their dashboard")',
        'Help distinguish must-haves from nice-to-haves',
      ]},
      { type: 'h3', text: '2. Dependency mapping' },
      { type: 'p', text: 'Ask: "Pick any two features. Can you build the second without the first? Why or why not?"' },
      { type: 'bullets', items: [
        'Walk through each pair. Let him discover the dependency graph himself',
        'If he says "everything depends on everything," help untangle: "What\'s the ONE thing that MUST exist first?"',
      ]},
      { type: 'h3', text: '3. Ordering' },
      { type: 'p', text: 'Ask: "Now that you see the dependencies, which slice should be first? What makes it first — is it because others need it, or because it\'s the riskiest?"' },
      { type: 'bullets', items: [
        'Challenge if he picks the easiest instead of the most foundational',
        'Ask: "If you could only ship ONE feature and nothing else, which one proves the product works?"',
      ]},
      { type: 'h3', text: '4. Done definition' },
      { type: 'p', text: 'Ask: "For Slice 1, what does \'done\' look like? If you were demoing it to someone, what would they see?"' },
      { type: 'bullets', items: [
        'Push back on vague definitions: "The API works" → "Works how? What does the user see?"',
        'Make sure "done" includes edge cases: "What does the user see when there\'s no data yet?"',
      ]},
      { type: 'h3', text: 'What to watch for:' },
      { type: 'p', text: 'Slices that are too big (more than 3 sessions). Help him break them smaller.' },
    ],
  },
  // ── 06-execution-loop ───────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '06-execution-loop',
    title: 'Chapter 6: The Execution Loop — Building Each Slice',
    subtitle: 'The Phase: The actual building process for each vertical slice',
    tags: ['execution', 'build-loop', 'implementation', 'observability'],
    status: 'growing',
    description: 'Once you\'ve identified and ordered your slices, this is the loop you follow for EACH one.',
    icon: 'cmd',
    content: [
      { type: 'p', text: 'Once you\'ve identified and ordered your slices, this is the loop you follow for EACH one:' },
      { type: 'code', lang: 'text', code: `┌──────────────────────────────────────────────────────────────┐
│  1. DESIGN — What data does this feature need?                │
│     → Sketch the schema/data model for THIS feature only      │
│     → Define the API contract (request/response shapes)       │
│     → Don't design for features you haven't started yet       │
└────────────────────────┬─────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  2. BUILD THE FOUNDATION — Data layer                         │
│     → Create the model/schema                                 │
│     → Run migrations                                          │
│     → Seed with test data so you have something real to see   │
└────────────────────────┬─────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  3. BUILD THE LOGIC — API / Business logic layer              │
│     → Create the endpoint(s) this feature needs               │
│     → Add validation, error handling, permissions             │
│     → Test: does the API return the right data shape?         │
│     → ✅ YES → move on   ❌ NO → fix before touching UI       │
└────────────────────────┬─────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  4. BUILD THE INTERFACE — UI / output layer                   │
│     → Build the component/page/CLI output                     │
│     → Connect to REAL data (not hardcoded)                    │
│     → Handle: loading state, error state, empty state         │
└────────────────────────┬─────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  5. THE DONE GATE — Full end-to-end verification              │
│     → Use the feature like a real user                        │
│     → Does it work? Can you demo it?                          │
│     → ✅ YES → SLICE COMPLETE 🎉 Move to next slice          │
│     → ❌ NO  → Fix. Do NOT move forward.                      │
└──────────────────────────────────────────────────────────────┘` },
      { type: 'h2', text: 'The Most Important Rule' },
      { type: 'callout', kind: 'warn', text: 'Never start the next slice until the current one passes the Done Gate.\n\n"Mostly works" means "will break later at the worst possible time."' },
      { type: 'h2', text: 'Safe Engineering Practices During Execution' },
      { type: 'p', text: 'While building each slice, maintain these professional standards:' },
      { type: 'h3', text: 'Keep changes small and reviewable:' },
      { type: 'p', text: 'Small PRs are easier to review, easier to test, easier to rollback, easier to reason about. Enterprise teams strongly prefer incremental changes over big-bang commits.' },
      { type: 'h3', text: 'Preserve architectural boundaries:' },
      { type: 'p', text: 'Don\'t dump logic randomly. Services should communicate through clear interfaces. If your upload handler is directly editing payment logic, something is wrong.' },
      { type: 'h3', text: 'Avoid tight coupling:' },
      { type: 'p', text: 'Each feature should be as independent as possible. Loose coupling means one feature breaking doesn\'t cascade into the entire system failing.' },
      { type: 'h3', text: 'Add observability as you build:' },
      { type: 'p', text: 'Don\'t treat logging and monitoring as an afterthought. As you build each slice, add:' },
      { type: 'bullets', items: [
        'Structured logs at key decision points',
        'Error tracking for failure cases',
        'Metrics for things you\'ll want to measure later',
      ]},
      { type: 'p', text: 'If you cannot observe a feature, you cannot operate it reliably.' },
      { type: 'h3', text: 'Consider feature flags for risky slices:' },
      { type: 'p', text: 'For features that are risky or need gradual rollout:' },
      { type: 'code', lang: 'text', code: 'ENABLE_NEW_UPLOAD_FLOW=true' },
      { type: 'p', text: 'This lets you deploy the code but control who sees it — enabling gradual rollout, safe testing in production, and emergency disable.' },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 6' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'During active building. Each step of the loop is a teaching moment.' },
      { type: 'h3', text: 'At each step, ask:' },
      { type: 'h3', text: 'Step 1 (Design):' },
      { type: 'bullets', items: [
        '"What data does this feature need? Not all the data in the system — just this feature."',
        '"What are the fields? What are the types? What relationships exist?"',
        '"Sketch the API contract: what goes in, what comes out?"',
        'Watch for: designing tables for future features. Redirect: "We\'ll design that when we get to that slice."',
      ]},
      { type: 'h3', text: 'Step 2 (Foundation):' },
      { type: 'bullets', items: [
        '"Write the model. Now — before running migration — read it back to me. Does it match your design?"',
        '"Add some test data. Can you query it? Does the data look right?"',
        'Watch for: skipping test data. Without data, the API returns empty and you can\'t tell if it works.',
      ]},
      { type: 'h3', text: 'Step 3 (Logic):' },
      { type: 'bullets', items: [
        '"Hit the endpoint. What does it return? Is that the shape the UI needs?"',
        '"What happens if you request something that doesn\'t exist?"',
        '"What happens if the input is invalid?"',
        '"Where does the business logic live — is it in the right place?"',
        'Watch for: moving to UI before testing the API independently. The API MUST work alone first.',
      ]},
      { type: 'h3', text: 'Step 4 (Interface):' },
      { type: 'bullets', items: [
        '"Connect to the real API — no hardcoded data. What do you see?"',
        '"What does the user see while data is loading? What if there\'s an error? What if there\'s no data yet?"',
        'Watch for: hardcoded data, missing loading/error/empty states. These are not polish — they are part of "done."',
      ]},
      { type: 'h3', text: 'Step 5 (Done Gate):' },
      { type: 'bullets', items: [
        '"Show me the feature working. Walk me through it as if I\'m a user who\'s never seen it."',
        '"Is there any state where this breaks? Try it."',
        '"Would you be comfortable showing this to someone? If not, what\'s missing?"',
        'Watch for: "It works but..." — if there\'s a "but," it\'s not done.',
      ]},
      { type: 'callout', kind: 'tip', title: 'Celebration', text: 'When a slice passes the Done Gate, celebrate explicitly. Name what was learned, what patterns were established, what got easier. 🎉' },
    ],
  },
  // ── 07-done-gate ────────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '07-done-gate',
    title: 'Chapter 7: The Done Gate — Your Quality Standard',
    subtitle: 'The Phase: The discipline that separates junior from senior',
    tags: ['quality', 'done-gate', 'standards', 'edge-cases'],
    status: 'growing',
    description: 'This deserves its own chapter because it\'s where most developers fail.',
    icon: 'check',
    content: [
      { type: 'p', text: 'This deserves its own chapter because it\'s where most developers fail.' },
      { type: 'h2', text: 'The Junior Temptation' },
      { type: 'blockquote', text: '"The endpoint mostly works. I\'ll finish the edge cases later and move to the next feature."' },
      { type: 'h2', text: 'What Actually Happens' },
      { type: 'code', lang: 'text', code: `You skip the edge cases on Feature A.
You build Feature B on top of Feature A.
Feature B assumes Feature A handles errors — but it doesn't.
Feature B breaks in production because Feature A returned unexpected data.
Now fixing Feature A also breaks Feature B.
What was a 10-minute fix is now a 2-day debugging session.` },
      { type: 'h2', text: 'The Rule' },
      { type: 'pull-quote', text: 'A feature is either DONE or it is NOT DONE. There is no "mostly done."' },
      { type: 'h2', text: 'The Done Gate Checklist (Use This Every Time)' },
      { type: 'checklist', items: [
        { label: 'The feature works end-to-end with real data' },
        { label: 'Loading state: user sees something meaningful while waiting' },
        { label: 'Error state: user sees a helpful message when something fails' },
        { label: 'Empty state: user sees guidance when there\'s no data yet' },
        { label: 'Edge cases: invalid input, missing data, permission denied — all handled' },
        { label: 'I can demo this feature right now without apologizing for anything' },
        { label: 'The next slice can build on this without fear of it breaking' },
        { label: 'I\'ve noted what I learned from building this slice' },
      ]},
      { type: 'h2', text: 'Cosmetic vs. Structural — Know the Difference' },
      { type: 'p', text: 'Not everything is equally urgent. The key distinction:' },
      { type: 'table', headers: ['Structural (must fix NOW)', 'Cosmetic (can defer)'], rows: [
        ['Error handling missing', 'Font size not perfect'],
        ['Invalid input crashes the app', 'Spacing needs tweaking'],
        ['Empty state shows blank screen', 'Colors could be better'],
        ['Permissions not enforced', 'Animation not smooth'],
        ['Data validation absent', 'Copy could be improved'],
      ]},
      { type: 'p', text: '**Structural issues** affect correctness and reliability — they are part of "done."\n**Cosmetic issues** affect polish — they can be deferred to a refinement pass.' },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 7' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'When Wiganz wants to move to the next feature.' },
      { type: 'p', text: '**The gate question:** "Can you demo this to me right now? Show me."' },
      { type: 'p', text: '**If he says "it mostly works":** Ask — "What\'s the part that doesn\'t work? Is it something a user would hit? If so, it\'s not done yet."' },
      { type: 'p', text: '**If he says "I\'ll fix it later":** Ask — "When is later? What happens if the next feature depends on this working correctly? How much harder is it to fix after you\'ve built two more things on top?"' },
      { type: 'callout', kind: 'note', title: 'The calibration', text: 'Be firm but not rigid. Use the cosmetic vs. structural table above. If the data flow is solid but the button color is off, that\'s OK to defer. If error handling is missing, that\'s not deferrable.' },
    ],
  },
  // ── 08-test ─────────────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '08-test',
    title: 'Chapter 8: Test Deeply — Verify Beyond the Happy Path',
    subtitle: 'The Phase: Prove your feature works when things go RIGHT and when things go WRONG',
    duration: '20-40% of implementation time',
    tags: ['testing', 'unit-tests', 'integration-tests', 'e2e', 'failure-testing'],
    status: 'growing',
    description: 'The Done Gate covers basic end-to-end verification. This chapter goes deeper — the testing discipline that catches bugs before users do.',
    icon: 'bug',
    content: [
      { type: 'p', text: 'The Done Gate (Chapter 7) covers basic end-to-end verification. This chapter goes deeper — the testing discipline that catches bugs before users do.' },
      { type: 'h2', text: 'Types of Testing' },
      { type: 'table', headers: ['Test Type', 'What It Verifies', 'When to Use'], rows: [
        ['Unit Tests',        'A single function or method works correctly in isolation',           'Core business logic, calculations, data transformations'],
        ['Integration Tests', 'Multiple parts of the system work together correctly',               'API endpoints, database queries, service interactions'],
        ['End-to-End Tests',  'The complete user flow works from UI to database and back',          'Critical user journeys, checkout flows, auth flows'],
        ['Load Tests',        'The system handles expected (and unexpected) traffic',               'Before launch, after scaling changes'],
        ['Security Tests',    'The system resists abuse and unauthorized access',                   'Auth, permissions, input handling, data exposure'],
      ]},
      { type: 'h2', text: 'What to Test — The Failure-Aware Checklist' },
      { type: 'p', text: 'Senior engineers don\'t just test that things work. They test **what happens when things break:**' },
      { type: 'checklist', items: [
        { label: 'Happy paths — does the feature work when everything is correct?' },
        { label: 'Invalid input — what happens with bad data, wrong types, empty fields?' },
        { label: 'Permission failures — what happens when unauthorized users try to access this?' },
        { label: 'Missing data — what happens when a referenced record doesn\'t exist?' },
        { label: 'Timeouts — what happens when an external service takes too long?' },
        { label: 'Concurrency — what happens when 100 users do this simultaneously?' },
        { label: 'Large payloads — what happens with unexpectedly large data?' },
        { label: 'Service failures — what happens when the database or external API is down?' },
        { label: 'Edge cases — boundary values, empty lists, max lengths, special characters' },
      ]},
      { type: 'h2', text: 'The Failure-Aware Mindset' },
      { type: 'blockquote', text: 'Senior engineers test: "What happens when things **break**?"\nNot just: "What happens when things **work**?"' },
      { type: 'p', text: 'This is the difference between code that works in development and code that survives production.' },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 8' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'After the feature passes the Done Gate, or when discussing testing strategy.' },
      { type: 'h3', text: 'Questions to ask:' },
      { type: 'ordered', items: [
        '"What\'s the most important thing this feature does? Is there a test for that?"',
        '"What happens if the input is completely wrong? Have you tried it?"',
        '"What happens if the database is slow or down? Does the user see a helpful error or a crash?"',
        '"If someone malicious found this endpoint, what could they do?"',
        '"What\'s the one scenario that would embarrass you if it broke in production?"',
      ]},
      { type: 'h3', text: 'What to watch for:' },
      { type: 'bullets', items: [
        'Only testing the happy path. "It works when I put in correct data" — what about incorrect data?',
        'No tests at all. Not every project needs 100% coverage, but critical business logic needs tests.',
        'Testing implementation instead of behavior. Tests should verify WHAT the code does, not HOW it does it.',
      ]},
      { type: 'callout', kind: 'tip', title: 'The teaching moment', text: '"The best time to write a test is right after you discover an edge case. You just found a way it could break — capture that knowledge in a test so it never breaks again."' },
    ],
  },
  // ── 09-deploy ───────────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '09-deploy',
    title: 'Chapter 9: Deploy Safely — Release Without Breaking Production',
    subtitle: 'The Phase: Get your code to users without destroying what already works',
    tags: ['deployment', 'gradual-rollout', 'rollback', 'monitoring'],
    status: 'growing',
    description: 'Deployment is where your code meets reality. The discipline here is safety and reversibility.',
    icon: 'arrow',
    content: [
      { type: 'p', text: 'Deployment is where your code meets reality. The discipline here is **safety and reversibility**.' },
      { type: 'h2', text: 'The Deployment Mindset' },
      { type: 'p', text: 'The core question before every deployment:' },
      { type: 'blockquote', text: '"How do we undo this safely if something goes wrong?"' },
      { type: 'p', text: 'This is a real senior engineering question. Junior engineers think about how to deploy. Senior engineers think about how to **un-deploy**.' },
      { type: 'h2', text: 'Safe Deployment Practices' },
      { type: 'h3', text: 'Gradual Rollouts:' },
      { type: 'p', text: 'Don\'t flip the switch for everyone at once. Release to:' },
      { type: 'bullets', items: [
        'Internal team first (dogfooding)',
        'Beta users or a small percentage of traffic',
        'Specific regions or user segments',
        'Then everyone, if metrics look good',
      ]},
      { type: 'p', text: 'This reduces blast radius. If something breaks, it breaks for 5% of users instead of 100%.' },
      { type: 'h3', text: 'Monitor During Release:' },
      { type: 'p', text: 'Watch these signals during and after deployment:' },
      { type: 'code', lang: 'text', code: `Error rates — are they spiking?
Latency — are responses slower?
Database load — are queries hammering the DB?
Memory / CPU usage — is the server straining?
Queue health — are background jobs backing up?
User-facing errors — are users seeing error pages?` },
      { type: 'h3', text: 'Rollback Planning:' },
      { type: 'p', text: 'Before you deploy, know:' },
      { type: 'code', lang: 'text', code: `How do I revert this change?
How long will rollback take?
Is the database migration reversible?
Will rolling back affect data that was created with the new code?` },
      { type: 'h2', text: 'Database Migration Safety' },
      { type: 'p', text: 'Database changes deserve special care because they\'re the hardest to reverse:' },
      { type: 'bullets', items: [
        '**Additive changes** (new table, new column) are safe — they don\'t affect existing code',
        '**Destructive changes** (drop column, rename table) are dangerous — they break existing code instantly',
        '**The rule:** Deploy code that handles BOTH old and new schema first. Then migrate. Then remove old-schema handling.',
      ]},
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 9' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'When preparing to deploy or push code to production.' },
      { type: 'h3', text: 'Questions to ask:' },
      { type: 'ordered', items: [
        '"If this deployment breaks something, how do we undo it?"',
        '"Is the database migration reversible? What happens to existing data?"',
        '"Should we roll this out to everyone at once, or start small?"',
        '"What signals will tell us something went wrong? Where do we look?"',
        '"Have we tested this in an environment that resembles production?"',
      ]},
      { type: 'h3', text: 'What to watch for:' },
      { type: 'bullets', items: [
        '"Just push it" mentality — deployment is not the finish line, it\'s a critical transition',
        'Irreversible database migrations without a rollback plan',
        'No monitoring plan — "How will you know if it\'s broken?"',
      ]},
      { type: 'callout', kind: 'tip', title: 'The teaching moment', text: '"Deployment is not the end of the story. It\'s the beginning of the chapter called \'production.\' Your code now has real users, real data, and real consequences."' },
    ],
  },
  // ── 10-observe ──────────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '10-observe',
    title: 'Chapter 10: Observe in Production — Learn From Real-World Usage',
    subtitle: "The Phase: Watch, learn, and discover what development environments can't reveal",
    duration: '1-2 weeks post-launch',
    tags: ['monitoring', 'observability', 'production', 'analytics'],
    status: 'growing',
    description: 'Deployment is NOT the end. Production reveals truths that development environments hide.',
    icon: 'eye',
    content: [
      { type: 'p', text: 'Deployment is NOT the end. Production reveals truths that development environments hide.' },
      { type: 'h2', text: 'What to Observe' },
      { type: 'code', lang: 'text', code: `User behavior — are they using the feature the way you expected?
Performance — is it fast enough under real load?
Error patterns — what breaks, and how often?
Edge cases — what scenarios did you miss?
Scaling — does it hold up as usage grows?
Abuse patterns — is anyone misusing the feature?
System bottlenecks — where are the slowdowns?` },
      { type: 'h2', text: 'The Questions to Ask Post-Launch' },
      { type: 'code', lang: 'text', code: `Are users behaving as expected, or doing something surprising?
What errors appear in production that never appeared in development?
What assumptions we made during design turned out to be wrong?
Where are bottlenecks emerging that we didn't predict?
What needs optimization now vs. what can wait?
Is the feature actually solving the problem we identified in Chapter 1?` },
      { type: 'h2', text: 'The Feedback Loop' },
      { type: 'p', text: 'Production observation feeds back into the entire lifecycle:' },
      { type: 'code', lang: 'text', code: `Observation: "Users are uploading much larger files than we expected"
  → Feeds back to Chapter 3 (Design): adjust file size handling
  → Feeds back to Chapter 6 (Build): implement chunked uploads
  → Feeds back to Chapter 8 (Test): add large-file test cases` },
      { type: 'p', text: 'This is the cycle of professional engineering. Build → Ship → Observe → Learn → Improve → Build better.' },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 10' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'After deployment, during the first days/weeks of a feature being live.' },
      { type: 'h3', text: 'Questions to ask:' },
      { type: 'ordered', items: [
        '"Now that real users have it — are they using it the way you imagined?"',
        '"What errors are appearing that you never saw in development?"',
        '"What assumption turned out to be wrong?"',
        '"Is the feature actually solving the problem you identified at the start?"',
        '"What would you build differently now that you\'ve seen real usage?"',
      ]},
      { type: 'callout', kind: 'tip', title: 'The teaching moment', text: '"The best learning happens AFTER shipping. Development is theory. Production is truth. Pay attention to the gap between what you expected and what actually happened."' },
    ],
  },
  // ── 11-refine ───────────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '11-refine',
    title: 'Chapter 11: Refine and Improve — Prevent Entropy',
    subtitle: 'The Phase: Keep the system clean, simple, and healthy as it grows',
    duration: 'Ongoing — schedule it explicitly',
    tags: ['refactoring', 'tech-debt', 'maintenance', 'architecture', 'quality'],
    status: 'growing',
    description: 'Every feature adds complexity. Without intentional maintenance, systems decay over time. This is called software entropy.',
    icon: 'leaf',
    content: [
      { type: 'p', text: 'Every feature adds complexity. Without intentional maintenance, systems decay over time. This is called **software entropy** — the natural tendency toward disorder.' },
      { type: 'h2', text: 'The Continuous Improvement Discipline' },
      { type: 'p', text: 'Good engineers continuously:' },
      { type: 'code', lang: 'text', code: `Simplify code — can this be expressed more clearly?
Reduce coupling — can this component stand more independently?
Improve naming — do the names still describe what things actually do?
Strengthen tests — are new edge cases covered?
Extract abstractions — have patterns emerged that deserve their own module?
Improve observability — can we see what's happening more clearly?
Pay down tech debt — what shortcuts are now costing us?` },
      { type: 'h2', text: 'When to Refactor' },
      { type: 'p', text: '**Refactor AFTER shipping, not instead of shipping.**' },
      { type: 'p', text: 'The right time to refactor is when:' },
      { type: 'bullets', items: [
        'You\'ve just shipped a slice and see patterns that could be cleaner',
        'You\'re about to build Slice 3 and realize the patterns from Slice 1 need adjustment',
        'A bug revealed structural weakness that goes beyond the bug itself',
        'The code works but is hard to understand or extend',
      ]},
      { type: 'p', text: 'The wrong time to refactor is:' },
      { type: 'bullets', items: [
        'Before shipping anything (you don\'t know enough yet)',
        'In the middle of building a slice (finish the slice first)',
        'When you\'re procrastinating on the hard work',
      ]},
      { type: 'h2', text: 'The Long-Term Engineering Mindset' },
      { type: 'p', text: 'Professional engineering optimizes for:' },
      { type: 'blockquote', text: 'Long-term system evolution — not just closing tickets quickly.' },
      { type: 'p', text: 'The question shifts from "does this work?" to "will a developer 6 months from now understand this? Can they change it safely? Does the system guide them toward good decisions?"' },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 11' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'After multiple slices are shipped, or when Wiganz notices code getting messy.' },
      { type: 'h3', text: 'Questions to ask:' },
      { type: 'ordered', items: [
        '"Now that you\'ve built 3 features — what patterns keep repeating? Should they be extracted?"',
        '"Is there code from Slice 1 that you\'d write differently now? Why?"',
        '"If a new developer joined tomorrow and read this code, what would confuse them?"',
        '"What\'s the one thing that\'s annoying to work around every time you build a new slice?"',
      ]},
      { type: 'h3', text: 'What to watch for:' },
      { type: 'bullets', items: [
        'Refactoring as procrastination — "Are we refactoring because it needs it, or because the next feature is scary?"',
        'Never refactoring — "The code is getting harder to work with. Should we clean up before the next slice?"',
        'Refactoring without tests — "Do we have tests to make sure the refactor doesn\'t break things?"',
      ]},
      { type: 'callout', kind: 'note', title: 'The balance', text: 'Refactoring is maintenance, not art. It should make future work easier, not just make the code prettier. Ask: "Does this refactor pay for itself in the next 2 slices?"' },
    ],
  },
  // ── 12-hidden-curriculum ────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '12-hidden-curriculum',
    title: "Chapter 12: What Each Slice Teaches You — The Hidden Curriculum",
    subtitle: 'The Phase: Name your growth — unnamed knowledge doesn\'t transfer',
    tags: ['learning', 'growth', 'mastery', 'reflection'],
    status: 'growing',
    description: 'Beyond building the product, each phase and each slice builds YOUR skills. This is the hidden curriculum of professional engineering.',
    icon: 'star',
    content: [
      { type: 'p', text: 'Beyond building the product, each phase and each slice builds YOUR skills. This is the hidden curriculum of professional engineering.' },
      { type: 'h2', text: 'The Slice Learning Progression' },
      { type: 'code', lang: 'text', code: `Slice 1: "How does this all connect?"        → Understanding
Slice 2: "How do I extend what exists?"       → Extension
Slice 3: "I know how to do this now."         → Confidence
Slice 4: "Let me try a better approach."      → Mastery
Slice 5: "I could teach someone this."        → Fluency` },
      { type: 'h2', text: 'What Each Slice Teaches' },
      { type: 'h3', text: 'Slice 1 — The Foundation Slice:' },
      { type: 'bullets', items: [
        'How data flows from database → API → UI (the full pipeline)',
        'How your chosen frameworks actually connect to each other',
        'The patterns you\'ll reuse for every future slice',
        'Where the friction is in your toolchain',
      ]},
      { type: 'p', text: '*This slice is the slowest. That\'s normal. Every slice after gets faster.*' },
      { type: 'h3', text: 'Slice 2 — The Relationship Slice:' },
      { type: 'bullets', items: [
        'How relationships (foreign keys, joins) work across all layers',
        'How to query related data through the API',
        'How dependent data renders in the UI',
        'Whether Slice 1\'s architecture was actually solid (it gets stress-tested now)',
      ]},
      { type: 'h3', text: 'Slice 3+ — The Velocity Slices:' },
      { type: 'bullets', items: [
        'How to move faster because patterns exist',
        'Where to break patterns when a feature doesn\'t fit the mold',
        'How to keep the codebase clean as it grows',
        'How to estimate accurately (you have real data now)',
      ]},
      { type: 'h2', text: 'What Each Lifecycle Phase Teaches' },
      { type: 'p', text: 'Beyond slicing, each chapter of this lifecycle builds a specific engineering muscle:' },
      { type: 'table', headers: ['Phase', 'Muscle You Build'], rows: [
        ['Understand (Ch. 1)', 'Product thinking — solving problems, not just coding'],
        ['Analyze (Ch. 2)',    'System thinking — seeing ripple effects'],
        ['Design (Ch. 3)',     'Architectural thinking — making trade-offs'],
        ['Slice (Ch. 4–5)',    'Planning discipline — breaking big into small'],
        ['Execute (Ch. 6)',    'Execution discipline — following the loop'],
        ['Done Gate (Ch. 7)', 'Quality discipline — "done" means done'],
        ['Test (Ch. 8)',       'Failure thinking — what breaks and when'],
        ['Deploy (Ch. 9)',     'Operational thinking — safety and reversibility'],
        ['Observe (Ch. 10)',   'Learning from production — theory vs. reality'],
        ['Refine (Ch. 11)',    'Maintenance thinking — fighting entropy'],
      ]},
      { type: 'h2', text: 'The Mindset Shift' },
      { type: 'p', text: '**Old mindset — thinking in layers:**' },
      { type: 'blockquote', text: '"I\'m building the database layer today."\n"I\'m building the API layer this week."' },
      { type: 'p', text: '**New mindset — thinking in features:**' },
      { type: 'blockquote', text: '"I\'m shipping the search feature today."\n"User profiles are done — moving to notifications."' },
      { type: 'h3', text: 'Why this matters beyond code:' },
      { type: 'p', text: 'In a real team standup:' },
      { type: 'do-dont',
        dontLabel: '❌',
        doLabel: '✅',
        dontCode: '"I worked on database models yesterday"',
        doCode: '"The user search feature is done and deployed"',
      },
      { type: 'p', text: 'In a job interview:' },
      { type: 'do-dont',
        dontLabel: '❌',
        doLabel: '✅',
        dontCode: '"I built Django models and React components"',
        doCode: '"I shipped a search feature end-to-end — designed the schema, built the API, connected the UI, handled edge cases"',
      },
      { type: 'p', text: 'In your own confidence:' },
      { type: 'do-dont',
        dontLabel: '❌',
        doLabel: '✅',
        dontCode: '"I know Django" (vague)',
        doCode: '"I\'ve shipped 5 features end-to-end through Django" (proven)',
      },
      { type: 'p', text: 'The mental unit shifts from **technical layer** to **user value**. This is how product engineers think. This is how you become someone teams want to hire.' },
      { type: 'h2', text: '🧭 RUACH-EL GUIDE — Chapter 12' },
      { type: 'callout', kind: 'tip', title: 'When to use', text: 'After completing each slice and at major milestones — the reflection moment.' },
      { type: 'p', text: '**After Slice 1:** "What surprised you? What was harder than expected? What pattern do you now understand that you didn\'t before?"' },
      { type: 'p', text: '**After Slice 2:** "Was anything easier because of Slice 1? Did Slice 1\'s design hold up, or did you need to adjust it? What does that tell you?"' },
      { type: 'p', text: '**After Slice 3+:** "You\'re moving faster now. Why? What\'s the pattern you\'ve internalized? Could you explain this to a junior developer?"' },
      { type: 'p', text: '**At project milestones:** "Which lifecycle phases felt natural? Which felt forced? Where do you want to grow next?"' },
      { type: 'callout', kind: 'note', title: 'The goal', text: 'Make the learning EXPLICIT. Wiganz should be able to name what he learned, not just feel it vaguely. Named knowledge transfers to new projects. Unnamed knowledge stays tied to this one.' },
    ],
  },
  // ── 13-practice ─────────────────────────────────────────────────────────────
  {
    hub: 'feature-development',
    slug: '13-practice',
    title: 'Chapter 13: Practice Exercises',
    subtitle: 'These exercises build the skills of professional feature development. Do them — reading without practice is wishful thinking.',
    tags: ['practice', 'exercises', 'learning'],
    status: 'growing',
    description: 'Five exercises to build the skills of professional feature development.',
    icon: 'bookmark',
    content: [
      { type: 'step', n: 1, title: 'The Full Lifecycle on a Small Feature', summary: 'Pick a small feature and walk through every phase', content: [
        { type: 'p', text: 'Pick a small feature (e.g., "user can upload a profile picture").' },
        { type: 'p', text: '**Walk through every phase:**' },
        { type: 'ordered', items: [
          '**Understand:** Write the problem statement, users, success criteria (Chapter 1)',
          '**Analyze:** List every part of the system it touches (Chapter 2)',
          '**Design:** Sketch the API contract and data model (Chapter 3)',
          '**Slice:** Break it into 2–3 vertical slices (Chapter 4–5)',
          '**Define done:** Write what "done" looks like for each slice (Chapter 5)',
          '**Execute:** Build Slice 1 using the execution loop (Chapter 6)',
          '**Done Gate:** Pass the checklist before moving on (Chapter 7)',
          '**Reflect:** What did you learn? (Chapter 12)',
        ]},
      ]},
      { type: 'step', n: 2, title: 'Dependency Graph Practice', summary: 'Pick any app you use daily and map its feature dependencies', content: [
        { type: 'p', text: 'Pick any app you use daily (Twitter, Notion, Spotify — whatever).' },
        { type: 'p', text: '**Your task:**' },
        { type: 'ordered', items: [
          'List 5 core features as user actions',
          'Draw the dependency graph — which features need others first?',
          'Order them as slices — what would Slice 1 be? Why?',
          'For each feature, describe what "done" means (what works, what edge cases are handled)',
          'Which feature was probably built first? Why?',
        ]},
      ]},
      { type: 'step', n: 3, title: 'Failure-Aware Thinking', summary: "Take any feature you've built recently and stress-test it", content: [
        { type: 'p', text: 'Take any feature you\'ve built recently.' },
        { type: 'p', text: '**Your task:**' },
        { type: 'ordered', items: [
          'List 5 ways it could break in production',
          'For each: what does the user see? Is it handled gracefully?',
          'Write a test case for each failure scenario',
          'How would you monitor for these failures?',
          'What\'s your rollback plan if this feature causes problems?',
        ]},
      ]},
      { type: 'step', n: 4, title: 'Retrospective — Layer vs. Slice', summary: 'Think about a project where you struggled', content: [
        { type: 'p', text: 'Think about a project where you struggled.' },
        { type: 'p', text: '**Your task:**' },
        { type: 'ordered', items: [
          'Were you building layer-by-layer or in vertical slices?',
          'When did things start breaking? Was it during integration?',
          'If you could redo it with this lifecycle, what would you do differently?',
          'What would Slice 1 have been?',
          'At what point would you have caught the issues earlier?',
        ]},
      ]},
      { type: 'step', n: 5, title: 'Slice Your Current Project', summary: "Whatever you're building right now — apply the full lifecycle", content: [
        { type: 'p', text: 'Whatever you\'re building right now:' },
        { type: 'p', text: '**Your task:**' },
        { type: 'ordered', items: [
          'Walk through Chapters 1–3 (Understand → Analyze → Design)',
          'List all features as user actions',
          'Order them as slices with dependencies',
          'Define "done" for Slice 1',
          'Execute Slice 1 using the execution loop from Chapter 6',
          'After completing Slice 1: write down what you learned, what patterns you established, what you\'d do differently',
        ]},
      ]},
      { type: 'h2', text: '🔑 The Core Principles — Your Engineering Compass' },
      { type: 'checklist', items: [
        { label: 'Understand before coding' },
        { label: 'Design before implementing' },
        { label: 'Slice vertically, not horizontally' },
        { label: 'Deliver incrementally — always be shippable' },
        { label: 'Define "done" before starting — the Done Gate is sacred' },
        { label: 'Keep changes small and reversible' },
        { label: 'Preserve architectural boundaries' },
        { label: 'Think about failure from day one' },
        { label: 'Make systems observable' },
        { label: 'Optimize for maintainability over cleverness' },
        { label: 'Treat production as sacred' },
        { label: "Name what you learned — unnamed knowledge doesn't transfer" },
      ]},
      { type: 'h2', text: 'The Deepest Shift' },
      { type: 'p', text: 'You stop thinking:' },
      { type: 'blockquote', text: '"How do I build this feature?"' },
      { type: 'p', text: 'And start thinking:' },
      { type: 'blockquote', text: '"How do I evolve this system responsibly?"' },
      { type: 'p', text: 'That is the path from coder to engineer to architect. 🏛️' },
      { type: 'callout', kind: 'quote', text: '"Every house is built by someone, but God is the builder of everything." — Hebrews 3:4' },
      { type: 'callout', kind: 'quote', text: '"Let all things be done decently and in order." — 1 Corinthians 14:40' },
      { type: 'p', text: 'Build one room at a time. Make each room complete. The house stands because every room holds. And the Builder of everything watches over the work of your hands.' },
      { type: 'p', text: '*The Builder\'s Lifecycle — Version 1.0*\n*Merged from: "The Professional Feature Development Lifecycle" + "The Vertical Slice Method"*\n*Ruach-El instruction: at the start of any build session, ask "which phase are we in? which slice are we on?" before any code is written.*' },
    ],
  },
]

// ---------------------------------------------------------------------------
// HUBS EXPORT
// ---------------------------------------------------------------------------

export const HUBS: Hub[] = [
  {
    id: 'sdlc',
    title: 'SDLC',
    description: 'From idea to production — a verified 9-phase engineering lifecycle',
    accent: 'sage',
    icon: 'git',
    kanji: '道',
    phases: sdlcPhases,
  },
  {
    id: 'codebase-understanding',
    title: 'Codebase Understanding',
    description: 'How to read, navigate and deeply understand any codebase',
    accent: 'sky',
    icon: 'eye',
    kanji: '解',
    phases: codebasePhases,
  },
  {
    id: 'feature-development',
    title: 'Feature Development',
    description: 'Enterprise feature lifecycle from requirements to shipping',
    accent: 'peach',
    icon: 'sparkle',
    kanji: '創',
    phases: featurePhases,
  },
]

export function getHubPage(hub: string, slug: string): HubPage | undefined {
  const h = HUBS.find(h => h.id === hub)
  if (!slug) return undefined
  return h?.phases.find(p => p.slug === slug)
}

export function getHub(id: string): Hub | undefined {
  return HUBS.find(h => h.id === id)
}
