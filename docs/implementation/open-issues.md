# Implementation Specification Open Issues

Status: **C01–C06 approved on 2026-09-06; current authority is the correction sections below and the interface register. Earlier B/R/S lifecycle records are historical. Runtime evidence remains step-specific.**

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

| ID              | Block                     | Required decision group                                                                                                                                                                                             | Status   | Resolution evidence                                                                                                                |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| MR-IMP-OPEN-001 | S01                       | Exact Node, npm, TypeScript, Vite, Three.js and approved runtime/development dependency versions; package scripts; repository tree; configuration; local environment; update and lockfile policy                    | Resolved | `specs/01-toolchain-and-repository.md`; MR-IMP-DEC-013–022                                                                         |
| MR-IMP-OPEN-002 | S02                       | Exact module graph, allowed import directions, service lifecycles, error boundaries, dependency injection, public interfaces, and shared ownership                                                                  | Resolved | `specs/02-module-architecture.md`; MR-IMP-DEC-023–036; MR-IF-001 candidate `v1`                                                    |
| MR-IMP-OPEN-003 | S03                       | Exact domain types, `CampaignState`, stored and derived fields, invariants, identifiers, units, defaults, and serialization boundary                                                                                | Resolved | `specs/03-domain-model-and-state.md`; MR-IMP-DEC-037–050; MR-IF-002 candidate `v1`                                                 |
| MR-IMP-OPEN-004 | S04                       | Exact commands, effects, validation order, rejection results, transition algorithms, PRNG use, outcome truth tables, and unchanged-state guarantees                                                                 | Resolved | `specs/04-commands-rules-and-determinism.md`; MR-IMP-DEC-051–067; MR-IF-003 and MR-IF-004 candidate `v1`                           |
| MR-IMP-OPEN-005 | S05                       | Exact safe-point ordering, period and week transitions, event eligibility, expiry, scene priority, interruption, cutscene skip, checkpoint, reload, and recap state machines                                        | Resolved | `specs/05-calendar-scheduler-events-and-cutscenes.md`; MR-IMP-DEC-068–086; MR-IF-005 candidate `v1`; MR-IF-011 S05 part draft `v1` |
| MR-IMP-OPEN-006 | S06                       | Exact authored-data file split, object schemas, cross-references, string-file contract, validation order, content versioning, and full/fallback/slice build selection                                               | Resolved | `specs/06-content-data-and-build-profiles.md`; MR-IMP-DEC-087–107; MR-IF-006 candidate `v1`                                        |
| MR-IMP-OPEN-007 | S07                       | Exact database name and version, store and key shapes, transaction boundaries, validation, backup, recovery offers, migration steps, completion retention, and clear-data behaviour                                 | Resolved | `specs/07-persistence-and-recovery.md`; MR-IMP-DEC-108–126; MR-IF-007 candidate `v1`                                               |
| MR-IMP-OPEN-008 | S08                       | Exact coordinate and unit system, floor and room dimensions, geometry, collision volumes, player controller values, interaction ranges, anchors, camera, focused stations, and no-trap checks                       | Resolved | `specs/08-world-geometry-and-interaction.md`; MR-IMP-DEC-127–148; `MR-IF-008` and `MR-IF-009` S08 parts draft `v1`                 |
| MR-IMP-OPEN-009 | S09                       | Exact action map, focus and pointer-lock states, screen and overlay inventory, component behaviour, responsive layout, controller navigation, settings, and accessibility acceptance                                | Resolved | `specs/09-input-ui-and-accessibility.md`; MR-IMP-DEC-149–172; `MR-IF-009` and `MR-IF-010` candidate `v1`                           |
| MR-IMP-OPEN-010 | S10                       | Exact render pipeline, scene graph, cameras, lighting, materials, animation, resource ownership, placeholder and provenance path, audio graph, cue priority, and cutscene presentation                              | Resolved | `specs/10-rendering-resources-assets-and-audio.md`; MR-IMP-DEC-173–196; `MR-IF-008` and `MR-IF-011`–`MR-IF-013` candidate `v1`     |
| MR-IMP-OPEN-011 | S11                       | Exact compatibility detection, graphics-profile values, CPU/GPU and memory budgets, download budgets, profiling method, diagnostics format, privacy boundary, and response to failed measurements                   | Resolved | `specs/11-browser-performance-and-diagnostics.md`; MR-IMP-DEC-197–220; MR-IF-014 candidate `v1`                                    |
| MR-IMP-OPEN-012 | S12                       | Exact fixture format and expected values for rules, scheduler, persistence, UI, content, accessibility, browser, performance, cutscene, resource, and end-to-end acceptance                                         | Resolved | `specs/12-test-vectors-and-acceptance.md`; MR-IMP-DEC-221–240; `MR-IF-015` candidate `v1`                                          |
| MR-IMP-OPEN-013 | S13                       | Exact future source ownership, worker dependency graph, assignment packets, branch and commit workflow, integration order, review evidence, and contribution records                                                | Resolved | `specs/13-agent-work-orders-and-integration.md`; MR-IMP-DEC-241–260                                                                |
| MR-IMP-OPEN-014 | S14                       | Final contradiction, assumption, traceability, interface-freeze, content-boundary, licence, privacy, accessibility, and gate audit results                                                                          | Resolved | `specification-audit.md`; MR-IMP-DEC-261–287; `MR-S14-FIND-001`–`021`; `MR-IF-001`–`015` frozen `v1`                               |
| MR-IMP-OPEN-015 | Post-S14 workflow         | Replace batch slice implementation with a definite incremental roadmap, per-step approval and Leonardo testing, durable resume state, asset-selection gates, and explicit human/agent attribution                   | Resolved | `development-roadmap.md`; `development-status.md`; `step-acceptance-log.md`; MR-IMP-DEC-288–295                                    |
| MR-IMP-OPEN-016 | Step 4                    | Define the exact caller-supplied facts for `createInitialCampaignState` without changing stored campaign facts, balance, or player-visible meaning                                                                  | Resolved | Approved Step-4 impact packet; `specs/03-domain-model-and-state.md`; MR-IMP-DEC-305; `MR-IF-002 v2`                                |
| MR-IMP-OPEN-017 | Step 4 correction         | Resolve the missing initial inventories, global history order, canonical record order, incomplete invariants, experiment bands, and ending-effect facts found by independent review without inventing S06-owned IDs | Resolved | Approved correction packet; S03–S07; MR-IMP-DEC-306; `MR-IF-002 v3`; `MR-IF-003 v1` shape clarification                            |
| MR-IMP-OPEN-018 | Step 4 prerequisite proof | Store exact typed proof for route and PIIM prerequisites so rules do not infer semantic facts from general-purpose authored IDs; preserve the fixed PIIM target and typed codec-failure boundary                    | Resolved | Leonardo's approved 2026-09-03 correction; S03–S07 and S12–S13; MR-IMP-DEC-307; `MR-IF-002 v4`; superseding work orders            |

