# About → Coding: Audio SFX Generation Specification

**Identity:** Human Editorial Warmth $\longrightarrow$ High-Precision Digital Shearing $\longrightarrow$ Phosphor Matrix Awakening  
**Target Duration:** Exactly `1.300` seconds (`1300 ms`)  
**Sample Rate:** `48000 Hz` (48 kHz), 24-bit / 16-bit Stereo PCM  
**Output Target:** `public/audio/final/about-to-coding.wav`  
**Master Dynamics Target:** Peak Level: `-8.5 dBFS`, True Peak Ceiling: `-1.0 dBFS`, Integrated RMS: `~-22.0 dBFS`

---

## 1. Executive Sound Philosophy & Identity

### The Concept: The Digital Dematerialization & Reassembly
The **ABOUT → CODING** transition represents an ultra-fast, high-precision transformation from the **Human/Editorial Creator Foundation** (organic warmth, champagne-gold light `#dfb15b`, tactile paper stillness) into the **Computational Architecture / Terminal Matrix** (terminal black `#050706`, phosphor-green laser `#39ff72`, high-speed algorithmic telemetry).

Rather than feeling like a generic webpage reload or a retro 8-bit videogame glitch, this sound must feel like **high-end technological hardware de-synchronizing, shearing apart along horizontal data planes, dropping into a breathless digital vacuum, and being re-rasterized by a high-voltage phosphor laser**.

### Core Aesthetic Principles
1. **Tactile Precision over Cartoon Glitch:** Every micro-transient must feel crisp, sharp, and physically grounded (analog switch contact, razor-sharp slice displacement, laser cathode sweep) rather than cheap synthetic software noise.
2. **Dynamic Breathing & The Digital Void:** Even in a rapid 1.30-second transition, there must be distinct dynamic peaks and an intentional negative-space vacuum gap ($0.60\text{s} – 0.74\text{s}$) where the old world disappears before the new world strikes.
3. **Restraint & Intelligence:** No continuous drone walls or loud muddy bass mud. Low frequencies are reserved strictly for the horizontal shear sweep ($0.38\text{s}$) and the final terminal lock ($1.04\text{s}$).

---

## 2. Phase-by-Phase Synchronized Visual & Audio Event Mapping (0.00s – 1.30s)

```
0.00s ───── 0.22s ────── 0.38s ────── 0.60s ────── 0.74s ────── 1.04s ────── 1.30s
[JITTER]   [RGB GHOSTS]  [SLICES/SWEEP] [VOID GAP]  [SCAN/BEAM]  [LOCK/SETTLE] [STABLE]
```

