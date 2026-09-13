---
id: STEP-008
type: development-step
status: plan-approved
phase: 2
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: 38ad52006190d4df07b91f2f539b6bab10f0f0d5
branch: work/step-008-pi-system
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-008 — PI system

## Objective

Bring the PI into the loop: requests that move the paper and fellowship
goalposts, the meeting action, and the five complicity actions with their costs
and consequences.

## Plain-language effect

The PI can now change what "finished" means, and the player can choose
shortcuts that buy survival at a price.

## Owned paths

- `src/rules/pi.ts` (request application, meeting, complicity)
- `src/rules/fellowship.ts` (the revert edit, required by the approved revert
  request kind)
- `src/rules/week-loop.ts` (a shared action-slot spend so meetings and actions
  behave identically at the week boundary)
- `src/rules/dispatch.ts`, `src/rules/index.ts`
- `tests/unit/rules-pi.test.ts`, `tests/unit/rules-commands.test.ts`
- `docs/design/03-pressure-and-failure.md` (the complicity baseline table)

## Prohibited paths

- `docs/**` except the step record and the A3 baseline table;
  `AGENTS.md`, `README.md`, `opencode.json`, `.opencode/**`
- Request content, queue, or delivery; review discovery or
  fabricated-evidence consequences; endings; interface; persistence changes;
  assets; and any release, licence, or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`,
  `docs/design/04-narrative.md`, `docs/design/07-content-and-evaluation.md`
- `docs/specs/03-state-and-rules.md`, `docs/specs/04-content-and-data.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A2 (PI requests with add/reframe/revert; the meeting action; the five
  complicity actions and their costs; endings return to these choices by
  name); A3 (resources and thresholds); B3 (commands and atomic results); B4
  (stable IDs); B10 (tests).
- STEP-008 of the C2 ordered step list; phase 2.
- Carried advisories: STEP-006 A-4 (assignment gating), A-3 (stable reason
  codes), and STEP-007 ADV-1/A-4 (gating ownership).

## Accepted dependencies

- STEP-007 accepted by Leonardo on 2026-09-13.
- The STEP-008 plan and its baseline numbers approved on 2026-09-13.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
PI rules are tightly coupled to A2 and B3, so a worker would add setup
overhead without an isolation benefit.

The two additional owned paths beyond the approved plan text are required by
the approved semantics: the fellowship revert edit is needed for the revert
request kind, and the shared slot spend is needed so a meeting on the third
slot advances the week exactly as an action does.

## Tasks

1. `applyPiRequest`: add a paper or fellowship requirement, reframe both
   tracks through the shared reframe, and revert a paper or fellowship
   requirement, with effects and history entries.
2. `meetPI`: spend one action slot at zero energy, record the meeting, and
   reject when the week is lost, no slot remains, or the contract has
   finished.
3. `comply`: the five shortcut actions with the approved baselines, clamped
   meters, permanent flags, and history entries. Complicity costs no action
   slot and is rejected only when no decision is possible.
4. Route `meetPI` and `comply` through the dispatcher; `quit` stays explicitly
   `not-implemented`.
5. Record the complicity baseline table in A3.
6. Unit tests for request application, the meeting, and every complicity
   action, including clamps, flags, rejections, no-mutation, and the shared
   week boundary.
7. Run every required check.

## Non-goals

- No authored request text, queue, or delivery (STEP-009).
- No review discovery or fabricated-evidence consequences (STEP-010).
- No endings, quit resolution, interface, or assets.

## Complicity baseline (approved; tunable in the slice)

| Action           | Standing | Integrity | Slots | Relationships |
| ---------------- | -------: | --------: | ----: | ------------- |
| Inflate a claim  |      +10 |       −15 |     — | —             |
| Drop a replicate |        — |       −10 |    +1 | —             |
| Take credit      |      +10 |       −10 |     — | Dario −20     |
| Flatter the PI   |        — |        −5 |     — | Voss +10      |
| Dump work        |        — |       −10 |    +1 | Mara −15      |

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Rules stay pure and deterministic; no I/O and no unseeded randomness.
- Atomic results: rejections leave the state untouched.
- Player-facing text follows the A7 science-language rule.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

Not yet available.

## Independent review

Not yet available.

## Corrections

None yet.

## Leonardo decision

Plan approved 2026-09-13. Implementation, testing, and acceptance pending.
