# LONG LENS — Game Design Document

> Source idea: [Game Idea 28 - Bird Hunt (Theme: Lens or eye piece or sight)](/game-idea-28-bird-hunt-theme-lens-or-eye-piece-or-sight)

---

## 1. Title & one-liner

**Working title:** **LONG LENS** ⚑ (overridable)

**Alternates:** Bird Hunt, Focal Point, Chirp & Click, Out of Focus, The Keeper Book

**One-liner:** A Duck Hunt–style bird *photography* game where your telephoto lens is a movable in-focus circle in a wall of blurry foliage — rack focus with the scroll wheel, find the songbird's layer, and click the shutter before it flies off, while your dog-like friend mocks every miss.

**Genre:** Single-player arcade action / hidden-object hybrid. Mouse-only. Browser.

**Elevator pitch:** Anyone who has pointed a 600mm lens at a chickadee knows the pain: the viewfinder is a tunnel, the depth of field is a razor blade, and the bird is *always* one branch deeper than your focus. LONG LENS turns that exact frustration into the whole game. The screen is six stacked layers of cartoon foliage, all blurry. A flash of color darts in and perches somewhere in that depth stack. Your mouse is the lens: inside a circle around the cursor everything is zoomed 2.5× and only *one* focal layer is sharp; the scroll wheel racks focus forward and back through the layers. Click to take the photo. Nail the layer with the bird framed in the circle and you get a keeper for your photo book. Miss, and Chester — a friend who looks suspiciously like a dog — snickers and offers advice like "Have you tried… aiming?" A round is one 120-second golden hour and a 12-shot roll of film. The frustration is real; the punishment is comedy.

---

## 2. Fun hypothesis

**The single question:** *Is hunting for a bird by racking focus through layered blur — deliberately simulating the frustration of a telephoto lens — fun and moreish, rather than merely annoying, when misses cost you nothing but film and mockery?*

The lens-circle mechanic must carry the entire game. If moving a magnified focus window and scroll-racking through foliage layers to reveal a hidden bird doesn't produce an "ooh — *there* you are — click!" thrill, no amount of species variety or dog jokes will save it.

**Playtest questions (ask after 2 rounds):**

1. When a bird flew in, did you feel tension or tedium while racking focus to find it?
2. Did you ever take a photo you were *proud* of (framing, timing), or only photos you were relieved to get?
3. Was Chester funny, annoying-in-a-good-way, or annoying-in-a-quit-the-game way?
4. Could you tell which layer the bird was on from the blur, or were you scroll-mashing blindly?
5. Did you immediately want another roll of film when the round ended?

---

## 3. Design pillars

1. **The lens IS the game.** Every mechanic lives inside the focus-circle metaphor: zoomed sharp inside, blurry outside, one focal plane at a time. Nothing may bypass it (no minimap, no "bird radar" arrow, no auto-focus).
2. **Frustration is the comedy, not the punishment.** Missing must never lose the game or subtract score — it costs one frame of film and earns you a dog quip. The player laughs *at themselves* and re-shoulders the lens.
3. **Real birding texture.** Distinct species with distinct temperaments (patient sparrow, hyperactive kinglet, drive-by kingfisher), points for rarity, and a photo book of keepers at round end. The fantasy is "backyard bird photographer," not "shooter."
4. **Readable at a blur.** Every bird must be identifiable from a blurry color-flash alone (silhouette + one saturated accent color). If a playtest shows players can't tell bird from leaf, the art is wrong, not the player.

If a feature doesn't serve one of these four, cut it.

---

## 4. Core game loop

Session target: **one round = 120 seconds** plus ~20 s of photo-book review. Full session with restart: 2–5 minutes.

**Loop phases (repeats 8–14× per round):**

1. **LISTEN (0.5–1 s).** A wing-flutter sound plays and a blurred streak of color sweeps in from a screen edge and stops somewhere in the foliage. The player *sees where* (x/y) but not *how deep* (layer). Feel: alert, ears up.
2. **STALK (1–4 s).** Player moves the lens circle over the landing spot. Inside the circle, the scene is zoomed 2.5×; only the current focal layer is sharp. Player scrolls to rack focus layer-by-layer, watching blobs of color snap in and out of focus. Feel: leaning in, breath held.
3. **FRAME (0.5–2 s).** The bird resolves sharp. It hops, twitches, and its perch timer is silently ticking. Player centers it in the circle. Feel: don't-blow-it tension.
4. **SHOOT (instant).** Left click. Shutter blackout for 150 ms, then the photo result: **KEEPER** (bird sharp and framed → score pops, photo thumbnail flies to the film-roll HUD) or **MISS** (empty branch / blurry smear → Chester snickers and quips). Feel: triumph or comic deflation.
5. **RESET.** Bird flies off (or was captured); short lull; next spawn. Every miss and every un-photographed escape triggers Chester.

