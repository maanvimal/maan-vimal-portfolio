function WorldNavigation({ activeWorld, onWorldChange, worlds }) {
  return (
    <nav className="world-navigation" aria-label="Portfolio worlds">
      {worlds.map((world) => (
        <button
          key={world.id}
          type="button"
          className={activeWorld === world.id ? 'is-active' : ''}
          aria-pressed={activeWorld === world.id}
          onClick={() => onWorldChange(world.id)}
        >
          {world.name.toUpperCase()}
        </button>
      ))}
    </nav>
  )
}

export default WorldNavigation
