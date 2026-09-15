---
id: STEP-012
type: development-step
status: accepted
phase: 2
gate: foundation
created: 2026-09-15
updated: 2026-09-15
base_commit: 03624e8f6df1d2ba41aae19a8151e6c4a3ef40ea
branch: work/step-012-endings
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-012 — The ending resolver

## Objective

End the run properly: resolve one of the four approved endings from the
player's final state, produce the structured personnel file, and archive the
completed run. Implement the run-end triggers (warned ejection, burnout,
quitting) and the `quit` command.

## Plain-language effect

The run can now end before the contract through collapse or quitting, and
every run finishes with a named ending, a personnel file that states what
happened, and an archived record.

## Decisions taken by Leonardo on 2026-09-15

- Quitting resolves to **Out with something intact**; the personnel file
  records the exit as the cause.
- The **archive store is implemented now** (save, list, remove) with browser
  coverage, not deferred to the interface phase.

## Owned paths

- `src/rules/endings.ts` (new: ending ids, resolution and personnel-file
  builders, the run-end evaluation, and the quit command)
- `src/rules/campaign-state.ts` (the resolution, crash-weeks, and
  standing-warning fields and their validation)
- `src/rules/commands.ts` (the `run-finished` reason)
- `src/rules/week-loop.ts` (record the crash week)
- `src/rules/dispatch.ts` (quit routing, the run-end evaluation, the
  run-finished gate)
- `src/rules/index.ts`
- `src/persistence/archive.ts` (new: the archived-run shape and validation)
- `src/persistence/archive-store.ts` (new: save, list, remove)
- `src/persistence/persistence.ts`, `src/persistence/index.ts` (the archive
  store on the persistence handle)
- `tests/unit/rules-endings.test.ts` (new),
  `tests/unit/persistence-archive.test.ts` (new),
  `tests/unit/rules-commands.test.ts`, `tests/unit/rules-week-loop.test.ts`,
  `tests/unit/rules-state.test.ts`, `tests/unit/rules-outcomes.test.ts`,
  `tests/e2e/persistence.spec.ts`
- `docs/specs/03-state-and-rules.md` (state and command rows),
  `docs/specs/05-persistence.md` (the archive entry shape),
  `docs/design/03-pressure-and-failure.md` (the run-end baselines),
  `docs/design/04-narrative.md` (the ending decision baselines),
  `docs/design/00-process.md` (resume point)

## Prohibited paths

- `docs/**` except the listed files and the step record; `AGENTS.md`,
  `README.md`, `opencode.json`, `.opencode/**`
- Ending text, personnel-file prose, the archive and personnel screens, the
  epilogue, retrospective scoring, migration, interface, assets, any release,
  licence, or deployment action

## Allowed sources

- `docs/design/02-core-loop.md`, `docs/design/03-pressure-and-failure.md`,
  `docs/design/04-narrative.md`, `docs/design/05-characters.md`,
  `docs/design/07-content-and-evaluation.md`
