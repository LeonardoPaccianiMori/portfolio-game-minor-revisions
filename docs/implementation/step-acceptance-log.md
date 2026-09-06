# Development Step Acceptance Log

Status: **Steps 1–4 accepted; Gate 4A complete; Step 5 planning next**

This is the durable index of Leonardo's step decisions and the evidence that
supports them. It contains concise summaries, not raw private conversations,
save payloads, names entered during testing, raw errors, machine paths, or
hidden model reasoning.

[`ai-use-log.md`](ai-use-log.md) is the separate private record for actual
primary-session and completed-subagent model use. It applies only to _Minor
Revisions_ and does not replace Leonardo's approval or acceptance evidence.

## State values

- `not started`: no approved plan exists.
- `plan approved`: Leonardo approved the exact step plan.
- `implementing`: approved work is in progress.
- `technical review`: implementation and primary checks are complete.
- `Leonardo testing`: the integrated local result awaits or is in direct test.
- `correcting`: an approved-scope defect is being repaired.
- `accepted`: required checks pass and Leonardo explicitly accepted the step.
- `blocked`: the step cannot safely continue; the reason and restart condition
  are recorded.
- `superseded`: a later approved roadmap change replaced the step definition.

## Step index

| Step | State                   | Plan approval                    | Technical evidence                                                                                                                                                                               | Leonardo test                                          | Acceptance                                                                                          | Commit                                                                                           | Notes                                                                  |
| ---: | ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
|    0 | Documented and complete | 2026-08-31                       | Step sequence, IDs, links, tables, boundaries, explicit model routing, controlled roles, delegation evidence, project-only AI-use provenance, and fresh independent review plus re-review passed | Not applicable                                         | Workflow documentation and its model-routed governance amendment approved by Leonardo on 2026-08-31 | Containing commit                                                                                | Records documentation only; no implementation is approved.             |
|    1 | Accepted                | 2026-09-01                       | Final review, integration, clean install, main checks, build, three-browser flows, audit, production, network, and Git checks passed                                                             | Passed 2026-09-01                                      | Leonardo explicitly accepted Step 1 on 2026-09-01                                                   | Containing commit plus integrated worker commits `41d7d6b` through `e9c9d05`                     | The accepted result is the static local foundation, not a game system. |
|    2 | Accepted                | 2026-09-01                       | Integrated main: 91 tests, 92.30% branches, 96.48% lines, build, 15 browser flows, audit, review, and record reconciliation passed                                                               | Accepted 2026-09-02                                    | Leonardo explicitly accepted Step 2 on 2026-09-02                                                   | Containing acceptance commit plus `41adfbb` through `4475844`                                    | No separate defect or screen-observation report supplied.              |
|    3 | Accepted                | 2026-09-02                       | Reviewed integration on main passed 111 tests, required coverage, 16-module build, 15 browser flows, and complete scope and production checks                                                    | Passed 2026-09-02                                      | Leonardo explicitly accepted Step 3 on 2026-09-02                                                   | Containing acceptance commit plus `d2a63f5` and `d26ffe1`                                        | Four expected lines persisted after repeated reloads.                  |
|    4 | Accepted                | 2026-09-02; amendment 2026-09-06 | Main 259 unit tests, required coverage, 115-module build, 21 browser flows; complete/focused reviews and record fixes passed                                                                     | Screenshots of both expected pages supplied 2026-09-06 | Leonardo explicitly accepted Step 4 on 2026-09-06                                                   | Reviewed correction a0b268f; integration 00029e2; handover d08ee26; containing acceptance commit | Prepare a separate Step 5 plan; implementation not yet approved.       |
| 5–70 | Not started             | —                                | —                                                                                                                                                                                                | —                                                      | —                                                                                                   | —                                                                                                | Each step needs a separate approved plan and accepted dependency.      |

## Gate decisions

| Gate                               | State    | Leonardo decision | Effect                                                                                            | Next boundary                                          |
| ---------------------------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Gate 1 — frozen technical baseline | Approved | 2026-09-01        | Accepts the frozen S01–S14 baseline; Steps1–3 separately accepted; MR-IMP-DEC-309 updates C01–C06 | Step 4 and Gate 4A accepted; separate Step 5 plan next |

## Step 01 — S01 package baseline and basic local start page

### Plan and authority

Leonardo approved this exact Step-1 plan on 2026-09-01. It permits only
`MR-WO-WP00-001`, its listed `MR-WP-00` paths, the exact S01 environment
preparation, the required local checks, independent review, integration, and
the local page test. It does not authorize Step 2, a source directory, content,
assets, a remote, a licence, deployment, or public action.

Leonardo approved the separate 58-file formatting recovery and then approved
the final-review correction and integration plan on 2026-09-01. The current
correction permits only the named foundation test, README, and Step-1 control
records, followed by repeated checks, fresh independent re-review,
integration, and the local page test.

### Leonardo contribution

Leonardo approved the Step-1 purpose, fixed package scope, model-routed worker
and reviewer roles, checks, local-page test, exclusions, and local commit
boundary. On 2026-09-01, he checked the local page, supplied a screenshot of
the expected result, and explicitly accepted Step 1. The raw screenshot and
machine path are not stored in this repository.

### Agent contribution

The primary Codex agent recorded the approved plan, verified the exact Node and
npm environment, created the isolated branch and worktree, and activated
`MR-WO-WP00-001`. OpenAI `gpt-5.6-terra` with `high` reasoning submitted the
foundation package, static page, and tests in commit
`b965811ff9dd9994d120c923aa0f69077009633e`. Primary verification and the
first independent review completed work. The worker submitted correction
commit `5434ca74ab797887d68dd1a2d540eef77e7daaf7`; the fresh re-review found
one remaining baseline-test correction and this stale record statement. The
worker corrected only the baseline test in
`0323ec7151bee5551d74866df5200b40990394c9`. The primary Codex agent corrected
this primary-owned acceptance record in the separate current checkpoint.
Matching entries are in `ai-use-log.md` and `MR-CONTRIB-WP00-001`.

### Files and commits

