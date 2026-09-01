---
id: MR-CONTRIB-WP00-002
type: implementation-contribution
status: submitted
work_order: MR-WO-WP00-002
work_package: MR-WP-00
created: 2026-09-01
updated: 2026-09-01
base_commit: 1b06ee5933de302c00cee7efa394d0b7ac19c0b5
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
---

# MR-CONTRIB-WP00-002 — Startup-safety submission

## Scope and result

The controlled implementation worker submitted the approved Step-2 browser
compatibility checks, startup diagnostics, factual loading and Ready states,
complete blocking messages, retry control, and safe fatal-error presentation.
The submission has no Three.js scene, game system, package change, asset,
remote, licence, deployment, or public result. It is correcting and is not
reviewed, integrated, tested by Leonardo, or accepted.

## Changed files

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

## Authority

Work order: `MR-WO-WP00-002`. Requirements: applicable Step-2 subsets of
`MR-REQ-TECH-001` and `MR-REQ-TEST-001`. Implemented interface subsets:
early startup `MR-IF-001`, startup and fatal presentation `MR-IF-010`,
compatibility and diagnostics `MR-IF-014`, and evidence `MR-IF-015`. S11
groups: `MR-S11-CMP-001` and `MR-S11-DIA-001`. S12 evidence routes:
`MR-S12-ACC-034` and `MR-S12-ACC-037`. S13 groups:
`MR-S13-CON-001`, `MR-S13-GATE-001`, `MR-S13-GIT-001`,
`MR-S13-OWN-001`, `MR-S13-REV-001`, and `MR-S13-WO-001`.

No frozen interface or earlier decision changed. Step 3 and every public
action remain blocked.

## Worker commits

`d7394f9ed30dd791fc35e58683558337c71cac76` — `MR-WP-00 add
compatibility probes`; `cd65be843275d329c044f5898e461c8160a1d968` —
`MR-WP-00 add sanitized diagnostics`; and
`601eb8ed44368ed744ad2f91ea7607c48d417375` — `MR-WP-00 present safe
startup states`.

## Integrated commits

Not yet available.

## Commands and results

The worker used Node `v24.20.0` and npm `11.19.0`. Primary preparation used
`npm ci --offline`; it installed the exact 158 locked packages, audited 159,
and found zero vulnerabilities. The accepted Step-1 Playwright browser files
were reused locally without network access. No tracked file changed during
environment preparation.

The worker's final `npm run check` passed typecheck, lint, formatting, and 35
unit tests. `npm run build` passed with nine transformed modules. The focused
Playwright command passed 15 flows across Chromium, Firefox, and WebKit.
`git diff --check` passed, and the worker branch was clean.

The primary agent's first combined check passed typecheck, lint, and formatting
before the sandbox blocked Vitest from writing its ignored temporary cache.
The same check with linked-repository write access passed `npm run check` and
all 35 unit tests. `npm run verify` then passed lint, formatting, and all 35
tests but failed the frozen coverage gate: 49.62 percent line coverage against
the required 90 percent and 56.52 percent branch coverage against the required
85 percent. Build, browser, audit, production, network, and later checks did
not run in that chained command after the coverage failure.

## Independent review

Not yet available. A complete primary audit and corrected combined validation
must pass before the approved fresh OpenAI `gpt-5.6-sol` reviewer using
`xhigh` reasoning receives the controlled packet.

## Corrections

Before submission, the worker corrected two readonly-array type errors, three
focused-test annotation errors, one browser-test cast error, 31 strict lint
findings, and formatting in seven owned files. No configuration, dependency,
outside path, interface, or authority changed.

The consolidated primary audit found the complete required correction set:

- executable unit coverage does not meet the frozen threshold and does not yet
  exercise the real WebGL2 and IndexedDB probe lifecycle, all cancellation and
  cleanup paths, or all startup-screen actions;
- diagnostic runtime validation checks only the compatibility schema version
  before later copying statuses, so a malformed report can place an
  unapproved arbitrary status in the copied diagnostic;
- a fatal startup event presents the fatal screen but does not cancel and
  settle the active compatibility operation or remove the early listeners;
- IndexedDB blocked, error, deletion, and cancellation paths do not all settle
  safely and can prevent cancellation or retry from completing; and
- handled browser errors and unhandled rejections do not prevent default raw
  browser output, which does not meet the production sanitized-only boundary.

These are technical corrections inside the approved source and test paths.
The same worker must correct them together, add honest executable coverage
without changing configuration, exclusions, ignore directives, or frozen
thresholds, and then repeat focused and complete checks. The corrected result
requires completion of the primary audit and a fresh independent review.

## Known limitations

- This is not direct evidence for current stable Chrome, Edge, Firefox, or
  Safari support.
- It contains no performance, loading-time, memory, transfer-size, or play
  evidence.
- It contains no application controller, campaign, save database, Three.js
  scene, audio context, pointer-lock request, or controller-data read.
- Automated module-capable browsers do not prove the static fallback in a
  browser that cannot execute modules.
- Coverage and the consolidated technical findings do not yet pass, so the
  submission cannot enter independent review or integration.

## Leonardo decision

Leonardo approved the exact Step-2 plan on 2026-09-01. He has not yet received
the local test packet or accepted the implementation.
