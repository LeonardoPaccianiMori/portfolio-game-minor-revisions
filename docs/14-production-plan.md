# Production Plan

Status: **B10 documented; implementation approval pending**

## Production boundary

The repository remains in design and evaluation. This plan does not authorize
implementation. After separate implementation-readiness approval, the game
will be developed as an independent repository. Portfolio deployment happens
only after the independent game is complete and a separate portfolio plan is
approved.

The intended capacity is 6–8 hours per week. The estimated path from approved
implementation to a private release candidate is 12–18 months. This is a
capacity estimate, not a delivery promise. The project has no planned paid
budget. Exceptional direct costs have a EUR 150 total ceiling. Do not buy or
commit to a cost above that ceiling without a new explicit Leonardo approval.
This ceiling applies to non-LLM project purchases such as assets, software, or
a new paid external service. Normal LLM subscriptions, token use, token limits,
and limit resets do not use this ceiling. The current design plans no paid game
hosting, server, database, telemetry, or runtime external service.

## Confirmed phase sequence

| Phase | Main output | Gate before next phase |
|---|---|---|
| 0. Design closure | Approved implementation-readiness gate, requirements, and work packages | Leonardo explicitly authorizes implementation |
| 1. Foundation and provenance | Toolchain record, content-data foundation, asset audit, floor proof, save proof | No unverified asset; core technical checks pass |
| 2. Vertical slice | Week-1 20–30-minute slice | Private slice gate in 13-testing-and-evaluation.md passes |
| 3. Minimum-complete fallback | Coherent 90-minute game with stated cut line | Private fallback gate passes |
| 4. Full target | Six-template, three-hour first playthrough | Full content and test matrix pass |
| 5. Private release candidate | Accessibility, performance, licensing, and public-boundary evidence | Release-candidate gate passes |
| 6. Public handoff, if chosen | Remote, source release, and later portfolio integration | Separate Leonardo approvals for each public action |

Phase 1 starts only after implementation approval. It revalidates the exact
S01 Node and package versions, then verifies browser-tested asset codecs and
asset sources. A failed toolchain check reopens the affected S01 contract. It
does not treat a free download, a browser preview, or an unverified generated
asset as acceptable material.

Before the vertical slice, Phase 1 must also test asset feasibility for every
planning role. Record its likely reusable or original source route, licence and
redistribution risk, estimated non-LLM direct cost, estimated original-work
effort, and `feasible`, `needs rework`, or `remove role` result. The four
physical NPCs, five non-lexical vocal palettes, six music stems, modular floor,
and prop families require explicit results. If the complete plan cannot keep
the rights boundary and the EUR 150 ceiling, rework or remove a role before
slice production. Do not treat the fallback as the assumed final product.

## Asset and provenance sequence

Asset sourcing occurs before each asset integration, including a prototype.
The required order is:

1. Search or create a suitable candidate.
2. Verify source, creator, exact licence, public redistribution,
   modification, attribution, and deployed-web rights.
3. Enter the candidate in ASSET_MANIFEST.md.
4. Check its visual role, technical format, texture budget, and public-source
   compatibility.
5. Integrate only after the manifest entry is complete.

No unverified online or generated asset may enter a prototype, branch, or
temporary asset folder. If a suitable reusable asset cannot meet the public
rights boundary, create an original replacement or remove that role.

The historical Unpaid prototypes can be inspected for private creative
inspiration after implementation approval. Do not copy code, assets, names,
or material from them without a separate provenance and licence check.

## Scope controls

The full target remains bounded by:

- one continuous approximately 400-square-metre research floor;
- six experiment templates, seven mandatory scenes, ten optional character
  scenes, twenty primary records, twenty-nine ending modules, twelve
  Institutional Citations, thirty environmental text items, fourteen
  one-time contextual lines, five queue lines, and five exit responses;
- twenty planned reusable prop families, with twenty-four as the hard maximum
  if later sourcing needs substitutions;
- a 90-minute fallback with the exact content cut line in
  12-content-specification.md;
- four physical NPCs, remote Camila with one original 2D portrait, shared
  animation, no full voice acting, and modular epilogues;
- text-only bureaucratic accretion and contextual dialogue that add no NPC,
  prop, room, animation, or audio role;
- local-only IndexedDB storage, no account, server, telemetry, or runtime
  network dependency; and
- public-source-compatible asset provenance and attribution.

The full target must not expand its floor, add an experiment family, add a
mandatory scene, add a new action-cost class, or add a public service without
a new approved design decision.

## Stop, pause, and reframe rules

These rules protect the project from silent scope growth. They do not
automatically cancel it.

1. Do not move to the next production phase until its stated private gate
   passes.
2. If normal capacity stays below 6 hours per week for four consecutive weeks,
   pause the project and record the restart condition before new scope work.
3. If a necessary exceptional cost would exceed the EUR 150 ceiling, stop that
   purchase and request a new decision. Do not substitute an unverified asset
   or service.
4. If the vertical slice has a blocker in core loop clarity, save/recovery,
   accessibility, licence compliance, or the fiction boundary, do not begin
   fallback production. Repair the blocker, reframe the slice, or pause only
   through a new Leonardo decision.
5. If the fallback does not pass its private gate, do not expand to the
   three-hour target. The project can remain a fallback, be reframed, pause,
   or stop after a new Leonardo decision.
6. If the full target cannot meet the approved content, quality, or public
   rights boundary, do not announce or prepare a public release.

## Roles, evidence, and integration

Leonardo remains responsible for creative direction, requirements, review,
private testing, approval, and final decisions. Future agents can implement
bounded work packages only after authorization. Their contribution records
must state the date, model, reasoning effort, requirements, owned files,
instructions, output, tests, review, Leonardo's corrections, and final commit.

Agents are not a substitute for the game. The game must remain coherent,
playable, accessible, and reviewable on its own. Private conversations remain
private. A later public case study can use selected safe evidence after a
separate review.

## Repository, remote, licence, and release boundary

The local repository path is /home/lpm/Desktop/minor-revisions on branch main.
It has no remote. Leonardo alone decides when to create a remote and when to
push it; no agent may create or push a remote on his behalf.

Before any public remote, run a title and brand check for Minor Revisions,
Bellwether University, The Common Archive, Morrow Biotech, and the fictional
journals. Do not copy a real university, journal, company, or game brand.

If Leonardo chooses a public source release later, code uses MIT and
Leonardo's original non-code work uses CC BY 4.0. Third-party material keeps
its own verified licence and attribution. Do not add a public licence file,
remote, deployment configuration, or release date in this phase.

After a future public release, Leonardo plans a 90-day private critical-fix
period. It covers clear critical defects found by Leonardo or Codex. It is not
a public support promise, analytics programme, or ongoing maintenance
commitment. After 90 days, Leonardo can choose maintenance, archival status,
or a new plan.

## Current next action

The current action is a complete specification review and a separate decision
on the implementation-readiness gate. No code, assets, package files,
deployment configuration, remote, or public release work is authorized.
