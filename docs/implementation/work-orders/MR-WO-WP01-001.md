---
id: MR-WO-WP01-001
type: implementation-work-order
status: active
work_package: MR-WP-01
sequence: 1
created: 2026-09-02
updated: 2026-09-02
base_commit: 580c8d927434d6a05c2e79af1c3880ca955edd58
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
model_selected: 2026-09-02
branch: work/MR-WP-01-campaign-state
worktree: .worktrees/MR-WP-01-campaign-state/
supersedes: null
---

# MR-WO-WP01-001 — Add the Step-4 campaign-state foundation

## Objective

Implement only the approved Step-4 S03 campaign-state plain-data types,
creation boundary, complete starting state, strict validation, canonical JSON
conversion, and the S04 command, effect, rejection, fault, and result data
shapes. Do not implement a command algorithm or change a frozen contract.

## Plain-language effect

This creates the checked data foundation for a new campaign. It defines what
the game can remember and the safe message shapes that later rules will use.
It does not make a command run, advance the campaign, or create gameplay.

## Owned paths

- `src/rules/campaign-state-codec.ts`
- `src/rules/campaign-state-schema.ts`
- `src/rules/campaign-state-types.ts`
- `src/rules/campaign-state.ts`
- `src/rules/command-contract.ts`
- `src/rules/index.ts`
- `tests/unit/MR-WP-01/campaign-state-codec.test.ts`
- `tests/unit/MR-WP-01/campaign-state.test.ts`
- `tests/unit/MR-WP-01/campaign-test-data.ts`
- `tests/unit/MR-WP-01/command-contract.test.ts`

## Prohibited paths

- `.codex/`
- `.gitignore`
- `.npmrc`
- `.nvmrc`
- `.prettierignore`
- `AGENTS.md`
- `README.md`
- `assets/`
- `content/`
- `docs/`
- `eslint.config.js`
- `index.html`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `prettier.config.js`
- `src/application/`
- `src/audio/`
- `src/bootstrap/`
- `src/content/`
- `src/cutscenes/`
- `src/input/`
- `src/interaction/`
- `src/persistence/`
- `src/platform/`
- `src/player/`
- `src/rendering/`
- `src/ui/`
- `src/world/`
- `tests/e2e/`
- `tests/fixtures/`
- `tests/unit/MR-WP-00/`
- `tsconfig.json`
- `vite.config.ts`
- `vitest.config.ts`

## Allowed sources

- `AGENTS.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/development-roadmap.md`
- `docs/implementation/development-status.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/01-toolchain-and-repository.md`
- `docs/implementation/specs/02-module-architecture.md`
- `docs/implementation/specs/03-domain-model-and-state.md`
- `docs/implementation/specs/04-commands-rules-and-determinism.md`
- `docs/implementation/specs/07-persistence-and-recovery.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP01-001.md`
- `package.json`
- `src/application/index.ts`
- `src/bootstrap/index.ts`
- `src/platform/index.ts`
- `tests/unit/MR-WP-00/architecture.test.ts`

## Authority and traceability

- Requirements: the Step-4 state and contract subsets of `MR-REQ-EXP-001`,
  `MR-REQ-SCI-001`, `MR-REQ-TECH-001`, and `MR-REQ-TEST-001`.
- Interfaces: frozen `MR-IF-002 v2`, the data-shape subset of frozen
  `MR-IF-003 v1`, and the canonical-data boundary of frozen `MR-IF-007 v1`.
- S03 groups: the complete schema, type, validation, initial-state, immutable
  history, and canonical JSON contracts, including `MR-S03-FIX-001` and
  `MR-S03-REJ-001` through `MR-S03-REJ-005`.
- S04 groups: only command, effect, rejection, fault, and transition-result
  data shapes. All command execution and deterministic algorithms remain
  unimplemented.
- S12 boundary: ordinary unit evidence can use the named S03 facts, but this
  order does not create an S12 fixture file or claim a complete acceptance row.
- S13 groups: `MR-S13-CON-001`, `MR-S13-GATE-001`, `MR-S13-GIT-001`,
  `MR-S13-OWN-001`, `MR-S13-REV-001`, and `MR-S13-WO-001`.
- Step authority: Leonardo approved the exact Step-4 plan and
  `MR-IF-002 v2` refinement on 2026-09-02. Step 5 and every public action
  remain blocked.
- Content IDs: none.

## Accepted dependencies

- Step 0 is complete.
- Gate 1 is approved.
- Steps 1, 2, and 3 are accepted.
- Leonardo approved the exact Step-4 plan on 2026-09-02.
- The exact plan checkpoint is
  `580c8d927434d6a05c2e79af1c3880ca955edd58`.
- `MR-IMP-OPEN-016` is resolved, `MR-IMP-DEC-305` is confirmed, and
  `MR-IF-002 v2` is frozen.
- Node `24.20.0`, npm `11.19.0`, and the accepted package and configuration
  remain unchanged.
- The worktree starts clean from the exact plan commit and has no remote.
- No campaign save, content package, game system, Three.js scene, production
  asset, licence, deployment, or public result exists.

## Tasks

1. Verify the exact branch, worktree, base commit, clean state, Node version,
   npm version, absent remote, and unchanged package and configuration before
   editing.
2. Define the complete S03 serializable plain-data types. Use no class
   instances, methods, browser objects, `Map`, `Set`, `Date`, `BigInt`,
   function, `undefined`, non-finite number, or sparse array in campaign data.
