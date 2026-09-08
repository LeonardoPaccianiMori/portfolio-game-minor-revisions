# S06 — Content Data and Build Profiles

Status: **C01–C06 approved on 2026-09-06; current authority is the correction sections below and the interface register. Earlier B/R/S lifecycle records are historical. Runtime evidence remains step-specific.**

This specification fixes the authored-content package, strict data shapes,
stable identifiers, references, English-string boundary, full, fallback, and
vertical-slice profiles, validation order, compatibility rules, and candidate
`MR-IF-006` for _Minor Revisions_.

The numbered design documents remain the authority for player-visible story,
meaning, text, balance, and content counts. S03 owns stored campaign shape. S04
owns commands, rules, deterministic variation, and campaign changes. S05 owns
calendar, scheduler, event lifecycle, and cutscene coordination. This document
defines the authored facts that those systems can read. It does not let content
data create a new rule or write an arbitrary campaign field.

S07 owns physical save migration and recovery. S09 owns interface
presentation. S10 now owns verified-resource handoff, rendering, audio
playback, and cutscene presentation. It selects no actual asset or codec. S12
later defines the fixture contract named here. S14 later completes the final
content-safety and cross-interface audit.

Nothing in S06 creates game code, package configuration, content JSON,
production text files, assets, saves, test evidence, or implementation
permission.

## Terms

- **Authored content** is approved data and English text written before play.
- A **data shape** is the exact set and type of properties that an object can
  contain.
- A **reference** is a stable ID that connects one content object to another.
- A **profile** is an explicit list of content selected for the full game, the
  fallback, or the Week-1 vertical slice.
- **Implementation status** says whether one source profile is complete enough
  to build during the approved development phase. It is not runtime data.
- **Dependency closure** means that selected content also contains every item
  that it needs.
- **Migration** means reading an older compatible save with a newer approved
  content package without changing the saved meaning.
- A **validated view** is a checked, read-only subset of content supplied to
  one runtime consumer.
- A **fixture** is a fixed package and expected validation result that S12 will
  later encode as an executable test.

## One source catalogue

There is one authored source catalogue under repository-root `content/`. Full,
fallback, and slice packages are derived from that catalogue. There is no
second copy for a smaller build and no content outside the repository.

The exact planned tree is:

```text
content/
├── manifest.json
├── strings.en.json
├── data/
│   ├── characters.json
│   ├── locations.json
│   ├── actions.json
│   ├── experiments.json
│   ├── tasks.json
│   ├── room-states.json
│   ├── events.json
│   ├── scenes.json
│   ├── messages.json
│   ├── notifications.json
│   ├── records.json
│   ├── endings.json
│   ├── citations.json
│   ├── environmental-items.json
│   ├── contextual-lines.json
│   ├── tutorials.json
│   ├── interface.json
│   └── audio.json
└── profiles/
    ├── full.json
    ├── fallback.json
    └── slice.json
```

These are planned implementation inputs. S06 does not create them. No profile
can refer to a glob, directory scan, inherited profile, outside path, network
resource, Career Center file, portfolio file, or machine-specific location.

## File envelopes

Every file under `content/data/` contains exactly these top-level properties:

1. `schemaVersion`, with the safe integer value `1`;
2. `family`, with the one fixed family name assigned to that path; and
3. `items`, with objects sorted by stable ID.

The fixed family names, in manifest order, are:

`characters`, `locations`, `actions`, `experiments`, `tasks`, `roomStates`,
`events`, `scenes`, `messages`, `notifications`, `records`, `endings`,
`citations`, `environmentalItems`, `contextualLines`, `tutorials`, `interface`,
and `audio`.

Every source file uses UTF-8 JSON and LF line endings. It has one final
newline. Comments, trailing commas, duplicate properties, a UTF-8 byte-order
marker, non-JSON numeric values, and unknown top-level properties are invalid.
JSON property order has no game meaning. The required item and key sorting
exists for stable review and build output.

`strings.en.json` is the one envelope exception. It is a single object that
maps sorted text keys to English strings. It contains no schema property,
nested object, array, number, Boolean, or `null` value.

## Source manifest

`content/manifest.json` contains exactly:

- package ID `minor-revisions-content`;
- `schemaVersion`;
- `contentVersion`;
- language `en`;
- the exact ordered list of the eighteen data-file paths above;
- string-file path `content/strings.en.json`;
- the three profile paths in the order full, fallback, slice; and
- an exact sorted list of compatible earlier content versions.

The manifest contains no game rule, player-facing prose, profile selection,
environment override, date, timestamp, host name, user name, absolute path,
outside path, or machine data. Every listed path is repository-relative,
unique, and below `content/`.

The initial versions are:

- `schemaVersion: 1`; and
- `contentVersion: 1.0.0`.

## Profile envelopes

Each file under `content/profiles/` contains exactly:

- `schemaVersion: 1`;
- profile ID `full`, `fallback`, or `slice`, matching its filename;
- `implementationStatus`, with value `complete` or `incomplete`;
- campaign mode `campaign` for full and fallback or `evaluationSlice` for
  slice;
- explicit, ID-sorted selections for every data family;
- explicit one-to-one replacement mappings;
- expected counts for every counted family; and
- `sliceCompletionId`, which is `MR-UI-SLICE-COMPLETE` only for slice and
  `null` otherwise.

Profiles do not inherit. An empty selected family uses an explicit empty list.
A profile cannot select a family through a wildcard, prefix, range, or
negative exclusion. A profile marked `complete` is the complete selection. A
profile marked `incomplete` is an explicit development record and cannot be
selected.

The only valid development-status combinations are:

| Development state       | Slice      | Fallback     | Full         |
| ----------------------- | ---------- | ------------ | ------------ |
| Slice implementation    | `complete` | `incomplete` | `incomplete` |
| Fallback implementation | `complete` | `complete`   | `incomplete` |
| Full implementation     | `complete` | `complete`   | `complete`   |

An incomplete profile keeps the exact envelope and can use explicit empty or
partial selections. Its expected counts must match those current selections,
but they are development-present counts, not final approved profile counts.
Its present objects, references, IDs, and strings must be structurally valid,
but final counts, dependency closure, reachability, and English prose are not
claimed. It cannot contain invented placeholder story text. It cannot be
selected for a build.

Completion is monotonic. Slice cannot become incomplete after fallback starts,
and fallback cannot become incomplete after full implementation starts.
`implementationStatus` is source-only development metadata. It never enters a
built content package, campaign state, save, Archive record, or result.

## Stable identifier contract

All authored object IDs are globally unique across the complete source
catalogue. They use a recognized `MR-` family prefix, uppercase ASCII letters,
digits, and single hyphens. They contain 1–128 characters, cannot start or end
with a hyphen, and cannot contain adjacent hyphens. Once shipped, an ID cannot
be reused for a different meaning, family, speaker, location, action, form,
choice, cue, record, or outcome.

S06 confirms the existing content prefixes and adds these exact prefixes:

| Prefix      | Use                              |
| ----------- | -------------------------------- |
| `MR-EVT-`   | Scheduler event definition       |
| `MR-MSG-`   | Message definition               |
| `MR-NOT-`   | No-reply notification definition |
| `MR-FORM-`  | Saved scene or message form      |
| `MR-BEAT-`  | Ordered authored scene beat      |
| `MR-CHO-`   | Scene or message choice          |
| `MR-CUE-`   | World or desk availability cue   |
| `MR-SLICE-` | Slice-only evaluation object     |
| `MR-CHR-`   | Recurring character identity     |
| `MR-SPK-`   | Non-character speaker role       |
| `MR-LOC-`   | Semantic location identity       |

Requirement IDs, test IDs, implementation decisions, interfaces, generated
campaign-local IDs, and text keys keep their separate grammars. They do not
enter the authored-object ID namespace.

The five recurring character IDs are:

- `MR-CHR-ELENA`;
- `MR-CHR-HAORAN`;
- `MR-CHR-SAMIRA`;
- `MR-CHR-GABRIEL`; and
- `MR-CHR-CAMILA`.

The non-character speaker-role IDs are:

- `MR-SPK-PROTAGONIST`;
- `MR-SPK-INTERNAL`;
- `MR-SPK-SYSTEM`;
- `MR-SPK-EDITOR`;
- `MR-SPK-REVIEWER-1`;
- `MR-SPK-REVIEWER-2`; and
- `MR-SPK-REVIEWER-3`.

They are speaker roles, not new recurring characters.

The semantic location IDs are:

- `MR-LOC-TISSUE-CULTURE`;
- `MR-LOC-MAIN-LAB`;
- `MR-LOC-PI-OFFICE`;
- `MR-LOC-SHARED-DESKS`;
- `MR-LOC-IMAGING`;
- `MR-LOC-FACILITY`;
- `MR-LOC-BREAK-ROOM`;
- `MR-LOC-CORRIDOR`;
- `MR-LOC-SOUTH-CORRIDOR`; and
- `MR-LOC-EXIT-VESTIBULE`.

They express meaning only. S08 now maps them to exact coordinates and
interaction anchors. S06 continues to store only the stable semantic identity,
not physical coordinates or visible models.

## Reference contract

Content connects only through stable IDs or text keys. A display label,
filename, array position, English value, object identity, or local memory
address is never a reference.

Validation rejects:

- a missing target;
- a target from the wrong family;
- a duplicate reference where the field requires a set;
- a circular prerequisite, replacement, scene-thread, or dependency chain;
- a reference to an item excluded from the selected profile;
- a reference from shipped content to a test-only item outside slice; and
- an ending, citation, event, form, cue, record, task, or effect target that is
  not valid for that field.

Profile replacement mappings are direct, one-to-one, same-family mappings. A
mapping cannot point to itself, form a chain, form a cycle, change content
family, or map two old IDs to one new identity when that would lose a saved
selection. Replacement is applied before dependency closure is checked.

## Common authored-object contract

Every top-level item uses a strict family-specific shape. Unknown properties,
missing required properties, wrong types, invalid values, and values outside a
stated range are invalid. Optional meaning uses an explicit `null` or empty
list as specified by the family. A missing property never means an implicit
default.

Where applicable, an object contains:

- stable `id` and exact `type`;
- inclusive opening and final period indexes;
- prerequisite and blocking conditions;
- expiry rule or explicit permanent availability;
- one-time or repeat rule;
- approved action-cost ID;
- declarative authored effects;
- player-facing text keys;
- requirement IDs; and
- test IDs.

Every required or counted object links to at least one approved requirement
and one approved test. Test and requirement links provide traceability. They
do not change runtime behaviour.

### Family-specific required properties

The fields below are required in addition to the applicable common fields.
`ID` means one stable object ID of the named family. `TextKey` means one valid
key in `strings.en.json`. A list is always present, including when empty.

| Family               | Required family data                                                                                                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `characters`         | Character ID, display-name key, role key, physical-or-remote role, speaker role, and relationship identity or explicit `null`                                                                        |
| `locations`          | Location ID, display-name key, semantic room type, allowed cue roles, and S08 mapping key                                                                                                            |
| `actions`            | Action ID, display-name key, work class, period cost, base energy cost, S04 command type, forecast key, and reason keys                                                                              |
| `experiments`        | Experiment ID, experiment family, allowed goals, controls, observations, sample states, equipment states, stage actions, monitoring windows, readings, caveats, record outputs, and evidence outputs |
| `tasks`              | Task ID, task family, completion command, available choices, result references, and active request or explicit `null`                                                                                |
| `roomStates`         | Room-state ID, location ID, affected work, activation event, forecast key, route choices, route costs, and expiry fallback                                                                           |
| `events`             | Event ID, status, priority, authored order, delivery type, delivery target, cue or `null`, fallback or `null`, and thread ID or `null`                                                               |
| `scenes`             | Scene ID, event ID, location ID or `null`, cue or `null`, base form, conditional form or `null`, ordered beats, choices, period effect, closing key, and recap key                                   |
| `messages`           | Message ID, event ID, sender, thread ID, subject key, body forms, reply choices, deferral rule, follow-up events, and expiry result                                                                  |
| `notifications`      | Notification ID, event ID, sender, thread ID or `null`, body forms, presentation kind, and follow-up event IDs                                                                                       |
| `records`            | Record ID, record family, title key, body forms, source experiment or event, saved selection rule, and repeat-note keys                                                                              |
| `endings`            | Ending ID, career, paper, relationship, integrity, or fatigue family, selection conditions, body key, and approved variants                                                                          |
| `citations`          | Citation ID, title key, body key, unlock conditions, permanent unlock rule, and Archive presentation data                                                                                            |
| `environmentalItems` | Item ID, location ID, act availability, glance or focused presentation, text keys, and one-time or repeat rule                                                                                       |
| `contextualLines`    | Line ID, internal or character speaker, window, context conditions, text key, and one-time rule                                                                                                      |
| `tutorials`          | Tutorial ID, trigger conditions, heading and body keys, acknowledgement rule, and input-action references                                                                                            |
| `interface`          | Interface ID, semantic purpose, text keys, confirmation meaning, availability, and dynamic-field roles                                                                                               |
| `audio`              | Audio or music role ID, semantic role, cue meaning, required visual or text duplicate, and S10 handoff role                                                                                          |

An S08 mapping key remains semantic in content data. S08 now owns its exact
geometry and anchor mapping. An S10 handoff role identifies meaning only until
S10 defines an actual verified resource.

## Conditions

Conditions are plain data. They contain no executable expression, source
code, function name, regular expression, dynamic property path, or free-form
query.

A condition group contains all three explicit lists:

- `allOf`: every leaf must be true;
- `anyOf`: at least one leaf must be true, or the empty list has no added
  requirement; and
- `noneOf`: every leaf must be false.

The exact condition-leaf discriminants are:

