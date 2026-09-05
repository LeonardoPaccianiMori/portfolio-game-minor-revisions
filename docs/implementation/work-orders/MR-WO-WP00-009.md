---
id: MR-WO-WP00-009
type: implementation-work-order
status: submitted
work_package: MR-WP-00
sequence: 9
created: 2026-09-04
updated: 2026-09-04
base_commit: 7092498eb018a98a230e63b63ada6e4ee9911b6d
provider: OpenAI
model: unknown
reasoning_level: unknown
model_selected: 2026-09-04
branch: work/MR-WP-00-campaign-state-diagnostic
worktree: .worktrees/MR-WP-00-campaign-state-diagnostic/
supersedes: MR-WO-WP00-008
---

# MR-WO-WP00-009 — Record Step-4 route and npm correction

## Objective

Adopt the approved npm `12.0.2` S01 contract, copy exact rules correction
`f2babe975073fb3c4d5dc09d703aed225c9fd005`, update current records, and
produce one complete combined primary-audit packet for fresh review.

## Owned paths

- exact rules commit `f2babe975073fb3c4d5dc09d703aed225c9fd005`;
- `AGENTS.md`;
- `README.md`;
- `docs/00-design-index.md`;
- `docs/decision-log.md`;
- `docs/implementation/ai-use-log.md`;
- `docs/implementation/contributions/MR-CONTRIB-WP00-008.md`;
- `docs/implementation/contributions/MR-CONTRIB-WP00-009.md`;
- `docs/implementation/contributions/MR-CONTRIB-WP01-003.md`;
- `docs/implementation/decisions.md`;
- `docs/implementation/development-roadmap.md`;
- `docs/implementation/development-status.md`;
- `docs/implementation/open-issues.md`;
- `docs/implementation/roadmap.md`;
- `docs/implementation/specs/01-toolchain-and-repository.md`;
- `docs/implementation/status.md`;
- `docs/implementation/step-acceptance-log.md`;
- `docs/implementation/work-orders/MR-WO-WP00-008.md`;
- `docs/implementation/work-orders/MR-WO-WP00-009.md`;
- `docs/implementation/work-orders/MR-WO-WP01-003.md`;
- `package.json`;
- `tests/unit/MR-WP-00/foundation.test.ts`.

No other source, test, package, configuration, content, asset, or public path
is owned.

## Requirements and authority

Leonardo approved `MR-IMP-DEC-308` and resolved `MR-IMP-OPEN-019` on
2026-09-04. Frozen S01 now requires Node `24.20.0` and npm `12.0.2`.
Requirements are `MR-REQ-TECH-001` and `MR-REQ-TEST-001`. Frozen
`MR-IF-001 v1`, `MR-IF-002 v4`, `MR-IF-014 v1`, and `MR-IF-015 v1` remain
unchanged.

Historical npm `11.19.0` checks remain evidence. No dependency version,
script, lockfile graph, runtime interface, or visible rule can change.

## Tasks

1. Record the S01 amendment and supersede `MR-WO-WP00-008`.
2. Change only `packageManager` and its exact foundation-test expectation.
3. Confirm the installed Node and npm versions and unchanged lockfile graph.
4. Copy only rules correction `f2babe9`; stop on conflict.
5. Update current work-order, contribution, AI-use, roadmap, status, and
   acceptance records without rewriting historical evidence.
6. Run focused foundation, rules, and diagnostic tests, `npm run check`,
   coverage, build, offline audit, and approved `npm run verify`.
7. Check scope, privacy, network, telemetry, package, configuration,
   production, whitespace, ancestry, clean state, absent remote, and closed
   port `5173`.
8. Commit with `MR-WP-00 Record Step-4 route and npm correction`.
9. Give the latest complete packet to one fresh OpenAI `gpt-5.6-sol`
   reviewer using `xhigh` reasoning. It must report all findings together.

## Local test method

Use the existing private loopback-only `?diagnostic=campaign-state` page only
through automated `npm run verify`. It must expose only the approved safe
summary. No manual server is authorized.

## Exclusions

No package installation, dependency update, command algorithm, content,
Three.js, asset, save, manual server, remote, Step 5, Career Center, portfolio,
publication, deployment, integration, or acceptance.

## Impact analysis

The npm field and its exact foundation test change from `11.19.0` to `12.0.2`.
The installed tool already passed Step-4 rules checks. The rules correction
changes only its two approved paths. The lockfile graph and all runtime code,
dependencies, interfaces, game rules, normal page, and diagnostic projection
remain unchanged.

## Delegation table

| Task                                     | Role                                 | Owned paths                          | Dependency                    | Provider and model              | Effort    | Order                      |
| ---------------------------------------- | ------------------------------------ | ------------------------------------ | ----------------------------- | ------------------------------- | --------- | -------------------------- |
| Route correction                         | Controlled implementation worker     | Two submitted `MR-WO-WP01-003` paths | Frozen `MR-IF-002 v4`         | OpenAI `gpt-5.6-sol`            | `high`    | Complete before this order |
| Authority, npm metadata, copy, and audit | Primary Codex agent                  | Paths listed above                   | Leonardo's approved amendment | OpenAI; exact model unavailable | `unknown` | Current                    |
| Complete final review                    | Fresh read-only independent reviewer | No write path                        | Complete combined audit       | OpenAI `gpt-5.6-sol`            | `xhigh`   | Last                       |

The primary agent retains the small mechanical npm change because a new
worker would not improve it. The earlier controlled rules worker remains the
only implementation worker. The reviewer cannot modify state or delegate.

## Submission

Authority commit `71a20a38bba0d3f99fe7263cc6e36e57ea1b073d` approved npm
`12.0.2`. Rules correction `f2babe975073fb3c4d5dc09d703aed225c9fd005`
was copied without conflict as `1b3d6d545154cba548e8f4f3616021e027e2b811`.
Only `package.json` and its exact foundation-test expectation changed for the
npm implementation. The lockfile graph and dependency pins are unchanged.

Primary validation passed 127 focused and 234 complete tests, 90.31 percent
statement coverage, 89.95 percent branch coverage, 85.91 percent function
coverage, 92.11 percent line coverage, a 115-module build, zero offline audit
vulnerabilities, and all 21 Chromium, Firefox, and WebKit flows. Exact copy,
scope, privacy, network, telemetry, production, package, configuration,
whitespace, clean-port, and absent-remote checks passed. The final record
commit is the commit that contains this submission. Fresh Sol `xhigh` review
is next. No integration, Leonardo test, acceptance, or Step-5 work occurred.
