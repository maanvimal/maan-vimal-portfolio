// Configuration for "THE CREATIVE MIND" — Sculptural 3D Organic Golden Brain

export const BRAIN_THEME = {
  primaryGold: '#DFB15B',
  luminousGold: '#FCE8A2',
  brightGold: '#FFE58F',
  warmAmber: '#E5B869',
  deepGold: '#9E7B38',
  darkGold: '#4A3712',
  spaceBlack: '#060708',
  rimGold: '#FFF2C6',
}

// Generate organic 3D ribbon curves forming the dual-hemisphere human brain sculpture
function createBrainStrandPaths() {
  const strands = []

  // Helper to generate symmetric left/right cortical curves with organic variations
  const addHemispherePair = (basePoints, radius, colorType = 'primary') => {
    // Right hemisphere (x > 0)
    const rightPts = basePoints.map(([x, y, z]) => [x + 0.08, y, z])
    // Left hemisphere (x < 0, mirrored with subtle organic asymmetry)
    const leftPts = basePoints.map(([x, y, z], idx) => [
      -(x + 0.08) + (idx % 2 === 0 ? 0.02 : -0.02),
      y + (idx % 3 === 0 ? 0.015 : -0.015),
      z + (idx % 2 === 1 ? -0.02 : 0.02),
    ])

    strands.push({ points: rightPts, radius, colorType, hemisphere: 'right' })
    strands.push({ points: leftPts, radius, colorType, hemisphere: 'left' })
  }

  // 1. Frontal & Superior Sagittal Crest Ribbons (Top Arch)
  addHemispherePair(
    [
      [0.05, 0.0, 1.1],
      [0.22, 0.45, 0.95],
      [0.35, 0.85, 0.65],
      [0.32, 1.15, 0.15],
      [0.28, 1.12, -0.45],
      [0.18, 0.75, -0.95],
      [0.05, 0.25, -1.15],
    ],
    0.026,
    'bright',
  )

  addHemispherePair(
    [
      [0.12, -0.1, 1.05],
      [0.38, 0.38, 0.85],
      [0.55, 0.78, 0.45],
      [0.52, 1.02, -0.1],
      [0.45, 0.95, -0.6],
      [0.32, 0.55, -0.98],
      [0.12, 0.1, -1.1],
    ],
    0.024,
    'primary',
  )

  // 2. Mid-Parietal & Cortical Convolution Ribbons (Outer Crown)
  addHemispherePair(
    [
      [0.25, -0.15, 0.85],
      [0.58, 0.25, 0.7],
      [0.78, 0.65, 0.25],
      [0.82, 0.75, -0.3],
      [0.72, 0.58, -0.75],
      [0.45, 0.28, -1.05],
      [0.18, -0.05, -1.0],
    ],
    0.028,
    'luminous',
  )

  addHemispherePair(
    [
      [0.15, 0.2, 0.95],
      [0.48, 0.6, 0.65],
      [0.65, 0.9, 0.1],
      [0.58, 0.88, -0.45],
      [0.35, 0.65, -0.85],
      [0.15, 0.35, -1.02],
    ],
    0.022,
    'primary',
  )

  // 3. Temporal Lobe Swirls (Lateral Lower Curve)
  addHemispherePair(
    [
      [0.3, -0.25, 0.65],
      [0.68, -0.18, 0.45],
      [0.85, -0.05, 0.05],
      [0.88, 0.18, -0.35],
      [0.75, 0.12, -0.7],
      [0.52, -0.15, -0.85],
      [0.25, -0.35, -0.65],
    ],
    0.03,
    'warm',
  )

  addHemispherePair(
    [
      [0.22, -0.35, 0.45],
      [0.55, -0.32, 0.2],
      [0.72, -0.2, -0.2],
      [0.65, -0.08, -0.55],
      [0.42, -0.28, -0.75],
      [0.18, -0.42, -0.5],
    ],
    0.024,
    'primary',
  )

  // 4. Frontal Pole Swirls & Gyral Loops (Front Complexity)
  addHemispherePair(
    [
      [0.08, -0.18, 1.15],
      [0.28, 0.05, 1.12],
      [0.45, 0.35, 0.98],
      [0.32, 0.62, 0.78],
      [0.15, 0.48, 0.88],
      [0.08, 0.15, 1.05],
    ],
    0.022,
    'luminous',
  )

  addHemispherePair(
    [
      [0.18, -0.05, 1.08],
      [0.42, 0.18, 0.95],
      [0.58, 0.45, 0.72],
      [0.48, 0.68, 0.45],
      [0.25, 0.55, 0.58],
      [0.1, 0.25, 0.75],
    ],
    0.02,
    'bright',
  )

  // 5. Occipital & Cerebellar Loops (Back Curve & Base)
  addHemispherePair(
    [
      [0.06, 0.1, -1.18],
      [0.28, 0.35, -1.08],
      [0.52, 0.38, -0.88],
      [0.62, 0.18, -0.75],
      [0.48, -0.08, -0.92],
      [0.25, -0.18, -1.08],
      [0.06, -0.1, -1.12],
    ],
    0.025,
    'warm',
  )

  addHemispherePair(
    [
      [0.12, -0.22, -0.85],
      [0.35, -0.32, -0.78],
      [0.52, -0.28, -0.55],
      [0.48, -0.42, -0.35],
      [0.28, -0.48, -0.45],
      [0.1, -0.38, -0.68],
    ],
    0.026,
    'primary',
  )

  // 6. Deep Medial & Limbic Interconnecting Ribbons (Inner Depth)
  addHemispherePair(
    [
      [0.04, 0.15, 0.85],
      [0.18, 0.38, 0.55],
      [0.22, 0.52, 0.05],
      [0.18, 0.45, -0.45],
      [0.12, 0.22, -0.8],
      [0.04, 0.05, -0.88],
    ],
    0.018,
    'bright',
  )

  addHemispherePair(
    [
      [0.06, -0.15, 0.65],
      [0.2, 0.05, 0.35],
      [0.25, 0.15, -0.15],
      [0.18, -0.02, -0.55],
      [0.08, -0.2, -0.72],
    ],
    0.016,
    'luminous',
  )

  // 7. Dynamic Cross-Cortical Synaptic Arcs (Brain Sulci Creases)
  addHemispherePair(
    [
      [0.32, 0.85, 0.4],
      [0.55, 0.65, 0.15],
      [0.68, 0.42, -0.15],
      [0.55, 0.18, -0.38],
      [0.32, 0.05, -0.45],
    ],
    0.022,
    'primary',
  )

  addHemispherePair(
    [
      [0.25, 0.72, -0.15],
      [0.48, 0.55, -0.42],
      [0.62, 0.35, -0.68],
      [0.45, 0.08, -0.82],
      [0.22, -0.05, -0.85],
    ],
    0.02,
    'luminous',
  )

  return strands
}

