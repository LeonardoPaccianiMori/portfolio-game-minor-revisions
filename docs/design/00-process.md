# Minor Revisions — v2 Design Restart and Working Process

Status: **Active — v2 design in progress; no implementation is authorized.**

Last updated: 2026-09-10.

## Why this file exists

This is the durable anchor for the v2 restart. Read it first in any new session,
before any other document. If a session is lost, compacted, or resumed later,
the current block, its questions, and the exact next action are recorded here.

## Restart declaration

- On 2026-09-10 Leonardo approved a full restart of the game and its
  documentation (v2).
- Every document that existed before the restart was removed from the working
  tree in the restart commit. It is preserved only in Git history at the
  pre-restart head `c438b7f30059c47cc80d19363a92833d1ae002b3` (the v1 archive).
- v1 material may be consulted as inspiration. It has no authority, is not an
  approved v2 decision, and must not be copied into v2 without fresh
  discussion and Leonardo's approval.
- No game code exists. The v1 development pathway (R1–R63) is void.
- Kept from before the restart: the opencode workflow and configuration, the
  local toolchain, the repository discipline (approval, provenance, review,
  acceptance), and Leonardo's standing GitHub synchronization authorization.

## How we work

- One block at a time.
- Ask small groups of related questions and preserve every unresolved answer.
- Before writing any document, present a synthesis separating **Confirmed**,
  **Proposed**, and **Open** decisions.
- A block document is written only after Leonardo's explicit approval of that
  synthesis.
- Update this file and `docs/design/decision-log.md` in the same commit as the
  block document.
- Do not silently resolve contradictions. Record them and ask.
- v1 is never quoted as authority. It may be cited as inspiration and must be
  labelled as such.
- Nothing is implemented before Phase A and Phase B are approved.

## Phases

### Phase A — Clean-slate design

| #   | Block                                | Document                       | Status     |
| --- | ------------------------------------ | ------------------------------ | ---------- |
| A1  | Concept and experience promise       | `01-vision.md`                 | Documented |
| A2  | Core loop and survival system        | `02-core-loop.md`              | Documented |
| A3  | Pressure, resources, and failure     | `03-pressure-and-failure.md`   | Documented |
| A4  | Narrative and structure              | `04-narrative.md`              | Documented |
| A5  | Characters and voice                 | `05-characters.md`             | Documented |
| A6  | World and presentation               | `06-world-and-presentation.md` | Documented |
| A7  | Content and evaluation               | `07-content-and-evaluation.md` | Documented |
| A8  | Technical constraints and production | `08-production-constraints.md` | Documented |

A later block may reopen an earlier one when it changes that block's premises.
That reopening is recorded in the decision log.

### Phase B — Technical specification (fresh)

Specifications live in `docs/specs/`. Each block follows the same
question–synthesis–approval process as Phase A. Nothing from v1 is inherited by
default; the same choices may be re-approved on their merits.

| #   | Block                                   | Document                            | Status        |
| --- | --------------------------------------- | ----------------------------------- | ------------- |
| B1  | Toolchain and repository                | `01-toolchain.md`                   | Documented    |
| B2  | Architecture and module boundaries      | `02-architecture.md`                | Documented    |
| B3  | State, commands, and determinism        | `03-state-and-rules.md`             | Documented    |
| B4  | Content and data                        | `04-content-and-data.md`            | Documented    |
| B5  | Persistence and recovery                | `05-persistence.md`                 | Documented    |
| B6  | World, movement, and interaction        | `06-world-and-interaction.md`       | Documented    |
| B7  | Interface, input, and accessibility     | `07-interface-and-accessibility.md` | Documented    |
| B8  | Rendering, assets, and audio            | `08-rendering-and-audio.md`         | Documented    |
| B9  | Performance, browsers, and diagnostics  | `09-performance-and-browsers.md`    | In discussion |
| B10 | Testing, evaluation, and agent workflow | `10-testing-and-workflow.md`        | Not started   |

### Phase C — Development pathway (fresh)

A new multi-phase pathway with small, reviewable steps, one approved plan at a
time. It is written only after Phases A and B are approved.

## Session protocol

1. Read this file, `docs/design/decision-log.md`,
   `docs/ai-use-log.md`, and the current block document.
