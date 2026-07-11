# The Velvet Gong — Game Design Document

> Source idea: [Game Idea 21 - Cocktail party (Theme: A Strange Fetish)](/game-idea-21-cocktail-party-theme-a-strange-fetish)

## 1. Title & one-liner

**Working title:** **The Velvet Gong**

**Alternates:** *Strange Tastes*, *The Confession Gong*, *Exquisite Preferences*, *Nose to Nose*, *Yearning: A Masquerade*

**One-sentence description:** Mingle at a masked cocktail party, steal the right words from the right weirdos, then compose an absurd magnetic-poetry "confession of desire" so precisely tailored to the guests' strange tastes that they flock to your podium instead of your rivals'.

**Genre:** Single-player social-deduction word game / comedy party sim (browser, mouse-only).

**Elevator pitch:** Ten masked eccentrics fill a candlelit ballroom — a plague doctor who trusts only misted air, a magistrate who secretly longs to be told off, a monk with strong feelings about warm custard. Talk to them one by one; every conversation is a Mad Libs quarry, and you click words straight out of their speech bubbles into your 12-word satchel. Each guest also leaks what they're into. When the gong rings, you and three AI rivals race in real time to build a magnetic-poetry declaration of yearning ("I YEARN TO BE gently scolded, taxidermied, moist...") one irreversible word at a time. Guests drift toward whoever's confession best matches their private preferences and lock in permanently — attract the most and you win the party. Attract *exactly one* and you win something rarer: a soulmate.

**Adaptation note:** The source idea is a Jackbox-style multi-phone party game. Per the static-hosting constraint it is adapted to **single-player versus 3 simple AI rivals**: the AI rivals skip the mingle phase (they "already know" some preferences) and compete only in the real-time ceremony, which is where the fun hypothesis lives. The source's "NPC dialog differs depending on who talks first" is cut (no other human talkers). ⚑ (overridable)

---

## 2. Fun hypothesis

**The single question:** *Is "harvest words from comedic conversations, deduce preferences, then compose a preference-targeted confession under real-time pressure" a satisfying deduce-then-perform loop — even without other humans laughing at the results?*

Everything in P0 tests the chain: **listen → collect → deduce → compose → watch the room vote with its feet.**

**Playtest questions (ask after each session):**

1. During the mingle phase, were you collecting words deliberately (for a target guest) or hoarding randomly? When did the switch happen?
2. Did you laugh (or at least exhale through your nose) at your own final declaration when it was read back?
3. Did losing a guest to a rival mid-ceremony sting? Did you change your plan because of it?
4. Did you ever intentionally chase the "exactly one guest" soulmate prize instead of the win? Would you on a replay?
5. Was the 12-word satchel limit a fun curation pressure or an annoyance?

---

## 3. Design pillars

1. **Words are loot.** Every funny sentence is also an inventory. Clicking a word out of someone's mouth must feel like pickpocketing.
2. **Deduction pays, but comedy pays out.** The scoring is exact and learnable, yet the winning declaration must always read as absurd Mad Libs. If the optimal play stops being funny, the word bank is wrong.
3. **The room votes with its feet.** All feedback is diegetic: guests physically walk to the podium of the declarant they prefer and *stay there*. No abstract score bars during the ceremony (debug overlay excepted).
4. **PG-13 innuendo, never explicit.** The "strange fetishes" are absurdist — corduroy socks, being processed in triplicate, warm custard. The game winks; it never leers.

If a feature does not serve one of these four, cut it.

---

## 4. Core game loop

**Session length target:** one full round = 6–9 minutes (mingle ~4–6 min self-paced, ceremony 75 s, results ~30 s).

**Phases:**

1. **MINGLE** (self-paced, gong unlocks after `MIN_CONVERSATIONS` = 5 chats) — Player clicks a guest; their avatar walks over; a conversation overlay opens. Player reads the guest's opener, picks 1 of 3 responses (one response per guest, forever), reads the reply and closer, and clicks highlighted words into the satchel (max `SATCHEL_SIZE` = 12; collecting while full prompts a swap). *Sees:* speech bubbles with glowing collectible words, satchel filling, preference "tells." *Feels:* nosy, acquisitive, scheming.
2. **GONG** — Player rings the gong (button unlocks at 5 conversations; remaining guests can still be visited first). One-way door into the ceremony. *Feels:* commitment.
3. **CEREMONY** (75 s, real time) — Four podiums: player + 3 AI rivals. Every declarant appends words from their tray to a banner starting "I YEARN TO BE ...". Words are permanent once placed; player placement has a 2 s cooldown; rivals place on their own timers. Every second, each unattached guest scores every declaration; when a guest's score for the current strict leader reaches `LOCK_THRESHOLD` = 7, they walk to that podium and lock permanently. *Sees:* banners growing, guests drifting and locking, clock ticking. *Feels:* performance anxiety, poker-faced bidding war.
4. **RESULTS** — Declarations read back in full; guest counts tallied; winner crowned; Soulmate Prize awarded to any declarant with exactly one guest. Restart offered. *Feels:* punchline.

```
 ┌─────────┐  click guest   ┌──────────────┐  collect words,
 │ MINGLE  │───────────────▶│ CONVERSATION │  pick 1-of-3 reply
 │ (room)  │◀───────────────│   (overlay)  │  (rapport set)
 └────┬────┘  disengage     └──────────────┘
      │  ≥5 chats → gong enabled
      ▼  ring gong (one-way)
 ┌─────────┐ place word (2s cd)  guests score every 1s
 │CEREMONY │────────────────────▶ score ≥ 7 & strict lead → guest LOCKS
 │  75 s   │  rivals place too
 └────┬────┘
      ▼ timer 0 (stragglers resolve or hit the buffet)
 ┌─────────┐
 │ RESULTS │──▶ most guests wins · exactly 1 = Soulmate Prize ──▶ restart
 └─────────┘
```

