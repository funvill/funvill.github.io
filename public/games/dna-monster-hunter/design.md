# Splice & Prey — Game Design Document

> Source idea: [Game Idea 11 - DNA Monster Hunter (Theme: Contemporary Epic Fantasy)](/game-idea-11-dna-monster-hunter-theme-contemporary-epic-fantasy)

---

## 1. Title & one-liner

**Working title:** *Splice & Prey*

**Alternates:**
- *Gene Hunter*
- *CRISPR Beasts*
- *Helix Hunt*
- *Wild Sequence*

**One-sentence description:** A single-screen creature-collector where you send your monster to hunt wild monsters, harvest the losers' genes, and splice those genes into a stronger monster to hunt the next, tougher target.

**Genre:** Turn-based auto-battler / breeding-progression roguelite (single-player, browser).

**Elevator pitch:** In a post-apocalyptic world where gene editing is a common trade, you are a Splicer who survives by hunting the monsters that roam outside the safe cities. You don't level up a hero — you *build* one, gene by gene. Every monster you defeat drops DNA fragments; every fragment can be spliced into your active creature to raise a stat or install a trait. The core tension is a deckbuilder's tension made biological: do you splice for raw power now, or hold rare genes for a creature that can survive the boss three hunts from now? Each hunt is a fast auto-resolved fight you can read at a glance; the *real* game is the choice of what to become between fights.

**Adaptation choice (one sentence):** The source is a huge open-world monster-collecting RPG; I have cut the open world, real-time combat, city/economy, and inventory-management entirely, reducing it to a linear ladder of ~10 escalating hunts driven by a single deep splice-and-stats system — because the untested fun is "hunt → harvest → splice → hunt harder," and that loop needs no map to prove.

---

## 2. Fun hypothesis

**The single question this prototype answers:**

> Is it satisfying to defeat a monster, harvest its genes, and splice them into your own monster to beat a tougher monster — such that the *splice decision between fights* is the compelling part?

Everything in P0 serves testing this. If players find themselves genuinely torn over which gene to splice, and feel a rush when a build they engineered wins a fight it "shouldn't" have, the hypothesis is confirmed.

**Playtest questions (ask after a session):**
1. When you were choosing which gene to splice, did the decision feel meaningful, or obvious/random?
2. Did any single hunt make you go "I need to change my build before I try that again"?
3. Did you ever intentionally *not* splice a gene, saving genes or a slot for later? (This indicates the strategic layer is alive.)
4. When you won a hard fight, did it feel like your splice choices earned it — or like luck?
5. At what hunt number did you either win the run or quit out of boredom/frustration?

---

## 3. Design pillars

1. **The splice is the game.** Combat exists to feed the splice decision and to test its outcome. Any effort spent making combat deeper than "readable and fair" is misspent — spend it on making splice choices richer.
2. **Every fight changes your monster.** The player must never return to the same build twice unless they chose to. Progression is visible, biological, and reversible-at-a-cost.
3. **Escalation you can feel.** Each hunt is meaningfully harder than the last, and the player should *see* why (bigger numbers, a nasty trait) before committing to fight it.
4. **Legible at a glance.** Stats, traits, gene effects, and fight outcomes are all readable in seconds. No hidden math. A player should be able to predict a fight's likely winner and be surprised only by variance they understand.

---

## 4. Core game loop

A run is a ladder of hunts. Each hunt is one loop iteration.

**Phases:**

1. **SCOUT (choose target)** — Player sees 2–3 available wild monsters as cards, each showing name, stats, traits, and the genes it will drop. Player picks one to hunt. *Feels:* sizing up a risk/reward menu.
2. **HUNT (auto-battle)** — Player's active monster fights the chosen wild monster. Combat auto-resolves turn by turn with a readable log/animation. Player watches; the only input is speed/skip. *Feels:* tense spectator; "did my build hold up?"
3. **HARVEST (collect genes)** — On victory, the defeated monster's genes drop into the player's Gene Bank. On loss, the run's health is docked (see §7) and no genes drop. *Feels:* payoff / loot.
4. **SPLICE (build)** — Player opens the Splice Lab: their active monster has stat values and a fixed number of **trait slots**. Player spends genes from the Bank to raise stats or install/replace traits. This is the decision-dense phase. *Feels:* the core puzzle.
5. **Repeat** — Return to SCOUT with a stronger monster against a tougher pool. Every ~3rd hunt is a **mini-boss**; the final (10th) is the **big bad**.

