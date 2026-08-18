import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BOOK_CONFIG } from '../../data/mythosBookConfig.js'

/**
 * ============================================================================
 * MYTHOS RUIN EMBERS — 3-TIER LIVING RELIC INTERNAL ENERGY SYSTEM
 * ============================================================================
 *
 * Atmospheric ancient energy particle layers INSIDE the Living Book 3D scene.
 * Total 60 sparse, tiny ancient energy fragments emitting from active page engravings.
 *
 * 3 Distinct Depth Layers:
 * - LAYER 1 (Base Ruin Embers): Dark burnt orange & relic copper (#63300F, #B85C1F, #D9792C) [z: 0.015 - 0.035]
 * - LAYER 2 (Warm Relic Dust):  Vibrant warm orange pigment flakes (#C8782A, #D9792C, #EA963E) [z: 0.035 - 0.065]
 * - LAYER 3 (Ancient Gold Dust): Rare precious luminous glints (#F6B557, #FFD98A, #FFF0C2) [z: 0.060 - 0.095] (5-10%)
 *
 * Behavior:
 * - Particles originate directly around active page engravings on the right folio.
 * - Slow, dignified upward drift with subtle organic orbital sway.
 * - During page turning, turning particles follow the dynamic parchment arc toward the spine and dissolve.
 * - Zero sci-fi, zero neon, pure ancient manuscript living relic atmosphere.
 */

const LAYER1_COLORS = [
  new THREE.Color('#63300F'),
  new THREE.Color('#B85C1F'),
  new THREE.Color('#D9792C'),
]

const LAYER2_COLORS = [
  new THREE.Color('#C8782A'),
  new THREE.Color('#D9792C'),
  new THREE.Color('#EA963E'),
]

const LAYER3_COLORS = [
  new THREE.Color('#F6B557'),
  new THREE.Color('#FFD98A'),
  new THREE.Color('#FFF0C2'),
]

const TOTAL_PARTICLES = 60
const L1_COUNT = 28
const L2_COUNT = 24

function createGlowTexture() {
  if (typeof document === 'undefined') return new THREE.Texture()
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)')
  grad.addColorStop(0.25, 'rgba(255, 200, 100, 0.85)')
  grad.addColorStop(0.60, 'rgba(200, 100, 30, 0.35)')
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)')

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  return texture
}

function getParticleColor(index) {
  if (index < L1_COUNT) {
    return LAYER1_COLORS[index % LAYER1_COLORS.length]
  }
  if (index < L1_COUNT + L2_COUNT) {
    return LAYER2_COLORS[(index - L1_COUNT) % LAYER2_COLORS.length]
  }
  return LAYER3_COLORS[(index - (L1_COUNT + L2_COUNT)) % LAYER3_COLORS.length]
}

function initParticleData() {
  const { pageWidth, pageHeight } = BOOK_CONFIG
  const data = []

  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    let layerType = 1
    let zBase = 0.015
    let zSpan = 0.020
    const baseCol = getParticleColor(i)
    let baseSize = 0.012 + (i % 4) * 0.003
    let vy = 0.022 + (i % 4) * 0.006

    if (i >= L1_COUNT && i < L1_COUNT + L2_COUNT) {
      // Layer 2: Warm Orange Relic Dust
      layerType = 2
      zBase = 0.035
      zSpan = 0.030
      baseSize = 0.014 + (i % 3) * 0.003
      vy = 0.026 + (i % 3) * 0.007
    } else if (i >= L1_COUNT + L2_COUNT) {
      // Layer 3: Rare Ancient Gold Dust
      layerType = 3
      zBase = 0.060
      zSpan = 0.035
      baseSize = 0.018 + (i % 2) * 0.004
      vy = 0.018 + (i % 3) * 0.005
    }

    const maxLife = 3.2 + (i % 6) * 0.8
    const life = (i * 0.28) % maxLife

    const localX = (0.18 + ((i * 7) % 60) * 0.01) * pageWidth
    const localY = (((i * 13) % 100) * 0.01 - 0.5) * pageHeight * 0.75
    const localZ = zBase + ((i % 5) / 5) * zSpan

    data.push({
      layerType,
      baseCol,
      localX,
      localY,
      localZ,
      zBase,
      zSpan,
      vx: (((i % 7) - 3) * 0.002),
      vy,
      vz: (((i % 5) - 2) * 0.001),
      swayFreq: 0.8 + (i % 3) * 0.4,
      swayAmp: 0.010 + (i % 4) * 0.003,
      phase: (i * 1.1) % (Math.PI * 2),
      life,
      maxLife,
      baseSize,
      isTurningParticle: i % 5 === 0,
    })
  }
  return data
}

