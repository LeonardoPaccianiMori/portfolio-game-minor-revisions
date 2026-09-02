---
id: MR-WO-WP00-006
type: implementation-work-order
status: superseded
work_package: MR-WP-00
sequence: 6
created: 2026-09-02
updated: 2026-09-02
base_commit: 580c8d927434d6a05c2e79af1c3880ca955edd58
provider: OpenAI
model: unknown
reasoning_level: unknown
model_selected: 2026-09-02
branch: work/MR-WP-00-campaign-state-diagnostic
worktree: .worktrees/MR-WP-00-campaign-state-diagnostic/
supersedes: null
---

# MR-WO-WP00-006 — Add the private campaign-state diagnostic

## Objective

After the exact rules worker result is submitted, connect it only to the
approved private Step-4 diagnostic route. Compare fixed Standard and Supported
campaign examples, preserve the normal Step-3 page, add the exact focused
bootstrap and browser evidence, and maintain the primary-owned control records.

This is a primary-agent coordination order, not a delegated assignment. The
current primary session identifies OpenAI as provider, but its exact model and
reasoning effort are unavailable. They remain `unknown` and are not inferred.

The exact verified dependency is
`94b12f38b36ef7acf4bd6fcc4bd344db6cd39454`. The diagnostic branch contains
exact rules copy `3bd8b18` and diagnostic commit `0fc7d39`. Leonardo approved
the narrow foundation-file inventory amendment after its exact-list test found
the missing planned path. Complete checks and the primary audit passed.
Independent review remains pending.

Complete independent review later blocked integration because the rules
dependency was incomplete. Leonardo approved `MR-IF-002 v3` and
`MR-WO-WP00-007`, which supersede this order. Its submitted diagnostic and the
approved one-line foundation inventory change remain historical evidence.

## Plain-language effect

The normal page will stay the same. A person who types the private diagnostic
address can see two small, safe summaries that prove the new campaign data was
created and checked. The page will not expose the private campaign values that
the diagnostic does not need.

## Owned paths

- `AGENTS.md`
- `README.md`
- `docs/00-design-index.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/ai-use-log.md`
- `docs/implementation/contributions/MR-CONTRIB-WP00-006.md`
- `docs/implementation/contributions/MR-CONTRIB-WP01-001.md`
- `docs/implementation/development-roadmap.md`
- `docs/implementation/development-status.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/status.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP00-006.md`
- `docs/implementation/work-orders/MR-WO-WP01-001.md`
- `src/bootstrap/campaign-state-diagnostic.ts`
- `src/bootstrap/index.ts`
- `src/bootstrap/main.ts`
- `src/bootstrap/startup.css`
- `tests/e2e/MR-WP-00/campaign-state-diagnostic.spec.ts`
- `tests/unit/MR-WP-00/architecture.test.ts`
- `tests/unit/MR-WP-00/campaign-state-diagnostic.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`

## Prohibited paths