---

## 5. Inputs & controls

The game is 100% pointer-driven. **Touch-viable: yes, fully** — every interaction is a tap on a large target (words render at ≥18 px with padded hit areas ≥ 40×40 px). No drag, no hover-dependent info (tooltips also open on tap).

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| Left-click guest | Tap guest | Walk over and open conversation |
| Left-click highlighted word in dialog | Tap word | Collect word into satchel (opens swap picker if full) |
| Left-click one of 3 response buttons | Tap response | Commit response (sets rapport; irreversible) |
| Left-click "Politely disengage" | Tap | Close conversation, mark guest as talked-to |
| Left-click word chip in satchel (mingle) | Tap chip | Discard word (confirm dialog) |
| Left-click gong button | Tap | Start ceremony (confirm dialog; one-way) |
| Left-click word chip in tray (ceremony) | Tap chip | Append word to declaration (permanent; 2 s cooldown) |
| Left-click "Play" / "Restart" | Tap | Start / restart round |
| `M` key or speaker icon | Tap speaker icon | Mute/unmute all audio |
| `Esc` key or pause icon | Tap pause icon | Pause (freezes ceremony timer and rival/guest AI) |
| `R` key or restart icon | Tap restart icon | Restart round (confirm dialog) |

Debug-only cheat keys (active with `?debug=1`): `G` force-unlock gong, `W` fill satchel with 12 seeded words, `S` skip to ceremony, `+`/`-` add/remove 15 s of ceremony time.

No other inputs exist.

---

## 6. Game elements

### 6.1 The ballroom

Single static screen (1280×720 logical, letterboxed). SVG scene: checkerboard floor, three arched windows, chandelier, a **buffet table** (right edge — where unimpressed guests end up), the **gong** (top center), and four **podiums** (revealed in ceremony phase along the bottom). Guests stand at fixed stations in the mingle phase (no wandering in P0; idle bob animation only). ⚑ (overridable — ambient wandering is P2 polish)

### 6.2 Player avatar

Plain white domino mask with a modest cone nose, black tie. Placeholder: white circle + grey triangle nose + name label "YOU". Walks (300 px/s, straight line) to a guest when clicked. Config: `WALK_SPEED`.

### 6.3 Word system (the core resource)

- Every collectible word has exactly **one tag** from the 8-tag taxonomy below. Tags are hidden from the player in P0 (deduced from context); satchel tooltip shows the tag after collection ⚑ (overridable — full hiding is harsher, config `SHOW_TAGS_IN_SATCHEL` = true).
- Collectible words render highlighted (gold, dotted underline) inside speech bubbles. Clicking collects. The full conversation transcript stays on screen (scrollable) until the player disengages, so nothing is missably fleeting within a conversation. After disengaging, uncollected words from that guest are gone (no re-talk in P0; transcript journal is P1).
- The satchel is a **set** (no duplicates; collecting an already-owned word flashes the existing chip). Cap `SATCHEL_SIZE` = 12 ⚑ (source said 15; tightened because this room has 10 guests, not 20).
- **Kink words** (one per guest, see 6.5) are special: each guest *names* their kink word aloud in their closing line, but in their own mouth it renders as a non-collectible, italic "desire word." Each kink word is collectible from the dialog of exactly **two other guests**. This forces wide mingling: to seduce the Countess you must hear her confess her corduroy thing, then go find someone who actually *says* "corduroy." ⚑ (overridable — hints could be made oblique instead of explicit; config-free authoring change, deferred)
- **Glue words:** every declarant starts the ceremony with 3 free untagged words already in the tray: `gently`, `utterly`, `politely`. Worth 0 points; pure comedy connective tissue.

**Tag taxonomy and master word list** (every collectible word in the game; ★ = kink word):

| Tag | Words (source guest in parentheses) |
|---|---|
| FABRIC | velvet (Baron, Countess), tweed (Baron), flannel (Baron), ★corduroy (Baron, Widow), ★sequined (Countess, Marsh) |
| FOOD | poached (Beak, Cormorant), oysters (Gravy, Cormorant), gravy (Gravy), ★custard (Cormorant, Beak), ★brined (Gravy, Puffin) |
| CREATURE | tadpoles (Puffin, Marsh), herons (Puffin), swan (Countess), ★eels (Marsh, Cormorant) |
| RITUAL | chanting (Magistrate, Beak), ceremonial (Gravy, Magistrate), candlelit (Beak), anointed (Gravy), gong (Gravy) |
| PAPERWORK | stapled (Notary), notarized (Notary), laminated (Puffin), ★triplicate (Puffin, Magistrate) |
| DAMP | misted (Beak, Cormorant), dewy (Marsh), humid (Marsh, Countess), ★drizzled (Cormorant, Marsh), ★moist (Beak, Gravy) |
| JUDGMENT | disapproving (Notary), judged (Widow, Baron), reprimanded (Countess), ★scolded (Notary, Widow) |
| ANTIQUE | dusty (Widow), cobwebbed (Widow), heirloom (Countess, Baron), Victorian (Countess), embalmed (Widow), ★taxidermied (Magistrate, Countess) |
| (glue) | gently, utterly, politely — free, tag NONE, 0 points |

### 6.4 Conversation structure (identical shape for all guests)

