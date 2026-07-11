# WORMLINE — Game Design Document

> Source idea: [Game Idea 5 - Trains but in space (Theme: Wormholes/Teleportation)](/game-idea-5-trains-but-in-space-theme-wormholes-teleportation)

## 1. Title & one-liner

**Working title: WORMLINE** ⚑ (overridable)

Alternates: *Relativistic Rails*, *First to Fold*, *Generation Gap*, *Quantum Junction*.

**One-sentence description:** A turn-based network-building strategy game where you race rival mega-corporations to link star systems with wormholes by launching slow, expensive generation ships whose destinations stay secret until they arrive.

**Genre:** Turn-based strategy / economic network builder ("Ticket to Ride meets space logistics").

**Elevator pitch:** Every wormhole starts as a generation ship crawling between stars for turns on end. A shared market shows lucrative trade routes whose payouts grow every turn they go unclaimed — but only the *first* corporation to connect a route's two endpoints with its own wormhole network collects, forever. You can see that a rival just launched a ship from Vega, but not where it's headed. Is it racing you to the fat route you've been building toward for five turns, or bluffing toward something else? Commit early and cheap, or wait for the pot to grow and risk arriving second to a worthless finish line.

**Adaptation note:** The source idea is a competitive multiplayer board game. Per the static-hosting constraint, this prototype is **single-player versus two simple AI corporations on one screen**; the hidden-destination bluffing is preserved by hiding AI ship destinations from the player (and player destinations from the AI heuristics) until arrival.

## 2. Fun hypothesis

**The question this prototype answers:** *Is it fun to commit multi-turn, hidden-destination investments against rivals doing the same — i.e., does "I can see they launched, but not where to" create real tension and satisfying wins/gut-punch losses?*

Everything in P0 serves this: growing route pots (reason to wait), slow ships (reason to commit early), visible launches with hidden destinations (the bluff), and first-to-claim exclusivity (the race).

**Playtest questions:**

