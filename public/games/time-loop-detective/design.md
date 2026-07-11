# Second Glance — Game Design Document

> Source idea: [Game Idea 17 - Detective (Theme: Detective)](/game-idea-17-detective-theme-detective)

## 1. Title & one-liner

**Working title:** Second Glance ⚑ (overridable)

**Alternates:** Closing the Gap, Loop Street Station, The Ticking Platform, Minute Detective, Time Loop Detective

**One-liner:** You are a detective trapped one loop behind a time-looping bomber — walk the same subway platform every loop, spot the one thing that changed, and carry it to the exit before the timer detonates.

**Genre:** Observation / spot-the-difference puzzle under time pressure, with a light adventure-game shell. Single-player, 2D side-view.

**Elevator pitch:** Every loop you walk the same 6-zone subway station, end to end. The station repeats itself perfectly — the same busker plays the same riff, the same rat runs the same route — except for one thing the bomber altered this iteration. Find it, inspect it, carry it to the exit stairs before the 2-minute timer runs out, and you close the gap on the bomber by one loop. Guess wrong or run out of time and time itself detonates. Close the gap completely and the final loop flips the skill on its head: nothing in the scene has changed except one person's behavior — spot the NPC breaking their routine and arrest the bomber.

## 2. Fun hypothesis

**The question this prototype answers:** *Is spotting what changed in a familiar environment, under time pressure, across repeated loops, actually fun — or does it collapse into frustrating pixel-hunting or rote checklist-scanning?*

Everything in P0 serves this: a memorizable scene, a seeded change system, a per-loop timer, and a validate-at-exit rule.

**Playtest questions (ask after someone plays):**

1. On loop 2, did you feel like you *knew* the station well enough to notice something was off — or were you scanning blind?
2. Did the timer create tension or just annoyance? Did you ever choose to skip inspecting something because of time?
3. When you found the changed object, did it feel like deduction/memory, or luck?
4. Did the decoy changes (loops 3–4) make you doubt yourself in a fun way or an unfair way?
5. Did the final "spot the behavior change" arrest loop feel like a satisfying escalation of the same skill?

## 3. Design pillars

1. **Perfect repetition is the puzzle.** The station must replay identically every loop (same NPC walk cycles, same sounds, same layout) except for the seeded changes. Any accidental variation destroys the game. This is the one thing that can never be cut.
2. **Memory beats eyesight.** Changes are readable at a glance once noticed (an orange basket where apples were), never one-pixel hunts. The challenge is remembering the baseline, not seeing small things.
3. **Time pressure forces commitment.** The player must always feel the trade-off between "inspect one more thing" and "get to the exit." No mechanic may remove that tension.
4. **One scene, escalating reads.** All content lives in one hand-built scene; difficulty comes from decoys, shrinking timers, and finally behavioral (not object) changes — never from new maps.

## 4. Core game loop

Session target: **6–9 minutes** for a full win (5 loops), ~2 minutes per hunt loop.

```
            ┌──────────────────────────────────────────────┐
            │ LOOP 0 "PATROL" (60s, no changes)            │
            │ Walk the station, memorize it, reach exit    │
            └────────────────────┬─────────────────────────┘
                                 v
      ┌──────────► HUNT LOOP (120s → 90s) ────────────┐
      │   1. WAKE:    fade in at entrance, timer runs │
      │   2. SWEEP:   walk right, scan the scene      │
      │   3. INSPECT: click suspects (2s hold, in     │
      │               range) → "ticking" or "harmless"│
      │   4. COMMIT:  pick up ONE item, carry it      │
      │   5. EXIT:    reach exit stairs → validate    │
      └───────┬───────────────────────┬───────────────┘
              │ correct item          │ wrong item / timeout / empty exit
              v                       v
        GAP −1 (3→2→1→0)        DETONATION → strike +1, GAP +1 (cap 3)
              │                       │ (P1: Paradox minigame decides survival)
              v                       v
        GAP == 0?               strikes == 3? ──yes──► GAME OVER
              │ yes                   │ no: replay loop, new change seed
              v                       └──────► back to HUNT LOOP
   ┌────────────────────────────┐
   │ CATCH LOOP (90s):          │
   │ no object changed — one    │
   │ NPC deviates from routine. │
   │ Click NPC → ARREST.        │
   │ Right NPC = WIN.           │
   │ Wrong NPC/timeout = strike.│
   └────────────────────────────┘
```

