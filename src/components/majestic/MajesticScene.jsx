import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CAMERA_CONFIG, MAJESTIC_THEME } from '../../data/majesticSceneConfig.js'
import useMajesticScene from '../../hooks/useMajesticScene.js'
import MajesticCamera from './MajesticCamera.jsx'
import MonumentalFrame from './MonumentalFrame.jsx'

/**
 * Dynamic Champagne Rim Light that travels smoothly around the complete 3D perimeter of the frame.
 * Illuminates top molding -> upper-right corner -> right vertical molding -> lower-right corner ->
 * bottom molding -> lower-left corner -> left vertical molding -> upper-left corner with scroll.
 */
function DynamicChampagneRimLight({ sceneStateRef }) {
  const lightRef = useRef(null)
  const currentPos = useRef(new THREE.Vector3(0.5, 1.85, 1.4))
  const currentIntensity = useRef(0.85)

  useFrame((_, delta) => {
    if (!sceneStateRef?.current || !lightRef.current) return

    const { targetState, reducedMotion } = sceneStateRef.current
    const targetPos = targetState?.rimLightPos ?? [0.5, 1.85, 1.4]
    const targetInt = targetState?.rimLightIntensity ?? 0.85

    const lerpFactor = reducedMotion ? 1.0 : Math.min(delta * 2.5, 0.075)

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetPos[0], lerpFactor)
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetPos[1], lerpFactor)
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetPos[2], lerpFactor)

    currentIntensity.current = THREE.MathUtils.lerp(currentIntensity.current, targetInt, lerpFactor)

    lightRef.current.position.copy(currentPos.current)
    lightRef.current.intensity = currentIntensity.current
  })

  return (
    <pointLight
      ref={lightRef}
      color={MAJESTIC_THEME.rimChampagne}
      distance={6.5}
      decay={2}
    />
  )
}

/**
 * STEP 8: TRAVELLING FRAME LIGHT TEST
 * Monumental Frame + Camera + Dynamic Perimeter Travelling Champagne Rim Light.
 */
export function MajesticScene() {
  const { sceneStateRef } = useMajesticScene()

  return (
    <div className="majestic-scene-container" aria-hidden="true">
      <Canvas
        camera={{
          position: CAMERA_CONFIG.position,
          fov: CAMERA_CONFIG.fov,
          near: 0.1,
          far: 25,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Seamless Deep Black Void Fog Boundary */}
        <fog attach="fog" args={[MAJESTIC_THEME.fogColor, 4.5, 18.0]} />

        {/* Dark Warm Ambient Light */}
        <ambientLight intensity={0.35} color={MAJESTIC_THEME.ambientWarm} />

        {/* Directional Key Light */}
        <directionalLight position={[2.0, 4.5, 4.2]} intensity={1.05} color={MAJESTIC_THEME.keyLight} />

        {/* Dynamic Perimeter Travelling Champagne Rim Light */}
        <DynamicChampagneRimLight sceneStateRef={sceneStateRef} />

        {/* Subtle Shadow Fill Light */}
        <directionalLight position={[-3.5, 2.0, 1.5]} intensity={0.25} color="#151210" />

        {/* Camera Controller */}
        <MajesticCamera sceneStateRef={sceneStateRef} />

        {/* Monumental Frame with Solid Black Interior */}
        <MonumentalFrame sceneStateRef={sceneStateRef} />
      </Canvas>
    </div>
  )
}

export default MajesticScene
