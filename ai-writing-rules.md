# How not to sound like AI wrote it

Rules for writing prose on this site (blog posts, project excerpts, page copy) so it doesn't read as if a language model produced it. Distilled from the Wikipedia article [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

Two audiences:

- **Steven**, writing fresh content. Use this as a sanity-check pass after a first draft.
- **Claude / any LLM helping with this repo.** Any excerpt, paragraph, or rewritten content generated for this site MUST pass the self-check at the end of this file before being returned.

Quick rule of thumb: write like you talk. Short. Concrete. Specific to the thing in front of you. No salesperson voice, no museum-plaque voice, no LinkedIn voice.

---

## 1. Banned words and phrases

If the word appears in a draft, replace it. The list is alphabetized within each group. None of these are technically wrong — they're just so over-used by LLMs that a reader pattern-matches them as AI before they finish the sentence.

### 1a. Lexical tells (the LLM vocabulary)

| Avoid | Why | Use instead |
|---|---|---|
| boasts | sales voice | has |
| bolstered | LLM filler | strengthened, helped |
| crucial | overused | important, needed, key |
| delve | LLM signature word | look at, dig into |
| embark (on a journey) | metaphor cliché | start |
| emphasizing / underscoring / highlighting | filler "-ing" | (cut the phrase) |
| enduring | sales voice | lasting, long-running |
| enhance | sales voice | improve, make better |
| essential | overused | needed, required |
| foster | LLM filler | grow, build, help |
| garner | LLM signature | get, attract |
| harness | metaphor cliché | use |
| holistic | management-speak | whole, complete |
| in conclusion / in essence / it is worth noting | filler frame | (cut) |
| intricate / intricacies | overused | detailed, fiddly, the details |
| key (as adjective) | filler | main, important |
| landscape (metaphorical) | LLM cliché | field, area, world |
| leverage (verb) | management-speak | use |
| meticulous / meticulously | LLM signature | careful, by hand |
| multifaceted | LLM filler | many-sided, complicated |
| navigate (metaphorical) | LLM cliché | get through, deal with |
| notably | filler | (cut) |
| paramount | overused | top, most important |
| pivotal | overused | important, turning-point |
| profound | sales voice | deep, big |
| realm (metaphorical) | LLM cliché | field, area |
| robust | overused | strong, solid, reliable |
| seamless | sales voice | smooth, no-friction |
| showcasing | sales voice | showing |
| tapestry | LLM signature | mix, range, set |
| testament (to) | LLM signature | shows, proves |
| transformative | sales voice | big change, game-changing (if you must) |
| ultimately | filler | (cut, or "in the end") |
| underscore | overused | shows, points out |
| unleash | sales voice | release, let loose |
| vibrant | LLM signature | (be specific — say what color, what energy) |

### 1b. Promotional adjectives

If the sentence would read fine without the adjective, drop it. The adjective is almost always the AI tell, not the noun.

`breathtaking`, `captivating`, `cutting-edge`, `game-changing`, `immersive`, `revolutionary`, `rich`, `state-of-the-art`, `stunning`, `vast`, `world-class`

### 1c. Vague attribution (weasel words)

LLMs love invoking unspecified authorities. Cite a specific source or cut the claim.

- "many experts believe …" → name the expert, or cut
- "studies have shown …" → cite the study, or cut
- "it is widely known that …" → cut
- "in recent years …" → say which years
- "industry reports suggest …" → name the report

---

## 2. Structural tells

### 2a. Negative parallelism — "not just X but Y"

LLMs use this to feel rhetorical. It's almost always padding.

- ❌ "This is not just a coffee table but a topographical sculpture."
- ✅ "This coffee table's surface is a topographical sculpture."

Same goes for "more than just a Z, it is a W" — pick one description and stick with it.

### 2b. Rule of three

Three adjectives, three phrases, three bullets that all start the same way. Fine when the three things are genuinely distinct. AI tell when they're rhythmic filler.

- ❌ "fast, reliable, and scalable" (three flavors of "good")
- ✅ "fast on the bench, slow over the network" (real contrast)

### 2c. "X serves as / stands as / represents Y" instead of "X is Y"

LLMs avoid the verb "to be." Don't.

