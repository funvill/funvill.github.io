# One of Us — Game Design Document

> Source idea: [Game Idea 6 - One of us! (Theme: Joined Together)](/game-idea-6-one-of-us-theme-joined-together)

## 1. Title & one-liner

**Working title:** **One of Us**

**Alternates:** *We Are Many*, *Join Us*, *The Collective*, *Population: You*, *Assimilation District*

**One-sentence description:** You are a tiny hive mind loose in a city — touch lone humans to absorb them and their skills, stay unseen, and grow until the whole population is one of you.

**Genre:** Top-down real-time stealth / swarm strategy (single-player, browser).

**Elevator pitch:** You start as three linked bodies in a city of sixty oblivious citizens. Touching a human for one second assimilates them into your collective — but if anyone *sees* it happen, they scream, panic spreads, the city alert rises, and armed officers start hunting your bodies. Every person you absorb makes the hive bigger and better: athletes make everyone faster, officers make you look trustworthy. It plays like being the zombie horde in a zombie movie, except the horde is smart, patient, and picks off the stragglers first. When you own most of the city and stealth stops mattering, hit the **Frantic Assimilation** button and watch your swarm flood the streets to mop up the rest.

**Adaptation note:** The source idea is a two-part XCom-style campaign (tactical missions + logistics layer). This prototype builds **only the mission layer** as a single-city, single-round game, because that is where the fun hypothesis lives. The logistics/economy layer is cut to P2. ⚑ (overridable)

---

## 2. Fun hypothesis

**The single question:** *Is it fun to grow a hive mind by stealthily assimilating a city — balancing "pick off the loner quietly" against "the bigger I get, the harder I am to hide"?*

