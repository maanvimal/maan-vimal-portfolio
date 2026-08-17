import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

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

  useLayoutEffect(() => {
    if (
      transitionState !== 'running' ||
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

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const isAboutToCoding = transitionConfig?.style === 'about-coding-glitch'
    const isCodingToAbout = transitionConfig?.style === 'human-stabilization'
    const timeline = gsap.timeline()

    gsap.set(overlay, { autoAlpha: 0 })

    if (reducedMotion) {
      // Accessible crossfade for reduced-motion
      timeline
        .to(worldElement, { opacity: 0, duration: 0.15 })
        .to(overlay, { autoAlpha: 1, duration: 0.1 })
        .add(onSwapWorld)
        .to(worldElement, { opacity: 1, duration: 0.15 })
        .to(overlay, { autoAlpha: 0, duration: 0.1 })
        .add(onTransitionComplete)
    } else if (isAboutToCoding) {
      // =========================================================================
      // 1. ABOUT -> CODING (RESTORED ORIGINAL APPROVED TRANSITION)
      // Horizontal Multi-Slice Shearing -> RGB Ghosts -> Digital Void -> Green Reconstruction
      // =========================================================================
      clearCopies([...slices, ...ghosts])
      slices.forEach((slice) => addWorldCopy(slice, worldElement))
      ghosts.forEach((ghost) => addWorldCopy(ghost, worldElement))

      gsap.set(slices, { autoAlpha: 0, x: 0, y: 0 })
      gsap.set(ghosts, { autoAlpha: 0, x: 0, y: 0 })
      gsap.set(goldSignals, { autoAlpha: 0, x: 0, scaleX: 0.2 })
      gsap.set(greenSignals, { autoAlpha: 0, scaleX: 0 })
      if (scanline) gsap.set(scanline, { autoAlpha: 0, top: '15%' })
      if (codeBeam) gsap.set(codeBeam, { autoAlpha: 0, left: '-20%', scaleX: 0.1 })

      const textHeadings = worldElement.querySelectorAll('h1, h2, .about-hero__roles, .about-hero__label')

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
            backgroundColor: '#050706',
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
    } else if (isCodingToAbout) {
      // =========================================================================
      // 2. CODING -> ABOUT: PHYSICAL COMPRESSION & SLOW RIGHT -> LEFT HEARTBEAT
      // Target Duration: ~2.8s - 3.2s
      // Coding -> Top/Bottom Collapse -> Central Green Line -> SLOW Heartbeat (Right->Left) -> Gold Line -> About Unfolds
      // =========================================================================
      clearCopies([topContent, bottomContent])
      addWorldCopy(topContent, worldElement)
      addWorldCopy(bottomContent, worldElement)

      const totalWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
      const pulseStartX = totalWidth + 40
      const pulseEndX = -260
      const pulseDistance = pulseStartX - pulseEndX

      // Setup initial state
      gsap.set([topHalf, bottomHalf], { autoAlpha: 1 })
      gsap.set([topContent, bottomContent], { y: 0 })
      gsap.set(lineWrap, { autoAlpha: 0 })
      gsap.set(greenLine, { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1 })
      gsap.set(goldLine, { clipPath: 'inset(0 0 0 100%)', autoAlpha: 1 })
      gsap.set(heartbeatRunner, { autoAlpha: 0, x: pulseStartX })

      const pulseTracker = { progress: 0 }

      timeline
        // PHASE 1 — CODING WORLD STABILITY (0.00s - 0.35s)
        .to({}, { duration: 0.35 })

        // PHASE 2 — PAGE COLLAPSE (0.35s - 0.85s | 0.50s duration)
        // Top half moves DOWNWARD into center (+50vh), Bottom half moves UPWARD into center (-50vh)
        .set(overlay, { autoAlpha: 1, backgroundColor: '#050706' })
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

        // PHASE 3 — GREEN SIGNAL LINE ALONE (0.85s - 1.10s | 0.25s duration)
        // Coding is gone; ONE thin electric-green line sits at 50% viewport height
        .set([topHalf, bottomHalf], { autoAlpha: 0 })
        .set(lineWrap, { autoAlpha: 1 })
        .to({}, { duration: 0.25 })

        // PHASE 4 & 5 — SLOW MOVING HEARTBEAT (RIGHT -> LEFT) & GREEN -> GOLD (1.10s - 2.30s | 1.20s duration)
        // Heartbeat starts on RIGHT and travels across the line to the LEFT.
        // Behind the pulse, the line progressively converts from Green to Gold.
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
      // Standard transition for all other 10 world pairs
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
      gsap.set(worldElement, { clearProps: 'clipPath,opacity,transform,filter,visibility' })
      clearCopies([...slices, ...ghosts, topContent, bottomContent])
    }
  }, [
    fromWorld,
    onSwapWorld,
    onTransitionComplete,
    toWorld,
    transitionConfig,
    transitionState,
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
          ELEMENTS FOR APPROVED ABOUT -> CODING (ORIGINAL)
          =================================================================== */}
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

      {/* ===================================================================
          ELEMENTS FOR CODING -> ABOUT (PHYSICAL COMPRESSION & MOVING HEARTBEAT)
          =================================================================== */}
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
    </div>
  )
}

export default WorldTransition

