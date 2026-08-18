import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BOOK_CONFIG, MYTHOLOGY_PAGES } from '../../data/mythosBookConfig.js'
import { createManuscriptArtwork, createManuscriptGlowArtwork } from './ManuscriptArtwork.jsx'

/**
 * Creates double-sided curved physical turning leaf geometry with spine hinge anchor at x = 0.
 * Unified geometry across all leaves and base folios ensures zero Z-clipping or vertex discrepancy.
 */
function createTurningLeafGeometry(isRecto = true) {
  const width = BOOK_CONFIG.pageWidth
  const height = BOOK_CONFIG.pageHeight
  const segmentsX = 32
  const segmentsY = 20

  const geo = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY)
  const pos = geo.attributes.position

  for (let i = 0; i < pos.count; i++) {
    const xOrig = pos.getX(i) // -width/2 to +width/2
    const yOrig = pos.getY(i) // -height/2 to +height/2

    const u = (xOrig + width / 2) / width // 0 at spine to 1 at outer edge
    const v = (yOrig + height / 2) / height

    // Natural page curvature arch
    const arch = Math.sin(u * Math.PI * 0.75) * 0.05
    const edgeLift = Math.pow(u, 2.0) * (Math.sin(v * Math.PI) * 0.012)
    const gutterDip = Math.pow(1 - u, 2.0) * -0.014

    pos.setZ(i, (isRecto ? 1 : -1) * (arch + edgeLift + gutterDip) + (isRecto ? 0.002 : -0.002))
  }

  // Anchor inner edge at x = 0 (spine hinge)
  geo.translate(width * 0.5, 0, 0)
  geo.computeVertexNormals()
  return geo
}

/**
 * Single Physical Double-Sided Turning Leaf (Pass M2)
 * Recto = Active Mythology Chapter (Pure Black Base + Luminous Bronze/Amber Relief)
 * Glow Overlay = Additive Luminous Glow Layer (Radiant Amber/Gold Optical Bloom)
 * Verso = Dark Quiet Left Folio
 */
function PhysicalLeaf({ leafIndex, rectoTexture, glowTexture, versoTexture, currentTurnProgressRef }) {
  const leafRef = useRef(null)

  const rectoGeo = useMemo(() => createTurningLeafGeometry(true), [])
  const versoGeo = useMemo(() => createTurningLeafGeometry(false), [])

  const rectoMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: rectoTexture,
        roughness: 0.55,
        metalness: 0.20,
        side: THREE.FrontSide,
      }),
    [rectoTexture],
  )

  // Pure Additive Luminous Glow Overlay (Transparent, zero depth write, optical bloom)
  const glowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: glowTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        side: THREE.FrontSide,
      }),
    [glowTexture],
  )

  const versoMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: versoTexture,
        roughness: 0.88,
        metalness: 0.05,
        side: THREE.BackSide,
      }),
    [versoTexture],
  )

  useFrame(() => {
    if (!leafRef.current) return

    const overallPage = currentTurnProgressRef?.current ?? 0
    // Bi-directional progress for this specific leaf: 0 = fully right (active story), 1 = fully left (turned)
    const rawProgress = Math.max(0, Math.min(1, overallPage - leafIndex))

    const openAngle = BOOK_CONFIG.openAngle
    const rightAngle = -openAngle
    const leftAngle = -Math.PI + openAngle

    const currentAngle = THREE.MathUtils.lerp(rightAngle, leftAngle, rawProgress)
    leafRef.current.rotation.y = currentAngle

    // Mid-turn lift in Z (parchment arches forward as it turns across the spine)
    const archLift = Math.sin(rawProgress * Math.PI) * 0.28

    // Stack offset in Z:
    // Right stack: Leaf 0 is at (7-0)*0.0035 = 0.0245, Leaf 6 is at 0.0035, Base Right Folio is at 0
    // Left stack: Leaf 0 is at 1*0.0035 = 0.0035, Leaf 6 is at 7*0.0035 = 0.0245, Base Left Folio is at 0
    const totalLeaves = MYTHOLOGY_PAGES.length - 1
    const stackZ = (1 - rawProgress) * (totalLeaves - leafIndex) * 0.0035 + rawProgress * ((leafIndex + 1) * 0.0035)
    leafRef.current.position.z = stackZ + archLift

    // Slight dynamic flex during the turn
    leafRef.current.rotation.z = Math.sin(rawProgress * Math.PI) * (leafIndex % 2 === 0 ? 0.03 : -0.03)

    leafRef.current.visible = true
  })

  return (
    <group ref={leafRef} position={[0, 0, 0]}>
      {/* Front / Recto Face — Active Mythology Chapter (Carved Archaeological Relief) */}
      <mesh geometry={rectoGeo} material={rectoMat} castShadow receiveShadow />
      {/* Luminous Glow Overlay — Radiant Amber/Gold Additive Bloom */}
      <mesh geometry={rectoGeo} material={glowMat} position={[0, 0, 0.0006]} />
      {/* Back / Verso Face — Dark Quiet Left Page */}
      <mesh geometry={versoGeo} material={versoMat} castShadow receiveShadow />
    </group>
  )
}

