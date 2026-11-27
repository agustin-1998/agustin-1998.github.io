// All site copy lives here so it can be edited without touching components.

export interface Link {
  label: string
  href: string
}

export interface Metric {
  value: string
  label: string
}

export interface CaseStudy {
  id: string
  title: string
  context: string
  period: string
  status: string
  summary: string
  problem: string
  built: string[]
  decisions: string[]
  metrics: Metric[]
  stack: string[]
  links: Link[]
  note?: string
}

export interface Role {
  company: string
  companyUrl?: string
  title: string
  period: string
  place: string
  points: string[]
  stack: string[]
}

export interface SideProject {
  title: string
  context: string
  summary: string
  stack: string[]
  href?: string
}

export interface Education {
  title: string
  place: string
  period?: string
}

export interface StackGroup {
  name: string
  items: string[]
}

export interface Principle {
  title: string
  body: string
}

export const profile = {
  name: 'Agustín Rodriguez',
  role: 'Senior Full Stack Engineer · AI Engineer',
  location: 'Buenos Aires, Argentina',
  timezone: 'UTC−3',
  availability: 'Open to remote roles · full-time or contract',
  headline: 'I build full stack web products, and the AI agent workflows that help ship them.',
  intro:
    '5 years shipping production web apps, frontend and backend, for banking, fintech and a US-based API company. My team now delivers its user stories through hu-flow, the AI agent workflow I designed, with a human approving every step.',
  email: 'agus.rodriguez777@gmail.com',
  links: {
    github: 'https://github.com/agustin-1998',
    linkedin: 'https://www.linkedin.com/in/agustinrodriguez98',
    resume: '/agustin-rodriguez-resume.pdf',
  },
  updated: 'November 2026',
}

export const agentRun = {
  name: 'hu-flow',
  caption: 'user story → merge-ready branch',
  steps: [
    { label: 'Read the story and the Figma design', kind: 'step' },
    { label: 'Plan the change', kind: 'step' },
    { label: 'Human approves the plan', kind: 'checkpoint' },
    { label: 'Implement and write tests', kind: 'step' },
    { label: 'Verify each acceptance criterion', kind: 'step', detail: 'browser / API' },
    { label: 'Code, security and Trivy reviews', kind: 'step', detail: 'in parallel' },
    { label: 'Human approves the merge', kind: 'checkpoint' },
  ] as { label: string; kind: 'step' | 'checkpoint'; detail?: string }[],
  footer: [
    { value: '12', label: 'agents' },
    { value: '4', label: 'human checkpoints' },
    { value: '37', label: 'user stories in 6 weeks' },
  ],
}