2. Confirm the current block and its status.
3. Work one block. Ask focused questions in small groups.
4. Summarize the answers and mark contradictions or gaps.
5. Present the block synthesis: Confirmed, Proposed, Open.
6. On Leonardo's explicit approval, write the block document, update this file
   and the decision log, and append the milestone cost snapshot to
   `docs/costs.md`.
7. Commit and push under the standing GitHub authorization. Every milestone
   commit includes its cost snapshot.

The `/design-session` command starts this protocol.

## Decision rules

- Every decision is `confirmed`, `proposed`, or `open`.
- Nothing becomes confirmed until Leonardo approves it explicitly.
- Every choice that affects implementation is written before code depends on it.
- Measured facts need an approved method, target, and response rule. Do not
  invent a result before execution.
- Superseded decisions stay visible with a reason, date, and explicit
  `superseded` status.
- Preserve a universal fictional world. Do not reproduce real people,
  institutions, or Leonardo's experiences literally.

## File map (v2)

- `docs/design/00-process.md` — this file, the durable process anchor
- `docs/design/decision-log.md` — approved v2 decisions
- `docs/design/01-vision.md` and later block documents — written on approval
- `docs/specs/` — Phase B technical specifications, written on approval
- `docs/ai-use-log.md` — actual primary and subagent model use
- `docs/costs.md` — token and estimated cost ledger, with `/cost-snapshot`
- `AGENTS.md` — the agent contract
- `README.md` — project front page
- `opencode.json`, `.opencode/agent/`, `.opencode/command/` — workflow
  configuration
- v1 archive: Git commit `c438b7f30059c47cc80d19363a92833d1ae002b3`

## Current task — Phase B, Block B9

Phase A is complete and Blocks B1–B8 are documented in `docs/specs/`.
Block B9 (performance, browsers, and diagnostics) is in discussion; its
questions are below. The earlier block questions and session records further
down are preserved as history.

### B9 questions

1. Reference class: a named modest laptop (for example an Intel i5 with
   integrated Iris Xe graphics or equivalent), with 60-minute sessions.
   Proposal.
2. Budgets: a frame-rate target at the standard preset, a playable low preset,
   a memory ceiling, a load-time target, and a build-size limit. Proposal.
3. Measurement: manual profiling on the reference class with recorded
   evidence; no telemetry. Proposal.
4. Browsers: current Chrome, Edge, and Firefox desktop; automated Chromium,
   Firefox, and WebKit checks; Safari best-effort. Proposal.
5. Compatibility: WebGL2 required, with a compatibility check before a new
   game and safe failure when unsupported. Proposal.
6. Diagnostics: a local error screen with sanitized details that the player can
   copy; no external reporting. Proposal.
7. Profiles: low, standard, and high with a safe default; changes apply
   immediately, and no profile grants a gameplay advantage. Proposal.
8. Long sessions: stable 60-minute sessions with correct resource release and
   no leaks. Proposal.

### B8 questions (answered and documented)

1. Renderer: Three.js with WebGL2 required, flat stylized materials, simple
   lighting, one continuous scene, and no heavy post-processing. Proposal.
2. Presets: low, standard, and high control shadows, draw distance, and
   effects, with the reference class fixed in B9. Proposal.
3. Asset pipeline: environment, props, characters, interface, and audio roles
   under the reuse-modify-create policy, with the manifest and licence checks
   before integration. Proposal.
4. Placeholders: temporary geometry and sounds until a real asset is approved;
   placeholders are labelled and never presented as final. Proposal.
5. Resource ownership: world owns visual resources, audio owns audio
   resources, with shared loading and disposal rules. Proposal.
6. Audio: an ambience bed per space, cue classes for interface and pressure,
   the cold synth motif, no voice acting, and captions for non-speech cues.
   Proposal.
7. Characters: stylized silhouette-first presentation with a small shared
   animation set and text-led dialogue. Proposal.
8. Visual language: a restrained palette with one pressure accent, and
   act-based lighting changes that support the tone curve. Proposal.

### B7 questions (answered and documented)

1. Desk board: the two-track board (paper and fellowship), requests, and
   resources in the minimalist diagrammatic style, navigable by mouse,
   keyboard, and controller. Proposal.
2. Action menu: every action states its cost, deadline, and consequences before
   commitment; irreversible choices require confirmation. Proposal.
3. Controls: keyboard and mouse plus controller, with remappable actions and no
   drag-only or precision-motor requirements. Proposal.
4. Accessibility: scale, contrast, reduced motion, captions for non-speech
   cues, keyboard-only operation, no colour-only information, and an
   Interaction Assist mode that eases targeting. Proposal.