**What the player does/sees/feels per phase:**

- **Wake:** Screen irises in at the entrance stairs. HUD shows "LOOP N — Bomber is X loops ahead" and the timer starts. *Feel: reset, urgency.*
- **Sweep:** Side-scroll walk. The station replays exactly: busker riff, rat scurry, commuter pacing. *Feel: growing familiarity, hunting for the itch of "that's new."*
- **Inspect:** Hold-click an interactable within range for 2s; a caption appears ("Faint ticking inside…" / "Different, but harmless." / "Same as always."). *Feel: confirmation or doubt; each inspect spends time.*
- **Commit:** Press E (or tap) on the object to pick it up. It shows in the HUD carry slot. Picking up another drops the first where you stand. *Feel: commitment.*
- **Exit:** Walk into the exit-stairs zone; a confirm prompt appears ("Leave with: DUFFEL BAG?" / "Leave empty-handed?"). Confirm → resolve. *Feel: the reveal.*

## 5. Inputs & controls

Touch is **viable** and supported ⚑ (overridable): the game is walk + tap, no twitch aiming.

| Action | Desktop | Touch |
|---|---|---|
| Walk left / right | `A`/`D` or `←`/`→` (hold) | Hold left/right third of screen (on-screen ◀ ▶ zones) |
| Inspect object/NPC | Click and hold object 2s (must be within `INSPECT_RANGE`) | Tap and hold object 2s |
| Pick up / drop object | `E` while in range of inspected object (or click its "TAKE" button) | Tap the "TAKE" button shown after inspect |
| Arrest (catch loop only) | Click NPC, then click "ARREST" button | Tap NPC, then tap "ARREST" |
| Confirm / cancel exit prompt | `Enter` / `Esc` (or click buttons) | Tap buttons |
| Pause | `P` or `Esc` | Tap ⏸ HUD icon |
| Mute | `M` | Tap 🔊 HUD icon |
| Restart run (from pause or end screen) | `R` or button | Tap button |
| Debug overlay toggle (only with `?debug=1`) | `` ` `` (backtick) | n/a |

No other inputs exist. Mouse wheel, WASD verticals, and jump are unused — the player walks a flat platform.

## 6. Game elements

### 6.1 Player

- **Looks:** Placeholder: 28×56 px navy rectangle with a lighter "trench coat" band and a gray fedora rectangle. Final: flat-vector detective with thick outline, fedora, trench coat. Faces walk direction.
- **Behavior:** Walks at `WALK_SPEED` px/s, clamped to map. Camera follows, centered, clamped to map edges. No jumping, no collision with NPCs.
- **Interacts with:** interactables (inspect/carry), exit zone (validate), HUD.

### 6.2 The scene — Loop Street Station

One side-view map, `MAP_WIDTH` = 4800 px, screen height 540 px world units. Six zones, entrance at x=0, exit at x=4800. Traversal time ≈ 22 s at default walk speed. Background: tiled wall, pillars every 400 px, platform edge with tracks along the bottom (trains are background dressing only, P1).

**Zone A — Street entrance (x 0–800):** entry stairs backdrop, station sign "LOOP ST".
**Zone B — Ticket hall (x 800–1600).**
**Zone C — Turnstiles (x 1600–2400).**
**Zone D — Newsstand (x 2400–3200).**
**Zone E — Benches (x 3200–4000).**
**Zone F — Platform end / exit (x 4000–4800):** exit stairs occupy x 4600–4800 (the exit trigger zone).

### 6.3 Interactable objects (complete build list)

Placeholder art for every object: a colored rectangle with an emoji drawn on it (`fillText`) and its name under `?debug=1`. Coordinates are object centers.

| # | id | Zone | x | Emoji | Base state |
|---|---|---|---|---|---|
| 1 | `poster_wall` | A | 300 | 🖼️ | Three posters: CIRCUS, SODA ad, MISSING CAT |
| 2 | `trash_can_a` | A | 520 | 🗑️ | Green trash can, closed lid |
| 3 | `pigeon` | A | 650 | 🐦 | Pigeon pecking, fixed 80 px waddle |
| 4 | `busker` (NPC) | A | 740 | 🎸 | Busker sits, plays guitar, case open with 3 coins |
| 5 | `ticket_machine_1` | B | 900 | 🎫 | Working, green screen |
| 6 | `ticket_machine_2` | B | 1050 | 🎫 | Working, green screen |
| 7 | `booth_attendant` (NPC) | B | 1250 | 🧑‍💼 | Attendant in booth, no hat, reads a book |
| 8 | `wall_clock` | B | 1250 (high) | 🕐 | Shows 5:00 |
| 9 | `lost_found_box` | B | 1400 | 📦 | Cardboard box, one glove sticking out |
| 10 | `wet_floor_sign` | B | 1500 | ⚠️ | Yellow sign, standing upright |
| 11 | `payphone` | B | 1560 | ☎️ | Handset on hook |
| 12 | `turnstiles` | C | 1750 | 🚧 | Three turnstiles, all green lights |
| 13 | `map_board` | C | 1950 | 🗺️ | Subway map, no markings |
| 14 | `extinguisher_case` | C | 2100 | 🧯 | Glass case closed, extinguisher inside |
| 15 | `vending_machine` | C | 2250 | 🥤 | Lit, fully stocked |
| 16 | `commuter` (NPC) | C | 1600–2350 | 🕴️ | Paces C on a fixed 20 s cycle, carries briefcase |
| 17 | `news_vendor` (NPC) | D | 2600 | 🧔 | Stands at stand, arms crossed |
| 18 | `magazine_rack` | D | 2500 | 📚 | Six magazines, blue one top-left |
| 19 | `fruit_basket` | D | 2700 | 🍎 | Basket of red apples |
| 20 | `coffee_cup` | D | 2800 | ☕ | One cup on the counter |
| 21 | `newspaper_stack` | D | 2900 | 🗞️ | Stack, headline "MAYOR OPENS NEW LINE" |
| 22 | `radio` | D | 3000 | 📻 | Radio on the shelf, antenna up |
| 23 | `bench_1` | E | 3300 | 🪑 | Empty bench |
| 24 | `sleeper` (NPC) | E | 3500 | 😴 | Man asleep on bench_2, hat over face |
| 25 | `umbrella` | E | 3650 | ☂️ | Red umbrella leaning on pillar |
| 26 | `suitcase` | E | 3750 | 🧳 | Brown suitcase beside bench |
| 27 | `pillar_poster` | E | 3850 | 📜 | "SEE SOMETHING SAY SOMETHING" poster |
| 28 | `trash_can_b` | E | 3950 | 🗑️ | Green trash can, lid ajar |
| 29 | `rat` | E | 3200–4000 | 🐀 | Scurries the zone on a fixed 15 s route |
| 30 | `mop_bucket` | F | 4100 | 🪣 | Mop in yellow bucket |
| 31 | `janitor` (NPC) | F | 4200 | 🧹 | Sweeps a fixed 6-tile patch, 12 s cycle |
| 32 | `control_cabinet` | F | 4350 | 🔌 | Metal cabinet, door closed, padlocked |
| 33 | `emergency_phone` | F | 4450 | 📞 | Red box on wall, closed |
| 34 | `exit_sign` | F | 4650 (high) | 🚪 | Lit EXIT sign over stairs |

All 34 entries are inspectable. NPCs replay identical animation cycles every loop, phase-locked to loop start (pillar 1).

### 6.4 The change system (how loops are seeded)

Each hunt loop, the game seeds changes from the **change pool** below using the run RNG (`?seed=`):

- Exactly **1 true change** (the bomber's device is hidden in/behind it — carrying this object to the exit wins the loop).
- **`DECOYS_PER_LOOP[loop]` decoy changes** (things that changed but are harmless — carrying one detonates).
- Constraint: the true change and decoys must be in **different zones** from each other, and an object used in a previous loop of this run is excluded for the rest of the run.
- Everything else renders **bit-identical** to the baseline.

**Change pool (P0 — 18 entries).** Kind: ADD (new object appears), SWAP (object replaced), MOVE (object relocated), STATE (same object, altered).

| # | Target | Kind | Changed state (what the player sees) |
|---|---|---|---|
| C1 | `poster_wall` | SWAP | MISSING CAT poster replaced by a BOXING MATCH poster |
| C2 | `trash_can_a` | STATE | Lid off, smoke wisp rising from inside |
| C3 | new: `duffel_bag` | ADD | Black duffel bag appears under bench_1 (x 3300) |
| C4 | `ticket_machine_2` | STATE | Screen red "OUT OF ORDER", panel ajar |
| C5 | `wall_clock` | STATE | Shows 7:15 instead of 5:00 |
| C6 | `lost_found_box` | STATE | Glove gone; wires poke out of the box |
| C7 | `wet_floor_sign` | MOVE | Sign now at x 2050 (Zone C) instead of 1500 |
| C8 | `payphone` | STATE | Handset dangling off the hook, faint beeping |
| C9 | `extinguisher_case` | STATE | Case open, extinguisher missing |
| C10 | `vending_machine` | STATE | Dark, "SOLD OUT" row lit, hums differently |
| C11 | `magazine_rack` | SWAP | Blue magazine top-left is now yellow |
| C12 | `fruit_basket` | SWAP | Apples are now oranges |
| C13 | `coffee_cup` | ADD | A second cup appears beside the first |
| C14 | `newspaper_stack` | SWAP | Headline now "CLOCK TOWER STRUCK BY LIGHTNING" |
| C15 | `umbrella` | SWAP | Red umbrella is now black |
| C16 | `suitcase` | MOVE | Suitcase now at x 1450 (Zone B, by lost & found) |
| C17 | `mop_bucket` | MOVE | Bucket now at x 700 (Zone A, by busker) |
| C18 | `control_cabinet` | STATE | Padlock gone, door cracked open, red glow inside |

For ADD entries the spawned object is itself the interactable. For MOVE entries, both the vacated spot ("something used to be here" is not marked — the player must remember) and the object at its new position are valid pickups; picking up the moved object is the correct action.

**Inspect captions** ⚑ (overridable via `INSPECT_REVEALS`): inspecting the true change yields *"…faint ticking inside."*; a decoy yields *"Different — but harmless."*; an unchanged object yields *"Same as every loop."* This deviates from the source idea's exit-only feedback: blind guessing playtests as frustration, and the 2 s inspect cost preserves time pressure. Set `INSPECT_REVEALS=false` to restore exit-only feedback for A/B playtesting.

### 6.5 NPCs and the catch loop

The 6 NPCs (`busker`, `booth_attendant`, `commuter`, `news_vendor`, `sleeper`, `janitor`) are scenery with perfect routines during hunt loops (inspecting one gives a flavor line, always identical). In the **catch loop** (gap = 0), no object changes. Instead the RNG picks one NPC to be the bomber-in-disguise and applies its **deviation** — a behavioral change:

| NPC | Deviation |
|---|---|
| `busker` | Plays no music; guitar case closed; watches the player |
| `booth_attendant` | Booth empty; attendant stands *outside* the booth |
| `commuter` | Paces Zone E instead of Zone C |
| `news_vendor` | Repeatedly checks a pocket watch instead of crossing arms |
| `sleeper` | Sitting upright, awake, hat on knee |
| `janitor` | Sweeping in Zone A; mop bucket abandoned in F |

Click the NPC → "ARREST" button → correct NPC = **win**; wrong NPC or timeout = detonation (strike, replay catch loop with a new deviation).

### 6.6 Zones & triggers

- **Exit zone** (x 4600–4800): entering it opens the exit confirm prompt and pauses walking (timer keeps running — edge case, section 7).
- **Inspect range:** `INSPECT_RANGE` = 120 px horizontal from object center.
- **Carry slot:** exactly one object; carried object renders as an icon over the player's head and in the HUD.

## 7. Rules, win & lose conditions

**Run structure:** gap starts at `GAP_START` = 3. Loop timers: `LOOP_TIMES` = [60, 120, 110, 100, 90] seconds for [patrol, hunt@gap3, hunt@gap2, hunt@gap1, catch].

- **Loop 0 (patrol):** no changes, no pickups, 60 s to reach the exit. Timer expiry just restarts loop 0 (no strike) — it exists only to build the memory baseline. HUD banner: "PATROL — memorize the station."
- **Hunt loop success:** reach exit carrying the true-change object and confirm → "GAP CLOSED" splash, gap −1, next loop.
- **Hunt loop failure (detonation):** any of — timer hits 0; confirm exit while carrying a decoy or unchanged object; confirm exit empty-handed. Effect: detonation cutscene (0.8 s white flash + shake), **strike +1**, **gap +1** (capped at 3), loop timer for the replayed gap level is used. In P1 the Paradox minigame (section 8) plays first and can convert the strike into a game over.
- **Catch loop:** as 6.5. Success = **WIN**.
- **Game over:** strikes reach `STRIKES_MAX` = 3 (P0), or Paradox minigame failed (P1).
- **Scoring:** score = Σ per successful loop of (seconds remaining × 10) + 500 per gap closed + 2000 for the arrest − 250 per false inspect-and-carry drop. Shown on end screens. Score exists to make playtesters replay; it gates nothing.

**Edge cases (decided):**

- Timer expires while the exit confirm prompt is open → detonation (the prompt does not stop time).
- Timer expires during the 2 s inspect hold → detonation; inspect aborted.
- Picking up object B while carrying A → A drops at the player's feet at its current x; A remains a valid pickup.
- Carried object's original location renders empty for the rest of the loop.
- Dropping the true object and exiting empty → failure (empty-handed rule).
- Player idles at exit without confirming → nothing; timer decides.
- Same change never repeats within a run (exclusion list); with `?seed=`, the full run's change sequence is reproducible.
- Pause (`P`) freezes timer, NPC cycles, and input except unpause/mute/restart. Pausing during the catch loop is allowed (prototype; anti-cheese is not a concern).

## 8. Difficulty & progression

Single tuned difficulty; progression is within the run only:

| Gap | Timer | Decoys | Skill tested |
|---|---|---|---|
| Patrol | 60 s | — | Build baseline memory |
| 3 | 120 s | 0 | Pure "what's new?" |
| 2 | 110 s | 1 | Discriminate true vs harmless change |
| 1 | 100 s | 2 | Triage under pressure |
| 0 (catch) | 90 s | — | Behavioral observation |

Knobs for playtest tuning: `LOOP_TIMES`, `DECOYS_PER_LOOP`, `GAP_START`, `INSPECT_TIME`, `INSPECT_REVEALS`, `WALK_SPEED`.

**Paradox minigame (P1 — second chance, from the source idea):** on detonation, the screen color-inverts and warps; `PARADOX_SHARDS` = 6 clock shards drift and fade across the screen; click/tap all 6 within `PARADOX_TIME` = 10 s. Success → survive (strike and gap +1 apply as normal). Failure → immediate game over. In P0 the minigame is skipped and detonation resolves directly ⚑ (overridable — the source idea wants the minigame; it is P1 because the core hypothesis doesn't need it).

## 9. Style & theme

- **Visual style:** flat vector, thick 3 px dark outlines, no gradients, film-noir-meets-cartoon. Everything readable at a glance (pillar 2). Placeholder plan for M0–M1: colored rectangles + emoji glyphs via canvas `fillText`, object names visible under `?debug=1`.
- **Palette (6 colors):** background navy `#141B2E`; platform/wall slate `#3A4458`; station-light amber `#F2B84B`; detective/ink `#1B1F2B`; alert red `#E24536`; paper white `#F4EFE6`. Changed-object highlight (debug only): `#7CFC9A`.
- **Typography:** headings in a bold slab/typewriter feel — use system stack `"Courier New", monospace` for captions/HUD (case-file flavor), `Arial Black, sans-serif` for the title. No webfonts (asset-free).
- **Tone/mood:** deadpan procedural urgency. Captions written like a tired detective's case notes ("Same as every loop.").
- **References:** *Return of the Obra Dinn*'s observation-as-gameplay, *Groundhog Day*'s comic fatalism, *Untitled Goose Game*'s readable flat props — "a spot-the-difference book that is about to explode."

