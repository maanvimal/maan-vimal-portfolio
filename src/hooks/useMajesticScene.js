import { useEffect, useRef, useState } from 'react'
import { SECTION_STATES } from '../data/majesticSceneConfig.js'

export function useMajesticScene() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Mutable reference read inside useFrame on every render tick with zero React re-render overhead
  const sceneStateRef = useRef({
    activeSection: 'hero',
    targetState: SECTION_STATES.hero,
    scrollProgress: 0,
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

    // Gentle mouse parallax tracking
    const handleMouseMove = (e) => {
      if (!sceneStateRef.current || sceneStateRef.current.reducedMotion || sceneStateRef.current.isMobile) return
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = -(e.clientY / window.innerHeight) * 2 + 1
      sceneStateRef.current.mouse.targetX = normX
      sceneStateRef.current.mouse.targetY = normY
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Robust Section & Progress Scroll Tracking
    const handleScroll = () => {
      if (!sceneStateRef.current) return

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0
      sceneStateRef.current.scrollProgress = currentProgress

      const centerY = window.innerHeight * 0.45

      // Check Hero first
      const heroEl = document.querySelector('.majestic-hero')
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect()
        if (heroRect.bottom > centerY) {
          sceneStateRef.current.activeSection = 'hero'
          sceneStateRef.current.targetState = SECTION_STATES.hero
          return
        }
      }

      // Check sections inside .majestic-world__sections
      const sectionEls = Array.from(document.querySelectorAll('.majestic-world__sections section'))
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
        // Find specific class that is NOT majestic-section (e.g. majestic-studio, majestic-philosophy, majestic-create)
        const specificClass = classes.find((c) => c.startsWith('majestic-') && c !== 'majestic-section')
        const sectionId = specificClass ? specificClass.replace('majestic-', '') : 'hero'
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

export default useMajesticScene
