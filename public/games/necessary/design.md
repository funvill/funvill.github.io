# NECESSARY — Game Design Document

> Source idea: [Game Idea 3 - Necessary (Theme: Medical Procedures)](/game-idea-3-necessary-theme-medical-procedures)

## 1. Title & one-liner

**Working title:** **Necessary**

**Alternates:** *Grip*, *For Your Own Good*, *Sever*, *The Long Pull*

**One-sentence description:** A one-song rhythm game where you play a tired, powerful hand dragging a terrified inky mass down through a scrolling environment, ripping its clinging tendrils free on the beat.

**Genre:** Rhythm / vertical-scrolling drag-'em-down. Single-player, one round = one song.

**Elevator pitch:** You are the hand. An old, cracked, impossibly strong hand gripping a squirming blot of living ink that does *not* want to go where it's being taken. The ink shoots tendrils at everything it passes — pipes, roots, grates — and anchors itself. A heavy, doom-laden drum track drives the game: press SPACE on the beat and the hand *pulls*, snapping tendrils with wet cracks and lurching the mass another stretch down the screen. Steer the hand left and right to keep distance from big obstacles so the tendrils that reach them are thin and weak. Perfect timing rips everything loose; sloppy timing lets the thing re-anchor and the song keeps burning down. Reach the bottom of the map before the last bar of the song, or your strength gives out and the mass tears itself free. The game never says what the mass is or why this is happening — only the title insists: this is necessary.

⚑ (overridable) The source idea's "child being taken to the doctor" subtext is kept deliberately abstract, per the author's own design note. The prototype presents hand-vs-ink with zero narrative framing beyond the title and a single end-screen line (see §11).

## 2. Fun hypothesis

**The single question:** *Is timing pulls to a heavy beat, while steering to control tendril thickness, a satisfying tension between rhythm skill and spatial planning?*

Sub-hypothesis: does the "snap on a perfect beat" moment feel viscerally good enough to carry a whole song?

**Playtest questions (ask after each play):**

1. Did you feel the difference between a Perfect pull and a Good pull? In your hands or just in the numbers?
2. Did you ever move the hand left/right on purpose? Did you understand *why* you'd want to?
3. Was the song length (2.5 min) too long, too short, or right for one attempt?
4. When you lost, did you know what you'd do differently next run?
5. Describe the mass in one word. (Tests whether the tone — dread/desperation — lands without any story text.)

## 3. Design pillars

1. **The beat is the engine.** Every meaningful action happens on the beat. Nothing important happens off it. If a feature doesn't sync to the music, cut it.
2. **Pulls feel heavy.** Every pull has weight: screen lurch, tendril strain, a bass-heavy thud. Snapping a thick tendril on a Perfect must be the best moment in the game.
3. **Steering is strategy, rhythm is execution.** Left/right movement between beats is the planning layer; hitting the beat is the skill layer. Both must matter to win.
4. **Dread, not gore.** Ink, shadow, strain — never blood, never a face, never an explanation.

## 4. Core game loop

Session target: **one round = one song = 150 seconds** (config `songDurationSec`). A full session including splash and end screen: under 3.5 minutes.

The loop repeats every beat (~0.6 s at 100 BPM):

```
        ┌────────────────────────────────────────────────┐
        │                                                │
        ▼                                                │
  [1] ANTICIPATE ──▶ [2] PULL ──▶ [3] SNAP/HOLD ──▶ [4] LURCH ──▶ [5] STEER ──┘
   watch beat ring     press SPACE    tendrils take     map scrolls    move hand
   close on hand       in the window  damage; weak      down by pull   left/right to
                                      ones snap         distance       set up next
                                                                       attachments
```