```
        +---------------------------------------------+
        |                                             |
        v                                             |
  [ SCOUT ]  pick a target from 2-3 wild cards        |
        |                                             |
        v                                             |
  [ HUNT ]   auto-battle: your monster vs target      |
        |                                             |
     win?  --no--> lose HP; no genes  ---------------->+
        |yes                                          |
        v                                             |
  [ HARVEST ] target's genes -> Gene Bank             |
        |                                             |
        v                                             |
  [ SPLICE ]  spend genes: raise stats / set traits   |
        |                                             |
        +----------- stronger monster ----------------+

  Ladder: hunts 1-10. Hunt 3,6 = mini-boss. Hunt 10 = big bad.
  Win the run by defeating the big bad. Lose by running out of run-HP.
```

**Session length target:** A full run of ~10 hunts = **6–9 minutes**. A single hunt (scout+watch+splice) ≈ 30–60 seconds.

---

## 5. Inputs & controls

The entire game is **click/tap-driven menus plus a spectated battle**. There is no twitch input, so it is **fully touch-viable** — every control is a button or card tap. Keyboard shortcuts are conveniences layered on top.

| Action | Desktop (mouse) | Desktop (keyboard) | Touch |
|---|---|---|---|
| Select hunt target | Click monster card | `1` / `2` / `3` | Tap card |
| Confirm hunt | Click **HUNT** button | `Enter` | Tap button |
| Speed up / skip battle | Click **▶▶** | `Space` (hold = fast) | Tap **▶▶** |
| Splice a gene into stat/slot | Click gene → click target | arrow keys + `Enter` to navigate | Tap gene → tap target |
| Discard a gene | Click gene → **Discard** | `Del` on selected | Tap gene → Discard |
| Confirm splice / proceed | Click **DONE** | `Enter` | Tap **DONE** |
| Open/close monster detail | Click monster portrait | `Tab` | Tap portrait |
| Pause | Click ⏸ | `Esc` | Tap ⏸ |
| Mute / unmute | Click 🔊 | `M` | Tap 🔊 |
| Restart run | Click **Restart** (in pause/end screen) | `R` | Tap button |

No input is undocumented. Pause, mute, and restart are all present.

---

## 6. Game elements

### 6.1 Player monster (the "active creature")
- **Placeholder art:** a rounded rectangle in the player accent color, with an emoji "core" (🧬) and small colored pips around the border, one pip per installed trait. Stat bars beneath.
- **Final art:** a chunky flat-vector blob-beast whose silhouette parts (horns, fins, plating) swap in as traits are installed — see §9.
- **Behavior:** does not act on the player's direct command during battle; the sim resolves its turns from its stats+traits. It persists across the whole run.
- **Config keys:** `player.startStats`, `player.traitSlots`, `player.startTraits`.
- **Interacts with:** genes (splice target), wild monsters (combatant), run-HP (see §7).

### 6.2 Wild monsters (hunt targets)
- **Placeholder art:** rounded rectangle in a per-species hue, emoji face, stat bars, trait pips, and a small "drops" row of gene chips.
- **Final art:** flat-vector beasts, one silhouette per bestiary entry.
- **Behavior:** static until hunted; in battle they act via the same sim rules as the player. Defined by the bestiary (§6.6).
- **Config keys:** entries in `bestiary[]`; pool selection via `ladder[]`.
- **Interacts with:** player monster (combat), Gene Bank (drops on defeat).

### 6.3 Genes (the currency & the build material)
Each gene is a typed chip. A gene does exactly one of two things when spliced:
- **Stat gene** — permanently adds to one stat (e.g. `+8 ATK`).
- **Trait gene** — installs a named trait into a trait slot (replacing whatever was there).

- **Placeholder art:** small pill/chip, colored by gene family, with a label like `+8 ATK` or `🔥 Pyro`.
- **Final art:** a stylized base-pair chip (A/T/C/G motif) tinted by family.
- **Behavior:** sits in the Gene Bank until spliced or discarded. Genes are consumed on splice.
- **Config keys:** `genes.statGenes[]`, `genes.traits[]`, `bank.maxSize`.
- **Interacts with:** player monster (splice target), Gene Bank (storage cap).

