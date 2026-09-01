# S13 — Agent Work Orders and Integration

Status: **documented technical specification; Step 1 accepted; Step 2 technical review passed; integration, Leonardo testing, and acceptance pending**

## Purpose and authority

This specification fixes future work-package ownership, dependency order,
agent work orders, model selection, isolated Git work, review, validation,
integration, contribution evidence, recovery, and approval boundaries for
_Minor Revisions_.

The numbered design documents remain authoritative for player-visible meaning.
S01 through S12 remain authoritative for the toolchain, modules, state, rules,
scheduling, content, persistence, world, input, UI, rendering, resources,
browser support, diagnostics, fixtures, and acceptance. A work order cannot
change one of those contracts.

This document defines controlled package paths and governance. It does not
itself authorize a package, worktree, work order, source file, asset, licence,
remote, deployment, or public result. S14 completed the final baseline audit.
Leonardo approved Gate 1 and accepted Step 1. Every later step still needs its
own exact plan and approval.

## Plain-language terms

| Term                | Meaning                                                                   |
| ------------------- | ------------------------------------------------------------------------- |
| Work package        | One bounded part of future implementation with fixed ownership.           |
| Work order          | The stored instructions for one agent assignment.                         |
| Owner               | The only assignment allowed to edit one path at that time.                |
| Dependency          | Earlier accepted work that another package needs.                         |
| Worktree            | An isolated local project folder connected to the same Git history.       |
| Integration         | Copying reviewed package commits onto local `main` in the approved order. |
| Contribution record | The durable private record of one assignment and its evidence.            |
| Interface           | A fixed contract that lets two modules exchange plain data.               |
| Dependency wave     | Packages that can proceed together because their paths do not overlap.    |

## Fixed implementation boundary

The first package required all three conditions below; they were satisfied for
the accepted Step-1 foundation. Every later package also needs its accepted
dependencies and an exact separately approved step plan:

1. S14 is documented and the technical-specification gate is approved;
2. every interface used by the package is frozen; and
3. Leonardo separately approves the exact Step-1 plan.

The former batch slice approval is superseded. One step plan can authorize only
the work-package paths and checks required by that step. It cannot authorize a
later step, fallback or full-game batch, remote, licence, deployment, release,
or portfolio publication.

## Work-package inventory

The ten existing packages remain exact. A large package can use several
smaller assignments, but its ownership boundary does not change.

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
same file, directory boundary, generated input, or shared manifest.

The primary integration agent owns:

- design and Sxx specifications;
- implementation status, roadmap, decisions, interfaces, and open issues;
- work orders and contribution records;
- README and approval or gate records; and
- integration decisions and conflict resolution.

Workers can read those files. They report a required change in their handoff.
The primary agent assigns it to the current owner or creates a repair work
order. A requesting worker cannot edit another owner's path directly.

## Authored-content ownership and staged validation

There is one source catalogue under root `content/`. It is not copied for a
smaller build.

Ownership is sequential:

1. `MR-WP-07` owns `content/` while the vertical slice is active.
2. After the slice gate and a new approval, ownership transfers to
   `MR-WP-08` for the fallback.
3. After the fallback gate and a new approval, `MR-WP-08` expands the same
   catalogue for the full game.

S06 is corrected so that slice implementation does not require final fallback
and full prose before the slice can be evaluated. Every profile source record
has a development-only `implementationStatus` of `complete` or `incomplete`.
An incomplete inactive profile remains explicit, cannot be built, and does not
need its final selection counts. It cannot contain fake story text or pretend
that missing content exists.

During slice development:

- the slice profile and all of its objects, references, strings, counts, and
  reachability must be complete and valid;
- fallback and full can remain explicitly incomplete; and
- fallback, full, and the normal default full build must fail safely.

During fallback development, slice and fallback must be complete. Full can
remain explicitly incomplete and cannot build. Before full production can
pass, all three profiles and the complete catalogue must satisfy S06. The
development status never enters the built content package or a save.

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

The future sequence is:

1. Wave 0: `MR-WP-00`.
2. Wave 1: `MR-WP-01` and `MR-WP-03` can run in parallel.
3. Wave 2: `MR-WP-02` and `MR-WP-04` can run in parallel after their own
   accepted dependency.
4. Wave 3: `MR-WP-05`.
5. Wave 4: `MR-WP-06`.
6. Wave 5: `MR-WP-07`.

