# The Perfect Cup — Game Design Document

> Source idea: [Game Idea 30 - The perfect cup of coffee (Theme: Precursor or The perfect cup of coffee)](/game-idea-30-the-perfect-cup-of-coffee-theme-precursor)

## 1. Title & one-liner

**Working title:** The Perfect Cup

**Alternates:** Precursor: Coffee · Uncaring God of Coffee · Burnt Beans in Water · Speedrun to Espresso

**One-sentence description:** An incremental/clicker game in which you, an uncaring god with a singular caffeine obsession, speed-run early humanity toward the invention of coffee — and civilization happens by accident.

**Genre:** Incremental / idle / clicker (text-forward, in the lineage of *A Dark Room* and *Universal Paperclips*).

**Elevator pitch:** You are not here to help the humans out of the mud. They are a tool to obtain the perfect cup of coffee. Click to inspire curiosity, then spend the resulting Insight on a tech tree where every single node exists only because it is on the critical path to coffee: fire because it heats water, farming because beans need soil, sailing because the right climate exists somewhere else. The humans, meanwhile, keep wasting your hard-earned Insight on junk like Singing and Poetry, keep begging to just drink tea (it's easier), and keep splintering your bean religion into relaxed heresies you must squash. Mid-game, they finally brew coffee — and it's terrible, basically burnt beans in water, triggering the Great Tea Rebellion. The final act is refining the process until, at last, the cup is perfect. Civilization is merely the collateral damage of your caffeine obsession.

⚑ (overridable) Working title chosen as "The Perfect Cup" over "Precursor" because it states the goal on the splash screen with zero explanation needed.

## 2. Fun hypothesis

**The single question this prototype answers:** Is it fun to steer an incremental economy toward one absurdly specific goal *while the simulation actively leaks resources toward its own goals* — i.e., does the friction of disobedient humans (junk purchases, tea petitions, heresies) make a clicker funnier and more engaging rather than merely annoying?

**Playtest questions (ask after a full run):**

1. Did you laugh, or at least smirk, at any event line? Which one do you remember?
2. When the humans bought a junk skill with your Insight, did it feel funny-frustrating (good) or unfair-frustrating (bad)?
3. Did you understand why you were suppressing tea, and did the Great Tea Rebellion land as a payoff?
4. Was there a stretch where you were just waiting with nothing to decide? Where?
5. Did discovering coffee mid-game (and it being terrible) feel like a twist or an anticlimax?

## 3. Design pillars

These are binding — any scope cut must preserve all five (carried verbatim in spirit from the source idea):

1. **Absurd Specificity.** Everything exists for coffee. Every coffee-path tech node's description justifies itself only in terms of coffee. No node is "good for humanity."
2. **Humans act in their own interests; you force them toward yours.** The sim autonomously spends a share of income on junk skills unless nudged. It is unnatural to speed-run humanity toward coffee, and the game must feel like pushing against that.
3. **A real coffee tech tree.** Inventing coffee from first principles must feel like a long, legible causal chain (fire → boiled water → … → espresso).
4. **A junk tech tree.** A parallel tree of well-rounded-society skills the humans *want* and keep buying, which do not advance coffee.
5. **Comedy through friction.** Tea petitions, splintering religions, strikes, and deadpan event-log jokes. The pushback *is* the content.

## 4. Core game loop

**Session length target:** one full run in **10–14 minutes** at default tuning. ⚑ (overridable — this exceeds the 2–10 minute prototype guidance; the incremental genre needs a discovery arc. All pacing is driven by two config keys, `coffeeNodeMult` and `baseInsightPerSec`, so it can be compressed to ~6 minutes by raising `coffeeNodeMult` to 1.8.)

**Phases of the loop (repeats every ~20–40 seconds through most of the game):**

1. **INSPIRE** — Player clicks the Inspire button (or holds Space). Sees the Insight counter tick up and a flavor line occasionally. Feels: direct agency, godly poking.
2. **ACCUMULATE** — Insight accrues automatically; 25% leaks into the humans' hidden Whimsy fund. Sees: rate display, Whimsy meter creeping. Feels: mild dread — they're going to buy something stupid.
3. **SPEND** — Player buys the next coffee-path node. Sees: node unlocks, rate jumps, deadpan event line ("Congratulations. You invented farming. Still no coffee."). Feels: progress + punchline.
4. **INTERFERE** — Humans act: they buy a junk node, file a tea petition, or spawn a heresy. Player Nudges (reclaims Whimsy), denies/allows tea, squashes heresy. Sees: event cards with buttons; Resentment meter reacting. Feels: whack-a-mole comedy, cost-benefit tension (crushing their dreams raises Resentment).
5. **ESCALATE** — Era advances (The Mud → The Search → The Bean → The Refinement). At end of Act III: **First Brew** — coffee is discovered and it is terrible; the Great Tea Rebellion fires. Act IV converts the loop into quality-chasing until The Perfect Cup.

```
        +----------> INSPIRE (click) ------------+
        |                                        v
   INTERFERE <--- humans act on          ACCUMULATE insight
   (nudge/deny/     their own                (25% leaks
    squash)             ^                    to Whimsy)
        ^               |                        |
        |               +---- SPEND on tech <----+
        |                     (coffee path)
        +----------- ESCALATE: era up, events, First Brew,
                     Tea Rebellion, Refinement, WIN
```

## 5. Inputs & controls

Touch-viable: **yes, fully.** The entire game is buttons and meters; a clicker degrades to touch perfectly. Same UI serves both.

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Left-click **Inspire** button / **Space** (tap or hold; hold auto-clicks at 8/s) | Tap Inspire button (multi-tap ok) | Generate `clickInsight` Insight |
| Left-click a tech node / tap | Tap tech node | Buy node if affordable (coffee tree only; junk tree is bought by humans, not you) |
| Left-click **Nudge** / **N** | Tap Nudge | Reclaim Whimsy fund into Insight (+Resentment, cooldown) |
| Left-click event-card buttons | Tap event-card buttons | Resolve petitions/heresies/rebellion (Deny / Allow / Squash / Quell) |
| **M** / click 🔇 icon | Tap 🔇 icon | Mute/unmute all audio |
| **P** / click ⏸ icon | Tap ⏸ icon | Pause simulation (overlay says PAUSED) |
| **R** / click Restart (end screens + pause overlay) | Tap Restart | Full restart (confirm dialog in-run) |
| Mouse hover on node | Long-press node | Tooltip: cost, effect, flavor text |

No other inputs exist. Scroll wheel scrolls the event log and tech tree panels natively.

## 6. Game elements

All rendering is DOM text/CSS — there is no canvas, no sprites. "Looks like" below describes DOM styling.

### 6.1 The Player (Uncaring God)

Not embodied. The player *is* the UI: Inspire button, Nudge button, and event-card decisions. Placeholder & final art: none needed.

### 6.2 The Humans (the simulation)

- **Looks like:** a one-line status strip under the HUD: population icon 👥 + current era name + current mood word (Content / Grumbling / Seething / ON STRIKE), colored by Resentment band.
- **Behavior:** generate `baseInsightPerSec × multipliers` Insight per second once Curiosity is bought. Divert `whimsyRate` (25%) of all passive income into the **Whimsy fund**. Whenever the Whimsy fund ≥ price of the cheapest unbought junk node, they buy it after `junkHesitation` seconds (announced in the log; Resentment −10, they're pleased). Population is cosmetic flavor only (grows with era, displayed, affects nothing). ⚑ (overridable: population as pure flavor keeps the sim to one real currency.)
- **Config keys:** `baseInsightPerSec`, `whimsyRate`, `junkHesitation`.
- **Interactions:** source of all income; target of Nudge; originator of petitions, heresies, strikes, rebellion.

### 6.3 Insight (primary currency)

- **Looks like:** big numeric counter, top-left, with `/s` rate under it. Formatted with K/M suffixes above 10,000.
- **Behavior:** earned by clicks and passive rate; spent by the player on coffee nodes and Quell; drained at 25% into Whimsy.
- **Config keys:** `clickInsightMin`, `clickInsightRateFactor` (click = `max(clickInsightMin, rate × clickInsightRateFactor)` so clicking stays relevant all game).

### 6.4 Whimsy fund (the humans' pocket money)

- **Looks like:** small meter labeled "Their savings…" with a shifty-eyes 👀 icon; shows amount and the junk node they're saving for ("They are saving up for: Poetry").
- **Behavior:** fills from the 25% income leak. Emptied (converted 100% back to Insight) by **Nudge**; spent by humans on junk nodes.
- **Config keys:** `whimsyRate`, `nudgeCooldownSec`, `nudgeResentment`.
- **Interactions:** Nudge → +`nudgeResentment` (8) Resentment; junk purchase → −10 Resentment.

### 6.5 Resentment meter (0–100)

- **Looks like:** horizontal bar, cream→red gradient fill, labeled "Resentment", top-right of HUD.
- **Behavior:** decays `resentDecayPerSec` (0.2/s). Raised by Nudge (+8), Deny tea (+10), Squash heresy (+3). Lowered when humans complete a junk purchase (−10) or player Allows tea (−20). At 100: **Strike** — passive rate ×0.5 for `strikeDurationSec` (30 s), log line fires, then Resentment resets to 40. Clicking still works during a strike (you inspire them personally, the lazy ingrates).
- **Config keys:** `resentDecayPerSec`, `strikeDurationSec`, `strikeRateMult`, `resentAfterStrike`, plus the deltas above (`nudgeResentment`, `denyTeaResentment`, `squashResentment`, `junkJoyRelief`, `allowTeaRelief`).

### 6.6 Coffee tech tree (the point of everything)

- **Looks like:** vertical list in the right panel, tab "☕ THE PATH". Locked nodes greyed with cost; affordable nodes glow amber; bought nodes get a ✓ and stay visible (the chain of progress is the trophy wall). Only the next 3 unbought nodes are visible ahead (fog of progress).
- **Behavior:** strictly linear — each node requires the previous one. Buying multiplies passive rate by the node's `mult` and fires its event line. Act IV nodes also add Cup Quality.
- **Data:** the full node table below **is the content spec**; it lives in one data file (`data.js`). Costs are in Insight. Default `mult` is `coffeeNodeMult` = 1.6 unless overridden.

| # | Act | Node | Cost | Effect | Event line on purchase (verbatim into log) |
|---|---|---|---|---|---|
| 1 | I – The Mud | **Curiosity** | 10 clicks (not Insight) | Unlocks passive income at `baseInsightPerSec` = 0.5/s | "The humans look up from the mud. One of them pokes a rock. It begins." |
| 2 | I | **Fire** | 25 | ×1.6 rate | "Fire. Because it heats water. No other reason. Do not let them get ideas about warmth." |
| 3 | I | **Boiled Water** | 60 | ×1.6 | "They boiled water and drank it plain. They called it 'soup of nothing'. Patience." |
| 4 | I | **Foraging** | 100 | ×1.6 | "They now gather berries. Red ones. Keep an eye on the red ones." |
| 5 | I | **Pottery** | 180 | ×1.6 | "They made four hundred cups. They have nothing to put in them. They do not ask why. Good." |
| 6 | I | **Agriculture** | 300 | ×1.6 | "Congratulations. You invented farming. Still no coffee." |
| 7 | II – The Search | **Irrigation** | 500 | ×1.6 | "Water now goes where the beans will someday be. The humans think it is for wheat. Let them." |
| 8 | II | **Goat Husbandry** | 800 | ×1.6 | "A goat ate red berries and danced all night. The herder took notes. Promote that herder." |
| 9 | II | **Writing** | 1,200 | ×1.6 | "Their first written word is 'bean'. Their second is 'no'. This will matter later." |
| 10 | II | **The Order of the Bean** | 1,800 | ×1.5 and unlocks Heresy events | "You start a religion. Its single commandment: the bean is coming. Attendance is mandatory." |
| 11 | II | **Trade Routes** | 2,600 | ×1.6 | "They now trade pots for other pots. Economics. A necessary evil on the road to the bean." |
| 12 | II | **Sailing** | 4,000 | ×1.6 | "The right climate exists somewhere else. Build the boats. Ignore the drowning." |
| 13 | III – The Bean | **The Highlands Expedition** | 6,000 | ×1.6 | "Found: a shrub. Red berries. The goats are dancing again. This is the place." |
| 14 | III | **Bean Cultivation** | 8,500 | ×1.6 | "They planted the sacred shrub in rows. They still don't know why. Faith is a beautiful thing." |
| 15 | III | **Drying** | 12,000 | ×1.6 | "Beans, but flat and sad. The elders call this progress. For once, the elders are right." |
| 16 | III | **Roasting** | 17,000 | ×1.6 | "A drying hut burned down. It smelled incredible. Burn down more huts. Carefully." |
| 17 | III | **Grinding** | 21,000 | ×1.6 | "Mortar, pestle, and a suspicious brown powder. The priests weep. They don't know why either." |
| 18 | III | **FIRST BREW** | 25,000 | ×1.6, sets Cup Quality = 5, triggers **Great Tea Rebellion** | "They did it. Hot bean water. It is terrible. It's basically burnt beans in water. Even the humans don't understand why they have been mythologizing this magic bean for all known history." |
| 19 | IV – The Refinement | **Water Temperature** | 35,000 | ×1.6, +10 Quality | "'Not boiling. Just below.' A monk said that, then was promoted to Pope of Coffee." |
| 20 | IV | **Grind Consistency** | 50,000 | ×1.6, +10 Quality | "Uniform particles. The humans invented standards, but only for this. Bridges may vary." |
| 21 | IV | **Roast Profiles** | 70,000 | ×1.6, +15 Quality | "Light, medium, dark. Three whole words of nuance. Civilization peaks." |
| 22 | IV | **Filtration** | 95,000 | ×1.6, +15 Quality | "No more chewing the coffee. A wet cloth changes everything. History will remember the cloth." |
| 23 | IV | **Bean Washing & Selection** | 130,000 | ×1.6, +15 Quality | "Only the good beans now. The bad beans are given to people you dislike." |
| 24 | IV | **The Sacred Ratio** | 180,000 | ×1.6, +15 Quality | "Sixteen parts water, one part coffee, zero parts tea. Carve it into the mountain." |
| 25 | IV | **Espresso** | 250,000 | ×1.6, +15 Quality | "They discovered espresso before they domesticated a cat. But somehow… they invented espresso." |
| 26 | IV | **THE PERFECT CUP** | 350,000 (requires Quality = 100) | **WIN** | "Silence. Steam. A sip. …There it is. That's it. That's the one. You may now allow bread." |

Quality math: 5 (First Brew) + 10+10+15+15+15+15+15 = 100 exactly when node 25 is bought; node 26 then becomes purchasable.

### 6.7 Junk tech tree (Human Whimsy)

- **Looks like:** second tab in the right panel, "🎭 THEIR NONSENSE". Player **cannot** buy these; the panel exists so the player can see what's being wasted and what they're saving for. Bought junk nodes show ✓ and a resigned god-comment.
- **Behavior:** humans buy the cheapest unbought affordable node from their Whimsy fund. Each bought junk node multiplies passive rate ×`junkNodeMult` (1.03) — a well-rounded society is *slightly* more insightful, which keeps junk purchases funny rather than fatal. ⚑ (overridable: pure-waste junk is truer to the bit but playtests as unfair; 3% keeps the "fine, I *guess* singing helps morale" tone.)
- **Special cases:** **Bread** is petitioned, not auto-bought (see 6.9). **Cats** only appears in the list after Espresso is bought.

| # | Junk node | Cost | God-comment in log when humans buy it |
|---|---|---|---|
| J1 | Singing | 40 | "They bought Singing. Humanity doesn't need 'singing' skill to make coffee, damnit." |
| J2 | Cave Painting | 90 | "They painted a hand on a wall. It is not holding a cup. Waste." |
| J3 | Dance | 150 | "The goats dance because of the berries. The humans dance because of nothing. Nothing!" |
| J4 | Jewelry | 250 | "Shiny rocks on strings. You could have had Irrigation weeks ago." |
| J5 | Poetry | 400 | "Their first poem has nine verses about the moon and zero about beans. Burn it. (They made copies.)" |
| J6 | Sport | 650 | "They invented a league for throwing rocks. Attendance exceeds bean-church. Concerning." |
| J7 | Theatre | 1,000 | "Their first play is about a god who makes people do pointless things. Unsubtle. Two stars." |
| J8 | Philosophy | 1,500 | "One of them asked 'why coffee?' out loud. Have that one watched." |
| J9 | Astronomy | 2,200 | "They mapped the stars. None of the stars are coffee. Refunds are unavailable." |
| J10 | Sculpture | 3,200 | "A ten-foot marble goat. Admittedly on-theme. Still a waste." |
| J11 | Board Games | 4,500 | "They invented a game about resource management. The irony is lost on them." |
| J12 | Fashion | 6,500 | "Hats. They spent your Insight on hats. The beans do not care about hats." |
| J13 | Bread *(petition-gated)* | 9,000 | If allowed: "Fine. FINE. Bread. Are you happy? The bakery is downwind of the roastery, so partially yes." |
| J14 | Cats *(appears after Espresso)* | 300,000 | "They finally domesticated a cat. It knocked a full cup off a table within the hour. This is why we waited." |

### 6.8 Heresies (whack-a-mole events, unlocked by The Order of the Bean)

- **Looks like:** event card sliding into the event column, parchment-styled, red seal icon, 20-second radial timer, one button: **SQUASH**.
- **Behavior:** every `heresyIntervalSec` = 75 ± 30 s after node 10, a heresy spawns. If squashed within 20 s: +3 Resentment, snarky log line. If it expires: heresy becomes *entrenched* — passive rate ×0.75 until squashed (the button remains). Max 2 concurrent heresies. Heresy text cycles through the list in 6.10 (H-lines).
- **Config keys:** `heresyIntervalSec`, `heresyIntervalJitter`, `heresyTimerSec`, `heresyRateMult`, `heresyMaxConcurrent`, `squashResentment`.

### 6.9 Tea petitions & the Great Tea Rebellion

- **Tea petition:** every `teaIntervalSec` = 90 ± 30 s (from Boiled Water until First Brew), an event card: *"The humans ask, beg, plead: can they just drink tea? It's easier."* Buttons: **DENY** (+10 Resentment; log: a T-line from 6.10) or **ALLOW A TEA BREAK** (passive income pauses `teaBreakSec` = 15 s, −20 Resentment; log: "They sip tea in the fields, giggling. Disgusting. Morale is up. Disgusting.").
- **Bread petition:** fires once when the Whimsy fund first reaches 9,000: *"The humans would like to invent bread."* **DENY** (+10 Resentment; log: "They have 5,000 words to describe coffee, but none for bread. The word for rain is 'weak coffee from the sky'.") or **ALLOW** (they buy J13). Denied petitions re-fire every 180 s.
- **Great Tea Rebellion (scripted, once):** fires immediately when FIRST BREW is bought. Full-width alarm card: *"THE GREAT TEA REBELLION — They tasted the coffee. It was burnt beans in water. They have seized the kettles and declared for tea."* Passive rate ×`rebellionRateMult` (0.25). One button: **QUELL (10,000 Insight)**. A countdown of `rebellionTimeoutSec` = 180 s runs; if it hits zero unquelled → **LOSE** (see §7). Clicking Inspire still works, so a broke player can click their way to 10,000. On quell: log line "The rebellion is over. You promised them the coffee would get better. For once, you weren't lying." and Act IV begins.
- **Config keys:** `teaIntervalSec`, `teaIntervalJitter`, `teaBreakSec`, `allowTeaRelief`, `denyTeaResentment`, `rebellionRateMult`, `rebellionQuellCost`, `rebellionTimeoutSec`, `breadPetitionRefireSec`.

### 6.10 Event log & joke lines

- **Looks like:** center column, newest at top, monospace, ~40 visible lines, older lines fade. This is the primary comedy delivery organ.
- **Behavior:** every purchase, petition, heresy, strike, and era change writes a line. Additionally, an **ambient joke** fires every `ambientJokeSec` = 45 ± 15 s from the pools below (no repeats until pool exhausted).

**Ambient pool A (pre-First-Brew):**
- A1. "They don't know what coffee is."
- A2. "They barely know what fire is." *(only before Fire is bought; after, swaps to A2b: "They know what fire is now. Barely.")*
- A3. "But somehow… they will invent espresso."
- A4. "A child asked what all this is for. The priests said 'the bean'. The child asked what a bean is. The priests wept."
- A5. "Somewhere, a shrub in the highlands grows unnoticed. Not for long."
- A6. "They invented a word for 'the feeling of wanting something warm and bitter you cannot name'. It has four syllables. It is your fault."
- A7. "The humans are thriving. Irrelevant, but noted."

**Ambient pool B (post-First-Brew):**
- B1. "They have 5,000 words to describe coffee, but none for bread. The word for rain is 'weak coffee from the sky'."
- B2. "Their word for morning translates literally as 'the gap before coffee'."
- B3. "A poet described the current brew as 'punishment soup'. The poet is not wrong. Yet."
- B4. "Grandmothers now bless children by pressing a warm cup to their foreheads. The cup is empty. Baby steps."
- B5. "They still don't have a word for bread. They have nineteen for 'crema'."

**Heresy pool (H-lines, used as heresy card text):**
- H1. "A splinter sect preaches 'coffee, but with tea mixed in'. Dangerous thoughts. Squash it."
- H2. "A new cult believes the beans contain the spirits of their dead loved ones and shouldn't be ground down and drank. Sentimental. Squash it."
- H3. "The Church of the Lukewarm holds that any water temperature is fine. Any! Squash it."
- H4. "Reform Beanism now allows worship from home, in pajamas, with cocoa. Squash it."
- H5. "The Decaffeinationists have removed 'the point' from the doctrine. Squash it hard."
- H6. "A prophet claims the perfect cup is 'inside us all along'. It is not. It is in the highlands. Squash it."

**Tea-denial pool (T-lines, logged on DENY):**
- T1. "You deny them tea. Their sighs are audible from orbit."
- T2. "Tea is easier, they say. Easier is for other civilizations."
- T3. "A tea leaf was found in the temple. The investigation is ongoing."

**Strike line:** S1. "GENERAL STRIKE. The humans sit in the fields doing 'self-care'. Inspire them by hand, O uncaring one."

**Junk-save line (when Whimsy target changes):** W1. "They are saving up for: {node}. You could Nudge. You know you could Nudge."

(Total authored lines including purchase/god-comments above: 60+; the ≥15 requirement is met several times over, with all six source jokes reused verbatim: farming line at node 6, A1, A2, A3, B1, espresso at node 25, plus the burnt-beans and rebellion lines at node 18 and heresies H1/H2.)

### 6.11 Cup Quality meter (Act IV only)

- **Looks like:** a cup outline (CSS shapes) that fills from muddy brown (#4A3020) to rich caramel (#C08A3E) with a numeric 0–100; appears in HUD after First Brew with a taste descriptor per band: 0–19 "Punishment Soup", 20–39 "Regret, Warm", 40–59 "Acceptable Mud", 60–79 "Almost Something", 80–99 "Dangerously Close", 100 "…Perfect".
- **Behavior:** purely derived from Act IV nodes bought; no decay.

## 7. Rules, win & lose conditions

**Win:** buy node 26, THE PERFECT CUP (cost 350,000 Insight, requires Cup Quality = 100). End screen: "THE PERFECT CUP — humanity took {elapsed time} and invented {junkCount} unnecessary art forms along the way." Stats shown: total time, total clicks, Insight generated (lifetime), junk nodes the humans bought, heresies squashed, tea breaks allowed, whether bread was ever permitted ("Bread status: DENIED" is the funnier outcome and shown in bold). Restart button.

**Lose (only one way):** the Great Tea Rebellion countdown (180 s) expires unquelled. End screen: "THEY CHOSE TEA. — Somewhere, a kettle whistles smugly. The bean is forgotten. Heresy complete." Stats + Restart. There is no other fail state; strikes and heresies are setbacks, not deaths.

**Round end:** both end screens stop the sim, offer Restart (fresh state) — no meta-progression, no save-carryover.

**Edge cases (decided):**
- Timer expires mid-action: rebellion quell click is checked against the countdown at click time; a click in the same frame the timer hits 0 counts as a quell (player-favorable).
- Two events simultaneous: event cards stack vertically, newest on top; max 3 cards visible, others queue (petitions queue; heresy timers do NOT start until their card is visible).
- Strike during rebellion: Resentment effects still accrue, but a strike cannot trigger while the rebellion card is up (rebellion supersedes; queued strike is discarded).
- Nudge while Whimsy = 0: button disabled (greyed) rather than wasted cooldown.
- Affording node 26 before Quality 100: impossible by construction (node 25 grants the last +15 and is a prerequisite), but the requirement is still checked and the node shows "Requires Quality 100".
- Pause: freezes all timers including heresy/rebellion countdowns (pause is not a strategy exploit worth defending in a prototype).
- Tab in background: sim uses accumulated real delta-time, capped at `maxOfflineSec` = 60 s of catch-up per resume, applied instantly with no events fired during catch-up.
- `localStorage` autosave every 10 s (key `perfectcup_save_v1`) so a refresh resumes; Restart clears it.

**Scoring:** elapsed time is the score (lower is better); shown on win screen as "Speedrun: MM:SS". No other scoring.

## 8. Difficulty & progression

Single tuned difficulty. The run's arc supplies progression:

- **Act I (≈0–2 min):** pure clicker; first automation; humans docile. Teaches Inspire → Spend.
- **Act II (≈2–5 min):** Whimsy leaks start hurting; tea petitions and (after node 10) heresies arrive; Nudge/Resentment tension becomes the game.
- **Act III (≈5–8 min):** big-ticket nodes; player is juggling 2–3 event cards; anticipation of coffee.
- **First Brew spike (≈8 min):** the rebellion is the difficulty peak — a deliberate one-time crisis.
- **Act IV (≈8–13 min):** power fantasy of refinement; income snowballs; events thin out (`heresyIntervalSec` ×2 after quell); ends on the win.

Challenge knobs are all in §12 — no dynamic difficulty. Idle viability: the game *does* play itself (humans keep buying junk; income keeps flowing) but reaches coffee roughly 2× slower unattended, by design ("the game will play itself, gaining skills in junk directions, if you don't nudge it").

## 9. Style & theme

- **Visual style:** text-first, DOM/CSS only, in the austere lineage of *A Dark Room* — but warm, not cold: parchment-on-espresso instead of white-on-black. Flat panels, 1px borders, no images, no icon fonts (emoji glyphs only: ☕ 👥 👀 🔇 ⏸).
- **Palette (6 colors):**
  - `#14100C` background (over-roasted espresso)
  - `#241A12` panels (dark roast)
  - `#EFE6D5` primary text (steamed cream)
  - `#C08A3E` accent / affordable / progress (caramel)
  - `#6FA36A` tea & heresy threat color (treacherous matcha)
  - `#B5432F` rebellion / strike / resentment-high (burnt red)
- **Typography:** monospace stack `ui-monospace, "Cascadia Mono", "Courier New", monospace`; 16px body, 13px log, 28px Insight counter. Event lines in italics when spoken by the god-narrator.
- **Tone/mood:** deadpan, imperial, faintly exhausted omnipotence. The narrator never uses exclamation points except when furious about junk purchases.
- **Reference points:** *A Dark Room*'s sparse dread meets *Universal Paperclips*' escalating absurdity, narrated by the sarcastic god of *Reus* by way of Terry Pratchett footnotes.
- **Placeholder art plan (M0–M1):** unstyled buttons, plain text, default font, zero CSS beyond three-column layout. The palette/typography above is entirely an M2 pass.

## 10. Sound design

Implementation: **Web Audio API, all synthesized in code (jsfxr-style oscillator envelopes), zero audio assets.** A single `audio.js` module with `sfx(name)`; a `AudioContext` created lazily on first user gesture (browser autoplay policy). Mute toggle is P0, persists in `localStorage`.

| Game event | Sound description | Priority |
|---|---|---|
| Inspire click | short soft tick, 1200 Hz sine, 30 ms, slight random pitch ±10% | P0 |
| Coffee node purchased | warm two-note rising chime (E4→A4 triangle, 180 ms) | P0 |
| Humans buy junk | descending three-note "womp" (sawtooth A3→F3→D3, 350 ms) | P0 |
| Event card appears (petition/heresy) | single parchment "pop" (filtered noise burst, 80 ms) | P0 |
| Heresy squashed | dull rubber-stamp thud (60 Hz sine + noise, 120 ms) | P0 |
| Rebellion starts | alarm: two-tone square-wave siren, 3 repeats, low volume | P0 |
| Win (Perfect Cup) | slow 5-note pentatonic arpeggio + white-noise "steam" fade (2 s) | P0 |
| Strike starts | crowd grumble (brown noise swell, 500 ms) | P1 |
| Nudge | coin-slide shimmer (fast noise sweep up) | P1 |
| Era change | low gong (sine 110 Hz, long decay) | P1 |

Music: **none.** ⚑ (overridable) Silence with sparse SFX fits the austere tone; a generative ambient drone is listed as P2 and cut by default.

## 11. UI & screens

**Screen flow:** Splash → Game → (Win | Lose) → Game (restart) …with a Pause overlay available in Game.

**Splash screen (mandatory):**
- Title: **THE PERFECT CUP** with ☕; one-liner: "Speed-run humanity's progress toward coffee."
- Rules in 5 bullets: (1) Click **Inspire** to generate Insight. (2) Spend Insight on the Path — every node leads to coffee. (3) The humans will waste your Insight on nonsense — **Nudge** to reclaim it. (4) Deny tea. Squash heresy. Mind their Resentment. (5) Coffee arrives mid-game. It will be terrible. Finish the job.
- Controls line: "Mouse/tap everything · Space = Inspire · N = Nudge · M = mute · P = pause · R = restart".
- Version number bottom-right, from the single `VERSION = "0.1.0"` constant in `data.js` (splash, HUD footer, and debug overlay all read it).
- One obvious button: **[ BEGIN ]**. If a save exists: **[ CONTINUE ]** + smaller **[ start over ]**.

**Game screen — three columns (stack vertically <700px wide):**
- **Left (actions):** Insight counter + rate, Inspire button (large), Nudge button + cooldown ring, Whimsy meter ("They are saving up for: X"), Resentment bar, humans status strip, Cup Quality cup (Act IV).
- **Center (events):** stacked event cards (max 3) above the scrolling event log.
- **Right (trees):** tabs ☕ THE PATH / 🎭 THEIR NONSENSE.
- **HUD footer:** era name, elapsed time, 🔇 ⏸ icons, `v0.1.0`.

**Pause overlay:** dim + "PAUSED", Resume / Restart / Mute buttons.

**Win/Lose screens:** as specced in §7 — result line, stats block, big Restart, version.

## 12. Config & tuning

Everything tunable lives in one exported object `CONFIG` in `data.js` (tech tree node/junk/joke tables live beside it in the same file).

| Key | Default | Unit | Affects |
|---|---|---|---|
| `curiosityClicks` | 10 | clicks | Clicks to unlock passive income (node 1) |
| `baseInsightPerSec` | 0.5 | insight/s | Passive income base after Curiosity |
| `coffeeNodeMult` | 1.6 | × | Default rate multiplier per coffee node |
| `junkNodeMult` | 1.03 | × | Rate multiplier per junk node |
| `religionMult` | 1.5 | × | Node 10's multiplier (overrides default) |
| `clickInsightMin` | 1 | insight | Floor for a single Inspire click |
| `clickInsightRateFactor` | 1.5 | s of rate | Click value = max(min, rate × factor) |
| `holdClicksPerSec` | 8 | clicks/s | Auto-click rate while Space held |
| `whimsyRate` | 0.25 | fraction | Share of passive income leaked to Whimsy |
| `junkHesitation` | 4 | s | Delay between affording and buying junk |
| `nudgeCooldownSec` | 10 | s | Nudge cooldown |
| `nudgeResentment` | 8 | pts | Resentment per Nudge |
| `resentDecayPerSec` | 0.2 | pts/s | Resentment passive decay |
| `denyTeaResentment` | 10 | pts | Resentment per tea denial |
| `squashResentment` | 3 | pts | Resentment per heresy squash |
| `junkJoyRelief` | 10 | pts | Resentment drop when junk bought |
| `allowTeaRelief` | 20 | pts | Resentment drop on tea break |
| `strikeThreshold` | 100 | pts | Resentment level that triggers strike |
| `strikeDurationSec` | 30 | s | Strike length |
| `strikeRateMult` | 0.5 | × | Passive rate during strike |
| `resentAfterStrike` | 40 | pts | Resentment reset value post-strike |
| `teaIntervalSec` | 90 | s | Mean time between tea petitions |
| `teaIntervalJitter` | 30 | ± s | Tea petition jitter |
| `teaBreakSec` | 15 | s | Income pause when tea allowed |
| `heresyIntervalSec` | 75 | s | Mean time between heresies (×2 in Act IV) |
| `heresyIntervalJitter` | 30 | ± s | Heresy jitter |
| `heresyTimerSec` | 20 | s | Time to squash before entrenchment |
| `heresyRateMult` | 0.75 | × | Rate penalty per entrenched heresy |
| `heresyMaxConcurrent` | 2 | count | Max live heresies |
| `rebellionRateMult` | 0.25 | × | Rate during Great Tea Rebellion |
| `rebellionQuellCost` | 10000 | insight | Cost to end the rebellion |
| `rebellionTimeoutSec` | 180 | s | Unquelled rebellion → lose |
| `breadPetitionRefireSec` | 180 | s | Re-ask interval after bread denial |
| `ambientJokeSec` | 45 | s | Mean time between ambient log jokes |
| `ambientJokeJitter` | 15 | ± s | Ambient joke jitter |
| `maxOfflineSec` | 60 | s | Max catch-up applied on tab resume |
| `autosaveSec` | 10 | s | localStorage save interval |
| `eventCardMax` | 3 | count | Visible event cards before queueing |

**URL flags (all P0-M3):**
- `?seed=12345` — seeds the RNG (mulberry32) for reproducible jitter/joke order.
- `?debug=1` — debug overlay: FPS, current rate, Whimsy, Resentment, era, event queue; cheat keys: `I` +10,000 Insight, `Q` set Quality 100, `T` trigger next event now, `F` ×10 game speed toggle.
- `?skip=brew` — start with nodes 1–17 bought and 25,000 Insight (jump straight to First Brew for testing the rebellion and Act IV).
- `?fast=1` — shorthand for `coffeeNodeMult=1.8` + `baseInsightPerSec=1` (≈6-minute run for quick playtests).

## 13. Tech stack

**Zero-build vanilla JavaScript (ES modules) + DOM/CSS. No canvas, no frameworks, no bundler.** One `index.html` plus five modules (`data.js`, `sim.js`, `events.js`, `ui.js`, `audio.js`), deployable by copying the folder into any static host — including directly into this site's `public/games/perfect-coffee/` directory, which is exactly where it will live. Justification: the game is text, buttons, and meters at ~1 update/100 ms; DOM is the natural renderer, a build step buys nothing, and zero-build removes every deployment failure mode. `sim.js` is pure (no DOM imports, `tick(state, dtSeconds, rng)` in/out) so it runs headless under Node for unit tests. No runtime network calls; all content is in `data.js`; audio is synthesized. Performance is trivial (≤3 event cards, ≤40 log lines in DOM, one interval timer) — 60 fps is idle work; log lines beyond 40 are removed from the DOM, not hidden.

## 14. Milestones

**M0 — Toy loop.** *Goal: prove that nudge-vs-whimsy friction is fun with zero dressing.*
Deliverables: unstyled page with Inspire button, Insight counter, first 8 coffee nodes as plain buttons, Whimsy leak + auto junk-buying of first 5 junk nodes (plain log lines), Nudge button, Resentment number with strike.
Acceptance criteria:
- [ ] A first-time player understands "click, buy, and stop the humans wasting money" within 60 seconds unprompted.
- [ ] Playing attentively reaches node 8 measurably faster (≥25%) than leaving the game idle for the same duration.
- [ ] The humans buy at least 2 junk nodes in the first 3 minutes and each purchase is visible in the log.
- [ ] Sim runs headless: a Node test script advances `tick()` 10 simulated minutes and asserts Insight totals within expected bounds.
*Proves: the core friction loop. If watching humans waste your Insight is not at least wryly amusing here, stop — jokes won't save it.*

**M1 — Real rules.** *Goal: full P0 ruleset and a completable game.*
Deliverables: all 26 coffee nodes + all 14 junk nodes, tea petitions, Order of the Bean + heresy whack-a-mole, bread petition, First Brew → Great Tea Rebellion → quell/lose, Cup Quality, win/lose screens with stats, splash screen (rules, controls, version), pause/restart, localStorage autosave.
Acceptance criteria:
- [ ] A run is winnable in 10–14 minutes at default config and losable by ignoring the rebellion.
- [ ] Every purchase and event writes its authored line to the log; no placeholder text remains.
- [ ] Splash shows title, 5 rule bullets, controls, version from the single constant, and one BEGIN button.
- [ ] Refreshing mid-run resumes within 1 s of prior state.
*Proves: the full arc — especially that terrible-coffee-then-refinement lands as a story.*

**M2 — Feel.** *Goal: tone.*
Deliverables: full palette/typography pass (§9), event-card styling with timers, meter animations (Resentment color bands, cup fill), all P0 SFX + mute persistence, number formatting, log fade, subtle screen shake (±3 px, 200 ms) on strike and rebellion.
Acceptance criteria:
- [ ] All P0 SFX fire on their events; audio starts only after first user gesture; mute persists across reloads.
- [ ] The game is playable and legible on a 375 px-wide touch screen (columns stack, buttons ≥44 px).
- [ ] No frame drops with 3 event cards + full log on a mid-range laptop (DevTools perf: main thread <10% busy).
*Proves: the deadpan-god tone is carried by presentation, not just text.*

**M3 — Playtest build.** *Goal: shippable test artifact.*
Deliverables: `?seed`, `?debug=1`, `?skip=brew`, `?fast=1` all working; deployed as static files at `/games/perfect-coffee/`; P1 items if time allows (strike/nudge/era SFX, junk-save W1 line, taste descriptors).
Acceptance criteria:
- [ ] Two runs with the same `?seed` and identical inputs produce identical event order.
- [ ] `?skip=brew` reaches the rebellion within 5 seconds of load.
- [ ] Game loads and runs from static hosting with zero network requests after initial file fetch (verified in DevTools Network tab).
- [ ] Three external playtests completed; §2 questions answered and recorded.
*Proves: the prototype can answer the fun hypothesis with real players.*

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is `whimsyRate` 0.25 the right leak? Too low and the humans feel toothless; too high and it reads as a tax, not a personality. Knob: `whimsyRate`.
2. **(non-blocking — resolve in playtest)** Should junk nodes give +3% each or nothing? Knob: `junkNodeMult` (set 1.0 to test pure waste).
3. **(non-blocking — resolve in playtest)** Rebellion tuning: is 10,000 / 180 s a tense-but-fair crisis, or does a prepared player trivialize it? Knobs: `rebellionQuellCost`, `rebellionTimeoutSec`.
4. **(non-blocking — resolve in playtest)** 10–14 min run length vs. attention span; `?fast=1` exists specifically to A/B a 6-minute tuning.
5. **(non-blocking — resolve in playtest)** Does the heresy whack-a-mole read as comedy or chore after the 5th squash? Knob: `heresyIntervalSec`; content fix: more H-lines.
6. **(blocking for P2 only)** Whether a second currency (Devotion, earned by squashing, spent on quells) deepens Act II–III. Deliberately excluded from P0/P1 — one currency keeps the prototype honest. Do not build unless playtests say the mid-game lacks decisions.

## 16. Handoff notes for Fable

- **Build order:** `data.js` (CONFIG + node/junk/line tables) → `sim.js` (pure tick: income, whimsy, junk-buys, resentment, timers) → headless Node test of a scripted 10-minute run → `events.js` (petition/heresy/rebellion state machines, RNG-seeded) → `ui.js` (render loop @10 Hz, DOM diffing by dirty flags is unnecessary — just rewrite text nodes) → splash/win/lose screens → `audio.js` last.
- **Keep headless-testable:** `sim.js` and `events.js` must not touch `document`/`window`. All randomness flows through one injected mulberry32 RNG. `tick(state, dt, rng) → state` lets tests assert: time-to-node-N at default config, idle-vs-attentive delta (M0 criterion), quality = 100 exactly after node 25.
- **File layout (source = deployable, zero build):**
  ```
  public/games/perfect-coffee/
    design.md        (this document)
    index.html
    style.css
    src/data.js      (VERSION, CONFIG, coffee tree, junk tree, all joke lines)
    src/sim.js       (pure simulation)
    src/events.js    (pure event state machines)
    src/ui.js        (DOM rendering + input)
    src/audio.js     (Web Audio synth)
    test/sim.test.mjs (node --test, imports sim.js/events.js only)
  ```
- **All strings live in `data.js`.** The jokes are the product; keep them in one reviewable table, never inline in UI code.
- **Prove the loop with rectangles first.** M0 is unstyled buttons and a `<pre>` log. If reclaiming Whimsy from humans who just bought Poetry isn't amusing in that form, stop — do not proceed to M2.
- **Ship every milestone runnable.** Each milestone ends with the folder copy-deployable and a playable (if partial) game; never leave `index.html` broken at a commit boundary.
- **Version discipline:** bump the single `VERSION` constant every milestone (0.1.0 → 0.2.0 → 0.3.0 → 0.4.0); splash, HUD footer, and debug overlay must all read it.