Worker starting commit: `5eb5850f9f10302a4d6935577187d23dc7f4f63d`. The earlier
Gate-1 checkpoint `57282d501cb034334a070bf1c68151bc8501f803` remains the
pre-plan repository fact, not the worker starting commit. The plan checkpoint
commit is the commit that contains this entry. Worker commit
`b965811ff9dd9994d120c923aa0f69077009633e` is submitted. Integration commits
are `41d7d6b`, `7387242`, `03ceb7c`, `bfdff73`, and `e9c9d05`. The contribution
record was created after actual worker submission because S13 permits no draft
contribution-record state.

### Automated and review evidence

The worker reported a passing `npm install`, `npm run check`, and `npm run
build` under the exact Node and npm versions. Primary verification then passed
with Node `v24.20.0` and npm `11.19.0`: fresh registry compatibility, licence,
deprecation, and peer review; `npm ci` (158 packages and no vulnerabilities);
local Playwright-browser setup; `npm run check`; `npm run verify` (one unit
test, coverage command, production build, and Chromium, Firefox, and WebKit
start-page flows); `npm audit --audit-level=high` (no vulnerabilities);
dependency-tree inspection; production-output inspection; no-runtime-external-
request inspection; and `git diff --check`. A fresh independent read-only
review found the following before integration: exact starting-commit
provenance; future source coverage, browser globals, worktree and editor
ignores; prohibited tracked-source formatting exclusions; baseline test
coverage; and contribution evidence require correction. The correction must
receive a new review.

### Leonardo test packet

Complete. Leonardo opened the supplied local address, confirmed the expected
foundation page, and reported no visible error. The local server was stopped
safely after the check.

### Observed result and corrections

The independent reviewer found no advisory issue. The worker corrected the
approved configuration, test, and ignore findings in commit
`5434ca74ab797887d68dd1a2d540eef77e7daaf7`. Primary checks then passed for
typecheck, lint, two Node-only tests, and the production build. The required
`npm run check` failed only at Prettier on 57 existing tracked Markdown and
asset-manifest files outside Step 1 scope. S01 prohibits ignoring them to make
the check pass. Fresh independent re-review of the repair and block found the
remaining baseline-test and acceptance-record corrections. The worker
corrected only the baseline test in
`0323ec7151bee5551d74866df5200b40990394c9`; the primary Codex agent corrected
the acceptance record separately. Fresh final re-review passed with no blocker,
required, or advisory finding. At that checkpoint, the formatting block
remained unchanged.

The primary agent mechanically formatted the exact 58 approved documentation
and manifest files with Prettier `3.9.6` and committed the result as
`9faf211`. Combined validation with the three worker commits then passed the
exact Node and npm checks, two foundation tests, production build, Chromium,
Firefox, and WebKit page flows, high-severity audit, production and external-
request inspections, and `git diff --check`. A fresh OpenAI `gpt-5.6-sol`
review using `xhigh` reasoning found no game, scope, dependency, privacy,
accessibility, asset, network, creative, or shared-contract issue. It required
the Node-only baseline test to cover the remaining frozen configuration and
required README and control records to describe the current state. Leonardo
approved that correction and integration plan on 2026-09-01.

OpenAI `gpt-5.6-terra` with `high` reasoning completed only the approved
Node-only test expansion in worker commit
`f18c17c66d0ad3972f81522768ca4896ce063dc0`. The focused test, typecheck,
lint, build, owned-file formatting, and Git whitespace checks passed. The
worker changed no configuration, runtime, documentation, asset, dependency, or
public file. Corrected combined validation then passed `npm run check` with
three foundation tests, `npm run verify` with Chromium, Firefox, and WebKit,
the high-severity audit with zero vulnerabilities, production and external-
request inspections, and the Git whitespace check. Fresh re-review remains
pending.

The next fresh OpenAI `gpt-5.6-sol` re-review using `xhigh` reasoning found no
blocker or advisory issue. It required the package manifest, TypeScript
options, and lockfile-root tests to reject prohibited extra settings. It also
required the status record to distinguish the passing automated browser flows
from browser-support, performance, and direct-play evidence that does not yet
exist. These corrections remain inside the approved test and control-record
paths.

OpenAI `gpt-5.6-terra` with `high` reasoning completed only the approved
closed-shape test correction in worker commit
`f4e1a24922c6e93a7357608450f4a036f5bb049a`. Its focused tests, typecheck,
lint, build, owned-file formatting, and Git whitespace checks passed. The test
now rejects prohibited extra package, TypeScript, and lockfile-root settings.
The worker changed no configuration, runtime, dependency, documentation,
asset, or public file. Repeated combined validation then passed formatting,
typecheck, lint, all three foundation tests, production build, Chromium,
Firefox, and WebKit flows, the high-severity audit with zero vulnerabilities,
production and external-request inspections, and the Git whitespace check.
The validation worktree remained clean. Fresh re-review remains pending.

The latest fresh OpenAI `gpt-5.6-sol` re-review using `xhigh` reasoning
confirmed that the closed-object exactness finding is resolved. It found no
blocker or advisory issue. It required the live agent contract to state that
the Step-1 plan is approved and required three boundary statements to stop
listing completed correction and validation work as pending. Leonardo
approved this narrow primary-owned record correction on 2026-09-01.

The primary agent corrected only the live agent contract and approved boundary
records. Repeated combined validation then passed formatting, typecheck, lint,
all three foundation tests, production build, Chromium, Firefox, and WebKit
flows, the high-severity audit with zero vulnerabilities, production and
external-request inspections, and the Git whitespace check. The validation
worktree remained clean. Only fresh independent re-review remains before
integration.

The latest fresh OpenAI `gpt-5.6-sol` review using `xhigh` reasoning confirmed
the S13 path order and all earlier findings. It found no blocker or advisory
issue. It required README to stop saying that completed final-review
corrections remain in progress. This primary-owned wording correction changes
no authority or technical behaviour.

The primary agent corrected only README's live-status sentence. Repeated
combined validation then passed formatting, typecheck, lint, all three
foundation tests, production build, Chromium, Firefox, and WebKit flows, the
high-severity audit with zero vulnerabilities, external-request inspection,
and the Git whitespace check. The validation worktree remained clean. Only
fresh independent re-review remains before integration.

The final fresh OpenAI `gpt-5.6-sol` re-review using `xhigh` reasoning returned
`pass` with no blocker, required, or advisory finding. It confirmed the README
status, S13 path order, closed-object exactness, formatting-only recovery,
local-only boundary, and complete integration readiness. Leonardo testing and
acceptance remain separate.

