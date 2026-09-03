# Implementation Interface Register

Status: **`MR-IF-002` frozen `v4`; historical `v1`–`v3` superseded; all other interfaces frozen `v1`; Step-4 prerequisite-proof correction approved**

This register prevents two agents from inventing incompatible shared
contracts. It tracks only boundaries used by more than one module or work
package. File-local helpers do not belong here.

## Lifecycle

| State       | Meaning                                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| Not started | The required boundary is known, but its exact contract is not written.                                          |
| Draft       | Inputs, outputs, ownership, failures, and invariants are being discussed. No consumer can implement against it. |
| Candidate   | The complete contract and fixtures exist and are under consistency review.                                      |
| Frozen      | Leonardo approved the contract; its owner, consumers, version, fixtures, and freeze commit are recorded.        |
| Superseded  | A later approved version replaced it; history and migration effects remain visible.                             |

Changing a candidate or frozen interface requires an affected-consumer list,
compatibility and migration review, updated fixtures and traceability, and
Leonardo's approval. `Frozen` means stable for the current approved work; it
does not make an interface permanent. A later approved version supersedes the
earlier version, preserves its history, and governs future work only. An
accepted result remains historical evidence and is not rewritten.

## Planned interfaces

| ID        | Interface                                                         | Owning block | Planned consumers                                                                                           | State  | Version and owner                                                                                                                                                                  | Required freeze evidence                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------- | ----------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MR-IF-001 | Runtime bootstrap and application lifecycle                       | S01–S02      | All runtime modules, UI, tests                                                                              | Frozen | `v1`; controller owner: `application`; browser-entry owner: `bootstrap`                                                                                                            | `MR-S02-FIX-001`–`010`; connected S12 fixture contract; completed S14 cross-interface audit                                                                                                                                                                                                                                                                                                                                                           |
| MR-IF-002 | `CampaignState` and serializable domain types                     | S03–S07      | Rules, scheduler, content, persistence, UI, cutscenes, tests                                                | Frozen | `v4`; owner: `rules`; `v1` and `v2` superseded on 2026-09-02; `v3` superseded on 2026-09-03                                                                                        | Complete `v3` evidence plus typed career progress, concern route impact, immutable route-evaluation proof, PIIM source roles, claim levels, fixed requirement results, milestone order, and exact PIIM target. No player-visible rule or starting value changed.                                                                                                                                                                                      |
| MR-IF-003 | Rule command, rejection, effect, and transition result            | S04–S06      | Application, interaction, UI, scheduler, audio, cutscenes, persistence coordination, tests                  | Frozen | `v1`; owner: `rules`                                                                                                                                                               | One valid vector for all 24 commands; all 15 rejections and six faults; unchanged-state, atomicity, rule-table, route, ending, scheduler, scene, two-phase finalization, and restricted-content-view fixtures; S09 and S12 connections; S14 audit                                                                                                                                                                                                     |
| MR-IF-004 | Stateless deterministic variation                                 | S04 and S07  | Experiment rules, PIIM rules, persistence through campaign facts, tests                                     | Frozen | `v1`; owner: `rules`                                                                                                                                                               | Exact UTF-8/FNV-1a/Mulberry32 vectors; bucket boundaries; namespace isolation; reload, retry, unrelated-command, rejected-command, and no-redraw fixtures; saved canonical round trip and migration preservation in `MR-S07-SAV-001` and `MR-S07-MIG-001`; S12 executable format; S14 audit                                                                                                                                                           |
| MR-IF-005 | Safe-point scheduler and event queue                              | S05–S07      | Application, rules, narrative, cutscenes, persistence, UI, content validation, tests                        | Frozen | `v1`; owner: `rules`                                                                                                                                                               | Complete trigger and result unions, ordering, priority, lifecycle, expiry, crash, message, room, late-gate, ending, fault, invariant, exact authored-reference, physical checkpoint, load, and recovery contract; S05 fixtures and journeys plus `MR-S07-SAV-001`, `MR-S07-REC-001`, and `MR-S07-CMP-001`; S09–S10 consumers; S12 executable format; S14 audit                                                                                        |
| MR-IF-006 | Authored content objects, references, strings, and build profiles | S06–S07      | Rules, scheduler, application bootstrap, persistence, UI, audio, cutscenes, content tests                   | Frozen | `v1`; owner: `content`                                                                                                                                                             | Strict source package and immutable views; sequential `MR-WP-07` and `MR-WP-08` catalogue ownership; explicit complete or incomplete development-profile state; refusal to build an incomplete profile; S06 fixture groups; exact stored version, profile, saved-reference, direct-mapping, Citation, and ending-card checks in `MR-S07-MIG-001` and `MR-S07-CMP-001`; S09–S10 consumers; S12 executable format; S13 work-package boundary; S14 audit |
| MR-IF-007 | IndexedDB persistence and migration boundary                      | S07          | Rules state, settings UI, Continue/New Game, Archive                                                        | Frozen | `v1`; owner: `persistence`                                                                                                                                                         | Complete database, store, key, envelope, transaction, validation, backup, recovery, migration, settings, Archive, completion, concurrency, clear-data, lifecycle, and failure contract; `MR-S07-SAV-001`, `MR-S07-REC-001`, `MR-S07-MIG-001`, `MR-S07-CMP-001`, `MR-S07-CLR-001`, and `MR-S07-FLT-001`; S09 UI consumer; S12 executable format; S14 browser and cross-interface audit                                                                 |
| MR-IF-008 | World state and presentation projection                           | S08–S10      | Renderer, interaction, UI, cutscenes, rules effects                                                         | Frozen | `v1`; spatial-plan and world-projection owner: `world`; renderer owner: `rendering`; cutscene presentation owner: `cutscenes`                                                      | Exact S08 geometry, anchor, projection, semantic-location, room-state, character, passage, lifecycle, traversal, and fault contract plus S10 atomic visual projection, scene groups, visibility, transitions, camera, resources, cutscenes, and teardown; S08 fixture groups; `MR-S10-RND-001`, `MR-S10-SCN-001`, and `MR-S10-RES-001`; S12 executable format; S14 audit                                                                              |
| MR-IF-009 | Action-based input and interaction target                         | S08–S09      | Player controller, stations, UI, cutscenes, accessibility                                                   | Frozen | `v1`; device and binding owner: `input`; movement-context owner: `world`; player-result owner: `player`; target owner: `interaction`                                               | Exact S08 movement, camera, collision, target, focus-geometry, context, rejection, and fault contract plus S09 action, device, remap, held-state, pointer-capture, input-mode, focus, prompt, and accessibility contract; `MR-S08-COL-001`, `MR-S08-MOV-001`, `MR-S08-TGT-001`, `MR-S08-FOC-001`, `MR-S08-FLT-001`, `MR-S09-INP-001`, and `MR-S09-FOC-001`; S12 executable format; S14 audit                                                          |
| MR-IF-010 | UI view model and semantic action dispatch                        | S09          | Rules, persistence, input, content, captions, menus, tests                                                  | Frozen | `v1`; projection and semantic-screen owner: `ui`; validation and dispatch owner: `application`                                                                                     | Exact closed screen, complete revisioned projection, action dispatch, settings, focus, scale, responsive layout, confirmation, notification, error, storage-message, accessibility, lifecycle, and fault contract; `MR-S09-UI-001`, `MR-S09-SET-001`, `MR-S09-A11Y-001`, `MR-S09-ERR-001`, `MR-S09-RSP-001`, `MR-S09-LIF-001`, and `MR-S09-JRN-001`; S10 presentation connections; S12 executable format; S14 audit                                   |
| MR-IF-011 | Cutscene timeline, checkpoint, skip, and restoration              | S05 and S10  | Scheduler, world, UI, input, audio, persistence, tests                                                      | Frozen | `v1`; campaign owner: `rules`; presentation owner: `cutscenes`                                                                                                                     | S05 request, response, token, checkpoint, choice, skip, failure, reload, closing, and recap contract plus S10 timeline, camera, actor, animation, audio, resource validation, Camila portrait, complete restoration, stale response, and teardown; `MR-S05-SCN-001`, `MR-S05-SKP-001`, `MR-S05-REC-001`, and `MR-S10-SCN-001`; S12 executable format; S14 audit                                                                                       |
| MR-IF-012 | Audio bus, cue, and dialogue-sound request                        | S10          | UI, rules effects, world, cutscenes, settings, tests                                                        | Frozen | `v1`; owner: `audio`                                                                                                                                                               | One context; exactly four total buses; exact volume, mute, ambience, spatial-source, cue-priority, music-role, dialogue-palette, caption, unavailable, suspended-context, restoration, and teardown contract; `MR-S10-SCN-001` and `MR-S10-RES-001`; S11 compatibility consumers; S12 executable format; S14 audit                                                                                                                                    |
| MR-IF-013 | Asset and resource ownership lifecycle                            | S10          | Application, world, renderer, UI, cutscenes, audio, bootstrap diagnostics, tests                            | Frozen | `v1`; preparation-order owner: `application`; visual-resource owner: `rendering`; audio-resource owner: `audio`; DOM-presentation owner: `ui`; provenance owner: asset manifest    | Specialist ownership; stable plain records; initial preparation; sharing inside one resource owner; already-loaded background preparation; required and optional failure; cancellation; late result; release; placeholder; provenance; context loss; and teardown; `MR-S10-RND-001`, `MR-S10-SCN-001`, and `MR-S10-RES-001`; S11 resource-budget consumers; S12 executable format; S14 audit                                                          |
| MR-IF-014 | Compatibility, performance, and sanitized diagnostic record       | S11          | Bootstrap, platform, persistence boundary, rendering, input, audio, settings, UI, tests, private evaluation | Frozen | `v1`; compatibility owner: `platform`; graphics-budget owner: `rendering`; diagnostic-conversion owner: bootstrap's private diagnostic adapter; evidence owner: private evaluation | Exact six-capability report, temporary probe lifecycle, three profiles, frame, processor, workload, memory, loading and download budgets, measurement and failure rules, sanitized 2-KiB record, and `MR-S11-CMP-001`, `MR-S11-PERF-001`, `MR-S11-DIA-001`; S12 executable format; S14 audit                                                                                                                                                          |
| MR-IF-015 | Test fixture and traceability format                              | S12          | Every module, future work package, reviewer, and test suite                                                 | Frozen | `v1`; future owner: `MR-WP-09 Quality and release preparation`                                                                                                                     | Strict fixture envelope, stable manifest, shared-resource rules, closed steps, exact expectations, atomic acceptance rows, two-way requirement/test/interface/content/specification traceability, evidence classification, fixture self-checks, S02–S12 case routes, all seven S13 ownership, graph, work-order, Git, review, contribution, and gate groups, and S14 audit                                                                            |

