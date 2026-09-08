# S03 Domain Model and Campaign State

Status: **C01–C06 approved on 2026-09-06; current authority is the correction sections below and the interface register. Earlier B/R/S lifecycle records are historical. Runtime evidence remains step-specific.**

## Purpose and authority

This specification resolves `MR-IMP-OPEN-003`. It defines the complete
serializable campaign source of truth, its stored and derived facts, initial
state, identifiers, invariants, validation boundary, text representation, and
required fixtures. It is subordinate to the numbered creative design and uses
the S02 ownership rule: `application` owns the only live campaign state and
`rules` owns this data contract.

This document specifies future behaviour. It does not create runtime types,
schema code, JSON files, browser storage, or measured test results. S04 owns
commands and transition algorithms. S05 owns scheduler algorithms. S06 now
defines authored content, build profiles, validation, and compatibility in
`06-content-data-and-build-profiles.md`. S07 owns persistence. S12 owns the
executable fixture format.

## Plain-data boundary

`CampaignState` is one versioned plain-data record. Every stored value is one
of: string, finite safe integer, boolean, `null`, ordered list, or plain record.
It contains no function, class instance, `Date`, `Map`, `Set`, typed array,
Three.js object, DOM object, browser API object, or cyclic reference.

The state stores exact campaign facts. Rules calculate display labels,
descriptive bands, week and period names, eligibility, repeat availability,
completion conditions, and bounded presentation projections. It does not save
temporary UI state, focused panels, pointer lock, raw input, camera transforms,
animation progress, visual frames, audio playback, or browser time.

Settings, input bindings, save-slot metadata, archive cards, graphics choices,
and cross-campaign Citations remain outside `CampaignState`. Real-world
timestamps never enter it.

## Complete top-level shape

All ten sections below are required. Unknown or missing fields are rejected.
Names in backticks are the canonical stored field names.

| Section          | Stored purpose                                                             |
| ---------------- | -------------------------------------------------------------------------- |
| `metadata`       | Schema, content, identity, seed, revision, build, and pressure facts.      |
| `calendar`       | Semester position, crash facts, and period progression.                    |
| `campaignValues` | Energy, evidence, confidence, integrity, and their permanent histories.    |
| `experiments`    | Equipment, preparation, run, record, card, and stop facts.                 |
| `manuscript`     | Committed paper states, snapshots, review, response, and authorship facts. |
| `narrative`      | Protagonist, scenes, messages, requests, concerns, routes, and scheduler.  |
| `relationships`  | One permanent working-trust record for each recurring character.           |
| `world`          | Semantic floor, room, anchor, and physical-character facts.                |
| `contentHistory` | Saved variants and once-only content consumption.                          |
| `conclusion`     | Final choice and epilogue progress.                                        |

ID-keyed records are used when identity matters. Ordered lists are used only
when order has meaning. Every record key equals its internal `id`.

## Metadata and protagonist identity

`metadata` contains:

- `schemaVersion`: exactly `1` for candidate `v1`;
- `contentVersion`: the validated authored-content version;
- `campaignId`: a lowercase random UUID from the browser secure generator;
- `campaignSeed`: an unsigned 32-bit integer from `0` through `4294967295`;
- `stateRevision`: a safe integer starting at `0`;
- `buildProfileId`: the selected full, fallback, or slice content profile;
- `pressureProfile`: `standard` or `supported`.

The campaign UUID contains no protagonist name, date, seed, or device data.
The real New Game flow also creates the seed through the browser secure random
generator. The pressure profile cannot change inside a campaign.

`narrative.protagonist` contains `name` and `pronounSet`. Pronoun sets are
`sheHer`, `heHim`, and `theyThem`. The name is normalized to Unicode NFC. It
has 1–64 visible Unicode characters, no leading or trailing whitespace, and no
control character. Internal spaces, punctuation, and non-Latin writing are
allowed. A combined character such as `é` counts as one visible character.

## Calendar and campaign values

`calendar` contains:

- `periodIndex`: integer `0`–`63`;
- `pendingCrash`: boolean;
- `crashPeriods`: ordered unique period indexes.

Week, named work period, and floor act are calculated from `periodIndex`.
Browser time and visual frames cannot advance it. A crash period cannot appear
twice or exceed the current campaign period.

`campaignValues` contains:

- `energy`: integer `0`–`5`, initially `4` in Standard and `5` in Supported;
- `evidence`: integer `0`–`12`, initially `3`;
- `elenaPaperConfidence`: integer `0`–`100`, initially `45`;
- `integrity`: integer `0`–`100`, initially `100`;
- `integrityRecoveryUsed`: integer `0`–`10`, initially `0`;
- `histories`: ID-keyed permanent change records for these values.

Valid rule effects stop at the approved limits. They do not wrap, overflow, or
create fractions. Integrity event types are `omittedEvidence`,
`alteredReading`, `unsupportedReading`, `restoredEvidence`, and
`correctedDraft`. The unsupported-reading fact covers a reported result that
has no permitted raw support; it does not add an actionable fabrication method.

## Relationships