### 6.4 Gene Bank
- **Placeholder/final art:** a horizontal tray of gene chips with a count `x / MAX`.
- **Behavior:** stores harvested genes. Capped at `bank.maxSize` (default 12). If full at harvest, the player must discard before continuing — this forces the "hold vs. use" tension.
- **Config keys:** `bank.maxSize`.

### 6.5 Trait slots
- The player monster has a fixed number of **trait slots** (default 3). Installing a trait into a full set of slots means *replacing* an existing trait — that trait (and its gene) is lost. This is the core scarcity that makes trait choice matter.
- **Config keys:** `player.traitSlots`.

### 6.6 The Bestiary (starter set — 12+ monsters)

Stats: **HP** (health), **ATK** (attack power), **DEF** (damage reduction), **SPD** (turn order + extra-turn chance). Traits are named abilities resolved by the sim (defined in §6.7). "Drops" lists the genes harvested on defeat (1–3 per monster). Monsters are placed on the ladder by `tier`.

| # | Name | Tier | HP | ATK | DEF | SPD | Traits | Drops (genes) |
|---|------|------|----|----|----|----|--------|---------------|
| 1 | Gnawmoth | 1 | 40 | 10 | 2 | 6 | — | `+6 HP`, `+3 ATK` |
| 2 | Skittermite | 1 | 30 | 8 | 1 | 12 | Swift | `+4 SPD`, 🦿 Swift |
| 3 | Barkhound | 1 | 55 | 9 | 6 | 5 | Thick Hide | `+8 HP`, 🛡️ Thick Hide |
| 4 | Emberpup | 2 | 45 | 13 | 3 | 8 | Pyro | `+5 ATK`, 🔥 Pyro |
| 5 | Sludgeback | 2 | 70 | 10 | 8 | 3 | Regen | `+10 HP`, ♻️ Regen |
| 6 | Glasswing | 2 | 40 | 15 | 2 | 14 | Swift, Frenzy | `+4 SPD`, ⚔️ Frenzy |
| 7 | **Ironmaw** (mini-boss) | 3 | 110 | 16 | 12 | 5 | Thick Hide, Thorns | `+12 HP`, 🌵 Thorns, `+5 DEF` |
| 8 | Voltstag | 3 | 65 | 20 | 4 | 11 | Pyro, Frenzy | `+7 ATK`, 🔥 Pyro |
| 9 | Cryoleech | 3 | 80 | 14 | 6 | 7 | Lifesteal | `+9 HP`, 🩸 Lifesteal |
| 10 | Rendclaw | 4 | 75 | 24 | 5 | 12 | Frenzy, Crit Fang | `+8 ATK`, 🗡️ Crit Fang |
| 11 | Mirebeast | 4 | 130 | 18 | 14 | 4 | Thick Hide, Regen | `+6 DEF`, ♻️ Regen, `+12 HP` |
| 12 | **Gravewarden** (mini-boss) | 5 | 160 | 22 | 16 | 6 | Thorns, Lifesteal | 🩸 Lifesteal, `+8 DEF`, `+10 ATK` |
| 13 | Ashphoenix | 5 | 120 | 28 | 8 | 13 | Pyro, Frenzy, Regen | `+10 ATK`, 🔥 Pyro, ♻️ Regen |
| 14 | Nullhydra | 6 | 150 | 26 | 12 | 9 | Crit Fang, Lifesteal, Swift | 🗡️ Crit Fang, `+12 HP`, `+8 ATK` |
| 15 | **CHIMERA PRIME** (big bad) | 7 | 260 | 34 | 18 | 11 | Frenzy, Thick Hide, Lifesteal, Thorns | (run win — no drops) |

The player's **starter monster** ("Splice-01") begins at HP 50 / ATK 10 / DEF 3 / SPD 7, with **0 traits** and 3 empty trait slots (`player.startStats`, `player.traitSlots`).

### 6.7 Traits (the ability set)

Each trait has a single, sim-resolvable effect. Values are config keys under `traits.*`.

