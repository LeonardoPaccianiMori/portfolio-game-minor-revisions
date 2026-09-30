---
id: STEP-015
type: development-step
status: implemented
phase: 3
gate: first-playable
created: 2026-09-30
updated: 2026-09-30
base_commit: 5298b61e77771710e60144bd4f0dba7b223a83da
branch: work/step-015-interaction
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-015 — Interaction

## Objective

Add the single context-sensitive interaction: forward-ray targeting with a
short reach, the target highlight and prompt, clear blocked feedback,
inspection without commitment, and station actions that run the real rules.

## Plain-language effect

Walk up to a bench, the grow rows, the break-room table, or the PI's desk; the
target highlights and a prompt names the action. Press E (or the controller's
primary button) to act, and the action spends your time and energy for real.

## Owned paths

- `src/interaction/stations.ts` (new: station data and the station mapping)
- `src/interaction/interaction.ts` (new: the ray, the aim from a pose, and the
  target result)
- `src/interaction/index.ts` (new)
- `src/ui/prompt.ts` (new: the minimal prompt line and its DOM)
- `src/ui/index.ts` (new)
- `src/application/game-session.ts` (new: the in-memory campaign state and
  command path)
- `src/application/index.ts` (the session export)
- `src/input/bindings.ts`, `src/input/input.ts` (the `interact` action, its
  default key and button, and the snapshot flag)
- `src/world/floor-plan.ts` (plain prop labels), `src/world/geometry.ts`
  (per-prop materials), `src/world/world.ts` (the highlight setter, getter,
  and per-prop material handling)
- `src/main.ts` (the session, interaction evaluation, prompt, and interact
  edge)
- `index.html` (the prompt styling)
- `tests/unit/interaction.test.ts` (new), `tests/unit/game-session.test.ts`
  (new), `tests/unit/input.test.ts` (the interact additions),
  `tests/e2e/interaction.spec.ts` (new)
- `docs/specs/06-world-and-interaction.md` (the interaction baseline),
  `docs/specs/07-interface-and-accessibility.md` (the interact binding and
  the prompt), `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed files and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- The desk board and any screens (STEP-016); scenes (STEP-018); Interaction
  Assist settings and the settings UI; room states; audio; real assets;
  persistence changes or autosave; migration; any release, licence, or
  deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/06-world-and-presentation.md`,
  `docs/design/08-production-constraints.md`
- `docs/specs/02-architecture.md`, `docs/specs/06-world-and-interaction.md`,
  `docs/specs/07-interface-and-accessibility.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B6 (one context-sensitive action with raycast targeting and a short reach;
  highlight and prompt; obstruction feedback; inspection without commitment;
  short purposeful station visits), A6 (experiments require a visit),
  B7 (Interaction Assist eases targeting; no precision-motor requirements),
  B2 (`interaction` owns targeting and stations with no browser resources;
  `ui` owns the DOM), B3 (commands and atomic results).
- STEP-015 of the amended C2 list; phase 3, before the first-playable gate.
- Carried advisories: STEP-011 ADV-3 (the bare `colleague` and
  `write-fellowship` actions must not be exposed as meaningless waste; no
  station maps to them here), STEP-014 A-2 (input test depth).

## Accepted dependencies

- STEP-014 accepted by Leonardo on 2026-09-30 after his walk test.
- Plan approved by Leonardo on 2026-09-30 as presented.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/gpt-5.6-luna`, `high`), a different model family
from the primary, plus a fresh re-review if code corrections are required. No
worker is used.

## Tasks

1. Prop labels in the floor plan and per-prop materials, so a highlighted
   prop never tints its neighbours.
