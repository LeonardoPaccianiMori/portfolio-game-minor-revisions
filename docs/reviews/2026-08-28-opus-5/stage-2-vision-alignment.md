# Stage 2 — Alignment Audit

---

## 1. Corpus confirmation

### New files supplied at this stage

| File | Status |
|---|---|
| `README.md` | Read completely. Substantive, untruncated. |
| `AGENTS.md` | Read completely. Substantive, untruncated. |
| `docs/00-design-index.md` | Read completely. Substantive, untruncated. |
| `docs/01-vision-and-pillars.md` | Read completely. Substantive, untruncated. |
| `docs/13-testing-and-evaluation.md` | Read completely. Substantive, untruncated. |
| `docs/14-production-plan.md` | Read completely. Substantive, untruncated. |
| `docs/15-implementation-contract.md` | Read completely. Substantive, untruncated. |
| `docs/decision-log.md` | Read completely. Substantive, untruncated. |
| `docs/glossary.md` | Read completely. Substantive, untruncated. |
| `assets/ASSET_MANIFEST.md` | Read completely. Substantive, untruncated. |

### Stage-1 gaps now closed

- `01-vision-and-pillars.md`, `13-testing-and-evaluation.md`,
  `14-production-plan.md`, `15-implementation-contract.md`, and
  `assets/ASSET_MANIFEST.md` — all previously flagged as referenced-but-absent —
  are now supplied.
- All `MR-REQ-*` requirement records are now supplied (in `15`).
- `MR-TEST-*` scopes and required evidence are now supplied (in `13`).

### Gaps that remain

- No document numbered `02`–`12` is re-supplied; I rely on my Stage-1 reading.
- `strings.en.json` and the validated content JSON do not exist (stated
  explicitly in `12` and `11`).
- The private evidence records, contribution records, and case study referenced
  by `13`, `14`, and `01` do not exist yet, by design.

No supplied file is absent, empty, truncated, or unreadable. Proceeding.

---

## 2. Concise statement of the intended game

From `01-vision-and-pillars.md` (principal source), supported by `README.md`,
`13`, `14`, and `decision-log.md`:

*Minor Revisions* is intended to be a **first-person, bitterly comic
academic-survival game** in which difficulty comes from planning,
interpretation, time allocation, and ethical choices — never dexterity or
precision. Its central contrast is **plausible science inside an increasingly
absurd institution**. Publication is achievable but resolves nothing; failure
still yields insight or a defensible exit; industry breaks the academic loop
without being moral perfection. One evolving research floor and reusable
experiment systems are meant to produce dense consequence in ~3 hours, with a
90-minute fallback and a 20–30-minute slice proving the concept first.

Four intent statements are especially load-bearing:

1. **Audience breadth.** "The game must not require knowledge of academia,
   developmental biology, or laboratory work." Academic recognition is an
   *extra layer*; portfolio reviewers are secondary; the game must work as a
   game first.
2. **Emotional arc.** Amusing recognition → pressure → **uncomfortable
   complicity** → bitter but human ending. Explicitly **not nihilistic**:
   solidarity stays meaningful, leaving is not total defeat.
3. **Humour through active play.** Pillar 6 plus the Humour Execution Rule:
   the game "must remain fun and absurdist throughout," and humour must come
   from "institutional language, physical environment, and **responsive
   systems**," not dialogue delivery alone. "Every serious game system must
   allow comic, satirical, or strange feedback."
4. **Eight qualitative success criteria**, including "The first part can make
   the player laugh," "the later parts create pressure and discomfort," and
   "a player without academic experience can explain the main objective."

Process intent (`01`, `14`, `15`, `AGENTS.md`): the project is simultaneously a
personal creative outlet and a transparent demonstration of Leonardo directing
LLM agents. The fiction never mentions AI. Evaluation is private to Leonardo and
Codex, with **no external playtesters, surveys, or outside review** (`13`).

---

## 3. Concise restatement of the locked Stage-1 implied game

Preserved unchanged from Stage 1; not adjusted to fit the revealed vision.

A calendar-locked, resource-constrained narrative management game on one
continuous ~400 m² floor. 64 work periods; walking, reading, and dialogue free;
commitment costs 1–3 periods and 0–2 energy from five segments. Seven mandatory
scenes fire in fixed weeks regardless of readiness; gates never wait; there is
no game-over before Week 16. The loop is an asynchronous five-stage experiment
cycle across six templates with max three concurrent groups, resolving into two
layers (biological result, evidence quality) inside seed-locked preparation
bands. The second half is a manuscript card board with careful/strong/inflated
claims, a fixed rejection ladder, and one `PIIM` major-revision round with three
conflicting reviewers and three response cards. Four parallel numbers (evidence
0–12, PI confidence 0–100, integrity 0–100 + permanent flags, five trust bars
0–100) gate an Aldercroft interview and a Morrow offer. Week 16 at 06:42 gives
four ending labels and a 60–90-second modular epilogue plus 12 Institutional
Citations in a local archive.

Stage-1 characteristic conclusions I hold to:

- **Energy, not periods, is the binding constraint**; protected breaks are
  structurally mandatory and are the game's most frequent action.
- **Evidence saturates easily** (5 required templates × 2 pts + starting 3 ≥ 12
  cap), shifting real difficulty onto energy, trust, and claim discipline.
- **Integrity gates nothing**; PI confidence does, and inflation pays it.
- **Kindness is efficient** (Samira EV+1 at 1 period/0 energy; Gabriel's
  shortcut at 1 period/0 energy).
- **The game behaves with the integrity the institution lacks** — full
  disclosure, no ambush, no lost windows, no reroll.
- **An honest run has less content** (two optional scenes and one citation
  require a visible record mismatch).
- Replay incentive is deliberately thin and concentrated in the 12 citations.

---

## 4. Alignment matrix

