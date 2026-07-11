# Pooper Scrolls — Game Design Document

> Source idea: [Game Idea 19 - Pooper scrolls (Theme: A mysterious illness)](/game-idea-19-pooper-scrolls-theme-a-mysterious-illness)

---

## 1. Title & one-liner

**Working title:** **Pooper Scrolls** ⚑ (overridable — the source title is already the best pun available)

**Alternate titles:**
1. *The Elder Bowels*
2. *Prophecy & Fiber*
3. *The Prophet of Porcelain*
4. *Gut Feeling*
5. *Scroll Movement*

**One-sentence description:** A turn-based, push-your-luck day-scheduling comedy where the longer you hold it in, the further into the future your bathroom-delivered prophecy scrolls can see — but only for whoever cooked your last meal.

**Genre:** Single-player turn-based decision/scheduling game (Reigns-adjacent card-and-timeline puzzler).

**Elevator pitch:** You have a mysterious illness: every bathroom visit produces a beautifully embroidered scroll bearing a four-line rhyming prophecy. The rules of the curse are strict — the scroll sees exactly as far into the future as the time since your last visit, and it foretells the fate of *whoever cooked the meal you digested*. Each in-game day you juggle three dials: **what you eat** (choosing whose future you'll read), **when you go** (a longer wait means a longer prophecy window, but the pain builds), and **how you act** (decoding cryptic rhymes to dodge disasters and seize opportunities for yourself and your friends). Every scroll is also a fragment of a vast, conspiracy-wall mosaic that hints at something bigger. It is a comedy of dignity management played entirely with buttons and cards — tasteful, cartoonish, and never gross-out.

**Adaptation choice (per MODE NOTE):** The source is a story premise with a rule system; I adapted its five explicit rules directly into mechanics — rule 2 becomes a push-your-luck foresight window, rule 3 becomes the intervention system, rule 4 becomes meal/cook selection, rule 5 becomes the pain meter, and rule 6 becomes the fragment-collection meta — packaged as a one-day, 16-turn scheduling round.

---

## 2. Fun hypothesis

**The single question this prototype answers:**

> *Is the tension of trading constipation pain for longer prophecy windows — combined with decoding rhyming fortunes into the right real-world intervention — actually fun?*

Everything in P0 serves this: the hour-by-hour turn loop, the pain meter, the cook-selection meals, the 4-line rhymes with 3-option interventions, and the score tally.

**Playtest questions (ask after each session):**
1. Did you deliberately delay a bathroom visit to see further ahead? Did that decision feel tense or arbitrary?
2. When you read a rhyme, did you understand *what* was going to happen and *which* intervention was correct? How often did you guess?
3. Did you ever eat a specific person's cooking *on purpose* to read their future? Did that feel clever?
4. Was the day too short, too long, or right? Did you want to immediately play another day?
5. Did the toilet framing make you laugh, cringe, or shrug? (We want laugh; cringe means tone drift.)

---

## 3. Design pillars

1. **Push-your-luck prophecy.** The wait-longer-see-further / wait-longer-hurt-more trade is the core tension. Any feature that dilutes the meaning of *when you go* gets cut.
2. **Decode, then act.** Fortunes are puzzles with exactly one correct read. The player's agency is comprehension: the rhyme always contains the key to the correct intervention. No pure guessing.
3. **Tasteful toilet comedy.** The joke is the *solemnity* (faux-medieval prophecy verse, embroidered scrolls, a conspiracy wall) colliding with the mundane (bus stops, staplers, casseroles). No poop is ever depicted. The bathroom is a closed door and a sparkle sound.

---

## 4. Core game loop

**Session target:** one in-game day ≈ **5–7 real minutes** (16 turns × ~20 seconds).

A round is one day, **06:00–22:00**, in 16 one-hour turns. Each turn the player takes exactly **one action**, then the clock advances and any scheduled events at that hour resolve.

### Phases

**Phase A — Morning Omens (once, ~15 s).**
- *Does:* Reads the day's newspaper panel: "Today the fates concern: You ×N, Gary ×N, Mom ×N, Raul ×N" (subject counts only, no details), and sees the day's meal schedule.
- *Sees:* The timeline strip (16 slots), the pain meter at zero, the newspaper card.
- *Feels:* Planning appetite — "whose future do I need to read, and when?"

**Phase B — The Hour (repeats ×16, ~15 s each).**
- *Does:* Picks one of four actions: **Eat** (a meal available this hour — sets whose fortune your next scroll reads), **Visit the Throne** (produce scrolls covering the next *W* hours, where *W* = hours since last visit), **Act** (spend the hour executing an intervention on a revealed fortune), or **Wait** (pass; pain still accrues).
- *Sees:* The timeline advancing, revealed fortunes pinned above their hours, the pain meter creeping.
- *Feels:* The squeeze — "the meeting is at 15:00, my window only reaches 14:00, do I hold on one more hour?"

**Phase C — Scroll Reveal (whenever the player Visits, ~10 s).**
- *Does:* Reads 1–3 embroidered scrolls in a modal; each is a 4-line rhyme. Real scrolls pin a mystery marker to a future hour on the timeline and unlock its 3 intervention options; duds deliver a joke.
- *Sees:* Parchment card unfurling, a fragment flying to the Wall counter.
- *Feels:* Payoff of the hold — or comic deflation on a dud.

**Phase D — Event Resolution (end of each hour, instant).**
- *Does:* Watches scheduled events fire: averted (correct intervention done in time) → +points and a cheerful vignette line; hit (no/wrong intervention) → −points and a sad-trombone vignette line.
- *Feels:* Consequence. Foreseen-and-fixed feels prophetic; foreseen-and-fumbled stings correctly.

**Phase E — Day Summary (once, ~20 s).**
- *Does:* Reviews tally (averted / hit / seized / fragments / pain penalties), sees rank title, taps Restart or New Seed.
- *Feels:* "I could have read Gary's future if I'd eaten his leftovers at noon" → one more day.

### Loop diagram

```
        ┌──────────────────────────────────────────────┐
        │  A. MORNING OMENS (subject counts, meals)    │
        └──────────────┬───────────────────────────────┘
                       ▼
        ┌──────────────────────────────────────────────┐
   ┌───▶│  B. PICK ACTION (Eat / Visit / Act / Wait)   │
   │    └───────┬────────────┬─────────────────────────┘
   │            │ Visit      │ other
   │            ▼            │
   │    ┌───────────────┐    │
   │    │ C. SCROLLS    │    │
   │    │  (rhymes pin  │    │
   │    │  future hrs)  │    │
   │    └───────┬───────┘    │
   │            ▼            ▼
   │    ┌──────────────────────────────────────────────┐
   │    │  D. CLOCK +1h → events at this hour resolve  │
   │    └───────┬──────────────────────────────────────┘
   │            │ hour < 22:00
   └────────────┘
                │ hour == 22:00
                ▼
        ┌──────────────────────────────────────────────┐
        │  E. DAY SUMMARY (score, rank, restart)       │
        └──────────────────────────────────────────────┘
```

---

## 5. Inputs & controls

Entirely button/card-driven. **Touch is fully viable** — the game is a tap-the-button UI with no timing pressure, and it is a P0 requirement that every interaction works with plain clicks/taps on ≥44 px targets.

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Click action button / `1` | Tap action button | **Eat** — opens meal picker for this hour |
| Click action button / `2` | Tap action button | **Visit the Throne** — produce scrolls |
| Click action button / `3` | Tap action button | **Act** — opens list of revealed, un-handled fortunes |
| Click action button / `4` or `Space` | Tap action button | **Wait** — pass the hour |
| Click a pinned scroll on timeline | Tap pinned scroll | Re-read that fortune + its 3 intervention options |
| Click option card / `A` `B` `C` | Tap option card | Choose an intervention (inside Act flow) |
| Click / `Enter` | Tap | Confirm / dismiss modal |
| `Esc` or ⏸ button | Tap ⏸ button | Pause menu (resume, restart, mute) |
| `M` or 🔇 button | Tap 🔇 button | Mute/unmute toggle |
| `R` (on summary or pause) | Tap Restart button | Restart day (same seed) |
| `N` (on summary) | Tap New Day button | New day (new seed) |
| Click 🧻 Wall button / `W` | Tap Wall button | Open/close the Wall of Prophecy screen |

No other inputs exist. There is no real-time element; nothing happens between clicks.

---

## 6. Game elements

### 6.1 The Player ("You")
- **Looks:** P0 placeholder — a beige rounded rectangle with a worried-eyebrows emoji face (🙁/😌 swapping with pain level). Final — flat-vector office everyman, brown cardigan.
- **Behaves:** Pure state container: current hour, score, pain, `lastVisitHour`, `lastDigestedCook`, revealed fortunes, completed interventions.
- **Config keys:** `painComfortHours`, `painEmergencyHours`, `digestHours`.
- **Interacts with:** meals (eating), the Throne (visiting), events (interventions).

### 6.2 The Timeline
- **Looks:** P0 — horizontal strip of 16 slots labeled 06:00–21:00, current-hour slot highlighted, past slots dimmed. Pinned fortunes are small scroll icons (📜 emoji in P0) above their event hour; unrevealed events are invisible.
- **Behaves:** Advances one slot per action. Shows the current prophecy reach as a bracket: `[now … now + hoursSinceLastVisit]` so the player always sees how far a Visit would read.
- **Config keys:** `dayStartHour` (6), `dayEndHour` (22).

### 6.3 Pain Meter
- **Looks:** P0 — vertical bar, green→amber→red, labeled "Urgency". Face emoji beside it degrades: 😌 (0–2 h) 😐 (3–4) 😖 (5–6) 🥵 (7–8).
- **Behaves:** Value = hours since last visit. At `painComfortHours` (4) it turns amber; each Visit taken beyond comfort costs `painPenaltyPerHour` points per excess hour. At `painEmergencyHours` (9) an **Emergency** triggers automatically (see 7. Rules).
- **Config keys:** `painComfortHours`, `painPenaltyPerHour`, `painEmergencyHours`, `emergencyPenalty`, `garbleRatio`.

### 6.4 Meals
Eating is how you choose whose future your next scroll reads (source rule 4). A meal eaten at hour *H* is **digested** at *H + digestHours* (2). When you Visit, the scroll's subject is the cook of the **most recently digested** meal since your last visit. Eating a new meal supersedes the previous one once digested. You cannot eat two hours in a row (`minHoursBetweenMeals` = 2).

| Meal | Cook (fortune subject) | Available hours | P0 look |
|---|---|---|---|
| Home breakfast | **You** | 06:00–08:00 | 🍳 card |
| Mom's drop-off casserole | **Mom** | 08:00–10:00 | 🥘 card |
| Raul's taco truck | **Raul** | 11:00–14:00 | 🌮 card |
| Gary's shared leftovers | **Gary** | 12:00–14:00 | 🍝 card |
| Home dinner | **You** | 18:00–20:00 | 🍲 card |
| Vending machine | **Nobody** (guaranteed dud scroll) | any hour | 🍫 card, tooltip "cooked by no living soul" |

- **Config keys:** `digestHours`, `minHoursBetweenMeals`.
- **Interacts with:** the Throne (determines scroll subject).

### 6.5 The Throne (bathroom)
- **Looks:** Never shown inside. P0 — a door icon 🚪; Visiting plays a door-close, a twinkle, and the scroll modal. Final — a regal closed door with a "OCCUPIED / COMMUNING" slider sign.
- **Behaves:** Visiting at hour *V* with last visit *L* sets window *W = V − L*. It reveals **every scheduled event whose subject matches the digested cook and whose hour is in (V, V + W]**, one scroll each. Each real scroll adds one Wall fragment. If no meal has digested since the last visit, or the digested cook is Nobody, or no matching events fall in the window → one **dud scroll** (joke rhyme, no fragment). Then `lastVisitHour = V`, pain resets to 0.
- **Config keys:** `digestHours` (shared), `fragmentPoints`.

### 6.6 Fortunes (scrolls)
The content core. Each fortune = a 4-line rhyme + a hidden event + 3 intervention options (exactly one correct, keyed by the rhyme). Two intervention timing types:
- **PREP** — the Act action succeeds at *any* hour before the event hour.
- **SHOW-UP** — the Act action must be taken *exactly at* the event hour (you spend that hour being there).

Full P0 content set is in **6.9** below.

- **Looks:** P0 — a parchment-colored card, serif italic rhyme text, wax-seal dot showing the subject's color. Final — embroidered-cloth texture border.
- **Config keys:** `avertPoints`, `hitPenalty`, `seizePoints`, `wrongActPenalty`.

### 6.7 NPCs (fortune subjects)
Pure flavor + subject identity in P0; no simulation. Each has a color and one line of vignette text per outcome.

| NPC | Role | Color | P0 look |
|---|---|---|---|
| **Gary** | Deskmate at your office | Blue | Blue square, tie, 😅 |
| **Mom** | Calls too often, cooks too much | Purple | Purple square, glasses, 😊 |
| **Raul** | Taco-truck philosopher, 5th & Vine | Orange | Orange square, cap, 😎 |

### 6.8 Wall of Prophecy (fragment meta)
- **Looks:** P0 — a 6×5 grid of dark tiles over a hidden picture; each fragment flips one random-but-seeded tile to reveal that portion. The hidden picture in P0 is a single inline SVG: a giant stylized eye over a toilet-shaped constellation ⚑ (overridable art gag).
- **Behaves:** Fragments persist across days in `localStorage` (`ps_wall_v1`). Each fragment is worth `fragmentPoints` (5) on the day it is earned. Completing the wall (30 fragments) shows a one-screen joke ending card ("The prophecy was… a renovation notice for your bathroom") — P1.
- **Config keys:** `wallCols` (6), `wallRows` (5), `fragmentPoints`.

### 6.9 P0 fortune content (authoritative)

Fourteen real fortunes + three duds + the emergency garble rule. **This table is the P0 content database; implement it verbatim as a data file.** Correct option is marked ✔. `type`: PREP = act any hour before event; SHOW-UP = act exactly at event hour. Default outcome (if not correctly handled): DISASTER = `hitPenalty` (−20); MISSED = 0 (opportunity lapses). Correct handling: DISASTER → averted, +`avertPoints` (+25); OPPORTUNITY → seized, +`seizePoints` (+20).

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F01 | You | 12:00 | Disaster — falling flowerpot on the shortcut street | PREP |

> *When the sun stands high and thy stroll begins,*
> *beware the ledge where the fern-pot grins.*
> *The short path homeward earns a clout;*
> *the bread-scented road shall bear thee out.*

Options: **A)** Take the long way past the bakery ✔ · **B)** Wear a sturdy hat · **C)** Skip the walk and nap
Vignettes — averted: "You smell croissants. Behind you: a distant *crunch* of terracotta." · hit: "A fern-pot introduces itself to your head. −dignity."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F02 | You | 10:00 | Disaster — bus hits a curbside puddle | PREP |

