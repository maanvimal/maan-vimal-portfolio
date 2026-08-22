/**
 * ABOUT -> MYTHOS CINEMATIC DISINTEGRATION & BIG BANG PARTICLE ENGINE (REVISION 03)
 *
 * Choreography:
 * - ABOUT -> MYTHOS:
 *   Phase 1 (0.0s): About intact.
 *   Phase 2 (0.0s - 2.4s | p: 0.00 -> 0.30): Disintegration into white/champagne/gold matter.
 *   Phase 3 (2.4s - 3.2s | p: 0.30 -> 0.39): Full particle field holds in quiet pause.
 *   Phase 4 (3.2s - 4.9s | p: 0.39 -> 0.61): Gravitational spiral toward center.
 *   Phase 5 (4.9s - 5.8s | p: 0.61 -> 0.72): Cosmic orb forms and breathes.
 *   Phase 6 (5.8s - 7.0s | p: 0.72 -> 0.86): Orb transforms: White/Champagne/Gold -> Amber -> Orange.
 *   Phase 7 (7.0s - 7.3s | p: 0.86 -> 0.90): Final compression tension hold.
 *   Phase 8 (7.3s - 8.1s | p: 0.90 -> 1.00): BIG BANG radial explosion & Mythos reveal.
 *
 * - MAJESTIC -> MYTHOS (BLACK HOLE IDENTITY):
 *   Phase 1 (0.0s - 2.1s | p: 0.00 -> 0.26): Dissolution into BLACK + GOLD matter only.
 *   Phase 2 (2.1s - 3.9s | p: 0.26 -> 0.48): Large empty pitch-black void; gold dust curves toward center.
 *   Phase 3 (3.9s - 5.4s | p: 0.48 -> 0.66): HERO BLACK HOLE HOLD (~1.46s) — Pure #000000 pitch-black center
 *                                              with gold particles flowing in an inclined accretion disk.
 *   Phase 4 (5.4s - 6.8s | p: 0.66 -> 0.84): Accretion disk transforms from Gold -> Amber -> Mythos Orange.
 *   Phase 5 (6.8s - 7.3s | p: 0.84 -> 0.90): Orange accretion energy tightens into compression singularity.
 *   Phase 6 (7.3s - 8.1s | p: 0.90 -> 1.00): BIG BANG detonation & Mythos emerges through particle expansion.
 *
 * Safety: Single 2D Canvas with Float32Array typed buffers. Zero WebGL contexts, zero CanvasTextures.
 */

// Phase 2 to 5: About World Luminous Matter (Warm White, Ivory, Champagne, Pale Gold, Warm Beige)
const ABOUT_PALETTE_RGB = [
  [255, 247, 221], // 0: Pure Warm White-Gold (#FFF7DD)
  [247, 230, 181], // 1: Pale Luminous Gold (#F7E6B5)
  [245, 235, 212], // 2: Soft Ivory Highlight (#F5EBD4)
  [232, 213, 173], // 3: Pale Cream-Champagne (#E8D5AD)
  [216, 193, 138], // 4: Luminous Studio Parchment (#D8C18A)
  [196, 174, 122], // 5: Core Artist Champagne-Beige (#C4AE7A)
  [171, 148, 101], // 6: Muted Antique Umber (#AB9465)
]

// Phase 2 to 5: Coding World Luminous Matter (Dominant Black, Deep Shadow Green, Rich Moss, Technical Emerald, Code-Green Highlight)
const CODING_PALETTE_RGB = [
  [0, 0, 0],       // 0: Deep Void Black (#000000)
  [3, 26, 16],     // 1: Deep Shadow Green (#031A10)
  [6, 61, 37],     // 2: Dark Pine Forest Green (#063D25)
  [10, 90, 53],    // 3: Rich Moss Coding Green (#0A5A35)
  [20, 122, 74],   // 4: Luminous Technical Emerald (#147A4A)
  [57, 169, 107],  // 5: Subtle Code-Green Highlight (#39A96B)
]

// Phase 2 to 5: Majestic World Luminous Matter (Dominant Black + Majestic Gold Spectrum ONLY - Zero beige/champagne/cream/white)
const MAJESTIC_PALETTE_RGB = [
  [0, 0, 0],       // 0: Pure Pitch Black (#000000) - Dominant Void Matter
  [138, 102, 36],  // 1: Deep Antique Gold (#8A6624)
  [166, 124, 46],  // 2: Bronze Rich Gold (#A67C2E)
  [193, 154, 82],  // 3: Rich Gilded Gold (#C19A52)
  [218, 165, 32],  // 4: Radiant Solar Gold (#DAA520)
  [229, 184, 66],  // 5: Imperial Metallic Gold (#E5B842)
  [240, 195, 78],  // 6: Brilliant Amber-Gold Flare (#F0C34E)
]

// Phase 6 to 9: Mythos World Energy Matter (Radiant Gold, Hot Amber, Fiery Orange, Deep Copper)
const MYTHOS_PALETTE_RGB = [
  [255, 247, 221], // 0: White-Hot Apex Flare (#FFF7DD)
  [255, 217, 138], // 1: Radiant Hot Gold Core (#FFD98A)
  [245, 166, 66],  // 2: Intense Radiant Amber (#F5A642)
  [224, 138, 69],  // 3: Luminous Amber-Copper (#E08A45)
  [196, 106, 50],  // 4: Primary Relic Earthy Orange (#C46A32)
  [155, 82, 40],   // 5: Deep Muted Copper (#9B5228)
  [122, 62, 31],   // 6: Burnt Amber Shadow (#7A3E1F)
]