## S14 freeze state

S14 historically froze `MR-IF-001` through `MR-IF-015` at `v1` through their
owning S02–S12 specifications, the S13 ownership and phase boundary, the
connected S12 fixture and acceptance contract, and the S14 cross-interface
audit. The S13 staged-content correction is included in frozen `MR-IF-006`.

On 2026-09-02, Leonardo approved the Step-4 evidence and impact packet that
supersedes only `MR-IF-002 v1` with frozen `v2`. The new version adds the exact
creation-input contract needed by the real New Game boundary. The complete
stored state, game values, validation, serialization, consumers, and all other
interfaces are unchanged. No save migration is required because no campaign
save exists. Historical `v1` decisions and accepted work remain evidence.

Complete Step-4 review later proved that `v2` could not identify every record
that it required at creation without rules inventing S06-owned content IDs.
Leonardo approved `v3` on 2026-09-02. It preserves the creation inputs and
starting values, makes run-owned and content-owned lifecycle records sparse,
fixes the exact non-sparse identities and initial roster, and completes the
internal validation and canonical-order contracts. No save or migration exists.

A later complete review proved that `v3` could not enforce every stated route
and PIIM prerequisite because the state did not contain typed semantic proof.
Leonardo approved frozen `v4` on 2026-09-03. It adds the minimum typed career,
concern, route-evaluation, PIIM-source, claim, requirement, and milestone facts
defined in S03. The affected consumers remain rules, scheduler, content,
application, persistence, UI, cutscenes, and tests. No command, route
condition, PIIM table, conclusion rule, story, balance, save, or migration
changes.

