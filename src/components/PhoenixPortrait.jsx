function PhoenixPortrait({ portrait, worldId }) {
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
    </figure>
  )
}

export default PhoenixPortrait
