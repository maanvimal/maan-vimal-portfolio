function World({ world }) {
  return (
    <section className="world" aria-live="polite">
      <div className="world__content">
        <p className="world__label">Active world</p>
        <h1>{world.name}</h1>
        <p className="world__identity">{world.identity}</p>
        <p>{world.description}</p>
      </div>
    </section>
  )
}

export default World
