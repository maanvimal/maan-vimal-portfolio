import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BRAIN_STRANDS, BRAIN_THEME } from '../../data/aboutBrainConfig.js'

function BrainRibbons({ sceneStateRef }) {
  const groupRef = useRef(null)

  // Precompute smooth CatmullRom curves and tube geometries once
  const ribbonMeshes = useMemo(() => {
    return BRAIN_STRANDS.map((strand) => {
      const vPoints = strand.points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
      const curve = new THREE.CatmullRomCurve3(vPoints, false, 'centripetal', 0.5)
      const geometry = new THREE.TubeGeometry(curve, 36, strand.radius, 7, false)

      let color = BRAIN_THEME.primaryGold
      let emissive = '#33240a'
      let emissiveIntensity = 0.15

      if (strand.colorType === 'bright') {
        color = BRAIN_THEME.brightGold
        emissive = BRAIN_THEME.primaryGold
        emissiveIntensity = 0.35
      } else if (strand.colorType === 'luminous') {
        color = BRAIN_THEME.luminousGold
        emissive = BRAIN_THEME.warmAmber
        emissiveIntensity = 0.25
      } else if (strand.colorType === 'warm') {
        color = BRAIN_THEME.warmAmber
        emissive = '#281a04'
        emissiveIntensity = 0.1
      }

      return {
        geometry,
        color,
        emissive,
        emissiveIntensity,
      }
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current || !sceneStateRef?.current) return
    const { reducedMotion } = sceneStateRef.current
    if (reducedMotion) return

    const t = state.clock.elapsedTime

    // 1. Organic slow cognitive breathing rhythm
    const breathScale = 1.0 + Math.sin(t * 1.2) * 0.02
    groupRef.current.scale.set(breathScale, breathScale * 1.01, breathScale)

    // 2. Extremely subtle internal undulation
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.03
    groupRef.current.rotation.x = Math.cos(t * 0.28) * 0.02
  })

  return (
    <group ref={groupRef}>
      {ribbonMeshes.map((meshData, idx) => (
        <mesh key={`ribbon-${idx}`} geometry={meshData.geometry}>
          <meshStandardMaterial
            color={meshData.color}
            emissive={meshData.emissive}
            emissiveIntensity={meshData.emissiveIntensity}
            roughness={0.22}
            metalness={0.88}
            envMapIntensity={1.2}
          />
        </mesh>
      ))}
    </group>
  )
}

export default BrainRibbons
