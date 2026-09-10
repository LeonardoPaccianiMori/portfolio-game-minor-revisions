# S13 — Agent Workflow and Integration

Status: **opencode workflow, approved 2026-09-10. Supersedes the Codex
work-order and contribution workflow. Specifications S01–S12 and the frozen
`MR-IF-*` interfaces remain authoritative and unchanged.**

## Purpose and authority

This specification fixes future work-package ownership, dependency order,
opencode agent roles, model selection, assignment records, review, validation,
integration, recovery, and approval boundaries for _Minor Revisions_.

The numbered design documents remain authoritative for player-visible meaning.
S01 through S12 remain authoritative for the toolchain, modules, state, rules,
scheduling, content, persistence, world, input, UI, rendering, resources,
browser support, diagnostics, fixtures, and acceptance. An assignment or step
record cannot change one of those contracts.

This document defines controlled package paths and governance. It does not
itself authorize a package, source file, asset, licence, remote, deployment, or
public result. Every development step still needs its own exact plan and
Leonardo's explicit approval.

The 2026-09-10 restart removed the Codex tooling and the unfinished game
scaffold. Work orders and contribution records remain in the repository as
legacy history; new work uses the merged step record defined below.

## Plain-language terms

| Term              | Meaning                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Work package      | One bounded part of implementation with fixed ownership.                |
| Step record       | The single stored record of one approved step, from plan to acceptance. |
| Owner             | The only assignment allowed to edit one path at that time.              |
| Dependency        | Earlier accepted work that another package needs.                       |
| Integration       | Copying the reviewed branch onto local `main` in the approved order.    |
| Interface         | A fixed contract that lets two modules exchange plain data.             |
| Dependency wave   | Packages that can proceed together because their paths do not overlap.  |
| Subagent          | A separate opencode agent started by the primary with a focused packet. |
| Reasoning variant | The provider's reasoning-effort preset for a model, for example `high`. |

## Fixed implementation boundary

Every package needs all three conditions before it starts:

1. the technical-specification baseline is approved;
2. every interface used by the package is frozen; and
3. Leonardo separately approves the exact step plan.

One step plan authorizes only that step's paths and checks. It cannot authorize
a later step, fallback or full-game batch, remote, licence, deployment, release,
or portfolio publication.

## Work-package inventory

The ten existing packages remain exact. A large package can use several
assignments, but its ownership boundary does not change.

| Package                                    | Exclusive future responsibility                                                                                                                                                        | Starts after                                                                                  |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `MR-WP-00` Foundation                      | Root package and tool configuration, `index.html`, foundation and architecture-check scripts, `src/bootstrap/`, `src/application/`, and `src/platform/`                                | Gate approval and frozen foundation interfaces                                                |
| `MR-WP-01` Rules and content system        | `src/rules/`, `src/content/`, state and command logic, deterministic variation, content schemas, validation, profile selection, and related unit tests                                 | Accepted `MR-WP-00`                                                                           |
| `MR-WP-02` Persistence                     | `src/persistence/`, persistence unit tests, real browser-storage tests, and S07 persistence fixtures                                                                                   | Accepted `MR-WP-00` and the accepted `MR-WP-01` state/content boundary                        |
| `MR-WP-03` World and rendering             | `src/world/`, `src/rendering/`, world geometry, collision, anchors, visual resources, drawing, S08 world tests, S10 rendering tests, and later approved `assets/` files                | Accepted `MR-WP-00`; verified asset records before any asset enters                           |
| `MR-WP-04` Input and interaction           | `src/input/`, `src/player/`, `src/interaction/`, device conversion, movement, targeting, interaction, and related tests                                                                | Accepted `MR-WP-00` and the accepted `MR-WP-03` world/target boundary                         |
| `MR-WP-05` UI and accessibility            | `src/ui/`, UI-specific CSS, semantic screens, menus, overlays, captions, errors, layout, input-navigation, and accessibility tests                                                     | Accepted `MR-WP-01`, `MR-WP-02`, and `MR-WP-04` interfaces                                    |
| `MR-WP-06` Audio and cutscenes             | `src/audio/`, `src/cutscenes/`, audio resources, cutscene presentation, restoration, and related tests                                                                                 | Accepted `MR-WP-01`, `MR-WP-03`, and `MR-WP-05` interfaces                                    |
| `MR-WP-07` Vertical-slice integration      | Slice content during the slice phase, slice integration checks, complete slice journeys, save/recovery evidence, and the private slice packet                                          | Accepted `MR-WP-00` through `MR-WP-06` and their required checks                              |
| `MR-WP-08` Campaign content integration    | Root `content/` after the slice gate, fallback and full content, English text, campaign journeys, counts, routes, and ending evidence                                                  | Accepted slice plus separate fallback approval; accepted fallback plus separate full approval |
| `MR-WP-09` Quality and release preparation | Fixture schema and manifest, acceptance matrix, shared test utilities, coverage, document, performance, dependency, asset, privacy, and release audits, and `docs/evidence/` summaries | Shared quality preparation after `MR-WP-00`; later checks only when their inputs exist        |

