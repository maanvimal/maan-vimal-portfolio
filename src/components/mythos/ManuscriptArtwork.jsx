import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * ============================================================================
 * PROCEDURAL ANCIENT MANUSCRIPT ARTWORK GENERATOR — LIVING RELIC PASS
 * 8 LIVING BOOK PAGES — REFERENCE-MATCHED MULTI-TONE RELIEF & GLOW SYSTEM
 * ============================================================================
 *
 * Master Relic Palette (Single Material Spectrum for Pages 01 & 08):
 * - RELIC_RECESS:   #321407 (Deepest Recess / Shadow Cuts)
 * - RELIC_SHADOW:   #63300F (Dark Relic Orange / Under-Bevel)
 * - RELIC_BODY:     #B85C1F (Primary Relic Orange Visible Body)
 * - RELIC_WARM:     #D9792C (Warm Orange Illuminated Surface)
 * - RELIC_BRIGHT:   #EA963E (Bright Orange Raised Ridge)
 * - RELIC_AMBER:    #F6B557 (Amber Energy Channel / Illuminated Edge)
 * - RELIC_GOLD:     #FFD98A (Hot Gold Highlight & Eyes)
 * - RELIC_WHITE:    #FFF0C2 (White-Gold Core Needle Highlight)
 *
 * 15-Stop Material Spectrum (Master Engine for Pages 02–07):
 * 01. Deep Ember:          #2B0F03
 * 02. Burnt Brown:          #3C1A07
 * 03. Dark Red-Orange:      #532408
 * 04. Deep Orange-Brown:    #6B310B
 * 05. Copper-Orange:        #853F0E
 * 06. Warm Copper:          #8F501D
 * 07. Bright Copper:        #A55618
 * 08. Deep Amber:           #C26B22
 * 09. Warm Orange:          #DD8535
 * 10. Light Amber:          #E3A150
 * 11. Bright Amber:         #FCBE5A
 * 12. Pale Bronze:          #AB8659
 * 13. Pale Gold:            #D5B288
 * 14. Hot Gold:             #F7D07A
 * 15. White-Gold:           #FBFDFD
 *
 * Final 8-Page Sequence:
 * 01. Phoenix (Monumental Symmetrical Heraldic Relief Emblem — Approved Relic)
 * 02. Solar Celestial Astrolabe (Master Reference: Concentric Rings & Polar Web)
 * 03. Anubis + Balance of Truth (Excavated Egyptian Wall Relief with Ma'at Scales)
 * 04. Merlin's Sword (Legendary Broadsword Relic with Carved Fuller & Mandorla)
 * 05. Greek Temple Ruin (Classical Pediment, Frieze & Fractured Column)
 * 06. Monumental Wings (Sacred Phoenix Bilateral Relief with Sculpted Feathers)
 * 07. Thor's Hammer (Mjölnir Ancient Nordic Archaeological Relic Relief)
 * 08. Infinity (Sigillum Infinitum 3D Lemniscate Möbius Eternal Seal)
 */


// 15-Stop Master Engine Constants (Pages 02–07)
const C01_DEEP_EMBER        = '#2B0F03'
const C02_BURNT_BROWN       = '#3C1A07'
const C03_DARK_RED_ORANGE   = '#532408'
const C04_DEEP_ORANGE_BROWN = '#6B310B'
const C05_COPPER_ORANGE     = '#853F0E'
const C06_WARM_COPPER       = '#8F501D'
const C07_BRIGHT_COPPER     = '#A55618'
const C08_DEEP_AMBER        = '#C26B22'
const C09_WARM_ORANGE       = '#DD8535'
const C10_LIGHT_AMBER       = '#E3A150'
const C11_BRIGHT_AMBER      = '#FCBE5A'
const C12_PALE_BRONZE       = '#AB8659'
const C13_PALE_GOLD         = '#D5B288'
const C14_HOT_GOLD          = '#F7D07A'
const C15_WHITE_GOLD        = '#FBFDFD'

/**
 * Creates multi-stop directional lighting gradients for Pages 02–07
 */
function createReliefGradient(ctx, x1, y1, x2, y2, mode = 'full') {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2)
  if (mode === 'structural') {
    grad.addColorStop(0.00, C01_DEEP_EMBER)
    grad.addColorStop(0.18, C02_BURNT_BROWN)
    grad.addColorStop(0.35, C03_DARK_RED_ORANGE)
    grad.addColorStop(0.55, C04_DEEP_ORANGE_BROWN)
    grad.addColorStop(0.72, C05_COPPER_ORANGE)
    grad.addColorStop(0.88, C06_WARM_COPPER)
    grad.addColorStop(1.00, C07_BRIGHT_COPPER)
  } else if (mode === 'energy') {
    grad.addColorStop(0.00, C07_BRIGHT_COPPER)
    grad.addColorStop(0.22, C08_DEEP_AMBER)
    grad.addColorStop(0.45, C09_WARM_ORANGE)
    grad.addColorStop(0.68, C10_LIGHT_AMBER)
    grad.addColorStop(0.85, C11_BRIGHT_AMBER)
    grad.addColorStop(0.95, C14_HOT_GOLD)
    grad.addColorStop(1.00, C15_WHITE_GOLD)
  } else if (mode === 'gold') {
    grad.addColorStop(0.00, C06_WARM_COPPER)
    grad.addColorStop(0.28, C12_PALE_BRONZE)
    grad.addColorStop(0.52, C13_PALE_GOLD)
    grad.addColorStop(0.80, C14_HOT_GOLD)
    grad.addColorStop(1.00, C15_WHITE_GOLD)
  } else {
    grad.addColorStop(0.00, C02_BURNT_BROWN)
    grad.addColorStop(0.12, C03_DARK_RED_ORANGE)
    grad.addColorStop(0.24, C04_DEEP_ORANGE_BROWN)
    grad.addColorStop(0.38, C05_COPPER_ORANGE)
    grad.addColorStop(0.52, C06_WARM_COPPER)
    grad.addColorStop(0.65, C07_BRIGHT_COPPER)
    grad.addColorStop(0.76, C09_WARM_ORANGE)
    grad.addColorStop(0.85, C10_LIGHT_AMBER)
    grad.addColorStop(0.93, C11_BRIGHT_AMBER)
    grad.addColorStop(1.00, C14_HOT_GOLD)
  }
  return grad
}


/**
 * Draws a dimensional chiseled relief polygon with multi-layer material depth for Pages 02–07
 */
