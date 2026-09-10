# Minor Revisions Agent Contract

These rules apply to the entire repository.

## Current phase

Read `docs/implementation/development-status.md` for the current resume record,
approved work, and the exact next action. Development restarted on 2026-09-10
under opencode. Legacy accepted steps remain historical evidence; the
development pathway is being re-planned and no game code exists. Every step
needs its exact plan and Leonardo's explicit approval before implementation;
approval never carries forward.

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
`docs/implementation/open-issues.md`. These remain the technical-specification
baseline created before the restart.

For incremental development, also read
`docs/implementation/development-status.md`,
`docs/implementation/development-roadmap.md`,
`docs/implementation/step-acceptance-log.md`, and the active step record under
`docs/implementation/step-records/`. Do not infer a current step from
conversation memory.

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

- Keep the specification records current in every specification commit.
- Use `not started`, `draft`, `candidate`, `frozen`, and `superseded` for
  shared-interface state.
- Do not guess a missing technical decision. Register it and stop dependent
  work.
- Subagents have no authority over player-visible behaviour, shared contracts,
  dependencies, schemas, assets, accessibility meaning, or acceptance rules.
- A worker cannot revise an earlier decision or frozen interface. The primary
  agent first prepares the approved change packet and then gives the worker a
  revised, bounded assignment only when implementation work is needed.
- Bounded discretion applies only to private, reversible details that preserve
  all observable behaviour and frozen contracts.
- Measured facts need an approved method, target, and response rule. Do not
  invent a result before execution.

## Change discipline

- Before every design discussion, consult the discussion roadmap in
  `docs/00-design-index.md`. For B00–B10 design work, resume its recorded block.
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
- Keep credentials, private employer material, and unlicensed assets out of the
  repository.
- Record every external asset in `assets/ASSET_MANIFEST.md` before integration.

## OpenCode workflow

- The session configuration is `opencode.json`; the subagent roles are files
  under `.opencode/agent/`; repeatable workflow prompts are under
  `.opencode/command/`. The exact role, model, and permission contract is
  authoritative in `docs/implementation/specs/13-agent-work-orders-and-integration.md`.
- The primary agent owns planning, approved tracked writes, Leonardo
  communication, validation, review coordination, integration, push, and the
  control documents.
- Delegated implementation uses one focused worker at a time. A worker edits
  only its assigned paths, cannot commit or push, cannot change branches,
  cannot delegate, cannot use the network, and cannot decide shared rules.
- Independent review uses a fresh read-only reviewer from a different model
  family than the main and worker models. No worker reviews its own work.
- Every assignment receives a focused approved source packet, not a full
  conversation-history fork. The primary records actual completed model use.
- Work happens in the primary working tree. No worktrees or parallel writers
  are used. The primary alone creates the short-lived branch and commits.
- One merged step record under `docs/implementation/step-records/` replaces the
  former separate work-order and contribution files. Historical work orders and
  contributions remain as legacy evidence.
- If a selected model is unavailable, no silent substitute is allowed. The
  primary records the block and asks Leonardo when the plan must change.

## Incremental development and Leonardo review

- Implement one approved roadmap step at a time.
- Before each step, give Leonardo the exact repository plan and wait for his
  explicit approval.
- Include a delegation table in that plan. It names each task, role, owned
  paths, dependencies, model, reasoning variant, selection reason, focused
  source packet, and whether it is parallel or sequential. A plan that keeps
  implementation with the primary states why a worker would not improve it.
- Run technical checks and independent review before asking Leonardo to accept
  a player-visible result.
- Complete one primary pre-review audit before assigning the independent
  reviewer. Reconcile control records, scope, requirements, tests, privacy, and
  current-state language in that audit.
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
- Step 70 is complete local-game acceptance under the legacy numbering. A
  remote, licence, release, deployment, or portfolio change remains outside the
  roadmap.

## Corrected review practice

The primary resolves missing shared rules and proves representative valid and
invalid contract examples before delegating implementation. Workers implement
the approved contract in exclusive paths; they cannot resolve design ambiguity.
A fresh reviewer checks both contract conformance and game meaning. After a
narrow technical correction, the fresh review covers the correction and
affected dependencies; repeat full review when behavior or shared assumptions
changed broadly. Pure mechanical records receive focused primary validation. No
worker reviews its own implementation, and no reviewer accepts a step.

## Model boundary

The default provider is OpenCode Go. The exact agent, model, and reasoning
variant matrix is authoritative in
`docs/implementation/specs/13-agent-work-orders-and-integration.md`. The main
session uses `opencode-go/deepseek-v4.1-flash` at variant `max`; the
`default_agent` is `build`. Subagents use only the exact selections in the
matrix, and actual completed use is recorded. This boundary can change only
through a new approved plan and a recorded supersession.

## GitHub synchronization approved on 2026-09-07

Leonardo authorized `origin` at
`git@github.com:LeonardoPaccianiMori/portfolio-game-minor-revisions.git` and
the initial push of local `main`. After future approved changes pass their
required checks and review, the primary agent commits, integrates into `main`,
and pushes `main` to `origin` automatically. No repeated push approval is
needed within this scope.

Before integration, fetch `origin` and inspect divergence. Use fast-forward
integration where possible. Never discard local work, force-push, rewrite
published history, or guess a meaningful merge conflict. If push fails,
preserve commits and report the cause; do not claim synchronization. Keep
worker/review branches local unless separately requested. Subagents cannot use
the remote.

This supersedes earlier statements that remote creation and push remain
unapproved. Step approvals, independent reviews and player acceptance remain
required. Remote synchronization does not authorize a licence, release,
deployment, repository visibility change or public portfolio edit.

## 2026-09-10 restart record

Leonardo approved the migration from the Codex workflow to opencode and the
removal of the unfinished game scaffold. Steps 1–5 remain accepted historical
evidence; Step 6 was abandoned before code delivery. Legacy work orders,
contributions, plans, and status records remain in the repository as history.
The development pathway will be re-planned as a separate approved task before
any new step starts. The previous Codex-specific model sections are superseded
and their history is preserved in the decision log and repository history.