`MR-WP-09` starts its shared quality lane after accepted `MR-WP-00` and checks
each later authorized package when that package's input exists. Its package
node depends only on accepted `MR-WP-00`; a later check remains blocked until
its input package exists. `MR-WP-08` remains blocked until its phase gate and
new approval.

## Planned work-order and contribution paths

The following future paths are contracts. S13 does not create them:

```text
docs/implementation/
├── work-orders/
│   └── MR-WO-WP<two digits>-<three digits>.md
└── contributions/
    └── MR-CONTRIB-WP<two digits>-<three digits>.md
```

Work-order IDs use `MR-WO-WP<two digits>-<three digits>`, for example
`MR-WO-WP01-001`. The contribution ID uses the same package and sequence, for
example `MR-CONTRIB-WP01-001`.

No agent starts from an informal conversation instruction alone.

## Work-order contract

Every work order starts with YAML front matter using exactly these fields:

| Field             | Exact value or rule                             |
| ----------------- | ----------------------------------------------- |
| `id`              | Stable `MR-WO-WP<two digits>-<three digits>` ID |
| `type`            | `implementation-work-order`                     |
| `status`          | One S13 work-order state                        |
| `work_package`    | One `MR-WP-00`–`MR-WP-09` ID matching `id`      |
| `sequence`        | Safe integer matching the three-digit ID suffix |
| `created`         | Real ISO date                                   |
| `updated`         | Real ISO date, not earlier than `created`       |
| `base_commit`     | Exact 40-character lowercase Git object ID      |
| `provider`        | Exact approved provider name                    |
| `model`           | Exact approved model name                       |
| `reasoning_level` | Exact provider-supported reasoning label        |
| `model_selected`  | Real ISO date                                   |
| `branch`          | Exact S13 branch path                           |
| `worktree`        | Exact repository-relative S13 worktree path     |
| `supersedes`      | Earlier valid work-order ID or `null`           |

Unknown or missing front-matter fields fail validation. The body uses these
headings in order:

1. `Objective`;
2. `Plain-language effect`;
3. `Owned paths`;
4. `Prohibited paths`;
5. `Allowed sources`;
6. `Authority and traceability`;
7. `Accepted dependencies`;
8. `Tasks`;
9. `Non-goals`;
10. `Required checks and evidence`;
11. `Safety and quality boundaries`; and
12. `Handoff`.

Every heading contains an explicit value or `none`. Lists of paths and stable
IDs are sorted and unique. Paths in `Owned paths`, `Prohibited paths`, and
`Allowed sources` are repository-relative, contain no `..`, and cannot name a
symbolic link or ignored output. The front-matter `worktree` field is the one
explicit ignored-path exception and must match the S13 worktree grammar. The
complete record contains:

1. stable ID, state, date, package, objective, and exact starting commit;
2. owned paths, prohibited paths, and allowed source documents;
3. requirements, interfaces, content IDs, fixture groups, and acceptance rows;
4. accepted dependencies and required earlier evidence;
5. exact tasks and explicit non-goals;
6. required commands, tests, and evidence;
7. privacy, accessibility, asset, network, and performance limits;
8. selected provider, exact model, reasoning level, and selection date;
9. branch, worktree, commit, review, and handoff rules; and
10. one plain-language description of what the assignment changes.

Career Center, the public portfolio, historical prototypes, employer material,
other projects, and outside files are unavailable unless the order explicitly
permits a narrow read-only use.

### Work-order lifecycle

One work order has one state:

| State        | Meaning                                                   |
| ------------ | --------------------------------------------------------- |
| `draft`      | Not approved and cannot start.                            |
| `approved`   | Exact scope is authorized but work has not started.       |
| `active`     | The assigned worker is working.                           |
| `blocked`    | A named condition prevents safe progress.                 |
| `submitted`  | The worker has supplied commits and its handoff.          |
| `reviewed`   | Independent review and required corrections are complete. |
| `integrated` | Approved commits are on local `main`.                     |
| `accepted`   | Leonardo accepted the integrated package.                 |
| `superseded` | A later work order replaces this one.                     |
| `abandoned`  | Work stopped with reason and restart conditions recorded. |

Only the primary agent changes state. A worker cannot mark its own order
`reviewed`, `integrated`, or `accepted`.

A material instruction change after work starts closes or supersedes the
current assignment. The primary agent prepares a revised or new work order.

## Model-selection contract

