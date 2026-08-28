# Independent Design Review — *Minor Revisions*

## 1. Corpus confirmation

Files supplied in this packet, all read completely:

| # | Path | Read in full | Notes |
|---|---|---|---|
| 1 | `docs/02-player-experience-and-loop.md` | Yes | Complete; ends with B10 content/implementation boundary. |
| 2 | `docs/03-narrative-and-campaign.md` | Yes | Complete; ends with title/brand check note. |
| 3 | `docs/04-science-and-experiments.md` | Yes | Complete; ends with B10 experiment baselines. |
| 4 | `docs/05-characters-and-dialogue.md` | Yes | Complete; ends with dialogue/content boundary. |
| 5 | `docs/06-world-and-level-design.md` | Yes | Complete; ends with B10 environmental content boundary. |
| 6 | `docs/07-systems-and-balance.md` | Yes | Complete; ends with outcome-band/tuning contract. |
| 7 | `docs/08-endings-and-state-matrix.md` | Yes | Complete; ends with B10 ending-content inventory. |
| 8 | `docs/09-art-audio-and-assets.md` | Yes | Complete; ends with deliberate later verification. |
| 9 | `docs/10-ui-ux-accessibility.md` | Yes | Complete; ends with deliberate later verification. |
| 10 | `docs/11-technical-architecture.md` | Yes | Complete; ends with deliberate later verification. |
| 11 | `docs/12-content-specification.md` | Yes | Complete; ends with content validation/handoff checks. |

No file in the supplied set is empty, truncated, or unreadable, so I proceed.

Files referenced by the corpus but **not supplied**: `docs/01-*` (index/vision, implied by "design-index gate" in `11`), `docs/13-testing-and-evaluation.md`, `docs/14-*` (unknown), `docs/15-implementation-contract.md`, `assets/ASSET_MANIFEST.md`, and the future `strings.en.json` and content JSON. Requirement IDs (`MR-REQ-...`) and test IDs (`MR-TEST-...`) are cited throughout the packet but their definitions live in the unsupplied documents. I treat those as absent information, not as defects, and I do not infer their contents. Per the instructions this is a limited packet, so I continue rather than stop.

---

## 2. The game in one sentence

*Minor Revisions* is a first-person, three-hour, browser-based academic-precarity satire in which a postdoc spends a fixed 16-week semester on one 400 m² research floor running an abstracted five-stage cardiac-organoid experiment loop, converting evidence cards into manuscript claims under a PI's expanding definition of "a few more experiments," and arriving at 06:42 in Week 16 with a paper state, an integrity record, four working-trust bars, and at most two viable career exits.

---

## 3. Identity fingerprint

The identity is unusually easy to state, and the documents state it consistently rather than gesturing at it.

**Explicit, load-bearing identity facts:**

- Genre-frame: a "survival-game profile" (`02`, "Energy, pressure, and recovery") applied to knowledge work — energy segments, time periods, crash-at-desk, no home scene, no sleep action, no game-over before Week 16.
- Unity of place and time: one continuous floor, no room loading, "continuous day-and-night work loop," 64 named work periods, campaign starts and ends at 06:42 (`02`, `03` "Campaign invariants", `06` "B07 scaled floor plan", `11` "World, rendering, and interaction runtime").
- The antagonist is a *process*, not a person: Elena is explicitly "not a simple villain" (`05`), and the satire is located in "the expanding definition of sufficient evidence" (`03`, "Premise").
- The core verb is not experimentation but **claiming**: the manuscript board's careful/strong/inflated triad (`04` "Results and claims"; `12` `manuscript.claim.*`) is where the science, the PI, the reviewers, integrity, and both career routes all converge.
- Explicit refusals form much of the identity: no quest markers, no minimap, no objective arrows, no moral score, no romance, no inventory, no pickups, no sprint/jump/crouch, no procedural request generation, no free-form or generated dialogue, no chapter rewind, no second save, no analytics (`02`, `06` "B07 access, doors, and movement", `07` "Requests, gates, and soft failure", `10`, `11`, `12` "Authority and scope").
- Tone signature is fixed at the sentence level, not just described. `12` contains it: "A few supplementary pieces is a phrase with a flexible skeleton" (`scene.clarified.internal.close`); "the claim is attractive, but direct proof has not yet agreed to exist" (`record.knowledge.body`); "Form 18B: request permission to treat a temporary arrangement as temporary" (`env.bureaucracy.01`).

**Confidence: high** that the identity is clear and identifiable. This is not a case where I must reconstruct intent — `12-content-specification.md` supplies enough authored prose that the voice is verifiable rather than promised.

---

## 4. Distinctive versus generic elements

### Distinctive

1. **Claim-level as the central mechanic.** Careful/strong/inflated is simultaneously a wording choice, a PI-confidence delta (`07`: −5/+5/+10), an integrity risk, a reviewer-difficulty modifier, and one of three PIIM response cards (`07` "PIIM response band"). Very few designs make *rhetorical scope* the primary resource. **Confidence: high** that this is unusual; **medium** that it will read as a mechanic rather than a menu (see §8).
2. **Two-layer experiment results.** Biological result and evidence quality resolve separately (`04` "B05 result and evidence contract"; `07` "Experiment resolution"). This directly encodes the real epistemic distinction between "the tissue did something" and "I can defend what it did." It also makes failure informative by construction.
3. **Integrity as an asymmetric, partly-hidden ledger.** Integrity starts at 100; omission −10, altered reading −25, unsupported reading −45; recovery capped at 10 total in a run; permanent flags survive numeric recovery (`07` "Evidence, PI confidence, integrity, and trust"). Critically, hidden integrity problems alone block *neither* route (`08` "B05 route-unlock contract") — fabrication can publish and can be rewarded. That is a genuinely uncommon design commitment; most games launder misconduct into either detection or a bad ending.
4. **Detection gated by the player's own visible record.** Haoran and Gabriel "can only notice a mismatch supported by the player's visible evidence trail" (`03`; `05` "Authorship and integrity encounters"; `12` `MR-OPT-HAORAN-MISSING-REPLICATE`, `MR-OPT-GABRIEL-ARCHIVE` entry conditions). No omniscient watchdog. This makes concealment a real skill and paranoia a real emotion.
5. **Institutional Citations as satirical achievements.** Twelve stamps that satirise the institution's own reward language (`08`; `12`): "Citation received: your limits have been classified as product-relevant" (`MR-CIT-10`). The achievement system is diegetically part of the joke and explicitly refuses to require unethical play.
6. **Involuntary crash instead of sleep.** Push-through-once, then a forced crash that costs a period, restores two segments, and resolves any passed monitoring window as missed, but cannot begin during manual equipment interaction or a cutscene (`02`; `07`). It converts fatigue from a resource into an *authored punishment with fair-play carve-outs*.
7. **Fixed calendar under variable competence.** Gates never wait (`03` "Campaign invariants"; `07` "Requests, gates, and soft failure"). "Weak work changes the available paper path; it does not delay the calendar." This produces the specific dread of academic deadlines rather than the usual game grammar of "you may proceed when ready."
8. **The exit's authored appeal.** From Week 8 the exit becomes more inviting "for every player… independent of Morrow eligibility and does not imply a best ending" (`06`, `09`). A level-design element deliberately seduces without endorsing.

