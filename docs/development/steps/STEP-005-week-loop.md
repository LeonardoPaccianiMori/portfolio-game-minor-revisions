---
id: STEP-005
type: development-step
status: technical-review
phase: 2
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: 9341b4b7b044ccb3ddf5e758647f0bf49a069479
branch: work/step-005-week-loop
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-005 — Week loop and resources

## Objective

Make the campaign move: actions consume the week's slots and energy, the week
advances, energy recovers, resting trades progress for energy, and running out
causes a crash.

## Plain-language effect

The player spends a week on something and sees time and energy change.

## Carried reconciliations (approved with this plan)

1. A week has three action slots; each action consumes one slot and its energy
   cost. The week ends automatically when all slots are used, or early via
   `advanceWeek`. A3's "every action costs one week" wording is corrected.
2. Resting is `performAction { action: 'rest' }`; the separate `rest` command
   is removed from B3 and the code.
3. Initial meter values are recorded: standing 50, integrity 100,
   relationships 50 each.

## Owned paths

- `src/rules/` (week-loop handlers, command updates, state addition, barrel)
- `tests/unit/rules-week-loop.test.ts`, `tests/unit/rules-commands.test.ts`,
  `tests/unit/rules-prng.test.ts`, `tests/unit/rules-state.test.ts`
- `docs/design/03-pressure-and-failure.md`,
  `docs/specs/03-state-and-rules.md` (the three reconciliations)

## Prohibited paths

- `docs/**` except the step record and the two reconciliation edits;
  `AGENTS.md`, `README.md`, `opencode.json`, `.opencode/**`
- Paper and fellowship interiors, PI and complicity rules, events and
  scheduler, endings, persistence changes, interface, assets, and any release,
  licence, or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`
- `docs/specs/02-architecture.md`, `docs/specs/03-state-and-rules.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A2 (turn structure and action list); A3 (energy, crash, initial baseline);
  B3 (commands, atomic results, determinism); B10 (tests).
- STEP-005 of the C2 ordered step list; phase 2.
- Carried advisories: STEP-003 ADV-1 (rest), ADV-2 (initial values), ADV-4
  (PRNG resume and validation edge cases).

## Accepted dependencies

- STEP-004 accepted by Leonardo on 2026-09-13.
- The STEP-005 plan and its three reconciliations approved on 2026-09-13.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
week economy is tightly coupled to A2, A3, and B3, so a worker would add setup
overhead without an isolation benefit.

## Tasks

1. Add a `crashed` field to the campaign state and validation.
2. Implement `performAction`: reject when the week is lost, no slots remain, or
   the required energy is missing; apply the energy cost; when energy reaches
   zero, trigger the crash.
3. On the third action of a week before week 12, advance the week
   automatically: restore one energy (cap five) and reset the three slots.
4. Implement the crash: standing minus ten, a history entry, and the next week
   lost with no energy recovery.
5. Implement `advanceWeek`: consume a lost week without recovery, end a normal
   week early with recovery, and return an explicit `contract-finished`
   rejection once week 12 has no slots left.
6. Route `performAction` and `advanceWeek` through the dispatcher; every other
   command stays explicitly `not-implemented`.
7. Record history entries for actions, rests, crashes, and week transitions.
8. Carry the STEP-003 ADV-4 tests: PRNG resume continuity and validation edge
   cases (`null` and missing fields).
9. Update A3 and B3 for the three reconciliations.
10. Run every required check.

## Energy baseline (from A3; tunable in the slice)

Experiment −1, analyse −1, write paper −1, write fellowship −1, meet the PI 0,
colleague 0, rest +2. Start 5, +1 each normal week boundary, cap 5.

## Non-goals

- No paper, fellowship, event, or complicity rules.
- No randomness draw yet, no interface, no persistence change.
- No ending resolution; the contract end is an explicit rejection.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Rules stay pure and deterministic; no I/O and no unseeded randomness.
- Atomic results: rejections leave the state untouched.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `9341b4b7b044ccb3ddf5e758647f0bf49a069479`.
- Branch: `work/step-005-week-loop`.
- Implementation commit: `c1f9675b13ee630d524cba1019a0201f944a1452`
  (`Add week loop and resource spending`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 54 unit tests, and the
  content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 12 passed in Chromium, Firefox, and WebKit.
- `git diff --check` and `git status`: clean at the branch head.

## Independent review

Reviewed on 2026-09-13 by `mr-reviewer` (`opencode-go/glm-5.3`, variant `max`),
a different model family from the primary: no blocker and no required finding.
Three advisories were recorded with owners (A-1 at the next B3 doc touch,
A-2 as an input to STEP-011, A-3 as a B5 and STEP-034 ownership note).

## Corrections

No code or document correction was required. Advisories recorded from the
independent review:

- **A-1:** B3's `advanceWeek` row can read as restoring energy in both
  branches; the lost-week branch does not recover. Tighten the wording at the
  next B3 doc touch.
- **A-2:** week-12 terminal corners: a week-12 crash leaves the lost-week
  message while `advanceWeek` refuses with `contract-finished`, and exhausting
  week 12 through actions does not write the `contract:closed` history marker.
  Recorded as an input to the STEP-011 ending-resolver plan.
- **A-3:** the state version stays 1 while the shape gained `crashed`, so
  pre-STEP-005 saves now fail validation safely. The version and migration
  ownership decision is recorded for B5 and STEP-034 before any real save can
  outlive a schema change.

## Leonardo decision

Plan approved 2026-09-13. Implementation and checks complete; independent
review, Leonardo result review, and acceptance pending.
