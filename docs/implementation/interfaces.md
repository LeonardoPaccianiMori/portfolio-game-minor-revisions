# Implementation Interface Register

Status: **`MR-IF-001`–`MR-IF-007`, `MR-IF-009`, and `MR-IF-010` candidate; `MR-IF-008` and `MR-IF-011` parts draft; no interface frozen**

This register prevents two agents from inventing incompatible shared
contracts. It tracks only boundaries used by more than one module or work
package. File-local helpers do not belong here.

## Lifecycle

| State | Meaning |
|---|---|
| Not started | The required boundary is known, but its exact contract is not written. |
| Draft | Inputs, outputs, ownership, failures, and invariants are being discussed. No consumer can implement against it. |
| Candidate | The complete contract and fixtures exist and are under consistency review. |
| Frozen | Leonardo approved the contract; its owner, consumers, version, fixtures, and freeze commit are recorded. |
| Superseded | A later approved version replaced it; history and migration effects remain visible. |

Changing a candidate or frozen interface requires an affected-consumer list,
compatibility and migration review, updated fixtures, and Leonardo's approval.

## Planned interfaces

| ID | Interface | Owning block | Planned consumers | State | Version and owner | Required freeze evidence |
|---|---|---|---|---|---|---|
| MR-IF-001 | Runtime bootstrap and application lifecycle | S01–S02 | All runtime modules, UI, tests | Candidate | `v1`; controller owner: `application`; browser-entry owner: `bootstrap` | `MR-S02-FIX-001`–`010`; connected executable format pending S12; cross-interface audit pending S14 |
| MR-IF-002 | `CampaignState` and serializable domain types | S03–S07 | Rules, scheduler, content, persistence, UI, cutscenes, tests | Candidate | `v1`; owner: `rules` | Complete schema and invariants; exact experiment variation, raw-record, evidence-card, PIIM-lock, content-history, ending-module, scheduler-event, locked-scene-form, final-presentation, content-version, immutable-profile, canonical persistence round-trip, envelope agreement, and 1 MiB facts; `MR-S03-FIX-001`; `MR-S03-REJ-001`–`005`; `MR-S07-SAV-001` and connected variants; S12 executable format; S14 audit |
| MR-IF-003 | Rule command, rejection, effect, and transition result | S04–S06 | Application, interaction, UI, scheduler, audio, cutscenes, persistence coordination, tests | Candidate | `v1`; owner: `rules` | One valid vector for all 24 commands; all 15 rejections and six faults; unchanged-state, atomicity, rule-table, route, ending, scheduler, scene, two-phase finalization, and restricted-content-view fixtures; S09 and S12 connections; S14 audit |
| MR-IF-004 | Stateless deterministic variation | S04 and S07 | Experiment rules, PIIM rules, persistence through campaign facts, tests | Candidate | `v1`; owner: `rules` | Exact UTF-8/FNV-1a/Mulberry32 vectors; bucket boundaries; namespace isolation; reload, retry, unrelated-command, rejected-command, and no-redraw fixtures; saved canonical round trip and migration preservation in `MR-S07-SAV-001` and `MR-S07-MIG-001`; S12 executable format; S14 audit |
| MR-IF-005 | Safe-point scheduler and event queue | S05–S07 | Application, rules, narrative, cutscenes, persistence, UI, content validation, tests | Candidate | `v1`; owner: `rules` | Complete trigger and result unions, ordering, priority, lifecycle, expiry, crash, message, room, late-gate, ending, fault, invariant, exact authored-reference, physical checkpoint, load, and recovery contract; S05 fixtures and journeys plus `MR-S07-SAV-001`, `MR-S07-REC-001`, and `MR-S07-CMP-001`; S09–S10 consumers; S12 executable format; S14 audit |
| MR-IF-006 | Authored content objects, references, strings, and build profiles | S06–S07 | Rules, scheduler, application bootstrap, persistence, UI, audio, cutscenes, content tests | Candidate | `v1`; owner: `content` | Strict source package and immutable views; S06 fixture groups; exact stored version, profile, saved-reference, direct-mapping, Citation, and ending-card checks in `MR-S07-MIG-001` and `MR-S07-CMP-001`; S09–S10 consumers; S12 executable format; S14 audit |
| MR-IF-007 | IndexedDB persistence and migration boundary | S07 | Rules state, settings UI, Continue/New Game, Archive | Candidate | `v1`; owner: `persistence` | Complete database, store, key, envelope, transaction, validation, backup, recovery, migration, settings, Archive, completion, concurrency, clear-data, lifecycle, and failure contract; `MR-S07-SAV-001`, `MR-S07-REC-001`, `MR-S07-MIG-001`, `MR-S07-CMP-001`, `MR-S07-CLR-001`, and `MR-S07-FLT-001`; S09 UI consumer; S12 executable format; S14 browser and cross-interface audit |
| MR-IF-008 | World state and presentation projection | S08–S10 | Renderer, interaction, UI, cutscenes, rules effects | Draft | `v1`; spatial-plan and world-projection owner: `world`; renderer and cutscene presentation pending S10 | Exact S08 geometry, anchor, projection, semantic-location, room-state, character, passage, lifecycle, traversal, and fault contract; `MR-S08-GEO-001`, `MR-S08-ANC-001`, `MR-S08-WLD-001`, `MR-S08-TRV-001`, and `MR-S08-FLT-001`; S10 visibility, resources, transitions, cutscenes, and teardown; S12 executable format; S14 audit |
| MR-IF-009 | Action-based input and interaction target | S08–S09 | Player controller, stations, UI, cutscenes, accessibility | Candidate | `v1`; device and binding owner: `input`; movement-context owner: `world`; player-result owner: `player`; target owner: `interaction` | Exact S08 movement, camera, collision, target, focus-geometry, context, rejection, and fault contract plus S09 action, device, remap, held-state, pointer-capture, input-mode, focus, prompt, and accessibility contract; `MR-S08-COL-001`, `MR-S08-MOV-001`, `MR-S08-TGT-001`, `MR-S08-FOC-001`, `MR-S08-FLT-001`, `MR-S09-INP-001`, and `MR-S09-FOC-001`; S12 executable format; S14 audit |
| MR-IF-010 | UI view model and semantic action dispatch | S09 | Rules, persistence, input, content, captions, menus, tests | Candidate | `v1`; projection and semantic-screen owner: `ui`; validation and dispatch owner: `application` | Exact closed screen, complete revisioned projection, action dispatch, settings, focus, scale, responsive layout, confirmation, notification, error, storage-message, accessibility, lifecycle, and fault contract; `MR-S09-UI-001`, `MR-S09-SET-001`, `MR-S09-A11Y-001`, `MR-S09-ERR-001`, `MR-S09-RSP-001`, `MR-S09-LIF-001`, and `MR-S09-JRN-001`; S10 presentation connections; S12 executable format; S14 audit |
| MR-IF-011 | Cutscene timeline, checkpoint, skip, and restoration | S05 and S10 | Scheduler, world, UI, input, audio, persistence, tests | Draft | `v1`; campaign owner: `rules`; presentation owner pending S10 | S05 request, response, token, checkpoint, choice, skip, failure, reload, closing, and recap contract; `MR-S05-SCN-001`, `MR-S05-SKP-001`, and `MR-S05-REC-001`; S10 timeline, camera, actor, audio, resource, and restoration contract; S12 executable format; S14 audit |
| MR-IF-012 | Audio bus, cue, and dialogue-sound request | S10 | UI, rules effects, world, cutscenes, settings | Not started | Pending S10 | Muted, unavailable, suspended-context, caption redundancy, and teardown fixtures |
| MR-IF-013 | Asset and resource ownership lifecycle | S10 | World, renderer, cutscenes, audio, diagnostics | Not started | Pending S10 | Shared load, visibility, disposal, long-session, and missing-resource fixtures |
| MR-IF-014 | Compatibility, performance, and sanitized diagnostic record | S11 | Bootstrap, settings, UI, tests, private evaluation | Not started | Pending S11 | Supported, blocked, degraded, resource-budget, and privacy fixtures |
| MR-IF-015 | Test fixture and traceability format | S12 | Every module and future worker | Not started | Pending S12 | Schema check plus requirement, interface, content, and expected-result links |

