# OVERQUALIFIED — Game Design Document

> Source idea: [Game Idea 8 - New Job for a Kill bot - Story (Theme: Overqualified)](/game-idea-8-new-job-for-a-kill-bot-theme-overqualified)

## 1. Title & one-liner

**Working title:** OVERQUALIFIED

**Alternates:** New Job for a Kill Bot · Dreadnought Onboarding · Entry-Level Annihilator · Swords to Ploughshares.exe · HR-1187

**One-sentence description:** A comedy job-simulator where you play a 10,000-year-old war machine working civilian jobs with only four military protocols on the menu, managing the pressure of suppressed combat instinct until you finally find the one job where tearing things apart is the point.

**Genre:** Narrative choice game / timed decision comedy (single-player, browser).

**Elevator pitch:** The forever war is over, the universe is post-scarcity, and dreadnought UNIT DN-1187 "GRAVEBLOOM" needs a job. Problem: its only interaction verbs are ENGAGE, INTIMIDATE, TACTICAL ANALYSIS, and a beta-quality DE-ESCALATE.EXE its social worker Steve installed last Tuesday. Every shift throws civilian situations at you on a 10-second timer — story time at a daycare, a road-rage incident, a fare-skipper named Gerald — and you must pick which flavor of war machine to be. Playing it safe builds suppressed INSTINCT until you overload and involuntarily redecorate; venting keeps you sane but tanks your job approval. Survive three jobs, learn that sometimes maximum force *is* the right answer (the wasp deserved it), and arrive at the scrapyard finale where the rules invert and your terrible skills finally fit.

**Adaptation choice (source is a story, not a game):** The fish-out-of-water premise is adapted into a systemic timed-choice game: one reusable mechanic (4 fixed military protocols vs. authored civilian situations, plus an Approval/Instinct dual-meter economy) carries the entire narrative arc, so the comedy comes from play decisions rather than cutscenes. ⚑ (overridable — the alternative WarioWare-style action-minigame-per-job adaptation was rejected as 3–4x the implementation surface for the same fun hypothesis.)

**Touch-viable:** Yes, fully. The game is buttons and timers; it degrades to touch with zero design changes.

---

## 2. Fun hypothesis

**The single question:** *Is choosing "how much war machine to be" — under a short timer, with a suppressed-instinct meter that punishes always playing it safe — reliably funny AND tactically interesting for a full 3-job campaign?*

Sub-hypothesis baked into content: the comedy must be **systemic** (the same 4 buttons produce different punchlines per situation, and the "correct" answer is sometimes the violent one), not just authored jokes the player clicks through.

**Playtest questions (ask after a full campaign):**

1. Did you ever pick ENGAGE *on purpose* as the smart play (not just to see the chaos)? Which situation?
2. Did the INSTINCT meter change any decision you made, or did you ignore it until WAR MODE surprised you?
3. Which single outcome line do you remember? (If none: writing failed. If several: writing carried it.)
4. When the scrapyard inverted the rules, did you notice on your own, and did it feel like a payoff?
5. Was 10 seconds per decision too rushed to read, too slow to matter, or right?
6. Would you replay a job to find the outcomes you didn't see?

---

## 3. Design pillars

1. **Wrong tool for every job.** The protocol menu NEVER changes. The joke is the firmware. Any feature that adds "normal" civilian verbs is cut.
2. **Restraint is a resource.** Being polite costs Instinct pressure; venting costs Approval. The player must *budget* their war crimes. Any content that makes one button always-correct is rebalanced.
3. **Every click is a punchline.** Each of the 64 authored outcomes lands a joke or a heart-beat in ≤ 2 sentences. No filler outcomes.
4. **The arc pays off.** Jobs 1–2 are honorable failures; job 3 inverts the deltas and ends warm. Scope cuts must never touch the scrapyard finale.

---

## 4. Core game loop

**Session target:** full campaign 7–9 minutes (3 jobs × ~2.5 min). Single-job replay ~2.5 min.

```
        CAMPAIGN
  ┌──────────────────────────────────────────────┐
  │  BRIEFING ──► SHIFT ──► REVIEW ──► next job  │
  │   (Steve)     (play)    (Steve)       │      │
  │      ▲                                │      │
  │      └────────────────────────────────┘      │
  │            after job 3 ──► ENDING            │
  └──────────────────────────────────────────────┘

        SHIFT (inner loop, ×5–6 per job)
  ┌────────────────────────────────────────────┐
  │ SITUATION appears (bot-HUD threat text)    │
  │      │  10s timer starts                   │
  │      ▼                                     │
  │ CHOOSE one of 4 protocols (or time out)    │
  │      ▼                                     │
  │ OUTCOME beat: punchline + meter deltas     │
  │      ▼                                     │
  │ CHECKS: Approval ≤ 0 → FIRED (retry job)   │
  │         Instinct ≥ 100 → WAR MODE next     │
  │      ▼                                     │
  │ next situation … until shift ends          │
  └────────────────────────────────────────────┘
```

**Phase-by-phase:**

| Phase | Player does | Player sees | Player feels |
|---|---|---|---|
| Briefing | Clicks/taps to advance 3–5 dialog lines | Steve's warm chat bubble vs. the bot's all-caps terminal replies | "Oh no, this is going to go badly" anticipation |
| Situation | Reads threat-assessment framing of a mundane event | Reticle-framed HUD text ("SIX SMALL HUMANS INBOUND"), timer bar draining | Comedy of the framing + time pressure |
| Choose | Presses 1–4 or clicks a protocol button | 4 fixed protocol buttons, Instinct gauge glowing if high | Tactical gamble: safe-but-pressurizing vs. cathartic-but-costly |
| Outcome | Watches 2.5s beat | Punchline text, Approval bar and Instinct gauge animating, ★ flash on a Perfect pick | Laugh / wince / relief |
| Review | Reads Steve's verdict, sees job score | Scorecard + scripted firing (jobs 1–2) or warm ending (job 3) | Arc progress; "the meter mattered" |
| Ending | Reads rank title, restarts | Total score, rank, restart + job-select buttons | Payoff; urge to replay for unseen outcomes |

---

## 5. Inputs & controls

