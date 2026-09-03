# Design Index and Readiness Gate

Status: **creative design, R00–R07, S00–S14, and development governance documented; Gate 1 approved; Steps 1–3 accepted; Step-4 v4 rules correction active**

This index is the completeness contract for _Minor Revisions_. `Seeded` means
the document contains all decisions confirmed as of 2026-08-26 plus explicit
gaps. It does not mean that the domain is finished.

| Document                                        | Domain                                                       | Status                                                 | Principal unresolved work                                                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `01-vision-and-pillars.md`                      | Thesis, tone, scope                                          | B10 documented                                         | Later public wording and release execution require separate approval.                                                      |
| `02-player-experience-and-loop.md`              | Moment-to-moment play                                        | B10 documented                                         | Implementation evidence and later tuning only.                                                                             |
| `03-narrative-and-campaign.md`                  | Five-act story                                               | B10 documented                                         | Authored draft is ready for later specification review.                                                                    |
| `04-science-and-experiments.md`                 | Fictional science                                            | B10 documented                                         | Asset production and later implementation evidence only.                                                                   |
| `05-characters-and-dialogue.md`                 | Cast and voice                                               | B10 documented                                         | Authored draft is ready for later specification review.                                                                    |
| `06-world-and-level-design.md`                  | University research floor                                    | B10 documented                                         | Asset production and performance evidence only.                                                                            |
| `07-systems-and-balance.md`                     | State and rules                                              | B10 documented                                         | Bounded post-slice tuning only.                                                                                            |
| `08-endings-and-state-matrix.md`                | Outcomes                                                     | B10 documented                                         | Authored draft is ready for later specification review.                                                                    |
| `09-art-audio-and-assets.md`                    | Presentation                                                 | B10 documented                                         | Verified asset selection and measurements occur before integration.                                                        |
| `10-ui-ux-accessibility.md`                     | Interface and access                                         | B10 and S14 documented                                 | Implementation verification only.                                                                                          |
| `11-technical-architecture.md`                  | Runtime design                                               | B10 and S01–S14 documented                             | Measured browser and performance results remain future facts.                                                              |
| `12-content-specification.md`                   | Content inventory                                            | B10 documented                                         | Implementation evidence and later content revisions only.                                                                  |
| `13-testing-and-evaluation.md`                  | Quality evidence                                             | B10 and S12–S14 documented                             | Test results are future evidence, not current claims.                                                                      |
| `14-production-plan.md`                         | Delivery strategy                                            | B10 and S13–S14 documented                             | Leonardo may later revise capacity or release timing.                                                                      |
| `15-implementation-contract.md`                 | Agent handoff                                                | B10 and S13–S14 plus incremental workflow documented   | Complete active `MR-WO-WP01-003`; keep `MR-WO-WP00-008` waiting.                                                           |
| `reviews/independent-design-review-protocol.md` | External specification review                                | Review complete                                        | Discuss the validated findings and record Leonardo's decisions.                                                            |
| `reviews/2026-08-28-opus-5/`                    | Opus 5 reports and validation                                | Stored; advisory                                       | No recommendation is accepted until Leonardo decides it.                                                                   |
| `reviews/holistic-game-assessment-protocol.md`  | Identity, fun-hypothesis, direction, and expectations review | Review complete                                        | Preserve document-only quality claims as hypotheses until private play evidence exists.                                    |
| `reviews/2026-08-28-opus-5-holistic/`           | Holistic Opus 5 reports and validation                       | Stored; advisory                                       | No recommendation is accepted until Leonardo decides it.                                                                   |
| `reviews/recommendation-register.md`            | Cross-review recommendation status                           | Current; R00–R07 documented                            | No review block remains; wait for Leonardo's next instruction.                                                             |
| `decision-log.md`                               | Approved decisions                                           | Current                                                | Continue for every material choice                                                                                         |
| `glossary.md`                                   | Shared terminology                                           | B10 documented                                         | Expand only when a new approved term needs definition.                                                                     |
| `../assets/ASSET_MANIFEST.md`                   | Asset provenance                                             | B10 and S10 documented                                 | No production asset source is selected or verified yet.                                                                    |
| `implementation/roadmap.md`                     | Technical-specification programme                            | S00–S14, Gate 1, and development governance documented | Step 1 is accepted; later decisions and frozen contracts remain revisable only through approved evidence-led supersession. |
| `implementation/status.md`                      | Durable current state                                        | Current; Sxx complete                                  | Update in every specification commit.                                                                                      |
| `implementation/decisions.md`                   | Technical and process decisions                              | Current through Step-4 plan approval                   | Add only approved decisions and preserve supersessions.                                                                    |
| `implementation/interfaces.md`                  | Shared-interface lifecycle                                   | `MR-IF-002` frozen `v3`; all others frozen `v1`        | Historical `MR-IF-002 v1` and `v2` are superseded through approved evidence-led packets.                                   |
| `implementation/open-issues.md`                 | Technical clarification ledger                               | `MR-IMP-OPEN-001`–`016` resolved                       | Register any later material issue before dependent work.                                                                   |
| `implementation/specification-audit.md`         | S14 audit and gate packet                                    | Documented with governance amendment audit             | Gate 1 approved on 2026-09-01; it authorizes no code.                                                                      |
| `implementation/ai-use-log.md`                  | Private, project-only AI model and contribution provenance   | Current                                                | Future primary sessions and completed subagent contributions record actual model and reasoning evidence.                   |
| `implementation/development-roadmap.md`         | Incremental implementation sequence                          | Steps 1–3 accepted; Step 4 correcting                  | Run only the active superseding Sol `high` rules correction before the primary diagnostic correction.                      |
| `implementation/development-status.md`          | Durable implementation resume point                          | Step-4 v4 rules correction active                      | Complete only `MR-WO-WP01-003`.                                                                                            |
| `implementation/step-acceptance-log.md`         | Leonardo and agent evidence index                            | Step 4 correcting                                      | Preserve the blocked review and approved supersession separately from future correction evidence.                          |

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

