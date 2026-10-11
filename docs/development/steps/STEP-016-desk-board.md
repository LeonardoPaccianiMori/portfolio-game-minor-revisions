---
id: STEP-016
type: development-step
status: implemented
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
- `src/ui/board-host.ts` (new, recorded extension: the tested open, close,
  input, and command host)
- `src/ui/index.ts` (the board exports)
- `src/interaction/stations.ts`, `src/interaction/interaction.ts`,
  `src/interaction/controller.ts` (the hub desk opens the board)
- `src/main.ts` (board lifecycle, the paused world while open, and wiring)
- `index.html` (the board styling)
- `tests/unit/board-model.test.ts` (new),
  `tests/unit/board-host.test.ts` (new, recorded extension),
  `tests/unit/interaction-controller.test.ts` (the board-opening path),
  `tests/unit/interaction.test.ts` (recorded extension: the `opensBoard`
  field on the custom test interactables),
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

- Base: `99b58751530d339b271d1ab3a43c6eb014f062f3`.
- Branch: `work/step-016-desk-board`.
- Plan checkpoint: `8815274` (`Approve STEP-016 desk board plan`), including
  this record.
- Implementation commit: `15cc08e4771ab76e92b3e64a2911db18f5823020`
  (`Add the desk board overlay`).
- Follow-up commit: `004ec9efc319c3da1a1b359ec77a90ad6fb1dacc` (`Polish the
board focus order`), found in the pre-review audit.
- Corrections commit: `87007bebcc22191e6c74d4a79970f30f4a9a4919` (`Apply
STEP-016 review corrections`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 264 unit tests (14
  new after the corrections), and the content check.
- `npm run build`: passed; the single application bundle is 572.81 kB
  (146.2 kB gzip) inside the 25 MB budget.
- `npm run test:e2e`: 36 passed in Chromium, Firefox, and WebKit, including
  the board reading, resting, rejecting, confirming, navigating, and closing
  paths, and the hub-desk station opening the board through the host.
- `git diff --check` and `git status`: clean at the implementation head.
- Deviations: the action menu omits the bare `write-fellowship` and
  `colleague` actions (carried STEP-011 ADV-3) because they have no effects
  yet; the complicity shortcuts require a second confirming activation; the
  board maps finished experiments to attach controls so the experiment loop
  is playable; pending-event choice labels are authored placeholders; the
  controller focus navigation is vertical only. These are recorded in the
  A2 and B7 baselines.
- Limitations: labels are placeholders until the content phase; no save or
  autosave wiring yet; the panel and review outcomes only appear at weeks 9
  and 12; there is no pause menu or settings screen.

## Independent review

Completed 2026-10-11 by `mr-reviewer` (`opencode-go/gpt-5.6-luna`, variant
`high`), a different model family from the primary: **no blocker and eight
required findings**, all corrected in this step. The reviewer re-ran the
claimed checks independently (typecheck, 258 unit tests, 36 browser tests),
confirmed the module boundaries, the view-model mapping, the station change,
and the records, and verified the recorded deviations. Two advisories were
recorded.

## Corrections

- **R-1 (required):** the `tests/unit/interaction.test.ts` change was outside
  the owned list; it is now recorded as an extension (the `opensBoard` field
  on the custom test interactables), and `board-host` and its suite are also
  listed.
- **R-2 (required):** the interact key did not close the board. The board
  host now closes on an interact press while no control is focused, and
  activates the focused control otherwise; both paths are unit- and
  browser-tested.
- **R-3 (required):** focus was lost on every re-render and on open and
  close. The board now focuses the first control when opening, restores the
  focus key across re-renders, and returns focus to the previous element when
  closing; tested in the browser.
- **R-4 (required):** successful complicity actions gave no feedback. The
  board host now shows a plain sentence with the action and its effects on
  success, and the rejection message otherwise; unit-tested.
- **R-5 (required):** the B7 baseline said integrity never appears while the
  complicity forecasts show their deltas. The wording is reconciled: the
  integrity meter is never shown as a value, while the shortcuts, forecasts,
  and feedback state the effects in plain words.
- **R-6 (required):** the Rest forecast read `2 energy` rather than the
  approved `+2`, and the actions carried no detail. Costs now carry their
  signs and every action shows a short consequence line; deadlines remain on
  the fellowship and event cards where they exist.
- **R-7 (required):** the browser acceptance missed the close paths, the
  rejection, the confirmation, the focus handling, and the station path with
  the host. The suite now covers all of them.
- **R-8 (required):** the STEP-016 primary and reviewer entries were added to
  `docs/ai-use-log.md`.

Advisories recorded from the independent review:

- **A-1:** controller focus navigation is vertical only; the accessibility
  pass (STEP-032) owns full focus semantics.
- **A-2:** the record now cites the follow-up and corrections commits and the
  final validated head.

Second-round corrections after the first re-review:

- **R-3 and R-7 (remaining):** the browser test now asserts that a rejected
  action leaves the state byte-identical, that the focused control survives a
  re-render compared by its stable focus key, and that focus returns to the
  previously focused element when the board closes.
- **R-8 (remaining):** the AI-use log's `Last updated` line now carries the
  current date alongside the STEP-016 entries.

## Leonardo decision

Plan approved by Leonardo on 2026-10-11 as presented. Implementation complete
on 2026-10-11; the independent review returned no blocker and eight required
corrections, now applied and awaiting re-review. Leonardo's result review
pending.
