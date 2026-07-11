# GLUTTON — Game Design Document

> Source idea: [Game Idea 16 - Expanding Body Platformer (Theme: Body Horror)](/game-idea-16-expanding-body-platformer-theme-body-horror)

---

## 1. Title & one-liner

**Working title:** GLUTTON

**Alternates:** Second Stomach · Growing Concern · Body of Work · Meat Cute · Ouroborrow

**One-liner:** A turn-based snake-body puzzle platformer where eating monsters grants you their powers — and every bite makes your body one segment longer and one segment harder to live with.

**Genre:** Turn-based puzzle platformer (Snakebird-like grid logic) with Kirby-style power absorption, body-horror theme played for dark comedy.

**Elevator pitch:** You are a small fleshy worm in a meat cave. To escape each chamber you must eat the paralyzed creatures living there — a drill beetle, a moth, a leech — and each meal becomes a new living segment of your body, its power usable only when it is your head. Your body follows your head like classic Snake, obeys gravity as one rigid slab of meat, and never gets shorter. Length lets you bridge chasms and stand tall — but it also clogs tunnels, blocks your own path, and eventually you are too much creature to fit through the spaces that used to be easy. Every room asks the same question: how little can you bear to eat?

**Adaptation note:** The source idea says "platformer"; this design deliberately adapts it to **turn-based grid movement with resolved-per-turn gravity** (Snakebird model) rather than real-time physics, because a real-time N-segment snake under platformer physics is a controls nightmare, while turn-based makes the body a readable, deterministic puzzle object. ⚑ (overridable)

---

## 2. Fun hypothesis

**The question this prototype answers:** *Is it fun when the power-ups you need are also permanent liabilities — does eating feel like a meaningful, slightly regrettable bargain instead of a pure reward?*

Everything in P0 serves this: powers only come from eating, eating only ever grows you, growth is permanent within a room, and at least one room (Room 5, "The Banquet") is failable purely by having eaten one grub too many.

**Playtest questions (ask after someone plays):**

1. When you saw food you didn't need, were you tempted, wary, or indifferent?
2. Did you ever feel your own body was the puzzle (blocking you, or bridging for you)? Describe the moment.
3. Was switching powers (TAB) understandable? Did you ever forget which segment was your head's power?
4. Did getting stuck because you were "too long" feel like a fair lesson or a cheap trick?
5. Did you use Undo freely, or did dying/softlocking feel punishing?

---

## 3. Design pillars

1. **Every bite is a bargain.** Growth = power = liability. No food is ever a free reward. Any feature that makes eating purely good gets cut.
2. **The body is the puzzle.** Your segments are terrain: they bridge, they block, they support. Levels are built around the snake's own mass.
3. **Deterministic and undoable.** Turn-based, no twitch, no randomness in the sim, unlimited undo. The player should always feel "I could have known that."
4. **Wet, gross, charming.** Body horror as dark comedy — squelches, sphincter doors, a cute worm with too many mouths. Never gory-realistic.

---

## 4. Core game loop

**Session target:** 5 rooms, 6–10 minutes for a first full playthrough. Each room is a 1–3 minute puzzle.

```
        ┌──────────────────────────────────────────────┐
        │                                              │
        ▼                                              │
  [ SURVEY ]  see room, food, hazards, exit            │
        │                                              │
        ▼                                              │
  [ COMMIT ]  eat a creature → gain its power,         │
        │     grow +1 segment (permanent this room)    │
        ▼                                              │
  [ MANEUVER ] move / TAB-shift powers / drill / fly / │
        │      grip — while managing your own bulk     │
        ▼                                              │
  [ SQUEEZE ]  reach the exit orifice with your head — │
        │      or realize you're too big, UNDO, and    │
        │      eat less next time                      │
        ▼                                              │
  [ ROOM CLEAR ] slurp through the exit → next room ───┘
```