## 10. Sound design

Implementation: **Web Audio API, all SFX synthesized in code** (jsfxr-style oscillator/noise envelopes). No audio asset files. Audio context created on first user gesture (the splash Play click). Mute toggle is P0, state persisted to `localStorage`.

| Event | Sound description | Priority |
|---|---|---|
| Loop start | Two-note rising chime + tape-rewind whoosh | P0 |
| Inspect complete | Short pencil-scratch blip; a low "tick-tick" layered if true change | P0 |
| Pickup / drop | Soft thunk / cloth flump | P0 |
| Exit correct | Bright three-note resolve chime | P0 |
| Detonation | Filtered noise boom + 0.5 s ring-out | P0 |
| Timer ≤ 30 s | Heartbeat pulse, tempo doubles at ≤ 10 s | P0 |
| Footsteps | Alternating short taps while walking | P1 |
| Ambient station | Low brown-noise rumble + occasional synthesized train pass | P1 |
| Arrest (win) | Handcuff click + triumphant sting | P1 |
| Paradox minigame | Detuned reversed drone; shard-click glass plink | P1 |

Music: **none** for P0; P2 option is a generative 2-bar noir bass vamp (Web Audio oscillators). Never copyrighted tracks.

## 11. UI & screens

Flow: `Splash → (Patrol → Hunt ×3 → Catch) → Win / Game Over → Splash or Restart`.

