import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { CAMERA_CONFIG } from '../../data/mythosBookConfig.js'

export function MythosCamera({ sceneStateRef }) {
  const { camera } = useThree()
  const currentCamPos = useRef(new THREE.Vector3(...CAMERA_CONFIG.position))
  const currentLookAt = useRef(new THREE.Vector3(...CAMERA_CONFIG.lookAt))

  useFrame((_, delta) => {
    if (!sceneStateRef?.current) return

    const { targetState, mouse, reducedMotion, isMobile, isTablet } = sceneStateRef.current
    const targetCam = targetState?.camera || CAMERA_CONFIG

    // Smooth mouse parallax damping
    if (!reducedMotion && !isMobile) {
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.04)
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.04)
    } else {
      mouse.x = 0
      mouse.y = 0
    }

    const mouseOffsetX = mouse.x * 0.22
    const mouseOffsetY = mouse.y * 0.14

    const targetX = (isMobile ? 0.0 : targetCam.position[0]) + mouseOffsetX
    const targetY = (isMobile ? 0.45 : targetCam.position[1]) + mouseOffsetY
    const targetZ = isMobile ? targetCam.position[2] + 0.8 : isTablet ? targetCam.position[2] + 0.3 : targetCam.position[2]

    const lerpFactor = Math.min(delta * 3.0, 0.1)
    currentCamPos.current.x = THREE.MathUtils.lerp(currentCamPos.current.x, targetX, lerpFactor)
    currentCamPos.current.y = THREE.MathUtils.lerp(currentCamPos.current.y, targetY, lerpFactor)
    currentCamPos.current.z = THREE.MathUtils.lerp(currentCamPos.current.z, targetZ, lerpFactor)

    const lookTargetX = targetCam.lookAt[0]
    const lookTargetY = isMobile ? 0.0 : targetCam.lookAt[1]
    const lookTargetZ = targetCam.lookAt[2]

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookTargetX, lerpFactor)
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookTargetY, lerpFactor)
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookTargetZ, lerpFactor)

    camera.position.copy(currentCamPos.current)
    camera.lookAt(currentLookAt.current)
  })

  return null
}

export default MythosCamera
