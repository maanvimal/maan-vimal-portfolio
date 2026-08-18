import { useEffect, useRef, useState } from 'react'
import { SECTION_STATES } from '../data/mythosSceneConfig.js'

export function useMythosScene() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Mutable reference read inside useFrame on every render tick with zero React re-render overhead
  const sceneStateRef = useRef({
    activeSection: 'hero',
    targetState: SECTION_STATES.hero,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    reducedMotion: false,
    isMobile: false,
    isTablet: false,
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
      const width = window.innerWidth
      const mobile = width < 768
      const tablet = width >= 768 && width < 1024
      setIsMobile(mobile)
      setIsTablet(tablet)
      if (sceneStateRef.current) {
        sceneStateRef.current.isMobile = mobile
        sceneStateRef.current.isTablet = tablet
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    // Mouse parallax tracking
    const handleMouseMove = (e) => {
      if (!sceneStateRef.current || sceneStateRef.current.reducedMotion || sceneStateRef.current.isMobile) return
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = -(e.clientY / window.innerHeight) * 2 + 1
      sceneStateRef.current.mouse.targetX = normX
      sceneStateRef.current.mouse.targetY = normY
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Bulletproof Section Scroll Tracking
    const handleScroll = () => {
      if (!sceneStateRef.current) return

      const centerY = window.innerHeight * 0.45

      // Check Hero first
      const heroEl = document.querySelector('.mythos-hero')
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect()
        if (heroRect.bottom > centerY) {
          sceneStateRef.current.activeSection = 'hero'
          sceneStateRef.current.targetState = SECTION_STATES.hero
          return
        }
      }

      // Check sections inside .mythos-world__sections
      const sectionEls = Array.from(document.querySelectorAll('.mythos-world__sections section'))
      let matchedSection = null

      for (let i = 0; i < sectionEls.length; i++) {
        const rect = sectionEls[i].getBoundingClientRect()
        if (rect.top <= centerY && rect.bottom > centerY) {
          matchedSection = sectionEls[i]
          break
        }
      }

      if (!matchedSection && sectionEls.length > 0) {
        const lastRect = sectionEls[sectionEls.length - 1].getBoundingClientRect()
        if (lastRect.top < centerY) {
          matchedSection = sectionEls[sectionEls.length - 1]
        }
      }

      if (matchedSection) {
        const classes = Array.from(matchedSection.classList)
        // Find specific class that is NOT mythos-section (e.g. mythos-project, mythos-story-engine)
        const specificClass = classes.find((c) => c.startsWith('mythos-') && c !== 'mythos-section')
        const sectionId = specificClass ? specificClass.replace('mythos-', '') : 'hero'
        if (SECTION_STATES[sectionId]) {
          sceneStateRef.current.activeSection = sectionId
          sceneStateRef.current.targetState = SECTION_STATES[sectionId]
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    sceneStateRef,
    reducedMotion,
    isMobile,
    isTablet,
  }
}

export default useMythosScene
