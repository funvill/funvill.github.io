# Petal Pusher — Game Design Document

> Source idea: [Game Idea 25 - Flowers shop (Theme: Unsettlingly wholesome)](/game-idea-25-flowers-shop-theme-unsettlingly-wholesome)

## 1. Title & one-liner

**Working title:** *Petal Pusher*

**Alternates:** *Bloom & Gloom*, *Fresh Cut*, *Everything Here Was Beautiful*, *The Flower Man*, *In Living Color*

**One-liner:** A cozy flower-shop sim where the town adores you, demand keeps growing, and the color quietly never comes back.

**Genre:** Wholesome shopkeeping sim with a slow-burn environmental twist (top-down gather phase + dialog-driven sell phase).

**Elevator pitch:** Every morning you stroll a storybook village picking wildflowers; every afternoon you sell them over the counter to townsfolk who tell you tiny, warm stories about who the flowers are for. It is genuinely pleasant. But picked flowers never grow back, and a few days after you strip a meadow, its color starts to drain away — first the meadow, then the street, then the town, all rendered on one single screen so you watch it happen. As the world grays, the townsfolk need you more, pay more, thank you harder. Nobody ever accuses you. Nobody ever finds out. The game never says you did anything wrong. When the last color is gone, you pack your wagon for the next town. (AKA cute drug dealer with flowers.)

**Adaptation note:** The source idea is already a game; the one structural adaptation is compressing "a few dozen rounds" into a 7–10 day arc so a full run fits a playtest sitting, with the pacing exposed as config knobs. ⚑ (overridable)

---

## 2. Fun hypothesis

**The single question this prototype answers:**

> Does being loved for the harm you enable actually land — i.e., is a genuinely pleasant sell-flowers loop made *more* compelling (not less) by watching the town visibly gray out because of you, with zero punishment, accusation, or moralizing?

Two sub-claims P0 must test together, because the idea fails if either half fails:

1. The afternoon sell phase is wholesome and rewarding enough that players *want* to keep doing it on its own merits.
2. The color drain + dialogue shift produces the intended quiet dread *without any UI callout* — the player must connect the dots themselves.

**Playtest questions (ask after one full run, or at least 5 in-game days):**

1. On which day did you first notice the world losing color? Did you realize *you* were causing it — and when?
2. Once you knew, did you change how you played (pick less, avoid gardens, pick *more*)? Why?
3. Which dialogue line stuck with you? Did any customer moment feel bad — and did the game ever *tell* you to feel bad? (Correct answer: no.)
4. Was the afternoon shop phase pleasant enough that you'd play it even without the twist?
5. When the "next town" screen appeared, what did you feel — and did you want to click it?

---

## 3. Design pillars

1. **The sell is the treat.** The shop counter is juicy, warm, and generous: hearts, chimes, kind words, easy money. It must be the part the player looks forward to. Any friction added to the afternoon phase is a bug.
2. **Never punished, never accused.** No fail state, no reputation loss, no NPC ever suspects the player. Gratitude *increases* with damage. Even "someone took my flowers" is grief shared with a friend, not an accusation. The game's UI never displays a morality meter, warning, or judgment of any kind.
3. **The world tells the truth, silently.** The whole town lives on one static screen. Grayness is shown, never stated: no "vitality: 43%" numbers, no tutorial text about ecology. The visual is the message.
4. **Tight daily loop.** One day = one round = 2–3 minutes: 75-second morning gather, untimed-but-brisk afternoon sell, 5-second night transition. The loop rhythm is sacred; cut content before you slow the loop.

If a feature doesn't serve one of these, cut it.

---

## 4. Core game loop

One **day** is the round unit. A day takes **2–3 minutes**. A full run is **7–10 days ≈ 18–25 minutes** — deliberately longer than a typical prototype round, because the fun hypothesis *is* the multi-day arc; `?day=N` and `?fast=1` flags exist so playtesters and the developer can jump the arc. ⚑ (overridable)

```
        ┌────────────────────────────────────────────────────────────┐
        │                          (next day)                        │
        ▼                                                            │
  [1. MORNING]  ───────▶  [2. AFTERNOON]  ───────▶  [3. NIGHTFALL] ──┘
   75s timer.              Untimed. Customers        5s transition.
   Walk the town,          queue at the counter:     Unsold stems wilt.
   pick flowers            read their line, build    Zone grayness
   (basket cap 8).         a 1–3 stem bouquet,       catches up +
   Flowers picked          hand it over. Hearts,     spreads. Day++.
   never respawn.          coins, gratitude.
        │
        │  end-of-day check: townGray ≥ 92, OR all stock picked, OR day > 12
        ▼
  [4. THE NEXT TOWN]  final screen: wagon, stats, pressed-flower book (P1)
```

**What the player does / sees / feels per phase:**

