# Crumb Cup — Game Design Document

> Source idea: [Game Idea 12 - Tiny machines (Theme: Small, Micro, Minuscule, Teeny, Tiny, Itty-bitty, Infinitesimal)](/game-idea-12-tiny-machines-theme-small)

---

## 1. Title & one-liner

**Working title:** Crumb Cup ⚑ (overridable)

**Alternates:** Breakfast GP, Table Top Turbo, Itty Bitty GP, Milk Run

**One-liner:** A top-down arcade racer where toy-sized cars race a homemade track across an oversized breakfast table, dodging sugar cubes and skidding through spilled milk.

**Genre:** Top-down 2D arcade racing (SNES Micro Machines lineage), single-player vs simple AI.

**Elevator pitch:** You are a thumb-sized race car on a breakfast table the size of a stadium. The track is a kid's imagination made real: placemat straightaways, a hairpin around the cereal bowl, a slalom through sugar cubes, a slick of spilled milk before the finish line. Three AI toy cars want the Crumb Cup as badly as you do. Races are two minutes, controls are four keys, and falling off the table edge is always one bad corner away. The prototype exists to answer one thing: does driving a tiny machine through a giant, familiar, slightly hostile household world still feel as good as it did in 1991?

⚑ (overridable) **Adaptation decision:** The source idea proposes a Three.js 3D remake built on Bruno Simon's folio-2025. For the first prototype I have deliberately chosen a **top-down 2D Canvas racer** instead. The fun hypothesis (tiny vehicle + oversized environment + tight racing) is testable entirely in 2D at a fraction of the implementation cost — no camera work, no 3D physics tuning, no asset pipeline. If the 2D loop is fun, the 3D/Three.js version becomes a justified follow-up project; if it is not fun, 3D would not have saved it. The level editor and Blender-model loading from the source idea are explicitly out of scope for this prototype (post-P2).

---

## 2. Fun hypothesis

**The question:** *Is racing a tiny vehicle through an oversized household environment — where breakfast items are the track features and hazards — fun with simple arcade handling and 1–3 AI opponents?*

Everything in P0 serves this. Specifically P0 must prove two sub-claims:

1. The **handling** (accelerate/steer/drift on varying surfaces) is satisfying on its own — driving an empty lap feels good.
2. The **theme creates the challenge**: milk slicks, sticky juice, sugar-cube chicanes, and the table edge produce more interesting racing than an abstract track would.

**Playtest questions (ask after 2–3 races):**

1. Did you immediately understand that you were tiny and the world was a breakfast table? What told you?
2. Which track feature was the most fun to drive through? Which was the most annoying?
3. Did you ever feel the car did something you didn't ask for? Where?
4. Did you want to immediately race again after finishing? Why or why not?
5. Was beating (or losing to) the AI cars satisfying, or would you rather chase a lap time?

---

## 3. Design pillars

1. **Tiny car, giant world.** Everything on screen must sell the scale: the car is small relative to a spoon, a sugar cube is a boulder, the table edge is a cliff. Any feature that doesn't reinforce scale is cut.
2. **Pick-up-and-drive handling.** Four keys, zero tutorial. A first-time player completes a lap on their first attempt. Depth comes from surfaces and racing lines, not from control complexity.
3. **The breakfast IS the track.** Hazards and surfaces are readable household objects with intuitive behavior — milk is slippery, juice is sticky, cubes are walls, the edge is death. No abstract power-ups, no weapons.
4. **Two-minute races, instant restart.** From death or finish to racing again in under 3 seconds. The prototype's replay loop is its retention mechanic.

---

## 4. Core game loop

**Session length target:** one full race = 90–150 seconds (3 laps × ~30–45 s). A play session of 3–5 races ≈ 8 minutes.

### Phases

**1. GRID (countdown, 3 s)**
- *Does:* nothing (inputs locked except mute/pause).
- *Sees:* all 4 cars on the start grid, big "3… 2… 1… GO!" countdown centered on screen, camera already in race position.
- *Feels:* anticipation; a beat to read the first corner.

**2. RACE (the loop core, ~30–45 s per lap × 3)**
- *Does:* holds accelerate almost constantly, steers, brakes for the milk slick and the bowl hairpin, threads the sugar-cube chicane, avoids the table edge.
- *Sees:* smooth-following camera, own car center-ish of screen, opponents ahead/behind, HUD (lap, position, race timer, current-lap timer).
- *Feels:* flow when the line is clean; spike of tension near the edge; comedy when a car skates sideways across milk.

