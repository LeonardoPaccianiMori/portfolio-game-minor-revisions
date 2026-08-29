# Implementation Specification Decision Register

Status: **current through S00**

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

## Entry rule

Add an entry only after Leonardo approves it. When a later decision replaces
one, preserve the old row as `superseded` and link the new ID. Detailed
behaviour belongs in the applicable specification file.
