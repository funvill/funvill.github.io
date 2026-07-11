# Perfectly Normal Choir — Game Design Document

> Source idea: [Game Idea 32 - Local choir (Theme: Hello sir, would you like to join our cult?)](/game-idea-32-local-choir-theme-join-our-cult)

---

## 1. Title & one-liner

**Working title:** Perfectly Normal Choir ⚑ (overridable)

**Alternates:** Hymn & Tonic · Chant Believe It · Robes & Rec Leagues · The Tuesday Choir · Pitch, Please

**One-sentence description:** A comedy rhythm/visual-novel hybrid where you join a small-town "choir" that is very obviously a cult (to everyone but you), nail increasingly ritualistic call-and-response chants, and befriend cultists at the pub — because every friend you make would honestly rather play ping pong than summon an elder god.

**Genre:** Rhythm game + light social sim / comedic visual novel. Single-player. Browser, static hosting.

**Elevator pitch:** You're new to town and answer a newspaper ad for a Tuesday-night choir. The "vocal warm-ups" are call-and-response chant patterns you repeat on the beat — a Simon-says rhythm game that gets faster, longer, and noticeably more Latin as the sessions go on. Between rehearsals you go to the pub with the members and pick who to chat with; good conversation choices turn cultists into actual drinking buddies. Your narrator character reads every red flag as a charming small-town quirk ("Robes! So comfy. Very inclusive of all body types"). At the Big Performance, every member you truly befriended bails on the ritual for beer and ping pong — and whether the town gets barbecued, the summoning fizzles, or the whole cult defects to league night depends on how many friends you made and whether you keep singing. The prototype adaptation choice: the source is a story premise, so it is adapted as a **rhythm mini-game (the chants) interleaved with choice-based social scenes (the pub), with a branching ending matrix** — the smallest playable shape that keeps both the escalating-ritual comedy and the "friendship defeats apocalypse" punchline.

---

## 2. Fun hypothesis

**The single question:** Is it fun to get *genuinely good* at an escalating rhythm mechanic while the fiction around it gets sinister — and does befriending characters so they defect from the finale make the player feel clever and warm instead of just watching a joke?

Everything in P0 serves this: the chant loop must be satisfying on its own, and the friendship → defection → ending chain must be legible enough that players replay to save the town (or, gleefully, to barbecue it).

**Playtest questions:**

1. Did you understand the call-and-response chant mechanic within the first pattern, without re-reading instructions?
2. At what session did you realize it was a cult, and did the narrator's obliviousness make that funnier or annoying?
3. Did you understand that pub chats mattered to the ending *before* the finale? (If not, the praise/feedback copy needs work.)
4. After seeing your ending, do you know what you'd do differently to get a different one? Do you want to replay?
5. Was the final performance chant tense, or just another round? (Measures whether difficulty ramp + stakes landed.)

---

## 3. Design pillars

1. **The chant must slap.** The rhythm loop is a real, tight, learnable skill game — not a QTE garnish. If the chanting isn't satisfying with rectangles and beeps, stop.
2. **Comedy of obliviousness.** Every escalation (robes, circles, syllable "ZUL", the barbecue) is narrated approvingly by the protagonist. The player is always ahead of the narrator; that gap is the joke.
3. **Friendship is the mechanic that matters.** Social choices have exactly one visible currency (friendship) and one payoff (defection at the finale). No hidden stats, no fog.
4. **Short, replayable, endings-driven.** One full run ≤ 10 minutes. The ending matrix is the reward table; replays are the point.

If a feature serves none of these, cut it.

---

## 4. Core game loop

A run is 6 playable rehearsal sessions (fictional sessions 1, 3, 5, 7, 9, 10 — sessions 2/4/6/8 are one-card "montage" interstitials so the fiction says "ten sessions" while play stays under 10 minutes ⚑ overridable), then the Finale.

**Per-session loop (three named phases):**

```
             ┌────────────────────────────────────────────┐
             │                                            │
             ▼                                            │
   [ARRIVE]  narration card: what's new & suspicious      │
      │      (robes, circle, gestures). Player reads,     │
      │      narrator approves. 1 tap to continue.        │
      ▼                                                   │
   [CHANT]   call-and-response rhythm game:               │
      │      leader demos pattern → 4-beat count-in →     │
      │      player repeats it on the beat. 4 patterns.   │
      │      Live accuracy grade per note.                │
      ▼                                                   │
   [PUB]     post-rehearsal social. Pick 2 of 6 cultists  │
      │      to chat with; each chat = 1 setup + 3 dialog │
      │      options; choice adjusts friendship. Hearts   │
      │      shown. (Only 1 chat if chant went badly —    │
      │      Gregory keeps you late for "extra practice") │
      └──────────────► next session (or montage card) ────┘

   After session 10 → [FINALE]: the Big Performance,
   defection scenes, one final choice, ending screen.
```

**What the player does / sees / feels per phase:**

- **ARRIVE** — reads a short narration card (≤ 60 words). Sees the rehearsal room drift from community-hall to ritual-chamber across sessions. Feels the escalating dread/comedy.
- **CHANT** — watches the leader's pattern light up with syllables and key prompts, then reproduces it on the metronome. Sees per-note PERFECT/GOOD/MISS judgments and a session accuracy meter. Feels flow, then mild panic as patterns lengthen and speed up.
- **PUB** — picks chat partners, picks dialog lines. Sees friendship hearts fill and a one-line reaction. Feels like they're building something that will matter.

