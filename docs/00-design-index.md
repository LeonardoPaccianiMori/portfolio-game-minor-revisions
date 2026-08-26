# Design Index and Readiness Gate

Status: **seeded; not implementation-ready**

This index is the completeness contract for *Minor Revisions*. `Seeded` means
the document contains all decisions confirmed as of 2026-08-26 plus explicit
gaps. It does not mean that the domain is finished.

| Document | Domain | Status | Principal unresolved work |
|---|---|---|---|
| `01-vision-and-pillars.md` | Thesis, tone, scope | Seeded | Audience, detailed non-goals, success criteria |
| `02-player-experience-and-loop.md` | Moment-to-moment play | Seeded | Exact interactions, time model, tuning |
| `03-narrative-and-campaign.md` | Five-act story | Seeded | Beat sheet, event order, branching details |
| `04-science-and-experiments.md` | Fictional science | Seeded | Origin, mechanism, controls, exact experiment chain |
| `05-characters-and-dialogue.md` | Cast and voice | Seeded | Names, identities, arcs, dialogue system |
| `06-world-and-level-design.md` | Institute floor | Seeded | Layout, traversal, unlocks, room specifications |
| `07-systems-and-balance.md` | State and rules | Seeded | Formulas, visibility, thresholds, balance |
| `08-endings-and-state-matrix.md` | Outcomes | Seeded | Unlock rules, combinations, epilogue content |
| `09-art-audio-and-assets.md` | Presentation | Seeded | Audio direction, budgets, concrete asset inventory |
| `10-ui-ux-accessibility.md` | Interface and access | Seeded | Control scheme, HUD, accessibility baseline |
| `11-technical-architecture.md` | Runtime design | Seeded | Stack, modules, save schema, performance budget |
| `12-content-specification.md` | Content inventory | Seeded | Exact counts and all authored content |
| `13-testing-and-evaluation.md` | Quality evidence | Seeded | Targets, playtest protocol, acceptance thresholds |
| `14-production-plan.md` | Delivery strategy | Seeded | Time/cost budget, milestones, stop criteria |
| `15-implementation-contract.md` | Agent handoff | Seeded | Requirement IDs and approved work packages |
| `decision-log.md` | Approved decisions | Current | Continue for every material choice |
| `glossary.md` | Shared terminology | Seeded | Expand as systems receive final names |
| `../assets/ASSET_MANIFEST.md` | Asset provenance | Ready for use | No assets selected yet |

## Discussion roadmap

This roadmap is the durable progress ledger for the design workshop. It must
be consulted at the start of every design session and updated whenever a block
is approved or documented. The numbered domain documents remain authoritative
for the decisions themselves; this roadmap records coverage, dependencies,
status, and the next place to resume.

### Status definitions

- **Not started:** confirmed seed decisions may exist, but the block's focused
  workshop has not begun.
- **In discussion:** questions are actively being explored and no complete
  synthesis has been presented.
- **Awaiting approval:** a complete decision synthesis has been presented to
  Leonardo but has not yet received explicit approval.
- **Approved:** Leonardo approved the synthesis, but its documentation and
  validation commit are not yet complete.
- **Documented:** approved decisions are written into every affected domain
  document, remaining gaps are explicit, contradictions have been checked, and
  the corresponding commit exists. Only this status completes a block.

### Current checkpoint

- Current block: **B00 — Vision, audience, success, and boundaries**
- Last documented block: **none**
- Next action: resolve the remaining B00 success criteria, content boundaries,
  content rating, and treatment of sensitive themes.
- Implementation gate: **blocked**; completing discussion blocks does not by
  itself authorize implementation.

### B00 — Vision, audience, success, and boundaries

- **Status:** In discussion.
- **Depends on:** No earlier block.
- **Primary documents:** `01-vision-and-pillars.md`,
  `13-testing-and-evaluation.md`, and `14-production-plan.md`.
- **Confirmed so far:** the primary audience is people who enjoy narrative
  exploration and systemic satire, with no academic or scientific knowledge
  required; academics can find an additional layer of recognition, and
  portfolio reviewers are a secondary audience. The emotional arc moves from
  amusing recognition through pressure and uncomfortable complicity to a
  bitter but human ending. The game must not become nihilistic. Small acts of
  solidarity remain meaningful, and leaving academia is not total defeat. The
  game fiction does not refer to its AI-assisted production. Agent direction is
  shown through repository evidence, requirement traceability, evaluation, and
  a later case study.
- **Must still resolve:** measurable experience-success criteria; content
  rating; handling of burnout, exploitation, mental-health, and workplace
  themes; detailed creative and simulation non-goals; and the exact public
  evidence and attribution model for agent contributions.
