/**
 * MAJESTIC WORLD FORMAL COLOR HIERARCHY
 *
 * 1. PRIMARY WORLD COLOR: PITCH BLACK (Dominant Void Base, 85–90% of visual weight)
 * - voidBlack:            #000000 (Pure infinite museum void)
 * - deepCharcoal:         #020202 (Recessed black floor/backing)
 * - shadowRecess:         #070605 (Warm black undertone)
 *
 * 2. SECONDARY WORLD COLOR: WARM CHAMPAGNE / ARTIST BEIGE (Atmospheric depth & typography)
 * - Derived directly from the personal creator portrait and Majestic identity.
 * - champagneDeep:        #9E8B65 (Muted antique umber-beige)
 * - champagneBase:        #C4AE7A (Core artist champagne-beige)
 * - champagneWarm:        #D8C18A (Luminous studio parchment)
 * - champagneLight:       #E8D5AD (Pale cream-champagne atmosphere)
 * - ivoryHighlight:       #F5EBD4 (Soft linen/ivory highlight)
 *
 * 3. ACCENT COLOR: ANTIQUE METALLIC GOLD (Museum frame & travelling rim light)
 * - deepShadow:           #3A2814
 * - darkAntique:          #5A421F
 * - oldGold:              #80632E
 * - richGold:             #C19A52
 * - champagneGold:        #D8B978
 * - hotGold:              #F7E6B5
 * - whiteGold:            #FFF7DD
 */

export const MAJESTIC_PALETTE = {
  // Primary Void Base
  primary: {
    black: '#000000',
    charcoal: '#020202',
    shadowRecess: '#070605',
  },
  // Secondary Champagne / Artist Beige
  secondary: {
    deep: '#9E8B65',
    base: '#C4AE7A',
    warm: '#D8C18A',
    light: '#E8D5AD',
    ivory: '#F5EBD4',
  },
  // Accent Antique Gold
  accent: {
    shadow: '#3A2814',
    darkAntique: '#5A421F',
    oldGold: '#80632E',
    richGold: '#C19A52',
    champagneGold: '#D8B978',
    hotGold: '#F7E6B5',
    whiteGold: '#FFF7DD',
  },
}

export const GOLD_SPECTRUM = {
  deepShadow: MAJESTIC_PALETTE.accent.shadow,
  darkAntique: MAJESTIC_PALETTE.accent.darkAntique,
  oldGold: MAJESTIC_PALETTE.accent.oldGold,
  bronzeGold: '#A17C3F',
  richGold: MAJESTIC_PALETTE.accent.richGold,
  champagneGold: MAJESTIC_PALETTE.accent.champagneGold,
  lightGold: '#E9D59F',
  hotGold: MAJESTIC_PALETTE.accent.hotGold,
  whiteGold: MAJESTIC_PALETTE.accent.whiteGold,
}

export const MAJESTIC_THEME = {
  // Pitch Black Void Atmosphere
  voidBlack: MAJESTIC_PALETTE.primary.black,
  deepCharcoal: MAJESTIC_PALETTE.primary.charcoal,
  shadowWarm: MAJESTIC_PALETTE.primary.shadowRecess,
  fogColor: MAJESTIC_PALETTE.primary.black,

  // Secondary Champagne / Artist Beige Atmosphere
  champagneAtmosphere: MAJESTIC_PALETTE.secondary.light,
  ivoryGlow: MAJESTIC_PALETTE.secondary.ivory,
  artistBeige: MAJESTIC_PALETTE.secondary.base,

  // Inner Velvet Shadow Liner
  frameInnerRecess: MAJESTIC_PALETTE.primary.charcoal,

  // Master Gold Colors
  goldBase: GOLD_SPECTRUM.oldGold,
  goldMolding: GOLD_SPECTRUM.richGold,
  goldBevel: GOLD_SPECTRUM.champagneGold,
  goldHighlight: GOLD_SPECTRUM.hotGold,
  goldTrim: GOLD_SPECTRUM.whiteGold,

  // Controlled Gold Lighting
  ambientWarm: '#120e0a',
  keyLight: '#fff7dd',
  rimChampagne: '#f7e6b5',
}

export const FRAME_CONFIG = {
  // Monumental Museum Frame Scale (75-80% of viewport height, 45-55% width)
  outerWidth: 2.85,
  outerHeight: 3.65,
  outerDepth: 0.26,

  // Inner Artwork Aperture (approx 3:4 portrait aspect)
  innerWidth: 1.95,
  innerHeight: 2.75,
  recessDepth: 0.09,

  // 7-Tier Molding Dimensions
  outerMoldingWidth: 0.18,
  raisedMoldingWidth: 0.135,
  sightBevelWidth: 0.09,
  innerShadowGap: 0.035,
  innerSlipWidth: 0.024,

  // Default rest coordinates
  centerPosition: [0.0, 0.0, 0.0],
  centerRotation: [0.03, 0.0, 0.0],
  centerScale: 1.0,
}

