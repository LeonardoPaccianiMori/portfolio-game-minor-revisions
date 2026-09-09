---
id: MR-WO-WP09-001
type: implementation-work-order
status: approved
work_package: MR-WP-09
sequence: 1
created: 2026-09-09
updated: 2026-09-09
base_commit: 3b538f1ad1955f1e55e3f44e7d6cfe2d5e7e6a37
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
model_selected: 2026-09-09
branch: work/MR-WP-09-step6-fixture-utilities
worktree: .worktrees/MR-WP-09-step6-fixture-utilities/
supersedes: null
---

# MR-WO-WP09-001 — Add Step 6 fixture utilities

## Objective

Implement the strict shared fixture types, JSON decoder, schema validator,
loader, and temporary complete-set self-tests for frozen `MR-IF-015 v2`.

## Plain-language effect

The test system can read and check one fixture package without accepting
unsafe text, unknown fields, broken references, or partial data. This order
creates no repository manifest and does not execute a campaign journey.

## Owned paths

- `tests/support/MR-WP-09/fixture-json.ts`
- `tests/support/MR-WP-09/fixture-loader.ts`
- `tests/support/MR-WP-09/fixture-schema.ts`
- `tests/support/MR-WP-09/fixture-types.ts`
- `tests/unit/MR-WP-09/fixture-contract.test.ts`

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
- `src/`
- `tests/e2e/`
- `tests/fixtures/`
- `tests/support/MR-WP-00/`
- `tests/support/MR-WP-01/`
- `tests/unit/MR-WP-00/`
- `tests/unit/MR-WP-01/`
- `tsconfig.json`
- `vite.config.ts`

## Allowed sources

- `docs/15-implementation-contract.md`
- `docs/implementation/analysis/step-06-fixture-contract.md`
- `docs/implementation/development-status.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/plans/step-06-fixture-foundation.md`
- `docs/implementation/specs/02-module-architecture.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/work-orders/MR-WO-WP09-001.md`
- `eslint.config.js`
- `package.json`
- `tests/unit/MR-WP-00/architecture.test.ts`
- `tests/unit/MR-WP-01/content-json.test.ts`
- `tsconfig.json`

## Authority and traceability

- Decision: `MR-IMP-DEC-311`.
- Requirements: `MR-REQ-TECH-001` and `MR-REQ-TEST-001`.
- Interface: frozen `MR-IF-015 v2`.
- Fixture groups: `MR-S12-FMT-001` and the schema portions of
  `MR-S12-DOC-001` and `MR-S12-EVD-001`.
- Acceptance: `MR-S12-ACC-001`, `MR-S12-ACC-002`,
  `MR-S12-ACC-043`, and `MR-S12-ACC-044`.
- Current operations: `MR-OP-S12-DECODE-FIXTURE-TEXT`,
  `MR-OP-S12-DECODE-FIXTURE-BYTES`, `MR-OP-S12-VALIDATE-SET`,
  `MR-OP-S12-LOAD-EXECUTABLE`, and `MR-OP-S12-LOAD-REFERENCE`.

## Accepted dependencies

- Steps 0–5 and Gate 4A are accepted.
- Authority commit:
  `3b538f1ad1955f1e55e3f44e7d6cfe2d5e7e6a37`.
- Campaign schema `2`; content envelope schema `1`; content version `1.1.0`.
- The complete profile is `slice`; full and fallback remain incomplete.
- The branch and worktree start clean at the exact authority commit.
- The primary supplies the authorization commit that contains this order.

## Tasks

1. Read this tracked order with
   `git show <authorization-commit>:docs/implementation/work-orders/MR-WO-WP09-001.md`
   and confirm that `base_commit` equals `HEAD`.
2. Implement all exact shared readonly types and closed unions from contract
   sections 4–6. Do not replace a closed registry with an open string.
3. Implement strict UTF-8 and JSON decoding before schema validation. Reject a
   byte order mark, non-LF input, wrong final newline count, malformed JSON,
   duplicate members including escaped duplicates, unsafe values, and invalid
   fixture structure with the exact ordered issues.
4. Implement fixture, manifest, matrix, registry, resource, route, evidence,
   and reference-only schema checks required by the v2 public utility boundary.
5. Implement controlled deep-copy loading, JSON Pointer changes, source-packet
   byte preservation, special-value expansion gates, reference-only rejection
   by the executable loader, and atomic invalid results.
6. Keep repository discovery and the final repository manifest out of this
   order. Use temporary complete in-memory sets in self-tests.
7. Add isolated positive and negative tests for each issue family, raw text,
   raw bytes, duplicate members, paths, changes, copied values, executable
   loading, reference loading, and invalid-set atomicity.

## Non-goals

- Repository fixture files, root manifest, acceptance matrix, domain runners,
  traceability audit, document audit, or final evidence document.
- S02, S03, S06, S04, S05, persistence, world, input, rendering, audio,
  performance, release, or campaign-journey execution.
- Runtime source, root content, configuration, dependency, lockfile, asset,
  network, remote, deployment, licence, visibility, or Career Center changes.

## Required checks and evidence

- Focused `fixture-contract.test.ts` execution.
- `npm run typecheck`.
- `npm run lint`.
- `npm run format:check`.
- `npm test`.
- `git diff --check`.
- Exact owned-path, clean-base, dependency, lockfile, runtime-import, and
  build-output checks.
- One commit: `MR-WP-09 Add Step 6 fixture utilities`.
- Handoff with exact commit and parent, changed files, commands and results,
  limitations, and actual model and reasoning effort.

## Safety and quality boundaries

- Invalid data returns ordered safe issues and no checked partial value.
- Public issues contain no raw source, raw error, stack trace, machine path,
  saved player data, credential, or private data.
- Inputs, byte arrays, resources, and returned values are copied and cannot be
  mutated through another reference.
- Runtime source cannot import `tests/`. Test support cannot enter `dist`.
- The worker is not alone in the repository. It must preserve other work,
  change only owned paths, and never revert another owner's changes.

## Handoff

Submission is not review, integration, Leonardo testing, or acceptance. The
primary verifies the exact five-path submission and every required check. The
primary then integrates it and runs main verification before it creates
`MR-WO-WP00-010` from the observed integrated commit.
