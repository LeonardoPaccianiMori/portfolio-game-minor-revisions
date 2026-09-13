---
id: STEP-009
type: development-step
status: implemented
phase: 2
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: e2bbb10cdfebc20ec3e035931fe7dde5f304e45b
branch: work/step-009-events
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-009 — Events and deadlines

## Objective

Introduce the authored event engine and the five anchor events that structure
the acts: the funding review, the rent, the contamination crisis, the
fellowship deadline, and the contract decision.

## Plain-language effect

The world now pushes back on its own schedule, whether or not the player is
ready.

## Owned paths

- `src/rules/events.ts` (engine, effect registry, and catalogue)
- `src/rules/campaign-state.ts` (the pending-event field and validation)
- `src/rules/commands.ts` (the resolve command and reason codes)
- `src/rules/dispatch.ts`, `src/rules/index.ts`
- `tests/unit/rules-events.test.ts`, `tests/unit/rules-commands.test.ts`
- `tests/unit/rules-week-loop.test.ts` (extension: the two week-advance tests
  become event-aware; required because events now fire at the week boundary)
- `docs/specs/03-state-and-rules.md` (the pending-event state row and the
  resolve command row)
- `docs/design/03-pressure-and-failure.md` (the rent-choice baselines)

## Prohibited paths

- `docs/**` except the step record, the B3 rows, and the A3 rent baselines;
  `AGENTS.md`, `README.md`, `opencode.json`, `.opencode/**`
- Message-delivery interface or notices screen; review or panel outcomes;
  endings or contract epilogue; interface; persistence changes; assets; and
  any release, licence, or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`,
  `docs/design/04-narrative.md`, `docs/design/07-content-and-evaluation.md`
- `docs/specs/03-state-and-rules.md`, `docs/specs/04-content-and-data.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A2 (requests arrive as cards and through meetings); A3 (the recurring rent
  choice and its costs); A4 (the five fixed events and the act timeline); B4
  (authored events as data with conditions and effects, deterministic, fixed
  order); B3 (state, commands, atomic results).
- STEP-009 of the C2 ordered step list; phase 2.
- Carried advisory: STEP-008 ADV-6 (stable reason codes).

## Accepted dependencies

- STEP-008 accepted by Leonardo on 2026-09-13.
- The STEP-009 plan, the two contract additions, and the baselines approved on
  2026-09-13.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
event engine is tightly coupled to A4, B3, and B4, so a worker would add setup
overhead without an isolation benefit.

The one additional owned path beyond the approved plan text is
`tests/unit/rules-week-loop.test.ts`, required because the two week-advance
tests now cross into the funding-review week and must assert event-aware
behaviour.

## Tasks

1. Event engine: events as data with a stable ID, a week, an optional closed
   condition, and effect or choice descriptors; evaluate the catalogue in fixed
   order after every successful command; fire each event once, tracked by
   `event.<id>` flags; deterministic and idempotent.
2. Effect registry: PI request, standing, integrity, relationship, energy,
   action slots, stale evidence, flag, message ID, and the fellowship
   deadline outcome. All state changes are pure and clamped.
3. Pending-event state and the `resolveEvent { eventId, choiceId }` command.
4. The five anchor events with the approved baselines: funding review at week
   2; rent at week 5 with its three choices; contamination at week 6;
   fellowship deadline at week 8 (submitted or missed, standing −10); contract
   decision at week 12 once the slots are spent.
5. Dispatcher integration: evaluate events after a successful command and
   combine the effects; rejections never trigger events.
6. Record the pending-event and resolve-command rows in B3 and the rent
   baselines in A3.
7. Unit tests for determinism, one-time firing, fixed order, conditions,
   pending choices, each anchor event, the deadline outcomes, the contract
   decision, no-mutation, and the event-aware week-loop tests.
8. Run every required check.

## Non-goals

- No message-delivery interface or notices screen.
- No review or panel outcomes (STEP-010), no endings or epilogue (STEP-011).
- No interface, persistence changes, or assets.

## Events and baselines (approved; tunable in the slice)