**3. INCIDENT (interrupt, 1.2 s, happens 0–N times per race)**
- Triggered by driving off the table edge.
- *Does:* nothing (control removed).
- *Sees:* car shrinks/falls with a spin, then reappears at the last checkpoint facing track direction, stationary.
- *Feels:* fair punishment — lost ~3 s and probably a position, own fault, immediately recoverable.

**4. FINISH (end of lap 3)**
- *Does:* crosses the line; control fades out over 1 s.
- *Sees:* "FINISHED — 2nd!" banner, then the results screen.
- *Feels:* resolution; a specific reason to restart ("I lost it in the milk on lap 3").

**5. RESULTS → restart**
- *Does:* reads placement, race time, best lap; presses R / clicks "Race again".
- *Sees:* final standings table, personal best lap (localStorage), restart + menu buttons.
- *Feels:* "one more go."

### Loop diagram

```
        ┌────────────────────────────────────────────┐
        ▼                                            │
  [SPLASH] ─Play─> [GRID 3s] ──> [RACE lap 1..3] ──> [FINISH] ─> [RESULTS]
                                   │        ▲                        │
                                   ▼        │                        │
                              [INCIDENT: fell off table]        R / click
                                   │        │                        │
                                   └─respawn┘                        │
        ▲                                                            │
        └───────────────────────── "Menu" ◄──────────────────────────┘
```

---

## 5. Inputs & controls

Touch is **viable and planned as P1** (the game is hold-to-accelerate + steer, which maps cleanly to three on-screen zones). Desktop keyboard is P0.

### Desktop (P0)

| Input | Action |
|---|---|
| `↑` or `W` | Accelerate |
| `↓` or `S` | Brake; reverse when stopped |
| `←` or `A` | Steer left |
| `→` or `D` | Steer right |
| `R` | Instant restart race (works during race and on results screen) |
| `M` | Toggle mute |
| `P` or `Esc` | Pause / unpause (freezes sim, shows overlay with resume/restart/menu) |
| `Enter` or `Space` | Confirm: start race from splash, restart from results |
| Mouse click | All buttons (Play, Race again, Menu, mute icon, pause icon) |

### Touch (P1)

| Input | Action |
|---|---|
| Hold left third of screen | Steer left |
| Hold right third of screen | Steer right |
| (auto-accelerate always on in touch mode) | Accelerate |
| Hold left+right thirds simultaneously | Brake |
| Tap HUD pause icon | Pause |
| Tap HUD mute icon | Toggle mute |
| Tap buttons | Menu navigation |

⚑ (overridable) Touch mode uses **auto-accelerate** (config `TOUCH_AUTO_ACCEL: true`) because two-zone steering plus a separate gas button is fiddly on phones; auto-gas preserves the "hold and steer" flow.

No other inputs exist. Gamepad is P2.

---

## 6. Game elements

World coordinates: 1 unit ≈ 1 "table millimeter". World is `WORLD_W × WORLD_H` = 3200 × 2000. The car is 44 × 26 units. Camera renders at `CAMERA_ZOOM` = 0.5, so the car is ~22 × 13 px on a 960 × 600 canvas — appropriately tiny.

### 6.1 Player car
- **Placeholder (M0):** red rectangle 44 × 26 with a small white rectangle nose marker.
- **Final (M2):** flat-vector top-down toy car: rounded body, black outline (2 px), white roof stripe, dark wheel stubs. Drawn in code with Canvas paths — no image assets.
- **Behavior:** arcade kinematic model (see §7.1). Config keys: `CAR_ACCEL`, `CAR_MAX_SPEED`, `CAR_BRAKE_DECEL`, `CAR_REVERSE_MAX`, `CAR_TURN_RATE`, `CAR_COAST_DECEL`, `CAR_GRIP`.
- **Interactions:** affected by surfaces (§6.4), collides with obstacles (§6.5) and other cars (§6.6), falls at table edge (§6.7), progresses via checkpoints (§6.8).

### 6.2 AI cars (×3, config `AI_COUNT`)
- **Placeholder:** blue, yellow, green rectangles, same size as player.
- **Final:** same vector car in their color.
- **Behavior:** waypoint followers. Each AI steers toward a lookahead point `AI_LOOKAHEAD` waypoints ahead on the racing line, throttles to full unless the angle-to-target exceeds `AI_BRAKE_ANGLE` (then brakes to `AI_CORNER_SPEED_FACTOR × CAR_MAX_SPEED`). Each AI has a fixed skill multiplier from `AI_SPEED_MULTS` applied to its max speed, plus per-frame steering noise `AI_STEER_NOISE` so lines vary. AI cars are subject to the exact same physics, surfaces, collisions, and edge-falls as the player — no cheating, no rubber-banding in P0. ⚑ (overridable — rubber-banding is a P1 config toggle `AI_RUBBERBAND`, default off).
- **Interactions:** identical to player. If an AI falls off the table it respawns identically.

