> Source idea: [Game Idea 27 - Regrets (Theme: Trashy Horror)](/game-idea-27-regrets-theme-trashy-horror)

# 1. Title & one-liner

**Working title: THE OLDEST WOUND**

Alternates: *Regrets*, *Round Again*, *Wake Backwards*, *Ring Finger*, *Sleep Takes You Back*.

**One sentence:** A pulpy horror narrative puzzle where every night throws you further back into your own past, and the scars your future body already carries *must* happen — you only get to choose how.

**Genre:** Narrative puzzle / interactive fiction with a hard rule system (fate-constrained choice game). Single player, browser, mouse-driven.

**Adaptation note (required by MODE NOTE):** The source is a horror *story* premise; I adapted it into a scene-based fated-choice puzzle game where the story's central rule — "wounds on your future body are caused by your own past actions, and fate cannot be dodged" — *is* the game mechanic: each scene lists the marks that are due, dodge-attempts are visibly blocked by fate at a cost, and the player's real agency is choosing the manner of each fated wound and what unfated good they smuggle in alongside it. ⚑ (overridable)

**Elevator pitch:** You wake up six days in the past with a body that isn't quite yours: a split eyebrow, a crooked nose, a cheap tattoo that says SORRY, a burn down your right arm, and a missing ring finger. Every time you sleep you fall further back — to the breakup, the bar fight, the kitchen fire — and you learn the awful rule: everything already written on your body WILL happen tonight. You cannot stop the wound. Fate blocks every exit, and it always was blocked. But you can choose to walk into it with your eyes open instead of being dragged, and you can plant small unfated kindnesses — the dog, the photograph, the word on your wrist — that echo forward and rewrite the future you remember. Keep your Grip together long enough to reach the oldest wound of all: an eight-year-old boy, a dead grandfather's ring, and a wish. The wish gets made. The ring takes the finger. The only thing you have ever owned is the words.

# 2. Fun hypothesis

**The single question this prototype answers:** *Is it fun (dreadful-fun) to make choices inside a scene where the outcome is fixed — where the game visibly blocks every escape attempt — and the pleasure comes from choosing the manner of your doom and smuggling in side-effects?*

Everything in P0 serves this: the marks ledger (you see your doom up front), fate-blocked choices (the game says no, and it costs you), the Clean/Rough/Correction fulfillment grades (how well you face it), and echoes (the unfated things you control).

**Playtest questions (ask after one full run):**
1. When a choice was fate-blocked ("the elevator is out of order — it always was"), did that feel delicious or cheap? Did you try to dodge more than once on purpose?
2. Did you understand, without being told, that the marks on the body map were promises about what must happen tonight?
3. Did choosing *how* the wound happened (Clean vs. Rough vs. refusing and being Corrected) feel like real agency?
4. Did any echo (the dog, the tattoo dedication, the photo box) land emotionally when it rewrote your journal?
5. At the final wish, did you understand why your Grip determined which words you were allowed to say? Which ending did you get, and did you immediately want to replay for a different one?

# 3. Design pillars

1. **Fate is a wall you can touch.** Every scene shows its due marks up front; every dodge attempt gets a written, diegetic block ("the knob spins loose in your fingers — it was always broken") and a Grip cost. The game never silently railroads; it railroads *out loud*. Any feature that hides the rails gets cut.
2. **Agency lives in the manner, not the outcome.** Each fated mark has at least three fulfillment paths (Clean / Rough / Correction). Each scene has at least one purely unfated choice (an echo) the player fully owns.
3. **The body is the save file.** The body map and journal are the persistent UI truth: marks, grades, echoes. The player should be able to reconstruct their whole run by looking at their own body.
4. **Trashy horror, played straight.** Dive bars, stick-and-poke tattoos, grease fires, mean parents, a cursed ring from the attic trash. Lurid VHS pulp on the surface, sincere dread underneath. No irony winks in the text.

# 4. Core game loop

Session target: **one full run = 8–10 minutes** (5 scenes at ~90–110 seconds each plus interstitials and ending). Replays with `?fast=1` run ~5 minutes. ⚑ (overridable — at the upper edge of the 2–10 min prototype window; each individual scene is a 2-minute self-contained round, and `?scene=` lets playtesters jump straight to any scene.)

Named phases, per scene ("night"):

