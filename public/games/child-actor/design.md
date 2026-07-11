# Wizard Slayer: Live at Eleven — Game Design Document

> Source idea: [Game Idea 24 - Child Actor (Theme: What's next after the hero's journey?)](/game-idea-24-child-actor-theme-after-the-heros-journey)

---

## 1. Title & one-liner

**Working title:** *Wizard Slayer: Live at Eleven*

**Alternates:**
- *Still the Wizard Slayer*
- *The Slayer Sits Down*
- *Two Points* (as in: "only got two points" on the book deal)
- *After the Lightning*
- *One More Question*

**One-sentence description:** You are the washed-up hero who saved the world at sixteen, surviving a hostile late-night TV interview by choosing what to say — while managing your dignity, your appearance fee, and the ever-present temptation to punch someone.

**Genre:** Narrative choice game / dialog roguelite-lite. Single-player, browser, 5–8 minutes per run.

**Elevator pitch:** Twenty-five years ago you took a lightning bolt to the chest, fell twenty feet, got up anyway, and killed the dark wizard whose castle floated over LA. Tonight you're on *The Nightcap with Colin Breeze* because the appearance fee covers rent. The host wants a viral moment; the audience wants the legend; a guy in row F thinks the whole thing was crisis actors. Every question is a fork: crack a joke and stay booked, tell the truth and keep your soul, or snap back and feel your temper climb toward the big red PUNCH button that is always, always on screen. The game is the tension between three meters — Dignity, Fee, Temper — and the monologue of a broken, defiant man that surfaces piece by piece depending on which lever you pull.

**Adaptation choice (per MODE NOTE):** The source is a first-person monologue, not a game; I adapted it into an interactive interview scene where the player *is* the monologue's speaker and the interviewer's questions surface the source text as choosable answers, because that structure preserves the text's voice verbatim while adding real decisions, pressure (a per-question timer, a temper meter), and replayable outcomes. ⚑ (overridable)

---

## 2. Fun hypothesis

**The single question this prototype answers:** *Is it fun to role-play a bitter, beloved, broken celebrity under interview pressure — juggling self-respect, money, and rage — when one impulsive button (PUNCH) is always available and always tempting?*

Secondary hypothesis: does authored melancholy comedy survive being chopped into choice-sized pieces, or does the player skim past it?

**Playtest questions (ask after each session):**
1. Did you ever hover over the PUNCH button without pressing it? At which question?
2. Can you say, without looking, roughly where your Dignity and Fee ended up — and did you *choose* that outcome or stumble into it?
3. Which single line of the hero's do you remember?
4. Did you immediately replay to get a different ending? If not, why not?
5. Did the per-question timer create pressure or just annoyance?
6. Did any answer's meter effects feel unfair or arbitrary?

---

## 3. Design pillars

1. **The punch is always one click away.** Temptation is the core feel. The PUNCH button never hides, never grays out, and ends the run instantly. Nothing may be cut that weakens this.
2. **Three currencies, no right answer.** Every response trades Dignity, Fee, and Temper against each other. There is no option that improves everything. If a line reads as strictly best, rewrite its numbers.
3. **His voice, verbatim where possible.** The source monologue's actual sentences are the reward content. Melancholy-defiant, profane, funny. No sanitizing the tone. ⚑ (profanity retained as authored; `CLEAN_MODE` config flag exists to bleep it, default off — overridable)
4. **A run is one sitting of one interview.** 5–8 minutes, 9 beats, hard ending, restart in one click. No meta-progression in P0.

---

## 4. Core game loop

**Session length target:** one full interview = 9 beats × ~35 s ≈ 5–7 minutes.

```
        +--------------------------------------------------+
        |                                                  |
        v                                                  |
  [QUESTION]  Host asks; camera light blinks; audience     |
      |       murmurs. Player reads the hostile question.  |
      v                                                    |
  [PRESSURE]  Timer bar drains (QUESTION_TIMER_SEC).       |
      |       Temper decays slowly; heartbeat rises if     |
      |       Temper is high. PUNCH and WALK OFF loom.     |
      v                                                    |
  [CHOICE]    Player picks 1 of 3 answers (Deflect /       |
      |       Truth / Snap) — or PUNCH / WALK OFF —        |
      |       or lets the timer die (Dead Air).            |
      v                                                    |
  [FALLOUT]   The hero speaks the line. Audience reacts    |
      |       (laughter / gasp / silence / applause).      |
      |       Meters tween to new values. Host jabs back.  |
      +---> next beat, until beat 9 or a hard cutoff ------+
                                |
                                v
                          [ENDING CARD]
              Ending title + epilogue + Legacy Score
                          + Restart
```

**What the player does:** reads, weighs three meters against a countdown, clicks one of five things (3 answers, PUNCH, WALK OFF).
**What the player sees:** a talk-show set (two chairs, desk, curtain, spotlight), three meters, a timer bar, the host's line, their own options.
**What the player feels:** Q — curiosity/dread; PRESSURE — squeeze; CHOICE — self-definition ("who is my Slayer?"); FALLOUT — payoff (a great line said out loud, a crowd reaction, meters moving).

---

## 5. Inputs & controls

