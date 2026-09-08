---
id: MR-WO-WP01-004
type: implementation-work-order
status: approved
work_package: MR-WP-01
sequence: 4
created: 2026-09-08
updated: 2026-09-08
base_commit: 48ddfabfcbd06e9b787f230de37319766b3f9b6f
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
model_selected: 2026-09-07
branch: work/MR-WP-01-step5-content
worktree: .worktrees/MR-WP-01-step5-content/
supersedes: null
---

# MR-WO-WP01-004 — Define Step 5 content validation

## Objective

Implement the approved strict content decoding, validation, checked copies,
runtime views, profiles and connected campaign-state check. Align the opening
event identity with MR-IF-002 v6.

## Plain-language effect

Valid source data produces one safe checked content package. Invalid source
data produces ordered issues and no partial package. The evaluation slice can
retain five exact dormant state identities without shipping their later
content.

## Owned paths

- `src/content/index.ts`
- `src/content/json.ts`
- `src/content/profiles.ts`
- `src/content/references.ts`
- `src/content/schemas.ts`
- `src/content/semantics.ts`
- `src/content/source.ts`
- `src/content/types.ts`
- `src/content/views.ts`
- `src/rules/campaign-state-schema.ts`
- `src/rules/campaign-state.ts`
- `tests/unit/MR-WP-01/campaign-state-codec.test.ts`
- `tests/unit/MR-WP-01/campaign-state.test.ts`
- `tests/unit/MR-WP-01/campaign-test-data.ts`
- `tests/unit/MR-WP-01/content-json.test.ts`
- `tests/unit/MR-WP-01/content-profiles.test.ts`
- `tests/unit/MR-WP-01/content-public-boundary.test.ts`
- `tests/unit/MR-WP-01/content-references.test.ts`
- `tests/unit/MR-WP-01/content-schemas.test.ts`
- `tests/unit/MR-WP-01/content-semantics.test.ts`
- `tests/unit/MR-WP-01/content-source.test.ts`
- `tests/unit/MR-WP-01/content-views.test.ts`

## Prohibited paths

- `.codex/`
- `AGENTS.md`
- `assets/`
- `content/`
- `docs/`
- `eslint.config.js`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `scripts/`
- `src/bootstrap/`
- `src/persistence/`
- `tests/e2e/`
- `tests/unit/MR-WP-00/`
- `tsconfig.json`
- `vite.config.ts`

## Allowed sources

- `docs/04-science-and-experiments.md`
- `docs/10-ui-ux-accessibility.md`
- `docs/12-content-specification.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/analysis/step-05-content-contract.md`
- `docs/implementation/development-status.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/02-module-architecture.md`
- `docs/implementation/specs/03-domain-model-and-state.md`
- `docs/implementation/specs/04-commands-rules-and-determinism.md`
- `docs/implementation/specs/05-calendar-scheduler-events-and-cutscenes.md`
- `docs/implementation/specs/06-content-data-and-build-profiles.md`
- `docs/implementation/specs/09-input-ui-and-accessibility.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/work-orders/MR-WO-WP01-004.md`

## Authority and traceability

- Decision: `MR-IMP-DEC-310`.
- Requirements: `MR-REQ-CONTENT-001`, `MR-REQ-EXP-001`,
  `MR-REQ-TECH-001`, and `MR-REQ-UI-001`.
- Interfaces: frozen `MR-IF-002 v6`, `MR-IF-003 v3`, `MR-IF-005 v3`,
  `MR-IF-006 v3`, and `MR-IF-010 v3`.
- Content acceptance: `MR-S06-FLT-001`, `MR-S06-OBJ-001`,
  `MR-S06-REF-001`, `MR-S06-SLC-001`, `MR-S06-STR-001`, and
  `MR-S06-VAL-001`.
- S12 acceptance: `MR-S12-ACC-002`, `MR-S12-ACC-017`,
  `MR-S12-ACC-018`, `MR-S12-ACC-019`, `MR-S12-ACC-025`, and
  `MR-S12-ACC-043`.
- State/content identities: `MR-EVT-CLARIFIED`,
  `MR-REC-REVIEWER-1`, `MR-REC-REVIEWER-2`, `MR-REC-REVIEWER-3`,
  `MR-ROOM-IMAGING-BOOKING`, and `MR-ROOM-IMAGING-SERVICE-LIMIT`.

## Accepted dependencies

- Steps 0–4 and Gate 4A are accepted.
- Authority commit:
  `48ddfabfcbd06e9b787f230de37319766b3f9b6f`.
- Campaign schema 2; content envelope schema 1; content version 1.1.0.
- Compatible earlier content versions are empty.
- The branch and worktree start clean at the exact authority commit.
- The primary supplies the authorization commit that contains this order.

## Tasks

1. Read this tracked order with
   `git show <authorization-commit>:docs/implementation/work-orders/MR-WO-WP01-004.md`
   and confirm that `base_commit` equals `HEAD`.
2. Implement only the approved source, package, issue, result and immutable
   view operations in the owned `src/content/` paths.
3. Reject duplicate JSON members before normal parsing.
4. Validate strict shapes, IDs, text, references, semantic facts, profile
   closure and deterministic issue order.
5. Return checked copies. Do not retain or mutate source input.
6. Implement `validateCampaignStateAgainstContent` with the exact five-ID
   evaluation-slice exception and the existing S03 `CheckedResult`.
7. Replace the stored opening event identity with `MR-EVT-CLARIFIED` without
   changing the scene identity.
8. Add the isolated positive and negative tests in the owned test paths.

## Non-goals

- Assets, Three.js, source I/O, build/startup wiring and root content.
- Command, scheduler, persistence or dynamic input-binding execution.
- Creative prose, shared-rule decisions or campaign schema migration.
- Dependencies, lockfile, configuration, network or remote changes.

## Required checks and evidence

- Focused WP01 content tests.
- Campaign-state codec and state tests.
- `npm run check`.
- `npm run test:coverage`.
- `npm run build` using the existing pre-WP00 successful build.
- `git diff --check`.
- Exact owned-path and no-dependency checks.
- One commit: `MR-WP-01 Define Step 5 content validation`.
- Handoff with exact commit and parent, files, commands and results,
  limitations, and actual model and reasoning effort.
- The later assembled candidate also runs `npm run content:check`,
  `npm run test:build-profiles`, `npm run build:slice`, and the amended
  `npm run verify`.

## Safety and quality boundaries

- No raw content, absolute path, stack trace, saved player data or machine
  detail in public issues.
- No arbitrary campaign path, executable expression, partial package or input
  mutation.
- No network, telemetry, asset, dependency or campaign migration.
- The worker is not alone in the repository. It must preserve other work,
  change only owned paths and never revert another owner's changes.

## Handoff

Submission is not review, integration, Leonardo testing or acceptance. The
primary verifies the submitted commit, assembles WP07 and WP00 work, completes
the primary audit and obtains a fresh Sol xhigh implementation review before
main integration.
