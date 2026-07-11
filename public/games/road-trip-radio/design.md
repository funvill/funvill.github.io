# Road Trip Radio — Game Design Document

> Source idea: [Game Idea 14 - Road Trip Radio (Theme: Road trip)](/game-idea-14-road-trip-radio-theme-road-trip)

## 1. Title & one-liner

**Working title:** Road Trip Radio

**Alternates:** Punch Buggy FM, Shotgun Rules, Dial Fight, Backseat Bandits, Static Cling

**One-sentence description:** A same-screen party game where 2–4 players in the back seat of a car battle through road-trip mini-games for control of the radio, while keeping one eye on the side windows for the VW Bug.

**Genre:** Local-multiplayer party game / mini-game collection.

**Elevator pitch:** You and your friends are crammed in the back seat of a car on an endless highway, and nobody can agree on the radio station. So you settle it the only fair way: mini-games. The shared screen *is* the car — the mini-game plays out on the windshield, but the side windows keep scrolling with passing scenery, and if you're the first to spot the yellow VW Bug drive by, you get to "punch buggy" everyone else and freeze them mid-game. Win a round and you control the dial: pick the station, set the vibe, and the whole game re-skins to your music until someone takes it from you.

**Adaptation note (required by static-hosting constraint):** The source idea is a Jackbox-style game (shared screen + phones as controllers). This prototype adapts it to **same-screen local multiplayer on one shared keyboard** — 2–4 human players sit at one machine, each with a small dedicated key cluster, playing simultaneously (buzzer games) or in turns (typing games). A single human can play against 2 simple AI bots. This preserves the fun hypothesis (competing for the radio while watching the windows) without any server. ⚑ (overridable — the alternative was pure hot-seat pass-the-keyboard, rejected because the window-spotting meta-game only works when everyone watches at once.)

---

## 2. Fun hypothesis

**The question this prototype answers:** *Is split attention fun — does layering a "watch the side windows for the VW Bug" meta-game on top of a competitive mini-game create delightful panic, and does winning control of the radio vibe feel like a prize worth fighting for?*

Everything in P0 serves this: the car frame with live side windows, two contrasting mini-games (one reflex, one verbal), the punch-buggy interrupt, and the station-picker reward.

**Playtest questions:**
1. Did you ever miss something in the mini-game because you were watching the side window (or vice versa)? Did that feel funny or unfair?
2. When you won and picked the station, did you care which one you picked? Would you fight harder to keep control of it?
3. Did getting punch-buggied make you laugh or make you want to quit?
4. Which mini-game did you want to replay — the buzzer game or the word game?
5. Could you tell what your keys were without asking?

---

## 3. Design pillars

1. **The car is the stage.** Every screen lives inside the car interior. The side windows never stop scrolling, even during menus. Cut anything that breaks the fiction of being on a road trip.
2. **Split attention is the game.** The mini-game demands focus; the windows reward peripheral vision. Both must be worth watching at all times during play.
3. **The radio is the trophy.** Winning changes the music, the palette tint, and the DJ chatter. Control of the vibe must be visible and audible every second.
4. **Ten seconds to understand.** Every mini-game is explainable in two short sentences shown before it starts. If a rule needs a third sentence, cut the rule.

---

## 4. Core game loop

**Session target:** one match = 5 rounds ≈ 7 minutes.

```
        ┌──────────────────────────────────────────────────┐
        │                                                  │
        ▼                                                  │
  [SPLASH] ─▶ [SEAT PICK] ─▶ [ROUND INTRO] ─▶ [MINI-GAME]  │
                                 ▲    2s        60–90s     │
                                 │                 │       │
                                 │          (VW Bug may    │
                                 │           appear in a   │
                                 │           side window)  │
                                 │                 ▼       │
                                 │          [ROUND RESULT] │
                                 │                 │       │
                                 │                 ▼       │
                                 └──── [STATION PICK] ─────┤
                                       winner, 10s          │
                                                  after round 5
                                                  ▼
                                          [MATCH RESULT] ─▶ back to SPLASH
```

**Phases:**