- **[1] Anticipate** — *Does:* watches the beat ring contract toward the hand outline. *Sees:* ring closing, tendrils straining taut, upcoming obstacles scrolling into view above. *Feels:* building tension, the drum pattern telegraphing the hit.
- **[2] Pull** — *Does:* presses SPACE as the ring meets the hand. *Sees:* the hand clenches, arm tenses, the whole screen tugs downward 4–8 px. *Feels:* impact; a Perfect flashes the ring white and hits harder.
- **[3] Snap / Hold** — *Does:* nothing (resolution moment). *Sees:* tendrils below their strength threshold snap with an ink-splatter recoil and whip off-screen; surviving tendrils stretch thinner and quiver. *Feels:* payoff (snap) or gritted-teeth resistance (hold).
- **[4] Lurch** — *Does:* nothing. *Sees:* background scrolls down by the pull distance; the mass squashes in the fingers; free tendrils flail. *Feels:* progress, momentum.
- **[5] Steer** — *Does:* holds A/D (or ←/→) to slide the hand horizontally along the bottom band. *Sees:* the mass drags with the hand; new tendrils fire at obstacles entering reach — thin ones if far, thick ones if close. *Feels:* planning; threading a gap between two big obstacles.

Between beats, the mass constantly fights back: if zero tendrils are anchored it still drifts down slowly (`freeScrollSpeed`); anchored tendrils reduce drift to near zero, so pulls are the only real progress.

## 5. Inputs & controls

Touch is **viable** and specced: the game is one-button rhythm + one-axis steering, which maps cleanly to tap + drag. Desktop is the primary target.

| Action | Desktop | Touch | Notes |
|---|---|---|---|
| Pull (on beat) | `SPACE` | Tap anywhere in the top ⅔ of the screen | One pull registers per beat window; extra presses in the same window are ignored |
| Steer hand left/right | `A` / `←` and `D` / `→` (hold) | Touch-drag horizontally in the bottom ⅓ band | Hand moves at `handMoveSpeed` while held; drag maps hand x to finger x directly |
| Start game (from splash) | `SPACE` or click Play button | Tap Play button | First gesture also unlocks Web Audio |
| Pause / resume | `P` or `Esc` | Pause button (top-right, 44px hit area) | Pauses audio clock and sim together |
| Mute / unmute | `M` | Speaker button (top-right) | State persists in `localStorage` key `necessary.muted` |
| Restart round | `R` (also on end screen) | Restart button on pause & end screens | Immediate, no confirmation |
| Debug overlay | `` ` `` (backtick, only when `?debug=1`) | n/a | See §12 cheat keys |

No other inputs exist. Mouse position does nothing during play (⚑ overridable — mouse-x steering was considered and rejected to keep hands on keyboard near SPACE).

## 6. Game elements

### 6.1 The Hand (player avatar)
- **Looks (placeholder, M0–M1):** a 120×150 px dark-tan rounded rectangle with 4 finger rectangles curling over a black ellipse; a wrist rectangle extends off the bottom edge.
- **Looks (final, M2):** blocky cel-shaded hand, back-of-hand to camera, fingers down and curled around the mass — old, cracked, veined, hard shadows, thick outlines (see §9). The wrist visibly tenses on each pull (scale-y squash 0.92 for 90 ms).
- **Behaves:** locked to a horizontal band whose center is at 78% of screen height. Moves horizontally at `handMoveSpeed`, clamped 10% from each screen edge. On a pull input, plays clench animation and applies pull power (§7).
- **Config keys:** `handMoveSpeed`, `handBandY`, `handWidthPx`.
- **Interacts with:** the Mass (holds it — the mass's position is the hand's position offset up by 90 px), the beat ring (rendered around it).

### 6.2 The Mass (the dragged thing)
- **Looks (placeholder):** a black blob — 5 overlapping circles, radius 30–50 px, jittering ±2 px per frame.
- **Looks (final):** blown-ink blob with soft pseudopod noise on its silhouette (8-point polygon with per-vertex sine wobble), pure `#0B0B0D` with a single `#2A2A31` inner highlight. It visibly *cowers*: squashes away from the hand's fingers, and its wobble frequency doubles for 1 s after each snap (fear response).
- **Behaves:** follows the hand's x with a 0.25 s lag (lerp factor `massFollowLerp`). Fires tendrils automatically (§6.3). Never controlled by the player; it is an animated consequence of the sim.
- **Config keys:** `massRadius`, `massFollowLerp`, `maxTendrils`.
- **Interacts with:** obstacles (via tendrils), the hand (held by it), the finish line (win trigger).

