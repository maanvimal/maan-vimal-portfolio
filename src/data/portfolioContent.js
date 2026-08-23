import {
  aboutContact,
  aboutHero,
  aboutProfile,
  aboutSections,
  capabilities as aboutCapabilities,
  experiencePlaceholders as aboutExperiencePlaceholders,
  processSteps as aboutProcessSteps,
  selectedWork as aboutSelectedWork,
  toolkitCategories as aboutToolkitCategories,
} from './aboutContent.js'

import {
  aiDevelopmentPillars,
  capabilities as codingCapabilities,
  codingContact,
  codingProfile,
  codingProjects,
  engineeringProcess,
  projectLifecycleStages,
  techStackCategories,
} from './codingContent.js'

import {
  cinematicProduction,
  mediaWatchArchive,
  mythosClosing,
  mythosHero,
  mythosProject,
  mythosUnveiledShowcase,
  productionPipelineStages,
  selectedEpisodes,
  storyEngineStages,
  visualLanguagePillars,
} from './mythosContent.js'

import {
  artisticDisciplines,
  artisticProcessStages,
  commercialWorkSection,
  galleryCollections,
  majesticClosing,
  majesticHero,
  majesticPhilosophy,
  majesticStudio,
  majesticTailsBrand,
  visualDirectionPillars,
} from './majesticContent.js'

/**
 * PORTFOLIO CONTENT REGISTRY
 *
 * Central single source of truth for editable portfolio copy across all worlds.
 * Visual components read their editorial copy from this registry.
 */

export const globalContent = {
  documentTitle: 'Maan Vimal — Portfolio',
  author: {
    name: 'Maan Vimal',
  },
  navigation: {
    ariaLabel: 'Portfolio worlds',
  },
  controls: {
    ariaLabel: 'Global preferences',
    musicOnAria: 'Mute background music',
    musicOffAria: 'Enable background music',
    transitionsOnAria: 'Disable transitions',
    transitionsOffAria: 'Enable transitions',
    thoughtReplayAria: 'Replay Phoenix thought',
  },
}

export const aboutContent = {
  hero: aboutHero,
  profile: aboutProfile,
  sections: aboutSections,
  capabilities: aboutCapabilities,
  process: aboutProcessSteps,
  toolkit: aboutToolkitCategories,
  selectedWork: aboutSelectedWork,
  experience: aboutExperiencePlaceholders,
  contact: aboutContact,
}

export const codingContent = {
  hero: {
    terminalId: 'CODING // 00_INIT',
    statusBadge: 'SYS_ACTIVE',
    name: codingProfile.name,
    roles: codingProfile.roles,
    intro: codingProfile.intro,
    disciplines: codingProfile.disciplines,
    invitation: codingProfile.invitation,
  },
  sections: {
    profile: {
      index: '01',
      tag: 'TECHNICAL PROFILE',
    },
    capabilities: {
      index: '02',
      tag: 'WHAT I BUILD',
      heading: 'Engineering across software, AI pipelines, and interactive interfaces.',
    },
    process: {
      index: '03',
      tag: 'ENGINEERING APPROACH',
      heading: 'Structured execution from specification to production.',
    },
    stack: {
      index: '04',
      tag: 'TECH STACK',
      heading: 'Verified technical toolkit & production environments.',
    },
    projects: {
      index: '05',
      tag: 'SELECTED PROJECTS',
      heading: 'Production applications and systems engineering.',
      highlightsLabel: 'ARCHITECTURE HIGHLIGHTS',
    },
    aiDev: {
      index: '06',
      tag: 'AI × DEVELOPMENT',
      heading: 'The convergence of software engineering and artificial intelligence.',
    },
    architecture: {
      index: '07',
      tag: 'SYSTEMS ARCHITECTURE',
      heading: 'End-to-end project lifecycle & data flow.',
    },
    contact: {
      index: '08',
      tag: 'SYSTEM EXIT',
    },
  },
  profile: codingProfile,
  capabilities: codingCapabilities,
  engineeringProcess,
  techStack: techStackCategories,
  projects: codingProjects,
  aiDevelopment: aiDevelopmentPillars,
  lifecycle: projectLifecycleStages,
  contact: codingContact,
  colophon: {
    status: 'SYS_STATUS: ONLINE',
    separator: '//',
    world: 'WORLD: CODING_V1',
    stack: 'STACK: REACT 19 + VITE 8 + GSAP',
  },
}

