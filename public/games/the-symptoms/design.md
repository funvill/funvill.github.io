# Sick Note — Game Design Document

> Source idea: [Game Idea 18 - The symptoms (Theme: A mysterious illness)](/game-idea-18-the-symptoms-theme-a-mysterious-illness)

## 1. Title & one-liner

**Working title:** Sick Note

**Alternates:** The Symptoms, Waiting Room, Malingerers, Dr. Skeptic, Second Opinion

**One-sentence description:** You are the doctor: each round, four patients claim to have the same bizarre-sounding (but real) medical condition — read their descriptions and stamp a sick note on the one who actually has it.

**Genre:** Single-player deduction / bluff-spotting party game (Fibbage/Balderdash inverted).

**Adaptation choice (per static-hosting constraint):** The source idea is a Jackbox-style multi-phone bluffing game where human fakers write fake symptoms and one doctor judges. For a static, no-server prototype, the roles are flipped: **the player is always the Doctor**, and the fakers are pre-authored "AI patients" — each round presents one real medical description and three authored fakes, and the player must pick the real one. This preserves the fun hypothesis (the doctor's deduction moment — "which of these absurd things is actually real?") which is the judgeable, single-player half of the original loop. Pass-and-play human faking is scoped P1. ⚑ (overridable)

**Elevator pitch:** Real medicine is weirder than anything you could make up — there is a genetic condition whose official acronym is ACHOO, and a syndrome where your gut brews its own beer. *Sick Note* weaponizes that. You're a clinic doctor with a rubber stamp and a waiting room full of people who want a day off work. Every round, four patients claim the same strange condition. One of them genuinely has it; three are faking with descriptions engineered to sound just clinical enough. Stamp the right chart and the real patient gets care. Stamp a faker and they skip out the door waving your signature while the genuinely sick patient shuffles back to their desk job. Ten rounds, one reputation, and a rising suspicion that you'd fail your own physical.

## 2. Fun hypothesis

**The question this prototype answers:** *Is picking the one true medical description out of a lineup of plausible authored fakes genuinely fun for a solo player — does "truth is stranger than fiction" create enough real doubt, and is the reveal funny enough, to sustain 10 rounds?*

Everything in P0 serves this: the content deck (the fakes ARE the game), the pick-and-stamp interaction, and the reveal beat.

**Playtest questions:**

1. How many rounds did you genuinely hesitate before stamping (vs. knowing immediately)? Target: 6+ of 10.
2. Did any reveal make you laugh or say "no way that's real"? Which one?
3. Could you identify fakes by writing style rather than content? (If yes, the authoring voice is leaking — content bug.)
4. Did you want to play a second run immediately, knowing some answers repeat? (Tests replay ceiling / deck size.)
5. Did the timer add pressure or just annoyance?

## 3. Design pillars

1. **Truth is stranger than fiction.** Every real condition in the deck must be strange enough that a reasonable player doubts it. If the real answer is the boring one, the round is cut.
2. **Comedy through plausibility, not randomness.** Fakes are funny because they *almost* pass a med-school sniff test. No wacky-for-wacky's-sake entries.
3. **The reveal is the punchline.** Each round's payoff is the moment of truth — the reveal beat gets the animation, sound, and one-line fact budget before anything else does.
4. **Snap judgment under gentle pressure.** A soft timer keeps reads intuitive rather than analytical, but never panics the player.

## 4. Core game loop

Session target: one full run = 10 rounds ≈ **5–7 minutes**.

```
 ┌──────────────────────────────────────────────────────────┐
 │                                                          │
 │  INTAKE            EXAMINE              STAMP            │
 │  Chart slides in → Read 4 patient    → Select a card,    │
 │  showing the       descriptions        press STAMP       │
 │  condition name    (timer running)                       │
 │      │                                     │             │
 │      │                                     ▼             │
 │      │             NEXT PATIENT ◄──── REVEAL             │
 │      └──────────────(round++)         Real patient       │
 │                          ▲            highlighted,       │
 │                          │            score updates,     │
 │                          │            1-line true fact   │
 │                          └── after round 10 → DIAGNOSIS  │
 │                                               (results)  │
 └──────────────────────────────────────────────────────────┘
```

**Phase: Intake (~2 s).** A patient chart slides onto the desk showing the condition name in big type (e.g. "EXPLODING HEAD SYNDROME") plus round counter. Player feels: "that cannot be real."

**Phase: Examine (up to `roundTimerSec`).** Four patient cards are laid out, each with a name, an emoji face, and a first-person description of their "symptoms." A timer bar drains. Player does: reads, weighs, hovers/taps to select. Feels: doubt, amusement, mild pressure.

**Phase: Stamp (instant).** Player confirms their selected card with the STAMP button (or Enter). Input locks. Feels: commitment.

**Phase: Reveal (min `revealDurationSec`, player-advanced).** The real patient's card flips green with a SICK NOTE stamp graphic; fakers gray out. If the player stamped a faker, that faker's card shows a smug "THANKS DOC!" and the real patient's card shows "SENT BACK TO WORK." A one-line true fact about the real condition appears (from the deck's `fact` field). Score/streak animates. Player clicks NEXT PATIENT. Feels: vindication or delighted outrage.

