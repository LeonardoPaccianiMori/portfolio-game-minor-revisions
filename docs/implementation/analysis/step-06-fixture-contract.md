# Step 6 fixture contract

Date: 2026-09-09. State: candidate. Preparation base: `69cef2e`. Preparation was approved by Leonardo on 2026-09-09. This file proposes the exact Step 6 shared-contract amendment and work order. It does not freeze an interface, authorize implementation, or record a test result or Step 6 acceptance.

## 1. Result and boundary

Step 6 implements the test-only `MR-IF-015` boundary. It adds strict fixture files, a phase-aware manifest, the 45-row S12 acceptance matrix, shared validation and runner utilities, current foundation cases, preserved Gate 6A reference data, and a private plain-language evidence summary.

It does not add or execute unavailable game rules. It does not implement a clock, energy changes, experiment transitions, manuscript transitions, scheduler, persistence, world, input, UI, Three.js, audio, cutscene, asset, fallback, full build, connected campaign journey, release, licence, deployment, visibility, or public action.

A structurally valid fixture is expected test data. It is not evidence that the expected result occurred. An actual result exists only when the approved runner executes an `executable` case and the evidence summary records the real command, date, commit, and result.

## 2. Approved source order

The candidate uses these sources in order:

1. current Leonardo decisions and the accepted Steps 1–5 records;
2. numbered design 7, design 13, and design 15;
3. frozen S02, S03, S06, S12, S13, `MR-IF-001`–`MR-IF-015`, and the accepted Step 4 and Step 5 successors;
4. current public S02, S03, and S06 code and accepted tests;
5. `docs/implementation/analysis/campaign-schedules.json` and its README as approved reference data, not runtime proof.

A fixture cannot promote a lower source over a higher source. A worker cannot change an expected result to make code pass.

## 3. Required authority corrections

### 3.1 Reference-trace count

The current JSON has these 13 stable traces:

1. `core-standard`
2. `core-supported`
3. `broader-supported`
4. `industry-only-supported`
5. `neither-standard`
6. `weakened-supported`
7. `opening-standard`
8. `opening-supported`
9. `core-late-wait-standard`
10. `opening-quality-standard`
11. `core-late-wait-supported`
12. `opening-quality-supported`
13. `broader-strong-supported`

Design 7 says 12. The analysis README separately describes the additional `broader-strong-supported` trace. Leonardo approved keeping all 13 and correcting the count on 2026-09-09. The final amendment changes only the count. It does not change trace content or claim runtime reachability.

### 3.2 Current campaign and content baseline

The historical S12 S03 fixture says campaign schema `1`, content `1.0.0`, and profile `full`. Accepted Step 4 and Step 5 authority now requires:

```text
campaign schema: 2
content envelope schema: 1
content version: 1.1.0
build profile: slice
compatible earlier content versions: []
```

`MR-S03-FIX-001-C001` uses Standard energy `4`. `C002` changes only the pressure profile to Supported and energy to `5`. Both use the accepted slice creation inventory and canonical codec. A future full fixture remains deferred until a full profile can build. No schema-1 campaign migration is inferred or created.

### 3.3 S06 phase facts

The following current S06 cases can execute:

- complete slice source and build;
- explicit full and fallback incomplete-profile rejection;
- strict source envelope, object, reference, text, placeholder, count, semantic, selected-copy, view, and ordered-issue checks; and
- valid browser-package validation for the slice.

The following remain unexecuted:

- a complete fallback package;
- a complete full package;
- a successful fallback or full build;
- content migration; and
- connected content reachability through future game rules.

S12 must no longer require a Step 6 test-only package to mark all production profiles complete. Test-only source data can contain an explicitly incomplete future profile. It cannot enter `content/`, `dist/`, or a browser package.

### 3.4 Evidence wording

Design 13 currently says that no test result exists. The final amendment changes this to: ordinary implementation tests exist for accepted Steps 1–5, while no S12 machine-readable fixture set or S12 evidence summary exists before Step 6. Historical statements remain historical.

## 4. Closed schema notation

All JSON objects are strict. Every listed key is required. A union variant omits only keys that belong to another variant. Unknown fields fail.

- `JsonValue` is `null`, a Boolean, a finite JSON number, a string, a list of `JsonValue`, or an object whose values are `JsonValue`.
- `RelativePath` is a normalized repository-relative path with `/`, no empty segment, `.` segment, `..` segment, leading `/`, backslash, NUL, URI scheme, or symbolic-link resolution.
- `JsonPointer` follows RFC 6901. The empty string `''` is the document root. `/` identifies a property whose name is empty and is not used as a root alias.
- `ShortText` is trimmed English text from 1 through 120 Unicode scalar values with no control character.
- `LongText` is trimmed English text from 1 through 1,000 Unicode scalar values with no control character.
- Every ID is ASCII and 1 through 128 characters.
- Every ID list is sorted, duplicate-free, and exact. An empty list is explicit.
- `FixtureGroupId` matches `^MR-S(?:0[2-9]|1[0-3])-[A-Z0-9]+-[0-9]{3}$` and resolves in the manifest.
- `FixtureSetupId` is `<groupId>-S<two digits>`.
- `FixtureCaseId` is `<groupId>-C<three digits>`.
- `AcceptanceId` is `MR-S12-ACC-001` through `MR-S12-ACC-045`.
- `WorkPackageId` is `MR-WP-00` through `MR-WP-09`.

A later execution target is one exact branch:

```ts
type ExecutionTarget =
  | Readonly<{ kind: 'step'; step: number }> // integer 0 through 70
  | Readonly<{ kind: 'gate'; gate: 'Gate4A' | 'Gate6A' | 'Gate26A' }>
  | Readonly<{ kind: 'release'; phase: 'releaseCandidate' }>;
```

Strict UTF-8 decoding, BOM rejection, LF and one-final-newline checks, JSON syntax, and duplicate-member detection run before schema validation. Escaped duplicate keys also fail.

## 5. Exact fixture document

Every `.fixture.json` file has this outer shape:

```ts
type FixtureDocument = Readonly<{
  identity: FixtureIdentity;
  execution: FixtureExecution;
  traceability: FixtureTraceability;
  arrange: FixtureArrange;
  act: FixtureAct;
  expect: FixtureExpectation;
}>;

type FixtureIdentity = Readonly<{
  schemaVersion: 1;
  interfaceVersion: 2;
  groupId: FixtureGroupId;
  setupId: FixtureSetupId | null;
  caseId: FixtureCaseId;
  title: ShortText;
  workPackageId: WorkPackageId;
}>;

type FixtureExecution =
  | Readonly<{
      fixtureState: 'executable';
      evidenceType: 'unit' | 'browser' | 'staticAudit';
      runnerId: RunnerId;
      availableFrom: ExecutionTarget;
      executeAt: ExecutionTarget;
      evidenceState: 'specifiedNotRun';
    }>
  | Readonly<{
      fixtureState: 'referenceOnly';
      evidenceType: 'unit' | 'staticAudit';
      runnerId: 'MR-RUN-S12-REFERENCE';
      availableFrom: ExecutionTarget;
      validateAt: Readonly<{ kind: 'step'; step: 6 }>;
      futureOperationId: DeferredOperationId;
      executeAt: ExecutionTarget;
      evidenceState: 'specifiedNotRun';
    }>;
```

A fixture file cannot have state `deferred`. A deferred case is a manifest route with `file:null`. A `referenceOnly` file is schema-checked and can be returned only by `loadReferenceFixture`. The executable loader rejects it.

The identity values must equal the manifest entry and the file name. A non-null setup ID must belong to the same group.

```ts
type FixtureTraceability = Readonly<{
  requirementIds: readonly RequirementId[];
  testIds: readonly TestId[];
  interfaceIds: readonly InterfaceId[];
  specificationRefs: readonly SpecificationRef[];
  acceptanceIds: readonly AcceptanceId[];
  contentIds: readonly ContentId[];
  textKeys: readonly TextKey[];
}>;

type SpecificationRef = Readonly<{
  documentId: SpecificationDocumentId;
  sectionId: string;
}>;
```

Each list resolves through the manifest registry. Every fixture has at least one requirement, test, interface, specification, and acceptance link. Content and text lists can be empty when they do not apply.

### 5.1 Arrange data and controlled invalid input

```ts
type FixtureArrange =
  | Readonly<{ kind: 'inline'; value: JsonValue }>
  | Readonly<{
      kind: 'resource';
      resourceId: Exclude<ResourceId, 'MR-RES-S06-SOURCE-SLICE'>;
      changes: readonly ControlledChange[];
    }>
  | Readonly<{
      kind: 'sourcePacket';
      resourceId: 'MR-RES-S06-SOURCE-SLICE';
      changes: readonly SourcePacketChange[];
    }>
  | Readonly<{ kind: 'rawJsonText'; sourceText: string }>
  | Readonly<{ kind: 'rawBytes'; bytes: readonly number[] }>;

type ControlledChange =
  | Readonly<{ operation: 'add'; path: JsonPointer; value: FixtureValue }>
  | Readonly<{ operation: 'remove'; path: JsonPointer }>
  | Readonly<{ operation: 'replace'; path: JsonPointer; value: FixtureValue }>;

type SourcePacketChange =
  | Readonly<{ operation: 'addFile'; file: RelativePath; bytes: readonly number[] }>
  | Readonly<{ operation: 'removeFile'; file: RelativePath }>
  | Readonly<{ operation: 'replaceBytes'; file: RelativePath; bytes: readonly number[] }>
  | Readonly<{ operation: 'replaceText'; file: RelativePath; sourceText: string }>
  | Readonly<{
      operation: 'editJson';
      file: RelativePath;
      changes: readonly ControlledChange[];
    }>;

type FixtureValue = JsonValue | Readonly<{ fixtureSpecialValue: SpecialValueId }>;

type SpecialValueId =
  | 'MR-SPECIAL-NAN'
  | 'MR-SPECIAL-POSITIVE-INFINITY'
  | 'MR-SPECIAL-NEGATIVE-INFINITY'
  | 'MR-SPECIAL-NEGATIVE-ZERO';
```

Each raw byte is an integer from 0 through 255. `rawJsonText` and `rawBytes` are allowed only for `MR-OP-S12-DECODE-FIXTURE-TEXT` and `MR-OP-S12-DECODE-FIXTURE-BYTES`. They make malformed bytes, a BOM, malformed JSON, and duplicate source members testable without making the containing fixture invalid.

A special value is expanded only by a runner whose operation entry lists that exact label. In Step 6, only `MR-OP-S03-VALIDATE-CAMPAIGN` permits the four special values. A special value cannot appear in an accepted domain result, source packet, manifest, matrix, content file, or browser package. An S06 non-finite-number case uses exact source text such as `1e400` and therefore passes through the real JSON decoder.

The source-packet resource starts as the 23 exact repository files in section 6.3. Each key is the complete repository-relative content path and each value is its exact `Uint8Array`. Changes run in listed order. `addFile` requires a path outside the original set and fails on an existing path. The other four operations require an original or earlier-added path. `editJson` first performs the approved strict UTF-8 and JSON decode, applies its ordered JSON-pointer changes to a deep copy, and encodes two-space JSON with LF and one final newline. `replaceText` encodes the supplied Unicode text as UTF-8 without normalization. `replaceBytes` preserves the exact supplied bytes. `removeFile` deletes the entry. The loader then creates a fresh `Map<string, Uint8Array>` in the canonical 23-path order followed by added paths in code-point order. This is the exact `RawSourceFiles` argument. It preserves malformed text, duplicate members, BOM bytes, missing files, and unlisted files for the public S06 validator.

The loader validates a normal JSON resource before applying `ControlledChange`. After changes, it validates only the fixture container, value safety, and the case-specific exact source-file and change-path allowlists. It does not run the domain validator at this point. The registered operation performs domain validation. This separation permits an intentional invalid domain input to reach the validator under test.

Resource references cannot chain. The loader deep-copies every resource and every byte array before changes. An invalid load returns no arranged value.

### 5.2 Ordered action, results, and pending work

```ts
type ValueBinding =
  | Readonly<{ kind: 'literal'; value: FixtureValue }>
  | Readonly<{ kind: 'arranged' }>
  | Readonly<{ kind: 'applicationDependencies' }>
  | Readonly<{ kind: 'result'; slotId: ResultSlotId; selector: 'whole' | 'value' }>;

type AutomatedStep =
  | Readonly<{
      number: number;
      type: 'callInterface';
      operationId: OperationId;
      arguments: readonly ValueBinding[];
      completion: 'await' | 'start';
      saveAs: ResultSlotId;
    }>
  | Readonly<{
      number: number;
      type: 'provideFake';
      callId: CallId;
      invocation: number;
      outcome: FakeOutcome;
    }>
  | Readonly<{
      number: number;
      type: 'completeFake';
      pendingId: PendingFakeCallId;
      outcome: JsonValue;
    }>
  | Readonly<{
      number: number;
      type: 'awaitResult';
      slotId: ResultSlotId;
    }>
  | Readonly<{ number: number; type: 'advanceFrame'; deltaSeconds: number }>;

type FakeOutcome =
  | Readonly<{ kind: 'success'; value: JsonValue }>
  | Readonly<{ kind: 'failure'; value: JsonValue }>
  | Readonly<{ kind: 'pending'; pendingId: PendingFakeCallId }>;

type FixtureAct =
  | Readonly<{ kind: 'automated'; steps: readonly AutomatedStep[] }>
  | Readonly<{
      kind: 'reference';
      futureOperationId: DeferredOperationId;
      input: ValueBinding;
    }>;
```

