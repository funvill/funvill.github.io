# SCALE — Game Design Document

> Source idea: [Game Idea 31 - Scale (Theme: Science Fiction Horror)](/game-idea-31-scale-theme-science-fiction-horror)

## 1. Title & one-liner

**Working title: SCALE** ⚑ (overridable)

Alternates: *Deconstructionist*, *Knotweed Protocol*, *Mass Transfer*, *Hold the Line*, *Bridgefall*.

**One sentence:** A real-time triage sim where you run Earth's bridge-closure agency during an interdimensional mass-transfer crisis you already know you cannot win — the score is how long, and how well, you hold the line.

**Genre:** Real-time strategy / triage management sim (single-player, map-based, pausable).

**Adaptation choice (required statement):** The source is a story premise the author called "hard to turn into a game"; this doc adapts it into a **whack-a-mole triage strategy sim about managing an unwinnable queue** — detect bridges, prioritize which to close with limited drones and one field agent, and watch the planetary mass-imbalance meter climb toward inevitable catastrophe — because the premise's core feeling (bureaucratic dignity in the face of an unsolvable, knotweed-like problem) maps directly onto queue-triage mechanics. ⚑ (overridable)

**Elevator pitch:** Amateur physicists keep opening one-way bridges to the mirror Earth — dumping waste out, strip-mining resources in — and every open bridge bleeds planetary mass. You are the Deconstructionist: a war-room operator with a handful of drones, one pair of boots (yours), and a queue that only grows. Accessible bridges your drones can collapse. Hardened bridges need you personally. Inaccessible ones you can only log, stamp, and watch drain the planet forever. The mass-imbalance meter climbs, the orbit wobbles, the storms start, and at some point an organization called the Knot doubles the whole problem — then doubles it again. You will lose. The game is about losing *well*: every day held, every bridge closed, every file stamped is score. It is DEFCON's dread wearing Mini Metro's minimalism, with the melancholy paperwork soul of Papers, Please.

---

## 2. Fun hypothesis

**The single question:** *Is triaging a queue you can never clear — choosing which fires to fight while a doom meter visibly climbs — tense and satisfying rather than merely frustrating?*

Everything in P0 exists to test whether "dignified failure management" is compelling: the player must constantly make small, legible prioritization decisions (highest flow first? nearest first? save the agent for the big one?) under a rising tide, and the end screen must reframe the inevitable loss as a scored, honorable stand.

**Playtest questions (ask after each session):**

1. When the imbalance meter crossed a threshold and storms started, did you feel tension or just annoyance?
2. Did you ever deliberately *abandon* a bridge to prioritize another? Did that decision feel interesting?
3. When the game ended, did the summary screen make the loss feel earned/meaningful, or did it feel like the game cheated?
4. Did you immediately want to retry to beat your day count? (The core "one more run" signal.)
5. At any point did you feel there was nothing to do (idle) or too much to do to even think (overwhelmed noise)? When?

---

## 3. Design pillars

1. **You cannot win; you can only lose well.** No victory condition exists. Score and the end-of-run summary celebrate endurance and diligence. Any feature that lets the player "solve" the crisis is cut.
2. **Triage is the game.** Every moment offers more open bridges than closure capacity. Decisions are about *which*, never *whether*. If a mechanic doesn't force a prioritization choice, cut it.
3. **The meter is the monster.** The mass-imbalance meter is the antagonist: always visible, always climbing, and its threshold stages physically change the world (storms, slowdowns, alarms). Horror through arithmetic, not jump scares.
4. **Calm surface, rising dread.** Clean cartographic UI, quiet sounds, small numbers — the horror is that the numbers only go one way. No gore, no monsters, no clutter.

---

## 4. Core game loop

**Session length target:** one run = 5–8 minutes at 1× speed (typical death: day 40–60; 1 in-game day = `dayLengthSec` = 5 real seconds; 3× speed available).

### Loop phases (repeats every ~10–30 seconds)

