export const codingProfile = {
  name: 'Maan Vimal',
  roles: 'AI Workflow Designer · Developer · Creative Technologist',
  intro:
    'I build production software, AI-assisted workflows, and interactive systems with architectural precision and creative intent.',
  disciplines:
    'React Architecture · AI Pipelines · Frontend Systems · Automation · Creative Tech',
  invitation:
    'Explore technical case studies, engineering pipelines, and systems architecture.',
  narrativeLead: 'Systems over silos. Workflows over one-offs.',
  narrativeBody: [
    'I approach software engineering and AI workflows as connected disciplines. Rather than treating generative models as isolated novelty outputs, I engineer structured pipelines that connect models, tools, and front-end architectures into repeatable, reliable production systems.',
    'My focus centers on frontend engineering, reactive state management, and building clean interfaces backed by practical cloud integrations. Every project is approached with architectural clarity—from schema design and component composition to deployment.',
  ],
  principles: [
    {
      code: '01',
      title: 'Full-Lifecycle Thinking',
      description: 'Mapping the path from initial technical scope to modular production deployment.',
    },
    {
      code: '02',
      title: 'AI Integration',
      description: 'Embedding generative intelligence into practical user interfaces and developer tooling.',
    },
    {
      code: '03',
      title: 'Modular Architecture',
      description: 'Crafting clean, reusable components with predictable state flow and zero bloat.',
    },
  ],
}

export const capabilities = [
  {
    code: '01',
    title: 'Frontend Development',
    category: 'Core Engineering',
    description: 'Building responsive, accessible, high-performance web applications using modern standards.',
  },
  {
    code: '02',
    title: 'React Applications',
    category: 'Architecture',
    description: 'Structuring modular SPA architectures with robust state management and component patterns.',
  },
  {
    code: '03',
    title: 'AI Workflows',
    category: 'Systems',
    description: 'Engineering multi-stage generative pipelines connecting models, prompt logic, and output validation.',
  },
  {
    code: '04',
    title: 'Production Systems',
    category: 'Pipeline Design',
    description: 'Designing repeatable end-to-end pipelines that transform raw assets into finished deliverables.',
  },
  {
    code: '05',
    title: 'Workflow Automation',
    category: 'Tooling',
    description: 'Scripting build tooling, batch processing, and data transformations for developer efficiency.',
  },
  {
    code: '06',
    title: 'Generative AI Systems',
    category: 'AI / Models',
    description: 'Integrating multimodal generative tools into structured creative workflows with strict quality control.',
  },
  {
    code: '07',
    title: 'Creative Technology',
    category: 'Interaction',
    description: 'Blending interactive graphics, motion choreography, and software systems into cohesive experiences.',
  },
  {
    code: '08',
    title: 'Interactive Experiences',
    category: 'UI / UX',
    description: 'Crafting stateful, fluid user interfaces with micro-interactions, responsive grids, and fast render cycles.',
  },
]

export const engineeringProcess = [
  {
    step: '01',
    phase: 'DEFINE',
    summary: 'Isolate requirements, define data schemas, and identify technical constraints.',
    tags: ['Scoping', 'Schema Design', 'Constraints'],
  },
  {
    step: '02',
    phase: 'ARCHITECT',
    summary: 'Map component hierarchies, state lifecycles, and tool integrations.',
    tags: ['Component Graph', 'State Flow', 'API Specs'],
  },
  {
    step: '03',
    phase: 'BUILD',
    summary: 'Implement modular code using semantic patterns, typed props, and clean structure.',
    tags: ['React', 'Modular CSS', 'Services'],
  },
  {
    step: '04',
    phase: 'TEST',
    summary: 'Validate across device viewports, edge cases, responsive states, and performance budgets.',
    tags: ['Cross-Browser', 'Linting', 'Resilience'],
  },
  {
    step: '05',
    phase: 'ITERATE',
    summary: 'Refine interaction ergonomics, optimize re-renders, and streamline pipeline bottlenecks.',
    tags: ['Optimization', 'Refactoring', 'Profiling'],
  },
  {
    step: '06',
    phase: 'SHIP',
    summary: 'Deploy stable production builds backed by automated bundling and version checkpoints.',
    tags: ['Vite Build', 'Production', 'Git Checkpoints'],
  },
]