| Trait | Icon | Effect | Config key |
|-------|------|--------|-----------|
| Swift | 🦿 | +2 effective SPD for turn order; does not stack past 1 copy | `traits.swift.spdBonus` = 2 |
| Thick Hide | 🛡️ | Incoming damage reduced by a flat 3 (after DEF) | `traits.thickHide.flatReduce` = 3 |
| Pyro | 🔥 | On hit, deal +25% of ATK as bonus burn damage | `traits.pyro.burnPct` = 0.25 |
| Regen | ♻️ | Heal 5 HP at the start of each of your turns | `traits.regen.healPerTurn` = 5 |
| Frenzy | ⚔️ | +15% ATK when below 50% HP | `traits.frenzy.atkPct` = 0.15 |
| Thorns | 🌵 | Reflect 20% of damage taken back to attacker | `traits.thorns.reflectPct` = 0.20 |
| Lifesteal | 🩸 | Heal for 20% of damage you deal | `traits.lifesteal.healPct` = 0.20 |
| Crit Fang | 🗡️ | 25% chance to deal double damage on a hit | `traits.critFang.chance` = 0.25 |

Duplicate traits do **not** stack (installing a trait you already have is blocked in UI). This keeps the effect space legible and pushes players toward diverse builds.

---

## 7. Rules, win & lose conditions

### 7.1 Combat resolution (the sim)
Battle is **turn-based auto-resolved**, deterministic given the seed. One battle:

1. **Turn order:** each round, the combatant with higher effective SPD (base SPD + Swift bonus) acts first. Tie → player acts first.
2. **A turn = one attack.** Damage formula:
   ```
   raw   = attackerATK  (× 2 if Crit Fang procs; + Frenzy bonus if <50% HP)
   dealt = max(1, raw - defenderDEF - defenderThickHideFlat)
   ```
   Then apply Pyro burn (added to dealt), Lifesteal (heal attacker), Thorns (reflect to attacker), and Regen (at start of the actor's turn).
3. **Extra turn:** if the actor's effective SPD ≥ `combat.extraTurnSpdGap` (default 6) higher than the opponent's, they immediately take a second attack this round.
4. **Round loop** continues until one combatant's HP ≤ 0.
5. **Turn cap:** if `combat.maxTurns` (default 60) is reached, the combatant with the higher **remaining HP percentage** wins (prevents infinite Regen/Thorns stalls).

All randomness (Crit Fang, tie-breaking noise) draws from the seeded RNG so a given `?seed=` reproduces the whole run.

### 7.2 Run-HP (the loss meter)
The player has a **run-level HP pool** separate from the monster's battle HP. Default `run.startHP` = 3 ("stability charges").
- **Win a hunt:** proceed, harvest genes. Run-HP unchanged.
- **Lose a hunt:** lose 1 run-HP; the target is NOT removed (player may re-scout and try a different target after splicing more). No genes harvested from a loss.
- **Run-HP reaches 0:** run over — **defeat**.

The monster's battle HP is fully restored between hunts (it's `HP` stat, not a persistent wound) — persistence lives in stats/traits, not attrition. This keeps the focus on build decisions, not healing management.

### 7.3 Win condition
Defeat **CHIMERA PRIME** (hunt 10 / the big bad) → **run victory**. Show run summary (hunts won, genes spliced, final build, seed).

### 7.4 Lose condition
Run-HP hits 0 before the big bad is defeated → **defeat**. Show same summary with a "Try again" affordance.

### 7.5 Scoring
Score = `(hunts won × 100) + (final total stats) + (run-HP remaining × 250)`. Displayed on the end screen; used only for the player's own bragging/comparison (no leaderboard — static hosting).

### 7.6 Edge cases
- **Turn cap reached with equal HP%:** player wins ties (player-favored, avoids frustrating draws).
- **Gene Bank full at harvest:** harvested genes queue on a "pending" tray; player must discard from Bank or discard the pending genes before leaving Harvest.
- **Installing a trait with all slots full:** UI requires the player to pick which existing trait to overwrite; the overwritten trait is destroyed.
- **Simultaneous lethal (Thorns/Pyro kills attacker as they land a killing blow):** the combatant whose turn it currently is resolves their damage first; if both drop to ≤0, the **acting** combatant is considered to have struck first and wins.
- **All three scouted targets already too hard:** player may still fight (no "skip"); losing costs run-HP. There is always at least one tier-appropriate target in the pool (see §8).
- **Splice with an empty Bank:** SPLICE phase is skippable via **DONE**; nothing forces a splice.

---

## 8. Difficulty & progression

**Within a run:** the ladder scales monster tiers upward. Scout pool for hunt *N* is drawn from `ladder[N]`, which lists eligible bestiary tiers. Every 3rd hunt forces a mini-boss into the pool; hunt 10 is the fixed big bad.