Every order records the exact model, provider, reasoning level, and assignment
date. If the selected model is unavailable, no silent substitute is allowed.
The primary agent revises the work order and obtains any required new approval
first. The written value alone is insufficient: before spawning the agent, the
primary agent passes that exact model and reasoning effort to the Codex agent
configuration. The contribution record and independent-review record preserve
the actual selection. A default inherited model is not a valid substitute for
an omitted selection.

The current OpenAI routing matrix is:

| Assignment class                                                                                          | Exact default selection             | Boundary                                                                                                |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Architecture, shared contracts, persistence, Three.js, accessibility, integration, or difficult debugging | `gpt-5.6-sol`, `high` or `xhigh`    | Use `xhigh` when the work has several difficult connected trade-offs.                                   |
| Final independent implementation or governance review                                                     | `gpt-5.6-sol`, `xhigh`              | The reviewer is fresh-context and read-only.                                                            |
| Normal bounded implementation, tests, tools, or UI work                                                   | `gpt-5.6-terra`, `medium` or `high` | Use `high` when the task must trace several modules or edge cases.                                      |
| Asset, licence, and provenance research                                                                   | `gpt-5.6-terra`, `high`             | Escalate a materially ambiguous rights or provenance question to Sol under a new or revised work order. |
| Mechanical transformation, inventory, fixture conversion, or repeatable check with known input and output | `gpt-5.6-luna`, `low` or `medium`   | It cannot decide design, a shared contract, or an approval question.                                    |

`max` is reserved for an exceptional, documented quality-first single-agent
problem after the primary agent explains why `xhigh` is insufficient. Do not
assign `ultra` to a worker, reviewer, or researcher: it uses subagents while
this project forbids a delegated worker from delegating again. The primary
agent may use a supported higher-effort setting only when the approved plan
states its purpose and it does not bypass this routing, ownership, review, or
approval contract. These named defaults are rechecked for availability before
each assignment; a changed provider or model family needs a revised work order
and Leonardo's approval when it changes the selected assignment.

The project-local configuration has three focused roles:

| Role                             | Configuration path                                         | Use                                                                                                                                                                   |
| -------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Controlled implementation worker | `.codex/agents/minor-revisions-implementation-worker.toml` | One approved assignment with exclusive owned paths. Its model stays unset in the profile so the primary agent must pass the matrix-selected value for the exact work. |
| Independent reviewer             | `.codex/agents/minor-revisions-independent-reviewer.toml`  | Fresh-context, read-only review using Sol `xhigh`.                                                                                                                    |
| Asset researcher                 | `.codex/agents/minor-revisions-asset-researcher.toml`      | Focused candidate, licence, and provenance research using Terra `high`.                                                                                               |

At most two subagents can run at the same time under `.codex/config.toml`. The
primary agent uses parallel work only when paths, inputs, and decisions do not
overlap. It explains in the step plan why no worker delegation is useful when
it retains an implementation task in the primary context. The independent
review remains required.

The implementation worker cannot provide the final independent review. A
fresh-context agent performs that review. Earlier Claude Opus 5 design reviews
remain design evidence; they are not automatic implementation reviews.

## Project AI-use log

[`ai-use-log.md`](../ai-use-log.md) is the private, detailed source of truth
for actual AI contributions to _Minor Revisions_. It is limited to this game;
its historical entries do not make a claim about AI use for any other Leonardo
project.

For every future primary Codex session that completes project work, and every
completed subagent contribution, the primary agent adds one entry with the
date or range, provider, exact model, actual reasoning effort, role, completed
work, phase or step, and durable evidence. A model change during a session
creates separate entries. The actual session values must be recorded; a
configuration default is not evidence. If the exact model or reasoning effort
is genuinely unavailable, write `unknown` rather than infer it.

Do not add failed, interrupted, abandoned, considered, or unused runs. The
log contains durable summaries only. It does not duplicate model cost or token
figures that already exist in linked provider metadata, and it excludes raw
conversation, hidden reasoning, credentials, personal data, and machine paths.
It complements, but does not replace, the exact model-selection requirement in
a future work order, contribution record, and independent-review record.

## Branch and worktree contract

Local `main` remains the integration branch. The primary agent creates one
short-lived branch and isolated worktree from the exact starting commit in the
work order:

- branch: `work/MR-WP-<two digits>-<short-topic>`;
- worktree: `.worktrees/MR-WP-<two digits>-<short-topic>/`.

`.worktrees/` is a future ignored local path inside the Minor Revisions
repository. Only the primary agent can create or remove a worktree or branch.
The primary agent verifies the exact path and branch before a worker starts.

