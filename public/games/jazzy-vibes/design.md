# VIBEOUT — Game Design Document

> Source idea: [Game Idea 13 - Jazzy vibes (Theme: Jack Box Games #1)](/game-idea-13-jazzy-vibes-theme-jack-box-games)

---

## 1. Title & one-liner

**Working title:** VIBEOUT
**Alternates:** Jam Lock, Green Room, House Band, Off-Key, Tune In

**One-liner:** You're one instrument in a badly out-of-sync jazz band with unlabeled controls — figure out which instrument is yours, what your controls do, and lock into the groove by ear before the crowd walks out.

**Genre:** Audio puzzle / rhythm-adjacent discovery game, single-player (same-screen multiplayer as P1).

**Elevator pitch:** Four instruments are playing at once — each in a different key, at a different tempo. It sounds terrible. One of them is yours, but you don't know which, and your two control axes are unlabeled: maybe up is pitch, maybe it's tempo, maybe it's backwards. The AI bandmates are slowly drifting toward a consensus groove and they'll meet you halfway — but the clock is running. Wiggle your controls, pick your instrument out of the noise, decode your axes, and converge on a shared key and tempo. When everyone locks in, the cacophony resolves into an actual jazz groove, and that resolution *is* the reward.

**Adaptation statement:** The source is a Jackbox-style multi-phone party game; per the static-hosting constraint, the prototype adapts it to **single-player versus AI bandmates** — the player controls one randomly-assigned instrument with unlabeled, randomly-mapped axes while 2–3 AI instruments drift toward consensus, preserving the core fun (discovering your instrument, decoding your axes, converging by ear). **Same-screen keyboard multiplayer (2–4 players, each with their own unlabeled key pairs) is P1.** ⚑ (overridable)

---

## 2. Fun hypothesis

**The question this prototype answers:** *Is discovering which instrument you control and what your unlabeled axes do — then converging on a shared key and tempo purely by ear — a satisfying loop?*

Everything in P0 serves this. If wiggle-listen-decode-converge isn't fun with rectangles and synth tones, no amount of art fixes it.

**Playtest questions (ask after each session):**

1. How did you figure out which instrument was yours? How long did it take? Did that moment feel like a discovery or a chore?
2. When the band finally locked in, how did that moment feel? (Looking for: relief/payoff. If "nothing," the resolve moment needs more juice or the cacophony phase is too long.)
3. Did you use your ears or the screen? Did the visualization help you or spoil the audio puzzle?
4. Did you ever feel like the controls were broken rather than unlabeled? (Distinguishes "fun mystery" from "frustrating opacity.")
5. Do you want to play again with a different instrument/mapping? (Replay pull is the real verdict.)

---

## 3. Design pillars

1. **Ear first.** Audio is the primary information channel. The screen confirms and rewards; it never answers the puzzle before your ears do.
2. **Discovery through play.** Nothing is labeled. Which instrument you are, what your axes do, which direction is up — all learned by doing. No tutorial text beyond the splash bullets.
3. **Consensus, not correctness.** There is no "right" key or tempo. Any shared key and any compatible tempo (including double/half-time) wins. The band meets you halfway.
4. **The music is the reward.** The transition from cacophony to groove is the payoff, the win screen, and the reason to replay. Protect it.

Any feature that doesn't serve one of these gets cut.

---

## 4. Core game loop

Session target: **one round = 2–4 minutes** (round timer `roundTimeSec` = 180 s, most wins expected at 60–150 s).

```
        ┌──────────────────────────────────────────────────┐
        │                                                  │
        ▼                                                  │
  [1. LISTEN] ──► [2. IDENTIFY] ──► [3. DECODE] ──► [4. CONVERGE] ──► [5. RESOLVE]
   cacophony       "which dot        "what do my       "meet the        groove +
   count-in         is me?"           axes do?"         band"            win screen ──► restart
```

**Phase 1 — LISTEN (0–15 s).** A 4-beat hi-hat count-in, then all instruments start at random keys and tempos. The player hears a mess and sees the Vibe Ring: 3–4 unlabeled colored dots scattered around a circle, jittering angrily. *Feels: amused horror.* The player does nothing yet, or immediately starts wiggling.

**Phase 2 — IDENTIFY (15–45 s).** The player drags on the control pad (or holds arrow keys) and pushes an axis to an extreme, listening for which instrument responds — the bass sliding up an octave, the drums racing to double speed. The Vibe Ring dots move with a `displayLagSec` delay and jitter, so the ear confirms before the eye does. *Feels: "wait… that's ME."*

**Phase 3 — DECODE (30–60 s).** The player learns which axis is pitch and which is tempo, and which direction is which. Vertical drag might be tempo-inverted; horizontal might be pitch. Eight possible mappings per round. *Feels: cracking a code.*

**Phase 4 — CONVERGE (45–150 s).** The AI bandmates drift toward the group's mean key/tempo (player weighted 2×), occasionally wandering off like temperamental jazz musicians. The player steers toward the pack by ear — beats stop phasing against each other, pitches stop beating. The Vibe Meter climbs. Per-pair lock dings fire as instruments come into tolerance. *Feels: rising tension, almost-there.*

**Phase 5 — RESOLVE.** All pairs within tolerance for `lockHoldSec` = 4 s: every instrument glides to the exact consensus key, quantizes to the shared beat grid, and the band plays 8 bars of clean groove under the win screen. *Feels: the payoff.* Then: score (time to vibe), restart button.

If the timer hits 0 first: record-scratch, "The crowd walked out," restart.

---

## 5. Inputs & controls

Touch is **fully viable** — the source game is finger-drag on a phone, and the desktop control is a direct translation. Mobile is P1 polish, but nothing in the design blocks it.

| Input (desktop) | Action |
|---|---|
| **Mouse drag** on the control pad (click-hold + move) | Relative deltas on Axis A (vertical) and Axis B (horizontal). Which axis is key vs. tempo, and polarity, is randomized per round (`?labels=1` reveals it). |
| **Arrow Up / Down** (hold) | Nudge Axis A continuously at keyboard rate |
| **Arrow Left / Right** (hold) | Nudge Axis B continuously at keyboard rate |
| **M** | Mute / unmute master audio |
| **P** or **Esc** | Pause (suspends AudioContext, freezes timer) / resume |
| **R** | Restart round (with confirm if > 20 s elapsed) |
| **Click "Play"** on splash / end screens | Start round (also unlocks AudioContext — required user gesture) |

| Input (touch) | Action |
|---|---|
| **One-finger drag** anywhere on the control pad | Same relative Axis A/B deltas as mouse drag |
| **Tap 🔇 button** (HUD) | Mute / unmute |
| **Tap ⏸ button** (HUD) | Pause / resume |
| **Tap ↺ button** (HUD) | Restart |
| **Tap "Play"** | Start round + unlock audio |

Multiplayer P1 (same keyboard): P1 = W/S + A/D, P2 = Arrows, P3 = I/K + J/L, P4 = Numpad 8/5 + 4/6. Each player's axis meaning and polarity randomized independently.

No other inputs exist. The control pad is the lower 40% of the screen, visually a subtle textured rectangle labeled only "YOUR INSTRUMENT (one of them…)".

---

## 6. Game elements

Every instrument has the same two hidden parameters: **key** (continuous semitone offset, `keyMin`..`keyMax` = −7..+7 relative to C) and **tempo** (BPM, `bpmMin`..`bpmMax` = 70..160). Each runs its own pattern scheduler off its own tempo.

### 6.1 The four instruments (Web Audio synthesis, concrete)

| Instrument | Synthesis | Pattern (loops) |
|---|---|---|
| **Upright bass** | Triangle oscillator, octave 2 (root ≈ 65 Hz at key 0). Pluck envelope: attack 5 ms, exponential decay 400 ms. Lowpass 400 Hz. | Walking quarter notes: root, ♭3, 5, ♭7 (one per beat, 1 bar). |
| **Drums** | Kick: sine with pitch drop 150→50 Hz over 100 ms, on beats 1 & 3. Snare: bandpass-filtered white noise (center 1800 Hz, Q 1), 100 ms, on beats 2 & 4. Hat: highpass-filtered noise (6 kHz), 30 ms, on every 8th. | Key axis maps to filter centers & kick tuning (±1 octave across key range) so pitch changes are audible as brightness/tuning. |
| **Electric piano** | Two sine oscillators: fundamental + 2× harmonic at 30% gain. Pluck envelope: attack 10 ms, decay 600 ms. | Dominant-7 comp voicing (root, 3, ♭7, root+12) stabbed on the off-beats ("and" of 2 and 4). |
| **Sax lead** | Sawtooth → lowpass (cutoff 1200 Hz, Q 3), vibrato LFO 5 Hz ± 15 cents, legato envelope: attack 60 ms, release 150 ms. | 8-note minor-pentatonic riff (semitone offsets from key: 0, 3, 5, 7, 10, 7, 5, 3), one note per 8th, 1 bar. |

Placeholder visual for all: a colored dot on the Vibe Ring. Final (P2): tiny flat-vector instrument icons. Player is randomly assigned one instrument per round (`?instrument=` overrides); the rest are AI.

### 6.2 AI bandmate

- Every `aiUpdateSec` = 0.5 s, each AI moves its key toward the group mean key at `aiDriftKeyPerSec` = 0.15 semitones/s and its BPM toward the group mean at `aiDriftBpmPerSec` = 1.2 BPM/s. Group mean weights the player's instrument at `playerWeight` = 2 (the band follows *you* more than each other — the player's choices matter).
- Tempo drift targets the nearest compatible ratio (×0.5, ×1, ×2) of the mean, so an AI drummer may settle into double-time — as the source idea wants.
- **Wander:** each update, with probability `aiWanderChance` = 0.10, an AI picks a temporary offset target (up to ±`aiWanderKeyMax` = 1.5 semitones, ±`aiWanderBpmMax` = 8 BPM) and drifts there for 3 s before resuming consensus. Jazz musicians are moody. ⚑ (overridable — set `aiWanderChance=0` for a docile band)
- AI never reads the player's mapping; it only reads parameter values. The sim is symmetric, so P1 multiplayer replaces AI with humans with zero rule changes.

### 6.3 Vibe Ring (central visualization)

The circular frequency map from the source idea. A ring, radius ~35% of viewport height. Each instrument is a dot: **angle** = key (−7..+7 semitones mapped across 360°), **radius offset** = tempo (inner = slow, outer = fast; compatible ×2 tempos render at the same radius with a faint halo). Dots are colored (palette §9) but **unlabeled** — discovering which is yours is Phase 2. Dots render with `displayLagSec` = 1.5 s smoothing and ±`vizDotJitterPx` = 6 px jitter that shrinks as the group converges, so the eye can't beat the ear. When instruments are far apart the ring background crackles with angular noise lines; as the Vibe Meter climbs, the noise fades and the dots grow soft glows; at resolve, dots merge into one pulsing-on-the-beat cluster.

### 6.4 Control pad

Lower 40% of screen. Registers drag deltas only (not absolute position). Renders a faint fingerprint-trail of the last 1 s of drag so the player sees their own gesture. No axis labels, no tick marks (that's the game). `?labels=1` overlays the true mapping for debugging/accessibility.

### 6.5 Vibe Meter

Horizontal bar in the HUD, 0–100: `100 − normalized mean pairwise distance` (key distance in semitones mod 12 + tempo ratio error, weighted equally, smoothed by `vibeMeterSmoothing` = 0.9). It's the "warmer/colder" signal that keeps Phase 4 from feeling unguided.

### 6.6 Round timer

Counts down from `roundTimeSec` = 180. Last 30 s: timer pulses amber; a low crowd-murmur loop fades in (restlessness).

---

## 7. Rules, win & lose conditions

**Lock rule (pairwise):** two instruments are *locked* when both hold:
- **Key:** |key₁ − key₂| mod 12 ≤ `lockKeyTol` = 0.3 semitones (unison pitch class). ⚑ (overridable — consonant intervals like fifths do NOT count as locked in P0; the source's "one key higher is fine" is deferred to a P2 `allowIntervals` config)
- **Tempo:** BPM ratio within `lockTempoTolPct` = 3% of one of `tempoRatios` = {0.5, 1, 2}.

**Win:** every pair locked simultaneously and continuously for `lockHoldSec` = 4 s → **VIBE ACHIEVED**. All instruments glide (portamento, `resolveGlideSec` = 1.0 s) to the exact mean key quantized to the nearest true semitone, snap to a shared beat grid, and play 8 bars clean. Score = time-to-vibe in seconds (lower is better); best time per instrument stored in `localStorage`.

**Lose:** timer reaches 0 before a win → record-scratch, all instruments stop, "The crowd walked out." Show time survived and closest Vibe Meter peak, restart button.

**Edge cases:**
- Timer expires during the 4 s lock hold → the hold continues on a 5 s grace clock; if it completes, it's a win ("saved it at the buzzer"), else lose.
- A pair drops out of tolerance mid-hold → hold resets to 0 for all pairs (all-locked is evaluated globally each frame).
- Player drags out of range → key/tempo clamp at min/max (audible ceiling/floor — this is itself a discovery aid).
- Pause during lock hold → hold timer freezes with the round timer; AudioContext suspends.
- Mute does not pause the sim; muted wins still count (but the player has thrown away their ears — their problem).
- Simultaneous parameter updates (player + AI in the same frame): player input applies first, AI drift second, lock check last. Deterministic order, seeded RNG → reproducible rounds.

---

## 8. Difficulty & progression

P0 ships **one tuned difficulty**: player + 2 AI (3 instruments), tolerances as configured, single round, replay for a better time. Randomized instrument + axis mapping per round provides natural variety.

P1 adds a 3-round set, all knobs already in config:

| Round | AI count | `lockKeyTol` | `lockTempoTolPct` | `aiWanderChance` |
|---|---|---|---|---|
| 1 | 2 | 0.4 | 4 | 0.05 |
| 2 | 3 | 0.3 | 3 | 0.10 |
| 3 | 3 | 0.25 | 2.5 | 0.15 |

No meta-progression. `?ai=N` overrides AI count for playtesting.

---

## 9. Style & theme

**Visual style:** Flat vector, smoky-jazz-club palette, dark background with warm glows. Everything is circles, dots, and soft radial gradients — no sprites needed for P0/P1. Generous negative space; the Vibe Ring is the hero.

**Palette:**

| Role | Hex |
|---|---|
| Background (deep indigo night) | `#1A1633` |
| Ring / chrome (muted slate) | `#3A3554` |
| Instrument 1 — bass (brass gold) | `#E8A33D` |
| Instrument 2 — drums (dusty rose) | `#D96C8A` |
| Instrument 3 — keys (teal) | `#3FBFB2` |
| Instrument 4 — sax (soft violet) | `#9B7EDE` |
| Text / highlights (warm cream) | `#F2E9DC` |
| Danger / timer warning (amber) | `#E86A3D` |

**Typography:** Headings in Georgia italic (system serif — evokes Blue Note sleeve type with zero font assets); UI/body in `system-ui`. No webfonts, no runtime fetches.

**Tone/mood:** Late-night rehearsal room. Wry, unbothered. Failure copy is deadpan ("The crowd walked out. They were polite about it.").

**References:** Blue Note record-sleeve graphic design; the moment an orchestra tunes to the oboe before a concert (the whole game is that moment, gamified); *Keep Talking and Nobody Explodes*' joy of decoding unlabeled systems.

**Placeholder art plan (M0–M1):** colored circles on a dark rectangle, one HUD bar, system text. Nothing else. All "art" through M2 is Canvas-drawn shapes, glows, and particles — the game never needs image assets.

---

## 10. Sound design

The game's music **is** the mechanic — the four synthesized instruments (§6.1) are the soundtrack, generated live via Web Audio. No music assets, nothing copyrighted, nothing fetched.

**SFX event table (all synthesized in code, jsfxr-style; no audio files):**

| Game event | Sound | Priority |
|---|---|---|
| Round start | 4-beat hi-hat count-in (the drums' own hat voice) | P0 |
| Pair enters lock tolerance | Soft vibraphone ding (sine + 4× partial, 300 ms decay), pitched to the consensus key | P0 |
| Pair drops out of lock | Muted thud (80 Hz sine, 80 ms) | P0 |
| VIBE ACHIEVED | Resolve glide + band snaps to grid + applause (lowpass-filtered white-noise swell, 2 s) | P0 |
| Lose (timer out) | Record scratch (fast saw pitch-drop + noise burst) then silence | P0 |
| UI button click | 5 ms filtered noise tick | P0 |
| Timer < 30 s | Crowd-murmur loop (looped brown noise, bandpass 300–900 Hz, low gain) | P1 |
| New best time | Short brass stab (2 detuned saws, 200 ms) | P1 |

**Implementation:** Raw **Web Audio API** (no Howler/Tone — see §13). One `AudioContext`, one master `GainNode` (mute toggle = gain 0/`masterGain`), per-instrument gain buses. Note scheduling via the standard lookahead pattern: `setInterval` every `schedulerIntervalMs` = 25 ms schedules all notes falling in the next `schedulerLookaheadSec` = 0.1 s window using `AudioContext.currentTime`-based timestamps — this keeps four independent tempos sample-accurate.

**Autoplay policy:** `AudioContext` is created/resumed only inside the Play-button click handler. **Mute toggle is P0** (M key + HUD button, state persisted to `localStorage`).

---

## 11. UI & screens

**Flow:** `Splash → Playing ⇄ Paused → Win | Lose → (restart) Splash-skipped straight to Playing`

**Splash screen (mandatory):**
- Title "VIBEOUT" + one-liner: "Find your instrument. Crack your controls. Lock in the groove."
- Rules in 5 bullets: ① One of these instruments is YOURS. ② Drag the pad — one axis is pitch, one is tempo. Nobody tells you which. ③ Find yourself by ear. ④ Match the band's key and tempo (double-time counts). ⑤ Lock in for 4 seconds before the crowd leaves.
- Controls block: desktop (drag / arrows, M mute, P pause, R restart) and touch (drag, HUD buttons).
- **Version number** (e.g. `v0.1.0`) bottom-right, sourced from the single `CONFIG.version` constant (same constant feeds the debug overlay).
- One big "▶ PLAY" button (this click also unlocks audio).

**HUD (during play):** round timer (top center), Vibe Meter bar (top, under timer), mute/pause/restart icon buttons (top right), version (bottom right, faint). Nothing else — the Vibe Ring and control pad own the screen.

**Pause screen:** dim overlay, "Paused", resume/restart/mute buttons. Sim and audio frozen.

**Win screen:** "VIBE ACHIEVED" over the still-playing clean groove, time-to-vibe, best time, which instrument you were (revealed here, with its color/icon), "Play again" (new random instrument + mapping).

**Lose screen:** "The crowd walked out.", peak Vibe Meter %, which instrument you were, "Try again".

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/config.js`. The entire game rebalances by editing this one object.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `version` | `"0.1.0"` | string | Splash + debug overlay version display |
| `roundTimeSec` | 180 | s | Round countdown |
| `countInBeats` | 4 | beats | Hi-hat count-in length |
| `bpmMin` / `bpmMax` | 70 / 160 | BPM | Tempo parameter range (clamp) |
| `keyMin` / `keyMax` | −7 / +7 | semitones | Key parameter range (clamp) |
| `aiCount` | 2 | count | AI bandmates in P0 round |
| `aiUpdateSec` | 0.5 | s | AI decision cadence |
| `aiDriftKeyPerSec` | 0.15 | semitones/s | AI key convergence speed |
| `aiDriftBpmPerSec` | 1.2 | BPM/s | AI tempo convergence speed |
| `aiWanderChance` | 0.10 | prob/update | How moody the band is |
| `aiWanderKeyMax` | 1.5 | semitones | Wander target size (key) |
| `aiWanderBpmMax` | 8 | BPM | Wander target size (tempo) |
| `aiWanderDurationSec` | 3 | s | How long a wander lasts |
| `playerWeight` | 2 | × | Player weight in group mean |
| `lockKeyTol` | 0.3 | semitones | Pairwise key lock tolerance |
| `lockTempoTolPct` | 3 | % | Pairwise tempo ratio tolerance |
| `tempoRatios` | [0.5, 1, 2] | ratios | Compatible tempo relationships |
| `lockHoldSec` | 4 | s | All-locked hold time to win |
| `lockGraceSec` | 5 | s | Buzzer-beater grace window |
| `dragKeyPerPx` | 0.02 | semitones/px | Drag sensitivity (key axis) |
| `dragBpmPerPx` | 0.15 | BPM/px | Drag sensitivity (tempo axis) |
| `keyRatePerSec` | 2.0 | semitones/s | Keyboard hold rate (key axis) |
| `bpmRatePerSec` | 12 | BPM/s | Keyboard hold rate (tempo axis) |
| `displayLagSec` | 1.5 | s | Vibe Ring dot smoothing (ear-first) |
| `vizDotJitterPx` | 6 | px | Max dot jitter when unsynced |
| `vibeMeterSmoothing` | 0.9 | 0–1 | Vibe Meter EMA factor |
| `resolveGlideSec` | 1.0 | s | Win portamento to consensus |
| `masterGain` | 0.8 | 0–1 | Master volume |
| `schedulerLookaheadSec` | 0.1 | s | Audio scheduling window |
| `schedulerIntervalMs` | 25 | ms | Scheduler tick |
| `particleCap` | 200 | count | Max simultaneous particles |
| `timerWarnSec` | 30 | s | Amber timer + crowd murmur onset |

**URL flags:**
- `?seed=12345` — seeds the RNG (mulberry32) controlling instrument assignment, axis mapping, start values, AI wander. Same seed = identical round.
- `?debug=1` — overlay: FPS, true key/BPM of every instrument, player's axis mapping, lock-hold timer, seed. Cheat keys: `1` snap player to group mean, `2` win now, `3` add 60 s.
- `?skip=1` — skip splash straight into a round (audio unlocks on first click/keypress).
- `?ai=N` — override AI count (1–3).
- `?labels=1` — label the control pad axes (accessibility / sanity testing).
- `?instrument=bass|drums|keys|sax` — force player instrument.
- `?players=N` — (P1) same-keyboard multiplayer, replaces N−1 AI with humans.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules), Canvas 2D for rendering, raw Web Audio API for all sound, zero-build.** The deliverable is a folder — `index.html` + `src/*.js` — that runs from any static host with no compile step; there are no dependencies to justify a bundler. Canvas 2D fits a game whose entire visual load is ~4 dots, a ring, a bar, and ≤200 particles — Pixi would be dead weight. Raw Web Audio (not Tone.js/Howler) is chosen deliberately: the game needs four *independent-tempo* schedulers with per-note frequency math derived from a continuous semitone parameter (`freq = base × 2^(key/12)`), which is a ~60-line lookahead scheduler in plain Web Audio, while Tone.js fights you the moment tempos diverge per-voice. No runtime network calls; no assets — every sound and visual is generated in code. Perf budget: 4 instrument voices (≤12 concurrent oscillator/noise nodes), ≤200 particles, one full-canvas clear+redraw per frame — trivially 60 fps on a mid-range laptop.

---

## 14. Milestones

**M0 — Toy loop.** *Goal: prove the wiggle-listen-decode-converge loop is fun with zero polish.*
Deliverables: audio engine (4 instruments, independent tempos), sim (params, AI drift, lock detection), mouse-drag + arrow input with randomized mapping, bare Canvas ring with 3 dots, win = console log + instruments snapping together.
Acceptance criteria:
- [ ] Page loads from `file://` or static host; click starts audio; three instruments audibly play at different keys/tempos.
- [ ] Dragging changes exactly one player instrument's pitch/tempo per axis; a listener can identify their instrument by ear within ~60 s.
- [ ] AI instruments observably drift toward the player over ~2 minutes.
- [ ] Reaching shared key/tempo triggers the lock condition and an audible snap-to-groove.
- [ ] `?seed=` reproduces the identical round.
*Proves: the fun hypothesis. If this isn't compelling, stop.*

**M1 — Real rules.** *Goal: full P0 ruleset and legible game shell.*
Deliverables: round timer + lose state, lock-hold + grace window, Vibe Meter, splash screen (rules, controls, version from `CONFIG.version`), HUD, pause/mute/restart, win/lose screens, `localStorage` best time.
Acceptance criteria:
- [ ] A first-time player understands what to do within 60 s of the splash, unprompted.
- [ ] Win and lose both reachable; timer-expiry-during-hold grace behaves per §7.
- [ ] Every input in §5 works and is documented on the splash; mute state persists across reloads.
- [ ] Version string appears on splash and matches `CONFIG.version`.

**M2 — Feel.** *Goal: make the resolve moment land.*
Deliverables: full Vibe Ring treatment (jitter, noise crackle, glows, convergence cluster), palette + typography pass, all P0 SFX from §10, resolve glide + applause, particle burst on win (≤`particleCap`), timer pulse + crowd murmur.
Acceptance criteria:
- [ ] Cacophony→groove resolve produces a visible + audible payoff within 1.5 s of lock completion.
- [ ] Dot smoothing/jitter confirmed: a blindfolded player and a deafened player were both tested — the blindfolded one wins. (Ear-first pillar holds.)
- [ ] Steady 60 fps with debug overlay open.

**M3 — Playtest build.** *Goal: shippable, reproducible, shareable.*
Deliverables: all `?` flags from §12 working, debug overlay + cheat keys, deployed to static host (`public/games/jazzy-vibes/`), touch input pass (drag + HUD buttons on mobile), P1 features if time allows (3-round progression, same-keyboard multiplayer, best-time per instrument).
Acceptance criteria:
- [ ] Game runs from the deployed static URL with zero console errors and zero network calls after load.
- [ ] `?seed=`, `?debug=1`, `?skip=1`, `?ai=`, `?labels=1`, `?instrument=` all function.
- [ ] Playable on a phone via touch (nice-to-have bar: identify + converge possible, even if cramped).

Every milestone leaves the game runnable.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is the Vibe Ring too big a spoiler even with lag/jitter? Knobs: `displayLagSec`, `vizDotJitterPx`; extreme test = hide dots entirely until Vibe Meter > 50.
2. **(non-blocking — resolve in playtest)** Should consonant intervals (perfect fifth) count as key-locked, per the source's "singer one key higher" note? Deferred behind a P2 `allowIntervals` flag; playtest unison-only first.
3. **(non-blocking — resolve in playtest)** Is 180 s the right pressure? Knob: `roundTimeSec`.
4. **(non-blocking — resolve in playtest)** Is AI wander delightful or infuriating? Knob: `aiWanderChance` (0 = docile).
5. **(non-blocking — resolve in playtest)** Drag sensitivity feel on trackpads vs. mice: knobs `dragKeyPerPx`, `dragBpmPerPx`.
6. **(non-blocking)** Does same-keyboard multiplayer (P1) actually recreate the party-game magic, or does sharing one keyboard kill it? Only answerable by building the P1 slice in M3.

No blocking questions — all P0 decisions are made above.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → `rng.js` (mulberry32 + seed from URL) → `sim.js` (headless: instrument params, player input application, AI drift, lock/win/lose evaluation) → `audio/engine.js` (context, master gain, lookahead scheduler) → `audio/instruments.js` (four voices from §6.1) → `input.js` (drag/keys → axis deltas via the round's random mapping) → `render.js` (Vibe Ring, HUD on Canvas) → `ui.js` (splash/pause/win/lose DOM overlays) → juice last.

**Keep the sim headless.** `sim.js` must not touch DOM, Canvas, or AudioContext — it takes `(state, inputs, dt, rng)` and returns state. Unit tests should assert: axis-mapping application, clamping, AI drift toward weighted mean, tempo-ratio lock math (including the ×0.5/×2 cases), lock-hold reset on dropout, grace-window win, seed determinism.

**Repo / deploy layout** (zero-build; the source folder *is* the deployable):

```
public/games/jazzy-vibes/
  index.html          (canvas, DOM overlays, <script type="module" src="src/main.js">)
  design.md           (this file)
  src/
    main.js           (game loop: rAF, state machine splash/play/pause/end)
    config.js         (CONFIG object — every value in §12)
    rng.js
    sim.js            (headless game logic)
    input.js
    render.js
    ui.js
    audio/
      engine.js
      instruments.js
  test/
    sim.test.js       (run with `node --test`; no browser needed)
```

**Reminders:**
- Prove the loop with dots and raw synth tones (M0) before spending any effort on glows, particles, or copy. If M0 isn't fun, stop.
- Ship every milestone runnable from a static folder — no bundler, no network calls at runtime.
- `AudioContext` must only be created/resumed in a user-gesture handler (the Play button).
- One version constant (`CONFIG.version`) feeds the splash and the debug overlay — bump it every milestone.