| Discriminant          | Permitted comparison                                                             |
| --------------------- | -------------------------------------------------------------------------------- |
| `periodInWindow`      | Inclusive opening and final period                                               |
| `actIs`               | One approved act state                                                           |
| `pressureProfileIs`   | `standard` or `supported`                                                        |
| `enumIs`              | One approved enum family and value                                               |
| `booleanIs`           | One approved Boolean fact family and value                                       |
| `integerInRange`      | One approved safe-integer fact family and inclusive bounds                       |
| `idPresenceIs`        | One approved ID collection, target ID, and present-or-absent value               |
| `contentStateIs`      | One content ID and approved completion, expiry, selection, or presentation state |
| `experimentStateIs`   | One experiment or run reference and approved state                               |
| `manuscriptStateIs`   | One approved manuscript, reviewer, reading, caveat, or snapshot state            |
| `concernStateIs`      | One concern reference and approved state                                         |
| `routeStateIs`        | Aldercroft or Morrow and approved route state                                    |
| `relationshipStateIs` | One recurring character and approved saved relationship fact                     |
| `piimStateIs`         | One approved PIIM response or outcome fact                                       |
| `paperStateIs`        | One approved paper state                                                         |
| `fatigueStateIs`      | One approved crash or ending-energy fact                                         |
| `conclusionStateIs`   | One approved final-choice or completion state                                    |
| `countInRange`        | One approved collection and inclusive count bounds                               |

A leaf names its approved fact family and supplies the exact typed comparison
for that family. It cannot read player text, real time, browser state,
rendering, audio, file state, hidden machine data, or an unregistered campaign
field. Validation rejects an impossible comparison and a condition that
depends on content excluded from the selected profile.

## Authored effects and rule authority

Authored effects are declarative instructions consumed only through an
approved S04 command or scheduled transition. The exact closed operation
discriminants are:

| Discriminant          | Permitted result                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `adjustMetric`        | Apply one approved fixed safe-integer delta through its owning rule.                                                                                    |
| `setFact`             | Set one approved Boolean or enum fact to one allowed value through its owning rule.                                                                     |
| `recordHistory`       | Add one approved stable ID to one permanent factual history.                                                                                            |
| `applyDomainResult`   | Create or update one approved request, task, route, relationship, manuscript, experiment, record, citation, or conclusion fact through its owning rule. |
| `applyActionCost`     | Advance time and charge or restore energy through one approved action ID.                                                                               |
| `requestPresentation` | Request one of the five existing S04 presentation effects with one valid authored reference.                                                            |

Each operation names an exact approved target family, value, reason key, and
owning S04 rule. It cannot contain executable code, a calculation, an arbitrary
campaign path, a negative time cost, an unbounded value, or player-facing
prose.

Content owns authored items, prerequisites, windows, costs, forms, text keys,
and approved fixed effect parameters. Rules own commands, algorithms,
validation, modifiers, thresholds, biological variation, route checks, paper
results, ending resolution, and campaign lifecycle transitions. Content cannot
add a command, add a sixth presentation effect, bypass a rule, change the
24-command total, write a campaign field directly, or control an event's
stored lifecycle state.

## Actions, experiments, tasks, and room states

Action definitions refer to fixed S04 cost and rule identities. They do not
repeat or calculate rule algorithms.

The exact work classes are:

| Work class | Actions                                                                                |
| ---------- | -------------------------------------------------------------------------------------- |
| `recovery` | Protected break                                                                        |
| `light`    | Configuration (0/0), routine monitor, Elena report, relationship action, and room wait |
| `focused`  | Focused start, quality monitor, analysis, manuscript revision, and career action       |
| `intense`  | Intensive start                                                                        |
| `major`    | Initial manuscript draft and PIIM response                                             |

Only focused and intense work can use the S04 night surcharge or push-through
rule. A content object cannot reclassify an action for one scene or profile.

Each experiment template completely identifies its experiment family,
configuration options, allowed goals, controls, observations, sample and
equipment requirements, action IDs, stage windows, monitoring windows,
analysis readings, caveats, records, evidence outputs, and test links. It
contains no probability, biological calculation, real protocol, arbitrary
outcome, or rule-owned variation algorithm.

Each task completely identifies its window, availability, approved completion
command, action cost, prerequisites, result references, expiry, and tests.
Each operational room state completely identifies its visible window,
forecast key, affected work, activation event, expiry response, and at least
two valid routes with different stated costs.

When optional room-related content expires, the room retains a basic route.
No profile can leave a required experiment or campaign route blocked by an
expired optional scene.

## Events and delivery

Every scheduler event defines:

- stable event ID;
- inclusive opening and final period indexes from `0` through `63`;
- required or optional status;
- one closed priority;
- `authoredOrder`, from `0` through `9999`;
- conditions and dependency IDs;
- delivery type and target content ID;
- expiry rule;
- cue ID or explicit `null`;
- fallback target or explicit `null`; and
- requirement and test links.

The closed authored priorities, after the separate crash and experiment
attention rules owned by S05, are:

1. automatic transition;
2. mandatory content;
3. required message; and
4. optional content.

Two simultaneously eligible events in the same priority cannot share one
`authoredOrder`. Required story content does not expire. Active optional
content finishes normally after its window. A later follow-up is a separate
event in the same stable thread; an event does not rewrite its own window or
target after delivery.

The event object defines authored delivery facts. S05 remains authoritative
for eligibility, queue order, lifecycle, interruption, and safe-point timing.

## Scenes, forms, beats, and choices

Every scene has stable scene, event, location, cue, speaker, form, beat, and
choice references as applicable. Ordered beats use `MR-BEAT-` IDs. The scene
has exactly one base form and no more than one conditional form. A conditional
form uses approved visible or saved facts and is selected once before the
pre-scene checkpoint. Reload cannot reroll it.

A choice uses one `MR-CHO-` ID and contains two to four options. Every option
has a stable option ID, availability conditions, checked authored effects,
confirmation text keys when the result is irreversible or costly, and a fixed
recap key. Skip never selects an option and never assembles a recap.

Scene content cannot change the S05 lock, checkpoint, choice, completion,
closing, skip, or reload order. Scene period effects remain separate from the
cost of later work.

## Messages and notifications

Messages and notifications are separate families:

- a message can be read, closed as deferral, replied to, expired, or followed
  by a separately authored event; and
- a notification is a no-reply delivery that records presentation once.

Each item defines sender or system role, thread ID, forms, subject and body
keys, choices when applicable, window, expiry, and follow-up references. It
does not contain copied English text.

Elena's Week-15 paper-state reaction is notification
`MR-NOT-ELENA-PIIM-REACTION`. It has four forms selected from the saved PIIM
paper state. It changes no campaign value and does not increase the fixed
fourteen-item `MR-CTX-` count.

## Records, contextual text, and environmental text

Primary records are permanent. A selected reading, caveat, reviewer form, or
other approved variant is saved once and never rerolled. Repeating an
experiment can add approved notes or evidence facts, but it does not create a
new primary-record ID or replace an earlier record.

