# Sound Design Lab 01 — Majestic → Mythos Audio Master Notes

**Master File:** `public/audio/final/majestic-to-mythos.wav`  
**Duration:** Exactly `8.100000` seconds (8.10s)  
**Sample Rate:** `48000 Hz` (48 kHz)  
**Bit Depth & Encoding:** 16-bit PCM Stereo (`pcm_s16le`)  
**Peak Level:** `-8.4 dBFS` (0.0 dB true clipping headroom, zero distortion)  
**RMS / Mean Level:** `-29.2 dBFS`

---

## 1. Source Audio Assets Used

All 21 layers were constructed exclusively from the verified open-source library in `public/audio/source/`:

1. `particles/glass_shimmer_particle.mp3` (CC0 1.0)
2. `metallic/code4fukui_pure_metal_ring.wav` (CC0 1.0)
3. `particles/organic_dust_drift.mp3` (CC0 1.0)
4. `particles/glass_dust_scatter.mp3` (CC0 1.0)
5. `blackhole/zen_sub_bass_drone.mp3` (CC0 1.0)
6. `cosmic/cinematic_gravity_collapse.mp3` (CC0 1.0)
7. `cosmic/cinematic_spatial_whoosh.mp3` (CC0 1.0)
8. `blackhole/scifi_orbital_resonance.mp3` (CC0 1.0)
9. `metallic/code4fukui_gilded_bell_chime.wav` (CC0 1.0)
10. `blackhole/cinematic_void_drone.mp3` (CC0 1.0)
11. `blackhole/dreamy_vacuum_atmosphere.mp3` (CC0 1.0)
12. `energy/cinematic_energy_charge.mp3` (CC0 1.0)
13. `energy/kenney_energy_rise.ogg` (CC0 1.0)
14. `energy/scifi_energy_pulse.mp3` (CC0 1.0)
15. `impacts/scifi_vacuum_pinch.mp3` (CC0 1.0)
16. `cosmic/scifi_reverse_vortex.mp3` (CC0 1.0)
17. `impacts/cinematic_deep_impact.mp3` (CC0 1.0)
18. `impacts/cinematic_shockwave_bloom.mp3` (CC0 1.0)
19. `impacts/code4fukui_sub_cracker_blast.wav` (CC0 1.0)
20. `particles/glass_dust_scatter.mp3` (CC0 1.0)
21. `energy/zen_harmonic_resonance.mp3` (CC0 1.0)

---

## 2. Phase-by-Phase Synchronized Event Mapping

```
0.00s ────── 0.40s ────── 2.11s ────── 3.73s ── 3.89s ────── 5.35s ────── 6.80s ── 7.20s ────── 8.10s
[DISSOLVE]  [VOID DRIFT] [GRAVITY INFLOW] [LOCK] [HERO BLACK HOLE] [TRANSMUTE] [PINCH] [BIG BANG] [EMERGE]
```

### Phase 1: 0.00s – 0.40s | Majestic Dissolution
- **Visuals:** Majestic world dissolves into black and antique-gold matter particles across `#000000` void.
- **Sound Design:**
  - `glass_shimmer_particle.mp3` (`volume: 0.35`, attack `50ms`, decay `200ms`) — subtle crystalline particle shimmer.
  - `code4fukui_pure_metal_ring.wav` (`volume: 0.18`, highpass $400\text{Hz}$) — delicate antique gold resonance.
  - `organic_dust_drift.mp3` (`volume: 0.28`, decay `250ms`) — low-frequency dissolution texture.
- **Character:** Extremely restrained, delicate, organic, physical.

### Phase 2: 0.40s – 2.11s | Void Dispersion
- **Visuals:** Black and gold particles drift through empty space; space becomes increasingly empty.
- **Sound Design:**
  - `glass_dust_scatter.mp3` (`volume: 0.15`, delay `400ms`, fade out `600ms`) — sparse dust flecks floating into dark void.
  - `zen_sub_bass_drone.mp3` (`volume: 0.25`, lowpass $280\text{Hz}$, delay `300ms`) — subtle deep-space atmosphere fading to near-silence.
- **Character:** Emptiness, spatial depth, quiet mystery.

### Phase 3: 2.11s – 3.89s | Gravitational Inflow
- **Visuals:** Gold particles curve into the inclined elliptical accretion disk ($-24^\circ$ tilt); inward vortex accelerates.
- **Sound Design:**
  - `cinematic_gravity_collapse.mp3` (`volume: 0.65`, delay `2100ms`) — powerful reverse suction and gravitational pull.
  - `cinematic_spatial_whoosh.mp3` (`volume: 0.45`, lowpass $480\text{Hz}$, delay `2300ms`) — deep spatial vortex whoosh.
  - `scifi_orbital_resonance.mp3` (`volume: 0.30`, delay `2400ms`) — subtle rotating orbital texture.
