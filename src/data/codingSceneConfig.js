// Configuration for "THE SYSTEM" — Coding 3D Spatial Network

export const CODING_THEME = {
  primaryGreen: '#39FF72',
  brightGreen: '#66ff94',
  dimGreen: '#184e2a',
  faintGreen: '#0d2816',
  darkSurface: '#0c120e',
  backgroundBlack: '#050706',
  wireframeGreen: 'rgba(57, 255, 114, 0.4)',
}

// 8 Conceptual spatial nodes surrounding the Core
export const SCENE_NODES = [
  {
    id: 'system',
    label: 'SYS_ARCH',
    code: '01',
    position: [0.0, 2.0, -0.3],
    shape: 'octahedron',
    size: 0.14,
  },
  {
    id: 'ai',
    label: 'AI_CORE',
    code: '02',
    position: [1.9, 1.2, 0.3],
    shape: 'icosahedron',
    size: 0.16,
  },
  {
    id: 'prompt',
    label: 'PROMPT',
    code: '03',
    position: [2.5, -0.2, -0.4],
    shape: 'tetrahedron',
    size: 0.13,
  },
  {
    id: 'workflow',
    label: 'WORKFLOW',
    code: '04',
    position: [1.5, -1.3, 0.4],
    shape: 'box',
    size: 0.14,
  },
  {
    id: 'output',
    label: 'OUTPUT',
    code: '05',
    position: [0.0, -2.1, 0.2],
    shape: 'octahedron',
    size: 0.15,
  },
  {
    id: 'media',
    label: 'MEDIA',
    code: '06',
    position: [-1.4, -1.4, -0.4],
    shape: 'dodecahedron',
    size: 0.14,
  },
  {
    id: 'data',
    label: 'DATA_VAL',
    code: '07',
    position: [-2.3, -0.1, 0.4],
    shape: 'icosahedron',
    size: 0.15,
  },
  {
    id: 'code',
    label: 'CODE_ENG',
    code: '08',
    position: [-1.7, 1.3, -0.3],
    shape: 'box',
    size: 0.15,
  },
]

// 12 Controlled connection edges between nodes
export const SCENE_CONNECTIONS = [
  { from: 'system', to: 'ai' },       // 0
  { from: 'system', to: 'code' },     // 1
  { from: 'prompt', to: 'ai' },       // 2
  { from: 'ai', to: 'code' },         // 3
  { from: 'data', to: 'ai' },         // 4
  { from: 'data', to: 'code' },       // 5
  { from: 'code', to: 'workflow' },   // 6
  { from: 'workflow', to: 'output' }, // 7
  { from: 'media', to: 'workflow' },  // 8
  { from: 'media', to: 'output' },    // 9
  { from: 'system', to: 'prompt' },   // 10
  { from: 'data', to: 'media' },      // 11
]

// Target scene states mapped to Coding content sections
export const SECTION_STATES = {
  hero: {
    core: { position: [1.1, 0.2, 0], scale: 0.9, rotSpeed: 0.003, emission: 0.35 },
    activeNodes: ['system', 'ai'],
    activeConnections: [0],
    camera: { position: [0, 0, 5.4], lookAt: [0.3, 0, 0] },
    packetCount: 3,
    packetSpeed: 0.35,
  },
  profile: {
    core: { position: [1.4, 0.1, 0.2], scale: 1.0, rotSpeed: 0.005, emission: 0.6 },
    activeNodes: ['system', 'code', 'data', 'ai'],
    activeConnections: [0, 1, 3, 5],
    camera: { position: [0.2, 0, 5.1], lookAt: [0.5, 0, 0] },
    packetCount: 5,
    packetSpeed: 0.5,
  },
  capabilities: {
    core: { position: [-1.1, 0.3, 0.1], scale: 1.05, rotSpeed: 0.0065, emission: 0.75 },
    activeNodes: ['ai', 'code', 'workflow', 'media', 'data'],
    activeConnections: [2, 3, 6, 8, 11],
    camera: { position: [-0.25, 0.1, 4.9], lookAt: [-0.35, 0.1, 0] },
    packetCount: 7,
    packetSpeed: 0.65,
  },
  process: {
    // Pipeline sequence: DEFINE -> ARCHITECT -> BUILD -> TEST -> ITERATE -> SHIP
    core: { position: [0.2, -0.2, 0.3], scale: 1.1, rotSpeed: 0.008, emission: 0.85 },
    activeNodes: ['system', 'prompt', 'ai', 'code', 'workflow', 'output'],
    activeConnections: [0, 2, 3, 6, 7, 10],
    camera: { position: [0.1, -0.1, 4.8], lookAt: [0.1, -0.1, 0] },
    packetCount: 8,
    packetSpeed: 0.8,
  },
  stack: {
    core: { position: [-1.2, 0.0, 0], scale: 1.05, rotSpeed: 0.006, emission: 0.7 },
    activeNodes: ['code', 'data', 'workflow', 'system'],
    activeConnections: [1, 5, 6, 7],
    camera: { position: [-0.3, 0, 5.0], lookAt: [-0.4, 0, 0] },
    packetCount: 6,
    packetSpeed: 0.6,
  },
  projects: {
    core: { position: [1.2, 0.2, 0.3], scale: 1.15, rotSpeed: 0.0075, emission: 0.9 },
    activeNodes: ['ai', 'code', 'media', 'workflow', 'output'],
    activeConnections: [3, 6, 7, 8, 9],
    camera: { position: [0.25, 0.1, 4.8], lookAt: [0.35, 0.1, 0] },
    packetCount: 8,
    packetSpeed: 0.75,
  },
  'ai-dev': {
    core: { position: [0.0, 0.2, 0.4], scale: 1.2, rotSpeed: 0.009, emission: 1.0 },
    activeNodes: ['ai', 'code', 'prompt', 'system'],
    activeConnections: [0, 1, 2, 3, 4],
    camera: { position: [0, 0.1, 4.7], lookAt: [0, 0.1, 0] },
    packetCount: 9,
    packetSpeed: 0.9,
  },
  architecture: {
    core: { position: [0.0, 0.0, 0.2], scale: 1.25, rotSpeed: 0.01, emission: 1.0 },
    activeNodes: ['system', 'ai', 'prompt', 'workflow', 'output', 'media', 'data', 'code'],
    activeConnections: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    camera: { position: [0, 0, 4.6], lookAt: [0, 0, 0] },
    packetCount: 11,
    packetSpeed: 0.85,
  },
  contact: {
    core: { position: [0.0, 0.0, 0], scale: 0.85, rotSpeed: 0.003, emission: 0.4 },
    activeNodes: ['system', 'output'],
    activeConnections: [7],
    camera: { position: [0, 0, 5.4], lookAt: [0, 0, 0] },
    packetCount: 2,
    packetSpeed: 0.35,
  },
}