```
        ┌──────────────────────────────────────────────┐
        │                                              │
        ▼                                              │
  [LISTEN: flash of color lands]                       │
        │                                              │
        ▼                                              │
  [STALK: move lens + scroll-rack focus]               │
        │                                              │
        ▼                                              │
  [FRAME: bird sharp in circle]──(bird flies off)──► [Chester quips]
        │                                              ▲
        ▼                                              │
  [SHOOT: click]───(miss: wrong layer/empty)───────────┘
        │
     (keeper)
        │
        ▼
  [photo → book, +score] ──► next bird … until timer/film ends ──► PHOTO BOOK screen
```

---

## 5. Inputs & controls

**Touch viability:** Viable as P1, not P0. The core mouse mapping (move + wheel + click) translates to drag + on-screen focus buttons + shutter button, but the wheel-rack feel is the heart of the game, so prove it on desktop first. The doc specs touch anyway; implement in M3 if time allows.

### Desktop (P0)

| Input | Action |
|---|---|
| Mouse move | Move the lens circle (cursor is the lens center). |
| Scroll wheel up (one notch) | Rack focus one layer **nearer** (focalLayer − 1, clamped to 0). |
| Scroll wheel down (one notch) | Rack focus one layer **deeper** (focalLayer + 1, clamped to `LAYER_MAX_FOCUS`). |
| Left mouse button | Take photo (if film > 0 and shutter not on cooldown). |
| `P` or `Esc` | Pause / unpause (freezes timer, birds, and input; shows pause overlay). |
| `M` | Mute / unmute all audio. |
| `R` | Restart round (confirm not required; instant). |
| `H` | Toggle help overlay (controls + rules recap). |
| `D` | Toggle debug overlay (only when `?debug=1`). |

### Touch (P1)

