import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import AboutMythosParticleEngine from './transitions/AboutMythosDisintegration.js'

function clearCopies(elements) {
  elements.forEach((element) => {
    if (element) {
      element.replaceChildren()
    }
  })
}

function addWorldCopy(container, worldElement) {
  const copy = worldElement.cloneNode(true)
  copy.classList.add('world-copy')
  copy.setAttribute('aria-hidden', 'true')
  container.append(copy)
}

// 14 Irregular horizontal slice configurations for approved About -> Coding
const SLICES_CONFIG = [
  { id: 1,  class: 'slice--1',  dir: 1,  offset: 48,  dur: 0.22, delay: 0.00 },
  { id: 2,  class: 'slice--2',  dir: -1, offset: -64, dur: 0.26, delay: 0.02 },
  { id: 3,  class: 'slice--3',  dir: 1,  offset: 92,  dur: 0.24, delay: 0.04 },
  { id: 4,  class: 'slice--4',  dir: -1, offset: -42, dur: 0.20, delay: 0.01 },
  { id: 5,  class: 'slice--5',  dir: 1,  offset: 110, dur: 0.28, delay: 0.05 },
  { id: 6,  class: 'slice--6',  dir: -1, offset: -85, dur: 0.25, delay: 0.03 },
  { id: 7,  class: 'slice--7',  dir: 1,  offset: 58,  dur: 0.22, delay: 0.02 },
  { id: 8,  class: 'slice--8',  dir: -1, offset: -120,dur: 0.29, delay: 0.06 },
  { id: 9,  class: 'slice--9',  dir: 1,  offset: 75,  dur: 0.23, delay: 0.04 },
  { id: 10, class: 'slice--10', dir: -1, offset: -50, dur: 0.21, delay: 0.01 },
  { id: 11, class: 'slice--11', dir: 1,  offset: 95,  dur: 0.27, delay: 0.05 },
  { id: 12, class: 'slice--12', dir: -1, offset: -70, dur: 0.24, delay: 0.03 },
  { id: 13, class: 'slice--13', dir: 1,  offset: 52,  dur: 0.22, delay: 0.02 },
  { id: 14, class: 'slice--14', dir: -1, offset: -135,dur: 0.30, delay: 0.07 },
]

// Gold/Amber directional signal particles for approved About -> Coding
const GOLD_SIGNALS_CONFIG = [
  { top: '16%', left: '15%', width: '38px', height: '2px', xSweep: 140 },
  { top: '22%', left: '45%', width: '54px', height: '3px', xSweep: 220 },
  { top: '28%', left: '72%', width: '32px', height: '2px', xSweep: 180 },
  { top: '35%', left: '10%', width: '60px', height: '2px', xSweep: 260 },
  { top: '42%', left: '55%', width: '45px', height: '3px', xSweep: 190 },
  { top: '48%', left: '25%', width: '70px', height: '2px', xSweep: 280 },
  { top: '55%', left: '68%', width: '36px', height: '2px', xSweep: 160 },
  { top: '62%', left: '18%', width: '58px', height: '3px', xSweep: 240 },
  { top: '68%', left: '42%', width: '48px', height: '2px', xSweep: 210 },
  { top: '75%', left: '78%', width: '64px', height: '2px', xSweep: 250 },
  { top: '82%', left: '22%', width: '40px', height: '3px', xSweep: 170 },
  { top: '88%', left: '50%', width: '52px', height: '2px', xSweep: 230 },
]

// Green digital emergence signals for approved About -> Coding
const GREEN_SIGNALS_CONFIG = [
  { top: '20%', left: '0%', width: '45%', height: '2px' },
  { top: '32%', right: '0%', width: '55%', height: '2px' },
  { top: '44%', left: '0%', width: '60%', height: '3px' },
  { top: '56%', right: '0%', width: '48%', height: '2px' },
  { top: '68%', left: '0%', width: '52%', height: '2px' },
  { top: '80%', right: '0%', width: '40%', height: '3px' },
  { top: '38%', left: '20%', width: '65%', height: '1px' },
  { top: '62%', left: '10%', width: '70%', height: '2px' },
]

// Source-Specific Collapse Signal Particles for * -> Coding
const MYTHOS_COLLAPSE_SIGNALS = [
  { bg: '#1A0D08', glow: 'none' },
  { bg: '#3A1C0D', glow: '0 0 10px rgba(58, 28, 13, 0.6)' },
  { bg: '#6B3215', glow: '0 0 12px rgba(107, 50, 21, 0.7)' },
  { bg: '#9A4D1D', glow: '0 0 14px rgba(154, 77, 29, 0.8), 0 0 22px rgba(107, 50, 21, 0.5)' },
  { bg: '#C96F2A', glow: '0 0 16px rgba(201, 111, 42, 0.85), 0 0 24px rgba(154, 77, 29, 0.6)' },
]

const MAJESTIC_COLLAPSE_SIGNALS = [
  { bg: '#000000', glow: 'none' },
  { bg: '#80632E', glow: '0 0 12px rgba(128, 99, 46, 0.7)' },
  { bg: '#C19A52', glow: '0 0 14px rgba(193, 154, 82, 0.85), 0 0 24px rgba(128, 99, 46, 0.6)' },
  { bg: '#D8B978', glow: '0 0 14px rgba(216, 185, 120, 0.8), 0 0 22px rgba(193, 154, 82, 0.5)' },
  { bg: '#F7E6B5', glow: '0 0 16px rgba(247, 230, 181, 0.9), 0 0 26px rgba(216, 185, 120, 0.6)' },
]

const ABOUT_COLLAPSE_SIGNALS = [
  { bg: '#dfb15b', glow: '0 0 14px rgba(223, 177, 91, 0.8), 0 0 24px rgba(214, 168, 79, 0.5)' },
  { bg: '#d8c18a', glow: '0 0 14px rgba(216, 193, 138, 0.8), 0 0 22px rgba(223, 177, 91, 0.5)' },
]

