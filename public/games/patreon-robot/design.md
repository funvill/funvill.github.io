# Crowd Pilot — Game Design Document

> Source idea: [Game Idea 26 - Robot (Theme: Something that takes 10 years of daily work to do)](/game-idea-26-robot-theme-ten-years-of-daily-work)

## 1. Title & one-liner

**Working title:** **Crowd Pilot**

**Alternates:** *Majority Robot*, *One Vote Wonder*, *Robot by Committee*, *The People's Robot*, *Patron Bot*

**One-sentence description:** You are one voter among a hundred simulated Patreon patrons steering a shared robot across a country, one daily ballot at a time — win votes, lose votes, and keep the budget from bleeding out before the robot breaks down.

**Genre:** Turn-based crowd-governance simulation / survival management (single-player, browser).

**Elevator pitch:** A crowdfunded robot is rolling across the fictional country of Veloria, from Port Bramble to Cape Solace, and every patron gets one vote on everything it does: which fork to take, when to charge, whether to stop for the news crew, what to do about the kid spray-painting its shell. You are patron #100. The other 99 voters are simulated factions — safety-obsessed Guardians, impatient Speedrunners, scenic-route Sightseers, stingy Penny-Pinchers, and a small bloc of Trolls actively voting for the worst option. Majority rules, always. Your only edges are your single vote and a scarce supply of Influence you can spend to campaign for an option before polls close. The robot has a shared budget funded by daily pledges; skip maintenance to save money and the breakdown dice start rolling. Reach the far coast before funding season ends, or watch democracy drive your robot into a ditch.

**Adaptation note:** The source idea is a real-world crowdfunded-robot concept, not a video game; this prototype adapts it as a simulation of the crowd-governance itself — you play one voter inside the simulated patron crowd, because "is being one voice among a hundred engaging?" is the testable core of the original idea. The real 10-year journey is compressed to a ~50-day, 6–9 minute run. ⚑ (overridable)

---

## 2. Fun hypothesis

**The single question:** *Is it fun to care about a shared robot when you only control 1% of every decision — voting, campaigning, sometimes winning, often being overruled by a simulated crowd?*

Everything in P0 exists to test the emotional loop of **vote → tally reveal → vindication or frustration → consequences you must live with**, backed by a budget/maintenance survival pressure so the crowd's bad choices actually *hurt*.

**Playtest questions (ask after each session):**

1. Name a moment you were overruled. Was it funny/dramatic, or just annoying?
2. Did you ever spend Influence to campaign? Did flipping (or failing to flip) a vote feel meaningful?
3. Did you understand *why* the crowd voted the way it did (factions), or did tallies feel random?
4. Did you ever change your own vote to side with the likely majority instead of what you wanted? How did that feel?
5. When the robot broke down or went broke, did you blame the crowd, yourself, or the game?
6. Would you replay to try dragging the crowd down a different route?

---

## 3. Design pillars

1. **You are one of many.** The player never gets direct control of the robot. Every action is a ballot; the majority always wins. Any feature that gives the player direct control is cut.
2. **The crowd is legible.** Factions have names, sizes, and predictable appetites. Tallies must feel explainable in hindsight ("of course the Speedrunners took the desert shortcut"), never like a coin flip.
3. **Bad governance kills the robot.** Budget, battery, and wear are real, coupled systems. A crowd that never pays for maintenance loses. Consequences are the teeth of the vote.
4. **A day is a beat.** One in-game day = one tight beat of ~10 seconds: read, vote, reveal, consequence. No dead time, no filler days.

---

## 4. Core game loop

One **in-game day** is one loop iteration. A full run is ~35–50 days ≈ **6–9 minutes** (session target).

```
        ┌──────────────────────────────────────────────────┐
        │                                                  │
        ▼                                                  │
  [1 BRIEFING]        robot status, position, funds,       │
        │             overnight news line                  │
        ▼                                                  │
  [2 POLLS OPEN]      1–2 ballots appear with options,     │
        │             pre-poll forecast bars; player       │
        │             votes, optionally CAMPAIGNS (IP)     │
        ▼                                                  │
  [3 TALLY]           polls close, animated tally reveal,  │
        │             "your side WON / LOST" stamp         │
        ▼                                                  │
  [4 EXECUTION]       robot acts: moves on map, charges,   │
        │             pays costs; battery/wear/funds tick  │
        ▼                                                  │
  [5 NIGHTFALL]       breakdown check, income/upkeep,      │
        │             +1 Influence, day counter++          │
        └──────── next day ────────────────────────────────┘
```

**What the player does / sees / feels per phase:**

