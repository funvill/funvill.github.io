# GOOD TASTE — Game Design Document

> Source idea: [Game Idea 20 - Good taste (Theme: Otherworldly Chef)](/game-idea-20-good-taste-theme-otherworldly-chef)

---

## 1. Title & one-liner

**Working title: GOOD TASTE**

Alternates: *Palate*, *First Light*, *The Tasting*, *Umbral Kitchen*, *Protolith*.

**One-liner:** You are a newborn lifeform that must decode an unlabeled language of colors, shapes, and tones through pure experimentation — until you understand flavor well enough to cook to order for an otherworldly being.

**Genre:** Experimental puzzle / discovery-learning simulation. Single-player, mouse-driven, browser.

**Elevator pitch:** Nothing in this game is ever labeled. Blobs of color drift in a dark void; a bar in the corner is quietly draining. You click a blob, a strange circle flashes a pattern, and the bar moves — up or down. That's the whole tutorial, because the game *is* the tutorial: every stage adds a new dimension to your senses (taste segments, split health bars, shapes, tones) and you must re-derive the rules yourself, keeping your own hand-written labels as your only notes. When you've proven fluency, your hunger vanishes and a mumbling voice starts singing orders at you in the tone-language you've absorbed without realizing it. Cook five meals for the being behind the voice and you win. The player's real progression is inside their own head.

---

## 2. Fun hypothesis

**The single question this prototype answers:** *Is learning a completely unlabeled sensory language through experimentation — and then proving fluency by cooking to tone-orders — intrinsically satisfying, or is it just frustrating?*

Everything in P0 serves this. The chef phase is the exam that makes the learning phase meaningful; both are P0.

**Playtest questions (ask after each session):**

1. At what point did you first feel "I know something the game never told me"? (We want this within 90 seconds.)
2. When the taste circle / health bar split, did you feel curious or annoyed?
3. Did you use the labeling tool? If not, why not? If yes, what did your labels say?
4. When the order tone played, did you recognize it? Did serving a correct meal feel earned?
5. Was there any stage where you were clicking randomly rather than reasoning? Which one?

---

## 3. Design pillars

1. **Nothing is ever labeled.** No text names any ingredient, taste, bar, or rule. All authored text lives on the splash screen and end screen only. If a feature needs explanatory text mid-game, redesign or cut the feature.
2. **Knowledge persists, health doesn't.** Death is cheap (restart current stage); the stimulus→effect mapping is fixed for the whole run, so everything the player *learned* survives. The player's understanding is the real save file.
3. **One new dimension at a time.** Every stage adds exactly one input complexity or one output complexity, never both at once (except S5, which re-runs an already-taught pattern).
4. **The ears are a sense too.** Tones are not decoration — they are the vocabulary the final exam is written in. Every ingredient speaks its tone from the very first hover.

---

## 4. Core game loop

**Session length target:** 8–11 minutes for a full first run (learning phase ~6–8 min, chef phase ~2–3 min). Repeat runs with a new `?seed=` scramble the mapping and take ~5 min. ⚑ (overridable — stage thresholds in §12 are the pacing knobs.)

### Learning phase loop (repeats each stage)

```
        ┌──────────────────────────────────────────────┐
        │                                              │
        ▼                                              │
   [OBSERVE]  blobs drift; bars drain; hover = tone    │
        │                                              │
        ▼                                              │
   [GAMBLE]   click a blob to eat it                   │
        │                                              │
        ▼                                              │
   [READ]     taste circle flashes a segment pattern;  │
        │     bars jump up / down; screen reacts       │
        ▼                                              │
   [THEORIZE] "green-ish = top segment = right bar?"   │
        │     optionally right-click → write a label   │
        └── enough good eats? ──no──────────────────────┘
                     │yes
                     ▼
        [SPLIT] a sense or a bar divides; new blobs
                appear; theory partially breaks; repeat
```

* **Observe** — player *sees* 3–5 drifting soft blobs, draining bar(s); *does* hover to hear each blob's tone; *feels* mild time pressure.
* **Gamble** — player *does* click; *feels* the thrill of a hypothesis test.
* **Read** — player *sees* the taste circle (1.2 s, `CIRCLE_DISPLAY_MS`), bar deltas, harm shake or nourish shimmer; *feels* confirmation or pain.
* **Theorize/Label** — player *does* optional right-click labeling; *feels* ownership of growing knowledge.
* **Split** — stage transition: a two-note rising motif plays, the circle or bar visibly divides with a 0.8 s animation; *feels* "oh no / oh interesting".