Exactly fourteen one-time `MR-CTX-` objects ship in both full and fallback.
They are the six approved internal reactions and eight approved contextual
character lines. They change no time, energy, evidence, trust, route, or other
campaign value.

Exactly thirty `MR-ENV-` objects ship in full. The fallback ships the approved
twenty-item subset. Environmental items are mechanically harmless. Exactly ten
of the full thirty use close-range glance display and the remaining twenty use
focused inspection. Required information depends on neither display form.

The five work-queue lines and five exit responses are English string groups,
not additional content objects. Their existing act-based selection remains a
rule and presentation concern.

## Endings and Institutional Citations

The ending data contains exactly twenty-nine selectable text modules:

- four career modules;
- four paper modules;
- fifteen relationship modules;
- four integrity modules; and
- two fatigue modules.

The public-withdrawal wording is a variant of an existing paper module. It is
not a thirtieth module. Ending data supplies authored conditions and text keys.
S04 owns selection order and ending resolution.

All twelve `MR-CIT-` Institutional Citations ship in full and fallback. None
ships in slice. Citation content does not create gameplay carry-over or imply
a required number of runs.

## Tutorials, interface text, and audio roles

Tutorial and interface items are stable objects with availability conditions,
text keys, acknowledgement or confirmation meaning, and requirement and test
links. They do not contain DOM layout, CSS, input-device code, or generated
prose.

S06 adds these fixed interface items:

- `MR-UI-CONTENT-INVALID`, with the English value “Game content could not be
  verified. No saved campaign data was changed.”; and
- `MR-UI-SLICE-COMPLETE`, the slice-only completion item.

Audio content contains semantic role and cue identities only. It can state
that a cue means a required arrival, optional availability, warning,
confirmation, ambience role, music role, or non-lexical dialogue role. S10 now
owns verified audio-resource handoff, duration, playback, priority, exactly
four total buses, fallback, captions, and resource lifecycle. The content-
owned role IDs and descriptions do not change.

## English-string contract

`strings.en.json` is the only source of player-facing English text. A data
object contains text keys only. Runtime systems cannot create, assemble,
paraphrase, translate, or complete prose.

A text key:

- contains 1–128 ASCII characters;
- uses dot-separated lower camel-case segments;
- starts every segment with a lowercase ASCII letter;
- then uses only ASCII letters or digits;
- is globally unique; and
- keeps one stable meaning after release.

Every referenced key exists exactly once. Every shipped key is referenced by
the selected profile or by one selected fixed string group. Unreferenced text
is rejected from a built package.

English values can use Unicode punctuation and approved character names. They
cannot contain HTML, script, Markdown execution, an unknown placeholder, or a
runtime-generated sentence fragment. Dynamic action costs, routes, control
labels, and current values remain separate semantic interface fields.

The closed protagonist placeholders are the approved normalized protagonist
name and the approved subject, object, possessive-adjective,
possessive-pronoun, and reflexive pronoun forms. No arbitrary variable,
expression, nested placeholder, format instruction, or player-supplied markup
is allowed. Placeholder substitution changes display text only and never
changes a stored source string or word count.

The build-specific string file contains only selected keys. The unique-word
limit is `6000` for each full or fallback shipped file. Slice also uses the
same upper limit.

For the exact count:

1. use the selected English values, not keys or data IDs;
2. normalize each value to Unicode NFC;
3. lowercase with locale-independent Unicode lowercasing;
4. replace every approved protagonist placeholder with one space;
5. treat a sequence of Unicode letters or digits with internal apostrophes as
   one word;
6. treat punctuation, markup delimiters, dashes, underscores, and other
   characters as separators;
7. count each distinct non-empty word once across the complete file; and
8. fail when the result is greater than `6000`.

Names and contractions therefore count as words. Identifiers, keys, markup,
and punctuation do not.

## Content versions and compatibility

`contentVersion` uses `MAJOR.MINOR.PATCH` with three non-negative safe integers
and no leading zero except the value zero itself.

- Patch changes preserve identity, rules, conditions, meaning, placeholders,
  and selection. They can correct harmless wording or metadata.
- Minor changes are additive or otherwise compatible while preserving every
  existing saved identity and selection.
- Major changes remove, rename, repurpose, or incompatibly change content or
  its meaning.

A version is compatible only when the current manifest lists it exactly.
Version ranges, “latest”, implicit semantic-version compatibility, and
best-effort loading are prohibited.

The campaign's `buildProfileId` is immutable. A save created with full,
fallback, or slice cannot move to another profile. The current package must
contain that exact profile.

For an explicitly compatible earlier version:

1. retain every saved ID that still exists with the same family and meaning;
2. replace a missing saved ID only through the current profile's direct
   approved mapping;
3. preserve saved forms, choices, readings, caveats, records, history, and
   permanent consequences;
4. reject missing, ambiguous, cross-family, chained, or circular replacement;
5. validate the complete migrated state against the current selected package;
   and
6. publish no migrated state unless every check succeeds.

S06 defines compatibility meaning and mapping data. S07 owns transaction,
backup, recovery UI, and the physical migration operation. A failed migration
leaves the active save and backup unchanged.

## Full profile

The full profile selects the complete source catalogue required by B10. Its
counted families are exactly:

| Family                      | Count |
| --------------------------- | ----: |
| Experiment templates        |     6 |
| Operational room states     |     3 |
| Mandatory scenes            |     7 |
| Optional scenes or contacts |    10 |
| Primary records             |    20 |
| Ending modules              |    29 |
| Institutional Citations     |    12 |
| Environmental items         |    30 |
| Contextual lines            |    14 |

The profile also explicitly selects all required actions, tasks, events,
forms, choices, messages, notifications, tutorial items, interface items,
characters, speakers, locations, cues, and audio roles. No count can be
inferred from a filename or prefix.

## Fallback profile

The fallback is a coherent campaign profile. Its counted families are exactly:

| Family                      | Selection                                           |
| --------------------------- | --------------------------------------------------- |
| Experiment templates        | 4: laser/sham, combined range/repair, batch, oxygen |
| Operational room states     | 2                                                   |
| Mandatory scenes            | all 7                                               |
| Optional scenes or contacts | 7                                                   |
| Primary records             | 18                                                  |
| Ending modules              | all 29                                              |
| Institutional Citations     | all 12                                              |
| Environmental items         | the approved 20-item subset                         |
| Contextual lines            | all 14                                              |

The combined range/repair experiment and record use the approved fallback-only
IDs and direct replacements. The profile keeps the basic facility-queue route
without Gabriel's Queue scene. It keeps every mandatory narrative dependency,
every ending route, and all text needed by selected content.

## Vertical-slice profile

The slice is an `evaluationSlice`, not a shortened campaign save that can later
continue into full or fallback. Its explicit selection contains:

- `MR-SCN-CLARIFIED` and all required forms and beats;
- laser/sham configuration, start, monitoring, analysis, raw record, evidence,
  notebook, and result content;
