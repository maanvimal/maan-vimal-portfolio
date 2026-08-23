import { globalContent } from '../data/portfolioContent.js'

function WorldNavigation({ activeWorld, disabled, onWorldChange, worlds }) {
  return (
    <nav className="world-navigation" aria-label={globalContent.navigation.ariaLabel}>
      {worlds.map((world) => (
        <button
          key={world.id}
          type="button"
          className={activeWorld === world.id ? 'is-active' : ''}
          aria-pressed={activeWorld === world.id}
          disabled={disabled}
          onClick={() => onWorldChange(world.id)}
        >
          {world.name.toUpperCase()}
        </button>
      ))}
    </nav>
  )
}

export default WorldNavigation
