# Implementation Specification Roadmap

Status: **programme approved; S00 governance documented; S01 is next; no code authorized**

## Purpose

This roadmap controls the work that converts the approved game design into an
exact technical specification for implementation agents. It exists so that a
new session can recover the complete state of the work without depending on
conversation history.

The current numbered design documents remain intact. This programme adds a
separate technical layer. It does not replace, shorten, or reinterpret the
creative design.

## Required outcome

Before any game code is written, the repository must contain a complete
technical baseline for the full game. The baseline must specify all known
implementation decisions that can affect behaviour, integration, testing,
accessibility, performance, assets, or future maintenance.

An implementation worker must not decide:

- player-visible behaviour, text, tone, rules, values, or outcomes;
- architecture boundaries, shared interfaces, schemas, dependencies, or data
  ownership;
- world geometry, interaction behaviour, UI flow, accessibility meaning, save
  behaviour, or failure handling;
- asset policy, browser boundary, performance target, or acceptance criteria;
  or
- a response to a conflict or missing specification.

A worker can use bounded discretion for private, reversible details such as a
file-local helper name, a pure internal algorithm that preserves the frozen
contract, or test utility structure. Such discretion cannot change observable
behaviour, a shared interface, a dependency, a schema, or an approved limit.

## Authority order

1. Leonardo's explicit current instruction.
2. Approved numbered design documents for creative intent, game rules, and
   player-visible meaning.
3. Frozen documents under `docs/implementation/specs/` for exact technical
   contracts.
4. `docs/15-implementation-contract.md` and the two decision logs for
   traceability, ownership, and approval history.
5. Tests and code, which must conform to every higher source.

An implementation specification cannot silently change a design decision. A
conflict stops the affected work and enters `open-issues.md`.

## Decision classes

| Class | Meaning | Change rule |
|---|---|---|
| Locked design | Creative intent, game behaviour, content, balance, visual identity, accessibility meaning, and failure meaning | Change only after Leonardo approves an update to the authoritative design document. |
| Locked technical contract | Shared interface, schema, dependency, data owner, state transition, algorithm with observable effects, coordinate contract, or acceptance fixture | Change only through impact review, updated consumers and tests, and Leonardo's approval. |
| Bounded implementation discretion | Private and reversible implementation detail with no contract or observable effect | A worker may choose it and must record a material choice in its contribution record. |
| Measured fact | Performance, browser behaviour, build size, play quality, or another result that cannot exist before execution | Define the method, target, and response rule now; record the result only after measurement. |
| Open issue | Missing, conflicting, or undecided material information | Stop dependent work and resolve the registered issue. |

## Programme sequence and gates

### Phase A — Complete technical specification

Complete S00 through S14. Do not create code, package configuration,
production assets, or deployment configuration. The output is a frozen
technical baseline for the full game, with exact vertical-slice coverage and
full-game interface coverage.

### Gate 1 — Technical specification complete

Leonardo can approve this gate only when:

- every S00–S14 block is documented;
- no blocking open issue remains;
- every shared interface is frozen or deliberately classified as a measured
  post-build fact with a complete test and response contract;
- every technical contract links to design requirements and acceptance
  fixtures;
- full-game, fallback, and vertical-slice boundaries agree;
- authority, ownership, asset, accessibility, privacy, and performance checks
  pass; and
- the complete specification receives a final contradiction and assumption
  audit.

Approval of Gate 1 confirms the technical baseline. It does not authorize
code.

### Gate 2 — Vertical-slice implementation approved

After Gate 1, Leonardo can separately authorize only the foundation and the
20–30-minute Week-1 vertical slice. Work must follow frozen interfaces and
scope-limited agent assignments.

### Phase B — Build and evaluate the vertical slice

Build the foundation in dependency order. Parallel work starts only after the
shared interfaces used by those workers are frozen and ownership does not
overlap. Integrate and run the approved private slice evaluation.

### Phase C — Evidence-led specification review

Compare measured slice evidence with the frozen baseline. Confirm unaffected
contracts. Any change must state its evidence, affected interfaces, consumers,
migration needs, tests, and approval. Do not treat an agent preference as
evidence.

### Gate 3 — Full-game implementation approved

After the slice review, Leonardo can authorize the fallback and full-game
implementation against the revised frozen baseline. The existing fallback and
full-game evaluation gates still apply during production.

## Specification blocks