Step numbers start at 1 and increase by 1. `ResultSlotId` matches `^result[0-9]{2}$` and is assigned once. `PendingFakeCallId` matches `^pending[0-9]{2}$` and is assigned once. A result binding can use only an earlier settled slot. Selector `value` is valid only for a registered checked-result operation. It passes the actual checked object, including an opaque `ValidatedSourceCatalogue`, without JSON conversion or reconstruction.

`applicationDependencies` is allowed only as the first argument of `MR-OP-S02-CREATE-APPLICATION`. It creates a fresh `ApplicationDependencies` object from the exact registered application fakes. A literal second argument selects the accepted temporary content mode. The result is the real public `ApplicationController`, which later steps bind by result slot. No fixture can supply a private controller or dependency function.

Each `provideFake` appends one outcome to that exact registered call method's per-case first-in, first-out invocation queue. Invocation numbers for one call ID start at 1, increase by 1, and cannot repeat. Unconfigured methods use the accepted fake's registered immediate default. A configured method call consumes only its next configured invocation. A `pending` outcome creates the named unresolved invocation. `completeFake` is valid only after that call has consumed its pending outcome. It settles only that `pendingId`; a later invocation of the same call is separate and can use another pending ID.

`completion:'start'` stores the operation promise without awaiting it, then drains controlled microtasks until the operation consumes its first configured pending fake or becomes quiescent. `awaitResult` settles the named operation only after every fake needed by that operation settles, then drains controlled microtasks until the next configured pending fake is consumed or the runner is quiescent. For the serialized S02 request queue, invocation 2 cannot be consumed until invocation 1 settles. After the first request result settles, the drain makes invocation 2 available for completion. This models the two distinct promises in the accepted application test.

A missing configured invocation, skipped invocation number, completion before consumption, repeated completion, pending-ID reuse, second await, unsettled result binding, unused configured outcome, or pending result at case end fails fixture execution.

An `advanceFrame` value is finite and from 0 through 0.25 seconds. The normal value is `0.016`. No action can use a function, expression, script, environment substitution, wall clock, real wait, random value, network request, screen coordinate, fragile selector, or arbitrary campaign field name.

### 5.3 Exact expectations

```ts
type StepResultExpectation =
  | Readonly<{ slotId: ResultSlotId; kind: 'json'; value: JsonValue }>
  | Readonly<{
      slotId: ResultSlotId;
      kind: 'opaque';
      opaqueType: 'ApplicationController';
    }>
  | Readonly<{
      slotId: ResultSlotId;
      kind: 'checkedOpaque';
      resultKind: 'valid';
      opaqueType: 'ValidatedSourceCatalogue';
    }>
  | Readonly<{
      slotId: ResultSlotId;
      kind: 'checkedValue';
      resultKind: 'valid';
      validatorId: 'MR-VAL-S06-BUILT-PACKAGE';
    }>;

type FixtureExpectation =
  | Readonly<{
      outcome: 'applied' | 'rejected' | 'fault' | 'static';
      code: string | null;
      context: JsonValue | null;
      stepResults: readonly StepResultExpectation[];
      calls: readonly ExpectedCall[];
      observations: readonly StaticObservation[];
      unchangedPaths: readonly JsonPointer[];
    }>
  | Readonly<{
      outcome: 'reference';
      expectedMeaning: JsonValue;
      unchangedPaths: readonly JsonPointer[];
    }>;

type ExpectedCall = Readonly<{
  sequence: number;
  callId: CallId;
  arguments: readonly JsonValue[];
}>;

type StaticObservation = Readonly<{
  checkId: StaticCheckId;
  expected: JsonValue;
}>;

type EvidenceSummary =
  | Readonly<{
      schemaVersion: 1;
      step: 6;
      recordKind: 'controlledExample';
      testedCommit: null;
      executedOn: null;
      overall: 'schemaOnly';
      commandResults: readonly [];
      counts: EvidenceCounts;
      metrics: null;
      audits: EvidenceAudits<'specifiedNotRun'>;
      controlledInvalid: ControlledInvalidEvidence;
      knownLimits: readonly KnownLimitId[];
      laterOwners: readonly WorkPackageId[];
    }>
  | Readonly<{
      schemaVersion: 1;
      step: 6;
      recordKind: 'executionEvidence';
      testedCommit: string;
      executedOn: string;
      overall: 'passed';
      commandResults: readonly [
        Readonly<{ command: 'npm run check'; result: 'passed' }>,
        Readonly<{ command: 'npm run verify'; result: 'passed' }>,
        Readonly<{ command: 'git diff --check'; result: 'passed' }>,
      ];
      counts: EvidenceCounts;
      metrics: EvidenceMetrics;
      audits: EvidenceAudits<'passed'>;
      controlledInvalid: ControlledInvalidEvidence;
      knownLimits: readonly KnownLimitId[];
      laterOwners: readonly WorkPackageId[];
    }>;

type EvidenceCounts = Readonly<{
  executable: 103;
  referenceOnly: 48;
  deferredCases: number;
  deferredSetups: 41;
}>;
type EvidenceMetrics = Readonly<{
  unitTests: number;
  lineCoverageBasisPoints: number;
  branchCoverageBasisPoints: number;
  profileBuilds: number;
  sliceModules: number;
  browserTests: Readonly<{ chromium: number; firefox: number; webkit: number }>;
}>;
type EvidenceAudits<T extends 'specifiedNotRun' | 'passed'> = Readonly<{
  traceability: T;
  documents: T;
  runtimeImportBoundary: T;
  buildOutputBoundary: T;
}>;
type ControlledInvalidEvidence = Readonly<{
  caseId: FixtureCaseId;
  issueCode: FixtureIssueCode;
  safeMessage: 'Fixture package validation failed.';
}>;
type KnownLimitId =
  | 'noPlayableFeature'
  | 'noCampaignJourney'
  | 'fallbackIncomplete'
  | 'fullIncomplete'
  | 'futureRoutesDeferred';
```

The operation registry fixes the permitted outcome, code, context, and result shape for each operation. Exact deep equality is the default. Lists retain order. JSON object members compare by canonical key order. `opaque` proves that the value is the controller created in the same case. `checkedOpaque` proves only the registered opaque brand and checked-result branch; a later bound operation must prove its usable meaning. `checkedValue` runs the named validator against the actual settled value and accepts no substitute. Numeric tolerance is unavailable in Step 6.

An execution-evidence commit is exactly 40 lowercase hexadecimal characters. Its date is an ISO `YYYY-MM-DD` date. Counts and metrics are non-negative integers; coverage uses integer basis points from 0 through 10,000. Actual execution must equal the fixed executable, reference-only, and setup totals. Known-limit and later-owner IDs are sorted, duplicate-free, and equal the manifest's remaining boundaries. The controlled example is schema evidence only and cannot satisfy the evidence-record audit.

`docs/evidence/step-06-foundation.md` has this exact heading order: `# Step 6 fixture foundation evidence`; `## Result`; `## Commands`; `## Fixture counts`; `## Execution metrics`; `## Audits`; `## Controlled invalid fixture`; `## Known limits`; `## Later owners`. `Result` is a two-column table for date, tested commit, record kind, and overall result. `Commands` lists the three exact command rows in type order. `Fixture counts` lists executable, reference-only, deferred-case, and deferred-setup counts. `Execution metrics` lists unit tests, line and branch basis points, profile builds, slice modules, then Chromium, Firefox, and WebKit tests. `Audits` lists the four named audit results. `Controlled invalid fixture` lists case ID, issue code, and the fixed safe message. `Known limits` and `Later owners` are one sorted ID per bullet. No other heading, table column, raw log, machine path, or free-form result claim is allowed.

`MR-OP-S12-VALIDATE-EVIDENCE-SHAPE` accepts both strict branches and is used by `MR-S12-EVD-001-C001` with a controlled example. `MR-OP-S12-AUDIT-EVIDENCE` accepts only the exact execution-evidence document and compares it with the manifest and observed results supplied by the primary. It rejects a controlled example, missing field, extra field, mismatch, or raw log.

`unchangedPaths` is sorted and duplicate-free. Each pointer resolves against the arranged input or a registered fake-store snapshot. Wildcards, automatic snapshots, images, and screenshots are forbidden.

## 6. Closed manifest and registries

```ts
type FixtureManifest = Readonly<{
  schemaVersion: 1;
  interfaceVersion: 2;
  packageId: 'minor-revisions-fixtures';
  repositoryRoot: '.';
  acceptanceMatrixFile: 'tests/fixtures/acceptance-matrix.json';
  registries: FixtureRegistries;
  resources: readonly ResourceEntry[];
  groups: readonly GroupEntry[];
  setups: readonly SetupEntry[];
  cases: readonly CaseEntry[];
}>;

type FixtureRegistries = Readonly<{
  requirements: readonly AuthorityEntry[];
  tests: readonly AuthorityEntry[];
  interfaces: readonly AuthorityEntry[];
  acceptanceRows: readonly AuthorityEntry[];
  specifications: readonly SpecificationEntry[];
  workPackages: readonly AuthorityEntry[];
  contentSource: ContentRegistrySource;
  operations: readonly OperationEntry[];
  deferredOperations: readonly DeferredOperationEntry[];
  runners: readonly RunnerEntry[];
  fakes: readonly FakeEntry[];
  calls: readonly CallEntry[];
  staticChecks: readonly StaticCheckEntry[];
  validators: readonly ValidatorEntry[];
  specialValues: readonly SpecialValueEntry[];
}>;

type AuthorityEntry = Readonly<{ id: string; source: RelativePath }>;
type SpecificationEntry = Readonly<{
  documentId: SpecificationDocumentId;
  file: RelativePath;
  sectionIds: readonly string[];
}>;
type ContentRegistrySource = Readonly<{
  resourceId: 'MR-RES-S06-SOURCE-SLICE';
  expectedItemCount: 97;
  expectedTextKeyCount: 213;
  contentVersion: '1.1.0';
  profileId: 'slice';
}>;
```

The authority entries are closed at the authorization commit: all approved requirement IDs in design 15, the 13 top-level test IDs in S12, `MR-IF-001` through `MR-IF-015`, `MR-S12-ACC-001` through `045`, and `MR-WP-00` through `09`. Specification entries contain only headings cited by a case or matrix row. The validator derives their exact slugs from the registered Markdown files and rejects a missing or extra registered slug. Content IDs and text keys come only from the checked Step 5 slice source packet and must equal 97 and 213. They are not copied into a second authority list.

```ts
type RunnerId =
  | 'MR-RUN-S02-APPLICATION'
  | 'MR-RUN-S02-BOOTSTRAP'
  | 'MR-RUN-S02-IMPORT-AUDIT'
  | 'MR-RUN-S03-CAMPAIGN'
  | 'MR-RUN-S06-SOURCE'
  | 'MR-RUN-S06-BUILT'
  | 'MR-RUN-S12-FIXTURE'
  | 'MR-RUN-S12-REFERENCE'
  | 'MR-RUN-S12-TRACE'
  | 'MR-RUN-S12-DOCUMENT';

type ResourceId =
  | 'MR-RES-S03-SLICE-STANDARD'
  | 'MR-RES-S03-SLICE-SUPPORTED'
  | 'MR-RES-S06-SOURCE-SLICE'
  | 'MR-RES-S12-CAMPAIGN-TRACES'
  | 'MR-RES-S12-SEMANTIC-CASES'
  | 'MR-RES-S12-LASER-OUTCOMES';

type StaticCheckId =
  | 'MR-CHECK-S02-IMPORTS'
  | 'MR-CHECK-S12-TRACE'
  | 'MR-CHECK-S12-DOCUMENTS'
  | 'MR-CHECK-S12-EVIDENCE'
  | 'MR-CHECK-S12-NO-RUNTIME-IMPORT'
  | 'MR-CHECK-S12-NO-BUILD-OUTPUT';

type ValidatorId =
  | 'MR-VAL-S03-CAMPAIGN'
  | 'MR-VAL-S06-SOURCE-PACKET'
  | 'MR-VAL-S06-BUILT-PACKAGE'
  | 'MR-VAL-S12-CAMPAIGN-TRACES'
  | 'MR-VAL-S12-SEMANTIC-CASES'
  | 'MR-VAL-S12-LASER-OUTCOMES'
  | 'MR-VAL-S12-FIXTURE'
  | 'MR-VAL-S12-MANIFEST'
  | 'MR-VAL-S12-MATRIX'
  | 'MR-VAL-S12-EVIDENCE';
```

`OperationId`, `FakeId`, and `CallId` are closed unions generated from the exact entries in sections 6.1 and 6.2. They accept no value outside those tables. `RequirementId`, `TestId`, `InterfaceId`, `ContentId`, `TextKey`, and `SpecificationDocumentId` are strings only after exact registry resolution; they are not open string types.

