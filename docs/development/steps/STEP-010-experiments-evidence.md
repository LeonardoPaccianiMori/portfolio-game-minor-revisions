---
id: STEP-010
type: development-step
status: implemented
phase: 2
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: b9d7f8c6bb58ae0cf3942252d486de5fbaa5c13f
branch: work/step-010-experiments-evidence
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-010 — Experiments and evidence flow

## Objective

Make research progress real: experiment assignments, results that become
evidence, manuscript write-up that satisfies requirements, analysis that
recovers stale evidence, and the request beats that give the paper its
requirements, so the STEP-011 review has a manuscript to judge.

## Plain-language effect

Working in the lab now produces results, results become the paper, and the PI's
requests define what the paper still needs. The week-8 deadline now costs
action time to meet, like everything else.

## Roadmap amendment (approved with this plan)

The original 37-step list had no owner for experiment-to-evidence progression
(recorded at STEP-006 as "the next evidence-flow step"). With Leonardo's
approval on 2026-09-13, this step is inserted as STEP-010. Every later step
shifts by one: review and panel becomes STEP-011, endings STEP-012, the world
phase STEP-013 to STEP-018, the first-playable gate after STEP-018, the slice
gate after STEP-020, the content-complete gate after STEP-024, the
feature-complete gate after STEP-036, and final acceptance STEP-038.
`docs/specs/12-development-steps.md` carries the updated list. Historical step
records keep their original numbers as history.

## Owned paths

- `src/rules/experiments.ts` (new: assignments, step counts, start, advance,
  and result rules)
- `src/rules/campaign-state.ts` (the `experiments` field and validation)
- `src/rules/commands.ts` (the start command and the new reason codes)
- `src/rules/week-loop.ts` (action effects and the shared work-spend helper)
- `src/rules/evidence.ts` (finished results as the only evidence source; gating)
- `src/rules/fellowship.ts` (answering spends one slot and one energy; gating)
- `src/rules/events.ts` (three request beats and the reframe beat)
- `src/rules/dispatch.ts`, `src/rules/index.ts`
- `tests/unit/rules-experiments.test.ts` (new),
  `tests/unit/rules-evidence.test.ts`, `tests/unit/rules-fellowship.test.ts`,
  `tests/unit/rules-week-loop.test.ts`, `tests/unit/rules-events.test.ts`,
  `tests/unit/rules-commands.test.ts`
- `docs/specs/03-state-and-rules.md` (state and command rows),
  `docs/design/02-core-loop.md` (the concrete experiment model),
  `docs/design/03-pressure-and-failure.md` (the answer action cost),
  `docs/specs/12-development-steps.md` (roadmap amendment),
  `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed files and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Review and panel scoring or outcomes; endings, ejection, or burnout;
  written content; interface; persistence changes; assets; any release,
  licence, or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`,
  `docs/design/04-narrative.md`, `docs/design/07-content-and-evaluation.md`