- **Complete when:** the game has an approved audience, experience promise,
  safety boundary, non-goal set, and qualitative success definition that later
  blocks can test against.

### B01 — Fictional science and experiment progression

- **Status:** Not started.
- **Depends on:** B00.
- **Primary documents:** `04-science-and-experiments.md`, with consequences for
  `02-player-experience-and-loop.md`, `03-narrative-and-campaign.md`, and
  `07-systems-and-balance.md`.
- **Must resolve:** organoid origin and composition; fictional recovery
  mechanism; pathways, markers, controls, sham and batch design; experiment
  families, order, duration, dependencies, failure modes, and readable outputs;
  paper claims at different evidence strengths; and fictional scientific names.
- **Complete when:** the whole experiment chain is scientifically legible,
  narratively useful, safe from actionable wet-lab detail, and specific enough
  to design gameplay and reviewer requests.

### B02 — Institution, protagonist, and characters

- **Status:** Not started.
- **Depends on:** B00 and the scientific vocabulary established in B01.
- **Primary documents:** `03-narrative-and-campaign.md`,
  `05-characters-and-dialogue.md`, `06-world-and-level-design.md`, and
  `glossary.md`.
- **Must resolve:** fictional institution, laboratory, journals, preprint
  service, company, and institutional terminology; protagonist narrative voice
  and dialogue grammar; character names, identities, appearances, voices, and
  silhouettes; supporting-character motivations and arcs; relationships,
  conflicts, reconciliation, and betrayal possibilities; schedules; and whether
  any remote role appears physically.
- **Complete when:** the fictional world and recurring cast can support every
  campaign act without reproducing real people or institutions literally.

### B03 — Campaign beat sheet and branching

- **Status:** Not started.
- **Depends on:** B01 and B02.
- **Primary documents:** `03-narrative-and-campaign.md`, with mappings to
  `05-characters-and-dialogue.md`, `08-endings-and-state-matrix.md`, and
  `12-content-specification.md`.
- **Must resolve:** exact semester and act timeline; mandatory and optional
  scenes; triggers; emails, meetings, journal rejections, peer review, industry
  contact, final choice, and cutscenes; variation between runs; and how failure
  or compromised work changes later acts without breaking the campaign.
- **Complete when:** every major story beat, branch, prerequisite, consequence,
  and transition has an approved place in the campaign.

### B04 — Laboratory and manuscript gameplay

- **Status:** Not started.
- **Depends on:** B01 and B03.
- **Primary documents:** `02-player-experience-and-loop.md`,
  `04-science-and-experiments.md`, and `07-systems-and-balance.md`.
- **Must resolve:** movement and interaction grammar; targeting, inventory, and
  equipment use; concurrent samples; exact preparation, incubation, monitoring,
  analysis, and interpretation actions; manuscript-board mechanics; causal
  feedback; interruption and recovery; abandonment; and irreversible loss.
- **Complete when:** each repeated player action, outcome, feedback signal, and
  transition can be described without inventing mechanics during implementation.

### B05 — Time, resources, relationships, and balance

- **Status:** Not started.
- **Depends on:** B03 and B04.
- **Primary documents:** `02-player-experience-and-loop.md` and
  `07-systems-and-balance.md`, with ending dependencies in
  `08-endings-and-state-matrix.md`.
- **Must resolve:** semester-to-real-time conversion; day boundaries, pausing,
  scheduling, and difficulty; representation, initial values, caps, costs,
  recovery, and formulas for every state; experiment variability and seed
  policy; relationship and industry flags; request generation; loss and soft
  failure; catch-up rules; and the anti-save-scumming stance.
- **Complete when:** the state model and pacing rules are consistent, tunable,
  explainable to the player where appropriate, and connected to narrative and
  experiment outcomes.

### B06 — Endings and epilogues

- **Status:** Not started.
- **Depends on:** B02, B03, and B05.
- **Primary documents:** `08-endings-and-state-matrix.md`, with narrative and
  character content in `03-narrative-and-campaign.md` and
  `05-characters-and-dialogue.md`.
- **Must resolve:** route-unlock and paper-state thresholds; effects of
  integrity, energy, evidence, and relationships; whether both viable routes
  may be rejected; valid module combinations and precedence; every epilogue
  module and final image; ending labels; achievements; replay summary; and new
  game behaviour.
- **Complete when:** every reachable final state maps deterministically to a
  coherent choice or failure state and an approved modular epilogue.

### B07 — World and level design

- **Status:** Not started.
- **Depends on:** B02, B03, and B04.
- **Primary documents:** `06-world-and-level-design.md`, with asset implications
  in `09-art-audio-and-assets.md`.
