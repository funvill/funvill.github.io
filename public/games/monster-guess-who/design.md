# THE SIGHTING — Game Design Document

> Source idea: [Game Idea 9 - Monster Guess Who - Field Guide Game (Theme: Urban Legends)](/game-idea-9-monster-guess-who-theme-urban-legends)

---

## 1. Title & one-liner

**Working title:** THE SIGHTING ⚑ (overridable)

**Alternates:** Who Lurks?, Cryptidex, Bureau of Unverified Creatures, Ask the Witness, Field Guide: Classified

**One-liner:** A witness saw *something* — interrogate them with yes/no questions and use your beautiful cryptid field guide to identify the creature before your leads run dry.

**Genre:** Single-player deduction / "20 questions" puzzle, browser-based.

**Elevator pitch:** You are the night-shift operator at the Bureau of Unverified Creatures. A call comes in: someone saw a monster. The game secretly picks one cryptid from your illustrated field guide of urban legends. You question the witness — "Did it have wings?", "Was it bigger than a person?" — and every truthful answer lets you strike suspects out of the guide with a pencil. Each question and each wrong guess burns a *lead*; identify the creature before your 15 leads run out and you close the case. It is Guess Who? crossed with a Victorian naturalist's monster manual, in three-minute cases.

**Adaptation note (per autonomous mode):** The source idea is a physical book + multiplayer party game. This prototype is the single-player "20 questions vs. the field guide" version the idea itself proposes ("Online version"): the computer picks the secret cryptid, the player deduces it. Multiplayer, dice, and the physical book are out of scope; the *feel* of the book is the design centerpiece. ⚑ (overridable)

---

## 2. Fun hypothesis

**The question this prototype answers:** *Is hand-eliminating suspects in a gorgeous monster field guide, driven by structured yes/no questions to a truthful witness, a satisfying 3-minute solo deduction loop that players immediately replay?*

Everything in P0 serves this. If crossing out cryptids after a good question doesn't feel like progress, and guessing right doesn't feel earned, the idea fails regardless of art.

**Playtest questions (ask after 2–3 cases):**
1. Did you ever ask a question, look at the answer, and *know* which entries to cross out — or did you cross out by vibes?
2. Did you feel the lead budget as pressure? Was 15 too generous, too tight?
3. Did you browse the field guide entries for pleasure, or only scan the stat lines?
4. When you guessed wrong, did it feel like your mistake or the game's?
5. Did you immediately start another case without being prompted?

---

## 3. Design pillars

1. **The book is the hero.** Browsing the field guide must be pleasant in itself — every cryptid is a lovingly presented half-page dossier, even in placeholder form. Any feature that pulls play *out* of the book gets cut.
2. **The player does the deduction.** The game never eliminates suspects for the player in P0. Answers are truthful data; the pencil strikes are the player's own reasoning made visible.
3. **One more case.** A full case is 2–5 minutes, restart is one click, and the roster is large enough that the next case feels fresh.

If a feature serves none of these, cut it.

---

## 4. Core game loop

**Session target:** one case = 2–5 minutes. A sitting = 2–4 cases.

```
        ┌──────────────────────────────────────────────┐
        │                                              │
        ▼                                              │
  [1. NEW CASE]  secret cryptid drawn (seeded RNG)     │
        │                                              │
        ▼                                              │
  [2. STUDY] ◄────────────────────────────┐            │
   browse the field guide,                │            │
   read entries, form a theory            │            │
        │                                 │            │
        ▼                                 │            │
  [3. INTERROGATE]                        │            │
   pick 1 structured yes/no question      │            │
   from the question drawer (−1 lead)     │            │
        │                                 │            │
        ▼                                 │            │
  [4. WITNESS ANSWERS]  truthful yes/no,  │            │
   flavored line, logged in the case file │            │
        │                                 │            │
        ▼                                 │            │
  [5. ELIMINATE]  player pencil-strikes   │            │
   entries by hand (free, reversible)     │            │
        │                                 │            │
        ├── not sure yet ─────────────────┘            │
        │                                              │
        ▼                                              │
  [6. ACCUSE]  click a cryptid → confirm guess         │
        │                                              │
        ├── WRONG (−2 leads, entry stamped CLEARED) ──► back to [2]
        ├── RIGHT ──► [CASE CLOSED: rank + score] ─────┘ (new case)
        └── leads ≤ 0 ──► [COLD CASE: reveal] ─────────┘ (new case)
```

**Phase-by-phase (what the player does / sees / feels):**

- **New Case.** Sees a case-file slap onto the desk: "SIGHTING #47 — witness on the line." Feels: fresh mystery. One click ("Take the call") starts play.
- **Study.** Scrolls the field guide grid (20 entries in P0). Reads dossiers. Feels: curiosity, planning. No cost to browse.
- **Interrogate.** Opens the question drawer (structured list — see §6), picks one question. Lead tally visibly ticks down with a pencil-scratch. Feels: spending a scarce resource.
- **Witness answers.** A typewriter-style line appears in the case log: "**Q: Did it have wings? — A: No. I'd have remembered wings.**" Always truthful. Feels: hard information gained.
- **Eliminate.** Clicks entries to strike them through (toggle, free, unlimited, reversible). Struck entries dim. Feels: the field narrowing — the core satisfaction beat.
- **Accuse.** Clicks the "ACCUSE" stamp on an entry, confirms. Right: victory stamp + rank. Wrong: red "CLEARED" stamp on that entry (it is now known-innocent), −2 leads. Feels: high-stakes commitment.

