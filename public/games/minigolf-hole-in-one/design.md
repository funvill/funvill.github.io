# GHOSTLINE GOLF — Game Design Document

> Source idea: [Game Idea 4 - Mini Golf 'It can't be this easy' (Theme: It can't be this easy)](/game-idea-4-mini-golf-it-cant-be-this-easy)

## 1. Title & one-liner

**Working title:** **Ghostline Golf**

**Alternates:** *Ace or Nothing*, *It Can't Be This Easy*, *One Stroke*, *Bounce Par*, *13 Billion Putts*

**One-sentence description:** A puzzle mini-golf game where the only shot that counts is a hole-in-one — and every failure paints the course with ghost lines that slowly reveal the solution.

**Genre:** Puzzle / precision physics. Single-player, top-down 2D mini golf.

**Elevator pitch:** Every hole in Ghostline Golf must be aced. You get two dials — angle (0.05° increments) and power (0.1 increments) — a short aiming stub, and a deterministic physics sim that never lies. Your first attempt on each course is blind, and you will miss. The moment you do, the course erupts: hundreds of gray ghost lines bloom across the felt — the failed attempts of a phantom crowd — threaded through with a few thin green lines that trace a perfect ace. The green line shows you *the path*, but not the numbers. Reverse-engineer the angle from the line, read the bounce decay to find the power, and thread a ball through three cushions into the cup. When it drops, it feels inevitable — *it can't be this easy* — and then the next course opens with one more required bounce.

**Adaptation from the source idea (static hosting, no backend):** The original design depends on a cloud-shared pack of every shot ever taken. This prototype replaces it with three local sources that preserve the same reveal: (a) **your own previous attempts**, stored in `localStorage` and drawn as blue ghost lines; (b) a **synthetic crowd** of gray ghost lines, generated at load time by simulating seeded pseudo-random shots through the same deterministic physics; and (c) **green solution lines**, baked at build time by a headless solver that grid-searches the parameter space and stores the winning (angle, power) pairs in the course data. The global leaderboard is cut to local per-course best stats. ⚑ (overridable)

⚑ (overridable) The source idea's third input (arc/elevation) is cut: the prototype is pure top-down 2D with two inputs. Angle at 0.05° steps (7,200 values) × power at 0.1 steps (991 values) ≈ **7.1 million combinations** — still far too many to brute-force, which is all the third axis existed to guarantee. This halves physics/rendering scope without touching the fun hypothesis.

## 2. Fun hypothesis

**The single question:** *Is reverse-engineering a visible solution path into exact dial values — after a dramatic ghost-line reveal — a satisfying puzzle, distinct from ordinary mini golf?*

Sub-hypothesis: does the moment of the reveal (blind failure → hundreds of lines bloom) produce the intended "oh, THAT'S the game" hook?

**Playtest questions (ask after each play):**

1. When the ghost lines first appeared, did you understand immediately what the green line meant? Did the reveal feel like a payoff or a spoiler?
2. On a green-line course, how many attempts did it take you to convert the line into an ace? Did dialing in the numbers feel like solving or like tedium?
3. Did you ever ignore the green line and hunt for a better (fewer-bounce) route? Why or why not?
4. Was the aiming stub (first ~120 px of trajectory) the right amount of help? Would you have quit without it, or was it too much?
5. After acing course 3 (2 bounces), did you want to see what a 5-bounce course looked like, or were you done?

## 3. Design pillars

1. **One stroke, all or nothing.** There is no putting for par. A shot either aces or it teaches. Never add multi-stroke play.
2. **Failure buys information.** Every miss adds a ghost line; the first miss buys the whole reveal. The player must always be gaining knowledge, never just losing.
3. **The sim never lies.** Physics is 100% deterministic. Identical inputs produce identical trajectories, forever. All tuning must preserve this — no randomness inside the sim.
4. **Show the path, hide the numbers.** Ghost lines display trajectories, never their (angle, power) parameters. The puzzle is the translation from picture to dials. Any feature that leaks numbers (e.g., full-trajectory aim preview) is banned.

## 4. Core game loop

Session target: **3–6 minutes per course**, ~20–30 minutes for the 5-course campaign. A single attempt (aim → shoot → resolve) takes 10–30 seconds.