### 6.3 Tendrils
The core mechanical object. Up to `maxTendrils` (default **3**) anchored at once.

- **Looks (placeholder):** a dark line from mass to obstacle, line-width = thickness class (2 / 5 / 9 px).
- **Looks (final):** quadratic curve with a sagging control point that straightens as strain rises; ink texture via 2–3 parallel offset strokes; snapped tendrils whip upward off-screen over 0.4 s and leave a 6-particle ink splatter at the anchor point.
- **Spawning rule (deterministic, no physics engine needed):** whenever an obstacle's anchor point is within `tendrilReachRadius` (default 320 px) of the mass and the mass has a free tendril slot, a tendril attaches to the nearest such obstacle. Thickness is fixed at attach time by distance:
  - **Thin** — distance > 240 px → strength `tendrilHpThin` (60)
  - **Medium** — 120–240 px → strength `tendrilHpMed` (140)
  - **Thick** — distance < 120 px → strength `tendrilHpThick` (260)
- **Behaves:** an anchored tendril contributes its *hold* to the anchor total (§7.2). Each pull deals damage equal to pull power to **every** anchored tendril simultaneously. At HP ≤ 0 it snaps: recoil adds `snapLurchPx` of instant scroll, plays snap SFX, frees the slot. A tendril whose anchor point scrolls below the hand band detaches harmlessly (the mass lost its grip angle) — this prevents dead anchors dragging behind.
- **Config keys:** `tendrilReachRadius`, `tendrilHpThin/Med/Thick`, `maxTendrils`, `snapLurchPx`.
- **Interacts with:** obstacles (anchor), pulls (take damage), scroll speed (hold).

### 6.4 Obstacles
Static level furniture the tendrils grab. Purely anchor points — the hand and mass never collide with them.

| Type | Placeholder | Final look | Anchor strength note | Spawn weight |
|---|---|---|---|---|
| Pipe stub | 60×24 gray rect at screen edge | Rusted wall pipe, cel-shaded | Normal | 45% |
| Floor grate | 90×90 dark rect, center-ish | Iron grate, ink pooled in slots | Normal | 30% |
| Root cluster | 130×80 brown rect | Gnarled roots breaking through tile | Forces Thick if mass passes within 120 px — the "steer around me" threat | 20% |
| Bolted ring | 40×40 circle | Heavy anchor ring | Rare, always Thick regardless of distance ⚑ (overridable) | 5% |

- **Behaves:** scrolls down with the map. Each obstacle has one anchor point (its center). Obstacles spawn from a seeded generator: one spawn roll every `obstacleSpacingPx` (default 220 px) of map, at a uniformly random x in the middle 80% of the width, rejected if within 140 px of the previous obstacle.
- **Config keys:** `obstacleSpacingPx`, `obstacleDensityRamp` (§8).
- **Interacts with:** tendrils only.

### 6.5 Beat Ring (the rhythm UI object)
- **Looks:** a circle centered on the hand that spawns at radius 220 px one full beat before each downbeat and contracts linearly to the hand outline (radius 90 px) exactly on the beat, then fades. Color `#D8CFC5` at 60% alpha; flashes white on Perfect, dull red `#B33A2B` on a fumbled (off-window) press.
- **Behaves:** pure rendering of the audio clock — the timing source of truth is `AudioContext.currentTime`, never `requestAnimationFrame` time.
- **Config keys:** `bpm`, `timingPerfectMs`, `timingGoodMs`.

### 6.6 Zones
- **Start zone:** first 300 px of map — no obstacles, free drift, lets the player feel the controls.
- **Finish line:** a horizontal pale seam across the map at `mapLengthPx`. When the *mass* crosses it, win triggers (§7.4).
- **The Clot (final stretch):** last 500 px before the finish contains a scripted cluster of 3 Root clusters in a staggered wall — the one authored moment, guaranteeing a climactic thick-tendril fight. ⚑ (overridable)

## 7. Rules, win & lose conditions

### 7.1 Timing judgment
Each beat has one pull window centered on the downbeat, judged by absolute error `e` against the audio clock:

