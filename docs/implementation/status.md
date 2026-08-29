# Implementation Specification Status

Last updated: 2026-08-29

Status: **S00–S02 documented; S03 is next; all implementation gates blocked**

## Current repository state

- Branch: `main`.
- Last completed design baseline before this specification programme:
  `ce9cd52` (`Resolve Minor Revisions documentation review`).
- Remote: none.
- Implementation code: none.
- Package or build configuration: none.
- Production assets: none.
- Public licence file: none.
- Deployment configuration: none.
- Design workshop: B00–B10 documented.
- Independent review decisions: R00–R07 documented.

Git history is the authority for the commit that contains this status file. Do
not insert a future or guessed commit identifier into this document.

## Gate state

| Gate | State | Blocking condition |
|---|---|---|
| Technical specification complete | Blocked | S03–S14 are not documented. |
| Vertical-slice implementation approved | Blocked | Technical specification is incomplete and Leonardo has not given separate approval. |
| Full-game implementation approved | Blocked | The vertical slice does not exist and has not been evaluated. |
| Remote creation or push | Blocked | Leonardo has not authorized a remote. |
| Public release or portfolio deployment | Blocked | No implementation, release evidence, or separate publication approval exists. |

## Current checkpoint

- Current block: **S03 — Domain model and campaign state**.
- Last documented block: **S02 — Module architecture**.
- Required current documents: `roadmap.md`, `decisions.md`, `interfaces.md`,
  and `open-issues.md`.
- Primary existing design input: `../07-systems-and-balance.md`,
  `../11-technical-architecture.md`, the frozen S01 toolchain contract, and the
  approved S02 module-architecture contract.
- Current open issue group: `MR-IMP-OPEN-003`.
- Next action: discuss and approve the exact S03 domain types, `CampaignState`,
  invariants, identifiers, units, defaults, and serialization boundary.
- Prohibited next action: create package files, source directories, code,
  assets, or deployment files.

## Durable progress summary

| Work group | State | Result |
|---|---|---|
| Creative and game design | Complete for the current baseline | B00–B10 and numbered design documents are authoritative. |
| Independent design review | Complete for the current baseline | R00–R07 are resolved and documented. |
| Specification governance | Documented | Authority, gates, blocks, decision classes, interface lifecycle, and issue protocol are recorded. |
| Technical specification | In progress | S01–S02 are documented; S03 is next. `MR-IF-001` is candidate `v1`, not frozen. |
| Vertical slice | Not authorized | No code exists. |
| Fallback and full game | Not authorized | They follow slice evaluation and a separate approval. |

## Session-resume procedure

For any non-trivial specification session:

1. Read repository `AGENTS.md` and `README.md`.
2. Read `../00-design-index.md` and `../decision-log.md`.
3. Read this file and `roadmap.md`.
4. Read `decisions.md`, `interfaces.md`, and `open-issues.md`.
5. Resume the current block shown above unless Leonardo changes the order.
6. Read only the existing design and specification files needed for that
   block.
7. Do not infer completion from conversation memory or an agent summary.

## State-update rule

Every approved specification commit must update this file. It must name the
current block, the last documented block, gate state, open issue group, exact
next action, and any repository fact that changed. If those fields do not
agree with the roadmap, the block is not complete.