**Touch-viable: yes.** The game is entirely buttons and reading; it degrades perfectly to touch. Mobile layout is P1 (single column), but touch on desktop-sized viewport works in P0.

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Click answer / `1` `2` `3` | Tap answer | Choose response A/B/C |
| Click PUNCH / `P` | Tap PUNCH | Throw the punch (instant ending; confirmation-free) |
| Click WALK OFF / `W` | Tap WALK OFF | Leave the set (instant ending; confirmation-free) |
| `M` / click 🔊 icon | Tap 🔊 icon | Mute/unmute all audio |
| `R` / click Restart | Tap Restart | Restart run (available on ending card and pause) |
| `Esc` / click ⏸ icon | Tap ⏸ icon | Pause (freezes timer, dims set, shows Resume/Restart/Mute) |
| `Space` or click anywhere | Tap anywhere | Advance FALLOUT text to next beat (skip the tween wait) |
| Click PLAY (splash) | Tap PLAY | Start the interview |

No other inputs exist. Keys are also shown as small hints on the buttons (`[1]`, `[P]`, etc.).

Edge rule: inputs are ignored during the 400 ms meter-tween window except Space/tap-to-advance, pause, and mute. PUNCH is *never* ignored while the interview is live. (Serves pillar 1.)

---

## 6. Game elements

| Element | Placeholder (M0–M1) | Final look (M2) | Behavior | Config keys | Interacts with |
|---|---|---|---|---|---|
| **The Slayer (player)** | Gray rectangle in right chair, name label "YOU" | CSS-drawn figure: slouched, gray-streaked hair, one taped finger, leather jacket over convention-guest lanyard | Speaks the chosen line (typewriter text in a speech bubble). Shakes when Temper ≥ `TEMPER_SHAKE_AT` | — | All meters; dialog tree |
| **Colin Breeze (host)** | Blue rectangle in left chair, label "HOST" | CSS figure: too-white teeth, sharp suit, cue cards | Reads each beat's question; delivers a reaction line after every answer; delivers the Dead Air jab on timeout | — | Dialog tree |
| **Dignity meter** | Horizontal bar, top-left | Same, styled as a gold laurel bar | 0–100. Starts `DIGNITY_START`. Changed only by answers/events. At ≤ 0 → **Mercy Cut** ending immediately | `DIGNITY_START`, `DIGNITY_HIGH` | Endings |
| **Fee meter** | Horizontal bar labeled "$" | Ticker-style dollar counter | Dollars, `FEE_START` to `FEE_CAP`. Your appearance fee + implied future bookings. Never ends the run early; only shapes ending | `FEE_START`, `FEE_CAP`, `FEE_HIGH` | Endings |
| **Temper meter** | Horizontal red bar | Red bar with a fist icon that glows as it fills | 0–100. Starts `TEMPER_START`. Rises from Snap answers and provocations; decays `TEMPER_DECAY_PER_SEC` while a question is open. At 100 → **The Meltdown** ending immediately | `TEMPER_START`, `TEMPER_DECAY_PER_SEC`, `TEMPER_SHAKE_AT` | Endings; screen shake; heartbeat SFX |
| **Question timer** | Thin draining bar under the question | Same + "ON AIR" light blinks faster in last 5 s | `QUESTION_TIMER_SEC` per beat. Expiry = **Dead Air**: Dignity `DEAD_AIR_DIGNITY`, Temper `DEAD_AIR_TEMPER`, host jab line, auto-advance | `QUESTION_TIMER_SEC`, `DEAD_AIR_DIGNITY`, `DEAD_AIR_TEMPER` | Meters, beat flow |
| **PUNCH button** | Big red rectangle, always bottom-right | Trembling red button with fist emoji, grows subtly with Temper | Always live. During Beat 8 → **The Viral Punch** ending; any other time → **Assault Charge** ending | `PUNCH_VIRAL_FEE`, `PUNCH_VIRAL_DIGNITY` | Endings |
| **WALK OFF button** | Gray rectangle next to PUNCH | Small, tired-looking button | Always live. → **Walked Off** ending; Fee multiplied by `WALKOFF_FEE_MULT` | `WALKOFF_FEE_MULT` | Endings |
| **The Heckler** | Text-only event banner at Beat 8 | Silhouette standing in the audience rows, spotlight snaps to him | Interrupts before Beat 8's options appear, shouting the crisis-actor line; applies `HECKLER_TEMPER_SPIKE` instantly | `HECKLER_TEMPER_SPIKE` | Temper; Beat 8 |
| **Audience** | Text reactions in brackets: `[laughter]` `[gasp]` `[silence]` `[applause]` | Row of dark silhouette heads below the stage; reaction text floats up from them | Purely reactive; each answer option carries one authored reaction tag | — | Fallout phase, SFX |
| **Set dressing** | Solid-color background blocks | Curtain, desk, mugs, city-skyline backdrop, "THE NIGHTCAP" neon sign | Static | — | — |

---

## 7. Rules, win & lose conditions

