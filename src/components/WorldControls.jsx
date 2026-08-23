function WorldControls({
  isMusicEnabled,
  isTransitionsEnabled,
  onToggleMusic,
  onToggleTransitions,
  onReplayThought,
}) {
  return (
    <div className="world-controls" aria-label="Global preferences">
      <button
        type="button"
        className={`world-control-btn ${isMusicEnabled ? 'is-active' : 'is-muted'}`}
        aria-label={isMusicEnabled ? 'Mute background music' : 'Enable background music'}
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
        aria-label={isTransitionsEnabled ? 'Disable transitions' : 'Enable transitions'}
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
        aria-label="Replay Phoenix thought"
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
    </div>
  )
}

export default WorldControls
