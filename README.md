# Minor Revisions

*Minor Revisions* is a planned first-person Three.js academic-survival game
about a developmental-biology postdoc trying to turn a promising cardiac
organoid result into a publishable paper before a final semester ends.

The tone is witty, sarcastic, and bitterly comic. The science remains legible;
the institution becomes increasingly surreal through plausible bureaucratic
accretion, contradiction, and absence. Publication is not automatically a
happy ending, and an industry role can offer an exit from the academic
survival loop without being presented as a perfect life.

## Repository status

Status: **implementation specification; creative design, two independent
review passes, and S00–S13 complete; S14 is next; all implementation gates
blocked**.

This repository contains design documentation only. It contains no game
implementation, production assets, package configuration, or deployment
configuration. B10 now records the bounded content, evaluation, production,
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
[`implementation roadmap`](docs/implementation/roadmap.md) now controls a
separate technical-specification programme. Its
[`current status`](docs/implementation/status.md) is the durable resume point.
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
privacy, and failed-measurement contract. S12 adds candidate `MR-IF-015`, the
fixture and traceability contract. S12
fixes the future strict fixture format, acceptance matrix, evidence classes,
coverage boundary, S02–S12 case routes, connected journeys, and manual-review
boundary. `MR-IF-001`–`MR-IF-015` remain candidates for later consistency
review. S13 fixes the future ten-package ownership,
dependency, stored work-order, model-selection, isolated-branch, review,
validation, contribution, integration, and recovery contract. It also permits
an explicitly incomplete inactive content profile during slice development so
that fallback and full prose do not need to exist before the slice is tested.
`MR-IF-001`–`MR-IF-015` remain candidates for the S14 audit; none is frozen and
no candidate creates package, runtime, test, content, work-order, or asset
files.
No code can begin until the technical baseline is complete and Leonardo gives
separate vertical-slice approval through
[`docs/00-design-index.md`](docs/00-design-index.md).

Target experience:

- first-person 3D exploration on a compact fictional university research floor;
- one semester compressed into an approximately three-hour first playthrough;
- a 90-minute minimum-complete fallback if production must contract;
- a 20–30-minute vertical slice before full production;
- local, account-free save and resume;
- eventual deployment on Leonardo's portfolio website.

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
