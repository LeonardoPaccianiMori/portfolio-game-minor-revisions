# AI Use Log (v2)

Status: **current; private; project-specific**

Last updated: 2026-09-13.

## Purpose and scope

This is the private source of truth for AI contributions to _Minor Revisions_
after the 2026-09-10 v2 design restart. It records the provider, exact model,
actual reasoning variant or effort, role, completed work, phase, and durable
evidence. It applies only to this project.

The v1 log is preserved in Git at commit
`c438b7f30059c47cc80d19363a92833d1ae002b3`. Its entries are not re-attributed
here.

## Recording rule

Add one entry for every primary opencode session that completes project work
and one entry for every completed subagent contribution. Each entry states:

- the date or date range;
- provider, exact model, and actual reasoning variant or effort;
- role and completed work;
- phase or block; and
- durable supporting evidence, such as a commit, document, or review record.

Record actual values. If the exact model or reasoning variant is genuinely
unavailable, write `unknown`; do not infer it from a configuration default. Do
not record failed, interrupted, considered, or abandoned runs. Token and dollar
totals are tracked separately in `docs/costs.md`. Do not store
credentials, personal data, raw conversation, hidden reasoning, or machine
paths.

## Completed history

### 2026-09-13 — STEP-009 events and deadlines

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-009 under the
approved plan. It added the authored event engine and its deterministic
catalogue (funding review, rent with three choices, contamination, fellowship
deadline, contract decision), the `pendingEvent` state field and the
`resolveEvent` command, the dispatcher integration, the B3 state and command
rows, the A3 rent baselines, and 23 tests; it integrated on `main` and
recorded the acceptance. Evidence:
`docs/development/steps/STEP-009-events.md`; commits `959188a`, `b65d5a3`,
`9b5b603`, `888d82d`, `6da989a`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: completed the
independent review of STEP-009, found no blocker and no required finding, and
recorded seven advisories with owners.

### 2026-09-13 — STEP-008 PI system

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-008 under the
approved plan. It added PI request application, the meeting action, the five
complicity actions with the approved baselines and permanent flags, the shared
action-slot spend, the fellowship revert edit, the A3 baseline table, and the
PI tests; it integrated on `main` and recorded the acceptance. Evidence:
`docs/development/steps/STEP-008-pi-system.md`; commits `67ffe3d`, `8fa5770`,
`81a0f77`, `13477bb`, `2ccd750`, `15ce77d`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: the completed
independent review (a first attempt was cancelled before producing a result)
found no blocker and no required finding, and recorded six advisories with
owners.

### 2026-09-13 — STEP-007 fellowship track

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-007 under the
approved plan. It lifted evidence to a shared top-level set with track and
overlap, added the fellowship model, `answerRequirement`, the shared reframe,
the B3 state-table update, and the new tests; it applied the required R-1
correction, integrated on `main`, and recorded the acceptance. Evidence:
`docs/development/steps/STEP-007-fellowship.md`; commits `f62117a`, `cd165f3`,
`ca9aba0`, `7b54042`, `a56f1ed`, `e27f4ba`, `d4e62d9`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: first independent
review of the STEP-007 branch. It found no blocker, two required findings (the
reframe staled every fellowship answer, contradicting A2 and B4; and a test
file outside the planned owned paths), and five advisories.

OpenCode Go `mr-reviewer` subagent, fresh session, configured
`opencode-go/glm-5.3` at variant `max`, actual runtime model metadata not
exposed: re-review of the corrected result. It verified both corrections with
no blocker or required finding, and recorded three advisories for integration
and the next rules-test touch.

### 2026-09-13 — STEP-006 paper track

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-006 under the
approved plan. It added the paper model, the requirement meter, evidence
attachment, the add/reframe/revert edits, paper validation in the state, the
B5 development-save decision, and the paper tests; it integrated on `main` and
recorded the acceptance. Evidence:
`docs/development/steps/STEP-006-paper-track.md`; commits `1fd46cf`,
`400b47e`, `6d7617b`, `9afb6df`, `d8e23c9`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: independent review of
the STEP-006 branch. It found no blocker and no required finding, and recorded
six advisories with owners, including the evidence-set location decision for
STEP-007.