**Phase: Diagnosis (end of run).** Results screen: score, correct count, rank title, per-round recap, restart. See section 11.

## 5. Inputs & controls

Touch-viable: **yes** — the entire game is tap-select-confirm on cards and buttons. Desktop keyboard is a convenience layer, not a requirement.

| Input (desktop) | Input (touch) | Action | Context |
|---|---|---|---|
| Mouse click on patient card | Tap card | Select that card (highlights; does not confirm) | Examine |
| `1` `2` `3` `4` | — | Select card 1–4 | Examine |
| Click STAMP button / `Enter` / `Space` | Tap STAMP | Confirm selection, lock input, go to Reveal | Examine (only when a card is selected) |
| Click NEXT / `Enter` / `Space` | Tap NEXT | Advance from Reveal to next Intake | Reveal |
| `M` / click 🔇 icon | Tap 🔇 icon | Toggle mute (persisted to `localStorage`) | Any screen |
| `P` / `Esc` / click ⏸ icon | Tap ⏸ icon | Pause: freezes timer, dims board, shows Resume/Restart/Quit-to-splash | Examine |
| `R` (on Pause or Diagnosis screen) | Tap RESTART button | Start a new run (reshuffled per seed) | Pause, Diagnosis |
| Click PLAY / `Enter` | Tap PLAY | Start run from splash | Splash |

No other inputs exist. Clicking a card during Reveal does nothing. Keyboard input during Pause other than the listed keys does nothing.

## 6. Game elements

### 6.1 Entities

| Element | Placeholder look (M0–M1) | Final look (M2) | Behavior | Config keys |
|---|---|---|---|---|
| **Chart header** | Plain text bar with condition name | Manila-folder tab with typewriter font, paper texture via CSS | Displays `symptom.name`, round `n/roundsPerRun` | `roundsPerRun` |
| **Patient card ×4** | Bordered rectangle: name + description text | Clipboard-styled card: emoji avatar, name, ruled-paper description | Click/tap to select (border highlight). Positions shuffled per round by seeded RNG. Exactly one carries the real description | `optionsPerRound`, `fakesSampled` |
| **Timer bar** | Thin horizontal div, width = time remaining | Same, styled as an IV drip bar; turns `alertRed` and pulses at `timerWarnSec` | Drains linearly over `roundTimerSec`; on expiry → auto-resolve as WRONG (no stamp given; treated as "patient walked out") ⚑ | `roundTimerSec`, `timerWarnSec`, `timerEnabled` |
| **STAMP button** | Gray button, enabled when a card is selected | Big round red rubber-stamp button | Confirms selection; disabled/dimmed until a card is selected | — |
| **Stamp graphic** | Green "REAL" / red "FAKE" text on cards | Rotated ink-stamp: "SICK NOTE ✓" (green) / "THANKS DOC!" (red, on picked faker) / "BACK TO WORK" (gray, on unpicked real) | Appears during Reveal with a thunk animation | `revealDurationSec` |
| **Score/streak HUD** | Text top-right | Same, with pop animation on change | `+pointsCorrect` per correct; `+streakBonus × (streak−1)` extra from 2nd consecutive correct | `pointsCorrect`, `streakBonus` |
| **Patient identities** | Name only | Name + emoji avatar | Cosmetic. Each round draws 4 distinct names from the name pool and 4 distinct face emoji; assignment is per-round random (seeded). Names never imply truth | — |

**Patient name pool (cosmetic, ≥16 entries):** Barb Aspirin, Doug Lozenge, Trish Gauze, Kevin Femur, Paula Placebo, Gary Gurney, Nadia Splint, Frank Fibula, Rita Reflux, Chad Chart, Wanda Ward, Miles Mucus, Greta Gout, Otto Ointment, Sally Suture, Vince Vitals. Face emoji pool: 😷 🤒 🤕 🥴 😮‍💨 🥱 😰 🫠 😵‍💫 🤢.

### 6.2 The Deck (P0 content — this IS the game)

Deck rules:

- Each entry: `id`, `name`, `difficulty` (1–3), `real` (genuine first-person description), `fakes[4]` (authored fakes, same first-person patient voice), `fact` (one-line true fact shown at Reveal).
- Per round the game shows the real description plus `fakesSampled` (3) of the 4 fakes, chosen by seeded RNG — so repeat runs vary.
- A run uses `roundsPerRun` (10) entries drawn from the 13 below: run order is difficulty-ascending buckets (all selected difficulty-1 entries first, then 2, then 3), shuffled within each bucket by seed. Which 3 entries sit out is also seed-determined.
- **Voice rule (critical):** real and fake descriptions must be indistinguishable in tone, length (2–3 sentences, 25–55 words), and formatting. Humor is allowed in BOTH real and fake entries. Never let capitalization, length, or joke-density become a tell.
- All content is played for comedy; a "for entertainment only, not medical advice" line appears on the splash screen.

---

