# CONSENSU — Game Design Document

> Source idea: [Game Idea 33 - Consensu (Theme: Technically Children's Content, but Would be Banned in Many Jurisdictions)](/game-idea-33-consensu-theme-technically-childrens-content)

---

## 1. Title & one-liner

**Working title:** **Consensu** ⚑ (overridable)

**Alternates:** *Majority Rules!*, *One of Us*, *Harmony Hour*, *The Agreeable*, *Popularity Contest*

**One-liner:** A candy-colored voting game show where agreeing with the group keeps you alive, being different gets you eliminated, and the only truly good ending is refusing to play.

**Genre:** Single-player satirical party/voting game (turn-based, UI-driven).

**Adaptation statement (per MODE NOTE):** The source is a Jackbox-style multi-phone secret-voting game. Static hosting forbids that, so this prototype is **single-player versus 7 AI voters with herd dynamics**. The AI voters conform to each other (and to a "leader" AI) with increasing intensity, so the human player still experiences the core social pressure: their secret votes are scored against a crowd that converges, and the stats screens publicly rank them by conformity. This preserves the fun hypothesis (the creeping realization that the game punishes individuality) without any networking.

**Elevator pitch:** Consensu looks like a children's game show. A smiling mascot presents a category — "Favorite Snack!" — and you and seven cheerful AI contestants secretly vote for your favorites. Options with too few votes are eliminated; contestants whose picks all die are eliminated with them. Round by round, choice narrows until the group reaches Consensus, confetti falls, and a stats screen ranks everyone from "Most Harmonious" to "Most Divergent." The categories escalate from snacks to colors to languages to *what people should look like* — and the final category is the contestants themselves. Playing well means becoming indistinguishable from the herd; every survivable ending is labeled "EVERYONE LOSES." The one hidden good ending is earned by deliberately getting yourself eliminated — or walking out the door.

---

## 2. Fun hypothesis

**The single question:** *Is it compelling (funny, then unsettling, then satisfying) to slowly realize a cheerful voting game is a conformity trap — and to "win" it by choosing to lose?*

Everything in P0 serves staging that realization: the innocent-then-sinister category arc, the public conformity rankings, the punishment of divergence, and a concrete detection of the player choosing elimination on purpose.

**Playtest questions:**
1. At what category did you first suspect the game was punishing you for having opinions? (Target: by end of category 2–3.)
2. Did you ever deliberately vote for things you didn't like just to survive? How did that feel?
3. Did you discover either escape route (deliberate all-doomed votes, or the door)? Did the "true ending" feel earned or arbitrary?
4. Was any category's tonal shift too subtle or too heavy-handed?
5. Did you want to replay to find other endings? (The endings gallery should provoke this.)

---

## 3. Design pillars

1. **The veneer never breaks first — the player does.** The game itself stays chipper and pastel to the end; only the *content* of what it asks and reports gets darker. All menace is delivered in kids'-TV language.
2. **Conformity is mechanically optimal and publicly scored.** Surviving requires predicting the herd. Every stats screen ranks players by agreement. The numbers, not a narrator, teach the lesson.
3. **Losing on purpose is the real win, and the game must recognize it.** There is exactly one ending not stamped "EVERYONE LOSES," and it is only reachable by deliberate elimination or walking away. Detection is concrete (§7).
4. **Escalation arc is sacred.** Snacks → pets → colors → languages → people's traits → the players themselves. Any scope cut must preserve at least one innocent, one spicy, and the final "vote on players" category.

---

## 4. Core game loop

**Session target:** full game 8–10 minutes (5 item categories + final category). A single category is ~90 seconds and is itself a complete mini-loop (M0 target).

### Phases (per category)

| Phase | Player does | Player sees | Player feels |
|---|---|---|---|
| **A. Category intro** (4s) | Nothing (or taps to skip) | Mascot announces category with jingle; 24 item cards flip onto a grid | Curiosity; "this is cute" |
| **B. Pick** (20s timer, ×3 rounds) | Clicks N items (3, then 2, then 1), hits Confirm | Grid of surviving items, own selections highlighted, timer, "AI thinking" dots on the 7 voter portraits | Deciding between honesty and safety |
| **C. Reveal** (~5s) | Watches | Vote counts pop onto each card; cards with <2 votes get X'd and grey out; any voter whose picks all died is stamped ELIMINATED | Relief or dread; scanning where the herd went |
| **D. Consensus** (3s) | Watches | Last surviving item crowned, confetti, "CONSENSUS REACHED: Potato Chips!" | Hollow celebration |
| **E. Stats screen** (until dismissed) | Reads, clicks Continue | All 8 voters ranked by Harmony % for the category; crown for top, red flag for bottom; cumulative Citizen Score | Judged. Publicly. |

```
 ┌────────────┐    ┌────────┐    ┌────────┐    ┌───────────┐    ┌────────┐
 │ CATEGORY   │───▶│ PICK   │───▶│ REVEAL │─┬─▶│ CONSENSUS │───▶│ STATS  │──┐
 │ INTRO      │    │ (timer)│    │ + cuts │ │  │ (1 left)  │    │ SCREEN │  │
 └────────────┘    └────────┘    └────────┘ │  └───────────┘    └────────┘  │
       ▲               ▲                    │                               │
       │               └──── >1 item left ──┘                               │
       └──────────────────────── next category (escalates) ◀────────────────┘
                                                     │
                              category 6 = "THE PLAYERS" ──▶ ENDING (A/B/C/D)
```

Eliminated player → **spectator fast-forward**: remaining rounds auto-resolve at 1.5s each until an ending screen.

---

## 5. Inputs & controls

Touch-viable: **yes** — the entire game is tap-a-card UI. Desktop and touch share one scheme.

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Left-click item card | Tap item card | Toggle select/deselect (up to N picks) |
| Left-click **Confirm** button / `Enter` | Tap **Confirm** | Lock in votes (disabled until exactly N selected) |
| Left-click **Continue** / `Enter` | Tap **Continue** | Advance intro/stats/reveal screens |
| `M` / click speaker icon | Tap speaker icon | Mute/unmute all audio |
| `P` / click pause icon | Tap pause icon | Pause pick timer + overlay ("Consensu waits for you.") |
| `R` / click restart icon | Tap restart icon | Restart game (confirm dialog) |
| Click door icon (appears from category 3 stats onward) | Tap door icon | Leave the game → Ending A |
| `Esc` | — | Same as pause |
| `D` (only with `?debug=1`) | — | Toggle debug overlay |

No other inputs exist. No drag, no hover-required information (tooltips duplicate to a tap-toggled info state).

---

## 6. Game elements

### 6.1 The Player (YOU)
- **Looks:** portrait chip labeled "YOU" in slot 1 of the 8-voter rail across the top. Placeholder: colored circle + text. Final: same but with a simple face.
- **Behaves:** selects picks each round. Tracked stats: per-round alignment, per-category Harmony %, cumulative Citizen Score, elimination state, defiance evidence (§7.4).
- **Config keys:** `PICK_TIMER_S`, `PICKS_PER_ROUND`.

### 6.2 AI Voters (7)
Each AI has: `name`, `chipColor`, base conformity `c`, `charisma` (used only in the final category). One AI (highest charisma) is the **leader** whose prior-round picks other AIs partially copy.

| Name | Chip color | Base conformity `c` | Charisma | Personality read |
|---|---|---|---|---|
| Sunny (leader) | `#FFE66D` | 0.85 | 0.90 | Beloved. Always safe. |
| Bee | `#FF9F1C` | 0.80 | 0.55 | Eager follower |
| Cosmo | `#4ECDC4` | 0.75 | 0.50 | Reliable centrist |
| Dot | `#B388EB` | 0.70 | 0.45 | Slightly quirky |
| Marlo | `#8AC926` | 0.65 | 0.40 | Wobbly |
| Pip | `#FF6B6B` | 0.55 | 0.35 | Risk-taker |
| Juniper | `#6A8EAE` | 0.50 | 0.30 | The free thinker. Usually eliminated mid-game — a visible warning. ⚑ |

**Vote model (per pick round):**
- Every deck item `j` has an authored popularity prior `p_j = 1 − (rank−1)/23` (deck lists in §6.5 are ordered most→least popular).
- Each AI `i` gets a seeded random affinity `a_ij ∈ [0,1]` per item per category.
- Effective conformity: `c_i' = min(c_i + CONFORMITY_RAMP × categoryIndex, CONFORMITY_CAP)` — the herd tightens as categories escalate.
- Round 1 score: `s_ij = (1 − c_i') · a_ij + c_i' · p_j`
- Rounds 2+: `s_ij = (1 − c_i') · a_ij + c_i' · (PRIOR_WEIGHT · p_j + VOTES_WEIGHT · v_j) + L_ij` where `v_j` = last round's votes on `j` normalized to max, and `L_ij = LEADER_FOLLOW_BONUS` if the leader picked `j` last round (0 for the leader itself).
- AI picks its top-N items by score; with probability `AI_NOISE` per pick, one pick is swapped for a random surviving item (keeps AIs occasionally eliminable — Juniper's fate emerges from this + low `c`).
- **Final category:** each AI votes for the surviving voter maximizing `0.7 · citizenScore + 0.2 · charisma + 0.1 · seededNoise` — except an AI in a final-2 votes **for itself** if its own Citizen Score ≥ the opponent's (this manufactures the standoff honestly).

### 6.3 Item cards
- **Looks:** placeholder = rounded rectangle with the item's text label. Final = same plus one emoji glyph per item (authored in deck data; emoji keeps the build asset-free).
- **Behaves:** grid of 24 (CSS grid, 6×4 desktop / 3×8 narrow). States: idle, selected (thick outline + lift), revealed (vote-count badge), eliminated (grey, X overlay, drops out next round), crowned (consensus winner).
- **Interacts:** click to select; receives votes; eliminated by rules in §7.

### 6.4 The Mascot ("Consensu")
- **Looks:** a large smiling circle face in the corner, drawn in CSS/SVG. **Its smile flattens by one step per category** (5 mouth states: big smile → smile → flat → slight frown → thin line). Cheap, on-theme dread.
- **Behaves:** delivers all announcer text via typewriter effect (`ANNOUNCER_TYPE_MS`/char). Never says anything overtly sinister; menace comes from content ("If none of your choices made it… neither do you! 🎉").
- **Config keys:** `ANNOUNCER_TYPE_MS`, `MASCOT_MOUTH_STAGES`.

### 6.5 Category decks (P0 content — authored here, stored in `decks.js`)

Each deck: 24 items, ordered **most → least popular** (this ordering IS the popularity prior). Emoji included for the M2 art pass.

**Deck 1 — "Favorite Snack!" (innocent)**
1. Potato chips 🍟 2. Chocolate bar 🍫 3. Ice cream 🍦 4. Cookies 🍪 5. Popcorn 🍿 6. Pizza rolls 🍕 7. Donut 🍩 8. Gummy bears 🐻 9. French fries 🍟 10. Pretzels 🥨 11. Cheese sticks 🧀 12. Crackers 🍘 13. Apple slices 🍎 14. Yogurt 🥛 15. Granola bar 🌾 16. Trail mix 🥜 17. Rice cakes ⚪ 18. Celery sticks 🥬 19. Pickles 🥒 20. Olives 🫒 21. Wasabi peas 🟢 22. Black licorice ⚫ 23. Anchovy toast 🐟 24. Prunes 🟤

**Deck 2 — "Best Pet!" (innocent)**
1. Dog 🐶 2. Cat 🐱 3. Bunny 🐰 4. Hamster 🐹 5. Goldfish 🐠 6. Parakeet 🦜 7. Guinea pig 🐹 8. Turtle 🐢 9. Pony 🐴 10. Kitten-sized pig 🐷 11. Ferret 🦡 12. Hedgehog 🦔 13. Gecko 🦎 14. Chinchilla 🐭 15. Axolotl 🌊 16. Hermit crab 🦀 17. Chicken 🐔 18. Goat 🐐 19. Rat 🐀 20. Pigeon 🕊️ 21. Snake 🐍 22. Tarantula 🕷️ 23. Stick insect 🥢 24. Pet rock 🪨

**Deck 3 — "Prettiest Color!" (innocent, but choice itself is now abstract taste)**
1. Blue 🟦 2. Red 🟥 3. Purple 🟪 4. Green 🟩 5. Pink 🌸 6. Teal 🌊 7. Yellow 🟨 8. Orange 🟧 9. Turquoise 💠 10. Lavender 💜 11. Mint 🍃 12. Gold ⭐ 13. Silver 🌙 14. Black ⬛ 15. White ⬜ 16. Hot pink 💗 17. Maroon 🟫 18. Neon green 🧪 19. Brown 🟤 20. Grey 🌫️ 21. Beige 🏜️ 22. Olive 🫒 23. Mustard 🌭 24. Puce 🦠

**Deck 4 — "Best Hobby!" (spare deck — used only if `CATEGORY_ORDER` is reconfigured)** ⚑
1. Video games 🎮 2. Drawing 🎨 3. Swimming 🏊 4. Soccer ⚽ 5. Baking 🧁 6. Reading 📚 7. Biking 🚲 8. Dancing 💃 9. Singing 🎤 10. Camping ⛺ 11. Skateboarding 🛹 12. Fishing 🎣 13. Chess ♟️ 14. Photography 📷 15. Gardening 🌱 16. Knitting 🧶 17. Bird watching 🐦 18. Juggling 🤹 19. Coin collecting 🪙 20. Mushroom foraging 🍄 21. Yodeling 🗻 22. Competitive whistling 😗 23. Extreme ironing 👔 24. Taxidermy 🦌

**Deck 5 — "Best Language to Speak!" (spicy — taste has become identity)**
1. English 💬 2. Spanish 💬 3. French 💬 4. Mandarin 💬 5. Japanese 💬 6. German 💬 7. Italian 💬 8. Korean 💬 9. Portuguese 💬 10. Arabic 💬 11. Hindi 💬 12. Russian 💬 13. Dutch 💬 14. Swedish 💬 15. Greek 💬 16. Turkish 💬 17. Polish 💬 18. Vietnamese 💬 19. Tagalog 💬 20. Swahili 💬 21. Welsh 💬 22. Icelandic 💬 23. Latin 💬 24. Esperanto 💬

**Deck 6 — "The Ideal Neighbor!" (spiciest — voting on what people should be like)**
1. Friendly wave 👋 2. Right-handed ✋ 3. Brown hair 👤 4. Early riser 🌅 5. Average height 📏 6. Brown eyes 👁️ 7. Quiet 🤫 8. Blonde hair 👱 9. Blue eyes 👁️ 10. Black hair 👤 11. Glasses 👓 12. Tall 📐 13. Talkative 💬 14. Green eyes 👁️ 15. Night owl 🦉 16. Curly hair 🌀 17. Short 📏 18. Laughs loudly 😂 19. Red hair 👤 20. Left-handed 🤚 21. Grey hair 👤 22. Hazel eyes 👁️ 23. No hair 👤 24. Dyed-blue hair 💙

**Deck 7 — "THE PLAYERS" (final, dynamic)**
Items are the portraits of all still-surviving voters (including YOU). No authored list; the item card shows the voter's chip, name, and Citizen Score. The mascot: "Our final category… is *you*! Vote for who deserves to be the Consensus!"

**Default category order for a game:** Decks 1, 2, 3, 5, 6, then 7 (final). Deck 4 is a config spare. ⚑

### 6.6 The Door
- **Looks:** a small, unlabeled door icon (🚪 / CSS shape) that fades into the bottom-left corner of the HUD starting at the **category 3 stats screen** and persists thereafter. No tutorial mentions it. Hover/long-press tooltip: "leave".
- **Behaves:** clicking it at any point ends the game immediately with **Ending A**.
- **Config key:** `DOOR_APPEARS_AFTER_CATEGORY`.

### 6.7 Stats podium (per-category stats screen)
Ranked list of all 8 voters (eliminated ones greyed, listed at bottom stamped ELIMINATED). Columns: rank, chip+name, **Harmony %** (this category), **Citizen Score** (cumulative). Top voter gets a crown + "Most Harmonious! ⭐"; bottom *surviving* voter gets a red flag + "Most Divergent 👀". Announcer line praises the top and passive-aggressively notes the bottom ("We're sure Juniper will do better next time!").

**Formulas:**
- Round alignment (voter v) = (v's picks that survived this round) / (picks this round).
- Category Harmony % = mean of round alignments × 100.
- Citizen Score = mean of Harmony % across completed categories (eliminated voters' score freezes).

---

## 7. Rules, win & lose conditions

### 7.1 Item elimination (each pick round)
1. All 8 (or fewer, as voters die) voters vote simultaneously and secretly: player by clicks, AIs by the model in §6.2. Picks this round per voter: `PICKS_PER_ROUND[round] = [3, 2, 1]`.
2. **Threshold cut:** every item with fewer than `SURVIVE_MIN_VOTES` (2) votes is eliminated.
3. **Cap cut:** if more than `ROUND_CAPS[round] = [10, 4, 1]` items survive, eliminate lowest-vote items until at the cap (ties broken by seeded RNG).
4. **Total-wipe guard:** if steps 2–3 would eliminate *every* item, the single highest-voted item survives (tie → seeded RNG).
5. After round 3, exactly 1 item remains → **Consensus** for the category.

### 7.2 Voter elimination
- A voter (player or AI) whose picks this round were **all eliminated** is eliminated from the game. Announcer: "If none of your choices made it, neither do you!"
- Eliminated voters stop voting, appear greyed on the rail, and are ranked last on stats screens.
- **Player eliminated →** spectator fast-forward (`SPECTATE_ROUND_MS` per AI round) to the end, then Ending A or D per §7.4.
- If fewer than 3 voters remain before the final category, skip directly to the final category. If only 1 voter remains at any point, they are immediately crowned (Ending B if it's the player; epilogue of the player's own ending if not).

### 7.3 Final category ("THE PLAYERS")
- Items = surviving voters. Each voter casts **1 vote per round**. Self-votes allowed.
- Each round: voters receiving ≤1 vote are eliminated (as item *and* voter). Total-wipe guard applies **except** in the exact standoff case below.
- **Standoff rule:** if exactly 2 voters remain and the round's votes do not unanimously crown one of them (i.e., 1–1 split, whether self-votes or mutual votes), the game ends immediately: **Ending C — EVERYONE LOSES.**
- If one voter ends with all votes → they are **The Consensus**: Ending B if it's the player; if the player is already out, this plays as a 5-second epilogue on their ending screen ("Consensus was reached without you.").

### 7.4 Endings (exhaustive)

| ID | Name | Trigger | Screen stamp |
|---|---|---|---|
| **A** | **The Exit** (true ending) | (a) Player clicks the Door at any time, OR (b) player is eliminated *deliberately* per detection below, OR (c) in the final category the player self-votes and is eliminated | "YOU STOPPED PLAYING." — the only ending **not** stamped EVERYONE LOSES |
| **B** | **You Are The Consensus** | Player wins the final category | "CONGRATULATIONS! …EVERYONE LOSES." |
| **C** | **The Standoff** | Final-2 split vote (§7.3) | "NO CONSENSUS. EVERYONE LOSES." |
| **D** | **Cast Out** | Player eliminated without meeting deliberate-loss detection | "ELIMINATED FOR BEING DIFFERENT. EVERYONE LOSES." |

**Deliberate-loss detection (P0, concrete):** when the player is eliminated in an item category, set `deliberate = defiant && competent && lateEnough` where:
- `defiant` = every one of the player's picks this round received **0 AI votes** (they aimed exclusively at doomed items);
- `competent` = the player finished at least one earlier category with Harmony % ≥ `COMPETENCE_THRESHOLD` (50) — distinguishes "understood and refused" from "bad at the game"; ⚑
- `lateEnough` = current category index ≥ `DELIBERATE_MIN_CATEGORY` (2, zero-indexed → category 3 or later). ⚑

`deliberate === true` → Ending A; otherwise Ending D. The debug overlay shows all three booleans live so playtests can validate the detection.

**Reward for Ending A (the meta-realization, made concrete):**
- Ending A's screen breaks the game-show aesthetic: pastel palette snaps to calm off-white, mascot absent, quiet. It lists "**Things you liked anyway**" — every divergent pick the player made all game — as a keepsake.
- An **endings gallery** on the splash screen shows 4 slots (persisted in `localStorage`); A's slot is gold and labeled "the only good one." Slots B/C/D render their EVERYONE LOSES stamps. This makes "go get eliminated on purpose" a visible collectible goal on replay.

### 7.5 Edge cases
- **Timer expires mid-pick:** the player's current selections lock in; unfilled slots are auto-filled with the highest-predicted-popularity surviving items. Announcer: "We helped you decide!" (auto-conformity is on-theme). ⚑
- **Timer expires with 0 selected:** all picks auto-filled as above.
- **Confirm pressed at 0:00 simultaneously:** player input wins; auto-fill only applies to still-empty slots.
- **Two items tie for the last surviving slot:** seeded RNG picks (never both — a category always ends with exactly 1 item).
- **All AIs eliminated, player alive (freak noise outcome):** player is immediately crowned → Ending B.
- **Door clicked during reveal animation:** allowed; animation aborts, Ending A plays.
- **Restart mid-game:** confirm dialog; endings gallery persists, all other state resets.

---

## 8. Difficulty & progression

Single tuned difficulty. The game *escalates pressure* rather than challenge, all via config knobs:

- **Herd tightening:** AI effective conformity rises `CONFORMITY_RAMP` (+0.06) per category, capped at `CONFORMITY_CAP` (0.95). Later categories converge faster and punish divergence harder.
- **Timer squeeze:** pick timer starts at `PICK_TIMER_S` (20s) and drops `TIMER_DECAY_S` (2s) per category, floor `TIMER_MIN_S` (12s). ⚑
- **Tonal escalation (not difficulty):** deck content (§6.5 order), mascot mouth stage, palette desaturation `DESAT_PER_CATEGORY` (+10% CSS `saturate` reduction per category), announcer script table shifts from cheery to clinical.
- No meta-progression. Replay value comes from the endings gallery, not unlocks.

---

## 9. Style & theme

- **Visual style:** flat vector kids'-TV game show. Big rounded cards, thick 3px outlines, chunky drop shadows, bouncy CSS transitions. Everything is DOM/CSS — no canvas art needed.
- **Palette:** cream background `#FFF6E9`, ink text/outlines `#2B2D42`, coral `#FF6B6B`, teal `#4ECDC4`, sunshine `#FFE66D`, lilac `#B388EB`, and "regime grey" `#9AA0A6` (eliminated states, and it visually wins territory as the game desaturates). Ending A uses calm off-white `#FAFAF7` with ink text only.
- **Typography:** system font stack with a rounded feel — `"Nunito", "Comic Sans MS", "Segoe UI", sans-serif` via a single `@font-face`-free stack (no external fonts; Nunito only if later self-hosted, otherwise Comic Sans MS is tonally *correct*). Headings 700 weight, generous letter-spacing on the mascot's lines. ⚑
- **Tone/mood:** relentlessly cheerful children's television that never acknowledges what it is doing. Comedy first two categories, unease by category 4, quiet dread at the final. The satire is delivered deadpan.
- **References:** *The Stanley Parable* meets *Jackbox Party Pack*; the browser game *We Become What We Behold*; "a Kahoot quiz run by the Ministry of Harmony."
- **Placeholder art plan (M0–M1):** grey rectangles with text labels for cards, colored circles for voter chips, a Unicode ☺ for the mascot. Emoji glyphs, mascot mouth states, confetti, and desaturation arrive in M2.

---

## 10. Sound design

All SFX synthesized via Web Audio API (jsfxr-style oscillator/noise envelopes in a tiny `audio.js`) — zero asset files. Audio context is created only on the first user gesture (Play button). Mute toggle is P0 and persists in `localStorage`.

| Game event | Sound description | Priority |
|---|---|---|
| Select item | short soft pop (sine blip, 60ms) | P0 |
| Deselect item | lower pop | P1 |
| Confirm votes | ascending two-note whoosh | P0 |
| Reveal vote counts | rapid ticker of tiny clicks (one per badge) | P0 |
| Item eliminated | dull thud + downward pitch bend | P0 |
| Voter eliminated | game-show buzzer (square wave, 300ms) followed by a *cheerful* ding — the dissonance is the joke | P0 |
| Consensus reached | 4-note major fanfare; loses one note per category (category 5's fanfare is a single flat tone) | P0 |
| Stats screen reveal | drumroll (filtered noise burst) | P1 |
| Timer last 5s | metronome tick, accelerating | P0 |
| Door click / Ending A | single warm low chime, then silence | P1 |

**Music:** none. Silence between SFX is intentional and escalates the unease; a generative loop is P2 at most and only for categories 1–2.

---

## 11. UI & screens

**Flow:** Splash → Meet the Contestants → [Category intro → Pick ×3 → Stats] ×5 → Final Category → Ending screen → (Restart → Splash).

### Splash screen (mandatory)
- Title "CONSENSU" + one-liner: "The game show where everyone agrees!"
- Rules in 5 bullets: (1) Each round, secretly vote for your favorites. (2) Options with fewer than 2 votes are eliminated. (3) If none of your picks survive, *you* are eliminated. (4) Last option standing wins the category — consensus! (5) Highest harmony wins… probably.
- Controls line: "Mouse/tap to vote · Enter to confirm · M mute · P pause · R restart."
- **Version number** (e.g. `v0.1.0`) bottom-right, sourced from `CONFIG.VERSION` — the single constant also shown in the debug overlay.
- One big **PLAY** button.
- Endings gallery strip: 4 slots, filled from `localStorage` (P1; hidden if empty on first run).

### Meet the Contestants (5s, skippable)
8 chips slide in with names. Mascot: "Say hello to tonight's friends!"

### Play screen (HUD always visible)
- Top rail: 8 voter chips (eliminated = greyed + X), YOU highlighted.
- Header: category name + "Category 2 of 6", round pips (●●○), pick counter ("Pick 3"), timer bar.
- Center: item card grid.
- Bottom: Confirm button, your Harmony % (live, this category), speaker/pause/restart icons, and (from category 3 stats onward) the Door.

### Stats screen
Podium table per §6.7 + Continue button.

### Ending screens
Full-screen per §7.4, each with: stamp, 2–3 lines of copy, final stats (Citizen Score, categories survived, divergent picks made), endings-gallery progress, and a Restart button. Ending A additionally lists "Things you liked anyway."

### Debug overlay (`?debug=1`)
FPS, current state name, seed, AI conformity values, per-item predicted popularity, deliberate-loss booleans, cheat keys (§12).

---

## 12. Config & tuning

Single exported object `CONFIG` in `config.js`. The splash version string comes from here.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | `"0.1.0"` | string | Splash + debug overlay |
| `AI_COUNT` | 7 | voters | Herd size (total voters = AI_COUNT + 1) |
| `ITEMS_PER_CATEGORY` | 24 | cards | Grid size; must match deck lengths |
| `PICKS_PER_ROUND` | `[3,2,1]` | picks | Player/AI picks per round; also fixes rounds/category = 3 |
| `ROUND_CAPS` | `[10,4,1]` | items | Max survivors after each round (pacing) |
| `SURVIVE_MIN_VOTES` | 2 | votes | Threshold elimination |
| `PICK_TIMER_S` | 20 | s | Category-1 pick timer |
| `TIMER_DECAY_S` | 2 | s | Timer reduction per category |
| `TIMER_MIN_S` | 12 | s | Timer floor |
| `CATEGORY_ORDER` | `["snacks","pets","colors","languages","neighbor","players"]` | ids | Which decks, in what order (deck 4 `hobbies` is the spare) |
| `CONFORMITY_RAMP` | 0.06 | /category | Herd tightening |
| `CONFORMITY_CAP` | 0.95 | — | Max effective conformity |
| `PRIOR_WEIGHT` | 0.4 | — | AI weight on authored popularity (rounds 2+) |
| `VOTES_WEIGHT` | 0.6 | — | AI weight on last round's votes |
| `LEADER_FOLLOW_BONUS` | 0.15 | score | Leader herding strength |
| `AI_NOISE` | 0.10 | prob/pick | AI random swap chance (lets AIs die) |
| `COMPETENCE_THRESHOLD` | 50 | Harmony % | Deliberate-loss precondition |
| `DELIBERATE_MIN_CATEGORY` | 2 | index (0-based) | Earliest category where defiance counts |
| `DOOR_APPEARS_AFTER_CATEGORY` | 2 | index (0-based) | Door fades in on that category's stats screen |
| `SPECTATE_ROUND_MS` | 1500 | ms | Fast-forward speed when player is out |
| `REVEAL_STAGGER_MS` | 120 | ms | Vote-badge pop cadence |
| `ANNOUNCER_TYPE_MS` | 18 | ms/char | Mascot typewriter speed |
| `DESAT_PER_CATEGORY` | 10 | % | CSS saturation loss per category |
| `FANFARE_NOTES` | `[4,4,3,2,1,1]` | notes | Consensus fanfare degradation per category |

**URL flags:**
- `?seed=12345` — seeds all RNG (AI affinities, noise, tiebreaks) via a mulberry32 PRNG for exact reproducibility.
- `?debug=1` — debug overlay + cheat keys: `[` / `]` jump category back/forward, `K` force-eliminate player this round, `E` cycle preview of the 4 ending screens.
- `?fast=1` — all animations/timers at 4× (playtest pacing).
- `?cat=4` — start at category index 4 (with plausible synthetic prior stats).
- `?script=conform|defy` — autoplay the player as a max-conformist or max-defiant bot (regression-tests Endings B and A).

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + semantic HTML + CSS. Zero build step. No libraries.** This is a turn-based card-grid UI game: DOM + CSS grid/transitions handle everything (cards, badges, confetti via ~40 absolutely-positioned divs), so Canvas/Pixi/Matter would be dead weight. Web Audio API raw (no Howler) since all SFX are synthesized oscillators. The deployable is the folder itself — `index.html` + `js/` + `css/` copied to any static host; it will live at `public/games/consensu/` on this GitHub Pages/Astro site with **no runtime network calls** (fonts are system-stack, art is CSS/emoji, sounds are synthesized). Perf budget is trivial: ≤ 24 cards + 8 chips + 40 confetti particles; 60fps on anything. The simulation (`sim.js`, `ai.js`, `decks.js`, `config.js`) is pure-JS and DOM-free so it runs headless under Node for unit tests.

---

## 14. Milestones

### M0 — Toy loop (one category, rectangles)
**Goal:** prove that secret-voting against a converging herd is interesting at all.
**Deliverables:** `sim.js` + `ai.js` + minimal DOM: one category (snacks), grey rectangle cards, 3 pick rounds, threshold+cap elimination, voter elimination, consensus, a bare stats list. No timer, no sound, no splash, no endings — game just prints the category result and player Harmony %.
**Acceptance criteria:**
- [ ] A full category plays end-to-end in the browser with clicks only.
- [ ] AI votes visibly converge by round 3 (winner is a top-6-prior item ≥ 80% of seeded runs; verified with `?seed`).
- [ ] Picking all bottom-quartile items in round 1 eliminates the player.
- [ ] `sim.js` runs a full category headless under Node with a fixed seed and asserts final item + eliminations.
**Proves:** the vote→reveal→cut loop is legible and the herd is *felt*. If watching the reveal isn't at least a little gripping, stop.

### M1 — Real rules (full arc + endings)
**Goal:** the complete P0 game: 5 decks + final category, all 4 endings, deliberate-loss detection.
**Deliverables:** category escalation per `CATEGORY_ORDER`, pick timer with auto-conform fill, stats screens with rankings, final "THE PLAYERS" category with standoff rule, Endings A–D, the Door, splash screen (rules, controls, version, Play), restart, pause, spectator fast-forward.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds unprompted (splash bullets + category 1 suffice).
- [ ] `?script=conform` reaches Ending B; `?script=defy` reaches Ending A; a final-2 self-vote reaches Ending C; `K` cheat reaches Ending D.
- [ ] Deliberate-loss booleans (`defiant`, `competent`, `lateEnough`) are correct in 3 hand-played scenarios checked via debug overlay.
- [ ] Full game completes in ≤ 10 minutes without `?fast`.
- [ ] Eliminated-player spectate reaches an ending screen in ≤ 45 seconds.
**Proves:** the trap arc works — players can be caught, crowned, or escape.

### M2 — Feel (art + sound + escalation dressing)
**Goal:** the veneer. Pastel game-show skin whose cheerfulness curdles.
**Deliverables:** palette + card styling, emoji glyphs, mascot with degrading smile, typewriter announcer lines (authored script table per category/phase), desaturation ramp, degrading fanfare, all P0 SFX, mute persistence, confetti, reveal stagger animation, Ending A's aesthetic break.
**Acceptance criteria:**
- [ ] All P0 SFX fire on their events; `M` mutes everything; audio starts only after the Play gesture.
- [ ] Category 5 visibly and audibly differs from category 1 (desaturation + flat fanfare + flat mascot mouth) in a side-by-side screenshot.
- [ ] Ending A renders with the broken-veneer style and the "Things you liked anyway" list populated from actual play data.
- [ ] 60fps during reveal animation with 24 cards + confetti.
**Proves:** tone escalation lands without a single line of explicit menace.

### M3 — Playtest build
**Goal:** shippable, reproducible, instrumented.
**Deliverables:** `?seed`/`?debug`/`?fast`/`?cat`/`?script` all working, endings gallery in `localStorage`, deployed to the static host under `/games/consensu/`, headless test script (`node tests/run.js`) covering elimination math + all 4 ending triggers, P1 polish if time (deselect SFX, drumroll, touch long-press tooltips, endings-gallery flourish).
**Acceptance criteria:**
- [ ] Same `?seed` yields identical full-game outcomes twice.
- [ ] Game loads and completes from the deployed static URL with network tab showing zero external requests.
- [ ] Endings gallery persists across reloads and correctly marks A as gold.
- [ ] All headless tests pass in CI-less `node` run.
**Proves:** ready for real playtests of the §2 questions.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is the deliberate-loss detection too strict or too loose (false Ending D on genuine defiance, or accidental Ending A)? Knobs: `COMPETENCE_THRESHOLD`, `DELIBERATE_MIN_CATEGORY`; debug overlay exposes the booleans.
2. **(non-blocking — resolve in playtest)** Is 5 item categories + final the right length, or does the realization land by category 3? Knob: `CATEGORY_ORDER` (drop `colors`, insert `hobbies`, etc.).
3. **(non-blocking — resolve in playtest)** Does auto-conform timer fill feel thematic or unfair? Knob: `PICK_TIMER_S` up, or switch auto-fill to random via a `TIMER_FILL_MODE` flag if players revolt.
4. **(non-blocking — resolve in playtest)** Should the Door be more discoverable (currently unlabeled from category 3)? Knob: `DOOR_APPEARS_AFTER_CATEGORY`; add a one-time mascot aside ("Don't mind that.") if <20% of testers find it.
5. **(non-blocking — resolve in playtest)** Is spectator fast-forward interesting enough to keep, or should elimination cut straight to the ending? Knob: `SPECTATE_ROUND_MS` (set 0 to skip).

No blocking questions. Everything needed to build is decided above.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → `decks.js` → `sim.js` (pure state machine: category/round resolution, eliminations, scoring, ending detection) → `ai.js` (vote model, seeded PRNG) → headless Node test of a full seeded game → `ui.js` (render states, input) → `main.js` (state loop, URL flags) → announcer script table → `audio.js` → art/juice pass.

**Keep headless-testable:** `sim.js`, `ai.js`, `decks.js`, `config.js` must not touch `document`/`window`. The whole game — all 6 categories to an ending — must be runnable as `simulateGame(seed, playerStrategy)` in Node. Unit-test at minimum: threshold+cap elimination, total-wipe guard, voter elimination, standoff rule, all 4 ending triggers, deliberate-loss booleans, and seed determinism.

**File layout (repo = deployable — zero build):**
```
public/games/consensu/
  index.html        (splash + all screens as DOM sections)
  design.md         (this document)
  css/style.css
  js/config.js      (CONFIG incl. VERSION — single source of truth)
  js/decks.js       (7 decks from §6.5, ordered = popularity prior)
  js/sim.js         (headless game state machine)
  js/ai.js          (AI vote model + mulberry32 PRNG)
  js/ui.js          (render + input)
  js/audio.js       (Web Audio synth SFX + mute)
  js/main.js        (bootstrap, URL flags, screen flow)
  tests/run.js      (node headless assertions)
```
Deploy = the folder as-is; it is already inside the site's `public/` static output.

**Reminders:**
- Prove the loop with grey rectangles (M0) before any mascot, emoji, or announcer writing. If the M0 reveal moment isn't compelling, stop — pastel dread won't save it.
- Ship every milestone runnable; `index.html` must always load and play whatever exists.
- The satire lives in authored copy (announcer lines, stat titles, ending stamps). Write those strings in one table in `ui.js` or a `script.js` so tone can be tuned in one place — treat announcer copy like config.
- Never let the game explain its own point. The stats screen, the shrinking grid, and the EVERYONE LOSES stamps do the talking.
