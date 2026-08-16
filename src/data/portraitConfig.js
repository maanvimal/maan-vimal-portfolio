// Vite collects approved portrait files from the canonical portrait folders.
// When the missing About PNG is copied into its folder, it will be picked up
// automatically on the next development/build refresh.
const portraitImages = import.meta.glob('../assets/portraits/*/phoenix-*.png', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const portraits = {
  about: {
    image: portraitImages['../assets/portraits/about/phoenix-about.png'] ?? null,
    expectedPath: 'src/assets/portraits/about/phoenix-about.png',
    alt: 'Phoenix in a relaxed seated pose, representing the human creator.',
    identity: 'Human / Creator',
  },
  coding: {
    image: portraitImages['../assets/portraits/coding/phoenix-coding.png'],
    expectedPath: 'src/assets/portraits/coding/phoenix-coding.png',
    alt: 'Phoenix wearing headphones and working on a laptop, representing the builder and coder.',
    identity: 'Builder / Coder',
  },
  mythos: {
    image: portraitImages['../assets/portraits/mythos/phoenix-mythos.png'],
    expectedPath: 'src/assets/portraits/mythos/phoenix-mythos.png',
    alt: 'Hooded Phoenix reading an ancient glowing book, representing the storyteller.',
    identity: 'Storyteller',
  },
  majestic: {
    image: portraitImages['../assets/portraits/majestic/phoenix-majestic.png'],
    expectedPath: 'src/assets/portraits/majestic/phoenix-majestic.png',
    alt: 'Phoenix painting a crowned dog portrait, representing the pet portrait artist and creator.',
    identity: 'Artist / Pet Portrait Creator',
  },
}

export function getPortrait(worldId) {
  return portraits[worldId]
}