**R01 — EXPLODING HEAD SYNDROME** (difficulty 1)

- **REAL:** "As I'm drifting off to sleep I hear a sudden, deafening bang — like a gunshot or a slammed door — but there's no real sound and no pain. It's over in a second and nobody else hears a thing."
- FAKE 1: "Whenever I sneeze I get a pressure spike behind my eyes so intense that my ears pop and I see flashes of light for a few minutes afterward."
- FAKE 2: "My migraines make my scalp swell. Twice now I've measured my hat size going up almost an inch during an attack. It goes back down by morning."
- FAKE 3: "Loud noises trigger a stabbing pain that starts at the crown of my head and shoots down my spine. Fireworks night puts me in bed for a full day."
- FAKE 4: "I get hiccups so violent they snap my head backwards. I've cracked two headrests in my car. My chiropractor has a payment plan named after me."
- *Fact:* Exploding Head Syndrome is a real, harmless sleep disorder — a loud imaginary bang at the edge of sleep.

**R02 — PICA** (difficulty 1)

- **REAL:** "I get overwhelming cravings to eat things that aren't food. I've gone through a box of chalk this week, and I keep a freezer drawer of ice just to crunch. I know it's not food. I crave it anyway."
- FAKE 1: "I can taste smells. Bakeries are fine, but the perfume counter at the mall makes me physically gag on flavors that aren't there."
- FAKE 2: "I've lost the ability to feel full. My stomach never sends the stop signal, so I have to eat on a timer like it's medication."
- FAKE 3: "Everything I eat tastes like the last thing I ate. I had garlic bread in March. Flavor-wise, it is still March."
- FAKE 4: "I sleepwalk to the kitchen and eat entire meals with zero memory of it. I only found out from the crumbs and a deeply confusing grocery bill."
- *Fact:* Pica — the craving to eat non-food items like chalk, dirt, and ice — is real and often linked to iron deficiency.

**R03 — PHOTIC SNEEZE REFLEX (ACHOO SYNDROME)** (difficulty 1)

- **REAL:** "Bright light makes me sneeze. Walking out of a matinee into full sun means three guaranteed sneezes, every time. It's genetic, it runs in my family, and it has an official acronym."
- FAKE 1: "I sneeze in total darkness. Something about my ears taking over navigation flips a switch in my sinuses. Movie theaters are a problem for everyone around me."
- FAKE 2: "My hiccups are triggered by sustained eye contact — ten seconds or more. Job interviews sound like a percussion performance."
- FAKE 3: "Sneezing makes me briefly deaf in my left ear. Full mute, about thirty seconds. I've missed the punchline of every joke told in allergy season."
- FAKE 4: "I can't sneeze at all — haven't managed one since 2019. The pressure just builds and my eyes water for an hour. My body lost the exhale button."
- *Fact:* The photic sneeze reflex is real, genetic, affects roughly 1 in 4 people — and is officially called Autosomal-dominant Compelling Helio-Ophthalmic Outburst: ACHOO.

**R04 — MISOPHONIA** (difficulty 1)

- **REAL:** "Certain small sounds — chewing, pen clicks, someone breathing through their nose — flip my brain from calm to fight-or-flight rage instantly. It's not annoyance. It's a fire alarm I can't unhear."
- FAKE 1: "Repetitive sounds put me to sleep. Not boredom — a full narcoleptic drop. My coworker's keyboard has knocked me out three times this week."
- FAKE 2: "I hear my own heartbeat at conversation volume, all day. The cardiologist says my heart is fine. My heart doesn't have to listen to itself."
- FAKE 3: "Certain voices give me an electric-shock feeling down both arms. So far it's only men named Dave. Three separate Daves. HR is aware."
- FAKE 4: "Background music makes me lose the ability to read — words just stop meaning things until the song ends. Grocery shopping takes me hours."
- *Fact:* Misophonia is a recognized condition where specific trigger sounds cause an instant, involuntary fight-or-flight response.

**R05 — AUTO-BREWERY SYNDROME** (difficulty 2)

- **REAL:** "I failed a breathalyzer without drinking anything. If I eat a big plate of pasta or bread, an hour later I'm dizzy and slurring — the yeast in my gut ferments carbs into actual alcohol."
- FAKE 1: "Anything carbonated makes my stomach swell up like a keg. The gas can't escape properly, so I burp foam. Weddings are humiliating."
- FAKE 2: "One beer gets me drunk for two full days. My liver enzymes are miswired, so alcohol just stays in my blood far longer than it should."
- FAKE 3: "My sweat smells exactly like beer even when I haven't touched a drop. It's a skin-yeast thing. My coworkers reported me to HR twice."
- FAKE 4: "I absorb alcohol through my skin. I can't use the hand sanitizer at work without technically going over the legal limit. I have a note. Nobody believes the note."
- *Fact:* Auto-Brewery Syndrome is real — gut yeast ferments carbohydrates into ethanol, and sufferers have genuinely failed breathalyzers sober.

**R06 — FOREIGN ACCENT SYNDROME** (difficulty 2)

