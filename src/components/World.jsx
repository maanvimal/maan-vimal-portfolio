import { useLayoutEffect } from 'react'
import AboutWorldContent from './AboutWorldContent.jsx'
import CodingWorldContent from './CodingWorldContent.jsx'
import MajesticWorldContent from './MajesticWorldContent.jsx'
import MythosWorldContent from './MythosWorldContent.jsx'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import { getPortrait } from '../data/portraitConfig.js'

function World({ world, worldElementRef }) {
  const portrait = getPortrait(world.id)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [world.id])

  return (
    <section
      ref={worldElementRef}
      className={`world world--${world.id}`}
      aria-live="polite"
    >
      <div className="world__environment" aria-hidden="true" />
      {world.id === 'about' ? (
        <AboutWorldContent portrait={portrait} />
      ) : world.id === 'coding' ? (
        <CodingWorldContent portrait={portrait} />
      ) : world.id === 'mythos' ? (
        <MythosWorldContent portrait={portrait} />
      ) : world.id === 'majestic' ? (
        <MajesticWorldContent portrait={portrait} />
      ) : (
        <>
          <PhoenixPortrait portrait={portrait} worldId={world.id} />
          <div className="world__content">
            <p className="world__label">Active world</p>
            <h1>{world.name}</h1>
            <p className="world__identity">{world.identity}</p>
            <p>{world.description}</p>
          </div>
        </>
      )}
    </section>
  )
}

export default World
