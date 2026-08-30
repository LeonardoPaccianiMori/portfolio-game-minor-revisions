# S07 — Persistence and Recovery

Status: **documented technical specification; no implementation authorized**

This specification fixes the local IndexedDB database, record shapes, save
order, validation, backup, recovery, migration, Archive completion, settings,
data clearing, failure behaviour, and candidate `MR-IF-007` for *Minor
Revisions*.

S03 owns the canonical campaign state and serializer. S04 owns commands,
rules, state revisions, ending resolution, and effects. S05 owns safe points,
scheduler order, scene checkpoints, and Save and Quit meaning. S06 owns
content versions, build profiles, stable IDs, and direct content mappings.
S07 stores those approved facts. It does not create a new campaign rule,
content item, ending, or player-visible meaning.

S09 will own the exact screens, focus order, confirmation presentation, and
player-facing error text. S12 will encode the fixtures named here. S14 will
perform browser evidence review and the final interface audit.

Nothing in S07 creates game code, package configuration, runtime save data,
production assets, test evidence, a licence, a remote, deployment, or
implementation permission.

## Terms

- **IndexedDB** is the browser's structured local database.
- A **store** is one named collection inside that database.
- A **transaction** is one indivisible database operation. All its changes
  succeed together or none takes effect.
- An **envelope** is the small version and identity record around canonical
  campaign JSON.
- **Canonical JSON** is text for which the same campaign state always produces
  exactly the same bytes.
- **1 MiB** is 1,048,576 bytes.
- A **safe point** is an S05 state at which no command, equipment action, or
  cutscene result is unresolved.
- A **last-known-good backup** is the earlier active save that passed complete
  validation before a newer active save replaced it.
- **Migration** is an approved forward-only conversion from one known older
  format or content version to the next supported version.
- **Metadata** is the small internal control record for database layout,
  migration history, and Archive ordering. It is not campaign data.
- An **operation queue** is one waiting line that lets only one changing
  persistence operation run at a time.
- **Idempotent** means that an exact retry has the same successful result and
  creates no additional change.
- A **fixture** is a fixed input and expected result that S12 will later encode
  as an executable test.

## Local-only boundary

The database name is exactly `minor-revisions`. Its first IndexedDB layout
version is `1`.

Database layout version, campaign schema version, content version, settings
record version, ending-card record version, Citation record version, and
metadata record version are separate facts. A change to one never silently
changes another.

The game has one persistent game-data database per browser profile. S11's
empty `minor-revisions-capability-probe` is a separate transient platform
check: it has no store, reads no game database, and is closed and deleted
before persistence starts. It is not a save or second persistence system.

The game has no account, server save,
uploaded save, cookie marker, telemetry, analytics, automatic error report,
or automatic unfinished-save expiry. Browser closure, lost connection, focus,
visibility, real time, and device time do not advance a campaign.

IndexedDB is the only campaign persistence system. A failure never causes a
silent switch to cookies, local storage, memory-only save claims, or another
database.

## Version-1 stores and keys

Version `1` contains exactly six stores:

| Store | Key | Stored value |
|---|---|---|
| `settings` | `current` | One complete validated settings record. |
| `activeCampaign` | `current` | One validated unfinished campaign envelope. |
| `activeCampaignBackup` | `previous` | The previous validated active envelope. |
| `endingCards` | Campaign ID | One compact completed-campaign card. |
| `institutionalCitations` | `current` | The persistent Citation unlock record. |
| `metadata` | `database` | Database layout, migration, and completion-sequence control facts. |

All keys are supplied explicitly. No store uses an automatic numeric key.
There is no temporary-save, telemetry, cache, error-report, extra save-slot,
or hidden completion store.

The campaign ID is the ending-card key. `completionSequence`, not real device
time, orders ending cards. It is a positive safe integer that increases by one
for each successful new campaign completion.

## Database metadata

The `metadata/database` value contains exactly:

- `schemaVersion`: `1`;
- `databaseLayoutVersion`: `1`;
- `nextCompletionSequence`: a positive safe integer, initially `1`; and
- `appliedDatabaseMigrations`: an ordered list of successful database
  migration records.

Each migration record contains only a stable migration ID, source layout
version, and destination layout version. The list is empty in a newly created
version-1 database.

Metadata contains no date, clock value, browser name, browser version, device
identifier, protagonist identity, campaign state, setting, or content text.

## Campaign envelope

Active and backup campaigns use the same strict envelope. It contains exactly:

