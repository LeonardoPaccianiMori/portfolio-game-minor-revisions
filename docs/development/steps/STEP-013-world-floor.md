---
id: STEP-013
type: development-step
status: implemented
phase: 3
gate: first-playable
created: 2026-09-15
updated: 2026-09-15
base_commit: 979f62c6389023556286416cfeae7377392cbbeb
branch: work/step-013-world-floor
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-013 — The world floor

## Objective

Build the department floor: six spaces in one continuous static layout, wall
and prop collision without a physics engine, a geometric no-trapping
guarantee, and recovery anchors. Render it with the placeholder overview
camera so the world is visible and testable, before movement arrives in
STEP-014.

## Plain-language effect

The department exists. You can see the six rooms, their walls and furniture,
and the game can tell whether any point is inside a wall, whether every spot
can be escaped, and where the nearest safe point is.

## Owned paths

- `src/world/floor-plan.ts` (new: the spaces, doorways, anchors, placeholder
  props, and the constants)
- `src/world/collision.ts` (new: the pure collision, movement resolution,
  sampling, connectivity, and anchor queries)
- `src/world/geometry.ts` (new: the Three.js meshes and materials built from
  the plan)
- `src/world/world.ts` (new: renderer, scene, camera, lights, render,
  recovery, stats, and disposal)
- `src/world/index.ts` (new)
- `src/main.ts` (the world startup stage, the render subscription, the world
  container, and the shutdown stage)
- `index.html` (the world container element)
- `tests/unit/world-collision.test.ts` (new),
  `tests/e2e/world.spec.ts` (new)
- `docs/specs/06-world-and-interaction.md` (the dimensions and anchors
  baseline), `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed file and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Movement and camera behaviour, input bindings, interaction, the desk board,
  room states, scenes, audio, real assets, act lighting, graphics presets,
  migration, any release, licence, or deployment action

## Allowed sources

- `docs/design/06-world-and-presentation.md`,
  `docs/design/02-core-loop.md`, `docs/design/01-vision.md`
- `docs/specs/02-architecture.md`, `docs/specs/06-world-and-interaction.md`,
  `docs/specs/07-interface-and-accessibility.md`,
  `docs/specs/08-rendering-and-audio.md`,
  `docs/specs/09-performance-and-browsers.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B6 (six spaces, one layout, static collision, no trapping, recovery
  anchors), A6 (space functions and presentation notes), B2 (the `world`
  module owns Three.js; one-way imports; fakes for tests), B8 (WebGL2, flat
  materials, simple lighting, labelled placeholders), B9 (the standard
  target), B10 (browser tests cover the world).
- STEP-013 of the amended C2 list; phase 3, before the first-playable gate.
- Carried advisories: STEP-010 ADV-1 (rules-module cycles; untouched here),
  STEP-011 ADV-3 (the waste actions belong to the interface step).

## Accepted dependencies

- STEP-012 accepted by Leonardo on 2026-09-15.
- This plan is a draft awaiting Leonardo's explicit approval.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/gpt-5.6-luna`, `high`), a different model family
from the primary, plus a fresh re-review if code corrections are required. No
worker is used; the module is compact and the review needs the full context.

## Tasks

1. The floor plan as pure data: six spaces with their interior rectangles,
   the corridor, doorways on the corridor walls, six recovery anchors (one
   per space) plus a start anchor in the desk hub, and the placeholder props
   with their collision boxes. Constants: wall thickness 0.2 m, wall height
   3 m, door width 1.6 m, player radius 0.35 m.
2. The collision module as pure functions: circle-versus-box collision,
   movement resolution that slides along walls, a walkable sampler over a
   grid, a connectivity check, and the nearest-anchor query. No Three.js in
   this module.
3. The geometry module: build the floor, walls with door gaps, a few
   placeholder props, and flat labelled placeholder materials from the plan.
4. The world module: create the WebGL2 renderer, the scene, a temporary
   overview camera, and simple lighting; append the canvas to the given
   container; render on demand; expose the render call count for tests;
   resolve recovery to the nearest anchor; resize; and dispose every
   resource.
5. The composition root: start the world as a startup stage (with a safe
   fault when WebGL2 or the scene cannot start), render it from the existing
   frame loop, show the world container on success, and dispose everything on
   shutdown.
6. Tests: the pure collision, resolution, sampling, connectivity, and anchor
   suites, including the no-trapping proof that every walkable cell reaches
   an anchor and all six spaces connect; the browser suite that builds the
   world, renders it, checks the six spaces and the anchors, recovers to a
   safe point, and disposes cleanly.