```ts
type InputKindId =
  | 'ApplicationDependenciesAndContent'
  | 'ApplicationController'
  | 'ApplicationControllerAndRequest'
  | 'ApplicationControllerAndFrame'
  | 'StartupDependencies'
  | 'BootstrapContentAndFactories'
  | 'RelativeTypeScriptSources'
  | 'CampaignCreationInput'
  | 'UnknownCampaign'
  | 'CampaignJsonText'
  | 'CampaignState'
  | 'RawSourceFiles'
  | 'ValidatedSourceAndProfile'
  | 'UnknownBuiltContent'
  | 'CampaignAndBuiltContent'
  | 'UnknownFixtureSet'
  | 'FixtureCaseId'
  | 'ManifestAndMatrix'
  | 'RegisteredMarkdownFiles'
  | 'EvidenceSummary'
  | 'FixtureJsonText'
  | 'FixtureBytes';

type ResultKindId =
  | 'ApplicationController'
  | 'ApplicationOperationResult'
  | 'BootstrapHandle'
  | 'OrderedImportViolations'
  | 'CheckedCampaignState'
  | 'CheckedCampaignJsonText'
  | 'CheckedValidatedSourceCatalogue'
  | 'CheckedBuiltContentPackage'
  | 'CheckedValidatedContent'
  | 'CheckedFixtureSet'
  | 'CheckedFixtureDocument'
  | 'OrderedFixtureIssues';

type ArgumentKindId = 'none' | 'FrameUpdate' | 'JsonValue' | 'ApplicationRequest';
type DefaultFakeOutcomeId =
  'voidSuccess' | 'emptyObject' | 'compatibilitySupported' | 'contentFailureShown';
type ValueKindId =
  | 'CampaignState'
  | 'RawSourcePacket'
  | 'BuiltContentPackage'
  | 'CampaignReferenceTraces'
  | 'SemanticCases'
  | 'LaserOutcomes'
  | 'FixtureDocument'
  | 'FixtureManifest'
  | 'AcceptanceMatrix'
  | 'EvidenceSummary';

type DeferredOperationId =
  | 'MR-OP-S03-COMPARE-TRANSITION'
  | 'MR-OP-S04-APPLY-COMMAND'
  | 'MR-OP-S05-PROCESS-CROSSED-PERIOD'
  | 'MR-OP-S07-MIGRATE-CAMPAIGN'
  | 'MR-OP-S23-VALIDATE-SCIENTIFIC-FACTS';

type DeferredInputKindId =
  | 'CampaignTransitionPair'
  | 'CampaignStateAndRuleCommand'
  | 'CampaignStateAndCrossing'
  | 'StoredCampaignAndContent'
  | 'CampaignAndScientificContent';
type DeferredResultKindId =
  | 'TransitionComparisonResult'
  | 'RuleCommandResult'
  | 'SafePointResult'
  | 'MigrationResult'
  | 'ConnectedScientificFactResult';
type DeferredOperationEntry = Readonly<{
  id: DeferredOperationId;
  owner: WorkPackageId;
  firstAvailableAt: ExecutionTarget;
  inputKind: DeferredInputKindId;
  resultKind: DeferredResultKindId;
}>;

type OperationEntry = Readonly<{
  id: OperationId;
  owner: WorkPackageId;
  runnerId: RunnerId;
  availableFrom: ExecutionTarget;
  inputKind: InputKindId;
  resultKind: ResultKindId;
  specialValues: readonly SpecialValueId[];
}>;

type RunnerEntry = Readonly<{
  id: RunnerId;
  owner: WorkPackageId;
  operationIds: readonly OperationId[];
}>;

type FakeEntry = Readonly<{
  id: FakeId;
  owner: 'bootstrap' | 'application';
  callIds: readonly CallId[];
  outcomes: readonly ('success' | 'failure' | 'pending')[];
}>;

type CallEntry = Readonly<{
  id: CallId;
  fakeId: FakeId;
  owner: 'bootstrap' | 'application';
  argumentKind: ArgumentKindId;
  defaultOutcomeId: DefaultFakeOutcomeId;
}>;

type StaticCheckEntry = Readonly<{
  id: StaticCheckId;
  owner: WorkPackageId;
  resultKind: ResultKindId;
}>;

type ValidatorEntry = Readonly<{
  id: ValidatorId;
  owner: WorkPackageId;
  valueKind: ValueKindId;
}>;

type SpecialValueEntry = Readonly<{
  id: SpecialValueId;
  allowedOperationIds: readonly OperationId[];
}>;
```

### 6.1 Current operation and runner entries

| Runner                    | Exact public operations                                                                                                                              | Input and result authority                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `MR-RUN-S02-APPLICATION`  | `MR-OP-S02-CREATE-APPLICATION`, `MR-OP-S02-START-APPLICATION`, `MR-OP-S02-REQUEST`, `MR-OP-S02-UPDATE-FRAME`, `MR-OP-S02-STOP-APPLICATION`           | `src/application/index.ts`; S02; accepted application tests                                        |
| `MR-RUN-S02-BOOTSTRAP`    | `MR-OP-S02-START-STARTUP-COORDINATOR`, `MR-OP-S02-BOOTSTRAP-WITH-CONTENT`                                                                            | `src/bootstrap/index.ts`; `createStartupCoordinatorForTests`; `createApplicationBootstrapForTests` |
| `MR-RUN-S02-IMPORT-AUDIT` | `MR-OP-S02-IMPORT-AUDIT`                                                                                                                             | accepted architecture test; relative source paths and ordered violations                           |
| `MR-RUN-S03-CAMPAIGN`     | `MR-OP-S03-CREATE-CAMPAIGN`, `MR-OP-S03-VALIDATE-CAMPAIGN`, `MR-OP-S03-PARSE-CAMPAIGN`, `MR-OP-S03-SERIALIZE-CAMPAIGN`                               | `src/rules/index.ts`; `CheckedResult` uses `success` or `failure`                                  |
| `MR-RUN-S06-SOURCE`       | `MR-OP-S06-VALIDATE-SOURCE`, `MR-OP-S06-BUILD-PROFILE`                                                                                               | `src/content/index.ts`; the build operation accepts the opaque value from the prior valid result   |
| `MR-RUN-S06-BUILT`        | `MR-OP-S06-VALIDATE-BUILT`, `MR-OP-S06-VALIDATE-STATE-CONTENT`                                                                                       | `src/content/index.ts`; accepted Step 5 result and issue unions                                    |
| `MR-RUN-S12-FIXTURE`      | `MR-OP-S12-DECODE-FIXTURE-TEXT`, `MR-OP-S12-DECODE-FIXTURE-BYTES`, `MR-OP-S12-VALIDATE-SET`, `MR-OP-S12-LOAD-EXECUTABLE`, `MR-OP-S12-LOAD-REFERENCE` | this contract                                                                                      |
| `MR-RUN-S12-TRACE`        | `MR-OP-S12-AUDIT-TRACE`                                                                                                                              | manifest and 45-row matrix                                                                         |
| `MR-RUN-S12-REFERENCE`    | no executable operation; validates `referenceOnly` shape and rejects execution                                                                       | this contract; later operation and execution target must be registered                             |
| `MR-RUN-S12-DOCUMENT`     | `MR-OP-S12-AUDIT-DOCUMENTS`, `MR-OP-S12-VALIDATE-EVIDENCE-SHAPE`, `MR-OP-S12-AUDIT-EVIDENCE`                                                         | registered Markdown and evidence summaries                                                         |

The operation registry fixes each input and result ID:

| Operation                             | Input kind                          | Result kind                       |
| ------------------------------------- | ----------------------------------- | --------------------------------- |
| `MR-OP-S02-CREATE-APPLICATION`        | `ApplicationDependenciesAndContent` | `ApplicationController`           |
| `MR-OP-S02-START-APPLICATION`         | `ApplicationController`             | `ApplicationOperationResult`      |
| `MR-OP-S02-REQUEST`                   | `ApplicationControllerAndRequest`   | `ApplicationOperationResult`      |
| `MR-OP-S02-UPDATE-FRAME`              | `ApplicationControllerAndFrame`     | `ApplicationOperationResult`      |
| `MR-OP-S02-STOP-APPLICATION`          | `ApplicationController`             | `ApplicationOperationResult`      |
| `MR-OP-S02-START-STARTUP-COORDINATOR` | `StartupDependencies`               | `BootstrapHandle`                 |
| `MR-OP-S02-BOOTSTRAP-WITH-CONTENT`    | `BootstrapContentAndFactories`      | `BootstrapHandle`                 |
| `MR-OP-S02-IMPORT-AUDIT`              | `RelativeTypeScriptSources`         | `OrderedImportViolations`         |
| `MR-OP-S03-CREATE-CAMPAIGN`           | `CampaignCreationInput`             | `CheckedCampaignState`            |
| `MR-OP-S03-VALIDATE-CAMPAIGN`         | `UnknownCampaign`                   | `CheckedCampaignState`            |
| `MR-OP-S03-PARSE-CAMPAIGN`            | `CampaignJsonText`                  | `CheckedCampaignState`            |
| `MR-OP-S03-SERIALIZE-CAMPAIGN`        | `CampaignState`                     | `CheckedCampaignJsonText`         |
| `MR-OP-S06-VALIDATE-SOURCE`           | `RawSourceFiles`                    | `CheckedValidatedSourceCatalogue` |
| `MR-OP-S06-BUILD-PROFILE`             | `ValidatedSourceAndProfile`         | `CheckedBuiltContentPackage`      |
| `MR-OP-S06-VALIDATE-BUILT`            | `UnknownBuiltContent`               | `CheckedValidatedContent`         |
| `MR-OP-S06-VALIDATE-STATE-CONTENT`    | `CampaignAndBuiltContent`           | `CheckedCampaignState`            |
| `MR-OP-S12-DECODE-FIXTURE-TEXT`       | `FixtureJsonText`                   | `CheckedFixtureDocument`          |
| `MR-OP-S12-DECODE-FIXTURE-BYTES`      | `FixtureBytes`                      | `CheckedFixtureDocument`          |
| `MR-OP-S12-VALIDATE-SET`              | `UnknownFixtureSet`                 | `CheckedFixtureSet`               |
| `MR-OP-S12-LOAD-EXECUTABLE`           | `FixtureCaseId`                     | `CheckedFixtureDocument`          |
| `MR-OP-S12-LOAD-REFERENCE`            | `FixtureCaseId`                     | `CheckedFixtureDocument`          |
| `MR-OP-S12-AUDIT-TRACE`               | `ManifestAndMatrix`                 | `OrderedFixtureIssues`            |
| `MR-OP-S12-AUDIT-DOCUMENTS`           | `RegisteredMarkdownFiles`           | `OrderedFixtureIssues`            |
| `MR-OP-S12-VALIDATE-EVIDENCE-SHAPE`   | `EvidenceSummary`                   | `OrderedFixtureIssues`            |
| `MR-OP-S12-AUDIT-EVIDENCE`            | `EvidenceSummary`                   | `OrderedFixtureIssues`            |

Each result ID maps to the exact exported union named in the authority column above. `CheckedCampaignState` uses `{kind:'success',value}` or `{kind:'failure',issue}`. S06 checked results use `{kind:'valid',value}` or `{kind:'invalid',issues}`. Fixture results use the same `valid` or `invalid` labels defined in section 7. The registry cannot rename a public discriminant.

Deferred operation IDs are `MR-OP-S03-COMPARE-TRANSITION`, `MR-OP-S04-APPLY-COMMAND`, `MR-OP-S05-PROCESS-CROSSED-PERIOD`, `MR-OP-S07-MIGRATE-CAMPAIGN`, and `MR-OP-S23-VALIDATE-SCIENTIFIC-FACTS`. They can appear only in deferred routes or as a `referenceOnly` case's future operation. `SEM-18` uses the S07 migration operation at Step 14. No Step 6 runner exposes a deferred operation.

| Deferred operation                    | Owner      | First available | Input kind                     | Result kind                     |
| ------------------------------------- | ---------- | --------------- | ------------------------------ | ------------------------------- |
| `MR-OP-S03-COMPARE-TRANSITION`        | `MR-WP-01` | Step 18         | `CampaignTransitionPair`       | `TransitionComparisonResult`    |
| `MR-OP-S04-APPLY-COMMAND`             | `MR-WP-01` | Step 18         | `CampaignStateAndRuleCommand`  | `RuleCommandResult`             |
| `MR-OP-S05-PROCESS-CROSSED-PERIOD`    | `MR-WP-01` | Step 19         | `CampaignStateAndCrossing`     | `SafePointResult`               |
| `MR-OP-S07-MIGRATE-CAMPAIGN`          | `MR-WP-02` | Step 14         | `StoredCampaignAndContent`     | `MigrationResult`               |
| `MR-OP-S23-VALIDATE-SCIENTIFIC-FACTS` | `MR-WP-01` | Step 23         | `CampaignAndScientificContent` | `ConnectedScientificFactResult` |

Each `referenceOnly` case resolves `futureOperationId` in this registry and has `executeAt` at or after `firstAvailableAt`. The deferred registry does not create a runner or callable operation in Step 6.

The four special values are permitted only for the S03 campaign validator cases that test invalid numbers. Raw wrapper text and bytes are permitted only for the two S12 fixture-decoder operations. S06 malformed, duplicate-member, BOM, and non-finite cases use `sourcePacket` changes and the public content decoder.

### 6.2 Exact fake and call entries