1. **E1 — Opener.** Guest speaks 2–3 sentences containing collectible words and personality tells.
2. **Player response.** Exactly 3 options, displayed in shuffled order. One is +2 rapport (play along with their obsession), one is 0 (neutral), one is −1 (poke the bear). One response per guest, permanent (source rule preserved).
3. **E2 — Reply.** Branch-specific 1–2 sentences; may contain collectible words (branch words are bonus loot, never kink words).
4. **E3 — Closer.** Same for all branches. Contains collectible words, the guest's strongest preference tells, and their italicized non-collectible kink confession.
5. **Disengage.** Guest gets a checkmark; conversation counter increments.

### 6.5 The guests (all 10, fully authored — P0 content)

Rapport values below: listed as **A** (+2), **B** (0), **C** (−1); the UI shuffles display order. `[word]` = collectible (tag per master list). *"...word..."* in closers = the guest's own kink, non-collectible from them.

---

**1. DOCTOR BEAK** — plague-doctor mask, germ-obsessed society physician.
**Loves:** DAMP, RITUAL. **Hates:** FOOD. **Kink word:** `drizzled` (collect from Cormorant, Marsh). **Rapport-A tell:** validate his hygiene religion.

- **E1:** "Stay back — no, closer, but exhale *away* from me. This party is a petri dish in a nice dress. Every canapé is a little [poached] coffin, and I only trust air that has been properly [misted]."
- **A (+2):** "I boiled myself before arriving." → **E2-A:** "Boiled! A [ceremonial] act of self-respect! Hygiene is a religion, and I am its dampest priest."
- **B (0):** "The cheese board looked nice." → **E2-B:** "The cheese board is a biohazard with a garnish. I shall pray for you at the next [candlelit] fumigation."
- **C (−1):** "You should relax and eat something." → **E2-C:** "Relax?! The last man who relaxed here was carried out [chanting]. Possibly from joy. Probably from the shellfish."
- **E3:** "Between us: they served [custard] at a funeral once — riddled with spores, I'm sure of it. No. Nothing soothes me like sterile fog. To be lightly misted, even properly [moist]... and the forecast tonight said *drizzled*. I have never been so excited by weather. Now go wash your hands. Twice."

**2. COUNTESS VON PLUME** — peacock mask, heirloom-fabric aristocrat, feuding with Baron Bustle.
**Loves:** FABRIC, ANTIQUE. **Hates:** DAMP. **Kink word:** `corduroy` (collect from Baron, Widow). **Rapport-A tell:** flatter her wardrobe.

- **E1:** "Do not touch the drapes, darling — that is [velvet] older than your bloodline, cut from my great-aunt's [heirloom] fainting couch. I keep it displayed beneath Reginald, my [taxidermied] [swan]. He judges everyone. He adores me."
- **A (+2):** "Your gown outshines the chandeliers." → **E2-A:** "Flattery in *good taste*! It is [Victorian], darling — hand-stitched by disappointed nuns."
- **B (0):** "Nice curtains." → **E2-B:** "'Nice.' The drapes and I will recover eventually."
- **C (−1):** "Bit humid for velvet, isn't it?" → **E2-C:** "[Humid]?! Speak of moisture near my wardrobe again and you shall be [reprimanded] in front of the swan."
- **E3:** "The Baron claims [sequined] is the future. The Baron is a disco ball with a title. But between us... the touch of honest *corduroy* against one's cheek — ribbed, dependable, working-class in the most thrilling way — I have said too much. Reginald, look away."

**3. THE NOTARY** — grey-heron mask, ecstatic bureaucrat.
**Loves:** PAPERWORK, JUDGMENT. **Hates:** RITUAL. **Kink word:** `triplicate` (collect from Puffin, Magistrate). **Rapport-A tell:** generate paperwork for him.

- **E1:** "Before we converse: initial here, here, and here. Wonderful. Nothing thrills like a form correctly [stapled]. This party has no permits — none! I checked, and I have never been so [disapproving] or so alive."
- **A (+2):** "Could I file a complaint about the music?" → **E2-A:** "A complaint! Unprompted! You beautiful citizen. It shall be [notarized] tonight and denied by morning."
- **B (0):** "Is the clipboard part of the costume?" → **E2-B:** "The mask is a costume. The clipboard is load-bearing."
- **C (−1):** "Rules are made to be broken." → **E2-C:** "I am going to pretend that was a customs declaration, and that customs found you wanting."
- **E3:** "The gong ceremony is unlicensed chaos and I shall attend under written protest. I was once [scolded] by a supreme-court stenographer — every abbreviation perfect — and I have chased that feeling ever since. And once, just once, a clerk processed me in *triplicate*... no. NO. That memory is filed under private."

**4. BROTHER GRAVY** — pelican mask, gourmand monk.
**Loves:** FOOD, RITUAL. **Hates:** PAPERWORK. **Kink word:** `custard` (collect from Cormorant, Beak). **Rapport-A tell:** treat food as sacred.

- **E1:** "Have you tried the little tarts? I blessed them all. Personally. Twice. My order takes vows of silence, poverty, and second helpings — and the [gravy] fountain is a [ceremonial] object, whatever the caterer says."
- **A (+2):** "Bless this canapé for me, Brother?" → **E2-A:** "Gladly! May it be forever [anointed] in butter, now and at the hour of dessert."
- **B (0):** "Aren't monks supposed to fast?" → **E2-B:** "We fast between bites. It is very spiritual."
- **C (−1):** "The food's a bit bland." → **E2-C:** "Bland?! The [oysters] wept when they were shucked, and so shall you."
- **E3:** "Come to the [gong] ceremony — the [chanting] pairs beautifully with a [brined] olive and a [moist] sponge cake. And if anyone asks: yes, warm *custard* is a sacrament, and no, I will not be elaborating in mixed company."