**Session length target:** ~80–100 seconds per playable session (≈ 45 s chant + 35–55 s reading/choices). Full run including finale and ending: **8–10 minutes.**

---

## 5. Inputs & controls

Desktop is primary. **Touch is viable** and supported: the chant uses 2–4 large tap zones and everything else is taps. No hover-dependent UI.

| Input (desktop) | Input (touch) | Action | Context |
|---|---|---|---|
| `J` | Tap zone 2 | Chant syllable **LA** | Chant phase |
| `K` | Tap zone 3 | Chant syllable **OH** | Chant phase |
| `L` | Tap zone 4 | Chant syllable **RA** | Chant phase (sessions 5+) |
| `H` | Tap zone 1 | Chant syllable **ZUL** | Chant phase (sessions 7+) |
| Hold key ≥ `holdBeats` beats | Hold tap zone | Sustained "gesture" note | Chant phase (sessions 7+) |
| `Space` / `Enter` / click | Tap anywhere | Advance narration / confirm | Cards, dialog |
| `1` `2` `3` / click option | Tap option | Choose dialog line / chat partner | Pub phase |
| `M` / click 🔇 icon | Tap 🔇 icon | Mute/unmute all audio | Always |
| `P` / `Esc` / click ⏸ icon | Tap ⏸ icon | Pause (chant pattern restarts on resume) | Always |
| `R` (on pause or end screens only) | Tap "Restart" button | Restart run from session 1 | Pause / end screens |

Notes: key presses during the leader's demo are ignored (no penalty). Every screen shows its live controls in a footer strip. No other inputs exist.

---

## 6. Game elements

### 6.1 The protagonist (narrator)

Never seen on screen (first person). Voice: relentlessly positive, socially hungry, immune to subtext. All narration cards are written in this voice. No config keys; pure content.

### 6.2 The chant system (core toy)

- **Pattern** = sequence of notes; each note = (syllable/key, beat index, hold length). Patterns are authored per session (see 8) with seeded random variation of syllable order (`?seed=`).
- **Leader demo:** notes light up in sequence at the session BPM, each playing its synth syllable tone. Player watches.
- **Count-in:** `countInBeats` (4) metronome ticks with a "3, 2, 1, SING" overlay.
- **Player turn:** a beat cursor sweeps a horizontal note strip. Player must hit each note's key within the timing window of its beat:
  - **PERFECT:** within ±`timingPerfectMs` (90 ms) → `scorePerfect` (100 pts)
  - **GOOD:** within ±`timingGoodMs` (180 ms) → `scoreGood` (60 pts)
  - **MISS:** outside window, wrong key, or no press → 0 pts. Wrong-key presses consume nothing else; the nearest unjudged note in that lane within the GOOD window is judged, otherwise the press is a stray (small "off-key" squawk, no score change).
  - **Hold notes:** press within window and hold for ≥ 75% of the hold duration → judged by the press timing; early release downgrades one tier.
- **Pattern accuracy** = points / max points. **Session accuracy** = mean of its patterns. **Standing** = running mean of all session accuracies × 100 (shown as "Choir Standing" 0–100).
- Placeholder art: notes are colored rectangles on a strip, one row per key, syllable text inside. Final art: parchment strip, notes as illuminated-manuscript neumes.

### 6.3 High Cantor Gregory (the leader)

- Runs every chant; delivers escalation lines ("This week we add *intent*"). **Not befriendable** — his pub seat is always "reserved for reflection."
- Placeholder: tall purple rectangle with a taller hood-triangle. Final: gaunt, beatific smile, lanyard that says HIGH CANTOR over a "HELLO MY NAME IS Greg" sticker.
- Config: `standingSecretThreshold` gates his secret-ending defection (see 7).

### 6.4 The six cultists (befriendable NPCs)

Shared mechanics: each has a **friendship score** (0–4, shown as hearts). Each pub chat presents 1 of the cultist's 2 authored scenes (in order); the player picks 1 of 3 lines: the **best** line gives `friendCorrect` (+2), the **okay** line `friendNeutral` (+1), the **bad** line `friendWrong` (+0, comedic rebuff). A cultist is **BEFRIENDED** when friendship ≥ `befriendThreshold` (3). Befriended cultists **always defect at the finale** (deterministic — see 7). Placeholder art: colored rectangle + name label + emoji. Max 2 chats per cultist per run (they run out of scenes; further picks are disabled).

Scene format below: *setup* → options **[A best / B okay / C bad]** with the cultist's reaction.

**1. Doug Petrakis** — 40s, rec-league ping pong zealot, owns four paddles. Emoji 🏓, color orange. *The tutorial-friendly easy befriend.*

