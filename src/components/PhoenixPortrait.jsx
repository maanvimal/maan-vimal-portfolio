import ThoughtBubble from './ThoughtBubble.jsx'

function PhoenixPortrait({
  portrait,
  worldId,
  thoughtMessage,
  thoughtTriggerKey = 1,
  showThought = true,
  thoughtDuration = 5000,
  thoughtDelay = 1000,
}) {
  if (!portrait.image) {
    return (
      <div
        className={`phoenix-portrait phoenix-portrait--${worldId}`}
        data-portrait-status="awaiting-asset"
        aria-hidden="true"
      />
    )
  }

  return (
    <figure
      className={`phoenix-portrait phoenix-portrait--${worldId}`}
      data-portrait-status="ready"
    >
      <img
        className="phoenix-portrait__image"
        src={portrait.image}
        alt={portrait.alt}
      />
      {showThought && (
        <ThoughtBubble
          world={worldId}
          message={thoughtMessage}
          duration={thoughtDuration}
          delay={thoughtDelay}
          triggerKey={thoughtTriggerKey}
        />
      )}
    </figure>
  )
}

export default PhoenixPortrait
