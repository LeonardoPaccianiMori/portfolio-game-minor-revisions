# Implementation Specification Open Issues

Status: **S01–S02 resolved; S03 issue group active; no issue silently resolved**

This is the durable clarification ledger for technical specification. It
tracks missing or undecided material information. It does not contain casual
ideas or measured results that do not exist yet.

## Status values

- `open`: dependent specification work cannot complete.
- `in discussion`: Leonardo and Codex are actively resolving it.
- `awaiting approval`: a complete synthesis exists but is not approved.
- `resolved`: the approved answer is written in its authoritative
  specification and decision entries.
- `measured later`: method, target, and response rule are approved; the result
  must come from later execution.
- `not applicable`: the approved architecture made the question unnecessary.

## Issue groups

| ID | Block | Required decision group | Status | Resolution evidence |
|---|---|---|---|---|
| MR-IMP-OPEN-001 | S01 | Exact Node, npm, TypeScript, Vite, Three.js and approved runtime/development dependency versions; package scripts; repository tree; configuration; local environment; update and lockfile policy | Resolved | `specs/01-toolchain-and-repository.md`; MR-IMP-DEC-013–022 |
| MR-IMP-OPEN-002 | S02 | Exact module graph, allowed import directions, service lifecycles, error boundaries, dependency injection, public interfaces, and shared ownership | Resolved | `specs/02-module-architecture.md`; MR-IMP-DEC-023–036; MR-IF-001 candidate `v1` |
| MR-IMP-OPEN-003 | S03 | Exact domain types, `CampaignState`, stored and derived fields, invariants, identifiers, units, defaults, and serialization boundary | Open; next | Pending `specs/03-domain-model-and-state.md` |
| MR-IMP-OPEN-004 | S04 | Exact commands, effects, validation order, rejection results, transition algorithms, PRNG use, outcome truth tables, and unchanged-state guarantees | Open | Pending `specs/04-commands-rules-and-determinism.md` |
| MR-IMP-OPEN-005 | S05 | Exact safe-point ordering, period and week transitions, event eligibility, expiry, scene priority, interruption, cutscene skip, checkpoint, reload, and recap state machines | Open | Pending `specs/05-calendar-scheduler-events-and-cutscenes.md` |
| MR-IMP-OPEN-006 | S06 | Exact authored-data file split, object schemas, cross-references, string-file contract, validation order, content versioning, and full/fallback/slice build selection | Open | Pending `specs/06-content-data-and-build-profiles.md` |
| MR-IMP-OPEN-007 | S07 | Exact database name and version, store and key shapes, transaction boundaries, validation, backup, recovery offers, migration steps, completion retention, and clear-data behaviour | Open | Pending `specs/07-persistence-and-recovery.md` |
| MR-IMP-OPEN-008 | S08 | Exact coordinate and unit system, floor and room dimensions, geometry, collision volumes, player controller values, interaction ranges, anchors, camera, focused stations, and no-trap checks | Open | Pending `specs/08-world-geometry-and-interaction.md` |
| MR-IMP-OPEN-009 | S09 | Exact action map, focus and pointer-lock states, screen and overlay inventory, component behaviour, responsive layout, controller navigation, settings, and accessibility acceptance | Open | Pending `specs/09-input-ui-and-accessibility.md` |
| MR-IMP-OPEN-010 | S10 | Exact render pipeline, scene graph, cameras, lighting, materials, animation, resource ownership, placeholder and provenance path, audio graph, cue priority, and cutscene presentation | Open | Pending `specs/10-rendering-resources-assets-and-audio.md` |
| MR-IMP-OPEN-011 | S11 | Exact compatibility detection, graphics-profile values, CPU/GPU and memory budgets, download budgets, profiling method, diagnostics format, privacy boundary, and response to failed measurements | Open | Pending `specs/11-browser-performance-and-diagnostics.md` |
| MR-IMP-OPEN-012 | S12 | Exact fixture format and expected values for rules, scheduler, persistence, UI, content, accessibility, browser, performance, cutscene, resource, and end-to-end acceptance | Open | Pending `specs/12-test-vectors-and-acceptance.md` |
| MR-IMP-OPEN-013 | S13 | Exact future source ownership, worker dependency graph, assignment packets, branch and commit workflow, integration order, review evidence, and contribution records | Open | Pending `specs/13-agent-work-orders-and-integration.md` |
| MR-IMP-OPEN-014 | S14 | Final contradiction, assumption, traceability, interface-freeze, content-boundary, licence, privacy, accessibility, and gate audit results | Open | Pending `specification-audit.md` |

## Issue protocol

1. Add a stable ID before dependent work continues.
2. Preserve the original question when Leonardo requests clarification or
   answers only part of it.
3. Link each resolved issue to its specification, decision IDs, interfaces,
   and fixtures.
4. Do not convert a measured-later result into a guessed value.
5. Update `status.md` when the active issue group changes.

The current active group is `MR-IMP-OPEN-003`.