/**
 * Sequential Turning Page System
 * Manages the complete physical manuscript turning leaves & stationary base folios.
 */
export function SequentialTurningPage({ currentTurnProgressRef }) {
  // Pre-generate base artwork textures + quiet dark left page
  const pageTextures = useMemo(() => {
    return MYTHOLOGY_PAGES.map((page) => createManuscriptArtwork(page.artworkKey))
  }, [])

  // Pre-generate transparent additive glow textures
  const glowTextures = useMemo(() => {
    return MYTHOLOGY_PAGES.map((page) => createManuscriptGlowArtwork(page.artworkKey))
  }, [])

  const quietLeftTexture = useMemo(() => {
    return createManuscriptArtwork('left_quiescent_page')
  }, [])

  // Geometries for stationary base folios (identical curvature to turning leaves)
  const baseRectoGeo = useMemo(() => createTurningLeafGeometry(true), [])
  const baseVersoGeo = useMemo(() => createTurningLeafGeometry(false), [])

  const baseRightIdx = MYTHOLOGY_PAGES.length - 1

  // Materials for stationary base folios
  const baseLeftMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: quietLeftTexture,
        roughness: 0.88,
        metalness: 0.05,
        side: THREE.BackSide,
      }),
    [quietLeftTexture],
  )

  const baseRightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: pageTextures[baseRightIdx],
        roughness: 0.55,
        metalness: 0.20,
        side: THREE.FrontSide,
      }),
    [pageTextures, baseRightIdx],
  )

  const baseRightGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: glowTextures[baseRightIdx],
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        side: THREE.FrontSide,
      }),
    [glowTextures, baseRightIdx],
  )

  const openAngle = BOOK_CONFIG.openAngle

  // Physical Turning Leaves for Chapters 1 to N-1
  const leaves = useMemo(() => {
    const count = MYTHOLOGY_PAGES.length - 1
    return Array.from({ length: count }, (_, idx) => ({
      leafIndex: idx,
      rectoTexture: pageTextures[idx],
      glowTexture: glowTextures[idx],
      versoTexture: quietLeftTexture,
    }))
  }, [pageTextures, glowTextures, quietLeftTexture])

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Base Left Folio (Bottom of left stack, visible when opened) */}
      <group position={[0, 0, 0]} rotation={[0, -Math.PI + openAngle, 0]}>
        <mesh geometry={baseVersoGeo} material={baseLeftMat} castShadow receiveShadow />
      </group>

      {/* 2. Base Right Folio (Bottom of right stack, revealed when all turning leaves turn left) */}
      <group position={[0, 0, 0]} rotation={[0, -openAngle, 0]}>
        <mesh geometry={baseRectoGeo} material={baseRightMat} castShadow receiveShadow />
        <mesh geometry={baseRectoGeo} material={baseRightGlowMat} position={[0, 0, 0.0006]} />
      </group>

      {/* 3. Physical Turning Leaves */}
      {leaves.map((leaf) => (
        <PhysicalLeaf
          key={leaf.leafIndex}
          leafIndex={leaf.leafIndex}
          rectoTexture={leaf.rectoTexture}
          glowTexture={leaf.glowTexture}
          versoTexture={leaf.versoTexture}
          currentTurnProgressRef={currentTurnProgressRef}
        />
      ))}
    </group>
  )
}

export default SequentialTurningPage
