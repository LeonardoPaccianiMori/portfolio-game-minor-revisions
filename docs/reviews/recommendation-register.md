# Design Review Recommendation Register

Status: **R00 through R07 documented; no review block remains; implementation remains blocked**

This file is the status ledger for recommendations and actionable findings
from the two Claude Opus 5 reviews of B10 snapshot
`ea7e95d0ad33c7c9fd76466ea25bf726a4fb3ee8`.

The complete diagnosis, sources, severity differences, alternatives, affected
documents, minimum tests, and Codex qualifications for `MR-REV-001` through
`MR-REV-055` are in the holistic review's
`stage-4-reconciliation.md`. That report remains source evidence. This file
records Leonardo's decisions without rewriting the source reports.

## Status rules

- `unreviewed`: Leonardo and Codex have not discussed the entry.
- `accepted`: Leonardo approved a stated response. The affected design change
  still requires a separate exact write plan.
- `rejected`: Leonardo decided not to use the recommendation.
- `deferred`: no present decision is required; the reason and return condition
  must be recorded.
- `prototype required`: the question must be tested in an approved build before
  a final design decision.
- `protected`: an approved constraint that governs later decisions and creates
  no separate implementation task.
- `informational`: retained context that creates no implementation task.

No model can change a status. A status changes only after Leonardo explicitly
decides it. Conflicting recommendations remain separate alternatives inside
their register entry until that decision.

## Review sequence

Discuss entries in dependency order, not numerical order:

1. central economy and repeated interaction;
2. experiment interpretation and manuscript behaviour;
3. intended reach of complicity and integrity consequences;
4. career routes, endings, and relationships;
5. comedy, world, and artistic escalation;
6. evaluation and production evidence; and
7. documentation corrections.

## Entries

