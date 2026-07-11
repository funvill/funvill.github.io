# SMALL WORDS — Game Design Document

> Source idea: [Game Idea 10 - Thing explain guess - Web game (Theme: The Fablebound Five)](/game-idea-10-thing-explain-guess-theme-the-fablebound-five)

---

## 1. Title & one-liner

**Working title:** SMALL WORDS ⚑ (overridable)

**Alternates:** Five Hundred Words, Ten Hundred, Thing Explain Guess, Say It Simple, Big Thing Small Talk

**One-liner:** Explain big complicated things using only the most common words in English — then guess what other explanations are describing, from as few revealed words as possible.

**Genre:** Word / party / puzzle game, browser-based, single-player with local pass-and-play.

**Elevator pitch:** A nuclear power plant is "a big building where they break very small pieces of stuff to make heat." SMALL WORDS is an Up Goer Five game in two halves. In **Write mode** you're handed a complex object — a hydroelectric dam, the circulatory system, a search engine — and must describe it using only the 1,000 most common English words; anything fancier gets underlined in red like a spelling mistake and blocks your submission, and shorter valid descriptions score more stars. In **Guess mode** the game deals you pre-written simple-words descriptions and reveals them a few words at a time; the earlier you name the thing, the more points you keep. Pass-and-play glues the halves together: you write, your friend guesses, and you both score off how guessable-yet-short your writing was.

**Adaptation note (per autonomous mode):** The source idea depends on a shared online pool of player-submitted descriptions, which the static-hosting constraint forbids. This prototype adapts it three ways: (a) a solo **Write mode** where the fun is the vocabulary constraint itself plus a letter-count "golf" score; (b) a solo **Guess mode** that draws from a **shipped pack of pre-authored descriptions** instead of a live pool; (c) a local **pass-and-play** mode (P1) where one player writes and hands the device to a guesser, recreating the writer/guesser point economy from the original idea on one machine. No server, no accounts, no submissions leave the browser. ⚑ (overridable)

---

## 2. Fun hypothesis

**The question this prototype answers:** *Is the two-sided loop — sweating a description down to only common words, and racing to identify an object from a slowly-revealed simple-words description — fun enough that players immediately want "one more"?*

Sub-hypotheses P0 must test:
- Writing: does the red-underline constraint feel like a delightful puzzle (finding "life water" for blood) rather than a chore?
- Guessing: does the pay-per-reveal mechanic create a satisfying push-your-luck moment ("I think I know… do I buy 8 more words?")?

**Playtest questions (ask after one full session of each mode):**
1. In Write mode, did hitting an underlined word make you smile and rephrase, or sigh and quit?
2. Did you ever guess early on a hunch because reveals cost points — or did you always reveal everything? (If always: the cost knob is wrong.)
3. Was any correct answer rejected that you felt should have counted (alias problem)?
4. After a round ended, did you start another without being prompted?
5. (Pass-and-play) Did the writer feel rewarded when their friend guessed it fast?

---

## 3. Design pillars

1. **The constraint is the comedy.** Everything funny and clever in this game comes from being forced to say "sky boat" instead of "airplane." Protect the live red-underline feedback and never soften the word list mid-round.
2. **Every reveal is a decision.** Guessing must always cost-benefit: more words = more certainty = fewer points. No free information.
3. **Instant text, zero friction.** This is a typing game. Input latency, checker lag, or fussy answer matching kills it. The checker runs in under 5 ms; answer matching is generous with typos and aliases.
4. **Static and self-contained.** All content ships in two JSON files. No network at runtime, ever.

---

## 4. Core game loop

Session target: one round = 3–6 minutes. Guess mode round = 5 descriptions (~45 s each). Write mode round = 3 objects (~90 s each).

### Guess mode loop (per description)