Workers make small atomic commits. Each message starts with its work-package
ID. A worker cannot:

- bundle unrelated formatting;
- amend, rebase, or rewrite a commit;
- merge or copy another branch;
- edit local `main`;
- create, modify, or use a remote; or
- force-push.

## Worker authority and safe state

A worker can read approved sources, edit owned files, run approved local
checks, and create assigned commits. It cannot spawn another agent, contact
Leonardo, make a design decision, install global software, change system
settings, delete broad paths, discard existing work, deploy, publish, or run
an unapproved network action.

The primary agent alone creates parallel assignments. Workers are not alone in
the repository and must preserve compatible work from other packages.

If a worker finds an unexpected edit, untracked file, wrong branch, changed
starting commit, ownership overlap, or Git conflict, it stops and reports the
exact state. It cannot clean, overwrite, move, or adopt that work.

## Network, privacy, and provenance

Network access is off by default. The work order can authorize one exact use
for approved package installation, Playwright-browser installation, dependency
review, or asset and licence research. Implementation, checks, builds, and the
game remain local and cannot contact an external service.

Workers cannot search for code to copy. Any external code fragment, asset,
font, audio item, model, or other resource needs its exact source, creator,
licence, modification and redistribution rights, intended use, and approval
before integration.

AI contribution is recorded privately. It is not presented as Leonardo's
unaided manual coding. No work order or contribution record stores credentials,
personal data, machine paths, raw private conversation, hidden model reasoning,
or employer material.

## Package test ownership

Each package owns its future tests below:

- `tests/unit/MR-WP-<two digits>/`; and
- `tests/e2e/MR-WP-<two digits>/`.

Fixture files remain grouped by owning specification below
`tests/fixtures/s02/` through `tests/fixtures/s12/`. Every fixture declares its
work-package owner. `MR-WP-09` alone owns `tests/fixtures/manifest.json`,
`tests/fixtures/acceptance-matrix.json`, shared test utilities, and cross-
package audit code.

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

The worker handoff states:

- objective and plain-language result;
- exact files and commits;
- commands and actual results, including failures;
- requirements, fixtures, and acceptance rows addressed;
- limitations, blockers, and requested shared-file changes; and
- any unexpected fact that the primary agent must resolve.

The worker's word `finished` means only `submitted`.

## Independent review

The reviewer receives only the approved work order, its explicit model-routing
and delegation data, starting and final branch commits, complete diff, relevant
specifications and interfaces, test results, and recorded limitations. The
reviewer is read-only and starts from a focused packet rather than the full
conversation history.

Before this packet is sent, the primary agent completes one pre-review audit.
It reconciles every changed path, control record, requirement, interface,
fixture, check result, privacy boundary, and current-state claim. The reviewer
then reports all findings from its complete packet in one structured result;
the primary agent must not split a review into serial searches for isolated
wording or formatting faults.

The review checks:

1. owned paths and prohibited scope;
2. requirement, content, interface, fixture, and acceptance links;
3. allowed imports and browser-object ownership;
4. success, rejection, fault, recovery, and unchanged-state behaviour;
5. test completeness and honest results;
6. persistence, accessibility, input, cutscene, asset, privacy, and
   performance effects;
7. dependencies, network use, and provenance; and
8. accidental creative or shared-contract changes.

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
unless it changes authority, evidence meaning, or a technical claim that is
not mechanically verifiable. The primary agent may request one focused
read-only re-check when that narrow boundary is uncertain.

The contribution record identifies the correction category, validation, and
whether a fresh or focused review occurred. No cadence rule permits an
unresolved blocker or required finding, a skipped applicable check, or a
technical change to rely on an older review.

## Integration readiness

The primary agent can integrate only when:

- the branch begins at the recorded commit;
- every changed path matches ownership;
- no unrelated or untracked file is present;
- required checks pass;
- review has no unresolved blocker or required finding;
- limitations are recorded; and
- the draft contribution record is complete.

The primary agent copies approved commits to `main` with `git cherry-pick` in
dependency order. When two packages share a wave, the lower package number is
integrated first. Relevant checks run after each package. `npm run verify` runs
after the complete wave.

If a cherry-pick conflict occurs, integration stops and the change returns to
the correct owner. The primary agent does not guess.

## Complete validation cadence