| Phase | Does | Sees | Feels |
|---|---|---|---|
| Briefing | Reads one status line | Map, robot dot, HUD bars, news ticker line | Situational awareness, "what's today's crisis" |
| Polls open | Clicks a vote on each ballot; optionally clicks Campaign on one option | Ballot cards with option effects and a noisy forecast bar | Agency, calculation ("is this close enough to be worth 2 IP?") |
| Tally | Clicks "Close Polls" | Bars race to final counts, own vote marked, WON/LOST stamp | Suspense → vindication or outrage |
| Execution | Watches (≤1.5 s) | Robot moves along SVG route, numbers change with floating deltas | Consequence, "we did this to ourselves" |
| Nightfall | Clicks "Next Day" (or auto after 1 s) | Income +, upkeep −, breakdown roll if wear is high | Dread or relief |

There is no real-time pressure anywhere; the game only advances on player clicks. Pausing is therefore trivial (see §5).

---

## 5. Inputs & controls

Fully mouse/touch-driven; keyboard is an accelerator, never required. **Touch-viable: yes** — everything is tap-on-button, minimum hit target 44×44 px.

| Action | Desktop (mouse) | Desktop (keyboard) | Touch |
|---|---|---|---|
| Vote for an option | Click option card | `1`–`4` (option index on focused ballot), `Tab` cycles ballots | Tap option card |
| Campaign for selected option | Click "Campaign (2 IP)" button on the option | `C` | Tap "Campaign" button |
| Close polls / advance phase / next day | Click primary button (bottom right) | `Enter` or `Space` | Tap primary button |
| Start game (splash) | Click "Open the Polls" | `Enter` | Tap "Open the Polls" |
| Mute / unmute | Click speaker icon (top right) | `M` | Tap speaker icon |
| Restart run | Click "Restart" (top right) → confirm dialog | `R` → confirm | Tap "Restart" → confirm |
| Pause | No timer exists; the game is paused whenever the player isn't clicking. The "Restart" confirm dialog doubles as an explicit pause. | — | — |
| Toggle debug overlay | — | `D` (only when `?debug=1`) | 4-finger tap (only when `?debug=1`) |
| Inspect map node/edge | Hover node/edge → tooltip | — | Tap node/edge → tooltip; tap elsewhere closes |

Undocumented inputs: none. Cheat keys under `?debug=1` are listed in §12.

---

## 6. Game elements

### 6.1 The Robot ("Veli-1")

- **Placeholder:** teal 24×16 px rounded rectangle with two circle wheels on the SVG map; big 🤖 emoji in the status panel. **Final:** flat-vector wheeled cooler-box robot with a small solar panel and a single blinking eye.
- **State:** `position` (edge + km progressed), `batteryPct` (0–100), `wearPct` (0–100), `stranded` (bool), `mascotDog` (bool, from event E7).
- **Behavior:** executes exactly what the winning ballot options dictate; never acts autonomously. Drains battery per km driven (`batteryDrainPerKm`), gains solar charge per travel day (`solarGainSunny`/`solarGainCloudy`), accumulates wear per travel day by terrain (`wearPerDayHighway`/`wearPerDayRough`), plus `wearPushExtra` when pushing pace and `wearDeepDischarge` when battery ends a day below `deepDischargePct`.
- **Interactions:** subject of every ballot; source of breakdown checks at Nightfall (see §7).

### 6.2 The Player (Patron #100)

