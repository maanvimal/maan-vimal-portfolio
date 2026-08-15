import { useState } from 'react'
import './App.css'
import World from './components/World.jsx'
import WorldNavigation from './components/WorldNavigation.jsx'
import { getWorld, worlds } from './data/worldThemes.js'

function App() {
  const [activeWorld, setActiveWorld] = useState('about')
  const currentWorld = getWorld(activeWorld)
  const themeStyles = {
    '--theme-background': currentWorld.colors.background,
    '--theme-text': currentWorld.colors.text,
    '--theme-text-muted': currentWorld.colors.textMuted,
    '--theme-accent': currentWorld.colors.accent,
    '--theme-surface': currentWorld.colors.surface,
  }

  return (
    <main className="world-engine" style={themeStyles}>
      <WorldNavigation
        activeWorld={activeWorld}
        onWorldChange={setActiveWorld}
        worlds={worlds}
      />
      <World world={currentWorld} />
    </main>
  )
}

export default App
