---
id: MR-WO-WP00-005
type: implementation-work-order
status: active
work_package: MR-WP-00
sequence: 5
created: 2026-09-02
updated: 2026-09-02
base_commit: cb19a1e99b365aa98f8dbec4e33b9fde31864a5e
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
model_selected: 2026-09-02
branch: work/MR-WP-00-application-lifecycle
worktree: .worktrees/MR-WP-00-application-lifecycle/
supersedes: null
---

# MR-WO-WP00-005 — Add the Step-3 application lifecycle

## Objective

Implement only the approved Step-3 S02 application structure: one application
controller, the exact lifecycle and safe failure state, one ordered request
queue, one controlled frame loop, reverse-order and repeat-safe shutdown,
temporary no-game adapters, public module entrances, and architecture checks.
Preserve every accepted Step-2 startup-safety behaviour and every frozen
interface.

## Plain-language effect

The page will gain one internal manager that starts and stops future game parts
in a safe order. Temporary parts stand in for systems that do not exist yet.
The player still sees the same four startup messages and no gameplay.

## Owned paths

- `src/application/controller.ts`
- `src/application/index.ts`
- `src/bootstrap/application-bootstrap.ts`
- `src/bootstrap/index.ts`
- `src/bootstrap/main.ts`
- `src/bootstrap/startup.ts`
- `src/bootstrap/temporary-adapters.ts`
- `src/platform/index.ts`
- `src/platform/timing.ts`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/unit/MR-WP-00/application-bootstrap.test.ts`
- `tests/unit/MR-WP-00/application-fakes.ts`
- `tests/unit/MR-WP-00/application.test.ts`
- `tests/unit/MR-WP-00/architecture.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`
- `tests/unit/MR-WP-00/platform-timing.test.ts`
- `tests/unit/MR-WP-00/startup.test.ts`

## Prohibited paths

- `.codex/`
- `.gitignore`
- `.npmrc`
- `.nvmrc`
- `.prettierignore`
- `AGENTS.md`
- `README.md`
- `assets/`
- `content/`
- `docs/`
- `eslint.config.js`
- `index.html`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `prettier.config.js`
- `src/audio/`
- `src/bootstrap/diagnostics.ts`
- `src/bootstrap/startup-screen.ts`
- `src/bootstrap/startup.css`
- `src/content/`
- `src/cutscenes/`
- `src/input/`
- `src/interaction/`
- `src/persistence/`
- `src/platform/compatibility.ts`
- `src/player/`
- `src/rendering/`
- `src/rules/`
- `src/ui/`
- `src/world/`
- `tests/e2e/MR-WP-00/startup-failures.spec.ts`
- `tests/fixtures/`
- `tests/unit/MR-WP-00/compatibility.test.ts`
- `tests/unit/MR-WP-00/diagnostics.test.ts`
- `tests/unit/MR-WP-01/`
- `tsconfig.json`
- `vite.config.ts`
- `vitest.config.ts`

## Allowed sources

- `AGENTS.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/development-roadmap.md`
- `docs/implementation/development-status.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/01-toolchain-and-repository.md`
- `docs/implementation/specs/02-module-architecture.md`
- `docs/implementation/specs/11-browser-performance-and-diagnostics.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP00-005.md`
- `package.json`
- `src/bootstrap/diagnostics.ts`
- `src/bootstrap/main.ts`
- `src/bootstrap/startup-screen.ts`
- `src/bootstrap/startup.ts`
- `src/platform/compatibility.ts`
- `src/platform/index.ts`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/e2e/MR-WP-00/startup-failures.spec.ts`
- `tests/unit/MR-WP-00/compatibility.test.ts`
- `tests/unit/MR-WP-00/diagnostics.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`
- `tests/unit/MR-WP-00/startup.test.ts`

## Authority and traceability

- Requirements: applicable Step-3 subsets of `MR-REQ-TECH-001` and
  `MR-REQ-TEST-001`.
- Interfaces: the Step-3 application-lifecycle subset of frozen `MR-IF-001`,
  the applicable timing and startup subset of frozen `MR-IF-014`, and the
  evidence boundary of frozen `MR-IF-015`.
- S02 groups: partial evidence for `MR-S02-FIX-001`, `MR-S02-FIX-004`,
  `MR-S02-FIX-005`, `MR-S02-FIX-006`, `MR-S02-FIX-007`, `MR-S02-FIX-009`, and
  `MR-S02-FIX-010`; preserve accepted Step-2 evidence for `MR-S02-FIX-002`.
- S12 boundary: applicable automated evidence toward `MR-S12-ACC-003`; do not
  claim that complete acceptance row.
- S13 groups: `MR-S13-CON-001`, `MR-S13-GATE-001`, `MR-S13-GIT-001`,
  `MR-S13-OWN-001`, `MR-S13-REV-001`, and `MR-S13-WO-001`.
- Step authority: Leonardo approved the exact Step-3 plan on 2026-09-02. Step
  4 and every public action remain blocked.
- Content IDs: none.

## Accepted dependencies

- Step 0 is complete.
- Gate 1 is approved.
- Steps 1 and 2 are accepted.
- Leonardo approved the exact Step-3 plan on 2026-09-02.
- The plan checkpoint is
  `cb19a1e99b365aa98f8dbec4e33b9fde31864a5e`.
- Node `24.20.0`, npm `11.19.0`, and the accepted package and lockfile remain
  unchanged.
- The repository is clean on local `main`, and no remote exists before
  activation.
- No Three.js scene, game system, production asset, licence, deployment, or
  public result exists.

## Tasks

