import { Canvas } from '@react-three/fiber'
import LivingBook from './LivingBook.jsx'
import MythosCamera from './MythosCamera.jsx'
import MythosParticles from './MythosParticles.jsx'
import { CAMERA_CONFIG, MYTHOS_THEME } from '../../data/mythosBookConfig.js'
import useMythosScene from '../../hooks/useMythosScene.js'

export function LivingBookScene() {
  const { sceneStateRef } = useMythosScene()

  return (
    <div className="mythos-scene-container" aria-hidden="true">
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
        {/* Deep Black Void Fog */}
        <fog attach="fog" args={[MYTHOS_THEME.backgroundBlack, 3.8, 12.0]} />

        {/* Very Subtle Dark Ambient */}
        <ambientLight intensity={0.28} color={MYTHOS_THEME.ambientBronze} />

        {/* Soft Neutral Key Light catching 3D book form and bronze ruin relief */}
        <directionalLight
          position={[1.5, 4.0, 4.2]}
          intensity={1.05}
          color={MYTHOS_THEME.directionalLight}
        />

        {/* Subtle Rim Fill */}
        <directionalLight
          position={[-3.0, 2.0, 1.5]}
          intensity={0.30}
          color="#22180e"
        />

        {/* Locked Sparse White Atmospheric Dust Motes */}
        <MythosParticles sceneStateRef={sceneStateRef} />

        {/* Cinematic Camera Controller */}
        <MythosCamera sceneStateRef={sceneStateRef} />

        {/* The Black 3D Living Book with Ruin Energy & Spatial Choreography */}
        <LivingBook sceneStateRef={sceneStateRef} />
      </Canvas>
    </div>
  )
}

export default LivingBookScene
