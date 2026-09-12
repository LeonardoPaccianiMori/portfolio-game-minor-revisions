---
id: STEP-001
type: development-step
status: plan-approved
phase: 1
gate: foundation
created: 2026-09-10
updated: 2026-09-10
base_commit: 4cfff5554e1cb73712187223a592c59b45a8c328
branch: work/step-001-toolchain
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-001 — Toolchain and repository foundation

## Objective

Establish the exact, tested foundation from B1 so every later step builds on
verified tooling.

## Plain-language effect

The repository becomes a working local project again: `npm run dev` opens the
start page, and the quality commands pass.

## Owned paths

- `package.json`, `package-lock.json`, `.npmrc`, `.nvmrc`
- `tsconfig.json`, `eslint.config.js`, `prettier.config.js`,
  `.prettierignore`
- `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`
- `index.html`, `src/main.ts`
- `content/manifest.json` and the empty content subdirectories
- `scripts/check-content.ts`
- `tests/unit/foundation.test.ts`, `tests/e2e/start-page.spec.ts`
- `.gitignore`

## Prohibited paths

- `docs/**`, `AGENTS.md`, `README.md`, `opencode.json`, `.opencode/**`
- Any game system beyond the start page, and any asset, remote, licence,
  release, or deployment action

## Allowed sources

- `docs/specs/01-toolchain.md`, `02-architecture.md`, `03-state-and-rules.md`,
  `10-testing-and-workflow.md`, `11-development-pathway.md`,
  `12-development-steps.md`
- `docs/design/06-world-and-presentation.md`,
  `07-content-and-evaluation.md`, `08-production-constraints.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B1 toolchain and repository; B2 architecture; A8 production constraints;
  B10 workflow.
- STEP-001 of the C2 ordered step list; phase 1, gate `foundation`.

## Accepted dependencies

- Phases A, B, and C approved.
- The STEP-001 plan approved by Leonardo on 2026-09-10.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used:
the config and tests are small and tightly coupled to the specifications, so
a worker would add setup overhead without an isolation benefit.

## Tasks

1. Verify a clean install and the exact pins: Node 24.20.0, npm 12.0.2, and
   the committed dependency versions.
2. Confirm strict TypeScript across root configs, `src/`, `tests/`, and
   `scripts/`.
3. Confirm ESLint and Prettier rules for each path group.
4. Confirm Vite and build the minimal start page: `index.html` plus
   `src/main.ts` with the title and a neutral line.
5. Confirm Vitest and Playwright configuration for the three browsers.
6. Add `content/manifest.json`, the empty content subdirectories, and
   `scripts/check-content.ts`.
7. Update `package.json` scripts: `content:check`, `check`, and `verify`.
8. Add the foundation unit test and the start-page browser test.
9. Run every required check.

## Non-goals

- No application coordinator or lifecycle (STEP-002).
- No rules, state, 3D, interface, content, or assets.
- No coverage gate in this step; it is enabled from STEP-003 when rules code
  exists.
- No remote, licence, release, or deployment action.

## Required checks and evidence

- `npm ci`
- `npm run check`
- `npm run build`
- `npm run test:e2e`
- A `npm run dev` smoke test
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Local only. The clean install and local browser checks are the only
  authorized network uses.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

Not yet available.

## Independent review

Not yet available.

## Corrections

None yet.

## Leonardo decision

Plan approved 2026-09-10. Implementation, testing, and acceptance pending.
