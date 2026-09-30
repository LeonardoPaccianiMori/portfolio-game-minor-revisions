---
id: STEP-014
type: development-step
status: accepted
phase: 3
gate: first-playable
created: 2026-09-29
updated: 2026-09-29
base_commit: 0ff9e0a1ee1d8068cc38fc5ec2ecd436482b87f4
branch: work/step-014-movement-camera
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-014 — Movement and camera

## Objective

Make the floor walkable: first-person movement and camera behaviour driven by
keyboard, mouse, and controller, with a rebindable mapping, collision carried
over from STEP-013, and no head-bob or forced motion.

## Plain-language effect

You can walk the department in first person. The mouse looks after a click,
the arrow keys turn for keyboard-only play, and a standard controller works
too.

## Owned paths

- `src/input/bindings.ts` (new: actions, default bindings, pure rebinding)
- `src/input/input.ts` (new: device events, pointer lock, the per-frame
  snapshot)
- `src/input/index.ts` (new)
- `src/player/player.ts` (new: the pose, movement, look, and collision use)
- `src/player/index.ts` (new)
- `src/world/world.ts` (the first-person camera pose setter and getter; the
  overview placeholder camera and its recovery move are replaced)
- `src/main.ts` (input and player startup, the frame order, and shutdown)
- `tests/unit/input.test.ts` (new), `tests/unit/player.test.ts` (new),
  `tests/e2e/player.spec.ts` (new), `tests/e2e/world.spec.ts` (only if the
  camera replacement requires it)
- `docs/specs/06-world-and-interaction.md` (the movement feel baseline),
  `docs/specs/07-interface-and-accessibility.md` (the default bindings),
  `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed files and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Interaction targeting and prompts (STEP-015); the desk board and screens
  (STEP-016); the pause menu; remapping UI or persistence; room states;
  scenes; audio; real assets; migration; any release, licence, or deployment
  action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/06-world-and-presentation.md`,
  `docs/design/08-production-constraints.md`
- `docs/specs/02-architecture.md`, `docs/specs/06-world-and-interaction.md`,
  `docs/specs/07-interface-and-accessibility.md`,
  `docs/specs/09-performance-and-browsers.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B6 (comfortable first-person walking with keyboard, mouse, and controller;
  remappable actions; no head-bob, no forced motion, no jumping puzzles; the
  no-trapping guarantee), B7 (keyboard-only operation; no drag-only or
  precision-motor requirements; remapping is a setting), B2 (`input` owns
  device events; `player` owns movement and camera behaviour with no Three.js
  objects; `world` owns the camera and scene), A6 (short purposeful visits; no
  jump scares).
- STEP-014 of the amended C2 list; phase 3, before the first-playable gate.
- Carried advisories: STEP-013's placeholder overview camera is replaced
  here as recorded.

## Accepted dependencies

- STEP-013 accepted by Leonardo on 2026-09-15.
- Plan approved by Leonardo on 2026-09-29 as presented.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/gpt-5.6-luna`, `high`), a different model family
from the primary, plus a fresh re-review if code corrections are required. No
worker is used.

## Tasks

1. The bindings module: the eight actions, the default keyboard mapping, the
   pure rebinding functions, and an empty default button mapping ready for
   future pads.
2. The input module: keyboard, mouse, and gamepad state behind injectable
   event, pointer-lock, and gamepad sources; a per-frame snapshot with move,
   turn, and mouse deltas; a pointer-lock request on the canvas; and full
   disposal of every listener.
3. The player module: the pose (position, yaw, pitch), movement resolved
   through the STEP-013 collision with the player radius, look from mouse
   pixels, keyboard turning, and the dead-zoned gamepad sticks, the pitch
   clamp, and a position setter for future recovery.
4. The world camera: a first-person camera at eye height with a pose setter
   and getter; the placeholder overview camera and its recovery move are
   removed, and recovery keeps returning the nearest anchor.
5. The composition root: create the input and the player at startup, drive
   input, player, camera, and render in that order each frame, and dispose the
   input in shutdown.
6. Tests: the pure bindings and snapshot evaluation with fake devices, the
   player movement, look, clamp, and collision with fake environments, and a
   browser test that presses keys, walks into the desk, turns, and renders.
7. Record the movement feel in B6 and the default bindings in B7, then run
   every required check.

## Movement and input baseline (approved with this plan; tunable in the slice)

- Walking speed 3.0 m/s; keyboard turning and pitching 120°/s; gamepad stick
  turning 150°/s; mouse sensitivity 0.0025 radians per pixel; pitch limited to
  ±85°; eye height 1.6 m, constant.
