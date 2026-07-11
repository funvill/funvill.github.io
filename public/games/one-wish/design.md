# WISHBREAK — Game Design Document

> Source idea: [Game Idea 23 - One wish (Theme: Cryptozoology)](/game-idea-23-one-wish-theme-cryptozoology)

---

## 1. Title & one-liner

**Working title:** **WISHBREAK** ⚑ (overridable)

**Alternates:** One Wish: Containment Detail · Cryptid Crisis · All The Monsters · Wish Wrangler

**One-liner:** Every monster ever wished into existence by a child just teleported into one small town at once — you are the lone field agent who has to lure, trap, and haul them all back into containment before the town's panic blows the secret wide open.

**Genre:** Top-down single-screen(ish) action-puzzle "critter wrangler" — Overcooked-style time pressure meets Pokémon Snap-style creature knowledge, single-player.

**Elevator pitch:** In WISHBREAK you play a field agent of the Bureau of Wish Containment on the worst day in its history: a child wished to "see ALL the monsters," and every childhood-wish cryptid on Earth materialized in the town square of Millbrook at 6:14 PM. The monsters cannot be destroyed — a child's wish is permanent — so every one of them must be captured alive using the method that matches the childish wish that created it. The chocolate blob must be baited with chocolate. The giant dog wants to play fetch. The shadow that a scared kid befriended can only be pinned by a flashlight. You sprint around a dusk-lit cartoon town with a net, portable cages, and a duffel bag of weird lures, capturing monsters and dragging them back to the containment van while panicking civilians drive a town-wide Panic meter toward disaster. Contain them all before the secret gets out.

**Adaptation choice (required by MODE NOTE):** The source is a story premise ending at its inciting incident; I adapted it into a single-player, real-time capture-and-haul action game where the player runs the secret organization's field response to that incident, because "each monster's capture method encodes the childish wish that created it" is the most game-shaped and most testable idea in the premise. ⚑ (overridable)

---

## 2. Fun hypothesis

**The single question:** *Is it fun to triage a town full of misbehaving wish-monsters under time pressure, where the core skill is knowing/learning each monster's childish wish and exploiting it with the right lure-trap combo?*

Secondary hypothesis: does the **capture → slow haul back to the van** rhythm create good tension (committing to a haul means ignoring the chaos), or is hauling just a chore?

**Playtest questions (ask after each session):**

1. Can you tell me, for each monster you caught, *why* that capture method worked on it? (Tests whether the wish→behavior→counter mapping reads.)
2. Which capture felt best? Which felt like busywork?
3. When the Panic meter got high, did you change your plan, or ignore it?
4. Was hauling a captured monster back to the van tense, boring, or annoying?
5. Did you want to restart immediately to do a cleaner run? (Replay pull.)

---

## 3. Design pillars

1. **Every monster is a punchline.** Each cryptid is a child's wish taken literally, and its behavior *and* its capture method must both be readable as that joke. If a monster's capture doesn't express its wish, redesign or cut the monster.
2. **Contain, never destroy.** No combat, no health bars, no killing. All verbs are lure, trap, pin, herd, haul. This is animal control, not monster hunting.
3. **Triage pressure.** There are always more problems than hands. The fun is choosing *which* fire to fight, not executing any single capture perfectly.
4. **Readable chaos.** However hectic it gets, the player can always tell at a glance what each monster is, what it is doing, and what the Panic meter is about to do. Juice never trades against clarity.

---

## 4. Core game loop

**Session target:** one full round = **6 minutes** hard cap (config `roundDurationSec`), typical win/loss at 4–6 minutes. Restart is instant.

### Loop phases

| Phase | Player does | Player sees | Player feels |
|---|---|---|---|
| **1. SCAN** (~5–15 s) | Pans attention across the map / minimap; reads monster icons and Panic sources | Monsters with distinct silhouettes + emote bubbles showing current behavior; civilians fleeing; Panic meter | "Which of these is the biggest threat right now?" |
| **2. RIG** (~10–20 s) | Runs to a chosen monster; places the right lure and/or cage at the right spot (on its path, near its craving) | Ghost-preview of cage placement; monster's attention indicator flipping to the lure | Clever anticipation — "come on, take the bait…" |
| **3. SNAG** (~3–8 s) | Executes the capture: nets the distracted monster, or watches it walk into the cage, or pins it with light then nets | Capture flourish, monster squashed into a rattling crate, Panic dips | Payoff — the joke lands ("of course the chocolate worked") |
| **4. HAUL** (~10–25 s) | Drags the crate to the containment van at reduced speed, routing around active monsters | Crate on a rope behind agent; van glowing as drop-off; other monsters still causing chaos | Committed tension — "I'm slow and the town is on fire" |
| **5. RESTOCK** (instant) | Delivers crate; cage/lure stock refills at the van | Delivery jingle, counter ticks up (3/6 contained), Panic drops | Progress breath, then back to SCAN |