- `.codex/`
- `.gitignore`
- `.npmrc`
- `.nvmrc`
- `.prettierignore`
- `assets/`
- `content/`
- `docs/01-vision-and-pillars.md`
- `docs/02-player-experience-and-loop.md`
- `docs/03-narrative-and-campaign.md`
- `docs/04-science-and-experiments.md`
- `docs/05-characters-and-dialogue.md`
- `docs/06-world-and-level-design.md`
- `docs/07-systems-and-balance.md`
- `docs/08-endings-and-state-matrix.md`
- `docs/09-art-audio-and-assets.md`
- `docs/10-ui-ux-accessibility.md`
- `docs/11-technical-architecture.md`
- `docs/12-content-specification.md`
- `docs/13-testing-and-evaluation.md`
- `docs/14-production-plan.md`
- `docs/decision-log.md`
- `docs/implementation/decisions.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/open-issues.md`
- `docs/implementation/specification-audit.md`
- `docs/implementation/specs/01-toolchain-and-repository.md`
- `docs/implementation/specs/02-module-architecture.md`
- `docs/implementation/specs/03-domain-model-and-state.md`
- `docs/implementation/specs/04-commands-rules-and-determinism.md`
- `docs/implementation/specs/05-calendar-scheduler-events-and-cutscenes.md`
- `docs/implementation/specs/06-content-data-and-build-profiles.md`
- `docs/implementation/specs/07-persistence-and-recovery.md`
- `docs/implementation/specs/08-world-geometry-and-interaction.md`
- `docs/implementation/specs/09-input-ui-and-accessibility.md`
- `docs/implementation/specs/10-rendering-resources-assets-and-audio.md`
- `docs/implementation/specs/11-browser-performance-and-diagnostics.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/work-orders/MR-WO-WP00-001.md`
- `docs/implementation/work-orders/MR-WO-WP00-002.md`
- `docs/implementation/work-orders/MR-WO-WP00-003.md`
- `docs/implementation/work-orders/MR-WO-WP00-004.md`
- `docs/implementation/work-orders/MR-WO-WP00-005.md`
- `eslint.config.js`
- `index.html`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `prettier.config.js`
- `src/application/`
- `src/audio/`
- `src/bootstrap/application-bootstrap.ts`
- `src/bootstrap/diagnostics.ts`
- `src/bootstrap/startup-screen.ts`
- `src/bootstrap/startup.ts`
- `src/bootstrap/temporary-adapters.ts`
- `src/content/`
- `src/cutscenes/`
- `src/input/`
- `src/interaction/`
- `src/persistence/`
- `src/platform/`
- `src/player/`
- `src/rendering/`
- `src/rules/`
- `src/ui/`
- `src/world/`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/e2e/MR-WP-00/startup-failures.spec.ts`
- `tests/fixtures/`
- `tests/unit/MR-WP-00/application-bootstrap.test.ts`
- `tests/unit/MR-WP-00/application-fakes.ts`
- `tests/unit/MR-WP-00/application.test.ts`
- `tests/unit/MR-WP-00/compatibility.test.ts`
- `tests/unit/MR-WP-00/diagnostics.test.ts`
- `tests/unit/MR-WP-00/platform-timing.test.ts`
- `tests/unit/MR-WP-00/startup.test.ts`
- `tests/unit/MR-WP-01/`
- `tsconfig.json`
- `vite.config.ts`
- `vitest.config.ts`

## Allowed sources

- `AGENTS.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/development-roadmap.md`
- `docs/implementation/development-status.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/02-module-architecture.md`
- `docs/implementation/specs/03-domain-model-and-state.md`
- `docs/implementation/specs/04-commands-rules-and-determinism.md`
- `docs/implementation/specs/11-browser-performance-and-diagnostics.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP00-006.md`
- `docs/implementation/work-orders/MR-WO-WP01-001.md`
- `package.json`
- `src/bootstrap/index.ts`
- `src/bootstrap/main.ts`
- `src/bootstrap/startup-screen.ts`
- `src/bootstrap/startup.css`
- `src/rules/index.ts`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/e2e/MR-WP-00/startup-failures.spec.ts`
- `tests/unit/MR-WP-00/architecture.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`

## Authority and traceability

- Requirements: diagnostic and test subsets of `MR-REQ-TECH-001` and
  `MR-REQ-TEST-001`, with no new game rule.
- Interfaces: consume frozen `MR-IF-002 v2` through the public `rules` entrance
  and preserve frozen `MR-IF-001 v1`, `MR-IF-014 v1`, and `MR-IF-015 v1`.
- S03 groups: display safe evidence from the fixed Standard and Supported
  initial-state examples only.
- S11 groups: private local diagnostic selection, safe output, no normal-page
  link, no external request, and no raw failure or machine detail.
- S12 boundary: focused unit and three-browser evidence only. No S12 fixture
  file or complete acceptance row is created.
- S13 groups: `MR-S13-CON-001`, `MR-S13-GATE-001`, `MR-S13-GIT-001`,
  `MR-S13-OWN-001`, `MR-S13-REV-001`, and `MR-S13-WO-001`.
- Step authority: Leonardo approved the exact Step-4 plan on 2026-09-02. Step
  5 and every public action remain blocked.
- Content IDs: none.

## Accepted dependencies

- Step 0 is complete.
- Gate 1 is approved.
- Steps 1, 2, and 3 are accepted.
- Leonardo approved the exact Step-4 plan on 2026-09-02.
- The exact plan checkpoint is
  `580c8d927434d6a05c2e79af1c3880ca955edd58`.
- The exact `MR-WO-WP01-001` result must be submitted and verified before this
  order becomes active or edits begin.
- The diagnostic branch starts from the plan checkpoint. The primary agent
  alone brings the exact submitted rules commit into it before diagnostic work.
- The accepted package and configuration remain unchanged, and no remote
  exists.

## Tasks

1. Keep this order `approved` and its worktree unchanged until the exact rules
   submission is verified. Then make it `active` through a primary-owned record
   update.
2. Bring only the verified `MR-WO-WP01-001` commit into the diagnostic branch.
   Stop for a conflict, different base, extra path, or dirty worktree.