### 6.3 Track (breakfast-table circuit "Placemat Prix")
- One track in P0. Defined as an ordered array of ~24 waypoints forming a closed loop, with track ribbon width `TRACK_WIDTH` = 220. Layout (clockwise): start/finish straight along a placemat → sweeping right around the plate → sugar-cube chicane → hard left hairpin around the cereal bowl → back straight past the juice spill → milk slick just before the final corner → finish.
- **Placeholder:** grey ribbon polyline on a beige background; waypoints visible in debug.
- **Final:** the ribbon is a "masking-tape track" (light tan, slightly translucent, hand-placed look) over a red-and-white gingham tablecloth. Table objects (plate, bowl, spoon, mug) drawn as large flat-vector shapes that sell scale.
- **Behavior:** the ribbon is the fast surface. Everything off-ribbon but on-table is tablecloth (slow). The waypoint list doubles as the AI racing line and the checkpoint/progress system.

### 6.4 Surfaces (zones)
Each surface is a set of shapes (circles/rects/polygons) checked by point-in-shape against each car's center. Priority order: hazard zones > track ribbon > tablecloth.

| Surface | Looks like | speedMult | gripMult | Config keys |
|---|---|---|---|---|
| Track ribbon | Tan tape path | 1.0 | 1.0 | `SURF_TRACK_SPEED`, `SURF_TRACK_GRIP` |
| Tablecloth (off-track) | Gingham | 0.55 | 0.9 | `SURF_CLOTH_SPEED`, `SURF_CLOTH_GRIP` |
| Milk slick (1 in P0) | White glossy puddle blob, ~350 × 220 | 1.0 | 0.25 | `SURF_MILK_SPEED`, `SURF_MILK_GRIP` |
| Juice spill (1 in P0) | Orange puddle blob, ~300 × 200 | 0.4 | 1.4 | `SURF_JUICE_SPEED`, `SURF_JUICE_GRIP` |

`speedMult` scales effective max speed and acceleration while on the surface. `gripMult` scales lateral-velocity damping — low grip = the car keeps sliding in its old direction (drift/skate), high grip = sticky and sluggish-feeling but controllable.

### 6.5 Obstacles
- **Sugar cubes (×6, chicane section).** Static. Placeholder: white 60 × 60 squares. Final: white cube with bevel highlight, subtle drop shadow. Collision: circle-vs-circle approximate; car bounces off with restitution `OBSTACLE_RESTITUTION` = 0.5 and loses speed. Config: `SUGAR_CUBE_SIZE`, `SUGAR_CUBE_COUNT`.
- **Cereal flakes (P1, ×12 scattered near bowl).** Light dynamic debris: when hit, the flake is knocked away (simple impulse, despawns off-table) and the car loses `FLAKE_SLOW_FACTOR` = 10% of current speed. Pure flavor + minor hazard. P1 because P0 doesn't need dynamic bodies.
- **Spoon (P1).** A long static obstacle forming an inside-wall of the hairpin. Decorative-plus-collidable rectangle.

### 6.6 Car-vs-car contact
P0 uses simple circle collision (radius `CAR_COLLIDE_RADIUS` = 20): cars push apart along the contact normal, exchanging a fraction of relative velocity (`CAR_BUMP_TRANSFER` = 0.5). No damage, no spin-outs from contact. Bumping is allowed and mildly useful but not a weapon.

### 6.7 Table edge (hazard zone)
- The table surface is an inset rectangle: margin `EDGE_MARGIN` = 60 units inside the world bounds. Final art: visible wood-grain border strip beyond the tablecloth, then darkness.
- A car whose center crosses the edge **falls**: control removed, sprite scales down to 0 over 0.6 s with a 720° spin, `RESPAWN_DELAY` = 1.2 s total, then the car reappears stationary at its **last passed checkpoint**, oriented along the racing line. Progress (lap/checkpoint) is preserved.
- This is the only "death" in the game.