---

## 5. Inputs & controls

The game is fully mouse/touch driven — a DOM game, no continuous input. **Touch-viable: yes**, with no design changes (all targets ≥ 44 px).

| Action | Desktop | Touch |
|---|---|---|
| Browse field guide | Scroll wheel / drag scrollbar | Swipe scroll |
| Open a cryptid dossier (detail view) | Click entry card | Tap entry card |
| Close dossier | Click ✕ or press `Esc` | Tap ✕ / tap outside |
| Strike / un-strike an entry | Click the entry's corner pencil icon (or press `X` while dossier open) | Tap the corner pencil icon |
| Open question drawer | Click "ASK WITNESS" button (or press `Q`) | Tap "ASK WITNESS" |
| Ask a question | Click question row, then "Ask" confirm | Tap row, tap "Ask" |
| Accuse | Click "ACCUSE" stamp inside dossier, then confirm | Tap "ACCUSE", tap confirm |
| New case / restart | Click "NEW CASE" (end screen or HUD folder icon), or press `R` | Tap "NEW CASE" |
| Pause | Not needed — turn-based, no timers. HUD menu offers "Abandon case" ⚑ | Same |
| Mute | Speaker icon top-right (or press `M`) | Tap speaker icon |
| Back to splash | "BUREAU" wordmark top-left | Same |

No other inputs exist. Keyboard is a convenience layer only; the game is 100% playable with pointer alone.

---

## 6. Game elements

### 6.1 The Field Guide (the roster)

A scrollable grid of cryptid entry cards. Each card (collapsed) shows: portrait placeholder (emoji), name, classification, and a 5-icon stat strip. Clicking opens the half-page **dossier**: portrait, name, aka, classification, the 5 stats as labeled field-guide lines, feature tags as small stamps, and 2 sentences of flavor. Dossier includes the ACCUSE stamp and the pencil strike toggle.

- Placeholder art: large emoji on a textured cream card. Final art: ink-and-watercolor style illustration (out of prototype scope).
- Config: `ROSTER_SIZE` (P0 = 20).

### 6.2 Cryptid data schema