```
        +--------+     +-------+     +--------+     +--------+
   ---> |  SCAN  | --> |  RIG  | --> |  SNAG  | --> |  HAUL  | --+
        +--------+     +-------+     +--------+     +--------+  |
             ^                                                   |
             |            +-----------+                          |
             +----------- |  RESTOCK  | <------------------------+
                          +-----------+
        (Panic meter rises the whole time; all monsters active at t=0)
```

Faithful to the premise: **all monsters spawn at t=0** from a purple rift in the town square — there are no waves. The round opens with maximum visible chaos and the player whittles it down.

---

## 5. Inputs & controls

Touch is **viable** and specced (twin control clusters), but P1 — desktop keyboard/mouse is P0.

### Desktop (P0)

| Input | Action |
|---|---|
| `WASD` / Arrow keys | Move agent (8-way, normalized diagonals) |
| Mouse position | Aim reticle (net swing direction, placement ghost) |
| Left mouse button | **Net swing** (short arc in aim direction, cooldown `netCooldownMs`) |
| Right mouse button *or* `Space` | **Place cage trap** at ghost position (must be within `placeRangePx` of agent, on walkable ground) |
| `E` | **Place lure** at agent's feet. Bait auto-selects for the nearest un-lured monster within `lureAutoSelectPx`; if none, places generic snack ⚑ (overridable) |
| `F` (hold) | **Flashlight beam** in aim direction (P1 gadget; present but only needed for P1 monsters) |
| `Q` (hold) | **Hold broccoli** — herding stance, repels NoVeg (P1) |
| Walk into crate | Attach/detach haul rope automatically (walk into van to deliver) |
| `P` / `Esc` | Pause (overlay with resume/restart/mute) |
| `M` | Mute toggle |
| `R` | Restart round (with confirm while round active; instant on end screen) |

### Touch (P1)

| Input | Action |
|---|---|
| Left virtual joystick | Move agent |
| Right side drag | Aim |
| `NET` button (bottom-right) | Net swing toward last aim |
| `CAGE` button | Place cage at fixed 60 px in front of agent |
| `LURE` button | Place auto-selected lure |
| `LIGHT` button (hold) | Flashlight (P1) |
| Top-right icons | Pause, mute |
| End screen tap | Restart |

No other inputs exist. Debug cheat keys are listed in section 12 and only active with `?debug=1`.

---

## 6. Game elements

### 6.1 Player agent — "Agent Riley"

- **Placeholder:** teal 24×24 px rounded square with a white aim tick. **Final:** flat-vector agent in a grey Bureau jumpsuit, oversized net on back.
- Moves at `agentSpeedPx` (base 180 px/s); while hauling a crate, `agentHaulSpeedFactor` (0.55×).
- Carries: net (infinite, cooldown), cage stock (`cageStockMax` 2, refills at van), lure stock (`lureStockMax` 3, refills at van).
- Cannot be hurt. Big monsters (Barkley) can **bump** the agent 80 px and drop a hauled crate (crate stays where dropped, capture is NOT undone).
- Config keys: `agentSpeedPx`, `agentHaulSpeedFactor`, `netCooldownMs`, `netArcDeg`, `netRangePx`, `placeRangePx`, `cageStockMax`, `lureStockMax`.

### 6.2 The Containment Van (drop-off / restock zone)

- **Placeholder:** dark grey 80×48 rect with "VAN" text; **final:** black unmarked van with open rear doors, traffic cones.
- Fixed at the south road edge of the map. Walking a hauled crate into its 96 px radius delivers it: crate vanishes, contained counter +1, Panic −`panicDropOnContain`, cage/lure stock refills to max.
- Config: `vanRadiusPx`, `panicDropOnContain`.

### 6.3 The Rift

- Purely cosmetic purple crackling ellipse in the town square where all monsters spawned. Placeholder: purple ellipse with jitter. No gameplay effect. P0 (it sells the premise on the splash-to-game transition).

### 6.4 Civilians

- **Placeholder:** 16×16 cream circles. **Final:** tiny flat-vector townsfolk, 4 variants.
- Count `civilianCount` (14). Wander waypoint-to-waypoint at 60 px/s. When a monster is within `civilianScareRadiusPx` (110) and in line of sight, they **panic**: run away at 140 px/s with a red "!" and contribute `panicPerScaredCivPerSec` (0.9) to the Panic meter while panicking. Calm down 2 s after no monster is near.
- Special interactions: crowd toward Nimbus's candy rain and Sparklehoof (taking photos — phone emoji) instead of fleeing; these *fascinated* civilians contribute panic at the same rate (exposure = panic).
- Config: `civilianCount`, `civilianScareRadiusPx`, `panicPerScaredCivPerSec`.