- Creative workshop: **B00–B10 documented**.
- Independent review decisions: **R00–R07 documented**.
- Technical-specification blocks: **S00–S14 documented; no S15 is planned**.
- Last documented technical block: **S14 — Consistency audit and gate packet**.
- Durable implementation resume point: `implementation/development-status.md`.
- Active issue group: none; `MR-IMP-OPEN-001`–`015` are resolved.
- Gate 1, technical baseline: **approved by Leonardo on 2026-09-01**.
- Subagent governance: **documented**; future plans must use explicit model
  routing and focused delegation records.
- AI-use provenance: **current and project-specific**; B00–B10, R00–R07,
  S01–S14, and Step-0 model history belongs only to _Minor Revisions_.
- Incremental implementation start: **Steps 1–3 accepted; exact Step-4
  prerequisite-proof rules correction active**; `MR-WO-WP01-003` is active
  and `MR-WO-WP00-008` waits.
- Vertical-slice acceptance: **blocked**; Steps 4–30 remain unaccepted.
- Fallback acceptance: **blocked**; Steps 32–52 do not exist.
- Full local-game acceptance: **blocked**; Steps 54–69 do not exist.
- Step-3 authority is limited to its exact approved application-lifecycle
  scope. No Three.js scene, game system, production asset, deployment
  configuration, remote, or public licence is authorized.

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
  The game must remain engaging and absurdist throughout through meaningful
  choice, discovery, institutional language, physical environment, and
  responsive systems. Later comedy can become darker and less frequent while
  science and character stakes remain grounded.
  The approved success criteria, content limits, non-goals, public position,
  agent-evidence fields, and release rules are in the primary documents.
- **Deferred outside B00:** B10 now records private evaluation targets,
  requirements, work packages, and the future licence plan. Exact public text,
  the actual title-conflict check, public licence files, a release date, and
  public agent assignments remain later release or implementation work.
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
  the interested company. The journal sequence is _Cosmos_, _Knowledge_,
  _Developmental Systems Letters_, and _Proceedings of the International
  Institute of Morphodynamics_. The first three reject the paper; the fourth
  sends it to peer review.
