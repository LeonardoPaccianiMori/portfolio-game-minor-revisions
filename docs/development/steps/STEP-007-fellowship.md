---
id: STEP-007
type: development-step
status: technical-review
phase: 2
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: 22fb8635dd4c0996cc290546478d77d623deb5ea
branch: work/step-007-fellowship
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-007 — Fellowship track and linkage

## Objective

Add the fellowship as a second document track linked to the paper: its four
requirements, answer options, deadline, outcome placeholder, the shared
evidence set with its overlap flag, and the shared reframe.

## Plain-language effect

The PI's reframes and the player's own evidence now affect two documents, and
using the same result for both carries a risk.

## Carried decision (approved with this plan)

B4 declares one shared evidence set with per-track assignment. Evidence moves
out of `paper.evidence` into a top-level `evidence` field shared by both
tracks, with `track: paper | fellowship | both` and an `overlap` flag set when
both. The shape change is safe under the B5 development-save decision.

## Owned paths

- `src/rules/fellowship.ts` (model and edits)
- `src/rules/evidence.ts` (shared evidence model and `assignEvidence`)
- `src/rules/manuscript.ts` (the shared reframe across both tracks)
- `src/rules/campaign-state.ts` (top-level evidence and fellowship fields and
  validation)
- `src/rules/paper.ts` (drop evidence from the paper model)
- `src/rules/commands.ts`, `src/rules/dispatch.ts`, `src/rules/index.ts`
- `tests/unit/rules-fellowship.test.ts`, `tests/unit/rules-evidence.test.ts`,
  `tests/unit/rules-paper.test.ts`
- `docs/specs/03-state-and-rules.md` (the state table)

## Prohibited paths

- `docs/**` except the step record and the B3 state table;
  `AGENTS.md`, `README.md`, `opencode.json`, `.opencode/**`
- PI meetings or complicity rules, events or deadline ticking, panel outcome
  or review discovery, endings, interface, persistence changes, assets, and
  any release, licence, or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`,
  `docs/design/04-narrative.md`, `docs/design/07-content-and-evaluation.md`
- `docs/specs/03-state-and-rules.md`, `docs/specs/04-content-and-data.md`,
  `docs/specs/05-persistence.md`, `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A2 (fellowship track and linkage: shared evidence, shared reframes, shared
  complicity, independent administrative requirements); A3 (deadline and
  outcomes); A4 (fellowship timeline); B3 (state and commands); B4 (one shared
  evidence set, stable IDs); B10 (tests).
- STEP-007 of the C2 ordered step list; phase 2.
- Carried advisory A-2 from the STEP-006 review (evidence-set location).

## Accepted dependencies

- STEP-006 accepted by Leonardo on 2026-09-13.
- The STEP-007 plan approved by Leonardo on 2026-09-13.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
two-track linkage is tightly coupled to A2 and B4, so a worker would add setup
overhead without an isolation benefit.

## Tasks

1. Fellowship state: framing, revision, four requirements (`impact`,
   `feasibility`, `independence`, `support`) each `open`, `answered`, or
   `stale` with an answer or none, a deadline week (baseline 8), and a
   `pending` outcome placeholder.
2. `answerRequirement`: accept honest, inflate, fabricate, imitate, or blank;
   reject unknown requirements or answer types and leave the state untouched.
3. Shared evidence: one top-level set; `assignEvidence` refuses duplicates
   across both tracks; `both` sets the overlap flag.
4. Shared reframe: update the paper framing, stale satisfied paper
   requirements, stale answered fellowship requirements, and stale every
   current evidence entry.
5. Fellowship edits for later events: `add` requirements and `reframe`.
6. Validate the new fields inside the campaign state and add them to the
   initial state.
7. Route `answerRequirement` through the dispatcher; every other unbuilt
   command stays explicitly `not-implemented`.
8. Update the B3 state table and run every required check.

## Non-goals

- No deadline enforcement or ticking (STEP-009).
- No PI meeting or complicity rules (STEP-008), no panel outcome or overlap
  discovery (STEP-010), no endings.
- No player-visible interface.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Rules stay pure and deterministic; no I/O and no unseeded randomness.
- Atomic results: rejections leave the state untouched.
- Player-facing science text follows the A7 science-language rule.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `22fb8635dd4c0996cc290546478d77d623deb5ea`.
- Branch: `work/step-007-fellowship`.
- Implementation commit: `cd165f378b3ccafae96ef7ccc71c3fe16c246fbd`
  (`Add fellowship track and shared evidence`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 72 unit tests, and the
  content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 12 passed in Chromium, Firefox, and WebKit.
- `git diff --check` and `git status`: clean at the branch head.

## Independent review

Pending. The focused reviewer packet is the step record, the base and head
commits, the complete diff, the A2, A3, A4, B3, B4, B5, B10, C1, and C2
documents, and the recorded check results.

## Corrections

None yet.

## Leonardo decision

Plan approved 2026-09-13. Implementation and checks complete; independent
review, Leonardo result review, and acceptance pending.
