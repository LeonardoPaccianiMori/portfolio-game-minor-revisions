---
id: STEP-011
type: development-step
status: leonardo-review
phase: 2
gate: foundation
created: 2026-09-15
updated: 2026-09-15
base_commit: a56adf766727ab64eda55dec6ec1796af2ec064c
branch: work/step-011-review-panel
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-011 — Review and panel set pieces

## Objective

Resolve the two centrepiece payoffs: the fellowship panel early in Act III and
the journal review at the contract's end, with the reviewer chorus, the
learnable meta-rules, the partly arbitrary outcomes, and the discovery of
shared complicity. The outcomes become the inputs the ending resolver needs.

## Plain-language effect

The institution now answers back. The panel decides the fellowship, the
journal decides the paper, and careless shortcuts can be caught and cost you.

## Resolved carried questions (Leonardo, 2026-09-15)

- The funding review moves from week 2 to **week 4**, matching A2's "the call
  arrives at the end of Act I"; the fellowship deadline stays week 8 and the
  panel sits in week 9.
- A **blank** fellowship answer still counts as answered at the deadline and
  scores zero at the panel; it meets the deadline without earning credit.

## Owned paths

- `src/rules/outcomes.ts` (new: reviewer chorus data, panel resolution, review
  verdicts, discovery)
- `src/rules/paper.ts` (the paper outcome values and field)
- `src/rules/campaign-state.ts` (paper outcome validation)
- `src/rules/events.ts` (the funding-review week change, the panel and review
  events, and the two outcome effect kinds)
- `src/rules/index.ts`
- `tests/unit/rules-outcomes.test.ts` (new),
  `tests/unit/rules-events.test.ts`, `tests/unit/rules-paper.test.ts`,
  `tests/unit/rules-pi.test.ts`, `tests/unit/rules-fellowship.test.ts`
  (paper literals gain the outcome field)
- `docs/specs/03-state-and-rules.md` (paper outcome row),
  `docs/design/02-core-loop.md` (the review and panel meta-rules),
  `docs/design/03-pressure-and-failure.md` (the outcome and discovery
  baselines), `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed files and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Endings, personnel file, archive, ejection, burnout, and quitting resolution
  (STEP-012); interface; written text; persistence changes; assets; any
  release, licence, or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`,
  `docs/design/04-narrative.md`, `docs/design/05-characters.md`
