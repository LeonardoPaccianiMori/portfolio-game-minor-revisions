---
id: MR-WO-WP00-008
type: implementation-work-order
status: approved
work_package: MR-WP-00
sequence: 8
created: 2026-09-03
updated: 2026-09-03
base_commit: 09dbbe88b5857a2210fd730ed6b27ee848f30bbc
provider: OpenAI
model: unknown
reasoning_level: unknown
model_selected: 2026-09-03
branch: work/MR-WP-00-campaign-state-diagnostic
worktree: .worktrees/MR-WP-00-campaign-state-diagnostic/
supersedes: MR-WO-WP00-007
---

# MR-WO-WP00-008 — Record exact Step-4 prerequisite correction

## Objective

After `MR-WO-WP01-003` is submitted and verified, copy its exact commit into
the preserved diagnostic branch, update the approved diagnostic and current
records, and produce complete combined evidence.

## Owned paths

- the exact verified `MR-WO-WP01-003` commit;
- `AGENTS.md`;
- `README.md`;
- `docs/00-design-index.md`;
- `docs/15-implementation-contract.md`;
- `docs/implementation/ai-use-log.md`;
- `docs/implementation/contributions/MR-CONTRIB-WP00-007.md`;
- `docs/implementation/contributions/MR-CONTRIB-WP00-008.md`;
- `docs/implementation/contributions/MR-CONTRIB-WP01-002.md`;
- `docs/implementation/contributions/MR-CONTRIB-WP01-003.md`;
- `docs/implementation/development-roadmap.md`;
- `docs/implementation/development-status.md`;
- `docs/implementation/specs/13-agent-work-orders-and-integration.md`;
- `docs/implementation/status.md`;
- `docs/implementation/step-acceptance-log.md`;
- `docs/implementation/work-orders/MR-WO-WP00-007.md`;
- `docs/implementation/work-orders/MR-WO-WP00-008.md`;
- `docs/implementation/work-orders/MR-WO-WP01-002.md`;
- `docs/implementation/work-orders/MR-WO-WP01-003.md`;
- `src/bootstrap/campaign-state-diagnostic.ts`;
- `src/bootstrap/index.ts`;
- `src/bootstrap/main.ts`;
- `src/bootstrap/startup.css`;
- `tests/e2e/MR-WP-00/campaign-state-diagnostic.spec.ts`;
- `tests/unit/MR-WP-00/architecture.test.ts`;
- `tests/unit/MR-WP-00/campaign-state-diagnostic.test.ts`;
- `tests/unit/MR-WP-00/foundation.test.ts`.

No other runtime, rules beyond the exact copied commit, test, package,
configuration, asset, or content path is owned.

## Allowed sources

- `docs/15-implementation-contract.md`;
- `docs/implementation/interfaces.md`;
- S03–S07, S12, and S13;
- `docs/implementation/step-acceptance-log.md`;
- `MR-WO-WP01-003` and this order;
- the public exports in `src/rules/index.ts`; and
- `package.json`.

## Authority and sequence

Frozen `MR-IF-002 v4`, `MR-IF-001 v1`, `MR-IF-014 v1`, and `MR-IF-015 v1`
apply. This order remains waiting until the rules commit passes the primary
audit. Requirements are `MR-REQ-TECH-001` and `MR-REQ-TEST-001`. It does not
authorize main integration.

## Tasks and checks

Copy only the verified rules correction, adjust the private projection only if
the public rules shape requires it, preserve the exact safe query and fields,
run focused rules and diagnostic tests, all package checks, coverage, build,
audit, the approved `npm run verify`, full browser flows, and all scope,
privacy, network, telemetry, production, configuration, whitespace,
clean-state, and absent-remote checks. Confirm that port 5173 is closed after
verification. Commit with `MR-WP-00 Record Step-4 prerequisite correction`.

The private local test method is the existing loopback-only
`?diagnostic=campaign-state` page. It must show only the approved Standard and
Supported summary fields, a stable valid result, and no raw state. The normal
Step-3 page must remain unchanged. `npm run verify` can operate its automatic
loopback server; no manual server is authorized.

## Exclusions

No normal-page change, gameplay, command algorithm, save, content, Three.js,
asset, dependency, remote, Step 5, Career Center, portfolio, publication,
deployment, manual server, integration, or acceptance.

## Handoff

Record the exact copied and diagnostic commits, files, checks, correction
coverage, limitations, completed primary audit, and AI-use evidence. One fresh
OpenAI `gpt-5.6-sol` reviewer using `xhigh` reasoning follows and must report
all findings together.

## Impact analysis

The copied rules commit changes the frozen `MR-IF-002 v4` state shape. The
diagnostic projection can change only where compilation or its approved safe
summary needs the new public shape. No persistence migration exists. The
normal application page, packages, configuration, content, assets, and visible
game rules remain unchanged.

## Delegation table

| Task                              | Role                                 | Owned paths                                     | Dependency                      | Provider and model              | Effort    | Order             |
| --------------------------------- | ------------------------------------ | ----------------------------------------------- | ------------------------------- | ------------------------------- | --------- | ----------------- |
| Rules correction                  | Controlled implementation worker     | Nine paths in `MR-WO-WP01-003`                  | Frozen `MR-IF-002 v4`           | OpenAI `gpt-5.6-sol`            | `high`    | Before this order |
| Diagnostic copy and primary audit | Primary Codex agent                  | Paths listed in this order                      | Verified rules commit           | OpenAI; exact model unavailable | `unknown` | After rules       |
| Complete final review             | Fresh read-only independent reviewer | No write path; latest packet and audit are read | Complete combined primary audit | OpenAI `gpt-5.6-sol`            | `xhigh`   | Last              |