1. **DETECT** — A new bridge ping appears on the map (or an undetected one is revealed). *Player sees:* pulsing ring, color-coded by type; imbalance-rate readout ticks up. *Player feels:* "another one…"
2. **ASSESS** — Player clicks the bridge; inspector shows type (accessible / hardened / inaccessible), flow rate (Mt/day), and distance. *Player does:* compares it against the current queue. *Player feels:* the triage calculus.
3. **ASSIGN** — Player dispatches the nearest idle drone (accessible), the field agent (hardened), or orders a log visit (inaccessible). *Player sees:* unit begins traveling; progress arc during work. *Player feels:* commitment — that unit is now unavailable.
4. **RESOLVE** — Bridge collapses (flow removed, +PC, +score) or gets logged (+PC, +score, flow continues forever). *Player feels:* small relief, immediately undercut by phase 1 repeating faster than before.
5. **ESCALATE** (background, continuous) — Imbalance integrates all open flows; crossing 250/500/750 Mt triggers world-state stages; day 45 the Knot doubles spawn rate (and again every 15 days). *Player feels:* the walls closing in.

```
        ┌──────────────────────────────────────────────┐
        │                                              │
        ▼                                              │
   [DETECT ping] → [ASSESS click] → [ASSIGN unit] → [RESOLVE]
        ▲                                              │
        │          [ESCALATE: imbalance ↑ ]◄───────────┘
        │           stages 250/500/750 Mt
        └── spawn rate grows daily; ×2 at day 45, 60, 75…
                        │
                        ▼
              [1000 Mt → GAME OVER → scored summary → retry]
```

---

## 5. Inputs & controls

Touch-viable: **yes** — the entire game is click/tap driven; buttons are ≥44 px. Touch is a P1 verification pass, not a P0 requirement.

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Left-click bridge | Tap bridge | Select bridge; open inspector panel |
| Left-click "Send Drone" button | Tap button | Dispatch nearest idle drone to selected accessible bridge |
| Left-click "Send Agent" button | Tap button | Dispatch field agent to selected hardened bridge |
| Left-click "Log Site" button | Tap button | Dispatch nearest idle drone to log selected inaccessible bridge |
| Left-click "Recall" button | Tap button | Cancel the assigned unit's job; unit goes idle in place |
| Double-click bridge | Double-tap bridge | Shortcut: auto-assign the correct unit type (drone/agent/log) if one is idle |
| Left-click "Buy Drone" (HUD) | Tap button | Purchase a new drone (spawns at HQ) if PC sufficient |
| Left-click empty map | Tap empty map | Deselect |
| `Space` | HUD ⏸ button | Pause / unpause (assignment allowed while paused) |
| `1` / `2` | HUD 1×/3× button | Set speed 1× / 3× |
| `M` | HUD 🔊 button | Mute / unmute audio |
| `R` | End-screen / HUD ↺ button | Restart run (in-game: requires a confirm click) |
| `Esc` | Tap empty map | Deselect / close panel |
| `D` (debug builds) | — | Toggle debug overlay (only when `?debug=1`) |

No other inputs exist. No drag, no scroll, no zoom (fixed map).

---

## 6. Game elements

All positions are on a fixed 960×540 logical map. Placeholder art is P0; "final" is the M2 pass.

### 6.1 The map (world)
- **Looks:** dark navy ocean (`#0B0E14`), 6 fixed landmass polygons in `#1C2733` with `#37C8D6` 1 px coastline, faint lat/long grid (`#22303F`). Landmass coordinates are a hard-coded array in `config.js`.
- **Behaves:** static backdrop. Bridges spawn 80% on land, 20% on ocean (`spawnOceanPct`).
- **Interacts:** click-on-empty deselects.

### 6.2 HQ
- **Looks:** placeholder white square 12×12 px at fixed position (largest landmass center); final: small ringed compound icon.
- **Behaves:** spawn point for purchased drones and the agent's start position. Not clickable, no other function.

### 6.3 Bridges (the core entity)
Spawned by the director (see §8). States: `hidden → detected → (assigned → working) → closed | logged`.

| Type | Spawn share | Flow (Mt/day, uniform) | Who can close | Work time | Placeholder look |
|---|---|---|---|---|---|
| **Accessible** | `pctAccessible` = 55% | 2–6 (`flowAccessMin/Max`) | Drone | `workAccessible` = 1.0 days | Cyan pulsing ring, 10 px |
| **Hardened** | `pctHardened` = 30% | 4–10 (`flowHardMin/Max`) | Agent only | `workHardened` = 2.0 days | Amber pulsing ring with square outline, 12 px |
| **Inaccessible** | `pctInaccess` = 15% | 2–5 (`flowInaccMin/Max`) | Nobody — log only | `workLog` = 0.25 days (visit) | Red pulsing ring with ×, 12 px |

