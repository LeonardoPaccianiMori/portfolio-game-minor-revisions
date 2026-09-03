---
id: MR-WO-WP01-003
type: implementation-work-order
status: active
work_package: MR-WP-01
sequence: 3
created: 2026-09-03
updated: 2026-09-03
base_commit: 53f34b8a929a6485665d3697f82b53096107843a
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
model_selected: 2026-09-03
branch: work/MR-WP-01-campaign-state
worktree: .worktrees/MR-WP-01-campaign-state/
supersedes: MR-WO-WP01-002
---

# MR-WO-WP01-003 — Add exact Step-4 prerequisite proof

## Objective

Complete the campaign-state correction against frozen `MR-IF-002 v4` and all
four findings from the latest fresh complete review. Do not implement command
algorithms or change player-visible behaviour.

## Plain-language effect

Make each saved route and PIIM result show why it is valid. Reject a result
that lacks its exact approved proof. Keep malformed deep JSON inside the safe
typed-failure boundary.

## Owned paths

- `src/rules/campaign-state-codec.ts`
- `src/rules/campaign-state-schema.ts`
- `src/rules/campaign-state-types.ts`
- `src/rules/campaign-state.ts`
- `src/rules/command-contract.ts`
- `src/rules/index.ts`
- `tests/unit/MR-WP-01/campaign-state-codec.test.ts`
- `tests/unit/MR-WP-01/campaign-state.test.ts`
- `tests/unit/MR-WP-01/command-contract.test.ts`

## Prohibited paths

- `.codex/`
- `AGENTS.md`
- `README.md`
- `assets/`
- `content/`
- `docs/`
- `package-lock.json`
- `package.json`
- `src/application/`
- `src/bootstrap/`
- `src/persistence/`
- `tests/e2e/`
- `tests/fixtures/`
- `tests/unit/MR-WP-00/`
- `vite.config.ts`
- `vitest.config.ts`

## Allowed sources

- `docs/03-narrative-and-campaign.md`
- `docs/07-systems-and-balance.md`
- `docs/08-endings-and-state-matrix.md`
- `docs/12-content-specification.md`
- `docs/15-implementation-contract.md`
- `docs/implementation/interfaces.md`
- `docs/implementation/specs/03-domain-model-and-state.md`
- `docs/implementation/specs/04-commands-rules-and-determinism.md`
- `docs/implementation/specs/05-calendar-scheduler-events-and-cutscenes.md`
- `docs/implementation/specs/06-content-data-and-build-profiles.md`
- `docs/implementation/specs/07-persistence-and-recovery.md`
- `docs/implementation/specs/12-test-vectors-and-acceptance.md`
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`
- `docs/implementation/step-acceptance-log.md`
- `docs/implementation/work-orders/MR-WO-WP01-003.md`
- `package.json`

## Authority and traceability

- Requirements: `MR-REQ-EXP-001`, `MR-REQ-TECH-001`, and
  `MR-REQ-TEST-001`.
- Interfaces: frozen `MR-IF-002 v4`; data-shape subset of `MR-IF-003 v1`;
  canonical-data subset of `MR-IF-007 v1`.
- Authority checkpoint: the local `main` commit that contains this order,
  `MR-IMP-OPEN-018`, and `MR-IMP-DEC-307`.
- No S12 fixture file or complete acceptance row is authorized.

## Accepted dependencies

- Steps 1–3 are accepted. Step 4 is correcting and not accepted.
- The preserved worktree is clean at
  `53f34b8a929a6485665d3697f82b53096107843a`.
- Leonardo approved the exact 2026-09-03 recovery plan.
- No remote exists and package and configuration files remain unchanged.

## Tasks

1. Verify branch, HEAD, clean worktree, absent remote, Node, and npm.
2. Add only the `MR-IF-002 v4` typed career, concern, route-evaluation,
   PIIM-source, claim, requirement, and milestone proof.
3. Enforce every Aldercroft and Morrow prerequisite and add isolated positive
   and negative tests.
4. Enforce applicable batch and oxygen sources, exact claim requirements,
   the public-preprint-to-outcome order, and visible-conflict rules.
5. Accept only `MR-PIIM-OUTCOME` as the saved PIIM variation target.
6. Keep `MR-FB-EXP-RANGE-REPAIR` at one run and preserve its negative test.
7. Verify all four final choices and exact career, paper, integrity, fatigue,
   and relationship ending-module families.
8. Protect `CampaignStateCodec.parse()` so deeply nested JSON returns the
   existing safe typed failure and never throws `RangeError`.
9. Run focused tests, `npm run check`, all worker tests, `npm run build`,
   `npm audit --audit-level=high`, `npm run verify`, and `git diff --check`.
10. Commit once with `MR-WP-01 Enforce route and PIIM prerequisites`.

## Exclusions

No diagnostic, content implementation, command algorithm, scheduler algorithm,
save, Three.js, gameplay, asset, dependency, configuration, manual server,
remote, Step 5, Career Center, portfolio, publication, or deployment work.

## Required evidence and handoff

Report the exact commit and parent, sorted files, every command and result,
semantic cases, full coverage, build, browser-independent rules evidence,
scope, privacy, network, telemetry, production, package, configuration,
whitespace, clean state, and absent remote. Submitted is not reviewed,
integrated, tested by Leonardo, or accepted.

## Delegation table

| Task                          | Role                                 | Owned paths                           | Dependency                                                | Provider and model   | Effort  | Order       |
| ----------------------------- | ------------------------------------ | ------------------------------------- | --------------------------------------------------------- | -------------------- | ------- | ----------- |
| Exact prerequisite correction | Controlled implementation worker     | Nine listed rules and unit-test paths | Frozen `MR-IF-002 v4` authority commit                    | OpenAI `gpt-5.6-sol` | `high`  | First       |
| Complete final review         | Fresh read-only independent reviewer | No owned write path                   | Verified worker and diagnostic packets plus primary audit | OpenAI `gpt-5.6-sol` | `xhigh` | After audit |

The worker is not alone in the repository. It must preserve other work, cannot
delegate, and must stop if exact authority is absent.
