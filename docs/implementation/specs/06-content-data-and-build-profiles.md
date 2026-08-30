# S06 — Content Data and Build Profiles

Status: **documented technical specification; no implementation authorized**

This specification fixes the authored-content package, strict data shapes,
stable identifiers, references, English-string boundary, full, fallback, and
vertical-slice profiles, validation order, compatibility rules, and candidate
`MR-IF-006` for *Minor Revisions*.

The numbered design documents remain the authority for player-visible story,
meaning, text, balance, and content counts. S03 owns stored campaign shape. S04
owns commands, rules, deterministic variation, and campaign changes. S05 owns
calendar, scheduler, event lifecycle, and cutscene coordination. This document
defines the authored facts that those systems can read. It does not let content
data create a new rule or write an arbitrary campaign field.

S07 owns physical save migration and recovery. S09 owns interface
presentation. S10 now owns verified-resource handoff, rendering, audio
playback, and cutscene presentation. It selects no actual asset or codec. S12
will encode the fixtures named here. S14 will
perform the final content-safety and cross-interface audit.

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
- campaign mode `campaign` for full and fallback or `evaluationSlice` for
  slice;
- explicit, ID-sorted selections for every data family;
- explicit one-to-one replacement mappings;
- expected counts for every counted family; and
- `sliceCompletionId`, which is `MR-UI-SLICE-COMPLETE` only for slice and
  `null` otherwise.

Profiles do not inherit. An empty selected family uses an explicit empty list.
A profile cannot select a family through a wildcard, prefix, range, or
negative exclusion. The profile file is the complete selection.

## Stable identifier contract

All authored object IDs are globally unique across the complete source
catalogue. They use a recognized `MR-` family prefix, uppercase ASCII letters,
digits, and single hyphens. They contain 1–128 characters, cannot start or end
with a hyphen, and cannot contain adjacent hyphens. Once shipped, an ID cannot
be reused for a different meaning, family, speaker, location, action, form,
choice, cue, record, or outcome.

S06 confirms the existing content prefixes and adds these exact prefixes:

| Prefix | Use |
|---|---|
| `MR-EVT-` | Scheduler event definition |
| `MR-MSG-` | Message definition |
| `MR-NOT-` | No-reply notification definition |
| `MR-FORM-` | Saved scene or message form |
| `MR-BEAT-` | Ordered authored scene beat |
| `MR-CHO-` | Scene or message choice |
| `MR-CUE-` | World or desk availability cue |
| `MR-SLICE-` | Slice-only evaluation object |
| `MR-CHR-` | Recurring character identity |
| `MR-SPK-` | Non-character speaker role |
| `MR-LOC-` | Semantic location identity |

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

| Family | Required family data |
|---|---|
| `characters` | Character ID, display-name key, role key, physical-or-remote role, speaker role, and relationship identity or explicit `null` |
| `locations` | Location ID, display-name key, semantic room type, allowed cue roles, and S08 mapping key |
| `actions` | Action ID, display-name key, work class, period cost, base energy cost, S04 command type, forecast key, and reason keys |
| `experiments` | Experiment ID, experiment family, allowed goals, controls, observations, sample states, equipment states, stage actions, monitoring windows, readings, caveats, record outputs, and evidence outputs |
| `tasks` | Task ID, task family, completion command, available choices, result references, and active request or explicit `null` |
| `roomStates` | Room-state ID, location ID, affected work, activation event, forecast key, route choices, route costs, and expiry fallback |
| `events` | Event ID, status, priority, authored order, delivery type, delivery target, cue or `null`, fallback or `null`, and thread ID or `null` |
| `scenes` | Scene ID, event ID, location ID or `null`, cue or `null`, base form, conditional form or `null`, ordered beats, choices, period effect, closing key, and recap key |
| `messages` | Message ID, event ID, sender, thread ID, subject key, body forms, reply choices, deferral rule, follow-up events, and expiry result |
| `notifications` | Notification ID, event ID, sender, thread ID or `null`, body forms, presentation kind, and follow-up event IDs |
| `records` | Record ID, record family, title key, body forms, source experiment or event, saved selection rule, and repeat-note keys |
| `endings` | Ending ID, career, paper, relationship, integrity, or fatigue family, selection conditions, body key, and approved variants |
| `citations` | Citation ID, title key, body key, unlock conditions, permanent unlock rule, and Archive presentation data |
| `environmentalItems` | Item ID, location ID, act availability, glance or focused presentation, text keys, and one-time or repeat rule |
| `contextualLines` | Line ID, internal or character speaker, window, context conditions, text key, and one-time rule |
| `tutorials` | Tutorial ID, trigger conditions, heading and body keys, acknowledgement rule, and input-action references |
| `interface` | Interface ID, semantic purpose, text keys, confirmation meaning, availability, and dynamic-field roles |
| `audio` | Audio or music role ID, semantic role, cue meaning, required visual or text duplicate, and S10 handoff role |

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