| Judgment | Window | Pull power | Feedback |
|---|---|---|---|
| **Perfect** | `e ≤ timingPerfectMs` (70 ms) | `pullPowerPerfect` (100) | White ring flash, hard lurch, bass thump |
| **Good** | `e ≤ timingGoodMs` (140 ms) | `pullPowerGood` (55) | Gray flash, softer lurch |
| **Fumble** | press outside both windows | 0 — and the **next** beat's pull is locked out (hand slipped) | Red flash, dull slip sound, hand shudder |
| **No press** | no input this beat | 0, no penalty beyond lost progress | Mass visibly re-grips: anchored tendrils regain `tendrilRegenPerBeat` (10) HP, capped at max |

One press per window; the earliest press in a window counts.

### 7.2 Scroll & progress
- Progress = total map pixels scrolled. Map length = `mapLengthPx` (4200).
- **Free drift:** with zero anchored tendrils, scroll at `freeScrollSpeed` (120 px/s).
- **Anchored drift:** drift is multiplied by `(1 - hold)` where hold = Σ anchored holds (thin 0.25, medium 0.5, thick 0.9), capped at 0.97. Three thick tendrils ≈ full stop.
- **Pull lurch:** a pull instantly scrolls `pullLurchPx × (power / 100) × (1 - hold × 0.6)` — so even a held mass lurches a little, but snapping is what restores speed. `pullLurchPx` default 90.
- **Snap recoil:** each snap during a pull adds `snapLurchPx` (70) instantly. Multiple simultaneous snaps stack, capped at 200 px per beat.

### 7.3 Damage
A pull deals its power as damage to every anchored tendril simultaneously. Reference feel: a **thin tendril dies to 1 Perfect**; a **medium to 2 Perfects or 3 Goods**; a **thick to 3 Perfects** (260 HP vs 100/pull). Missed beats let tendrils regen 10 HP.

### 7.4 Win / lose
- **Win:** mass crosses the finish line before the song ends. The music resolves to a single sustained low note, the hand relaxes, the mass goes still. End screen (§11).
- **Lose:** song timer (`songDurationSec`, 150 s) reaches 0 first. The hand trembles, fingers open one by one over 1.5 s, the mass tears upward off-screen trailing all tendrils. End screen with distance reached.
- **Scoring (both outcomes):** `score = progressPx + accuracyPct × 10 + secondsRemaining × 20 (win only)`. Also shown: Perfect/Good/Fumble counts, tendrils snapped, best streak. High score persists in `localStorage` key `necessary.best`.

### 7.5 Edge cases (decided)
- **Song ends mid-beat-window:** the window is honored; a pull landed in it resolves fully (including snaps and lurch) before the win/lose check.
- **Win and song-end on the same frame:** win wins.
- **All 3 tendrils snap on one pull:** recoil cap (200 px) applies; the mass has a 1-beat "stunned" period where it cannot fire new tendrils — a reward window of free drift.
- **Pause:** suspends `AudioContext` and freezes the sim clock; on resume, a 1-beat count-in plays before input re-enables.
- **Tab loses focus:** auto-pause.
- **Player never presses anything:** anchored hold keeps drift near zero; the song runs out; lose screen still teaches via its stats line ("0 pulls").

## 8. Difficulty & progression

Single tuned difficulty, one song, no meta-progression. Challenge ramps **within** the round in three acts by obstacle density and mix:

| Act | Map range | `obstacleSpacingPx` effective | Mix change |
|---|---|---|---|
| I — Learn | 0–1400 px | 260 | No Root clusters; thin/medium tendrils only |
| II — Steer | 1400–2800 px | 220 | Root clusters enabled; paired obstacles forcing a chosen path |
| III — Fight | 2800–4200 px | 180 | Bolted rings enabled; ends in The Clot (§6.6) |

The ramp is expressed as `obstacleDensityRamp: [260, 220, 180]` in config. Tuning intent: a player hitting ~70% Good-or-better should win with 5–15 seconds to spare on their second or third attempt. First attempt is expected to lose around act III — losing must feel like "I know what to fix."

`?nofail=1` disables the lose condition for playtesting flow.