> *A chariot swift on a rain-slick street*
> *shall baptize all who curb-side meet.*
> *Stand thee back three paces hence,*
> *and keep thy trousers free of offense.*

Options: **A)** Wait at the very back of the bus stop ✔ · **B)** Wear a raincoat · **C)** Take an earlier bus
Vignettes — averted: "The 10:00 bus christens the pavement. You, three paces back, remain immaculate." · hit: "The 10:00 bus. The puddle. Your trousers. A tragedy in one act."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F03 | You | 15:00 | Disaster — boss demands the quarterly numbers | PREP |

> *At the hour of three the boss shall call*
> *for numbers thou rememberest not at all.*
> *The folder of blue by thy bedside chair*
> *shall spare thee shame — go fetch it there.*

Options: **A)** Swing by home for the blue folder ✔ · **B)** Rehearse a confident speech · **C)** Hide in the supply closet
Vignettes — averted: "You produce the blue folder like a court wizard. The boss nods, disturbed." · hit: "You improvise the Q3 numbers via interpretive humming. It does not land."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F04 | You | 13:00 | Disaster — pickpocket in the food-cart line | PREP |

> *Where the food-cart line doth wind and press,*
> *nimble fingers seek thy wallet's address.*
> *Keep thy coin in the pocket fore,*
> *or count thy cards for nevermore.*