`MR-S14-FIND-006` and `MR-S14-FIND-007` record the complete consumer and freeze
results. The freeze commit is the Git commit that contains this register and
`specification-audit.md`. A future machine-readable fixture or test result does
not exist now.

No implementation worker can use frozen status as permission to create a
signature or source file. Gate 1 was approved and Step 1 was accepted on
2026-09-01. Leonardo approved the exact Step-2 plan and its later correction
plans on the same date. The correction code and primary audit are complete,
fresh independent technical review passed, and the reviewed result is
integrated on local `main`. Complete main-branch validation passed. Leonardo
accepted Step 2 on 2026-09-02. Leonardo approved the exact Step-3 plan on the
same date. The controlled `MR-WO-WP00-005` submission and complete primary
audit use the applicable frozen `MR-IF-001`, `MR-IF-014`, and `MR-IF-015`
subsets without changing them. Fresh independent review found no interface
issue; its required narrow current-record correction passed focused primary
validation. The exact reviewed result is integrated on local `main`, and
complete main-branch validation confirms that no frozen interface changed.
Leonardo accepted Step 3 on 2026-09-02. A
change to any
frozen interface requires an affected-consumer list,
compatibility and migration review, updated fixtures and traceability, and
Leonardo's approval. The later approved interface version supersedes the
earlier version and applies to future work only.