| ID         | Area                   | Finding or recommendation                                              | Status               |
| ---------- | ---------------------- | ---------------------------------------------------------------------- | -------------------- |
| MR-REV-001 | Time and energy        | Close the 64-period time and energy economy                            | `accepted`           |
| MR-REV-002 | Time and energy        | Add the missing protected-break action definition                      | `accepted`           |
| MR-REV-003 | Time and energy        | Define monitoring-window counts and miss penalties                     | `accepted`           |
| MR-REV-004 | Time and energy        | Resolve break cadence and crash calibration                            | `accepted`           |
| MR-REV-005 | Pressure profile       | Decide how Supported changes pressure                                  | `accepted`           |
| MR-REV-006 | Campaign pacing        | Decide whether the Weeks 8–9 experiment gap is intended                | `accepted`           |
| MR-REV-007 | Campaign pacing        | Decide whether Weeks 15–16 need a period sink                          | `prototype required` |
| MR-REV-008 | Experiments            | Define configuration-to-outcome-band mapping                           | `accepted`           |
| MR-REV-009 | Experiments            | Define evidence-quality resolution and `suspicious`                    | `accepted`           |
| MR-REV-010 | Experiments            | Decide whether outcome bands can teach causality                       | `accepted`           |
| MR-REV-011 | Interpretation         | Decide how much interpretation the player performs                     | `accepted`           |
| MR-REV-012 | Interaction            | Specify focused-station interaction texture                            | `accepted`           |
| MR-REV-013 | Experiments            | Define sample, equipment, supply, and fatigue effects                  | `accepted`           |
| MR-REV-014 | Evidence               | Resolve evidence saturation and reachability                           | `accepted`           |
| MR-REV-015 | Institutional pressure | Catalogue promised queues, faults, limits, and requests                | `accepted`           |
| MR-REV-016 | Experiments            | Make experiment stopping legible as triage or accept its current role  | `accepted`           |
| MR-REV-017 | Manuscript             | Specify manuscript-board behaviour                                     | `accepted`           |
| MR-REV-018 | Peer review            | Define PIIM response-card satisfaction                                 | `accepted`           |
| MR-REV-019 | Manuscript             | Decide whether claim level must follow evidence support                | `accepted`           |
| MR-REV-020 | Peer review            | Decide whether reviewer reports respond to result variants             | `accepted`           |
| MR-REV-021 | Narrative              | Author or revise the Week-6 contradictory-revision beat                | `accepted`           |
| MR-REV-022 | Integrity              | Decide whether hidden misconduct needs a non-route counter-cost        | `accepted`           |
| MR-REV-023 | Integrity              | Define a visible evidence concern                                      | `accepted`           |
| MR-REV-024 | Integrity              | Resolve deferral versus denial in concern scenes                       | `accepted`           |
| MR-REV-025 | Fallback               | Restore or deliberately remove fallback mismatch discovery             | `accepted`           |
| MR-REV-026 | Complicity             | Decide how broadly players should experience complicity                | `accepted`           |
| MR-REV-027 | Integrity              | Check correction-after-omission trust effects                          | `accepted`           |
| MR-REV-028 | Morrow                 | Review Morrow access at starting evidence                              | `accepted`           |
| MR-REV-029 | Aldercroft             | Check whether experimental work is optional for the route              | `accepted`           |
| MR-REV-030 | Elena                  | Distinguish or merge PI confidence and Elena trust                     | `accepted`           |
| MR-REV-031 | Career routes          | Decide whether keeping both routes open should have a cost             | `accepted`           |
| MR-REV-032 | Ending                 | Separate or accept principled and collapse variants of End of Contract | `accepted`           |
| MR-REV-033 | Ending tone            | Test whether the ending remains bitter but human                       | `accepted`           |
| MR-REV-034 | Morrow                 | Decide Camila and Morrow's dramatic weight                             | `accepted`           |
| MR-REV-035 | Relationships          | Define high-trust support and review unused trust bars                 | `accepted`           |
| MR-REV-036 | Relationships          | Decide how visible trust bars should feel                              | `accepted`           |
| MR-REV-037 | Replay                 | Align replay intent with the Archive                                   | `accepted`           |
| MR-REV-038 | Comedy                 | Put comic voice into repeated mid-campaign actions                     | `accepted`           |
| MR-REV-039 | Comedy                 | Review optional and skippable environmental satire                     | `accepted`           |
| MR-REV-040 | Art and tone           | Resolve the meaning and channel of increasing surrealism               | `accepted`           |
| MR-REV-041 | World                  | Decide floor population and validate traversal value                   | `accepted`           |
| MR-REV-042 | Content                | Resolve the exit voice, drug template, and orphaned flag               | `accepted`           |
| MR-REV-043 | Evaluation             | Add or reject an engagement, pacing, and repetition criterion          | `accepted`           |
| MR-REV-044 | Evaluation             | Reconcile audience claims with the sole-evaluator boundary             | `accepted`           |
| MR-REV-045 | Vision                 | Reconcile continuous fun with the darkening arc                        | `accepted`           |
| MR-REV-046 | Production             | Test capacity and asset cost against the production plan               | `accepted`           |
| MR-REV-047 | Traceability           | Give `MR-REQ-VISION-001` a valid verification path                     | `accepted`           |
| MR-REV-048 | Documentation          | Align non-interactive scene-time values                                | `accepted`           |
| MR-REV-049 | Fallback               | Qualify the six-template requirement for fallback                      | `accepted`           |
| MR-REV-050 | Documentation          | Fix the decision-log table and prop-count wording                      | `accepted`           |
| MR-REV-051 | Content                | Add required reason and forecast strings within the word cap           | `accepted`           |
| MR-REV-052 | Camila                 | Specify video-call presentation                                        | `accepted`           |
| MR-REV-053 | Protected design       | Preserve the shared do-not-normalize constraints                       | `protected`          |
| MR-REV-054 | Aesthetic context      | Preserve the system's player-facing procedural integrity               | `accepted`           |
| MR-REV-055 | Evidence boundary      | Treat behavioural review claims as hypotheses                          | `protected`          |

## Current decision record

### R00 — Guardrails

- `MR-REV-053`: protect core creative identity and player-fairness choices.
  Production limits remain approved but deliberately reopenable. This decision
  does not decide whether hidden misconduct can have a non-moral time,
  relationship, or opportunity cost under `MR-REV-022`.
- `MR-REV-054`: formalize **fair rules, unfair institution**. Institutional
  pressure must not come from misleading interface behaviour.
- `MR-REV-055`: treat every behavioural prediction from a document review as a
  hypothesis until approved private play produces evidence.

### R01 — Time, pressure, and early evidence audit

- `MR-REV-001`: use the documented minimum-defensible, thorough-honest, and
  maximizing action fixtures before future implementation. The audit shows that
  thorough-honest Standard demand does not fit under optimistic assumptions.
  Do not claim that it does.
- `MR-REV-002`: add `MR-ACT-BREAK`, with a one-period, zero-energy cost and
  short act-dependent comic text.
