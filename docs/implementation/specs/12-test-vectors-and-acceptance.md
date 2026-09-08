# Test Vectors and Acceptance Matrix

Status: **C01–C06 approved on 2026-09-06; current authority is the correction sections below and the interface register. Earlier B/R/S lifecycle records are historical. Runtime evidence remains step-specific.**

## Purpose and authority

This specification fixes the future machine-readable fixture format, case
identity, traceability, automated and manual evidence classes, coverage
boundary, cross-module journeys, and acceptance matrix for _Minor Revisions_.
It implements the evidence requirements in `13-testing-and-evaluation.md` and
`15-implementation-contract.md` without creating a test, build, result, or
measured fact.

The numbered design documents remain authoritative for player-visible meaning.
S03 through S11 remain authoritative for state, rules, scheduling, content,
persistence, world, input, UI, rendering, resources, browser support,
performance, and diagnostics. A fixture cannot change one of those contracts.

This document specifies future paths under `tests/`, but it does not create
them. No package, source, test, production asset, licence, remote, release, or
deployment is authorized.

## Terms

- A **fixture** is one fixed test example with starting data, an action, and an
  exact expected result.
- A **setup** is one named environment that can contain several independently
  reported cases.
- A **case** is the smallest pass-or-fail item.
- A **shared resource** is registered starting data that several fixtures can
  use without copying it.
- A **static audit** checks repository files without running the game.
- A **manual review** records a person's direct judgment.
- A **manual measurement** records a result from the approved device, browser,
  build, and method.
- An **acceptance row** is one atomic condition that can clearly pass or fail.
- **Traceability** is the checked link from authority to evidence and back.

No fixture or test result exists yet. Every current case is specified only.

## `MR-IF-015` fixture and traceability boundary

`MR-IF-015` is candidate `v1`. Its future owner is `MR-WP-09 Quality and
release preparation`. Every module, work package, reviewer, and test suite is a
consumer.

The boundary owns:

- strict UTF-8 JSON fixture files;
- stable group, setup, case, resource, and acceptance IDs;
- the fixture manifest and acceptance matrix;
- shared-resource and controlled-change rules;
- evidence classification;
- requirement, test, interface, content, and specification links;
- exact expected-result and unchanged-data comparisons; and
- separation of expected fixtures from later results.

It is a test boundary only. It cannot enter the playable runtime or production
bundle. Invalid structure, missing traceability, an unsafe path, or a broken
reference fails fixture validation.

## Planned future paths

The following paths are contracts. S12 does not create them.

```text
tests/
├── fixtures/
│   ├── manifest.json
│   ├── acceptance-matrix.json
│   ├── resources/
│   ├── s02/
│   ├── s03/
│   ├── s04/
│   ├── s05/
│   ├── s06/
│   ├── s07/
│   ├── s08/
│   ├── s09/
│   ├── s10/
│   ├── s11/
│   └── s12/
├── unit/
└── e2e/
```

Every fixture file ends in `.fixture.json`. Files contain data only. They
cannot contain JavaScript, TypeScript, executable expressions, comments,
functions, environment substitutions, or hidden defaults. Special invalid
numbers use closed test-only labels that the relevant test harness converts;
they are never accepted as game data.

All project-owned inputs and outputs remain below
`/home/lpm/Desktop/minor-revisions`. A fixture cannot use an absolute path, an
outside path, a symbolic link, Career Center, the portfolio repository, or
another local project.

## Common fixture envelope

Every fixture contains exactly these top-level sections:

| Section        | Required facts                                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `identity`     | Fixture schema version, group ID, setup ID or `null`, case ID, and short title                                                                |
| `execution`    | One evidence type and its approved runner or manual procedure class                                                                           |
| `traceability` | Requirement, top-level test, interface, specification, acceptance, content-ID, and text-key links, with explicit empty lists where none apply |
| `arrange`      | Complete starting data or one registered shared-resource reference plus controlled changes                                                    |
| `act`          | One ordered list of automated steps or one numbered manual procedure                                                                          |
| `expect`       | Exact result, state changes, calls, faults or rejections, and protected facts that remain unchanged                                           |

Unknown or missing fields fail. The future schema version starts at `1`.
Fixture validation returns no partially accepted fixture.

### Identity and file organization

Group IDs remain the approved `MR-Sxx-*` IDs. A case ID uses:

`<group-id>-C<three digits>`

A setup ID uses:

`<group-id>-S<two digits>`

Examples are `MR-S04-CMD-001-C001` and `MR-S11-CMP-001-S01`. A setup can have
several cases, but every case has one independent result. IDs are never reused
after removal. Deliberately unused numbers remain permanent gaps.

Files are grouped by owning block and fixture group. The root manifest lists
every group, setup, case, shared resource, and file. It also records exact
required setup counts. Duplicate IDs, missing files, unlisted files, incorrect
counts, outside paths, or broken references fail validation.

## Shared resources and controlled changes

Common starting data can be stored once as a registered shared resource. A
fixture can reference one resource and apply only these closed changes:

- `add` one value at one exact JSON path;
- `remove` one value at one exact JSON path; or
- `replace` one value at one exact JSON path.

Resource references cannot form a chain or circle. Before execution, the test
runner creates and validates one complete starting object. A rejection fixture
that must alter one fact declares exactly one change unless the specification
requires an explicit transition pair or a priority case with several invalid
conditions.

## Ordered action language

An automated `act` list uses numbered steps from this closed set:

- submit one approved game command;
- call one approved interface operation;
- provide one configured fake success or failure;
- send one browser or device event;
- send one semantic player action;
- advance one frame by an exact value; or
- complete one pending fake operation.

Fixtures cannot use real waiting, uncontrolled randomness, network access,
screen coordinates, fragile page selectors, device time, or wall-clock time.
Browser cases use semantic roles, stable control names, or approved test IDs.
Manual cases use a numbered procedure and cannot claim an automated result.

## Expected results and comparison

Exact equality is the default for states, results, effects, calls, histories,
canonical JSON, file contents, records, and ordered lists. A rejection or fault
compares complete before-and-after data when the contract requires unchanged
state.

A numeric tolerance is allowed only where an approved specification requires
one. S08 permits `0.001 m` only for edges that must meet. Wildcards,
automatically updated snapshots, image snapshots, and screenshots cannot
replace exact acceptance. A screenshot can support a failed browser report; it
cannot prove that a case passed.

## Evidence classes

Every case has exactly one primary evidence type:

| Evidence type       | Meaning                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| `unit`              | Pure rules or data checks with controlled test substitutes                    |
| `browser`           | Local Playwright interaction with real browser features                       |
| `staticAudit`       | File, dependency, content, build, or document inspection                      |
| `manualReview`      | Leonardo's or the assigned Codex reviewer's direct private judgment           |
| `manualMeasurement` | A future measured result from the approved build, device, browser, and method |

One acceptance condition can need companion cases of different types. A
browser automation result cannot prove Safari support, direct current-browser
support, real performance, final visual or sound quality, or Leonardo's play
experience.

## Acceptance matrix and traceability

Acceptance IDs use `MR-S12-ACC-<three digits>`. Each row contains one atomic
condition, its source requirement and specification section, linked top-level
test, interface and fixture IDs, slice/fallback/full scope, evidence type,
applicable gate, and evidence state.

The only specification-time evidence states are `specifiedNotRun` and
`measuredLater`. No row can show `pass` before real evidence exists.

Validation checks both directions:

1. every requirement, top-level test obligation, candidate interface,
   required fixture group, and acceptance row has the required fixture or
   manual procedure; and
2. every fixture and manual procedure links to valid authority.

Duplicate links, missing cases, wrong setup counts, orphan fixtures, or an
unsupported acceptance row fail validation.

### Requirement-level acceptance map

The future machine-readable matrix expands each row below into atomic
acceptance IDs. This table is the complete requirement-level route.

