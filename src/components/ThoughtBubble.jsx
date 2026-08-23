import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { getThoughtConfig, getThoughtMessage } from '../data/thoughtConfig.js'

/**
 * Reusable Thought / Speech Bubble Component for Phoenix Character Portraits.
 *
 * Implements a 3-stage physical thought lifecycle:
 * Stage 1: Emergence outward from character head (350ms)
 * Stage 2: Stable, motionless hold (approx. 5000ms)
 * Stage 3: Return to mind - retracts physically back into the head origin (350ms)
 *
 * @param {Object} props
 * @param {('about'|'coding'|'mythos'|'majestic')} props.world - Target portfolio world
 * @param {string} [props.message] - Thought message text content
 * @param {boolean} [props.visible=true] - Visibility toggle
 * @param {number} [props.duration=5000] - Hold duration in milliseconds
 * @param {number} [props.delay=1000] - Delay before emergence begins in milliseconds
 * @param {number|string} [props.triggerKey=1] - Key to restart animation on replay or world change
 * @param {Function} [props.onComplete] - Callback fired when the retract animation finishes
 */
function ThoughtBubble({
  world = 'about',
  message,
  visible = true,
  duration = 5000,
  delay = 1000,
  triggerKey = 1,
  onComplete,
}) {
  const bubbleRef = useRef(null)
  const timelineRef = useRef(null)

  const config = getThoughtConfig(world)
  const textMessage = message || getThoughtMessage(world, 1).message

  useEffect(() => {
    const el = bubbleRef.current
    if (!el) return

    if (!visible) {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      gsap.set(el, { autoAlpha: 0 })
      return
    }

    const originX = config.originX ?? 40
    const originY = config.originY ?? 35

    // Kill any existing tween to prevent overlap
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // STAGE 0: Initial state (at character head origin, scaled down, blurred, invisible)
    gsap.set(el, {
      autoAlpha: 0,
      scale: 0.82,
      x: originX,
      y: originY,
      filter: 'blur(3px)',
      transformOrigin: 'bottom right',
    })

    // On manual replay trigger (triggerKey > 1), use shorter delay (120ms) for snappy response
    const effectiveDelay = triggerKey > 1 ? 0.12 : delay / 1000

    const tl = gsap.timeline({
      delay: effectiveDelay,
      onComplete: () => {
        gsap.set(el, { autoAlpha: 0 })
        if (onComplete) {
          onComplete()
        }
      },
    })
    timelineRef.current = tl

    // STAGE 1: EMERGENCE (350ms) — Expands smoothly into resting position
    tl.to(el, {
      autoAlpha: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.35,
      ease: 'power2.out',
    })

    // STAGE 2: HOLD (5000ms / duration) — Motionless and readable
    tl.to({}, { duration: duration / 1000 })

    // STAGE 3: RETURN TO MIND (350ms) — Physically retracts back towards head
    tl.to(el, {
      autoAlpha: 0,
      scale: 0.82,
      x: originX,
      y: originY,
      filter: 'blur(3px)',
      duration: 0.35,
      ease: 'power2.in',
    })

    return () => {
      if (tl) {
        tl.kill()
      }
    }
  }, [visible, world, duration, delay, triggerKey, config, onComplete])

  return (
    <aside
      ref={bubbleRef}
      className={`thought-bubble thought-bubble--${world}`}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <div className="thought-bubble__inner">
        <p className="thought-bubble__text">{textMessage}</p>
      </div>
      <div className="thought-bubble__tail" aria-hidden="true">
        <svg
          className="thought-bubble__tail-svg"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
        >
          <path
            d="M0 0 L14 12 L7 0 Z"
            fill="var(--bubble-bg)"
            stroke="var(--bubble-border)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </aside>
  )
}

export default ThoughtBubble