The latest fresh OpenAI `gpt-5.6-sol` review using `xhigh` reasoning confirmed
the live-boundary and closed-object findings are resolved. It found no blocker
or advisory issue. It required three prohibited test paths in the work order
to follow the frozen S13 alphabetical sort rule. This is a primary-owned
mechanical record correction and changes no authority or technical behaviour.

The primary agent sorted only the three prohibited work-order test paths.
Repeated combined validation then passed formatting, typecheck, lint, all
three foundation tests, production build, Chromium, Firefox, and WebKit flows,
the high-severity audit with zero vulnerabilities, external-request inspection,
and the Git whitespace check. The validation worktree remained clean. Only
fresh independent re-review remains before integration.

After the final review pass, the primary agent integrated the five reviewed
worker commits onto local `main` without conflict. A clean install and all
required main-branch checks passed under exact Node `v24.20.0` and npm
`11.19.0`. The local foundation page is ready for Leonardo's direct check.

### Acceptance decision

Leonardo explicitly accepted Step 1 on 2026-09-01 after the direct local-page
check. This accepts only the integrated S01 foundation result.

### Known limitations and next boundary

No game system, Three.js scene, source directory, content, production asset,
remote, licence, deployment, or public result exists. Step 2 now has its
accepted dependency, but it remains blocked until Leonardo approves its exact
plan.

## Step 02 — Startup compatibility, diagnostics, and safe errors

### Plan and authority

Leonardo approved the exact Step-2 plan on 2026-09-01. It permits only the
listed `MR-WP-00` startup, platform, test, and primary control paths; the exact
S11 compatibility and sanitized-diagnostic subset; one controlled OpenAI
`gpt-5.6-sol` worker using `high` reasoning; one later fresh read-only OpenAI
`gpt-5.6-sol` reviewer using `xhigh` reasoning; the required checks; local
integration; and Leonardo's normal-start and controlled-failure review.

This approval does not authorize Step 3, an application controller, a Three.js
scene, campaign systems, content, saves, assets, package changes, a remote, a
licence, deployment, publication, or a Career Center update. No earlier
decision or frozen interface changes. Evidence that requires such a change
stops this step and needs a separate impact packet and Leonardo approval.

After independent review, Leonardo approved the exact revised correction plan
on 2026-09-01. `MR-WO-WP00-003` supersedes `MR-WO-WP00-002`. It starts from
the historical worker head `43f868e64b80c88dc46832b676af6d2929f081c2`
and permits only `src/platform/index.ts`, two owned bootstrap files, four owned
unit-test files, the exact three corrections, and the required checks and fresh
review. It changes no frozen specification or interface.

Primary activation inspection found the additional type-only private import in
`src/bootstrap/startup-screen.ts` before a worker edit. Leonardo approved the
complete eight-file plan on 2026-09-01. `MR-WO-WP00-004` supersedes
`MR-WO-WP00-003`, adds only that missing bootstrap path, and keeps the exact
base, branch, worktree, requirements, tests, model routing, exclusions, local
test method, and frozen authority unchanged.

### Leonardo contribution

Leonardo approved the Step-2 purpose, exact file scope, requirements, checks,
local test method, exclusions, commit boundary, focused source packets, model
and reasoning selections, sequential execution, and correction-review cadence
on 2026-09-01. Testing observations and acceptance are not yet available.
He later approved the exact revised correction purpose, seven-file scope,
requirements, checks, exclusions, Sol `high` worker, fresh Sol `xhigh`
reviewer, sequential order, and local test boundary on the same date.
He then approved the exact complete eight-file correction plan, including the
one-file ownership addition and the same Sol `high` worker and fresh Sol
`xhigh` reviewer. After the final review, he approved the exact narrow
record-only reconciliation before integration.

### Agent contribution

The primary Codex agent prepared the approved plan, verified the clean local
repository, current commit, accepted Step-1 dependency, and absent remote, and
created and activated `MR-WO-WP00-002` with the exact approved Sol `high`
selection. The controlled worker submitted three implementation commits and
four correction commits. The complete primary audit and all primary validation
now pass. The fresh independent review found one blocker and two required
findings. No integration, Leonardo test, or accepted result exists.

The primary Codex agent then recorded the approved supersession, created the
exact branch and worktree from the reviewed head, and activated the new order.
The original work order is `superseded`; the new order was active only until
the following source inspection. `MR-CONTRIB-WP00-003` does not exist.

Before the worker changed a file, the primary agent's source inspection found
that `src/bootstrap/startup-screen.ts` also imports the private platform file.
The worker stopped with a clean worktree. `MR-WO-WP00-003` is now blocked
because it does not own that file. A superseding approved order is required.

Leonardo approved `MR-WO-WP00-004`. The primary agent recorded the complete
eight-file authority before correction work resumed.

The primary agent then verified the clean exact branch, worktree, base, absent
remote, Node `v24.20.0`, and npm `11.19.0`, and activated
`MR-WO-WP00-004` before the controlled worker assignment.

The controlled OpenAI `gpt-5.6-sol` worker using `high` reasoning submitted
five clean correction commits from the exact base. The eight changed paths
match the complete work order. Its full handoff reports all required checks
passing. The later complete primary audit and fresh independent review passed.

The primary agent completed the one full pre-review audit. It independently
repeated focused and complete checks, reconciled all eight paths, requirements,
interfaces, import routes, catalogue mappings, test substitutes, privacy and
network boundaries, limitations, and current records, and found no new blocker
or required correction. Fresh independent review then passed the technical
correction.

### Files and commits

The plan checkpoint is `1b06ee5933de302c00cee7efa394d0b7ac19c0b5`, the exact
`base_commit` of `MR-WO-WP00-002`. The active work order is added in the next
committed checkpoint. The worker branch, worktree, and seven worker commits now
exist. The formal submitted contribution record is `MR-CONTRIB-WP00-002`.
Integration commits and the final acceptance commit do not exist yet.