## Current freeze state

`MR-IF-001` is candidate `v1` through
`specs/02-module-architecture.md`. `MR-IF-002` is candidate `v1` through
`specs/03-domain-model-and-state.md` and its approved S04–S05 refinements.
`MR-IF-003` and `MR-IF-004` are candidate `v1` through
`specs/04-commands-rules-and-determinism.md`. `MR-IF-005` is candidate `v1`
through `specs/05-calendar-scheduler-events-and-cutscenes.md` and its approved
S06 content connection. `MR-IF-006` is candidate `v1` through
`specs/06-content-data-and-build-profiles.md`. `MR-IF-007` is candidate `v1`
through `specs/07-persistence-and-recovery.md`. The S08-owned part of
`MR-IF-008` is draft `v1` through
`specs/08-world-geometry-and-interaction.md`. `MR-IF-009` is candidate `v1`
through the connected S08 and S09 contracts. `MR-IF-010` is candidate `v1`
through `specs/09-input-ui-and-accessibility.md`. The S05-owned campaign part
of `MR-IF-011` is draft `v1`; S10 still owns its presentation completion.
S10 and S12 must make the connected contracts and executable fixtures named in
the table; S14 must complete the cross-interface audit before an applicable
interface can become frozen.

No interface is frozen. No implementation worker can use candidate status as
permission to create a signature or source file. A change to any candidate
requires an affected-consumer list, compatibility and migration review,
updated fixtures, and Leonardo's approval.
