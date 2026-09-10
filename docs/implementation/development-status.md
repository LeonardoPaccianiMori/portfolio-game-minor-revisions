# Development Status

Last updated: 2026-09-10.

## Restart resume record

Status: **Development restarted on 2026-09-10 under opencode. Steps 1–5 remain accepted historical evidence; Step 6 was abandoned before code delivery. The reviewed toolchain configuration is preserved; game source, tests, content, scripts, and the Codex tooling were removed. The development pathway is being re-planned and no new step is authorized.**

- Pre-restart authority: `3e53eb5ba68e29070327fbdd76fe31b0de67a2f5` on `main`, equal to `origin/main`.
- Migration branch: `work/opencode-migration` (local; integrated only after checks and review).
- Active plan: the opencode migration and restart approved by Leonardo on 2026-09-10; see the migration step record and the decision log.
- Current state: migration implemented; technical checks and independent review are required before Leonardo's restart confirmation.
- Next permitted action: Leonardo's restart confirmation — opencode loads the project configuration, the configured subagents are available, and `npm run dev` shows the placeholder page. No game step may start before the replacement pathway is approved.
- Legacy plan state: Steps 1–5 accepted; Step 6 abandoned before code delivery. `MR-WO-WP09-001` is abandoned; its one uncommitted worktree change is preserved at `local-artifacts/legacy-step6/uncommitted-step6.patch`, and its branch `work/MR-WP-09-step6-fixture-utilities` at `89cfbcf838f8b5ba43910696e757c4e5f51d4e7c` remains local.
- Preserved specification baseline: S01–S12, the frozen `MR-IF-*` interfaces, `MR-IMP-OPEN-020` (fallback start-window question remains open), and all review records.
- Removed from the working tree: `src/`, `tests/`, `content/`, `scripts/`, `.codex/`, and previous build output. Git history retains them. The ignored `dist/` directory is recreated by `npm run build`.
- Toolchain state: dependency pins and generic configuration preserved. `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run dev`, and `npm run build` work. `npm test` and `npm run test:e2e` intentionally report no test files until the first restart step restores the tested foundation.

## Legacy pre-restart resume record

Last updated: 2026-09-09.

## Current resume point

Default next-session primary: **gpt-5.6-sol / high**, approved on2026-09-07 and configured in .codex/config.toml. Actual session identity can differ and must be recorded honestly. Steps 1–5 remain accepted. Leonardo approved the reviewed [Step 6 fixture contract](analysis/step-06-fixture-contract.md), frozen `MR-IF-015 v2`, and all four exact work orders on 2026-09-09. No accepted work restarts when the model changes. Automatic reviewed-main pushes to origin remain authorized.

Leonardo approved C01–C06 and the exact primary-owned Step4 amendment on2026-09-06. MR-IMP-DEC-309 freezes the corrected baseline; the reviewed source patch is preserved in [the approved packet](../reviews/2026-09-05-astra/baseline-candidate.md). Steps 1–4 are accepted; Leonardo accepted corrected Step 4 on 2026-09-06.

Current state: **Steps 1–5 accepted; Gate 4A complete; Step 6 implementing; MR-WO-WP09-001 active**. Authority commit `3b538f1ad1955f1e55e3f44e7d6cfe2d5e7e6a37` is the exact worker base. Authorization commit `0d44edbcd3996a92c4708d422675b8d5934d7ad7` contains the approved order. The isolated worktree is active. No Step 6 fixture code or execution evidence exists.

Leonardo supplied screenshots of both pages and explicitly stated “I accept step 4”. The diagnostic shows the exact expected Standard/Supported values and Passed validation; the normal page shows the expected four lines. Reload behavior was not separately reported. No defect was reported. The screenshots and their machine paths are not copied into the repository.

The accepted Step 5 content foundation contains 97 selected top-level items, 213 English strings and 144 laser rows. Full and fallback profiles remain incomplete and reject builds. Step 6 contract preparation is complete. The reviewed candidate defines 103 executable wrappers, 48 reference-only wrappers, 41 exact deferred setups, 45 acceptance rows and four check-safe work orders. Primary source, count, example, scope, format and diff checks passed. The final focused high-level review found no blocker or required finding. MR-IMP-DEC-311 now freezes the approved contract and resolves MR-IMP-OPEN-022. Next: activate and execute exact `MR-WO-WP09-001`. No Step 6 code result or acceptance is yet claimed. MR-IMP-OPEN-020 remains the later fallback-window question.

## Historical pre-correction resume record

