import {
  aboutContact,
  aboutHero,
  aboutProfile,
  aboutSections,
  capabilities as aboutCapabilities,
  experience as aboutExperience,
  processSteps as aboutProcessSteps,
  selectedWork as aboutSelectedWork,
  toolkitCategories as aboutToolkitCategories,
} from './aboutContent.js'

import {
  aiDevelopmentPillars,
  campusShareDeepDive,
  capabilities as codingCapabilities,
  codingProfile,
  codingProjects,
  engineeringProcess,
  portfolioEngineDeepDive,
  projectLifecycleStages,
  techStackCategories,
} from './codingContent.js'

import {
  cinematicProduction,
  cinematicWorksSection,
  mythosClosing,
  mythosHero,
  mythosProject,
  mythosUnveiledShowcase,
  otherStyleWorks,
  productionPipelineStages,
  selectedEpisodes,
  storyEngineStages,
  visualLanguagePillars,
} from './mythosContent.js'

import {
  artisticDisciplines,
  artisticProcessStages,
  commercialWorkSection,
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
  experience: aboutExperience,
  contact: aboutContact,
}

export const codingContent = {
  hero: {
    terminalId: 'CODING',
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
    campusShare: {
      index: '06',
      tag: 'CAMPUS SHARE',
      heading: 'Campus Share',
    },
    portfolioEngine: {
      index: '07',
      tag: 'PORTFOLIO MULTI-WORLD ENGINE',
      heading: 'Portfolio Multi-World Engine',
    },
    aiDev: {
      index: '08',
      tag: 'AI × DEVELOPMENT',
      heading: 'The convergence of software engineering and artificial intelligence.',
    },
    architecture: {
      index: '09',
      tag: 'SYSTEMS ARCHITECTURE',
      heading: 'End-to-end project lifecycle & data flow.',
    },
  },
  profile: codingProfile,
  capabilities: codingCapabilities,
  engineeringProcess,
  techStack: techStackCategories,
  projects: codingProjects,
  campusShare: campusShareDeepDive,
  portfolioEngine: portfolioEngineDeepDive,
  aiDevelopment: aiDevelopmentPillars,
  lifecycle: projectLifecycleStages,
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
    cinematicWorks: {
      index: '07',
      tag: 'CINEMATIC WORKS',
      heading: 'Stories that move beyond the frame.',
    },
    otherWorks: {
      index: '08',
      tag: 'OTHER STYLE WORKS',
      heading: 'Image-based storytelling across myth, character, and cinematic atmosphere.',
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
  otherWorks: otherStyleWorks,
  selectedEpisodes,
  cinematicWorks: cinematicWorksSection,
  closing: mythosClosing,
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
    visualDirection: {
      index: '06',
      tag: 'VISUAL DIRECTION',
      heading: 'Warmth, Luxury, and Character Expression.',
    },
    commercial: {
      index: '07',
      tag: 'COMMERCIAL COMMISSIONS',
    },
    closing: {
      index: '08',
      tag: 'STUDIO SIGN-OFF',
    },
  },
  studio: majesticStudio,
  philosophy: majesticPhilosophy,
  artisticDisciplines,
  artisticProcess: artisticProcessStages,
  brand: majesticTailsBrand,
  visualDirection: visualDirectionPillars,
  commercialWork: commercialWorkSection,
  closing: majesticClosing,
}

export const portfolioContent = {
  global: globalContent,
  about: aboutContent,
  coding: codingContent,
  mythos: mythosContent,
  majestic: majesticContent,
}

export default portfolioContent
