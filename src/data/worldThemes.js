// This is the single source of truth for each portfolio world.
// Add future world copy and visual tokens here instead of inside components.
export const worlds = [
  {
    id: 'about',
    name: 'About',
    identity: 'The Human',
    mood: 'Cinematic, intimate, thoughtful',
    description: 'A starting point for the story behind Phoenix.',
    colors: {
      background: '#1a1511',
      text: '#f5efe3',
      textMuted: '#c4b5a0',
      accent: '#d69a4a',
      surface: '#2a211a',
    },
  },
  {
    id: 'coding',
    name: 'Coding',
    identity: 'The Builder',
    mood: 'Digital, technical, energetic',
    description: 'A future world for projects, experiments, and craft.',
    colors: {
      background: '#0b0f0d',
      text: '#f4fff7',
      textMuted: '#a6b5aa',
      accent: '#48e27b',
      surface: '#18201b',
    },
  },
  {
    id: 'mythos',
    name: 'Mythos',
    identity: 'The Storyteller',
    mood: 'Ancient, mysterious, epic',
    description: 'A future world for the lore and ideas of Phoenix.',
    colors: {
      background: '#15120f',
      text: '#f0dfbf',
      textMuted: '#c1a87c',
      accent: '#e09b39',
      surface: '#282018',
    },
  },
  {
    id: 'majestic',
    name: 'Majestic',
    identity: 'The Creative Director',
    mood: 'Luxury, elegant, emotional',
    description: 'A future world for the portfolio’s grand finale.',
    colors: {
      background: '#f2e8d7',
      text: '#3c2618',
      textMuted: '#765b47',
      accent: '#bd862f',
      surface: '#fff8eb',
    },
  },
]

export function getWorld(worldId) {
  return worlds.find((world) => world.id === worldId) ?? worlds[0]
}