function drawReliefMass(
  ctx,
  pathFn,
  {
    fillColor = C05_COPPER_ORANGE,
    borderColor = C07_BRIGHT_COPPER,
    borderWidth = 3.5,
    withRidge = true,
    ridgeFn = null,
    withEnergyVein = false,
    veinFn = null,
    withApexGlint = false,
    apexPoint = null,
  } = {},
  isGlowOnly = false,
) {
  if (isGlowOnly) {
    if (withEnergyVein && veinFn) {
      ctx.save()
      ctx.shadowColor = 'rgba(133, 63, 14, 0.45)'
      ctx.shadowBlur = 24
      ctx.strokeStyle = 'rgba(133, 63, 14, 0.35)'
      ctx.lineWidth = 6.0
      ctx.beginPath()
      veinFn(ctx)
      ctx.stroke()
      ctx.restore()

      ctx.save()
      ctx.shadowColor = 'rgba(221, 133, 53, 0.70)'
      ctx.shadowBlur = 14
      ctx.strokeStyle = 'rgba(221, 133, 53, 0.60)'
      ctx.lineWidth = 3.5
      ctx.beginPath()
      veinFn(ctx)
      ctx.stroke()
      ctx.restore()

      ctx.save()
      ctx.shadowColor = 'rgba(252, 190, 90, 0.95)'
      ctx.shadowBlur = 6
      ctx.strokeStyle = 'rgba(252, 190, 90, 0.90)'
      ctx.lineWidth = 1.6
      ctx.beginPath()
      veinFn(ctx)
      ctx.stroke()
      ctx.restore()
    }

    if (withApexGlint && apexPoint) {
      const [ax, ay, ar = 3.5] = apexPoint
      ctx.save()
      ctx.shadowColor = 'rgba(247, 208, 122, 1.0)'
      ctx.shadowBlur = 12
      ctx.fillStyle = C15_WHITE_GOLD
      ctx.beginPath()
      ctx.arc(ax, ay, ar, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  } else {
    ctx.strokeStyle = C01_DEEP_EMBER
    ctx.lineWidth = borderWidth + 6.0
    ctx.beginPath()
    pathFn(ctx)
    ctx.stroke()

    ctx.strokeStyle = C02_BURNT_BROWN
    ctx.lineWidth = borderWidth + 3.2
    ctx.beginPath()
    pathFn(ctx)
    ctx.stroke()

    ctx.fillStyle = fillColor
    ctx.beginPath()
    pathFn(ctx)
    ctx.fill()

    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth
    ctx.beginPath()
    pathFn(ctx)
    ctx.stroke()

    if (withRidge && ridgeFn) {
      ctx.strokeStyle = C06_WARM_COPPER
      ctx.lineWidth = Math.max(1.2, borderWidth * 0.45)
      ctx.beginPath()
      ridgeFn(ctx)
      ctx.stroke()
    }

    if (withEnergyVein && veinFn) {
      ctx.strokeStyle = C09_WARM_ORANGE
      ctx.lineWidth = Math.max(1.8, borderWidth * 0.35)
      ctx.beginPath()
      veinFn(ctx)
      ctx.stroke()

      ctx.strokeStyle = C11_BRIGHT_AMBER
      ctx.lineWidth = Math.max(0.8, borderWidth * 0.16)
      ctx.beginPath()
      veinFn(ctx)
      ctx.stroke()
    }

    if (withApexGlint && apexPoint) {
      const [ax, ay, ar = 3.5] = apexPoint
      ctx.fillStyle = C11_BRIGHT_AMBER
      ctx.beginPath()
      ctx.arc(ax, ay, ar, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C14_HOT_GOLD
      ctx.beginPath()
      ctx.arc(ax, ay, ar * 0.6, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C15_WHITE_GOLD
      ctx.beginPath()
      ctx.arc(ax, ay, ar * 0.25, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

/**
/**
 * Carved grooves for Pages 02–07
 */
function drawReliefGroove(
  ctx,
  pathFn,
  { width = 4.0, isHot = false, isGlint = false } = {},
  isGlowOnly = false,
) {
  if (isGlowOnly) {
    if (isHot || isGlint) {
      ctx.save()
      ctx.shadowColor = isGlint ? 'rgba(247, 208, 122, 1.0)' : 'rgba(252, 190, 90, 0.85)'
      ctx.shadowBlur = width * 3.2
      ctx.strokeStyle = isGlint ? C15_WHITE_GOLD : 'rgba(252, 190, 90, 0.90)'
      ctx.lineWidth = Math.max(1.2, width * 0.6)
      ctx.beginPath()
      pathFn(ctx)
      ctx.stroke()
      ctx.restore()
    }
  } else {
    ctx.strokeStyle = C01_DEEP_EMBER
    ctx.lineWidth = width * 2.6
    ctx.beginPath()
    pathFn(ctx)
    ctx.stroke()

    ctx.strokeStyle = C02_BURNT_BROWN
    ctx.lineWidth = width * 1.8
    ctx.beginPath()
    pathFn(ctx)
    ctx.stroke()

    ctx.strokeStyle = C05_COPPER_ORANGE
    ctx.lineWidth = width * 1.2
    ctx.beginPath()
    pathFn(ctx)
    ctx.stroke()

    ctx.strokeStyle = C07_BRIGHT_COPPER
    ctx.lineWidth = width * 0.65
    ctx.beginPath()
    pathFn(ctx)
    ctx.stroke()

    if (isHot) {
      ctx.strokeStyle = C09_WARM_ORANGE
      ctx.lineWidth = Math.max(1.0, width * 0.32)
      ctx.beginPath()
      pathFn(ctx)
      ctx.stroke()

      ctx.strokeStyle = C11_BRIGHT_AMBER
      ctx.lineWidth = Math.max(0.6, width * 0.14)
      ctx.beginPath()
      pathFn(ctx)
      ctx.stroke()
    }

    if (isGlint) {
      ctx.strokeStyle = C14_HOT_GOLD
      ctx.lineWidth = Math.max(0.6, width * 0.12)
      ctx.beginPath()
      pathFn(ctx)
      ctx.stroke()
    }
  }
}


/**
 * Debris particles for Pages 02–07
 */
function drawDebrisParticles(ctx, cx, cy, points, isGlowOnly = false) {
  points.forEach(([x, y, r, type]) => {
    const isHot = type === 'ember' || type === 'glint' || type === 'hotspot'
    const isGlint = type === 'glint' || type === 'hotspot'
    const isStone = type === 'stone'

    if (isGlowOnly) {
      if (isHot) {
        ctx.save()
        ctx.shadowColor = isGlint ? 'rgba(247, 208, 122, 1.0)' : 'rgba(252, 190, 90, 0.90)'
        ctx.shadowBlur = r * (isGlint ? 4.5 : 3.0)
        ctx.fillStyle = isGlint ? C15_WHITE_GOLD : 'rgba(252, 190, 90, 0.90)'
        ctx.beginPath()
        ctx.arc(cx + x, cy + y, r * 1.1, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      } else if (!isStone) {
        ctx.save()
        ctx.shadowColor = 'rgba(194, 107, 34, 0.40)'
        ctx.shadowBlur = r * 2.0
        ctx.fillStyle = 'rgba(194, 107, 34, 0.30)'
        ctx.beginPath()
        ctx.arc(cx + x, cy + y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    } else {
      if (isGlint) {
        ctx.fillStyle = C14_HOT_GOLD
        ctx.beginPath()
        ctx.arc(cx + x, cy + y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = C15_WHITE_GOLD
        ctx.beginPath()
        ctx.arc(cx + x, cy + y, r * 0.4, 0, Math.PI * 2)
        ctx.fill()
      } else if (isHot) {
        ctx.fillStyle = C10_LIGHT_AMBER
        ctx.beginPath()
        ctx.arc(cx + x, cy + y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = C11_BRIGHT_AMBER
        ctx.beginPath()
        ctx.arc(cx + x, cy + y, r * 0.5, 0, Math.PI * 2)
        ctx.fill()
      } else if (isStone) {
        ctx.fillStyle = C02_BURNT_BROWN
        ctx.fillRect(cx + x - r, cy + y - r, r * 2, r * 2)
        ctx.strokeStyle = C04_DEEP_ORANGE_BROWN
        ctx.lineWidth = 0.8
        ctx.strokeRect(cx + x - r, cy + y - r, r * 2, r * 2)
      } else {
        ctx.fillStyle = C06_WARM_COPPER
        ctx.beginPath()
        ctx.arc(cx + x, cy + y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  })
}


/**
 * Base black manuscript surface (70%+ black negative space)
 */
function drawManuscriptBase(ctx, width, height) {
  ctx.fillStyle = '#050505'
  ctx.fillRect(0, 0, width, height)

  // Archaeological background coordinates
  ctx.strokeStyle = 'rgba(50, 20, 7, 0.08)'
  ctx.lineWidth = 0.8
  for (let x = 60; x < width - 60; x += 80) {
    ctx.beginPath()
    ctx.moveTo(x, 40)
    ctx.lineTo(x, height - 40)
    ctx.stroke()
  }
  for (let y = 60; y < height - 60; y += 80) {
    ctx.beginPath()
    ctx.moveTo(40, y)
    ctx.lineTo(width - 40, y)
    ctx.stroke()
  }

  // Dark structural marginal border
  ctx.strokeStyle = 'rgba(99, 48, 15, 0.20)'
  ctx.lineWidth = 1.0
  ctx.strokeRect(36, 36, width - 72, height - 72)

  // Corner boundary bracket accents
  const tick = 28
  ;[
    [36, 36, 1, 1],
    [width - 36, 36, -1, 1],
    [36, height - 36, 1, -1],
    [width - 36, height - 36, -1, -1],
  ].forEach(([bx, by, dx, dy]) => {
    ctx.strokeStyle = 'rgba(184, 92, 31, 0.35)'
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(bx, by + dy * tick)
    ctx.lineTo(bx, by)
    ctx.lineTo(bx + dx * tick, by)
    ctx.stroke()
  })
}

// ============================================================================
// 1. PAGE 01 — MONUMENTAL ARCHAEOLOGICAL PHOENIX RELIC (APPROVED MASTER DESIGN)
// Multi-Tier Physical Relief: 5-Tier Layered Wings, Divine Flame Mandorla Core,
// 5-Quill Radiating Flame Crest, Piercing Divine Eyes & 7 Layered Tail Plumes.
// Commands ~75% usable page height & ~70% width with deep carved copper relief.
// ============================================================================
function drawPhoenixHeraldicPage(ctx, cx, cy, isGlowOnly = false) {
  // Gradients for directional relief illumination
  const gWingL = createReliefGradient(ctx, cx, cy + 50, cx - 380, cy - 380, 'full')
  const gWingR = createReliefGradient(ctx, cx, cy + 50, cx + 380, cy - 380, 'full')
  const gChest = createReliefGradient(ctx, cx, cy + 80, cx, cy - 180, 'gold')
  const gCrown = createReliefGradient(ctx, cx, cy - 120, cx, cy - 275, 'energy')
  const gTail = createReliefGradient(ctx, cx, cy + 80, cx, cy + 420, 'full')

  // --------------------------------------------------------------------------
  // A. WING TIER 1: MAJOR PRIMARY FLIGHT QUILLS (Outermost Sweeping Blade Wings)
  // 8 Symmetrical Sculpted Flight Blades reaching to (cx ± 375, cy - 380)
  // --------------------------------------------------------------------------
  // Left Wing — Primary Master Span
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 24, cy + 75)
      c.bezierCurveTo(cx - 135, cy + 65, cx - 295, cy - 40, cx - 375, cy - 380)
      c.bezierCurveTo(cx - 305, cy - 295, cx - 185, cy - 155, cx - 75, cy + 20)
      c.closePath()
    },
    {
      fillColor: gWingL,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 5.6,
      withRidge: true,
      ridgeFn: (c) => {
        // Individual primary feather spine ridges
        for (let f = 1; f <= 8; f++) {
          const sx = cx - 375 + (f - 1) * 36
          const sy = cy - 380 + (f - 1) * 44
          c.moveTo(sx, sy)
          c.quadraticCurveTo(cx - 220 + f * 18, cy - 180 + f * 28, cx - 35, cy + 45 + f * 4)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 24, cy + 60)
        c.bezierCurveTo(cx - 125, cy + 50, cx - 275, cy - 45, cx - 365, cy - 370)
        c.moveTo(cx - 55, cy + 30)
        c.bezierCurveTo(cx - 150, cy + 10, cx - 245, cy - 110, cx - 330, cy - 325)
      },
      withApexGlint: true,
      apexPoint: [cx - 375, cy - 380, 4.8],
    },
    isGlowOnly,
  )

  // Right Wing — Primary Master Span
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx + 24, cy + 75)
      c.bezierCurveTo(cx + 135, cy + 65, cx + 295, cy - 40, cx + 375, cy - 380)
      c.bezierCurveTo(cx + 305, cy - 295, cx + 185, cy - 155, cx + 75, cy + 20)
      c.closePath()
    },
    {
      fillColor: gWingR,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 5.6,
      withRidge: true,
      ridgeFn: (c) => {
        for (let f = 1; f <= 8; f++) {
          const sx = cx + 375 - (f - 1) * 36
          const sy = cy - 380 + (f - 1) * 44
          c.moveTo(sx, sy)
          c.quadraticCurveTo(cx + 220 - f * 18, cy - 180 + f * 28, cx + 35, cy + 45 + f * 4)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx + 24, cy + 60)
        c.bezierCurveTo(cx + 135, cy + 50, cx + 275, cy - 45, cx + 365, cy - 370)
        c.moveTo(cx + 55, cy + 30)
        c.bezierCurveTo(cx + 150, cy + 10, cx + 245, cy - 110, cx + 330, cy - 325)
      },
      withApexGlint: true,
      apexPoint: [cx + 375, cy - 380, 4.8],
    },
    isGlowOnly,
  )

  // --------------------------------------------------------------------------
  // B. WING TIER 2: SECONDARY FLIGHT PLATES (Upper Wing Mid-Span)
  // --------------------------------------------------------------------------
  // Left Wing — Secondary Tier (Span to cx - 310, cy - 280)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 24, cy + 65)
      c.bezierCurveTo(cx - 105, cy + 55, cx - 225, cy - 20, cx - 310, cy - 280)
      c.bezierCurveTo(cx - 255, cy - 210, cx - 155, cy - 100, cx - 65, cy + 25)
      c.closePath()
    },
    {
      fillColor: gWingL,
      borderColor: C06_WARM_COPPER,
      borderWidth: 4.5,
      withRidge: true,
      ridgeFn: (c) => {
        for (let f = 1; f <= 6; f++) {
          const sx = cx - 310 + (f - 1) * 38
          const sy = cy - 280 + (f - 1) * 42
          c.moveTo(sx, sy)
          c.quadraticCurveTo(cx - 180 + f * 16, cy - 120 + f * 24, cx - 30, cy + 40 + f * 4)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 24, cy + 50)
        c.bezierCurveTo(cx - 95, cy + 40, cx - 205, cy - 25, cx - 295, cy - 270)
      },
      withApexGlint: true,
      apexPoint: [cx - 310, cy - 280, 4.2],
    },
    isGlowOnly,
  )

  // Right Wing — Secondary Tier (Span to cx + 310, cy - 280)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx + 24, cy + 65)
      c.bezierCurveTo(cx + 105, cy + 55, cx + 225, cy - 20, cx + 310, cy - 280)
      c.bezierCurveTo(cx + 255, cy - 210, cx + 155, cy - 100, cx + 65, cy + 25)
      c.closePath()
    },
    {
      fillColor: gWingR,
      borderColor: C06_WARM_COPPER,
      borderWidth: 4.5,
      withRidge: true,
      ridgeFn: (c) => {
        for (let f = 1; f <= 6; f++) {
          const sx = cx + 310 - (f - 1) * 38
          const sy = cy - 280 + (f - 1) * 42
          c.moveTo(sx, sy)
          c.quadraticCurveTo(cx + 180 - f * 16, cy - 120 + f * 24, cx + 30, cy + 40 + f * 4)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx + 24, cy + 50)
        c.bezierCurveTo(cx + 95, cy + 40, cx + 205, cy - 25, cx + 295, cy - 270)
      },
      withApexGlint: true,
      apexPoint: [cx + 310, cy - 280, 4.2],
    },
    isGlowOnly,
  )

  // --------------------------------------------------------------------------
  // C. WING TIER 3: GREATER WING COVERTS (Dense Mid-Wing Feather Shields)
  // --------------------------------------------------------------------------
  // Left Wing — Greater Coverts (Span to cx - 240, cy - 180)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 20, cy + 50)
      c.bezierCurveTo(cx - 85, cy + 40, cx - 170, cy - 10, cx - 240, cy - 180)
      c.bezierCurveTo(cx - 195, cy - 125, cx - 120, cy - 50, cx - 55, cy + 30)
      c.closePath()
    },
    {
      fillColor: C05_COPPER_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.8,
      withRidge: true,
      ridgeFn: (c) => {
        for (let f = 1; f <= 5; f++) {
          const sx = cx - 240 + (f - 1) * 36
          const sy = cy - 180 + (f - 1) * 38
          c.moveTo(sx, sy)
          c.quadraticCurveTo(cx - 130 + f * 14, cy - 60 + f * 20, cx - 25, cy + 35)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 20, cy + 40)
        c.bezierCurveTo(cx - 75, cy + 30, cx - 150, cy - 15, cx - 228, cy - 170)
      },
      withApexGlint: true,
      apexPoint: [cx - 240, cy - 180, 3.8],
    },
    isGlowOnly,
  )

  // Right Wing — Greater Coverts (Span to cx + 240, cy - 180)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx + 20, cy + 50)
      c.bezierCurveTo(cx + 85, cy + 40, cx + 170, cy - 10, cx + 240, cy - 180)
      c.bezierCurveTo(cx + 195, cy - 125, cx + 120, cy - 50, cx + 55, cy + 30)
      c.closePath()
    },
    {
      fillColor: C05_COPPER_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.8,
      withRidge: true,
      ridgeFn: (c) => {
        for (let f = 1; f <= 5; f++) {
          const sx = cx + 240 - (f - 1) * 36
          const sy = cy - 180 + (f - 1) * 38
          c.moveTo(sx, sy)
          c.quadraticCurveTo(cx + 130 - f * 14, cy - 60 + f * 20, cx + 25, cy + 35)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx + 20, cy + 40)
        c.bezierCurveTo(cx + 85, cy + 30, cx + 150, cy - 15, cx + 228, cy - 170)
      },
      withApexGlint: true,
      apexPoint: [cx + 240, cy - 180, 3.8],
    },
    isGlowOnly,
  )

  // --------------------------------------------------------------------------
  // D. WING TIER 4 & 5: LESSER COVERTS & SHOULDER EPAULETTE MANDORLAS
  // --------------------------------------------------------------------------
  // Left Lesser Coverts (Span to cx - 165, cy - 85)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 18, cy + 35)
      c.bezierCurveTo(cx - 65, cy + 25, cx - 120, cy - 5, cx - 165, cy - 85)
      c.bezierCurveTo(cx - 130, cy - 45, cx - 80, cy - 5, cx - 40, cy + 35)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.4,
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 18, cy + 25)
        c.bezierCurveTo(cx - 55, cy + 15, cx - 105, cy - 10, cx - 155, cy - 75)
      },
      withApexGlint: true,
      apexPoint: [cx - 165, cy - 85, 3.5],
    },
    isGlowOnly,
  )

  // Right Lesser Coverts (Span to cx + 165, cy - 85)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx + 18, cy + 35)
      c.bezierCurveTo(cx + 65, cy + 25, cx + 120, cy - 5, cx + 165, cy - 85)
      c.bezierCurveTo(cx + 130, cy - 45, cx + 80, cy - 5, cx + 40, cy + 35)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.4,
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx + 18, cy + 25)
        c.bezierCurveTo(cx + 55, cy + 15, cx + 105, cy - 10, cx + 155, cy - 75)
      },
      withApexGlint: true,
      apexPoint: [cx + 165, cy - 85, 3.5],
    },
    isGlowOnly,
  )

  // Left & Right Shoulder Epaulettes (Wing-Hinge Pivot Mandorlas)
  ;[-70, 70].forEach((sx) => {
    drawReliefMass(
      ctx,
      (c) => {
        c.moveTo(cx + sx - (sx > 0 ? 18 : -18), cy - 65)
        c.quadraticCurveTo(cx + sx, cy - 90, cx + sx + (sx > 0 ? 18 : -18), cy - 65)
        c.quadraticCurveTo(cx + sx, cy - 35, cx + sx - (sx > 0 ? 18 : -18), cy - 65)
        c.closePath()
      },
      {
        fillColor: C05_COPPER_ORANGE,
        borderColor: C11_BRIGHT_AMBER,
        borderWidth: 3.2,
        withEnergyVein: true,
        veinFn: (c) => c.arc(cx + sx, cy - 65, 8, 0, Math.PI * 2),
        withApexGlint: true,
        apexPoint: [cx + sx, cy - 65, 3.8],
      },
      isGlowOnly,
    )
  })

  // --------------------------------------------------------------------------
  // E. CENTRAL PHOENIX TORSO & DIVINE FLAME MANDORLA CORE (Heart of the Relic)
  // --------------------------------------------------------------------------
  // Central Cuirass / Pectoral Breastplate Relief
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx, cy - 45)
      c.lineTo(cx + 42, cy - 15)
      c.lineTo(cx + 36, cy + 70)
      c.lineTo(cx, cy + 95)
      c.lineTo(cx - 36, cy + 70)
      c.lineTo(cx - 42, cy - 15)
      c.closePath()
    },
    {
      fillColor: gChest,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.4,
      withRidge: true,
      ridgeFn: (c) => {
        // Interlocking pectoral chevron ribs
        c.moveTo(cx - 32, cy - 5)
        c.lineTo(cx, cy + 12)
        c.lineTo(cx + 32, cy - 5)
        c.moveTo(cx - 28, cy + 25)
        c.lineTo(cx, cy + 42)
        c.lineTo(cx + 28, cy + 25)
      },
    },
    isGlowOnly,
  )

  // Divine Flame Mandorla Core Chamber (Sacred Heart Center)
  const gHeartCore = ctx.createRadialGradient(cx, cy + 10, 0, cx, cy + 10, 24)
  gHeartCore.addColorStop(0.00, C15_WHITE_GOLD)
  gHeartCore.addColorStop(0.20, C14_HOT_GOLD)
  gHeartCore.addColorStop(0.50, C11_BRIGHT_AMBER)
  gHeartCore.addColorStop(0.80, C09_WARM_ORANGE)
  gHeartCore.addColorStop(1.00, C04_DEEP_ORANGE_BROWN)

  drawReliefMass(
    ctx,
    (c) => {
      // Vertical sacred vesica mandorla
      c.moveTo(cx, cy - 25)
      c.quadraticCurveTo(cx + 24, cy + 10, cx, cy + 45)
      c.quadraticCurveTo(cx - 24, cy + 10, cx, cy - 25)
      c.closePath()
    },
    {
      fillColor: gHeartCore,
      borderColor: C14_HOT_GOLD,
      borderWidth: 3.6,
      withEnergyVein: true,
      veinFn: (c) => {
        // Radiant 4-pointed solar cross in the heart core
        c.moveTo(cx, cy - 18)
        c.lineTo(cx, cy + 38)
        c.moveTo(cx - 16, cy + 10)
        c.lineTo(cx + 16, cy + 10)
      },
      withApexGlint: true,
      apexPoint: [cx, cy + 10, 5.2],
    },
    isGlowOnly,
  )

  // --------------------------------------------------------------------------
  // F. NECK, HEAD & PIERCING DIVINE EYES
  // --------------------------------------------------------------------------
  // Segmented Throat Column
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 16, cy - 45)
      c.lineTo(cx + 16, cy - 45)
      c.lineTo(cx + 12, cy - 125)
      c.lineTo(cx - 12, cy - 125)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.5,
      withRidge: true,
      ridgeFn: (c) => {
        for (let y = cy - 110; y < cy - 50; y += 18) {
          c.moveTo(cx - 14, y)
          c.lineTo(cx, y + 8)
          c.lineTo(cx + 14, y)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx, cy - 120)
        c.lineTo(cx, cy - 45)
      },
    },
    isGlowOnly,
  )

  // Mythic Head & Beak Assembly (Aquiline Archaeological Silhouette)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx, cy - 185)
      c.lineTo(cx + 22, cy - 155)
      c.lineTo(cx + 14, cy - 135)
      c.lineTo(cx, cy - 118) // Sharp beak point facing downward
      c.lineTo(cx - 14, cy - 135)
      c.lineTo(cx - 22, cy - 155)
      c.closePath()
    },
    {
      fillColor: gCrown,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.8,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx - 12, cy - 140)
        c.lineTo(cx, cy - 120)
        c.lineTo(cx + 12, cy - 140)
      },
      withApexGlint: true,
      apexPoint: [cx, cy - 118, 3.8],
    },
    isGlowOnly,
  )

  // Piercing Divine Eyes (Tiny, Intense, Sacred Points)
  ;[-13, 13].forEach((ex) => {
    drawReliefMass(
      ctx,
      (c) => c.arc(cx + ex, cy - 150, 4.2, 0, Math.PI * 2),
      {
        fillColor: C14_HOT_GOLD,
        borderColor: C15_WHITE_GOLD,
        borderWidth: 1.6,
        withApexGlint: true,
        apexPoint: [cx + ex, cy - 150, 2.4],
      },
      isGlowOnly,
    )
  })

  // --------------------------------------------------------------------------
  // G. 5-QUILL RADIATING FLAME CREST / CROWN (Distinctive Mythological Silhouette)
  // --------------------------------------------------------------------------
  // Center Tall Crown Quill (reaching cy - 275)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 8, cy - 180)
      c.lineTo(cx, cy - 275)
      c.lineTo(cx + 8, cy - 180)
      c.closePath()
    },
    {
      fillColor: gCrown,
      borderColor: C11_BRIGHT_AMBER,
      borderWidth: 3.4,
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx, cy - 180)
        c.lineTo(cx, cy - 270)
      },
      withApexGlint: true,
      apexPoint: [cx, cy - 275, 4.8],
    },
    isGlowOnly,
  )

  // Left & Right Mid Crown Quills (reaching cy - 248)
  ;[-1, 1].forEach((dir) => {
    drawReliefMass(
      ctx,
      (c) => {
        c.moveTo(cx + dir * 6, cy - 178)
        c.lineTo(cx + dir * 35, cy - 248)
        c.lineTo(cx + dir * 18, cy - 175)
        c.closePath()
      },
      {
        fillColor: C05_COPPER_ORANGE,
        borderColor: C07_BRIGHT_COPPER,
        borderWidth: 3.0,
        withEnergyVein: true,
        veinFn: (c) => {
          c.moveTo(cx + dir * 12, cy - 176)
          c.lineTo(cx + dir * 33, cy - 244)
        },
        withApexGlint: true,
        apexPoint: [cx + dir * 35, cy - 248, 4.0],
      },
      isGlowOnly,
    )
  })

  // Left & Right Outer Crown Quills (reaching cy - 218)
  ;[-1, 1].forEach((dir) => {
    drawReliefMass(
      ctx,
      (c) => {
        c.moveTo(cx + dir * 16, cy - 170)
        c.lineTo(cx + dir * 65, cy - 218)
        c.lineTo(cx + dir * 26, cy - 165)
        c.closePath()
      },
      {
        fillColor: C04_DEEP_ORANGE_BROWN,
        borderColor: C07_BRIGHT_COPPER,
        borderWidth: 2.8,
        withEnergyVein: true,
        veinFn: (c) => {
          c.moveTo(cx + dir * 20, cy - 168)
          c.lineTo(cx + dir * 62, cy - 215)
        },
        withApexGlint: true,
        apexPoint: [cx + dir * 65, cy - 218, 3.6],
      },
      isGlowOnly,
    )
  })

  // --------------------------------------------------------------------------
  // H. FLOWING DESCENDING TAIL PLUMES (7 Sculpted Relic Blades to cy + 418)
  // --------------------------------------------------------------------------
  // Center Master Tail Plume (Longest Hero Quill to cy + 418)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 12, cy + 90)
      c.lineTo(cx - 14, cy + 280)
      c.lineTo(cx, cy + 418)
      c.lineTo(cx + 14, cy + 280)
      c.lineTo(cx + 12, cy + 90)
      c.closePath()
    },
    {
      fillColor: gTail,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.4,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx, cy + 95)
        c.lineTo(cx, cy + 410)
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx, cy + 100)
        c.lineTo(cx, cy + 412)
      },
      withApexGlint: true,
      apexPoint: [cx, cy + 418, 4.6],
    },
    isGlowOnly,
  )

  // Inner Left & Right Plumes (Span to cx ± 42, cy + 375)
  ;[-1, 1].forEach((dir) => {
    drawReliefMass(
      ctx,
      (c) => {
        c.moveTo(cx + dir * 10, cy + 88)
        c.quadraticCurveTo(cx + dir * 25, cy + 240, cx + dir * 42, cy + 375)
        c.quadraticCurveTo(cx + dir * 15, cy + 250, cx + dir * 4, cy + 88)
        c.closePath()
      },
      {
        fillColor: C05_COPPER_ORANGE,
        borderColor: C07_BRIGHT_COPPER,
        borderWidth: 3.6,
        withEnergyVein: true,
        veinFn: (c) => {
          c.moveTo(cx + dir * 8, cy + 92)
          c.quadraticCurveTo(cx + dir * 20, cy + 245, cx + dir * 40, cy + 370)
        },
        withApexGlint: true,
        apexPoint: [cx + dir * 42, cy + 375, 4.0],
      },
      isGlowOnly,
    )
  })

  // Mid Left & Right Plumes (Span to cx ± 95, cy + 320)
  ;[-1, 1].forEach((dir) => {
    drawReliefMass(
      ctx,
      (c) => {
        c.moveTo(cx + dir * 18, cy + 85)
        c.quadraticCurveTo(cx + dir * 55, cy + 210, cx + dir * 95, cy + 320)
        c.quadraticCurveTo(cx + dir * 45, cy + 215, cx + dir * 12, cy + 85)
        c.closePath()
      },
      {
        fillColor: C04_DEEP_ORANGE_BROWN,
        borderColor: C06_WARM_COPPER,
        borderWidth: 3.2,
        withEnergyVein: true,
        veinFn: (c) => {
          c.moveTo(cx + dir * 15, cy + 88)
          c.quadraticCurveTo(cx + dir * 50, cy + 210, cx + dir * 92, cy + 315)
        },
        withApexGlint: true,
        apexPoint: [cx + dir * 95, cy + 320, 3.6],
      },
      isGlowOnly,
    )
  })

  // Outer Fan Left & Right Plumes (Span to cx ± 150, cy + 250)
  ;[-1, 1].forEach((dir) => {
    drawReliefMass(
      ctx,
      (c) => {
        c.moveTo(cx + dir * 26, cy + 80)
        c.quadraticCurveTo(cx + dir * 85, cy + 175, cx + dir * 150, cy + 250)
        c.quadraticCurveTo(cx + dir * 75, cy + 175, cx + dir * 20, cy + 80)
        c.closePath()
      },
      {
        fillColor: C03_DARK_RED_ORANGE,
        borderColor: C06_WARM_COPPER,
        borderWidth: 3.0,
        withApexGlint: true,
        apexPoint: [cx + dir * 150, cy + 250, 3.4],
      },
      isGlowOnly,
    )
  })

  // --------------------------------------------------------------------------
  // I. RELIC DEBRIS & ARCHAEOLOGICAL MICRO-PARTICLES (Curated Relic Points)
  // --------------------------------------------------------------------------
  drawDebrisParticles(
    ctx,
    cx,
    cy,
    [
      [-375, -380, 4.8, 'hotspot'], // Left master wingtip
      [375, -380, 4.8, 'hotspot'],  // Right master wingtip
      [-310, -280, 4.2, 'hotspot'], // Left secondary wingtip
      [310, -280, 4.2, 'hotspot'],  // Right secondary wingtip
      [0, -275, 4.8, 'hotspot'],    // Center crown quill
      [-35, -248, 4.0, 'glint'],    // Left crown quill
      [35, -248, 4.0, 'glint'],     // Right crown quill
      [0, 10, 5.2, 'hotspot'],      // Solar heart core
      [-13, -150, 2.4, 'glint'],    // Left eye
      [13, -150, 2.4, 'glint'],     // Right eye
      [0, 418, 4.6, 'hotspot'],     // Master tail plume tip
      [-42, 375, 4.0, 'glint'],     // Left inner tail
      [42, 375, 4.0, 'glint'],      // Right inner tail
      [-95, 320, 3.6, 'bronze'],
      [95, 320, 3.6, 'bronze'],
      [-70, -65, 3.8, 'glint'],     // Left shoulder pivot
      [70, -65, 3.8, 'glint'],      // Right shoulder pivot
      [-180, -110, 2.8, 'stone'],
      [180, -110, 2.8, 'stone'],
      [-120, 160, 2.6, 'ember'],
      [120, 160, 2.6, 'ember'],
    ],
    isGlowOnly,
  )
}

