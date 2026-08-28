# Design Review Recommendation Register

Status: **R00 resolved; later entries unreviewed; implementation remains blocked**

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

| ID | Area | Finding or recommendation | Status |
|---|---|---|---|
| MR-REV-001 | Time and energy | Close the 64-period time and energy economy | `unreviewed` |
| MR-REV-002 | Time and energy | Add the missing protected-break action definition | `unreviewed` |
| MR-REV-003 | Time and energy | Define monitoring-window counts and miss penalties | `unreviewed` |
| MR-REV-004 | Time and energy | Resolve break cadence and crash calibration | `unreviewed` |
| MR-REV-005 | Pressure profile | Decide how Supported changes pressure | `unreviewed` |
| MR-REV-006 | Campaign pacing | Decide whether the Weeks 8–9 experiment gap is intended | `unreviewed` |
| MR-REV-007 | Campaign pacing | Decide whether Weeks 15–16 need a period sink | `unreviewed` |
| MR-REV-008 | Experiments | Define configuration-to-outcome-band mapping | `unreviewed` |
| MR-REV-009 | Experiments | Define evidence-quality resolution and `suspicious` | `unreviewed` |
| MR-REV-010 | Experiments | Decide whether outcome bands can teach causality | `unreviewed` |
| MR-REV-011 | Interpretation | Decide how much interpretation the player performs | `unreviewed` |
| MR-REV-012 | Interaction | Specify focused-station interaction texture | `unreviewed` |
| MR-REV-013 | Experiments | Define sample, equipment, supply, and fatigue effects | `unreviewed` |
| MR-REV-014 | Evidence | Resolve evidence saturation and reachability | `unreviewed` |
| MR-REV-015 | Institutional pressure | Catalogue promised queues, faults, limits, and requests | `unreviewed` |
| MR-REV-016 | Experiments | Make experiment stopping legible as triage or accept its current role | `unreviewed` |
| MR-REV-017 | Manuscript | Specify manuscript-board behaviour | `unreviewed` |
| MR-REV-018 | Peer review | Define PIIM response-card satisfaction | `unreviewed` |
| MR-REV-019 | Manuscript | Decide whether claim level must follow evidence support | `unreviewed` |
| MR-REV-020 | Peer review | Decide whether reviewer reports respond to result variants | `unreviewed` |
| MR-REV-021 | Narrative | Author or revise the Week-6 contradictory-revision beat | `unreviewed` |
| MR-REV-022 | Integrity | Decide whether hidden misconduct needs a non-route counter-cost | `unreviewed` |
| MR-REV-023 | Integrity | Define a visible evidence concern | `unreviewed` |
| MR-REV-024 | Integrity | Resolve deferral versus denial in concern scenes | `unreviewed` |
| MR-REV-025 | Fallback | Restore or deliberately remove fallback mismatch discovery | `unreviewed` |
| MR-REV-026 | Complicity | Decide how broadly players should experience complicity | `unreviewed` |
| MR-REV-027 | Integrity | Check correction-after-omission trust effects | `unreviewed` |
| MR-REV-028 | Morrow | Review Morrow access at starting evidence | `unreviewed` |
| MR-REV-029 | Aldercroft | Check whether experimental work is optional for the route | `unreviewed` |
| MR-REV-030 | Elena | Distinguish or merge PI confidence and Elena trust | `unreviewed` |
| MR-REV-031 | Career routes | Decide whether keeping both routes open should have a cost | `unreviewed` |
| MR-REV-032 | Ending | Separate or accept principled and collapse variants of End of Contract | `unreviewed` |
| MR-REV-033 | Ending tone | Test whether the ending remains bitter but human | `unreviewed` |
| MR-REV-034 | Morrow | Decide Camila and Morrow's dramatic weight | `unreviewed` |
| MR-REV-035 | Relationships | Define high-trust support and review unused trust bars | `unreviewed` |
| MR-REV-036 | Relationships | Decide how visible trust bars should feel | `unreviewed` |
| MR-REV-037 | Replay | Align replay intent with the Archive | `unreviewed` |
| MR-REV-038 | Comedy | Put comic voice into repeated mid-campaign actions | `unreviewed` |
| MR-REV-039 | Comedy | Review optional and skippable environmental satire | `unreviewed` |
| MR-REV-040 | Art and tone | Resolve the meaning and channel of increasing surrealism | `unreviewed` |
| MR-REV-041 | World | Decide floor population and validate traversal value | `unreviewed` |
| MR-REV-042 | Content | Resolve the exit voice, drug template, and orphaned flag | `unreviewed` |
| MR-REV-043 | Evaluation | Add or reject an engagement, pacing, and repetition criterion | `unreviewed` |
| MR-REV-044 | Evaluation | Reconcile audience claims with the sole-evaluator boundary | `unreviewed` |
| MR-REV-045 | Vision | Reconcile continuous fun with the darkening arc | `unreviewed` |
| MR-REV-046 | Production | Test capacity and asset cost against the production plan | `unreviewed` |
| MR-REV-047 | Traceability | Give `MR-REQ-VISION-001` a valid verification path | `unreviewed` |
| MR-REV-048 | Documentation | Align non-interactive scene-time values | `unreviewed` |
| MR-REV-049 | Fallback | Qualify the six-template requirement for fallback | `unreviewed` |
| MR-REV-050 | Documentation | Fix the decision-log table and prop-count wording | `unreviewed` |
| MR-REV-051 | Content | Add required reason and forecast strings within the word cap | `unreviewed` |
| MR-REV-052 | Camila | Specify video-call presentation | `unreviewed` |
| MR-REV-053 | Protected design | Preserve the shared do-not-normalize constraints | `protected` |
| MR-REV-054 | Aesthetic context | Preserve the system's player-facing procedural integrity | `accepted` |
| MR-REV-055 | Evidence boundary | Treat behavioural review claims as hypotheses | `protected` |

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

No implementation is authorized. `MR-REV-001` through `MR-REV-052` remain
unreviewed.