| Discriminant | Permitted comparison |
|---|---|
| `periodInWindow` | Inclusive opening and final period |
| `actIs` | One approved act state |
| `pressureProfileIs` | `standard` or `supported` |
| `enumIs` | One approved enum family and value |
| `booleanIs` | One approved Boolean fact family and value |
| `integerInRange` | One approved safe-integer fact family and inclusive bounds |
| `idPresenceIs` | One approved ID collection, target ID, and present-or-absent value |
| `contentStateIs` | One content ID and approved completion, expiry, selection, or presentation state |
| `experimentStateIs` | One experiment or run reference and approved state |
| `manuscriptStateIs` | One approved manuscript, reviewer, reading, caveat, or snapshot state |
| `concernStateIs` | One concern reference and approved state |
| `routeStateIs` | Aldercroft or Morrow and approved route state |
| `relationshipStateIs` | One recurring character and approved saved relationship fact |
| `piimStateIs` | One approved PIIM response or outcome fact |
| `paperStateIs` | One approved paper state |
| `fatigueStateIs` | One approved crash or ending-energy fact |
| `conclusionStateIs` | One approved final-choice or completion state |
| `countInRange` | One approved collection and inclusive count bounds |

A leaf names its approved fact family and supplies the exact typed comparison
for that family. It cannot read player text, real time, browser state,
rendering, audio, file state, hidden machine data, or an unregistered campaign
field. Validation rejects an impossible comparison and a condition that
depends on content excluded from the selected profile.

## Authored effects and rule authority

Authored effects are declarative instructions consumed only through an
approved S04 command or scheduled transition. The exact closed operation
discriminants are:

| Discriminant | Permitted result |
|---|---|
| `adjustMetric` | Apply one approved fixed safe-integer delta through its owning rule. |
| `setFact` | Set one approved Boolean or enum fact to one allowed value through its owning rule. |
| `recordHistory` | Add one approved stable ID to one permanent factual history. |
| `applyDomainResult` | Create or update one approved request, task, route, relationship, manuscript, experiment, record, citation, or conclusion fact through its owning rule. |
| `applyActionCost` | Advance time and charge or restore energy through one approved action ID. |
| `requestPresentation` | Request one of the five existing S04 presentation effects with one valid authored reference. |

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

| Work class | Actions |
|---|---|
| `recovery` | Protected break |
| `light` | Routine monitor, Elena report, relationship action, and room wait |
| `focused` | Configure, focused start, quality monitor, analysis, manuscript revision, and career action |
| `intense` | Intensive start and initial manuscript draft |
| `major` | PIIM response |

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

| Family | Count |
|---|---:|
| Experiment templates | 6 |
| Operational room states | 3 |
| Mandatory scenes | 7 |
| Optional scenes or contacts | 10 |
| Primary records | 20 |
| Ending modules | 29 |
| Institutional Citations | 12 |
| Environmental items | 30 |
| Contextual lines | 14 |

The profile also explicitly selects all required actions, tasks, events,
forms, choices, messages, notifications, tutorial items, interface items,
characters, speakers, locations, cues, and audio roles. No count can be
inferred from a filename or prefix.

## Fallback profile

The fallback is a coherent campaign profile. Its counted families are exactly:

