export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; kind: 'tip' | 'note' | 'warn' | 'quote'; title?: string; text: string }
  | { type: 'step'; n: number; title: string; summary?: string; done?: boolean; content: ContentBlock[] }
  | { type: 'code'; lang: string; code: string }
  | { type: 'checklist'; items: { label: string; done?: boolean }[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'mindset'; rows: { junior: string; senior: string }[] }
  | { type: 'wisdom'; body: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'figure'; label: string; figNum?: number; description?: string; diagramContent?: string }
  | { type: 'prereq'; title?: string; items: Array<{ text: string; done?: boolean }> }
  | { type: 'do-dont'; doLabel?: string; dontLabel?: string; doCode?: string; dontCode?: string; doCaption?: string; dontCaption?: string }
  | { type: 'terminal'; filename?: string; lines: string[] }
  | { type: 'code-file'; filename?: string; language?: string; lines: string[] }
  | { type: 'numbered-callout'; num: number | string; variant?: 'rose' | 'sage' | 'peach' | 'sun'; heading: string; body: string }

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
    title: 'Ideation & Requirements',
    subtitle: 'Transform a vague idea into concrete, actionable requirements',
    duration: '2-3 days',
    tags: ['requirements', 'planning', 'prd', 'moscow'],
    status: 'mature',
    description:
      'This is the phase most solo developers skip — and exactly why they freeze when projects get complex. Transform a vague idea into concrete, actionable requirements before writing a single line of code.',
    icon: 'leaf',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: 'What am I building, for whom, solving what problem?',
      },
      {
        type: 'step',
        n: 1,
        title: 'Define the Problem Statement',
        summary: 'Clarify what problem this app solves and who it solves it for',
        content: [
          {
            type: 'p',
            text: 'Without a clear problem statement, every decision downstream becomes a guess. Write it in one sentence: what problem does this app solve, and for whom?',
          },
          {
            type: 'list',
            items: [
              'What problem does this app solve?',
              'Who uses it — yourself, or others?',
              'What is the core pain being removed?',
              'What does success look like for the user?',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Define Core Features with MoSCoW',
        summary: 'Classify features into Must / Should / Could / Won\'t to scope the MVP',
        content: [
          {
            type: 'p',
            text: 'MoSCoW prevents scope creep. Keep "Must have" to 3-5 items max. Solo devs die by trying to build everything at once.',
          },
          {
            type: 'list',
            items: [
              'Must have — core features without which the app fails',
              'Should have — important but not launch-blocking',
              'Could have — nice-to-haves if time permits',
              "Won't have — explicitly out of scope for V1",
            ],
          },
          {
            type: 'callout',
            kind: 'warn',
            title: 'MVP Scope Warning',
            text: 'Only 2-3 core features for your MVP. Do NOT build everything. Solo devs die here.',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Write User Stories',
        summary: 'Express features from the user\'s perspective',
        content: [
          {
            type: 'p',
            text: 'User stories keep you anchored to user needs rather than technical details. Use the standard format consistently.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'As a [role], I want [action], so that [benefit]\n\nExamples:\n- As a visitor, I want to sign up with email, so that I can save my work.\n- As a user, I want to export my data, so that I can use it elsewhere.',
          },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Produce Documentation Outputs',
        summary: 'Three documents to exit this phase',
        content: [
          {
            type: 'list',
            items: [
              'PRD (Product Requirements Document) — problem, users, features, MVP scope, success metrics',
              'User Stories Document — full list of stories in "As / I want / So that" format',
              'MoSCoW Feature List — classification table with priority rationale',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Tools',
            text: 'Use Notion for requirements docs, Excalidraw for quick sketches, and Linear for task tracking.',
          },
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '02-system-design',
    title: 'System Design',
    subtitle: 'Draw the blueprint — how FE, BE, DB, and external APIs connect',
    duration: '2-4 days',
    tags: ['architecture', 'api-design', 'tech-stack', 'data-flow'],
    status: 'mature',
    description:
      'Like an architecture plan before building a house. Design how frontend, backend, database, and external APIs connect before writing any code.',
    icon: 'layers',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: 'What does the system look like and how do parts communicate?',
      },
      {
        type: 'step',
        n: 1,
        title: 'Draw the Architecture Diagram',
        summary: 'Visualize how every component connects',
        content: [
          {
            type: 'p',
            text: 'The architecture diagram is your north star for the entire project. Every component relationship should be visible at a glance.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'User → Frontend → Backend → Database\n             ↓\n       External APIs',
          },
          {
            type: 'list',
            items: [
              'User facing layer (browser, mobile)',
              'Frontend framework and hosting',
              'Backend API and business logic',
              'Database and storage',
              'External APIs and third-party services',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Choose Your Tech Stack',
        summary: 'Select and document every technology choice with rationale',
        content: [
          {
            type: 'p',
            text: 'Every technology choice is a tradeoff. Document why you chose each tool and what alternatives you considered — your future self will thank you.',
          },
          {
            type: 'list',
            items: [
              'Language and runtime for each component',
              'Framework choices (frontend and backend)',
              'Database engine and ORM',
              'Cloud hosting platform',
              'CI/CD and DevOps tooling',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Keep V1 Simple',
            text: 'For integration points and external APIs, keep it simple for V1. Every third-party service adds risk and complexity.',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Design the API Contract',
        summary: 'Define endpoints, methods, and request/response shapes',
        content: [
          {
            type: 'p',
            text: 'The API contract is the agreement between frontend and backend. Design it before implementing either side.',
          },
          {
            type: 'list',
            items: [
              'Endpoint paths and HTTP methods',
              'Request body shape and required fields',
              'Response shape and status codes',
              'Authentication and authorization requirements',
              'Error response format',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Produce Documentation Outputs',
        summary: 'Four documents to exit this phase',
        content: [
          {
            type: 'list',
            items: [
              'Architecture Diagram — FE, BE, DB, external APIs and how they connect',
              'Tech Stack Decision Record — why each technology was chosen + alternatives considered',
              'API Specification (OpenAPI/Swagger) — endpoints, methods, request/response format, auth',
              'Data Flow Diagram — where data comes from, where it goes, through which services',
            ],
          },
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '03-technical-planning',
    title: 'Technical Planning',
    subtitle: 'Design layout, components, and user flow BEFORE coding',
    duration: '3-5 days',
    tags: ['ui-ux', 'wireframing', 'design-system', 'components'],
    status: 'mature',
    description:
      'Design layout, components, and user flow before coding. Skipping this phase leads to messy frontend and constant refactoring.',
    icon: 'book',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: 'What does the app look like and how does the user navigate it?',
      },
      {
        type: 'step',
        n: 1,
        title: 'Map the User Flow',
        summary: 'Trace every step a user takes from entry to goal completion',
        content: [
          {
            type: 'p',
            text: 'The user flow is a map of every screen and decision point. Draw it before opening your design tool.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Login → Dashboard → Detail → Action → Result\n  ↓\nError State → Recovery → Continue',
          },
          {
            type: 'list',
            items: [
              'Entry points (landing, deep link, share link)',
              'Authentication flow',
              'Core feature journey',
              'Error and empty states',
              'Success and confirmation states',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Create Wireframes',
        summary: 'Sketch lo-fi layouts for every screen',
        content: [
          {
            type: 'p',
            text: 'Wireframes do not need to be pretty — they just need to show what goes where. Paper or Excalidraw works perfectly for lo-fi wireframes.',
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Lo-fi First',
            text: 'Start with lo-fi sketches on paper or Excalidraw. Only move to hi-fi Figma mocks if needed — do not over-invest in design before validation.',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Build a Component Inventory and Design System',
        summary: 'List every UI component and define the visual language',
        content: [
          {
            type: 'p',
            text: 'A component inventory prevents reinventing the wheel mid-development. A minimal design system keeps the UI consistent without over-engineering.',
          },
          {
            type: 'list',
            items: [
              'Every UI component needed: cards, forms, tables, nav, modals',
              '2-3 main brand colors',
              '1 heading font, 1 body font',
              'Spacing grid (4px or 8px base)',
              'Border radius and shadow tokens',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Produce Documentation Outputs',
        summary: 'Four documents to exit this phase',
        content: [
          {
            type: 'list',
            items: [
              'User Flow Diagram — steps from opening app to completing the core goal',
              'Wireframes (Lo-fi & Hi-fi) — layout sketches per page: header, sidebar, main content',
              'Component Inventory — list of all UI components to build with functional description',
              'Design System / Style Guide — colors, typography, spacing, border-radius, shadows',
            ],
          },
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '04-development',
    title: 'Development',
    subtitle: 'Database design, backend, and frontend implementation',
    duration: '2-4 weeks',
    tags: ['backend', 'frontend', 'database', 'api', 'implementation'],
    status: 'mature',
    description:
      'Design the database schema, build the backend APIs and business logic, then build the frontend UI connected to those APIs. This is where the core functionality comes to life.',
    icon: 'cmd',
    content: [
      {
        type: 'callout',
        kind: 'warn',
        title: 'Design Database First',
        text: 'Good schema = easy backend code. Bad schema = pain forever. Design and finalize the database schema BEFORE writing backend code.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Database Design',
        summary: 'Design tables, columns, and relationships',
        content: [
          {
            type: 'p',
            text: 'The database schema is the foundation of the entire system. Every shortcut here compounds into technical debt that grows with each feature.',
          },
          {
            type: 'list',
            items: [
              'Identify all entities (User, Product, Order, etc.)',
              'Map relationships: 1-to-1, 1-to-many, many-to-many',
              'Define columns, data types, constraints, and indexes per table',
              'Plan migration strategy with version control (Alembic, Prisma Migrate)',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Documents to produce:\n- ER Diagram (entity relationships)\n- Schema Definition (columns, types, constraints)\n- Migration Plan (creation order, seed data, rollback)',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Backend Implementation',
        summary: 'Build APIs, business logic, and data pipelines',
        content: [
          {
            type: 'p',
            text: 'The backend is where core functionality lives. Start with project setup, then build CRUD APIs for each entity, then layer in business logic.',
          },
          {
            type: 'list',
            items: [
              'Init framework, folder structure, env config, DB connection',
              'Core CRUD endpoints for each entity',
              'External API integrations (third-party services)',
              'Business logic and processing pipelines',
              'Unit tests and integration tests',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Tools',
            text: 'FastAPI / Express / Django for the framework. SQLAlchemy / Prisma for ORM. pytest / Jest for testing. Docker for containerization.',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Frontend Implementation',
        summary: 'Build UI from Phase 3 design and connect to backend APIs',
        content: [
          {
            type: 'p',
            text: 'Build the UI according to the design from Phase 3. The component inventory is your checklist — work through it systematically.',
          },
          {
            type: 'list',
            items: [
              'Init framework (Vite + React, Next.js) with styling and routing',
              'Build each component from the Phase 3 component list',
              'State management: server state (React Query) + client state (Zustand)',
              'Connect to backend endpoints, handle loading and error states',
              'Polish: responsive design, loading states, animations',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Produce Documentation Outputs',
        summary: 'Seven documents across backend and frontend',
        content: [
          {
            type: 'list',
            items: [
              'README.md — setup guide: install, run locally, required env variables',
              'API Documentation (auto-gen) — FastAPI /docs or Swagger endpoint',
              'Code Architecture Notes — folder structure, naming conventions, patterns',
              'Test Coverage Report — critical paths tested and coverage metrics',
              'Component Storybook / Docs — each component: props, usage, variants',
              'State Management Map — what data lives where (server vs client state)',
              'FE README.md — setup guide, folder structure, coding conventions',
            ],
          },
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '05-testing',
    title: 'Testing & QA',
    subtitle: 'Test the full flow, edge cases, performance, and security',
    duration: '3-5 days',
    tags: ['testing', 'qa', 'e2e', 'performance', 'security'],
    status: 'mature',
    description:
      'This phase determines whether the app feels amateur or professional. Test the full flow, edge cases, performance, and security before touching deployment.',
    icon: 'bug',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: 'Does everything work correctly, even in unexpected situations?',
      },
      {
        type: 'step',
        n: 1,
        title: 'End-to-End Testing',
        summary: 'Test the complete user flow from signup to core action',
        content: [
          {
            type: 'p',
            text: 'E2E tests are the closest thing to a real user interacting with your app. They catch integration failures that unit tests miss.',
          },
          {
            type: 'list',
            items: [
              'Full signup and onboarding flow',
              'Core feature happy path end-to-end',
              'Authentication and session management',
              'Critical user journeys identified in Phase 1',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Tools',
            text: 'Playwright or Cypress for E2E testing. Postman for API testing.',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Edge Cases and Error Handling',
        summary: 'Test what happens when things go wrong',
        content: [
          {
            type: 'p',
            text: 'Real users do unexpected things. Edge case testing is what separates a product that "works in demo" from one that works in production.',
          },
          {
            type: 'list',
            items: [
              'What if the external API is down?',
              'What if the user submits invalid input?',
              'What if data is empty or missing?',
              'What if the session expires mid-flow?',
              'What if the network is slow or flaky?',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Performance and Security',
        summary: 'Audit load times and protect against common vulnerabilities',
        content: [
          {
            type: 'p',
            text: 'Performance and security are not optional features — they are quality dimensions of every production application.',
          },
          {
            type: 'list',
            items: [
              'API response time benchmarking',
              'Frontend load speed with Lighthouse',
              'Query optimization and lazy loading',
              'Input validation and sanitization',
              'SQL injection and XSS prevention',
              'CORS configuration and rate limiting',
              'Authentication and authorization checks',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Produce Documentation Outputs',
        summary: 'Four documents to exit this phase',
        content: [
          {
            type: 'list',
            items: [
              'Test Plan — all test cases organized by feature',
              'Bug Report Log — severity, steps to reproduce, status per bug',
              'Performance Benchmark — API latency, FE load time, Lighthouse scores',
              'Security Checklist — OWASP top 10: XSS, CSRF, SQL injection covered',
            ],
          },
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '06-deployment',
    title: 'Deployment',
    subtitle: 'Put the app on the internet — the finish line',
    duration: '2-3 days',
    tags: ['devops', 'ci-cd', 'cloud', 'hosting', 'launch'],
    status: 'mature',
    description:
      'No deployment means the app does not exist. Set up CI/CD, deploy backend and frontend to cloud platforms, configure monitoring, and launch.',
    icon: 'git',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: 'How do I get this running in production and keep it running?',
      },
      {
        type: 'step',
        n: 1,
        title: 'Set Up CI/CD Pipeline',
        summary: 'Automate test and deploy on push to main',
        content: [
          {
            type: 'p',
            text: 'A CI/CD pipeline removes human error from deployments and ensures tests always run before code reaches production.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Pipeline stages:\n1. Trigger (push to main / PR merge)\n2. Install dependencies\n3. Run tests\n4. Build artifacts\n5. Deploy to environment\n6. Notify team',
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Tool',
            text: 'GitHub Actions is free for public repos and has excellent marketplace actions for most deployment targets.',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Deploy Backend and Frontend',
        summary: 'Host the application on cloud platforms',
        content: [
          {
            type: 'p',
            text: 'Deploy backend and frontend to separate hosting platforms optimized for each. Configure environment variables and custom domains.',
          },
          {
            type: 'list',
            items: [
              'Backend: Railway, Render, or AWS — database, env vars, domain',
              'Frontend: Vercel or Netlify — CDN hosting, connect API, custom domain',
              'Configure environment variables for production',
              'Set up SSL certificates and HTTPS',
              'Configure CORS for the production API URL',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Set Up Monitoring and Launch',
        summary: 'Add error tracking then ship it',
        content: [
          {
            type: 'p',
            text: 'Monitoring must be in place before you share the app. You need to know when things break before users tell you.',
          },
          {
            type: 'list',
            items: [
              'Sentry for error tracking and alerting',
              'Logging with structured log format',
              'Health check endpoints for uptime monitoring',
              'Share on LinkedIn, Twitter, Reddit',
              'Collect early feedback and iterate',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Produce Documentation Outputs',
        summary: 'Four documents to exit this phase',
        content: [
          {
            type: 'list',
            items: [
              'Deployment Guide — step-by-step: deploy BE, FE, DB from scratch',
              'Environment Config — all env variables per environment (dev, staging, prod)',
              'CI/CD Pipeline Doc — trigger → build → test → deploy → notify',
              'Runbook — incident handling: app down, DB full, API errors',
            ],
          },
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '07-monitoring',
    title: 'Monitoring & Observability',
    subtitle: 'Know when things break before users tell you',
    duration: 'Ongoing',
    tags: ['monitoring', 'observability', 'sentry', 'analytics', 'alerts'],
    status: 'growing',
    description:
      'Track API response time, error rates, and uptime in production. Set alerts for critical thresholds. Real monitoring is what separates professional apps from toys.',
    icon: 'eye',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Principle',
        text: 'If you cannot observe a feature, you cannot operate it reliably.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Error Tracking',
        summary: 'Capture and triage every exception in production',
        content: [
          {
            type: 'p',
            text: 'Sentry (or equivalent) captures exceptions with full stack traces, user context, and frequency data. Set up alerting for new and regression errors.',
          },
          {
            type: 'list',
            items: [
              'Install Sentry SDK in both backend and frontend',
              'Configure release tracking to correlate errors with deploys',
              'Set up alert rules: new errors, error spikes, regression errors',
              'Triage errors by priority: Critical > High > Medium > Low',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Performance and Uptime Monitoring',
        summary: 'Track response times, uptime, and key metrics',
        content: [
          {
            type: 'p',
            text: 'Performance degrades gradually and often goes unnoticed without metrics. Establish baselines early and alert on deviations.',
          },
          {
            type: 'list',
            items: [
              'API response time per endpoint (p50, p95, p99)',
              'Error rate percentage over time',
              'Uptime monitoring with health check endpoints',
              'Database query performance',
              'Memory and CPU usage trends',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Tools',
            text: 'Sentry for errors, Google Analytics for user behavior, UptimeRobot or Better Stack for uptime, and Grafana/Datadog for infrastructure metrics.',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Structured Logging',
        summary: 'Log in a consistent format that can be searched and analyzed',
        content: [
          {
            type: 'p',
            text: 'Structured logs (JSON) are machine-readable and can be queried in log aggregation tools. Unstructured logs are nearly useless at scale.',
          },
          {
            type: 'code',
            lang: 'json',
            code: '{\n  "level": "error",\n  "timestamp": "2025-01-01T00:00:00Z",\n  "service": "api",\n  "userId": "u_123",\n  "action": "file_upload",\n  "error": "S3 connection timeout",\n  "duration_ms": 5001\n}',
          },
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '08-documentation',
    title: 'Documentation',
    subtitle: 'Documentation runs throughout every phase — not a separate step',
    duration: 'Ongoing',
    tags: ['documentation', 'readme', 'architecture', 'changelog'],
    status: 'growing',
    description:
      'Documentation is not a separate phase — it runs throughout every phase. Each phase produces its own output documents. Total: 33 documents across 9 phases.',
    icon: 'book',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Principle',
        text: 'Documentation is not a separate phase. Each phase produces its own output documents. Future you will thank present you.',
      },
      {
        type: 'step',
        n: 1,
        title: 'In-Code Documentation',
        summary: 'README, API docs, and architecture notes generated alongside code',
        content: [
          {
            type: 'p',
            text: 'The most important documentation lives close to the code it describes. Auto-generated API docs (FastAPI /docs, Swagger) should always be kept updated.',
          },
          {
            type: 'list',
            items: [
              'README.md — install, run locally, required env variables',
              'API Documentation (auto-generated) — keep it updated with every change',
              'Code Architecture Notes — folder structure, naming conventions, patterns used',
              'Component Storybook — each component: props, usage, variants',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Process Documentation',
        summary: 'Deployment guides, runbooks, and environment configs',
        content: [
          {
            type: 'p',
            text: 'Process documentation allows anyone (including future you) to deploy, debug, and operate the system without tribal knowledge.',
          },
          {
            type: 'list',
            items: [
              'Deployment Guide — step-by-step from scratch',
              'Environment Config — all env variables per environment',
              'CI/CD Pipeline Doc — trigger, build, test, deploy, notify',
              'Runbook — incident response procedures',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Living Documentation',
        summary: 'Changelog, backlog, and post-mortems that evolve with the product',
        content: [
          {
            type: 'p',
            text: 'Living documentation is updated continuously as the product evolves. Stale docs are worse than no docs — they actively mislead.',
          },
          {
            type: 'list',
            items: [
              'Changelog — every change by version using semver (v1.0.1, v1.1.0)',
              'Feedback & Feature Backlog — all feedback with priority',
              'Post-mortem Reports — after incidents: what happened, root cause, prevention',
              'Updated Documentation — all docs from Phase 1-8 current with latest changes',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Tools',
            text: 'Notion for requirements and planning docs. GitHub Wiki or Docusaurus for technical docs. Keep API docs auto-generated.',
          },
        ],
      },
    ],
  },
  {
    hub: 'sdlc',
    slug: '09-maintenance',
    title: 'Maintenance & Retrospective',
    subtitle: '80% of a product\'s lifetime is spent here',
    duration: 'Ongoing',
    tags: ['maintenance', 'iteration', 'feedback', 'refactoring', 'retrospective'],
    status: 'growing',
    description:
      'The app launching is NOT the end. Collect feedback, fix bugs, add features, refactor technical debt, and loop back to Phase 1 for new features. This is the cycle.',
    icon: 'flame',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Key Question',
        text: 'How do I keep improving and maintaining this?',
      },
      {
        type: 'callout',
        kind: 'quote',
        text: 'The roadmap is a spiral, not a straight line. You will go forward, discover something missing, go back, fix it, and continue. That\'s normal.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Bug Tracking & Fixing',
        summary: 'Collect and triage bug reports systematically',
        content: [
          {
            type: 'p',
            text: 'Bugs come from two sources: Sentry alerts (proactive) and user reports (reactive). Prioritize ruthlessly — not every bug needs to be fixed immediately.',
          },
          {
            type: 'list',
            items: [
              'Collect bug reports from users and Sentry alerts',
              'Classify by severity: Critical > High > Medium > Low',
              'Critical bugs fix immediately, Medium/Low go into backlog',
              'Track in GitHub Issues or Linear',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'User Feedback Loop',
        summary: 'Turn feedback into prioritized feature requests',
        content: [
          {
            type: 'p',
            text: 'Users have problems. Your job is to discover those problems and translate them into features — not just build what they ask for, but understand why they ask.',
          },
          {
            type: 'list',
            items: [
              'Collect feedback via surveys, analytics, support conversations',
              'Identify patterns — what do multiple users ask for?',
              'Turn feedback into prioritized feature requests',
              'Loop back to Phase 1 for significant new features',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Tech Debt & Refactoring',
        summary: 'Schedule regular time to improve code quality',
        content: [
          {
            type: 'p',
            text: 'V1 code will be ugly. That is OK and expected. But schedule time to refactor and update dependencies — entropy compounds if left unaddressed.',
          },
          {
            type: 'list',
            items: [
              'Refactor components that are hard to change',
              'Update dependencies on a regular schedule',
              'Improve test coverage for critical paths',
              'Update all docs when code changes happen',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'The Cycle',
            text: 'Feedback → plan new features → go back to Phase 1 for that feature. This is the "cycle" — each iteration gets faster and cleaner.',
          },
        ],
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
    title: 'Orient Yourself',
    subtitle: 'Understand what this system exists to do',
    duration: '1-2 hours',
    tags: ['orientation', 'purpose', 'tech-stack', 'architecture'],
    status: 'mature',
    description:
      'Before reading a single line of code, understand what problem the system solves, who uses it, and what the main workflows are. Without this, code feels random.',
    icon: 'eye',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'The Real Goal',
        text: 'Build a mental model of what the system does, how data moves, where logic lives, how components communicate, where failures happen, and where changes are risky.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Identify the Purpose of the System',
        summary: 'Understand the problem, users, domain, and main workflows',
        content: [
          {
            type: 'p',
            text: 'Without understanding purpose, code feels random. Every file, every function, every table — they only make sense when you know the problem they solve.',
          },
          {
            type: 'list',
            items: [
              'Read README.md, docs/, and any landing or product pages',
              'Read the API docs and issue tracker',
              'Look at environment names and package names',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to answer:\nWhat does this system do?\nWho are the users?\nWhat are the core features?\nWhat actions do users perform most?\nWhat business problem is being solved?',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Output to produce:\nThis is a SaaS platform for X.\nUsers can:\n- do A\n- do B\n- do C\n\nMain workflows:\n1. login\n2. create resource\n3. process payment\n4. notifications',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Identify the Tech Stack',
        summary: 'Map every technology — especially infrastructure',
        content: [
          {
            type: 'p',
            text: 'The tech stack tells you where things probably live, what patterns to expect, and what conventions are likely. Infrastructure is critically important to understand — not just the framework.',
          },
          {
            type: 'list',
            items: [
              'Frontend: package.json, vite.config, next.config, webpack.config',
              'Backend: requirements.txt, pyproject.toml, manage.py, pom.xml, go.mod',
              'Infrastructure: Dockerfile, docker-compose.yml, terraform/, k8s/, .github/workflows/',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Output to produce:\nFrontend: React + Vite\nBackend: Django Rest Framework\nDatabase: PostgreSQL\nInfra: Docker, AWS S3, Redis, Celery',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Identify the Architecture Style',
        summary: 'Understand HOW the system is organized, not just what tools it uses',
        content: [
          {
            type: 'p',
            text: 'There is a crucial distinction: tech stack tells you WHAT tools exist; architecture style tells you HOW the system behaves. That distinction is huge.',
          },
          {
            type: 'list',
            items: [
              'System shape: monolith, microservices, event-driven, serverless, clean architecture',
              'Communication style: REST, GraphQL, WebSockets, message queues, pub/sub',
              'State management: where truth lives — DB, Redis, frontend, sessions',
              'Processing style: synchronous, async, queue-based, batch, stream',
              'Coupling: tightly or loosely coupled, domain-separated, interface-driven',
            ],
          },
          {
            type: 'callout',
            kind: 'quote',
            text: 'A system\'s architecture is a collection of engineering tradeoffs. Every architecture style optimizes for something: scalability, simplicity, deployment speed, fault isolation, or development velocity. Understanding architecture means understanding WHY the system was shaped this way.',
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '02-entry-points',
    title: 'Find Entry Points',
    subtitle: 'Learn where execution begins — your navigation anchor',
    duration: '30-60 min',
    tags: ['entry-points', 'routing', 'startup', 'workers'],
    status: 'mature',
    description:
      'Every system starts somewhere. Finding the entry points gives you a navigation anchor for tracing every feature and flow in the codebase.',
    icon: 'cmd',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Principle',
        text: 'Every system starts somewhere. You need to know where execution begins. This becomes your navigation anchor.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Find Frontend Entry Points',
        summary: 'Locate the root component, routing, and providers',
        content: [
          {
            type: 'p',
            text: 'The frontend entry point is where routing, providers, and global state are wired together. Understanding it lets you navigate to any feature.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Common entry files:\nmain.jsx\nindex.js\nApp.tsx\n\nFind:\n- routing\n- app providers\n- global state\n- root layout',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Find Backend Entry Points',
        summary: 'Locate routes, middleware, and app initialization',
        content: [
          {
            type: 'p',
            text: 'The backend entry point is where routes are registered, middleware is configured, authentication is wired, and the app is initialized.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Common entry files:\nmain.py\nmanage.py\nserver.js\napp.py\n\nFind:\n- routes\n- middleware\n- authentication\n- app initialization',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Find Background Workers and Infrastructure Startup',
        summary: 'Locate async jobs, queues, and startup scripts',
        content: [
          {
            type: 'p',
            text: 'Modern applications run significant logic outside of the main request cycle. Background workers, queues, and cron jobs are often invisible until you know where to look.',
          },
          {
            type: 'list',
            items: [
              'Background workers: celery.py, workers/, jobs/, queues/, cron/',
              'Infrastructure startup: Dockerfile, docker-compose.yml, entrypoint.sh, Makefile',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to answer:\nWhat starts the application?\nHow are routes registered?\nWhere is middleware configured?\nWhere are services initialized?\nWhere are environment variables loaded?',
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '03-architecture',
    title: 'Understand Architecture',
    subtitle: 'Map the major building blocks and how they communicate',
    duration: '1-2 hours',
    tags: ['architecture', 'components', 'layers', 'services'],
    status: 'mature',
    description:
      'Create a high-level architecture map showing how major components communicate. This is the beginning of architecture thinking — seeing the system, not just the files.',
    icon: 'layers',
    content: [
      {
        type: 'step',
        n: 1,
        title: 'Map Frontend Architecture',
        summary: 'Identify routing, state, API layer, and component structure',
        content: [
          {
            type: 'p',
            text: 'The frontend architecture reveals how data flows from API to UI, what state management approach is used, and how the component tree is organized.',
          },
          {
            type: 'list',
            items: [
              'Routing: how pages are structured and navigated',
              'State management: Redux, Zustand, Context API, or React Query',
              'API layer: how API calls are abstracted',
              'Component structure: atomic, feature-based, or domain-based',
              'Authentication flow: where tokens are stored and refreshed',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Map Backend Architecture',
        summary: 'Identify controllers, services, models, and background jobs',
        content: [
          {
            type: 'p',
            text: 'The backend architecture determines where logic lives and how to safely modify it without breaking other parts of the system.',
          },
          {
            type: 'list',
            items: [
              'Controllers / routes: request handling and routing',
              'Services: business logic layer',
              'Models: data access and ORM entities',
              'Repositories: data access abstraction (if present)',
              'Middleware: auth, logging, error handling',
              'Background jobs: Celery, BullMQ, Sidekiq, cron',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Produce an Architecture Map',
        summary: 'Visualize the entire system in one diagram',
        content: [
          {
            type: 'code',
            lang: 'text',
            code: 'Example output:\n\nFrontend\n  ↓\nREST API\n  ↓\nDjango Controllers\n  ↓\nService Layer\n  ↓\nPostgreSQL\n\nBackground jobs:\nCelery + Redis\n\nFile uploads:\nAWS S3',
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Even Ugly Diagrams Help',
            text: 'Even a rough ASCII diagram in a text file is enormously valuable. Drawing forces you to identify gaps in your understanding.',
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '04-data-flow',
    title: 'Trace Data Flow',
    subtitle: 'Understand the system dynamically by tracing real flows end-to-end',
    duration: '2-4 hours',
    tags: ['data-flow', 'tracing', 'request-lifecycle', 'dynamic'],
    status: 'mature',
    description:
      'This is the most important step. Do not read random files. Instead, trace one complete user flow end-to-end. This creates connected understanding instead of isolated file knowledge.',
    icon: 'git',
    content: [
      {
        type: 'callout',
        kind: 'warn',
        title: 'Critical Insight',
        text: 'Do NOT read random files. Instead, trace one complete user flow. This creates connected understanding. Systems are mostly data transformations.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Pick One Important Feature to Trace',
        summary: 'Choose a core flow like login, upload, or checkout',
        content: [
          {
            type: 'p',
            text: 'Choose a feature that is central to the product. Login and signup touch auth, session management, and user creation — excellent starting points.',
          },
          {
            type: 'list',
            items: [
              'login / signup',
              'file upload',
              'checkout / payment',
              'chat message / real-time',
              'create post / resource',
              'search',
              'notifications',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to answer:\nWhat triggers this flow?\nWhat API is called?\nWhere is validation?\nWhere is business logic?\nWhere is state updated?\nWhat DB tables are touched?\nWhat background jobs run?\nWhat response returns?',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Follow the Complete Request Lifecycle',
        summary: 'Trace from UI event through API to DB and back',
        content: [
          {
            type: 'p',
            text: 'Follow the data through every layer. Do not stop at the service boundary — keep going until you see the database query and the response returned to the UI.',
          },
          {
            type: 'list',
            items: [
              'Frontend: component → form → API call → state update',
              'Backend: route/controller → serializer/validator → service layer → DB operations → response formatter',
              'Database: inserts, updates, queries, joins, transactions',
              'Async: queues, workers, scheduled jobs, events',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Example output:\n\nUpload Flow:\nReact Form\n→ axios POST\n→ Django route\n→ serializer validation\n→ service uploads to S3\n→ DB record created\n→ Celery thumbnail job\n→ API response\n→ frontend updates UI',
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '05-dependencies',
    title: 'Map Dependencies',
    subtitle: 'Understand the data model — the system\'s source of truth',
    duration: '1-2 hours',
    tags: ['database', 'schema', 'entities', 'relationships', 'data-model'],
    status: 'mature',
    description:
      'The database reveals business concepts, ownership, relationships, and core domain logic. Databases expose the true shape of the system — study them deeply.',
    icon: 'db',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Insight',
        text: 'The database reveals business concepts, ownership, relationships, and core domain logic. Databases expose the true shape of the system.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Study the Database Schema',
        summary: 'Read migrations, models, and ER diagrams to understand entities',
        content: [
          {
            type: 'p',
            text: 'The schema is the most stable, honest part of the system. Business logic can lie; migrations tell the truth about what changed and when.',
          },
          {
            type: 'list',
            items: [
              'Read migrations in chronological order to see how the system evolved',
              'Read ORM models to understand relationships and constraints',
              'Find primary entities — these are the core business concepts',
              'Look for indexes (reveals what is queried often)',
              'Look for soft deletes (deleted_at columns) — reveals sensitivity of data',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to answer:\nWhat are the core entities?\nHow are they connected?\nWhich tables are most important?\nWhat is considered the source of truth?\nWhere is state persisted?',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Map External Dependencies',
        summary: 'Identify third-party services and integration points',
        content: [
          {
            type: 'p',
            text: 'External dependencies are risk surfaces. Knowing what third-party services the system depends on tells you what breaks when an external API goes down.',
          },
          {
            type: 'list',
            items: [
              'Payment: Stripe, PayPal, Braintree',
              'Storage: AWS S3, Cloudinary, Google Cloud Storage',
              'Auth: Firebase, Auth0, OAuth providers',
              'Messaging: Twilio, SendGrid, Mailgun',
              'Analytics: Segment, Mixpanel, Amplitude',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Example output:\n\nUsers\n  ↓\nOrders\n  ↓\nPayments\n\nUsers can have many orders.\nOrders belong to one user.\nPayments belong to orders.',
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '06-tests',
    title: 'Read the Tests',
    subtitle: 'Tests reveal expected behavior, edge cases, and business rules',
    duration: '1-2 hours',
    tags: ['tests', 'unit-tests', 'integration', 'e2e', 'behavior'],
    status: 'mature',
    description:
      'Sometimes tests explain the system better than documentation. Tests reveal expected behavior, edge cases, business rules, and the assumptions the authors considered important.',
    icon: 'bug',
    content: [
      {
        type: 'callout',
        kind: 'tip',
        title: 'Tests as Documentation',
        text: 'Tests reveal expected behavior, edge cases, business rules, and assumptions. Sometimes tests explain the system better than any documentation.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Read Unit and Integration Tests',
        summary: 'Understand isolated behavior and service interactions',
        content: [
          {
            type: 'p',
            text: 'Unit tests tell you how individual functions are expected to behave. Integration tests tell you how services are expected to work together. Both are essential.',
          },
          {
            type: 'list',
            items: [
              'Read unit tests for core business logic',
              'Read integration tests for service boundaries',
              'Look for edge cases — these reveal non-obvious requirements',
              'Look for permission tests — reveals the security model',
              'Look for validation tests — reveals input constraints',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Read E2E Tests',
        summary: 'Understand the complete user flows the team considers critical',
        content: [
          {
            type: 'p',
            text: 'E2E tests show you which complete user flows the team considers critical enough to automate. They are a map of the most important product workflows.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to answer:\nWhat behavior is considered critical?\nWhat edge cases matter?\nWhat assumptions are protected?\nWhat business rules are enforced?\nWhat scenarios are NOT tested (gaps)?',
          },
          {
            type: 'callout',
            kind: 'warn',
            title: 'Test Gaps Are Risk',
            text: 'Untested areas are where bugs hide. If a critical flow has no tests, that is a risk area — tread carefully when modifying it.',
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '07-dev-environment',
    title: 'Set Up Dev Environment',
    subtitle: 'Convert theory into real understanding by running the system',
    duration: '1-4 hours',
    tags: ['local-setup', 'docker', 'environment', 'experimentation'],
    status: 'mature',
    description:
      'Static reading is not enough. Running the system locally lets you interact, observe, and experiment. This is where real understanding begins.',
    icon: 'cmd',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Principle',
        text: 'Static reading is NOT enough. You need interaction, observation, and experimentation. This is where real understanding begins.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Get the System Running Locally',
        summary: 'Follow the README and resolve setup issues',
        content: [
          {
            type: 'p',
            text: 'The setup process itself teaches you about the system. Every dependency you install, every environment variable you configure, is a piece of the architecture.',
          },
          {
            type: 'code',
            lang: 'bash',
            code: 'npm install\npip install -r requirements.txt\ndocker compose up',
          },
          {
            type: 'list',
            items: [
              'Follow the README exactly',
              'Note where the README is incomplete or wrong',
              'Understand every environment variable you have to set',
              'Note which services need to be running (Redis, PostgreSQL, etc.)',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Trigger Flows and Observe',
        summary: 'Interact with the system and watch what happens',
        content: [
          {
            type: 'p',
            text: 'Observation is the fastest path to understanding. Trigger real flows and watch the logs, network requests, and database changes in real time.',
          },
          {
            type: 'list',
            items: [
              'Try: creating users, submitting forms, uploading files',
              'Try: causing validation errors, refreshing pages, deleting data',
              'Watch: logs, network requests, DB changes, cache changes, worker jobs, API timing',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to answer:\nWhat happens when things succeed?\nWhat happens when they fail?\nWhat logs appear?\nWhat services communicate?\nWhat changes in the DB?',
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '08-domain-language',
    title: 'Learn Domain Language',
    subtitle: 'Study failure paths to understand the REAL system behavior',
    duration: '1-2 hours',
    tags: ['failure', 'error-handling', 'resilience', 'debugging'],
    status: 'growing',
    description:
      'Systems reveal their true architecture during failure. Breaking things safely — in a dev environment — teaches you more about the system than a week of code reading.',
    icon: 'bug',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Insight',
        text: 'Systems reveal their true architecture during failure. This step separates shallow understanding from deep understanding.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Break Things Safely',
        summary: 'Deliberately trigger failure conditions and observe the behavior',
        content: [
          {
            type: 'p',
            text: 'Every failure mode you trigger is a lesson in how the system was designed to handle adversity. Graceful degradation vs. catastrophic failure reveals architectural maturity.',
          },
          {
            type: 'list',
            items: [
              'Submit invalid form data',
              'Use an expired or invalid token',
              'Remove a required environment variable',
              'Simulate a broken API response',
              'Stop the database container',
              'Stop the Redis container',
              'Simulate a network timeout',
              'Use wrong or insufficient permissions',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Analyze Failure Behavior',
        summary: 'Understand how the system handles each failure mode',
        content: [
          {
            type: 'p',
            text: 'For each failure you trigger, document how the system responds. This builds a mental model of the system\'s resilience design.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to answer:\nHow are errors handled?\nWhere are retries implemented?\nWhat fails gracefully?\nWhat crashes completely?\nWhat monitoring exists?\nWhat logs are useful?',
          },
          {
            type: 'list',
            items: [
              'Look for: retries, fallbacks, circuit breakers, timeouts',
              'Look for: dead letter queues, graceful degradation, recovery behavior',
              'Ask: what failures are isolated vs. what cascades?',
            ],
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '09-conventions',
    title: 'Team Conventions',
    subtitle: 'Learn ownership, responsibilities, and module boundaries',
    duration: '1-2 hours',
    tags: ['modules', 'boundaries', 'ownership', 'separation-of-concerns'],
    status: 'growing',
    description:
      'Good systems separate concerns. Understanding what each module owns — and what it should NOT own — is essential for making safe modifications.',
    icon: 'book',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Principle',
        text: 'Good systems separate concerns. You need to understand what each module owns — and what should NOT belong there.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Study Module Responsibilities',
        summary: 'Understand what each module owns and where its boundaries are',
        content: [
          {
            type: 'p',
            text: 'Every module has a responsibility. When you understand those responsibilities clearly, you can predict where code should live and where it should not.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Auth service owns:\n- login\n- token validation\n- permissions\n\nShould NOT own:\n- sending emails\n- processing payments\n- managing UI state',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to ask:\nWhat is this module responsible for?\nWhat should NOT belong here?\nWhat dependencies does it have?\nWhat modules depend on it?\nIs it tightly coupled?',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Identify Coupling and Technical Debt Areas',
        summary: 'Find where responsibilities have leaked across boundaries',
        content: [
          {
            type: 'p',
            text: 'In real codebases, boundaries erode over time. Identifying where responsibilities have leaked tells you where technical debt lives and where modifications are riskiest.',
          },
          {
            type: 'list',
            items: [
              'Look for modules that import from many other modules (high fan-in)',
              'Look for circular dependencies',
              'Look for business logic that ended up in controllers or views',
              'Look for shared mutable state across module boundaries',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Coupling Reveals Risk',
            text: 'Tightly coupled modules are where bugs propagate unexpectedly. When you change one thing and something unrelated breaks — that is tight coupling.',
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '10-pain-points',
    title: 'Find Pain Points',
    subtitle: 'Study infrastructure, deployment, and the production environment',
    duration: '1-2 hours',
    tags: ['infrastructure', 'deployment', 'production', 'operations', 'scaling'],
    status: 'growing',
    description:
      'Applications do not live only in code. Understanding the deployment, environments, scaling, and observability of the production system completes your picture of the codebase.',
    icon: 'flame',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Principle',
        text: 'Applications do not live only in code. You must understand deployment, environments, scaling, and observability.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Study Infrastructure and Deployment',
        summary: 'Read Docker, Terraform, CI/CD, and Kubernetes files',
        content: [
          {
            type: 'p',
            text: 'The infrastructure files tell you how the application is packaged, deployed, and operated. They reveal environment separation, secrets management, and scaling strategy.',
          },
          {
            type: 'list',
            items: [
              'Dockerfile — how the app is containerized',
              'Docker Compose — local multi-service setup',
              'Terraform / Kubernetes manifests — production infrastructure',
              'CI/CD workflows / GitHub Actions — build, test, deploy pipeline',
              'Helm charts, Nginx configs — service routing and proxy setup',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to answer:\nHow is the app deployed?\nHow are secrets managed?\nHow are environments separated?\nWhat services exist in production?\nHow does scaling work?\nWhat monitoring exists?',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Understand the Operations Picture',
        summary: 'Learn how incidents are detected and resolved',
        content: [
          {
            type: 'p',
            text: 'Understanding how the team detects and responds to production incidents tells you how mature the operational practices are.',
          },
          {
            type: 'list',
            items: [
              'What monitoring and alerting is in place?',
              'How are logs aggregated and searchable?',
              'Is there an on-call rotation or runbook?',
              'How long does a typical deployment take?',
              'Is there a staging environment that mirrors production?',
            ],
          },
        ],
      },
    ],
  },
  {
    hub: 'codebase-understanding',
    slug: '11-mental-model',
    title: 'Build Mental Model',
    subtitle: 'Document your mental model to build permanent understanding',
    duration: '1-2 hours',
    tags: ['mental-model', 'documentation', 'diagrams', 'synthesis'],
    status: 'growing',
    description:
      'Writing clarifies thinking. If you cannot explain the system simply, you probably do not fully understand it yet. Document your mental model to lock in understanding.',
    icon: 'star',
    content: [
      {
        type: 'callout',
        kind: 'quote',
        text: 'If you can predict behavior, debug confidently, trace flows quickly, modify features safely, and explain architecture clearly — then you understand the system.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Document Your Mental Model',
        summary: 'Write notes and create diagrams of your understanding',
        content: [
          {
            type: 'p',
            text: 'Writing clarifies thinking. The act of writing your understanding forces you to identify gaps. If you cannot write it, you do not fully understand it.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Document:\nWhat starts the app?\nWhere does business logic live?\nHow does authentication work?\nWhere is state stored?\nWhat services communicate?\nWhat are the risky areas?\nWhat happens during failure?\nWhat background jobs exist?',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Create Diagrams',
        summary: 'Even ugly diagrams solidify understanding enormously',
        content: [
          {
            type: 'p',
            text: 'Even rough ASCII diagrams in a text file are enormously valuable. Drawing forces you to identify gaps and commit your understanding to a concrete form.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Frontend\n   ↓\nAPI Gateway\n   ↓\nAuth Service\n   ↓\nDatabase',
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'The Master Loop',
            text: 'Once you finish one feature: pick another important flow → trace it end-to-end → understand data movement → observe failures → update mental model → repeat. This loop gradually reveals the entire system.',
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Signs You Actually Understand the System',
        summary: 'Checklist of genuine system understanding',
        content: [
          {
            type: 'checklist',
            items: [
              { label: 'Can predict where code lives' },
              { label: 'Can explain major flows clearly' },
              { label: 'Can trace bugs quickly without searching randomly' },
              { label: 'Can modify features safely without breaking others' },
              { label: 'Can identify risky areas before touching them' },
              { label: 'Can explain architecture clearly to others' },
              { label: 'Can understand failure behavior before it happens' },
              { label: 'Can onboard others effectively' },
            ],
          },
          {
            type: 'callout',
            kind: 'quote',
            text: 'Juniors think: "What does this file do?" Seniors think: "How does the system behave? Why was it designed this way? What are the tradeoffs? Where are the risks?"',
          },
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
    title: 'Understand Requirements',
    subtitle: 'Understand WHY the feature exists before writing any code',
    duration: '1-4 hours',
    tags: ['requirements', 'business-intent', 'user-research', 'scope'],
    status: 'mature',
    description:
      'Great engineers solve problems, not just tickets. Before writing code, understand what problem is being solved, who needs the feature, why it matters, and what business outcome is expected.',
    icon: 'book',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Philosophy',
        text: 'Professional software engineering is NOT "just writing code". It is: safely evolving complex systems over time.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Understand Business Intent',
        summary: 'Clarify the problem, users, value, and success metrics',
        content: [
          {
            type: 'p',
            text: 'Before writing code: understand what problem is being solved, who needs the feature, why it matters, and what business outcome is expected. Great engineers solve problems — not just tickets.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to ask:\nWho requested this feature?\nWho are the users?\nWhat pain/problem exists today?\nWhat does success look like?\nWhat metrics improve?\nWhat edge cases matter?\nWhat are failure scenarios?',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Example output:\n\nFeature: User profile image upload\n\nGoal: Allow users to personalize profiles.\n\nBusiness value: Improve engagement and identity.\n\nConstraints:\n- max 5MB\n- only images\n- secure uploads\n- mobile friendly',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Identify Impacted Areas',
        summary: 'Map every part of the system that will change',
        content: [
          {
            type: 'p',
            text: 'Features rarely affect only one place. You must understand what parts of the system will change. This prevents accidental breakage.',
          },
          {
            type: 'list',
            items: [
              'Frontend: UI components, routing, state management, forms, caching',
              'Backend: APIs, services, authentication, validation, background jobs',
              'Database: schema changes, migrations, indexes, relationships',
              'Infrastructure: storage, queues, Redis, object storage, monitoring',
              'External systems: Stripe, AWS S3, email providers, OAuth, analytics',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to ask:\nWhat existing flows change?\nCould this break anything?\nDoes auth/permissions change?\nWill DB migrations be needed?\nDoes this affect performance?\nWill async jobs be required?',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '02-design',
    title: 'Design the Solution',
    subtitle: 'Design BEFORE implementation — this is where senior engineering starts',
    duration: '2-8 hours',
    tags: ['design', 'api-design', 'database-design', 'architecture', 'rfc'],
    status: 'mature',
    description:
      'Design how the feature integrates into the existing system. Define API contracts, database changes, state management, async processing, security, and scalability before writing a line of code.',
    icon: 'layers',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Senior Engineering Principle',
        text: 'This is where senior engineering starts. You are designing how the feature integrates into the system — not just writing code.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Design the API Contract',
        summary: 'Define endpoints, request/response shapes, auth, and error handling',
        content: [
          {
            type: 'p',
            text: 'The API contract is the agreement between frontend and backend. Define it before implementing either side so both can work in parallel.',
          },
          {
            type: 'list',
            items: [
              'Endpoints — HTTP method and path',
              'Request shape — required and optional fields',
              'Response shape — success and error formats',
              'Validation — what inputs are invalid',
              'Error handling — what error codes and messages',
              'Authentication — what auth is required',
              'Permissions — who is allowed to call this',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Design Database and State Changes',
        summary: 'Define new tables, columns, indexes, and state ownership',
        content: [
          {
            type: 'p',
            text: 'Database schema changes are the most risky part of any feature — they are hard to reverse and affect the entire system. Design them carefully before touching code.',
          },
          {
            type: 'list',
            items: [
              'New tables? New columns? What indexes?',
              'Relationships and constraints?',
              'Migrations needed — forward and rollback',
              'Where is truth stored? What gets cached?',
              'What lives in frontend state vs. server state?',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Design Security and Scalability',
        summary: 'Think about permissions, rate limits, and load from day one',
        content: [
          {
            type: 'p',
            text: 'Security and scalability are not features added later — they must be designed in from the start. Retrofitting them is expensive.',
          },
          {
            type: 'list',
            items: [
              'Permissions: who can access what',
              'Rate limits: how to prevent abuse',
              'Validation: server-side input sanitization',
              'Data exposure risks: what fields should be hidden',
              'Expected traffic: can this handle 10x load?',
              'Caching strategy: what can be cached and for how long?',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Produce Design Artifacts',
            text: 'Even small notes help enormously. Possible artifacts: feature spec, technical design doc, RFC, API contract, flow diagram, sequence diagram, DB schema sketch.',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '03-plan',
    title: 'Plan Implementation',
    subtitle: 'Slice the feature into vertical increments that deliver value',
    duration: '1-2 hours',
    tags: ['planning', 'vertical-slices', 'incremental', 'PRs'],
    status: 'mature',
    description:
      'Instead of building everything at once, break the feature into small vertical slices. Each slice should be testable, deployable, reviewable, and low-risk.',
    icon: 'git',
    content: [
      {
        type: 'callout',
        kind: 'warn',
        title: 'Avoid Horizontal Development',
        text: 'Do NOT build: all DB work → all backend work → all frontend work → testing. This creates giant PRs, delayed feedback, hard debugging, painful merges, and fragile integration.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Break the Feature into Vertical Slices',
        summary: 'Each slice delivers working business value end-to-end',
        content: [
          {
            type: 'p',
            text: 'A vertical slice cuts through all layers — DB, backend, frontend — but only implements a thin slice of the full feature. Each slice is independently testable and deployable.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Example: Image Upload Feature\n\nSlice 1: Simple upload endpoint + basic UI + DB save\nSlice 2: Validation + permissions\nSlice 3: Async processing + optimization\nSlice 4: Monitoring + analytics + retries\n\nEach slice delivers working business value.',
          },
          {
            type: 'list',
            items: [
              'Each slice must be: testable, deployable, reviewable, understandable, low-risk',
              'Keep PRs small — easier to review, test, rollback, and reason about',
              'Enterprise teams strongly prefer small incremental changes',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Plan Safe Engineering Practices',
        summary: 'Identify where to add observability and feature flags',
        content: [
          {
            type: 'p',
            text: 'Before writing code, decide where you will add logging, feature flags, and monitoring. These are not afterthoughts — they are part of the implementation plan.',
          },
          {
            type: 'list',
            items: [
              'Where will structured logs be added?',
              'Will a feature flag be used for rollout?',
              'What metrics will confirm the feature is working in production?',
              'What does a rollback look like if something goes wrong?',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Feature flag example:\nENABLE_NEW_UPLOAD_FLOW=true\n\nEnables:\n- gradual rollout\n- testing in production\n- emergency disable\n- safer releases',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '04-implement',
    title: 'Implement',
    subtitle: 'Protect the existing system while safely evolving it',
    duration: 'Varies',
    tags: ['implementation', 'architecture', 'coupling', 'observability', 'feature-flags'],
    status: 'mature',
    description:
      'Follow safe engineering practices: keep PRs small, preserve architectural boundaries, avoid tight coupling, add logging and observability, and use feature flags for risky changes.',
    icon: 'cmd',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'The Enterprise Engineering Mindset',
        text: 'Junior mindset: "How do I code this?" Senior mindset: "How do I evolve the system safely?" Focus on architecture + impact, not just finishing the ticket.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Keep PRs Small and Preserve Boundaries',
        summary: 'Make incremental changes that respect module ownership',
        content: [
          {
            type: 'p',
            text: 'Small PRs are easier to review, test, rollback, and reason about. Preserving architectural boundaries respects ownership and separation of concerns.',
          },
          {
            type: 'list',
            items: [
              'One PR per vertical slice',
              'Respect module ownership — do not dump logic randomly',
              'Services communicate through APIs, events, or interfaces — not direct imports across domains',
            ],
          },
          {
            type: 'code',
            lang: 'text',
            code: 'BAD:  Upload service directly edits payment logic\n\nGOOD: Services communicate through APIs/events/interfaces',
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Add Logging, Observability, and Feature Flags',
        summary: 'Make the feature observable and safely releasable',
        content: [
          {
            type: 'p',
            text: 'Production systems must be observable. If you cannot observe a feature, you cannot operate it reliably. Feature flags enable gradual, safe rollouts.',
          },
          {
            type: 'list',
            items: [
              'Add structured logs at key decision points',
              'Add metrics for success and failure rates',
              'Add distributed tracing if applicable',
              'Add error tracking (Sentry integration)',
              'Wrap risky changes in a feature flag',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Loose Coupling',
            text: 'Avoid tight coupling. Loose coupling improves: scalability, maintainability, testing safety, and deployment safety. One change should not break unrelated parts of the system.',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '05-test',
    title: 'Test',
    subtitle: 'Verify correctness and prevent regressions at multiple levels',
    duration: '2-8 hours',
    tags: ['testing', 'unit-tests', 'integration', 'e2e', 'load-tests', 'failure-aware'],
    status: 'mature',
    description:
      'Test at multiple levels: unit for isolated logic, integration for service interaction, E2E for complete user flows, load for performance, and security for vulnerabilities.',
    icon: 'bug',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Failure-Aware Testing',
        text: 'Senior engineers test "What happens when things break?" — not just "What happens when things work?"',
      },
      {
        type: 'step',
        n: 1,
        title: 'Test Multiple Levels',
        summary: 'Cover unit, integration, E2E, load, and security',
        content: [
          {
            type: 'list',
            items: [
              'Unit Tests — isolated logic: functions, classes, transformations',
              'Integration Tests — service interaction: DB, cache, external APIs',
              'E2E Tests — complete user flow from UI to database',
              'Load Tests — performance under stress',
              'Security Tests — vulnerabilities and abuse scenarios',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Test Critical Scenarios',
        summary: 'Cover happy paths, edge cases, and failure modes',
        content: [
          {
            type: 'p',
            text: 'Always test beyond the happy path. The scenarios that actually break production are the ones developers forgot to think about.',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'Always test:\nHappy paths\nInvalid input\nPermission failures\nTimeouts\nRetries\nConcurrency\nRace conditions\nLarge payloads\nService failures\nEdge cases',
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Test the Failure Path',
            text: 'For every feature, ask: "What does the user experience when this fails?" Test that experience explicitly. Untested failure paths are where the worst production bugs live.',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '06-review',
    title: 'Code Review',
    subtitle: 'Collaborative quality gate — learning and risk reduction',
    duration: '1-4 hours',
    tags: ['code-review', 'PR', 'collaboration', 'quality'],
    status: 'mature',
    description:
      'Code review is a quality gate, a knowledge-sharing mechanism, and a risk reduction tool. Small PRs make reviews effective — large PRs get rubber-stamped.',
    icon: 'eye',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Why Reviews Matter',
        text: 'Code review is a collaborative quality gate. It reduces risk, spreads knowledge, and catches issues that automated tests miss.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Prepare a Reviewable PR',
        summary: 'Write a clear description and keep the diff small',
        content: [
          {
            type: 'p',
            text: 'A PR that is easy to review gets a thorough review. A PR that is hard to review gets a quick approval. The quality of your PR description directly affects the quality of feedback.',
          },
          {
            type: 'list',
            items: [
              'Write a clear description: what changed, why, and how to test it',
              'Link to the ticket or spec',
              'Note any areas of uncertainty or tradeoffs made',
              'Keep the diff small — one slice per PR',
              'Include screenshots or recordings for UI changes',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Conduct an Effective Review',
        summary: 'Look beyond syntax — review architecture, security, and correctness',
        content: [
          {
            type: 'p',
            text: 'Good code review goes beyond style. The most valuable feedback catches architectural issues, security gaps, missing edge cases, and unclear logic.',
          },
          {
            type: 'list',
            items: [
              'Does this preserve architectural boundaries?',
              'Are there security concerns?',
              'Are edge cases handled?',
              'Is the code testable and maintainable?',
              'Is observability in place (logs, metrics)?',
              'What happens when this fails?',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Review Culture',
            text: 'Review code, not the person. Ask questions rather than making demands. "Why was X chosen over Y?" is better than "This is wrong, use Y." Great reviews are conversations.',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '07-deploy',
    title: 'Deploy',
    subtitle: 'Release safely without breaking production',
    duration: '1-4 hours',
    tags: ['deployment', 'gradual-rollout', 'rollback', 'monitoring', 'production'],
    status: 'mature',
    description:
      'Deploy with safety: use gradual rollouts, monitor during release, and always know how to rollback. Treat production as sacred.',
    icon: 'git',
    content: [
      {
        type: 'callout',
        kind: 'warn',
        title: 'Treat Production as Sacred',
        text: 'Always ask before deploying: "How do we undo this safely?" This is a REAL senior engineering question. Rollback planning is not optional.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Gradual Rollout',
        summary: 'Release to a small audience first to reduce blast radius',
        content: [
          {
            type: 'p',
            text: 'Gradual rollouts reduce blast radius. If something goes wrong, only a small percentage of users are affected, and you can rollback quickly before the problem spreads.',
          },
          {
            type: 'list',
            items: [
              'Release to internal users first',
              'Then beta users or opted-in users',
              'Then a small traffic percentage (1%, 5%, 10%)',
              'Then specific regions',
              'Finally, full rollout',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Monitor During Release',
        summary: 'Watch key metrics in real time during the rollout window',
        content: [
          {
            type: 'p',
            text: 'The window immediately after a deploy is the highest-risk period. Stay present, watch the dashboards, and be ready to rollback at the first sign of problems.',
          },
          {
            type: 'list',
            items: [
              'Error rates — are errors spiking?',
              'Latency — are response times increasing?',
              'DB load — are queries slowing down?',
              'Queue health — are jobs backing up?',
              'Memory usage — is memory growing?',
              'Logs — are there new error patterns?',
              'API failures — are external calls failing?',
            ],
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Rollback Planning',
            text: 'Before deploying: know exactly how to rollback. Can you toggle a feature flag to disable it instantly? Is the DB migration reversible? Does the previous docker image still exist?',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '08-monitor',
    title: 'Monitor',
    subtitle: 'Learn from real-world usage — deployment is not the end',
    duration: 'Ongoing',
    tags: ['monitoring', 'production', 'analytics', 'behavior', 'optimization'],
    status: 'growing',
    description:
      'Production reveals truths that development environments hide. Observe user behavior, performance, scaling, unexpected edge cases, and operational failures in the real world.',
    icon: 'sparkle',
    content: [
      {
        type: 'callout',
        kind: 'note',
        title: 'Core Principle',
        text: 'Deployment is NOT the end. Production reveals truths development environments hide.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Observe Real Behavior',
        summary: 'Watch how users actually interact with the feature',
        content: [
          {
            type: 'p',
            text: 'Users interact with features in ways you never anticipated. Real production observation is the fastest path to discovering what your assumptions got wrong.',
          },
          {
            type: 'list',
            items: [
              'User behavior — are users using the feature as designed?',
              'Performance — is the feature fast enough at real scale?',
              'Scaling — does it hold up under production load?',
              'Unexpected edge cases — what scenarios did users find that tests missed?',
              'Operational failures — what breaks at scale that worked in dev?',
              'Abuse patterns — is anyone misusing the feature?',
              'System bottlenecks — where does the system slow down under load?',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Ask Production Questions',
        summary: 'Analyze observations and derive improvement actions',
        content: [
          {
            type: 'code',
            lang: 'text',
            code: 'Questions to ask:\nAre users behaving as expected?\nWhat errors appear in production?\nWhat assumptions were wrong?\nWhere are bottlenecks emerging?\nWhat needs optimization?',
          },
          {
            type: 'callout',
            kind: 'tip',
            title: 'Closing the Loop',
            text: 'Feed production observations back into Phase 1 (Understand) for the next iteration. Real usage data is the most valuable input to product decisions.',
          },
        ],
      },
    ],
  },
  {
    hub: 'feature-development',
    slug: '09-refactor',
    title: 'Refactor & Document',
    subtitle: 'Prevent entropy and long-term degradation of the system',
    duration: 'Ongoing',
    tags: ['refactoring', 'documentation', 'tech-debt', 'maintainability', 'architecture'],
    status: 'growing',
    description:
      'Every feature increases complexity. Without continuous maintenance, systems decay. Good engineers simplify, reduce coupling, improve naming, and improve observability continuously.',
    icon: 'star',
    content: [
      {
        type: 'callout',
        kind: 'quote',
        text: 'Professional software engineering is not "writing code". It is "managing complexity safely over time". That is the real craft.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Continuously Improve the System',
        summary: 'Simplify code, reduce coupling, and improve observability',
        content: [
          {
            type: 'p',
            text: 'Every feature adds complexity. Without active refactoring, systems accumulate technical debt until changes become risky and slow. Good engineers continuously push back against entropy.',
          },
          {
            type: 'list',
            items: [
              'Simplify code that has become overly complex',
              'Reduce coupling between modules',
              'Improve naming — clear names are self-documenting',
              'Improve test coverage for critical paths',
              'Extract reusable abstractions',
              'Improve observability — better logs, metrics, tracing',
              'Improve architecture where boundaries have eroded',
            ],
          },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'The Long-Term Engineering Mindset',
        summary: 'Optimize for long-term system evolution, not just closing tickets',
        content: [
          {
            type: 'p',
            text: 'Professional engineering optimizes for long-term system evolution — not just closing tickets quickly. The question is not "how do I build this feature?" but "how do I evolve this system responsibly?"',
          },
          {
            type: 'list',
            items: [
              'Understand before coding',
              'Design before implementing',
              'Deliver incrementally',
              'Preserve architectural boundaries',
              'Keep changes small and reversible',
              'Think about failure from day one',
              'Make systems observable',
              'Optimize for maintainability',
              'Treat production as sacred',
            ],
          },
          {
            type: 'callout',
            kind: 'quote',
            text: '"Let all things be done decently and in order." — 1 Corinthians 14:40',
          },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// HUBS
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

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

export function getHubPage(hub: string, slug: string): HubPage | undefined {
  const h = HUBS.find(h => h.id === hub)
  if (!slug) return undefined
  return h?.phases.find(p => p.slug === slug)
}

export function getHub(id: string): Hub | undefined {
  return HUBS.find(h => h.id === id)
}