**5. WIDOW MOTH** — moth mask, gothic serial widow.
**Loves:** ANTIQUE, JUDGMENT. **Hates:** FABRIC (she must not be tempted). **Kink word:** `taxidermied` (collect from Magistrate, Countess). **Rapport-A tell:** ask about the husbands.

- **E1:** "I have buried four husbands, darling. All natural causes. *Mostly.* This mansion reminds me of my third's estate — [dusty], [cobwebbed], full of secrets and unclaimed dentures."
- **A (+2):** "Tell me about husband number three." → **E2-A:** "A collector! Our honeymoon was in a museum vault. When he passed, I had his favorite chair [embalmed]. The chair, yes."
- **B (0):** "My condolences." → **E2-B:** "Accepted. I keep them in a jar with the others."
- **C (−1):** "Four husbands? Suspicious." → **E2-C:** "How dare you. *Correct*, but how dare you. I was [judged] by a coroner once — thoroughly — and acquitted, thrillingly."
- **E3:** "My second husband wore [corduroy] trousers to our wedding, and I never forgave the sound. Being sternly [scolded] by his mother remains a treasured memory. Ah... to be adored the way a glass case adores something *taxidermied*. Preserved. Posed. Appreciated at last."

**6. PROFESSOR PUFFIN** — puffin mask, unfunded marine biologist.
**Loves:** CREATURE, PAPERWORK. **Hates:** FOOD (people keep eating his specimens). **Kink word:** `eels` (collect from Marsh, Cormorant). **Rapport-A tell:** ask about his research.

- **E1:** "Do you know how many [tadpoles] fit in a champagne flute? Forty. The university revoked my catering privileges, and both rejection letters were [laminated]. *Laminated.* They knew I would cry on them."
- **A (+2):** "Tell me about your research." → **E2-A:** "At last, a scholar! I study things with too many teeth and not enough funding. My latest paper on [herons] was peer-reviewed by an actual heron. Scathing."
- **B (0):** "Is that mask anatomically accurate?" → **E2-B:** "Anatomically? No. Emotionally? Devastatingly."
- **C (−1):** "Fish are boring." → **E2-C:** "BORING? A hagfish can tie itself into a knot of pure spite, which is more than I can say for you."
- **E3:** "I submitted my heart to the review board in [triplicate], and they lost it. Story of my life. Between us — a wriggling bucket fresh from the [brined] shallows... *eels*, I mean *eels* do something to me that tenure never could."

**7. MX. MARSH** — newt mask, serene bog evangelist, radically nonjudgmental.
**Loves:** DAMP, CREATURE. **Hates:** JUDGMENT. **Kink word:** `moist` (collect from Beak, Gravy). **Rapport-A tell:** accept the bog.

- **E1:** "This is a no-judgment corner, friend. Take off your opinions and stay awhile. I came straight from the bog — did not change, will not apologize. It's [dewy] this time of year, and the [eels] glint like [sequined] evening gloves. Highest praise I know."
- **A (+2):** "The bog sounds lovely, actually." → **E2-A:** "It IS. Everyone's welcome in the mud. Even the [tadpoles] have imposter syndrome, and we love them anyway."
- **B (0):** "You came here... from a bog?" → **E2-B:** "Everyone comes from a bog originally. Some of us just kept in touch."
- **C (−1):** "You smell like pond." → **E2-C:** "And you smell like judgment, which is worse, and considerably less [humid]."
- **E3:** "Stand in warm rain sometime. Get [misted]. Get [drizzled] on. Get comfortable. Me? I dream of being fully, unapologetically *moist* — and I need you to be okay with that, because I am."

**8. THE MAGISTRATE** — owl mask, hanging judge who secretly craves being overruled.
**Loves:** JUDGMENT, RITUAL. **Hates:** CREATURE (owls excepted; do not raise this). **Kink word:** `scolded` (collect from Notary, Widow). **Rapport-A tell:** talk back to the bench.

- **E1:** "Order. ORDER. This party is in contempt of taste and I *love* it here. I once sentenced a man to four hours of [chanting]; he thanked me. This mask? A [taxidermied] owl. His name was Justice. He presided."
- **A (+2):** "You're out of order, Magistrate." → **E2-A:** "...Say that again. Slower. Oh, the *audacity*. Sustained. Gloriously sustained."
- **B (0):** "Nice gavel." → **E2-B:** "It is [ceremonial]. The real one is at the cleaners. Blood— wine. Wine stains."
- **C (−1):** "The law is an ass." → **E2-C:** "The law is MY ass— my *area*. My area of expertise. Stricken from the record. All of it."
- **E3:** "File your appeal in [triplicate] and I shall deny it beautifully. Between us: a witness once called me a disgrace to the bench, and I have never felt so alive. To be properly, thoroughly *scolded*... court is adjourned before I say more."

**9. CHEF CORMORANT** — cormorant mask, intense celebrity chef.
**Loves:** FOOD, DAMP. **Hates:** ANTIQUE (dust is the enemy of a kitchen). **Kink word:** `brined` (collect from Gravy, Puffin). **Rapport-A tell:** total worship of the food.