```
            ┌──────────────────────────────────────────────┐
            │                                              │
   ┌────────▼───────┐   ┌──────────────┐   ┌───────────────┴──┐
   │ 1. BLIND SHOT  │──►│ 2. THE REVEAL │──►│ 3. DIAL-IN LOOP  │
   │ first attempt, │   │ ghost lines   │   │ read line → set  │
   │ no ghosts      │   │ bloom (once)  │   │ dials → shoot →  │
   └────────────────┘   └──────────────┘   │ miss → adjust    │◄─┐
                                            └────────┬─────────┘  │
                                                     │ ACE        │ miss
                                                     ▼            │
                                            ┌──────────────────┐  │
                                            │ 4. DROP & ADVANCE │──┘
                                            │ jingle, stats,    │
                                            │ next course       │
                                            └──────────────────┘
```

**Phase 1 — Blind shot.** Player sees the course, tee, hole, par (required-feeling bounce count), and their aiming stub. No ghosts. They eyeball a shot and take it. *Feels:* confident, then humbled. (If they ace it blind — allowed, celebrated with a special "FIRST TRY" banner.)

**Phase 2 — The reveal.** On the first failed attempt coming to rest, `ghostGrayCount` gray lines + all green solution lines draw in staggered over `revealDurationMs`, with a rising whoosh. One-time event per course. *Feels:* the hook — "everyone has been here before me, and someone solved it."

**Phase 3 — Dial-in loop.** Player aligns the aim stub over a green line's launch direction, estimates power from how far along the line previous balls died (their own blue ghosts show exactly this), shoots, watches, adjusts by ±0.05°/±0.1 increments. Sliders keep their values between attempts. *Feels:* scientific, closing in, "warmer… warmer…"

**Phase 4 — Drop & advance.** Ball drops, ace jingle, stats card (attempts, bounces vs par), auto-unlock next course. *Feels:* it can't be this easy — inevitability in hindsight.

## 5. Inputs & controls

Touch is **viable and supported**: all inputs are sliders, buttons, and drags. Fine-grained precision on touch comes from the stepper buttons, not the drag.

| Input (desktop) | Action |
|---|---|
| Mouse drag on canvas (from anywhere) | Coarse aim: sets angle toward drag direction, power from drag length (snapped to 0.05° / 0.1 grid) |
| `←` / `→` | Angle −/+ 0.05° |
| `Shift` + `←` / `→` | Angle −/+ 1.0° |
| `↑` / `↓` | Power +/− 0.1 |
| `Shift` + `↑` / `↓` | Power +/− 5.0 |
| Angle/power slider drag (HUD) | Set value directly (snapped to grid) |
| Click angle/power readout | Type exact value, `Enter` commits (P1) |
| `Space` or `Enter` | Shoot (disabled while ball is in motion) |
| `G` | Toggle ghost lines on/off (after reveal) |
| `B` | Cycle ghost filter: all → green+blue only → blue only → all |
| `R` | Reset ball to tee immediately (counts as a failed attempt if ball was in motion) |
| `M` | Mute/unmute |
| `P` or `Esc` | Pause overlay |
| `N` | Next course (only on ace screen) |
| Click during reveal | Skip reveal animation to final state |

| Input (touch) | Action |
|---|---|
| Drag on canvas | Coarse aim (same as mouse drag) |
| Angle slider + `−`/`+` steppers | Angle ±0.05° per tap, hold to repeat, long-press steppers = ±1.0° |
| Power slider + `−`/`+` steppers | Power ±0.1 per tap, hold to repeat, long-press = ±5.0 |
| **SHOOT** button (large, bottom-right) | Shoot |
| Ghost icon button | Toggle/cycle ghost lines |
| Pause icon (top-right) | Pause overlay (contains Mute, Restart course, Quit to splash) |
| Tap during reveal | Skip reveal animation |