- Default keyboard bindings: W/A/S/D move, arrow keys turn and pitch, mouse
  looks after the canvas is clicked, Escape releases the pointer.
- Standard controller: left stick moves, right stick looks, dead zone 0.15.
- The start pose is the desk-hub start anchor, facing the desk board.

## Non-goals

- No interaction targeting or prompts (STEP-015).
- No desk board, screens, or pause menu (STEP-016 onward).
- No remapping UI or persistence (later settings work); the mapping is
  rebindable in code.
- No room states, scenes, audio, real assets, or migration.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- The player and bindings modules are pure and free of Three.js, the DOM, and
  the clock; the input module owns every device listener and disposes them.
- No head-bob, no forced camera motion, and no timed inputs.
- Accessibility: keyboard-only play is fully supported from this step.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `0ff9e0a1ee1d8068cc38fc5ec2ecd436482b87f4`.
- Branch: `work/step-014-movement-camera`.
- Plan checkpoint: `64ac906` (`Approve STEP-014 movement and camera plan`),
  including this record.
- Implementation commit: `b7f75def6dc161ca3eecd055481834f1eb0607f6`
  (`Add first-person movement, input, and camera`).
- Follow-up commit: `9b87b1ff794f87cce9c185cc0698ee3b7c8d3342`
  (`Route pointer-lock events to the document`), found in the pre-review
  audit: browsers fire `pointerlockchange` on the document, so the input
  binds keyboard, mouse, and blur to `window` and pointer-lock changes to
  `document`.
- `npm run check`: passed; typecheck, ESLint, Prettier, 228 unit tests (27
  new), and the content check.
- `npm run build`: passed; the single application bundle is 529.65 kB (133.9
  kB gzip), inside the 25 MB budget.
- `npm run test:e2e`: 27 passed in Chromium, Firefox, and WebKit, including
  the player walking into the desk board, turning with the arrow keys,
  rendering, and the existing world and persistence suites.
- `git diff --check` and `git status`: clean at the implementation head.
- Deviations: the camera height lives with the world camera in
  `src/world/floor-plan.ts` rather than the player module, because the player
  pose carries no height, and `src/world/index.ts` re-exports it; those two
  files are the recorded extension beyond the listed `world.ts`. The input
  module's device defaults are guarded so the pure module constructs under
  Node for tests; in the browser, keyboard, mouse, and blur bind to `window`
  and pointer-lock changes bind to `document`, where the browser fires them
  (the pre-review follow-up above).
- Integrated on local `main` at `89d9726` by fast-forward, and `npm run
verify` passed on `main`.
- Limitations: remapping is implemented in code but not yet exposed in a
  settings screen or persisted; there is no pause menu, interaction, or desk
  board yet; gamepad behaviour is unit-tested with fakes because headless
  browsers expose no pads.

## Independent review

Completed 2026-09-29 by `mr-reviewer` (`opencode-go/gpt-5.6-luna`, variant
`high`), a different model family from the primary: **no blocker and one
required finding**, corrected in this step. The reviewer re-ran the claimed
checks independently (typecheck, 228 unit tests, 27 browser tests), confirmed
the 27-new-test claim and the bundle size, and verified the module
boundaries, sign conventions, collision use, camera replacement, composition
order, and records. Three advisories were recorded.

## Corrections

- **R-1 (required):** the records dated the STEP-014 plan, implementation,
  and revisions 2026-09-15 while the commits are dated 2026-09-29. The step
  record, the process file, and the B6 and B7 revision lines now carry the
  correct date, and the STEP-014 primary and reviewer entries were added to
  `docs/ai-use-log.md`.

Advisories recorded from the independent review:

- **A-1:** the browser camera acceptance does not yet assert yaw, pitch, eye
  height, or the pose-getter copy; add them at the next world or player
  browser-test pass.
- **A-2:** input sign and accessibility coverage is partial (gamepad pitch
  signs, keyboard-only browser interaction, Escape release, and the default
  document pointer-lock routing); add them at the next input or
  accessibility test pass.
- **A-3:** the composition root's input and player failure paths have no
  direct tests; cover them with the composition-root test work.

## Leonardo decision

Plan approved by Leonardo on 2026-09-29 as presented. **Accepted by Leonardo
on 2026-09-30** after the result review and his own walk test: he started the
dev server, walked the floor, looked around, and found the movement,
collision, and controls working. The records and evidence (228 unit tests and
27 browser tests; `npm run verify` on `main`) and the review with its one
corrected record finding were reviewed with no visible issue.
