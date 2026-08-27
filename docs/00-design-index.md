# Design Index and Readiness Gate

Status: **seeded; not implementation-ready**

This index is the completeness contract for *Minor Revisions*. `Seeded` means
the document contains all decisions confirmed as of 2026-08-26 plus explicit
gaps. It does not mean that the domain is finished.

| Document | Domain | Status | Principal unresolved work |
|---|---|---|---|
| `01-vision-and-pillars.md` | Thesis, tone, scope | Approved through B06 | Release execution and exact public text remain in B10 |
| `02-player-experience-and-loop.md` | Moment-to-moment play | Approved through B08 | Runtime behaviour and authored content remain in B09 and B10 |
| `03-narrative-and-campaign.md` | Five-act story | Approved through B08 | Line-level content remains in B10 |
| `04-science-and-experiments.md` | Fictional science | Approved through B08 | Exact authored experiment content remains in B10 |
| `05-characters-and-dialogue.md` | Cast and voice | Approved through B08 | Exact dialogue and scene content remain in B10 |
| `06-world-and-level-design.md` | University research floor | Approved through B08 | Technical implementation and exact props remain in B09 and B10 |
| `07-systems-and-balance.md` | State and rules | Approved through B08 | Runtime schemas and tuned values remain in B09 and B10 |
| `08-endings-and-state-matrix.md` | Outcomes | Approved through B08 | Exact authored ending content remains in B10 |
| `09-art-audio-and-assets.md` | Presentation | Approved through B08 | Exact asset selection and content remain in B10 |
| `10-ui-ux-accessibility.md` | Interface and access | Approved through B08 | Runtime implementation and authored text remain in B09 and B10 |
| `11-technical-architecture.md` | Runtime design | Approved through B08 | Stack, modules, save schema, and measured performance remain in B09 |
| `12-content-specification.md` | Content inventory | Approved through B08 (partial) | Full identifiers, line counts, and authored content remain in B10 |
| `13-testing-and-evaluation.md` | Quality evidence | Approved through B08 | Targets, playtest protocol, acceptance thresholds |
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

- Current block: **B09 — Technical architecture**
- Last documented block: **B08 — Art, audio, UI, and accessibility**
- Next action: define the implementation stack, runtime modules, data and save
  schemas, browser support, loading, collision, rendering, and technical test
  plan that implement the approved design.
- Implementation gate: **blocked**; completing discussion blocks does not by
  itself authorize implementation.

### B00 — Vision, audience, success, and boundaries

- **Status:** Documented.
- **Depends on:** No earlier block.
- **Primary documents:** `01-vision-and-pillars.md`,
  `13-testing-and-evaluation.md`, and `14-production-plan.md`.
- **Approved decision set:** the primary audience is people who enjoy narrative
  exploration and systemic satire, with no academic or scientific knowledge
  required; academics can find an additional layer of recognition, and
  portfolio reviewers are a secondary audience. The emotional arc moves from
  amusing recognition through pressure and uncomfortable complicity to a
  bitter but human ending. The game must not become nihilistic. Small acts of
  solidarity remain meaningful, and leaving academia is not total defeat. The
  game fiction does not refer to its AI-assisted production. Agent direction is
  shown through repository evidence, requirement traceability, evaluation, and
  a later case study. The target content level is similar to `Teen` or `12+`.
  The game must remain fun and absurdist throughout through institutional
  language, physical environment, and responsive systems, while its science
  and character stakes remain grounded.
  The approved success criteria, content limits, non-goals, public position,
  agent-evidence fields, and release rules are in the primary documents.
- **Deferred outside B00:** B10 owns numeric playtest thresholds, exact public
  text, the actual title-conflict check, licence selection, release date, and
  the final work-package template and agent assignments.
- **Complete when:** the game has an approved audience, experience promise,
  safety boundary, non-goal set, and qualitative success definition that later
  blocks can test against.
- **Completion record:** `Complete Minor Revisions B00 vision block`.

### B01 — Fictional science and experiment progression

- **Status:** Documented.
- **Depends on:** B00.
- **Primary documents:** `04-science-and-experiments.md`, with consequences for
  `02-player-experience-and-loop.md`, `03-narrative-and-campaign.md`, and
  `07-systems-and-balance.md`.