- **E1:** "TASTE THIS. No — taste it with *respect*. Tonight's menu is 'the ocean, but angrier.' Everything is [poached], everything is [drizzled], the [oysters] are locally intimidated, and the [eels] have filed a complaint."
- **A (+2):** "This is the best thing I've ever eaten." → **E2-A:** "CORRECT. You may watch me plate the next course. Do not blink. Blinking is for the weak of palate."
- **B (0):** "What's in it?" → **E2-B:** "Secrets. And fennel."
- **C (−1):** "Needs salt." → **E2-C:** "NEEDS SALT?! Get out of my tent. This is not a tent. GET OUT ANYWAY."
- **E3:** "Dessert is a warm [custard] under a [misted] cloche — do NOT tell the monk, he will weep into it again. Me? I want to be *brined*. Slowly. Overnight. Like something precious. Do not put that in the review."

**10. BARON BUSTLE** — flamingo mask, textile dandy, feuding with Countess Von Plume.
**Loves:** FABRIC, ANTIQUE. **Hates:** DAMP (sweat ruins the silhouette; he sweats anyway). **Kink word:** `sequined` (collect from Countess, Marsh). **Rapport-A tell:** crown him best-dressed.

- **E1:** "Behold: [flannel]? No. [Tweed]? *Please.* Tonight I am wearing eleven kinds of [velvet], and at least two are illegal in this county. The Countess says I peaked in 1889. The Countess owns ONE fainting couch."
- **A (+2):** "You are the best-dressed creature here." → **E2-A:** "CREATURE! Best-DRESSED! You may touch the left cufflink. Briefly. It is an [heirloom]."
- **B (0):** "Aren't you warm in all that?" → **E2-B:** "Fashion is a fever, darling. You sweat, you win."
- **C (−1):** "The Countess dresses better." → **E2-C:** "Then go stand by HER drapes and be [judged] like the rest of her furniture."
- **E3:** "Between us and my tailor: beneath the silk and the swagger, I wear [corduroy] socks. Ribbed. Honest. And if you ever see me in something fully *sequined* — head to toe, catching every candle — know that I have finally, gloriously stopped pretending."

---

### 6.6 AI rivals (3) — ceremony-only opponents