The following text preserves the main-branch record before the newer Step-4
submission and current correction package. It is historical, not today's task.

### Previous incremental development status

Last updated: 2026-09-03

Status: **Step 0 complete; Gate 1 approved; Steps 1–3 accepted; Step-4 v4 rules correction active**

## Durable resume point

- Current step: `4`, exact plan approved by Leonardo on 2026-09-02.
- Current workflow state: `correcting; v4 prerequisite-proof rules order active`.
- Current governance: explicit model routing, focused project-local worker,
  independent reviewer, and asset-researcher roles, a two-subagent limit, and
  mandatory delegation-table evidence are documented. Earlier decisions and
  frozen contracts are revisable through evidence, impact review, Leonardo's
  approval, and explicit supersession. The review cadence requires one primary
  pre-review audit and fresh review only after technical or material-governance
  corrections.
- AI-use log: `ai-use-log.md` records completed project-specific AI work. It
  does not describe model use for another project.
- Last accepted implementation step: Step 3, accepted by Leonardo on
  2026-09-02.
- Next possible action: the same approved OpenAI `gpt-5.6-sol` worker using
  `high` reasoning completes only active `MR-WO-WP01-003`.
- Active approved implementation plan: Step 4 campaign-state foundation and
  private diagnostic, including the evidence-led `MR-IF-002 v4` correction.
- Active work orders: `MR-WO-WP01-003` is active from the local authority
  commit that contains it; `MR-WO-WP00-008` is approved but waits for the
  verified rules correction. Earlier Step-4 orders are superseded historical
  evidence.
- Active contribution records: `MR-CONTRIB-WP01-001` and
  `MR-CONTRIB-WP00-006` preserve the blocked first submissions.
  `MR-CONTRIB-WP00-005` and
  `MR-CONTRIB-WP00-004` are accepted.
  `MR-CONTRIB-WP00-002` remains the historical submission that received the
  blocking review.
- Active player test: none. Leonardo confirmed the four expected Step-3 lines
  after repeated reloads and explicitly accepted Step 3.
- Step-4 correction authority: `MR-IMP-OPEN-018`, `MR-IMP-DEC-307`, frozen
  `MR-IF-002 v4`, exact purpose, files, requirements, checks, local test,
  exclusions, commit boundaries, two superseding work orders, the same Sol
  `high` worker, and a new fresh Sol `xhigh` reviewer were approved on
  2026-09-03.
  Approval is not correction, integration, test, or acceptance.
- Last accepted Step-2 correction cycle: primary-audited. Primary verification
  confirms 91 unit tests, 96.48 percent line coverage, 92.30 percent branch
  coverage, a successful build, 15 passing browser flows, exact scope, public
  imports, closed diagnostics, controlled unit substitutes, production
  privacy, and a clean worker head at
  `51adc02d5eb1ab72142ed7ae7489b3b4cde2feb2`.
  The fresh review found no technical issue and one required record
  reconciliation. The reconciliation and focused validation passed. The
  reviewed worker sequence is integrated without conflict, and complete
  main-branch validation passed. No frozen interface changed.
- Current Step-3 implementation evidence: the exact worker range
  `d3c11c2a23a6a473d43ecd29d377d6eb34b691f2` through
  `f4130acb6f555cb55ff09f30b5f89e3ca49a4d89` changes only the 17 owned paths.
  Worker and primary `npm run check` and `npm run verify` passed 111 tests, the
  required coverage, a 16-module build, and all 15 Chromium, Firefox, and
  WebKit flows. The complete primary audit found no blocker or required
  correction. Fresh independent review found no technical issue and one narrow
  current-record correction. Focused primary validation of that correction
  passed. The exact reviewed range is integrated as
  `d2a63f5e4c516036380c4adaaf634d4e1e62534b` and
  `d26ffe119040dd16ba3ff4f22ffcf90375de570a`. The 17 integrated paths match the
  reviewed worker head exactly. Main `npm run check` and `npm run verify`
  passed 111 tests, 90.41 percent statements, 88.77 percent branches, 79.91
  percent functions, 93.27 percent lines, the 16-module build, and all 15
  browser flows.
- Primary-audit authority checkpoint:
  `2ca6cc8b71bb356cad6d902f5a2efb8054b8c56d`. Git history is authoritative
  for the later review-record checkpoint that contains this current state.