Everything in P0 exists to test the tension between **greed** (grab that person now) and **patience** (wait until they're alone), and the payoff of the **snowball** (each grab makes the next easier) ending in the cathartic frantic-assimilation flood.

**Playtest questions (ask after each session):**

1. When did you feel most tense — and was getting spotted your fault or the game's fault?
2. Did growing the hive feel powerful? At what size did you stop feeling fragile?
3. Did you notice the skill buffs (speed from athletes, camouflage from officers)? Did they change who you targeted?
4. When did you press Frantic Assimilation, and did it feel like a victory lap or a panic button?
5. Would you replay immediately to try a different route through the city?

---

## 3. Design pillars

1. **Touch is absorb.** One verb. No combat, no inventory. Contact + one second = they are one of us. Everything else is positioning.
2. **Witnesses are the enemy.** Danger never comes from the victim — it comes from who is *watching*. Line-of-sight and isolation are the whole puzzle.
3. **The snowball must be felt.** Each assimilation visibly grows the swarm and buffs it. At 5 bodies you sneak; at 40 bodies you are a tide.
4. **End on a flood, not a chore.** The frantic-assimilation button exists so the last 10% of the map is a spectacle, not mop-up tedium.

If a feature does not serve one of these four, cut it.

---

## 4. Core game loop

**Session length target:** 4–6 minutes per round (one city).

**Phases (repeating micro-loop, ~15–40 s each):**

1. **SCOUT** — Player pans the swarm through streets, reading NPC positions and sight lines. *Sees:* wandering citizens, patrol routes, who is alone. *Feels:* predatory patience.
2. **STALK** — Player rallies the swarm toward an isolated target, hugging building walls to break line-of-sight. *Sees:* their own swarm flowing around corners. *Feels:* tension — "is anyone watching?"
3. **GRAB** — A hive body contacts the target; a 0.8 s struggle plays out. If unwitnessed: silent conversion, the victim's dot turns hive-colored and joins the flock, buff icons tick up. If witnessed: the witness screams, flees, and the city ALERT meter jumps. *Feels:* either a clean-hit dopamine pop or an "oh no" scramble.
4. **CONSEQUENCE** — Alert decays slowly; panicked NPCs cluster (harder to isolate); at full alert, officers spawn at map edges and shoot hive bodies. Player retreats, regroups, or doubles down. *Feels:* risk management.
5. **SNOWBALL / FLOOD** — Loop 1–4 repeats with a bigger, faster, sneakier swarm until the player judges stealth obsolete and triggers **FRANTIC** (all bodies auto-hunt, alert maxes) to finish the city. *Feels:* cathartic release.

```
        ┌────────┐     ┌────────┐     ┌────────┐
   ┌───▶│ SCOUT  │────▶│ STALK  │────▶│  GRAB  │──── witnessed? ──┐
   │    └────────┘     └────────┘     └───┬────┘                  │
   │                                      │ clean                 ▼
   │                                  hive +1              ┌─────────────┐
   │                                  buffs +              │ CONSEQUENCE │
   │                                      │                │ alert ▲ cops│
   │                                      ▼                └──────┬──────┘
   │                               ┌────────────┐                 │
   └───────────────────────────────┤  SNOWBALL  │◀────────────────┘
                                   └─────┬──────┘
                                         │ player presses SPACE
                                         ▼
                                   ┌────────────┐
                                   │  FRANTIC   │──▶ WIN (all assimilated)
                                   └────────────┘    or LOSE (hive dead)
```

---

## 5. Inputs & controls

The player controls the swarm as **one unit via a rally point** — hive bodies flock toward it. No unit-by-unit micromanagement. ⚑ (overridable — individual selection is P2)

**Desktop (keyboard + mouse):**

| Input | Action |
|---|---|
| Left-click (or click-drag) on map | Set/move the rally point; swarm flocks toward it |
| Mouse at screen edge OR WASD / arrow keys | Pan the camera |
| **Space** | Trigger **Frantic Assimilation** (confirm on first press: press again within 2 s to confirm; irreversible) |
| **P** or **Esc** | Pause / resume (pause overlay shows controls) |
| **M** | Mute / unmute audio |
| **R** | Restart round (hold 1 s to avoid accidents) |
| **F** | Toggle fullscreen |
| **D** | Toggle debug overlay (only when `?debug=1`) |

**Touch (viable — the scheme degrades cleanly):**

| Input | Action |
|---|---|
| Tap / touch-drag on map | Set/move rally point |
| One-finger drag from screen edge | Pan camera |
| On-screen **FRANTIC** button (bottom-right, with confirm tap) | Frantic Assimilation |
| On-screen **⏸ / 🔇 / ↻** buttons (top-right) | Pause / mute / restart (restart requires confirm) |

Touch is a P1 polish item; P0 ships desktop, but no design decision blocks touch.

---

## 6. Game elements

All sizes in world pixels. World is `WORLD_W × WORLD_H` (1600 × 1200). Radii are collision radii.

### 6.1 Hive body (the player's swarm units)

- **Placeholder:** filled circle r=8, color `#C724F0` (hive magenta), thin white outline. **Final:** same circle with a subtle pulsing glow and short trailing motes.
- **Behavior:** Flocks toward the rally point using three steering forces: seek rally (weight 1.0), separation from other hive bodies within 20 px (weight 1.4), obstacle avoidance (buildings are hard collision). Speed = `hiveSpeed` + athlete buff. When within `grabRange` of a human, automatically begins a **grab** (see rules). During FRANTIC, each body ignores the rally point and seeks its nearest un-assimilated human at `hiveSpeed × franticSpeedMult`.
- **Config keys:** `hiveStart`, `hiveSpeed`, `hiveRadius`, `grabRange`, `grabTime`, `franticSpeedMult`.
- **Interactions:** touches humans (assimilates), is shot by officers (dies, removed), blocked by buildings.

### 6.2 Civilian (generic human)

- **Placeholder:** filled circle r=8, color `#F2E4C9` (warm cream). **Final:** same, with a tiny direction tick.
- **Behavior:** Wanders: picks a random reachable point 100–300 px away, walks at `npcWalkSpeed`, idles 1–4 s, repeats. Has a **vision circle** of radius `witnessRadius` with building-blocked line-of-sight (no facing cone — full 360°, LOS-gated ⚑ overridable, cones are P1). If it gains LOS on an in-progress grab, a hive body within 24 px of it, or a fleeing screamer, it becomes **PANICKED**: screams once (+`alertPerWitness` to city alert), flees away from the threat at `npcFleeSpeed` for `panicDuration` s, then huddles with the nearest group of ≥3 humans. Panicked humans can still be assimilated (grab time unchanged).
- **Config keys:** `npcCount`, `npcWalkSpeed`, `npcFleeSpeed`, `witnessRadius`, `panicDuration`, `alertPerWitness`.
- **Interactions:** witnesses grabs; raises alert; is assimilated on grab completion (converts to a hive body at its position — the swarm literally grows where the person stood).

### 6.3 Athlete (skill human — speed)

- **Placeholder:** civilian circle with `#5AD86E` (green) headband arc. 20% of population.
- **Behavior:** As civilian but walks/flees 25% faster.
- **Assimilation buff:** each athlete adds `athleteSpeedBonus` (+3 px/s) to all hive bodies, capped at `athleteSpeedCap` (+30).
- **Config keys:** `athletePct`, `athleteSpeedBonus`, `athleteSpeedCap`.

### 6.4 Officer (skill human — hazard + camouflage)

- **Placeholder:** circle r=8, color `#4FA3F7` (police blue) with white center dot. 10% of population.
- **Behavior:** Patrols a fixed 3–5 waypoint loop at `npcWalkSpeed × 1.2`. If it witnesses a grab or sees a hive body within LOS + `witnessRadius`, it does not flee — it **hunts**: chases the nearest hive body at `officerChaseSpeed`, and when within `officerRange` with LOS, aims for `officerAimTime` s (visible red aim line = the player's dodge window) then fires: the targeted hive body dies. Fire cooldown `officerCooldown` s.
- **Assimilation buff (uniform camouflage):** each officer assimilated reduces effective `witnessRadius` of all humans by `officerCamoBonus` (−12 px), floored at `witnessRadiusMin` (100).
- **Config keys:** `officerPct`, `officerChaseSpeed`, `officerRange`, `officerAimTime`, `officerCooldown`, `officerCamoBonus`, `witnessRadiusMin`.
- **Interactions:** shoots hive bodies; assimilable like any human (grabbing a hunting officer is high-risk/high-reward).

### 6.5 Police reinforcements

- Once city alert hits `alertMax`, sirens sound and `policeWaveSize` (4) fresh officers spawn at random map-edge roads every `policeWaveInterval` (20) s, up to `policeCapTotal` (16) concurrent officers. Reinforcements behave as officers with no patrol — pure hunt.
- **Config keys:** `policeWaveSize`, `policeWaveInterval`, `policeCapTotal`.

### 6.6 Buildings (obstacles)

- **Placeholder:** dark rounded rectangles `#22283A` on a street-gray ground `#3A4152`. Axis-aligned, 12–16 per map, sized 120–360 px per side, laid out on a loose 4×3 city-block grid with 80–120 px streets between them (generated from the seed).
- **Behavior:** Static. Block movement and line-of-sight for everyone. No interiors in P0 (NPCs never enter buildings ⚑ overridable — interiors are P2).
- **Config keys:** `blockCols`, `blockRows`, `streetWidth`.

### 6.7 City alert meter (systemic "entity")

- Global scalar 0–`alertMax` (100). +`alertPerWitness` (18) per new panicked witness. Decays at `alertDecay` (1.5/s) while below max. At max: locks at max for `alarmLockTime` (30) s (sirens, reinforcements active, all civilians panicked), then resumes decay if no new witnesses. FRANTIC sets it to max permanently.
- **Config keys:** `alertMax`, `alertDecay`, `alarmLockTime`.

### 6.8 Zones

- **Map edge roads:** spawn points for police waves. Humans never leave the map (no despawn-escape in P0 ⚑ overridable — escapee mechanic is P1, see Open Questions).

---

## 7. Rules, win & lose conditions

### The grab (core resolution rule)

1. A hive body within `grabRange` (14 px) of a human starts a grab: both freeze, a shrinking ring is drawn over the pair for `grabTime` (0.8 s).
2. If the hive body dies (shot) mid-grab, the grab cancels; the human instantly panics.
3. On completion, the human converts: it becomes a new hive body at its position, its skill buff applies immediately, the assimilation counter increments.
4. **Witness check runs continuously during the grab:** any human with unbroken LOS and distance ≤ effective `witnessRadius` panics and adds alert. The grab itself still completes — witnessing does not save the victim.
5. Multiple hive bodies near one human: only one grabs (closest); others continue moving. One hive body grabs one human at a time; simultaneous grabs by different bodies on different humans are allowed and resolve independently.

### Victory

- **WIN:** un-assimilated human count reaches 0. Round ends immediately (mid-grab conversions complete first).

### Defeat

- **LOSE:** hive body count reaches 0. (Even if a grab is 99% complete — cancelled grabs don't count.)

### Scoring (shown on end screen)

- **Time to full assimilation** (primary — lower is better).
- **Peak alert reached**, **hive bodies lost**, and a letter grade: S = never hit max alert AND lost 0 bodies; A = lost ≤2 bodies; B = won; no grade on loss. ⚑ (overridable)

### Edge cases

- Frantic pressed with 1 body left: allowed — it's a legitimate hail-mary.
- Officer aiming at a body that gets converted-adjacent mid-aim: aim persists on its target only; if target dies from another cause, aim cancels.
- Two officers targeting the same body: allowed; second shot wastes.
- Pause: freezes the entire sim including grabs, aims, and alert decay. Timer excludes paused time.
- All remaining humans are officers hunting the hive: game continues normally; grabs on hunters are legal.

---

## 8. Difficulty & progression

**Single tuned difficulty** for the prototype; challenge shape comes from the sim itself:

- **Early game is hard by fragility:** 3 bodies, one witness cascade can spawn cops that end you.
- **Mid game is hard by density:** panicked humans huddle in groups, removing easy loners; player must herd or accept witnesses.
- **Late game is easy by design:** the snowball plus FRANTIC turns the finish into a payoff, not a grind.

Rebalancing happens entirely through the Section 12 config object. Cross-round progression, later-mission "high alert" cities, hero squads, and rival hives are **P2 — cut from prototype**. ⚑ (overridable)

URL knobs for playtesting difficulty: `?npcs=100`, `?hive=1`, `?nocops=1` (see Section 12).

---

## 9. Style & theme

- **Visual style:** flat vector-noir, top-down. Solid-color circles for all characters on a dark desaturated city, thin 1 px outlines, no textures, no sprites in P0–M1. Glow (canvas shadowBlur, hive only) is the single indulgence. ⚑ Top-down circles instead of the source's isometric view — isometric buys nothing for the fun test and costs a week. (overridable)
- **Palette (6 colors):**
  - `#181C28` background / night sky
  - `#3A4152` streets
  - `#22283A` buildings
  - `#F2E4C9` humans (warm, alive)
  - `#C724F0` hive (electric magenta — glows)
  - `#E23B3B` alert/danger (alarm meter, aim lines, sirens)
  - Accents: `#5AD86E` athlete, `#4FA3F7` officer (count as tints, not palette slots)
- **Typography:** system monospace stack (`ui-monospace, "Cascadia Mono", Consolas, monospace`) for HUD and menus — reads as "cold collective intelligence."
- **Tone/mood:** quietly sinister, then gleeful. The city hums; assimilation feels *good* — the game never scolds the player for being the monster.
- **Reference points:** *Syndicate*'s Persuadertron crowd-snowball, the nighttime readability of *Monaco: What's Yours Is Mine*, and Katamari's "small fry to unstoppable mass" emotional curve.
- **Placeholder art plan (M0–M1):** everything above IS the placeholder plan — circles and rectangles are the shipped look; M2 only adds glow, motes, screen shake, and a scream ring VFX.

---

## 10. Sound design

All SFX **synthesized in code** (jsfxr-style parameter blips via Web Audio API oscillators/noise buffers) — zero audio asset files. Audio context created only after the first user gesture (the Play button). **Mute toggle is P0** (key M + HUD icon, persisted in `localStorage`).

**SFX event table:**

| Game event | Sound description | Priority |
|---|---|---|
| Grab starts | low wet "latch" — 80 ms descending square blip | P0 |
| Assimilation completes | satisfying two-note rising "bloop-BLIP" (the dopamine sound) | P0 |
| Witness scream | short shrill noise burst + downward pitch | P0 |
| City alert hits max | rising air-raid siren sweep, loops softly while locked | P0 |
| Officer fires / hive body dies | sharp crack + low thud | P0 |
| FRANTIC triggered | swelling drone + heartbeat pulse that persists to round end | P0 |
| Win | slow 4-note major resolve in a hollow synth | P0 |
| Lose | single dead sine thunk + silence | P1 |
| Officer aim (telegraph) | faint rising tick-tick-tick during aim time | P1 |
| UI click | 30 ms tick | P1 |

**Music:** none in P0. P1: a generative two-note ambient drone (Web Audio, oscillator + slow LFO) whose tempo/intensity scales with city alert level — no royalty-free files needed. **No copyrighted tracks, ever.**

**Implementation:** raw Web Audio API (no Howler — no files to manage). One `audio.js` module exposing `sfx.play(name)` and `sfx.muted`.

---

## 11. UI & screens

**Flow:** `Splash → Game ⇄ Pause → End (Win/Lose) → (Restart) → Game` — restart regenerates the city from a new seed unless `?seed=` is pinned.

### Splash screen (mandatory)

- Title: **ONE OF US** + one-liner: *"Touch them. Absorb them. Become the city."*
- Rules/goal in ≤5 bullets:
  - You are the purple swarm. Click to move it.
  - Touch a human for 1 second to make them **one of us**.
  - If anyone **sees** a grab, panic spreads and police come.
  - Absorbed athletes make you faster; absorbed officers make you look harmless.
  - Assimilate **everyone** to win. Lose all your bodies and you're done. (SPACE = all-out frenzy — no going back.)
- Controls block (desktop table + touch line).
- **Version number** (e.g. `v0.1.0`) bottom-right, sourced from `const VERSION` in `config.js` — splash, HUD debug overlay, and end screen all read the same constant.
- One big **▶ PLAY** button (click/tap/Enter). First click also unlocks audio.

### HUD (always visible in-game)

- Top-left: **ASSIMILATED 12 / 60** counter + hive body count.
- Top-center: **city alert bar** (fills `#E23B3B`, pulses at max, siren icon when locked).
- Top-right: mute 🔇, pause ⏸ icons (+ restart ↻ on touch).
- Bottom-right: **FRANTIC** button showing Space hint, with 2-step confirm state.
- Bottom-left: active buff icons with counts (🏃 ×4 → "+12 speed", 👮 ×2 → "camouflage").

### Pause overlay

Dimmed game, controls recap, Resume / Restart / Mute buttons.

### End screen

- WIN: "THE CITY IS ONE." / LOSE: "THE COLLECTIVE IS SILENCED."
- Stats: time, humans assimilated, peak alert, bodies lost, grade.
- **PLAY AGAIN** button (Enter/R) + seed display for sharing.

### Debug overlay (`?debug=1`, toggled with D)

FPS, entity counts, alert value, current seed, version; cheat keys: `K` +10 instant assimilations, `C` clear alert, `G` toggle god-mode (officers can't shoot).

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/config.js`; every value below is a key. The doc body references these keys — rebalance the game by editing this object only.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | "0.1.0" | string | splash/end/debug version display |
| `WORLD_W` / `WORLD_H` | 1600 / 1200 | px | map size |
| `blockCols` / `blockRows` | 4 / 3 | count | city block grid |
| `streetWidth` | 100 | px | street gap between blocks |
| `hiveStart` | 3 | bodies | starting swarm size |
| `hiveSpeed` | 90 | px/s | base hive body speed |
| `hiveRadius` | 8 | px | body collision radius |
| `grabRange` | 14 | px | contact distance to start grab |
| `grabTime` | 0.8 | s | grab duration |
| `franticSpeedMult` | 1.25 | × | hive speed during FRANTIC |
| `npcCount` | 60 | humans | city population |
| `athletePct` / `officerPct` | 0.20 / 0.10 | fraction | population mix (rest civilians) |
| `npcWalkSpeed` | 45 | px/s | human wander speed |
| `npcFleeSpeed` | 120 | px/s | panicked flee speed |
| `witnessRadius` | 160 | px | LOS sight distance (effective, after camo) |
| `witnessRadiusMin` | 100 | px | camo floor |
| `panicDuration` | 6 | s | flee time before huddling |
| `alertPerWitness` | 18 | pts | alert added per new witness |
| `alertMax` | 100 | pts | alarm threshold |
| `alertDecay` | 1.5 | pts/s | alert cooldown rate |
| `alarmLockTime` | 30 | s | time alert stays maxed |
| `athleteSpeedBonus` / `athleteSpeedCap` | 3 / 30 | px/s | speed buff per athlete / cap |
| `officerCamoBonus` | 12 | px | witnessRadius reduction per officer |
| `officerChaseSpeed` | 110 | px/s | hunting officer speed |
| `officerRange` | 180 | px | firing range |
| `officerAimTime` | 0.5 | s | telegraph before shot |
| `officerCooldown` | 1.2 | s | time between shots |
| `policeWaveSize` | 4 | officers | reinforcement wave |
| `policeWaveInterval` | 20 | s | time between waves |
| `policeCapTotal` | 16 | officers | max concurrent officers |
| `sepRadius` / `sepWeight` | 20 / 1.4 | px / × | swarm separation steering |
| `cameraPanSpeed` | 500 | px/s | keyboard/edge pan |

**URL flags (all optional, parsed once at load):**

- `?seed=12345` — seeds the PRNG (mulberry32); identical seed ⇒ identical city layout, NPC placement, and wander decisions. Seed shown on end screen.
- `?debug=1` — enables debug overlay + cheat keys.
- `?npcs=100`, `?hive=6` — override `npcCount` / `hiveStart`.
- `?nocops=1` — no reinforcement waves (isolates the stealth loop for testing).
- `?skip=1` — bypass splash straight into the game (playtest iteration speed).

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + Canvas 2D, zero-build.** A single `index.html` loading `src/*.js` modules, deployable by copying the folder to any static host — no bundler, no dependencies, no npm install. Canvas 2D is the right renderer: the game is ~90 moving circles, a dozen rectangles, and line effects — far below Canvas limits, and Pixi/WebGL would add weight for nothing. No physics engine: flocking + circle/AABB collision is ~80 lines and keeping it hand-rolled keeps the sim headless-testable. LOS is segment-vs-AABB tests against ≤16 buildings — trivial. Audio is raw Web Audio (Section 10).

**Perf budget:** ≤200 entities (60 humans + up to ~76 hive + 16 officers + margin), ≤150 transient particles/motes, all LOS checks cached per 100 ms per NPC. Target 60 fps on a mid-range laptop; fixed-timestep sim at 60 Hz with render interpolation off (not needed at this speed).

---

## 14. Milestones

### M0 — Toy loop (prove it with rectangles)

**Goal:** the grab-witness-panic loop is playable and tense with zero art/sound/menus.
**Deliverables:** canvas map with building rects, 60 wandering circles, rally-point swarm movement, grab-with-ring, witness LOS check, panic flee, alert bar as a plain rect, win/lose by counts, `?seed=`.
**Acceptance criteria:**
- [ ] Clicking moves the swarm; it flows around buildings without sticking on corners.
- [ ] Touching a lone human converts it in 0.8 s and it visibly joins the swarm.
- [ ] Grabbing in view of another human makes that human flee and the alert bar rise.
- [ ] Assimilating all humans shows a WIN state; reducing hive to 0 (via debug key) shows LOSE.
- [ ] Same `?seed=` produces the identical city twice.
**Proves:** the stalk→grab→witness tension is fun with pure geometry. *If M0 isn't fun, stop.*

### M1 — Real rules

**Goal:** full P0 ruleset and a first-time-player-ready shell.
**Deliverables:** athlete/officer types + both buffs, officer hunt/aim/shoot with telegraph, police reinforcement waves at max alert, FRANTIC with 2-step confirm, splash screen (rules, controls, version), HUD (counter, alert bar, buffs, frantic button), pause, hold-R restart, end screen with stats/grade.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds unprompted (splash only, no coaching).
- [ ] A full round (win or lose) completes in 2–8 minutes.
- [ ] Losing all bodies to officers is possible and clearly communicated.
- [ ] FRANTIC visibly ends a 80%-assimilated round in under 60 seconds.
- [ ] Every input in Section 5's desktop table works as documented.
**Proves:** the complete rule set holds up; the snowball and the FRANTIC payoff land.

### M2 — Feel

**Goal:** juice the loop.
**Deliverables:** hive glow + motes, scream ring VFX, screen shake on shots/siren, conversion pop tween, all P0 SFX synthesized, mute persistence, alert-max siren visual (red vignette pulse).
**Acceptance criteria:**
- [ ] Every P0 SFX event in Section 10 fires; audio starts only after the Play gesture; M mutes everything instantly.
- [ ] 60 fps sustained with 200 entities + 150 particles (verified via debug FPS on `?npcs=100`).
- [ ] A muted, sound-off playthrough still communicates every game state visually.
**Proves:** the fantasy (sinister → gleeful flood) reads emotionally, not just mechanically.

### M3 — Playtest build

**Goal:** shippable, measurable playtest artifact.
**Deliverables:** `?debug=1` overlay + cheat keys, `?nocops`/`?npcs`/`?hive`/`?skip` flags, seed on end screen, touch controls (P1), generative ambient drone (P1), deployed to static hosting under `/games/one-of-us/`.
**Acceptance criteria:**
- [ ] Game runs from a static file server with no console errors and no network requests after load.
- [ ] A shared seed URL reproduces a reported situation exactly.
- [ ] Playtest questions from Section 2 gathered from ≥3 players.
**Proves:** the prototype can answer the fun hypothesis with real players.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is `grabTime` 0.8 s right? Too short kills tension, too long makes cascades unfair. Knob: `grabTime`.
2. **(non-blocking — resolve in playtest)** Should panicked humans try to *escape the map* (shrinking the win pool and forcing a "seal the exits" objective) instead of huddling? Currently NO — huddling only. Test by observing whether late-game huddles feel like fun set-pieces or turtling. If escape is wanted, it's a P1 mechanic behind a future `escapeEnabled` flag. ⚑
3. **(non-blocking — resolve in playtest)** Do 360° vision circles feel fair, or do players demand facing cones? Knob: swap `witnessRadius` circle for a 120° cone — architecture keeps the LOS check pluggable.
4. **(non-blocking — resolve in playtest)** Is the officer risk curve right (aim telegraph 0.5 s / cooldown 1.2 s)? Knobs exist for both.
5. **(non-blocking)** Does the human "rescue assimilated members" mechanic from the source idea add anything at this scope? Deferred to P2 — the officer shooting already provides "you can lose parts of you."
6. **(non-blocking)** Grade thresholds (S/A/B) are a guess; tune after 10 playtests.

No blocking questions — the doc is implementable as written.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → seeded PRNG + map generation → headless sim core (entities, flocking, LOS, grab/witness/alert state machine) → input (rally point, camera) → canvas renderer → rules/win-lose → HUD & screens → FRANTIC → officers/reinforcements → audio → juice → flags/debug.

**Keep the sim headless.** Everything under `src/sim/` must run without DOM/canvas: `new Sim(CONFIG, seed)` + `sim.tick(dt)` + `sim.setRally(x,y)` + `sim.frantic()`; renderer and audio subscribe to a `sim.events` array drained each frame (`grab_start`, `assimilated`, `witness`, `alert_max`, `shot`, `win`, `lose`). This lets unit tests assert e.g. "a grab with a witness in LOS raises alert by 18" and "60 assimilations triggers win" with no browser.

**File layout (repo == deployable — zero build):**

```
public/games/one-of-us/
├── index.html          # canvas + UI overlay divs, loads src/main.js as module
├── design.md           # this document
└── src/
    ├── config.js       # CONFIG object + VERSION (single source of truth)
    ├── main.js         # boot, game loop (fixed 60 Hz tick), screen state machine
    ├── input.js        # mouse/keyboard/touch → rally point, camera, hotkeys
    ├── render.js       # canvas drawing, camera, VFX/particles
    ├── audio.js        # Web Audio synth SFX, mute persistence
    ├── ui.js           # splash / HUD / pause / end screens (DOM overlay)
    └── sim/
        ├── sim.js      # tick loop, entity store, event queue, win/lose
        ├── map.js      # seeded city-block generation, AABB list
        ├── rng.js      # mulberry32 seeded PRNG
        ├── steering.js # flock/seek/separate/avoid, wander
        ├── los.js      # segment-vs-AABB line of sight (cached 100 ms)
        └── humans.js   # civilian/athlete/officer behavior state machines
```

Static deploy = copy `public/games/one-of-us/` to the host. No build step, no `node_modules`.

**Final reminders:** prove the loop with circles and rectangles at M0 before spending a minute on glow or sound — if stalking and grabbing isn't tense with placeholder dots, art will not save it. Ship every milestone in a runnable state. The logistics layer, rival hives, hero squads, and campaign structure are all P2/cut: do not build them.