Options: **A)** Move wallet to your front pocket ✔ · **B)** Skip lunch entirely · **C)** Buy bigger pants
Vignettes — averted: "A stranger pats your empty back pocket and sighs professionally." · hit: "Your wallet begins a new life without you."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F05 | You | 14:00 | Disaster — phone leaps into the plaza fountain | PREP |

> *Thy chattering brick of glowing glass*
> *shall dive to the fountain as thou dost pass.*
> *Leave the trickster at thy desk,*
> *lest thy afternoon grow picturesque.*

Options: **A)** Leave your phone at your desk ✔ · **B)** Buy a waterproof case · **C)** Avoid all water forever
Vignettes — averted: "The fountain burbles, phoneless and disappointed." · hit: "Your phone performs a flawless swan dive. 9.8 from the pigeons."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F06 | You | 12:00 | Opportunity — free cheese samples in the market square | SHOW-UP |

> *At the stroke of noon in the market square,*
> *free cheese awaiteth the swift and fair.*
> *Tarry not, for the greedy horde*
> *descendeth fast upon the board.*

Options: **A)** Be at the market square at noon ✔ · **B)** Order cheese online · **C)** Befriend a mouse
Vignettes — seized: "You secure the gouda before the horde. A vendor salutes you." · missed: "By 12:04 there is only a toothpick and regret."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F07 | You | 11:00 | Disaster — parking warden reaches your car | PREP |