```
 ┌────────────────────────────────────────────────────┐
 │  DEAL      Game shows first 8 words of a           │
 │            description + category hint.            │
 │            Score meter starts at 100.              │
 │      ↓                                             │
 │  PONDER    Player reads, feels the itch of a       │
 │            half-formed answer.                     │
 │      ↓                                             │
 │  CHOOSE ──── "Show more" (−10 pts, +8 words) ──┐   │
 │      │                                         │   │
 │      │←────────────────────────────────────────┘   │
 │      ↓                                             │
 │  GUESS     Types an answer, Enter.                 │
 │      ├─ wrong (−15 pts, max 3 wrong) → PONDER      │
 │      └─ right → REVEAL: full text shown, points    │
 │                 banked, next description           │
 └────────────────────────────────────────────────────┘
```

**What the player feels:** DEAL = curiosity; PONDER/CHOOSE = push-your-luck tension; GUESS = triumph or a cheap sting; REVEAL = "ohhh, *life water*, of course."

### Write mode loop (per object)

```
 ASSIGN → game names a target object ("Hydroelectric Dam")
   ↓
 DRAFT  → player types; illegal words get red underlines live;
          letter counter ticks against PAR
   ↓
 POLISH → player swaps fancy words for small ones, trims fat
   ↓
 SUBMIT → blocked until 0 illegal words and ≥ 10 words;
          stars awarded vs PAR → next object
```

**What the player feels:** ASSIGN = "oh no, how do I even…"; DRAFT = flow; POLISH = clever satisfaction; SUBMIT = golf-score pride.

### Pass-and-play loop (P1)

