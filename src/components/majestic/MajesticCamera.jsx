import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { CAMERA_CONFIG } from '../../data/majesticSceneConfig.js'

export function MajesticCamera({ sceneStateRef }) {
  const { camera } = useThree()
  const currentCamPos = useRef(new THREE.Vector3(...CAMERA_CONFIG.position))
  const currentLookAt = useRef(new THREE.Vector3(...CAMERA_CONFIG.lookAt))

  useFrame((_, delta) => {
    if (!sceneStateRef?.current) return

    const { targetState, mouse, reducedMotion, isMobile } = sceneStateRef.current
    const targetCam = targetState?.camera || CAMERA_CONFIG

    // Smooth mouse parallax damping (subtle 1-2 degrees max)
    if (!reducedMotion && !isMobile) {
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.05)
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.05)
    } else {
      mouse.x = 0
      mouse.y = 0
    }

    const mouseOffsetX = mouse.x * 0.14
    const mouseOffsetY = mouse.y * 0.09

    const targetX = (isMobile ? 0 : targetCam.position[0]) + mouseOffsetX
    const targetY = (isMobile ? targetCam.position[1] + 0.08 : targetCam.position[1]) + mouseOffsetY
    const targetZ = isMobile ? targetCam.position[2] + 0.4 : targetCam.position[2]

    // Slow, expensive, cinematic camera lerping
    const lerpFactor = reducedMotion ? 1.0 : Math.min(delta * 2.8, 0.08)

    currentCamPos.current.x = THREE.MathUtils.lerp(currentCamPos.current.x, targetX, lerpFactor)
    currentCamPos.current.y = THREE.MathUtils.lerp(currentCamPos.current.y, targetY, lerpFactor)
    currentCamPos.current.z = THREE.MathUtils.lerp(currentCamPos.current.z, targetZ, lerpFactor)

    const lookTargetX = isMobile ? 0 : targetCam.lookAt[0]
    const lookTargetY = isMobile ? targetCam.lookAt[1] + 0.08 : targetCam.lookAt[1]
    const lookTargetZ = targetCam.lookAt[2]

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookTargetX, lerpFactor)
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookTargetY, lerpFactor)
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookTargetZ, lerpFactor)

    camera.position.copy(currentCamPos.current)
    camera.lookAt(currentLookAt.current)
  })

  return null
}

export default MajesticCamera