### 6.5 Tools (the player's verbs)

| Tool | Behavior | Config |
|---|---|---|
| **Net** | 100 px range, 100° arc swing, 600 ms cooldown. Only captures a monster whose state is **Vulnerable** (eating a lure, drowsy, pinned by light, hugging plush — per monster table). Netting a non-vulnerable monster plays a "whiff + monster taunt" and the monster does its escape move. | `netRangePx`, `netArcDeg`, `netCooldownMs` |
| **Cage trap** | Placeable 48×48 box, arms after 1 s. Any monster whose table says "cage-able" that touches it is captured instantly (crate replaces cage). Monsters marked "too smart for cages" path around visible cages unless lured. Max 2 placed at once. | `cageArmDelayMs`, `cageStockMax` |
| **Lure** | Placeable item; each monster has exactly one bait it responds to (table below). A monster that perceives its bait within `lurePerceptionPx` (280) beelines to it and enters **Vulnerable** (eating/playing) state for `lureEatDurationSec` (6 s), then consumes the lure and resumes. Wrong-bait lures are ignored. | `lurePerceptionPx`, `lureEatDurationSec`, `lureStockMax` |
| **Flashlight** (P1) | Cone 220 px × 40°, drains a light battery (`flashlightBatterySec` 8 s, recharges when off). Pins Under-Bed (freezes it → Vulnerable after 2 s continuous beam). | `flashlightBatterySec`, `flashlightPinSec` |
| **Broccoli** (P1) | Held stance; NoVeg flees directly away from agent within 200 px — herding into a cage. | `broccoliRepelPx` |

### 6.6 Crates

- A captured monster becomes a rattling 40×40 crate at the capture spot, tinted the monster's color, hopping every 1–2 s. Attach by touching; hauled on a 30 px rope behind agent. Crates never expire and captures never revert ⚑ (overridable — a P2 "escape after 45 s un-hauled" knob exists in config, default off: `crateEscapeEnabled=false`).

### 6.7 The Monsters (the content)

Shared monster anatomy: every monster is defined by **Wish origin → Behavior (its havoc) → Capture method (the counter that expresses the wish)**. All monsters are indestructible; the only removal is capture. Each has a name tag + emote bubble showing current state (wandering / lured / vulnerable / taunting).

Per-monster speed/size live in config as `monsters.<id>.*`.