- Exactly **1 vote** per ballot, same weight as any AI voter.
- **Influence Points (IP):** starts with `ipStart` (3), gains `ipPerDay` (1) each Nightfall, capped at `ipCap` (10). Spend `campaignCost` (2 IP) to Campaign on one option of one ballot per day: a random `campaignReach` (40%) of AI voters get `campaignBonus` (+2.0) added to that option's score before they decide. ⚑ (overridable — campaign strength is the main agency dial)
- **Tracked stats:** `alignmentPct` (share of ballots where the player's pick won), `votesFlipped` (ballots where recomputing the tally without the campaign bonus changes the winner — computed exactly, since voting is deterministic given the seed).

### 6.3 AI Voters & Factions

99 simulated voters in five factions. Each voter belongs to one faction and inherits its weight vector; per-ballot, each voter scores every option and picks the max.

`score(option) = Σ_tag faction.weight[tag] × option.tag[tag] + gauss(0, voterNoiseSigma)`

Each voter abstains with probability `1 − turnoutRate` (turnout 0.8), so tallies breathe.

| Faction | Count | speed | safety | thrift | fun | chaos | Color | Personality |
|---|---|---|---|---|---|---|---|---|
| Guardians | 28 | 0 | **3** | 1 | 0.5 | −2 | Green `#7FB069` | Charge early, service often, decline risks |
| Speedrunners | 24 | **3** | −1 | 0 | 1 | 0 | Amber `#FFB454` | Shortest route, push pace, hate stopping |
| Sightseers | 18 | −1 | 1 | −1 | **3** | 0 | Teal `#4ECDC4` | Scenic routes, every festival, every dog |
| Penny-Pinchers | 19 | 0 | 1 | **3** | −1 | −1 | Grey `#9BA8B7` | Free option or nothing |
| Trolls | 10 | 0 | −2 | −2 | 1 | **3** | Red `#EF5B5B` | Pick the option tagged worst-for-robot |
| *(You)* | 1 | — | — | — | — | — | White | Whatever you click |

- **Placeholder:** tallies rendered as stacked horizontal bars in faction colors. **Final:** same bars plus tiny avatar dots.
- Faction sizes are fixed in P0. **P1:** patron churn — a `disaster` outcome (breakdown, funds < 100, troll win on a `chaos≥3` option) makes `churnOnDisaster` (3) random non-Troll voters quit next day; a `delight` outcome (buzz gain ≥ 60) adds `joinOnDelight` (2) voters to a random non-Troll faction. Income scales with voter count.

### 6.4 Ballots

A ballot = prompt + 2–4 options. Each option has: label, tag vector (`speed/safety/thrift/fun/chaos`, values −1…3), and a mechanical effect (funds/battery/wear/days/km deltas). **Exactly one Operations ballot + one Event ballot per day in P0** (Event ballot skipped on days the deck says "quiet day" — 30% of days, `quietDayChance`).

**Operations ballot — context-sensitive, first matching rule wins:**

1. **Route** (robot is at a junction node): one option per outgoing edge, tags derived from edge terrain (highway→speed 2; rough→speed 3, safety −1, chaos 1; scenic→fun 3, speed −1).
2. **Charge** (`batteryPct < chargeBallotThreshold` (35)): "Grid charge overnight" (town only, −`gridChargeCost` (25) funds, battery→100, no movement, safety 2, thrift −1) / "Roadside solar day" (+`roadsideCharge` (40) battery, no movement, free, safety 1, thrift 2) / "Push on anyway" (drive normally, speed 3, chaos 1).
3. **Maintenance** (`wearPct > maintenanceBallotThreshold` (50) AND at a town): "Full service" (−`fullServiceCost` (250) funds, wear −60, day consumed, safety 3, thrift −2) / "Quick patch" (−`patchCost` (100), wear −25, half-day: travel 40 km, safety 1) / "She'll hold" (free, thrift 3, chaos 1).
4. **Pace** (default): "Cruise" (`paceCruiseKm` 80 km, battery −50) / "Push" (`pacePushKm` 120 km, battery −75, wear +`wearPushExtra` (6), speed 3) / "Eco crawl" (`paceEcoKm` 50 km, battery −30, thrift 1, safety 1).

**Event ballots — the full P0 deck (12 authored events).** Drawn without replacement; reshuffle when empty. `buzz` = one-time funds gain from viral goodwill.

| # | Event | Options → tags → effect |
|---|---|---|
| E1 | A kid wants a photo sitting on the robot | Let them (fun 2, safety −1 → buzz +40, 10% chance wear +5) / Politely decline (safety 2 → nothing) / Play a melody instead (fun 1, safety 1 → buzz +20) |
| E2 | Local TV crew requests an interview stop | Stop for it (fun 2, speed −2 → lose 40 km today, buzz +80) / Keep rolling (speed 2 → nothing) |
| E3 | Teen spray-painting the robot overnight | Chase them off (safety 1 → nothing) / "It's art now" (fun 2, chaos 1 → buzz +30, wear +5) / Hire a night security escort (thrift −1, safety 2 → funds −30, blocks vandalism events for 5 days) |
| E4 | Storm front ahead | Shelter a day (safety 2 → no movement today) / Push through (speed 2, chaos 1 → wear +8, no solar today) |
| E5 | Charity festival invites the robot (1-day detour) | Attend (fun 3, speed −2 → lose the day, funds +100) / Send regrets (speed 1 → nothing) |
| E6 | Pothole stretch reported on today's road | Reroute (safety 2 → +1 day on current edge) / Risk it (speed 2, chaos 1 → wear +10) |
| E7 | A stray dog is following the robot | Adopt as mascot (fun 3 → buzz +60, sets `mascotDog`) / Shoo it (thrift 1 → nothing) |
| E8 | A man is drunkenly blocking the road | Wait him out (safety 2 → lose 40 km today) / Gentle horn (fun 1, chaos 1 → 25%: wear +5, else nothing) / Call local police (safety 1, thrift 1 → nothing) |
| E9 | A fan offers a sketchy free battery mod | Accept (chaos 2, thrift 1 → 50%: max battery +20, else wear +15) / Decline (safety 2 → nothing) |
| E10 | Toll bridge vs. shallow river ford | Pay toll (thrift −1, safety 2 → funds −40) / Ford it (chaos 2, speed 1 → wear +12, immediate 10% breakdown roll) |
| E11 | Sponsor offers to wrap the robot in ads | Accept (thrift 3, fun −2 → funds +150) / Decline (fun 2 → buzz +20) |
| E12 | School class asks for a science-demo stop | Stop (fun 2, safety 1 → lose 40 km today, buzz +50) / Keep schedule (speed 2 → nothing) |

- **Placeholder:** plain cards with text. **Final:** cards with a small emoji per event (🎨⛈️🎪🐕 etc.).
- **Vandalism gating:** E3 can only be drawn when parked at/near a town and no security escort is active.

### 6.5 The Map of Veloria

SVG node-graph, drawn once from data. Towns (squares) have grid charging + maintenance; waypoints (circles) have neither.

**Nodes:** 1 Port Bramble (START, town) · 2 Larkfield (town) · 3 Dunmore Hills (waypoint) · 4 Marrow Flats (waypoint) · 5 Gearford (town) · 6 Sable Forest (waypoint) · 7 Midland Junction (town) · 8 Salt Pans (waypoint, sunny: solar ×1.5) · 9 Kettle Ridge (waypoint) · 10 New Haven (town) · 11 Glimmer Coast (waypoint) · 12 Cape Solace (FINISH, town)

**Edges (km, terrain):** 1→2 (240, highway) · 1→3 (200, rough) · 2→4 (300, highway) · 3→4 (180, rough) · 4→5 (260, highway) · 5→6 (220, scenic) · 5→7 (320, highway) · 6→7 (140, scenic) · 7→8 (280, rough) · 7→9 (240, rough) · 7→10 (360, highway) · 8→10 (200, rough) · 9→10 (220, rough) · 10→11 (180, scenic) · 10→12 (300, highway) · 11→12 (160, scenic)

Fastest path (1-2-4-5-7-10-12) = 1,780 km ≈ 23 cruise days before charging/events. Rough shortcuts are shorter but wear-heavy; scenic legs are longer but feed buzz events (E2/E5/E12 are twice as likely to be drawn on scenic edges, `scenicEventBias`).

- **Placeholder:** grey lines + labeled circles/squares on the navy background. **Final:** same graph over a flat-vector landmass silhouette.

### 6.6 The Budget (shared treasury)

- Starts at `fundsStart` (400). Income each Nightfall: `pledgePerVoter` (0.6) × voter count (100) = **+60/day**. Upkeep each Nightfall (chase van, human maintainer's wages): `dailyUpkeep` (−45/day). Net drift **+15/day** — services, tolls, and disasters must be covered by discipline or buzz.
- All spending happens only through ballot options; **every ballot always contains at least one free option** so the crowd can never be forced below zero mid-day.
- **Placeholder/final:** HUD number with green/amber/red color bands (≥300 green, 100–299 amber, <100 red) and floating `+/−` deltas.

### 6.7 Hazards (systems, not entities)

- **Breakdown:** see §7. Caused by wear; costs funds and days.
- **Stranding:** battery hits 0 mid-edge → robot stops; next day's Operations ballot is forced: "Mobile charge crew" (−`rescueChargeCost` (120) funds, battery→60) / "Wait on solar" (2 days stationary, battery +30/day, thrift 3).
- **Trolls:** not a hazard per se — a 10-vote bloc that reliably scores `chaos` high. They only win when the sane factions split, which is exactly the drama the prototype wants.

---

## 7. Rules, win & lose conditions

**Win:** the robot arrives at Cape Solace (node 12) on or before day `dayLimit` (50) with funds ≥ 0.

**Lose:**
1. **Insolvency:** funds < 0 at any Nightfall → "The patrons pull out." (Ballot options that cost more than current funds are shown greyed-out with a 🔒 and receive no votes, so this only happens via upkeep drain — slow, visible doom.)
2. **Timeout:** day counter exceeds `dayLimit` (50) → "Funding season ends; the project is quietly shelved."

**Breakdown check (every Nightfall after a travel day):** `breakdownChance = max(0, wearPct − breakdownFloor) × breakdownSlope` (floor 40, slope 0.008 → wear 80 = 32%). On breakdown: robot is `stranded`; next day's Operations ballot is forced: "Tow to nearest town + shop repair" (−`towCost` (200) − `shopRepairCost` (150) funds, robot placed at nearest town next day, wear −40) / "Field repair" (−`fieldRepairCost` (80) funds, 2 days stationary, wear −15, `fieldRepairFailChance` (25%) chance it fails and the ballot repeats).

**Scoring (end screen):** `score = fundsRemaining + (dayLimit − daysUsed) × 10 + alignmentPct × 2 + votesFlipped × 25`. Score is a comparison number for replays, not a win condition.

**Edge cases (decided):**
- Tie vote → the status-quo/free option wins (the robot does the laziest thing). If two non-free options tie, lower option index wins. Ties are called out in the tally ("DEADLOCK — motion fails").
- Robot arrives at Cape Solace mid-day → win immediately; Event ballot for that day is discarded.
- Breakdown and battery-0 on the same day → breakdown ballot takes precedence; the rescue charge is bundled into the tow option ("tow includes a charge").
- Maintenance and Route both eligible → Maintenance wins the Operations slot; the junction ballot appears the next day (robot waits at the node).
- Player closes polls without voting → allowed; their vote is recorded as abstain and `alignmentPct` is unaffected by that ballot.
- Campaign clicked with < 2 IP → button disabled, tooltip explains.
- Funds exactly 0 → alive; only negative kills.

---

## 8. Difficulty & progression

Single tuned difficulty; no meta-progression. The run itself has a natural arc:

- **Days 1–10 (learning):** highway legs, gentle events, surplus budget. The player learns faction behavior from tallies.
- **Days 11–30 (midgame):** the Midland Junction choice (rough/sunny vs. long highway vs. via scenic forest) is the run's big fork; wear and charging cadence start to bite.
- **Days 31–50 (endgame):** accumulated wear makes every "She'll hold" vote a gamble; the day limit turns Guardian caution into a threat too.

Tuning knobs for playtesting live in §12 (`dayLimit`, `trollCount`, `voterNoiseSigma`, `campaignBonus`, `breakdownSlope`). **P1 difficulty variant:** `?trolls=25` chaos mode for streaming/laughs.

---

## 9. Style & theme

- **Visual style:** flat vector "civic-tech dashboard" — the game looks like a well-designed live crowdfunding control panel, not a game. Thin 1 px panel borders, rounded 8 px corners, no gradients, no skeuomorphism. All art is CSS/SVG; zero image assets.
- **Palette (6 core):** background `#1B2432` (deep navy) · panel `#242F40` · text `#F2F4F3` (off-white) · accent/robot `#4ECDC4` (teal) · warning `#FFB454` (amber) · danger `#EF5B5B` (coral). Faction colors as in §6.3 (Penny-Pincher grey `#9BA8B7`, Guardian green `#7FB069` complete the set).
- **Typography:** `Inter, system-ui, sans-serif` for UI; `ui-monospace, "Cascadia Mono", monospace` for tallies, funds, and the day counter (numbers should feel like a terminal readout). Base size 16 px, HUD numbers 24 px, ballot prompts 18 px.
- **Tone/mood:** earnest civic optimism with dry humor. The robot is beloved and slightly pathetic; copy reads like a hopeful project newsletter ("Day 14. Veli-1 remains, against all odds, operational.").
- **References:** *Twitch Plays Pokémon* (glorious crowd chaos) meets *The Oregon Trail* (attrition journey), skinned as a Kickstarter dashboard; a pinch of *Death Stranding*'s "strangers maintaining shared infrastructure" warmth.
- **Placeholder art plan (M0–M1):** map = grey lines and circles; robot = teal rectangle; ballots = unstyled cards; tallies = plain div bars; 🤖 emoji in the header. All final "art" is an M2 CSS pass — no drawing skill required.

---

## 10. Sound design

**Implementation:** Web Audio API directly, all SFX synthesized in code (jsfxr-style oscillator/noise envelopes) — zero audio assets. A single `audio.js` module exposes `play(name)`. Audio context is created/resumed only on the first user gesture (the splash "Open the Polls" click). **Mute toggle is P0**, persisted in `localStorage` (`crowdpilot.muted`).

**SFX event table:**

| Game event | Sound description | Priority |
|---|---|---|
| Vote cast (click an option) | Short soft click, 30 ms square blip ~880 Hz | P0 |
| Polls closing / tally reveal | 600 ms filtered-noise drumroll swelling | P0 |
| Your side won | Bright two-note major chime (C5→E5) | P0 |
| Your side lost | Muted low thud + minor second (A2 + Bb2) | P0 |
| Funds delta | Coin tick (short triangle blip, pitch up for +, down for −) | P0 |
| Breakdown | Clunk (low noise burst) + descending alarm sweep | P0 |
| Arrival at Cape Solace (win) | 4-note synth fanfare | P0 |
| Day advance | Single soft wooden tick | P1 |
| Campaign spent | Paper-shuffle noise burst | P1 |
| Lose (insolvency/timeout) | Slow power-down glide (2 s saw sweep down) | P1 |

**Music:** none in P0. P1: generative ambient pad — two detuned sine oscillators drifting through a pentatonic set, volume 15%, defined in code. Never any copyrighted or downloaded tracks.

---

## 11. UI & screens

**Flow:** `Splash → Game (day loop) → End screen → (Restart → Splash)`. The confirm dialog for Restart is the only modal.

### Splash screen (mandatory)

- Title **CROWD PILOT** + 🤖, one-liner: "Steer a crowdfunded robot across a country — with one vote out of 100."
- Rules/goal in 5 bullets (≤20 s read): ① Every day the crowd votes on what the robot does — majority rules. ② You get 1 vote. Spend Influence to campaign and sway the swing voters. ③ Keep the shared budget above zero: pledges come in daily, upkeep goes out, maintenance costs extra. ④ Worn-out robots break down. Broke projects get cancelled. ⑤ Reach Cape Solace by day 50.
- Controls line: "Mouse/tap: click to vote · 1–4 vote · C campaign · Enter next · M mute · R restart".
- **Version number** (e.g. `v0.1.0`) bottom-right, rendered from the single `VERSION` constant in `config.js` (same constant feeds the debug overlay).
- One obvious **"Open the Polls ▶"** button.
- Seed readout in tiny text ("seed 184602 — share URL to replay this run").

### Game screen (single layout, no sub-screens)

- **Left 60%:** SVG map of Veloria — robot dot, traveled route highlighted in teal, current edge pulsing; node tooltips on hover/tap.
- **Right 40%:** ballot column — today's 1–2 ballot cards (option rows show tag icons, cost, forecast bar), then the primary button ("Close Polls" → "Next Day").
- **HUD (top bar, always visible):** Day `14/50` · Funds `▮ 385` · Battery bar · Wear bar · Patrons `100` · Your IP `⚡4` · Alignment `62%` · mute · restart.
- **Ticker (bottom strip):** one-line news/flavor feed, newest left, max 30 entries kept. (P1: faction chat comments like "SpeedDemon_42: FLOOR IT".)

### Tally overlay (within game screen)

Ballot card flips to result state: stacked faction-colored bars animate to final counts over 0.8 s, player's option marked ★, big "YOUR SIDE WON/LOST" stamp, "flipped by your campaign!" badge when applicable.

### End screen

- Result headline (win: "VELI-1 MADE IT." / lose: cause-specific line), journey map with full traveled route, days used, funds remaining, alignment %, votes flipped, patrons at end, **score**, seed.
- Buttons: **"Run it back"** (same seed) and **"New journey"** (new seed).

---

## 12. Config & tuning

Single exported object `CONFIG` in `js/config.js`; every value below is a key. `VERSION = "0.1.0"` lives in the same file.

| Key | Default | Unit | Affects |
|---|---|---|---|
| `dayLimit` | 50 | days | Timeout lose condition |
| `fundsStart` | 400 | funds | Starting treasury |
| `pledgePerVoter` | 0.6 | funds/day | Daily income (× voter count) |
| `dailyUpkeep` | 45 | funds/day | Daily fixed cost |
| `voterCount` | 100 | voters | Total incl. player |
| `factionSplit` | [28,24,18,19,10] | voters | Guardians/Speed/Sight/Penny/Trolls |
| `turnoutRate` | 0.8 | prob | AI voter participation per ballot |
| `voterNoiseSigma` | 1.5 | score | Tally randomness (legibility dial) |
| `ipStart` / `ipPerDay` / `ipCap` | 3 / 1 / 10 | IP | Player influence economy |
| `campaignCost` | 2 | IP | Cost of one campaign |
| `campaignReach` | 0.4 | fraction | Voters who see the campaign |
| `campaignBonus` | 2.0 | score | Sway strength |
| `forecastNoise` | 8 | ±% | Pre-poll bar inaccuracy |
| `paceCruiseKm` / `pacePushKm` / `paceEcoKm` | 80 / 120 / 50 | km/day | Travel distances |
| `batteryDrainPerKm` | 0.625 | %/km | Battery use (80 km ≈ 50%) |
| `solarGainSunny` / `solarGainCloudy` | 20 / 8 | %/day | Passive charge (60% of days sunny) |
| `saltPansSolarMult` | 1.5 | × | Node-8 corridor solar bonus |
| `gridChargeCost` | 25 | funds | Town overnight charge |
| `roadsideCharge` | 40 | % | Free stationary solar day |
| `deepDischargePct` / `wearDeepDischarge` | 15 / 8 | % / wear | Deep-discharge penalty |
| `chargeBallotThreshold` | 35 | % battery | Triggers charge ballot |
| `wearPerDayHighway` / `wearPerDayRough` / `wearPerDayScenic` | 4 / 8 / 3 | wear/day | Terrain wear |
| `wearPushExtra` | 6 | wear | Push-pace penalty |
| `maintenanceBallotThreshold` | 50 | wear | Triggers maintenance ballot |
| `fullServiceCost` / `patchCost` | 250 / 100 | funds | Maintenance options (wear −60 / −25) |
| `breakdownFloor` / `breakdownSlope` | 40 / 0.008 | wear / prob-per-wear | Breakdown chance curve |
| `towCost` / `shopRepairCost` / `fieldRepairCost` | 200 / 150 / 80 | funds | Breakdown recovery |
| `fieldRepairFailChance` | 0.25 | prob | Field repair reliability |
| `rescueChargeCost` | 120 | funds | Stranded-at-0% rescue |
| `quietDayChance` | 0.3 | prob | Days with no event ballot |
| `scenicEventBias` | 2.0 | × | Buzz-event draw weight on scenic edges |
| `securityEscortDays` | 5 | days | E3 escort duration |
| `churnOnDisaster` / `joinOnDelight` | 3 / 2 | voters | P1 patron churn |
| `tallyRevealMs` | 800 | ms | Reveal animation length |

**URL flags:**

- `?seed=184602` — seeds all RNG (mulberry32); identical seed + identical player inputs = identical run. Splash and end screen display the seed.
- `?debug=1` — overlay showing: current phase, full robot state, next 3 event-deck draws, per-faction pending scores on open ballots, VERSION. Cheat keys (debug only): `F` +200 funds, `B` battery→100, `W` wear→0, `G` teleport to next node, `K` force breakdown tonight.
- `?fast=1` — skips all animations (tally instant, execution instant) for rapid playtesting.
- `?trolls=25` — overrides Troll faction size (steals from Penny-Pinchers).
- `?days=N` — overrides `dayLimit`.

---

## 13. Tech stack

**Vanilla JavaScript (ES modules), zero build step, DOM + inline SVG. No frameworks, no dependencies, no assets.** This is a turn-based dashboard game: nothing moves at 60 fps except two CSS-transition animations (tally bars, robot dot easing along an SVG path), so Canvas/Pixi/Matter would be dead weight. SVG is the natural fit for a node-graph map with hover tooltips; the ballot UI is ordinary HTML, which gives buttons, focus, and touch targets for free. The whole game is `index.html` + `js/*.js` copied verbatim to any static host — this repo already serves `public/` as-is, so there is no dist folder and no build to maintain. The simulation (`sim.js`, `voters.js`, `events.js`, `map.js`, `rng.js`, `config.js`) is pure and DOM-free so it runs headless under Node for tests. Web Audio is used directly (§10). Performance budget is trivial: ≤ 200 DOM nodes live, 100 voters × 4 options × ~100 ballots per run ≈ 40k score evaluations total — microseconds. 60 fps on a mid-range laptop is guaranteed by doing almost nothing per frame.

---

## 14. Milestones

### M0 — Toy loop (prove the vote feels like something)

**Goal:** the vote→tally→consequence beat playable end-to-end with text and rectangles.
**Deliverables:** headless sim (day loop, voters/factions, pace+charge+maintenance operations ballots, battery/wear/funds, breakdown, win/lose); minimal DOM: map as a text breadcrumb ("Port Bramble →→ [473 km] → Gearford"), ballot cards as plain buttons, plain-div tally bars, HUD numbers. Fixed route (no junctions yet), no events, no campaign, no sound, no splash.
**Acceptance criteria:**
- [ ] A full run completes in under 8 minutes of clicking, ending in win or a lose screen with a cause.
- [ ] Ignoring maintenance reliably kills a run (≥ 50% of "She'll hold"-spam runs end in a breakdown death-spiral or timeout).
- [ ] The tally visibly differs from the player's pick on ≥ 30% of ballots (being overruled actually happens).
- [ ] `node test/sim.test.js` passes: tally determinism per seed, breakdown curve, funds arithmetic, tie→status-quo rule.
**Proves:** whether watching a crowd overrule you, with real consequences, generates any emotion at all. *If M0 isn't at least dramatic, stop.*

### M1 — Real rules

**Goal:** full P0 ruleset on the real map.
**Deliverables:** SVG Veloria map with junction route ballots; 12-event deck with gating; Influence + Campaign with flip detection; pre-poll forecast bars; stranding and rescue; splash screen (rules, controls, VERSION, seed); HUD complete; end screen with score; restart; `?seed=` working.
**Acceptance criteria:**
- [ ] A first-time player understands what to do within 60 seconds of the splash, unprompted.
- [ ] Player can name at least two factions' personalities after one run without being told.
- [ ] Campaigning flips at least one close vote per typical run, and the "flipped by your campaign" badge appears.
- [ ] Two different routes to Cape Solace are winnable; same seed + same inputs reproduces the identical run.

### M2 — Feel

**Goal:** the dashboard aesthetic, sound, and juice.
**Deliverables:** §9 palette/typography pass; tally drumroll reveal with WON/LOST stamp; floating +/− deltas; robot dot easing along edges; news ticker with authored flavor lines; all P0 SFX + mute persistence; lose/win screens with journey map.
**Acceptance criteria:**
- [ ] Tally reveal reads as the emotional peak of each day (observed in playtest, players lean in or react audibly at least once per run).
- [ ] Game is fully playable and legible with sound muted.
- [ ] No image or audio asset files exist in the repo; total payload < 150 KB.

### M3 — Playtest build

**Goal:** shippable, measurable, tweakable.
**Deliverables:** `?debug=1` overlay + cheat keys, `?fast=1`, `?trolls=`, `?days=`; deployed to `/games/patreon-robot/` on the static site; P1 features as time allows in this order: ① faction chat ticker comments, ② patron churn/growth (`churnOnDisaster`/`joinOnDelight` + income scaling), ③ generative ambient pad, ④ `?trolls=25` chaos-mode link on the end screen.
**Acceptance criteria:**
- [ ] Game runs from the live static URL in Chrome and Firefox with no console errors.
- [ ] A shared seed URL reproduces a run on another machine.
- [ ] Debug overlay shows phase/state and all cheat keys work.
- [ ] Three playtesters complete a run and answer §2's questions.

Every milestone leaves the game runnable.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is 1 vote in 100 the right powerlessness level, or does fun need ~1 in 30? Knobs: `voterCount`, `factionSplit`.
2. **(non-blocking — resolve in playtest)** Is `campaignBonus` 2.0 / `campaignReach` 0.4 strong enough to feel like agency without making the player a puppetmaster? Knobs exist; also watch whether players hoard IP.
3. **(non-blocking — resolve in playtest)** Does the noisy forecast bar (`forecastNoise` 8) spoil tally suspense? If so, set `forecastNoise` to 100 (bar becomes useless) or hide it via a config flag `showForecast`.
4. **(non-blocking — resolve in playtest)** Are 10 Trolls audible enough to be funny? `?trolls=` exists to probe.
5. **(non-blocking — resolve in playtest)** Is the 50-day limit pressure or wallpaper? `?days=` exists.
6. **(non-blocking — resolve in playtest)** Do players want to see *who* voted how (avatar grid) rather than aggregate bars? P2 idea; aggregate bars ship first.
7. **(blocking only for P1)** Patron churn coupling (income scaling with voter count) can death-spiral; the `churnOnDisaster` value needs a sim sweep before P1 ships. P0 is unaffected (fixed 100 voters).

---

## 16. Handoff notes for Fable

**Build order:** `rng.js` → `config.js` → `map.js` (data) → `voters.js` (scoring/tally) → `events.js` (deck) → `sim.js` (day loop, phases, win/lose) → Node tests → DOM shell (`main.js`, ballot cards, HUD) → SVG map render → tally animation → splash/end screens → audio → debug overlay.

**Keep headless-testable:** everything under `js/sim/` must run in Node with zero DOM/browser globals. The sim exposes `createGame(seed, config)` and `step(game, playerInputs) → {events, state}`; the UI is a thin subscriber. Unit tests assert: deterministic tallies per seed, tie→status-quo, breakdown probability curve at wear 40/60/80, funds never forced negative by a ballot (free option always present), a scripted 50-day "sensible crowd" run wins and a "She'll hold"-spam run loses.

**File layout (deployable as-is, no build):**

```
public/games/patreon-robot/
  index.html          (splash + game shell, loads main.js as module)
  design.md           (this file)
  css/style.css
  js/config.js        (CONFIG + VERSION — single source of truth)
  js/sim/rng.js       (mulberry32 + gauss)
  js/sim/map.js       (nodes/edges data + pathing helpers)
  js/sim/voters.js    (factions, scoring, tally, campaign)
  js/sim/events.js    (12-event deck + gating)
  js/sim/sim.js       (game state machine: 5 phases, rules of §7)
  js/ui/main.js       (screen flow, day-loop driver)
  js/ui/mapview.js    (SVG render)
  js/ui/ballots.js    (cards, forecast, tally reveal)
  js/ui/hud.js
  js/audio.js         (Web Audio synth SFX, mute persistence)
  test/sim.test.js    (run with `node test/sim.test.js`)
```

**Reminders:** prove the loop with plain buttons and text tallies before touching SVG or CSS polish — M0's question is emotional, not visual. Ship every milestone runnable. All randomness flows through the seeded RNG (including turnout, noise, campaign reach sampling, and event draws) or seed reproducibility silently breaks. The tally reveal is the game's heartbeat — spend the juice budget there, nowhere else.
