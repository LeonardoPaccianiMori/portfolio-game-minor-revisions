---
id: STEP-018a
type: development-step
status: implemented
phase: 3
gate: first-playable
created: 2026-10-11
updated: 2026-10-11
base_commit: 0217207
branch: work/step-018a-movement-feel
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-018a — Movement feel adjustment

## Objective

Apply Leonardo's approved feel adjustment from his STEP-018 result review:
slow the scene camera glide from 0.8 s to 1.6 s each way, and raise the
walking speed from 3.0 m/s to 3.5 m/s. The 5 s scene hold, the instant skip,
all turn and look rates, and every other movement value are unchanged.

## Plain-language effect

The opening scene camera now glides at half its previous speed, and walking
feels slightly brisker. Nothing else about control changes.

## Owned paths

- `src/world/scenes.ts` (the glide constants)
- `src/player/player.ts` (the walking-speed constant)
- `tests/unit/scene-runner.test.ts`, `tests/unit/player.test.ts` (the
  affected expectations, which already read the constants)
- `docs/specs/06-world-and-interaction.md` (the movement and short-scene
  baselines)
- `docs/development/steps/STEP-018a-movement-feel.md` (this record)

## Prohibited paths

- `docs/**` except the listed files and this record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Any other tuning value; bindings; camera anatomy; content; assets; audio;
  accessibility settings; migration; any release or deployment action

## Allowed sources

- `docs/specs/06-world-and-interaction.md`,
  `docs/specs/07-interface-and-accessibility.md`,
  `docs/specs/10-testing-and-workflow.md`
- `AGENTS.md`, `docs/design/00-process.md`,
  `docs/development/steps/STEP-018-short-scenes.md`,
  `docs/development/steps/STEP-014-movement-camera.md`

## Authority and traceability

- Leonardo's result review of STEP-018 on 2026-10-11, and his explicit
  approval of the exact values in the synthesis presented the same day:
  scene glide 1.6 s each way and walking 3.5 m/s.
- The approved B6 movement and short-scene baselines; this adjustment
  supersedes the 3.0 m/s value recorded with STEP-014 and the 0.8 s glide
  recorded with STEP-018.

## Acceptance criteria

- `SCENE_EASE_MS` and `SCENE_RETURN_MS` are 1600; `WALK_SPEED` is 3.5.
- The default-timing runner test covers the 1.6 s + 5 s + 1.6 s span, and the
  walking tests still pass against the constant.
- `npm run check`, `npm run build`, and `npm run test:e2e` pass; the bundle
  stays inside budget.
- The B6 baseline records the new values with a revised status line.

## Checks

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Constants only; no structural change to the runner, the player, or the
  composition.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

Performed on 2026-10-11 on branch `work/step-018a-movement-feel` from base
`0217207`:

- Plan checkpoint: `7e1d407` (`Approve STEP-018a movement-feel plan`),
  including this record.
- Implementation commit: `2888503` (`Adjust movement feel: slower scene
glide, brisker walk`).
- `SCENE_EASE_MS` and `SCENE_RETURN_MS` raised to 1600 ms in
  `src/world/scenes.ts`; `WALK_SPEED` raised to 3.5 in
  `src/player/player.ts`.
- The default-timing runner test now spans 8200 ms; the walking tests read
  the constant unchanged.
- `npm run check`: passed; typecheck, ESLint, Prettier, 284 unit tests, and
  the content check.
- `npm run build`: passed; the bundle is 576.97 kB (147.6 kB gzip) inside
  the 25 MB budget.
- `npm run test:e2e`: 42 passed in Chromium, Firefox, and WebKit.
- `git diff --check` and `git status`: clean at the implementation head.

## Independent review

Not yet available.

## Corrections

None yet.

## Leonardo decision

Plan approved by Leonardo on 2026-10-11 through the presented synthesis
(scene glide 1.6 s each way; walking 3.5 m/s). Implementation, review,
verification, and acceptance pending.
