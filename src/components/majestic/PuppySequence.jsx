import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FRAME_CONFIG } from '../../data/majesticSceneConfig.js'

/**
 * 12-FRAME PUPPY SEQUENCE FOR MAJESTIC WORLD
 * Lightweight static image sequence mapped to scroll progress.
 * Zero dynamic CanvasTextures, zero skeletal geometry, zero GPU crash risks.
 */
const PUPPY_SEQUENCE_PATHS = [
  '/assets/majestic/puppy-sequence/puppy_01_discovery.png',
  '/assets/majestic/puppy-sequence/puppy_02_curious.png',
  '/assets/majestic/puppy-sequence/puppy_03_step.png',
  '/assets/majestic/puppy-sequence/puppy_04_approach.png',
  '/assets/majestic/puppy-sequence/puppy_05_playful.png',
  '/assets/majestic/puppy-sequence/puppy_06_look_up.png',
  '/assets/majestic/puppy-sequence/puppy_07_wonder.png',
  '/assets/majestic/puppy-sequence/puppy_08_proud.png',
  '/assets/majestic/puppy-sequence/puppy_09_crown_arrives.png',
  '/assets/majestic/puppy-sequence/puppy_10_crown_descends.png',
  '/assets/majestic/puppy-sequence/puppy_11_crowned.png',
  '/assets/majestic/puppy-sequence/puppy_12_final.png',
]

export function PuppySequence({ sceneStateRef }) {
  const meshRef = useRef(null)
  const currentFrameRef = useRef(0)

  // 1. Preload 12 static image textures once on mount with lightweight texture config
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader()
    return PUPPY_SEQUENCE_PATHS.map((path) => {
      const tex = loader.load(path)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      return tex
    })
  }, [])

  // 2. Safe GPU texture disposal on unmount
  useEffect(() => {
    return () => {
      textures.forEach((tex) => tex.dispose())
    }
  }, [textures])

  // 3. Exact 3:4 portrait aspect ratio fitting inside the frame aperture
  const aspectHeight = (FRAME_CONFIG.innerWidth * 1448) / 1086
  const artworkGeo = useMemo(() => {
    return new THREE.PlaneGeometry(FRAME_CONFIG.innerWidth, Math.min(aspectHeight, FRAME_CONFIG.innerHeight))
  }, [aspectHeight])

  const artworkMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: textures[0] || null,
      toneMapped: false,
      side: THREE.FrontSide,
    })
  }, [textures])

  // 4. Update displayed frame smoothly according to scroll progress (0..1 -> 0..11)
  useFrame(() => {
    if (!sceneStateRef?.current || !meshRef.current) return

    const progress = sceneStateRef.current.scrollProgress ?? 0
    const frameIndex = Math.min(
      PUPPY_SEQUENCE_PATHS.length - 1,
      Math.max(0, Math.floor(progress * PUPPY_SEQUENCE_PATHS.length)),
    )

    if (currentFrameRef.current !== frameIndex && textures[frameIndex]) {
      currentFrameRef.current = frameIndex
      const mat = meshRef.current.material
      if (mat) {
        mat.map = textures[frameIndex]
        mat.needsUpdate = true
      }
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={artworkGeo}
      material={artworkMat}
      position={[0, 0, 0.008]}
    />
  )
}

export default PuppySequence