- `MR-REV-003`: use one monitoring window for each normal run and permitted
  repeat, and two for oxygen loss. The exact missed-window penalty is deferred
  to R02.
- `MR-REV-004`: use uncapped flat recovery of two energy in Standard and three
  in Supported. The audit does not validate final crash or break calibration;
  private prototype evidence must do that.
- `MR-REV-005`: keep Supported's approved starting energy, break recovery, and
  removed late-work surcharge. Move all clear warnings to the universal player
  contract and preserve a separate Supported fixture.
- `MR-REV-006`: retain the deliberate Week 8–9 pause in laboratory templates.
  Those weeks shift to submission, administration, careers, and relationships.
- `MR-REV-007`: keep the late-game quiet tail for now. A private full-campaign
  prototype must test for forced idle waiting before any period sink is added.
- `MR-REV-014`: record current evidence bounds before any re-pricing. Thin is
  unreachable from the current starting state; required strong work can reach
  Substantial. Repeat yield and re-pricing wait for the R02 result and quality
  decision.

### R02 — Experiment resolution and interaction

- `MR-REV-008`: biological outcome uses sample condition, equipment state,
  template-specific choice, monitoring state, and locked variation. Controls
  affect evidence quality only.
- `MR-REV-009`: use the approved Usable, Inconclusive, Worth repeating, and
  Suspicious definitions and resolution priority. Suspicious does not by
  itself mean misconduct.
- `MR-REV-010`: show Robust, Mixed, or Compromised plus plain-language reasons
  before commitment, and identify player-controlled factors after resolution.
  Do not show exact probabilities.
- `MR-REV-011`: show raw observations first. The player selects one primary
  reading and at least one caveat, and both remain in later records.
- `MR-REV-012`: give the physical sample rack and imaging bay richer focused
  interaction through tray selection and evidence-view switching. Retain
  selection-and-confirm input with no dexterity test.
- `MR-REV-013`: use Stable, Stressed, and Failing samples; Ready, Limited, and
  Unavailable equipment; three active slots; exact issue-count bands; and
  zero-energy fatigue risk on evidence only. There is no finite sample-supply
  resource.
- `MR-REV-015`: reuse exactly three authored operational room states. Each has
  two or more visible routes. Optional desk work must reference a defined
  character, career, wording, or room-state object; there are no uncatalogued
  optional PI requests.
- `MR-REV-016`: stopping immediately frees the slot, loses the current sample
  and elapsed work, preserves earlier archived records, creates no evidence
  card, and identifies a relevant expiring opportunity.

### R03 — Manuscript and peer review

- `MR-REV-017`: use a fixed manuscript board with claim, figure/evidence,
  control, caveat, authorship, supplementary, and request positions. Show
  factual support requirements and allow incomplete commits.
- `MR-REV-018`: define Met, Partly Met, and Not Met for batch, oxygen, and
  claim-scope cards. Honest missing-result statements can satisfy the Citation
  transparency path but do not improve the paper card.
- `MR-REV-019`: keep every claim selectable. Careful and Strong can satisfy
  visible support rules. Honest Inflated cannot satisfy causal support; a
  changed or unsupported reading can appear to satisfy it when no visible
  contradiction exists.
- `MR-REV-020`: give each reviewer one base and one visible-state conditional
  form, selected and saved when **Helpful Comments** begins.
- `MR-REV-021`: add mandatory Week-6 `MR-TASK-REMOVE-CAUTION` through the
  existing manuscript action. **What We Had** requires both earlier commits.
  The added period and energy make the thorough-honest fixture exceed both
  pressure profiles under optimistic assumptions.
- `MR-REV-051`: require a fixed forecast key for every meaningful action and a
  fixed reason key for every material effect. The 6,000-word limit applies to
  the actual build-specific English file; excluded content is not bundled.

### R04 — Integrity, routes, endings, and relationships

- `MR-REV-022`–`024` and `027`: hidden misconduct has no automatic cost,
  detection, or moral punishment. Public contradictions are visible to
  Aldercroft, and Haoran or Gabriel mismatches are visible to Elena. A concern
  becomes serious only if unresolved at the Week-13 check. Correction resolves
  it and preserves history. Denial costs 20 trust. Deferral costs 10, creates
  one free reminder, and costs 10 more if that reminder is ignored.
- `MR-REV-025`: fallback keeps Gabriel's Archive scene, removes his Queue
  scene, keeps the basic queue routes, and permits valid concerns from any
  colleague.
