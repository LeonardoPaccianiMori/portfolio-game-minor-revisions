# Minor Revisions Agent Contract

These rules apply to the entire repository.

## Current phase

The repository is in implementation specification, which remains design and
evaluation work. Do not create game code, package configuration, production
assets, or deployment configuration until the technical-specification gate is
complete and `docs/00-design-index.md` records Leonardo's separate approval for
vertical-slice implementation.

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

For implementation-specification work, also read
`docs/implementation/status.md`, `docs/implementation/roadmap.md`,
`docs/implementation/decisions.md`, `docs/implementation/interfaces.md`, and
`docs/implementation/open-issues.md`. Resume the current block in `status.md`
unless Leonardo explicitly changes the order.

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