// ============================================================================
// 2. PAGE 02 — SOLAR CELESTIAL ASTROLABE RELIC (MASTER REFERENCE DESIGN)
// ============================================================================
function drawSolarCelestialPage(ctx, cx, cy, isGlowOnly = false) {
  const rOuterStar = 280
  const rSmallStar = 245
  const rRing1 = 220
  const rRing2 = 195
  const rRing3 = 145
  const rGrid = [115, 85, 55, 30]

  const gDir = createReliefGradient(ctx, cx - 260, cy - 260, cx + 260, cy + 260, 'full')
  const gIllum = createReliefGradient(ctx, cx - 260, cy - 260, cx + 260, cy + 260, 'energy')
  const gStruct = createReliefGradient(ctx, cx - 260, cy - 260, cx + 260, cy + 260, 'structural')

  if (isGlowOnly) {
    ctx.save()
    ctx.shadowColor = 'rgba(43, 15, 3, 0.25)'
    ctx.shadowBlur = 48
    ctx.strokeStyle = 'rgba(43, 15, 3, 0.18)'
    ctx.lineWidth = 14.0
    ctx.beginPath()
    ctx.arc(cx, cy, rRing1, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.shadowColor = 'rgba(133, 63, 14, 0.45)'
    ctx.shadowBlur = 28
    ctx.strokeStyle = 'rgba(133, 63, 14, 0.35)'
    ctx.lineWidth = 8.0
    ctx.beginPath()
    ctx.arc(cx, cy, rRing1, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.shadowColor = 'rgba(221, 133, 53, 0.70)'
    ctx.shadowBlur = 18
    ctx.strokeStyle = 'rgba(221, 133, 53, 0.68)'
    ctx.lineWidth = 5.0
    ctx.beginPath()
    ctx.arc(cx, cy, rRing1, 0, Math.PI * 0.70)
    ctx.arc(cx, cy, rRing3, 0, Math.PI * 0.70)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.shadowColor = 'rgba(227, 161, 80, 0.88)'
    ctx.shadowBlur = 9
    ctx.strokeStyle = 'rgba(227, 161, 80, 0.75)'
    ctx.lineWidth = 2.4
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8
      if (a >= 0 && a <= Math.PI * 0.75) {
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * 30, cy + Math.sin(a) * 30)
        ctx.lineTo(cx + Math.cos(a) * rRing3, cy + Math.sin(a) * rRing3)
        ctx.stroke()
      }
    }
    ctx.restore()

    ctx.save()
    ctx.shadowColor = 'rgba(252, 190, 90, 0.95)'
    ctx.shadowBlur = 14
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4
      const sx = cx + Math.cos(a) * rOuterStar
      const sy = cy + Math.sin(a) * rOuterStar
      ctx.fillStyle = C15_WHITE_GOLD
      ctx.beginPath()
      ctx.arc(sx, sy, 3.8, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()

    ctx.save()
    ctx.shadowColor = 'rgba(247, 208, 122, 1.0)'
    ctx.shadowBlur = 24
    ctx.fillStyle = 'rgba(252, 190, 90, 0.95)'
    ctx.beginPath()
    ctx.arc(cx, cy, 30, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = C15_WHITE_GOLD
    ctx.beginPath()
    ctx.arc(cx, cy, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  } else {
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4
      const aLeft = a - Math.PI / 16
      const aRight = a + Math.PI / 16

      const tipX = cx + Math.cos(a) * rOuterStar
      const tipY = cy + Math.sin(a) * rOuterStar
      const b1X = cx + Math.cos(aLeft) * rRing1
      const b1Y = cy + Math.sin(aLeft) * rRing1
      const b2X = cx + Math.cos(aRight) * rRing1
      const b2Y = cy + Math.sin(aRight) * rRing1

      const gRay = createReliefGradient(ctx, (b1X + b2X) * 0.5, (b1Y + b2Y) * 0.5, tipX, tipY, 'full')

      ctx.strokeStyle = C01_DEEP_EMBER
      ctx.lineWidth = 8.5
      ctx.beginPath()
      ctx.moveTo(b1X, b1Y)
      ctx.lineTo(tipX, tipY)
      ctx.lineTo(b2X, b2Y)
      ctx.stroke()

      ctx.strokeStyle = C02_BURNT_BROWN
      ctx.lineWidth = 6.0
      ctx.beginPath()
      ctx.moveTo(b1X, b1Y)
      ctx.lineTo(tipX, tipY)
      ctx.lineTo(b2X, b2Y)
      ctx.stroke()

      ctx.strokeStyle = gStruct
      ctx.lineWidth = 4.2
      ctx.beginPath()
      ctx.moveTo(b1X, b1Y)
      ctx.lineTo(tipX, tipY)
      ctx.lineTo(b2X, b2Y)
      ctx.stroke()

      ctx.strokeStyle = gRay
      ctx.lineWidth = 2.4
      ctx.beginPath()
      ctx.moveTo(b1X, b1Y)
      ctx.lineTo(tipX, tipY)
      ctx.lineTo(b2X, b2Y)
      ctx.stroke()

      if (a >= 0 && a <= Math.PI * 0.75) {
        ctx.strokeStyle = C11_BRIGHT_AMBER
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(b1X, b1Y)
        ctx.lineTo(tipX, tipY)
        ctx.lineTo(b2X, b2Y)
        ctx.stroke()
      }

      ctx.fillStyle = C09_WARM_ORANGE
      ctx.beginPath()
      ctx.arc(tipX, tipY, 4.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C14_HOT_GOLD
      ctx.beginPath()
      ctx.arc(tipX, tipY, 2.8, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C15_WHITE_GOLD
      ctx.beginPath()
      ctx.arc(tipX, tipY, 1.4, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 + Math.PI / 8
      const aLeft = a - Math.PI / 24
      const aRight = a + Math.PI / 24

      const tipX = cx + Math.cos(a) * rSmallStar
      const tipY = cy + Math.sin(a) * rSmallStar
      const b1X = cx + Math.cos(aLeft) * rRing1
      const b1Y = cy + Math.sin(aLeft) * rRing1
      const b2X = cx + Math.cos(aRight) * rRing1
      const b2Y = cy + Math.sin(aRight) * rRing1

      ctx.strokeStyle = C01_DEEP_EMBER
      ctx.lineWidth = 6.5
      ctx.beginPath()
      ctx.moveTo(b1X, b1Y)
      ctx.lineTo(tipX, tipY)
      ctx.lineTo(b2X, b2Y)
      ctx.stroke()

      ctx.strokeStyle = C04_DEEP_ORANGE_BROWN
      ctx.lineWidth = 4.0
      ctx.beginPath()
      ctx.moveTo(b1X, b1Y)
      ctx.lineTo(tipX, tipY)
      ctx.lineTo(b2X, b2Y)
      ctx.stroke()

      ctx.strokeStyle = C06_WARM_COPPER
      ctx.lineWidth = 2.0
      ctx.beginPath()
      ctx.moveTo(b1X, b1Y)
      ctx.lineTo(tipX, tipY)
      ctx.lineTo(b2X, b2Y)
      ctx.stroke()

      ctx.fillStyle = C11_BRIGHT_AMBER
      ctx.beginPath()
      ctx.arc(tipX, tipY, 2.5, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = 0; i < 8; i++) {
      const a1 = (i * Math.PI) / 4
      const a2 = ((i + 1) * Math.PI) / 4
      const x1 = cx + Math.cos(a1) * rOuterStar
      const y1 = cy + Math.sin(a1) * rOuterStar
      const x2 = cx + Math.cos(a2) * rOuterStar
      const y2 = cy + Math.sin(a2) * rOuterStar

      ctx.strokeStyle = C04_DEEP_ORANGE_BROWN
      ctx.lineWidth = 2.2
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      ctx.strokeStyle = (a1 >= 0 && a1 <= Math.PI * 0.5) ? C09_WARM_ORANGE : C05_COPPER_ORANGE
      ctx.lineWidth = 1.0
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    ctx.strokeStyle = C01_DEEP_EMBER
    ctx.lineWidth = 11.0
    ctx.beginPath()
    ctx.arc(cx, cy, rRing1, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = C02_BURNT_BROWN
    ctx.lineWidth = 8.0
    ctx.beginPath()
    ctx.arc(cx, cy, rRing1, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = gStruct
    ctx.lineWidth = 5.5
    ctx.beginPath()
    ctx.arc(cx, cy, rRing1, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = gDir
    ctx.lineWidth = 3.2
    ctx.beginPath()
    ctx.arc(cx, cy, rRing1, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = gIllum
    ctx.lineWidth = 1.8
    ctx.beginPath()
    ctx.arc(cx, cy, rRing1, 0, Math.PI * 0.70)
    ctx.stroke()

    ctx.strokeStyle = C04_DEEP_ORANGE_BROWN
    ctx.lineWidth = 4.8
    ctx.beginPath()
    ctx.arc(cx, cy, rRing2, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = gDir
    ctx.lineWidth = 2.4
    ctx.beginPath()
    ctx.arc(cx, cy, rRing2, 0, Math.PI * 2)
    ctx.stroke()

    for (let i = 0; i < 24; i++) {
      const a = (i * Math.PI) / 12
      const x1 = cx + Math.cos(a) * rRing2
      const y1 = cy + Math.sin(a) * rRing2
      const x2 = cx + Math.cos(a) * rRing1
      const y2 = cy + Math.sin(a) * rRing1

      ctx.strokeStyle = C02_BURNT_BROWN
      ctx.lineWidth = 3.0
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      ctx.strokeStyle = (a >= 0 && a <= Math.PI * 0.70) ? C11_BRIGHT_AMBER : C06_WARM_COPPER
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    ctx.strokeStyle = C01_DEEP_EMBER
    ctx.lineWidth = 9.0
    ctx.beginPath()
    ctx.arc(cx, cy, rRing3, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = C04_DEEP_ORANGE_BROWN
    ctx.lineWidth = 5.8
    ctx.beginPath()
    ctx.arc(cx, cy, rRing3, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = gDir
    ctx.lineWidth = 3.4
    ctx.beginPath()
    ctx.arc(cx, cy, rRing3, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = gIllum
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.arc(cx, cy, rRing3, 0, Math.PI * 0.70)
    ctx.stroke()

    rGrid.forEach((rg, idx) => {
      const isCore = idx === rGrid.length - 1
      ctx.strokeStyle = C01_DEEP_EMBER
      ctx.lineWidth = isCore ? 7.0 : 4.5
      ctx.beginPath()
      ctx.arc(cx, cy, rg, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = C04_DEEP_ORANGE_BROWN
      ctx.lineWidth = isCore ? 4.0 : 2.5
      ctx.beginPath()
      ctx.arc(cx, cy, rg, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = gDir
      ctx.lineWidth = isCore ? 2.4 : 1.4
      ctx.beginPath()
      ctx.arc(cx, cy, rg, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = C11_BRIGHT_AMBER
      ctx.lineWidth = 1.0
      ctx.beginPath()
      ctx.arc(cx, cy, rg, 0, Math.PI * 0.70)
      ctx.stroke()
    })

    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8
      const x1 = cx + Math.cos(a) * 30
      const y1 = cy + Math.sin(a) * 30
      const x2 = cx + Math.cos(a) * rRing3
      const y2 = cy + Math.sin(a) * rRing3

      ctx.strokeStyle = C01_DEEP_EMBER
      ctx.lineWidth = 4.0
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      ctx.strokeStyle = C04_DEEP_ORANGE_BROWN
      ctx.lineWidth = 2.4
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      ctx.strokeStyle = (a >= 0 && a <= Math.PI * 0.70) ? C11_BRIGHT_AMBER : C06_WARM_COPPER
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      if (i % 2 === 0) {
        const nx = cx + Math.cos(a) * 85
        const ny = cy + Math.sin(a) * 85
        ctx.fillStyle = (a >= 0 && a <= Math.PI * 0.70) ? C14_HOT_GOLD : C06_WARM_COPPER
        ctx.beginPath()
        ctx.arc(nx, ny, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const gCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32)
    gCore.addColorStop(0.00, C15_WHITE_GOLD)
    gCore.addColorStop(0.18, C13_PALE_GOLD)
    gCore.addColorStop(0.38, C14_HOT_GOLD)
    gCore.addColorStop(0.58, C11_BRIGHT_AMBER)
    gCore.addColorStop(0.72, C09_WARM_ORANGE)
    gCore.addColorStop(0.85, C07_BRIGHT_COPPER)
    gCore.addColorStop(0.94, C04_DEEP_ORANGE_BROWN)
    gCore.addColorStop(1.00, C01_DEEP_EMBER)

    ctx.fillStyle = gCore
    ctx.beginPath()
    ctx.arc(cx, cy, 30, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = C06_WARM_COPPER
    ctx.lineWidth = 2.8
    ctx.beginPath()
    ctx.arc(cx, cy, 30, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = C11_BRIGHT_AMBER
    ctx.lineWidth = 1.8
    ctx.beginPath()
    ctx.arc(cx, cy, 16, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = C15_WHITE_GOLD
    ctx.beginPath()
    ctx.arc(cx, cy, 6.5, 0, Math.PI * 2)
    ctx.fill()
  }

  drawDebrisParticles(
    ctx,
    cx,
    cy,
    [
      [140, 140, 3.2, 'ember'],
      [190, 80, 2.8, 'ember'],
      [80, 190, 2.8, 'ember'],
      [120, 60, 2.2, 'glint'],
      [60, 120, 2.2, 'glint'],
      [-160, -120, 2.0, 'bronze'],
      [-120, -160, 2.0, 'bronze'],
      [180, -100, 2.4, 'stone'],
      [-100, 180, 2.4, 'stone'],
      [0, -290, 3.5, 'hotspot'],
      [0, 290, 3.5, 'hotspot'],
      [-290, 0, 3.5, 'hotspot'],
      [290, 0, 3.5, 'hotspot'],
    ],
    isGlowOnly,
  )
}

// ============================================================================
// 3. PAGE 03 — ANUBIS + BALANCE OF TRUTH (Egyptian Temple Wall Relief)
// ============================================================================
function drawAnubisPage(ctx, cx, cy, isGlowOnly = false) {
  drawReliefGroove(ctx, (c) => c.rect(cx - 240, cy - 280, 480, 560), { width: 4.2 }, isGlowOnly)
  drawReliefGroove(ctx, (c) => c.rect(cx - 225, cy - 265, 450, 530), { width: 2.2 }, isGlowOnly)
  drawReliefGroove(ctx, (c) => c.arc(cx, cy - 200, 140, Math.PI * 1.15, Math.PI * 1.85), { width: 3.6, isHot: true }, isGlowOnly)

  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 140, cy - 130)
      c.lineTo(cx - 85, cy - 130)
      c.lineTo(cx - 65, cy - 260)
      c.lineTo(cx - 40, cy - 120)
      c.lineTo(cx - 10, cy - 250)
      c.lineTo(cx + 10, cy - 110)
      c.bezierCurveTo(cx + 35, cy - 90, cx + 55, cy - 60, cx + 45, cy - 15)
      c.lineTo(cx - 30, cy - 50)
      c.lineTo(cx - 140, cy - 130)
      c.closePath()
    },
    {
      fillColor: C05_COPPER_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.8,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx - 72, cy - 140)
        c.lineTo(cx - 62, cy - 245)
        c.moveTo(cx - 22, cy - 130)
        c.lineTo(cx - 14, cy - 235)
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 90, cy - 120)
        c.quadraticCurveTo(cx - 70, cy - 135, cx - 50, cy - 120)
      },
      withApexGlint: true,
      apexPoint: [cx - 70, cy - 120, 3.8],
    },
    isGlowOnly,
  )

  const beamY = cy + 25
  drawReliefMass(
    ctx,
    (c) => c.rect(cx - 215, beamY - 8, 430, 16),
    {
      fillColor: C05_COPPER_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.8,
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 210, beamY)
        c.lineTo(cx + 210, beamY)
      },
    },
    isGlowOnly,
  )

  ;[-215, 215].forEach((bx) => {
    drawReliefMass(
      ctx,
      (c) => c.arc(cx + bx, beamY, 14, 0, Math.PI * 2),
      { fillColor: C04_DEEP_ORANGE_BROWN, borderColor: C07_BRIGHT_COPPER, borderWidth: 3.0, withApexGlint: true, apexPoint: [cx + bx, beamY, 3.2] },
      isGlowOnly,
    )
  })

  drawReliefMass(
    ctx,
    (c) => c.rect(cx - 18, beamY - 25, 36, 245),
    {
      fillColor: C05_COPPER_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.6,
      withRidge: true,
      ridgeFn: (c) => {
        ;[60, 95, 130, 165].forEach((yOff) => {
          c.moveTo(cx - 16, cy + yOff)
          c.lineTo(cx + 16, cy + yOff)
        })
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx, beamY - 20)
        c.lineTo(cx, cy + 210)
      },
    },
    isGlowOnly,
  )

  drawReliefGroove(
    ctx,
    (c) => {
      c.moveTo(cx - 215, beamY)
      c.lineTo(cx - 250, beamY + 95)
      c.moveTo(cx - 215, beamY)
      c.lineTo(cx - 180, beamY + 95)
      c.moveTo(cx - 260, beamY + 95)
      c.quadraticCurveTo(cx - 215, beamY + 120, cx - 170, beamY + 95)
    },
    { width: 3.4 },
    isGlowOnly,
  )

  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 215, beamY + 90)
      c.bezierCurveTo(cx - 230, beamY + 50, cx - 220, beamY + 15, cx - 210, beamY - 5)
      c.bezierCurveTo(cx - 200, beamY + 25, cx - 205, beamY + 65, cx - 215, beamY + 90)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 2.8,
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 215, beamY + 85)
        c.lineTo(cx - 210, beamY - 2)
      },
      withApexGlint: true,
      apexPoint: [cx - 210, beamY - 5, 3.2],
    },
    isGlowOnly,
  )

  drawReliefGroove(
    ctx,
    (c) => {
      c.moveTo(cx + 215, beamY)
      c.lineTo(cx + 180, beamY + 95)
      c.moveTo(cx + 215, beamY)
      c.lineTo(cx + 250, beamY + 95)
      c.moveTo(cx + 170, beamY + 95)
      c.quadraticCurveTo(cx + 215, beamY + 120, cx + 260, beamY + 95)
    },
    { width: 3.4 },
    isGlowOnly,
  )

  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx + 215, beamY + 90)
      c.bezierCurveTo(cx + 195, beamY + 70, cx + 200, beamY + 45, cx + 215, beamY + 45)
      c.bezierCurveTo(cx + 230, beamY + 45, cx + 235, beamY + 70, cx + 215, beamY + 90)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 2.8,
      withEnergyVein: true,
      veinFn: (c) => {
        c.arc(cx + 215, beamY + 65, 8, 0, Math.PI * 2)
      },
      withApexGlint: true,
      apexPoint: [cx + 215, beamY + 45, 3.0],
    },
    isGlowOnly,
  )

  drawReliefMass(
    ctx,
    (c) => {
      c.rect(cx - 75, cy + 220, 150, 22)
      c.rect(cx - 105, cy + 242, 210, 24)
    },
    { fillColor: C04_DEEP_ORANGE_BROWN, borderColor: C06_WARM_COPPER, borderWidth: 3.4 },
    isGlowOnly,
  )

  drawDebrisParticles(
    ctx,
    cx,
    cy,
    [
      [-215, beamY - 20, 3.2, 'ember'],
      [215, beamY - 20, 3.2, 'ember'],
      [-245, beamY + 95, 2.6, 'bronze'],
      [245, beamY + 95, 2.6, 'bronze'],
      [-70, -265, 3.4, 'hotspot'],
      [-10, -255, 3.0, 'glint'],
      [-100, -180, 2.2, 'stone'],
      [100, -180, 2.2, 'stone'],
    ],
    isGlowOnly,
  )
}

// ============================================================================
// 4. PAGE 04 — MERLIN'S SWORD (Legendary Arthurian Excalibur)
// ============================================================================
function drawSwordPage(ctx, cx, cy, isGlowOnly = false) {
  drawReliefGroove(ctx, (c) => c.arc(cx, cy - 60, 230, 0, Math.PI * 2), { width: 3.8, isHot: true }, isGlowOnly)
  drawReliefGroove(ctx, (c) => c.arc(cx, cy - 60, 170, 0, Math.PI * 2), { width: 2.4 }, isGlowOnly)
  drawReliefGroove(
    ctx,
    (c) => {
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        c.moveTo(cx + Math.cos(a) * 175, cy - 60 + Math.sin(a) * 175)
        c.lineTo(cx + Math.cos(a) * 225, cy - 60 + Math.sin(a) * 225)
      }
    },
    { width: 2.6 },
    isGlowOnly,
  )

  const gBlade = createReliefGradient(ctx, cx, cy - 365, cx, cy + 30, 'full')
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx, cy - 365)
      c.lineTo(cx - 32, cy - 290)
      c.lineTo(cx - 24, cy + 30)
      c.lineTo(cx + 24, cy + 30)
      c.lineTo(cx + 32, cy - 290)
      c.closePath()
    },
    {
      fillColor: gBlade,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.8,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx - 18, cy - 280)
        c.lineTo(cx, cy - 355)
        c.lineTo(cx + 18, cy - 280)
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx, cy - 350)
        c.lineTo(cx, cy + 20)
      },
      withApexGlint: true,
      apexPoint: [cx, cy - 365, 4.2],
    },
    isGlowOnly,
  )

  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 145, cy + 25)
      c.quadraticCurveTo(cx - 70, cy + 48, cx, cy + 38)
      c.quadraticCurveTo(cx + 70, cy + 48, cx + 145, cy + 25)
      c.quadraticCurveTo(cx + 85, cy + 16, cx, cy + 22)
      c.quadraticCurveTo(cx - 85, cy + 16, cx - 145, cy + 25)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.2,
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx, cy + 22)
        c.lineTo(cx - 14, cy + 35)
        c.lineTo(cx, cy + 48)
        c.lineTo(cx + 14, cy + 35)
        c.closePath()
      },
      withApexGlint: true,
      apexPoint: [cx, cy + 35, 3.5],
    },
    isGlowOnly,
  )

  ;[-145, 145].forEach((gx) => {
    drawReliefMass(
      ctx,
      (c) => c.arc(cx + gx, cy + 25, 13, 0, Math.PI * 2),
      { fillColor: C04_DEEP_ORANGE_BROWN, borderColor: C07_BRIGHT_COPPER, borderWidth: 3.2, withApexGlint: true, apexPoint: [cx + gx, cy + 25, 3.0] },
      isGlowOnly,
    )
  })

  drawReliefMass(
    ctx,
    (c) => c.rect(cx - 14, cy + 48, 28, 120),
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C06_WARM_COPPER,
      borderWidth: 3.6,
      withRidge: true,
      ridgeFn: (c) => {
        for (let y = cy + 62; y < cy + 160; y += 18) {
          c.moveTo(cx - 14, y)
          c.lineTo(cx + 14, y + 10)
        }
      },
    },
    isGlowOnly,
  )

  drawReliefMass(
    ctx,
    (c) => c.arc(cx, cy + 200, 28, 0, Math.PI * 2),
    {
      fillColor: C05_COPPER_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.4,
      withEnergyVein: true,
      veinFn: (c) => c.arc(cx, cy + 200, 11, 0, Math.PI * 2),
      withApexGlint: true,
      apexPoint: [cx, cy + 200, 4.0],
    },
    isGlowOnly,
  )

  drawDebrisParticles(
    ctx,
    cx,
    cy - 60,
    [
      [0, -320, 3.8, 'hotspot'],
      [-175, 0, 3.2, 'ember'],
      [175, 0, 3.2, 'ember'],
      [-140, 100, 2.6, 'stone'],
      [140, 100, 2.6, 'stone'],
      [-85, -220, 2.6, 'bronze'],
      [85, -220, 2.6, 'bronze'],
      [0, 270, 3.5, 'glint'],
    ],
    isGlowOnly,
  )
}