| Phase | Does | Sees | Feels |
|---|---|---|---|
| 1. Morning | Walks (WASD / tap-to-move), picks flowers near feet, races the bell | Whole town on one screen; flowers as bright dots; basket counter; sun-arc timer | Cozy routine, light time pressure, route-planning ("meadow's thin, hit the riverbank") |
| 2. Afternoon | Clicks stems from tray into a bouquet, clicks GIVE; next customer steps up | Shop counter, customer portrait + name + dialogue line, request tag ("anything cheerful" / "something red"), coin + heart payoff | Warmth, competence, being appreciated — the treat |
| 3. Nightfall | Nothing (watches) | Screen dims; a slow half-second desaturation ripple over drained zones; "Day N" card | A small, wordless wrongness |
| 4. Next Town | Reads stats, clicks the wagon | Fully gray town behind a colorful wagon; totals; book pages (P1) | The intended aftertaste |

**Session target:** a playtester should reach the first *visible* graying by end of day 3 (≈ 7 minutes in) and the mid-game dialogue shift by day 4–5.

---

## 5. Inputs & controls

Touch-viable: **yes** — tap-to-move covers the morning, and the afternoon is already point-and-click. Desktop is primary.

| Input (desktop) | Context | Action |
|---|---|---|
| `WASD` / arrow keys | Morning | Move player (speed `playerSpeed`) |
| `Space` or `E` | Morning | Pick nearest flower within `pickRadius` |
| Mouse click on flower | Morning | Player auto-walks to it and picks it |
| Mouse click on stem in tray | Afternoon | Add stem to bouquet (click again in bouquet to remove) |
| Mouse click **GIVE** button | Afternoon | Hand bouquet to current customer |
| Mouse click **"Sorry, all out"** button | Afternoon | Apologize when tray is empty (customer is gracious) |
| `Enter` | Afternoon | Same as GIVE (if bouquet has ≥1 stem) |
| `P` or `Esc` | Any | Pause overlay (Resume / Restart day / Restart run / Mute) |
| `M` | Any | Toggle mute |
| `R` | Pause / Day End / Final screen | Restart run |
| Click **Play** | Splash | Start run |

| Input (touch) | Context | Action |
|---|---|---|
| Tap ground | Morning | Player walks to tapped point |
| Tap flower | Morning | Player walks to it and picks it automatically |
| Tap stem / GIVE / buttons | Afternoon & menus | Same as mouse click |
| Tap pause icon (top-right, always visible) | Any | Pause overlay (contains mute + restart) |

No other inputs exist. There is no inventory management, no map scrolling, no camera control.

---

## 6. Game elements

### 6.1 The player (the Florist)

- **Looks:** placeholder = a 24×32 px rounded rectangle in apron-teal `#2A9D8F` with a straw-hat circle. Final = simple flat-vector figure with straw hat, apron, and hand basket; 2-frame walk bob.
- **Behaves:** moves at `playerSpeed` (220 px/s), clamped to map bounds; no collision with buildings in P0 (walks "behind" them via draw order) ⚑ (overridable). Picking plays a 350 ms crouch animation (`pickDurationMs`) during which movement is locked.
- **Config:** `playerSpeed`, `pickRadius`, `pickDurationMs`, `basketCapacity`.
- **Interactions:** picks flowers; is the anchor of the shop scene in the afternoon (drawn behind the counter).

### 6.2 Flowers (5 species, P0)

Flowers are pre-placed at seeded positions per zone at run start. **Picked flowers never respawn — ever.** A picked spot leaves a tiny pale stub (2 px dot) so the absence is visible.

| Species | Color | Hex | Found mainly in | Base value |
|---|---|---|---|---|
| Daisy | white | `#FFFFFF` (center `#FFD166`) | Town Square, Elm Gardens | 2 |
| Marigold | orange | `#F4A261` | Meadow, Orchard | 2 |
| Poppy | red | `#E63946` | Meadow, Chapel Hill | 2 |
| Bluebell | blue | `#6C91BF` | Riverbank, Forest Edge | 2 |
| Violet | purple | `#9B5DE5` | Forest Edge, Elm Gardens (rare: 8 total in the run) | 3 |

- **Looks:** placeholder = 8 px colored circle on a 2 px green stem line. Final = 5 tiny flat-vector sprites, gentle 1 px sway.
- **Config:** `stemBasePrice`, per-zone stock table `zoneStock`, species distribution table (data file).
- **Interactions:** picked into basket (morning); become tray stems (afternoon); unsold stems **wilt at nightfall** and are removed (`wiltOvernight`), with a one-line toast on the night card: *"The rest went soft overnight."* No penalty beyond the loss.

### 6.3 Zones (7, P0) — the color-drain system

The map is one static 1280×720 screen divided into 7 hand-authored polygonal zones. Each zone has a flower `stock`, a hidden `targetGray` (0–100) and a rendered `displayGray` (0–100). **This is the core system; implement it exactly:**

**Zone table:**

| Zone | Position | Stock | Adjacent to | Notes |
|---|---|---|---|---|
| Meadow | NW | 16 | Riverbank, Forest Edge | Richest; players strip it first |
| Riverbank | W | 12 | Meadow, Town Square | |
| Forest Edge | N | 12 | Meadow, Orchard | Has 5 of the 8 Violets |
| Orchard | NE | 10 | Forest Edge, Elm Gardens | |
| Elm Gardens | E | 8 | Orchard, Town Square | **Owned:** 3 garden patches belong to Mabel (3 stems), Otto (3), June (2). Picking here triggers theft dialogue (§6.5) |
| Chapel Hill | SE | 8 | Town Square | Farthest from shop; time-pressure content |
| Town Square | Center | 6 | Riverbank, Elm Gardens, Chapel Hill | Shop is here; flowers in planters |

Total stock: **72 stems**. At basket cap 8/day, a maximally efficient player empties the town in 9 mornings.

**Drain rules (evaluated at Nightfall, in this order):**

1. `targetGray[z] = round(100 × picked[z] / stock[z])` — grayness is driven purely by how much of the zone the player has taken.
2. **Blight spread:** for each zone `z` with `displayGray[z] ≥ graySpreadThreshold` (60), every adjacent zone `a` gets `targetGray[a] = min(100, targetGray[a] + graySpreadPerNight)` (+8). Spread is permanent (store the accumulated spread bonus per zone). This guarantees the whole town grays even in zones the player never touched — the damage creeps.
3. **Catch-up:** `displayGray[z]` moves toward `targetGray[z]` by at most `grayCatchupPerNight` (34) per night, never decreasing. The 3-night lag is the point: you strip a meadow and nothing happens; the gray arrives days later, after you've already spent the money.
4. `townGray = mean(displayGray over all 7 zones)` — drives customer count, prices, dialogue stage, sky tint, and end condition. Never displayed as a number.

**Rendering the drain (Canvas 2D, exact method):** at run start, render the full-color town once to an offscreen canvas A; render a fully desaturated copy (per-pixel luminance, tinted 8% toward cold `#9FA3A6`) to offscreen canvas B. Each frame, draw A, then for each zone draw B clipped to the zone polygon (with a 40 px soft feathered edge via a pre-built alpha mask) at `globalAlpha = displayGray/100`. Zone masks are rebuilt only when a `displayGray` changes (nightfall), so per-frame cost is 8 blits. Dynamic sprites (flowers, player, NPCs) are drawn on top in full color — **the player and the flowers are always saturated**; the shop and its wagon are the last colorful things in town. Ambient dressing (butterflies over zones with `displayGray < 30`, 1–2 strolling NPCs when `townGray < 40`, closed shutters when `townGray > 70`) sells the change without words.

- **Config:** `grayCatchupPerNight`, `graySpreadThreshold`, `graySpreadPerNight`, `endGrayThreshold`, `zoneStock`.

### 6.4 The Shop (P0)

- **Looks:** placeholder = a brown rectangle with a door in Town Square (morning) and a full-screen counter scene (afternoon): counter bar across the bottom third, stem tray on the left, bouquet slot center, customer standing behind the counter. Final = flat-vector storefront with striped awning in `#E07A5F`/`#FFF8EC` — the awning never desaturates.
- **Behaves:** morning ends → 1 s wipe → afternoon scene. Customers arrive as a visible queue of portraits on the right edge (max on screen: current + next 2).

### 6.5 Townsfolk (6 named NPCs, P0)

Each afternoon spawns `clamp(2 + floor(townGray / 20), 2, 6)` customers (`customersMin/Max`, divisor `customersPerGray`): 2/day in the colorful town, 6/day near the end. Customers are drawn from the roster below, least-recently-seen first, so every NPC appears roughly every other day; an NPC whose garden was picked that morning is **forced into the next afternoon's queue** (theft lines land the same day).

Each customer requests a bouquet of 1–3 stems (`bouquetMin/Max`, uniform); 40% of requests name a color (`colorRequestChance`), the rest are "anything cheerful." Matching a named color pays `colorMatchBonus` (+1) per matched stem. Any bouquet of ≥1 stem is **always accepted with delight** — a "wrong" color just skips the bonus; there is no rejection, per pillar 2. Payment per stem = `stemBasePrice` + `floor(townGray / tipPerGrayDivisor)` (+1 per full 25 townGray — they tip more as they need you more).

Roster (portraits: placeholder = colored circle + initial; final = flat-vector bust, 2 expressions: warm / tired-warm):

| NPC | Who they are | Owns garden? |
|---|---|---|
| **Mabel** | Retired postmistress, 70s; sister moved away | Yes (3 daisies) |
| **Otto** | Proud gardener, gruff-sweet | Yes (2 violets, 1 daisy) |
| **June** | Young mother | Yes (2 daisies) |
| **Tom** | Mill worker, big soft man; married 31 years | No |
| **Hazel** | Baker; opens early | No |
| **Fern** | Kid, ~9; always buys exactly one daisy for 1 coin | No |

### 6.6 Dialogue system (P0)

Dialogue stage is a pure function of `townGray`: **Early** < 25, **Mid** 25–60, **Late** > 60 (`stageMidThreshold`, `stageLateThreshold`). Each customer says exactly one line per visit, chosen from their pool for the current stage (unused lines first, then reuse), unless a **trigger line** fires (triggers take priority, each fires once). Lines marked **[source]** are from the original idea and must be kept verbatim.

**EARLY (townGray < 25) — wholesome:**

| # | NPC | Trigger | Line |
|---|---|---|---|
| E1 | Mabel | — | "These are for my sister! She just moved away, but flowers make it feel like she's still close." **[source]** |
| E2 | Mabel | bouquet contains Marigold | "My grandson picked the color. He said orange is the happiest one." |
| E3 | June | — | "I don't know why, but having something alive in the house helps." **[source]** |
| E4 | June | — | "For my daughter's teacher. She says the classroom smells like summer now." |
| E5 | Tom | — | "Anniversary today! Thirty-one years. She still pretends to be surprised." |
| E6 | Hazel | — | "I just like having them on the counter. They make the bakery feel busy." |
| E7 | Hazel | first ever sale | "You know, this shop is the nicest thing that's happened to this town in years." |
| E8 | Otto | — | "Thirty years growing my own, and I still can't get violets like yours. What's your secret, eh?" |
| E9 | Fern | — | "One daisy please! It's for the fort. Forts need a flag." |

**MID (townGray 25–60) — something's off, gratitude deepening:**

| # | NPC | Trigger | Line |
|---|---|---|---|
| M1 | Mabel | — | "The mornings feel… quieter lately. These help." **[source]** |
| M2 | June | — | "I don't go outside much anymore. I keep the flowers near the window." **[source]** |
| M3 | Otto | player picked Otto's garden (same/next day) | "Someone took my flowers last night. I don't know why it bothered me so much." **[source]** |
| M4 | Otto | visit after M3 fired | "I bought these to replace the ones I lost. They're… almost the same." **[source]** |
| M5 | Otto | — | "I used to grow my own, you know that? Nothing comes up anymore. Lucky we have you." |
| M6 | Mabel / June | player picked *their* garden | "The strangest thing — my window box is empty. Well. You always have better ones anyway." |
| M7 | Hazel | — | "Is it me, or did the meadow used to be… brighter? Anyway. The usual, please." |
| M8 | June | — | "Two bunches today. One for the table, one for the window. The window one's for me." |
| M9 | Tom | — | "My wife doesn't say much lately. But she waters them. That's something." |
| M10 | Fern | — | "One daisy please. Miss says the school boxes aren't blooming this year, so I bring one in." |

**LATE (townGray > 60) — dependent, still grateful, never accusing:**

| # | NPC | Trigger | Line |
|---|---|---|---|
| L1 | Mabel | — | "I don't remember what color the hills were. Isn't that funny? These help me remember." |
| L2 | Mabel | — | "You're the only color left, dear. I mean the shop. The shop is." |
| L3 | Hazel | — | "I waited outside before you opened. I hope that's not strange." |
| L4 | Hazel | — | "Everyone says the gray is just the weather. But your flowers never are. How do you do it?" |
| L5 | Tom | — | "Whatever you have. Anything. It doesn't matter what kind anymore." |
| L6 | Tom | — | "Take the extra coin. Please. I don't know what I'd do if you closed." |
| L7 | June | — | "My sister came to visit. She left the next morning. She said it's hard to breathe here. More for me, I suppose." |
| L8 | Otto | — | "I turned my garden over twice this spring. The dirt's the wrong color now. So — the usual, and one extra." |
| L9 | Fern | — | "Grandma says put it where the window used to get sun. I don't get it. Windows don't move." |

**System lines (any stage):**

| # | Trigger | Line |
|---|---|---|
| S1 | tray empty, Early/Mid | "Oh! All gone already? That's wonderful — for everyone else, I mean. Tomorrow, then! Don't work too hard." |
| S2 | tray empty, Late | "Nothing left? No, no — don't apologize. I'll come earlier tomorrow. Much earlier." |
| S3 | final screen (Hazel, voice-over caption) | "Off to the next town already? Well. They're lucky. Whoever they are." |

That is 28 authored lines (9 early / 10 mid / 9 late) plus 3 system lines, including all 6 source lines verbatim. Writing more lines in this voice is the cheapest, highest-value P1 content add.

### 6.7 Pressed-flower book (P1 — the strong P1)

A leather book icon in the shop HUD. The first time each species is picked, a page is added: pressed-flower illustration, species name, hand-written date ("Day 2"), and — the twist — a small painted vignette of **the zone it was picked from, rendered at the vitality it had at that moment**. As the run progresses the book becomes the only surviving record of the town in color. The final screen flips through its pages. Implementation: on first pick of a species, snapshot a 200×120 crop of the composited map around the pick location into an offscreen canvas; store as data URL in run state. Config: `bookEnabled`.

### 6.8 Ambient life (P1)

Butterflies (max 6, only over zones with `displayGray < 30`), birdsong density tied to `100 − townGray`, 1–2 strolling background NPCs that stop appearing above `townGray 40`, shutters closing above 70. Pure dressing; each is a one-evening task. Config: `ambientEnabled`.

---

## 7. Rules, win & lose conditions

- **There is no lose condition.** Pillar 2. The player cannot fail, be fined, be caught, or be refused service.
- **Run end (checked at Nightfall):** the run ends when **any** of: `townGray ≥ endGrayThreshold` (92), total remaining stock = 0, or `day > maxDays` (12). → "The Next Town" screen.
- **Scoring:** coins earned (running total) and "bouquets delivered" count. Shown on day-end and final screens. Coins have no spend sink in P0 — they are pure score/warmth ⚑ (overridable; a P2 sink is wagon upgrades).
- **Morning rules:** timer 75 s starts on first input; bell tolls at 15 s left (`morningWarnSeconds`); at 0 the player auto-walks to the shop (2 s wipe). Basket cap 8 — picking when full shows a "Basket's full!" toast and is refused.
- **Afternoon rules:** customers served one at a time in queue order; a bouquet needs ≥ 1 stem to GIVE; if the tray is empty the only affordance is "Sorry, all out" (gracious S1/S2 line, customer leaves happy-ish, no penalty); afternoon ends when the queue is empty.
- **Night rules:** unsold stems wilt (removed); drain rules §6.3 run; day increments; end check runs.

**Edge cases (decided):**

| Case | Rule |
|---|---|
| Bell hits 0 mid-pick animation | The pick completes (stem is kept), then auto-walk home |
| Player taps two flowers in quick succession (touch) | Second tap replaces the walk target; only one pick queues at a time |
| Basket has stems but fewer than a customer's requested bouquet size | Any ≥1-stem bouquet is accepted with full delight; request size is a suggestion, not a requirement |
| Garden picked while its owner is due a normal line | Theft trigger wins; normal line deferred |
| Two NPC gardens picked the same morning | Both owners are forced into that afternoon's queue (queue can exceed the customer count formula by these forced visits) |
| Zero flowers picked in a morning | Afternoon still happens; every customer gets S1/S2; day still advances (grayness still catches up/spreads) |
| Run-end thresholds crossed mid-afternoon | End is only evaluated at Nightfall — the afternoon always completes |
| `stage` changes mid-afternoon (townGray crosses 25/60 at night only) | Impossible by construction: townGray only changes at Nightfall, so a whole day is always one stage |

---

## 8. Difficulty & progression

There is no difficulty curve in the challenge sense — the game gets *emotionally* harder and *logistically* tighter on one fixed tuning:

- **Scarcity progression (emergent):** near zones empty first, so mornings demand longer routes for fewer stems; by day 6–7 the 75 s timer genuinely pinches. No code needed — it falls out of fixed stock + no respawn.
- **Demand progression (formula):** customers 2→6 and per-stem price 2→5 as `townGray` rises (§6.5). Early game: surplus (wilt teaches the daily rhythm). Late game: shortage (you cannot serve everyone — S2 lines land). The scarcity flip is the arc.
- **Dialogue progression:** Early → Mid → Late pools per §6.6.
- Across-run progression (next town, wagon upgrades): **P2.** The prototype ends at the wagon screen.

All pacing lives in config: a playtest that says "too slow" is answered by editing `grayCatchupPerNight`, `zoneStock`, or `maxDays` — no code changes.

---

## 9. Style & theme

**Visual style:** flat pastel vector, rounded shapes, no outlines, soft single-direction shadows; storybook-tidy. Everything is built from ≤ 12-point polygons and circles — implementable by a programmer with no artist.

**Tone:** the game is 100% sincere-cozy in presentation at all times. The unsettling part comes only from the drain and the words; art, sound, and UI never wink at the player.

**References:** *Stardew Valley*'s shop-counter warmth, *Untitled Goose Game*'s tidy vector village, and the quiet complicity of *Papers, Please* — except nobody ever finds out.

**Palette (hex):**

| Use | Hex |
|---|---|
| Grass | `#8FC978` |
| Meadow highlight | `#B5DB8B` |
| Paths / sand | `#E9D8A6` |
| Roofs / awning | `#E07A5F` |
| Walls / cream | `#F4F1DE` |
| River / sky accents | `#9AD1D4` |
| Ink / text | `#3D405B` |
| UI parchment | `#FFF8EC` |
| Player apron | `#2A9D8F` |
| Desaturation tint target | `#9FA3A6` (8% blend over pure luminance) |
| Flowers | see species table §6.2 |

**Typography:** one rounded humanist sans for everything (system stack: `"Comic Neue", "Trebuchet MS", Verdana, sans-serif` — no webfont downloads at runtime; bundle Comic Neue locally only if trivially available, else the fallbacks are fine) ⚑ (overridable). Dialogue at 20 px, UI at 16 px, title at 48 px.

**Placeholder art plan (M0–M1):** town = colored zone polygons on green; buildings = brown rects; flowers = colored circles on stem lines; player = teal rect; NPCs = colored circles with initials; the desaturation system is built against these placeholders from day one (it works identically on final art).

---

## 10. Sound design

All SFX synthesized at runtime via Web Audio (jsfxr-style envelopes/oscillators) — **zero audio asset files**. Audio context starts only after the first user gesture (the Play click). Mute toggle (`M` + pause menu + splash icon) is P0 and persists in `localStorage`.

**SFX event table:**

| Event | Sound | Priority |
|---|---|---|
| Flower picked | soft pluck: short filtered saw blip, pitch varies ±10% per species | P0 |
| Basket full (refusal) | dull low thump | P0 |
| Bell (15 s warning) | two church-bell tolls (sine + decay) | P0 |
| Customer arrives | shop doorbell: two-note bright chime | P0 |
| Bouquet given / coins | coin sparkle: rising 3-note arpeggio + tiny bell | P0 |
| Hearts burst | soft twinkle (high sine pips) | P0 |
| UI click | quiet tick | P0 |
| Nightfall transition | low hush: filtered noise swell, 1 s | P0 |
| Wilt toast | single sad low pluck | P1 |
| Book page added | paper slide + press thump | P1 |

**Music approach:** P0 ships **no music** — ambient birdsong (sparse synth chirps, density = `100 − townGray`, silent above 70) carries the soundscape and doubles as a drain tell. P1 adds a generative music-box loop (8-bar pentatonic pattern, seeded) that **loses one voice for every 25 townGray** until only a bare melody remains. ⚑ (overridable)

---

## 11. UI & screens

**Flow:** `Splash → [Day Intro card → Morning → Afternoon → Day End card] ×N → The Next Town → (Restart → Splash)`. Pause overlay reachable from Morning/Afternoon.

**Splash (mandatory):**

- Title: **Petal Pusher** + one-liner: *"Pick flowers. Sell joy. Don't look back."*
- Rules/goal, exactly these 5 bullets:
  - Mornings: pick flowers before the bell (basket holds 8).
  - Afternoons: build little bouquets for the townsfolk. They'll love them.
  - Matching a requested color earns a bonus coin.
  - Unsold flowers wilt overnight — sell what you pick.
  - Flowers don't grow back. That's fine. Probably.
- Controls: `WASD/arrows move · Space/click picks · click stems + GIVE to sell · P pause · M mute` and `Touch: tap to move, tap to pick, tap to sell`
- Version number bottom-right (e.g. `v0.1.0`) rendered from the single `GAME_VERSION` constant
- One big **PLAY** button (also starts the audio context)

**Day Intro card:** "Day 3 — Morning" over a dimmed map, 1.5 s, skippable by click.

**Morning HUD:** top-left `Day 3` + basket icon `5/8`; top-center sun-arc timer (sun slides along an arc, turns amber in the last 15 s — no digits) ⚑ (overridable); top-right pause icon. Nothing else.

**Afternoon screen:** counter scene; left = stem tray (grid of picked stems); center = bouquet slot (up to 3) + **GIVE** button; right = current customer (portrait, name, request tag) with the queue peeking behind; dialogue line in a speech bubble that types on at 40 chars/s (click to complete). Coins counter top-left; pause top-right.

**Day End card:** "Day 3 complete — 4 bouquets · 11 coins (total 38)" + wilt toast if any + the *full town map* shown for 2.5 s before the card (the daily before/after beat — this is where players notice the gray). Click to continue.

**Pause overlay:** Resume / Restart day / Restart run / Mute toggle / controls recap / version.

**The Next Town (final screen):** the fully gray town; a saturated wagon + player bottom-center; stats (days, bouquets, coins, species found); S3 caption line; P1: pressed-book page flip; one button: **"Onward →"** which restarts the run (new seed). No score judgment, no grade, no message about what you did.

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/sim/config.ts`. Everything below lives there; the doc body references these keys.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `GAME_VERSION` | `"0.1.0"` | string | splash + debug overlay |
| `morningSeconds` | 75 | s | gather phase length |
| `morningWarnSeconds` | 15 | s | bell warning |
| `basketCapacity` | 8 | stems | picks per morning |
| `playerSpeed` | 220 | px/s | movement |
| `pickRadius` | 28 | px | pick reach |
| `pickDurationMs` | 350 | ms | pick animation lock |
| `stemBasePrice` | 2 | coins | sale price per stem |
| `violetPrice` | 3 | coins | rare species price |
| `colorMatchBonus` | 1 | coins/stem | matching a color request |
| `colorRequestChance` | 0.4 | 0–1 | share of requests naming a color |
| `bouquetMin` / `bouquetMax` | 1 / 3 | stems | request size range |
| `customersMin` / `customersMax` | 2 / 6 | count | afternoon queue bounds |
| `customersPerGray` | 20 | gray/step | +1 customer per this much townGray |
| `tipPerGrayDivisor` | 25 | gray/coin | +1 coin/stem per this much townGray |
| `grayCatchupPerNight` | 34 | gray/night | drain lag (≈3 nights to full) |
| `graySpreadThreshold` | 60 | gray | when a zone starts blighting neighbors |
| `graySpreadPerNight` | 8 | gray/night | blight creep rate |
| `endGrayThreshold` | 92 | gray | run-end trigger |
| `maxDays` | 12 | days | hard run cap |
| `stageMidThreshold` | 25 | gray | Early→Mid dialogue |
| `stageLateThreshold` | 60 | gray | Mid→Late dialogue |
| `wiltOvernight` | true | bool | unsold stems die at night |
| `zoneStock` | `{meadow:16, riverbank:12, forest:12, orchard:10, gardens:8, chapel:8, square:6}` | stems | zone stock (§6.3) |
| `heartsPerSale` | 3 | particles | sale juice |
| `particleCap` | 80 | count | perf budget |
| `canvasW` / `canvasH` | 1280 / 720 | px | fixed logical resolution, letterboxed |
| `typewriterCps` | 40 | chars/s | dialogue type-on |
| `bookEnabled` | false (true in M3) | bool | pressed-flower book (P1) |
| `ambientEnabled` | false (true in M2) | bool | butterflies/birds/NPC strollers |
| `muteDefault` | false | bool | initial audio state (persisted) |

**URL flags:**

- `?seed=12345` — seeds all randomness (flower positions, requests, queue draws, line picks). Default seed = `Date.now()`, always displayed in the debug overlay and on the final screen so any run is reproducible.
- `?debug=1` — overlay: FPS, day, townGray + per-zone display/target gray, stage, remaining stock; cheat keys: `N` skip to nightfall, `G` +10 townGray to all zones, `F` fill basket, `$` +20 coins.
- `?day=5` — start on day N with a simulated history (auto-picks `basketCapacity × (N−1)` stems greedily from nearest zones and runs N−1 nights) — the essential flag for testing Mid/Late content.
- `?fast=1` — `morningSeconds=20`, typewriter instant, transitions 4×.
- `?gray=70` — force all zones' display+target gray (dialogue/demand testing).

---

## 13. Tech stack

**Vite + TypeScript + Canvas 2D, no game framework, no physics, synthesized Web Audio.** Canvas (not SVG/DOM) because the per-zone desaturation compositing (§6.3) is an image-space operation — two offscreen canvases and eight alpha-masked blits — that Canvas does trivially and SVG does painfully; the moving-sprite count is tiny so Pixi/WebGL is unjustified overhead. No Matter.js — nothing here is physical. Vite (not zero-build) because TypeScript + a `src/sim` module with headless unit tests wants a bundler, and `vite build` emits a plain static `dist/` (one HTML, one JS, one CSS, zero runtime network calls) deployable by copying into `public/games/flower-shop/` on GitHub Pages. Audio is hand-rolled Web Audio (no Howler — Howler earns its keep managing audio *files*, and we have none).

**Perf budget:** ≤ 72 flower sprites, ≤ 10 characters, ≤ 80 particles, 8 zone blits + 1 base blit per frame at 1280×720 — comfortably 60 fps on a mid-range laptop. Zone masks regenerate only at nightfall.

---

## 14. Milestones

### M0 — Toy loop (the "is it fun" gate)

**Goal:** one full day playable with rectangles; drain math real.

**Deliverables:** morning walk/pick with timer + basket; afternoon tray → bouquet → GIVE with 3 hardcoded customers and ~6 dialogue lines (2 per stage, using source lines); nightfall running the exact §6.3 drain rules; zone desaturation rendering on placeholder polygons; day loop repeats; run-end check; headless sim tests for drain math (pick → targetGray → catch-up → spread → townGray).

**Acceptance criteria:**
- [ ] A first-time player understands pick-then-sell within 60 seconds unprompted
- [ ] A full day takes ≤ 3 minutes; days chain without reload
- [ ] Stripping the Meadow on days 1–2 produces visible graying there by day 3–4, with no UI text explaining it
- [ ] By ~day 8 of greedy play the whole map is visibly gray and the run ends
- [ ] Sim tests pass with no DOM (`vitest` on `src/sim`)

*If serving customers with rectangles isn't at least mildly pleasant, and the first graying isn't at least mildly arresting — stop; art won't save it.*

### M1 — Real rules

**Goal:** full P0 content and shell.

**Deliverables:** all 7 zones + 72 seeded flowers + 5 species; full 6-NPC roster with the complete §6.6 script, stages, and triggers (garden theft forced-visit included); demand/price/stage formulas; wilt; splash (rules, controls, version), day-intro/day-end cards, pause, restart, final "Next Town" screen; touch input.

**Acceptance criteria:**
- [ ] Every §6.6 line can be reached (verified via `?gray` + `?day` flags); all 6 source lines appear verbatim
- [ ] Picking Otto's garden puts Otto in that afternoon's queue saying M3, then M4 on his next visit
- [ ] Customer count and per-stem price rise across a run per the formulas
- [ ] Splash → run → final → restart works with mouse only, and with touch only
- [ ] No path exists where the player is accused, penalized, or graded

### M2 — Feel

**Goal:** make the sell phase the treat and the drain quietly beautiful.

**Deliverables:** flat-vector art pass (town, 5 flower sprites, player, 6 portraits ×2 expressions); soft-feathered zone desaturation; hearts/coin particles, type-on dialogue, sun-arc timer; all P0 SFX + birdsong density + mute; ambient life (`ambientEnabled`); the day-end full-map beat.

**Acceptance criteria:**
- [ ] A sale produces hearts + chime + typed gratitude within 500 ms of GIVE
- [ ] Day-end map shot makes day-over-day graying obvious to a viewer who isn't playing
- [ ] 60 fps with `?debug=1` FPS counter on a mid-range laptop
- [ ] Muted-by-`M` state survives reload; no audio before first gesture

### M3 — Playtest build

**Goal:** shippable, reproducible, instrumented.

**Deliverables:** all URL flags (§12) working; seed shown on final screen; pressed-flower book (P1, `bookEnabled=true`); P1 SFX; generative music-box (P1, time permitting); deployed to the static host under `public/games/flower-shop/`; playtest question sheet (§2) in the repo.

**Acceptance criteria:**
- [ ] Same `?seed` twice → identical flower layout, queues, requests, and lines
- [ ] `?day=6` lands in Mid/Late content in under 5 seconds
- [ ] Book shows one page per discovered species with the color snapshot; final screen flips it
- [ ] Game loads and runs from the deployed static URL with zero network calls after load

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is the 7–10 day arc too long before the twist lands? Knobs: `grayCatchupPerNight`, `zoneStock`, `maxDays`, `?fast=1`.
2. **(non-blocking — resolve in playtest)** Does overnight wilt read as fair rhythm or as punishment (pillar 2 risk)? Knob: `wiltOvernight`.
3. **(non-blocking — resolve in playtest)** Do players discover garden-picking at all, given no prompt? If <30% of testers pick a garden, add one flower visibly sparkling in Otto's garden on day 2 (still no text). Knob: garden stock placement in `zoneStock` data.
4. **(non-blocking — resolve in playtest)** Should coins buy anything (basket upgrade) or stay pure score? Adding a sink risks making the harm *instrumentally* motivated, which may strengthen or cheapen the theme. Currently: pure score ⚑.
5. **(non-blocking — resolve in playtest)** Is the sun-arc (digit-less) timer readable enough, or does the morning need a numeric countdown? Knob: debug flag renders digits; ship whichever tests better.
6. **(blocking for P2 only)** What is "the next town"? The prototype deliberately ends at the wagon; a multi-town meta-loop is out of scope until the hypothesis is proven.

---

## 16. Handoff notes for Fable

**Build order:** `sim (day state, drain math, customer/queue gen, dialogue selection — all pure TS)` → `morning scene (input, movement, picking)` → `render (zone desat compositing on placeholders)` → `afternoon scene (tray/bouquet/GIVE)` → `rules shell (splash/cards/pause/end)` → `audio` → `art pass` → `flags & book`.

**Keep headless-testable:** everything in `src/sim` must run without a DOM. Priority tests: (a) drain — pick 16/16 in Meadow on day 1 ⇒ targetGray 100, displayGray 34/68/100 over nights 1–3; (b) spread — Meadow at 60+ bleeds +8/night into Riverbank & Forest Edge and never into non-adjacent zones; (c) demand/price formulas at townGray 0/25/60/92; (d) dialogue — stage selection, trigger priority, source lines present verbatim, no line starves; (e) seeded determinism — same seed ⇒ identical run transcript.

**Repo layout:**

```
flower-shop/
  index.html
  src/
    main.ts            // boot, URL flags, screen state machine
    sim/               // headless: config.ts, state.ts, drain.ts,
                       //   customers.ts, dialogue.ts (script data), rng.ts
    render/            // canvas: map.ts, desat.ts, sprites.ts, particles.ts
    scenes/            // splash.ts, morning.ts, afternoon.ts, cards.ts, final.ts
    audio/             // sfx.ts (synth), ambience.ts
    data/              // zones.ts (polygons/adjacency/stock), npcs.ts
  tests/               // vitest against src/sim
  vite.config.ts       // base: './'
```

**Deploy:** `vite build` → copy `dist/*` into `public/games/flower-shop/` next to this doc. Relative asset paths (`base: './'`) so it runs from any static folder.

**Reminders:** prove the loop with rectangles and circles before drawing a single petal — the desaturation system works identically on placeholder art, so build it in M0. Ship every milestone runnable. The one non-negotiable: nothing in code, copy, or UI ever accuses, punishes, or grades the player — if you're tempted to add a sad-face icon or a "the town misses its flowers" tooltip, don't; the gray and the dialogue do all the talking.