### 6.8 Checkpoints & progress (invisible)
- Every waypoint on the racing line is a checkpoint with capture radius `CHECKPOINT_RADIUS` = 200. Cars must pass them **in order** (tracked per-car as `nextCheckpointIndex`); the start/finish line only counts a lap when all checkpoints of the current lap have been passed. This prevents cut-the-tablecloth shortcuts and makes race **position** computable at any instant as `(lapsDone, checkpointsDone, distanceToNextCheckpoint)`.
- Debug overlay draws them; players never see them.

### 6.9 Start/finish line
- Visible checkered strip across the ribbon at waypoint 0. Crossing it (with all checkpoints passed) increments lap, records lap time, triggers lap SFX and "Lap 2/3" toast.

---

## 7. Rules, win & lose conditions

### 7.1 Driving model (exact)
Per fixed timestep `dt` = 1/120 s (sim), rendered at display refresh with interpolation:

```
surface     = surfaceAt(car.pos)                    // §6.4
maxSpd      = CAR_MAX_SPEED * surface.speedMult
accel       = CAR_ACCEL     * surface.speedMult
// throttle
if (input.up)    car.fwdSpeed += accel * dt
if (input.down)  car.fwdSpeed -= (car.fwdSpeed > 0 ? CAR_BRAKE_DECEL : CAR_ACCEL*0.6) * dt
if (!input.up && !input.down) car.fwdSpeed -= sign(car.fwdSpeed) * CAR_COAST_DECEL * dt
car.fwdSpeed = clamp(car.fwdSpeed, -CAR_REVERSE_MAX, maxSpd)
// steering (effect scales with speed, full authority by 25% of max speed)
steerAuthority = clamp(abs(car.fwdSpeed) / (0.25 * CAR_MAX_SPEED), 0, 1)
car.heading += input.steer * CAR_TURN_RATE * steerAuthority * sign(car.fwdSpeed) * dt
// velocity blend: heading pulls velocity toward it at grip rate
targetVel = headingVector * car.fwdSpeed
car.vel   = lerp(car.vel, targetVel, 1 - exp(-CAR_GRIP * surface.gripMult * dt))
car.pos  += car.vel * dt
```

This gives clean driving on the ribbon, controlled slides on milk (low grip = velocity lags heading), and treacle-crawl in juice — all from two multipliers. Emergent, not scripted.

### 7.2 Race rules
- Race = `LAP_COUNT` (3) laps of the single track, 4 cars (player + `AI_COUNT` = 3).
- Grid order: player always starts P4 (back of grid) ⚑ (overridable) — starting last makes overtaking, the fun verb, mandatory.
- Countdown 3 s; inputs (except pause/mute) ignored until GO.
- **Win:** finish 1st. **Placing:** finishing 2nd–4th is a completed race with placement shown; there is no explicit "lose" state — the failure feeling is losing to toy cars.
- Race timer runs from GO to player finish. Best single-lap time persists in `localStorage` key `crumbcup_bestlap_v1` and shows on splash + results.
- After the player finishes, remaining AI finish positions are resolved instantly by current progress order (no waiting), and the results screen shows within 1.5 s.

### 7.3 Edge cases
- **Fell off during countdown:** impossible — inputs locked, cars stationary.
- **Fell off while crossing finish line:** lap counts if the finish checkpoint registered before the fall flag; checkpoint test runs before edge test in the same tick, so simultaneous = lap counts.
- **Two cars cross finish same tick:** ordering by exact sub-tick interpolated distance past the line; tie broken by lower car index (deterministic).
- **Pause:** freezes sim clock entirely; race and lap timers exclude paused time.
- **Reverse/wrong way:** checkpoints simply don't advance; a "WRONG WAY" flashing HUD warning appears when the car's heading dot racing-line direction < −0.3 for > 1.5 s. No teleport penalty in P0.
- **Restart (R):** fully re-seeds from current seed (same race replays identically under same seed), returns to GRID phase in < 1 s.
- **Player AFK / stuck:** if player speed < 10 for > 6 s during RACE, show hint toast "Hold ↑ to drive". Nothing else.

---

## 8. Difficulty & progression

Single tuned difficulty in P0. Challenge shape within a race:
- **Lap 1** is learning (player starts P4, field spreads out).
- **Laps 2–3** are execution: the milk slick and hairpin punish greed, and AI #3 (1.03× speed) is beatable only with clean lines through both hazards.
- Target outcome for a first-time player: finishes 3rd–4th on race 1, wins by race 3–5. Tuned via `AI_SPEED_MULTS`.

No meta-progression, no unlocks, no multiple tracks in P0. Knobs for playtesting instead of systems: `AI_COUNT`, `AI_SPEED_MULTS`, `LAP_COUNT`, all surface multipliers. P1 adds a **Time Trial mode** (0 AI, ghost-less, chase the localStorage best lap) via `?bots=0`. P2 sketches a second track ("Bathtub Basin") only if the first is fun.

