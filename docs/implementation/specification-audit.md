# S14 — Specification Audit and Gate Packet

Status: **historical S14 audit documented; Gate 1 approved; Steps 1–3 accepted; approved Step-4 correction freezes `MR-IF-002 v4`**

## Purpose and authority

This document closes the S00–S14 technical-specification programme. It audits
the approved design and implementation documents at baseline commit
`52e7a778dd0a24ccd55ab359b897154d7949c7a3`. It records corrections, freezes
the shared `v1` interface contracts, resolves `MR-IMP-OPEN-014`, and supplies
the packet that Leonardo can use for a separate Gate-1 decision.

This audit is documentation evidence only. It does not claim that a package,
source file, test, asset, work order, build, browser run, performance result,
or play result exists. It does not authorize implementation.

## Finding contract

Every finding uses stable ID `MR-S14-FIND-nnn` and one of these states:

| State            | Meaning                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `pass`           | The audited documents agree and the named evidence is present.                                 |
| `corrected`      | The audit found a documentation defect and this S14 change corrects it.                        |
| `measured later` | The method, target, and response rule exist, but a build or later production fact is required. |
| `blocked`        | A material conflict or missing decision prevents Gate-1 readiness.                             |

A `pass` is not an execution result. A `measured later` item cannot be changed
to `pass` without the named later evidence. Any `blocked` item keeps Gate 1
blocked.

## Controlled inventory

The audit covers:

| Inventory                        | Count | Audit boundary                                                         |
| -------------------------------- | ----: | ---------------------------------------------------------------------- |
| Numbered design documents        |    16 | `docs/00-design-index.md` through `docs/15-implementation-contract.md` |
| Implementation specifications    |    13 | `docs/implementation/specs/01-...` through `13-...`                    |
| Registered requirements          |    22 | `MR-REQ-...` rows in `docs/15-implementation-contract.md`              |
| Top-level tests                  |    13 | Registered `MR-TEST-...` obligations                                   |
| Shared interfaces                |    15 | `MR-IF-001` through `MR-IF-015`                                        |
| Pre-S14 implementation decisions |   260 | `MR-IMP-DEC-001` through `MR-IMP-DEC-260`                              |
| Implementation issue groups      |    14 | `MR-IMP-OPEN-001` through `MR-IMP-OPEN-014`                            |
| S12 acceptance rows              |    45 | `MR-S12-ACC-001` through `MR-S12-ACC-045`                              |

The two advisory Opus 5 review sets and their recommendation register were
checked as supporting history. They do not override Leonardo's later approved
numbered design or implementation decisions.

## Audit results