## 9. Style & theme

- **Visual style:** flat cel-shaded vector shapes, thick 3 px near-black outlines, hard-edged single-step shadows (no gradients except the vignette). Blown-ink irregularity on the mass and tendrils; everything else is rigid and geometric — the world is hard, the mass is liquid.
- **Palette (6 colors + black):**
  - `#0B0B0D` ink black (mass, tendrils, outlines)
  - `#8A6F5C` hand skin
  - `#4A3628` hand shadow / cracks
  - `#B8B0A3` environment mid (floor tiles, pipes)
  - `#6E675D` environment dark (grates, shadow)
  - `#D8CFC5` bone highlight (beat ring, finish line, UI text)
  - `#B33A2B` dried red — *used only for fumble feedback and the lose screen*. Scarcity keeps it alarming.
- **Background:** scrolling floor of large tiles in the two environment grays, 8% vignette darkening at edges, subtle downward-streaked grain.
- **Typography:** system stack `Georgia, 'Times New Roman', serif` for the title and end-screen lines (clinical-formal dread); `monospace` for HUD numbers. No webfonts (keeps build asset-free). ⚑ (overridable)
- **Tone/mood:** oppressive, resolute, wordless. The hand is never cruel — it is *tired*. The one line of text at the end (win): **"It was necessary."** (lose): **"Not this time."**
- **Reference points:** the blown-ink monsters of *Limbo* meets the one-song commitment of *Thumper*; the hand from Pixar's *Up*'s old-man styling rendered like *Ape Out*'s flat brutalism.
- **Placeholder art plan (M0–M1):** rectangles and circles in the final palette from day one — palette is free, art is not. Hand = rects, mass = jittering circle cluster, tendrils = lines, obstacles = labeled rects.

## 10. Sound design

All audio synthesized in code via **Web Audio API directly** (no Howler — we need sample-accurate scheduling, not asset playback). Zero audio files.

**Music:** generative doom-metal-adjacent loop, 100 BPM, 4/4, built from three synthesized voices scheduled one bar ahead on the audio clock:
1. **Kick** — sine drop 150→50 Hz, 120 ms, on beats 1-2-3-4 (the pull beats).
2. **Bass drone** — detuned saw pair, low E (41 Hz) filtered dark, sidechain-ducked 30% by each kick; shifts to a minor third above in act III.
3. **Snare/noise hit** — filtered white noise burst on beats 2 and 4, quiet, for groove.

No copyrighted material; the Tool references in the source idea inform *feel* (heavy, hypnotic, mid-tempo) only. Intensity ramps per act: act II adds the snare, act III raises drone cutoff and adds a second kick ghost note. On the final 8 bars, a rising noise swell signals the deadline.

**SFX event table:**

| Event | Sound (synthesized) | Priority |
|---|---|---|
| Perfect pull | Deep thud: 60 Hz sine burst + 40 ms noise transient, louder than the kick | P0 |
| Good pull | Same thud, −6 dB, no transient | P0 |
| Tendril snap | Wet crack: pitch-swept noise pop 800→200 Hz, 90 ms + low thump | P0 |
| Fumble | Dull slip: muted 200 Hz square blip, 60 ms | P0 |
| Win sting | All voices cut; single 41 Hz sine, 3 s decay | P0 |
| Lose sting | Drone detunes downward 200 cents over 1.5 s, then silence | P0 |
| Tendril attach | Faint stretch creak (filtered noise, 150 ms) | P1 |
| Mass whimper-wobble | Low formant wobble when 3 tendrils anchored | P1 |
| UI click | 2 ms tick | P1 |

**Rules:** mute toggle is P0 (`M`, persisted). `AudioContext` is created/resumed only on the first user gesture (Play click). Master gain at 0.7; SFX bus ducks music bus by 20% for 100 ms on P0 events.

## 11. UI & screens

**Flow:** `Splash → Play → (Pause ↔ Play) → End (win/lose) → Play (restart) or Splash`