- storage envelope schema version `1`;
- campaign ID;
- campaign state revision;
- campaign schema version;
- content version;
- build profile ID;
- checkpoint reason ID; and
- the complete canonical campaign JSON text.

The repeated campaign ID, revision, campaign schema version, content version,
and build profile must equal the corresponding facts inside the parsed S03
campaign. A mismatch is invalid stored data.

The envelope contains no real timestamp, player-facing English text, browser
detail, Three.js object, DOM object, class instance, function, temporary UI
state, active audio state, pointer-lock state, or renderer state.

The campaign JSON is UTF-8 text from the candidate `MR-IF-002` serializer. It
has a maximum encoded size of 1 MiB. The limit is intentionally much larger
than expected because saves retain IDs and factual state, not authored text or
assets. A larger payload fails validation before a write starts.

Save records are not compressed, encrypted, or given a separate checksum.
Strict parsing, version checks, S03 invariants, S05 safe-point checks, S06
reference checks, and exact canonical comparison are the integrity controls.
Browser-only encryption would not protect the data without an external secret
key and could obstruct recovery.

## Validation before save

`saveCampaign()` accepts one complete immutable snapshot. It never accepts a
partial patch, field list, or mutable campaign reference.

Before opening a write transaction, persistence must:

1. serialize through `MR-IF-002`;
2. enforce the 1 MiB UTF-8 limit;
3. parse the resulting JSON through the same strict boundary;
4. validate the complete S03 structure and invariants;
5. validate envelope and campaign identity and version agreement;
6. validate the immutable build profile and exact content version;
7. validate every saved authored-content reference against the selected S06
   package or its approved direct migration mapping; and
8. validate the S05 scheduler, scene, checkpoint, and safe-point conditions.

Failure before or during this sequence writes nothing. Persistence never
repairs, drops, supplies, or guesses a campaign field.

## Atomic active-save algorithm

Only one persistence operation that can change stored state runs at a time.
Before a campaign write, persistence also rechecks the current active campaign
inside the write transaction.

For a normal new revision, one transaction across `activeCampaign` and
`activeCampaignBackup` performs this order:

1. revalidate the incoming snapshot;
2. read and revalidate the existing active envelope, if present;
3. require the incoming campaign ID to match the existing active campaign;
4. require the incoming revision to be greater than the existing revision
   under the S03 transition contract;
5. copy the valid existing active envelope to backup; and
6. write the new envelope as active.

If the existing active envelope is invalid, the transaction aborts. It does
not copy invalid data into backup or replace either record. If any transaction
step fails, active and backup remain unchanged.

The first New Game save writes active and leaves backup absent. The next valid
save copies that earlier active record to backup.

### Revision and retry rules

- The same campaign ID, same revision, and byte-identical canonical campaign
  JSON is an idempotent retry. It succeeds without rotating the backup again.
- The same campaign ID and revision with different canonical data is a
  revision conflict.
- An older revision is rejected.
- A different campaign ID is a concurrent-change conflict except during the
  separately confirmed New Game replacement transaction.

An idempotent retry does not create a new campaign fact, revision, backup, or
variation draw.

## Required save points

Persistence saves only the complete stable state produced at an approved S05
checkpoint. Required physical saves include:

- the validated initial New Game campaign;
- an applied command plus all required automatic updates at its stable safe
  point;
- experiment start, monitoring, intervention, stop, analysis, and archival
  changes where S05 requests a checkpoint;
- manuscript commits;
- resolved message, concern, route, and final-choice results;
- the locked pre-scene checkpoint;
- the complete saved scene result and recap fact; and
- every other S05 `saveCheckpoint` effect.

Persistence never saves during an unresolved command, manual equipment
interaction, active scheduler operation, unresolved scene choice, or active
scene presentation before the approved result boundary.

A required campaign save must finish before later campaign-changing work can
start. A save failure keeps the last verified stored state, blocks later
campaign-changing actions, and allows safe retry.

Save and Quit waits for the correct S05 checkpoint and its database
transaction. Success closes the campaign and returns to the main menu. Failure
keeps the campaign session open and reports that the save did not complete.
The player can retry or continue only from the allowed unchanged boundary. The
UI cannot report a successful quit after a failed save.

## Operation queue and lifecycle

All persistence writes, migrations, repairs, completion, and deletion use one
operation queue. A read that requires the latest state waits for earlier
writes. This prevents campaign save, settings save, New Game, completion,
repair, and Clear Saved Data from racing.