- **REAL:** "After a head injury I woke up sounding vaguely French. I have never been to France. My mouth just puts the stresses in the wrong places now, and everyone I meet assumes I'm doing a bit."
- FAKE 1: "I involuntarily copy the accent of whoever I'm talking to within about thirty seconds. My boss is Scottish. He believes I'm mocking him. I am going to be fired."
- FAKE 2: "When I'm stressed I can only speak in questions? Everything comes out as a question? Even this? I'm told it's grating?"
- FAKE 3: "Since my surgery I can't start words with vowels — I have to put a little 'h' in front. It's hexhausting and my hemails are a mess."
- FAKE 4: "I lost volume control on my voice. I whisper when I mean to shout and SHOUT in libraries. There is no middle setting anymore."
- *Fact:* Foreign Accent Syndrome is real: after a stroke or head injury, altered speech rhythm can make a person sound convincingly foreign.

**R07 — ALICE IN WONDERLAND SYNDROME** (difficulty 2)

- **REAL:** "During an episode, my own hands look enormous and the far end of the room stretches away like a horror-film hallway. My eyes are fine — my brain just gets the sizes and distances wrong."
- FAKE 1: "For a few minutes after waking, I see everything mirror-flipped. I've learned to read backwards. Driving before coffee would be legally inadvisable."
- FAKE 2: "Colors drain out of my vision when I stand up too fast. The whole world goes black-and-white film noir for about a minute. My cat looks fantastic, honestly."
- FAKE 3: "Under fluorescent light my depth perception inverts — far things look close, close things look far. I have punched two doorframes reaching for coffee mugs."
- FAKE 4: "When I panic, I stop seeing moving objects — anything in motion just vanishes. Frisbee has become a game of pure faith."
- *Fact:* Alice in Wonderland Syndrome is real and often migraine-linked: episodes where body parts and objects seem wildly too big, too small, or too far away.

**R08 — TRIMETHYLAMINURIA (FISH ODOUR SYNDROME)** (difficulty 2)

- **REAL:** "My body can't break down a compound found in eggs, beans, and fish, so it comes out in my sweat and breath instead — smelling like rotting fish. Deodorant does nothing. Chemistry always wins."
- FAKE 1: "My sweat corrodes metal. I've gone through four watches this year. The dermatologist says my pH is 'off the chart' but refuses to say which end."
- FAKE 2: "Eating seafood makes my skin glow faintly under UV light — I hyper-absorb phosphorus. Airport security has a file on me."
- FAKE 3: "I've lost the ability to smell myself, specifically. Everything else comes through fine. I just have no idea if I'm the problem in the elevator, and the uncertainty is destroying me."
- FAKE 4: "My earwax smells like maple syrup. It sounds adorable until you learn it means my body is dumping sugar out of every port it can find."
- *Fact:* Trimethylaminuria is real — a faulty enzyme means trimethylamine from foods like eggs and fish exits via sweat and breath, smelling of rotten fish.

**R09 — GEOGRAPHIC TONGUE** (difficulty 2)

- **REAL:** "The surface of my tongue has smooth red patches with pale borders that look exactly like a map — and the map redraws itself every few weeks. It's harmless, but spicy food has become a geography lesson in pain."
- FAKE 1: "My tongue peels like a sunburn once a month, almost on schedule. Completely painless — it just sheds, like a snake. My dentist has stopped making eye contact."
- FAKE 2: "My taste buds run on a delay. I taste lunch at around 4 p.m. Salsa at dinner means a surprise at midnight."
- FAKE 3: "One side of my tongue is always exactly one degree colder than the other. I can't prove it matters. I also can't stop noticing."
- FAKE 4: "My tongue tans. If I talk a lot outdoors in summer, it comes back two shades darker. My dentist took a photo 'for a conference'."
- *Fact:* Geographic tongue is real (benign migratory glossitis): harmless map-like patches that literally move around the tongue over weeks.

**R10 — JUMPING FRENCHMEN OF MAINE** (difficulty 3)

- **REAL:** "My startle reflex is stuck at maximum. If you sneak up and shout 'jump,' I will jump, yell, throw whatever I'm holding — and possibly obey the command before my brain gets a vote."
- FAKE 1: "Every time I stand up too fast, I do a small involuntary hop. It's a misfiring balance reflex. My coworkers call it 'the ping' and I hate them."
- FAKE 2: "Sudden noises paralyze me instead of startling me — I lock up like a mannequin for a solid ten seconds. The office fire drill was humiliating for everyone involved."
- FAKE 3: "When I'm surprised, I laugh. Not a chuckle — a full sitcom-audience laugh. I found out about the layoffs in a meeting. It went badly."
- FAKE 4: "I flinch about one second before loud noises actually happen. My neurologist thinks my brain buffers audio. I'm told it's deeply unsettling to watch."
- *Fact:* Jumping Frenchmen of Maine is a documented startle disorder — first described in French-Canadian lumberjacks who would jump, yell, and even obey shouted commands when startled.

**R11 — AQUAGENIC URTICARIA** (difficulty 3)