// ============================================================================
// 5. PAGE 05 — GREEK ARCHITECTURE (Classical Ancient Temple Ruin)
// ============================================================================
function drawGreekRuinPage(ctx, cx, cy, isGlowOnly = false) {
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx, cy - 275)
      c.lineTo(cx - 245, cy - 175)
      c.lineTo(cx + 245, cy - 175)
      c.closePath()
    },
    {
      fillColor: C05_COPPER_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 5.0,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx, cy - 255)
        c.lineTo(cx - 210, cy - 185)
        c.lineTo(cx + 210, cy - 185)
        c.closePath()
      },
      withApexGlint: true,
      apexPoint: [cx, cy - 285, 4.0],
    },
    isGlowOnly,
  )

  drawReliefMass(
    ctx,
    (c) => c.rect(cx - 250, cy - 175, 500, 45),
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.2,
      withRidge: true,
      ridgeFn: (c) => {
        for (let x = cx - 210; x <= cx + 210; x += 70) {
          c.moveTo(x - 10, cy - 170)
          c.lineTo(x - 10, cy - 135)
          c.moveTo(x, cy - 170)
          c.lineTo(x - 135, cy - 135)
          c.moveTo(x + 10, cy - 170)
          c.lineTo(x + 10, cy - 135)
        }
      },
    },
    isGlowOnly,
  )

  const colX = [cx - 180, cx - 60, cx + 60, cx + 180]
  colX.forEach((x, idx) => {
    drawReliefMass(
      ctx,
      (c) => c.rect(x - 28, cy - 130, 56, 18),
      { fillColor: C04_DEEP_ORANGE_BROWN, borderColor: C06_WARM_COPPER, borderWidth: 3.2 },
      isGlowOnly,
    )

    if (idx === 2) {
      drawReliefMass(
        ctx,
        (c) => {
          c.moveTo(x - 22, cy - 112)
          c.lineTo(x - 22, cy - 30)
          c.lineTo(x + 8, cy - 12)
          c.lineTo(x + 22, cy - 35)
          c.lineTo(x + 22, cy - 112)
          c.closePath()
        },
        {
          fillColor: C05_COPPER_ORANGE,
          borderColor: C07_BRIGHT_COPPER,
          borderWidth: 3.8,
          withEnergyVein: true,
          veinFn: (c) => {
            c.moveTo(x - 22, cy - 30)
            c.lineTo(x + 8, cy - 12)
            c.lineTo(x + 22, cy - 35)
          },
          withApexGlint: true,
          apexPoint: [x + 8, cy - 12, 3.6],
        },
        isGlowOnly,
      )

      drawReliefMass(
        ctx,
        (c) => {
          c.moveTo(x - 22, cy + 45)
          c.lineTo(x - 22, cy + 180)
          c.lineTo(x + 22, cy + 180)
          c.lineTo(x + 22, cy + 60)
          c.lineTo(x - 6, cy + 72)
          c.closePath()
        },
        {
          fillColor: C05_COPPER_ORANGE,
          borderColor: C07_BRIGHT_COPPER,
          borderWidth: 3.8,
          withEnergyVein: true,
          veinFn: (c) => {
            c.moveTo(x + 22, cy + 60)
            c.lineTo(x - 6, cy + 72)
            c.lineTo(x - 22, cy + 45)
          },
        },
        isGlowOnly,
      )
    } else {
      drawReliefMass(
        ctx,
        (c) => c.rect(x - 22, cy - 112, 44, 292),
        {
          fillColor: C05_COPPER_ORANGE,
          borderColor: C07_BRIGHT_COPPER,
          borderWidth: 3.8,
          withRidge: true,
          ridgeFn: (c) => {
            c.moveTo(x - 9, cy - 108)
            c.lineTo(x - 9, cy + 176)
            c.moveTo(x + 9, cy - 108)
            c.lineTo(x + 9, cy + 176)
          },
        },
        isGlowOnly,
      )
    }

    drawReliefMass(
      ctx,
      (c) => c.rect(x - 30, cy + 180, 60, 16),
      { fillColor: C04_DEEP_ORANGE_BROWN, borderColor: C06_WARM_COPPER, borderWidth: 3.0 },
      isGlowOnly,
    )
  })

  drawReliefMass(
    ctx,
    (c) => {
      c.rect(cx - 265, cy + 196, 530, 22)
      c.rect(cx - 285, cy + 218, 570, 24)
      c.rect(cx - 305, cy + 242, 610, 26)
    },
    { fillColor: C04_DEEP_ORANGE_BROWN, borderColor: C07_BRIGHT_COPPER, borderWidth: 4.2 },
    isGlowOnly,
  )

  drawDebrisParticles(
    ctx,
    cx,
    cy,
    [
      [cx + 60 - cx + 32, -15, 3.5, 'ember'],
      [cx + 60 - cx - 28, 25, 3.2, 'ember'],
      [cx + 60 - cx + 10, -35, 2.6, 'stone'],
      [-225, 180, 2.6, 'stone'],
      [225, 180, 2.6, 'stone'],
      [0, -290, 3.4, 'hotspot'],
      [-245, -170, 2.8, 'bronze'],
      [245, -170, 2.8, 'bronze'],
    ],
    isGlowOnly,
  )
}