- **Deferred outside B02:** B03 owns exact scene order, rejection text,
  reviewer reports, personal-history reveals, and character reactions. B05
  owns relationship state and thresholds. B07 owns exact schedules and
  navigation. B08 documents the character-presentation limits; B10 now
  provides exact variants and authored content. During the playable semester, Camila,
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
  _Cosmos_, _Knowledge_, and _Developmental Systems Letters_ reject the paper;
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
  B08 documents camera, audio, and presentation. B10 now provides exact
  authored English text, identifiers, and full content inventory.
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
  detailed controls, UI, and accessibility settings. B09 save schemas and
  runtime architecture are documented in `11-technical-architecture.md`. B10
  owns exact tutorial text and authored experiment content.
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
  Standard and Supported pressure profiles. Energy, evidence, Elena's paper confidence,
  integrity, and five working-trust relationships have approved values,
  visibility, starting states, bands, costs, recovery, and permanent-flag
  rules. A zero-energy push-through causes a consequential involuntary crash,
  not a pre-Week-16 game-over. A stored campaign seed limits variation inside
  earned experiment and PIIM outcome bands. Requests are fixed or selected from
  small authored conditional sets, with stated lower-evidence routes instead
  of calendar delay or unlimited catch-up. Aldercroft, Morrow, PIIM, route
  closure, reviewer-card, and player-feedback rules are approved.
- **Deferred outside B05:** B07 owns period schedules and staging. B08
  documents detailed visual interface, controls, and accessibility. B09
  schemas and persistence are documented in `11-technical-architecture.md`.
  B10 now provides exact authored experiments, requests, dialogue, and
  bounded post-slice band tuning.
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
  _Pending Appointment_, _Transferable Skills_, _Out of Scope_, and _End of
  Contract_. Paper state has no new random outcome after Week 16. Integrity,
  fatigue, relationship-selection, and route-precedence rules are approved.
  Each completion records a local ending card and satirical Institutional
  Citations. A new campaign has a separate seed and no gameplay carry-over.
  B05 route-unlock and paper-state rules remain fixed unless Leonardo
  explicitly reopens them.
- **Deferred outside B06:** B07 owns exact spatial placement and staging. B08
  documents visual, camera, control, summary-layout, and accessibility
  production. B09 archive and save schemas are documented in
  `11-technical-architecture.md`. B10 now provides exact ending lines,
  citation names and triggers, content identifiers, and bounded later tuning.
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
  boundary, camera, audio, controls, UI, and accessibility settings. B09
  defines the collision, authored-character navigation, loading, and
  performance boundary in `11-technical-architecture.md`. B10 now provides
  exact prop text, scene lines, and content identifiers. Measured performance
  remains a later implementation fact.
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

- **Deferred outside B08:** B09 defines the stack, browser scope and baseline
  class, renderer/loading/audio pipeline, controller roles, UI and save runtime
  architecture, save schema/migrations, collision, and authored-character
  navigation in `11-technical-architecture.md`. The B10 record defines the
  bounded content, evaluation, production, and asset-role plan. Exact asset sources, final
  asset IDs, colour values after contrast checks, audio codecs and file names,
  package versions, and measured performance are later verified facts.
- **Complete when:** presentation and interaction have bounded inventories,
  accessibility acceptance criteria, performance budgets, and viable creation
  or licensed-sourcing paths.
- **Completion record:** `Complete Minor Revisions B08 art audio UI and accessibility`.

### B09 — Technical architecture

- **Status:** Documented.
- **Depends on:** B04, B05, B07, and B08.
- **Primary documents:** `11-technical-architecture.md`, with cross-references
  to `10-ui-ux-accessibility.md` and `13-testing-and-evaluation.md`.
