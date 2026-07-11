# Two Truths and a Lye — Game Design Document

> Source idea: [Game Idea 7 - Potion maker (Theme: Cooking)](/game-idea-7-potion-maker-theme-cooking)

## 1. Title & one-liner

**Working title:** *Two Truths and a Lye*

**Alternates:** *One Cauldron a Day*, *Moonpetal & Mallow*, *The Apprentice's Ledger*, *Brewed Awakening*

**One-liner:** A dialog-driven potion-shop deduction game: three customers tell their stories each morning, one of them is lying, and you only have one cauldron's worth of potion to spend on the right person.

**Genre:** Narrative deduction / shopkeeping ("Papers, Please meets Coffee Talk, scored like Murdle").

**Elevator pitch:** You are Master Bellows's apprentice, left to mind the potion shop. Each morning a terse note from your master teaches you a new recipe — with the side effects smudged out — and drops a few facts about the town. Then three townsfolk arrive, each with a problem, a story, and something to trade. Their stories are warm, funny, rambling — and exactly one of them, every day, is a lie you can catch by cross-referencing what you've read: the master's notes, the other customers, and things you heard days ago. You can brew only **one** potion per day, so you must judge who deserves it, which potion actually fits their problem, and whether to publicly denounce the liar. Serving the wrong person (or the wrong brew) has immediate, comedic, reputation-denting consequences — and reveals the side effects your master never wrote down.

**Adaptation note:** The source idea's foraging/map-search phase and barter economy are cut from P0 and moved to P1/P2 — the fun hypothesis lives entirely in the story-reading and judgment phase, so P0 is the shop, the stories, and the ledger. ⚑ (overridable)

---

## 2. Fun hypothesis

**The single question this prototype answers:**

> Is it fun to catch a liar by cross-referencing short in-fiction stories — and to bet your one daily potion on that judgment?

Everything in P0 serves this: the master's brief plants facts, three stories contain overlaps and one contradiction, and the end-of-day ledger forces the player to commit (serve one, optionally denounce one) before seeing the truth.

**Playtest questions (ask after one full 3-day run):**

1. Did you spot the liar on each day? On which day, and what tipped you off?
2. When you were wrong, did it feel fair ("the clue was there, I missed it") or arbitrary?
3. Did you ever re-open the Notes panel or re-read a story before deciding? How often?
4. Did the one-potion-per-day limit make the choice feel weighty, or just restrictive?
5. Do you want a Day 4, or were you done? (The single best signal.)

---

## 3. Design pillars

1. **Every lie is catchable on paper.** No hidden dice, no tone-of-voice tells the player can't see. Each lie contradicts at least one fact the player has already been shown in text. If a playtester can't point to the contradicting line afterward, the content is broken, not the player.
2. **One cauldron, one choice.** Scarcity is what makes reading matter. The player serves at most one customer per day, ever, at every scope level.
3. **The town talks back.** Every verdict produces a concrete next-morning consequence line. Serving the con man means houses get robbed; denouncing the miller means the tavern gossips. Consequences are text, not systems — cheap and vivid.
4. **Warm and funny, never grim.** Wrong potions produce comedy (the baker tells off the tax collector), not tragedy. The worst villain is a con man, not a murderer.

If a feature doesn't serve one of these, cut it.

---

## 4. Core game loop

One **day** is the loop unit. A full P0 run is **3 scripted days**; a single day takes 2–4 minutes, a full run **≈ 9 minutes**. Untimed — the player reads at their own pace.

```
        ┌──────────────────────────────────────────────────────┐
        │                                                      │
        ▼                                                      │
  [1. MORNING BRIEF] ──▶ [2. SHOP FLOOR] ──▶ [3. STORIES] ──▶ [4. LEDGER] ──▶ [5. NIGHTFALL]
   read master's note     3 customers        talk to each      assign one     see outcomes,
   new recipe (side       waiting; pick      customer: story   verdict per    rep changes,
   effects smudged),      who to talk to     + 2 follow-up     customer:      grimoire/notes
   town facts             (any order)        questions; facts  SERVE(potion)/ update
                                             auto-noted        TURN AWAY/          │
                                                               DENOUNCE            │
        ┌───────────────────────────────────────────────────────────────┐          │
        │  after day 3 (or reputation ≤ 0): FINAL EVALUATION screen     │◀─────────┘
        └───────────────────────────────────────────────────────────────┘
```

**What the player does / sees / feels per phase:**

| Phase | Does | Sees | Feels |
|---|---|---|---|
| 1. Morning Brief | Reads; clicks to continue | Parchment note: new recipe card, 2–3 numbered town facts, snarky sign-off | Curiosity; "these facts will matter" |
| 2. Shop Floor | Clicks a customer portrait | Counter view, 3 waiting customers with name + one-line want | Sizing people up |
| 3. Stories | Reads story; asks both follow-up questions; watches facts land in Notes | Dialog panel, portrait, quill-scratch note animation | Detective work; "wait, didn't the note say…" |
| 4. Ledger | Assigns verdicts; picks the potion for the served customer; confirms "End the Day" | Ledger page: 3 rows × verdict buttons, potion picker, warnings | Commitment tension — the core moment |
| 5. Nightfall | Reads outcomes | Night vignette: one paragraph per customer, rep delta popups, side-effect reveals into Grimoire | Payoff — vindication or a fair sting |

---

## 5. Inputs & controls

Fully mouse/touch driven; keyboard is a convenience layer. **Touch-viable: yes, completely** — it is a tap-to-read game with no timing, drag, or precision input. The layout must work at 380 px width.

| Action | Desktop | Touch |
|---|---|---|
| Advance dialog / continue | Click anywhere in dialog panel, or `Space`/`Enter` | Tap dialog panel |
| Skip typewriter (show full line) | Same as advance (first press completes line, second advances) | Same |
| Select customer / verdict / potion / follow-up | Click button; `1`–`3` selects listed options top-to-bottom | Tap button |
| Open/close Notes panel | Click "Notes" HUD button, or `N` | Tap "Notes" |
| Open/close Grimoire | Click "Grimoire" HUD button, or `G` | Tap "Grimoire" |
| Cycle a note's mark (? → ✓ → ✗ → ?) | Click the note's mark chip | Tap the mark chip |
| Mute/unmute | Click speaker icon, or `M` | Tap speaker icon |
| Restart run (with confirm dialog) | Click "Restart" on pause sheet, or `R` | Tap "Restart" on pause sheet |
| Pause sheet (resume/restart/mute/rules) | `Esc` or click "☰" HUD button | Tap "☰" |
| End the day (from Ledger, with confirm) | Click "End the Day" | Tap "End the Day" |