### Specialist ownership

- `MR-WP-03` is the only package that creates or owns Three.js objects.
- `MR-WP-02` is the only package that opens the game IndexedDB database.
- `MR-WP-06` is the only package that creates Web Audio objects.
- `MR-WP-05` owns semantic game UI DOM and CSS. Bootstrap retains only its
  approved startup and fatal-error DOM boundary.
- `MR-WP-04` owns raw input conversion, but it owns no Three.js, storage,
  audio, or campaign-state object.
- `MR-WP-01` owns schemas and content-system code, not final authored prose.

## One-owner rule

One file has one named owner at one time. Parallel assignments cannot edit the
same file, directory boundary, generated input, or shared manifest. The 2026-09-10
restart removed worktrees and parallel writers; assignments run one at a time.

The primary agent owns:

- design and Sxx specifications;
- implementation status, roadmap, decisions, interfaces, and open issues;
- step records, acceptance logs, and AI-use records;
- README and approval or gate records;
- Git branches, commits, integration, and push; and
- integration decisions and conflict resolution.

Workers can read those files. They report a required change in their handoff.
The primary agent assigns it to the current owner or creates a new assignment.
A requesting worker cannot edit another owner's path directly.

## Authored-content ownership and staged validation

There is one source catalogue under root `content/`. It is not copied for a
smaller build.

Ownership is sequential:

1. `MR-WP-07` owns `content/` while the vertical slice is active.
2. After the slice gate and a new approval, ownership transfers to `MR-WP-08`
   for the fallback.
3. After the fallback gate and a new approval, `MR-WP-08` expands the same
   catalogue for the full game.

Every profile source record has a development-only `implementationStatus` of
`complete` or `incomplete`. An incomplete inactive profile remains explicit,
cannot be built, and does not need its final selection counts. It cannot
contain fake story text or pretend that missing content exists. During slice
development only the slice profile must be complete; fallback and full remain
explicitly incomplete and fail safely. The development status never enters the
built content package or a save.

## Dependency graph and waves

The dependency graph is fixed:

```text
MR-WP-00
├── MR-WP-01 ── MR-WP-02 ──┐
│       └───────────────────┼── MR-WP-05 ── MR-WP-06 ──┐
└── MR-WP-03 ── MR-WP-04 ──┘                           │
       └────────────────────────────────────────────────┤
MR-WP-01 ───────────────────────────────────────────────┤
                                                       └── MR-WP-07
MR-WP-07 gate ── MR-WP-08 fallback gate ── MR-WP-08 full
MR-WP-00 ── MR-WP-09 shared quality preparation and later checks
```

Waves: Wave 0 `MR-WP-00`; Wave 1 `MR-WP-01` and `MR-WP-03`; Wave 2 `MR-WP-02`
and `MR-WP-04`; Wave 3 `MR-WP-05`; Wave 4 `MR-WP-06`; Wave 5 `MR-WP-07`.
`MR-WP-09` starts its shared quality lane after accepted `MR-WP-00` and checks
each later authorized package when that package's input exists. `MR-WP-08`
remains blocked until its phase gate and new approval.

