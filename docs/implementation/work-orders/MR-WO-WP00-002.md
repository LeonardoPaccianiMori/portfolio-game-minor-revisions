---
id: MR-WO-WP00-002
type: implementation-work-order
status: superseded
work_package: MR-WP-00
sequence: 2
created: 2026-09-01
updated: 2026-09-01
base_commit: 1b06ee5933de302c00cee7efa394d0b7ac19c0b5
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
model_selected: 2026-09-01
branch: work/MR-WP-00-startup-safety
worktree: .worktrees/MR-WP-00-startup-safety/
supersedes: null
---

# MR-WO-WP00-002 — Startup compatibility, diagnostics, and safe errors

## Objective

Implement only the approved Step-2 startup-safety subset: the exact S11
six-capability compatibility report and probe lifecycle, sanitized diagnostics,
the factual Checking browser and Ready states, blocking compatibility messages,
and the safe fatal-error presentation. Preserve the accepted Step-1 package
baseline and every frozen interface.

This work order is historical evidence. Leonardo first approved
`MR-WO-WP00-003` after independent review found one ownership blocker and two
technical findings. Primary activation inspection then found another unowned
private import. Leonardo approved `MR-WO-WP00-004` on 2026-09-01. It
supersedes the incomplete correction order and is the only authority for the
review corrections.

## Plain-language effect

The local page checks whether the browser can support the future game. It then
shows a factual Ready result, one optional controller message, all required
blocking reasons together, or one safe fatal message. It still contains no
Three.js scene or game system.

## Owned paths

- `index.html`
- `src/bootstrap/diagnostics.ts`
- `src/bootstrap/main.ts`
- `src/bootstrap/startup-screen.ts`
- `src/bootstrap/startup.css`
- `src/bootstrap/startup.ts`
- `src/platform/compatibility.ts`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/e2e/MR-WP-00/startup-failures.spec.ts`
- `tests/unit/MR-WP-00/compatibility.test.ts`
- `tests/unit/MR-WP-00/diagnostics.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`
- `tests/unit/MR-WP-00/startup.test.ts`

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
- `src/audio/`
- `src/content/`
- `src/cutscenes/`
- `src/input/`
- `src/interaction/`
- `src/persistence/`
- `src/player/`
- `src/rendering/`
- `src/rules/`
- `src/ui/`
- `src/world/`
- `tests/e2e/MR-WP-01/`
- `tests/fixtures/`
- `tests/unit/MR-WP-01/`

## Allowed sources

- `AGENTS.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/development-roadmap.md`
- `docs/implementation/development-status.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/01-toolchain-and-repository.md`
- `docs/implementation/specs/02-module-architecture.md`
- `docs/implementation/specs/09-input-ui-and-accessibility.md`
- `docs/implementation/specs/10-rendering-resources-assets-and-audio.md`
- `docs/implementation/specs/11-browser-performance-and-diagnostics.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP00-002.md`
- `index.html`
- `package.json`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`

## Authority and traceability

- Requirements: applicable Step-2 subsets of `MR-REQ-TECH-001` and
  `MR-REQ-TEST-001`.
- Interfaces: the early-startup subset of frozen `MR-IF-001`, the
  bootstrap-owned startup and fatal presentation subset of frozen `MR-IF-010`,
  the compatibility and sanitized-diagnostic subset of frozen `MR-IF-014`, and
  the applicable evidence boundary of frozen `MR-IF-015`.
- S02 route: only the early compatibility and fatal-startup parts of
  `MR-S02-FIX-002` and `MR-S02-FIX-009`; do not claim the complete application
  lifecycle exists.
- S11 groups: implement and test `MR-S11-CMP-001` and `MR-S11-DIA-001`; do not
  implement or claim `MR-S11-PERF-001`.
- S12 rows: produce Step-2 evidence toward `MR-S12-ACC-034` and
  `MR-S12-ACC-037`; do not claim a complete cross-system acceptance row or
  create S12 fixture files.
- S13 groups: `MR-S13-CON-001`, `MR-S13-GATE-001`, `MR-S13-GIT-001`,
  `MR-S13-OWN-001`, `MR-S13-REV-001`, and `MR-S13-WO-001`.
- Step authority: Leonardo approved this exact Step-2 plan on 2026-09-01.
  Step 3 and every public action remain blocked.
- Content IDs: none.

## Accepted dependencies

- Step 0 is complete.
- Gate 1 is approved.
- Step 1 is accepted.
- The exact Step-2 plan is approved.
- The clean plan checkpoint is
  `1b06ee5933de302c00cee7efa394d0b7ac19c0b5`.
- Node `24.20.0`, npm `11.19.0`, and the accepted lockfile remain unchanged.
- The primary agent created the exact branch and worktree before the worker
  starts.

## Tasks

1. Preserve the exact package, lockfile, tool configuration, dependency, and
   loopback-only boundaries. Add no package and change no version.
2. Change `index.html` into the module entry shell. Keep a safe factual fallback
   and a static non-module message for a browser that cannot run modules.
3. Implement an immutable version-1 compatibility record with exactly
   `esModules`, `webgl2`, `indexedDb`, `webAudio`, `pointerLock`, and
   `controller` in that order. Use only the approved fields and stable safe
   reason codes.
4. Implement one single-active asynchronous check. A concurrent request
   returns the typed already-running result. Cancellation and retry must close
   or release all temporary resources before the next complete check.