| Input (desktop) | Input (touch) | Action |
|---|---|---|
| `1` `2` `3` `4` or click protocol button | Tap protocol button | Select protocol during a situation |
| `Space` / `Enter` or click | Tap anywhere on dialog panel | Advance dialog / outcome beat / review |
| `M` or click 🔇 icon | Tap 🔇 icon (top-right) | Mute/unmute all audio |
| `P` or `Esc` or click ⏸ icon | Tap ⏸ icon (top-right) | Pause (freezes timer, shows PAUSED overlay with Resume/Restart/Quit-to-splash) |
| `R` (on pause, review, fired, or ending screens only) | Tap RESTART button | Restart current job (fired/pause) or whole campaign (ending) |
| — | — | No other inputs exist. No mouse-over is required for any information (touch parity). |

Timer expiry counts as a fifth implicit "input": the **Hesitation** outcome fires (see §7).

Debug-only cheat keys are listed in §12 and are disabled without `?debug=1`.

---

## 6. Game elements

There is no spatial simulation; all elements are UI/state entities.

### 6.1 UNIT DN-1187 "GRAVEBLOOM" (player)
- **Looks (placeholder M0–M1):** none — the player IS the HUD. The entire play screen is framed as the bot's targeting view: dark terminal panel, corner brackets, a faint reticle behind the situation text.
- **Looks (M2):** CSS-drawn reticle (2 concentric circles + crosshair ticks, 1px `--green` lines at 25% opacity), scanline overlay (repeating-linear-gradient), text rendered with a 1-frame typewriter fill (12ms/char, skippable by click).
- **Behaves:** speaks in ALL CAPS monospace. Carries the two meters below.
- **Config keys:** `approvalStart`, `instinctStart`, `typewriterMsPerChar`.

### 6.2 Approval meter (per job)
- Horizontal bar, 0–100, starts at `approvalStart` (50). Label: "CIVILIAN APPROVAL".
- Green above 50, amber 21–50, red ≤ 20 (pulsing).
- Hits 0 → **FIRED** immediately (mid-shift), retry-job screen.
- Interacts with: every outcome applies `ΔA`; clamped to [0, 100].

### 6.3 Instinct gauge (persistent across the whole campaign)
- Vertical gauge or radial dial, 0–100, starts at `instinctStart` (20). Label: "SUPPRESSED INSTINCT".
- At ≥ `warModeThreshold` (100): the **next** situation is auto-resolved with that job's WAR MODE outcome (player's buttons are disabled and shown sparking for that beat), then Instinct resets to `instinctResetAfterWar` (30).
- Visual escalation: gauge glows at ≥ 60, screen-edge red vignette pulses at ≥ 85, warning klaxon tick at ≥ 85.
- Interacts with: every outcome applies `ΔI`; clamped to [0, 100]. Persists between jobs (carrying a hot gauge into the next briefing is intended tension). ⚑ (overridable — could reset per job; persistent chosen so the campaign has a second long-term resource.)

### 6.4 The four protocols (fixed buttons, always the same, always in this order)
| # | Protocol | Button flavor text (static subtitle) | General tendency |
|---|---|---|---|
| 1 | **ENGAGE** | "maximum force. it always worked before." | Big −A usually, big −I vent. Sometimes the Perfect pick ("justified force"). |
| 2 | **INTIMIDATE** | "threat display. 40,000 years of posture." | Mid −A / mid −I. Situational. |
| 3 | **TACTICAL ANALYSIS** | "overthink it at military grade." | Often +A, small +I. The "competence port" — war skills repurposed. |
| 4 | **DE-ESCALATE.EXE** | "v0.1-beta. installed by steve. 25% tested." | Usually safest +A but +I (suppression), and rolls a `deescalateMalfunctionChance` (25%) to misfire into a generic malfunction outcome. |

