export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; kanji?: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'bullets'; items: string[] }
  | { type: 'ordered'; items: string[] }
  | { type: 'callout'; kind: 'tip' | 'note' | 'warn' | 'quote' | 'danger' | 'success'; title?: string; text: string }
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
  {
    hub: 'codebase-understanding',
    slug: '01-orient',
    title: 'Steps 1+2: Identify Purpose + Identify Tech Stack',
    subtitle: 'Orient yourself — understand what the system exists to do',
    duration: '1-2 hours',
    tags: ['orientation', 'purpose', 'tech-stack'],
    status: 'growing',
    description: 'Build a first mental model before diving into code.',
    icon: 'compass',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand what this system exists to do. Without this, code feels random.',
      },
      {
        type: 'h2',
        text: 'Step 1 — Identify the Purpose of the System',
      },
      {
        type: 'p',
        text: 'Understand: what problem the system solves, who uses it, what business/domain it belongs to, and what the main workflows are. Without this, code feels random.',
      },
      {
        type: 'h3',
        text: 'What To Look For',
      },
      {
        type: 'list',
        items: ['README.md', 'docs/', 'landing page', 'API docs', 'product pages', 'issue tracker', 'environment names', 'package names'],
      },
      {
        type: 'code',
        lang: 'text',
        code: `What does this system do?
Who are the users?
What are the core features?
What actions do users perform most?
What business problem is being solved?`,
      },
      {
        type: 'h3',
        text: 'Output You Should Produce',
      },
      {
        type: 'code',
        lang: 'text',
        code: `This is a SaaS platform for X.
Users can:
- do A
- do B
- do C

Main workflows:
1. login
2. create resource
3. process payment
4. notifications`,
      },
      {
        type: 'h2',
        text: 'Step 2 — Identify the Tech Stack',
      },
      {
        type: 'p',
        text: 'Understand: languages, frameworks, and infrastructure (THIS IS REALLY IMPORTANT TO UNDERSTAND THE INFRASTRUCTURE OF THE SYSTEM). This tells you where things probably live, common patterns, and likely conventions.',
      },
      {
        type: 'h3',
        text: 'Frontend — Look For',
      },
      {
        type: 'code',
        lang: 'text',
        code: `package.json
vite.config
next.config
webpack.config`,
      },
      {
        type: 'h3',
        text: 'Backend — Look For',
      },
      {
        type: 'code',
        lang: 'text',
        code: `requirements.txt
pyproject.toml
manage.py
pom.xml
go.mod
Gemfile`,
      },
      {
        type: 'h3',
        text: 'Infrastructure — Look For (REALLY REALLY IMPORTANT)',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Dockerfile
docker-compose.yml
terraform/
k8s/
.github/workflows/`,
      },
      {
        type: 'h3',
        text: 'Output You Should Produce',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Frontend:
- React + Vite

Backend:
- Django Rest Framework

Database:
- PostgreSQL

Infra:
- Docker
- AWS S3
- Redis
- Celery`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '02-entry-points',
    title: 'Step 3: Find Application Entry Points',
    subtitle: 'Learn where execution begins — your navigation anchor',
    duration: '30-60 min',
    tags: ['entry-points', 'routing', 'startup'],
    status: 'growing',
    description: 'Every system starts somewhere. Find it.',
    icon: 'door-open',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Learn where execution begins. This becomes your navigation anchor.',
      },
      {
        type: 'p',
        text: 'Every system starts somewhere. You need to know where execution begins. This becomes your navigation anchor.',
      },
      {
        type: 'h2',
        text: 'Frontend Entry Files',
      },
      {
        type: 'code',
        lang: 'text',
        code: `main.jsx
index.js
App.tsx`,
      },
      {
        type: 'list',
        items: ['routing', 'app providers', 'global state', 'root layout'],
      },
      {
        type: 'h2',
        text: 'Backend Entry Files',
      },
      {
        type: 'code',
        lang: 'text',
        code: `main.py
manage.py
server.js
app.py`,
      },
      {
        type: 'list',
        items: ['routes', 'middleware', 'authentication', 'app initialization'],
      },
      {
        type: 'h2',
        text: 'Background Workers',
      },
      {
        type: 'code',
        lang: 'text',
        code: `celery.py
workers/
jobs/
queues/
cron/`,
      },
      {
        type: 'h2',
        text: 'Infrastructure Startup',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Dockerfile
docker-compose.yml
entrypoint.sh
Makefile`,
      },
      {
        type: 'h2',
        text: 'Questions To Answer',
      },
      {
        type: 'code',
        lang: 'text',
        code: `What starts the application?
How are routes registered?
Where is middleware configured?
Where are services initialized?
Where are environment variables loaded?`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '03-architecture',
    title: 'Architecture Style Deep Dive',
    subtitle: 'Understand HOW the system is conceptually organized — all 7 dimensions',
    duration: '2-4 hours',
    tags: ['architecture', 'system-design', 'patterns'],
    status: 'growing',
    description: 'This is where engineering starts becoming architecture thinking.',
    icon: 'layers',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand HOW the system is architecturally shaped — not just what technologies exist, but how the entire system is organized.',
      },
      {
        type: 'p',
        text: 'This step is about understanding how the system is architecturally shaped. This helps you predict where code lives, how components communicate, how scalable the system is, where bottlenecks exist, how failures propagate, how tightly coupled the system is, and what engineering tradeoffs were made.',
      },
      {
        type: 'h2',
        text: 'Important Distinction',
      },
      {
        type: 'table',
        headers: ['Layer', 'Purpose'],
        rows: [
          ['Tech Stack', 'WHAT technologies/tools exist'],
          ['Architecture Style', 'HOW the system is organized'],
        ],
      },
      {
        type: 'h3',
        text: 'Example',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Tech Stack:
React
Django
PostgreSQL
Redis
Docker

This tells you: WHAT tools exist.

Architecture Style:
Modular monolith
REST API
Async task processing
Layered service architecture
Stateless authentication
Queue-based background jobs
Redis caching

This tells you: HOW the system behaves.

That distinction is HUGE.`,
      },
      {
        type: 'step',
        n: 1,
        title: 'System Shape',
        summary: 'Understand the high-level structural pattern of the system',
        content: [
          {
            type: 'p',
            text: 'Understand the high-level structural pattern of the system.',
          },
          {
            type: 'list',
            items: ['monolith', 'modular monolith', 'microservices', 'event-driven', 'serverless', 'layered architecture', 'clean architecture', 'hexagonal architecture', 'CQRS', 'domain-driven design (DDD)', 'plugin-based', 'service-oriented architecture (SOA)'],
          },
          {
            type: 'code',
            lang: 'text',
            code: `Is everything deployed together?
Are modules isolated?
Do services own their own databases?
Is communication synchronous or async?
Is business logic centralized or distributed?`,
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Communication Style',
        summary: 'Understand how different parts of the system talk to each other',
        content: [
          {
            type: 'p',
            text: 'Understand how different parts of the system talk to each other.',
          },
          {
            type: 'list',
            items: ['REST', 'GraphQL', 'WebSockets', 'gRPC / RPC', 'message queues', 'pub/sub', 'event streaming', 'polling', 'webhooks'],
          },
          {
            type: 'code',
            lang: 'text',
            code: `How does frontend communicate with backend?
How do services communicate?
How are async tasks triggered?
What happens if communication fails?`,
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'State Management Style',
        summary: 'Understand where the system stores truth',
        content: [
          {
            type: 'p',
            text: 'Understand where the system stores truth. State management is one of the hardest parts of software architecture.',
          },
          {
            type: 'list',
            items: ['frontend state', 'database', 'Redis cache', 'browser storage', 'sessions', 'distributed cache', 'event streams', 'object storage (S3)', 'search indexes'],
          },
          {
            type: 'code',
            lang: 'text',
            code: `What is the source of truth?
What data is cached?
What data is temporary?
What data is eventually consistent?
How is synchronization handled?`,
          },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Processing Style',
        summary: 'Understand HOW work is executed',
        content: [
          {
            type: 'p',
            text: 'Understand HOW work is executed.',
          },
          {
            type: 'list',
            items: ['synchronous', 'asynchronous', 'queue-based', 'event-driven', 'eventually consistent', 'batch-based', 'stream-processing', 'real-time'],
          },
          {
            type: 'code',
            lang: 'text',
            code: `What operations happen instantly?
What gets deferred to workers?
What happens in the background?
How are retries handled?
How are long-running tasks managed?`,
          },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Coupling & Modularity',
        summary: 'Understand how dependent components are on each other',
        content: [
          {
            type: 'p',
            text: 'Understand how dependent components are on each other. This reveals maintainability, scalability, engineering maturity, and fragility.',
          },
          {
            type: 'list',
            items: ['tightly coupled', 'loosely coupled', 'highly modular', 'dependency-heavy', 'domain-separated', 'interface-driven'],
          },
          {
            type: 'code',
            lang: 'text',
            code: `Can modules be changed independently?
What breaks when one component changes?
Are responsibilities clearly separated?
Are there circular dependencies?
How reusable are components?`,
          },
        ],
      },
      {
        type: 'step',
        n: 6,
        title: 'Failure Behavior',
        summary: 'Understand how the system behaves under stress or failure',
        content: [
          {
            type: 'p',
            text: 'Understand how the system behaves under stress or failure. Real architecture reveals itself during failure.',
          },
          {
            type: 'list',
            items: ['retries', 'fallbacks', 'circuit breakers', 'timeouts', 'dead letter queues', 'graceful degradation', 'monitoring alerts', 'recovery behavior'],
          },
          {
            type: 'code',
            lang: 'text',
            code: `What happens if Redis dies?
What happens if the DB becomes slow?
What failures crash the system?
What failures are isolated?
How resilient is the architecture?`,
          },
        ],
      },
      {
        type: 'step',
        n: 7,
        title: 'Scalability Model',
        summary: 'Understand how the system grows under load',
        content: [
          {
            type: 'p',
            text: 'Understand how the system grows under load.',
          },
          {
            type: 'list',
            items: ['horizontal scaling', 'vertical scaling', 'stateless services', 'load balancing', 'caching strategy', 'queue scaling', 'DB bottlenecks', 'read/write separation'],
          },
          {
            type: 'code',
            lang: 'text',
            code: `What becomes the bottleneck first?
Can services scale independently?
What components are stateful?
How expensive is scaling?`,
          },
        ],
      },
      {
        type: 'h2',
        text: 'Questions You Should ALWAYS Ask',
      },
      {
        type: 'code',
        lang: 'text',
        code: `How do services communicate?
What happens during failure?
Where are bottlenecks?
How scalable is this architecture?
Why was this style chosen?
What tradeoffs exist?
What assumptions hold the system together?`,
      },
      {
        type: 'h2',
        text: 'Output Example',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Architecture Style:
- Modular monolith
- Layered backend architecture
- REST-based communication
- Async background jobs with Celery
- Redis caching
- Stateless authentication via JWT
- Queue-based task processing
- S3 object storage
- PostgreSQL as source of truth`,
      },
      {
        type: 'callout',
        kind: 'note',
        title: 'THIS Is Where Real Engineering Starts',
        text: 'Because now you are no longer seeing files. You are seeing system philosophy. That is the leap from developer → architect thinking.',
      },
      {
        type: 'p',
        text: 'A system\'s architecture is really a collection of engineering tradeoffs. Every architecture style optimizes for something:',
      },
      {
        type: 'list',
        items: ['scalability', 'simplicity', 'deployment speed', 'team size', 'fault isolation', 'development velocity', 'operational complexity'],
      },
      {
        type: 'callout',
        kind: 'quote',
        text: '"By wisdom a house is built." — Proverbs 24:3',
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '04-data-flow',
    title: 'Steps 5+6: Pick ONE Flow + Follow Complete Request Lifecycle',
    subtitle: 'Trace one complete user flow end-to-end',
    duration: '2-3 hours',
    tags: ['data-flow', 'tracing', 'request-lifecycle'],
    status: 'growing',
    description: 'The MOST important step. Do NOT read random files — trace one complete user flow.',
    icon: 'flow',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the system dynamically. Trace one complete user flow. This creates connected understanding.',
      },
      {
        type: 'h2',
        text: 'Step 5 — Pick ONE Important Feature',
      },
      {
        type: 'p',
        text: 'This is the MOST important step. Do NOT read random files. Instead, trace one complete user flow. This creates connected understanding.',
      },
      {
        type: 'h3',
        text: 'Good Features To Trace',
      },
      {
        type: 'list',
        items: ['login', 'signup', 'file upload', 'checkout', 'chat message', 'create post', 'search', 'notifications'],
      },
      {
        type: 'code',
        lang: 'text',
        code: `What triggers this flow?
What API is called?
Where is validation?
Where is business logic?
Where is state updated?
What DB tables are touched?
What background jobs run?
What response returns?`,
      },
      {
        type: 'h2',
        text: 'Step 6 — Follow the Entire Request Lifecycle',
      },
      {
        type: 'p',
        text: 'Learn how data moves through the system. Systems are mostly data transformations.',
      },
      {
        type: 'h3',
        text: 'Frontend',
      },
      {
        type: 'list',
        items: ['component', 'form', 'API call', 'state update'],
      },
      {
        type: 'h3',
        text: 'Backend',
      },
      {
        type: 'list',
        items: ['route/controller', 'serializer/validator', 'service layer', 'DB operations', 'response formatter'],
      },
      {
        type: 'h3',
        text: 'Database',
      },
      {
        type: 'list',
        items: ['inserts', 'updates', 'queries', 'joins', 'transactions'],
      },
      {
        type: 'h3',
        text: 'Async Processing',
      },
      {
        type: 'list',
        items: ['queues', 'workers', 'scheduled jobs', 'events'],
      },
      {
        type: 'h2',
        text: 'Output Example',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Upload Flow:

React Form
→ axios POST
→ Django route
→ serializer validation
→ service uploads to S3
→ DB record created
→ Celery thumbnail job
→ API response
→ frontend updates UI`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '05-dependencies',
    title: 'Step 4: Create High-Level Architecture Map',
    subtitle: 'Understand the major building blocks and how they communicate',
    duration: '1-2 hours',
    tags: ['architecture', 'dependencies', 'components'],
    status: 'seed',
    description: 'The beginning of architecture thinking.',
    icon: 'map',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the major building blocks and how major components communicate. This is the beginning of architecture thinking.',
      },
      {
        type: 'p',
        text: 'You need to see how major components communicate. This is the beginning of architecture thinking.',
      },
      {
        type: 'h2',
        text: 'Frontend — Identify',
      },
      {
        type: 'list',
        items: ['routing', 'state management', 'API layer', 'component structure', 'authentication flow'],
      },
      {
        type: 'h3',
        text: 'Possible Patterns',
      },
      {
        type: 'list',
        items: ['Redux', 'Zustand', 'Context API', 'React Query'],
      },
      {
        type: 'h2',
        text: 'Backend — Identify',
      },
      {
        type: 'list',
        items: ['controllers/routes', 'services', 'models', 'repositories', 'middleware', 'background jobs'],
      },
      {
        type: 'h3',
        text: 'Possible Architectures',
      },
      {
        type: 'list',
        items: ['MVC', 'layered', 'clean architecture', 'microservices', 'monolith'],
      },
      {
        type: 'h2',
        text: 'Database — Identify',
      },
      {
        type: 'list',
        items: ['main entities', 'relationships', 'ownership', 'transaction boundaries'],
      },
      {
        type: 'h2',
        text: 'External Services — Identify',
      },
      {
        type: 'list',
        items: ['Stripe', 'AWS S3', 'Firebase', 'Twilio', 'SendGrid', 'OAuth providers'],
      },
      {
        type: 'h2',
        text: 'Output Example',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Frontend
  ↓
REST API
  ↓
Django Controllers
  ↓
Service Layer
  ↓
PostgreSQL

Background jobs:
Celery + Redis

File uploads:
AWS S3`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '06-tests',
    title: 'Step 11: Read the Tests',
    subtitle: 'Learn intended behavior — tests sometimes explain the system better than docs',
    duration: '1-2 hours',
    tags: ['tests', 'behavior', 'edge-cases'],
    status: 'seed',
    description: 'Tests reveal expected behavior, edge cases, business rules, and assumptions.',
    icon: 'test-tube',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Learn intended behavior. Sometimes tests explain the system better than documentation.',
      },
      {
        type: 'p',
        text: 'Tests reveal: expected behavior, edge cases, business rules, and assumptions. Sometimes tests explain the system better than docs.',
      },
      {
        type: 'h2',
        text: 'What To Look For',
      },
      {
        type: 'list',
        items: ['unit tests', 'integration tests', 'e2e tests'],
      },
      {
        type: 'h3',
        text: 'Look For',
      },
      {
        type: 'list',
        items: ['edge cases', 'permission logic', 'validation rules', 'business invariants'],
      },
      {
        type: 'code',
        lang: 'text',
        code: `What behavior is considered critical?
What edge cases matter?
What assumptions are protected?
What business rules are enforced?`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '07-dev-environment',
    title: 'Step 8: Run the System Locally',
    subtitle: 'Convert theory into real understanding through interaction and experimentation',
    duration: '1-3 hours',
    tags: ['dev-environment', 'local-setup', 'experimentation'],
    status: 'seed',
    description: 'Static reading is NOT enough. Real understanding begins with running the system.',
    icon: 'terminal',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Convert theory into real understanding. Static reading is NOT enough — you need interaction, observation, and experimentation.',
      },
      {
        type: 'p',
        text: 'Static reading is NOT enough. You need interaction, observation, and experimentation. This is where real understanding begins.',
      },
      {
        type: 'h2',
        text: 'Setup',
      },
      {
        type: 'terminal',
        lines: ['npm install', 'pip install -r requirements.txt', 'docker compose up'],
      },
      {
        type: 'h2',
        text: 'Trigger Flows',
      },
      {
        type: 'list',
        items: ['creating users', 'submitting forms', 'uploading files', 'causing validation errors', 'refreshing pages', 'deleting data'],
      },
      {
        type: 'h2',
        text: 'Observe',
      },
      {
        type: 'list',
        items: ['logs', 'network requests', 'DB changes', 'cache changes', 'worker jobs', 'API timing'],
      },
      {
        type: 'code',
        lang: 'text',
        code: `What happens when things succeed?
What happens when they fail?
What logs appear?
What services communicate?
What changes in the DB?`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '08-domain-language',
    title: 'Step 7: Study the Database Schema',
    subtitle: 'The database reveals the true shape of the system',
    duration: '1-2 hours',
    tags: ['database', 'schema', 'domain'],
    status: 'seed',
    description: 'Databases expose the true shape of the system — business concepts, ownership, relationships.',
    icon: 'database',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the system\'s source of truth. The database reveals business concepts, ownership, relationships, and core domain logic.',
      },
      {
        type: 'p',
        text: 'The database reveals: business concepts, ownership, relationships, and core domain logic. Databases expose the true shape of the system.',
      },
      {
        type: 'h2',
        text: 'What To Read',
      },
      {
        type: 'list',
        items: ['migrations', 'ORM models', 'schema files', 'ER diagrams'],
      },
      {
        type: 'h3',
        text: 'Find',
      },
      {
        type: 'list',
        items: ['primary entities', 'relationships', 'indexes', 'constraints', 'timestamps', 'soft deletes'],
      },
      {
        type: 'code',
        lang: 'text',
        code: `What are the core entities?
How are they connected?
Which tables are most important?
What is considered the source of truth?
Where is state persisted?`,
      },
      {
        type: 'h2',
        text: 'Output Example',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Users
  ↓
Orders
  ↓
Payments

Users can have many orders.
Orders belong to one user.
Payments belong to orders.`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '09-conventions',
    title: 'Step 10: Study Responsibilities and Boundaries',
    subtitle: 'Learn ownership, responsibilities, and module boundaries',
    duration: '1-2 hours',
    tags: ['conventions', 'boundaries', 'responsibilities'],
    status: 'seed',
    description: 'Good systems separate concerns. You need to understand what each module owns.',
    icon: 'boundary',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Learn ownership and responsibilities. Good systems separate concerns — understand what each module owns.',
      },
      {
        type: 'p',
        text: 'Good systems separate concerns. You need to understand what each module owns.',
      },
      {
        type: 'code',
        lang: 'text',
        code: `What is this module responsible for?
What should NOT belong here?
What dependencies does it have?
What modules depend on it?
Is it tightly coupled?`,
      },
      {
        type: 'h2',
        text: 'Example: Auth Service',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Auth service:
- login
- token validation
- permissions

Should NOT:
- send emails
- process payments
- manage UI state`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '10-pain-points',
    title: 'Step 9: Break Things Safely',
    subtitle: 'Understand the REAL system behavior — systems reveal architecture during failure',
    duration: '1-2 hours',
    tags: ['failure', 'resilience', 'debugging'],
    status: 'seed',
    description: 'This step separates shallow understanding from deep understanding.',
    icon: 'flame',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand the REAL system behavior. Systems reveal their true architecture during failure.',
      },
      {
        type: 'p',
        text: 'Systems reveal their true architecture during failure. This step separates shallow understanding from deep understanding.',
      },
      {
        type: 'h2',
        text: 'Things To Break',
      },
      {
        type: 'list',
        items: ['invalid form data', 'expired token', 'missing environment variable', 'broken API response', 'DB unavailable', 'Redis unavailable', 'network timeout', 'wrong permissions'],
      },
      {
        type: 'code',
        lang: 'text',
        code: `How are errors handled?
Where are retries implemented?
What fails gracefully?
What crashes completely?
What monitoring exists?
What logs are useful?`,
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '11-mental-model',
    title: 'Steps 12+13 + Master Loop + Senior Thinking + Final Truth',
    subtitle: 'Build permanent understanding — the complete mental model synthesis',
    duration: 'Ongoing',
    tags: ['mental-model', 'senior-thinking', 'mastery'],
    status: 'seed',
    description: 'Writing clarifies thinking. If you cannot explain the system simply, you probably don\'t fully understand it yet.',
    icon: 'brain',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Build permanent understanding. Writing clarifies thinking. If you cannot explain the system simply, you probably don\'t fully understand it yet.',
      },
      {
        type: 'h2',
        text: 'Step 12 — Study Infrastructure and Deployment',
      },
      {
        type: 'p',
        text: 'Applications do not live only in code. You must understand: deployment, environments, scaling, and observability.',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Dockerfile
Docker Compose
Terraform
Kubernetes manifests
CI/CD workflows
GitHub Actions
Helm charts
Nginx configs`,
      },
      {
        type: 'code',
        lang: 'text',
        code: `How is the app deployed?
How are secrets managed?
How are environments separated?
What services exist in production?
How does scaling work?
What monitoring exists?`,
      },
      {
        type: 'h2',
        text: 'Step 13 — Document Your Mental Model',
      },
      {
        type: 'p',
        text: 'Writing clarifies thinking. If you cannot explain the system simply, then you probably don\'t fully understand it yet.',
      },
      {
        type: 'code',
        lang: 'text',
        code: `What starts the app?
Where does business logic live?
How does authentication work?
Where is state stored?
What services communicate?
What are the risky areas?
What happens during failure?
What background jobs exist?`,
      },
      {
        type: 'code',
        lang: 'text',
        code: `Frontend
   ↓
API Gateway
   ↓
Auth Service
   ↓
Database`,
      },
      {
        type: 'h2',
        text: 'THE MASTER LOOP',
      },
      {
        type: 'p',
        text: 'Once you finish one feature, repeat this loop. It gradually reveals the entire system.',
      },
      {
        type: 'code',
        lang: 'text',
        code: `1. Pick another important flow
2. Trace it end-to-end
3. Understand data movement
4. Observe failures
5. Update mental model
6. Repeat`,
      },
      {
        type: 'h2',
        text: 'HOW SENIOR ENGINEERS THINK',
      },
      {
        type: 'mindset',
        rows: [
          { junior: 'What does this file do?', senior: 'How does the system behave?' },
          { junior: 'Read files randomly', senior: 'Why was it designed this way?' },
          { junior: 'Understand locally', senior: 'What are the tradeoffs?' },
          { junior: 'Fix the error', senior: 'Where are the risks?' },
        ],
      },
      {
        type: 'h2',
        text: 'SIGNS YOU ACTUALLY UNDERSTAND THE SYSTEM',
      },
      {
        type: 'checklist',
        items: [
          { label: 'Predict where code lives', done: false },
          { label: 'Explain major flows without reading code', done: false },
          { label: 'Trace bugs quickly through the system', done: false },
          { label: 'Modify features safely without breakage', done: false },
          { label: 'Identify risky areas before touching them', done: false },
          { label: 'Explain the architecture clearly to others', done: false },
          { label: 'Understand failure behavior', done: false },
          { label: 'Onboard others into the system', done: false },
        ],
      },
      {
        type: 'h2',
        text: 'FINAL MINDSET',
      },
      {
        type: 'p',
        text: 'Do NOT try to understand everything immediately. That is impossible. Real understanding comes from:',
      },
      {
        type: 'code',
        lang: 'text',
        code: `observe
→ trace
→ experiment
→ break
→ repair
→ repeat`,
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
        type: 'p',
        text: 'A codebase is not just code. It is: architecture, business decisions, team culture, operational tradeoffs, evolving history, and human assumptions.',
      },
      {
        type: 'p',
        text: 'The deeper you look, the more the system starts feeling alive. And eventually: you stop seeing files. You start seeing flows.',
      },
      {
        type: 'callout',
        kind: 'quote',
        text: '"Whatever you do, do it for the glory of God." — 1 Corinthians 10:31',
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
  {
    hub: 'feature-development',
    slug: '01-understand',
    title: 'Core Philosophy + Phase 1: Understand the Feature',
    subtitle: 'Understand WHY the feature exists before writing a single line of code',
    duration: '1-2 hours',
    tags: ['requirements', 'philosophy', 'business-intent'],
    status: 'growing',
    description: 'Professional software engineering is safely evolving complex systems over time.',
    icon: 'target',
    content: [
      {
        type: 'h2',
        text: 'Core Philosophy',
      },
      {
        type: 'p',
        text: 'Professional software engineering is NOT: "just writing code". It is: "Safely evolving complex systems over time."',
      },
      {
        type: 'p',
        text: 'Enterprise feature development is about:',
      },
      {
        type: 'list',
        items: ['understanding business intent', 'minimizing risk', 'preserving architecture', 'delivering incrementally', 'maintaining long-term scalability', 'protecting production systems'],
      },
      {
        type: 'p',
        text: 'The real goal is NOT: "make feature work". The real goal is: "make feature reliable, maintainable, scalable, observable, and safe to evolve."',
      },
      {
        type: 'h2',
        text: 'The Enterprise Engineering Mindset',
      },
      {
        type: 'mindset',
        rows: [
          { junior: 'How do I code this?', senior: 'How do I evolve the system safely?' },
          { junior: 'Focus on implementation', senior: 'Focus on architecture + impact' },
          { junior: 'Finish ticket', senior: 'Preserve long-term maintainability' },
          { junior: 'Local feature thinking', senior: 'System-wide thinking' },
          { junior: 'Happy path only', senior: 'Failure-aware engineering' },
        ],
      },
      {
        type: 'h2',
        text: 'High-Level Lifecycle',
      },
      {
        type: 'code',
        lang: 'text',
        code: `1. Understand the feature
2. Analyze system impact
3. Design the solution
4. Slice vertically
5. Implement safely
6. Test deeply
7. Deploy carefully
8. Observe in production
9. Refactor and improve`,
      },
      {
        type: 'h2',
        text: 'Phase 1 — Understand the Feature',
      },
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand WHY the feature exists. Before writing code, understand: what problem is being solved, who needs the feature, why it matters, and what business outcome is expected.',
      },
      {
        type: 'p',
        text: 'Great engineers solve problems. Not just tickets.',
      },
      {
        type: 'h3',
        text: 'Questions To Ask',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Who requested this feature?
Who are the users?
What pain/problem exists today?
What does success look like?
What metrics improve?
What edge cases matter?
What are failure scenarios?`,
      },
      {
        type: 'h3',
        text: 'Output Example',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Feature:
User profile image upload

Goal:
Allow users to personalize profiles.

Business value:
Improve engagement and identity.

Constraints:
- max 5MB
- only images
- secure uploads
- mobile friendly`,
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '02-design',
    title: 'Phase 2: Analyze Impact on Existing System',
    subtitle: 'Understand how the feature affects the current architecture',
    duration: '1-2 hours',
    tags: ['impact-analysis', 'architecture', 'risk'],
    status: 'growing',
    description: 'Features rarely affect only one place. Understand what parts of the system will change.',
    icon: 'ripple',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Understand how the feature affects the current architecture. Features rarely affect only one place — this prevents accidental breakage.',
      },
      {
        type: 'p',
        text: 'Features rarely affect only one place. You must understand what parts of the system will change. This prevents accidental breakage.',
      },
      {
        type: 'h2',
        text: 'Frontend Impact',
      },
      {
        type: 'list',
        items: ['UI components', 'routing', 'state management', 'forms', 'caching'],
      },
      {
        type: 'h2',
        text: 'Backend Impact',
      },
      {
        type: 'list',
        items: ['APIs', 'services', 'authentication', 'validation', 'background jobs'],
      },
      {
        type: 'h2',
        text: 'Database Impact',
      },
      {
        type: 'list',
        items: ['schema changes', 'migrations', 'indexes', 'relationships'],
      },
      {
        type: 'h2',
        text: 'Infrastructure Impact',
      },
      {
        type: 'list',
        items: ['storage', 'queues', 'Redis', 'object storage', 'monitoring'],
      },
      {
        type: 'h2',
        text: 'External Systems Impact',
      },
      {
        type: 'list',
        items: ['Stripe', 'AWS S3', 'email providers', 'OAuth providers', 'analytics'],
      },
      {
        type: 'h2',
        text: 'Questions To Ask',
      },
      {
        type: 'code',
        lang: 'text',
        code: `What existing flows change?
Could this break anything?
Does auth/permissions change?
Will DB migrations be needed?
Does this affect performance?
Will async jobs be required?`,
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '03-plan',
    title: 'Phase 3: Design the Solution',
    subtitle: 'Design BEFORE implementation — where senior engineering starts',
    duration: '2-4 hours',
    tags: ['design', 'architecture', 'planning'],
    status: 'growing',
    description: 'You are designing how the feature integrates into the system — not just writing code.',
    icon: 'pencil-ruler',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Design BEFORE implementation. This is where senior engineering starts. You are designing how the feature integrates into the system, not just writing code.',
      },
      {
        type: 'p',
        text: 'This is where senior engineering starts. You are designing how the feature integrates into the system — not just writing code.',
      },
      {
        type: 'step',
        n: 1,
        title: 'API Design',
        summary: 'Define the contract between frontend and backend',
        content: [
          { type: 'p', text: 'Define the API contract before writing any code.' },
          {
            type: 'code',
            lang: 'text',
            code: `Endpoints
Request shape
Response shape
Validation
Error handling
Authentication
Permissions`,
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Database Design',
        summary: 'Plan schema changes before touching the database',
        content: [
          { type: 'p', text: 'Plan all schema changes before writing migrations.' },
          {
            type: 'code',
            lang: 'text',
            code: `New tables?
New columns?
Indexes?
Relationships?
Constraints?
Migrations?`,
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'State Management Design',
        summary: 'Decide where truth lives',
        content: [
          { type: 'p', text: 'Define where state lives and what gets cached.' },
          {
            type: 'code',
            lang: 'text',
            code: `Where is truth stored?
What gets cached?
What lives in frontend state?
What is temporary?`,
          },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Async Processing Design',
        summary: 'Plan background jobs and event processing',
        content: [
          { type: 'p', text: 'Determine what needs to be processed asynchronously.' },
          {
            type: 'code',
            lang: 'text',
            code: `Need queues?
Need workers?
Need retries?
Need event processing?
Need notifications?`,
          },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Security Design',
        summary: 'Define permissions, rate limits, and protection strategies',
        content: [
          { type: 'p', text: 'Design security from the start — not as an afterthought.' },
          {
            type: 'code',
            lang: 'text',
            code: `Permissions
Rate limits
Validation
Data exposure risks
Abuse prevention`,
          },
        ],
      },
      {
        type: 'step',
        n: 6,
        title: 'Scalability Design',
        summary: 'Plan for load before it arrives',
        content: [
          { type: 'p', text: 'Consider scalability constraints before implementation.' },
          {
            type: 'code',
            lang: 'text',
            code: `Expected traffic?
Large file handling?
Caching?
DB bottlenecks?
Concurrency?`,
          },
        ],
      },
      {
        type: 'h2',
        text: 'Questions To Ask',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Where should business logic live?
How will failures be handled?
How scalable is this design?
How maintainable is this approach?
What tradeoffs are being made?`,
      },
      {
        type: 'h2',
        text: 'Output Artifacts',
      },
      {
        type: 'list',
        items: ['feature specification', 'technical design doc', 'RFC', 'API contract', 'flow diagram', 'sequence diagram', 'DB schema sketch'],
      },
      {
        type: 'callout',
        kind: 'tip',
        text: 'Even small notes help enormously. The act of designing before coding forces clarity.',
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '04-implement',
    title: 'Phase 4: Slice the Feature Vertically',
    subtitle: 'Deliver value incrementally — build small end-to-end slices',
    duration: 'Per slice',
    tags: ['vertical-slices', 'incremental', 'implementation'],
    status: 'growing',
    description: 'Instead of building everything at once, build small end-to-end slices.',
    icon: 'layers',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Deliver value incrementally. Instead of building everything at once, build small end-to-end slices.',
      },
      {
        type: 'p',
        text: 'Instead of building everything at once, build small end-to-end slices. Each slice should be testable, deployable, reviewable, understandable, and low-risk.',
      },
      {
        type: 'h2',
        text: 'Bad: Horizontal Development',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Day 1:
All DB work

Day 2:
All backend work

Day 3:
All frontend work

Day 4:
Testing`,
      },
      {
        type: 'callout',
        kind: 'warn',
        title: 'Problems with horizontal development',
        text: 'Giant PRs, delayed feedback, hard debugging, painful merges, fragile integration.',
      },
      {
        type: 'h2',
        text: 'Good: Vertical Slice Development',
      },
      {
        type: 'step',
        n: 1,
        title: 'Slice 1',
        summary: 'Simple upload endpoint + basic UI + DB save',
        content: [
          { type: 'p', text: 'Build the simplest working end-to-end flow. Get something working first.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Slice 2',
        summary: 'Validation + permissions',
        content: [
          { type: 'p', text: 'Add validation and permission checks. Make it safe.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Slice 3',
        summary: 'Async processing + optimization',
        content: [
          { type: 'p', text: 'Add async processing and performance optimization.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Slice 4',
        summary: 'Monitoring + analytics + retries',
        content: [
          { type: 'p', text: 'Add monitoring, analytics, and retry logic. Make it observable.' },
        ],
      },
      {
        type: 'callout',
        kind: 'tip',
        text: 'Each slice delivers working business value. Each slice is independently reviewable and deployable.',
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '05-test',
    title: 'Phase 5: Implement Safely',
    subtitle: 'Protect the existing system while evolving it',
    duration: 'Throughout implementation',
    tags: ['safety', 'implementation', 'practices'],
    status: 'seed',
    description: 'Follow 5 safe engineering practices to protect the system while adding new functionality.',
    icon: 'shield-check',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Protect the existing system while evolving it. Follow safe engineering practices throughout implementation.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Keep PRs Small',
        summary: 'Small PRs are easier to review, test, rollback, and reason about',
        content: [
          { type: 'p', text: 'Small PRs are: easier to review, easier to test, easier to rollback, easier to reason about. Enterprise teams strongly prefer small incremental changes.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Preserve Architectural Boundaries',
        summary: 'Respect ownership and separation of concerns. Do NOT dump logic randomly.',
        content: [
          { type: 'p', text: 'Respect ownership and separation of concerns. Do NOT dump logic randomly.' },
          {
            type: 'do-dont',
            dontCode: 'Upload service directly edits payment logic',
            doCode: 'Services communicate through APIs/events/interfaces',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Avoid Tight Coupling',
        summary: 'Prevent one feature from making the entire system fragile',
        content: [
          { type: 'p', text: 'Prevent one feature from making the entire system fragile. Loose coupling improves: scalability, maintainability, testing, and deployment safety.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Add Logging & Observability',
        summary: 'Production systems MUST be observable',
        content: [
          { type: 'p', text: 'Production systems MUST be observable. Add: structured logs, metrics, tracing, error tracking, monitoring. If you cannot observe a feature, you cannot operate it reliably.' },
          { type: 'list', items: ['structured logs', 'metrics', 'tracing', 'error tracking', 'monitoring'] },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Use Feature Flags',
        summary: 'Safely deploy unfinished or risky features',
        content: [
          { type: 'p', text: 'Safely deploy unfinished or risky features. Feature flags enable: gradual rollout, testing in production, emergency disable, safer releases. A huge enterprise practice.' },
          {
            type: 'code',
            lang: 'text',
            code: 'ENABLE_NEW_UPLOAD_FLOW=true',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '06-review',
    title: 'Phase 6: Test the Feature',
    subtitle: 'Verify correctness and prevent regressions at multiple levels',
    duration: '1-3 days',
    tags: ['testing', 'qa', 'verification'],
    status: 'seed',
    description: 'Test multiple levels: unit, integration, E2E, load, and security.',
    icon: 'check-circle',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Verify correctness and prevent regressions. Test multiple levels — not just the happy path.',
      },
      {
        type: 'h2',
        text: 'Types of Testing',
      },
      {
        type: 'table',
        headers: ['Test Type', 'Purpose'],
        rows: [
          ['Unit Tests', 'isolated logic'],
          ['Integration Tests', 'service interaction'],
          ['E2E Tests', 'complete user flow'],
          ['Load Tests', 'performance under stress'],
          ['Security Tests', 'vulnerabilities & abuse'],
        ],
      },
      {
        type: 'h2',
        text: 'Test Important Scenarios',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Happy paths
Invalid input
Permission failures
Timeouts
Retries
Concurrency
Race conditions
Large payloads
Service failures
Edge cases`,
      },
      {
        type: 'h2',
        text: 'Failure-Aware Testing',
      },
      {
        type: 'p',
        text: 'Senior engineers test what happens when things break — not just what happens when things work.',
      },
      {
        type: 'callout',
        kind: 'tip',
        text: 'Test failure paths with the same rigor as success paths. Real users will trigger every edge case.',
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '07-deploy',
    title: 'Phase 7: Deploy Carefully',
    subtitle: 'Release safely without breaking production',
    duration: '1-2 days',
    tags: ['deployment', 'rollout', 'safety'],
    status: 'seed',
    description: 'Enterprise deployment practices: gradual rollouts, monitoring, and rollback planning.',
    icon: 'rocket',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Release safely without breaking production. Use enterprise deployment practices.',
      },
      {
        type: 'h2',
        text: 'Gradual Rollouts',
      },
      {
        type: 'p',
        text: 'Release to internal users, beta users, small traffic percentage, then specific regions. This reduces blast radius.',
      },
      {
        type: 'list',
        items: ['internal users', 'beta users', 'small traffic percentage', 'specific regions'],
      },
      {
        type: 'h2',
        text: 'Monitoring During Release',
      },
      {
        type: 'list',
        items: ['error rates', 'latency', 'DB load', 'queue health', 'memory usage', 'logs', 'API failures'],
      },
      {
        type: 'h2',
        text: 'Rollback Planning',
      },
      {
        type: 'callout',
        kind: 'warn',
        title: 'Always ask before deploying',
        text: '"How do we undo this safely?" This is a REAL senior engineering question.',
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '08-monitor',
    title: 'Phase 8: Observe in Production',
    subtitle: 'Learn from real-world usage — deployment is NOT the end',
    duration: 'Ongoing',
    tags: ['monitoring', 'observability', 'production'],
    status: 'seed',
    description: 'Production reveals truths that development environments hide.',
    icon: 'eye',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Learn from real-world usage. Deployment is NOT the end. Production reveals truths that development environments hide.',
      },
      {
        type: 'p',
        text: 'Production reveals truths development environments hide. The feature is not done until it is observable in production.',
      },
      {
        type: 'h2',
        text: 'Observe',
      },
      {
        type: 'list',
        items: ['user behavior', 'performance', 'scaling', 'unexpected edge cases', 'operational failures', 'abuse patterns', 'system bottlenecks'],
      },
      {
        type: 'h2',
        text: 'Questions To Ask',
      },
      {
        type: 'code',
        lang: 'text',
        code: `Are users behaving as expected?
What errors appear in production?
What assumptions were wrong?
Where are bottlenecks emerging?
What needs optimization?`,
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '09-refactor',
    title: 'Phase 9: Refactor & Improve + Core Enterprise Principles + Final Truth',
    subtitle: 'Prevent entropy, apply core principles, and grow as a system engineer',
    duration: 'Ongoing',
    tags: ['refactoring', 'principles', 'improvement'],
    status: 'seed',
    description: 'Every feature increases complexity. Without maintenance, systems decay over time.',
    icon: 'recycle',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Goal',
        text: 'Prevent entropy and long-term degradation. Every feature increases complexity. Without maintenance, systems decay over time.',
      },
      {
        type: 'p',
        text: 'Every feature increases complexity. Without maintenance, systems decay over time. Good engineers continuously improve the system.',
      },
      {
        type: 'list',
        items: ['simplify code', 'reduce coupling', 'improve naming', 'improve tests', 'extract abstractions', 'improve observability', 'improve architecture'],
      },
      {
        type: 'h2',
        text: 'The Long-Term Engineering Mindset',
      },
      {
        type: 'p',
        text: 'Professional engineering optimizes for long-term system evolution — not just closing tickets quickly.',
      },
      {
        type: 'h2',
        text: 'The Core Enterprise Principles',
      },
      {
        type: 'checklist',
        items: [
          { label: 'Understand before coding', done: false },
          { label: 'Design before implementing', done: false },
          { label: 'Deliver incrementally', done: false },
          { label: 'Preserve architectural boundaries', done: false },
          { label: 'Keep changes small and reversible', done: false },
          { label: 'Think about failure from day one', done: false },
          { label: 'Make systems observable', done: false },
          { label: 'Optimize for maintainability', done: false },
          { label: 'Treat production as sacred', done: false },
        ],
      },
      {
        type: 'h2',
        text: 'Final Truth',
      },
      {
        type: 'p',
        text: 'Professional software engineering is not "writing code". It is "managing complexity safely over time". That is the real craft.',
      },
      {
        type: 'p',
        text: 'And the deeper you go: you stop thinking like "How do I build this feature?" And start thinking "How do I evolve this system responsibly?" That is the path toward senior engineering and architecture thinking.',
      },
      {
        type: 'callout',
        kind: 'quote',
        text: '"Let all things be done decently and in order." — 1 Corinthians 14:40',
      },
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
