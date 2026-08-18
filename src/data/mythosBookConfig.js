/**
 * Configuration and design tokens for "THE LIVING BOOK" — Final 8-Page Sequence.
 * Visual Direction: PURE BLACK MANUSCRIPT + VIVID ANCIENT RUINS + BI-DIRECTIONAL 8-PAGE STACK.
 * 8 Chapters:
 * 01. Phoenix (Emblema Sacrum)
 * 02. Celestial Astrolabe (Draco Coelestis)
 * 03. Anubis + Balance (Libra Veritatis)
 * 04. Merlin's Sword (Gladius Merlini)
 * 05. Greek Architecture (Columnae Graecae)
 * 06. Wings (Alae Sacrae)
 * 07. Thor's Hammer (Mjölnir / Potentia)
 * 08. Infinity / Eternal Seal (Sigillum Infinitum)
 */

export const MYTHOS_THEME = {
  backgroundBlack: '#090807',
  voidFog: '#060504',
  ambientBronze: '#0e0a07',
  directionalLight: '#fbf8f2',

  // Predominantly Black / Aged Charcoal Materials (Book & Pages = Black)
  coverLeather: '#050505',
  coverLeatherDark: '#020202',
  coverLeatherHighlight: '#0b0907',
  bronzeSpine: '#2e1f13',
  bronzeSpineRib: '#422c1b',
  bronzeCorner: '#261a0f',
  gildedPageEdge: '#0d0906',
  gildedEdgeHighlight: '#181109',

  // Pure Black / Charcoal Pages (Visually merge with the book)
  parchmentBase: '#050505',
  parchmentWarm: '#080706',
  parchmentHighlight: '#0b0907',
  parchmentDeckledEdge: '#020202',
  inkDarkSepia: '#030202',

  // High-Contrast Ancient Ruin Bronze/Amber Engraving Tokens (The ONLY colored elements)
  inkBronzeDark: '#422812',
  inkBronzeAged: '#875929',
  inkBronzeWarm: '#c98c44',
  inkBronzeHighlight: '#f5b85d',
  ruinEnergyGlow: '#764e26',

  // Locked White Atmospheric Dust Tokens
  particleWhite: '#ffffff',
  particleWhiteMuted: '#e8e4dc',
}

// 8 Locked Mythology Chapters of The Living Book
export const MYTHOLOGY_PAGES = [
  {
    id: 'page_01_phoenix',
    title: 'PHOENIX // RESURRECTIO',
    subtitle: 'EMBLEMA SACRUM · AVIS IMMORTALIS',
    artworkKey: 'page_01_phoenix',
  },
  {
    id: 'page_02_celestial',
    title: 'DRACO // COELESTIS',
    subtitle: 'DRACO IMPERIALIS · MARGARITA SACRA',
    artworkKey: 'page_02_celestial',
  },
  {
    id: 'page_03_anubis',
    title: 'ANUBIS // LIBRA VERITATIS',
    subtitle: 'MA\'AT SACRA · IUDICIUM ANIMAE',
    artworkKey: 'page_03_anubis',
  },
  {
    id: 'page_04_sword',
    title: 'GLADIUS MERLINI // MYTHOS',
    subtitle: 'EXCALIBUR SACER · REGNUM AETERNUM',
    artworkKey: 'page_04_sword',
  },
  {
    id: 'page_05_greek',
    title: 'COLUMNAE GRAECAE // RUINAE',
    subtitle: 'TEMPLUM ANTIQUUM · ARCHITECTURA',
    artworkKey: 'page_05_greek',
  },
  {
    id: 'page_06_wings',
    title: 'ALAE SACRAE // MONUMENTUM',
    subtitle: 'ALAE MYTHOLOGICAE · ASCENSUS',
    artworkKey: 'page_06_wings',
  },
  {
    id: 'page_07_thor',
    title: 'MJÖLNIR // POTENTIA',
    subtitle: 'MALLEUS NORDICUS · RELIQUIA TONITRUI',
    artworkKey: 'page_07_thor',
  },
  {
    id: 'page_08_infinity',
    title: 'SIGILLUM INFINITUM // AETERNUM',
    subtitle: 'CYCLUS SINE FINE · CONTINUITAS',
    artworkKey: 'page_08_infinity',
  },
]