The revised plan checkpoint is the commit that contains this entry.
`MR-WO-WP00-003` starts at
`43f868e64b80c88dc46832b676af6d2929f081c2` on the exact branch
`work/MR-WP-00-startup-safety-review-fixes` and worktree
`.worktrees/MR-WP-00-startup-safety-review-fixes/`. The primary agent created
both from the exact base and confirmed the clean state, absent remote, Node
`v24.20.0`, and npm `11.19.0` before worker assignment.

The complete plan checkpoint is the commit that contains this entry.
`MR-WO-WP00-004` reuses the clean exact branch and worktree at
`43f868e64b80c88dc46832b676af6d2929f081c2`; it creates no new code state.
The activation checkpoint is the commit that contains the active-state update.
Correction worker commits are `1bb03c2` through `51adc02`. The formal submitted
contribution record is `MR-CONTRIB-WP00-004`.

The primary agent integrated the full reviewed Step-2 sequence without
conflict. Original implementation commits are `41adfbb` through `aeae015`, and
complete correction commits are `1e28a45` through `4475844`.

### Automated and review evidence

Corrected worker and primary checks passed. The historical pre-review result
passed 83 unit tests with 96.48 percent lines and 92.68 percent branches. The
complete correction result passed 91 unit tests with 96.48 percent lines and
92.30 percent branches. Primary `npm run verify` passed lint, formatting,
coverage, production build, and 15 browser flows across Chromium, Firefox, and
WebKit. A separate primary
build also passed. Production, privacy, network, package, configuration, scope,
remote, whitespace, and clean-worktree checks passed. The final fresh review
passed the technical correction and found only the stale current-record issue
described below.

After integration, main `npm run verify` repeated the complete evidence: 91
unit tests, 96.10 percent statements, 92.30 percent branches, 95.23 percent
functions, 96.48 percent lines, a 10-module production build, and 15 passing
flows across Chromium, Firefox, and WebKit. The integrated paths match the
reviewed worker head exactly. Package, lockfile, configuration, source-map,
external-request, public-import, remote, whitespace, and clean-state checks
passed.

### Leonardo test packet

The loopback-only page is available at `http://127.0.0.1:5173/`. Leonardo checks
the normal page for the title `Minor Revisions`, the factual `Ready` state,
`Startup checks passed.`, and `Game systems are not yet available.` A controller
message is permitted and does not block readiness.

The primary agent also opened a controlled-failure Chromium window. Leonardo
checks the safe stop heading, short explanation, issue code
`MRD1-BOOTSTRAP-UNEXPECTED`, focused `Copy Diagnostic` button, and visible
`Reload Page` button. He does not enter private data or debug code. If a window
does not behave as expected, he closes it and reports only visible text and the
action that caused the issue.

### Observed result and corrections

The worker corrected initial owned type, test annotation, lint, and formatting
findings before submission. The consolidated primary audit then found these
required corrections together:

- add honest executable coverage for the production WebGL2 and IndexedDB probe
  paths, cancellation and cleanup, the startup coordinator, and all
  `StartupScreen` actions without changing configuration, exclusions, ignore
  directives, or thresholds;
- validate the complete compatibility object before copying statuses into a
  diagnostic, including the exact closed shape, capability order and IDs,
  required flags, and permitted status values, so an arbitrary value cannot
  enter the copied record;
- when startup becomes fatal, cancel and settle the active compatibility
  operation, remove the fatal listeners, prevent later probe completion from
  changing presentation, and keep repeated cleanup harmless;
- make IndexedDB open, blocked, error, deletion, and cancellation paths settle
  safely, close every obtained handle, request deletion, create no store, read
  no game database, and permit retry only after cleanup settles; and
- prevent a handled production browser error or unhandled rejection from also
  exposing its raw value through default browser output, while preserving the
  approved local-development diagnostic boundary.

The same controlled worker corrected all findings inside the approved source
and test paths. It did not change configuration, exclusions, ignore directives,
thresholds, dependencies, authority, or player-visible meaning. The final
corrections normalize diagnostic input once, enforce closed recovery forms,
cancel and settle fatal startup work, suppress default raw browser output,
require an empty probe database, and keep a retry blocked until old IndexedDB
open and deletion work reaches a terminal result. The complete primary audit
passed. The fresh independent review found:

- one blocker: frozen S02 requires every runtime module to expose a public
  `index.ts` and forbids cross-module private imports, but Step 2 did not own
  `src/platform/index.ts`; and
- two required corrections: diagnostic codes and their metadata remain too
  open and can describe inconsistent faults, and Vitest unit tests use real
  timers and event objects where S12 requires controlled fakes.

The public-entrance correction adds a path outside the approved plan. S13
therefore requires a revised work order and Leonardo's approval before any
correction starts. Corrected technical work then needs applicable checks, one
complete primary audit, and a fresh independent review.

Leonardo supplied that approval on 2026-09-01. At that checkpoint, the
correction remained pending; approval alone did not show that a finding was
fixed.

Activation inspection then found the additional unowned
`src/bootstrap/startup-screen.ts` import. At that checkpoint, no correction had
been attempted, and the approved scope was insufficient to remove every S02
private cross-module import.

Leonardo approved the exact addition of that file in `MR-WO-WP00-004` on
2026-09-01. The scope block was resolved. At that checkpoint, the three
technical correction groups, checks, complete primary audit, and fresh
independent review remained pending.

The worker then reported all three correction groups complete within the
approved scope. At submission, this was a claim and not primary-audit or review
evidence.

The primary audit then confirmed those three corrections and all recorded
limits. At that checkpoint, this was not independent-review, integration,
Leonardo-test, or acceptance evidence.

The fresh independent reviewer returned a technical pass with no blocker or
advisory finding. Its one required finding was record-only: four authority
files still stated that Step 2 had no approved plan, and current resume text
needed to show the completed correction and audit. Leonardo approved that exact
additional scope, and focused primary validation passed. The reviewed
correction is ready for integration.

### Acceptance decision

Leonardo explicitly accepted Step 2 on 2026-09-02. He supplied no separate
defect or screen-observation report with that decision. The acceptance covers
only the integrated Step-2 startup-safety result and does not approve Step 3.

### Known limitations and next boundary

The corrected Step-2 code is integrated on local `main`, passed the complete
primary audit, fresh technical review, focused record validation, and complete
main-branch checks, and was accepted by Leonardo. If IndexedDB reports a
blocked event and never later reports success or error, the check and its retry
remain pending so old cleanup cannot overlap new work. Leonardo approved the
exact Step-3 plan on 2026-09-02. The next permitted action is its controlled
work-order activation. Step 4 and every public action remain blocked until
their separate approvals.

