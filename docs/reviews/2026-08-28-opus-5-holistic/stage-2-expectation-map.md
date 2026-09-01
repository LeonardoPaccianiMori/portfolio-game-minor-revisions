# Stage 2 — Expectation Map and Alignment Review

## 1. New corpus confirmation

New files supplied in this stage, all read completely:

| #   | Path                                 | Read in full | Notes                                                                                                         |
| --- | ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------- |
| 1   | `README.md`                          | Yes          | Complete; ends with repository boundary and licence intent.                                                   |
| 2   | `AGENTS.md`                          | Yes          | Complete; ends with later-implementation ownership rules.                                                     |
| 3   | `docs/00-design-index.md`            | Yes          | Complete; includes full B00–B10 roadmap and the blocked gate.                                                 |
| 4   | `docs/01-vision-and-pillars.md`      | Yes          | Complete; ends with B10 release and content boundary.                                                         |
| 5   | `docs/13-testing-and-evaluation.md`  | Yes          | Complete; ends with evidence records and known limits.                                                        |
| 6   | `docs/14-production-plan.md`         | Yes          | Complete; ends with current next action.                                                                      |
| 7   | `docs/15-implementation-contract.md` | Yes          | Complete; ends with deliberate implementation-stage facts.                                                    |
| 8   | `docs/decision-log.md`               | Yes          | Complete; one formatting anomaly noted in §11 (a blank line splits the table before the 2026-08-28 B10 rows). |
| 9   | `docs/glossary.md`                   | Yes          | Complete.                                                                                                     |
| 10  | `assets/ASSET_MANIFEST.md`           | Yes          | Complete; contains a single "None" record row.                                                                |

No new file is empty, truncated, or unreadable. Three files Stage 1 recorded as absent (`13`, `14`, `15`) are now present. Still absent: `strings.en.json` and the content JSON (both explicitly future artefacts), and any prototype, test output, or asset record.

**Stage-1 conclusions are preserved unchanged.** Where the new corpus confirms, resolves, or fails to address a Stage-1 finding, I say so explicitly rather than silently revising. Two Stage-1 flagged items are now resolved by `15`'s requirement definitions (§11, items R1–R2); one is now sharpened into a harder problem (§11, T7).

---

## 2. Explicit expectation map

These are stated in the documents as expectations or constraints, not inferred.

### 2.1 Non-negotiable creative constraints

| #   | Expectation                                                                                                                                                                                                                                                                                                             | Source                                                                       |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| E1  | First-person, bitterly comic academic-survival game; one postdoc, one final semester, a moving publication standard                                                                                                                                                                                                     | `01` "Confirmed vision"; `README`                                            |
| E2  | Six design pillars, in order: survival through decisions; plausible science / surreal institution; success does not resolve the system; the exit is meaningful but not utopian; compact depth; bitter comedy through active play                                                                                        | `01` "Design pillars"                                                        |
| E3  | Difficulty must come from planning, interpretation, time allocation, and ethics — **explicitly not** from precision or reflex                                                                                                                                                                                           | `01` pillar 1; non-goal "Manual-dexterity-focused pipetting simulator"       |
| E4  | Emotional arc: amusing recognition → pressure and uncomfortable complicity → bitter but human ending. **Must not become nihilistic.** Solidarity remains meaningful. Leaving academia is not total defeat; industry is not perfect salvation                                                                            | `01` "Emotional experience promise"; decision log 2026-08-26                 |
| E5  | No academic or scientific knowledge required to understand objectives, causes, jokes, or consequences                                                                                                                                                                                                                   | `01` "Intended audience"                                                     |
| E6  | Content level ≈ Teen / 12+. Burnout, anxiety, insecure work, manipulation, ethical pressure permitted. No graphic injury, self-harm, sexual content, extreme abuse, body horror. Organoid damage stylized                                                                                                               | `01` "Content boundary"; decision log 2026-08-26                             |
| E7  | Twenty-one explicit non-goals, including combat, horror/chase, multiplayer, open-world campus, hunger/thirst, large crafting, full romance, endless procedural campaign, photorealism, blank avatar, literal autobiography, any claim that real science supports the result, and any attempt to explain all of academia | `01` "Explicit non-goals"                                                    |
| E8  | The game fiction must never refer to its AI-assisted production. The player must not feel the game is an advertisement for agent use                                                                                                                                                                                    | `01` "Creative and portfolio purpose"                                        |
| E9  | Humour execution rule: every serious system must be able to deliver comic/satirical feedback without hiding its real stakes. Comedy lives in citations, requests, environment, and records — not only dialogue                                                                                                          | `01` "Humour execution rule"                                                 |
| E10 | Eight qualitative experience success criteria (comprehensible objective; comprehensible experiments; visible choice effects; early laughter; later pressure and discomfort; publication does not solve precarity; industry attractive but imperfect; at least one discussable choice or ending)                         | `01` "Experience success criteria"; `13` "Fallback and full-game evaluation" |

### 2.2 Non-negotiable scope and process constraints

| #   | Expectation                                                                                                                                                                                                                                                                                                          | Source                                                          |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| E11 | ~3-hour first playthrough; coherent 90-minute fallback preserved; 20–30-minute vertical slice proven first                                                                                                                                                                                                           | `01`; `README`; `14` phase table                                |
| E12 | ≤6,000 unique English words in the released text; no runtime system writes free-form dialogue                                                                                                                                                                                                                        | `01` "B10 release and content boundary"; `12`                   |
| E13 | Testing is **private to Leonardo and Codex only**. No external players, no participant data, no consent forms, no surveys, no external science or narrative review. Leonardo is the only human play evaluator                                                                                                        | `13` "Evaluation boundary"; decision log 2026-08-28             |
| E14 | Capacity 6–8 h/week; 12–18 months estimated to a private release candidate; no planned paid budget; EUR 150 total exceptional-cost ceiling                                                                                                                                                                           | `14` "Production boundary"                                      |
| E15 | Asset provenance verified and manifest-recorded **before any integration, including prototypes**. Downloadability is not permission. NC/ND/unclear licences excluded by default                                                                                                                                      | `09`; `14` "Asset and provenance sequence"; `ASSET_MANIFEST.md` |
| E16 | Leonardo alone creates or pushes a remote. Future public source: MIT for code, CC BY 4.0 for his original non-code work. No licence file, remote, or deployment now                                                                                                                                                  | `14`; `01`; `README`                                            |
| E17 | Implementation is prohibited until `00-design-index.md` records explicit approval. B10 documentation does not authorize it                                                                                                                                                                                           | `AGENTS.md`; `00`; `15` "Authorization gate"                    |
| E18 | Public material must present the work first as a complete narrative game; must not call it "made by AI" or "a simple Three.js learning exercise"; must state that agents did a material part of implementation                                                                                                       | `01` "Public position"                                          |
| E19 | Automated coverage targets: ≥90% line, ≥85% branch in pure rules, persistence, content validation; full branch coverage of ending resolution, content validation, save recovery, migration, replacement, data clearing                                                                                               | `13` "Automated-test targets"                                   |
| E20 | Phase gates with stop/pause/reframe rules: no phase advance without its private gate; pause after four weeks below 6 h/week; no fallback production if the slice has a blocker in loop clarity, save/recovery, accessibility, licence compliance, or fiction boundary; no expansion to 3 hours if the fallback fails | `14` "Stop, pause, and reframe rules"                           |

### 2.3 Explicit dual purpose

| #   | Expectation                                                                                                                                                                                                             | Source                                                                         |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| E21 | The project is simultaneously a personal creative outlet **and** a portfolio demonstration of Leonardo's ability to direct LLM agents through a complex build despite limited prior familiarity with the Three.js stack | `01` "Creative and portfolio purpose"; decision log 2026-08-26                 |
| E22 | The game must first work as a game. "AI assistance is not a substitute success criterion: the resulting game must still be coherent, playable, technically credible, and independently reviewable"                      | `01`                                                                           |
| E23 | Agent direction is shown **outside the fiction**: repository history, requirement traceability, contribution records, evaluation evidence, later case study. Private conversations stay private                         | `01`; `14` "Roles, evidence, and integration"; `15` worker-assignment contract |

---

## 3. Strongly implied preference map

These are not stated as expectations but are demonstrated by repeated, independent approved decisions across many documents. Each is a preference I would expect Leonardo to defend if challenged.

### P1 — Epistemic honesty as a first-order value, applied to himself as well as to the game

**Confidence: high.**
The corpus refuses to overclaim about _everything_: "No test result exists yet. This document defines future evidence only" (`13`); "These are content and player-experience limits, not proof of measured performance" (`09`); "Do not claim Safari support in public material without direct Safari test evidence" (`11`); "Use real commit timestamps. Do not fabricate project history" (`AGENTS.md`); "A candidate found during research is not an asset selection" (`09`); "Public downloadability is not permission" (`ASSET_MANIFEST.md`); "Do not record proposals as confirmed" (`decision-log.md`).