- **Approved decision set:** the model is a standardized lab-grown human
  cardiac tissue model with beating muscle cells, support cells, and simple
  internal structure. Limited damage starts a fictional repair state that is
  linked to, but does not prove cause of, spatial-rhythmic recovery. The player
  reads structure, rhythm, and repatterning-index evidence. The experiment
  chain is laser replication and sham, damage and recovery range, batch check,
  repair-state evidence, required oxygen-loss challenge, and optional drug
  challenge. Results have separate biological-result and evidence-quality
  layers. Manuscript claims have careful, strong, and inflated levels.
- **Deferred outside B01:** B04 and B05 own exact controls, interactions,
  player choices, numerical balance, and thresholds. B03 owns exact narrative
  use. No later work may add an actionable protocol, treatment claim, or proof
  that the repair state causes recovery.
- **Complete when:** the whole experiment chain is scientifically legible,
  narratively useful, safe from actionable wet-lab detail, and specific enough
  to design gameplay and reviewer requests.
- **Completion record:** `Complete Minor Revisions B01 science block`.

### B02 — Institution, protagonist, and characters

- **Status:** Documented.
- **Depends on:** B00 and the scientific vocabulary established in B01.
- **Primary documents:** `03-narrative-and-campaign.md`,
  `05-characters-and-dialogue.md`, `06-world-and-level-design.md`, and
  `glossary.md`.
- **Approved decision set:** Bellwether University contains the Department of
  Developmental Systems and the Cardiac Patterning Group. The protagonist has
  an observant, dry, controlled internal voice and stance-based dialogue. The
  recurring cast is Professor Elena Markovic, Haoran Zhao, Dr. Samira
  El-Masri, Dr. Gabriel da Silva, and Dr. Camila Torres. Each has a distinct
  institutional pressure and a relationship arc that can support help,
  conflict, or both. The Common Archive hosts the preprint. Morrow Biotech is
  the interested company. The journal sequence is *Cosmos*, *Knowledge*,
  *Developmental Systems Letters*, and *Proceedings of the International
  Institute of Morphodynamics*. The first three reject the paper; the fourth
  sends it to peer review.
- **Deferred outside B02:** B03 owns exact scene order, rejection text,
  reviewer reports, personal-history reveals, and character reactions. B05
  owns relationship state and thresholds. B07 owns exact schedules and
  navigation. B08 documents the character-presentation limits; B10 owns exact
  variants and authored content. During the playable semester, Camila,
  the editor, and the reviewers remain remote.
- **Complete when:** the fictional world and recurring cast can support every
  campaign act without reproducing real people or institutions literally.
- **Completion record:** `Complete Minor Revisions B02 institution and characters block`.

### B03 — Campaign beat sheet and branching

- **Status:** Documented.
- **Depends on:** B01 and B02.
- **Primary documents:** `03-narrative-and-campaign.md`, with mappings to
  `05-characters-and-dialogue.md`, `08-endings-and-state-matrix.md`, and
  `12-content-specification.md`.
- **Approved decision set:** the campaign covers a 16-week final semester in
  five acts. It begins and ends at 06:42. The player remains in a continuous
  day-and-night work loop without a home or sleep action. Seven mandatory
  scenes and ten optional character scenes provide the fixed campaign backbone.
  *Cosmos*, *Knowledge*, and *Developmental Systems Letters* reject the paper;
  `PIIM`, edited by Dr. Leila Haddad, gives one major-revision round with three
  fixed reviewer positions. Morrow Biotech and Aldercroft University provide
  competing, uncertain career routes. The player can make defensible,
  selective, altered, or fabricated research claims without receiving a
  practical falsification method. Fabrication can remain undiscovered. All
  mandatory scenes occur in every run; state changes their content and the
  final routes, but never ends the campaign before Week 16.
- **Deferred outside B03:** B04 owns laboratory and manuscript interactions.
  B05 owns state values, event thresholds, time costs, and route formulas. B06
  owns ending modules, precedence, and final scenes. B07 owns scene staging;
  B08 documents camera, audio, and presentation. B10 owns exact authored
  English text, identifiers, and full content inventory.
- **Complete when:** every major story beat, branch, prerequisite, consequence,
  and transition has an approved place in the campaign.