`relationships.byId` contains exactly `MR-CHR-ELENA`, `MR-CHR-HAORAN`,
`MR-CHR-SAMIRA`, `MR-CHR-GABRIEL`, and `MR-CHR-CAMILA`. Each entry contains
`id`, `trust`, `introduced`, `permanentBreach`,
`supportConsumed`, `lastConsequentialSceneId`, and a permanent `history`.

Starting trust values are Elena `60`, Haoran `60`, Samira `40`, Gabriel `60`,
and Camila `40`. The first four start introduced. Camila starts hidden and not
introduced until Week 8. A trust value is an integer `0`–`100`. A later high
value cannot erase a permanent breach. Support can be consumed only once.

## Change records and revision rules

Every stored change record contains:

- `id`;
- `stateRevision`;
- `sequence`;
- `sourceType`;
- `sourceId`;
- `fieldPath`;
- `previousValue`;
- `newValue`;
- `integrityEventType`, which is required only for integrity changes and is
  otherwise `null`.

`sourceType` is `playerAction`, `scheduledEvent`, `sceneOutcome`, or
`systemTransition`. Change IDs use `change:<stateRevision>:<sequence>`. The
sequence starts at `1` inside a successful operation.

One successful state-changing operation increments `stateRevision` once, even
when it creates several change records. Rejected and no-change operations do
not increment it. Initial values are defaults, not change records.

Histories are permanent and ordered. Sequence is one global order inside a
revision, not a separate order that restarts in each field history. Across all
histories, one revision contains exactly `change:<revision>:1` through
`change:<revision>:<count>` with no gap or duplicate. Each record remains in
the history for its exact `fieldPath`. A record cannot be edited or removed. Its
previous value must match the value before that change; its new value must be
different; and the newest value must match the current fact.

## Experiments

`experiments` contains these collections:

- `equipmentById` and its permanent factual histories;
- `preparationById` and its permanent factual histories;
- `runsById`;
- ordered unique `activeRunIds`;
- immutable `rawRecordsById`;
- immutable `evidenceCardsById`;
- immutable `stopLogsById`.

The equipment and preparation collections are sparse run-fact collections.
They are empty before any run exists. `configureExperiment` later creates the
run, its equipment fact, and its preparation fact atomically. Each collection
is keyed by the owning run ID; the value does not create a second independent
content identity. A missing entry for an existing run is invalid. Rules do not
invent an equipment or preparation content ID.

Experiment templates remain in validated content, not campaign state.
Availability, repeat availability, and completion are calculated from content,
calendar, scenes, and existing records.

Run IDs use `run:<templateId>:<runNumber>`. Only laser/sham, damage range,
batch check, and repair-state templates allow run `2`; every other run number
is `1`. Run stages are `configured`, `running`, `readyForAnalysis`, `analysed`,
and `stopped`. Attention states are `normal`, `checkReady`, and
`attentionNeeded`. At most three runs are active.

A run stores its qualitative goal, control, observation, and risk choices;
sample condition (`stable`, `stressed`, or `failing`); equipment state
(`ready`, `limited`, or `unavailable`); issue count; severe-issue fact;
projected and final result bands; locked variation namespace, target ID, draw
index, and integer bucket from `0` through `99`; and ordered monitoring
responses. The only S04 namespaces are `experimentVariation` and
`piimOutcome`. Experiment runs use `experimentVariation`, their run ID, and
draw index `0`. Monitoring responses are `continue`, `qualityCheck`,
`stabilize`, and `stop`. A normal run has one window; oxygen loss has two.

Final analysis creates exactly one immutable raw record and one immutable
evidence card. Their IDs are `raw:<runId>` and `evidence:<runId>`. The raw
record stores the biological result, final preparation band, structure,
rhythm, repatterning, control, observation coverage, monitoring, fatigue, and
internal-mismatch facts used by S04. The evidence card stores the evidence
quality, selected reading, selected caveat, reported-reading status, awarded
support, and raw-record source. Reported-reading status is `honest`, `altered`,
or `unsupported`; it never changes the raw record. A stopped run creates
`stop:<runId>` and creates neither a raw record nor an evidence card. An
evidence source is its experiment raw record or the single Samira contribution,
whose evidence ID and source ID are both
`evidence:MR-SUP-SAMIRA-EVIDENCE` and `MR-SUP-SAMIRA-EVIDENCE` respectively.

A configured, running, or ready-for-analysis run appears exactly once in
`activeRunIds`. An analysed or stopped run never appears there.

## Manuscript

Only committed manuscript versions are stored. The board contains exactly:
one claim slot, three figure slots, two control slots, one caveat slot, one
authorship slot, one supplementary slot, and one active-request slot. Empty
slots are `null`.

Snapshots use `snapshot:<stateRevision>`, are immutable, and are ordered by
campaign revision. Each stores factual requirement results: `met`, `missing`,
`conflict`, or `unsupported`. Earlier snapshots are visible history and cannot
act as free undo. `currentSnapshotId` is `null` before the first commit and
otherwise points to the newest snapshot.

Revision-task states are `locked`, `available`, `committed`, and `expired`.
Revision-task state is sparse: a validated authored task enters this collection
when its scheduled transition first makes it a campaign fact. Absence before
that transition is not an invented locked record. Each of the three reviewer
records, `MR-REC-REVIEWER-1`, `MR-REC-REVIEWER-2`, and
`MR-REC-REVIEWER-3`, exists from campaign creation. Each stores exactly one
immutable `base` or `conditional` form when that report exists. Before review,
the form is `null`.