This is the single most consistent trait in the corpus, and it is **structurally identical to the game's own subject**: a story about the gap between what a record shows and what a claim asserts, written by a process that repeatedly refuses to let a plan pose as evidence. I read this as intentional or at least temperamentally inevitable. Alternative interpretation (low): it is merely defensive documentation hygiene with no thematic significance. I find that unlikely given how far it extends past what hygiene requires (e.g. qualifying his own English-only decision as "a scope decision, not a claim that English is accessible to every player," `10`).

### P2 — Authored control over emergence

**Confidence: high.**
No procedural requests (`07`), no free-form or generated dialogue (`05`, `12`), no unbounded contextual barks (`05`), authored equipment faults not random barriers (`02`, `04`, `07`), authored NPC anchors not roaming (`05`, `06`, `11`), no navmesh or pathfinding (`11`), no crowd simulation (`06`, `11`), no physics engine (`11`), no service worker (`11`), no procedural endless campaign (`01` non-goal). The rules module "must not assemble sentences, use a language model, fill an arbitrary template, or create a new event" (`11`).

Implication: Leonardo trusts writing and authorship more than simulation, and wants total tonal control. He is willing to pay for that with reduced variety. This is consistent with a satire whose humour depends on exact wording.

Alternative interpretation (medium): this is primarily a scope-control instinct rather than an aesthetic one, driven by E14's capacity limit. Both readings are probably true.

### P3 — Refusal to moralize at the player

**Confidence: high.**
No moral score (`05`, `07`, `10`); no moral label on integrity warnings (`07`); "options express a stance, not a moral label" (`05`); endings have "subtitle context without creating a moral ranking" (`08`); Institutional Citations "can respond to unethical choices, but none requires an unethical choice" and the archive "retains no moral rank" (`08`, `12` `MR-CIT-07`); fabrication can publish undetected (`03`, `08`); "a compromised record is an unresolved limitation, not an automatic scandal" (`08`).
Implication: he wants the player, not the game, to hold the verdict. This is the design's ethical spine and it is unusually well protected.

### P4 — Dignity toward the player and toward the subject matter

**Confidence: high.**
No global game-over before Week 16 (`02`, `03`, `07`); "Failure should normally reveal information, force a trade-off, alter a relationship, or advance the narrative rather than only erase progress" (`02`); "Mandatory progress never requires a perfect result" (`02`); Supported profile has "no stigma or content penalty" and is "not called easy" (`02`, `10`); no crash during manual equipment action or cutscene (`02`); menus, pause, and browser closure never cause a missed check (`02`); content note before first New Game (`10`); "The game uses English only… This is a scope decision, not a claim that English is accessible to every player" (`10`).
Implication: he is unwilling to make a game about being ground down that itself grinds the player down unfairly.

### P5 — Accessibility as a design value, not compliance

**Confidence: high.**
Two-channel information rule appears in `02`, `04`, `07`, `09`, `10`; prohibition on drag/hold/timed/precision input appears in `02`, `04`, `10`, `13`; a dedicated requirement (`MR-REQ-A11Y-001`) and a dedicated test (`MR-TEST-A11Y-001`); accessibility settings "must not hide or change a route, value, or consequence" (`07`); 150% scale at 1280×720 is an acceptance criterion (`10`, `13`).
Note the interaction with E3: because Leonardo has _already_ rejected dexterity as a difficulty source, accessibility costs him nothing he wanted. The two commitments reinforce rather than compete.

### P6 — Institutional language as the primary comic instrument

**Confidence: high.**
`01`'s humour execution rule; the 30-item environmental catalogue (`12`); the 12 Institutional Citations (`08`, `12`); the four journal rejection letters; Elena's "minor revisions" in Weeks 1, 7, and post-PIIM (`03`); and the negative list in `09` that bans every _visual_ comic register (cartoon slapstick, giant props, distorted architecture, glitch horror).
Implication: the comedy is verbal and bureaucratic, delivered deadpan by a straight-faced world. Nothing in the world is allowed to wink.

### P7 — Compact density over breadth

**Confidence: high.**
Pillar 5; one ~400 m² floor (`06`); ≤24 prop families (`09`); 6 templates, 7 scenes, 10 optional scenes, 20 records, 29 modules, 12 citations, 30 environmental items (`12`, `14`); "The floor is an evolving 'academic terrarium': small enough for asset reuse, dense enough for repeated spaces to acquire new narrative meaning" (`06`). `14` forbids expanding the floor, adding an experiment family, adding a mandatory scene, or adding an action-cost class.

### P8 — Anti-handholding as a spatial-design conviction

**Confidence: high.**
No quest markers, minimap, or objective arrows (`02`, `06`, `10`); notebook "is not a quest-marker system" (`02`); Interaction Assist bounded to the current room with no path or arrow (`10`); no separate tutorial room or forced input drill (`06`, `10`); "The game does not put permanent arrows or labels on every object" (`02`); three landmarks instead of a map (`06`).

### P9 — Privacy and refusal of extraction

**Confidence: high.**
No account, server save, upload, telemetry, analytics, automatic error reporting, save cookie, or automatic save expiration (`10`, `11`); sanitized diagnostics with no save payload or player name (`11`); no participant data or surveys (`13`); "Do not publish private conversations, save payloads, personal data, or a private test diary" (`13`).
This is coherent with P3 and P4: a game about institutional record-keeping that keeps no records of its player.

### P10 — Structural rather than personal blame

**Confidence: high.**
Elena "is not a simple villain" and "can be a mentor, a source of harm, or both" (`05`); every character has their own institutional pressure (Elena's renewal panel, Samira's fixed term, Gabriel's three-requests-one-slot, Haoran's reproducing list); "Characters must have interests and limits beyond serving as satire delivery devices" (`05`); "The PI cannot become a one-note monster, and the industry contact cannot become a flawless rescuer" (`05`); `MR-OPT-ELENA-FUTURE` and `MR-END-REL-ELENA-SUPPORT`.

### P11 — Solidarity is emotionally load-bearing, not decorative

**Confidence: medium-high.**
`01`: "Small acts of solidarity can have value even when they do not change the institution." Concrete carriers: `MR-CIT-05` "Collegial Load-Bearing Recognition"; `MR-OPT-HAORAN-BORROWED-TIME`; `MR-OPT-SAMIRA-SHARED-INSTRUMENT`; Samira's mandatory co-authorship rule (`03`, `05`); the five `*-SUPPORT` afterbeats (`12`); Gabriel's trust-gated pass-through as the only spatial reward in the game (`06`).
Alternative interpretation (medium): solidarity is present as an anti-nihilism safety valve rather than as a primary theme, since its mechanical footprint (±10 trust, one afterbeat slot, one shortcut) is modest relative to the integrity and career systems.

### P12 — Traceability as craft

**Confidence: high, with mixed motive.**
`MR-REQ-...`, `MR-TEST-...`, `MR-...` content IDs, `MR-WP-...` work packages, the definition of done, contribution records, the roadmap's five status levels, the decision log's supersession discipline. Partly for E21's portfolio evidence, partly temperamental: `AGENTS.md`'s "Do not silently resolve contradictions. Record them and ask Leonardo" is a working preference, not a portfolio artefact.

### P13 — The project has a genuine personal emotional source

**Confidence: high that this is documented; the nature of the experience is not established.**
Decision log 2026-08-23: "inspired emotionally, not literally, by Leonardo's experience." `01`: "emotional inspiration may be personal, but literal reproduction is prohibited." `14` references "the historical **Unpaid** prototypes" that "can be inspected for private creative inspiration" — implying at least one earlier attempt at related material. `README` references `Wanderer` as a prior deployed project and a portfolio sibling. `README` also references a "private Career Center" canonical for "career evidence" and "portfolio-readiness decisions."
I do not infer anything about Leonardo personally. What the documents establish is that (a) the subject matter is personal, (b) the prohibition on literal reproduction is a deliberate discipline applied to personal material, and (c) the portfolio dimension is active and career-linked.

---

## 4. Uncertain inferred preferences