7. Record the layout and anchor baseline in B6 and run every required check.

## Layout baseline (approved with this plan; tunable in the slice)

Coordinates are in metres on a flat floor: X runs east, Z runs north, the
floor sits at Y 0. Wall thickness 0.2, wall height 3, door width 1.6.

| Space       | Interior                 | Door on the corridor        |
| ----------- | ------------------------ | --------------------------- |
| Corridor    | X 0–20.6, Z 0–3          | —                           |
| Desk hub    | X 0.2–10.2, Z 3.2–11.2   | Centred at X 5.2, 1.6 wide  |
| Soil lab    | X 10.4–20.4, Z 3.2–11.2  | Centred at X 15.4, 1.6 wide |
| Grow room   | X 0.2–8.2, Z −8.2–−2.2   | Centred at X 4.2, 1.6 wide  |
| PI's office | X 8.4–14.4, Z −8.2–−2.2  | Centred at X 11.4, 1.6 wide |
| Break room  | X 14.6–20.6, Z −8.2–−2.2 | Centred at X 17.6, 1.6 wide |

The footprint is about 21 by 20 metres and crosses in well under a minute.
The arrangement: the desk hub and the soil lab north of the corridor, the
grow room, the PI's office, and the break room south of it.

Placeholder props (collision boxes only; shapes and colours are labelled
placeholders): a desk and a board in the hub, benches and a machine in the
lab, plant rows in the grow room, a desk shelf and award blocks in the PI's
office, a table and a counter in the break room.

Recovery anchors sit at safe floor points in each space, with the start
anchor in the desk hub near the board.

## No-trapping proof (approved with this plan)

A unit test samples the whole footprint on a 0.25 m grid, keeps the cells
where a 0.35 m circle does not collide with any wall or prop, flood-fills the
result, and asserts that every walkable cell belongs to one connected region
that contains every space and every recovery anchor. The test is permanent,
so later furniture or layout changes cannot silently seal a corner.

## Non-goals

- No movement or camera behaviour, and no input bindings (STEP-014; B7 owns
  the mapping).
- No interaction targeting or station actions (STEP-015).
- No desk board, room states, or scenes (STEP-016 to STEP-018).
- No audio, real assets, act lighting, or graphics presets.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- The collision and plan modules are pure and free of Three.js, the DOM, and
  the clock; the world module owns every Three.js object and disposes them.
- Resources are released on shutdown and the canvas is removed; restarting
  does not accumulate resources.
- Placeholder geometry is labelled in code and records; nothing placeholder
  is presented as final.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `979f62c6389023556286416cfeae7377392cbbeb`.
- Branch: `work/step-013-world-floor`.
- Plan checkpoint: `7851623` (`Approve STEP-013 world floor plan`), including
  this record.
- Implementation commit: `b97019598da92edb68f57678c10e8e0f48ba2a1a`
  (`Add the world floor, collision, and recovery anchors`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 198 unit tests (13
  new), and the content check.
- `npm run build`: passed; the single application bundle is 525.25 kB (132.0
  kB gzip), well inside the 25 MB budget.
- `npm run test:e2e`: 21 passed in Chromium, Firefox, and WebKit, including
  the world rendering after startup and the module build, render, recovery,
  resize, and double-dispose checks.
- `git diff --check` and `git status`: clean at the implementation head.
- Deviations: the south rooms adjoin the corridor at z −0.2 (the baseline
  table's −2.2 would have left a void between the corridor and the wall), so
  every wall sits on a single 0.2 m band. The plant rows were shortened to
  x 1.2–7.2 after the no-trapping proof caught the original rows sealing the
  aisles; the proof did its job. `index.html` gained the world container and
  minimal full-screen styling for the canvas. With Leonardo's authorization
  on 2026-09-15, `@types/three@0.185.4` was added as an exact-pinned dev
  dependency because Three.js ships no type declarations.
- Limitations: the overview camera and the geometry are labelled
  placeholders; movement, input, and interaction do not exist yet, so the
  world is only testable through rendering and the pure collision queries;
  the Three.js bundle crosses Vite's 500 kB advisory, which the performance
  step owns and which stays far inside the B9 size budget.

## Independent review

Not yet available.

## Corrections

None yet.

## Leonardo decision

Plan approved by Leonardo on 2026-09-15 after he reviewed the written draft.
Implementation complete on 2026-09-15; independent review and Leonardo's
result review pending.