Preprint states are `notPosted`, `public`, and `withdrawn`. Journal states are
`notSubmitted`, `submitted`, `majorRevision`, `withdrawn`, and `resolved`.
Final paper state is `null` before it exists, then `published`,
`acceptedPendingFinalWork`, `underReview`, or `rejectedOrWithdrawn`. PIIM cards
are `met`, `partlyMet`, or `notMet` and do not exist before the reports. A
resolved PIIM outcome also stores its response band, the `piimOutcome`
namespace, stable target ID, draw index `0`, integer bucket, and one locked
result. Withdrawal stores no variation facts and uses `rejectedOrWithdrawn`.

Frozen `MR-IF-002 v4` adds the minimum PIIM source and order proof:

- every evidence card has `piimRole` equal to `batch`, `oxygen`, or `none`;
- every manuscript board has `claimLevel` equal to `careful`, `strong`,
  `inflated`, or `null`;
- every snapshot's strict `requirementResults` object has exactly
  `supportedFigure`, `relevantControl`, `distinctExperimentFigures`,
  `structureCoverage`, `rhythmCoverage`, `matchedControl`, `caveat`, and
  `causalSupport`; each value is `met`, `missing`, `conflict`, `unsupported`,
  or `null` when that requirement does not apply to the selected claim;
- every snapshot has `statedMissingRequirement`, which is one applicable
  requirement key or `null`;
- `piimCardSources` has exactly `batchEvidenceCardId`,
  `oxygenEvidenceCardId`, and `claimSnapshotId`, with a nullable source
  permitted only when its card is `notMet`; and
- `piimMilestones` has exactly `publicPreprintRevision`,
  `journalChainRevision`, `reviewerReportsRevision`, `piimCardsRevision`, and
  `piimOutcomeRevision`, each a nullable campaign revision.

Present milestone revisions are safe positive integers no greater than the
campaign revision. They are strictly ordered as listed. A later milestone
cannot exist without every earlier milestone. All three reviewer reports must
exist at their milestone. PIIM cards must use the current immutable snapshot
and applicable included evidence. The outcome target is exactly
`MR-PIIM-OUTCOME`, and its outcome milestone is required.

For PIIM claim validation, Careful requires `supportedFigure`,
`relevantControl`, and `caveat`. Strong requires
`distinctExperimentFigures`, `structureCoverage`, `rhythmCoverage`,
`matchedControl`, and `caveat`. Inflated requires the Strong set plus
`causalSupport`. Other requirement keys are `null`. A non-null
`statedMissingRequirement` must name one applicable `missing` result and needs
a present board caveat. A `conflict` result is a visible contradiction. The claim
card is `met` when every applicable result is `met`, `partlyMet` when exactly
one applicable result is `missing` and the caveat states that limit, and
`notMet` otherwise. An Inflated claim without causal support is `notMet`.

For batch and oxygen, the source evidence card must have the matching
`piimRole`, a present raw record, an included figure, its control, and its
caveat. `usable` maps to `met`; valid `worthRepeating` or `inconclusive` maps
to `partlyMet`; an absent, omitted, `suspicious`, visibly unsupported, or
visibly contradicted source maps to `notMet`. The fixed S04 response-band and
bucket tables remain unchanged.

The manuscript stores fixed variable-authorship states for Haoran and Samira,
the factual status of reported readings (`honest`, `altered`, or
`unsupported`), omitted evidence IDs, and committed effects. Each committed
effect applies once and remains in history. Using Samira evidence requires the
matching Samira authorship state.

## Narrative and scheduler

`narrative` contains ID-keyed scenes, messages, requests, concerns, and routes,
plus `scheduler` and `protagonist`.

These content-owned lifecycle collections are sparse. At creation, only the
approved opening scene and event are stored. A later validated S06 content
object enters campaign state only through its first successful S04 or S05
transition. Absence means that the authored object has not yet become a
campaign fact; it does not create an implicit stored field. Once present, the
entry is permanent and follows the lifecycle below. Application validates each
present authored ID against the selected immutable content profile before it
can activate or save the state. Rules do not hard-code an undocumented event,
message, request, concern, or scene ID.

Scene states are `locked`, `eligible`, `queued`, `inProgress`, `completed`,
and `skipped`. Message states are `locked`, `available`, `read`, `replied`, and
`expired`. Request states are `locked`, `available`, `completed`, and
`expired`. Concern entries preserve source, visibility, current response, and
permanent response history.

Each scene also stores its locked authored-form ID or `null` and its final
presentation state. The final presentation state is `closingPlayed`,
`recapShown`, or `null`. It stays `null` before a result exists. A completed or
skipped scene can temporarily retain `null` only after its campaign result is
saved and before closing or recap presentation is recorded. On validated load,
S05 converts that recoverable gap to the fixed authored recap; it never replays
or reapplies the choice.

Route states are `locked`, `developing`, `available`, `closed`, `chosen`, and
`declined`. The Aldercroft and Morrow routes start locked. A chosen route must
have been available. Choosing it records any other available route as
declined. Locked or closed routes cannot be chosen.