## Step 03 — S02 application structure and lifecycle

### Plan and authority

Leonardo approved this exact plan on 2026-09-02. Its purpose is to add the
small application control layer that starts and stops future game parts in one
safe order. It adds no gameplay. The lifecycle is `new`, `starting`, `ready`,
`stopping`, and `stopped`, with a safe `failed` state. One ordered request
queue prevents two start or stop requests from racing. One controlled frame
loop provides the future update rhythm. Shutdown runs in reverse order and is
safe to repeat. Temporary adapters make the structure testable before game
systems exist.

The controlled worker owns these additions:

- `src/application/controller.ts`
- `src/application/index.ts`
- `src/bootstrap/application-bootstrap.ts`
- `src/bootstrap/index.ts`
- `src/bootstrap/temporary-adapters.ts`
- `src/platform/timing.ts`
- `tests/unit/MR-WP-00/application-bootstrap.test.ts`
- `tests/unit/MR-WP-00/application-fakes.ts`
- `tests/unit/MR-WP-00/application.test.ts`
- `tests/unit/MR-WP-00/architecture.test.ts`
- `tests/unit/MR-WP-00/platform-timing.test.ts`

It owns changes only to:

- `src/bootstrap/main.ts`
- `src/bootstrap/startup.ts`
- `src/platform/index.ts`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`
- `tests/unit/MR-WP-00/startup.test.ts`

The primary agent owns the authority, work-order, contribution, status,
integration, audit, review, and acceptance records named in the approved plan.
The worker cannot edit documentation.

The approved evidence is partial implementation of `MR-S02-FIX-001`,
`MR-S02-FIX-004`–`007`, and `MR-S02-FIX-009`–`010`, while preserving the
accepted Step-2 evidence for `MR-S02-FIX-002`. It links the applicable Step-3
subsets of `MR-REQ-TECH-001`, `MR-REQ-TEST-001`, frozen `MR-IF-001`, applicable
`MR-IF-014` and `MR-IF-015`, and S13 groups `MR-S13-CON-001`,
`MR-S13-GATE-001`, `MR-S13-GIT-001`, `MR-S13-OWN-001`, `MR-S13-REV-001`, and
`MR-S13-WO-001`. It does not claim `MR-S02-FIX-003`, `MR-S02-FIX-008`, or
complete `MR-S12-ACC-003`.

Required checks are focused lifecycle, queue, frame-loop, shutdown, bootstrap,
timing, startup, foundation, and architecture tests; `npm run check`; `npm run
verify`; `npm run build`; the Step-3 browser flows in Chromium, Firefox, and
WebKit; static public-entrance and dependency inspection; production, privacy,
runtime-network, package, configuration, scope, Git-whitespace, and clean-state
checks; one complete primary pre-review audit; and one fresh independent final
review.

After reviewed integration, the primary agent starts the loopback-only local
page. Leonardo checks that the visible text remains `Minor Revisions`, `Ready`,
`Startup checks passed.`, and `Game systems are not yet available.`, reloads
once, reports any error or unexpected change, and can stop safely by closing
the page. The primary agent stops the temporary server after the decision.

Excluded work includes Three.js, a scene, campaign state, rules, content,
saves, menus, movement, audio, cutscenes, packages, lockfile or configuration
changes, coverage changes, assets or research, frozen specification or
interface changes, roadmap-sequence changes, telemetry, external requests, a
remote, licence, release, deployment, publication, portfolio work, Career
Center changes, Step 4, and every player-visible wording change.

The approved plan checkpoint commit message is `Approve Minor Revisions Step 3
plan`. The activation commit message is `Activate Minor Revisions Step 3 work
order`. Worker commits must start with `MR-WP-00`. The later test-readiness
commit is `Record Minor Revisions Step 3 Leonardo test readiness`.

| Task                                     | Role                     | Owned paths                                                       | Dependencies                                                        | Model and effort                                                               | Selection reason                                                                          | Focused source packet                                                                                                                                                                            | Order              |
| ---------------------------------------- | ------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| Application lifecycle implementation     | Controlled worker        | Exact 17 source and test paths above                              | Accepted Step 2, committed plan checkpoint, active `MR-WO-WP00-005` | OpenAI `gpt-5.6-sol`, `high`                                                   | S02 lifecycle, concurrency, failure, and integration work is difficult architecture work. | `AGENTS.md`; implementation contract; development status and roadmap; interfaces; S01, S02, S11, S12, and S13 exact sections; Step-2 public entrances; owned source and tests; active work order | First; sequential  |
| Complete audit, records, and integration | Primary agent            | Primary-owned records, main branch, and isolated worktree control | Worker submission                                                   | Actual active-session model and effort, recorded as `unknown` when unavailable | S13 keeps authority, audit, records, and integration with the primary agent.              | Approved plan, work order, complete worker diff and evidence, current authority records                                                                                                          | Second; sequential |
| Final independent review                 | Fresh read-only reviewer | No writes                                                         | Complete primary audit on the latest artifact                       | OpenAI `gpt-5.6-sol`, `xhigh`                                                  | S13 requires a fresh quality-first independent review for the final technical packet.     | Approved plan and work order; frozen interfaces and relevant S02, S11, S12, S13 contracts; complete diff; tests; contribution; primary audit                                                     | Third; sequential  |

### Leonardo contribution

Leonardo accepted Step 2 and explicitly approved this exact Step-3 plan. He
then checked the integrated local result, supplied a screenshot that showed the
four expected lines, reported the same result after repeated reloads, and
explicitly accepted Step 3 on 2026-09-02. The raw screenshot and its machine
path are not stored.

### Agent contribution

The primary agent prepared and reconciled the plan authority records, created
and activated `MR-WO-WP00-005`, and selected OpenAI `gpt-5.6-sol` with `high`
reasoning for the controlled worker. That worker submitted the exact approved
two-commit result. The primary agent then completed the one full pre-review
audit and found no blocker or required correction. Independent review,
which was fresh and read-only, then found no technical issue and one narrow
current-record correction. The primary agent corrected it, and focused
validation passed. The primary agent integrated the exact two reviewed worker
commits without conflict and completed main-branch validation. The local test
then supplied the exact visible reload test and stopped the loopback-only
server after Leonardo's decision. Matching completed-use entries are in
`ai-use-log.md` and `MR-CONTRIB-WP00-005`.

### Files and commits

The plan checkpoint is `cb19a1e99b365aa98f8dbec4e33b9fde31864a5e`. The
activation checkpoint is `1b75a968ba2f419b66158d8f88abc119378af27d`.
Worker commits are `d3c11c2a23a6a473d43ecd29d377d6eb34b691f2` and
`f4130acb6f555cb55ff09f30b5f89e3ca49a4d89`. Integrated commits are
`d2a63f5e4c516036380c4adaaf634d4e1e62534b` and
`d26ffe119040dd16ba3ff4f22ffcf90375de570a`. The 17 integrated paths match the
reviewed worker head exactly.

### Automated and review evidence

Worker and primary `npm run check` passed 111 tests. Worker and primary `npm
run verify` passed lint, formatting, 111 tests, coverage, the 16-module build,
and all 15 browser flows across Chromium, Firefox, and WebKit. Coverage is
90.41 percent statements, 88.77 percent branches, 79.91 percent functions, and
93.27 percent lines. Scope, public entrances, dependency direction, lifecycle,
queue, frame-loop, shutdown, startup, package, configuration, privacy,
production, runtime-network, source-map, whitespace, remote, and clean-state
checks passed. The complete primary audit found no blocker or required
correction. Fresh independent technical review found no technical issue and
one required record-only group. Focused formatting, repository, reference,
whitespace, staged-scope, and diff validation passed after its correction. No
fresh review is required for that narrow mechanical correction.

After integration, main `npm run check` passed all 111 tests. Main `npm run
verify` passed lint, formatting, the same coverage, the 16-module production
build, and all 15 browser flows across Chromium, Firefox, and WebKit. Exact
worker-content, package, configuration, production-output, source-map,
external-request, console-path, whitespace, clean-state, and absent-remote
checks passed.

### Leonardo test packet

Complete. Leonardo opened the loopback-only page and confirmed `Minor
Revisions`, `Ready`, `Startup checks passed.`, and `Game systems are not yet
available.` He reported the same result after repeated reloads and supplied no
visible error or unexpected change. The server was stopped after his decision.

### Observed result and corrections

The worker corrected private implementation and test defects before final
submission. The final submitted range and primary audit contain no open
approved-scope defect. The fresh reviewer found stale activation wording in
the design index and an older checkpoint reference in development status. The
primary agent corrected only those current records and matching review-state
references; no code, authority, interface, requirement, test contract, or
evidence meaning changed.

The reviewed worker commits integrated without conflict. Complete main
validation found no new approved-scope defect. Expected controlled-failure
browser logs were test evidence, not a production failure.

### Acceptance decision

Leonardo explicitly accepted Step 3 on 2026-09-02. This acceptance covers only
the reviewed application-lifecycle result and does not approve Step 4.

### Known limitations and next boundary

Step 3 is accepted. `MR-WO-WP00-005` and `MR-CONTRIB-WP00-005` are accepted.
At the Step-3 acceptance checkpoint, no Step-4 plan or implementation authority
existed. The later Step-4 section records its separate plan approval.

## Step 04 — S03 campaign-state and S04 command/result foundation

### Plan and authority

Leonardo approved the exact Step-4 plan on 2026-09-02. Its purpose is to add
the complete S03 plain-data campaign-state foundation, strict validation,
stable JSON conversion, the S04 command/effect/result data foundation, and one
private local diagnostic that compares fixed Standard and Supported examples.

The same evidence and impact packet resolves `MR-IMP-OPEN-016` and supersedes
only historical `MR-IF-002 v1` with frozen `v2`. The exact public operation is
`createInitialCampaignState(input: CampaignCreationInput)`. Its input contains
only campaign ID, seed, content version, build profile, pressure profile,
protagonist name, and pronoun set. S03 continues to own every fixed starting
fact. No stored field, starting value, game rule, consumer, JSON fact, content
contract, persistence contract, or player-visible meaning changes. No save
migration exists because no campaign save exists.

The controlled rules work order is `MR-WO-WP01-001`. It owns only the approved
`src/rules/` and `tests/unit/MR-WP-01/` files. OpenAI `gpt-5.6-sol` with `high`
reasoning is selected because the state contract and validation contain many
connected invariants. The primary integration work order is
`MR-WO-WP00-006`. It owns only the approved private diagnostic, bootstrap
connection, MR-WP-00 tests, and primary control records. A later fresh,
read-only OpenAI `gpt-5.6-sol` reviewer with `xhigh` reasoning reviews the
latest complete artifact after one primary audit. The worker and reviewer are
the only two approved subagents and run sequentially. No silent model or
effort substitution is allowed.

The private diagnostic route is exactly
`http://127.0.0.1:4173/?diagnostic=campaign-state`. It has no normal-page link.
It can show only profile, revision, period index, energy, evidence, paper
confidence, integrity, and a safe validation result. It cannot show JSON,
campaign ID, seed, protagonist name, histories, save data, raw errors, stack
traces, or machine facts.