### Generic or conventional

- First-person walking, E-to-interact, Tab-for-status, station views, HUD in three corners (`10`). Entirely standard; the documents know this and treat it as plumbing.
- Five 0–100 relationship bars with 10/20 deltas and five named bands (`05`, `07`). This is an ordinary RPG affinity system; the interesting parts are the permanent flags and the trust-gated Gabriel shortcut (`06` "B07 routes, sightlines, and landmarks", requires Gabriel ≥61), not the bars.
- Four-band evidence packet, four-band PI confidence, band-based outcome roll (`07`: 80/20/0, 20/60/20, 0/20/80). Competent, conventional, and — see §8 — possibly the weakest link in the "learnable causality" claim.
- Modular epilogue assembled from career + paper + relationship + integrity + fatigue modules (`08`; `12` ending draft). A well-executed but familiar architecture.
- The two-employer career dilemma (academia vs. industry) is a familiar structure; its distinctiveness comes from the refusal to make either a rescue (`03`: Morrow "is not perfect rescue," Aldercroft is "an invitation, not a job offer").

---

## 5. Quality thesis: **mixed, leaning strong on identity and authorship, fragile on mechanical texture**

**Strong (high confidence):**

- Internal consistency across eleven documents is exceptional. The action-cost table appears identically in `02` ("B10 authored action-cost contract") and `12` (action ID table); character schedules appear identically in `05`, `06`, and `07`; the six functional stations are placed identically in `02`, `04`, and `06`; route-unlock conditions match across `03`, `07`, and `08`. I found no substantive contradiction between documents on the systems that matter (minor discrepancies in §14 are cosmetic).
- The content boundary is closed. `12` states exact counts (6/7/10/20/29/12/30), a ≤6,000-unique-word cap, a fallback cut line, and `MR-TEST-CONT-001` validation criteria. Scope is not aspirational; it is enumerated. That is rare and materially de-risks a three-hour target.
- Authored voice is proven, not promised. The draft dialogue in `12` is genuinely funny in a specific register (dry, bureaucratic, understated). "Reviewer 3: … The reported repair state may be stress with better public relations." This resolves the single largest risk in satire projects — that the comedy exists only as a stated intention.
- The fairness architecture is thorough: seed locked at experiment start, reload cannot reroll, seed only moves within the earned band, browser closure cannot advance time, monitoring windows only pass on deliberate advance after warning, crashes barred during manual actions and cutscenes (`07`; `11` "Commands, effects, and deterministic variation"). This is a design that has thought carefully about not cheating the player.

**Fragile (medium-to-high confidence):**

- **The interactive verb set is thin.** Strip the fiction and the player's actions are: walk to a station, select from ≤3 qualitative options, confirm a cost, walk away, return, choose continue/quality-check/stop, walk to desk, confirm an analysis, attach cards, commit. `02` explicitly disclaims physical simulation ("Focused work uses clear selections rather than physical simulation of laboratory tools") and `10` forbids drag, hold, timed input, and precision motor input for accessibility reasons. The result: **there is almost no motor or spatial skill anywhere in the game**, and the cognitive skill is scheduling plus honesty policy. Whether that is compelling for three hours cannot be settled from documents. **Medium confidence** it is thin enough to matter.
- **Traversal is asked to do heavy lifting it may not be able to do.** The floor is explicitly designed so that "meaningful monitoring, intervention, and equipment work still require the short physical walk to the station" (`06`), with a 75–90 m loop and 5–20 m station spacing. Justification (`02`): stations "far enough apart that a queue, a colleague, or a changed room state can become meaningful." But walking costs **zero periods** (`02`, `07`) and the floor has a "fixed brisk walking speed," no stamina, no traversal challenge (`06`). Therefore the walk costs only real seconds, not game resources. Its entire value depends on authored encounters actually populating those corridors densely enough. `06` limits floor changes to "at most one major and two minor room changes" per act phase, and forbids simulated crowds. **Medium-high confidence** that unrewarded traversal becomes the primary friction complaint. See §8.
- **Learnable causality vs. the band table.** `02` and `07` both promise "Outcomes are not purely random. The player must be able to learn causal patterns." But the concrete resolution is a three-band probability table (`07` "B10 outcome-band and tuning contract"). In "Mixed preparation" (20/60/20) the same inputs yield three different qualitative readings. Across a three-hour campaign with 5–7 template runs plus at most one repeat each (`04`), the player will observe perhaps 8–12 resolutions total. **High confidence** that this is too few samples to learn a probability distribution, and **medium-high confidence** that the actual learnable content is the deterministic *cost* model (periods/energy) and the *rules* (which cards satisfy which PIIM requirement), not experimental causality. The "learn causal patterns" claim is largely aspirational at this sample size.
- **The number of genuinely branching decisions is small.** Counting from `12`: seven mandatory scenes with 2–4 choices, ten optional scenes with 3–4 choices, three claim levels, one three-way integrity fork inside `MR-SCN-A-REASONABLE-RESPONSE`, four Week-14 top-level responses, and a Week-16 final choice. That is roughly 25–30 authored decision points. Combined with the rule that a main scene has at most two variants and an optional scene at most two (`03`, `05`, `12`), **medium-high confidence** that replay reveals a much smaller possibility space than the state-matrix architecture implies.

**Unclear:**

- Whether the manuscript board is a *system* or a *form*. `07` "Manuscript system" describes card types (figure, evidence, claim, control, authorship, request, supplementary), connection to figures and claims, a requirements panel, and committed snapshots. But no document specifies a *constraint structure* — e.g., how many cards a figure holds, whether card combinations conflict, whether there is a puzzle at all. `12` supplies only claim strings and three requirements strings. **Low confidence** in any judgement of the manuscript board's quality; this is the largest specification gap in the packet relative to its narrative importance (it is the site of Weeks 5–8 and 14).

---

## 6. Fun hypothesis by time scale

### 6.1 Moment-to-moment (seconds)

| Activity | Predicted pleasure | Confidence | Basis |
|---|---|---|---|
| Movement | Low-neutral. Brisk fixed speed, no stamina/jump/sprint, 5–20 m distances, no traversal challenge (`06`). Pleasure is atmospheric, not kinaesthetic. | High |
| Inspection of environmental text | **High, and probably the best micro-pleasure in the game.** 30 items, one-time full text, room- and act-windowed (`06`, `12`). The drafted lines are genuinely good jokes. | High that quality is there; medium that players find them, since there are no markers and Interaction Assist is opt-in (`10`). |
| Experiment setup | Low-moderate. Three choices max plus one family-specific qualitative choice (`04` "B04 interaction contract"). Cost preview is shown. This is a confirm-dialogue. | Medium-high |
| Monitoring | Moderate. Three options (continue / quality-check-or-stabilize / stop) with a plain-language forecast (`07`). The decision has real stakes but low informational richness. | Medium |
| Analysis | Moderate-high *initially*. Reading three views (structure / rhythm / repatterning index) with strong/unclear/mixed/failed states, then classifying and recording caveats (`02`, `04`). The pleasure is interpretive. Decays once players learn the mapping. | Medium |
| Manuscript work | Unknown. See §5. | Low |
| Conversations | **High.** Text-led, manual advance, untimed, 2–4 stance options, internal thought before important choices, non-lexical vocal palettes (`05`, `09`, `12`). The drafted lines carry it. | High |