Frozen `MR-IF-002 v4` adds the minimum permanent facts that make the existing
route rules checkable without interpreting a general-purpose content ID.
`narrative.careerProgress` contains
`researchPlanCompletedPeriod`, `camilaReplySent`, `morrowVideoCompleted`, and
`fabricationConfessedToCamila`. The period is `null` or an integer from `0`
through `43`; the three other fields are booleans. A video needs an earlier
reply, and a confession to Camila can exist only with the completed video.

Each concern has one `routeImpact`: `none`, `aldercroft`, `morrow`, or `both`.
The S06 restricted rules view owns the mapping from its authored source to
this value. A visible concern with the applicable impact blocks that route
until its current response is `correct`. The concern and response history stay
permanent after correction.

Each route also stores `evaluation`, which is `null` before its one fixed
check. The locked evaluation proof contains the exact evaluation period, one
named boolean for every S04 prerequisite, and `eligible`. `eligible` is true
only when every named prerequisite was true. `evaluated`, `evaluation`, and
the route state must agree: `available`, `chosen`, and `declined` require one
eligible proof. A failed evaluation closes the route with an ineligible proof.
A route that closes for an earlier or later authored reason keeps `evaluation`
`null` or preserves its earlier eligible proof. A later trust, concern, paper,
or PIIM change cannot rewrite the proof or reopen the route. The transition that
creates the proof validates its named values against the pre-transition state;
the complete-state validator checks its fixed shape, internal agreement, and
all still-permanent source facts.

Each route also stores `closureReason`, which is `null` unless its state is
`closed`. Aldercroft permits `failedEvaluation` or `publicWithdrawal`. Morrow
permits `failedEvaluation`, `publicWithdrawal`, `messageExpired`,
`fabricationConfession`, or `playerDeclined`. The reason must agree with the
permanent state fact that caused it. A failed evaluation requires its route
proof; an earlier closure does not fabricate an evaluation.

The route evaluation is this closed union:

- Aldercroft stores `routeId: aldercroft`, a positive `evaluationRevision`,
  `evaluationPeriod` from `48` through `51`, `researchPlanOnTime`, `evidenceAtLeastSix`,
  `elenaConfidenceOrTrust`, `noBlockingConcern`,
  `publicRecordNotWithdrawn`, and `eligible`;
- Morrow stores `routeId: morrow`, a positive `evaluationRevision`,
  `evaluationPeriod` from `56` through `59`, `camilaReplySent`,
  `morrowVideoCompleted`, `publicPreprintAvailable`, `threeAnalysedRecords`,
  `honestLimitationPresent`, `camilaTrustAtLeast41`, `noFabricationConfession`,
  `noBlockingConflict`, and `eligible`.

The evaluation revision cannot exceed the campaign revision. Every named
prerequisite is boolean. `eligible` is their conjunction.
`evaluation.routeId` matches the record key. An evaluated route keeps this
proof when it becomes `chosen` or `declined`.

The scheduler stores `eventsById`, ordered unique `queue`, `activeEventId`, and
`lastSchedulerRevision`. Every stored event contains its stable ID, lifecycle
state, `firstEligiblePeriod`, and `resolvedPeriod`. The two period fields are a
period index or `null`. Authored delivery type, window, priority, deadline, and
order remain in validated S06 content rather than campaign state.

Event states are `locked`, `eligible`, `queued`, `active`, `completed`, and
`expired`. A locked event has both period fields `null`. Eligibility records
`firstEligiblePeriod` once and never clears it. Completion or expiry records
`resolvedPeriod` once. Every queued ID has state `queued`; the one active ID
has state `active` and is absent from the queue. A scene in progress matches
the active scheduler event. Completed, skipped, or expired content cannot
remain active or queued.

`lastSchedulerRevision` changes only when an applied command changes scheduler
event or queue truth. It never exceeds `stateRevision`. A harmless scheduler
check, ignored late presentation token, rejected command, reload, browser
frame, or other no-change operation does not update it.

Browser time and visual frames cannot change scheduler state. S05 defines the
future ordering and safe-point algorithms.

## World, content history, and conclusion

`world` stores `floorAct`, `safeAnchorId`, four physical character placements,
three operational room states, and persistent environment IDs. It never stores
geometry, collision shapes, a Three.js transform, or camera data.

S08 maps each permitted semantic anchor ID to one exact safe physical position
and authored facing, and maps character IDs to approved background anchors. A
saved campaign continues to store IDs only; it does not gain position, camera,
target, or focused-view fields.

The five floor acts and ranges are:

| Stored act                 | Weeks | Player-visible design name  |
| -------------------------- | ----: | --------------------------- |
| `orderlyButOverbooked`     |   1–4 | Orderly but overbooked      |
| `manuscriptClutter`        |   5–7 | Manuscript clutter          |
| `rejectionAndPublicRecord` |   8–9 | Rejection and public record |
| `reviewPressure`           | 10–14 | Review pressure             |
| `decisionHorizon`          | 15–16 | Decision horizon            |

