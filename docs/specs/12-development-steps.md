# C2 — The Ordered Development Step List

Status: **Documented — approved by Leonardo on 2026-09-10 (Block C2); amended
2026-09-13 with Leonardo's approval to insert STEP-010 (experiments and
evidence flow), shifting every later step by one.**

## How to read this list

- Dependencies are in parentheses.
- Each step has its own exact plan and approval. This list does not authorize
  any step.
- Gates are checkpoints, not steps.
- Legacy v1 step records remain in Git history only.

## Phase 1 — Foundation

| Step | Deliverable                                                                                                           | Depends on |
| ---- | --------------------------------------------------------------------------------------------------------------------- | ---------: |
| 1    | Toolchain and repository foundation: exact pins, strict TypeScript, lint/format, Vitest, Playwright, Vite, start page |          — |
| 2    | Application shell: coordinator, lifecycle, request queue, frame loop, WebGL2 check, safe error screen                 |          1 |
| 3    | Rules skeleton: campaign state, commands, atomic results, seeded PRNG, unit tests                                     |          2 |
| 4    | Persistence skeleton: database, save/load/validate, settings, clear data                                              |          3 |

## Phase 2 — Core rules and the week loop

| Step | Deliverable                                                                                                | Depends on |
| ---- | ---------------------------------------------------------------------------------------------------------- | ---------: |
| 5    | Week loop and resources: 12 turns × 3 actions, energy, standing, integrity, relationships, rest, crash     |          4 |
| 6    | Paper track: requirements, framing, evidence, stale rules                                                  |          5 |
| 7    | Fellowship track and linkage: requirements, answers, deadline, shared evidence, overlap                    |          6 |
| 8    | PI system: add/reframe/revert requests, meetings, complicity actions and consequences                      |          7 |
| 9    | Authored events and deadlines: funding review, rent, contamination, fellowship deadline, contract decision |          8 |
| 10   | Experiments and evidence flow: assignments, results, write-up, analysis, request beats                     |          9 |
| 11   | Review and panel set pieces: reviewer chorus, fellowship panel, outcomes                                   |         10 |
| 12   | Ending resolver: four endings, personnel file, archive                                                     |         11 |

## Phase 3 — World and interaction

| Step | Deliverable                                                             | Depends on |
| ---- | ----------------------------------------------------------------------- | ---------: |
| 13   | Floor: six spaces, static collision, no trapping, recovery anchors      |          4 |
| 14   | Movement and camera: first-person, keyboard/mouse/controller, remapping |         13 |
| 15   | Interaction: targeting, highlight, prompts, station actions             |         14 |
| 16   | Desk board UI: two tracks, resources, requests, costed actions          |     11, 15 |
| 17   | Room states and act changes: accretion and decline                      |         16 |
| 18   | Short scenes: camera holds, skip-safe, control returns                  |         17 |

**Gate — First playable** (after step 18): one complete week loop in the 3D
department.

## Phase 4 — Content

| Step | Deliverable                                                                      | Depends on |
| ---- | -------------------------------------------------------------------------------- | ---------: |
| 19   | Content schema and validator: IDs, references, counts, word budget, safety flags |          7 |
| 20   | Act I content: opening, tutorial, scenes, messages, notices                      |     18, 19 |

**Gate — Slice** (after step 20): Act I complete and Leonardo's 15–20-minute
play review with temporary assets.

| Step | Deliverable                                                       | Depends on |
| ---- | ----------------------------------------------------------------- | ---------: |
| 21   | Act II content: crisis, conference, rent, fellowship deadline     |         20 |
| 22   | Act III content: spiral, panel, review, final choice              |         21 |
| 23   | Endings and personnel-file content                                |         22 |
| 24   | Content completeness: all counts validated, no incomplete markers |         23 |

**Gate — Content complete** (after step 24).

## Phase 5 — Presentation and assets

| Step | Deliverable                                                             | Depends on |
| ---- | ----------------------------------------------------------------------- | ---------: |
| 25   | Visual language: palette, flat materials, act lighting, pressure accent |         18 |
| 26   | Asset research and approval: all roles, licences, manifest records      |         25 |
| 27   | Integrate environment and props                                         |         26 |
| 28   | Integrate characters and shared animation                               |         27 |
| 29   | Interface visual polish: fonts, icons, contrast                         |         28 |
| 30   | Audio: ambience beds, cue classes, synth motif, captions                |         29 |
| 31   | Replace remaining placeholders; finalize provenance and credits         |         30 |

## Phase 6 — Integration and polish

| Step | Deliverable                                                                                     | Depends on |
| ---- | ----------------------------------------------------------------------------------------------- | ---------: |
| 32   | Accessibility pass: settings, Interaction Assist, keyboard-only, contrast, motion, captions     |         31 |
| 33   | Performance: presets, profiling on the reference class, budgets, long sessions                  |         32 |
| 34   | Browser compatibility and diagnostics: compatibility screen, error screen, cross-browser checks |         33 |
| 35   | Persistence hardening: migration, corruption, stale tabs, recovery tests                        |         34 |
| 36   | Full content and humour pass: per-act joke density, comprehension probe, content note           |         35 |

**Gate — Feature complete** (after step 36).

## Phase 7 — Acceptance

| Step | Deliverable                                                                | Depends on |
| ---- | -------------------------------------------------------------------------- | ---------: |
| 37   | Private full playthrough and corrections                                   |         36 |
| 38   | Final acceptance: Leonardo's 60-minute playthrough and explicit acceptance |         37 |

## Change rule

- Merging or splitting a step requires Leonardo's approval and a roadmap
  update.
- Evidence can add a repair or a missing intermediate step through the same
  rule.