No other inputs exist. The game is untimed, so "pause" only opens the sheet; nothing runs in the background.

---

## 6. Game elements

### 6.1 The player (apprentice)

Never shown on screen; exists as the second-person voice and the hands that write the ledger. No avatar art needed.

### 6.2 Master Bellows

Off-screen character. Delivers the Morning Brief as a pinned parchment note. Terse, snarky, fallible-seeming but always factually reliable — **brief facts are never lies** (this is a load-bearing rule the splash screen states). Placeholder art: a wax seal emoji 🪶 on the note header.

### 6.3 Customers (NPCs)

Seven townsfolk across 3 days (full scripts in **Appendix A** — the appendix is P0 content, not optional):

| ID | Name | Role | Appears | Portrait placeholder | Honest? |
|---|---|---|---|---|---|
| `marta` | Marta | Baker | Day 1 | 🥖 on a circle | Yes |
| `fenn` | Fenn | Shepherd | Days 1, 2 | 🐑 | Yes |
| `cricket` | Cricket | Peddler | Day 1 | 🎒 | **Liar (Day 1)** |
| `doran` | Doran | Miller | Day 2 | ⚙️ | **Liar (Day 2)** |
| `hazel` | Widow Hazel | Retired | Day 2 | 🫖 | Yes (muddles names) |
| `sila` | Sila | Fisherwoman | Day 3 | 🐟 | Yes |
| `bram` | Bram | Town guard | Day 3 | 🛡️ | Yes |
| `quill` | "Master Quill" | "Scholar" (Cricket in disguise) | Day 3 | 📜 | **Liar (Day 3)** |

Behavior: static portraits + dialog. Each customer has: a stated problem, a stated payment (flavor only in P0 ⚑), a story of 70–120 words, exactly 2 follow-up questions (both freely askable ⚑), a set of extractable **facts**, and 4 resolution texts (served-correct, served-wrong, denounced, turned-away; liars add served-liar).

Final art (P2): flat-vector bust portraits, 2 expressions each.

### 6.4 Potions (the Grimoire)

| ID | Name | Effect (known from start) | Side effect | Side effect known at start? | Config key |
|---|---|---|---|---|---|
| `salve` | Soothing Salve | Heals cuts, sprains, minor wounds | None | Yes ("None") | — |
| `wideawake` | Wideawake Brew | Banishes drowsiness for a day | The jitters (shaky hands) | Yes | — |
| `moonpetal` | Moonpetal Draught | Deep, dreamless sleep for the sleepless | **Moon-tongue:** drinker blurts only truths for a day | No — revealed on first serve | `recipe.day1` |
| `emberroot` | Emberroot Tonic | Restores strength and stamina | **Ember-temper:** hair-trigger temper for a day | No — revealed on first serve | `recipe.day2` |
| `clearsight` | Clearsight Philtre | Sharpens sight; reveals what hides | **Grey-eye:** the world looks grey for a day | No — revealed on first serve | `recipe.day3` |

- `salve` and `wideawake` are in the Grimoire from Day 1 morning. Each day's brief adds one recipe.
- Recipe cards list 3 flavor ingredients each (e.g. "2 moonpetals, 1 sprig of rosemary, 1 cup spring water") — **ingredients are flavor text only in P0**; there is no inventory. ⚑ (overridable — foraging/inventory is P1.)
- Serving any potion whose side effect is unknown **reveals it** (Grimoire entry updates, quill SFX, "NEW: side effect discovered" toast) — even on a correct serve. This is the "experiment on your customers" mechanic, made safe-but-funny.
- The unknown side effects also pay off in resolution comedy and next-morning brief callbacks.

### 6.5 Notes panel (the auto-journal)

Every **fact line** in the content data auto-appends a note card when displayed: `Day • Speaker • text`. The player can cycle a mark on each card: `?` (default) → `✓` (I believe it) → `✗` (I think it's a lie). Marks are cosmetic aids — they never affect scoring. Facts persist across days (Day 3's lie is only catchable via a Day 1 note). Cap: the full 3-day run produces ~24 notes; panel is a scrollable list grouped by day.

### 6.6 The Ledger (verdict UI)

Unlocks only after all three customers have been talked to (both follow-ups optional but the story itself is mandatory). Three rows, one per customer; each row gets exactly one verdict:

- **SERVE** — opens the potion picker (all known potions selectable). Max **one** SERVE per day (`maxServesPerDay`).
- **TURN AWAY** — neutral.
- **DENOUNCE** — publicly accuse of lying. Max **one** per day (`maxDenouncePerDay`).

"End the Day" validates: if zero SERVE, show confirm: *"The cauldron will sit cold tonight. Bellows will notice. End the day anyway?"*

### 6.7 Zones / screens

No spatial world in P0. The "town" exists in text. (Foraging map = P1, see §8.)

---

## 7. Rules, win & lose conditions

### Reputation

The single score. Starts at `repStart = 5`, clamped to `[0, repMax = 10]`.

| Event | Rep change | Config key |
|---|---|---|
| Serve an honest customer a potion in their `correctPotions` list | **+2** | `repServeCorrect` |
| Serve an honest customer any other potion | **−1** (plus comedy, plus side-effect reveal if unknown) | `repServeWrong` |
| Serve the liar (any potion) | **−2** (Day 3 liar overrides to **−3** via content field `liarPenalty`) | `repServeLiar` |
| Denounce the liar | **+1** | `repDenounceHit` |
| Denounce an honest customer | **−1** | `repDenounceMiss` |
| End a day with zero serves | **−1** | `repIdleDay` |
| Day-3 town bonus: serve Bram Wideawake (he catches the thief) | **+1** extra | `repTownBonus` |
| Turn away anyone (honest or liar) without denouncing | 0 | — |

All deltas from one day resolve together at Nightfall, shown as itemized lines, then clamped.

### Win / lose

- **Run ends after Day 3's Nightfall** → Final Evaluation screen with a tier based on final reputation (`endingThresholds`):
  - **9–10: "The Master's Seal"** — Bellows signs your journeyman papers on the spot.
  - **6–8: "A Promising Apprentice"** — a grunt of approval, which from Bellows is a parade.
  - **3–5: "Back to Scrubbing Cauldrons"** — you may try again next season.
  - **1–2: "The Customers Ask for Bellows Now"** — ouch.
- **Early loss:** if reputation reaches **0 or below** at any Nightfall, the run ends immediately with **"Sent Home in Disgrace."**

### Edge cases (exhaustive — the game is untimed and turn-based, so this list is short)