| Requirement          | Required evidence route                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `MR-REQ-VISION-001`  | `MR-S12-VIS-001`, `MR-S12-PLAY-001`, `MR-TEST-VISION-001`                                     |
| `MR-REQ-LOOP-001`    | S04 command and economy vectors, S05 calendar journeys, `MR-TEST-EXP-001`, `MR-TEST-NARR-001` |
| `MR-REQ-EXP-001`     | S04 experiment vectors, S06 profile checks, slice/fallback journeys, `MR-TEST-EXP-001`        |
| `MR-REQ-EXP-002`     | S04 preparation, variation, evidence-quality, repeat, and no-redraw vectors                   |
| `MR-REQ-EXP-003`     | `MR-S12-CAT-001`, `MR-S12-REL-001`, `MR-TEST-CONT-001`                                        |
| `MR-REQ-NARR-001`    | S05 calendar, gate, scene, ending, and complete-journey groups                                |
| `MR-REQ-NARR-002`    | S05 message, room, skip, recovery, and fault groups plus S07 save evidence                    |
| `MR-REQ-CHAR-001`    | S04 relationship and route vectors, S05 message and gate cases, S06 catalogue audit           |
| `MR-REQ-WORLD-001`   | all nine S08 groups, `MR-S12-CAT-001`, `MR-S12-EVL-001`                                       |
| `MR-REQ-END-001`     | S04 ending vectors and S05 late-route and ending journeys                                     |
| `MR-REQ-END-002`     | S07 completion cases and fallback/full completion journeys                                    |
| `MR-REQ-ART-001`     | S10 rendering/resource groups and `MR-S12-REL-001`                                            |
| `MR-REQ-AUDIO-001`   | S10 scene/resource groups and S09 accessibility cases                                         |
| `MR-REQ-UI-001`      | all S09 UI, error, lifecycle, responsive, and journey groups                                  |
| `MR-REQ-A11Y-001`    | `MR-S09-A11Y-001`, responsive cases, device journeys, and manual assistive-reading review     |
| `MR-REQ-SAVE-001`    | all six S07 groups and connected recovery journeys                                            |
| `MR-REQ-TECH-001`    | S02–S11 interface fixtures, `MR-S12-FMT-001`, and `MR-S12-DOC-001`                            |
| `MR-REQ-PERF-001`    | `MR-S11-PERF-001` calculations and later S11 manual measurements                              |
| `MR-REQ-CONTENT-001` | all S06 validation groups and `MR-S12-CAT-001`                                                |
| `MR-REQ-CONTENT-002` | S06 full/fallback/slice groups, catalogue audit, and profile journeys                         |
| `MR-REQ-TEST-001`    | all S02–S12 groups, coverage evidence, browser evidence, and manual procedures                |
| `MR-REQ-RELEASE-001` | `MR-S12-REL-001` only after the actual release inputs exist                                   |

Every content object also links to at least one applicable requirement and
top-level test. S06 and `MR-S12-CAT-001` enforce that rule.

### Stable acceptance-row inventory

Each row below has one clear pass condition. The future machine-readable
matrix copies these IDs and adds the exact specification links and case list.
Every current row is `specifiedNotRun`, except a manual measurement row that
is `measuredLater`.

