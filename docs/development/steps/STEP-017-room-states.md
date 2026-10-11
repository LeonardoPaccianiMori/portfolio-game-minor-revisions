---
id: STEP-017
type: development-step
status: plan-approved
phase: 3
gate: first-playable
created: 2026-10-11
updated: 2026-10-11
base_commit: 68b9ff21b1f9d851029cf37a42c5543495cdb8c3
branch: work/step-017-room-states
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-017 — Room states and act changes

## Objective

Give the department its act-based accretion and decline: the week implies the
act, and the world shifts its lighting, palette, and authored prop states as
the acts advance, ready for the content phase to fill.

## Plain-language effect

The department stops looking the same every week. Act I is warmer and
greener; Act II dulls and clutters; Act III cools and thins, with the pressure
accent showing through.

## Owned paths

- `src/world/act-states.ts` (new: the acts, the week mapping, the palettes,
  and the authored prop states)
- `src/world/world.ts` (the act application, the applied palette, and the
  prop-scale accessor)
- `src/main.ts` (apply the act at startup and when a week crosses an act)
- `src/world/index.ts` (the act exports)
- `tests/unit/act-states.test.ts` (new), `tests/e2e/act.spec.ts` (new)
- `docs/specs/06-world-and-interaction.md` (the act and room-state baseline),
  `docs/specs/08-rendering-and-audio.md` (the act lighting baseline),
  `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed files and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Notices or scene text (content steps); scenes (STEP-018); audio; real
  assets; gameplay effects of room states (Act content steps 20–22); the
  forecast interface for play-affecting states; migration; any release,
  licence, or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/04-narrative.md`,
  `docs/design/06-world-and-presentation.md`
- `docs/specs/06-world-and-interaction.md`,
  `docs/specs/08-rendering-and-audio.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B6 (authored per-act room states show accretion and decline; a play-
  affecting state needs a visible forecast and effects before entering),
  A4 (the tone curve and the three acts), A6 (the environment carries the
  comedy), B8 (act-based lighting supports the tone curve; one pressure
  accent).
- STEP-017 of the amended C2 list; phase 3, before the first-playable gate.
- Carried advisories: STEP-016 A-1 (controller focus semantics, accessories
  step), and the earlier presentation deferrals to Phase 5.

## Accepted dependencies

- STEP-016 accepted by Leonardo on 2026-10-11 after his board test.
- Plan approved by Leonardo on 2026-10-11 as presented.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/gpt-5.6-luna`, `high`), a different model family
from the primary, plus a fresh re-review if code corrections are required. No
worker is used.

## Tasks

1. The act module: the three acts with their labels, the week-to-act mapping
   (weeks 1–4, 5–8, 9–12), a palette per act (background, ambient and sun
   colours and intensities, the pressure accent), and authored prop states
   (colour and height scale) for the grow rows, the notice-ish boards, and
   the bench clutter.
2. The world: apply an act by setting the background, the lights, and the
   prop colours and heights; expose the current act, the applied palette, and
   a prop's applied scale for tests and later UI.
3. The composition root: apply the act at startup and whenever a week change
   crosses an act boundary.
4. Tests: the week mapping boundaries, the palette and prop-state tables
   (valid prop ids, bounded scales, the rows declining across the acts), and
   a browser test that applies each act, renders, and confirms the palette,
   the act, and the row scale change.
5. Record the act and room-state baseline in B6 and the act lighting in B8,
   then run every required check.

## Baseline (approved with this plan; tunable in the slice)

- Acts: Act I weeks 1–4 (warm, green), Act II weeks 5–8 (cooler, duller,
  cluttered), Act III weeks 9–12 (cold, thin, accent showing).
- The prop states are presentation-only for now; the rows decline in height
  across the acts, the boards yellow, and the clutter shifts. Collision is
  unchanged.
- No room state affects play yet; when one does (Act content steps), it must
  show its forecast and effects before the player enters, as B6 requires.

## Non-goals

- No notices or scene text, no scenes, no audio, no real assets.
- No gameplay effects from room states yet and no forecast interface for
  them.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- The act module is pure and free of Three.js, the DOM, and the clock; the
  world owns every mesh, material, and light and disposes them.
- Palette values keep text and state legibility; no colour-only information
  is introduced.
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
