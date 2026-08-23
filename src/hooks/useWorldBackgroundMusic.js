import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const WORLD_MUSIC_CONFIG = {
  about: {
    src: '/audio/music/about.mp3',
    volume: 0.25,
    fadeInDuration: 1.5,
    fadeOutDuration: 0.8,
  },
  coding: {
    src: '/audio/music/coding.mp3',
    volume: 0.22,
    fadeInDuration: 1.5,
    fadeOutDuration: 0.8,
  },
  mythos: {
    src: '/audio/music/mythos.mp3',
    volume: 0.25,
    fadeInDuration: 1.8,
    fadeOutDuration: 0.8,
  },
  majestic: {
    src: '/audio/music/majestic.mp3',
    volume: 0.25,
    fadeInDuration: 1.6,
    fadeOutDuration: 0.8,
  },
}

/**
 * Custom hook for world background music.
 * Manages playback, smooth fade-in/fade-out, autoplay restrictions,
 * and lifecycle coordination with world transitions.
 *
 * @param {Object} params
 * @param {string} params.currentWorld - Currently active world ('about' | 'coding' | 'mythos' | 'majestic')
 * @param {boolean} params.isTransitioning - Whether a transition is currently in progress
 */
export function useWorldBackgroundMusic({ currentWorld, isTransitioning, isMusicEnabled = true }) {
  // References to active audio instances to ensure zero memory leaks or duplicates
  const currentAudioRef = useRef(null) // { worldId, audio, tween }
  const fadingAudiosRef = useRef([]) // array of { audio, tween }
  const userInteractedRef = useRef(false)
  const pendingWorldRef = useRef(null)

  // Safely stop and dispose of an audio instance
  const disposeAudio = (audioObj) => {
    if (!audioObj) return
    const { audio, tween } = audioObj
    if (tween) {
      tween.kill()
    }
    if (audio) {
      gsap.killTweensOf(audio)
      try {
        audio.pause()
        audio.src = ''
      } catch {
        // Ignore any errors during audio cleanup
      }
    }
  }

  // Smoothly fade out and dispose of an audio instance
  const fadeOutAndDispose = (audioObj, duration = 0.8) => {
    if (!audioObj || !audioObj.audio) return
    const { audio } = audioObj
    gsap.killTweensOf(audio)

    const tween = gsap.to(audio, {
      volume: 0,
      duration,
      ease: 'power1.out',
      onComplete: () => {
        try {
          audio.pause()
          audio.src = ''
        } catch {
          // Ignore
        }
        // Remove from fadingAudios list
        fadingAudiosRef.current = fadingAudiosRef.current.filter((item) => item.audio !== audio)
      },
    })

    fadingAudiosRef.current.push({ audio, tween })
  }

  // Effect to manage music playback and fades
  useEffect(() => {
    if (typeof Audio === 'undefined') return

    // If music is globally disabled -> fade out any currently active audio and return
    if (!isMusicEnabled) {
      if (currentAudioRef.current) {
        const prev = currentAudioRef.current
        currentAudioRef.current = null
        fadeOutAndDispose(prev, prev.worldId ? (WORLD_MUSIC_CONFIG[prev.worldId]?.fadeOutDuration ?? 0.8) : 0.8)
      }
      return
    }

    const config = WORLD_MUSIC_CONFIG[currentWorld]
    if (!config) return

    // Scenario 1: Transition just started -> fade out currently playing audio
    if (isTransitioning) {
      if (currentAudioRef.current) {
        const prev = currentAudioRef.current
        currentAudioRef.current = null
        fadeOutAndDispose(prev, prev.worldId ? (WORLD_MUSIC_CONFIG[prev.worldId]?.fadeOutDuration ?? 0.8) : 0.8)
      }
      return
    }

    // Scenario 2: Transition is NOT active, world is active.
    // If the active audio is already playing for this exact world, do not duplicate
    if (currentAudioRef.current && currentAudioRef.current.worldId === currentWorld) {
      return
    }

    // If an audio was playing for a previous world, fade it out
    if (currentAudioRef.current) {
      const prev = currentAudioRef.current
      currentAudioRef.current = null
      fadeOutAndDispose(prev, prev.worldId ? (WORLD_MUSIC_CONFIG[prev.worldId]?.fadeOutDuration ?? 0.8) : 0.8)
    }

    // Create and initialize new Audio instance for current world
    const audio = new Audio(config.src)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'

    const audioEntry = {
      worldId: currentWorld,
      audio,
      tween: null,
    }
    currentAudioRef.current = audioEntry

    const startPlayback = () => {
      if (currentAudioRef.current !== audioEntry) return

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            userInteractedRef.current = true
            pendingWorldRef.current = null
            // Smooth fade-in
            if (currentAudioRef.current === audioEntry) {
              gsap.killTweensOf(audio)
              audioEntry.tween = gsap.to(audio, {
                volume: config.volume,
                duration: config.fadeInDuration,
                ease: 'power1.out',
              })
            }
          })
          .catch(() => {
            // Autoplay blocked by browser policy — wait for first user gesture
            pendingWorldRef.current = currentWorld

            const handleFirstInteraction = () => {
              window.removeEventListener('pointerdown', handleFirstInteraction)
              window.removeEventListener('keydown', handleFirstInteraction)
              window.removeEventListener('touchstart', handleFirstInteraction)

              userInteractedRef.current = true

              if (
                currentAudioRef.current &&
                currentAudioRef.current.audio === audio &&
                !isTransitioning
              ) {
                audio
                  .play()
                  .then(() => {
                    gsap.killTweensOf(audio)
                    audioEntry.tween = gsap.to(audio, {
                      volume: config.volume,
                      duration: config.fadeInDuration,
                      ease: 'power1.out',
                    })
                  })
                  .catch(() => {})
              }
            }

            window.addEventListener('pointerdown', handleFirstInteraction, {
              once: true,
              passive: true,
            })
            window.addEventListener('keydown', handleFirstInteraction, {
              once: true,
              passive: true,
            })
            window.addEventListener('touchstart', handleFirstInteraction, {
              once: true,
              passive: true,
            })
          })
      }
    }

    startPlayback()
  }, [currentWorld, isTransitioning, isMusicEnabled])

  // Global unmount cleanup
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        disposeAudio(currentAudioRef.current)
        currentAudioRef.current = null
      }
      fadingAudiosRef.current.forEach((item) => disposeAudio(item))
      fadingAudiosRef.current = []
    }
  }, [])
}

export default useWorldBackgroundMusic