- `MR-REV-026`: structural complicity exists in every campaign. Personal
  misconduct stays optional. Both pressure profiles must permit a Defensible
  run with meaningful sacrifices.
- `MR-REV-028`–`031`: Morrow requires three analysed records and one honest
  limitation or caveat. It does not require publication, a Coherent packet, a
  weak result, or drug exposure. Aldercroft requires the research plan,
  Coherent or Substantial evidence, paper confidence or Elena trust, and no
  unresolved serious concern. Publication is not required. PI confidence is
  renamed **Elena's paper confidence**. Keeping both routes open has no cost.
- `MR-REV-032`–`034` and `052`: public-record withdrawal uses a separate text
  variant without changing the 29-module count. One relationship has a
  dramatized afterbeat, and all five characters receive a consequence sentence.
  Camila's email, call, and offer have distinct functions. Her call uses the
  desk monitor, one original 2D portrait, captions, and non-lexical sounds. It
  uses no 3D model, lip sync, or full voice.
- `MR-REV-035`–`036`: each character has one bounded support result. Support
  requires a relevant supportive choice, Working-or-better trust, and no
  breach. Trust stays numeric internally but appears only as five segments, a
  descriptive state, and a factual reason.
- `MR-REV-037`: the first campaign is complete by itself. Archive has
  chronological **Departures** and a separate 12-item **Institutional
  Citations** collectible set.

### R05 — Comedy, world, and artistic escalation

- `MR-REV-038`: add five act-based queue lines, six one-time internal
  reactions, and eight one-time character lines in Weeks 1–7. They add comic
  texture without changing state or creating an unbounded dialogue system.
- `MR-REV-039`: use close-range glance display for exactly ten short
  environmental items. Keep focused inspection for the other twenty. Required
  information never depends on either type.
- `MR-REV-040`: define surrealism as plausible bureaucratic accretion. Notices,
  labels, paper, and stamps can accumulate or contradict each other, but the
  floor keeps credible architecture, scale, collision, and props.
- `MR-REV-041`: reduce the background roster through the semester. Required
  scenes and support results override it. Add no crowd simulation, roaming NPC,
  or new character model. The vertical slice records traversal and repetition
  measurements; R06 decides how to interpret them.
- `MR-REV-042`: add five act-based exit responses, one result-specific Camila
  line for an analysed drug experiment, and one Week-5 dialogue variation for
  `FLAG:openingCaution`. Drug work does not improve Morrow or PIIM eligibility.

### R06 — Evaluation and production evidence

- `MR-REV-043`: use traversal, visit, confirmation, and contextual-content
  measurements as evidence for predefined qualitative questions. Leonardo
  records pass or a concrete rework request. Do not invent a numeric pass limit
  before prototype evidence exists.
- `MR-REV-044`: prefer broad comprehension to academic precision in required
  player-facing text. Use a fresh-context Codex check for comprehension only,
  with no design documents or intended answers. Do not claim universal audience
  understanding or use the method to judge humour and emotional response.
- `MR-REV-045`: keep active play engaging and absurdist throughout. Later
  comedy can become darker and less frequent, but pressure cannot remove
  agency, discovery, responsive satire, or every comic response.
- `MR-REV-046`: retain the EUR 150 non-LLM direct-cost ceiling and add a
  Phase-1 asset feasibility check before the slice. Existing LLM subscriptions,
  token use, token limits, and resets are outside the ceiling. Do not assume
  that the fallback will become the final product.
- `MR-REV-047`: add `MR-TEST-VISION-001` and map `MR-REQ-VISION-001` to it as
  well as the content test.

### R07 — Documentation corrections

- `MR-REV-048`: distinguish the seven-scene target of 14–18 minutes and its
  current 14:45 authored total from the 60–90-second epilogue target and its
  current 75-second duration. All non-interactive content normally totals
  15–20 minutes and has an absolute 22-minute maximum.
- `MR-REV-049`: require six experiment templates in the full build and exactly
  laser/sham, combined range/repair, batch, and oxygen in the fallback.
- `MR-REV-050`: define twenty planned prop families and twenty-four as the hard
  maximum for later substitutions. Remove the blank-line interruption from the
  decision-log table. The content catalogue already has one
  `task.repairState` row, so no artificial deletion is made. Future checks
  reject interrupted tables, duplicate text keys, and conflicting numeric
  claims.

No implementation is authorized. R00–R07 are documented, and no review block
remains. Wait for Leonardo's next instruction.