3. Define `CampaignCreationInput` with exactly campaign ID, campaign seed,
   content version, build profile, pressure profile, protagonist name, and
   pronoun set. Fixed starting facts remain private S03 constants.
4. Implement `createInitialCampaignState(input: CampaignCreationInput)` as one
   checked success-or-typed-failure boundary that returns a new complete data
   copy. Standard starts with energy `4`; Supported starts with energy `5`.
   Every other fixed starting fact follows S03 exactly.
5. Implement strict complete validation with stable typed reason codes. Reject
   unknown keys, wrong types, unsafe integers, invalid IDs and enums,
   non-finite numbers, wrong fixed lengths, duplicate or unsorted stable-ID
   collections where S03 requires order, mutable or inconsistent histories,
   and all cross-section invariant failures defined by S03.
6. Implement compact canonical JSON serialization with the exact S03 key order
   and stable collection order. Parsing must reject invalid JSON, validate the
   complete decoded value, and return a fresh checked data copy.
7. Prove input, created state, validation result, parsed state, and serialized
   output do not share mutable references. Validation and serialization cannot
   mutate their input.
8. Define only the S04 discriminated data shapes for all 24 commands, 15
   rejections, six faults, effects, and atomic success or failure results.
   Do not add dispatch, state transition, random variation, or rule logic.
9. Export only the approved public rules surface from `src/rules/index.ts`.
   Do not create a private cross-module import or export an implementation-only
   helper.
10. Add complete focused unit evidence for exact starting values, both pressure
    profiles, creation inputs, strict rejection groups, cross-section
    invariants, immutability, canonical round-trip and stable bytes, and S04
    closed unions.
11. Run every required focused and complete worker check. Make one atomic
    commit with the exact message `MR-WP-01 Add campaign-state foundation`.

## Non-goals

- No command execution, dispatcher, reducer, campaign progression, calendar
  advance, experiment algorithm, deterministic variation, random draw, event,
  scheduler, ending calculation, or gameplay.
- No authored content, content package, S12 fixture file, save envelope,
  migration, persistence, IndexedDB, menu, input, movement, interaction, UI,
  audio, cutscene, Three.js, scene, geometry, lighting, or asset.
- No dependency, package, lockfile, configuration, threshold, coverage ignore,
  source map, or build-policy change.
- No frozen specification, interface, requirement, roadmap sequence, design,
  content, asset manifest, authority, acceptance, or Career Center change by
  the worker.
- No telemetry, external request, network action, package installation,
  external code search, asset or licence research, remote, licence, release,
  deployment, portfolio, publication, Step-5 work, or visible diagnostic.

## Required checks and evidence

- Run the four focused `MR-WP-01` Vitest files.
- Inspect exact S03 type coverage, starting state, schema rejection groups,
  cross-section invariants, canonical key and collection order, stable JSON
  bytes, round-trip, deep-copy, and input immutability evidence.
- Inspect all 24 command tags, 15 rejection tags, six fault tags, effect data,
  and success or failure result unions. Confirm no command algorithm exists.
- Run `npm run check`, `npm run verify`, and `npm run build` without changing a
  package, lockfile, configuration, threshold, or coverage ignore.
- Run `npm audit --audit-level=high` and report the actual local result without
  changing dependencies or the lockfile.
- Inspect architecture, production output, privacy, and runtime network
  behaviour. Confirm no telemetry, external request, raw error output, source
  map, production console path, browser global, storage, or automatic copy,
  upload, send, or log path enters the rules surface.
- Run `git diff --check`; report the exact changed files, commit, commands,
  actual results including failures, limitations, bounded private choices, and
  a clean worktree.
- The primary agent later runs complete combined validation, one complete
  pre-review audit, one fresh OpenAI `gpt-5.6-sol` independent review using
  `xhigh` reasoning, integration checks, and Leonardo's private local test.

## Safety and quality boundaries

- Preserve the local-only, no-runtime-network, no-telemetry, privacy,
  dependency, package, asset, and public-action boundaries.
- Campaign ID, seed, protagonist name, histories, raw JSON, parse errors,
  stacks, paths, URLs, machine facts, credentials, personal data, employer
  material, and outside input cannot enter output, logs, or durable evidence.
- Do not change a frozen interface, stored field, starting fact, game rule,
  consumer responsibility, serialization fact, content contract,
  player-visible meaning, ownership boundary, or test contract.
- Do not infer a missing contract. Stop and report the affected paths,
  interfaces, tests, and safe restart condition.
- Stop for unexpected Git state, ownership overlap, missing dependency,
  unavailable required command, or a change outside this order. Do not clean,
  overwrite, adopt, or revert another participant's work.
- You are not alone in the repository. Preserve and accommodate current work,
  edit only owned paths, and report assumptions.
- Do not contact Leonardo, delegate, review, integrate, accept, use a remote,
  amend, rebase, rewrite history, or edit local `main`.

## Handoff

Submit only after all required worker checks pass or one exact block is
reported. Give the primary agent the objective, plain-language result, sorted
changed files, exact worker commit, exact commands and actual results including
failures, addressed requirements, interfaces, S03, S04, S12, and S13 groups,
known limitations, bounded private implementation choices, and any requested
primary-owned correction. The word `submitted` does not mean reviewed,
integrated, tested by Leonardo, or accepted. The primary agent creates
`MR-CONTRIB-WP01-001` only after the real submission.