### Flow rules
- The interview is a fixed sequence of 9 beats (section 7.1). No skipping, no reordering in P0.
- Each beat: host line renders (typewriter, `TYPE_SPEED_CPS` chars/sec, tap-to-complete), then the 3 options appear and the timer starts.
- Choosing an option: options lock, the Slayer's line renders, audience reaction plays, meters tween over 400 ms, host reaction line renders, then next beat (auto after `FALLOUT_HOLD_SEC` or on tap).
- Meters clamp: Dignity and Temper to [0, 100]; Fee to [0, `FEE_CAP`].
- All hard-cutoff checks (Dignity ≤ 0, Temper ≥ 100) are evaluated **after** an answer's full delta is applied, and Temper-decay-driven meltdown cannot happen (decay only lowers Temper). Simultaneity rule: if one answer both drops Dignity to ≤ 0 and pushes Temper to ≥ 100, **Meltdown wins** (rage beats collapse — it's the louder story).
- Timer expiry mid-typewriter cannot happen: the timer starts only when options are shown.
- PUNCH pressed in the same frame the timer hits zero: PUNCH wins (pillar 1).

### Endings (9 total, all P0)

| # | Ending | Trigger | Fee/score effect |
|---|---|---|---|
| E1 | **The Comeback** | Finish beat 9 with Dignity ≥ `DIGNITY_HIGH` and Fee ≥ `FEE_HIGH` | — |
| E2 | **Proud and Broke** | Finish with Dignity ≥ `DIGNITY_HIGH`, Fee < `FEE_HIGH` | — |
| E3 | **The Sellout** | Finish with Dignity < `DIGNITY_HIGH`, Fee ≥ `FEE_HIGH` | — |
| E4 | **Old News** | Finish with both below thresholds | — |
| E5 | **The Viral Punch** | PUNCH during Beat 8 (heckler on screen) | Fee += `PUNCH_VIRAL_FEE`; Dignity += `PUNCH_VIRAL_DIGNITY` (negative) |
| E6 | **Assault Charge** | PUNCH at any other time | Fee set to 0 |
| E7 | **The Meltdown** | Temper reaches 100 | Dignity −20 applied before card |
| E8 | **Walked Off** | WALK OFF button | Fee ×= `WALKOFF_FEE_MULT` |
| E9 | **The Mercy Cut** | Dignity reaches 0 | Fee ×= 0.5 |

**Winning:** there is no single win. E1 is the implicit "best" ending; the real goal is collecting endings and owning your choices. The ending card shows which of the 9 endings you've seen this browser (`localStorage`, key `ws_endings_seen`) as 9 small slots — the collect-a-thon is the replay hook.

**Legacy Score** = `round(Dignity + Fee / 100)`. Shown on every ending card with the ending title and a 1–2 sentence authored epilogue (section 7.2). Score is flavor/bragging, not a gate.

### 7.1 The full P0 dialog tree

Format per beat: **HOST** line → three options. Each option: archetype, the Slayer's spoken line, deltas `(ΔDignity / ΔTemper / ΔFee $)`, audience reaction tag, host reaction line. Deltas are literal P0 values; they also live in the config as the `SCRIPT` data object.

Dead Air (any beat): Dignity `DEAD_AIR_DIGNITY` (−10), Temper `DEAD_AIR_TEMPER` (+10), reaction `[uncomfortable silence]`, host jab: **"Folks, we may have lost the feed. Or the legend. We'll be right back either way."** Then next beat.

---

**BEAT 1 — The Book.**
HOST: "Ladies and gentlemen — he saved the world at sixteen, and tonight he's here to save my ratings: the Wizard Slayer himself! Let's start with the book. *Slayer: My Story.* Global bestseller. You must be set for life."

- **A (Deflect):** "Set for life? Two dollars and that book will get you a bus ticket." — (0 / +0 / +$500) — `[laughter]` — HOST: "Modest AND broke, folks. He contains multitudes."
- **B (Truth):** "Didn't make much. A ghost writer wrote it and took most of the royalty — I got two points. I was sixteen, an orphan, and didn't know much about anything." — (+8 / +5 / −$250) — `[sympathetic murmur]` — HOST: "Two points. Ouch. Hollywood math, everybody."
- **C (Snap):** "Did you read your first contract at sixteen, Colin? No? Then don't ask me why I signed mine." — (+4 / +12 / −$500) — `[oooooh]` — HOST: "Easy, easy — I come in peace. Mostly."

**BEAT 2 — The Movie.**
HOST: "Then came the movie. And the infamous morality clause that — how do I put this — clawed back most of your fee. What did you even *do*?"

- **A (Deflect):** "Apparently 'conduct unbecoming of a hero.' Turns out heroes aren't allowed to be teenagers." — (0 / +3 / +$500) — `[laughter]` — HOST: "The lawyers giveth, the lawyers taketh away."
- **B (Truth):** "One-time fee, no backend. I needed the cash and I signed whatever they put in front of me. I got smarter after that — got an agent — but by then I was mostly old news." — (+8 / +5 / −$250) — `[murmur]` — HOST: "Old news at nineteen. That's showbiz, kid."
- **C (Snap):** "What did I do? The press ran me through the ringers — that's what happened. Next question." — (−4 / +12 / −$250) — `[boos, scattered]` — HOST: "Touchy! We'll put a pin in that."

**BEAT 3 — The Second Book.**
HOST: *(smirking)* "You later wrote your OWN version. Self-published. How did... that go?"