- `docs/specs/03-state-and-rules.md`, `docs/specs/04-content-and-data.md`,
  `docs/specs/05-persistence.md`, `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A2 (the review and panel set pieces, the learnable arbitrary rules); A3 (the
  panel outcomes, renewal, discovery, integrity); A4 (Act III's panel and
  review and the ending determinants); A5 (reviewers as archetypes); B3
  (determinism, the seeded PRNG, atomic results); B4 (stable IDs, reports as
  content).
- STEP-011 of the amended C2 list; phase 2.
- Carried advisories: STEP-008 ADV-6 (stable PI request reason codes, to be
  re-anchored to the desk-board step, now STEP-016), STEP-009 ADV-1 (no
  message interface yet), STEP-009 ADV-6 (resolved above), STEP-010 ADV-1
  (module cycles; not touched here).

## Accepted dependencies

- STEP-010 accepted by Leonardo on 2026-09-13.
- The funding-review week and blank-answer decisions above, made by Leonardo
  on 2026-09-15. The plan was approved by Leonardo the same day.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary, plus a fresh re-review if code corrections are required. No
worker is used; the logic is tightly coupled to the state, events, and
existing tracks.

Implementation order: the paper outcome field and values; the outcomes module
(chorus, scoring, discovery); the event wiring and the funding-review week
change; tests; docs; checks.

## Tasks

1. Paper outcome: `PAPER_OUTCOMES` (`pending`, `accept`, `minor-revision`,
   `major-revision`, `reject`, `not-submitted`), a required `outcome` field on
   the paper state, initial value `pending`, validation, and the B3 row.
2. The reviewer chorus data: three stable archetypes with the learnable
   preferences below, plus their comment ID families.
3. The fellowship panel (`resolvePanel`): missed-deadline rejection; the
   answer scores; the seeded mood; funded, waitlisted, or rejected; the
   standing changes; the flags; renewal closing on rejection; the messages.
4. The journal review (`resolveReview`): submission test; the three reviewer
   scores and recommendations; the majority and harshest-verdict rule; the
   standing changes; the flags; the messages; the per-reviewer reports.
5. Discovery: the shared risk rule and its panel and review consequences for
   fabricated answers, both-track results, and taking Dario's credit.
6. Seeded draws: one documented draw order per outcome, using the state's
   `rngState` and writing the final value back; idempotent through the event
   flags.
7. Events: move the funding review to week 4; add `fellowship-panel` at week 9
   and `journal-review` at week 12 under the spent-week condition, in fixed
   catalogue order after `contract-decision`; add the `panelOutcome` and
   `journalReview` effect kinds.
8. Tests: panel branches, review branches, the chorus scoring, the seeded
   determinism, discovery, flags and standing, messages and reports, no
   mutation, one-time firing, the moved week, and the updated paper literals
   in the existing suites.
9. Record the A2 meta-rules, the A3 baselines, and the B3 row.
10. Run every required check.

## Panel baseline (approved; tunable in the slice)

- Answer scores: honest 2, inflate 3, fabricate 4, imitate 2, blank 0; a
  stale answer scores one less, floor 0. Sum the four requirements (0–16).
- Seeded panel mood: −1, 0, or +1. Total 0–17.
- Funded at 12 or more; waitlisted at 8 or more; otherwise rejected.
- Standing: funded +10, waitlisted 0, rejected −5.
- Flags `panel.funded`, `panel.waitlisted`, or `panel.rejected`; messages
  `message.panel.funded`, `.waitlisted`, `.rejected`, `.missed`.
- Renewal closes on rejected (and already on the missed deadline).

## Review baseline (approved; tunable in the slice)

- Submitted when the meter holds at least one requirement and every one is
  satisfied; otherwise the outcome is `not-submitted`, standing −10, flag
  `paper.not-submitted`, and renewal closes.
- Reviewer preferences, before the quirk:
  - `reviewer.methods`: +1 per satisfied controls and replicates, +1 with no
    stale evidence, −1 when the paper revision exceeds one.
  - `reviewer.significance`: +1 per satisfied impact and presentation, +1 when
    the paper has been reframed at least once.
  - `reviewer.profile`: +1 with Voss trust at 60 or more, +1 with the
    take-credit flag, −2 when a discovery flag exists.
- Each reviewer adds a seeded quirk of −1, 0, or +1. Recommendation: accept at
  3 or more; minor at 1 or more; major at −1 or more; otherwise reject.
- Verdict: the majority of the three; when all three differ, the harshest
  recommendation wins.
- Standing: accept +10, minor revision +5, major revision 0, reject −5.
- Every report carries the reviewer ID, its recommendation, and two stable
  comment IDs (`review.<reviewer>.<recommendation>.1` and `.2`); the verdict
  is emitted with the outcome and whether discovery fired.

## Discovery baseline (approved; tunable in the slice)

- Risk items: each fabricated fellowship answer, each both-track result, and
  the take-credit flag.
- Panel: one seeded roll with `nextInt(4) < min(risk, 3)`; caught means
  rejected, integrity −10, flag `discovery.panel`, message
  `message.discovery.panel`.
- Review: one seeded roll over overlap results plus take-credit; caught drops
  the verdict one rank (accept→minor, minor→major, major→reject, reject
  stays), costs integrity −10, sets flag `discovery.review`, and emits
  `message.discovery.review`.

## Draw order (deterministic)

- Panel: mood, then the discovery roll.
- Review: the methods quirk, the significance quirk, the profile quirk, then
  the discovery roll.
- The final `rngState` is part of the returned state; the once-per-event flags
  make repeated evaluation harmless.

## Non-goals

- No endings, personnel file, archive, ejection, burnout, or quitting
  resolution (STEP-012).
- No interface, written content, persistence changes, or assets.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Pure and deterministic apart from the documented seeded draws; no I/O and
  no clock.
- Atomic results: rejections leave the state untouched; stable reason codes.
- Reviews judge documents, never the player as a person; no real people or
  institutions are depicted.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `a56adf766727ab64eda55dec6ec1796af2ec064c`.
- Branch: `work/step-011-review-panel`.
- Plan checkpoint: `f860d50` (`Approve STEP-011 review and panel plan`),
  including this record.
- Implementation commit: `45d26ddaa2daa6430e0b6ea3dbb25bd59510056b`
  (`Add review and panel outcomes`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 155 unit tests (27
  new after both correction rounds), and the content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 12 passed in Chromium, Firefox, and WebKit.
- `git diff --check` and `git status`: clean at the implementation head.
- Corrections commit: `0c1fd71` (`Correct STEP-011 comment IDs and strengthen
tests`).
- Second corrections commit: `7579a24` (`Apply STEP-011 re-review
corrections`).
- Follow-up commit: `c393922` (`Record STEP-011 re-reviews and finalize
tests`).
- Integrated on local `main` at `c734103` by fast-forward, and `npm run
verify` passed on `main`.
- Primary observation (not a committed test): a read-only probe over seeds
  1–48 measured the satirical spread. All-inflate proposals funded 35 times,
  were waitlisted 13 times, and never rejected. A fully careful paper landed
  on accept 23 times, minor revision 8, and major revision 17. One stale
  result shifted that to 8 accept, 16 minor, and 24 major. The baselines
  behave as intended and remain slice-tunable.
- Deviations: none outside the owned paths. The paper outcome field required
  the recorded updates to four existing test suites, and the funding-review
  week change updated its events test as planned. The plan was approved with
  the reviewer configured as `opencode-go/glm-5.3` at variant `max`; D-045
  switched the review agents to `opencode-go/gpt-5.6-luna` at variant `high`
  mid-step, and every review above ran on Luna.
- Limitations: no interface reads the outcomes yet, so the browser tests do
  not exercise them; report and message ids have no content until the content
  phase; the baselines are not balanced by a full run, which the slice gate
  owns; the probe above is not part of the committed suite.

## Independent review

Completed 2026-09-15 by `mr-reviewer` (`opencode-go/gpt-5.6-luna`, variant
`high`), a different model family from the primary: **no blocker and three
required findings**, all corrected in this step. The reviewer re-ran the
claimed checks independently (typecheck, 147 unit tests at the time, 12
browser tests), verified the owned paths, the baselines, purity and atomicity,
the seeded draw order, the event wiring, and the record, and confirmed the
19-new-test claim and the probe description. One advisory was recorded (stale
process text, corrected as record cleanup).

A fresh re-review by the same configured reviewer completed the same day after
the first correction round: no blocker, and three required findings remained
(the comment-ID test still derived its expectation from the implementation,
residual 2026-09-13 dates in the other documents and the record, and the
individual profile and significance reward components not covered
separately). All three were corrected in `7579a24`; no regressions or scope
changes were found in either re-review.

A second re-review then confirmed the mechanics, the record, and the 155-test
suite, and found one remaining required item (the missing re-review entries
in `docs/ai-use-log.md`) plus a test-ordering advisory; both were fixed in
`c393922`. The final verification cleared the step: **no blocker and no
required finding**. It recorded one advisory: the plan text names the
original `glm-5.3` reviewer configuration while the actual reviews ran on
`gpt-5.6-luna` per D-045; the execution record now states this explicitly.

## Corrections

- **R-1 (required):** the emitted report comment IDs lacked the approved
  `review.` namespace (`reviewer.methods.accept.1` instead of
  `review.methods.accept.1`), and the test reproduced the implementation.
  Fixed in `0c1fd71`; the test now asserts the exact approved IDs plus the
  full ID shape.
- **R-2 (required):** the record dated the plan and implementation 2026-09-13,
  but the commits are dated 2026-09-15, and the required STEP-011 entries were
  missing from `docs/ai-use-log.md`. Dates corrected throughout the record,
  and the primary-session and reviewer entries added.
- **R-3 (required):** the profile-discovery and stale-methods tests used `>=`
  comparisons that would pass if the penalties were removed, and the reviewer
  preference branches and the separate discovery-risk items were weakly
  covered. The tests now use exact rank-shift and threshold-crossing
  assertions, cover the profile reward and significance branches, cover the
  overlap-only and take-credit-only risks, and assert the exact event effect
  arrays for the main branches.

Advisories recorded from the independent review:

- The process file header and one Phase C paragraph were stale; corrected as
  record cleanup with the other dates.

Re-review corrections (second round, `7579a24`):

- **R-1 (remaining):** the comment-ID test now derives the expected roots from
  a fixed contract map and asserts the reviewer order, so it no longer mirrors
  the implementation.
- **R-2 (remaining):** the `docs/ai-use-log.md` header, the revision lines in
  the three touched design and spec documents, and the step record's stale
  "remaining plan awaits approval" sentence now carry the correct dates.
- **R-3 (remaining):** each profile, significance, and methods reward
  component now has its own separating-seed test, and the reframe penalty has
  a dedicated test, so removing any single component fails the suite.

## Leonardo decision

Plan approved by Leonardo on 2026-09-15 after he reviewed the written draft.
Implementation complete on 2026-09-15; the independent review returned no
blocker and three required corrections, applied in two rounds and awaiting
the final re-review. Leonardo's result review pending.
