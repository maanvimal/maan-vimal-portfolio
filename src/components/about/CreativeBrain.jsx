import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import BrainRibbons from './BrainRibbons.jsx'
import BrainEnergy from './BrainEnergy.jsx'
import BrainFragments from './BrainFragments.jsx'

function CreativeBrain({ sceneStateRef }) {
  const masterGroupRef = useRef(null)

  // Current interpolated transformation values
  const currentPos = useRef(new THREE.Vector3(1.1, 0.15, -0.6))
  const currentScale = useRef(1.0)
  const currentRotY = useRef(0.15)
  const currentRotX = useRef(0.08)

  useFrame((_, delta) => {
    if (!masterGroupRef.current || !sceneStateRef?.current) return

    const { targetState, isMobile } = sceneStateRef.current
    const targetBrain = targetState?.brain || {
      position: [1.1, 0.15, -0.6],
      scale: 1.0,
      rotY: 0.15,
      rotX: 0.08,
    }

    // Responsive position & scale: on mobile, center in viewport behind hero
    const targetX = isMobile ? 0.0 : targetBrain.position[0]
    const targetY = isMobile ? 0.45 : targetBrain.position[1]
    const targetZ = targetBrain.position[2]
    const scaleMultiplier = isMobile ? 0.72 : 1.0
    const targetScaleVal = targetBrain.scale * scaleMultiplier

    // Smooth exponential damping
    const lerpFactor = Math.min(delta * 3.5, 0.1)
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, lerpFactor)
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, lerpFactor)
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, lerpFactor)
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScaleVal, lerpFactor)
    currentRotY.current = THREE.MathUtils.lerp(currentRotY.current, targetBrain.rotY, lerpFactor)
    currentRotX.current = THREE.MathUtils.lerp(currentRotX.current, targetBrain.rotX, lerpFactor)

    masterGroupRef.current.position.copy(currentPos.current)
    masterGroupRef.current.scale.setScalar(currentScale.current)
    masterGroupRef.current.rotation.y = currentRotY.current
    masterGroupRef.current.rotation.x = currentRotX.current
  })

  return (
    <group ref={masterGroupRef} position={[1.1, 0.15, -0.6]}>
      {/* 1. Organic Flowing Golden Brain Ribbons */}
      <BrainRibbons sceneStateRef={sceneStateRef} />

      {/* 2. Soft Internal Cognitive Light & Flowing Energy Streams */}
      <BrainEnergy sceneStateRef={sceneStateRef} />

      {/* 3. Sparse Floating Abstract Idea Fragments */}
      <BrainFragments sceneStateRef={sceneStateRef} />
    </group>
  )
}

export default CreativeBrain