- ❌ "The mask serves as a tribute to low-poly design."
- ✅ "The mask is a low-poly design."

Same for `boasts`, `features`, `offers`, `maintains` replacing `has`.

### 2d. Em-dash overuse

LLMs reach for the em-dash whenever they want a rhetorical pivot. Cap yourself at one em-dash per ~300 words. A period or a comma usually works.

### 2e. Title-case headings

The site convention is **sentence case** — capitalize the first word and proper nouns only.

- ❌ "How To Build A Fox Mask With LEDs"
- ✅ "How to build a fox mask with LEDs"

### 2f. Rigid outline shape

If your draft looks like (a) intro paragraph that previews three points, (b) three bulleted sections each starting with a **bold lead-in**, (c) conclusion that restates the intro — rewrite it. That shape is the strongest AI tell at the document level.

### 2g. Elegant variation

Cycling synonyms for the same noun across a paragraph (the project / the build / the endeavor / the undertaking). Real writers repeat words. Pick one noun, repeat it.

### 2h. Sentence-length monotony

The long-medium-short cadence repeated every paragraph reads as AI rhythm. Vary it, or just don't think about it and write naturally.

---

## 3. Rules for excerpts (Track 2 of the cleanup)

Frontmatter excerpts on this site follow these extra rules:

1. **One sentence.** ≤160 characters. Trailing period optional.
2. **Present tense.** "A coffee table whose surface is a CNC-milled topographical map." Not "I built a coffee table…"
3. **Name the artifact, not the reading experience.**
    - ❌ "Exploring the intersection of furniture and cartography."
    - ✅ "A coffee table whose surface is a CNC-milled topographical map of Vancouver."
4. **No meta-phrases.** Banned: "this post", "this project", "an exploration of", "a deep dive into", "a look at", "a journey through".
5. **No emoji.**
6. **No banned words from section 1.** The excerpt is short — one tell ruins it.

---

## 4. Five do/don't examples (from this site's domain)

**Project: Blinky the Fox Head Mask**

- ❌ "A captivating low-poly fox mask that boasts a vibrant array of LEDs, showcasing the intricate interplay of art and electronics."
- ✅ "A low-poly fox-head mask covered in addressable LEDs that runs animated patterns."

**Project: Thread Map of Vancouver**

- ❌ "A pivotal project that underscores the rich tapestry of urban movement through the meticulous craft of thread and laser-cut wood."
- ✅ "A laser-cut map of Vancouver with a year of GPS tracks pulled tight in coloured thread."

**Project: Vancouver City Parks**

- ❌ "Embarking on a transformative journey to visit every park in Vancouver, capturing the vibrant landscape of the city's green spaces."
- ✅ "Visited every Vancouver city park during COVID and took a selfie at each one."

**Idea post**

- ❌ "Delving into the intricate world of habit tracking to foster meaningful daily change."
- ✅ "A wall-mounted monthly habit tracker — one row per habit, one column per day, magnets for the marks."

**Maker Faire writeup**

- ❌ "A testament to the vibrant maker community, this showcase highlights the pivotal role of collaboration."
- ✅ "Notes from Vancouver Mini Maker Faire 2017 — what worked, what broke, what kids liked."

---

## 5. Self-check checklist

Before returning any generated paragraph or excerpt, run this checklist. Any "no" means rewrite.

1. ☐ No words from section 1a (lexical tells) appear.
2. ☐ No promotional adjectives from section 1b appear unmodified.
3. ☐ No vague attribution from section 1c.
4. ☐ No "not just X but Y" / "more than just" construction.
5. ☐ Em-dash count ≤ 1 per ~300 words.
6. ☐ Headings (if any) are sentence case.
7. ☐ Verb "to be" is used where it would naturally fit — not replaced with "serves as", "stands as", "represents", "boasts", "features", "offers".
8. ☐ The same noun is repeated when referring to the same thing — no synonym cycling.
9. ☐ For excerpts: one sentence, ≤160 chars, present tense, names the artifact, no meta-phrases, no emoji.
10. ☐ It sounds like something Steven would actually say out loud.

If a draft fails item 10 and passes 1–9, item 10 wins. The rules above are the common patterns; voice is the final filter.