| Acceptance ID    | Pass condition                                                                                                                                                                                                  | Source requirements                                                                                                                                                                                                                     | Top-level tests                                                                                                                                                                                          | Interfaces                                                                                                                                                                                        | Primary evidence and type                                                                                   | Scope and gate                                   | Evidence state    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------- |
| `MR-S12-ACC-001` | Every fixture and manifest file passes the strict format, identity, path, and registration contract.                                                                                                            | `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-TECH-001`                                                                                                                                                                                       | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | `MR-S12-FMT-001`; unit and static audit                                                                     | All builds; every automated gate                 | `specifiedNotRun` |
| `MR-S12-ACC-002` | Every requirement, test, interface, content object, fixture, and acceptance row has valid two-way traceability.                                                                                                 | `MR-REQ-TECH-001`, `MR-REQ-CONTENT-001`, `MR-REQ-TEST-001`                                                                                                                                                                              | `MR-TEST-TECH-001`, `MR-TEST-CONT-001`                                                                                                                                                                   | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | Manifest and acceptance-matrix audit                                                                        | All builds; every gate                           | `specifiedNotRun` |
| `MR-S12-ACC-003` | All ten S02 startup, queue, frame, replacement, failure, shutdown, and import scenarios return their exact ordered result.                                                                                      | `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-TECH-001`                                                                                                                                                                                       | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | `MR-S02-FIX-001`–`010`; unit and static audit                                                               | Cross-cutting; Gate 2 onward                     | `specifiedNotRun` |
| `MR-S12-ACC-004` | Standard and Supported initial campaigns and canonical round trips match S03 exactly.                                                                                                                           | `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-TECH-001`                                                                                                                                                                                       | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | `MR-S03-FIX-001`; unit                                                                                      | Full and slice start; Gate 2 onward              | `specifiedNotRun` |
| `MR-S12-ACC-005` | Every S03 structural, identity, reference, invariant, and history-regression case returns the first exact safe reason and no partial state.                                                                     | `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-TECH-001`                                                                                                                                                                                       | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | S03 rejection, invariant, and transition groups; unit                                                       | Cross-cutting; Gate 2 onward                     | `specifiedNotRun` |
| `MR-S12-ACC-006` | Each of the 24 valid commands produces its exact one-revision state and ordered effects without mutating inputs.                                                                                                | `MR-REQ-LOOP-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                 | `MR-TEST-EXP-001`, `MR-TEST-NARR-001`, `MR-TEST-TECH-001`                                                                                                                                                | `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-010`, `MR-IF-015`, `MR-IF-001`, `MR-IF-004`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | `MR-S04-CMD-001`; unit                                                                                      | All applicable profiles; Gate 2 onward           | `specifiedNotRun` |
| `MR-S12-ACC-007` | All 15 rejections, six faults, priority cases, and unchanged-input checks return the exact S04 result.                                                                                                          | `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-TECH-001`                                                                                                                                                                                       | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | `MR-S04-REJ-001`, `MR-S04-FLT-001`; unit                                                                    | Cross-cutting; Gate 2 onward                     | `specifiedNotRun` |
| `MR-S12-ACC-008` | FNV-1a, seed combination, Mulberry32, bucket mapping, Unicode, namespace, retry, reload, and no-redraw vectors match exact saved values.                                                                        | `MR-REQ-EXP-002`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                  | `MR-TEST-EXP-001`, `MR-TEST-TECH-001`                                                                                                                                                                    | `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-010`, `MR-IF-015`, `MR-IF-001`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | S04 `C700–C749`; unit                                                                                       | Cross-cutting; Gate 2 onward                     | `specifiedNotRun` |
| `MR-S12-ACC-009` | Every approved experiment issue, preparation band, monitoring choice, result row, evidence-quality priority, repeat, stop, and support-point rule is reproduced.                                                | `MR-REQ-EXP-001`, `MR-REQ-EXP-002`, `MR-REQ-TEST-001`                                                                                                                                                                                   | `MR-TEST-EXP-001`, `MR-TEST-UI-001`                                                                                                                                                                      | `MR-IF-002`, `MR-IF-003`, `MR-IF-006`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-015`, `MR-IF-004`                                                                                            | S04 `C100–C199`; unit and journey                                                                           | Full, fallback, and slice; Gate 2 onward         | `specifiedNotRun` |
| `MR-S12-ACC-010` | Standard and Supported costs, breaks, surcharges, push-through, crash, and the three economy totals match the approved values.                                                                                  | `MR-REQ-LOOP-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-EXP-001`, `MR-TEST-NARR-001`                                                                                                                                                                    | `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-010`, `MR-IF-015`                                                                                                                                   | S04 `C200–C249`, `MR-S12-ECO-001`; unit                                                                     | Full and fallback; Gate 2 onward                 | `specifiedNotRun` |
| `MR-S12-ACC-011` | Every manuscript requirement, claim, snapshot, confirmation, confidence, integrity, correction, concern, and authorship result matches S04.                                                                     | `MR-REQ-END-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                     | `MR-TEST-END-001`                                                                                                                                                                                        | `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-010`, `MR-IF-011`, `MR-IF-015`                                                                                            | S04 `C300–C399`; unit and browser                                                                           | Fallback after Gate 3; full after Gate 4         | `specifiedNotRun` |
| `MR-S12-ACC-012` | Every PIIM card, band, bucket boundary, withdrawal, visible-support, and saved no-redraw result matches S04.                                                                                                    | `MR-REQ-END-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                     | `MR-TEST-END-001`                                                                                                                                                                                        | `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-010`, `MR-IF-011`, `MR-IF-015`                                                                                            | S04 `C400–C449`; unit                                                                                       | Fallback after Gate 3; full after Gate 4         | `specifiedNotRun` |
| `MR-S12-ACC-013` | Aldercroft, Morrow, final-choice, public-withdrawal, 29-module, relationship-tie, and two-phase finalization cases match S04.                                                                                   | `MR-REQ-NARR-001`, `MR-REQ-CHAR-001`, `MR-REQ-END-001`, `MR-REQ-TEST-001`                                                                                                                                                               | `MR-TEST-NARR-001`, `MR-TEST-CHAR-001`, `MR-TEST-END-001`                                                                                                                                                | `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-006`, `MR-IF-011`, `MR-IF-015`, `MR-IF-008`, `MR-IF-010`, `MR-IF-012`, `MR-IF-004`                                                                  | S04 `C500–C599`; unit and journey                                                                           | Fallback after Gate 3; full after Gate 4         | `specifiedNotRun` |
| `MR-S12-ACC-014` | Calendar labels, inclusive windows, crossed-period order, priority, tie order, settled state, crash, warning, and missed-window cases match S05.                                                                | `MR-REQ-LOOP-001`, `MR-REQ-NARR-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                              | `MR-TEST-EXP-001`, `MR-TEST-NARR-001`, `MR-TEST-TECH-001`                                                                                                                                                | `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-010`, `MR-IF-015`, `MR-IF-006`, `MR-IF-011`, `MR-IF-001`, `MR-IF-004`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | S05 calendar, scheduler, and crossing groups; unit                                                          | Full and fallback; Gate 2 onward                 | `specifiedNotRun` |
| `MR-S12-ACC-015` | Every message, reminder, room state, expiry, mandatory gate, optional gate, and fixed late-gate order resolves once with exact state.                                                                           | `MR-REQ-NARR-001`, `MR-REQ-NARR-002`, `MR-REQ-CHAR-001`, `MR-REQ-END-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                         | `MR-TEST-NARR-001`, `MR-TEST-CHAR-001`, `MR-TEST-END-001`, `MR-TEST-TECH-001`                                                                                                                            | `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-006`, `MR-IF-011`, `MR-IF-015`, `MR-IF-010`, `MR-IF-008`, `MR-IF-012`, `MR-IF-004`, `MR-IF-001`, `MR-IF-007`, `MR-IF-009`, `MR-IF-013`, `MR-IF-014` | S05 message, room, and gate groups; unit and journey                                                        | Fallback after Gate 3; full after Gate 4         | `specifiedNotRun` |
| `MR-S12-ACC-016` | Scene checkpoint, form, start, choice, skip, recap, reload, interruption, restoration, and five-fault routes preserve the exact campaign order.                                                                 | `MR-REQ-NARR-001`, `MR-REQ-NARR-002`, `MR-REQ-CHAR-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                           | `MR-TEST-NARR-001`, `MR-TEST-CHAR-001`, `MR-TEST-TECH-001`                                                                                                                                               | `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-006`, `MR-IF-011`, `MR-IF-015`, `MR-IF-010`, `MR-IF-008`, `MR-IF-012`, `MR-IF-001`, `MR-IF-004`, `MR-IF-007`, `MR-IF-009`, `MR-IF-013`, `MR-IF-014` | S05 scene, skip, recovery, ending, fault, and journey groups; unit and browser                              | Full, fallback, and slice; Gate 2 onward         | `specifiedNotRun` |
| `MR-S12-ACC-017` | The full test package has exact catalogue counts, closure, ordering, views, and deterministic validation.                                                                                                       | `MR-REQ-EXP-003`, `MR-REQ-TECH-001`, `MR-REQ-CONTENT-001`, `MR-REQ-CONTENT-002`, `MR-REQ-TEST-001`                                                                                                                                      | `MR-TEST-CONT-001`, `MR-TEST-TECH-001`                                                                                                                                                                   | `MR-IF-006`, `MR-IF-010`, `MR-IF-015`, `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | `MR-S06-VAL-001`; unit and static audit                                                                     | Full; after Gate 4                               | `specifiedNotRun` |
| `MR-S12-ACC-018` | Fallback and slice packages contain exactly their approved selections, replacements, dependencies, strings, counts, and exclusions.                                                                             | `MR-REQ-EXP-003`, `MR-REQ-TECH-001`, `MR-REQ-CONTENT-001`, `MR-REQ-CONTENT-002`, `MR-REQ-TEST-001`                                                                                                                                      | `MR-TEST-CONT-001`, `MR-TEST-TECH-001`                                                                                                                                                                   | `MR-IF-006`, `MR-IF-010`, `MR-IF-015`, `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | `MR-S06-FBK-001`, `MR-S06-SLC-001`; unit and static audit                                                   | Slice after Gate 2; fallback after Gate 3        | `specifiedNotRun` |
| `MR-S12-ACC-019` | Every invalid content reference, object, string, profile, word boundary, migration, and issue-code case fails in deterministic order without partial content.                                                   | `MR-REQ-TECH-001`, `MR-REQ-CONTENT-001`, `MR-REQ-TEST-001`                                                                                                                                                                              | `MR-TEST-TECH-001`, `MR-TEST-CONT-001`                                                                                                                                                                   | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | S06 rejection, migration, and fault groups; unit                                                            | Cross-cutting; Gate 2 onward                     | `specifiedNotRun` |
| `MR-S12-ACC-020` | First save, rotation, retry, conflict, order, exact round trip, size boundary, and failed write preserve the exact six-store result.                                                                            | `MR-REQ-SAVE-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                 | `MR-TEST-SAVE-001`, `MR-TEST-TECH-001`                                                                                                                                                                   | `MR-IF-002`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-010`, `MR-IF-011`, `MR-IF-015`, `MR-IF-001`, `MR-IF-003`, `MR-IF-008`, `MR-IF-009`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | `MR-S07-SAV-001`; unit and browser                                                                          | Full, fallback, and slice; Gate 2 onward         | `specifiedNotRun` |
| `MR-S12-ACC-021` | Every active/backup status, recovery choice, migration source, direct step, failure, and tab conflict follows the S07 matrix without silent selection.                                                          | `MR-REQ-SAVE-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                 | `MR-TEST-SAVE-001`, `MR-TEST-TECH-001`                                                                                                                                                                   | `MR-IF-002`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-010`, `MR-IF-011`, `MR-IF-015`, `MR-IF-001`, `MR-IF-003`, `MR-IF-008`, `MR-IF-009`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | `MR-S07-REC-001`, `MR-S07-MIG-001`; unit and browser                                                        | Full, fallback, and slice; Gate 2 onward         | `specifiedNotRun` |
| `MR-S12-ACC-022` | Completion, retry, Citation merge, newest-12 retention, New Game replacement, repairs, and clearing are atomic and preserve unrelated valid data.                                                               | `MR-REQ-END-002`, `MR-REQ-SAVE-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                               | `MR-TEST-END-001`, `MR-TEST-SAVE-001`, `MR-TEST-TECH-001`                                                                                                                                                | `MR-IF-002`, `MR-IF-006`, `MR-IF-007`, `MR-IF-010`, `MR-IF-015`, `MR-IF-004`, `MR-IF-005`, `MR-IF-011`, `MR-IF-001`, `MR-IF-003`, `MR-IF-008`, `MR-IF-009`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | S07 completion, clearing, and failure groups; unit and browser                                              | Fallback after Gate 3; full after Gate 4         | `specifiedNotRun` |
| `MR-S12-ACC-023` | The complete S08 spatial plan and every registered anchor match exact coordinates, facing, bounds, topology, and clear-space rules.                                                                             | `MR-REQ-EXP-001`, `MR-REQ-WORLD-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                              | `MR-TEST-EXP-001`, `MR-TEST-UI-001`, `MR-TEST-WORLD-001`, `MR-TEST-CONT-001`, `MR-TEST-TECH-001`                                                                                                         | `MR-IF-002`, `MR-IF-003`, `MR-IF-006`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-015`, `MR-IF-013`, `MR-IF-001`, `MR-IF-004`, `MR-IF-005`, `MR-IF-007`, `MR-IF-011`, `MR-IF-012`, `MR-IF-014` | `MR-S08-GEO-001`, `MR-S08-ANC-001`; unit and static audit                                                   | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-024` | Player motion and collision match exact cylinder, acceleration, stopping, delta, normalization, sliding, tie, contact, and no-catch-up rules.                                                                   | `MR-REQ-WORLD-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                | `MR-TEST-WORLD-001`, `MR-TEST-CONT-001`, `MR-TEST-TECH-001`                                                                                                                                              | `MR-IF-002`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-013`, `MR-IF-015`, `MR-IF-001`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-011`, `MR-IF-012`, `MR-IF-014` | `MR-S08-COL-001`, `MR-S08-MOV-001`; unit and browser                                                        | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-025` | Target, focus, range, sight, priority, revision, pose, rejection, and applied-command order match S08.                                                                                                          | `MR-REQ-EXP-001`, `MR-REQ-WORLD-001`, `MR-REQ-UI-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                             | `MR-TEST-EXP-001`, `MR-TEST-UI-001`, `MR-TEST-WORLD-001`, `MR-TEST-CONT-001`, `MR-TEST-TECH-001`                                                                                                         | `MR-IF-002`, `MR-IF-003`, `MR-IF-006`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-015`, `MR-IF-013`, `MR-IF-007`, `MR-IF-011`, `MR-IF-014`, `MR-IF-001`, `MR-IF-004`, `MR-IF-005`, `MR-IF-012` | `MR-S08-TGT-001`, `MR-S08-FOC-001`; unit and browser                                                        | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-026` | Every complete projection, retry, act, room, roster, passage, route, shortcut, rejection, and fatal world case preserves reachability and campaign truth.                                                       | `MR-REQ-WORLD-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                | `MR-TEST-WORLD-001`, `MR-TEST-CONT-001`, `MR-TEST-TECH-001`                                                                                                                                              | `MR-IF-002`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-013`, `MR-IF-015`, `MR-IF-001`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-011`, `MR-IF-012`, `MR-IF-014` | S08 world, traversal, and fault groups; unit and browser                                                    | Fallback after Gate 3; full after Gate 4         | `specifiedNotRun` |
| `MR-S12-ACC-027` | Every input action, default, remap, conflict, dead zone, repeat, device change, disconnection, and input-mode transition matches S09.                                                                           | `MR-REQ-UI-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                   | `MR-TEST-UI-001`, `MR-TEST-TECH-001`                                                                                                                                                                     | `MR-IF-002`, `MR-IF-003`, `MR-IF-006`, `MR-IF-007`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-014`, `MR-IF-015`, `MR-IF-001`, `MR-IF-004`, `MR-IF-005`, `MR-IF-008`, `MR-IF-012`, `MR-IF-013` | `MR-S09-INP-001`, `MR-S09-FOC-001`; unit and browser                                                        | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-028` | Every screen, overlay, semantic control, setting, confirmation, error, notification, Archive view, and lifecycle route has exact content, focus, state, and recovery.                                           | `MR-REQ-CHAR-001`, `MR-REQ-END-002`, `MR-REQ-UI-001`, `MR-REQ-SAVE-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                           | `MR-TEST-CHAR-001`, `MR-TEST-END-001`, `MR-TEST-SAVE-001`, `MR-TEST-UI-001`, `MR-TEST-TECH-001`                                                                                                          | `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-006`, `MR-IF-008`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-015`, `MR-IF-007`, `MR-IF-009`, `MR-IF-014`, `MR-IF-004`, `MR-IF-001`, `MR-IF-013` | S09 UI, settings, error, and lifecycle groups; browser                                                      | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-029` | All approved desktop sizes and scale combinations remain usable, and each below-minimum dimension blocks safely with no campaign-time or movement change.                                                       | `MR-REQ-UI-001`, `MR-REQ-A11Y-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                | `MR-TEST-UI-001`, `MR-TEST-TECH-001`, `MR-TEST-A11Y-001`                                                                                                                                                 | `MR-IF-002`, `MR-IF-003`, `MR-IF-006`, `MR-IF-007`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-014`, `MR-IF-015`, `MR-IF-012`, `MR-IF-001`, `MR-IF-004`, `MR-IF-005`, `MR-IF-008`, `MR-IF-013` | `MR-S09-RSP-001`; browser                                                                                   | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-030` | Keyboard-only and controlled-controller journeys, semantics, focus, captions, speaker names, contrast, motion, flashes, colour independence, and Interaction Assist pass; manual assistive reading also passes. | `MR-REQ-AUDIO-001`, `MR-REQ-UI-001`, `MR-REQ-A11Y-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                            | `MR-TEST-UI-001`, `MR-TEST-TECH-001`, `MR-TEST-A11Y-001`                                                                                                                                                 | `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015`, `MR-IF-002`, `MR-IF-003`, `MR-IF-006`, `MR-IF-007`, `MR-IF-009`, `MR-IF-001`, `MR-IF-004`, `MR-IF-005`, `MR-IF-008` | `MR-S09-A11Y-001`, `MR-S09-JRN-001`; browser and manual review                                              | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-031` | Five rendering setups match exact renderer, profile, resize, colour, light, material, shadow, layer, effect, and Reduced Motion contracts.                                                                      | `MR-REQ-WORLD-001`, `MR-REQ-ART-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                              | `MR-TEST-WORLD-001`, `MR-TEST-CONT-001`, `MR-TEST-RELEASE-001`, `MR-TEST-TECH-001`                                                                                                                       | `MR-IF-002`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-013`, `MR-IF-015`, `MR-IF-014`, `MR-IF-001`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-011`, `MR-IF-012` | `MR-S10-RND-001`; browser and unit                                                                          | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-032` | Five character and cutscene setups plus attached lifecycle cases restore camera, actor, UI, audio, token, callback, and campaign state exactly.                                                                 | `MR-REQ-NARR-002`, `MR-REQ-CHAR-001`, `MR-REQ-AUDIO-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                          | `MR-TEST-NARR-001`, `MR-TEST-CHAR-001`, `MR-TEST-UI-001`, `MR-TEST-TECH-001`, `MR-TEST-A11Y-001`                                                                                                         | `MR-IF-003`, `MR-IF-005`, `MR-IF-006`, `MR-IF-010`, `MR-IF-011`, `MR-IF-015`, `MR-IF-002`, `MR-IF-008`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-001`, `MR-IF-004`, `MR-IF-007`, `MR-IF-009` | `MR-S10-SCN-001`; browser and unit                                                                          | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-033` | Six resource and audio setups plus attached lifecycle cases preserve ownership, loading, failure, bus, ambience, suspension, teardown, and provenance boundaries.                                               | `MR-REQ-ART-001`, `MR-REQ-AUDIO-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                              | `MR-TEST-RELEASE-001`, `MR-TEST-UI-001`, `MR-TEST-TECH-001`, `MR-TEST-A11Y-001`                                                                                                                          | `MR-IF-008`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-009` | `MR-S10-RES-001`; browser, unit, and static audit                                                           | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-034` | Eight compatibility setups produce the exact ordered capability report, block only required failures, degrade controller absence, and clean every probe.                                                        | `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-TECH-001`                                                                                                                                                                                       | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | `MR-S11-CMP-001`; browser and unit                                                                          | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-035` | Every graphics profile and performance limit calculation, scenario record, median, invalid state, exception, retest, and regression response matches S11.                                                       | `MR-REQ-TECH-001`, `MR-REQ-PERF-001`, `MR-REQ-TEST-001`                                                                                                                                                                                 | `MR-TEST-TECH-001`, `MR-TEST-PERF-001`                                                                                                                                                                   | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | `MR-S11-PERF-001`; unit                                                                                     | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-036` | Direct current-stable browser, reference-device performance, loading, transfer, and long-session measurements meet the approved targets or follow the approved failure response.                                | `MR-REQ-TECH-001`, `MR-REQ-PERF-001`, `MR-REQ-RELEASE-001`, `MR-REQ-TEST-001`                                                                                                                                                           | `MR-TEST-TECH-001`, `MR-TEST-PERF-001`, `MR-TEST-RELEASE-001`                                                                                                                                            | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | S11 manual procedures; manual measurement                                                                   | Actual release candidate; measured later         | `measuredLater`   |
| `MR-S12-ACC-037` | Eight diagnostic setups enforce severity, recovery, fixed conversion, field order, 2-KiB boundary, explicit copy, memory-only life, production sanitization, and no automatic output.                           | `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-TECH-001`                                                                                                                                                                                       | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | `MR-S11-DIA-001`; unit and static audit                                                                     | All profiles; Gate 2 onward                      | `specifiedNotRun` |
| `MR-S12-ACC-038` | Routine, weakened, and interrupted vertical-slice journeys complete through exact safe save and recovery, and Leonardo passes the slice checklist and duration check.                                           | `MR-REQ-VISION-001`, `MR-REQ-LOOP-001`, `MR-REQ-EXP-001`, `MR-REQ-NARR-001`, `MR-REQ-WORLD-001`, `MR-REQ-TEST-001`                                                                                                                      | `MR-TEST-VISION-001`, `MR-TEST-CONT-001`, `MR-TEST-EXP-001`, `MR-TEST-NARR-001`, `MR-TEST-UI-001`, `MR-TEST-WORLD-001`                                                                                   | `MR-IF-006`, `MR-IF-008`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-015`, `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-009`, `MR-IF-013`                                                     | `MR-S12-JNY-001`, `MR-S12-PLAY-001`; browser and manual review                                              | Slice; required before Gate 3                    | `specifiedNotRun` |
| `MR-S12-ACC-039` | The fallback passes constrained, weakened, route, no-route, completion, exclusion, vision, and private-play cases.                                                                                              | `MR-REQ-VISION-001`, `MR-REQ-LOOP-001`, `MR-REQ-EXP-001`, `MR-REQ-NARR-001`, `MR-REQ-WORLD-001`, `MR-REQ-CONTENT-002`, `MR-REQ-TEST-001`                                                                                                | `MR-TEST-VISION-001`, `MR-TEST-CONT-001`, `MR-TEST-EXP-001`, `MR-TEST-NARR-001`, `MR-TEST-UI-001`, `MR-TEST-WORLD-001`                                                                                   | `MR-IF-006`, `MR-IF-008`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-015`, `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-009`, `MR-IF-013`                                                     | `MR-S12-JNY-002`, `MR-S12-VIS-001`, `MR-S12-PLAY-001`; automated and manual                                 | Fallback; required before Gate 4                 | `specifiedNotRun` |
| `MR-S12-ACC-040` | The full campaign passes mandatory, high-pressure, route-matrix, ending, catalogue, vision, repetition, traversal, and private-play cases without forced late idle waiting.                                     | `MR-REQ-VISION-001`, `MR-REQ-LOOP-001`, `MR-REQ-EXP-001`, `MR-REQ-EXP-003`, `MR-REQ-NARR-001`, `MR-REQ-CHAR-001`, `MR-REQ-WORLD-001`, `MR-REQ-END-001`, `MR-REQ-END-002`, `MR-REQ-CONTENT-002`, `MR-REQ-RELEASE-001`, `MR-REQ-TEST-001` | `MR-TEST-VISION-001`, `MR-TEST-CONT-001`, `MR-TEST-EXP-001`, `MR-TEST-NARR-001`, `MR-TEST-UI-001`, `MR-TEST-CHAR-001`, `MR-TEST-WORLD-001`, `MR-TEST-END-001`, `MR-TEST-SAVE-001`, `MR-TEST-RELEASE-001` | `MR-IF-006`, `MR-IF-008`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-015`, `MR-IF-002`, `MR-IF-003`, `MR-IF-005`, `MR-IF-009`, `MR-IF-013`, `MR-IF-004`, `MR-IF-007`, `MR-IF-014`              | S05 journeys, `MR-S12-CAT-001`, `MR-S12-EVL-001`, `MR-S12-VIS-001`, `MR-S12-PLAY-001`; automated and manual | Full; required before release-candidate work     | `specifiedNotRun` |
| `MR-S12-ACC-041` | All eight cross-module failure journeys preserve the last verified campaign truth and exact safe recovery order.                                                                                                | `MR-REQ-NARR-002`, `MR-REQ-SAVE-001`, `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                              | `MR-TEST-NARR-001`, `MR-TEST-SAVE-001`, `MR-TEST-TECH-001`                                                                                                                                               | `MR-IF-003`, `MR-IF-005`, `MR-IF-006`, `MR-IF-010`, `MR-IF-011`, `MR-IF-015`, `MR-IF-002`, `MR-IF-004`, `MR-IF-007`, `MR-IF-001`, `MR-IF-008`, `MR-IF-009`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014` | `MR-S12-JNY-003`; unit and browser                                                                          | Cross-cutting; Gate 2 onward                     | `specifiedNotRun` |
| `MR-S12-ACC-042` | Rules, content validation, and persistence meet numeric coverage, and all required full-branch modules reach 100% branch coverage.                                                                              | `MR-REQ-TECH-001`, `MR-REQ-TEST-001`                                                                                                                                                                                                    | `MR-TEST-TECH-001`                                                                                                                                                                                       | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | Coverage report                                                                                             | Applicable build; automated gate                 | `specifiedNotRun` |
| `MR-S12-ACC-043` | Documentation has no interrupted table, broken internal link, duplicate stable control ID, missing traceability, or conflicting approved numeric claim.                                                         | `MR-REQ-TECH-001`, `MR-REQ-CONTENT-001`, `MR-REQ-TEST-001`                                                                                                                                                                              | `MR-TEST-TECH-001`, `MR-TEST-CONT-001`                                                                                                                                                                   | `MR-IF-001`, `MR-IF-002`, `MR-IF-003`, `MR-IF-004`, `MR-IF-005`, `MR-IF-006`, `MR-IF-007`, `MR-IF-008`, `MR-IF-009`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015` | `MR-S12-DOC-001`; static audit                                                                              | Specification and every later documentation gate | `specifiedNotRun` |
| `MR-S12-ACC-044` | Durable evidence summaries contain only approved environment, outcome, measurement, cause, fix, retest, and known-limit facts.                                                                                  | `MR-REQ-PERF-001`, `MR-REQ-RELEASE-001`, `MR-REQ-TEST-001`                                                                                                                                                                              | `MR-TEST-PERF-001`, `MR-TEST-RELEASE-001`                                                                                                                                                                | `MR-IF-001`, `MR-IF-008`, `MR-IF-013`, `MR-IF-014`, `MR-IF-015`                                                                                                                                   | Evidence-record audit                                                                                       | Every evidence gate                              | `specifiedNotRun` |
| `MR-S12-ACC-045` | Dependency, asset, privacy, fiction-safety, title, browser-evidence, licence, credit, network, and public-boundary checks all pass before release preparation.                                                  | `MR-REQ-VISION-001`, `MR-REQ-EXP-003`, `MR-REQ-ART-001`, `MR-REQ-RELEASE-001`, `MR-REQ-TEST-001`                                                                                                                                        | `MR-TEST-VISION-001`, `MR-TEST-CONT-001`, `MR-TEST-RELEASE-001`                                                                                                                                          | `MR-IF-006`, `MR-IF-008`, `MR-IF-010`, `MR-IF-011`, `MR-IF-012`, `MR-IF-015`, `MR-IF-013`, `MR-IF-014`                                                                                            | `MR-S12-REL-001`; static audit and manual review                                                            | Release candidate; public handoff gate           | `specifiedNotRun` |

