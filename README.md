# Minor Revisions

_Minor Revisions_ is a planned first-person Three.js academic-survival game
about a developmental-biology postdoc trying to turn a promising cardiac
organoid result into a publishable paper before a final semester ends.

The tone is witty, sarcastic, and bitterly comic. The science remains legible;
the institution becomes increasingly surreal through plausible bureaucratic
accretion, contradiction, and absence. Publication is not automatically a
happy ending, and an industry role can offer an exit from the academic
survival loop without being presented as a perfect life.

## Repository status

Status: **S00–S14 documented; incremental Step 0–70 roadmap documented; Gate 1
approved on 2026-09-01; Steps 1–3 accepted; exact Step-4 plan approved; complete
review blocked its first submission; `MR-IF-002 v4` prerequisite-proof
correction and superseding work orders approved on 2026-09-03**.

This repository contains the accepted Step-1 foundation, Step-2 startup safety,
and Step-3 application lifecycle, but no Three.js scene, game system,
production asset, or deployment configuration. Step 2 adds the approved
browser compatibility checks, sanitized diagnostics, factual startup states,
safe failure screens, and their tests. Step 3 adds the internal lifecycle,
ordered request queue, controlled frame loop, repeat-safe shutdown, temporary
no-game adapters, public entrances, and their tests. Both steps completed
their approved audit, review, integration, main validation, Leonardo test, and
acceptance cycle. B10
records the bounded content, evaluation, production,
and handoff plan. An approved
[`independent design review protocol`](docs/reviews/independent-design-review-protocol.md)
defined the alignment and revealed-game check. A later
[`holistic game assessment protocol`](docs/reviews/holistic-game-assessment-protocol.md)
tested identity, the fun hypothesis, narrative and artistic direction, and
Leonardo's explicit and inferred expectations. The reports and validation notes
are stored under
[`docs/reviews/2026-08-28-opus-5/`](docs/reviews/2026-08-28-opus-5/) and
[`docs/reviews/2026-08-28-opus-5-holistic/`](docs/reviews/2026-08-28-opus-5-holistic/).
The controlled
[`recommendation register`](docs/reviews/recommendation-register.md) preserves
duplicates, conflicts, new findings, and decision status. R00 through R07 are
documented, and no review block remains. The
[`implementation roadmap`](docs/implementation/roadmap.md) records the
completed technical-specification programme. Its Sxx
[`status`](docs/implementation/status.md) remains current. The primary future
resume point is
[`development-status.md`](docs/implementation/development-status.md).
S01 freezes the toolchain and repository contract. S02 freezes the documented
module-architecture contract. S03 freezes the documented campaign-state,
validation, canonical JSON, and fixture contract. S04 freezes the documented
command, rule, deterministic-variation, truth-table, and unchanged-state
contract. S05 freezes the documented calendar, safe-point, scheduler, event,
crash, message, room, cutscene, skip, reload, recap, and finalization order.
S06 freezes the documented authored-data, reference, English-string, profile,
validation, and content-compatibility contract. S07 freezes the documented
IndexedDB, save, backup, recovery, migration, Archive, and local-data-clearing
contract. S08 freezes the documented spatial plan, floor, collision, player,
camera, anchor, target, focused-station, and world-projection contract.
S09 freezes the documented action, device, focus, pointer-capture, screen,
settings, responsive-layout, accessibility, UI-projection, and error contract.
S10 freezes the documented renderer, scene, camera, lighting, material,
animation, effect, cutscene-presentation, specialist-resource, provenance, and
four-bus audio contract. S11 freezes the documented compatibility, graphics-
profile, frame, processor, workload, memory, download, profiling, diagnostic,
privacy, and failed-measurement contract. S12 adds `MR-IF-015`, the fixture and
traceability contract. S12
fixes the future strict fixture format, acceptance matrix, evidence classes,
coverage boundary, S02–S12 case routes, connected journeys, and manual-review
boundary. S13 fixes the future ten-package ownership,
dependency, stored work-order, model-selection, isolated-branch, review,
validation, contribution, integration, and recovery contract. It also permits
an explicitly incomplete inactive content profile during slice development so
that fallback and full prose do not need to exist before the slice is tested.
S14 records the complete inventory, corrects requirement traceability and the
fallback/full gate split, resolves the final issue group, and historically
froze `MR-IF-001`–`MR-IF-015` as `v1`. The first Step-4 impact packet created
`MR-IF-002 v2`; complete review exposed missing initial content authority, and
the approved correction supersedes it with frozen `v3`. Every other interface
remains frozen `v1`. The S14 freeze created no package, runtime,
test, content, work-order, or asset file. Leonardo approved Gate 1 on 2026-09-01,
which confirms only the frozen technical baseline. Leonardo separately
approved the exact Step-1 plan on 2026-09-01 and accepted its integrated result
on the same date. Leonardo separately approved the exact Step-2 plan and later
correction plans, then accepted the integrated Step-2 result on 2026-09-02.
Leonardo approved the exact Step-3 application-lifecycle plan on the same day.
The controlled worker submitted the exact application-lifecycle result, and
the complete primary audit passed. Fresh independent technical review passed
with one narrow current-record correction, and focused primary validation of
that correction passed. The exact reviewed worker result is now integrated on
local `main`, and complete main-branch validation passed. Leonardo confirmed
the four expected lines after repeated reloads and explicitly accepted Step 3
on 2026-09-02. Leonardo approved the exact Step-4 plan and later the
evidence-led `MR-IF-002 v3` correction on the same date. A later complete
review proved that `v3` lacked typed route and PIIM prerequisite proof.
Leonardo approved frozen `MR-IF-002 v4`, active `MR-WO-WP01-003`, and waiting
`MR-WO-WP00-008` on 2026-09-03. Activation is not implementation or
acceptance. Each
later step needs its own plan, local test or result review, correction cycle,
and explicit acceptance.
The
durable resume point is
[`development-status.md`](docs/implementation/development-status.md), and the
complete sequence is
[`development-roadmap.md`](docs/implementation/development-roadmap.md).