export const CAMERA_CONFIG = {
  position: [0.0, 0.0, 5.50],
  lookAt: [0.0, 0.0, 0.0],
  fov: 44,
}

// 6 Master Pet Portrait Artworks for the Portal (Preserving 100% untouched original colors)
export const PORTAL_ARTWORKS = [
  {
    id: 'art_01_imperial_hound',
    title: 'THE IMPERIAL CANINE',
    subtitle: 'HIS MAJESTY DUKE ALISTAIR // ROYAL VELVET SERIES',
    artKey: 'imperial_hound',
    ambientHue: '#c4a873',
  },
  {
    id: 'art_02_feline_sovereign',
    title: 'THE FELINE SOVEREIGN',
    subtitle: 'QUEEN AURELIA OF VELVET PEAKS // EMERALD CROWN',
    artKey: 'feline_sovereign',
    ambientHue: '#a8d5ba',
  },
  {
    id: 'art_03_companion_duo',
    title: 'THE COMPANION SOVEREIGNS',
    subtitle: 'BARON & LADY // HARMONIOUS HEIRLOOM DUO',
    artKey: 'companion_duo',
    ambientHue: '#f5c382',
  },
  {
    id: 'art_04_woodland_noble',
    title: 'THE WOODLAND CHRONICLE',
    subtitle: 'SIR ROWAN OF GREENWOOD // STORYBOOK NOBLE',
    artKey: 'woodland_noble',
    ambientHue: '#d4af37',
  },
  {
    id: 'art_05_painterly_wash',
    title: 'THE LUMINOUS COMPANION',
    subtitle: 'CELESTIAL WHISPER // WATERCOLOR EXPRESSION',
    artKey: 'painterly_wash',
    ambientHue: '#e6c896',
  },
  {
    id: 'art_06_studio_master',
    title: 'MAJESTIC TAILS MASTERWORK',
    subtitle: 'THE NOBLE HEIRLOOM ARCHIVE // MAAN VIMAL',
    artKey: 'studio_master',
    ambientHue: '#d6b56d',
  },
]

/**
 * Scroll Choreography mapping Majestic sections to 3D movement & lighting states.
 * - Reduced Camera Zoom (Subtle amplitude from Z: 5.50 down to Z: 5.15 max approach).
 * - Asymmetric Lateral (X/Y) Camera Drift for dimensional observation.
 * - Complete Enlarged Perimeter Light Travel: TOP -> UPPER-RIGHT -> RIGHT -> LOWER-RIGHT -> BOTTOM -> LOWER-LEFT -> LEFT -> UPPER-LEFT -> TOP.
 */