3. Add the private route selected only by the exact query
   `?diagnostic=campaign-state`. Do not add a normal-page link or change normal
   startup behaviour.
4. Create fixed Standard and Supported inputs through the public rules entrance.
   Standard must show energy `4`; Supported must show energy `5`. All other
   listed starting facts must remain equal.
5. Render only profile, revision, period index, energy, evidence, paper
   confidence, integrity, and one safe validation result for each example.
6. Do not render or place in DOM attributes, metadata, logs, errors, or copied
   text any raw JSON, campaign ID, seed, protagonist name, history, save data,
   raw error, stack trace, path, URL, browser detail, or machine fact.
7. Use semantic HTML and the existing temporary startup visual language. The
   diagnostic must remain usable with keyboard reading order, zoom, narrow
   width, high contrast, reduced motion, and no colour-only meaning.
8. Add deterministic unit evidence for route selection, safe field projection,
   both summaries, validation success and safe failure, forbidden-output
   absence, and unchanged normal startup.
9. Extend the architecture check only as needed to prove imports use
   `src/rules/index.ts` and no bootstrap file imports a private rules module.
10. Add Chromium, Firefox, and WebKit flows for the exact private route,
    reload stability, safe visible fields, forbidden-output absence, no normal
    link, unchanged normal page, and zero external runtime requests.
11. Run every approved focused and complete check. Commit only the diagnostic
    source and test paths with the exact message
    `MR-WP-00 Add private campaign-state diagnostic`.
12. Maintain work-order, contribution, AI-use, audit, status, and step evidence
    as separate primary-owned checkpoint commits. Do not infer review,
    Leonardo observation, or acceptance.

## Non-goals

- No rule, command algorithm, campaign progression, authored content, S12
  fixture, save, persistence, IndexedDB, menu, input, movement, interaction,
  game UI, audio, cutscene, Three.js, scene, geometry, lighting, or asset.
- No normal-page wording or behaviour change and no public link to the private
  diagnostic.
- No dependency, package, lockfile, configuration, threshold, coverage ignore,
  source map, or build-policy change.
- No new or revised frozen interface, stored field, starting value, game rule,
  content contract, persistence contract, or player-visible game meaning.
- No telemetry, external request, network action, package installation,
  external code search, asset or licence research, remote, licence, release,
  deployment, portfolio, publication, Career Center change, or Step-5 work.

## Required checks and evidence

- Run the focused rules, diagnostic, architecture, preserved startup, and
  private-route browser tests.
- Run `npm run check`, `npm run verify`, `npm run build`, and
  `npm audit --audit-level=high` without changing package or configuration.
- Run the diagnostic and preserved normal-page flows across Chromium, Firefox,
  and WebKit.
- Inspect coverage, architecture, canonical JSON, immutability, production
  output, source maps, runtime network, telemetry, package and configuration
  stability, exact visible fields, forbidden output, and privacy.
- Run `git diff --check`; record exact changed paths, commits, commands, actual
  results including failures, limitations, clean state, and absent remote.
- Complete one full primary audit of the latest combined artifact before the
  fresh OpenAI `gpt-5.6-sol` reviewer runs with `xhigh` reasoning.
- After review and required corrections, integrate only reviewed commits on
  local `main`, repeat the complete checks, and prepare Leonardo's private
  local test. No Step-4 acceptance is inferred.

## Safety and quality boundaries

- Preserve the exact local-only, no-runtime-network, no-telemetry, privacy,
  dependency, package, asset, and public-action boundaries.
- Campaign ID, seed, protagonist name, history, raw JSON, save data, raw error,
  stack, path, URL, browser or device detail, credentials, personal data,
  employer material, and outside input cannot enter visible or durable output.
- Do not change a frozen interface, stored field, starting fact, game rule,
  consumer, serialization fact, content contract, player-visible game meaning,
  ownership boundary, or test contract.
- Stop for unexpected Git state, ownership overlap, missing dependency,
  unavailable required command, review blocker, or a change outside this order.
  Do not clean, overwrite, adopt, or revert another participant's work.
- Preserve and accommodate worker work. Do not amend, rebase, rewrite history,
  use a remote, deploy, publish, or start Step 5.

## Handoff

Before Leonardo tests, record the verified worker submission, primary
diagnostic commit, exact combined checks, complete primary audit, one complete
fresh independent review report, corrections, reviewed integration commits,
known limitations, and the safe local test packet. Keep technical evidence,
review, Leonardo observation, and acceptance separate.
