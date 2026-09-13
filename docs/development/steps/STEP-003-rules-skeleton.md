---
id: STEP-003
type: development-step
status: technical-review
phase: 1
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: 5f8f3f72913185f75dfaf1392d25f623a97273f4
branch: work/step-003-rules-skeleton
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-003 — Rules skeleton

## Objective

Introduce the pure rules layer so the game's decisions become a deterministic,
serializable, testable engine separate from the screen.

## Plain-language effect

The campaign state exists, can be created, checked, and stored as plain data,
and can be reproduced exactly from its seed. Every command returns an explicit
result, and nothing can half-happen.

## Owned paths

- `src/rules/` (state types, validation, initial-state factory, seeded PRNG,
  command and result contracts, dispatcher, barrel)
- `tests/unit/rules-state.test.ts`, `tests/unit/rules-prng.test.ts`,
  `tests/unit/rules-commands.test.ts`

## Prohibited paths

- `docs/**` except the step record; `AGENTS.md`, `README.md`, `opencode.json`,
  `.opencode/**`
- Week-loop and resource rules, paper and fellowship interiors, PI and
  complicity rules, persistence, 3D, interface, content, assets, and any
  release, licence, or deployment action

## Allowed sources

- `docs/specs/02-architecture.md`, `docs/specs/03-state-and-rules.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B3 (state, commands, atomic results, seeded PRNG, honest forecasts, explicit
  rejections, versioning); B2 (rules purity: deterministic, serializable, no
  I/O); B10 (test layers).
- STEP-003 of the C2 ordered step list; phase 1, gate `foundation`.

## Accepted dependencies

- STEP-002 accepted by Leonardo on 2026-09-13.
- The STEP-003 plan approved by Leonardo on 2026-09-13.

## Plan

The primary implements this core layer. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
rules contracts are tightly coupled to B3, so a worker would add setup overhead
without an isolation benefit.

## Tasks

1. Campaign state types and an initial-state factory: version, seed, PRNG
   state, week, actions left, energy, standing, integrity, relationships,
   history, and flags. The paper and fellowship fields arrive with their own
   steps and extend the validator then.
2. State validation that rejects malformed values, unknown versions, and
   out-of-range resources.
3. A seeded PRNG with a deterministic sequence, range guarantees, and a
   serializable internal state. No rule uses wall-clock or unseeded randomness.
4. Command and result contracts: the typed commands and results. Success
   returns a new state plus plain-data effects; rejection returns a stable
   reason code and leaves the state untouched.
5. A dispatcher that validates commands and returns explicit rejections until
   each command's rules land in its own step. Tests prove no partial mutation.
6. Unit tests for state creation, validation, serialization round-trip, PRNG
   determinism and range, and command rejection atomicity.
7. Run every required check.

## Non-goals

- No resource costs or week advancement rules (STEP-005).
- No paper or fellowship interiors (STEP-006 and STEP-007).
- No PI or complicity rules (STEP-008).
- No persistence (STEP-004), no player-visible change, and no assets.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Rules are pure: no DOM, Three.js, IndexedDB, Web Audio, or network.
- The state is plain serializable data with no functions or class instances.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `5f8f3f72913185f75dfaf1392d25f623a97273f4`.
- Branch: `work/step-003-rules-skeleton`.
- Implementation commit: `c93782de6d355ad66ea702a9b8a931de2a5b5fd3`
  (`Add deterministic rules skeleton`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 34 unit tests, and the
  content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 6 passed in Chromium, Firefox, and WebKit with no
  external request.
- `git diff --check` and `git status`: clean at the branch head.

## Independent review

Reviewed on 2026-09-13 by `mr-reviewer` (`opencode-go/glm-5.3`, variant `max`),
a different model family from the primary: no blocker and no required finding.
Four advisories were recorded with owners (ADV-1 and ADV-2 with the STEP-005
plan, ADV-3 before or with STEP-004, ADV-4 at the next rules-touching step).

## Corrections

No code correction was required. Advisories recorded from the independent
review:

- **ADV-1:** `rest` appears both in the A2 action list and as the B3 `rest`
  command. The duplication is faithful to both approved sources, but it must be
  resolved before STEP-005 gives rest real behaviour: does resting use
  `performAction { action: 'rest' }`, the `rest` command, or one canonical
  form? Owner: primary, with the STEP-005 plan and Leonardo's decision.
- **ADV-2:** the initial standing, integrity, and relationship values are
  unrecorded tuning choices; record them as proposed baseline values with the
  STEP-005 plan.
- **ADV-3:** bound `seed` and `rngState` to `[0, 4294967295]`, and decide the
  extra-key strictness deliberately, before or with STEP-004.
- **ADV-4:** add a PRNG resume test and validation edge-case tests (null and
  missing fields) at the next rules-touching step.

## Leonardo decision

Plan approved 2026-09-13. Implementation and checks complete; independent
review, Leonardo result review, and acceptance pending.