| Input | Action |
|---|---|
| One-finger drag | Move the lens circle (lens centers on finger, offset 80 px above touch point so the finger doesn't cover it). |
| On-screen `−` / `+` buttons (bottom-right, 64 px) | Rack focus nearer / deeper, one layer per tap. |
| On-screen shutter button (bottom-center, 80 px) | Take photo. |
| HUD icons: ⏸ / 🔇 / ↺ | Pause / mute / restart. |

No other inputs exist. There is no panning — the scene is fixed, exactly as the source idea specifies.

---

## 6. Game elements

### 6.1 The scene (depth stack)

A fixed 1280×720 (16:9, letterboxed to fit window) forest scene built from **7 layers**, index 0 = nearest the camera, 6 = farthest:

| Layer | Contents | Foliage coverage | Perchable? | Focusable? |
|---|---|---|---|---|
| 0 | Foreground obstruction: big out-of-frame leaf/branch silhouettes hanging into the top/sides | ~20% of frame, edges only | No | Yes |
| 1 | Near branches + dense leaves | ~40% | Yes | Yes |
| 2 | Mid branches + leaves | ~40% | Yes | Yes |
| 3 | Mid branches + leaves | ~35% | Yes | Yes |
| 4 | Far branches + sparser leaves | ~30% | Yes | Yes |
| 5 | Farthest twigs + thin foliage | ~25% | Yes | Yes |
| 6 | Sky/backdrop gradient (golden hour) | 100% flat backdrop | No | No |

- Each perchable layer (1–5) has **4 fixed perch points** (branch tips), authored as coordinates in the level data — 20 perch points total, spread so no two perches on different layers are within 60 px of each other in screen space (so blur ambiguity is about *depth*, not *position*).
- Layers are pre-rendered once at load into offscreen canvases (procedural: branch polylines + leaf-cluster blobs from the seeded RNG). Nearer layers use darker, larger shapes; farther layers lighter, smaller (see §9 palette).
- Draw order is back-to-front (6 → 0), so foliage on layers *nearer* than a bird partially occludes it. Perch points are authored in foliage gaps so a perched bird is ≥60% visible from the camera.

### 6.2 The lens (the player)

The player has no avatar; the lens circle is the player.

- **Circle radius:** `LENS_RADIUS` = 140 px, centered on the cursor.
- **Inside the circle:** the scene is redrawn **zoomed `LENS_ZOOM` = 2.5×** about the cursor point, clipped to the circle. Per-layer sharpness: blur radius = `|layer − focalLayer| × BLUR_PER_LAYER` px, where `BLUR_PER_LAYER` = 7, capped at 21 px. The focal layer is blur 0 (tack sharp).
- **Outside the circle:** the whole scene at 1× with uniform `OUTSIDE_BLUR` = 6 px blur, 80% saturation, and a subtle dark vignette. It must stay readable enough to see a color-flash land, but never sharp enough to identify a bird.
- **Rim:** a 4 px lens ring with two small tick marks; a **depth gauge** arc on the ring shows focalLayer position (0 = top of arc, 5 = bottom) so the player always knows where in the stack they are.
- **Focus rack:** on scroll, focalLayer changes instantly for game logic, but blur amounts tween over `FOCUS_RACK_MS` = 120 ms (ease-out) so the rack *feels* mechanical. Play a soft "focus tick" per notch.
- **Rendering strategy (implementer note):** `ctx.filter = 'blur(Npx)'` per layer per frame is too slow. Instead: cache each layer canvas pre-blurred at the 6 discrete blur levels (0/7/14/21 px + the 6 px outside blur) at load (7 layers × ≤5 variants ≈ 35 offscreens at 1280×720 — fine on a mid-range laptop). Composite = cheap `drawImage` calls. Birds are drawn live each frame with `ctx.filter` blur (≤3 birds, acceptable). The zoomed circle is a clipped, scaled `drawImage` of the same cached canvases.

### 6.3 Birds (the targets)

Common behavior: a bird spawns off-screen on one perchable layer, flies in over `FLYIN_MS` = 1500 ms along a shallow arc to a free perch point on its layer (drawn blurred per its layer's blur — the "flash of color"), perches (perch timer runs), optionally hops to another perch, then flies off-screen over 1200 ms. While perched it idle-animates: 2 px bob at 2 Hz, occasional 20° head flick. Max `MAX_BIRDS_ONSCREEN` = 2 birds at once (P0), 3 in the final minute.

A **hop** = fly to a different free perch point over 700 ms; a **layer hop** (some species) picks the new perch on an adjacent layer (±1), forcing a re-rack.

Placeholder art (M0–M1): a colored 28×20 px rounded rectangle with a 6 px beak triangle, in the species' accent color. Final art (M2): flat-vector bird silhouette, ~36×26 px at 1× (so ~90×65 px inside the lens), two-color (body + accent).

**Species roster (all P0 except where marked).** Perch time = how long it sits at each perch. Hops = number of extra perches after the first.

| # | Bird | Appearance (accent on silhouette) | Layer behavior | Perch time / hops | Points | Priority |
|---|---|---|---|---|---|---|
| 1 | **House Sparrow** | Dumpy brown body, gray cap, stubby beak | Spawns layers 1–3; never layer-hops | 8 s / 0 hops | 75 | P0 |
| 2 | **Black-capped Chickadee** | Gray body, black cap and bib, white cheek | Spawns layers 2–4; hops within its layer | 4 s / 2 hops | 100 | P0 |
| 3 | **Northern Cardinal** | Vivid red all over, crest, black face | Spawns layers 1–4; easy to spot, hard to resist | 5 s / 1 hop | 100 | P0 |
| 4 | **American Goldfinch** | Bright yellow, black wings and forehead | Spawns layers 2–5; **layer-hops ±1 once** | 4 s / 1 hop | 150 | P0 |
| 5 | **Cedar Waxwing** | Tan crest, black mask, yellow tail tip | Spawns layers 3–5; **arrives as a pair** on the same layer, 2 perches apart — photograph either; both in circle & sharp = 2× bonus | 4 s / 1 hop | 200 each | P0 |
| 6 | **Ruby-crowned Kinglet** | Tiny olive blob, red crown flash, half size (18×14 px) | Spawns layers 2–5; hyperactive — **layer-hops ±1 on every hop** | 1.5 s / 4 hops | 300 | P0 |
| 7 | **Rufous Hummingbird** | Tiny, orange body, wing-blur oval | No perch: **hovers** at a random point on layers 1–4 for 2.0 s, relocates once (400 ms dart, may change layer ±1), hovers 2.0 s more, leaves | 2 s hover ×2 / — | 350 | P0 |
| 8 | **Belted Kingfisher** | Big (48×30 px), blue-gray, shaggy crest, dagger beak | **Never stops.** Flies straight across the full frame on layer 3 at 260 px/s, rattling call announces it 1 s early. Only moving-shot target | flyby ~5 s / — | 400 | P0 |
| 9 | **Steller's Jay** | Large (44×30 px), black head/crest, deep blue body | Spawns layers 1–2 (near, loud, easy); **photobomber** — 40% chance it spawns 2 s after another bird and perches on a *nearer* layer within 100 px screen-distance of it, tempting a wrong-layer shot | 7 s / 0 hops | 50 | P0 |
| 10 | **Varied Thrush** | Orange breast, black necklace band, slate back | Spawns layers 4–5 only (always deep in the stack); sits dead still | 6 s / 0 hops | 250 | P1 |

Spawn weights and the round schedule are in §8 and §12.

### 6.4 Chester (the dog-like friend)

- **What he is:** a friend who *looks oddly like* a dog (never confirmed). Sits in the bottom-left corner, ~140 px tall, outside the play-relevant area. He is the miss penalty and the game's whole personality. **P0.**
- **Placeholder (M0–M1):** tan rectangle with two triangle ears and a text speech bubble. **Final (M2):** flat-vector cartoon — tan hound shape in a tiny birding vest, one ear perpetually inside-out, holding a thermos.
- **Behavior:** idle = slow breathing bob + occasional ear twitch. On trigger: snicker animation (shoulders shake, eyes close, "hhh-hhh-hhh"), speech bubble appears for `QUIP_DURATION_MS` = 3000 ms with one quip. Quips draw from a shuffled deck (no repeat until deck exhausted). One quip max on screen; new triggers during an active quip are dropped, not queued.
- **Triggers:** (a) photo taken that is a MISS; (b) a bird leaves the scene un-photographed; (c) 20 s elapse with no photo taken (impatience quip). Trigger (c) fires at most twice per round.
- **He never helps.** No quip may contain actionable information about the current bird's layer or position (pillar 1).

**Quip deck (P0 — ship all of these):**

From the source idea:
1. "You know, birds tend to sit still when you're not panicking."
2. "Have you tried… aiming?"
3. "That one was definitely a leaf."

New:
4. "Great shot of that branch. Really captured its personality."
5. "Autofocus was invented in 1977. Just saying."
6. "I could've caught that one. With my mouth."
7. "The bird waited. It genuinely waited. I watched it wait."
8. "Wrong layer, champ. The bird was in the tree, not the *idea* of the tree."
9. "Ansel Adams shot mountains. Mountains hold still. Consider mountains."
10. "Ooh, so close. To something."
11. "I've seen the bird. It's lovely. You'll have to trust me on this."
12. "Shhh. Shh-shh-shh. …It left."
13. "Fun fact: the shutter also works when a bird is in the frame."
14. "Your scroll wheel goes both ways. I looked it up."
15. "That's going straight into the blooper book."
16. "Don't worry, the blur really says something. About you."

Impatience-trigger quips (deck of 2, used only for trigger c):
17. "Take your time. The birds have literally nowhere to be. Oh wait."
18. "Are we photographing today, or are we more… conceptual?"

### 6.5 Film roll & photo book

- **Film:** `FILM_PER_ROUND` = 12 shots. HUD shows remaining frames as film-canister pips. Every click spends one frame, hit or miss.
- **Photo (on click):** the game captures the lens-circle contents as a 280×280 px image (the actual rendered circle, including blur — misses look hilariously like leaves) and stores it in memory with metadata (species or "…a leaf?", points, timestamp).
- **Photo book (end screen):** grid of all 12 (or fewer) photos, keepers framed in gold with species name + points, misses framed in gray with a Chester caption. Best photo (highest points, ties → most-centered) is enlarged as the "cover shot."

### 6.6 Shutter

- Click → immediate freeze of game state for evaluation → 150 ms black flash + shutter SFX → result toast. `SHUTTER_COOLDOWN_MS` = 400 ms between shots. Clicks during cooldown are ignored (no film spent).

---

## 7. Rules, win & lose conditions

### Photo evaluation (the core rule — exact)

A photo is a **KEEPER** iff, at the click instant:

1. A bird's center point is within `HIT_RADIUS_FACTOR` × `LENS_RADIUS` = 0.85 × 140 = 119 px of the cursor (screen-space, pre-zoom coordinates), **and**
2. `focalLayer == bird.layer` (exact match; ±1 is a miss), **and**
3. Film > 0 (enforced before the shot).

Everything else is a **MISS**. A bird mid-hop or mid-fly-in/out is still shootable (its layer = current layer; for layer-hops, the layer switches at the midpoint of the hop tween).

### Scoring

- Keeper score = species base points × multipliers:
  - **Centered bonus** ×1.5 if the bird's center is within 0.35 × `LENS_RADIUS` = 49 px of the cursor.
  - **In-flight bonus** ×1.5 if the bird was flying/hovering/hopping (not perched) at click time. (Kingfisher is always in flight; his 400 already assumes it — no double-dip: species with `alwaysFlying=true` skip this multiplier.)
  - **Waxwing pair bonus** ×2 applied once if both waxwings satisfy rules 1–2 in the same shot (score = one waxwing × 2; the shot photographs both).
- Multipliers stack multiplicatively, rounded to nearest 5.
- Misses score 0 and never subtract anything (pillar 2).

### Round end

The round ends when **either** the 120 s timer expires **or** film reaches 0 (whichever first). Then the photo book screen shows results.

- **Rank thresholds (P0):** total score ≥ 2200 → "Golden Feather" ★★★; ≥ 1200 → "Solid Roll" ★★; ≥ 400 → "At Least You Went Outside" ★; else "Chester's Favorite Album" (no stars; Chester appears on the book cover looking delighted).
- There is no lose state. The rank *is* the win condition gradient.

### Edge cases (decided)

- **Timer expires mid-shutter animation:** the click registered before 0.0 s counts; the photo resolves, then the round ends.
- **Film hits 0:** round ends 800 ms after the final photo's result toast (let the player see it).
- **Two birds both satisfy the keeper rules in one shot:** score the highest-value one only (waxwing pair rule is the sole exception). The photo metadata names that bird.
- **Bird flies off-screen during shutter blackout:** evaluation uses the click-instant snapshot; the bird still counts.
- **Pause:** freezes timers, tweens, spawn schedule, and Chester's bubble timer. Muting works while paused.
- **Cursor leaves the canvas:** lens circle hides; scene is fully blurred; game keeps running (birds keep perching/leaving). This mirrors the source's "your mouse is off to the left" opening beat.
- **Spawn with no free perch on the chosen layer:** re-roll the layer; if all full, delay spawn 1 s and retry.

---

## 8. Difficulty & progression

Single tuned difficulty for the prototype (P0), one round shape, no meta-progression. The SNES-style level-select map, unlockable lenses, and camera settings (ISO/shutter/f-stop) from the source notes are **explicitly deferred to P2** — they don't test the hypothesis. ⚑ (overridable)

**Within-round ramp (P0), driven by the spawn scheduler:**

| Phase | Time | Spawn interval (gap after previous bird's departure) | Species pool (weights) |
|---|---|---|---|
| Warm-up | 0–30 s | 4–6 s | Sparrow 40, Chickadee 30, Cardinal 30 |
| Mid | 30–75 s | 3–5 s | Sparrow 15, Chickadee 20, Cardinal 15, Goldfinch 20, Jay 15, Waxwing-pair 15 |
| Golden | 75–120 s | 2–4 s; `MAX_BIRDS_ONSCREEN` rises to 3 | Chickadee 10, Goldfinch 15, Waxwing-pair 15, Kinglet 20, Hummingbird 15, Kingfisher 15, Jay 10 |

- Kingfisher spawns at most twice per round; Hummingbird at most twice; Kinglet at most three times.
- The scheduler is deterministic from the RNG seed (see §12), so `?seed=` reproduces an identical round.
- **Difficulty knobs for playtest** (all in config): perch times (global multiplier `PERCH_TIME_SCALE` = 1.0), `BLUR_PER_LAYER`, `LENS_RADIUS`, `FILM_PER_ROUND`, spawn intervals.

Across-rounds: none in P0. P1: a one-line "best score" persisted in `localStorage` shown on the splash.

---

## 9. Style & theme

- **Visual style:** flat vector cartoon, no outlines on foliage (soft blob shapes), 2 px dark outlines on birds and Chester only. Everything drawn as code (Canvas paths) — zero image assets. Warm, storybook-calm; the comedy comes from Chester, not wacky art.
- **Mood/tone:** golden-hour hush punctured by dog snark. References: **"Firewatch's poster palette meets Duck Hunt, narrated by the dog from Duck Hunt after obedience school failed."** Also: A Short Hike's friendly flatness; Untitled Goose Game's deadpan.
- **Palette (hex):**
  - Sky backdrop gradient: `#FFE8A3` (top) → `#F4A259` (horizon)
  - Layer 5 foliage: `#A3B18A` · Layer 4: `#7FA05F` · Layer 3: `#588157` · Layer 2: `#3A5A40` · Layer 1: `#344E41` · Layer 0 (foreground silhouettes): `#1F3325`
  - Lens ring & HUD: `#F8F4E3` at 90% opacity; depth-gauge active tick `#F4A259`
  - Chester: body `#C68B59`, vest `#5B7553`, speech bubble `#FFFFFF` with `#1F3325` text
  - Bird accents: sparrow `#8B6F47`, chickadee `#2B2B2B`/`#F8F4E3`, cardinal `#D62828`, goldfinch `#FFD60A`, waxwing `#D8B863`/`#FFDD00` tail, kinglet `#7A8B4C`/`#E63946` crown, hummingbird `#F77F00`, kingfisher `#457B9D`, jay `#1D3557`, thrush `#F77F00`/`#2B2B2B`
- **Typography:** system stack `"Segoe UI", "Helvetica Neue", Arial, sans-serif` for HUD; Chester's quips in the same font, italic. No webfonts (keeps the build asset-free). ⚑ (overridable — a hand-drawn font would suit Chester if asset budget allows)
- **Placeholder plan (M0–M1):** foliage = random rounded rects per layer in the layer's palette color; birds = colored rects with beak triangles (§6.3); Chester = tan rect + triangle ears; lens = plain circle stroke. The blur/zoom pipeline is real from M0 — blur is the mechanic, not art.

---

## 10. Sound design

All SFX synthesized in code via Web Audio (jsfxr-style parameter presets — no audio files). Audio context is created/resumed only on the first user gesture (the splash Play click). **Mute toggle is P0** (`M` key + HUD icon, persisted in `localStorage`).

### SFX event table

| Game event | Sound description | Priority |
|---|---|---|
| Bird spawns (fly-in starts) | Soft wing-flutter: 3 short filtered noise puffs, panned from the spawn edge | P0 |
| Focus rack (per wheel notch) | Mechanical tick: 30 ms square blip, pitch rises with deeper layer (adds depth feedback by ear) | P0 |
| Shutter (click) | Classic SLR "ka-chunk": noise burst + low thud, 120 ms | P0 |
| Keeper result | Bright two-note chime (C5→E5 sine, 200 ms) + soft paper "flip" | P0 |
| Miss result | Deflating single low note (G2 triangle, 250 ms) | P0 |
| Chester snicker | Three breathy noise pulses "hhh-hhh-hhh", pitched down | P0 |
| Round end | Gentle four-note resolve jingle | P0 |
| Kingfisher approach | Dry rattle call (fast square-wave trill, 600 ms) 1 s before he enters — his only tell | P1 |
| Per-species perch chirp | 2–3 note chirp motif per species (helps locate by ear; keep quiet) | P1 |
| Hummingbird hover | Low soft buzz while on screen | P1 |
| Waxwing pair | High thin "sree-sree" double note on arrival | P1 |

### Music

**None in P0.** A generative ambience bed (very sparse: birdsong-adjacent sine chirps + low wind noise, seeded) is P1. Never any copyrighted tracks.

### Implementation

Plain Web Audio API (no Howler — only ~10 synth presets needed). One tiny `sfx.js` module: `play(name)` with a preset table of oscillator/noise/envelope params. Master gain node for mute.

---

## 11. UI & screens

**Flow:** `SPLASH → PLAYING ⇄ PAUSED → PHOTO BOOK → (Play again) → PLAYING` (`R` from anywhere in PLAYING restarts; book's "Back" returns to SPLASH).

### Splash screen (mandatory contents)

- Title: **LONG LENS** with a lens-circle motif over the "O"; one-liner: *"Photograph the songbirds. Survive your friend's commentary."*
- Rules (≤5 bullets, verbatim):
  - A bird lands somewhere in the blurry trees — you saw *where*, not *how deep*.
  - Your mouse is a telephoto lens: inside the circle is zoomed; only one focus layer is sharp.
  - Scroll to rack focus through the layers until the bird is sharp.
  - Click to shoot. Sharp + framed = keeper. Anything else = one wasted frame and a snickering friend.
  - 120 seconds, 12 shots. Fill your photo book.
- Controls block: desktop mappings (and touch, if built), exactly as §5.
- **Version number** bottom-right, e.g. `v0.1.0`, rendered from the single `GAME_VERSION` constant (same constant the debug overlay prints).
- One large **▶ SHOULDER THE LENS** button (this gesture also unlocks audio). Best score from `localStorage` shown under it (P1).
- Chester idles at bottom-left of the splash. On hover he says "No pressure." (P1)

### HUD (during play, all edges, never inside the center 60% of the frame)

- Top-left: round timer `1:47` (turns `#D62828` under 15 s).
- Top-right: score.
- Bottom-right: film pips (12 small canisters; spent = hollow) — on touch, the focus `−/+` buttons sit above them.
- On the lens ring: the depth gauge arc (§6.2) — focal layer is *always* visible without looking away from the action.
- Bottom-left: Chester + his speech bubble.
- Result toasts appear just above the lens circle for 900 ms: `KEEPER! Goldfinch ×1.5 centered = 225` or `…that's a branch.`
- Pause overlay: dimmed scene, "PAUSED", resume/restart/mute buttons, controls recap.

### Photo book (end screen)

- Headline rank + stars (§7), total score, keeper count `7/12 frames`.
- Cover shot (best photo) large on the left; grid of all photos right (gold frames = keepers with species + points; gray frames = misses with a rotating Chester caption like "framed it beautifully. it = leaf").
- Buttons: **Another roll** (restart, same settings, new seed unless `?seed=` set) and **Back to splash**.
- Chester delivers one rank-appropriate line ("Golden Feather? Fine. I'm impressed. Don't tell anyone I said that.")

---

## 12. Config & tuning

Single exported object `CONFIG` in `config.js`; every value below lives there and nowhere else. `GAME_VERSION = "0.1.0"` lives beside it.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `ROUND_SECONDS` | 120 | s | Round length |
| `FILM_PER_ROUND` | 12 | shots | Shots per round |
| `CANVAS_W` / `CANVAS_H` | 1280 / 720 | px | Fixed internal resolution (scaled to fit window, letterboxed) |
| `LAYER_COUNT` | 7 | — | Depth layers incl. sky |
| `LAYER_MAX_FOCUS` | 5 | index | Deepest focusable layer |
| `PERCH_POINTS_PER_LAYER` | 4 | — | Perches on each of layers 1–5 |
| `LENS_RADIUS` | 140 | px | Lens circle size |
| `LENS_ZOOM` | 2.5 | × | Magnification inside lens |
| `BLUR_PER_LAYER` | 7 | px | In-lens blur per layer of focal distance (cap 21) |
| `OUTSIDE_BLUR` | 6 | px | Blur outside the lens |
| `FOCUS_RACK_MS` | 120 | ms | Blur tween per wheel notch |
| `FOCUS_START_LAYER` | 3 | index | Focal layer at round start |
| `HIT_RADIUS_FACTOR` | 0.85 | ×radius | Keeper rule 1 |
| `CENTER_BONUS_FACTOR` | 0.35 | ×radius | Centered ×1.5 zone |
| `CENTER_BONUS_MULT` / `FLIGHT_BONUS_MULT` | 1.5 / 1.5 | × | Score multipliers |
| `SHUTTER_COOLDOWN_MS` | 400 | ms | Min time between shots |
| `SHUTTER_BLACKOUT_MS` | 150 | ms | Shutter animation |
| `FLYIN_MS` / `FLYOUT_MS` / `HOP_MS` | 1500 / 1200 / 700 | ms | Bird movement tweens |
| `MAX_BIRDS_ONSCREEN` | 2 (3 after 75 s) | — | Concurrency cap |
| `PERCH_TIME_SCALE` | 1.0 | × | Global perch-duration multiplier (main difficulty dial) |
| `SPAWN_GAP_WARMUP` / `_MID` / `_GOLDEN` | [4,6] / [3,5] / [2,4] | s | Spawn intervals per phase |
| `PHASE_MID_AT` / `PHASE_GOLDEN_AT` | 30 / 75 | s | Ramp boundaries |
| `QUIP_DURATION_MS` | 3000 | ms | Chester bubble time |
| `IMPATIENCE_QUIP_S` | 20 | s | No-shot quip trigger |
| `RANK_3 / RANK_2 / RANK_1` | 2200 / 1200 / 400 | pts | Star thresholds |
| `SPECIES` | table §6.3 | — | Per-species: size, accents, layers, perchTime, hops, layerHop, points, weights per phase, caps |
| `TOUCH_LENS_OFFSET_Y` | 80 | px | Lens offset above finger (touch) |

**URL flags:**

- `?seed=<string>` — seeds the RNG (mulberry32 over a string hash). Same seed ⇒ identical foliage, spawn schedule, species, perch choices, and quip deck order.
- `?debug=1` — enables the `D` overlay: FPS, current focalLayer, live bird list (species, layer, state, perch timer), spawn phase; layer index labels on perch points; cheat keys `N` (spawn next bird now), `F` (refill film), `T` (+30 s), `1–8` (force-spawn species by roster number), `K` (skip to photo book).
- `?skip=1` — bypass splash straight into a round (playtest convenience).
- `?round=<s>` / `?film=<n>` — override round length / film count for quick tests.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + Canvas 2D. Zero build step.** A single `index.html` loading `src/*.js` modules; deploy = copy the folder. Rationale: the game is one fixed scene with ≤3 animated birds — no sprite-count pressure that would justify Pixi, no physics (Matter.js buys nothing), and the one genuinely hard rendering problem (per-layer blur + a zoomed clipped circle) is solved cleanly in raw Canvas 2D with the pre-blurred layer cache described in §6.2 — a technique that's *harder* to express in a scene-graph library. Audio is ~10 Web Audio synth presets, no Howler. No TypeScript to keep the zero-build promise. ⚑ (overridable — if the blur cache disappoints visually, the fallback is Pixi + `BlurFilter` with cacheAsBitmap, a contained swap in `render.js`.)

**Perf budget:** 60 fps on a mid-range laptop. Per frame: ≤12 full-canvas `drawImage` composites (7 outside + ≤5 inside the clip), ≤3 live-blurred birds, ≤40 particles (M2 juice cap), zero per-frame `ctx.filter` on layer canvases. Layer cache cost at load: ~35 offscreen canvases ≈ 130 MB worst case is too fat — mitigate by only caching the blur variants actually reachable per layer (|Δ| ≤ 5 ⇒ ~26 canvases) and using `willReadFrequently:false`; if memory becomes an issue, halve cache resolution for blur ≥ 14 px (blurry content survives downsampling invisibly). No runtime network calls; everything procedural.

---

## 14. Milestones

### M0 — Toy loop (the blur toy)

**Goal:** prove the lens-circle + focus-rack + shoot loop is fun with rectangles.

**Deliverables:** fixed 7-layer rect-foliage scene; lens circle with zoom, per-layer blur, wheel rack; one generic bird (rect) spawning on random layers 1–5, perching 5 s, leaving; click evaluation (keeper/miss console + toast); infinite film, no timer, no Chester, no audio.

**Acceptance criteria:**
- [ ] Lens circle shows 2.5× zoom; exactly one layer is sharp inside it; outside is uniformly blurred.
- [ ] Scroll racks focus with a visible 120 ms blur tween; depth gauge on the ring reflects focalLayer.
- [ ] A spawned bird is findable by blur alone (no debug labels) by a first-time player within ~10 s.
- [ ] Clicking with correct layer + bird in circle reports KEEPER; wrong layer reports MISS; both are visibly obvious.
- [ ] 60 fps with lens moving fast (Chrome devtools FPS meter).

**Proves:** the core hypothesis, mechanically. **If racking focus to find a rectangle isn't at least a little delightful, stop here.**

### M1 — Real rules

**Goal:** full P0 ruleset in a complete round.

**Deliverables:** 120 s timer + 12-frame film; spawn scheduler with 3 phases and species table (all 9 P0 species, rect placeholders with correct sizes/colors/behaviors incl. waxwing pair, kinglet layer-hops, hummingbird hover, kingfisher flyby, jay photobomb); scoring with multipliers; Chester rect with full quip deck and triggers; splash (rules, controls, version), HUD, pause/mute/restart, photo book with captured lens-circle photos and ranks.

**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds unprompted (splash alone suffices).
- [ ] A full round runs splash → play → photo book → restart with no console errors.
- [ ] All 9 species behave per the §6.3 table (verified via `?debug=1` force-spawn keys).
- [ ] Chester quips on every miss and every escape, never repeats before deck exhaustion, never overlaps bubbles.
- [ ] `?seed=abc` twice ⇒ identical rounds (same spawns, layers, perch choices).
- [ ] Misses never reduce score; round ends correctly on both timer-zero and film-zero paths.

### M2 — Feel

**Goal:** golden hour, birdsong, juice.

**Deliverables:** P0 art pass (procedural foliage blobs per palette, vector birds with accents, Chester with snicker animation, lens ring polish); all P0 SFX + mute; juice: shutter blackout + photo "fly to film roll" tween, keeper score pop, focus-rack tick pitch ramp, subtle 3 px screen nudge on kingfisher entry, ≤40-particle leaf rustle when a bird lands.

**Acceptance criteria:**
- [ ] Every bird species is identifiable *while blurred* by color-flash alone (playtester names 3 of 5 correctly).
- [ ] All P0 SFX fire; audio starts only after the Play click; `M` mutes everything and persists.
- [ ] Keeper vs miss feels different within 200 ms (sound + visual) without reading text.
- [ ] Still 60 fps during golden phase with 3 birds + particles.

### M3 — Playtest build

**Goal:** shippable, reproducible, measurable.

**Deliverables:** all URL flags (§12) verified; debug overlay complete; `localStorage` best score on splash; deployed to static host under `/games/bird-hunt/`; P1 items if time allows, in this order: per-species chirps + kingfisher rattle → touch controls → Varied Thrush → generative ambience → splash Chester hover line.

**Acceptance criteria:**
- [ ] Deployed URL runs the full game from a hard refresh with zero network calls after load (devtools Network tab confirms).
- [ ] `?seed=`, `?debug=1`, `?skip=1`, `?round=`, `?film=` all work on the deployed build.
- [ ] Version on splash matches `GAME_VERSION` and the debug overlay.
- [ ] Two external playtesters complete 2 rounds each and answer the §2 questions.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is exact-layer matching too punishing, or exactly the right frustration? Knob: add `LAYER_TOLERANCE` (0 = exact; 1 = adjacent counts at 0.5× points). Ships at 0.
2. **(non-blocking — resolve in playtest)** Is `BLUR_PER_LAYER` = 7 px enough separation to *count* layers by eye, or do players scroll-mash? Knobs: `BLUR_PER_LAYER`, `LAYER_MAX_FOCUS` (could reduce focusable layers to 4).
3. **(non-blocking — resolve in playtest)** Does Chester's trigger rate land as comedy or as noise? Knobs: `QUIP_DURATION_MS`, disabling trigger (c), a `?dog=0` flag for A/B.
4. **(non-blocking — resolve in playtest)** Is 12 frames of film the right scarcity, or does it make players too shy to shoot? Knob: `FILM_PER_ROUND`, `?film=`.
5. **(non-blocking)** Do the pre-blurred layer caches look acceptably close to true depth-of-field, or does the discrete-step blur read as "cheap"? Fallback stack swap noted in §13.
6. **(non-blocking)** Touch: is the two-button focus rack tolerable, or does the game need a pinch-to-rack gesture to be worth shipping on mobile at all? Decide after desktop playtest; P1 either way.

No blocking questions. Everything above ships with the listed default.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → seeded RNG → headless sim core (`sim.js`: layers/perches, bird state machines, spawn scheduler, shot evaluation, scoring, round timer) → input (`input.js`: mouse/wheel/keys) → renderer (`render.js`: layer generation + blur cache first, then lens composite, then birds, then HUD) → screens/UI (`ui.js`: splash/pause/book) → Chester (`chester.js`: triggers + quip deck) → audio (`sfx.js`) → debug overlay → juice.

**Keep headless-testable:** everything in `sim.js` must run without a DOM — `new Sim(CONFIG, seed)`, `sim.tick(dt)`, `sim.moveLens(x,y)`, `sim.rack(±1)`, `sim.shoot() → {result, bird, points, multipliers}`. Unit-test at minimum: shot evaluation geometry (rules 1–2 incl. the 0.85 and 0.35 radii), waxwing pair bonus, layer-hop midpoint layer switch, scheduler determinism for a fixed seed, film/timer round-end edge cases from §7. The renderer only *reads* sim state.

**Repo / deploy layout** (this is a static-hosted folder in a Jekyll/GitHub Pages site — the folder itself is the deployable):

```
public/games/bird-hunt/
├── design.md          (this file)
├── index.html         (canvas + module script tag; the deployable entry)
├── src/
│   ├── config.js      (CONFIG + GAME_VERSION — the ONLY tuning location)
│   ├── rng.js         (mulberry32 + string hash, seeded from ?seed=)
│   ├── sim.js         (headless game core — no DOM/window references)
│   ├── render.js      (layer gen, blur cache, lens composite, birds, HUD)
│   ├── input.js
│   ├── chester.js     (quip deck + triggers)
│   ├── sfx.js         (Web Audio presets, master mute)
│   ├── ui.js          (splash / pause / photo book)
│   └── main.js        (game loop, state machine SPLASH/PLAYING/PAUSED/BOOK)
└── test/
    └── sim.test.js    (runs in Node: `node test/sim.test.js`, zero deps)
```

No build step, no `dist/`, no package.json needed; ES modules load directly.

**Reminders:**
- Prove the loop with rectangles first — M0 is blur + zoom + rack + rects, and it must already be fun. Art will not save a dull rack.
- The blur cache (§6.2) is the one perf trap: never call `ctx.filter='blur(...)'` on a full layer per frame. Cache at load; live-blur only birds.
- Ship every milestone runnable; keep `GAME_VERSION` bumped per milestone (0.1.0 = M0 … 0.4.x = M3) so playtest feedback maps to builds.
- Chester must never be useful. If a quip accidentally hints at the bird's layer, delete the quip.