// ============================================================================
// 6. PAGE 06 — MONUMENTAL WINGS (Sacred Phoenix Bilateral Relief)
// ============================================================================
function drawWingsPage(ctx, cx, cy, isGlowOnly = false) {
  ;[140, 230, 310].forEach((r) => {
    drawReliefGroove(
      ctx,
      (c) => c.arc(cx, cy + 30, r, Math.PI * 1.08, Math.PI * 1.92),
      { width: 3.2, isHot: true },
      isGlowOnly,
    )
  })

  const gWingL = createReliefGradient(ctx, cx - 20, cy + 90, cx - 305, cy - 245, 'full')
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 20, cy + 90)
      c.bezierCurveTo(cx - 100, cy + 70, cx - 240, cy - 20, cx - 305, cy - 245)
      c.bezierCurveTo(cx - 240, cy - 190, cx - 160, cy - 90, cx - 70, cy + 10)
      c.closePath()
    },
    {
      fillColor: gWingL,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 5.0,
      withRidge: true,
      ridgeFn: (c) => {
        for (let f = 1; f <= 6; f++) {
          const startX = cx - 305 + f * 35
          const startY = cy - 245 + f * 42
          c.moveTo(startX, startY)
          c.quadraticCurveTo(cx - 190 + f * 22, cy - 120 + f * 32, cx - 40, cy + 40 + f * 8)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 20, cy + 85)
        c.bezierCurveTo(cx - 100, cy + 65, cx - 230, cy - 25, cx - 300, cy - 240)
      },
      withApexGlint: true,
      apexPoint: [cx - 305, cy - 245, 4.2],
    },
    isGlowOnly,
  )

  const gWingR = createReliefGradient(ctx, cx + 20, cy + 90, cx + 305, cy - 245, 'full')
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx + 20, cy + 90)
      c.bezierCurveTo(cx + 100, cy + 70, cx + 240, cy - 20, cx + 305, cy - 245)
      c.bezierCurveTo(cx + 240, cy - 190, cx + 160, cy - 90, cx + 70, cy + 10)
      c.closePath()
    },
    {
      fillColor: gWingR,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 5.0,
      withRidge: true,
      ridgeFn: (c) => {
        for (let f = 1; f <= 6; f++) {
          const startX = cx + 305 - f * 35
          const startY = cy - 245 + f * 42
          c.moveTo(startX, startY)
          c.quadraticCurveTo(cx + 190 - f * 22, cy - 120 + f * 32, cx + 40, cy + 40 + f * 8)
        }
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx + 20, cy + 85)
        c.bezierCurveTo(cx + 100, cy + 65, cx + 230, cy - 25, cx + 300, cy - 240)
      },
      withApexGlint: true,
      apexPoint: [cx + 305, cy - 245, 4.2],
    },
    isGlowOnly,
  )

  drawReliefMass(
    ctx,
    (c) => c.arc(cx, cy + 35, 42, 0, Math.PI * 2),
    {
      fillColor: C05_COPPER_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.8,
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx, cy + 12)
        c.lineTo(cx - 20, cy + 35)
        c.lineTo(cx, cy + 58)
        c.lineTo(cx + 20, cy + 35)
        c.closePath()
      },
      withApexGlint: true,
      apexPoint: [cx, cy + 35, 4.5],
    },
    isGlowOnly,
  )

  drawReliefGroove(
    ctx,
    (c) => {
      c.moveTo(cx, cy + 75)
      c.lineTo(cx, cy + 285)
      c.moveTo(cx - 18, cy + 75)
      c.quadraticCurveTo(cx - 38, cy + 175, cx - 24, cy + 245)
      c.moveTo(cx + 18, cy + 75)
      c.quadraticCurveTo(cx + 38, cy + 175, cx + 24, cy + 245)
    },
    { width: 3.6, isHot: true },
    isGlowOnly,
  )

  drawDebrisParticles(
    ctx,
    cx,
    cy,
    [
      [-305, -245, 4.0, 'hotspot'],
      [305, -245, 4.0, 'hotspot'],
      [-260, -180, 2.8, 'bronze'],
      [260, -180, 2.8, 'bronze'],
      [-210, -110, 2.8, 'ember'],
      [210, -110, 2.8, 'ember'],
      [0, 295, 3.6, 'ember'],
      [0, 35, 3.4, 'glint'],
    ],
    isGlowOnly,
  )
}