## Automated coverage boundary

Formal coverage remains at least `90%` line coverage and `85%` branch coverage
across:

- all campaign rules;
- content validation, selection, references, word counting, and migration;
  and
- persistence validation, migration, recovery, completion, replacement,
  repair, clearing, and transaction decisions.

Ending resolution, content validation, active-save recovery, forward
migration, active-save replacement, and local-data clearing require complete
branch coverage.

Type-only files, public re-export files, test utilities, generated reports,
browser wiring, Three.js rendering, DOM presentation, audio nodes, and raw
input listeners are excluded from the numeric calculation. Their required
browser, static, and manual checks remain mandatory.

Vitest unit tests use plain data and controlled substitutes. They cannot use
Three.js, DOM objects, IndexedDB, audio, real browser events, real timers, or
network access. Playwright uses the local game and real browser features for
integration, semantic UI, IndexedDB, focus, input transitions, lifecycle,
layout, and accessibility checks.

## Rejection and fault cases

A rejection case starts from valid data, applies its declared invalid change
or request, and expects the exact first rejection code. A fault case expects
the exact stable fault code and safe response.

It also proves:

- protected starting data is unchanged;
- no partial state, history, revision, time, energy, save, or effect change
  occurred;
- no forbidden downstream call occurred; and
- retry is available only where the approved contract permits it.