Approved source and test paths are:

- `src/rules/campaign-state-codec.ts`;
- `src/rules/campaign-state-schema.ts`;
- `src/rules/campaign-state-types.ts`;
- `src/rules/campaign-state.ts`;
- `src/rules/command-contract.ts`;
- `src/rules/index.ts`;
- `src/bootstrap/campaign-state-diagnostic.ts`;
- `src/bootstrap/index.ts`;
- `src/bootstrap/main.ts`;
- `src/bootstrap/startup.css`;
- `tests/e2e/MR-WP-00/campaign-state-diagnostic.spec.ts`;
- `tests/unit/MR-WP-00/architecture.test.ts`;
- `tests/unit/MR-WP-00/campaign-state-diagnostic.test.ts`;
- `tests/unit/MR-WP-01/campaign-state-codec.test.ts`;
- `tests/unit/MR-WP-01/campaign-state.test.ts`;
- `tests/unit/MR-WP-01/campaign-test-data.ts`; and
- `tests/unit/MR-WP-01/command-contract.test.ts`.

The approved checks are focused unit and browser tests, `npm run check`,
`npm run verify`, `npm run build`, `npm audit --audit-level=high`, three-browser
flows, coverage, architecture, canonical-JSON, immutability, production,
source-map, network, telemetry, package, configuration, whitespace, full-diff,
clean-state, and absent-remote checks.

