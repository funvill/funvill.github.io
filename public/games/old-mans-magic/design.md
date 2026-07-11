# Leaklight — Game Design Document

> Source idea: [Game Idea 29 - The old man's magic (Theme: Elderly people with super powers)](/game-idea-29-the-old-mans-magic-theme-elderly-people-with-super-powers)

## 1. Title & one-liner

**Working title:** Leaklight

**Alternates:** The Old Man's Magic · Everything He Touched · The Last Custodian · A Thousand Years of Quiet · Bloom in His Wake

**One-liner:** A boss-rush where you cannot win — every time the last magician in the world defeats you, more of his magic leaks into you, until he finally, quietly, lets you end him.

**Genre:** 2D top-down action / boss-rush with light walking-sim interludes. Single-player, browser, keyboard+mouse (touch-viable).

**Elevator pitch:** The world is grey. Centuries ago one man absorbed every drop of magic on Earth to stop magical "accidents" like the one that killed his family — and now, a thousand years later, worn thin and half-mad, he causes one himself. You are the boy from that accident, carrying the one power he cannot take back: whatever leaks into you stays. You walk toward him across an ashen land, and you lose to him — six times. Each defeat leaks another power into you. Each stretch of road blooms behind you as the magic escapes through your footsteps. He isn't evil; he's tired. In the final encounter his attacks falter, his telegraphs stretch, and you realize the truth as you land the last blow: he is letting you win.

**Source-idea adaptation (per MODE NOTE):** The source is a story premise; I adapted it into a fixed-length boss-rush of six encounters where defeat — not victory — is the progression mechanic, because "you grow by losing and magic escapes through you" is the premise's one mechanically unique hook and a boss-rush is the smallest structure that lets a player feel it end-to-end in under 10 minutes. ⚑ (overridable)

## 2. Fun hypothesis

**The question this prototype answers:** *Is a boss fight you are supposed to lose — where each defeat is the reward and visibly re-colors the world — emotionally and mechanically satisfying, and does the final "he let me win" encounter land?*

Everything in P0 serves this: the encounter loop (survive as long as you can, get consumed, gain a power), the bloom trail (visible proof the world is healing because of you), and the finale (deliberately degraded boss patterns).

**Playtest questions (ask after a full run):**

1. After your first defeat, did you feel punished or rewarded? At what point (if ever) did losing start to feel like progress?
2. Did you notice the world blooming behind you, and did it change how you felt about walking sections?
3. In the final encounter, did you notice the old man fighting differently? What did you think was happening?
4. How did you feel about the old man by the end — enemy, victim, something else?
5. Did any encounter feel too long, too short, or unfair? Which power felt best to receive?

## 3. Design pillars

1. **Defeat is the reward.** The player never sees a "Game Over." Being consumed always advances the story and grants a power. Any feature that makes losing feel like failure gets cut or reworked.
2. **The world blooms in your wake.** Magic wants to escape, and you are the leak. Color returning to the grey world is the score, the feedback, and the emotional payoff — it must be visible every minute of play.
3. **The old man is not evil.** He is tired, sorry, and dangerous. His dialogue, his hesitation in the finale, and his fade-out must read as melancholy, not villainy. No evil laughs, no rage phases.
4. **Ten minutes, complete arc.** A full run — six encounters, five roads, one ending — finishes in 6–10 minutes. Nothing may bloat the run past that.

## 4. Core game loop

Session target: **6–10 minutes for a complete run** (5 road phases × ~30 s + 6 encounters × ~30–60 s + interstitials).

The run alternates two phases, six times, then ends:

```
            ┌────────────────────────────────────────────────┐
            │                                                │
            ▼                                                │
   ┌─────────────────┐      ┌──────────────────┐    ┌────────┴────────┐
   │   ROAD PHASE    │─────▶│  ENCOUNTER PHASE │───▶│  LEAK MOMENT    │
   │ walk east, touch│      │ survive the old  │    │ consumed → new  │
   │ dead things to  │      │ man's attacks;   │    │ power gained;   │
   │ bloom them;     │      │ he always catches│    │ he says one     │
   │ trail blooms    │      │ you eventually   │    │ line, walks off │
   └─────────────────┘      └────────┬─────────┘    └─────────────────┘
                                     │
                       encounter 6 only: his patterns
                       falter → you CAN hit him
                                     │
                                     ▼
                            ┌────────────────┐
                            │ ENDING SEQUENCE│
                            │ he thanks you, │
                            │ fades; world   │
                            │ floods with    │
                            │ color; results │
                            └────────────────┘
```

**Road phase (~30 s).** *Does:* walks east along a single-screen-tall scrolling strip, steers to touch grey objects (trees, wells, animals, statues). *Sees:* each touched object blooms into color; from power 2 onward the ground itself blooms under their feet. *Feels:* calm, restorative — the breath between fights.

**Encounter phase (30–60 s).** *Does:* dodges orbs, beams, and lunges in a fixed arena; from power 1 onward dashes; from power 4 onward shoots sparks to pop orbs and stagger him. *Sees:* attack density visibly ramp until escape is impossible. *Feels:* mounting pressure, then acceptance — "how long can I last?"

**Leak moment (~8 s).** *Does:* nothing (brief non-interactive beat, skippable with any key after 2 s). *Sees:* the consume animation reverses into light flowing INTO the player; a power card ("Leaked Power: Ember Step"); one line of the old man's dialogue. *Feels:* the defeat mattered.

**Finale (encounter 6, 60–90 s).** His telegraphs stretch, gaps open in his patterns, he pauses mid-attack. Landing `finaleHitsToWin` Echo Sparks ends it. *Feels:* dawning realization, then bittersweet victory.

## 5. Inputs & controls

Touch is **viable and supported at P1**: virtual joystick + two buttons. Desktop is P0.

| Action | Desktop | Touch (P1) | Notes |
|---|---|---|---|
| Move | WASD or Arrow keys | Left-side virtual joystick | 8-directional, analog on touch |
| Dash (Ember Step, power 1+) | Space or Shift | Right-side button A | Dashes in current move direction |
| Echo Spark (power 4+) | Left mouse click (aims at cursor) or `J` (aims at nearest hostile) | Right-side button B (auto-aims nearest hostile) | Both desktop options active simultaneously |
| Touch/bloom object (road) | Walk into it | Walk into it | No button; collision triggers bloom |
| Skip interstitial / advance dialogue | Any key or click | Tap | Only after 2 s minimum display |
| Pause | `Esc` or `P` | HUD pause icon (top-right) | Freezes sim; overlay with Resume/Restart/Mute |
| Mute toggle | `M` | HUD speaker icon (top-right) | Persisted to `localStorage` |
| Restart run | `R` on end screen or via pause menu | Buttons on same screens | Full run restart, reseeds unless `?seed=` fixed |
| Start game | Click "Begin the walk" / `Enter` | Tap button | Splash only; first gesture unlocks audio |

Debug-only (active with `?debug=1`): `1–6` jump to encounter N, `K` self-consume (end encounter now), `G` grant next power, `F` toggle FPS overlay detail.

## 6. Game elements

### 6.1 The Boy (player avatar)

- **Placeholder:** 20×20 px cyan square with a 2 px white outline. **Final (M2):** small hooded figure, 3-color flat vector, cyan scarf that gains one colored stripe per leaked power.
- **Behavior:** top-down movement at `playerSpeed` px/s, instant acceleration (no inertia). `playerMaxHp` hearts per encounter; hearts fully reset at each encounter start. On damage: 0.8 s invulnerability flash (`playerHurtIframes`), 120 px knockback from damage source.
- **Config keys:** `playerSpeed`, `playerMaxHp`, `playerHurtIframes`, `playerRadius`.
- **Interactions:** blooms road objects on contact; takes damage from orbs, beams, lunges; consumed by the old man at 0 HP.

### 6.2 The Old Man (the boss)

- **Placeholder:** 28×28 px pale-white square with a slow 2 px grey aura pulse. **Final (M2):** tall thin robed figure, off-white, faint drooping posture, soft white glow.
- **Behavior:** in encounters, drifts slowly toward the player at `oldManDriftSpeed` px/s (never faster than the player) while cycling attack patterns from his unlocked set (see §8). Attack cadence starts at `attackIntervalStart` seconds and multiplies by `attackRampFactor` every `attackRampPeriod` seconds — density ramps without cap, so the catch is inevitable (pillar 1: the fight is about *how long*, not *whether*). ⚑ (overridable — inevitability via ramp rather than scripted capture)
- **Consume:** when player HP reaches 0, all projectiles despawn, he glides to the player at 400 px/s and the leak moment plays.
- **Stagger:** an Echo Spark hit staggers him for `staggerDuration` s (cancels the attack currently telegraphing). In encounters 1–5 sparks deal no damage — they only stagger.
- **Finale state (encounter 6):** telegraph durations ×`finaleTelegraphMult`, attack interval ×`finaleIntervalMult`, and after every 2 attacks he stands still for `finaleOpeningDuration` s with his aura dimmed (the opening — sparks landed during any moment count, but openings make it easy). Every `finaleHitsToWin / 4`-th hit triggers a half-second slow-mo and a dialogue fragment.
- **Config keys:** `oldManDriftSpeed`, `attackIntervalStart`, `attackRampFactor`, `attackRampPeriod`, `staggerDuration`, `finaleTelegraphMult`, `finaleIntervalMult`, `finaleOpeningDuration`, `finaleHitsToWin`.

### 6.3 Seeker Orb (hazard, encounters 1+)

- **Placeholder:** 12 px grey-white circle. **Final:** softly glowing white orb with a short fading tail.
- **Behavior:** spawns at the old man, homes toward the player at `orbSpeed` px/s with turn rate `orbTurnRate` deg/s; despawns after `orbLifetime` s or on wall contact or when popped by a spark. Deals 1 heart on contact. Slowed to 70 % speed while over a bloom patch (`bloomSlowFactor`).
- **Config keys:** `orbSpeed`, `orbTurnRate`, `orbLifetime`, `bloomSlowFactor`, `orbRadius`.

### 6.4 Sweep Beam (hazard, encounters 2+)

- **Placeholder:** 8 px-wide translucent red line across the arena that turns solid white when active.
- **Behavior:** a full-arena line through the player's position at cast time; telegraphs for `beamTelegraph` s (harmless, flashing), then active for `beamActive` s dealing 1 heart. Ignores bloom patches.
- **Config keys:** `beamTelegraph`, `beamActive`, `beamWidth`.

### 6.5 Consume Lunge (hazard, encounters 3+)

- **Placeholder:** the old man's square flashes, then dashes.
- **Behavior:** telegraph `lungeTelegraph` s (he raises both arms / placeholder: outline turns red), then dashes at the player's position-at-telegraph-start at `lungeSpeed` px/s for up to `lungeRange` px. Contact within `lungeGrabRadius` px deals 2 hearts. Dash i-frames dodge it cleanly.
- **Config keys:** `lungeTelegraph`, `lungeSpeed`, `lungeRange`, `lungeGrabRadius`.

### 6.6 Orb Ring (hazard, encounters 4+)

- **Behavior:** `ringCount` non-homing orbs emitted radially from the old man at `ringOrbSpeed` px/s. Same contact damage, poppable, bloom-slowed.
- **Config keys:** `ringCount`, `ringOrbSpeed`.

### 6.7 Bloomables (road objects)

- **Placeholder:** grey 24×24 px squares (tree = tall rect 20×36, well = square, bird = 12×12 small square that hops away slowly, statue = 16×32). **Final:** 2-tone flat vector silhouettes.
- **Behavior:** static (bird drifts at 30 px/s away from player). On player contact: 0.3 s color-flood tween grey→full palette color, one-shot chime, +1 to bloom counter, small 40 px-radius permanent bloom patch under it. `bloomablesPerRoad` per road segment, hand-placed positions per segment (fixed layout, not random — roads are authored; see §12 seed note).
- **Config keys:** `bloomablesPerRoad`, `bloomableTouchRadius`.

### 6.8 Bloom patches (ground effect)

- **Placeholder:** filled circles in bloom-green at 40 % alpha, radius `bloomPatchRadius`. **Final:** soft-edged grass/flower stamps.
- **Behavior:** from power 2 onward, spawned under the player every `bloomTrailInterval` s while moving, on roads AND in arenas. Road patches are permanent (and persist visually when a road re-scrolls during the ending flyback). Arena patches fade after `bloomPatchLifetime` s. Effect: orbs over a patch move at `bloomSlowFactor` speed. Cap: `bloomPatchMax` live patches (oldest culled).
- **Config keys:** `bloomTrailInterval`, `bloomPatchRadius`, `bloomPatchLifetime`, `bloomPatchMax`, `bloomSlowFactor`.

### 6.9 Echo Spark (player projectile, power 4+)

- **Placeholder:** 8 px cyan circle with additive glow. 
- **Behavior:** fired toward cursor (or auto-aim nearest orb/old-man on `J`/touch) at `sparkSpeed` px/s, cooldown `sparkCooldown` s, lifetime 1.5 s. Pops one orb, or staggers the old man. In the finale, each old-man hit also increments the sever counter.
- **Config keys:** `sparkSpeed`, `sparkCooldown`, `sparkRadius`.

### 6.10 Zones

- **Road segment:** 2400×540 px strip, camera follows player, exit gate at the east end (grey stone arch; walking through starts the next encounter).
- **Arena:** fixed 960×540 px single screen, stone-circle border (walls are solid; orbs despawn on them, player and old man collide with them).

## 7. Rules, win & lose conditions

- **There is no lose condition for the run.** Being consumed in encounters 1–5 is the designed forward path. ⚑ (overridable — a purist may want a real fail state; the pillar says no)
- **Encounter end (1–5):** player HP reaches 0 → consume → leak moment → power granted → next road. Survival time for that encounter is recorded.
- **Encounter end (6):** landing `finaleHitsToWin` (8) Echo Sparks on the old man triggers the ending sequence. If the player's HP reaches 0 in the finale, Kindred Light (power 5) revives them at 1 heart once; if they reach 0 again, the encounter softly resets: fade to black 1 s, "He waits for you to stand." text, restart encounter 6 with hearts and revive restored, sever counter kept at half (rounded down). No run loss.
- **Scoring:** end screen shows (a) **Things bloomed** — total bloomables touched, out of the run's total; (b) **Time endured** — sum of the six encounter survival times; (c) **Roads walked in color** — % of road distance covered while bloom trail was active. No numeric "score"; these read as an epitaph, not a leaderboard. ⚑ (overridable)
- **Edge cases:**
  - Player HP hits 0 during their own dash i-frames: impossible — i-frames block the damage; damage is evaluated before HP.
  - HP hits 0 the same frame a spark would land (finale): consume/revive resolves first; the spark still counts if already spawned.
  - Sever counter reaches 8 during a telegraphed attack: attack cancels immediately, ending starts.
  - Kindred Light and a lunge (2 hearts) from 1 HP: revive triggers on the transition through 0; overkill damage is discarded.
  - Pausing freezes all timers including telegraphs and the attack ramp.
  - Player idles in a road segment: nothing forces them forward; roads are safe by design.
  - Bird bloomable reaches road edge: it stops and waits (never unreachable).

## 8. Difficulty & progression

Single tuned difficulty; challenge escalates across encounters by **adding attack types** and **starting the ramp hotter**, while the player escalates by **gaining powers**. Within any encounter, the ramp (§6.2) guarantees rising pressure.

| Encounter | Old man's attack set | Ramp start (`attackIntervalStart` override) | New leaked power granted after |
|---|---|---|---|
| 1 — The Refusal | Seeker Orb | 2.4 s | **P1 Ember Step** — dash: 140 px in 0.12 s, `dashCooldown` 1.2 s, i-frames 0.15 s |
| 2 — The Warning | + Sweep Beam | 2.2 s | **P2 Bloom Trail** — permanent leak: bloom patches under your feet (roads + arenas); patches slow orbs to 70 % |
| 3 — The Apology | + Consume Lunge | 2.0 s | **P3 Stone Skin** — a shield absorbing 1 hit, recharges after `shieldRecharge` 8 s without damage |
| 4 — The Doubt | + Orb Ring | 1.8 s | **P4 Echo Spark** — projectile: pops orbs, staggers the old man 0.5 s |
| 5 — The Mirror | all, orbs +20 % speed | 1.6 s | **P5 Kindred Light** — once per encounter, a killing blow leaves you at 1 heart with 1.5 s of light |
| 6 — The Gift | all, but faltering (finale state, §6.2) | 2.6 s | — (victory) |

(The boy's power 0 — *magic cannot be taken from him* — is passive and narrative: it is why leaks stick.)

Cross-run: none. No meta-progression, no unlocks. `?enc=N` exists for playtest jumping.

## 9. Style & theme

- **Visual style:** flat 2D vector shapes, no outlines except the player's, generous negative space. The world starts almost monochrome; bloom floods local color in. Rendered on Canvas with simple shapes — no sprite sheets needed even at M2.
- **Palette (hex):**
  - Ash world: background `#26262b`, ground `#3a3a3f`, dead objects `#6b6b70`, deep shadow `#1e1e22`
  - The old man: `#e8e4da` (worn white), aura `#bdb9ae`
  - The boy / player magic: `#59d4e8` (cyan), spark glow `#a5ecf7`
  - Bloom: leaf `#6fcf7c`, flower gold `#f2c14e`, flower rose `#e88fb0`
  - Danger/telegraph: `#d9594c`
  - UI text: `#e8e4da` on ash
- **Typography:** system serif stack (`Georgia, 'Times New Roman', serif`) for dialogue and titles — storybook weight; system sans for HUD numbers. No webfonts (keeps build asset-free).
- **Tone/mood:** hushed, elegiac, patient. Slow fades (0.6 s) between phases, never hard cuts. The old man's animations are slow even when his attacks are fast.
- **References:** *Titan Souls*' lonely boss arenas, the ash-to-color reveal of *Flower*, the tired-immortal melancholy of *The Giving Tree* read at a funeral.
- **Placeholder plan (M0–M1):** everything is rectangles/circles in the palette above; bloom = grey fill lerping to color. This alone must carry the feel test.

## 10. Sound design

All SFX synthesized at runtime via **Web Audio API** (jsfxr-style parameterized generators; no audio files). Audio context created/resumed only on the first user gesture (the splash "Begin" click). **Mute toggle is P0**, persisted in `localStorage` key `leaklight.muted`.

| Game event | Sound description | Priority |
|---|---|---|
| Bloom (object or patch milestone) | Soft two-note pentatonic chime, randomized among C-D-E-G-A, short decay | P0 |
| Player hurt | Dull low thud + brief noise burst, pitch −1 octave from chime scale | P0 |
| Consume / leak moment | 2 s low swell rising into a bright shimmering arpeggio (defeat becoming gift) | P0 |
| Dash | Short filtered noise whoosh, 120 ms | P0 |
| Beam telegraph | Thin rising sine whine during telegraph | P0 |
| Echo Spark fire / pop | Fire: soft pluck; pop: tiny glass tink | P0 |
| Old man stagger | Muted bell, slightly detuned | P1 |
| Finale sever hit | Deep single piano-like tone, one per hit, descending scale across the 8 hits | P1 |
| Ending fade | All music tones sustain and slowly high-pass into silence | P1 |
| UI click / pause | Quiet tick | P1 |

**Music:** generative, not tracked. Two-layer drone: (1) a slow sine pad chord (Am, root 110 Hz) at low gain, always on; (2) sparse random pentatonic plucks whose probability-per-second scales with the global bloom counter — the world literally gains music as it blooms. Encounters add a low pulsing sub note at 55 Hz. No copyrighted material anywhere.

## 11. UI & screens

**Flow:** Splash → Prologue card → [Road → Encounter → Leak card] ×5 → Road → Encounter 6 → Ending sequence → End screen → (restart → Splash).

- **Splash (mandatory):**
  - Title "LEAKLIGHT" + one-liner: *"You cannot beat him. Lose well."*
  - Rules in ≤5 bullets: "Walk east. Touch grey things — they bloom." / "The old man will find you. Survive as long as you can." / "He will win. That's how you grow." / "Every defeat leaks one of his powers into you." / "One day, he will falter."
  - Controls block: desktop keys and (if touch enabled) touch layout.
  - Version number `v0.x.y` bottom-right, sourced from the single `VERSION` constant.
  - One obvious "Begin the walk" button (also `Enter`). This click unlocks audio.
- **Prologue card:** 3 short lines over black ("The world used to be full of magic. / One man took it all, to keep everyone safe. / An accident gave a little of it back — to you."), advance on key/tap, 2 s minimum.
- **HUD (during play):** hearts top-left (encounters only); leaked-power icons bottom-left (grey slots filling in cyan, 6 slots incl. power 0); bloom counter top-right (flower glyph + count); shield pip and spark cooldown ring near the player character; pause and mute icons top-right corner; in the finale, the sever counter (8 dim motes that light per hit) replaces the bloom counter.
- **Leak card (interstitial):** power name + one-line effect + the old man's line for that encounter (§16 has all lines). Skippable after 2 s.
- **Ending sequence:** non-interactive ~20 s: he kneels, line "Thank you.", fades to motes; camera flies back west along every road walked, showing all bloom; color floods the whole palette.
- **End screen:** "The world you left behind" + the three epitaph stats (§7), `R`/button to restart, version number.
- **Pause overlay:** Resume / Restart run / Mute. Sim fully frozen.

## 12. Config & tuning

Single exported object `CONFIG` in `config.js`. All values below are the defaults.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | "0.1.0" | string | splash + debug overlay |
| `playerSpeed` | 220 | px/s | movement |
| `playerMaxHp` | 3 | hearts | encounter survivability |
| `playerHurtIframes` | 0.8 | s | post-hit invulnerability |
| `playerRadius` | 10 | px | collision |
| `dashDistance` | 140 | px | Ember Step |
| `dashDuration` | 0.12 | s | Ember Step |
| `dashCooldown` | 1.2 | s | Ember Step |
| `dashIframes` | 0.15 | s | Ember Step dodge window |
| `shieldRecharge` | 8 | s | Stone Skin |
| `reviveHearts` | 1 | hearts | Kindred Light |
| `reviveIframes` | 1.5 | s | Kindred Light |
| `sparkSpeed` | 420 | px/s | Echo Spark |
| `sparkCooldown` | 0.8 | s | Echo Spark |
| `sparkRadius` | 8 | px | Echo Spark collision |
| `staggerDuration` | 0.5 | s | old man interrupt |
| `oldManDriftSpeed` | 60 | px/s | boss pressure |
| `attackIntervalStart` | [2.4, 2.2, 2.0, 1.8, 1.6, 2.6] | s per encounter | base attack cadence |
| `attackRampFactor` | 0.85 | multiplier | cadence tightening |
| `attackRampPeriod` | 10 | s | how often ramp applies |
| `orbSpeed` | 120 | px/s | Seeker Orb |
| `orbSpeedE5Mult` | 1.2 | multiplier | encounter 5 orbs |
| `orbTurnRate` | 120 | deg/s | orb homing |
| `orbLifetime` | 8 | s | orb despawn |
| `orbRadius` | 6 | px | orb collision |
| `beamTelegraph` | 1.0 | s | Sweep Beam warning |
| `beamActive` | 0.4 | s | Sweep Beam danger window |
| `beamWidth` | 8 | px | Sweep Beam hitbox |
| `lungeTelegraph` | 0.8 | s | Consume Lunge warning |
| `lungeSpeed` | 520 | px/s | Consume Lunge |
| `lungeRange` | 420 | px | Consume Lunge |
| `lungeGrabRadius` | 40 | px | Consume Lunge hitbox |
| `ringCount` | 8 | orbs | Orb Ring |
| `ringOrbSpeed` | 180 | px/s | Orb Ring |
| `finaleTelegraphMult` | 1.8 | multiplier | encounter 6 telegraphs |
| `finaleIntervalMult` | 1.5 | multiplier | encounter 6 cadence |
| `finaleOpeningDuration` | 2.5 | s | encounter 6 openings |
| `finaleHitsToWin` | 8 | hits | ending trigger |
| `bloomablesPerRoad` | 6 | objects | road density (5 roads → 30 total) |
| `bloomableTouchRadius` | 22 | px | bloom trigger |
| `bloomTrailInterval` | 0.15 | s | trail patch spawn rate |
| `bloomPatchRadius` | 24 | px | patch size |
| `bloomPatchLifetime` | 10 | s | arena patch fade |
| `bloomPatchMax` | 400 | patches | perf cap |
| `bloomSlowFactor` | 0.7 | multiplier | orb speed on bloom |
| `roadLength` | 2400 | px | road segment length |
| `arenaWidth` / `arenaHeight` | 960 / 540 | px | arena size |
| `interstitialMinTime` | 2.0 | s | skip lockout |
| `particleCap` | 300 | particles | perf budget |

**URL flags:**

- `?seed=12345` — seeds the PRNG (mulberry32). Randomness covers attack pattern selection order, orb spawn jitter, chime notes, and pluck timing. Road layouts are authored/fixed, so a seed makes an entire run reproducible.
- `?debug=1` — overlay: FPS, current state, encounter #, ramp interval, entity counts; enables cheat keys (§5).
- `?enc=4` — start directly at encounter 4 with powers 1–3 granted (roads before it skipped).
- `?skip=1` — roads shrink to 600 px (quick bloom taste, fast runs).
- `?mute=1` — start muted.

## 13. Tech stack

**Vanilla JavaScript (ES modules) + Canvas 2D, zero-build.** One `index.html` plus `js/*.js` modules loaded with `<script type="module">`; deploy = copy the folder to any static host. Justification: the game is a few dozen simple shapes (well under 500 entities with `bloomPatchMax` + `particleCap`), which Canvas 2D renders at 60 fps on a mid-range laptop with room to spare — Pixi/WebGL would be dead weight, physics is trivial circle/line math so Matter.js buys nothing, and zero-build eliminates all toolchain friction for a prototype whose entire job is to test a feeling. Web Audio API directly (no Howler) because every sound is synthesized. Perf budget: ≤ 60 orbs live, ≤ 400 bloom patches (batched as a single offscreen-canvas layer that is only redrawn when a patch is added/expired), ≤ 300 particles; fixed-timestep sim at 60 Hz with render interpolation off (not needed at this speed).

## 14. Milestones

**M0 — Toy loop.** *Goal: prove "lose to grow" is fun with rectangles.*
Deliverables: player movement; encounters 1–3 with orb/beam/lunge; HP + consume → power card text → dash and shield actually granted; one 600 px road between encounters with 3 grey squares that turn green on touch; hardcoded config object; `?enc=` flag.
Acceptance criteria:
- [ ] A player can go from encounter 1 to encounter 3, losing each, in under 4 minutes.
- [ ] After being consumed, the granted power demonstrably works in the next encounter (dash dashes, shield absorbs).
- [ ] A first-time player understands "touch grey things" and "survive the old man" within 60 seconds unprompted.
- [ ] Sim runs headless (see §16) and a unit test asserts the ramp makes attack interval strictly decrease.
*Proves:* whether defeat-as-reward has a pulse. **If losing just feels bad here, stop.**

**M1 — Real rules.** *Goal: full P0 ruleset and complete arc.*
Deliverables: all 6 encounters incl. finale falter-state and sever counter; all 5 powers incl. Bloom Trail patches with orb slow and Kindred Light; 5 authored roads with 6 bloomables each; splash (rules, controls, version), prologue, leak cards with all dialogue lines, ending sequence (can be text-only fade), end screen with epitaph stats; pause, restart, `?seed=`, `?debug=1`.
Acceptance criteria:
- [ ] A complete run finishes in 6–10 minutes with no dead ends and no "Game Over" ever shown.
- [ ] Same `?seed=` produces the identical attack sequence twice.
- [ ] The finale is winnable by a mediocre player within 2 soft-resets.
- [ ] Every input in §5's desktop column works as documented.

**M2 — Feel.** *Goal: make the melancholy land.*
Deliverables: palette + flat-vector shape art pass; color-flood bloom tween; consume/leak animation (light flows into the boy); old man idle/falter poses; all P0 SFX + generative music layers; juice — 4 px screen shake on hurt, slow-mo on finale hits, bloom particles (≤ `particleCap`); ending flyback over bloomed roads.
Acceptance criteria:
- [ ] With sound on, the leak moment reads as a gift, not a death (ask a playtester cold).
- [ ] The world visibly gains color and music density over a run.
- [ ] 60 fps sustained in encounter 5 (worst case) on a mid-range laptop, verified via `?debug=1` FPS readout.
- [ ] Mute toggle works and persists across reloads.

**M3 — Playtest build.** *Goal: shippable test artifact.*
Deliverables: deploy to static host (this repo's `public/games/old-mans-magic/`); all URL flags final; touch controls (P1) if time allows; `?skip=1`; README-level playtest question list baked into the end screen's debug view.
Acceptance criteria:
- [ ] Game loads and runs from static hosting with zero network calls after page load.
- [ ] `?enc=6&seed=1&debug=1` reproduces an identical finale for A/B tuning.
- [ ] Two people have completed full runs and answered §2's questions.

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is the attack-ramp inevitability legible, or do players think they died because they played badly? Knobs: `attackRampFactor`, `attackRampPeriod`. If players feel cheated, add a visible "his patience" drain bar.
2. **(non-blocking — resolve in playtest)** Does encounter length (target 30–60 s) drag by encounter 5? Knobs: `attackIntervalStart` array.
3. **(non-blocking — resolve in playtest)** Is the finale's "he's letting you win" legible without being stated? Knobs: `finaleTelegraphMult`, `finaleOpeningDuration`; fallback is one extra dialogue fragment mid-finale.
4. **(non-blocking — resolve in playtest)** Do roads read as reward or filler? Knob: `?skip=1` road length vs full; compare playtester sentiment.
5. **(non-blocking)** Touch: is two-button (dash + spark) comfortable on phones, or should spark auto-fire? Ship P1 touch with auto-aim button first.

No blocking questions. All decisions required for P0 are made above.

## 16. Handoff notes for Fable

**Build order:** headless sim core (state machine: `road → encounter → leak → … → ending`; entities; fixed-timestep update) → input mapping → Canvas renderer → rules/powers → UI screens → audio. Prove encounters 1–3 with rectangles (M0) before touching art or sound.

**Keep headless-testable:** the entire sim (`js/sim/`) must run without DOM — pure functions over a state object, `update(state, input, dt)`. Unit-test at minimum: attack ramp monotonicity, damage/i-frame ordering (§7 edge cases), Kindred Light single-trigger, sever-counter finale end, bloom patch cap culling, seeded PRNG reproducibility.

**File layout (also the deployable output — zero-build, the source IS the dist):**

```
public/games/old-mans-magic/
  index.html          # splash markup + canvas + module entry
  design.md           # this document
  css/style.css       # UI overlay styles
  js/main.js          # boot, game loop, screen router
  js/config.js        # CONFIG object + VERSION (single source of truth)
  js/rng.js           # mulberry32 + ?seed= parsing
  js/sim/state.js     # run state machine, encounter/road definitions, road layouts
  js/sim/entities.js  # player, old man, orbs, beams, bloomables, patches
  js/sim/powers.js    # the 5 leaked powers' logic
  js/sim/update.js    # fixed-timestep update(state, input, dt) — DOM-free
  js/render.js        # Canvas 2D drawing, palette constants, bloom layer
  js/audio.js         # Web Audio synth SFX + generative music
  js/ui.js            # HUD, cards, splash, end screen, pause
  test/sim.test.js    # headless assertions (run with node)
```

**Dialogue lines (authored, use verbatim):** after E1: *"Go home. Please."* — E2: *"It always wants out. You cannot imagine the work of holding it."* — E3: *"I knew your family's road. I am sorry for it."* — E4: *"A thousand years. It has to have meant something."* — E5: *"You look like I did. Before."* — finale start: *"…I'm tired."* — finale end: *"Thank you."*

**Reminders:** rectangles before art; every milestone leaves the game runnable; the old man is never evil — if a change makes him menacing rather than mournful, revert it; no network calls, no build step, no server. Rebalance only through `config.js`.