> *The steel-eyed warden walks her round*
> *where thy horseless cart sits parked, unpound.*
> *Feed the hungry post two silver bits,*
> *or wear the orange badge of quits.*

Options: **A)** Feed the parking meter ✔ · **B)** Wash the car so it looks loved · **C)** Leave an apologetic note
Vignettes — averted: "The warden circles your fed meter like a shark denied." · hit: "An orange envelope blooms on your windshield. $60."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F08 | You | 19:00 | Disaster — marinara incident at dinner date | PREP |

> *At supper's hour a crimson tide*
> *of marinara shall stain thy pride.*
> *A second shirt within thy sack*
> *turns fashion's rout to fashion's knack.*

Options: **A)** Pack a spare shirt ✔ · **B)** Order the salad instead · **C)** Cancel the date
Vignettes — averted: "The meatball strikes. You return from the restroom in a fresh shirt. Your date is deeply impressed." · hit: "You spend dessert wearing 40% of your entrée."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F09 | Gary | 16:00 | Disaster — Gary's big presentation dies (lost dongle) | PREP |

> *The stapled one, thy desk-bound friend,*
> *shall watch his slideshow crash and end.*
> *The dongle lost beneath his chair —*
> *retrieve it, and he's spared despair.*

Options: **A)** Fish the dongle out from under Gary's chair ✔ · **B)** Email Gary an encouraging meme · **C)** Distract the boss during the meeting
Vignettes — averted: "Gary's slides bloom onto the screen. He mouths 'how did you know'." · hit: "Gary presents Q3 from memory, weeping gently."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F10 | Mom | 17:00 | Disaster — Mom's casserole (and smoke alarm) catastrophe | PREP |

> *The one who birthed thee stirs a pot*
> *and shall forget the oven's hot.*
> *A timely call to her abode*
> *prevents the smoke-alarm episode.*

Options: **A)** Call Mom and remind her about the oven ✔ · **B)** Mail her a fire extinguisher · **C)** Show up uninvited for dinner
Vignettes — averted: "'Oh! The oven!' Mom says. You hear a casserole being rescued." · hit: "Mom's smoke alarm performs its one-note concert for the whole block."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F11 | Raul | 13:00 | Disaster — Raul's taco truck meets broken glass on 5th | PREP |

> *The taco knight of Fifth and Vine*
> *shall meet the shards of broken wine.*
> *Warn him where the green glass lay,*
> *and guac is free for thee this day.*

Options: **A)** Warn Raul about the glass on 5th ✔ · **B)** Order extra tacos in solidarity · **C)** Sweep the entire street yourself
Vignettes — averted: "Raul swerves, salutes, and hands you free guacamole. Destiny tastes of lime." · hit: "Raul's truck lists sadly on a flat. No tacos for anyone."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F12 | You | 09:00 | Disaster — a pigeon of civic fame takes aim | PREP |

> *A feathered fiend of civic fame*
> *hath marked thy shoulder for his aim.*
> *Beneath the awnings make thy way,*
> *and white-stained woe is kept at bay.*