- **Approved decision set:** use strict TypeScript with Vite, direct Three.js,
  semantic HTML/CSS overlays, local bundled dependencies, `npm`, and a later
  recorded Node LTS version. Keep the game repository independent and publish
  only a static build through a future approved portfolio task. Separate the
  rendering/world, player/input, interaction, rules, content, UI/accessibility,
  audio/cutscenes, persistence, and test modules. Rules return serializable
  next state and presentation effects, use validated authored data, stable
  identifiers, a saved deterministic seed, typed commands, and a safe-point
  event scheduler.

  Use one continuous Three.js floor scene, a kinematic controller, static
  collision shapes, interaction raycasts, authored NPC anchors, shared
  resources, visibility control, distant lower detail, animation mixers, and
  a small code-owned cutscene timeline. Do not use a physics engine, general
  navigation, room loading, runtime CDN, API, analytics, telemetry, service
  worker, or runtime network dependency.

  Use one versioned IndexedDB database with validated settings, one active
  campaign, one last-known-good backup, ending cards, Institutional Citations,
  and metadata. Use safe saves, recovery, forward-only migrations, and local
  data clearing. Use action-based remappable input, controlled pointer lock,
  semantic UI, and one Web Audio manager with four buses. Require WebGL2 and
  show compatibility feedback before campaign creation.

  Target current Chrome, Edge, and Firefox desktop browsers. Test Chromium,
  Firefox, and WebKit automatically. Treat Safari as best-effort only until
  direct Safari evidence exists. Use the approved Intel i5/Iris Xe reference
  class, Low/Standard/High graphics profiles, named specialist resource
  ownership, a local error screen with sanitized diagnostics, and no automatic
  reporting. S02 replaces the earlier central-resource-manager shorthand:
  rendering owns visual resources, audio owns audio resources, and no general
  shared resource service exists.
  Use Vitest, Playwright, ESLint, Prettier, local quality commands, a future
  non-deploying GitHub Actions workflow after remote approval, a build-size
  audit, manual performance evidence, and intentional dependency review.

- **Deferred outside B09:** B10 resolves content identifiers, data instances,
  private evaluation targets, licence plan, requirement traceability, and
  implementation work packages. Exact Node and package versions, verified
  asset sources and codecs, and measured performance remain later facts.
  Direct Safari testing is outside the approved first-release plan.
- **Complete when:** every required system has an owned interface, data model,
  failure behaviour, performance target, and validation path.
- **Completion record:** `Complete Minor Revisions B09 technical architecture`.

### B10 — Content, evaluation, production, and implementation handoff

- **Status:** Documented.
- **Depends on:** B00 through B09.
- **Primary documents:** `12-content-specification.md`,
  `13-testing-and-evaluation.md`, `14-production-plan.md`, and
  `15-implementation-contract.md`.
- **Approved decision set:** content uses stable `MR-...` identifiers,
  validated JSON data, one English string set, saved conditional selections,
  and no free-form generated dialogue. The full game has six experiment
  templates, seven mandatory scenes, ten optional character scenes, twenty
  primary records, twenty-nine ending modules, twelve Institutional Citations,
  thirty environmental text items, and no more than 6,000 unique English
  words. The Week-1 vertical slice and coherent 90-minute fallback have fixed
  content boundaries. Action costs, qualitative baselines, and saved outcome
  bands are specified in the authoritative domain documents.

  Evaluation is private to Leonardo and Codex. It uses the approved internal
  checkpoints, automated test targets, build-size audit, and evidence records;
  it does not recruit participants or require external scientific or narrative
  review. Production has a capacity-based schedule, a EUR 150 non-LLM
  exceptional-cost ceiling, a Phase-1 asset feasibility check, stop rules, and
  a 90-day private critical-fix period. Leonardo alone decides when to create
  and push a remote. A later public source release uses
  MIT for code, CC BY 4.0 for Leonardo's original non-code work, verified
  third-party rights, and the approved release package.

  Requirements use `MR-REQ-<DOMAIN>-<NUMBER>`. The approved work packages,
  branch rules, contribution records, integration rules, and definition of done
  are in `15-implementation-contract.md`. Exact package versions, verified
  asset sources and codecs, and measured performance are deliberate future
  implementation facts. They do not authorize code now.

- **Complete when:** the vertical slice, 90-minute fallback, and full game have
  bounded content, evidence, budget, stop criteria, and agent-owned work
  packages traceable to approved requirements.
- **Completion record:** `Complete Minor Revisions B10 content, evaluation,
and handoff`.

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

Current Gate 1 state: **approved by Leonardo on 2026-09-01; Steps 1–3 are
accepted; the exact Step-4 plan and `MR-IF-002 v2` creation-input refinement
were approved on 2026-09-02; Step 5 remains unapproved**.

The former one-shot vertical-slice production sequence is superseded by the
collaborative workflow in `implementation/development-roadmap.md`. After Gate
1, Leonardo approves only one exact step plan at a time. Steps 1–30 build the
slice, Step 31 accepts it, Step 53 accepts the fallback, and Step 70 accepts the
complete local game. Each step includes technical checks, a Leonardo test or
result review, corrections, durable attribution, and explicit acceptance.
Public actions remain separate.