- **REAL:** "I break out in itchy hives anywhere water touches my skin — showers, rain, even my own sweat. Hot or cold makes no difference. Yes: I am, functionally, allergic to water."
- FAKE 1: "I can only drink water at exactly body temperature. Anything colder makes my throat seize so I can't swallow for an hour. Restaurants think I'm a nightmare. They're right."
- FAKE 2: "Swimming pools make my skin peel off in sheets. My doctor says I over-absorb water like a sponge until my skin gives up. One lap, one molt."
- FAKE 3: "My tears burn faint tracks into my cheeks, like a very mild acid. I've had to switch to crying face-down. It works, but it's not dignified."
- FAKE 4: "Humidity gives me full-body pins and needles. On rainy days I lose feeling in my fingertips before the first drop falls. I'm more accurate than the weather app."
- *Fact:* Aquagenic urticaria is real: hives from skin contact with water — any water, at any temperature, including your own sweat and tears.

**R12 — ALIEN HAND SYNDROME** (difficulty 3)

- **REAL:** "Since my brain surgery, my left hand has an agenda. It unbuttons my shirt while I'm buttoning it, grabs things off shelves, and once refused to release a doorknob. I'm not doing it. It is."
- FAKE 1: "My hands fall asleep in alphabetical order — left always before right. My neurologist has no explanation for why they're alphabetized. Neither do I. Neither do they."
- FAKE 2: "Whatever my right hand does, my left copies in mirror image half a second later. Writing is fine. Scissors are a horror show."
- FAKE 3: "My hand cramps into the shape of the last tool I used, for hours. I held a stapler this morning. I am still holding a ghost stapler."
- FAKE 4: "If I can't see my hands, I genuinely can't tell which is which. Piano was the first casualty. Shaking hands at conferences was the second."
- *Fact:* Alien Hand Syndrome is real — usually after split-brain surgery or stroke, one hand performs purposeful actions its owner didn't intend.

**R13 — NOCTURNAL LAGOPHTHALMOS** (difficulty 3)

- **REAL:** "I sleep with my eyes partly open. I didn't believe it either, until my partner filmed it. My eyelids simply don't close all the way, so I wake up with sandpaper eyes — and I'm told it is terrifying to witness."
- FAKE 1: "My eyes water only while I'm asleep. I wake up on a soaked pillow like I spent the night sobbing through a movie I wasn't invited to."
- FAKE 2: "I blink in batches — nothing for two minutes, then fifteen blinks in a row. My optometrist calls it 'batch processing.' He thinks that's funny. It's my life."
- FAKE 3: "When I'm tired, one pupil dilates huge while the other stays normal. By 3 p.m. I look like I'm mid-transformation into an anime character."
- FAKE 4: "I dream with my eyes moving so violently I've bruised the inside of my eyelids. My eye doctor's exact words were 'well, that's new.'"
- *Fact:* Nocturnal lagophthalmos is real: some people's eyelids never fully close in sleep — many have no idea until someone (nervously) tells them.

---

Deck authoring note for future content: several fakes above are deliberately built from *other* real conditions (sleep-eating, mirror movements, akinetopsia, anisocoria, pulsatile tinnitus, maple-syrup urine disease) — this is the house trick for making fakes hard, and any P1 deck expansion should keep using it.

## 7. Rules, win & lose conditions