Masked declarants at the other podiums. They have fixed word banks (10 words each: 8 on-theme + their bank's kink word + 1 glue) and place words on a timer. Rapport with all guests: 0 (the player's mingle choices are the player's edge). ⚑ (overridable — count and banks in config)

| Rival | Mask | Theme tags | Word bank |
|---|---|---|---|
| **Mademoiselle Renard** | fox | FABRIC + ANTIQUE | velvet, heirloom, Victorian, tweed, dusty, embalmed, cobwebbed, flannel, **corduroy**, gently |
| **Sir Squid** | squid | DAMP + CREATURE | misted, dewy, humid, tadpoles, herons, swan, drizzled, eels, **moist**, utterly |
| **The Archivist** | raven | PAPERWORK + JUDGMENT | notarized, stapled, laminated, disapproving, judged, reprimanded, triplicate, **scolded**, politely |

**Rival behavior (exact):** Every `RIVAL_PLACE_INTERVAL_S` (7 s) ± uniform jitter `RIVAL_PLACE_JITTER_S` (2 s), independently per rival, the rival places its next word (max `MAX_DECLARATION_WORDS` = 8). With probability `RIVAL_IQ` (0.65) it places the bank word with the highest total score gain summed across currently *unlocked* guests; otherwise a uniformly random remaining bank word. Rivals never pass. FOOD and RITUAL are deliberately uncontested by rivals — a discoverable lane for the player.

### 6.7 Other elements

- **Word satchel (HUD):** 12 chip slots, always visible in mingle. Chips show word + tag icon.
- **Ceremony tray:** the satchel plus 3 glue words becomes the tray; placed chips grey out.
- **Podiums (4):** player podium center-left, rivals across the bottom. Banner above each shows "I YEARN TO BE" + placed words.
- **The gong:** top-center; greyed until 5 conversations; confirm dialog warns "This ends the mingling. Guests you haven't met stay strangers."
- **Buffet table:** guests who lock to nobody drift here at timer end; they count for no one.

---

## 7. Rules, win & lose conditions

### 7.1 Ceremony scoring (exact)

For declarant *p* and guest *g*, at any moment:

```
score(p,g) = rapport(p,g)
           + Σ over placed words w of p:  tagPoints(g, tag(w)) + kink(g,w)

tagPoints(g,t) = +2 if t ∈ loves(g)   (LOVE_POINTS)
                 −3 if t = hates(g)   (HATE_POINTS)
                  0 otherwise (incl. glue words)
kink(g,w)      = +6 if w = kinkWord(g)  (KINK_BONUS, additive with tagPoints)
rapport(p,g)   = +2 / 0 / −1 for the player per response chosen in mingle
                 (0 if never talked; always 0 for rivals)
```

Duplicate words cannot exist in a declaration (satchel is a set). A guest's own kink word always also carries its tag, so for a guest who loves that tag it is worth 2 + 6 = **8**.

**Worked example:** Player chose Countess response A (rapport +2) and places, in order: `gently` (0) → `velvet` (FABRIC +2, running 4) → `corduroy` (FABRIC +2, kink +6, running 12). At 12 ≥ 7 with a strict lead, the Countess locks to the player. The same three words score Baron Bustle (rapport 0, loves FABRIC, kink is `sequined` not `corduroy`) at 0+2+2 = 4 — not yet locked. Placing `misted` later would score −3 with both (they hate DAMP).

### 7.2 Locking (exact)

- Guests evaluate every `NPC_EVAL_INTERVAL_MS` (1000 ms).
- A guest **locks** to declarant *p* when `score(p,g) ≥ LOCK_THRESHOLD (7)` **and** `score(p,g)` is strictly greater than every other declarant's score for *g*. If two declarants cross 7 in the same tick with equal scores, neither locks; the guest waits.
- Locked guests walk to that podium (200 px/s) and never re-evaluate. A lock is permanent even if a later word would have scored negatively.
- Unlocked guests hover near whichever declarant currently scores highest for them (≥1), telegraphing intent; at score ≤ 0 for all, they hover near the buffet.

### 7.3 End of ceremony

At timer = 0 (`CEREMONY_DURATION_S` = 75):

- Placement input disables instantly; a click in flight on tick 0 still counts (resolve input before the end-of-round evaluation).
- Each unlocked guest goes to the declarant with the strictly highest `score ≥ 1`. Ties broken by: (1) higher rapport, (2) earlier timestamp at which that score was reached, (3) buffet (counts for nobody). Guests with no score ≥ 1 go to the buffet.

### 7.4 Victory, prizes, edge cases

- **Win:** strictly most guests at your podium. **Draw:** tie for most → "Shared custody of the after-party" screen, counts as a draw, restart offered. **Lose:** any rival has strictly more.
- **Soulmate Prize:** any declarant (player or rival) finishing with *exactly one* guest gets the award — "You found your soulmate, you magnificent weirdo." Awarded independently of win/lose and shown as a badge on results. A soulmate finish while losing is framed as a moral victory (distinct results copy).
- **All-buffet round** (every guest at the buffet, only possible if everyone places hostile/no words): special lose screen — "The party politely disperses."
- Ringing the gong with fewer than 12 words or without talking to everyone is allowed (≥5 conversations is the only gate) — an intentional risk lever.
- Pausing freezes the ceremony timer, rival timers, and guest evaluation together (single sim clock).

---

## 8. Difficulty & progression

Single tuned difficulty for the prototype; no meta-progression. Challenge shape within a round:

- **Mingle** is pressure-free discovery (the learning half).
- **Ceremony** difficulty comes from rival pace and the 2 s placement cooldown: rivals collectively place ~1 word per 2.3 s, so hesitation visibly costs guests.
- Tuning knobs for playtests (all in section 12): `RIVAL_IQ` (0.4 easy / 0.65 default / 0.9 brutal), `LOCK_THRESHOLD`, `CEREMONY_DURATION_S`, `HATE_POINTS`, `SATCHEL_SIZE`.
- Replayability lever (free): rapport branches + which 5+ guests you meet change each run's viable strategies; `?seed=` shuffles rival IQ rolls and response-button order only (dialog content is static in P0).

---

## 9. Style & theme

- **Visual style:** flat vector, thick 3 px ink outlines, cartoon-Clue proportions (big heads, small bodies), every guest a simple geometric body + oversized long-nosed bird/animal mask. Candlelit-masquerade palette, gentle vignette. Comedy comes from deadpan staging, not gross-out.
- **Palette (hex):** background plum `#2B1B3D`, floor/panel ink `#1A1226`, wine red `#7B2D43`, candle gold `#D9A441`, cream `#F4E9D8`, teal accent `#3E8989`, mask white `#EDE6F2`. Collectible-word highlight: candle gold on cream. ⚑ (overridable)
- **Typography:** headers and speech bubbles in Georgia/serif (system, no webfont downloads); UI chrome in system-ui. Declaration banners in small-caps serif.
- **Tone/mood:** "Eyes Wide Shut as staged by the Muppets." Everyone is extremely dignified about extremely silly desires. All innuendo PG-13; the word bank contains zero explicit terms — the joke is specificity, not smut.
- **Reference points:** Clue (board-game box art) × Quiplash (word comedy) × Untitled Goose Game (polite menace).
- **Placeholder art plan (M0–M1):** guests are colored circles with triangle noses and name labels; podiums are rectangles; the gong is a yellow circle; words are plain buttons. All final art is SVG shapes drawn in code — no image assets ever.

---

## 10. Sound design

Implementation: **Web Audio API, all SFX synthesized in code** (jsfxr-style oscillator/noise envelopes; zero audio files). Audio context created only after the first user gesture (the Play click). **Mute toggle is P0**, persisted to `localStorage`.

| Game event | Sound description | Priority |
|---|---|---|
| Word collected | short bright pop (square blip, 60 ms, pitch up) | P0 |
| Word placed on banner | soft felt thunk (low sine, 80 ms) | P0 |
| Gong rung / ceremony start | big synthesized gong (detuned sines + noise, 2 s decay) | P0 |
| Guest locks to a podium | two-note chime; pitch rises with each guest you claim | P0 |
| Final 10 s of ceremony | metronome tick each second | P0 |
| Invalid action (full satchel, cooldown) | dull dud (100 Hz, 50 ms) | P0 |
| Response chosen | quill scribble (filtered noise, 150 ms) | P1 |
| Win fanfare / soulmate harp gliss / lose trombone | short synth stingers | P1 |
| Ballroom ambience | low murmur loop (filtered noise + sparse sine "clinks") | P1 |

Music: none in P0; P2 = generative waltz (3/4 arpeggio, two oscillators). Never any copyrighted tracks.

---

## 11. UI & screens

**Flow:** Splash → Party (mingle, with Conversation overlay) → Ceremony → Results → (restart → Splash or straight to Party).

**Splash screen (mandatory):**
- Title "THE VELVET GONG", one-liner: "Learn what the masked guests secretly want. Then tell them what *you* want — one word at a time."
- Rules in 5 bullets: (1) Talk to guests; click glowing words to steal them — max 12. (2) You get one reply per guest; flattery is remembered. (3) Each guest wants something *oddly specific* — listen for it. (4) When the gong rings, build your confession word by word; no take-backs. (5) Most guests at your podium wins. Exactly one guest = you found your soulmate.
- Controls line: "Mouse or touch only. M mute · Esc pause · R restart."
- Version number (e.g. `v0.1.0`) bottom-right, sourced from the single `VERSION` constant in `version.js` (splash and debug overlay both read it).
- One large "ENTER THE PARTY" button.

**Party HUD (always visible in mingle):** satchel (12 slots, count badge), conversations counter "Guests met: n/10 (gong at 5)", gong button, mute/pause/restart icons.

**Conversation overlay:** portrait + name + mask, scrollable transcript, collectible words glowing, 3 shuffled response buttons, "Politely disengage" button. Collecting with a full satchel opens a swap picker (choose a chip to discard or cancel).

**Ceremony HUD:** countdown (large, top), player tray (chips; cooldown shown as a radial wipe), 4 banners with declarations, guests visibly drifting/locking, per-podium guest count badges. No numeric scores shown (pillar 3) except under `?debug=1`.

**Results screen:** each declaration read back in full ("I YEARN TO BE gently scolded, taxidermied, moist custard"), guest tally per podium, winner banner or draw/lose copy, Soulmate badge if earned, "Same party again" (same seed) and "New party" (new seed) buttons, version number.

---

## 12. Config & tuning

Single exported object `CONFIG` in `js/config.js`. The entire game references these keys; rebalancing = editing this object.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `SATCHEL_SIZE` | 12 | words | mingle collection cap ⚑ |
| `MIN_CONVERSATIONS` | 5 | guests | gong unlock gate |
| `NPC_COUNT` | 10 | guests | roster size (data-driven) |
| `MAX_DECLARATION_WORDS` | 8 | words | banner cap per declarant |
| `PLACE_COOLDOWN_MS` | 2000 | ms | player placement pacing |
| `CEREMONY_DURATION_S` | 75 | s | ceremony length ⚑ |
| `LOCK_THRESHOLD` | 7 | points | guest lock trigger ⚑ |
| `LOVE_POINTS` | 2 | points | loved-tag word value |
| `HATE_POINTS` | -3 | points | hated-tag word value ⚑ |
| `KINK_BONUS` | 6 | points | kink-word bonus (additive) |
| `RAPPORT_GOOD` / `RAPPORT_NEUTRAL` / `RAPPORT_BAD` | 2 / 0 / -1 | points | response outcomes |
| `RIVAL_COUNT` | 3 | rivals | opponents ⚑ |
| `RIVAL_IQ` | 0.65 | 0–1 | greedy-vs-random rival placement |
| `RIVAL_PLACE_INTERVAL_S` | 7 | s | rival pace |
| `RIVAL_PLACE_JITTER_S` | 2 | s | ± uniform jitter on pace |
| `NPC_EVAL_INTERVAL_MS` | 1000 | ms | guest scoring tick |
| `TICK_WARNING_S` | 10 | s | final-countdown SFX window |
| `WALK_SPEED` / `GUEST_WALK_SPEED` | 300 / 200 | px/s | avatar/guest movement |
| `GLUE_WORDS` | gently, utterly, politely | list | free 0-point words |
| `SHOW_TAGS_IN_SATCHEL` | true | bool | tag visibility on collected chips ⚑ |
| `VERSION` | "0.1.0" | string | splash + debug overlay (lives in `version.js`) |

**URL flags:** `?seed=<int>` seeds all RNG (rival jitter/IQ rolls, response shuffle) for reproducible rounds — seed shown on results screen; `?debug=1` overlay (FPS, phase, live per-guest score matrix, lock log, cheat keys per section 5); `?skip=1` jumps straight to ceremony with a seeded 12-word satchel and +2 rapport with Countess and Magistrate (fast ceremony iteration); `?iq=0.9`, `?ceremony=120` override the matching config keys for playtests.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules), zero-build, DOM + inline SVG. No libraries, no bundler, no network calls.** This is a text-and-UI game with at most ~20 slowly moving figures: SVG gives crisp scalable cartoon shapes and free hit-testing on guests; DOM gives speech bubbles, word chips, and buttons with accessibility and touch handling for free; Canvas/Pixi would only add work. Audio is raw Web Audio (synthesized, no assets). Deployment = copy the folder to any static host; it already lives inside this site's `public/` tree so GitHub Pages serves it as-is. Perf budget: ≤ 20 animated SVG figures, ≤ 60 DOM word chips, one 1 Hz sim tick + one rAF render loop, results-screen confetti capped at 40 SVG particles — trivially 60 fps on a mid-range laptop. The sim core (scoring, locking, rival policy, RNG) is pure functions with no DOM references so it runs headless under Node for tests.

