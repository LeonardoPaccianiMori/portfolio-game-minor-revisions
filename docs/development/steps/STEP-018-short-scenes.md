---
id: STEP-018
type: development-step
status: implemented
phase: 3
gate: first-playable
created: 2026-10-11
updated: 2026-10-11
base_commit: e1d3c90c4543bd43732517e73250ffe83ea072ac
branch: work/step-018-short-scenes
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-018 — Short scenes

## Objective

Add the short scene mechanism: authored camera holds that ease in, hold, and
return control automatically, with skip-safe input and a placeholder
establishing scene wired at the start of a run.

## Plain-language effect

Some moments hold the camera briefly to show you something, then give control
straight back. Any input skips them instantly, and your position is never
changed.

## Owned paths

- `src/world/scenes.ts` (new: the scene data and the runner)
- `src/world/world.ts` (unchanged unless the scene hooks require a small
  extension)
- `src/world/index.ts` (the scene exports)
- `src/main.ts` (the opening scene, the paused world during scenes, the skip
  input, and the hint)
- `index.html` (the hint styling if the prompt needs a scene variant)
- `tests/unit/scene-runner.test.ts` (new), `tests/e2e/scene.spec.ts` (new)
- `docs/specs/06-world-and-interaction.md` (the short-scene baseline),
  `docs/specs/07-interface-and-accessibility.md` (the skip hint),
  `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed files and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Authored scene text or Act content scenes (content steps 20–22); audio;
  real assets; reduced-motion settings (accessibility step); gameplay
  triggers from events beyond the opening placeholder; migration; any
  release, licence, or deployment action

## Allowed sources

- `docs/design/04-narrative.md`, `docs/design/06-world-and-presentation.md`,
  `docs/design/07-content-and-evaluation.md`
- `docs/specs/06-world-and-interaction.md`,
  `docs/specs/07-interface-and-accessibility.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B6 (short scenes: the camera holds briefly for authored moments, then
  control returns automatically; skip-safe; never force motion), B7 (clear
  advance and skip for scenes; text never requires a timed response), A7
  (about ten fixed authored scenes; text arrives in the content phase).
- STEP-018 of the amended C2 list; the last step before the first-playable
  gate.
- Carried advisories: STEP-017 A-1 (application smoke test), STEP-016 A-1
  (controller focus semantics), and the presentation deferrals to Phase 5.

## Accepted dependencies

- STEP-017 accepted by Leonardo on 2026-10-11 after his result review.
- Plan approved by Leonardo on 2026-10-11 as presented.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/gpt-5.6-luna`, `high`), a different model family
from the primary, plus a fresh re-review if code corrections are required. No
worker is used.

## Tasks

1. The scene data: stable ids, a label, a camera pose, a hold length, and a
   placeholder caption, with the placeholder opening establishing scene.
2. The runner as a small pure state machine: ease in, hold, ease out, idle;
   wrap-aware yaw interpolation with a smooth ease; the exact original pose
   restored at the end; skip from any active state returning control
   instantly; the rendered pose reported through a callback so the runner
   stays free of Three.js.
3. The composition root: play the opening scene once the world is visible,
   pause movement, interaction, and board input while a scene is active,
   skip on any input, show the caption and skip hint in the prompt, and
   resume exactly where the player stood.
4. Tests: the runner's phases and durations, the wrap-aware interpolation,
   skip from each state, restoration of the original pose, idleness after
   completion, and a browser test that eases, holds, skips, and renders.
5. Record the short-scene baseline in B6 and the skip hint in B7, then run
   every required check.

## Baseline (approved with this plan; tunable in the slice)

- Ease in 0.8 s, hold 5 s, ease out 0.8 s; the skip returns control
  instantly. No input is ever required, and no motion is forced.
- The opening placeholder scene is an establishing look at the department
  with a placeholder caption; content steps replace it and add the authored
  scenes through the same mechanism.

## Non-goals

- No authored scene text, Act content scenes, or event triggers beyond the
  opening placeholder.
- No audio, assets, or reduced-motion settings.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- The runner is pure and free of Three.js, the DOM, and the clock; the world
  owns the camera; the prompt owns its DOM.
- Skip-safe: any input ends the scene instantly; the player's pose is never
  changed by a scene.
- No timed inputs; text never requires a timed response.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `e1d3c90c4543bd43732517e73250ffe83ea072ac`.
- Branch: `work/step-018-short-scenes`.
- Plan checkpoint: `3f7ce7e` (`Approve STEP-018 short scenes plan`), including
  this record.
- Implementation commit: `8e76518b5d7756a5fe94801fec6e93c75d1ff169`
  (`Add short scenes with skip-safe camera holds`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 283 unit tests (15
  new), and the content check.
- `npm run build`: passed; the single application bundle is 576.94 kB
  (147.6 kB gzip) inside the 25 MB budget.
- `npm run test:e2e`: 42 passed in Chromium, Firefox, and WebKit, including
  the scene easing, auto-return, instant skip, and render.
- `git diff --check` and `git status`: clean at the implementation head.
- Deviations: the opening scene and its caption are labelled placeholders;
  the skip signal covers any key, any mouse or gamepad button, locked mouse
  movement, and gamepad activity, delivered through the input owner; the
  frame loop skips on that signal.
- Limitations: scenes have no audio or authored text yet; no event triggers
  beyond the opening placeholder; reduced-motion handling arrives with the
  accessibility step; the browser test drives the runner directly rather
  than the composition.

## Independent review

`mr-reviewer` (`opencode-go/gpt-5.6-luna`, variant `high`) reviewed commits
`3f7ce7e..edd08fe` on 2026-10-11 and found no blocker and four required
findings:

- R-1: on a phase boundary the runner discarded the remaining delta, so one
  large frame did not complete the authored span and zero-length phases
  needed extra updates. Corrected by consuming the whole delta through all
  phases with zero-length handling, plus regression tests.
- R-2: the composition only saw bound gameplay actions, while the hint says
  "press any key" and the documents allow any input. Corrected by adding an
  `anyInput` signal to the input snapshot (any key, any mouse or gamepad
  button, locked mouse movement, gamepad activity) and using it in the frame
  loop.
- R-3: runner regressions were missing (ease-out skip, zero-length phases,
  default timings, post-completion idempotence, non-midpoint easing, delta
  overflow). Corrected with nine new tests.
- R-4: this step's AI-use entries were missing. Corrected.

Advisory recorded: the browser test drives the runner directly instead of the
composition; a composition-level smoke check is deferred to the first-playable
gate, with the primary as owner.

## Corrections

- Correction commit: applied the R-1 delta-overflow loop with zero-phase
  handling, the R-2 `anyInput` signal through the input owner, and the R-3
  regression tests; the record and specs were updated.

## Leonardo decision

Plan approved by Leonardo on 2026-10-11 as presented. Implementation complete
on 2026-10-11; independent review complete with corrections applied; a fresh
re-review and Leonardo's result review are pending.