- the facility queue and its basic routes;
- `MR-OPT-GABRIEL-QUEUE` and its dependencies;
- `MR-TUT-001` through `MR-TUT-008`;
- the safe save, close, resume, and recovery-facing content needed by the
  approved slice flow;
- `MR-SLICE-CLAIM-REHEARSAL`; and
- `MR-UI-SLICE-COMPLETE`.

It excludes later campaign content, ending modules, Institutional Citations,
unrelated environmental content, and text used only by excluded items. The
claim rehearsal does not change the full campaign's Week-5 manuscript timing
or create a new full-campaign rule.

## Build selection and filtering

Normal development and `npm run build` select `full`. An explicit Vite mode can
select `fallback` or `slice`. The mode is a closed build choice, not an
environment value that can change a running campaign. An absent mode uses
`full`; an unknown mode fails before a usable build is produced.

The chosen profile is fixed inside the finished build. A runtime setting,
query parameter, save value, browser language, URL fragment, developer
console, or `.env` value cannot switch it.

Build preparation uses this order:

1. validate the source catalogue and the three explicit profile envelopes;
2. fully validate every profile marked `complete` and validate the safe
   incomplete boundary of every profile marked `incomplete`;
3. reject a requested profile whose implementation status is `incomplete`;
4. select the requested complete profile;
5. apply its direct replacement mappings where required;
6. check dependency closure and profile reachability;
7. select only listed data objects;
8. select only their referenced English strings and fixed selected string
   groups;
9. create build metadata with package ID, schema version, content version,
   language, and selected profile ID;
10. validate the filtered package again; and
11. give only the final checked package to Vite.

The finished static build contains no raw complete catalogue, unused profile,
excluded data object, excluded English string, source profile path, or
development validation detail. Vite can apply its approved content hashes to
generated filenames. Generated output is not a second authored source.

A failed selection or post-filter check produces no usable content package.
It cannot silently keep a stale earlier profile or switch to fallback. Normal
development and `npm run build` therefore fail while full is incomplete. An
explicit fallback or slice build also fails while that requested profile is
incomplete.

### Generated package envelope

Build filtering creates one in-memory plain-data package with exactly:

- `metadata`: package ID, schema version, content version, language, selected
  profile ID, compatible earlier versions, and expected counts;
- `families`: all eighteen family names, each with its selected ID-sorted
  objects or an explicit empty list; and
- `strings`: the selected sorted text-key map.

This generated envelope is the raw browser-startup input. It contains no
source manifest paths, profile paths, replacement map, alternate profile, or
unselected source object. It also contains no source `implementationStatus`.
The browser validates this complete envelope again before it creates runtime
views.

## Fixed validation order

Source and build validation use this exact fail-safe order:

1. parse the source manifest as UTF-8 JSON;
2. validate its strict shape, package identity, versions, language, paths, and
   compatible-version list;
3. load exactly the listed files and reject a missing or unexpected path;
4. parse every file and validate its envelope and family;
5. validate all stable IDs and text-key grammars;
6. reject duplicate IDs, keys, properties, and set members;
7. validate every family-specific object shape and value range;
8. validate English values, placeholders, and string groups;
9. resolve every reference and reject wrong-family targets and cycles;
10. validate cross-content rules, forms, choices, variants, action costs,
    conditions, authored effects, windows, and invariants;
11. validate the three profile identities and permitted monotonic completion
    combination;
12. validate each complete profile's replacement map, dependency closure,
    exact count, and profile-specific reachability;
13. validate incomplete profiles without claiming final counts, closure,
    reachability, or prose and reject selection of one;
14. select and filter the requested complete build profile;
15. reject excluded dependencies and unreferenced shipped strings;
16. calculate the build-specific unique English-word count;
17. revalidate the complete filtered package; and
18. create one new immutable `ValidatedContent` value.

Development startup, production build, and source tests run steps 1–18.
Browser startup receives only the generated package envelope. It first checks
that strict envelope, then repeats the applicable ID, shape, string,
reference, invariant, count, reachability, word-count, and immutable-copy
checks from steps 5–18 for its one embedded profile. It does not require or
reconstruct the unshipped source manifest or other profiles.

Validation never repairs, inserts a default, deletes an item, reorders
meaningful authored order, replaces an ID without a mapping, truncates text,
changes profile, or returns a partial package.

## Closed validation issue codes

An invalid result contains one or more issues in deterministic validation
order. Every issue uses one of these closed codes:

| Code                   | Meaning                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `malformedJson`        | A required file is not valid permitted JSON.                                                                                                                      |
| `invalidManifest`      | The source manifest or one listed path is invalid.                                                                                                                |
| `invalidProfile`       | A profile envelope, identity, field, or mapping is invalid.                                                                                                       |
| `invalidObject`        | A family object has a wrong shape, type, value, or range.                                                                                                         |
| `invalidId`            | An object ID, requirement ID, test ID, or text key has an invalid grammar.                                                                                        |
| `invalidText`          | An English value, placeholder, or fixed string group is invalid.                                                                                                  |
| `duplicateId`          | Two authored objects use one global stable ID.                                                                                                                    |
| `duplicateTextKey`     | A text key occurs more than once or has conflicting meaning.                                                                                                      |
| `missingReference`     | A referenced object, text key, requirement, or test is absent.                                                                                                    |
| `wrongReferenceFamily` | A reference points to an object of the wrong family.                                                                                                              |
| `circularReference`    | A prohibited dependency, thread, or replacement cycle exists.                                                                                                     |
| `incompleteProfile`    | A requested profile is marked incomplete, a complete profile omits a required family, item, route, or dependency, or the completion combination is not permitted. |
| `excludedDependency`   | Selected content depends on an excluded object or string.                                                                                                         |
| `countMismatch`        | A fixed catalogue or profile count is wrong.                                                                                                                      |
| `invariantFailure`     | A cross-content, reachability, delivery, form, safety, or rule invariant fails.                                                                                   |
| `wordLimitExceeded`    | The selected English file contains more than 6,000 unique words.                                                                                                  |

Each issue contains only its code, repository-relative file path, JSON field
path, and stable object ID or text key when available. It contains no complete
English value, raw file, save data, player name, stack trace, absolute path, or
machine information.

## Required cross-content checks

For each profile marked `complete`, automatic validation checks all of the
following:

- every required catalogue object exists exactly once;
- every stable form, beat, choice, cue, message, notification, record, ending,
  citation, tutorial, interface item, and audio role has its permitted owner;
- every event has a valid inclusive window, status, priority, unique
  same-priority order, delivery target, expiry, cue, and fallback;
- every scene has one base form and no more than one valid conditional form;
- every choice has two to four options, valid conditions, checked effects,
  confirmation keys where required, and one fixed recap;
- every reviewer has exactly two valid saved forms;
- Elena's PIIM reaction has exactly four valid paper-state forms;
- every meaningful action has one forecast key and every material effect has
  one reason key;