const PARTICLE_COUNT = 2600

// Majestic Accretion Disk Inclination Constants (-24deg tilt, 0.40 compression)
const MAJESTIC_DISK_COS = 0.913545
const MAJESTIC_DISK_SIN = -0.406737
const MAJESTIC_DISK_KY = 0.40

export class AboutMythosParticleEngine {
  constructor(canvas, sourceWorld = 'about') {
    this.canvas = canvas
    this.sourceWorld = sourceWorld
    this.ctx = canvas.getContext('2d', { alpha: true })
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.count = PARTICLE_COUNT

    // Pre-allocate typed arrays once (Zero allocations during animation)
    this.x = new Float32Array(this.count)
    this.y = new Float32Array(this.count)
    this.originX = new Float32Array(this.count)
    this.originY = new Float32Array(this.count)
    this.baseSize = new Float32Array(this.count)
    this.aboutR = new Float32Array(this.count)
    this.aboutG = new Float32Array(this.count)
    this.aboutB = new Float32Array(this.count)
    this.mythosR = new Float32Array(this.count)
    this.mythosG = new Float32Array(this.count)
    this.mythosB = new Float32Array(this.count)
    this.disintegrateDelay = new Float32Array(this.count)
    this.driftVx = new Float32Array(this.count)
    this.driftVy = new Float32Array(this.count)
    this.driftDist = new Float32Array(this.count)
    this.spiralAngle = new Float32Array(this.count)
    this.spiralSpeed = new Float32Array(this.count)
    this.orbRadius = new Float32Array(this.count)
    this.explodeAngle = new Float32Array(this.count)
    this.explodeSpeed = new Float32Array(this.count)
    this.sparklePhase = new Float32Array(this.count)
    this.shapeType = new Uint8Array(this.count) // 0: soft circle, 1: angular micro-fragment

    // Specialized Black Hole Accretion Buffers for Majestic
    this.majesticOrbitR = new Float32Array(this.count)
    this.majesticOrbitAngle = new Float32Array(this.count)
    this.majesticOrbitSpeed = new Float32Array(this.count)
    this.majesticTilt = new Float32Array(this.count)
    this.isBlackHoleParticle = new Uint8Array(this.count)

    this.resize()
    this.initParticles()
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = Math.floor(this.width * this.dpr)
    this.canvas.height = Math.floor(this.height * this.dpr)
    this.canvas.style.width = `${this.width}px`
    this.canvas.style.height = `${this.height}px`
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  }

