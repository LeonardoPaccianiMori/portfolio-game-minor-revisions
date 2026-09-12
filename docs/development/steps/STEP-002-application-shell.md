---
id: STEP-002
type: development-step
status: accepted
phase: 1
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: e41aad110020fcae5a1d79609beddd290eaa4285
branch: work/step-002-application-shell
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-002 — Application shell

## Objective

Introduce the application coordinator and safe startup so every later system
plugs into one lifecycle.

## Plain-language effect

The page runs ordered startup checks, and if the browser cannot run the game it
shows a clear, safe error screen instead of a broken page.

## Owned paths

- `src/application/` (coordinator, lifecycle, request queue, frame loop)
- `src/platform/` (compatibility detection, timing, frame scheduler)
- `src/main.ts`, `index.html`
- `tests/unit/application.test.ts`, `tests/unit/request-queue.test.ts`,
  `tests/unit/frame-loop.test.ts`, `tests/unit/compatibility.test.ts`
- `tests/e2e/start-page.spec.ts`, `tests/e2e/startup-failure.spec.ts`

## Prohibited paths

- `docs/**` except the step record; `AGENTS.md`, `README.md`, `opencode.json`,
  `.opencode/**`
- Rules and state, content, 3D/world, persistence, game screens beyond the
  startup and error surface, assets, and any release, licence, or deployment
  action

## Allowed sources

- `docs/specs/02-architecture.md`, `docs/specs/09-performance-and-browsers.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `docs/design/06-world-and-presentation.md`,
  `docs/design/08-production-constraints.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B2 architecture (application and platform modules, coordinator lifecycle,
  caller-passed dependencies, failure boundary); B9 (WebGL2 compatibility and
  sanitized diagnostics); B10 (test layers and workflow); A8.
- STEP-002 of the C2 ordered step list; phase 1, gate `foundation`.

## Accepted dependencies

- STEP-001 accepted by Leonardo on 2026-09-13.
- The STEP-002 plan approved by Leonardo on 2026-09-13.

## Plan

The primary implements this architectural spine. One fresh independent review
by `mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
module boundaries are tightly coupled to B2, so a worker would add setup
overhead without an isolation benefit.

## Tasks

1. Application coordinator: ordered startup stages, reverse shutdown,
   repeat-safe, no global singletons, dependencies passed in.
2. Request queue: serialized asynchronous work with explicit rejection
   handling.
3. Frame loop with start and stop, using an injectable timing source; no game
   systems yet.
4. Platform compatibility: WebGL2 detection with a capability result and safe
   failure.
5. Safe error screen: sanitized message, no raw errors, a recovery action, no
   telemetry.
6. Wire `src/main.ts` into the shell; the page reports the startup result and
   keeps the ready marker.
7. Unit tests for the coordinator, queue, frame loop, and compatibility.
8. Browser tests: normal start in three browsers with no external requests,
   plus a controlled WebGL2 failure showing the safe error screen.
9. Run every required check.

## Non-goals

- No rules, state, 3D scene, persistence, content, menus, or assets.
- No application-level interface beyond the startup and error surface.
- No coverage gate in this step; it is enabled from STEP-003.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- A `npm run dev` smoke test
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Local only; no network use in code.
- The failure screen is sanitized: no stack traces, no raw errors, and no
  telemetry.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `e41aad110020fcae5a1d79609beddd290eaa4285`.
- Branch: `work/step-002-application-shell`.
- Implementation commit: `97a0a0459c0e903ecb92d5986f7d8a905d2141ba`
  (`Add application shell and safe startup`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 17 unit tests before
  the R-1 correction and 19 after it, and the content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 6 passed (normal start and a controlled WebGL2 failure in
  Chromium, Firefox, and WebKit), no external request.
- `npm run dev`: used by the Playwright web server; the normal page reached the
  ready marker and the failure page showed the safe error screen.
- `git diff --check` and `git status`: clean at the branch head.
- Integrated on local `main` at `8d88ad9` by fast-forward, and `npm run verify`
  passed on `main`.

## Independent review

First review on 2026-09-13 by `mr-reviewer` (`opencode-go/glm-5.3`, variant
`max`), a different model family from the primary: no blocker, one required
correction (R-1, applied), and six advisory notes (A-1, A-2, A-3, A-4, and
A-6 recorded and deferred with owners; A-5 completed at acceptance).

A fresh independent review covers the corrected result before integration.

Re-review on 2026-09-13 by a fresh `mr-reviewer` session (`opencode-go/glm-5.3`,
variant `max`): R-1 is fully applied, no blocker and no required finding
remains, and two hardening advisories were recorded for later (ADV-R2a: pin the
shutdown-on-frame-loop-fault path with a test at the next coordinator touch;
ADV-R2b: make `StartupOutcome` self-enforcing for a `failed` status with a null
fault at the restart-semantics work).

## Corrections

Applied before integration from the first independent review:

- **R-1 (required):** the frame-loop start is now inside the sanitizing fault
  boundary with the fixed fault `startup:frame-loop`; the loop stop is
  best-effort; `bootstrap` has a defensive catch that shows the safe error
  screen; and two unit tests cover a throwing loop start and a throwing loop
  stop.
- **Advisories recorded and deferred:**
  - A-1: the coordinator is single-use; restart semantics are defined when the
    first restart wiring lands (STEP-004 or later).
  - A-2: listener exceptions are not yet isolated; the first real frame
    subscriber (STEP-003) settles the no-throw listener contract.
  - A-3: queue ownership is not yet wired into the coordinator; it is wired
    with the first serialized consumer (STEP-003).
  - A-4: the no-external-request test guard covers HTTP requests only; extend
    it if a WebSocket-adjacent system appears.
  - A-6: the error screen does not yet move focus; the accessibility pass at
    STEP-031 covers it.
  - A-5: acceptance records are completed in the acceptance commit, as in
    STEP-001.
  - ADV-R2a: the shutdown-on-frame-loop-fault path is not yet pinned by its own
    test; add one shutdown stage to that test at the next coordinator touch.
  - ADV-R2b: `StartupOutcome` permits a `failed` status with a null fault;
    make it self-enforcing at the restart-semantics work (STEP-004 or later).

## Leonardo decision

Plan approved 2026-09-13. **Accepted by Leonardo on 2026-09-13** after the
direct startup test: the page showed _Minor Revisions_, _Startup checks
passed._, and _Game systems are not yet available._ with no visible error.
