import { useEffect, useRef, useState } from 'react'
import { BRAIN_SECTION_STATES } from '../data/aboutBrainConfig.js'

export function useAboutBrain() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Mutable reference read on every animation frame by R3F components without React re-render overhead
  const sceneStateRef = useRef({
    activeSection: 'hero',
    targetState: BRAIN_SECTION_STATES.hero,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    reducedMotion: false,
    isMobile: false,
  })

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e) => {
      setReducedMotion(e.matches)
      if (sceneStateRef.current) {
        sceneStateRef.current.reducedMotion = e.matches
      }
    }
    handleMotionChange(motionQuery)
    motionQuery.addEventListener('change', handleMotionChange)

    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (sceneStateRef.current) {
        sceneStateRef.current.isMobile = mobile
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    // Subtle mouse parallax tracking
    const handleMouseMove = (e) => {
      if (!sceneStateRef.current || sceneStateRef.current.reducedMotion || sceneStateRef.current.isMobile) return
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = -(e.clientY / window.innerHeight) * 2 + 1
      sceneStateRef.current.mouse.targetX = normX
      sceneStateRef.current.mouse.targetY = normY
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Section intersection tracking for environmental depth/perspective shifting
    const sectionElements = document.querySelectorAll('[data-about-section-id]')
    const observer = new IntersectionObserver(
      (entries) => {
        let topEntry = null
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topEntry || entry.intersectionRatio > topEntry.intersectionRatio) {
              topEntry = entry
            }
          }
        })

        if (topEntry && sceneStateRef.current) {
          const sectionId = topEntry.target.getAttribute('data-about-section-id')
          if (sectionId && BRAIN_SECTION_STATES[sectionId]) {
            sceneStateRef.current.activeSection = sectionId
            sceneStateRef.current.targetState = BRAIN_SECTION_STATES[sectionId]
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      },
    )

    sectionElements.forEach((el) => observer.observe(el))

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return {
    sceneStateRef,
    reducedMotion,
    isMobile,
  }
}

export default useAboutBrain