5. Text presentation: readable sizes, speaker names, a start-screen content
   note, and clear advance and skip for scenes. Proposal.
6. Settings: audio volumes, captions, motion, scale, and remapping, saved in
   the settings store. Proposal.
7. Screen inventory: menus, pause, save and continue, new game, archive, and
   the personnel file, each with semantic focus management. Proposal.

### B6 questions (answered and documented)

1. Compact floor: the six spaces from A6 in one continuous walkable layout,
   small enough to cross in under a minute; exact metres fixed in the
   implementation. Proposal.
2. Movement: comfortable first-person walking with keyboard, mouse, and
   controller; remappable actions. Proposal.
3. Collision: static collision shapes only; no physics engine and no fall
   damage or jumping puzzles. Proposal.
4. Interaction: one context-sensitive action with raycast targeting, short
   reach, highlight and prompt, and clear obstruction feedback. Proposal.
5. Division of play: experiments and stations in 3D; the paper, the fellowship,
   and resources on the desk board; conversations in the characters' rooms.
   Proposal.
6. Room states: authored per-act changes that show accretion and decline, with
   visible forecasts when a state affects play. Proposal.
7. No trapping: every space can be exited, and recovery anchors return the
   player to a safe point. Proposal.
8. Short scenes: camera holds briefly for authored moments, then control
   returns automatically; scenes are skip-safe and never force motion.
   Proposal.

### B5 questions (answered and documented)

1. One local IndexedDB database with stores for the active campaign, the
   last-known-good backup, settings, the completion archive, and metadata.
   Proposal.
2. Save points: autosave at week boundaries and after scene resolution.
   Closing the game never advances time. Proposal.
3. One active campaign. New Game requires explicit confirmation and replaces
   the active save, while the archive keeps completed runs. Proposal.
4. Recovery: validate every load; on corruption offer the backup; never guess
   or partially accept a save. Proposal.
5. Migration: forward-only and versioned; incompatible saves are refused and
   preserved, never silently reinterpreted. Proposal.
6. Clear data: an explicit destructive action with confirmation, local only.
   Proposal.
7. Privacy and concurrency: no accounts, telemetry, or external sync; stale
   tabs cannot overwrite a newer save. Proposal.

### B4 questions (answered and documented)

1. Content layout: `content/` with data files for the paper, the fellowship,
   events, scenes, messages, notices, endings, and strings. Proposal.
2. Stable IDs: dotted namespaces, for example `paper.claim.mechanism`,
   `fellowship.impact.q1`, `event.rent.1`, and `scene.pi-office.3`. Proposal.
3. Schemas: strict build-time validation; invalid or incomplete content fails
   the build. Proposal.
4. Text: one English strings file keyed by ID, with no dialogue generated at
   runtime. Proposal.
5. Shared evidence: one evidence set with per-track assignment and an overlap
   flag; fellowship feasibility and impact read the current framing. Proposal.
6. Authored events: conditions and effects in data, deterministic, and
   evaluated in a fixed order. Proposal.
7. Content safety and completeness: no actionable science, and
   development-only incomplete markers that can never ship. Proposal.

### B3 questions (answered and documented)

1. Campaign state as one serializable object holding the week, energy, standing,
   integrity, relationships, the paper track, the fellowship track, event flags,
   and the seed. Proposal.
2. Typed, serializable commands such as `performAction`, `assignEvidence`,
   `answerRequirement`, `meetPI`, `rest`, `comply`, `quit`, and `advanceWeek`.
   Proposal.
3. Every command returns either a new state plus presentation effects, or an
   explicit rejection with a reason. No partial mutation. Proposal.
4. Determinism: a seeded PRNG, no wall-clock or hidden randomness; the same
   state plus command plus seed gives the same result. Proposal.
5. Authored events as data with conditions and effects, evaluated
   deterministically by the rules. Proposal.
6. Forecasts: player-facing costs, deadlines, and consequences are stated
   honestly before commitment; formulas may stay hidden, outcomes may not.
   Proposal.
7. State carries a schema version, and content references use stable IDs.
   Proposal.
8. Invalid commands are rejected explicitly, never silently ignored, and the
   interface explains why. Proposal.

### B2 questions (answered and documented)

1. Module list: `application`, `rules`, `content`, `world`, `player`, `input`,
   `interaction`, `ui`, `audio`, `persistence`, and `platform`. Proposal.