The single most reliable moment-to-moment pleasure in this design is **reading**. Environmental notices, journal rejections, reviewer reports, and Elena's dialogue. `12`'s draft is the evidence. The least reliable is **manipulating** anything.

### 6.2 Short loop (one to two work periods)

This is where the design is at its most convincing on paper. A representative Week 3 slice, derived from `02` and `12`:

Start an intense batch-check (2 periods, 2 energy) → while it runs, walk to shared desks, analyse a completed range record (1 period, 1 energy) → the desk queue flips a group to "attention needed" → walk to imaging, spend a quality-check monitor (1 period, 1 energy) → energy now low, night period adds +1 surcharge (`02`) → Samira is at the imaging room in the late period (`06`) and `MR-OPT-SAMIRA-SHARED-INSTRUMENT` is available until W5 → taking it costs 1 period, 0 energy, and moves Samira ±10 → but the Week-5 gate is fixed and the repair-state experiment window closes W6.

That is a real decision structure: **three active slots, an unbending calendar, an energy budget with a night surcharge, and expiring optional content.** The asynchronous experiment design (`02` "Confirmed outcome principles": "waiting creates competing decisions rather than dead time") is genuinely well-constructed, because monitoring points force returns and the queue cannot operate equipment remotely.

**Confidence: medium-high** that the short loop is satisfying in Weeks 1–5 and again in Weeks 10–13. **Medium confidence** that Weeks 6–9 have a short-loop deficit: `03`'s beat sheet shows those weeks are manuscript revision, preprint posting, and three journal rejections, and the experiment windows for laser/sham (W1–4), range (W2–4), batch (W3–6), and repair-state (W4–6) have all closed or are closing (`12`). Oxygen-loss does not open until W10. So Weeks 8–9 may contain **no available experiment at all** — only manuscript commits, message reading, `MR-TASK-RESEARCH-PLAN` (W8–11), and `MR-OPT-CAMILA-INITIAL`. That is a structurally identifiable soft spot.

### 6.3 Campaign (64 periods, ~3 hours)

The budgeting is stated concretely: 48–52 productive periods for a defensible route, 52–56 for a normal run, 58–62 for a high-evidence path, out of 64 total (`07` "Time, pacing, and pressure profiles"). Protected breaks cost 1 period each, and Standard starts at 4 energy segments.

Let me test that arithmetic against `12`'s costs for a thorough run:

- Five required experiments, each needing configure (1) + start (1 or 2) + at least one monitor (1) + analyse (1) = ~4–5 periods each → **20–25 periods**.
- One repeat of laser/sham as intense (2) + configure (1) + monitor (1) + analyse (1) = **5**.
- Manuscript: initial draft 3, plus PI revision commits — `MR-SCN-WHAT-WE-HAD` requires one commit after the scene, plus the Week-6 removal-and-restoration beat, plus the preprint commit = **~6–7**.
- PIIM response commit **3**.
- Research plan **1**; Morrow reply **1**; Morrow video call **1**.
- Report-to-Elena actions across five requests **~5**.
- Five middle mandatory scenes advance one period each = **5**.
- Optional local scenes: up to seven at 1 period each = **up to 7**.
- Protected breaks: a Standard run at 1 energy per focused action, 4 starting segments, first-break-restores-2, later-breaks-restore-1 — this needs **many** breaks. Rough estimate: if ~35 actions cost 1 energy and ~8 cost 2, that is ~51 energy consumed; starting 4 plus 16 first-of-week breaks (2 each = 32) plus later breaks (1 each) implies **~15–20 break periods** to avoid all crashes.

Sum: ~20–25 + 5 + 7 + 3 + 3 + 5 + 5 + 7 + 15–20 ≈ **70–80 periods against 64 available.**

This arithmetic is rough and I may be over-counting monitors and Elena reports, but the direction is clear and matches the documents' own claim: `07` says "No viable route requires a crash" while simultaneously saying a player "risks a crash by trying to maximize evidence, PI confidence, relationships, and both career routes in one run." **High confidence** that the campaign is *designed* to be non-completable in one run, and **medium-high confidence** that the specific tension — "which of these five good things do I abandon?" — is the campaign's strongest engagement engine. That is exactly the emotional content the satire wants.

**Confidence: medium** on whether the pressure lands correctly at three hours. Three hours is short for a resource-attrition campaign whose payoff is accumulated regret. 64 periods across ~180 minutes is roughly **2.8 minutes per period**, which is very fast for a "survival" pacing curve. There may not be enough real time for the semester's escalation to be *felt* rather than *read*.

### 6.4 Narrative anticipation, humour, pressure, ethical tension, payoff

- **Anticipation: strong.** The beat sheet (`03`) is a well-shaped escalation, and the four-journal ladder with fixed responses (Cosmos "of specialist interest" → Knowledge "direct proof" → DSL "mechanism incomplete" → PIIM major revisions) is a legible, dread-building rhythm. **High confidence.**
- **Humour: strong and verified.** See §4. The best jokes are institutional-language jokes, and `12` delivers them. **High confidence.**
- **Pressure: structurally present but temporally compressed.** The unbending gate (`03`, `07`) is the right mechanism. Three hours may be too short a real-time canvas. **Medium confidence.**
- **Ethical tension: the standout.** The design's most interesting property is that misconduct is (a) available as three clearly-labelled acts with clearly-labelled costs (`12`: `scene.response.stronger.omit` / `.alter` / `.fabricate`, I−10/−25/−45), (b) undetectable unless your own visible record betrays you, (c) not automatically punished (`08`: "undetected fabricated work can publish"), and (d) never scored morally (`07`, `10`, `08`: no moral score, no moral label, no moral ranking of endings). Combined with the fact that "a limited control does not reduce research integrity when it is reported honestly" (`04`) — i.e., *weak work honestly reported is clean* — this is a precise and unusual ethical model. **High confidence** that it will produce genuine discomfort for players who take it seriously.
- **Emotional payoff: adequate but structurally modest.** The epilogue is 60–90 seconds, assembled from five modules (`08`, `12`). The drafted lines are good ("The contract ended on time. The person who held it did not." — `ending.career.none`). But 60–90 seconds is very short after a three-hour attrition campaign, and the relationship afterbeat selects exactly *one* character (`05` "B06 relationship afterbeats"; `08`), meaning four of five relationships resolve only as a bar and a status line in the summary. **Medium-high confidence** that players who invested in Haoran or Samira will feel that arc under-landed.

### 6.5 Discovery, mastery, expressive choice, consequence, replay