Ladder (default `ladder[]`):

| Hunt | Pool (tiers offered, pick 1 of ~3) | Forced |
|------|-----------------------------------|--------|
| 1 | tier 1 | — |
| 2 | tier 1–2 | — |
| 3 | tier 2–3 | **Ironmaw (mini-boss)** |
| 4 | tier 2–3 | — |
| 5 | tier 3–4 | — |
| 6 | tier 4–5 | **Gravewarden (mini-boss)** |
| 7 | tier 4–5 | — |
| 8 | tier 5–6 | — |
| 9 | tier 5–6 | — |
| 10 | — | **CHIMERA PRIME (big bad)** |

The scout pool always contains at least one target no more than 1 tier above the player's "power budget" so a stuck player has a legitimate (if risky) climb path. ⚑ (overridable): pool always offers 3 cards; if fewer distinct eligible monsters exist, duplicates with a small `±10%` stat jitter fill the slots.

**Single tuned difficulty** for the prototype. All challenge scaling lives in `ladder[]`, `bestiary[]` numbers, and `run.startHP`. No separate easy/hard modes — a coding agent can rebalance by editing config.

---

## 9. Style & theme

**Visual style:** flat vector, thick dark outlines, chunky rounded shapes, limited palette. Think "biotech field guide crossed with a Saturday-morning creature cartoon." Monsters are simple blob-beast silhouettes; the UI reads like a rugged handheld gene-sequencer device.

**Palette (hex):**

| Role | Hex | Use |
|------|-----|-----|
| Background deep | `#0E1B2A` | app background |
| Panel | `#16293D` | cards, trays |
| Ink / outline | `#0A121C` | outlines, text on light |
| Player accent | `#39D98A` (helix green) | player monster, splice highlights |
| Enemy accent | `#FF6B5E` (danger coral) | wild monster, damage |
| Gene: stat family | `#4EA8FF` (blue) | stat genes |
| Gene: trait family | `#C08CFF` (violet) | trait genes |
| Warning / boss | `#FFC24B` (amber) | boss framing, alerts |
| Text light | `#EAF2FB` | primary text |
| Text muted | `#8199B3` | secondary text |

**Typography:** a single geometric sans for everything (system stack: `"Segoe UI", Inter, system-ui, sans-serif`), monospace (`ui-monospace, "Courier New", monospace`) for numbers/stats and the battle log to reinforce the "readout" feel. Big bold numbers; ALL-CAPS labels for phase headers.

**Tone/mood:** pulpy, slightly grim, playful — survival with a grin. The world ended, but gene-hacking beasts is a *job* now and you're getting good at it.

**Reference points:** *Slay the Spire*'s card-choice cadence meets *Pokémon*'s collect-and-build meets the readable auto-combat of *Super Auto Pets*.

**Placeholder art plan (M0–M1):** everything is CSS/`div`-based rounded rectangles, emoji, and colored pills. Monsters = colored rounded rects + an emoji face + stat bars (colored `div` widths) + trait pips. Genes = colored pill chips with text labels. No image assets until M2, where flat-vector SVG monster silhouettes replace the rectangles (drawn inline as SVG paths, no external files).

---

## 10. Sound design

All SFX **synthesized in code** (Web Audio API via a tiny jsfxr-style generator) — zero audio asset files. Mute toggle is P0. Audio context is created/resumed only on the first user gesture (the Play click), satisfying autoplay policy.

**SFX event table:**

| Event | Sound | Priority |
|-------|-------|----------|
| Button / card click | short tick | P0 |
| Hunt begins | rising two-note sting | P0 |
| Attack lands (normal) | dull thud | P0 |
| Crit Fang / big hit | sharp crack + slight pitch-up | P0 |
| Monster defeated | descending "power-down" tone | P0 |
| Gene harvested | bright pluck / coin-like blip | P0 |
| Splice applied | ascending "power-up" arpeggio | P0 |
| Hunt won / hunt lost | victory jingle / low buzz | P1 |
| Boss appears | ominous low drone hit | P1 |
| Run victory | short triumphant motif | P1 |

**Music:** none for P0. P2 optional: a single generative low-tempo ambient pad built from Web Audio oscillators (no copyrighted tracks, ever).