- **Must resolve:** scaled floor plan, dimensions, adjacency, sightlines,
  shortcuts, spawn and tutorial path; act-based locks and event staging;
  interactable and decorative inventory by room; lighting and semester states;
  NPC navigation and schedules; environmental-storytelling persistence; and
  loading, occlusion, level-of-detail, and performance constraints.
- **Complete when:** the complete playable floor supports all approved actions,
  scenes, routes, and performance needs with a bounded asset burden.

### B08 — Art, audio, UI, and accessibility

- **Status:** Not started.
- **Depends on:** B02, B04, and B07.
- **Primary documents:** `09-art-audio-and-assets.md` and
  `10-ui-ux-accessibility.md`, with the asset register in
  `../assets/ASSET_MANIFEST.md`.
- **Must resolve:** visual references, palette, materials, scale, lighting,
  characters, animation, VFX, cinematics, typography, and asset inventory;
  music, ambience, voice strategy, mix, and audio cues; input devices, control
  map, HUD, menus, tutorial, save and replay UX; accessibility settings and
  defaults; localization, reading level, text volume, and content warnings;
  performance formats; and licensing direction for every asset category.
- **Complete when:** presentation and interaction have bounded inventories,
  accessibility acceptance criteria, performance budgets, and viable creation
  or licensed-sourcing paths.

### B09 — Technical architecture

- **Status:** Not started.
- **Depends on:** B04, B05, B07, and B08.
- **Primary documents:** `11-technical-architecture.md`, with cross-references
  to `10-ui-ux-accessibility.md` and `13-testing-and-evaluation.md`.
- **Must resolve:** language, build tooling, dependencies, module boundaries,
  rendering, collision, navigation, animation, audio, and UI integration;
  state, event, experiment, and save schemas; migrations and corruption
  recovery; supported browsers and devices; frame-time, memory, bundle, and
  loading targets; portfolio deployment and interruption behaviour; testing,
  CI, error reporting, observability, and dependency maintenance.
- **Complete when:** every required system has an owned interface, data model,
  failure behaviour, performance target, and validation path.

### B10 — Content, evaluation, production, and implementation handoff

- **Status:** Not started.
- **Depends on:** B00 through B09.
- **Primary documents:** `12-content-specification.md`,
  `13-testing-and-evaluation.md`, `14-production-plan.md`, and
  `15-implementation-contract.md`.
- **Must resolve:** exact content counts, identifiers, dependencies, mandatory
  and optional content, fallback cut line, and authoring formats; playtest
  audience, protocol, success thresholds, scientific and narrative review, and
  automation targets; time and cost budgets, milestones, sequencing, staffing,
  maintenance, and stop or reframe criteria; repository visibility, licensing,
  release packaging, and portfolio timing; and requirement IDs, traceability,
  work-package ownership, agent-contribution evidence, integration rules, CI
  gates, and definitions of done.
- **Complete when:** the vertical slice, 90-minute fallback, and full game each
  have bounded content, evidence, budget, stop criteria, and agent-owned work
  packages traceable to approved requirements.

### Progress protocol

1. Work on one block at a time unless Leonardo explicitly approves a dependency
   exception.
2. Ask small groups of related questions and preserve all unresolved answers.
3. Before documentation, present a synthesis separating confirmed, proposed,
   and open decisions.
4. Change a block to **Awaiting approval** when that complete synthesis is
   presented, and to **Approved** only after Leonardo explicitly approves it.
5. Write approved decisions into every affected domain document. Update the
   decision log for material choices and this roadmap for status and remaining
   work.
6. Check cross-document consistency, links, formatting, and scope before the
   block commit.
7. Change the block to **Documented**, record its commit, and advance the
   current-block pointer only in that validated commit.
8. If a later decision reopens a documented block, mark it **In discussion**,
   record the reason, and preserve the earlier decision as superseded history.

## Implementation-readiness gate

The gate may be changed to `approved` only after Leonardo explicitly approves
the latest complete specification and all of the following are true:

- every implementation-affecting choice is confirmed or deliberately deferred
  outside the approved scope;
- narrative beats, characters, experiment content, state transitions, and
  ending conditions are internally consistent;
- UI, controls, accessibility, save behaviour, and failure recovery have
  testable acceptance criteria;
- the science is fictionalized safely and does not imply unsupported real-world
  regenerative capability or provide actionable wet-lab protocols;
- technical architecture, performance targets, supported browsers, and data
  schemas are specified;
- the asset inventory has acceptable provenance and licensing paths;
- the vertical-slice scope, production budget, evaluation method, and stop or
  reframe criteria are approved;
- `docs/15-implementation-contract.md` maps agent-owned work packages to
  requirements and validation.

Current gate: **blocked by unresolved design decisions; no implementation
authorized**.