- Roadmap deviation request: none.
- Historical review gate: failed on the original submission. The first OpenAI
  `gpt-5.6-sol` reviewer using `xhigh` reasoning found one blocker and two
  required findings on worker head
  `43f868e64b80c88dc46832b676af6d2929f081c2`. The later corrections,
  applicable checks, complete primary audit, and fresh independent review are
  complete.
- Resolved scope block: S02 applies to type-only imports as well as runtime-value
  imports. Leonardo approved the exact addition of
  `src/bootstrap/startup-screen.ts` to `MR-WO-WP00-004`. The worker reports the
  complete approved correction submitted.
- Last accepted Step-2 review result: passed. The technical review found no
  blocker or advisory issue. Leonardo approved the required current-record
  correction, and focused primary validation passed. No new independent review
  was required because the correction changed no authority, evidence meaning,
  or technical claim.
- Last accepted Step-2 integration result: passed. The original implementation
  is integrated as `41adfbb` through `aeae015`, and the reviewed correction is
  integrated as `1e28a45` through `4475844`. Main `npm run verify` passed 91
  unit tests, 92.30 percent branch coverage, the production build, and 15
  browser flows.
- Last acceptance result: Leonardo explicitly accepted Step 3 on 2026-09-02.
- Current Step-3 review result: passed after one narrow current-record
  correction and focused primary validation.
- Current Step-3 integration result: passed without conflict. Exact worker
  content, package and configuration stability, production output, source-map,
  external-request, console-path, Git-whitespace, clean-state, and absent-remote
  checks passed.
- Current Step-3 Leonardo test result: passed. Leonardo supplied a screenshot
  that showed `Minor Revisions`, `Ready`, `Startup checks passed.`, and `Game
systems are not yet available.`, and reported the same result after repeated
  reloads. No visible error or unexpected change was reported. The raw
  screenshot and machine path are not stored.
- Current Step-3 acceptance result: Leonardo explicitly accepted Step 3 on
  2026-09-02. This does not authorize Step 4.

## Repository facts

- Branch: `main`.
- Remote: none.
- S00–S14: documented.
- Frozen interfaces: `MR-IF-002` at `v3`; `MR-IF-001` and
  `MR-IF-003`–`MR-IF-015` at `v1`. Historical `MR-IF-002 v1` and `v2` are
  superseded.
- Package configuration: integrated on local `main`.
- Startup source: the reviewed Step-3 application lifecycle is integrated on
  local `main`; no Three.js scene or game system exists.
- Tests: 111 unit tests and 15 browser flows are integrated; no S12 fixture set
  exists.
- Production assets: none.
- Local deployment configuration: none.
- Public licence: none.
- Automated Step-3 results: 111 tests, required coverage, a 16-module
  production build, and 15 passing Chromium, Firefox, and WebKit flows with no
  external request.
- Last direct Leonardo foundation test: passed. Leonardo reported the expected
  title, foundation text, game-systems-unavailable text, and no visible error.
- Direct Step-2 decision: accepted by Leonardo on 2026-09-02 after the supplied
  normal-start and controlled-failure packet; no separate observation was
  supplied.
- Direct Step-3 test and decision: passed and accepted on 2026-09-02.
- Browser-support assessment, performance measurement, and play results: none.

Git history is the authority for the commit that contains this file. Do not
insert a future or guessed commit identifier.

## Approval state

| Authority                                       | State                          | Exact boundary                                                                                                                       |
| ----------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Documentation workflow                          | Approved for documentation     | Records the 70-step incremental plan only.                                                                                           |
| Gate 1 — frozen technical baseline              | Approved on 2026-09-01         | Confirms S01–S14; authorizes no code.                                                                                                |
| Step 1                                          | Accepted on 2026-09-01         | The reviewed S01 foundation, automated evidence, and Leonardo's direct local-page result are accepted.                               |
| Step 2                                          | Accepted on 2026-09-02         | The reviewed implementation and correction are integrated, complete main checks passed, and Leonardo explicitly accepted the result. |
| Step 3                                          | Accepted on 2026-09-02         | The reviewed integration, complete main validation, visible reload result, and explicit acceptance are recorded.                     |
| Step 4                                          | Correcting                     | Latest complete review exposed the `v3` proof gap; `MR-WO-WP01-003` is active and `MR-WO-WP00-008` waits.                            |
| Steps 5–70                                      | Blocked                        | Every later step needs accepted dependencies and its own approved plan.                                                              |
| Asset research and integration                  | Blocked until its named step   | Candidate research and integration remain separate approvals.                                                                        |
| Remote, licence, release, deployment, portfolio | Blocked and outside Steps 0–70 | Each needs a later separate plan and approval.                                                                                       |