**Implementation:** vanilla Web Audio API, one `SoundManager` module with a `play(name)` API and a global mute flag persisted to `localStorage`. Synth parameters live in config so a coding agent can retune without touching logic.

---

## 11. UI & screens

**Screen flow:**
```
[SPLASH] --Play--> [HUNT SCREEN loop] --run ends--> [END SCREEN] --Restart--> [SPLASH]
                        |  ^
                (Pause) v  | (Resume)
                     [PAUSE OVERLAY]
```

### 11.1 Splash screen (mandatory)
- **Title:** "SPLICE & PREY" + one-line pitch: *"Hunt monsters. Harvest their genes. Splice a stronger you. Hunt harder."*
- **Rules & goal (≤5 bullets, 20-second read):**
  1. Pick a wild monster to hunt. Your monster auto-battles it.
  2. Win → harvest its genes. Lose → lose a stability charge.
  3. Splice genes to raise stats or install traits (3 trait slots).
  4. Each hunt gets tougher. Bosses every 3rd hunt.
  5. Beat CHIMERA PRIME to win. Lose all charges and it's over.
- **Controls:** shows desktop (click / number keys / Space / M / Esc) and touch (tap) rows.
- **Version number:** rendered from a single `VERSION` constant (e.g. `v0.1.0`), bottom corner. Same constant feeds the debug overlay.
- **Play affordance:** one large **▶ PLAY** button.

### 11.2 Hunt screen (main play surface)
Single screen, phase-driven regions:
- **Top HUD (always visible):** run-HP (♦ pips), hunt number `Hunt 3 / 10`, score-in-progress, ⏸ pause, 🔊 mute, `Gene Bank x/12`.
- **Left/center:** the active phase panel — SCOUT shows 3 target cards; HUNT shows the two combatants + a monospace battle log + ▶▶ speed button; HARVEST shows dropped gene chips flying to the Bank; SPLICE shows the player monster's stats/slots + the Gene Bank tray with drag/click-to-apply.
- **Bottom bar:** the primary action button for the current phase (**HUNT**, **▶▶ / SKIP**, **CONTINUE**, **DONE**).

### 11.3 Pause overlay
Dark scrim, buttons: **Resume**, **Restart run**, **Mute** toggle, plus a compact rules reminder and the version number.

### 11.4 End-of-round (end-of-run) screen
- Result banner: **VICTORY** (helix green) or **DEFEAT** (danger coral).
- Summary: hunts won, final stats, installed traits, genes spliced, run-HP remaining, **final score**, and the run **seed** (so a player can share/replay).
- One obvious **RESTART** button (new random seed) and a small "replay this seed" link.

---

## 12. Config & tuning

All values live in a single exported `CONFIG` object. The doc body references these keys. Rebalancing = editing this object only.

```js
export const VERSION = "v0.1.0";

export const CONFIG = {
  run: {
    startHP: 3,            // stability charges; lose 1 per failed hunt
    ladderLength: 10,      // total hunts to reach big bad
  },
  player: {
    startStats: { HP: 50, ATK: 10, DEF: 3, SPD: 7 },
    traitSlots: 3,
    startTraits: [],
  },
  bank: {
    maxSize: 12,           // gene bank capacity
  },
  scout: {
    cardsPerHunt: 3,       // targets offered each SCOUT
    statJitter: 0.10,      // ±10% when filling duplicate slots
  },
  combat: {
    extraTurnSpdGap: 6,    // SPD lead needed for a bonus attack
    maxTurns: 60,          // stall breaker; higher HP% wins
    minDamage: 1,          // damage floor after mitigation
    playerWinsTies: true,
  },
  traits: {
    swift:     { spdBonus: 2 },
    thickHide: { flatReduce: 3 },
    pyro:      { burnPct: 0.25 },
    regen:     { healPerTurn: 5 },
    frenzy:    { atkPct: 0.15, hpThreshold: 0.50 },
    thorns:    { reflectPct: 0.20 },
    lifesteal: { healPct: 0.20 },
    critFang:  { chance: 0.25, mult: 2.0 },
  },
  statGenes: {           // value each stat gene adds when spliced
    "+3 ATK": { stat: "ATK", amount: 3 },
    "+5 ATK": { stat: "ATK", amount: 5 },
    "+7 ATK": { stat: "ATK", amount: 7 },
    "+8 ATK": { stat: "ATK", amount: 8 },
    "+10 ATK":{ stat: "ATK", amount: 10 },
    "+6 HP":  { stat: "HP",  amount: 6 },
    "+8 HP":  { stat: "HP",  amount: 8 },
    "+9 HP":  { stat: "HP",  amount: 9 },
    "+10 HP": { stat: "HP",  amount: 10 },
    "+12 HP": { stat: "HP",  amount: 12 },
    "+5 DEF": { stat: "DEF", amount: 5 },
    "+6 DEF": { stat: "DEF", amount: 6 },
    "+8 DEF": { stat: "DEF", amount: 8 },
    "+4 SPD": { stat: "SPD", amount: 4 },
  },
  scoring: {
    perHuntWon: 100,
    perRunHPRemaining: 250,
    // + sum of final stats
  },
  audio: {
    muted: false,          // persisted to localStorage key "sp_muted"
  },
};
```

