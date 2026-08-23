/**
 * Configuration and deterministic message datasets for Phoenix thought bubbles across all 4 worlds.
 */

export const WORLD_THOUGHT_MESSAGES = {
  about: [
    "Apparently I'm supposed to tell you about myself here.",
    "I spent years looking for myself. Turns out I was busy building.",
    "Everyone has a story. Mine just refuses to stay still.",
    "I make things. That's usually where the trouble begins.",
    "I have a strange habit of turning thoughts into projects.",
  ],
  coding: [
    "I love music. , Feel the Beat I designed It",
    "U can turn music and transition On and Off - DON'T ",
    "If it's repetitive, I'm probably already plotting against it.",
    "Yes, I made a system for that.",
    "Sometimes the easiest solution is just making the computer suffer instead.",
  ],
  mythos: [
    "Yo, check the drip, baby.",
    "Bro… I wish we could dress like this.",
    "Somewhere between history and fantasy, people really knew how to make an entrance.",
    "Imagine explaining this outfit to a tailor.",
    "I came for the mythology. Stayed for the wardrobe.",
  ],
  majestic: [
    "Look at him. He knows he's handsome.",
    "Ya i know i am creative ",
    "I may have taken the royal thing slightly too seriously.",
    "Every creature carries a story. I merely give it a throne. - BRANDING baby",
    "The legend was always there. I just gave it a face.",
  ],
}

export const THOUGHT_WORLD_CONFIG = {
  about: {
    originX: 40,
    originY: 35,
    maxDimensions: { width: '340px', maxWidth: '46vw' },
  },
  coding: {
    originX: 45,
    originY: 38,
    maxDimensions: { width: '360px', maxWidth: '48vw' },
  },
  mythos: {
    originX: 40,
    originY: 35,
    maxDimensions: { width: '340px', maxWidth: '46vw' },
  },
  majestic: {
    originX: 50,
    originY: 30,
    maxDimensions: { width: '290px', maxWidth: '42vw' },
  },
}

export function getThoughtConfig(worldId) {
  return THOUGHT_WORLD_CONFIG[worldId] || THOUGHT_WORLD_CONFIG.about
}

export function getThoughtMessage(worldId, visitCount) {
  const messages = WORLD_THOUGHT_MESSAGES[worldId] || WORLD_THOUGHT_MESSAGES.about
  const count = Math.max(1, visitCount || 1)
  const index = (count - 1) % messages.length
  return {
    message: messages[index],
    index,
    total: messages.length,
  }
}