| MR-IMP-OPEN-019 | Step 4 toolchain | Installed npm12.0.2 contract | Resolved | MR-IMP-DEC-308; original MR-WO-WP00-009 and MR-CONTRIB-WP00-009 |
| MR-IMP-OPEN-020 | Later fallback content | Exact start window for the combined range/repair replacement | Open | Details below; does not block Step4 structural state |

## Issue protocol

1. Add a stable ID before dependent work continues.
2. Preserve the original question when Leonardo requests clarification or
   answers only part of it.
3. Link each resolved issue to its specification, decision IDs, interfaces,
   and fixtures.
4. Do not convert a measured-later result into a guessed value.
5. Update `status.md` when the active issue group changes.

MR-IMP-OPEN-020 is the current open content question; resolve it before dependent fallback content/scheduler work. Issues001–019 preserve their resolved historical decisions. Step4 correction execution is governed by MR-IMP-DEC-309 and development-status.md, not the superseded v4 worker orders.

## Correction baseline C01–C06

The September Astra correction package is recorded in `../reviews/2026-09-05-astra/baseline-candidate.md`. Leonardo approved the exact reviewed correction package on 2026-09-06. MR-IMP-DEC-309 records the approval and superseded interfaces. Historical B/R/S and accepted Steps 1–3 remain evidence of their original approvals.