- `docs/specs/01-toolchain.md`, `docs/specs/03-state-and-rules.md`,
  `docs/specs/04-content-and-data.md`, `docs/specs/05-persistence.md`,
  `docs/specs/07-interface-and-accessibility.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A2 (experiments as assignments of two to four steps; start, advance, pause,
  and repeat; writing as a normal action); A3 (action costs, the answer work,
  escalation, stale evidence); A4 (the PI's escalating requests and the
  reframe); B3 (state, commands, atomic results); B4 (stable IDs, one evidence
  set, authored events as data); B7 (the desk board consumes these commands).
- STEP-010 of the amended C2 list; phase 2.
- Carried advisories: STEP-006 A-4 (evidence-flow gating; resolved by this
  step), STEP-008 ADV-6 (stable PI request reason codes; re-anchored by
  STEP-009 ADV-3 to before STEP-015, and still deferred because this step does
  not surface request outcomes), and STEP-009 ADV-6 (the week-2 funding review
  against A2's "end of Act I" wording and the blank-answer deadline question;
  carried into the STEP-011 plan for Leonardo's confirmation).

## Accepted dependencies

- STEP-009 accepted by Leonardo on 2026-09-13.
- The STEP-010 plan, the roadmap amendment, and the baselines approved on
  2026-09-13.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
change is tightly coupled to the existing rules modules and one session can
hold it.

## Tasks

1. The experiment model: a top-level `experiments` list; each assignment has a
   stable id, its paper requirement, a step counter, a step count, and a state
   (`running`, `paused`, `done`, or `attached`). One assignment runs at a time;
   starting another pauses the current one; starting an unfinished requirement
   again resumes it.
2. The `startExperiment { requirementId }` command: the requirement must exist
   in the meter; the command is free, gated against a lost week and the
   finished contract, and records a history entry and a stable effect.
3. Action effects: `experiment` advances the running assignment and completes
   it on its last step; `analyse` refreshes the oldest stale attached evidence;
   `write-paper` satisfies the oldest non-satisfied requirement that has
   current attached paper or both evidence. Each refuses cleanly when it has
   nothing to do and otherwise spends its slot and energy exactly as today.
4. `assignEvidence { evidenceId, track }` now accepts only a finished,
   unattached assignment id, creates the evidence entry, marks the assignment
   attached, keeps the overlap flag, and is gated against a lost week and the
   finished contract.
5. `answerRequirement` spends one slot and one energy on the
   proposal-writing work, with the same gates as the other work actions.
6. Four catalogue events in fixed order: week 3 adds controls and replicates,
   week 4 adds mechanism, week 7 reframes the paper to "agricultural impact"
   (staling satisfied requirements, framing-dependent answers, and current
   evidence) then adds impact and presentation, each with a message id.
7. Extend the event effect registry with the reframe effect.
8. Record the state and command rows in B3, the experiment model and baselines
   in A2, and the answer cost in A3.
9. Unit tests: start, resume, pause, advance, completion, attach (all three
   tracks, overlap, duplicates, not ready, unknown), write-up ordering, the
   stale-recovery path, analyse, the three request beats, the reframe beat, the
   answer cost, gating, no mutation, and determinism; update the affected
   existing suites.
10. Run every required check.

## Baselines (approved; tunable in the slice)

| Requirement  | Assignment steps |
| ------------ | ---------------: |
| controls     |                3 |
| replicates   |                3 |
| mechanism    |                4 |
| impact       |                2 |
| presentation |                2 |

- Answering one fellowship requirement: one action slot and one energy.
- Request beats: week 3 (controls, replicates), week 4 (mechanism), week 7
  (reframe plus impact, presentation).

## Non-goals

- No review or panel scoring, verdicts, or outcomes (STEP-011).
- No endings, ejection, or burnout (STEP-012).
- No written text, interface, persistence changes, or assets.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Pure and deterministic rules; no I/O, no clock, no unseeded randomness.
- Atomic results: rejections leave the state untouched; stable reason codes.
- Player-facing IDs stay plain and lowercase; the science-language rule is
  respected once text exists.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `b9d7f8c6bb58ae0cf3942252d486de5fbaa5c13f`.
- Branch: `work/step-010-experiments-evidence`.
- Plan checkpoint: `c2c925c` (`Approve STEP-010 experiments and evidence
plan`), including this record and the roadmap amendment.
- Implementation commit: `4dae5198e60b36c7951a89a1e4aeb776d1c22f69`
  (`Add experiments and evidence flow`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 128 unit tests (21
  new), and the content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 12 passed in Chromium, Firefox, and WebKit.
- `git diff --check` and `git status`: clean at the branch head.
- Corrections commit: `1c475cc` (`Add STEP-010 review correction tests`).
- Deviations: the assignment state shape (`ExperimentAssignment` and
  `ExperimentState`) lives in `campaign-state.ts` with the other state shapes,
  while `experiments.ts` owns the step counts and the start, advance, and
  write-up rules; the shared work-spend helper lives in `week-loop.ts`. No
  path outside the approved list changed.
- Limitations: no interface consumes the new commands yet, so the browser
  tests do not exercise the loop; the slice baselines are not yet balanced by
  a full run, which the first-playable and slice gates own; the new message
  ids have no content until the content phase; events now number eight, and a
  full-run exercise of the week-7 reframe awaits the first playable.

## Independent review

Completed 2026-09-13 by `mr-reviewer` (`opencode-go/glm-5.3`, variant `max`), a
different model family from the primary: **no blocker and two required
findings**, both corrected in this step. The reviewer re-ran the claimed
checks independently (typecheck, 124 unit tests, 12 browser tests), verified
the approved plan and baselines, owned paths, purity and atomicity, the event
flags and fixed order, the persistence decision, and the record. Five
advisories were recorded.

A fresh re-review by the same configured reviewer completed the same day after
the corrections: **no blocker and no required finding**. It re-ran the checks
at the corrections head (128 unit tests, 12 browser tests), verified every
R-1 test and the R-2 record fix against the source records, and confirmed that
the corrections touched only owned test files and the step record. It added
two advisories (ADV-R1 and ADV-R2).

## Corrections

- **R-1 (required):** three plan-promised test areas were missing: a
  fellowship-track attach success, the `answerRequirement` gates
  (`week-lost`, `no-actions-left`, `contract-finished`, `insufficient-energy`),
  and the repeat path that mints a new assignment after a finished one, plus
  freeness and purity coverage for the new work actions. Added in `1c475cc`;
  the suite is now 128 unit tests (21 new).
- **R-2 (required):** the "Authority and traceability" carry line mis-cited
  the stable-reason-codes advisory as STEP-009 ADV-6 (it is STEP-008 ADV-6,
  re-anchored by STEP-009 ADV-3) and dropped the real STEP-009 ADV-6
  (week-2 funding-review timing and the blank-answer deadline question). The
  line now records both correctly, marks STEP-006 A-4 resolved by this step,
  and carries STEP-009 ADV-6 into the STEP-011 plan.

Advisories recorded from the independent review:

- **ADV-1:** the rules modules now have import cycles (campaign-state →
  evidence, and campaign-state → fellowship → week-loop → campaign-state).
  They are safe today because every cross-module reference is function-level
  and the build, tests, and browsers confirm it, but the state module should
  not depend on the action engine. Refactor at the next rules touch (a leaf
  constants or work-spend module).
- **ADV-2:** reason-code precedence is not uniform across the changed
  commands (some gate before validation, some validate first). The B4
  reason-code list should fix one documented precedence at a later step.
- **ADV-3:** the bare `write-fellowship` and `meet-pi` actions still pass the
  gates and spend a slot and energy with no effect; the desk board must not
  expose them as meaningless waste. The interface step owns this.
- **ADV-4:** `validateExperiments` is shape-only and does not enforce the
  rules' invariants (one running assignment, done implies full steps, attached
  implies matching evidence, canonical ids). Recorded for the next
  state-model touch.
- **ADV-5:** minor test-depth items for the next test-touching cadence: the
  fellowship side of the week-7 reframe, more `validateExperiments` branches,
  and a dispatch-level multi-week playthrough (awaiting the first playable).

Advisories recorded from the re-review:

- **ADV-R1:** the R-2 carry line quotes STEP-009 ADV-3's "before STEP-015"
  anchor, but under the roadmap amendment the desk-board step that surfaces
  request outcomes is now STEP-016 (old 015). The quote is historical; the
  next record or plan touch should note the renumbered anchor.
- **ADV-R2:** `assignEvidence`'s freeness (no slot or energy spend) is only
  structural; add a direct assertion at the next test-touching cadence.

## Leonardo decision

Plan approved 2026-09-13, including the roadmap amendment and the baselines.
Implementation complete on 2026-09-13; the independent review returned no
blocker and two required corrections, which were applied and passed a fresh
re-review with no blocker and no required finding. Integration and Leonardo's
result review pending.