- `docs/specs/03-state-and-rules.md`, `docs/specs/05-persistence.md`,
  `docs/specs/07-interface-and-accessibility.md`,
  `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- A4 (the four endings and their determinants, the meta moment of the
  personnel file); A3 (ejection with warning, burnout after repeated crashes,
  quitting, the contract's natural end); B3 (state, commands, determinism,
  atomic results); B5 (the archive store); B7 (the archive and personnel
  screens exist in the eventual interface); B10 (tests and evidence).
- STEP-012 of the amended C2 list; phase 2.
- Carried advisories: STEP-009 ADV-2 (rent enforcement; parked for the
  desk-board step and not touched here), STEP-010 ADV-2 (reason-code
  precedence; the new reason follows the existing gate-first pattern).

## Accepted dependencies

- STEP-011 accepted by Leonardo on 2026-09-15.
- The quit-ending and archive decisions above, made by Leonardo on
  2026-09-15. The plan was approved by Leonardo on 2026-09-15 after he
  reviewed this draft.

## Plan

The primary implements this step. One fresh independent review by
`mr-reviewer` (`opencode-go/gpt-5.6-luna`, `high`), a different model family
from the primary, plus a fresh re-review if code corrections are required. No
worker is used; the logic spans the state, the loop, the dispatcher, and
persistence, and one session can hold it.

## Tasks

1. State: a `resolution` object (`cause`: `none`, `contract`, `ejection`,
   `burnout`, or `quit`; `ending`: an ending id or `null`; `week`: a number or
   `null`), a `crashWeeks` list, and a `standingWarningWeek` number or `null`,
   with validation and the B3 rows.
2. Ending ids and causes: `ending.hollow`, `ending.complicit`,
   `ending.intact`, `ending.ejected`; the resolver and the personnel-file
   builder.
3. Run-end evaluation after every successful command: burnout first (a second
   crash inside the same act), then ejection (the warning deadline), then the
   contract end (a finalized paper outcome).
4. The ejection warning: standing at or below 20 sets the warning week, the
   flag, and a message once; rising above 20 clears the live warning; reaching
   the deadline while still at or below 20 ends the run.
5. The burnout trigger: record the crash week at the moment of the crash;
   two crash weeks in the same act end the run.
6. The `quit` command: resolve immediately with cause `quit` and the intact
   ending; refuse every command with the `run-finished` reason once the run
   has resolved.
7. The contract-end decision, the personnel file, and the resolution effects
   (`run-ended`, `personnel-file`, and the ending message id).
8. The archive: the archived-run shape and validation, the store (save, list
   newest first, remove), the persistence handle, and clear-all-data removing
   archive entries.
9. Tests: every trigger, the warning lifecycle, the four ending quadrants,
   the personnel file, the archive round trip, the run-finished gate, state
   validation, no mutation, and determinism; update the affected suites.
10. Record the state, command, persistence, and design rows, then run every
    required check.

## Baselines (approved with this plan; tunable in the slice)

- **Ejection warning at standing 20 or below; two turns to recover.** The
  warning records the week; at `warning week + 2` with standing still at or
  below 20 the run ends. Rising above 20 clears the live warning.
- **Burnout:** a second crash in the same act ends the run. Acts are weeks
  1–4, 5–8, and 9–12. The crash week is the week in which the collapse
  happened, before the lost week advances the calendar.
- **Quitting** is always available and resolves to the intact ending.
- **Contract end:** the run resolves when the journal review finalizes the
  paper outcome.

### The ending decision (proposed; tunable)

Two derived facts decide the contract-end ending:

- **Success:** the renewal is open (the `renewal.closed` flag is not set) or
  the paper outcome is `accept` or `minor-revision`.
- **Kept:** integrity is 60 or more and at least one of Dario or Mara is at 40
  trust or more ("who stayed").

| Run end             | Condition             | Ending             |
| ------------------- | --------------------- | ------------------ |
| Ejection or burnout | —                     | `ending.ejected`   |
| Quit                | —                     | `ending.intact`    |
| Contract            | success and not kept  | `ending.complicit` |
| Contract            | success and kept      | `ending.hollow`    |
| Contract            | not success and kept  | `ending.intact`    |
| Contract            | not success, not kept | `ending.ejected`   |

### The personnel file (structured facts only; prose arrives with content)

Ending, cause, week, seed, paper outcome, fellowship outcome, standing,
integrity, the three relationship values, who stayed (Dario and Mara at 40 or
more), the complicity actions in fixed order, the discovery kinds, the crash
weeks, and whether the player quit. A pure validator ships with it for
persistence.

### The archive (shape approved with this plan)

An archived run holds the caller-supplied run ID and archive timestamp, the
seed, the ending, the cause, the week, and the personnel file. The store
saves, lists newest first (ties by run ID), and removes by run ID. The
application layer generates the run ID and timestamp at completion so the
rules stay free of the clock.

## Non-goals

- No ending text, personnel-file prose, epilogue writing, or ending-card
  layout (content phase).
- No archive or personnel-file screens, no retrospective scoring, no
  migration (interface and later phases).
- No rent-enforcement change (parked at the desk-board step).

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Pure and deterministic rules; the clock enters only as a caller-supplied
  archive timestamp outside the rules.
- Atomic results: rejections leave the state untouched; stable reason codes.
- The personnel file states facts without moralising, and reviews judge
  documents, never the player as a person.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `03624e8f6df1d2ba41aae19a8151e6c4a3ef40ea`.
- Branch: `work/step-012-endings`.
- Plan checkpoint: `d5848a4` (`Approve STEP-012 endings plan`), including
  this record.
- Implementation commit: `05ca9f2ec8fe0e0316d643372eb33445c4954445`
  (`Add the ending resolver and archive`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 185 unit tests (30
  new after both correction rounds), and the content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 15 passed in Chromium, Firefox, and WebKit, including
  the archive round trip, the newest-first ordering with the timestamp tie
  break, the invalid-archive report and preservation, and the clear-data
  behaviour.
- `git diff --check` and `git status`: clean at the implementation head.
- Corrections commit: `2d81d17` (`Apply STEP-012 review corrections`).
- Second corrections commit: `6de303a` (`Strengthen STEP-012 regression
tests`).
- Integrated on local `main` at `3a34203` by fast-forward, and `npm run
verify` passed on `main`.
- Scope note: the wide diff from `03624e8` also contains two inherited
  commits made outside this step (`9828e41` and `894c5ee`, the D-047 worker
  model change recorded in the decision log); this step's own changes are
  `d5848a4` onward, and no path outside the approved list changed within
  them.
- Deviations: the ending ids, causes, and resolution shape live in
  `campaign-state.ts` with the other state shapes, while `endings.ts` owns the
  resolution rules; this avoids a runtime cycle from the state module into
  the resolver. The archive store validates every entry it reads and writes
  and reports invalid stored entries instead of hiding them.
- Limitations: no interface reads the resolution or the archive yet; ending
  and personnel-file text has no content until the content phase; the
  baselines are not balanced by a full run, which the first-playable and
  slice gates own.

## Independent review

Completed 2026-09-15 by `mr-reviewer` (`opencode-go/gpt-5.6-luna`, variant
`high`), a different model family from the primary: one blocker and seven
required findings, all corrected in this step. The reviewer re-ran the claimed
checks independently (typecheck, 180 unit tests at the time, 12 browser
tests), verified the owned paths, the baselines, purity and determinism, the
absence of clock reads, and the record, and confirmed the 25-new-test claim.
A fresh re-review by the same configured reviewer completed the same day after
the first correction round: the production blocker and all required fixes were
confirmed, and four test-sensitivity items remained (the week-12 quit test did
not actually exercise the pre-fix path, the crash-order test only covered
duplicates, the tie-break test could not distinguish the comparator from key
order, and invalid-archive preservation was not verified before clearing).
All four were corrected in `6de303a`; no production regression was found.

The final verification completed the same day: all findings were resolved, the
production changes were regression-free, and the 185 unit tests and 15 browser
tests passed. It cleared the step for integration with one record-only
correction (the test count in `docs/ai-use-log.md`), which was applied before
integration.

## Corrections

- **B1 (blocker):** `quit` was followed by event evaluation, so a week-12
  quit could fire the journal review and the contract event and leave the
  personnel file inconsistent. Fixed in `2d81d17`: `dispatch` now returns a
  resolved command immediately without evaluating events, and `evaluateEvents`
  refuses to fire once the run has resolved. A regression test covers the
  week-12 quit.
- **R-1 (required):** the run-finished gate ran after command-shape
  validation; it now precedes it, so even malformed commands on a resolved
  run receive `run-finished`.
- **R-2 (required):** the validators accepted impossible resolutions. The
  state validation now requires the resolving week to match the current week
  and pins `quit` to the intact ending and `ejection`/`burnout` to the
  ejected ending; the personnel-file validation carries the same cause-ending
  rules.
- **R-3 (required):** the archive list silently dropped invalid entries. It
  now returns an explicit ok-or-invalid outcome with the issues, and a
  browser test covers a corrupted stored entry.
- **R-4 (required):** the personnel-file validation now rejects unexpected
  fields and relationship keys, enforces the fixed order of the stayed,
  complicity, and discovery lists, and requires strictly increasing crash
  weeks.
- **R-5 (required):** the missing coverage was added: a dispatcher-level
  second crash, the burnout-over-ejection-over-contract precedence, a
  malformed command on a resolved run, the invalid archive read, and the
  timestamp tie break.
- **R-6 (required):** the record now distinguishes the inherited commits from
  this step's own changes (scope note above).
- **R-7 (required):** the STEP-012 primary and reviewer entries were added to
  `docs/ai-use-log.md`.
- **Re-review (required, `6de303a`):** the first-round tests were made
  regression-sensitive: the week-12 quit test now uses no remaining action
  slots so the pre-fix behaviour would fail it and it asserts a single
  personnel-file effect and no event flags; the crash-order checks cover an
  out-of-order list; the timestamp tie break has a direct comparator unit
  test; and the invalid-archive browser test confirms the entry is preserved
  before clearing. The state crash-weeks validation now requires increasing
  weeks.

## Leonardo decision

The quit-ending and archive decisions were made on 2026-09-15. Plan approved
by Leonardo on 2026-09-15 after he reviewed the written draft. **Accepted by
Leonardo on 2026-09-15** after the result review: the run-end triggers, the
four-ending decision table, the personnel file, the archive store, the
run-finished gate, the records and evidence (185 unit tests and 15 browser
tests; `npm run verify` on `main`), and the three review rounds with every
finding corrected were reviewed with no visible issue.