export const work: CaseStudy[] = [
  {
    id: 'hu-flow',
    title: 'hu-flow: an agentic AI development workflow for a banking tech team',
    context: 'Built for my team at Provincia NET',
    period: '2026',
    status: 'Used every day by my team',
    summary:
      'A workflow of 12 Claude Code agents that takes an Azure DevOps user story to a branch ready to merge, while a developer stays in control.',
    problem:
      'I moved to a new team with a project I didn’t know and tight deadlines. Every story went through the same manual steps: read the ticket and the design, plan, code, write tests, check every criterion, review. Developers rarely wrote unit or automated tests; only QA had automation.',
    built: [
      'Specialized agents for each stage: reading the story and the Figma design through MCP, planning, implementing, writing tests, verifying acceptance criteria in the browser or against the API, and reviewing.',
      'Code, security and Trivy vulnerability reviews that run in parallel before a merge request is opened.',
      'Hook guardrails written in Python that block risky actions, and 4 checkpoints where a human approves before the workflow moves on.',
      'A failure loop: errors go back to the implementing agent, and after repeated failures the run stops and asks a developer to decide.',
    ],
    decisions: [
      'Humans approve, agents execute: every checkpoint can stop or redirect the run, and nothing is merged automatically.',
      'The workflow is software too, so it has its own test suite (693 tests).',
      'Measured before optimizing: a cost analysis of 6,776 agent calls showed that 64% of spend was context being sent again.',
    ],
    metrics: [
      { value: '37', label: 'user stories I delivered in 6 weeks' },
      { value: '100%', label: 'of planned sprint tasks done since the team adopted it' },
      { value: '693', label: 'tests on the workflow itself' },
    ],
    stack: ['Claude Code', 'Subagents', 'MCP', 'Hooks (Python)', 'Skills', 'Azure DevOps', 'Figma', 'GitLab', 'Trivy', 'Vue 3', 'Laravel'],
    links: [{ label: 'See it run', href: '/hu-flow/' }],
    note: 'The code is private; the interactive walkthrough shows each command step by step. My team adopted it after I presented it, and it also reviews teammates’ merge requests. Happy to walk through it on a call.',
  },
  {
    id: 'onprem-ai',
    title: 'On-premise RAG platform for small businesses',
    context: 'Personal project, public repo',
    period: '2026',
    status: 'Pilot stage, not in production',
    summary:
      'A multi-tenant generative AI platform installed on the client’s own server. Sensitive data never leaves it raw: documents are filtered by clearance, and personal data is tokenized before any optional call to the Claude API.',
    problem:
      'Small companies want to ask questions about their own files, but their documents cannot go to a public AI service, and many of their servers have no GPU.',
    built: [
      'Retrieval with PostgreSQL and pgvector (embeddings and vector search), filtered by role and by four sensitivity levels: public, internal, confidential and restricted.',
      'A PII layer built on Presidio that tokenizes personal data before a prompt leaves the server. Retrieved text reaches the model as content, not instructions, and tool schemas reject any field the model invents.',
      'Local models through Ollama, and tools the model calls for anything numeric, so calculations run in Python instead of the model.',
      'A data plane per client and a central control plane (FastAPI), three Next.js apps (user, local admin, super-admin), a hash-chained audit log and a 4-job CI pipeline.',
    ],
    decisions: [
      'The model never does math: numbers go to Python through tool calls.',
      'Access control lives in retrieval, not in the prompt: users only get documents they can already open.',
      'Every architecture decision is written down as an ADR before the code, and answer quality is measured with a golden evaluation set.',
    ],
    metrics: [
      { value: '2,852', label: 'passing tests (pytest and Vitest)' },
      { value: '157', label: 'golden evaluation cases' },
      { value: '11', label: 'architecture decision records' },
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Ollama', 'Presidio', 'Claude API', 'Next.js', 'TypeScript', 'Docker', 'GitHub Actions'],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/agustin-1998/onprem-ai-platform' }],
    note: 'Piloted on a copy of a real company’s file server with hundreds of documents. The repository is public, with ADRs, security specs and the agent workflow used to build it.',
  },
  {
    id: 'legacy-migration',
    title: 'Legacy migration and the company’s first frontend base',
    context: 'Provincia NET · Banco Provincia group',
    period: '2024 – 2026',
    status: 'In production',
    summary:
      'Three legacy systems, each over 20 years old, rebuilt as Vue 3 frontends on Laravel APIs behind an API gateway, plus the base project that new frontends now start from.',
    problem:
      'The internal systems were 20-year-old monoliths with slow pages, dated UX and security gaps, such as sessions that never expired. They could not be replaced in one go, and every new frontend started from zero.',
    built: [
      'The self-service portal from scratch: 350+ agency users track balances, earnings and cash flow, manage user access and configure their agency.',
      'Vue 3 frontends for the document intake system and for the board-meeting platform used by senior leadership.',
      'A shared base project with layout, routing, authentication with expiring tokens, an API layer and common components.',
      'Docker for legacy and new projects, moved to GitLab CI/CD with encrypted per-environment variables.',
    ],
    decisions: [
      'Strangler fig migration: old and new ran side by side, with two backends and two databases, and the old parts were switched off one at a time.',
      'Designed the frontend–API contract first (endpoints per screen) and built prototypes on mock data, so frontend and backend could move in parallel.',
      'One base for every new app instead of a template copied by hand.',
    ],
    metrics: [
      { value: '3', label: 'legacy systems migrated' },
      { value: '350+', label: 'agency users on the portal' },
      { value: '1st', label: 'shared frontend base in the company' },
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Laravel', 'MySQL', 'API gateway', 'Docker', 'GitLab CI/CD'],
    links: [],
    note: 'Internal systems; code is private.',
  },
]

export const moreProjects: SideProject[] = [
  {
    title: 'Algorithmic trading platform',
    context: 'Personal project · running on exchange demo accounts',
    summary:
      'Signal engine, order execution, risk limits, dashboard and multi-account support. 2,000+ automated tests run behind CI gates, and walk-forward and permutation tests caught a labeling bug. Runs on Linux as systemd services, with encrypted credentials and MFA.',
    stack: ['Python', 'Linux', 'systemd', 'GitHub Actions'],
  },
  {
    title: 'On-premise AI document assistant',
    context: 'Client pilot · plastics manufacturer',
    summary:
      'Answers questions over hundreds of the client’s internal documents on their own server: ChromaDB retrieval, a Next.js chat, local Ollama models on CPU only, PII masking and function calling to pandas for figures. About 80% complete, on hold on the client’s side.',
    stack: ['Python', 'RAG', 'Ollama', 'ChromaDB', 'Next.js', 'pandas'],
  },
  {
    title: 'Zyla API Hub',
    context: 'Zyla Labs · live',
    summary:
      'A marketplace where developers find, subscribe to and manage APIs from one account. I led it end to end, frontend and backend, and the design I delivered is still live.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Stripe', 'Algolia'],
    href: 'https://zylalabs.com',
  },
]

