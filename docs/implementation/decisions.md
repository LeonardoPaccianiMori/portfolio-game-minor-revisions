# Implementation Specification Decision Register

Status: **current through S03**

This register records approved process and technical decisions for the
implementation-specification programme. It does not replace the detailed
specification files or the creative decision log.

## Status values

- `confirmed`: Leonardo approved the decision.
- `superseded`: a later confirmed decision replaced it.
- `measured later`: the method and boundary are decided, but the result cannot
  exist before execution.
- `open`: the item belongs in `open-issues.md` and cannot control work.

## Decisions

| ID | Date | Decision | Status | Authority or effect |
|---|---|---|---|---|
| MR-IMP-DEC-001 | 2026-08-29 | Preserve the current numbered design corpus and create a separate implementation-specification corpus. | Confirmed | Technical text cannot replace creative authority. |
| MR-IMP-DEC-002 | 2026-08-29 | Complete all known implementation decisions for the full game before any game code is written. | Confirmed | S01–S14 precede implementation. |
| MR-IMP-DEC-003 | 2026-08-29 | After the technical baseline is approved, implement and evaluate the vertical slice before fallback or full-game production. | Confirmed | Establishes the three-gate sequence. |
| MR-IMP-DEC-004 | 2026-08-29 | Revisit the frozen baseline after slice evidence and change it only through explicit impact review and approval. | Confirmed | Slice evidence can rebaseline later work without silently rewriting history. |
| MR-IMP-DEC-005 | 2026-08-29 | Workers cannot make autonomous creative, player-visible, shared-contract, dependency, schema, balance, accessibility, asset, or acceptance decisions. | Confirmed | A missing or conflicting material instruction stops work. |
| MR-IMP-DEC-006 | 2026-08-29 | Permit bounded discretion only for private and reversible details that preserve all observable behaviour and frozen contracts. | Confirmed | Avoids treating harmless local code structure as a design decision. |
| MR-IMP-DEC-007 | 2026-08-29 | Use the interface lifecycle `not started`, `draft`, `candidate`, `frozen`, and `superseded`. | Confirmed | A frozen interface needs a version, owner, consumers, fixtures, and freeze commit. |
| MR-IMP-DEC-008 | 2026-08-29 | Treat measured performance, browser behaviour, build size, and play quality as future facts. Decide their method, target, and response rule before code. | Confirmed | A result is not invented to close the technical specification. |
| MR-IMP-DEC-009 | 2026-08-29 | Use stable roadmap, status, decision, interface, and open-issue documents as the durable session state. | Confirmed | Conversation compaction cannot be the only progress record. |
| MR-IMP-DEC-010 | 2026-08-29 | Keep all code, package, asset, remote, release, and deployment gates blocked during technical specification. | Confirmed | This programme is design work, not implementation authorization. |
| MR-IMP-DEC-011 | 2026-08-29 | Reference existing design sections, requirement IDs, content IDs, and text keys instead of copying the full creative corpus into technical prose. | Confirmed | Prevents two competing sources and reduces drift. |
| MR-IMP-DEC-012 | 2026-08-29 | Build the foundation in dependency order and allow parallel implementation only for non-overlapping ownership against frozen shared interfaces. | Confirmed | Governs later worker assignments. |
| MR-IMP-DEC-013 | 2026-08-29 | Freeze exact tool and package versions in S01, before code, and revalidate them before Gate 2. | Confirmed | Supersedes the earlier version-selection timing; failed revalidation reopens the affected S01 contract. |
| MR-IMP-DEC-014 | 2026-08-29 | Use Node 24.20.0 LTS, npm 11.19.0, TypeScript 6.0.3, Vite 8.2.2, Three.js 0.185.1, idb 8.0.3, and Zod 4.5.2. | Confirmed | Establishes the exact environment and shipped dependency baseline. |
| MR-IMP-DEC-015 | 2026-08-29 | Use the exact Vitest, coverage, Playwright, ESLint, TypeScript ESLint, Prettier, Node-type, cross-environment, and globals versions in the frozen S01 specification. | Confirmed | Establishes one compatible development-only tool graph. |
| MR-IMP-DEC-016 | 2026-08-29 | Pin all direct packages exactly, commit the npm lockfile, require the exact Node and npm versions, and prohibit automatic dependency-update bots. | Confirmed | Makes installs reproducible and updates deliberate. |
| MR-IMP-DEC-017 | 2026-08-29 | Keep one self-contained root npm project and every project-owned input and output under `/home/lpm/Desktop/minor-revisions`. | Confirmed | Prohibits nested projects, external local inputs, and project output outside the repository. |
| MR-IMP-DEC-018 | 2026-08-29 | Use the exact planned tree, configuration inventory, strict ES2022 checks, local-only Vite settings, formatting contract, and portable command graph in S01. | Confirmed | Workers cannot invent setup, scripts, locations, or configuration. |
| MR-IMP-DEC-019 | 2026-08-29 | Use no Docker, project secret, `.env` input, editor dependency, runtime external service, or non-loopback development server. | Confirmed | Keeps the hobby workflow local, inspectable, and self-contained. |
| MR-IMP-DEC-020 | 2026-08-29 | Keep browser and coverage evidence private and local, install Playwright browsers inside project dependencies, and prohibit personal or save data in reports. | Confirmed | Preserves the local evidence and privacy boundary. |
| MR-IMP-DEC-021 | 2026-08-29 | Explain specialized terms and commands in plain language because Leonardo is a hobbyist, not a software engineer or game developer, and has no prior Three.js coding experience. | Confirmed | Shapes documentation and handoffs without reducing quality requirements. |
| MR-IMP-DEC-022 | 2026-08-29 | Treat actual installation, command, build, browser, coverage, and performance results as future evidence; reopen S01 after a failed Gate-2 revalidation instead of using an undocumented workaround. | Measured later | Defines the method and response without inventing execution results. |
| MR-IMP-DEC-023 | 2026-08-29 | Separate pure rules from browser presentation, use one application coordinator, and create modules through explicit bootstrap factories with limited functions and no hidden global registry. | Confirmed | Establishes the S02 architectural foundation. |
| MR-IMP-DEC-024 | 2026-08-29 | Use the fourteen named runtime modules, one public `index.ts` per module, tests under `tests/`, no private cross-module imports, and no broad shared, utility, service, or manager folder. | Confirmed | Fixes the runtime inventory and public entrances. |
| MR-IMP-DEC-025 | 2026-08-29 | Enforce the one-way rules, content, application, browser-adapter, and bootstrap import layers; forbid circular and adapter-to-adapter imports; keep each browser object with its named owner; and require an architecture check. | Confirmed | Prevents hidden coupling and misplaced browser state. |
| MR-IMP-DEC-026 | 2026-08-29 | Make application the only live `CampaignState` owner, require rules to return a new state, give persistence validated snapshots, and give presentation modules read-only projections. | Confirmed | Browser failures and presentation code cannot mutate campaign truth. |
| MR-IMP-DEC-027 | 2026-08-29 | Use twelve minimal named application ports, pass `ValidatedContent` separately, import pure rules directly, and prohibit a general event bus, service getter, or resource port. | Confirmed | Defines the complete dependency boundary. |
| MR-IMP-DEC-028 | 2026-08-29 | Export `createApplication` and `bootstrapApplication` with the approved `ApplicationController`, closed request family, limited `BootstrapHandle`, typed startup result, and least-access callback surfaces. | Confirmed | Defines the public runtime control contract without exposing state. |
| MR-IMP-DEC-029 | 2026-08-29 | Use the approved lifecycle states, startup order, application-long start/stop methods, campaign open/close contract, reverse partial-failure cleanup, idempotent shutdown, and new-instance-only restart. | Confirmed | Fixes service and campaign lifetime behaviour. |
| MR-IMP-DEC-030 | 2026-08-29 | Distinguish rejected actions, recoverable failures, and fatal failures; catch bootstrap, request, port, frame, and uncaught browser errors at named boundaries; and disable campaign input when integrity is uncertain. | Confirmed | Fixes error ownership, escalation, and unchanged-state guarantees. |
| MR-IMP-DEC-031 | 2026-08-29 | Replace the central-resource-manager shorthand with specialist ownership: rendering owns Three.js resources, audio owns audio resources, application controls preparation order, and no general shared resource service exists. | Confirmed | Supersedes only the earlier central-resource-manager wording and preserves all player-visible and asset rules. |
| MR-IMP-DEC-032 | 2026-08-29 | Process campaign-changing requests in one ordered queue, keep movement and visual frames outside it, complete required asynchronous work before success, and forbid later silent campaign mutation. | Confirmed | Fixes concurrency and completion meaning. |
| MR-IMP-DEC-033 | 2026-08-29 | Use one timing-owned visual loop with the approved input, cutscene or focus, player, world, interaction, audio and UI, then rendering order; do not use hidden-tab time for catch-up or campaign progress. | Confirmed | Fixes frame ownership and ordering. |
| MR-IMP-DEC-034 | 2026-08-29 | Use the exact minimal method sets for the twelve public ports in the S02 specification. | Confirmed | Later blocks can define connected data without expanding module authority silently. |
| MR-IMP-DEC-035 | 2026-08-29 | Provide plain test fakes for every port and require the ten S02 startup, cleanup, request, campaign reset, fatal, frame, and import scenarios. | Confirmed | Establishes architecture acceptance without claiming that tests exist. |
| MR-IMP-DEC-036 | 2026-08-29 | Move `MR-IF-001` to candidate `v1`, owned by application for the controller and bootstrap for the browser entry; defer freeze until connected S12 fixtures and the S14 consistency audit. | Confirmed | Candidate status does not authorize implementation. |
| MR-IMP-DEC-037 | 2026-08-29 | Use one versioned plain-data `CampaignState` with exactly ten required top-level sections; store campaign facts and calculate display labels, bands, availability, and eligibility. | Confirmed | Excludes browser, presentation, settings, archive, and cross-campaign state. |
| MR-IMP-DEC-038 | 2026-08-29 | Store the exact metadata, calendar, campaign-value, relationship, protagonist, and revision fields and approved initial values in the S03 specification. | Confirmed | Includes Standard energy 4, Supported energy 5, evidence 3, Elena confidence 45, integrity 100, and the five trust values. |
| MR-IMP-DEC-039 | 2026-08-29 | Use strict stable campaign-local ID families, matching record keys and internal IDs, a secure random lowercase UUID campaign ID, an unsigned secure random campaign seed, and no reuse after terminal state. | Confirmed | Makes every referenced fact traceable without personal data in identifiers. |
| MR-IMP-DEC-040 | 2026-08-29 | Record every real campaign change with revision, sequence, source, field, previous value, and new value; keep histories permanent, ordered, and continuous. | Confirmed | One successful operation increments revision once; rejected and no-change operations do not. |
| MR-IMP-DEC-041 | 2026-08-29 | Store experiment runs, active IDs, raw records, evidence cards, stop logs, equipment, and preparation facts under the exact S03 stage, source, and consistency rules. | Confirmed | Analysed and stopped runs have mutually exclusive permanent outputs. |
| MR-IMP-DEC-042 | 2026-08-29 | Store committed manuscript versions only, with the exact board capacity, immutable snapshots, task, review, preprint, journal, PIIM, paper, authorship, reading, omission, and once-only effect states. | Confirmed | Earlier snapshots are history, not free undo. |
| MR-IMP-DEC-043 | 2026-08-29 | Store exact narrative, relationship, scheduler, semantic world, content-history, route, and conclusion facts with strict ordering and cross-section invariants. | Confirmed | No Three.js geometry, physical Camila placement, browser time progression, or backward conclusion progress is allowed. |
| MR-IMP-DEC-044 | 2026-08-29 | Accept protagonist names of 1–64 visible Unicode characters after NFC normalization, without leading or trailing whitespace or control characters; use the three fixed pronoun sets. | Confirmed | Leonardo increased the proposed technical limit from 32 to 64 before documentation. |
| MR-IMP-DEC-045 | 2026-08-29 | Require all numbers to be exact safe integers and apply the exact S03 limits for revisions, seed, calendar, values, trust, IDs, and version strings. | Confirmed | Rejects fractions, negative zero, non-finite values, overflow, and out-of-range domain facts. |
| MR-IMP-DEC-046 | 2026-08-29 | Validate strictly after creation, transition, load or migration, and before save or state replacement; reject unknown, missing, duplicate, invalid, inconsistent, or out-of-range data and return a new checked copy. | Confirmed | No silent repair, partial campaign, or retained input reference is permitted. |
| MR-IMP-DEC-047 | 2026-08-29 | Use two connected validation stages: rules validates campaign structure and internal references; application checks content IDs, content version, and build profile against separate `ValidatedContent` before activation. | Confirmed | Preserves the S02 state/content boundary and defers authored-content values to S06. |
| MR-IMP-DEC-048 | 2026-08-29 | Serialize validated campaign state as compact canonical UTF-8 JSON with fixed field order, sorted ID-record keys, meaningful list order, safe Unicode, exact round trips, and sanitized typed failures. | Confirmed | The same campaign facts produce the same text. |
| MR-IMP-DEC-049 | 2026-08-29 | Require complete Standard initial fixture `MR-S03-FIX-001`, one Supported difference vector, five basic rejection groups, connected invalid variants, and transition-pair permanence fixtures. | Confirmed | S12 will supply their executable format; no fixture file or test result is claimed now. |
| MR-IMP-DEC-050 | 2026-08-29 | Move `MR-IF-002` to candidate `v1`, owned by rules, with complete-copy creation, validation, parse, and serialization operations; defer freeze until S06, S07, S12, and S14 evidence exists. | Confirmed | Candidate status does not authorize implementation. |

## Entry rule

Add an entry only after Leonardo approves it. When a later decision replaces
one, preserve the old row as `superseded` and link the new ID. Detailed
behaviour belongs in the applicable specification file.