| Finding           | Area                               | State            | Evidence and result                                                                                                                                                                                                                                                              |
| ----------------- | ---------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MR-S14-FIND-001` | Baseline and inventory             | `pass`           | Git baseline and the eight controlled counts above are fixed and reproducible.                                                                                                                                                                                                   |
| `MR-S14-FIND-002` | Internal links                     | `pass`           | Every repository-relative Markdown link resolves to an existing file or directory.                                                                                                                                                                                               |
| `MR-S14-FIND-003` | Authoritative tables               | `pass`           | Numbered design, implementation-control, specification, and asset tables have consistent columns and no blank-line interruption. Advisory review tables are excluded from this structural gate.                                                                                  |
| `MR-S14-FIND-004` | Stable IDs                         | `pass`           | Registered requirement, test, interface, decision, issue, fixture-group, work-package, and acceptance-row IDs have no duplicate or unintended gap in their controlled ranges.                                                                                                    |
| `MR-S14-FIND-005` | Requirement traceability           | `corrected`      | All 22 requirement rows now state sources, tests, S12 acceptance rows, interfaces, dependencies, one primary owner, and `approved; not implemented` status. The earlier five-column rows omitted required dependency and status facts.                                           |
| `MR-S14-FIND-006` | Interface consumers                | `pass`           | Every `MR-IF-001`–`MR-IF-015` owner, consumer, input, output, failure, invariant, fixture route, and affected connection is specified across S01–S13.                                                                                                                            |
| `MR-S14-FIND-007` | Interface freeze                   | `pass`           | No unresolved contradiction remains. `MR-IF-001`–`MR-IF-015` are frozen as `v1` in the Git commit that contains this audit and interface register. Freeze does not authorize use before Gate 1 and the exact separately approved implementation step that consumes an interface. |
| `MR-S14-FIND-008` | Gate sequence                      | `corrected`      | S14 originally split fallback and full authority. The later incremental workflow further supersedes batch authority: Steps 31, 53, and 70 are acceptance milestones, and every implementation step needs its own approval.                                                       |
| `MR-S14-FIND-009` | Content profiles                   | `pass`           | Slice, fallback, and full content remain one catalogue with monotonic completion. An inactive profile can be explicitly incomplete during an earlier phase, but an incomplete profile cannot build.                                                                              |
| `MR-S14-FIND-010` | Content meaning and fiction safety | `pass`           | The specification keeps one authored English source, no generated story text, no real-person or real-institution copy, no actionable wet-lab protocol, and no causal regenerative claim. Later final prose still requires its named manual review.                               |
| `MR-S14-FIND-011` | Privacy and diagnostics            | `pass`           | The game remains local and account-free, with no telemetry or automatic reporting. Diagnostics exclude campaign, storage, identity, typed-input, path, raw-error, stack, and personal facts. Evidence records have the same privacy boundary.                                    |
| `MR-S14-FIND-012` | Assets, licences, and provenance   | `pass`           | No production asset or public licence file exists. Every later asset needs a verified manifest record before integration. Remote, source release, licence creation, and publication remain separately approved actions.                                                          |
| `MR-S14-FIND-013` | Accessibility                      | `pass`           | Keyboard, controller, semantic HTML, focus, captions, scale, contrast, reduced motion, colour redundancy, Interaction Assist, responsive blocking, and manual assistive-reading acceptance routes agree across design, S09, S10, and S12.                                        |
| `MR-S14-FIND-014` | Numeric contracts                  | `pass`           | Key duration, campaign, content-count, experiment, scene, ending, asset, word, geometry, audio, storage, diagnostic, browser, and performance targets agree across authoritative documents.                                                                                      |
| `MR-S14-FIND-015` | Ownership and phase scope          | `pass`           | Ten work packages have non-overlapping planned ownership, a fixed dependency order, a future stored-work-order requirement, independent review, controlled integration, and separate slice, fallback, and full authority.                                                        |
| `MR-S14-FIND-016` | Future-path boundary               | `pass`           | No planned package, source, content, test, work-order, contribution, worktree, production-asset, licence, remote, deployment, or runtime-result path exists.                                                                                                                     |
| `MR-S14-FIND-017` | Result claims                      | `pass`           | No implementation, build, browser, performance, play-duration, player-comprehension, or release result is claimed. Specification fixtures remain expected future evidence.                                                                                                       |
| `MR-S14-FIND-018` | Toolchain and automated checks     | `measured later` | Step 1 must recheck versions and licences, create the package baseline, install cleanly, and run the approved commands. Failure reopens the affected contract.                                                                                                                   |
| `MR-S14-FIND-019` | Browser and performance evidence   | `measured later` | S11 fixes direct-browser, reference-device, three-run, memory, loading, transfer, and long-session methods, targets, and failure responses. Results require an applicable build.                                                                                                 |
| `MR-S14-FIND-020` | Play quality and duration          | `measured later` | Leonardo's private slice, fallback, and full-game reviews plus the clean-context comprehension check remain required at their named acceptance gates.                                                                                                                            |
| `MR-S14-FIND-021` | Asset files and public rights      | `measured later` | Exact sources, codecs, hashes, final asset IDs, credits, and redistribution evidence are verified before integration and again before release preparation.                                                                                                                       |

There is no `blocked` S14 finding.

## Post-S14 model-routed governance amendment

Leonardo approved this documentation-only amendment on 2026-08-31. It adds
project-local Codex configuration and makes the future S13 model-selection
rules explicit. It does not reopen an Sxx decision group, alter a numbered
design document or frozen interface, or authorize Gate 1, Step 1, code,
package configuration, tests, assets, work orders, contributions, network
actions, a remote, a licence, deployment, or a runtime result.

| Check                            | Required result                                                                                                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Configuration scope              | `.codex/config.toml` permits at most two subagents and contains no game-runtime configuration. The three role files define only the controlled worker, independent reviewer, and asset researcher.                                                           |
| Model authority                  | S13, AGENTS, the incremental roadmap, status, decision, acceptance, and index records agree that the primary agent passes and records an explicit model and reasoning effort. An inherited or silent replacement is invalid.                                 |
| Role boundary                    | The worker has no fixed model because each work order selects it; the reviewer is read-only Sol `xhigh`; the asset researcher is read-only Terra `high`; no role can contact Leonardo, delegate again, integrate, or accept work.                            |
| Future validation                | `MR-S13-WO-001`, together with the linked approved step delegation table, requires every later assignment to prove matching model, effort, source packet, role, path boundary, selection reason, and contribution evidence.                                  |
| AI-use provenance                | `ai-use-log.md` is a private _Minor Revisions_-only record of actual completed AI work. It records future primary sessions and completed subagents separately, uses `unknown` only for genuinely unavailable session metadata, and does not infer a default. |
| Technical and authority boundary | No source, package, test, asset, interface, work order, contribution, remote, licence, deployment, or result path is created; Gate 1 and Step 1 stay blocked.                                                                                                |

The primary agent must parse the TOML, review the complete documentation diff,
and obtain a fresh-context Sol `xhigh` read-only review before committing this
amendment. The independent-review result is recorded below.

The AI-use documentation is a later provenance-control update. It does not
reopen S14, change an Sxx decision, alter a frozen interface, or change Gate 1
or Step 1.

## AI-use documentation independent review

A fresh-context, read-only independent reviewer used OpenAI `gpt-5.6-sol`
with `xhigh` reasoning on 2026-08-31 to review the AI-use documentation diff.
It found no blocker. It required two record corrections: the two completed
Opus review programmes must use their verified 2026-08-28 date, and the log
must exclude uncompleted runs by category without naming individual models.

The primary agent corrected both records. A second fresh-context, read-only
independent reviewer used OpenAI `gpt-5.6-sol` with `xhigh` reasoning on
2026-08-31 to review the corrected diff. It returned **pass** with no blocker,
required, or advisory finding. The two reviews covered only the approved
documentation paths and confirmed that Gate 1, Step 1, code, assets, licence,
remote, deployment, and runtime state did not change.

## Interface freeze record

`MR-IF-001` through `MR-IF-015` are frozen as version `v1`. The owner,
consumers, evidence routes, and specification source for each interface remain
in `interfaces.md`. The freeze commit is the Git commit that contains this
audit, the updated interface register, and the S14 decision entries.

Freeze means that a future worker cannot change the shared contract by local
preference. A change requires the affected-consumer list, evidence and impact,
compatibility or migration analysis, updated fixtures and traceability, and
Leonardo's approval. Freeze does not mean implemented, tested, or approved for
code work.

## Independent review record

### Model-routed governance amendment

The first fresh-context read-only reviewer used OpenAI `gpt-5.6-sol` with
`xhigh` reasoning on 2026-08-31. It reviewed only the approved governance
amendment paths: the four `.codex` TOML files, `AGENTS.md`, `README.md`, the
named index, decision, roadmap, status, acceptance, audit, and S13 documents.
It excluded game code, package configuration, assets, external research,
Career Center, remotes, licences, deployment, and every outside path.

The reviewer parsed all four TOML files with `tomllib`, ran `git diff --check`,
confirmed all 26 Markdown tables in the allowed files, resolved the new README
link to S13, checked the current official OpenAI configuration and model
guidance, and confirmed that the working tree contained only the approved
documentation and `.codex` paths. It found no blocker and no governance defect.
It found one required record-completion correction: this audit must not call the
review pending while the Step-0 acceptance record says the independent review
passed. This text made that record consistent.

A second fresh-context read-only reviewer used OpenAI `gpt-5.6-sol` with
`xhigh` reasoning on 2026-08-31 to review the correction and complete allowed
diff against `HEAD`. It parsed all four TOML files with `tomllib`, ran
`git diff --check`, checked all 26 Markdown tables, resolved 12 local Markdown
links, and confirmed that all 16 changed or new paths were within the approved
scope. It found no blocker, required, or advisory finding. Its verdict is
**pass**.

### S14 baseline review

The fresh-context read-only reviewer used OpenAI `gpt-5.6-sol`, high reasoning,
on 2026-08-31. Its scope was the complete S14 working-tree diff against
baseline `52e7a778dd0a24ccd55ab359b897154d7949c7a3` and the authoritative
numbered, implementation, control, asset, traceability, interface, and gate
documents needed to verify it.

The first review found no blocker and four required documentation corrections:

1. make the 45-row S12 matrix show its promised requirement, top-level-test,
   interface, and evidence-state fields;
2. correct current-state candidate, pending-audit, and all-gates-blocked labels;
3. replace `MR-S12-ACC-018`'s old “applicable expansion gate” label with exact
   slice and fallback timing; and
4. replace a false implication that stored future work orders already exist.

The primary agent verified all four findings against the cited documents and
corrected them. The re-review confirmed three corrections and found one
remaining required traceability correction: each acceptance row also needed
its `MR-REQ-TEST-001` reverse link, and `MR-TEST-A11Y-001` was missing from
four linked rows. The primary agent verified and corrected both omissions. The
final narrow re-review confirmed all 45 reverse links, all four accessibility-
test links, all 13 top-level test IDs, and every eight-column acceptance row.
It found no blocker, required, or advisory finding. The reviewer verdict is
ready.

## Gate packet

The S00–S14 documentation baseline is complete and `MR-IMP-OPEN-014` is
resolved. Leonardo approved Gate 1 on 2026-09-01 and accepted the frozen
technical baseline. He later accepted the integrated Step-1 foundation. Step 2
still requires its own exact plan and approval.

The later approved incremental-workflow decision supersedes the original
batch-authority columns below. Gate 1 still confirms only the frozen baseline.
After it, Leonardo can approve only one exact next-step plan. Steps 31, 53, and
70 are the slice, fallback, and complete local-game acceptance milestones.
Each intermediate step needs a separate plan and approval.

| Gate                             | Required prior acceptance                               | Authority if Leonardo separately approves it                               | Current state                   |
| -------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------- |
| Gate 1 — Technical baseline      | Complete S00–S14 audit with no blocker                  | Confirms the frozen technical baseline only                                | Approved on 2026-09-01          |
| Incremental implementation start | Gate 1 approved and Step 1 accepted                     | An exact Step-2 plan can be proposed; only its approval authorizes Step 2  | Blocked pending Step-2 approval |
| Vertical-slice acceptance        | Accepted Steps 1–30, including applicable S12 evidence  | Step 31 evaluates and can accept the slice; it does not approve Step 32    | Blocked; no slice exists        |
| Fallback acceptance              | Accepted Steps 32–52, including applicable S12 evidence | Step 53 evaluates and can accept the fallback; it does not approve Step 54 | Blocked; no fallback exists     |
| Full local-game acceptance       | Accepted Steps 54–69, including applicable S12 evidence | Step 70 evaluates and can accept the complete local game                   | Blocked; no full game exists    |

Full-game acceptance, including `MR-S12-ACC-040`, is required before
release-candidate work. No gate authorizes a remote, licence, public release,
deployment, portfolio publication, or unsupported completion claim.

## Completion statement

S14 adds no S15 block. All Sxx decision groups are complete. The incremental
roadmap is later governance documentation, not S15. Leonardo separately
approved Gate 1 and accepted Step 1 on 2026-09-01. The next action is
preparation of the exact Step-2 plan; no earlier decision or frozen contract
changes without the approved evidence-led revision procedure.

## Development-governance amendment

Leonardo approved the 2026-09-01 development-governance amendment. It confirms
that every prior project decision is revisable or removable when development
evidence supports a change. The primary agent must prepare evidence and impact
analysis, obtain Leonardo's approval, preserve the former decision as
`superseded`, update all affected authority and traceability, and keep accepted
results as historical evidence.

The amendment also improves review cadence. The primary agent completes one
full audit before independent review and reconciles control records before the
reviewer sees the packet. The reviewer reports all findings from that complete
packet in one result. A fresh independent review follows a technical or
material-governance correction; narrow status, reference, prose, or mechanical
formatting corrections use focused primary validation unless they change
authority, evidence meaning, or a technical claim that cannot be mechanically
checked.

### First complete amendment review

On 2026-09-01, a fresh-context, read-only independent reviewer used OpenAI
`gpt-5.6-sol` with `xhigh` reasoning to review the complete approved
14-document amendment packet and the current accepted state at
`d5912ce90493ecb451dfa750728bdfab479e1e2c`. It found no blocker. It reported
three required correction groups in one result: stale records that treated
Step 1 as unaccepted, incomplete supersession state for the earlier Gate-1 and
Step-1 authority, and a review-cadence contradiction.

The primary agent must correct those groups together. The cadence correction
changes material governance, so the corrected complete packet requires one
fresh independent review. No separate reviewer round is needed for the
record-only corrections that do not change authority, evidence meaning, or a
non-mechanical technical claim.

### Corrected-packet independent review

On 2026-09-01, a second fresh-context, read-only independent reviewer used
OpenAI `gpt-5.6-sol` with `xhigh` reasoning to review the corrected complete
packet. It found no blocker or advisory issue. It required three remaining
stale current-state corrections: the implementation contract still said Gate 1
was pending, the status register could imply that the accepted S01 foundation
did not exist, and the design index still treated the Step-1 plan as current
permission.

Those corrections are status and reference updates only. They do not change
authority, evidence meaning, or a non-mechanical technical claim. The primary
agent resolved them together with focused validation: `npm run check` and
`git diff --check` passed, and complete diff review confirmed the approved
scope. The cadence does not require a third independent review.

Earlier audit sections preserve their original 2026-08-31 baseline-state
findings. The gate packet and this amendment state the current implementation
authority and governance.

## Step-4 interface amendment

Implementation inspection found that historical `MR-IF-002 v1` named
`createInitialCampaignState()` but did not define which new-campaign facts its
caller supplies. The real New Game boundary must supply the campaign ID, seed,
content version, build profile, pressure profile, protagonist name, and pronoun
set. Fixed initial facts must remain owned by S03.

Leonardo approved the evidence and impact packet on 2026-09-02. It supersedes
only `MR-IF-002 v1` with frozen `v2`. There is no stored-field, initial-value,
rule, content, persistence, presentation, consumer, or other-interface change.
No compatibility or save migration is required because no saved campaign
exists. Historical `v1`, the original S14 result, and accepted Steps 1–3 remain
evidence. `MR-IMP-OPEN-016`, `MR-IMP-DEC-305`, the interface register, S03,
current control records, and the approved Step-4 plan contain the connected
traceability.

The amendment is material governance and its implementation must receive one
complete primary pre-review audit and one fresh independent Sol `xhigh`
review. Approval alone supplies no implementation or review result.

## Step-4 correction audit amendment

Complete Step-4 independent review found that `MR-IF-002 v2` could not be
implemented completely without inventing S06-owned IDs. It also found an
invalid per-field history-sequence interpretation, open experiment-band
values, incomplete internally checkable invariants, non-canonical record
insertion order, incomplete S04 data shapes and semantic tests, one nonexistent
requirement reference, and stale current records. The diagnostic itself passed
its scope, privacy, network, and browser boundary.

The affected consumers are rules, application, scheduler, content validation,
persistence, UI projection, cutscenes, and tests. No save or migration exists.
The correction does not change a stored top-level section, player-visible
starting value, balance, story, command algorithm, consumer owner, package,
asset, or accepted earlier result.

Leonardo approved the complete impact packet on 2026-09-02. Frozen
`MR-IF-002 v3` preserves the exact `v2` creation input, defines sparse run and
authored-content lifecycle records, fixes exact non-sparse IDs and the initial
roster, makes change sequence global per revision, requires canonical
ID-record sorting, and completes the internal invariant boundary. The existing
five-member `MR-IF-003 v1` effect union is unchanged; its non-empty caveat,
closed band, and exact ending-card data shapes are clarified from S04 and S07.

`MR-IMP-OPEN-017`, `MR-IMP-DEC-306`, S03–S07, S12–S13, the interface register,
the step log, and superseding work orders contain the connected authority and
traceability. Historical `v1`, `v2`, first submissions, primary audit, and
blocked review remain evidence. The correction must pass applicable checks,
one new complete primary audit, and one fresh complete review by the same
approved Sol `xhigh` reviewer before integration.

The next complete review found four further required issues: route
prerequisites, PIIM source and order prerequisites, the fixed PIIM target, and
deep-JSON typed failure. The resumed Sol `high` worker confirmed that `v3`
could not represent the first two exactly and stopped without edits. Leonardo
approved `MR-IF-002 v4` on 2026-09-03. It adds only typed prerequisite proof;
the affected consumers and all visible rules remain unchanged. No save or
migration exists. `MR-IMP-OPEN-018`, `MR-IMP-DEC-307`, S03–S07, S12–S13,
`MR-WO-WP01-003`, and `MR-WO-WP00-008` contain the connected authority. The
new correction still requires complete checks, primary audit, and one new
fresh Sol `xhigh` review before integration.