The waves describe dependency order, not parallel execution. Assignments run
one at a time in the primary working tree.

## OpenCode agent roles and model matrix

The project configuration has one primary and five focused subagents:

| Role                           | Configuration path                      | Mode     | Use                                                                                   |
| ------------------------------ | --------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| Primary agent                  | `opencode.json` (`build` and `plan`)    | primary  | Planning, tracked writes, communication, validation, review coordination, integration |
| Implementation worker          | `.opencode/agent/mr-worker.md`          | subagent | One approved assignment with exclusive owned paths                                    |
| Mechanical or bulk worker      | `.opencode/agent/mr-worker-light.md`    | subagent | Known-input fixture conversion, inventories, repetitive bounded work                  |
| Independent reviewer           | `.opencode/agent/mr-reviewer.md`        | subagent | Fresh detailed review of an implementation result before integration                  |
| Design and governance reviewer | `.opencode/agent/mr-design-reviewer.md` | subagent | Fresh high-level review of a design, architecture, or material governance change      |
| Asset and evidence researcher  | `.opencode/agent/mr-researcher.md`      | subagent | Bounded asset, licence, provenance, dependency, or feasibility research               |

The default provider is OpenCode Go. The approved selection is:

| Assignment class                                                              | Exact selection                          |
| ----------------------------------------------------------------------------- | ---------------------------------------- |
| Primary session (plan and build)                                              | `opencode-go/deepseek-v4.1-flash`, `max` |
| Difficult or connected implementation, integration repair, and debugging      | `opencode-go/qwen3.8-max`, `xhigh`       |
| Routine bounded implementation, tests, tools, or UI                           | `opencode-go/qwen3.8-max`, `xhigh`       |
| Mechanical transformation, inventory, fixture conversion, or repeatable check | `opencode-go/gpt-5.6-luna`, `medium`     |
| Final independent implementation review                                       | `opencode-go/kimi-k3`, `max`             |
| Independent high-level design or material-governance review                   | `opencode-go/grok-4.6`, `xhigh`          |
| Asset, licence, provenance, or bounded evidence research                      | `opencode-go/glm-5.3`, `high`            |
| Cheap bounded document or code exploration (built-in `explore` override)      | `opencode-go/qwen3.8-flash`, `medium`    |

The model, variant, and assignment date are recorded in the step record. If the
selected model or variant is unavailable, no silent substitute is allowed. The
primary records the block and asks Leonardo when the plan must change. Effort
labels never authorize delegation: the opencode configuration sets
`task: deny` for every subagent, and the default `subagent_depth` prevents
nesting.

## Assignment lifecycle and step records

One assignment has one state:

| State        | Meaning                                                   |
| ------------ | --------------------------------------------------------- |
| `draft`      | Not approved and cannot start.                            |
| `approved`   | Exact scope is authorized but work has not started.       |
| `active`     | The assigned worker or primary is working.                |
| `blocked`    | A named condition prevents safe progress.                 |
| `submitted`  | The worker has supplied its handoff.                      |
| `reviewed`   | Independent review and required corrections are complete. |
| `integrated` | Approved commits are on local `main`.                     |
| `accepted`   | Leonardo accepted the integrated step.                    |
| `superseded` | A later approved step replaces this one.                  |
| `abandoned`  | Work stopped with reason and restart conditions recorded. |

Only the primary agent changes state. A worker cannot mark its own assignment
`reviewed`, `integrated`, or `accepted`. A material instruction change after
work starts closes or supersedes the current assignment and needs a revised
plan.

### Step-record contract

New records live under `docs/implementation/step-records/` and merge the former
plan, work order, contribution, and acceptance evidence. The file name uses
`MR-SR-<three digits>.md`.

Every step record starts with YAML front matter using exactly these fields:

| Field             | Exact value or rule                                               |
| ----------------- | ----------------------------------------------------------------- |
| `id`              | Stable `MR-SR-<three digits>` ID                                  |
| `type`            | `development-step-record`                                         |
| `status`          | One lifecycle state above                                         |
| `step`            | Approved roadmap step identifier                                  |
| `created`         | Real ISO date                                                     |
| `updated`         | Real ISO date, not earlier than `created`                         |
| `base_commit`     | Exact 40-character lowercase Git object ID or `null` before start |
| `branch`          | Exact short-lived branch name or `null` before start              |
| `primary_model`   | Exact primary provider and model                                  |
| `primary_variant` | Exact reasoning variant                                           |

The body uses these headings in order: `Objective`, `Plain-language effect`,
`Owned paths`, `Prohibited paths`, `Allowed sources`, `Authority and
traceability`, `Accepted dependencies`, `Plan`, `Tasks`, `Non-goals`,
`Required checks and evidence`, `Safety and quality boundaries`, `Execution
record`, `Independent review`, `Corrections`, and `Leonardo decision`. A
missing value uses explicit `none` or `not yet available`; it cannot be
omitted.

The `Plan` section contains the same delegation table Leonardo approved: each
task, role, owned paths, dependencies, model, variant, selection reason,
focused source packet, and parallel or sequential order.

## Git workflow

Local `main` remains the integration branch. The primary agent:

1. commits the approved plan checkpoint on `main`;
2. creates one short-lived branch named `work/<short-topic>`;
3. assigns exactly one worker, which edits files but never commits;
4. audits the complete diff and commits it on the branch;
5. obtains the fresh independent review and corrects required findings;
6. checks out `main` and integrates with `git merge --ff-only` when possible;
7. runs the applicable full verification on `main`; and
8. removes the branch only after integration and acceptance.

Workers cannot commit, amend, rebase, merge, copy another branch, edit local
`main`, create or use a remote, change branches, or force-push. Subagents cannot
use the remote. If a fast-forward is not possible, integration stops and the
primary reports the divergence rather than guessing.

## Worker authority and safe state

A worker can read approved sources, edit owned files, run approved local
checks, and report its handoff. It cannot spawn another agent, contact
Leonardo, make a design decision, install global software, change system
settings, delete broad paths, discard existing work, deploy, publish, or run an
unapproved network action.

If a worker finds an unexpected edit, untracked file, wrong branch, changed
starting commit, ownership overlap, or Git conflict, it stops and reports the
exact state. It cannot clean, overwrite, move, or adopt that work.

## Network, privacy, and provenance

Network access is off by default. The step record can authorize one exact use
for approved package installation, browser installation, dependency review, or
asset and licence research. Implementation, checks, builds, and the game remain
local and cannot contact an external service.

Workers cannot search for code to copy. Any external code fragment, asset,
font, audio item, model, or other resource needs its exact source, creator,
licence, modification and redistribution rights, intended use, and approval
before integration.

AI contribution is recorded privately. It is not presented as Leonardo's
unaided manual coding. No step record or contribution record stores
credentials, personal data, machine paths, raw private conversation, hidden
model reasoning, or employer material.

## Package test ownership

Each package owns its future tests below:

- `tests/unit/MR-WP-<two digits>/`; and
- `tests/e2e/MR-WP-<two digits>/`.

Fixture files remain grouped by owning specification below
`tests/fixtures/s02/` through `tests/fixtures/s12/`. Every fixture declares its
work-package owner. `MR-WP-09` alone owns `tests/fixtures/manifest.json`,
`tests/fixtures/acceptance-matrix.json`, shared test utilities, and
cross-package audit code.

Each package owns its own tests. `MR-WP-09` checks completeness and
traceability. It cannot change an expected result to make implementation pass.

## Worker submission

Before submission, every implementation assignment runs:

- `npm run check`;
- every test linked to its requirements; and
- `npm run build` when runtime code, content, or configuration changed.

A package that affects browser behaviour also runs its applicable Playwright
cases. Rules, content validation, and persistence changes run their required
coverage checks.

The worker handoff states the objective and plain-language result, exact files,
commands and actual results including failures, requirements and acceptance
rows addressed, limitations, blockers, requested shared-file changes, and any
unexpected fact the primary must resolve. The worker's word `finished` means
only `submitted`.