On `main`, the primary agent runs `npm run verify` after every dependency wave.
A clean `npm ci` is required before the first implementation wave, after an
approved package or lockfile change, and before the vertical-slice gate.

Required checks cannot be skipped, automatically retried, weakened, or
replaced with a screenshot. An unavailable required command is `blocked`, not
`pass`. The record contains the command, safe error summary, likely cause, and
next action.

Manual play, direct-browser support, asset suitability, accessibility judgment,
and performance measurement remain separate future evidence.

## Contribution record

Every contribution record starts with YAML front matter using exactly:

| Field             | Exact value or rule                                               |
| ----------------- | ----------------------------------------------------------------- |
| `id`              | Matching `MR-CONTRIB-WP<two digits>-<three digits>` ID            |
| `type`            | `implementation-contribution`                                     |
| `status`          | `submitted`, `reviewed`, `integrated`, `accepted`, or `abandoned` |
| `work_order`      | The matching valid work-order ID                                  |
| `work_package`    | Matching `MR-WP-00`–`MR-WP-09` ID                                 |
| `created`         | Real ISO date                                                     |
| `updated`         | Real ISO date, not earlier than `created`                         |
| `base_commit`     | The work order's exact 40-character Git object ID                 |
| `provider`        | Exact worker provider                                             |
| `model`           | Exact worker model                                                |
| `reasoning_level` | Exact worker reasoning label                                      |

Unknown or missing front-matter fields fail validation. The body uses these
headings in order: `Scope and result`, `Changed files`, `Authority`, `Worker
commits`, `Integrated commits`, `Commands and results`, `Independent review`,
`Corrections`, `Known limitations`, and `Leonardo decision`. A missing value
uses explicit `none` or `not yet available`; it cannot be omitted.

Every assignment record contains:

- linked work order, date, and starting commit;
- provider, model, and reasoning level;
- owned and changed files;
- requirements and acceptance rows;
- worker branch commits and final `main` commits;
- commands and results;
- independent reviewer and findings;
- corrections and known limitations; and
- Leonardo's decision.

It contains durable summaries, not raw logs, save payloads, protagonist names,
private conversation, raw errors, machine paths, personal data, or hidden
reasoning.

The `Independent review` section records the review date, reviewer provider,
exact model, reasoning level, reviewed commits, and findings. The reviewer is
not the implementation worker.

Submission, review, integration, and acceptance remain separate. A package is
complete only after independent review and checks pass, the primary agent
integrates it, Leonardo receives a plain-language report, and Leonardo accepts
it. Dependent work waits for the required accepted package.

## Failed integration and cleanup

If a check fails after integration, dependent work stops. Use a new repair
commit. If safe repair is not possible, use a new revert commit. Do not reset,
amend, or hide the failed integration.

The primary agent removes a worktree and branch only after every approved
commit is on `main`, checks pass, the contribution record contains final commit
IDs, Leonardo accepts the package, and no unintegrated commit remains.

A blocked assignment keeps its branch and worktree. An abandoned assignment
records its reason, useful evidence, unsafe or incomplete parts, and restart
conditions. It cannot be presented as complete or silently reused.

## Frozen-interface change request

An implementation worker cannot change a frozen interface. When evidence
shows a change is necessary, affected work stops. The primary agent prepares a
separate request that records:

- evidence and reason;
- affected interfaces, packages, saves, content, and tests;
- compatibility or migration needs;
- proposed specification change;
- required retesting; and
- safe recovery if the change fails.

Leonardo must approve it before authority, implementation, or expected results
change. The primary agent then marks the earlier interface version
`superseded`, updates every affected source and traceability route, and keeps
accepted results as historical evidence.

## Phase-specific approval

`MR-WP-08` uses at least two work orders. Fallback content and integration can
start only after the slice gate and a new approval. Full expansion can start
only after the fallback gate and another approval.

`MR-WP-09` runs only the checks for the authorized phase. A passing quality
report cannot authorize a licence, remote, push, deployment, release,
portfolio change, or completion claim.

## Communication and Leonardo review

After each integrated package, the primary agent gives Leonardo a short plain-
language report that states purpose, working result, checks, failures,
uncertainty, absent future work, and the next decision.

Leonardo is not responsible for debugging. The primary agent runs technical
commands, interprets results, and coordinates repairs. When direct play is
useful, Leonardo receives one objective, exact controls, expected result, what
to record, and a safe stop or recovery step.

