import { useCallback, useEffect, useRef, useState } from 'react'
import { getThoughtMessage } from '../data/thoughtConfig.js'

/**
 * Custom hook to manage deterministic world thought progression and replay state.
 *
 * Rules:
 * - Every world has 5 deterministic messages: messageIndex = (visitCount - 1) % 5
 * - Independent visit counters per world.
 * - Only genuine world changes increment that specific world's counter.
 * - Re-renders and Replay button clicks NEVER increment the counter.
 * - Replay restarts the thought animation with the exact current message.
 *
 * @param {string} currentWorld - Active world ID ('about'|'coding'|'mythos'|'majestic')
 */
export function useWorldThoughts(currentWorld) {
  const [visitCounts, setVisitCounts] = useState({
    about: 1,
    coding: 0,
    mythos: 0,
    majestic: 0,
  })

  const [triggerKey, setTriggerKey] = useState(1)
  const prevWorldRef = useRef(currentWorld)
  const isFirstMountRef = useRef(true)

  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false
      return
    }

    if (currentWorld !== prevWorldRef.current) {
      prevWorldRef.current = currentWorld
      setVisitCounts((prev) => ({
        ...prev,
        [currentWorld]: (prev[currentWorld] || 0) + 1,
      }))
      setTriggerKey((k) => k + 1)
    }
  }, [currentWorld])

  const activeCount = visitCounts[currentWorld] || 1
  const { message: currentMessage, index: currentMessageIndex } = getThoughtMessage(
    currentWorld,
    activeCount
  )

  const replayCurrentThought = useCallback(() => {
    setTriggerKey((k) => k + 1)
  }, [])

  return {
    currentMessage,
    currentMessageIndex,
    visitCount: activeCount,
    visitCounts,
    triggerKey,
    replayCurrentThought,
  }
}

export default useWorldThoughts