An exception by itself is not a passing result.

## S02 architecture fixtures

`MR-S02-FIX-001` through `MR-S02-FIX-010` each receive primary case `C001`.
They use one controlled environment that represents every approved module and
records create, start, open, close, stop, frame, and interface calls.

Operations succeed immediately unless a case declares a controlled delay or
failure. The normal frame value is `0.016 s`. Representative controlled facts
are:

- WebGL2 unavailable for the missing-capability case;
- required rendering-resource failure at startup step 7 for partial cleanup;
- an unresolved first request for queue order; and
- a controlled frame exception for unexpected-fault conversion.

S11 separately checks every required-capability variant.

## S03 campaign-state fixtures

`MR-S03-FIX-001-C001` is the complete Standard starting campaign. Its fixed
test metadata is:

| Fact             | Value                                  |
| ---------------- | -------------------------------------- |
| Campaign ID      | `00000000-0000-4000-8000-000000000001` |
| Campaign seed    | `305419896`                            |
| Campaign schema  | `1`                                    |
| Content version  | `1.0.0`                                |
| Build profile    | `full`                                 |
| Pressure profile | `standard`                             |
| Protagonist      | `Morgan`, `theyThem`                   |
| Recovery anchor  | `MR-ANCHOR-REC-SHARED-DESKS`           |

All other facts use the exact S03 initial state. `C002` changes only the
pressure profile to `supported` and energy from `4` to `5`. Parse, serialize,
and parse again reproduce equal campaign facts and identical canonical bytes.

`MR-S03-REJ-001` through `005` keep the five structural rejection categories.
`MR-S03-INV-001` owns identity, reference, experiment, manuscript, scheduler,
content, world, route, and conclusion invariant cases. `MR-S03-TRN-001` owns
forbidden history editing, removal, reuse, and reversal.

The closed S03 fixture reason codes are:

- `missingField`;
- `unknownField`;
- `wrongType`;
- `invalidNumber`;
- `forbiddenPresentationField`;
- `invalidId`;
- `duplicateId`;
- `invalidReference`;
- `invariantViolation`; and
- `historyRegression`.

The safe diagnostic uses a JSON-style path such as
`/metadata/stateRevision`. It never includes the rejected value. Several
invalid facts return the first result from the S03 validation order.

## S04 rules and deterministic variation

### Primary command, rejection, and fault cases

`MR-S04-CMD-001-C001` through `C024` match the 24 S04 commands in their
documented order. Each case has one valid complete campaign, restricted
content view, command, exact new campaign, ordered effects, and unchanged
input proof. Each applied command increases `stateRevision` once.