### Splash screen (mandatory)
- Title **NECESSARY** in large serif caps, ink-black on bone; the mass idles behind the title, wobbling.
- One-liner: *"Drag it to the end of the song. It will fight you the whole way."*
- Rules (5 bullets, ≤20 s read):
  - Press **SPACE on the beat** to pull. The closer to the beat, the harder the pull.
  - The mass grabs everything it passes. **Pulls snap its tendrils.**
  - **Steer with A/D** — keep your distance and its tendrils attach thin and weak.
  - Off-beat presses **slip** and cost you the next beat.
  - **Reach the bottom of the map before the song ends.**
- Controls line, desktop + touch variants shown based on pointer capability detection.
- Version number bottom-right (e.g. `v0.1.0`), rendered from the single `VERSION` constant in `config.js` — same constant the debug overlay shows.
- One obvious **PLAY** button (also starts audio). `M` note for mute.

### HUD (during play)
- **Top edge:** song progress bar (thin, full-width, drains left-to-right) with a small notch showing projected-finish pace ⚑ (overridable).
- **Left edge:** vertical map progress bar with hand icon and finish tick.
- **Top-right:** pause and mute icons.
- **Center:** beat ring (§6.5). Judgment text ("PERFECT" / "GOOD" / "SLIP") pops 300 ms above the hand.
- **Streak counter** appears only at streak ≥ 4, small, above the mass.
- No score during play — score is an end-screen concern; the HUD stays sparse (pillar 4).

### Pause screen
Dimmed game, "PAUSED", resume / restart / mute buttons, controls reminder.

### End screen
- Win: hand relaxed, mass still; line *"It was necessary."*
- Lose: empty hand; line *"Not this time."* plus **"Made it 72% of the way."**
- Stats: score, Perfect/Good/Slip counts, accuracy %, snaps, best streak, previous best score.
- Buttons: **Play again** (`R`) and **Menu**.

## 12. Config & tuning

Single exported object in `src/config.js`. Every gameplay number in the doc lives here; nothing is hard-coded elsewhere.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | `"0.1.0"` | string | Splash + debug overlay version stamp |
| `bpm` | 100 | beats/min | Music tempo, beat windows, ring speed |
| `songDurationSec` | 150 | s | Round length / lose timer |
| `mapLengthPx` | 4200 | px | Distance to win |
| `timingPerfectMs` | 70 | ms | Perfect window half-width |
| `timingGoodMs` | 140 | ms | Good window half-width |
| `pullPowerPerfect` | 100 | dmg | Damage per Perfect pull |
| `pullPowerGood` | 55 | dmg | Damage per Good pull |
| `pullLurchPx` | 90 | px | Base scroll per pull |
| `snapLurchPx` | 70 | px | Bonus scroll per snap |
| `snapLurchCapPx` | 200 | px | Max snap scroll per beat |
| `freeScrollSpeed` | 120 | px/s | Drift with no anchors |
| `holdThin` / `holdMed` / `holdThick` | 0.25 / 0.5 / 0.9 | fraction | Drift reduction per tendril class |
| `tendrilHpThin` / `Med` / `Thick` | 60 / 140 / 260 | HP | Pulls to snap each class |
| `tendrilRegenPerBeat` | 10 | HP | Regen on skipped beats |
| `tendrilReachRadius` | 320 | px | Attach range |
| `tendrilThickDist` / `tendrilThinDist` | 120 / 240 | px | Distance→thickness thresholds |
| `maxTendrils` | 3 | count | Simultaneous anchors |
| `obstacleDensityRamp` | [260, 220, 180] | px spacing | Spawn spacing per act |
| `handMoveSpeed` | 260 | px/s | Steering speed |
| `handBandY` | 0.78 | screen frac | Hand vertical anchor |
| `massFollowLerp` | 0.25 | s | Mass lag behind hand |
| `stunBeats` | 1 | beats | No-attach window after triple snap |
| `masterGain` | 0.7 | 0–1 | Overall volume |