export const SECTION_STATES = {
  // 01 — HERO: Top & Upper Bevel gently caught in darkness
  hero: {
    camera: { position: [0.0, 0.02, 5.50], lookAt: [0.0, 0.0, 0.0] },
    framePos: [0.0, 0.0, 0.0],
    frameRot: [0.03, 0.0, 0.0],
    frameScale: 1.0,
    frameOpacity: 0.85,
    keyLightIntensity: 0.95,
    rimLightPos: [0.5, 1.98, 1.4], // Top / Upper-Right sight edge
    rimLightIntensity: 0.95,
    activeArtworkIndex: 0,
    portalReveal: 0.7,
  },

  // 02 — STUDIO: Camera drifts slightly Left/Up; Light explores Upper-Right Corner cartouche
  studio: {
    camera: { position: [-0.10, 0.04, 5.38], lookAt: [-0.02, 0.0, 0.0] },
    framePos: [0.02, 0.01, 0.03],
    frameRot: [0.02, 0.015, 0.0],
    frameScale: 1.01,
    frameOpacity: 1.0,
    keyLightIntensity: 1.05,
    rimLightPos: [1.60, 1.90, 1.35], // Upper-Right Corner
    rimLightIntensity: 1.15,
    activeArtworkIndex: 0,
    portalReveal: 0.9,
  },

  // 03 — PHILOSOPHY: Camera drifts slightly Right/Down; Light travels down Right Vertical Molding
  philosophy: {
    camera: { position: [0.08, -0.02, 5.32], lookAt: [0.02, 0.0, 0.0] },
    framePos: [-0.01, 0.0, 0.05],
    frameRot: [0.01, -0.015, 0.0],
    frameScale: 1.02,
    frameOpacity: 1.0,
    keyLightIntensity: 1.15,
    rimLightPos: [1.68, 0.2, 1.4], // Right Vertical Fluted Molding
    rimLightIntensity: 1.25,
    activeArtworkIndex: 1,
    portalReveal: 1.0,
  },

  // 04 — WHAT I CREATE: Camera moves slightly Right; Light illuminates Lower-Right Corner
  create: {
    camera: { position: [0.12, 0.02, 5.25], lookAt: [0.03, 0.0, 0.0] },
    framePos: [-0.02, 0.01, 0.07],
    frameRot: [0.01, -0.02, 0.0],
    frameScale: 1.03,
    frameOpacity: 1.0,
    keyLightIntensity: 1.2,
    rimLightPos: [1.58, -1.85, 1.35], // Lower-Right Corner
    rimLightIntensity: 1.3,
    activeArtworkIndex: 2,
    portalReveal: 1.0,
  },

  // 05 — THE PROCESS: Camera shifts Left/Up; Light sweeps across Bottom Horizontal Molding
  process: {
    camera: { position: [-0.10, 0.04, 5.22], lookAt: [-0.02, 0.0, 0.0] },
    framePos: [0.02, 0.01, 0.08],
    frameRot: [0.02, 0.015, 0.0],
    frameScale: 1.04,
    frameOpacity: 1.0,
    keyLightIntensity: 1.25,
    rimLightPos: [0.0, -2.0, 1.4], // Bottom Horizontal Molding
    rimLightIntensity: 1.3,
    activeArtworkIndex: 3,
    portalReveal: 1.0,
  },

  // 06 — STUDIO BRAND: Intimate subtle center approach; Light illuminates Lower-Left Corner
  tails: {
    camera: { position: [0.04, 0.01, 5.15], lookAt: [0.01, 0.0, 0.0] },
    framePos: [0.0, 0.0, 0.09],
    frameRot: [0.0, 0.0, 0.0],
    frameScale: 1.05,
    frameOpacity: 1.0,
    keyLightIntensity: 1.35,
    rimLightPos: [-1.58, -1.85, 1.35], // Lower-Left Corner
    rimLightIntensity: 1.4,
    activeArtworkIndex: 5,
    portalReveal: 1.0,
  },

  // 07 — PORTRAIT GALLERY: Camera drifts Left/Down; Light travels up Left Vertical Molding
  gallery: {
    camera: { position: [-0.08, -0.02, 5.22], lookAt: [-0.02, 0.0, 0.0] },
    framePos: [0.01, 0.0, 0.07],
    frameRot: [0.01, 0.015, 0.0],
    frameScale: 1.03,
    frameOpacity: 1.0,
    keyLightIntensity: 1.3,
    rimLightPos: [-1.68, 0.3, 1.4], // Left Vertical Fluted Molding
    rimLightIntensity: 1.35,
    activeArtworkIndex: 4,
    portalReveal: 1.0,
  },

  // 08 — VISUAL DIRECTION: Camera drifts Right/Up; Light reaches Upper-Left Corner
  direction: {
    camera: { position: [0.06, 0.04, 5.30], lookAt: [0.02, 0.0, 0.0] },
    framePos: [-0.01, 0.01, 0.05],
    frameRot: [0.02, -0.01, 0.0],
    frameScale: 1.02,
    frameOpacity: 1.0,
    keyLightIntensity: 1.2,
    rimLightPos: [-1.60, 1.90, 1.35], // Upper-Left Corner
    rimLightIntensity: 1.25,
    activeArtworkIndex: 5,
    portalReveal: 1.0,
  },

  // 09 — COMMERCIAL WORK: Camera glides Center-Left; Light completes loop to Top Bevels & Slip
  commercial: {
    camera: { position: [-0.05, 0.0, 5.25], lookAt: [-0.01, 0.0, 0.0] },
    framePos: [0.01, 0.0, 0.05],
    frameRot: [0.01, 0.01, 0.0],
    frameScale: 1.03,
    frameOpacity: 1.0,
    keyLightIntensity: 1.3,
    rimLightPos: [0.0, 1.98, 1.4], // Top Molding & Inner Slip Fillet
    rimLightIntensity: 1.35,
    activeArtworkIndex: 0,
    portalReveal: 1.0,
  },

  // 10 — CLOSING: Camera gently pulls back into deep black void; Soft golden ambient parting
  closing: {
    camera: { position: [0.0, 0.06, 5.60], lookAt: [0.0, 0.0, 0.0] },
    framePos: [0.0, 0.02, -0.06],
    frameRot: [0.04, 0.0, 0.0],
    frameScale: 0.98,
    frameOpacity: 0.8,
    keyLightIntensity: 0.9,
    rimLightPos: [0.6, 1.7, 1.6], // Gentle parting rim light
    rimLightIntensity: 0.85,
    activeArtworkIndex: 5,
    portalReveal: 0.8,
  },
}