`start()` opens one connection and performs only recognized approved upgrade
work. Calling it while persistence is already ready has no additional effect.

If another tab or later game version requests a database version change, the
connection closes automatically. The current port becomes unavailable and
later operations fail until a successful restart or page reload.

`stop()` stops acceptance of new operations, waits for an operation already in
progress, and closes the connection. Calling it while already stopped has no
additional effect.

## First database creation

Creating database version `1` uses one IndexedDB version-change transaction.
It creates the six exact stores and initial metadata record together. It does
not create placeholder settings, campaigns, ending cards, or Citations.

If creation fails, no partial store set or partial metadata is accepted.

## Read-only startup inspection

After opening and any approved supporting-record migration, startup inspection
is read-only. It returns:

- settings data or session defaults, with its validation status;
- safe database metadata status and summary;
- active and backup status and safe summaries;
- valid ending-card summaries; and
- the valid Citation unlock set.

Active and backup statuses are exactly `absent`, `valid`, `needsMigration`, or
`invalid`. A safe campaign summary can contain only campaign ID, revision,
content version, build profile, pressure profile, and the checkpoint reason
needed to explain Continue or recovery. It never exposes campaign JSON to the
main-menu UI.

Startup validates settings, metadata, active, backup, each ending card, and
Citations separately. One damaged supporting record does not make unrelated
valid data appear damaged.

Missing settings use defaults. Missing active or backup means that record does
not exist. Missing ending cards or Citations means that none exists. Missing
metadata is valid only while a new database is being created.

## Campaign load validation

Load checks one selected source in this exact order:

1. storage envelope and storage version;
2. canonical JSON parsing and round trip;
3. complete S03 structure and invariants;
4. campaign schema, build profile, and content version;
5. every saved authored-content reference;
6. S05 scheduler, active-event, scene, checkpoint, and safe-point consistency.

A compatible known older campaign or content version returns
`needsMigration`. An invalid, incompatible, or unsupported newer record never
becomes application state.

Continue selects active only. Backup can be loaded only after the player
accepts the recovery offer. Loading is read-only until the complete selected
source validates or its approved migration succeeds. No partial campaign is
published to application memory.

## Recovery matrix

Use this exact startup result:

| Active | Backup | Player action |
|---|---|---|
| Valid | Valid or absent | Offer Continue from active. |
| Valid | Invalid | Offer Continue. The next successful save replaces the bad backup. |
| Invalid | Valid | Offer recovery from backup. Never select it silently. |
| Absent | Valid | Offer recovery from backup. Never select it silently. |
| Invalid or absent | Invalid or absent | Do not offer Continue. |

An accepted recovery transaction:

1. revalidates backup;
2. copies it to active;
3. leaves backup unchanged; and
4. resumes at the backup's exact campaign revision.

The invalid or missing active record changes only after confirmation and
successful transaction completion.

If both campaign records are unusable, offer **Discard Unusable Campaign**.
After confirmation, one transaction deletes only active and backup. It keeps
settings, ending cards, Citations, and metadata. This action is separate from
Clear Saved Data.

## Version and migration rules

Database layout version starts at `1`. Campaign schema version starts at `1`.
Content version starts at `1.0.0`. Each can advance independently.

Every database, record, campaign-schema, and content migration is:

- forward-only;
- one approved direct version step at a time;
- forbidden from skipping an unknown step;
- forbidden from downgrading;
- validated before conversion;
- created as a separate in-memory copy;
- fully validated after conversion; and
- written only after destination validation succeeds.

A failure preserves the source record. An unsupported newer version is never
deleted, repaired, or downgraded.

### Database layout upgrade

A future layout upgrade validates the expected source store structure, applies
each approved direct step, validates the resulting structure, and records each
migration ID. All direct steps occur in the one IndexedDB version-change
transaction. Failure cancels the complete upgrade and retains the earlier
layout version.

If another tab blocks the version change, startup reports `blocked` and does
not claim that the upgrade completed.

### Startup migration order

Startup uses this order:

1. open or upgrade the database layout;
2. migrate compatible metadata, settings, ending cards, and Citations in one
   supporting-record transaction;
3. perform read-only startup inspection;
4. migrate a campaign only after the player chooses Continue or accepts
   recovery.

Campaign records are never migrated merely because the main menu opened.

### Campaign-schema and content migration

When startup reports `needsMigration`, Continue first explains that the save
needs a one-way update and requires confirmation.

