# Implementation Specification Decision Register

Status: **current through S01**

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

## Entry rule

Add an entry only after Leonardo approves it. When a later decision replaces
one, preserve the old row as `superseded` and link the new ID. Detailed
behaviour belongs in the applicable specification file.