| Phase | Time Range | Exact Visual Choreography in Code | Acoustic Core | Frequency Character | Stereo Behavior |
|---|---|---|---|---|---|
| **Phase 1** | `0.000s – 0.220s` | Text headings micro-jitter horizontally ($+4\text{px} \to -3\text{px} \to +2\text{px}$), opacity drops to $82\%$ | Tactile micro-electrical de-sync & high-speed digital jitter | $1.2\text{kHz} – 8.5\text{kHz}$ | Center-focused ($15\%$) |
| **Phase 2** | `0.180s – 0.320s` | Portrait shears left ($-8\text{px}$); Red, Cyan, Blue chromatic ghosts diverge ($-14\text{px} \dots +16\text{px}$) | Chromatic prism distortion & subtle sub-bass slip | $180\text{Hz} – 4.5\text{kHz}$ | Widening ($20\% \to 60\%$) |
| **Phase 3** | `0.240s – 0.580s` | 14 irregular horizontal slices shear left/right ($-135\text{px} \dots +110\text{px}$); gold signals sweep across screen | Sharp mechanical slice shearing & gold energy burst | $450\text{Hz} – 11.0\text{kHz}$ | Wide split stereo ($85\%$) |
| **Phase 4** | `0.380s – 0.600s` | Background fades to `#050706`; slices & world accelerate violently off-screen ($x: \times 3.5$) | High-speed vacuum draw & data sweep into darkness | $90\text{Hz} – 2.8\text{kHz}$ | Left $\to$ Right velocity |
| **Phase 5** | `0.600s – 0.740s` | **THE DIGITAL VOID**: Old world unmounted, new world hidden ($x: -40\text{px}, \alpha: 0$), pure black hold | **Negative Space Vacuum Notch**: Instantaneous quiet | Deep sub breath $<60\text{Hz}$ | Dead Center ($0\%$) |
| **Phase 6** | `0.740s – 1.040s` | Green phosphor scanline laser sweeps top $\to$ bottom ($15\% \to 85\%$); 45vw code beam sweeps left $\to$ right | CRT laser rasterization sweep & radiant green data beam | $600\text{Hz} – 14.0\text{kHz}$ | Vertical & L $\to$ R sweep |
| **Phase 7** | `0.840s – 1.120s` | Coding terminal interface resolves from $x: -40\text{px} \to 0\text{px}$ with crisp opacity fade | High-precision digital lock click & matrix resolution | $120\text{Hz} – 3.8\text{kHz}$ | Expanding ($40\% \to 80\%$) |
| **Phase 8** | `1.080s – 1.300s` | Overlay recedes to transparent; terminal system stabilizes in steady state | Low-frequency terminal settling hum resolving to zero | $80\text{Hz} – 400\text{Hz}$ | Centered natural decay |

---

## 3. Timestamp-by-Timestamp SFX Production Specification

### Phase 1: Human De-synchronization & Text Micro-Jitter
- **Time Range:** `0.000s – 0.220s` (`0ms – 220ms`)
- **Visual Event:** The clean editorial typography of the About world (`h1, h2, h3, .about-hero__roles`) begins an instantaneous, sharp horizontal micro-jitter: snapping right ($+4\text{px}, \alpha: 0.82$ for $80\text{ms}$), then left ($-3\text{px}, \alpha: 0.95$ for $60\text{ms}$), then settling slightly ($+2\text{px}, \alpha: 0.88$ for $80\text{ms}$).
- **Sound Function:** Signal the immediate onset of digital instability within an otherwise stable editorial space.
- **Sound Character:** Tactile, dry micro-electrical de-sync, fine-grain digital relay contact, high-frequency digital clock slip.
- **Intensity Progression:** Starts instantly at `0.00s` (`-18 dBFS`), rapidly fluctuating across the three jitter intervals, peaking at `-15 dBFS`.
- **Frequency Character:**
  - Crisp high-frequency micro-ticks: $3.5\text{kHz} – 9.0\text{kHz}$
  - Mid-frequency contact transient: $1.2\text{kHz} – 2.4\text{kHz}$
  - Clean low-frequency roll-off below $300\text{Hz}$ to keep the opening delicate and un-muddled
- **Stereo Behavior:** Narrow, tight center focus ($15\%$ stereo width).
- **Negative Constraints (DO NOT HEAR):** No 8-bit game bleeps, no cartoon buzzer, no generic mouse click, no loud thud.
- **Transition:** Slips directly into the RGB chromatic separation at `0.18s`.

---

### Phase 2: Portrait & Chromatic Instability (RGB Ghost De-convergence)
- **Time Range:** `0.180s – 0.320s` (`180ms – 320ms`)
- **Visual Event:** The main About portrait and UI shift left ($-8\text{px}$ over $120\text{ms}$), while three screen-blend chromatic ghost layers violently decouple:
  - **Red Ghost (`#ff4b4b`):** Displaces left to $x = -14\text{px}$ ($\alpha: 0.60$).
  - **Cyan Ghost (`#3df8ff`):** Displaces right to $x = +16\text{px}$ ($\alpha: 0.55$).
  - **Blue Ghost (`#6387ff`):** Displaces diagonally to $x = -8\text{px}, y = -2\text{px}$ ($\alpha: 0.40$).