### Chef phase loop

```
[LISTEN] mumble + order tones ──▶ [BUILD] click blobs onto plate (≤3)
      ▲                                   │  (hover plate = combined tone)
      │                                   ▼
[RESULT] approval pip +1 / grumble ◀── [SERVE] press Space / click plate
```

---

## 5. Inputs & controls

Touch is **viable** for this game (it is entirely point-and-click) and is P1. Hover-tones map to a tap-and-hold preview; labeling maps to long-press. Desktop is the P0 target.

| Action | Desktop (P0) | Touch (P1) |
|---|---|---|
| Hear an ingredient's tone | Mouse hover over blob | Touch and hold blob ≥150 ms (release outside blob = cancel, no eat) |
| Eat ingredient / add to plate (chef) | Left-click blob | Tap blob (a held touch that releases on the blob after ≥150 ms also eats — hold-to-hear, release-to-eat) |
| Label an ingredient species | Right-click blob | Long-press blob ≥500 ms |
| Label a bar / circle segment (P1) | Right-click bar or segment | Long-press bar or segment |
| Replay current order (chef) | Click the ear icon, or `E` | Tap ear icon |
| Hear plate's combined tone (chef) | Hover plate | Touch-hold plate |
| Serve plate (chef) | `Space` or click the plate rim button | Tap serve button |
| Remove last plate item (chef) | Right-click plate | Long-press plate |
| Open/close journal (P1) | `Tab` or `J` | Journal icon, top-left |
| Pause | `P` or pause icon (top-left) | Pause icon |
| Mute | `M` or speaker icon (top-left) | Speaker icon |
| Restart run | `R` on end screen; pause menu button mid-run | Same buttons |
| Confirm label text | `Enter` | On-screen ✓ |
| Cancel label editor | `Esc` | Tap outside editor |

No other inputs exist. Keyboard is never required except for typing optional label text (touch uses stamp glyphs or the OS keyboard).

---

## 6. Game elements

### 6.1 The mapping system (the heart of the game)

All stimuli encode a hidden **taste vector** over up to 3 channels **A, B, C** (channel D is a P1 config extension, `CHANNELS_MAX`). Each component ranges roughly −1.8…+1.8 "taste units". The mapping is generated once per run from `mappingSeed` (derived from `?seed=`) and never changes mid-run.

**Hue families (primary component).** There are exactly 8 hue families, at hue centers 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315° (HSL, S=78%, L=58%), each instance jittered ±12° so players learn *families*, not pixels. At run start, the seed shuffles a bijection from the 8 families onto the 8 pairs `(channel, sign)` for channels A–D: `{A+, A−, B+, B−, C+, C−, D+, D−}`. Only families whose channel is unlocked at the current stage may spawn. A family contributes `sign × 1.0` to its channel.

**Size (magnitude).** Three size classes: small (radius 22 px, multiplier `SIZE_SMALL_MULT = 0.5`), medium (34 px, ×1.0), large (48 px, `SIZE_LARGE_MULT = 1.5`). Size multiplies the *entire* taste vector.

**Shape (secondary component).** Shapes: **circle** (pure — no secondary), **triangle**, **square**, **star** (S5+). At run start the seed assigns each non-circle shape a fixed `(channel, sign)` drawn from the unlockable set, distinct from each other. A non-circle shape adds `sign × SHAPE_SECONDARY_WEIGHT (0.4)` to its channel, also scaled by size. A shape's secondary channel may equal the hue's primary channel (reinforcing or partially canceling it) — that's a feature, not a bug: it creates "weirdly weak" and "extra strong" species to puzzle over.

**Full formula:** `taste[c] = sizeMult × ( primary(hueFamily)[c] + secondary(shape)[c] )`.

