import { useEffect, useRef, useState } from 'react'
import './App.css'
import WhyHireMeExperience from './components/WhyHireMeExperience.jsx'
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
  const [isWhyHireMeOpen, setIsWhyHireMeOpen] = useState(false)

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

  const {
    currentMessage: thoughtMessage,
    triggerKey: thoughtTriggerKey,
    replayCurrentThought,
    visitCounts,
  } = useWorldThoughts(currentWorld)

  // Why Hire Me Unlocks when all 4 unique worlds have been visited at least once
  const isWhyHireMeUnlocked = Boolean(
    visitCounts &&
    visitCounts.about >= 1 &&
    visitCounts.coding >= 1 &&
    visitCounts.mythos >= 1 &&
    visitCounts.majestic >= 1
  )

  const hasAnimatedUnlockRef = useRef(false)
  const [isWhyHireMeAwakening, setIsWhyHireMeAwakening] = useState(false)

  // One-time golden awakening animation when unlock condition is first reached
  useEffect(() => {
    if (isWhyHireMeUnlocked && !hasAnimatedUnlockRef.current) {
      hasAnimatedUnlockRef.current = true
      const startTimer = setTimeout(() => {
        setIsWhyHireMeAwakening(true)
      }, 50)
      const endTimer = setTimeout(() => {
        setIsWhyHireMeAwakening(false)
      }, 2250)
      return () => {
        clearTimeout(startTimer)
        clearTimeout(endTimer)
      }
    }
  }, [isWhyHireMeUnlocked])

  // Pause world background music while Why Hire Me theater is active; resume on close
  useWorldBackgroundMusic({
    currentWorld,
    isTransitioning,
    isMusicEnabled: isMusicEnabled && !isWhyHireMeOpen,
  })

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
          key={currentWorld}
          isMusicEnabled={isMusicEnabled}
          isTransitionsEnabled={isTransitionsEnabled}
          isWhyHireMeUnlocked={isWhyHireMeUnlocked}
          isWhyHireMeAwakening={isWhyHireMeAwakening}
          onToggleMusic={() => setIsMusicEnabled((prev) => !prev)}
          onToggleTransitions={() => setIsTransitionsEnabled((prev) => !prev)}
          onReplayThought={replayCurrentThought}
          onOpenWhyHireMe={() => setIsWhyHireMeOpen(true)}
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
      <WhyHireMeExperience
        isOpen={isWhyHireMeOpen}
        onClose={() => setIsWhyHireMeOpen(false)}
      />
    </main>
  )
}

export default App