- **Sound Function:** Provide sonic weight and acoustic texture to the optical chromatic aberration.
- **Sound Character:** Prism-like harmonic phase distortion, subtle analog tape slip, fast sub-surface magnetic displacement.
- **Intensity Progression:** Rises smoothly from `-16 dBFS` up to `-12 dBFS` at `0.30s`.
- **Frequency Character:**
  - High-frequency chromatic shimmer: $5.0\text{kHz} – 12.0\text{kHz}$
  - Mid-frequency phase cancellation body: $500\text{Hz} – 1.8\text{kHz}$
  - Low-end magnetic slip: $140\text{Hz} – 260\text{Hz}$
- **Stereo Behavior:** Sudden widening from center out to $60\%$ width (Red on left, Cyan on right).
- **Negative Constraints (DO NOT HEAR):** No robotic vocoder, no siren pitch sweep, no guitar feedback.
- **Transition:** Overlaps directly with the 14-slice mechanical shearing at `0.24s`.

---

### Phase 3: Directional Horizontal Slices & Gold Signal Ejection
- **Time Range:** `0.240s – 0.580s` (`240ms – 580ms`)
- **Visual Event:** The viewport fractures into 14 distinct horizontal slices defined by irregular CSS `clip-path` bands. Slices violently shear in alternating left/right directions (e.g. Slice 8 shears $-120\text{px}$, Slice 5 shears $+110\text{px}$, Slice 14 shears $-135\text{px}$) with staggered delays ($0.01\text{s} \dots 0.07\text{s}$). Simultaneously, 12 glowing champagne-gold signal bars (`#dfb15b`) shoot horizontally across the screen ($140\text{px} \dots 280\text{px}$) with radiant amber glow (`0 0 14px rgba(223, 177, 91, 0.8)`).
- **Sound Function:** Deliver the primary kinetic energy of physical structural deconstruction.
- **Sound Character:** Multi-layered razor-sharp mechanical slice shears, high-speed metallic displacement, shimmering gold signal emission.
- **Intensity Progression:** Sharp attack building from `-14 dBFS` to `-9.5 dBFS` at `0.40s`.
- **Frequency Character:**
  - Razor slice transient: Crisp mechanical clicks and shears at $2.2\text{kHz} – 7.5\text{kHz}$
  - Gold signal velocity shimmer: Granular air excitation at $6.0\text{kHz} – 14.0\text{kHz}$
  - Displacement body: Low-mid punch at $220\text{Hz} – 550\text{Hz}$
- **Stereo Behavior:** Aggressive, wide ping-pong stereo separation ($85\%$ width) tracking the left/right slice offsets.
- **Negative Constraints (DO NOT HEAR):** No sword slashes, no whip cracks, no comic cartoon whooshes.
- **Transition:** Accelerates into the violent sweep of Phase 4 at `0.38s`.

---

### Phase 4: World Disintegration & Sweep into Digital Void
- **Time Range:** `0.380s – 0.600s` (`380ms – 600ms`)
- **Visual Event:** The dark overlay (`#050706`) ramps to full opacity ($1.0$). Slices accelerate to $3.5\times$ their original offsets, pulling all remaining remnants of the About world off-screen ($x: +95\text{px}$). Gold signals shoot completely past the right edge ($x: +160\text{px}$) and fade to zero.
- **Sound Function:** Convey the total, irreversible extraction of the outgoing world into deep digital darkness.
- **Sound Character:** High-velocity vacuum draw, low-frequency air displacement whoosh, disappearing particulate tail.
- **Intensity Progression:** Swells briefly to `-9.0 dBFS` at `0.46s`, then cuts sharply down to silence by `0.60s`.
- **Frequency Character:**
  - Deep vacuum suction body: Smooth downward sweep from $450\text{Hz} \to 110\text{Hz}$
  - High-frequency air extraction: $4.0\text{kHz} \dots 1.5\text{kHz}$