2. Import direction: one-way only; rules and content own no browser objects;
   world owns Three.js; persistence owns IndexedDB; audio owns Web Audio; ui
   owns the DOM. Proposal.
3. Lifecycle: one application coordinator, ordered startup and reverse
   shutdown, a request queue, and a single frame loop. Proposal.
4. Dependencies: passed in by the caller, no global singletons, so modules are
   testable in isolation. Proposal.
5. Rules purity: deterministic, serializable, no I/O; presentation effects
   returned as plain data. Proposal.
6. Failure boundary: a safe error screen, sanitized diagnostics, and no
   telemetry or external reporting. Proposal.
7. Ownership: one owner per browser object, and no module reaches into another
   module's browser resources. Proposal.
8. Testing boundaries: unit tests for rules and content; browser tests for
   world, player, interaction, ui, audio, and persistence. Proposal.

### B1 questions (answered and documented)

1. Stack: strict TypeScript, Vite, direct Three.js, local bundled dependencies,
   npm, and a recorded Node LTS, producing a static local build. Proposal.
2. Architecture: separate rules and content, world and rendering, player and
   input, interface, audio, persistence, and tests, with deterministic and
   serializable rules. Proposal.
3. Persistence: browser-local IndexedDB save, no accounts, no telemetry, and no
   runtime network. Proposal.
4. Browsers: current Chrome, Edge, and Firefox desktop; automated Chromium,
   Firefox, and WebKit checks; Safari best-effort until direct evidence exists.
   Proposal.
5. Performance: a named reference machine class, low/standard/high graphics
   presets, and 60-minute sessions; exact numbers fixed in Phase B. Proposal.
6. Budget and capacity: keep the EUR 150 ceiling for non-LLM exceptional costs;
   no hard cap on model spend, but review `docs/costs.md` at every phase gate.
   Proposal.
7. Stop rules: if the vertical slice fails the fun, humour, and comprehension
   checks after one correction cycle, pause and re-scope rather than press on.
   Proposal.
8. Development: a fresh multi-phase pathway in Phase C, one approved step at a
   time, with the opencode agent workflow, independent review, and step records
   already established. Proposal.
9. Release boundary: no public release, licence, deployment, or portfolio work
   until the game passes final acceptance; the existing GitHub remote is the
   only remote. Proposal.

### A7 questions (answered and documented)

1. Word budget: 8,000–12,000 unique English words, mostly dialogue and scene
   text, up from the v1 limit of 6,000. Proposal.
2. Authored scenes: about ten fixed scenes across the three acts, with the rest
   of the story delivered through systemic and interactive text. Proposal.
3. Content types: in-engine scenes, messages and emails, notices and forms,
   desk text, reviewer reports, and the four endings plus the personnel file.
   Proposal.
4. Content data: stable IDs and authored data files validated at build, with no
   generated dialogue at runtime (details in Phase B). Proposal.
5. Language: English only, plain comprehension with insider recognition
   rewarded. Proposal.
6. Evaluation: private self-testing by Leonardo plus agent-run comprehension
   probes. Should limited informal playtesting with trusted people be allowed,
   with no data collection and no research framing? Proposal: yes.
7. Humour and comprehension: per-act joke-density checks and a clean-context
   probe, measured rather than assumed. Proposal.
8. Content safety: fictional and non-actionable science, the Level 2 darkness
   boundary, and a start-screen content note. State it in the document.

### A6 questions (answered and documented)

1. University and department names. Proposal: Ashgrove University, Department
   of Terrestrial Ecology (fictional; rename freely).
2. Floor plan: one compact floor with a desk hub, a soil lab, a grow room, the
   PI's office, a shared corridor, and a break room. Proposal.
3. Station visits: experiments need a short station visit; analysis and writing
   happen at the desk; the PI and colleagues live in their rooms. Proposal.
4. Visual language: minimalist and diagrammatic like Mini Metro — clean shapes,
   flat colours, a restrained palette, and one pressure accent colour.
   Proposal.
5. Camera and movement: comfortable first-person walking with keyboard, mouse,
   and controller; no head-bob or forced motion. Proposal.
6. Audio: diegetic room ambience and restrained cues, a cold synth motif for
   pressure, no voice acting, and captions for non-speech cues. Proposal.
7. The desk board: a diegetic desk in the office with a clean overlay for
   claims, evidence, and requirements. Proposal.
