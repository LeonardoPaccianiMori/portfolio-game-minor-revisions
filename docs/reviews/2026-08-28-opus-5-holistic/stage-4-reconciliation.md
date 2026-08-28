# Reconciliation of Review Sets — *Minor Revisions*

---

## 1. Corpus confirmation

| # | Report | Read completely | Notes |
|---|---|---|---|
| 1 | `docs/reviews/2026-08-28-opus-5/stage-1-blind-reconstruction.md` | Yes | Substantive, untruncated. Analysis only; contains no recommendations. |
| 2 | `docs/reviews/2026-08-28-opus-5/stage-2-vision-alignment.md` | Yes | Substantive, untruncated. Alignment findings; no prescriptions. |
| 3 | `docs/reviews/2026-08-28-opus-5/stage-3-design-critique.md` | Yes | Substantive, untruncated. C1–C5, S4.1–S4.6, O1–O5, 15 underspecified items, 12 prototype questions, prioritized table. |
| 4 | `docs/reviews/2026-08-28-opus-5/stage-4-revealed-game.md` | Yes | Substantive, untruncated. Contains an internal "End of report" marker followed by an appended Stage 4B section (§13–§16, R1–R11). This is an intentional append, not truncation. |
| 5 | `docs/reviews/2026-08-28-opus-5/codex-validation-notes.md` | Yes | Substantive, untruncated. Verification checks, source-verified findings, and four qualifications. |
| 6 | Holistic report, stage 1 (identity, fun hypothesis, quality) | Yes | Substantive, untruncated. §14 contradictions and gaps; §13 prototype claims. |
| 7 | Holistic report, stage 2 (expectation map and alignment) | Yes | Substantive, untruncated. E1–E23, P1–P13, U1–U9, A1–A11, T1–T12, S1–S9. |
| 8 | Holistic report, stage 3 (critique and recommendations) | Yes | Substantive, untruncated. HGA-R01–HGA-R26, PQ1–PQ18, preserve list, decision sequence. |

No report is absent, empty, truncated, or unreadable. Proceeding.

**Naming used below:**
- **RA** = the first review set (opus-5 stages 1–4 plus Codex validation notes).
- **RB** = the later holistic review set (stages 1–3).

**Method note.** Where an issue is raised by only one review and the other is silent, the entry records this explicitly as *single-source* and the classification reflects only the relationship that actually exists. Predictions about player behaviour, boredom, comedy landing, or optimisation are recorded as hypotheses, never as measured behaviour, per the Codex validation boundary. No entry is accepted, rejected, deferred, or scheduled.

---

## 2. Candidate recommendation register

### A. Time, energy, and campaign economy

---

**MR-REV-001 — The 64-period time and energy economy has never been closed**
- **Sources:** RA stage 1 §6.1, §9.1, evidence rows 6 and 34; RA stage 3 underspecified items 5, 6, 8; RB stage 1 §6.3, §14; RB stage 3 HGA-R04.
- **Relationship:** REINFORCING. Both reviews independently perform period arithmetic and both conclude the budget is unresolved, but they reach *different* conclusions from it: RA concludes energy (not periods) is the binding constraint and that breaks are structurally mandatory; RB computes ~70–80 periods of demand against 64 available and concludes the schedule may not close at all. RB's HGA-R04 is a **superseding candidate** for the formulation because it converts the concern into a bounded, executable paper task.
- **Severity:** RA: implied high (identified as "the hidden centre of the time budget," never stated by the design). RB: CRITICAL.
- **Evidence class:** Document-supported (arithmetic over `02` cost table, `07` budgets, `12` action IDs).
- **Shared diagnosis:** Three inputs to the campaign's central triage engine are undefined — monitoring points per experiment run, the protected break's action class and cost, and diminishing returns on repeats — so neither the design nor either reviewer can state whether the honest path fits inside 64 periods.
- **Alternatives (not chosen):** (a) RB: build a spreadsheet enumerating every `MR-ACT-*` × count for three archetype runs (minimal-defensible, thorough-honest, maximising) against 64 periods and the Standard energy curve, with a pass condition of ≥4 periods slack for the thorough-honest run and ≥8-period overrun for the maximising run. (b) RA: resolve the same inputs as part of the `MR-WP-01` rules encoding and validate via Vitest fixtures rather than on paper first.
- **Affected:** `02` (action-cost contract), `07` (period budgets, break rules, repeat returns), `12` (action table), `15` (`MR-REQ-LOOP-001`, `MR-REQ-EXP-002`), `04`.
- **Minimum decision or test:** Fix the three undefined inputs, then run the archetype arithmetic before any rules-module work begins.
- **Status:** `unreviewed`
- **Codex qualification:** None directly; note that downstream claims about "tight" or "slack" pressure in both reviews are inferences from this unclosed arithmetic.

---

**MR-REV-002 — The protected break has no action ID, cost row, text key, or content object**
- **Sources:** RA stage 2 §11 item 7; RA stage 3 C4 (edit 1) and underspecified item 6; RB stage 1 §14 item 6; RB stage 2 T7; RB stage 3 HGA-R04(b).
- **Relationship:** DUPLICATE.
- **Severity:** RA: CRITICAL (as part of C4). RB: CRITICAL (as part of HGA-R04); RB additionally notes `02`'s rule "No later agent may add a new time-costing action class without a requirement change" makes the break currently *unimplementable*.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** The energy economy's only recovery mechanism is costed in `02` and `07` but absent from `12`'s authoritative action catalogue, while every other time-costing action has an ID.
- **Alternatives:** (a) RA: catalogue as `MR-ACT-BREAK` with five act-state-indexed break-room strings, treating the most repeated action as a comic delivery point. (b) RB: catalogue as `MR-ACT-BREAK` with cost and restore only, as a rules-completeness fix under `MR-REQ-LOOP-001`.
- **Affected:** `02`, `07`, `12`, `15`.
- **Minimum decision or test:** Assign the ID and cost; decide whether it carries authored text.
- **Status:** `unreviewed`

---

**MR-REV-003 — Monitoring window count, distribution, and miss penalty are undefined**
- **Sources:** RA stage 3 underspecified item 5; RA stage 4 §11 item 5; RB stage 1 §14; RB stage 3 HGA-R04(a).
- **Relationship:** DUPLICATE.
- **Severity:** RA: high divergence risk. RB: part of a CRITICAL item.
- **Evidence class:** Document-supported (`02` singular "a meaningful monitoring point" vs `07` plural "meaningful points").
- **Shared diagnosis:** Total campaign period demand swings by roughly 10–20 periods on this single undefined value, and it also sets the travel cadence and therefore the felt pacing.
- **Alternatives:** (a) Fix a single stated number per template. (b) RA C4 edit 3: define a window as existing *only* where at least two materially different options are available, so a visit with no decision is not a window and costs nothing — noting RA itself flags that this frees periods and loosens the calendar.
- **Affected:** `02`, `04`, `07`, `12`, `13` (`MR-TEST-EXP-001`).
- **Minimum decision or test:** State the number; then measure the freed/consumed periods against `07`'s 48–62 route budgets.
- **Status:** `unreviewed`

---

**MR-REV-004 — Break cadence produces a degenerate weekly incentive; crash pressure is uncalibrated**
- **Sources:** RA stage 4 §5 ("second/third weekly breaks avoided"), §7, §12 rows 11 and 20, R5; RB stage 1 §6.3, F7; RB stage 3 HGA-R04.
- **Relationship:** REINFORCING, with **incompatible remedy directions preserved**.
- **Severity:** RA: medium-high (R5). RB: part of CRITICAL HGA-R04.
- **Evidence class:** Document-supported for the incentive; prototype-required for whether the resulting crash rate feels dramatic or punitive.
- **Shared diagnosis:** First-break-restores-2 / later-breaks-restore-1 teaches every player to take exactly one early break per week and avoid later ones, flattening the recovery rhythm the crash system implies. Both reviews also disagree with the design's framing: RA judges energy "not a real constraint except for completionists"; RB judges break periods to be a dominant hidden cost.
- **Alternatives:** (a) RA R5: cap protected breaks at one per week, remove the later tier entirely — tightens pressure and makes crashes more reachable. (b) RB HGA-R04: flatten the restore value to remove the front-loading incentive, or explicitly state that the weekly-first bonus is intended to teach weekly rhythm — loosens or neutralises pressure. These push in opposite directions and cannot both be adopted.
- **Affected:** `02`, `07`, `10` (Supported wording), `13`.
- **Minimum decision or test:** Resolve MR-REV-001 first; the correct direction depends on whether the budget is tight or slack.
- **Status:** `unreviewed`
- **Codex qualification:** Predicted player break behaviour is a hypothesis; it requires private slice observation.

---

**MR-REV-005 — Supported profile changes the pressure structure, not only tolerance**
- **Sources:** RA stage 1 §9.9; RA stage 2 row 34; RA stage 3 S4.6; RA stage 4 §7, T7, R6; RB stage 1 T4; RB stage 2 A10, U-note; RB stage 3 HGA-R22.
- **Relationship:** REINFORCING on diagnosis; CONFLICTING on remedy scope.
- **Severity:** RA: SIGNIFICANT (S4.6) plus a separate HIGH-confidence dominance claim (R6). RB: OPTIONAL (HGA-R22).
- **Evidence class:** Document-supported for the rule differences; prototype-required for whether the two profiles feel like different works.
- **Shared diagnosis:** Removing the night surcharge dissolves the trust-versus-evidence coupling (people are absent at night), and three-segment breaks make rest efficient. `07` provides productive-period budgets only for Standard. RA additionally argues Supported's *extra warnings* make it informationally dominant with no stated cost.
- **Alternatives:** (a) RA S4.6: add a Supported productive-period budget to `07` and decide which single concession carries the tolerance, with the night surcharge as a candidate to retain. (b) RA R6: move the extra warnings out of Supported into the universal contract. (c) RB HGA-R22: record the intent in one sentence with no mechanical change, treating Supported as a legitimate second reading of the work. RA notes (a) reduces tolerance for the players who most need it; RB notes naming Supported as an alternate reading risks creating the stigma `10` forbids.
- **Affected:** `01`, `02`, `07`, `10`, `13`.
- **Minimum decision or test:** Two fixtures running an identical decision script under each profile, reporting break periods and productive periods.
- **Status:** `unreviewed`