2. The stations module: the five action stations (soil-lab bench, grow rows,
   break-room table, PI's desk, desk-hub desk) with labels, prompts, and
   commands; every other prop is inspect-only.
3. The interaction module: the aim ray from a pose and the camera height, the
   ray-versus-box hit test, the nearest-hit ordering, the reach, and the
   blocked result when a wall is hit first.
4. The prompt: a minimal bottom-centre line with set and clear, owned by a new
   `ui` module and disposed cleanly.
5. The game session: an in-memory campaign state with the command path, the
   rejection message, and the development seed until New Game exists.
6. The input additions: the `interact` action bound to E and the controller's
   primary button, with the snapshot flag; the composition root triggers on
   the rising edge only.
7. World and composition wiring: highlight the current target, show the
   prompt or blocked text, run the station command on interact, and surface
   rejection messages.
8. Tests: the station mapping, the aim and ray math, the reach and blocked
   cases, the session path, the input additions, and a browser test that aims
   at the break-room table, presses E, and sees the action spent and the
   highlight set.
9. Record the interaction baseline in B6 and the binding and prompt in B7,
   then run every required check.

## Interaction baseline (approved with this plan; tunable in the slice)

- Forward ray from the eye (camera height) with a 2.5 m reach; nearest hit
  first; a wall hit before the target reports as blocked.
- Stations: soil-lab north bench and the grow-room middle row work an
  experiment step; the break-room table rests; the PI's office desk meets the
  PI; the desk-hub desk is inspect-only until the desk board arrives.
- Every other prop is inspect-only; inspecting never commits.
- The interact key is E and the controller's primary button; the prompt line
  sits at the bottom centre and also shows rejection messages.

## Non-goals

- No desk board, pause menu, or other screens (STEP-016 onward).
- No Interaction Assist setting or settings UI (accessibility phase).
- No scenes, room states, audio, real assets, persistence, or autosave.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- The interaction and station modules are pure and free of Three.js, the DOM,
  and the clock; the prompt owns its DOM node and is disposed; the world owns
  its materials and meshes.
- Commands go through the existing atomic dispatcher; rejections change no
  state and surface their plain-language message.
- No precision-motor or timed requirements; inspecting is always safe.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `5298b61e77771710e60144bd4f0dba7b223a83da`.
- Branch: `work/step-015-interaction`.
- Plan checkpoint: `f25847c` (`Approve STEP-015 interaction plan`), including
  this record.
- Implementation commits: `c776908` (`Add interaction, stations, and the
prompt`) and `83559ce` (`Update the player test snapshot`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 250 unit tests (22
  new after the corrections), and the content check.
- `npm run build`: passed; the single application bundle is about 530 kB
  inside the 25 MB budget.
- `npm run test:e2e`: 30 passed in Chromium, Firefox, and WebKit, including
  the controller path that holds the interact key, spends exactly one action
  per press, and checks the highlight, prompt, and role.
- `git diff --check` and `git status`: clean at the implementation head.
- Corrections commit: `c8851ee` (`Extract the interaction controller and
cover its path`).
- Deviations: each prop's interaction volume reaches eye height so a level
  gaze still targets low furniture; `src/world/floor-plan.ts` gained plain
  prop labels and `src/world/geometry.ts` gives every prop its own material
  so a highlight never tints a neighbour (the recorded extension beyond the
  listed `world.ts`). The session uses a development seed until New Game
  exists.
- Limitations: the inspect-only feedback is placeholder text; Interaction
  Assist settings arrive with the accessibility work; no screen yet shows the
  campaign state the session holds (the desk board is STEP-016).

## Independent review

Completed 2026-09-30 by `mr-reviewer` (`opencode-go/gpt-5.6-luna`, variant
`high`), a different model family from the primary: **no blocker and two
required findings**, corrected in this step. The reviewer re-ran the claimed
checks independently (typecheck, 239 unit tests at the time), confirmed the
module boundaries, the station mapping, the slab and blocked behavior, the
highlighting and disposal, and the recorded extensions. Three advisories were
recorded.

## Corrections

- **R-1 (required):** the composition and rising-edge path was untested. The
  per-frame interaction logic was extracted into
  `src/interaction/controller.ts` with injectable world, session, and prompt
  seams; `main.ts` now uses it; unit tests cover the edge, feedback, blocked,
  inspect, reach, and bench paths with fakes, and the browser test drives the
  controller with a held interact key and asserts exactly one action per
  press.
- **R-2 (required):** the STEP-015 primary and reviewer entries were added to
  `docs/ai-use-log.md`.

Advisories recorded from the independent review:

- **A-1:** the slab edge cases are now covered directly (grazing face, origin
  inside, exact reach boundary).
- **A-2:** rejection-to-prompt behavior is now covered by the controller
  tests and the browser success path.
- **A-3:** the prompt carries `role="status"` so changes are announced; the
  wider accessibility pass still owns live-region review.

## Leonardo decision

Plan approved by Leonardo on 2026-09-30 as presented. Implementation complete
on 2026-09-30; the independent review returned no blocker and two required
corrections, now applied and awaiting re-review. Leonardo's result review
pending.
