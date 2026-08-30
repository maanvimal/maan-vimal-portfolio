import { useCallback, useEffect, useRef, useState } from 'react'
import { globalContent } from '../data/portfolioContent.js'

/**
 * Formats seconds into M:SS or MM:SS format.
 */
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

/**
 * Standalone Full-Screen Cinematic Video Experience for "WHY HIRE ME".
 * Sits above all portfolio worlds (z-index: 250+).
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Visibility toggle
 * @param {Function} props.onClose - Callback to exit the experience and restore world state
 */
function WhyHireMeExperience({ isOpen, onClose }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const progressBarRef = useRef(null)
  const controlsTimeoutRef = useRef(null)
  const prevActiveElementRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [bufferedPercent, setBufferedPercent] = useState(0)
  const [isEnded, setIsEnded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const { whyHireMe } = globalContent

  // 1. Body Scroll Lock & Focus Management
  useEffect(() => {
    if (!isOpen) return

    prevActiveElementRef.current = document.activeElement
    const originalOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // Focus the container
    if (containerRef.current) {
      containerRef.current.focus()
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      if (prevActiveElementRef.current && typeof prevActiveElementRef.current.focus === 'function') {
        prevActiveElementRef.current.focus()
      }
    }
  }, [isOpen])

  // 2. Playback Attempt on Mount
  useEffect(() => {
    if (!isOpen) return

    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    // User explicitly clicked the button, attempt to start playback
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setHasUserInteracted(true)
        })
        .catch(() => {
          // Autoplay policy prevented immediate playback; remains ready in paused state
        })
    }
  }, [isOpen])

  // 3. Auto-hide Controls Timer during Playback
  const resetControlsTimer = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying && !isEnded) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2600)
    }
  }, [isPlaying, isEnded])

  const handleMouseMove = useCallback(() => {
    resetControlsTimer()
  }, [resetControlsTimer])

  // 4. Video Event Handlers
  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    setCurrentTime(current)

    if (videoRef.current.buffered.length > 0 && duration > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1)
      setBufferedPercent((bufferedEnd / duration) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
    setVideoError(false)
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    setIsEnded(true)
    setShowControls(true)
  }

  const handleVideoError = () => {
    setVideoError(true)
  }

  // 5. Play / Pause / Replay Controls
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    setHasUserInteracted(true)

    if (isEnded) {
      videoRef.current.currentTime = 0
      setIsEnded(false)
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
      return
    }

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
    resetControlsTimer()
  }, [isEnded, resetControlsTimer])

  const handleReplay = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    setIsEnded(false)
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    resetControlsTimer()
  }, [resetControlsTimer])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }, [isMuted])

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value)
    setVolume(newVol)
    if (videoRef.current) {
      videoRef.current.volume = newVol
      videoRef.current.muted = newVol === 0
      setIsMuted(newVol === 0)
    }
  }

  const handleSeek = (e) => {
    if (!progressBarRef.current || !videoRef.current || !duration) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    const seekTime = percent * duration
    videoRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
    if (isEnded) {
      setIsEnded(false)
    }
  }

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }, [])

  // 6. Keyboard Shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      // Escape -> close
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      // Space / 'k' -> Play/Pause
      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault()
        togglePlay()
        return
      }

      // 'm' / 'M' -> Mute
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        toggleMute()
        return
      }

      // 'f' / 'F' -> Fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
        return
      }

      // ArrowLeft -> Seek -5s
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5)
        }
        resetControlsTimer()
        return
      }

      // ArrowRight -> Seek +5s
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (videoRef.current && duration) {
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5)
        }
        resetControlsTimer()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, togglePlay, toggleMute, toggleFullscreen, duration, resetControlsTimer])

  if (!isOpen) return null

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className={`why-hire-me-theater ${isFullscreen ? 'is-fullscreen' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={whyHireMe.title}
      tabIndex={-1}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
    >
      {/* Dark Ambient Backdrop with radial illumination */}
      <div className="why-hire-me-backdrop" aria-hidden="true" />

      {/* TOP HEADER: Title & Minimal Close Control */}
      <header className={`why-hire-me-header ${showControls || !isPlaying ? 'is-visible' : 'is-hidden'}`}>
        <div className="why-hire-me-header__brand">
          <span className="why-hire-me-header__dot" aria-hidden="true" />
          <span className="why-hire-me-header__eyebrow">{whyHireMe.eyebrow}</span>
          <h2 className="why-hire-me-header__title">{whyHireMe.title}</h2>
        </div>

        <button
          type="button"
          className="why-hire-me-close-btn"
          aria-label={whyHireMe.closeAria}
          onClick={onClose}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span className="why-hire-me-close-btn__key-hint">ESC</span>
        </button>
      </header>

      {/* VIDEO STAGE */}
      <div className="why-hire-me-stage" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="why-hire-me-video"
          src="/video/why-hire-me.mp4"
          playsInline
          preload="metadata"
          aria-label={whyHireMe.videoAria}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
        />

        {/* Center Floating Play / Replay Card when Paused or Ended */}
        {(!isPlaying || isEnded || videoError) && (
          <div
            className="why-hire-me-center-action"
            onClick={(e) => {
              e.stopPropagation()
              if (isEnded) {
                handleReplay()
              } else {
                togglePlay()
              }
            }}
          >
            <button
              type="button"
              className="why-hire-me-center-btn"
              aria-label={isEnded ? whyHireMe.replayAria : isPlaying ? whyHireMe.pauseAria : whyHireMe.playAria}
            >
              {isEnded ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              ) : (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              )}
            </button>
            <span className="why-hire-me-center-label">
              {isEnded ? 'REPLAY PRESENTATION' : !hasUserInteracted ? 'START PRESENTATION' : 'RESUME'}
            </span>
          </div>
        )}
      </div>

      {/* BOTTOM FLOATING CINEMATIC CONTROLS */}
      <footer className={`why-hire-me-controls ${showControls || !isPlaying ? 'is-visible' : 'is-hidden'}`}>
        {/* Scrubber Progress Bar */}
        <div
          ref={progressBarRef}
          className="why-hire-me-progress"
          onClick={(e) => {
            e.stopPropagation()
            handleSeek(e)
          }}
          role="slider"
          aria-label="Seek video"
          aria-valuemin="0"
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
        >
          <div className="why-hire-me-progress__track">
            <div
              className="why-hire-me-progress__buffered"
              style={{ width: `${bufferedPercent}%` }}
              aria-hidden="true"
            />
            <div
              className="why-hire-me-progress__played"
              style={{ width: `${progressPercent}%` }}
              aria-hidden="true"
            >
              <span className="why-hire-me-progress__thumb" />
            </div>
          </div>
        </div>

        {/* Control Bar Actions */}
        <div className="why-hire-me-controls__bar" onClick={(e) => e.stopPropagation()}>
          <div className="why-hire-me-controls__left">
            {/* Play / Pause Toggle */}
            <button
              type="button"
              className="why-hire-me-ctrl-btn"
              aria-label={isPlaying ? whyHireMe.pauseAria : whyHireMe.playAria}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {/* Replay */}
            <button
              type="button"
              className="why-hire-me-ctrl-btn"
              aria-label={whyHireMe.replayAria}
              onClick={handleReplay}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>

            {/* Volume / Mute */}
            <div className="why-hire-me-volume-group">
              <button
                type="button"
                className="why-hire-me-ctrl-btn"
                aria-label={isMuted ? whyHireMe.unmuteAria : whyHireMe.muteAria}
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>

              <input
                type="range"
                className="why-hire-me-volume-slider"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
              />
            </div>

            {/* Time Stamp */}
            <div className="why-hire-me-time">
              <span>{formatTime(currentTime)}</span>
              <span className="why-hire-me-time__divider">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="why-hire-me-controls__right">
            {/* Fullscreen Toggle */}
            <button
              type="button"
              className="why-hire-me-ctrl-btn"
              aria-label={whyHireMe.fullscreenAria}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WhyHireMeExperience