// ============================================================================
// 7. PAGE 07 — THOR'S HAMMER (Mjölnir Ancient Archaeological Relic Relief)
// Monumental Archaeological Nordic Relief with Triquetra Emblem & Wrapped Shaft
// Occupies ~60–65% of page height, Dark Relic Copper with Selective Amber Glow
// ============================================================================
function drawThorHammerPage(ctx, cx, cy, isGlowOnly = false) {
  // 1. Archaeological Nordic Framing (Concentric Guide Rings & Cardinal Sun Nodes)
  drawReliefGroove(ctx, (c) => c.arc(cx, cy - 10, 270, 0, Math.PI * 2), { width: 4.5, isHot: true }, isGlowOnly)
  drawReliefGroove(ctx, (c) => c.arc(cx, cy - 10, 220, 0, Math.PI * 2), { width: 2.4 }, isGlowOnly)
  drawReliefGroove(
    ctx,
    (c) => {
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
        c.moveTo(cx + Math.cos(a) * 225, cy - 10 + Math.sin(a) * 225)
        c.lineTo(cx + Math.cos(a) * 265, cy - 10 + Math.sin(a) * 265)
      }
    },
    { width: 2.6 },
    isGlowOnly,
  )

  ;[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((a) => {
    const nx = cx + Math.cos(a) * 270
    const ny = cy - 10 + Math.sin(a) * 270
    drawReliefMass(
      ctx,
      (c) => c.arc(nx, ny, 13, 0, Math.PI * 2),
      {
        fillColor: C04_DEEP_ORANGE_BROWN,
        borderColor: C07_BRIGHT_COPPER,
        borderWidth: 3.2,
        withApexGlint: true,
        apexPoint: [nx, ny, 3.2],
      },
      isGlowOnly,
    )
  })

  // 2. Hammer Head Stepped Crown (Upper Reinforcing Relief Crest)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 90, cy - 350)
      c.lineTo(cx + 90, cy - 350)
      c.lineTo(cx + 115, cy - 325)
      c.lineTo(cx - 115, cy - 325)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.0,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx - 75, cy - 338)
        c.lineTo(cx + 75, cy - 338)
      },
      withApexGlint: true,
      apexPoint: [cx, cy - 350, 4.4],
    },
    isGlowOnly,
  )

  // 3. Main Archaic Mjölnir Head Mass (Broad Stepped Silhouette with Angled Cheeks)
  const gHammerHead = createReliefGradient(ctx, cx - 210, cy - 325, cx + 210, cy - 135, 'full')
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 115, cy - 325)
      c.lineTo(cx + 115, cy - 325)
      c.lineTo(cx + 145, cy - 315)
      c.lineTo(cx + 205, cy - 295) // Top of right striking face
      c.lineTo(cx + 205, cy - 165) // Bottom of right striking face
      c.lineTo(cx + 145, cy - 148)
      c.lineTo(cx + 105, cy - 138)
      c.lineTo(cx - 105, cy - 138)
      c.lineTo(cx - 145, cy - 148)
      c.lineTo(cx - 205, cy - 165) // Bottom of left striking face
      c.lineTo(cx - 205, cy - 295) // Top of left striking face
      c.lineTo(cx - 145, cy - 315)
      c.closePath()
    },
    {
      fillColor: gHammerHead,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 5.6,
      withRidge: true,
      ridgeFn: (c) => {
        // Internal chamfer contour framing central block and cheek facets
        c.moveTo(cx - 135, cy - 308)
        c.lineTo(cx - 135, cy - 155)
        c.moveTo(cx + 135, cy - 308)
        c.lineTo(cx + 135, cy - 155)
        c.moveTo(cx - 95, cy - 312)
        c.lineTo(cx + 95, cy - 312)
        c.moveTo(cx - 85, cy - 150)
        c.lineTo(cx + 85, cy - 150)
      },
      withEnergyVein: true,
      veinFn: (c) => {
        // Subtle illuminated engraved perimeter vein
        c.moveTo(cx - 192, cy - 285)
        c.lineTo(cx - 140, cy - 302)
        c.lineTo(cx + 140, cy - 302)
        c.lineTo(cx + 192, cy - 285)
        c.lineTo(cx + 192, cy - 175)
        c.lineTo(cx + 140, cy - 158)
        c.lineTo(cx - 140, cy - 158)
        c.lineTo(cx - 192, cy - 175)
        c.closePath()
      },
      withApexGlint: true,
      apexPoint: [cx, cy - 325, 4.8],
    },
    isGlowOnly,
  )

  // 4. Left & Right Striking Face Facets (Chiseled Relief with Runic Cuts)
  // Left Cheek: Tiwaz ᛏ (Honor/Victory) & Thurisaz ᚦ (Giant-Slaying Hammer Force)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 200, cy - 285)
      c.lineTo(cx - 145, cy - 300)
      c.lineTo(cx - 145, cy - 160)
      c.lineTo(cx - 200, cy - 175)
      c.closePath()
    },
    {
      fillColor: C03_DARK_RED_ORANGE,
      borderColor: C06_WARM_COPPER,
      borderWidth: 3.4,
      withRidge: true,
      ridgeFn: (c) => {
        // Tiwaz ᛏ rune
        c.moveTo(cx - 172, cy - 265)
        c.lineTo(cx - 172, cy - 225)
        c.moveTo(cx - 184, cy - 253)
        c.lineTo(cx - 172, cy - 265)
        c.lineTo(cx - 160, cy - 253)
        // Thurisaz ᚦ rune
        c.moveTo(cx - 172, cy - 215)
        c.lineTo(cx - 172, cy - 180)
        c.moveTo(cx - 172, cy - 205)
        c.lineTo(cx - 160, cy - 195)
        c.lineTo(cx - 172, cy - 188)
      },
      withApexGlint: true,
      apexPoint: [cx - 172, cy - 265, 3.6],
    },
    isGlowOnly,
  )

  // Right Cheek: Sowilo ᛋ (Solar/Thunder Energy) & Uruz ᚢ (Primal Power)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx + 145, cy - 300)
      c.lineTo(cx + 200, cy - 285)
      c.lineTo(cx + 200, cy - 175)
      c.lineTo(cx + 145, cy - 160)
      c.closePath()
    },
    {
      fillColor: C03_DARK_RED_ORANGE,
      borderColor: C06_WARM_COPPER,
      borderWidth: 3.4,
      withRidge: true,
      ridgeFn: (c) => {
        // Sowilo ᛋ rune
        c.moveTo(cx + 180, cy - 265)
        c.lineTo(cx + 165, cy - 250)
        c.lineTo(cx + 180, cy - 238)
        c.lineTo(cx + 165, cy - 225)
        // Uruz ᚢ rune
        c.moveTo(cx + 164, cy - 215)
        c.lineTo(cx + 164, cy - 180)
        c.lineTo(cx + 180, cy - 190)
        c.lineTo(cx + 180, cy - 215)
      },
      withApexGlint: true,
      apexPoint: [cx + 180, cy - 265, 3.6],
    },
    isGlowOnly,
  )

  // 5. Central Hero Emblem — Sacred Nordic Triquetra / Sun Wheel
  // Recessed circular emblem bed
  drawReliefGroove(ctx, (c) => c.arc(cx, cy - 230, 68, 0, Math.PI * 2), { width: 4.2, isHot: true }, isGlowOnly)
  drawReliefGroove(ctx, (c) => c.arc(cx, cy - 230, 52, 0, Math.PI * 2), { width: 2.2 }, isGlowOnly)

  // 3 Interlaced Nordic Triquetra Arcs (Sacred Trinity: Asgard, Midgard, Utgard)
  const rTri = 32
  for (let k = 0; k < 3; k++) {
    const ang = -Math.PI / 2 + (k * 2 * Math.PI) / 3
    const px = cx + Math.cos(ang) * 20
    const py = cy - 230 + Math.sin(ang) * 20
    drawReliefMass(
      ctx,
      (c) => {
        c.arc(px, py, rTri, ang - Math.PI * 0.65, ang + Math.PI * 0.65)
        c.arc(cx, cy - 230, 13, ang + Math.PI * 0.65, ang - Math.PI * 0.65, true)
        c.closePath()
      },
      {
        fillColor: C05_COPPER_ORANGE,
        borderColor: C07_BRIGHT_COPPER,
        borderWidth: 3.6,
        withEnergyVein: true,
        veinFn: (c) => {
          c.arc(px, py, rTri - 4, ang - Math.PI * 0.55, ang + Math.PI * 0.55)
        },
        withApexGlint: true,
        apexPoint: [cx + Math.cos(ang) * 42, cy - 230 + Math.sin(ang) * 42, 3.8],
      },
      isGlowOnly,
    )
  }

  // Central Triquetra Core Sun Stud
  drawReliefMass(
    ctx,
    (c) => c.arc(cx, cy - 230, 12, 0, Math.PI * 2),
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C11_BRIGHT_AMBER,
      borderWidth: 3.2,
      withApexGlint: true,
      apexPoint: [cx, cy - 230, 5.0],
    },
    isGlowOnly,
  )

  // 6. Hammer Collar / Upper Ferrule (Connecting Head to Handle)
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 48, cy - 138)
      c.lineTo(cx + 48, cy - 138)
      c.lineTo(cx + 38, cy - 85)
      c.lineTo(cx - 38, cy - 85)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.2,
      withRidge: true,
      ridgeFn: (c) => {
        // Horizontal carved chevron bands
        c.moveTo(cx - 42, cy - 118)
        c.lineTo(cx, cy - 124)
        c.lineTo(cx + 42, cy - 118)
        c.moveTo(cx - 38, cy - 100)
        c.lineTo(cx, cy - 106)
        c.lineTo(cx + 38, cy - 100)
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 32, cy - 110)
        c.lineTo(cx + 32, cy - 110)
      },
      withApexGlint: true,
      apexPoint: [cx, cy - 110, 3.8],
    },
    isGlowOnly,
  )

  // 7. Hammer Handle / Shaft (Authentic Short Stout Proportion)
  drawReliefMass(
    ctx,
    (c) => c.rect(cx - 21, cy - 85, 42, 310),
    {
      fillColor: C02_BURNT_BROWN,
      borderColor: C05_COPPER_ORANGE,
      borderWidth: 4.0,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx, cy - 80)
        c.lineTo(cx, cy + 220)
      },
    },
    isGlowOnly,
  )

  // Carved Leather/Bronze Handle Grip Wrap (Criss-Cross Relief Ribs)
  drawReliefGroove(
    ctx,
    (c) => {
      for (let y = cy - 75; y < cy + 215; y += 22) {
        c.moveTo(cx - 21, y)
        c.lineTo(cx + 21, y + 14)
        c.moveTo(cx + 21, y)
        c.lineTo(cx - 21, y + 14)
      }
    },
    { width: 3.0, isHot: true },
    isGlowOnly,
  )

  // Mid-Handle Reinforcing Collar Band
  drawReliefMass(
    ctx,
    (c) => c.rect(cx - 28, cy + 62, 56, 26),
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.6,
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx - 25, cy + 75)
        c.lineTo(cx + 25, cy + 75)
      },
      withApexGlint: true,
      apexPoint: [cx, cy + 75, 3.8],
    },
    isGlowOnly,
  )

  // 8. Hammer Pommel & Terminal Loop Ring
  // Stepped Octagonal Pommel Base
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx - 36, cy + 225)
      c.lineTo(cx + 36, cy + 225)
      c.lineTo(cx + 52, cy + 248)
      c.lineTo(cx + 36, cy + 272)
      c.lineTo(cx - 36, cy + 272)
      c.lineTo(cx - 52, cy + 248)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.4,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx - 30, cy + 248)
        c.lineTo(cx + 30, cy + 248)
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.arc(cx, cy + 248, 14, 0, Math.PI * 2)
      },
      withApexGlint: true,
      apexPoint: [cx, cy + 248, 4.2],
    },
    isGlowOnly,
  )

  // Terminal Nordic Suspension Loop Ring
  drawReliefMass(
    ctx,
    (c) => {
      c.arc(cx, cy + 316, 36, 0, Math.PI * 2)
    },
    {
      fillColor: C03_DARK_RED_ORANGE,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 4.2,
      withEnergyVein: true,
      veinFn: (c) => {
        c.arc(cx, cy + 316, 26, 0, Math.PI * 2)
      },
      withApexGlint: true,
      apexPoint: [cx, cy + 352, 4.4],
    },
    isGlowOnly,
  )

  // Ring Inner Void Cutout
  if (!isGlowOnly) {
    ctx.fillStyle = '#050505'
    ctx.beginPath()
    ctx.arc(cx, cy + 316, 17, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = C01_DEEP_EMBER
    ctx.lineWidth = 3.0
    ctx.stroke()
  }

  // 9. Relic Embers & Archaeological Debris Particles
  drawDebrisParticles(
    ctx,
    cx,
    cy,
    [
      [-205, -295, 4.2, 'hotspot'], // Left striking corner
      [205, -295, 4.2, 'hotspot'],  // Right striking corner
      [-205, -165, 4.0, 'hotspot'], // Lower left cheek
      [205, -165, 4.0, 'hotspot'],  // Lower right cheek
      [0, -230, 4.8, 'hotspot'],    // Triquetra center core
      [0, -350, 4.0, 'glint'],      // Crown apex
      [0, 75, 3.6, 'glint'],        // Mid-handle collar
      [0, 248, 4.2, 'glint'],       // Pommel
      [0, 352, 4.4, 'glint'],       // Terminal loop
      [-135, -230, 2.8, 'bronze'],
      [135, -230, 2.8, 'bronze'],
      [-75, 20, 2.4, 'stone'],
      [75, 20, 2.4, 'stone'],
      [-150, 140, 2.6, 'ember'],
      [150, 140, 2.6, 'ember'],
    ],
    isGlowOnly,
  )
}

// ============================================================================
// 8. PAGE 08 — INFINITY (Sigillum Infinitum 3D Lemniscate Möbius Eternal Seal)
// Sacred Closing Seal of The Living Book — Eternity Reached
// ============================================================================
function drawInfinityPage(ctx, cx, cy, isGlowOnly = false) {
  drawReliefGroove(ctx, (c) => c.arc(cx, cy, 270, 0, Math.PI * 2), { width: 4.8, isHot: true }, isGlowOnly)
  drawReliefGroove(
    ctx,
    (c) => {
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
        c.moveTo(cx + Math.cos(a) * 248, cy + Math.sin(a) * 248)
        c.lineTo(cx + Math.cos(a) * 270, cy + Math.sin(a) * 270)
      }
    },
    { width: 2.8 },
    isGlowOnly,
  )

  ;[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((a) => {
    const qx = cx + Math.cos(a) * 270
    const qy = cy + Math.sin(a) * 270
    drawReliefMass(
      ctx,
      (c) => c.arc(qx, qy, 15, 0, Math.PI * 2),
      { fillColor: C04_DEEP_ORANGE_BROWN, borderColor: C07_BRIGHT_COPPER, borderWidth: 3.2, withApexGlint: true, apexPoint: [qx, qy, 3.2] },
      isGlowOnly,
    )
  })

  const gInf = createReliefGradient(ctx, cx - 235, cy - 150, cx + 235, cy + 150, 'full')
  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx, cy)
      c.bezierCurveTo(cx - 100, cy - 150, cx - 235, cy - 130, cx - 235, cy)
      c.bezierCurveTo(cx - 235, cy + 130, cx - 100, cy + 150, cx, cy)
      c.bezierCurveTo(cx + 100, cy - 150, cx + 235, cy - 130, cx + 235, cy)
      c.bezierCurveTo(cx + 235, cy + 130, cx + 100, cy + 150, cx, cy)
      c.closePath()
    },
    {
      fillColor: gInf,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 5.5,
      withRidge: true,
      ridgeFn: (c) => {
        c.moveTo(cx, cy)
        c.bezierCurveTo(cx - 80, cy - 110, cx - 185, cy - 95, cx - 185, cy)
        c.bezierCurveTo(cx - 185, cy + 95, cx - 80, cy + 110, cx, cy)
        c.bezierCurveTo(cx + 80, cy - 110, cx + 185, cy - 95, cx + 185, cy)
        c.bezierCurveTo(cx + 185, cy + 95, cx + 80, cy + 110, cx, cy)
      },
      withEnergyVein: true,
      veinFn: (c) => {
        c.moveTo(cx, cy)
        c.bezierCurveTo(cx - 100, cy - 140, cx - 225, cy - 120, cx - 225, cy)
        c.bezierCurveTo(cx - 225, cy + 120, cx - 100, cy + 140, cx, cy)
        c.bezierCurveTo(cx + 100, cy - 140, cx + 225, cy - 120, cx + 225, cy)
        c.bezierCurveTo(cx + 225, cy + 120, cx + 100, cy + 140, cx, cy)
      },
      withApexGlint: true,
      apexPoint: [cx, cy, 4.8],
    },
    isGlowOnly,
  )

  drawReliefMass(
    ctx,
    (c) => {
      c.moveTo(cx, cy - 50)
      c.lineTo(cx + 12, cy - 12)
      c.lineTo(cx + 50, cy)
      c.lineTo(cx + 12, cy + 12)
      c.lineTo(cx, cy + 50)
      c.lineTo(cx - 12, cy + 12)
      c.lineTo(cx - 50, cy)
      c.lineTo(cx - 12, cy - 12)
      c.closePath()
    },
    {
      fillColor: C04_DEEP_ORANGE_BROWN,
      borderColor: C07_BRIGHT_COPPER,
      borderWidth: 3.6,
      withEnergyVein: true,
      veinFn: (c) => c.arc(cx, cy, 14, 0, Math.PI * 2),
      withApexGlint: true,
      apexPoint: [cx, cy, 4.0],
    },
    isGlowOnly,
  )

  ;[-150, 150].forEach((fx) => {
    drawReliefMass(
      ctx,
      (c) => c.arc(cx + fx, cy, 18, 0, Math.PI * 2),
      { fillColor: C04_DEEP_ORANGE_BROWN, borderColor: C07_BRIGHT_COPPER, borderWidth: 3.2, withApexGlint: true, apexPoint: [cx + fx, cy, 3.6] },
      isGlowOnly,
    )
  })

  drawDebrisParticles(
    ctx,
    cx,
    cy,
    [
      [-235, 0, 4.0, 'hotspot'],
      [235, 0, 4.0, 'hotspot'],
      [0, 0, 3.6, 'hotspot'],
      [-150, -85, 2.8, 'bronze'],
      [150, -85, 2.8, 'bronze'],
      [-150, 85, 2.8, 'bronze'],
      [150, 85, 2.8, 'bronze'],
      [-100, 0, 2.2, 'stone'],
      [100, 0, 2.2, 'stone'],
      [0, -270, 3.0, 'ember'],
      [0, 270, 3.0, 'ember'],
    ],
    isGlowOnly,
  )
}