1. Verify the exact branch, worktree, base commit, clean state, Node version,
   npm version, absent remote, and unchanged package and configuration before
   editing.
2. Add the application public entrance and a controller with the exact `new ->
starting -> ready -> stopping -> stopped` lifecycle and safe `failed` state.
   A stopped or failed controller cannot restart.
3. Use inactive factories and transfer ownership only after application
   creation succeeds. Do not start an already started Step-2 bootstrap port a
   second time.
4. Add one ordered request queue. The second request can start only after the
   first request and its required asynchronous work complete. Stop blocks new
   requests.
5. Add one controlled frame loop through a platform `TimingPort`. A frame can
   present current stable information but cannot change campaign state or
   start untracked asynchronous work.
6. Catch unexpected queued-operation, port, and frame exceptions at their
   boundaries. Convert them to the typed application fault path, disable
   further requests, stop the loop, and enter `failed` safely.
7. Stop input and the frame loop first. Close and stop completed temporary
   owners in reverse order. Clean partial startup locally before reporting a
   failure. Repeated stop must be harmless.
8. Add temporary no-game adapters that use no Three.js, DOM, IndexedDB, audio,
   real browser event, real timer, campaign, content, save, or game object.
9. Route every cross-module import through the owning module's public
   `index.ts` entrance. Reject private cross-module imports, forbidden browser
   objects, and dependency-direction violations in architecture tests.
10. Connect the controller to the accepted bootstrap path without changing
    compatibility order, diagnostics, failure presentation, cleanup, visible
    wording, or the safe Step-2 retry boundary.
11. Prove startup, partial-start failure, normal and repeated stop, concurrent
    request ordering, frames during queued work, unexpected request and frame
    failure, timing control, bootstrap ownership, and architecture boundaries
    in deterministic tests.
12. Run every required focused and complete check. Make small atomic commits
    whose messages start with `MR-WP-00`.

## Non-goals

- No implementation or completion claim for `MR-S02-FIX-003`,
  `MR-S02-FIX-008`, or complete `MR-S12-ACC-003`.
- No Three.js import, renderer, camera, scene, room, geometry, lighting,
  material, production asset, or aesthetic decision.
- No campaign state, rule, command, content, profile, save, persistence, menu,
  movement, input binding, interaction, UI system, audio, cutscene, or
  gameplay.
- No package, lockfile, dependency, configuration, threshold, coverage ignore,
  source map, or build-policy change.
- No authored text or visible wording change. Preserve `Minor Revisions`,
  `Ready`, `Startup checks passed.`, and `Game systems are not yet available.`
- No frozen specification, interface, requirement, roadmap-sequence, design,
  content, asset-manifest, authority, acceptance, or Career Center change by
  the worker.
- No telemetry, external request, network action, package installation,
  external code search, asset or licence research, remote, licence, release,
  deployment, portfolio, publication, or Step-4 work.

## Required checks and evidence

- Run the focused Step-3 Vitest files for application bootstrap, application
  lifecycle, architecture, platform timing, foundation, and startup behaviour.
- Run static import and architecture inspection for public entrances,
  dependency direction, circular imports, browser-object ownership, and the
  absence of private cross-module imports.
- Inspect lifecycle state transitions, non-restart, ordered request completion,
  stable frames during queued work, typed failure, stop ordering, partial
  cleanup, and repeat-safe cleanup against S02.
- Run `npm run check`, `npm run verify`, and `npm run build` without changing a
  package, lockfile, configuration, threshold, or coverage ignore.
- Run the applicable Step-3 `start-page.spec.ts` flows across Chromium,
  Firefox, and WebKit. Preserve the Step-2 controlled-failure flows.
- Inspect production output, privacy, and runtime network behaviour. Confirm no
  telemetry, external request, raw diagnostic output, source map, production
  console call, or automatic copy, storage, upload, send, or log path.
- Run `git diff --check`; report the exact changed files, commits, commands,
  actual results including failures, limitations, and a clean worktree.
- The primary agent later runs complete combined validation, one complete
  pre-review audit, one fresh independent OpenAI `gpt-5.6-sol` review using
  `xhigh` reasoning, integration checks, and Leonardo's local visible test.

## Safety and quality boundaries

- Preserve the exact local-only, no-runtime-network, no-telemetry, privacy,
  dependency, package, asset, and public-action boundaries.
- Do not use or store campaign data, save data, player data, browser identity,
  device detail, raw errors, stacks, paths, URLs, credentials, personal data,
  environment files, employer material, another repository, or outside input.
- Do not change a frozen interface, startup capability order, diagnostic
  catalogue, player-visible meaning, ownership boundary, or test contract.
- Do not infer a missing contract. Stop and report the affected paths,
  interfaces, tests, and safe restart condition.
- Stop for unexpected Git state, ownership overlap, missing dependency,
  unavailable required command, or a change outside this order. Do not clean,
  overwrite, adopt, or revert another participant's work.
- You are not alone in the repository. Preserve and accommodate current work,
  edit only owned paths, and report assumptions.
- Do not contact Leonardo, delegate, review, integrate, accept, use a remote,
  amend, rebase, rewrite history, or edit local `main`.

## Handoff

Submit only after the required worker checks pass or one exact block is
reported. Give the primary agent the objective, plain-language result, sorted
changed files, worker commits, exact commands and actual results including
failures, addressed requirements, interfaces, S02, S12, and S13 groups, known
limitations, bounded private implementation choices, and any requested
primary-owned correction. The word `submitted` does not mean reviewed,
integrated, tested by Leonardo, or accepted. The primary agent creates
`MR-CONTRIB-WP00-005` only after the real submission.