**Splash screen (mandatory, P0):**
- Title "SECOND GLANCE" + one-liner: "Something on this platform changed. Find it before time explodes."
- Rules in 5 bullets: (1) Walk the station; loop 0 is safe — memorize everything. (2) Each loop, ONE thing has changed — the bomb is inside it. (3) Hold-click things to inspect; press E to carry one. (4) Reach the exit with the right object before the timer ends. (5) Close the gap 3 times, then spot which *person* is acting wrong and arrest them.
- Controls block (desktop + touch, from section 5).
- Version number bottom-right (e.g. `v0.1.0`) rendered from the single `VERSION` constant.
- One big "▶ PLAY" button (also starts audio context).

**HUD (always visible in play):** top-left loop timer (turns `alert red` ≤ 30 s); top-center banner "LOOP N — BOMBER +X" (gap indicator, X footprint icons); top-right ⏸ and 🔊 toggles; bottom-center carry slot (empty outline or carried object emoji + name); context caption line above the carry slot (inspect results, prompts).

**Exit prompt (modal):** "Leave with: [OBJECT]?" or "Leave EMPTY-HANDED?" + Confirm/Cancel. Timer visibly keeps running behind it.

**Loop result interstitial (2 s):** "GAP CLOSED — the bomber is X loops ahead" or detonation flash → "TIME EXPLODED — strike N/3, the bomber pulled ahead."