- **Completion record:** `Complete Minor Revisions B03 campaign block`.

### B04 — Laboratory and manuscript gameplay

- **Status:** Documented.
- **Depends on:** B01 and B03.
- **Primary documents:** `02-player-experience-and-loop.md`,
  `04-science-and-experiments.md`, and `07-systems-and-balance.md`, with
  linked constraints in `06-world-and-level-design.md`,
  `10-ui-ux-accessibility.md`, and `11-technical-architecture.md`.
- **Approved decision set:** first-person play uses one context-sensitive
  interaction action and focused station views. The laboratory has six
  functional locations, no general item inventory, and at most three active
  labelled sample groups. Each group uses a five-stage qualitative loop:
  select, configure, start, monitor, then analyse and interpret. The player
  receives physical and desk-queue signals, must visit equipment for meaningful
  intervention, and faces authored equipment problems rather than random
  barriers. Analysis makes permanent raw records and tagged evidence cards.
  The manuscript desk uses cards, requirements warnings, revision commits, and
  visible snapshots without free undo. The player can make explicit integrity
  choices without a practical falsification method. Safe notification,
  monitoring, abandonment, checkpoint, offline-time, and accessible-input
  rules are approved.
- **Deferred outside B04:** B05 owns time costs, values, formulas, variability,
  difficulty, and route thresholds. B07 owns the floor plan. B08 documents
  detailed controls, UI, and accessibility settings. B09 owns save schemas and
  runtime architecture. B10 owns exact tutorial text and authored experiment
  content.
- **Complete when:** each repeated player action, outcome, feedback signal, and
  transition can be described without inventing mechanics during implementation.
- **Completion record:** `Complete Minor Revisions B04 laboratory and
  manuscript gameplay`.

### B05 — Time, resources, relationships, and balance

- **Status:** Documented.
- **Depends on:** B03 and B04.
- **Primary documents:** `02-player-experience-and-loop.md` and
  `07-systems-and-balance.md`, with ending dependencies in
  `08-endings-and-state-matrix.md` and linked constraints in
  `03-narrative-and-campaign.md`, `04-science-and-experiments.md`,
  `05-characters-and-dialogue.md`, `10-ui-ux-accessibility.md`, and
  `11-technical-architecture.md`.
- **Approved decision set:** the fixed semester has 64 named work periods and
  Standard and Supported pressure profiles. Energy, evidence, PI confidence,
  integrity, and five working-trust relationships have approved values,
  visibility, starting states, bands, costs, recovery, and permanent-flag
  rules. A zero-energy push-through causes a consequential involuntary crash,
  not a pre-Week-16 game-over. A stored campaign seed limits variation inside
  earned experiment and PIIM outcome bands. Requests are fixed or selected from
  small authored conditional sets, with stated lower-evidence routes instead
  of calendar delay or unlimited catch-up. Aldercroft, Morrow, PIIM, route
  closure, reviewer-card, and player-feedback rules are approved.
- **Deferred outside B05:** B07 owns period schedules and staging. B08
  documents detailed visual interface, controls, and accessibility. B09 owns
  schemas and persistence. B10 owns exact authored experiments, requests,
  dialogue, and post-playtest tuning.
- **Complete when:** the state model and pacing rules are consistent, tunable,
  explainable to the player where appropriate, and connected to narrative and
  experiment outcomes.
- **Completion record:** `Complete Minor Revisions B05 time and balance block`.

### B06 — Endings and epilogues

- **Status:** Documented.
- **Depends on:** B02, B03, and B05.
- **Primary documents:** `08-endings-and-state-matrix.md`, with narrative and
  character content in `03-narrative-and-campaign.md` and
  `05-characters-and-dialogue.md`, and linked constraints in
  `01-vision-and-pillars.md`, `02-player-experience-and-loop.md`,
  `07-systems-and-balance.md`, `10-ui-ux-accessibility.md`, and
  `11-technical-architecture.md`.
- **Approved decision set:** all endings use a 60–90-second epilogue set six
  months after Week 16. It contains a career scene, paper-aftershock,
  relationship afterbeat, final image, and summary. The four career labels are
  *Pending Appointment*, *Transferable Skills*, *Out of Scope*, and *End of
  Contract*. Paper state has no new random outcome after Week 16. Integrity,
  fatigue, relationship-selection, and route-precedence rules are approved.
  Each completion records a local ending card and satirical Institutional
  Citations. A new campaign has a separate seed and no gameplay carry-over.
  B05 route-unlock and paper-state rules remain fixed unless Leonardo
  explicitly reopens them.