`MR-S04-REJ-001-C001` through `C015` match the 15 rejection codes in priority
order. `C016` supplies several rejection conditions and expects
`campaignComplete`.

`MR-S04-FLT-001-C001` through `C006` match the six fault codes. The first three
use invalid command, state, or content input. The final three use a test-only
internal rule-phase harness for rule-invariant failure, invalid proposed state,
and unexpected-failure conversion. The harness cannot be exported by runtime
source or enter a production build.

### Reserved exact case ranges

Unused case numbers remain gaps.

| Range       | Required coverage                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `C100–C149` | Preparation issues, Haoran support, stabilization, all three preparation bands, severe failure, and biological bucket boundaries |
| `C150–C199` | Monitoring, stopping, analysis, evidence-quality priority, controls, observation, repeats, and support points                    |
| `C200–C249` | Standard and Supported energy, action costs, break caps, late surcharge, push-through, blocked work, and pending crash           |
| `C300–C349` | Manuscript requirement states, claims, confirmations, snapshots, confidence, integrity, correction, and authorship               |
| `C350–C399` | Concern responses, correction limits, trust, breaches, and all five character supports                                           |
| `C400–C449` | PIIM cards, bands, withdrawal, visible altered or unsupported support, and saved no-redraw results                               |
| `C500–C549` | Aldercroft and Morrow boundaries, route combinations, hidden integrity, visible conflict, and public withdrawal                  |
| `C550–C599` | Final choices, all 29 ending modules, relationship tie order, and both finalization phases                                       |
| `C600–C649` | Scene request steps, checkpoint retry, choices, skips, five presentation kinds, and contradictory receipt rejection              |
| `C700–C749` | Seeds, namespaces, targets, indexes, bucket mapping, retry, reload, unrelated and rejected commands, and no redraw               |

Experiment buckets use `0`, `19`, `20`, `79`, `80`, and `99`. PIIM cases use
`0`, `19`, `20`, `49`, `50`, `79`, `80`, and `99`.

### Fixed deterministic vectors

For campaign seed `305419896`:

| Namespace and target                                  | Unsigned value | Bucket |
| ----------------------------------------------------- | -------------: | -----: |
| `experimentVariation`, `run:MR-EXP-LASER-SHAM:1`      |   `2339300078` |   `54` |
| `piimOutcome`, `MR-PIIM-OUTCOME`                      |   `3179044264` |   `74` |
| `experimentVariation`, test-only composed `run:é:1`   |   `1344901227` |   `31` |
| `experimentVariation`, test-only decomposed `run:é:1` |   `2530851968` |   `58` |

The Unicode targets test byte calculation only and are not campaign IDs. Their
different UTF-8 bytes deliberately produce different results. Retry, reload,
and unrelated or rejected commands preserve the value. A different namespace,
target, draw index, or seed has its own recorded expected value.

## S05 calendar, scheduler, and narrative

`MR-S05-CAL-001` has nine primary cases: initial period; early, late, night,
and after-hours labels; inclusive final window; multi-period crossing; expiry
before unlock; and the period-63 boundary.

`MR-S05-SCH-001` has ten primary cases for the four triggers, one-instruction
processing, complete priority order, all tie-break levels, settled state,
duplicate prevention, and real-time-trigger rejection.

`MR-S05-CRS-001` has seven primary cases for push-through, combined warning,
pending crash, period-64 rejection, recovery anchor, one missed window, and
both oxygen windows missed.

The remaining isolated groups give every listed variant its own case:

| Group             | Minimum isolated coverage                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `MR-S05-MSG-001`  | Six primary message and reminder cases                                                                      |
| `MR-S05-ROOM-001` | Seven primary room-state and order cases                                                                    |
| `MR-S05-GATE-001` | Six primary late-gate cases                                                                                 |
| `MR-S05-SCN-001`  | Every scene, checkpoint, form, cost, failure, and retry variant                                             |
| `MR-S05-SKP-001`  | Every pre-choice, post-choice, no-choice, recap, and replay variant                                         |
| `MR-S05-REC-001`  | Every pause, visibility, small-view, failure, quit, load, closing, recap, and pointer-capture variant       |
| `MR-S05-END-001`  | Period 63, route combinations, confirmations, both finalization phases, epilogue modes, and completion once |

`MR-S05-FLT-001-C001` through `C005` match the five S05 fault codes. Companion
cases cover a stale request, duplicate and late tokens, failed post-validation,
unchanged state, disabled control, and verified-checkpoint recovery.

The connected journeys are:

- `MR-S05-JNY-001-C001`: normal mandatory campaign;
- `MR-S05-JNY-002-C001`: high-pressure multi-period crossing; and
- `MR-S05-JNY-003-C001` through `C005`: Aldercroft only, Morrow only, both
  routes, neither route, and deliberate departure while a route exists.

Each records accepted commands, scheduler instructions, checkpoints,
revisions, presentation receipts, and final state in causal order.

## S06 content packages

S06 validator fixtures use self-contained test-only catalogues. Every profile
marked `complete` contains its required families, references, counts, profile
rules, and minimal safe English text. These catalogues cannot enter a playable
build.

- `MR-S06-VAL-001-C001` is the valid full package with all three profiles
  marked `complete`.
- `MR-S06-VAL-001-C002` is the valid slice-development catalogue with slice
  complete and fallback and full explicitly incomplete.
- `MR-S06-VAL-001-C003` is the valid fallback-development catalogue with
  slice and fallback complete and full explicitly incomplete.
- `MR-S06-VAL-001-C004` rejects a non-monotonic completion combination.
- `MR-S06-FBK-001-C001` is the exact valid fallback package.
- `MR-S06-SLC-001-C001` is the exact valid slice package.

Each records selected IDs, counts, keys, views, and its test word count. A
separate future static audit checks the actual `content/` tree and real word
count. S12 does not invent that value.

`MR-S06-REF-001`, `MR-S06-STR-001`, and `MR-S06-OBJ-001` start from a valid
registered package and apply one controlled change per normal rejected case.
Every reference, strict-object, placeholder, key, normalization, and profile
variant has an independent case. Separate cases prove that full, fallback, and
slice build requests reject an incomplete requested profile and never switch
to another profile.

The exact 6,000- and 6,001-word cases use a closed test-only word series from
`word0001` through the required end. This provides reproducible input without
storing thousands of repeated words.

`MR-S06-MIG-001` covers current version `1.0.0`, test-only compatible version
`0.9.0`, retained IDs, one direct replacement, profile mismatch, missing
mapping, and unchanged state after failure. Version `0.9.0` is fixture data,
not a released content claim.

`MR-S06-FLT-001-C001` through `C016` match the 16 validation issue codes in
documented order. `C017` supplies several faults and verifies deterministic
issue ordering. Failure returns no partial content, preserves sources, does not
change profile, and uses the approved safe startup message.

## S07 persistence and recovery

Persistence uses two test levels. Unit fixtures use a plain six-store model
and record every store before and after, transaction order, and exact result.
Browser companions use real IndexedDB for database creation and store/key
inventory, atomic active and backup writes, version-change connection closing,
blocked deletion, cross-tab conflict, complete deletion, and restart.

Quota exhaustion is a controlled failure because a real quota cannot be made
stable across browsers. A size helper accepts `1,048,576` UTF-8 bytes and
rejects `1,048,577`; it does not claim that padding is a valid campaign.

- `MR-S07-SAV-001-C001` through `C012` follow the twelve listed save cases.
- `MR-S07-REC-001-C001` through `C016` cover all four-by-four active and backup
  status combinations: absent, valid, needs migration, and invalid. Additional
  cases cover accepted and declined recovery, exact revision, discard, no
  silent selection, and another-tab conflict.
- `MR-S07-MIG-001` separates database, metadata, settings, ending-card,
  Citation, campaign-schema, and content migrations. Test-only version `0`
  records and content `0.9.0` supply earlier sources where required.
- `MR-S07-CMP-001` separates atomic completion, retry, conflicting campaign
  identity, invalid ending facts, Citation merge and repeated unlock, sequence
  order, and thirteen completions that retain sequences `2–13`.
- `MR-S07-CLR-001` separates cancellation, closing, deletion, blocked deletion,
  error, stopped state, and new empty version-1 restart.
- `MR-S07-FLT-001-C001` through `C009` match the nine persistence codes.
  Companion cases cover each listed supporting-record, repair, quota,
  connection, settings, and transaction fault.

Every failure proves that protected stores and the in-memory campaign are
unchanged.

## S08 world, movement, and interaction

The starting campaign's recovery anchor is
`MR-ANCHOR-REC-SHARED-DESKS`. A `MR-LOC-*` ID names a semantic room; a
`MR-ANCHOR-*` ID names an exact safe position.

S08 registers stable IDs for every approved anchor-table row:

- `MR-ANCHOR-REC-*`;
- `MR-ANCHOR-STATION-*`;
- `MR-ANCHOR-SUPPORT-*`;
- `MR-ANCHOR-CHARACTER-*`;
- `MR-ANCHOR-STEP-ASIDE-*`; and
- `MR-ANCHOR-SCENE-*`.

`MR-S08-GEO-001` verifies the complete spatial plan. `MR-S08-ANC-001` verifies
every registered anchor, facing, clear space, restoration, and invalid-anchor
rejection.

World unit cases use no Three.js object. They test cylinders, rectangles,
target volumes, camera facts, and revisions as plain data. Movement frames
include `0`, `0.016`, `0.05`, and `0.051 s`; the final case processes at most
`0.05 s` and discards excess time. Independent cases cover acceleration,
stopping, diagonals, partial input, sliding, equal hits, opposing surfaces,
four contacts, interruption, permission loss, and no catch-up.

Target and focus cases cover exact ranges, blocked view, attached targets,
stable tie order, stale revisions, one focus, unchanged base pose, and command
result order.

`MR-S08-WLD-001` verifies projection application, identical retry, old and
conflicting revisions, acts, room states, characters, and Gabriel's passage.
`MR-S08-TRV-001` checks every route, recovery anchor, station, roster, scene
placement, room state, both shortcut states, and one worst valid closed-
shortcut combination. This is deterministic validation, not runtime path
finding.

The seven normal rejection codes remain those in S08. The six fatal fixture
codes are:

- `invalidSpatialPlan`;
- `invalidWorldProjection`;
- `invalidRecoveryAnchor`;
- `projectionRevisionConflict`;
- `worldUpdateFailed`; and
- `worldCleanupFailed`.

Every `MR-S08-FLT-001` case proves exact unchanged pose, focus, projection,
and campaign facts.

## S09 input, UI, and accessibility

`MR-S09-INP-001` unit cases cover every default binding, remap, conflict,
held-state and repeat rule, sensitivity, dead zone, device change,
disconnection, and label. Real browser cases cover keyboard, mouse, pointer
capture, focus loss, hidden-page clearing, and safe return.

Controller navigation has two levels. Unit cases provide exact raw values.
Browser journeys use a test-only controlled Input port for complete semantic
controller navigation. A physical-controller check is optional later evidence
because automated browsers cannot guarantee hardware. The test port cannot
enter production.

`MR-S09-UI-001` gives every approved screen and overlay at least one case with
exact semantic names, order, focus, text keys, availability, navigation, and
return. `MR-S09-SET-001` covers every setting, default, value, boundary,
preview, save, failed save, invalid record, reset, remap, and Reduced Motion
interaction.

`MR-S09-ERR-001-C001` through `C009` match the nine S07 codes. Companions cover
operation wording, safe and unsafe retry, tab conflict, screen recovery, fatal
stop, reload, and sanitization. `MR-S09-LIF-001` covers all approved startup,
failure, replacement, close, cleanup, retry, fatal, and reload variants.

The responsive browser matrix is:

| View                        | Scale cases                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `1280 × 720`                | All nine Text Scale and Interface Scale combinations from `100%`, `125%`, and `150%` |
| `960 × 540`                 | Both scales at `100%`                                                                |
| `2560 × 1080`               | Both scales at `100%` and both at `150%`                                             |
| `1280 × 960`                | Both scales at `100%` and both at `150%`                                             |
| `959 × 540` and `960 × 539` | Too-small blocking                                                                   |

Required controls need no horizontal scroll. Long content can scroll
vertically. Keyboard-and-mouse and controlled-controller journeys run in
Chromium, Firefox, and WebKit. Automation checks semantics, focus, captions,
speaker names, contrast, colour-independent meaning, motion, flashes, and
Interaction Assist. One later manual assistive-reading check remains required.

## S10 rendering, cutscenes, resources, and audio

The approved setup counts and order are exact:

- `MR-S10-RND-001-S01` through `S05`: base renderer, quality profiles,
  lighting transition, layered papers and decals, and Reduced Motion;
- `MR-S10-SCN-001-S01` through `S05`: shared animations, missing animation,
  focused-view transition, complete cutscene, and skipped cutscene; and
- `MR-S10-RES-001-S01` through `S06`: shared loading, optional failure,
  required failure, four audio buses, room ambience, and suspended audio.

A setup can have independent cases. Another setup needs later approval.

Automated cases use small generated test resources: simple geometry and
materials, one-pixel texture, portrait rectangle, silent or simple-tone audio,
and plain animation and cutscene records. They use `MR-TEST-*` IDs, need no
external licence, and cannot enter production. A static audit rejects these
resources, hooks, or IDs from a playable build.

They prove configuration, ownership, loading, cleanup, cue routing, and
failure behaviour. They do not prove final quality or suitability.

Six lifecycle cases attach to the existing setups: restart during loading,
restart during a cutscene, title return while audio plays, late old-session
result, graphics-context loss with successful recovery, and graphics-context
loss with controlled title return. Each leaves one clean current session and
unchanged campaign truth. Browser cases verify WebGL, resize, context loss,
Web Audio creation and suspension, and cleanup. Final presentation quality
needs manual review.

## S11 browser, performance, and diagnostics

### Compatibility

`MR-S11-CMP-001-S01` through `S08` keep the approved setup order. The required-
capability setup gives unavailable and failed cases to ES modules, WebGL2,
IndexedDB, Web Audio, and pointer lock. Controller absence remains non-
blocking. Automated cases run in Chromium, Firefox, and WebKit. Dated direct
current-stable Chrome, Edge, and Firefox evidence remains required for support
claims. WebKit does not prove Safari support.

### Performance

`MR-S11-PERF-001-S01` through `S09` keep the approved order. Automated cases
verify exact profiles, every inclusive limit and one outside value, frame and
processor calculations, memory and transfer calculations, five scenarios,
three-run median records, invalid runs, long-session record structure, and the
approved exception, retest, and regression response.

They use synthetic values. They cannot report real browser, frame, processor,
memory, loading, transfer, or long-session results. Those need the S11 manual
method and actual build.

### Diagnostics

`MR-S11-DIA-001-S01` through `S08` keep the approved order. Cases cover
warnings, both recoverable forms, fatal failure, unknown conversion,
conversion failure, allowed and prohibited fields, production sanitization,
canonical order, explicit copy, memory-only life, and no automatic output.

One valid canonical record is exactly `2,048` UTF-8 bytes. An otherwise valid
`2,049`-byte record uses the fixed minimal fallback and is not truncated. A
static audit rejects telemetry, analytics, automatic reporting, remote logging,
persistent diagnostics, fingerprinting, and raw production errors.

## Cross-module journeys

`MR-S12-JNY-001` owns the vertical slice:

- `C001`: Standard routine path from startup through laser/sham analysis,
  claim rehearsal, safe save, close, Continue, and completion;
- `C002`: limited or missed-monitoring path with its exact weaker evidence and
  the same safe completion; and
- `C003`: save interruption and approved recovery before completion.

Automation cannot claim the real `20–30` minute duration. Leonardo checks it.

`MR-S12-JNY-002` owns fallback cases for constrained evidence, weakened
evidence, one available route, no route, and a completed Departures card. Each
uses the fallback profile and proves that excluded full content and strings
are unavailable. Full-game coverage uses `MR-S05-JNY-001` and
`MR-S05-JNY-003` with the full profile and S07 completion.

`MR-S12-JNY-003` owns eight cross-module failures: missing capability, invalid
content, failed save, tab conflict, required-resource failure, recoverable
graphics-context loss, fatal presentation plus verified reload, and hidden,
unfocused, paused, or too-small presentation with no catch-up or campaign-time
change. Each records complete interface order and unchanged campaign truth.

## Economy, catalogue, repetition, and traversal

`MR-S12-ECO-001` preserves these exact vectors:

| Path               | Periods | Energy | Standard total | Supported total |
| ------------------ | ------: | -----: | -------------: | --------------: |
| Minimum defensible |    `44` |   `26` |           `55` |            `51` |
| Thorough honest    |    `56` |   `30` |           `69` |            `65` |
| Maximizing         |    `79` |   `46` |          `100` |            `93` |

The thorough-honest vector does not fit either profile under current inputs.
The minimum vector remains achievable in both profiles with meaningful
optional work omitted. No vector requires misconduct, perfection, a crash, or
a forced Compromised result. Conditional room-response periods are excluded;
a wait route adds one period and no energy.

`MR-S12-CAT-001` audits actual future build content. It checks all profile
selections and counts, keys, forecasts, reasons, queue and exit lines, internal
reactions, contextual and environmental content, room states, rosters, ending
modules, Citations, and reachability. It also checks exactly ten glance items,
no generated dialogue or report, no unethical Citation dependency, no repair-
causation claim, and Camila's exact monitor-portrait, caption, and non-lexical-
sound limits.