---

## 14. Milestones

**M0 — Toy loop.** *Goal: prove deduce-then-compose is fun with rectangles.*
Deliverables: hardcoded 4 guests + 1 rival; mingle as a plain list of transcripts with clickable words; ceremony as buttons + text banners; scoring/locking per section 7; end tally in plain text.
- [ ] A full round (mingle → gong → ceremony → tally) is playable start to finish with placeholder text/rectangles.
- [ ] Clicking a word in a transcript adds it to a visible satchel; cap enforced with swap.
- [ ] Guests lock per the exact rules (threshold 7, strict lead, permanent) and the tally reflects it.
- [ ] The rival places words on its timer and can beat an idle player.
- [ ] Sim core runs headless: a Node test script replays a scripted round and asserts final guest assignments.
*Proves: the core loop. If composing a targeted confession isn't already amusing here, stop.*

**M1 — Real rules.** *Goal: full P0 content and ruleset.*
Deliverables: all 10 guests with full dialog trees and rapport; all 3 rivals with banks and IQ policy; glue words; gong gate; soulmate prize; draw/all-buffet edge cases; splash screen (rules, controls, version), HUD, pause/mute/restart; results screen with full read-back.
- [ ] All 10 conversations playable; every kink word is collectible from exactly 2 other guests (asserted by a data-validation test).
- [ ] A first-time player understands what to do within 60 seconds unprompted (splash bullets suffice).
- [ ] Win, draw, lose, soulmate, and all-buffet outcomes all reachable and correctly detected.
- [ ] One response per guest enforced; rapport affects ceremony math (verifiable via `?debug=1` matrix).

