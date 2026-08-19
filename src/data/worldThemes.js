// This is the single source of truth for each portfolio world.
// Add future world copy and visual tokens here instead of inside components.
export const worlds = [
  {
    id: 'about',
    name: 'About',
    identity: 'Prompt Engineer · AI Workflow Designer · Generative AI Creator',
    mood: 'Personal, elegant, rich metallic gold',
    description: 'A starting point for the story behind Phoenix.',
    colors: {
      background: '#080808',
      text: '#F5F4F0',
      textMuted: '#9E9D98',
      accent: '#D6A84F',
      surface: '#111111',
    },
  },
  {
    id: 'coding',
    name: 'Coding',
    identity: 'AI Workflow Designer · Developer · Creative Technologist',
    mood: 'Digital, technical, energetic',
    description: 'Systems engineering, software architecture, and AI production pipelines.',
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
    identity: 'Cinematic Mythology · World Building · Generative Film Craft',
    mood: 'Ancient, atmospheric, bronze and ember',
    description: 'Cinematic storytelling, world-building lore, and AI video production pipelines.',
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
    identity: 'Pet Portrait Artist · Creative Director · Brand Builder',
    mood: 'Pitch black void, warm champagne atmosphere, antique gold',
    description: 'Bespoke pet portraiture, visual character storytelling, and creative direction.',
    colors: {
      background: '#000000',
      text: '#F5EBD4',
      textMuted: '#A89980',
      accent: '#D8B978',
      secondary: '#C4AE7A',
      surface: '#070605',
    },
  },
]

export function getWorld(worldId) {
  return worlds.find((world) => world.id === worldId) ?? worlds[0]
}