Leonardo decides creative direction, clarity, humour, feel, accessibility
preference, and whether a playable phase is acceptable. Agents verify code,
interfaces, storage, browsers, tests, and technical limits. A technical choice
that needs Leonardo's approval includes a recommendation and its visible
effect without assuming software-engineering or Three.js knowledge.

`../development-roadmap.md` divides package delivery into small player-review
checkpoints. After each player-visible integrated step, the primary agent runs
the game locally and supplies the objective, controls, actions, expected
results, reporting request, and safe recovery action. The step remains open
until Leonardo accepts it. Contribution evidence separates Leonardo's design,
selection, testing, observations, approvals, and acceptance from agent code,
tests, research, review, repair, integration, and documentation.

## S13 acceptance groups

These are future static or unit check groups. No check or result exists now.

| Group             | Exact future acceptance                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MR-S13-OWN-001`  | Every planned source, content, test, configuration, control, work-order, contribution, asset, and evidence path has one permitted owner at one time; no simultaneous overlap exists.                                                                                                                                                                                                                          |
| `MR-S13-DAG-001`  | The package graph contains exactly `MR-WP-00`–`MR-WP-09`, has no cycle, reproduces the approved waves, and blocks every package whose accepted dependency or phase approval is absent.                                                                                                                                                                                                                        |
| `MR-S13-WO-001`   | Valid work-order front matter, headings, IDs, explicit supported spawned model and reasoning selection, base commit, paths, traceability, non-goals, checks, and handoff pass; its linked approved step delegation table records the focused source packet, role, path boundary, and selection reason. An inherited, unavailable, conflicting, missing, silently substituted, outside, or unsafe value fails. |
| `MR-S13-GIT-001`  | Branch, worktree, base, atomic-commit, dirty-state, ownership, integration-order, conflict, repair, revert, and cleanup cases follow S13 without a remote or history rewrite.                                                                                                                                                                                                                                 |
| `MR-S13-REV-001`  | Submission checks, controlled reviewer packet, independent-review identity, complete checklist, finding classes, correction, re-review, package checks, and wave checks are present and cannot be skipped.                                                                                                                                                                                                    |
| `MR-S13-CON-001`  | Contribution front matter, required headings, commit mapping, actual results, reviewer findings, corrections, limitations, privacy exclusions, integration, and Leonardo acceptance remain complete and distinct.                                                                                                                                                                                             |
| `MR-S13-GATE-001` | Gate 1 plus one exact step approval permits only that step's paths and quality work; every later step, licence, remote, deployment, release, publication, and completion remains blocked without its separate approval.                                                                                                                                                                                       |

All seven groups link to `MR-REQ-TECH-001` and `MR-REQ-TEST-001`.
`MR-S13-GATE-001` also links to `MR-REQ-RELEASE-001`.
`MR-S13-OWN-001`, `MR-S13-WO-001`, and `MR-S13-CON-001` include static privacy
and outside-path rejection. S14 verifies their complete requirement, interface,
and acceptance links before Gate 1.

## Interface lifecycle and completion

S13 added no runtime interface. `MR-IF-001` through `MR-IF-015` remained
candidate `v1` after S13. The staged-content correction refined candidate
`MR-IF-006` before its S14 audit. S13 did not freeze an interface.

S13 is documented only when:

- every future source, test, content, control, and evidence path has one owner;
- the dependency graph is complete and has no cycle;
- work-order, lifecycle, model, branch, commit, review, validation,
  contribution, integration, and recovery contracts are exact;
- slice, fallback, full, release, remote, and publication approvals remain
  separate;
- no implementation or result is claimed;
- `MR-IMP-OPEN-013` is resolved and `MR-IMP-OPEN-014` is active; and
- every implementation gate remains blocked.

S14 later records the complete inventory, contradiction and assumption audit,
interface-freeze result, resolved issue, and Gate-1 packet. Gate 1 remains a
separate Leonardo decision.

## S14 audit record

The S14 cross-interface and contradiction audit is complete. Every shared
interface defined or connected by this specification is frozen `v1` through
the interface register and `specification-audit.md`. Earlier candidate-state
statements preserve the interface lifecycle before S14; they are not the
current state. No executable fixture or measured result exists. Leonardo
approved Gate 1 and accepted Step 1 on 2026-09-01. Leonardo approved the exact
Step-2 plan and its later correction plans on the same date. The correction code
and primary audit are complete, and fresh independent technical review passed.
Integration, Leonardo testing, and acceptance remain pending. Step 3 requires
its own exact plan and separate approval.