## Independent review

The reviewer receives only the step record, its explicit model-routing and
delegation data, starting and head commits, complete diff, relevant
specifications and interfaces, test results, and recorded limitations. The
reviewer is read-only and starts from a focused packet.

Before this packet is sent, the primary completes one pre-review audit. It
reconciles every changed path, control record, requirement, interface, fixture,
check result, privacy boundary, and current-state claim. The reviewer then
reports all findings from its complete packet in one structured result; the
primary must not split a review into serial searches for isolated wording or
formatting faults.

The review checks owned paths and prohibited scope; requirement, content,
interface, fixture, and acceptance links; allowed imports and browser-object
ownership; success, rejection, fault, recovery, and unchanged-state behaviour;
test completeness and honest results; persistence, accessibility, input,
cutscene, asset, privacy, and performance effects; dependencies, network use,
and provenance; and accidental creative or shared-contract changes.

Findings use:

| Level      | Response                                                        |
| ---------- | --------------------------------------------------------------- |
| `blocker`  | Integration stops.                                              |
| `required` | Correct before integration; apply the correction cadence below. |
| `advisory` | Record the improvement and its owner; defer only with a reason. |

A general statement that code looks good is not a review. A finding cannot be
silently removed or downgraded.

### Correction and re-review cadence

A correction affecting code, runtime behaviour, dependencies, security,
privacy, accessibility, a test contract, an interface, or material governance
requires the applicable checks and a fresh-context independent review of the
corrected result. A correction that only updates status, references, prose, or
mechanical formatting receives focused primary validation, `git diff --check`,
and full diff review. It does not require another full independent review
unless it changes authority, evidence meaning, or a technical claim that is not
mechanically verifiable.

The step record identifies the correction category, validation, and whether a
fresh or focused review occurred. No cadence rule permits an unresolved blocker
or required finding, a skipped applicable check, or a technical change to rely
on an older review.

## Integration readiness and validation

The primary agent can integrate only when the branch begins at the recorded
commit; every changed path matches ownership; no unrelated or untracked file is
present; required checks pass; review has no unresolved blocker or required
finding; limitations are recorded; and the step record is complete.

On `main`, the primary agent runs `npm run verify` after each dependency wave.
A clean `npm ci` is required before the first implementation wave, after an
approved package or lockfile change, and before the vertical-slice gate.

Required checks cannot be skipped, automatically retried, weakened, or
replaced with a screenshot. An unavailable required command is `blocked`, not
`pass`. The record contains the command, safe error summary, likely cause, and
next action. Manual play, direct-browser support, asset suitability,
accessibility judgment, and performance measurement remain separate future
evidence.

## Failed integration and cleanup

If a check fails after integration, dependent work stops. Use a new repair
commit. If safe repair is not possible, use a new revert commit. Do not reset,
amend, or hide the failed integration.

The primary agent removes a branch only after every approved commit is on
`main`, checks pass, the step record contains final commit IDs, Leonardo
accepts the step, and no unintegrated commit remains. A blocked assignment
keeps its branch. An abandoned assignment records its reason, useful evidence,
unsafe or incomplete parts, and restart conditions. It cannot be presented as
complete or silently reused. Uncommitted work is preserved as a patch under the
ignored `local-artifacts/` tree and recorded before any checkout is removed.

## Frozen-interface change request

An implementation worker cannot change a frozen interface. When evidence shows
a change is necessary, affected work stops. The primary agent prepares a
separate request that records the evidence and reason; affected interfaces,
packages, saves, content, and tests; compatibility or migration needs; the
proposed specification change; required retesting; and safe recovery if the
change fails.

Leonardo must approve it before authority, implementation, or expected results
change. The primary then marks the earlier interface version `superseded`,
updates every affected source and traceability route, and keeps accepted results
as historical evidence.

## Phase-specific approval

`MR-WP-08` uses at least two assignments. Fallback content and integration can
start only after the slice gate and a new approval. Full expansion can start
only after the fallback gate and another approval.

