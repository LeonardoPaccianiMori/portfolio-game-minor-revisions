# Minor Revisions Agent Contract

These rules apply to the entire repository.

## Current phase

The repository has a complete S00–S14 implementation specification and an
incremental Step 0–70 development roadmap. Read
`docs/implementation/development-status.md` for the exact resume point. Gate 1
and the exact Step-1 plan were approved on 2026-09-01. The submitted Step-1
foundation is integrated, tested by Leonardo, and accepted. Leonardo approved
the exact Step-2 plan and its later correction plans on 2026-09-01. The Step-2
correction code and primary audit are complete, and fresh independent technical
review passed. The reviewed result is integrated on local `main`, complete
main-branch validation passed, and Leonardo accepted Step 2 on 2026-09-02.
Leonardo approved the exact Step-3 plan on 2026-09-02. The controlled worker
submitted `MR-WO-WP00-005`, and the complete primary audit passed. Fresh
independent technical review passed with one narrow current-record correction,
and focused primary validation of that correction passed. The exact worker
result is integrated on local `main`, and complete main-branch validation
passed. Leonardo confirmed the four expected lines after repeated reloads and
explicitly accepted Step 3 on 2026-09-02. Leonardo approved the exact Step-4
plan and its evidence-led `MR-IF-002 v2` creation-input refinement on
2026-09-02. `MR-WO-WP01-001` submitted verified rules commit `94b12f3`, and
`MR-WO-WP00-006` submitted the private diagnostic as `0fc7d39`; complete
checks and the primary audit passed. Fresh independent review blocked
integration with one complete set of campaign-contract findings. Leonardo
approved the evidence-led `MR-IF-002 v3` correction and superseding
`MR-WO-WP01-002` and `MR-WO-WP00-007`. `MR-WO-WP01-002` is active for the
approved Sol `high` correction worker from authority checkpoint `2904f751`;
`MR-WO-WP00-007` remains approved and waiting.
Step 5 and every later step remain unapproved; approval never carries forward.
Do not create or change game code, package configuration, tests, production
assets, or deployment configuration outside an exact approved step.

## Leonardo context and communication

Leonardo is not a software engineer or game developer. This is a hobby
project, and he has no prior Three.js coding experience. Define specialized
terms when they first appear, explain why a technical choice matters, and give
plain-language commands, expected results, and recovery steps. Do not assume
that Leonardo will implement or debug Three.js himself. These communication
rules do not reduce specification, review, testing, accessibility, provenance,
or acceptance requirements.

## Mandatory bootstrap

Before non-trivial work, read `README.md`, `docs/00-design-index.md`,
`docs/decision-log.md`, and every domain document relevant to the task.
Also read `docs/implementation/ai-use-log.md`. It is a private record for
_Minor Revisions_ only; it does not describe AI use for any other project.

For implementation-specification work, also read
`docs/implementation/status.md`, `docs/implementation/roadmap.md`,
`docs/implementation/decisions.md`, `docs/implementation/interfaces.md`, and
`docs/implementation/open-issues.md`. Resume the current block in `status.md`
unless Leonardo explicitly changes the order.

For incremental development, asset research, testing, repair, or acceptance,
also read `docs/implementation/development-status.md`,
`docs/implementation/development-roadmap.md`, and
`docs/implementation/step-acceptance-log.md`. These are the primary resume
records after S14. Do not infer a current step from conversation memory.

## Design authority

- Numbered design documents are authoritative for creative intent, game rules,
  and player-visible meaning.
- Frozen files under `docs/implementation/specs/` are authoritative for exact
  technical contracts. They are subordinate to the numbered design documents
  and cannot silently change them.
- `docs/decision-log.md` records approvals and supersessions; it does not
  replace the full specification.
- Distinguish `confirmed`, `proposed`, and `open`. Never turn an inference or a
  plausible idea into a confirmed decision.
- Every creative or technical choice that affects implementation must be
  written in the relevant document before code depends on it.
- An approved Bxx, Rxx, Sxx, roadmap, or other project decision is revisable.
  `frozen` means stable for the current approved work, not permanent. A later
  change requires evidence, impact review, Leonardo's approval, an update to
  every affected authoritative record, and an explicit `superseded` history.
- Preserve a universal fictional world. Do not reproduce real people,
  institutions, or Leonardo's experiences literally.

## Implementation specification discipline

- Keep the roadmap, status, decision, interface, and open-issue documents
  current in every specification commit.
- Use `not started`, `draft`, `candidate`, `frozen`, and `superseded` for
  shared-interface state.
- Do not guess a missing technical decision. Register it and stop dependent
  work.
- Workers have no authority over player-visible behaviour, shared contracts,
  dependencies, schemas, assets, accessibility meaning, or acceptance rules.
- A worker cannot revise an earlier decision or frozen interface. The primary
  agent first prepares the approved change packet and then gives the worker a
  revised, bounded work order only when implementation work is needed.