Elena, Haoran, Samira, and Gabriel use approved semantic anchor IDs or `null`
when absent. Camila has no physical placement. Required scenes can temporarily
override the background roster. Operational room states preserve only their
factual inactive, unresolved, or resolved condition; S05 defines activation
and S08 defines presentation.

`contentHistory` stores selected variants, completed and expired content IDs,
read message IDs, consumed once-only contextual lines and reactions, displayed
once-only environmental-text IDs, recorded scene-closing and scene-recap IDs,
and campaign Citation IDs. Selected variants never reroll. A resolved scene has
at most one final closing or recap receipt. All IDs must exist in validated
content and cannot be consumed before their content starts. Persistent
cross-campaign Citations stay outside campaign state.

Conclusion states are `unresolved`, `choicePending`, `confirmed`,
`epilogueInProgress`, and `completed`. The state stores the final choice ID and
exactly one career, paper, integrity, fatigue, and relationship module after
they exist, in that order. Progress cannot move backward. Confirmation needs
one valid choice. Epilogue progress needs the matching ending modules.
Completion needs the final scene, choice, modules, and epilogue all complete.

## Stable identifier contract

Campaign-local generated IDs use these exact forms:

- `run:<templateId>:<runNumber>`;
- `raw:<runId>`;
- `evidence:<runId>`;
- `evidence:MR-SUP-SAMIRA-EVIDENCE`;
- `snapshot:<stateRevision>`;
- `stop:<runId>`;
- `change:<stateRevision>:<sequence>`.

Every stable ID contains 1–128 ASCII letters, numbers, periods, underscores,
colons, or hyphens. A known family must also match its family grammar. IDs are
unique throughout the campaign where their family can be referenced, cannot
be reused after terminal state, and always match their record key.

`contentVersion` uses the S06 `MAJOR.MINOR.PATCH` grammar and starts at
`1.0.0`. `buildProfileId` is exactly `full`, `fallback`, or `slice`. It is
fixed when the campaign is created and cannot change during load, content
migration, or play.

## Numeric and validation contract

Every stored number is an exact JavaScript safe integer. Fractions, negative
zero, non-finite values, and values beyond the safe-integer range are rejected.
Specific domain limits apply in addition to this general rule.

Validation is strict:

1. reject unknown, missing, duplicate, incorrectly typed, invalid, or
   out-of-range data;
2. check record keys, ID uniqueness, references, history continuity, and
   collection ordering;
3. check all cross-section invariants;
4. create and return a new checked plain-data copy;
5. never repair silently, retain an input reference, or return partial state.

Creation, every successful transition, load or migration, and every save or
active-state replacement use validation. `rules` owns the canonical schema.

Validation has two connected stages. The codec checks the complete campaign
structure and internal references. Before activation, `application` also
checks every content ID, `contentVersion`, and `buildProfileId` against S06
`ValidatedContent.metadata` and its restricted rules view. An earlier content
version is accepted only when the current manifest lists it exactly and S07
successfully completes the approved S06 mapping and full-state validation.

The complete campaign must also satisfy these invariants:

- floor act, character schedule, event window, expiry, and period agree;
- no history, snapshot, or scheduler revision exceeds `stateRevision`;
- every manuscript figure, control, caveat, reading, omission, and PIIM card
  traces to a permitted evidence source;
- reviewer, PIIM, preprint, journal, route, and conclusion facts occur only
  after their prerequisites and agree with permanent narrative records;
- public-record withdrawal cannot coexist with an available career route;
- permanent histories, snapshots, records, cards, and stop logs cannot be
  removed, edited, or reused between an earlier and later state.

Internal validation also enforces every internally checkable S03 relation:
global change sequence and per-field value continuity; run-stage, active-list,
equipment, preparation, variation, and monitoring agreement; raw-record,
evidence-card, Samira-source, snapshot, manuscript-source, reviewer, PIIM,
scene, scheduler, room, route, withdrawal, and conclusion prerequisites; exact
fixed relationship, reviewer, route, and room inventories; and absence of
orphan or premature terminal facts. S06 owns existence in the selected
authored catalogue. A later transition-pair check owns comparison of permanent
facts between two otherwise valid states.

For `MR-IF-002 v4`, this boundary includes exact route-evaluation proofs,
career-progress order, concern route impact, PIIM source roles, fixed claim
requirements, milestone order, the single PIIM target, and the complete S04
card mapping. S06 still owns the independent check that an authored ID has the
semantic role claimed by its typed rules-view entry. A general-purpose content
or effect ID alone is never proof of a route or PIIM prerequisite.

## Canonical JSON representation

`CampaignStateCodec.serialize()` emits one compact UTF-8 JSON text containing
only validated campaign state. It follows the fixed top-level and field order
in this specification. ID-keyed record keys are sorted by ID. Ordered lists
retain their meaningful order. Unicode remains Unicode; JSON escapes control
characters as required.

`parse()` and `serialize()` both validate the complete state. Each returns one
complete success or one typed failure. A serialize-parse round trip reproduces
the same campaign facts. Serializing that result again produces identical
text.

Failure diagnostics contain a stable field path and short reason code. They do
not include raw save values or a partly accepted campaign.

## Initial state fixture