The migration validates its source, applies only the approved direct campaign
steps and S06 content-ID mappings in memory, and validates the complete result.
For an active source, one transaction preserves the original source as backup
and writes the migrated copy as active. For accepted recovery from backup, the
backup remains unchanged and the validated migrated copy becomes active.

Migration keeps campaign ID and meaning. It does not reroll variation, choose
a new build profile, change pressure profile, advance time, add content, or
repair unrelated campaign truth. Failure writes nothing.

## Settings

The `settings/current` record contains exactly:

- settings schema version `1`; and
- one complete validated settings payload.

S09 owns the exact settings fields, defaults, ranges, and interface. Settings
contain no campaign state, protagonist identity, ending card, Citation,
browser fingerprint, device identifier, or gameplay carry-over.

Settings use their own transaction and never change active or backup campaign
records. A failed settings save lets the current session continue with its
in-memory value, but the UI must state that the change was not saved.

Missing settings use defaults. Invalid or unsupported newer settings use
defaults for the current session without deleting or silently repairing the
stored record. A later explicit valid settings change can replace it.

## Ending-card record

One `endingCards` value contains exactly the compact facts required to rebuild
the approved card:

- ending-card schema version `1`;
- campaign ID;
- completion sequence;
- build profile ID and pressure profile;
- protagonist name and pronoun set;
- selected career, paper, relationship, integrity, and fatigue ending-module
  IDs;
- the final evidence-packet label;
- the five final working-trust display values keyed by the five recurring
  character IDs;
- five relationship-consequence module references keyed by those characters;
- the one dramatized relationship-afterbeat module ID; and
- the Citation IDs unlocked in that campaign.

Every field validates against the terminal campaign and the applicable S06
content package. Trust values use only the approved 0–100 display values. The
record stores stable values and IDs, not copies of English text.

It never stores the completed campaign JSON, raw histories, hidden formulas,
scene history, experimental raw records, manuscript snapshots, browser data,
empty card slots, expected-run count, or completion percentage.

## Institutional Citation record

The `institutionalCitations/current` record contains:

- Citation record schema version `1`; and
- one entry for each unlocked `MR-CIT-*` ID, with its first-unlock sequence.

Entries have unique IDs and positive safe-integer first-unlock sequences. The
sequence is the completion sequence of the campaign that first unlocked the
Citation, so multiple Citations first unlocked in one campaign can share it. A
repeated unlock preserves the original first-unlock sequence. Device time is
never stored or used for ordering.

Citation IDs validate against the applicable full or fallback content and any
approved direct mappings. Citations carry no campaign fact, route, score,
advantage, or unlock effect into a new campaign.

## Campaign completion transaction

Before completion, persistence validates:

- the complete terminal campaign;
- its S03 and S05 completed condition;
- its campaign ID and revision against stored active;
- its ending-card facts and every module reference;
- its per-character trust and consequence facts; and
- every newly unlocked Citation ID.

One transaction across `metadata`, `endingCards`,
`institutionalCitations`, `activeCampaign`, and `activeCampaignBackup` then:

1. reads and validates the next completion sequence;
2. assigns it to the new ending card;
3. stores the card under its campaign ID;
4. merges new Citations while preserving earlier first-unlock sequences;
5. deletes ending cards with the smallest sequences until exactly the newest
   12 or fewer remain;
6. advances `nextCompletionSequence`; and
7. deletes active and backup campaign records.

The transaction is indivisible. Failure at any point retains the old
metadata, Archive, Citations, active campaign, and backup.

Departures reads compact summaries only and sorts them newest first. It never
loads a completed campaign.

### Completion retry

If the application retries after completion succeeded but before it received
the success result, persistence finds the card by campaign ID. The same ending
facts succeed without a new card, new completion sequence, retention pass, or
second Citation unlock.

The same campaign ID with different ending facts is a storage fault. A state
with both an already completed card and retained active or backup records for
that campaign is also an invariant fault. Persistence never guesses which
copy is correct. Both cases return `invalidData`.

## New Game replacement

If a usable unfinished campaign exists, New Game explains that confirmation
will permanently replace it.

After confirmation, persistence creates and validates the complete new S03
initial campaign. One transaction replaces active and deletes the old backup.
If the write fails, the old active and backup remain unchanged.

Unusable campaign records must first use **Discard Unusable Campaign**. New
Game cannot silently bypass recovery or overwrite an invalid source.

