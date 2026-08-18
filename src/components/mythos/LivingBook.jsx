import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BOOK_CONFIG, MYTHOS_THEME } from '../../data/mythosBookConfig.js'
import { createManuscriptArtwork } from './ManuscriptArtwork.jsx'
import SequentialTurningPage from './SequentialTurningPage.jsx'
import MythosRuinEmbers from './MythosRuinEmbers.jsx'

export function LivingBook({ sceneStateRef }) {
  const bookGroupRef = useRef(null)
  const currentTurnProgressRef = useRef(0.0)

  // Procedural textures for dark leather covers and gilded page edges
  const coverTexture = useMemo(() => createManuscriptArtwork('leather_cover'), [])
  const gildedEdgeTexture = useMemo(() => createManuscriptArtwork('gilded_edges'), [])

  const { pageWidth, pageHeight, pageBlockDepth, coverThickness, coverOverhang, openAngle, spineRadius, spineLength } = BOOK_CONFIG

  const coverWidth = pageWidth + coverOverhang
  const coverHeight = pageHeight + coverOverhang * 2

  // Cover board geometry anchored at x = 0
  const coverGeoLeft = useMemo(() => {
    const geo = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness)
    geo.translate(-coverWidth * 0.5, 0, -pageBlockDepth - coverThickness * 0.5)
    return geo
  }, [coverWidth, coverHeight, coverThickness, pageBlockDepth])

  const coverGeoRight = useMemo(() => {
    const geo = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness)
    geo.translate(coverWidth * 0.5, 0, -pageBlockDepth - coverThickness * 0.5)
    return geo
  }, [coverWidth, coverHeight, coverThickness, pageBlockDepth])

  // Page block wedge geometry anchored at x = 0
  const pageBlockGeoLeft = useMemo(() => {
    const geo = new THREE.BoxGeometry(pageWidth, pageHeight, pageBlockDepth)
    geo.translate(-pageWidth * 0.5, 0, -pageBlockDepth * 0.5)
    return geo
  }, [pageWidth, pageHeight, pageBlockDepth])

  const pageBlockGeoRight = useMemo(() => {
    const geo = new THREE.BoxGeometry(pageWidth, pageHeight, pageBlockDepth)
    geo.translate(pageWidth * 0.5, 0, -pageBlockDepth * 0.5)
    return geo
  }, [pageWidth, pageHeight, pageBlockDepth])

  // Central cylindrical spine geometry along vertical Y axis
  const spineGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(spineRadius, spineRadius, spineLength, 24, 1, false, Math.PI * 0.5, Math.PI)
    geo.translate(0, 0, -pageBlockDepth * 0.65)
    return geo
  }, [spineRadius, spineLength, pageBlockDepth])

  // Materials
  const coverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MYTHOS_THEME.coverLeather,
        roughness: 0.92,
        metalness: 0.08,
        map: coverTexture,
      }),
    [coverTexture],
  )

  const cornerBronzeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MYTHOS_THEME.bronzeCorner,
        roughness: 0.60,
        metalness: 0.40,
      }),
    [],
  )

  const spineMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MYTHOS_THEME.bronzeSpine,
        roughness: 0.68,
        metalness: 0.35,
      }),
    [],
  )

  const spineRibMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MYTHOS_THEME.bronzeSpineRib,
        roughness: 0.55,
        metalness: 0.45,
      }),
    [],
  )

  const pageBlockMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MYTHOS_THEME.gildedPageEdge,
        roughness: 0.88,
        metalness: 0.18,
        map: gildedEdgeTexture,
      }),
    [gildedEdgeTexture],
  )

  // Whole-Book 3D Cinematic Spatial Motion + Page Turning
  useFrame(({ clock }, delta) => {
    if (!bookGroupRef.current) return

    const targetState = sceneStateRef?.current?.targetState
    const targetPage = targetState?.targetPage ?? 0.0

    // Slow, weighted, deliberate, cinematic turn speed
    const lerpSpeed = Math.min(delta * 2.4, 0.08)
    currentTurnProgressRef.current = THREE.MathUtils.lerp(
      currentTurnProgressRef.current,
      targetPage,
      lerpSpeed,
    )

    const targetPos = targetState?.bookPos ?? BOOK_CONFIG.centerPosition
    const targetRot = targetState?.bookRot ?? BOOK_CONFIG.centerRotation
    const targetScale = targetState?.bookScale ?? BOOK_CONFIG.centerScale

    const reducedMotion = sceneStateRef?.current?.reducedMotion
    if (reducedMotion) {
      bookGroupRef.current.position.set(...targetPos)
      bookGroupRef.current.rotation.set(...targetRot)
      bookGroupRef.current.scale.setScalar(targetScale)
      return
    }

    const t = clock.getElapsedTime()
    // Dignified spatial breathing sway
    const breathY = Math.sin(t * 0.4) * 0.012
    const breathPitch = Math.sin(t * 0.3) * 0.004

    // Smooth whole-book spatial translation (X, Y, Z)
    bookGroupRef.current.position.x = THREE.MathUtils.lerp(
      bookGroupRef.current.position.x,
      targetPos[0],
      Math.min(delta * 2.0, 0.06),
    )
    bookGroupRef.current.position.y = THREE.MathUtils.lerp(
      bookGroupRef.current.position.y,
      targetPos[1] + breathY,
      Math.min(delta * 2.0, 0.06),
    )
    bookGroupRef.current.position.z = THREE.MathUtils.lerp(
      bookGroupRef.current.position.z,
      targetPos[2],
      Math.min(delta * 2.0, 0.06),
    )

    // Smooth whole-book spatial rotation
    bookGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      bookGroupRef.current.rotation.x,
      targetRot[0] + breathPitch,
      Math.min(delta * 2.0, 0.06),
    )
    bookGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      bookGroupRef.current.rotation.y,
      targetRot[1],
      Math.min(delta * 2.0, 0.06),
    )

    // Smooth whole-book depth scale
    const currentScale = bookGroupRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, Math.min(delta * 2.0, 0.06))
    bookGroupRef.current.scale.setScalar(newScale)
  })

  return (
    <group
      ref={bookGroupRef}
      position={BOOK_CONFIG.centerPosition}
      rotation={BOOK_CONFIG.centerRotation}
      scale={BOOK_CONFIG.centerScale}
    >
      {/* ========================================================
          1. CENTRAL BRONZE SPINE (Anchored at X = 0)
          ======================================================== */}
      <mesh geometry={spineGeo} material={spineMaterial} />

      {/* Raised Binding Cords along vertical spine */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((yPos, idx) => (
        <mesh
          key={idx}
          position={[0, yPos, -pageBlockDepth * 0.65]}
          material={spineRibMaterial}
        >
          <torusGeometry
            args={[spineRadius * 0.98, 0.012, 8, 16, Math.PI]}
          />
        </mesh>
      ))}

      {/* Top & Bottom Spine Headbands */}
      <mesh
        position={[0, spineLength * 0.5 - 0.01, -pageBlockDepth * 0.65]}
        material={spineRibMaterial}
      >
        <torusGeometry
          args={[spineRadius * 0.96, 0.016, 8, 16, Math.PI]}
        />
      </mesh>
      <mesh
        position={[0, -spineLength * 0.5 + 0.01, -pageBlockDepth * 0.65]}
        material={spineRibMaterial}
      >
        <torusGeometry
          args={[spineRadius * 0.96, 0.016, 8, 16, Math.PI]}
        />
      </mesh>

      {/* ========================================================
          2. LEFT WING (Cover Board + Volumetric Page Block)
             Anchored at X = 0, angled along Y by +openAngle
          ======================================================== */}
      <group position={[0, 0, 0]} rotation={[0, openAngle, 0]}>
        {/* Left Leather Cover Board */}
        <mesh geometry={coverGeoLeft} material={coverMaterial} castShadow receiveShadow />

        {/* Outer Left Bronze Corner Brackets */}
        <mesh
          position={[-coverWidth + 0.04, coverHeight * 0.5 - 0.04, -pageBlockDepth - coverThickness * 0.5 + 0.002]}
          material={cornerBronzeMaterial}
        >
          <boxGeometry args={[0.08, 0.08, 0.008]} />
        </mesh>
        <mesh
          position={[-coverWidth + 0.04, -coverHeight * 0.5 + 0.04, -pageBlockDepth - coverThickness * 0.5 + 0.002]}
          material={cornerBronzeMaterial}
        >
          <boxGeometry args={[0.08, 0.08, 0.008]} />
        </mesh>

        {/* Left Volumetric Page Block (Layered Leaves Mass) */}
        <mesh geometry={pageBlockGeoLeft} material={pageBlockMaterial} castShadow receiveShadow />
      </group>

      {/* ========================================================
          3. RIGHT WING (Cover Board + Volumetric Page Block)
             Anchored at X = 0, angled along Y by -openAngle
          ======================================================== */}
      <group position={[0, 0, 0]} rotation={[0, -openAngle, 0]}>
        {/* Right Leather Cover Board */}
        <mesh geometry={coverGeoRight} material={coverMaterial} castShadow receiveShadow />

        {/* Outer Right Bronze Corner Brackets */}
        <mesh
          position={[coverWidth - 0.04, coverHeight * 0.5 - 0.04, -pageBlockDepth - coverThickness * 0.5 + 0.002]}
          material={cornerBronzeMaterial}
        >
          <boxGeometry args={[0.08, 0.08, 0.008]} />
        </mesh>
        <mesh
          position={[coverWidth - 0.04, -coverHeight * 0.5 + 0.04, -pageBlockDepth - coverThickness * 0.5 + 0.002]}
          material={cornerBronzeMaterial}
        >
          <boxGeometry args={[0.08, 0.08, 0.008]} />
        </mesh>

        {/* Right Volumetric Page Block (Layered Leaves Mass) */}
        <mesh geometry={pageBlockGeoRight} material={pageBlockMaterial} castShadow receiveShadow />
      </group>

      {/* ========================================================
          4. 8-PAGE SEQUENTIAL PHYSICAL TURNING SYSTEM
          ======================================================== */}
      <SequentialTurningPage currentTurnProgressRef={currentTurnProgressRef} />

      {/* ========================================================
          5. LIVING RUIN ENERGY EMBERS (Internal Manuscript Atmosphere)
          ======================================================== */}
      <MythosRuinEmbers currentTurnProgressRef={currentTurnProgressRef} />
    </group>
  )
}

export default LivingBook