---

## 9. Style & theme

- **Visual style:** flat vector cartoon, thick dark outlines (2–3 px), rounded shapes, soft single-direction drop shadows (offset 6 px at 15% black). Everything drawn with Canvas 2D paths — zero image assets. Readability first: cars must pop against every surface.
- **Tone/mood:** sunny Saturday-morning nostalgia with slapstick peril. The world is cozy; the racing is chaos.
- **References:** SNES Micro Machines' breakfast table, *Untitled Goose Game*'s tidy readable props, *Toybox Turbos*' toy-scale staging.
- **Palette (locked, 10 colors):**

| Use | Hex |
|---|---|
| Tablecloth cream | `#FFF6E3` |
| Gingham red (checker squares) | `#E8574C` |
| Track tape tan | `#E9D8A6` |
| Outline / text dark brown | `#3B2A1A` |
| Wood table edge | `#A9743F` |
| Milk white | `#FBFBF4` |
| Juice orange | `#F9A620` |
| Player car red | `#D62828` |
| AI blue / AI green / AI yellow | `#3D74B8` / `#5F9E54` / `#F4C430` |

- **Typography:** system stack `"Trebuchet MS", "Segoe UI", system-ui, sans-serif`, bold weights, dark-brown text on cream panels. HUD numerals use `font-variant-numeric: tabular-nums` (canvas: fixed-width layout).
- **Placeholder plan (M0–M1):** solid-color rectangles for cars, grey ribbon on beige field, white squares for cubes, flat white/orange ellipses for puddles, magenta debug shapes. No outlines, no shadows, no gingham until M2.

---

## 10. Sound design

**Implementation:** Web Audio API directly (no Howler — only ~8 sounds, all synthesized in code, zero asset files). One `AudioContext` created on first user gesture (the Play click), per browser autoplay policy. A tiny jsfxr-style helper generates each SFX from parameter objects at load time into buffers.

**Mute:** `M` key and HUD speaker icon, P0, persisted to `localStorage` key `crumbcup_mute`.

### SFX event table

| Event | Sound description | Priority |
|---|---|---|
| Engine (continuous) | Sawtooth osc, pitch 60→220 Hz mapped to speed, lowpassed, quiet | P0 |
| Countdown tick (×3) | Short square-wave blip, 440 Hz | P0 |
| GO | Same blip up an octave (880 Hz), longer | P0 |
| Obstacle/car bump | Filtered noise thunk, 80 ms | P0 |
| Fall off table | Descending pitch slide (600→100 Hz, 0.5 s) + soft "poof" noise | P0 |
| Lap complete | Two-note rising chime | P0 |
| Race finish | Four-note fanfare arpeggio (win: major; 2nd–4th: shorter, flatter) | P0 |
| Milk slick entry | Quick "squeak" — short sine chirp 900→1200 Hz | P1 |
| Juice entry | Low "squelch" noise burst | P1 |
| UI button click | 30 ms square blip | P1 |

**Music:** none in P0. P1: a 4-bar generative loop (Web Audio scheduler, kalimba-ish plucked triads at 96 BPM, volume 20%) ⚑ (overridable — silence plus engine may be the better prototype choice; music behind `MUSIC_ENABLED` config, default `false`).

---

## 11. UI & screens

**Flow:** `SPLASH → (Play) → RACE [pause overlay] → RESULTS → (Race again → RACE | Menu → SPLASH)`

### Splash screen (mandatory)
- Title "CRUMB CUP" large, subtitle one-liner: "Tiny cars. Giant breakfast. Three laps."
- Rules/goal, exactly these 5 bullets:
  - Race 3 laps around the breakfast table. Finish 1st.
  - Stay on the tape track — the tablecloth is slow.
  - Milk is slippery. Juice is sticky. Sugar cubes are solid.
  - Don't drive off the edge of the table.
  - You start last. Overtake all 3 toy cars.
- Controls block: "↑↓←→ / WASD drive · R restart · P pause · M mute" (+ touch line when touch build lands).
- Best lap (from localStorage) if one exists: "Best lap: 31.42".
- Version number bottom-right, e.g. `v0.1.0`, rendered from the single exported constant `VERSION` in `config.js` (splash, pause overlay, and debug overlay all read this same constant).
- One obvious **PLAY** button (also Enter/Space).

