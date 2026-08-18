import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MYTHOS_THEME } from '../../data/mythosBookConfig.js'

const PARTICLE_COUNT = 40
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3)

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const seed1 = Math.sin(i * 51.78) * 43758.5453
  const seed2 = Math.sin(i * 19.34) * 43758.5453
  const seed3 = Math.sin(i * 83.12) * 43758.5453
  const r1 = seed1 - Math.floor(seed1)
  const r2 = seed2 - Math.floor(seed2)
  const r3 = seed3 - Math.floor(seed3)

  // Spatial distribution mostly in the background and surrounding space
  PARTICLE_POSITIONS[i * 3 + 0] = (r1 - 0.5) * 9.5
  PARTICLE_POSITIONS[i * 3 + 1] = (r2 - 0.5) * 7.5
  PARTICLE_POSITIONS[i * 3 + 2] = (r3 - 0.6) * 5.0 - 0.5
}

export function MythosParticles({ sceneStateRef }) {
  const particlesRef = useRef(null)

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(PARTICLE_POSITIONS.slice(), 3))
    return geom
  }, [])

  useFrame(({ clock }) => {
    if (!particlesRef.current || sceneStateRef?.current?.reducedMotion) return
    const time = clock.getElapsedTime() * 0.12
    const pos = particlesRef.current.geometry.attributes.position

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y = pos.getY(i)
      const newY = y - 0.0012
      pos.setY(i, newY < -4.0 ? 4.0 : newY)
      pos.setX(i, pos.getX(i) + Math.sin(time + i * 0.4) * 0.0006)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        color={MYTHOS_THEME.particleWhite}
        size={0.036}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fog={false}
      />
    </points>
  )
}

export default MythosParticles
