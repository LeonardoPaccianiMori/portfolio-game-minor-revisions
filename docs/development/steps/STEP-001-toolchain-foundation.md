---
id: STEP-001
type: development-step
status: leonardo-testing
phase: 1
gate: foundation
created: 2026-09-13
updated: 2026-09-13
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

- Base: `4cfff5554e1cb73712187223a592c59b45a8c328`.
- Branch: `work/step-001-toolchain`.
- Implementation commit: `d484112641eef3aca4466deb7ccd3eb763166c0d`
  (`Restore tested toolchain foundation`).
- `npm ci`: passed; 158 packages; 0 vulnerabilities.
- `npm run check`: passed; typecheck, ESLint, Prettier, 6 unit tests, and the
  content check.
- `npm run build`: passed; `dist/index.html` and one JavaScript chunk.
- `npm run test:e2e`: 3 passed (Chromium, Firefox, WebKit), no external request.
- `npm run dev`: used by the Playwright web server; the page loaded with the
  ready marker.
- `git diff --check` and `git status`: clean at the branch head.
- Integrated on local `main` at `0d8a2017e5fc483ecfad69eeebaacd2a73f55020`
  by fast-forward, and `npm run verify` passed on `main`.

## Independent review

Reviewed on 2026-09-13 by `mr-reviewer` (`opencode-go/glm-5.3`, variant `max`),
a different model family from the primary. The reviewer inspected the step
record, the B1, B2, B4, B10, C1, and C2 specifications, the complete branch
diff, and the recorded evidence.

Result: no blocker. One required record-only correction (R-1, applied) and
three advisory notes (A-1 applied; A-2 carried to STEP-018; A-3 due at
integration and acceptance). Focused primary validation of the corrections
passed.

## Corrections

Record-only corrections applied from the independent review before integration:

- **R-1:** the implementation uses a standalone validator
  (`scripts/check-content.ts`) run through `content:check` inside `check` and
  `verify`, exactly as the approved STEP-001 plan specifies. This reconciles
  B1's "Vitest for content-validation tests" wording and B4's "fails the
  build" linkage for this step: the validator's full schema form and its
  build-gate wiring arrive in STEP-018, and completeness enforcement in
  STEP-023. Recorded as `D-033`.
- **A-1:** the record dates were corrected to the actual work date,
  2026-09-13, cross-checked against commit timestamps (see the date
  convention in `docs/design/00-process.md`).
- **A-2:** validator limitations carried to STEP-018: free-text placeholder
  detection, the manifest's validated counts, and a graceful message when the
  content directory is missing.

## Leonardo decision

Plan approved 2026-09-10. Implementation and checks complete; independent
review, Leonardo testing, and acceptance pending.