**Tone language (audio identity).** Channel notes: A = 220.00 Hz (A3), B = 277.18 Hz (C#4), C = 329.63 Hz (E4), D = 440.00 Hz (A4) — an A-major arpeggio, always consonant. Positive components play as a **sine** wave with gentle vibrato; negative components play as a **sawtooth** with a −30 cent downward pitch bend (sounds "sour/wrong"). An ingredient's hover phrase: primary note 300 ms at full volume, then (if non-circle) secondary note 180 ms at −6 dB. Duration long/short does not vary for ingredients. This phrase is the exact vocabulary reused by chef-phase orders (§7.3), so every hover in the learning phase is secretly a language lesson.

### 6.2 Entity table

| Entity | Placeholder (M0) | Final look (M2) | Behavior | Key config | Interactions |
|---|---|---|---|---|---|
| **Ingredient blob** | Flat colored rect/triangle/star, size = class | Soft radial-gradient blob with slow 0.5 Hz breathing scale (±4%), faint glow, shape silhouette | Drifts at 8–14 px/s with sine wander inside the arena; despawned oldest-first when over cap; plays tone on hover | `SPAWN_INTERVAL_MS`, `ONSCREEN_CAP` (per stage), size/shape weights | Click → eaten (learning) or plated (chef); right-click → label editor |
| **Taste circle** | Ring of N stroked arc segments, center screen | Same + bloom pulse | Hidden until an eat; then shows for `CIRCLE_DISPLAY_MS` (1200). Segments: 1 channel = 2 halves (top = positive, bottom = negative); 2 channels = 2 fixed sectors (A at 12 o'clock, B at 4 o'clock, later C at 8 o'clock), each sector fills **outward from center** proportionally to |component|, glowing warm-white for positive and flickering/cracking dark-red for negative | `CIRCLE_DISPLAY_MS` | Read-only; right-click a sector to label it (P1) |
| **Health bar(s)** | Vertical rects, top-right | Slim capsules with liquid shimmer | Each bar 0–`BAR_MAX` (100), starts at `BAR_START` (70), drains continuously (rate per §8); eat applies channel deltas: `+EAT_BASE (18) × taste[c]` when positive, `−EAT_BASE × HARM_MULT (1.5) × |taste[c]|` when negative; clamped 0–100 | `BAR_MAX`, `BAR_START`, `EAT_BASE`, `HARM_MULT`, `DRAIN_*` | Any bar = 0 → stage death (§7.2); right-click to label (P1) |
| **Label chip** | DOM text input + 12 stamp glyphs (`✦ ● ▲ ■ ♥ ☠ ↑ ↓ ~ ! ? ✕`) | Same, styled | Binds to species key `(hueFamily, shape)` — size excluded on purpose (size is dosage of the same species). Max 8 chars OR one stamp. Renders under every instance of that species at 11 px, 70% opacity. Stored in `localStorage["goodtaste.labels."+mappingSeed]`. Right-click again to edit/clear | `LABEL_MAX_CHARS` | Purely informational; never read by sim |
| **Journal (P1)** | Slide-in panel | Same | Lists every labeled species: swatch + shape glyph + player's label + count eaten. **Never** shows effects — pillar 1 | — | Tab/J toggles; pauses game while open |
| **Plate / cauldron (chef)** | Dashed circle, bottom-center, 3 slots | Shallow stone bowl | Holds up to `PLATE_MAX` (3) ingredients; hover plays the *combined* tone phrase (component notes of the summed vector, magnitude ≥1.0 = 500 ms note, <1.0 = 250 ms note); right-click removes last item (item returns to the arena) | `PLATE_MAX` | Space/serve button submits (§7.3) |
| **Ear icon + order (chef)** | Speaker glyph with circular timer ring | Pulsing sigil | Click/E replays the order phrase, unlimited, free. Ring depletes over `ORDER_TIME_MS` (30000) | `ORDER_TIME_MS` | Timer expiry = failed order |
| **Approval pips (chef)** | 5 hollow circles, top-right (replace bars) | Glowing runes | +1 filled pip on success; a failure empties nothing but increments a consecutive-fail counter shown as up to 2 small cracks on the frame | `ORDERS_TO_WIN`, `ORDER_FAILS_TO_LOSE` | 5 pips = win; 3 consecutive fails = lose |
| **Stage pips** | Row of 7 dots, bottom-left, current one pulsing | Same | Shows position in the run without words | — | Read-only |
| **Spawn director** | (invisible) | — | Anti-frustration rule: at every spawn tick, if no on-screen ingredient has a component ≥ `ASSIST_MIN_COMPONENT` (+0.3) on the channel of the **lowest** bar, force-spawn one such species; otherwise spawn uniformly among stage-legal species. Chef phase: guarantees every species in the current order's recipe is on screen at all times | `ASSIST_MIN_COMPONENT` | Keeps stages winnable without dumbing down the puzzle |

Arena: full window, blobs constrained to central 80% with soft bounce.

---

## 7. Rules, win & lose conditions

### 7.1 Eating (learning phase)

1. Click an eligible blob → blob shrinks into the cursor over 150 ms, eat cooldown `EAT_COOLDOWN_MS` (800) begins (cursor shows a small digest swirl; clicks ignored, hovers still play tones).
2. Taste circle displays the true component pattern for `CIRCLE_DISPLAY_MS`.
3. Bar deltas apply instantly. **Net delta** = sum of applied deltas after clamping (gain wasted above 100 counts as 0).
4. Feedback: net > 0 → soft shimmer ring outward from the eaten position + gentle chime; net < 0 → 250 ms screen shake (amplitude 6 px), red vignette flash, harm sound; net = 0 → neutral swallow thock only.
5. A **good eat** is net delta > 0. Streak = consecutive good eats; any net ≤ 0 eat resets streak to 0. (Drain never resets streak.)

### 7.2 Stage death & advancement (learning phase)

* **Death:** any bar reaches 0 → 1.5 s fade-to-black, then the **current stage restarts**: bars reset to `BAR_START`, in-stage counters (good eats, streak, hold timers) reset, on-screen blobs re-rolled. The mapping, the stage reached, and all labels persist. Death count is tracked for the end screen. There is no run-level lose condition in the learning phase.
* **Advancement:** exact thresholds in §8. On advancing: 0.8 s split animation + rising two-note motif, bars refill to `BAR_START`, drain pauses during the animation.
* **Edge cases:** if an eat and bar-zero happen the same frame, the eat resolves first (a saving meal at 0.01 counts). If advancement criteria complete mid-cooldown, transition begins immediately and cancels the cooldown. Pausing freezes drain, spawn, hold timers, and order timers.

### 7.3 Chef phase (Stage S6, "The Calling")

Entered automatically after S5's threshold. Bars fade out over 2 s (drain stops forever); approval pips fade in; blob cap rises to 6; **all 6 unlocked species-relevant families plus all shapes remain spawnable**.

* **Order generation:** orders 1–2 target a single on-menu species' taste vector; orders 3–5 target the summed vector of two distinct species. From order 3 onward, with probability `ORDER_NEG_CHANCE` (0.30), the recipe is built from species with a negative dominant component — the being *wants* poison; this is the true fluency test. Targets are always achievable by construction.
* **Order phrase:** 800 ms filtered-noise mumble (band-passed 300–1200 Hz with wobble — clearly a voice, clearly not words), 200 ms silence, then for each nonzero channel of the target in descending |magnitude|: that channel's note (sine if positive, sawtooth if negative), 500 ms if |component| ≥ 1.0 else 250 ms, 120 ms gaps. Replayable free and unlimited via ear icon / `E`.
* **Serving:** player plates 1–3 blobs (plated blobs leave the arena) and serves. Served vector **S** vs target **T**: `dist = √Σ(S_c − T_c)²`. Success iff `dist ≤ ORDER_TOLERANCE` (0.45 taste units). ⚑ (overridable — flat tolerance chosen over percentage for predictability; tune in playtest.)
* **Success:** eating noise (wet crunch), warm approval hum (rising major third), pip fills, consecutive-fail counter resets, next order after 1.5 s.
* **Failure** (bad dist OR `ORDER_TIME_MS` expiry OR serving an empty plate): low grumble + brief shake, consecutive fails +1, **same target re-rolled as a new order** (new recipe, so the player can't brute-force one target). Plate is cleared either way; plated items are consumed on serve, returned on timer-expiry.
* **Edge cases:** timer expiring while the label editor or pause is open — timers freeze with the game. Timer expiring mid-serve-animation: the serve counts (serve locks the timer). Adding a 4th item to the plate: rejected with a dull thud.

### 7.4 Win / lose

* **WIN:** fill all `ORDERS_TO_WIN` (5) approval pips. End screen: "You have good taste." + stats (time, stage deaths, eats, labels written, orders served/failed) + seed + restart.
* **LOSE:** `ORDER_FAILS_TO_LOSE` (3) *consecutive* failed orders. End screen: "The voice fades…" + same stats + restart. (Learning phase cannot lose the run — pillar 2.)

---

## 8. Difficulty & progression — the exact stage ladder

This table is the spine of the game. One row = one stage; each adds exactly one dimension. "Good eats" counters are **in-stage** (reset on entry and on death). All values are config keys (§12).

| Stage | Name (internal) | Inputs (what spawns) | Outputs (circle / bars) | New dimension | Drain rate (per bar/s) | On-screen cap | **Advance when (exact)** |
|---|---|---|---|---|---|---|---|
| **S0** | First Light | 2 hue families (the ones mapped to A+ and A−); circles only; medium only | Circle: 2 halves (top +, bottom −). Bars: 1 | Sight + taste valence | 1.8 | 3 | good eats ≥ **6** AND current streak ≥ **3** |
| **S1** | Appetite | + small and large sizes (weights 30/40/30) | unchanged | Magnitude (dosage) | 1.8 | 3 | good eats ≥ **8** AND streak ≥ **4** |
| **S2** | The Split | + families B+ and B− (4 families total) | Circle splits: 2 sectors (A top, B lower-right), each showing ±. Bars: still 1 (sum of all channel deltas) | Taste has *kinds* | 1.8 | 4 | good eats ≥ **10** AND streak ≥ **4** AND ≥ **3** good eats whose primary channel is B |
| **S3** | Two Hungers | unchanged | Bar splits into A-bar and B-bar (channel deltas now route separately) | Needs have kinds; balance | 1.2 each | 4 | good eats ≥ **8** AND both bars ≥ **40** for **45 consecutive seconds** |
| **S4** | Form | + triangle and square shapes (secondary components; spawn weights circle 40 / tri 30 / sq 30) | unchanged | Shape modifies flavor | 1.2 each | 4 | good eats ≥ **10** AND streak ≥ **4** AND both bars ≥ **40** for **30 consecutive s** |
| **S5** | Third Voice | + families C+ and C− (6 total) + star shape (weights 34/22/22/22) | Circle → 3 sectors AND third bar appears **simultaneously** (pattern already taught by S2→S3) | Third channel | 1.0 each | 5 | good eats ≥ **12** AND all bars ≥ **35** for **45 consecutive s** |
| **S6** | The Calling (chef) | all 6 families, all 4 shapes, all sizes | Bars replaced by approval pips + order UI | Production, not survival | 0 (no drain) | 6 | WIN at 5 pips / LOSE at 3 consecutive fails |

Notes:

* The "hold both bars above X for Y seconds" criteria are the real skill gates — they prove *deliberate* balancing, not lucky streaks. The hold timer displays nowhere (pillar 1); the stage pip pulses faster as criteria near completion (subtle, unlabeled feedback). ⚑ (overridable — invisible thresholds are a deliberate bet; if playtests show players stall confused, `?debug=1` already exposes the counters and we can add a subtle progress glow to the stage pip.)
* Channel D, a 4th bar, and a smell sense (particle aura = a second secondary component) are **P2** — the S2→S3 split pattern generalizes, so they're content, not design.
* No difficulty settings. One tuned ladder plus config knobs (`?fast=1` halves all advancement counters and hold timers for testing).

---

## 9. Style & theme

**Visual style:** darkness-and-bioluminescence. Flat dark void, soft-glow vector blobs, thin luminous UI strokes. No outlines, no textures, no text in the play field (only player labels). Everything breathes slowly. Render: Canvas 2D with `shadowBlur` glows (M2); rectangles until then.

**Palette:**

| Role | Hex |
|---|---|
| Void background | `#0B0E14` |
| UI strokes / text | `#D8D4C8` (70% alpha for secondary) |
| Positive feedback glow | `#F5EFD8` warm white |
| Harm vignette / negative flicker | `#8E1B1B` |
| Bar fill | `#9FD8CB` |
| Ingredient hues | HSL: seed-shuffled 8 families at H ∈ {0,45,…,315}, S 78%, L 58%, jitter ±12° |
| Player labels | `#D8D4C8` at 70% |

**Typography:** system stack `ui-monospace, "Cascadia Mono", Consolas, monospace` — monospace makes player labels feel like field notes. Splash title in the same face, letter-spaced.

**Tone/mood:** hushed, primordial, slightly eerie but never hostile. The world is indifferent, not cruel.

**References:** the wordless deduction of *Return of the Obra Dinn*'s "no one tells you anything" ethos, the abstract synesthesia of *Osmos*, and the unlabeled-language thrill of *Tunic*'s manual — rendered as a petri dish.

**Placeholder plan (M0–M1):** flat-color rects/triangles/stars on `#0B0E14`, stroked arcs for the circle, plain rect bars, browser-default text for labels. No gradients until M2.

---

## 10. Sound design

Audio is P0 content, not polish — the tone language is a core mechanic. **All audio synthesized via Web Audio API oscillators/noise buffers; zero audio asset files.** Audio context unlocks on the splash-screen Play click (satisfies autoplay policy). Mute toggle (`M` + icon) is P0 and persists in `localStorage`.

**SFX event table:**

| Event | Sound | Priority |
|---|---|---|
| Hover ingredient | Its tone phrase (§6.1): channel note(s), sine=+ / saw=− | **P0** |
| Eat, net positive | Soft two-harmonic shimmer chime, 200 ms | **P0** |
| Eat, net negative | Filtered noise burst + low thud, 250 ms (with shake) | **P0** |
| Eat, net zero | Dull swallow "thock", 100 ms | **P0** |
| Stage split | Rising two-note motif (root → fifth), 700 ms | **P0** |
| Order arrives / replay | Mumble (band-passed noise voice) + order phrase (§7.3) | **P0** |
| Order success | Wet crunch then rising major-third hum, 900 ms | **P0** |
| Order failure | Low grumble (saw cluster, 150 Hz), 600 ms | **P0** |
| Plate hover | Combined-vector tone phrase | **P0** |
| Death fade | Slow downward gliss + low-pass sweep to silence | P1 |
| UI clicks, label save | 30 ms ticks | P1 |

**Music:** none at M0–M2. P1: a generative drone — one −24 dB sine per *unlocked channel* playing that channel's note an octave down, so the world literally hums the chord of your current senses and thickens at each split. ⚑ (overridable — drone could muddy tone-reading; ships behind `MUSIC_ON` default true, one keypress to disprove.) Never any copyrighted or external tracks.

---

## 11. UI & screens

**Flow:** `Splash → Game (S0…S5) → [2 s wordless interstitial: bars dissolve, first mumble] → Chef (S6) → Win/Lose screen → (Restart → Splash with same seed | New seed link)`

**Splash screen (mandatory):**

* Title: **GOOD TASTE** + one-liner: "Learn what the colors mean. No one will tell you."
* Rules, ≤5 bullets: **(1)** Something in the corner is running out. **(2)** Click things to eat them. **(3)** Nothing is labeled — figure it out. **(4)** Right-click anything to write your own label. **(5)** One day, something will ask you to cook.
* Controls block: desktop (hover = listen, click = eat, right-click = label, Space = serve, P pause, M mute, R restart) and touch (hold = listen, tap = eat, long-press = label).
* Version number `v0.1.0` bottom-right, sourced from `const VERSION` in `config.js` (splash, debug overlay, and end screen all read this one constant).
* One large **PLAY** button (this click also unlocks audio).

**HUD (always visible in-game):** bars (or approval pips + ear/timer in chef) top-right; pause + mute icons top-left; stage pips bottom-left; version + seed bottom-right at 40% alpha; plate bottom-center (chef only). Nothing else — the field stays clean.

**Pause overlay:** dark scrim, Resume / Restart run / Mute buttons. Game fully frozen.

**End screen (win or lose):** result line, stats grid (time, deaths, eats, good-eat %, labels written, orders served/failed), seed shown as text, buttons: "Again (same world)" / "New world" (new seed).

**Label editor:** small DOM chip at the target's position: 8-char text field + 12 stamp glyphs + ✓/✕. Opening it pauses the sim (prevents dying while typing). ⚑ (overridable — pausing during labeling trades tension for usability; config `PAUSE_ON_LABEL`.)

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/config.js`. The sim reads only from here.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | "0.1.0" | — | Splash, debug overlay, end screen |
| `BAR_MAX` | 100 | pts | Bar cap |
| `BAR_START` | 70 | pts | Start/refill level |
| `DRAIN_1BAR` | 1.8 | pts/s | S0–S2 drain |
| `DRAIN_2BAR` | 1.2 | pts/s/bar | S3–S4 drain |
| `DRAIN_3BAR` | 1.0 | pts/s/bar | S5 drain |
| `EAT_BASE` | 18 | pts per taste unit | Gain scaling |
| `HARM_MULT` | 1.5 | × | Negative delta scaling |
| `SIZE_SMALL_MULT` / `SIZE_LARGE_MULT` | 0.5 / 1.5 | × | Size dosage |
| `SHAPE_SECONDARY_WEIGHT` | 0.4 | taste units | Shape influence |
| `SPAWN_INTERVAL_MS` | 4000 | ms | New blob cadence |
| `EAT_COOLDOWN_MS` | 800 | ms | Anti-spam digest |
| `CIRCLE_DISPLAY_MS` | 1200 | ms | Taste readout duration |
| `ASSIST_MIN_COMPONENT` | 0.3 | taste units | Spawn-director mercy rule |
| `STAGE_TABLE` | per §8 | — | Caps, drains, and thresholds `{goodEats, streak, holdPct, holdSecs, channelBEats}` per stage — the entire pacing lives here |
| `CHANNELS_MAX` | 3 | count | 4 enables channel D (P1) |
| `PLATE_MAX` | 3 | count | Chef plate slots |
| `ORDER_TIME_MS` | 30000 | ms | Per-order timer |
| `ORDER_TOLERANCE` | 0.45 | taste units | Serve match radius |
| `ORDERS_TO_WIN` | 5 | count | Win condition |
| `ORDER_FAILS_TO_LOSE` | 3 | count | Consecutive-fail loss |
| `ORDER_NEG_CHANCE` | 0.30 | prob | Poison orders from order 3 (0 disables) |
| `TONE_FREQS` | [220, 277.18, 329.63, 440] | Hz | Channel notes A–D |
| `TONE_PRIMARY_MS` / `TONE_SECONDARY_MS` | 300 / 180 | ms | Ingredient phrase |
| `ORDER_NOTE_LONG_MS` / `ORDER_NOTE_SHORT_MS` | 500 / 250 | ms | Order phrase magnitude coding |
| `SHAKE_MS` / `SHAKE_AMP` | 250 / 6 | ms / px | Harm juice |
| `LABEL_MAX_CHARS` | 8 | chars | Label length |
| `PAUSE_ON_LABEL` | true | bool | Freeze sim while labeling |
| `MUSIC_ON` | true | bool | P1 drone |
| `DRIFT_SPEED_MIN` / `MAX` | 8 / 14 | px/s | Blob drift |

**URL flags:**

* `?seed=abc123` — seeds mapping, spawns, and orders (mulberry32). Default: random; always displayed bottom-right and on the end screen for reproduction.
* `?debug=1` — overlay showing FPS, stage, in-stage counters + hold timers, the **true mapping table** (family→channel/sign, shape→secondary), taste vector under cursor; cheat keys: `N` force-advance stage, `K` refill bars, `O` skip to chef phase.
* `?stage=4` — start at stage N (bars at `BAR_START`).
* `?fast=1` — halves all `STAGE_TABLE` counters/hold timers and `ORDER_TIME_MS` (playtest pacing).
* `?mute=1` — start muted.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules), zero build step, Canvas 2D for the field + a thin DOM overlay for label chips/HUD text, raw Web Audio API for all sound.** Justification: the scene is <25 slow-moving glowing blobs — Canvas 2D with shadowBlur handles that at 60 fps on any mid-range laptop with no library weight; label editing wants real text inputs, which DOM gives for free; and the tone language *requires* parametric synthesis (per-channel frequencies, sine vs sawtooth, pitch bends), which raw `OscillatorNode`/`GainNode`/`BiquadFilterNode` does directly — Howler/Tone.js would add mass without adding capability. No physics engine: drift is two sine terms. Deploy = copy the folder to the static host (this repo's `public/` already ships verbatim). No runtime network calls; no assets beyond code; `localStorage` only for labels + mute.

**Perf budget:** ≤25 blobs, ≤60 particles (shimmer rings), ≤6 simultaneous oscillator voices, one `requestAnimationFrame` loop with fixed-timestep sim (60 Hz accumulator) so the headless sim and the renderer share identical math.

---

## 14. Milestones

### M0 — Toy loop (prove the learning is fun)

**Goal:** unlabeled learning loop playable S0→S3 with flat rects and real tones (tones are mechanics, so a minimal beep version of the tone language ships in M0). No menus, no labels UI, no chef.

Deliverables: fixed-timestep headless sim (`sim.js`), seeded mapping, spawn/drift, hover tone, eat→circle→bar pipeline, stage ladder S0–S3, stage death/restart, debug overlay.

Acceptance criteria:

- [ ] A first-time player, told nothing but "click things", forms and states a correct color→effect theory within 90 seconds.
- [ ] S2→S3 (bar split) produces a visible "wait, what?" re-learning moment without any text.
- [ ] Same `?seed=` reproduces identical mapping, spawn order, and hue jitter across reloads.
- [ ] Sim runs headless (Node, no DOM) and a script can play 500 random eats without error.
- [ ] 60 fps with 5 blobs on a mid-range laptop.

**Proves:** the core hypothesis' first half. *If watching testers here shows random clicking with no theorizing, stop — the chef phase can't save it.*

### M1 — Real rules

**Goal:** full P0 ruleset: S0–S6 including chef phase, labeling, win/lose, splash with rules + version, HUD, pause/mute/restart.

Deliverables: shapes/secondary components (S4), channel C (S5), chef phase (orders, plate, tolerance matching, pips), right-click labeling with localStorage, splash/end/pause screens, all §12 URL flags.

Acceptance criteria:

- [ ] A tester reaches the chef phase in under 9 minutes without hints.
- [ ] At least one first-time tester recognizes an order tone and says so aloud.
- [ ] Labels persist across reload with the same seed; a new seed starts labels empty.
- [ ] Win and lose are both reachable; end screen stats are correct.
- [ ] Every input in §5's desktop column works exactly as specced; no undocumented inputs.

### M2 — Feel

**Goal:** glow art pass, full synthesized SFX table, juice (shake, vignette, shimmer particles, breathing blobs, split animations), within perf budget.

Acceptance criteria:

- [ ] Harm feedback makes a tester physically flinch or comment; positive feedback reads as "yes" without any label.
- [ ] All P0 sounds from §10 implemented, zero asset files, mute works everywhere including mid-phrase.
- [ ] 60 fps sustained at max entities + particles on a mid-range laptop.

### M3 — Playtest build

**Goal:** deployable, reproducible, instrumented.

Deliverables: deployed under `/games/good-taste/` on the static site, `?fast=1`/`?stage=` verified, journal panel (P1) if time, touch input (P1) if time, one-page tester sheet with the §2 questions.

Acceptance criteria:

- [ ] Game loads and runs from static hosting (no server, no console errors) in Chrome and Firefox.
- [ ] A remote tester can reproduce a reported moment from seed + stage alone.
- [ ] 3 playtests logged against the §2 questions.

Every milestone leaves the game runnable end-to-end.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Are invisible advancement thresholds motivating or stall-inducing? Knobs: `STAGE_TABLE`, plus the pulsing stage pip; fallback is a subtle progress glow.
2. **(non-blocking — resolve in playtest)** Is `ORDER_TOLERANCE = 0.45` forgiving enough that fluent players succeed ~80% of the time and guessers ~20%? Knob exists.
3. **(non-blocking — resolve in playtest)** Do "poison orders" read as a delightful twist or a betrayal? `ORDER_NEG_CHANCE = 0` disables.
4. **(non-blocking — resolve in playtest)** Does 6–8 minutes of learning phase overstay its welcome? `?fast=1` and `STAGE_TABLE` answer it empirically.
5. **(non-blocking)** Red/green hue families are hard for colorblind players; shapes and tones provide partial redundancy. P2: `?cb=1` adds a per-family dot-pattern overlay. Not needed to test the hypothesis.
6. **(non-blocking)** Should labels also be placeable on bars/circle segments in P0 rather than P1? Shipping ingredient-only first; if testers ask "which bar is which" repeatedly, promote it.

No blocking questions — the doc is fully decided.

---

## 16. Handoff notes for Fable

**Build order:** `rng.js` (mulberry32 + seed parsing) → `config.js` → `mapping.js` (families/shapes/tones tables from seed) → `sim.js` (fixed-timestep state machine: stages, bars, eats, spawn director, chef orders — **no DOM, no Canvas, no Audio imports**) → `input.js` → `render.js` (Canvas) → `ui.js` (DOM overlay: HUD, splash, end, label chips) → `audio.js` (tone phrases, SFX) → `main.js` (wires loop). Prove S0–S3 with flat rectangles and plain beeps before any glow, particle, or mumble work — if the toy loop isn't compelling, art won't save it.

**Headless testability:** `sim.js` + `mapping.js` must run in Node. Unit-test at minimum: mapping bijection (8 families ↔ 8 channel-sign pairs, seed-stable), taste-vector formula against hand-computed cases, good-eat/streak accounting, every stage-advancement predicate in §8's table, order generation always-achievable property, and serve-distance matching at the tolerance boundary.

**File layout (deployable as-is, no build):**

```
public/games/good-taste/
  index.html          ← splash + canvas + overlay divs, ES module entry
  design.md           ← this document
  src/
    config.js  rng.js  mapping.js  sim.js  input.js
    render.js  ui.js  audio.js  main.js
  test/
    sim.test.mjs      ← run with `node --test`
```

**Reminders:** every milestone must leave the game runnable; all tuning goes through `CONFIG` (never inline constants); the splash version string, debug overlay, and end screen all read `CONFIG.VERSION`; audio starts only after the Play click; no runtime network calls; and no text label may ever appear on an ingredient, taste segment, or bar unless the player wrote it.