| #   | Inferred preference                                                                                                                  | Supporting decisions                                                                                                                                                                                                                 | Confidence  | Alternative reading                                                                                                                                                                                                                                               |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U1  | 3 hours is a **ceiling he would defend**, not a floor; he would prefer 2.5 tight hours to 4 loose ones                               | `07`: "Approximately three hours should contain escalation, not repetitive grinding"; `14` forbids expanding scope; `01`: "Branching and replayability _may_ add longevity"                                                          | Medium-high | He may treat 3 h as a minimum credibility threshold for a portfolio piece and resist contraction                                                                                                                                                                  |
| U2  | He has accepted the consequences of E3 (no dexterity) but has not fully priced the resulting interaction thinness Stage 1 identified | E3 is explicit and repeated; but no document ever addresses interaction _texture_ or _feel_ as a design problem. `09`'s effects section is about restraint, not satisfaction                                                         | Medium      | He may have decided that reading and deciding are sufficient verbs and considers the question closed                                                                                                                                                              |
| U3  | He expects corridors to feel populated and eventful, not lonely                                                                      | `06`: stations "far enough apart that a queue, a colleague, or a changed room state can become meaningful"; `02` repeats this; the seven-anchor schedule table                                                                       | Medium      | The sparse authored-anchor budget and the ≤1 major + 2 minor changes per phase cap (`06`) suggest he may in fact want an emptying, quieting floor — the act-state table's Week 15–16 "Emptier rooms" supports loneliness as an intended late state                |
| U4  | Complicity is meant to be broadly felt, not a minority path                                                                          | `01`: "uncomfortable complicity" is named as a stage of the intended arc; Week 6–7 contradictory revision; `MR-SCN-HELPFUL-COMMENTS` choice B "Build the response around a complete narrative"                                       | Medium-high | The three integrity acts are explicit, confirmed, one-click choices with stated costs (`12`). If the honest path is comfortably completable, most players will never be complicit in anything worse than a strong claim. This is genuinely unresolved — see §5 A5 |
| U5  | The Archive of 12 ending cards is primarily a satirical object, not a replay driver                                                  | It sits alongside the Institutional Citations, whose whole register is institutional record-keeping; `08` explicitly states it "carries no gameplay advantage, route, or state into a new campaign" and there is "no chapter rewind" | Medium      | It may be a straightforward replay incentive, in which case Stage 1's finding that content variance does not support 3+ runs becomes a real mismatch                                                                                                              |
| U6  | The fallback (90 min) is the outcome he considers most likely to actually ship                                                       | `14` gates the 3-hour target behind a passing fallback gate and lists reframe/pause as legitimate outcomes; `01` "Do not promise the three-hour game before the 90-minute game works"                                                | Medium      | He may regard the fallback purely as insurance and fully intend the full target                                                                                                                                                                                   |
| U7  | He wants Elena to be the emotionally central relationship                                                                            | Elena has the most scene presence (5 of 7 mandatory scenes involve the PI office), the highest starting trust with Haoran (60), the only after-hours optional scene, and the first-listed epilogue afterbeat triad                   | Medium      | Haoran carries the "did you pass the pressure down" test (`05`), which is arguably the more morally central relationship; the design may intend Haoran as the conscience and Elena as the antagonist-mentor                                                       |
| U8  | He would accept a colder, drier ending over a warmer one if forced to choose                                                         | The drafted ending lines in `12` are predominantly dry and deflationary; only 5 of 15 afterbeats are `*-SUPPORT`, and only one afterbeat fires per run                                                                               | Medium      | `01`'s explicit non-nihilism rule and "bitter but human" phrasing point the other way; the coldness may be a drafting default rather than a preference                                                                                                            |
| U9  | Institutional absurdity should escalate in _language density_ rather than in _world behaviour_                                       | `09` bans every visual absurdist register; `06` caps environmental change; the act-state table's changes are all realistic (clutter, colder light, repairs, warnings)                                                                | Medium      | `README` says the institution becomes "increasingly surreal" and `01` pillar 2 says "increasingly absurd" — neither of which the approved visual vocabulary can deliver. See §5 A8 and §11 T3                                                                     |

---

## 5. Genuine open expectation axes

For each axis the documents establish no expectation. I state the materially different directions already latent in the approved design and the player experience under each. No direction is recommended.

### A1 — Station-view interaction depth

Nothing in the corpus specifies the internal design of a focused station view beyond: it stops movement, costs nothing to leave, shows one action with its time and energy cost, and uses ordinary selection (`02`, `04`, `10`).

- **Direction 1 — Confirmation surface.** A station is a labelled panel with 1–3 options and a confirm. Player experience: fast, clean, low-friction; the game's texture is entirely in traversal, reading, and planning. The 60+ station visits per run feel like administration, which is thematically pointed and mechanically flat.
- **Direction 2 — Diegetic instrument.** The station renders as a working machine: the rack shows physical labels and states, the imaging bay shows the three views as instrument readouts requiring cross-reference before a monitoring decision. Player experience: each visit has a small perceptual task; the laboratory feels operated rather than commanded; sessions lengthen.
- **Direction 3 — Judgement instrument.** As Direction 2, plus the analysis classification can be _wrong_ — the player assigns a biological result and evidence quality, and a mis-assignment propagates into the manuscript. Player experience: real interpretive skill and real anxiety about one's own competence; risks conflicting with P4's fairness commitments and with `07`'s promise that "poor results always provide useful information."

### A2 — Manuscript board as form, puzzle, or rhetoric

Stage 1 identified this as the largest specification gap; the new documents do not close it. `15` assigns it to `MR-WP-05`/`MR-REQ-UI-001` and `MR-WP-08`, but no requirement states its behaviour.

- **Direction 1 — Claim toggle.** Cards attach freely; the meaningful choice is careful/strong/inflated plus which cards to include or omit. Player experience: Weeks 5–8 are narrative interludes with a single dial; the board is a scene, not a system.
- **Direction 2 — Constraint satisfaction.** Figures have slots; claims require supporting evidence cards of matching type; the requirements panel enumerates gaps and conflicts. Player experience: a genuine small puzzle with a legible "this claim is not supported" state; the omission choice becomes tactile because you physically remove a card that a claim needs.
- **Direction 3 — Rhetorical composition.** Card-and-claim _combinations_ produce different reviewer text and different PIIM card outcomes, so the same evidence can be arranged persuasively or defensibly. Player experience: the game's centre of gravity moves from the laboratory to the desk; the satire becomes participatory because the player performs the inflation themselves rather than selecting it from a menu.

### A3 — Density of corridor and floor life

Unresolved between the "meaningful travel" rationale (`02`, `06`) and the anchor/change budget (`06`).

- **Direction 1 — Populated floor.** Characters are frequently encountered at their anchors, equipment states change visibly, small non-scene exchanges occur. Player experience: the walk is social and informative; the terrarium feels inhabited.
- **Direction 2 — Quiet floor.** Characters appear mainly for authored scenes; the corridors are ambient. Player experience: isolation, which suits the theme, and traversal that is atmospheric on run 1 and pure tax by Week 8.
- **Direction 3 — Decaying arc.** Populated in Weeks 1–4, progressively emptier through the act states, matching `06`'s Week 15–16 "Emptier rooms." Player experience: loneliness becomes a _measured_ change rather than a constant, and the exit's growing appeal reads as consequence rather than authorial nudge.

### A4 — Whether pressure is experienced as anxiety or as a solvable schedule

The transparency stack (previewed costs, stated reasons, non-spoiling route feedback in `07`) pushes toward puzzle; E4's "pressure and uncomfortable complicity" wants anxiety.

- **Direction 1 — Full transparency.** Research Status tells the player exactly which route conditions are unmet. Player experience: a legible optimisation problem with regret about trade-offs but little dread; fair, calm, and slightly declawed.
- **Direction 2 — Cost-transparent, sufficiency-opaque.** Costs and reasons remain explicit, but the game never tells you whether your evidence is _enough_ — only what it currently is. Player experience: the specific academic dread of not knowing whether the work will be judged adequate; higher tension, higher risk of frustration and of violating `07`'s stated feedback promise.
- **Direction 3 — Profile-differentiated.** Supported delivers Direction 1; Standard delivers Direction 2. Player experience: the two profiles become materially different works, which `07` currently forbids ("Both profiles have the same calendar, narrative, routes, and endings" is a systems statement that does not settle feel).

### A5 — Whether fabrication is a near-universal temptation or a minority experiment

The corpus makes fabrication available, undetectable-unless-visible, and unscored. It never states how many players should meaningfully face the temptation.

- **Direction 1 — Structural temptation.** The honest, well-controlled, fully-repeated path genuinely does not fit in 64 periods, so most players arrive at Week 14 with a weak packet and a real reason to consider the stronger response. Player experience: complicity as designed in E4; the player understands the pressure from the inside; the satire lands on the player rather than on Elena.
- **Direction 2 — Available road not taken.** The honest path is comfortably completable; the stronger response is a curiosity. Player experience: moral clarity, a cleaner sense of having done the work, and a satire that indicts the institution while leaving the player uncomplicit — closer to observation than to complicity.
- **Direction 3 — Graduated.** Omission is easy to slide into under pressure; alteration and invention remain deliberate transgressions. Player experience: the −10 / −25 / −45 gradient becomes felt rather than read; most players end **Compromised** rather than **Defensible** or **Seriously undermined**, which is arguably the truest outcome distribution and the one the current epilogue module for "unresolved omission" is best written for.

### A6 — The dramatic weight of the Morrow route

Morrow is mechanically parallel to Aldercroft but is delivered by a remote character with three contacts, no model, and no on-floor presence (`05`, `09`, `12`).

- **Direction 1 — Structural counterweight.** Morrow remains a route condition and a set of emails. Player experience: the industry choice is an idea rather than a felt alternative; **Transferable Skills** arrives as information.
- **Direction 2 — Weighted rival.** Camila's three contacts do heavy characterisation work; her voice becomes the only adult professional register in the game; the exit's growing appeal is her presence in the building's imagination. Player experience: a genuine dilemma at 06:42 rather than a route check.
- **Direction 3 — Quiet melancholy.** Morrow is not exciting; it is competent, bounded, and slightly sad — good people doing narrow work well. Player experience: the industry route reads as adulthood rather than escape, which sharpens E4's "not perfect salvation" without moralizing.

