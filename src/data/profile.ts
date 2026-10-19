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
  role: 'Senior Full Stack Engineer',
  location: 'Buenos Aires, Argentina',
  timezone: 'UTC−3',
  availability: 'Open to remote roles · full-time or contract',
  headline: 'I build Vue and Laravel products, and the AI agent workflows that help ship them.',
  intro:
    'Almost 5 years shipping production web apps for banking, fintech and a US-based API company. Today most of my delivery work runs through a workflow of AI agents I designed, with a human approving every step.',
  email: 'agus.rodriguez777@gmail.com',
  links: {
    github: 'https://github.com/agustin-1998',
    linkedin: 'https://www.linkedin.com/in/agustinrodriguez98',
    resume: '/agustin-rodriguez-resume.pdf',
  },
  updated: 'October 2026',
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
    { value: '679', label: 'tests on the workflow' },
  ],
}

export const work: CaseStudy[] = [
  {
    id: 'hu-flow',
    title: 'hu-flow: an AI development workflow for a banking tech team',
    context: 'Built for my team at Provincia NET',
    period: '2026',
    status: 'In use on real deliveries',
    summary:
      'A workflow of 12 Claude Code agents that takes an Azure DevOps user story to a branch ready to merge, while a developer stays in control.',
    problem:
      'Stories moved through the same manual steps every time: read the ticket and the design, plan, code, write tests, check every criterion, review. Unit and automated tests were rarely written by developers; only QA had automation.',
    built: [
      'Specialized agents for each stage: reading the story and the Figma design, planning, implementing, writing tests, verifying acceptance criteria in the browser or against the API, and reviewing.',
      'Code, security and Trivy vulnerability reviews that run in parallel before a merge request is opened.',
      'Hook guardrails that block risky actions, and 4 checkpoints where a human approves before the workflow moves on.',
    ],
    decisions: [
      'Humans approve, agents execute: every checkpoint can stop or redirect the run.',
      'The workflow is software too, so it has its own test suite (679 tests).',
      'Measured before optimizing: a cost analysis of 6,776 agent calls showed that 64% of spend was context being sent again.',
    ],
    metrics: [
      { value: '12', label: 'specialized agents' },
      { value: '679', label: 'tests on the workflow' },
      { value: '64%', label: 'of spend found to be re-sent context' },
    ],
    stack: ['Claude Code', 'MCP', 'Hooks', 'Skills', 'Azure DevOps', 'GitLab', 'Vue 3', 'Laravel'],
    links: [],
    note: 'Private repository, access on request. Used on 4 user stories and 5 bug fixes so far; it also reviews teammates’ merge requests and is being rolled out to the team. Happy to walk through it on a call.',
  },
  {
    id: 'onprem-ai',
    title: 'On-premise AI platform for small businesses',
    context: 'Personal project',
    period: '2026',
    status: 'Pilot stage, not in production',
    summary:
      'A multi-tenant AI platform installed on the client’s own server. Sensitive data never leaves it raw: documents are filtered by clearance, and personal data is tokenized before any optional call to the Claude API.',
    problem:
      'Small companies want to ask questions about their own files, but their documents cannot go to a public AI service, and many of their servers have no GPU.',
    built: [
      'Retrieval with PostgreSQL and pgvector, filtered by role and by four sensitivity levels (public, internal, confidential, restricted).',
      'A PII layer built on Presidio that tokenizes personal data before a prompt leaves the server, plus prompt-injection checks on retrieved text.',
      'Local models through Ollama, and tools the model calls for anything numeric, so calculations run in Python instead of the model.',
      'A data plane per client and a central control plane (FastAPI), three React apps (user, local admin, super-admin), and a hash-chained audit log.',
    ],
    decisions: [
      'The model never does math: numbers go to Python through tool calls.',
      'Access control lives in retrieval, not in the prompt: users only get documents they can already open.',
      'Every architecture decision is written down as an ADR before the code.',
    ],
    metrics: [
      { value: '11', label: 'architecture decision records' },
      { value: '2,700+', label: 'automated test cases (Python and TypeScript)' },
      { value: '4', label: 'sensitivity levels enforced in retrieval' },
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Ollama', 'Presidio', 'Claude API', 'React', 'TypeScript', 'Docker'],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/agustin-1998/onprem-ai-platform' }],
    note: 'An earlier version was tested on a copy of a real company’s file server with hundreds of documents.',
  },
  {
    id: 'self-service',
    title: 'Self-service portal and the company’s first frontend base',
    context: 'Provincia NET · Banco Provincia group',
    period: '2024 – present',
    status: 'In production',
    summary:
      'The Vue 3 frontend of a self-service portal used by 350+ agency users, and the base project that new frontends and legacy migrations now start from.',
    problem:
      'Internal systems were plain PHP pages, and every new frontend started from zero, so quality and structure changed from one app to the next.',
    built: [
      'The self-service portal from scratch: agencies track balances, earnings and cash flow, manage user access and configure their agency.',
      'A shared base project with layout, routing, authentication and token handling, an API layer and common components.',
      'Vue 3 frontends on Laravel APIs for two legacy systems: document intake and the board-meeting platform used by senior leadership.',
    ],
    decisions: [
      'Designed the frontend–API contract first and built working prototypes on mock data, so frontend and backend could move in parallel.',
      'One base for every new app instead of a template copied by hand.',
    ],
    metrics: [
      { value: '350+', label: 'agency users on the portal' },
      { value: '2', label: 'legacy systems rebuilt' },
      { value: '1st', label: 'shared frontend base in the company' },
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Laravel', 'MySQL', 'Docker'],
    links: [],
    note: 'Internal systems; code is private.',
  },
]