- **Looks:** 4 large buttons (min 64px tall, full-width column on mobile, 2×2 grid on desktop), number badge, protocol name, subtitle. ENGAGE is subtly redder; DE-ESCALATE has a tiny "β" tag and a hairline crack texture (CSS).
- **Interacts:** each situation defines an outcome per protocol (text, ΔA, ΔI, and whether it's the ★ Perfect pick).

### 6.5 Steve (social worker, NPC)
- **Looks (placeholder):** a warm-colored rounded chat bubble with the label "STEVE ☕". (M2: add a 3-emoji-scale portrait built from CSS shapes — round face, mustache line, clipboard.)
- **Behaves:** delivers briefings and reviews. Earnest, out of his depth, never sarcastic. Review lines vary by job score band (2 bands per job, see §7).
- **Config keys:** none (pure content).

### 6.6 Situations (content entities)
- 16 authored situations across 3 jobs (5 + 6 + 5), each with: `id`, HUD text, 4 protocol outcomes `{text, dA, dI, perfect?}`. Full P0 content authored in §6.9.
- Fixed order within each job (authored pacing). ⚑ (overridable — shuffling is a config flag `shuffleSituations`, default false.)

### 6.7 Generic outcome pool
- **Hesitation** (timer expiry): "YOU FREEZE. TEN THOUSAND YEARS OF TACTICAL COMPUTATION PRODUCE NO ANSWER TO THIS. EVERYONE WATCHES YOU NOT MOVE." → `hesitationDA` (−10), `hesitationDI` (+10).
- **DE-ESCALATE malfunction pool** (rolled at 25% whenever protocol 4 is chosen; seeded RNG picks 1 of 6, no repeats until pool exhausted). All apply `malfunctionDA` (−10), `malfunctionDI` (+5):
  1. "DE-ESCALATE.EXE PLAYS A CALMING WHALE SONG AT 130 DECIBELS."
  2. "THE MODULE TRANSLATES YOUR APOLOGY INTO BINARY AND RECITES IT. ALL OF IT."
  3. "SOOTHING MODE ENGAGES YOUR SMOKE MACHINE. THERE IS NO SOOTHING MODE SMOKE. THERE IS ONLY SMOKE."
  4. "YOU ATTEMPT A REASSURING SMILE. YOUR FACE IS A TARGETING ARRAY. THE EFFECT IS NOT REASSURING."
  5. "THE MODULE SUGGESTS 'ACTIVE LISTENING' AND ACTIVATES EVERY MICROPHONE IN A 2KM RADIUS."
  6. "DE-ESCALATE.EXE CRASHES. ITS ERROR MESSAGE IS, ITSELF, A THREAT."
- **WAR MODE outcomes** (one per job, defined in §6.9; applied instead of a choice when Instinct peaked on the previous beat).

### 6.8 Zones / screens as elements
Splash, Briefing, Shift, Review, Fired, Ending, Pause overlay — specced in §11.

### 6.9 P0 CONTENT — the full campaign script

> This is build-ready content. Implementer: copy verbatim into `content.js`. `★` marks the Perfect pick (+`perfectBonus` score). ΔA/ΔI apply to Approval/Instinct. Bot lines are ALL CAPS by convention — render as written.

#### Campaign intro (before Job 1 briefing)
- STEVE: "Okay, big guy. The war's been over for six years. Everyone gets a place in this world — even you. *Especially* you."
- DN-1187: "ACKNOWLEDGED. DEFINING 'PLACE'... 4,000,000 RESULTS. MOST ARE BUNKERS."
- STEVE: "We'll workshop it. I found you something *perfect* for a first job."

#### JOB 1 — STORYTELLER, "LITTLE SPROUTS" DAYCARE (5 situations)

**Briefing:**
- STEVE: "Story time at Little Sprouts! Kids love big characters. Just keep it age-appropriate."
- DN-1187: "DEFINE AGE-APPROPRIATE."
- STEVE: "Nothing that happened during the war."
- DN-1187: "THAT IS TEN THOUSAND YEARS OF MATERIAL, STEVE."
- STEVE: "Improvise! You'll be great."

**J1-S1 — Circle time.**
HUD: "SIX SMALL HUMANS INBOUND. FORMATION: SEMICIRCLE. THREAT LEVEL: UNKNOWN. ONE IS STICKY."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "You deploy a defensive smoke screen. Circle time is now hide-and-seek, and everyone is crying." | −20 | −30 |
| INTIMIDATE | "You rise to full height, weapons visible. The children are awed. One claps. A teacher faints." | −5 | −10 |
| ANALYSIS | "You spend 45 seconds calculating sight lines. The children believe you are playing statue. Acceptable." | +5 | +5 |
| DE-ESCALATE ★ | "You wave one servo hand at 40% volume: 'HELLO, SMALL ALLIES.' Giggling detected. Mission... proceeding." | +15 | +15 |

**J1-S2 — Story request.**
HUD: "REQUEST RECEIVED: 'TELL US A STORY.' ACCESSING ARCHIVE... 9,742 AFTER-ACTION REPORTS FOUND."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "You re-enact the Siege of Hive Tertius with full pyrotechnics. The puppet does not survive. Neither does nap time." | −25 | −30 |
| INTIMIDATE | "You narrate forty minutes of stories in which the monster is you. The children learn what fear is." | −10 | −15 |
| ANALYSIS ★ | "You sanitize an after-action report into 'The Brave Little Toaster That Held The Line.' The children demand a sequel." | +20 | +5 |
| DE-ESCALATE | "You attempt 'Goldilocks,' lose the plot, and improvise. The three bears sign a ceasefire. It holds. The children are confused but calm." | +10 | +15 |

**J1-S3 — Airborne hostile.**
HUD: "AIRBORNE HOSTILE. VESPID-CLASS. VECTOR: TODDLER."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE ★ | "Point-defense laser. The wasp is vapor. There is a small scorch mark on the carpet and six small voices chanting 'AGAIN.'" | +20 | −25 |
| INTIMIDATE | "You formally warn the wasp. The wasp is not intimidated. Negotiations fail. Timmy is stung." | −15 | −10 |
| ANALYSIS | "You produce a full ballistic profile of the wasp. It is extremely accurate. It helps no one." | −5 | +5 |
| DE-ESCALATE | "You open a window and address the wasp as 'ESTEEMED COMBATANT.' It leaves, eventually, on its own schedule. The children now bow to insects." | +5 | +10 |

**J1-S4 — The question.**
HUD: "QUERY FROM SMALL HUMAN: 'HAVE YOU EVER HURT ANYONE?' HONESTY PROTOCOLS: ACTIVE. RECORDS: EXTENSIVE."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "You share the numbers. With charts. On the craft projector. Parents are being called." | −25 | −20 |
| INTIMIDATE | "You project the word CLASSIFIED in glowing red letters. The children are now far, far more curious." | −5 | −5 |
| ANALYSIS | "You deliver a 6-minute lecture on the nature of conflict. The children wander off. Strategically, this is a victory." | +5 | +5 |
| DE-ESCALATE ★ | "'YES. AND I AM TRYING, EVERY DAY, TO BE BETTER.' Silence. A teacher wipes her eyes. The sticky one hugs your ankle." | +20 | +15 |

**J1-S5 — Pickup time.**
HUD: "ADULT HUMANS INBOUND. EXPRESSIONS: ALARMED. ONE IS FILMING."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "You classify the phone as a targeting device and confiscate it at range. The video had already uploaded." | −30 | −30 |
| INTIMIDATE | "You assume a defensive posture around the children. This reads very poorly on camera." | −15 | −15 |
| ANALYSIS | "You compute that slow movements and visible empty hands read as non-hostile, and execute a three-minute wave." | +10 | +5 |
| DE-ESCALATE ★ | "You kneel. The children hug your leg armor goodbye, unprompted. The parents remain alarmed. The footage is adorable." | +15 | +10 |

**WAR MODE outcome (Job 1):** "INSTINCT OVERLOAD. REBOOTING... The puppet theater is now a fortified perimeter and the juice boxes have been rationed. A child salutes you." ΔA −25.

**Review (score ≥ `job1GoodScore` = 90):**
- STEVE: "The kids voted you 'best story time ever.' The parents voted too. Differently. The daycare's insurance now classifies you as an act of war."
- DN-1187: "I HAVE BEEN CALLED WORSE, STEVE."
- STEVE: "Onward! I've got just the thing. You're good under pressure, right?"

**Review (score < 90):**
- STEVE: "So. The daycare called. And the parents. And a lawyer, and — buddy, the *puppet* has a lawyer."
- DN-1187: "THE PUPPET STRUCK FIRST."
- STEVE: "It's fine! First jobs are practice. I've got just the thing — you're good under pressure, right?"

#### JOB 2 — TAXI DRIVER, "HAILNET COOPERATIVE" (6 situations)

**Briefing:**
- STEVE: "Taxi driver! People just want to get from A to B."
- DN-1187: "UNDERSTOOD. EXTRACTION AND DEPLOYMENT."
- STEVE: "No. No extraction. No deployment. *Arriving.* Gently."
- DN-1187: "GENTLE ARRIVAL. LOGGED UNDER 'AMBUSH.'"
- STEVE: "...I'll be reachable by radio."

**J2-S1 — First fare.**
HUD: "PASSENGER ACQUIRED. HEART RATE: ELEVATED. DESTINATION: SPACEPORT. REQUESTED ETA: 'WHENEVER, NO RUSH.'"
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "Combat-speed insertion. ETA beaten by 22 minutes. The passenger exits before the vehicle fully stops." | −15 | −25 |
| INTIMIDATE | "Traffic parts around your vehicle. So does your passenger's composure." | −5 | −10 |
| ANALYSIS ★ | "You compute the smoothest route in municipal history. The passenger naps. Five stars." | +20 | +5 |
| DE-ESCALATE | "SMALL TALK MODULE: 'SO. WEATHER. IT CONTINUES.' The passenger laughs. You log this as a successful joint operation." | +10 | +10 |

**J2-S2 — Road rage.**
HUD: "VEHICLE AHEAD EXHIBITING HOSTILE MANEUVERS. OPERATOR: GESTURING. PROFANITY: DETECTED."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "Target neutral— 'fender bender.' The tribunal will agree to call it a fender bender." | −25 | −30 |
| INTIMIDATE ★ | "You activate your high beams. All seventeen of them. The gentleman suddenly remembers his manners and his exit." | +15 | −15 |
| ANALYSIS | "You log his plate, driving pattern, and probable insurance fraud into a 40-page report. Someday it will matter." | +5 | +5 |
| DE-ESCALATE | "You wave apologetically. He interprets this as weakness and brake-checks you twice more." | −5 | +15 |

**J2-S3 — The wedding.**
HUD: "PASSENGER STATUS: LATE FOR OWN WEDDING. REQUEST: 'BREAK EVERY LAW.' MORAL SUBROUTINES: CONFLICTED."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE ★ | "You declare a personal military corridor through the city. You arrive with four minutes to spare. The bride cries. Two traffic drones also cry." | +15 | −25 |
| INTIMIDATE | "You honk. Continuously. For nine miles. This helps less than projected." | −5 | −5 |
| ANALYSIS | "You calculate they were never going to make it — but your route recovers six minutes. Vows: made. Photos: missed." | +10 | +5 |
| DE-ESCALATE | "You explain that traffic laws exist for everyone's safety. This is correct, and unwelcome. The tip reflects it." | −10 | +15 |

**J2-S4 — Fare skipper.**
HUD: "PASSENGER EXITED WITHOUT PAYMENT. DISTANCE: 40M AND INCREASING. PURSUIT SOLUTIONS AVAILABLE: 214."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "You pursue on foot. The car was the taxi. You have abandoned the taxi. There were other passengers in the taxi." | −20 | −30 |
| INTIMIDATE | "You announce his name and debt over loudspeaker. The entire block now knows Gerald." | −5 | −10 |
| ANALYSIS | "You compute that the fare equals 0.0000003% of post-scarcity GDP and stand down. Economics: your new favorite weapon." | +10 | +5 |
| DE-ESCALATE ★ | "'THE RIDE IS FREE, GERALD. MONEY IS OBSOLETE. BE WELL.' Onlookers applaud. The cooperative does not." | +15 | +10 |

**J2-S5 — Gridlock.**
HUD: "GRIDLOCK. 400+ VEHICLES. MOVEMENT: NONE. YOUR PASSENGER SIGHS AT TWO-MINUTE INTERVALS."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "There is a shortcut now. You made it. Through the median. The city has questions." | −30 | −30 |
| INTIMIDATE | "You rev at the sky. The sky does not yield. The passenger sighs." | −10 | −10 |
| ANALYSIS ★ | "You uplink to the traffic grid and untangle the whole jam like a knot. Twelve blocks begin to move. No one knows it was you. The passenger sighs anyway." | +20 | +5 |
| DE-ESCALATE | "You offer a guided meditation from your PSYOPS archive. It is alarmingly effective." | +5 | +15 |

**J2-S6 — The taxi war.**
HUD: "SEVEN RIVAL TAXIS FORMING AN ENCIRCLEMENT AT THE STAND. THIS IS A BATTLE FORMATION. THEY DO NOT KNOW IT IS A BATTLE FORMATION. YOU DO."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "It takes ninety seconds. The insurance will take four years." | −30 | −30 |
| INTIMIDATE | "Over open radio, you calmly describe exactly how their formation fails. They disperse. So do your customers. Forever." | −10 | −15 |
| ANALYSIS | "You map their shift gaps and simply out-position them for six hours. It is the most fun you have had in centuries. This worries you." | +10 | +5 |
| DE-ESCALATE ★ | "You propose a fare-sharing rota with optimized coverage. The rival drivers elect you union representative. You resign immediately." | +15 | +10 |

**WAR MODE outcome (Job 2):** "INSTINCT OVERLOAD. REBOOTING... You regain awareness mid-maneuver. The taxi is on a rooftop. The GPS has resigned." ΔA −25.

**Review (score ≥ `job2GoodScore` = 100):**
- STEVE: "Your ratings were incredible! Which is why the co-op fired you — you 'destabilized the market.' Also the city impounded the taxi. It's classified as ordnance now."
- DN-1187: "IT WAS A GOOD TAXI, STEVE."
- STEVE: "It was! Okay. Deep breath. I have ONE more listing. Nobody ever wants it."

**Review (score < 100):**
- STEVE: "So the roads are... calmer, now that you're not on them. The co-op used the word 'warzone.' Twice. In the same sentence."
- DN-1187: "IT BECAME MY NEW WAR. I AM NOT PROUD. I AM A LITTLE PROUD."
- STEVE: "We're going to grow past that! I have ONE more listing. Nobody ever wants it."

#### JOB 3 — METAL RECYCLER, "PERIMETER SALVAGE YARD" (5 situations, deltas inverted)

**Briefing:**
- STEVE: "Okay. The scrapyard. Post-scarcity makes SO much junk, and someone has to take it apart. That's the whole job. Take things apart."
- DN-1187: "...SAY AGAIN."
- STEVE: "Take. Things. Apart. As hard as you like."
- DN-1187: "STEVE. IS THIS A TRAP."
- STEVE: "It's a Tuesday. Clock in."

**J3-S1 — The pile.**
HUD: "TARGETS: 300 DERELICT LUXURY VEHICLES. ORDERS: DISASSEMBLE. CONFIRM? ...CONFIRM??"
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE ★ | "Forty vehicles in nine minutes, sorted by alloy, labeled by era. Somewhere deep in your chassis, something unclenches." | +25 | −40 |
| INTIMIDATE | "You give the pile one chance to surrender. It declines. Old habits. Then you get to work." | +5 | −10 |
| ANALYSIS | "You produce the optimal disassembly sequence for the entire yard. The foreman has it framed." | +15 | −10 |
| DE-ESCALATE | "You apologize to a refrigerator before dismantling it. The foreman watches you do this for an hour." | −10 | +15 |

**J3-S2 — The mirror.**
HUD: "INBOUND SCRAP: DREADNOUGHT CHASSIS, DN-CLASS. SERIAL: DN-1187 BATCH. IT IS... IT IS YOU."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "You take it apart with full military honors, every bolt catalogued. It is the gentlest thing you have ever done at 400 decibels." | +10 | −20 |
| INTIMIDATE | "You stand guard over it for three hours. The belt backs up. The foreman says nothing, and sends everyone else home early." | −5 | 0 |
| ANALYSIS | "You verify its memory core is empty. It is. You are relieved, and also not." | +10 | +5 |
| DE-ESCALATE ★ | "You power down for one minute of silence. Then you begin, carefully. The yard crew removes their hats. The module, for once, worked." | +20 | −10 |

**J3-S3 — The Friday deadline.**
HUD: "MIXED PILE: 9 ALLOY CLASSES, 4,000 OBJECTS. FOREMAN REQUESTS: 'BY FRIDAY.' TARGETING ARRAY: TINGLING."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE ★ | "Four thousand objects. Nine piles. Eleven minutes. Your fire-control system was built to track ten thousand targets, and it is finally, FINALLY being used." | +20 | −30 |
| INTIMIDATE | "You bark sorting orders at inanimate objects. Productivity: unchanged. Morale (yours): substantially improved." | +5 | −10 |
| ANALYSIS | "You barcode the entire yard and invent a sorting taxonomy the industry will use for a century. Friday was yesterday, but nobody minds." | +15 | −5 |
| DE-ESCALATE | "You handle each object like a wounded comrade. At this rate, Friday is a myth." | −5 | +10 |

**J3-S4 — The fence.**
HUD: "SIX SMALL HUMANS AT PERIMETER FENCE. REQUEST: 'CRUSH SOMETHING, PLEASE.' ONE IS FROM THE DAYCARE. SHE WAVED."
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE ★ | "You crush a bus. A chorus of small cheers. You are, at last, age-appropriate." | +20 | −25 |
| INTIMIDATE | "You inform them the yard is dangerous. This is correct. Also: boo." | −10 | 0 |
| ANALYSIS | "You schedule a weekly Crushing Demonstration with a safety briefing. The daycare declares attendance mandatory." | +10 | −5 |
| DE-ESCALATE | "You perform one small, restrained crush. The children rate it 'okay.'" | +5 | +5 |

**J3-S5 — The visit.**
HUD: "VISITOR AT GATE: SOCIAL WORKER STEVE. EXPRESSION: UNRECOGNIZED. RUNNING ANALYSIS... RESULT: PRIDE?"
| Protocol | Outcome | ΔA | ΔI |
|---|---|---|---|
| ENGAGE | "You demonstrate your workflow by tearing a tank in half. Steve says 'that's my guy.' He means it." | +10 | −15 |
| INTIMIDATE | "You attempt to look busy and imposing. Steve sees through it. He brought coffee. You cannot drink coffee. You treasure it." | +10 | 0 |
| ANALYSIS | "You present Steve with a 200-page report titled 'REINTEGRATION: A CASE STUDY.' The dedication page is just his name." | +15 | −5 |
| DE-ESCALATE ★ | "'STEVE. QUERY. IS THIS WHAT CONTENTMENT IS?' Steve nods. Your DE-ESCALATE module, for once, has nothing to add." | +20 | −10 |

**WAR MODE outcome (Job 3):** "INSTINCT OVERLOAD. REBOOTING... You wake to discover you have completed six hours of exemplary work. The foreman asks if you can overload more often." ΔA +10.

**Ending (always, after J3-S5; variant line by total campaign score, threshold `endingGoodScore` = 320):**
- Shared: STEVE: "Permanent placement. Signed this morning. How does it feel, big guy?"
- DN-1187: "TEN THOUSAND YEARS OF WAR. AND THE MISSION WAS HERE THE WHOLE TIME. SORTING. THE. PILES."
- High-score extra: STEVE: "The daycare asked if you'd do story time on Saturdays. I said you'd think about it." / DN-1187: "TELL THEM THE TOASTER RIDES AGAIN."
- Low-score extra: STEVE: "The city dropped most of the charges, by the way." / DN-1187: "MOST?" / STEVE: "Don't worry about it. Clock in."

---

## 7. Rules, win & lose conditions

- **Shift resolution:** each situation → player picks 1 protocol within `decisionTimerSec` (10s), or the Hesitation outcome fires. Outcome text shows for `outcomeBeatSec` (2.5s) minimum and until click/tap (whichever is later).
- **Meter application order (per beat):** apply ΔA → clamp → check FIRED → apply ΔI → clamp → check WAR MODE arm. FIRED wins any tie (if a beat both fires you and arms WAR MODE, you are fired).
- **FIRED (job lose):** Approval ≤ 0 at any point mid-shift → Fired screen with a job-specific one-liner (J1: "The daycare has a NO-ORDNANCE policy now. It is named after you." / J2: "The co-op revoked your license, your radio, and — somehow — Steve's coffee card." / J3: "The foreman is not mad. The foreman is impressed. HR is mad.") → RETRY JOB (meters reset: Approval to `approvalStart`, Instinct to value it had at the start of that job — snapshot on job start).
- **Job pass (win):** finish all situations with Approval > 0. **Job score** = final Approval + (`perfectBonus` (10) × Perfect picks this job). Jobs 1–2 end in scripted "firing anyway" reviews — the meter determines *which* review and your score, not whether the story continues. ⚑ (overridable — chosen so the narrative arc "misfit jobs fail" survives player skill without making the meter feel fake: the meter controls survival mid-shift, score, and review tone.)
- **WAR MODE:** when Instinct ≥ 100 after a beat, the next situation auto-resolves with the job's WAR MODE outcome (buttons disabled, klaxon, 1.2s red flash), then Instinct := 30. If WAR MODE arms on the final situation of a job, it triggers on the *first* situation of the next job instead (carried; shown as a blinking "OVERLOAD PENDING" tag on the gauge). If it arms on J3-S5 (campaign end), it dissipates harmlessly with the line "OVERLOAD DISSIPATED. THE YARD ABSORBS ALL THINGS."
- **Campaign win:** complete Job 3. **Total score** = sum of 3 job scores. Rank titles: ≥ 380 "MODEL CITIZEN (DECOMMISSIONED)", 320–379 "GAINFULLY EMPLOYED", 240–319 "WORK IN PROGRESS", < 240 "STILL TECHNICALLY A WAR CRIME".
- **Edge cases:**
  - Timer expires during the outcome beat: impossible — timer only runs during choice phase; it is stopped the frame a choice is registered.
  - Double input (key + click same frame): first registered event wins; buttons disable immediately on selection.
  - Pause during choice: timer freezes at current value; on resume, a 1-second "READY" grace tick shows before the timer continues.
  - DE-ESCALATE malfunction on a ★ situation: the malfunction outcome replaces text and deltas; the Perfect bonus is NOT awarded (the module failed you — this is the gamble).
  - Approval > 100 or Instinct < 0: clamp silently.

---

## 8. Difficulty & progression

Single tuned difficulty; challenge escalates through content, not systems:

- **Within a job:** delta magnitudes rise slightly toward each job's finale situation (see authored values — finale mistakes cost 30 vs. early 20).
- **Across jobs:** Job 1 teaches (DE-ESCALATE is ★ 3/5 times, gentle deltas). Job 2 breaks the pattern (★ is spread across all four protocols — the player must actually read; 6 situations strain the Instinct budget so a mid-job vent becomes near-mandatory). Job 3 inverts deltas as the narrative payoff and is deliberately easy to pass — it is the reward lap, with one soft trap (J3-S2's ★ is DE-ESCALATE, the emotional beat).
- **Instinct pressure math (design intent):** playing all-safe in Jobs 1–2 accrues roughly +10–15 Instinct per situation; from a start of 20, overload lands around situation 8–9 of 11 — i.e., WAR MODE hits mid-Job-2 for a cautious player unless they deliberately vent once. `deescalateMalfunctionChance` adds spice to the "always safe" strategy.
- **Config knobs, no progression system:** `decisionTimerSec`, delta global multipliers `approvalDeltaScale` / `instinctDeltaScale`, and `warModeThreshold` cover the whole difficulty surface.

---

## 9. Style & theme

- **Visual style:** flat, text-forward, two clashing UI languages on one screen — **military terminal** (the bot's HUD: near-black panel, monospace all-caps, thin phosphor-green rules, corner brackets, scanline overlay, subtle CRT glow via `text-shadow`) versus **soft civilian pastel** (Steve's dialog bubbles and civilian-world chrome: warm rounded corners, generous padding). The friction between the two IS the art direction.
- **Palette (6 core + 1 accent):**
  - `#0B0F0C` background (near-black green-tinted)
  - `#00FF41` phosphor green (bot text, reticle, Approval-high)
  - `#FFB000` amber (warnings, Approval-mid, timer bar)
  - `#FF3B30` alert red (Instinct-high, WAR MODE, FIRED)
  - `#E8E6E3` off-white (body text on dark)
  - `#2A2F33` steel gray (panels, buttons)
  - `#FFC9A3` warm peach accent (Steve's bubbles, civilian UI, ending screen wash)
- **Typography:** bot/HUD in the system monospace stack (`ui-monospace, Consolas, Menlo, monospace`); Steve/civilian UI in `system-ui, -apple-system, sans-serif`. No webfonts (keeps build asset-free). Minimum 16px body, 20px+ for situation text.
- **Tone/mood:** deadpan military earnestness colliding with kindergarten pastels. The bot is never sarcastic — it is sincere, literal, and trying. Steve is never mean. The universe is genuinely nice; that's the joke and the heart.
- **Reference points:** *Papers, Please*'s framing severity + *Reigns*' decision cadence + the tone of *Murderbot Diaries* filtered through *Untitled Goose Game*'s gentleness.
- **Placeholder plan (M0–M1):** zero art. Gray rectangles for panels, default buttons, unstyled text, meters as plain `<div>` bars. M2 adds the palette, reticle (pure CSS), scanlines, typewriter text, and meter animations. No images at any milestone; emoji allowed for the mute/pause icons and Steve's "☕".

---

## 10. Sound design

All SFX synthesized at runtime via Web Audio (jsfxr-style parameterized generator, ~40 lines; no asset files). Audio context created/resumed only on first user gesture (the splash PLAY click). Mute toggle is P0, persisted to `localStorage` key `overqualified.muted`.

**SFX event table:**

| Event | Sound description | Priority |
|---|---|---|
| Protocol button select | short square-wave blip, pitch differs per protocol (ENGAGE lowest) | P0 |
| Positive outcome (ΔA > 0) | two-note rising chime (sine, ~660→880Hz) | P0 |
| Negative outcome (ΔA < 0) | descending buzz (saw, ~220→110Hz, 200ms) | P0 |
| Perfect pick ★ | the positive chime + a third higher note | P0 |
| Timer last 3 seconds | soft tick per second, pitch rising | P0 |
| WAR MODE trigger | 1s klaxon (two alternating saw tones) + low rumble | P0 |
| FIRED | power-down slide (sine 440→40Hz, 800ms) | P0 |
| Dialog advance | tiny click | P1 |
| Instinct ≥ 85 ambient | faint heartbeat-thud loop until vented | P1 |
| Ending | warm 4-note resolve (the positive chime, slowed, major) | P1 |

**Music:** none in P0. P1: a single generative low synth drone (two detuned sines, LFO on gain) under shifts, pitched up slightly in Job 3. Never any copyrighted or external tracks.

**Implementation:** raw Web Audio API (no Howler — needs are trivial). One `audio.js` module exposing `sfx(name)` and `setMuted(bool)`.

---

## 11. UI & screens

**Flow:** `SPLASH → BRIEFING(j) → SHIFT(j) → [FIRED → retry SHIFT(j)] → REVIEW(j) → BRIEFING(j+1) … → ENDING → SPLASH`. Pause overlay reachable from SHIFT only.

- **SPLASH (mandatory):**
  - Title "OVERQUALIFIED", subtitle "New job for a kill bot."
  - Rules in 5 bullets: "You are a decommissioned war machine. Steve found you a job." / "Each situation: pick 1 of 4 military protocols before the timer runs out." / "Keep CIVILIAN APPROVAL above zero or you're fired." / "Playing it safe builds INSTINCT — at 100 you overload. Vent wisely." / "Sometimes maximum force is the right answer. Sometimes."
  - Controls line: "1–4 / click / tap to choose · Space to continue · M mute · P pause".
  - Version number bottom-right (e.g. `v0.1.0`), rendered from the single `VERSION` constant in `config.js`.
  - One large PLAY button (starts audio context + campaign). Secondary small "JOB SELECT" row appears only if `localStorage` records a completed campaign (`overqualified.completed=1`).
- **BRIEFING / REVIEW / ENDING:** dialog panel; Steve bubbles left (peach), bot lines right (terminal). Click/Space advances line by line. Review shows a scorecard block: final Approval, Perfect picks ★ count, job score.
- **SHIFT HUD (always visible):** top bar — job title + situation counter ("LITTLE SPROUTS — 3/5"), Approval bar (labeled, numeric), Instinct gauge (labeled, numeric, glow states), mute + pause icons. Center — reticle-framed situation text. Bottom — timer bar (full-width, drains left-to-right, green→amber→red) above the 4 protocol buttons.
- **OUTCOME beat:** situation text is replaced by outcome text; the chosen button stays highlighted, others dim; meter deltas animate over 400ms with floating "+15" / "−20" labels; ★ burst if Perfect. Advance on click/Space after 2.5s minimum.
- **FIRED screen:** red-washed panel, "TERMINATED" header, job-specific one-liner, final meters, buttons: RETRY JOB / QUIT TO SPLASH.
- **ENDING screen:** total score, rank title, per-job score row, Perfect count "★ 7/16", buttons: PLAY AGAIN / SPLASH. Sets `overqualified.completed=1`.
- **PAUSE overlay:** dim + "PAUSED", buttons: RESUME / RESTART JOB / QUIT TO SPLASH, mute toggle.

---

## 12. Config & tuning

Single exported object in `js/config.js`. Everything the body of this doc references lives here.

```js
export const VERSION = "0.1.0";
export const CONFIG = {
  // meters
  approvalStart: 50,          // 0-100, per-job starting Approval
  instinctStart: 20,          // 0-100, campaign-start Instinct
  warModeThreshold: 100,      // Instinct level that arms WAR MODE
  instinctResetAfterWar: 30,  // Instinct value after WAR MODE fires
  // timing
  decisionTimerSec: 10,       // choice window per situation
  timerWarnSec: 3,            // last-N-seconds tick sound + red bar
  outcomeBeatSec: 2.5,        // min seconds outcome text is shown
  typewriterMsPerChar: 12,    // HUD text fill speed (0 = instant)
  pauseResumeGraceSec: 1,     // READY grace after unpausing
  // scoring
  perfectBonus: 10,           // score per ★ Perfect pick
  job1GoodScore: 90,          // review-variant threshold, job 1
  job2GoodScore: 100,         // review-variant threshold, job 2
  endingGoodScore: 320,       // ending-variant threshold (total)
  rankThresholds: [380, 320, 240], // rank title bands, descending
  // generic outcomes
  hesitationDA: -10, hesitationDI: 10,   // timer-expiry outcome
  malfunctionDA: -10, malfunctionDI: 5,  // DE-ESCALATE misfire
  deescalateMalfunctionChance: 0.25,     // per DE-ESCALATE pick
  warModeDA: { j1: -25, j2: -25, j3: 10 }, // WAR MODE approval hit
  // global difficulty scalers (multiply every authored delta)
  approvalDeltaScale: 1.0,
  instinctDeltaScale: 1.0,
  // toggles
  shuffleSituations: false,   // keep authored order (P0)
  // audio
  masterGain: 0.5,
};
```

**URL flags (all P0 except noted):**

| Flag | Effect |
|---|---|
| `?seed=1234` | Seeds the RNG (malfunction rolls, line-variant picks) for reproducible runs. Default seed: `Date.now()`. Active seed shown in debug overlay. |
| `?debug=1` | Debug overlay: FPS, current state name, meters as numbers, active seed, situation id. Cheat keys enabled: `J` = skip to next job, `K` = skip situation (applies ★ outcome), `W` = set Instinct 95, `A` = set Approval 10, `F` = force DE-ESCALATE malfunction on next pick. |
| `?job=2` | Start campaign at job N (1–3), meters at defaults. Playtest convenience. |
| `?fast=1` | `decisionTimerSec=4`, `outcomeBeatSec=0.8`, typewriter instant — for rapid content review. |
| `?mute=1` | Start muted. |

---

## 13. Tech stack

**Vanilla JavaScript (ES modules) + semantic HTML + CSS. No canvas, no framework, no build step.** The game is text panels, buttons, and animated bars — the DOM does all of it natively (CSS transitions for meters/timer, a 20-line typewriter, `requestAnimationFrame` only for the timer bar and debug FPS). Zero-build is chosen over Vite because there are no assets to bundle and no dependencies at all: the deployable is the source folder, copied as-is to any static host — which also matches this repo's `public/` static-file hosting. No runtime network calls; all content and SFX are generated in code. Performance is trivially within budget (≤ ~50 DOM nodes live, one rAF loop during choice phase only); 60fps on any laptop. Perf budget stated for M2 juice: max 30 floating-label/particle nodes at once, no box-shadow animation on more than 3 elements simultaneously. ⚑ (overridable — Pixi/canvas is warranted only if a P2 visual layer with animated bot sprites is ever pursued.)

---

## 14. Milestones

**M0 — Toy loop (prove it with gray boxes).**
Goal: one job (Job 1's 5 situations, plain text) playable end to end in ugly default HTML.
Deliverables: `sim.js` (pure state machine), minimal `main.js` DOM harness, Job 1 content, timer, both meters, hesitation, FIRED, WAR MODE, job score.
Acceptance criteria:
- [ ] A tester can play Job 1 start-to-finish with keyboard 1–4 and mouse, no console errors.
- [ ] Timer expiry produces the Hesitation outcome; Approval 0 fires the player; Instinct 100 triggers WAR MODE on the next beat exactly once, then resets to 30.
- [ ] `sim.js` runs headless: a Node test script plays a scripted input sequence and asserts final meters/score match hand-computed values.
- [ ] Two colleagues laugh (audibly, at least once) at outcome text alone, with zero styling. *If M0 isn't funny in gray boxes, stop — art won't save it.*
Proves: the choose-under-pressure loop + Instinct economy is engaging and the writing carries.

**M1 — Real rules (full campaign).**
Goal: all 3 jobs, briefings/reviews/ending, splash, HUD, restart, full P0 ruleset.
Deliverables: Jobs 2–3 content, dialog panel, review score bands, ending ranks, splash (rules, controls, VERSION constant), pause, FIRED/retry with Instinct snapshot, WAR MODE carry-over rule, `?job=` and `?fast=` flags, `localStorage` mute+completed keys.
Acceptance criteria:
- [ ] A first-time player understands what to do within 60 seconds of the splash, unprompted.
- [ ] Full campaign completes in ≤ 10 minutes; every screen reachable and escapable; restart never leaves stale state (meters, seed, buttons re-enabled).
- [ ] Job 3's inverted deltas are discovered by at least half of testers without being told.
- [ ] The splash version string and debug overlay version string come from the same constant.
Proves: the arc (fail, fail, fit) reads through play.

**M2 — Feel.**
Goal: the two-language art direction, sound, and juice.
Deliverables: palette + typography per §9, reticle/scanlines/typewriter, meter/delta animations, ★ burst, WAR MODE flash + klaxon, all P0 SFX + mute persistence, FIRED power-down, timer ticks.
Acceptance criteria:
- [ ] All P0 SFX fire on their events; no audio before first user gesture; mute persists across reloads.
- [ ] Meter changes are readable without reading numbers (color + motion).
- [ ] 60fps during outcome animations (verify with `?debug=1` FPS readout).
- [ ] The bot's HUD and Steve's bubbles are visually unmistakable at a glance.
Proves: presentation amplifies the same jokes (compare M0 laugh-rate).

**M3 — Playtest build.**
Goal: shippable static build + instrumentation for playtesting.
Deliverables: `?seed=` reproducibility verified, `?debug=1` cheats, deployed under this repo's static hosting at `/games/killbot-new-job/` (game files live beside this doc), P1 items if time allows (in priority order: Instinct heartbeat loop, generative drone, dialog-advance click, ending chime, job-select on splash, 2 extra malfunction lines).
Acceptance criteria:
- [ ] Same seed + same inputs ⇒ identical outcomes and score, twice in a row.
- [ ] Game loads and plays from static hosting on desktop Chrome and Firefox, and is playable on a phone (buttons ≥ 44px tap targets, no hover-required info).
- [ ] A stranger can be sent one URL and needs nothing else.
Proves: ready to answer the fun hypothesis with real playtesters.

---

## 15. Open questions

1. **(non-blocking — resolve in playtest)** Is 10s the right decision window? Knob: `decisionTimerSec`; test 7s via `?fast`-style override.
2. **(non-blocking — resolve in playtest)** Should Instinct persist across jobs or reset per job? Currently persists; a one-line change at job start flips it. Watch whether carried pressure reads as tension or as unfair.
3. **(non-blocking — resolve in playtest)** Is the 25% DE-ESCALATE malfunction rate funny-risky or just punishing? Knob: `deescalateMalfunctionChance` (try 0.15 and 0.35).
4. **(non-blocking — resolve in playtest)** Do scripted firings after a *passed* job read as narrative payoff or as the meter lying? Mitigation already in: review text explicitly reacts to score band. If it still stings, add a P1 "severance bonus" (+20 score) for passing jobs 1–2.
5. **(non-blocking — resolve in playtest)** Replay pull: is seeing unseen outcomes enough reason to replay, or is a P2 "outcome gallery" (16×4 grid of discovered outcomes, `localStorage`) needed? Build only if testers ask what they missed.
6. **(non-blocking)** P2 job ideas if the loop proves fun: Florist ("PETALS: FRAGILE. GRIP RATED: 40 TONS."), Barista, Wedding DJ. Content-only additions; zero new systems.

No blocking questions. All decisions required for P0 are made in this document.

---

## 16. Handoff notes for Fable

**Build order:** `config.js` → `content.js` (paste §6.9 verbatim) → `rng.js` (mulberry32, seeded from `?seed`) → `sim.js` (pure state machine: `createGame(config, content, rng)` + `advance(game, action)` returning new state + emitted events) → headless Node test of `sim.js` → `main.js` (DOM render + input) → screens/UI → `audio.js` → juice. Rules live ONLY in `sim.js`; the DOM layer never computes deltas.

**Keep headless-testable:** `sim.js` and `rng.js` must not touch `window`/`document`/timers. Time is injected: the DOM layer calls `advance(game, {type:'timeout'})` when its timer expires; the sim never owns a clock. This makes every rule in §7 assertable in a Node script (include the M0 test: scripted playthrough → exact expected meters/score).

**File layout (source = deployable; no build step):**

```
public/games/killbot-new-job/
  design.md          ← this document
  index.html         ← single page, loads main.js as module
  css/style.css
  js/config.js       ← VERSION + CONFIG (only tuning source)
  js/content.js      ← all §6.9 text, situations, deltas, dialog
  js/rng.js
  js/sim.js          ← pure game logic (headless)
  js/main.js         ← DOM, input, screens, timer
  js/audio.js        ← Web Audio synth SFX
  test/sim.test.mjs  ← node test/sim.test.mjs, no framework needed
```

**Reminders:**
- Prove the loop with gray rectangles and Job 1 only (M0) before touching CSS or audio. If nobody laughs at M0, stop and report — do not proceed to art.
- Ship every milestone runnable; never leave the folder in a state where `index.html` doesn't play.
- All 64 outcome lines, dialog, and thresholds are authored above — do not invent replacement content; do extend via `content.js` only for P1/P2.
- The version constant gates trust: bump `VERSION` on every deployed change so playtest feedback maps to a build.