- **Discovery:** primarily textual and institutional, not systemic. You discover jokes, notices, reviewer contradictions, and character detail (the hidden grant calendar, Samira's sketchbook — `05`, `12` `env.personal.*`). You do not discover much about the world's mechanisms because the mechanisms are explained up front by Research Status (`07`) and cost previews (`02`). **Medium-high confidence** this is deliberate and consistent with the satire, and also that it caps replay curiosity.
- **Mastery:** the masterable object is the *route-eligibility rulebook*, not the science. Aldercroft needs: research plan before W12 + two of three (Coherent/Substantial evidence, Supportive/Invested PI, Elena ≥41) + no visible concern. Morrow needs: reply + video call + live preprint + ≥Developing + Camila ≥41 + no confession (`07`, `08`). A second-run player will optimise against these checklists. **High confidence.**
- **Expressive choice: high.** Stances rather than moral labels (`05` "Dialogue principles": "cooperative or strategic, direct or resistant, ambitious or expedient, and supportive or solidary"). The claim-level triad, the Week-14 fork, and the ten optional scenes give a real personality-expression surface.
- **Consequence: strong and legible.** Every material change states a reason (`07` "B08 feedback and access contract"). Permanent flags override later trust recovery (`05`, `07`). Commits cannot be undone; snapshots are not free undo (`07` "Integrity and irreversible loss"). No chapter rewind (`08`). **High confidence** that consequence is well engineered.
- **Replay: limited and, I think, knowingly so.** Three hours plus an Archive of 12 ending cards plus 12 citations invites 2–4 playthroughs. But: the calendar is fixed, all seven mandatory scenes occur in every run, main scenes have ≤2 variants, optional scenes ≤2 variants, the preprint posts in every run, and the journal ladder never changes (`03`, `12`). Run 2 differs mainly in: claim levels, honesty policy, which optional scenes you take, and which of four endings you reach. **Medium-high confidence** that run 3 feels like re-reading rather than replaying. The Archive keeping 12 cards (`08`, `10`) implies an expectation of more replay than the content variance supports.

---

## 7. Likely player behaviours and sources of engagement

Predictions, with confidence:

1. **Spreadsheet play by Week 6.** Because costs are always previewed (`02`, `10`) and route conditions are stated non-spoilingly in Research Status (`07`), attentive players will convert the game into a scheduling problem and will open Research Status frequently. **High confidence.**
2. **Under-use of protected breaks in run 1, over-use in run 2.** The break economics (first-in-week restores 2, later restore 1; `02`, `07`) are unintuitive and reward front-loading breaks each week. Most first-run players will discover this after a crash. **Medium-high confidence.**
3. **Deliberate honest-but-weak play as a viable strategy, discovered late.** `04`'s rule that honestly-reported limited controls cost no integrity, plus `07`'s "Mandatory progress cannot require a perfect result," means "run fewer experiments, claim carefully, keep relationships" is a coherent build. **Medium confidence** that players find it in run 1; **high** that it becomes a favoured run-2 identity.
4. **Fabrication as a run-2 experiment, done coldly.** The one-time-content rules and the "no moral score" stance make a fabrication run feel like a system test rather than a transgression. **Medium-high confidence.** This slightly undercuts the ethical weight the design earned in run 1 — a cost of its own honesty about mechanics.
5. **Optional scenes taken for trust numbers, not for character.** Once the player knows Camila ≥41 gates Morrow and Elena ≥41 gates Aldercroft (`07`, `08`), optional scenes become route maintenance. `MR-OPT-CAMILA-*` are strictly required. Local scenes at 1 period / 0 energy are cheap, so most will be taken. **Medium-high confidence.**
6. **Environmental text read heavily in Weeks 1–4, skipped from Week 8.** They cost no time (`02`: "Walking, reading, and ordinary dialogue use no period"), which is good, but attention is the scarce resource under pressure. **Medium confidence.**
7. **Gabriel's pass-through as a genuine "aha."** The trust-≥61 service shortcut linking shared desks and imaging (`06`) is the only spatial reward in the game and rewards a non-obvious social investment. **Medium confidence** it registers strongly; it is the kind of detail players tell each other about.
8. **Skipping cutscenes on run 2+.** Explicitly supported with inbox recaps (`03`, `10`). Since the seven mandatory scenes are the largest chunk of authored time (14–18 min) and vary ≤2 ways, run 2 will be substantially shorter. **High confidence.**

Primary engagement sources, ranked by my estimate of strength:

1. Text: humour, institutional voice, reviewer contradictions.
2. The triage problem: five competing goods, 64 periods.
3. The honesty problem: undetectable misconduct with real rewards.
4. Character trust and its permanent-flag irreversibility.
5. Spatial atmosphere and the act-state decay of the floor.
6. Experiment interpretation.
7. Traversal and interaction feel — near zero.

---

## 8. Likely friction, repetition, and boredom

Named risks, each grounded in a concrete decision.

**F1 — The walk tax.** `06` mandates that all meaningful equipment work requires physical presence, with a 75–90 m loop. `02` sets the shortest work loop as PI office → shared desks → main laboratory → tissue culture → PI office. A thorough run involves, by my §6.3 estimate, 60+ time-costing actions, each preceded by traversal. At 5–20 m and brisk walking speed, each leg is perhaps 5–15 seconds; the aggregate is plausibly 15–25 minutes of a 180-minute game spent walking corridors that change "at most one major and two minor" times per act phase (`06`). **Medium-high confidence this becomes the most-cited friction.** Mitigating facts: walking costs no periods; the floor is small; the desk queue lets you plan before walking. Aggravating facts: no simulated crowd, authored anchors only, no random encounters, no run button.

**F2 — Confirm-dialogue fatigue.** The five-stage loop repeats for 5–7 templates plus repeats. Each stage is a selection plus a cost confirmation. `10` adds required confirmations for irreversible actions, and `MR-UI-ACTION-WARNING` / `MR-UI-IRREVERSIBLE` are separate confirmation strings. The interaction texture is dialog-heavy by design. **Medium-high confidence** of felt administrative friction — which is, uncomfortably, thematically appropriate and mechanically tiresome at once. This is the design's sharpest internal tension: it satirises administrative burden using administrative interaction.

**F3 — The Weeks 8–9 experiment vacuum.** See §6.2. No experiment template is open in Week 8 or the first half of Week 9 per `12`'s windows. Content available: preprint commit, three rejection records, Morrow contact, research plan. **Medium-high confidence** this is a pacing dip, partially offset by narrative density (three rejections plus `MR-SCN-PUBLIC-RECORD`).

**F4 — Analysis-view decay.** Structure / rhythm / repatterning-index views resolve to strong / unclear / mixed / failed (`04`). Once a player maps "strong index + strong rhythm = usable," the analysis station becomes a two-second read. With ~8–12 total analyses, mastery arrives around analysis 4. **Medium confidence.**

**F5 — Band-roll frustration.** With Mixed preparation at 20/60/20 (`07`) and no reroll on reload, a player who prepared well can still get a limited result and will have no way to distinguish bad luck from bad play — despite the promise that outcomes are learnable. `07` mitigates with "After resolution, it separates observation from interpretation. It identifies an action-caused effect only where the game has enough evidence." That is a well-considered mitigation but does not solve the small-sample problem. **Medium-high confidence** of some player perception of arbitrariness.

**F6 — Manuscript board as busywork.** Unspecified constraint structure (§5). If card attachment has no real constraint, Weeks 5–8 reduce to clicking claim levels and pressing commit. **Low confidence** in the prediction, **high confidence** that the risk is real and unresolved by this packet.

**F7 — Crash may be under-experienced or over-punishing.** The crash carve-outs (`02`: cannot begin during manual equipment action or cutscene; resolves passed windows as missed) are generous, and Supported profile largely removes crash pressure. Meanwhile Standard's energy arithmetic (§6.3) suggests crashes may be near-inevitable in a maximising run. **Low-medium confidence** either way; this is exactly a tuning question.

**F8 — Zero dead time by design, but also zero idleness.** `02` promises no dead time. The corollary is that there is never a moment when nothing is pending. For a game about burnout that may be correct; for a three-hour session it may be exhausting without the relief that a longer game's downtime provides. **Low-medium confidence.**

---

## 9. Narrative direction and emotional arc

**Clear from the concrete design alone: yes, unambiguously.** This is the packet's strongest claim to competence. `03`'s beat sheet, `12`'s scene scripts, and `08`'s ending matrix together specify not just what happens but in what tone.

The arc is: **euphoria → clarification → inflation → exposure → negotiation → attrition → departure.**

- **Weeks 1–5 (Supplementary data):** the premise is a trap disguised as good news. Elena's opening — "It recovered. Good. Do not celebrate yet. We need to make the result unarguable" (`scene.clarified.elena.opening`) — is a precise piece of characterisation: the reframing is instant, plausible, and never malicious. `MR-SCN-A-COMPLETE-NARRATIVE` at Week 5 opens manuscript work "regardless of packet quality" (`03`), which is the design's thesis expressed as a gate.
- **Weeks 6–7 (Manuscript hell):** the best joke in the campaign structure. Elena removes cautious wording in Week 6 and asks for it back in Week 7, and `MR-SCN-WHAT-WE-HAD` lands the line "Yes. But now it has been revised by history" (`scene.whatWeHad.elena.answer`). The paper returns to nearly its original form after two periods of labour. This is the *Sisyphus* beat, and it is well placed.
- **Weeks 8–9 (Submission):** the preprint posts in every run, and the three rejections are fixed. Notably, Camila's approach is triggered by rejection (`03`, `12` `MR-OPT-CAMILA-INITIAL` prerequisite: Knowledge rejection) — the industry route opens *because* academia rejects you. That causal ordering is deliberate and elegant.
- **Weeks 10–14 (Competing futures):** the three-reviewer structure is a genuine design achievement. Reviewer 1 wants batch evidence; Reviewer 2 wants oxygen-loss *and* careful claims; Reviewer 3 says the whole injury model is artificial and the repair state is stress (`03`, `12` `record.reviewer1–3`). Reviewers 2 and 3 are in mutual tension, and Editor Haddad "calls all reports helpful and asks the player to address all concerns, even where the reports conflict" (`03`). The impossibility is structural, not authorial nagging. `MR-SCN-A-REASONABLE-RESPONSE` at Week 14 then forces a four-way choice with a nested three-way integrity fork.
- **Weeks 15–16 (Decision):** results arrive, and the final scene withholds moral resolution. `scene.0642.choice.academia` — "Attend the Aldercroft interview. You do not owe it optimism" — and `.morrow` — "Accept Morrow's offer. You do not owe it gratitude" — are, in eleven words each, the game's whole ethical stance. **High confidence** that this is the packet's best writing and its clearest statement of intent.

**Emotional risks:**

- The protagonist is deliberately light (`05`: "lightly authored… They have a defined predicament and a distinctive internal narrative voice"), with player-chosen name and pronouns and no spoken performance. The internal voice must carry all interiority. The drafted internal lines are strong, but there are few of them per scene (typically 1–2). **Medium confidence** that interiority is thinner than the arc requires.
- The design forbids the protagonist ever *escaping* the floor before Week 16 (`03` "Campaign invariants"). This is thematically excellent and emotionally airless. There is no contrast against which the claustrophobia registers — no home, no outside, no relief. The break room and the exit's growing appeal are the only counterweights. **Medium confidence** this reads as intentional oppression rather than missing content, and the design is explicitly aware of the risk (`06`: "Inaccessible spaces must feel intentional rather than like missing content").
- Camila never appears physically (`05`, `09`), yet she is one of two career routes and one of five trust bars. Her entire arc is three email/video contacts (`12`). **Medium-high confidence** that the Morrow route feels thinner than the Aldercroft route despite being mechanically parallel.

---

## 10. Artistic and audio direction

**Clear from the concrete design alone: yes, with unusual specificity.**

**Visual.** "Stylized institutional realism" (`09`) is defined positively (low-to-mid-poly, soft bevels, matte painted metal, off-white plastic, frosted glass, paper, light wear) and negatively (no cyberpunk, no retro-futurism, no photorealism, no distorted architecture, no giant props, no cartoon slapstick, no body horror, no glitch horror). The nine-role palette is specified with functions, and every colour meaning is duplicated in text/icon/object-state/sound. The design's cleverest presentation decision is that **the only visibly advanced thing in the world is the organoid and its data displays** — everything else is a slightly dated university. That single contrast carries the satire visually: the science is the future; the institution is a 1997 corridor with new notices over old notices.

Lighting is authored as 20 presets (5 act states × 4 work periods; `06`, `09`) rather than simulated. This is both a production economy and a stylistic choice, and it means the passage of time will read as discrete tonal shifts. **Medium-high confidence** that this is legible; **medium confidence** that a discrete 20-preset system can convey a *continuous* 16-week decay convincingly, especially with only 5 act-state steps.

**Confidence: high** that the visual identity is coherent and deliverable within the stated asset limits (one modular kit for eight spaces, ≤24 core prop families / 20 named families, four NPCs, one protagonist silhouette, 1K textures with rare 2K, ≤75 MB compressed).

**Audio.** The most distinctive presentation decision in the packet is the **non-lexical vocal palette**: five characters × eight short original sounds, with named roles ("queue-warning sigh" for Gabriel, "call-end tone" for Camila — `12` audio-content roles). The sounds "never form real words, carry required information, imitate a real person, or imitate another game" (`09`). The protagonist has no voice at all, to preserve projection after name/pronoun selection.

This is a well-reasoned economy and a genuine aesthetic. **Medium confidence** on execution risk: eight sounds per character across ~17 scenes plus messages is a small palette, and non-lexical vocalisation is one of the easiest things to make grating (the well-known failure mode of repeated character grunts). `09`'s constraints ("controlled pitch and rhythm variation") acknowledge but do not solve this. This is a prototype question.

Music: six modular stems (`09`, `12` `MR-MUS-01–06`), "dry electronic pulse, soft laboratory tone, and occasional over-formal institutional melody," becoming "colder and thinner," with routine play carrying no constant score. The stem roles map cleanly onto the act structure (`MR-MUS-04` "Public record: bright institutional swell" is a nicely satirical brief). **Medium-high confidence** that six stems is sufficient for three hours given the no-constant-score policy, and that the absence of score in routine play will make the room ambiences the dominant sonic experience — which is consistent with the eight named ambience roles.

**Interface art.** IBM Plex Sans/Mono, sentence case, all-caps reserved for "rare formal warnings or institutional stamps," no decorative display font, live text and SVG rather than baked image text (`09`, `11`). The identity is "layout, colour, paper, and wording." **High confidence** this is coherent and, notably, that it makes the Institutional Citation stamps land visually — all-caps is reserved precisely for the institution's own voice.

---

## 11. Coherence between mechanics, narrative, and presentation

This is the packet's strongest dimension. The alignments are not accidental.

**Alignments that genuinely work (high confidence):**

| Theme | Mechanical expression |
|---|---|
| "You cannot leave" | No home scene, no sleep, one floor, 64 periods, exit gives "one dry internal response" before W16 (`02`, `06`) |
| "The goalposts move" | Elena's "minor revisions" in W1, W7, and after PIIM's major-revision decision (`03`); W6 remove-then-restore beat |
| "Deadlines don't care" | Gates never wait; weak work changes the paper path, not the calendar (`03`, `07`) |
| "The institution rewards the wrong things" | 12 Institutional Citations in institutional voice; no moral score; `MR-CIT-10` "your limits have been classified as product-relevant" |
| "Misconduct is a decision, not a slip" | No falsification method; three explicit labelled choices with clear costs; requires confirmation (`07`, `12`) |
| "Nobody is watching, and that's worse" | Detection gated on the player's own visible record; no omniscient NPC (`03`, `05`) |
| "Precarity is structural, not personal" | Elena has her own grant panel (`MR-OPT-ELENA-FUTURE`); Samira needs the same slot; Gabriel has three urgent requests and one slot; Haoran's list reproduces |
| "Success is not rescue" | Aldercroft is an interview, not a job; **Pending Appointment** is "a temporary bridge appointment and another committee delay" (`03`, `08`) |
| "Precision is not truth" | Claim levels are wording, not evidence; the repatterning index is association, never cause, enforced across every string (`04`, `12` explicit rule) |

**Coherence tensions (my interpretation, medium confidence):**

- **T1 — Satire vs. system legibility.** The design insists on transparency: costs previewed, reasons stated, route feedback given, no hidden formulas. But part of the lived experience being satirised is *not knowing whether the work is enough*. By making the rules visible, the design converts anxiety into planning. This is defensible (it is fair, accessible, and non-punitive) and it slightly declaws the theme. `07`'s route feedback — "Aldercroft needs a stronger research case" — is exactly the clarity that real academic precarity never provides.
- **T2 — Administrative satire delivered administratively.** See F2. Confirming costs, reading queues, and committing revisions *is* the satire and *is* the friction.
- **T3 — Accessibility floor vs. mechanical texture.** `10`'s prohibition on drag, hold, timed, and precision input is correct as an accessibility commitment and simultaneously removes the entire category of tactile pleasure from a game about physical laboratory work. The documents accept this trade explicitly (`02`: "medium abstraction… the meaningful challenge is choosing what to do").
- **T4 — Supported profile and thematic content.** Supported keeps all content and routes but adds an energy segment, removes the night surcharge, restores 3 per break, and adds warnings (`02`, `07`). The design insists there is no content penalty and no stigma. But if the theme *is* attrition, Supported may substantially change what the game *means*, not just how hard it is. `07`'s "Both profiles have the same calendar, narrative, routes, and endings" is a systems statement, not a thematic one. **Medium confidence** that Supported plays as a noticeably different work of art.
- **T5 — 12 ending cards vs. ~4 endings.** The Archive retains 12 ending cards (`08`, `10`) but there are four career labels and a modular epilogue with limited variance. The storage architecture implies more variety than the content specification provides.

**Verdict on the central question:** this is a **coherent game**, not merely a coherent collection of documents. The evidence is that mechanisms in one document have concrete, matching consequences in three others — e.g. Gabriel's trust value appears as a level-design shortcut (`06`), a scene availability condition (`12`), a support action rule (`05`, `07`), and an epilogue afterbeat (`08`, `12`). That kind of cross-document load-bearing is the signature of a designed game rather than a documented one. **High confidence.**

---

## 12. Likely audience and likely exclusions

**Likely to engage strongly:**

- Current and former academics, especially postdocs, PhD students, and anyone who has been told "just a few more experiments." **High confidence** this is the core audience; the satire's specificity (Form 18B, "version final-real," "urgency is assessed in the order it was correctly documented") is aimed with precision at people who have lived it.
- Players of narrative-systems games where reading is the primary verb and the systems exist to constrain reading choices.
- Players interested in ethics-under-pressure designs where misconduct is available, undetected, and unscored.
- Players who appreciate refusal-driven design: no markers, no score, no undo, no rescue.

**Likely to bounce:**

- Anyone expecting first-person *action* affordances. The game is first-person and has almost nothing first-person games have. **High confidence.**
- Players who need mechanical mastery curves. The masterable content is a checklist, not a skill.
- Players who require moral resolution. `08` explicitly refuses moral ranking of endings; `07` refuses a moral score; fabrication can publish. Some players read this as nihilism rather than as honesty. **Medium-high confidence** this generates the sharpest negative reactions.
- Non-academic players who may find the humour opaque. The jokes depend on recognising institutional euphemism. `12`'s best lines are legible to anyone in a bureaucracy, but the *density* of academic-specific reference is high. **Medium confidence.**
- Players who need traversal to be rewarding.
- English-only, desktop-only, keyboard/controller-only (`10`). Explicit, stated exclusions; `10` is admirably direct that "the game uses English only… This is a scope decision, not a claim that English is accessible to every player."

**A structural audience note:** the design's target audience is largely the population most likely to find the subject matter distressing rather than cathartic. `10` includes a content note ("academic pressure, burnout, insecure work, and ethical pressure around research records"), which is appropriate. But an exhausted postdoc playing a three-hour game about exhausted postdocs, where the best outcome is "a temporary bridge appointment and another committee delay," may experience the game as accurate and unpleasant rather than accurate and satisfying. **Medium confidence.** The design's compensating asset is humour — the jokes are the mechanism by which recognition becomes bearable, and `12` supplies enough of them that I think this mostly works.

---

## 13. Claims that require a playable prototype

These cannot be resolved from documents. `12`'s vertical slice (Week 1: `MR-SCN-CLARIFIED`, laser/sham full loop, `MR-OPT-GABRIEL-QUEUE`, compact manuscript claim choice, `MR-TUT-001`–`008`, save/close/resume) tests items 1–6, 9, 11, 12, 15. Items 7, 8, 10, 13, 14, 16, 17 need more than Week 1.

| # | Claim | Why documents cannot settle it | Slice-testable? |
|---|---|---|---|
| 1 | The 5–20 m walk between stations is meaningful rather than a tax | Depends on felt duration and encounter density (`02`, `06`) | Yes |
| 2 | The five-stage loop is satisfying rather than a chain of confirmations (`02`) | Interaction feel | Yes |
| 3 | Three evidence views produce interpretive pleasure, not a lookup table (`04`) | Depends on visual craft of fictional tissue images and traces | Yes |
| 4 | Cost preview + confirmation is clarifying, not friction (`10`) | UI feel | Yes |
| 5 | Non-lexical vocal palettes charm rather than irritate (`09`, `12`) | Audio execution; 8 sounds is a small pool | Yes |
| 6 | Stylized institutional realism reads as intentional, not as low-budget (`09`) | Art execution | Yes |
| 7 | The 64-period budget produces triage tension without unfair lockouts (`07`) | See §6.3 arithmetic | No — needs full campaign |
| 8 | Weeks 8–9 do not sag (§6.2) | Needs mid-campaign play | No |
| 9 | The manuscript board is a system, not a form (`07`) | **Underspecified in this packet** | Partly |
| 10 | Three-band variation feels causal at ~10 samples (`07`) | Sample-size problem | No |
| 11 | Environmental text is discovered without markers (`06`, `10`) | Depends on lighting, framing, Interaction Assist default | Yes |
| 12 | Interaction Assist highlights adequately without becoming a marker system (`10`) | UI feel | Yes |
| 13 | Crash frequency in Standard is dramatic, not punitive (`02`, `07`) | Tuning | No |
| 14 | Supported preserves thematic meaning, not just content (`07`, T4) | Needs both profiles played fully | No |
| 15 | Three views + labels are readable at 150% scale, 1280×720 (`10`) | Layout measurement | Yes |
| 16 | 60–90 s epilogue lands after three hours (`08`) | Needs full run | No |
| 17 | Run 2 is a replay, not a reread (§6.5) | Needs two runs | No |
| 18 | ~14:45 of mandatory scenes + 3 h of play holds the arc's escalation (`12`) | Pacing | No |

---

## 14. Contradictions, ambiguities, and missing information

### Contradictions and inconsistencies (all minor; none systemic)

1. **Prop-family count.** `09` "Bounded visual asset inventory" states "No more than 24 core reusable 3D prop families." `09` "B10 asset planning and sourcing gate" and `06` "B10 environmental content boundary" both specify "twenty reusable prop families" and enumerate exactly 20. Reconcilable as a limit (24) vs. a plan (20), but the two numbers sit in the same file without cross-reference. **High confidence** this is cosmetic.
2. **Main-scene duration.** `02` and `03` state a 14–18-minute target for the seven main scenes. `12`'s per-scene table sums to 14:45 and states "The planned main-scene time is 14 minutes 45 seconds." `03` also says the epilogue is 60–90 s while `12` says "A 75-second epilogue." The plan sits at the bottom of the range; not a contradiction, but the 14–18 band is now effectively fictional.
3. **Experiment templates vs. the drug experiment's requirement link.** `12`'s experiment table assigns `MR-EXP-DRUG-EXPOSURE` to `MR-REQ-EXP-001`, the same requirement as the required laser/sham and oxygen-loss templates, despite drug exposure being optional and cut in fallback. Without `15-implementation-contract.md` I cannot verify whether `MR-REQ-EXP-001` is scoped to permit this. **Low confidence** that it is an error; flagged as a verification item.
4. **Repair-state requirement in the fallback.** `MR-EXP-REPAIR-STATE` links to `MR-REQ-EXP-003`, and the fallback removes that template in favour of `MR-FB-EXP-RANGE-REPAIR` (`12`). If `MR-REQ-EXP-003` is a hard requirement, the fallback appears to violate it. Unresolvable without the requirements document. **Flagged.**
5. **`MR-TUT-009` exclusion from the slice.** `12`'s vertical slice lists `MR-TUT-001` through `MR-TUT-008`, but the slice includes `MR-OPT-GABRIEL-QUEUE`, and `MR-TUT-009` is the optional-scene prompt ("A colleague has time for a short conversation"). Minor omission.
6. **Break-room protected break vs. `MR-EXP` windows.** Not a contradiction, but `12` provides no `MR-ACT-` ID for the protected break, despite `02` and `07` giving it a cost (1 period) and effect (restore 2 or 1). Every other time-costing action has an action ID. **Medium confidence** this is a genuine catalogue gap, given `02`'s rule that "No later agent may add a new time-costing action class without a requirement change."
7. **Week 6 revision beat has no scene or work-item ID.** `03`'s beat sheet requires "Elena removes cautious wording, then asks for it back" in Week 6, and `MR-SCN-WHAT-WE-HAD` in Week 7 depends on that having happened. But `12` lists no `MR-SCN-`, `MR-TASK-`, or `MR-REC-` object for the Week-6 beat, and `MR-TASK-MANUSCRIPT` spans W5–W7 generically. **Medium confidence** that the Week-6 contradictory-request beat — arguably the campaign's signature joke — is currently unauthored.

### Ambiguities and underspecification

- **The manuscript board's constraint structure.** The largest gap. `07` names seven card types and a requirements panel; `12` supplies three claim strings and three requirements strings. No specification of how many cards attach where, what conflicts, or what the player is actually solving. Weeks 5–8 and 14 depend on it.
- **How PIIM response cards are computed.** `07` and `08` state three cards (batch evidence, oxygen-loss, claim scope), each met/partly met/not met, mapping to four bands. But no rule states what makes the batch card "met" — a strong `MR-REC-BATCH-CHECK`, a limited one, or an honest statement of its limits? `MR-CIT-03`'s trigger ("meet all three PIIM response cards, **or** state all three limits clearly in a defensible response") hints that honest limitation can substitute, but the systems documents do not say so.
- **Evidence-point arithmetic vs. band thresholds.** Evidence starts at 3, max 12; usable result = 2, partial/first repeat = 1, inconclusive = 0, diminishing returns unspecified. With five required templates plus one drug plus four permitted repeats, the theoretical maximum from experiments alone is roughly 3 + (6×2) + (4×1) = 19, capped at 12, plus `EV+1` from Samira. So Substantial (9–12) is reachable, but I cannot determine how *easily*, or whether "diminishing returns" means the second repeat gives 0. This matters directly for Aldercroft eligibility. **Medium confidence** that the tuning is underspecified rather than wrong.
- **What "visible evidence concern" means operationally.** Both route gates depend on it (`07`, `08`: "no serious evidence concern visible to Aldercroft or Elena"; "a visible conflict can also close the offer"). The flag set in `12` includes `FLAG:haoranConcern`, `FLAG:gabrielConcern`, `FLAG:morrowConcern`, `FLAG:omission`, `FLAG:alteredReading`, `FLAG:fabrication`, but no document maps which flags constitute "visible to Aldercroft or Elena." This is the hinge of the whole ethical system and is currently unspecified.
- **Number of monitoring points per experiment.** `02` and `07` describe "a meaningful monitoring point" (singular) and "meaningful points" (plural). The action-cost table charges per monitor. Total campaign period consumption depends heavily on whether it is 1 or 3 monitors per run.
- **Equipment fault frequency.** `02`, `04`, and `07` all state equipment queues and faults are "authored situations," not random. But no document enumerates them. `MR-OPT-GABRIEL-QUEUE` is the only concrete instance in `12`. If authored faults are rare, the "negotiate / ask Gabriel / use a limited alternative / change plan" decision space described in three documents may barely exist in play.
- **Repeat mechanics and evidence.** `04` permits one repeat each for laser/sham, range, batch, repair-state; `12` says a repeat "creates a linked repeat note… and does not add a new primary-record ID." Whether a repeat can *upgrade* a weak result into a usable one, and what that costs, is not stated.
- **Samira's evidence and `EV+1`.** `MR-OPT-SAMIRA-NOT-IN-MY-FIGURE` gives `EV+1` and `FLAG:samiraCoauthor` on choices A and B. It is the only non-experiment evidence source in the catalogue. Whether declining (choice C) forecloses later use, and how "Samira must receive co-authorship if the player uses her useful evidence" (`03`, `05`) is enforced, is unclear.

### Absent from this packet (not defects; noted for completeness)

- `01-*` (vision/index), `13-testing-and-evaluation.md`, `14-*`, `15-implementation-contract.md`, `assets/ASSET_MANIFEST.md`.
- All `MR-REQ-*` definitions, all `MR-TEST-*` definitions.
- Any playtest data, prototype footage, or measured performance. The documents are consistently and commendably explicit that these are "deliberate later facts."
- Any statement of intended audience, commercial context, or team size.
- Any specification of the interaction *design* of a station view (layout, number of screens, back-out behaviour beyond "no cost").

---

## 15. Evidence table

| Finding | Type | File / object | Confidence |
|---|---|---|---|
| One continuous floor, ~400 m², 75–90 m loop, 5–20 m station spacing, no room loading | Explicit fact | `06` "B07 scaled floor plan"; `11` "World, rendering…" | High |
| 64 work periods, campaign opens and closes at 06:42, no home/sleep/reset | Explicit fact | `02` "Campaign time and continuity"; `03` "Campaign invariants" | High |
| Complete action-cost table with periods and Standard energy for 12 action IDs | Explicit fact | `02` "B10 authored action-cost contract"; `12` action table | High |
| Two-layer results: biological result + evidence quality, resolved separately | Explicit fact | `04` "B05 result and evidence contract"; `07` "Experiment resolution" | High |
| Integrity: omission −10, altered reading −25, unsupported reading −45; recovery capped at 10/run; permanent flags | Explicit fact | `07`; `12` `scene.response.stronger.*` | High |
| Hidden integrity problems alone block neither career route; fabrication can publish | Explicit fact | `07` "Career-route readiness"; `08` "B05 route-unlock contract"; `03` submission ladder | High |
| Detection is gated on the player's own visible record; no omniscient NPC | Explicit fact | `03`; `05` "Authorship and integrity encounters"; `12` optional-scene entry conditions | High |
| No moral score, no moral label, no moral ranking of endings | Explicit fact | `07`; `08` "Ending summary…"; `10` | High |
| Reviewers 2 and 3 make mutually tensioned demands; editor asks for all to be addressed | Explicit fact | `03` reviewer table; `12` `record.reviewer2`, `record.reviewer3`, `record.piimEditor` | High |
| Exit becomes more inviting from Week 8 for every player, independent of route | Explicit fact | `06`; `09` | High |
| Content counts closed: 6/7/10/20/29/12/30, ≤6,000 unique English words, fallback cut line | Explicit fact | `12` "Authority and scope", "Content validation and handoff checks" | High |
| Authored comedic voice is already delivered, not merely intended | Explicit fact | `12`: `scene.clarified.internal.close`, `record.knowledge.body`, `env.bureaucracy.01`, `MR-CIT-10` | High |
| Accessibility forbids drag, hold, timed, and precision input for all focused views | Explicit fact | `10` "Supported devices and controls"; `04` "B08 science presentation…" | High |
| Therefore the game contains essentially no motor or spatial skill | Implication | `02`, `06` (fixed speed, no jump/sprint), `10` | High |
| Traversal costs real seconds but no game resource; its value depends wholly on authored encounter density | Implication | `02` (walking costs no period), `06` (fixed speed; ≤1 major + 2 minor changes per phase; no crowd) | Medium-high |
| Three-band outcome table (80/20/0, 20/60/20, 0/20/80) with ~8–12 total resolutions is too few samples to learn causally | Implication + prediction | `07` "B10 outcome-band…"; `04` five required templates + one repeat each | Medium-high |
| A maximising run's period demand (~70–80) exceeds the 64 available, so triage is mandatory | Interpretation (my arithmetic) | `02` cost table; `07` "48–52 / 52–56 / 58–62"; `12` action IDs | Medium-high |
| Weeks 8–9 contain no open experiment template | Implication | `12` experiment windows (laser W1–4, range W2–4, batch W3–6, repair W4–6, oxygen from W10) | Medium-high |
| The Week-6 "remove then restore cautious wording" beat has no content ID in the catalogue | Absent information | `03` beat sheet Week 6 vs. `12` scene and task catalogues | Medium |
| The protected break has no `MR-ACT-` ID despite costing a period | Absent information | `02`, `07` (break costs 1 period) vs. `12` action table | Medium |
| Manuscript-board constraint structure is unspecified | Absent information | `07` "Manuscript system" (card types only); `12` (three claim strings) | High that the gap exists |
| Operational definition of "visible evidence concern" for route gating is unspecified | Absent information | `07`, `08` gates vs. `12` flag set | High that the gap exists |
| PIIM card satisfaction rules are unspecified; `MR-CIT-03` hints honest limits may substitute | Ambiguity | `07`, `08` (met/partly/not met) vs. `12` `MR-CIT-03` trigger | Medium-high |
| Authored equipment faults are asserted in three documents but only one instance exists in the catalogue | Ambiguity | `02`, `04`, `07` vs. `12` `MR-OPT-GABRIEL-QUEUE` | Medium |
| Prop-family count stated as both ≤24 and 20 within the same file | Contradiction (cosmetic) | `09` "Bounded visual asset inventory" vs. `09` "B10 asset planning…" | High |
| Fallback removes `MR-EXP-REPAIR-STATE` while that template carries `MR-REQ-EXP-003` | Possible contradiction (unverifiable) | `12` experiment table vs. fallback boundary; `15` absent | Low |
| Cross-document load-bearing (e.g. Gabriel trust ≥61 drives level shortcut, scene support, and epilogue afterbeat) indicates a designed game, not a documented one | Interpretation | `06` pass-through; `05`/`07` support rule; `08`/`12` afterbeats | High |
| Run 2+ will be substantially shorter and read as a reread rather than a replay | Prediction | `03`/`05`/`12` (≤2 variants per scene; fixed calendar; all scenes in every run); `10` skip + recap | Medium-high |
| Supported profile may change the work's thematic meaning, not only its difficulty | Interpretation | `07` "Both profiles have the same calendar, narrative, routes, and endings"; `02` energy adjustments | Medium |
| The Morrow route will feel thinner than Aldercroft despite mechanical parity | Prediction | `05`/`09` (Camila remote, no model); `12` (three contacts total) | Medium-high |
| Non-lexical vocal palettes (8 sounds × 5 characters) are the highest-variance execution risk in presentation | Prediction | `09` "Dialogue sound and voice boundary"; `12` audio roles | Medium |
| Fair-play architecture (seed locked at start, no reroll on reload, no real-time advance, crash carve-outs) is thorough | Explicit fact | `07`; `11` "Commands, effects, and deterministic variation"; `02` crash rules | High |

---

**Summary judgement.** These documents describe a coherent, unusually disciplined, thematically tight game with a verified comedic voice, a genuinely uncommon ethical architecture, and a closed content scope. Its identity is unmistakable and its narrative and artistic directions are legible from the concrete decisions alone. Its principal open risks are not conceptual but tactile: an interaction vocabulary reduced to selection-and-confirm, traversal asked to carry weight it may not carry, a probabilistic outcome model with too few samples to teach what it promises to teach, an unspecified manuscript board sitting at the centre of four campaign weeks, and a three-hour canvas that must contain a sixteen-week attrition curve. The vertical slice defined in `12` will settle the first two and part of the fourth; the seventh through eighteenth items in §13 will not be answerable until a full campaign exists.