- **Hidden state:** a bridge flows from the moment it spawns but is invisible until its detection delay (uniform `detectMin`=0.5 to `detectMax`=3.0 days) elapses. This makes the imbalance-rate readout climb "unexplained" — deliberate dread. On detection: ping animation + sonar SFX.
- **Working state:** assigned unit stands on it; circular progress arc fills over the work time. If interrupted (recall or storm), progress is kept (resumes where it left off). ⚑ (overridable — losing progress on interrupt is harsher; config `keepProgress` = true)
- **Closed:** collapse animation (ring shrinks to a dot, brief particle puff ≤12 particles), flow removed, +`pcPerClose` PC, +`scorePerClose` score. Entity removed after 1 s.
- **Logged (inaccessible only):** ring dims to 40% opacity with a small check glyph; **flow continues forever** — this is the unstoppable ratchet that guarantees eventual doom. +`pcPerLog` PC, +`scorePerLog` score. Unlogged inaccessible bridges give nothing; logging is the only "win" available against them.
- **One worker per bridge** (no stacking). A second assignment to the same bridge is rejected with a soft error blip.

### 6.4 Drones (player units)
- **Looks:** placeholder cyan triangle 8 px, rotates toward heading; idle drones orbit HQ or hold at last job site. Final: same triangle with thruster dot.
- **Behaves:** start with `dronesStart` = 3, hard cap `dronesMax` = 8. Move at `droneSpeed` = 400 px/day straight-line. Close accessible bridges; perform log visits. Ignore hardened bridges (button disabled with tooltip "Requires field agent").
- **Purchase:** "Buy Drone" costs `droneCostBase` = 80 PC, +`droneCostStep` = 20 PC per drone already bought (80, 100, 120 …). ⚑ (overridable escalating cost)
- **Interacts:** disabled (frozen in place, job paused) while inside an active storm zone.