- Bounded discretion applies only to private, reversible details that preserve
  all observable behaviour and frozen contracts.
- Measured facts need an approved method, target, and response rule. Do not
  invent a result before execution.

## Change discipline

- Before every design discussion, consult the discussion roadmap in
  `docs/00-design-index.md`. For B00–B10 design work, resume its recorded block.
  For technical specification, use `docs/implementation/status.md`.
- Keep each roadmap block's status, unresolved work, and next-block pointer
  current. A block is complete only when its approved decisions are written in
  the authoritative domain documents, checked for contradictions, and
  committed with the roadmap update.
- Update the design index and decision log when a decision changes document
  readiness or supersedes an earlier choice.
- Preserve an accepted result as historical evidence. A later decision changes
  future work; it does not rewrite what Leonardo previously approved.
- Do not silently resolve contradictions. Record them and ask Leonardo.
- Use real commit timestamps. Do not fabricate project history.
- Keep credentials, private employer material, and unlicensed assets out of
  the repository.
- Record every external asset in `assets/ASSET_MANIFEST.md` before integration.

## Later implementation work

When implementation is authorized, give each worker explicit file or subsystem
ownership. Workers are not alone in the repository: they must preserve and
accommodate others' changes, avoid overlapping edits, and report assumptions.
All implementation must trace to approved requirements and acceptance criteria
in `docs/15-implementation-contract.md`.

Every future implementation assignment must also follow
`docs/implementation/specs/13-agent-work-orders-and-integration.md`. Only the
primary agent creates work orders, isolated branches and worktrees, integrates
reviewed commits, updates control documents, and communicates with Leonardo.
Workers cannot delegate, contact Leonardo, edit another owner's path, change a
frozen interface, use a remote, or begin from an informal chat instruction.

Use the project-local roles in `.codex/agents/` when their bounded purpose
matches the approved work. A worker, reviewer, or researcher receives a
focused approved source packet, not a full conversation-history fork. Before
spawning it, the primary agent must select and pass the exact model and
reasoning effort required by the S13 routing matrix, then record the actual
selection in the work-order and contribution evidence. If no useful,
non-overlapping delegation exists, the primary agent records why; it still
obtains the required independent review. Do not silently substitute an
unavailable model or reasoning level.

For every future primary Codex session that completes _Minor Revisions_ work,
and every completed subagent contribution, update
`docs/implementation/ai-use-log.md`. Record the actual provider, exact model,
reasoning effort, role, date or range, completed work, phase or step, and
supporting evidence. If the exact model or reasoning effort is genuinely
unavailable, record `unknown`; never infer it from a default. Split an entry
when a model changes during a session. Do not record failed, interrupted,
abandoned, considered, or unused runs. This is a project-specific rule and
does not assign this history to another Leonardo project.

## Incremental development and Leonardo review

- Implement one approved roadmap step at a time.
- Before each step, give Leonardo the exact repository plan and wait for his
  explicit approval.
- Include a delegation table in that plan. It names each task, role, owned
  paths, dependencies, model, reasoning effort, selection reason, focused
  source packet, and whether it is parallel or sequential. A plan that keeps
  implementation with the primary agent states why a worker would not improve
  that step.
- Run technical checks and independent review before asking Leonardo to accept
  a player-visible result.
- Complete one primary pre-review audit before assigning the independent
  reviewer. Reconcile control records, scope, requirements, tests, privacy,
  and current-state language in that audit.
- Require the reviewer to report all findings from its complete packet in one
  result. Do not create serial review rounds for isolated wording or formatting
  issues that the primary audit could check together.
- A code, runtime, dependency, security, privacy, accessibility, test-contract,
  interface, or material-governance correction requires the applicable checks
  and a fresh independent review. A narrow record-only or mechanical-formatting
  correction receives focused primary validation and diff review; it needs a
  further independent review only when it changes authority, evidence meaning,
  or a technical claim that cannot be mechanically checked.
- Start the game locally when direct review is required. Give Leonardo simple
  controls, actions, expected results, reporting guidance, and a safe recovery
  step. Leonardo does not debug code.
- Correct defects before dependent work. A material scope, design, frozen
  interface, or roadmap change needs a new plan and approval.
- Record Leonardo's creative, selection, testing, observation, approval, and
  acceptance contributions separately from agent planning, code, tests,
  research, review, integration, and documentation.
- Link the actual primary-session and completed-subagent entries in
  `docs/implementation/ai-use-log.md` from the relevant step evidence.
- Temporary shapes, colours, text, and synthetic sounds are permitted only
  when the approved step identifies them as temporary.
- External or generated asset candidates need source, licence, redistribution,
  modification, attribution, cost, and technical review before Leonardo
  approves integration. Modified candidates return to Leonardo for review.
- Step 70 is complete local-game acceptance. A remote, licence, release,
  deployment, or portfolio change remains outside the roadmap.