- **A (Deflect):** "Writing is hard, man. I never finished high school — in my defense, a wizard blew it up." — (−4 / 0 / +$500) — `[big laughter]` — HOST: "Best excuse for a missing diploma I've ever heard."
- **B (Truth):** "I spent years trying to find a publisher, but my — air quotes — *brand* had suffered from the morality clause thing. So I published it myself and did my own tour. I'm proud of that one." — (+8 / +3 / −$250) — `[warm applause]` — HOST: "And you can still get it, folks — trunk of his car, I'm told."
- **C (Snap):** "Go ahead and smirk. You try writing a book when the whole world's already decided you're old news." — (+2 / +10 / −$500) — `[silence]` — HOST: "...Moving on."

**BEAT 4 — The Dagger.**
HOST: "The magic dagger. The one that ended it all. Rumor says the government still has it. Any chance we'll see it tonight?" *(audience cheers)*

- **A (Deflect):** "They say it's still my property — they just won't return it until they figure out how it works. It's *magic*, Colin. Nobody knows how that shit works." — (+2 / 0 / +$500) — `[laughter]` — HOST: "Your tax dollars at work, everybody."
- **B (Truth):** "Everything else went to auction years ago — the armor, the boots, all of it. You'd be surprised what you'll sell when the heat gets shut off." — (+6 / +5 / −$250) — `[sympathetic murmur]` — HOST: "The heroes' aisle at the pawn shop. Grim."
- **C (Snap):** "You want the dagger? Ask the government. While you're at it, ask them for my finger back." — (+2 / +10 / −$250) — `[uneasy laughter]` — HOST: "That got dark fast."

**BEAT 5 — The Body, The Pills.**
HOST: "Let's get personal. The injuries. The... pills. You've been open about it. How are you now — *really*?"

- **A (Deflect):** "I set off every metal detector and I predict rain better than your weather guy. I'm basically a public service." — (−6 / 0 / +$500) — `[laughter]` — HOST: "He's here all week, folks."
- **B (Truth):** "Take a magic lightning bolt to the chest at sixteen, then a twenty-foot fall. You get up — it's pure adrenaline, and the world needs saving — but it has consequences. Lost a few toes, a finger, my knees are shot, I can't lift my arms above my head. The pills didn't do me any good. I'm off them now. Two years sober... ish." — (+10 / +3 / $0) — `[long applause]` — HOST: *(quiet, for once)* "Two years. That's not nothing."
- **C (Snap):** "'Really'? You want a pain rating out of ten, or do you just need something for the clip?" — (−4 / +14 / −$500) — `[gasp]` — HOST: "I mean — a little for the clip, sure."

**BEAT 6 — Karla.**
HOST: "Karla. America's sweetheart. You rescued her from the dark wizard and the whole world shipped it. What happened?"

- **A (Deflect):** "She sends me a card on the holidays. I'm told that's more than most exes get." — (0 / +3 / +$250) — `[small laughter]` — HOST: "A card! Romance isn't dead, it's just... annual."
- **B (Truth):** "She was the girl of my dreams — when I was sixteen. I think she felt kind of obligated, after the rescue. We didn't last. I hear she's married now, has a few kids. I hope she's happy." — (+10 / +2 / −$250) — `[awwww]` — HOST: "Karla, if you're watching — he's grown as a person."
- **C (Snap):** "That's her private life. Leave her out of this, or I walk." — (+6 / +12 / −$500) — `[oooooh]` — HOST: "Noted. And scene."

**BEAT 7 — The Kids.**
HOST: "And your own kids? You're a father — several times over, if the tabloids count right."

- **A (Deflect):** "Which ones?" — (−8 / +4 / +$250) — `[dark laughter]` — HOST: "HA! We'll let legal sort that out."
- **B (Truth):** "All they wanted was money, and when they found out I don't have any, most of them stopped calling. I keep track of my oldest, John. I'm... not allowed to see him anymore. Some of that's on me." — (+10 / +5 / −$250) — `[dead silence]` — HOST: *(no joke available)* "...Yeah."
- **C (Snap):** "You got kids, Colin? Would you want them dissected on live TV for a ratings bump?" — (+4 / +12 / −$500) — `[murmur]` — HOST: "Fair. Brutal, but fair."

**BEAT 8 — The Heckler.** *(EVENT: before options appear, a man stands up in row F. Spotlight snaps to him. Temper += `HECKLER_TEMPER_SPIKE` (+25) instantly, with a heartbeat sting.)*
HECKLER: "IT WAS STAGED! CRISIS ACTORS! THE LIGHTNING WAS CGI, SHEEPLE!"
HOST: "Sir— security— okay, well, he's said it. The rumors. Your response?"

- **A (Deflect):** *(breathe)* "...Security will show him the door. And unlike the wizard, they'll take the stairs." — (+4 / **−15** / +$250) — `[laughter, applause]` — HOST: "Grace under fire, folks!"
- **B (Truth):** "Fuck the rumors. He was a wizard. He shot lightning out of his hands. His castle floated in the sky above LA — anyone with eyes knows it was real. He killed people. *Real* people. Most of my high school. Not crisis actors. No movie magic. One hundred percent real." — (+12 / +8 / $0) — `[standing ovation, scattered boos]` — HOST: "You heard it here. Unfiltered."
- **C (Snap):** "Say it again. Come down here and say it to my face." — (−2 / +20 / −$250) — `[gasp]` — HOST: "Please don't. Our insurance. Please."