Excluded work includes real command algorithms, gameplay, campaign
progression, authored content, S12 fixture files, Three.js, a scene, geometry,
lighting, saves, IndexedDB, menus, input, movement, audio, cutscenes, assets or
asset research, dependencies, package or configuration changes, coverage
changes, telemetry, external requests, a remote, licence, release, deployment,
publication, portfolio work, Career Center changes, and Step 5.

The plan checkpoint commit is `Approve Minor Revisions Step 4 plan`. Worker
commits use `MR-WP-01 Add campaign-state foundation`. The primary diagnostic
commit uses `MR-WP-00 Add private campaign-state diagnostic`. Later checkpoint
messages are `Record Minor Revisions Step 4 Leonardo test readiness` and
`Record Minor Revisions Step 4 acceptance`.

### Leonardo contribution

Leonardo approved the purpose, exact paths, requirements, checks, private local
test, exclusions, interface evidence and impact, explicit `v1` supersession,
two work orders, model and effort selections, focused source packets,
sequential order, and commit boundaries. He has not tested or accepted a Step-4
result.

After complete review blocked integration, Leonardo approved the exact narrow
foundation-test amendment and then the complete evidence-led correction plan.
He approved `MR-IMP-OPEN-017`, `MR-IMP-DEC-306`, frozen `MR-IF-002 v3`, the
sparse initialization boundary, exact correction files and checks, the two
superseding work orders, the same OpenAI `gpt-5.6-sol` worker using `high`
reasoning, and the same OpenAI `gpt-5.6-sol` reviewer using `xhigh` reasoning.

On 2026-09-03, Leonardo approved the narrow prerequisite-proof recovery plan.
He approved `MR-IMP-OPEN-018`, `MR-IMP-DEC-307`, frozen `MR-IF-002 v4`, exact
purpose, files, requirements, checks, local test, exclusions, commit messages,
impact analysis, superseding `MR-WO-WP01-003` and `MR-WO-WP00-008`, the same
OpenAI `gpt-5.6-sol` `high` worker, and one new fresh OpenAI `gpt-5.6-sol`
`xhigh` final reviewer. He has not tested or accepted Step 4.

### Agent contribution

The primary agent prepared the first plan and impact packet, created the first
two work orders and isolated worktrees, and coordinated both submissions and
the complete primary audit. The complete independent reviewer then reported all
findings together and blocked integration. The primary agent verified the
missing-authority condition, prepared the approved `v3` packet, and created
superseding `MR-WO-WP01-002` and `MR-WO-WP00-007`. The Sol `high` worker then
submitted three narrow correction commits. Diagnostic copies and record
corrections produced packet `09dbbe8`. A new fresh Sol `xhigh` reviewer found
four required issues. The resumed Sol `high` worker proved that two issues
could not be represented by `v3` and stopped with a clean unchanged worktree.
The primary agent prepared the approved `v4` authority and superseding orders.
Integration, Leonardo test, and acceptance do not yet exist.

### Files and commits

The starting repository commit is
`596fd3564449fa7776430f44d6ba8f4cd0441dc2`. The plan checkpoint is the commit
`580c8d927434d6a05c2e79af1c3880ca955edd58`. Both work orders and worktrees use
that exact historical base. Rules corrections are `e602613`, `c2a5241`, and
`53f34b8`; diagnostic copies and records end at `09dbbe8`. Git history is
authoritative for the `v4` authority commit and active order.

### Automated and review evidence

The first submission passed 154 unit tests, 91.09 percent line coverage, 85.96
percent branch coverage, a 115-module build, 21 Chromium, Firefox, and WebKit
flows, audit, scope, privacy, network, telemetry, configuration, whitespace,
clean-state, and absent-remote checks. Complete independent review by OpenAI
`gpt-5.6-sol` using `xhigh` reasoning blocked integration. It found:

- invalid per-field restart of a revision's global history sequence;
- incomplete initial inventories and missing exact authority for several IDs;
- wrong or open experiment-band vocabularies;
- incomplete internally checkable S03 invariants;
- rejection instead of canonicalization of equivalent record insertion order;
- incomplete analysis and completion-effect shapes;
- tests that preserved invalid behaviour or omitted semantic proof;
- one nonexistent requirement reference; and
- stale current-governance records.

The diagnostic itself passed its privacy, network, scope, exact-query, safe
field, Standard-versus-Supported, normal-page, and browser checks. The review
does not accept Step 4.

The corrected packet later passed 193 combined tests, 92.18 percent line
coverage, 90.63 percent branch coverage, a 115-module build, zero audit
vulnerabilities, and 21 browser flows. The isolated duplicate-member
correction then passed 190 worker and 193 combined tests without a runtime
change. The latest fresh Sol `xhigh` review confirmed that duplicate evidence
and found four remaining required issues together:

- route states did not enforce their exact prerequisites;
- PIIM cards and outcomes did not enforce source and causal order;
- PIIM accepted a target other than `MR-PIIM-OUTCOME`; and
- deeply nested JSON could throw instead of returning a typed failure.

The resumed worker confirmed that `v3` lacked typed route and PIIM proof and
made no edit. Failed or blocked attempts are preserved here and in work-order
history, not in `ai-use-log.md`.

### Leonardo test packet

Pending. After reviewed integration, Leonardo will compare the fixed Standard
and Supported summaries, verify the stable validation result and reload, and
confirm that the normal Step-3 page is unchanged.

### Observed result and corrections

The approved narrow foundation inventory amendment is complete on the
diagnostic branch. The next correction is now defined by frozen
`MR-IF-002 v4`, `MR-WO-WP01-003`, and `MR-WO-WP00-008`. Historical `v1`
through `v3`, all submissions, audits, and reviews remain evidence.

### Acceptance decision

Pending. Plan approval is not Step-4 acceptance.

### Known limitations and next boundary