export function MythosRuinEmbers({ currentTurnProgressRef }) {
  const pointsRef = useRef(null)
  const particleDataRef = useRef(null)
  if (particleDataRef.current == null) {
    particleDataRef.current = initParticleData()
  }

  // Static geometry setup
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(TOTAL_PARTICLES * 3)
    const col = new Float32Array(TOTAL_PARTICLES * 3)

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const c = getParticleColor(i)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return geo
  }, [])

  // Material setup
  const material = useMemo(() => {
    const tex = createGlowTexture()
    return new THREE.PointsMaterial({
      size: 0.038,
      map: tex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      toneMapped: false,
    })
  }, [])

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current || !particleDataRef.current) return

    const overallPage = currentTurnProgressRef?.current ?? 0.0
    const activeLeafIdx = Math.min(6, Math.floor(overallPage))
    const turnFraction = overallPage - activeLeafIdx
    const isTurning = turnFraction > 0.02 && turnFraction < 0.98

    const openAngle = BOOK_CONFIG.openAngle
    const rightAngle = -openAngle
    const leftAngle = -Math.PI + openAngle
    const currentLeafAngle = THREE.MathUtils.lerp(rightAngle, leftAngle, turnFraction)
    const archLift = Math.sin(turnFraction * Math.PI) * 0.28

    const posAttr = pointsRef.current.geometry.attributes.position
    const colAttr = pointsRef.current.geometry.attributes.color
    const t = clock.getElapsedTime()

    const { pageWidth, pageHeight } = BOOK_CONFIG
    const particles = particleDataRef.current

    // Dynamic page atmosphere: Thor's Hammer has active orange/amber fragments, while Infinity settles quietly
    let pageFactor = 1.0
    if (overallPage > 5.5 && overallPage <= 6.5) {
      // Page 07 Thor's Hammer: energetic relic warmth
      pageFactor = 1.15
    } else if (overallPage > 6.5) {
      // Page 08 Infinity: gentle settling into eternal calm
      pageFactor = THREE.MathUtils.lerp(1.15, 0.65, Math.min(1.0, (overallPage - 6.5) / 0.5))
    }

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const p = particles[i]

      p.life += delta
      if (p.life >= p.maxLife) {
        p.life = 0
        p.localX = (0.18 + ((i * 11 + Math.floor(t * 10)) % 60) * 0.01) * pageWidth
        p.localY = (((i * 17 + Math.floor(t * 5)) % 100) * 0.01 - 0.5) * pageHeight * 0.65
        p.localZ = p.zBase + (((i * 7) % 5) / 5) * p.zSpan
      }

      const progress = p.life / p.maxLife
      let alpha = Math.sin(progress * Math.PI)

      // Gold particles have a brief brightening glint peak
      if (p.layerType === 3) {
        alpha = Math.pow(alpha, 1.4) * 1.5
      }

      p.localY += p.vy * delta
      const swayX = Math.sin(t * p.swayFreq + p.phase) * p.swayAmp * delta
      p.localX += swayX

      let worldX
      let worldY
      let worldZ

      if (isTurning && p.isTurningParticle) {
        const r = p.localX
        const angle = currentLeafAngle + (p.localZ * 1.8)
        worldX = Math.cos(angle) * r
        worldZ = -Math.sin(angle) * r + archLift + p.localZ
        worldY = p.localY + (Math.sin(turnFraction * Math.PI) * 0.02)
      } else {
        const r = p.localX
        worldX = Math.cos(rightAngle) * r
        worldZ = -Math.sin(rightAngle) * r + p.localZ
        worldY = p.localY
      }

      posAttr.setXYZ(i, worldX, worldY, worldZ)

      const baseCol = p.baseCol
      colAttr.setXYZ(
        i,
        baseCol.r * alpha * 1.3 * pageFactor,
        baseCol.g * alpha * 1.3 * pageFactor,
        baseCol.b * alpha * 1.3 * pageFactor,
      )
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

export default MythosRuinEmbers