**M2 — Feel.** *Goal: it looks and sounds like a party.*
Deliverables: SVG ballroom + masked-guest art per section 9 palette; guest walk/hover animation; banner word tweens; P0 SFX table + mute persistence; lock chime pitch ladder; final-10-seconds tick; results confetti (≤ 40 particles).
- [ ] Guests visibly drift toward their current favorite before locking (intent telegraphing readable in playtest).
- [ ] All P0 sounds fire; audio only starts after user gesture; mute persists across reloads.
- [ ] Stable 60 fps during ceremony with all 10 guests moving (Chrome devtools check on a mid-range laptop).

**M3 — Playtest build.** *Goal: shareable, reproducible, tunable.*
Deliverables: `?seed`, `?debug=1`, `?skip=1`, `?iq`, `?ceremony` all functional; seed shown on results; deployed via this repo's static hosting at `/games/cocktail-party/`; P1 features if time allows (conversation journal, response-scribble/win/lose stingers, ambience loop).
- [ ] Two runs with the same seed and same player inputs produce identical outcomes.
- [ ] Game is live at the static URL and playable on a phone (tap-only run-through completes).
- [ ] A rebalance (e.g. `LOCK_THRESHOLD` 7→9) requires editing only `config.js`.

Every milestone leaves the game runnable.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is `SATCHEL_SIZE` 12 the right curation pressure, or should it be the source's 15? Knob: `SATCHEL_SIZE`.
2. **(non-blocking — resolve in playtest)** Is `HATE_POINTS` −3 too punishing for experimentation, given placements are irreversible? Knob: `HATE_POINTS`.
3. **(non-blocking — resolve in playtest)** Explicit kink confessions ("...corduroy...") vs oblique riddles ("ribbed, dependable..."): does explicit make deduction too easy? Content-only change; test with `SHOW_TAGS_IN_SATCHEL=false` as a proxy for a harder deduction mode.
4. **(non-blocking — resolve in playtest)** Should the mingle phase have a soft timer to add pressure, or does self-pacing feel better? If needed, add `MINGLE_TIMER_S` (0 = off) — currently intentionally absent from P0.
5. **(non-blocking — resolve in playtest)** Do rivals need visible mingle-phase presence (ambient chatting) for the ceremony rivalry to land emotionally, or is podium-only fine? P2 flavor either way.

No blocking questions. Build from this document as written.

---

## 16. Handoff notes for Fable

- **Build order:** headless sim core (`rng.js` → word/guest data in `npcs.js` → `scoring.js` → `rivals.js` → phase state machine) → Node test script for a scripted round → DOM mingle UI → ceremony UI + rAF loop → results/splash/HUD chrome → audio → art pass.
- **Keep headless-testable:** everything in `js/sim/` must import no DOM/browser globals. Unit tests to write first: `score(p,g)` worked example from section 7.1; lock rule (threshold + strict-lead + simultaneous-cross stalemate); end-of-round tie-break chain; data validation that each kink word appears collectible in exactly 2 other guests' dialogs and every word has exactly 1 tag.
- **File layout (also the deployable output — zero-build, no dist step):**

```
public/games/cocktail-party/
├── design.md            (this document)
├── index.html           (splash + all screens; loads main.js as module)
├── css/style.css
└── js/
    ├── version.js       (export const VERSION = "0.1.0")
    ├── config.js        (export const CONFIG = { ... section 12 ... })
    ├── main.js          (boot, URL flags, screen router)
    ├── sim/
    │   ├── rng.js       (seeded PRNG, e.g. mulberry32)
    │   ├── npcs.js      (10 guests: dialog trees, tags, loves/hates/kinks — pure data)
    │   ├── rivals.js    (banks + placement policy)
    │   ├── scoring.js   (score, lock, tie-break, round resolution)
    │   └── state.js     (phase machine: MINGLE→CEREMONY→RESULTS; single sim clock, pause-aware)
    ├── ui/
    │   ├── party.js     (ballroom SVG, guest sprites, walk anim)
    │   ├── convo.js     (overlay, word collection, satchel/swap)
    │   ├── ceremony.js  (tray, banners, countdown, guest drift)
    │   └── results.js
    ├── audio.js         (Web Audio synth SFX, mute persistence)
    └── debug.js         (?debug=1 overlay + cheat keys)
```

- **All authored content in section 6.5 is final P0 data** — transcribe dialog verbatim into `npcs.js`; the `[bracketed]` words are the collectible set, italic *desire words* are non-collectible kink hints. Run the data-validation test before building UI on top.
- **Reminder:** prove the loop with plain text and rectangles (M0) before touching SVG masks or synth gongs — if targeting a confession at the Magistrate isn't fun in ugly buttons, art won't save it. Ship every milestone runnable.