Options: **A)** Walk under the shop awnings ✔ · **B)** Feed the pigeons a decoy bagel · **C)** Shake your fist at the sky
Vignettes — averted: "Something splats where you would have been. The pigeon files a complaint." · hit: "Direct hit. The pigeon does a little bow."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F13 | Gary | 15:00 | Opportunity — it's Gary's birthday and nobody remembered | PREP |

> *Thy deskmate's natal day is nigh,*
> *though none remembered — hear him sigh.*
> *A muffin offered, humbly grand,*
> *shall win thee favor's helping hand.*

Options: **A)** Bring Gary a muffin ✔ · **B)** Sing loudly at his desk · **C)** Announce it over the intercom
Vignettes — seized: "Gary holds the muffin like a knighthood. You have a friend for life." · missed: "Gary quietly eats a candle-less granola bar at 15:00."

| id | Subject | Event hour | Kind | Type |
|---|---|---|---|---|
| F14 | You | 08:00 | Disaster — your keys slip into the floor gap | PREP |

> *Before thou fleest thy morning door,*
> *thy keys shall slip to the gap in the floor.*
> *Check the bowl beside the bin,*
> *or lock thyself both out and in.*

Options: **A)** Grab the keys from the bowl by the bin ✔ · **B)** Prop the door open all day · **C)** Practice climbing through windows
Vignettes — averted: "Keys: secured. The floor gap goes hungry today." · hit: "*Plink.* Your keys descend into the underworld between floorboards."

**Dud scrolls** (shown when a Visit reveals nothing; rotate in order, no fragment, no points):

> D1: *The scroll is blank but for a stain; / the fates have nothing to explain. / Eat more fiber, mortal one, / and come again when thou art done.*

> D2: *Thou hast consulted us too soon; / the future's still an empty room. / Patience, pilgrim of the bowl — / the drama needs some time to roll.*

> D3: *This meal was cooked by no one's hand; / machines can't read the promised land. / A vending snack, however sweet, / leaves prophecy incomplete.*
> (D3 is always used when the digested cook is Nobody.)