- **Stereo Behavior:** Rapid left-to-right panning sweep collapsing into dead center.
- **Negative Constraints (DO NOT HEAR):** No explosion, no thunder rumble, no lingering reverb mud.
- **Transition:** Instantaneous cutoff at `0.60s` into the digital void gap.

---

### Phase 5: The Digital Void Gap (Negative Space / Pure Stillness)
- **Time Range:** `0.600s – 0.740s` (`600ms – 740ms | 140ms Duration`)
- **Visual Event:** The screen is pure `#050706` digital black. The About world has been completely unmounted from the DOM. The incoming Coding world is mounted underneath but held at `opacity: 0, x: -40px`. Total visual stillness.
- **Sound Function:** Create intense anticipation and dynamic contrast. The listener feels the vacuum of an empty mainframe before execution.
- **Sound Character:** **Negative Space / True Silence** with an imperceptible sub-harmonic floor ($<45\text{Hz}$).
- **Intensity Progression:** `-inf dBFS` to `-54 dBFS` (near-total silence).
- **Frequency Character:** Sub $<45\text{Hz}$ only; mid and high frequencies are $100\%$ acoustically dead.
- **Stereo Behavior:** Zero width (dead center).
- **Negative Constraints (DO NOT HEAR):** No hum, no hiss, no wind, no residual reverb tail.
- **Transition:** The dead silence makes the phosphor laser in Phase 6 hit with maximum impact at `0.74s`.

---

### Phase 6: Phosphor Scanline Laser & Green Data Beam Sweep
- **Time Range:** `0.740s – 1.040s` (`740ms – 1040ms`)
- **Visual Event:** Two simultaneous high-voltage visual sweeps ignite across the dark canvas:
  1. **Phosphor Scanline Laser:** A vibrant `#39ff72` glowing horizontal beam (`box-shadow: 0 0 18px #39ff72`) ignites at `top: 15%` and sweeps down to `top: 85%` over $260\text{ms}$.
  2. **Green Data Code Beam:** A $45\text{vw}$-wide luminous volumetric gradient (`rgba(57, 255, 114, 0.22)`) sweeps across the viewport from `left: -20%` to `left: 110%` over $280\text{ms}$.
  3. Eight matrix green signal telemetry bars (`#39ff72`) rapidly expand horizontally across the screen with staggered delays.
- **Sound Function:** Deliver the energetic climax of the transition: the birth and rasterization of the Coding world.
- **Sound Character:** High-voltage CRT cathode laser sweep, radiant electric ionization, crisp data-packet transmission whoosh.
- **Intensity Progression:** Instantaneous attack at `0.74s` reaching the master peak of **`-8.5 dBFS`**, sustaining bright energy through `0.92s` before blooming into the resolution phase.
- **Frequency Character:**
  - High-frequency laser ionization: $4.5\text{kHz} – 16.0\text{kHz}$
  - CRT cathode raster body: $800\text{Hz} – 3.2\text{kHz}$
  - Sub-energy pulse: Clean $65\text{Hz} – 140\text{Hz}$ punch at laser onset
- **Stereo Behavior:** Dynamic 3D sweep: vertical downward frequency-tracking combined with an ultra-wide left-to-right spatial sweep ($100\%$ stereo bloom).
- **Negative Constraints (DO NOT HEAR):** No generic sci-fi laser blaster (`pew pew`), no 8-bit arpeggio, no distorted guitar buzz.
- **Transition:** Seamlessly resolves into the interface assembly at `0.84s`.

---