### 2026-09-13 — Science-language rule

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: added the approved science-language rule to
`docs/design/07-content-and-evaluation.md` and extended the audience line in
`docs/design/01-vision.md` to include academics from other disciplines, with
`D-039` in the decision log. No code or game rule changed.

### 2026-09-13 — STEP-005 week loop and resources

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-005 under the
approved plan. It added the week-slot economy, the energy baseline, automatic
week advancement, rest as a normal action, the crash and lost week, the
contract-end rejection, the three approved reconciliations in A3 and B3, and
the week-loop tests; it integrated on `main` and recorded the acceptance.
Evidence: `docs/development/steps/STEP-005-week-loop.md`; commits `5c0f4b1`,
`c1f9675`, `0bb4904`, `f7cdbb2`, `f4a5a27`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: independent review of
the STEP-005 branch. It found no blocker and no required finding, and recorded
three advisories with owners (B3 wording, week-12 terminal corners for
STEP-011, and state-version migration ownership for B5 and STEP-034).

### 2026-09-13 — STEP-004 persistence skeleton

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-004 under the
approved plan. It added the local database, the validating campaign store with
guarded backup rotation, whole-record load outcomes, settings, clear-all-data,
the carried state-validation bounds, and the unit and browser tests; it applied
the required R-1 correction, integrated on `main`, and recorded the acceptance.
Evidence: `docs/development/steps/STEP-004-persistence-skeleton.md`; commits
`797d418`, `fad8e36`, `b359848`, `6ff1743`, `c7861db`, `b012d36`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: first independent
review of the STEP-004 branch. It found no blocker, one required finding (R-1,
missing invalid-handling coverage), and seven advisories; the correction fixed
R-1, ADV-B, and ADV-C.

OpenCode Go `mr-reviewer` subagent, fresh session, configured
`opencode-go/glm-5.3` at variant `max`, actual runtime model metadata not
exposed: re-review of the corrected result. It verified R-1, ADV-B, and ADV-C
as fully applied with no blocker or required finding, and recorded two
documentation advisories for STEP-034.

### 2026-09-13 — STEP-003 rules skeleton

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-003 under the
approved plan. It added the campaign state, validation, serialization, seeded
PRNG, command and result contracts, and the rejecting dispatcher, with three
rule test files; it recorded the review advisories, integrated on `main`, and
recorded the acceptance. Evidence:
`docs/development/steps/STEP-003-rules-skeleton.md`; commits `2d6ff35`,
`c93782d`, `702059b`, `37dae6e`, `507353d`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: independent review of
the STEP-003 branch. It found no blocker and no required finding, and recorded
four advisories with owners (rest duplication, initial meter values, validation
bounds, and two test gaps).

### 2026-09-13 — STEP-002 application shell

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-002 under the
approved plan. It added the application coordinator, request queue, frame loop,
platform compatibility, timing and frame scheduler, the safe error screen, and
the unit and browser tests; it applied the required R-1 correction, integrated
on `main`, and recorded the acceptance. Evidence:
`docs/development/steps/STEP-002-application-shell.md`; commits `4ac5ed3`,
`97a0a04`, `f4a220c`, `0096211`, `8d88ad9`, `8b5cdec`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: first independent
review of the STEP-002 branch. It found no blocker, one required finding (R-1,
the startup fault boundary around the frame loop), and six advisory notes.

OpenCode Go `mr-reviewer` subagent, fresh session, configured
`opencode-go/glm-5.3` at variant `max`, actual runtime model metadata not
exposed: re-review of the corrected result. It verified R-1 as fully applied
with no blocker or required finding and recorded two hardening advisories
(ADV-R2a and ADV-R2b).

### 2026-09-13 — STEP-001 toolchain foundation

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: prepared and implemented STEP-001 under the
approved plan. It restored the tested toolchain foundation, added the content
manifest and validator, the start page, the foundation unit test, and the
three-browser start-page test; it ran `npm ci`, `npm run check`, `npm run
build`, `npm run test:e2e`, and `npm run verify`; it applied the review
corrections, integrated on `main`, and recorded the acceptance. Evidence:
`docs/development/steps/STEP-001-toolchain-foundation.md`; commits `df7a0ec`,
`d484112`, `c40f956`, `0d8a201`, `34c7e9b`.