| Phase | Player does | Player sees | Player feels |
|---|---|---|---|
| Splash | Reads rules, picks player count, presses Space | Car exterior at a gas station, title on a billboard, rules card | "I get it, let's go" |
| Seat pick | Each player taps their buzz key to claim a seat | Back-seat view; seats light up in player colors | Ownership of "my key, my color" |
| Round intro | Reads 2-sentence rule card, 3-2-1 countdown | Windshield shows the mini-game title card; radio DJ text intro scrolls on the dash | Anticipation |
| Mini-game | Plays (buzz or type) while glancing at side windows | Mini-game on the windshield; scenery + occasional VW Bug in side windows; scores on HUD | Split-attention panic (the core feeling) |
| Round result | Watches | Winner's seat glows; DJ text one-liner; scores update | Triumph / revenge motivation |
| Station pick | Winner presses 1–4 to pick a station | Four station cards on the dash radio; palette + music preview on hover | The prize: "my car now" |
| Match result | Reads final standings, presses Space to restart | Car pulls into a diner; podium of seats | Closure, "one more run" |

Round order in P0 alternates automatically: I Spy → Word Chain → I Spy → Word Chain → I Spy. ⚑ (overridable — source idea says the winner picks the next *game*; with only 2 P0 games that choice is dull, so winner picks the *station* instead. Winner-picks-game returns as P1 when a third game exists.)

---

## 5. Inputs & controls

Desktop keyboard only for P0. **Touch is not viable for P0** — four simultaneous players on one keyboard cannot map to touch, and the typing game needs a physical keyboard. Single-player-vs-bots touch support is P2 (tap zones for buzz/buggy, on-screen keyboard for Word Chain).

Keys are spread across the keyboard to avoid ghosting on cheap keyboards (max 2 keys per player, different rows).

| Input | Player | Action | Context |
|---|---|---|---|
| `A` | P1 | Buzz | I Spy: claim the current prompt |
| `F` | P2 | Buzz | " |
| `J` | P3 | Buzz | " |
| `L` | P4 | Buzz | " |
| `1` | P1 | Punch buggy | Any mini-game: claim a visible VW Bug |
| `2` | P2 | Punch buggy | " |
| `3` | P3 | Punch buggy | " |
| `4` | P4 | Punch buggy | " |
| `A–Z`, `Backspace`, `Enter` | active player only | Type / erase / submit word | Word Chain, on your turn |
| `1`–`4` | round winner only | Select station | Station-pick screen |
| `Space` | anyone | Start / advance / claim seat | Splash, seat pick, result screens |
| `Esc` | anyone | Pause overlay (Resume / Mute / Restart match / Quit to splash) | Anywhere |
| `M` | anyone | Toggle mute | Anywhere except during Word Chain typing (M is a letter; use the Esc overlay there) |

Notes:
- Buzz keys (`A F J L`) are letters, but no mini-game uses buzz and typing at the same time, so there is no conflict.
- Punch-buggy keys are digits so they never collide with Word Chain typing.
- Every key above appears on the splash controls card and on each player's seat tag in-game.

---

## 6. Game elements

### 6.1 The car frame (always on screen)

| Element | Placeholder (M0) | Final (M2) | Behavior | Config keys |
|---|---|---|---|---|
| Car interior | Dark grey rectangles for dash, pillars, seat backs | Flat-vector interior, thick outlines, rear-view mirror with googly eyes of the "driver" | Static frame; windshield area (center 60% of stage width) hosts the mini-game; two side windows (18% each) show scenery | — |
| Side-window scenery | 3 parallax strips of colored rectangles | Sky gradient, distant hills, mid billboards/trees, near fence posts | Scrolls right→left continuously at `sceneryPxPerSec` with parallax factors 0.2 / 0.5 / 1.0; never pauses, even in menus | `sceneryPxPerSec` |
| Passing cars | Colored rounded rectangles | 6 flat-vector car silhouettes in random dull colors | Spawn in a random side window every `carSpawnMinS`–`carSpawnMaxS`, cross the window in ~1.5s | `carSpawnMinS`, `carSpawnMaxS` |
| **VW Bug** (meta-game) | Bright yellow rounded rectangle with a circle roof | Unmistakable yellow Beetle silhouette, slightly bouncing | Spawns in a random side window during mini-games only; visible for `bugVisibleMs`; next spawn `bugCooldownMinS`–`bugCooldownMaxS` after the last; never spawns in the final `bugNoSpawnTailS` seconds of a round | `bugVisibleMs`, `bugCooldownMinS`, `bugCooldownMaxS`, `bugNoSpawnTailS` |
| Dash radio | Text label | Chunky radio face with glowing dial in station color | Shows station name + fake "now playing" ticker + DJ one-liners between rounds | — |
| HUD score strip | Text row | Seat-back tags in player colors | Always shows per-player: round wins (★), match points, frozen state (❄ + countdown) | — |

