---
id: MR-SR-000
type: development-step-record
status: reviewed
step: RESTART-0
created: 2026-09-10
updated: 2026-09-10
base_commit: 3e53eb5ba68e29070327fbdd76fe31b0de67a2f5
branch: work/opencode-migration
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# MR-SR-000 — OpenCode migration and development restart

## Objective

Migrate the repository from the Codex workflow to opencode, simplify the
assignment governance to one step record per step, preserve the high-level
design and specification baseline, remove the unfinished game scaffold, and
restart development from a clean repository state.

## Plain-language effect

Leonardo now works with one opencode session whose configuration, subagents,
models, and permissions are stored in the repository. The old game code and
its tests are gone, so development begins again from the approved design and
specifications. The old records are preserved as history.

## Owned paths

- `opencode.json`
- `.opencode/agent/`, `.opencode/command/`
- `AGENTS.md`, `README.md`
- `docs/00-design-index.md`, `docs/decision-log.md`, `docs/glossary.md`
- `docs/10-ui-ux-accessibility.md`, `docs/13-testing-and-evaluation.md`,
  `docs/14-production-plan.md`, `docs/15-implementation-contract.md`
- `docs/implementation/development-status.md`,
  `docs/implementation/development-roadmap.md`,
  `docs/implementation/step-acceptance-log.md`,
  `docs/implementation/ai-use-log.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-records/`
- `index.html`, `package.json`, `vite.config.ts`, `playwright.config.ts`
- removed paths: `.codex/`, `src/`, `tests/`, `content/`, `scripts/`, previous
  build output, and retired worktree checkouts

## Prohibited paths

- `docs/01-vision-and-pillars.md` through `docs/14-production-plan.md` beyond
  the approved wording updates
- `docs/implementation/specs/01`–`12`
- `docs/implementation/{decisions,interfaces,open-issues,status,roadmap,specification-audit}.md`
- legacy `docs/implementation/{work-orders,contributions,plans,analysis}`
- `docs/reviews/`, `assets/`
- `.git/` history, remotes, and any public release artefact

## Allowed sources

- The approved migration plan in the 2026-09-10 session
- `docs/00-design-index.md`, `docs/decision-log.md`,
  `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- The opencode configuration schema at `https://opencode.ai/config.json`
- The installed model catalog from `opencode models --verbose`

## Authority and traceability

- `MR-REQ-TECH-001` and `MR-REQ-TEST-001` are unaffected; no runtime contract
  changes.
- The restart supersedes the Codex work-order, contribution, worktree, and
  model-routing contracts. The superseding record is
  `docs/decision-log.md` entry 2026-09-10 and S13's restart section.
- No frozen `MR-IF-*` interface changes.
- `MR-IMP-OPEN-020` remains the only open issue and is unaffected.

## Accepted dependencies

- Leonardo's explicit plan approval on 2026-09-10 (with `default_agent` set to
  `build`).
- The clean, equal `main` and `origin/main` at the recorded base commit.

## Plan

The approved plan is the 2026-09-10 migration plan. Delegation:

| Task                          | Role                 | Owned paths       | Depends on                          | Model                             | Variant | Reason                                                              | Packet                      | Order         |
| ----------------------------- | -------------------- | ----------------- | ----------------------------------- | --------------------------------- | ------- | ------------------------------------------------------------------- | --------------------------- | ------------- |
| Plan, tracked writes, commits | Primary              | all changed paths | approval                            | `opencode-go/deepseek-v4.1-flash` | `max`   | Design and governance authority stays with the primary              | Approved plan               | Sequential    |
| Config-parse check            | Primary              | none              | Phase 1                             | —                                 | —       | One command; no delegation value                                    | Model catalog               | After Phase 1 |
| Independent review            | `mr-design-reviewer` | read-only         | branch complete after primary audit | `opencode-go/grok-4.6`            | `xhigh` | Fresh context and different family for a material-governance change | Full branch diff, plan, S13 | After Phase 4 |

No implementation worker is used: this is configuration, governance, and
removal work where a worker adds no speed and would split design authority.

## Tasks

