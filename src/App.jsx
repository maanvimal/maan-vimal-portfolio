import { useRef, useState } from 'react'
import './App.css'
import World from './components/World.jsx'
import WorldControls from './components/WorldControls.jsx'
import WorldNavigation from './components/WorldNavigation.jsx'
import WorldTransition from './components/WorldTransition.jsx'
import { getWorld, worlds } from './data/worldThemes.js'
import useWorldBackgroundMusic from './hooks/useWorldBackgroundMusic.js'
import useWorldThoughts from './hooks/useWorldThoughts.js'
import useWorldTransition from './hooks/useWorldTransition.js'

function App() {
  const worldElementRef = useRef(null)
  const [isMusicEnabled, setIsMusicEnabled] = useState(true)
  const [isTransitionsEnabled, setIsTransitionsEnabled] = useState(true)

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

  useWorldBackgroundMusic({
    currentWorld,
    isTransitioning,
    isMusicEnabled,
  })

  const {
    currentMessage: thoughtMessage,
    triggerKey: thoughtTriggerKey,
    replayCurrentThought,
  } = useWorldThoughts(currentWorld)

  const handleWorldChange = (nextWorld) => {
    startTransition(nextWorld, { skipAnimation: !isTransitionsEnabled })
  }

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
      <header className="world-header">
        <WorldNavigation
          activeWorld={currentWorld}
          disabled={isTransitioning}
          onWorldChange={handleWorldChange}
          worlds={worlds}
        />
        <WorldControls
          isMusicEnabled={isMusicEnabled}
          isTransitionsEnabled={isTransitionsEnabled}
          onToggleMusic={() => setIsMusicEnabled((prev) => !prev)}
          onToggleTransitions={() => setIsTransitionsEnabled((prev) => !prev)}
          onReplayThought={replayCurrentThought}
        />
      </header>
      <World
        onWorldChange={handleWorldChange}
        thoughtMessage={thoughtMessage}
        thoughtTriggerKey={thoughtTriggerKey}
        world={currentWorldTheme}
        worldElementRef={worldElementRef}
      />
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