### Race HUD (always visible during play)
- Top-left: `LAP 2/3`.
- Top-center: position, huge: `3rd`.
- Top-right: race time + current lap time (tabular).
- Bottom-right: mute icon, pause icon.
- Transient toasts center-screen: countdown, "GO!", "LAP 2", "WRONG WAY", "FINISHED — 2nd!".

### Pause overlay
Dimmed backdrop; "PAUSED", buttons Resume / Restart / Menu; controls reminder; version.

### Results screen
- Banner: "🏆 1st place!" or "Finished 3rd".
- Standings table: position, car color chip, name (You / Blue / Green / Yellow), total time (player) or "+2.3s"-style gaps.
- "Best lap this race: 30.87" and "All-time best: 30.11 ★NEW" when beaten.
- Buttons: **Race again** (R / Enter) and **Menu**.

No other screens. Settings menu is P2 (mute + URL flags cover prototype needs).

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/config.js`; every value below lives there and nowhere else. `VERSION = "0.1.0"` exported alongside.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `LAP_COUNT` | 3 | laps | race length |
| `AI_COUNT` | 3 | cars | opponent count (0–3) |
| `COUNTDOWN_SECONDS` | 3 | s | grid phase |
| `CAR_MAX_SPEED` | 520 | u/s | top speed |
| `CAR_ACCEL` | 900 | u/s² | throttle response |
| `CAR_BRAKE_DECEL` | 1400 | u/s² | braking |
| `CAR_REVERSE_MAX` | 160 | u/s | reverse top speed |
| `CAR_COAST_DECEL` | 350 | u/s² | rolling friction |
| `CAR_TURN_RATE` | 3.2 | rad/s | steering authority |
| `CAR_GRIP` | 8.0 | 1/s | velocity-to-heading convergence |
| `CAR_LENGTH` / `CAR_WIDTH` | 44 / 26 | u | car size |
| `CAR_COLLIDE_RADIUS` | 20 | u | car-car collision |
| `CAR_BUMP_TRANSFER` | 0.5 | ratio | bump momentum exchange |
| `SURF_TRACK_SPEED` / `SURF_TRACK_GRIP` | 1.0 / 1.0 | mult | ribbon feel |
| `SURF_CLOTH_SPEED` / `SURF_CLOTH_GRIP` | 0.55 / 0.9 | mult | off-track penalty |
| `SURF_MILK_SPEED` / `SURF_MILK_GRIP` | 1.0 / 0.25 | mult | milk slide |
| `SURF_JUICE_SPEED` / `SURF_JUICE_GRIP` | 0.4 / 1.4 | mult | juice bog |
| `TRACK_WIDTH` | 220 | u | ribbon width |
| `CHECKPOINT_RADIUS` | 200 | u | progress capture |
| `WORLD_W` / `WORLD_H` | 3200 / 2000 | u | table size |
| `EDGE_MARGIN` | 60 | u | fall boundary inset |
| `RESPAWN_DELAY` | 1.2 | s | fall penalty |
| `SUGAR_CUBE_SIZE` / `SUGAR_CUBE_COUNT` | 60 / 6 | u / n | chicane |
| `OBSTACLE_RESTITUTION` | 0.5 | ratio | cube bounce |
| `AI_SPEED_MULTS` | [0.92, 0.97, 1.03] | mult | AI skill spread |
| `AI_LOOKAHEAD` | 2 | waypoints | AI cornering anticipation |
| `AI_BRAKE_ANGLE` | 0.9 | rad | when AI slows |
| `AI_CORNER_SPEED_FACTOR` | 0.55 | mult | AI corner speed |
| `AI_STEER_NOISE` | 0.05 | rad/s σ | AI line variation |
| `AI_RUBBERBAND` | false | bool | P1 catch-up toggle |
| `CAMERA_ZOOM` | 0.5 | px/u | scale feel |
| `CAMERA_LERP` | 5.0 | 1/s | camera smoothing |
| `CANVAS_W` / `CANVAS_H` | 960 / 600 | px | render size (letterboxed responsive) |
| `SIM_DT` | 1/120 | s | fixed timestep |
| `TOUCH_AUTO_ACCEL` | true | bool | touch control scheme |
| `MUSIC_ENABLED` | false | bool | P1 generative music |
| `FLAKE_SLOW_FACTOR` | 0.10 | ratio | P1 cereal hit penalty |
| `VERSION` | "0.1.0" | — | splash/debug display |

### URL flags
- `?seed=1234` — seeds the single mulberry32 PRNG (AI noise, any scatter). Same seed ⇒ identical race. Default: `Date.now()`, displayed in debug overlay so any run can be reproduced.
- `?debug=1` — overlay: FPS, sim state, car speed/surface, waypoints + checkpoints + racing line drawn, seed, version. Cheat keys: `1` teleport to next checkpoint, `2` finish current lap, `3` toggle AI frozen, `+/-` live-adjust `CAR_MAX_SPEED` ±5%.
- `?bots=0..3` — overrides `AI_COUNT` (0 = time-trial).
- `?laps=N` — overrides `LAP_COUNT`.
- `?mute=1` — start muted.
- `?skip=1` — bypass splash straight to GRID (playtest iteration speed).

---

## 13. Tech stack

⚑ (overridable) **Vanilla JavaScript (ES modules) + Canvas 2D. Zero-build.** One `index.html` plus `src/*.js` modules loaded via `<script type="module">`; deploy = copy the folder. No bundler, no dependencies, no framework, no physics library — the driving model in §7.1 is ~40 lines and *is* the game feel, so owning it beats configuring Matter.js for behavior we'd fight (Matter is overkill for kinematic arcade cars; the only "physics" beyond the car model is circle bounces). Canvas 2D over Pixi because the scene is ~4 cars + ~20 static shapes + ≤150 particles — trivially 60fps on a mid-range laptop. Three.js explicitly deferred (see §1 flag). Web Audio API directly for the 8 synthesized SFX.

**Perf budget:** ≤ 4 dynamic cars, ≤ 30 collidable shapes, ≤ 150 particles (skid puffs, milk splashes), one canvas layer + one pre-rendered offscreen canvas for the static table background (drawn once, blitted per frame). Fixed 120 Hz sim decoupled from rAF render with interpolation.

---

## 14. Milestones

### M0 — Toy loop (the "is driving fun?" gate)
**Goal:** drivable car with surfaces on the real track layout, rectangles only.
**Deliverables:** sim core (fixed timestep, car model §7.1), keyboard input, camera follow, track ribbon + tablecloth + milk + juice surfaces, table-edge fall/respawn, checkpoint progress, lap counting, `?debug=1`, `?seed=`.
**Acceptance criteria:**
- [ ] A player can drive 3 clean laps; lap counter increments correctly and cut corners don't count.
- [ ] Milk visibly slides the car; juice visibly bogs it; tablecloth is obviously slower than ribbon.
- [ ] Driving off the edge respawns at the last checkpoint within 1.5 s with progress intact.
- [ ] 60 fps sustained in Chrome and Firefox on a mid-range laptop.
- [ ] The developer answers "does an empty hot-lap feel good?" — **if no, stop and retune or kill the project; do not proceed to M1.**
**Proves:** handling + surface sub-claims of the fun hypothesis.

### M1 — Real rules (the race exists)
**Goal:** full P0 racing against 3 AI, complete screen flow.
**Deliverables:** AI drivers, car-car and cube collisions, grid + countdown, position calculation, finish + results screen, splash screen (rules, controls, version constant, Play), HUD, pause, restart (`R`), wrong-way warning, localStorage best lap, `?bots=`, `?laps=`, `?skip=`.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds unprompted (splash alone suffices).
- [ ] Full race (splash → 3 laps vs 3 AI → results → restart) works with no console errors.
- [ ] AI complete laps unaided ≥ 95% of the time; an AI that falls off recovers and finishes.
- [ ] Displayed position matches ground truth at all times (spot-check in debug).
- [ ] Race length lands in 90–150 s for a mid-skill player; player can realistically win within 5 attempts.
**Proves:** the racing (overtaking/placement) half of the hypothesis.

### M2 — Feel (juice pass)
**Goal:** the breakfast-table fantasy lands; game feel sells speed and scale.
**Deliverables:** vector art pass (§9: gingham cloth, tape track, plate/bowl/mug/spoon props, cars with outlines, wood edge), P0 SFX set + engine pitch + mute persistence, particles (skid puffs on low grip, milk splash, fall poof), camera micro-shake on bumps (4 px, 120 ms), squash-stretch on landing/respawn, countdown/finish toasts animated.
**Acceptance criteria:**
- [ ] A screenshot alone reads as "tiny cars on a breakfast table" to someone who hasn't seen the game (ask one person).
- [ ] All P0 SFX fire on their events; audio only starts after user gesture; mute persists across reloads.
- [ ] Particles + shake stay within perf budget; still 60 fps.
- [ ] Playtesters describe milk/juice by name unprompted ("I lost it in the milk").
**Proves:** theme-creates-the-challenge sub-claim; whether juice raises fun.

### M3 — Playtest build
**Goal:** shippable, reproducible, instrumented for playtesting.
**Deliverables:** deployed to static host at `/games/tiny-machines/` (this repo's `public/` folder), seed shown on results screen for bug repro, all URL flags documented on the debug overlay, P1 features if time allows in this order: touch controls → cereal flakes → milk/juice entry SFX → time-trial mode polish → generative music (default off).
**Acceptance criteria:**
- [ ] Game loads and runs from static hosting (GitHub Pages) with zero network calls after page load.
- [ ] Same `?seed=` produces an identical race twice (AI finishing order identical with no player input).
- [ ] 3 external playtesters complete ≥ 2 races each and answer the §2 questions; answers recorded.
- [ ] `?bots=0` time-trial works and best lap persists.
**Proves:** the hypothesis, with real humans.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is starting the player in P4 motivating or frustrating? Knob: change grid order constant; try P2 start.
2. **(non-blocking — resolve in playtest)** Milk grip 0.25 may be comedy or rage. Knobs: `SURF_MILK_GRIP` 0.15–0.4.
3. **(non-blocking — resolve in playtest)** Is 3 laps right, or does lap 3 drag? Knob: `?laps=`.
4. **(non-blocking — resolve in playtest)** Do AI need rubber-banding to keep races close, or does the 0.92–1.03 spread suffice? Knob: `AI_RUBBERBAND`.
5. **(non-blocking — resolve in playtest)** Does the edge-fall penalty (≈3 s + position loss) feel fair, or should fall frequency be reduced with a subtle guardrail (crumb ridge) on the worst corner? Knob: `RESPAWN_DELAY`; track tweak if needed.
6. **(non-blocking)** Touch: is auto-accelerate correct, or do phones want a gas pedal? Knob: `TOUCH_AUTO_ACCEL`.
7. **(blocking only for post-prototype)** If the 2D loop proves fun, does the concept justify the Three.js/folio-2025 rebuild the source idea envisioned, or is 2D the actual product direction? Decided by M3 playtest results — not needed to build this prototype.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → sim core (`sim.js`: state, fixed-step `step(state, inputs, dt)`, car model, surfaces, checkpoints, collisions, edge-fall) → track data (`track.js`: waypoints, surface shapes, obstacles) → input (`input.js`) → renderer (`render.js`: camera, background pre-render, cars, debug layer) → race rules + AI (`race.js`, `ai.js`) → screens/HUD (`ui.js`) → audio (`audio.js`) → main loop glue (`main.js`).

**Keep the sim headless.** `sim.js`, `track.js`, `race.js`, `ai.js` must not touch `document`, `window`, or Canvas — pure data in, data out, PRNG injected. This allows Node-based unit tests: lap counting with skipped checkpoints, position ordering ties, surface multiplier math, respawn state, deterministic replay under a fixed seed + scripted inputs.

**File layout (repo and deployable are the same folder — zero build):**

```
public/games/tiny-machines/
  index.html          # canvas + splash DOM shell, loads src/main.js as module
  design.md           # this document
  src/
    config.js         # CONFIG object + VERSION constant (single source of truth)
    main.js           # boot, rAF loop, fixed-step accumulator, screen state machine
    sim.js            # headless: car physics, surfaces, collisions, checkpoints, edge
    track.js          # headless: waypoints, surface shapes, obstacles, grid slots
    race.js           # headless: countdown, laps, positions, finish resolution
    ai.js             # headless: waypoint-follow driver → produces an inputs object
    input.js          # keyboard (+ touch in M3), produces the same inputs object shape
    render.js         # camera, offscreen background, cars, particles, debug overlay
    ui.js             # splash / HUD / pause / results DOM + toasts
    audio.js          # Web Audio init-on-gesture, synthesized SFX, mute persistence
  test/
    sim.test.js       # node test/sim.test.js — no framework needed, plain asserts
```

Deploy = the `public/games/tiny-machines/` folder as-is on GitHub Pages. No network calls at runtime; no assets beyond these files.

**Reminders:**
- Prove the loop with rectangles first. M0's "empty lap feels good" gate is real — do not spend a minute on gingham or SFX before it passes.
- Every milestone ends runnable: `index.html` opens from a static file server and plays at that milestone's level.
- AI and player must share the same physics function — never fork the car model.
- One PRNG, seeded from `?seed=`, passed everywhere randomness is needed; never call `Math.random()` directly.
- All tuning edits happen in `config.js` only; if a magic number appears elsewhere, move it.