### A7 — Ending temperature within the 60–90-second budget

`01` requires bitter-but-human and non-nihilistic; `12`'s draft is predominantly dry and deflationary; only one relationship afterbeat fires.

- **Direction 1 — Cold with one human beat.** As currently drafted. Player experience: a clean, unsentimental close; strong on honesty, thin on warmth; risk of reading as nihilistic despite E4.
- **Direction 2 — Warmer resolution.** The afterbeat expands or more than one relationship resolves. Player experience: the solidarity theme (P11) pays off; the ending's bitterness is contextual rather than total; the 60–90-second budget becomes hard to hold.
- **Direction 3 — Deliberately unresolved.** The final image and card refuse both warmth and closure. Player experience: strongest thematic honesty, highest risk of the player feeling the game withheld its own payoff.

### A8 — Where "increasingly surreal" actually lives

`README` says the institution becomes "increasingly surreal"; `01` pillar 2 says "increasingly absurd." `09` bans distorted architecture, giant props, slapstick, and glitch effects; `06` caps floor change at one major and two minor items per phase.

- **Direction 1 — Textual surrealism only.** The world stays a real university; only its language becomes deranged. Player experience: deadpan satire, entirely dependent on the reading pleasure Stage 1 rated highest; the environment escalates only in clutter and light temperature.
- **Direction 2 — Bureaucratic accretion as absurdity.** Notices multiply until they are physically absurd in _quantity_ while each remains individually plausible — twelve contradictory labels on one instrument, a wellness poster covering a broken-appliance notice. Player experience: absurdity that is visible without breaking realism; requires more environmental change budget than `06` currently permits.
- **Direction 3 — Late tonal drift.** A genuine register shift in Weeks 15–16. Player experience: memorable, and in direct conflict with `09`'s prohibitions and P6.

### A9 — What the vertical slice is meant to prove

`13`'s six slice-completion items are: automated checks pass; Leonardo completes one run; Codex verifies a limited/missed-monitoring fixture; the opening objective, costs, evidence views, queue choice, claim choice, and save behaviour are **understandable**; no blocker in save/accessibility/licensing/fiction; the slice is coherent without placeholders. **None of the six asks whether the loop is enjoyable.**

- **Direction 1 — Feasibility and clarity proof.** As written. Player experience question answered: "can this be built and understood?" Unanswered: "does anyone want to do it for three hours?"
- **Direction 2 — Fun-hypothesis test.** The slice additionally tests texture, traversal tolerance, station-view satisfaction, and repetition onset. Requires either a criterion Leonardo can apply to himself or an evaluator he has forbidden himself (E13).

### A10 — Whether the Supported profile is a difficulty setting or a second artistic reading

`07` guarantees identical calendar, narrative, routes, and endings; nothing addresses whether the _work means the same thing_ when attrition is largely removed.

- **Direction 1 — Accessibility setting.** Supported is a fairness measure; the canonical experience is Standard.
- **Direction 2 — Legitimate alternate reading.** Supported is the version in which the protagonist has some slack, and the satire lands on the institution rather than on the body. Player experience: a still-bitter but less punishing work; arguably closer to E4's non-nihilism.

### A11 — Replay intent

See U5. Directions: (1) single-run work with an Archive as satire; (2) 2–3-run work where the second run is a deliberate honesty-policy experiment; (3) collection-driven replay for the 12 citations. Content variance (`03`, `05`, `12`: ≤2 variants per scene, fixed calendar) currently supports (1) and (2) but not (3).

---

## 6. Alignment with the Stage-1 identity

**Overall: high alignment. The game Stage 1 reconstructed is the game the vision documents ask for, and the distinctive features Stage 1 identified are traceable to explicit approved decisions rather than accidents.**

| Stage-1 identity finding                                             | Expectation source                                                                                                       | Verdict                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claim-level (careful/strong/inflated) as the central verb            | Decision log 2026-08-26; `01` pillar 2; `04`                                                                             | Intentional. High confidence.                                                                                                                                                                                                                                               |
| Two-layer results (biological / evidence quality)                    | Decision log 2026-08-26 (explicit separate entry)                                                                        | Intentional. High confidence.                                                                                                                                                                                                                                               |
| Undetected fabrication can be rewarded                               | Decision log 2026-08-26; `01` pillar 3; P3                                                                               | Intentional and central. High confidence.                                                                                                                                                                                                                                   |
| Detection gated on the player's own visible trail                    | Decision log 2026-08-26; `05`; P10                                                                                       | Intentional. High confidence.                                                                                                                                                                                                                                               |
| Institutional Citations as diegetic satirical achievements           | `01` humour execution rule; decision log 2026-08-27                                                                      | Intentional; this is E9 made concrete. High confidence.                                                                                                                                                                                                                     |
| Involuntary crash instead of sleep                                   | Decision log 2026-08-27; P4                                                                                              | Intentional. High confidence.                                                                                                                                                                                                                                               |
| Unbending calendar under variable competence                         | Decision log 2026-08-27; `01` pillar 3                                                                                   | Intentional. High confidence.                                                                                                                                                                                                                                               |
| The exit's authored appeal from Week 8                               | Decision log 2026-08-27; `01` pillar 4                                                                                   | Intentional. High confidence.                                                                                                                                                                                                                                               |
| Refusal-driven identity (no markers, score, undo, rescue)            | P3, P8; `01` non-goals                                                                                                   | Intentional. High confidence.                                                                                                                                                                                                                                               |
| **Interactive verb set is thin; no motor or spatial skill anywhere** | `01` pillar 1 and the dexterity non-goal explicitly reject motor skill — but no document addresses the resulting texture | **Half-intentional.** The _absence of dexterity_ is a decision; the _thinness of what replaces it_ is unaddressed. Medium-high confidence this is an unexamined consequence rather than an accepted one (U2).                                                               |
| **Traversal carries weight it may not carry**                        | `02`/`06` assert the rationale; no document tests it                                                                     | Unaddressed. See A3.                                                                                                                                                                                                                                                        |
| **Band table cannot teach causality at ~10 samples**                 | `02`/`07` promise learnable causality; `07`'s 80/20/0 · 20/60/20 · 0/20/80 table is the approved mechanism               | **Unresolved contradiction between a stated goal and an approved mechanism.** The new corpus does not address it. `07`'s post-slice tuning clause permits changing only the three percentages, which cannot fix a sample-size problem. Medium-high confidence this matters. |
| **~25–30 authored decision points; replay reveals a small space**    | `01` "Branching and replayability _may_ add longevity" — a hedge, not a promise; `12`'s ≤2-variant rule is explicit      | Consistent with U5/A11. The design does not overpromise replay; the Archive's 12 cards are the only artefact implying otherwise.                                                                                                                                            |

**One asymmetry worth naming.** Stage 1 found the _identity_ extremely clear and the _texture_ uncertain. The new corpus confirms that the identity was built deliberately over eleven blocks with recorded supersessions — which explains the cross-document consistency Stage 1 called exceptional. It also confirms that texture was never a discussion block. There is no B-block for "moment-to-moment feel." The roadmap covers vision, science, characters, campaign, gameplay, balance, endings, world, presentation, architecture, and content. Interaction _feel_ is distributed across B04 and B08 as constraints (what is forbidden) and never as a positive design question. **High confidence** that this is a genuine gap in the process, not merely in the documents.

---

## 7. Alignment of likely fun with desired experience

### 7.1 Where the desired and the likely coincide

| Desired                                                                                        | Stage-1 assessment                                                                                                                                               | Alignment                              |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| E10 criterion: "The first part can make the player laugh"                                      | Highest-confidence positive finding; `12`'s drafted text delivers                                                                                                | **Strong**                             |
| E10 criterion: "publication does not solve academic precarity"                                 | Guaranteed by the ending architecture; **Pending Appointment** is a bridge appointment and another committee delay                                               | **Strong**                             |
| E10 criterion: "industry attractive but imperfect"                                             | Guaranteed by `08`; Morrow coexists with journal rejection; product pressure explicit                                                                            | **Strong** (with the A6 weight caveat) |
| E10 criterion: "at least one choice or ending gives a reason for discussion"                   | The Week-14 fork and undetected-fabrication-can-publish are strongly discussable                                                                                 | **Strong**                             |
| E10 criterion: "a player can see how important choices change the game state and later events" | `07`'s stated-reason rule and permanent flags make this near-guaranteed                                                                                          | **Strong**                             |
| E4: uncomfortable complicity                                                                   | Available and well-mechanised, but dependent on A5                                                                                                               | **Conditional**                        |
| E2 pillar 1: difficulty from planning and time allocation                                      | Stage 1's strongest fun finding after reading: the five-competing-goods triage across 64 periods                                                                 | **Strong**                             |
| E2 pillar 5: compact depth                                                                     | Stage 1 found Gabriel's trust value load-bearing across level design, scene availability, support rules, and epilogue — exactly the density this pillar asks for | **Strong**                             |