Classification key: **SR** strongly reinforces · **S** supports · **N** neutral
· **W** weakens · **C** actively contradicts.

| # | Vision principle | Concrete decision / system interaction | Class | Likely player experience | Conf. | Sources |
|---:|---|---|---|---|---|---|
| 1 | P1 Survival through decisions, not dexterity | No combat, no timed/hold/drag/precision input anywhere; focused views use selection and confirm; pre-commitment cost display | **SR** | Every difficulty spike is a scheduling or ethical question; players never lose to reflexes | high | `01` P1 & non-goals; `10` interaction principles; `04` B08 science access; `12` `MR-TUT-003/004` |
| 2 | P1 difficulty from **planning** | 64 periods vs 48–62 needed; energy arithmetic forcing ~15–20 break-periods; three concurrent sample slots; capped request desk | **SR** | Genuine, felt scarcity; the calendar is the antagonist | high | `07` route budgets & break rules; `02` cost table; Stage-1 §6.1 |
| 3 | P1 difficulty from **interpretation** | Configuration→band mapping, evidence-quality rules, "suspicious" state, and family-specific choices are all unspecified; results arrive as pre-labelled plain-English readings ("Observation… Interpretation…") | **W** | Interpretation may feel like *reading a verdict* rather than forming a judgement; the pillar's third leg has the least mechanical substance | medium-high | `12` `record.*.strong/limited/weak` (interpretation pre-written); Stage-1 §11 gaps; `07` inputs named without mappings |
| 4 | P1 difficulty from **ethical choices** | Integrity is a labelled menu with fixed prices (I-10/-25/-45) at one Week-14 scene, plus omission on the board; no falsification method | **S** | Clear, legible, confessional moral moments; no fiddly forgery minigame | high | `12` `MR-SCN-A-REASONABLE-RESPONSE`; `07` integrity rules; `03`/`04` no-falsification rule |
| 5 | P1 ethics as real difficulty | Integrity gates **no route**; PI confidence gates Aldercroft and pays **+10 for inflation**; recovery capped at 10 pts/run | **W** | The optimising player inflates because inflation is the only thing that *buys* anything; ethics reads as flavour rather than cost | high | `07` PI confidence & integrity rules; `08` route-unlock ("hidden integrity problem alone does not block"); `12` claim effects |
| 6 | P2 Plausible science | Standardized tissue model, association-not-cause discipline enforced in every string, no quantities, no protocol, real grounding sources retained | **SR** | Science reads credible and adult; the game never insults the player with magic | high | `04` model & safety boundary; `12` `MR-TEST-CONT-001` no-causation scan; `15` `MR-REQ-EXP-003` |
| 7 | P2 **Surreal institution** | `09` bans distorted architecture, glitch, giant props, cartoon slapstick; `06` caps change at 1 major + 2 minor per phase across the *whole floor* (≤5 major, ≤10 minor all game); environmental text is explicitly non-load-bearing and skippable | **W** | The institution becomes *verbally* absurd but *visually* and *systemically* orderly; "increasingly surreal" is delivered mostly in notices the player may never read | medium-high | `README` "increasingly surreal"; `06` environmental progression list vs change budget; `06`/`12` "Required information never depends on an inspectable environment item alone" |
| 8 | P3 Publication does not resolve the system | `ending.paper.published` = an immediate new grant-aim request by Friday; `ending.career.academia` = bridge appointment + another committee document; paper state deterministic after W16 | **SR** | The thesis lands hard and cheaply; the epilogue refuses catharsis by construction | high | `12` ending modules; `08` B06 contract; `07` B06 resolution |
| 9 | P3 Failure yields insight or defensible exit | No pre-W16 game-over; gates open lower-evidence routes; "Poor results always provide useful information"; crash restores energy | **SR** | Failure feels like narrowing, not erasure; the player keeps agency at every gate | high | `02` outcome principles & soft failure; `07` gates; `03` invariants |
| 10 | P4 Exit meaningful, not utopian | **Morrow requires only *Developing* evidence — the campaign's starting value (3 pts)**; the rest is reply + call + preprint + Camila 41 + no confession | **W** | A player who does almost no successful science can still earn the industry route; industry can read as the low-effort escape hatch rather than a considered trade-off | high | `07`/`08` Morrow conditions; `07` "The game starts at three points, Developing" |
| 11 | P4 Industry not moral perfection | Camila is the only warmly written character; `ending.relationship.camila.support` "direct and kind"; `ending.career.morrow` = "clear project board," "finite only in the way a useful job can be finite"; honesty is *rewarded* in her scenes | **W** | Morrow reads as the emotionally cleanest ending in a game whose other endings are all bleak; the intended imperfection is stated more than felt | medium-high | `12` Camila scenes & ending modules vs `ending.career.academia`/`none`; `05` Camila rules |
| 12 | P4 Exit gradient is neutral | Exit becomes more inviting from Week 8 for **every** player regardless of eligibility; `MR-MUS-06` "Exit horizon: sparse open chord"; pre-W16 exit gives one dry line, no false sequence | **S** | An honest, universal pull toward leaving that avoids signposting a best ending | high | `06` semester states; `09` lighting; `12` music roles |
| 13 | P4 Leaving is not total defeat | **Out of Scope** requires ≥1 available route (so it costs real work); `MR-CIT-11` "Scope Realignment Certificate"; `ending.career.leave` "no longer waiting in the same corridor" | **S** | Departure feels earned and dignified rather than a quit button | high | `07`/`08` B06 resolution; `12` citation & career module |
| 14 | P5 Compact depth | One continuous 400 m² floor, 20 prop families, 6 station kits, 4 NPCs, 20 lighting presets, one modular kit, no loading screens | **SR** | Space acquires meaning through repetition; production stays credible | high | `06` floor plan & acceptance criteria; `09` inventory; `ASSET_MANIFEST` planning inventory |
| 15 | P5 One *evolving* floor | Five act states + four period layers × strict change budget; changes only on safe room entry | **S** | Recognisable slow drift rather than spectacle; risk of under-reading the change | medium-high | `06` act states & persistence limits |
| 16 | P6 Humour from **responsive systems** | Institutional Citations fire diegetically during play; Elena's contradictory-request variants; journal rejection records; `MR-CIT-05` satirising collegiality as "additional capacity" | **SR** | The best jokes are consequences, not lines — exactly the pillar's demand | high | `08`/`12` citations; `12` `scene.whatWeHad.elena.conflict`, `record.cosmos/knowledge/dsl` |
| 17 | P6 Humour from responsive systems (counter-evidence) | All system feedback strings are plain service English (`ui.save.success` "Saved at a safe point."); forecasts, cost displays, Research Status reasons, and warnings are specified as factual and non-moral; **`MR-REQ-VISION-001`'s primary work package is `MR-WP-08` — content integration, not any system package** | **W** | Comedy is delivered by authored text and consequence stamps; the *interface* the player touches 60× is deliberately humourless | medium-high | `12` UI draft; `07` "Integrity warnings are factual and do not give a moral label"; `15` requirement→work-package map |
| 18 | P6 "Fun and absurdist **throughout**" | Weeks 10–16 are designed as colder light, thinner music, review pressure, emptier rooms, and mandatory oxygen-loss work; the same document also promises "later parts create pressure and discomfort" | **W** (and a vision-internal tension) | The back half is intended to stop being fun; two vision statements pull opposite directions and the systems obey the darker one | high | `01` pillar 6 vs `01` emotional arc & criteria; `06` act states; `09` music "colder and thinner" |
| 19 | Audience: no academic knowledge required | Drafted satire is insider-coded: sham controls, batch effects, preprints, "minor revisions," Reviewer 3's stress-response objection, four-journal prestige ladder, "version final-two" | **W** | Non-academics will follow the *plot* but a large fraction of the comedy and much of the peer-review tension depends on knowing the norms being parodied | medium-high | `12` env text & records; `03` submission ladder & reviewer table; `01` audience statement |
| 20 | Audience: comprehension support | Tutorial teaches **interface only** (`MR-TUT-001`–`009`); no in-game explanation of what a preprint is, why a sham matters, or what peer review does; 6,000 unique-word cap; `record.projectNotebook.body` and one-line experiment purposes carry the load | **W** | Objective is graspable; *why the science matters* and *why the institution's demands are absurd* rest on thin scaffolding | medium | `12` tutorial & experiment text keys; `12` word cap; `01` success criterion 1–2 |
| 21 | Emotional arc: amusing recognition (act 1) | `MR-SCN-CLARIFIED` internal lines; Weeks 1–4 "orderly but overbooked"; Gabriel's queue policy; Form 18B; three warm-ish optional scenes in W1–5 | **SR** | The opening is likely to land as intended | high | `12` Clarified script, env bureaucracy, `MR-OPT-GABRIEL-QUEUE` |
| 22 | Emotional arc: **uncomfortable complicity** | Preprint posts in **every** run regardless of packet quality; "the form… has a box for yes and no box for not meaningfully"; `A Complete Narrative` permits writing on a Thin packet with its own sharper low-evidence variant | **SR** | Every playthrough contains a moment of publishing something the player knows is inadequate — complicity is structural, not optional | high | `03` submission ladder; `12` `MR-SCN-PUBLIC-RECORD`, `scene.complete.elena.lowEvidence` |
| 23 | Emotional arc: complicity has weight | Integrity's only consequences are an epilogue label, two conditional scenes, and the Camila confession; no route effect; no discovery unless the player created a visible mismatch | **W** | Complicity may feel *narratively* heavy but *mechanically* weightless; some players will read it as a cosmetic roleplay axis | medium-high | `07`/`08` route rules; `08` integrity epilogue table; `12` conditional scene triggers |
| 24 | Not nihilistic; solidarity meaningful | Samira credit gives EV+1 for 1 period/0 energy; Gabriel ≥61 opens a permanent physical shortcut; correction options restore integrity and trust; `MR-CIT-05`/`06` | **SR** | Kindness is *mechanically* real, not sentimental — the single strongest vision-to-system translation in the corpus | high | `06` pass-through rule; `12` `optional.samira.figure.*`, `optional.gabriel.queue.wait`, citations 05/06 |
| 25 | Not nihilistic (counter-risk) | Because kindness is also the cheapest efficiency, solidarity can become a purchase; `MR-CIT-05` names this ("recorded as additional capacity") | **N** | The design pre-empts its own risk by satirising it; net effect ambiguous but not nihilistic | medium | `12` `MR-CIT-05`; Stage-1 §9.2 |
| 26 | Bitter but human ending | Four labels, 29 modules, relationship afterbeat precedence, integrity treatments, fatigue treatments, `ending.career.none` "The contract ended on time. The person who held it did not." | **SR** | Endings are specific, personal, and unranked; bleak without contempt | high | `08` epilogue structure; `12` ending draft |
| 27 | "No moral score" | No score displayed; integrity warnings factual; `MR-CIT-07` fires for correction *or* fabrication with "no moral rank"; ending card shows labels not rankings | **SR** | The game declines to grade the player — a rare and consistent commitment | high | `05` dialogue principles; `07` integrity display; `08`/`12` `MR-CIT-07` |
| 28 | "No moral score" (counter-pressure) | Five permanently visible trust bars, a five-segment integrity bar, PI confidence labels, packet labels, and route feedback ("Aldercroft needs a stronger research case") | **W** | Players may manage a dashboard of five people instead of relating to five people; the intended ambiguity is partly converted into legible status | medium-high | `07` state model & Research Status; `10` HUD rules; `12` `ui.route.feedback` |
| 29 | Success criterion: choices have visible effects | Every material change gives a stated reason; permanent flags override recovered bars, invisibly | **S** (with one axis weak) | Visible for trust/PI/evidence; *invisible* for the flag layer, which is where the real relationship damage lives — accurate, but it will read as unresponsive bars to some players | medium-high | `07` stated reasons; `05` "permanent breach overrides a later high working-trust bar" |
| 30 | Vision: three-hour arc from one floor + bounded content | ~59 usable work periods → ~60 total meaningful decisions across 3 hours; ~16 min non-interactive; monitoring walk repeated ~20+ times; protected break as the most frequent action | **W** | Real risk that the middle hours feel like *administration* (walk, confirm, break, walk) rather than escalating satire — the exact failure the vision names | medium-high | `07` budgets & 3-hour principle; `02` cost table; Stage-1 §6.1, §6.7 |
| 31 | Vision: 90-minute fallback is a *coherent game*, not a damaged one | Fallback removes `MR-OPT-HAORAN-MISSING-REPLICATE` and `MR-OPT-GABRIEL-ARCHIVE` — **both** scenes in which a colleague notices a record mismatch | **C** | In the fallback, fabrication has essentially no social consequence and no discovery path; "uncomfortable complicity" loses its only interpersonal expression | high | `12` fallback exclusions; `03`/`05` "Haoran and Gabriel can only notice a mismatch supported by the player's visible evidence trail" |
| 32 | Fallback keeps "all ending modules and citations" | `MR-CIT-08` triggers on "read a concern from Haoran or Gabriel and respond" — **both** trigger scenes are removed in the fallback | **C** | A stated-complete citation set is unreachable in the version most likely to ship; `13` requires a fixture for all twelve | high | `12` fallback list vs `MR-CIT-08`; `13` MR-TEST-END-001 & MR-TEST-CONT-001 |
| 33 | "No citation requires unethical play" | `MR-CIT-08` requires a *visible record mismatch* (or an authorship state supporting Haoran's concern) — i.e. it is reachable only after an omission, alteration, or denied credit | **C** (rule-level) | A fully scrupulous player cannot complete the citation set, contradicting an explicit stated rule and its test | medium-high | `12` `MR-CIT-08`, `MR-OPT-HAORAN-MISSING-REPLICATE` entry condition, "No citation requires an unethical choice" |
| 34 | Pressure profiles change access/tolerance only | Supported removes the night-work energy surcharge, which **dissolves the trust-versus-evidence coupling** (night work costs relationships because Elena/Haoran/Samira/Gabriel are absent) and makes breaks efficient | **W** | Identical content, materially different *argument*: Supported softens "the body as a constraint," which is a thesis change, not an access change | medium-high | `02`/`07` profile rules; `05`/`06`/`07` schedule tables; Stage-1 §9.9 |
| 35 | Vision: game must not require academic knowledge — verification | `13` forbids external playtesters, surveys, and outside review; **Leonardo is the sole human evaluator**, and the project is emotionally inspired by his own postdoc experience | **C** (as a verification method) | The claim most in need of an outsider is checked exclusively by the maximally-inside person; no evidence path exists to falsify it | high | `13` evaluation boundary; `01` audience statement & creative purpose; `decision-log` 2026-08-23 |
| 36 | Vision requirement is testable | `MR-REQ-VISION-001` ("Preserve bitterly comic, accessible institutional satire") maps only to `MR-TEST-CONT-001`, which checks IDs, keys, counts, word count, causation claims, and actionable-protocol scans — **nothing about comedy or accessibility** | **W** | The pillar with the least testable content has the weakest verification harness in an otherwise rigorous test plan | high | `15` requirement table; `12` `MR-TEST-CONT-001` list; `13` test table |
| 37 | Success criterion: "the first part can make the player laugh" | The vertical-slice gate (`13`, six items) checks comprehension, costs, save behaviour, blockers, and coherence — **not humour**; the eight experience criteria are only reviewed "before a release candidate" | **W** | Tone is validated *after* the fallback gate, i.e. after the last point where scope could be reframed on tonal grounds | high | `13` vertical-slice & full-game evaluation sections; `14` phase gates |
| 38 | Compact depth + portfolio evidence | `15` work packages put comedy and campaign content in `MR-WP-08`, **after** the vertical-slice gate (`MR-WP-07`) | **N**/**W** | Systems will be proven before the game's voice is; the slice's humour rests on Clarified + Gabriel's queue + rejection records alone | medium | `15` work-package table & sequencing; `12` slice contents |
| 39 | Game fiction never references AI production | No content object mentions AI, agents, or automation | **SR** | Clean; the satire stays aimed at academia | high | `12` full catalogue; `01` boundary |
| 40 | Teen / 12+ content boundary | Crash is fatigue not medical event; organoid damage "scientific and stylized"; no gore/flash/body horror; content note on first New Game | **SR** | Pressure is depicted without exploitation | high | `01` content boundary; `09` effects; `12` `ui.contentNote` |
| 41 | Non-goals honoured | No combat, horror, multiplayer, open world, hunger/thirst, crafting, romance, procedural campaign, wet-lab training, blank avatar | **SR** | Scope discipline is total; every non-goal has an enforcing rule somewhere | high | `01` non-goals vs `05` no romance, `07` no procedural requests, `11` no physics/network, `04` safety boundary |
| 42 | "Branching and replayability may add longevity" | One active save deleted on completion; no carryover; one-time content; saved variants never reroll; replay incentive = 12 citations needing ≥3 runs | **N** | Longevity is a stated *maybe* and the design declines it; consistent with "may," inconsistent with any expectation of replay depth | high | `08` archive rules; `10` replay; `12` selection rules |
| 43 | Institution is the antagonist | **The software is scrupulously fair**: pre-commitment disclosure, no ambush messages, no lost windows on browser close, no reroll, stated expiries, protected saves, backup recovery | **S** (with a tonal cost) | The player is mistreated by *characters* but never by *the system*; institutional cruelty is depicted rather than administered, which protects fairness and slightly dampens felt oppression | medium-high | `02` interruptions; `07` gates; `10`/`11` save & recovery; Stage-1 §3 |
| 44 | Portfolio value comes from "quality of the result and evidence of process" | `AGENTS.md`, `15` (requirement map, work packages, definition of done), `13` (12 test IDs, coverage targets), `14` (phase gates, stop rules, €150 ceiling), `ASSET_MANIFEST` (integration gate) | **SR** | Process evidence is unusually strong and self-consistent; it demonstrably shaped scope conservatism rather than being bolted on | high | all four documents; `00` roadmap statuses |

---

## 5. Strongest expressions of the vision

**5.1 Failure architecture (P3).** The single most complete translation of
intent into rules. "Failure may still produce insight or a defensible exit"
becomes: no pre-Week-16 game-over, gates that open lower-evidence routes rather
than stalling, "Poor results always provide useful information, a clear reason
to repeat, or a lower-quality route forward," a crash that restores energy while
costing opportunity, and an epilogue label (**End of Contract**) that cannot be
chosen and still "retains agency beyond the university." `explicit`, high.

**5.2 Publication as anticlimax (P3).** `ending.paper.published` — a Friday
request to repurpose the figure for a grant aim — plus `ending.career.academia`
— a bridge appointment and another committee document — deliver the thesis in
two sentences with no randomness permitted after Week 16. `explicit`, high.

**5.3 Solidarity made mechanical (arc / anti-nihilism).** Samira's credit choice
yields EV+1 and co-authorship for 1 period and 0 energy; Gabriel at 61 opens a
permanent physical shortcut; both Haoran and Gabriel concern scenes contain a
correction option that repairs trust *and* integrity. "Small acts of solidarity
can have value even when they do not change the institution" is implemented as
material value that changes nothing institutional. `explicit`, high.

**5.4 Structural complicity (arc).** The preprint posts in **every** run.
`A Complete Narrative` opens manuscript work on a Thin packet and has a sharper
low-evidence variant. `scene.publicRecord.internal.check` — "a box for yes and no
box for not meaningfully" — is the vision's "uncomfortable complicity" as an
unavoidable beat rather than an optional sin. `explicit`, high.

**5.5 Institutional Citations as system-delivered satire (P6 + Humour Rule).**
Twelve diegetic stamps that fire during play in response to state, are
un-ranked, persist across runs, and include jokes aimed at the player's own
virtue (`MR-CIT-05`, `MR-CIT-07`). This is the clearest case of a serious system
carrying comic feedback without hiding stakes. `explicit`, high.

**5.6 The no-moral-score commitment (`decision-log` 2026-08-26).** Held
consistently across `05` (no score, stance-based options), `07` (factual
integrity warnings), `08` (no ending ranking), and `12` (`MR-CIT-07` explicitly
rank-free). Rare internal discipline. `explicit`, high.

**5.7 Non-goal enforcement.** Every one of the thirteen non-goals in `01` has at
least one enforcing rule in a downstream document. Scope has not drifted between
B00 and B10. `explicit`, high.

---

## 6. Greatest threats to the vision

Ordered by expected impact on the intended experience.

**6.1 The fallback deletes the complicity payoff — and the fallback is the
likely shipped artifact.**
`14` states 6–8 h/week capacity, a 12–18-month estimate, and a stop rule
(no. 5) that explicitly permits the project to "remain a fallback." `12`'s
fallback cut removes `MR-OPT-HAORAN-MISSING-REPLICATE` and
`MR-OPT-GABRIEL-ARCHIVE` — the only two scenes where a colleague can notice a
record mismatch — while retaining the full integrity fork in Week 14. Result: in
the 90-minute version, a player can omit, alter, or fabricate and encounter
*nobody*. Discovery, confrontation, and correction-through-relationship all
disappear; only the epilogue label and the Camila confession remain. The
emotional arc's third stage becomes private and consequence-free.
`interpretation` from `explicit` cut lines; high confidence.
Sources: `12` fallback exclusions; `14` stop rules 4–5; `03`/`05` mismatch rules.

**6.2 Morrow is reachable with the campaign's starting evidence.**
The Morrow gate requires "at least a Developing evidence packet," and `07` states
"The game starts at three points, Developing." Every other Morrow condition is a
conversation: reply, video call, preprint (automatic), Camila ≥41 (one +10
choice from a 40 start), no confession. Therefore a player who runs almost no
successful experiments can still land the industry route. Combined with Camila
being the only warmly written character and `Transferable Skills` being the least
bleak epilogue, industry risks becoming the *easy* and *nicest* ending — directly
against P4 ("not presented as moral perfection") and P1 (difficulty from
planning and interpretation). `implied`, high.
Sources: `07`/`08` Morrow conditions; `07` evidence starting value; `12` Camila
scenes and `ending.career.morrow`.

**6.3 The middle hours may become administration rather than satire.**
Stage-1 arithmetic: ~59 usable periods, ~60 meaningful decisions, protected
breaks as the most frequent single action, and a monitoring walk repeated 20+
times to a station that the desk can already describe in words. `01` demands the
game "remain fun and absurdist throughout" and `07` demands "escalation, not
repetitive grinding," but the loop's texture in Weeks 6–14 is walk → confirm →
break → walk, under colder light and thinner music. This is the specific failure
mode "a comic system that becomes routine administration." `interpretation`,
medium-high.
Sources: `02` cost table; `07` budgets & balance principle; `06` act states;
`09` music progression.

**6.4 The satire's accessibility is asserted, unsupported, and unverifiable.**
`01` requires that no academic knowledge be needed. But (a) the drafted comedy is
overwhelmingly insider-coded (sham controls, batch effects, preprint norms,
prestige-ladder rejection language, Reviewer 3's "stress with better public
relations"); (b) the tutorial teaches only interface, and no content object
explains what a preprint is, why a sham matters, or how peer review works; (c)
the 6,000 unique-word cap leaves little room for exposition; and (d) `13` bans
external evaluation, so the sole judge of "understandable without academic
knowledge" is the ex-academic author. `implied`/`interpretation`, high.
Sources: `01` audience & criteria; `12` env text, records, `MR-TUT-001`–`009`,
word cap; `13` evaluation boundary.

**6.5 Integrity is thematically central and mechanically inert; PI confidence
pays for inflation.**
Inflated claims give **+10 PI confidence** (a genuine route currency for
Aldercroft) and **−45 integrity** (no route effect at all). Hidden integrity
problems explicitly block nothing. Recovery is capped at 10 points per run, so
alteration and fabrication are irreversible but also inconsequential. The
optimising player's correct move is to inflate. Two divergent risks follow: the
optimiser experiences ethics as a free cosmetic axis (undercutting "difficulty
from ethical choices"), and the sincere player experiences their restraint as
mechanically unrewarded (undercutting "choices have visible effects").
`implied`, high.
Sources: `07` PI/integrity rules; `08` route-unlock contract; `12` claim effects
and response fork.

**6.6 "Surreal institution" is delivered in skippable text.**
`09` prohibits every visual route to surrealism; `06` caps visible change at one
major and two minor per phase across the entire floor; `06`/`12` guarantee that
"required information never depends on an inspectable environment item alone."
The 30 environmental items — where most of the absurdity lives — are optional
one-shot inspections. A player who walks the loop efficiently under time
pressure has an active incentive to skip precisely the content carrying pillar 2's
second half. `implied`, medium-high.
Sources: `README` "increasingly surreal"; `09` prohibited treatments; `06`
change budget & environmental boundary; `12` `MR-ENV-*` display rule.

**6.7 Humour is assigned to the content package, not the systems.**
`15` maps `MR-REQ-VISION-001` (comic satire) to `MR-WP-08`, the last content
integration package, and to `MR-TEST-CONT-001`, which tests no tonal property.
Meanwhile all interface, forecast, status, warning, and save strings are
specified as factual and non-moral. Pillar 6's claim that humour comes from
"responsive systems" is therefore structurally under-owned: the systems packages
have no comic requirement, and the comic package has no comic test.
`explicit` structure, `interpretation` consequence; medium-high.
Sources: `15` requirement→work-package table; `07` factual-warning rules; `12`
UI draft; `13` test scopes.

**6.8 Tone is validated after the last reframing gate.**
`13`'s vertical-slice gate has six items, none tonal. The eight experience
criteria — including laughter, discomfort, and non-academic comprehension — are
reviewed only "before a release candidate," which per `14` is Phase 5, after
Phase 3's fallback gate and Phase 4's full build. The project's stop/reframe
rules therefore cannot fire on tonal grounds until scope is essentially fixed.
`explicit`, high.
Sources: `13` slice/fallback/full-game sections; `14` phase table & stop rules.

---

## 7. Underrepresented parts of the vision

**7.1 "Interpretation" as a difficulty axis (P1).** Named in the pillar, but the
rules never define how configuration maps to outcome bands, how evidence quality
resolves, or what "suspicious" means — and every record ships with its
interpretation pre-written ("Observation… Interpretation…"). The player selects
readings rather than forming them. Weakest-supported clause of the strongest
pillar. `explicit` gap, high.

**7.2 "Fun and absurdist throughout" (P6).** Systems support fun in Weeks 1–5.
Weeks 6–16 are specified as colder, thinner, emptier, and more pressured. No
mechanism preserves absurdist pleasure into the back half except environmental
text (skippable) and Institutional Citations (sparse — twelve across ~3 hours,
several of which fire only at the very end). `implied`, medium-high.

**7.3 "Bitter comedy through active play" in the interface.** The comic voice
never enters the 60 decisions the player actually makes. Action labels are
utilitarian ("Start focused experiment," "Commit revision"), forecasts are
plain-language trade-off statements, and Research Status is explicitly factual.
`explicit`, high.

**7.4 The institution's absurdity as a *systemic* force.** Equipment queues,
faults, and access limits are repeatedly described as authored comic pressure
(`02`, `04`, `07`), but `12` catalogues exactly one instance
(`MR-OPT-GABRIEL-QUEUE`) and the counted content families include no
equipment-event family at all. The bureaucratic obstruction that pillar 2
promises is present in prose and nearly absent from the content inventory.
`implied`, medium-high.

**7.5 Optional PI requests.** `07` describes a hybrid request system with three
optional desk slots and ±5/±10 PI confidence per request; `12` catalogues ten
`MR-TASK-*` items, almost all main-line. The recurring texture of contradictory
small demands — arguably the title's subject — has no authored inventory.
`implied`, medium-high.

**7.6 "Discussion-worthy choice or ending" (criterion 8).** Supported by the
Week-14 fork and by public-record withdrawal punishing the most scrupulous act.
But nothing in the ending card, summary, or Archive invites reflection back to
the player; the summary is explicitly labels-and-bars with no interpretive text.
`implied`, medium.

**7.7 Replayability (`01` "may add longevity").** Actively declined by save
deletion, one-time content, saved variants, and zero carryover. Consistent with
the hedged wording; unsupported as an aspiration. `explicit`, high.

---

## 8. Emergent qualities stronger than the formal vision suggests

**8.1 The game as an honest institution.** Nowhere in `01` is fairness a pillar,
yet across `02`, `07`, `10`, and `11` the software is built to behave with
exactly the integrity Bellwether lacks: costs disclosed before commitment, no
ambush messages, monitoring windows that survive browser closure, seeds that
cannot be rerolled, expiries stated rather than silently applied, a
last-known-good backup that is never overwritten without consent. The resulting
contrast — a scrupulous system narrating a duplicitous workplace — is the
corpus's most distinctive quality and it is not a stated intention.
`interpretation`, high.

**8.2 Night work as a trust tax.** The interaction of `02`'s energy surcharge
with `05`/`06`/`07`'s presence tables means that buying time by working nights
systematically forfeits the cheap relationship actions that gate routes and the
Gabriel shortcut. This is a precise thematic coupling — isolation as the price of
productivity — and no document names it. `interpretation`, high.

**8.3 An honest run is a thinner run.** Two of ten optional scenes and one of
twelve citations require the player to have produced a visible record mismatch.
Content availability is inversely correlated with integrity. Emotionally apt,
almost certainly unplanned, and in direct tension with `12`'s own "No citation
requires unethical play." `interpretation`, high.

**8.4 The invisible flag layer as a relationship simulation.** Permanent flags
override recovered trust bars (`05`, `07`) but are never displayed. Players will
watch a bar climb back while behaviour stays cold — an accurate depiction of a
professionally repaired but personally damaged relationship, beyond anything the
documents claim to model. `interpretation`, medium-high.

**8.5 "Minor revisions" as a learned mechanic.** Elena uses the phrase in Week 1,
Week 7, and again after a formal major-revision decision ("in the useful sense").
Repetition converts a title into a legible in-fiction warning signal — semantic
mechanics rather than authored joke. `interpretation`, high.

**8.6 Free travel as an unacknowledged rest mode.** Walking, reading, and
dialogue cost nothing, there is no sprint or stamina, and time cannot pass
without a confirmed action. The floor is therefore an unlimited zero-cost
contemplative space between decisions — a pacing valve the systems never name,
though the dry pre-Week-16 exit response suggests wandering was anticipated.
`interpretation`, medium.

**8.7 Process rigour as a design constraint that improved the game.** `13`, `14`,
`15`, and `ASSET_MANIFEST` visibly caused the scope discipline that pillar 5
requires: four NPCs, no physics, no engine, twenty prop families, counted content
families, and a pre-authored fallback. The portfolio layer, declared secondary,
has materially shaped the primary artifact for the better.
`interpretation`, medium-high.

---

## 9. Intention-versus-experience mismatches

| Intended | Likely experienced | Mechanism | Conf. |
|---|---|---|---|
| Difficulty from planning, interpretation, and ethics | Difficulty from **energy bookkeeping**; evidence caps easily; interpretations arrive pre-written; ethics costs nothing that gates anything | `07` support arithmetic; `12` record strings; `07`/`08` integrity non-gating | high |
| Industry route as an imperfect trade-off | Industry as the **cheapest and warmest** outcome (Developing = starting state; Camila the only kind voice; cleanest epilogue) | `07`/`08` Morrow gate; `12` Camila & career modules | high |
| Increasingly surreal institution | Increasingly **cold and quiet** institution whose absurdity is in optional notices | `09` prohibitions; `06` change budget; `12` env one-shot rule | medium-high |
| Humour from responsive systems | Humour from **records, notices, and citations**; the interface is deliberately deadpan-neutral rather than comic | `12` UI draft; `07` factual warnings; `15` WP mapping | medium-high |
| Fun and absurdist throughout | Funny for ~Weeks 1–5, then pressured, then bleak — as the same document's arc statement also requires | `01` internal tension; `06`/`09` act progression | high |
| No academic knowledge required | Plot legible to anyone; **comedy and peer-review tension legible mainly to insiders** | `12` satire register; absent conceptual tutorial; `13` no external check | medium-high |
| Uncomfortable complicity | Complicity guaranteed at the preprint, then largely **unpunished and unnoticed** — especially in the fallback | `12` `MR-SCN-PUBLIC-RECORD`; `12` fallback cuts; `07`/`08` integrity non-gating | high |
| Pressure profiles change tolerance only | Supported changes the **thesis** (removes the night-work trust tax; makes rest efficient) while keeping content identical | `02`/`07` profiles vs `05`/`06` schedules | medium-high |
| No moral score; ambiguity preserved | Five permanent trust bars + integrity segments + PI labels + route hints = a **status dashboard** to manage | `07` state model; `10` HUD; `12` route feedback | medium-high |
| 90-minute fallback is coherent, not damaged | Fallback is coherent as *plot* and materially **weaker as ethics**, with one unreachable citation | `12` cut line vs `MR-CIT-08` and mismatch scenes | high |
| Vision is a testable requirement | `MR-REQ-VISION-001` has **no tonal or accessibility test**; tone is reviewed only at release-candidate stage | `15` requirement table; `13` gates | high |

---

## 10. Risks that are unusual but creatively coherent

These are deviations from conventional expectations that appear deliberate and
internally consistent with `01`, and I record them as coherent rather than as
failures.

**10.1 Ethics without mechanical punishment.** Integrity gates nothing and
misconduct can publish. This is unusual and it is precisely the corpus's thesis:
`03` states outright that "defensible work can fail, and undetected fabricated
work can publish," and `08` refuses to make hidden misconduct automatically
public. Coherent — the discomfort is designed to come from self-knowledge, not
from a penalty. `explicit`, high.

**10.2 Punishing the most scrupulous act.** Public-record withdrawal — retracting
work you no longer trust — closes both routes and forces **End of Contract**.
Bleak, unusual, and thematically legible given `ending.paper.rejected` ("Neither
version finishes the work cleanly") and `08`'s insistence that End of Contract
still leaves agency. `explicit` rule, `interpretation` intent; medium-high.

**10.3 A three-hour game with ~60 decisions.** Extremely low decision density by
management-game standards, deliberately compensated by full cost disclosure,
stated reasons, and legible consequence. Coherent with P1's "survival through
decisions" read as *few, weighty* decisions. `interpretation`, medium.

**10.4 Declining replayability in a modular-ending game.** 29 modules and 12
citations imply replay, but saves are deleted, nothing carries over, and there is
no rewind. Consistent with `08`'s "no gameplay advantage… into a new campaign"
and with an ending that is meant to be lived once. `explicit`, high.

**10.5 The player character never speaks aloud.** No voice, no lip sync, no
portrait; internal narration is sharper than spoken lines. Unusual for a
character-driven satire and coherent with the projection goal after name and
pronoun choice. `explicit`, high.

**10.6 Comedy validated last, by one insider, with no test.** Unconventional and
risky, but coherent with `13`'s explicit framing: "This is a personal creative
project, not a research study or commercial product test," and with `01`'s
statement that private evaluation "does not use external sample sizes."
`explicit`, high.

**10.7 A satirical achievement system as the only meta-progression.** Twelve
Institutional Citations, un-ranked, some triggered by the player's own virtue
being institutionally reclassified as capacity. Odd as a retention system,
excellent as a thesis delivery system. `explicit`/`interpretation`, high.

---

## 11. Missing evidence and unresolved contradictions

### Concrete contradictions inside the now-complete corpus

1. **Non-interactive scene time has three different values.**
   `decision-log` (2026-08-26, still marked Confirmed, never superseded): "Keep
   total non-interactive scene time at **15–20 minutes**, with a 22-minute
   maximum." `02` and `03`: "**14–18** minutes." `12`: exactly **14:45** plus a
   75-second epilogue. The content spec's figure is *below* the decision log's
   floor. No supersession entry exists. `explicit`, high.
2. **`MR-CIT-08` is unreachable in the fallback.** Its trigger is "read a concern
   from Haoran or Gabriel and respond"; the fallback removes both
   `MR-OPT-HAORAN-MISSING-REPLICATE` and `MR-OPT-GABRIEL-ARCHIVE`. Yet `12`
   states the fallback includes "all ending modules and citations," and `13`
   requires a fixture for all twelve. `explicit`, high.
3. **`MR-CIT-08` may require ethically compromised play.** Its trigger scenes
   appear only when "a visible record, reported reading, or authorship state
   supports concern" — i.e. after an omission, alteration, or denied credit —
   against `12`'s rule "No citation requires an unethical choice" and `13`'s
   corresponding test requirement. `implied`, medium-high.
4. **Pillar 6 versus the stated emotional arc.** "The game must remain fun and
   absurdist throughout" (`01` pillar 6, restated in the `decision-log`
   2026-08-27 entry) sits beside "later parts create pressure and discomfort"
   (`01` arc and criteria 5). Both are approved; the systems implement the
   second. Not recorded as a tension anywhere. `explicit`, high.
5. **`MR-REQ-VISION-001` has no verifying test.** It is mapped to
   `MR-TEST-CONT-001`, whose enumerated checks (in both `12` and `13`) contain
   no tonal, comic, or accessibility criterion. `explicit`, high.
6. **Equipment events and optional PI requests are required by `07` but absent
   from `12`'s counted content families.** `07` specifies three optional desk
   slots, state-selected authored request sets, and authored equipment
   queues/faults with five stated player responses; `12`'s authority table
   contains no family for either. `explicit`, high.
7. **The protected break has no action ID.** `02` and `07` define it as a
   one-period recovery action (and `glossary` defines it as a term), but `12`'s
   action table — which claims to fix "the main action IDs and costs" — omits it,
   as do its text keys. `explicit`, high.

### Material information still absent

8. **Core-loop mechanics remain unspecified** (unchanged from Stage 1):
   configuration→band mapping, evidence-quality resolution, the definition of
   "suspicious," sample health/history scales, equipment condition scales,
   monitoring-window counts and penalties, fatigue thresholds, sample-group
   supply, and manuscript-card connection rules. `13` demands fixtures for "all
   six templates, repeats, bands, monitoring, and result/evidence separation"
   without the rules those fixtures would assert.
9. **`PIIM` response-card scoring is undefined.** Three cards × three states feed
   four bands, but no document states what evidence meets, partly meets, or fails
   a card — including how claim scope is scored against the committed claim
   level.
10. **No document derives the three-hour target.** `01` and `07` both assert it;
    no period-count, travel-time, or interaction-time derivation exists. My
    Stage-1 estimate (~2.5–3.5 min per period) remains inference.
11. **Research Status reason strings and pre-action forecast strings are required
    but not drafted.** `07` mandates "a short stated reason" for every material
    change and a plain-language trade-off forecast before every meaningful
    action; `12` supplies one generic route string and no forecast text — inside
    a 6,000 unique-word cap that `12` claims is already nearly met.
12. **Camila's video-call presentation is unspecified.** She gates an entire
    ending, has three scenes and an eight-sound palette including a "call-end
    tone," yet `05` and `09` forbid a Camila model or in-person appearance,
    including in the epilogue. No document states how the call is presented.
13. **No evidence path exists for the audience-breadth claim.** `13` forbids
    external players, surveys, consent, and outside review; the eight experience
    criteria — including "a player without academic experience can explain the
    main objective" — are recorded as Leonardo's pass / change-request. The
    corpus contains no method by which criterion 1 could be falsified.
14. **`00`'s gate remains blocked and `14`'s Phase 0 is incomplete**, so every
    measured fact (performance, build size, word count of the generated string
    file, asset provenance, package versions) is correctly absent rather than
    guessed. `ASSET_MANIFEST` records zero assets, consistent with `14`'s
    sequence.