**Win screen:** "GOTCHA." + which NPC was the bomber + score breakdown + total loops + [Play again] [New seed].
**Game over screen:** "TIME WINS." + score + which object was the true change this loop (learning feedback) + [Retry same seed] [New seed].
**Pause overlay:** Resume / Restart run / Mute / rules recap.

## 12. Config & tuning

Single exported object `CONFIG` in `config.js`; every gameplay number in the codebase must come from here.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | "0.1.0" | string | Splash + debug overlay version display |
| `MAP_WIDTH` | 4800 | px | World length |
| `WALK_SPEED` | 220 | px/s | Traversal time (~22 s end-to-end) |
| `GAP_START` | 3 | loops | Hunt loops required before catch loop |
| `LOOP_TIMES` | [60,120,110,100,90] | s | Timer per [patrol, gap3, gap2, gap1, catch] |
| `DECOYS_PER_LOOP` | [0,0,1,2,0] | count | Decoy changes per loop (same indexing) |
| `STRIKES_MAX` | 3 | count | Detonations allowed before game over |
| `INSPECT_TIME` | 2.0 | s | Hold duration to inspect |
| `INSPECT_RANGE` | 120 | px | Max distance to inspect/pick up |
| `INSPECT_REVEALS` | true | bool | Inspect captions reveal true/decoy (⚑ A/B knob) |
| `EXIT_ZONE_X` | 4600 | px | Exit trigger start |
| `TIMER_WARN_AT` | 30 | s | Heartbeat + red timer threshold |
| `PARADOX_TIME` | 10 | s | P1 minigame duration |
| `PARADOX_SHARDS` | 6 | count | P1 minigame click targets |
| `SCORE_PER_SEC` | 10 | pts | Time bonus multiplier |
| `SCORE_GAP` | 500 | pts | Per gap closed |
| `SCORE_ARREST` | 2000 | pts | Win bonus |
| `CAMERA_LERP` | 0.12 | 0–1 | Camera follow smoothing |
| `NPC_CYCLE_LOCK` | true | bool | Phase-lock NPC routines to loop start (never disable outside debug) |