---

**MR-REV-006 — Weeks 8–9 contain no open experiment window**
- **Sources:** RB stage 1 §6.2, F3; RB stage 3 HGA-R07.
- **Relationship:** GENUINELY NEW. RA does not identify this; RA stage 1 §5 characterises Weeks 8–9 only as narrative deflation.
- **Severity:** RB: SIGNIFICANT. RA: not raised.
- **Evidence class:** Document-supported (`12` window table: laser W1–4, range W2–4, batch W3–6, repair W4–6, oxygen from W10).
- **Shared diagnosis:** None (single-source). RB's diagnosis: the short loop that carries Weeks 1–5 and 10–13 has nothing to run for two weeks, exactly where the design wants pressure to intensify.
- **Alternatives:** (a) RB: extend `MR-EXP-BATCH-CHECK`'s window from W6 to W9 — no new content object, no requirement change. (b) Accept the gap as intended narrative deflation and record the intent.
- **Affected:** `12` (window table), `03`, `07` (budget interaction with MR-REV-001).
- **Minimum decision or test:** Confirm within MR-REV-001's arithmetic that a run deferring batch work to W8–9 stays in budget and can still leave the PIIM batch card unmet.
- **Status:** `unreviewed`

---

**MR-REV-007 — Weeks 15–16 have no sink for remaining periods**
- **Sources:** RA stage 4 §4 (late-game), T8, R7.
- **Relationship:** Single-source (RA). RB stage 1 §5 makes an adjacent observation (the campaign's density is front- and mid-loaded) without proposing action.
- **Severity:** RA: medium-high; recommendation R7.
- **Evidence class:** Document-supported for the structural gap; prototype-required for whether the tail feels dead.
- **Shared diagnosis:** Route availability resolves at W13/W15 and most optional scenes expire W12–W14, so slack periods in the final eighth are unspendable.
- **Alternatives:** (a) RA R7: allow leftover W15–W16 periods to buy a short closing exchange reusing `MR-ACT-RELATIONSHIP`, granting no trust and no route, influencing only which character is selected for the epilogue afterbeat among tied candidates. (b) Accept the tail as intended emptiness, consistent with `06`'s Week 15–16 "emptier rooms" act state.
- **Affected:** `03`, `05`, `07`, `08`, `12`.
- **Minimum decision or test:** Decide whether the tail is a designed void or a gap; if the former, record it.
- **Status:** `unreviewed`

---

### B. Experiment layer and interpretation

---

**MR-REV-008 — Configuration → outcome band mapping is undefined**
- **Sources:** RA stage 1 §11; RA stage 3 underspecified item 1 (rated "very high" divergence risk); RA stage 4 §11 items 2–3; RB stage 1 §14; RB stage 3 §11.1, PQ10.
- **Relationship:** DUPLICATE.
- **Severity:** RA: highest-listed divergence risk. RB: implicit in HGA-R05 and §11.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `07` names the inputs and the three band probabilities but gives no weighting, threshold, or worked example; the three preparation choices (goal, control quality, observation focus) plus the family-specific choice have no stated effect. This is the primary moment-to-moment decision in the core loop.
- **Alternatives:** Both reviews call for a mapping without prescribing one.
- **Affected:** `04` (B04/B05), `07` (outcome-band contract), `12`, `15` (`MR-REQ-EXP-002`).
- **Minimum decision or test:** State the mapping; then a fixture asserting identical inputs always produce the identical band.
- **Status:** `unreviewed`

---

**MR-REV-009 — Evidence-quality resolution and the meaning of "suspicious" are undefined**
- **Sources:** RA stage 1 §11; RA stage 3 underspecified item 2; RA stage 4 §11 item 6; RB stage 1 §14 (adjacent, via PIIM card computation).
- **Relationship:** REINFORCING (RA is primary; RB touches it only through the PIIM card gap).
- **Severity:** RA: "very high" divergence risk. RB: not separately rated.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** Four states respond to six named factors with no stated rule; "suspicious" is never defined anywhere in the corpus, despite feeding the PIIM cards and the integrity system.
- **Alternatives:** None proposed by either review.
- **Affected:** `04` (B05), `07`, `12`, `15`.
- **Minimum decision or test:** Define the resolution rule and the "suspicious" state before `MR-WP-01`.
- **Status:** `unreviewed`

---

**MR-REV-010 — The three-band outcome model may be unable to teach causality at the available sample size**
- **Sources:** RB stage 1 §5, §6.2, F5, evidence row 64; RB stage 2 D4; RB stage 3 HGA-R05.
- **Relationship:** GENUINELY NEW, and **CONFLICTING in emphasis** with RA. RA stage 1 §7 item 5 and stage 3 §2.3 list seed-locked earned bands among the design's identity-defining strengths and explicitly recommend preserving them; RA never raises the sample-size problem.
- **Severity:** RB: CRITICAL. RA: rated a strength.
- **Evidence class:** Document-supported (arithmetic over `07`'s 20/60/20 Mixed band against ~8–12 total resolutions per campaign).
- **Shared diagnosis:** None. RB's diagnosis: `01` pillar 2 and `02`/`07` promise learnable causal patterns; the approved mechanism cannot deliver them at this sample count, and `07`'s tuning clause permits changing only the three percentages, which cannot fix a sample-size problem.
- **Alternatives:** (a) RB HGA-R05: change display, not bands — name the earned band in the pre-commit forecast and in the post-resolution stated reason, so the deterministic inputs→band model is learnable with certainty while in-band variation stays locked. RB notes this moves the game further toward transparent planning and away from dread. (b) RB alternative within the same item: make Robust and Compromised fully deterministic (100/0/0, 0/0/100), leaving variation only in the Mixed band. (c) Accept RA's position that the bands are a strength and that variance reading as biology is the intended effect.
- **Affected:** `02`, `07`, `10`, `12`, `15`.
- **Minimum decision or test:** RB's slice check — after three laser/sham runs at different preparation, can the causal rule be stated without consulting `07`?
- **Status:** `unreviewed`

---

**MR-REV-011 — Records ship pre-interpreted, so the "interpretation" difficulty axis has no object**
- **Sources:** RA stage 2 row 3, §7.1; RA stage 3 C5; RB stage 1 §6.1 (analysis-view decay F4); RB stage 3 HGA-R14.
- **Relationship:** REINFORCING. Same diagnosis reached by two routes; two different, non-identical remedies.
- **Severity:** RA: CRITICAL. RB: SIGNIFICANT.
- **Evidence class:** Document-supported (`12` `record.*.strong/limited/weak` are all fused "Observation: … Interpretation: …" pairs).
- **Shared diagnosis:** The game performs the scientific reasoning and asks the player only to select a political register for it (careful/strong/inflated). Because the record already says "needs careful wording," the inflated option is signposted as wrong rather than tempting — which weakens complicity as well as interpretation. RB adds that the three evidence views collapse into a lookup table by roughly the fourth analysis.
- **Alternatives:** (a) RA C5: split `record.X.observation` from interpretation; present 2–4 authored caveat tags at `MR-ACT-ANALYSE` for the player to select; have the requirements panel and the PIIM claim-scope card read those selections; define caveat omission as a lesser integrity action below −10. RA flags this as its largest single change, with word-cap cost (~3 tags × 18 variants) and a raised knowledge floor. (b) RB HGA-R14: in the **Limited** band only, permit the three views to disagree and require the evidence card to record a primary view plus a caveat, which then becomes referenceable by Reviewer 3 and by concern scenes. RB flags that it must not become a way to be *wrong*.
- **Affected:** `02`, `04`, `07`, `12`, `13`, `15`.
- **Minimum decision or test:** Build the chosen step into the vertical slice's single laser/sham analysis; check whether a first-time reader can distinguish the supported reading from the overstated one using only the observation text, and whether the choice survives a third repetition.
- **Status:** `unreviewed`

---

**MR-REV-012 — Station-view interaction texture is unspecified**
- **Sources:** RB stage 1 §5, §6.1, F2; RB stage 2 A1, §6; RB stage 3 HGA-R06, PQ1; RA stage 1 §6.2 (monitoring as "the closest thing this game has to combat"); RA stage 3 C4 (edit 3).
- **Relationship:** REINFORCING, with RB's framing a **superseding candidate**. RA treats the symptom (monitoring visits that present no decision); RB names the underlying absence — no document ever specifies what a focused station view *is*, and `00`'s roadmap contains no block that owned interaction feel.
- **Severity:** RA: part of CRITICAL C4. RB: CRITICAL.
- **Evidence class:** Mixed. Document-supported that the specification is absent; prototype-required for whether the default (a confirmation surface) is tolerable across 60+ visits.
- **Shared diagnosis:** With dexterity and precision input deliberately removed (`01` pillar 1, `10`), nothing was put in their place, and the cheapest thing to build is a confirm dialogue.
- **Alternatives:** (a) RB HGA-R06: choose the "diegetic instrument" direction for exactly two stations (active sample rack, imaging bay) and keep the confirmation surface for the other four; all input stays selection-and-confirm. RB warns against drifting into fallible classification, which would collide with `07`'s promise that poor results always give useful information. (b) RA C4 edit 3: leave the view design open but require every monitoring window to present at least two materially different options.
- **Affected:** `02`, `04`, `06`, `09`, `10`, `12`, `15` (`MR-WP-04`, `MR-WP-05`).
- **Minimum decision or test:** RB PQ1 — build both variants of the imaging bay in the slice and run the laser/sham monitoring decision four times in each; pass condition, the instrument variant changes at least one decision.
- **Status:** `unreviewed`
- **Codex qualification:** Predicted tedium is a hypothesis requiring private slice testing.

---

**MR-REV-013 — Sample health, equipment condition, sample-group supply, and fatigue effects are undefined**
- **Sources:** RA stage 1 §11; RA stage 3 underspecified items 7, 8, 13; RA stage 4 §11 item 7.
- **Relationship:** Single-source (RA). RB does not enumerate these.
- **Severity:** RA: medium-high.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** All are named as outcome inputs and appear in `CampaignState` (`11`), but none has a scale, degradation rule, observation channel, or recovery cost — despite `02` pricing "sample or equipment recovery" as intense-class work. Fatigue's effect on results has no threshold or magnitude.
- **Alternatives:** None proposed.
- **Affected:** `04`, `07`, `11`, `12`.
- **Minimum decision or test:** Define scales and observation channels before `MR-WP-01`.
- **Status:** `unreviewed`

---

**MR-REV-014 — The evidence economy: saturation claim versus unknown reachability**
- **Sources:** RA stage 1 §6.2, evidence row 13; RA stage 2 §3; RA stage 3 S4.2; RA stage 4 §6, §12 row 7, T5, R2; RB stage 1 §14; RB stage 3 HGA-R16.
- **Relationship:** QUALIFYING. RA asserts saturation (5 required templates × 2 pts + starting 3 ≥ 12 cap) and proposes re-pricing. RB narrows the claim: diminishing returns on repeats are unquantified and repeat-upgrade semantics are unstated, so **whether Substantial is easily reachable, barely reachable, or requires optional work cannot currently be determined** — and re-pricing should follow quantification, not precede it.
- **Severity:** RA: SIGNIFICANT. RB: SIGNIFICANT.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** The evidence scale's four tiers may not produce four distinct player experiences, and the optional drug template plus repeats may have no evidential purpose on a successful run.
- **Alternatives:** (a) RA S4.2: lower starting support from 3 to 2 and specify that `MR-EXP-OXYGEN-LOSS` feeds the PIIM oxygen card but not support points, so the required chain lands at Coherent and Substantial requires optional work. RA notes this makes one of Aldercroft's three conditions harder and may read as discouraging at Week 1. (b) RB HGA-R16: first state repeat yield, whether a repeat's band is recomputed, and the attainable maximum from required templates plus repeats plus Samira's `EV+1` — then decide pricing. RB warns this may reveal that Substantial effectively requires the "optional" drug experiment.
- **Affected:** `04`, `07`, `08`, `12`, `15`.
- **Minimum decision or test:** Fold into MR-REV-001's arithmetic; then fixtures asserting the attainable packet for each archetype run.
- **Status:** `unreviewed`

---

**MR-REV-015 — Institutional obstruction (equipment queues, faults, access limits, optional PI requests) is promised but not catalogued**
- **Sources:** RA stage 2 §7.4, §7.5, §11 item 6; RA stage 3 S4.1, underspecified item 10; RA stage 4 §11 item 7; RB stage 1 §14; RB stage 3 HGA-R17.
- **Relationship:** DUPLICATE, with two different remedy shapes.
- **Severity:** RA: SIGNIFICANT. RB: SIGNIFICANT.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `02`, `04`, and `07` all promise authored equipment situations with five stated player responses, and `07` specifies three optional desk request slots filled from state-selected authored sets. `12`'s counted content families contain neither, and the only catalogued instance in the corpus is `MR-OPT-GABRIEL-QUEUE`. Because `MR-TEST-CONT-001` asserts exact family counts, an uncounted family will not be built.
- **Alternatives:** (a) RA S4.1: add six `MR-OBS-*` objects as a new counted family (booking conflict, instrument limitation, policy change, service delay, access restriction, contradictory notice), fallback count two. (b) RB HGA-R17: add three to four **room states** rather than content objects, attached to act windows already required by `03` (Samira's imaging conflict, Gabriel's facility limit, a Weeks 10–14 fault), reusing existing anchors and the queue terminal — no change to counted families. Both warn that each obstruction must always state a route forward, per `02`'s no-random-barrier rule.
- **Affected:** `02`, `04`, `06`, `07`, `12`, `13` (`MR-TEST-WORLD-001`), `15`.
- **Minimum decision or test:** Fixture asserting at least one obstruction is available in each act state, each offering ≥2 responses with different costs.
- **Status:** `unreviewed`

---

**MR-REV-016 — "Stop the experiment" reads as a trap rather than as triage**
- **Sources:** RB stage 3 HGA-R25; RA stage 4 §5 ("costly/irrational … learned-once-then-never"), §12 row 10.
- **Relationship:** REINFORCING. RA predicts the behaviour; RB proposes the disclosure fix.
- **Severity:** RB: OPTIONAL. RA: not rated as a defect, recorded as a predicted behaviour.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** Stopping loses the group and elapsed time while raw records persist anyway; its only genuine use is freeing a slot when a window is closing, and that function is never presented.
- **Alternatives:** (a) RB: have the stop confirmation state that it frees a slot immediately, using the existing plain-language forecast mechanism. (b) Leave as-is.
- **Affected:** `02`, `07`, `12`.
- **Minimum decision or test:** Include in the slice's existing limited/missed-monitoring fixture.
- **Status:** `unreviewed`

---

### C. Manuscript and peer review

---

**MR-REV-017 — The manuscript board has requirements and work packages but no approved behaviour**
- **Sources:** RA stage 3 underspecified item 11; RA stage 4 §5, §12 row 27; RB stage 1 §5, §14, §13 item 9; RB stage 2 T6, S1, A2; RB stage 3 HGA-R01.
- **Relationship:** REINFORCING; RB's HGA-R01 is a **superseding candidate** for the formulation, since it escalates the gap to a contract-level blocker and proposes a minimal specification.
- **Severity:** RA: medium-high divergence risk. RB: CRITICAL, and RB notes that under `15`'s definition of done an implementation worker on `MR-WP-05`/`MR-WP-08` would have to escalate rather than build.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `07` names seven card types, a requirements panel, and commit snapshots; `12` supplies three claim strings and three requirements strings. Nothing states card capacity, connection rules, conflicts, what the requirements panel checks, or how many commits a campaign expects. `MR-ACT-MANUSCRIPT-COMMIT` is one ID covering an unbounded number of events. This sits at the centre of Weeks 5–8 and Week 14.
- **Alternatives:** (a) RB HGA-R01: specify as a small constraint-satisfaction surface — each claim level declares required support slots by card type, with the inflated claim requiring the *most* support and therefore visibly lacking it; the requirements panel enumerates unmet slots in plain text; committing with unmet slots is permitted and recorded. RB warns the slot deficit must read as "unsupported," never as "wrong," or it violates the no-moral-score rule. (b) RA (implicit within C5): make the board read the player's caveat selections rather than adding slot constraints. (c) Leave as a claim toggle and record that intent.
- **Affected:** `07`, `10`, `12`, `15` (`MR-REQ-UI-001`, `MR-WP-05`, `MR-WP-08`).
- **Minimum decision or test:** RB's paper test — enumerate every claim level × packet band and confirm each produces a distinct, legible requirements state and at least one non-trivial choice; then include in the slice.
- **Status:** `unreviewed`

---

**MR-REV-018 — PIIM response-card satisfaction rules are undefined**
- **Sources:** RA stage 2 §11 item 9; RA stage 3 underspecified item 3; RA stage 4 §11 item 6; RB stage 1 §14; RB stage 3 HGA-R18.
- **Relationship:** DUPLICATE.
- **Severity:** RA: high divergence risk. RB: SIGNIFICANT.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** Three cards × three states feed four bands, and nothing states what evidence meets, partly meets, or fails a card. RB adds the sharpest specific: `MR-CIT-03`'s trigger ("meet all three PIIM response cards, **or** state all three limits clearly in a defensible response") implies that an honestly stated limitation can substitute for evidence — a rule no systems document contains, and one that determines whether the honest-weak path has a real route to publication.
- **Alternatives:** (a) RB: one table stating met / partly met / not met conditions per card, explicitly confirming or rejecting the `MR-CIT-03` implication. RB warns that if honest limitation counts too generously, the stronger-response path loses its appeal.
- **Affected:** `07`, `08`, `12`, `15`.
- **Minimum decision or test:** Fixture asserting all four bands reachable and at least one path reaching "accepted pending final work" with a Developing packet and honest limitations.
- **Status:** `unreviewed`

---

**MR-REV-019 — Whether claim level should be bound to evidence support**
- **Sources:** RA stage 3 C3 (edit 2); RA stage 4 §6, T5, R2.
- **Relationship:** Single-source (RA) as a proposed rule; **CONFLICTING with RB's posture**, since RB (HGA-R18) treats card satisfaction as a definition to be written rather than a coupling to be introduced, and RB's preserve list forbids converting the claim triad into a mechanical judgement of the player.
- **Severity:** RA: medium-high (R2), and an explicit component of RA's CRITICAL C3.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `07` states only qualitatively that "a strong but overstated claim **can** weaken the claim-scope card," so it cannot be relied on as a counterweight to inflation's +10 PI confidence.
- **Alternatives:** (a) RA R2: claim-scope met only when the claim level is supported by the packet — Careful at Developing+, Strong at Coherent+, Inflated never met. RA notes this makes Careful strictly correct at low evidence. (b) RA C3 edit 2: Inflated sets claim scope to not met *unless* the packet is Substantial and the response omits no valid card. (c) Leave qualitative and resolve only through MR-REV-018's definition table.
- **Affected:** `07`, `08`, `12`, `15`.
- **Minimum decision or test:** Decide alongside MR-REV-018; check the interaction with the no-moral-score rule.
- **Status:** `unreviewed`

---

**MR-REV-020 — Reviewer reports are static while records have three result variants**
- **Sources:** RA stage 2 §11; RA stage 3 O3.
- **Relationship:** Single-source (RA). RB does not raise it.
- **Severity:** RA: OPTIONAL (medium).
- **Evidence class:** Document-supported (`03` says reviewer "wording and examples respond to visible evidence quality"; `12` gives each reviewer one body string).
- **Alternatives:** (a) RA: one variant each keyed to packet label or claim level — three strings. (b) Leave static and correct `03`'s claim. Word-budget cost noted.
- **Affected:** `03`, `12`.
- **Minimum decision or test:** Word-budget check against the 6,000-unique-word cap.
- **Status:** `unreviewed`

---

**MR-REV-021 — The Week-6 contradictory-revision beat is required but unauthored**
- **Sources:** RB stage 1 §14 item 7; RB stage 2 T8; RB stage 3 HGA-R15.
- **Relationship:** GENUINELY NEW. RA does not identify it.
- **Severity:** RB: SIGNIFICANT.
- **Evidence class:** Document-supported (`03` beat sheet requires it; `MR-SCN-WHAT-WE-HAD` in Week 7 depends on it; `12` contains no `MR-SCN-`, `MR-TASK-`, or `MR-REC-` object for it; `MR-REQ-NARR-001` requires the campaign in approved order).
- **Shared diagnosis:** None (single-source). RB's diagnosis: arguably the campaign's signature joke — Elena removes cautious wording, then asks for it back — does not exist as a content object, and Week 7's "third contradictory revision" therefore has only one predecessor.
- **Alternatives:** (a) RB: add one `MR-TASK-*` object (not a scene, preserving the count locked by `MR-REQ-CONTENT-002`) delivered as a Week-6 desk message and resolved through the existing `MR-ACT-MANUSCRIPT-COMMIT` — two short strings, one work item, one added period to be entered into MR-REV-001's arithmetic.
- **Affected:** `03`, `07`, `12`, `15`.
- **Minimum decision or test:** `MR-TEST-NARR-001` fixture asserting `MR-SCN-WHAT-WE-HAD` is reachable only after two prior contradictory revision events.
- **Status:** `unreviewed`

---

### D. Integrity and complicity

---

**MR-REV-022 — Hidden integrity loss has no route-relevant counter-cost, while inflation buys PI confidence**
- **Sources:** RA stage 2 rows 5, 23, §6.5; RA stage 3 C3; RA stage 4 §8, §12 rows 12–13, T2, R3; RB stage 3 §12 item 1 (preserve list); RB stage 1 §4 item 3, §6.4.
- **Relationship:** **CONFLICTING.** RA rates this a CRITICAL defect requiring a counter-cost. RB rates unscored, undetectable, unpunished misconduct as the design's most valuable property and places it first on the do-not-normalize list ("Do not add a detection roll, a delayed exposure, or a karmic ending"). RA's proposed remedy is a *time* cost rather than detection, so it is not strictly forbidden by RB's list — but the two reviews assign opposite valence to the same rule.
- **Severity:** RA: CRITICAL (priority 1 in RA's table). RB: rated a strength; not raised as a defect.
- **Evidence class:** Document-supported for the numbers; prototype-required for whether players actually experience ethics as free.
- **Shared diagnosis (partial):** Inflated claims give +10 PI confidence, which is one of Aldercroft's three conditions; omission/alteration/fabrication cost 10/25/45 integrity points that gate no route; recovery is capped at 10 per run. Both reviews agree the numbers are as stated; they disagree on whether that is a flaw.
- **Alternatives:** (a) RA C3/R3: when `alteredReading` or `fabrication` is set, add one record-consistency task per remaining act at existing light/focused costs — dishonesty generates paperwork, costing periods and energy without gating a route. RA flags that `02` forbids new time-costing action classes without a requirement change, and that neutral wording would make it read as punishment rather than satire. (b) RA R2/C3 edit 2: make the inflated-claim → claim-scope penalty explicit (see MR-REV-019). (c) RB: change nothing; the discomfort is designed to come from self-knowledge, not from a penalty.
- **Affected:** `02`, `07`, `08`, `12`, `13`, `15`.
- **Minimum decision or test:** RA's fixture — two identical campaigns, one careful and one inflating-and-altering, compared on available productive periods at Week 14 and route availability at Week 16.
- **Status:** `unreviewed`
- **Codex qualification:** Codex records that "integrity is mechanically inert" is **too broad**. Visible evidence conflicts and a fabrication confession can affect route access, optional scenes, trust, and ending content. The narrower supported finding is that *hidden* integrity loss has no direct route effect and is especially consequence-light in the fallback.

---

**MR-REV-023 — "Serious evidence concern visible to Aldercroft or Elena" is undefined**
- **Sources:** RA stage 2 §11; RA stage 3 underspecified item 4; RA stage 4 §11 item 8; RB stage 1 §14; RB stage 3 HGA-R10.
- **Relationship:** DUPLICATE.
- **Severity:** RA: high divergence risk, and the only guard against inflation buying Aldercroft. RB: SIGNIFICANT, and described as "the hinge of the entire ethical system."
- **Evidence class:** Document-supported.
- **Shared diagnosis:** Both routes gate on visibility; `12` supplies eight relevant flags with no mapping to who sees what. `MR-TEST-CHAR-001` must prove that a hidden integrity problem alone does not create an unsupported route block, which is untestable without the definition.
- **Alternatives:** (a) RB: one table per flag stating visibility to Elena, Aldercroft, Camila, or none — with the reading consistent with `03`/`05` being that only a confronted-and-unresolved mismatch surviving to Week 13, or a disclosure to Camila, is visible. RB warns a too-narrow definition makes fabrication near-free while a too-broad one converts the system into a hidden morality gate.
- **Affected:** `07`, `08`, `12`, `13`, `15`.
- **Minimum decision or test:** Fixture per flag combination × both routes.
- **Status:** `unreviewed`

---

**MR-REV-024 — Deferral strictly dominates denial in the concern scenes**
- **Sources:** RA stage 4 §8 item 6, §12 row 14, R4.
- **Relationship:** Single-source (RA). RB does not raise it.
- **Severity:** RA: high confidence; recommendation R4 named as one of the three highest alignment-gain-per-change items.
- **Evidence class:** Document-supported (`12`: deny = −20 trust + concern flag; defer = −10 trust + the *same* flag).
- **Alternatives:** (a) RA R4: give denial and deferral different flags — denial closes the concern permanently at −20; deferral leaves it live and re-raisable at the character's next window. (b) Leave as-is and accept that the confrontation collapses into arithmetic.
- **Affected:** `12`, `05`, `07`.
- **Minimum decision or test:** Flag-table edit plus a `MR-TEST-CHAR-001` assertion.
- **Status:** `unreviewed`

---

**MR-REV-025 — The fallback removes both mismatch-discovery scenes, leaving misconduct unwitnessed and `MR-CIT-08` unreachable**
- **Sources:** RA stage 2 rows 31–33, §6.1, §11 items 2–3; RA stage 3 C1 and O2.
- **Relationship:** Single-source (RA). RB does not analyse the fallback content cut.
- **Severity:** RA: CRITICAL (C1), plus OPTIONAL (O2) for the citation-rule contradiction.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** None (single-source). RA's diagnosis: `12`'s fallback excludes `MR-OPT-HAORAN-MISSING-REPLICATE` and `MR-OPT-GABRIEL-ARCHIVE` — the only two content objects where a colleague can notice a record mismatch — while retaining the full Week-14 integrity fork and claiming to retain "all ending modules and citations." `MR-CIT-08`'s trigger therefore has no fallback path, and `13`'s twelve-citation fixture cannot pass. Separately, `MR-CIT-08` may require ethically compromised play in the *full* game too, against `12`'s own rule that "No citation requires an unethical choice."
- **Alternatives:** (a) RA C1: give `MR-OPT-SAMIRA-NOT-IN-MY-FIGURE` (retained in fallback) its permitted single conditional variant in which Samira raises a record concern, and widen `MR-CIT-08`'s trigger from "Haoran or Gabriel" to "a colleague." RA notes this complicates Samira's characterisation. (b) RA O2: add the defensible alternative trigger the citation rule already requires — responding to a colleague's correct concern about an honestly reported limitation. (c) Amend the fallback's stated claim to acknowledge that one citation is unreachable.
- **Affected:** `03`, `05`, `12`, `13`, `15`.
- **Minimum decision or test:** Run the fallback content set with each integrity flag state and assert citation reachability across the minimum number of campaigns.
- **Status:** `unreviewed`
- **Codex qualification:** Codex confirms the fallback/`MR-CIT-08` contradiction as source-verified, but rules RA's framing of the fallback as "the likely shipped artifact" **speculation** — `14` permits the project to remain at fallback scope but does not say this is likely.

---

**MR-REV-026 — Whether complicity is intended to be broadly experienced**
- **Sources:** RB stage 2 U4, A5; RB stage 3 HGA-R09; RA stage 2 rows 22–23, §6.1; RA stage 3 C1, C3.
- **Relationship:** REINFORCING, and **QUALIFYING** of RA. RA proceeds on the assumption that complicity should have mechanical weight and prescribes remedies; RB narrows the question by observing that whether most players ever face complicity meaningfully depends entirely on whether the honest path fits in 64 periods — and that the design has never recorded its intent.
- **Severity:** RA: implicit CRITICAL (C1/C3 both assume broad complicity is intended). RB: SIGNIFICANT.
- **Evidence class:** Mixed. Document-supported that the intent is unrecorded; prototype- and arithmetic-dependent for whether complicity actually reaches players.
- **Shared diagnosis:** `01`'s emotional arc names "uncomfortable complicity" as its middle stage, and the mechanism is three explicit, labelled, single-confirmation choices inside one scene plus optional omission at the board.
- **Alternatives:** (a) RB HGA-R09: record the intent as a decision and let MR-REV-001's budget serve it, with a target that a typical first run ends **Compromised** rather than Defensible or Seriously undermined. RB warns that deliberately squeezing the honest path risks reading as coercion and colliding with the dignity commitments — the squeeze must come from scarcity, never from a mechanic that penalises honesty. (b) Accept that complicity is an available road not taken, and adjust `01`'s arc language accordingly.
- **Affected:** `01`, `07`, `12`, `13`.
- **Minimum decision or test:** After MR-REV-001's arithmetic, simulate a "reasonable careful player" run and record its Week-14 integrity state.
- **Status:** `unreviewed`
- **Codex qualification:** Any statement about what most players will do is a hypothesis, not a measurement.

---

**MR-REV-027 — Correct-after-omission may be a small trust arbitrage**
- **Sources:** RA stage 4 §8 item 5, §12 row 15.
- **Relationship:** Single-source (RA), medium confidence.
- **Severity:** RA: medium.
- **Evidence class:** Document-supported (correction choices give +10 trust *and* allowed integrity recovery; `07` caps recovery at 10 per run).
- **Shared diagnosis:** None. RA's observation: the sequence omit (−10 I) → get caught → correct (+10 trust, +10 I recovery) may net a trust gain at roughly zero integrity cost.
- **Alternatives:** None proposed; RA records it as a discoverable optimisation.
- **Affected:** `07`, `12`.
- **Minimum decision or test:** Fixture computing the net state of the omit-then-correct sequence.
- **Status:** `unreviewed`

---

### E. Career routes, endings, and relationships

---

**MR-REV-028 — Morrow is reachable with the campaign's starting evidence**
- **Sources:** RA stage 2 row 10, §6.2; RA stage 3 C2; RA stage 4 §9, §12 rows 5–6.
- **Relationship:** Single-source (RA) on the specific gate; RB contributes REINFORCING adjacent reasoning through MR-REV-001 and MR-REV-014 (route thresholds rest on unclosed arithmetic).
- **Severity:** RA: CRITICAL (priority 2).
- **Evidence class:** Document-supported for the gate arithmetic; prototype-required for how it feels in play.
- **Shared diagnosis:** Morrow requires "at least a Developing evidence packet," and `07` states the campaign *starts* at three points, Developing. Every other Morrow condition is a conversation or an automatic campaign event (preprint posts in every run; Camila starts at 40 with a +10 reply available). RA argues this makes industry both the cheapest route and, given Camila's warmth and `Transferable Skills`' comparative comfort, the emotionally warmest — against `01` pillar 4.
- **Alternatives:** (a) RA C2: replace "at least Developing" with "at least three analysed primary records, at least one reporting a limited or weak result honestly," reusing existing record state and honesty flags. RA notes this raises the floor for **End of Contract** and that the honest-limitation clause is what prevents Morrow reading as merely more prestigious. (b) RA C2 second clause: revise `ending.career.morrow` to name one concrete relinquished scientific question. (c) Leave the gate and record the intent that industry is deliberately reachable without experimental success.
- **Affected:** `03`, `07`, `08`, `12`, `15`.
- **Minimum decision or test:** RA's paired fixtures — a minimum-effort campaign asserting route availability at Week 16; and three analysed records including one honest weak result with a Thin packet asserting Morrow available.
- **Status:** `unreviewed`
- **Codex qualification:** Codex confirms the gate analysis as source-verified but rules that "minimum-effort Morrow route" is **a gate analysis, not proof of actual player behaviour**; a prototype or state-path test must confirm how the required manuscript and Camila flow feels in play.

---

**MR-REV-029 — Aldercroft's two-of-three gate may make experimental work optional**
- **Sources:** RA stage 4 §6, §9, §12 row 4, T1, R1; RB stage 3 HGA-R21 (adjacent — two of the three conditions measure the same relationship).
- **Relationship:** REINFORCING (RB contributes distinct reasoning via the two-Elena-meters observation without naming the gate as a defect).
- **Severity:** RA: named as "the single most consequential incentive in the document set"; R1 named one of RA's top-three alignment-gain changes. RB: not rated as a defect.
- **Evidence class:** Document-supported for the arithmetic; prototype-required for behaviour.
- **Shared diagnosis:** PI confidence starts at 45 (one answered request reaches Supportive) and Elena starts at 60 (already above 41), so two of three conditions are satisfied by default or by one cheap action, and a Coherent packet is never required.
- **Alternatives:** (a) RA R1: require the research plan, Coherent-or-Substantial evidence, **and** one of {Supportive/Invested PI confidence, Elena ≥41}. RA notes this narrows the academic route for under-performing players. (b) Leave the 2-of-3 structure and record the intent that institutional standing can substitute for evidence — which is arguably the satire.
- **Affected:** `03`, `07`, `08`, `15`.
- **Minimum decision or test:** Route-availability fixtures for a conversation-only run.
- **Status:** `unreviewed`

---

**MR-REV-030 — Elena has two meters that both feed the same gate and are never distinguished**
- **Sources:** RB stage 3 §2, HGA-R21.
- **Relationship:** GENUINELY NEW. RA does not raise it.
- **Severity:** RB: SIGNIFICANT.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** None (single-source). RB's diagnosis: PI confidence (start 45) and Elena working trust (start 60) respond to different inputs but both appear in the Aldercroft condition set and are nowhere distinguished for the player, in a design that otherwise promises stated reasons for every material change.
- **Alternatives:** (a) RB HGA-R21: change labels only — PI confidence as *confidence in the paper*, working trust as *willingness to back you*, with a one-line distinction in Research Status. RB notes that if the distinction cannot be stated in one sentence, that is evidence the meters should merge, which would require a replacement third Aldercroft condition.
- **Affected:** `07`, `10`, `12`, `15`.
- **Minimum decision or test:** Cold read of the Research Status panel (see MR-REV-042).
- **Status:** `unreviewed`

---

**MR-REV-031 — Keeping both career routes open costs nothing**
- **Sources:** RA stage 4 §9, T6, R8.
- **Relationship:** Single-source (RA).
- **Severity:** RA: medium.
- **Evidence class:** Document-supported for the absence of a cost; prototype-required for whether the climax deflates.
- **Shared diagnosis:** Arriving at 06:42 with both routes lit carries no prior commitment, so the final choice is a preference poll.
- **Alternatives:** (a) RA R8: make `optional.camila.offer.keep` cost one period and set a visible flag Elena can react to (−10 Elena, no route closure), with Aldercroft confirmation remaining free. RA notes this could close Aldercroft for a player at Elena 41–50. (b) Leave as-is; RB's preserve list does not oppose it but RB stage 1 characterises the 06:42 choice as intentionally small and unrewarded.
- **Affected:** `08`, `12`.
- **Minimum decision or test:** Route-availability fixtures at Elena 41–50 with the flag set.
- **Status:** `unreviewed`

---

**MR-REV-032 — End of Contract conflates principled withdrawal with collapse**
- **Sources:** RA stage 1 §6.4, §9.12; RA stage 2 §10.2; RA stage 3 O1.
- **Relationship:** Single-source (RA). RB does not raise it. Note RA is internally split: stage 3 §10.2 lists it as a *creatively coherent* risk while stage 3 O1 proposes a fix.
- **Severity:** RA: OPTIONAL, high confidence.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** Public-record withdrawal — arguably the most scrupulous act available — closes both routes and forces the same ending as having run out of everything, with one shared career module and one shared paper module.
- **Alternatives:** (a) RA O1: add one variant of `ending.career.none` or `ending.paper.rejected` keyed to `FLAG:publicWithdrawal` — two strings, no new ending label. (b) Leave as-is and record the irony as intended.
- **Affected:** `08`, `12`.
- **Minimum decision or test:** Ending-module review across the withdrawal path.
- **Status:** `unreviewed`

---

**MR-REV-033 — Non-nihilism rests on a single relationship afterbeat**
- **Sources:** RB stage 1 §6.4, §9; RB stage 2 N1, A7; RB stage 3 HGA-R11.
- **Relationship:** GENUINELY NEW. RA rates the modular epilogue as adequate and does not question ending temperature; RA stage 2 §5.6 lists the bitter-but-human ending as a *strong* expression of the vision.
- **Severity:** RB: SIGNIFICANT. RA: rated a strength.
- **Evidence class:** Document-supported for the module counts; judgement-required for whether the assembled card reads as nihilistic.
- **Shared diagnosis:** None (opposing assessments). RB's diagnosis: `01` forbids nihilism and names solidarity as the counterweight; concretely the counterweight is one afterbeat per run (five of fifteen modules are `*-SUPPORT`) plus `MR-CIT-05`, while all four career modules are deflationary and four of five relationships resolve only as a bar and a status line.
- **Alternatives:** (a) RB HGA-R11: author the existing **People** section status lines as consequence sentences rather than status labels, so every relationship resolves in one line while the selected afterbeat remains the only dramatised one — no new modules, no epilogue lengthening. (b) Accept RA's reading that the ending is correctly calibrated.
- **Affected:** `08`, `12`, `15`.
- **Minimum decision or test:** Assemble the ending card for each of four career endings × three integrity states and judge against `01`'s "bitter but human, not nihilistic" instruction.
- **Status:** `unreviewed`

---

**MR-REV-034 — Morrow's dramatic weight and Camila's presentation are both unresolved**
- **Sources:** RA stage 2 §11 item 12; RA stage 1 §10.9 (presentation unspecified); RB stage 1 §9, §12; RB stage 2 N3, A6; RB stage 3 HGA-R12.
- **Relationship:** REINFORCING on two distinct facets — RA identifies the **presentation gap** (Camila gates an ending, has an eight-sound palette including a "call-end tone," but `05`/`09` forbid a model or in-person appearance, and no document says how the call is presented); RB identifies the **dramatic-weight gap** (an entire alternative life carried in three emails, against Elena's presence in five of seven mandatory scenes).
- **Severity:** RA: medium (unresolved specification). RB: SIGNIFICANT.
- **Evidence class:** Document-supported.
- **Alternatives:** (a) RB HGA-R12: let the existing exit-facing environmental items carry Morrow's presence more actively, and write Camila's three contacts as the game's only adult professional register. RB warns the same guard that protects the exit light from implying a best ending must apply. (b) RA: specify the video-call presentation (audio-plus-interface) explicitly. (c) Accept Morrow as a structural counterweight rather than a felt alternative and record that intent.
- **Affected:** `03`, `05`, `06`, `09`, `10`, `12`.
- **Minimum decision or test:** RB's cold read restricted to Camila's three records plus the exit items — can the reader state what working at Morrow would be like, and one reason not to?
- **Status:** `unreviewed`

---

**MR-REV-035 — Two of five trust bars gate nothing, and the promised ≥61 support action is unauthored**
- **Sources:** RA stage 2 §7.x; RA stage 3 S4.3; RB stage 1 §4; RB stage 3 HGA-R20.
- **Relationship:** DUPLICATE, with near-identical remedies.
- **Severity:** RA: SIGNIFICANT. RB: SIGNIFICANT.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `05` and `07` both state that at 61+ a character "can offer one bounded support action in the related scene"; `12` contains no support action for any character. Elena's, Camila's, and Gabriel's bars gate something; Haoran's and Samira's gate nothing.
- **Alternatives:** (a) RA S4.3: author five once-per-campaign support actions reusing existing effects — Haoran takes a monitoring visit; Samira contributes an evidence card; Gabriel waives an obstruction; Elena answers one PIIM reviewer point; Camila strengthens the claim-scope card. RA caps Elena's and Camila's at one step and forbids crossing "not met" to "met." (b) RB HGA-R20: the same, with Elena deferring one active request without the −10 penalty instead of touching the PIIM band, and Samira's existing `EV+1` restricted to 61+ so it becomes a payoff. Both note the saved periods must enter MR-REV-001's arithmetic.
- **Affected:** `05`, `06`, `07`, `12`, `13`, `15`.
- **Minimum decision or test:** Fixture asserting each action fires only at ≥61 and only once.
- **Status:** `unreviewed`

---

**MR-REV-036 — Visible, quantised, threshold-gated trust bars read as a score**
- **Sources:** RA stage 2 row 28; RA stage 4 §10, §13.2(f), §12 row 19, R10; RB stage 3 §2 (the trust system is the design's most generic component).
- **Relationship:** REINFORCING (RB's contribution is weaker and framed as genericness rather than as a contradiction).
- **Severity:** RA: medium-high; recommendation R10. RB: not separately rated.
- **Evidence class:** Document-supported for the contradiction between `05`/`07`'s framing and the HUD; prototype-required for how players read it.
- **Shared diagnosis:** Five permanently visible 0–100 bars with fixed ±10/±20 steps and a published 61 threshold are structurally a score, against the stated intent that they "do not measure friendship or moral worth."
- **Alternatives:** (a) RA R10: no numeric or rule change — present the bars under an explicitly institutional framing, as a workload/collegiality readout the floor maintains, converting an unintended value into an intended joke. RA notes some players may read the framing as excusing rather than satirising instrumentalisation. (b) Leave as-is.
- **Affected:** `07`, `10`, `12`.
- **Minimum decision or test:** Framing review; cold read of the Research Status panel.
- **Status:** `unreviewed`

---

**MR-REV-037 — Replay intent versus the Archive's implied collection loop**
- **Sources:** RA stage 1 §6.9; RA stage 2 §7.7, row 42; RA stage 3 §10.4; RB stage 1 §6.5; RB stage 2 U5, A11; RB stage 3 HGA-R19.
- **Relationship:** QUALIFYING. RA treats thin replay as deliberate, coherent, and consistent with `01`'s hedged "may add longevity," and lists it among creatively coherent risks. RB narrows: the design is coherent *except* that the Archive's twelve-card capacity plus twelve citations implies a collection loop the content variance does not support — the one place where an otherwise scrupulously non-overclaiming project overpromises.
- **Severity:** RA: not a defect. RB: SIGNIFICANT.
- **Evidence class:** Document-supported.
- **Alternatives:** (a) RB HGA-R19: decide the intent and align presentation — keep the Archive but frame it as an institutional record of departures rather than a completion grid, ensuring no UI element implies a set to complete. (b) Accept RA's position that replay is deliberately thin and the Archive is already satirical.
- **Affected:** `08`, `10`, `12`.
- **Minimum decision or test:** Read the Archive screen text and judge whether it reads as a record or a checklist.
- **Status:** `unreviewed`

---

### F. Tone, comedy, and world

---

**MR-REV-038 — The mid-campaign loop is administrative and the comic voice is absent from repeated actions**
- **Sources:** RA stage 2 §6.3, §6.7, §7.2, §7.3, rows 17, 30; RA stage 3 C4; RA stage 4 §10; RB stage 1 §5, §6.2, F2, F4; RB stage 2 D1, T1; RB stage 3 §14, HGA-R02, HGA-R06, HGA-R26.
- **Relationship:** REINFORCING. Both reviews converge on this as the design's dominant experiential risk from different directions — RA from the work-package mapping (`MR-REQ-VISION-001` → `MR-WP-08`, tested by `MR-TEST-CONT-001`, which checks no tonal property) and the deadpan-by-rule interface; RB from interaction texture and the absence of any roadmap block on feel.
- **Severity:** RA: CRITICAL (C4). RB: named the dominant risk in its final risk statement ("admirable and inert").
- **Evidence class:** Mixed. Document-supported for the structural absence; prototype-required for the felt monotony.
- **Shared diagnosis:** Comedy lives in optional environmental text, five middle-act authored scenes, and twelve citations across three hours; the recurring surface — walk, confirm, break, walk — is specified as factual and non-moral, and the single most frequent action has no content object at all.
- **Alternatives:** (a) RA C4: catalogue `MR-ACT-BREAK` with five act-state-indexed break-room lines; add five act-state-indexed flavour lines beside (never instead of) the desk work-queue status words; require every monitoring window to present ≥2 materially different options. Ten strings, one action ID, one rule. RA warns the queue line must be typographically subordinate and must not enter the HUD. (b) RB HGA-R06/HGA-R26: enrich two station views as diegetic instruments and add 8–12 one-time internal-thought lines keyed to state thresholds (first zero-energy push-through, first Compromised state, first missed window, first night period, first act transition). RB warns against a nagging channel and against the detached-narrator failure `05` forbids. (c) RB HGA-R02: treat this as primarily a *measurement* gap and install the criterion first (see MR-REV-040).
- **Affected:** `02`, `04`, `05`, `07`, `09`, `10`, `12`, `13`, `15`.
- **Minimum decision or test:** Instrument the slice for station visits, traversal seconds, no-decision monitoring visits, and confirmations per minute; then run the slice with and without the added comic surfaces.
- **Status:** `unreviewed`
- **Codex qualification:** Predicted boredom and comedy failure are hypotheses requiring private slice testing, not measured facts.

---

**MR-REV-039 — Environmental satire is optional, one-shot, and skippable under time pressure**
- **Sources:** RA stage 2 §6.6, §7.2; RA stage 3 S4.4; RA stage 4 §5, §12 row 24, T9, R9; RB stage 1 §6.1, §7 item 6; RB stage 3 HGA-R24.
- **Relationship:** DUPLICATE, with three variant remedies.
- **Severity:** RA: SIGNIFICANT (S4.4) and separately R9. RB: OPTIONAL, prototype-required.
- **Evidence class:** Mixed.
- **Shared diagnosis:** Thirty `MR-ENV-*` items carry a large share of the game's identity, cost no time, have no markers, are one-time displays, and are guaranteed never to carry required information — so a player under calendar pressure has no reason to inspect them and loses nothing by skipping.
- **Alternatives:** (a) RA S4.4: designate ten of thirty as ambient on first safe room entry, displayed as a brief non-blocking diegetic notice with no interaction and no cost, keeping twenty inspectable. RA warns they must not read as pop-up UI and must respect reduced motion. (b) RA R9: display on first proximity-and-glance in the active window rather than on confirmed inspect, leaving marker and assist rules unchanged. (c) RB HGA-R24: display short items' full text in the lower-centre interaction prompt so reading costs a glance rather than a mode change, with longer items keeping the focused view. RB notes a possible conflict with `10`'s rule that the prompt shows one available action, requiring a length cap.
- **Affected:** `06`, `10`, `12`, `13`.
- **Minimum decision or test:** Count Week-1 items read under each scheme against a pre-registered target.
- **Status:** `unreviewed`

---

**MR-REV-040 — "Increasingly surreal" is promised by the top-level documents and forbidden by the presentation documents**
- **Sources:** RA stage 2 §6.6, row 7, §9 ("increasingly cold and quiet institution"); RB stage 1 §10 (A/V-1), §14; RB stage 2 T3, A8, U9; RB stage 3 HGA-R13.
- **Relationship:** REINFORCING; RB's formulation is a **superseding candidate** because it names the contradiction as a document-level conflict requiring resolution under `AGENTS.md`'s rule that contradictions be recorded rather than silently resolved.
- **Severity:** RA: rated a threat to the vision (medium-high). RB: SIGNIFICANT.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `README` promises an "increasingly surreal" institution and `01` pillar 2 promises "increasingly absurd," while `09` bans distorted architecture, giant props, slapstick, and glitch effects, and `06` caps visible change at one major and two minor items per phase across the whole floor. The approved act progression is entirely realistic.
- **Alternatives:** (a) RB HGA-R13: adopt bureaucratic accretion — raise the per-phase change cap **for notice, label, and paper items only** (the cheapest asset class, since `09` requires live text or SVG), keeping each item individually plausible while the absurdity lives in quantity and contradiction; then correct `README` and `01` so "surreal" reads as institutional-linguistic. RB warns about readability against `10`'s contrast rules, the word budget, and the fact that `MR-REQ-CONTENT-002` locks the 30-item count (so accretion should reuse items across windows rather than add IDs). (b) Accept textual-only surrealism and amend `README` and `01` alone.
- **Affected:** `README`, `01`, `06`, `09`, `12`.
- **Minimum decision or test:** Assemble a Week-3 and a Week-13 view of the main laboratory and corridor from the approved item list and judge whether the second reads as escalation.
- **Status:** `unreviewed`

---

**MR-REV-041 — The floor-population axis is undecided, and traversal's stated justification may not be delivered**
- **Sources:** RB stage 1 F1, §7; RB stage 2 U3, A3; RB stage 3 HGA-R08; RA stage 1 §6.6, §9.7 (travel as pacing metronome and as an unacknowledged rest mode); RA stage 3 C4 (monitoring walk repeated 20+ times).
- **Relationship:** REINFORCING with an **interpretive divergence preserved**. RA reads free travel positively — a pacing device and a zero-cost contemplative valve the systems never name. RB reads it as the most-cited likely friction and notes that `02`/`06`'s "meaningful travel" rationale (queues, colleagues, changed room states) is contradicted by the authored-anchor budget, the no-crowd rule, and the one-major-two-minor change cap.
- **Severity:** RA: not rated a defect. RB: SIGNIFICANT.
- **Evidence class:** Mixed.
- **Alternatives:** (a) RB HGA-R08, populated: add roughly ten authored one-line exchanges tied to existing anchors, live text only — explicitly bounded, so not the "unbounded contextual barks" `05` forbids. Word-budget and repetition costs noted. (b) RB HGA-R08, decaying: state that the floor is populated in Weeks 1–4 and progressively empties, and **remove the "meaningful travel" justification** from `02` and `06` so the design stops claiming a value it has chosen not to deliver. (c) Accept RA's reading and record travel as an intentional pacing valve.
- **Affected:** `02`, `05`, `06`, `12`.
- **Minimum decision or test:** RB PQ2 — log traversal seconds as a share of session time against a threshold committed to in writing before playing.
- **Status:** `unreviewed`

---

**MR-REV-042 — Small tone and content items: exit voice, drug template, orphaned flag**
- **Sources:** RA stage 3 O4, O5; RA stage 4 R11; RA stage 4 §5 (neglected actions).
- **Relationship:** Single-source (RA) in each case; grouped here because each is a one-to-five-string item.
- **Severity:** RA: OPTIONAL (O4 high confidence, O5 high confidence, R11 medium).
- **Evidence class:** Document-supported.
- **Shared diagnosis:** (i) The pre-Week-16 exit is specified as becoming more inviting from Week 8 for every player, yet gives one static dry line. (ii) `MR-EXP-DRUG-EXPOSURE` costs roughly four periods for a benefit described only as "can strengthen Morrow context," so an authored experiment family may go unseen. (iii) `FLAG:openingCaution` is set in `MR-SCN-CLARIFIED` and never read anywhere in the corpus, which `13`'s content scan may flag as orphaned state.
- **Alternatives:** (i) Index the exit response to the five act states — five strings — or leave static. (ii) Either let an analysed `MR-REC-DRUG-EXPOSURE` substitute for one partly-met PIIM card when the claim is Careful, **or** leave it inert and give Camila one line acknowledging that the extra work did not change her decision (RA notes the second is cheaper and more thematically pointed). (iii) Reference `FLAG:openingCaution` in the low-evidence variant selection for `A Complete Narrative`, or remove it.
- **Affected:** `04`, `06`, `08`, `12`, `13`.
- **Minimum decision or test:** Content-scan pass for orphaned state; word-budget check.
- **Status:** `unreviewed`

---

### G. Process, evaluation, and verification

---

**MR-REV-043 — No engagement, pacing, or repetition criterion exists anywhere in the evaluation plan**
- **Sources:** RA stage 2 §6.7, §6.8, §11 items 4–5; RA stage 3 S4.5; RA stage 4 T-series; RB stage 1 §13; RB stage 2 T1, D2; RB stage 3 HGA-R02, §11.3, §14.
- **Relationship:** DUPLICATE on diagnosis; complementary remedies.
- **Severity:** RA: SIGNIFICANT (S4.5). RB: CRITICAL (HGA-R02).
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `01` pillar 6 and `07`'s "escalation, not repetitive grinding" are positive obligations across the whole runtime. `13` contains twelve test IDs, twelve slice items, and eight experience criteria and none of them tests engagement or pacing; the eight criteria are reviewed only "before a release candidate," which `14` places after the fallback gate — i.e. after the last point at which scope could be reframed on tonal grounds. `MR-REQ-VISION-001` maps only to `MR-TEST-CONT-001`, which checks IDs, keys, counts, word count, causation claims, and actionable-protocol scans — nothing tonal. RB adds that `00`'s roadmap never opened a block on interaction feel.
- **Alternatives:** (a) RA S4.5: move `01`'s criteria 1, 2, and 4 into `13`'s vertical-slice check as items 7–9. RA warns a subjective item can stall a gate that `13` requires to pass on all items, and that criterion 4 is unfalsifiable by the person who wrote the jokes. (b) RB HGA-R02: add a ninth experience criterion plus a matching slice-gate item, both **pre-registered** — thresholds written down before play (traversal share of session time, confirmations per minute, whether play continues voluntarily past the slice's end), with development-only instrumentation that must not become telemetry. (c) RB §11.3: additionally add pacing and repetition checks to the **fallback gate**, which currently contains only correctness checks.
- **Affected:** `01`, `13`, `14`, `15`, `00`.
- **Minimum decision or test:** The criterion is itself the test; RB's validity check is whether the thresholds can be stated on one page before the slice exists, and RA's is whether the gate ever produces a recorded change request on tonal grounds.
- **Status:** `unreviewed`

---

**MR-REV-044 — The audience-breadth criteria are unverifiable under the sole-evaluator boundary**
- **Sources:** RA stage 2 rows 35, §6.4, §11 item 13; RA stage 3 S4.5 (partial); RB stage 2 T2, D3; RB stage 3 HGA-R03.
- **Relationship:** REINFORCING; RB's HGA-R03 adds a **new method proposal** inside the approved boundary.
- **Severity:** RA: identified as a CONTRADICTION at the verification-method level (high). RB: CRITICAL.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `01`'s criterion 1 requires "a player without academic experience"; `13` forbids external players, surveys, consent, and outside review and names Leonardo the only human evaluator, while the decision log records that the material derives from his own experience. The drafted satire is insider-coded (sham controls, batch effects, preprint norms, prestige-ladder rejections, Reviewer 3's stress-response objection), the tutorial teaches interface only, and the 6,000-unique-word cap leaves little exposition headroom.
- **Alternatives:** (a) RB HGA-R03: add a **cold-read protocol** executed by Codex with no access to the design documents — given only the strings plus screenshots of the three evidence views and Research Status, state the objective, why the laser/sham task matters, what the repatterning index means, and what happens if evidence stays Thin; record pass or a specific rewrite request. Then reword `01`'s criteria to claim only what the method supports: comprehensibility to a reader without the design documents. RB stresses the protocol must be limited to **comprehension** and never applied to humour or emotional criteria, which remain Leonardo's alone. (b) RA: no method proposed; RA records the contradiction and notes no evidence path exists to falsify the claim. (c) Re-scope `01`'s criteria to what a private process can honestly assert.
- **Affected:** `01`, `13`, `00`, `15`.
- **Minimum decision or test:** RB notes the cold read can be run against the existing `12` draft **now**, before any code, at zero cost.
- **Status:** `unreviewed`
- **Codex qualification:** Codex records that target-player response is a hypothesis; Leonardo and Codex are the only approved evaluators, so this must be resolved inside that boundary rather than by importing external testing.

---

**MR-REV-045 — Pillar 6 ("fun and absurdist throughout") conflicts with the approved darkening arc**
- **Sources:** RA stage 2 row 18, §11 item 4; RB stage 2 T1, D1; RB stage 3 §6.
- **Relationship:** DUPLICATE.
- **Severity:** RA: rated a vision-internal tension (high confidence). RB: recorded as an unaddressed contradiction.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `01` pillar 6 (restated in the decision log, 2026-08-27) requires the game to remain fun and absurdist throughout, while `01`'s own arc and criterion 5 require the later parts to create pressure and discomfort. Both are approved; `06` and `09` implement the darker one (colder light, thinner music, emptier rooms). No document records the tension.
- **Alternatives:** Neither review prescribes a resolution; both record it as requiring a decision.
- **Affected:** `01`, `06`, `09`, `13`, `decision-log.md`.
- **Minimum decision or test:** Record the reconciliation as a decision-log entry, per `AGENTS.md`'s rule against silently resolving contradictions.
- **Status:** `unreviewed`

---

**MR-REV-046 — Production capacity and the €150 ceiling against the full asset and test plan**
- **Sources:** RB stage 2 T10; RB stage 1 §10 (A/V-4); RB stage 3 §14.
- **Relationship:** GENUINELY NEW as an analysed risk; RA touches scope discipline only as a strength.
- **Severity:** RB: medium-high, recorded as the third of three dominant risks.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** None (single-source). RB's arithmetic: roughly 380–620 hours at €150 must produce the full codebase across ten work packages, one continuous 400 m² floor, an IndexedDB layer with backup and migration, a semantic accessible UI, twenty prop families, four rigged NPCs, forty original non-lexical vocal sounds, six music stems, and a suite at 90% line / 85% branch with Playwright flows in three engines. RB judges the four NPC models and the audio palettes the roles most likely to force original creation or role removal, and notes `14`'s stop/pause/reframe rules already treat this honestly.
- **Alternatives:** (a) Treat as accepted risk under `14`'s existing rules. (b) Front-load Phase 1 asset sourcing, as `14` already sequences, to test the ceiling before the slice.
- **Affected:** `09`, `14`, `ASSET_MANIFEST.md`.
- **Minimum decision or test:** RB PQ18 — can the asset plan be delivered under €150 with the licence boundary intact? Testable in Phase 1, before the slice.
- **Status:** `unreviewed`
- **Codex qualification:** RB's characterisation of the fallback as "more likely to be the terminal deliverable" is the same speculation Codex flagged in RA's C1; treat as opinion, not as a production forecast.

---

**MR-REV-047 — `MR-REQ-VISION-001` has no verifying test**
- **Sources:** RA stage 2 row 36, §6.7, §11 item 5; RB stage 3 §6 (same observation, folded into HGA-R02).
- **Relationship:** DUPLICATE; largely subsumed by MR-REV-043 but recorded separately because it is a requirement-traceability defect rather than a gate-timing one.
- **Severity:** RA: explicit, high confidence.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `15` maps the vision requirement to `MR-TEST-CONT-001` and to `MR-WP-08`; that test's enumerated checks contain no tonal, comic, or accessibility criterion, so the pillar with the least testable content has the weakest verification harness in an otherwise rigorous plan.
- **Alternatives:** Add a test link once MR-REV-043 is decided, or re-scope the requirement.
- **Affected:** `13`, `15`.
- **Minimum decision or test:** Requirement-to-test mapping review.
- **Status:** `unreviewed`

---

### H. Documentation hygiene and content-catalogue gaps

---

**MR-REV-048 — Non-interactive scene time has three approved values**
- **Sources:** RA stage 2 §11 item 1; RA stage 3 underspecified item 14; RB stage 1 §14 item 2; RB stage 2 T4; RB stage 3 HGA-R23(a).
- **Relationship:** DUPLICATE; RB adds the sharper finding that the change from 15–20 to 14–18 minutes is an **unrecorded supersession**, breaching the decision log's own rule.
- **Severity:** Both: minor in effect, notable in process. RA notes `AGENTS.md` forbids resolving it silently.
- **Evidence class:** Document-supported (`decision-log` 2026-08-26: 15–20 min, 22-min max; `02`/`03`: 14–18 min; `12`: exactly 14:45 plus a 75-second epilogue).
- **Alternatives:** Record the supersession and align the three figures.
- **Affected:** `decision-log.md`, `02`, `03`, `12`.
- **Status:** `unreviewed`

---

**MR-REV-049 — `MR-REQ-EXP-001` requires six templates; the approved fallback ships four**
- **Sources:** RB stage 2 T5; RB stage 3 HGA-R23(b).
- **Relationship:** GENUINELY NEW. RA raised a related suspicion at stage 1 that `MR-REQ-EXP-003` might conflict with the fallback, but RA's stage 2 explicitly **resolved** both of its earlier flags once `15` was supplied; RB's finding is a different, still-open one.
- **Severity:** RB: low-to-medium.
- **Evidence class:** Document-supported.
- **Shared diagnosis:** None (single-source). RB: the requirement text is unconditional and lacks the fallback qualifier that `MR-REQ-CONTENT-002` has, while `15`'s definition of done requires approved behaviour to be implemented.
- **Alternatives:** Add a fallback qualifier to the requirement.
- **Affected:** `15`, `12`.
- **Status:** `unreviewed`

---

**MR-REV-050 — Minor documentation defects: broken decision-log table; prop-family count stated as both 24 and 20**
- **Sources:** RB stage 1 §14 item 1; RB stage 2 T12; RB stage 3 HGA-R23(c)(d).
- **Relationship:** GENUINELY NEW (both hygiene items).
- **Severity:** RB: trivial in effect; notable because `decision-log.md` is fourth in `15`'s authority order.
- **Evidence class:** Document-supported.
- **Alternatives:** Repair the table; add a clause distinguishing the 24-family limit from the 20-family plan in `09`.
- **Affected:** `decision-log.md`, `09`, `06`.
- **Minimum decision or test:** RB suggests extending `MR-TEST-CONT-001`'s scope to cross-document numeric claims.
- **Status:** `unreviewed`

---

**MR-REV-051 — Research Status reason strings, pre-action forecast strings, and word-cap headroom**
- **Sources:** RA stage 2 §11 item 11; RA stage 3 underspecified items 9 and 15; RA stage 3 C5 risk note.
- **Relationship:** Single-source (RA). RB touches the word cap only as a general risk.
- **Severity:** RA: medium-high (a required feature with no content and no budget).
- **Evidence class:** Document-supported.
- **Shared diagnosis:** `07` mandates a short stated reason for every material change and a plain-language forecast before every meaningful action; `12` supplies one generic route string and no forecast text, inside a 6,000-unique-word cap that `12` describes as nearly met. It is also unstated whether fallback-excluded content is removed from the string file or merely unreferenced.
- **Alternatives:** Draft the strings and re-measure; or restate the cap's measurement scope.
- **Affected:** `07`, `12`, `13`.
- **Minimum decision or test:** Word-count measurement once the required strings exist — noting that MR-REV-011, MR-REV-015, MR-REV-020, MR-REV-033, MR-REV-035, and MR-REV-038 all add strings against the same cap.
- **Status:** `unreviewed`

---

**MR-REV-052 — Camila's video-call presentation is unspecified**
- **Sources:** RA stage 1 §10.9; RA stage 2 §11 item 12; RA stage 3 underspecified item 12.
- **Relationship:** Single-source (RA) on presentation; see MR-REV-034 for the adjacent weight question.
- **Severity:** RA: medium divergence risk.
- **Evidence class:** Document-supported.
- **Alternatives:** Specify the audio-plus-interface presentation, consistent with `05`/`09`'s no-model rule and the eight-sound palette including a "call-end tone."
- **Affected:** `05`, `09`, `10`, `12`.
- **Status:** `unreviewed`

---

### I. Non-actionable observations (context; should not become design tasks)

---

**MR-REV-053 — Shared do-not-normalize list**
- **Sources:** RA stage 3 §2 (2.1–2.10); RB stage 3 §12 (twenty items).
- **Relationship:** NON-ACTIONABLE OBSERVATION, and a **constraint on every other entry**.
- **Content:** Both reviews independently converge on the same protected set: fixed gates that never wait; the preprint posting in every run; seed-locked earned bands with no reroll; no pre-Week-16 game-over; locked raw record with mutable reported record and no falsification method; visibility-gated misconduct (fabrication can publish, honest work can fail); no moral score, factual integrity warnings, un-ranked citations; solidarity as material value; Out of Scope requiring an available route; the pre-authored fallback and production stop rules. RB adds: no quest markers, no dexterity input anywhere, the 06:42 bookend and single continuous floor, Elena as non-villain, the exit's route-independent appeal, text-led dialogue with a silent protagonist, local-only telemetry-free persistence, deflationary endings, Supported with identical content, the ≤2-variant discipline and word cap, the asset-provenance gate covering prototypes, the no-participant boundary, and the separation of agent-direction evidence from the fiction.
- **Note:** MR-REV-022's proposed remedy sits closest to this boundary and should be evaluated against it explicitly.
- **Status:** `unreviewed`

---

**MR-REV-054 — Convergent aesthetic observation: the software behaves with the integrity the institution lacks**
- **Sources:** RA stage 1 §3; RA stage 2 §8.1; RB stage 1 §11 (T1), §8 item 3.
- **Relationship:** NON-ACTIONABLE OBSERVATION, independently reached by both reviews.
- **Content:** Costs disclosed before commitment, no ambush messages, windows surviving browser closure, seeds that cannot be rerolled, expiries stated rather than silently applied, a backup never overwritten without consent. Both reviews note this is not a stated pillar and that it produces the corpus's most distinctive quality — while RA also notes it slightly dampens felt oppression, and RB notes the same in T1's "satire vs. system legibility" tension. Recorded as context, not as a task.
- **Status:** `unreviewed`

---

**MR-REV-055 — Governing qualification: all behavioural claims in both reviews are hypotheses**
- **Sources:** Codex validation notes, "Qualifications and external-review overstatements" and "Decision boundary."
- **Relationship:** NON-ACTIONABLE OBSERVATION applying to the whole register.
- **Content:** Codex records four specific limits: "fallback is the likely shipped artifact" is speculation; "integrity is mechanically inert" is too broad; "minimum-effort Morrow route" is a gate analysis, not proof of behaviour; and predicted boredom, comedy failure, player optimisation, and target-player response are hypotheses requiring private slice testing. Both review sets contain extensive behavioural prediction — RA's stage-4 player-behaviour classes and RB's stage-1 fun hypothesis — none of which is measurement. Codex further records that the reports are advisory and that no numbered design document, content object, route formula, production scope, or implementation gate may change until Leonardo reviews a finding and explicitly decides.
- **Status:** `unreviewed`

---

## 3. Where the two reviews genuinely conflict

Four conflicts must be decided rather than merged:

| Entry | RA position | RB position |
|---|---|---|
| MR-REV-010 | Seed-locked earned bands are an identity-defining strength; preserve unchanged | The band model cannot teach causality at ~8–12 samples; the promise or the mechanism must change |
| MR-REV-022 | Hidden integrity is a CRITICAL gap requiring a time-based counter-cost | Unscored, undetectable, unpunished misconduct is the design's most valuable property; do not add cost paths |
| MR-REV-004 | Cap protected breaks at one per week (tightens pressure) | Flatten the restore value or state the intent (neutralises or loosens pressure) |
| MR-REV-037 | Thin replay is deliberate and coherent | The Archive's capacity overpromises relative to content variance |

Two further divergences are interpretive rather than prescriptive: MR-REV-033 (RA rates the ending a vision strength; RB rates it at risk of nihilism) and MR-REV-041 (RA reads free travel as a pacing valve; RB reads it as the likeliest friction complaint).

---

## 4. Genuinely new questions for discussion before implementation

These arise only from the later review or only from the reconciliation, and are not answerable by re-reading the design documents.

1. **Can the three-band outcome model teach the causal patterns the vision promises, at eight to twelve resolutions per campaign — and if not, does the display change or does the promise?** (MR-REV-010; the first review treated this mechanism as a strength.)
2. **What, concretely, is a focused station view?** No document has ever specified it, and no roadmap block ever owned it. (MR-REV-012)
3. **Does the 64-period budget actually close?** The campaign's central engine has never been computed, and three of its inputs are undefined. Several other decisions — complicity reach, break cadence, evidence pricing, support actions — depend on the answer. (MR-REV-001, and its dependents MR-REV-004, MR-REV-014, MR-REV-026, MR-REV-035)
4. **Is Weeks 8–9's absence of any open experiment window a designed narrative deflation or an unnoticed gap?** (MR-REV-006)
5. **Where does "increasingly surreal" actually live, and which document is wrong — `README`/`01`, or `09`/`06`?** (MR-REV-040)
6. **Does the Week-6 contradictory-revision beat exist?** It is required by the beat sheet, depended on by Week 7, and has no content object. (MR-REV-021)
7. **Is complicity intended to reach most players, or to remain an available road not taken?** The design has never recorded the intent, and the first review's critical recommendations all silently assume the former. (MR-REV-026)
8. **Does the assembled ending card read as bitter-but-human or as nihilistic?** Four of five relationships currently resolve as a bar and a status line. (MR-REV-033)
9. **Why does Elena have two meters that both feed the same route gate, and can the difference be stated in one sentence?** (MR-REV-030)
10. **What evidence would satisfy pillar 6 ("fun and absurdist throughout"), and who produces it before the last gate at which scope could be reframed?** (MR-REV-043, MR-REV-045, MR-REV-047)
11. **How will the audience-breadth criteria be judged inside the sole-evaluator boundary — and is the cold-read protocol an acceptable substitute for the claim, or should the claim be re-scoped?** (MR-REV-044)
12. **Should the ethical system acquire a non-route cost, or is its costlessness the thesis?** This is the sharpest disagreement between the two reviews and cannot be resolved by merging them. (MR-REV-022)

*No entry in this register is accepted, rejected, deferred, or scheduled. No design document, content object, route formula, production scope, or implementation gate has been changed.*