`MR-S12-EVL-001` records private station visits, traversal seconds and share,
monitoring visits without a decision, confirmations per minute, contextual
lines shown, and environmental lines read. It answers the approved qualitative
questions and sets no invented numeric limit. Full-campaign review also checks
meaningful Weeks 8–9 work and no forced idle waiting in Weeks 15–16. Forced
idle waiting returns `MR-REV-007` for a new design decision. A test cannot add
filler.

## Vision, play review, and release boundary

`MR-S12-VIS-001` gives a fresh Codex context only actual build-specific text
and representative captures of the objective, three evidence views, Research
Status, and relevant choices. It receives no design document, review report,
hidden formula, fixture answer, or intended explanation.

It must correctly explain the objective, laser-and-sham purpose, repatterning-
index limit, Thin evidence meaning, and choice costs and consequences. A
material error creates a specific rewrite request and a new clean-context run.

`MR-S12-PLAY-001` contains separate slice, fallback, and full-game checklists.
Each item is `pass`, `needsRework`, or `notYetChecked`. A build passes only when
all required items pass. These are Leonardo's private judgments, not universal
player claims.

`MR-S12-REL-001` checks dependencies, licences, asset provenance and rights,
attribution, manifest records, secrets, private and real-person data,
telemetry, upload and network boundaries, wet-lab safety, repair causation,
title and brand review, future source licence and credits, and direct browser
evidence. A missing item blocks release preparation. A pass does not authorize
a remote, licence file, release, deployment, or publication.

## Top-level test evidence map

The existing 13 top-level test IDs remain complete:

| Test                  | Evidence types                                             |
| --------------------- | ---------------------------------------------------------- |
| `MR-TEST-VISION-001`  | Clean-context Codex check and Leonardo private review      |
| `MR-TEST-CONT-001`    | Unit and static audit                                      |
| `MR-TEST-EXP-001`     | Unit, browser, and connected journey                       |
| `MR-TEST-NARR-001`    | Unit, browser, and campaign journey                        |
| `MR-TEST-CHAR-001`    | Unit, browser, and campaign journey                        |
| `MR-TEST-WORLD-001`   | Geometry, movement, traversal, browser, and manual clarity |
| `MR-TEST-END-001`     | Unit, persistence, browser, and campaign journey           |
| `MR-TEST-SAVE-001`    | Unit and real IndexedDB browser checks                     |
| `MR-TEST-UI-001`      | Browser journeys                                           |
| `MR-TEST-A11Y-001`    | Automated browser plus manual assistive reading            |
| `MR-TEST-TECH-001`    | Unit, static, browser, and later direct support evidence   |
| `MR-TEST-PERF-001`    | Automated calculation plus later manual measurement        |
| `MR-TEST-RELEASE-001` | Static audit plus approved manual review                   |

S12 does not create competing top-level test IDs.

## Manual procedure contract

Every manual procedure records its purpose and acceptance ID, required build
and state, applicable device/browser/viewport/profile/settings, numbered
actions, observations, pass condition, failure response, and privacy limits.

Leonardo is the only human play evaluator. Codex can perform technical and
clean-context checks. Do not recruit a participant, run a survey, create an
account, collect telemetry, or collect personal data. A manual requirement
cannot be replaced by an agent opinion or automated screenshot.

## Expected fixtures and later results

Fixture files never contain `pass` or `fail`. Raw coverage, browser, and
profiler outputs remain in approved ignored paths. Future durable private
summaries live under `docs/evidence/` and record the real date, commit, suite,
profile, environment, case outcomes, applicable measurements, and known
limits.

They cannot contain save payloads, protagonist names, private conversations,
raw errors, machine paths, or personal data. A failed case records cause,
approved fix, and retest. Expected fixtures change only after their authority
changes through approval.

## Fixture and documentation self-checks

`MR-S12-FMT-001` covers one valid fixture; missing, unknown, and wrongly typed
fields; invalid and duplicate IDs; broken resource and acceptance links;
outside paths and symbolic links; reference chains and circles; missing and
unlisted files; wrong setup counts; and orphan acceptance rows.

`MR-S12-DOC-001` scans authoritative Markdown and implementation controls for
interrupted tables, malformed internal links, duplicate or missing
requirement/test/interface/fixture/decision/issue IDs, conflicting approved
numbers, missing requirement-to-test links, and content without requirement
and test traceability. It reports conflicts and files but cannot select or
repair a value.

## Command integration

No new top-level npm command is required.

- `npm test` runs fixture-schema, unit, static, and document-consistency checks
  through Vitest.
- `npm run test:coverage` runs the applicable unit set with formal coverage.
- `npm run test:e2e` runs the Playwright browser matrix.
- `npm run verify` remains the complete automated gate from S01.

Required automated cases cannot be skipped. A skip fails the gate. Automatic
test retries are disabled; a rerun is a separate result. Manual review and
measurement do not run through npm.

S13 assigns package-owned tests below `tests/unit/MR-WP-xx/` and
`tests/e2e/MR-WP-xx/`. Fixtures remain grouped below their Sxx directories and
declare their package owner. `MR-WP-09` alone owns the shared manifest,
acceptance matrix, utilities, coverage audit, and document audit. A package
cannot edit another package's expected result.

## Interface lifecycle and completion boundary

`MR-IF-001` through `MR-IF-015` were candidate `v1` after S12. S12 supplies the
connected fixture and traceability contract, but no machine-readable fixture
or result exists. S14 later completed the cross-interface, contradiction,
assumption, content, privacy, licence, accessibility, and gate audit and froze
all fifteen interfaces as `v1`.

S12 is complete at the specification level when:

- the fixture envelope, IDs, manifest, resources, steps, expectations, and
  evidence classes are exact;
- every S02–S12 required group has a case route;
- requirement, test, interface, content, and acceptance traceability is
  complete;
- automated and manual evidence remain distinct;
- no result or measured fact is invented; and
- implementation controls preserve S13, the later S14 audit, and every
  unapproved implementation and public-action gate.

S13 now owns future agent work orders, path ownership, review, validation, and
integration. S14 later completed the technical-specification programme. Gate 1
is ready for Leonardo's separate approval, and no implementation is authorized.

## S14 audit record

The S14 cross-interface and contradiction audit is complete. Every shared
interface defined or connected by this specification is frozen `v1` through
the interface register and `specification-audit.md`. Earlier candidate-state
statements preserve the interface lifecycle before S14; they are not the
current state. No executable fixture or measured result exists. Gate 1 is
ready for Leonardo's separate approval, and no implementation is authorized.

## Step-4 interface amendment

The approved Step-4 impact packet supersedes only historical `MR-IF-002 v1`
with frozen `v2` to define its exact creation input. Existing S03 case facts,
fixture reason codes, traceability, and acceptance rows remain unchanged. Step
4 can add ordinary unit evidence but cannot claim that the Step-6 S12 fixture
schema or manifest exists.

The approved correction supersedes `MR-IF-002 v2` with `v3`. Future S03 cases
must prove the sparse initial lifecycle, exact non-sparse inventories, global
multi-field revision sequence, complete internal invariants, and equal
canonical bytes for equivalent states whose ID-record insertion order differs.
S04 shape cases must prove a non-empty caveat list, the closed preparation-band
vocabulary, and complete ending-card effect facts. Step 4 still creates only
ordinary unit evidence, not S12 fixture files or a complete acceptance row.

The approved 2026-09-03 correction supersedes `MR-IF-002 v3` with `v4`.
Future S03 and S04 cases must also isolate every route prerequisite, typed
route-evaluation proof, concern impact, PIIM source, claim requirement,
milestone-order edge, the exact `MR-PIIM-OUTCOME` target, and a deeply nested
JSON input that returns a typed failure without throwing. The fallback vector
must continue to reject run 2 for `MR-FB-EXP-RANGE-REPAIR`. Conclusion cases
must continue to prove all four choices and the exact ordered ending modules.

## Correction C04: earlier evidence

The named Gates 4A, 6A and 26A in `../development-roadmap.md` supplement the integer roadmap. Apply their explicit runtime dependencies and proof limits. The opening evaluation uses periods 0–11, completing after its saved rehearsal; it does not require the loop to fit Week 1. No test-only campaign fixture enters shipped content.

## 2026-09-08 — Step5 validation boundary

MR-IMP-DEC-310 requires Step5 unit cases for all strict envelopes, duplicate JSON members, references, selected semantic facts, text/placeholders/word limits, checked copies and views, profile isolation, the five dormant IDs and safe startup failure. `test:build-profiles` must prove default/full/fallback rejection and successful slice isolation. These are ordinary Step5 tests; Step6 still owns the general S12 fixture schema and manifest. Step14 owns generic migration mechanics. Step52 owns complete fallback package/migration evidence and Step69 owns complete full package/migration evidence. Gate6A and later rules own executed journeys.