Every cryptid is one object. **All stats are closed enums** — this is what makes questions structured and answers computable. Five primary stats × five values each (matching the source idea's math), plus a fixed 10-tag feature vocabulary.

```js
// data/cryptids.js — schema
{
  id: "mothman",              // slug, unique
  num: 1,                     // index number shown in the guide ("No. 001")
  name: "Mothman",
  aka: "The Point Pleasant Visitor",   // flavor subtitle
  classification: "Avian Humanoid",    // free text, flavor only — never queried
  size: "large",        // enum SIZE:    tiny | small | human-sized | large | gigantic
  habitat: "urban",     // enum HABITAT: forest | water | mountain | urban | wastes
  diet: "strange",      // enum DIET:    herbivore | carnivore | omnivore | strange | unknown
  locomotion: "flies",  // enum MOVE:    walks | flies | swims | burrows | phases
  region: "north-america", // enum REGION: north-america | latin-america | europe | asia | oceania
  tags: ["wings", "glowing-eyes", "humanoid"], // 2–3 from the fixed 10-tag vocabulary
  emoji: "🦋",          // placeholder portrait
  flavor: "Two sentences of field-guide prose."
}
```

**Enum semantics (shown in-game in a legend, one line each):**

- `size`: tiny = cat-sized or smaller · small = dog-to-child · human-sized = roughly person-sized · large = bear/horse · gigantic = elephant or bigger.
- `habitat`: forest · water (lakes/rivers/sea) · mountain (peaks/caves) · urban (towns, roads, buildings) · wastes (deserts, moors, open plains).
- `diet`: herbivore · carnivore · omnivore · strange (blood, fear, or life-force) · unknown (no verified feeding behavior).
- `locomotion`: walks · flies · swims · burrows · phases (appears/vanishes, unbound by terrain).
- `region`: where sightings cluster.

**Tag vocabulary (fixed, exactly 10):** `wings`, `horns`, `glowing-eyes`, `fur`, `scales`, `humanoid`, `long-tail`, `claws`, `shapeshifter`, `vanishes`. Tags are binary: a cryptid has it or doesn't.

**Validity rules (enforced by a validator script):**
1. Every stat value comes from its enum; 2–3 tags per entry.
2. No two entries share an identical full profile (5 stats + tag set).
3. "Twin pairs" — entries differing in exactly one dimension — are allowed and *deliberate* (they force late-game precision questions), but capped: max 2 twin pairs per 20 entries. ⚑
4. Balance: at roster size N, each value of `size`/`habitat`/`diet`/`locomotion` appears exactly N/5 times. `region` may deviate ±2 at N=20 (real legends skew North American) but is exact at N=100. ⚑

### 6.3 The authored P0 roster — 20 cryptids

This is real content, ready to paste into `data/cryptids.js`. Stats are tuned for question-balance first, lore second ⚑ (overridable per entry — the engine only cares about the schema).

| # | Name (aka) | Class | Size | Habitat | Diet | Move | Region | Tags | Emoji |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Mothman** (The Point Pleasant Visitor) | Avian Humanoid | large | urban | strange | flies | north-america | wings, glowing-eyes, humanoid | 🦋 |
| 2 | **Sasquatch** (Bigfoot) | Highland Hominid | large | mountain | omnivore | walks | north-america | fur, humanoid | 🦍 |
| 3 | **Jersey Devil** (The Leeds Child) | Chimeric Flyer | human-sized | forest | carnivore | flies | north-america | wings, horns, long-tail | 🐐 |
| 4 | **Jackalope** (Warrior Rabbit) | Horned Lagomorph | tiny | wastes | herbivore | burrows | north-america | horns, fur | 🐰 |
| 5 | **Thunderbird** (Storm Carrier) | Colossal Raptor | gigantic | mountain | carnivore | flies | north-america | wings, claws | 🦅 |
| 6 | **Wendigo** (The Hungering Wind) | Gaunt Stalker | large | forest | carnivore | walks | north-america | horns, glowing-eyes, humanoid | 🦌 |
| 7 | **Chupacabra** (Goat-Sucker) | Nocturnal Bloodfeeder | small | wastes | strange | burrows | latin-america | glowing-eyes, scales, claws | 🦎 |
| 8 | **La Llorona** (The Weeping Woman) | Riverside Apparition | human-sized | urban | unknown | phases | latin-america | humanoid, vanishes | 👻 |
| 9 | **Curupira** (Backwards-Foot) | Forest Guardian | small | forest | herbivore | walks | latin-america | fur, humanoid | 🦶 |
| 10 | **Loch Ness Monster** (Nessie) | Lacustrine Serpent | gigantic | water | herbivore | swims | europe | scales, long-tail | 🦕 |
| 11 | **Banshee** (The Keening Herald) | Mourning Spirit | human-sized | urban | unknown | phases | europe | humanoid, vanishes | 😱 |
| 12 | **Black Shuck** (The Doom Dog) | Portent Hound | human-sized | wastes | strange | phases | europe | fur, glowing-eyes, vanishes | 🐕 |
| 13 | **Tatzelwurm** (Alpine Stollenwurm) | Cat-Faced Serpent | small | mountain | unknown | burrows | europe | scales, claws | 🐍 |
| 14 | **Yeti** (The Abominable Snowman) | Glacial Hominid | large | mountain | omnivore | walks | asia | fur, humanoid | 🏔️ |
| 15 | **Kappa** (River Child) | Aquatic Trickster | small | water | herbivore | swims | asia | scales, humanoid | 🥒 |
| 16 | **Mongolian Death Worm** (Olgoi-Khorkhoi) | Venomous Annelid | tiny | wastes | strange | burrows | asia | scales, long-tail | 🪱 |
| 17 | **Kitsune** (Nine-Tailed Fox) | Spirit Fox | tiny | urban | omnivore | phases | asia | fur, shapeshifter, long-tail | 🦊 |
| 18 | **Bunyip** (Billabong Lurker) | Swamp Bellower | gigantic | water | carnivore | swims | oceania | fur, claws, glowing-eyes | 🐊 |
| 19 | **Drop Bear** (Thylarctos plummetus) | Arboreal Ambusher | tiny | forest | omnivore | flies | oceania | fur, claws | 🐨 |
| 20 | **Taniwha** (Guardian of the Deep) | Tidal Shapeshifter | gigantic | water | unknown | swims | oceania | scales, long-tail, shapeshifter | 🐉 |

**Flavor text (2 sentences each, field-guide voice):**

1. **Mothman** — A seven-foot figure with vast grey wings and eyes that reflect headlights like red lamps, sighted near bridges and derelict works. Appearances cluster in the weeks before disasters; whether it warns us or feeds on what follows is unresolved.
2. **Sasquatch** — A broad-shouldered walker of the high timberline, leaving footprints that fill with rain before anyone arrives with a camera. Subsists on berries, salmon, and an apparently bottomless patience for blurry photography.
3. **Jersey Devil** — Born the thirteenth child on a storm-lashed night, it screams over the pine barrens on leathery wings. Hoofprints on rooftops remain the Bureau's most-filed complaint from the region.
4. **Jackalope** — A prairie hare crowned with pronghorn antlers, prized and never caught. It mimics human song around campfires, always one verse behind and slightly flat.
5. **Thunderbird** — A raptor so large that its wingbeats register on weather radar as squall lines. Nests above the cloud ceiling; sheds feathers the length of canoe paddles.
6. **Wendigo** — A gaunt antlered figure that follows travelers in cold forests, smelling of frost and old hunger. The longer you walk, the closer its footsteps match your own.
7. **Chupacabra** — A spined, leathery drinker of livestock blood that dens in dry arroyos. Attacks leave two neat punctures and a herd that refuses to enter that field again.
8. **La Llorona** — A weeping woman in white who walks town canals and riverside streets after dark, calling for her children. Do not answer; she is not asking for your help.
9. **Curupira** — A small russet-furred guardian whose feet point backwards, so hunters tracking it walk steadily out of the forest. It trades safe passage for offerings of fruit and honesty.
10. **Loch Ness Monster** — A long-necked grazer of cold, deep water, surfacing just often enough to keep the gift shops solvent. Sonar returns describe something the size of a bus that would rather not be described.
11. **Banshee** — A pale figure attached to old family houses, whose keening is heard through walls the night before a death. She is never the danger; she is the notification.
12. **Black Shuck** — A calf-sized black hound of the coastal moors with eyes like embers, appearing beside lonely walkers. Seeing it is said to be an omen; being walked home by it, an honor.
13. **Tatzelwurm** — A stubby cat-faced serpent that dens in alpine scree and hisses like a kettle when disturbed. Herders report it; herpetologists report the herders.
14. **Yeti** — A white-furred hominid of the high passes, glimpsed between prayer flags and blizzards. Leaves stride-lengths that make experienced mountaineers quietly rope up.
15. **Kappa** — A river-dwelling trickster with a water-filled dish atop its head, fond of cucumbers and wrestling. Bow deeply; etiquette obliges it to bow back, spilling its strength.
16. **Mongolian Death Worm** — A red, arm-length worm of the Gobi that travels under the sand and is blamed for both venom and electric shock. Locals do not dig where the camels refuse to stand.
17. **Kitsune** — A fox spirit that grows a new tail each century and walks town markets in borrowed human faces. You can spot one by its shadow, which never learns the disguise.
18. **Bunyip** — A bellowing bulk in the billabong, all wet fur, tusks, and patience. Its call at dusk empties the waterline of dogs, livestock, and overconfident swimmers.
19. **Drop Bear** — A dense, muscular relative of the koala that hunts by controlled falling from eucalyptus canopies. Officially a joke told to tourists; the Bureau notes the helmets locals wear are not jokes.
20. **Taniwha** — A vast dweller of river bends and sea caves, guardian to those who respect its waters and hazard to those who don't. Sometimes a log is just a log; the taniwha decides when.

**Balance verification of this roster (the implementer's validator must reproduce this):** size 4/4/4/4/4 · habitat 4/4/4/4/4 · diet 4/4/4/4/4 · locomotion 4/4/4/4/4 · region 6/3/4/4/3 ⚑. Tag frequencies: fur 8, humanoid 8, scales 6, glowing-eyes 5, long-tail 5, claws 5, wings 3, horns 3, vanishes 3, shapeshifter 2. Twin pairs (differ by exactly one dimension): Sasquatch/Yeti (region), La Llorona/Banshee (region) — exactly 2, per rule 3.

### 6.4 Scaling the roster to ~100 (P1) — procedural spec

Roster growth is **build-time, not runtime**: a Node script `tools/generate-roster.mjs` emits `data/cryptids.js`; the deployed game ships a static file. Procedure:

1. **Quota assignment.** For N=100, build five quota pools (20 of each value per stat, region now exact). Assign stat vectors by shuffled round-robin draw from each pool (seeded), rejecting draws that violate uniqueness (rule 2) or exceed the twin-pair cap (rule 3, scaled: max 10 pairs at N=100). Rejection sampling converges in practice; cap retries at 1,000 then reshuffle.
2. **Tag assignment.** Draw 2–3 tags per entry, weighted so each tag lands on 25–55% of the roster (weights in config; validator enforces the band).
3. **Names.** Prefer authored: the remaining 80 entries should be drawn from the real global cryptid corpus (Ogopogo, Skinwalker, Flatwoods Monster, Fresno Nightcrawler, Bukavac, Yowie, Ahool, Mokele-mbembe, Selkie, Nuckelavee, Adze, Encantado, El Silbón, Akkorokamui, Tsuchinoko, Barghest, Lindworm, Grootslang, Mapinguari, Ropen, ...). A human or LLM pass maps each name to the nearest quota-satisfying stat vector. Where the corpus runs dry, the script composes fictional names from region-flavored part lists (`{epithet} + {creature-noun}`, e.g. "Hollow-Eyed Wader", "The Culvert Shepherd") — these are marked `"invented": true` in data.
4. **Flavor.** Template-generated from stats and tags: sentence 1 = appearance (size + tags + habitat), sentence 2 = behavior/warning (diet + locomotion + region idiom). Authored flavor always overrides templates.
5. **Validation.** `tools/validate-roster.mjs` asserts: schema conformance, enum membership, uniqueness, quota exactness, tag band, twin cap, and that every question in §6.6 splits the roster into two non-empty groups. CI-style: exits non-zero on failure.

### 6.5 The Witness (NPC)

Not an avatar — a voice in the case log, rendered as typewriter text beside a small static silhouette. **The witness always answers truthfully**, computed directly from the secret cryptid's data. Flavor comes only from phrasing: each answer picks a random line from `data/witness-lines.js` (`YES_LINES`, 8 variants: "Yes. I'm certain of it.", "God, yes. I'll never unsee it." ...; `NO_LINES`, 8 variants: "No. I'd have remembered that.", "No... no, nothing like that." ...). Config: `WITNESS_TYPE_SPEED_MS`.

### 6.6 The Question Drawer

A structured menu — the player never types free text. Questions are generated from the schema, grouped by category, each mapping to a predicate:

- **Stat questions (25):** one per stat value. Phrasing template per stat: "Was it *{size}*?", "Did you see it in/near *{habitat}*?", "Does it eat *{diet}*?" ("Is its diet unrecorded?" for `unknown`), "Does it *{locomotion}*?", "Are sightings from *{region}*?"
- **Tag questions (10):** "Did it have *{tag}*?" (phrasing table in data, e.g. `vanishes` → "Did it disappear in front of you?").

35 questions total in P0. Already-asked questions are shown greyed with their answer inline (asking twice is impossible). Each question costs `QUESTION_COST` leads. The drawer displays each question's cost and remaining leads.

### 6.7 Leads (the resource)

A tally strip of 15 pencil marks in the HUD. Question = −`QUESTION_COST` (1). Wrong accusation = −`GUESS_COST` (2). At 0 or below: Cold Case. Marks get struck through with an animation + scratch sound when spent. When ≤ 3 remain, the strip turns rust-red.

### 6.8 Pencil strikes (player annotations)

Free, unlimited, reversible strike-through per entry. Pure annotation: strikes never affect game logic and are never validated (a player can strike the true culprit — that's their error to discover). Cleared-by-wrong-guess entries get a permanent red CLEARED stamp instead (cannot be accused again; edge case in §7).

---

## 7. Rules, win & lose conditions

**Setup:** On "Take the call", the engine draws one secret cryptid uniformly from the roster using the seeded RNG. Leads = `LEADS_BUDGET` (15). Case log empty, all strikes cleared, no stamps.

**Turn structure:** No timers, no turn order — the player freely interleaves browsing, asking (if leads ≥ `QUESTION_COST`), striking, and accusing (if leads ≥ 1). The idea's "must guess every turn" rule is dropped for solo play: forced spam-guessing against a computer is noise, and optional accusation preserves the risk/reward. ⚑ (overridable via `FORCE_GUESS_EACH_TURN`, default `false`)

**Win — Case Closed:** Accuse the correct cryptid. Score = leads remaining *after* paying the guess (a correct accusation costs 0 leads). Rank by score: 12–14 **Legendary Cryptozoologist** · 8–11 **Senior Field Agent** · 4–7 **Junior Investigator** · 1–3 **Desk Clerk, Night Shift**. End screen shows the full dossier, rank, questions asked, and NEW CASE.

**Lose — Cold Case:** Leads reach 0 without a correct accusation. The secret cryptid's dossier is revealed with a "COLD CASE" stamp, plus the case log recap and NEW CASE. Losing has no penalty beyond the reveal.

**Edge cases (exact rulings):**
- Leads = 1: questions (cost 1) and accusations both allowed. A wrong accusation costing 2 drops leads to −1 → clamp to 0 → Cold Case immediately.
- Leads = 2 after a wrong guess = 0 → Cold Case immediately (a wrong guess may end the game).
- Accusing a CLEARED entry: blocked; the stamp wiggles and the witness says "We've already cleared them." No lead cost.
- Re-asking a question: impossible by UI (greyed).
- All entries struck by the player (including the culprit): game continues normally; strikes are annotations only.
- Only one un-CLEARED entry remains: no auto-win; the player still must accuse it (protects the ACCUSE beat).
- Both the source idea's "players might be the same monster" case doesn't apply solo; each case has exactly one culprit.
- `Esc`/refresh mid-case: P0 loses in-progress case state (acceptable for prototype); P1 persists in-progress case to `localStorage`.

**Statistical sanity (implementer note):** with 20 entries and balanced stats, an ideal stat question eliminates ~80% (matching the source idea's math) but a *good greedy* question splits closer to 50/50 using tags; expected solve is 4–7 questions, so `LEADS_BUDGET=15` gives comfortable slack plus 2–3 wrong guesses. Tighten to 10 for hard mode (`?leads=10`).

---

## 8. Difficulty & progression

**Within a case:** difficulty emerges from the shrinking field — no scripted escalation. The twin pairs (§6.3) create a natural late-game skill check: sloppy players who never ask a region question stall at 2 candidates.

**Across cases (P0):** none. Single tuned difficulty; rank titles are the replay motivator.

**Config knobs instead of a progression system:** `LEADS_BUDGET`, `GUESS_COST`, `ROSTER_SIZE` (play with a random 10-entry sub-roster for easy mode via `?roster=10`), `ASSIST_AUTODIM` (see below).

**P1 additions:** Daily Case (`?daily=1`: seed = UTC date string, same culprit for everyone, streak counter in `localStorage`); "Junior Mode" toggle `ASSIST_AUTODIM=true` that automatically dims entries contradicted by answers — for kids/teaching, default **off** because it deletes pillar 2. ⚑

**P2:** best-score history per roster size; a 100-entry "Full Archive" mode.

---

## 9. Style & theme

**Visual style:** A 19th-century naturalist's field guide processed through a mid-century government bureau. Paper textures, ink lines, rubber stamps, typewriter annotations. Flat DOM/CSS — no canvas needed. Think **"Audubon plates meet Papers, Please paperwork, with the deadpan of Welcome to Night Vale."**

**Palette (6 colors):**
- `#F2EAD3` paper cream (page/card background)
- `#3B2F2A` ink umber (text, line work)
- `#5A6E4A` field moss (stat icons, accents, YES answers)
- `#A8402F` stamp rust (ACCUSE/CLEARED stamps, lead warnings, NO answers)
- `#4A6B8A` archive blue (links, question drawer, selected states)
- `#C9A227` brass (rank medals, hover glints)

Dark surround `#221C18` behind the "desk" so the paper glows.

**Typography:** headers in Georgia/serif (small-caps for entry names, letter-spaced); witness dialogue and case log in `"Courier New", monospace`; stat labels in the serif at 0.8em italic. System fonts only — zero font assets.

**Tone:** dry, bureaucratic wonder. The Bureau takes monsters exactly as seriously as parking permits.

**Placeholder art plan (M0–M2):** entries are cream CSS cards with a 64px emoji portrait in an ink-bordered circle, stat strip as text glyphs (📏🏞🍖🦶🗺 + value word). Stamps are CSS: rotated bordered text with `mix-blend-mode: multiply`. Paper texture = subtle CSS gradient noise (no image files). This placeholder set is intentionally close to shippable — pillar 1 demands the book feel good even in M0.

---

## 10. Sound design

**Implementation:** Web Audio API with small synthesized SFX (jsfxr-style generator functions in `js/audio.js`) — zero audio asset files. All audio initializes on first user gesture (the splash "Take the call" click) per autoplay policy. Mute toggle is P0, persisted to `localStorage` (`sighting.muted`).

**SFX event table:**

| Event | Sound description | Priority |
|---|---|---|
| Ask question (lead spent) | Short pencil scratch: filtered noise burst, 120 ms | P0 |
| Witness answers YES | Two-note upward marimba blip (E4→G4, sine, 180 ms) | P0 |
| Witness answers NO | Two-note downward blip (E4→C4, slightly detuned) | P0 |
| Strike / un-strike entry | Soft graphite swipe: noise, low-pass sweep, 90 ms | P0 |
| Accuse (stamp down) | Thunk: 80 Hz sine hit + noise click, 150 ms | P0 |
| Case Closed (win) | 4-note brass-y triad arpeggio, 900 ms | P0 |
| Cold Case (lose) | Low detuned drone fade, 1.2 s | P0 |
| Low leads (≤3, once) | Single muted tick, pitch-down | P1 |
| Page/dossier open | Paper flip: shaped white-noise swoosh, 150 ms | P1 |
| Typewriter per witness character | 30 ms click, every 2nd char, −18 dB | P1 |

**Music:** none in P0. P1: a single generative ambience — sparse detuned sine pad + occasional vinyl-crackle noise (Web Audio, ~40 lines), volume −24 dB. Never copyrighted tracks.

---

## 11. UI & screens

**Flow:** `SPLASH → INVESTIGATION ⇄ (dossier modal, question drawer) → CASE CLOSED | COLD CASE → INVESTIGATION (new case) …` — the BUREAU wordmark returns to SPLASH from anywhere.

### Splash (mandatory)
A case-file cover on the desk:
- Title: **THE SIGHTING** + one-liner: "Someone saw something. Find out what."
- Rules in ≤5 bullets: **①** A witness saw one creature from this field guide. **②** Ask yes/no questions — each costs 1 lead. **③** Cross out suspects yourself; answers are always true. **④** Accuse when sure — wrong accusations cost 2 leads. **⑤** Identify it before your 15 leads run out.
- Controls line: "Mouse or touch. Q ask · X strike · R new case · M mute."
- Version number bottom-right (e.g. `v0.1.0`), rendered from the single `VERSION` constant in `js/version.js`.
- One obvious affordance: a big rust-stamp button **"TAKE THE CALL"**.

### Investigation (main screen)
- **Left/top (desktop/mobile): the Field Guide** — scrollable card grid, 4 columns desktop / 2 columns mobile. Struck cards dimmed at 35% opacity with a pencil line; CLEARED cards stamped red.
- **Right/bottom: the Case File (HUD)** — always visible: leads tally strip (15 marks), "ASK WITNESS" button, scrolling case log (Q/A history), mute icon, NEW CASE folder icon, version in the footer.
- **Dossier modal** — half-page entry view with ACCUSE stamp and strike toggle.
- **Question drawer** — slides over the case file; category tabs (Size · Habitat · Diet · Moves · Region · Features); asked questions greyed with answers inline.

### Case Closed / Cold Case (end screens)
Full-width dossier of the culprit with WIN rank medal or COLD CASE stamp, questions-used count, leads remaining, seed shown in small print (`case #a3f9`), and two buttons: **NEW CASE** (primary) and **BUREAU** (splash).

---

## 12. Config & tuning

Single source of truth: `js/config.js` exporting `CONFIG`. Every gameplay number in this doc references these keys.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `LEADS_BUDGET` | 15 | leads | Starting resource per case |
| `QUESTION_COST` | 1 | leads | Cost of asking any question |
| `GUESS_COST` | 2 | leads | Cost of a *wrong* accusation |
| `ROSTER_SIZE` | 20 | entries | How many cryptids are in play this case (sampled from data if < data length) |
| `LOW_LEADS_THRESHOLD` | 3 | leads | When the tally strip turns rust-red + tick SFX |
| `FORCE_GUESS_EACH_TURN` | false | bool | Restores the tabletop "guess after every question" rule |
| `ASSIST_AUTODIM` | false | bool | Junior mode: auto-dim contradicted entries |
| `WITNESS_TYPE_SPEED_MS` | 18 | ms/char | Case-log typewriter speed (0 = instant) |
| `RANK_THRESHOLDS` | [12,8,4,1] | leads left | Score → rank title boundaries |
| `TWIN_PAIR_CAP_PER_20` | 2 | pairs | Roster generator/validator constraint |
| `TAG_FREQ_BAND` | [0.25,0.55] | fraction | Generator/validator tag frequency band |
| `SFX_VOLUME` | 0.6 | 0–1 | Master SFX gain |

**URL flags (parsed in `js/main.js`, all override CONFIG for the session):**
- `?seed=abc123` — seeds the RNG (mulberry32 over a string hash) for reproducible cases. Every case's seed is displayed on end screens so playtesters can share cases.
- `?debug=1` — debug overlay: current secret cryptid id, seed, leads, per-question elimination counts (how many entries each answer *should* rule out), and cheat keys: `W` = auto-win, `L` = drain leads to 1.
- `?leads=10` — override `LEADS_BUDGET` (hard mode).
- `?roster=10` — override `ROSTER_SIZE` (easy mode / kid mode).
- `?daily=1` — P1 daily case (seed = UTC `YYYY-MM-DD`).
- `?skip=1` — bypass splash straight into a case (playtest convenience).

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + semantic HTML + CSS. Zero-build, no libraries, no canvas.** This is a paper-and-cards UI game: DOM/CSS gives free layout, scrolling, text rendering, accessibility, and the stamp/strike aesthetics via plain CSS — a canvas or framework would only add cost. Audio is raw Web Audio (a ~100-line synth module beats shipping Howler for 7 sounds). No runtime network calls; the roster is a static JS module. Deployment = copy the folder to the static host (this repo already serves `public/games/*` as-is, like `grayharbor`). Performance is trivial for DOM at this scale (≤100 cards, no per-frame loop; the only animations are CSS transitions and a typewriter interval), so the 60fps budget is met by construction; perf rule: never exceed 200 DOM cards, no box-shadow animation on scroll containers.

**Files (repo = deployable output, no build step):**

```
public/games/monster-guess-who/
├── design.md              (this doc)
├── index.html             (all three screens as sections; modules loaded type="module")
├── css/style.css
├── js/version.js          (export const VERSION = "0.1.0")
├── js/config.js           (CONFIG + URL flag parsing helpers)
├── js/rng.js              (mulberry32 + string hash, seed plumbing)
├── js/engine.js           (pure logic: newCase, askQuestion, accuse, state machine — NO DOM)
├── js/questions.js        (builds the 35 question objects from schema; pure)
├── js/ui.js               (render field guide, HUD, drawer, modals; event wiring)
├── js/audio.js            (Web Audio synth SFX + mute persistence)
├── js/main.js             (boot: flags → config → engine → ui)
├── data/cryptids.js       (the roster, §6.3 schema)
├── data/witness-lines.js  (yes/no phrasing pools, question phrasing tables)
└── tools/                 (NOT loaded at runtime)
    ├── generate-roster.mjs
    └── validate-roster.mjs
```

---

## 14. Milestones

### M0 — Toy loop (prove it with rectangles)
**Goal:** the deduction loop is playable end-to-end, ugly.
**Deliverables:** engine.js + questions.js complete and pure; a bare grid of 20 plain text cards; question list as a `<select>` + button; answers as plain text log; click-to-strike; accuse via click + confirm(); leads counter as text; win/lose alert + reload.
**Acceptance criteria:**
- [ ] A full case (draw → questions → strikes → accuse → result) completes with no console errors.
- [ ] Witness answers are provably truthful: `?debug=1` shows the secret id and no answer ever contradicts the data (spot-check 5 seeded cases).
- [ ] `?seed=` reproduces the identical case twice.
- [ ] Engine runs headless: a Node script plays 1,000 random-policy cases with no crash and win-rate > 0.
- [ ] Someone on the team plays 3 cases and reports whether narrowing the field felt good.
**Proves:** the fun hypothesis, or kills it. *If striking suspects isn't satisfying here, stop.*

### M1 — Real rules
**Goal:** full P0 ruleset and information design.
**Deliverables:** splash (rules, controls, version, TAKE THE CALL); real HUD (lead tally strip, case log, mute stub); question drawer with category tabs, greyed asked-questions; dossier modal with ACCUSE stamp + strike toggle; CLEARED stamps; end screens with ranks; NEW CASE without reload; all edge cases in §7; all config keys wired; keyboard shortcuts.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds unprompted (splash-only onboarding).
- [ ] Every §7 edge case behaves as specified (manual checklist).
- [ ] All tuning flows from `CONFIG`; `?leads=10&roster=10` visibly changes the game.
- [ ] Version on splash and debug overlay both come from `js/version.js`.
**Proves:** the rules are complete and self-teaching.

### M2 — Feel
**Goal:** the book becomes the hero; the game gets its voice.
**Deliverables:** full §9 art pass (palette, paper cards, emoji portraits, stamps, strike animation); witness typewriter text + yes/no line pools; P0 SFX set + mute persistence; micro-juice (stamp slam scale-in, lead scratch animation, card dim transition, low-leads red state).
**Acceptance criteria:**
- [ ] All 7 P0 sounds fire on their events; mute persists across reloads; no audio before first gesture.
- [ ] A playtester browses at least 3 dossiers unprompted (pillar 1 check).
- [ ] Wrong accusation reads clearly: red CLEARED stamp + 2 leads visibly scratched.
- [ ] Playable with touch only on a phone-width viewport (2-column guide, drawer usable).
**Proves:** presentation multiplies the loop instead of masking it.

### M3 — Playtest build
**Goal:** shareable, measurable, tuned.
**Deliverables:** `?debug=1` overlay complete with cheat keys and per-answer elimination counts; seed on end screens; deployed to the static host under `/games/monster-guess-who/`; P1 features *if time allows, in this order*: daily case, in-progress persistence, page-flip + typewriter SFX, `ASSIST_AUTODIM` junior mode, roster expansion toward 100 via §6.4 tools.
**Acceptance criteria:**
- [ ] Cold-loaded from the live static URL, a stranger completes a case with zero verbal instructions.
- [ ] `?seed=X` produces the same case on two different machines.
- [ ] `tools/validate-roster.mjs` passes on shipped data.
- [ ] 5 playtests logged against §2's questions.
**Proves:** the prototype can gather real evidence.

---

## 15. Open questions

1. **Is `LEADS_BUDGET=15` the right pressure?** (non-blocking — resolve in playtest via `?leads=`.)
2. **Should wrong guesses cost 2 or 3 leads?** (non-blocking — `GUESS_COST` knob.)
3. **Do the twin pairs (Sasquatch/Yeti, La Llorona/Banshee) delight or frustrate?** (non-blocking — playtest question; removable by editing one region value in data.)
4. **Is manual striking enough, or do players demand auto-dim?** (non-blocking — `ASSIST_AUTODIM` exists; watch whether testers ask for it.)
5. **Does the witness framing add or is it noise at 18 ms/char?** (non-blocking — `WITNESS_TYPE_SPEED_MS=0` disables the typewriter.)
6. **At 100 entries, does the guide need search/filter UI to stay browsable?** (non-blocking for P0 — only relevant when the P1 roster ships; plan: sticky category filter chips.)

No blocking questions. Build.

---

## 16. Handoff notes for Fable

- **Build order:** `rng.js` → `engine.js` + `questions.js` (pure, with the headless 1,000-case soak test) → `data/cryptids.js` (paste §6.3 verbatim) → minimal `ui.js` (M0 rectangles) → rules/screens (M1) → style + `audio.js` (M2) → debug/deploy (M3). Prove the loop with plain text cards before touching the paper aesthetic — pillar 1 is an M2 concern, not an M0 excuse.
- **Keep the sim headless.** `engine.js` and `questions.js` must not import DOM or `window`. State is a plain object `{ seed, secretId, leads, asked:[], cleared:[], phase }`; `ui.js` renders from state and calls engine functions. Unit tests (plain Node asserts, no framework) cover: answer truthfulness for every question × every cryptid (35×20 matrix — cheap and catches data typos), lead arithmetic including the clamp-to-zero wrong-guess case, and roster validation.
- **Data is content, engine is generic.** Nothing in engine/ui may reference a specific cryptid id; adding entry #21 must require touching only `data/cryptids.js`. The question drawer is generated from the enums, never hand-written.
- **Repo/deploy layout:** exactly §13 — the folder *is* the deployable; no build step, no `dist/`. Verify it runs from `file://`-adjacent static serving (`python -m http.server`) before calling any milestone done.
- **Every milestone ends runnable.** Never leave `index.html` broken at a commit; if a feature is half-done, gate it behind `?debug=1`.
- **Version discipline:** bump `js/version.js` at each milestone (0.1.0 = M0 … 0.4.0 = M3); it is the only place the version string lives.