5. Use one temporary canvas and native WebGL2 context with `alpha: false`,
   `antialias: true`, `depth: true`, `preserveDrawingBuffer: false`, and
   `stencil: false`. Do not import Three.js or retain a graphics object.
6. Use only the empty temporary IndexedDB database
   `minor-revisions-capability-probe`. Create no store, read no database, close
   the handle, request deletion, and settle cleanup before returning.
7. Check only interface presence for Web Audio, pointer lock, and controller.
   Do not request permission, create an audio context, enter pointer lock, or
   read controller data.
8. Implement the factual `Checking browser` and `Ready` states. The Ready view
   must state that startup checks passed and game systems are not yet
   available. Mark all minimal colour and layout work as temporary foundation
   presentation.
9. Present all required blocking reasons together with the exact S11 text, the
   statement that campaign data did not change, safe local guidance, and one
   semantic `Retry Check` control. Present the exact optional controller
   message without blocking readiness.
10. Convert only closed typed fault input into the exact version-1 sanitized
    diagnostic. Enforce stable code, severity, phase, module, operation,
    package build version, nullable content and graphics values, six safe
    capability statuses or null, at most eight approved context codes, closed
    recovery actions, canonical key order, and a maximum 2-KiB UTF-8 copy form.
11. Exclude every prohibited diagnostic value in S11. Keep the record in memory
    only. Copy only after a user action. Never store, upload, send, log, copy,
    or reload automatically. Use the fixed non-recursive fallback when
    conversion fails.
12. Install the approved early fatal boundary and present the exact S09 fatal
    sentence, plain explanation, sanitized issue code, `Copy Diagnostic`, and
    `Reload Page`. Do not create an application controller or later lifecycle.
13. Keep startup screen changes atomic and semantic. Preserve immediate text,
    visible focus, keyboard operation, no typewriter effect, and no invented
    percentage or early success claim.
14. Implement test-only dependency injection through private typed adapters.
    Do not add a production query, URL, environment, global, or hidden switch.
15. Update the accepted foundation tests only where Step 2 changes their former
    no-runtime expectation. Add the approved unit and browser tests. Add no S12
    fixture file.
16. Run the focused unit and browser tests, `npm run check`, and
    `npm run build`. Make small atomic commits whose messages start with
    `MR-WP-00`.

## Non-goals

- No Step-3 `src/application/` controller, lifecycle, request queue, frame
  loop, shutdown system, or temporary application adapters.
- No Three.js import, renderer, camera, scene, room, geometry, lighting,
  material, asset, game system, campaign, rule, content, save, setting, audio
  object, pointer-lock request, controller reading, or production aesthetic.
- No S11 performance implementation or claim, S12 fixture, traceability
  manifest, browser-support claim, performance result, loading measurement,
  memory result, play result, or complete S02/S09 claim.
- No package, lockfile, dependency, configuration, work-order, contribution,
  authority, design, specification, interface, roadmap, acceptance, licence,
  remote, release, deployment, portfolio, Career Center, or public change.
- No network action, global installation, external code search, asset research,
  or outside-repository input.

## Required checks and evidence

- Verify the exact branch, worktree, base commit, clean state, Node `24.20.0`,
  and npm `11.19.0` before editing.
- Run focused tests for the exact six entries and order; supported, degraded,
  and blocked aggregation; each required failure; multiple failures; optional
  controller absence; active-operation rejection; cancellation cleanup; retry;
  temporary WebGL2 and IndexedDB cleanup; and no game-database access.
- Run focused diagnostic tests for allowed and prohibited fields, stable
  conversion, fixed key order, 2-KiB limit, explicit copy, memory-only life,
  unknown-fault conversion, minimal non-recursive fallback, development versus
  production error handling, and no automatic output.
- Run focused startup tests for factual stages, Ready limitation, exact
  messages, all blocking reasons together, retry, fatal presentation, semantic
  controls, visible focus, and no early enabled game control.
- Run Playwright normal, degraded, blocking, multiple-failure, retry, fatal,
  copy, reload-control, and no-external-request flows in the applicable local
  browsers. Tests can inject controlled browser capabilities only through
  Playwright before the module starts; production receives no failure switch.
- Run `npm run check` and `npm run build` before submission.
- Run `git diff --check` and report the exact changed files, commits, command
  results including failures, coverage limitations, and required primary-owned
  updates.
- The primary agent later runs the complete combined validation, production
  and network inspection, primary pre-review audit, fresh Sol `xhigh` review,
  integration checks, and Leonardo test.

## Safety and quality boundaries

- Preserve the exact no-runtime-network, no-telemetry, local-only, privacy,
  dependency, package, asset, and public-action boundaries.
- Do not read or use a campaign, save, game database, player fact, browser
  identity, device detail, raw error, stack, path, URL, arbitrary string,
  personal data, credential, environment file, employer material, or another
  repository.
- Do not change a frozen interface, approved wording, capability order,
  ownership boundary, test contract, dependency, or player-visible meaning.
- Do not infer a missing contract. Stop and report it with affected paths,
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
failures, addressed requirements, interfaces, S11 and S13 groups, known
limitations, bounded private implementation choices, and any requested
primary-owned correction. The word `submitted` does not mean reviewed,
integrated, tested by Leonardo, or accepted. The primary agent creates the
formal contribution record only after the real submission.
