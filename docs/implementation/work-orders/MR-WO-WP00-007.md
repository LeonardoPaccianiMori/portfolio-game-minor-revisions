---
id: MR-WO-WP00-007
type: implementation-work-order
status: superseded
work_package: MR-WP-00
sequence: 7
created: 2026-09-02
updated: 2026-09-03
base_commit: 0fc7d39b6dbaca6ea57a3f41831041b264a0ca2d
provider: OpenAI
model: unknown
reasoning_level: unknown
model_selected: 2026-09-02
branch: work/MR-WP-00-campaign-state-diagnostic
worktree: .worktrees/MR-WP-00-campaign-state-diagnostic/
supersedes: MR-WO-WP00-006
superseded_by: MR-WO-WP00-008
---

# MR-WO-WP00-007 — Correct the private campaign-state diagnostic

This order is historical. It did not activate after the latest complete review
found a further rules-authority gap. `MR-WO-WP00-008` supersedes it.

## Objective

After `MR-WO-WP01-002` is submitted and verified, copy its exact correction
commit into the diagnostic branch, update only the approved diagnostic and
primary records that the corrected public rules boundary requires, and produce
the complete combined evidence.

## Plain-language effect

Keep the private Standard-versus-Supported page accurate after the rules
correction. The normal Step-3 page remains unchanged.

## Owned paths

- `AGENTS.md`
- `README.md`
- `docs/00-design-index.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/ai-use-log.md`
- `docs/implementation/contributions/MR-CONTRIB-WP00-006.md`
- `docs/implementation/contributions/MR-CONTRIB-WP00-007.md`
- `docs/implementation/contributions/MR-CONTRIB-WP01-001.md`
- `docs/implementation/contributions/MR-CONTRIB-WP01-002.md`
- `docs/implementation/development-roadmap.md`
- `docs/implementation/development-status.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/status.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP00-007.md`
- `docs/implementation/work-orders/MR-WO-WP01-002.md`
- `src/bootstrap/campaign-state-diagnostic.ts`
- `src/bootstrap/index.ts`
- `src/bootstrap/main.ts`
- `src/bootstrap/startup.css`
- `tests/e2e/MR-WP-00/campaign-state-diagnostic.spec.ts`
- `tests/unit/MR-WP-00/architecture.test.ts`
- `tests/unit/MR-WP-00/campaign-state-diagnostic.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`

## Prohibited paths

- `assets/`
- `content/`
- `package-lock.json`
- `package.json`
- `src/rules/`
- `tests/fixtures/`
- `tests/unit/MR-WP-01/`

## Allowed sources

- `docs/15-implementation-contract.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/03-domain-model-and-state.md`
- `docs/implementation/specs/04-commands-rules-and-determinism.md`
- `docs/implementation/specs/11-browser-performance-and-diagnostics.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP00-007.md`
- `docs/implementation/work-orders/MR-WO-WP01-002.md`
- `src/rules/index.ts`

## Authority and traceability

Requirements are `MR-REQ-TECH-001` and `MR-REQ-TEST-001`. Interfaces are
`MR-IF-002 v3`, `MR-IF-001 v1`, `MR-IF-014 v1`, and `MR-IF-015 v1`.

## Accepted dependencies

This order remains approved but inactive until the exact rules correction is
submitted and verified. The existing diagnostic and foundation amendment are
historical accepted inputs.

## Tasks

Copy only the verified rules correction, adjust the private projection if its
public data shape requires it, preserve the exact query and safe fields, run
all focused and complete checks, complete one primary audit, and commit once
with `MR-WP-00 Correct private campaign-state diagnostic`.

## Non-goals

No normal-page change, gameplay, command algorithm, save, content, Three.js,
asset, dependency, remote, Step 5, Career Center, or public action.

## Required checks and evidence

Run the focused rules and diagnostic tests, all package checks, full browser
flows, coverage, audit, scope, privacy, network, telemetry, production,
configuration, whitespace, clean-state, and absent-remote checks.

## Safety and quality boundaries

The diagnostic shows only the approved safe comparison. It does not expose
campaign ID, seed, protagonist, raw state, paths, errors, device facts, or
network data. Do not alter an expected fact merely to make a test pass.

## Handoff

Record exact copied and diagnostic commits, files, checks, correction coverage,
limitations, and the complete primary audit. Fresh independent review follows.