// Lightweight zero-allocation 2D canvas collapse engine for Mythos/Coding -> Majestic
class GalleryCollapseEngine {
  constructor(canvas, sourceWorld) {
    this.canvas = canvas
    this.sourceWorld = sourceWorld
    this.ctx = canvas.getContext('2d', { alpha: true })
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.count = 220

    this.x = new Float32Array(this.count)
    this.y = new Float32Array(this.count)
    this.vx = new Float32Array(this.count)
    this.vy = new Float32Array(this.count)
    this.size = new Float32Array(this.count)
    this.r = new Float32Array(this.count)
    this.g = new Float32Array(this.count)
    this.b = new Float32Array(this.count)
    this.targetR = new Float32Array(this.count)
    this.targetG = new Float32Array(this.count)
    this.targetB = new Float32Array(this.count)
    this.delay = new Float32Array(this.count)

    this.resize()
    this.init()
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = Math.floor(this.width * this.dpr)
    this.canvas.height = Math.floor(this.height * this.dpr)
    this.canvas.style.width = `${this.width}px`
    this.canvas.style.height = `${this.height}px`
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  }

  init() {
    const isMythos = this.sourceWorld === 'mythos'
    const mythosPalette = [
      [26, 13, 8],     // #1A0D08
      [58, 28, 13],    // #3A1C0D
      [107, 50, 21],   // #6B3215
      [154, 77, 29],   // #9A4D1D
      [201, 111, 42],  // #C96F2A
    ]
    const codingPalette = [
      [0, 0, 0],       // #000000
      [3, 26, 16],     // #031A10
      [6, 61, 37],     // #063D25
      [10, 90, 53],    // #0A5A35
      [20, 122, 74],   // #147A4A
      [57, 169, 107],  // #39A96B
    ]

    for (let i = 0; i < this.count; i++) {
      this.x[i] = Math.random() * this.width
      this.y[i] = Math.random() * this.height
      this.size[i] = 1.2 + Math.random() * 2.8

      const angle = Math.random() * Math.PI * 2
      const speed = 15 + Math.random() * 45
      this.vx[i] = Math.cos(angle) * speed
      this.vy[i] = Math.sin(angle) * speed
      this.delay[i] = Math.random() * 0.25

      if (isMythos) {
        const c = mythosPalette[Math.floor(Math.random() * mythosPalette.length)]
        this.r[i] = c[0]
        this.g[i] = c[1]
        this.b[i] = c[2]
        this.targetR[i] = 26 * Math.random()
        this.targetG[i] = 13 * Math.random()
        this.targetB[i] = 8 * Math.random()
      } else {
        const c = codingPalette[Math.floor(Math.random() * codingPalette.length)]
        this.r[i] = c[0]
        this.g[i] = c[1]
        this.b[i] = c[2]
        this.targetR[i] = 0
        this.targetG[i] = 12 * Math.random()
        this.targetB[i] = 6 * Math.random()
      }
    }
  }

  render(progress) {
    const { ctx, width, height } = this
    ctx.clearRect(0, 0, width, height)

    if (progress >= 0.98) return

    for (let i = 0; i < this.count; i++) {
      if (progress < this.delay[i]) continue
      const localT = (progress - this.delay[i]) / (1.0 - this.delay[i])
      const easeT = Math.min(1, Math.max(0, localT))

      const px = this.x[i] + this.vx[i] * easeT
      const py = this.y[i] + this.vy[i] * easeT

      const curR = (this.r[i] + (this.targetR[i] - this.r[i]) * easeT) | 0
      const curG = (this.g[i] + (this.targetG[i] - this.g[i]) * easeT) | 0
      const curB = (this.b[i] + (this.targetB[i] - this.b[i]) * easeT) | 0

      const alpha = Math.max(0, (1 - easeT * 1.15)) * 0.95
      if (alpha <= 0.01) continue

      ctx.fillStyle = `rgba(${curR}, ${curG}, ${curB}, ${alpha})`
      ctx.fillRect(px, py, this.size[i], this.size[i])
    }
  }

  destroy() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height)
    }
  }
}