| # | Monster | Wish origin | Behavior (havoc) | Capture method | Tier |
|---|---|---|---|---|---|
| 1 | **Gobbler**, the Choco Golem | "I want ALL the chocolate!" | Brown blob that seeks the nearest food source (candy shop, picnic tables), squats on it and eats, scaring civilians; grows 10% per source eaten (bigger = +50% scare radius). | Place a **chocolate lure**; while it's face-down eating (Vulnerable), **net** it. | **P0** |
| 2 | **Big Barkley** | "I want the BIGGEST dog ever!" | House-sized friendly dog. Bounds between civilians to play, bumping them and the agent (drops hauled crates), knocking over props (each knock +2 Panic). Never sits still. | Too big to net, too dumb to avoid cages — but never walks into one on its own. Place a **fetch-ball lure**; he sprints to it and flops down chewing; while chewing, he'll follow the ball… place the ball *inside/behind a placed cage* or place a cage on him while he chews. Formally: fetch-ball lure → Vulnerable; a cage placed within 60 px of a Vulnerable Barkley captures him. | **P0** |
| 3 | **Sparklehoof** | "I want a rainbow pony!" | Rainbow pony galloping a fixed loop through town leaving a fading rainbow trail; civilians crowd to photograph it (exposure Panic). Fastest monster (2× agent speed) — cannot be chased down. | Read its loop (the rainbow trail literally draws its path). Place a **cage on the trail**; it's too fast to notice cages: it runs straight in. No lure needed. | **P0** |
| 4 | **Mama-Mimic** | "I want my mommy…" (a lost toddler's wish) | Grey shape-shifting blob that trails the nearest civilian crying "MAMA?" at full volume — the single biggest per-second Panic source (its target panics at 2×). If its target escapes, picks a new one. | Place the **plush-mom lure** (a soft warm dummy). It hugs the plush and calms (Vulnerable, longest window: 10 s); **net** it gently. | **P0** |
| 5 | **Zoomzoom** | "I wanna drive the car!" | A living toy car that speeds along roads only, running red lights, causing civilians to leap aside (+Panic per near-miss). Cannot leave road tiles. | It cannot steer off roads: place a **cage on a road lane**; add a **traffic-cone lure** to force lane choice at intersections (cone blocks one lane). Cage on its lane captures it. Cone is optional shortcut; cage alone works with prediction. | **P0** |
| 6 | **Nimbus**, the Candyfloss Cloud | "I want it to rain candy!" | Pink cloud drifting above the map (un-nettable at altitude). Periodically descends over the largest civilian cluster to rain gumballs — civilians swarm underneath (crowd Panic). | Only vulnerable **while descended and raining** (8 s window, telegraphed by darkening pink): get under it and **net** it. Pure timing monster; no lure exists for it. | **P1** |
| 7 | **Under-Bed** | A scared kid wished "I want the dark to be my friend." | A shadow that teleports between shadow pools (under trees, alleys, awnings) every ~6 s, invisible except glowing eyes; any civilian whose path crosses a shadow pool it occupies bolts screaming (+5 Panic spike). | Hold the **flashlight** beam on it for 2 continuous seconds — it freezes in the light (Vulnerable), then **net**. If the beam breaks, it teleports away. | **P1** |
| 8 | **Echo**, the Copycat | "I want a twin!" | A silhouette copy of the agent that mirrors the player's movement, point-reflected through the town-square center, knocking over whatever it walks through. Ignores lures (it only ever does what *you* do). | Pure movement puzzle: walk a path such that your mirrored twin walks **into a placed cage**. (Place cage, then position yourself at the reflected point and walk "through" it.) | **P1** |
| 9 | **Molarch**, the Tooth Fairy | "I want the tooth fairy to be REAL." | Human-sized moth-fairy that flits house to house stealing shiny things; each theft +2 Panic and it drops coins that distract civilians into the open. | Place the **coin-pile lure**; it lands to stuff its sack (Vulnerable 5 s); **net**. It's skittish: agent moving faster than 50% speed within 120 px scares it off mid-lure — approach slowly. | **P1** |
| 10 | **NoVeg** | "I wish vegetables were GONE." | A small vortex that eats gardens, parks, and planters, leaving grey craters (each garden eaten +4 Panic and permanently removes scenery). | No bait works (it hates all food that's good for you). While agent **holds broccoli (Q)**, NoVeg flees directly away — **herd** it into a placed cage. | **P1** |
| 11 | **Bloop**, the Bubblegum Kraken | "I want a pet octopus!" | Pink kraken parked in the town fountain; 4 tentacles idly grab passing civilians and *pet* them (held civilians panic hard); doesn't move. | Multi-step: **net** each of the 3 reachable tentacles (each retracts when netted); when all 3 are retracted, the body slumps over the fountain edge (Vulnerable 8 s); place a **cage** against the fountain to capture. Tentacles regrow after 20 s if you stall. | **P2** |
| 12 | **The Never-Bed** | "I NEVER want to go to bed!" | Pajama-clad gremlin, hyperactive, sprints in zigzags, flips every light in town ON (each house lit +1 Panic, and lit houses shrink Under-Bed's shadow pools — monster synergy). Speeds UP near loud noises. | Place the **music-box lure** (lullaby); it slows within the 150 px lullaby radius, yawns, and after 4 s in-radius sits down drowsy (Vulnerable); **net**. Netting early (slowed but not seated) fails and it panic-sprints. | **P2** |

**Roster per round (P0 build):** monsters 1–5, one of each, all spawned at t=0. **P1 build:** 1–10 with round roster = 8 drawn from the 10 (seeded). P2 adds 11–12 and roster 10. Config: `rosterSize`, `rosterPool`.

### 6.8 Props & map

- Map: fixed hand-authored town, **1920 × 1440 world px**, camera follows agent (viewport 960×720, `camLerp` 0.12). Layout: town square + rift at center, road ring + cross streets (Zoomzoom's domain), candy shop, 6 houses, park with gardens (NoVeg food), fountain (Bloop), tree/alley shadow pools (Under-Bed), van at south edge.
- Props (benches, mailboxes, stands): knockable by big monsters (+2 Panic each, max once per prop). Placeholder: grey rects.
- Minimap (top-right, 144×108): monster dots in their tint, agent, van. P0 — triage is the game; the minimap is the SCAN phase's tool.

---

## 7. Rules, win & lose conditions

- **Win:** all rostered monsters delivered to the van before the timer ends. Instantly triggers the WIN screen (delivery of the final crate, not mere capture ⚑ overridable).
- **Lose — Panic:** the global Panic meter (0–100) reaches 100 → "THE SECRET IS OUT" lose screen. Panic sources: scared/fascinated civilians per second, prop knocks, Mama-Mimic wails, Under-Bed spikes, Molarch thefts, NoVeg garden kills. Panic decays at `panicDecayPerSec` (0.5/s) only while **zero** civilians are currently panicking. Each delivery −`panicDropOnContain` (8).
- **Lose — Time:** round timer (`roundDurationSec` 360) hits 0 with monsters still loose → "CONTAINMENT FAILED" lose screen showing X/Y contained.
- **Scoring:** `score = containedCount * 1000 + timeRemainingSec * 10 + floor((100 - peakPanic) * 5)`. Rank thresholds: S ≥ 7000, A ≥ 5500, B ≥ 4000, C otherwise (win required for S/A). Config: `scoreRankS/A/B`.
- **Edge cases (decided):**
  - Timer expires mid-haul: lose; the hauled crate does not count.
  - Panic hits 100 in the same tick as final delivery: **delivery wins ties** — win checks run before lose checks each tick.
  - Two monsters touch one cage simultaneously: the cage captures the one that entered first (deterministic by update order); cage is then consumed.
  - Netting where two Vulnerable monsters overlap: captures the nearest to arc center.
  - Lure placed in perception range of two monsters that both eat that bait (only possible with duplicate-bait P2 rosters): both approach, first to arrive eats; the other returns to wandering when the lure is consumed.
  - Agent bumped by Barkley while hauling: crate detaches in place, remains captured.
  - Pausing freezes the sim clock, all timers, and audio.

---

## 8. Difficulty & progression

Prototype ships **one tuned difficulty** (the P0 5-monster roster) plus config knobs — no meta-progression. Challenge shape *within* a round is intrinsic: early = maximum simultaneous chaos (hardest triage), late = fewer monsters but higher accumulated Panic (less slack). Gobbler growing and Never-Bed/Under-Bed synergy (P2) make stalling costly.

Knobs for playtest-driven difficulty: `rosterSize`, `roundDurationSec`, `panicPerScaredCivPerSec`, `civilianCount`, `agentHaulSpeedFactor`. URL flag `?roster=7` overrides roster size. No difficulty select UI (P2 if ever).

---

## 9. Style & theme

- **Visual style:** flat vector cartoon, thick 3 px dark outlines, rounded shapes, no gradients except the rift and rainbow trail. "Saturday-morning cartoon animal control." Dusk lighting: the whole map sits under a slight warm-purple tint so the flashlight and lit windows read.
- **Tone:** cozy catastrophe. The monsters are never scary — they are children's wishes being *inconvenient at scale*. Civilians panic like Muppets, not horror victims.
- **References:** *Untitled Goose Game* (one mundane town, systemic mischief) meets *Overcooked* (readable time-pressure triage) with *Lilo & Stitch* creature energy.
- **Palette (hex):**
  - Grass `#7BB661`, roads `#4A4A58`, road lines `#F5F0E1`
  - Buildings: `#F2A65A`, `#E8875B`, `#B5D99C`, `#9FC5E8` roofs `#5D5D74`
  - Outline/ink `#2B2B3A`, UI cream `#FFF8E7`
  - Agent teal `#2EC4B6`, van charcoal `#33333F`
  - Panic red `#E4572E`, rift purple `#7C4DFF`, warning amber `#FFB347`
  - Monster tints: Gobbler `#7B4B2A`, Barkley `#C9A66B`, Sparklehoof body `#FDFDFD` + rainbow trail, Mama-Mimic `#9A9AB0`, Zoomzoom `#D64545`, Nimbus `#F7A8C4`, Under-Bed `#1B1B2F` + `#FFE94E` eyes, Echo `#2EC4B6` @ 50% alpha, Molarch `#CBB7F0`, NoVeg `#6E7F3E`, Bloop `#F28CB8`, Never-Bed `#8ED1FC`
- **Typography:** headings **Fredoka One**-style rounded (fallback stack: `"Fredoka One", "Baloo 2", system-ui, sans-serif` — self-hosted or system fallback only, no CDN at runtime; body/HUD `system-ui`. Numbers in HUD use tabular-lining via `font-variant-numeric`.
- **Placeholder art plan (M0–M1):** everything is tinted rounded rects/circles with a 1-line label and emote emoji bubble (😋 lured, 💤 drowsy, 😱 civilian). Monsters distinguished by tint + size + one emoji on the body (🍫🐕🌈👶🚗☁️👀👤🧚🌪️🐙🛌). This is explicitly good enough to run the M0 fun test.

---

## 10. Sound design

All SFX **synthesized at runtime** (jsfxr-style, tiny custom Web Audio synth module) — zero audio asset files. Audio context created/resumed only on first user gesture (the Play click). **Mute toggle is P0**, persisted in `localStorage` (`wishbreak.muted`).

### SFX event table

| Event | Sound description | Priority |
|---|---|---|
| Net swing | Short airy "whoosh" (noise burst, 120 ms, band-passed) | P0 |
| Capture success | Bright 3-note ascending pluck + soft "boop" | P0 |
| Net whiff / taunt | Flat "fwip" + descending 2-note womp | P0 |
| Cage placed / armed | Wooden "clack" then metallic "chik" | P0 |
| Lure placed | Soft pop + tiny sparkle arpeggio | P0 |
| Crate delivered | Truck-door slam + rising jingle; pitch rises with each delivery count | P0 |
| Panic tick (crossing 50 / 75 / 90) | Escalating alarm blips (one per threshold, not continuous) | P0 |
| Win | 2 s triumphant synth fanfare | P0 |
| Lose | 1.5 s sad-trombone-style descending synth | P0 |
| UI click | 30 ms tick | P1 |
| Civilian scream | Randomized short squeaks (comedic, pitched up) — rate-limited to 1 per 400 ms | P1 |
| Per-monster idle blips (Barkley woof, Mama "mama?", Zoomzoom vroom) | Distinct 1-note character sounds, proximity-triggered | P1 |
| Flashlight hum | Low filtered saw while beam on | P1 |

### Music

- P0: **none**.
- P1: **generative** two-layer loop (Web Audio): a calm marimba-ish pattern whose tempo and a detuned-alarm layer's volume are driven by the Panic meter (calm at 0, frantic at 90+). No royalty-free files, no copyrighted tracks.

Implementation: plain **Web Audio API** with one tiny `synth.js` (no Howler — no assets to manage). Master gain node for mute.

---

## 11. UI & screens

**Flow:** `SPLASH → GAME (pausable) → END (win/lose) → GAME (restart) …` Splash reachable from END via "Menu".

### Splash screen (mandatory)

- Title **WISHBREAK** + one-liner: "Every wish-monster on Earth just landed in one small town. Go get them back."
- Rules/goal, ≤5 bullets:
  - Capture every monster and haul it to the van before time runs out.
  - Each monster was wished up by a child — use the wish against it: right lure, right trap.
  - Netting only works on distracted (💤/😋) monsters.
  - Panicking civilians raise the PANIC meter — at 100 the secret is out and you lose.
  - You are slow while hauling. Plan your route.
- Controls block: desktop keys (and touch buttons if P1 touch shipped).
- **Version number** bottom-right, from single exported constant `VERSION` in `config.js` (e.g. `v0.1.0`) — same constant feeds the debug overlay.
- One big **PLAY** button (also starts audio context). Seed shown as small text if `?seed=` present.

### HUD (always visible in game)

- Top-left: **contained counter** `3 / 5` with monster face icons (dimmed → lit as delivered).
- Top-center: **round timer** `4:12` (turns amber < 60 s, red < 20 s, pulses).
- Top-right: **minimap**.
- Bottom-center: **PANIC meter** — wide bar, green→amber→red, threshold notches at 50/75/90, shakes ≥ 90.
- Bottom-right: tool stock — cage ×2, lure ×3 icons; net cooldown radial on cursor.
- Contextual hint line (one line, bottom-left) when near a monster: its name + wish, e.g. "GOBBLER — wished for ALL the chocolate." (This is the P0 tutorialization; there is no tutorial level.)

### Pause overlay

Dim + "PAUSED", buttons: Resume, Restart, Mute toggle, Menu.

### End screen

- WIN: "ALL CONTAINED. The secret is safe. Ish." / LOSE-panic: "THE SECRET IS OUT." / LOSE-time: "CONTAINMENT FAILED."
- Stats: contained X/Y, time used, peak panic, score + rank letter.
- Monster roll-call: each rostered monster's face, wish one-liner, captured ✓/✗ — reinforces the jokes and seeds "one more run".
- Buttons: **RESTART** (same seed via `?seed`, new seed otherwise) ⚑ (overridable: restart keeps the same roster+seed by default so players can master a layout), MENU.

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/config.js`; every value below lives there and nothing is hard-coded elsewhere. `VERSION = "0.1.0"` lives in the same file.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `roundDurationSec` | 360 | s | Round timer |
| `rosterSize` | 5 | count | Monsters per round |
| `rosterPool` | ["gobbler","barkley","sparklehoof","mamamimic","zoomzoom"] | ids | Which monsters can appear (P1 grows this) |
| `agentSpeedPx` | 180 | px/s | Agent move speed |
| `agentHaulSpeedFactor` | 0.55 | × | Speed while hauling |
| `netRangePx` | 100 | px | Net reach |
| `netArcDeg` | 100 | deg | Net swing arc |
| `netCooldownMs` | 600 | ms | Net spam limit |
| `placeRangePx` | 90 | px | Cage placement reach |
| `cageStockMax` | 2 | count | Cages carried |
| `cageArmDelayMs` | 1000 | ms | Cage arming time |
| `lureStockMax` | 3 | count | Lures carried |
| `lurePerceptionPx` | 280 | px | Monster notices its bait |
| `lureAutoSelectPx` | 400 | px | Auto-bait picks nearest monster |
| `lureEatDurationSec` | 6 | s | Vulnerable window (per-monster override in `monsters.*.vulnSec`) |
| `civilianCount` | 14 | count | Panic pressure |
| `civilianScareRadiusPx` | 110 | px | Monster fear range |
| `panicPerScaredCivPerSec` | 0.9 | /s | Panic gain rate |
| `panicDecayPerSec` | 0.5 | /s | Panic recovery (only at 0 scared civs) |
| `panicDropOnContain` | 8 | pts | Delivery reward |
| `panicPropKnock` | 2 | pts | Prop knock penalty |
| `panicMax` | 100 | pts | Lose threshold |
| `vanRadiusPx` | 96 | px | Delivery zone |
| `camLerp` | 0.12 | 0–1 | Camera follow smoothing |
| `flashlightBatterySec` | 8 | s | P1 gadget uptime |
| `flashlightPinSec` | 2 | s | Beam time to pin Under-Bed |
| `broccoliRepelPx` | 200 | px | NoVeg herd radius |
| `crateEscapeEnabled` | false | bool | P2: un-hauled crates re-escape |
| `crateEscapeSec` | 45 | s | P2 escape timer |
| `monsters.<id>.speedPx` | per-monster (e.g. gobbler 90, barkley 220, sparklehoof 360, mamamimic 120, zoomzoom 420) | px/s | Movement |
| `monsters.<id>.sizePx` | per-monster (gobbler 40→growth, barkley 96, sparklehoof 48, mamamimic 36, zoomzoom 32) | px | Body + scare footprint |
| `monsters.<id>.vulnSec` | per-monster (mamamimic 10, molarch 5, nimbus 8, default 6) | s | Capture window |
| `scoreRankS` / `A` / `B` | 7000 / 5500 / 4000 | pts | Rank thresholds |

**URL flags:**

- `?seed=1234` — seeds all RNG (roster draw, civilian waypoints, monster wander) via a mulberry32 PRNG; seed echoed on splash and end screen.
- `?debug=1` — overlay: FPS, entity counts, panic value, monster states; cheat keys: `1` capture nearest monster, `2` +20 panic, `3` −20 panic, `4` +60 s time, `5` teleport agent to pointer.
- `?roster=N` — override `rosterSize` (clamped to pool size).
- `?skip=1` — bypass splash straight into a round (playtest reloads).
- `?slowciv=1` — halve `panicPerScaredCivPerSec` (quick difficulty A/B in playtests).

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + Canvas 2D, zero-build.** One `index.html` plus `src/*.js` modules, deployable by copying the folder to any static host — no bundler, no dependencies, no runtime network calls. Canvas 2D fits because the game is ~30 moving sprites-as-shapes on a hand-authored tile-ish map; SVG would fight the per-frame world redraw and Pixi/Matter are unjustified weight (no physics — movement is simple steering, and Barkley's "bump" is a distance check + impulse, not rigid-body). Fixed-timestep sim (60 Hz accumulator) decoupled from `requestAnimationFrame` render; the sim module imports no DOM so it runs headless under Node for unit tests. Web Audio synth in its own module. Perf budget: ≤ 12 monsters, ≤ 20 civilians, ≤ 60 props, ≤ 150 particles cap (`particleCap`), full-map redraw per frame at 60 fps is trivial at this entity count on a mid-range laptop; static map baked once to an offscreen canvas and blitted.

---

## 14. Milestones

### M0 — Toy loop (prove the fun with rectangles)

**Goal:** the SCAN→RIG→SNAG→HAUL loop is playable with 3 monsters (Gobbler, Sparklehoof, Zoomzoom), rect art, no sound/menus.
**Deliverables:** map rects + roads, agent movement, net/cage/lure with auto-bait, the 3 monster behaviors, crates, hauling, van delivery, panic meter with civilians, win/lose by panic/time, `?seed`.
**Acceptance criteria:**
- [ ] A first-time player, told only "catch them and bring them to the van", captures at least one monster within 90 seconds unprompted.
- [ ] Each of the 3 monsters requires a visibly different capture approach, and a watcher can articulate the differences.
- [ ] A full round completes (win or lose) in under 7 minutes, no crashes, at 60 fps.
- [ ] Hauling meaningfully changes route decisions at least once per round (observed in playtest).
**Proves:** the core triage-capture-haul hypothesis. *If M0 isn't fun, stop — art won't save it.*

### M1 — Real rules

**Goal:** full P0 ruleset and shell.
**Deliverables:** all 5 P0 monsters incl. Barkley bump + Mama-Mimic; prop knocks; panic thresholds + decay rules; scoring + ranks; splash (rules, controls, `VERSION`), HUD (counter, timer, minimap, panic bar, stock, hint line), pause, end screen with roll-call, restart, `?skip`, `?roster`.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds of the splash, unprompted.
- [ ] All section 7 edge cases behave as specced (tick-order win-vs-lose test included in headless tests).
- [ ] Every input in section 5 (desktop) works and nothing undocumented does anything.
- [ ] Headless sim tests pass for: panic math, lure/vuln state machine, cage capture ordering, score formula.

### M2 — Feel

**Goal:** it reads and sounds like the cozy-catastrophe cartoon.
**Deliverables:** flat-vector shape art per section 9 (canvas-drawn, no image assets), emote bubbles, rainbow trail, rift, capture flourish + crate hop, screen shake on panic ≥ 90 and Barkley bumps, particle puffs (≤ cap), all P0 SFX + mute persistence.
**Acceptance criteria:**
- [ ] With sound off and no labels, a new watcher can still tell every monster apart and name its current state.
- [ ] Every P0 SFX fires on its event; audio only starts after the Play gesture; mute persists across reload.
- [ ] 60 fps maintained with full roster + particles on a mid-range laptop.

### M3 — Playtest build

**Goal:** shippable playtest artifact.
**Deliverables:** `?debug=1` overlay + cheat keys, seed echo on end screen, deployed to static host (site `public/games/one-wish/`), P1 features *if time allows* in this order: touch controls → Nimbus & Under-Bed (+flashlight) → Molarch → Echo → NoVeg (+broccoli) → generative music → civilian/monster voice blips.
**Acceptance criteria:**
- [ ] Same `?seed` twice yields identical roster, spawns, and civilian paths.
- [ ] Game runs from a static file host with zero network requests after load (verified in devtools).
- [ ] Two remote playtesters complete a session and answer the section 2 questions with no verbal help.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is hauling fun or a chore? Knob: `agentHaulSpeedFactor`; if it tests as a chore at 0.55, try 0.7 before considering cutting HAUL.
2. **(non-blocking — resolve in playtest)** Does auto-bait selection remove satisfying "I know its wish" mastery? If yes, promote a manual bait-cycle key (design reserved: hold `E` to cycle) — flag `?manualbait=1` to A/B.
3. **(non-blocking — resolve in playtest)** Is 5 simultaneous monsters the right chaos level for the P0 roster? Knob: `?roster=`.
4. **(non-blocking — resolve in playtest)** Should Panic decay be more generous (`panicDecayPerSec`) so long rounds don't grind into unavoidable losses?
5. **(non-blocking — resolve in playtest)** Does the same-seed restart make the game feel like a puzzle speedrun (good) or memorization (bad)? Toggle default in end-screen restart.
6. **(non-blocking)** Do fascinated civilians (photographers) read as "exposure = panic," or does it look like a bug that crowds *raise* panic? Mitigation ready: camera-flash emoji + "EXPOSURE!" label.

No blocking questions — the doc is implementable as written.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → headless sim core (entities, steering, lure/vuln state machine, panic, capture/haul/delivery, win-lose tick order) → input layer → canvas renderer (rects first) → rules/HUD/screens → audio synth → juice. Prove the loop with rectangles before any art effort; ship every milestone runnable.

**Headless-testable:** everything in `src/sim/` must import zero DOM/canvas/audio. `new Sim(CONFIG, seed)` + `sim.tick(dt, inputs)` + inspectable state. Unit-test at minimum: panic accumulation/decay, lure perception → vulnerable → capture transitions per monster, cage simultaneity ordering, win-before-lose tick rule, score/rank math, seeded determinism (two sims, same seed + input script ⇒ identical state hash).

**File layout (also the deployable output — zero-build, the repo folder IS the dist):**

```
public/games/one-wish/
  index.html          (splash + canvas + module script tag)
  design.md           (this file)
  src/
    config.js         (CONFIG + VERSION — the only tuning surface)
    main.js           (boot, RAF loop, screen state machine)
    sim/
      sim.js          (fixed-timestep world tick)
      monsters.js     (per-monster behavior + capture tables, data-driven)
      civilians.js
      panic.js
      rng.js          (mulberry32, ?seed)
    input.js          (keyboard/mouse; touch in M3)
    render/
      render.js       (camera, map offscreen bake, entities, particles)
      hud.js
      screens.js      (splash/pause/end)
    audio/
      synth.js        (Web Audio SFX, master gain, mute persistence)
  test/
    sim.test.js       (run with `node --test`)
```

**Key implementation notes:**
- Monsters are data-driven: one steering/state framework, per-monster entries declaring `bait`, `cageable`, `netable`, `vulnSec`, `speedPx`, `special` hooks (Sparklehoof loop path, Zoomzoom road graph, Echo mirror transform, Barkley bump). Adding P1 monsters must not require touching the framework.
- Roads are a simple node graph; Zoomzoom and civilians reuse it. Sparklehoof's loop is a fixed spline of ~10 waypoints authored in `monsters.js`.
- Win check strictly before lose check in `sim.tick`.
- The contextual hint line ("GOBBLER — wished for ALL the chocolate") is the entire tutorial; make it prominent.
- No external requests, fonts included: use system-ui stack if Fredoka isn't trivially self-hostable; do not add a webfont CDN.