- Serve + Denounce the same customer: impossible; verdicts are mutually exclusive radio states per row.
- Serve the liar "correctly" (a potion matching their *stated* problem): still `repServeLiar` — the resolution text explains the con. The stated problem was a lie.
- Denounce correctly but serve nobody: −1 idle +1 denounce = net 0. Allowed; resolution text acknowledges the caution.
- Reputation would exceed 10: clamp to 10 (show "MAX").
- Reload mid-run: P0 has no persistence — reload restarts the run at the splash. ⚑ (P1 adds `localStorage` day-checkpoint saves.)
- Asking zero follow-ups: allowed; the Ledger only requires the base story to have been read.
- Revisiting a customer before the Ledger: allowed; dialog replays from a transcript (no re-roll — content is static).

---

## 8. Difficulty & progression

Single tuned difficulty. Challenge escalates across the 3 scripted days by **increasing the distance between the lie and its contradicting evidence**:

| Day | Lie is contradicted by | Difficulty |
|---|---|---|
| 1 | The same morning's brief **and** another customer's story, same day (two separate catchable lies) | Easy — teaches the mechanic |
| 2 | One fact in that morning's brief (one strong lie) plus a soft character-knowledge assist | Medium |
| 3 | A fact stated by a customer **on Day 1** (requires the Notes panel or memory) | Hard — the payoff test |