- **Character:** Accelerating inward gravitational vortex.

### Phase 4: 3.73s – 3.89s | Event Horizon Lock
- **Visuals:** Razor-sharp golden photon ring ($R = 54\text{px}$) and pure pitch-black event horizon lock into place.
- **Sound Design:**
  - `code4fukui_gilded_bell_chime.wav` (`volume: 0.28`, bandpass $800\text{Hz} \dots 6000\text{Hz}$, delay `3730ms`) — crisp, elegant gilded ring chime locking the structure.
- **Character:** Metallic gold lock transient, zero cheesy sci-fi lasers.

### Phase 5: 3.89s – 5.35s | HERO BLACK HOLE HOLD (1.46s Duration)
- **Visuals:** **THE HERO MOMENT**: Pure `#000000` pitch-black event horizon surrounded by gold accretion disk in fluid Keplerian orbit. Conceptually silent at center.
- **Sound Design:**
  - `cinematic_void_drone.mp3` (`volume: 0.48`, lowpass $260\text{Hz}$, delay `3850ms`) — deep sub-bass gravitational mass drone ($45\text{Hz} \dots 120\text{Hz}$).
  - `dreamy_vacuum_atmosphere.mp3` (`volume: 0.18`, highpass $2000\text{Hz}$, delay `3890ms`) — ultra-subtle orbital particle shimmer.
- **Character:** Enormous presence, eerie dead silence in the center, restrained cosmic beauty.

### Phase 6: 5.35s – 6.80s | Gold → Mythos Orange Transmutation (1.46s Duration)
- **Visuals:** Accretion disk transforms from Gold $\to$ Radiant Amber $\to$ Fiery Mythos Orange with pulsating energetic shimmer.
- **Sound Design:**
  - `cinematic_energy_charge.mp3` (`volume: 0.55`, delay `5350ms`) — smooth rising ionization and thermal charge.
  - `kenney_energy_rise.ogg` (`volume: 0.28`, delay `5500ms`) — ascending granular pitch-glide.
  - `scifi_energy_pulse.mp3` (`volume: 0.32`, delay `5400ms`) — pulsating energy build.
- **Character:** Thermal transition, energy changing phase and state.

### Phase 7: 6.80s – 7.29s | Singularity Compression
- **Visuals:** Entire orange accretion ring crushes inward into a dense singularity ($R \to 1.0\text{px}$) with rising tension.
- **Sound Design:**
  - `scifi_vacuum_pinch.mp3` (`volume: 0.65`, delay `6800ms`) — high-tension vacuum pinch transient.
  - `scifi_reverse_vortex.mp3` (`volume: 0.45`, delay `6700ms`) — reverse suction into a single point.
- **Character:** Extreme spatial compression into a pinpoint vacuum.

### Phase 8: 7.20s – 7.29s | BIG BANG DETONATION (Exact 7.20s)
- **Visuals:** Radiant radial flash wave + dual expanding amber shockwave rings erupt across screen.
- **Sound Design:**
  - `cinematic_deep_impact.mp3` (`volume: 0.85`, delay `7200ms`) — massive cinematic sub-bass impact (hero transient).
  - `cinematic_shockwave_bloom.mp3` (`volume: 0.65`, delay `7200ms`) — expansive shockwave bloom and spatial reverberation.
  - `code4fukui_sub_cracker_blast.wav` (`volume: 0.40`, lowpass $200\text{Hz}$, delay `7200ms`) — physical sub-bass crackle and weight.
- **Character:** "An entire world being born" — massive, noble, organic, visceral.

### Phase 9: 7.29s – 8.10s | Mythos Emergence & Tail Decay
- **Visuals:** Orange/copper particles blast outward into screen periphery; Mythos resolves smoothly into active space.
- **Sound Design:**
  - `glass_dust_scatter.mp3` (`volume: 0.25`, delay `7250ms`, decay `350ms`) — dispersing particle shower flutter.
  - `zen_harmonic_resonance.mp3` (`volume: 0.45`, delay `7200ms`, decay `400ms` to $8.10\text{s}$) — warm brass-like mythical chord decay.
- **Character:** Warm acoustic release, smooth spatial decay to total silence at $8.10\text{s}$.

---

## 3. Mastering & Dynamics Chain

1. **Summing:** 21 individual audio streams summed in 64-bit floating point (`fltp`) space.
2. **Dynamic Compression:** Soft-knee multi-band compander (`compand=attacks=0.01:decays=0.1:points=-80/-80|-18/-18|-6/-8|0/-1:soft-knee=6`).
3. **True Peak Limiting:** Lookahead brickwall limiter set at `-1.0 dBFS` (`alimiter=limit=-1.0dB:attack=5:release=50:asc=1`).
4. **Trimming & Padding:** Sample-accurate trim at exactly `8.100s` (`atrim=0:8.100`).
