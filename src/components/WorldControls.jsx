import { useEffect, useRef, useState } from 'react'
import { globalContent } from '../data/portfolioContent.js'

function WorldControls({
  isMusicEnabled,
  isTransitionsEnabled,
  isWhyHireMeUnlocked = false,
  isWhyHireMeAwakening = false,
  onToggleMusic,
  onToggleTransitions,
  onReplayThought,
  onOpenWhyHireMe,
}) {
  const { controls } = globalContent
  const [showLockedHint, setShowLockedHint] = useState(false)
  const [isHintFadingOut, setIsHintFadingOut] = useState(false)
  const fadeTimeoutRef = useRef(null)
  const hideTimeoutRef = useRef(null)

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  const handleWhyHireMeClick = () => {
    if (isWhyHireMeUnlocked) {
      setShowLockedHint(false)
      setIsHintFadingOut(false)
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      if (onOpenWhyHireMe) {
        onOpenWhyHireMe()
      }
      return
    }

    // Locked state: show / restart 5-second visibility timer
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)

    setIsHintFadingOut(false)
    setShowLockedHint(true)

    // Begin subtle fade-out at 4.6s
    fadeTimeoutRef.current = setTimeout(() => {
      setIsHintFadingOut(true)
    }, 4600)

    // Cleanly remove at 5.0s
    hideTimeoutRef.current = setTimeout(() => {
      setShowLockedHint(false)
      setIsHintFadingOut(false)
    }, 5000)
  }

  return (
    <div className="world-controls" aria-label={controls.ariaLabel}>
      <button
        type="button"
        className={`world-control-btn ${isMusicEnabled ? 'is-active' : 'is-muted'}`}
        aria-label={isMusicEnabled ? controls.musicOnAria : controls.musicOffAria}
        aria-pressed={isMusicEnabled}
        onClick={onToggleMusic}
      >
        {isMusicEnabled ? (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
          </svg>
        ) : (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
            <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        )}
      </button>

      <button
        type="button"
        className={`world-control-btn ${isTransitionsEnabled ? 'is-active' : 'is-muted'}`}
        aria-label={isTransitionsEnabled ? controls.transitionsOnAria : controls.transitionsOffAria}
        aria-pressed={isTransitionsEnabled}
        onClick={onToggleTransitions}
      >
        {isTransitionsEnabled ? (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M3 5h4" />
            <path d="M19 17v4" />
            <path d="M17 19h4" />
          </svg>
        ) : (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        )}
      </button>

      <button
        type="button"
        className="world-control-btn is-active"
        aria-label={controls.thoughtReplayAria}
        onClick={onReplayThought}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      </button>

      <div className="world-control-wrap">
        <button
          type="button"
          className={`world-control-btn world-control-btn--why-hire-me ${
            isWhyHireMeUnlocked ? 'is-active' : 'is-locked'
          } ${isWhyHireMeAwakening ? 'is-awakening' : ''}`}
          aria-label={
            isWhyHireMeUnlocked
              ? controls.whyHireMeUnlockedAria
              : controls.whyHireMeLockedAria
          }
          aria-pressed={isWhyHireMeUnlocked}
          aria-disabled={!isWhyHireMeUnlocked}
          onClick={handleWhyHireMeClick}
        >
          <span className="why-hire-me-glyph" aria-hidden="true">
            ?
          </span>
          {isWhyHireMeAwakening && (
            <span className="why-hire-me-rays" aria-hidden="true" />
          )}
        </button>

        {showLockedHint && !isWhyHireMeUnlocked && (
          <div
            className={`why-hire-me-hint-popup ${isHintFadingOut ? 'is-fading-out' : ''}`}
            role="status"
            aria-live="polite"
          >
            <span className="why-hire-me-hint-line why-hire-me-hint-line--primary">
              to unlock
            </span>
            <span className="why-hire-me-hint-line why-hire-me-hint-line--secondary">
              visit all worlds atleast once
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorldControls
