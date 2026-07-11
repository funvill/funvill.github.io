> Source idea: [Game Idea 22 - AI Aztecs (Theme: What is in that mysterious black box of Doom?)](/game-idea-22-ai-aztecs-theme-mysterious-black-box-of-doom)

# SHORTFALL — Game Design Document

## 1. Title & one-liner

**Working title:** SHORTFALL ⚑ (overridable)

**Alternates:** Ghost Census · The Tithe Ledger · Harvest Audit · One Thousand Years of Paperwork · Quota

**One sentence:** A grim-satirical, turn-based resistance-management game where the Builder Armada arrives in 12 turns to harvest 20% of your solar system's souls for its AI black box, and your only weapons are forged ledgers, hidden census rolls, sabotaged temples, and nerve.

**Genre:** Single-player turn-based strategy / resource-management (browser, mouse-driven).

**Adaptation choice (per MODE NOTE):** The source idea is a sci-fi story premise, not a game. I adapted it into a **resistance-management strategy game about cooking the books of an apocalypse**: the player is the resistance coordinator of one solar system, allocating scarce covert actions across six population centers over 12 turns to make the harvest *ledger* show quota while the *actual* number of souls delivered is as small as possible — all without tripping the priests' suspicion and triggering an invasion. ⚑ (overridable — the friend's RTS suggestion was rejected because real-time unit control needs 10x the implementation budget and doesn't test the premise's actual tension, which is quota-vs-conscience arithmetic under a doom clock.)

**Elevator pitch:** For 100,000 years the Builders have fed human consciousness into their AI Box of Doom, and it still hasn't woken up — but the quotas keep coming. The Armada reaches your solar system in 12 turns and its priests expect 20% of the census: volunteers first, then prisoners, then whoever's left. You run the resistance, and you cannot win a war against a technologically superior god-cult. What you *can* do is lie on forms. Hide villages off the census. Forge delivery receipts for people who never existed. Sabotage the conversion temples that manufacture "willing" volunteers. Every action leaves fingerprints, the priests audit the books every turn, and if the final inspection smells fraud, the Armada stops asking politely. The Box thanks you for your contribution.

## 2. Fun hypothesis

**The single question:** *Is it fun to fight a doomsday quota with accounting — juggling four leaky levers (hide, forge, sabotage, evacuate) against a rising suspicion meter under a fixed 12-turn clock, where the "win" is a smaller atrocity than the default?*

Everything in P0 exists to test whether the ledger math (paper quota vs. real souls) plus the suspicion/audit pressure produces tense, meaningful turn decisions.

**Playtest questions (ask after each session):**

1. On your last three turns, did you feel you were choosing between two things you wanted, or just spending leftover clicks?
2. Can you explain in one sentence why forging records is different from hiding people? (Tests whether the paper-vs-people distinction landed.)
3. Did you ever deliberately Lay Low instead of acting? If never, suspicion isn't threatening enough.
4. When the harvest resolution played out, did the final number feel like a consequence of your choices or a slot machine?
5. Did you immediately want to restart and try a different strategy? (The one-more-run test.)

## 3. Design pillars

1. **The Doom Clock is absolute.** The Armada arrives on turn 13 no matter what. The player cannot prevent the harvest, only shrink it. No feature may add a way to stop the clock.
2. **Every lever leaks.** Every helpful action raises suspicion somewhere. There are no free saves; the game is about choosing which fingerprints to leave.
3. **The ledger is the battlefield.** The drama lives in visible numbers: paper quota vs. real deliveries, registered vs. hidden. If a mechanic can't be read off the ledger, cut it.
4. **Grim satire, not gore.** Horror is delivered through bureaucratic euphemism ("souls remitted", "ledger adjusted", "the Box thanks you for your contribution") — never graphic description. Tone check: Douglas Adams's accountant filing paperwork for Papers, Please.

## 4. Core game loop

Session target: **one full run = 5–8 minutes** (12 turns × ~25–35 seconds of decisions, plus a ~30-second harvest resolution).

```
        ┌──────────────────────────────────────────────────┐
        │                                                  │
        ▼                                                  │
  [PLAN PHASE]                                             │
  Player spends 3 Action Points on settlements:            │
  Hide / Forge / Sabotage / Evacuate / Lay Low             │
  Sees: ledger projections update live per action          │
  Feels: "which fire do I put out?"                        │
        │  (player clicks END TURN)                        │
        ▼                                                  │
  [PRIEST PHASE]  (automatic, ~2s of log lines)            │
  Temples convert citizens → volunteers                    │
  One settlement is AUDITED (suspicion-weighted)           │
  Suspicion decays where you did nothing                   │
  Crackdown/purge if any suspicion hits 100                │
  Sees: event log + numbers changing                       │
  Feels: dread / relief                                    │
        │                                                  │
        ▼                                                  │
  [ADVANCE]  Armada moves 1 step closer on the map ────────┘
        │
        ▼ (after turn 12)
  [HARVEST RESOLUTION]
  Final inspection → invasion check → deliveries tallied
  → souls-lost total → rating → restart
```

**Phase details:**

- **Plan phase (player-paced, no timer):** The player selects a settlement, sees its numbers, and commits actions. The top ledger bar live-updates "Projected quota / Projected committed / Projected souls lost if the harvest happened now." What the player does: click, weigh, commit. What they feel: triage.
- **Priest phase (automatic):** Resolution events print to the log one at a time (`cfg.logLineMs` apart) so audits read as beats, not spreadsheet diffs. What the player feels: watching a customs officer flip through their forged passport.
- **Advance:** The Armada marker moves one step along its approach track on the system map. Pure dread signaling.
- **Harvest resolution (end of run):** A staged reveal — inspection roll, then deliveries counted category by category (volunteers → prisoners → forged credits → conscripts), then the final tally and rating.

## 5. Inputs & controls

Fully mouse/tap-driven; keyboard is a shortcut layer. **Touch is viable** — every interaction is a tap on a large target; the game is turn-based with no timing or drag requirements. Minimum layout width handled by responsive stacking (map above panel) at <900px.

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Left-click settlement node/card | Tap settlement | Select settlement (opens action panel) |
| Left-click action button | Tap action button | Queue that action (spends 1 AP immediately, applies instantly, log line printed) |
| Left-click **End Turn** button | Tap End Turn | Commit turn, run priest phase |
| `1`–`6` | — | Select settlement 1–6 |
| `H` / `F` / `S` / `E` / `L` | — | Hide / Forge / Sabotage / Evacuate / Lay Low on selected settlement |
| `Enter` or `Space` | — | End Turn |
| `M` | Tap speaker icon (top-right) | Mute/unmute all audio |
| `R` | Tap restart icon (top-right) | Restart run (confirmation overlay: "Abandon this system? [Yes/No]") |
| `Esc` | Tap outside panel | Deselect settlement / close overlay |
| Left-click ledger bar items | Tap ledger items | Tooltip explaining that number (P1) |

Pause: the game is turn-based with no real-time pressure, so there is no pause state; the restart-confirm overlay doubles as the menu (contains Mute and Restart). Undo: **no undo** in P0 — actions commit instantly; misclicks are part of the fiction (you filed the form) ⚑ (overridable; P1 adds single-step undo within the current turn).

## 6. Game elements

All population quantities are in **units of 100,000 souls**, displayed as plain integers with the label "×100k souls" once on the splash and HUD tooltip. Internal math is integer-only.

### 6.1 The Solar System (board)

Six settlements arranged around a star on an SVG map, plus an Armada approach track entering from the right edge with 13 tick marks. Placeholder: circles with text labels. Final: flat-vector planets with thin gold orbit rings.

### 6.2 Settlements (×6)

| # | Name | Pop | Converts | Prisoners | Temple rate/turn | Flavor |
|---|---|---|---|---|---|---|
| 1 | Meridian Prime | 300 | 18 | 8 | 4 | Capital; biggest temple, biggest ledger |
| 2 | Krell's Forge | 180 | 6 | 7 | 2 | Industrial world; surly, over-policed |
| 3 | Havenmoon | 150 | 5 | 2 | 2 | Agri moon; devout rural pockets |
| 4 | The Lattice | 130 | 6 | 2 | 2 | Orbital habitat ring; easy to audit |
| 5 | Dust Belt | 140 | 3 | 9 | 2 | Mining stations; the justice system's favorite |
| 6 | Far Shore | 100 | 2 | 2 | 2 | Fringe colony; easiest to hide people in |

Totals: census 1000, converts 40, prisoners 30. (Config keys: `settlements[]` array with `name, pop, converts, prisoners, convertRate`.)