`MR-S03-FIX-001` is the complete valid Standard new-campaign fixture. S12 will
encode it in executable form. Its test-only metadata uses a documented fixed
lowercase UUID, unsigned seed, content version, and `full` build profile. The
test protagonist is `Morgan` with `theyThem`; this is not a game default.

At creation:

- `stateRevision` and `periodIndex` are `0`;
- energy is `4`, evidence `3`, Elena paper confidence `45`, integrity `100`,
  integrity recovery used `0`, no crash is pending, and histories are empty;
- relationships use the five exact `MR-CHR-*` IDs and approved starting values,
  and only Camila is hidden;
- equipment and preparation collections are empty because no run exists;
- there is no run, active run, raw record, evidence card, or stop log;
- every manuscript slot and revision-task collection is empty; the three exact
  reviewer records exist with `null` forms; preprint is `notPosted`, journal is
  `notSubmitted`, the PIIM source and milestone fields are empty, and later
  paper facts are `null`;
- `MR-SCN-CLARIFIED` is the only stored scene and event, is queued, and is the
  only scheduler queue entry; message, request, and concern collections are
  empty; no event is active; the opening event's first eligible period is `0`,
  its resolved period is `null`, and the last scheduler revision is `0`;
- career progress is empty and false; both routes are locked, unevaluated, and
  have `null` evaluation proofs and closure reasons;
- the world uses `orderlyButOverbooked`, recovery anchor
  `MR-ANCHOR-REC-SHARED-DESKS`, absent Elena,
  `MR-ANCHOR-CHARACTER-HAORAN-TISSUE-CULTURE`,
  `MR-ANCHOR-CHARACTER-SAMIRA-SHARED-DESKS`, and
  `MR-ANCHOR-CHARACTER-GABRIEL-FACILITY`; its exact inactive room inventory is
  `MR-ROOM-FACILITY-QUEUE`, `MR-ROOM-IMAGING-BOOKING`, and
  `MR-ROOM-IMAGING-SERVICE-LIMIT`;
- content history is empty and conclusion is `unresolved`.

A smaller Supported vector changes only `pressureProfile` to `supported` and
initial energy to `5`. Story, content, relationships, and every other starting
fact remain equal.

## Required rejected fixtures

Every rejected fixture changes one fact from `MR-S03-FIX-001` unless it is an
explicit transition pair. S12 gives each variant an executable case ID.

