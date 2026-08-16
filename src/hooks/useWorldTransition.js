import { useCallback, useRef, useState } from 'react'
import {
  getTransitionConfig,
  getTransitionDirection,
} from '../data/transitionConfigs.js'

function useWorldTransition(initialWorld) {
  const isTransitioningRef = useRef(false)
  const [currentWorld, setCurrentWorld] = useState(initialWorld)
  const [targetWorld, setTargetWorld] = useState(null)
  const [fromWorld, setFromWorld] = useState(null)
  const [transitionState, setTransitionState] = useState('idle')
  const [transitionDirection, setTransitionDirection] = useState(null)
  const [transitionConfig, setTransitionConfig] = useState(null)

  const isTransitioning = transitionState === 'running'

  const startTransition = useCallback(
    (nextWorld) => {
      if (
        isTransitioningRef.current ||
        isTransitioning ||
        nextWorld === currentWorld
      ) {
        return
      }

      isTransitioningRef.current = true
      setFromWorld(currentWorld)
      setTargetWorld(nextWorld)
      setTransitionDirection(getTransitionDirection(currentWorld, nextWorld))
      setTransitionConfig(getTransitionConfig(currentWorld, nextWorld))
      setTransitionState('running')
    },
    [currentWorld, isTransitioning],
  )

  const swapToTargetWorld = useCallback(() => {
    setCurrentWorld((world) => targetWorld ?? world)
  }, [targetWorld])

  const completeTransition = useCallback(() => {
    isTransitioningRef.current = false
    setFromWorld(null)
    setTargetWorld(null)
    setTransitionDirection(null)
    setTransitionConfig(null)
    setTransitionState('idle')
  }, [])

  return {
    currentWorld,
    targetWorld,
    fromWorld,
    transitionState,
    transitionDirection,
    transitionConfig,
    isTransitioning,
    startTransition,
    swapToTargetWorld,
    completeTransition,
  }
}

export default useWorldTransition