- every experiment, task, room state, record, ending, and citation satisfies
  its family invariants;
- each operational room state has a visible forecast, expiry fallback, and at
  least two valid routes with different stated costs;
- exactly fourteen harmless contextual objects and the required harmless
  environmental selection exist;
- all full, fallback, and slice references remain inside their selected
  dependency closure; and
- every mandatory event, required message, basic room route, final choice, and
  selected profile completion condition is reachable in that profile.

Reachability is checked separately for every complete full, fallback, and
slice profile. A path that works only because excluded content is present
fails the smaller profile. An incomplete profile receives only its structural
and present-reference checks and cannot satisfy a release or phase gate.

Automatic structure checks cannot prove that prose is scientifically safe,
non-identifying, clear, funny, or faithful to the intended causal meaning.
The S14 audit manually reviews selected English text for:

- false claims that the repair state causes recovery;
- actionable real laboratory instructions;
- unintended real-person or real-institution resemblance;
- title, brand, licence, and public-redistribution conflicts;
- personal, machine, save, or private repository data; and
- material wording that changes an approved condition, consequence, route, or
  evidence meaning.

## Candidate `MR-IF-006`

`MR-IF-006` is owned by the content module. Its planned consumers are build
preparation, rules, scheduler, application bootstrap, UI, audio, cutscenes,
and content tests.

The pure boundary has three operations:

- `validateSourceCatalogue(rawSourceFiles)` validates the source, its exact
  profile completion combination, every complete profile, and every safe
  incomplete boundary, then returns one checked staged catalogue or ordered
  issues;
- `createBuiltContentPackage(validatedSource, requestedProfileId)` selects,
  filters, and revalidates one generated package or returns ordered issues;
  and
- `validateContentPackage(rawBuiltPackage)` revalidates the embedded browser
  package and returns runtime `ValidatedContent` or ordered issues.

Each operation returns exactly one of these result forms:

| Result    | Required data                              | Meaning                                                                                                    |
| --------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `valid`   | the operation's one complete checked value | Every applicable source, complete profile, incomplete boundary, selection, and final-package check passed. |
| `invalid` | ordered `ContentValidationIssue` values    | No content value or partial view was created.                                                              |

Expected bad authored input returns `invalid`; it is not an uncaught exception.
An unexpected internal failure is handled by the S02 fatal boundary and does
not expose raw input.

`ValidatedContent` contains four deeply immutable plain-data views:

| View           | Contents                                                                                                                                   | Consumers                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `metadata`     | Package, schema, content version, language, profile, compatibility, and expected counts                                                    | application, persistence coordination, tests |
| `rules`        | Conditions, costs, rule parameters, references, windows, effects, experiment, task, route, ending, and record facts                        | rules and scheduler                          |
| `presentation` | Approved semantic labels, scene structure, messages, notifications, cue roles, tutorial, interface, environment, and audio-role references | UI, world projections, cutscenes, audio      |
| `strings`      | Selected text-key-to-English-value map                                                                                                     | presentation consumers only                  |

Rules and scheduler receive only `rules` plus the metadata fields required to
check profile and version. They never receive English values. Other modules
receive only the view needed by their public port. Raw JSON, raw source
objects, source arrays, and a mutable complete catalogue are never read outside
the content module.

For frozen `MR-IF-002 v4`, the rules view also supplies the exact semantic
mapping for each evidence card's `piimRole`, each board claim's `claimLevel`,
the eight fixed manuscript requirement keys, and each concern's `routeImpact`.
Content validation rejects a stored typed role that does not match its authored
source. Rules never infer one of these meanings from a general-purpose ID or
prose key.

The validator creates new checked copies and retains no input reference. A
consumer cannot cast or mutate one view to obtain another.

## Startup and failure behaviour

The same validation contract runs during future development startup,
production build, automated content tests, and browser startup. A production
build must also perform the post-filter validation.

Invalid content:

1. creates no new campaign;
2. loads no active campaign into application memory;
3. changes no active save, backup, Archive entry, settings, or profile;
4. never switches automatically from full to fallback or slice;
5. disables campaign controls; and
6. shows `MR-UI-CONTENT-INVALID` through the safe bootstrap error surface.

The fixed English message is:

> Game content could not be verified. No saved campaign data was changed.

Development and test output can include the safe issue code, relative file,
field path, and ID or key. Player-facing output contains no raw diagnostic.

## Required S06 fixture groups

S12 defines the executable-format routes for the groups below. S06 names
required evidence but does not claim that a fixture file, content file, build,
or passing test exists.

Each valid fixture contains a complete manifest, source file set, selected
profile, expected IDs and counts, expected selected keys, expected word count,
expected view summaries, and important excluded items.