### 6.2 Punch Buggy (meta-game, P0)

- While a VW Bug is visible in a side window, the **first** player to press their digit key claims it. All **other** players are frozen for `freezeMs` (input ignored; a frost overlay covers their seat tag and, in Word Chain, their typing).
- Pressing your digit key when **no** Bug is visible freezes **you** for `falseBuggyPenaltyMs`.
- A claimed or expired Bug ends that spawn; only one Bug exists at a time.
- Freeze effects per game: in I Spy, frozen players cannot buzz. In Word Chain, a frozen active player cannot type **and their turn timer keeps running** (this is intentional and cruel; it is the punch).
- Claiming a Bug also awards `bugPoints` match points.

### 6.3 Radio stations (P0: 4)

Each station = generative music loop + accent color + DJ text personality. Winner of each round picks the station; it plays through the next round.

| # | Station | Vibe | Music loop (generative, Web Audio) | Accent hex | DJ text tone |
|---|---|---|---|---|---|
| 1 | **KRSH "The Wreck"** | Punk/rock | 160 BPM, driving kick-snare, distorted square-wave power chords (2-bar loop) | `#E63946` | Screaming hype ("YOU'RE LISTENING TO THE WRECK, NOW GO HURT SOMEBODY") |
| 2 | **Disco Dust 101** | Disco | 118 BPM, four-on-floor, octave-bouncing bass, hat offbeats | `#B565D8` | Smooth, self-absorbed |
| 3 | **Coyote Country** | Country | 96 BPM, brushed snare, walking triangle-wave bass, major pentatonic plucks | `#D9A441` | Folksy, tells bad jokes |
| 4 | **Night Drive FM** | Synthwave | 84 BPM, gated snare, sawtooth pad drone, arpeggio | `#5E60CE` | Whispery late-night monotone |

Station change: 300ms of white-noise static burst, dial glow crossfades to the new accent color, scenery tint shifts (see §9). DJ lines are canned text strings (12 per station), shown on the dash ticker between rounds — **no TTS, no voice audio** in P0.

### 6.4 Mini-game 1 (P0): "I Spy Highway" — simultaneous buzzer game

**Pitch card (shown before round):** *"I spy something… First to buzz while a matching object is in the windshield scores. Wrong buzz costs you."*

- The windshield shows roadside **objects** scrolling right→left at `ispyObjectPxPerSec`, spawned every `ispySpawnMinMs`–`ispySpawnMaxMs`, max `ispyMaxObjects` on screen.
- **Object catalog (24 types), each with fixed attributes** (color, category, name/starting letter). Placeholder: colored shape + text label. Final: flat-vector icon.

  | Object | Color | Category | | Object | Color | Category |
  |---|---|---|---|---|---|---|
  | barn | red | building | | cow | white | animal |
  | fire truck | red | vehicle | | cloud | white | nature |
  | apple stand | red | food | | windmill | white | building |
  | stop sign | red | sign | | school bus | yellow | vehicle |
  | blue car | blue | vehicle | | sunflower | yellow | nature |
  | lake | blue | nature | | banana stand | yellow | food |
  | water tower | blue | building | | road sign | yellow | sign |
  | mailbox | blue | object | | tractor | green | vehicle |
  | pine tree | green | nature | | cactus | green | nature |
  | billboard | green | sign | | melon cart | green | food |
  | horse | brown | animal | | log cabin | brown | building |
  | dog | brown | animal | | hay bale | brown | object |

