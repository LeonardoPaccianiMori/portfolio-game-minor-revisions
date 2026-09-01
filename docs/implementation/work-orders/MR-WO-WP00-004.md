---
id: MR-WO-WP00-004
type: implementation-work-order
status: approved
work_package: MR-WP-00
sequence: 4
created: 2026-09-01
updated: 2026-09-01
base_commit: 43f868e64b80c88dc46832b676af6d2929f081c2
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
model_selected: 2026-09-01
branch: work/MR-WP-00-startup-safety-review-fixes
worktree: .worktrees/MR-WP-00-startup-safety-review-fixes/
supersedes: MR-WO-WP00-003
---

# MR-WO-WP00-004 — Complete startup-safety review corrections

## Objective

Correct only the three independent-review finding groups in the submitted
Step-2 startup-safety result. Add the required public platform entrance, route
all three bootstrap cross-module imports through it, make the diagnostic fault
set closed and internally consistent, and replace real unit-test timers and
browser event objects with controlled fakes. Preserve every approved Step-2
behaviour and every frozen interface.

## Plain-language effect

This correction does not add a new player feature. It makes every existing
browser-start file use the planned public platform entrance, prevents a
diagnostic from combining unrelated fault details, and makes unit tests fully
controlled and repeatable. Real browser behaviour remains covered by
Playwright.

## Owned paths

- `src/bootstrap/diagnostics.ts`
- `src/bootstrap/startup-screen.ts`
- `src/bootstrap/startup.ts`
- `src/platform/index.ts`
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
- `index.html`
- `package-lock.json`
- `package.json`
- `src/application/`
- `src/audio/`
- `src/bootstrap/main.ts`
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
- `tests/e2e/`
- `tests/fixtures/`
- `tests/unit/MR-WP-01/`

## Allowed sources

