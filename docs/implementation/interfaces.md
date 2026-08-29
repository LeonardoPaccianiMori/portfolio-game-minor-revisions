# Implementation Interface Register

Status: **`MR-IF-001`–`MR-IF-004` candidate; no interface frozen**

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
| MR-IF-002 | `CampaignState` and serializable domain types | S03–S04 | Rules, scheduler, content, persistence, UI, cutscenes, tests | Candidate | `v1`; owner: `rules` | Complete schema and invariants; exact experiment variation, raw-record, evidence-card, PIIM-lock, content-history, and ending-module facts; `MR-S03-FIX-001`; `MR-S03-REJ-001`–`005` and connected variants; S06 content connection; S07 persistence connection; S12 executable format; S14 audit |
| MR-IF-003 | Rule command, rejection, effect, and transition result | S04 | Application, interaction, UI, scheduler, audio, cutscenes, persistence coordination, tests | Candidate | `v1`; owner: `rules` | One valid vector for all 24 commands; all 15 rejections and six faults; unchanged-state, atomicity, rule-table, route, and ending fixtures; S05, S06, S09, and S12 connections; S14 audit |
| MR-IF-004 | Stateless deterministic variation | S04 | Experiment rules, PIIM rules, persistence through campaign facts, tests | Candidate | `v1`; owner: `rules` | Exact UTF-8/FNV-1a/Mulberry32 vectors; bucket boundaries; namespace isolation; reload, retry, unrelated-command, rejected-command, and no-redraw fixtures; S07 and S12 connections; S14 audit |
| MR-IF-005 | Safe-point scheduler and event queue | S05 | Rules, narrative, cutscenes, persistence, UI | Not started | Pending S05 | Ordering, expiry, interruption, save, resume, and no-real-time fixtures |
| MR-IF-006 | Authored content objects, references, strings, and build profiles | S06 | Rules, scheduler, UI, audio, cutscenes, content validator | Not started | Pending S06 | Full, fallback, and slice validation fixtures plus invalid references |
| MR-IF-007 | IndexedDB persistence and migration boundary | S07 | Rules state, settings UI, Continue/New Game, Archive | Not started | Pending S07 | Round trip, backup, corrupt active, corrupt backup, migration, and clear-data fixtures |
| MR-IF-008 | World state and presentation projection | S08–S10 | Renderer, interaction, UI, cutscenes, rules effects | Not started | Pending S10 | Act change, room state, character anchor, visibility, and teardown fixtures |
| MR-IF-009 | Action-based input and interaction target | S08–S09 | Player controller, stations, UI, cutscenes, accessibility | Not started | Pending S09 | Keyboard, controller, pointer lock, focus, remap, and invalid-target fixtures |
| MR-IF-010 | UI view model and semantic action dispatch | S09 | Rules, persistence, input, captions, menus, tests | Not started | Pending S09 | Screen-state, focus, scale, confirmation, error, and action-cost fixtures |
| MR-IF-011 | Cutscene timeline, checkpoint, skip, and restoration | S05 and S10 | Scheduler, world, UI, input, audio, persistence | Not started | Pending S10 | Start, choice, skip, failure, reload, recap, and input-restoration fixtures |
| MR-IF-012 | Audio bus, cue, and dialogue-sound request | S10 | UI, rules effects, world, cutscenes, settings | Not started | Pending S10 | Muted, unavailable, suspended-context, caption redundancy, and teardown fixtures |
| MR-IF-013 | Asset and resource ownership lifecycle | S10 | World, renderer, cutscenes, audio, diagnostics | Not started | Pending S10 | Shared load, visibility, disposal, long-session, and missing-resource fixtures |
| MR-IF-014 | Compatibility, performance, and sanitized diagnostic record | S11 | Bootstrap, settings, UI, tests, private evaluation | Not started | Pending S11 | Supported, blocked, degraded, resource-budget, and privacy fixtures |
| MR-IF-015 | Test fixture and traceability format | S12 | Every module and future worker | Not started | Pending S12 | Schema check plus requirement, interface, content, and expected-result links |

## Current freeze state

`MR-IF-001` is candidate `v1` through
`specs/02-module-architecture.md`. `MR-IF-002` is candidate `v1` through
`specs/03-domain-model-and-state.md` and its approved S04 refinements.
`MR-IF-003` and `MR-IF-004` are candidate `v1` through
`specs/04-commands-rules-and-determinism.md`. Their inputs, outputs, ownership,
failures, invariants, and specification fixtures exist. S05, S06, S07, S09,
and S12 must make the connected contracts and executable fixtures named in
the table; S14 must complete the cross-interface audit before an applicable
interface can become frozen.

No interface is frozen. No implementation worker can use candidate status as
permission to create a signature or source file. A change to any candidate
requires an affected-consumer list, compatibility and migration review,
updated fixtures, and Leonardo's approval.