export const mythosContent = {
  hero: mythosHero,
  sections: {
    project: {
      index: '01',
      tag: 'THE PROJECT',
      pillarsLabel: 'CORE FOUNDATIONS',
    },
    storyEngine: {
      index: '02',
      tag: 'THE STORY ENGINE',
      heading: 'The three-tier narrative mechanism.',
    },
    production: {
      index: '03',
      tag: 'CINEMATIC PRODUCTION',
      heading: 'Verified multi-model tools & production craft.',
      disciplinesLabel: 'PRODUCTION DISCIPLINES',
    },
    showcase: {
      index: '04',
      tag: 'PRODUCTION ARCHIVE',
      featuresLabel: 'UNIVERSE ARCHITECTURE',
    },
    visualLanguage: {
      index: '05',
      tag: 'VISUAL LANGUAGE',
      heading: 'Aged Bronze, Deep Ember, and Ancient Atmosphere.',
    },
    pipeline: {
      index: '06',
      tag: 'PRODUCTION PIPELINE',
      heading: 'The end-to-end cinematic generation workflow.',
    },
    episodes: {
      index: '07',
      tag: 'SELECTED WORK',
      heading: 'Episodic Universe & Mythology Archive',
    },
    media: {
      index: '08',
      tag: 'CINEMATIC THEATER',
    },
    closing: {
      index: '09',
      tag: 'RETURN',
    },
  },
  project: mythosProject,
  storyEngine: storyEngineStages,
  cinematicProduction,
  showcase: mythosUnveiledShowcase,
  visualLanguage: visualLanguagePillars,
  productionPipeline: productionPipelineStages,
  selectedEpisodes,
  mediaArchive: mediaWatchArchive,
  closing: mythosClosing,
  colophon: {
    chamber: 'MYTHOS_CHAMBER // ONLINE',
    separator: '◆',
    world: 'WORLD: MYTHOS_V1',
    architect: 'ARCHITECT: MAAN VIMAL',
  },
}

export const majesticContent = {
  hero: majesticHero,
  sections: {
    studio: {
      index: '01',
      tag: 'THE STUDIO',
      pillarsLabel: 'STUDIO PILLARS',
    },
    philosophy: {
      index: '02',
      tag: 'THE PHILOSOPHY',
    },
    disciplines: {
      index: '03',
      tag: 'ARTISTIC DISCIPLINES',
      heading: 'Bespoke portrait styles & creative treatments.',
    },
    process: {
      index: '04',
      tag: 'THE ARTISTIC PROCESS',
      heading: 'From photo to timeless portrait.',
    },
    brand: {
      index: '05',
      tag: 'THE STUDIO BRAND',
      focusLabel: 'STUDIO ARCHITECTURE',
    },
    gallery: {
      index: '06',
      tag: 'PORTRAIT COLLECTION',
      heading: 'Curated gallery collections.',
    },
    visualDirection: {
      index: '07',
      tag: 'VISUAL DIRECTION',
      heading: 'Warmth, Luxury, and Character Expression.',
    },
    commercial: {
      index: '08',
      tag: 'COMMERCIAL COMMISSIONS',
    },
    closing: {
      index: '09',
      tag: 'STUDIO SIGN-OFF',
    },
  },
  studio: majesticStudio,
  philosophy: majesticPhilosophy,
  artisticDisciplines,
  artisticProcess: artisticProcessStages,
  brand: majesticTailsBrand,
  galleryCollections,
  visualDirection: visualDirectionPillars,
  commercialWork: commercialWorkSection,
  closing: majesticClosing,
  colophon: {
    studio: 'MAJESTIC_STUDIO // GALLERY OPEN',
    separator: '◆',
    world: 'WORLD: MAJESTIC_V1',
    artist: 'ARTIST: MAAN VIMAL',
  },
}

export const portfolioContent = {
  global: globalContent,
  about: aboutContent,
  coding: codingContent,
  mythos: mythosContent,
  majestic: majesticContent,
}

export default portfolioContent
