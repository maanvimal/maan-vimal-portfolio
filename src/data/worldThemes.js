// This is the single source of truth for each portfolio world.
// Add future world copy and visual tokens here instead of inside components.
export const worlds = [
  {
    id: 'about',
    name: 'About',
    identity: 'Prompt Engineer · AI Workflow Designer · Generative AI Creator',
    mood: 'Personal, elegant, warm amber',
    description: 'A starting point for the story behind Phoenix.',
    colors: {
      background: '#090807',
      text: '#F3EEE5',
      textMuted: '#A9A095',
      accent: '#C8923E',
      surface: '#171310',
    },
  },
  {
    id: 'coding',
    name: 'Coding',
    identity: 'Builder / Coder',
    mood: 'Digital, technical, energetic',
    description: 'A future world for projects, experiments, and craft.',
    colors: {
      background: '#050706',
      text: '#F1F5F2',
      textMuted: '#87928A',
      accent: '#39FF72',
      surface: '#0C120E',
    },
  },
  {
    id: 'mythos',
    name: 'Mythos',
    identity: 'Storyteller',
    mood: 'Ancient, atmospheric, bronze and ember',
    description: 'A future world for the lore and ideas of Phoenix.',
    colors: {
      background: '#090807',
      text: '#E7D7B8',
      textMuted: '#9B8A70',
      accent: '#A96B35',
      surface: '#17120E',
    },
  },
  {
    id: 'majestic',
    name: 'Majestic',
    identity: 'Artist / Pet Portrait Creator',
    mood: 'Warm, elegant, emotional',
    description: 'A future world for the portfolio’s grand finale.',
    colors: {
      background: '#11100E',
      text: '#F5F0E7',
      textMuted: '#A9A096',
      accent: '#D6B56D',
      surface: '#1D1915',
    },
  },
]

export function getWorld(worldId) {
  return worlds.find((world) => world.id === worldId) ?? worlds[0]
}