- `AGENTS.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/contributions/MR-CONTRIB-WP00-002.md`
- `docs/implementation/development-roadmap.md`
- `docs/implementation/development-status.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/02-module-architecture.md`
- `docs/implementation/specs/11-browser-performance-and-diagnostics.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP00-002.md`
- `docs/implementation/work-orders/MR-WO-WP00-003.md`
- `docs/implementation/work-orders/MR-WO-WP00-004.md`
- `package.json`
- `src/bootstrap/diagnostics.ts`
- `src/bootstrap/startup-screen.ts`
- `src/bootstrap/startup.ts`
- `src/platform/compatibility.ts`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/e2e/MR-WP-00/startup-failures.spec.ts`
- `tests/unit/MR-WP-00/compatibility.test.ts`
- `tests/unit/MR-WP-00/diagnostics.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`
- `tests/unit/MR-WP-00/startup.test.ts`

## Authority and traceability

- Requirements: applicable Step-2 subsets of `MR-REQ-TECH-001` and
  `MR-REQ-TEST-001`.
- Interfaces: the early-startup subset of frozen `MR-IF-001`, the
  bootstrap-owned startup and fatal presentation subset of frozen `MR-IF-010`,
  the compatibility and sanitized-diagnostic subset of frozen `MR-IF-014`, and
  the applicable evidence boundary of frozen `MR-IF-015`.
- S02 route: correct every verified public-entrance violation under
  `MR-S02-FIX-002`; do not add a new module, revise the dependency graph, or
  claim the complete application lifecycle exists.
- S11 groups: correct the closed diagnostic contract in `MR-S11-DIA-001` and
  preserve the submitted `MR-S11-CMP-001` behaviour; do not implement or claim
  `MR-S11-PERF-001`.
- S12 rows: correct the Vitest evidence class and preserve Step-2 evidence
  toward `MR-S12-ACC-034` and `MR-S12-ACC-037`; do not create S12 fixture
  files or claim a complete cross-system acceptance row.
- S13 groups: `MR-S13-CON-001`, `MR-S13-GATE-001`, `MR-S13-GIT-001`,
  `MR-S13-OWN-001`, `MR-S13-REV-001`, and `MR-S13-WO-001`.
- Step authority: Leonardo approved this exact complete Step-2 correction plan
  on 2026-09-01. Step 3 and every public action remain blocked.
- Content IDs: none.

## Accepted dependencies

- Step 0 is complete.
- Gate 1 is approved.
- Step 1 is accepted.
- The original exact Step-2 plan is approved, and its submitted worker result
  exists at `43f868e64b80c88dc46832b676af6d2929f081c2`.
- Independent review found one blocker and two required findings and no
  advisory finding.
- Primary activation inspection proved that all three bootstrap private imports
  need correction and that `MR-WO-WP00-003` omitted one required path.
- Leonardo approved this exact complete Step-2 correction plan on 2026-09-01.
- `MR-WO-WP00-002` and `MR-WO-WP00-003` are superseded; their submitted and
  blocked states remain historical evidence.
- Node `24.20.0`, npm `11.19.0`, and the accepted lockfile remain unchanged.
- The exact branch and worktree already exist, are clean, and remain at the
  exact base commit.

## Tasks

1. Verify the exact branch, worktree, base commit, clean state, Node version,
   npm version, and absent remote before editing.
2. Add `src/platform/index.ts` as the S02 public entrance for the existing
   platform compatibility exports that bootstrap is permitted to use.
3. Route every cross-module platform import in `diagnostics.ts`,
   `startup-screen.ts`, and `startup.ts` through `src/platform/index.ts`. Do not
   change compatibility behaviour or create a second platform implementation.
4. Define one closed Step-2 diagnostic fault catalogue. Each permitted fault
   code must select exactly one approved module, phase, operation, severity,
   and recovery form.
5. Reject an unknown code, extra catalogue value, or inconsistent fault
   combination during runtime normalization. Preserve the fixed safe fallback,
   canonical output order, privacy exclusions, explicit-copy rule, memory-only
   lifetime, and 2-KiB UTF-8 maximum.
6. Replace every real timer, `Event`, and `EventTarget` in the owned Vitest
   files with controlled fakes or deterministic promise control. Do not use a
   DOM object or a real browser event in Vitest.
7. Preserve real event, focus, clipboard, reload-control, failure, retry, and
   no-external-request behaviour in the existing Playwright tests. Do not
   modify those tests.
8. Update the foundation and focused unit tests so they reject every private
   cross-module platform import, prove the public entrance, prove every closed
   diagnostic mapping and invalid combination, and prove deterministic timer
   and event control.
9. Preserve all submitted text, focus, compatibility order, thresholds,
   cleanup, privacy, package, configuration, and frozen-interface behaviour.
10. Run the required focused and complete checks. Make small atomic commits
    whose messages start with `MR-WP-00`.

## Non-goals

- No new startup state, capability, diagnostic field, recovery action,
  player-visible message, or compatibility behaviour.
- No change to the frozen S02, S11, S12, S13, or shared-interface authority.
- No Step-3 `src/application/` controller, lifecycle, request queue, frame
  loop, shutdown system, or temporary application adapters.
- No Three.js import, renderer, camera, scene, room, geometry, lighting,
  material, asset, game system, campaign, rule, content, save, setting, audio
  object, pointer-lock request, controller reading, or production aesthetic.
- No package, lockfile, dependency, configuration, threshold, coverage ignore,
  fixture, work-order, contribution, authority, design, specification,
  interface, roadmap, acceptance, licence, remote, release, deployment,
  portfolio, Career Center, or public change by the worker.
- No network action, package installation, global installation, external code
  search, asset research, or outside-repository input.

## Required checks and evidence

- Run the four focused Vitest files for compatibility, diagnostics, foundation,
  and startup behaviour.
- Run static architecture and import inspection across all bootstrap files for
  the public platform entrance and every cross-module import.
- Run focused diagnostic inspection for the closed catalogue, exact metadata
  mapping, unknown and inconsistent input rejection, privacy exclusions,
  explicit copy, memory-only life, fixed fallback, key order, and 2-KiB limit.
- Run focused test-contract inspection to confirm that Vitest uses controlled
  fakes and that real browser event behaviour remains in Playwright.
- Run `npm run check`, `npm run verify`, and `npm run build` without changing a
  package, lockfile, configuration, threshold, or coverage ignore.
- Run the focused Playwright Step-2 flows across Chromium, Firefox, and WebKit
  without changing their source.
- Inspect production output, privacy, and runtime network behaviour. Confirm no
  raw diagnostic output, telemetry, external request, source map, or automatic
  copy, storage, upload, send, or log path.
- Run `git diff --check`; report the exact changed files, commits, commands,
  actual results including failures, limitations, and a clean worktree.
- The primary agent later runs complete combined validation, the one complete
  primary pre-review audit, a fresh independent OpenAI `gpt-5.6-sol` review
  using `xhigh` reasoning, integration checks, and Leonardo's test.

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
  interfaces, tests, and the safe restart condition.
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
failures, addressed requirements, interfaces, S11, S12, and S13 groups, known
limitations, bounded private implementation choices, and any requested
primary-owned correction. The word `submitted` does not mean reviewed,
integrated, tested by Leonardo, or accepted. The primary agent creates
`MR-CONTRIB-WP00-004` only after the real submission.