### 7.2 Where the desired and the likely diverge

**D1 — "The game must remain fun and absurdist throughout" (E2 pillar 6, decision log 2026-08-27) versus predicted friction.**
Stage 1 predicted: unrewarded traversal (F1), confirm-dialogue fatigue (F2), a Weeks 8–9 experiment vacuum (F3), analysis-view decay (F4). Pillar 6 is a positive obligation across the whole runtime. `07`'s "Approximately three hours should contain escalation, not repetitive grinding" is the same obligation stated as balance. **Nothing in the corpus specifies how the middle of the game stays enjoyable**, and F2 in particular is the design satirising administrative friction _by means of_ administrative friction. Medium-high confidence this is a real divergence.

**D2 — The eight experience criteria do not test engagement.**
Reading `01` and `13` together: seven of the eight criteria are comprehension or meaning criteria ("can explain the objective," "understand why each experiment matters," "see how choices change state," "publication does not solve precarity," "industry attractive but imperfect," "discussable," "later pressure and discomfort"). One touches affect ("can make the player laugh"). **None asks whether the player wants to keep playing.** The slice gate (`13`) repeats the pattern: item 4 is "understandable," not "enjoyable." Consequence: the approved evaluation system would pass a game that is legible, meaningful, funny, well-tested, accessible, and tedious. **High confidence.** This is the most important misalignment I can identify between the expectation map and the design's actual risk profile.

**D3 — E5 (no academic knowledge required) cannot be tested under E13 (Leonardo is the only evaluator).**
E10's first criterion is "A player without academic experience can explain the main objective." `13` forbids recruiting external players and names Leonardo as the only human evaluator. Leonardo cannot serve as a proxy for a player without academic experience — the corpus's own premise (P13, decision log 2026-08-23) is that the material is drawn from his experience. **High confidence** that at least criteria 1 and 2, and arguably 4 (early laughter), 5 (later pressure), and 8 (discussability), are unverifiable within the approved method. `13` acknowledges a related limit ("This is private creative review, not a claim about a general audience") but does not resolve the dependency.

**D4 — "Learnable causal patterns" versus the band table.** Carried forward from Stage 1 and unaddressed by the new corpus. `01` pillar 2 requires "experiments have intelligible causes"; `02` and `07` require the player to "learn causal patterns." The approved mechanism produces three qualitative outcomes from one preparation quality across ~8–12 total observations. Medium-high confidence.

**D5 — The 3-hour ambition versus the pacing arithmetic.** Stage 1 computed ~70–80 periods of demand against 64 available, and ~2.8 real minutes per period. The new corpus confirms the intent (E11, U1) but adds no pacing evidence. Note that `14`'s stop rules and `01`'s "do not promise the three-hour game before the 90-minute game works" already treat the 3-hour target as contingent, which is consistent with P1 and U6.

---

## 8. Narrative-direction alignment

**Overall: the strongest alignment in the project.** Stage 1 rated narrative direction "clear from the concrete design alone"; the vision documents confirm that the arc Stage 1 reconstructed (euphoria → clarification → inflation → exposure → negotiation → attrition → departure) is the arc E4 specifies.

**Confirmed alignments (high confidence):**

- E4's three-stage arc maps directly onto the five acts. "Amusing recognition" is Weeks 1–4 (the environmental catalogue's densest bureaucracy window). "Pressure and uncomfortable complicity" is Weeks 6–14. "Bitter but human" is Weeks 15–16 plus the epilogue.
- P10 (structural blame) is fully realised. Every character has a pressure of their own, and `MR-OPT-ELENA-FUTURE`'s "The renewal panel wants a five-year plan. It has not asked whether I will have a fifth year" is the design's clearest statement that Elena is inside the same machine.
- E7's non-goal "an attempt to explain all of academia" is honoured. The game explains one floor, one paper, one semester, five people.
- The academia/industry tension satisfies E2 pillars 3 and 4 precisely. Morrow opens _because_ of rejection (`12` `MR-OPT-CAMILA-INITIAL` prerequisite: Knowledge rejection). Aldercroft is an invitation, not a job. Neither is a rescue. **This is the clearest instance of theme becoming structure in the whole design.**
- `scene.0642.choice.academia` / `.morrow` ("You do not owe it optimism" / "You do not owe it gratitude") is a compact expression of P3.

**Divergence risks:**

**N1 — Non-nihilism currently rests on very little.** E4 forbids nihilism and names solidarity as the counterweight. Concretely, the counterweight is: five `*-SUPPORT` afterbeats of which exactly one can fire (`08`, `12`); `MR-CIT-05`; and the four career endings, all of which are deflationary. `MR-END-CAREER-NONE` — "The contract ended on time. The person who held it did not" — is the corpus's bleakest line, and `MR-END-CAREER-LEAVE` ("the future is not solved, but it is no longer waiting in the same corridor") is its warmest. **Medium-high confidence** that the current draft is closer to bleak-honest than to bitter-but-human, and that whether it crosses into nihilism depends on a small number of lines and one afterbeat slot. This is A7.

**N2 — Complicity may not reach most players.** See A5 / U4. If the honest path is completable, E4's middle stage becomes "pressure" without "complicity."

**N3 — Camila's structural thinness.** Carried from Stage 1. `05` and `09` bar her from having a model or on-floor presence; `12` gives her three contacts. E2 pillar 4 ("The exit is meaningful, not utopian") depends on her carrying an entire alternative life in email. See A6. **Medium-high confidence** this is currently the narrative's thinnest load-bearing element.

**N4 — Haoran's arc versus its mechanical footprint.** `05` states his arc "tests whether the player resists pressure or passes it down the hierarchy" — arguably the most morally central test in the game. Its mechanical realisation is two optional scenes (one removed in the fallback), a ±10/±20 trust bar, a co-authorship flag, and one possible afterbeat. **Medium confidence** that the stated moral weight exceeds the mechanical weight.

---

## 9. Artistic and audio-direction alignment

**Overall: high alignment, with one unresolved vocabulary problem.**

**Confirmed alignments (high confidence):**

- P6 and E9 are fully realised in `09`'s negative list. Every visual comic register that could compete with institutional language has been banned. The palette, materials, typography, and lighting are all in service of a straight-faced world.
- E7's photorealism non-goal and E14's budget are consistent with `09`'s asset limits (one kit, ≤24 prop families, 4 NPCs, 1K textures, ≤75 MB).
- E6's "Organoid damage must look scientific and stylized. It must not use body horror" is enforced in `09` ("no gore, sudden flash, body horror, hallucination, or glitch effect") and in `04`'s prohibition on real microscopy.
- P5 is enforced at the presentation layer: every colour meaning duplicated in text/icon/object-state/sound; reduced motion removes motion without removing information.
- The non-lexical vocal palette decision (`09`, `12`) satisfies E14's budget and E8's "no cloned voices," and produces a genuinely distinctive aesthetic. `09`'s prohibition on imitating "a real person or another game" is a P1-style anti-overclaim rule applied to audio.
- The six music stems' briefs map onto the act structure; `MR-MUS-04` "Public record: bright institutional swell" is a satirical brief in the correct register.

**Divergence risks:**

**A/V-1 — "Increasingly surreal" has no approved visual vocabulary.** This is the sharpest accidental tension in the corpus. `README` promises the institution becomes "increasingly surreal." `01` pillar 2 promises "increasingly absurd." But `09` bans every mechanism by which a 3D environment normally becomes surreal, and `06` caps environmental change at one major and two minor items per phase across the whole floor. The approved act-state progression is entirely realistic: booking pressure → revision piles → preprint traces → colder light and warnings → emptier rooms. **High confidence** that the current concrete design delivers _escalating institutional realism_, not surrealism, and that the two top-level documents describe something the presentation documents forbid. See A8. Note that Direction 1 (textual surrealism only) is a perfectly coherent artistic answer — but it means `README` and `01` currently misdescribe the game.

**A/V-2 — Twenty lighting presets across sixteen weeks.** Five act states × four periods. Stage 1 rated this legible but questioned whether five discrete steps convey a continuous decay. The new corpus does not address it. Medium confidence.

**A/V-3 — Audio execution risk unchanged.** Eight sounds per character across ~17 scenes plus message beats; non-lexical vocalisation is easy to make grating. `09`'s "controlled pitch and rhythm variation" acknowledges without solving. This remains the highest-variance execution item in presentation. Medium confidence.

**A/V-4 — The €150 ceiling and the asset plan.** IBM Plex is OFL, so typography is free. But the plan requires one modular floor kit, 20 prop families, 6 station kits, 4 rigged NPCs with a shared animation set, 8 room ambiences, 3 cues, 40 original non-lexical vocal sounds, and 6 music stems — all under €150 total, with NC/ND and unclear-licence sources excluded by default (E15), no complete pre-built lab scene, and no unmodified character pack (`09`). `09` permits licensed generic assets for furniture. **Medium-high confidence** that this is the tightest single production constraint in the project, and that the four NPC models and the audio palettes are the roles most likely to force original creation or role removal.