1. Did you ever change your plan because of what an AI launched (or didn't)? Describe the moment.
2. When you lost a route race by one turn, did it feel tense/fair, or arbitrary?
3. Did you ever deliberately wait for a route's pot to grow instead of racing immediately? Did that choice feel meaningful?
4. Could you tell why you won or lost at the end?
5. Did the 15–25 turn game length feel too long, too short, or right?

## 3. Design pillars

1. **The race is the game.** Every mechanic must feed the question "who gets there first?" Route exclusivity, ship travel time, and pot growth all exist to create races. No mechanic that doesn't sharpen a race.
2. **Visible commitment, hidden intent.** Launches are public; destinations are secret until arrival. Anything that fully reveals intent (e.g., ships visibly flying toward their destination) is forbidden.
3. **Slow money is an engine.** Claimed routes pay every turn. The player who converts early income into more reach should snowball — the prototype must let a good economy visibly compound.
4. **Readable at a glance.** One screen, no scrolling, no hidden submenus. A player must be able to read the whole strategic situation (map, market, treasuries, ships in transit) in under 10 seconds.

## 4. Core game loop

Session target: one full game = **5–8 minutes** (`cfg.maxTurns` = 20 rounds, ~15–20 s per round).

A round has four named phases, resolved in this fixed order:

```
            ┌────────────────────────────────────────────────┐
            v                                                │
  [1 INCOME]──>[2 COMMAND]──>[3 TRANSIT]──>[4 MARKET]────────┘
   all corps     player acts    ships move    pots grow,
   collect       then AIs act   arrivals      new routes
   credits       (hidden dests) build links,  revealed
                                routes claim
```

**Phase 1 — INCOME (automatic, ~0.5 s).** Every corporation gains `cfg.baseIncome` plus the revenue of each route it has claimed. The player *sees* credit counters tick up and *feels* the engine compounding (or stalling).

**Phase 2 — COMMAND (player-paced, the whole decision space).** The player launches zero or more generation ships (click origin system → click destination system → confirm cost) and then presses **End Turn**. Each AI then secretly queues its own launches; the player *sees* only "Corp B launched a ship from Vega (arrives T+3)" banners — origin and ETA public, destination hidden. The player *feels* the poker read: "what are they going for?"

**Phase 3 — TRANSIT (automatic, ~1 s).** All in-flight ships advance one turn. Ships arriving this turn snap a new wormhole link onto the map (public, permanent). Immediately after arrivals, route claims are checked: any corporation whose own wormhole network now connects a market route's two endpoints claims it (first-come; simultaneous completions broken by seeded random order — see §7). The player *sees* links flash into existence and route cards slam onto claimers' tallies, and *feels* triumph or the gut-punch of arriving second.

**Phase 4 — MARKET (automatic, ~0.5 s).** Every unclaimed route's revenue increases by `cfg.potGrowth`. Empty market slots are refilled from the route deck. The player *sees* the pots fatten and *feels* the greed/risk tension for next round.

Loop repeats until turn `cfg.maxTurns` ends or a corporation claims `cfg.routesToWin` routes (instant win).

## 5. Inputs & controls

Touch is **viable and supported**: the entire game is discrete tap targets (systems, buttons); no dragging, no timing, no hover-critical info. Hover tooltips have tap equivalents (tap = select + show info).

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Left-click a system you have presence at | Tap same | Select launch origin (highlights reachable state) |
| Left-click any other system | Tap same | Select destination; shows cost + ETA preview |
| Click **Launch** button in preview panel | Tap same | Confirm launch (deducts credits, ship departs next TRANSIT) |
| Click **Cancel** / press `Esc` | Tap empty space | Cancel current selection |
| Click **End Turn** button / press `Space` or `Enter` | Tap End Turn button | End COMMAND phase |
| Hover a route card or system | Tap it | Show tooltip (route endpoints highlighted on map, revenue, distances) |
| Press `M` / click speaker icon | Tap speaker icon | Mute/unmute all audio |
| Press `R` / click restart icon (with confirm) | Tap restart icon | Restart game (new seed unless `?seed=` set) |
| Press `P` / click pause icon | Tap pause icon | Pause (freezes phase animations; game is turn-based so this only halts autoplay of phases 3–4) |
| Press `H` / click **?** icon | Tap **?** icon | Reopen rules overlay (same content as splash) |

No other inputs exist. Debug cheat keys are listed in §12 and only active with `?debug=1`.

## 6. Game elements

All coordinates are in a fixed logical space of **1000 × 700 units**, scaled to fit the viewport (SVG viewBox).

### 6.1 Star systems (nodes)

- **Count:** `cfg.systemCount` = 12, placed by seeded Poisson-disc-style rejection sampling (min pairwise distance `cfg.minSystemGap` = 130 units, min 60 units from edges).
- **Looks:** Placeholder = 14 px radius circle with 1-letter label (A–L). Final = same circle with a soft radial glow and a procedurally generated 2-syllable name (e.g., "VE-GA", "KOR-TH") from a seeded syllable table.
- **Behavior:** Static. A system is "presence" for a corporation if it is that corporation's home system or an endpoint of any wormhole that corporation owns. Presence systems get a colored ring per owning corp (up to 3 concentric thin rings).
- **Interacts with:** ships (origins/destinations), routes (endpoints), player input (click targets).
- **Config keys:** `systemCount`, `minSystemGap`.

### 6.2 Corporations (3 total: 1 human + 2 AI)

- **Player corp:** cyan. **AI "Helios Combine":** amber, greedy heuristic. **AI "Duskline Ltd":** magenta, opportunist heuristic (see §8).
- **State per corp:** credits (starts `cfg.startCredits` = 15), home system (the 3 mutually farthest systems, assigned by seed), owned wormholes (set of system pairs), claimed routes, ships in transit.
- **Looks:** No avatar; represented by a treasury panel (name, credit count, claimed-route count, in-transit ship count) and by link/ring colors on the map.

### 6.3 Generation ships

- **Behavior:** Launched from a presence system toward any other system. Cost = `cfg.shipCostBase` + `cfg.shipCostPerTurn` × travelTurns, where travelTurns = `max(cfg.shipMinTurns, ceil(euclideanDist / cfg.shipSpeed))`. With defaults (base 6, perTurn 2, speed 250, minTurns 2): a close hop costs 10 cr and takes 2 turns; a cross-map run costs ~14 cr and takes 4 turns. Ships advance 1 turn per TRANSIT phase; on arrival they are consumed and create a wormhole link (origin ↔ destination) owned by their corporation.
- **Hidden destination:** Own ships render as a small triangle moving along the origin→destination line with an ETA number. **Rival ships render as a pulsing triangle orbiting their origin system** with an ETA number and a "?" — never a vector (pillar 2). AI heuristics likewise never read the player's ship destinations, only origins and counts.
- **Looks:** Placeholder = 8 px triangle in corp color. Final = same triangle with a 3-dot engine-trail.
- **Edge behavior:** Launching to a system you already link to from that origin is allowed but the UI shows a "duplicate link" warning ⚑ (overridable). Multiple corps may own parallel links between the same pair.
- **Config keys:** `shipCostBase`, `shipCostPerTurn`, `shipSpeed`, `shipMinTurns`.

### 6.4 Wormhole links

- **Behavior:** Permanent, public, owned edges between two systems. Only the owner's network uses them for route claims (no tolls, no sharing in P0). Grant presence at both endpoints to the owner.
- **Looks:** Placeholder = 3 px straight line in corp color. Final = slightly curved line with a slow animated dash ("energy flow"). New links flash white for 0.6 s on creation.

### 6.5 Route cards (the market)

- **Market:** `cfg.marketSlots` = 3 face-up cards drawn from a deck of `cfg.routeDeckSize` = 10 routes, generated at game start from system pairs with distance ≥ `cfg.routeMinDist` = 350 units (seeded shuffle; endpoints spread so no system appears on more than 3 deck routes).
- **Card data:** source system, destination system, current revenue. Starting revenue = `cfg.routeRevenueBase` (2) + `floor(dist / cfg.routeRevenuePerDist (200))` → 3–6 cr/turn. Grows by `cfg.potGrowth` = 1 each MARKET phase while unclaimed, capped at `cfg.potCap` = 15.
- **Behavior:** Claimed the instant a corp's own link network connects source to destination (any path length). Claimed cards move to the claimer's tally and pay their *revenue at time of claim* every INCOME phase thereafter (locked in — the growth stops).
- **Looks:** Placeholder = a bordered rectangle listing "A ↔ F · 7 cr/turn". Hover/tap highlights both endpoints on the map with a dashed indicator line.
- **Config keys:** `marketSlots`, `routeDeckSize`, `routeMinDist`, `routeRevenueBase`, `routeRevenuePerDist`, `potGrowth`, `potCap`.

### 6.6 Hazards / pickups

None in P0–P2. (A "solar storm delays ships" event was considered and cut — it dilutes the race; fails pillar 1.) ⚑ (overridable)

## 7. Rules, win & lose conditions

**Setup.** 12 systems placed by seed. Each corp starts with `cfg.startCredits` = 15, presence at its home system only, no links, no routes. Market opens with 3 route cards.

**Turn order within a round.** INCOME → COMMAND (player commits, then AI A, then AI B — all launches take effect simultaneously) → TRANSIT → MARKET. Fixed and deterministic given the seed.

**Route claiming (exact rule).** After all arrivals in a TRANSIT phase, evaluate market routes in a *seeded-random order per round*. For each unclaimed route, check corps in a seeded-random order per round: a corp claims it if BFS over that corp's own links connects the route's endpoints. First qualifying corp in that order gets it. This resolves the "two ships complete the same route on the same turn" edge case: a fair seeded coin flip, reproducible under `?seed=`. The loser's link remains on the map (still grants presence and may serve future routes).

**Retroactive claims.** Claim checks run every TRANSIT phase against the *current* market, so a new market card whose endpoints a corp already connects is claimed by that corp on the next TRANSIT phase. This is intentional — it rewards building a hub network. ⚑ (overridable)

**Victory (in priority order):**

1. **Instant win:** the first corp to claim `cfg.routesToWin` = 4 routes wins immediately at that TRANSIT phase.
2. **Turn-limit win:** if no instant win by the end of round `cfg.maxTurns` = 20, the corp with the most credits wins. Tie-break: more claimed routes, then more links, then seeded coin flip.

**Loss:** any victory by an AI corp. There is no elimination — a broke player still collects base income and can re-enter the race.

**Round end / game end.** End screen (§11) shows winner, final treasuries, routes claimed per corp, and a "biggest race" callout (the route claimed with the smallest turn margin — computed by logging, per claimed route, the arrival turns of every corp's would-have-completed links).

**Edge cases (decided):**

- Ship in transit when the game ends: it is worthless; ignored in scoring.
- Route deck exhausted: market shrinks as cards are claimed; game continues to the turn limit.
- Player can't afford any launch: End Turn is always available; a subtle "banking..." hint shows.
- Launch to origin = destination: blocked by UI (destination click on origin cancels selection).
- Credits are never negative: Launch button disabled when cost > credits.
- Simultaneous instant-win (two corps hit 4 routes in the same TRANSIT): the seeded claim order already serializes claims, so exactly one corp reaches 4 first.

## 8. Difficulty & progression

Single tuned difficulty (pillar: prototype tests fun, not balance curves). Challenge shape *within* a game is emergent:

- **Early (T1–5):** cheap nearby links, everyone establishes presence; low tension.
- **Mid (T6–14):** pots have grown, networks near completion on multiple routes; maximum racing tension. This window is the fun hypothesis — tune `potGrowth`, `shipSpeed`, and `routeMinDist` to make it dominate.
- **Late (T15–20):** engines pay out; leader tries to close the instant win, trailers snipe fat pots.

**AI difficulty knobs instead of levels:**

- *Helios Combine (greedy):* each COMMAND phase, targets the highest-value affordable market route it can advance; launches the single missing link with the best (revenue ÷ turns-to-complete) ratio; banks otherwise. Skips its turn entirely with probability `cfg.aiBlunderChance` = 0.15 (the human's edge).
- *Duskline Ltd (opportunist):* same evaluator, but scores routes by (revenue ÷ turns) × 1.5 if either endpoint is a system where a *rival ship recently arrived or a rival has presence* — it crowds contested space, creating races. Same `aiBlunderChance`.
- Both AIs never read hidden destinations (pillar 2); they see exactly what the player sees.
- `?bots=hard` sets `aiBlunderChance` = 0 for stronger play (P1).

No meta-progression across games. Difficulty rebalancing = editing the config object.

## 9. Style & theme

**Visual style:** Flat vector, dark-void space, thin luminous lines — "airline route map drawn in neon on a blackboard." No textures, no gradients except node glows. Everything is SVG shapes.

**Palette (6 colors + neutrals):**

| Role | Hex |
|---|---|
| Background (deep space) | `#0B1026` |
| Stars / neutral lines / text-dim | `#6B7394` |
| UI text / bright | `#E8ECF8` |
| Player (cyan) | `#4DD9FF` |
| AI Helios (amber) | `#FFB84D` |
| AI Duskline (magenta) | `#FF5FA2` |
| Positive flash (claims, income) | `#7CFFB2` |

**Typography:** System font stack, `ui-monospace, "Cascadia Mono", Consolas, monospace` for numbers and labels (tabular, techy), sans-serif for prose on splash. No webfonts (no runtime network calls).

**Tone/mood:** Cold, patient, corporate-vast. Copy is dry corporate-memo speak ("Route DELTA–KORTH secured. Shareholders notified.").

**References:** the elegant map-glow of *Mini Metro*, the economic patience of *Ticket to Ride*, the deep-space quiet of *Outer Wilds*' map screen.

**Placeholder art plan (M0–M1):** circles for systems, straight 3 px lines for wormholes, triangles for ships, plain bordered divs/rects for cards and panels, single background color, no glow, no starfield. Final pass (M2) adds: seeded starfield dots (150 static 1 px circles), node glows, dashed-flow link animation, name labels.

## 10. Sound design

**Implementation:** Web Audio API with small synthesized SFX (jsfxr-style parameter blips generated in code) — zero audio asset files. A single `audio.js` module exposes `sfx(name)` and `setMuted(bool)`. AudioContext is created/resumed only on the first user gesture (the splash Play click). Mute toggle is **P0**, persisted to `localStorage`.

**SFX event table:**

| Game event | Sound description | Priority |
|---|---|---|
| Launch confirmed | Short rising swoosh (200→600 Hz saw, 0.25 s) | P0 |
| Ship arrival / link created | Soft "snap" — filtered noise click + low sine thunk | P0 |
| Route claimed by player | 3-note ascending major arpeggio, bright | P0 |
| Route claimed by AI | 2-note descending minor dyad, dull | P0 |
| End Turn / phase tick | Tiny muted click | P0 |
| Insufficient credits / invalid click | Flat 120 Hz buzz, 0.1 s | P0 |
| Game won | 5-note fanfare arpeggio | P1 |
| Game lost | Slow 2-note descending drone | P1 |
| Pot growth tick (market phase) | Single soft coin blip (only when a pot hits its cap) | P1 |
| Button hover | 1 ms tick | P2 |

**Music:** none in P0–P1. P2: a generative 2-oscillator ambient drone (slow detuned sines, seeded note choices) — never copyrighted tracks. ⚑ (overridable)

## 11. UI & screens

**Screen flow:** `Splash → Game → End screen → (Restart) → Splash-skipped Game`. The rules overlay (`H`) reuses the splash content over the paused game.

### Splash screen (mandatory)

- Title **WORMLINE** + one-liner: "Race rival corporations to wire the galaxy with wormholes."
- Rules/goal in 5 bullets:
  - Launch generation ships between stars to build wormhole links.
  - Connect a market route's two stars with *your* links to claim it — first corp only.
  - Claimed routes pay you every turn, forever. Unclaimed routes grow richer every turn.
  - Rivals' launches are public; their destinations are not. Neither are yours.
  - Win by claiming 4 routes — or have the most credits at turn 20.
- Controls: "Mouse/tap: click a star you own, click a target star, Launch. Space/Enter = End Turn, M = mute, R = restart, H = rules."
- Version number (e.g. `v0.1.0`) rendered from a single `const VERSION` in `config.js`; the debug overlay reads the same constant.
- One large **▶ PLAY** button (this gesture also unlocks audio).

### Game screen (single screen, no scrolling)

- **Map (center, ~75% width):** SVG starfield, systems, links, ships.
- **Market strip (top):** 3 route cards + turn counter "TURN 7 / 20" + phase indicator.
- **Treasury column (right):** one panel per corp — name, color chip, credits, routes claimed (icons), ships in transit ("2 in transit ✦ ETA 1, 3").
- **Action bar (bottom):** contextual launch preview ("Vega → Korth · 12 cr · arrives T+3 · [LAUNCH] [CANCEL]") and the **END TURN** button (large, always visible), plus mute / restart / rules / pause icons.
- **Event ticker (bottom-left, last 3 events):** "Duskline launched from Korth (ETA 3)", "You claimed VEGA–ASHT (+7/turn)".
- HUD always shows: credits, turn number, phase, market, in-transit counts. Nothing essential is hover-only.

### End screen

- Banner: "VICTORY — Wormline Interstellar" or "DEFEAT — Helios Combine wins".
- Table: per-corp credits, routes claimed, links built.
- "Biggest race" callout (route + turn margin).
- Buttons: **PLAY AGAIN** (new seed) and **REMATCH** (same seed). Version number in the corner.

## 12. Config & tuning

Single exported object in `src/config.js`; every value below lives there and nowhere else.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | `"0.1.0"` | string | splash + debug overlay version display |
| `maxTurns` | 20 | rounds | game length |
| `routesToWin` | 4 | routes | instant-win threshold |
| `startCredits` | 15 | cr | opening economy |
| `baseIncome` | 3 | cr/turn | income floor for every corp |
| `systemCount` | 12 | nodes | map density |
| `minSystemGap` | 130 | units | map spacing (1000×700 space) |
| `shipCostBase` | 6 | cr | flat part of launch cost |
| `shipCostPerTurn` | 2 | cr/turn | distance part of launch cost |
| `shipSpeed` | 250 | units/turn | travel time divisor |
| `shipMinTurns` | 2 | turns | minimum travel time |
| `marketSlots` | 3 | cards | simultaneous open routes |
| `routeDeckSize` | 10 | cards | total routes per game |
| `routeMinDist` | 350 | units | minimum route span (keeps routes multi-link) |
| `routeRevenueBase` | 2 | cr/turn | route starting revenue floor |
| `routeRevenuePerDist` | 200 | units/cr | distance→revenue conversion |
| `potGrowth` | 1 | cr/turn | unclaimed route escalation |
| `potCap` | 15 | cr/turn | max route revenue |
| `aiBlunderChance` | 0.15 | probability | AI skip-turn rate (difficulty) |
| `phaseAnimMs` | 600 | ms | TRANSIT/MARKET animation pacing |

**URL flags:**

- `?seed=12345` — seeds all randomness (map, deck, names, claim tie-breaks, AI rolls) via a single mulberry32 PRNG; identical seed ⇒ identical game given identical inputs.
- `?debug=1` — overlay showing FPS, current phase/turn, seed, AI target routes (their current evaluator pick), and cheat keys: `1` +20 cr to player, `2` reveal AI ship destinations, `3` skip to TRANSIT resolution, `4` fast-forward 5 rounds with AI-only play.
- `?bots=hard` — sets `aiBlunderChance` to 0.
- `?skip=1` — bypass splash straight into a game (playtest convenience).
- `?turns=N` — override `maxTurns` for quick sessions.

## 13. Tech stack

**Vanilla JavaScript (ES modules) + SVG rendering, zero-build.** This is a map-and-lines game with at most ~40 visible elements (12 nodes, ≤30 links, ≤9 ships, 3 cards) — exactly the illustrated/map-like case where SVG wins: free hit-testing on click targets, crisp scaling at any viewport, CSS transitions for flashes and dashes, and trivially inspectable output. No Canvas, no Pixi, no physics engine (nothing here is continuous-time), no framework, no bundler. Ship as `index.html` + `src/*.js` modules + `style.css`; deploy by copying the folder to any static host. State is in-memory; only the mute preference touches `localStorage`. 60 fps is trivial at this element count — perf budget: ≤200 SVG elements total (including 150 starfield dots), ≤20 concurrent CSS animations, no per-frame JS except during the ≤1 s phase animations (turn-based game idles at 0 CPU).

## 14. Milestones

### M0 — Toy loop (prove the race)

**Goal:** Full round cycle playable with rectangles/circles; player vs 2 greedy AIs; no art, sound, splash, or names.
**Deliverables:** seeded map gen, launch input (click-click-confirm), transit + arrival + link creation, market with growing pots, claim detection (BFS), income, end-at-turn-20 with a `window.alert` winner.
**Acceptance criteria:**

- [ ] A full 20-turn game completes without errors and declares a winner.
- [ ] The player can claim a route by chaining 2+ links, and it pays every INCOME phase.
- [ ] An AI visibly races the player to at least one route in most games (observe 3 seeds).
- [ ] Rival ship destinations are not shown or inferable from the render.
- [ ] `?seed=` reproduces the identical map, deck, and AI behavior across two runs with identical player inputs.

**Proves:** whether hidden-destination races generate tension with zero dressing. *If M0 isn't fun, stop.*

### M1 — Real rules

**Goal:** Complete P0 ruleset and full screen flow.
**Deliverables:** splash (rules, controls, version, Play), HUD panels (market strip, treasuries, action bar, event ticker), end screen with stats + Play Again/Rematch, instant win at 4 routes, all edge cases from §7, pause/restart/rules overlay, both AI personalities, touch input verified.
**Acceptance criteria:**

- [ ] A first-time player understands what to do within 60 seconds unprompted (splash only, no coaching).
- [ ] Every input in §5 works on desktop; core loop is playable by tap on a touch device or DevTools touch emulation.
- [ ] End screen correctly reports winner, per-corp stats, and the biggest-race margin.
- [ ] Restart mid-game and Rematch (same seed) both work without page reload.
- [ ] No console errors across 3 full games.

### M2 — Feel

**Goal:** Make claims and arrivals land emotionally.
**Deliverables:** palette + glow art pass per §9, starfield, system names, link-flash and card-claim animations (CSS transitions, ≤`phaseAnimMs`), all P0 SFX + mute persistence, income tick-up counters, event ticker polish.
**Acceptance criteria:**

- [ ] A route claim (yours vs theirs) is unmistakable with sound off, and *feels* different with sound on.
- [ ] Phase animations never block input for more than 1.5 s per round.
- [ ] Mute persists across reloads; no audio plays before the first user gesture.
- [ ] Steady 60 fps during TRANSIT animations on a mid-range laptop (DevTools performance check).

### M3 — Playtest build

**Goal:** Deployed, instrumented, tunable.
**Deliverables:** all §12 URL flags + debug overlay + cheat keys, deployed under `/games/space-trains/` on the static site, README-level tuning notes in code comments, P1 items if time allows (win/lose fanfares, `?bots=hard`, pot-cap blip).
**Acceptance criteria:**

- [ ] Game runs correctly from the deployed static URL with no network calls after page load (verify in DevTools Network tab).
- [ ] `?debug=1`, `?seed=`, `?skip=1`, `?turns=` all function on the deployed build.
- [ ] Two playtesters complete a game each and answer the §2 questions; answers recorded.

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is 20 turns the right length, or does the endgame drag once the leader is obvious? Knob: `maxTurns`, `?turns=N`.
2. **(non-blocking — resolve in playtest)** Does locking a route's revenue at claim time (vs. continuing to use current pot value) make waiting *too* attractive? Knob: flip one boolean `lockRevenueOnClaim` ⚑ (implemented as a config flag, default `true`).
3. **(non-blocking — resolve in playtest)** Is `aiBlunderChance` 0.15 too generous once the player learns the game? Knobs: `aiBlunderChance`, `?bots=hard`.
4. **(non-blocking — resolve in playtest)** Should rival ship ETAs be public? Currently yes (origin + ETA public, destination hidden). If playtests show ETA leaks too much intent (long ETA ⇒ far target), hide ETA behind config flag `showRivalEta` (default `true`).
5. **(non-blocking — resolve in playtest)** Route deck of 10 for a 20-turn game — do games end with dead market slots? Knobs: `routeDeckSize`, `marketSlots`.

No blocking questions. All decisions required for implementation are made above.

## 16. Handoff notes for Fable

**Build order:** `rng.js` (mulberry32 + seeded shuffle) → `config.js` → `sim.js` (pure game state + phase functions + BFS claim check + AI evaluators — no DOM) → `render.js` (SVG from state) → `input.js` (selection state machine: idle → originPicked → destPicked) → `ui.js` (screens, panels, ticker) → `audio.js` (Web Audio synth) → juice pass.

**Keep the sim headless.** `sim.js` must export `createGame(seed, cfg)` and `advance(game, playerOrders)` returning plain-object state, with zero DOM/SVG imports. A Node-runnable test (`tests/sim.test.js`, plain `node --test`) should assert: seeded determinism (same seed + same orders ⇒ deep-equal states), claim BFS correctness, simultaneous-claim tie-break, income math, and instant-win priority. The AI functions take (state-as-visible-to-that-corp) so hidden-destination discipline is enforced by construction — build a `visibleState(game, corpId)` projector and pass AIs only that.

**Repo / deploy layout:**

```
public/games/space-trains/
  design.md          (this file)
  index.html         (single entry, loads src/main.js as module)
  style.css
  src/
    main.js  config.js  rng.js  sim.js  render.js  input.js  ui.js  audio.js
  tests/
    sim.test.js      (node --test; not needed at runtime)
```

The deployable output *is* this folder — no build step. Everything under `src/` is plain ES modules; `index.html` references them relatively so the game works from any static path.

**Reminders:** prove the loop with circles and triangles before any glow or starfield — M0's fun check is the whole point. Every milestone must leave `index.html` runnable. All tuning goes through `config.js` only; if you find yourself typing a magic number in `sim.js`, move it to config. No runtime network requests, ever — verify with the Network tab before calling M3 done.
