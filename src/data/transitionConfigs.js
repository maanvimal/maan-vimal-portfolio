import { worlds } from './worldThemes.js'

// Each pair can receive its own choreography later. For now, every pair uses
// the same simple GSAP prototype, while keeping the future style named here.
export const transitionConfigs = {
  'about-to-coding': { style: 'about-coding-glitch' },
  'coding-to-about': { style: 'human-stabilization' },
  'coding-to-mythos': { style: 'digital-collapse' },
  'mythos-to-coding': { style: 'digital-fragments' },
  'mythos-to-majestic': { style: 'ancient-luxury-particles' },
  'majestic-to-mythos': { style: 'luxury-awakening' },
  'about-to-mythos': { style: 'human-ancient-dissolve' },
  'mythos-to-about': { style: 'ancient-human-dissolve' },
  'about-to-majestic': { style: 'warm-luxury-dissolve' },
  'majestic-to-about': { style: 'luxury-human-dissolve' },
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