---

## 10. Productive creative tensions

These are tensions where the friction appears to be doing work rather than causing damage.

| #   | Tension                                                                           | Why it is productive                                                                                                                                                                                                                                                        |
| --- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PT1 | **P1 (epistemic honesty in process) versus a game about misrepresented evidence** | The process and the fiction share a thesis. The documentation's refusal to let a plan pose as evidence is the same discipline the protagonist may fail. This is the corpus's most interesting property and it is almost certainly not accidental.                           |
| PT2 | **P3 (no moralizing) versus E4 (complicity)**                                     | Complicity requires that the game not judge; judgement would convert complicity into punishment. The refusal to score is _how_ complicity becomes possible.                                                                                                                 |
| PT3 | **P4 (dignity, no game-over) versus survival-genre framing**                      | Because no failure ends the run, every failure must be metabolised as content. This forces the design's best rule: "Failure should normally reveal information, force a trade-off, alter a relationship, or advance the narrative rather than only erase progress" (`02`).  |
| PT4 | **P7 (compact depth) versus a 16-week campaign**                                  | The compression is why one room can mean four different things across five act states, and why Gabriel's trust value can be load-bearing in four systems. Breadth would have diluted this.                                                                                  |
| PT5 | **P2 (authored control) versus replay**                                           | The ≤2-variant rule caps replay but guarantees that every line is deliberate. For a satire whose comedy is word-level, this is the correct trade and the documents make it consciously (`01` hedges longevity as "may").                                                    |
| PT6 | **E3/P5 (no dexterity, full accessibility) versus a laboratory setting**          | Removing motor skill forces the design to locate difficulty in judgement, which is where the theme lives. A pipetting minigame would have made the game about hands instead of about claims.                                                                                |
| PT7 | **E11 (fixed 3-hour target) versus E4's attrition arc**                           | Compression is why the semester reads as escalation rather than routine, and why 64 periods can feel scarce.                                                                                                                                                                |
| PT8 | **E13 (private evaluation) versus E21 (portfolio credibility)**                   | Refusing to recruit participants is consistent with P9 and produces a smaller, more honest evidence claim. `13`'s explicit "This is private creative review, not a claim about a general audience" is exactly the kind of scoped claim that a portfolio reviewer can trust. |
| PT9 | **P6 (verbal comedy) versus `09`'s visual restraint**                             | The restraint makes the language funnier. A world that never winks lets "Form 18B" carry the joke alone.                                                                                                                                                                    |

---

## 11. Accidental or unresolved tensions

### Resolved from Stage 1 by the new corpus

**R1 — Drug exposure's requirement link.** Stage 1 flagged `MR-EXP-DRUG-EXPOSURE` sharing `MR-REQ-EXP-001` with required templates. `15` shows `MR-REQ-EXP-001` is a broad loop-and-boundary requirement ("Implement the five-stage loop, six templates, active-sample limit, physical monitoring, record creation, and non-actionable science boundary"). The link is legitimate. **Resolved.**

**R2 — Repair-state template versus `MR-REQ-EXP-003` in the fallback.** Stage 1 flagged an apparent violation. `15` shows `MR-REQ-EXP-003` is a fiction-boundary requirement ("Never present the repair state as proven cause of recovery or expose a real laboratory protocol"), not a content-inclusion requirement. The fallback does not violate it. **Resolved.**

### New or sharpened tensions

**T1 — Fun is a stated pillar but not an evaluation criterion.**
E2 pillar 6 ("the game must remain fun and absurdist throughout") and `07`'s "escalation, not repetitive grinding" are positive obligations. `13`'s twelve test IDs, twelve slice items, and eight experience criteria contain no engagement, pacing, or moment-to-moment-pleasure check. **High confidence this is a genuine gap.** Combined with Stage 1's finding that texture is the design's largest open risk, the approved evaluation apparatus is well aimed at the risks the design does _not_ have (consistency, correctness, accessibility, provenance, privacy) and blind to the risk it does.

**T2 — Four to five of the eight experience criteria are unverifiable under E13.**
See D3. `13` names Leonardo the sole human evaluator and forbids recruitment; criterion 1 explicitly concerns "a player without academic experience." **High confidence this is a methodological contradiction inside the approved plan**, not merely a limitation. `13` records related limits but never states how criteria 1, 2, 4, 5, or 8 will be judged.

**T3 — `README` and `01` promise surrealism that `09` and `06` forbid.**
See A/V-1 and A8. **High confidence.** Either the top-level description or the presentation vocabulary is wrong; the documents do not record a decision resolving them. `AGENTS.md` requires that contradictions be recorded and raised, not silently resolved — so this qualifies as a reportable item under the project's own rules.

**T4 — Non-interactive scene time: 15–20 minutes versus 14–18 minutes versus 14:45.**
Decision log 2026-08-26 confirms "15–20 minutes, with a 22-minute maximum." `02` and `03` state a 14–18-minute target. `12` plans 14:45 for the seven main scenes plus a 75-second epilogue. Stage 1 flagged the 14–18 versus 14:45 relationship; the decision log now reveals an **unrecorded supersession** from 15–20 to 14–18. Cosmetic in effect, but it breaches the decision log's own rule ("When a decision changes readiness, update `00-design-index.md` in the same change") and the roadmap's supersession protocol.

**T5 — `MR-REQ-EXP-001` requires "six templates"; the approved fallback ships four.**
`15`'s requirement text is unconditional. `12`'s fallback replaces two templates with one composite (`MR-FB-EXP-RANGE-REPAIR`) and drops drug exposure, yielding four. `15`'s definition of done requires that "its approved behaviour and failure path are implemented." Low-to-medium significance; the requirement text lacks a fallback qualifier that `MR-REQ-CONTENT-002` has ("full and fallback content counts").

**T6 — The manuscript board has work packages and requirements but no specified behaviour.**
`15` assigns it to `MR-REQ-UI-001` / `MR-WP-05` and content integration to `MR-WP-08`. `15`'s definition of done item 1 requires "its approved behaviour and failure path are implemented." `07` names seven card types and a requirements panel; `12` supplies three claim strings and three requirements strings. **No approved behaviour exists.** Under `15`'s source-of-truth order, an implementation worker would have to escalate rather than build. This sharpens Stage 1's finding: it is now not merely a specification gap but a blocker under the project's own contract, sitting at the centre of Weeks 5–8 and 14.

**T7 — The protected break is a time-costing action with no action ID, and `02` forbids adding one.**
`02` and `07` give the protected break a cost (1 period) and effect (restore 2 or 1). `12`'s action table omits it. `02` states: "No later agent may add a new time-costing action class without a requirement change." Therefore the break is currently unimplementable without a requirement change — for an action that the energy economy depends on entirely. Stage 1 flagged the omission; with `15` in hand it is now a contract-level problem. **Medium-high confidence.**

**T8 — The Week-6 contradictory-revision beat is required but unauthored.**
`03`'s beat sheet requires it; `MR-SCN-WHAT-WE-HAD` (Week 7) depends on it having happened; `MR-REQ-NARR-001` requires the fixed campaign "in the approved order." `12` contains no `MR-SCN-`, `MR-TASK-`, or `MR-REC-` object for it. Since this beat is arguably the campaign's signature joke — and the one that most directly delivers E9 and pillar 3 — its absence from the catalogue is notable. Carried forward from Stage 1, unaddressed by the new corpus. **Medium confidence.**

**T9 — "Visible evidence concern" gates both career routes and is nowhere defined.**
`07` and `08` both gate on it. `12` supplies eight relevant flags but no mapping to visibility-to-Aldercroft-or-Elena. `MR-TEST-CHAR-001` must prove "a hidden integrity problem alone does not create an unsupported route block" — which cannot be tested without the definition. Carried forward from Stage 1. **High confidence the gap exists.**

**T10 — Capacity arithmetic.**
6–8 h/week over 12–18 months is roughly 380–620 hours for: a full Vite/TypeScript/Three.js codebase across ten work packages; one continuous 400 m² floor with visibility management; a rules engine with a deterministic PRNG and an ending resolver; an IndexedDB layer with backup, migration, and recovery; a semantic accessible UI meeting 150%-scale criteria; a cutscene timeline; ~6,000 words of content integrated as validated JSON plus strings; 20 prop families, 4 rigged NPCs, 6 station kits, 20 lighting presets; 8 ambiences, 40 vocal sounds, 6 music stems; and a test suite at 90% line / 85% branch across rules, persistence, and content validation with Playwright flows in three engines. `14` correctly calls this "a capacity estimate, not a delivery promise" and provides stop/pause/reframe rules. I note it as a tension rather than an error because P1 and U6 show the hedging is deliberate: **medium-high confidence that the 90-minute fallback is the more probable terminal deliverable**, which the documents have already accommodated.

**T11 — Portfolio purpose requires publication; every publication step is gated.**
E21–E23 depend on a public artefact and case study. `14` and `15` gate the remote, licence files, deployment, and portfolio integration behind separate approvals, and `01` forbids announcing a date before the slice passes. Not a contradiction — but it means the portfolio value cannot be realised until several sequential Leonardo decisions occur, each currently blocked. Worth naming because E21 is one of only two stated purposes.