- **Survey:** player sees the whole room at once (single screen), reads hazards (acid, spikes), spots food and the exit. *Feels:* planning, mild dread ("I'm going to have to eat that").
- **Commit:** moving the head into a creature's cell eats it. A new segment of that creature's type appears behind the head; the eaten power becomes the head's power immediately. *Feels:* power rush undercut by watching yourself get longer.
- **Maneuver:** grid moves, one cell per input; gravity resolves after every action; TAB rotates which power is at the head. *Feels:* competence, then friction as the body starts getting in the way.
- **Squeeze:** the endgame of each room is fitting your now-larger self through the final geometry. *Feels:* tension, payoff — or the "oh no, I'm too big" realization the whole game is built to produce.

---

## 5. Inputs & controls

Desktop is the primary target. **Touch is viable** (turn-based grid games are ideal for touch) and is P1 via swipes + on-screen buttons.

| Action | Desktop | Touch (P1) | Notes |
|---|---|---|---|
| Move head up/down/left/right | Arrow keys / WASD | Swipe in direction | One cell per press. Pressing into a wall consumes no turn (updates facing for eye rendering only). |
| Shift powers toward head (peristalsis) | TAB or C | Tap the body-strip HUD | Free action, but triggers gravity re-check. |
| Shift powers toward tail (reverse cycle) | SHIFT+TAB or X | Long-press body-strip | Free action, gravity re-check. |
| Undo last action | Z or Backspace | Two-finger tap / UNDO button | Unlimited, works after death. |
| Restart room | R | RESTART button | Confirm not required; undo can un-restart. |
| Pause / resume | P or Esc | PAUSE button | Overlay with resume/restart/mute. |
| Mute / unmute | M | Speaker icon | Always visible. |
| Advance splash / dialogs | Enter / Space / click | Tap | |
| (debug only, `?debug=1`) next room / grow / shrink | N / G / L | — | See section 12. |

No other inputs exist. There is **no reverse-the-snake button** in P0 — the snake only moves head-first, which is what makes dead-end pockets dangerous and length meaningful. ⚑ (overridable — a reverse would trivialize Rooms 2 and 5 as designed; if added later, gate it behind `cfg.enableReverse` default `false`.)

---

## 6. Game elements

### 6.1 The snake (player)