  initParticles() {
    const cx = this.width * 0.5
    const cy = this.height * 0.5

    for (let i = 0; i < this.count; i++) {
      // 1. Distribute particles across entire screen with gentle organic cluster variation
      const gridX = Math.random() * this.width
      const gridY = Math.random() * this.height

      this.originX[i] = gridX
      this.originY[i] = gridY

      // 2. Mixture of sizes
      const rRand = Math.random()
      if (rRand < 0.60) {
        this.baseSize[i] = 1.1 + Math.random() * 0.8
      } else if (rRand < 0.88) {
        this.baseSize[i] = 2.0 + Math.random() * 1.2
      } else if (rRand < 0.98) {
        this.baseSize[i] = 3.4 + Math.random() * 1.4
      } else {
        this.baseSize[i] = 5.0 + Math.random() * 1.2
      }

      // 3. Source World Color Mapping
      if (this.sourceWorld === 'majestic') {
        const mRand = Math.random()
        let mColor
        let isGold = false
        if (mRand < 0.62) {
          // ~62% Pure Pitch Black (Dominant black matter / empty void)
          mColor = MAJESTIC_PALETTE_RGB[0] // #000000
          this.isBlackHoleParticle[i] = 0
        } else {
          // ~38% Majestic Gold Spectrum ONLY (Strictly zero beige/champagne/cream/white)
          isGold = true
          this.isBlackHoleParticle[i] = 1
          const goldRand = Math.random()
          if (goldRand < 0.18) {
            mColor = MAJESTIC_PALETTE_RGB[1] // #8A6624 (Deep antique gold)
          } else if (goldRand < 0.38) {
            mColor = MAJESTIC_PALETTE_RGB[2] // #A67C2E (Bronze rich gold)
          } else if (goldRand < 0.64) {
            mColor = MAJESTIC_PALETTE_RGB[3] // #C19A52 (Rich gilded gold)
          } else if (goldRand < 0.84) {
            mColor = MAJESTIC_PALETTE_RGB[4] // #DAA520 (Radiant solar gold)
          } else if (goldRand < 0.94) {
            mColor = MAJESTIC_PALETTE_RGB[5] // #E5B842 (Imperial metallic gold)
          } else {
            mColor = MAJESTIC_PALETTE_RGB[6] // #F0C34E (Brilliant amber-gold flare)
          }
        }
        this.aboutR[i] = mColor[0]
        this.aboutG[i] = mColor[1]
        this.aboutB[i] = mColor[2]

        // Majestic Accretion Disk Geometry (Event Horizon: 54px, Accretion Ring: 60px -> 180px)
        const radDist = 60.0 + Math.pow(Math.random(), 1.4) * 120.0 + (Math.random() < 0.12 ? Math.random() * 60.0 : 0)
        this.majesticOrbitR[i] = radDist
        this.majesticOrbitAngle[i] = Math.random() * Math.PI * 2
        // Keplerian orbital velocity (particles closer to event horizon orbit faster)
        const normDist = Math.max(0, Math.min(1, (radDist - 60.0) / 120.0))
        const baseSpeed = 2.4 + (1.0 - normDist) * 2.8
        this.majesticOrbitSpeed[i] = baseSpeed * (0.85 + Math.random() * 0.30)
        // Accretion disk z-dispersion / vertical thickness
        this.majesticTilt[i] = (Math.random() - 0.5) * (6.0 + normDist * 16.0)

        // Refined base sizes for sparse, luxurious gold dust
        if (isGold) {
          if (rRand < 0.68) {
            this.baseSize[i] = 1.0 + Math.random() * 0.8 // micro gold dust
          } else if (rRand < 0.90) {
            this.baseSize[i] = 1.9 + Math.random() * 1.0 // glowing gold fleck
          } else {
            this.baseSize[i] = 3.0 + Math.random() * 1.2 // luminous gold fragment
          }
        } else {
          this.baseSize[i] = 1.4 + Math.random() * 1.4
        }
      } else if (this.sourceWorld === 'coding') {
        const cRand = Math.random()
        let cColor
        if (cRand < 0.40) {
          cColor = CODING_PALETTE_RGB[0] // #000000 (Dominant black 40%)
        } else if (cRand < 0.65) {
          cColor = CODING_PALETTE_RGB[1] // #031A10 (Deep shadow green 25%)
        } else if (cRand < 0.82) {
          cColor = CODING_PALETTE_RGB[2] // #063D25 (Dark pine forest green 17%)
        } else if (cRand < 0.93) {
          cColor = CODING_PALETTE_RGB[3] // #0A5A35 (Rich moss coding green 11%)
        } else if (cRand < 0.98) {
          cColor = CODING_PALETTE_RGB[4] // #147A4A (Technical emerald 5%)
        } else {
          cColor = CODING_PALETTE_RGB[5] // #39A96B (Subtle code-green highlight 2%)
        }
        this.aboutR[i] = cColor[0]
        this.aboutG[i] = cColor[1]
        this.aboutB[i] = cColor[2]
        this.orbRadius[i] = 2.0 + Math.pow(Math.random(), 2.0) * 26.0
      } else {
        const aIdx = Math.floor(Math.random() * ABOUT_PALETTE_RGB.length)
        const aColor = ABOUT_PALETTE_RGB[aIdx]
        this.aboutR[i] = aColor[0]
        this.aboutG[i] = aColor[1]
        this.aboutB[i] = aColor[2]
        this.orbRadius[i] = 2.0 + Math.pow(Math.random(), 2.0) * 26.0
      }

      // 4. Mythos World Color Mapping (Radiant gold, hot amber, fiery orange, deep copper)
      const mIdx = Math.floor(Math.random() * MYTHOS_PALETTE_RGB.length)
      const mColor = MYTHOS_PALETTE_RGB[mIdx]
      this.mythosR[i] = mColor[0]
      this.mythosG[i] = mColor[1]
      this.mythosB[i] = mColor[2]

      // 5. Staggered Disintegration Timing across 0.00 -> 0.24 normalized progress
      const distFromCenter = Math.hypot(gridX - cx, gridY - cy) / Math.hypot(cx, cy)
      const normY = gridY / this.height
      const baseDelay = (normY * 0.45 + distFromCenter * 0.35 + (Math.random() - 0.5) * 0.20) * 0.24
      this.disintegrateDelay[i] = Math.max(0, Math.min(0.23, baseDelay))

      // 6. Initial Slow Drift Velocity
      const angleOut = Math.atan2(gridY - cy, gridX - cx) + (Math.random() - 0.5) * 0.8
      const speed = 25 + Math.random() * 65
      this.driftVx[i] = Math.cos(angleOut) * speed
      this.driftVy[i] = Math.sin(angleOut) * speed
      this.driftDist[i] = speed

      // 7. Gravitational Spiral Parameters (About / Coding)
      this.spiralAngle[i] = Math.atan2(gridY - cy, gridX - cx)
      this.spiralSpeed[i] = (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 2.8)
      if (this.sourceWorld !== 'majestic') {
        this.orbRadius[i] = 2.0 + Math.pow(Math.random(), 2.0) * 26.0
      }

      // 8. Big Bang Explosion Parameters (Phase 8)
      const expAngle = (i / this.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.25
      this.explodeAngle[i] = expAngle
      this.explodeSpeed[i] = 0.50 + Math.pow(Math.random(), 0.85) * 0.95

      this.sparklePhase[i] = Math.random() * Math.PI * 2
      this.shapeType[i] = Math.random() < 0.25 ? 1 : 0
    }
  }

  /**
   * Main render tick driven by GSAP normalized progress [0.00 -> 1.00]
   * Total Duration: ~8.10 seconds
   */
  render(progress) {
    const { ctx, width, height } = this
    ctx.clearRect(0, 0, width, height)

    const cx = width * 0.5
    const cy = height * 0.5
    const maxRadius = Math.hypot(width, height) * 0.70

    ctx.save()

    // =========================================================================
    // RENDER ORB LUMINOUS CORONA & AURA (Phases 5 to 7: 0.46 -> 0.90)
    // =========================================================================
    if (this.sourceWorld === 'majestic') {
      // -----------------------------------------------------------------------
      // MAJESTIC BLACK HOLE CORONA & PITCH-BLACK NUCLEUS (p: 0.46 -> 0.90)
      // -----------------------------------------------------------------------
      if (progress >= 0.46 && progress < 0.90) {
        let coronaTransformT = 0
        if (progress > 0.66) {
          coronaTransformT = Math.min(1, (progress - 0.66) / 0.18)
        }

        // Accretion halo breath / pulse
        let pulse = 0
        if (progress >= 0.48 && progress < 0.66) {
          // Hero Hold: Subtle, calm breathing in pure Gold (1.46s)
          const holdT = (progress - 0.48) / 0.18
          pulse = Math.sin(holdT * Math.PI * 2) * 0.05
        } else if (progress >= 0.66 && progress < 0.84) {
          // Transformation: Energized pulsating shimmer into Mythos Orange (1.46s)
          const energyT = (progress - 0.66) / 0.18
          pulse = Math.sin(energyT * Math.PI * 8) * (0.08 + energyT * 0.08)
        } else if (progress >= 0.84 && progress < 0.90) {
          // Final compression tension into singularity
          const compressT = (progress - 0.84) / 0.06
          pulse = -0.75 * compressT
        }

        const baseAccretionR = Math.max(12, 54 * (1 + pulse))
        const haloOuterR = Math.max(20, 180 * (1 + pulse * 0.6))
        const halo = ctx.createRadialGradient(cx, cy, baseAccretionR * 0.95, cx, cy, haloOuterR)

        if (coronaTransformT < 0.01) {
          // Pure Majestic Gold Accretion Halo (Strictly Black + Gold)
          halo.addColorStop(0.00, 'rgba(0, 0, 0, 1.0)') // Pure event horizon boundary
          halo.addColorStop(0.12, 'rgba(138, 102, 36, 0.50)') // #8A6624 deep antique gold
          halo.addColorStop(0.35, 'rgba(193, 154, 82, 0.42)') // #C19A52 rich gilded gold
          halo.addColorStop(0.60, 'rgba(218, 165, 32, 0.22)') // #DAA520 radiant solar gold
          halo.addColorStop(0.85, 'rgba(138, 102, 36, 0.06)') // #8A6624 outer fringe
          halo.addColorStop(1.00, 'rgba(0, 0, 0, 0)')
        } else {
          // Interpolating Accretion Halo from Gold into Radiant Amber & Fiery Mythos Orange
          const r0 = Math.round(138 + coronaTransformT * (255 - 138))
          const g0 = Math.round(102 + coronaTransformT * (217 - 102))
          const b0 = Math.round(36 + coronaTransformT * (138 - 36))

          const r1 = Math.round(193 + coronaTransformT * (245 - 193))
          const g1 = Math.round(154 + coronaTransformT * (166 - 154))
          const b1 = Math.round(82 + coronaTransformT * (66 - 82))

          const r2 = Math.round(218 + coronaTransformT * (224 - 218))
          const g2 = Math.round(165 + coronaTransformT * (138 - 165))
          const b2 = Math.round(32 + coronaTransformT * (69 - 32))

          const r3 = Math.round(166 + coronaTransformT * (196 - 166))
          const g3 = Math.round(124 + coronaTransformT * (106 - 124))
          const b3 = Math.round(46 + coronaTransformT * (50 - 46))

          halo.addColorStop(0.00, 'rgba(0, 0, 0, 1.0)')
          halo.addColorStop(0.15, `rgba(${r0}, ${g0}, ${b0}, 0.55)`)
          halo.addColorStop(0.40, `rgba(${r1}, ${g1}, ${b1}, 0.45)`)
          halo.addColorStop(0.70, `rgba(${r2}, ${g2}, ${b2}, 0.25)`)
          halo.addColorStop(0.90, `rgba(${r3}, ${g3}, ${b3}, ${0.10 * coronaTransformT})`)
          halo.addColorStop(1.00, 'rgba(0, 0, 0, 0)')
        }

        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(cx, cy, haloOuterR, 0, Math.PI * 2)
        ctx.fill()

        // PURE PITCH-BLACK CENTER (#000000) — Absolutely black, light-swallowing void
        const nucleusRadius = Math.max(3.0, 54.0 * (1 + pulse * 0.85))
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(cx, cy, nucleusRadius, 0, Math.PI * 2)
        ctx.fill()

        // Razor-sharp Gilded Photon Ring Edge
        ctx.strokeStyle = coronaTransformT < 0.01
          ? 'rgba(218, 165, 32, 0.45)'
          : `rgba(245, 166, 66, ${0.45 + coronaTransformT * 0.40})`
        ctx.lineWidth = 1.4
        ctx.stroke()
      }
    } else if (progress >= 0.56 && progress < 0.90) {
      // -----------------------------------------------------------------------
      // ABOUT & CODING CORONA (PRESERVED 100% UNCHANGED)
      // -----------------------------------------------------------------------
      let coronaTransformT = 0
      if (progress > 0.68) {
        coronaTransformT = Math.min(1, (progress - 0.68) / 0.18)
      }

      let pulse = 0
      if (progress >= 0.58 && progress < 0.68) {
        const breatheT = (progress - 0.58) / 0.10
        pulse = Math.sin(breatheT * Math.PI * 4) * 0.12
      } else if (progress >= 0.68 && progress < 0.86) {
        const energyT = (progress - 0.68) / 0.18
        pulse = Math.sin(energyT * Math.PI * 10) * (0.15 + energyT * 0.12)
      } else if (progress >= 0.86 && progress < 0.90) {
        const compressT = (progress - 0.86) / 0.04
        pulse = -0.45 * compressT
      }

      if (this.sourceWorld === 'coding') {
        const baseCoronaR = Math.max(4, 28 * (1 + pulse))
        const corona = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseCoronaR * 3.2)

        if (coronaTransformT < 0.01) {
          corona.addColorStop(0.00, 'rgba(57, 169, 107, 0.90)')
          corona.addColorStop(0.25, 'rgba(20, 122, 74, 0.75)')
          corona.addColorStop(0.55, 'rgba(10, 90, 53, 0.40)')
          corona.addColorStop(0.80, 'rgba(6, 61, 37, 0.15)')
          corona.addColorStop(1.00, 'rgba(0, 0, 0, 0)')
        } else {
          const r0 = Math.round(57 + coronaTransformT * (255 - 57))
          const g0 = Math.round(169 + coronaTransformT * (217 - 169))
          const b0 = Math.round(107 + coronaTransformT * (138 - 107))

          const r1 = Math.round(20 + coronaTransformT * (245 - 20))
          const g1 = Math.round(122 + coronaTransformT * (166 - 122))
          const b1 = Math.round(74 + coronaTransformT * (66 - 74))

          const r2 = Math.round(10 + coronaTransformT * (224 - 10))
          const g2 = Math.round(90 + coronaTransformT * (138 - 90))
          const b2 = Math.round(53 + coronaTransformT * (69 - 53))

          const r3 = Math.round(6 + coronaTransformT * (196 - 6))
          const g3 = Math.round(61 + coronaTransformT * (106 - 61))
          const b3 = Math.round(37 + coronaTransformT * (50 - 37))

          corona.addColorStop(0.00, `rgba(${r0}, ${g0}, ${b0}, 0.95)`)
          corona.addColorStop(0.25, `rgba(${r1}, ${g1}, ${b1}, 0.85)`)
          corona.addColorStop(0.55, `rgba(${r2}, ${g2}, ${b2}, 0.50)`)
          corona.addColorStop(0.85, `rgba(${r3}, ${g3}, ${b3}, ${0.20 * coronaTransformT})`)
          corona.addColorStop(1.00, 'rgba(0, 0, 0, 0)')
        }

        ctx.fillStyle = corona
        ctx.beginPath()
        ctx.arc(cx, cy, baseCoronaR * 3.2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        const baseCoronaR = Math.max(4, 28 * (1 + pulse))
        const corona = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseCoronaR * 3.2)

        if (coronaTransformT < 0.01) {
          corona.addColorStop(0.00, 'rgba(255, 247, 221, 0.95)')
          corona.addColorStop(0.20, 'rgba(247, 230, 181, 0.80)')
          corona.addColorStop(0.50, 'rgba(232, 213, 173, 0.45)')
          corona.addColorStop(0.80, 'rgba(196, 174, 122, 0.15)')
          corona.addColorStop(1.00, 'rgba(0, 0, 0, 0)')
        } else {
          const r0 = Math.round(255)
          const g0 = Math.round(247 - coronaTransformT * 50)
          const b0 = Math.round(221 - coronaTransformT * 120)

          const r1 = Math.round(245)
          const g1 = Math.round(230 - coronaTransformT * 70)
          const b1 = Math.round(181 - coronaTransformT * 115)

          const r2 = Math.round(224)
          const g2 = Math.round(213 - coronaTransformT * 75)
          const b2 = Math.round(173 - coronaTransformT * 104)

          corona.addColorStop(0.00, `rgba(${r0}, ${g0}, ${b0}, 0.95)`)
          corona.addColorStop(0.25, `rgba(${r1}, ${g1}, ${b1}, 0.85)`)
          corona.addColorStop(0.55, `rgba(${r2}, ${g2}, ${b2}, 0.50)`)
          corona.addColorStop(0.85, `rgba(196, 106, 50, ${0.20 * coronaTransformT})`)
          corona.addColorStop(1.00, 'rgba(0, 0, 0, 0)')
        }

        ctx.fillStyle = corona
        ctx.beginPath()
        ctx.arc(cx, cy, baseCoronaR * 3.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // =========================================================================
    // RENDER BIG BANG SHOCKWAVES & FLASH (Phase 8: 0.90 -> 1.00)
    // =========================================================================
    if (progress >= 0.90) {
      const expProg = Math.max(0, Math.min(1, (progress - 0.90) / 0.10))

      if (expProg > 0) {
        // Radial Flash Wave
        const flashAlpha = Math.max(0, 1 - expProg * 2.5) * 0.85
        if (flashAlpha > 0.01) {
          const flashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.85 * expProg)
          flashGrad.addColorStop(0.00, `rgba(255, 247, 221, ${flashAlpha})`)
          flashGrad.addColorStop(0.25, `rgba(245, 166, 66, ${flashAlpha * 0.75})`)
          flashGrad.addColorStop(0.65, `rgba(196, 106, 50, ${flashAlpha * 0.35})`)
          flashGrad.addColorStop(1.00, 'rgba(0, 0, 0, 0)')

          ctx.fillStyle = flashGrad
          ctx.fillRect(0, 0, width, height)
        }

        // Concentric Expanding Amber-Gold Shockwave Rings
        const shockRadius = expProg * maxRadius * 1.6
        const shockAlpha = Math.max(0, (1 - expProg)) * 0.85

        if (shockAlpha > 0.02) {
          ctx.strokeStyle = `rgba(255, 217, 138, ${shockAlpha})`
          ctx.lineWidth = Math.max(1, 9.0 * (1 - expProg))
          ctx.beginPath()
          ctx.arc(cx, cy, shockRadius, 0, Math.PI * 2)
          ctx.stroke()

          ctx.strokeStyle = `rgba(245, 166, 66, ${shockAlpha * 0.6})`
          ctx.lineWidth = Math.max(1, 4.5 * (1 - expProg))
          ctx.beginPath()
          ctx.arc(cx, cy, shockRadius * 0.84, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }

    // =========================================================================
    // PARTICLE POSITION, COLOR BLENDING & RENDERING LOOP
    // =========================================================================
    ctx.globalCompositeOperation = progress >= 0.54 && progress <= 0.94 ? 'lighter' : 'source-over'

    const isMajestic = this.sourceWorld === 'majestic'

    for (let i = 0; i < this.count; i++) {
      let px = this.originX[i]
      let py = this.originY[i]
      let pAlpha = 1.0
      let pSize = this.baseSize[i]
      let colorTransformT = 0

      if (isMajestic) {
        // =====================================================================
        // MAJESTIC -> MYTHOS: BLACK HOLE IN EMPTY VOID SIMULATION
        // =====================================================================

        // ---------------------------------------------------------------------
        // 1. MAJESTIC DISSOLUTION (0.00 -> 0.26)
        // ---------------------------------------------------------------------
        if (progress < 0.26) {
          const startDelay = this.disintegrateDelay[i]
          if (progress < startDelay) {
            continue
          }

          const localT = (progress - startDelay) / (0.26 - startDelay)
          const easeT = Math.min(1, Math.max(0, localT))
          const moveDist = this.driftDist[i] * (1 - Math.pow(1 - easeT, 2.0))

          px = this.originX[i] + (this.driftVx[i] / this.driftDist[i]) * moveDist
          py = this.originY[i] + (this.driftVy[i] / this.driftDist[i]) * moveDist

          const shimmer = Math.sin(easeT * Math.PI * 3 + this.sparklePhase[i]) * 0.2
          pAlpha = this.isBlackHoleParticle[i] ? Math.min(1, easeT * 2.2 + shimmer) : Math.min(0.4, easeT * 0.8)
          pSize = this.baseSize[i] * (0.85 + easeT * 0.25)
        }

        // ---------------------------------------------------------------------
        // 2. EMPTY VOID & GRAVITATIONAL INFLOW (0.26 -> 0.48)
        // ---------------------------------------------------------------------
        else if (progress >= 0.26 && progress < 0.48) {
          const inflowT = (progress - 0.26) / 0.22
          const easeIn = Math.pow(inflowT, 2.4)

          const startX = this.originX[i] + this.driftVx[i] * 1.15
          const startY = this.originY[i] + this.driftVy[i] * 1.15

          // Target position in inclined accretion disk
          const phi = this.majesticOrbitAngle[i] + inflowT * this.majesticOrbitSpeed[i] * 1.5
          const rTarget = this.majesticOrbitR[i]
          const u = rTarget * Math.cos(phi)
          const v = rTarget * Math.sin(phi) * MAJESTIC_DISK_KY + this.majesticTilt[i]
          const xTarget = cx + u * MAJESTIC_DISK_COS - v * MAJESTIC_DISK_SIN
          const yTarget = cy + u * MAJESTIC_DISK_SIN + v * MAJESTIC_DISK_COS

          px = startX * (1 - easeIn) + xTarget * easeIn
          py = startY * (1 - easeIn) + yTarget * easeIn

          pAlpha = this.isBlackHoleParticle[i] ? 1.0 : 0.35 * (1 - easeIn * 0.5)
          pSize = this.baseSize[i]
        }

        // ---------------------------------------------------------------------
        // 3. HERO BLACK HOLE ACCRETION STRUCTURE & HOLD (0.48 -> 0.66 | ~1.46s)
        // ---------------------------------------------------------------------
        else if (progress >= 0.48 && progress < 0.66) {
          const holdT = (progress - 0.48) / 0.18
          // Continuous, elegant orbital flow around pure pitch-black center
          const phi = this.majesticOrbitAngle[i] + (0.48 * 1.5 + holdT * this.majesticOrbitSpeed[i] * 2.8)
          const rOrbit = this.majesticOrbitR[i]
          const u = rOrbit * Math.cos(phi)
          const v = rOrbit * Math.sin(phi) * MAJESTIC_DISK_KY + this.majesticTilt[i]

          px = cx + u * MAJESTIC_DISK_COS - v * MAJESTIC_DISK_SIN
          py = cy + u * MAJESTIC_DISK_SIN + v * MAJESTIC_DISK_COS

          // Delicate cosmic sparkle on gold particles
          const sparkle = Math.sin(holdT * Math.PI * 4 + this.sparklePhase[i]) * 0.15
          pAlpha = this.isBlackHoleParticle[i] ? Math.min(1, 0.95 + sparkle) : 0.20
          pSize = this.baseSize[i] * (1.0 + sparkle * 0.12)
          colorTransformT = 0
        }

        // ---------------------------------------------------------------------
        // 4. MYTHOS ENERGY TRANSFORMATION AROUND BLACK CENTER (0.66 -> 0.84 | ~1.46s)
        // ---------------------------------------------------------------------
        else if (progress >= 0.66 && progress < 0.84) {
          const transT = (progress - 0.66) / 0.18
          // Accelerating internal orbital circulation
          const phi = this.majesticOrbitAngle[i] + (0.48 * 1.5 + 2.8 + transT * 3.6 + Math.pow(transT, 1.6) * 4.2) * this.majesticOrbitSpeed[i]
          const rOrbit = Math.max(20, this.majesticOrbitR[i] * (1 - transT * 0.14))
          const u = rOrbit * Math.cos(phi)
          const v = rOrbit * Math.sin(phi) * MAJESTIC_DISK_KY + this.majesticTilt[i] * (1 - transT * 0.25)

          px = cx + u * MAJESTIC_DISK_COS - v * MAJESTIC_DISK_SIN
          py = cy + u * MAJESTIC_DISK_SIN + v * MAJESTIC_DISK_COS

          // Energy radiates outward from inner accretion ring: Gold -> Amber -> Mythos Orange
          const normDist = (this.majesticOrbitR[i] - 60.0) / 120.0
          colorTransformT = Math.max(0, Math.min(1, transT * 1.45 - normDist * 0.35))

          pAlpha = this.isBlackHoleParticle[i] ? 1.0 : 0.20
          pSize = this.baseSize[i] * (1.0 + transT * 0.25)
        }

        // ---------------------------------------------------------------------
        // 5. SINGULARITY COMPRESSION (0.84 -> 0.90)
        // ---------------------------------------------------------------------
        else if (progress >= 0.84 && progress < 0.90) {
          const compT = (progress - 0.84) / 0.06
          const easeComp = Math.pow(compT, 2.2)

          const rComp = Math.max(1.0, this.majesticOrbitR[i] * (0.86 - easeComp * 0.80))
          const phi = this.majesticOrbitAngle[i] + (0.48 * 1.5 + 2.8 + 7.8 + compT * 5.0) * this.majesticOrbitSpeed[i]
          const u = rComp * Math.cos(phi)
          const v = rComp * Math.sin(phi) * MAJESTIC_DISK_KY * (1 - easeComp)

          px = cx + u * MAJESTIC_DISK_COS - v * MAJESTIC_DISK_SIN
          py = cy + u * MAJESTIC_DISK_SIN + v * MAJESTIC_DISK_COS

          colorTransformT = 1.0
          pAlpha = 1.0
          pSize = Math.max(1.0, this.baseSize[i] * (1.15 - compT * 0.30))
        }

        // ---------------------------------------------------------------------
        // 6. BIG BANG CONTINUOUS EXPANSION & MYTHOS REVEAL (0.90 -> 1.00)
        // ---------------------------------------------------------------------
        else if (progress >= 0.90) {
          const expT = (progress - 0.90) / 0.10
          const blastDist = maxRadius * this.explodeSpeed[i] * (expT * 1.5 + Math.pow(expT, 1.8) * 1.8)

          px = cx + Math.cos(this.explodeAngle[i]) * blastDist
          py = cy + Math.sin(this.explodeAngle[i]) * blastDist

          colorTransformT = 1.0
          pAlpha = Math.max(0, (1 - Math.pow(expT, 1.25)) * 0.95)
          pSize = this.baseSize[i] * (1.2 + expT * 0.8)
        }

      } else {
        // =====================================================================
        // ABOUT / CODING WORLD PARTICLE DYNAMICS (PRESERVED 100% UNCHANGED)
        // =====================================================================

        // 1. SLOW DELIBERATE DISINTEGRATION (0.00 -> 0.30)
        if (progress < 0.30) {
          const startDelay = this.disintegrateDelay[i]
          if (progress < startDelay) {
            continue
          }

          const localT = (progress - startDelay) / (0.30 - startDelay)
          const easeT = Math.min(1, Math.max(0, localT))
          const moveDist = this.driftDist[i] * (1 - Math.pow(1 - easeT, 2.0))

          px = this.originX[i] + (this.driftVx[i] / this.driftDist[i]) * moveDist
          py = this.originY[i] + (this.driftVy[i] / this.driftDist[i]) * moveDist

          const shimmer = Math.sin(easeT * Math.PI * 4 + this.sparklePhase[i]) * 0.2
          pAlpha = Math.min(1, easeT * 2.5 + shimmer)
          pSize = this.baseSize[i] * (0.85 + easeT * 0.3)
        }

        // 2. FULL PARTICLE FIELD WITH MOMENTUM DRIFT & PAUSE (0.30 -> 0.39)
        else if (progress >= 0.30 && progress < 0.39) {
          const driftT = (progress - 0.30) / 0.09
          const easeDrift = Math.sin(driftT * Math.PI * 0.5)

          const startX = this.originX[i] + this.driftVx[i]
          const startY = this.originY[i] + this.driftVy[i]

          px = startX + this.driftVx[i] * 0.25 * easeDrift
          py = startY + this.driftVy[i] * 0.25 * easeDrift

          pAlpha = 0.95 + Math.sin(progress * 12 + this.sparklePhase[i]) * 0.05
          pSize = this.baseSize[i] * 1.15
        }

        // 3. SLOW GRAVITATIONAL CONVERGENCE / SPIRAL (0.39 -> 0.61)
        else if (progress >= 0.39 && progress < 0.61) {
          const collapseT = (progress - 0.39) / 0.22
          const easeInGrav = Math.pow(collapseT, 2.6)

          const startX = this.originX[i] + this.driftVx[i] * 1.25
          const startY = this.originY[i] + this.driftVy[i] * 1.25
          const startDist = Math.hypot(startX - cx, startY - cy)
          const startAngle = Math.atan2(startY - cy, startX - cx)

          const currentDist = startDist * (1 - easeInGrav) + this.orbRadius[i] * easeInGrav
          const currentAngle = startAngle + this.spiralSpeed[i] * easeInGrav * Math.PI

          px = cx + Math.cos(currentAngle) * currentDist
          py = cy + Math.sin(currentAngle) * currentDist

          pAlpha = 1.0
          pSize = this.baseSize[i] * (1.1 - collapseT * 0.2)
        }

        // 4. WHITE/CHAMPAGNE/GOLD ORB BREATHES & HOLDS (0.61 -> 0.72)
        else if (progress >= 0.61 && progress < 0.72) {
          const orbT = (progress - 0.61) / 0.11
          const pulse = Math.sin(orbT * Math.PI * 4 + this.sparklePhase[i]) * 0.12

          const orbitAngle = this.spiralAngle[i] + orbT * this.spiralSpeed[i] * 2.5
          const currentRadius = Math.max(1.5, this.orbRadius[i] * (1 + pulse))

          px = cx + Math.cos(orbitAngle) * currentRadius
          py = cy + Math.sin(orbitAngle) * currentRadius

          pAlpha = 1.0
          pSize = Math.max(1.2, this.baseSize[i] * 0.95)
        }

        // 5. ORB COLOR TRANSFORMATION: WHITE -> CHAMPAGNE -> GOLD -> AMBER -> ORANGE (0.72 -> 0.86)
        else if (progress >= 0.72 && progress < 0.86) {
          const transformT = (progress - 0.72) / 0.14
          const pulse = Math.sin(transformT * Math.PI * 10 + this.sparklePhase[i]) * (0.16 + transformT * 0.14)

          const orbitAngle = this.spiralAngle[i] + (0.72 * 2.5 + Math.pow(transformT, 1.6) * 6.5) * this.spiralSpeed[i]
          const currentRadius = Math.max(1.5, this.orbRadius[i] * (1 + pulse) * (1 - transformT * 0.20))

          px = cx + Math.cos(orbitAngle) * currentRadius
          py = cy + Math.sin(orbitAngle) * currentRadius

          const normDistFromCore = this.orbRadius[i] / 28.0
          colorTransformT = Math.max(0, Math.min(1, transformT * 1.5 - normDistFromCore * 0.45))

          pAlpha = 1.0
          pSize = Math.max(1.2, this.baseSize[i] * (0.95 + transformT * 0.25))
        }

        // 6. FINAL COMPRESSION TENSION (0.86 -> 0.90)
        else if (progress >= 0.86 && progress < 0.90) {
          const compT = (progress - 0.86) / 0.04
          const easeComp = Math.pow(compT, 2.0)

          const compressRadius = Math.max(1.0, this.orbRadius[i] * (0.80 - easeComp * 0.55))
          const orbitAngle = this.spiralAngle[i] + (0.72 * 2.5 + 6.5 + compT * 3.0) * this.spiralSpeed[i]

          px = cx + Math.cos(orbitAngle) * compressRadius
          py = cy + Math.sin(orbitAngle) * compressRadius

          colorTransformT = 1.0
          pAlpha = 1.0
          pSize = Math.max(1.0, this.baseSize[i] * (1.1 - compT * 0.25))
        }

        // 7. BIG BANG CONTINUOUS EXPANSION (0.90 -> 1.00)
        else if (progress >= 0.90) {
          const expT = (progress - 0.90) / 0.10
          const blastDist = maxRadius * this.explodeSpeed[i] * (expT * 1.5 + Math.pow(expT, 1.8) * 1.8)

          px = cx + Math.cos(this.explodeAngle[i]) * blastDist
          py = cy + Math.sin(this.explodeAngle[i]) * blastDist

          colorTransformT = 1.0
          pAlpha = Math.max(0, (1 - Math.pow(expT, 1.25)) * 0.95)
          pSize = this.baseSize[i] * (1.2 + expT * 0.8)
        }
      }

      if (pAlpha <= 0.01) continue

      // Compute smooth interpolated RGB values
      const curR = (this.aboutR[i] + (this.mythosR[i] - this.aboutR[i]) * colorTransformT) | 0
      const curG = (this.aboutG[i] + (this.mythosG[i] - this.aboutG[i]) * colorTransformT) | 0
      const curB = (this.aboutB[i] + (this.mythosB[i] - this.aboutB[i]) * colorTransformT) | 0

      ctx.fillStyle = `rgba(${curR}, ${curG}, ${curB}, ${pAlpha})`

      if (this.shapeType[i] === 1) {
        const half = pSize * 0.8
        ctx.fillRect(px - half, py - half, half * 2, half * 2)
      } else {
        ctx.beginPath()
        ctx.arc(px, py, pSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // =========================================================================
    // GUARANTEED PITCH-BLACK CORE OVERLAY FOR MAJESTIC BLACK HOLE (p: 0.46 -> 0.88)
    // Ensures light cannot cross into the event horizon center
    // =========================================================================
    if (isMajestic && progress >= 0.46 && progress < 0.88) {
      ctx.globalCompositeOperation = 'source-over'

      let pulse = 0
      if (progress >= 0.48 && progress < 0.66) {
        const holdT = (progress - 0.48) / 0.18
        pulse = Math.sin(holdT * Math.PI * 2) * 0.05
      } else if (progress >= 0.66 && progress < 0.84) {
        const energyT = (progress - 0.66) / 0.18
        pulse = Math.sin(energyT * Math.PI * 8) * (0.08 + energyT * 0.08)
      } else if (progress >= 0.84 && progress < 0.88) {
        const compressT = (progress - 0.84) / 0.04
        pulse = -0.75 * compressT
      }

      const nucleusRadius = Math.max(3.0, 54.0 * (1 + pulse * 0.85))

      // Solid Pitch-Black Nucleus Disk
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(cx, cy, nucleusRadius, 0, Math.PI * 2)
      ctx.fill()

      // Crisp Photon Ring Rim
      let coronaTransformT = 0
      if (progress > 0.66) {
        coronaTransformT = Math.min(1, (progress - 0.66) / 0.18)
      }
      ctx.strokeStyle = coronaTransformT < 0.01
        ? 'rgba(218, 165, 32, 0.50)'
        : `rgba(245, 166, 66, ${0.50 + coronaTransformT * 0.40})`
      ctx.lineWidth = 1.4
      ctx.stroke()
    }

    ctx.restore()
  }

  destroy() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height)
    }
  }
}

export default AboutMythosParticleEngine
