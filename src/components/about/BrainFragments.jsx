import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BRAIN_FRAGMENTS_CONFIG, BRAIN_THEME } from '../../data/aboutBrainConfig.js'

function BrainFragments({ sceneStateRef }) {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current || !sceneStateRef?.current) return
    const { reducedMotion } = sceneStateRef.current
    if (reducedMotion) return

    const t = state.clock.elapsedTime * 0.4
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.04
  })

  return (
    <group ref={groupRef}>
      {BRAIN_FRAGMENTS_CONFIG.map((frag, idx) => (
        <mesh
          key={`frag-${idx}`}
          position={frag.pos}
          scale={frag.scale}
          rotation={frag.rot}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={BRAIN_THEME.primaryGold}
            emissive={BRAIN_THEME.warmAmber}
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.85}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  )
}

export default BrainFragments
