---
id: STEP-006
type: development-step
status: technical-review
phase: 2
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: 98c5ec0357c2d784abf992a817a7c77ecef48eb7
branch: work/step-006-paper-track
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-006 — Paper track

## Objective

Introduce the manuscript as a system: a visible requirements meter, evidence
objects, the PI's add/reframe/revert edits, and current-versus-stale evidence.

## Plain-language effect

The player can see what the paper needs, attach results as evidence, and watch
the PI move the goalposts and make earlier evidence stale.

## Owned paths

- `src/rules/paper.ts` (paper model, edits, evidence assignment)
- `src/rules/campaign-state.ts` (the paper field and validation)
- `src/rules/commands.ts`, `src/rules/dispatch.ts`, `src/rules/index.ts`
- `tests/unit/rules-paper.test.ts`, `tests/unit/rules-commands.test.ts`
- `docs/specs/05-persistence.md` (the development-save version decision)

## Prohibited paths

- `docs/**` except the step record and the B5 version decision;
  `AGENTS.md`, `README.md`, `opencode.json`, `.opencode/**`
- Fellowship track, PI meeting or complicity rules, events, review panel,
  endings, persistence changes, interface, assets, and any release, licence,
  or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`,
  `docs/design/04-narrative.md`, `docs/design/07-content-and-evaluation.md`
- `docs/specs/03-state-and-rules.md`, `docs/specs/04-content-and-data.md`,
  `docs/specs/05-persistence.md`, `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A2 (requirements meter, add/reframe/revert, current or stale evidence); A4
  (the paper as the MacGuffin); A7 (the science-language rule); B3 (commands,
  atomic results, determinism); B4 (stable IDs, one evidence set); B10 (tests).
- STEP-006 of the C2 ordered step list; phase 2.
- Carried advisory A-3 from the STEP-005 review (development-save version).

## Accepted dependencies

- STEP-005 accepted by Leonardo on 2026-09-13.
- The STEP-006 plan approved by Leonardo on 2026-09-13.
- The science-language rule added on 2026-09-13 (`D-039`).

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
paper model is tightly coupled to A2 and B3, so a worker would add setup
overhead without an isolation benefit.

## Tasks

1. Paper state: a framing label, a revision counter, requirements
   (`controls`, `replicates`, `mechanism`, `impact`, `presentation`) each
   `open`, `satisfied`, or `stale`, and evidence entries each `current` or
   `stale` with a track.
2. `assignEvidence`: attach a current evidence entry; reject empty or duplicate
   identifiers and leave the state untouched on rejection.
3. Pure PI edits: `add` appends an open requirement; `reframe` changes the
   framing, increments the revision, and marks every current evidence and every
   satisfied requirement stale; `revert` returns one requirement to open.
4. Validate the paper inside the campaign state and add it to the initial
   state.
5. Route `assignEvidence` through the dispatcher; every other unbuilt command
   stays explicitly `not-implemented`.
6. Unit tests for creation, validation, add, reframe, revert, assignment,
   duplicates, stale transitions, and no mutation.
7. Record the development-save version decision in B5 (carried advisory A-3).
8. Run every required check.

## Non-goals

- No fellowship or overlap behaviour (STEP-007).
- No PI meeting or complicity rules (STEP-008), no events (STEP-009), no
  review panel (STEP-010), no endings.
- No evidence generation from experiments yet; no player-visible interface.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Rules stay pure and deterministic; no I/O and no unseeded randomness.
- Atomic results: rejections leave the state untouched.
- Player-facing science text follows the A7 science-language rule.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `98c5ec0357c2d784abf992a817a7c77ecef48eb7`.
- Branch: `work/step-006-paper-track`.
- Implementation commit: `400b47e4b7d1b9df5d17e4a388e409e2cc5d915b`
  (`Add paper track with requirements and evidence`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 62 unit tests, and the
  content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 12 passed in Chromium, Firefox, and WebKit.
- `git diff --check` and `git status`: clean at the branch head.

## Independent review

Pending. The focused reviewer packet is the step record, the base and head
commits, the complete diff, the A2, A4, A7, B3, B4, B5, B10, C1, and C2
documents, and the recorded check results.

## Corrections

None yet.

## Leonardo decision

Plan approved 2026-09-13. Implementation and checks complete; independent
review, Leonardo result review, and acceptance pending.