**URL flags:**
- `?seed=<int>` — seeds the obstacle generator (mulberry32). Default: `Date.now()`; the active seed is always shown on the end screen and debug overlay so any run can be reproduced.
- `?debug=1` — enables debug overlay (FPS, sim state, beat error in ms per press, progress px, tendril HPs, active seed) and cheat keys: `N` snap all tendrils, `W` warp +500 px, `T` +15 s song time, `F` toggle nofail.
- `?nofail=1` — song end doesn't lose; round runs to finish line regardless.
- `?bpm=<n>` and `?song=<sec>` — override tempo/length for feel-testing.
- `?act=2` / `?act=3` — start at that act's map position for testing late-game.

## 13. Tech stack

**Vanilla JavaScript (ES modules), Canvas 2D, Web Audio API, zero-build.** One `index.html` plus `src/*.js` modules — deployable by copying the folder to any static host; no bundler, no dependencies, no network calls. Canvas 2D is the right renderer: the scene is <50 draw calls (one hand, one blob, ≤3 tendril curves, ~8 visible obstacles, particles) so Pixi would be dead weight; SVG is wrong for per-frame organic wobble. No physics engine — tendril behavior is a distance/HP state machine, not simulated dynamics, so Matter.js would add nondeterminism where the design needs beat-exact determinism. Web Audio is used directly (not Howler) because the game's correctness depends on `AudioContext.currentTime` as the master clock for both music scheduling and input judgment; the sim's beat grid derives from it, and `requestAnimationFrame` handles rendering only. **Perf budget:** ≤60 live entities, ≤80 particles (pooled), one full-screen canvas at `devicePixelRatio` capped at 2 — comfortably 60 fps on a mid-range laptop.

## 14. Milestones

### M0 — Toy loop (rectangles + clicks)
**Goal:** prove pull-on-beat + snap feels good with zero art.
**Deliverables:** beat clock (metronome kick only), beat ring, SPACE judgment (Perfect/Good/Fumble), scrolling rect obstacles from seeded spawner, line tendrils with 3 HP classes, A/D steering, drift/hold/lurch math, progress bar, hard-coded 60 s map.
**Acceptance criteria:**
- [ ] A press within ±70 ms of the kick reliably registers Perfect (verified with `?debug=1` beat-error readout).
- [ ] A thin tendril snaps in 1 Perfect, a thick in 3 (unit-tested in headless sim).
- [ ] Steering wide of an obstacle observably produces a thinner tendril than steering into it.
- [ ] The developer can complete the 60 s map and *wants to immediately retry to do it cleaner*.
**Proves:** the fun hypothesis in its rawest form. **If M0 isn't fun, stop.**

### M1 — Real rules
**Goal:** full P0 ruleset in a complete round shell.
**Deliverables:** full 150 s song timer + 4200 px map with 3-act ramp and The Clot, win/lose + edge cases (§7.5), fumble lockout, regen on skipped beats, splash screen (rules, controls, version), HUD, pause/mute/restart, end screen with stats, `localStorage` best score.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds unprompted (splash + act I teach it).
- [ ] Win and lose are both reachable by a real player; loss shows distance %.
- [ ] Pause fully freezes audio and sim; resume count-in works; tab blur auto-pauses.
- [ ] Every input in §5's desktop column works exactly as specced; no undocumented inputs.
**Proves:** the round structure holds attention for a full song.

### M2 — Feel
**Goal:** make pulls heavy and snaps delicious.
**Deliverables:** full generative music (3 voices, act ramping, ending swell), all P0 SFX, final palette art pass (cel hand with clench squash, ink mass wobble + fear response, curved tendrils, obstacle sprites as flat vectors), screen lurch on pull, ink-splatter particles on snap, judgment popups, win/lose animations, vignette.
**Acceptance criteria:**
- [ ] A snap on a Perfect produces simultaneous audio thump + splatter + lurch within one frame of each other.
- [ ] 60 fps sustained on a mid-range laptop with all 3 tendrils and max particles (verified via debug FPS).
- [ ] Audio only starts after the Play gesture; mute persists across reloads.
- [ ] A playtester uses a dread-adjacent word for the mass (playtest question 5).
**Proves:** the aesthetic thesis — heavy, dreadful, wordless — lands.