**T12 — Decision-log formatting.**
A blank line splits the table immediately before the 2026-08-28 B10 rows, breaking the Markdown table. Trivial, but the log is a named source-of-truth artefact in `15`'s order of authority.

---

## 12. Decisions that need Leonardo's judgment or a prototype

I separate these by whether they are creative-judgment calls, prototype-empirical calls, or specification gaps requiring a decision before implementation.

### 12.1 Creative judgment (no prototype can settle these)

| #   | Decision                                                                                                                                                                             | Axis     |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| J1  | Whether the institution's absurdity escalates in language only, in bureaucratic accretion, or in world behaviour — and correspondingly whether `README`/`01` or `09`/`06` is amended | A8 / T3  |
| J2  | Whether the ending is cold-with-one-human-beat, warmer, or deliberately unresolved — i.e. where "bitter but human" sits on the temperature scale                                     | A7 / N1  |
| J3  | Whether the honest path is meant to be completable, making fabrication a minority curiosity, or structurally squeezed, making complicity broad                                       | A5 / U4  |
| J4  | How much dramatic weight Morrow and Camila are meant to carry, given that she can never appear physically                                                                            | A6 / N3  |
| J5  | Whether the Supported profile is a fairness setting or a legitimate second reading of the work                                                                                       | A10      |
| J6  | Whether the game is a one-run work with a satirical Archive, a two-run honesty-experiment work, or a citation-collection work                                                        | A11 / U5 |
| J7  | Whether the floor is populated, quiet, or progressively emptying                                                                                                                     | A3 / U3  |
| J8  | Whether Elena or Haoran is the emotional centre, given Haoran's stated moral weight versus his mechanical footprint                                                                  | U7 / N4  |
| J9  | Whether "the game must remain fun throughout" (pillar 6) is a criterion Leonardo intends to hold himself to, and if so what evidence would satisfy it                                | T1       |
| J10 | How criteria 1, 2, 4, 5, and 8 will be judged given E13's sole-evaluator constraint — including whether E13 is a hard ethical boundary or a scope default                            | T2 / D3  |

### 12.2 Specification gaps requiring a decision before their work package can start

| #   | Gap                                                                                                                        | Blocked package                 |
| --- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| S1  | Manuscript-board behaviour: card capacity, constraints, conflicts, what the player is solving                              | `MR-WP-05`, `MR-WP-08` (T6, A2) |
| S2  | Operational definition of "visible evidence concern" for route gating                                                      | `MR-WP-01` (T9)                 |
| S3  | Protected-break action ID and cost class                                                                                   | `MR-WP-01` (T7)                 |
| S4  | Week-6 contradictory-revision beat content object                                                                          | `MR-WP-08` (T8)                 |
| S5  | PIIM response-card satisfaction rules — including whether an honestly stated limit can meet a card, as `MR-CIT-03` implies | `MR-WP-01` (Stage 1 §14)        |
| S6  | Number of monitoring points per experiment run (1 or several) — determines whether the 64-period budget closes             | `MR-WP-01`                      |
| S7  | Authored equipment-fault inventory beyond `MR-OPT-GABRIEL-QUEUE`                                                           | `MR-WP-08`                      |
| S8  | Whether a repeat can upgrade a weak result, and its evidence yield under diminishing returns                               | `MR-WP-01`                      |
| S9  | Station-view interaction design                                                                                            | `MR-WP-04`, `MR-WP-05` (A1)     |

### 12.3 Prototype-empirical (the slice or a later build must answer)

Carried forward from Stage 1 §13 and unchanged by the new corpus: traversal tolerance; five-stage-loop satisfaction; evidence-view interpretive pleasure; cost-preview friction; non-lexical palette tolerance; visual-style read; environmental-text discovery without markers; Interaction Assist calibration; 150%-scale layout. Added by this stage:

| #   | Question                                                                            | Why the slice as currently scoped will not answer it                     |
| --- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Q1  | Does the loop remain enjoyable past the novelty window?                             | The slice is Week 1 only; F2 and F4 onset are predicted around Weeks 3–6 |
| Q2  | Does the 64-period budget close, and does the crash rate feel dramatic or punitive? | Requires a full campaign, not a slice                                    |
| Q3  | Does Weeks 8–9 sag?                                                                 | Requires mid-campaign play                                               |
| Q4  | Does the epilogue land after three hours?                                           | Requires a full run                                                      |
| Q5  | Do twenty lighting presets convey sixteen weeks of decay?                           | Requires at least three act states built                                 |
| Q6  | Is run 2 a replay or a reread?                                                      | Requires two full runs                                                   |
| Q7  | Can the asset plan be delivered under €150 with the licence boundary intact?        | Requires Phase 1 asset sourcing, which `14` places before the slice      |

---

## 13. Evidence table

Class key: **1** = explicit expectation / constraint; **2** = strongly implied preference; **3** = uncertain inference; **4** = open axis; **T** = tension or contradiction; **S1** = Stage-1 finding carried forward.