| Family | Selection |
|---|---|
| Experiment templates | 4: laser/sham, combined range/repair, batch, oxygen |
| Operational room states | 2 |
| Mandatory scenes | all 7 |
| Optional scenes or contacts | 7 |
| Primary records | 18 |
| Ending modules | all 29 |
| Institutional Citations | all 12 |
| Environmental items | the approved 20-item subset |
| Contextual lines | all 14 |

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

1. validate the complete source catalogue and all three profiles;
2. select the requested profile;
3. apply its direct replacement mappings where required;
4. check dependency closure and profile reachability;
5. select only listed data objects;
6. select only their referenced English strings and fixed selected string
   groups;
7. create build metadata with package ID, schema version, content version,
   language, and selected profile ID;
8. validate the filtered package again; and
9. give only the final checked package to Vite.

The finished static build contains no raw complete catalogue, unused profile,
excluded data object, excluded English string, source profile path, or
development validation detail. Vite can apply its approved content hashes to
generated filenames. Generated output is not a second authored source.

A failed selection or post-filter check produces no usable content package.
It cannot silently keep a stale earlier profile or switch to fallback.

### Generated package envelope

Build filtering creates one in-memory plain-data package with exactly:

- `metadata`: package ID, schema version, content version, language, selected
  profile ID, compatible earlier versions, and expected counts;
- `families`: all eighteen family names, each with its selected ID-sorted
  objects or an explicit empty list; and
- `strings`: the selected sorted text-key map.

This generated envelope is the raw browser-startup input. It contains no
source manifest paths, profile paths, replacement map, alternate profile, or
unselected source object. The browser validates this complete envelope again
before it creates runtime views.

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
11. validate each profile, replacement map, dependency closure, exact count,
    and profile-specific reachability;
12. select and filter the requested build profile;
13. reject excluded dependencies and unreferenced shipped strings;
14. calculate the build-specific unique English-word count;
15. revalidate the complete filtered package; and
16. create one new immutable `ValidatedContent` value.

Development startup, production build, and source tests run steps 1–16.
Browser startup receives only the generated package envelope. It first checks
that strict envelope, then repeats the applicable ID, shape, string,
reference, invariant, count, reachability, word-count, and immutable-copy
checks from steps 5–16 for its one embedded profile. It does not require or
reconstruct the unshipped source manifest or other profiles.

Validation never repairs, inserts a default, deletes an item, reorders
meaningful authored order, replaces an ID without a mapping, truncates text,
changes profile, or returns a partial package.

## Closed validation issue codes

An invalid result contains one or more issues in deterministic validation
order. Every issue uses one of these closed codes:

| Code | Meaning |
|---|---|
| `malformedJson` | A required file is not valid permitted JSON. |
| `invalidManifest` | The source manifest or one listed path is invalid. |
| `invalidProfile` | A profile envelope, identity, field, or mapping is invalid. |
| `invalidObject` | A family object has a wrong shape, type, value, or range. |
| `invalidId` | An object ID, requirement ID, test ID, or text key has an invalid grammar. |
| `invalidText` | An English value, placeholder, or fixed string group is invalid. |
| `duplicateId` | Two authored objects use one global stable ID. |
| `duplicateTextKey` | A text key occurs more than once or has conflicting meaning. |
| `missingReference` | A referenced object, text key, requirement, or test is absent. |
| `wrongReferenceFamily` | A reference points to an object of the wrong family. |
| `circularReference` | A prohibited dependency, thread, or replacement cycle exists. |
| `incompleteProfile` | A profile omits a required family, item, route, or dependency. |
| `excludedDependency` | Selected content depends on an excluded object or string. |
| `countMismatch` | A fixed catalogue or profile count is wrong. |
| `invariantFailure` | A cross-content, reachability, delivery, form, safety, or rule invariant fails. |
| `wordLimitExceeded` | The selected English file contains more than 6,000 unique words. |

Each issue contains only its code, repository-relative file path, JSON field
path, and stable object ID or text key when available. It contains no complete
English value, raw file, save data, player name, stack trace, absolute path, or
machine information.

## Required cross-content checks

Automatic validation checks all of the following:

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

Reachability is checked separately for full, fallback, and slice. A path that
works only because excluded content is present fails the smaller profile.