**URL flags:**
- `?seed=12345` — seeds the run RNG (mulberry32); same seed ⇒ identical change sequence, decoys, and catch-loop deviation. Default: `Date.now()`, displayed on the game-over/win screens so testers can share runs.
- `?debug=1` — overlay with FPS, current loop/gap/strikes, seed, timer, object names, true change highlighted in `#7CFC9A`; cheat keys: `N` skip to next loop as success, `T` set timer to 10 s, `G` jump straight to catch loop.
- `?loop=3` — start at a given loop index (skips patrol) for fast iteration.
- `?time=999` — override all loop timers (playtesting without pressure).

## 13. Tech stack

**Vanilla JavaScript (ES modules) + Canvas 2D, zero-build.** Three files served statically: `index.html`, `config.js`, `main.js` (plus `sim.js` split out for headless testing — see section 16). Canvas 2D fits a side-scrolling scene of ~40 static-ish props and 8 animated entities with room to spare; no physics engine is warranted (nothing is emergent-physical here — the "simulation" is deterministic routine playback, which is 50 lines of keyframe code, and determinism is pillar 1, which physics engines actively threaten). SVG was considered for the illustrated look but per-frame camera scrolling and the emoji-glyph placeholder plan are simpler on canvas. No Pixi/Matter/Howler — Web Audio directly, keeping the deploy a copy-paste folder for GitHub Pages with zero build step and zero runtime network calls. Perf budget: ≤ 60 draw calls/frame equivalent (34 props + 6 NPCs + player + HUD), one 960×540 canvas scaled to fit, particle cap 40 (detonation flash), trivially 60 fps on a mid-range laptop.