| Fixture group    | Required coverage                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MR-S06-VAL-001` | The three permitted development-status combinations; refusal to select an incomplete profile; one complete valid full package; exact counts, references, required content, stable ordering, and deterministic repeated validation. |
| `MR-S06-FBK-001` | Exact fallback cut, direct range/repair replacements, basic facility route, all mandatory content, exact counts, and no excluded text.                                                                                             |
| `MR-S06-SLC-001` | Exact early-weeks slice, claim rehearsal, save-flow content, slice completion, excluded later content, no endings or Citations, and no unrelated text.                                                                             |
| `MR-S06-REF-001` | Valid references plus every missing, wrong-family, duplicate, circular, chained-replacement, and excluded-dependency rejection.                                                                                                    |
| `MR-S06-STR-001` | Key grammar, placeholders, selected-key closure, normalized unique-word vectors, exact 6,000 boundary, and 6,001 rejection.                                                                                                        |
| `MR-S06-OBJ-001` | Every strict family shape, explicit null and empty-list use, unknown fields, value ranges, forms, choices, conditions, and effects.                                                                                                |
| `MR-S06-MIG-001` | Exact current version, listed compatible version, retained selections, direct replacement, profile mismatch, missing mapping, and unchanged state after failure.                                                                   |
| `MR-S06-FLT-001` | At least one case for every closed issue code, deterministic issue location, no partial content, no profile switch, and safe startup message.                                                                                      |

Every rejected fixture expects the exact issue code, repository-relative file,
field path, and ID or key when applicable. It also identifies the source and
saved values that must remain unchanged.

S12 owns the executable fixture-file shape and future recorded result. S14
owns the final contradiction, safety, and interface-freeze evidence.

## Interface lifecycle

`MR-IF-006` is candidate `v1` after S06. Its owner, consumers, inputs, outputs,
strict source boundary, monotonic complete or incomplete development-profile
state, complete-profile selection, validation result, immutable views, failure
meaning, and required fixture groups are complete at specification level. It
is not frozen and does not authorize implementation.

`MR-IF-002` remains candidate `v1` with exact `contentVersion` and immutable
`buildProfileId` checks. `MR-IF-003` remains candidate `v1` with a restricted
rules view and unchanged totals of 24 commands and five presentation effects.
`MR-IF-005` remains candidate `v1` with final event, delivery, order, cue, and
profile-reference checks. `MR-IF-011` is now candidate `v1` through the
connected S05 and S10 contracts. S07 connects exact stored content versions, immutable profiles,
saved reference validation, direct mapping, ending-card references, and
Citation records through candidate `MR-IF-007`. S08 maps semantic locations
and environmental-item presentation to candidate `MR-IF-008` and the target
contract, without adding coordinates to content data. S09 now consumes only
the presentation and string views needed by the current UI projection. It uses
authored text and stable reason keys without copying hidden rules or creating a
second English source. S10 consumes semantic visual, cue, ambience, music, and
dialogue-sound role IDs without renaming them or placing asset paths in content
data. At S06 documentation, no interface was frozen.

## S06 acceptance and handoff

S06 is documented only when:

- this staged source tree, envelope, manifest, profile, object, reference,
  condition, effect, family, English-string, version, migration, build,
  validation, failure, interface, and fixture contract is present;
- S03–S05 contain the approved connected refinements;
- numbered design documents contain no contradictory player-visible claim;
- `MR-IF-006` is candidate `v1`;
- `MR-IMP-OPEN-006` is resolved and S07 is the durable next block;
- the repository control documents agree; and
- Leonardo's approved documentation is committed.

S07 now defines the exact IndexedDB stores, keys, transactions, validation,
backup, recovery, content-version migration operation, completion retention,
and clear-data behaviour. It preserves this S06 content contract. All
implementation gates remain blocked. S12 now supplies the future valid,
rejected, migration, catalogue, profile, string, and acceptance case routes.
S13 now assigns sequential root-catalogue ownership to `MR-WP-07` and
`MR-WP-08`, permits only the three explicit monotonic completion combinations,
and keeps every incomplete profile unbuildable. S14 completes final
consistency and interface-freeze review.

## S14 audit record

The S14 cross-interface and contradiction audit is complete. Every shared
interface defined or connected by this specification is frozen `v1` through
the interface register and `specification-audit.md`. Earlier candidate-state
statements preserve the interface lifecycle before S14; they are not the
current state. No executable fixture or measured result exists. Gate 1 is
ready for Leonardo's separate approval, and no implementation is authorized.

## Step-4 interface amendment

The approved Step-4 impact packet supersedes only historical `MR-IF-002 v1`
with frozen `v2` to define its exact creation input. Content versions, build
profiles, source records, validation, strings, migrations, and restricted
views remain unchanged and unimplemented. Step 5 remains separately
unapproved.

The approved correction supersedes `MR-IF-002 v2` with `v3`. S06 remains the
only authority for authored task, scene, message, request, concern, and event
IDs. Its validated restricted view supplies the exact object when S04 or S05
first materializes that object in campaign state. Rules cannot create an
undocumented content ID. Profiles, validation, and migration meaning do not
change.

The approved 2026-09-03 correction supersedes `MR-IF-002 v3` with `v4`.
The restricted rules view supplies the role mappings above, while campaign
state stores their typed proof. This changes no authored object, prose, count,
profile, route rule, PIIM rule, or build behaviour.

## Correction C01: explicit planning and timing data

Configuration uses the `light` class with zero period and energy cost. It still creates one configured run, occupies a slot and records the selected qualitative options; it cannot draw variation, award evidence, improve preparation by repetition, or advance a clock. Existing stop/slot rules still apply. This is planning, not a new work class.

Each selected template defines `monitoringOffsets` relative to the period reached by its successful start command. Normal templates and repeats use the inclusive pair `[0, 1]`. Oxygen uses `[0, 1]` and `[2, 3]`. These are fictional calendar indices, not laboratory timings. A response is eligible at the pre-command period. Once accepted, it resolves its own window before crossed-period expiry; a response cannot miss its own resolved window. After the last completed or missed window, the record is ready for analysis. No hidden incubation duration exists.

Template windows govern configuration and start eligibility. An active run can complete after that window; analysis and report remain available through period 51. Laser analysis must precede range start, and range analysis must precede repair start. Batch starts through period 35. An unfulfilled request expires after period 51, without blocking the story.

The slice has period range 0–11 and completes immediately after its successful rehearsal checkpoint. It uses the normal profile costs, monitoring offsets and room responses. `MR-SLICE-CLAIM-REHEARSAL` uses one period and one base energy, focused class, and requires an analysed laser record with an honest reading, relevant control and caveat. It commits a slice-only manuscript snapshot through the existing initial-manuscript command with this explicit profile action binding. The existing slice completion evidence records that snapshot and verified checkpoint before completion UI. It never creates the full-game Week-5 task, public record, career result or transferable full-game save. The S03 slice-profile definition and S07 compatibility checks must reject cross-profile continuation. A request whose full cost crosses 11 is rejected without change; the evaluation can restart through the existing New Game confirmation. Missing rehearsal never counts as completion.

Full/fallback selection excludes this rehearsal action binding and its strings. Existing same-ID definition rules must recognize the explicit slice-only target, not silently reprice the full-game draft.

## Correction C02: closed scientific meaning tables

These small closed semantic IDs are content definitions, not additional experiment templates, primary records or generated text. Add MR-STRUCTURE-, MR-RHYTHM-, MR-REPATTERNING-, MR-CONTROL-, MR-READING- and MR-CAVEAT- to the semantic-definition prefix registry. Every selected definition has the exact English label below in strings.en.json. Full, fallback and slice include only their dependency closure.

| Semantic ID                     | Exact English label                                  | Saved meaning                                                                                                                      |
| ------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| MR-STRUCTURE-RECOVERY           | Structure recovery observed                          | structureRecovery=true                                                                                                             |
| MR-STRUCTURE-PARTIAL            | Partial structure recovery observed                  | structureRecovery=true                                                                                                             |
| MR-STRUCTURE-NONE               | No structure recovery observed                       | structureRecovery=false                                                                                                            |
| MR-STRUCTURE-UNOBSERVED         | Structure recovery not established                   | structureRecovery=false                                                                                                            |
| MR-RHYTHM-RECOVERY              | Rhythm recovery observed                             | rhythmRecovery=true                                                                                                                |
| MR-RHYTHM-PARTIAL               | Partial rhythm recovery observed                     | rhythmRecovery=true                                                                                                                |
| MR-RHYTHM-NONE                  | No rhythm recovery observed                          | rhythmRecovery=false                                                                                                               |
| MR-RHYTHM-UNOBSERVED            | Rhythm recovery not established                      | rhythmRecovery=false                                                                                                               |
| MR-REPATTERNING-TRACKS-RECOVERY | Repatterning tracks recovery in this record          | repatterningTracksRecovery=true; requires a positive recovery observation in the same record                                       |
| MR-REPATTERNING-NO-ASSOCIATION  | No recovery association established                  | repatterningTracksRecovery=false                                                                                                   |
| MR-REPATTERNING-UNOBSERVED      | Repatterning relation not established                | repatterningTracksRecovery=false                                                                                                   |
| MR-CONTROL-MATCHED              | Matched comparison                                   | controlKind=matched                                                                                                                |
| MR-CONTROL-LIMITED              | Limited comparison                                   | controlKind=limited                                                                                                                |
| MR-READING-RECOVERY             | Recovery appears in the observed condition           | Honest only if structureRecovery or rhythmRecovery is true                                                                         |
| MR-READING-ASSOCIATION          | Repatterning tracks the observed recovery            | Honest only if repatterningTracksRecovery and at least one recovery fact are true                                                  |
| MR-READING-NO-RECOVERY          | Recovery was not observed                            | Honest only if both recovery facts are false, at least one selected observation is NONE, and no selected observation is UNOBSERVED |
| MR-READING-UNRESOLVED           | This record does not settle the question             | Honest for an inconclusive/process-limited record; never positive support for a recovery claim                                     |
| MR-CAVEAT-CONDITION             | This conclusion is limited to the observed condition | Relevant to an honest RECOVERY/NO-RECOVERY reading                                                                                 |
| MR-CAVEAT-ASSOCIATION           | These observations do not establish a causal role    | Relevant to ASSOCIATION or RECOVERY; required on every honest Strong board                                                         |
| MR-CAVEAT-PROCESS               | The recorded process or coverage limit remains       | Relevant to UNRESOLVED or a honestly narrowed valid record with a process/coverage limit                                           |

Text keys use `science.<lowerCamel semantic ID without MR prefix>`, for example `science.structureRecovery`, `science.repatterningTracksRecovery`, `science.caveatAssociation`. This table defines each key by that mechanical conversion; no runtime prose conversion is permitted. Selected content supplies the literal label.

Each raw result refers to exactly one structure ID, one rhythm ID, one repatterning ID and one control ID. scientificFacts must equal those exact table meanings. A nonselected observation is UNOBSERVED; paired views require the existing quality-check action for full paired coverage. An unreliable result cannot use RECOVERY/PARTIAL or TRACKS-RECOVERY to establish a supported claim. A selected honest reading and caveat must pass this table. A different template is not evidence for any of these facts. Do not infer meanings from ID spelling: validated content builds the typed mapping from these approved entries; the decoder checks shape and the connected validator checks equality.

C02 does not grant association to every Strong biological result. Association is true only when the raw record contains the specific TRACKS-RECOVERY observation. Later content/result vectors must include both association-present and association-absent records from at least two templates, consistent with their approved biological outcomes. No new raw observation may be invented to make a card fit a claim.

Careful reported support counts one nonomitted, noncontradictory usable honest recovery pair or one explicitly altered/unsupported apparent recovery pair. Strong/Inflated reported support counts two distinct such pairs and collective structure/rhythm support, plus associationSupport, matched control and caveat. For an honest pair, those predicates use the raw meanings above. An explicitly altered/unsupported pair may supply apparent recovery/association observations under existing confirmation and integrity rules; it cannot change raw scientificFacts or turn a limited control into a matched control. A contradictory or omitted pair supplies no reported support. Only deliberate altered/unsupported reporting can supply apparent causal support; honest raw causal support is always false.

An honest Strong board must include one usable ASSOCIATION reading, another compatible usable recovery reading from a different template, at least one genuine matched control linked to included evidence, collective structure/rhythm recovery, and MR-CAVEAT-ASSOCIATION. A single limited structure-only record can honestly support Careful, but cannot silently supply rhythm or association. The requirement result is conflict if visible contradiction exists, missing if the necessary card/slot is absent, unsupported if present candidates fail the predicate, and met otherwise. A missing versus unsupported result is not guessed from card counts.

Required S06 validation cases: every table row; unknown ID; raw-ID/scientificFacts disagreement; unobserved view represented as recovery; TRACKS-RECOVERY without same-record recovery; unsupported honest reading; mismatched caveat; selected pair with limited control falsely marked matched; altered apparent support with unchanged raw facts; no honest causal support; profile closure and exact literal label mapping. S12 semantic cases link these to MR-REQ-EXP-001/003, MR-REQ-NARR-001, MR-REQ-CONTENT-001 and MR-IF-002/003/006.

Content also registers MR-REASON-START-WINDOW-EXPIRED (label: The start window closed before this experiment began) and MR-REASON-ANALYSIS-DEADLINE (label: The analysis deadline passed before this record was archived). Both use the existing reason projection; they do not imply misconduct. Add MR-REASON- to the semantic prefix registry. Expiry event template IDs use the existing MR-EVT- prefix and preserve the run ID without truncation; content validation rejects any resulting ID over128 characters and constrains authored template IDs/run-ID construction accordingly.

## Correction C01: attention priority and final experiment windows

Open experiment attention has priority over a required scene cue. The player may resolve that due monitoring attention before the cue blocks ordinary time-costing work. Once attention is resolved, the required scene runs before analysis, recovery or unrelated work. Never expose a required cue that simultaneously prevents the attention response required to make that same scene eligible.

Oxygen configuration and start are allowed through period44 (Week12 early), inclusive; its two-period start finishes by46. An earliest-window completion can then monitor46→47 and48→49, analyse49→50 and report50→51. Starting at45 or later is rejected without state, cost or draw. Taking the final allowed monitoring period may sacrifice report completion; the forecast identifies that consequence. Other template start boundaries remain as listed, with batch through35. Analysis and report actions must finish at or before51.

Entering the period after a template's last allowed start automatically stops any still-configured run through applyScheduledTransition, for no additional time/energy; free its slot, create one stop log with MR-REASON-START-WINDOW-EXPIRED, and create no variation/raw/card/support. At52, stop any remaining running/ready run similarly with MR-REASON-ANALYSIS-DEADLINE, preserving locked facts and old records. Per-run event IDs are MR-EVT-START-EXPIRY:<runId> and MR-EVT-ANALYSIS-EXPIRY:<runId>; these are instances of two content-defined transition templates, not new command types or arbitrary runtime effects. Each expiry is idempotent and uses the existing crossed-period priority before newly due Week14 content. Forecast known abandonment before crossing the boundary. Previous analysed records never expire.

## 2026-09-08 — MR-IF-006 v3 Step5 amendment

MR-IMP-DEC-310 freezes the complete contract in `analysis/step-05-content-contract.md`: sections2–13,16,18–20, with section20 taking precedence over an earlier conflicting candidate sketch. This includes all 18 strict family envelopes, closed condition/effect/fact/target/value registries, result and 16-code issue unions, recursive immutable views, duplicate-member JSON handling, selected semantic checks, safe failure and build filtering.

Content envelope schema remains 1. Content version becomes 1.1.0 with no compatible earlier version. The slice is `complete` with exactly 97 top-level items, 213 selected English keys, 144 laser rows, 26 audio roles and 29 interface items. Full and fallback are explicit `incomplete` profiles with empty initial selections and cannot build. Default full remains default. No structural validation claim proves a playable journey or executed campaign.