*(PUNCH pressed during this beat → E5 The Viral Punch instead of E6.)*

**BEAT 9 — Regrets.**
HOST: "Last question, and I'll actually be nice. Any regrets?"

- **A (Deflect):** "Just one: not getting points on the movie." — (−2 / 0 / +$500) — `[laughter]` — HOST: "Spoken like a man with an agent now. Give it up for my guest!"
- **B (Truth):** "Plenty. Who doesn't? But I saved the world, and they can't take that away from me. Every single person in this room would be dead or slaves to that wizard if it wasn't for me." — (+10 / +3 / +$250) — `[roaring applause]` — HOST: "The one. The only. The Wizard Slayer!"
- **C (Snap):** "Regret? I'm the mother fucking Wizard Slayer. Roll the credits, Colin." — (+6 / +8 / +$500) — `[crowd roars]` — HOST: "AND WE'RE OUT! Goodnight everybody!"

---

### 7.2 Ending epilogues (shown on the ending card)

- **E1 The Comeback:** "The clip of you trends for a week — for the right reasons, this time. Your agent's phone starts ringing. You buy John a birthday present and, this year, it doesn't come back unopened."
- **E2 Proud and Broke:** "No bookings come of it. But that night you sleep fine, and two dollars will still get you a bus ticket home. You saved the world. They can't take that away from you."
- **E3 The Sellout:** "The bookings pour in: conventions, tech bros' birthdays, a mattress commercial. Your agent takes twenty percent after expenses. You avoid mirrors for a while."
- **E4 Old News:** "The segment is cut to ninety seconds and airs after midnight. Nobody clips it. Karla's holiday card arrives early this year. It helps a little."
- **E5 The Viral Punch:** "Forty million views by morning. 'WIZARD SLAYER DECKS TRUTHER' outsells the movie. The bookings triple. The morality clause people call again. Worth it? You genuinely can't tell."
- **E6 Assault Charge:** "Colin Breeze's lawyers are faster than any wizard. The fee is gone, the segment never airs, and the tabloids run the old photo. Again."
- **E7 The Meltdown:** "You don't remember exactly what you screamed. The internet does. It has subtitles in nine languages by dawn. Two years sober... ish... starts over at zero days."
- **E8 Walked Off:** "You leave the mic on the chair, still hot. Half the fee, all of your spine intact. In the parking lot, the night air smells like the top of that tower did. Almost."
- **E9 The Mercy Cut:** "The host cuts to commercial out of something like kindness. 'We'll do it again sometime,' he lies, shaking your good hand. Everyone claps. Nobody looks at you."

---

## 8. Difficulty & progression

Single tuned difficulty — this is a prototype about tone and temptation, not challenge escalation. The built-in ramp is authored, not systemic:

- **Question hostility rises** across beats 1→8 (softball book question → heckler ambush), so Temper naturally trends upward through a run.
- **The heckler spike** (`HECKLER_TEMPER_SPIKE = 25`) is placed at beat 8 so that a Snap-heavy player arrives there near meltdown — the punch is most tempting exactly when it's most "justified."
- **Timer pressure is constant** (`QUESTION_TIMER_SEC = 20`), but reading load grows slightly in later beats, tightening effective time.

Across runs, progression = the endings-seen tracker (9 slots, `localStorage`). No unlocks, no difficulty select. Config knobs (`QUESTION_TIMER_SEC`, `TEMPER_DECAY_PER_SEC`, delta scaling via `DELTA_SCALE`) exist so playtests can tune squeeze without code changes.

---

## 9. Style & theme

**Visual style:** Flat vector late-night TV, built entirely from CSS shapes and DOM — no image assets. Thick dark shapes, one warm spotlight gradient, neon accents. Think "a Jackbox game filmed on the Letterman set." Composition: stage occupies the top 60% (host left, Slayer right, desk, curtain, neon sign), audience silhouettes as a dark scalloped strip below the stage, and the interaction panel (question, options, meters, timer, PUNCH/WALK OFF) in the bottom 40%.