## 14. Milestones

**M0 — Toy loop.** *Goal: prove spotting a change under a timer is fun with rectangles.*
Deliverables: walkable 4800 px scene with all 34 objects as labeled rectangles+emoji; baseline render; change system seeding 1 true change from the 18-entry pool; inspect (hold 2 s, captions); carry one object; exit prompt; timer; success/detonation resolution; gap counter 3→0 (catch loop stubbed: reaching gap 0 = "WIN" text); `?seed=`.
Acceptance criteria:
- [ ] A tester who walked the patrol loop can find the true change and exit correctly within 120 s at least 2 times in 3 on unseen seeds.
- [ ] The same `?seed=` produces the identical change sequence twice in a row.
- [ ] Two consecutive loops render pixel-identical except the seeded changes (verified with `?debug=1` toggling the highlight).
- [ ] A full 4-loop run completes in under 9 minutes.
*Proves: the fun hypothesis. If spotting the change isn't compelling here, stop.*

**M1 — Real rules.** *Goal: full P0 ruleset and shell.*
Deliverables: patrol loop banner; decoys per `DECOYS_PER_LOOP`; strikes + game over; catch loop with all 6 NPC deviations and arrest; splash screen (rules, controls, version), HUD complete, pause, restart, end screens with score and seed display; touch controls.
Acceptance criteria:
- [ ] A first-time player understands what to do within 60 seconds unprompted, from the splash alone.
- [ ] All 18 changes and 6 deviations are individually reachable via `?seed=` sweeps and each is visually identifiable at normal zoom.
- [ ] Wrong-object exit, empty exit, and timeout each produce the strike flow with correct gap math.
- [ ] Playable start-to-win on a touch device (tap zones + tap-hold inspect).