export const BOOK_CONFIG = {
  // Proportioned commanding scale: ~60–65% visual width of available central area
  pageWidth: 1.34, // Each open wing width (total open width ~2.68)
  pageHeight: 1.84,
  pageBlockDepth: 0.18, // Volumetric physical thickness
  coverThickness: 0.048,
  coverOverhang: 0.040,
  openAngle: 0.22, // Prominent open-book V-spread

  spineRadius: 0.14,
  spineLength: 1.90,

  // Default rest coordinates
  centerPosition: [0.0, -0.05, 0.0],
  centerRotation: [0.32, 0.0, 0.0],
  centerScale: 1.0,
}

export const CAMERA_CONFIG = {
  // Elevated 3/4 perspective view looking down into the open manuscript spread
  position: [0.0, 0.65, 4.85],
  lookAt: [0.0, 0.0, 0.0],
  fov: 45,
}

// Deliberate whole-book spatial choreography mapping Mythos scroll sections to 3D movement & page turns
export const SECTION_STATES = {
  hero: {
    camera: { position: [0.0, 0.65, 4.85], lookAt: [0.0, 0.0, 0.0] },
    bookPos: [0.0, -0.05, -0.15],
    bookRot: [0.32, 0.0, 0.0],
    bookScale: 1.0,
    targetPage: 0.0, // Page 01: Phoenix Crest on Active Right Page
  },
  project: {
    camera: { position: [0.0, 0.68, 4.65], lookAt: [0.0, 0.0, 0.0] },
    bookPos: [-0.06, -0.02, 0.05],
    bookRot: [0.30, 0.02, 0.0],
    bookScale: 1.06,
    targetPage: 1.0, // Page 02: Celestial Astrolabe on Active Right Page
  },
  'story-engine': {
    camera: { position: [0.0, 0.60, 4.55], lookAt: [0.0, -0.05, 0.0] },
    bookPos: [0.05, 0.02, 0.18],
    bookRot: [0.28, -0.02, 0.0],
    bookScale: 1.10,
    targetPage: 2.0, // Page 03: Anubis + Balance on Active Right Page
  },
  production: {
    camera: { position: [0.0, 0.68, 4.45], lookAt: [0.0, 0.05, 0.0] },
    bookPos: [-0.04, 0.05, 0.25],
    bookRot: [0.27, 0.02, 0.0],
    bookScale: 1.14,
    targetPage: 3.0, // Page 04: Merlin's Sword on Active Right Page
  },
  unveiled: {
    camera: { position: [0.0, 0.75, 5.35], lookAt: [0.0, 0.0, 0.0] },
    bookPos: [0.0, 0.04, 0.28],
    bookRot: [0.26, 0.0, 0.0],
    bookScale: 1.15,
    targetPage: 4.0, // Page 05: Greek Architecture on Active Right Page
  },
  'visual-language': {
    camera: { position: [0.15, 0.60, 4.55], lookAt: [0.1, -0.05, 0.0] },
    bookPos: [0.06, 0.0, 0.20],
    bookRot: [0.28, -0.02, 0.0],
    bookScale: 1.12,
    targetPage: 4.0, // Settled on Page 05: Greek Architecture
  },
  pipeline: {
    camera: { position: [-0.1, 0.60, 4.65], lookAt: [-0.05, -0.05, 0.0] },
    bookPos: [-0.05, -0.02, 0.15],
    bookRot: [0.29, 0.02, 0.0],
    bookScale: 1.08,
    targetPage: 5.0, // Page 06: Wings on Active Right Page
  },
  episode: {
    camera: { position: [0.1, 0.68, 4.65], lookAt: [0.05, 0.0, 0.0] },
    bookPos: [0.04, -0.03, 0.10],
    bookRot: [0.30, -0.01, 0.0],
    bookScale: 1.06,
    targetPage: 5.0, // Settled on Page 06: Wings
  },
  media: {
    camera: { position: [0.0, 0.65, 4.75], lookAt: [0.0, 0.0, 0.0] },
    bookPos: [0.0, -0.04, 0.05],
    bookRot: [0.31, 0.0, 0.0],
    bookScale: 1.03,
    targetPage: 6.0, // Page 07: Thor's Hammer on Active Right Page
  },
  closing: {
    camera: { position: [0.0, 0.65, 4.95], lookAt: [0.0, 0.0, 0.0] },
    bookPos: [0.0, -0.05, 0.0],
    bookRot: [0.32, 0.0, 0.0],
    bookScale: 1.0,
    targetPage: 7.0, // Page 08: Infinity / Eternal Seal on Active Right Page
  },
}