### Phase 7: Coding Portrait & Content Reconstruction Resolution
- **Time Range:** `0.840s – 1.120s` (`840ms – 1120ms`)
- **Visual Event:** The Coding world UI, code editor panels, and developer portrait slide from $x: -40\text{px} \to 0\text{px}$ with a crisp `power3.out` deceleration curve, snapping into full focus ($\alpha: 1.0$). Green signal telemetry bars, scanline laser, and code beam fade gracefully to zero.
- **Sound Function:** Communicate precision, stability, and computational lock.
- **Sound Character:** High-precision metallic/digital relay latch, mechanical terminal lock, warm resonant confirmation tone.
- **Intensity Progression:** Decays from `-11 dBFS` at `0.84s` down to `-24 dBFS` at `1.12s`.
- **Frequency Character:**
  - Structural relay latch click: $1.8\text{kHz} – 4.2\text{kHz}$
  - Warm confirmation body: $280\text{Hz} – 750\text{Hz}$
  - Clean low-frequency lock weight: $90\text{Hz} – 180\text{Hz}$
- **Stereo Behavior:** Converges from wide stereo ($80\%$) into solid center focus ($30\%$).
- **Negative Constraints (DO NOT HEAR):** No Windows chime, no elevator ding, no video-game "quest complete" fanfare.
- **Transition:** Fades smoothly into the final settling phase at `1.08s`.

---

### Phase 8: Coding System Awakening & Stabilization
- **Time Range:** `1.080s – 1.300s` (`1080ms – 1300ms`)
- **Visual Event:** The black transition overlay fades out completely (`autoAlpha: 0` over $220\text{ms}$). The active Coding environment stands fully awake, stable, and ready for user interaction.
- **Sound Function:** Provide a smooth, elegant acoustic resolution into absolute silence at exactly `1.300s`.
- **Sound Character:** Subtle low-frequency terminal system hum fading naturally along a logarithmic decay curve into absolute silence.
- **Intensity Progression:** Decays smoothly from `-26 dBFS` down to complete mathematical silence (`-inf dBFS`) at `1.300s`.
- **Frequency Character:**
  - Clean low-end settling: $60\text{Hz} – 220\text{Hz}$
  - High frequencies completely rolled off above $800\text{Hz}$
- **Stereo Behavior:** Centered, gentle spatial dissipation.
- **Negative Constraints (DO NOT HEAR):** No abrupt audio cutoff, no lingering hiss, no clicks or DC offset pops.
- **Transition:** Sample-accurate fade to zero at `1.300s`.

---

## 4. Master Frequency & Layering Architecture (4-Layer Framework)

```
[Layer 4: High-Freq Ionization & Micro-Glitch] (3.5 kHz - 16 kHz) ═══ Text Ticks ═══> Chromatic Shimmer ═══> Slices Shear ═══> [GAP] ═══> CRT LASER SWEEP ═══> Particle Dissolve ═══> 0
[Layer 3: Mid-Freq Mechanical & Data Body]     (600 Hz - 3.5 kHz) ═══ Relay Click ══> Phase Distortion ═══> Data Whistle ══> [GAP] ═══> Code Beam Sweep ═══> Terminal Latch Click ═> 0
[Layer 2: Low-Mid Kinetic Displacement]        (140 Hz - 600 Hz)  ══════════════════> Magnetic Slip ═══════> Shear Velocity ═> [GAP] ═══> Volumetric Bloom ══> Confirmation Body ═══> 0
[Layer 1: Sub-Bass Pressure & Lock]            (20 Hz - 140 Hz)   ═════════════════════════════════════════> Vacuum Suction ═> [GAP] ═══> 70Hz Laser Punch ══> 90Hz Lock Weight ════> 0
Timeline:                                                         0.00s              0.18s                 0.38s              0.60s-0.74s 0.74s                1.04s                 1.30s
```

---

## 5. Negative Constraints (Strict Sound Rules)

Gemini/Veo must adhere strictly to the following sound-design constraints:

