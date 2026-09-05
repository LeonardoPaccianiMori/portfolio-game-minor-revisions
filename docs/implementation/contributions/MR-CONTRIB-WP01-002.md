---
id: MR-CONTRIB-WP01-002
type: implementation-contribution
status: submitted
work_order: MR-WO-WP01-002
work_package: MR-WP-01
created: 2026-09-02
updated: 2026-09-03
base_commit: 94b12f38b36ef7acf4bd6fcc4bd344db6cd39454
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
---

# MR-CONTRIB-WP01-002 — Step-4 campaign-state correction

## Scope and result

The controlled worker audited the preserved nine-path patch and submitted the
approved `MR-IF-002 v3` campaign-state correction. It fixes initial state,
global history sequence, sparse lifecycle records, closed experiment bands,
internal invariants, canonical record ordering, command and effect data shapes,
and semantic tests. It also rejects run `2` for
`MR-FB-EXP-RANGE-REPAIR` and validates the exact final-choice, route,
ending-module-family, and final-presentation prerequisites. No command
algorithm, diagnostic, integration, or acceptance is included.

## Changed files

- `src/rules/campaign-state-codec.ts`
- `src/rules/campaign-state-schema.ts`
- `src/rules/campaign-state-types.ts`
- `src/rules/campaign-state.ts`
- `src/rules/command-contract.ts`
- `src/rules/index.ts`
- `tests/unit/MR-WP-01/campaign-state-codec.test.ts`
- `tests/unit/MR-WP-01/campaign-state.test.ts`
- `tests/unit/MR-WP-01/command-contract.test.ts`

## Authority

Work order: `MR-WO-WP01-002`. Requirements: `MR-REQ-EXP-001`,
`MR-REQ-TECH-001`, and `MR-REQ-TEST-001`. Interfaces: frozen `MR-IF-002 v3`,
the data-shape subset of frozen `MR-IF-003 v1`, and the canonical completion
data subset of frozen `MR-IF-007 v1`. This is Step-4 unit and data-shape
evidence. It is not an S12 fixture or complete acceptance row.

## Worker commits

- `e602613fab5c2a514f19bc59d37bd9ce424a9137` —
  `MR-WP-01 Correct campaign-state foundation`.
- Exact diagnostic-branch copy: `87f6924`.
- `c2a52418388c61a9d1f22a580fde25f6e9e93732` —
  `MR-WP-01 Correct final-review findings`.
- Exact diagnostic-branch copy: `b46cca3`.
- `53f34b8a929a6485665d3697f82b53096107843a` —
  `MR-WP-01 Prove duplicate-member rejection`.
- Exact diagnostic-branch copy: `62ac3ea`.

## Integrated commits

Not yet available. Neither worker commit is on local `main`.

## Commands and results

Focused tests passed 51 tests. Final `npm run check` passed type checking,
lint, formatting, and 162 unit tests. Coverage passed with 92.03 percent
statements, 90.47 percent branches, 84.08 percent functions, and 94.02 percent
lines. The production build passed with 16 modules. `npm audit
--audit-level=high` passed with zero vulnerabilities after an initial sandbox
DNS failure. Exact `npm run verify` passed 162 unit tests, coverage, the build,
and 15 Chromium, Firefox, and WebKit flows after Leonardo approved its temporary
loopback-only server. Port `5173` was closed afterward.

The first focused test attempt failed because the sandbox blocked a temporary
Vitest cache write. One intermediate type check found an owned schema indexing
error. The worker corrected it before final checks. Scope, privacy, network,
telemetry, production source-map, package, configuration, whitespace, clean
state, and absent-remote checks passed. Primary server-free verification
repeated 162 tests, the same coverage, and the 16-module build.

The final-review correction passed 72 focused tests and 190 complete unit
tests. Coverage passed with 93.78 percent lines and 90.66 percent branches. The
16-module build and zero-vulnerability audit passed. Primary checks repeated
190 tests, the same coverage, and the build. Exact scope, package,
configuration, privacy, network, whitespace, clean-state, and absent-remote
checks passed.

The later one-file test-evidence correction passed seven focused codec tests,
190 complete worker tests, and 193 combined tests. Formatting, type, lint,
whitespace, scope, package, configuration, privacy, clean-state, and
absent-remote checks passed. No runtime file changed, so no new build, audit,
coverage, or browser check was required.

## Independent review

The fresh OpenAI `gpt-5.6-sol` reviewer using `xhigh` reasoning found no
blocker and six required issues in packet `01df275`: content-version grammar,
duplicate JSON members, experiment agreement, PIIM and late-route
prerequisites, exact initial-state proof, and date provenance. All technical
findings are corrected in `c2a5241`. The next fresh Sol `xhigh` re-review found
no blocker and one required test-evidence issue: the duplicate-member inputs
were independently invalid. The isolated proof is corrected in `53f34b8`.
Another fresh Sol `xhigh` re-review is pending.

## Corrections

The worker removed the invalid fallback combined-template repeat exception and
added its direct negative test. It also completed the exact final-choice,
declined-route, conclusion-phase, ending-module-family, paper, fatigue, closing,
recap, and completion cases. The later correction adds strict safe-integer
content versions, duplicate-member rejection, derived preparation bands,
ordered monitoring periods, exact PIIM mapping, late route and conclusion
prerequisites, and an exact initial fixture proof. No review finding was
silently removed or downgraded. The later test-only correction now derives each
duplicate-member case from a valid serialized campaign and proves that ordinary
last-member parsing would otherwise leave it valid.

## Known limitations

- A later approved step owns command execution and the ending resolver.
- S06 and the application own authored-content existence and profile checks.
- A later transition-pair check owns comparison of permanent facts between two
  otherwise valid campaign states.
- No persistence implementation, S12 fixture, integration, Leonardo test, or
  Step-4 acceptance exists.

## Leonardo decision

Leonardo approved the correction plan, exact work order, Sol `high` worker,
and the narrow automatic Playwright-server exception. He has not tested or
accepted Step 4.

The later complete review confirmed the duplicate-member evidence and found
that frozen `MR-IF-002 v3` could not represent every route and PIIM
prerequisite. Leonardo approved frozen `MR-IF-002 v4` and superseding
`MR-WO-WP01-003`. This contribution remains historical evidence; it is not the
current submission.
