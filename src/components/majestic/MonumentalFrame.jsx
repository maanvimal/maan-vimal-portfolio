import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FRAME_CONFIG, GOLD_SPECTRUM, MAJESTIC_THEME } from '../../data/majesticSceneConfig.js'
import PuppySequence from './PuppySequence.jsx'

/**
 * MONUMENTAL GOLDEN MUSEUM FRAME — CONTINUOUS ARCHITECTURAL GILDED FRAME
 *
 * Visual Architecture:
 * - Seamless outer stepped antique gold foundation (full-span overlapping joints, zero corner gaps)
 * - Seamless middle raised fluted molding (continuous rich gold profile)
 * - Seamless champagne sight chamfer bevel & bright inner slip fillet
 * - Unified gold corner miter joinery sharing the exact same rich gold material language
 * - Zero dark/bronze caps, zero floating blocks, zero seam disconnects
 * - Pure physical standard materials (0 CanvasTextures, zero VRAM overhead)
 */
export function MonumentalFrame({ sceneStateRef }) {
  const frameGroupRef = useRef(null)
  const currentPos = useRef(new THREE.Vector3(0, 0, 0))
  const currentRot = useRef(new THREE.Euler(0.03, 0, 0))
  const currentScale = useRef(1.0)

  const {
    outerWidth,
    outerHeight,
    outerDepth,
    innerWidth,
    innerHeight,
    outerMoldingWidth,
    raisedMoldingWidth,
    sightBevelWidth,
    innerSlipWidth,
  } = FRAME_CONFIG

  // =========================================================================
  // MULTI-TONE GOLD MATERIAL SPECTRUM (PHYSICAL PBR METALS)
  // =========================================================================

  // 1. Layer 01: Deep Shadow Backplate
  const shadowBackplateMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MAJESTIC_THEME.deepCharcoal,
        roughness: 0.98,
        metalness: 0.02,
      }),
    [],
  )

  // 2. Layer 02: Dark Antique-Gold Outer Molding Foundation
  const outerAntiqueGoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD_SPECTRUM.oldGold,
        roughness: 0.35,
        metalness: 0.84,
      }),
    [],
  )

  // 3. Layer 03: Raised Rich-Gold Fluted Molding & Unified Corner Joinery
  const raisedRichGoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD_SPECTRUM.richGold,
        roughness: 0.28,
        metalness: 0.88,
      }),
    [],
  )

  // 4. Layer 04: Champagne-Gold Inward Sight Chamfer / Bevel
  const sightBevelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD_SPECTRUM.champagneGold,
        roughness: 0.24,
        metalness: 0.90,
      }),
    [],
  )

  // 5. Layer 05: Deep Black Velvet Inner Liner Backing
  const innerVelvetBackingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MAJESTIC_THEME.frameInnerRecess,
        roughness: 0.99,
        metalness: 0.0,
      }),
    [],
  )

  // 6. Layer 06: Bright-Gold Inner Slip Fillet Bead
  const innerSlipGoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD_SPECTRUM.hotGold,
        roughness: 0.20,
        metalness: 0.92,
      }),
    [],
  )

  // 7. Solid Black Interior Plane Material
  const interiorBlackMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#010101',
        side: THREE.DoubleSide,
      }),
    [],
  )

  // =========================================================================
  // CONTINUOUS FRAME GEOMETRIES (GAP-FREE ARCHITECTURAL JOINERY)
  // =========================================================================

  const backplateGeo = useMemo(() => {
    return new THREE.BoxGeometry(outerWidth + 0.08, outerHeight + 0.08, 0.05)
  }, [outerWidth, outerHeight])

  // Layer 02: Full-span outer bars forming a continuous rectangular base
  const outerBarHorizGeo = useMemo(() => {
    return new THREE.BoxGeometry(outerWidth, outerMoldingWidth, outerDepth * 0.75)
  }, [outerWidth, outerMoldingWidth, outerDepth])

  const outerBarVertGeo = useMemo(() => {
    return new THREE.BoxGeometry(outerMoldingWidth, outerHeight, outerDepth * 0.75)
  }, [outerHeight, outerMoldingWidth, outerDepth])

  // Layer 03: Raised fluted molding spanning seamlessly across the frame
  const raisedOuterW = outerWidth - outerMoldingWidth * 0.6
  const raisedOuterH = outerHeight - outerMoldingWidth * 0.6
  const raisedBarHorizGeo = useMemo(() => {
    return new THREE.BoxGeometry(raisedOuterW, raisedMoldingWidth, outerDepth * 0.85)
  }, [raisedOuterW, raisedMoldingWidth, outerDepth])

  const raisedBarVertGeo = useMemo(() => {
    return new THREE.BoxGeometry(raisedMoldingWidth, raisedOuterH, outerDepth * 0.85)
  }, [raisedOuterH, raisedMoldingWidth, outerDepth])

  // Layer 04: Sight chamfer bars
  const bevelOuterW = innerWidth + sightBevelWidth * 2
  const bevelOuterH = innerHeight + sightBevelWidth * 2
  const bevelBarHorizGeo = useMemo(() => {
    return new THREE.BoxGeometry(bevelOuterW, sightBevelWidth, 0.16)
  }, [bevelOuterW, sightBevelWidth])

  const bevelBarVertGeo = useMemo(() => {
    return new THREE.BoxGeometry(sightBevelWidth, bevelOuterH, 0.16)
  }, [bevelOuterH, sightBevelWidth])

  // Corner Miters & Chamfer Joinery (same rich gold & champagne gold materials)
  const cornerMiterGeo = useMemo(() => {
    return new THREE.BoxGeometry(outerMoldingWidth + 0.03, outerMoldingWidth + 0.03, outerDepth * 0.88)
  }, [outerMoldingWidth, outerDepth])

  const cornerBevelGeo = useMemo(() => {
    return new THREE.BoxGeometry(sightBevelWidth * 1.3, sightBevelWidth * 1.3, 0.17)
  }, [sightBevelWidth])

  const innerBackingGeo = useMemo(() => {
    return new THREE.PlaneGeometry(innerWidth + 0.04, innerHeight + 0.04)
  }, [innerWidth, innerHeight])

  const interiorPlaneGeo = useMemo(() => {
    return new THREE.PlaneGeometry(innerWidth, innerHeight)
  }, [innerWidth, innerHeight])

  const slipFilletHorizGeo = useMemo(() => {
    return new THREE.CylinderGeometry(innerSlipWidth * 0.5, innerSlipWidth * 0.5, innerWidth, 16)
  }, [innerSlipWidth, innerWidth])

  const slipFilletVertGeo = useMemo(() => {
    return new THREE.CylinderGeometry(innerSlipWidth * 0.5, innerSlipWidth * 0.5, innerHeight, 16)
  }, [innerSlipWidth, innerHeight])

  useFrame((_, delta) => {
    if (!sceneStateRef?.current || !frameGroupRef.current) return

    const { targetState, mouse, reducedMotion, isMobile } = sceneStateRef.current
    const targetPos = targetState?.framePos ?? [0, 0, 0]
    const targetRot = targetState?.frameRot ?? [0.03, 0, 0]
    const targetSc = targetState?.frameScale ?? 1.0

    // Gentle ambient floating oscillation
    const time = Date.now() * 0.001
    const floatY = reducedMotion ? 0 : Math.sin(time * 0.8) * 0.025
    const floatRotX = reducedMotion ? 0 : Math.sin(time * 0.6) * 0.008
    const floatRotY = reducedMotion ? 0 : Math.cos(time * 0.7) * 0.008

    // Gentle mouse parallax tilt
    const mouseRotX = !reducedMotion && !isMobile ? -mouse.y * 0.05 : 0
    const mouseRotY = !reducedMotion && !isMobile ? mouse.x * 0.06 : 0

    const lerpFactor = Math.min(delta * 3.5, 0.1)

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetPos[0], lerpFactor)
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetPos[1] + floatY, lerpFactor)
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetPos[2], lerpFactor)

    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, targetRot[0] + floatRotX + mouseRotX, lerpFactor)
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, targetRot[1] + floatRotY + mouseRotY, lerpFactor)
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, targetRot[2], lerpFactor)

    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetSc, lerpFactor)

    frameGroupRef.current.position.copy(currentPos.current)
    frameGroupRef.current.rotation.copy(currentRot.current)
    frameGroupRef.current.scale.setScalar(currentScale.current)
  })

  // Coordinates Calculations
  const outerY = (outerHeight - outerMoldingWidth) * 0.5
  const outerX = (outerWidth - outerMoldingWidth) * 0.5

  const raisedY = (raisedOuterH - raisedMoldingWidth) * 0.5
  const raisedX = (raisedOuterW - raisedMoldingWidth) * 0.5

  const bevelY = (innerHeight + sightBevelWidth) * 0.5
  const bevelX = (innerWidth + sightBevelWidth) * 0.5

  const slipY = innerHeight * 0.5
  const slipX = innerWidth * 0.5

  return (
    <group ref={frameGroupRef} position={[0, 0, 0]}>
      {/* ==================================================================
          LAYER 01: DEEP SHADOW RECESS BACKPLATE
          ================================================================== */}
      <mesh geometry={backplateGeo} material={shadowBackplateMaterial} position={[0, 0, -0.08]} />

      {/* ==================================================================
          LAYER 02: CONTINUOUS DARK ANTIQUE-GOLD OUTER MOLDING
          ================================================================== */}
      {/* Top Outer Bar */}
      <mesh geometry={outerBarHorizGeo} material={outerAntiqueGoldMaterial} position={[0, outerY, -0.02]} />
      {/* Bottom Outer Bar */}
      <mesh geometry={outerBarHorizGeo} material={outerAntiqueGoldMaterial} position={[0, -outerY, -0.02]} />
      {/* Left Outer Bar */}
      <mesh geometry={outerBarVertGeo} material={outerAntiqueGoldMaterial} position={[-outerX, 0, -0.02]} />
      {/* Right Outer Bar */}
      <mesh geometry={outerBarVertGeo} material={outerAntiqueGoldMaterial} position={[outerX, 0, -0.02]} />

      {/* ==================================================================
          LAYER 03: CONTINUOUS RAISED RICH-GOLD FLUTED MOLDING
          ================================================================== */}
      {/* Top Raised Bar */}
      <mesh geometry={raisedBarHorizGeo} material={raisedRichGoldMaterial} position={[0, raisedY, 0.025]} />
      {/* Bottom Raised Bar */}
      <mesh geometry={raisedBarHorizGeo} material={raisedRichGoldMaterial} position={[0, -raisedY, 0.025]} />
      {/* Left Raised Bar */}
      <mesh geometry={raisedBarVertGeo} material={raisedRichGoldMaterial} position={[-raisedX, 0, 0.025]} />
      {/* Right Raised Bar */}
      <mesh geometry={raisedBarVertGeo} material={raisedRichGoldMaterial} position={[raisedX, 0, 0.025]} />

      {/* ==================================================================
          UNIFIED CORNER MITER JOINTS (SAME RICH GOLD MATERIAL LANGUAGE)
          ================================================================== */}
      {/* Top-Left Corner Join */}
      <mesh geometry={cornerMiterGeo} material={raisedRichGoldMaterial} position={[-outerX, outerY, 0.022]} />
      {/* Top-Right Corner Join */}
      <mesh geometry={cornerMiterGeo} material={raisedRichGoldMaterial} position={[outerX, outerY, 0.022]} />
      {/* Bottom-Left Corner Join */}
      <mesh geometry={cornerMiterGeo} material={raisedRichGoldMaterial} position={[-outerX, -outerY, 0.022]} />
      {/* Bottom-Right Corner Join */}
      <mesh geometry={cornerMiterGeo} material={raisedRichGoldMaterial} position={[outerX, -outerY, 0.022]} />

      {/* ==================================================================
          LAYER 04: CHAMPAGNE-GOLD INWARD SIGHT CHAMFER / BEVEL
          ================================================================== */}
      {/* Top Bevel */}
      <mesh geometry={bevelBarHorizGeo} material={sightBevelMaterial} position={[0, bevelY, 0.045]} />
      {/* Bottom Bevel */}
      <mesh geometry={bevelBarHorizGeo} material={sightBevelMaterial} position={[0, -bevelY, 0.045]} />
      {/* Left Bevel */}
      <mesh geometry={bevelBarVertGeo} material={sightBevelMaterial} position={[-bevelX, 0, 0.045]} />
      {/* Right Bevel */}
      <mesh geometry={bevelBarVertGeo} material={sightBevelMaterial} position={[bevelX, 0, 0.045]} />

      {/* Corner Sight Chamfer Accents */}
      <mesh geometry={cornerBevelGeo} material={sightBevelMaterial} position={[-bevelX, bevelY, 0.046]} />
      <mesh geometry={cornerBevelGeo} material={sightBevelMaterial} position={[bevelX, bevelY, 0.046]} />
      <mesh geometry={cornerBevelGeo} material={sightBevelMaterial} position={[-bevelX, -bevelY, 0.046]} />
      <mesh geometry={cornerBevelGeo} material={sightBevelMaterial} position={[bevelX, -bevelY, 0.046]} />

      {/* ==================================================================
          LAYER 05: DEEP BLACK VELVET INNER BACKING
          ================================================================== */}
      <mesh geometry={innerBackingGeo} material={innerVelvetBackingMaterial} position={[0, 0, -0.05]} />

      {/* ==================================================================
          LAYER 06: THIN BRIGHT-GOLD INNER SLIP BEAD FILLET
          ================================================================== */}
      {/* Top Slip Bead */}
      <mesh
        geometry={slipFilletHorizGeo}
        material={innerSlipGoldMaterial}
        position={[0, slipY, 0.015]}
        rotation={[0, 0, Math.PI * 0.5]}
      />
      {/* Bottom Slip Bead */}
      <mesh
        geometry={slipFilletHorizGeo}
        material={innerSlipGoldMaterial}
        position={[0, -slipY, 0.015]}
        rotation={[0, 0, Math.PI * 0.5]}
      />
      {/* Left Slip Bead */}
      <mesh
        geometry={slipFilletVertGeo}
        material={innerSlipGoldMaterial}
        position={[-slipX, 0, 0.015]}
      />
      {/* Right Slip Bead */}
      <mesh
        geometry={slipFilletVertGeo}
        material={innerSlipGoldMaterial}
        position={[slipX, 0, 0.015]}
      />

      {/* ==================================================================
          LAYER 07: SOLID BLACK BACKING INTERIOR & PUPPY ARTWORK SEQUENCE
          ================================================================== */}
      <mesh geometry={interiorPlaneGeo} material={interiorBlackMaterial} position={[0, 0, 0.005]} />
      <PuppySequence sceneStateRef={sceneStateRef} />
    </group>
  )
}

export default MonumentalFrame