| Block | Subject | Main output | Depends on | Status |
|---|---|---|---|---|
| S00 | Governance and durable state | Roadmap, status, decisions, interfaces, open issues, authority, and gates | B00–B10 and R00–R07 | Documented |
| S01 | Toolchain and repository | Exact runtime and development versions, package policy, scripts, directories, configuration, and environment rules | S00 | Not started; next |
| S02 | Module architecture | Exact module graph, dependency directions, ownership, public interfaces, lifecycle, and error boundaries | S01 | Not started |
| S03 | Domain model and campaign state | Exact types, state shape, invariants, identifiers, serialization boundary, and derived versus stored values | S02 | Not started |
| S04 | Commands, rules, and determinism | Command and effect unions, validation order, rejection rules, PRNG contract, rule algorithms, and truth tables | S03 | Not started |
| S05 | Calendar, scheduler, events, and cutscenes | Ordering, safe points, scene queue, expiry, interruption, skip, resume, and time-transition state machines | S03–S04 | Not started |
| S06 | Content data and build profiles | File split, schemas, references, English strings, full/fallback/slice selection, validation, and migration rules | S03–S05 | Not started |
| S07 | Persistence and recovery | Database version, stores, keys, transactions, validation, backup, migration, corruption, completion, and clear-data algorithms | S03–S06 | Not started |
| S08 | World geometry and interaction | Coordinate system, floor dimensions, room geometry, collision, player controller, anchors, raycasts, stations, and camera contracts | S02–S03 | Not started |
| S09 | Input, UI, and accessibility | Action map, focus and pointer-lock state, every screen and overlay, UI view model, responsive behaviour, and accessibility acceptance | S02–S06 and S08 | Not started |
| S10 | Rendering, resources, assets, and audio | Render pipeline, scene graph, lighting, material and animation rules, resource lifecycle, placeholder and provenance policy, audio graph, and cue behaviour | S01–S03 and S08–S09 | Not started |
| S11 | Browser, performance, and diagnostics | Compatibility checks, graphics profiles, budgets, profiling method, diagnostics, failure display, and measurement response rules | S01–S03 and S08–S10 | Not started |
| S12 | Test vectors and acceptance matrix | Executable-format fixtures for valid and rejected paths, cross-module flows, traceability, coverage, and manual checks | S03–S11 | Not started |
| S13 | Agent work orders and integration | Final file ownership, dependency graph, worker briefs, branch and commit rules, contribution records, review, and integration sequence | S01–S12 | Not started |
| S14 | Consistency audit and gate packet | Complete inventory, contradiction and assumption audit, interface freeze record, open-issue result, and Gate-1 approval packet | S00–S13 | Not started |

## Planned specification files

Each block S01–S13 creates one authoritative file under
`docs/implementation/specs/`:

1. `01-toolchain-and-repository.md`
2. `02-module-architecture.md`
3. `03-domain-model-and-state.md`
4. `04-commands-rules-and-determinism.md`
5. `05-calendar-scheduler-events-and-cutscenes.md`
6. `06-content-data-and-build-profiles.md`
7. `07-persistence-and-recovery.md`
8. `08-world-geometry-and-interaction.md`
9. `09-input-ui-and-accessibility.md`
10. `10-rendering-resources-assets-and-audio.md`
11. `11-browser-performance-and-diagnostics.md`
12. `12-test-vectors-and-acceptance.md`
13. `13-agent-work-orders-and-integration.md`

S14 writes `docs/implementation/specification-audit.md`. A block can also add
a narrowly scoped diagram or fixture document when the main file would become
unclear. It must register that artifact in `status.md`.

## Block workflow

1. Read `status.md`, this roadmap, `decisions.md`, `interfaces.md`, and
   `open-issues.md`.
2. Read only the design and earlier specification documents required for the
   current block.
3. Inspect related contracts before asking Leonardo questions.
4. Ask small numbered groups. Preserve every unanswered item.
5. Present one complete block synthesis with confirmed, proposed, open, and
   measured-later items separated.
6. Wait for Leonardo's explicit approval.
7. Write the approved specification and update every control document.
8. Validate links, identifiers, interfaces, traceability, contradictions,
   scope, and the complete diff.
9. Commit the block atomically, then advance the current-block pointer.

## Specification quality rule

A specification is not complete because it uses technical language. Each
material contract must state:

- purpose and authority;
- exact inputs and outputs;
- types, identifiers, units, and valid ranges;
- invariants and ownership;
- order of operations and state transitions;
- rejection, error, recovery, and unchanged-state behaviour;
- side effects and observable presentation effects;
- consumers and dependencies;
- linked design requirements and content IDs;
- exact acceptance fixtures; and
- whether it is slice-proven, cross-cutting but unproved, or deferred to a
  defined measurement.

Do not copy the full creative design or English catalogue into this corpus.
Reference stable document sections, requirement IDs, content IDs, and text
keys. This prevents drift between two prose sources.

## Current next action

Begin S01. Decide the exact toolchain, package and dependency versions,
repository tree, scripts, configuration files, environment rules, supported
development commands, and version-update policy. No files from the planned
runtime tree can be created during S01.
