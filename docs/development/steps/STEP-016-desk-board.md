---
id: STEP-016
type: development-step
status: plan-approved
phase: 3
gate: first-playable
created: 2026-10-11
updated: 2026-10-11
base_commit: 99b58751530d339b271d1ab3a43c6eb014f062f3
branch: work/step-016-desk-board
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-016 — The desk board

## Objective

Build the desk board overlay: the two tracks, the resources, the costed
action menu, the complicity choices with their consequences, and the pending
event card, all issuing the real rules commands through the game session.

## Plain-language effect

Interact with the desk in the shared office and the board opens: you see the
week, your energy and standing, both documents with their requirement states,
every action with its cost, and any waiting decision, and you can act from
there with mouse, keyboard, or controller.

## Owned paths

- `src/ui/board-model.ts` (new: the pure view model from the campaign state)
- `src/ui/board.ts` (new: the overlay DOM, rendering, focus, and callbacks)
- `src/ui/index.ts` (the board exports)
- `src/interaction/stations.ts`, `src/interaction/interaction.ts`,
  `src/interaction/controller.ts` (the hub desk opens the board)
- `src/main.ts` (board lifecycle, the paused world while open, and wiring)
- `index.html` (the board styling)
- `tests/unit/board-model.test.ts` (new),
  `tests/unit/interaction-controller.test.ts` (the board-opening path),
  `tests/e2e/board.spec.ts` (new)
- `docs/design/02-core-loop.md` (the board baseline),
  `docs/specs/07-interface-and-accessibility.md` (the board contents),
  `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed files and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Save/load or autosave wiring; settings, remapping, or accessibility
  settings screens; scenes; room states; real content text; the archive or
  personnel screens; assets; migration; any release, licence, or deployment
  action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`,
  `docs/design/06-world-and-presentation.md`,
  `docs/design/07-content-and-evaluation.md`
- `docs/specs/02-architecture.md`, `docs/specs/03-state-and-rules.md`,
  `docs/specs/07-interface-and-accessibility.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A2 (the desk board is the main systemic surface: requests, two tracks, and
  resources), B7 (the board contents, the costed action menu with forecasts
  and confirmations, navigation by mouse, keyboard, and controller, and no
  colour-only information), B2 (`ui` owns the DOM), B3 (commands and atomic
  results; integrity hidden with symptoms), A3 (the visible resources and the
  complicity baseline).
- STEP-016 of the amended C2 list; phase 3, before the first-playable gate.
- Carried advisories: STEP-011 ADV-3 (the waste actions must not be exposed
  bare; the board issues commands with real effects only), STEP-015
  advisories (placeholder text, state UI now addressed, Interaction Assist
  still deferred).

## Accepted dependencies

- STEP-015 accepted by Leonardo on 2026-10-11 after his station test.
- Plan approved by Leonardo on 2026-10-11 as presented.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/gpt-5.6-luna`, `high`), a different model family
from the primary, plus a fresh re-review if code corrections are required. No
worker is used.

## Tasks

1. The board view model as pure data from the campaign state: resources
   (week, slots, energy, standing, trust), both tracks with their
   requirement states and evidence, the action list with energy costs, the
   complicity list with its effects, and the pending event with its choices.
   Integrity stays hidden.
2. The board DOM: the overlay, the panels, text-labelled states, focusable
   controls, a feedback line, and clear open and close behaviour; no
   colour-only information.
3. Command issuing: actions call the session, refusals surface their plain
   reason, successes re-render, and complicity choices show their effects and
   require a confirming second activation.
4. The pending event card: authored choice labels with their costs, resolved
   through the session.
5. The hub-desk station opens the board instead of inspecting; the
   interaction controller gains the board hook; the desk prompt says so.
6. The composition root: open and close (Escape or the close button), pause
   movement and station interaction while open, release the pointer lock,
   keep rendering, and drive controller focus with the stick or arrow input.
7. Tests: the view-model mapping, the controller board hook, and a browser
   test that opens the board, reads the resources, performs an action,
   resolves the rent event, and closes.
8. Record the board baseline in A2 and B7, then run every required check.

## Board baseline (approved with this plan; tunable in the slice)

- The board shows: week, actions left, energy, standing, and colleague trust;
  the manuscript with framing, requirements, and evidence states; the
  fellowship with its requirements, answers, and deadline; the seven actions
  with energy costs; the five complicity choices with their approved
  effects; and the pending event card.
- Opening: the desk-hub desk station; closing: Escape, the close button, or
  the interact key. While open, movement and station interaction pause and
  the pointer lock is released; rendering continues.
- Input: mouse and full keyboard focus; controller focus moves with the
  look/stick input and activates with the primary button.
- Labels are plain words; content-phase text replaces the placeholder labels.

## Non-goals

- No save/load or autosave wiring; no settings, remapping, or accessibility
  screens.
- No scenes, room states, real content, archive, or personnel screens.
- No changes to the rules contracts.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- The view model is pure and free of DOM, Three.js, and the clock; the board
  owns its DOM and disposes it; commands go through the atomic dispatcher.
- Irreversible complicity choices show their consequence and need a second
  activation; no colour-only information; focus is always visible.
- Placeholder labels are labelled as placeholders in code and records.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

Not yet available.

## Independent review

Not yet available.

## Corrections

None yet.

## Leonardo decision

Plan approved by Leonardo on 2026-10-11 as presented. Implementation,
testing, and acceptance pending.
