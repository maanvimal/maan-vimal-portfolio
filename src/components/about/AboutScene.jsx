import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import CreativeBrain from './CreativeBrain.jsx'
import { BRAIN_THEME } from '../../data/aboutBrainConfig.js'
import useAboutBrain from '../../hooks/useAboutBrain.js'

function CameraController({ sceneStateRef }) {
  const { camera } = useThree()
  const currentCamPos = useRef(new THREE.Vector3(0.15, 0.1, 4.8))
  const currentLookAt = useRef(new THREE.Vector3(0.35, 0.05, 0))

  useFrame((_, delta) => {
    if (!sceneStateRef?.current) return

    const { targetState, mouse, reducedMotion, isMobile } = sceneStateRef.current
    const targetCam = targetState?.camera || { position: [0.15, 0.1, 4.8], lookAt: [0.35, 0.05, 0] }

    // Smooth subtle mouse parallax damping (1-2 degrees max)
    if (!reducedMotion && !isMobile) {
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.04)
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.04)
    } else {
      mouse.x = 0
      mouse.y = 0
    }

    const mouseOffsetX = mouse.x * 0.22
    const mouseOffsetY = mouse.y * 0.14

    const targetX = (isMobile ? 0 : targetCam.position[0]) + mouseOffsetX
    const targetY = (isMobile ? 0.2 : targetCam.position[1]) + mouseOffsetY
    const targetZ = isMobile ? targetCam.position[2] + 0.5 : targetCam.position[2]

    const lerpFactor = Math.min(delta * 3.2, 0.1)
    currentCamPos.current.x = THREE.MathUtils.lerp(currentCamPos.current.x, targetX, lerpFactor)
    currentCamPos.current.y = THREE.MathUtils.lerp(currentCamPos.current.y, targetY, lerpFactor)
    currentCamPos.current.z = THREE.MathUtils.lerp(currentCamPos.current.z, targetZ, lerpFactor)

    const lookTargetX = isMobile ? 0 : targetCam.lookAt[0]
    const lookTargetY = isMobile ? 0.2 : targetCam.lookAt[1]
    const lookTargetZ = targetCam.lookAt[2]

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookTargetX, lerpFactor)
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookTargetY, lerpFactor)
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookTargetZ, lerpFactor)

    camera.position.copy(currentCamPos.current)
    camera.lookAt(currentLookAt.current)
  })

  return null
}

function AboutScene() {
  const { sceneStateRef } = useAboutBrain()

  return (
    <div className="about-scene-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0.15, 0.1, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        {/* Cinematic Atmospheric Depth Fog */}
        <fog attach="fog" args={[BRAIN_THEME.spaceBlack, 4.0, 9.0]} />

        {/* Studio Golden Illumination Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[4, 5, 3]}
          intensity={0.75}
          color={BRAIN_THEME.brightGold}
        />
        <directionalLight
          position={[-3, -2, -2]}
          intensity={0.35}
          color={BRAIN_THEME.warmAmber}
        />
        <directionalLight
          position={[0, 4, -4]}
          intensity={0.45}
          color={BRAIN_THEME.rimGold}
        />

        {/* Active Perspective Camera Controller */}
        <CameraController sceneStateRef={sceneStateRef} />

        {/* The Creative Mind — Organic Golden Sculptural Brain */}
        <CreativeBrain sceneStateRef={sceneStateRef} />
      </Canvas>
    </div>
  )
}

export default AboutScene