- **Scene 1 (darts at the pub):** Doug: "You play ping pong? Rec center's got league night Thursdays. Nobody from choir ever comes. 'Obligations,' they say."
  - **[A]** "I'd play. What's your paddle situation?" → Doug lights up, monologues about rubber thickness. (+2)
  - **[B]** "Maybe after the big performance?" → "Yeah… after. Everyone says after." (+1)
  - **[C]** "Ping pong is just tiny tennis." → Doug stares. "Get out of my pub." (He's joking. Mostly.) (+0)
- **Scene 2 (garage, ping pong table under a tarp):** Doug: "I keep the table ready. In case, y'know, people ever choose… other hobbies."
  - **[A]** "Rally right now. Loser buys the next round." → You play. He cries a little. (+2)
  - **[B]** "It's a nice table." → "It's a TOURNAMENT table." (+1)
  - **[C]** "Shouldn't we practice the ZUL section instead?" → Doug quietly re-tarps the table. (+0)

**2. Brenda Kowalczyk** — 50s, potluck powerhouse, embroiders all the robes by hand. Emoji 🧵, color teal.

- **Scene 1 (pub, embroidery hoop out):** Brenda: "Each robe takes forty hours. The big eye on the back? The thread keeps… moving."
  - **[A]** "Forty hours?! Show me the stitchwork." → She beams, shows you a French knot "pupil." (+2)
  - **[B]** "They're very comfortable." → "Comfort was priority two." (+1)
  - **[C]** "Couldn't we just buy robes online?" → A long, wounded silence. (+0)
- **Scene 2 (she brought a casserole to the pub; the pub allowed it):** Brenda: "Tater-tot hotdish. I'm doing catering for the… barbecue. Just appetizers. The main course handles itself."
  - **[A]** "Teach me the recipe. I want to contribute." → "FINALLY someone asks." (+2)
  - **[B]** "This is delicious." → "I know." (+1)
  - **[C]** "I'm more of a salad person." → She writes something in a small book. (+0)

**3. Agnes Thorpe** — 74, knitting needles, in the "choir" since 1983, den mother. Emoji 🧶, color lavender.

- **Scene 1 (knitting you a scarf):** Agnes: "Here, dear. I knit one for every new member. The pattern is traditional. Don't look at it too long."
  - **[A]** "Nobody's knitted me anything since my gran. Thank you, Agnes." → She pats your hand. "You remind me of the last one." (+2)
  - **[B]** "What's this symbol?" → "A snowflake, dear." It is not a snowflake. (+1)
  - **[C]** "I don't really wear scarves." → The needles stop. The pub goes quiet. (+0)
- **Scene 2 (photo album):** Agnes: "That's the choir in '86. And '99. And 2013. Funny — the town keeps needing a new one."
  - **[A]** "Tell me about the old members. You clearly miss them." → She talks for ten minutes. It's lovely. Alarming, but lovely. (+2)
  - **[B]** "Great photos!" → "Kodak. You can't beat film." (+1)
  - **[C]** "Why is everyone in the photos blurry?" → "Cameras were different then, dear." (+0)

**4. Marcus Yee** — 30s, accountant, cult treasurer, visibly stressed. Emoji 📊, color slate blue.

- **Scene 1 (spreadsheet on a laptop at the pub):** Marcus: "Do you know how hard it is to get event insurance for an 'open-flame community gathering, attendance: everyone'? I've called nine providers."
  - **[A]** "Walk me through the budget. Maybe I can help." → "You'd… help? Nobody helps with the admin." He orders you a beer. (+2)
  - **[B]** "That sounds stressful." → "It IS stressful. Thank you." (+1)
  - **[C]** "Just don't get insurance." → "Don't—? DON'T GET—? We are NOT an unlicensed apocalypse, we are a REGISTERED NONPROFIT." (+0)
- **Scene 2 (receipts):** Marcus: "Robe thread: deductible. Candles: deductible. 'Ceremonial dais, load-bearing': the auditor flagged that one."
  - **[A]** "You keep this whole thing running, don't you? They're lucky to have you." → He removes his glasses. "No one has ever said that." (+2)
  - **[B]** "You can deduct candles?" → "Category: workplace lighting." (+1)
  - **[C]** "Have you considered crypto?" → He puts his glasses back on to glare properly. (+0)

**5. Tiffany Marsh** — 20s, joined for the crystals, half-suspects, stays for the vibes. Emoji 🔮, color pink.

- **Scene 1 (arranging crystals on the bar):** Tiffany: "Okay so between us? The energy in that circle is INTENSE. Like, not yoga-retreat intense. But the amethyst likes it, so."
  - **[A]** "What does the amethyst think of ME?" → She holds it to your forehead. "It says you're a good listener." You are now besties. (+2)
  - **[B]** "The circle IS pretty intense." → "RIGHT?" (+1)
  - **[C]** "Crystals don't do anything." → "Wow. The rose quartz literally just dimmed." (+0)
- **Scene 2 (tarot deck):** Tiffany: "I pulled cards about the performance. The Tower, the Moon, and a card I don't recognize that's just… teeth. Anyway, want a reading?"
  - **[A]** "Deal me in. And what's YOUR card say you should do next Tuesday?" → She goes quiet. "…Maybe something else, honestly." (+2)
  - **[B]** "Sure, one card." → "The Fool! That's so you." (+1)
  - **[C]** "Tarot's not real." → She fans the teeth card at you. (+0)

**6. Keith Borowski** — 40s, enormous, nearly silent, homebrews beer in growlers labeled "COMMUNION." Emoji 🍺, color brown.

- **Scene 1 (slides you a growler):** Keith: "…Made this." (It's excellent.)
  - **[A]** Drink it, then ask about his fermentation setup in detail. → Keith speaks four consecutive sentences. Everyone at the pub turns to look. (+2)
  - **[B]** "Cheers, Keith." → He nods 4% more warmly than usual. (+1)
  - **[C]** "I don't drink beer." → He takes the growler back with immense gentleness, which is worse. (+0)
- **Scene 2 (his brew shed):** Keith: "…Batch for the barbecue. Big batch." (gestures at a 200-liter tank) "…Too big, maybe. For after."
  - **[A]** "Keith, if there's beer left over, we'll just need more nights like this one." → Keith smiles. It's like sunrise on a cliff face. (+2)
  - **[B]** "It smells amazing in here." → Nod. (+1)
  - **[C]** "Will the elder god drink beer?" → Keith looks at the tank. Then at you. Then at the tank. (+0)

### 6.5 Zones / screens as elements

- **Rehearsal room:** background that escalates per session (folding chairs → candles → circle markings → dais). Placeholder: background color shifts from warm beige toward deep purple, plus a one-line stage-direction caption.
- **The pub ("The Thirsty Scholar"):** social phase backdrop. Cultist portraits sit in a row; befriended ones get a beer mug badge.
- **Friendship HUD:** heart pips under each portrait (see 11).

---

## 7. Rules, win & lose conditions

### Session rules

- 4 patterns per playable session. No fail-out mid-session: all patterns always play (comedy game; the punishment is social, not game-over).
- If session accuracy ≥ `praiseThreshold` (70%): the ARRIVE card of the next session includes praise flavor and the pub phase proceeds normally (2 chats).
- If session accuracy < `lateRehearsalThreshold` (40%): Gregory keeps you late for "remedial resonance" — you get **1 pub chat instead of 2** that night. This is the skill↔social coupling: sing well to make friends faster.
- Between 40% and 70%: 2 chats, neutral flavor.

### Finale (after session 10)

Order of operations, exact:

1. **Roll call card:** each befriended cultist gets a one-line waver ("Doug is holding his robe and a paddle").
2. **Performance chant, pattern 1 of 3** (8 notes, `bpmFinale`).
3. **Defection scene A:** befriended cultists 1–3 (in fixed order Doug, Tiffany, Keith, if befriended) slip out. Non-befriended members stay, chanting.
4. **Performance chant, pattern 2 of 3.**
5. **Defection scene B:** remaining befriended cultists (Marcus, Brenda, Agnes order) slip out. Then **THE CHOICE** — a defector (highest-friendship cultist; Doug if tied) pokes their head back in: *"Psst. We're getting beers and playing ping pong. Skip the encore?"* Player picks:
   - **JOIN THEM** — you leave before pattern 3. (Narrator: "An encore is basically optional.")
   - **KEEP SINGING** — you perform pattern 3. Your pattern-3 accuracy is `finaleAccuracy`.
   - If **zero** cultists were befriended, THE CHOICE is skipped (nobody invites you) and you always sing pattern 3.
6. **Ending computed** from D = number of befriended (defected) cultists, the choice, and `finaleAccuracy`.

### Ending matrix (this is the win/lose table)

| # | Conditions (checked top-to-bottom, first match wins) | Ending | Tone |
|---|---|---|---|
| E1 | JOIN and D ≥ `defectMid` (3) | **"League Night"** — with ≤ 3 voices left the ritual collapses; the whole gang (you + defectors) plays ping pong; town saved; narrator: "Best choir ever. We didn't even sing." | Best ending |
| E2 | JOIN and D ≤ 2 | **"Designated Driver"** — you and 1–2 friends are at the pub when the sky over town turns a fun color. Narrator assumes fireworks. Friends saved; town not. | Dark comedy |
| E3 | SING and D = 6 and Standing ≥ `standingSecretThreshold` (80) | **"Even Gregory"** (secret) — alone, Gregory hears your (excellent) solo voice crack on ZUL, sighs, de-hoods, and walks to the pub with you. 7 people, one table, doubles bracket. | Secret best |
| E4 | SING and D ≥ `defectHigh` (5) | **"Solo"** — just you and Gregory. Not enough voices; fizzle; Gregory admits everything; you invite him to league night; he "will think about it." Town saved. | Warm |
| E5 | SING and 3 ≤ D ≤ 4 | **"Schism"** — the half-strength ritual summons a confused, labrador-sized elder godling that looks around, shrugs, and leaves. Everyone goes for beers, embarrassed. Town saved-ish. | Absurd |
| E6 | SING and D ≤ 2 and finaleAccuracy ≥ `finaleAccuracyThreshold` (70%) | **"The Barbecue"** — full-voice summon succeeds. Screen fades to warm orange. Narrator, delighted: "The WHOLE town showed up. What a turnout." | Worst ending, funniest |
| E7 | SING and D ≤ 2 and finaleAccuracy < 70% | **"Pitchy"** — your flubbed ZUL detunes the summoning; it fizzles; the cult politely asks you to leave the choir. You're sad. Town saved by your mediocrity. | Ironic |

**Win/lose framing:** there is no game-over; every run ends in one of 7 endings. The end screen labels each ending with "Town: SAVED / BARBECUED / SAVED-ISH" and "Friends made: N/6", plus an endings-collected tally (`localStorage`), which is the replay hook.

**Edge cases:**

- Pause during a player-turn pattern: the pattern **restarts from its demo** on resume (prevents pause-scumming the timing).
- Tab loses focus during chant: auto-pause, same restart rule.
- Two notes in different lanes on the same beat: not authored — pattern data never places simultaneous notes (validator asserts this).
- Key press exactly between two notes in the same lane: judged against the earlier unjudged note.
- All 6 befriended but Standing < 80: falls through E3 to E4 ("Solo") — the secret needs both.
- `finaleAccuracy` when player joins (E1/E2): not computed, not needed.

---

## 8. Difficulty & progression

Single authored ramp across the 6 playable sessions; no adaptive difficulty. All values in the config table (12).

| Fictional session | Playable? | BPM | Patterns × length | Keys in play | New wrinkle | ARRIVE red flag (narrator approves) |
|---|---|---|---|---|---|---|
| 1 | Yes | 90 | 4 × 4 notes | J, K (LA, OH) | Tutorial overlay on pattern 1 | "Everyone learned my name immediately. Great memory, this town." |
| 2 | Montage card | — | — | — | — | "Second week: they asked my blood type. For the group snack roster, presumably." |
| 3 | Yes | 95 | 4 × 5 | J, K | Patterns lengthen | "The warm-ups are more 'regimented' now. I respect a routine." |
| 4 | Montage card | — | — | — | — | "Missed nothing this week, they said. Just paperwork. And an oath." |
| 5 | Yes | 100 | 4 × 6 | J, K, L (+RA) | New syllable RA; robes appear | "ROBES! Hand-embroidered. So flowy. Very inclusive of all body types." |
| 6 | Montage card | — | — | — | — | "We practiced standing in a circle. For acoustics." |
| 7 | Yes | 105 | 4 × 6 (1 hold note each) | H, J, K, L (+ZUL) | Hold-note "gestures"; circle formation | "New syllable: ZUL. Doesn't appear in any language I know. Choir is so educational." |
| 8 | Montage card | — | — | — | — | "Gregory says my voice is 'the missing seventh resonance.' A COMPLIMENT!" |
| 9 | Yes | 110 | 4 × 8 (2 holds each) | All 4 | Longest patterns | "The candles are for ambience. The dais is for posture. The knife is ceremonial. Everything has a purpose here." |
| 10 | Yes | 120 | 4 × 8 (2 holds each) | All 4 | Dress rehearsal; full ritual room | "Next week: the BIG PERFORMANCE, then a barbecue for the whole town. The whole town, barbecued. I love this community." |
| Finale | Yes | 120 | 3 × 8 (2 holds each) | All 4 | Defections between patterns; THE CHOICE | (Roll-call card, see 7) |

Pattern authoring: each session has 4 authored pattern *shapes* (beat positions + hold placements); syllable assignment per note is shuffled by the seeded RNG within the session's key set, so runs feel fresh but difficulty is fixed. ⚑ (overridable: fully authored syllables would allow chant "melodies" with more character, at the cost of replay variety.)

Across-run progression: none mechanically; the endings-collected tally is the only meta.

---

## 9. Style & theme

**Visual style:** flat vector, thick 3px outlines, chunky rounded shapes — "community-theatre production of a cosmic horror." Characters are simple torso-up portraits (head shape + robe + one prop). Backgrounds are 3-layer flat color scenes. All art achievable as inline SVG by a non-artist.

**Palette (7 colors):**

- Parchment `#F4EAD5` (backgrounds, note strip)
- Ink `#2B2233` (outlines, text)
- Cult Purple `#4A2C6F` (robes, ritual accents, late-session ambience)
- Candle Orange `#E8963C` (highlights, PERFECT flash, fire)
- Blood Rust `#B3402F` (sigils, MISS flash, the eye on the robes)
- Beer Gold `#E9C46A` (pub warmth, friendship hearts, hold notes)
- Hedge Green `#7FB685` (GOOD flash, ping pong table, "town saved" stamps)

**Typography:** headings and narrator voice in Georgia/serif (small-town newspaper feel); UI labels and judgments in system sans (`system-ui`), bold, letter-spaced. Chant syllables in serif small-caps.

**Tone/mood:** wholesome on top, ominous underneath, never gory. The horror is always offscreen or administrative (Marcus's insurance calls). Rated "PG: Peculiar Gatherings."

**References:** *Untitled Goose Game*'s smug pastoral flatness × *Night in the Woods* pub chats × the "this is fine" dog, in a robe. Rhythm feel target: *Rhythm Heaven*'s call-and-response clarity.

**Placeholder art plan (M0–M1):** cultists are colored rectangles with name + emoji; rehearsal room is a background color per session; notes are rectangles with syllable text; hearts are `♥`/`♡` characters; endings are text cards. No image assets ever — final art is inline SVG.

---

## 10. Sound design

**Implementation:** Web Audio API directly (no library) ⚑ (overridable to Tone.js if scheduling gets hairy). All SFX synthesized in code — zero audio asset files. Chant timing uses `AudioContext.currentTime` lookahead scheduling (25 ms tick, 100 ms lookahead), never `setTimeout` for note times. Audio context is created/resumed only on the first user gesture (the Play button). **Mute toggle is P0**, persisted to `localStorage`.

**SFX event table:**

| Game event | Sound description (synthesized) | Priority |
|---|---|---|
| Metronome tick / count-in | Short woodblock click (filtered noise burst, 40 ms); count-in beat 4 pitched up | P0 |
| Leader demo note | Vowel-ish tone per syllable: square+lowpass, LA=C4, OH=E4, RA=G4, ZUL=F#3 (deliberately dissonant) | P0 |
| Player note PERFECT | Same syllable tone + bright triangle overtone, slight reverb tail | P0 |
| Player note GOOD | Syllable tone, plain, slightly detuned | P0 |
| Player note MISS / stray key | Dull "off-key squawk": sawtooth blip pitched −6 semitones, 80 ms | P0 |
| Dialog advance / choice select | Soft page-turn tick (noise sweep, 60 ms) | P0 |
| Friendship gained | Two-note beer-clink arpeggio (+1) or three-note (+2) | P0 |
| Ending sting | 2-second chord: major (saved), diminished (barbecued), suspended (schism) | P0 |
| Defection exit | Door creak (slow pitch-bent saw) + distant ping pong "tok" | P1 |
| Pub ambience | Low looped brown noise + occasional glass clink | P1 |
| Ritual drone (sessions 7+) | Very quiet detuned drone under the chant, gains volume per session | P1 |

**Music:** none in P0. P1: the ritual drone above doubles as the "score." No copyrighted or downloaded tracks, ever.

---

## 11. UI & screens

**Flow:** `Splash → Session (Arrive → Chant → Pub) ×6 with montage cards between → Finale → Ending → (Restart → Splash)`. Pause overlay reachable from any playing screen.

### Splash (mandatory)

- Title: **PERFECTLY NORMAL CHOIR** + one-liner: "Join the local choir. Make friends. Ignore the robes."
- Rules/goal, ≤ 5 bullets:
  - Repeat the leader's chant on the beat — J/K/L/H (or tap the zones).
  - Hit notes on time for PERFECT. Sing well or face extra rehearsal.
  - After rehearsal, chat with choir members at the pub. Pick lines they'll love.
  - Real friends have better things to do on performance night.
  - 7 endings. Try to keep the town un-barbecued. Or don't.
- Controls block (desktop keys + "touch: tap the zones/options").
- **Version number** (e.g. `v0.1.0`) bottom-right, sourced from the single `VERSION` constant also used by the debug overlay.
- One big **"JOIN THE CHOIR ♪"** button (this gesture unlocks audio). Mute icon also present.
- Endings-collected tally (e.g. "Endings found: 2/7") if `localStorage` has any.

### Session HUD (always visible during play)

Top bar: session label ("Rehearsal 5 of 10"), Choir Standing meter (0–100), mute ⏸/🔇 icons. During CHANT: pattern counter ("Pattern 2/4"), live accuracy %, judgment popups. During PUB: 6 portrait cards with heart pips (♥ filled per friendship point, "FRIEND!" badge at ≥ 3) and chats-remaining indicator ("Pick 2").

### Chant screen

Leader portrait top-center with speech bubble showing the demo; note strip across the middle (one row per key, beat cursor sweeping); key legend (H/J/K/L ↔ syllables) pinned under the strip; touch tap-zones as 2–4 large buttons along the bottom (also usable as a visual legend on desktop).

### Pub screen

Backdrop banner "The Thirsty Scholar"; portrait row (dimmed if out of scenes); after picking a partner: scene text panel + 3 option buttons labeled 1/2/3; reaction line + heart animation; then back to portrait row for chat 2 (if available).

### Montage card

Full-screen narration card with the fictional-session number and one red-flag line (table in 8). Single tap to continue.

### Ending screen

Ending title + 3–5 line vignette text; stamps: "TOWN: SAVED / BARBECUED / SAVED-ISH", "FRIENDS: N/6", "STANDING: NN"; endings-collected tally 7 slots (unfound = "???"); **Restart** button; mute icon.

### Pause overlay

"PAUSED — the circle waits." Resume / Restart / Mute buttons; note: "resuming restarts the current pattern."

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/config.js`; every value below lives there and nowhere else.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | "0.1.0" | string | Splash + debug overlay version display |
| `bpmBySession` | [90, 95, 100, 105, 110, 120] | BPM | Tempo of playable sessions 1..6 (fictional 1,3,5,7,9,10) |
| `bpmFinale` | 120 | BPM | Finale performance tempo |
| `patternsPerSession` | 4 | count | Chant patterns per rehearsal |
| `patternsFinale` | 3 | count | Finale patterns |
| `patternLengthBySession` | [4, 5, 6, 6, 8, 8] | notes | Notes per pattern per playable session |
| `patternLengthFinale` | 8 | notes | Notes per finale pattern |
| `holdNotesBySession` | [0, 0, 0, 1, 2, 2] | count/pattern | Hold notes per pattern per playable session |
| `holdBeats` | 2 | beats | Hold-note sustain length |
| `holdReleaseFraction` | 0.75 | ratio | Min held fraction before downgrade |
| `keysBySession` | [2, 2, 3, 4, 4, 4] | count | Active syllable keys per playable session |
| `timingPerfectMs` | 90 | ms | PERFECT window (±) |
| `timingGoodMs` | 180 | ms | GOOD window (±) |
| `scorePerfect` | 100 | pts | Points per PERFECT |
| `scoreGood` | 60 | pts | Points per GOOD |
| `countInBeats` | 4 | beats | Count-in before player turn |
| `praiseThreshold` | 0.70 | ratio | Session accuracy for praise flavor |
| `lateRehearsalThreshold` | 0.40 | ratio | Below this: only 1 pub chat that night |
| `pubChatsPerNight` | 2 | count | Default chats per pub phase |
| `friendCorrect` | 2 | pts | Best dialog option |
| `friendNeutral` | 1 | pts | Okay dialog option |
| `friendWrong` | 0 | pts | Bad dialog option |
| `befriendThreshold` | 3 | pts | Friendship needed to BEFRIEND (and defect) |
| `defectMid` | 3 | count | Min defectors for E1/E5 band |
| `defectHigh` | 5 | count | Min defectors for E4 |
| `standingSecretThreshold` | 80 | 0–100 | Standing gate for secret ending E3 |
| `finaleAccuracyThreshold` | 0.70 | ratio | E6 vs E7 split |
| `audioLookaheadMs` | 100 | ms | Web Audio scheduling lookahead |
| `audioTickMs` | 25 | ms | Scheduler tick interval |
| `inputLatencyOffsetMs` | 0 | ms | Global input calibration offset (debug-adjustable) |

**URL flags (all P0 for playtesting except as noted):**

- `?seed=12345` — seeds the RNG (syllable shuffles); same seed + same inputs = same run.
- `?debug=1` — overlay: FPS, current state name, session accuracy, friendship table, Standing, ending-matrix preview; cheat keys: `[`/`]` adjust `inputLatencyOffsetMs` ±10 ms, `F` set all friendships to 4, `A` force current pattern accuracy to 100%, `N` skip to next phase.
- `?session=N` — start at playable session N (1–6) with neutral state.
- `?finale=1&d=4&standing=85` — jump straight to the finale with D defectors and given Standing (ending-matrix testing).
- `?mute=1` — start muted.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules), DOM + inline SVG rendering, Web Audio API, zero-build.** One `index.html` plus `src/*.js` modules — deployable by copying the folder to GitHub Pages; no bundler, no framework, no runtime network calls. Rationale: the game is screens, text panels, portraits, and a single scrolling note strip — DOM/SVG handles all of it with CSS transitions for juice, and there are never more than ~40 animated elements (perf budget: ≤ 60 DOM nodes animating, no particles beyond 12 judgment popups — trivially 60 fps on a mid-range laptop). The only technically demanding part is rhythm timing, which is an audio-clock problem, not a rendering problem: Web Audio's `currentTime` with lookahead scheduling gives sub-5 ms scheduling accuracy, and input judgment compares `performance.now()` against the audio-clock-projected beat times. Canvas/Pixi would add nothing; Matter.js is irrelevant; Tone.js is held in reserve (⚑ see 10). Zero-build is chosen over Vite because there are no assets to bundle and no TS/JSX — the whole repo stays runnable by opening a static server on the folder.

---

## 14. Milestones

### M0 — Toy loop (the chant with rectangles)

**Goal:** prove the call-and-response chant is fun by itself.
**Deliverables:** `index.html` + judge + scheduler; one hardcoded session (4 patterns, 2 keys, 90 BPM); rectangle notes, text judgments, accuracy %; keyboard only; metronome + syllable beeps behind a click-to-start button.

- [ ] Leader demo plays with synced audio/visual note highlights.
- [ ] Player turn judges every press as PERFECT/GOOD/MISS with the config windows; pattern accuracy is displayed.
- [ ] A first-time player understands "watch, then repeat on the beat" within 60 seconds unprompted.
- [ ] Timing feels fair: a tester deliberately hitting on-beat scores ≥ 90% PERFECT; `?debug=1` latency offset keys work.
- [ ] `judge.js` runs headless under Node with unit tests for window edges and wrong-key handling.

**Proves:** the core toy. *If tapping along to LA-OH isn't satisfying here, stop — robes won't save it.*

### M1 — Real rules (the whole run)

**Goal:** full P0 ruleset: 6 sessions + montages, difficulty ramp, pub phase with all 6 cultists (all 12 scenes authored above), friendship, finale, all 7 endings.
**Deliverables:** state machine for the full flow; splash with rules/controls/version; HUD; pause/mute/restart; `localStorage` endings tally; all URL flags.

- [ ] A complete run from splash to an ending takes 8–10 minutes and never dead-ends.
- [ ] Chant accuracy gates pub chats (1 vs 2) per the thresholds.
- [ ] Befriended cultists defect at the finale; `?finale=1&d=…` reproduces every row E1–E7 of the ending matrix.
- [ ] Secret ending E3 requires D=6 AND Standing ≥ 80 (verified via debug flags).
- [ ] Splash shows title, 5-bullet rules, controls, version from the `VERSION` constant, and one Play button.
- [ ] `story.js` (friendship math + ending selection) is a pure module with unit tests covering the full matrix.

**Proves:** the friendship→defection→ending chain is legible and the run length is right.

### M2 — Feel

**Goal:** make it charming.
**Deliverables:** SVG portraits for 6 cultists + Gregory; per-session room escalation; full P0 SFX table; judgment popups, heart animations, screen-flash on PERFECT streaks (CSS, within the 12-popup budget); ending vignette cards with stamps; touch tap-zones verified on a phone.

- [ ] All P0 SFX fire on their events; mute persists across reload; audio only starts after a gesture.
- [ ] Sessions 1 vs 10 are visually unmistakable (beige hall → purple ritual chamber).
- [ ] A playtester laughs (or at least exhales through their nose) at ≥ 2 narration cards.
- [ ] Playable start-to-finish with touch only.

**Proves:** tone lands; obliviousness comedy reads.

### M3 — Playtest build

**Goal:** shippable static build + instrumentation.
**Deliverables:** deployed under `/games/local-choir/` on the static host; seed reproducibility verified; debug overlay complete; P1 items if time (defection door-creak, pub ambience, ritual drone, ending-specific stings).

- [ ] Same `?seed=` yields identical patterns across two machines.
- [ ] Cold load ≤ 1 s on a mid-range laptop; steady 60 fps during chant.
- [ ] `?debug=1`, `?session=`, `?finale=` all function on the deployed build.
- [ ] Five-person playtest run; answers to section 2's questions recorded.

**Proves:** ready to answer the fun hypothesis with real players.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is 2 pub chats per night the right pace to make D ≥ 5 achievable but not automatic? Knob: `pubChatsPerNight`, `befriendThreshold`.
2. **(non-blocking — resolve in playtest)** Are the timing windows (±90/±180 ms) right for keyboard + browser latency? Knobs: `timingPerfectMs`, `timingGoodMs`, `inputLatencyOffsetMs` with debug hotkeys.
3. **(non-blocking — resolve in playtest)** Does the montage-card compression read as "10 sessions," or does it feel like skipped content? If the latter, promote sessions 2/4/6/8 to short 2-pattern mini-rehearsals (knob: `patternsPerSession` per-session override).
4. **(non-blocking — resolve in playtest)** Should low chant accuracy have any effect on the finale beyond E6/E7 (e.g., Standing gating more endings)? Currently only the secret uses Standing; knob: `standingSecretThreshold`.
5. **(non-blocking — resolve in playtest)** Shuffled syllables vs fully authored chant melodies (⚑ in section 8). Toggle: author one fixed-syllable session behind `?authored=1` and compare.

No blocking questions. All decisions in this document are final for the prototype unless overridden.

---

## 16. Handoff notes for Fable

**Build order:** `judge.js` (pure timing judgment) → audio scheduler (`audio.js`: metronome + syllable synth + lookahead loop) → chant screen (demo → count-in → player turn) → `story.js` (friendship, Standing, ending matrix — pure functions) → session/state machine (`main.js`) → pub UI + dialog data → splash/HUD/pause/ending screens → SFX polish → SVG art.

**Keep headless-testable:** `judge.js` (`judge(noteTimeMs, pressTimeMs, cfg) → 'perfect'|'good'|'miss'`, plus lane/nearest-note resolution) and `story.js` (`applyChoice(state, cultistId, optionId)`, `chatsForAccuracy(acc)`, `computeEnding({defectors, choice, finaleAccuracy, standing}) → 'E1'..'E7'`) must import no DOM/audio. Unit-test the ending matrix exhaustively (all D 0–6 × choice × accuracy above/below × standing above/below) and the judgment window edges (±89/±90/±91 ms etc.). A tiny pattern validator should assert no simultaneous notes and that pattern data matches `patternLengthBySession`/`holdNotesBySession`.

**Repo / deploy layout (the folder IS the deployable output — no build step):**

```
public/games/local-choir/
  design.md            ← this document
  index.html           ← splash + screen containers, loads src/main.js as module
  src/
    config.js          ← CONFIG object + VERSION (section 12, verbatim)
    main.js            ← state machine, screen routing, URL flags
    judge.js           ← headless timing judgment
    story.js           ← headless friendship/Standing/ending logic
    audio.js           ← Web Audio scheduler, synth SFX, mute
    ui.js              ← DOM/SVG rendering helpers, HUD, popups
    rng.js             ← seeded PRNG (mulberry32)
    data/
      cultists.js      ← 6 cultists, 12 scenes, all dialog from section 6.4
      sessions.js      ← per-session pattern shapes, ARRIVE/montage card text (section 8)
      endings.js       ← 7 ending vignettes + stamps (section 7)
  test/
    judge.test.js      ← run with `node --test`
    story.test.js
```

**Reminders:** prove the loop with rectangles and beeps before touching SVG art — M0's chant must be fun naked. Ship every milestone runnable. Never schedule notes with `setTimeout`; the audio clock is truth. Audio starts only after the Play gesture. All dialog and narration text in this document is final copy — paste it, don't paraphrase it.