### 6.5 The field agent ("you", the Deconstructionist)
- **Looks:** placeholder white diamond 10 px. Final: diamond with a small ID-badge glyph.
- **Behaves:** exactly one, cannot be bought or lost. Speed `agentSpeed` = 300 px/day. Only unit that closes hardened bridges; can also close accessible and log (but that's usually a waste — the UI shows a "consider a drone" hint if assigned to an accessible bridge).
- **Interacts:** storms slow the agent to 50% speed but do not freeze them (the human pushes through — small dignity touch).

### 6.6 Mass-imbalance meter (the antagonist)
- **Looks:** full-width horizontal bar at top of HUD, 0–1000 Mt, with tick marks at 250/500/750 and a numeric readout of current total and current rate ("+38.2 Mt/day"). Bar color: cyan → amber (≥250) → orange (≥500) → red (≥750), pulsing when ≥750.
- **Behaves:** integrates the summed flow of **all open bridges (hidden, detected, logged — everything not closed)** each tick. Never decreases in P0. Crossing thresholds triggers stages (§8). At `imbalanceMax` = 1000 Mt → game over.

### 6.7 Storms (hazard, stage-driven)
- **Looks:** placeholder semi-transparent gray-blue circle, radius `stormRadius` = 90 px, slow swirl rotation. Final: animated hatched disc.
- **Behaves:** spawn at random map positions at the stage-dependent rate (§8), live `stormDuration` = 1.5 days, then fade. Drones inside are frozen (job progress paused); agent is slowed 50%; bridges inside cannot be newly assigned until the storm passes.
- **Interacts:** the primary way escalation *physically* punishes the player rather than just numerically.

### 6.8 Political capital (PC, resource)
- **Looks:** HUD counter with ▲ income indicator.
- **Behaves:** income `pcPerDay` = 10 PC/day continuous, +`pcPerClose` = 5 per closure, +`pcPerLog` = 8 per log (bureaucracy rewards paperwork slightly more than heroics — deliberate theme). Spent only on drones in P0.

### 6.9 The Knot doubling event (scripted escalation)
- **Looks:** full-width banner interrupt (game auto-pauses): "DAY 45 — THE KNOT HAS OPENED A SECOND MIRROR. Bridge formation rate has doubled. The scale is infinite." One "Acknowledge" button.
- **Behaves:** at `knotFirstDay` = 45, global spawn rate ×2; repeats every `knotRepeatDays` = 15 days (day 60, 75, …) with escalating banner text ("A FOURTH MIRROR…"). This is the story's ending converted into an unbounded difficulty ratchet.

### 6.10 Mirror-self contact (P1, flavor + relief valve)
- Every `mirrorPeriodDays` = 12 days, 50% chance: banner from your counterpart on the other Earth offering a joint operation. Accept → the highest-flow currently-detected hardened bridge closes instantly (they hit it from their side) and all hidden bridges become detected. Decline → +10 PC ("you filed the contact report instead"). P1 because it tests whether small moments of grace deepen the mood.

### 6.11 Quick-fix ocean counter-bridges (P1, the tempting bad idea)
- At Stage 2 (≥500 Mt), NPC "well-intentioned groups" spawn ocean counter-bridges at 0.15/day: flow **−8 Mt/day** (they *reduce* imbalance — the only thing that does) but each active one adds +5% to global spawn rate (legitimizing bridge-making) and has a 10%/day chance of a surge event (+40 Mt instantly). Player can close them like accessible bridges. The dilemma: tolerate the quick fix or destroy the only relief. P1 because the P0 hypothesis doesn't need it.

---

## 7. Rules, win & lose conditions

- **Win condition: none.** By design (Pillar 1). The splash screen says so explicitly: "You will not win. Hold the line."
- **Lose condition:** imbalance ≥ `imbalanceMax` (1000 Mt) → immediate game over ("ORBITAL RESONANCE CASCADE"). This is the only game-over.
- **Scoring:** `score = daysSurvived × 10 + bridgesClosed × 25 + bridgesLogged × 10`. Displayed live in debug only; revealed with fanfare on the end screen (keeps play focused on the meter, not the score).
- **End-of-run screen shows:** days held, bridges closed, bridges logged, bridges still open at cascade, final score, best score this browser (`localStorage` key `scale.best`), a rank title, and one fixed closing line: *"The problem was never solvable. You held the line anyway."*
  - Rank titles by days survived: <25 "Clerk", 25–39 "Case Officer", 40–54 "Deconstructionist", 55–69 "Senior Deconstructionist", ≥70 "The One Who Stayed". ⚑ (overridable thresholds/names)
- **Edge cases (exact rulings):**
  - Unit en route to a bridge that gets closed/expired by other means (P1 mirror event): unit halts and goes idle at its current position.
  - Game over while units are mid-work: work is abandoned; end screen counts only completed closures/logs.
  - Two bridges spawn the same tick: both spawn; no cap per tick, but total live-bridge entity cap `maxLiveBridges` = 120 (oldest *hidden* bridges beyond the cap are auto-converted to logged-inaccessible silently — perf guard, thematically "lost paperwork").
  - Assignment while paused: allowed and encouraged (pause is the planning tool); units act on unpause.
  - Buy Drone at drone cap: button hidden.
  - Storm spawns on top of a working unit: drone freezes (progress held), agent continues at 50% speed.
  - Threshold crossed and Knot day on the same tick: banner queue — Knot banner first, stage toast second.
  - Restart (`R`) mid-run: confirm dialog ("Abandon post?"); on confirm, fresh run with a new seed unless `?seed=` is pinned.

---

## 8. Difficulty & progression

Single tuned difficulty; all knobs in §12. No meta-progression, no unlocks — the run is the unit of play.

**Spawn director:** bridges spawn as a Poisson process with rate `spawnBase` = 1.2/day at day 0, multiplied by `spawnGrowth` = 1.03 compounding per day, further ×2 per Knot event (day 45, 60, 75 …). Approximate rates: day 0 → 1.2/day, day 20 → 2.2/day, day 40 → 3.9/day, day 45 → ~9/day (post-Knot), day 60 → ~25/day. Death is certain; only the date varies.

**Capacity math (why the arc works):** a drone round-trip averages ~0.75 days travel + 1.0 day work ≈ 0.57 closures/drone/day; 3 starting drones ≈ 1.7/day vs. 0.66/day accessible spawns at day 0 — the player is *ahead* early (teaches the loop, builds false hope). The lone agent manages ~0.33 hardened closures/day vs. 0.36/day hardened spawns — the agent queue backs up from minute one (forces triage of highest-flow hardened bridges immediately). Inaccessible bridges accumulate at 0.18/day and never stop flowing (~3.5 Mt/day each), producing a quadratic imbalance floor that alone reaches 1000 Mt near day ~56 with otherwise perfect play. Expected outcomes: careless play dies day ~25–30; strong play dies day ~50–60; the Knot event at 45 ensures nobody coasts.

**Escalation stages (imbalance thresholds):**

| Stage | Threshold | Effects |
|---|---|---|
| 0 Calm | 0–249 Mt | None. Ambient hum only. |
| 1 Wobble | ≥250 Mt | Storms spawn at 0.3/day; toast + alarm chirp; map grid flickers occasionally. |
| 2 Fracture | ≥500 Mt | Storms 0.6/day; all unit travel ×0.85; screen edge amber vignette. (P1: quick-fix counter-bridges begin.) |
| 3 Cascade warning | ≥750 Mt | Storms 0.9/day; spawn rate additional ×1.25; red pulsing meter; low klaxon every 10 s. |
| End | ≥1000 Mt | Game over. |

---

## 9. Style & theme

- **Visual style:** flat, minimal, cartographic control-room. Thin 1 px lines, glowing rings, monospaced type, generous dark space. No textures, no gradients except the meter. Everything is code-drawn shapes — the game never needs an image asset.
- **Palette (exact):**
  - Background/ocean `#0B0E14`
  - Landmass fill `#1C2733`, grid/coast detail `#22303F`
  - Primary/accessible/drones cyan `#37C8D6`
  - Hardened/warnings amber `#F2A33C`
  - Inaccessible/critical red `#E5484D`
  - Text/agent white `#E8EDF2`
  - Success/confirm green `#46C078`
- **Typography:** system monospace stack (`ui-monospace, "Cascadia Mono", "SF Mono", Consolas, monospace`). All-caps for HUD labels, sentence case for banners. No webfonts (asset-free build).
- **Tone/mood:** quiet institutional dread. Copywriting voice is bureaucratic-elegiac: "Site 0447 logged. Flow uncontained." Never jokey, never gory.
- **References:** *DEFCON*'s war-room map dread × *Mini Metro*'s calm minimalism × *Papers, Please*'s bureaucratic melancholy.
- **Placeholder art plan (M0–M1):** colored rectangles/circles with the palette above and no animation polish. The palette and shapes ARE nearly the final art; M2 adds pulses, particles (≤12 per event, ≤150 live), vignette, and banner styling.

---

## 10. Sound design

All SFX synthesized at runtime via **Web Audio API** (oscillators + noise + envelopes, jsfxr-style helper) — zero audio asset files. Audio context created only after the first user gesture (the splash "BEGIN SHIFT" click). Mute toggle (`M` / HUD button) is P0 and persists in `localStorage` (`scale.muted`).

| Game event | Sound description | Priority |
|---|---|---|
| Bridge detected | Short sonar ping, pitch scales with flow rate (bigger = deeper) | P0 |
| Unit assigned | Soft UI blip (two-tone up) | P0 |
| Bridge closed | Muffled collapse thump + brief resolving chord | P0 |
| Bridge logged | Single typewriter/stamp clack | P0 |
| Stage threshold crossed | Rising alarm chirp ×3 | P0 |
| Game over | Long descending drone, 3 s, then silence | P0 |
| Invalid action | Dull error buzz | P1 |
| Knot banner | Deep sub-bass hit + static burst | P1 |
| Storm active nearby | Low filtered-noise rumble while any storm lives | P1 |
| Buy drone | Mechanical assembly click-click | P1 |

**Music:** none in P0. P1: a single generative two-note ambient pad (sine, LPF, 20 s cycle) whose tempo/detune subtly increases per stage. Never any copyrighted or external tracks.

---

## 11. UI & screens

**Flow:** `Splash → Game → Game Over → (restart) → Game`. Pause is an in-game overlay state, not a screen.

### Splash screen (mandatory)
- Title "SCALE" + one-liner: "Close what you can. Log what you can't. You will not win."
- Rules in 5 bullets (readable in 20 s):
  - Bridges to the mirror Earth keep opening. Every open bridge drains the planet's mass.
  - Click a bridge, then dispatch: **drones** close cyan (accessible) bridges; **you** (the agent) close amber (hardened) ones.
  - Red bridges can't be closed — **log** them for the record. They never stop draining.
  - If the meter hits **1000 Mt**, the orbit fails. Survive as many days as you can.
  - Earn Political Capital from closures and paperwork; spend it on more drones.
- Controls block: desktop (click, Space pause, 1/2 speed, M mute, R restart) and touch (tap; HUD buttons for the rest).
- Version number `v0.1.0` bottom-right, sourced from the single `VERSION` constant in `config.js` (splash, debug overlay, and end screen all read it).
- One obvious button: **BEGIN SHIFT** (also unlocks audio).

### Game screen (HUD always visible)
- **Top bar:** imbalance meter (0–1000 Mt, threshold ticks, numeric total + rate/day), day counter ("DAY 23"), speed/pause controls, mute.
- **Right panel (240 px):** inspector for the selected bridge (type, flow, distance, action buttons) or, when nothing is selected, a live queue list of detected-unhandled bridges sorted by flow (click a row to select — P1; P0 shows just counts: open / working / logged).
- **Bottom-left:** PC counter, drone roster (idle/busy dots), Buy Drone button with price.
- **Toasts:** bottom-center, 3 s, for stage changes and detections off-screen… (map is fixed-view, so toasts are for stage/PC events only).

### Pause overlay
- Dim map 40%, "PAUSED — assignments still accepted", resume button.

### Game-over screen
- "ORBITAL RESONANCE CASCADE — DAY {n}" headline; stats table (days, closed, logged, still-open, score, best); rank title; the fixed closing line (§7); **REPORT FOR ANOTHER SHIFT** (restart) button; version number.

---

## 12. Config & tuning

Single exported `CONFIG` object in `src/config.js`; every gameplay number in this doc references these keys. `VERSION = "0.1.0"` lives beside it.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `dayLengthSec` | 5 | real seconds | Length of one game day at 1× |
| `speedFast` | 3 | multiplier | Fast-forward speed |
| `mapW` / `mapH` | 960 / 540 | px | Logical map size |
| `imbalanceMax` | 1000 | Mt | Game-over threshold |
| `stageThresholds` | [250, 500, 750] | Mt | Escalation stages |
| `spawnBase` | 1.2 | bridges/day | Day-0 spawn rate |
| `spawnGrowth` | 1.03 | ×/day | Compounding spawn growth |
| `spawnOceanPct` | 0.20 | fraction | Bridges placed on ocean |
| `pctAccessible` / `pctHardened` / `pctInaccess` | 0.55 / 0.30 / 0.15 | fraction | Bridge type mix |
| `flowAccessMin/Max` | 2 / 6 | Mt/day | Accessible flow roll |
| `flowHardMin/Max` | 4 / 10 | Mt/day | Hardened flow roll |
| `flowInaccMin/Max` | 2 / 5 | Mt/day | Inaccessible flow roll |
| `detectMin` / `detectMax` | 0.5 / 3.0 | days | Hidden-to-detected delay |
| `workAccessible` | 1.0 | days | Drone closure work time |
| `workHardened` | 2.0 | days | Agent closure work time |
| `workLog` | 0.25 | days | Log visit time |
| `keepProgress` | true | bool | Interrupted work resumes |
| `dronesStart` / `dronesMax` | 3 / 8 | count | Fleet size |
| `droneSpeed` / `agentSpeed` | 400 / 300 | px/day | Travel speeds |
| `droneCostBase` / `droneCostStep` | 80 / 20 | PC | Drone pricing |
| `pcPerDay` / `pcPerClose` / `pcPerLog` | 10 / 5 / 8 | PC | Income |
| `scorePerDay` / `scorePerClose` / `scorePerLog` | 10 / 25 / 10 | points | Scoring |
| `stormRate` | [0, 0.3, 0.6, 0.9] | storms/day per stage | Hazard pressure |
| `stormRadius` / `stormDuration` | 90 / 1.5 | px / days | Storm size/life |
| `stage2TravelMult` | 0.85 | multiplier | Stage-2 slowdown |
| `stage3SpawnMult` | 1.25 | multiplier | Stage-3 extra spawns |
| `knotFirstDay` / `knotRepeatDays` | 45 / 15 | days | Doubling events |
| `maxLiveBridges` | 120 | count | Perf/entity cap |
| `mirrorPeriodDays` | 12 | days | (P1) Mirror-self events |
| `quickFixRate` / `quickFixFlow` | 0.15 / −8 | per day / Mt/day | (P1) Counter-bridges |

**URL flags:**
- `?seed=<string>` — seeds the PRNG (mulberry32 over a string hash); identical seeds reproduce identical spawn sequences. Current seed always shown on the end screen for sharing.
- `?debug=1` — debug overlay: FPS, day, current spawn rate, imbalance + rate, live entity counts, seed; cheat keys `G` +100 PC, `B` force-spawn bridge, `N` advance 1 day, `K` instantly close selected, `T` +100 Mt imbalance.
- `?day=<n>` — start at day *n* with imbalance pre-integrated at the perfect-play baseline (for testing late-game stages).
- `?fast=1` — start at 3× speed.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules), Canvas 2D, zero-build.** A single `index.html` loading `src/*.js` modules, deployed by copying the folder to any static host — no bundler, no dependencies, no network calls at runtime. Canvas 2D fits because the scene is dozens-to-~150 simple shapes (rings, triangles, arcs) redrawn per frame — trivial for one canvas, and far simpler than DOM/SVG diffing for pulsing/moving entities; HUD and panels are plain HTML/CSS overlaid on the canvas (crisp text for free). No physics engine (nothing collides), no Pixi (entity count doesn't justify it), Web Audio directly (no Howler — we synthesize, not play files). The simulation (`sim.js`) is a pure module with a `tick(state, dt)` function and zero DOM/Canvas imports, so it runs headless under Node for balance tests. **Perf budget:** ≤150 live bridges (capped), ≤9 units, ≤6 storms, ≤150 particles; full redraw at 60 fps is comfortably within a mid-range laptop's budget; `requestAnimationFrame` with a fixed sim timestep (30 ticks/s) and interpolated rendering.

---

## 14. Milestones

### M0 — Toy loop (prove the triage)
**Goal:** the triage loop playable end-to-end with rectangles; no art, sound, menus.
**Deliverables:** map canvas, bridge spawning/detection, click-select + assign drone/agent/log, travel + work timers, imbalance meter as a plain number + bar, game over at 1000 Mt, day counter, pause/speed keys, `CONFIG` object, headless `sim.js`.
**Acceptance criteria:**
- [ ] A run plays start to game-over with no console errors and no dead-ends.
- [ ] Player can always tell which bridges are unhandled and dispatch to them in ≤2 clicks.
- [ ] With zero player input, game over occurs between day 20 and day 30; with active play, ≥ day 40 is reachable.
- [ ] The agent's hardened-bridge queue visibly backs up by day 5 (forced triage is felt).
- [ ] `sim.js` runs under Node and a scripted "always-nearest" bot survives ≥35 days across 5 seeds.
**Proves:** whether choosing among too many fires is inherently engaging. *If M0 isn't fun, stop.*

### M1 — Real rules
**Goal:** full P0 ruleset and framing.
**Deliverables:** PC economy + Buy Drone, escalation stages + storms, Knot doubling banners, splash screen (rules, controls, version, BEGIN SHIFT), HUD per §11, game-over screen with score/rank/best (`localStorage`), restart, edge-case rulings from §7.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds unprompted (observed, n≥2).
- [ ] Every input in §5 works as documented; nothing undocumented does anything.
- [ ] Crossing 250/500/750 Mt visibly changes the world within 2 seconds (toast + storms + tint).
- [ ] Score, rank, and best-score persistence verified across a page reload.
- [ ] Version string on splash, end screen, and debug overlay all match the `VERSION` constant.

### M2 — Feel
**Goal:** the dread lands.
**Deliverables:** palette/line-work art pass per §9, pulsing rings, collapse particles (within budget), meter color states + stage vignette, all P0 SFX + mute persistence, banner styling, small tweens (ease on panel open, unit rotation).
**Acceptance criteria:**
- [ ] All 6 P0 sounds fire on their events; audio starts only after the splash click; mute persists.
- [ ] Sustained 60 fps with 120 live bridges + 6 storms + 8 units on a mid-range laptop (measured via `?debug=1` FPS).
- [ ] A playtester uses the word "tense", "dread", or equivalent unprompted (n≥1 of 3).

### M3 — Playtest build
**Goal:** shareable, reproducible, tunable.
**Deliverables:** `?seed`, `?debug=1` (+cheat keys), `?day=`, `?fast=1` all working; seed shown on end screen; deployed to static host (`/games/scale/`); P1 features *if time allows, in this order:* mirror-self event → queue list panel → quick-fix counter-bridges → P1 SFX/ambient pad → touch verification pass.
**Acceptance criteria:**
- [ ] Same `?seed` twice produces identical spawn sequence (verified by day-20 bridge count match).
- [ ] Game loads and runs from the static host URL with zero network requests after page load (verified in devtools).
- [ ] Three playtest sessions logged with answers to §2's questions.

---

## 15. Open questions

1. **Is one-worker-per-bridge too rigid?** (non-blocking — resolve in playtest; if stacking feels needed, add `allowStacking` config permitting 2 workers at 1.75× combined speed.)
2. **Does the always-climbing meter read as hopeless too early, killing motivation before day 20?** (non-blocking — knobs: `spawnBase`, `flowInaccMin/Max`, `imbalanceMax`; watch playtest question 3.)
3. **Is logging inaccessible bridges emotionally meaningful or just a chore tax?** (non-blocking — knobs: `pcPerLog`, `scorePerLog`; if flat, P1 idea: unlogged bridges also add +2% spawn rate as "unregulated precedent".)
4. **Do the Knot doubling dates (45/15) land after most deaths and thus go unseen?** (non-blocking — knobs: `knotFirstDay`, `knotRepeatDays`; check what fraction of playtest runs reach day 45.)
5. **Does pause-and-plan trivialize tension for methodical players?** (non-blocking — if so, test a `pauseBudget` config limiting pauses per day; default unlimited.)
6. None blocking. Build.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → `sim.js` (headless: spawn director, bridges, units, travel/work, imbalance integration, stages, Knot events, scoring) → Node smoke test with the always-nearest bot → `render.js` (canvas draw of sim state) → `input.js` (selection, assignment, keys) → `ui.js` (HUD, splash, end screen, banners) → `audio.js` (synth SFX) → juice pass.

**Keep headless-testable:** `sim.js` must import nothing from DOM/Canvas/Audio. Public surface: `createState(config, seed)`, `tick(state, dtDays)`, `dispatch(state, action)` (actions: `assignDrone`, `assignAgent`, `log`, `recall`, `buyDrone`), and pure selectors (`imbalanceRate(state)`, `idleDrones(state)`). Unit-test the math: spawn rate at day N, imbalance integration, capacity arithmetic from §8, threshold triggers, Knot doubling.

**Repo/file layout (also the deployable output — zero-build, copy as-is):**

```
public/games/scale/
  index.html        (splash + game DOM shell, loads main.js as module)
  design.md         (this document)
  src/
    config.js       (CONFIG + VERSION — the ONLY place numbers live)
    rng.js          (mulberry32 + string-hash seeding)
    sim.js          (pure simulation, no DOM)
    render.js       (canvas drawing)
    input.js        (mouse/touch/keyboard → dispatch)
    ui.js           (HUD, screens, banners, localStorage)
    audio.js        (Web Audio synth SFX, mute)
    main.js         (RAF loop, fixed timestep, URL flags, wiring)
  test/
    sim.test.mjs    (Node headless tests + bot survival harness)
```

**Reminders:**
- Prove the loop with rectangles before any art effort. M0's bot test is the cheapest fun-check you have — if watching the bot lose isn't at least *interesting*, the human version won't be either.
- Ship every milestone runnable; never leave the build broken at a stopping point.
- Every tunable number goes through `CONFIG` — if you type a magic number in `sim.js`, move it.
- No network calls, no asset files, no fonts — everything is code.
- The game must say, on the splash, that it cannot be won. That sentence is the design.
