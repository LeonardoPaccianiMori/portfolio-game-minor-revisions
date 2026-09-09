# Step 6 fixture foundation plan

Date: 2026-09-09. State: corrected candidate. Preparation base: `69cef2e`. Leonardo approved bounded preparation and correction of the reference-trace count from 12 to 13 on 2026-09-09. This plan does not authorize implementation.

## Purpose

Step 6 adds the test-only fixture foundation from S12 and Gate 6A. It separates three facts:

1. expected data exists and passes the strict fixture schema;
2. a current public operation executed that data; and
3. a later campaign journey completed.

Step 6 can prove the first fact for all present files and the second fact only for accepted S02, S03, S06, and S12 operations. It cannot prove the third fact.

## Preparation result

The companion [fixture contract](../analysis/step-06-fixture-contract.md) now defines:

- exact fixture, manifest, registry, resource, result, issue, binding, pending-work, setup, case, and matrix shapes;
- campaign schema `2`, content envelope schema `1`, content version `1.1.0`, and the complete `slice` profile;
- 13 preserved schedule traces, 26 preserved semantic source cases, 144 laser rows, and their later execution targets;
- 103 executable fixture wrappers, 48 reference-only wrappers, and all deferred group and setup routes;
- explicit deferred campaign replacement, S03 transition comparison, S04/S05 rules, migration, fallback, full, release, and journeys;
- the corrected C01 economy authority and exact 45-row phase map;
- a check-safe four-order implementation sequence; and
- the exact authority and ownership impact.

These are planned counts. Actual evidence records only measured implementation results.

## Approved preparation paths

Preparation changes only:

```text
docs/implementation/analysis/step-06-fixture-contract.md
docs/implementation/plans/step-06-fixture-foundation.md
docs/implementation/ai-use-log.md
docs/implementation/development-status.md
docs/implementation/open-issues.md
docs/implementation/status.md
docs/implementation/step-acceptance-log.md
```

No code, test, content, frozen authority, dependency, asset, Three.js, persistence, deployment, licence, visibility, or Career Center file changes during preparation.

## Proposed authority amendment after approval

The implementation-approval commit will change exactly:

```text
docs/07-systems-and-balance.md
docs/13-testing-and-evaluation.md
docs/15-implementation-contract.md
docs/implementation/ai-use-log.md
docs/implementation/decisions.md
docs/implementation/development-roadmap.md
docs/implementation/development-status.md
docs/implementation/interfaces.md
docs/implementation/open-issues.md
docs/implementation/specs/12-test-vectors-and-acceptance.md
docs/implementation/specs/13-agent-work-orders-and-integration.md
docs/implementation/status.md
docs/implementation/step-acceptance-log.md
```

It will add `MR-IMP-DEC-311`, freeze `MR-IF-015 v2`, correct the Design 7 count, reconcile Design 13 and `MR-S12-ACC-010` with C01, add the exact phase-aware S12/S13 rules, and resolve `MR-IMP-OPEN-022`. It will not change `MR-IF-001` through `MR-IF-014`.

## Candidate implementation paths

WP09 shared utility phase:

```text
tests/support/MR-WP-09/fixture-json.ts
tests/support/MR-WP-09/fixture-loader.ts
tests/support/MR-WP-09/fixture-schema.ts
tests/support/MR-WP-09/fixture-types.ts
tests/unit/MR-WP-09/fixture-contract.test.ts
```

WP00 S02 phase:

```text
tests/fixtures/s02/MR-S02-FIX-001-C001.fixture.json
tests/fixtures/s02/MR-S02-FIX-002-C001.fixture.json
tests/fixtures/s02/MR-S02-FIX-003-C001.fixture.json
tests/fixtures/s02/MR-S02-FIX-004-C001.fixture.json
tests/fixtures/s02/MR-S02-FIX-005-C001.fixture.json
tests/fixtures/s02/MR-S02-FIX-006-C001.fixture.json
tests/fixtures/s02/MR-S02-FIX-007-C001.fixture.json
tests/fixtures/s02/MR-S02-FIX-009-C001.fixture.json
tests/fixtures/s02/MR-S02-FIX-010-C001.fixture.json
tests/support/MR-WP-00/s02-fixture-runner.ts
tests/unit/MR-WP-00/s02-fixture-evidence.test.ts
```

WP01 data phase uses the exact gap-free case ranges in contract section 8:

```text
tests/fixtures/resources/campaign-reference-traces.json
tests/fixtures/resources/campaign-slice-standard.json
tests/fixtures/resources/campaign-slice-supported.json
tests/fixtures/resources/semantic-cases.json
tests/fixtures/resources/slice-laser-outcomes.json
tests/fixtures/s03/*.fixture.json
tests/fixtures/s06/*.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C001.fixture.json through C013
tests/fixtures/s12/MR-S12-SEM-001-C001.fixture.json through C035
tests/support/MR-WP-01/s03-s06-fixture-runner.ts
tests/unit/MR-WP-01/rules-content-fixture-evidence.test.ts
```

The literal S03 list has 22 files. The literal S06 list has 49 files. The work order expands every range to a sorted file list before activation. Wildcards do not enter its final `Owned paths` section.

WP09 activation phase:

```text
tests/fixtures/acceptance-matrix.json
tests/fixtures/manifest.json
tests/fixtures/s12/MR-S12-DOC-001-C001.fixture.json
tests/fixtures/s12/MR-S12-EVD-001-C001.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C001.fixture.json through C021
tests/support/MR-WP-09/document-audit.ts
tests/support/MR-WP-09/traceability.ts
tests/unit/MR-WP-09/document-audit.test.ts
tests/unit/MR-WP-09/foundation-evidence.test.ts
tests/unit/MR-WP-09/traceability.test.ts
tests/unit/MR-WP-09/evidence-record.test.ts
```

The complete S12 wrapper list has 71 files: `MR-S12-FMT-001-C001`–`C021`, `MR-S12-DOC-001-C001`, `MR-S12-EVD-001-C001`, `MR-S12-ECO-001-C001`–`C013`, and `MR-S12-SEM-001-C001`–`C035`. WP01 owns the 48 `ECO` and `SEM` files. Final WP09 owns the 23 `FMT`, `DOC`, and `EVD` files. Both work orders expand their ranges to literal paths.

After actual execution, the primary owns:

```text
docs/evidence/step-06-foundation.md
docs/implementation/contributions/MR-CONTRIB-WP00-010.md
docs/implementation/contributions/MR-CONTRIB-WP01-005.md
docs/implementation/contributions/MR-CONTRIB-WP09-001.md
docs/implementation/contributions/MR-CONTRIB-WP09-002.md
```

It also owns current control updates. These files record real work only after it occurs.

## Work orders and activation sequence

The four proposed orders are:

| Order            | Model                      | Exact ownership                                                                                                       | Dependency                                   |
| ---------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `MR-WO-WP09-001` | OpenAI `gpt-5.6-sol`, high | shared types, JSON decoder, schema, loader, temporary-set self-tests                                                  | frozen authority commit                      |
| `MR-WO-WP00-010` | same controlled worker     | nine executable S02 files, S02 runner, S02 evidence test                                                              | verified and integrated WP09 utilities       |
| `MR-WO-WP01-005` | same controlled worker     | 22 S03 files, 49 S06 files, 48 reference-only S12 files, five resources, source-packet mapping, runner, evidence test | verified WP09 utility and accepted Steps 4–5 |
| `MR-WO-WP09-002` | same controlled worker     | root manifest, matrix, 23 WP09-owned S12 files, traceability/document/evidence-shape audits, four tests               | every WP00/WP01 fixture file present         |

Each order has its own branch and worktree from contract section 12. The primary creates each order only after the prior submission is verified and integrated. The order's `base_commit` is the observed 40-character main hash before its separate authorization commit. The worker reads the order with `git show` from that authorization commit. This follows S13 and avoids a self-referential hash.

The first WP09 phase does not create a repository manifest or global file scan. WP00 and WP01 can therefore add their owned files and pass their full required checks. The last WP09 phase activates the complete manifest only after every present package file exists. No intermediate phase needs a skip, false deferred date, relaxed validator, or cross-owner manifest edit.

The worker is not alone in the repository. It must preserve other changes. It cannot change documentation, runtime source, root content, configuration, dependencies, lockfile, assets, network, remote, or another order's paths.

## Fixture source packet

The fixed packet is:

- S02, S03, S06, S12, S13, and frozen `MR-IF-001`, `MR-IF-002`, `MR-IF-006`, `MR-IF-015 v2`;
- accepted WP00 and WP01 source and tests from Steps 2–5;
- all 23 current `content/` JSON files as one literal source packet;
- `docs/implementation/analysis/campaign-schedules.json` and its README;
- `docs/implementation/analysis/semantic-cases.json`; and
- the accepted Step 5 laser, claim, and Careful-only rehearsal contract.

A worker cannot change expected meaning to make code pass. An unavailable operation keeps its route deferred.

## Validation

Preparation checks:

- verify 13 traces, 26 source semantic cases, 144 laser rows, 97 slice items, 213 strings, and 45 matrix rows;
- verify 103 executable and 48 reference-only planned wrappers;
- compare every current operation with the public source and accepted tests;
- validate complete examples for valid, rejected, reference-only, deferred, raw-text, raw-byte, special-value, opaque-result, and pending-operation cases;
- verify exact owner, path, source, target, and matrix phase state;
- run `npm run format:check` and `git diff --check`;
- inspect the full diff for unsupported facts, private data, and unrelated changes; and
- obtain a fresh high-level review with no unresolved blocker or required finding.

Each implementation package later runs focused tests, typecheck, lint, format, all unit tests, and whitespace checks. WP01 also runs coverage, content check, and slice build. Final WP09 activation and main run `npm run check` and `npm run verify`. The primary then creates the actual evidence document and runs `node --experimental-strip-types tests/support/MR-WP-09/document-audit.ts --evidence docs/evidence/step-06-foundation.md` before technical completion. No required test can be skipped or retried automatically.

## Commit boundaries

Preparation commit:

`Prepare Step 6 fixture contracts and implementation plan`

Later commits after separate approval:

1. `Approve Step 6 fixture foundation`
2. one authorization commit for each exact work order;
3. `MR-WP-09 Add Step 6 fixture utilities`
4. `MR-WP-00 Add Step 6 application fixtures`
5. `MR-WP-01 Add Step 6 rules and content fixtures`
6. `MR-WP-09 Complete Step 6 fixture manifest`
7. `Record Step 6 technical completion`
8. `Accept Step 6 fixture foundation`

## Approval boundary

Leonardo approved this preparation and the 13-trace correction. The corrected candidate returns for one concrete amendment and implementation decision. No Step 6 code, frozen amendment, test result, technical completion, acceptance, Step 7 work, or public action is authorized by preparation.