- Occupies N orthogonally-chained grid cells. Starts each room at `cfg.startLength` = 2 (two Plain segments).
- **Body-follow rule (position history):** on a move, the head advances one cell in the input direction; every other segment moves into the cell the segment ahead of it just vacated. The body exactly retraces the head's path.
- **Self-collision:** the head may not move into a cell occupied by its own body, **except** the tail's current cell (the tail vacates on the same tick) — and not even the tail cell if a growth is pending this move (tail frozen).
- **Gravity (rigid slab):** after every state-changing action (move, eat, power shift), the snake falls one cell at a time until **any segment** has a solid cell directly beneath it (rock, dirt, uneaten food, exit frame — food is solid to stand on). Segments do not support themselves (own body never counts as support). Falling continues cell-by-cell, re-checking support (and Grip, see 6.3) each cell. If any segment enters acid/spikes or leaves the bottom of the grid during a fall: death.
- **Eating:** moving the head into a food/creature cell eats it: the creature is removed, the snake grows by 1 (tail does not vacate on that move), a new segment of the creature's type is inserted **directly behind the head**, and **the creature's power immediately becomes the head's power** (the head slot takes the new type; prior head type shifts back one). There is no way to shrink. Multiple pending growths queue (one per move).
- **Powers live in segments:** the snake's type list is ordered head→tail. Only the head slot's power is active. TAB rotates the whole type list one step toward the head (head's type wraps to the tail); SHIFT+TAB rotates the other way. Rotation changes types only — the body's cells never move — but gravity/Grip is re-checked immediately after (shifting away from Wings mid-air makes you fall; this is used in puzzles).
- **Facing:** the direction of the last attempted move; rendering only (eyes/mouth).
- Placeholder art: colored 1-cell rounded squares, head has two white eye dots. Final: chunky flat-vector segments with thick outline, each power type a distinct color + tiny icon (see section 9).

### 6.2 Creatures (food) — all inert in P0 (paralyzed prey; no AI, no damage)

All creatures: solid (snake can stand on them), eaten on deliberate head move into their cell, never respawn within a room. Config keys under `cfg.powers.*`.

| Creature | Segment color | Power when at head |
|---|---|---|
| **Grub** (Plain) | dusty pink `#d8b8c0` | None. Pure length. The trap food. |
| **Beetle** (Drill) | amber `#f2a541` | **Drill:** the head may move into DIRT cells, destroying them (the move happens; dirt is gone permanently). Works in any direction. Passive-on-move; no extra button. |
| **Moth** (Wings) | pale blue `#9fd8f0` | **Wings:** gravity is skipped entirely while the Moth segment is the head. The snake can move up through open air freely. Shifting Wings away from the head mid-air causes an immediate fall. |
| **Leech** (Grip) | dark red `#c0455f` | **Grip:** the snake does not fall as long as the head is orthogonally adjacent to at least one solid cell (walls, ceilings). Enables wall climbs and ceiling crossings; stepping away from the surface (or shifting Grip off the head) drops you. Checked during falls too — a gripping head arrests a fall the moment it passes adjacent to solid. |

⚑ (overridable) Wings strictly dominates Grip in open air; they are differentiated by level placement (no room contains both in P0), which is fine for a prototype.

### 6.3 Terrain & objects

| Element | Symbol (level data) | Behavior | Placeholder |
|---|---|---|---|
| Rock wall | `#` | Solid, indestructible. | dark purple square |
| Empty | `.` | Passable air. | background |
| Dirt | `D` | Solid; destroyed when a Drill head moves into it. | brown square, dotted |
| Acid | `~` | Kills on any segment overlap (moves and falls). Not solid. | bright green, animated wobble (M2) |
| Spikes | `^` | Kills on any segment overlap. Occupies its cell (not solid for support — you can never safely be above one). | bone-white triangles |
| Exit (orifice) | `E` | Solid-framed opening; room is cleared the instant the **head** moves into it (whole body slurps in during the clear animation; body cells are ignored once the head is in). Always open. | pink ring, pulsing |
| Grub / Beetle / Moth / Leech | `g` / `B` / `m` / `L` | See 6.2. | colored circles with letter |
| Snake start | `H` (head) `b` (body, head-adjacent first) | Spawn position, facing away from its neighbor segment. | — |
| Hint text | per-room string | One line of wall-graffiti per room (e.g. "TAB shifts your meat"). Rendered faintly in the background. | small text |

---

## 7. Rules, win & lose conditions

- **Turn structure:** input → validate move (blocked = no turn, update facing) → apply move (+eat/grow, +dirt destroy) → resolve gravity/Grip until stable → check death → check exit. Power shifts (TAB) skip the move step but still resolve gravity and death.
- **Win (room):** head enters `E`. Immediately clear — even if a segment overlaps nothing legal-looking behind it. Room-clear interstitial (1.5 s) → next room.
- **Win (game):** clear Room 5 → end screen with total moves, total bites, per-room bite counts, and restart.
- **Lose (death):** any segment overlaps acid or spikes, or any part of the snake falls out of the grid. Death animation (0.6 s splat), then a "You burst. Z = undo · R = restart" prompt. Undo steps back to the pre-death state.
- **Softlock:** possible by design (dead-end pockets, over-length). No detection in P0 — Undo and Restart are the answer, and the death/HUD hint text mentions them. ⚑ (overridable — a "stuck?" detector is P2.)
- **Scoring:** move counter and bite counter per room, shown on HUD and end screen. No par values in P0 (P1: hand-tuned pars).
- **Edge cases (decided):**
  - Eating while a growth is already pending: growths queue; tail stays frozen one move per queued growth.
  - Falling through/onto food: food is never eaten by falling — it is solid, so the snake lands on it (grubs double as platforms; this is intended and emergent).
  - Head enters exit and food simultaneously: impossible (one cell per move); exit check runs last regardless.
  - Moving into the tail cell: legal unless growth pending.
  - TAB with all-Plain body: legal no-op (squelch sound).
  - Undo after room clear: not available (undo stack resets per room).
  - Pressing a direction while falling/animating: inputs are queued (buffer of 1) and applied after resolution.

---

## 8. Difficulty & progression

Single tuned difficulty. Progression is **knowledge, not stats**: each room introduces exactly one idea and the last room combines them plus the gluttony trap.

| Room | Teaches | New elements |
|---|---|---|
| 1 Hatchling | move, climb a step, eat = grow, length bridges gaps, acid kills, undo | grub, acid |
| 2 Cramped Gut | dead ends are dangerous, the 2×2 bulb U-turn, Drill, TAB | beetle, dirt, bulb, spikes (visual threat) |
| 3 The Belfry | Wings, vertical navigation, harmless temptation grub | moth |
| 4 The Undercroft | Grip, wall/ceiling climbing, shift-off-Grip controlled drop | leech |
| 5 The Banquet | everything + restraint: extra bites make the mandatory bulb impossible | temptation grubs, multi-power sequencing |

Cross-room state: none — each room resets length to 2. ⚑ (overridable — persistent length across rooms is the more hardcore version of the hypothesis; it is a P2 toggle `cfg.persistLength`, default `false`, because it makes rooms untestable in isolation.)

Config knobs for difficulty live in section 12 (`bulbSize` via level data, `startLength`, `cycleCostsTurn`).

---

## 8.5 The five rooms (P0 level data)

Legend: `#` rock · `.` empty · `D` dirt · `~` acid · `^` spikes · `E` exit · `g` grub · `B` beetle · `m` moth · `L` leech · `H` head · `b` body. Grids are exact level data (strings in `levels.js`). Each room lists its intended solution so the implementer can verify solvability with a headless test.

### Room 1 — "Hatchling" (12×9)

```
############
#..........#
#..........#
#..........#
#..........#
#bH.g....E.#
#####..#####
#####~~#####
############
```

Hint text: "EAT TO GROW. GROWN MEAT BRIDGES."
**Solution:** Right ×2 (eat grub at x4, length 3), Right ×5 across the 2-wide acid gap (with length 3 at least one segment is always over solid), head enters E. A length-2 snake attempting the gap falls into the acid — the intended first death, teaching Z/undo via the death prompt.

### Room 2 — "Cramped Gut" (14×9)

```
##############
#....#####...#
#bH.......B..#
##D########..#
#..........###
#..........E.#
####^^^#######
#...........##
##############
```

Row map: y1 ceiling over the tunnel (open bulb at x10–12); y2 the 1-tall tunnel, beetle at (10,2) inside a 2×2 bulb spanning (10–11, y1–2)... **canonical layout:** the tunnel (y2, x4–9) is 1-tall; it opens into a 2-wide × 2-tall bulb (x10–11, y1–y2) with the beetle at (10,2). Dirt column at (2,3) under the start chamber. Cavern below (y4–5) with the exit at (11,5); spikes at (4–6, y6) are visible flavor under a rock shelf, not on the path.

Hint text: "TAB SHIFTS YOUR MEAT. NEVER ENTER WHAT YOU CANNOT LEAVE."
**Solution:** Right along the tunnel into the bulb; eat beetle (length 3, Drill becomes head immediately); U-turn inside the 2×2 bulb (up, left — legal at length ≤4), walk back left through the tunnel to the start chamber; head over the dirt at x2; Down (drill destroys dirt), fall into the cavern; walk right to E. Teaches that a 1-tall dead-end would have been a softlock — the bulb is the only reason you got out.

### Room 3 — "The Belfry" (12×11)

```
############
#.........E#
######.....#
#.......g..#
#.....######
#..........#
######.....#
#..........#
#..........#
#bH..m.....#
############
```

Hint text: "WINGS AT THE HEAD, WEIGHT AT THE TAIL."
**Solution:** Right ×3 (eat moth at (5,9); Wings become head; length 3). Fly the zigzag: up through the y6 baffle gap (right side), left, up through the y4 gap (left side), right, up through the y2 gap (right side), right to E at (10,1). The grub at (8,3) is pure temptation — eating it (length 4) changes nothing here, but the end screen counts bites. First seed of "did I need that?"

### Room 4 — "The Undercroft" (16×10)

```
################
#..............#
#..............#
#............E.#
#...........####
#..............#
#bHL...........#
####...........#
#~~~~~~~~~~~~~~#
################
```

Hint text: "GRIP HOLDS. LET GO ON PURPOSE."
**Solution:** Right (eat leech at (3,6); Grip head; length 3). Climb the left wall: Up ×5 hugging x0 (head at (1,y), always adjacent to the border wall). Cross under the ceiling: Right ×12 along y1 (head adjacent to y0 ceiling the whole way; the acid lake glows below). At (13,1), press Down — the head at (13,2) is adjacent to nothing, Grip breaks, and the snake falls as a slab, landing on the right ledge (solid at x12–14, y4) at walk row y3. Walk left to E at (12,3). Letting go anywhere over open acid is death; Grip is only as safe as your plan.

### Room 5 — "The Banquet" (16×12)

```
################
#............E.#
#..........####.
#..........#####
#....g.....D...#
#####.##########
#bH.B..g...##..#
#####.#####.#m.#
#....#.....##..#
#.g..#.....#####
#....#......####
################
```

**Canonical layout (authoritative over the sketch above):** four beats, left to right —

1. **Start shelf** with the beetle at (4,6) directly in the path (forced eat, length 3, Drill head).
2. **Temptation alley:** a 2-tall corridor with a grub at floor level at (7,6). Because the corridor is 2 tall, the grub is avoidable: step up, pass over its cell along the upper row, step down. Two more decoy grubs sit in a side pocket at (2,9) and on a shelf at (5,4) — both reachable, both poison for the endgame.
3. **Dirt wall:** a 1-cell dirt plug at (11,4) at standing height; Drill head walks through it.
4. **The bulb & the shaft:** a 1-wide corridor leads to a 2×2 bulb (x12–13 across y7–8) containing the **moth at (13,7)**. Enter at length 3, eat the moth inside the bulb (length 4, Wings head), and complete the U-turn — **a 2×2 bulb is escapable if and only if length ≤ 4** (the head re-enters the bulb's first cell exactly 4 steps after first visiting it; at length ≤4 the tail has just vacated it, at length ≥5 it is still occupied and every other cell is walled — softlock). Exit the corridor, then fly: the shaft at x13–14 rises from y6 to the top corridor (y1), Wings head straight up, left to E at (12,1).

Hint text: "THE TABLE IS SET. YOU DO NOT HAVE TO CLEAR IT."
**Solution (clean):** eat exactly beetle + moth (final length 4). Any single decoy grub eaten anywhere makes the bulb U-turn geometrically impossible, discovered at the far end of the room — Undo (full history) or Restart. This room is the fun-hypothesis test in its purest form.

⚑ (overridable) Exact coordinates in Rooms 2 and 5 may need ±1-cell adjustment during M0 implementation; the *structural invariants* are the spec: Room 2 = 1-tall tunnel + 2×2 bulb + drillable floor; Room 5 = forced beetle → avoidable grubs → dirt plug → moth inside a 2×2 bulb → wings shaft, with required length exactly 4. A headless solver test per room (scripted solution replay) is required in M1 to lock them.

---

## 9. Style & theme

- **Visual style:** flat vector, thick dark outlines (3 px), rounded 1-cell snake segments with a subtle 1-px inner highlight; chunky readable grid at `cfg.tileSize` = 40 px. No gradients except the acid glow. Body horror rendered cute-gross: think **Snakebird meets Carrion**, or "Nokia Snake lost in a meat cave."
- **Palette (12 colors):**
  - Background cave: `#14101c` · Rock fill: `#3a2b3d` · Rock outline: `#241a2e`
  - Dirt: `#6e5433` · Acid: `#a8e04a` · Spikes: `#cfd2d6`
  - Snake plain/grub: `#d8b8c0` with outline `#7a2d43` · Beetle amber: `#f2a541` · Moth blue: `#9fd8f0` · Leech red: `#c0455f`
  - Exit orifice: `#d05f7c` · UI text: `#efe6f2`
- **Typography:** system stack `"Courier New", monospace` for HUD/hints (biology-lab-notes vibe); splash title in the same mono, huge, letter-spaced.
- **Tone:** deadpan gross. Room names and hint graffiti carry the humor; no gore sprays, deaths are a cartoon *pop* into pink particles.
- **Placeholder plan (M0–M1):** flat colored squares, food as circles with a letter, snake head gets two white pixel eyes, exit is a magenta ring. All final art is code-drawn Canvas shapes — zero image assets at every milestone.

---

## 10. Sound design

- **Implementation:** Web Audio API with a tiny ZzFX-style synth function in `audio.js` — all SFX generated in code, zero audio assets. Audio context is created/resumed only on the first user gesture (splash click), per browser autoplay policy. **Mute toggle (M) is P0** and persists in `localStorage`.
- **Music:** none in P0–M2. P1: a generative low drone (two detuned sine oscillators + slow LFO on a lowpass filter) started after the first gesture. Never any copyrighted tracks.

| Game event | Sound description | Priority |
|---|---|---|
| Move step | short soft squish, pitch varies ±10% | P0 |
| Eat | wet crunch + gulp (two-stage) | P0 |
| Power shift (TAB) | slithery peristalsis ripple | P0 |
| Drill through dirt | crumbly noise burst | P0 |
| Death | splat + descending pitch | P0 |
| Room clear | ascending burble + tiny fanfare-burp | P0 |
| Undo | reversed blip | P0 |
| Blocked move | dull thud | P0 |
| Grip attach | suction schlup | P1 |
| Fall landing | meaty thump, volume scales with fall distance | P1 |
| Menu/click | dry tick | P1 |

---

## 11. UI & screens

**Flow:** Splash → Room 1…5 (with 1.5 s clear interstitial between) → End screen → (restart → Splash). Pause overlay reachable from any room.

- **Splash (mandatory):**
  - Title "GLUTTON" + one-liner: "Eat monsters. Steal powers. Regret every bite."
  - Rules in 5 bullets: ① Arrows/WASD move your head; your body follows. ② Walk into a creature to eat it — you gain its power and a segment, forever. ③ Only the HEAD's power works; TAB shifts powers along your body. ④ Acid and spikes burst you; Z undoes anything, R restarts the room. ⑤ Reach the pink orifice. You can always eat more. You usually shouldn't.
  - Controls block (desktop + touch), version number bottom-right (`v0.1.0` from the single `VERSION` constant in `config.js` — splash and debug overlay both read it), and one huge PLAY button (click / Enter / tap).
- **HUD (always visible during play):** top bar — room number+name, move count, bite count; **body strip** — the ordered segment types as colored chips, head leftmost with an eye icon and the active power's name ("DRILL"); bottom-right — Z undo · R restart · P pause · M mute icons. Room hint graffiti is in-world, not HUD.
- **Room-clear interstitial:** room name, moves, bites ("3 bites — glutton" / "2 bites — restrained" at `cfg.biteBrag` thresholds), auto-advance 1.5 s or key to skip.
- **Death prompt:** dark overlay strip: "You burst. Z = undo · R = restart."
- **End screen:** total moves, total bites, per-room table, "MINIMUM VIABLE MEAL" badge if total bites = 8 (the forced minimum: 1+1+1+1+2 +2 start... exactly the 6 mandatory creatures), restart button.
- **Pause overlay:** resume, restart room, mute, back to splash.

---

## 12. Config & tuning

Single exported object `CFG` in `js/config.js`; the whole doc references these keys. `VERSION = "0.1.0"` lives in the same file.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `tileSize` | 40 | px | render scale (auto-shrinks to fit viewport) |
| `startLength` | 2 | segments | snake spawn size per room |
| `moveAnimMs` | 90 | ms | segment slide tween |
| `fallStepMs` | 60 | ms | per-cell fall animation |
| `clearPauseMs` | 1500 | ms | room-clear interstitial |
| `deathAnimMs` | 600 | ms | splat before prompt |
| `inputBuffer` | 1 | inputs | queued during animation |
| `cycleCostsTurn` | false | bool | TAB counts as a move (playtest knob) |
| `eatToHead` | true | bool | eaten power becomes head immediately vs. inserted behind head only |
| `enableReverse` | false | bool | X reverses head/tail (breaks Rooms 2/5 if true — playtest only) |
| `persistLength` | false | bool | carry body across rooms (P2 experiment) |
| `undoLimit` | 0 (unlimited) | steps | undo stack cap |
| `gripRange` | 1 | cells | orthogonal adjacency distance for Leech grip |
| `particleCap` | 100 | particles | death/eat effects budget |
| `shakePx` | 4 | px | screen shake on death |
| `sfxVolume` | 0.5 | 0–1 | master SFX gain |
| `biteBrag` | {restrained:0, glutton:2} | extra bites | interstitial flavor text thresholds |
| `roomOrder` | [1,2,3,4,5] | list | level sequence |

**URL flags:**
- `?room=N` — start at room N (playtest essential).
- `?debug=1` — overlay: FPS, snake length, type list, head power, grid coords under cursor, current fall/support state; cheat keys N (next room), G (grow +1 plain), L (shrink −1).
- `?seed=X` — seeds the RNG. The sim is deterministic (RNG is used only for SFX pitch/particles), but the flag is wired now so future procedural content is reproducible.
- `?mute=1` — start muted.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules), Canvas 2D, zero-build.** A turn-based grid game with ~20 entities per room needs no framework, no physics engine (gravity is a ten-line loop over segments), and no bundler; `index.html` + `js/*.js` modules deploy by copying the folder to any static host — which matches the target location `public/games/body-snake/` on GitHub Pages exactly. Canvas 2D over SVG because the render is a full-grid redraw with tweens and particles (simpler as immediate-mode), and over Pixi because total draw calls per frame are trivially under budget. Web Audio for synthesized SFX keeps the build 100% asset-free. Perf budget: one 16×12 grid, ≤40 snake segments, ≤100 particles — comfortably 60 fps on a mid-range laptop; no perf risk. The simulation (`sim.js`) is pure data-in/data-out with no DOM or Canvas references, so it runs headless under Node for tests.

---

## 14. Milestones

### M0 — Toy loop (prove it with rectangles)
**Goal:** the bargain is playable: move, eat, grow, fall, undo, in grey-box Rooms 1–2.
**Deliverables:** `sim.js` (grid, body-follow, gravity slab, eat/grow, drill, self-collision, death, exit), `levels.js` with Rooms 1–2, Canvas renderer (flat squares, no tweens), keyboard input, undo stack, restart, `?room=` flag.
**Acceptance criteria:**
- [ ] Rooms 1 and 2 are completable start-to-finish with keyboard only.
- [ ] Eating visibly grows the snake and switches the head power; TAB shifts powers and the shift is visible in the body colors.
- [ ] A length-2 snake dies in Room 1's gap; a length-3 snake crosses it (bridging works).
- [ ] Entering a 1-tall dead end without the bulb would softlock; Undo recovers from softlock and from death, every time, including multi-step.
- [ ] A headless Node script replays each room's scripted solution through `sim.js` and asserts victory.
- [ ] Gut check recorded: is maneuvering a growing body already interesting? **If not, stop here.**

### M1 — Real rules
**Goal:** full P0 game: all 5 rooms, all 4 powers, all screens.
**Deliverables:** Rooms 3–5, Wings and Grip, hazards complete, splash (rules, controls, version), HUD with body strip, death prompt, room-clear interstitial, end screen, pause, input buffering, hint graffiti.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds of the splash, unprompted.
- [ ] All 5 rooms completable; Room 5 verifiably fails (bulb softlock) if any optional grub was eaten, and the scripted-solution tests cover both the clean run and one gluttonous failure.
- [ ] Shifting Wings off the head mid-air causes a fall (Room 4's controlled drop works).
- [ ] Version number renders on splash from the single `VERSION` constant.
- [ ] No undocumented input does anything.

### M2 — Feel
**Goal:** wet, gross, charming.
**Deliverables:** palette art pass (rounded segments, eyes, power colors/icons, pulsing orifice, acid wobble), move/fall tweens (`moveAnimMs`, `fallStepMs`), eat pop + death splat particles (≤ `particleCap`), screen shake, all 8 P0 SFX via Web Audio synth, mute persistence.
**Acceptance criteria:**
- [ ] Every P0 SFX table row fires on its event; M toggles all audio; audio starts only after a user gesture.
- [ ] 60 fps sustained in Room 5 with a length-10 snake and a death splat (debug overlay FPS confirms).
- [ ] A viewer watching someone else play can tell what the head's power is at a glance.

### M3 — Playtest build
**Goal:** deployed and instrumentable.
**Deliverables:** `?debug=1` overlay + cheat keys, `?seed=`, `?mute=1`, touch controls (swipe + on-screen undo/restart/pause buttons) if time allows (P1), move-count pars (P1), deployed to the static host at `/games/body-snake/`.
**Acceptance criteria:**
- [ ] Game loads and is completable from the deployed static URL on Chrome and Firefox, offline after first load (no runtime network calls).
- [ ] `?room=5&debug=1` drops straight into an instrumented Banquet.
- [ ] Two external playtesters finish the game and answer the section 2 questions; answers recorded in the repo.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Should TAB cost a turn? Knob: `cycleCostsTurn`. Free feels kind; costing a turn matters only if move-count pars become a goal.
2. **(non-blocking — resolve in playtest)** Is Room 5's "discover the softlock at the far end" delightful or infuriating? If infuriating: add a visible length gauge next to the bulb entrance (a "MAX 4" bone scale carved in the wall) rather than changing the rule.
3. **(non-blocking — resolve in playtest)** Does eat-to-head (`eatToHead=true`) undercut the "switch to the segment you need" fantasy? Flipping to `false` forces a TAB after every meal — more fiddly, more thematic.
4. **(non-blocking — resolve in playtest)** Is per-room length reset (`persistLength=false`) hiding the best version of the hypothesis? A P2 "long haul" mode chains all rooms with one ever-growing body.
5. **(non-blocking)** Wings vs. Grip overlap (Wings dominates). If playtests show Grip feels redundant, replace Wings' free flight with limited flaps (charge-based) — config change plus one rule, no level changes needed for Rooms 1–4.
6. **(non-blocking)** Exact cell coordinates in Rooms 2 and 5 may shift ±1 during implementation; the structural invariants in section 8.5 are the contract, enforced by the headless solution-replay tests.

No blocking questions — the doc is implementable as written.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → `sim.js` (pure state machine: `newState(levelString)`, `step(state, action) → {state', events[]}`) → headless solution-replay tests (Node, no DOM) → `levels.js` (Rooms 1–2) → `render.js` (flat squares) → `input.js` → undo stack in `main.js` → Rooms 3–5 + powers → UI screens → tweens/particles → `audio.js`. Prove the loop with rectangles before any art effort; ship every milestone runnable.

**Keep headless-testable:** `sim.js` must import nothing and touch no DOM/Canvas/Web Audio. It returns an `events[]` list (`moved`, `ate:{type}`, `fell:n`, `drilled`, `died:{cause}`, `cleared`, `blocked`, `shifted`) that the render and audio layers consume. Undo = stack of structurally-cloned states (states are small; don't bother with diffs). The scripted solutions in section 8.5 are the regression suite — if a level edit breaks its replay test, the level is wrong, not the test.

**Repo/file layout (also the deployable output — zero build, copy as-is):**

```
public/games/body-snake/
  index.html        (splash + canvas + HUD DOM, loads js/main.js as module)
  design.md         (this document)
  css/style.css
  js/config.js      (CFG + VERSION — the only place tuning values live)
  js/sim.js         (pure game logic, headless)
  js/levels.js      (level strings + hint text + solution replays)
  js/render.js      (Canvas 2D, tweens, particles)
  js/input.js       (keyboard now, touch in M3)
  js/audio.js       (ZzFX-style synth, mute persistence)
  js/main.js        (game shell: screens, undo stack, URL flags, debug overlay)
  test/solutions.test.js  (Node headless replays; not required at runtime)
```

**Final reminder:** M0's acceptance gut-check is the whole point. If pushing a growing rectangle-worm around Rooms 1–2 doesn't already produce "ugh, I'm so long — one more try," stop and report back before building Rooms 3–5.