OpenCode Go `mr-reviewer` subagent, configured `opencode-go/glm-5.3` at
variant `max`, actual runtime model metadata not exposed: performed the fresh
independent review of the STEP-001 branch. It found no blocker, one required
record reconciliation (applied as `D-033`), and three advisories (date
correction applied; validator gaps carried to STEP-018; acceptance records
completed). Evidence: the review record in the STEP-001 step record.

### 2026-09-10 — v2 design restart opened

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: executed Leonardo's approved full design restart.
It created `docs/design/00-process.md` and `docs/design/decision-log.md`,
removed the v1 documents from the working tree while recording their archive
commit, rewrote `README.md` and `AGENTS.md` for v2, replaced the development
commands with the design-session command, and opened Phase A Block A1. It made
no game design decision and wrote no game code. Evidence: the v2 restart
commit and `docs/design/00-process.md`.

In the same session it completed Block A1 with Leonardo, obtaining and
recording his decisions on concept, thesis, tone, audience, length, form,
failure, resources, cast, scientific field, darkness, and replay, and wrote
`docs/design/01-vision.md`. Evidence: `docs/design/01-vision.md`, `D-005` in
the v2 decision log, and the Block A1 commit.

In the same session it recorded the asset-sourcing policy (`D-006`), set up the
token and cost ledger with the `/cost-snapshot` command (`D-008`,
`docs/costs.md`), and documented Block A2 in `docs/design/02-core-loop.md`
(`D-007`). It then confirmed the A2 details, documented Block A3 in
`docs/design/03-pressure-and-failure.md` (`D-010`), made milestone cost
snapshots part of every milestone commit (`D-011`), opened Block A4, and then
documented Block A4 in `docs/design/04-narrative.md` (`D-012`) and opened
Block A5. It then documented Block A5 in `docs/design/05-characters.md`
(`D-013`) and opened Block A6. It documented Block A6 in
`docs/design/06-world-and-presentation.md` (`D-014`) and opened Block A7. It
then documented Block A7 in `docs/design/07-content-and-evaluation.md`
(`D-015`) and opened Block A8, the final design block. It documented Block A8
in `docs/design/08-production-constraints.md` (`D-016`) and reopened Blocks A4
and A5 for the PI caricature and fellowship proposal (`D-017`), with the
implementation synthesis awaiting approval. After approval it implemented the
revision across `04-narrative.md`, `05-characters.md`, `02-core-loop.md`,
`03-pressure-and-failure.md`, `06-world-and-presentation.md`, and
`07-content-and-evaluation.md` (`D-018`), closing Phase A. It then implemented
the manuscript–fellowship linkage (`D-019`), documented Block B1 in
`docs/specs/01-toolchain.md` (`D-020`), and opened Block B2. It then documented
Block B2 in `docs/specs/02-architecture.md` (`D-021`) and opened Block B3. It
then documented Block B3 in `docs/specs/03-state-and-rules.md` (`D-022`) and
opened Block B4. It then documented Block B4 in
`docs/specs/04-content-and-data.md` (`D-023`) and opened Block B5. It then
documented Block B5 in `docs/specs/05-persistence.md` (`D-024`) and opened
Block B6. It then documented Block B6 in
`docs/specs/06-world-and-interaction.md` (`D-025`) and opened Block B7. It then
documented Block B7 in `docs/specs/07-interface-and-accessibility.md`
(`D-026`) and opened Block B8. It then documented Block B8 in
`docs/specs/08-rendering-and-audio.md` (`D-027`) and opened Block B9. It then
documented Block B9 in `docs/specs/09-performance-and-browsers.md` (`D-028`)
and opened Block B10, the final Phase B block. It then documented Block B10 in
`docs/specs/10-testing-and-workflow.md` (`D-029`), completing Phase B, and
proposed the Phase C structure. Leonardo approved the Phase C structure
(`D-030`), and Block C1 was opened. It then documented Block C1 in
`docs/specs/11-development-pathway.md` (`D-031`), added the fresh-session
resume procedure, and opened Block C2. It then documented Block C2 in
`docs/specs/12-development-steps.md` (`D-032`), completing Phase C, and
prepared the STEP-001 plan for approval.