**URL flags (all parsed at boot):**
- `?seed=<string>` — seed the RNG for a fully reproducible run (same scout pools, same crit rolls). Default: random seed shown on end screen.
- `?debug=1` — debug overlay: FPS, current phase, RNG seed, player/enemy live stats, and cheat keys (`G` = grant one of each gene, `K` = instakill current target, `H` = +1 run-HP, `T` = jump to next tier).
- `?hunt=<n>` — start the run at hunt *n* with a proportionally pre-built monster (playtest deep fights fast).
- `?nofx=1` — disable particles/screen-shake (perf/repro testing).

---

## 13. Tech stack

**Recommendation:** **Vanilla TypeScript + HTML/CSS DOM rendering + a trivial Vite build → static `dist/`.** No canvas engine, no physics library.

**Justification (one paragraph):** This game is a sequence of card menus, stat panels, and a text/animated battle log — it is a *UI application*, not a sprite-heavy real-time scene. The DOM (with CSS transitions for juice) renders cards, chips, stat bars, and log lines natively, accessibly, and touch-friendly for free; reaching for Canvas/Pixi would mean re-implementing layout and hit-testing for no benefit. The combat sim is pure math over plain data objects, so it lives in a **headless, DOM-free `sim/` module** that unit tests can drive directly. Vite gives TypeScript, hot reload, and a one-command static build (`vite build` → copyable `dist/`) with zero runtime network calls; all SFX are synthesized via the Web Audio API and all art is inline SVG/CSS, so the output is fully self-contained and deployable to GitHub Pages by copying files. **Perf budget:** trivially 60fps — at most ~30 DOM elements animating at once; particle effects capped at 40 nodes, disabled by `?nofx=1`; the sim resolves a full 60-turn battle in <1ms.

---

## 14. Milestones

### M0 — Toy loop
**Goal:** the hunt→harvest→splice→hunt cycle runs end-to-end with rectangles, no art/sound/menus.
**Deliverables:** headless sim (combat + gene apply); one hardcoded ladder of 3 monsters; scout→battle(auto, instant)→harvest→splice as bare `div`s + buttons.
**Acceptance criteria:**
- [ ] Player can complete 3 hunts in a row, choosing a target and splicing at least one gene between each.
- [ ] Winning a fight adds that monster's genes to a visible bank; splicing a stat gene visibly changes a stat and changes the next fight's outcome.
- [ ] A full 3-hunt cycle is completable in under 60 seconds of clicking.
**Proves:** the loop is mechanically coherent and the splice changes outcomes. *If choosing genes here already feels flat, stop — art won't save it.*

### M1 — Real rules
**Goal:** full P0 ruleset on the real 10-hunt ladder.
**Deliverables:** full bestiary (§6.6), all 8 traits, run-HP loss meter, win/lose conditions, scout pool logic, trait-slot overwrite UI, gene-bank cap + discard, splash screen (rules + controls + `VERSION`), HUD, pause, restart, end screen with score + seed.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds of the splash, unprompted.
- [ ] A run can be won and lost; both end states show the correct summary and restart.
- [ ] Trait slots enforce the 3-slot cap with an explicit overwrite choice.
- [ ] The same `?seed=` produces an identical run twice.
**Proves:** the complete P0 game is playable and the escalation ladder holds.

