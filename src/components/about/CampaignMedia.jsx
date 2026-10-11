import { useState } from 'react'

/**
 * Robust, luxury cinematic video player for campaign presentations.
 * Handles missing or pending media gracefully with zero console errors or broken player boxes.
 */
export function CampaignVideo({ src, title, aspect = '16:9', badge, description }) {
  const [hasError, setHasError] = useState(false)
  const isPortrait = aspect === '9:16'

  return (
    <div
      className={`campaign-video-card ${isPortrait ? 'campaign-video-card--portrait' : 'campaign-video-card--landscape'}`}
      data-video-aspect={aspect}
    >
      <div className="campaign-video-card__frame">
        {/* Film corner framing reticles */}
        <span className="campaign-reticle campaign-reticle--tl" aria-hidden="true" />
        <span className="campaign-reticle campaign-reticle--tr" aria-hidden="true" />
        <span className="campaign-reticle campaign-reticle--bl" aria-hidden="true" />
        <span className="campaign-reticle campaign-reticle--br" aria-hidden="true" />

        {/* Video Element (shown unless error) */}
        {!hasError ? (
          <video
            className="campaign-video-player"
            src={src}
            controls
            playsInline
            preload="metadata"
            aria-label={title}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="campaign-video-placeholder" aria-label={`${title} (pending master asset)`}>
            <div className="campaign-video-placeholder__glow" aria-hidden="true" />
            <div className="campaign-video-placeholder__content">
              <div className="campaign-video-placeholder__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" fillOpacity="0.2" />
                </svg>
              </div>
              <span className="campaign-video-placeholder__badge">{badge || `${aspect} FILM MASTER`}</span>
              <h4 className="campaign-video-placeholder__title">{title}</h4>
              <p className="campaign-video-placeholder__note">
                Asset target: <code>{src.split('/').pop()}</code>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="campaign-video-card__meta">
        <div className="campaign-video-card__header">
          <span className="campaign-video-card__badge">{badge || aspect}</span>
          <h4 className="campaign-video-card__title">{title}</h4>
        </div>
        {description && <p className="campaign-video-card__desc">{description}</p>}
      </div>
    </div>
  )
}

/**
 * Luxury campaign contact sheet still frame with graceful pending state and zero flash of broken icon.
 * Supports interactive enlargement via onSelect callback.
 */
export function CampaignStill({ src, title, caption, code, index, onSelect, aspect = '16:9' }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'loaded' | 'error'
  const isInteractive = Boolean(onSelect) && status !== 'error'

  const handleSelect = (e) => {
    if (isInteractive) {
      onSelect({ src, title, caption, code, index }, e.currentTarget)
    }
  }

  return (
    <figure
      className={`campaign-still-card ${isInteractive ? 'campaign-still-card--interactive' : ''}`}
      data-still-index={index}
      data-still-aspect={aspect}
    >
      <button
        type="button"
        className="campaign-still-card__trigger"
        onClick={handleSelect}
        disabled={!isInteractive}
        aria-label={isInteractive ? `Enlarge image: ${title} (${code})` : `${title} (${code})`}
      >
        <div className={`campaign-still-card__frame ${aspect === 'portrait' ? 'campaign-still-card__frame--portrait' : ''}`}>
          <span className="campaign-reticle campaign-reticle--tl" aria-hidden="true" />
          <span className="campaign-reticle campaign-reticle--br" aria-hidden="true" />

          {status !== 'error' && (
            <img
              className={`campaign-still-card__image ${status === 'loaded' ? 'is-loaded' : 'is-loading'}`}
              src={src}
              alt={caption || title}
              loading="lazy"
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
            />
          )}

          {status === 'error' && (
            <div className="campaign-still-placeholder" aria-label={`${title} (${code})`}>
              <span className="campaign-still-placeholder__code">{code}</span>
              <div className="campaign-still-placeholder__lens" aria-hidden="true">
                <div className="campaign-still-placeholder__crosshair" />
              </div>
              <span className="campaign-still-placeholder__title">{title}</span>
            </div>
          )}
        </div>
      </button>

      <figcaption className="campaign-still-card__caption">
        <span className="campaign-still-card__code">{code}</span>
        <span className="campaign-still-card__title">{title}</span>
        {caption && caption !== title && (
          <span className="campaign-still-card__text">{caption}</span>
        )}
      </figcaption>
    </figure>
  )
}