1. Pre-flight Git and worktree inspection; preserve the uncommitted Step 6
   worktree change as a local patch.
2. Add `opencode.json` and the five subagent roles plus three workflow
   commands.
3. Rewrite `AGENTS.md` and S13 for the opencode assignment lifecycle.
4. Update the implementation contract, README, design index, decision log,
   glossary, and testing and production wording.
5. Restart the durable records and mark Step 6 abandoned.
6. Remove the game scaffold, retire `.codex/`, trim the toolchain, and install
   the placeholder page.
7. Run checks, obtain one fresh independent review, integrate, and report to
   Leonardo.

## Non-goals

- No game code, content, tests, assets, dependencies, or new step pathway.
- No change to creative meaning, frozen interfaces, saves, or balance.
- No licence, release, deployment, visibility, or portfolio action.
- No history rewrite or remote force push.

## Required checks and evidence

- `opencode models opencode-go` loads the project configuration without error.
- `npm run lint`, `npm run format:check`, and `npm run typecheck` pass.
- `npm run dev` serves the placeholder page; `npm run build` succeeds.
- `git diff --check` and `git status` are clean after the branch commits.
- Documented expected failures: `npm test` and `npm run test:e2e` report no
  test files until the first restart step.
- One fresh independent review with all findings reported in one result.

## Safety and quality boundaries

- The work stays local except the approved review model call and the final
  approved push.
- No credentials, personal data, machine paths, or private material is stored.
- The uncommitted Step 6 work is preserved, not discarded.
- Legacy history is preserved in place and in Git.

## Execution record

- Base: `3e53eb5ba68e29070327fbdd76fe31b0de67a2f5`; branch
  `work/opencode-migration`.
- Commits: `87719f3` opencode configuration and agent roles; `4246450`
  governance rewrite; `3bac3fc` restart records; `35e25a9` scaffold removal.
  The review-correction commit is `219d77a`.
- Checks: `npm run check` exit 0; `npm run build` exit 0; `opencode models
opencode-go` exit 0; `npm run dev` served the placeholder page; `npm test`
  exit 1 with no test files, as documented; `git status` clean.
- Preservation: 755-line Step 6 patch and README under
  `local-artifacts/legacy-step6/`; branch `work/MR-WP-09-step6-fixture-utilities`
  at `89cfbcf838f8b5ba43910696e757c4e5f51d4e7c`.

## Independent review

Reviewed on 2026-09-10 at base `3e53eb5` and head `35e25a9` by a fresh-context
opencode run using the build agent `opencode-go/deepseek-v4.1-flash` with a
read-only packet. The assigned different-family reviewer (`mr-design-reviewer`,
`opencode-go/grok-4.6`, `xhigh`) could not complete: its delegated launch was
rejected at a permission prompt in the first attempt, and the standalone
different-family run was aborted by Leonardo.

Result: no blocker. Seven required record-only corrections (stale control-record
wording and incomplete step evidence) and eight advisory notes. The required
corrections were applied and received focused primary validation, not a repeat
full review, because they change no authority, evidence meaning, or
mechanically unverifiable technical claim.

Governance note: the different-model-family requirement is not yet satisfied.
Leonardo should either accept this fresh-context review or request the
different-family pass before final acceptance.

## Corrections

Applied from the independent review: seven required record-only corrections to
`docs/decision-log.md`, `docs/00-design-index.md`, and
`docs/implementation/step-acceptance-log.md`; advisory wording fixes to
`docs/implementation/development-status.md` and this record; and a `small_model`
row plus a history pointer in S13.

Deliberately not changed: the frozen `MR-REQ-TEST-001` text in
`docs/15-implementation-contract.md`, the `MR-IF-015` wording in
`docs/implementation/interfaces.md`, and the stale `src`/`tests`/`scripts` path
references in `tsconfig.json` and `eslint.config.js`. These are registered here
and will be reconciled by the first restart step that restores those paths.
Focused primary validation of the corrections passed.

## Leonardo decision

Plan approved 2026-09-10 with `default_agent` set to `build`. Restart
confirmation pending.