The application fake IDs are `MR-FAKE-S02-PLATFORM`, `MR-FAKE-S02-TIMING`, `MR-FAKE-S02-DIAGNOSTICS`, `MR-FAKE-S02-PERSISTENCE`, `MR-FAKE-S02-INPUT`, `MR-FAKE-S02-UI`, `MR-FAKE-S02-PLAYER`, `MR-FAKE-S02-WORLD`, `MR-FAKE-S02-INTERACTION`, `MR-FAKE-S02-RENDERING`, `MR-FAKE-S02-AUDIO`, and `MR-FAKE-S02-CUTSCENE`. Bootstrap adds `MR-FAKE-S02-COMPATIBILITY`, `MR-FAKE-S02-START-APPLICATION`, and `MR-FAKE-S02-CONTENT-FAILURE-PRESENTER`. The browser-event and semantic-action registries are empty in Step 6.

The exact call IDs are:

- startup: `MR-CALL-S02-PLATFORM-START`, `MR-CALL-S02-PERSISTENCE-START`, `MR-CALL-S02-INTERACTION-START`, `MR-CALL-S02-PLAYER-START`, `MR-CALL-S02-WORLD-START`, `MR-CALL-S02-RENDERING-START`, `MR-CALL-S02-UI-START`, `MR-CALL-S02-AUDIO-START`, `MR-CALL-S02-CUTSCENES-START`, `MR-CALL-S02-TIMING-START`, and `MR-CALL-S02-INPUT-START`;
- stop: the same owner names with suffix `-STOP`, in the accepted input, timing, cutscenes, audio, UI, rendering, world, player, interaction, persistence, platform order;
- partial cleanup: `MR-CALL-S02-WORLD-PARTIAL-STOP`, between failed world start and player stop;
- request and frame: `MR-CALL-S02-PERSISTENCE-CLEAR`, `MR-CALL-S02-INPUT-READ-FRAME`, `MR-CALL-S02-CUTSCENES-UPDATE-FRAME`, `MR-CALL-S02-PLAYER-UPDATE-FRAME`, `MR-CALL-S02-WORLD-GET-MOVEMENT`, `MR-CALL-S02-WORLD-UPDATE-FRAME`, `MR-CALL-S02-WORLD-GET-INTERACTION`, `MR-CALL-S02-INTERACTION-UPDATE-FRAME`, `MR-CALL-S02-AUDIO-UPDATE-FRAME`, `MR-CALL-S02-UI-UPDATE-FRAME`, and `MR-CALL-S02-RENDERING-RENDER`;
- bootstrap: `MR-CALL-S02-CHECK-COMPATIBILITY`, `MR-CALL-S02-CANCEL-COMPATIBILITY`, `MR-CALL-S02-SHOW-CHECKING`, `MR-CALL-S02-SHOW-READY`, `MR-CALL-S02-SHOW-BLOCKED`, `MR-CALL-S02-SHOW-FATAL`, `MR-CALL-S02-CREATE-DEPENDENCIES`, `MR-CALL-S02-CREATE-CONTROLLER`, `MR-CALL-S02-START-CONTROLLER`, and `MR-CALL-S02-SHOW-CONTENT-FAILURE`.

Each fake entry lists its exact call IDs. Each call entry binds one fake, the exact argument shape in the named public port, and the accepted fake's immediate default. `voidSuccess` returns or resolves `undefined`; `emptyObject` supplies the exact empty read-frame, movement, player, or interaction object; `compatibilitySupported` supplies the accepted supported report; and `contentFailureShown` records the safe content-failure presentation. A fixture override must name the call ID and one permitted outcome from its owning fake. A fixture cannot use display strings from existing fake logs as an operation ID.

### 6.3 Resources and validators

```ts
type ResourceEntry = Readonly<{
  id: ResourceId;
  owner: WorkPackageId;
  source:
    | Readonly<{ kind: 'jsonFile'; file: RelativePath }>
    | Readonly<{ kind: 'sourcePacket'; files: readonly RelativePath[] }>;
  validatorId: ValidatorId;
}>;
```

| Resource ID                  | Exact source                                                                                                                                                           | Validator and allowed changes                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `MR-RES-S03-SLICE-STANDARD`  | `tests/fixtures/resources/campaign-slice-standard.json`; created by the accepted public operation with `buildProfileId:'slice'` and then checked against S03           | `MR-VAL-S03-CAMPAIGN`; each linked case lists its exact changed pointer      |
| `MR-RES-S03-SLICE-SUPPORTED` | `tests/fixtures/resources/campaign-slice-supported.json`; only pressure and energy differ                                                                              | `MR-VAL-S03-CAMPAIGN`; each linked case lists its exact changed pointer      |
| `MR-RES-S06-SOURCE-SLICE`    | the exact 23 files under `content/`: 18 data files, manifest, strings, three profiles                                                                                  | `MR-VAL-S06-SOURCE-PACKET`; each linked case lists an exact file and pointer |
| `MR-RES-S12-CAMPAIGN-TRACES` | checked copy from `docs/implementation/analysis/campaign-schedules.json` to `tests/fixtures/resources/campaign-reference-traces.json`                                  | `MR-VAL-S12-CAMPAIGN-TRACES`; no changes                                     |
| `MR-RES-S12-SEMANTIC-CASES`  | checked copy from `docs/implementation/analysis/semantic-cases.json` to `tests/fixtures/resources/semantic-cases.json`                                                 | `MR-VAL-S12-SEMANTIC-CASES`; no changes                                      |
| `MR-RES-S12-LASER-OUTCOMES`  | exact 144 rows from `content/data/experiments.json` plus the accepted Step 5 claim and rehearsal facts, copied to `tests/fixtures/resources/slice-laser-outcomes.json` | `MR-VAL-S12-LASER-OUTCOMES`; no changes                                      |

The source-packet entry contains these 23 paths in this exact order:

```text
content/data/actions.json
content/data/audio.json
content/data/characters.json
content/data/citations.json
content/data/contextual-lines.json
content/data/endings.json
content/data/environmental-items.json
content/data/events.json
content/data/experiments.json
content/data/interface.json
content/data/locations.json
content/data/messages.json
content/data/notifications.json
content/data/records.json
content/data/room-states.json
content/data/scenes.json
content/data/tasks.json
content/data/tutorials.json
content/manifest.json
content/profiles/fallback.json
content/profiles/full.json
content/profiles/slice.json
content/strings.en.json
```

`MR-VAL-S06-BUILT-PACKAGE` applies the accepted public built-package validator to a value returned by `MR-OP-S06-BUILD-PROFILE`. It is not a seventh resource validator.

The validator can use file discovery only to reject an unexpected path. It cannot use discovery to select source.

`ValidatorId` is the six resource IDs in the table, `MR-VAL-S06-BUILT-PACKAGE`, plus `MR-VAL-S12-FIXTURE`, `MR-VAL-S12-MANIFEST`, `MR-VAL-S12-MATRIX`, and `MR-VAL-S12-EVIDENCE`. Static check IDs are `MR-CHECK-S02-IMPORTS`, `MR-CHECK-S12-TRACE`, `MR-CHECK-S12-DOCUMENTS`, `MR-CHECK-S12-EVIDENCE`, `MR-CHECK-S12-NO-RUNTIME-IMPORT`, and `MR-CHECK-S12-NO-BUILD-OUTPUT`.

### 6.4 Groups, setups, and cases

```ts
type GroupEntry = Readonly<{
  groupId: FixtureGroupId;
  workPackageIds: readonly WorkPackageId[];
  specificationRefs: readonly SpecificationRef[];
  currentRouteState: 'complete' | 'partial' | 'deferred';
  requiredSetupCount: number | null;
  requiredCaseCount: number | null;
  route: GroupRoute;
}>;

type GroupRoute =
  | Readonly<{ kind: 'milestones'; targets: readonly ExecutionTarget[] }>
  | Readonly<{ kind: 'continuous'; firstAt: ExecutionTarget }>;

type SetupEntry = Readonly<{
  setupId: FixtureSetupId;
  groupId: FixtureGroupId;
  fixtureState: 'executable' | 'referenceOnly' | 'deferred';
  file: RelativePath | null;
  workPackageId: WorkPackageId;
  executeAt: ExecutionTarget;
}>;

type CaseEntry = Readonly<{
  caseId: FixtureCaseId;
  groupId: FixtureGroupId;
  file: RelativePath | null;
  fixtureState: 'executable' | 'referenceOnly' | 'deferred';
  workPackageId: WorkPackageId;
  executeAt: ExecutionTarget;
  operationId: OperationId | null;
  allowedSourceFiles: readonly RelativePath[];
  allowedChangePaths: readonly JsonPointer[];
  multiChangeReason: string | null;
}>;
```

A present file must be listed. A listed `executable` or `referenceOnly` file must exist and cannot be a symbolic link. A deferred case requires `file:null`, a later target, `operationId:null`, empty change allowlists, and no expected result. A deferred setup requires `file:null` and a later target. A group owner list is sorted, duplicate-free, and exact; each later fixture still has one `workPackageId`. A milestone target list is ordered by roadmap sequence and has no duplicate. A continuous route is allowed only for S13 governance groups. A deferred group with no finite approved case count uses `null`; a later amendment must close its count before that group's implementation.

Manual procedure files are deferred. Before the first Leonardo play review at Step 31, `MR-IF-015` must add a strict manual-procedure document with purpose, acceptance ID, build, state, device, browser, viewport, profile, settings, numbered actions, observations, pass condition, failure response, and privacy limits. Release measurement procedures are deferred to `releaseCandidate`. Step 6 does not create an empty manual file.

## 7. Validation result and contract examples

```ts
type FixtureIssueCode =
  | 'malformedJson'
  | 'invalidManifest'
  | 'invalidAcceptanceMatrix'
  | 'invalidFixture'
  | 'invalidId'
  | 'duplicateId'
  | 'missingFile'
  | 'unlistedFile'
  | 'unsafePath'
  | 'symbolicLink'
  | 'missingReference'
  | 'circularResource'
  | 'wrongOwner'
  | 'wrongFixtureState'
  | 'countMismatch'
  | 'invalidTrace'
  | 'invalidOperation'
  | 'invalidBinding'
  | 'forbiddenResultClaim'
  | 'documentConflict';

type FixtureIssue = Readonly<{
  code: FixtureIssueCode;
  file: RelativePath;
  path: JsonPointer;
  id: string | null;
}>;

type FixtureResult<T> =
  | Readonly<{ kind: 'valid'; value: T }>
  | Readonly<{ kind: 'invalid'; issues: readonly FixtureIssue[] }>;
```

Issues use the union order above, then manifest file order, case ID, JSON pointer, and ID. They contain no rejected value, absolute path, stack, private data, or user data. Invalid input returns no checked manifest, matrix, resource, fixture, or set.