### M2 — Feel
**Goal:** P0 art + sound + juice.
**Deliverables:** inline-SVG flat-vector monsters (silhouette parts reflect traits), the §9 palette, monospace battle log animation, screen-shake on big hits, tween/particle effects (≤40 nodes), all P0 SFX synthesized, mute toggle wired to `localStorage`.
**Acceptance criteria:**
- [ ] Every P0 SFX fires on its event; mute silences all and persists across reload.
- [ ] Big hits (Crit Fang, boss hits) are visually and audibly distinct from normal hits.
- [ ] Runs at 60fps on a mid-range laptop with effects on; `?nofx=1` disables them.
**Proves:** the loop is not just coherent but *satisfying* to watch and act on.

### M3 — Playtest build
**Goal:** shippable playtest build.
**Deliverables:** `?debug=1` overlay + cheat keys, `?seed=` / `?hunt=` / `?nofx=1` flags, `vite build` static output deployed to a static host, P1 SFX/music if time.
**Acceptance criteria:**
- [ ] Debug overlay shows FPS, phase, seed, live stats; cheat keys work.
- [ ] `dist/` deploys to GitHub Pages and runs with zero network calls (verify in devtools).
- [ ] A playtester can complete a full run start-to-finish on both desktop and touch.
**Proves:** the fun hypothesis can be tested by real players and reproduced from a seed.

Every milestone leaves the game runnable.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is `run.startHP = 3` too forgiving or too punishing? Knob: `run.startHP`.
2. **(non-blocking — resolve in playtest)** Should battle HP persist between hunts (attrition) instead of resetting? Currently resets to focus on builds. Knob: add `run.persistBattleHP` if desired.
3. **(non-blocking — resolve in playtest)** Is `bank.maxSize = 12` the right pressure for the hold-vs-splice tension, or should discarding bite harder? Knob: `bank.maxSize`.
4. **(non-blocking — resolve in playtest)** Are 3 trait slots enough variety, or does 4 open more interesting builds? Knob: `player.traitSlots`.
5. **(non-blocking — resolve in playtest)** Does the 10-hunt ladder overstay its welcome or end too soon? Knob: `run.ladderLength` + `ladder[]`.
6. **(blocking)** Confirm the combat formula (flat-DEF subtraction + percentage traits) doesn't make DEF/ThickHide degenerate (e.g. an unkillable wall). Must be verified in M0 with the real bestiary numbers before M1 balancing; if walls dominate, switch DEF to a % mitigation model — decision must be made before M1 is called done. ⚑ (overridable)

---

## 16. Handoff notes for Fable

**Suggested build order:** `sim` (combat + gene/trait resolution as pure functions over plain objects) → `state` (run state machine: SCOUT→HUNT→HARVEST→SPLICE) → `input`/UI wiring → `render` (DOM/CSS from state) → `rules` (win/lose, ladder, scoring) → `audio` last.

**Keep headless-testable:** the entire `sim/` module must run with no DOM. Unit tests should assert: a given player+enemy pair produces a deterministic winner and turn count for a fixed seed; splicing a stat gene changes stats correctly; trait effects (Pyro burn, Thorns reflect, Lifesteal heal, Crit Fang doubling, Frenzy threshold, Regen tick, Thick Hide reduction, Swift order) each apply with expected numbers; the turn cap + tie-break resolves. No rendering code in `sim/`.

**Repo layout:**
```
/                     (repo root)
  index.html          entry
  vite.config.ts
  package.json
  /src
    main.ts           boot: parse URL flags, mount UI
    config.ts         CONFIG + VERSION (§12)
    /sim              headless, DOM-free
      combat.ts       resolveBattle(player, enemy, rng)
      genes.ts        applyGene / applyTrait
      rng.ts          seeded PRNG
    /data
      bestiary.ts     §6.6 monsters
      ladder.ts       §8 ladder pools
    /state
      run.ts          run state machine
    /ui               DOM rendering
      splash.ts, hunt.ts, splice.ts, hud.ts, end.ts
    /audio
      sound.ts        Web Audio synth + mute
    /style
      app.css         palette + layout
  /tests
    combat.test.ts, genes.test.ts
/dist                 (build output — the deployable static site)
```

**Deployable static output:** `vite build` emits `/dist` (html + hashed JS/CSS, no external assets). Deploy = copy `/dist` to the static host.

**Reminder:** Prove the loop with rectangles (M0) before any art effort. Ship every milestone in a runnable state. The splice decision is the product — if M0 isn't fun, stop and rethink the gene/trait system before spending a minute on SVGs or sound.