WRITE (player A, player B looks away) → HANDOFF screen ("Give the device to the guesser") → GUESS (player B, standard guess loop on A's text) → both score → swap roles.

---

## 5. Inputs & controls

Touch-viable: **yes** — the entire game is text fields and buttons; it works on mobile with the native on-screen keyboard. Desktop is primary.

| Input (desktop) | Context | Action |
|---|---|---|
| Type + `Enter` | Guess input focused | Submit guess |
| Type | Write textarea focused | Compose description (live checking) |
| `Ctrl+Enter` | Write textarea focused | Submit description (if valid) |
| Click **Show more** button (or `+` key when guess input is empty) | Guess mode | Reveal next 8 words (costs points) |
| Click **Give up** button | Guess mode | Forfeit description (0 pts), see answer |
| Click **Submit** button | Write mode | Same as Ctrl+Enter |
| `Esc` | Any screen | Open pause menu (Resume / Restart / Mute / Quit to splash) |
| `M` | Any screen, no text field focused | Toggle mute |
| `R` | Pause menu or end screen | Restart round |
| Mouse click | Menus | Activate buttons |

| Input (touch) | Context | Action |
|---|---|---|
| Tap input field → OS keyboard | Guess / Write | Type text |
| Tap **Go** on OS keyboard | Guess input | Submit guess |
| Tap **Show more** / **Submit** / **Give up** buttons | In game | Same as desktop buttons |
| Tap ⏸ icon (top-right) | Any screen | Pause menu |
| Tap 🔇 icon (top-right) | Any screen | Toggle mute |

No other inputs exist. There are no real-time timers in P0, so "pause" simply overlays the menu.

---

## 6. Game elements

This is a text game; elements are data + UI objects, not sprites.

### 6.1 The Word List (the antagonist)
- **Is:** `data/words.json` — an array of the top **1,000** most frequent English words, lowercase base forms, ranked by frequency.
- **Source (build-time, not runtime):** the `google-10000-english-usa-no-swears.txt` list (public-domain frequency data from the Google Trillion Word Corpus, via the `first20hours/google-10000-english` GitHub repo). A one-off Node script `tools/build-words.mjs` takes the top entries, removes single letters (except `a`, `i`), removes web junk (`www`, `http`, `com`, `org`, `edu`, `htm`, `html`, `php`, `los`, `las`, `del`, `un`, `der`, `le`, `di`, `da`, `en`, `il`), and emits the first 1,000 survivors as JSON. The JSON is committed; the script never runs in the browser. ⚑ (list source overridable)
- **Behavior:** the checker (6.2) treats the first `CONFIG.vocabSize` entries as legal. Default `vocabSize = 1000` ("ten hundred," Up Goer Five pedigree). `?five=1` sets it to 500 for the thematic hard mode. ⚑ (default size overridable)
- **Config keys:** `vocabSize`.

### 6.2 The Checker (pure module, headless-testable)
- **Is:** `js/checker.js`, a pure function `check(text, wordSet) → { tokens: [{word, start, end, legal}], illegalCount, letterCount }`.
- **Behavior — a token is LEGAL if any of these holds:**
  1. Its lowercase form is in the word set.
  2. Stripping one inflection suffix yields a set word: `-s`, `-es`, `-ed`, `-d`, `-ing`, `-er`, `-est`, `-ly`; also try un-doubling a final doubled consonant before `-ed/-ing/-er/-est` (`running → run`) and restoring a dropped `e` (`making → make`, `maker → make`).
  3. Stripping a contraction tail (`'s`, `n't`, `'re`, `'ll`, `'ve`, `'m`, `'d`) yields a set word.
  4. It is purely digits (`3`, `100`).
  5. Hyphenated tokens: every part must pass independently.
- Tokenization: split on anything that is not `[a-zA-Z0-9'-]`. Punctuation is ignored and never counts as letters.
- `letterCount` = count of `[a-zA-Z]` characters only (digits, spaces, punctuation free — this is the golf score).
- Runs synchronously; word set is a JS `Set` built once at load. Budget: < 5 ms for a 200-word text.
- **Config keys:** none beyond `vocabSize`.

### 6.3 Target Objects (the secrets)
- **Is:** entries in `data/pack.json`. Each: `{ id, name, aliases[], category, difficulty (1–3), parLetters }`.
- **Placeholder look:** name rendered as large text on a card. **Final look:** same, plus category icon (emoji).
- The shipped pack contains the **18 objects** below. `aliases` are the additional accepted answers (matching rules in §7).

| # | Name | Aliases (besides normalized name) | Category | Diff | parLetters |
|---|---|---|---|---|---|
| 1 | Nuclear Power Plant | nuclear plant, nuclear power station, nuclear reactor, atomic power plant | Buildings | 2 | 220 |
| 2 | Hydroelectric Dam | dam, hydro dam, water dam, hydroelectric power station | Buildings | 1 | 180 |
| 3 | Human Circulatory System | circulatory system, blood system, cardiovascular system, blood circulation | Body | 3 | 260 |
| 4 | Refrigerator | fridge, icebox | Home | 1 | 160 |
| 5 | The Internet | internet, world wide web, the web | Ideas | 2 | 220 |
| 6 | Volcano | — | Nature | 1 | 150 |
| 7 | Microwave Oven | microwave | Home | 2 | 180 |
| 8 | Escalator | moving staircase, moving stairs | Machines | 1 | 130 |
| 9 | Photosynthesis | — | Ideas | 3 | 240 |
| 10 | Submarine | sub, u-boat | Machines | 1 | 160 |
| 11 | Vaccine | vaccination, vaccine shot | Body | 2 | 200 |
| 12 | Credit Card | — | Ideas | 2 | 200 |
| 13 | Elevator | lift | Machines | 1 | 140 |
| 14 | Hot Air Balloon | balloon | Machines | 1 | 150 |
| 15 | Lightning | lightning bolt, lightning strike | Nature | 2 | 170 |
| 16 | Washing Machine | washer, clothes washer, laundry machine | Home | 1 | 160 |
| 17 | Search Engine | google, web search | Ideas | 3 | 220 |
| 18 | Airplane Black Box | black box, flight recorder, flight data recorder | Machines | 3 | 230 |

- **Config keys:** `parStar2Multiplier`.

### 6.4 The Description Pack (guess-mode content)
- **Is:** `data/pack.json` also holds `descriptions: [{ objectId, text }]`. Ship **at least 20 descriptions covering at least 15 distinct objects** (minimum one per object for the 18 above is the target; Fable authors the remainder in the style below and **must run every shipped description through the checker at `vocabSize=1000` at build time — zero illegal words allowed**).
- The 5 reference descriptions below ship in the pack. They are drafts: if the final generated word list rejects any word, Fable substitutes a passing synonym and keeps the meaning (this is expected and fine).

**Example 1 — Hydroelectric Dam:** "A very big wall built across a river. It holds back the water so a long lake forms behind it. When some water is let through, it falls a long way down and turns big wheels, and the turning wheels make power for the homes and lights of a city."

**Example 2 — Refrigerator:** "A tall box in your home that keeps food cold so it stays good to eat for many days. It works by moving heat from the inside of the box to the outside. There is a small light inside that turns on when you open the door."

**Example 3 — Escalator:** "Stairs that move by themselves. You stand still on one step and it carries you up or down to the next floor, so you do not have to walk at all. At the top, the steps turn flat and slide back down under the floor to start over again."

**Example 4 — Human Circulatory System:** "A set of soft little roads inside your body. A strong working part in the middle of you pushes red life water through these roads all day and all night, without ever stopping, to bring air and food to every small piece of you and to carry the bad stuff away."

**Example 5 — The Internet:** "Many computers all over the world joined together so they can talk to each other. When you ask for a page, small pieces of it travel through lines under the ground and through the air from far away, and they are put back together in front of you in less than a second."

- **Config keys:** `descriptionsPerRound`, `revealChunkWords`.

### 6.5 The Score Meter (guess mode)
- **Is:** a horizontal bar + number, top of the guess screen, showing the current banked value of the active description (starts at `startValue = 100`).
- **Behavior:** drops by `revealCost` on each reveal, `wrongGuessCost` on each wrong guess; floor 0. On correct guess the shown value is added to round score with a count-up animation (200 ms).
- **Placeholder:** plain `<div>` bar. **Final:** hand-drawn-style bar (see §9).
- **Config keys:** `startValue`, `revealCost`, `wrongGuessCost`, `maxWrongGuesses`.

### 6.6 The Underliner (write mode)
- **Is:** the live feedback layer in the write textarea. Implemented as the standard "backdrop mirror" technique: a `<div>` behind a transparent-text `<textarea>`, containing the same text with illegal tokens wrapped in `<mark class="illegal">` (red wavy underline via `text-decoration: red wavy underline`). Scroll positions synced.
- **Behavior:** re-checks on input, debounced `checkDebounceMs = 150`. Also updates the letter counter and the illegal-word count chip.
- **Config keys:** `checkDebounceMs`, `minWriteWords`.

### 6.7 Guess Input & Answer Matcher
- **Is:** a single-line text input + Guess button.
- **Matching (pure module `js/match.js`):** normalize both sides — lowercase, trim, strip punctuation, collapse spaces, drop a leading "a "/"an "/"the ". Accept if normalized guess equals the normalized name or any alias, OR is within Levenshtein distance of an accepted answer: distance ≤ 1 for answers of 4–7 letters, ≤ 2 for 8+ letters, exact match required for ≤ 3 letters.
- Empty submissions are ignored (no cost). Re-submitting an identical wrong guess does not deduct again (shake the input instead).

### 6.8 AI opponents / NPCs
None. ⚑ Cut from prototype: a fake "other players' guesses" ticker was considered and rejected — it tests nothing about the fun hypothesis.

---

## 7. Rules, win & lose conditions

### Guess mode (round = `descriptionsPerRound = 5` descriptions)
- Each description starts worth `startValue = 100` points; first `revealChunkWords = 8` words visible plus the object's **category** as a hint chip.
- **Show more:** reveals the next 8 words, costs 10. If fewer than 8 words remain, reveals the rest at the same cost. When the full text is visible the button disables (no further cost possible).
- **Wrong guess:** −15, input shakes, guess is logged in a "wrong guesses" list. `maxWrongGuesses = 3` wrong guesses ends the description at 0 points and reveals the answer + full text.
- **Correct guess:** bank current value (floor 0 — a correct guess never scores negative), show full text + answer card for 2.5 s (or until click/tap), advance.
- **Give up:** 0 points, reveal answer, advance.
- **Round end:** after 5 descriptions, show total (max 500), per-description breakdown, and rank: ≥ 400 "Word Wizard", 300–399 "Quick Head", 200–299 "Good Guesser", < 200 "Keep Trying". ⚑ (rank names overridable)
- **Description selection:** seeded shuffle of the pack, filtered to composition 2× diff-1, 2× diff-2, 1× diff-3 when available; no object repeats within a round; a session-scoped "seen" set (in-memory) avoids repeats until the pool is exhausted, then resets.

### Write mode (round = 3 objects: one each of difficulty 1, 2, 3)
- Player sees the object name + category. No time limit in P0.
- **Submit is blocked** (button disabled, reason shown) while: any illegal word remains, OR word count < `minWriteWords = 10`, OR the text contains the object's name or any alias word of 4+ letters (no "it is a dam" cheese — the checker flags these like illegal words, styled orange).
- **Scoring (golf):** `letterCount ≤ parLetters` → ★★★ (100 pts); `≤ parLetters × parStar2Multiplier (1.5)` → ★★ (60 pts); any valid submission → ★ (30 pts).
- **Skip:** allowed, scores 0 for that object.
- **Round end:** total stars/points, each submission shown with its letter count vs par. The player's texts are kept in `localStorage` (key `smallwords.written.v1`) and can be replayed in pass-and-play later; nothing is uploaded.

### Edge cases (decided)
- Guess submitted at the same moment as "Show more" click: input events are processed sequentially by the DOM; whichever fires first applies, no special handling.
- Description with ≤ 8 total words: fully visible from the start; "Show more" never appears.
- Guess matching an alias of a *different* pack object: it is simply wrong (−15). No partial credit.
- Paste into the write textarea: allowed, checked identically.
- `vocabSize=500` mode: shipped descriptions were validated at 1000 and may show illegal words if displayed in write mode; the flag affects **write mode and pass-and-play only** — guess-mode content always displays as authored.
- Refresh mid-round: round state is in-memory only and is lost; the game returns to splash. (Accepted for prototype.)

---

## 8. Difficulty & progression

Single tuned difficulty for the prototype; challenge shaping comes from data, not systems:

- **Within a guess round:** the 2/2/1 easy/medium/hard composition puts the hardest description last; the score meter makes later, harder items feel tenser without any rule changes.
- **Within write mode:** the three objects escalate difficulty 1 → 2 → 3; par tightness is the difficulty (pars in §6.3 are pre-tuned per object).
- **Across rounds:** none in P0. Knobs for playtesting instead: `vocabSize` (1000 → 500 is the big lever), `revealCost`, `wrongGuessCost`, `parStar2Multiplier`.
- **P1:** "Five Hundred mode" toggle on the splash (sets `vocabSize=500`, badge shown on end screen). **P2:** daily-seed mode (seed = date string) for shareable "same puzzle as you" play.

---

## 9. Style & theme

- **Visual style:** "technical manual re-drawn in crayon." Clean paper-white page, generous whitespace, hand-drawn-feeling borders (CSS `border-radius` with slight irregularity via `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px` — the classic wobbly-box trick), thick 2px ink outlines. Flat colors, zero gradients, zero photos. Everything is typography, boxes, and emoji icons.
- **Palette (6 colors):**
  - Paper `#F7F3E8` (background)
  - Ink `#232323` (text, borders)
  - Blueprint Blue `#2B6CB0` (buttons, links, category chips)
  - Alarm Red `#D64545` (illegal-word underline, wrong guess)
  - Go Green `#3E8E5A` (correct guess, valid submit)
  - Star Yellow `#F2C94C` (stars, score highlights)
- **Typography:** description and write text in `Georgia, 'Times New Roman', serif` at 1.35rem/1.6 (reads like a book page); UI labels, buttons, and score in `'Trebuchet MS', Verdana, sans-serif`; the score meter number in `'Courier New', monospace`. System fonts only — no font files, no network.
- **Tone/mood:** cheerful, dry, xkcd-adjacent. Microcopy uses only simple words itself ("You got it!", "That is not it.", "Too many hard words.").
- **Reference points:** xkcd *Thing Explainer*'s diagram-with-labels charm; Wordle's one-screen calm; the Up Goer Five text editor's red-underline tension.
- **Placeholder art plan (M0–M1):** default system font, unstyled buttons, plain divs, no colors beyond red underline and black text. The palette and wobbly boxes arrive only in M2.

---

## 10. Sound design

- **Implementation:** ZzFX (single ~1 KB function, embedded in `js/audio.js` — no asset files, no network) driven through Web Audio. All SFX are synthesized parameter sets. Audio context is created/resumed only on the first user gesture (the Play button click). Mute toggle is P0, persisted to `localStorage` (`smallwords.muted.v1`).
- **Music:** none for the prototype. ⚑ (A generative soft "library ambience" was considered and cut — this is a reading game; silence is a feature.)

| Game event | Sound description (ZzFX flavor) | Priority |
|---|---|---|
| Correct guess | Bright two-note rising chime | P0 |
| Wrong guess | Short dull thud, slight downward pitch | P0 |
| Show more (reveal) | Soft paper-flip whoosh | P0 |
| Illegal word appears while typing | Very quiet low blip (throttled to ≤ 1/s) | P0 |
| Valid submit (write mode) | Satisfying rubber-stamp thunk | P0 |
| Round end | Three-note fanfare, warmer with higher rank | P0 |
| Button click / menu | Tiny tick | P1 |
| Star awarded (each star on end screen) | Ascending ping per star | P1 |
| Give up | Descending sad slide | P1 |

---

## 11. UI & screens

**Flow:** `Splash → (Guess round | Write round | Pass-and-play) → End of round → (Play again → same mode) | (Menu → Splash)`. Pause overlay reachable from any in-game screen via Esc/⏸.

### Splash (mandatory)
- Title "SMALL WORDS", one-liner: "Explain big things using only small words."
- Rules in 5 bullets: (1) Guess mode: read a description made of only very common words. (2) Name the thing — early guesses keep more points. (3) "Show more" buys 8 more words but costs points; 3 wrong guesses ends it. (4) Write mode: describe a big thing using only the ten hundred most common words — hard words get a red line. (5) Fewer letters = more stars.
- Controls line: "Type your answer + Enter. Buttons do the rest. Works with touch."
- Three big mode buttons: **Guess** (primary), **Write**, **Pass & Play** (grayed "coming soon" until P1 ships).
- Version number bottom-right (e.g. `v0.1.0`) from the single `VERSION` constant in `js/config.js`; the debug overlay reads the same constant.
- Mute icon top-right.

### Guess screen (HUD always visible)
Top bar: round score (left) · description i/5 (center) · score meter for current description + wrong-guess pips ●●● (right) · ⏸ and 🔇 icons. Body: category chip, revealed text (unrevealed words rendered as ▁▁▁ blanks so total length is visible), **Show more (−10)** button, guess input + **Guess** button, **Give up** link, list of wrong guesses so far.

### Write screen (HUD always visible)
Top bar: object i/3 · target name + category card · letter counter `123 / par 180` (turns green at ≤ par, yellow ≤ 1.5×par) · illegal-words chip `2 hard words` · ⏸ 🔇. Body: the textarea with live underlines, **Submit** button (disabled with reason text), **Skip** link.

### End-of-round screen
Big total + rank (guess) or stars (write), per-item breakdown rows, **Play again** (same mode, new seed) and **Menu** buttons, version number.

### Pause overlay
Resume / Restart round / Mute / Quit to menu.

### Pass-and-play interstitial (P1)
Full-screen "Hand the device to the guesser — no peeking!" with a Ready button; shown between write and guess phases.

---

## 12. Config & tuning

Single exported object `CONFIG` in `js/config.js` (alongside `export const VERSION = "0.1.0"`).

| Key | Default | Unit | Affects |
|---|---|---|---|
| `vocabSize` | 1000 | words | How many top-ranked words are legal (checker) |
| `descriptionsPerRound` | 5 | count | Guess round length |
| `revealChunkWords` | 8 | words | Words shown initially and per reveal |
| `startValue` | 100 | points | Value of each description at start |
| `revealCost` | 10 | points | Cost of Show more |
| `wrongGuessCost` | 15 | points | Cost of a wrong guess |
| `maxWrongGuesses` | 3 | count | Wrong guesses before auto-fail |
| `writeObjectsPerRound` | 3 | count | Write round length |
| `minWriteWords` | 10 | words | Minimum words to submit |
| `parStar2Multiplier` | 1.5 | × | 2-star letter threshold vs par |
| `checkDebounceMs` | 150 | ms | Live checker debounce |
| `answerRevealMs` | 2500 | ms | Auto-advance delay after correct guess |
| `illegalBlipThrottleMs` | 1000 | ms | Min gap between illegal-word blips |
| `rankThresholds` | [400,300,200] | points | Guess-round rank cutoffs |
| `starPoints` | [100,60,30] | points | Points for 3/2/1 stars |

**URL flags:**
- `?seed=abc123` — seeds the RNG (mulberry32 over a string hash) for reproducible description order and object assignment. Default seed = `Date.now()`.
- `?debug=1` — debug overlay: FPS, current state name, active answer + aliases, seed, vocabSize; cheat keys `N` (skip/solve current item) and `]` (add 100 points).
- `?five=1` — sets `vocabSize=500` (Five Hundred hard mode).
- `?mode=guess|write` — skip splash straight into a round (playtest convenience).
- `?skip=1` — with `?mode=`, also auto-dismisses answer-reveal delays.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + semantic HTML + CSS. No framework, no canvas, no build step.** This is a typography-and-forms game: the DOM *is* the ideal renderer (native text input, IME, mobile keyboards, accessibility, text wrapping for free), and Canvas/Pixi/SVG would only add work. Zero-build: `index.html` loads `js/main.js` as a module; deploy = copy the folder to any static host. The only "tooling" is the one-off `tools/build-words.mjs` Node script that generates `data/words.json`, run by the developer and committed — never at runtime. Data loads via two `fetch()` calls to same-origin JSON files (static hosting, not network APIs). Audio = inlined ZzFX. Performance is trivially within budget (a few hundred DOM nodes, no per-frame loop except the score count-up tween via `requestAnimationFrame`); 60 fps is free on any laptop. Perf budget anyway: ≤ 500 DOM nodes, checker ≤ 5 ms per keystroke on 200-word text, zero layout thrash (underline backdrop updates via one `innerHTML` swap per debounce).

---

## 14. Milestones

### M0 — Toy loop (prove it with plain text)
**Goal:** both core loops playable, ugly.
**Deliverables:** checker module + tests; guess loop with 5 hardcoded descriptions (the §6.4 examples), reveal button, plain-text scoring; write loop with 1 object, live red underline, letter count.
**Proves:** the two fun hypotheses, before any content or style investment.
**Acceptance criteria:**
- [ ] `checker.js` and `match.js` run headless under `node --test` with ≥ 15 unit cases (inflections, contractions, hyphens, digits, typo matching).
- [ ] I can play a 5-description guess round start to finish and see a total score.
- [ ] Typing "electricity" in write mode underlines it within 200 ms; rephrasing clears it.
- [ ] A first-time player understands both loops within 60 seconds unprompted.
- [ ] **Fun gate:** at least one playtester voluntarily plays a second guess round. If not, stop and re-examine reveal costs before proceeding.

### M1 — Real rules
**Goal:** full P0 ruleset and shell.
**Deliverables:** full pack (18 objects, ≥ 20 validated descriptions); difficulty composition + seeded shuffle; wrong-guess pips, give up, name-in-text block, par stars; splash with rules/controls/version; pause; end-of-round screens; restart; `?seed`, `?mode`.
**Acceptance criteria:**
- [ ] Every shipped description passes the checker with 0 illegal words (automated test iterates the pack).
- [ ] Every object is guessable via at least its name and every listed alias, including 1-typo variants.
- [ ] Writing the object's own name in write mode blocks submission with a visible reason.
- [ ] Same `?seed` produces the identical round twice.
- [ ] Splash shows rules in ≤ 5 bullets and the version number.

### M2 — Feel
**Goal:** the crayon-manual art pass + P0 sound.
**Deliverables:** §9 palette/typography/wobbly boxes; reveal/score/star animations (CSS transitions + one rAF count-up); input shake on wrong guess; all P0 ZzFX sounds; mute persistence; touch layout check at 390 px width.
**Acceptance criteria:**
- [ ] No audio plays before the first user gesture; mute persists across reloads.
- [ ] All 6 palette colors and no others (± shades) appear in the UI.
- [ ] Playable end-to-end on a phone-sized viewport with the OS keyboard open.
- [ ] Wrong guess produces thud + shake within 100 ms of Enter.

### M3 — Playtest build
**Goal:** deployable, instrumented for playtesting; P1 if time allows.
**Deliverables:** `?debug=1` overlay + cheat keys, `?five=1`, `?skip=1`; deployed under `/games/thing-explain-guess/` on the static site; P1 features in priority order: (1) pass-and-play mode with handoff screen, (2) Five Hundred mode splash toggle, (3) P1 sounds, (4) localStorage best scores on splash.
**Acceptance criteria:**
- [ ] Game runs from the live static host with no console errors and zero non-same-origin requests (verify in devtools Network tab).
- [ ] `?debug=1&seed=test` shows the answer overlay and reproduces a fixed round.
- [ ] A full guess round completes in under 6 minutes with a new player.
- [ ] (If P1 done) Two people can complete a write→guess pass-and-play cycle without instructions from a third party.

---

## 15. Open questions

1. **Is `revealCost=10` vs `wrongGuessCost=15` the right tension?** (non-blocking — resolve in playtest; both are config keys.)
2. **Is top-1000 the right default, or is 500 funnier?** (non-blocking — `?five=1` exists precisely to A/B this.)
3. **Are the per-object `parLetters` values fair?** They are educated guesses. (non-blocking — pars live in `pack.json`; adjust after collecting playtest letter counts from the debug overlay.)
4. **Does the generated frequency list contain unusable junk tokens that survive filtering?** (blocking for M1 content authoring — Fable must eyeball the top 1,000 output of `build-words.mjs` and extend the filter list before authoring descriptions.)
5. **Should guess mode hide description length (no ▁▁▁ blanks)?** Length itself is a hint. (non-blocking — CSS toggle; ask playtesters question 2.)
6. **Is pass-and-play the real game?** If solo modes test weak but the writer/guesser economy tests strong, the follow-up prototype should lead with it. (non-blocking — answered by M3 playtests.)

---

## 16. Handoff notes for Fable

**Build order:** `tools/build-words.mjs` → `js/checker.js` + `js/match.js` + `js/rng.js` (all pure, with node tests) → guess-loop state machine (`js/game-guess.js`, headless) → write-loop state machine (`js/game-write.js`, headless) → DOM render layer (`js/ui/*.js`) → screens/menus → `js/audio.js` → M2 style pass → debug flags.

**Keep headless-testable:** `checker.js`, `match.js`, `rng.js`, and both game state machines must not touch `document`, `window`, or `fetch` — they take plain objects (word set, pack, config, seed) and expose `state` + action methods (`reveal()`, `guess(text)`, `submit(text)`), so `node --test` can assert the whole scoring math. The pack-validation test (every description passes the checker; every alias matches itself through `match.js`) is the content safety net — write it before authoring the remaining descriptions.

**Repo/file layout** (also the deployable output — zero-build, the folder *is* the dist):

```
public/games/thing-explain-guess/
  index.html          (all screens as hidden sections; loads js/main.js)
  design.md           (this document)
  css/style.css
  js/config.js        (VERSION + CONFIG — the only tuning surface)
  js/main.js          (boot, URL flags, screen router)
  js/checker.js       (pure)
  js/match.js         (pure)
  js/rng.js           (pure, mulberry32 + string hash)
  js/game-guess.js    (pure state machine)
  js/game-write.js    (pure state machine)
  js/audio.js         (ZzFX inlined + event map + mute)
  js/ui/guess.js  js/ui/write.js  js/ui/screens.js
  data/words.json     (generated, committed)
  data/pack.json      (18 objects + ≥20 validated descriptions)
  tools/build-words.mjs   (dev-only; documents its source URL in a comment)
  test/*.test.mjs     (node --test)
```

**Reminders:** prove both loops with unstyled text (M0) before any style work — if buying words doesn't feel tense in plain divs, crayon boxes won't fix it. Ship every milestone runnable. All shipped descriptions must pass the checker in CI/tests, not by hand. No runtime request may leave the origin — the Network tab check in M3 is non-negotiable.