export const experience: Role[] = [
  {
    company: 'Provincia NET',
    title: 'Senior Full Stack Engineer',
    period: 'Dec 2024 – Present',
    place: 'Banking technology, Banco Provincia group · Buenos Aires · Hybrid',
    points: [
      'Frontend lead on internal platforms, on teams of 3 to 8 developers, reporting to the Product Owner.',
      'Migrated three legacy systems, each over 20 years old, to Vue 3 frontends on Laravel APIs behind an API gateway, step by step with the strangler fig pattern.',
      'Built the self-service portal used by 350+ agency users and the company’s first frontend base project.',
      'Dockerized legacy and new projects and moved them to GitLab CI/CD with encrypted per-environment variables.',
      'Designed hu-flow, a 12-agent Claude Code workflow my team uses every day: I delivered 37 user stories in 6 weeks, and the team has completed every planned sprint task since adopting it.',
      'Moved in late 2026 to a new team to improve its frontend and its AI system.',
    ],
    stack: ['Vue 3', 'TypeScript', 'JavaScript', 'Laravel', 'MySQL', 'Docker', 'GitLab CI/CD', 'Azure DevOps', 'Claude Code', 'MCP'],
  },
  {
    company: 'Global66',
    companyUrl: 'https://www.global66.com',
    title: 'Frontend Developer (Web & Mobile)',
    period: 'Jan 2024 – Nov 2024',
    place: 'Cross-border payments fintech · Buenos Aires · Hybrid',
    points: [
      'Fintech serving millions of users across 6 Latin American markets.',
      'Built money-transfer features for PIX (Brazil’s instant payments) and euro transfers, and reworked the onboarding and transfer flows.',
      'Built UI driven by JSON configuration in Firebase, with images served from AWS S3, and reusable Vue 2/3 components in TypeScript; contributed to the NativeScript mobile app.',
    ],
    stack: ['Vue 2/3', 'TypeScript', 'NativeScript', 'Tailwind CSS', 'Firebase', 'AWS S3'],
  },
  {
    company: 'Zyla Labs',
    companyUrl: 'https://zylalabs.com',
    title: 'Full Stack Developer',
    period: 'Feb 2022 – Dec 2023',
    place: 'US-based API company · Remote',
    points: [
      'Owned 5 to 8 API products at a time, end to end (UX, UI, Laravel backend, MySQL, testing and releases), in a team of 2 to 4 developers with no designers or QA.',
      'Chose the architecture and patterns for new APIs and built them frontend and backend.',
      'Handled production incidents from health monitoring and Sentry alerts. When DDoS traffic took APIs down, I added per-IP rate limiting to keep them up; Cloudflare came later.',
      'Led the Zyla API Hub marketplace, redesigned Metals-API (one of the highest-revenue products) and rebuilt about 70% of Woord, a text-to-speech product.',
      'Built a Python OCR flow with Tesseract for Plaraphy, and integrated Stripe payments and Algolia search.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Vue.js', 'jQuery', 'Python', 'Stripe', 'Algolia', 'Sentry', 'Heroku'],
  },
  {
    company: 'Freelance',
    title: 'Frontend Developer (Contract)',
    period: 'Oct 2022 – Jan 2023',
    place: 'Vehicle inspection station · Remote',
    points: ['Built a real-time React dashboard that streamed brake-tester readings to a tablet over WebSockets.'],
    stack: ['React', 'WebSockets', 'Bootstrap'],
  },
  {
    company: 'NEORIS',
    title: 'Full Stack Developer Trainee',
    period: 'Oct 2021 – Dec 2021',
    place: 'Buenos Aires',
    points: ['Technical training followed by a team web project.'],
    stack: ['Laravel', 'PHP', 'MySQL', 'Angular'],
  },
]

export const education: Education[] = [
  { title: 'Industrial Engineering (coursework, no degree)', place: 'Universidad Tecnológica Nacional (UTN)', period: '2017 – 2022' },
  { title: 'Full Stack Web Development', place: 'UTN and UTN FRBA', period: '2021' },
  { title: 'Vue.js Developer', place: 'Coderhouse' },
  { title: 'Clean Code, OOP and Data Structures in JavaScript; Next.js; React', place: 'Platzi' },
]

export const languages: string[] = ['Spanish · native', 'English · professional working proficiency, written and spoken']

export const stack: StackGroup[] = [
  { name: 'Frontend', items: ['Vue 3', 'Nuxt', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Pinia', 'Vue Router', 'Vite', 'Tailwind CSS', 'PrimeVue', 'WebSockets'] },
  { name: 'Backend', items: ['Laravel', 'PHP', 'Node.js', 'Python', 'FastAPI', 'REST APIs', 'MySQL', 'PostgreSQL', 'Redis'] },
  { name: 'Applied AI', items: ['LLMs', 'AI agents', 'Claude Code', 'Claude API', 'MCP', 'RAG', 'Embeddings', 'pgvector', 'ChromaDB', 'Ollama', 'Tool calling', 'Evals', 'PII masking'] },
  { name: 'Delivery', items: ['Docker', 'GitLab CI/CD', 'GitHub Actions', 'Azure DevOps', 'AWS S3', 'Vitest', 'PHPUnit', 'pytest', 'Sentry', 'Linux'] },
]

export const principles: Principle[] = [
  {
    title: 'Humans approve, agents execute',
    body: 'AI does the heavy lifting; a person signs off at every step that matters.',
  },
  {
    title: 'Measure before optimizing',
    body: 'I found that 64% of my agents’ cost was repeated context only after I measured 6,776 calls.',
  },
  {
    title: 'Data stays where it belongs',
    body: 'Local models, role-based retrieval and masked personal data when the cloud is not an option.',
  },
]
