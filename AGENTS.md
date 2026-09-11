# Minor Revisions Agent Contract

These rules apply to the entire repository.

## Current phase

A full restart of the game design (v2) is in progress. Read
`docs/design/00-process.md` first; it is the durable process, current block,
and resume point. No game code exists, and no development step is authorized.

## Bootstrap

Before non-trivial work, read `README.md`, `docs/design/00-process.md`,
`docs/design/decision-log.md`, `docs/ai-use-log.md`, and the current block
document named by the process file. Read any additional document the task
explicitly requires.

## Leonardo context and communication

Leonardo is not a software engineer or game developer. This is a hobby project,
and he has no prior Three.js coding experience. Define specialized terms when
they first appear, explain why a technical choice matters, and give
plain-language commands, expected results, and recovery steps. Do not assume
that Leonardo will implement or debug code himself. These rules do not reduce
specification, review, testing, accessibility, provenance, or acceptance
requirements.

## Design authority

- The v2 design documents under `docs/design/` are authoritative for creative
  intent once Leonardo approves them.
- This contract and `docs/design/00-process.md` govern the working process.
- The previous version (v1) is preserved only in Git history at commit
  `c438b7f30059c47cc80d19363a92833d1ae002b3`. It is inspiration, never
  authority. Do not copy a v1 choice into v2 without fresh discussion and
  Leonardo's approval.
- Distinguish `confirmed`, `proposed`, and `open`. Never turn an inference or a
  plausible idea into a confirmed decision.
- Every creative or technical choice that affects implementation must be
  written in an approved document before code depends on it.

## Decision discipline

- Work one block at a time. Present a synthesis separating confirmed,
  proposed, and open decisions before writing any document.
- Leonardo must explicitly approve a synthesis before its document is written.
  Approval never carries forward.
- Do not silently resolve contradictions. Record them and ask.
- Preserve superseded decisions with a reason, date, and explicit `superseded`
  status.
- Measured facts need an approved method, target, and response rule. Do not
  invent a result before execution.
- Preserve a universal fictional world. Do not reproduce real people,
  institutions, or Leonardo's experiences literally.

## OpenCode workflow

- The session configuration is `opencode.json`; subagent roles are under
  `.opencode/agent/`; repeatable prompts are under `.opencode/command/`.
- The primary agent owns planning, approved tracked writes, Leonardo
  communication, validation, records, Git commits and push, and integration.
- Delegated work uses one bounded subagent at a time with a focused source
  packet. Subagents cannot commit, change branches, delegate, use the network
  unless the assignment authorizes one exact use, or decide shared rules.
- Independent review uses a fresh read-only reviewer from a different model
  family than the main and worker models. No worker reviews its own work.
- Record actual completed model use in `docs/ai-use-log.md`. If the exact model
  or variant is unavailable, write `unknown`; do not infer it from a
  configuration default.
- The development workflow (step records, review cadence, branch and commit
  rules) will be rewritten before Phase C. Until then, no development
  assignment exists.

## Git and GitHub

Leonardo authorized `origin` at
`git@github.com:LeonardoPaccianiMori/portfolio-game-minor-revisions.git` and
automatic pushes of approved, checked, reviewed, and integrated `main`
commits. Before integration, fetch `origin` and inspect divergence. Use
fast-forward integration where possible. Never discard local work, force-push,
rewrite published history, or guess a meaningful merge conflict. Subagents
cannot use the remote.

Every milestone commit — an approved design block, a phase completion, or an
accepted development step — includes a cost snapshot row in `docs/costs.md`.

## Assets, privacy, and provenance

- Network access is off by default. One exact use may be authorized by an
  approved plan.
- Every external asset needs source, creator, exact licence, redistribution and
  modification rights, attribution, cost, and technical review before
  integration, and must be recorded in the asset manifest once one exists.
- Keep credentials, private employer material, personal data, machine paths,
  and unlicensed assets out of the repository.
- AI contribution is recorded privately and is not presented as Leonardo's
  unaided manual work.

## 2026-09-10 restart record

Leonardo approved a full design restart (v2). All pre-restart documents were
removed from the working tree in that restart commit and are preserved in Git
at `c438b7f30059c47cc80d19363a92833d1ae002b3`. The previous development
pathway is void. The opencode workflow, local toolchain, and repository
discipline are retained.