| Group            | Required rejection                                                                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MR-S03-REJ-001` | Missing required top-level section.                                                                                                                                                  |
| `MR-S03-REJ-002` | Unknown field.                                                                                                                                                                       |
| `MR-S03-REJ-003` | Wrong value type.                                                                                                                                                                    |
| `MR-S03-REJ-004` | Fraction, out-of-range integer, non-finite value, or negative zero.                                                                                                                  |
| `MR-S03-REJ-005` | Camera, pointer-lock, open-panel, or other forbidden presentation data.                                                                                                              |
| Identity         | Key/internal-ID mismatch, duplicate ID, reused ID, or malformed family ID.                                                                                                           |
| Reference        | Missing referenced run, raw record, evidence, content, or snapshot.                                                                                                                  |
| Active run       | Duplicate, missing, terminal, or fourth active run.                                                                                                                                  |
| History          | Missing or duplicate sequence, wrong order, wrong previous value, current-value mismatch, edit, or removal.                                                                          |
| Experiment       | Stage/active-list mismatch; analysed run without exactly one raw record and card; stopped run without exactly one stop log or with evidence.                                         |
| Evidence         | Evidence source outside its matching raw record or the Samira contribution.                                                                                                          |
| Manuscript       | Snapshot order or current-snapshot mismatch; premature reviewer or PIIM fact; public preprint without snapshot; duplicate committed effect.                                          |
| Scheduler        | Queue/state mismatch, duplicate queue ID, active ID also queued, scene/active-event mismatch, invalid eligibility or resolved period, or scheduler revision after campaign revision. |
| Content          | Unknown, premature, repeated once-only, changed selected variant, contradictory scene-closing and recap receipts, or invalid final scene-presentation state.                         |
| World            | Wrong floor act, invalid anchor, early Camila introduction, or physical Camila placement.                                                                                            |
| Route            | Chosen route was not available, locked/closed route chosen, or missing decline of the other available route.                                                                         |
| Conclusion       | Skipped or reversed state, missing choice, missing ending module, or premature completion.                                                                                           |

Transition-pair fixtures compare an earlier and later valid-looking state and
reject removal, editing, or ID reuse of any permanent history, snapshot, raw
record, evidence card, or stop log.

## `MR-IF-002` historical candidate `v1`

The public surface is:

- campaign and serializable domain data types;
- `createInitialCampaignState()`;
- `validateCampaignState()`;
- `CampaignStateCodec.parse()`;
- `CampaignStateCodec.serialize()`.

Every operation returns a complete success or typed failure. Every successful
creation, validation, or parse returns a new checked plain-data copy. No caller
receives partial state or can mutate its supplied input through the result.

Owner: `rules`. Consumers: application, scheduler, content validation,
persistence, UI projection, cutscenes, and tests.

The historical candidate did not define which new-campaign facts the caller
supplies. Step 4 later found this implementation gap before code depended on
it.

S04 refines candidate `MR-IF-002` with exact stored experiment-variation,
raw-record, evidence-card, PIIM-lock, content-presentation, and ending-module
facts. S05 further refines it with the scheduler-field rename, event period
facts, locked scene form, and final scene-presentation state. These changes
occur before implementation and freeze, so no save migration exists.
S06 connects exact content-version and immutable-profile validation through
candidate `MR-IF-006`. S07 connects the complete canonical JSON to a strict
campaign envelope, repeated identity and version checks, the 1 MiB UTF-8
limit, complete save and load validation, atomic active and backup storage,
source-preserving migration, and compact completion. `MR-IF-002` remains
candidate until S12 supplies executable fixtures and S14 completes the
cross-interface audit. Candidate status does not authorize implementation.

S08 maps the saved semantic `world` facts into its draft world projection and
fixed spatial plan without refining this serializable state. It preserves the
S03 rule that browser pose and camera data are never campaign facts.

S09 maps only approved player-visible campaign facts into candidate
`MR-IF-010`. It does not expose the complete state, hidden values, mutable
content, pointer capture, input mode, selected screen, or other temporary
presentation data through `MR-IF-002`.

## S03 acceptance and handoff

S03 is documented when:

- this complete shape, boundary, identifier, initial-state, invariant,
  serialization, and rejected-fixture contract is present;
- the numbered creative design remains unchanged except for the approved
  protagonist-name limit and technical cross-references;
- `MR-IMP-OPEN-003` is resolved and `MR-IF-002` is candidate `v1`;
- S04 is the durable next block; and
- no code, package, asset, remote, licence, or deployment file exists.

S04 and S05 use and refine this candidate state contract. S06 supplies its
exact authored-content connection. S07 preserves all three contracts through
candidate `MR-IF-007`; it never repairs or partially writes campaign state.

## S14 audit record

The S14 cross-interface and contradiction audit is complete. Every shared
interface defined or connected by this specification is frozen `v1` through
the interface register and `specification-audit.md`. Earlier candidate-state
statements preserve the interface lifecycle before S14; they are not the
current state. No executable fixture or measured result exists. Gate 1 is
ready for Leonardo's separate approval, and no implementation is authorized.

## Step-4 evidence-led supersessions

On 2026-09-02, Leonardo approved the evidence and impact packet that
supersedes `MR-IF-002 v1` with frozen `v2`. The exact public creation operation
is:

`createInitialCampaignState(input: CampaignCreationInput)`

`CampaignCreationInput` contains exactly:

- `campaignId`;
- `campaignSeed`;
- `contentVersion`;
- `buildProfileId`;
- `pressureProfile`;
- `protagonist.name`; and
- `protagonist.pronounSet`.

The caller cannot supply `schemaVersion`, `stateRevision`, calendar position,
starting values, starting relationships, histories, world facts, or other
fixed initial facts. The existing S03 contract supplies them. Creation still
returns one complete success or typed failure and a new checked plain-data
copy.

This refinement changes no stored field, identifier grammar, starting value,
validation rule, canonical JSON fact, content link, consumer responsibility,
or player-visible meaning. No save migration is required because no campaign
save exists. Historical `v1` remains evidence. `MR-IMP-OPEN-016` and
`MR-IMP-DEC-305` record the gap and approved supersession. Step-4
implementation and independent review remain future evidence.

Complete independent review then found that `v2` required initial records whose
content-owned IDs did not exist in the approved source documents. Implementing
that wording would require rules to invent S06-owned IDs. Leonardo therefore
approved the evidence and impact packet that supersedes `MR-IF-002 v2` with
frozen `v3` on 2026-09-02.

Version `v3` preserves the exact creation input above. It adds the sparse run
and authored-content lifecycle, exact fixed identities and initial roster, one
global sequence per campaign revision, complete internal invariant boundary,
and complete initial fixture in this specification. The serializer sorts each
ID-keyed record by ID according to its declared field position. It does not
reject an equivalent valid state because its JavaScript insertion order is
different. Ordered lists retain their meaningful order.

This supersession changes no player-visible rule, starting value, balance,
story, command algorithm, save migration, or accepted earlier result. S06
continues to own authored IDs. Historical `v1`, `v2`, the first submitted code,
the primary audit, and the blocked review remain evidence. `MR-IMP-OPEN-017`
and `MR-IMP-DEC-306` record the finding, impact, approval, and resolution.

On 2026-09-03, the next complete review found that `v3` stated exact route and
PIIM prerequisite validation but did not store enough typed proof to perform
it. Leonardo approved the narrow correction that supersedes `v3` with frozen
`v4`. It adds only the career-progress, concern-route-impact,
route-evaluation, PIIM-role, claim-level, fixed requirement, PIIM-source, and
milestone facts defined above. It also fixes the deterministic outcome target
to `MR-PIIM-OUTCOME`.

The S04 route conditions, PIIM tables, conclusion rules, starting values,
story, balance, commands, effects, and player-visible results do not change.
No save or migration exists because Step 4 is not integrated or accepted.
Historical `v1` through `v3`, all submitted commits, audits, and reviews remain
evidence. `MR-IMP-OPEN-018` and `MR-IMP-DEC-307` record the approved impact
and resolution.

## Correction C02: frozen MR-IF-002 v5

The state schema version becomes 2. Each immutable experiment raw record adds exactly `scientificFacts`: `structureRecovery` (boolean), `rhythmRecovery` (boolean), `repatterningTracksRecovery` (boolean), and `controlKind` (`matched` or `limited`). These are saved qualitative meanings of the linked raw observation/control IDs, assigned by validated content. They are not new player controls. S06 connected validation must compare every fact with the linked ID meaning; structural validation alone cannot certify that mapping.

Each snapshot's strict requirementResults object adds `associationSupport` with the existing result union. It is applicable for Strong and Inflated and null for Careful or no claim. For honest support, Strong's distinct supported figures must each carry a compatible recovery observation; apparent dishonest support follows the explicit C02 reported-support table. Its structure/rhythm coverage uses the corresponding scientificFacts booleans, not mere presence of an ID. At least one included usable honest record must combine transient repatterning and structure or rhythm recovery. A matching control ID counts as matched only when its raw controlKind is matched. Unknown/missing fact fields fail validation; never default missing facts to true.

The visible reported-support calculation preserves deliberate altered/unsupported readings. Such a reading may supply apparent recovery, association or causal support under the existing integrity and contradiction rules; it cannot change scientificFacts. The codec does not expose a separate hidden-truth label. Later connected-content tests check selected honest readings against the facts and caveat meaning. These checks must not be mistaken for Step-4 content validation.

The existing completedContentIds entry `MR-SLICE-CLAIM-REHEARSAL` records slice rehearsal completion. It requires buildProfileId slice, period at most 11, an existing current manuscript snapshot and completed laser analysis. It is incompatible with full/fallback, any career evaluation, public preprint, PIIM milestones or non-unresolved campaign conclusion. Slice completion is not campaign conclusion; no career or ending module is fabricated. Persistence verifies the checkpoint before showing completion. A full-game draft still obeys the Week-5 task gate.

No creation-input member, command discriminant, effect member, random algorithm or ending count changes. MR-IF-002 v4 remains historical evidence; v5 was frozen by Leonardo's 2026-09-06 correction approval.

## Correction C01: saved monitoring origin and expiry

Each ExperimentRun adds startedPeriod, the period reached after its successful start command, not the period at which the command began. It is null while configured. It is a safe integer 0–63 no later than the current period for running, readyForAnalysis or analysed runs and ordinary stopped runs. It never changes after start. A configured run stopped by the exact start-window-expired reason retains null, no variation, no monitoring responses and no preparation result. Its stop log and inactive slot are required; it cannot have a raw record or evidence card.

MonitoringRecord.completedPeriod remains the period after its response action. For a one-period monitoring response, eligibility is checked at completedPeriod minus one against the startedPeriod-derived inclusive offset. Responses are ordered, unique per window and cannot precede startedPeriod. No field or check infers an origin from the current clock. Missed-window transitions are future S05 rules; this amendment must not fabricate a player response to a missed window.

Automatic start-window expiry and analysis-deadline expiry use existing StopLog.reasonId, respectively MR-REASON-START-WINDOW-EXPIRED and MR-REASON-ANALYSIS-DEADLINE. The former may stop only configured runs and leaves null variation; the latter may stop running/ready runs that actually started, preserves locked variation and responses, and creates no raw/card/support. A stopped run is established by exactly one valid stop log plus either a final stop response or these explicit expiry conditions. It is not required to invent a stop response for an automatic expiry. All stopped runs are absent from activeRunIds. Stop reasons cannot relax invariants for other states.

## Correction C01: missed-window state representation

Stored MonitoringRecord.response adds `missed`; the player command payload still permits only continue, qualityCheck, stabilize and stop. A scheduler missed record has completedPeriod equal to the first entered period after the derived window closes (S+2 for ordinary/oxygen first, S+4 for oxygen second). A real one-period response stores its post-action period with pre-action eligibility as above. The ordered monitoringResponses array contains one record per resolved window, whether answered or missed; a missed record cannot masquerade as a player command or quality check. Final-band/ready-state checks count resolved windows, not only player responses. A stopped configured run has no records. Preserve exactly-once/ordering and the existing issue/coverage consequence for every missed window.

## 2026-09-08 — MR-IF-002 v6 Step5 amendment

MR-IMP-DEC-310 replaces the opening stored event/map/queue identity with `MR-EVT-CLARIFIED`; the scene remains `MR-SCN-CLARIFIED`. Selected tutorial IDs can enter `completedContentIds` through the approved receipt command. Campaign schema remains 2.

The slice uses the exact five-ID dormant-state exception in `analysis/step-05-content-contract.md` subsection20.5. Only `MR-REC-REVIEWER-1`, `MR-REC-REVIEWER-2`, `MR-REC-REVIEWER-3` with null forms and inactive `MR-ROOM-IMAGING-BOOKING`/`MR-ROOM-IMAGING-SERVICE-LIMIT` can lack selected content definitions, only for the slice/evaluationSlice pair. `validateCampaignStateAgainstContent` returns the existing S03 `CheckedResult`; any active or referenced dormant identity fails with `invalidReference`. Full/fallback receive no exception. No schema-1 migration is inferred.