**Per-settlement state:** `pop` (registered census; includes converts and prisoners), `converts` (subset of pop; will volunteer), `prisoners` (subset of pop; delivered if quota needs them), `hidden` (off-census, safe unless audited), `evacuated` (permanently safe), `forged` (fake delivery credits attributed to this settlement), `suspicion` (0–100, starts at `cfg.startSuspicion`), `templeDisabledTurns` (0 = temple active).

**Derived:** `unaffiliated = pop − converts − prisoners` (the only people Hide/Evacuate/conversion/purges can draw from; all draws clamp at 0).

**Looks:** Placeholder = colored circle sized by pop with a suspicion arc around it. Final = flat planet disc, suspicion shown as a red ring filling clockwise, small icons (candle = converts, bars = prisoners, ghost = hidden, quill = forged).

### 6.3 The Priests (system-driven antagonist, no avatar)

Behavior each priest phase, in order:

1. **Conversion:** each settlement with `templeDisabledTurns == 0` moves `min(convertRate, unaffiliated)` from unaffiliated to `converts`. Settlements with `templeDisabledTurns > 0` decrement that counter instead.
2. **Audit (from turn `cfg.firstAuditTurn` onward, one per turn):** target chosen by weighted random, weight = `cfg.auditBaseWeight + suspicion`. Effects on target: reveal `ceil(hidden × cfg.auditRevealFrac)` → returned to pop as unaffiliated; delete **all** `forged` credits at that settlement; if anything was found, `suspicion += cfg.auditHitSusp`; if clean, `suspicion −= cfg.auditCleanSusp` (floor 0). Log line names the settlement and what was found, in bureaucratic voice.
3. **Suspicion decay:** every settlement that received **no** player action this turn: `suspicion −= cfg.suspDecay` (floor 0).
4. **Crackdown:** any settlement at `suspicion ≥ 100`: move `min(cfg.purgeSize, unaffiliated)` from unaffiliated to `prisoners` ("detained for census irregularities"), set `suspicion = cfg.postPurgeSusp`, and reduce next turn's AP by 1 (stacking, but never below 1).

### 6.4 The Armada (doom clock)