| #   | Statement                                                                                                                      | Class           | Confidence                   | Sources                                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------ | --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1   | Six design pillars, bitterly comic academic-survival identity, first-person Three.js web game with local save                  | 1               | High                         | `01` vision + pillars; `README`; decision log 2026-08-23/25/26                                                           |
| 2   | Difficulty must come from planning, interpretation, time, and ethics; dexterity is an explicit non-goal                        | 1               | High                         | `01` pillar 1 + non-goals                                                                                                |
| 3   | Emotional arc: amusing recognition → pressure and complicity → bitter but human; must not be nihilistic; solidarity meaningful | 1               | High                         | `01`; decision log 2026-08-26                                                                                            |
| 4   | Eight qualitative experience success criteria, all comprehension/meaning-oriented; none tests engagement or pacing             | 1 (and T)       | High                         | `01`; `13` fallback/full-game evaluation                                                                                 |
| 5   | No academic knowledge may be required to understand objectives, causes, jokes, or consequences                                 | 1               | High                         | `01` intended audience                                                                                                   |
| 6   | Teen/12+ boundary; no graphic injury, self-harm, sexual content, extreme abuse, body horror                                    | 1               | High                         | `01`; decision log 2026-08-26                                                                                            |
| 7   | Twenty-one explicit non-goals                                                                                                  | 1               | High                         | `01`                                                                                                                     |
| 8   | The fiction must never reference AI-assisted production; agent evidence lives outside the fiction                              | 1               | High                         | `01`; `14`; decision log 2026-08-26                                                                                      |
| 9   | ≤6,000 unique English words; no runtime-generated dialogue                                                                     | 1               | High                         | `01`; `12`; decision log 2026-08-28                                                                                      |
| 10  | Testing is private to Leonardo and Codex; no external players, participant data, surveys, or external review                   | 1               | High                         | `13`; decision log 2026-08-28                                                                                            |
| 11  | 6–8 h/week, 12–18 months estimate, no paid budget, EUR 150 exceptional-cost ceiling                                            | 1               | High                         | `14`; decision log 2026-08-28                                                                                            |
| 12  | Asset provenance verified and manifested before any integration including prototypes; downloadability ≠ permission             | 1               | High                         | `09`; `14`; `ASSET_MANIFEST.md`                                                                                          |
| 13  | Implementation prohibited until the design-index gate is explicitly approved                                                   | 1               | High                         | `AGENTS.md`; `00`; `15`                                                                                                  |
| 14  | Dual purpose: personal creative outlet plus demonstration of directing LLM agents; the game must first work as a game          | 1               | High                         | `01` creative/portfolio purpose; decision log 2026-08-26                                                                 |
| 15  | Coverage targets ≥90% line / ≥85% branch in rules, persistence, content validation                                             | 1               | High                         | `13`                                                                                                                     |
| 16  | P1: epistemic honesty applied to the project's own claims, mirroring the game's theme                                          | 2               | High                         | `13` "No test result exists yet"; `09`; `11` Safari rule; `AGENTS.md` timestamps; `ASSET_MANIFEST.md`; `decision-log.md` |
| 17  | P2: authored control over emergence — no procedural, generated, roaming, crowd, physics, or navmesh systems                    | 2               | High                         | `05`; `07`; `11`; `12`; `01` non-goals                                                                                   |
| 18  | P3: refusal to moralize — no score, no label, no ending rank, misconduct can go unpunished                                     | 2               | High                         | `05`; `07`; `08`; `10`; `12` `MR-CIT-07`                                                                                 |
| 19  | P4: dignity — no pre-W16 game-over, informative failure, no perfect-result requirement, Supported without stigma               | 2               | High                         | `02`; `07`; `10`                                                                                                         |
| 20  | P5: accessibility as design value, reinforced rather than opposed by the dexterity rejection                                   | 2               | High                         | `02`; `04`; `07`; `09`; `10`; `13`; `15` `MR-REQ-A11Y-001`                                                               |
| 21  | P6: institutional language as the primary comic instrument; all visual comic registers banned                                  | 2               | High                         | `01` humour rule; `09` prohibitions; `12` env catalogue and citations                                                    |
| 22  | P7: compact density over breadth; expansion forbidden without a new decision                                                   | 2               | High                         | `01` pillar 5; `06`; `09`; `12`; `14` scope controls                                                                     |
| 23  | P8: anti-handholding — no markers, minimap, arrows, tutorial room                                                              | 2               | High                         | `02`; `06`; `10`                                                                                                         |
| 24  | P9: privacy and refusal of extraction — no telemetry, accounts, uploads, participant data                                      | 2               | High                         | `10`; `11`; `13`                                                                                                         |
| 25  | P10: structural rather than personal blame; Elena is not a villain                                                             | 2               | High                         | `05`; `03`; `12` `MR-OPT-ELENA-FUTURE`                                                                                   |
| 26  | P11: solidarity as the emotional counterweight to bleakness                                                                    | 2               | Medium-high                  | `01`; `MR-CIT-05`; Haoran/Samira/Gabriel scenes; `*-SUPPORT` afterbeats; Gabriel pass-through                            |
| 27  | P12: traceability as craft, partly portfolio-motivated and partly temperamental                                                | 2               | High                         | `15`; `00` roadmap; `AGENTS.md`                                                                                          |
| 28  | P13: the project draws on a documented personal emotional source, with literal reproduction prohibited                         | 2               | High (that it is documented) | decision log 2026-08-23; `01`; `14` "historical Unpaid prototypes"; `README` Career Center reference                     |
| 29  | U1: 3 hours is a ceiling he would defend over a floor                                                                          | 3               | Medium-high                  | `07` grinding clause; `14` scope controls; `01` "may add longevity"                                                      |
| 30  | U2: the interaction-texture consequence of rejecting dexterity is accepted but not fully priced                                | 3               | Medium                       | `01` pillar 1 (explicit) vs. total absence of any feel/texture discussion in `00`'s roadmap                              |
| 31  | U3: he expects corridors to feel eventful                                                                                      | 3               | Medium                       | `02`/`06` traversal rationale vs. `06` anchor and change budget; `06` Week 15–16 "emptier rooms" cuts the other way      |
| 32  | U4: complicity is meant to be broadly experienced                                                                              | 3               | Medium-high                  | `01` arc; `MR-SCN-HELPFUL-COMMENTS` choice B; vs. one-click explicit integrity acts                                      |
| 33  | U5: the Archive is primarily satirical, not a replay driver                                                                    | 3               | Medium                       | `08` no-carry-over and no-rewind rules; adjacency to Institutional Citations                                             |
| 34  | U6: the 90-minute fallback is the more likely terminal deliverable                                                             | 3               | Medium                       | `14` phase gates and stop rules; `01` promise-ordering rule; T10 arithmetic                                              |
| 35  | U7: Elena is the intended emotional centre                                                                                     | 3               | Medium                       | scene distribution; vs. `05`'s statement of Haoran's arc as the hierarchy test                                           |
| 36  | U8: he would accept a colder ending over a warmer one                                                                          | 3               | Medium                       | `12` draft tone; vs. `01` explicit non-nihilism rule                                                                     |
| 37  | U9: absurdity escalates in language, not world behaviour                                                                       | 3               | Medium                       | `09` prohibitions; `06` change cap; vs. `README`/`01` "surreal"/"absurd"                                                 |
| 38  | A1: station-view interaction depth is unspecified — confirmation surface, diegetic instrument, or judgement instrument         | 4               | —                            | `02`; `04`; `10` (constraints only)                                                                                      |
| 39  | A2: manuscript board is unspecified — form, constraint puzzle, or rhetorical composition                                       | 4               | —                            | `07` card list; `12` three strings; `15` no behaviour                                                                    |
| 40  | A3: floor population is unspecified — populated, quiet, or progressively emptying                                              | 4               | —                            | `06`; `05`; `07` schedule tables                                                                                         |
| 41  | A4: whether pressure reads as anxiety or as a solvable schedule                                                                | 4               | —                            | `07` route feedback vs. `01` arc                                                                                         |
| 42  | A5: whether fabrication is a structural temptation or a minority experiment                                                    | 4               | —                            | `07` budget; `12` integrity forks; `01` complicity                                                                       |
| 43  | A6: Morrow's dramatic weight, given Camila's remote-only constraint                                                            | 4               | —                            | `05`; `09`; `12` three contacts                                                                                          |
| 44  | A7: ending temperature inside the 60–90-second budget                                                                          | 4               | —                            | `01` non-nihilism vs. `12` draft                                                                                         |
| 45  | A8: where surrealism lives                                                                                                     | 4               | —                            | `README`; `01`; `09`; `06`                                                                                               |
| 46  | A9: what the vertical slice is meant to prove — feasibility/clarity or fun                                                     | 4               | —                            | `13` six slice items                                                                                                     |
| 47  | A10: Supported as fairness setting or second reading                                                                           | 4               | —                            | `07`; `10`                                                                                                               |
| 48  | A11: replay intent                                                                                                             | 4               | —                            | `08` Archive; `12` variant caps                                                                                          |
| 49  | T1: fun is a pillar but not an evaluation criterion                                                                            | T               | High                         | `01` pillar 6; `07` grinding clause; `13` all test IDs and slice items                                                   |
| 50  | T2: 4–5 of the 8 experience criteria are unverifiable under the sole-evaluator rule                                            | T               | High                         | `01` criteria 1–2, 4–5, 8; `13` evaluation boundary                                                                      |
| 51  | T3: `README`/`01` promise surrealism that `09`/`06` forbid                                                                     | T               | High                         | `README`; `01` pillar 2; `09` prohibitions; `06` change cap                                                              |
| 52  | T4: unrecorded supersession of scene-time target from 15–20 to 14–18 minutes                                                   | T               | High                         | decision log 2026-08-26 vs. `02`, `03`, `12`                                                                             |
| 53  | T5: `MR-REQ-EXP-001` requires six templates; the approved fallback ships four                                                  | T               | Medium                       | `15`; `12` fallback boundary                                                                                             |
| 54  | T6: manuscript board has requirements and packages but no approved behaviour                                                   | T               | High                         | `07`; `12`; `15` definition of done item 1                                                                               |
| 55  | T7: the protected break is a costed action with no action ID, and `02` forbids adding one                                      | T               | Medium-high                  | `02`; `07`; `12` action table                                                                                            |
| 56  | T8: the Week-6 contradictory-revision beat is required but has no content object                                               | T               | Medium                       | `03` beat sheet; `12` catalogues; `15` `MR-REQ-NARR-001`                                                                 |
| 57  | T9: "visible evidence concern" gates both routes and is undefined                                                              | T               | High                         | `07`; `08`; `12` flags; `13` `MR-TEST-CHAR-001`                                                                          |
| 58  | T10: capacity arithmetic is very tight for the full target; the documents already hedge                                        | T               | Medium-high                  | `14`; `09` asset plan; `13` coverage targets                                                                             |
| 59  | T11: portfolio purpose requires publication; every publication step is separately gated                                        | T               | Medium                       | `01` E21–E23; `14`; `15`                                                                                                 |
| 60  | T12: decision-log table broken by a blank line before the B10 rows                                                             | T               | High                         | `decision-log.md`                                                                                                        |
| 61  | R1/R2: two Stage-1 flagged requirement conflicts are resolved by `15`'s requirement definitions                                | T (resolved)    | High                         | `15` `MR-REQ-EXP-001`, `MR-REQ-EXP-003`                                                                                  |
| 62  | S1: Stage-1's identity findings are confirmed as intentional by the decision log, block by block                               | S1              | High                         | decision log 2026-08-25 through 2026-08-28                                                                               |
| 63  | S1: interaction texture was never a roadmap discussion block                                                                   | S1              | High                         | `00` roadmap B00–B10                                                                                                     |
| 64  | S1: the band table cannot teach causality at ~8–12 samples; post-slice tuning may change only the percentages                  | S1 (unresolved) | Medium-high                  | `02`; `07` outcome-band contract                                                                                         |

---

### Closing note on the two stages

Stage 1 concluded that this is a coherent game with an unmistakable identity, a verified comedic voice, an unusually principled ethical architecture, and open risks concentrated in tactile texture, traversal value, outcome legibility, an unspecified manuscript board, and a three-hour canvas holding a sixteen-week curve. Nothing in the newly supplied corpus changes that assessment.

What the new corpus adds is that **almost every Stage-1 strength is a deliberate, dated, recorded decision**, and that **almost every Stage-1 risk sits in a region the design process never opened as a question**. The eleven-block roadmap covers vision, science, cast, campaign, gameplay, balance, endings, world, presentation, architecture, and content. It never opens a block on how the game _feels_ under the hand, and the approved evaluation plan measures correctness, clarity, accessibility, provenance, and meaning — but not engagement. The expectation map therefore contains a stated obligation ("the game must remain fun and absurdist throughout") that the project has, so far, given itself no method to test.