- ❌ **NO 8-bit chiptunes or retro arcade sounds:** No NES bleeps, jump noises, or pixel game sound effects.
- ❌ **NO generic sci-fi laser blasters:** No cheesy "pew pew" arcade lasers.
- ❌ **NO EDM risers, sweeps, or snare builds:** No white noise buildups, reverse cymbals, or pitch risers.
- ❌ **NO Hollywood trailer braams or action horns:** No distorted brass stabs or Hans Zimmer-style horn blasts.
- ❌ **NO computer error beeps or OS notifications:** No Windows/Mac chime, no error buzz, no dial-up tones.
- ❌ **NO musical melodies, vocals, or chord progressions:** Pure organic/technological sound design only.
- ❌ **NO constant background noise walls:** Silence must be preserved during the digital void gap ($0.60\text{s} – 0.74\text{s}$).

---

## 6. MASTER GEMINI / VEO SOUND-DESIGN PROMPT

*(Copy and paste the block below directly into Gemini to generate the sound-design video for audio extraction)*

```text
Create a continuous, high-definition 1.30-second cinematic sound-design video whose primary purpose is to generate an ultra-premium, high-precision transition sound effect for a luxury portfolio transition from "About" (Human Creator) to "Coding" (Computational Matrix). The sound must be sharp, intelligent, tactile, futuristic, and physically grounded. Pure sound design, zero music, zero 8-bit retro beeps, zero generic sci-fi laser zaps, zero EDM risers, zero trailer braams:

[0.00s–0.22s: Human De-synchronization & Text Micro-Jitter]
Tactile, dry micro-electrical de-sync ticks and high-speed digital clock jitter as crisp typography undergoes subtle horizontal instability; clean high-frequency micro-transients (3.5kHz–9kHz), centered, delicate, restrained (-15 dBFS).

[0.18s–0.38s: Chromatic Aberration & 14-Slice Mechanical Shearing]
Sharp horizontal structural fracture; rapid mechanical slice shears displace left and right with high-precision metallic displacement; chromatic optical prism phase distortion and fast sub-surface magnetic slip (500Hz–7.5kHz); wide split stereo separation (85% width).

[0.38s–0.60s: System Disintegration & Vacuum Sweep]
Violent outward data acceleration; high-velocity vacuum draw and deep air displacement whoosh pulling all outgoing elements into deep digital darkness; rapid left-to-right velocity sweep collapsing into dead center.

[0.60s–0.74s: The Digital Void Gap (Negative Space / Pure Stillness)]
MANDATORY VACUUM GAP: 140 milliseconds of near-total silence and breathless negative space as the old world vanishes completely; dead center, sub-harmonic stillness (<45Hz only, -inf dBFS), creating intense tension.

[0.74s–1.04s: Phosphor Scanline Laser & Green Data Beam Sweep]
THE APEX MOMENT: A high-voltage phosphor green CRT cathode laser rasterization sweep combined with a wide volumetric green data beam whoosh rushing across the stereo field; crisp high-frequency laser ionization (4.5kHz–16kHz) and an energetic 70Hz sub punch hitting the master peak of -8.5 dBFS with 100% full stereo bloom.

[1.04s–1.30s: Matrix Terminal Lock & Stabilization Decay]
Solid high-precision mechanical/computational relay latch click (1.8kHz–4.2kHz) and low-frequency confirmation weight (90Hz) as the terminal snaps into rock-solid focus, resolving into a warm logarithmic decay that settles into complete absolute silence at exactly 1.300 seconds.

Technical Specifications:
- Exact Total Duration: 1.300 seconds (1300 ms)
- Sample Rate: 48,000 Hz, 24-bit Stereo PCM
- Master Peak Level: -8.5 dBFS (True peak ceiling at -1.0 dBFS)
- Dynamic Contrast: Dramatic difference between the 140ms silence gap (0.60s–0.74s) and the apex phosphor laser sweep (0.74s–1.04s)
- Final Sample at 1.300s: Absolute zero (perfect silence, zero DC offset, zero clicks).
```
