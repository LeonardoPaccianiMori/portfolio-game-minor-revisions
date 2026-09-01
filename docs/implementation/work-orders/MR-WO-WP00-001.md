---
id: MR-WO-WP00-001
type: implementation-work-order
status: accepted
work_package: MR-WP-00
sequence: 1
created: 2026-09-01
updated: 2026-09-01
base_commit: 5eb5850f9f10302a4d6935577187d23dc7f4f63d
provider: OpenAI
model: gpt-5.6-terra
reasoning_level: high
model_selected: 2026-09-01
branch: work/MR-WP-00-foundation
worktree: .worktrees/MR-WP-00-foundation/
supersedes: null
---

# MR-WO-WP00-001 — S01 package baseline and basic local start page

## Objective

Create the exact S01 root package baseline, a basic local start page, and the
two foundation tests required for Step 1. The worker uses the already verified
exact Node `24.20.0` and npm `11.19.0` environment in the primary-created
isolated worktree.

## Plain-language effect

This creates the small local starting point for the game project. It can open a
page that says _Minor Revisions_ without pretending that a game, a Three.js
scene, or final visual design already exists.

## Owned paths

- `.gitignore`
- `.npmrc`
- `.nvmrc`
- `.prettierignore`
- `eslint.config.js`
- `index.html`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `prettier.config.js`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`
- `tsconfig.json`
- `vite.config.ts`
- `vitest.config.ts`

## Prohibited paths

- `.codex/`
- `AGENTS.md`
- `README.md`
- `assets/`
- `content/`
- `docs/`
- `src/`
- `tests/e2e/MR-WP-01/`
- `tests/fixtures/`
- `tests/unit/MR-WP-01/`

## Allowed sources

- `docs/15-implementation-contract.md`
- `docs/implementation/development-roadmap.md`
- `docs/implementation/development-status.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/01-toolchain-and-repository.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/status.md`
- `docs/implementation/work-orders/MR-WO-WP00-001.md`

## Authority and traceability

- Requirements: `MR-REQ-TECH-001`.
- Interfaces: `MR-IF-001` through `MR-IF-015`, frozen `v1`; do not implement,
  change, or infer a runtime signature from them in this step.
- S13 acceptance groups: `MR-S13-GATE-001`, `MR-S13-GIT-001`,
  `MR-S13-OWN-001`, `MR-S13-REV-001`, and `MR-S13-WO-001`.
- Step authority: Leonardo approved Step 1 on 2026-09-01. This order cannot
  authorize Step 2 or a later package.

## Accepted dependencies

- Step 0 is complete.
- Gate 1 is approved.
- The exact Step-1 plan is approved.
- The primary agent must confirm the exact S01 Node and npm versions and
  complete the fresh dependency review before the worker starts.

## Tasks

1. Create only the owned root configuration, package, lockfile, page, and test
   paths.
2. Use exactly the S01 direct runtime and development dependencies with exact
   version pins, `private: true`, ECMAScript modules, the exact Node engine,
   and `packageManager: npm@11.19.0`.
3. Configure the exact S01 commands, strict TypeScript, loopback-only fixed
   Vite ports, local Playwright browser path, linting, formatting, ignored
   generated paths, and no environment-file loading.
4. Make `index.html` a semantic, plain local foundation page that identifies
   _Minor Revisions_ and states that game systems are not yet available. Do
   not add a source directory, JavaScript entry module, Three.js import,
   stylesheet, control, asset, or final visual treatment.
5. Add one Node-only foundation test and one local Playwright start-page test.
   They must check the approved baseline and page meaning without making an
   external request.
6. Run `npm run check` and `npm run build`. Report actual results and make
   small atomic commits beginning `MR-WP-00`.
7. During the approved final-review correction cycle, extend only
   `tests/unit/MR-WP-00/foundation.test.ts` so the Node-only test protects the
   remaining frozen S01 configuration and lockfile-root facts. Use closed-
   object or exact-key assertions that reject prohibited extra package,
   TypeScript, or lockfile-root configuration. Do not change a configuration
   file or runtime behaviour.

## Non-goals

- No `src/` directory, runtime module, Three.js scene, game system, content,
  asset, styling system, control, save, diagnostic, loading state, error
  screen, remote, licence, release, deployment, or public action.
- No dependency substitution, package addition, global installation, external
  code search, asset research, or network action beyond the primary-approved
  package preparation.
- No edit to a primary-owned control document, work order, contribution record,
  frozen interface, requirement, design, roadmap, or acceptance decision.

## Required checks and evidence

- Use only the primary-verified exact Node `24.20.0` and npm `11.19.0`.
- Run `npm run check` and `npm run build` before submission.
- Record the exact changed files, commit identifiers, command results,
  limitations, and any required primary-owned update in the handoff.
- The primary agent will later run `npm ci`, `npm run setup:browsers`,
  `npm run check`, `npm run verify`, `npm audit --audit-level=high`,
  production inspection, no-runtime-external-request inspection, and
  `git diff --check` before independent review.

## Safety and quality boundaries

- Preserve the exact S01 dependency, package, local-only, privacy, and
  no-runtime-network boundary.
- Do not create, read, or use credentials, environment files, private data,
  employer material, external local project inputs, assets, or personal data.
- Keep the page semantic and honest about its foundation-only state. No colour
  or visual choice is final, and no accessibility meaning is established here.
- Do not change a frozen interface or make a creative, shared-contract,
  dependency, accessibility, or acceptance decision. Stop and report a
  conflict, an ownership overlap, unexpected Git state, missing requirement,
  or failed required precondition.

## Handoff

Submit only after the required worker checks pass or a block is reported. Give
the primary agent the objective, plain-language result, sorted changed files,
worker commits, exact command results including failures, addressed
requirements and S13 groups, known limitations, and any requested
primary-owned changes. The worker cannot review, integrate, or accept its own
work. The primary agent creates the formal contribution record after a real
submission because S13 defines no draft contribution-record state.