Automatic structure checks cannot prove that prose is scientifically safe,
non-identifying, clear, funny, or faithful to the intended causal meaning.
S14 must manually review selected English text for:

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

- `validateSourceCatalogue(rawSourceFiles)` validates the complete source and
  returns a checked source catalogue or ordered issues;
- `createBuiltContentPackage(validatedSource, requestedProfileId)` selects,
  filters, and revalidates one generated package or returns ordered issues;
  and
- `validateContentPackage(rawBuiltPackage)` revalidates the embedded browser
  package and returns runtime `ValidatedContent` or ordered issues.

Each operation returns exactly one of these result forms:

| Result | Required data | Meaning |
|---|---|---|
| `valid` | the operation's one complete checked value | Every applicable source, profile, selection, and final-package check passed. |
| `invalid` | ordered `ContentValidationIssue` values | No content value or partial view was created. |

Expected bad authored input returns `invalid`; it is not an uncaught exception.
An unexpected internal failure is handled by the S02 fatal boundary and does
not expose raw input.

`ValidatedContent` contains four deeply immutable plain-data views:

| View | Contents | Consumers |
|---|---|---|
| `metadata` | Package, schema, content version, language, profile, compatibility, and expected counts | application, persistence coordination, tests |
| `rules` | Conditions, costs, rule parameters, references, windows, effects, experiment, task, route, ending, and record facts | rules and scheduler |
| `presentation` | Approved semantic labels, scene structure, messages, notifications, cue roles, tutorial, interface, environment, and audio-role references | UI, world projections, cutscenes, audio |
| `strings` | Selected text-key-to-English-value map | presentation consumers only |

Rules and scheduler receive only `rules` plus the metadata fields required to
check profile and version. They never receive English values. Other modules
receive only the view needed by their public port. Raw JSON, raw source
objects, source arrays, and a mutable complete catalogue are never read outside
the content module.

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

S12 must later encode the groups below. S06 names required evidence but does
not claim that a fixture file, content file, build, or passing test exists.

Each valid fixture contains a complete manifest, source file set, selected
profile, expected IDs and counts, expected selected keys, expected word count,
expected view summaries, and important excluded items.

| Fixture group | Required coverage |
|---|---|
| `MR-S06-VAL-001` | One complete valid full package, exact counts, all references, all required content, stable ordering, and deterministic repeated validation. |
| `MR-S06-FBK-001` | Exact fallback cut, direct range/repair replacements, basic facility route, all mandatory content, exact counts, and no excluded text. |
| `MR-S06-SLC-001` | Exact Week-1 slice, claim rehearsal, save-flow content, slice completion, excluded later content, no endings or Citations, and no unrelated text. |
| `MR-S06-REF-001` | Valid references plus every missing, wrong-family, duplicate, circular, chained-replacement, and excluded-dependency rejection. |
| `MR-S06-STR-001` | Key grammar, placeholders, selected-key closure, normalized unique-word vectors, exact 6,000 boundary, and 6,001 rejection. |
| `MR-S06-OBJ-001` | Every strict family shape, explicit null and empty-list use, unknown fields, value ranges, forms, choices, conditions, and effects. |
| `MR-S06-MIG-001` | Exact current version, listed compatible version, retained selections, direct replacement, profile mismatch, missing mapping, and unchanged state after failure. |
| `MR-S06-FLT-001` | At least one case for every closed issue code, deterministic issue location, no partial content, no profile switch, and safe startup message. |

Every rejected fixture expects the exact issue code, repository-relative file,
field path, and ID or key when applicable. It also identifies the source and
saved values that must remain unchanged.

S12 owns the executable fixture-file shape and future recorded result. S14
owns the final contradiction, safety, and interface-freeze evidence.

## Interface lifecycle

`MR-IF-006` is candidate `v1` after S06. Its owner, consumers, inputs, outputs,
strict source boundary, profile selection, validation result, immutable views,
failure meaning, and required fixture groups are complete at specification
level. It is not frozen and does not authorize implementation.

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
data. No interface is frozen.

## S06 acceptance and handoff

S06 is documented only when:

- this complete source tree, envelope, manifest, profile, object, reference,
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