8. Asset plan: environment, props, characters, interface, and audio roles
   under the reuse-modify-create policy; temporary geometry for the first
   builds, external assets only after research and approval. Proposal.
9. Accessibility baseline: scale, contrast, reduced motion, keyboard-only
   operation, captions, and no colour-only information. Proposal.
10. Environmental comedy: institutional notices and room states change by act,
    showing accretion and decline. Proposal.

### A5 questions (answered and documented)

1. PI name, gender, and pronouns. Proposal: Dr. Helena Voss, she/her,
   mid-career and under renewal pressure.
2. The PI's comic register: funding-language optimism that hardens, with one
   humanising scene.
3. The PhD student. Proposal: Dario Ferreira, he/him, meticulous and anxious;
   the player can protect or exploit his work.
4. The departing postdoc. Proposal: Mara Lindqvist, she/her, deadpan, leaving
   for industry; the player's mirror.
5. Distinct comic mechanisms: the PI speaks in funding prose, the student in
   anxious precision, the postdoc in deadpan survival humour.
6. The player character: a fixed authored protagonist, or a chosen name and
   pronouns with a lightly authored voice? Proposal: chosen name and pronouns.
7. Reactions to complicity: immediate, delayed, or discovered at the end?
   Proposal: the student reacts immediately, the postdoc notices late, and the
   PI uses it.
8. The reviewer chorus: keep reviewers inside the review set piece rather than
   as full characters? Proposal: yes.

### A4 questions (answered and documented)

1. Story spine: the PI's project and the paper's core claim?
2. The contract clock: why twelve weeks, and what deadline drives it?
3. Act structure: three acts of four turns; what escalates in each?
4. The PI's arc: does the PI change, harden, or fall?
5. The two colleagues: who are they, and what arcs do they carry?
6. Fixed events: which anchors (funding review, conference, rent, the review)
   hold the acts in place?
7. Endings: which three or four paths, and what determines each?
8. Tone curve: how does the comedy thin across the acts?
9. Meta moments: where does the institution break the fourth wall?

### A3 questions (answered and documented)

1. Action costs: each action trades a week and energy in different amounts; is
   that the right shape?
2. Energy: five segments, and a crash at zero costs the next week and leaves a
   consequence?
3. Standing (up-or-out): publication progress, PI favour, and colleague
   goodwill raise it; failed demands and complaints lower it; ejection comes
   with two turns of warning?
4. Integrity: hidden, with clear feedback after each complicity action, and
   consequences in the endings?
5. Relationships: permanent rupture is possible; no soft undo?
6. Money: one recurring rent event that forces a choice (ask the PI for an
   advance, take a side job, borrow from a colleague)?
7. Quitting: always available with confirmation and its own ending?
8. Escalation: the institution raises costs and staleness as the acts progress?

### A2 questions (answered and documented)

1. Turn shape: one week per turn, twelve turns, three actions each, or a
   different rhythm?
2. Main screen: a desk board showing requests, manuscript, and resources, with
   the 3D department used for atmosphere and selected scenes?
3. Experiments: abstract assignments of two to four steps rather than a
   detailed simulation?
4. Moving standard: a visible publication-requirements meter that the PI edits
   with add, reframe, and revert, with evidence marked current or stale?
5. Complicity actions: inflate a claim, drop a replicate, take credit, flatter
   the PI, dump work; each buys survival and costs integrity, relationships, or
   both?
6. Resources and failure: time, energy, and standing visible; integrity hidden
   with visible symptoms; relationships persistent; a recurring pay-and-rent
   event; zero energy causes a crash, not death; standing below the line causes
   a warned ejection?
7. The review set piece: five to eight minutes, absurd and partly arbitrary
   reviewer reports that the player can learn to game?
8. The reveal: the goalpost is designed to move; how openly should the game
   admit this while staying legible and warned?

### Session 0 raw answers (Leonardo, unapproved)

1. A personal artistic outlet and a portfolio project for directing LLM agents.
   A survival game inside academia: fun but a harsh critique, with absurdist
   tones like _The Stanley Parable_, without recreating that game.
2. The game argues that academia rests on toxic, exploitative labour of junior
   figures, almost a pyramid scheme: you climb one step or you are out. It
   laughs at this while still criticising what is rotten.
3. The laugh is recognition: "haha, I was exploited that way too". People who
   tried an academic career and left are the most likely to enjoy it.
