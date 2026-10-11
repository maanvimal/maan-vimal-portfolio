import { useEffect, useRef } from 'react'

/**
 * Reusable Cinematic Image Lightbox Overlay
 * Displays original high-resolution campaign artwork within 80-85% viewport bounds.
 * Accessible with Escape dismissal, backdrop click dismissal, focus trap return, and no background scrolling.
 */
export function CampaignLightbox({ activeImage, onClose, triggerRef }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!activeImage) return

    // 1. Prevent background scrolling while overlay is active
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Capture current trigger element for focus return
    const triggerElement = triggerRef?.current

    // 2. Keyboard dismissal with Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // 3. Move initial focus to the close button
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)

      // 4. Return focus to trigger element when closed
      if (triggerElement) {
        triggerElement.focus()
      }
    }
  }, [activeImage, onClose, triggerRef])

  if (!activeImage) return null

  return (
    <div
      className="campaign-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={activeImage.title || 'Campaign Image Preview'}
      onClick={onClose}
    >
      {/* Dark Ambient Backdrop */}
      <div className="campaign-lightbox__backdrop" aria-hidden="true" />

      {/* Floating Close Button in Upper-Right Viewport */}
      <button
        ref={closeButtonRef}
        type="button"
        className="campaign-lightbox__close-btn"
        onClick={onClose}
        aria-label="Close image preview"
      >
        <span className="campaign-lightbox__close-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
        <span className="campaign-lightbox__close-label">CLOSE</span>
      </button>

      {/* Centered Media Frame (Clicks inside do NOT close) */}
      <div
        className="campaign-lightbox__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="campaign-lightbox__frame">
          {/* Corner optical reticles */}
          <span className="campaign-reticle campaign-reticle--tl" aria-hidden="true" />
          <span className="campaign-reticle campaign-reticle--tr" aria-hidden="true" />
          <span className="campaign-reticle campaign-reticle--bl" aria-hidden="true" />
          <span className="campaign-reticle campaign-reticle--br" aria-hidden="true" />

          <img
            className="campaign-lightbox__image"
            src={activeImage.src}
            alt={activeImage.caption || activeImage.title}
          />
        </div>

        {/* Editorial Caption Bar */}
        {(activeImage.code || activeImage.title || activeImage.caption) && (
          <div className="campaign-lightbox__meta">
            <div className="campaign-lightbox__header">
              {activeImage.code && (
                <span className="campaign-lightbox__code">{activeImage.code}</span>
              )}
              {activeImage.title && (
                <h4 className="campaign-lightbox__title">{activeImage.title}</h4>
              )}
            </div>
            {activeImage.caption && activeImage.caption !== activeImage.title && (
              <p className="campaign-lightbox__caption">{activeImage.caption}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