function WorldTransition({
  fromWorld,
  toWorld,
  transitionState,
  transitionDirection,
  transitionConfig,
  worldElementRef,
  onSwapWorld,
  onTransitionComplete,
}) {
  const overlayRef = useRef(null)

  // Refs for approved About -> Coding
  const sliceRefs = useRef([])
  const ghostRefs = useRef([])
  const goldSignalRefs = useRef([])
  const greenSignalRefs = useRef([])
  const scanlineRef = useRef(null)
  const codeBeamRef = useRef(null)

  // Refs for physical Coding -> About compression & moving heartbeat
  const topHalfRef = useRef(null)
  const bottomHalfRef = useRef(null)
  const topContentRef = useRef(null)
  const bottomContentRef = useRef(null)
  const lineWrapRef = useRef(null)
  const greenLineRef = useRef(null)
  const goldLineRef = useRef(null)
  const heartbeatRunnerRef = useRef(null)

  // Refs for About -> Mythos Disintegration & Big Bang Particle Engine
  const disintegrationCopyRef = useRef(null)
  const disintegrationCanvasRef = useRef(null)
  const particleEngineRef = useRef(null)

  // Refs for About -> Majestic The Gallery Reveal
  const galleryWarmthRef = useRef(null)
  const galleryCopyRef = useRef(null)
  const galleryCanvasRef = useRef(null)
  const galleryWrapRef = useRef(null)
  const galleryStrokeRef = useRef(null)
  const galleryStrokePathRef = useRef(null)
  const galleryTipRef = useRef(null)
  const galleryMoldingRef = useRef(null)
  const galleryApertureRef = useRef(null)
  const galleryPuppyRef = useRef(null)

  // Ref for Majestic -> Mythos transition SFX
  const majesticToMythosAudioRef = useRef(null)

  // Ref for Universal -> Majestic Gallery Reveal SFX (About/Mythos/Coding -> Majestic)
  const majesticRevealAudioRef = useRef(null)

  // Cleanup audio instances on component unmount
  useEffect(() => {
    return () => {
      if (majesticToMythosAudioRef.current) {
        majesticToMythosAudioRef.current.pause()
        majesticToMythosAudioRef.current.src = ''
        majesticToMythosAudioRef.current = null
      }
      if (majesticRevealAudioRef.current) {
        majesticRevealAudioRef.current.pause()
        majesticRevealAudioRef.current.src = ''
        majesticRevealAudioRef.current = null
      }
    }
  }, [])

  // Transition Style Identifiers
  const isToCoding =
    (toWorld === 'coding' && (fromWorld === 'about' || fromWorld === 'mythos' || fromWorld === 'majestic')) ||
    transitionConfig?.style === 'about-coding-glitch' ||
    transitionConfig?.style === 'digital-fragments' ||
    transitionConfig?.style === 'luxury-digital-fragments'
  const isHumanStabilization =
    transitionConfig?.style === 'human-stabilization' ||
    (fromWorld === 'coding' && toWorld === 'about') ||
    (fromWorld === 'mythos' && toWorld === 'about') ||
    (fromWorld === 'majestic' && toWorld === 'about')
  const isToMythosDisintegration =
    (fromWorld === 'about' && toWorld === 'mythos') ||
    (fromWorld === 'coding' && toWorld === 'mythos') ||
    (fromWorld === 'majestic' && toWorld === 'mythos') ||
    transitionConfig?.style === 'about-to-mythos-disintegration' ||
    transitionConfig?.style === 'coding-to-mythos-disintegration' ||
    transitionConfig?.style === 'majestic-to-mythos-black-hole'
  const isToMajestic =
    (toWorld === 'majestic' && (fromWorld === 'about' || fromWorld === 'coding' || fromWorld === 'mythos')) ||
    transitionConfig?.style === 'gallery-reveal' ||
    transitionConfig?.style === 'ancient-luxury-particles' ||
    transitionConfig?.style === 'digital-luxury-transform' ||
    transitionConfig?.style === 'about-to-majestic-gallery-reveal' ||
    transitionConfig?.style === 'warm-luxury-dissolve'
  const isRunning = transitionState === 'running'

  useLayoutEffect(() => {
    if (
      !isRunning ||
      !fromWorld ||
      !toWorld ||
      !worldElementRef.current
    ) {
      return undefined
    }

    const worldElement = worldElementRef.current
    const overlay = overlayRef.current

    // About -> Coding elements
    const slices = sliceRefs.current.filter(Boolean)
    const ghosts = ghostRefs.current.filter(Boolean)
    const goldSignals = goldSignalRefs.current.filter(Boolean)
    const greenSignals = greenSignalRefs.current.filter(Boolean)
    const scanline = scanlineRef.current
    const codeBeam = codeBeamRef.current

    // Coding -> About elements
    const topHalf = topHalfRef.current
    const bottomHalf = bottomHalfRef.current
    const topContent = topContentRef.current
    const bottomContent = bottomContentRef.current
    const lineWrap = lineWrapRef.current
    const greenLine = greenLineRef.current
    const goldLine = goldLineRef.current
    const heartbeatRunner = heartbeatRunnerRef.current

    // About -> Mythos elements
    const disintegrationCopy = disintegrationCopyRef.current
    const disintegrationCanvas = disintegrationCanvasRef.current

    // About -> Majestic elements
    const galleryWarmth = galleryWarmthRef.current
    const galleryCopy = galleryCopyRef.current
    const galleryCanvas = galleryCanvasRef.current
    const galleryWrap = galleryWrapRef.current
    const galleryStroke = galleryStrokeRef.current
    const galleryStrokePath = galleryStrokePathRef.current
    const galleryTip = galleryTipRef.current
    const galleryMolding = galleryMoldingRef.current
    const galleryAperture = galleryApertureRef.current
    const galleryPuppy = galleryPuppyRef.current

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const timeline = gsap.timeline()

    if (reducedMotion) {
      // Accessible crossfade for reduced-motion
      timeline
        .to(worldElement, { opacity: 0, duration: 0.15 })
        .to(overlay, { autoAlpha: 1, duration: 0.1 })
        .add(onSwapWorld)
        .to(worldElement, { opacity: 1, duration: 0.15 })
        .to(overlay, { autoAlpha: 0, duration: 0.1 })
        .add(onTransitionComplete)
    } else if (isToMajestic) {
      // =========================================================================
      // 0. ABOUT / MYTHOS / CODING -> MAJESTIC: THE GALLERY REVEAL (MASTER CHOREOGRAPHY)
      // Outgoing Dissolves -> Pure #000000 Black Void -> Black Pause -> Golden Artist Stroke
      // -> Monumental Frame Assembly -> Gallery Void Pause -> Puppy Reveal -> Hero Pause -> Majestic Handoff
      // Total Choreographed Duration: ~6.20s
      // =========================================================================
      clearCopies([galleryCopy])
      addWorldCopy(galleryCopy, worldElement)

      // Audio playback trigger for Universal -> Majestic Gallery Reveal (About/Mythos/Coding -> Majestic)
      try {
        if (!majesticRevealAudioRef.current && typeof Audio !== 'undefined') {
          majesticRevealAudioRef.current = new Audio('/audio/final/about-to-majestic-sfx.mp3')
          majesticRevealAudioRef.current.preload = 'auto'
        }
        if (majesticRevealAudioRef.current) {
          majesticRevealAudioRef.current.currentTime = 0
          const playPromise = majesticRevealAudioRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.warn('Majestic reveal audio playback prevented or aborted:', err)
            })
          }
        }
      } catch (audioErr) {
        console.warn('Majestic reveal audio initialization error:', audioErr)
      }

      gsap.set(overlay, { autoAlpha: 1, backgroundColor: '#000000' })
      gsap.set(galleryWarmth, { autoAlpha: 0 })
      gsap.set(galleryCopy, { autoAlpha: 1, filter: 'none', scale: 1 })
      gsap.set(worldElement, { autoAlpha: 0 })
      gsap.set(galleryWrap, { autoAlpha: 0 })
      gsap.set(galleryStroke, { autoAlpha: 0 })
      gsap.set(galleryTip, { autoAlpha: 0, left: '2.27%', top: '1.77%' })
      gsap.set(galleryMolding, { autoAlpha: 0, scale: 0.985 })
      gsap.set(galleryAperture, { autoAlpha: 0 })
      gsap.set(galleryPuppy, { autoAlpha: 0, scale: 1.012, filter: 'brightness(1.18) contrast(1.05)' })

      if (galleryStrokePath) {
        galleryStrokePath.style.strokeDashoffset = '1928'
      }

      const drawTracker = { progress: 0 }
      const collapseTracker = { progress: 0 }
      let collapseEngine = null
      if (galleryCanvas && (fromWorld === 'mythos' || fromWorld === 'coding')) {
        collapseEngine = new GalleryCollapseEngine(galleryCanvas, fromWorld)
        collapseEngine.render(0)
      }

      timeline
        // PHASE 1 & 2: OUTGOING WORLD SMOOTHLY DISAPPEARS INTO COMPLETE PITCH BLACK (0.00s -> 0.80s)
        .to(
          galleryCopy,
          {
            autoAlpha: 0,
            duration: 0.80,
            ease: 'power2.inOut',
          },
          0,
        )

      if (collapseEngine) {
        timeline.to(
          collapseTracker,
          {
            progress: 1,
            duration: 0.80,
            ease: 'power1.out',
            onUpdate: () => {
              if (collapseEngine) collapseEngine.render(collapseTracker.progress)
            },
            onComplete: () => {
              if (collapseEngine) {
                collapseEngine.destroy()
                collapseEngine = null
              }
            },
          },
          0,
        )
      }

      timeline
        // PHASE 3: PURE #000000 BLACK VOID PAUSE (0.80s -> 1.30s | 0.50s duration)
        // The viewer sees a completely clean, calm #000000 void before any gold begins
        .to({}, { duration: 0.50 })

        // PHASE 4: GOLDEN ARTIST STROKE & FRAME DRAWING FROM THE DARKNESS (1.30s -> 2.80s | 1.50s duration)
        // Travels: Top (1.30s - 1.65s) -> Right (1.65s - 2.05s) -> Bottom (2.05s - 2.45s) -> Left (2.45s - 2.80s)
        .set(galleryWrap, { autoAlpha: 1 }, 1.30)
        .set([galleryStroke, galleryTip], { autoAlpha: 1 }, 1.30)
        .to(
          drawTracker,
          {
            progress: 1,
            duration: 1.50,
            ease: 'power1.inOut',
            onUpdate: () => {
              const p = drawTracker.progress
              const offset = (1 - p) * 1928
              if (galleryStrokePath) {
                galleryStrokePath.style.strokeDashoffset = `${offset}`
              }

              // Calculate perimeter coordinate of traveling gilded brush tip
              const d = p * 1928
              let x
              let y
              if (d <= 420) {
                // Top horizontal bar (10, 10) -> (430, 10)
                x = 10 + d
                y = 10
              } else if (d <= 964) {
                // Right vertical bar (430, 10) -> (430, 554)
                x = 430
                y = 10 + (d - 420)
              } else if (d <= 1384) {
                // Bottom horizontal bar (430, 554) -> (10, 554)
                x = 430 - (d - 964)
                y = 554
              } else {
                // Left vertical bar (10, 554) -> (10, 10)
                x = 10
                y = 554 - (d - 1384)
              }

              if (galleryTip) {
                galleryTip.style.left = `${(x / 440) * 100}%`
                galleryTip.style.top = `${(y / 564) * 100}%`
              }
            },
          },
          1.30,
        )

        // PHASE 5: MONUMENTAL FRAME ASSEMBLY & TIP DISSOLVE (2.80s -> 3.60s | 0.80s duration)
        // Multi-tier gilded molding layers expand and lock in
        .to(
          galleryTip,
          {
            autoAlpha: 0,
            scale: 0.3,
            duration: 0.25,
            ease: 'power2.in',
          },
          2.80,
        )
        .to(
          galleryMolding,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.60,
            ease: 'power2.out',
          },
          2.80,
        )
        .to(
          galleryStroke,
          {
            autoAlpha: 0,
            duration: 0.40,
            ease: 'power2.in',
          },
          3.00,
        )
        .set(galleryAperture, { autoAlpha: 1 }, 2.80)

        // MOUNT REAL MAJESTIC WORLD UNDERNEATH AT VOID APEX (~3.20s)
        .add(() => {
          onSwapWorld()
        }, 3.20)

        // PHASE 6: GALLERY VOID & PITCH BLACK APERTURE PAUSE (3.60s -> 4.20s | 0.60s duration)
        // Only the golden frame and pure pitch black aperture exist; deep anticipation
        .to({}, { duration: 0.60 })

        // PHASE 7: PUPPY ARTWORK REVEAL INSIDE THE FRAME (4.20s -> 5.00s | 0.80s duration)
        // Subtle, elegant museum portrait reveal (puppy_01_discovery.png)
        .to(
          galleryPuppy,
          {
            autoAlpha: 1,
            scale: 1.000,
            filter: 'brightness(1.0) contrast(1.0)',
            duration: 0.80,
            ease: 'power2.out',
          },
          4.20,
        )

        // PHASE 8: PUPPY HERO PAUSE (5.00s -> 5.60s | 0.60s duration)
        // Artwork settles within the frame
        .to({}, { duration: 0.60 })

        // PHASE 9: MAJESTIC WORLD HANDOFF (5.60s -> 6.20s | 0.60s duration)
        .set(worldElement, { autoAlpha: 1 }, 5.60)
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: 0.60,
            ease: 'power2.out',
          },
          5.60,
        )

        // Clean finish (6.20s)
        .add(() => {
          gsap.set(worldElement, { clearProps: 'all' })
          onTransitionComplete()
        }, 6.20)
    } else if (isToMythosDisintegration) {
      // =========================================================================
      // 0. ABOUT / CODING / MAJESTIC -> MYTHOS: DISINTEGRATION -> PARTICLE FIELD -> NUCLEUS -> BIG BANG -> MYTHOS
      // Source World -> Disintegration into Matter (Gold for About, Black/Green for Coding, Black-Hole Relic for Majestic)
      // -> Central Nucleus / Orb Formation -> Energy Transform -> Big Bang -> Mythos Emerges
      // Total Choreographed Duration: ~8.10s
      // =========================================================================
      clearCopies([disintegrationCopy])
      addWorldCopy(disintegrationCopy, worldElement)

      if (disintegrationCanvas) {
        const source = fromWorld === 'coding' ? 'coding' : fromWorld === 'majestic' ? 'majestic' : 'about'
        const engine = new AboutMythosParticleEngine(disintegrationCanvas, source)
        particleEngineRef.current = engine
        engine.render(0)

        const particleProgress = { val: 0 }

        // Audio playback trigger for Majestic -> Mythos transition
        if (fromWorld === 'majestic' && toWorld === 'mythos') {
          try {
            if (!majesticToMythosAudioRef.current && typeof Audio !== 'undefined') {
              majesticToMythosAudioRef.current = new Audio('/audio/final/majestic-to-mythos-sfx.mp3')
              majesticToMythosAudioRef.current.preload = 'auto'
            }
            if (majesticToMythosAudioRef.current) {
              majesticToMythosAudioRef.current.currentTime = 0
              const playPromise = majesticToMythosAudioRef.current.play()
              if (playPromise !== undefined) {
                playPromise.catch((err) => {
                  console.warn('Majestic -> Mythos audio playback prevented or aborted:', err)
                })
              }
            }
          } catch (audioErr) {
            console.warn('Majestic -> Mythos audio initialization error:', audioErr)
          }
        }

        gsap.set(overlay, { autoAlpha: 1, backgroundColor: '#000000' })
        gsap.set(disintegrationCopy, { autoAlpha: 1, x: 0, y: 0, scale: 1, filter: 'none' })
        gsap.set(worldElement, { autoAlpha: 0 })

        timeline
          // PHASE 1 & 2: Subtle structural tremor & swift dissolve into matter (0.00s -> 0.40s)
          // Outgoing world immediately dissolves, leaving pure #000000 black behind all particles
          .to(
            disintegrationCopy,
            {
              x: 2,
              y: -1,
              duration: 0.08,
              yoyo: true,
              repeat: 2,
              ease: 'power1.inOut',
            },
            0,
          )
          .to(
            disintegrationCopy,
            {
              autoAlpha: 0,
              filter: 'blur(8px) brightness(1.2)',
              duration: 0.35,
              ease: 'power2.in',
            },
            0.05,
          )

          // PHASE 1 to 8: Main Particle Simulation Engine (0.00s -> 8.10s)
          .to(
            particleProgress,
            {
              val: 1,
              duration: 8.10,
              ease: 'none',
              onUpdate: () => {
                if (particleEngineRef.current) {
                  particleEngineRef.current.render(particleProgress.val)
                }
              },
            },
            0,
          )

          // PHASE 7: WORLD SWAP DURING COMPRESSION SINGULARITY (~7.00s, p = 0.875)
          // Solid #000000 overlay covers viewport; worldElement remains autoAlpha: 0
          // Zero frames of old About world can ever flash back
          .add(() => {
            onSwapWorld()
          }, 7.00)

          // PHASE 8: BIG BANG DETONATES (7.20s) & MYTHOS REVEALS CONCURRENTLY (7.20s -> 7.85s)
          // Mythos emerges through the expanding orange/gold particle curtain
          .fromTo(
            worldElement,
            {
              autoAlpha: 0,
              scale: 0.985,
              filter: 'brightness(1.4) blur(3px)',
            },
            {
              autoAlpha: 1,
              scale: 1.000,
              filter: 'brightness(1.0) blur(0px)',
              duration: 0.65,
              ease: 'power2.out',
            },
            7.20,
          )

          // Transition Overlay recedes as Mythos becomes dominant (7.35s -> 7.95s)
          .to(
            overlay,
            {
              autoAlpha: 0,
              duration: 0.60,
              ease: 'power2.out',
            },
            7.35,
          )

          // Clean finish & resource disposal (8.10s)
          .add(() => {
            if (particleEngineRef.current) {
              particleEngineRef.current.destroy()
              particleEngineRef.current = null
            }
            gsap.set(worldElement, { clearProps: 'all' })
            onTransitionComplete()
          }, 8.10)
      }
    } else if (isToCoding) {
      // =========================================================================
      // 1. ABOUT / MYTHOS / MAJESTIC -> CODING (MASTER CHOREOGRAPHY)
      // Horizontal Multi-Slice Shearing -> RGB Ghosts -> Digital Void -> Green Reconstruction
      // =========================================================================
      const isMythos = fromWorld === 'mythos'
      const isMajestic = fromWorld === 'majestic'
      const signalPalette = isMythos
        ? MYTHOS_COLLAPSE_SIGNALS
        : isMajestic
          ? MAJESTIC_COLLAPSE_SIGNALS
          : ABOUT_COLLAPSE_SIGNALS

      goldSignals.forEach((sig, idx) => {
        const item = signalPalette[idx % signalPalette.length]
        sig.style.background = item.bg
        sig.style.boxShadow = item.glow
      })

      clearCopies([...slices, ...ghosts])
      slices.forEach((slice) => addWorldCopy(slice, worldElement))
      ghosts.forEach((ghost) => addWorldCopy(ghost, worldElement))

      gsap.set(slices, { autoAlpha: 0, x: 0, y: 0 })
      gsap.set(ghosts, { autoAlpha: 0, x: 0, y: 0 })
      gsap.set(goldSignals, { autoAlpha: 0, x: 0, scaleX: 0.2 })
      gsap.set(greenSignals, { autoAlpha: 0, scaleX: 0 })
      if (scanline) gsap.set(scanline, { autoAlpha: 0, top: '15%' })
      if (codeBeam) gsap.set(codeBeam, { autoAlpha: 0, left: '-20%', scaleX: 0.1 })

      const textHeadings = worldElement.querySelectorAll(
        'h1, h2, h3, .about-hero__roles, .about-hero__label, .mythos-hero__title, .mythos-hero__meta, .majestic-hero__title, .majestic-hero__eyebrow, .majestic-hero__subtitle'
      )

      timeline
        // PHASE 1 — TEXT INSTABILITY & HOLD (~0.22s)
        .to(textHeadings, {
          x: 4,
          opacity: 0.82,
          duration: 0.08,
        })
        .to(textHeadings, {
          x: -3,
          opacity: 0.95,
          duration: 0.06,
        })
        .to(textHeadings, {
          x: 2,
          opacity: 0.88,
          duration: 0.08,
        })

        // PHASE 2 — PORTRAIT & CHROMATIC INSTABILITY (~0.24s)
        .to(worldElement, {
          x: -8,
          duration: 0.12,
          ease: 'power2.in',
        }, '<0.04')
        .to(ghosts[0], { autoAlpha: 0.60, x: -14, duration: 0.14, ease: 'power1.out' }, '<')
        .to(ghosts[1], { autoAlpha: 0.55, x: 16,  duration: 0.14, ease: 'power1.out' }, '<')
        .to(ghosts[2], { autoAlpha: 0.40, x: -8,  y: -2, duration: 0.14, ease: 'power1.out' }, '<')

        // PHASE 3 — DIRECTIONAL HORIZONTAL SLICES (~0.34s)
        .to(slices, { autoAlpha: 1, duration: 0.04 }, '<0.06')
        .add(() => {
          slices.forEach((slice, idx) => {
            const cfg = SLICES_CONFIG[idx % SLICES_CONFIG.length]
            gsap.to(slice, {
              x: cfg.offset,
              duration: cfg.dur,
              delay: cfg.delay,
              ease: 'power2.out',
            })
          })
        }, '<')
        .set(goldSignals, { autoAlpha: 0.85 })
        .to(goldSignals, {
          x: (i) => GOLD_SIGNALS_CONFIG[i % GOLD_SIGNALS_CONFIG.length].xSweep,
          scaleX: 1.4,
          duration: 0.28,
          stagger: 0.015,
          ease: 'power2.out',
        }, '<0.04')

        // PHASE 4 — WORLD DISINTEGRATION (HORIZONTAL SWEEP) (~0.28s)
        .to(
          overlay,
          {
            autoAlpha: 1,
            backgroundColor: fromWorld === 'majestic' ? '#000000' : '#050706',
            duration: 0.22,
            ease: 'power2.in',
          },
          '<0.10',
        )
        .to(
          slices,
          {
            x: (i) => SLICES_CONFIG[i % SLICES_CONFIG.length].offset * 3.5,
            autoAlpha: 0,
            duration: 0.22,
            stagger: 0.008,
            ease: 'power3.in',
          },
          '<',
        )
        .to(
          [worldElement, ...ghosts],
          {
            x: 95,
            autoAlpha: 0,
            duration: 0.22,
            ease: 'power3.in',
          },
          '<',
        )
        .to(
          goldSignals,
          {
            x: (i) => GOLD_SIGNALS_CONFIG[i % GOLD_SIGNALS_CONFIG.length].xSweep + 160,
            autoAlpha: 0,
            duration: 0.18,
            ease: 'power2.in',
          },
          '<',
        )

        // PHASE 5 — DIGITAL VOID & WORLD SWAP (~0.14s)
        .add(onSwapWorld)
        .set(worldElement, { autoAlpha: 0, x: -40 })
        .to({}, { duration: 0.14 })

        // PHASE 6 — CODING GLITCH EMERGENCE (~0.32s)
        .set(greenSignals, { autoAlpha: 0.95, scaleX: 0, transformOrigin: 'left center' })
        .to(greenSignals, {
          scaleX: 1,
          duration: 0.22,
          stagger: 0.02,
          ease: 'power3.out',
        })
        .to(
          scanline,
          {
            autoAlpha: 0.85,
            top: '85%',
            duration: 0.26,
            ease: 'power2.inOut',
          },
          '<',
        )
        .to(
          codeBeam,
          {
            autoAlpha: 0.75,
            left: '110%',
            scaleX: 1.5,
            duration: 0.28,
            ease: 'power2.inOut',
          },
          '<0.02',
        )

        // PHASE 7 — CODING PORTRAIT & CONTENT RESOLUTION (~0.28s)
        .to(
          worldElement,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.28,
            ease: 'power3.out',
          },
          '<0.08',
        )
        .to(
          greenSignals,
          {
            autoAlpha: 0,
            duration: 0.16,
            ease: 'power2.in',
          },
          '>-0.12',
        )
        .to(
          scanline,
          {
            autoAlpha: 0,
            duration: 0.12,
          },
          '<',
        )
        .to(
          codeBeam,
          {
            autoAlpha: 0,
            duration: 0.12,
          },
          '<',
        )

        // PHASE 8 — CODING SYSTEM AWAKENING & STABILIZATION (~0.22s)
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: 0.22,
            ease: 'power2.out',
          },
          '>-0.08',
        )
        .add(onTransitionComplete)
    } else if (isHumanStabilization) {
      // =========================================================================
      // 2. CODING / MYTHOS / MAJESTIC -> ABOUT: PHYSICAL COMPRESSION & SLOW RIGHT -> LEFT HEARTBEAT
      // Target Duration: ~2.8s - 3.2s
      // Source World -> Top/Bottom Collapse -> Central Source Line (Green for Coding, Warm Brown #6B4630 for Mythos, Champagne-Beige #C4AE7A for Majestic)
      // -> SLOW Heartbeat (Right->Left) -> Gold Line -> About Unfolds
      // =========================================================================
      clearCopies([topContent, bottomContent])
      addWorldCopy(topContent, worldElement)
      addWorldCopy(bottomContent, worldElement)

      const isMythosSource = fromWorld === 'mythos'
      const isMajesticSource = fromWorld === 'majestic'
      const sourceLineColor = isMythosSource
        ? '#6B4630'
        : isMajesticSource
          ? '#C4AE7A'
          : '#39ff72'
      const sourceLineGlow = isMythosSource
        ? '0 0 12px #6B4630, 0 0 24px rgba(107, 70, 48, 0.7)'
        : isMajesticSource
          ? '0 0 12px #C4AE7A, 0 0 24px rgba(196, 174, 122, 0.7)'
          : '0 0 12px #39ff72, 0 0 24px rgba(57, 255, 114, 0.7)'
      const collapseBg = isMythosSource
        ? '#090807'
        : isMajesticSource
          ? '#000000'
          : '#050706'

      const totalWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
      const pulseStartX = totalWidth + 40
      const pulseEndX = -260
      const pulseDistance = pulseStartX - pulseEndX

      // Setup initial state
      if (greenLine) {
        greenLine.style.background = sourceLineColor
        greenLine.style.boxShadow = sourceLineGlow
      }
      gsap.set([topHalf, bottomHalf], { autoAlpha: 1 })
      gsap.set([topContent, bottomContent], { y: 0 })
      gsap.set(lineWrap, { autoAlpha: 0 })
      gsap.set(greenLine, { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1 })
      gsap.set(goldLine, { clipPath: 'inset(0 0 0 100%)', autoAlpha: 1 })
      gsap.set(heartbeatRunner, { autoAlpha: 0, x: pulseStartX })

      const pulseTracker = { progress: 0 }

      timeline
        // PHASE 1 — SOURCE WORLD STABILITY (0.00s - 0.35s)
        .to({}, { duration: 0.35 })

        // PHASE 2 — PAGE COLLAPSE (0.35s - 0.85s | 0.50s duration)
        // Top half moves DOWNWARD into center (+50vh), Bottom half moves UPWARD into center (-50vh)
        .set(overlay, { autoAlpha: 1, backgroundColor: collapseBg })
        .set(worldElement, { autoAlpha: 0 })
        .to(
          topContent,
          {
            y: '50vh',
            duration: 0.50,
            ease: 'power2.in',
          },
          '<',
        )
        .to(
          bottomContent,
          {
            y: '-50vh',
            duration: 0.50,
            ease: 'power2.in',
          },
          '<',
        )

        // PHASE 3 — SOURCE SIGNAL LINE ALONE (0.85s - 1.10s | 0.25s duration)
        // Source world is gone; ONE thin line sits at 50% viewport height
        .set([topHalf, bottomHalf], { autoAlpha: 0 })
        .set(lineWrap, { autoAlpha: 1 })
        .to({}, { duration: 0.25 })

        // PHASE 4 & 5 — SLOW MOVING HEARTBEAT (RIGHT -> LEFT) & SOURCE COLOR -> GOLD (1.10s - 2.30s | 1.20s duration)
        // Heartbeat starts on RIGHT and travels across the line to the LEFT.
        // Behind the pulse, the line progressively converts from Source Color to Gold.
        .set(heartbeatRunner, { autoAlpha: 1, x: pulseStartX })
        .to(
          heartbeatRunner,
          {
            x: pulseEndX,
            duration: 1.20,
            ease: 'power1.inOut',
          },
          '>',
        )
        .to(
          pulseTracker,
          {
            progress: 1,
            duration: 1.20,
            ease: 'power1.inOut',
            onUpdate: () => {
              const currentX = pulseStartX - pulseTracker.progress * pulseDistance
              const peakX = currentX + 115
              const pct = Math.max(0, Math.min(100, (peakX / totalWidth) * 100))
              if (goldLine) goldLine.style.clipPath = `inset(0 0 0 ${pct}%)`
              if (greenLine) greenLine.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
            },
          },
          '<',
        )

        // PHASE 6 — GOLD LINE HOLD & WORLD SWAP (2.30s - 2.50s | 0.20s duration)
        // Heartbeat exits on left; line is now 100% gold; holds for 200ms
        .set(heartbeatRunner, { autoAlpha: 0 })
        .to({}, { duration: 0.20 })
        .add(onSwapWorld)

        // PHASE 7 — ABOUT EMERGES / EXPANDS FROM THE GOLDEN LINE (2.50s - 3.00s | 0.50s duration)
        // Incoming About world expands vertically AWAY from the center line
        .set(worldElement, { autoAlpha: 1, clipPath: 'inset(50% 0 50% 0)' })
        .to(
          worldElement,
          {
            clipPath: 'inset(0% 0 0% 0)',
            duration: 0.50,
            ease: 'power3.out',
          },
          '>',
        )
        .to(
          lineWrap,
          {
            autoAlpha: 0,
            duration: 0.30,
            ease: 'power2.out',
          },
          '<0.15',
        )
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: 0.30,
            ease: 'power2.out',
          },
          '<',
        )

        // PHASE 8 — SETTLE (3.00s - 3.15s | 0.15s duration)
        .add(() => {
          gsap.set(worldElement, { clearProps: 'clipPath,autoAlpha,transform,opacity' })
        })
        .add(onTransitionComplete)
    } else {
      // Standard transition for all other world pairs
      timeline
        .to(worldElement, { opacity: 0, scale: 0.96, duration: 0.2 })
        .to(overlay, { autoAlpha: 1, duration: 0.15 })
        .add(onSwapWorld)
        .set(worldElement, { opacity: 0, scale: 1 })
        .to(worldElement, { opacity: 1, duration: 0.25 })
        .to(overlay, { autoAlpha: 0, duration: 0.2 })
        .add(onTransitionComplete)
    }

    return () => {
      timeline.kill()
      if (particleEngineRef.current) {
        particleEngineRef.current.destroy()
        particleEngineRef.current = null
      }
      if (greenLine) {
        greenLine.style.removeProperty('background')
        greenLine.style.removeProperty('box-shadow')
      }
      goldSignals.forEach((sig) => {
        if (sig) {
          sig.style.removeProperty('background')
          sig.style.removeProperty('box-shadow')
        }
      })
      if (galleryCanvas) {
        const gCtx = galleryCanvas.getContext('2d')
        if (gCtx) gCtx.clearRect(0, 0, galleryCanvas.width, galleryCanvas.height)
      }
      gsap.set(worldElement, { clearProps: 'clipPath,opacity,transform,filter,visibility' })
      clearCopies([...slices, ...ghosts, topContent, bottomContent, disintegrationCopy, galleryCopy])
      if (majesticToMythosAudioRef.current) {
        majesticToMythosAudioRef.current.pause()
        majesticToMythosAudioRef.current.currentTime = 0
      }
      if (majesticRevealAudioRef.current) {
        majesticRevealAudioRef.current.pause()
        majesticRevealAudioRef.current.currentTime = 0
      }
    }
  }, [
    fromWorld,
    isHumanStabilization,
    isRunning,
    isToCoding,
    isToMajestic,
    isToMythosDisintegration,
    onSwapWorld,
    onTransitionComplete,
    toWorld,
    transitionConfig,
    worldElementRef,
  ])

  return (
    <div
      ref={overlayRef}
      className="world-transition"
      aria-hidden="true"
      data-from-world={fromWorld ?? ''}
      data-to-world={toWorld ?? ''}
      data-direction={transitionDirection ?? ''}
      data-style={transitionConfig?.style ?? ''}
    >
      {/* ===================================================================
          ELEMENTS FOR APPROVED ABOUT / MYTHOS / MAJESTIC -> CODING (MASTER CHOREOGRAPHY)
          =================================================================== */}
      {isRunning && isToCoding && (
        <>
          <div
            className="world-transition__ghost world-transition__ghost--red"
            ref={(el) => {
              ghostRefs.current[0] = el
            }}
          />
          <div
            className="world-transition__ghost world-transition__ghost--cyan"
            ref={(el) => {
              ghostRefs.current[1] = el
            }}
          />
          <div
            className="world-transition__ghost world-transition__ghost--blue"
            ref={(el) => {
              ghostRefs.current[2] = el
            }}
          />

          {SLICES_CONFIG.map((cfg, idx) => (
            <div
              key={`slice-${cfg.id}`}
              className={`world-transition__slice world-transition__slice--${cfg.id}`}
              ref={(el) => {
                sliceRefs.current[idx] = el
              }}
            />
          ))}

          {GOLD_SIGNALS_CONFIG.map((cfg, idx) => (
            <span
              key={`gold-sig-${idx}`}
              ref={(el) => {
                goldSignalRefs.current[idx] = el
              }}
              className="world-transition__gold-signal"
              style={{
                top: cfg.top,
                left: cfg.left,
                width: cfg.width,
                height: cfg.height,
              }}
            />
          ))}

          {GREEN_SIGNALS_CONFIG.map((cfg, idx) => (
            <span
              key={`green-sig-${idx}`}
              ref={(el) => {
                greenSignalRefs.current[idx] = el
              }}
              className="world-transition__green-signal"
              style={{
                top: cfg.top,
                left: cfg.left,
                right: cfg.right,
                width: cfg.width,
                height: cfg.height,
              }}
            />
          ))}

          <div ref={scanlineRef} className="world-transition__scanline" />
          <div ref={codeBeamRef} className="world-transition__code-beam" />
        </>
      )}

      {/* ===================================================================
          ELEMENTS FOR CODING / MYTHOS -> ABOUT (PHYSICAL COMPRESSION & MOVING HEARTBEAT)
          =================================================================== */}
      {isRunning && isHumanStabilization && (
        <>
          <div
            ref={topHalfRef}
            className="world-transition__half world-transition__half--top"
          >
            <div
              ref={topContentRef}
              className="world-transition__half-content world-transition__half-content--top"
            />
          </div>
          <div
            ref={bottomHalfRef}
            className="world-transition__half world-transition__half--bottom"
          >
            <div
              ref={bottomContentRef}
              className="world-transition__half-content world-transition__half-content--bottom"
            />
          </div>

          <div ref={lineWrapRef} className="world-transition__line-wrap">
            <div ref={greenLineRef} className="world-transition__line world-transition__line--green" />
            <div ref={goldLineRef} className="world-transition__line world-transition__line--gold" />

            {/* The Moving Heartbeat Runner that travels horizontally RIGHT -> LEFT */}
            <div ref={heartbeatRunnerRef} className="world-transition__heartbeat-runner">
              <svg
                className="world-transition__heartbeat-svg"
                viewBox="0 0 240 80"
                preserveAspectRatio="none"
              >
                <path
                  className="world-transition__heartbeat-path"
                  d="M 0 40 L 45 40 L 58 30 L 70 40 L 85 40 L 98 48 L 115 8 L 132 72 L 145 28 L 158 40 L 240 40"
                />
              </svg>
              <div className="world-transition__heartbeat-glow-head" />
            </div>
          </div>
        </>
      )}

      {/* ===================================================================
          ELEMENTS FOR ABOUT / CODING -> MYTHOS (DISINTEGRATION & BIG BANG PARTICLE ENGINE)
          =================================================================== */}
      {isRunning && isToMythosDisintegration && (
        <>
          <div
            ref={disintegrationCopyRef}
            className="world-transition__disintegration-copy"
          />
          <canvas
            ref={disintegrationCanvasRef}
            className="world-transition__disintegration-canvas"
          />
        </>
      )}

      {/* ===================================================================
          ELEMENTS FOR ABOUT / MYTHOS / CODING -> MAJESTIC (THE GALLERY REVEAL)
          =================================================================== */}
      {isRunning && isToMajestic && (
        <>
          <div ref={galleryWarmthRef} className="world-transition__gallery-warmth" />
          <div ref={galleryCopyRef} className="world-transition__gallery-copy" />
          <canvas ref={galleryCanvasRef} className="world-transition__gallery-canvas" />

          <div ref={galleryWrapRef} className="world-transition__gallery-wrap">
            {/* Animated Golden Artist Gilded Stroke */}
            <svg
              ref={galleryStrokeRef}
              className="world-transition__gallery-stroke"
              viewBox="0 0 440 564"
              preserveAspectRatio="none"
            >
              <rect
                ref={galleryStrokePathRef}
                className="world-transition__gallery-stroke-path"
                x="10"
                y="10"
                width="420"
                height="544"
                rx="3"
                />
            </svg>

            {/* Traveling Gilded Light Tip Head */}
            <div ref={galleryTipRef} className="world-transition__gallery-tip" />

            {/* 7-Tier Physical Golden Molding Layers */}
            <div ref={galleryMoldingRef} className="world-transition__gallery-molding" />

            {/* Pitch-Black Inner Artwork Aperture */}
            <div ref={galleryApertureRef} className="world-transition__gallery-aperture">
              <img
                ref={galleryPuppyRef}
                className="world-transition__gallery-puppy"
                src="/assets/majestic/puppy-sequence/puppy_01_discovery.png"
                alt="The Imperial Canine"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WorldTransition