The initial campaign has a new secure random campaign ID and campaign seed,
revision `0`, and no backup until its next successful save.

## Supporting-record damage and repair

Invalid ending cards are excluded from Archive summaries but preserved until
the player chooses a repair. An invalid Citation record makes Citations
unavailable but does not make settings or campaign records invalid.

Because completion must preserve and update Archive data safely, New Game or
Continue cannot enter a campaign while unresolved Archive or Citation damage
would prevent completion. Offer **Repair Archive Data** with a clear warning.

After confirmation, one transaction:

- removes only ending-card records that fail validation;
- preserves every valid ending card;
- replaces an invalid Citation record with an empty valid record; and
- preserves settings, active, backup, and metadata.

The warning states that damaged Departures or Citation unlocks can be lost.
The repair never invents an ending or Citation.

### Metadata recovery

Do not silently repair invalid metadata. A confirmed repair is permitted only
when the recognized IndexedDB layout and valid unique ending-card sequences
prove every reconstructed value. `nextCompletionSequence` becomes one greater
than the highest valid completion sequence, or `1` when no valid card exists.
The migration list must equal the approved path to the recognized layout.

If exact reconstruction is not possible, preserve all stores and block writes.
Offer Clear Saved Data, but never start it automatically. Unsupported newer
metadata cannot be reconstructed or downgraded.

## Clear Saved Data

Settings exposes one confirmed Clear Saved Data action. Its warning lists:

- settings;
- unfinished active campaign and backup;
- all Departures ending cards;
- all Institutional Citations; and
- metadata.

Cancellation changes nothing. There is no selective preservation option.

After confirmation, persistence stops new work, closes its connection, and
deletes the complete `minor-revisions` database. It does not clear stores one
by one. Success returns the running UI to default settings and the main menu,
with no Continue or Archive data, and leaves persistence stopped. A later
`start()` creates a new empty database.

All current game tabs close their database connection when they receive a
version-change request. If an older or unresponsive tab blocks deletion, the
UI explains that the other tab must close and does not claim partial or full
success. An error preserves the database.

## Concurrent browser tabs

Every campaign write rechecks campaign ID and revision inside its transaction.
If another tab has already saved, completed, recovered, cleared, or replaced
the campaign, the outdated tab cannot merge or overwrite the newer state.

The outdated tab receives a revision-conflict failure, blocks later
campaign-changing actions, and offers reload of the latest saved campaign or
return to the main menu. Settings remain on their independent transaction but
still use the shared persistence-operation queue.

No cross-tab conflict uses last-writer-wins for campaign data.

## Failure contract

Every `MR-IF-007` operation returns success or one structured persistence
failure. The closed failure codes are:

- `notStarted`;
- `unavailable`;
- `blocked`;
- `quotaExceeded`;
- `unsupportedVersion`;
- `invalidData`;
- `incompatibleContent`;
- `revisionConflict`; and
- `transactionFailed`.

A failure contains the operation name and whether an exact retry is safe. It
can contain a stable internal issue code. It never exposes campaign JSON,
settings values, protagonist identity, raw IndexedDB exceptions, file-system
paths, stack traces, or browser-identifying detail to player-facing UI.

Storage exhaustion changes no existing record. It never causes automatic
deletion of settings, backup, Departures, or Citations.

S09 maps failure codes to plain interface messages. Unknown browser failures
map to `transactionFailed`; they do not expand the public failure union at
runtime.

## Candidate `MR-IF-007`

Every operation is asynchronous and returns the common success-or-failure
result. The persistence module owns the interface. No other module imports or
uses IndexedDB directly.

| Operation | Input | Success result |
|---|---|---|
| `start()` | None | Ready state, created or upgraded facts, and layout version. |
| `readStartupData()` | None | Safe settings, metadata, active, backup, ending-card, and Citation summaries. |
| `loadCampaign(source)` | `active` or accepted `backup` | Complete validated campaign, source, campaign ID, revision, migration fact, and source-preservation fact. |
| `saveCampaign(snapshot)` | One complete immutable snapshot and checkpoint reason | Campaign ID, saved revision, and backup revision or `none`. |
| `completeCampaign(completion)` | Terminal snapshot, expected ID and revision, ending facts without sequence, and run Citation IDs | Campaign ID, assigned sequence, ending-card summary, and complete Citation unlock set. |
| `saveSettings(settings)` | One complete settings payload | Saved settings schema version. |
| `clearSavedData()` | None; confirmation belongs to application and S09 | Complete database deletion confirmation; port becomes stopped. |
| `stop()` | None | Stopped state. |

