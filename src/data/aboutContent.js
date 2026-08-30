import mythosProjectImage from '../assets/portraits/mythos/phoenix-mythos.png'
import majesticArtistImage from '../assets/portraits/majestic/phoenix-majestic.png'
import codingProjectImage from '../assets/portraits/coding/phoenix-coding.png'

export const aboutHero = {
  eyebrow: 'About',
  title: 'Maan Vimal',
  roles: 'Prompt Engineer · AI Workflow Designer · Generative AI Creator',
  intro:
    'I design AI-powered creative workflows, visual experiences, and production systems that turn ideas into finished work.',
  disciplines:
    'AI workflows · image & video generation · storytelling · creative direction',
  invitation:
    'Explore the work, systems, and creative projects behind the process.',
}

export const aboutProfile = {
  headline: 'Creative thinking, built into systems.',
  narrative:
    'I work at the intersection of AI, creative production, and systems design. My focus is not only on generating individual outputs, but on building workflows that make ideas easier to develop, test, and bring to completion.',
}

export const aboutSections = {
  profile: {
    number: '01',
    title: 'Profile',
    headline: 'Creative thinking, built into systems.',
  },
  capabilities: {
    number: '02',
    title: 'What I Do',
    heading: 'Capabilities with creative and technical range.',
  },
  process: {
    number: '03',
    title: 'How I Work',
    heading: 'From an idea to a working production system.',
  },
  toolkit: {
    number: '04',
    title: 'Toolkit',
    heading: 'Tools in context, not a keyword list.',
  },
  work: {
    number: '05',
    title: 'Selected Work',
    heading: 'Projects that extend into their own worlds.',
  },
  experience: {
    number: '06',
    title: 'Education / Experience',
    heading: 'Professional context, added with verified detail.',
  },
  contact: {
    number: '07',
    title: 'Resume / Contact',
  },
}

export const capabilities = [
  {
    title: 'Prompt Engineering',
    description: 'Designing structured prompts that guide clear creative and production outcomes.',
  },
  {
    title: 'AI Workflow Design',
    description: 'Mapping repeatable AI-assisted workflows from idea through delivery.',
  },
  {
    title: 'Generative AI',
    description: 'Exploring generative tools for concepts, visual output, and iteration.',
  },
  {
    title: 'AI Video Production',
    description: 'Developing AI-assisted video workflows for visual storytelling.',
  },
  {
    title: 'AI Image Creation',
    description: 'Creating and directing generated visual concepts with intent.',
  },
  {
    title: 'Creative Direction',
    description: 'Shaping visual tone, narrative direction, and production choices.',
  },
  {
    title: 'Visual Storytelling',
    description: 'Using image, motion, and narrative to communicate ideas.',
  },
  {
    title: 'Production Pipeline Design',
    description: 'Connecting tools and stages into clearer, more useful production systems.',
  },
]

export const processSteps = [
  ['01', 'Idea', 'Define the creative question and intended outcome.'],
  ['02', 'System', 'Shape the workflow, tools, and prompt structure.'],
  ['03', 'Production', 'Create visual, video, or technical material.'],
  ['04', 'Iteration', 'Review, refine, and improve the working system.'],
  ['05', 'Final Output', 'Deliver a focused result with a repeatable process behind it.'],
]

export const toolkitCategories = [
  {
    name: 'AI / Generative',
    tools: ['Gemini', 'Veo', 'Seedance', 'Midjourney'],
  },
  {
    name: 'Development',
    tools: ['React', 'Vite', 'Tailwind', 'Firebase', 'React Router', 'GSAP'],
  },
  {
    name: 'Production',
    tools: ['ElevenLabs', 'CapCut', 'Canva', 'FFmpeg'],
  },
  {
    name: 'Automation / Workflow',
    tools: ['Workflow design', 'Production systems'],
  },
]

