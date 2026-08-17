import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CODING_THEME } from '../../data/codingSceneConfig.js'

function CodingCore({ sceneStateRef }) {
  const groupRef = useRef(null)
  const innerMeshRef = useRef(null)
  const outerCageRef = useRef(null)
  const gimbalRingRef = useRef(null)
  const pointLightRef = useRef(null)
  const coreEmissiveRef = useRef(null)

  // Current interpolated state
  const currentPos = useRef(new THREE.Vector3(1.1, 0.2, 0))
  const currentScale = useRef(0.9)
  const currentEmission = useRef(0.35)

  // Pre-generate geometries and line edges once
  const { outerEdgesGeometry, ringGeometry } = useMemo(() => {
    const icoGeo = new THREE.IcosahedronGeometry(0.52, 1)
    const edges = new THREE.EdgesGeometry(icoGeo)
    const ring = new THREE.TorusGeometry(0.7, 0.005, 8, 64)
    return { outerEdgesGeometry: edges, ringGeometry: ring }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current || !sceneStateRef?.current) return

    const { targetState, reducedMotion, isMobile } = sceneStateRef.current
    const targetCore = targetState?.core || {
      position: [0, 0, 0],
      scale: 1,
      rotSpeed: 0.004,
      emission: 0.5,
    }

    // Responsive target position & scale
    const targetX = isMobile ? 0.0 : targetCore.position[0]
    const targetY = isMobile ? 0.6 : targetCore.position[1]
    const targetZ = targetCore.position[2]
    const scaleMultiplier = isMobile ? 0.75 : 1.0
    const targetScaleVal = targetCore.scale * scaleMultiplier
    const rotSpeed = reducedMotion ? 0 : targetCore.rotSpeed

    // Smooth exponential lerp (damping)
    const lerpFactor = Math.min(delta * 4, 0.1)
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, lerpFactor)
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, lerpFactor)
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, lerpFactor)
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScaleVal, lerpFactor)
    currentEmission.current = THREE.MathUtils.lerp(
      currentEmission.current,
      targetCore.emission,
      lerpFactor,
    )

    groupRef.current.position.copy(currentPos.current)
    groupRef.current.scale.setScalar(currentScale.current)

    if (!reducedMotion) {
      // Very subtle, sophisticated multi-axis rotation
      if (innerMeshRef.current) {
        innerMeshRef.current.rotation.y += rotSpeed * 0.8
        innerMeshRef.current.rotation.x += rotSpeed * 0.4
      }
      if (outerCageRef.current) {
        outerCageRef.current.rotation.y -= rotSpeed * 0.6
        outerCageRef.current.rotation.z += rotSpeed * 0.3
      }
      if (gimbalRingRef.current) {
        gimbalRingRef.current.rotation.x += rotSpeed * 0.5
        gimbalRingRef.current.rotation.y += rotSpeed * 0.7
      }
    }

    // Subtle technical pulse in core emission
    const breath = reducedMotion ? 1 : 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.12
    const lightIntensity = currentEmission.current * 2.2 * breath

    if (pointLightRef.current) {
      pointLightRef.current.intensity = lightIntensity
    }
    if (coreEmissiveRef.current) {
      coreEmissiveRef.current.opacity = Math.min(0.9, currentEmission.current * breath)
    }
  })

  return (
    <group ref={groupRef} position={[1.1, 0.2, 0]}>
      {/* 1. Inner Faceted Core: Translucent Technical Glass */}
      <mesh ref={innerMeshRef}>
        <dodecahedronGeometry args={[0.36, 0]} />
        <meshStandardMaterial
          color="#061a0b"
          roughness={0.2}
          metalness={0.85}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 2. Outer Wireframe Cage: Restrained Electric-Green Edges */}
      <group ref={outerCageRef}>
        <lineSegments geometry={outerEdgesGeometry}>
          <lineBasicMaterial
            color={CODING_THEME.primaryGreen}
            transparent
            opacity={0.55}
            linewidth={1}
          />
        </lineSegments>
      </group>

      {/* 3. Concentric Orbital Gimbal Ring */}
      <group ref={gimbalRingRef} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <mesh geometry={ringGeometry}>
          <meshBasicMaterial
            color={CODING_THEME.primaryGreen}
            transparent
            opacity={0.28}
          />
        </mesh>
      </group>

      {/* 4. Tiny Central Glowing Prismatic Core */}
      <mesh>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial
          ref={coreEmissiveRef}
          color={CODING_THEME.brightGreen}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 5. Internal Point Light */}
      <pointLight
        ref={pointLightRef}
        color={CODING_THEME.primaryGreen}
        distance={4.0}
        decay={2}
        intensity={0.8}
      />
    </group>
  )
}

export default CodingCore
