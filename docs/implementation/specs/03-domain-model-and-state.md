# S03 Domain Model and Campaign State

Status: **documented; `MR-IF-002` frozen `v1` by S14; no implementation authorized**

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

`relationships.byId` contains exactly Elena, Haoran, Samira, Gabriel, and
Camila. Each entry contains `id`, `trust`, `introduced`, `permanentBreach`,
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

Histories are permanent and ordered. A record cannot be edited or removed. Its
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
Each of the three reviewers stores exactly one immutable `base` or
`conditional` form when that report exists. Before review, the form is `null`.

Preprint states are `notPosted`, `public`, and `withdrawn`. Journal states are
`notSubmitted`, `submitted`, `majorRevision`, `withdrawn`, and `resolved`.
Final paper state is `null` before it exists, then `published`,
`acceptedPendingFinalWork`, `underReview`, or `rejectedOrWithdrawn`. PIIM cards
are `met`, `partlyMet`, or `notMet` and do not exist before the reports. A
resolved PIIM outcome also stores its response band, the `piimOutcome`
namespace, stable target ID, draw index `0`, integer bucket, and one locked
result. Withdrawal stores no variation facts and uses `rejectedOrWithdrawn`.

The manuscript stores fixed variable-authorship states for Haoran and Samira,
the factual status of reported readings (`honest`, `altered`, or
`unsupported`), omitted evidence IDs, and committed effects. Each committed
effect applies once and remains in history. Using Samira evidence requires the
matching Samira authorship state.

## Narrative and scheduler

`narrative` contains ID-keyed scenes, messages, requests, concerns, and routes,
plus `scheduler` and `protagonist`.

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
- relationships use their approved starting values and only Camila is hidden;
- every equipment condition is `ready` and all equipment and preparation
  histories are empty;
- there is no run, active run, raw record, evidence card, or stop log;
- every manuscript slot is empty, all revision tasks are locked, preprint is
  `notPosted`, journal is `notSubmitted`, and later paper facts are `null`;
- `MR-SCN-CLARIFIED` is queued and is the only scheduler queue entry; all
  later narrative entries are locked, no event is active, its first eligible
  period is `0`, its resolved period is `null`, all locked events have both
  period fields `null`, and the last scheduler revision is `0`;
- both routes are locked;
- the world uses `orderlyButOverbooked`, recovery anchor
  `MR-ANCHOR-REC-SHARED-DESKS`, the Week-1 early background roster, and
  inactive room problems;
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

## `MR-IF-002` candidate `v1`

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