- A **prompt** shows at the top of the windshield: `"I spy something…"` + one attribute. Attribute type is weighted: color 40%, category 30%, starting letter 30% (letter prompts use the object's display name, e.g. "starting with B" → barn, banana stand, billboard, blue car).
- The spawner **guarantees** at least one matching object enters the windshield between `ispyGuaranteeMinS` and `ispyGuaranteeMaxS` after each prompt starts (if random spawning hasn't already produced one).
- **Buzzing:** a player presses their buzz key.
  - If ≥1 matching object is currently fully inside the windshield: **+`ispyCorrectPoints`**, the matched object flashes in the buzzer's color and despawns, prompt resolves; next prompt after `ispyPromptGapMs`.
  - If no matching object is visible: **−`ispyWrongPoints`** (score floors at 0) and that player is locked out from buzzing for `ispyLockoutMs`.
  - Buzzes are processed in browser input-event order; the first correct buzz wins the prompt, later buzzes on the same prompt are ignored (no penalty) for 200ms after resolution.
- **Round length:** `ispyRoundS` (60s). Highest score wins the round.
- **Tie at 0:00:** sudden death — one extra prompt, only tied players may buzz, first correct buzz wins; a wrong buzz eliminates you from sudden death. Repeat with new prompts until one winner.
- **Difficulty curve within the round:** at 30s remaining, prompt gap `ispyPromptGapMs` drops by 30% and object speed increases 20% (both derived, no extra keys).
- **AI bot behavior:** when a matching object is visible, a bot buzzes after a normally-distributed delay (mean `botIspyReactMeanMs`, sd `botIspyReactSdMs`); per prompt there is a `botIspyFalseBuzzPct` chance it instead buzzes wrongly at a random moment. Bots claim the VW Bug with probability `botBugSpotPct`, reacting `botBugReactMs` after spawn.

### 6.5 Mini-game 2 (P0): "Word Chain: Mile Marker Mouthful" — turn-based typing game

**Pitch card:** *"Type a word starting with the last letter of the previous word. No repeats. Run out of time twice and you're out of the car."*

- Turn order: seat order (P1→P4), skipping eliminated players, looping.
- The game seeds the chain with a random starter word from the dictionary, displayed large on the windshield; the required letter is its last letter.
- **On your turn:** the whole keyboard is yours. Type a word, `Backspace` to correct, `Enter` to submit. Turn timer: `wcTurnS` (12s), shown as a shrinking fuel gauge.
- **A submission is valid iff:** in the bundled dictionary, AND starts with the required letter, AND length 3–12, AND not already used this round. Valid → the word slides onto a chain of "mile marker" signs, the last letter becomes the new required letter, +`wcWordPoints` match points, next player's turn.
- **Invalid submission:** error buzzer, input clears, timer keeps running — try again.
- **Timer expires:** you take a **strike** (your seat tag cracks), the required letter stays, next player's turn. `wcStrikes` (2) strikes = eliminated (your window rolls up).
- **Win:** last player standing wins the round.
- **Round cap:** `wcRoundCapS` (180s). If the cap hits with 2+ players alive: fewest strikes wins; tie → most valid words this round; tie → lowest average submit time. (Deterministic, no extra play needed.)
- **Dictionary:** a bundled JSON word list of ~20,000 common English words, lowercase, 3–12 letters, curated so that **every letter of the alphabet has ≥100 words starting with it** (so no ending letter is a dead end). Shipped as a static file, loaded at boot, held in a `Set`.
- **Punch buggy interaction:** the Bug still spawns during Word Chain. A frozen active player cannot type for `freezeMs` while their turn timer keeps draining. Spectating players punch-buggy with their digit keys as usual (digits never appear in words, so no input conflict).
- **AI bot turn:** the bot "types" a valid unused word letter-by-letter (120ms/keystroke) after a thinking delay uniform in `botWcThinkMinS`–`botWcThinkMaxS`; with probability `botWcTimeoutPct` it stalls and takes the strike instead. Bots pick from the 2,000 most common words in the list so their vocabulary feels human.

### 6.6 Players & bots

| Element | Looks | Behavior | Config |
|---|---|---|---|
| Player seat | Seat-back tag in player color (P1 `#FF8C42`, P2 `#3AAFA9`, P3 `#B565D8`, P4 `#FFD166`) with key labels | Holds score, strikes, frozen state | — |
| AI bot | Same seat tag with sunglasses icon + name (BOT RANDY, BOT CAROL, BOT DALE) | Fills empty seats in 1-human games (2 bots auto-added); optional otherwise via `?bots=N` | `bot*` keys above |

---

## 7. Rules, win & lose conditions

**Match structure:** `matchRounds` (5) rounds. Each round is one mini-game with one **round winner** (★).

**Match victory:** most ★ after round 5. Tiebreak 1: most match points (I Spy points + Word Chain word points + Bug claims). Tiebreak 2: sudden-death I Spy prompt among tied players (as in §6.4).

**Match points ledger (for tiebreak and end-screen flavor):**
- I Spy: correct buzz +2, wrong buzz −1 (floor 0)
- Word Chain: each valid word +1
- Punch Buggy claim: +1

**Round end:** freeze all input for 1s, winner's seat glows, DJ one-liner plays on the ticker, then station pick (winner presses `1`–`4`, 10s timeout keeps the current station), then next round intro.

**Edge cases (decided):**
- Timer expires mid-buzz animation (I Spy): buzzes with an event timestamp before 0:00 count; the resolution animation may play into the result screen.
- Bug visible when the round timer hits 0: the Bug despawns unclaimed; digit presses after 0:00 do nothing.
- Player is frozen when their Word Chain turn starts: turn starts anyway; timer runs; freeze expires on schedule.
- Two buzz keys in the same event-loop tick: impossible in practice (the browser serializes keydown events); processed strictly in event order.
- All players eliminated in Word Chain: cannot happen — elimination is sequential; when one player remains they win instantly.
- Winner disconnects from reality and never picks a station: 10s timeout, current station persists.
- Pause (`Esc`) during a Bug spawn: game sim fully freezes including the Bug's visibility timer; scenery keeps scrolling (pillar 1) but spawn/despawn clocks pause.

---

## 8. Difficulty & progression

Single tuned difficulty for the prototype — no menus, no levels. Challenge modulates within rounds only:

- I Spy accelerates at the 30s mark (§6.4).
- Word Chain naturally hardens as common words get used up (the no-repeat rule is the difficulty curve).
- Bug spawns are equally likely all match; the meta-game's difficulty is the split attention itself.

All modulation is driven by the config table (§12) so playtesting can retune without code changes. Cross-match progression (unlockable stations, pit-stop souvenirs) is P2.

---

## 9. Style & theme

**Visual style:** flat vector, thick 4px dark outlines, rounded corners everywhere, zero gradients except the sky. Think airline-safety-card people and Kurzgesagt props. Everything chunky and readable at a glance from the couch.

**Base palette:**

| Use | Hex |
|---|---|
| Car interior / outlines | `#1F2430` |
| UI cream / text plates | `#F9F5EB` |
| Sky day | `#8ED1C6` |
| Road / asphalt | `#3A3F4B` |
| VW Bug yellow (reserved — nothing else may be this color) | `#FFD400` |
| Danger / wrong buzz | `#E63946` |

**Station tinting:** the active station's accent hex (§6.3) colors the radio dial glow, HUD highlights, and a 12%-opacity overlay wash on the scenery (Night Drive FM also darkens the sky to `#2B2D5C` and turns on headlight cones — this is the one scripted scenery variant, P1).

**Player colors:** P1 `#FF8C42`, P2 `#3AAFA9`, P3 `#B565D8`, P4 `#FFD166` (Bug yellow `#FFD400` is deliberately distinct from P4's softer `#FFD166`; the Bug also has the outline + bounce, and spot-testing this distinction is a playtest question).

**Typography:** headings in `Trebuchet MS, Verdana, sans-serif` bold; body/UI in `system-ui, sans-serif`. No webfonts (asset-free build).

**Tone:** deadpan-silly. The driver is never seen except googly eyes in the rear-view mirror. DJ text is the comedy channel.

**Reference points:** GTA's radio personality × Jackbox's shared-screen energy, drawn like an Untitled Goose Game instruction manual.

**Placeholder plan (M0–M1):** rectangles + emoji + text labels for everything (Bug = yellow rect with "🚗", objects = colored rects with names). The frame layout, colors, and key labels are the only "art" allowed before M2.

---

## 10. Sound design

All SFX synthesized at runtime via Web Audio (jsfxr-style parameterized bleeps) — zero audio asset files. Audio context is created/resumed only on the first user gesture (the Space press on splash). **Mute toggle is P0** (`M` key + pause overlay) and persists in `localStorage`.

**SFX event table:**

| Event | Sound description | Priority |
|---|---|---|
| Correct buzz (I Spy) | Bright two-note ding (major third up) | P0 |
| Wrong buzz / invalid word | Descending buzzer raspberry | P0 |
| Punch buggy claimed | Cartoon thwack + short glass "freeze" shimmer | P0 |
| VW Bug appears | Soft distinctive putt-putt engine chirp (audible cue for peripheral attention) | P0 |
| Round countdown (3-2-1) | Rising ticks, big tick on GO | P0 |
| Round win | 4-note victory sting in the station's scale | P0 |
| Station change | 300ms white-noise static burst → dial click | P0 |
| Turn timer last 3s (Word Chain) | Accelerating clock tick | P0 |
| Keystroke (Word Chain) | Tiny typewriter click | P1 |
| Freeze expires | Ice-crack pop | P1 |

**Music:** generative per station (§6.3) — each station is a 2-bar pattern sequencer (kick, snare, hat, bass, one lead voice) built on raw Web Audio oscillators + noise buffers, ~60 lines per station. Music volume ducks −6dB during the round-result sting. No copyrighted or external tracks, ever. P0 ships drums + bass per station; lead melodies are P1.

**Implementation:** hand-rolled Web Audio (no Howler — no asset files to manage, and the sequencer needs raw scheduling via `AudioContext.currentTime` lookahead).

---

## 11. UI & screens

**Flow:** Splash → Seat pick → (Round intro → Mini-game → Round result → Station pick) ×5 → Match result → Splash.

**Splash (mandatory contents):**
- Title "ROAD TRIP RADIO" on a roadside billboard above the parked car; one-liner: *"Win mini-games. Control the radio. Punch first."*
- Rules in 5 bullets: ① 2–4 players, one keyboard. ② Win the mini-game on the windshield. ③ Winner picks the radio station. ④ See the yellow VW Bug in a side window? First to hit your number key freezes everyone else. ⑤ Most round wins after 5 rounds takes the trip.
- Controls card: the full key table from §5, color-coded per player. Touch: "not supported in this build."
- Version number `v0.1.0` bottom-right, sourced from a single `VERSION` constant shared with the debug overlay.
- Single obvious affordance: pulsing "PRESS SPACE TO START".

**Seat pick:** four seats; each human presses their buzz key (`A/F/J/L`) to claim; unclaimed seats after Space is pressed again either become bots (if exactly 1 human) or fold up empty. Requires ≥1 claimed seat to proceed.

**Round intro:** mini-game title + 2-sentence pitch card on the windshield, DJ intro line on the ticker, 3-2-1 countdown. Total 5s.

**HUD (always visible during mini-games):** seat tags (score ★/points/frozen ❄) along the bottom seat backs; round number + round timer top-center on the rear-view mirror; radio dial with station name + ticker on the dash; both side windows fully unobstructed.

**Round result:** winner banner in their color, ★ flies to their seat tag, DJ one-liner, 2s, then station pick.

**Station pick:** 4 station cards on the dash (name, vibe word, accent color); winner's color frames the screen; "P2 — pick the vibe! (1-4)"; 10s auto-timeout keeps current.

**Match result:** car pulls into a diner (scenery decelerates and stops — the only time it stops, as a deliberate pillar-1 payoff); podium of seats; final ★ and points; "PRESS SPACE FOR ANOTHER TRIP".

**Pause overlay (`Esc`):** Resume / Mute / Restart match / Quit to splash, navigated with arrow keys + Enter.

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/config.ts`. Everything the doc references lives here.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | `"0.1.0"` | string | Splash + debug overlay |
| `matchRounds` | 5 | rounds | Match length |
| `sceneryPxPerSec` | 220 | px/s | Side-window scroll (near layer; far layers ×0.2/×0.5) |
| `carSpawnMinS` / `carSpawnMaxS` | 2 / 6 | s | Passing-car frequency |
| `bugVisibleMs` | 2500 | ms | VW Bug on-screen window |
| `bugCooldownMinS` / `bugCooldownMaxS` | 30 / 60 | s | Gap between Bug spawns |
| `bugNoSpawnTailS` | 5 | s | No Bug near round end |
| `bugPoints` | 1 | pts | Match points per Bug claim |
| `freezeMs` | 3000 | ms | Punch-buggy freeze on victims |
| `falseBuggyPenaltyMs` | 3000 | ms | Self-freeze on false digit press |
| `ispyRoundS` | 60 | s | I Spy round length |
| `ispyObjectPxPerSec` | 160 | px/s | Object scroll speed (windshield) |
| `ispySpawnMinMs` / `ispySpawnMaxMs` | 900 / 1800 | ms | Object spawn cadence |
| `ispyMaxObjects` | 7 | count | Max simultaneous objects |
| `ispyGuaranteeMinS` / `ispyGuaranteeMaxS` | 3 / 8 | s | Guaranteed matching-object window per prompt |
| `ispyCorrectPoints` | 2 | pts | Correct buzz |
| `ispyWrongPoints` | 1 | pts | Wrong-buzz deduction (floor 0) |
| `ispyLockoutMs` | 2000 | ms | Wrong-buzz lockout |
| `ispyPromptGapMs` | 1000 | ms | Gap between prompts |
| `ispyLateRampAtS` | 30 | s remaining | When speed/prompt ramp kicks in |
| `wcTurnS` | 12 | s | Word Chain turn timer |
| `wcStrikes` | 2 | count | Strikes to elimination |
| `wcRoundCapS` | 180 | s | Word Chain hard cap |
| `wcWordPoints` | 1 | pts | Per valid word |
| `wcMinLen` / `wcMaxLen` | 3 / 12 | letters | Valid word length |
| `botIspyReactMeanMs` / `botIspyReactSdMs` | 1400 / 500 | ms | Bot buzz reaction |
| `botIspyFalseBuzzPct` | 15 | % | Bot wrong-buzz chance per prompt |
| `botBugSpotPct` | 60 | % | Bot chance to contest a Bug |
| `botBugReactMs` | 1200 | ms | Bot Bug reaction time |
| `botWcThinkMinS` / `botWcThinkMaxS` | 3 / 8 | s | Bot word think time |
| `botWcTimeoutPct` | 12 | % | Bot strike chance per turn |
| `musicVolume` / `sfxVolume` | 0.5 / 0.8 | 0–1 | Mix levels |

**URL flags:**
- `?seed=12345` — seeds the PRNG (mulberry32) driving all spawns, prompts, starter words, and bot rolls; identical seed + inputs = identical match.
- `?debug=1` — overlay with FPS, game state name, entity counts, seed, VERSION; cheat keys: `B` force-spawn Bug, `N` end round now, `+/-` add/remove a bot.
- `?bots=N` — force N bots regardless of human count (0–3).
- `?skip=1` — skip splash/seat-pick straight into round 1 with 1 human + 2 bots.
- `?round=ispy|wordchain` — play only that mini-game on repeat (for tuning).
- `?mute=1` — start muted.

---

## 13. Tech stack

**Vanilla TypeScript + Vite (trivial build, static `dist/`), Canvas 2D for the car/scenery/I Spy layer, a DOM overlay for all text UI, hand-rolled Web Audio.** Justification: the game is parallax strips, a couple dozen sprites, and lots of text — Canvas 2D handles the motion at 60fps with margin to spare (perf budget: ≤60 drawn entities, ≤100 particles, no physics engine needed since nothing collides). Text-heavy elements (prompts, word-chain input, menus, DJ ticker) are far easier as absolutely-positioned DOM than as canvas text. Vite is used only for TS + bundling the ~200KB wordlist JSON; output is `index.html` + one JS bundle + one JSON, deployable by copying `dist/` to any static host. No runtime network calls; no external libraries at all (Pixi/Matter/Howler all overkill here). The game simulation (state machines, scoring, dictionaries, bot logic, PRNG) is pure TS with zero DOM/Canvas imports so it runs headless under Vitest.

---

## 14. Milestones

**M0 — Toy loop.** *Goal: prove split attention is fun with rectangles.*
Deliverables: car frame layout (rects), scrolling side windows, VW Bug spawn + punch-buggy freeze, I Spy Highway fully playable for 2 humans + optional bots, hardcoded 3-round loop, scores in plain text.
Acceptance:
- [ ] Two players can complete 3 I Spy rounds using only `A`/`F` + `1`/`2` with no explanation beyond one spoken sentence.
- [ ] The Bug appears, is claimable, and a false press self-freezes — all visibly.
- [ ] A playtester glances at a side window at least once per round unprompted.
- [ ] 60fps with debug overlay on a mid-range laptop.
*Proves: the fun hypothesis. If watching windows while buzzing isn't generating laughs here, stop.*

**M1 — Real rules.** *Goal: full P0 ruleset.*
Deliverables: Word Chain complete (dictionary, strikes, elimination, cap, bot turns), 5-round match with alternation, seat pick, station pick (palette accent swap only — music may be silent), match result + tiebreaks, splash with rules/controls/version, pause overlay, restart.
Acceptance:
- [ ] A first-time player understands what to do within 60 seconds unprompted, from the splash alone.
- [ ] A full 5-round match with 3 humans completes in under 10 minutes with a correct winner and working tiebreaks.
- [ ] Word Chain rejects out-of-dictionary, repeated, wrong-letter, and short words with clear feedback.
- [ ] Punch buggy works during Word Chain, including freezing the active typer.
- [ ] Sim test suite passes headless (scoring, strike, tiebreak, Bug-claim ordering).

**M2 — Feel.** *Goal: the car feels like a road trip.*
Deliverables: flat-vector art pass (interior, objects, Bug, station dial), all P0 SFX, generative station loops (drums+bass ×4), station tint wash, freeze frost/crack effects, screen shake on punch-buggy (6px, 150ms), tweened ★ flight, DJ ticker lines (12 per station).
Acceptance:
- [ ] Each station is identifiable by sound alone within 3 seconds.
- [ ] The Bug is spottable in peripheral vision within 500ms of spawn (playtester confirms).
- [ ] Mute toggle works everywhere and persists across reloads.
- [ ] Still 60fps.

**M3 — Playtest build.** *Goal: shippable test artifact.*
Deliverables: all URL flags working, seed-reproducible matches, deployed to static host (GitHub Pages under `/games/road-trip-radio/`), P1 features if time allows (lead melodies, keystroke SFX, Night Drive headlights, winner-picks-game once a 3rd mini-game lands).
Acceptance:
- [ ] Same `?seed` + scripted inputs reproduces the identical match twice.
- [ ] Cold-loads and plays from the static URL on Chrome and Firefox with no console errors.
- [ ] `?debug=1` cheat keys all function.
- [ ] Five playtest sessions logged against §2's questions.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is `freezeMs` = 3000 hilarious or rage-inducing during Word Chain turns? Knob exists; try 1500–4000.
2. **(non-blocking — resolve in playtest)** Bug spawn rate: 30–60s means ~1–2 Bugs per round. If players stop watching windows, tighten `bugCooldown*` to 20–40.
3. **(non-blocking — resolve in playtest)** Does I Spy's wrong-buzz lockout (2s) deter spam enough, or is the −1 point sufficient alone? Knobs: `ispyLockoutMs`, `ispyWrongPoints`.
4. **(non-blocking — resolve in playtest)** Is P4's yellow (`#FFD166`) too close to Bug yellow (`#FFD400`) in practice? If confused, recolor P4 to `#F4A0C0` pink.
5. **(non-blocking)** Which third mini-game earns P1 priority: Would You Rather (press-to-vote, zero typing, trivially shared-keyboard) or Road Trip Bingo (persistent 3×3 per player, spot items in scenery — synergizes with pillar 2)? Current lean: Road Trip Bingo. ⚑
6. **(non-blocking)** Wordlist licensing: use an ENABLE/SCOWL-derived public-domain list; verify the chosen list's license permits bundling before M1 ships.
7. **(blocking for P2 only, not P0)** Pit stops and souvenirs need a persistence design (`localStorage` trophy shelf) — out of scope until the core loop proves fun.

---

## 16. Handoff notes for Fable

**Build order:** PRNG + config → headless sim core (match state machine, I Spy sim, Word Chain sim, Bug scheduler, bot logic) → keyboard input router (per-player key map, freeze gating) → Canvas renderer (frame, parallax, objects, Bug) → DOM UI layer (splash, prompts, word input, seat tags, station pick, pause) → audio (SFX synth, station sequencer) → URL flags + debug overlay.

**Keep headless-testable:** everything in `src/sim/` must import zero DOM/Canvas/Audio — it takes `(state, inputEvent | tick)` and returns new state. Unit-test at minimum: I Spy scoring including wrong-buzz floor and lockout, prompt guarantee windows, Word Chain validation (all four rejection reasons), strike/elimination/cap tiebreaks, Bug claim ordering and false-press penalty, match tiebreak ladder, and seed determinism (two runs, same seed + same input script → deep-equal state).

**Repo layout:**

```
road-trip-radio/
  index.html
  vite.config.ts
  src/
    config.ts          // CONFIG + VERSION (single source of truth)
    main.ts            // boot, URL flags, game loop (fixed 60Hz sim tick, rAF render)
    sim/               // headless: match.ts, ispy.ts, wordchain.ts, bug.ts, bots.ts, rng.ts
    input/keys.ts      // player key map, freeze gating, typing mode
    render/            // canvas: frame.ts, scenery.ts, ispyRender.ts
    ui/                // DOM: splash.ts, hud.ts, stationPick.ts, pause.ts, results.ts
    audio/             // sfx.ts (synth), radio.ts (station sequencers)
    data/words.json    // bundled dictionary
  tests/               // vitest, sim only
  dist/                // build output → copy to static host
```

Deployable output is `dist/` verbatim — no server, no runtime fetches beyond same-folder static files.

**Final reminder:** prove the loop with rectangles first. M0 is two colored rects buzzing at labeled boxes while a yellow rectangle putt-putts across a side strip — if nobody laughs when the freeze lands, no amount of vector art or synthwave will fix it. Ship every milestone runnable.