- A run is exactly `roundsPerRun` (10) rounds. Each round: 1 real + `fakesSampled` (3) fake descriptions displayed in seeded-random positions.
- **Correct pick:** +`pointsCorrect` (100). Consecutive-correct streak adds `streakBonus` (25) × (streak − 1) on top (2nd in a row = +125 total, 3rd = +150, ...).
- **Wrong pick:** +0, streak resets to 0. Never negative points.
- **Timer expiry with no confirmed stamp:** counts as wrong ("the patient walked out"); reveal proceeds normally; streak resets. A selected-but-unstamped card does NOT count. ⚑ (overridable)
- **Reveal is immediate after every round** (unlike the source game's deferred 5-round reveal) — solo play needs per-round feedback to be a game rather than a quiz you grade later. ⚑ (overridable via `revealMode` config: `"immediate"` | `"deferred"`, P1)
- **Win/lose:** there is no fail-out; the run always completes. Final rank by correct count: 0–3 **Quack** ("license under review"), 4–6 **Intern** ("supervised stamping only"), 7–8 **Resident** ("cautiously trusted"), 9 **Specialist** ("suspiciously good"), 10 **Chief of Medicine** ("you can't be fooled"). Max score with all-correct streak: 100×10 + 25×(1+2+...+9) = 2125.
- **Edge cases:**
  - Timer expires in the same frame as a STAMP click: the stamp wins (input is processed before the expiry check in the tick order).
  - Double-clicking STAMP: input locks on first confirm; further clicks ignored until Reveal's NEXT.
  - `roundsPerRun` > deck size (via URL override): clamp to deck size (13).
  - Pause during the final second: timer freezes exactly; no expiry while paused.
  - Reload mid-run: run state is not persisted; reload returns to splash (only mute + best score persist in `localStorage`). ⚑

## 8. Difficulty & progression

Single tuned difficulty per run; the curve comes from **content ordering**, not system changes:

- Rounds are served in ascending difficulty buckets (1 → 2 → 3, shuffled within bucket by seed). Early rounds teach the "real is weirder than you think" heuristic; late rounds punish it with fakes that are themselves borrowed from real conditions.
- The timer is constant (`roundTimerSec` = 45). No speed-up across rounds in P0.
- Knobs for playtest tuning (config only, no UI): `roundTimerSec`, `fakesSampled` (3→2 makes it easier), `timerEnabled` (off = zen mode).
- Across-runs progression (persistent unlocks, larger decks, adaptive difficulty): P2, out of scope for the fun test.

## 9. Style & theme

- **Visual style:** flat vector "clinic paperwork" — everything is paper, cards, folders, and rubber stamps on a desk. Thick 2px ink outlines, no gradients except a soft desk shadow. All art is CSS/DOM (borders, border-radius, box-shadow, rotated pseudo-elements for stamps) — zero image assets.
- **Palette (6 colors):**
  - Paper: `#F7F3E8`
  - Ink: `#2B2B33`
  - Clinic teal (UI chrome, selection highlight): `#2A9D8F`
  - Alert red (timer warning, faker stamp, STAMP button): `#E76F51`
  - Highlight amber (streak, hover): `#F4A261`
  - Note green (correct/sick-note stamp): `#5FA052`
  - Desk background behind the paper: `#3E3A45` (dark, so the paper pops).
- **Typography:** condition names and stamps in a bold condensed system stack (`"Arial Narrow", "Helvetica Neue", sans-serif`, weight 800, letter-spacing 0.05em, uppercase); patient descriptions in `Georgia, serif` at 16–18px for readability; UI labels in the system sans stack. No webfonts (keeps build asset-free). ⚑
- **Tone/mood:** deadpan bureaucratic comedy. The game never winks; the content does. Copy is dry ("Patient walked out. Outcome logged.").
- **Reference points:** *Papers, Please* (desk-and-documents inspection under a clock) meets *Balderdash* (spot the real definition) with the energy of a *Fibbage* reveal.
- **Placeholder plan (M0–M1):** unstyled system font, white rectangles with 1px borders on a gray page, text-only "CORRECT/WRONG" reveal. No colors from the palette until M2.

## 10. Sound design

Implementation: **Web Audio API, all SFX synthesized in code** (short oscillator/noise envelopes, jsfxr-style) — zero audio files, keeps the build asset-free. A single `audio.js` module exposes `play(name)` and `toggleMute()`. Audio context is created/resumed only on the first user gesture (the PLAY click) per browser autoplay policy. Mute toggle is P0, persisted to `localStorage` key `sicknote.muted`.

| Game event | Sound description | Priority |
|---|---|---|
| Card select | Short soft click, 40ms, square wave ~800Hz | P0 |
| STAMP confirm | Heavy thunk: 80ms low sine ~120Hz + noise burst | P0 |
| Reveal — correct | Rising two-note chime (C5→G5), triangle wave | P0 |
| Reveal — wrong | Descending "wah" — two-note sawtooth slide down (comedy trombone feel, synthesized) | P0 |
| Timer warning (last `timerWarnSec`) | Soft tick each second, 20ms blip ~1kHz | P0 |
| Round start (chart slides in) | Paper "whoosh" — 120ms filtered noise sweep | P1 |
| Streak milestone (3+) | Extra sparkle arpeggio on top of correct chime | P1 |
| End-of-run rank reveal | Short fanfare, 3 ascending notes | P1 |

Music: **none for the prototype.** ⚑ (A generative lo-fi waiting-room loop is P2; silence keeps focus on reading.)

## 11. UI & screens

Flow: `Splash → Round (Intake/Examine/Stamp/Reveal ×10) → Diagnosis → (restart → Splash-skip straight to Round 1)`. Pause overlay reachable from any round.

**Splash screen (mandatory):**

- Title: **SICK NOTE** with a stamped-ink logo treatment; one-liner: "Four patients. One real illness. You're the doctor — stamp wisely."
- Rules (≤5 bullets):
  - Each round, 4 patients claim the same weird condition.
  - Only ONE description is medically real.
  - Click a patient, then hit STAMP before the timer runs out.
  - Correct picks score points; streaks score more.
  - 10 rounds. Earn your rank. (All conditions are real. Really.)
- Controls block: "Desktop: click or keys 1–4, Enter to stamp, M mute, P pause. Touch: tap card, tap STAMP."
- Version number bottom-right (e.g. `v0.1.0`) rendered from the single `VERSION` constant in `config.js`.
- One big PLAY button (min 64px tall, works via tap/click/Enter).
- Small print: "For entertainment only — not medical advice." Best score from `localStorage` shown if present.

**Round screen / HUD (always visible during play):** top bar with round counter ("PATIENT 3 OF 10"), score, streak flame (hidden at streak < 2), timer bar, mute and pause icons. Center: chart header with condition name; below it the 4 patient cards in a 2×2 grid (single column under 700px width). Bottom: STAMP button.

**Reveal overlay (in-place, not a new screen):** cards restyle per outcome (section 6.1), the `fact` line types in under the chart header, score delta floats up, NEXT PATIENT button appears. Advances only on user input (no auto-advance) with `revealDurationSec` as the minimum time before NEXT becomes active, so players can't skip-blind past the punchline.

**Diagnosis (results) screen:** final score + correct count ("7/10 correct — RESIDENT: cautiously trusted"), best-score line ("New clinic record!" when beaten), a 10-row recap list (condition name, ✓/✗, what the real answer was), RESTART button (new seed unless `?seed=` is pinned), and "Back to splash" link.

**Pause overlay:** dimmed board (descriptions blurred via CSS `filter: blur(6px)` so pausing can't be used to read without the timer), Resume / Restart / Quit buttons, mute toggle.

## 12. Config & tuning

Single exported object in `config.js`; every value below lives there and nowhere else.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | `"v0.1.0"` | string | Splash + debug overlay version display |
| `roundsPerRun` | `10` | rounds | Run length (clamped to deck size 13) |
| `optionsPerRound` | `4` | cards | Cards shown per round (1 real + fakes) |
| `fakesSampled` | `3` | fakes | How many of the 4 authored fakes appear |
| `roundTimerSec` | `45` | seconds | Examine-phase timer |
| `timerWarnSec` | `10` | seconds | When the timer bar turns red and ticks |
| `timerEnabled` | `true` | bool | `false` = zen mode, no timer |
| `pointsCorrect` | `100` | points | Base score per correct stamp |
| `streakBonus` | `25` | points | Extra per consecutive correct beyond the first |
| `revealDurationSec` | `2` | seconds | Minimum time before NEXT activates on Reveal |
| `revealMode` | `"immediate"` | enum | `"deferred"` (P1) batches reveals to run end |
| `rankThresholds` | `[4,7,9,10]` | correct-count | Boundaries for Intern/Resident/Specialist/Chief |
| `muteDefault` | `false` | bool | Initial mute state (before `localStorage` override) |
| `intakeAnimMs` | `600` | ms | Chart slide-in duration |
| `stampAnimMs` | `250` | ms | Stamp thunk animation duration |

**URL flags:**

- `?seed=<string>` — seeds the RNG (deck subset, round order, fake sampling, card positions, patient names). Same seed = identical run, for reproducing playtest moments. Default: `Date.now()`.
- `?debug=1` — debug overlay: current state name, seed, round data id, and a small "R" marker on the real card; cheat keys `]` (skip to reveal as correct) and `[` (as wrong); FPS counter.
- `?skip=1` — bypass splash straight into round 1.
- `?rounds=<n>` — override `roundsPerRun` (clamped 1–13); `?rounds=3` for quick playtest loops.
- `?timer=0` — sets `timerEnabled=false`.

## 13. Tech stack

**Vanilla JavaScript (ES modules) + DOM/CSS. Zero build step.** This is a text-and-cards game with at most one animated element on screen at a time — Canvas, Pixi, and physics engines would be pure overhead, while DOM gives free text layout, wrapping, accessibility, and touch handling. All "art" is CSS (borders, transforms, box-shadows), all sound is synthesized Web Audio, so the deployable is copy-paste static files with no `node_modules` and no bundler. A seeded PRNG (mulberry32, ~10 lines, inlined — no dependency) powers all randomness. Perf budget is trivial: <50 DOM nodes live at once, one CSS transition at a time, no rAF loop needed except the timer bar (one `requestAnimationFrame` updater) — 60fps is guaranteed on any laptop; no entity/particle caps needed beyond "confetti on the Diagnosis screen ≤ 60 CSS-animated divs (P2)."

Deployable layout (also the repo layout — no build output distinction):

```
public/games/the-symptoms/
  design.md          ← this document
  index.html         ← single page, loads main.js as a module
  src/
    config.js        ← config object + VERSION (section 12)
    deck.js          ← the content deck (section 6.2) as data
    rng.js           ← mulberry32 seeded PRNG + shuffle/sample helpers
    game.js          ← headless state machine (no DOM imports)
    ui.js            ← DOM rendering, screens, input binding
    audio.js         ← Web Audio synth SFX + mute
    main.js          ← boot: parse URL flags, wire game↔ui↔audio
  test.html          ← loads game.js + rng.js, runs console assertions (no framework)
```

No runtime network calls; no external fonts, images, or audio files.

## 14. Milestones

**M0 — Toy loop.** *Goal: prove the deduction moment is fun with zero dressing.*
Deliverables: `game.js` state machine + 4 deck entries wired to an unstyled page — condition name, four plain text blocks, click one, page says CORRECT/WRONG plus the fact line, next round, text score at the end. No timer, no sound, no splash.

- [ ] A full 4-round run is playable start to finish with mouse only.
- [ ] The real answer's position varies between rounds (seeded shuffle works).
- [ ] `game.js` runs headlessly: `test.html` asserts scoring, round advance, and shuffle determinism for a fixed seed without touching the DOM.
- [ ] Playtester verdict recorded: did they hesitate on at least half the rounds? **If nobody hesitates or laughs at M0, stop — more rounds and art won't fix dull content.**

**M1 — Real rules.** *Goal: full P0 ruleset.*
Deliverables: all 13 deck entries, 10-round runs with difficulty-bucket ordering, select-then-stamp confirm flow, timer with expiry-as-wrong, streak scoring, splash screen (rules, controls, version, disclaimer), HUD, pause, Diagnosis screen with ranks and recap, restart, keyboard controls, `?seed`/`?rounds`/`?timer`/`?skip` flags.

- [ ] A first-time player understands what to do within 60 seconds unprompted, from the splash alone.
- [ ] Timer expiry mid-hesitation resolves as wrong and the run continues cleanly.
- [ ] Two runs with the same `?seed` produce identical rounds, cards, and positions.
- [ ] Restart works from both Pause and Diagnosis without a page reload.
- [ ] No console errors across a full run in Chrome and Firefox.

**M2 — Feel.** *Goal: the reveal lands as a punchline.*
Deliverables: full palette + paperwork art pass (CSS only), stamp animations with rotation and thunk, card flip on reveal, typed-in fact line, floating score deltas, timer-bar pulse, all P0 SFX synthesized, mute toggle persisted, streak flame.

- [ ] Reveal beat (stamp → flip → fact → score) plays in under 2.5s and is skip-proof for `revealDurationSec`.
- [ ] Audio only ever starts after the PLAY click (no autoplay warnings).
- [ ] Muted state survives a page reload.
- [ ] Game is fully playable by touch on a 375px-wide viewport (cards stack single-column, tap targets ≥ 44px).

**M3 — Playtest build.** *Goal: shareable, reproducible, instrumented.*
Deliverables: `?debug=1` overlay with real-card marker and cheat keys, best-score persistence, deployed to the static host under `/games/the-symptoms/`, P1 features if time allows (in priority order: end-of-run recap polish → deferred `revealMode` → pass-and-play faker mode where a second human writes a 4th description before handing the device to the doctor-player → 5 more deck entries).

- [ ] Game loads and runs from the deployed static URL with no server config.
- [ ] A playtest moment can be reproduced by sharing a `?seed=` URL.
- [ ] Best score persists across sessions.
- [ ] The section-2 playtest questions have been asked of at least 3 players and answers written down.

Every milestone leaves `index.html` runnable by double-clicking / static-serving the folder.

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is 45s the right timer, or does reading 4 descriptions comfortably need 60s? Knob: `roundTimerSec`; also test `?timer=0`.
2. **(non-blocking — resolve in playtest)** Immediate vs. deferred reveal — does saving all reveals to the end (source-game style) build better tension or just feel like a graded quiz? Knob: `revealMode` (P1 implementation).
3. **(non-blocking — resolve in playtest)** Do players learn a meta-tell ("the real one is always the weirdest") by round 6? If so, deck expansion needs real entries that sound mundane. Measured by playtest question 3.
4. **(non-blocking — resolve in playtest)** Is 13 entries enough for 2–3 fun runs (fake resampling + 3 benched entries per run), or does run 2 feel spoiled? Determines whether P1 deck expansion is promoted.
5. **(non-blocking)** Should a wrong pick show WHICH card was real before NEXT (current design: yes, full reveal)? If playtesters want lingering mystery, add `revealDetail` knob. Default stands.
6. **(blocking — resolved by decision, logged for veto)** Medical-comedy tone risk: all conditions are played respectfully-absurd and the disclaimer is on the splash. Darker source-idea variant ("patient zero dies at the end") is cut entirely from this prototype. ⚑

## 16. Handoff notes for Fable

- **Build order:** `rng.js` → `deck.js` (paste section 6.2 verbatim as data) → `game.js` state machine → `test.html` assertions → `ui.js` render + input → `main.js` boot/flags → splash & Diagnosis screens → `audio.js` → M2 juice. Prove the loop with unstyled text blocks before writing a single line of stamp CSS.
- **Keep `game.js` headless.** It must import nothing but `rng.js`, `deck.js`, `config.js`, and expose a pure-ish API: `createRun(seed, overrides)`, `getRound(state)`, `select(state, i)`, `stamp(state)`, `expire(state)`, `next(state)`. `test.html` asserts: seeded determinism (same seed → same deck subset, order, positions), scoring math (streak formula, max score 2125), expiry-as-wrong, clamping of `?rounds`.
- **Deck is data, not code.** `deck.js` exports an array of `{id, name, difficulty, real, fakes, fact}` objects exactly matching section 6.2 — no logic in the file, so content edits never touch game code.
- **The tick order rule matters:** process pending stamp input *before* checking timer expiry in the rAF update, per section 7 edge cases.
- **File layout** is in section 13; there is no build step — the folder IS the deployable. Deploy target: `/games/the-symptoms/` on the existing static host.
- **Ship every milestone runnable.** M0 is the kill-gate: if the toy loop with 4 unstyled rounds doesn't make a playtester hesitate or laugh, report that finding instead of proceeding to M1.
