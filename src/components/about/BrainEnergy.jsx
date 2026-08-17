import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BRAIN_STRANDS, BRAIN_THEME } from '../../data/aboutBrainConfig.js'

function BrainEnergy({ sceneStateRef }) {
  const energyPulsesRef = useRef([])
  const innerLightRef = useRef(null)

  // Select 6 prominent cortical ribbon curves for energy traversal
  const energyCurves = useMemo(() => {
    const indices = [0, 1, 4, 5, 8, 9]
    return indices.map((idx) => {
      const strand = BRAIN_STRANDS[idx % BRAIN_STRANDS.length]
      const vPoints = strand.points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
      return {
        curve: new THREE.CatmullRomCurve3(vPoints, false, 'centripetal', 0.5),
        speed: 0.12 + (idx % 3) * 0.04,
        offset: (idx * 0.18) % 1.0,
      }
    })
  }, [])

  const progressRefs = useRef(energyCurves.map((c) => c.offset))

  useFrame((state, delta) => {
    if (!sceneStateRef?.current) return
    const { reducedMotion } = sceneStateRef.current

    const t = state.clock.elapsedTime

    // 1. Warm internal cognitive point light breathing
    if (innerLightRef.current) {
      const baseIntensity = reducedMotion ? 1.4 : 1.4 + Math.sin(t * 1.6) * 0.35
      innerLightRef.current.intensity = baseIntensity
    }

    if (reducedMotion) return

    // 2. Gliding luminous energy streams
    energyCurves.forEach((item, idx) => {
      const pulseMesh = energyPulsesRef.current[idx]
      if (!pulseMesh) return

      progressRefs.current[idx] = (progressRefs.current[idx] + delta * item.speed) % 1.0
      const p = progressRefs.current[idx]

      const point = item.curve.getPointAt(p)
      pulseMesh.position.copy(point)

      // Smooth fade at ends of the curve
      const fade = Math.sin(p * Math.PI)
      if (pulseMesh.material) {
        pulseMesh.material.opacity = fade * 0.85
      }
    })
  })

  return (
    <group>
      {/* 1. Internal Cognitive Warm Golden Core Light */}
      <pointLight
        ref={innerLightRef}
        color={BRAIN_THEME.brightGold}
        intensity={1.6}
        distance={4.5}
        decay={2}
        position={[0, 0.1, 0]}
      />

      {/* 2. Traveling Organic Energy Pulses */}
      {energyCurves.map((_, idx) => (
        <mesh
          key={`energy-${idx}`}
          ref={(el) => {
            energyPulsesRef.current[idx] = el
          }}
        >
          <sphereGeometry args={[0.042, 12, 12]} />
          <meshBasicMaterial
            color={BRAIN_THEME.luminousGold}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  )
}

export default BrainEnergy