A marker on a 13-step approach track. Advances 1 step per turn. No behavior until arrival. Placeholder: black square. Final: black rectangle with a single gold slit — the Box itself, kept deliberately featureless (it's the mysterious black box; never show more).

### 6.5 Player actions (the resistance)

Each costs **1 AP**, applies instantly to the selected settlement, max `cfg.maxActionsPerSettlement` (2) actions per settlement per turn. AP per turn = `cfg.apPerTurn` (3); unspent AP is lost at End Turn (log: "Your cells lie idle.").

| Action | Effect | Suspicion | Config keys |
|---|---|---|---|
| **Hide People** | Move `min(hideAmount, unaffiliated)` pop → hidden. Lowers registered census (and therefore the final quota base) and shelters those people. Recoverable by audits. | +12 | `hideAmount`, `hideSusp` |
| **Forge Records** | `forged += forgeAmount` fake delivery credits. Counts toward the tally at harvest; contributes to fraud detection risk. Wiped by an audit here. | +10 | `forgeAmount`, `forgeSusp` |
| **Sabotage Temple** | `templeDisabledTurns = sabotageTurns` (re-applying resets the counter, doesn't stack). Stops conversion. | +15 | `sabotageTurns`, `sabotageSusp` |
| **Evacuate** | Move `min(evacAmount, unaffiliated)` pop → evacuated. Like Hide but audit-proof and permanent; smaller batch, more heat. | +18 | `evacAmount`, `evacSusp` |
| **Lay Low** | `suspicion −= layLowAmount` (floor 0). | −20 | `layLowAmount` |

**Interaction summary (why these levers interlock):** Sabotage reduces real volunteers but opens a quota gap; Forge fills the gap with ghosts; Hide shrinks the quota base and shelters bodies; Evacuate is the expensive sure thing; Lay Low buys the heat budget to keep doing all of the above. No single lever works alone — that is the game.

### 6.6 Event log

Scrolling text feed, newest at bottom, ~6 visible lines. Every state change gets one line in bureaucratic-satirical voice. Placeholder and final are the same (it's text). Examples: "Audit at The Lattice: 6 unregistered souls recovered. The census weeps with joy." / "Krell's Forge temple reports equipment difficulties. Devotion postponed."

## 7. Rules, win & lose conditions

### 7.1 Harvest resolution (after End Turn on turn 12)

Executed in this exact order:

1. **Compute census & quota:** `census = Σ pop` (registered only; hidden and evacuated excluded). `Q = ceil(census × cfg.quotaRate)` (0.20).
2. **Fraud inspection:** `forgedTotal = Σ forged`, `avgSusp = mean(suspicion)`.
   - If `avgSusp ≥ cfg.autoInvadeSusp` (80) → **INVASION** (skip to 7.3).
   - Else if `forgedTotal == 0` and `avgSusp < cfg.detectSuspFloor` (40) → inspection passes automatically.
   - Else roll `p = clamp(cfg.detectBase + forgedTotal / cfg.detectForgeDivisor + max(0, avgSusp − cfg.detectSuspFloor) / 100, 0.05, 0.95)`; if `rand() < p` → **INVASION**. The pre-roll odds are shown to the player during the reveal ("Inspection risk: 34%") so the outcome reads as a known gamble, not a coin from nowhere.
3. **Deliveries (staged reveal, one line per category):**
   - Volunteers: **all** converts are taken (`lostConverts = Σ converts`). The Box always accepts extra volunteers.
   - `credit = lostConverts + forgedTotal`.
   - Prisoners: `lostPrisoners = min(Σ prisoners, max(0, Q − credit))`; `credit += lostPrisoners`.
   - Conscription: `conscripts = max(0, Q − credit)`, drawn proportionally from each settlement's unaffiliated pop (largest-remainder rounding; clamp per settlement).
   - `soulsLost = lostConverts + lostPrisoners + conscripts`.
4. **End screen** with rating (7.4).

### 7.2 Win condition

There is no "win" — there is a smaller loss (pillar 1). A run is **survived** if no invasion occurs; quality of survival is graded by `soulsLost` (7.4). The do-nothing baseline loses ≈ 208 (all converts after 12 turns of unchecked conversion), which is *worse than the quota itself* — the satire is that the priests over-deliver volunteers. `cfg.baselineLoss = 208` is displayed on the end screen for contrast ("A do-nothing resistance loses 208.").

### 7.3 Lose condition — Invasion

If triggered: the Armada stops pretending. `soulsLost = ceil(census × cfg.invasionRate)` (0.35) plus `floor(Σ hidden × 0.5)` (half the hidden are found in the sweep). Evacuated souls stay safe. End screen shows rating **"HARVEST WITHOUT END"** in red; run counts as a loss regardless of numbers.

### 7.4 Rating (by `soulsLost`, survived runs only)

| soulsLost | Rating |
|---|---|
| ≤ 80 | **GHOST LEDGER** — "The Box received mostly paperwork." |
| 81–120 | **QUIET HEROES** |
| 121–160 | **THIN MARGIN** |
| 161–208 | **TOKEN RESISTANCE** |
| > 208 | **THE PRIESTS THANK YOU** — you made it worse |

Thresholds live in `cfg.ratingTiers` ⚑ (overridable — tune after the first balance pass).

### 7.5 Edge cases (decided)

- **Draw clamps:** Hide/Evacuate/conversion/purge draw only from `unaffiliated`; if it's 0, the action still costs AP and logs "No one left to move." (Deliberate: wasting AP on a bled-dry settlement is a legible mistake.)
- **Audit finds nothing:** counts as "clean" → suspicion drops. Auditing is not strictly bad news.
- **Forged credits exceed Q:** excess forged credits are simply unused; they still count fully toward `forgedTotal` for detection risk. Over-forging is pure risk.
- **Two settlements hit suspicion 100 same turn:** both crackdowns fire; AP penalty stacks; next-turn AP floors at 1.
- **Crackdown and audit on the same settlement, same turn:** audit resolves first (step 2 before step 4); its +20 suspicion can be what triggers the crackdown.
- **Sabotage on an already-disabled temple:** resets `templeDisabledTurns` to full; log notes it ("The repair crew has another accident.").
- **AP left at End Turn:** confirmation-free; lost with a log line. No nag dialog.
- **Conscription rounding:** largest-remainder method so `Σ per-settlement conscripts == conscripts` exactly.
- **Restart mid-run:** allowed anytime via confirm overlay; re-seeds RNG unless `?seed=` is pinned.

## 8. Difficulty & progression

**Single tuned difficulty** (this is a prototype). Challenge escalates naturally within a run without scripting:

- Converts compound: every turn you don't sabotage, temples add 14/turn to guaranteed losses — pressure rises by default.
- Suspicion is a ratchet: your heat budget shrinks as you act, and the endgame fraud check makes accumulated suspicion a second doom clock.
- Audits are suspicion-weighted, so the settlements you leaned on hardest are exactly the ones that get inspected — self-balancing pressure with no difficulty script.

Config knobs (`turns`, `apPerTurn`, `quotaRate`, `detectForgeDivisor`, `suspDecay`) provide the entire difficulty surface for playtesting. No meta-progression, no unlocks. P2 idea only: a second system with different settlement layouts.

## 9. Style & theme

**Visual style:** Flat vector, dark-space background, thin 1.5px gold linework, no gradients except a soft glow on the star and the Armada marker. UI panels styled as **ledger paper** — light parchment cards with ink text on a void — so the "the ledger is the battlefield" pillar is literal. Aztec-glyph-meets-circuit-trace motifs as border decorations only (P1; simple `<path>` repeats).

**Palette (6 colors):**

| Use | Hex |
|---|---|
| Void background | `#0E1220` |
| Ledger parchment (panels/cards) | `#E9DFC8` |
| Ink (text on parchment) | `#1B1B26` |
| Builder gold (priests, quota, Armada glow, accents) | `#C9973B` |
| Alarm red (suspicion, invasion, crackdowns) | `#B3362E` |
| Resistance teal (player actions, hidden/evacuated, saved souls) | `#3FA7A0` |

**Typography:** Headings and flavor text: `Georgia, 'Times New Roman', serif` (bureaucratic-scripture feel). All numbers and the event log: `Consolas, 'Courier New', monospace` (ledger feel). System fonts only — no webfont downloads.

**Tone/mood:** Grim satire via euphemism. All copy is written as if by the priests' compliance department. Never depict violence; a purge is a log line about "census irregularities."

**Reference points:** *Papers, Please* (moral weight of paperwork) × *Plague Inc.* (map + spreading numbers on a doom timer), narrated by Douglas Adams's accountant. Frostpunk's "there was no good option" endings, at 1/1000th the budget.

**Placeholder art plan (M0–M1):** Settlements = plain circles with text labels; suspicion = a red horizontal bar; Armada = black square on a dotted line; all panels = default-styled divs. Zero images at any milestone — final art is pure SVG + CSS.

## 10. Sound design

**Implementation:** Web Audio API, all sounds synthesized in code (oscillator + noise + envelope, jsfxr-style helper of ~40 lines). Zero audio asset files. Audio context is created/resumed only on the first user gesture (the Play button click). Mute toggle (`M` key + speaker icon) is **P0** and persists in `localStorage` (`shortfall.muted`).

**SFX event table:**

| Game event | Sound description | Priority |
|---|---|---|
| Action committed | Dry rubber-stamp thunk (short filtered noise burst, pitch varies ±10% per action type) | P0 |
| End Turn | Heavy ledger-book close (low sine thud + page-flip noise) | P0 |
| Audit begins | Two-note descending brass-ish tone (minor 2nd), quiet | P0 |
| Audit found something | Sharp metallic ping + suspicion-bar tick-up click | P0 |
| Crackdown/purge | Low klaxon swell, 0.8s, deliberately muffled (satire: it's far away, it's paperwork) | P0 |
| Harvest reveal, per category line | Single deep bell toll per line (volunteers/prisoners/conscripts) | P0 |
| Invasion | Sustained dissonant drone + klaxon, 2s | P1 |
| Survived — rating reveal | Thin, unenthusiastic single chime (deliberately anticlimactic) | P1 |
| Button hover | 1ms soft tick | P1 |

**Music:** Generative ambient drone — two detuned sine/triangle oscillators an octave apart in D, LFO on gain, volume 0.08; pitch drops a semitone every 3 turns as the Armada nears (the whole soundtrack is a slow doom-glissando). P1. No music in M0–M2 beyond this drone; never any copyrighted tracks.

## 11. UI & screens

**Flow:** `Splash → Game → (Harvest Resolution overlay) → End screen → [Play Again] → Game`. Restart-confirm overlay reachable from Game.

### 11.1 Splash screen (mandatory)

- Title **SHORTFALL** + one-liner: "Cook the books of an apocalypse."
- Rules/goal in 5 bullets (verbatim copy):
  - The Armada arrives in 12 turns to take 20% of your people for its AI Box.
  - You can't stop it. You can shrink it: hide people, forge records, sabotage temples, evacuate.
  - Every action raises Suspicion. Priests audit one settlement every turn.
  - At arrival, a final inspection: too much fraud or heat → invasion, and everyone loses.
  - Fewer real souls delivered = better rating. Doing nothing loses 208.
- Controls line: "Mouse/tap: select a settlement, pick actions, End Turn. Keys: 1–6 select, H/F/S/E/L act, Enter ends turn, M mute, R restart."
- Version number from single constant `GAME_VERSION = "v0.1.0"` (rendered on splash footer and in debug overlay).
- One big gold **[ BEGIN THE ACCOUNTING ]** play button (also initializes audio).

### 11.2 Game screen (HUD spec)

- **Top ledger bar (always visible):** Turn `X / 12` · Armada distance icon · AP dots (●●●) · `Census`, `Quota (if now)`, `Committed (converts+prisoners+forged)`, `Projected loss (if now)` — projections recompute live after every action using the section 7.1 math minus the inspection roll · avg-suspicion gauge (teal→gold→red) · mute + restart icons.
- **Left (60%): system map.** SVG star + 6 settlement nodes + Armada approach track. Selected settlement gets a teal ring.
- **Right (40%): settlement panel.** Name, flavor line, numbers (pop / converts / prisoners / hidden / evac / forged), suspicion bar, temple status, five action buttons with cost/effect microcopy (e.g., "HIDE — move 10 off census · +12 suspicion"). Buttons disable with reason tooltips when AP=0, per-settlement cap hit, or nothing to move.
- **Bottom: event log** (6 lines) + **END TURN** button (gold, right-aligned, always visible).
- Responsive: below 900px width, map stacks above panel; touch targets ≥ 44px.

### 11.3 Harvest resolution overlay

Full-screen parchment sheet, lines appear one at a time (700ms): census → quota → inspection risk % → inspection result → volunteers → prisoners → forged credits accepted → conscripts → **SOULS LOST: N**. Skippable with a click/tap (jump to end).

### 11.4 End screen

Rating title (7.4), `soulsLost` vs. `baselineLoss` comparison, breakdown table (volunteers/prisoners/conscripts/hidden survived/evacuated), seed display, and **[ PLAY AGAIN ]** + **[ SAME SEED ]** buttons.

## 12. Config & tuning

Single exported object `CONFIG` in `config.js`. Everything the body of this doc references lives here:

| Key | Default | Unit | Affects |
|---|---|---|---|
| `turns` | 12 | turns | Run length / Armada arrival |
| `apPerTurn` | 3 | actions | Player throughput |
| `maxActionsPerSettlement` | 2 | actions/turn | Anti-stacking cap |
| `quotaRate` | 0.20 | fraction | Quota = ceil(census × rate) |
| `startSuspicion` | 10 | 0–100 | Initial heat everywhere |
| `hideAmount` | 10 | units | People hidden per action |
| `hideSusp` | 12 | suspicion | Heat per Hide |
| `forgeAmount` | 12 | credits | Ghost credits per Forge |
| `forgeSusp` | 10 | suspicion | Heat per Forge |
| `sabotageTurns` | 3 | turns | Temple downtime |
| `sabotageSusp` | 15 | suspicion | Heat per Sabotage |
| `evacAmount` | 6 | units | People evacuated per action |
| `evacSusp` | 18 | suspicion | Heat per Evacuate |
| `layLowAmount` | 20 | suspicion | Heat removed by Lay Low |
| `suspDecay` | 6 | suspicion/turn | Passive decay (untouched settlements) |
| `firstAuditTurn` | 2 | turn # | Grace period before audits |
| `auditBaseWeight` | 10 | weight | Audit randomness floor |
| `auditRevealFrac` | 0.5 | fraction | Hidden people found per audit |
| `auditHitSusp` | 20 | suspicion | Penalty when audit finds something |
| `auditCleanSusp` | 10 | suspicion | Relief when audit is clean |
| `purgeSize` | 8 | units | Unaffiliated → prisoners per crackdown |
| `postPurgeSusp` | 65 | suspicion | Suspicion after a crackdown |
| `autoInvadeSusp` | 80 | avg suspicion | Instant-invasion threshold at harvest |
| `detectBase` | 0.05 | probability | Fraud-check floor |
| `detectForgeDivisor` | 400 | credits | Forgery risk slope (forged/400) |
| `detectSuspFloor` | 40 | avg suspicion | Suspicion below this adds no risk |
| `invasionRate` | 0.35 | fraction | Census lost on invasion |
| `baselineLoss` | 208 | units | Do-nothing comparison on end screen |
| `ratingTiers` | [80,120,160,208] | units | Rating thresholds |
| `logLineMs` | 400 | ms | Priest-phase log pacing |
| `revealLineMs` | 700 | ms | Harvest overlay pacing |
| `settlements` | (table §6.2) | — | Board setup |

**URL flags (all P0 except noted):**

- `?seed=12345` — seeds a mulberry32 PRNG; all randomness (audit targeting, fraud roll, conscription tie-breaks) flows through it; seed shown on end screen.
- `?debug=1` — overlay: FPS, full state dump per settlement, current fraud-detection probability, and cheat keys: `]` +3 AP, `[` skip to harvest, `0` zero all suspicion.
- `?turns=N`, `?ap=N` — override `turns` / `apPerTurn` for pacing tests.
- `?fast=1` — sets `logLineMs`/`revealLineMs` to 0 (playtest throughput).
- `?auditdet=1` (P1) — audits deterministically target highest-suspicion settlement (for the Open Question 3 test).

## 13. Tech stack

**Vanilla JavaScript (ES modules), zero-build, DOM + inline SVG.** No framework, no bundler, no dependencies. This is a turn-based game with ~10 moving visual elements and no physics or per-frame simulation — Canvas/Pixi/Matter would be pure overhead, while SVG gives free hit-testing, crisp text, CSS transitions for the map, and trivially accessible DOM buttons for the whole action UI. Zero-build means the deployable *is* the source folder: `index.html` + `*.js` modules + `style.css`, copied straight into the static site (this repo is already a static host). Audio is raw Web Audio (section 10), so the entire game ships with **zero binary assets**. Perf budget is trivially met: no per-frame loop outside CSS transitions and the drone LFO; the only rAF use is the debug FPS counter; target 60fps is idle-state cheap on any laptop. Entity cap: 6 settlements, 1 Armada marker, ≤40 log DOM nodes (older nodes pruned).

## 14. Milestones

### M0 — Toy loop (prove the math is a game)

**Goal:** Full 12-turn loop playable with unstyled HTML (buttons + text tables, no map, no audio, no splash).
**Deliverables:** `sim.js` (pure, headless), minimal `main.js`/`index.html` shell; all five actions; priest phase; harvest resolution as plain text; `?seed=`.
**Acceptance criteria:**
- [ ] A run from turn 1 to rating screen completes with no console errors.
- [ ] Do-nothing run loses 208 ± 0 souls (deterministic check of conversion math).
- [ ] A scripted "smart" run (sabotage-heavy + forge + lay low) loses ≤ 130 souls and survives inspection at least half the time across seeds 1–10.
- [ ] Same `?seed=` twice → identical run, action-for-action.
- [ ] The developer, playing honestly, feels at least one real dilemma per run. *If not, stop — art won't save it.*
**Proves:** the ledger math produces decisions, not solitaire.

### M1 — Real rules

**Goal:** Full P0 ruleset with the real UI skeleton.
**Deliverables:** Splash (rules, controls, `GAME_VERSION`), SVG system map + Armada track, settlement panel with disabled-state tooltips, ledger bar with live projections, event log with paced lines, crackdowns, restart confirm, end screen with rating + breakdown.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds of the splash, unprompted.
- [ ] Every number on the HUD updates correctly after every action (spot-check vs. `?debug=1` dump).
- [ ] No dead-end states: AP 0 → End Turn is the obvious next move; all buttons explain why they're disabled.
- [ ] Restart works from every screen; version string visible on splash.
**Proves:** the game is self-teaching.

### M2 — Feel

**Goal:** P0 art pass + P0 sound + juice.
**Deliverables:** Palette + typography applied (§9), suspicion rings, staged harvest reveal overlay, 6 P0 synth SFX + mute persistence, CSS transitions on all number changes (200ms), Armada marker glow, log-line typewriter pacing.
**Acceptance criteria:**
- [ ] All P0 sounds fire on correct events; mute persists across reload; no audio before first gesture.
- [ ] Harvest reveal reads as a dramatic beat (a playtester watches it without skipping on their first run).
- [ ] The game screen is legible from 1m away (an observer can tell if a run is going badly by color alone).
**Proves:** tone (grim satire) lands.

### M3 — Playtest build

**Goal:** Deployed, instrumented, tuned.
**Deliverables:** All URL flags (§12), debug overlay + cheat keys, deployed to `public/games/ai-aztecs/` on GitHub Pages, `README` snippet with playtest questions (§2), P1 features **only if time allows and in this order**: within-turn undo → invasion drone SFX → ledger tooltips → `?auditdet=1` → Free Prisoners action.
**Acceptance criteria:**
- [ ] Game loads and runs from the deployed static URL with zero network calls after page load (verify in devtools).
- [ ] `?seed=` + `?fast=1` lets a full run be replayed in under 60 seconds.
- [ ] Three playtesters complete a run without help; at least two immediately start a second run.
**Proves:** ready to answer the fun hypothesis.

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is 12 turns the right length, or does the mid-game sag? Knobs: `?turns=`, `?ap=`.
2. **(non-blocking — resolve in playtest)** Are the rating tier thresholds honest, or is GHOST LEDGER reachable only via seed-fishing? Knob: `cfg.ratingTiers`; instrument by recording `soulsLost` across 20 dev runs.
3. **(non-blocking — resolve in playtest)** Should audits be suspicion-weighted-random (current) or deterministic worst-first? Random creates dread; deterministic creates planning. Knob: `?auditdet=1` (P1).
4. **(non-blocking — resolve in playtest)** Is the endgame fraud roll (a single probability at the very end) satisfying, or does losing to a 15% roll feel cheap even with the odds displayed? Fallback design if it fails playtest: replace the roll with a deterministic threshold (`invade iff forgedTotal/400 + suspTerm > 0.5`) — one-line change, both readable off `cfg`.
5. **(non-blocking — resolve in playtest)** Does anyone ever Evacuate, given Hide is cheaper? If not, either buff `evacAmount` to 8 or give evacuation a suspicion-free variant on Far Shore only. Knobs exist.
6. **(non-blocking)** Touch layout below 900px is specced but untested on real devices; desktop is the P0 target.

No blocking questions — every mechanic in P0 is fully specified above.

## 16. Handoff notes for Fable

**Build order:** `config.js` → `sim.js` (pure state + turn resolution + harvest math, zero DOM) → seeded RNG (mulberry32) → M0 text shell (`main.js` calling sim, dumping state) → rules/edge cases → SVG map + panel UI (`ui.js`) → splash/end screens → `audio.js` (synth helper + event hooks) → juice → debug overlay/flags.

**Keep headless-testable:** `sim.js` must export `createGame(config, seed)`, `applyAction(state, {type, settlement})`, `endTurn(state)`, `resolveHarvest(state)` as pure-ish functions on a plain state object, importable in Node with no DOM. Write the M0 acceptance checks as tiny assertions runnable via `node test.js`: do-nothing = 208 lost; seed determinism; clamp behavior at `unaffiliated == 0`; conscription rounding sums exactly.

**File layout (source == deployable; zero-build):**

```
public/games/ai-aztecs/
  index.html      (shell, loads main.js as module)
  style.css
  config.js       (CONFIG + GAME_VERSION — the ONLY tuning surface)
  sim.js          (headless game logic)
  ui.js           (DOM/SVG rendering + input)
  audio.js        (Web Audio synth + event map)
  main.js         (wiring, URL flags, screen flow)
  test.js         (node assertions for sim math)
  design.md       (this document)
```

**Reminders:**
- Prove the loop with plain text and rectangles (M0) before touching SVG art or sound. If M0 isn't producing dilemmas, stop and report back rather than polishing.
- Every milestone must leave the game runnable by opening `index.html` (or the deployed URL) — no broken intermediate states committed.
- All randomness through the seeded PRNG — never `Math.random()` directly — or `?seed=` reproducibility silently breaks.
- Keep all copy in the bureaucratic-satire voice (§9 tone); when in doubt, write the log line the way a compliance department would.
- No network calls, no fonts, no images, no audio files. If you're about to add an asset, synthesize it instead.