`MR-WP-09` runs only the checks for the authorized phase. A passing quality
report cannot authorize a licence, remote, push, deployment, release, portfolio
change, or completion claim.

## Communication and Leonardo review

After each integrated step, the primary agent gives Leonardo a short
plain-language report that states purpose, working result, checks, failures,
uncertainty, absent future work, and the next decision.

Leonardo is not responsible for debugging. The primary agent runs technical
commands, interprets results, and coordinates repairs. When direct play is
useful, Leonardo receives one objective, exact controls, expected result, what
to record, and a safe stop or recovery step.

Leonardo decides creative direction, clarity, humour, feel, accessibility
preference, and whether a playable phase is acceptable. Agents verify code,
interfaces, storage, browsers, tests, and technical limits. A technical choice
that needs Leonardo's approval includes a recommendation and its visible effect
without assuming software-engineering or Three.js knowledge.

## S13 acceptance groups

These are future static or unit check groups. No check or result exists now.

| Group             | Exact future acceptance                                                                                                                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MR-S13-OWN-001`  | Every planned source, content, test, configuration, control, step-record, asset, and evidence path has one permitted owner at one time; no simultaneous overlap exists.                                                                                                                                                  |
| `MR-S13-DAG-001`  | The package graph contains exactly `MR-WP-00`–`MR-WP-09`, has no cycle, reproduces the approved waves, and blocks every package whose accepted dependency or phase approval is absent.                                                                                                                                   |
| `MR-S13-WO-001`   | A valid step record has exact front matter, headings, IDs, supported model and reasoning variant selection, base commit, paths, traceability, non-goals, checks, and handoff, plus the approved delegation table. An inherited, unavailable, conflicting, missing, silently substituted, outside, or unsafe value fails. |
| `MR-S13-GIT-001`  | Branch, base, atomic-commit, dirty-state, ownership, integration-order, conflict, repair, revert, undiscarded-work, and cleanup cases follow S13 without a worktree, parallel writer, or unauthorized remote use.                                                                                                        |
| `MR-S13-REV-001`  | Submission checks, controlled reviewer packet, independent-review identity from a different model family, complete checklist, finding classes, correction, re-review, step checks, and wave checks are present and cannot be skipped.                                                                                    |
| `MR-S13-CON-001`  | Step-record front matter, required headings, commit mapping, actual results, reviewer findings, corrections, limitations, privacy exclusions, integration, and Leonardo acceptance remain complete and distinct.                                                                                                         |
| `MR-S13-GATE-001` | The approved baseline plus one exact step approval permits only that step's paths and quality work; every later step, licence, remote, deployment, release, publication, and completion remains blocked without its separate approval.                                                                                   |

All seven groups link to `MR-REQ-TECH-001` and `MR-REQ-TEST-001`.
`MR-S13-GATE-001` also links to `MR-REQ-RELEASE-001`.
`MR-S13-OWN-001`, `MR-S13-WO-001`, and `MR-S13-CON-001` include static privacy
and outside-path rejection.

## Interface lifecycle and completion

S13 added no runtime interface. `MR-IF-001` through `MR-IF-015` remain frozen
at the versions recorded in `../interfaces.md` and `../decisions.md`.

S13 is documented only when:

- every future source, test, content, control, and evidence path has one owner;
- the dependency graph is complete and has no cycle;
- agent, model, permission, step-record, branch, commit, review, validation,
  integration, and recovery contracts are exact;
- slice, fallback, full, release, remote, and publication approvals remain
  separate;
- no implementation or result is claimed; and
- every implementation gate remains blocked until its own approval.

## 2026-09-10 restart record

Leonardo approved the opencode workflow and the removal of the unfinished game
scaffold. The previous Codex work-order, contribution, worktree, and
Sol/Terra/Luna routing contracts are superseded. Their files remain as legacy
history. This specification, `opencode.json`, and `.opencode/agent/` are the
current authority for future assignments. The development pathway is being
re-planned as a separate approved task before any new step starts.
