---
id: MR-WO-WP01-002
type: implementation-work-order
status: approved
work_package: MR-WP-01
sequence: 2
created: 2026-09-02
updated: 2026-09-02
base_commit: 94b12f38b36ef7acf4bd6fcc4bd344db6cd39454
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
model_selected: 2026-09-02
branch: work/MR-WP-01-campaign-state
worktree: .worktrees/MR-WP-01-campaign-state/
supersedes: MR-WO-WP01-001
---

# MR-WO-WP01-002 — Correct the Step-4 campaign-state foundation

## Objective

Correct the submitted campaign-state foundation against approved frozen
`MR-IF-002 v3`, the clarified `MR-IF-003 v1` shapes, and every blocker and
required finding from the complete Step-4 review. Do not implement commands or
change player-visible behaviour.

## Plain-language effect

Make the checked campaign-data foundation match the approved contract. It must
accept valid multi-field revisions, create the exact new-campaign facts, reject
internally inconsistent state, and serialize equivalent records identically.

## Owned paths

- `src/rules/campaign-state-codec.ts`
- `src/rules/campaign-state-schema.ts`
- `src/rules/campaign-state-types.ts`
- `src/rules/campaign-state.ts`
- `src/rules/command-contract.ts`
- `src/rules/index.ts`
- `tests/unit/MR-WP-01/campaign-state-codec.test.ts`
- `tests/unit/MR-WP-01/campaign-state.test.ts`
- `tests/unit/MR-WP-01/campaign-test-data.ts`
- `tests/unit/MR-WP-01/command-contract.test.ts`

## Prohibited paths

- `.codex/`
- `AGENTS.md`
- `README.md`
- `assets/`
- `content/`
- `docs/`
- `package-lock.json`
- `package.json`
- `src/application/`
- `src/bootstrap/`
- `src/persistence/`
- `tests/e2e/`
- `tests/fixtures/`
- `tests/unit/MR-WP-00/`
- `vite.config.ts`
- `vitest.config.ts`

## Allowed sources

- `docs/04-science-and-experiments.md`
- `docs/06-world-and-level-design.md`
- `docs/08-endings-and-state-matrix.md`
- `docs/12-content-specification.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/03-domain-model-and-state.md`
- `docs/implementation/specs/04-commands-rules-and-determinism.md`
- `docs/implementation/specs/05-calendar-scheduler-events-and-cutscenes.md`
- `docs/implementation/specs/06-content-data-and-build-profiles.md`
- `docs/implementation/specs/07-persistence-and-recovery.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP01-002.md`
- `package.json`

## Authority and traceability

- Requirements: `MR-REQ-EXP-001`, `MR-REQ-TECH-001`, and `MR-REQ-TEST-001`.
- Interfaces: frozen `MR-IF-002 v3`; data-shape subset of `MR-IF-003 v1`;
  canonical-data subset of `MR-IF-007 v1`.
- Evidence groups: complete Step-4 S03 unit boundary and S04 data shapes; no
  S12 fixture or complete acceptance row.
- Do not add an unregistered requirement ID.

## Accepted dependencies

- Steps 1–3 are accepted.
- Leonardo approved `MR-IMP-DEC-306`, `MR-IMP-OPEN-017`, and this exact order.
- Submitted base commit is `94b12f38b36ef7acf4bd6fcc4bd344db6cd39454`.
- The authority checkpoint on `main` is supplied separately and is read-only.
- No remote exists and package and configuration files remain unchanged.

## Tasks

1. Verify the exact branch, base, clean worktree, absent remote, Node, and npm.
2. Use exact `MR-CHR-*`, reviewer, room, route, and Week-1 roster identities.
3. Keep equipment, preparation, revision-task, and later authored lifecycle
   records sparse as defined by `MR-IF-002 v3`.
4. Use only `robust`, `mixed`, and `compromised` preparation and run bands.
5. Validate change sequence globally per revision and value continuity per
   exact field history. Add positive multi-field and negative gap, duplicate,
   owner, field, and initial-value cases.
6. Enforce every internally checkable S03 structural, reference, history,
   experiment, manuscript, scheduler, world, route, and conclusion invariant.
7. Canonicalize ID-keyed record order during serialization. Equivalent valid
   insertion orders must produce identical bytes.
8. Require at least one analysis caveat and use the complete ending-card effect
   facts defined by S04 and S07. Audit every command and effect data shape.
9. Replace tests that preserve invalid behaviour and add the complete semantic
   cases required by the review.
10. Run focused tests, `npm run check`, `npm run verify`, `npm run build`,
    `npm audit --audit-level=high`, and `git diff --check`.
11. Commit once with `MR-WP-01 Correct campaign-state foundation`.

## Non-goals

- No command algorithm, scheduler algorithm, persistence, content package,
  Three.js, gameplay, asset, dependency, configuration, remote, Step 5, Career
  Center, portfolio, publication, or deployment work.

## Required checks and evidence

Report every command and actual result, focused semantic coverage, full
coverage, build and browser-independent rules evidence, scope, privacy,
network, telemetry, production, package, configuration, whitespace, clean
state, and absent remote. The primary agent later runs the combined browser
checks, complete audit, and fresh correction review.

## Safety and quality boundaries

Use only approved facts. Do not guess content IDs, change a frozen interface,
weaken a test, expose raw state, add a package, contact Leonardo, delegate,
integrate, amend, rebase, use a remote, or edit `main`. You are not alone in
the repository. Preserve other work and edit only owned paths.

## Handoff

Return the exact commit, sorted files, commands and results, requirements,
interfaces, corrected review findings, limitations, and clean-state evidence.
Submitted does not mean reviewed, integrated, tested by Leonardo, or accepted.
