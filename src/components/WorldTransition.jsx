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
  const sliceRefs = useRef([])
  const ghostRefs = useRef([])
  const fragmentRefs = useRef([])

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
    const slices = sliceRefs.current
    const ghosts = ghostRefs.current
    const fragments = fragmentRefs.current
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isAboutToCoding = transitionConfig?.style === 'about-coding-glitch'
    const timeline = gsap.timeline()

    gsap.set(overlay, { autoAlpha: 0 })

    if (reducedMotion) {
      timeline
        .to(worldElement, { opacity: 0, duration: 0.15 })
        .to(overlay, { autoAlpha: 1, duration: 0.1 })
        .add(onSwapWorld)
        .to(worldElement, { opacity: 1, duration: 0.15 })
        .to(overlay, { autoAlpha: 0, duration: 0.1 })
        .add(onTransitionComplete)
    } else if (isAboutToCoding) {
      clearCopies([...slices, ...ghosts])
      slices.forEach((slice) => addWorldCopy(slice, worldElement))
      ghosts.forEach((ghost) => addWorldCopy(ghost, worldElement))

      gsap.set(slices, { autoAlpha: 0, x: 0 })
      gsap.set(ghosts, { autoAlpha: 0, x: 0 })
      gsap.set(fragments, { autoAlpha: 0, scaleX: 0 })

      timeline
        // Phase 1: hold the About world briefly before it starts to fail.
        .to({}, { duration: 0.12 })
        // Phase 2: controlled signal instability, not a random page shake.
        .to(worldElement, {
          x: 5,
          scale: 1.012,
          duration: 0.12,
          ease: 'power1.in',
        })
        // Phase 3: three tinted copies create a brief RGB signal split.
        .to(ghosts[0], { autoAlpha: 0.38, x: -5, duration: 0.1 }, '<')
        .to(ghosts[1], { autoAlpha: 0.35, x: 5, duration: 0.1 }, '<')
        .to(ghosts[2], { autoAlpha: 0.25, x: 2, duration: 0.1 }, '<')
        // Phase 4: source-world copies are revealed through fixed horizontal masks.
        .to(slices, { autoAlpha: 1, duration: 0.04 })
        .to(slices[0], { x: -44, duration: 0.14, ease: 'power2.out' }, '<')
        .to(slices[1], { x: 36, duration: 0.12, ease: 'power2.out' }, '<')
        .to(slices[2], { x: -24, duration: 0.16, ease: 'power2.out' }, '<')
        .to(slices[3], { x: 52, autoAlpha: 0.35, duration: 0.11 }, '<')
        // Phase 5: the warm world and its fragments collapse into near black.
        .to(overlay, {
          autoAlpha: 1,
          backgroundColor: '#050806',
          duration: 0.14,
        })
        .to(
          [worldElement, ...slices, ...ghosts],
          {
            autoAlpha: 0,
            scale: 0.55,
            x: 0,
            duration: 0.16,
            transformOrigin: '50% 50%',
            ease: 'power2.in',
          },
          '<',
        )
        .add(onSwapWorld)
        .set(worldElement, { autoAlpha: 0, scale: 1.025, x: 0 })
        // Phase 6: green fragments establish the Coding signal before it appears.
        .to(fragments, {
          autoAlpha: 0.8,
          scaleX: 1,
          duration: 0.12,
          stagger: 0.025,
          ease: 'power2.out',
        })
        .to(worldElement, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.24,
          ease: 'power2.out',
        })
        // Phase 7: remove the transition material and leave Coding stable.
        .to(fragments, { autoAlpha: 0, duration: 0.12 }, '<0.08')
        .to(overlay, { autoAlpha: 0, duration: 0.18 })
        .add(onTransitionComplete)
    } else {
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
      gsap.set(worldElement, { clearProps: 'opacity,transform,filter' })
      clearCopies([...slices, ...ghosts])
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
      <div
        className="world-transition__ghost world-transition__ghost--red"
        ref={(element) => {
          ghostRefs.current[0] = element
        }}
      />
      <div
        className="world-transition__ghost world-transition__ghost--cyan"
        ref={(element) => {
          ghostRefs.current[1] = element
        }}
      />
      <div
        className="world-transition__ghost world-transition__ghost--blue"
        ref={(element) => {
          ghostRefs.current[2] = element
        }}
      />
      <div
        className="world-transition__slice world-transition__slice--one"
        ref={(element) => {
          sliceRefs.current[0] = element
        }}
      />
      <div
        className="world-transition__slice world-transition__slice--two"
        ref={(element) => {
          sliceRefs.current[1] = element
        }}
      />
      <div
        className="world-transition__slice world-transition__slice--three"
        ref={(element) => {
          sliceRefs.current[2] = element
        }}
      />
      <div
        className="world-transition__slice world-transition__slice--four"
        ref={(element) => {
          sliceRefs.current[3] = element
        }}
      />
      <span
        className="world-transition__fragment world-transition__fragment--one"
        ref={(element) => {
          fragmentRefs.current[0] = element
        }}
      />
      <span
        className="world-transition__fragment world-transition__fragment--two"
        ref={(element) => {
          fragmentRefs.current[1] = element
        }}
      />
      <span
        className="world-transition__fragment world-transition__fragment--three"
        ref={(element) => {
          fragmentRefs.current[2] = element
        }}
      />
      <span
        className="world-transition__fragment world-transition__fragment--four"
        ref={(element) => {
          fragmentRefs.current[3] = element
        }}
      />
    </div>
  )
}

export default WorldTransition