No other inputs exist. Pause overlay contains: Resume, Restart course (clears this course's attempts ⚑ no — keeps attempts, just resets ball; "Restart course" resets ball and dials only, attempt history is never erased), Mute toggle, Quit to splash.

## 6. Game elements

All coordinates are in a fixed **960 × 540** logical playfield, scaled to fit the window (letterboxed). Origin top-left, +x right, +y down. Angle 0° = +x (east), measured counterclockwise (90° = up/north).

| Element | Placeholder (M0–M1) | Final (M2) | Behavior | Config keys |
|---|---|---|---|---|
| **Ball** | White circle r=8 | White circle, soft shadow, motion-stretch at high speed | Circle body; launched from tee at speed `power × powerToSpeed`; decelerates at `friction` px/s²; reflects off walls with `restitution`; at rest when speed < `restSpeed` | `ballRadius`, `powerToSpeed`, `friction`, `restitution`, `restSpeed` |
| **Tee** | Yellow ring r=10 | Rubber tee mat, 24×24 rounded square | Ball spawn point; ball returns here `failResetDelayMs` after a failed attempt | — |
| **Hole** | Black circle r=12 | Black circle with inner shadow + flag pin | Captures ball when center-distance < `holeRadius` AND speed ≤ `captureSpeed`. Faster ball rolls straight over (lip-out; no deflection) | `holeRadius`, `captureSpeed` |
| **Wall** | 6 px dark line segment | Wooden rail with 2 px highlight edge | Static line segment; ball reflects (angle of incidence = reflection) scaled by `restitution`; each contact increments bounce count (see §7 edge cases) | `wallThickness`, `restitution` |
| **Boundary** | Same as wall | Same as wall | Closed rectangle inset `boundaryInset` px from playfield edge; part of every course; counts as wall for bounces | `boundaryInset` |
| **Gray ghost line** | 1 px polyline, `rgba(255,255,255,0.10)` | Same (this IS the final art) | Synthetic crowd: `ghostGrayCount` shots sampled from seeded RNG (see below), simulated at course load, pre-rendered once to an offscreen canvas layer. Static after reveal. | `ghostGrayCount`, `ghostGrayAlpha` |
| **Green ghost line** | 2 px polyline, `#38E07B` at 0.9 alpha | Same, with slow 2 s alpha pulse 0.7↔0.9 | One per baked solution in course data; simulated at load from stored (angle, power); drawn above gray | `ghostGreenAlpha` |
| **Blue ghost line** | 1.5 px polyline, `#4FC3F7` at 0.45 alpha | Same | Player's own past attempts on this course, replayed from `localStorage` (angle, power) at load and appended live after each shot; drawn above gray, below green; capped at `ghostBlueMax` most recent | `ghostBlueMax`, `ghostBlueAlpha` |
| **Aim stub** | 2 px dashed white line from ball | Same + small arrowhead | Shows the first `aimStubLength` px of the true simulated trajectory (including a bounce if one occurs within the stub). Never shows more. Hidden while ball moves. | `aimStubLength` |

**Gray ghost sampling (seeded, deterministic per course):** RNG = mulberry32 seeded with `hash(courseId) ^ urlSeed`. Composition: 55% uniform (angle ∈ [0,360), power ∈ [`minPower`,100]); 30% Gaussian around a randomly chosen solution (σ = 6° angle, 8 power) — plausible near-attempts; 15% tight Gaussian around a solution (σ = 1.2°, 2 power) — heartbreaking near-misses that hug the green line. Each is simulated headlessly (capped at `simMaxSeconds`) and its polyline stored. This makes the crowd *look* like a real player population converging on the answer.

**Interactions matrix:** Ball↔wall: reflect + count bounce. Ball↔hole: capture or roll-over by speed. Ball↔ghost lines: none (visual only). Ghosts↔ghosts: none.

## 7. Rules, win & lose conditions

- **Attempt:** one shot from the tee with chosen (angle, power). The ball simulates until it is captured, comes to rest, or `simMaxSeconds` elapses (then forced to rest — counts as a miss).
- **Ace (course win):** ball captured by the hole. The attempt's **bounce count** is its score. Course is marked complete; next course unlocks. There is no way to win a course other than an ace.
- **Miss:** ball comes to rest anywhere else. Attempt counter +1, shot appended to blue ghosts + `localStorage`, ball auto-returns to tee after `failResetDelayMs`. Dials retain their values.
- **No lose condition.** Attempts are unlimited. After `skipUnlockAttempts` misses on one course, a "Skip course →" button appears in the HUD ⚑ (overridable) so a stuck playtester can still see later content. Skipped courses show as incomplete.
- **Par:** each course's par = the minimum bounce count among its baked solutions (solver-verified, stored in course data). HUD shows `PAR 2 BOUNCES`.
- **Ratings on ace:** bounces < par → **"BROKE THE COURSE"** banner; bounces == par → **"ACE"**; bounces > par → **"ACE (scenic route)"**. Ace on attempt 1 additionally shows **"FIRST TRY"**.
- **Local records per course (in `localStorage`):** fewest bounces on an ace, fewest attempts-to-first-ace, total attempts. Shown on the course-complete card and splash.

**Edge cases (decided):**

- **Ball rolls over hole too fast:** no capture, no deflection, no bounce counted. (Lip-outs are a core skill signal: right line, wrong power.)
- **Corner hit (two walls in same substep):** resolve the earliest contact by swept-circle time-of-impact; if two contacts tie within one substep, reflect about the corner's angular bisector and count **one** bounce.
- **Double-count guard:** contacts with any wall within `bounceCooldownMs` of the previous counted bounce still reflect but do not increment the bounce counter (prevents jitter-counting when sliding along a wall).
- **Ball at rest overlapping hole rim** (distance < `holeRadius`, speed < `restSpeed` but arrived faster than `captureSpeed` on the final step): capture it. Rest inside the cup radius always counts.
- **Shoot pressed while ball in motion:** ignored (button disabled).
- **`R` pressed while ball in motion:** attempt immediately resolves as a miss.
- **Reveal trigger:** fires exactly once per course, on the first attempt that resolves as a miss. A blind first-try ace means the reveal never fires on that course (ghost toggle then shows ghosts without animation if pressed).
- **`simMaxSeconds` reached mid-flight:** ball forced to rest where it is; miss.

## 8. Difficulty & progression

Single tuned difficulty. Progression is the **bounce ladder** across the 5-course campaign — courses unlock strictly in order:

| # | Course | Par (bounces) | Teaches |
|---|---|---|---|
| 1 | Straight Shot | 0 | Dials, stub, power reading; almost everyone aces in ≤3 attempts |
| 2 | One Cushion | 1 | Direct path is walled off; banking; first real reveal payoff |
| 3 | The Pocket | 2 | Hole guarded by an alcove; entry angle matters |
| 4 | Hallway of Mirrors | 3 | Zigzag corridor; power decay over multiple bounces |
| 5 | The Vault | 5 | Chamber behind a narrow slit; full ghost-forensics required |

Within a course, difficulty is self-regulating: each miss adds information (blue lines). The knobs that move global difficulty are `aimStubLength` (more/less free help), `holeRadius` + `captureSpeed` (forgiveness), and `ghostGrayCount`/composition (readability of the reveal). No dynamic difficulty adjustment.

**P2 — Infinite mode:** seeded procedural courses (`?mode=infinite&seed=…`): boundary + 4–10 random axis-aligned/diagonal wall segments, tee left third, hole right third; an in-browser async solver (same code as the build-time solver, budget `solverMaxSims` sims with a progress bar) bakes solutions/par at load; unsolvable seeds are rejected and the seed is re-hashed until solvable. Out of scope until M3 has spare time.

## 9. Style & theme

**Visual style:** flat vector minimalism, top-down. No textures, no gradients except a single soft vignette. Thick, clean geometry. The ghost lines ARE the art — the aesthetic target is "CRT oscilloscope drew a golf course": dark field, luminous line-work, everything else stays quiet so hundreds of lines read as a data-beautiful tangle, not noise.

**Reference points:** TrackMania's ghost-line replays (the source video), *Mini Metro*'s restraint, the Desmos graphing calculator's line clarity.

**Palette (6 colors + line alphas):**

| Use | Hex |
|---|---|
| Background (page + out of bounds) | `#101614` |
| Felt (course floor) | `#2E7D46` |
| Walls / rails | `#1B2E22` (with 2 px `#C9A96A` top edge in M2) |
| Ball / primary text | `#F5F1E6` |
| Accent (par, buttons, tee, FIRST TRY) | `#FFC857` |
| Solution green | `#38E07B` |
| Player-ghost blue | `#4FC3F7` |
| Hole | `#0A0D0B` |

**Typography:** `system-ui` stack for prose; readouts (angle/power/attempts) in `ui-monospace, "Cascadia Mono", monospace` with `font-variant-numeric: tabular-nums` so digits don't jitter while scrubbing. No webfonts (keeps build asset-free).

**Tone:** deadpan-scientific with one wink — the ace card's sub-line rotates between "It can't be this easy.", "It was always this easy.", "7,128,000 combinations. You needed {attempts}."

**Placeholder plan (M0–M1):** everything is `fillRect`/`arc`/`stroke` in the palette above — circle ball, line walls, ring tee. The ghost lines require no placeholder; they are final from day one.

## 10. Sound design

**Implementation:** Web Audio API only, all SFX synthesized in code (jsfxr-style oscillator + envelope recipes) — zero audio asset files. A single `audio.js` module exposing `sfx(name, opts)`. **No sound plays before the first user gesture** (AudioContext created/resumed on first pointerdown/keydown). **Mute toggle is P0**, persisted in `localStorage`, state shown in HUD.

| Event | Sound | Priority |
|---|---|---|
| Shoot | Short filtered noise "thock", 60 ms, pitch scales with power | P0 |
| Wall bounce | Woodblock tick, pitch proportional to impact speed (musicalizes decay across a multi-bounce shot) | P0 |
| Ace (ball drops) | Low "plunk" + rising 3-note pentatonic jingle, ~700 ms | P0 |
| Miss (ball rests) | Soft dull thud, quiet | P0 |
| Ghost reveal | 2.5 s rising filtered-noise whoosh + faint shimmer, synced to `revealDurationMs` | P0 |
| UI click (buttons/steppers) | 10 ms tick | P0 |
| BROKE THE COURSE | Ace jingle + extra 5th-interval sparkle | P1 |
| Slider scrub | Per-step micro-tick (rate-limited to 30/s) | P1 |
| Course unlock | Two-note chime | P1 |

**Music:** none for the prototype ⚑ (overridable). The bounce-tick pitch decay is the game's melody; ambient music would fight the oscilloscope-quiet aesthetic. If playtests say it's too sterile, add a generative pad (2 detuned sines, slow LFO) behind a config flag `musicEnabled` (default `false`).

## 11. UI & screens

**Flow:** `Splash → Play (course 1..5, sequential) → Ace card → next course → … → Campaign-complete card → Splash`. Pause overlay reachable from Play. (P1: course-select grid on the splash showing per-course records; P0 has only "Play" which resumes at the first incomplete course.)

**Splash screen (mandatory, P0):**

- Title: **GHOSTLINE GOLF** + one-liner: "Every hole is a hole-in-one. Miss once, and the ghosts show you how."
- Rules, ≤5 bullets:
  - Set **angle** and **power**. Take the shot.
  - Only a **hole-in-one** counts. A miss just teaches.
  - After your first miss, **ghost lines** reveal how others fared — **green** lines aced it.
  - Copy the green line… if you can find its exact numbers.
  - Beat **par** by acing with fewer bounces.
- Controls block (two columns: Desktop keys / Touch), condensed from §5.
- Version number, bottom-right: `v0.1.0`, sourced from `GAME_VERSION` constant in `config.js` (splash, pause overlay, and debug overlay all read this constant).
- One large **PLAY** button (accent color). Mute toggle icon. Best-stats line if any records exist ("Courses aced: 3/5 · Best: The Pocket in 2 bounces").

**Play screen / HUD (always visible):**

- Top-left: course name + `COURSE 3/5` + `PAR 2 BOUNCES`.
- Top-center (during/after a shot): live **bounce counter**, big, counts up as the ball bounces.
- Top-right: attempts counter, ghost-toggle icon, mute icon, pause icon.
- Bottom bar: **ANGLE** slider + steppers + readout (`217.35°`), **POWER** slider + steppers + readout (`63.4`), **SHOOT** button. Readouts monospace, tabular.
- After `skipUnlockAttempts` misses: small "Skip course →" link appears under the attempts counter.

**Ace card (end-of-course overlay):** result banner (ACE / BROKE THE COURSE / FIRST TRY), bounces vs par, attempts used, best-ever for this course, rotating deadpan sub-line, buttons: **Next course** (primary), Replay this course, Splash.

**Campaign-complete card:** per-course table (par / your best bounces / attempts), total attempts, **Play again** + Splash. P1: "Try infinite mode" if implemented.

**Pause overlay:** Resume, Restart course (ball + dials reset; history kept), Mute, Quit to splash. Game sim is frozen underneath.

## 12. Config & tuning

Single exported object in `src/config.js`; every value below lives there and nowhere else. `GAME_VERSION = "0.1.0"` lives in the same file.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `powerToSpeed` | 12 | px/s per power unit | Launch speed = power × this (power 100 → 1200 px/s) |
| `minPower` | 1.0 | power | Slider minimum |
| `friction` | 90 | px/s² | Constant deceleration; sets max travel (~8000 px at power 100) |
| `restitution` | 0.85 | ratio | Speed kept after wall bounce |
| `restSpeed` | 5 | px/s | Below this, ball is at rest → attempt resolves |
| `ballRadius` | 8 | px | Collision + draw size |
| `holeRadius` | 12 | px | Capture distance (center to center) |
| `captureSpeed` | 240 | px/s | Max speed at which the hole captures; faster = lip-out |
| `wallThickness` | 6 | px | Draw thickness (collision uses segment + ballRadius) |
| `boundaryInset` | 20 | px | Outer wall inset from 960×540 playfield |
| `angleStep` | 0.05 | degrees | Dial resolution |
| `angleStepCoarse` | 1.0 | degrees | Shift/long-press step |
| `powerStep` | 0.1 | power | Dial resolution |
| `powerStepCoarse` | 5.0 | power | Shift/long-press step |
| `aimStubLength` | 120 | px | Length of true-trajectory aim preview |
| `simHz` | 240 | steps/s | Fixed physics timestep (determinism) |
| `simMaxSeconds` | 20 | s | Hard cap per shot simulation |
| `bounceCooldownMs` | 30 | ms | Min gap between counted bounces |
| `failResetDelayMs` | 900 | ms | Rest → ball back on tee |
| `revealDurationMs` | 2500 | ms | Ghost reveal animation length |
| `ghostGrayCount` | 300 | lines | Synthetic crowd size per course |
| `ghostGrayAlpha` | 0.10 | alpha | Gray line opacity |
| `ghostGreenAlpha` | 0.9 | alpha | Solution line opacity |
| `ghostBlueAlpha` | 0.45 | alpha | Player line opacity |
| `ghostBlueMax` | 150 | lines | Most-recent own attempts drawn/stored per course |
| `skipUnlockAttempts` | 25 | attempts | Misses before "Skip course" appears |
| `solverAngleCoarse` | 0.5 | degrees | Solver pass-1 grid |
| `solverPowerCoarse` | 2.0 | power | Solver pass-1 grid |
| `solverMaxSims` | 200000 | sims | Solver budget per course |
| `musicEnabled` | false | bool | Generative pad on/off |

**URL flags (all P0 unless noted):**

- `?seed=1234` — overrides the gray-ghost RNG seed (and infinite-mode course seed, P2). Default seed is `0` → fully reproducible ghosts out of the box.
- `?debug=1` — debug overlay: FPS, sim state, ball speed/position, live bounce count, current (angle, power), version. Cheat keys while active: `H` loads the course's first baked solution into the dials (verifies solutions in situ), `1`–`5` jump to course, `A` instantly ace (advances flow for UI testing).
- `?course=3` — start on course 3 (unlock checks bypassed).
- `?ghosts=0` — disable gray ghosts (A/B the reveal); `?ghosts=1000` — override `ghostGrayCount`.
- `?skip=1` — skip splash straight into play.
- `?solver=1` — runs the solver on the current course in-page and prints found solutions as JSON to console (dev tool; also usable to re-bake after editing geometry).
- `?mode=infinite&seed=…` — P2 infinite mode.

## 13. Tech stack

**Vanilla JavaScript (ES modules), Canvas 2D, zero-build.** A single `index.html` loading `src/*.js` modules — copy the folder to any static host and it runs; this matches the deploy target (a folder inside a GitHub Pages site) and removes all toolchain risk. **No physics library**: the sim is one moving circle vs. ~40 static line segments — swept-circle vs. segment with fixed 240 Hz substeps is ~60 lines of code, and hand-rolling it is the only way to guarantee the bit-exact determinism the whole design rests on (Matter.js does not promise cross-version/cross-build determinism, and we need the *same* sim to run headless in the solver, the ghost generator, and live play). Web Audio API directly (no Howler — no audio files to manage). Rendering is three layers: a static course layer, an offscreen pre-rendered ghost layer (redrawn only on reveal/new blue line), and a dynamic layer (ball, stub, HUD) — so per-frame cost is one image blit + one circle, trivially 60 fps on a mid-range laptop. Perf budget: ≤ 600 gray ghosts (~40k cached polyline points), ≤ 40 walls/course, zero per-frame allocations in the sim loop. The solver runs the same `sim.js` in Node (`tools/solve.mjs`) or in-browser via `?solver=1`.

## 14. Milestones

**M0 — Toy loop.** *Goal: prove that dialing in a bank shot to an exact ace is satisfying, with rectangles.*
Deliverables: `sim.js` (headless, deterministic), courses 1–2 as data, canvas render (placeholder shapes), angle/power via keyboard + sliders, aim stub, shoot, bounce counter, ace/miss resolution, auto-reset, attempt counter. No ghosts, no audio, no splash.
Acceptance criteria:
- [ ] Course 2's bank-shot ace is achievable by a developer within 15 attempts using only stub + dials.
- [ ] Running the same (angle, power) twice produces an identical trajectory (positions hashed per step match exactly).
- [ ] `sim.js` runs in Node with no DOM and returns `{result, bounces, polyline}` for a given course + shot.
- [ ] Ball never escapes the boundary or tunnels through a wall at power 100 (tested at 0.05° increments across 720 solver-grid shots).
*Proves: the dial-in loop is engaging before any ghost content exists. If adjusting numbers toward a known bank shot is boring here, stop — the reveal won't save it.*

**M1 — Real rules.** *Goal: the full P0 game.*
Deliverables: all 5 courses with solver-baked solutions and verified pars (`tools/solve.mjs` output committed into course data); ghost system (gray seeded crowd, green solutions, blue own-attempts with `localStorage` persistence); the one-time reveal (instant, unanimated); skip-course rule; splash screen (rules, controls, version, PLAY); HUD; ace card; pause overlay; campaign completion; `?course`, `?skip`, `?ghosts` flags.
Acceptance criteria:
- [ ] Solver finds ≥1 solution for every course; each course's par equals its minimum found bounce count; `?debug=1` + `H` confirms each baked solution aces live.
- [ ] A first-time player understands the goal from the splash and takes their first shot within 60 seconds, unprompted.
- [ ] After the first miss, ghost lines appear and a first-time player can explain unprompted what green vs gray means.
- [ ] Reloading the page preserves course progress, records, and blue ghost lines.
- [ ] Courses 1–3 are each aceable by a playtester in under 6 minutes.

**M2 — Feel.** *Goal: the reveal lands as a moment.*
Deliverables: staggered reveal animation + whoosh (skippable); all P0 SFX + mute; palette/vignette/typography pass; green-line pulse; ball motion-stretch; bounce-tick pitch decay; ace card polish + rotating sub-lines; count-up bounce counter; touch layout pass (steppers, SHOOT button, pause menu) verified on a phone.
Acceptance criteria:
- [ ] The reveal animation completes in ≤3 s, is skippable by click/tap, and at least one playtester reacts audibly or comments on it unprompted.
- [ ] All P0 sounds fire; no audio before first user gesture; mute persists across reloads.
- [ ] 60 fps sustained during the reveal and with 600 ghosts on a mid-range laptop (`?ghosts=600&debug=1`).
- [ ] Game is playable start-to-finish on a phone via touch controls only.

**M3 — Playtest build.** *Goal: shippable, measurable, reproducible.*
Deliverables: `?seed` reproducibility verified; full debug overlay + cheat keys; deployed to the static host (`/games/minigolf-hole-in-one/`); README-level playtest notes (the §2 questions); P1 items if time allows in this order: course-select grid with records → numeric readout entry → ghost filter cycling polish → P1 SFX. P2 (infinite mode) only if everything above is done.
Acceptance criteria:
- [ ] Same URL + same `?seed` shows identical ghost crowds on two different machines.
- [ ] The deployed build runs from static hosting with zero runtime network requests (verified in devtools Network tab).
- [ ] `?debug=1`, `?course=n`, `?ghosts=n`, `?skip=1`, `?solver=1` all function on the deployed build.
- [ ] Two external playtesters complete courses 1–3 and answer the §2 questions.

## 15. Open questions

1. **Does the aim stub trivialize green-line copying?** (non-blocking — resolve in playtest; knob: `aimStubLength`, try 60/120/200; `?debug` can override via console.)
2. **Is 300 gray ghosts readable or noise?** (non-blocking — `?ghosts=n` A/B at 100/300/600.)
3. **Does restitution 0.85 make 5-bounce solutions require near-max power, compressing the useful power range on course 5?** (non-blocking — solver output will show the solution's power values; retune `restitution`/`friction` if solutions cluster above power 90.)
4. **Is a lip-out (roll-over at speed) legible without any visual feedback?** (non-blocking — if playtesters miss it, add a white "ring flash" on roll-over in M2; decided default: no flash.)
5. **Should green lines exist for the player's *current-best* route once they've aced, to support bounce-count improvement runs?** (non-blocking — blue lines already cover this; revisit only if playtesters ask.)
6. **Course 3–5 geometry may need gap-width tuning to be solver-solvable at the intended par.** (blocking for M1, mechanical to resolve: authoring rule is — run solver; if no solution, widen the intended-route gaps by 10 px and re-run; if solved below intended par, extend the blocking wall 10 px toward the exploited route and re-run. Iterate ≤5 times; if still wrong, simplify the course to the closest working variant and set par from solver truth.)

## 16. Handoff notes for Fable

**Build order:** `config.js` → `sim.js` (headless: course geometry types, swept-circle physics, shot → `{result, bounces, polyline}`) → `tools/solve.mjs` (grid search: pass 1 at `solverAngleCoarse`×`solverPowerCoarse`, pass 2 refines ±1 grid cell around hits at full 0.05°/0.1 resolution; dedupe solutions closer than 1°/2 power; emit JSON) → `courses.js` (geometry below + baked solutions) → `render.js` (three-layer canvas) → `input.js` (dials, drag-aim, keys, touch) → game state machine in `main.js` (aim → flight → resolve → reveal/advance) → `ghosts.js` (seeded crowd gen, offscreen layer, localStorage blue lines) → `ui.js` (splash/HUD/cards/pause) → `audio.js` → juice pass.

**Keep headless-testable:** `sim.js` and `ghosts.js`'s sampling must not touch `window`/`document`/`performance` — pass RNG and config in. Unit tests to write first: reflection math vs known angles, corner tie-break, bounce cooldown, capture-vs-rollover speed threshold, determinism hash (run shot twice, compare polylines), tunneling at max power.

**Repo / deploy layout** (the folder is the deployable — zero build):

```
public/games/minigolf-hole-in-one/
├── design.md            (this document)
├── index.html           (splash + canvas + HUD DOM, loads src/main.js as module)
├── src/
│   ├── config.js        (CONFIG object + GAME_VERSION — the only tuning surface)
│   ├── sim.js           (headless deterministic physics)
│   ├── courses.js       (5 course defs + solver-baked solutions)
│   ├── ghosts.js        (seeded crowd, blue-line persistence)
│   ├── render.js  ├── input.js  ├── ui.js  ├── audio.js  └── main.js
├── tools/
│   └── solve.mjs        (node tools/solve.mjs [courseId] → solutions JSON)
└── tests/
    └── sim.test.mjs     (node --test; no DOM)
```

**Course geometry (playfield 960×540, boundary at inset 20 — i.e., walls of rectangle (20,20)–(940,520) — is implicit in every course; angle 0° = east, CCW positive):**

- **C1 Straight Shot** — tee (120,270), hole (840,270), no inner walls. Intended par 0.
- **C2 One Cushion** — tee (120,270), hole (840,270). Inner wall: (480,20)–(480,400). Direct line blocked; bank off the bottom boundary through the (480,400)–(480,520) gap. Intended par 1.
- **C3 The Pocket** — tee (120,400), hole (830,110). Alcove around the hole opening down-left: walls (760,60)–(920,60), (920,60)–(920,180), (760,60)–(760,140). Plus mid-field wall (450,200)–(450,520) blocking the low direct route. Intended par 2 (e.g., bank right boundary → top boundary → into the alcove mouth).
- **C4 Hallway of Mirrors** — tee (100,480), hole (860,80). Zigzag baffles: (250,20)–(250,380), (450,160)–(450,520), (650,20)–(650,380). Intended par 3 (thread the offset gaps with banks off top/bottom boundaries).
- **C5 The Vault** — tee (120,270), hole (850,270). Vault chamber: walls (700,120)–(940,120) is redundant with boundary — instead: (700,140)–(700,250), (700,290)–(700,420), i.e., a wall at x=700 with a 40 px slit centered on the hole's y, slit walls angled: replace with two diagonal lips (700,250)–(730,270) and (700,290)–(730,270) forming a funnel that only admits shallow-angle entries; plus scatter walls (300,20)–(300,200), (300,340)–(300,520), (500,150)–(500,390). Intended par 5.
- Apply the §15-Q6 authoring rule after running the solver on each; commit solver-verified pars and solutions into `courses.js`.

**Reminders:** prove the loop with rectangles before any art effort — if M0's dial-in loop isn't fun, stop. Ship every milestone runnable. The ghost lines are final art from the moment they exist; spend the M2 budget on the reveal moment and the bounce-tick audio, not on drawing a prettier ball. Never render trajectory parameters next to a ghost line (§3 pillar 4). All tuning goes through `config.js` — if you find yourself typing a magic number anywhere else, move it there.