### M3 — Playtest build
**Goal:** shippable, reproducible, tunable.
**Deliverables:** all URL flags (§12) working, seed display on end screen, touch controls (tap-to-pull, drag-to-steer) if time allows (P1), deployed to static host under `/games/necessary/`, config-only rebalance pass after 3 external playtests.
**Acceptance criteria:**
- [ ] `?seed=42` produces the identical obstacle layout on two machines.
- [ ] Deployed build runs from static hosting with zero console errors and zero network calls after load.
- [ ] Three external playtesters complete at least 2 runs each and answer §2's questions.
- [ ] A balance change (e.g. `tendrilHpThick` 260→220) requires editing only `config.js`.
**Proves:** the prototype can gather real answers.

**P0** = M0–M2 core: beat/pull/snap/steer, one song, win/lose, splash/HUD/end, P0 SFX + generative music, mute.
**P1** = touch controls, attach-creak & whimper SFX, pace notch on song bar, streak counter.
**P2** = multiple songs/maps, difficulty selects, mass "personality" behaviors (baiting fake anchors), narrative end-scene (the lollipop scene from the source idea), leaderboard-ish local stats page.

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is 100 BPM right? Too slow reads as boring, too fast breaks the "heavy" fantasy. Knobs: `?bpm=`, `bpm`.
2. **(non-blocking — resolve in playtest)** Should pulls be allowed on every beat or only beats 1 and 3 (half-time pulls, heavier feel)? Ship every-beat; test half-time by setting `bpm=50` via URL flag.
3. **(non-blocking — resolve in playtest)** Is the fumble lockout (losing the next beat) too punishing for first-timers? Knob: make lockout beats a config int `fumbleLockoutBeats` (default 1; 0 disables).
4. **(non-blocking — resolve in playtest)** Does tendril regen on skipped beats read as "it's fighting back" or as invisible unfairness? Knob: `tendrilRegenPerBeat` (0 disables).
5. **(non-blocking — resolve in playtest)** Is The Clot climactic or a difficulty spike? Knob: `?act=3` for rapid iteration on the final stretch.
6. **(blocking only for P2)** Whether to reintroduce the source idea's parent/child ending. Deliberately excluded from P0–P1 per the author's own design note; decide only if the prototype proves fun.

## 16. Handoff notes for Fable

**Build order:** `config.js` → headless sim (`sim.js`: beat grid, judgment, tendril/scroll math, spawner) → unit tests for sim → audio clock + metronome (`audio.js`) → input (`input.js`) → canvas renderer (`render.js`) → screens/HUD (`ui.js`) → full music + SFX → juice.

**Keep headless-testable:** `sim.js` must not touch DOM, canvas, or Web Audio. It exposes `createSim(config, seed)` and `tick(sim, dtMs, inputs) → events[]` where inputs are `{pullAtMs?, steerAxis}` and events are `['snap', 'perfect', 'win', ...]`. The audio clock feeds the sim its beat times; in tests, feed synthetic times. Assert in tests: judgment windows, HP math (thin=1 Perfect, thick=3), hold/drift formula, seed determinism (same seed → same obstacle list), edge cases §7.5.

**Timing rule (the one bug that kills rhythm games):** judge input timestamps against `AudioContext.currentTime` captured at keydown, not against frame time. Schedule music one bar ahead. Never use `setTimeout` for anything audible.

**File layout (repo == deployable output; this folder is served statically as-is):**
```
public/games/necessary/
  index.html        (canvas, screen divs, loads src/main.js as module)
  design.md         (this document)
  src/
    config.js       (CONFIG object + VERSION — the only tuning surface)
    main.js         (boot, screen state machine, RAF loop)
    sim.js          (pure headless game logic)
    audio.js        (clock, generative music, synthesized SFX)
    input.js        (keyboard + touch → normalized inputs)
    render.js       (canvas drawing, particles, camera lurch)
    ui.js           (splash/HUD/pause/end DOM)
  test/
    sim.test.js     (node-runnable, no browser needed)
```

**Reminders:** prove the loop with rectangles before any art effort — M0 uses the final palette on primitive shapes and nothing more. Ship every milestone runnable. If M0's pull-snap moment isn't compelling with a bare kick drum and gray rectangles, stop and report back rather than proceeding to art.