export const alsoBuilt: Link[] = [
  { label: 'Zyla API Hub, an API marketplace I led end to end; the design is still live', href: 'https://zylalabs.com' },
]

export const experience: Role[] = [
  {
    company: 'Provincia NET',
    title: 'Senior Full Stack Engineer',
    period: 'Dec 2024 – Present',
    place: 'Buenos Aires · Hybrid',
    points: [
      'Sole frontend engineer on internal platforms, on teams of 3 to 8 developers.',
      'Built the self-service portal used by 350+ agency users and the company’s first frontend base project.',
      'Designed hu-flow, a 12-agent Claude Code workflow with human approval at every checkpoint.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Laravel', 'Docker', 'Claude Code'],
  },
  {
    company: 'Global66',
    companyUrl: 'https://www.global66.com',
    title: 'Frontend Developer (Web & Mobile)',
    period: 'Jan 2024 – Nov 2024',
    place: 'Buenos Aires · Hybrid',
    points: [
      'Cross-border payments fintech serving 6 Latin American markets.',
      'Built money-transfer features for PIX (Brazil’s instant payments) and euro transfers, and reworked onboarding.',
    ],
    stack: ['Vue 2/3', 'TypeScript', 'NativeScript', 'Firebase'],
  },
  {
    company: 'Zyla Labs',
    companyUrl: 'https://zylalabs.com',
    title: 'Full Stack Developer',
    period: 'Feb 2022 – Dec 2023',
    place: 'US-based company · Remote',
    points: [
      'Owned up to 5 API products at a time, end to end, in a team of 2 to 4 developers with no designers or QA.',
      'Led the Zyla API Hub marketplace and redesigned Metals-API, one of the highest-revenue products.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Python', 'Stripe'],
  },
  {
    company: 'Freelance',
    title: 'Frontend Developer, contract for a vehicle inspection station',
    period: 'Oct 2022 – Jan 2023',
    place: 'Remote',
    points: ['Real-time React dashboard that streamed brake-tester readings to a tablet over WebSockets.'],
    stack: ['React', 'WebSockets'],
  },
]

export const stack: StackGroup[] = [
  { name: 'Frontend', items: ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Vite', 'Tailwind CSS', 'PrimeVue', 'React', 'Next.js'] },
  { name: 'Backend', items: ['Laravel', 'PHP', 'Node.js', 'Python', 'FastAPI', 'REST APIs', 'MySQL', 'PostgreSQL'] },
  { name: 'Applied AI', items: ['Claude Code agents', 'MCP', 'Hooks & skills', 'RAG', 'pgvector', 'ChromaDB', 'Ollama', 'Tool calling', 'PII masking'] },
  { name: 'Delivery', items: ['Docker', 'GitLab CI', 'GitHub Actions', 'Azure DevOps', 'Vitest', 'PHPUnit', 'Linux'] },
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
