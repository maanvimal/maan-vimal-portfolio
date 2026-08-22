import { worlds } from './worldThemes.js'

// Each pair can receive its own choreography later. For now, every pair uses
// the same simple GSAP prototype, while keeping the future style named here.
export const transitionConfigs = {
  'about-to-coding': { style: 'about-coding-glitch' },
  'coding-to-about': { style: 'human-stabilization' },
  'coding-to-mythos': { style: 'coding-to-mythos-disintegration' },
  'mythos-to-coding': { style: 'digital-fragments' },
  'mythos-to-majestic': { style: 'ancient-luxury-particles' },
  'majestic-to-mythos': { style: 'majestic-to-mythos-black-hole' },
  'about-to-mythos': { style: 'about-to-mythos-disintegration' },
  'mythos-to-about': { style: 'human-stabilization' },
  'about-to-majestic': { style: 'gallery-reveal' },
  'majestic-to-about': { style: 'human-stabilization' },
  'coding-to-majestic': { style: 'digital-luxury-transform' },
  'majestic-to-coding': { style: 'luxury-digital-fragments' },
}

export function getTransitionConfig(fromWorld, toWorld) {
  return transitionConfigs[`${fromWorld}-to-${toWorld}`] ?? {
    style: 'simple-crossfade',
  }
}

export function getTransitionDirection(fromWorld, toWorld) {
  const fromIndex = worlds.findIndex((world) => world.id === fromWorld)
  const toIndex = worlds.findIndex((world) => world.id === toWorld)

  return toIndex > fromIndex ? 'forward' : 'backward'
}