export const BRAIN_STRANDS = createBrainStrandPaths()

// Sparse floating abstract idea fragments (curved shards / golden geometric chips)
export const BRAIN_FRAGMENTS_CONFIG = [
  { pos: [1.8, 1.4, -0.2],  scale: [0.12, 0.02, 0.08], rot: [0.4, 0.6, 0.2] },
  { pos: [2.2, 0.2, -0.6],  scale: [0.15, 0.02, 0.05], rot: [-0.3, 0.8, 0.5] },
  { pos: [1.6, -1.2, -0.3], scale: [0.10, 0.02, 0.10], rot: [0.5, -0.4, 0.7] },
  { pos: [-1.4, 1.2, -0.5], scale: [0.14, 0.02, 0.06], rot: [-0.5, 0.3, -0.4] },
  { pos: [-1.9, -0.1, -0.4],scale: [0.11, 0.02, 0.09], rot: [0.2, -0.7, 0.3] },
  { pos: [-1.5, -1.3, -0.6],scale: [0.13, 0.02, 0.07], rot: [0.6, 0.5, -0.2] },
  { pos: [0.2, 1.8, -0.8],   scale: [0.09, 0.02, 0.09], rot: [-0.2, 0.9, 0.1] },
  { pos: [0.4, -1.8, -0.7],  scale: [0.12, 0.02, 0.06], rot: [0.7, -0.3, 0.6] },
]

// Section-by-section spatial state of the brain sculpture during page scroll
export const BRAIN_SECTION_STATES = {
  hero: {
    camera: { position: [0.15, 0.1, 4.8], lookAt: [0.35, 0.05, 0] },
    brain: {
      position: [1.1, 0.15, -0.6],
      scale: 1.0,
      rotY: 0.15,
      rotX: 0.08,
      intensity: 1.0,
    },
  },
  profile: {
    camera: { position: [0.08, -0.05, 4.6], lookAt: [0.25, -0.05, 0] },
    brain: {
      position: [0.95, 0.05, -0.5],
      scale: 1.05,
      rotY: 0.28,
      rotX: 0.12,
      intensity: 1.15,
    },
  },
  capabilities: {
    camera: { position: [-0.15, -0.15, 4.5], lookAt: [0.05, -0.15, 0] },
    brain: {
      position: [-0.65, -0.15, -0.4],
      scale: 1.08,
      rotY: -0.22,
      rotX: 0.06,
      intensity: 1.25,
    },
  },
  process: {
    camera: { position: [0.2, -0.1, 4.6], lookAt: [0.15, -0.1, 0] },
    brain: {
      position: [0.85, -0.1, -0.5],
      scale: 1.1,
      rotY: 0.35,
      rotX: 0.14,
      intensity: 1.3,
    },
  },
  toolkit: {
    camera: { position: [-0.1, 0.0, 4.5], lookAt: [0.05, 0.0, 0] },
    brain: {
      position: [-0.7, 0.05, -0.4],
      scale: 1.05,
      rotY: -0.3,
      rotX: 0.08,
      intensity: 1.2,
    },
  },
  work: {
    camera: { position: [0.0, 0.15, 4.4], lookAt: [0.0, 0.1, 0] },
    brain: {
      position: [0.0, 0.2, -0.3],
      scale: 1.18,
      rotY: 0.0,
      rotX: 0.1,
      intensity: 1.45,
    },
  },
  experience: {
    camera: { position: [0.15, -0.1, 4.7], lookAt: [0.25, -0.1, 0] },
    brain: {
      position: [0.8, -0.15, -0.5],
      scale: 1.0,
      rotY: 0.25,
      rotX: 0.06,
      intensity: 1.1,
    },
  },
  contact: {
    camera: { position: [0.0, 0.0, 4.9], lookAt: [0.15, 0.0, 0] },
    brain: {
      position: [0.6, 0.0, -0.6],
      scale: 0.95,
      rotY: 0.18,
      rotX: 0.04,
      intensity: 1.0,
    },
  },
}