## Session-resume procedure

For any non-trivial future session:

1. Read repository `AGENTS.md` and `README.md`.
2. Read `docs/00-design-index.md` and `docs/decision-log.md`.
3. Read `ai-use-log.md`, this file, and `development-roadmap.md` first.
4. Read `step-acceptance-log.md` and the latest entry for the current and last
   accepted steps.
5. Read `status.md`, `roadmap.md`, `decisions.md`, `interfaces.md`, and
   `open-issues.md` for the frozen technical baseline.
6. Inspect Git state. Do not infer progress or actual model use from
   conversation memory or a configuration default.
7. Resume only the current approved cycle shown here. If no cycle is approved,
   prepare the next step plan and wait.
8. Read only the design, specification, work-order, contribution, and evidence
   documents needed for that step.

## Update contract

Update this file in every approved implementation, acceptance, repair,
roadmap-change, pause, or gate commit. Record:

- current step and state;
- last accepted step and Leonardo's decision date;
- exact next possible action;
- active plan, work order, branch, contribution, and test state;
- automated and manual evidence state;
- open defect, correction, or deviation;
- repository, asset, remote, licence, and deployment facts; and
- any blocked condition.

Commit each transition to `plan approved`, `implementing`, `technical review`,
`Leonardo testing`, `correcting`, `accepted`, `blocked`, or `superseded` before
the next activity starts. These small checkpoints are the durable hand-off for
another Codex session.

If this file conflicts with `development-roadmap.md` or the latest accepted
entry in `step-acceptance-log.md`, stop and resolve the documentation conflict
before implementation.

Use the current Step5 contract candidate, especially sections14–20, as the resume record. Historical checkpoint `735816b` preserves the approved preparation boundary. Do not resume from historical Step4 worker records.

2026-09-07 continuation: primary prepared candidate sections18–19 for the exact laser-row structure, one slice cost owner, named static checks, missing fixed text and semantic tutorial triggers. Temporary144-row arithmetic passed; no production validator exists. The UI-source scan is complete and primary verified material citations. The fresh high-level review is complete and found this suitable as a draft checkpoint. Primary recorded the required hard-coded tutorial/current-binding conflict and clarified input/recap wording. This was the state before Leonardo approved D3 on 2026-09-08; D1 approval persists.

## 2026-09-07 — Approved GitHub synchronization

Leonardo authorized origin `git@github.com:LeonardoPaccianiMori/portfolio-game-minor-revisions.git`, an initial main push and automatic pushes of future approved, validated, reviewed and integrated main commits. The destination was empty when inspected. The primary owns fetch/integration/push; work branches remain local. Earlier no-remote restrictions are superseded for this exact destination and operation only. No licence, deployment, release or visibility change is authorized. Step5 remains in preparation; D3 is approved and section20 contains the unapproved D2/D5/D6/D7 closure candidate. AGENTS.md contains the continuing synchronization rule. The actual push result is verified against origin/main and reported after execution.

2026-09-07: Leonardo approved ignoring all local-artifacts/ directories and their contents. The Git ignore entry and matching foundation expectation now use the broader path; S01 records its supersession. No files under that tree were tracked. Step5 preparation is unchanged; D3 is approved.

## 2026-09-08 — D3 laser outcomes approved

Leonardo approved the complete D3 proposal in the Step5 contract candidate section16. Strong means clear structure and coordinated rhythm recovery. Limited means partial structure recovery with no observed rhythm recovery. Weak means an unreliable record that establishes neither recovery nor failure. The approved decision also includes the finite observation/access/monitoring projections, no laser repatterning association, honest-reading limits, fixed result text and representative vectors. Limited rhythm-only cannot complete the Careful rehearsal without a suitable repeat or restart. This closes D3 only. Step5 preparation remains active; its final amendment, exact source profile and code are not approved.

## 2026-09-08 — Step5 contract preparation complete

Candidate section20 is the reviewed D2/D5/D6/D7 packet. It fixes semantic tutorial bodies and the dynamic current-binding boundary, retains 0–15 facility/Gabriel windows under the 0–11 slice horizon, selects all five characters and ten locations, defines 97 top-level items and 213 exact keys, removes report/break behavior with no slice source, and enumerates strict selected variants, commands, profiles, deferred checks and exact owner plans. The final high-level verdict has no blocker or required finding. Primary validation passed. Leonardo's combined amendment and implementation-plan decision is next. Frozen authorities and Step5 code remain unapproved.