// ============================================================================
// LEFT PAGE — THE COSMOS BEYOND THE MYTH (PITCH-BLACK VOID PASS)
// Pure pitch-black void (#050505) with recognizable miniature celestial objects:
// Feature Spiral Galaxy (11% width), Edge-On Disk (7%), Smooth Elliptical (5%),
// Dwarf Cloud (4%), Barred Ring (4%), Black Hole System, 2 Star Clusters, and Crisp Starlight.
// Communicates: "Entire galaxies are tiny things contained inside this infinite black void."
// ============================================================================
function drawLeftCosmicPage(ctx, cx, cy, isGlowOnly = false) {
  // --------------------------------------------------------------------------
  // 1. ANCIENT CELESTIAL MANUSCRIPT TRACES (Barely visible dark astronomical coordinate lines)
  // --------------------------------------------------------------------------
  if (!isGlowOnly) {
    ctx.save()
    ctx.strokeStyle = 'rgba(74, 79, 154, 0.12)'
    ctx.lineWidth = 0.75

    // Sweeping ancient celestial meridian arc
    ctx.beginPath()
    ctx.arc(cx - 360, cy + 100, 510, -0.40, 0.44)
    ctx.stroke()

    // Faint concentric orbital gauge
    ctx.strokeStyle = 'rgba(116, 104, 184, 0.09)'
    ctx.lineWidth = 0.6
    ctx.setLineDash([4, 14])
    ctx.beginPath()
    ctx.arc(cx + 90, cy - 130, 240, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Microscopic declination tick marks along vertical axis
    ctx.strokeStyle = 'rgba(201, 215, 255, 0.14)'
    ctx.lineWidth = 0.75
    for (let y = cy - 450; y <= cy + 450; y += 50) {
      ctx.beginPath()
      ctx.moveTo(cx - 340, y)
      ctx.lineTo(cx - 332, y)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(cx + 332, y)
      ctx.lineTo(cx + 340, y)
      ctx.stroke()
    }
    ctx.restore()
  }

  // --------------------------------------------------------------------------
  // 2. RECOGNIZABLE MINIATURE GALAXIES (3–12% Page Width, Multi-Structure Silhouette)
  // --------------------------------------------------------------------------

  // GALAXY 01 — THE FEATURE GRAND SPIRAL GALAXY (Upper Left: cx - 170, cy - 250, ~110px Span / 11% Width)
  {
    const gx = cx - 170
    const gy = cy - 250
    const tilt = 0.54 // ~31 degrees

    if (!isGlowOnly) {
      // A. Outer Diffuse Luminous Halo (Tight, keeping surrounding void pitch black)
      const gHalo = ctx.createRadialGradient(gx, gy, 0, gx, gy, 48)
      gHalo.addColorStop(0.00, 'rgba(201, 215, 255, 0.32)') // Soft cool white
      gHalo.addColorStop(0.35, 'rgba(116, 104, 184, 0.20)') // Violet
      gHalo.addColorStop(0.70, 'rgba(40, 59, 120, 0.06)')  // Deep blue
      gHalo.addColorStop(1.00, 'rgba(5, 5, 5, 0.00)')

      ctx.save()
      ctx.translate(gx, gy)
      ctx.rotate(tilt)
      ctx.scale(1.0, 0.55)

      ctx.fillStyle = gHalo
      ctx.beginPath()
      ctx.arc(0, 0, 48, 0, Math.PI * 2)
      ctx.fill()

      // B. Inner Luminous Disk & Bulge
      const gBulge = ctx.createRadialGradient(0, 0, 0, 0, 0, 16)
      gBulge.addColorStop(0.0, 'rgba(255, 232, 194, 0.85)') // Warm cream core
      gBulge.addColorStop(0.5, 'rgba(201, 215, 255, 0.40)') // Cool white
      gBulge.addColorStop(1.0, 'rgba(74, 79, 154, 0.00)')
      ctx.fillStyle = gBulge
      ctx.beginPath()
      ctx.arc(0, 0, 16, 0, Math.PI * 2)
      ctx.fill()

      // C. Two Distinct Curved Logarithmic Spiral Arms
      ;[0, Math.PI].forEach((armOffset) => {
        // Arm Gas Background
        ctx.beginPath()
        for (let t = 0.35; t <= 3.4; t += 0.08) {
          const r = 4.8 * Math.exp(0.36 * t)
          const angle = t + armOffset
          const px = Math.cos(angle) * r
          const py = Math.sin(angle) * r
          if (t === 0.35) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.strokeStyle = 'rgba(74, 79, 154, 0.55)'
        ctx.lineWidth = 3.2
        ctx.stroke()

        // Arm Inner Bright Ribbon
        ctx.strokeStyle = 'rgba(201, 215, 255, 0.70)'
        ctx.lineWidth = 1.4
        ctx.stroke()

        // 14 Dense Star Formation Nodules along each arm
        for (let t = 0.6; t <= 3.3; t += 0.22) {
          const r = 4.8 * Math.exp(0.36 * t) + (Math.sin(t * 8) * 1.2)
          const angle = t + armOffset
          const px = Math.cos(angle) * r
          const py = Math.sin(angle) * r
          const starR = 0.8 + (Math.sin(t * 5) * 0.4)

          ctx.fillStyle = (t > 2.0) ? '#E6ECFF' : '#FFFFFF'
          ctx.beginPath()
          ctx.arc(px, py, starR, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // D. Concentrated Bright Galactic Nucleus
      ctx.fillStyle = '#FFE8C2'
      ctx.beginPath()
      ctx.arc(0, 0, 3.2, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(0, 0, 1.6, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    } else {
      // Glow pass
      ctx.save()
      ctx.shadowColor = 'rgba(201, 215, 255, 0.90)'
      ctx.shadowBlur = 18
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(gx, gy, 3.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // GALAXY 02 — EDGE-ON SPINDLE DISK GALAXY (Mid-Right: cx + 220, cy - 80, ~76px Length / 7% Width)
  {
    const gx = cx + 220
    const gy = cy - 80
    const tilt = -0.28 // -16 degrees

    if (!isGlowOnly) {
      ctx.save()
      ctx.translate(gx, gy)
      ctx.rotate(tilt)

      // A. Outer Faint Blue-Violet Halo
      const gHalo = ctx.createRadialGradient(0, 0, 0, 0, 0, 38)
      gHalo.addColorStop(0.0, 'rgba(116, 104, 184, 0.30)')
      gHalo.addColorStop(0.5, 'rgba(40, 59, 120, 0.12)')
      gHalo.addColorStop(1.0, 'rgba(2, 3, 10, 0.00)')
      ctx.fillStyle = gHalo
      ctx.beginPath()
      ctx.ellipse(0, 0, 38, 14, 0, 0, Math.PI * 2)
      ctx.fill()

      // B. Elongated Spindle Stellar Disk
      const gDisk = ctx.createLinearGradient(-38, 0, 38, 0)
      gDisk.addColorStop(0.00, 'rgba(74, 79, 154, 0.00)')
      gDisk.addColorStop(0.20, 'rgba(116, 104, 184, 0.50)')
      gDisk.addColorStop(0.50, 'rgba(230, 236, 255, 0.90)')
      gDisk.addColorStop(0.80, 'rgba(116, 104, 184, 0.50)')
      gDisk.addColorStop(1.00, 'rgba(74, 79, 154, 0.00)')

      ctx.fillStyle = gDisk
      ctx.beginPath()
      ctx.ellipse(0, 0, 38, 6.5, 0, 0, Math.PI * 2)
      ctx.fill()

      // C. Central Spherical Bulge
      ctx.fillStyle = 'rgba(255, 232, 194, 0.85)'
      ctx.beginPath()
      ctx.ellipse(0, 0, 7.5, 10.5, 0, 0, Math.PI * 2)
      ctx.fill()

      // D. Dark Equatorial Dust Lane Bisecting the Bulge and Disk
      ctx.strokeStyle = 'rgba(2, 3, 10, 0.96)'
      ctx.lineWidth = 2.0
      ctx.beginPath()
      ctx.moveTo(-35, 0.4)
      ctx.lineTo(35, -0.4)
      ctx.stroke()

      // E. Pinpoint Warm White Core
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(0, -1.0, 1.4, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    } else {
      ctx.save()
      ctx.shadowColor = 'rgba(201, 215, 255, 0.75)'
      ctx.shadowBlur = 12
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(gx, gy, 2.0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // GALAXY 03 — SMOOTH ELLIPTICAL GALAXY (Lower-Left: cx - 170, cy + 240, ~52px Span / 5% Width)
  {
    const gx = cx - 170
    const gy = cy + 240
    const tilt = 0.65 // ~37 degrees

    if (!isGlowOnly) {
      const gEllip = ctx.createRadialGradient(0, 0, 0, 0, 0, 26)
      gEllip.addColorStop(0.00, 'rgba(255, 232, 194, 0.90)') // Warm ivory nucleus
      gEllip.addColorStop(0.25, 'rgba(255, 217, 160, 0.55)') // Pale gold
      gEllip.addColorStop(0.55, 'rgba(116, 104, 184, 0.25)') // Cool violet body
      gEllip.addColorStop(0.85, 'rgba(40, 59, 120, 0.08)')  // Outer envelope
      gEllip.addColorStop(1.00, 'rgba(2, 3, 10, 0.00)')

      ctx.save()
      ctx.translate(gx, gy)
      ctx.rotate(tilt)
      ctx.scale(1.0, 0.68)
      ctx.fillStyle = gEllip
      ctx.beginPath()
      ctx.arc(0, 0, 26, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(0, 0, 2.0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    } else {
      ctx.save()
      ctx.shadowColor = 'rgba(255, 217, 160, 0.70)'
      ctx.shadowBlur = 10
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(gx, gy, 2.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // GALAXY 04 — IRREGULAR DWARF CLOUD (Upper Right: cx + 180, cy - 390, ~40px Span / 4% Width)
  {
    const gx = cx + 180
    const gy = cy - 390

    if (!isGlowOnly) {
      ctx.save()
      ctx.translate(gx, gy)

      // Asymmetric Multi-Lobe Gaseous Cloud
      const lobes = [
        [-6, -4, 14, 'rgba(116, 104, 184, 0.32)'],
        [8, 3, 12, 'rgba(74, 79, 154, 0.28)'],
        [-2, 7, 10, 'rgba(40, 59, 120, 0.22)'],
      ]
      lobes.forEach(([lx, ly, lr, col]) => {
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.arc(lx, ly, lr, 0, Math.PI * 2)
        ctx.fill()
      })

      // 8 Embedded Stellar Clusters
      const clusters = [
        [-8, -5, 1.2, '#FFFFFF'], [-4, -2, 1.5, '#E6ECFF'],
        [2, 0, 1.0, '#C9D7FF'], [7, 4, 1.4, '#FFFFFF'],
        [-1, 8, 1.1, '#E6ECFF'], [11, 2, 0.8, '#C9D7FF'],
        [-7, 5, 0.9, '#FFFFFF'], [5, -4, 1.2, '#FFE8C2'],
      ]
      clusters.forEach(([px, py, pr, pcol]) => {
        ctx.fillStyle = pcol
        ctx.beginPath()
        ctx.arc(px, py, pr, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
    } else {
      ctx.save()
      ctx.shadowColor = 'rgba(201, 215, 255, 0.60)'
      ctx.shadowBlur = 8
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(gx - 4, gy - 2, 1.6, 0, Math.PI * 2)
      ctx.arc(gx + 7, gy + 4, 1.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // GALAXY 05 — DISTANT BARRED RING GALAXY (Lower Right: cx + 160, cy + 340, ~44px Span / 4% Width)
  {
    const gx = cx + 160
    const gy = cy + 340
    const tilt = 0.38

    if (!isGlowOnly) {
      ctx.save()
      ctx.translate(gx, gy)
      ctx.rotate(tilt)
      ctx.scale(1.0, 0.60)

      // Outer Detached Resonant Stellar Ring
      ctx.strokeStyle = 'rgba(116, 104, 184, 0.45)'
      ctx.lineWidth = 2.4
      ctx.beginPath()
      ctx.arc(0, 0, 20, 0, Math.PI * 2)
      ctx.stroke()

      // Ring Star Nodules
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.fillStyle = '#E6ECFF'
        ctx.beginPath()
        ctx.arc(Math.cos(a) * 20, Math.sin(a) * 20, 0.9, 0, Math.PI * 2)
        ctx.fill()
      }

      // Central Linear Stellar Bar
      ctx.strokeStyle = 'rgba(201, 215, 255, 0.70)'
      ctx.lineWidth = 2.2
      ctx.beginPath()
      ctx.moveTo(-12, 0)
      ctx.lineTo(12, 0)
      ctx.stroke()

      // Luminous Nucleus
      ctx.fillStyle = '#FFE8C2'
      ctx.beginPath()
      ctx.arc(0, 0, 2.4, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(0, 0, 1.2, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    } else {
      ctx.save()
      ctx.shadowColor = 'rgba(201, 215, 255, 0.65)'
      ctx.shadowBlur = 9
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(gx, gy, 1.8, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // --------------------------------------------------------------------------
  // 4. MINIATURE BLACK HOLE SYSTEM WITH ACCRETION DISK (Mid-Left: cx - 100, cy + 40, ~30px Span)
  // --------------------------------------------------------------------------
  {
    const bx = cx - 100
    const by = cy + 40
    const tilt = -0.22

    if (!isGlowOnly) {
      ctx.save()
      ctx.translate(bx, by)
      ctx.rotate(tilt)

      // A. Gravitational Lensing Outer Halo
      const gLens = ctx.createRadialGradient(0, 0, 3.8, 0, 0, 18)
      gLens.addColorStop(0.0, 'rgba(201, 215, 255, 0.40)')
      gLens.addColorStop(0.4, 'rgba(116, 104, 184, 0.25)')
      gLens.addColorStop(0.8, 'rgba(40, 59, 120, 0.08)')
      gLens.addColorStop(1.0, 'rgba(2, 3, 10, 0.00)')
      ctx.fillStyle = gLens
      ctx.beginPath()
      ctx.arc(0, 0, 18, 0, Math.PI * 2)
      ctx.fill()

      // B. Relativistic Warped Accretion Disk (Doppler-Brightened on Left Side)
      ctx.save()
      ctx.scale(1.0, 0.38)

      // Outer Accretion Gas
      ctx.strokeStyle = 'rgba(116, 104, 184, 0.60)'
      ctx.lineWidth = 3.6
      ctx.beginPath()
      ctx.arc(0, 0, 14, 0, Math.PI * 2)
      ctx.stroke()

      // Hot Relativistic Flow (Left side brighter)
      const gAccretion = ctx.createLinearGradient(-15, 0, 15, 0)
      gAccretion.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)') // Approaching beam
      gAccretion.addColorStop(0.4, 'rgba(255, 217, 160, 0.85)') // Warm gold
      gAccretion.addColorStop(0.8, 'rgba(116, 104, 184, 0.40)') // Receding red-shifted
      gAccretion.addColorStop(1.0, 'rgba(74, 79, 154, 0.15)')

      ctx.strokeStyle = gAccretion
      ctx.lineWidth = 1.8
      ctx.beginPath()
      ctx.arc(0, 0, 9, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      // C. Inner Photon Ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
      ctx.lineWidth = 0.9
      ctx.beginPath()
      ctx.arc(0, 0, 4.8, 0, Math.PI * 2)
      ctx.stroke()

      // D. Pure Pitch-Black Event Horizon (Shadow of Singularity)
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(0, 0, 3.8, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    } else {
      ctx.save()
      ctx.shadowColor = 'rgba(201, 215, 255, 0.80)'
      ctx.shadowBlur = 10
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(bx, by, 4.8, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }
  }

  // --------------------------------------------------------------------------
  // 5. STAR CLUSTERS (2 Distinct Celestial Groupings)
  // --------------------------------------------------------------------------

  // CLUSTER 1: GLOBULAR STAR CLUSTER (Messier-Style Core: cx - 240, cy - 70, ~24px Diameter)
  {
    const clx = cx - 240
    const cly = cy - 70

    if (!isGlowOnly) {
      ctx.save()
      // Cluster Ambient Glow
      const gGlob = ctx.createRadialGradient(clx, cly, 0, clx, cly, 14)
      gGlob.addColorStop(0.0, 'rgba(201, 215, 255, 0.40)')
      gGlob.addColorStop(0.5, 'rgba(116, 104, 184, 0.15)')
      gGlob.addColorStop(1.0, 'rgba(2, 3, 10, 0.00)')
      ctx.fillStyle = gGlob
      ctx.beginPath()
      ctx.arc(clx, cly, 14, 0, Math.PI * 2)
      ctx.fill()

      // 22 Concentrated Star Points
      const globStars = [
        [0, 0, 1.4, '#FFFFFF'], [-1.5, 1.2, 1.1, '#E6ECFF'], [1.2, -1.5, 1.2, '#FFE8C2'],
        [-2.8, -1.0, 0.9, '#FFFFFF'], [2.5, 1.8, 0.8, '#C9D7FF'], [0, -3.2, 0.9, '#E6ECFF'],
        [3.1, -0.5, 0.7, '#FFFFFF'], [-1.8, 3.0, 0.8, '#C9D7FF'], [-4.2, 1.5, 0.7, '#E6ECFF'],
        [4.0, 2.2, 0.6, '#FFFFFF'], [1.5, -4.5, 0.7, '#FFE8C2'], [-3.5, -3.5, 0.6, '#C9D7FF'],
        [5.2, -2.0, 0.6, '#E6ECFF'], [-5.0, -1.2, 0.6, '#FFFFFF'], [2.8, 5.0, 0.6, '#C9D7FF'],
        [0, 6.2, 0.5, '#E6ECFF'], [-6.5, 2.5, 0.5, '#FFFFFF'], [6.0, 3.5, 0.5, '#C9D7FF'],
        [-2.0, -6.8, 0.5, '#E6ECFF'], [7.2, -1.0, 0.5, '#FFFFFF'], [-4.5, 6.0, 0.5, '#C9D7FF'],
        [5.0, -5.5, 0.5, '#E6ECFF'],
      ]
      globStars.forEach(([dx, dy, sr, scol]) => {
        ctx.fillStyle = scol
        ctx.beginPath()
        ctx.arc(clx + dx, cly + dy, sr, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
    } else {
      ctx.save()
      ctx.shadowColor = 'rgba(201, 215, 255, 0.75)'
      ctx.shadowBlur = 10
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(clx, cly, 2.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // CLUSTER 2: OPEN STAR CLUSTER & REFLECTION NEBULA (Pleiades-Style: cx + 70, cy - 270, ~30px Span)
  {
    const ocx = cx + 70
    const ocy = cy - 270

    if (!isGlowOnly) {
      ctx.save()
      // Soft Blue Reflection Cloud
      const gOpen = ctx.createRadialGradient(ocx, ocy, 0, ocx, ocy, 18)
      gOpen.addColorStop(0.0, 'rgba(74, 79, 154, 0.28)')
      gOpen.addColorStop(0.6, 'rgba(40, 59, 120, 0.12)')
      gOpen.addColorStop(1.0, 'rgba(2, 3, 10, 0.00)')
      ctx.fillStyle = gOpen
      ctx.beginPath()
      ctx.arc(ocx, ocy, 18, 0, Math.PI * 2)
      ctx.fill()

      // 9 Luminous Blue-White Stars
      const openStars = [
        [-5, -4, 1.8, '#FFFFFF'], [2, -7, 1.5, '#E6ECFF'], [7, -2, 1.6, '#C9D7FF'],
        [-2, 2, 1.4, '#FFFFFF'], [5, 5, 1.3, '#E6ECFF'], [-8, 4, 1.1, '#C9D7FF'],
        [10, 3, 0.9, '#FFFFFF'], [-4, -9, 1.0, '#E6ECFF'], [1, 9, 0.8, '#C9D7FF'],
      ]
      openStars.forEach(([dx, dy, sr, scol]) => {
        ctx.fillStyle = scol
        ctx.beginPath()
        ctx.arc(ocx + dx, ocy + dy, sr, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
    } else {
      ctx.save()
      ctx.shadowColor = 'rgba(201, 215, 255, 0.65)'
      ctx.shadowBlur = 8
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(ocx - 5, ocy - 4, 1.5, 0, Math.PI * 2)
      ctx.arc(ocx + 7, ocy - 2, 1.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // --------------------------------------------------------------------------
  // 6. SPARSE CELESTIAL STAR FIELD (Multi-Depth Pure Starlight: Cool White, Pale Blue, Warm Ivory)
  // --------------------------------------------------------------------------
  const celestialStars = [
    // [dx, dy, radius, type: 'dust' | 'star' | 'hero']
    // Upper quadrant
    [-290, -420, 0.8, 'dust'],
    [-110, -460, 1.0, 'star'],
    [60, -440, 1.4, 'star'],
    [260, -430, 0.9, 'dust'],
    [-330, -320, 1.6, 'star'],
    [-70, -340, 0.8, 'dust'],
    [100, -330, 2.4, 'hero'], // Hero Star Upper Right
    [290, -270, 1.2, 'star'],
    [-140, -160, 0.9, 'dust'],
    [-40, -180, 1.5, 'star'],
    [140, -200, 1.0, 'dust'],
    [320, -170, 0.8, 'dust'],

    // Mid quadrant
    [-310, -80, 1.4, 'star'],
    [-150, -30, 0.7, 'dust'],
    [-270, 50, 2.5, 'hero'], // Hero Star Mid-Left
    [-60, 80, 1.0, 'dust'],
    [90, 40, 1.5, 'star'],
    [280, 70, 0.9, 'dust'],
    [-320, 170, 0.8, 'dust'],
    [40, 130, 1.1, 'star'],
    [240, 160, 1.8, 'star'],

    // Lower quadrant
    [-260, 290, 0.9, 'dust'],
    [-50, 320, 1.4, 'star'],
    [-190, 400, 0.8, 'dust'],
    [50, 370, 2.6, 'hero'],  // Hero Star Lower Right
    [-310, 450, 1.0, 'dust'],
    [120, 460, 0.8, 'dust'],
    [270, 420, 1.5, 'star'],
  ]

  celestialStars.forEach(([dx, dy, r, type]) => {
    const sx = cx + dx
    const sy = cy + dy

    if (isGlowOnly) {
      if (type === 'hero') {
        ctx.save()
        ctx.shadowColor = 'rgba(201, 215, 255, 0.95)'
        ctx.shadowBlur = 14
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(sx, sy, r * 1.1, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      } else if (type === 'star') {
        ctx.save()
        ctx.shadowColor = 'rgba(201, 215, 255, 0.55)'
        ctx.shadowBlur = 6
        ctx.fillStyle = '#E6ECFF'
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    } else {
      if (type === 'hero') {
        // Soft Celestial Halo
        ctx.fillStyle = 'rgba(116, 104, 184, 0.30)'
        ctx.beginPath()
        ctx.arc(sx, sy, r * 4.0, 0, Math.PI * 2)
        ctx.fill()

        // Microscopic 4-Point Diffraction Rays
        ctx.strokeStyle = 'rgba(201, 215, 255, 0.65)'
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(sx - 8, sy)
        ctx.lineTo(sx + 8, sy)
        ctx.moveTo(sx, sy - 8)
        ctx.lineTo(sx, sy + 8)
        ctx.stroke()

        // Bright Stellar Core
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fill()
      } else if (type === 'star') {
        ctx.fillStyle = '#E6ECFF'
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(sx, sy, r * 0.5, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Microscopic Distant Star Point
        ctx.fillStyle = 'rgba(201, 215, 255, 0.55)'
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  })
}

// ============================================================================
// MAIN PROCEDURAL TEXTURE GENERATOR
// ============================================================================

export function createManuscriptArtwork(type, width = 1024, height = 1400) {
  if (typeof document === 'undefined') {
    return new THREE.Texture()
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()

  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // 1. Leather Cover
  if (type === 'leather_cover') {
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = 'rgba(107, 49, 11, 0.35)'
    ctx.lineWidth = 2.0
    ctx.strokeRect(32, 32, width - 64, height - 64)

    const bracketSize = 48
    ;[
      [32, 32, 1, 1],
      [width - 32, 32, -1, 1],
      [32, height - 32, 1, -1],
      [width - 32, height - 32, -1, -1],
    ].forEach(([bx, by, dx, dy]) => {
      ctx.strokeStyle = C04_DEEP_ORANGE_BROWN
      ctx.lineWidth = 3.0
      ctx.beginPath()
      ctx.moveTo(bx, by + dy * bracketSize)
      ctx.lineTo(bx, by)
      ctx.lineTo(bx + dx * bracketSize, by)
      ctx.stroke()
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.generateMipmaps = true
    return texture
  }

  // 2. Gilded Edge Strata
  if (type === 'gilded_edges') {
    ctx.fillStyle = '#050504'
    ctx.fillRect(0, 0, width, height)
    for (let y = 0; y < height; y += 4) {
      const alpha = 0.08 + (Math.sin(y * 1.4) * 0.5 + 0.5) * 0.16
      ctx.fillStyle = `rgba(143, 80, 29, ${alpha})`
      ctx.fillRect(0, y, width, 2)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.generateMipmaps = true
    return texture
  }

  // 3. Black Manuscript Base
  drawManuscriptBase(ctx, width, height)

  const cx = width * 0.5
  const cy = height * 0.50

  // 4. Left Quiescent Page — The Cosmos Beyond the Myth
  if (type === 'left_quiescent_page' || type === 'left_folio_cosmic') {
    drawLeftCosmicPage(ctx, cx, cy, false)
  }
  // 5. Eight Distinct Mythology Page Engravings (Locked Final 8 Sequence)
  else if (type === 'page_01_phoenix' || type === 'right_folio_phoenix') {
    drawPhoenixHeraldicPage(ctx, cx, cy, false)
  } else if (type === 'page_02_celestial') {
    drawSolarCelestialPage(ctx, cx, cy, false)
  } else if (type === 'page_03_anubis') {
    drawAnubisPage(ctx, cx, cy, false)
  } else if (type === 'page_04_sword') {
    drawSwordPage(ctx, cx, cy, false)
  } else if (type === 'page_05_greek') {
    drawGreekRuinPage(ctx, cx, cy, false)
  } else if (type === 'page_06_wings') {
    drawWingsPage(ctx, cx, cy, false)
  } else if (type === 'page_07_thor' || type === 'page_07_hammer' || type === 'left_folio_map') {
    drawThorHammerPage(ctx, cx, cy, false)
  } else if (type === 'page_08_infinity' || type === 'page_07_infinity') {
    drawInfinityPage(ctx, cx, cy, false)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter

  return texture
}

export function createManuscriptGlowArtwork(type, width = 1024, height = 1400) {
  if (typeof document === 'undefined') {
    return new THREE.Texture()
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()

  // 100% Transparent Background
  ctx.clearRect(0, 0, width, height)

  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const cx = width * 0.5
  const cy = height * 0.50

  if (type === 'left_quiescent_page' || type === 'left_folio_cosmic') {
    drawLeftCosmicPage(ctx, cx, cy, true)
  } else if (type === 'page_01_phoenix' || type === 'right_folio_phoenix') {
    drawPhoenixHeraldicPage(ctx, cx, cy, true)
  } else if (type === 'page_02_celestial') {
    drawSolarCelestialPage(ctx, cx, cy, true)
  } else if (type === 'page_03_anubis') {
    drawAnubisPage(ctx, cx, cy, true)
  } else if (type === 'page_04_sword') {
    drawSwordPage(ctx, cx, cy, true)
  } else if (type === 'page_05_greek') {
    drawGreekRuinPage(ctx, cx, cy, true)
  } else if (type === 'page_06_wings') {
    drawWingsPage(ctx, cx, cy, true)
  } else if (type === 'page_07_thor' || type === 'page_07_hammer' || type === 'left_folio_map') {
    drawThorHammerPage(ctx, cx, cy, true)
  } else if (type === 'page_08_infinity' || type === 'page_07_infinity') {
    drawInfinityPage(ctx, cx, cy, true)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter

  return texture
}

export function useManuscriptArtwork(type) {
  return useMemo(() => createManuscriptArtwork(type), [type])
}

export default useManuscriptArtwork