export const techStackCategories = [
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    tag: 'CLIENT-SIDE',
    tools: [
      { name: 'React', detail: 'Component architecture, Hooks, Custom State' },
      { name: 'Vite', detail: 'Next-gen HMR, optimized production bundler' },
      { name: 'JavaScript (ESNext)', detail: 'Modern async patterns, DOM APIs' },
      { name: 'Tailwind CSS', detail: 'Utility-first styling systems' },
      { name: 'HTML5 & Vanilla CSS', detail: 'Semantic markup, CSS variables, Grid/Flexbox' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Data Services',
    tag: 'INFRASTRUCTURE',
    tools: [
      { name: 'Firebase Authentication', detail: 'User identity, session management, secure auth' },
      { name: 'Cloud Firestore', detail: 'Real-time document storage, reactive data subscriptions' },
      { name: 'React Router', detail: 'Declarative client-side routing & deep navigation' },
    ],
  },
  {
    id: 'ai-models',
    name: 'AI & Generative Models',
    tag: 'INTELLIGENCE',
    tools: [
      { name: 'Google Gemini', detail: 'Multimodal analysis, prompt orchestration, workflow logic' },
      { name: 'Google Veo', detail: 'Generative cinematic video production pipelines' },
      { name: 'Midjourney', detail: 'High-fidelity conceptual image synthesis' },
      { name: 'Seedance', detail: 'Generative motion and sequencing workflows' },
    ],
  },
  {
    id: 'production',
    name: 'Production & Pipeline Tooling',
    tag: 'PRODUCTION',
    tools: [
      { name: 'FFmpeg', detail: 'Programmatic video/audio processing & encoding' },
      { name: 'ElevenLabs', detail: 'Synthetic voice design, speech synthesis pipelines' },
      { name: 'CapCut', detail: 'Paced video assembly and motion finishing' },
      { name: 'Canva', detail: 'Rapid layout prototyping and graphic asset preparation' },
    ],
  },
  {
    id: 'animation',
    name: 'Animation & Motion Systems',
    tag: 'CHOREOGRAPHY',
    tools: [
      { name: 'GSAP (GreenSock)', detail: 'Complex multi-phase timelines, SVG & DOM choreography' },
      { name: 'CSS Custom Properties', detail: 'Dynamic runtime theme injection & layout tokens' },
      { name: 'IntersectionObserver', detail: 'Performance-optimized scroll reveal triggers' },
    ],
  },
]

export const codingProjects = [
  {
    id: 'campus-share',
    title: 'Campus Share',
    badge: 'FEATURED PROJECT',
    type: 'Full-Stack Student Platform',
    status: 'Active Development',
    description:
      'A dedicated web platform designed to streamline resource exchange, academic collaboration, and peer sharing across campus communities through a unified, accessible interface.',
    highlights: [
      'Engineered a responsive React SPA architecture with Vite for rapid development and clean bundle output.',
      'Implemented secure user authentication and profile management utilizing Firebase Auth.',
      'Architected real-time Firestore database collections for listing creation, categorization, and item queries.',
      'Designed a clean, modern UI with Tailwind CSS focused on student user flows and mobile responsiveness.',
    ],
    stack: ['React', 'Vite', 'Tailwind', 'Firebase Auth', 'Firestore', 'React Router'],
    mediaPlaceholder: 'Verified screenshots & interactive walkthrough forthcoming',
  },
  {
    id: 'multi-world-engine',
    title: 'Portfolio Multi-World Engine',
    badge: 'SYSTEMS ARCHITECTURE',
    type: 'SPA Theme & Transition Engine',
    status: 'In Production (This Portfolio)',
    description:
      'A bespoke multi-environment portfolio orchestrator built with React 19 and GSAP, allowing seamless in-memory switching between four distinctly themed worlds without route reloads.',
    highlights: [
      'Built a custom useWorldTransition state machine managing multi-phase asynchronous choreography.',
      'Designed chromatic aberration RGB signal splits, horizontal clip-path slicing, and signal particle flashes in GSAP.',
      'Implemented dynamic CSS Custom Property tokens injected at the root container per world lifecycle.',
      'Constructed modular data abstractions separating world themes, portrait resolution, and section content.',
    ],
    stack: ['React 19', 'Vite 8', 'GSAP 3', 'Vanilla CSS', 'IntersectionObserver'],
    mediaPlaceholder: 'Live interactive demonstration currently active',
  },
]

export const aiDevelopmentPillars = [
  {
    num: '01',
    title: 'AI-Augmented Development',
    summary:
      'Leveraging advanced language models for rapid architecture prototyping, schema exploration, test case generation, and edge-case discovery while maintaining strict human code review.',
  },
  {
    num: '02',
    title: 'Prompt System Engineering',
    summary:
      'Designing structured prompt hierarchies, context framing, parameter constraints, and automated multi-turn chains that yield deterministic, production-grade creative and technical outputs.',
  },
  {
    num: '03',
    title: 'Generative Media Pipelines',
    summary:
      'Connecting generative video, image, and voice models into cohesive production pipelines where software handles validation, assembly, and encoding while AI drives visual generation.',
  },
  {
    num: '04',
    title: 'Custom Workflow Tooling',
    summary:
      'Writing bespoke automation scripts, batch processors, and lightweight web interfaces that simplify generative tooling and eliminate manual repetitive production steps.',
  },
]

export const projectLifecycleStages = [
  {
    step: '01',
    name: 'Problem & Scope',
    description: 'Deconstruct technical requirements, model domain schemas, and establish performance constraints.',
    icon: 'REQ_INIT',
  },
  {
    step: '02',
    name: 'System Architecture',
    description: 'Map component hierarchies, state lifecycle transitions, and API/service interfaces.',
    icon: 'SYS_ARCH',
  },
  {
    step: '03',
    name: 'Frontend Implementation',
    description: 'Construct modular React components, client routing, and secure cloud service connections.',
    icon: 'DEV_EXEC',
  },
  {
    step: '04',
    name: 'AI & Tool Integration',
    description: 'Integrate generative pipelines, automate asset processing, and script helper tools.',
    icon: 'AI_INTEG',
  },
  {
    step: '05',
    name: 'Testing & Verification',
    description: 'Execute cross-browser audits, responsive viewport checks, bundle optimization, and lint validation.',
    icon: 'QA_TEST',
  },
  {
    step: '06',
    name: 'Deployment & Iteration',
    description: 'Emit optimized production assets, establish Git checkpoints, and iterate on runtime telemetry.',
    icon: 'PROD_DEP',
  },
]

export const codingContact = {
  title: 'Maan Vimal',
  subtitle:
    'Available for technical roles, software internships, AI workflow engineering, and creative technology collaboration.',
  actions: [
    { label: 'GitHub profile pending', type: 'github' },
    { label: 'Technical resume pending', type: 'resume' },
    { label: 'Contact link pending', type: 'contact' },
  ],
}