**M2 — Feel.** *Goal: make loops legible and tense.*
Deliverables: flat-vector art pass per section 9 palette (canvas-drawn shapes, still no image assets); P0 SFX table synthesized; heartbeat timer; detonation shake + iris-in loop transitions; NPC animation polish (walk cycles, busker strum).
Acceptance criteria:
- [ ] Every object readable as "what it is" at a glance without debug labels (5 of 5 objects named correctly by a fresh viewer in 2 s each).
- [ ] Mute toggle works and persists; no audio before first gesture.
- [ ] 60 fps sustained on a mid-range laptop with `?debug=1` FPS counter.

**M3 — Playtest build.** *Goal: shippable test artifact.*
Deliverables: deployed to static host under `/games/time-loop-detective/`; `?debug=1`, `?loop=`, `?time=` flags verified; P1 features if time allows, in this order: Paradox minigame, footsteps/ambience, background train pass, arrest sting.
Acceptance criteria:
- [ ] Fresh browser, hosted URL: full run works with no console errors and no network calls after page load.
- [ ] A shared seed reproduces a reported run exactly.
- [ ] Three playtesters complete a run and answer the section 2 questions.

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is exit-only feedback (source idea) more fun than inspect-reveals? Knob: `INSPECT_REVEALS`. Test both.
2. **(non-blocking — resolve in playtest)** Are the loop timers too generous once players learn a scan route? Knobs: `LOOP_TIMES`, `WALK_SPEED`.
3. **(non-blocking — resolve in playtest)** Do MOVE-type changes read as unfair (two locations to remember)? If so, weight the pool toward SWAP/STATE — pool entries are data, trivially re-weighted.
4. **(non-blocking — resolve in playtest)** Does the Paradox minigame (P1) add drama or just delay the game-over screen? Knobs: `PARADOX_TIME`, `PARADOX_SHARDS`.
5. **(non-blocking)** Should the catch loop allow one free wrong arrest? Currently a wrong arrest is a full strike; if testers find it harsh, add `ARREST_TRIES` config (default 1).

No blocking questions — the doc is buildable as written.

## 16. Handoff notes for Fable

**Build order:** `config.js` → headless sim (`sim.js`: loop state machine, change seeding, timer, inspect/carry/exit resolution, scoring) → keyboard/mouse input → canvas render (scene table → camera → player → NPC routines) → HUD/prompts → splash/end screens → audio → touch → debug flags.

**Keep headless-testable:** everything in `sim.js` must run without a DOM. It owns: RNG (mulberry32 from seed), the change pool and per-loop seeding (with exclusion list), gap/strike math, timer countdown via injected `dt`, and resolution of `inspect(objectId)`, `pickUp(objectId)`, `exitWith(objectId|null)`. Unit-assertable examples: seeding with seed 42 twice yields identical change lists; `exitWith(trueChangeId)` decrements gap; three detonations end the run; loop-4 state exposes exactly one deviating NPC.

**File layout (repo == deployable static output, no build):**

```
public/games/time-loop-detective/
  index.html      (canvas, splash/end-screen DOM, loads main.js as module)
  config.js       (CONFIG object + VERSION — the only tuning surface)
  sim.js          (headless game logic, no DOM/canvas imports)
  main.js         (input, render, audio, HUD; imports sim.js + config.js)
  design.md       (this document)
```

**Reminders:** prove the loop with rectangles and emoji before any art effort — M0's fun test is the whole point of the project. Every milestone must leave the game runnable by opening `index.html` from a static host. Determinism is sacred: any per-frame randomness (particle jitter etc.) must use a separate non-run RNG so `?seed=` stays reproducible. No network calls, ever.
