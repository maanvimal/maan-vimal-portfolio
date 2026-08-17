import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import CodingCore from './CodingCore.jsx'
import CodingNetwork from './CodingNetwork.jsx'
import { CODING_THEME } from '../../data/codingSceneConfig.js'
import useCodingScene from '../../hooks/useCodingScene.js'

function CameraController({ sceneStateRef }) {
  const { camera } = useThree()
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 5.4))
  const currentLookAt = useRef(new THREE.Vector3(0.3, 0, 0))

  useFrame((_, delta) => {
    if (!sceneStateRef?.current) return

    const { targetState, mouse, reducedMotion, isMobile } = sceneStateRef.current
    const targetCam = targetState?.camera || { position: [0, 0, 5.2], lookAt: [0, 0, 0] }

    // Smooth mouse parallax damping (1-2 degrees max)
    if (!reducedMotion && !isMobile) {
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.05)
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.05)
    } else {
      mouse.x = 0
      mouse.y = 0
    }

    const mouseOffsetX = mouse.x * 0.28
    const mouseOffsetY = mouse.y * 0.18

    const targetX = (isMobile ? 0 : targetCam.position[0]) + mouseOffsetX
    const targetY = (isMobile ? 0.2 : targetCam.position[1]) + mouseOffsetY
    const targetZ = isMobile ? targetCam.position[2] + 0.6 : targetCam.position[2]

    const lerpFactor = Math.min(delta * 3.5, 0.1)
    currentCamPos.current.x = THREE.MathUtils.lerp(currentCamPos.current.x, targetX, lerpFactor)
    currentCamPos.current.y = THREE.MathUtils.lerp(currentCamPos.current.y, targetY, lerpFactor)
    currentCamPos.current.z = THREE.MathUtils.lerp(currentCamPos.current.z, targetZ, lerpFactor)

    const lookTargetX = isMobile ? 0 : targetCam.lookAt[0]
    const lookTargetY = isMobile ? 0.3 : targetCam.lookAt[1]
    const lookTargetZ = targetCam.lookAt[2]

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookTargetX, lerpFactor)
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookTargetY, lerpFactor)
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookTargetZ, lerpFactor)

    camera.position.copy(currentCamPos.current)
    camera.lookAt(currentLookAt.current)
  })

  return null
}

// Subtle technical coordinate grid below the system
function SpatialDepthGrid() {
  const gridRef = useRef(null)
  return (
    <group position={[0, -2.6, -0.5]} rotation={[0.08, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[16, 16, '#184e2a', '#0a2312']}
        position={[0, 0, 0]}
      />
    </group>
  )
}

export function CodingScene() {
  const { sceneStateRef } = useCodingScene()

  return (
    <div className="coding-scene-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 45, near: 0.1, far: 20 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Subtle atmospheric depth fog */}
        <fog attach="fog" args={[CODING_THEME.backgroundBlack, 4.0, 9.5]} />

        {/* Minimal restrained lighting */}
        <ambientLight intensity={0.3} color="#050706" />
        <directionalLight position={[4, 5, 3]} intensity={0.4} color="#85ffaa" />

        <CameraController sceneStateRef={sceneStateRef} />
        <SpatialDepthGrid />
        <CodingCore sceneStateRef={sceneStateRef} />
        <CodingNetwork sceneStateRef={sceneStateRef} />
      </Canvas>
    </div>
  )
}

export default CodingScene