The approved OpenAI `gpt-5.6-sol` `high` `MR-WO-WP01-003` correction is active
from the local authority commit that contains it. After its verified
submission, the primary agent can activate `MR-WO-WP00-008`, run all combined
checks, complete one new primary audit, and send one complete packet to a new
fresh OpenAI `gpt-5.6-sol` reviewer using `xhigh` reasoning. Integration,
Leonardo testing, and acceptance remain pending. Step 5 and every public
action remain unapproved.

## Required accepted-step entry

When a step begins, add one section titled `## Step NN — <title>`. Keep these
subheadings in this order:

1. `Plan and authority`
2. `Leonardo contribution`
3. `Agent contribution`
4. `Files and commits`
5. `Automated and review evidence`
6. `Leonardo test packet`
7. `Observed result and corrections`
8. `Acceptance decision`
9. `Known limitations and next boundary`

The entry must distinguish:

- what Leonardo decided, selected, tested, observed, rejected, requested, and
  accepted;
- what each named agent planned, wrote, generated, tested, reviewed, repaired,
  integrated, and documented;
- the matching actual primary-session and completed-subagent entries in
  `ai-use-log.md`;
- expected results from actual results;
- temporary material from accepted final material; and
- accepted current scope from absent future work.

An agent cannot record acceptance before Leonardo gives it. A technical pass
cannot replace a direct test when the approved plan requires one.

Every change to `plan approved`, `implementing`, `technical review`, `Leonardo
testing`, `correcting`, `accepted`, `blocked`, or `superseded` must appear here
and in `development-status.md` in a local committed checkpoint before the next
activity starts. After a correction, the evidence entry must identify the new
checks and new independent review; an earlier review does not cover a later
repair.

## 2026-09-06 — Correction baseline approved; Step4 amendment active

Leonardo approved C01–C06, the reviewed correction patch and exact Step4 amendment scope in baseline-candidate.md; MR-IMP-DEC-309 records the supersession. Primary work applies the approved documents then reconciles combined f7192fa once. Candidate arithmetic/review is complete; actual amended-code checks, fresh Sol xhigh review, integration and user diagnostic acceptance remain pending. No earlier acceptance is rewritten.

## 2026-09-06 — Step4 amended-code technical review

The approved baseline is integrated at `450972c`; exact combined-source transplant is `8bd4d97`. Primary Astra completed the schema2/v5 state amendment and focused regression cases under MR-IMP-DEC-309. See `../reviews/2026-09-05-astra/step4-amendment.md` for the current full checks, primary audit and limited connected-content claims. Fresh Sol xhigh review is next. Original contributions and Steps1–3 acceptance remain historical evidence. No amended-code integration or Leonardo acceptance is claimed at this checkpoint.

## 2026-09-06 — Step4 correcting after complete review

Fresh Sol xhigh complete review of3dcd8af found no blocker and four required fixes. Primary verified the missed-issue/coverage and locked-final-band corrections plus issue-ID/status reconciliation. All remain within MR-IMP-DEC-309. Current findings, exact source boundary, actual reviewer use and repair sequence are in step4-amendment.md. Repeat affected checks and fresh focused review before integration; user observation and acceptance remain pending.

## 2026-09-06 — Corrected Step4 submitted for focused fresh review

Primary fixed all four findings from the complete3dcd8af review. The saved-state checks now retain ordered missed penalties, limited coverage after missed observations, and an already locked band on analysis expiry. Issue019 retains the resolved npm history;020 identifies the later fallback question; current resume/version fields agree. Check and verify results and the completed affected primary audit are in step4-amendment.md. A fresh Sol xhigh review of these corrections and dependencies remains required before local integration. Leonardo has not yet tested or accepted Step4.

## 2026-09-06 — Focused review complete; integration ready

Fresh Sol xhigh review of3dcd8af..a0b268f closed the source corrections and issue-ID finding. No blocker or technical finding remained. It required the current acceptance header/index/Gate1 summary to match the reviewed state. Primary corrected those exact summaries, preserved dated history, and checked formatting, diff, authority and source/test identity. This narrow record repair adds no decision or technical claim and needs no additional review under S13. Local main integration and verification come next; Leonardo testing and acceptance remain pending.

## 2026-09-06 — Corrected Step4 integrated; Leonardo testing

Local main fast-forwarded to00029e2 without conflict. Its exact source/test/package matches the revieweda0b268f correction. Main check and verify pass259 tests,90.37% branch and92.17% line coverage,115-module build and all21 browser flows. Both original Step4 branches remain unchanged; no remote is configured. The diagnostic packet and durable fresh-session prompt are in step4-amendment.md. Test expected values are not Leonardo observations. Step4 acceptance and any Step5 plan approval remain pending.

## 2026-09-06 — Corrected Step 4 accepted; Gate 4A complete

Leonardo supplied screenshots of the diagnostic and normal page and explicitly stated “I accept step 4”. The diagnostic visibly shows Standard/Supported energy 4/5; both show revision 0, period 0, evidence 3, paper confidence 45, integrity 100 and Passed validation. The normal page shows Minor Revisions, Ready, Startup checks passed, and Game systems are not yet available. No defect was reported. Reload behavior was not separately reported; no additional observation is inferred. Raw screenshots and machine paths are not stored.

Accepted result: reviewed schema2/v5 state foundation and private diagnostic, integrated and main-validated through d08ee26. Automated evidence remains 259 unit tests, required coverage, build and 21 browser flows. Acceptance changes records only. Primary checked the record diff, formatting, current-state consistency and unchanged source/tests/package. No new technical review or runtime test was needed for this acceptance record. Original contributions remain attributed to their actual agents.

Gate 4A is complete. Step 5 requires a separate exact plan and approval; it covers S06 content envelopes, profiles, strings and validation. Future campaign reachability, connected semantics, pressure/tail play quality and asset feasibility remain at their own gates. MR-IMP-OPEN-020 remains a later fallback-content question.

## 2026-09-06 — Step 5 contract preparation approved

Leonardo approved the bounded contract-preparation plan after its scope and approval boundary were presented. Primary may write the two candidate documents and named control records, run document/contract checks and obtain a fresh high-level review. This does not approve a new frozen interface, literal story text, code, configuration, assets or Step 5 acceptance. Base32d6a01; branch work/MR-WP-01-step5-contracts. Exact scope: plans/step-05-content-foundation.md.