Affected contracts: MR-IF-003 v2 action eligibility/cost, recovery and semantic claim support; MR-IF-005 v2 monitoring/story timing; MR-IF-006 v2 content semantics and slice binding; MR-IF-010 v2 displayed costs. These versions are frozen by MR-IMP-DEC-309; their consumers and later proof obligations remain as listed. MR-IF-002 v5 adds scientificFacts and associationSupport under schema 2; MR-IF-007 v2 defines refusal to guess schema-1 facts and preserves recovery. MR-IF-004 deterministic variation is unchanged. The new content version cannot silently reinterpret old saves. Documentation, arithmetic evidence and runtime proof remain separate. Step 4 is unaccepted; later steps remain unapproved.

## C01–C06 approval and remaining evidence

The material decisions in the September finding register are resolved by MR-IMP-DEC-309. Their runtime verification is measured later, not silently marked complete. Step4 v5 code, full campaign journeys, connected-content semantic checks, pressure/tail play quality and asset feasibility remain open implementation/evaluation obligations at their approved gates. No unanswered creative question blocks the approved Step4 amendment.

## MR-IMP-OPEN-019 — npm toolchain amendment (resolved history)

Resolved by Leonardo on 2026-09-04 through MR-IMP-DEC-308: npm12.0.2 replaces npm11.19.0; Node24.20.0 and all dependency pins remain fixed. Preserved work order MR-WO-WP00-009 and contribution MR-CONTRIB-WP00-009 retain this original identifier. The fallback question uses020; the first amendment checkpoint's accidental reuse is superseded, not a change to the npm decision.

## MR-IMP-OPEN-020 — Fallback combined-template start boundary

Open for the later connected-content plan; not a Step-4 structural-state blocker. The approved six-template table in `../12-content-specification.md` supplies full-game windows, but the fallback replacement `MR-FB-EXP-RANGE-REPAIR` has no explicit start window in its replacement paragraph or selected-content list. S06's correction section does not assign one. Do not infer it from either replaced template. Before implementing the fallback scheduler/content, approve and record its exact window, then test the connected expiry mapping. Step 4 stores the expiry result and checks known authored boundaries; a structural pass for a template without an authored boundary does not prove its timing. Read-only Terra source check and primary verification: `../reviews/2026-09-05-astra/step4-amendment.md`.

## MR-IMP-OPEN-021 — Step 5 executable content contract (in discussion)

S06 names condition/effect types and family properties without a complete closed payload/target registry. Its default-full build rejection also needs reconciliation with current mandatory verification commands. Leonardo approved primary candidate preparation on2026-09-06. Candidate records: analysis/step-05-content-contract.md and plans/step-05-content-foundation.md. No worker may invent these shared contracts. Resolve the exact candidate and any literal slice gaps before dependent implementation. This issue is distinct from fallback-window020 and resolved npm019.

Step5 preparation audit: section14 of the candidate records unclosed runtime projections, attachment/command correlations, scientific outcome/reliability mapping, exact selected strings/IDs/counts, and static-versus-runtime validation scope. These are021 closure obligations under the already approved preparation, not a new implementation approval. Node24 explicit `.ts` loading and no-emit typechecking passed in temporary files; no content validator or complete slice catalogue exists.

021 update: the initial independent high-level review is complete. The candidate now separates built/source shapes, corrects scene-completion ownership and Clarified closing, enumerates proposed runtime projections, and includes a concrete laser-result proposal. D1 is approved by Leonardo; D4 is resolved from existing source. D3 and remaining literal/trigger/closure decisions remain open. These newer candidate details have not frozen MR-IF-006 or authorized implementation.
