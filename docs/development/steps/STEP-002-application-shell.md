---
id: STEP-002
type: development-step
status: plan-approved
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

Not yet available.

## Independent review

Not yet available.

## Corrections

None yet.

## Leonardo decision

Plan approved 2026-09-13. Implementation, testing, and acceptance pending.