Target experience:

- first-person 3D exploration on a compact fictional university research floor;
- one semester compressed into an approximately three-hour first playthrough;
- a 90-minute minimum-complete fallback if production must contract;
- a 20–30-minute vertical slice before full production;
- local, account-free save and resume;
- eventual deployment on Leonardo's portfolio website.

Development is collaborative. Codex plans, implements, runs technical checks,
operates the local game, debugs, and records evidence. Leonardo controls
creative direction, approves each plan, reviews asset and aesthetic choices,
performs the supplied play tests, reports observations, and accepts each step.
The [`step acceptance log`](docs/implementation/step-acceptance-log.md) keeps
those contributions distinct.

When an approved step benefits from delegation, the primary Codex agent uses a
focused, project-local worker, independent reviewer, or asset/licence
researcher. Every assignment records its exact model and reasoning effort in
the work order and contribution evidence. The authoritative routing matrix,
including the use of Sol, Terra, and Luna, is in
[`S13`](docs/implementation/specs/13-agent-work-orders-and-integration.md).
The configuration exists only to control future work; it does not authorize a
step, code, package, asset, or network action.

The private [`AI-use log`](docs/implementation/ai-use-log.md) records the
actual model, reasoning effort, role, completed work, and evidence for this
game's completed AI contributions. Its B00–B10, R00–R07, S01–S14, and Step-0
history applies only to _Minor Revisions_. Future entries record each primary
Codex session and completed subagent contribution. A configuration default is
never used as evidence of the actual session model or reasoning effort.

## Documentation

The numbered documents divide the design into implementation-owned domains.
Confirmed decisions, unresolved questions, and acceptance requirements must
remain explicit. Start with the design index and decision log. During technical
specification, also start with the implementation status and roadmap. Review
reports remain advisory and cannot change the numbered documents without
Leonardo's later decision.

## Repository boundary

This repository owns detailed game design, future source code, tests, assets,
and runtime configuration. Leonardo's private Career Center remains canonical
for project status, career evidence, and portfolio-readiness decisions.

No GitHub remote exists. Leonardo alone decides when to create and push a
remote. A future public release is planned to use MIT for code and CC BY 4.0
for Leonardo's original non-code work. No public licence file is added now.
Every third-party asset keeps its own verified licence and attribution path.

## Step-1 foundation file guide

The Step-1 foundation uses these small configuration and test files:

- `.gitignore` keeps generated and local-only files out of Git.
- `.npmrc` enforces exact saved versions and the package's Node requirement.
- `.nvmrc` records Node `24.20.0` for local version selection.
- `.prettierignore` excludes generated output and local tool directories from
  formatting checks.
- `eslint.config.js` defines the JavaScript and TypeScript quality rules.
- `index.html` is the plain local foundation page.
- `package-lock.json` fixes the complete installed dependency tree.
- `package.json` fixes the package versions and approved commands.
- `playwright.config.ts` defines the three-browser local page tests.
- `prettier.config.js` defines the repository formatting rules.
- `tests/e2e/MR-WP-00/start-page.spec.ts` checks the page in Chromium,
  Firefox, and WebKit without an external request.
- `tests/unit/MR-WP-00/foundation.test.ts` checks the exact foundation
  contract without starting a browser.
- `tsconfig.json` defines strict TypeScript checking.
- `vite.config.ts` defines the loopback-only local server and production
  build.
- `vitest.config.ts` defines the Node-only foundation test and future coverage
  boundaries.
