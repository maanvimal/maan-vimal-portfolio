import { useRef } from 'react'
import './App.css'
import World from './components/World.jsx'
import WorldNavigation from './components/WorldNavigation.jsx'
import WorldTransition from './components/WorldTransition.jsx'
import { getWorld, worlds } from './data/worldThemes.js'
import useWorldTransition from './hooks/useWorldTransition.js'

function App() {
  const worldElementRef = useRef(null)
  const {
    completeTransition,
    currentWorld,
    fromWorld,
    isTransitioning,
    startTransition,
    swapToTargetWorld,
    targetWorld,
    transitionConfig,
    transitionDirection,
    transitionState,
  } = useWorldTransition('about')
  const currentWorldTheme = getWorld(currentWorld)
  const themeStyles = {
    '--theme-background': currentWorldTheme.colors.background,
    '--theme-text': currentWorldTheme.colors.text,
    '--theme-text-muted': currentWorldTheme.colors.textMuted,
    '--theme-accent': currentWorldTheme.colors.accent,
    '--theme-surface': currentWorldTheme.colors.surface,
  }

  return (
    <main className="world-engine" style={themeStyles}>
      <WorldNavigation
        activeWorld={currentWorld}
        disabled={isTransitioning}
        onWorldChange={startTransition}
        worlds={worlds}
      />
      <World world={currentWorldTheme} worldElementRef={worldElementRef} />
      <WorldTransition
        fromWorld={fromWorld}
        toWorld={targetWorld}
        transitionState={transitionState}
        transitionDirection={transitionDirection}
        transitionConfig={transitionConfig}
        worldElementRef={worldElementRef}
        onSwapWorld={swapToTargetWorld}
        onTransitionComplete={completeTransition}
      />
    </main>
  )
}

export default App