**Palette (6 colors):**
- `#141B2E` — set/backdrop navy (page background)
- `#8C1D2F` — curtain crimson (stage back, PUNCH button)
- `#F2B33D` — spotlight amber (highlights, timer bar, Dignity meter)
- `#F5EFE0` — cream (all body text, the Slayer's speech)
- `#4FA3A5` — neon teal ("THE NIGHTCAP" sign, host accents, Fee meter)
- `#0A0E1A` — audience-pit black (silhouettes, shadows)

Temper meter is curtain crimson filling over audience-pit black.

**Typography:** Headings and the neon sign in `Georgia, 'Times New Roman', serif` italic (showbiz warmth); questions, answers, and UI in `system-ui, -apple-system, 'Segoe UI', sans-serif`. The Slayer's lines render slightly larger than the host's — his voice is the content.

**Tone/mood:** Melancholy-defiant comedy. Warm light on a tired man. The jokes land, then the silence after them lands harder. Never wacky, never grimdark.

**References:** *Reigns* (small choices, big meters) meets a late-night ambush interview; the "interview" vignettes of *Jackbox* presentation; *Papers, Please*'s emotional bookkeeping — numbers that make you feel like a worse or better person.

**Placeholder art plan (M0–M1):** solid-color rectangles with text labels ("HOST", "YOU", "AUDIENCE"), default font, meters as plain `<div>` bars, reactions as bracketed text. All layout final-shaped from M0 so M2 is a reskin, not a rebuild.

---

## 10. Sound design

**Implementation:** Web Audio API directly (no library — the needs are simple), all SFX synthesized in code (jsfxr-style oscillator/noise recipes), zero audio asset files. An `AudioContext` is created/resumed only on the first user gesture (the PLAY click). Master gain node; mute toggle (P0) sets it to 0 and persists in `localStorage` (`ws_muted`).

**Music:** none in P0/P1. A 2-second synthesized talk-show brass-ish sting (three-note sawtooth chord + noise hat) plays on splash PLAY and on the ending card. ⚑ (overridable — generative lo-fi bed under the interview is P2)

**SFX event table:**

| Game event | Sound description (synthesized) | Priority |
|---|---|---|
| Show sting (PLAY, ending card) | 3-note sawtooth swell chord, 2 s | P0 |
| `[laughter]` | Burst of band-passed noise, amplitude-wobbled ~8 Hz, 1.2 s | P0 |
| `[applause]` / ovation | White-noise crackle bed, 1.5 s (2.5 s for ovation) | P0 |
| `[gasp]` / `[oooooh]` | Short reversed-envelope filtered noise swell, 0.5 s | P0 |
| Timer last 5 s | Soft tick each second, square blip 60 ms | P0 |
| Temper ≥ `TEMPER_SHAKE_AT` | Heartbeat: two low sine thumps per second, gain scales with Temper | P0 |
| PUNCH | Heavy noise-burst thud + 100 Hz sine drop, 300 ms, then dead silence 1 s | P0 |
| Meter change | Tiny up/down pitch blip (up = gain, down = loss) per meter | P1 |
| Typewriter text | 30 ms filtered click per 3 characters | P1 |
| `[silence]` / dead air | No sound — cut any playing reaction instantly (silence as a sound cue) | P0 (it's a stop, not an asset) |

P0 count: 7 synthesized sounds + a stop-behavior. Mute toggle P0, on splash, HUD, pause, and ending card.

---

## 11. UI & screens

**Flow:** `SPLASH → INTERVIEW → ENDING CARD → (Restart) → SPLASH`  … plus `PAUSE` overlay reachable from INTERVIEW.

### Splash screen (mandatory)
- Title: **WIZARD SLAYER: LIVE AT ELEVEN** in the neon-sign style; one-liner beneath: *"You saved the world at sixteen. Tonight you're saving the segment."*
- Rules/goal, ≤5 bullets:
  - You're the washed-up hero on a hostile talk show. Answer 9 questions.
  - Each answer trades **Dignity**, your **Fee ($)**, and your **Temper**.
  - Temper hits 100 → you lose it on live TV. Dignity hits 0 → they cut the segment.
  - The **PUNCH** button always works. It always ends the interview. Choose wisely.
  - Reach the end and see what the morning headlines make of you. 9 endings.
- Controls line: "Click/tap an answer, or keys 1-3 · P punch · W walk off · M mute · Esc pause"
- Version number bottom-right (e.g., `v0.1.0`) from the single `VERSION` constant in `config.js`.
- One big amber **▶ PLAY** button (this gesture also unlocks audio).
- Endings-seen tracker: 9 small slots (filled = seen), from `localStorage`.

### Interview screen (HUD always visible)
- Top strip: Dignity bar (amber, labeled), Fee counter (teal, `$5,000` style), Temper bar (crimson, fist icon). Beat counter "Q 3/9". Mute 🔊 and pause ⏸ icons top-right. Blinking "● ON AIR" top-left.
- Stage: host + Slayer + speech bubbles; audience strip with floating reaction text.
- Bottom panel: question text, then 3 answer buttons (full-width rows, `[1]`–`[3]` hints), timer bar directly above them. PUNCH (large, red) and WALK OFF (small, gray) pinned bottom-right at all times.

### Pause overlay
Dim set; "PAUSED — the audience holds its breath"; Resume / Restart / Mute buttons. Timer frozen.

### Ending card
- Big ending title (e.g., **THE VIRAL PUNCH**), epilogue paragraph (7.2), final meters, **Legacy Score**, endings tracker with the new slot animating in, **▶ RUN IT BACK** restart button, version number. Restart resets meters/beat state; keeps `localStorage`.

---

## 12. Config & tuning

Single exported object `CONFIG` in `js/config.js`; the authored beats live in `js/script.js` as a `SCRIPT` array (each beat: host line, options with text/deltas/reaction/host response). All numeric gameplay values reference `CONFIG` — nothing hardcoded elsewhere.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | `"0.1.0"` | string | Splash + debug overlay version display |
| `DIGNITY_START` | 50 | points | Starting Dignity |
| `DIGNITY_HIGH` | 65 | points | Threshold for "high dignity" endings (E1/E2) |
| `TEMPER_START` | 20 | points | Starting Temper |
| `TEMPER_DECAY_PER_SEC` | 0.5 | pts/s | Temper cooldown while a question is open |
| `TEMPER_SHAKE_AT` | 70 | points | Screen-shake + heartbeat threshold |
| `HECKLER_TEMPER_SPIKE` | 25 | points | Instant Temper hit at Beat 8 event |
| `FEE_START` | 5000 | $ | Starting fee |
| `FEE_CAP` | 20000 | $ | Fee clamp |
| `FEE_HIGH` | 6500 | $ | Threshold for "high fee" endings (E1/E3) |
| `QUESTION_TIMER_SEC` | 20 | s | Time to answer each beat |
| `DEAD_AIR_DIGNITY` | −10 | points | Dignity change on timer expiry |
| `DEAD_AIR_TEMPER` | +10 | points | Temper change on timer expiry |
| `PUNCH_VIRAL_FEE` | +10000 | $ | Fee bonus for E5 (punch during Beat 8) |
| `PUNCH_VIRAL_DIGNITY` | −40 | points | Dignity cost for E5 |
| `WALKOFF_FEE_MULT` | 0.5 | × | Fee multiplier for E8 |
| `DELTA_SCALE` | 1.0 | × | Global multiplier on all answer meter deltas (tuning lever) |
| `FALLOUT_HOLD_SEC` | 2.5 | s | Auto-advance delay after host reaction |
| `TYPE_SPEED_CPS` | 40 | chars/s | Typewriter speed |
| `METER_TWEEN_MS` | 400 | ms | Meter animation duration |
| `SHAKE_MAX_PX` | 6 | px | Max screen-shake amplitude at Temper 100 |
| `CLEAN_MODE` | false | bool | Replaces profanity with "f—ing"-style bleeps ⚑ |

**URL flags:**
- `?seed=<int>` — seeds the PRNG (mulberry32). P0 randomness is minor (reaction float positions, shake jitter, laugh-noise variation) but seeding keeps runs reproducible for bug reports.
- `?debug=1` — debug overlay: FPS, current beat id, exact meter floats, version; cheat keys `[` / `]` = Temper ±20, `-` / `=` = Dignity ±20, `0` = Fee +2000, `E` = jump to ending card cycling E1–E9, `N` = skip to next beat.
- `?beat=8` — start at a given beat with default meters (fast iteration on the heckler moment).
- `?clean=1` — forces `CLEAN_MODE` on.
- `?fast=1` — sets `TYPE_SPEED_CPS=200`, `FALLOUT_HOLD_SEC=0.5` for rapid playtesting.

---

## 13. Tech stack

**Vanilla JavaScript + DOM/CSS, zero-build, ES modules.** No canvas, no framework, no bundler. The game is text, buttons, bars, and tweens — the DOM is the native tool for it: answer buttons get accessibility and touch for free, typewriter text is a `setInterval` over `textContent`, meters are CSS `width` transitions, and screen shake is a CSS transform on the stage container. Web Audio API is used directly for the seven synthesized SFX. Deployment = copy the folder to any static host (it lives inside this site's `public/` tree already). No runtime network calls; no assets beyond the HTML/CSS/JS files themselves. Performance is trivially within budget (≤ ~60 DOM nodes animating; only reaction floats and shake run per-frame), so 60 fps on a mid-range laptop needs no special effort; perf budget: ≤ 20 simultaneous floating reaction elements (P2 confetti capped at 80 nodes).

**File layout (repo == deployable output):**

```
public/games/child-actor/
  design.md          (this doc)
  index.html         (all screens as DOM sections; loads main.js as module)
  css/style.css
  js/config.js       (CONFIG + VERSION)
  js/script.js       (SCRIPT: the 9 beats + endings text — pure data)
  js/sim.js          (headless state machine: beats, meters, endings — no DOM)
  js/ui.js           (render state → DOM; input wiring)
  js/audio.js        (Web Audio synth SFX + mute)
  js/main.js         (boot, URL flags, RAF loop for timer/decay/shake)
  test/sim.test.js   (optional; runs sim.js in Node — see §16)
```

---

## 14. Milestones

**M0 — Toy loop.**
Goal: the interview is playable start to end with placeholder rectangles and zero art/sound/menus.
Deliverables: `sim.js` state machine with all 9 beats and 9 endings; `script.js` full authored data; bare DOM UI (question, 3 buttons, 3 meter bars, timer bar, PUNCH, WALK OFF); ending shown as plain text.
Acceptance criteria:
- [ ] A run from beat 1 to an ending card takes 3–7 minutes with no console errors.
- [ ] All 9 endings reachable (verified via `?debug=1` cheats plus at least 3 legit runs).
- [ ] Timer expiry triggers Dead Air and advances; PUNCH ends instantly from any beat.
- [ ] Temper decays visibly while idle on a question.
- [ ] A first-time player understands what to do within 60 seconds unprompted.
Proves: the choice-under-meters loop is engaging with zero dressing. *If M0 isn't fun, stop — art won't save it.*

**M1 — Real rules.**
Goal: full P0 ruleset and framing.
Deliverables: splash screen (rules ≤5 bullets, controls, `VERSION`, PLAY), HUD polish (labels, beat counter, ON AIR light), pause overlay, ending cards with epilogues + Legacy Score, endings-seen tracker in `localStorage`, restart, keyboard shortcuts, clamping and simultaneity rules per §7.
Acceptance criteria:
- [ ] Splash → interview → ending → restart loop with no dead ends; mute/pause/restart all reachable by mouse, keys, and touch.
- [ ] Version string on splash, ending card, and debug overlay all read from the one constant.
- [ ] Meltdown-vs-MercyCut simultaneity resolves to Meltdown (unit-testable in `sim.js`).
- [ ] Endings tracker persists across a browser refresh.
Proves: the game is self-explanatory and complete as a ruleset.

**M2 — Feel.**
Goal: it feels like late-night TV.
Deliverables: full CSS art pass (§9: set, characters, curtain, neon sign, audience strip, palette, typography), typewriter text, meter tweens, screen shake ≥ `TEMPER_SHAKE_AT`, floating audience reactions, all P0 SFX via Web Audio, heartbeat loop, PUNCH button growth/tremble.
Acceptance criteria:
- [ ] No image/audio asset files exist; everything is CSS/DOM/synthesized.
- [ ] Audio only initializes after the PLAY gesture; mute persists across sessions.
- [ ] At Temper 85+, a playtester reports feeling "about to lose it" (shake + heartbeat legible).
- [ ] 60 fps during the busiest moment (Beat 8 event) on a mid-range laptop.
Proves: presentation amplifies the temptation mechanic rather than decorating it.

**M3 — Playtest build.**
Goal: shippable, instrumentable prototype.
Deliverables: `?seed`, `?debug=1`, `?beat=N`, `?fast=1`, `?clean=1` all working; deployed at the static path `/games/child-actor/`; P1 items if time allows (in order): meter-change blips, typewriter clicks, mobile single-column layout, conditional host callbacks (host references your beat-5 sobriety answer at beat 8).
Acceptance criteria:
- [ ] Fresh browser + deployed URL: full run works with no local setup.
- [ ] `?seed=42&fast=1` produces an identical run twice.
- [ ] Debug overlay shows FPS, beat id, meters, version.
- [ ] Two external playtesters finish a run and answer the §2 questions.
Proves: the fun hypothesis can actually be tested with strangers.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is `QUESTION_TIMER_SEC = 20` pressure or annoyance? Knob exists; try 15 and 30 with testers.
2. **(non-blocking — resolve in playtest)** Are the answer deltas legible enough without previewing them on the buttons? If players feel outcomes are arbitrary (§2 Q6), add small ▲▼ hint icons per meter on hover — implement behind a `?hints=1` flag in M3 rather than deciding now.
3. **(non-blocking — resolve in playtest)** Does anyone punch on a *first* run? If nobody does, raise `HECKLER_TEMPER_SPIKE` and lower `TEMPER_DECAY_PER_SEC` — the button must get pressed by ~30% of first runs to prove pillar 1.
4. **(non-blocking — resolve in playtest)** Is E5's fee bonus (+$10,000) too obviously "correct," making the punch a strategy instead of a temptation? If players punch cynically, drop `PUNCH_VIRAL_FEE` to +4000.
5. **(non-blocking)** Profanity: retained per pillar 3 with `CLEAN_MODE` available. Confirm the site owner wants it on a public page; flipping the default is a one-key change. ⚑
6. **(non-blocking — P1)** Conditional host callbacks (host remembering earlier answers) are scoped P1/M3; playtest whether the static tree already feels reactive enough via audience reactions alone.

No blocking questions — the doc is implementable as written.

---

## 16. Handoff notes for Fable

- **Build order:** `script.js` data (transcribe §7.1 verbatim, including deltas) → `sim.js` headless state machine → `main.js` timer/decay loop → bare `ui.js` render + input (M0) → splash/pause/ending screens (M1) → CSS art + `audio.js` (M2) → URL flags + deploy (M3).
- **Keep the sim headless.** `sim.js` must import only `config.js` and `script.js` and expose a pure-ish API: `createGame(config, script, seed)`, `choose(game, optionIndex)`, `tick(game, dtSeconds)`, `punch(game)`, `walkOff(game)`, `getEnding(game)`. It must run under Node with zero DOM so unit tests can assert: clamping, Dead Air, Meltdown-beats-MercyCut, all 9 ending triggers, and that every beat has exactly 3 options with finite deltas.
- **All authored text lives in `script.js`**, all numbers in `config.js`. The UI reads both; nothing textual or numeric is embedded in `ui.js`.
- **Prove the loop with rectangles first.** Do not write a line of stage CSS until M0's acceptance boxes are checked. If clicking gray buttons at gray rectangles isn't already tense and funny, stop and flag it.
- **Ship every milestone runnable.** After each milestone, `index.html` opened from the static path must play start-to-end.
- **Repo/deploy layout** is §13's tree under `public/games/child-actor/` — the folder is the build output; there is no build step.
- **Version discipline:** bump `CONFIG.VERSION` at each milestone (0.1.0 = M0 … 0.4.0 = M3) so playtest reports are traceable.