- **WAKE** — Player sees the scene header (place, date, your age), the body map updates (marks that haven't happened yet flip to DUE or vanish if you're now before them), and the **Ledger** lists tonight's due marks. Player feels: dread with a checklist.
- **ACT** — Player reads short pulpy passages and clicks choices. Three choice species: **free** (unfated — echoes, flavor), **fate-blocked** (dodge attempts: fate rebuffs them in prose, −`COST_FATE_BLOCK` Grip, choice is consumed), and **fulfillment** (causes a due mark at Clean/Rough/Correction grade with corresponding Grip cost). Player feels: bargaining, then resolve.
- **AUDIT** — Scene end. Any due mark still unfulfilled auto-fires its Correction (worst version, −`COST_CORRECTION` Grip). Journal writes the night's entry; echoes rewrite earlier (future-time) journal entries visibly, marked with a ✦. Player feels: consequence made legible.
- **FALL** — Interstitial. Choose **Sleep now** or **Stay awake** (costs `COST_STAY_AWAKE` Grip, grants next scene's hint — how to fulfill cheaply). Then the backwards fall: years peel off, next scene begins. Player feels: the floor giving way.

```
        +--------+     +-------+     +--------+     +-------+
   ---> |  WAKE  | --> |  ACT  | --> | AUDIT  | --> | FALL  | ---+
        +--------+     +-------+     +--------+     +-------+    |
             ^                                                   |
             |  (further back in time; scene N+1 = years earlier)|
             +---------------------------------------------------+
                                    ...until Scene 5 (age 8): THE WISH --> ENDING
```

The run is 5 scenes: S0 tutorial (six days back) → S1 breakup (2023) → S2 bar night (2014) → S3 kitchen fire (2005) → S4 the attic (1998, age 8, origin) → one of three endings.

# 5. Inputs & controls

Touch-viable: **yes** — the entire game is tap-a-button; it degrades to touch with zero design changes.

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Left click on a choice | Tap choice | Select choice |
| `1`–`9` | — | Select the Nth visible choice |
| Left click / `Space` / `Enter` | Tap anywhere on passage | Skip typewriter reveal; advance a no-choice passage |
| `B` or click BODY tab | Tap BODY tab | Toggle body map panel |
| `J` or click JOURNAL tab | Tap JOURNAL tab | Toggle journal panel |
| `M` or click 🔇 icon | Tap 🔇 icon | Mute/unmute all audio (persisted in `localStorage`) |
| `R` or click RESTART (splash/ending/pause) | Tap RESTART | Restart run (confirm dialog mid-run) |
| `Esc` or click ⏸ | Tap ⏸ | Pause overlay (resume / restart / mute) |

No other inputs exist. There is no cursor-key movement, no drag, no hover-required information (tooltips duplicate into the body map panel for touch).

# 6. Game elements

All visuals in M0–M1 are placeholder DOM boxes/text per the plans below; M2 styling per section 9.

**The Sleeper (player character, "you")** — Never drawn as a sprite; the player IS the second-person prose plus the body map. Config: none. Interacts with everything via choices.

**Body Map** — Side panel: a simple front-facing human silhouette (placeholder: 5 labeled rectangles — head, torso, L arm, R arm, L hand; final: a single inline SVG outline). Each mark renders as a colored pin: red = DUE this scene, bone-white = already fulfilled (with grade letter C/R/X), grey = future (not yet due), absent = you are now before it existed. Clicking a pin shows its journal text. In S4 the map is startling: every pin except the finger is gone.

**Marks (the fated wounds)** — the spine of the game. Five in P0:

| ID | Mark | Body slot | Origin scene | Ledger line shown when due |
|---|---|---|---|---|
| M2 | Split eyebrow scar | Head | S1 (2023) | "The brow opens tonight." |
| M3 | Crooked nose | Head | S2 (2014) | "The nose breaks tonight." |
| M4 | Stick-and-poke tattoo: SORRY | L arm (wrist) | S2 (2014) | "The wrist says SORRY by morning." |
| M5 | Burn scar, right forearm | R arm | S3 (2005) | "Something burns tonight. You hold it." |
| M1 | Missing left ring finger | L hand | S4 (1998) | "The ring goes on. The wish gets made." |

Each mark has a **fulfillment matrix** (authored per scene in section 7.1): Clean (0 Grip — you face it with knowledge and intent), Rough (−`COST_ROUGH` — it happens in the scramble), Correction (−`COST_CORRECTION` — you refused, fate does it worse, and it kills any echo attached to that beat). Config keys: `COST_ROUGH`, `COST_CORRECTION`.

**Grip (the resource)** — A meter of composure/selfhood, 0–`GRIP_MAX`, starts at `GRIP_START`. Placeholder: a row of ▮ blocks; final: a strip of film frames that burn away. Spent by fate-blocks, Rough/Correction fulfillments, staying awake; gained by echoes (+`GAIN_ECHO`, capped at `GRIP_MAX`) and exactly one calm-beat in S4 (+`GAIN_CALM_BEAT`). At Grip 0 at any moment: immediate cut to the Hollow ending sequence (fate autopilots the remaining nights in a fast-forward passage). Grip gates the final wish (section 7.2). Config: `GRIP_START`, `GRIP_MAX`, `GAIN_ECHO`, `GAIN_CALM_BEAT`, `COST_FATE_BLOCK`, `COST_STAY_AWAKE`, `ENDING_DEFIANCE_MIN_GRIP`, `ENDING_HOLLOW_MAX_GRIP`, `HEARTBEAT_GRIP_THRESHOLD`.

**The Ledger** — HUD strip at the top of every scene: tonight's due marks as red chips. A chip flips to its grade letter (C/R/X) the moment its mark is fulfilled. This is the "what must I do" affordance and is always visible.

**Fate-blocked choices** — Choices rendered with a faint red underline (colorblind-safe: also prefixed with a ✕ after first block in the run). Picking one plays the block prose ("The payphone line is dead. It was always dead."), costs `COST_FATE_BLOCK` Grip, removes that choice, and returns to the same node. They exist so the player can *touch the wall* — pillar 1. Every scene has at least one.

**Echoes (unfated choices)** — Four in P0: E1 the dog (S1), E3 the tattoo dedication (S2), E2 saving Deke (S2, granted by the Clean nose), E4 the photo box (S3, granted by the Clean burn). Each echo: +`GAIN_ECHO` Grip immediately, and visibly rewrites one or more *earlier-played* (future-time) journal entries with a ✦ line — because in a fated universe your past act was always part of the future you remember. Echoes are enumerated in the ending epilogue.

**The Journal** — Auto-written log, one entry per scene plus rewrites. Placeholder: monospace text list. This is where echoes become visible and where players reconstruct the run.

**Interstitials (The Fall)** — Full-screen passage between scenes with the Sleep-now / Stay-awake choice, then a years-counting-down animation (placeholder: the date text rapidly decrementing). Stay-awake grants the next scene's **hint** line (tells the player which fulfillment is Clean) at −`COST_STAY_AWAKE` Grip.

**NPCs** — All prose-only, no sprites: **Rachel** (girlfriend, S1), **Biscuit** (her dog, S1), **Deke** (best friend, S2), **Woz** (creditor, S2), **Tammy** (van tattooist, S2), **Mom & Dad** (S3, S4 — Dad's heavy hands are foreshadowed in S3 and land in S4), **Grandpa Abel** (dead; present as a photograph and a ring). NPCs have no simulation; they are choice-tree furniture with consistent names.

**The Ring** — S4's object. Behaves as the ultimate fate-block: it cannot be left, thrown, or hidden; two dodge attempts are blocked, after which putting it on is the only remaining choice.

# 7. Rules, win & lose conditions

**Core rules:**
1. A scene's due marks MUST be fulfilled before the scene can end. The choice trees structurally force the player through each mark's fulfillment node; as a safety net, if a scene-end is ever reached with an unfulfilled due mark, the AUDIT phase auto-plays that mark's Correction passage and applies −`COST_CORRECTION`.
2. Each mark is fulfilled exactly once; after fulfillment its alternative fulfillment choices are removed from play.
3. Fate-blocked choices never change scene state except: −`COST_FATE_BLOCK` Grip, block prose, choice consumed.
4. Grip is clamped to [0, `GRIP_MAX`]. The instant Grip reaches 0, the current passage finishes, then the Hollow cut plays: a single fast-forward passage summarizing the remaining nights in fate's voice, then Ending C. No further choices.
5. Echo Grip gains apply immediately; journal rewrites render the next time the journal is opened and are flagged ✦ in the HUD tab until read.
6. Simultaneity: impossible by construction — the game is strictly node-sequential, one choice at a time. If the player clicks during typewriter reveal, the text completes instantly; the click does not also select a choice (two-step: first click reveals, second click selects).
7. Mid-run restart resets everything except `localStorage` mute preference and the "endings seen" record.

**Win condition:** Reach the end of S4 and speak a wish — Endings A or B. "Winning well" = Ending A (Defiance), which requires Grip ≥ `ENDING_DEFIANCE_MIN_GRIP` at the final node. There is no score; the ending screen shows the run summary (per-mark grades, echoes found, final Grip, time) which acts as the score surrogate.

**Lose condition:** Grip 0 at any point → Ending C (Hollow). This is a real ending with its own text, not a game-over screen — the run summary still shows.

**Round end:** Ending screen → RESTART returns to splash with "endings seen" stamps (A/B/C) shown as small icons.

## 7.1 P0 scenario content — scenes, marks, and choice trees (complete)

Authoring notes for the implementer: passages below are the actual display text (trim only for typos). Node IDs are stable keys. `→` = next node. Choice species: **[FREE]**, **[FATE ✕]** (blocked, −`COST_FATE_BLOCK`, consumed, stay on node), **[CLEAN/ROUGH/CORRECTION mark]** (fulfillment + grip effect), **[ECHO id]** (+`GAIN_ECHO`, sets flag, queues journal rewrites). Second person throughout. Protagonist name (used by NPCs): **Cole**. ⚑ (overridable — name, dates, and all prose are decided content, editable freely without touching systems.)

---

### SCENE S0 — "The Wrong Morning" — six days ago (Oct 2026, age 36). Due marks: none (tutorial).

**s0_wake** — *You wake on a couch you don't own, in an apartment that smells like someone else's cigarettes. Your phone says Tuesday. It was Monday when you closed your eyes — Monday of NEXT week. Something is wrong with your hands.*
- Look at your hands. → s0_hand
- Find a mirror. → s0_mirror

**s0_hand** — *Your left ring finger is gone. Not bandaged. Gone — healed over, decades-old smooth, like it was never there. You have had that finger your whole life. You had it last night.* (Body map panel unlocks and slides open; M1 pin appears, grey, labeled UNEXPLAINED.)
- Find a mirror. → s0_mirror

**s0_mirror** — *The bathroom mirror gives you back a stranger wearing your face: a white seam through the left eyebrow, a nose that's been broken and set crooked, a shiny burn crawling up the right forearm. On the left wrist, in jailhouse blue, one word: SORRY.* (Marks M2–M5 appear on body map, grey, UNEXPLAINED.)
- Search yourself online. → s0_phone

**s0_phone** — *You search your own name. You're there — but thinner. Fewer photos. The job history stops early. On the fridge there are photos of a dog you've never met, wearing a birthday hat.* [If the run is a replay this line is identical — it will matter.] *Your eyes are so heavy. You've never been this tired in your life.*
- [FREE] Fight it. Splash water. Coffee. Anything. → s0_fight
- Lie down. → s0_sleep

**s0_fight** — *You fight it for nine minutes. The tiredness isn't tiredness — it's a tide, and you are small, and it is not. TUTORIAL LINE (styled as system text): Sleep always wins. Later, staying awake will buy you knowledge — and it will cost you.* → s0_sleep

**s0_sleep** — *You go under like a stone. And you fall — not down. Back.* → Interstitial I1 (forced sleep, no choice, the date spins backwards: 2026… 2025… 2024… 2023).

---

### SCENE S1 — "The Breakup" — March 2023 (age 33). Due marks: **M2 (brow)**. NPCs: Rachel, Biscuit.

Fulfillment matrix M2: CLEAN = take the loose stair knowingly at s1_stairs (0). ROUGH = rush the stairs (−`COST_ROUGH`). CORRECTION = refuse at s1_stairs (−`COST_CORRECTION`, kills echo E1 retroactively if taken — Rachel keeps the door shut afterward).

**s1_entry** — *Rachel's kitchen. There's a cardboard box on the counter with your handwriting on it. You remember this night from the other side of it — this is the night you two end. In your future there is no Rachel. The Ledger burns red at the top of your vision: THE BROW OPENS TONIGHT. She's looking at you, waiting for you to say the thing you came to say.*
- [FATE ✕] Tell her you love her. Fix it. — *You open your mouth to fix it and what comes out is her name, wrong, like a word you're reading backwards. She flinches. Fate holds your tongue like a parent holds a wrist.*
- [FREE, flag BREAKUP_KIND] Say it kind: "It's over, Rachel. And it's my fault." → s1_kind
- [FREE, flag BREAKUP_CRUEL] Say it cruel. Fast. Get out of this night. → s1_cruel

**s1_kind** — *She doesn't yell. That's worse. She asks why now, why like this, and her voice is very small.*
- [FREE, flag TOLD_RACHEL] Tell her the truth: you fall backwards when you sleep, and everything is already decided. — → s1_truth
- [FREE, flag GENTLE_LIE] Lie gently: "You deserve better than what I become." → s1_dog

**s1_truth** — *You tell her all of it. The falling. The finger. The scars that haven't happened yet. She listens the way people listen to the sick — kind, and from a distance — and says maybe you should stay somewhere tonight where someone can watch you. You are somehow both telling the truth and losing her harder.* → s1_dog

**s1_cruel** — *You say the short ugly version. The wine glass leaves her hand before she knows she's thrown it — and misses, a foot wide, exploding against the cabinet. You flinch anyway. Not yet, says the Ledger. Not like that. The scar keeps its appointment.* → s1_dog

**s1_dog** — *Biscuit watches from the couch, tail giving one hopeful thump. Technically he's yours. You bought him. In your future there are photos of him on a fridge, wearing a birthday hat, and until this second you didn't know whose fridge.*
- [ECHO E1, flag DOG_STAYS] Leave Biscuit with her. Kneel down, say goodbye properly. — *(+Grip. Journal ✦ rewrite queued for S0: "The dog on the fridge. Biscuit. He got his birthday. You did that.")* → s1_stairs
- [FREE, flag DOG_COMES] Take him. You need one living thing on your side. — *(No echo. S0 journal rewrite: "The fridge in that apartment was bare.")* → s1_stairs

**s1_stairs** — *The stairwell light is dead. You're carrying the box. You know this stairwell — and you know, the way you know your own body, that the third step from the bottom is loose, and that the brow opens tonight. The Ledger leans close.*
- [FATE ✕] Take the elevator. — *Out of order. The sign is yellowed, older than tonight. It was always going to be out of order.*
- [CLEAN M2] Take the loose step on purpose — lean into the rail so it's the brow that pays, and nothing else. — *You step onto it like stepping onto a scale. The world tips, the rail comes up to meet you, and the cut is clean and exactly where the scar always said it would be. You sit on the bottom step and laugh once, horribly. You chose it. It still happened. Both things are true.* → s1_out
- [ROUGH M2] Rush down. Get out of this night. — *(−Grip.) The step rolls, the box goes, and the dark swings a rail at your face. You bleed on somebody else's mail.* → s1_out
- [CORRECTION M2] Sit down on the landing and refuse to bleed tonight. — *(−−−Grip.) You sit. You fold your arms. Upstairs, a door opens — Rachel, carrying the broken glass to the chute, not seeing you in the dark. The box you left on the landing catches her foot. You catch her. The glass catches you. She looks at the blood and the box and her face closes like a door, forever. (Kills echo E1 if taken: she doesn't keep the dog of the man who lurked on her stairs.)* → s1_out

**s1_out** — *Street. Cold. You look up at her window and yell at yourself — the you that lives here, the you that's asleep somewhere inside tonight — "DON'T DO THE STAIRS! DON'T—" and stop, touching your eyebrow, because you already did. You always already did.* → Interstitial I2.

---

### INTERSTITIALS (I2 after S1, I3 after S2, I4 after S3)

Template passage: *The tiredness comes in like a tide. You know what sleep costs now.*
- Sleep now. → next scene.
- Stay awake as long as you can. (−`COST_STAY_AWAKE` Grip) — *You buy hours with pieces of yourself, and in the gray of it, you understand something:* + the hint line, then forced sleep with a nastier fall passage: *When sleep takes you, it takes you like a punishment.*

Hints: **I2 →** "Two debts come due in one night. Lead with your face for the first, and choose the needle's words yourself for the second." **I3 →** "The pan, not the water. Never the water. Whatever burns — carry it out, and hold on." **I4 →** "The ring goes on. The wish gets made. The only thing you have ever owned is the words."

---

### SCENE S2 — "The Bar" — August 2014 (age 24). Due marks: **M3 (nose)**, **M4 (tattoo)**. NPCs: Deke, Woz, Tammy.

Fulfillment matrices — M3: CLEAN = take the punch for Deke (0, grants echo E2). ROUGH = throw first (−`COST_ROUGH`). CORRECTION = back off (−`COST_CORRECTION`, kills E2 — Deke gets stomped). M4: CLEAN = sit for the tattoo and choose the dedication (0, includes echo E3). ROUGH = let drunk Deke steer it (−`COST_ROUGH`, no dedication choice).

**s2_entry** — *The Spot. 2014. The beer is cold and costs two dollars and the bathroom door says GENTS in someone's blood, probably. Deke — alive, young, stupid, your best friend — is grinning at you like the last twelve years never happened, because they haven't. He owes a man named Woz four hundred dollars, and Woz just walked in. The Ledger lights up twice: THE NOSE BREAKS TONIGHT. THE WRIST SAYS SORRY BY MORNING.*
- [FATE ✕] Get Deke and leave. Right now. — *You get one hand on Deke's collar and the jukebox kicks on and Deke lights up — "MY SONG!" — and he's gone, into the crowd, toward the pool table, toward Woz. There was never a version where you left.*
- [FREE] Stay close to Deke. → s2_pool
- [FREE, flag DUTCH_COURAGE] Order a double and watch the room. → s2_pool

**s2_pool** — *It goes the way these things go: quiet words, then louder ones, then Woz has a pool cue held low and Deke's back is against the felt and everybody's pretending not to watch.*
- [FATE ✕] Call the cops from the payphone. — *The line is dead. Under the coin slot someone has scratched OUT OF ORDER SINCE FOREVER. They're right.*
- [CLEAN M3, flag SAVED_DEKE, grants ECHO E2] Step between them and take the punch that's meant for Deke. — *(+Grip from E2.) You step in with your hands open and your chin up, and you watch Woz's fist arrive like a train you have a ticket for. White light. The floor. Copper in your throat. But Woz backs off — no fun hitting a man who says thank you — and Deke is hauling you up, saying your name over and over like a prayer. (Journal ✦ rewrites: S0 gains "The missed calls on that strange phone — Deke. Every October. He never stopped calling.")* → s2_alley
- [ROUGH M3] Throw the first punch. — *(−Grip.) You get one good one in, which is one more than you get after that. The nose goes early. A rib complains for the rest of the night. The bouncer files you both out the fire door like paperwork.* → s2_alley
- [CORRECTION M3] Back off. Let it play out. It's not your debt. — *(−−−Grip. Kills E2.) You step back. Fate doesn't. The brawl blooms without you, the bouncer wades in swinging, and the crowd surges — and your face meets the pool table's rail on the way down, cheap and meaningless, nobody's hero. Through the legs of strangers you watch Woz put the boots to Deke, and you did not even get your wound for a reason.* → s2_alley

**s2_alley** — *Behind The Spot, Deke's cousin Tammy runs a stick-and-poke kit out of a van with a sunset airbrushed on the side. Deke, holding a bar towel of ice to whichever of you is bleeding worse, announces that tonight is a NIGHT, and nights get commemorated. Your left wrist itches where, thirty years from now, it says SORRY.*
- [FATE ✕] Keep your sleeves down and walk home. — *You walk. The van is at the end of the block. You turn twice and it's ahead of you both times, sunset glowing under the streetlight. Your feet take you to the van. They always did.*
- [CLEAN M4] Sit down in the van. If the word is coming, you choose who it's for. → s2_ink
- [ROUGH M4] Let Deke pick. Drink through it. — *(−Grip.) You surface twice: once when the needle starts, once when Deke, weeping with laughter, tells Tammy to "make the O sadder." It says SORRY. It's crooked. It gets infected in a week — you remember that now, forward-remember it, an itch with a due date.* → s2_end

**s2_ink** — *Tammy's needle hovers. "Sorry to who?" she says. "Matters. Ink knows."* (Fulfills M4 CLEAN on any pick; each is [ECHO E3].)
- [ECHO E3a, flag INK_MOM] "For my mom." — *(+Grip. Journal ✦ rewrites: S3 will gain "She saw the wrist while you carried the fire, and something in her face broke open"; S4 gains a line at dinner.)*
- [ECHO E3b, flag INK_HER] "For a girl I haven't met yet." — *(+Grip. Tammy doesn't blink; needles hear everything. Journal ✦ rewrites: S1 gains "Rachel used to trace the wrist with one finger and ask, 'Who was it for?' You always said 'you.' You were always telling the truth."; S0 fridge line gains warmth.)*
- [ECHO E3c, flag INK_SELF] "For me. The one who's asleep." — *(+Grip. Journal ✦ rewrites: S0 mirror entry becomes "The stranger in the mirror is wearing your apology. He got it before you needed it. He was always going to.")*
- All three → s2_end

**s2_end** — *Dawn behind the bar. Deke's asleep on the hood of a car that isn't his, ice towel on his face, king of nothing. You look at your wrist — raw, exact, already reading SORRY in the pink light — and you say to the kid in the van, to yourself, "You don't even know yet what you're sorry FOR." The tide comes in.* → Interstitial I3.

---

### SCENE S3 — "The Kitchen Fire" — June 2005 (age 15). Due marks: **M5 (burn)**. NPCs: Mom, Dad.

Fulfillment matrix M5: CLEAN = carry the pan out bare-handed (0, grants echo E4). ROUGH = beat the curtain down (−`COST_ROUGH`, photo box lost). CORRECTION = throw water (−`COST_CORRECTION`, flashover, photo box lost, kills E4).

**s3_entry** — *You are fifteen. Your hands are smooth — the wrist is blank, the nose is straight, and it is deeply, wrongly strange to be uninjured. Mom's frying chicken and the phone rings in the hall — the lawyer again, about Grandpa Abel's estate, seven years unsettled — and she steps out with the cord stretched to its limit, and the pan stays on the flame. The Ledger says: SOMETHING BURNS TONIGHT. YOU HOLD IT.*
- [FATE ✕] Turn off the burner. Now. — *The knob spins loose in your fingers, connected to nothing. Dad's been meaning to fix it. He has always been meaning to fix it.*
- [FREE, flag GOT_DAD] Go get Dad from the garage first. → s3_dad
- [FREE] Stay. Watch the pan. Wait for it. → s3_flash

**s3_dad** — *Dad's under the truck. You say the stove's acting up. "Then stand by the stove," he says, not unkindly, which is as close as he gets. But he slides out, wiping his hands — he'll be twenty seconds behind you now. Twenty seconds will matter.* → s3_flash

**s3_flash** — *It goes up the way grease goes up: all at once, like it was waiting. Flame walks up the pan handle's steam and licks the curtain hem. Mom's voice from the hall stops mid-word.*
- [CLEAN M5, flag CARRIED_FIRE, grants ECHO E4] Grab the pan bare-handed and walk it out the back door. Do not stop. Do not drop it. — *(+Grip from E4.) The handle writes its promise down your right forearm — you hear it more than feel it, at first — and you walk, screaming but WALKING, eight steps, out the screen door, and set the fire down on the concrete like a offering. The kitchen stands. The curtain smolders and gives up.* [If GOT_DAD: *Dad arrives on step six and gets the door.*] *On the counter, untouched, sits the shoebox of photographs Mom keeps meaning to put in albums — Abel's whole face in there, dozens of him. (Journal ✦ rewrites: S0 gains "In the stranger's apartment there was one framed photo: an old man laughing, saved from something. You know now who saved him."; S4 will recognize the photograph.)* → s3_end
- [ROUGH M5] Beat the curtain down with your arms. — *(−Grip.) You smother it in six hard swings and the last one holds the burn against your forearm for the full price. The kitchen survives, black-tongued. The shoebox of photos drinks the smoke and the sprinkler-spray of the extinguisher Dad brings, and Abel's faces all run together like he's leaving twice.* → s3_end
- [CORRECTION M5] Throw water on it. — *(−−−Grip. Kills E4.) You know better. You KNOW better — but your fifteen-year-old hands have the glass of water and fate has your fifteen-year-old hands. The pan detonates. The ceiling wears a black rose. The flashover takes your forearm, your eyebrows, and every photograph in the house, and Dad drags you out by the collar through a kitchen that needs rebuilding.* → s3_end

**s3_end** — *After. Sirens declined, or arrived, depending. Dad grips your shoulder — checking you're solid, the only language he trusts — and the grip is too hard, held too long, and for the first time you clock it: how heavy his hands have always been, and how much heavier they were when you were small. You are going to be small again very soon. The tide comes in.* [If INK_MOM flag: add *Mom holds your wrist below the burn while they wrap it, right where — in another year of your life — a blue word will live, and she looks at the blank skin like she can read it anyway.*] → Interstitial I4.

---

### SCENE S4 — "The Attic" — November 1998 (age 8). Due marks: **M1 (finger)**. NPCs: Mom, Dad, Grandpa Abel (a photograph, a ring). THE ORIGIN.

**s4_entry** — *You are eight years old in your dead grandfather's attic, and your body is a rumor — light, unmarked, both-handed. The body map is almost empty: every pin gone except one, grey turning red: THE RING GOES ON. THE WISH GETS MADE. Downstairs, your parents are boxing up Abel's house with the radio on. Up here it's dust and slant-light and boxes markered TRASH in Mom's handwriting. Abel — great, generous, worldly Abel, who loved his family louder than anyone — has been dead two weeks, and they're throwing him out by the pound.*
- [FREE, once, +`GAIN_CALM_BEAT` Grip] Sit still a minute. Hold your own left hand. Count the fingers. — *Five. All five, small and complete. You memorize the one that's leaving. You say sorry to it. It's the calmest you have felt since Tuesday, thirty years from now.* → s4_entry (choice removed)
- [FREE] Dig through the TRASH boxes. → s4_ring

**s4_ring** — *Third box down, under mothballed coats: a small tin. Inside — two medals, a photograph, and a ring. The photograph:* [if CARRIED_FIRE: *you KNOW this photograph. It's the one from the shoebox, the one you saved from the fire seven years from now — Abel laughing, thirty-six years old, your age, with a nose that sits crooked, just barely, exactly like yours does. Will. Did.*] [else: *an old man laughing, young in it, with a nose that sits just barely crooked.*] *And the ring: brass, heavy, old, warm — warm in a tin in a cold attic — and sized wrong for any grown hand. Sized, you realize, for a small one.*
- [FATE ✕] Leave the ring in the tin. Close the tin. — *You close the tin. Your hand is already holding the ring. You watch your own small hand like a stranger's dog — when did it—? It doesn't matter. It was always holding it.*
- [FATE ✕] Throw it out the attic window, into the yard, into the past, anywhere. — *The window paint is sealed shut, forty years of it. And the ring is warmer now, pleased, as if trying counts as touching.*
- [FULFILLMENT M1 part 1 — always CLEAN framing, 0 Grip; flag RING_WILLING only if chosen before both fate-blocks are spent] Put it on yourself. Slow. Eyes open. You choose the finger it takes. — *You slide it onto your left ring finger — onto the scar you've been reading backwards your whole run — and it fits like it was measured. Nothing happens. That's the horrible part. Nothing happens yet.* → s4_dinner

**s4_dinner** — *"COLE! DINNER!" — Mom, up the stairs, sharp. Down to the good table, the one for company, because the funeral people keep coming by. Dad at the head, estate papers stacked beside his plate. You are eight, and you are doomed, and dinner is served. You know a mistake gets made tonight. You're a kid. Kids are dumb. The only choice left is which dumb.*
- [FATE ✕] Eat carefully. Be perfect. Be invisible. — *You are perfect for eleven minutes. Your elbow was always going to find the milk glass on minute twelve. Dad's papers drink it. His chair scrapes back.* (This block is unusually cruel on purpose: −`COST_FATE_BLOCK`, then the node's remaining choices become the mistake anyway.)
- [FREE, flag SIN_GRAVY] Reach across the table — you know better — and send the gravy boat onto Dad's estate papers. → s4_punish
- [FREE, flag SIN_SWEAR] Repeat, brightly, at the dinner table, the word you heard Uncle Ray say at the funeral. → s4_punish
- [FREE, flag SIN_LIE] When Dad asks what's that on your finger — lie. "Found it outside." He knows Abel's ring when he sees it. → s4_punish

**s4_punish** — *It goes the way it goes. Dad's hands are exactly as heavy as you remembered forward. Mom's silence is heavier.* [If INK_MOM: *For half a second at the door she hesitates — as if some future apology already reached her, postmarked from a van behind a bar — but only half a second.*] *"Go to your room and THINK ABOUT WHAT YOU DID." The lock — the outside kind, the kind that shouldn't be on a child's door — clicks. Dark. You, and the dark, and the ring, which is now hot.* → s4_room

**s4_room** — *Locked in. Eight years old and thirty-six and every age between, all of you in the dark at once. The ring burns like a coal now, and it is listening, and you understand at last what the Ledger has always meant: the wish gets made. Not "you make a wish." The wish GETS MADE — through you if you're willing, out of you if you're not. Fate holds the pen. But it has to use your words. Choose them.*
- [Requires Grip ≥ `ENDING_DEFIANCE_MIN_GRIP`] **"I wish to keep what this costs me."** — Say it, and mean it: the finger, the fire, the fist, the SORRY, the stairs — carried, not erased. → ENDING A
- [Always available] **"I want another try."** — The words that were always going to be said. Say them and close the circle. → ENDING B
- [Only if Grip ≤ `ENDING_HOLLOW_MAX_GRIP`] **Say nothing. Let it want for you.** → ENDING C
- (If Grip hits 0 anywhere in the run, the game routes here through a fast-forward passage and only the third option renders.)

**ENDING A — "The Long Way Round" (Defiance).** *The ring hears you. The ring doesn't care about defiance — the fire comes anyway, white and total, and takes the finger it was always going to take; you were never buying the wound back. You were buying the meaning. You wake — 36, Tuesday, the couch that smells like someone else's cigarettes — and the body in the mirror is the same body. But you know every line of it now. Not a stranger's ledger: a receipt. Yours. You look at the smooth space on your left hand and, for the first time in either direction of your life, it looks finished.* + one epilogue paragraph per echo earned (E1: the fridge photos; E2: the phone rings — Deke, every October; E3 variant; E4: the framed photo of Abel, laughing, saved). + run summary.

**ENDING B — "Round Again" (The Loop).** *The ring hears the only words it has ever heard, in every trip around. Fire. The finger. The scream that brings no one. And you fall — not down. Forward? Back? It stops mattering. You wake on a couch you don't own, in an apartment that smells like someone else's cigarettes. Your phone says Tuesday. Something is wrong with your hands.* (The epilogue re-renders the S0 opening passage verbatim, then stamps the screen: ROUND AGAIN.) + run summary.

**ENDING C — "Hollow."** *You say nothing, so it uses nothing: the wish gets made in your voice while you watch from somewhere behind your own eyes, and it doesn't give the eyes back. The nights run on without needing you. The stairs. The bar. The fire. The attic. A body walks the whole circle, wounds arriving on schedule, and something wears it politely, and nobody who loves it can say what's different, exactly. The Ledger, at least, is satisfied. The Ledger is always satisfied.* + run summary.

## 7.2 Ending gating summary

| Ending | Condition at s4_room | Design intent |
|---|---|---|
| A — The Long Way Round | Grip ≥ `ENDING_DEFIANCE_MIN_GRIP` (default 6) | Reward for facing fate Clean and collecting echoes |
| B — Round Again | Always offered | The canonical loop; the "true" trashy-horror ending |
| C — Hollow | Grip ≤ `ENDING_HOLLOW_MAX_GRIP` (default 3), or forced at Grip 0 | The lose state, played as an ending |

# 8. Difficulty & progression

Single tuned difficulty; no meta-progression. The difficulty curve is authored into the scene order: S0 teaches (no marks), S1 has one mark and one echo, S2 doubles the load (two marks, two echoes, interleaved), S3 is a single high-stakes mark where the intuitive choice (water!) is the Correction, and S4 removes fulfillment difficulty entirely and makes the run's accumulated Grip the whole question. The Grip economy is the difficulty dial: with defaults (start 10, max 12), a player who dodges twice per scene and takes Rough everywhere lands around 3–4 Grip (Ending B/C region); a player who reads the Ledger, takes Cleans, and banks 3+ echoes lands 9+ (Ending A). Tuning happens exclusively via the section 12 config: raise `COST_FATE_BLOCK` to punish wall-touching, raise `ENDING_DEFIANCE_MIN_GRIP` to make Defiance rarer. Replay difficulty knob for playtests: `?grip=6` start. ⚑ (overridable — the Grip economy numbers are the most likely thing playtesting changes.)

# 9. Style & theme

**Visual style:** "VHS paperback horror" — a text-forward layout styled like a water-damaged mass-market paperback filmed on a camcorder. Flat dark UI, no gradients except a single CRT vignette, film-grain noise overlay at 4% opacity (single tiling data-URI PNG generated in code), chromatic red/blue 1px text-shadow offset on headers only. All art is CSS/DOM + one inline SVG (the body silhouette). No image assets.

**Palette (6 colors):**

| Role | Hex |
|---|---|
| Background (near-black) | `#0A0A0F` |
| Panel/ink dark | `#1A1A22` |
| Bone (body text) | `#E8E6E0` |
| Blood (fate, marks, ledger, fate-block ✕) | `#B7241B` |
| Sickly amber (Grip meter, hints, choice hover) | `#E3B341` |
| Bruise (echoes ✦, journal rewrites) | `#7A2E8E` |

**Typography:** Headers/Ledger: system stack `Impact, 'Arial Narrow', sans-serif`, letter-spaced, all-caps. Body passages: `Georgia, serif` at 19px/1.6. Journal and system/tutorial lines: `'Courier New', monospace`. No webfonts (keeps the build asset-free and offline).

**Tone/mood:** Sincere pulp dread. The prose is lurid but never jokey; the UI is the only thing allowed to be cold (the Ledger speaks in flat declaratives).

**Reference points:** *Memento* run in reverse through a Goosebumps cover; the fated-choice dread of *Undertale*'s no-mercy inevitability applied to IF; VHS-era "Tales from the Crypt" title cards for scene headers.

**Placeholder art plan (M0–M1):** default system font, grey boxes, Grip as `▮▮▮▮▮▮▮▮▮▮`, body map as five labeled rectangles with colored dots, no grain/vignette. All prose text is final from M0 (the text IS the art budget).

# 10. Sound design

All SFX synthesized at runtime via **Web Audio API** (no Howler, no asset files) — a tiny jsfxr-style helper (`sfx.js`, ~80 lines: osc + noise + envelope). **Audio starts only after the first user gesture** (the Play click on splash initializes the `AudioContext`). **Mute toggle is P0**, persisted in `localStorage` key `tow_mute`.

| Game event | Sound description | Priority |
|---|---|---|
| Choice select | Dry, soft click — 40ms filtered noise tick | P0 |
| Fate-blocked choice | Detuned two-note "wrongness" sting (minor 2nd, sine, 300ms) + brief hiss swell | P0 |
| Mark fulfilled (Clean/Rough) | Single low tom-like thud (sine drop 120→60Hz, 200ms); Rough adds a noise crack | P0 |
| Correction (audit or chosen) | Slam: layered thud + white-noise burst + 500ms tape-stop pitch dive | P0 |
| Time-fall (interstitial) | 2.5s reversed swell: noise + rising sine sweep played "backwards" (downward envelope) | P0 |
| Low Grip heartbeat | Two-thud loop (55Hz sine pulses) at ~55 BPM whenever Grip ≤ `HEARTBEAT_GRIP_THRESHOLD` | P0 |
| Ending stamp | One sustained detuned chord, 3s decay (A: warm major-ish; B: hollow fifth; C: cluster) | P0 |
| Journal open / ✦ rewrite appears | Paper flick (short bandpassed noise) | P1 |
| Typewriter char tick | Very quiet 5ms tick every 3rd char | P1 |

**Music approach:** No composed music. P0 ambience = a generative bed: brown-noise "VHS hiss" at −38dB plus one slow-detuning sine drone that darkens (filter cutoff follows Grip). Never any copyrighted audio.

# 11. UI & screens

Flow: **SPLASH → (Play) → S0…S4 with INTERSTITIALS → ENDING → (Restart) → SPLASH**. Pause overlay reachable from any scene.

**Splash screen (mandatory contents):**
- Title: **THE OLDEST WOUND** + one-liner: *"Every night you fall further into your past. Your scars are a to-do list."*
- Rules/goal, ≤5 bullets: **(1)** Each night you wake earlier in your own life. **(2)** The red Ledger shows the wounds that MUST happen tonight — you can't stop them, only choose how. **(3)** Dodging fate costs Grip. Facing it clean costs nothing. Kindness pays. **(4)** Run out of Grip and something else finishes your life for you. **(5)** Reach the oldest wound with Grip to spare and you may choose your own words.
- Controls: *Desktop: click or keys 1–9 to choose · B body · J journal · M mute · Esc pause. Touch: just tap.*
- Version number `v0.1.0` rendered from the single `VERSION` constant (same constant feeds the debug overlay).
- One obvious **⟨ SLEEP ⟩** button (the Play affordance). Below it: small stamps for endings seen (A/B/C).

**Scene screen (main HUD, always visible during play):** top strip = scene title + date/age (left), Ledger chips (center), Grip meter (right); main column = passage text (typewriter at `TEXT_SPEED_MS` ms/char, click to complete) + choice buttons; right edge tabs = BODY and JOURNAL (✦ badge when unread rewrites exist); corner icons = 🔇 and ⏸.

**Interstitial screen:** full-bleed dark, the passage, two buttons, then the falling-date animation (date text spins down through the years, `FALL_ANIM_MS`).

**Pause overlay:** Resume / Restart (confirm) / Mute. Shows version.

**Ending screen:** Ending title + stamp graphic (pure CSS), full epilogue text, run summary table (per-mark grade C/R/X, echoes found n/4, final Grip, elapsed time), **RESTART** button.

# 12. Config & tuning

Single exported object `CONFIG` in `js/config.js`; every value below lives there and nowhere else.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `VERSION` | `"0.1.0"` | string | Splash + debug overlay version stamp |
| `GRIP_START` | 10 | grip | Starting Grip |
| `GRIP_MAX` | 12 | grip | Grip cap (echo gains clamp here) |
| `COST_FATE_BLOCK` | 1 | grip | Picking a fate-blocked choice |
| `COST_ROUGH` | 1 | grip | Rough fulfillment |
| `COST_CORRECTION` | 3 | grip | Correction (chosen or audit-forced) |
| `COST_STAY_AWAKE` | 2 | grip | Buying the interstitial hint |
| `GAIN_ECHO` | 1 | grip | Each echo (E1–E4) |
| `GAIN_CALM_BEAT` | 1 | grip | S4 calm beat (once) |
| `ENDING_DEFIANCE_MIN_GRIP` | 6 | grip | Ending A availability |
| `ENDING_HOLLOW_MAX_GRIP` | 3 | grip | Ending C choice availability |
| `HEARTBEAT_GRIP_THRESHOLD` | 4 | grip | Heartbeat loop + drone darkening onset |
| `TEXT_SPEED_MS` | 18 | ms/char | Typewriter reveal speed |
| `FALL_ANIM_MS` | 2500 | ms | Interstitial falling-date animation |
| `SHAKE_CORRECTION_PX` | 6 | px | Screen shake amplitude on Correction |
| `GRAIN_OPACITY` | 0.04 | 0–1 | Film grain overlay |
| `AMBIENCE_DB` | −38 | dB | Hiss/drone bed level |
| `SUMMARY_ENABLED` | true | bool | Show run summary table on endings |

**URL flags (all P0 except noted):** `?seed=N` — seeds the PRNG (mulberry32; randomness is only used for minor flavor-line variants and SFX detune, but reproducibility is guaranteed for playtests). `?debug=1` — overlay showing FPS, current node ID, Grip, flags set, marks state; cheat keys: `[`/`]` = −/+ Grip, `N` = jump to next scene, `E` = jump to s4_room. `?scene=s2` — start at a given scene with sensible default flags. `?grip=N` — override starting Grip. `?fast=1` — typewriter off, `FALL_ANIM_MS`=300. `?ending=a|b|c` — (P1) render an ending screen directly for copy/style checks.

# 13. Tech stack

**Vanilla JavaScript (ES modules), DOM + CSS, zero-build.** One `index.html` plus `js/*.js` modules and `css/style.css`, deployable by copying the folder to any static host — no bundler, no dependencies, no network calls, no fonts or image assets (one inline SVG, one generated grain data-URI). This is a text-and-buttons game: Canvas/Pixi/Matter would add nothing (there is no spatial sim to make emergent — the "physics" here is the fate rule-engine, which is a pure state machine and belongs in plain JS). Web Audio is used directly for synthesized SFX. Rendering is trivial DOM replacement per node, so 60fps is free; perf budget: ≤1 rAF loop (grain flicker + shake only), zero per-frame allocations in steady state, no particles in P0 (M2 may add ≤40 CSS-transform ember particles on the ending stamp, capped by config). State lives in memory; only `tow_mute` and `tow_endings_seen` touch `localStorage`. The engine (`engine.js`) is a pure reducer — `next(state, choiceId) → state` — with no DOM references, so the whole scenario is unit-testable headlessly in Node.

# 14. Milestones

**M0 — Toy loop.** Goal: prove that fate-blocked choices + the Ledger + Grip are compelling with zero dressing. Deliverables: engine.js reducer, content for **S1 only** (full tree above), unstyled HTML buttons, text Grip counter, Ledger as plain text, end-of-scene audit, browser-runnable via `file://` or any static server.
- [ ] S1 playable start-to-finish with all five choice species functioning (free, fate-block, Clean, Rough, Correction)
- [ ] Picking "Take the elevator" shows the block prose, costs 1 Grip, removes the choice, and stays on the node
- [ ] Exiting the scene with M2 unfulfilled is impossible via the tree, and the audit fallback fires if forced via debug
- [ ] A first-time player, given no instructions beyond the Ledger line, understands within 60 seconds that the brow wound is mandatory
- *Proves:* the fun hypothesis in miniature. **If touching fate's wall isn't interesting here, stop — four more scenes won't fix it.**

**M1 — Real rules.** Goal: full P0 game. Deliverables: all five scenes + interstitials + three endings from section 7.1; Grip economy per config; body map panel (placeholder rectangles); journal with ✦ echo rewrites; splash screen (rules, controls, `VERSION`); pause; restart; Hollow cut at Grip 0.
- [ ] A full run completes in ≤12 minutes and every ending (A, B, C) is reachable (verify with `?grip=` overrides)
- [ ] All four echoes visibly rewrite at least one earlier journal entry, flagged with ✦
- [ ] S4 body map shows only the finger mark; s4_room offers exactly the choices its Grip gates allow
- [ ] Refreshing mid-run and restarting produces a clean state; mute and endings-seen persist
- *Proves:* the arc structure and Grip gating produce differentiated endings players care about.

**M2 — Feel.** Goal: dread. Deliverables: full section 9 art pass (palette, type, grain, vignette, chromatic headers, SVG body map), typewriter text, screen shake on Correction (`SHAKE_CORRECTION_PX`), falling-date animation, all P0 SFX + ambience bed + heartbeat, mute toggle wired.
- [ ] Audio only initializes after the Play gesture; mute works and persists
- [ ] Correction moments land: shake + slam + tape-stop reads as punishment in a hallway playtest
- [ ] Steady-state play holds 60fps on a mid-range laptop with the grain overlay active
- *Proves:* presentation multiplies the dread rather than hiding weak rules.

**M3 — Playtest build.** Goal: shippable test artifact. Deliverables: `?seed`, `?debug=1` (+cheat keys), `?scene=`, `?grip=`, `?fast=1`; headless engine test file (`test/engine.test.mjs`, run with `node --test`) covering Grip math, audit fallback, ending gates; deployed to static host under `/games/regrets/`; P1 items if time (journal SFX, `?ending=` preview, S0 replay-verbatim flourish in Ending B).
- [ ] Same seed ⇒ identical flavor variants across two runs
- [ ] `node --test` passes: Grip clamps, Correction audit, all three ending gates, echo rewrite targeting
- [ ] Game loads and completes from the static host on Chrome and Firefox, and is completable by tap only on a phone
- *Proves:* the prototype is distributable and its results reproducible.

# 15. Open questions

1. **(non-blocking — resolve in playtest)** Is `COST_FATE_BLOCK=1` right, or should touching the wall be free the first time per scene (teaching) and costly after? Knob: `COST_FATE_BLOCK`; a variant rule can ship behind `?freeblock=1` in M3 if playtests stall.
2. **(non-blocking — resolve in playtest)** Is Ending A's gate (Grip ≥ 6) too easy for players who simply avoid dodging? Knobs: `ENDING_DEFIANCE_MIN_GRIP`, `GAIN_ECHO`.
3. **(non-blocking — resolve in playtest)** Does the 8–10 minute run exceed hallway-playtest patience? Knob: `?fast=1` plus `?scene=` cold-starts; if confirmed, cut S0 to two nodes (it is the only trimmable scene).
4. **(non-blocking — resolve in playtest)** Do players find the journal ✦ rewrites unprompted, or does the echo payoff need a forced journal-open beat after the first rewrite? Knob: an `AUTO_OPEN_JOURNAL` boolean can be added to config in M1 if unfound in first tests.
5. **(non-blocking)** Should staying awake ever be the *wrong* call (hint not worth 2 Grip)? Current tuning makes it roughly break-even against one avoided Rough; acceptable for prototype.

No blocking questions. All content, numbers, and systems in this document are decided.

# 16. Handoff notes for Fable

**Build order:** `config.js` → `engine.js` (pure reducer + state shape: `{nodeId, grip, flags:Set, marks:{id:grade|null}, journal:[], echoes:Set, rngSeed}`) → `content.js` (S1 only, as data: nodes/choices/effects exactly per section 7.1) → minimal DOM renderer (`main.js`) → **stop and play M0** → remaining scenes in `content.js` → interstitials/endings → panels (body/journal) → splash/pause → `style.css` art pass → `audio.js`/`sfx.js` → debug flags → tests.

**Keep headless-testable:** `engine.js` and `content.js` must never import DOM, `window`, or audio. Every choice effect is data (`{gripDelta, fulfills, grade, setFlags, echo, rewrites, next}`), and the reducer applies it. The audit rule, Grip clamp, Hollow cut, and ending gates all live in the reducer so `node --test` can drive a full run by choice-ID script and assert the ending. RNG is injected (seeded mulberry32), never `Math.random`.

**Repo/file layout (source == deployable — zero-build):**
```
public/games/regrets/
  index.html        (splash markup shell + module script tag)
  design.md         (this document)
  css/style.css
  js/config.js  js/engine.js  js/content.js  js/main.js  js/audio.js  js/sfx.js  js/rng.js
  test/engine.test.mjs   (excluded from any deploy copy if desired; harmless if shipped)
```
Deploy = copy the folder. No build step, no external requests (verify with devtools network tab: zero non-local entries).

**Reminders:** Prove S1 with unstyled buttons before writing a line of CSS — if the fate-block moment doesn't spark in M0, escalate rather than polish. Ship every milestone runnable. All tuning goes through `CONFIG`; if you find yourself typing a number anywhere else, move it. The prose in section 7.1 is final copy — paste it, don't paraphrase it.