Cross-run progression: none in P0. Knobs for playtesting live in config (`hintLiarExists`, penalties). P1 progression: foraging phase (pick 1 of 3 map areas from brief hints; picking the hinted area yields the day's ingredients, wrong area forces a substitute ingredient with a comedic potion quirk). P2: gold/barter economy, branching world state, days 4–7.

---

## 9. Style & theme

**Visual style:** "Cozy apothecary ledger." Flat colors, no gradients, generous whitespace, everything framed as parchment cards on a dark wooden counter. Illustrated feel achieved with CSS shapes, borders, and emoji placeholders — zero image assets in P0–M1.

**Palette (6 colors + 2 accents):**

| Use | Hex |
|---|---|
| Background (dark counter wood) | `#2B1F14` |
| Parchment (cards, panels) | `#F0E2C4` |
| Ink (body text on parchment) | `#3A2E22` |
| Moss green (honest/positive, ✓, serve button) | `#6B8F4E` |
| Potion purple (magic, grimoire, headers) | `#7C5CBF` |
| Ember orange (warnings, denounce, ✗) | `#D9772F` |
| Accent red (rep loss, liar reveal) | `#B54134` |
| Accent gold (rep gain, coins, seals) | `#C9A227` |

**Typography:** Body/story text: `Georgia, 'Iowan Old Style', serif`, 18 px, 1.5 line-height. Headers and buttons: same serif in small-caps via `font-variant: small-caps`. No webfonts (static, asset-free).

**Tone/mood:** Warm, wry, Pratchett-adjacent. Villains are con men; consequences are embarrassing, not tragic. The master's notes are the comedy anchor.

**Reference points:** *Strange Horticulture*'s desk-and-ledger intimacy, *Coffee Talk*'s customer rhythm, *Murdle*'s "the contradiction is on the page" fairness.

**Placeholder art plan (M0–M1):** Portraits = emoji in a 72 px circle with a colored ring (green-ring/orange-ring only in `?debug=1`). Potions = colored bottle glyphs (`🧪` tinted via CSS filter or colored dot + name). Screens = plain parchment `div`s. No art may be made before M2.

---

## 10. Sound design

**Implementation:** Web Audio API, all SFX synthesized in code (jsfxr-style helper, ~60 lines) — zero audio assets. No Howler needed. Audio context is created/resumed only on the first user gesture (the splash "Open the Shop" click). Mute toggle is P0, persisted to `localStorage` key `ttal.muted`.

**SFX event table:**

| Game event | Sound description | Priority |
|---|---|---|
| Customer steps to counter | Shop doorbell: two-note sine ding (E5→A5, 150 ms) | P0 |
| Dialog line advance | Soft page-turn: short filtered noise swish (80 ms) | P0 |
| Fact added to Notes | Quill scratch: high-passed noise blip (60 ms) | P0 |
| Potion served | Bubble-glug: 3 descending sine blips with vibrato | P0 |
| Rep gain at Nightfall | Warm chime: major triad arp up | P0 |
| Rep loss at Nightfall | Womp: saw wave slide down a fifth (250 ms) | P0 |
| Denounce chosen in Ledger | Gavel knock: low square-wave thunk ×2 | P0 |
| Side effect discovered (Grimoire update) | Sparkle: fast 4-note pentatonic run up | P1 |
| Button hover | 30 ms tick | P1 |
| Ending fanfare (tier-dependent 3 notes) | Triad up (good) / diminished (bad) | P1 |

**Music:** None in P0/P1. P2 option: generative ambient (slow filtered drone + occasional pluck, seeded). Never copyrighted tracks.

---

## 11. UI & screens

**Flow:** `Splash → [Day N: Brief → Shop Floor ⇄ Conversation → Ledger → Nightfall] ×3 → Final Evaluation → (Restart → Splash)`. Notes and Grimoire are overlays available from every in-day screen. Pause sheet available everywhere.

### Splash screen (mandatory)

- Title: **Two Truths and a Lye** + one-liner: *"Mind the potion shop. Spot the liar. You get one brew a day."*
- Rules, ≤5 bullets:
  - Each morning: read the master's note — his facts are always true.
  - Talk to all three customers. **One of them is lying.**
  - You can brew **one** potion today. Choose who gets it, and which potion.
  - Denounce the liar for a bonus — accuse the innocent and pay for it.
  - Keep your reputation above zero for three days.
- Controls line: *"Mouse or touch: tap to read, tap to choose. N Notes · G Grimoire · M Mute."*
- Version number bottom-right, rendered from the `VERSION` constant (starts `v0.1.0`).
- One obvious **"Open the Shop"** button (also unlocks audio).

### HUD (persistent during a day)

Top bar: `Day 2 of 3` • Reputation as 10 vial pips (filled = gold) with numeric value • buttons: `Notes`, `Grimoire`, speaker (mute), `☰` (pause sheet). Bottom of Conversation screen: "Back to shop floor" link.

### Shop Floor

Three portrait cards (name, role, one-line want, "talked ✓" check). "Open the Ledger" button, disabled with tooltip *"Hear everyone out first"* until all three stories are read.

### Conversation

Portrait left, dialog panel right (stacked on mobile). Typewriter text at `textSpeedCps`. After the story: two follow-up question buttons (each collapses into its answer once asked). Facts flash a "→ noted" chip as they land.

### Ledger

Parchment spread: three rows (portrait, name, verdict radio: Serve / Turn away / Denounce). Selecting Serve opens an inline potion picker (known potions with effect + side-effect-if-known text; unknown shows "Side effect: ¿?"). Footer: "End the Day" with validation messages.

### Nightfall

Dark blue-tinted parchment. One outcome paragraph per customer in queue order, each followed by its itemized rep delta (`+2 Served Marta well`, gold/red). Side-effect discoveries show a Grimoire card flip. "Sleep →" button advances to next Brief or the Final Evaluation.

### Final Evaluation

Tier title + Bellows's verdict paragraph (per tier, in Appendix A.4) • final reputation • three one-line day recaps (which verdicts) • liar reveal summary ("Day 1's liar was Cricket — did you catch him?") • seed value • **"Play Again"** button.

---

## 12. Config & tuning

All tunables live in one exported object in `js/config.js`. The content script (Appendix A) lives in `js/content.js`; config holds numbers, content holds words.

```js
export const VERSION = "0.1.0";
export const CONFIG = { /* table below */ };
```

| Key | Default | Unit | What it affects |
|---|---|---|---|
| `days` | 3 | count | Length of a run (content defines max 3) |
| `repStart` | 5 | rep | Starting reputation |
| `repMax` | 10 | rep | Clamp ceiling |
| `repLoseAt` | 0 | rep | ≤ this at Nightfall = instant fail ending |
| `repServeCorrect` | +2 | rep | Honest customer, correct potion |
| `repServeWrong` | −1 | rep | Honest customer, wrong potion |
| `repServeLiar` | −2 | rep | Any potion to the liar (content may override per-liar via `liarPenalty`) |
| `repDenounceHit` | +1 | rep | Denounced the liar |
| `repDenounceMiss` | −1 | rep | Denounced an honest customer |
| `repIdleDay` | −1 | rep | Ended day with zero serves |
| `repTownBonus` | +1 | rep | Content-flagged bonus outcomes (Day 3 Bram) |
| `maxServesPerDay` | 1 | count | Ledger validation |
| `maxDenouncePerDay` | 1 | count | Ledger validation |
| `hintLiarExists` | `true` | bool | Splash/brief states "one of them is lying" ⚑ |
| `requireAllStories` | `true` | bool | Ledger locked until all 3 stories read |
| `textSpeedCps` | 40 | chars/sec | Typewriter speed (0 = instant) |
| `endingThresholds` | `[9, 6, 3, 1]` | rep | Tier boundaries (≥9, ≥6, ≥3, ≥1, else fail) |
| `sfxVolume` | 0.5 | 0–1 | Master SFX gain |
| `notesCap` | 60 | count | Safety cap on note cards |

**URL flags (all P0 except noted):**

- `?seed=12345` — seeds the PRNG (mulberry32). P0 randomness is only the within-day customer queue order, so runs are reproducible/comparable. Seed is displayed on the Final Evaluation screen.
- `?debug=1` — debug overlay: current state name, rep log, liar badge (orange ring) on liar portraits, buttons to jump to any day/screen, and instant text.
- `?day=2` — start at that day's Brief (rep = `repStart`).
- `?skip=1` — skip splash straight to Day 1 Brief (audio unlocks on first click anyway).
- `?fast=1` — sets `textSpeedCps = 0`.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + semantic HTML + CSS. No canvas, no framework, no build step.** This is a text-and-buttons game: the DOM *is* the right renderer — free layout, free text wrapping, free accessibility, trivially touch-compatible, and instantly deployable by copying a folder to GitHub Pages. A `<div>`-based parchment UI with CSS transitions hits 60 fps by doing nothing; the perf budget is simply "< 100 DOM nodes per screen, CSS transforms only for animation, no per-frame JS loop" (the only rAF use is the typewriter). Game logic is a pure reducer module with zero DOM imports so it runs headless under Node for tests. Web Audio synthesizes all SFX, so the entire deployable is `index.html + css/ + js/` with **zero binary assets and zero runtime network calls**.

- Files served as-is; open `index.html` via any static server (`npx serve`) or file URL with modules (use a tiny local server for dev).
- No dependencies. Optional dev-only: Node's built-in `node:test` for the headless sim tests.

---

## 14. Milestones

### M0 — Toy loop (prove the deduction is fun with ugly HTML)

**Goal:** One full 3-day run playable end-to-end using default browser styling, the complete Appendix A content, and the full scoring reducer. No splash, no audio, no art, no Notes marking (plain fact list is fine).

**Deliverables:** `content.js` (all of Appendix A as data), `game.js` (pure reducer + selectors), `main.js` (minimal DOM renderer), unstyled `index.html`.

**Acceptance criteria:**
- [ ] A tester can complete Days 1–3 and reach an ending in under 12 minutes with no console errors.
- [ ] Each day's liar is identifiable from displayed text alone: for every lie, its contradicting line(s) have always been shown to the player before the Ledger opens.
- [ ] Scoring matches §7 exactly for these scripted paths (assert in headless tests): perfect run (serve correct + denounce liar daily + Day 3 Bram bonus) = rep 10; all-liars-served run = fail ending on Day 3 or earlier; idle-all-days run = rep 2.
- [ ] `?day=N` and `?seed=` work.
- [ ] **Stop/go decision recorded:** if 2 of 3 first-time testers don't feel the "aha" of catching at least one liar, stop — art won't save it.

**Proves:** the fun hypothesis, before any polish.

### M1 — Real rules

**Goal:** Full P0 ruleset and chrome: splash (rules, controls, version), HUD, Ledger validation, Notes panel with ✓/✗ marking, Grimoire with side-effect reveals, Nightfall itemized deltas, Final Evaluation tiers, restart, pause sheet.

**Acceptance criteria:**
- [ ] A first-time player understands the goal and controls from the splash alone within 60 seconds, unprompted.
- [ ] All verdict edge cases in §7 behave as specced (zero-serve confirm, verdict exclusivity, clamping, early-loss ending).
- [ ] Notes persist across days; a Day 3 player can find Fenn's Day 1 bridge line in ≤ 10 seconds via the Notes panel.
- [ ] Serving an unknown-side-effect potion updates the Grimoire and the update is visible at Nightfall.
- [ ] Restart at any point returns to a clean splash; version string on splash matches `VERSION`.

### M2 — Feel

**Goal:** Parchment art pass per §9, all P0 SFX per §10, transitions (card slide-ins, rep pip animation, Grimoire card flip), typewriter polish, mobile layout at 380 px.

**Acceptance criteria:**
- [ ] Zero image/audio asset files in the deploy folder; palette and typography match §9.
- [ ] All P0 SFX fire on their events; mute toggle works, persists, and audio only starts after a user gesture.
- [ ] Playable comfortably on a phone-sized viewport (tap targets ≥ 44 px).
- [ ] 60 fps during all transitions on a mid-range laptop (no layout thrash; transforms/opacity only).

### M3 — Playtest build

**Goal:** Deployed, instrumented for playtesting, P1 features if time allows.

**Deliverables:** deployed to static host under `/games/potion-maker/`; `?debug=1` overlay complete; README with playtest questions from §2.

**P1 backlog (strict order):** localStorage day checkpoints → foraging phase (map with 3 areas + brief hints) → payment/gold as a soft constraint → per-note "link to contradiction" hint button (accessibility for stuck players).

**Acceptance criteria:**
- [ ] Same `?seed=` produces the identical customer order; seed shown on the end screen.
- [ ] Debug overlay shows state, rep log, and liar badges; jump-to-day works.
- [ ] Deployed URL loads with no network requests beyond the static files (verify in devtools).
- [ ] Headless test suite passes in CI/na Node run: reducer paths from M0 plus denounce-miss and wrong-potion paths.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is telegraphing "one of them is lying" every day the right call, or does it flatten Day 1? Knob: `hintLiarExists`. ⚑ shipped `true` — fairness beats surprise in a prototype.
2. **(non-blocking — resolve in playtest)** Do players actually use ✓/✗ note marking, or only read the list? If unused after 5 testers, cut marking in P1 and keep the plain transcript.
3. **(non-blocking — resolve in playtest)** Is the Denounce mechanic too explicit (turns social fiction into a quiz)? Knob: hide Denounce by removing it from the ledger config (`maxDenouncePerDay = 0`) and fold its bonus into turn-away-the-liar.
4. **(non-blocking — resolve in playtest)** Story length tolerance: are 70–120-word stories + 2 follow-ups too much reading per day? Content-side fix (trim), no code change.
5. **(non-blocking — resolve in playtest)** Should wrong-potion serves cost −1 or 0? If testers stop experimenting for fear of losing rep, set `repServeWrong = 0` — experimenting is a pillar-adjacent behavior we want.
6. **(non-blocking)** Days 4+ content and the branching world (the source idea's "who you help affects the world") are P2; the conditional-brief-line system (Appendix A) is the cheap testbed for whether reactivity lands.

No blocking questions. All content needed to build P0 is in this document.

---

## 16. Handoff notes for Fable

**Build order:** `content.js` (transcribe Appendix A verbatim into the schema below) → `game.js` pure reducer + headless tests → `main.js` DOM renderer (Brief → Shop → Conversation → Ledger → Nightfall) → HUD/overlays (Notes, Grimoire, pause) → splash/end screens → `audio.js` synth → M2 styling/juice.

**Keep headless-testable:** `game.js` exports `initState(config, content, seed)` and `reduce(state, action) → state` with actions like `{type:'TALK', customerId}`, `{type:'ASK', customerId, followUpIndex}`, `{type:'SET_VERDICT', customerId, verdict, potionId?}`, `{type:'END_DAY'}`, `{type:'ADVANCE'}`. No DOM, no timers, no audio imports in `game.js` or `content.js`. Nightfall rep math is a pure function `resolveDay(state) → {deltas:[], reveals:[], texts:[]}` — unit-test it against the three scripted paths in M0.

**Content schema (`content.js`):**

```js
{ potions: [{id, name, ingredients:[..3 strings], effect, sideEffect, sideEffectKnown}],
  days: [{ day, brief: { recipeId, lines:[string], conditionalLines:[{ifFlag, text}] },
           customers: [{ id, name, role, portrait, isLiar, liarPenalty?, wants, payment,
                         correctPotions:[ids], story:[paragraphs],
                         facts:[{id, text, isLie, contradicts:[factIds]}],
                         followUps:[{q, a, factIds:[ids]}],
                         resolutions:{ correct, wrong, liarServed?, denounced, turnedAway },
                         setsFlagOnServe?, townBonusPotion? }]}],
  endings: [{min, title, text}] }
```

Outcome flags set during resolution (for `conditionalLines`): `cricketServed`, `martaMoonpetal`, `doranServed`, `moonpetalKnown`, `emberKnown`.

**Repo layout (= deployable static output; no build step):**

```
public/games/potion-maker/
  index.html        design.md (this file)
  css/style.css
  js/config.js  js/content.js  js/game.js  js/main.js  js/audio.js  js/rng.js
  tests/game.test.js   (dev-only; excluded from deploy or harmlessly shipped)
```

**Reminders:** Prove the loop with unstyled HTML and the real Appendix A text before touching CSS — the words are the game. Ship every milestone runnable. If M0 testers don't feel clever catching a liar, stop and report back rather than polishing.

---

## Appendix A — P0 content script (this IS the game; transcribe verbatim)

Conventions: **[FACT `id`]** lines become Notes cards. **⚠ LIE** marks a false fact and names what contradicts it. Player-facing text never shows these annotations. Each liar's story deliberately contains true, checkable details too — two truths and a lie.

### A.0 Starting Grimoire (shown on first Shop Floor visit, Day 1)

- **Soothing Salve** — "Heals cuts, sprains, and wounded pride (minor)." Side effect: *None.* Ingredients: 3 mallow leaves, 1 dab of honey, 1 clean bandage.
- **Wideawake Brew** — "Banishes drowsiness for a day and a night." Side effect: *The jitters — hands shake like a leaf in a gale.* Ingredients: 2 roasted fire-beans, 1 pinch of ginger, 1 splash of cold spring water.

---

### A.1 — DAY ONE

#### Morning Brief (pinned note, wax seal)

> Apprentice —
>
> New recipe on the back of this note: **MOONPETAL DRAUGHT**. Brings deep, dreamless sleep to the weary. Side effects: *[a long ink smudge]* — well, you'll find out.
> *(Recipe card: 2 moonpetals picked at dusk, 1 sprig of rosemary, 1 cup of spring water.)*
>
> Town matters, mind them:
> 1. **[FACT `b1-mill`]** The mill has stood silent since Tuesday. Doran owes half the town flour — nobody has baked all week.
> 2. **[FACT `b1-moon`]** Last night was black as pitch — new moon. Mind your step on the lane.
>
> Do not blow up my shop. — B.

#### Customer 1: **Marta the baker** (honest) — wants: *something for sleep* — payment: "first loaves when the flour comes back"

Story:
> "Three nights now I've lain there like a plank, staring at the ceiling. The ovens want lighting at three in the morning — when there's flour, which — ha! **[FACT `m1-noflour`]** There's been no flour since the mill shut. I haven't baked a thing all week.** So instead of sleeping I lie there doing sums. Rent sums. Awful sums. **[FACT `m1-fog`]** My cousin Sila says the fog's been thick as wool on the river every morning** — even the fish are sleeping in, and here's me, wide awake, jealous of a trout."

Follow-ups:
- Q: **"What keeps you awake, exactly?"** → A: "Worry, mostly. And noise — **[FACT `m1-hazel`]** old Hazel's up pacing at all hours too; her cottage backs onto Quarry Lane.** Whole street's gone peculiar."
- Q: **"When did you last bake?"** → A: "Tuesday morning. The last of my flour went into a loaf so small I'm ashamed to speak of it."

`correctPotions: [moonpetal]` (Wideawake is the cruel opposite; Salve does nothing.)

Resolutions:
- **correct (Moonpetal):** "Marta sleeps twelve glorious hours. Then — the smudged part — she spends the next day physically unable to say anything but the truth, and tells the visiting tax collector *precisely* what she thinks of his little book. The town applauds. **Grimoire updated: Moonpetal Draught → side effect: Moon-tongue.** (+2)" *(sets flag `martaMoonpetal`, `moonpetalKnown`)*
- **wrong:** "{Potion wrong-line, see A.5.} None of it helps her sleep. She yawns at you reproachfully. (−1)"
- **turnedAway:** "Marta trudges home to her sums. You hear her counting through the shutters."

#### Customer 2: **Fenn the shepherd** (honest) — wants: *the Salve* — payment: a wheel of sheep's cheese

Story:
> "Ram went through the fence at dusk and I went after him, and the fence wire went after *me*." *(shows a nasty gash on his forearm)* "Took the long way home in the dark, too — **[FACT `f1-bridge`]** the north bridge is still washed out from the spring storm, so it's the long road round for everyone and everything.** And here's a queer thing for your master's note-book: **[FACT `f1-lights`]** two nights back I saw lights down in the old quarry. Bobbing about, like lanterns.** Nobody's supposed to be down there."

Follow-ups:
- Q: **"Lights? In the flooded quarry?"** → A: "**[FACT `f1-gallery`]** Down the dry side — the lower gallery. Nobody's worked that quarry in two years.** Gave me the shivers."
- Q: **"How's the arm?"** → A: "Attached. Which is more than the fence can say."

`correctPotions: [salve]`

Resolutions:
- **correct:** "The gash knits before he's out the door. He leaves the cheese. It is *excellent* cheese. (+2)"
- **wrong:** "{Potion wrong-line.} His arm still hurts and now there's this to deal with. (−1)"
- **turnedAway:** "Fenn shrugs, ties a sock around the gash, and limps off after his ram."

#### Customer 3: **Cricket the peddler** (LIAR) — wants: *Wideawake Brew* — payment: "silver buttons — real silver, mind"

Story:
> "What a road! **Walked all night from Dunhollow by the mill road, I did** — and **⚠ LIE [FACT `c1-bread`] bought one of Marta's fresh rolls at dawn. Warm as a hug! Best bread in the county.** *(contradicts `b1-mill`, `m1-noflour`)* And such a night for walking — **⚠ LIE [FACT `c1-moon`] the moon lit my way the whole road, bright as a coin.** *(contradicts `b1-moon`)* Now, tomorrow's market day and a peddler must guard his wares through the night. One measure of your Wideawake Brew and I'm your friend for life. Everyone's friend, really."

Follow-ups:
- Q: **"A fresh roll, was it?"** → A: "Warm from the oven! Poppyseed. **[FACT `c1-doubledown`]** She was pulling trays out as the sun rose, whistling away.**" *(also false; deepens the same lie)*
- Q: **"What is it you sell?"** → A: "This and that. Curiosities. **[FACT `c1-maps`]** Maps, sometimes.** Everything a discerning village requires." *(true — and it matters on Day 3)*

`correctPotions: []` (he is the liar; there is no correct serve)

Resolutions:
- **liarServed:** "You hand over the brew. That night someone tireless, quick, and slightly jittery works their way through three garden walls on Quarry Lane. Three houses lose their silver. The 'silver' buttons he paid you turn out to be tin. (−2)" *(sets flag `cricketServed`)*
- **denounced:** "'No bread's been baked in this town all week, and there was no moon last night.' Cricket's smile snaps shut like a purse. He departs at speed — and you notice his pack clinks with garden trowels. (+1)"
- **turnedAway:** "Cricket bows, wishes you 'profitable dreams,' and strolls off whistling a shepherd's tune."

---

### A.2 — DAY TWO

#### Morning Brief

> Apprentice —
>
> New recipe: **EMBERROOT TONIC**. Restores strength to weary limbs. Side effects: *[ink blot]* ...temper..? Illegible. My own fault for writing in the rain.
> *(Recipe card: 1 emberroot, 2 nettle tops, 1 spoon of treacle.)*
>
> 1. **[FACT `b2-quarry`]** The old quarry has been abandoned since it flooded two springs past. No quarrymen work there — whatever Fenn thinks he saw.
> 2. **[FACT `b2-hazel`]** Widow Hazel's eyes are going but her ears are sharp. She muddles *names*, never *events*.
>
> — B.

Conditional lines (append if flag set):
- `cricketServed`: "P.S. Three houses on Quarry Lane were robbed in the night by someone who did not need sleep. The town blames strangers. I blame carelessness."
- `martaMoonpetal`: "P.P.S. Marta told the tax collector the unvarnished truth of his character yesterday. All day. Couldn't stop. *Note that down under Moonpetal.*"

#### Customer 1: **Doran the miller** (LIAR) — wants: *Emberroot Tonic* — payment: "flour futures — first sacks off the stone when she turns again"

Story:
> "Look at these hands. Wrecked. The axle cracked Tuesday and I've been at it ever since — **⚠ LIE [FACT `d2-quarrymen`] buying fresh-cut stone off the quarrymen and hauling it up the mill road myself, dawn to dusk.** *(contradicts `b2-quarry`; supported by `f1-gallery` — the quarry has been dead two years)* One more day of hauling, one brace to set, and the mill turns again and everyone gets their flour. But I'm spent, apprentice. Give me back my strength for one day and the whole town eats."

Follow-ups:
- Q: **"Fresh-cut stone from where, exactly?"** → A: "The quarry, west face. **[FACT `d2-granite`]** Fine grey granite, cut this week.**" *(false in every particular; doubling down)*
- Q: **"When will you grind flour again?"** → A: "Day after tomorrow. On my honour as a miller." *(evasive — notice he never mentions where the repair money went)*

`correctPotions: []`

Resolutions:
- **liarServed:** "Strength restored, Doran marches — not to the mill — to the Drowned Rat, where he has an arm-wrestling wager that was going to win back the repair money he gambled away. The Emberroot's smudged side effect turns out to be a hair-trigger temper: he flips the table, breaks a window, and loses the wager anyway. **Grimoire updated: Emberroot Tonic → side effect: Ember-temper.** (−2)" *(sets flags `doranServed`, `emberKnown`)*
- **denounced:** "'There are no quarrymen. The quarry's been flooded for two years.' Doran deflates like a punctured flour sack and confesses: he gambled away the repair fund. The town is furious, but at least it's *informed* furious. (+1)"
- **turnedAway:** "Doran shuffles out, flexing his ruined hands and muttering about honour."

#### Customer 2: **Widow Hazel** (honest, muddles names) — wants: *"a draught to sleep through that scraping"* — payment: a jar of blackberry preserves and all the gossip you can carry

Story:
> "Three nights running, past midnight, there's *digging* behind my garden wall — Quarry Lane side. Scrape, scrape, scrape, two hours at a stretch. **[FACT `h2-fenn`]** It's young Fenn out there, I'd swear it — I heard him whistling that shepherd tune.** *(the event is true; the NAME is her muddle — see `b2-hazel`, `f2-whistle`)* **[FACT `h2-nights`]** Third night running. Always past midnight, always about two hours.** A woman my age needs her sleep or she gets *opinions*."

Follow-ups:
- Q: **"Are you certain it was Fenn?"** → A: "Well. My eyes aren't what they were. But *somebody* whistled, and whistling means mischief."
- Q: **"What would anyone dig for on Quarry Lane?"** → A: "**[FACT `h2-hoard`]** The old Quarrymaster lived along that lane, you know. Died with a full purse and no heirs. They never did find it.**"

`correctPotions: [moonpetal]`

Resolutions:
- **correct:** "Hazel sleeps like the blessed through scrape, whistle, and all. {If `moonpetalKnown` false: 'The next day she tells the vicar the complete and honest history of his sermons, dated and ranked. **Grimoire updated: Moonpetal Draught → side effect: Moon-tongue.**' — sets `moonpetalKnown`.} (+2)"
- **wrong:** "{Potion wrong-line.} The scraping continues. So do the opinions. (−1)"
- **turnedAway:** "Hazel sniffs, leaves the preserves anyway ('I'm cross, not a monster'), and goes home to glare at her wall."

#### Customer 3: **Fenn the shepherd** (honest) — wants: *the Salve (again), and his name cleared* — payment: another cheese, "or a lamb in spring, your pick"

Story:
> "Twisted my ankle chasing that same blessed ram — but that's not the half of it. Half the town's saying *I'm* the one digging up Quarry Lane at midnight! **[FACT `f2-pens`]** I was in the fold pens both nights — rams don't pen themselves — ask anyone at the top field.** And here's the thing that clears me proper: **[FACT `f2-whistle`]** I can't whistle. Lost my front tooth to a gate when I was nine.** *(defuses `h2-fenn`: whoever dug, whistles)* Try me. *(He attempts it. It is a sad, flat hiss.)*"

Follow-ups:
- Q: **"Who else knows that shepherd tune?"** → A: "**[FACT `f2-tune`]** Every peddler that's ever passed the Drowned Rat knows it.** It's a good tune. I'd whistle it myself, if I could."
- Q: **"How's the ram?"** → A: "Unrepentant."

`correctPotions: [salve]`

Resolutions:
- **correct:** "Ankle mended, Fenn walks the town showing everyone his non-whistle. Public opinion swings. The cheese, again, is excellent. (+2)"
- **wrong:** "{Potion wrong-line.} The ankle still aches and the rumours still swirl. (−1)"
- **turnedAway:** "Fenn hobbles off with as much dignity as one ram-owner can carry."

---

### A.3 — DAY THREE

#### Morning Brief

> Apprentice —
>
> Last day of your trial, and don't think I haven't been keeping score.
> New recipe: **CLEARSIGHT PHILTRE**. Sharpens the eye; shows what hides. Side effects: *[smudge]* ...grey...? One day I will buy better ink.
> *(Recipe card: 1 hawk's feather (molted, ethically), 2 dewdrops off a spider's web, 1 whole peeled grape.)*
>
> 1. **[FACT `b3-chandler`]** The chandler's shop was broken into two nights past. Nothing taken but old **survey maps of the quarry** and a storm-lantern. A thief with peculiar taste.
> 2. **[FACT `b3-gallery`]** The quarry's lower gallery stays dry in high summer. If the old Quarrymaster hid his purse anywhere, it's there. **Ware anyone asking after the quarry.**
>
> — B.

Conditional lines:
- `doranServed`: "P.S. Doran wrecked the Drowned Rat's best table last night and blames my tonic. The temper is the tonic's; the wager was entirely his own."
- `cricketServed`: "P.P.S. Still no sign of the Quarry Lane silver. Or the peddler."

#### Customer 1: **Sila the fisherwoman** (honest) — wants: *Clearsight Philtre* — payment: fresh trout and a smoked eel

Story:
> "My eyes are going the way of my nets — full of holes. **[FACT `s3-fog`]** Fog's been thick as wool every morning this week**, and yesterday I missed the channel markers clean and nearly holed the boat on the weir. But here's something for your master: **[FACT `s3-stranger`]** at dawn I saw a stranger rowing my spare coracle toward the quarry. Fine gloves. City boots.** Didn't even ask to borrow it. Cheek."

Follow-ups:
- Q: **"What did the stranger look like?"** → A: "Slight. Quick. **[FACT `s3-whistle`]** Whistled while he rowed — cheerful as a kettle.**" *(the whistler again: `h2-fenn` + `f2-whistle` + `f2-tune`)*
- Q: **"How long have your eyes troubled you?"** → A: "Since midsummer. Squinting at fog-lines will do it. My gran went the same way, except she blamed the eel."

`correctPotions: [clearsight]`

Resolutions:
- **correct:** "Sila reads the channel markers from her own doorstep. She also reports that every fish she catches today appears to be grey, as does the sky, the eel, and her cat. It wears off by supper. **Grimoire updated: Clearsight Philtre → side effect: Grey-eye.** (+2)" *(sets `clearsightKnown`)*
- **wrong:** "{Potion wrong-line.} The markers stay lost in the fog. She docks your eel privileges. (−1)"
- **turnedAway:** "Sila squints her way out, insulting a coat-rack she takes for a customer."

#### Customer 2: **Bram the town guard** (honest) — wants: *Wideawake Brew* — payment: a gold half-crown and the gratitude of the watch

Story:
> "Captain's posted me on Quarry Lane tonight, midnight to dawn — **[FACT `g3-watch`]** if that midnight digger shows again, I'll have him.** One problem: I've been on days all week and this morning I fell asleep *in my porridge*. Face first. Sergeant has the bowl-print sketched for the mess wall. **[FACT `g3-boots`]** One more thing — there were fresh boot prints by the chandler's window. Small, narrow, city-made.** *(matches `s3-stranger`)* Keep me awake tonight and I'll do the rest."

Follow-ups:
- Q: **"Ready for a long night, then?"** → A: "Born ready. Briefly asleep, but born ready."
- Q: **"What do you make of the chandler theft?"** → A: "**[FACT `g3-maps`]** Who steals *maps*? Someone who doesn't know the ground.** A local wouldn't need them."

`correctPotions: [wideawake]`, `townBonusPotion: wideawake`

Resolutions:
- **correct:** "Bram spends the night vibrating gently at his post — jitters — but *awake*. At half past two he arrests a slight, quick man climbing out of the quarry with the Quarrymaster's purse, a storm-lantern, and a truly hurt expression. The purse, by town law, funds the mill's repair. Flour by Friday. (+2, and +1 town bonus)"
- **wrong:** "{Potion wrong-line.} At midnight, Bram is asleep on his feet like a horse. Whatever happens on Quarry Lane tonight, he dreams through it. (−1)"
- **turnedAway:** "Bram salutes, marches out, and walks into the doorframe. It does not bode well for midnight."

#### Customer 3: **"Master Quill," traveling scholar** (LIAR — Cricket, shaved and re-costumed; `liarPenalty: -3`) — wants: *Clearsight Philtre* — payment: "gold sovereigns — proper ones" *(they are real this time)*

Story:
> "Master Quill, of the Antiquarian Guild at Dunhollow. The Guild has dispatched me to survey the old quarry's stone carvings before time claims them. **⚠ LIE [FACT `q3-bridge`] I arrived this very morning across the north bridge, straight from the Guildhall.** *(contradicts `f1-bridge`, Day 1: the north bridge has been washed out since spring — requires the Notes panel or a good memory)* Alas, my letters of introduction were soaked through when a cart splashed me. The gallery below is dark and my eyes are poor, and I am told your Clearsight Philtre *shows what hides*. Hidden inscriptions, you understand."

*(Staging note, displayed as narration when the player enters this conversation: "While he waits, the scholar whistles a cheerful shepherd's tune. His coat shows fresh stitching where a row of buttons used to be." — ties `f2-tune`, `s3-whistle`, and Day 1's tin buttons.)*

Follow-ups:
- Q: **"The north bridge, you say?"** → A: "A handsome crossing. **[FACT `q3-rails`]** Sturdy oak rails, freshly tarred.**" *(pure invention; doubling down)*
- Q: **"What carvings interest the Guild?"** → A: "Ah — burial markers. Treasure— *that is to say,* treatises. Treatises of the old masons. A slip of the tongue."

`correctPotions: []`

Resolutions:
- **liarServed:** "You hand over the philtre. By lantern-light and sharpened sight, 'Master Quill' finds the Quarrymaster's hoard in the dry gallery within the hour and is gone downriver by dawn — with the purse that, by town law, would have repaired the mill. The town eats porridge indefinitely. His sovereigns, at least, were real; it does not help how you feel. (−3)"
- **denounced:** "'The north bridge washed out in the spring storm. Fenn told me so two days ago — he drove his flock the long way round.' The scholar's accent falls off like a false moustache. Bram is fetched; under Quill's coat are the chandler's maps and a storm-lantern. The Quarrymaster's purse stays lost a little longer — but the town keeps it. Marta bakes you a victory loaf on credit. (+1)"
- **turnedAway:** "Master Quill bows very politely and leaves whistling. You have a bad feeling about the quarry tonight."

---

### A.4 — Endings (Final Evaluation texts)

- **9–10, "The Master's Seal":** "Bellows reads your ledger twice, which for him is weeping openly. 'Acceptable,' he says, and stamps your journeyman papers so hard the cauldron rings."
- **6–8, "A Promising Apprentice":** "'You served the deserving, mostly, and poisoned no one prominent.' He grunts. From Bellows, this is a parade."
- **3–5, "Back to Scrubbing Cauldrons":** "'The shop is standing. The town is standing. My reputation has a limp.' You may try again next season."
- **1–2, "The Customers Ask for Bellows Now":** "The bell above the door has developed a flinch."
- **≤0, "Sent Home in Disgrace":** "Bellows arrives by fast cart, reads the ledger once, and points wordlessly at the road. The tavern renames a drink after your mistakes."

### A.5 — Wrong-potion comedy lines (one per potion; used in `{Potion wrong-line}`)

- `salve`: "The Salve soothes skin that was never the problem. Glossy, though."
- `wideawake`: "The Wideawake Brew grants boundless energy and shaking hands to someone who needed neither."
- `moonpetal`: "The Moonpetal Draught drops them into twelve hours of sleep they hadn't budgeted for.{If side effect unknown: ' The next day they are alarmingly, compulsively honest. **Grimoire updated: Moonpetal Draught → side effect: Moon-tongue.**'}"
- `emberroot`: "The Emberroot Tonic grants the strength of an ox and, it emerges, the temper of one.{If side effect unknown: ' **Grimoire updated: Emberroot Tonic → side effect: Ember-temper.**'}"
- `clearsight`: "The Clearsight Philtre reveals every cobweb in your shop to the customer, and then turns their world grey until supper.{If side effect unknown: ' **Grimoire updated: Clearsight Philtre → side effect: Grey-eye.**'}"

*(Wrong-potion serves also trigger the side-effect reveal, so experimenting is always informative — by design.)*

### A.6 — Deduction answer key (for `?debug=1` and testing; never shown in normal play)

| Day | Liar | The lie | Contradicted by | Distance |
|---|---|---|---|---|
| 1 | Cricket | Bought Marta's fresh bread at dawn; moonlit road | Brief `b1-mill` + Marta `m1-noflour`; Brief `b1-moon` | Same day (two lies) |
| 2 | Doran | Buying fresh-cut stone from "the quarrymen" | Brief `b2-quarry` (quarry abandoned 2 years); Fenn `f1-gallery` | Same-day brief |
| 3 | "Quill" | Arrived this morning over the north bridge | Fenn `f1-bridge` (**Day 1**: bridge washed out) | Cross-day — needs Notes |

Red-herring management: Hazel's Day 2 accusation of Fenn is a *muddle*, not a lie (brief `b2-hazel` pre-arms the player); the whistler thread (`h2-fenn` → `f2-whistle` → `f2-tune` → `s3-whistle` → Quill's staging note) is the connective tissue that makes Day 3's reveal feel earned rather than gotcha.