- **Deferred outside B06:** B07 owns exact spatial placement and staging. B08
  documents visual, camera, control, summary-layout, and accessibility
  production. B09 owns archive and save schemas. B10 owns exact ending lines, citation
  names and triggers, content identifiers, and later tuning.
- **Complete when:** every reachable final state maps deterministically to a
  coherent choice or failure state and an approved modular epilogue.
- **Completion record:** `Complete Minor Revisions B06 endings and epilogues`.

### B07 — World and level design

- **Status:** Documented.
- **Depends on:** B02, B03, and B04.
- **Primary documents:** `06-world-and-level-design.md`, with asset implications
  in `09-art-audio-and-assets.md`.
- **Approved decision set:** one approximately 400 m² floor uses the approved
  office, desks, laboratory, tissue-culture, imaging, break-room, corridor,
  and exit topology. The room dimensions, 75–90 m loop, functional-station
  placement, authored character anchors, optional-scene locations, tutorial
  route, access rules, service pass-through, act states, room inventory,
  environmental persistence, and continuous-floor limits are documented in
  the primary documents. Core rooms are accessible from Week 1. The exit stays
  a visible Week-16 boundary, rather than a false early escape route. B07 owns
  spatial and event placement. B08 documents camera, audio, and visual
  execution.
- **Deferred outside B07:** B08 documents final palette roles, lighting
  boundary, camera, audio, controls, UI, and accessibility settings. B09 owns
  the collision implementation, navigation data, loading code, and performance
  measurements. B10 owns exact prop text, scene lines, and content identifiers.
- **Complete when:** the complete playable floor supports all approved actions,
  scenes, routes, and performance needs with a bounded asset burden.
- **Completion record:** `Complete Minor Revisions B07 world and level design`.

### B08 — Art, audio, UI, and accessibility

- **Status:** Documented.
- **Depends on:** B02, B04, and B07.
- **Primary documents:** `09-art-audio-and-assets.md` and
  `10-ui-ux-accessibility.md`, with the asset register in
  `../assets/ASSET_MANIFEST.md`.
- **Approved decision set:** stylized institutional realism uses a near-present,
  slightly dated university with low-to-mid-poly modular geometry, restrained
  materials, approved palette roles, authored act and work-period lighting,
  readable fictional science displays, and limited effects. Four physical NPCs
  use role-based stylized silhouettes, a small shared animation set, text-led
  dialogue, and original non-lexical supporting-character sounds; Camila stays
  remote. In-engine scenes use clear framing, slow movement, few cuts, and
  restore first-person control correctly. IBM Plex Sans and Mono have approved
  roles. The audio plan uses room identity sound, three redundant cue classes,
  six modular music stems, and no full voice production. The visual inventory,
  GLB/glTF, texture, live-text, audio, graphics-preset, download, provenance,
  public-repository licence, and attribution boundaries are approved.

  The desktop/laptop release supports keyboard-mouse and standard controller
  input, the specified controls, quiet HUD, Research Status, diegetic desk
  hub, menus, Week-1 tutorial, content note, English-only scope, and fixed
  pressure profile. One active local IndexedDB save, its completion archive,
  no-account privacy boundary, cutscene recap, and data-clear behaviour are
  approved. Captions and speaker names default on, with the approved scaling,
  contrast, motion, cue, Interaction Assist, and browser-view requirements.
- **Deferred outside B08:** B09 owns the exact stack, browser matrix and
  baseline device, renderer/loading/audio pipeline, concrete controller
  mapping, UI and save runtime architecture, save schema/migrations, collision,
  navigation, and measured performance. B10 owns exact asset IDs and sources,
  colour values after contrast checks, notice and dialogue text, audio file
  names, content inventory, playtests, production plan, and release licence.
- **Complete when:** presentation and interaction have bounded inventories,
  accessibility acceptance criteria, performance budgets, and viable creation
  or licensed-sourcing paths.
- **Completion record:** `Complete Minor Revisions B08 art audio UI and accessibility`.

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