4. The intended feeling: "haha, this is terrible and it is exactly what I went
   through".
5. The pressure: ridiculous hours for meagre pay, constant burnout, and the
   moment of publication revealing that the hard work is glossed over or judged
   very superficially by reviewers.
6. The PI makes increasingly absurd paper requests; experiments cost time and
   energy; the PI demands more, changes their mind, ignores input, and forces
   restarts that loop back to the beginning. Leonardo asked for help turning
   this into a clear game system, and for a more fitting name if one exists.
7. Boundaries are unresolved beyond "never bland or boring".
8. Non-negotiable: the critique of academia and the sarcastic, caustic,
   absurdist tone. Everything else can change or be given up.
9. One run: 60 minutes maximum. Cutscenes are dropped.
10. Inspirations: _The Stanley Parable_ (meta-game, sophisticated humour),
    _Superliminal_ (unique identity), _1984_ and _Sostiene Pereira_ (living
    inside a dystopian authority).

### Block A1 decisions so far (Leonardo, 2026-09-10)

- Inspirations corrected: _The Stanley Parable_, _Superliminal_, and
  _Mini Metro_ (minimalist visual style). _1984_ and _Sostiene Pereira_ are
  removed.
- Title: keep _Minor Revisions_. _The Last Author_ is recorded as a candidate
  to re-evaluate later.
- Meta layer: diegetic institutional voice, with occasional surprising meta
  moments. Confirmed.
- Form: compact 3D department plus a desk/interface layer. Confirmed.
- Audience: comprehension required for non-academics; insider recognition
  rewarded. Confirmed.
- Failure: early ejection or quitting is a real, warned ending. Confirmed.
- Money: one recurring pay and rent pressure event. Confirmed.
- Cast: the PI plus two colleagues, written deeply. Confirmed.
- Replay: three or four meaningfully different sacrifice paths. Confirmed.
- Scientific field: a complete change is confirmed. Soil microbiome or deep
  biosphere remains open, with a primary-agent recommendation awaiting
  Leonardo's choice.
- Content darkness: open, with a three-level primary-agent recommendation
  awaiting Leonardo's choice.

Block A1 is complete when the scientific field and the darkness level are
chosen. `01-vision.md` is written after that.

## Session 0 questions

1. In one sentence, what is the game? If that is hard, describe the single
   moment you most want a player to experience.
2. What should the player feel at the beginning, the middle, and the end?
3. What is the central recurring tension or impossible choice?
4. What does the player actually spend their time doing, and how does that
   create pressure?
5. Finish this sentence: "The game argues that ______."
6. What must never happen, and what would make you say "that's not it"?
7. How long is one run, and how much replay do you want?
8. What should the ending leave behind: relief, anger, sadness, resolve, or
   ambiguity?
9. Name two or three works and what exactly you envy in each.
10. What is non-negotiable, and what are you willing to give up?

## Carry-over observations from the v1 reviews (inspiration, not decisions)

The three independent reviews of the v1 documents, recorded in the v1 AI-use
log, found these recurring risks. They are prompts for Phase A and may be
rejected:

- The core loop repeated the same five stages across the experiment templates,
  with differences mostly at the label level.
- Roughly fifteen minutes of authored mandatory scenes supported a three-hour
  target; most story arrived through records and repeated systems.
- The comedy used one dominant register across narration, dialogue, notices,
  and collectibles; the likely reaction was wry recognition rather than
  laughter.
- Characters were schematic: one pressure, one quirk, one scene each.
- Hidden numeric states conflicted with the promise of fair, legible rules.
- A balance audit found the intended honest play style over budget in both
  pressure profiles, and a "Thin" evidence tier was unreachable.
- One human evaluator, with external playtesting disallowed, limited what
  could be learned about fun, comprehension, and humour before release.
- The v1 identity worth re-examining was the pairing of a claim/integrity
  system with institutional surrealism, and the manuscript as a moral object.

## Open items carried into Block A1 (prompts, not decisions)

- Target run length, including whether short and dense with high replay beats
  a longer campaign.
- Presentation and perspective: first-person 3D, a 3D/hybrid with
  decision-focused interaction, or a 2D or 2.5D form.
- Number of principal characters and depth per character.
- Number of authored experiments and how much routine is abstracted.
- Whether limited private playtesting is allowed.
- Content word budget and how much of it is dialogue versus system text.