### 7.1 Complete valid example

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S06-VAL-001",
    "setupId": null,
    "caseId": "MR-S06-VAL-001-C002",
    "title": "The slice source catalogue validates",
    "workPackageId": "MR-WP-01"
  },
  "execution": {
    "fixtureState": "executable",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S06-SOURCE",
    "availableFrom": { "kind": "step", "step": 5 },
    "executeAt": { "kind": "step", "step": 6 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-CONTENT-001", "MR-REQ-TECH-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-CONT-001", "MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-006", "MR-IF-015"],
    "specificationRefs": [
      { "documentId": "S06", "sectionId": "one-source-catalogue" },
      { "documentId": "S12", "sectionId": "s06-content-packages" }
    ],
    "acceptanceIds": ["MR-S12-ACC-017", "MR-S12-ACC-019"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": {
    "kind": "sourcePacket",
    "resourceId": "MR-RES-S06-SOURCE-SLICE",
    "changes": []
  },
  "act": {
    "kind": "automated",
    "steps": [
      {
        "number": 1,
        "type": "callInterface",
        "operationId": "MR-OP-S06-VALIDATE-SOURCE",
        "arguments": [{ "kind": "arranged" }],
        "completion": "await",
        "saveAs": "result00"
      },
      {
        "number": 2,
        "type": "callInterface",
        "operationId": "MR-OP-S06-BUILD-PROFILE",
        "arguments": [
          { "kind": "result", "slotId": "result00", "selector": "value" },
          { "kind": "literal", "value": "slice" }
        ],
        "completion": "await",
        "saveAs": "result01"
      }
    ]
  },
  "expect": {
    "outcome": "applied",
    "code": null,
    "context": null,
    "stepResults": [
      {
        "slotId": "result00",
        "kind": "checkedOpaque",
        "resultKind": "valid",
        "opaqueType": "ValidatedSourceCatalogue"
      },
      {
        "slotId": "result01",
        "kind": "checkedValue",
        "resultKind": "valid",
        "validatorId": "MR-VAL-S06-BUILT-PACKAGE"
      }
    ],
    "calls": [],
    "observations": [],
    "unchangedPaths": [""]
  }
}
```

### 7.2 Complete rejected example

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S03-REJ-004",
    "setupId": null,
    "caseId": "MR-S03-REJ-004-C002",
    "title": "Campaign schema one is rejected",
    "workPackageId": "MR-WP-01"
  },
  "execution": {
    "fixtureState": "executable",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S03-CAMPAIGN",
    "availableFrom": { "kind": "step", "step": 4 },
    "executeAt": { "kind": "step", "step": 6 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-TECH-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-002", "MR-IF-015"],
    "specificationRefs": [
      { "documentId": "S03", "sectionId": "required-rejected-fixtures" },
      { "documentId": "S12", "sectionId": "s03-campaign-state-fixtures" }
    ],
    "acceptanceIds": ["MR-S12-ACC-005"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": {
    "kind": "resource",
    "resourceId": "MR-RES-S03-SLICE-STANDARD",
    "changes": [{ "operation": "replace", "path": "/metadata/schemaVersion", "value": 1 }]
  },
  "act": {
    "kind": "automated",
    "steps": [
      {
        "number": 1,
        "type": "callInterface",
        "operationId": "MR-OP-S03-VALIDATE-CAMPAIGN",
        "arguments": [{ "kind": "arranged" }],
        "completion": "await",
        "saveAs": "result00"
      }
    ]
  },
  "expect": {
    "outcome": "rejected",
    "code": "invalidNumber",
    "context": { "path": "/metadata/schemaVersion" },
    "stepResults": [
      {
        "slotId": "result00",
        "kind": "json",
        "value": {
          "kind": "failure",
          "issue": { "path": "/metadata/schemaVersion", "reason": "invalidNumber" }
        }
      }
    ],
    "calls": [],
    "observations": [],
    "unchangedPaths": [""]
  }
}
```

### 7.3 Complete reference-only example

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S12-SEM-001",
    "setupId": null,
    "caseId": "MR-S12-SEM-001-C022",
    "title": "The final oxygen start boundary is preserved",
    "workPackageId": "MR-WP-01"
  },
  "execution": {
    "fixtureState": "referenceOnly",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S12-REFERENCE",
    "availableFrom": { "kind": "step", "step": 5 },
    "validateAt": { "kind": "step", "step": 6 },
    "futureOperationId": "MR-OP-S05-PROCESS-CROSSED-PERIOD",
    "executeAt": { "kind": "step", "step": 23 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-EXP-001", "MR-REQ-LOOP-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-EXP-001", "MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-002", "MR-IF-003", "MR-IF-005", "MR-IF-015"],
    "specificationRefs": [
      { "documentId": "S05", "sectionId": "crossed-period-order" },
      { "documentId": "S12", "sectionId": "s05-calendar-scheduler-and-narrative" }
    ],
    "acceptanceIds": ["MR-S12-ACC-014"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": {
    "kind": "resource",
    "resourceId": "MR-RES-S12-SEMANTIC-CASES",
    "changes": []
  },
  "act": {
    "kind": "reference",
    "futureOperationId": "MR-OP-S05-PROCESS-CROSSED-PERIOD",
    "input": { "kind": "literal", "value": "SEM-22" }
  },
  "expect": {
    "outcome": "reference",
    "expectedMeaning": {
      "given": "Oxygen start attempted at44 then independently45",
      "expect": "44→46 accepted with earliest full report finish51;45 rejected unchanged before any draw"
    },
    "unchangedPaths": [""]
  }
}
```

The Step 6 schema validates this file and its exact source text. The executable loader must return `wrongFixtureState`. It does not call the future S05 operation.

### 7.4 Complete deferred example

A deferred case has no fixture file. Its complete manifest entry is:

```json
{
  "caseId": "MR-S02-FIX-008-C001",
  "groupId": "MR-S02-FIX-008",
  "file": null,
  "fixtureState": "deferred",
  "workPackageId": "MR-WP-00",
  "executeAt": { "kind": "step", "step": 15 },
  "operationId": null,
  "allowedSourceFiles": [],
  "allowedChangePaths": [],
  "multiChangeReason": null
}
```

### 7.5 Complete raw-source and special-value examples

The following three complete fixture documents use the same required outer fields as sections 7.1–7.3. They show the exact raw-text, raw-byte, and special-value paths. The named cases retain their section 8 meanings.

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S06-STR-001",
    "setupId": null,
    "caseId": "MR-S06-STR-001-C003",
    "title": "A duplicate English key is rejected",
    "workPackageId": "MR-WP-01"
  },
  "execution": {
    "fixtureState": "executable",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S06-SOURCE",
    "availableFrom": { "kind": "step", "step": 5 },
    "executeAt": { "kind": "step", "step": 6 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-CONTENT-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-CONT-001", "MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-006", "MR-IF-015"],
    "specificationRefs": [
      { "documentId": "S06", "sectionId": "english-string-contract" },
      { "documentId": "S12", "sectionId": "s06-content-packages" }
    ],
    "acceptanceIds": ["MR-S12-ACC-019"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": {
    "kind": "sourcePacket",
    "resourceId": "MR-RES-S06-SOURCE-SLICE",
    "changes": [
      {
        "operation": "replaceText",
        "file": "content/strings.en.json",
        "sourceText": "{\"ui.ready\":\"Ready\",\"ui.ready\":\"Again\"}\n"
      }
    ]
  },
  "act": {
    "kind": "automated",
    "steps": [
      {
        "number": 1,
        "type": "callInterface",
        "operationId": "MR-OP-S06-VALIDATE-SOURCE",
        "arguments": [{ "kind": "arranged" }],
        "completion": "await",
        "saveAs": "result00"
      }
    ]
  },
  "expect": {
    "outcome": "rejected",
    "code": "duplicateTextKey",
    "context": { "file": "content/strings.en.json" },
    "stepResults": [
      {
        "slotId": "result00",
        "kind": "json",
        "value": {
          "kind": "invalid",
          "issues": [
            {
              "code": "duplicateTextKey",
              "file": "content/strings.en.json",
              "path": "/ui.ready",
              "idOrKey": "ui.ready"
            }
          ]
        }
      }
    ],
    "calls": [],
    "observations": [],
    "unchangedPaths": [""]
  }
}
```

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S06-FLT-001",
    "setupId": null,
    "caseId": "MR-S06-FLT-001-C001",
    "title": "A byte-order mark is rejected",
    "workPackageId": "MR-WP-01"
  },
  "execution": {
    "fixtureState": "executable",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S06-SOURCE",
    "availableFrom": { "kind": "step", "step": 5 },
    "executeAt": { "kind": "step", "step": 6 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-CONTENT-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-CONT-001", "MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-006", "MR-IF-015"],
    "specificationRefs": [
      { "documentId": "S06", "sectionId": "file-envelopes" },
      { "documentId": "S12", "sectionId": "s06-content-packages" }
    ],
    "acceptanceIds": ["MR-S12-ACC-019"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": {
    "kind": "sourcePacket",
    "resourceId": "MR-RES-S06-SOURCE-SLICE",
    "changes": [
      {
        "operation": "replaceBytes",
        "file": "content/manifest.json",
        "bytes": [239, 187, 191, 123, 125, 10]
      }
    ]
  },
  "act": {
    "kind": "automated",
    "steps": [
      {
        "number": 1,
        "type": "callInterface",
        "operationId": "MR-OP-S06-VALIDATE-SOURCE",
        "arguments": [{ "kind": "arranged" }],
        "completion": "await",
        "saveAs": "result00"
      }
    ]
  },
  "expect": {
    "outcome": "rejected",
    "code": "malformedJson",
    "context": { "file": "content/manifest.json" },
    "stepResults": [
      {
        "slotId": "result00",
        "kind": "json",
        "value": {
          "kind": "invalid",
          "issues": [
            {
              "code": "malformedJson",
              "file": "content/manifest.json",
              "path": "/",
              "idOrKey": null
            }
          ]
        }
      }
    ],
    "calls": [],
    "observations": [],
    "unchangedPaths": [""]
  }
}
```

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S03-REJ-004",
    "setupId": null,
    "caseId": "MR-S03-REJ-004-C003",
    "title": "A non-finite period is rejected",
    "workPackageId": "MR-WP-01"
  },
  "execution": {
    "fixtureState": "executable",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S03-CAMPAIGN",
    "availableFrom": { "kind": "step", "step": 4 },
    "executeAt": { "kind": "step", "step": 6 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-TECH-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-002", "MR-IF-015"],
    "specificationRefs": [
      { "documentId": "S03", "sectionId": "required-rejected-fixtures" },
      { "documentId": "S12", "sectionId": "s03-campaign-state-fixtures" }
    ],
    "acceptanceIds": ["MR-S12-ACC-005"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": {
    "kind": "resource",
    "resourceId": "MR-RES-S03-SLICE-STANDARD",
    "changes": [
      {
        "operation": "replace",
        "path": "/calendar/periodIndex",
        "value": { "fixtureSpecialValue": "MR-SPECIAL-NAN" }
      }
    ]
  },
  "act": {
    "kind": "automated",
    "steps": [
      {
        "number": 1,
        "type": "callInterface",
        "operationId": "MR-OP-S03-VALIDATE-CAMPAIGN",
        "arguments": [{ "kind": "arranged" }],
        "completion": "await",
        "saveAs": "result00"
      }
    ]
  },
  "expect": {
    "outcome": "rejected",
    "code": "invalidNumber",
    "context": { "path": "/calendar/periodIndex" },
    "stepResults": [
      {
        "slotId": "result00",
        "kind": "json",
        "value": {
          "kind": "failure",
          "issue": { "path": "/calendar/periodIndex", "reason": "invalidNumber" }
        }
      }
    ],
    "calls": [],
    "observations": [],
    "unchangedPaths": [""]
  }
}
```

### 7.6 Complete raw-wrapper decoder examples

These documents use a JSON string and exact bytes as the arranged value for the Step 6 decoder. The nested text is intentionally invalid. The outer fixtures remain valid.

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S12-FMT-001",
    "setupId": null,
    "caseId": "MR-S12-FMT-001-C002",
    "title": "Malformed fixture JSON is rejected",
    "workPackageId": "MR-WP-09"
  },
  "execution": {
    "fixtureState": "executable",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S12-FIXTURE",
    "availableFrom": { "kind": "step", "step": 6 },
    "executeAt": { "kind": "step", "step": 6 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-TECH-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-015"],
    "specificationRefs": [{ "documentId": "S12", "sectionId": "common-fixture-envelope" }],
    "acceptanceIds": ["MR-S12-ACC-001"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": { "kind": "rawJsonText", "sourceText": "{\"identity\":" },
  "act": {
    "kind": "automated",
    "steps": [
      {
        "number": 1,
        "type": "callInterface",
        "operationId": "MR-OP-S12-DECODE-FIXTURE-TEXT",
        "arguments": [{ "kind": "arranged" }],
        "completion": "await",
        "saveAs": "result00"
      }
    ]
  },
  "expect": {
    "outcome": "rejected",
    "code": "malformedJson",
    "context": null,
    "stepResults": [
      {
        "slotId": "result00",
        "kind": "json",
        "value": {
          "kind": "invalid",
          "issues": [
            {
              "code": "malformedJson",
              "file": "tests/fixtures/s12/MR-S12-FMT-001-C002.fixture.json",
              "path": "",
              "id": "MR-S12-FMT-001-C002"
            }
          ]
        }
      }
    ],
    "calls": [],
    "observations": [],
    "unchangedPaths": []
  }
}
```

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S12-FMT-001",
    "setupId": null,
    "caseId": "MR-S12-FMT-001-C005",
    "title": "A raw-byte fixture with an invalid envelope is rejected",
    "workPackageId": "MR-WP-09"
  },
  "execution": {
    "fixtureState": "executable",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S12-FIXTURE",
    "availableFrom": { "kind": "step", "step": 6 },
    "executeAt": { "kind": "step", "step": 6 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-TECH-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-015"],
    "specificationRefs": [{ "documentId": "S12", "sectionId": "common-fixture-envelope" }],
    "acceptanceIds": ["MR-S12-ACC-001"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": { "kind": "rawBytes", "bytes": [123, 125, 10] },
  "act": {
    "kind": "automated",
    "steps": [
      {
        "number": 1,
        "type": "callInterface",
        "operationId": "MR-OP-S12-DECODE-FIXTURE-BYTES",
        "arguments": [{ "kind": "arranged" }],
        "completion": "await",
        "saveAs": "result00"
      }
    ]
  },
  "expect": {
    "outcome": "rejected",
    "code": "invalidFixture",
    "context": null,
    "stepResults": [
      {
        "slotId": "result00",
        "kind": "json",
        "value": {
          "kind": "invalid",
          "issues": [
            {
              "code": "invalidFixture",
              "file": "tests/fixtures/s12/MR-S12-FMT-001-C005.fixture.json",
              "path": "",
              "id": "MR-S12-FMT-001-C005"
            }
          ]
        }
      }
    ],
    "calls": [],
    "observations": [],
    "unchangedPaths": []
  }
}
```

### 7.7 Complete pending-operation example

This complete document creates and starts the public controller, then configures two distinct pending `clearSavedData` calls. The second call cannot start before the first result settles.

```json
{
  "identity": {
    "schemaVersion": 1,
    "interfaceVersion": 2,
    "groupId": "MR-S02-FIX-006",
    "setupId": null,
    "caseId": "MR-S02-FIX-006-C001",
    "title": "Concurrent clear requests complete in order",
    "workPackageId": "MR-WP-00"
  },
  "execution": {
    "fixtureState": "executable",
    "evidenceType": "unit",
    "runnerId": "MR-RUN-S02-APPLICATION",
    "availableFrom": { "kind": "step", "step": 3 },
    "executeAt": { "kind": "step", "step": 6 },
    "evidenceState": "specifiedNotRun"
  },
  "traceability": {
    "requirementIds": ["MR-REQ-TECH-001", "MR-REQ-TEST-001"],
    "testIds": ["MR-TEST-TECH-001"],
    "interfaceIds": ["MR-IF-001", "MR-IF-015"],
    "specificationRefs": [
      { "documentId": "S02", "sectionId": "request-ordering-and-asynchronous-work" },
      { "documentId": "S12", "sectionId": "s02-architecture-fixtures" }
    ],
    "acceptanceIds": ["MR-S12-ACC-003"],
    "contentIds": [],
    "textKeys": []
  },
  "arrange": {
    "kind": "inline",
    "value": { "kind": "settingsOrLocalData", "action": "clearSavedData" }
  },
  "act": {
    "kind": "automated",
    "steps": [
      {
        "number": 1,
        "type": "provideFake",
        "callId": "MR-CALL-S02-PERSISTENCE-CLEAR",
        "invocation": 1,
        "outcome": { "kind": "pending", "pendingId": "pending00" }
      },
      {
        "number": 2,
        "type": "provideFake",
        "callId": "MR-CALL-S02-PERSISTENCE-CLEAR",
        "invocation": 2,
        "outcome": { "kind": "pending", "pendingId": "pending01" }
      },
      {
        "number": 3,
        "type": "callInterface",
        "operationId": "MR-OP-S02-CREATE-APPLICATION",
        "arguments": [
          { "kind": "applicationDependencies" },
          { "kind": "literal", "value": { "kind": "temporaryNoContent" } }
        ],
        "completion": "await",
        "saveAs": "result00"
      },
      {
        "number": 4,
        "type": "callInterface",
        "operationId": "MR-OP-S02-START-APPLICATION",
        "arguments": [{ "kind": "result", "slotId": "result00", "selector": "whole" }],
        "completion": "await",
        "saveAs": "result01"
      },
      {
        "number": 5,
        "type": "callInterface",
        "operationId": "MR-OP-S02-REQUEST",
        "arguments": [
          { "kind": "result", "slotId": "result00", "selector": "whole" },
          { "kind": "arranged" }
        ],
        "completion": "start",
        "saveAs": "result02"
      },
      {
        "number": 6,
        "type": "callInterface",
        "operationId": "MR-OP-S02-REQUEST",
        "arguments": [
          { "kind": "result", "slotId": "result00", "selector": "whole" },
          { "kind": "arranged" }
        ],
        "completion": "start",
        "saveAs": "result03"
      },
      { "number": 7, "type": "completeFake", "pendingId": "pending00", "outcome": null },
      { "number": 8, "type": "awaitResult", "slotId": "result02" },
      { "number": 9, "type": "completeFake", "pendingId": "pending01", "outcome": null },
      { "number": 10, "type": "awaitResult", "slotId": "result03" }
    ]
  },
  "expect": {
    "outcome": "applied",
    "code": null,
    "context": null,
    "stepResults": [
      { "slotId": "result00", "kind": "opaque", "opaqueType": "ApplicationController" },
      { "slotId": "result01", "kind": "json", "value": { "kind": "success" } },
      { "slotId": "result02", "kind": "json", "value": { "kind": "success" } },
      { "slotId": "result03", "kind": "json", "value": { "kind": "success" } }
    ],
    "calls": [
      { "sequence": 1, "callId": "MR-CALL-S02-PLATFORM-START", "arguments": [] },
      { "sequence": 2, "callId": "MR-CALL-S02-PERSISTENCE-START", "arguments": [] },
      { "sequence": 3, "callId": "MR-CALL-S02-INTERACTION-START", "arguments": [] },
      { "sequence": 4, "callId": "MR-CALL-S02-PLAYER-START", "arguments": [] },
      { "sequence": 5, "callId": "MR-CALL-S02-WORLD-START", "arguments": [] },
      { "sequence": 6, "callId": "MR-CALL-S02-RENDERING-START", "arguments": [] },
      { "sequence": 7, "callId": "MR-CALL-S02-UI-START", "arguments": [] },
      { "sequence": 8, "callId": "MR-CALL-S02-AUDIO-START", "arguments": [] },
      { "sequence": 9, "callId": "MR-CALL-S02-CUTSCENES-START", "arguments": [] },
      { "sequence": 10, "callId": "MR-CALL-S02-TIMING-START", "arguments": [] },
      { "sequence": 11, "callId": "MR-CALL-S02-INPUT-START", "arguments": [] },
      { "sequence": 12, "callId": "MR-CALL-S02-PERSISTENCE-CLEAR", "arguments": [] },
      { "sequence": 13, "callId": "MR-CALL-S02-PERSISTENCE-CLEAR", "arguments": [] }
    ],
    "observations": [],
    "unchangedPaths": []
  }
}
```

The rejected companion moves completion of `pending01` before completion of `pending00`, while invocation 2 is still unconsumed. Fixture execution returns `invalidBinding`, produces no case result, and does not call the second persistence invocation.

## 8. Exact present case inventory

Every case below has file `tests/fixtures/<block>/<caseId>.fixture.json`. A stated inclusive range has no gap.

### 8.1 S02, owned by WP00

| Case                  | State      | Exact current source or later target                                                    |
| --------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `MR-S02-FIX-001-C001` | executable | supported startup; `application.test.ts` startup order                                  |
| `MR-S02-FIX-002-C001` | executable | blocked compatibility; `startup.test.ts` and `compatibility.test.ts`; bootstrap runner  |
| `MR-S02-FIX-003-C001` | executable | invalid embedded content; `content-bootstrap.test.ts`; bootstrap runner                 |
| `MR-S02-FIX-004-C001` | executable | partial startup and reverse cleanup; application test                                   |
| `MR-S02-FIX-005-C001` | executable | normal and repeated stop; application test                                              |
| `MR-S02-FIX-006-C001` | executable | two pending clear-data requests; start, complete, and await order from application test |
| `MR-S02-FIX-007-C001` | executable | stable frame calls during the pending clear-data request; application test              |
| `MR-S02-FIX-008-C001` | deferred   | campaign close-before-replacement needs the Step 15 application operation               |
| `MR-S02-FIX-009-C001` | executable | controlled frame exception, typed fatal result, and cleanup; application test           |
| `MR-S02-FIX-010-C001` | executable | current architecture import audit                                                       |

The temporary `clearSavedData` request proves queue mechanics only. It does not claim campaign request semantics. `MR-S12-ACC-003` remains partial until `C008` executes.

### 8.2 S03, owned by WP01

Executable cases are:

- `MR-S03-FIX-001-C001` and `C002`: exact Standard and Supported slice creation, validation, parse, serialize, second parse, fresh copy, and canonical bytes;
- `MR-S03-REJ-001-C001`: missing required top-level section;
- `MR-S03-REJ-002-C001`: unknown field;
- `MR-S03-REJ-003-C001`: wrong value type;
- `MR-S03-REJ-004-C001` through `C004`: fraction, out-of-range integer, non-finite special value, and negative zero;
- `MR-S03-REJ-005-C001` through `C004`: camera, pointer-lock, open-panel, and other presentation data; and
- `MR-S03-INV-001-C001` through `C009`: identity, reference, experiment, manuscript, scheduler, content, world, route, and conclusion invariants.

Each value and exact first reason comes from `campaign-state.test.ts` and `campaign-state-codec.test.ts`. `MR-S03-TRN-001-C001` through `C004` remain deferred to Step 18 and `MR-OP-S03-COMPARE-TRANSITION`: forbidden history edit, removal, ID reuse, and reversal. Current one-state validation is not transition evidence. `MR-S12-ACC-005` remains partial.

### 8.3 S06, owned by WP01

Executable cases are:

- `MR-S06-VAL-001-C002` and `C004` through `C006`: the slice-development source, rejected non-monotonic profile status, explicit incomplete-full rejection, and explicit incomplete-fallback rejection;
- `MR-S06-SLC-001-C001`: the exact 97-item, 213-string slice package and exclusions;
- `MR-S06-REF-001-C001` through `C008`: valid closure, missing reference, wrong family, duplicate reference/ID route, circular reference, chained replacement, missing owned definition, and excluded dependency;
- `MR-S06-STR-001-C001` through `C008`: missing key, orphan key, duplicate key, invalid placeholder, missing placeholder value, normalization failure, 6,000-word valid boundary, and 6,001-word rejection;
- `MR-S06-OBJ-001-C001` through `C011`: all 18 valid family shapes, unknown top field, unknown nested field, wrong family, invalid ID, duplicate ID, invalid condition, invalid effect, semantic-fact mismatch, count mismatch, and immutable checked copy/views; and
- `MR-S06-FLT-001-C001` through `C017`: the 16 `ContentIssueCode` values in their approved order and one multi-fault deterministic-order case.

All inputs and results come from the accepted Step 5 contract, root source, public operations, and the corresponding WP01 tests. `MR-S06-VAL-001-C001` and `C003`, `MR-S06-FBK-001-C001`, and every `MR-S06-MIG-001` case remain deferred. Full first becomes available at Step 69, fallback at Step 52, and migration at Step 14. Full and fallback remain incomplete during Step 6 and cannot build.

### 8.4 S12 and Gate 6A, shared data owned by WP01 and shared checks owned by WP09

WP09 owns executable `MR-S12-FMT-001-C001` through `C021`: one valid wrapper and one isolated case for each of the 20 fixture issue codes. WP09 also owns executable `MR-S12-DOC-001-C001` and the new proposed `MR-S12-EVD-001-C001`. `EVD` is the machine-readable evidence-summary audit for acceptance row 044. Its controlled example uses `MR-OP-S12-VALIDATE-EVIDENCE-SHAPE` and cannot satisfy technical completion. After observed checks, `MR-OP-S12-AUDIT-EVIDENCE` must validate the real `docs/evidence/step-06-foundation.md`. Existing `MR-S12-EVL-001` keeps its private station-visit, traversal, repeated-interaction, and qualitative-evaluation meaning and remains deferred to Leonardo review steps.

WP01 owns the corresponding fixture files and expected meanings for `MR-S12-ECO-001-C001` through `C013`, in the exact trace order in section 3.1. The four opening traces (`opening-standard`, `opening-supported`, `opening-quality-standard`, and `opening-quality-supported`) target Step 30. The other nine target Step 69. All 13 are `referenceOnly` in Step 6.

WP01 also owns the fixture files and expected meanings for `MR-S12-SEM-001-C001` through `C035`. `C001` through `C026` are exact checked copies of `SEM-01` through `SEM-26` in `semantic-cases.json`. Their future targets are:

| Cases                                        | Exact target                                                                            |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| `C001`–`C007`, `C013`, `C019`, `C028`–`C031` | Step 24 claim/manuscript rules                                                          |
| `C008`                                       | Step 21 room/equipment route                                                            |
| `C009`, `C010`, `C025`, `C026`, `C027`       | Step 23 result, analysis, and evidence rules; `C027` is the complete 144-row projection |
| `C011`, `C012`                               | Step 69 ending rules                                                                    |
| `C014`, `C015`, `C020`                       | Step 18 costs, pressure, and insufficient-energy rules                                  |
| `C016`                                       | Step 25 scene-option closures                                                           |
| `C017`                                       | Step 23 `MR-OP-S23-VALIDATE-SCIENTIFIC-FACTS`                                           |
| `C018`                                       | Step 14 `MR-OP-S07-MIGRATE-CAMPAIGN`                                                    |
| `C021`, `C033`                               | Step 20 scheduler/event order and expiry before unlock                                  |
| `C022`–`C024`                                | Step 23 oxygen start, expiry, and missed-window rules                                   |
| `C032`                                       | Step 23 long-action or crash crossing both monitoring windows                           |
| `C034`                                       | Step 18 accepted `62→63` boundary                                                       |
| `C035`                                       | Step 18 rejected `63→64` boundary                                                       |

`C028` proves all three claims remain visible. `C029` proves only an honest Careful rehearsal can complete the slice. `C030` preserves the Limited rhythm-only rejection until a suitable repeat or restart. `C031` preserves the absence of an invented laser repatterning association. All 35 semantic cases are `referenceOnly` in Step 6.

### 8.5 Literal present-file manifest

The implementation manifest and work orders use these exact files. The order below is canonical.

#### WP01 S03

```text
tests/fixtures/s03/MR-S03-FIX-001-C001.fixture.json
tests/fixtures/s03/MR-S03-FIX-001-C002.fixture.json
tests/fixtures/s03/MR-S03-REJ-001-C001.fixture.json
tests/fixtures/s03/MR-S03-REJ-002-C001.fixture.json
tests/fixtures/s03/MR-S03-REJ-003-C001.fixture.json
tests/fixtures/s03/MR-S03-REJ-004-C001.fixture.json
tests/fixtures/s03/MR-S03-REJ-004-C002.fixture.json
tests/fixtures/s03/MR-S03-REJ-004-C003.fixture.json
tests/fixtures/s03/MR-S03-REJ-004-C004.fixture.json
tests/fixtures/s03/MR-S03-REJ-005-C001.fixture.json
tests/fixtures/s03/MR-S03-REJ-005-C002.fixture.json
tests/fixtures/s03/MR-S03-REJ-005-C003.fixture.json
tests/fixtures/s03/MR-S03-REJ-005-C004.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C001.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C002.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C003.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C004.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C005.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C006.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C007.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C008.fixture.json
tests/fixtures/s03/MR-S03-INV-001-C009.fixture.json
```

#### WP01 S06

```text
tests/fixtures/s06/MR-S06-VAL-001-C002.fixture.json
tests/fixtures/s06/MR-S06-VAL-001-C004.fixture.json
tests/fixtures/s06/MR-S06-VAL-001-C005.fixture.json
tests/fixtures/s06/MR-S06-VAL-001-C006.fixture.json
tests/fixtures/s06/MR-S06-SLC-001-C001.fixture.json
tests/fixtures/s06/MR-S06-REF-001-C001.fixture.json
tests/fixtures/s06/MR-S06-REF-001-C002.fixture.json
tests/fixtures/s06/MR-S06-REF-001-C003.fixture.json
tests/fixtures/s06/MR-S06-REF-001-C004.fixture.json
tests/fixtures/s06/MR-S06-REF-001-C005.fixture.json
tests/fixtures/s06/MR-S06-REF-001-C006.fixture.json
tests/fixtures/s06/MR-S06-REF-001-C007.fixture.json
tests/fixtures/s06/MR-S06-REF-001-C008.fixture.json
tests/fixtures/s06/MR-S06-STR-001-C001.fixture.json
tests/fixtures/s06/MR-S06-STR-001-C002.fixture.json
tests/fixtures/s06/MR-S06-STR-001-C003.fixture.json
tests/fixtures/s06/MR-S06-STR-001-C004.fixture.json
tests/fixtures/s06/MR-S06-STR-001-C005.fixture.json
tests/fixtures/s06/MR-S06-STR-001-C006.fixture.json
tests/fixtures/s06/MR-S06-STR-001-C007.fixture.json
tests/fixtures/s06/MR-S06-STR-001-C008.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C001.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C002.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C003.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C004.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C005.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C006.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C007.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C008.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C009.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C010.fixture.json
tests/fixtures/s06/MR-S06-OBJ-001-C011.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C001.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C002.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C003.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C004.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C005.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C006.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C007.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C008.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C009.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C010.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C011.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C012.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C013.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C014.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C015.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C016.fixture.json
tests/fixtures/s06/MR-S06-FLT-001-C017.fixture.json
```

#### WP01 S12 reference

```text
tests/fixtures/s12/MR-S12-ECO-001-C001.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C002.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C003.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C004.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C005.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C006.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C007.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C008.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C009.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C010.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C011.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C012.fixture.json
tests/fixtures/s12/MR-S12-ECO-001-C013.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C001.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C002.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C003.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C004.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C005.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C006.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C007.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C008.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C009.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C010.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C011.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C012.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C013.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C014.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C015.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C016.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C017.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C018.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C019.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C020.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C021.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C022.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C023.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C024.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C025.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C026.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C027.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C028.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C029.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C030.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C031.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C032.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C033.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C034.fixture.json
tests/fixtures/s12/MR-S12-SEM-001-C035.fixture.json
```

#### WP09 S12

```text
tests/fixtures/s12/MR-S12-FMT-001-C001.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C002.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C003.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C004.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C005.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C006.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C007.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C008.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C009.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C010.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C011.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C012.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C013.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C014.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C015.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C016.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C017.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C018.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C019.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C020.fixture.json
tests/fixtures/s12/MR-S12-FMT-001-C021.fixture.json
tests/fixtures/s12/MR-S12-DOC-001-C001.fixture.json
tests/fixtures/s12/MR-S12-EVD-001-C001.fixture.json
```

## 9. Exact deferred group routes

The manifest contains every group below. A group with an exact case or setup range from S12 records that range as deferred entries. A group described as “every variant” retains `requiredCaseCount:null` until its listed authority step closes the count. In the table, a combined owner cell becomes the exact sorted `workPackageIds` array. Every listed step range expands to each integer step. Every non-continuous row becomes `route:{kind:'milestones',targets:[...]}` in the displayed order. The S13 row alone uses `route:{kind:'continuous',firstAt:{kind:'step',step:6}}`. These are registration milestones, not claims that all group cases execute at the first milestone.

| Exact owners | Deferred or partial groups                                                                                                                                                                             | Exact route milestones                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| WP01         | `MR-S04-CMD-001`, `MR-S04-REJ-001`, `MR-S04-FLT-001`                                                                                                                                                   | Steps 18 and 21–24                                |
| WP01         | `MR-S05-CAL-001`, `MR-S05-SCH-001`, `MR-S05-CRS-001`                                                                                                                                                   | Steps 18–20 and 23                                |
| WP01         | `MR-S05-MSG-001`, `MR-S05-ROOM-001`, `MR-S05-GATE-001`, `MR-S05-SCN-001`, `MR-S05-SKP-001`, `MR-S05-REC-001`, `MR-S05-END-001`, `MR-S05-FLT-001`, `MR-S05-JNY-001`, `MR-S05-JNY-002`, `MR-S05-JNY-003` | Steps 20, 25–26, 30, 52, and 69                   |
| WP01         | `MR-S06-VAL-001`, `MR-S06-FBK-001`, `MR-S06-MIG-001`                                                                                                                                                   | Steps 14, 52, and 69                              |
| WP02         | `MR-S07-SAV-001`, `MR-S07-REC-001`, `MR-S07-MIG-001`, `MR-S07-CMP-001`, `MR-S07-CLR-001`, `MR-S07-FLT-001`                                                                                             | Steps 13–14                                       |
| WP03         | `MR-S08-GEO-001`, `MR-S08-ANC-001`, `MR-S08-COL-001`, `MR-S08-MOV-001`, `MR-S08-TGT-001`, `MR-S08-FOC-001`, `MR-S08-WLD-001`, `MR-S08-TRV-001`, `MR-S08-FLT-001`                                       | Steps 7–12, 52, and 69                            |
| WP04         | `MR-S09-INP-001`, `MR-S09-FOC-001`                                                                                                                                                                     | Steps 8–12 and 15                                 |
| WP05         | `MR-S09-UI-001`, `MR-S09-SET-001`, `MR-S09-ERR-001`, `MR-S09-LIF-001`, `MR-S09-RSP-001`, `MR-S09-A11Y-001`, `MR-S09-JRN-001`                                                                           | Steps 15–17 and 27–31                             |
| WP03         | `MR-S10-RND-001`                                                                                                                                                                                       | Steps 7–12, 28, 33–38, 52, and 69                 |
| WP06         | `MR-S10-SCN-001`                                                                                                                                                                                       | Steps 25–30, 52, and 69                           |
| WP03/WP06    | `MR-S10-RES-001`                                                                                                                                                                                       | Steps 7–12, 26, 28, 33–38, 52, and 69             |
| WP00         | `MR-S11-CMP-001`, `MR-S11-DIA-001`                                                                                                                                                                     | Steps 7–12, 30, and `releaseCandidate`            |
| WP09         | `MR-S11-PERF-001`                                                                                                                                                                                      | Steps 8, 30, 52, 69, and `releaseCandidate`       |
| WP09         | `MR-S12-CAT-001`, `MR-S12-EVL-001`, `MR-S12-JNY-001`, `MR-S12-JNY-002`, `MR-S12-JNY-003`, `MR-S12-PLAY-001`, `MR-S12-VIS-001`, `MR-S12-REL-001`                                                        | Steps 30–31, 52–53, 69–70, and `releaseCandidate` |
| WP09         | `MR-S13-CON-001`, `MR-S13-DAG-001`, `MR-S13-GATE-001`, `MR-S13-GIT-001`, `MR-S13-OWN-001`, `MR-S13-REV-001`, `MR-S13-WO-001`                                                                           | Continuous from Step 6                            |

Exact setup routes already fixed by S12 are registered now. Every entry is deferred and has `file:null`.

| Setup IDs                   | `workPackageId` | `executeAt` |
| --------------------------- | --------------- | ----------- |
| `MR-S10-RND-001-S01`        | `MR-WP-03`      | Step 7      |
| `MR-S10-RND-001-S02`–`S05`  | `MR-WP-03`      | Step 8      |
| `MR-S10-SCN-001-S01`–`S05`  | `MR-WP-06`      | Step 26     |
| `MR-S10-RES-001-S01`–`S03`  | `MR-WP-03`      | Step 7      |
| `MR-S10-RES-001-S04`–`S06`  | `MR-WP-06`      | Step 26     |
| `MR-S11-CMP-001-S01`–`S08`  | `MR-WP-00`      | Step 7      |
| `MR-S11-PERF-001-S01`–`S09` | `MR-WP-09`      | Step 8      |
| `MR-S11-DIA-001-S01`–`S08`  | `MR-WP-00`      | Step 7      |

An inclusive range expands in numeric suffix order. Thus this table defines all 41 `SetupEntry` records without an owner or target choice. All other future setup counts remain `null` until their owning step closes them.

## 10. Exact 45-row matrix phase map

```ts
type AcceptanceMatrix = Readonly<{
  schemaVersion: 1;
  interfaceVersion: 2;
  rows: readonly AcceptanceRow[];
}>;

type AcceptanceRow = Readonly<{
  id: AcceptanceId;
  condition: LongText;
  requirementIds: readonly RequirementId[];
  testIds: readonly TestId[];
  interfaceIds: readonly InterfaceId[];
  fixtureGroupIds: readonly FixtureGroupId[];
  specificationRefs: readonly SpecificationRef[];
  profiles: readonly ('slice' | 'fallback' | 'full' | 'release')[];
  evidenceTypes: readonly (
    'unit' | 'browser' | 'staticAudit' | 'command' | 'manualReview' | 'manualMeasurement'
  )[];
  gate: string;
  evidenceState: 'specifiedNotRun' | 'measuredLater';
  routeState: 'completeRoute' | 'partialRoute' | 'deferredRoute';
}>;
```

The matrix copies each current S12 condition, requirement list, test list, interface list, evidence types, scope, gate, and evidence state. It adds the exact route state below. `completeRoute` means that Step 6 contains the required current route. It does not mean the condition passed. `partialRoute` cannot satisfy the full acceptance row.

| ID  | Primary route                                         | Step 6 route state | Completion boundary                              |
| --- | ----------------------------------------------------- | ------------------ | ------------------------------------------------ |
| 001 | `MR-S12-FMT-001`                                      | completeRoute      | Step 6 execution                                 |
| 002 | manifest and matrix audit                             | completeRoute      | Step 6 execution                                 |
| 003 | `MR-S02-FIX-001`–`010`                                | partialRoute       | Step 15 replacement case                         |
| 004 | `MR-S03-FIX-001`                                      | partialRoute       | full start at Step 69                            |
| 005 | S03 rejection, invariant, transition                  | partialRoute       | transition comparison at Step 18                 |
| 006 | `MR-S04-CMD-001`                                      | deferredRoute      | Steps 18–24                                      |
| 007 | `MR-S04-REJ-001`, `MR-S04-FLT-001`                    | deferredRoute      | Steps 18–24                                      |
| 008 | S04 `C700–C749`                                       | deferredRoute      | Step 21                                          |
| 009 | S04 `C100–C199`, semantic references                  | partialRoute       | Steps 21–24                                      |
| 010 | S04 `C200–C249`, `MR-S12-ECO-001`                     | partialRoute       | Steps 18–23 and full traces at Step 69           |
| 011 | S04 `C300–C399`                                       | deferredRoute      | Step 24 and later profiles                       |
| 012 | S04 `C400–C449`                                       | deferredRoute      | Step 24 and later profiles                       |
| 013 | S04 `C500–C599`                                       | deferredRoute      | Steps 24–26 and later profiles                   |
| 014 | S05 calendar, scheduler, crossing                     | partialRoute       | Steps 18–23                                      |
| 015 | S05 message, room, gate                               | deferredRoute      | Steps 20, 25–26, 52, 69                          |
| 016 | S05 scene, skip, recovery, ending, fault, journey     | deferredRoute      | Steps 25–30, 52, 69                              |
| 017 | `MR-S06-VAL-001`                                      | partialRoute       | full package at Step 69                          |
| 018 | `MR-S06-FBK-001`, `MR-S06-SLC-001`                    | partialRoute       | fallback at Step 52                              |
| 019 | S06 rejection, migration, fault                       | partialRoute       | migration at Step 14                             |
| 020 | `MR-S07-SAV-001`                                      | deferredRoute      | Step 13                                          |
| 021 | `MR-S07-REC-001`, `MR-S07-MIG-001`                    | deferredRoute      | Step 14                                          |
| 022 | S07 completion, clearing, failure                     | deferredRoute      | Steps 13–14 and later completion                 |
| 023 | `MR-S08-GEO-001`, `MR-S08-ANC-001`                    | deferredRoute      | Steps 7–12                                       |
| 024 | `MR-S08-COL-001`, `MR-S08-MOV-001`                    | deferredRoute      | Steps 9–12                                       |
| 025 | `MR-S08-TGT-001`, `MR-S08-FOC-001`                    | deferredRoute      | Steps 10–12                                      |
| 026 | S08 world, traversal, fault                           | deferredRoute      | Steps 7–12, 52, 69                               |
| 027 | `MR-S09-INP-001`, `MR-S09-FOC-001`                    | deferredRoute      | Steps 8–12                                       |
| 028 | S09 UI, settings, error, lifecycle                    | deferredRoute      | Steps 15–17, 27–30                               |
| 029 | `MR-S09-RSP-001`                                      | deferredRoute      | Steps 27–30                                      |
| 030 | `MR-S09-A11Y-001`, `MR-S09-JRN-001`                   | deferredRoute      | Steps 30–31                                      |
| 031 | `MR-S10-RND-001`                                      | deferredRoute      | Steps 7–12 and asset steps                       |
| 032 | `MR-S10-SCN-001`                                      | deferredRoute      | Steps 25–30 and asset steps                      |
| 033 | `MR-S10-RES-001`                                      | deferredRoute      | Steps 7–12 and asset steps                       |
| 034 | `MR-S11-CMP-001`                                      | deferredRoute      | Steps 7–12                                       |
| 035 | `MR-S11-PERF-001`                                     | deferredRoute      | later performance steps                          |
| 036 | S11 manual measurements                               | deferredRoute      | `releaseCandidate`                               |
| 037 | `MR-S11-DIA-001`                                      | deferredRoute      | later diagnostic steps                           |
| 038 | `MR-S12-JNY-001`, `MR-S12-PLAY-001`                   | deferredRoute      | Steps 30–31                                      |
| 039 | `MR-S12-JNY-002`, `MR-S12-VIS-001`, `MR-S12-PLAY-001` | deferredRoute      | Steps 52–53                                      |
| 040 | S05 journeys, catalogue, evaluation, vision, play     | deferredRoute      | Steps 69–70                                      |
| 041 | `MR-S12-JNY-003`                                      | deferredRoute      | Steps 30, 52, 69 by case                         |
| 042 | coverage report                                       | partialRoute       | rules, content, and persistence after Step 14    |
| 043 | `MR-S12-DOC-001`                                      | completeRoute      | Step 6 execution                                 |
| 044 | `MR-S12-EVD-001`                                      | completeRoute      | Step 6 technical completion and every later gate |
| 045 | `MR-S12-REL-001`                                      | deferredRoute      | `releaseCandidate`                               |

The matrix permits `fixtureGroupIds:[]` only for row 042 coverage command evidence and row 036 manual measurements before their procedure schema exists. Its evidence-type union is `unit | browser | staticAudit | command | manualReview | manualMeasurement`. All 45 specification-time evidence states remain `specifiedNotRun`, except row 036 remains `measuredLater`.

### 10.1 Economy correction

The existing `44/26`, `56/30`, and `79/46` paper counts and `55/51`, `69/65`, and `100/93` profile totals are historical pre-C01 values. They do not remain expected current results.

The Design 13 and S12 amendment will instead record the approved C01 paper arithmetic: non-break demand `39`, `50`, and `69`; base energy `21`, `24`, and `36`; optimistic Standard totals `48`, `60`, and `85`; and optimistic Supported totals `45`, `57`, and `80`. These paper values omit surcharges, recovery-cap loss, and room costs. They are reference arithmetic, not feasibility proof.

The 13 schedule traces supplement these paper checks. They preserve exact named route timing, costs, breaks, and conditional outcome assumptions. They do not replace the unit cases for action costs, surcharges, push-through, crash, or energy rules. `MR-S12-ACC-010` changes to: “Standard and Supported action costs, zero-cost configuration, breaks, surcharges, push-through, crash, corrected C01 paper arithmetic, and all 13 named trace calculations match their approved values.” The row remains partial until the rules and complete trace routes execute.

## 11. Package ownership and check-safe sequence

WP09 first adds only shared types, strict decoding, schema, loader, and self-tests. It does not add the repository manifest, matrix, or a global unlisted-file scan in this first submission. Its self-tests use temporary complete sets.

WP00 then adds only S02 fixture files, its runner, and its fixture evidence test. WP01 then adds only S03/S06 fixture files, the 48 WP01-owned reference-only S12 files, the five copied resource files, its source-packet mapping, its runner, and its fixture evidence test. These package tests validate their literal owned file lists through the shared loader. They do not pretend that the repository-wide manifest already exists.

WP09 finally adds `tests/fixtures/manifest.json`, `tests/fixtures/acceptance-matrix.json`, the 23 WP09-owned S12 fixture wrappers, and the repository-wide traceability, document, evidence-shape, unlisted-file, and build-output audits. `MR-S12-EVD-001-C001` validates only the controlled `EvidenceSummary` branch. At this point every listed present file exists and every present file is listed. Thus each submission can pass its required checks without a skip or temporary schema exception.

After final WP09 integration, the primary runs `npm run check`, `npm run verify`, and `git diff --check`, then creates the execution-evidence document from those observed results. The primary runs `node --experimental-strip-types tests/support/MR-WP-09/document-audit.ts --evidence docs/evidence/step-06-foundation.md`. This command invokes `MR-OP-S12-AUDIT-EVIDENCE` and must pass before the technical-completion commit. The evidence audit result is recorded in the control records, because adding it to the evidence input would create a self-dependent check.

Runtime source cannot import `tests/`. Test support cannot enter `dist`. Architecture and build-output audits enforce both directions.

## 12. Exact work-order candidates and activation commits

Four non-overlapping work orders use one controlled OpenAI `gpt-5.6-sol` worker with `high` reasoning. Each has a separate activation pair:

1. Primary commits the approved authority amendment. Its 40-character hash becomes the `base_commit` in `MR-WO-WP09-001`.
2. Primary commits that complete work order in a separate authorization commit. The worker starts from the recorded base and reads the order with `git show <authorization-commit>:<work-order-path>`.
3. After worker submission, primary verifies and integrates it. The resulting main hash becomes the next order's base.
4. Primary creates and commits the next complete order. This repeats for WP00, WP01, and final WP09 activation.

No work order contains the hash of its own containing commit. No placeholder enters an activated order. Leonardo's approval of this packet authorizes the primary to insert only the mechanically observed 40-character base, authorization, dependency, and integrated commit hashes. Any change to paths, tasks, authority, model, checks, or meaning returns for approval.

| Work order       | Branch                                       | Worktree                                            | Owned paths                                                                                                                                                                                                                                                            | Commit                                           |
| ---------------- | -------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `MR-WO-WP09-001` | `work/MR-WP-09-step6-fixture-utilities`      | `.worktrees/MR-WP-09-step6-fixture-utilities/`      | `tests/support/MR-WP-09/{fixture-types,fixture-json,fixture-schema,fixture-loader}.ts`; `tests/unit/MR-WP-09/fixture-contract.test.ts`                                                                                                                                 | `MR-WP-09 Add Step 6 fixture utilities`          |
| `MR-WO-WP00-010` | `work/MR-WP-00-step6-application-fixtures`   | `.worktrees/MR-WP-00-step6-application-fixtures/`   | `tests/fixtures/s02/*.fixture.json`; `tests/support/MR-WP-00/s02-fixture-runner.ts`; `tests/unit/MR-WP-00/s02-fixture-evidence.test.ts`                                                                                                                                | `MR-WP-00 Add Step 6 application fixtures`       |
| `MR-WO-WP01-005` | `work/MR-WP-01-step6-rules-content-fixtures` | `.worktrees/MR-WP-01-step6-rules-content-fixtures/` | `tests/fixtures/s03/*.fixture.json`; `tests/fixtures/s06/*.fixture.json`; the 48 named `MR-S12-ECO`/`MR-S12-SEM` fixtures; five named JSON resources; `tests/support/MR-WP-01/s03-s06-fixture-runner.ts`; `tests/unit/MR-WP-01/rules-content-fixture-evidence.test.ts` | `MR-WP-01 Add Step 6 rules and content fixtures` |
| `MR-WO-WP09-002` | `work/MR-WP-09-step6-fixture-activation`     | `.worktrees/MR-WP-09-step6-fixture-activation/`     | manifest; matrix; the 23 named `MR-S12-FMT`/`DOC`/`EVD` fixtures; `traceability.ts`; `document-audit.ts`; four final WP09 tests                                                                                                                                        | `MR-WP-09 Complete Step 6 fixture manifest`      |

Each order contains the S13 headings, exact owned and prohibited paths, fixed source packet, requirements, interfaces, fixture groups, acceptance rows, dependencies, tasks, non-goals, checks, safety limits, and handoff. WP00 sources are S02, MR-IF-001, public bootstrap/application entries, and accepted WP00 tests. WP01 sources are S03, S06, MR-IF-002, MR-IF-006, this contract, the two analysis JSON sources, root content, and accepted WP01 tests. WP09 sources are S12, S13, MR-IF-015 v2, this contract, the activated orders, and all present fixture files read-only.

Every package runs focused tests, `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test`, and `git diff --check`. WP01 also runs `npm run test:coverage`, `npm run content:check`, and `npm run build:slice`. Final WP09 activation runs the complete `npm run check` and `npm run verify`. Main runs `npm run verify` after each integrated dependency wave. No dependency installation or lockfile change is authorized.

The primary authority amendment paths are exactly:

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

The four later order paths are `docs/implementation/work-orders/MR-WO-WP09-001.md`, `MR-WO-WP00-010.md`, `MR-WO-WP01-005.md`, and `MR-WO-WP09-002.md`. Contribution records and `docs/evidence/step-06-foundation.md` are created only after actual submissions and results.

## 13. Evidence, safety, and acceptance

After execution, `docs/evidence/step-06-foundation.md` records the exact section 5.3 fields: date, tested commit, three commands, 103 executable cases, 48 reference-only cases, deferred counts, controlled invalid result, four embedded audits, coverage basis points, profile and slice-build facts, browser counts, known limits, and later owners. These are planned fixed fields. The evidence file records actual measured values only after execution. The separate evidence-document audit then validates this file before technical completion.

No fixture contains credentials, private conversations, protagonist data from play, save payloads, employer data, Career Center data, machine paths, raw errors, or other-project data. There is no network access. A failed test changes no source, expected data, manifest, or campaign. No fixture or test code enters `dist`.

Leonardo receives the plain-language evidence summary and one controlled invalid wrapper. Step 6 adds an invisible test foundation. It adds no playable feature and executes no campaign journey. Step 7 remains blocked until Step 6 is separately accepted.

## 14. Authority impact

| Authority or path                              | Exact proposed change                                                                                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design 7                                       | Change the trace count from twelve to thirteen. Attribute the additional named trace to the analysis README. Preserve trace contents.                                     |
| Design 13                                      | Replace obsolete economy result obligations with the C01 paper arithmetic and 13-trace boundary. Distinguish ordinary Steps 1–5 tests from the absent pre-Step-6 S12 set. |
| Design 15                                      | Record partial Step 6 implementation of `MR-REQ-TEST-001`; do not mark later release work complete.                                                                       |
| S12                                            | Add the exact v2 schema, registries, current cases, reference cases, deferred routes, matrix phase map, current schema/content/profile facts, and economy correction.     |
| S13                                            | Bind the four check-safe work orders and activation-pair sequence.                                                                                                        |
| `MR-IF-015`                                    | Supersede frozen v1 with frozen v2. Preserve v1 history.                                                                                                                  |
| Decisions                                      | Add `MR-IMP-DEC-311` after approval.                                                                                                                                      |
| Open issues                                    | Resolve `MR-IMP-OPEN-022` only after approval of this reviewed amendment and work order.                                                                                  |
| Controls, work orders, contributions, evidence | Advance each record only when its real action or result occurs.                                                                                                           |

No `MR-IF-001` through `MR-IF-014` version changes. No campaign or content migration is created by this test-only interface.

## 15. Review, validation, and recovery

Preparation validation checks:

- all 13 unique traces, 26 source semantic cases, 144 unique laser rows, 97 slice items, 213 slice strings, and 45 acceptance rows;
- exact current public operations and result names;
- the 103 executable and 48 reference-only planned case arithmetic;
- valid, rejected, reference-only, deferred, raw-text, raw-byte, special-value, opaque-binding, and pending-result examples;
- every present and deferred group route, setup route, owner, source, target, and acceptance phase state;
- no executable campaign replacement, S03 transition comparison, S04/S05 rule, migration, fallback, full, release, or journey claim;
- exact approved documentation scope, Markdown formatting, whitespace, privacy, and full diff; and
- a fresh high-level review of the corrected meaning.

Later implementation uses the four activation pairs in section 12. The primary audits every submission. A fresh Sol xhigh reviewer checks the complete implementation. Main must pass `npm run check` and `npm run verify` before technical completion. Leonardo then makes a separate acceptance decision.

If validation fails, return ordered issues and no checked set. If a public operation is unavailable, keep its route deferred. Do not import a private runtime file, invent a result, relax an expected value, skip a required test, or change profile. A failed integration or push preserves commits. Do not reset, force-push, rewrite history, or guess a conflict.

## 16. Current approval boundary

Leonardo approved preparation and the correction to 13 traces. This permits this candidate, its corrections, high-level review, validation, preparation commit, and push. It does not approve `MR-IMP-DEC-311`, freeze `MR-IF-015 v2`, create fixture code or data, execute Step 6 evidence, start Step 7, or accept Step 6.

The next decision is one approval or rejection of this reviewed amendment and the four exact implementation work orders. Code starts only after that decision.