**Emergency garble rule:** on a forced Emergency visit, the revealed fortune(s) render with `garbleRatio` (40%) of words replaced by `▓▓▓` (seeded selection, never the last word of lines 3–4's rhyme pair — the joke is you can *almost* read it). Options are shown ungarbled. Emergency also applies `emergencyPenalty` (−15).

---

## 7. Rules, win & lose conditions

### Rule summary (the curse, mechanized)
1. Every Visit produces one scroll per matching future event, else one dud.
2. **Window rule:** a Visit at hour *V* (last visit *L*) reveals matching events in `(V, V + (V − L)]`.
3. **Changeable future:** every revealed disaster/opportunity has exactly one correct intervention; performing it before/at its deadline flips the outcome.
4. **Cook rule:** scroll subject = cook of the most recently digested meal (eaten ≥ `digestHours` before the Visit, since the last Visit). No digested meal → dud.
5. **Pain rule:** pain = hours since last Visit. Visiting beyond `painComfortHours` costs `painPenaltyPerHour` × excess hours. Reaching `painEmergencyHours` forces an immediate Emergency (consumes the action you were about to take, garbled scrolls, `emergencyPenalty`).
6. **Wall rule:** each real scroll = +1 fragment, +`fragmentPoints`.

### Day setup (seeded)
- `eventsPerDay` (5) events are drawn from the 14-fortune pool with constraints: **≥2 subject-You events, ≥1 NPC event, ≥1 opportunity, no two events at the same hour** (if a draw collides, redraw; the pool's fixed hours make collisions rare and detectable). Event hours are fixed per the content table.
- Morning newspaper shows only subject counts.

### Scoring
| Outcome | Points |
|---|---|
| Disaster averted | +25 (`avertPoints`) |
| Opportunity seized | +20 (`seizePoints`) |
| Disaster hits | −20 (`hitPenalty`) |
| Wrong intervention chosen | −5 (`wrongActPenalty`), the fortune stays actionable |
| Real scroll fragment | +5 each (`fragmentPoints`) |
| Pain excess (per hour beyond comfort, charged at Visit) | −2 (`painPenaltyPerHour`) |
| Emergency | −15 (`emergencyPenalty`) |
| Unrevealed event fires | 0 or −20 per its kind (ignorance does not protect you) |

### Win / lose
- **Win:** day score ≥ `winScore` (80) at 22:00 → "A GOOD DAY" banner + rank.
- **Lose:** day score < `winScore` → "A DAY BEST FLUSHED" + rank.
- **Ranks:** < 40 *Flushed Hopes* · 40–79 *Regular Citizen* · 80–119 *Gut Oracle* · ≥ 120 *The Prophet of Porcelain*. ⚑ (thresholds overridable; tuned so a perfect 5-event day ≈ 130.)

### Edge cases (all decided)
- **Visit with window 0 or 1 and no matching event:** dud scroll; pain resets; the hour is spent. Legal but wasteful — that is the lesson.
- **Two fortunes revealed in one Visit:** the modal shows them as a stack; player pages through; each grants a fragment.
- **Acting on an already-averted/seized/expired fortune:** the Act list only shows live, unhandled fortunes; expired ones gray out with "The hour has passed."
- **SHOW-UP fortune whose event hour has arrived:** Act at that exact hour = success; the Act action and event resolution share the hour.
- **Emergency at 21:00 (last turn):** it resolves, then the day ends normally.
- **Eating when a meal is already digesting:** allowed if ≥ `minHoursBetweenMeals` since the last meal; the newer meal's cook takes over once digested.
- **Event fires at the same hour the player Visits:** actions resolve first, then events — a Visit cannot reveal an event firing that same hour (the window is exclusive of *V*).
- **Wrong intervention twice on one fortune:** allowed; −5 each time; the correct option remains available until deadline.

---

## 8. Difficulty & progression

Single tuned difficulty for the prototype. Within a round, difficulty emerges from geometry: early events (F14 08:00, F12 09:00) punish sleepy scheduling, clustered lunch hours (11:00–14:00 has meals + 4 possible events) create action scarcity, and evening events (F08 19:00) require either a long painful hold or a late strategic meal.

Across rounds: none in P0 — score-attack replay with new seeds. The persistent Wall (localStorage) provides gentle long-term pull.

Config knobs that double as difficulty dials (see §12): `eventsPerDay`, `painComfortHours`, `painEmergencyHours`, `winScore`, `digestHours`.

P2 only: a 3-day "week" with escalating `eventsPerDay` (5→6→7) and one scripted wall-picture story beat.

---

## 9. Style & theme

- **Visual style:** flat vector, thick 3 px ink outlines, rounded corners, paper textures suggested with flat color only (no image assets). The whole game is DOM/CSS cards on a desk-blotter background. Scrolls use a serif italic on parchment; the "embroidery" is a CSS dashed border in thread red.
- **Palette (6 colors):**
  - Parchment `#F4E8C9` (scroll/card background)
  - Ink brown `#4A3728` (text, outlines)
  - Blotter green `#2E5E4E` (page background)
  - Thread red `#C0504D` (embroidery borders, disaster accents)
  - Prophecy gold `#D9A441` (highlights, fragments, win banner)
  - Porcelain white `#F7F4EF` (UI buttons, meters)
  - NPC accents reuse: Gary `#4A6FA5`, Mom `#8E6FA5`, Raul `#D97E41` (tints of the palette, used only for wax seals).
- **Typography:** headings & rhymes — `Georgia, 'Times New Roman', serif` italic; UI — `system-ui, sans-serif`. No webfonts (zero-asset rule).
- **Tone/mood:** solemn faux-medieval prophecy voice colliding with sitcom mundanity. Monty Python reverence, never gross-out; the bathroom is always a closed door, a twinkle, and a euphemism ("Commune with the Scrolls").
- **References:** *Reigns* (one-decision-at-a-time card cadence), *Untitled Goose Game* (cheeky to-do-list comedy), Oregon Trail status panels (dry event prose).
- **Placeholder plan (M0–M1):** everything is rectangles, emoji, and system fonts exactly as specced in §6 "P0 look" columns. No drawn art before M2.

---

## 10. Sound design

**Implementation:** Web Audio API with code-synthesized SFX (jsfxr-style parameter blips) — zero audio asset files. No Howler (overkill for 8 sounds). All audio initializes on the first user gesture (the splash Play click). **Mute toggle is P0**, persisted to `localStorage` (`ps_mute`).

| Game event | Sound description | Priority |
|---|---|---|
| Button/option click | short soft tick (square, 30 ms) | P0 |
| Hour advance | low woodblock tock | P0 |
| Visit → scroll reveal | door *clunk* + rising harp gliss + twinkle (the flush is a tasteful "whoosh-sparkle", no liquid) | P0 |
| Disaster averted | bright major ding-arpeggio | P0 |
| Disaster hits | two-note sad trombone (saw, pitch bend down) | P0 |
| Dud scroll | deflating "pfff" (noise burst, low-pass sweep) | P0 |
| Emergency triggered | alarm blip ×3 + the scroll reveal, pitched down | P0 |
| Day summary | win: short fanfare / lose: single low gong | P1 |
| Fragment added to Wall | tiny glass *clink* | P1 |
| Pain tier change | subtle low pulse | P1 |

**Music:** none in P0/P1. P2: a 4-bar generative lute-ish loop (Web Audio oscillators, pentatonic, 70 BPM), volume 20%.

---

## 11. UI & screens

**Flow:** `Splash → Day screen ⇄ (Scroll modal, Act modal, Meal modal, Wall screen, Pause) → Summary → (Restart | New Day → Day screen)`

### Splash screen (mandatory, P0)
- Title "POOPER SCROLLS" in serif caps on parchment + one-liner: *"Hold it in. See the future. Fix it."*
- Rules in 5 bullets: **(1)** Each hour, take one action. **(2)** Eat someone's cooking to tune the prophecy to *them*. **(3)** The longer since your last bathroom visit, the further ahead the scroll sees — but the pain builds. **(4)** Rhymes foretell events; pick the right intervention before it's too late. **(5)** Score 80+ by 22:00 to win the day.
- Controls line: "Mouse/tap everything · 1-4 actions · M mute · Esc pause · R restart".
- Version number bottom-right (e.g. `v0.1.0`) from the single `VERSION` constant.
- One big gold **"BEGIN THE DAY"** button.

### Day screen (main, P0)
- **Top HUD (always visible):** clock (large, "11:00"), score, pain meter + face, fragment count 📜×n, prophecy-reach bracket on the timeline, mute + pause buttons.
- **Timeline strip:** 16 slots, pinned scroll icons, meal icons on their available hours, reach bracket.
- **Center panel:** current-hour vignette text (one dry sentence) + resolved-event banners.
- **Bottom action bar:** four large buttons — EAT 🍽 / VISIT THE THRONE 🚪 / ACT ⚡ / WAIT ⏭ — each disabled with a tooltip when illegal (e.g. EAT grayed: "nothing available / too full").

### Modals (P0)
- **Meal picker:** cards for this hour's meals, each showing cook portrait + "tunes prophecy to: Gary".
- **Scroll reveal:** parchment card(s), rhyme in serif italic, subject wax seal, "Pin to timeline" confirm.
- **Act:** list of live fortunes → picking one shows its 3 option cards (A/B/C) → confirm → result line.
- **Pause:** Resume / Restart day / Mute / Back to splash.

### Wall of Prophecy screen (P0 minimal)
6×5 tile grid, revealed tiles show picture portions, counter "12/30 fragments". Back button.

### Summary screen (P0)
Result banner (A GOOD DAY / A DAY BEST FLUSHED), rank title, tally table (averted / hit / seized / missed / fragments / pain / emergency), the day's fortunes listed with outcomes, buttons: **Restart (same seed)** / **New Day** / **Wall**. Version number in the corner.

### Debug overlay (`?debug=1`)
Fixed corner panel: current state JSON (hour, pain, cook, seed), full event schedule with hours and correct answers, FPS, cheat keys: `]` +1 hour, `p` pain to max, `f` +5 fragments, `$` +50 score.

---

## 12. Config & tuning

Single exported object `CONFIG` in `src/config.js`; every value below lives there and nowhere else.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | "0.1.0" | string | splash + debug overlay version display |
| `dayStartHour` | 6 | hour | first turn |
| `dayEndHour` | 22 | hour | day end (exclusive; last playable hour 21:00) |
| `eventsPerDay` | 5 | count | events drawn from pool per day |
| `minYouEvents` | 2 | count | draw constraint |
| `minNpcEvents` | 1 | count | draw constraint |
| `minOpportunities` | 1 | count | draw constraint |
| `digestHours` | 2 | hours | meal → readable delay |
| `minHoursBetweenMeals` | 2 | hours | eat action cooldown |
| `painComfortHours` | 4 | hours | pain turns amber; penalties start beyond this |
| `painPenaltyPerHour` | 2 | points | cost per excess hour, charged at Visit |
| `painEmergencyHours` | 9 | hours | forced Emergency threshold |
| `emergencyPenalty` | 15 | points | flat Emergency cost |
| `garbleRatio` | 0.4 | fraction | words hidden on Emergency scrolls |
| `avertPoints` | 25 | points | disaster averted |
| `seizePoints` | 20 | points | opportunity seized |
| `hitPenalty` | 20 | points | disaster hits (subtracted) |
| `wrongActPenalty` | 5 | points | wrong option (subtracted) |
| `fragmentPoints` | 5 | points | per real scroll |
| `winScore` | 80 | points | win threshold |
| `rankThresholds` | [40, 80, 120] | points | rank tier boundaries |
| `wallCols` / `wallRows` | 6 / 5 | tiles | wall grid size |
| `vignetteMs` | 900 | ms | event banner display time |
| `sfxVolume` | 0.5 | 0–1 | master SFX gain |

**URL flags (all P0 except noted):**
- `?seed=STRING` — seeds the day's event draw and all randomness (mulberry32 over a string hash). Same seed = identical day.
- `?debug=1` — debug overlay + cheat keys.
- `?skip=1` — bypass splash straight into the day.
- `?events=F01,F09,F06,F10,F04` — force an exact event set (playtest specific fortunes). (P1)
- `?fast=1` — set `vignetteMs` to 0 for rapid testing. (P1)

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + semantic HTML/DOM + CSS. Zero-build: a single `index.html` loading `src/*.js` modules directly — deploy by copying the folder.** This game is cards, buttons, meters, and text; there is not one moving sprite, so Canvas/Pixi/Matter would be pure overhead, while DOM gives free layout, accessibility, text rendering for rhymes, and trivially working touch. CSS transitions handle all juice (scroll unfurl, meter fill, banner slide) within a 60 fps budget that DOM meets effortlessly at this element count (< 200 nodes; no per-frame loop at all — the game only re-renders on player action). Audio is raw Web Audio (8 synthesized blips; no library). Randomness is a seeded mulberry32 PRNG in `src/rng.js`. No network calls, no assets, no dependencies, no build step. State persistence (`wall fragments`, `mute`) via `localStorage` with versioned keys.

Perf budget: ≤ 200 DOM nodes live, ≤ 20 CSS transitions per interaction, zero requestAnimationFrame loops outside optional debug FPS counter.

---

## 14. Milestones

### M0 — Toy loop (prove the tension)
**Goal:** the hold-vs-go decision playable end-to-end with unstyled buttons and plain text. No art, no sound, no splash.
**Deliverables:** turn engine (16 hours, 4 actions), seeded event draw, meals/digestion, window math, pain + emergency, plain-text fortunes with A/B/C picks, score printout at day end.
**Acceptance criteria:**
- [ ] A full day is playable start→summary in under 6 minutes with only clicks.
- [ ] Visiting after 6 hours reveals an event 5 hours ahead; visiting after 1 hour yields a dud — verified with `?seed=test1`.
- [ ] Eating Gary's leftovers then visiting ≥2 h later reveals Gary's event (and never Mom's).
- [ ] Reaching 9 h pain forces the Emergency and its penalty.
- [ ] The sim module runs headless: a Node script plays 100 seeded random-policy days without touching the DOM and reports score distribution.
**Proves:** whether hold-longer-see-further is a real decision. *If this isn't tense/funny in plain text, stop.*

### M1 — Real rules
**Goal:** full P0 ruleset and framing.
**Deliverables:** all 14 fortunes + 3 duds as data, draw constraints, PREP/SHOW-UP timing, wrong-answer retry, garble renderer, splash (rules, controls, version), HUD, timeline pins, summary screen with rank, restart/new-day, pause, mute.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds unprompted (splash alone suffices).
- [ ] Every fortune's correct option is verifiably derivable from its rhyme by a fresh reader (informal 2-person check, ≥ 80% correct).
- [ ] Same `?seed=` reproduces identical day, events, and dud order.
- [ ] All §7 edge cases behave as written (unit tests on the headless sim).
**Proves:** the rules read clearly and the rhyme-decoding is fair.

### M2 — Feel
**Goal:** tone lands.
**Deliverables:** §9 palette and card styling, scroll-unfurl and banner CSS transitions, pain-face swaps, all P0 SFX synthesized, Wall screen with reveal tiles, vignette text pass.
**Acceptance criteria:**
- [ ] Scroll reveal earns a smile from at least 3 of 5 playtesters (tone check: laugh, not cringe).
- [ ] Muted-by-default until first gesture; mute persists across reloads.
- [ ] Game remains fully playable and legible at 375 px width (touch pass).
**Proves:** the comedy framing amplifies rather than carries the loop.

### M3 — Playtest build
**Goal:** shippable to strangers.
**Deliverables:** `?debug=1`, `?events=`, `?fast=1`, localStorage wall persistence, deployed to static host (drop folder into `public/games/pooper-scrolls/`), P1 features if time (summary fortune recap polish, D3 vending gag tooltip, fragment clink SFX).
**Acceptance criteria:**
- [ ] Deployed URL loads and plays with zero console errors on Chrome + Firefox.
- [ ] A reported bug can be reproduced from its seed alone.
- [ ] Five playtest sessions logged against §2 questions.
**Proves:** ready to answer the fun hypothesis with real players.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is 5 events/day the right density? Knob: `eventsPerDay`.
2. **(non-blocking — resolve in playtest)** Is deterministic Emergency at 9 h better than a rising random risk from 7 h? Deterministic shipped ⚑; if holds feel too safe, add `emergencyRandomFrom` knob later.
3. **(non-blocking — resolve in playtest)** Does the newspaper subject-count hint give away too much or too little? Knob: hide it via `?nohints=1` (add flag in M3 if contested).
4. **(non-blocking — resolve in playtest)** Should wrong interventions lock the fortune (higher stakes) instead of −5 retry? Knob: `wrongActLocks` (bool, default false).
5. **(non-blocking)** Wall picture content/payoff is a placeholder gag; decide the real reveal only if the loop proves fun.
6. **(blocking for P2 only, not for prototype)** Multi-day narrative structure — explicitly out of scope until the hypothesis is answered.

---

## 16. Handoff notes for Fable

**Build order:** `rng.js` → `config.js` → `fortunes.js` (data from §6.9, verbatim) → `sim.js` (pure state machine: `newDay(seed)`, `legalActions(state)`, `applyAction(state, action) → {state', effects[]}`) → headless test script → `render.js` (DOM from state) → `input.js` (buttons/keys) → `screens.js` (splash/summary/wall/pause) → `audio.js` last.

**Keep headless-testable:** `sim.js` and `fortunes.js` must not touch `document`, `window`, or audio. All randomness flows through the injected seeded RNG. The M0 acceptance script (`test/autoplay.mjs`, run with plain `node`) asserts: window math, cook attribution, digestion timing, emergency trigger, score arithmetic, and that every seeded day satisfies the draw constraints.

**Repo / deploy layout (zero-build; the folder IS the dist):**
```
public/games/pooper-scrolls/
  index.html        (loads src/main.js as module; contains splash markup)
  design.md         (this file)
  src/
    main.js  config.js  rng.js  fortunes.js  sim.js
    render.js  input.js  screens.js  audio.js
    style.css
  test/
    autoplay.mjs    (node-only, not loaded by index.html)
```
Deploying = the folder already sits in the static site's `public/`; no step needed beyond the site's normal publish.

**Reminders:**
- Prove the loop with plain text and unstyled buttons (M0) before touching the palette. If holding it in isn't a fun decision in ugly form, art will not save it.
- Ship every milestone runnable; never leave `index.html` broken at a commit.
- The fortune rhymes are content, not placeholders — implement §6.9 exactly; the correct-option keying against rhyme wording is the fairness contract of the whole game.
- Tone guardrail: no depicted poop, ever. Door, twinkle, euphemism. If a joke needs to be gross to land, cut the joke.