export const selectedWork = [
  {
    id: 'mythos',
    name: 'Mythos Unveiled',
    category: 'Creative Production',
    description: 'A developing creative world for cinematic storytelling and generative visual work.',
    destination: 'Explore in Mythos',
    image: mythosProjectImage,
  },
  {
    id: 'majestic',
    name: 'Majestic Tails Studio',
    category: 'Creative Direction',
    description: 'A developing visual project centred on pet portrait work and creative direction.',
    destination: 'Explore in Majestic',
    image: majesticArtistImage,
  },
  {
    id: 'coding',
    name: 'Campus Share',
    category: 'Systems / Project',
    description: 'A developing project space for technical workflows and product thinking.',
    destination: 'Explore in Coding',
    image: codingProjectImage,
  },
]

export const experience = [
  {
    category: 'Education',
    heading: 'Education',
    role: 'B.Tech — Computer Science Engineering',
    organization: 'SRMCEM, Lucknow',
    period: 'Expected Graduation: 2027',
    details: [
      'Academic Background: Class XII, City Montessori School (91%).',
      'Undergraduate engineering study focusing on software development, AI pipelines, and computer science fundamentals.',
    ],
  },
  {
    category: 'Professional Experience',
    heading: 'Professional Experience',
    role: 'Founder & Prompt Engineer',
    organization: 'Majestic Tails',
    period: '2025–Present',
    details: [
      'Built an AI-powered digital pet portrait brand from concept to production.',
      'Designed reusable prompt engineering workflows for image and video generation.',
      'Produced 30+ AI-generated short-form videos.',
      'Led creative direction, production workflow and brand identity.',
    ],
  },
  {
    category: 'Project Experience',
    heading: 'Campus Share',
    role: 'College Project · Resource & Listing Platform',
    organization: 'React · Vite · Tailwind CSS · Firebase · React Router',
    period: 'Web Application',
    summary:
      'A college project focused on building a practical platform for sharing campus resources and listings, developed using React, Vite, Tailwind CSS, Firebase, and React Router.',
    details: [
      'Engineered a responsive React SPA architecture with Vite for rapid development and clean bundle output.',
      'Implemented secure user authentication and profile management utilizing Firebase Auth.',
      'Architected real-time Firestore database collections for listing creation, categorization, and item queries.',
      'Designed a clean, modern UI with Tailwind CSS focused on student user flows and mobile responsiveness.',
    ],
  },
  {
    category: 'Project Experience',
    heading: 'Maan Vimal — Interactive Portfolio',
    role: 'Living Creative System & Multi-World Architecture',
    organization: 'React 19 · Vite · Three.js / R3F · GSAP · Web Audio API',
    period: 'Project / Portfolio System',
    summary:
      'An interactive portfolio built as a living creative system, combining AI workflow design, creative production, cinematic worldbuilding, interactive web development, custom transitions, generative visual work, and world-specific sound and music systems.',
    details: [
      'The portfolio itself is intended to demonstrate the way I approach creative technology: not simply presenting finished work, but building the systems, interactions, visual language, and production pipelines behind it.',
      'Custom useWorldTransition state engine coordinating asynchronous multi-phase transitions across 4 unique worlds without route reloads.',
      'Integrated 3D spatial network visualization (Three.js/R3F), dynamic CSS token injection, and ambient soundscapes.',
    ],
  },
]

export const aboutContact = {
  signature: 'Maan Vimal',
  identity: 'Prompt Engineer · AI Workflow Designer · Generative AI Creator',
  email: 'maanvimal5@gmail.com',
  phone: '+91 7571846809',
  note:
    'Available for AI workflow design, prompt engineering, generative production, and creative technology collaboration.',
  actions: [
    {
      label: 'View Resume →',
      type: 'resume',
      href: '/resume/Maan-Vimal-Resume.pdf',
    },
    {
      label: 'Contact Me',
      type: 'contact',
      href: 'mailto:maanvimal5@gmail.com',
    },
  ],
}