| Event               | Week | Effect                                                                             |
| ------------------- | ---: | ---------------------------------------------------------------------------------- |
| Funding review      |    2 | adds the four fellowship requirements and a message ID                             |
| Rent                |    5 | pending choice: advance (standing −5), side job (one slot lost), borrow (Mara −10) |
| Contamination       |    6 | current evidence goes stale, standing −5, a message ID                             |
| Fellowship deadline |    8 | submitted if all four answers exist; otherwise missed and standing −10             |
| Contract decision   |   12 | contract-closed flag once the week's slots are spent                               |

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- The engine is pure and deterministic; no I/O, no clock, no unseeded
  randomness.
- Atomic results: rejections leave the state untouched.
- Player-facing text follows the A7 science-language rule.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `e2bbb10cdfebc20ec3e035931fe7dde5f304e45b`.
- Branch: `work/step-009-events`.
- Plan checkpoint: `959188a` (`Approve STEP-009 events plan`), including this
  record.
- Implementation commit: `b65d5a3665ecef704e88de24e9807b28795e7c8a`
  (`Add authored events and resolve command`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 107 unit tests (23
  new), and the content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 12 passed in Chromium, Firefox, and WebKit.
- `git diff --check` and `git status`: clean at the implementation head.
- Deviations: the recorded extension of `tests/unit/rules-week-loop.test.ts`
  was exercised (the two planned tests plus three other week-crossing tests
  made event-aware); the `docs/design/00-process.md` current-task section was
  updated early, in the evidence commit, as a one-off resume-pointer update —
  the cost snapshot and the next current-task update remain due in the
  acceptance commit (C1). No other deviation.
- Limitations: the rent choices and the other events emit message IDs but no
  interface renders them yet; events later in the catalogue still evaluate in
  the same pass while the rent choice waits, and the choice resolves through
  `resolveEvent`; a PI request inside an event that cannot apply is skipped
  silently so the rest of the event still fires; the browser tests do not
  exercise events yet because no interface consumes them.

## Independent review

Completed 2026-09-13 by `mr-reviewer` (`opencode-go/glm-5.3`, variant `max`), a
different model family from the primary: **no blocker and no required
finding**. The reviewer re-ran the claimed checks independently (typecheck,
107 unit tests, 12 browser tests), reviewed the full diff, and verified the
owned paths, the approved baselines, the B3/B5 state-and-versioning decision,
determinism and purity, and the record's accuracy. Seven advisories were
recorded.

## Corrections

No code or document correction was required. Advisories recorded from the
independent review:

- **ADV-1:** the deviation note described the early
  `docs/design/00-process.md` update as standard practice; corrected in this
  record to state it was a one-off early resume-pointer update, with the cost
  snapshot and the next current-task update still due in the acceptance commit
  (C1).
- **ADV-2:** A3 says the rent event "forces one choice per act", but no
  command is refused while a choice is pending. Raise with Leonardo at
  STEP-015 planning whether enforcement is rules-level (reject other commands
  while pending) or interface-level (a modal).
- **ADV-3:** re-anchor ADV-6 (stable PI request reason codes) to before
  STEP-015, or STEP-010 if it surfaces request outcomes; once stable codes
  exist, record event skip reasons so silently skipped PI requests become
  auditable.
- **ADV-4:** test gaps for a later test-touching cadence: rejected commands
  trigger no events; combined command-plus-event effects at dispatch level;
  the `resolveEvent` success path through `dispatch`; and the undocumented
  week-12 crash path that satisfies `weekSlotsSpent`.
- **ADV-5:** the seven message IDs emitted by the catalogue have no content
  yet; STEP-018's validator owns dangling references and C2 steps 18–20 own
  the content.
- **ADV-6:** confirm with Leonardo at STEP-010/011 planning: the week-2
  funding review against A2's "end of Act I" wording, and whether a `blank`
  fellowship answer counting as answered at the deadline is intended.
- **ADV-7:** minor hygiene for an opportunistic touch: `pendingEvent`
  validation accepts empty choices, unknown event ids, and extra keys; the
  deadline week is duplicated as the literal `8` in the catalogue instead of
  `FELLOWSHIP_DEADLINE_WEEK`.

## Leonardo decision

Plan approved 2026-09-13. Implementation complete on 2026-09-13; independent
review returned no blocker and no required finding. Integration and Leonardo's
result review pending.