`loadCampaign()` publishes no campaign until complete validation and any
approved migration succeeds. `saveCampaign()` returns no modified campaign.
`completeCampaign()` returns no completed campaign and retains none.

`MR-IF-007` is candidate `v1`. Candidate status is a complete specification
contract, not implementation permission.

## Required S07 fixture groups

S12 must later encode the groups below. S07 names fixed cases and expected
results but does not claim that a fixture file or passing test exists.

| Fixture group | Required coverage |
|---|---|
| `MR-S07-SAV-001` | First save, later backup rotation, exact round trip, idempotent retry, same-revision conflict, older-revision rejection, invalid snapshot, transaction failure, queue order, exact 1 MiB acceptance, one-byte-over-limit rejection, and unchanged stores after rejection. |
| `MR-S07-REC-001` | Every active-and-backup status combination, accepted and declined recovery, exact backup revision, unusable-campaign discard, no silent source choice, and another-tab conflict. |
| `MR-S07-MIG-001` | Database, metadata, settings, ending-card, Citation, campaign-schema, and content migrations; every direct success, failed validation, missing step, unsupported newer version, source preservation, active and backup behaviour, and safe metadata reconstruction. |
| `MR-S07-CMP-001` | Atomic completion, exact retry, conflicting duplicate campaign ID, invalid ending facts, Citation merge and repeated unlock, completion sequences, newest-first summaries, thirteen completions retaining sequences 2–13, and unchanged data after failure. |
| `MR-S07-CLR-001` | Cancelled clear, complete database deletion, version-change connection closing, blocked deletion, error preservation, stopped result, and restart with a new empty database. |
| `MR-S07-FLT-001` | Every failure code, invalid settings, individual bad ending card, invalid Citations, confirmed Archive repair, valid and unsafe metadata repair, quota exhaustion, stopped connection, failed settings save, and generic transaction abort. |

Fixtures also prove that browser closure, connection loss, focus, visibility,
pause, menu time, and device-clock changes do not advance campaign state.

Every rejected case names the expected failure code, operation, retry meaning,
and exact stores and in-memory campaign facts that remain unchanged. S12 owns
the executable fixture-file shape and future result. S14 owns final supported-
browser evidence and the interface-freeze audit.

## Connected interface lifecycle

`MR-IF-007` is candidate `v1` after S07. It connects candidate `MR-IF-002`
campaign serialization, candidate `MR-IF-004` saved variation facts,
candidate `MR-IF-005` safe points, candidate `MR-IF-006` content versions and
mappings, and candidate `MR-IF-011` scene checkpoints and restoration.

`MR-IF-002`, `MR-IF-004`, `MR-IF-005`, and `MR-IF-006` remain candidate `v1`.
Their S07 persistence connections are now specified, but S12 executable
evidence and S14 audit evidence do not exist. `MR-IF-011` is now candidate
`v1` through the connected S05 and S10 contracts. S08 supplies the physical
mapping for saved semantic recovery and character-anchor IDs through candidate
`MR-IF-008`; S07 continues to persist only
the validated S03 IDs, never browser pose or presentation objects.

No interface is frozen.

## S07 acceptance and handoff

S07 is documented only when:

- this complete database, store, key, record, validation, save, backup,
  startup, load, recovery, migration, settings, Archive, completion, New Game,
  clear-data, concurrency, failure, interface, and fixture contract is present;
- S02–S06 and the connected numbered design documents contain no
  contradictory persistence claim;
- `MR-IF-007` is candidate `v1`;
- `MR-IMP-OPEN-007` is resolved;
- the implementation controls record the correct next-block pointer for the
  S07 commit;
- every implementation gate remains blocked; and
- Leonardo's approved documentation is committed.

S08 defines world geometry and interaction without changing this S07
persistence contract. S09 now defines the complete settings record,
Continue/New Game, recovery, migration, repair, clear-data, cross-tab, and
nine-code player-facing UI consumer without changing S07 transactions or
failure meanings. S10 now defines presentation resources and restoration
without changing the S07 safe-state boundary. S11 now defines the temporary
capability-probe separation, required storage readiness, sanitized diagnostic
boundary, and measured resource evidence without changing S07 records or
transactions. S12 now supplies the future fixture and acceptance contract.
S13 is the current next technical-specification block.
