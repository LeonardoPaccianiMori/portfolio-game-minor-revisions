# Incremental Development Roadmap

Status: **C01–C06 approved on 2026-09-06; current authority is the correction sections below and the interface register. Earlier B/R/S lifecycle records are historical. Runtime evidence remains step-specific.**

Last updated: 2026-09-02

## Purpose

This roadmap divides local development of the complete _Minor Revisions_ game
into 70 small implementation and evaluation steps after Step 0. It replaces a
one-shot vertical-slice build with frequent Leonardo reviews. It does not
silently change the approved game design or frozen `MR-IF-001`–`MR-IF-015`
interfaces; later evidence-led revisions follow the approved governance rule.

The final target remains the complete approximately three-hour game. Step 70
means that the complete game works locally and Leonardo has accepted it.
Licence creation, a remote, public release, deployment, and portfolio work are
outside this roadmap and need separate plans and approvals.

## Authority and change rule

The authority order remains the order in `roadmap.md`. This file controls only
the order and size of implementation increments.

- A step cannot start from this roadmap alone.
- Before each step, the primary agent gives Leonardo an exact implementation
  plan with purpose, owned files, requirements, tests, local run method,
  Leonardo test, known exclusions, proposed commit message, and a delegation
  table. The table names each task, role, owned paths, dependencies, exact
  model, reasoning effort, selection reason, focused source packet, and whether
  it runs in parallel or sequence. When the primary agent retains an
  implementation task, the table states why a worker would not improve it.
- Leonardo must explicitly approve that one plan.
- Approval of one step does not approve a later step.
- A later step waits for every stated dependency and Leonardo's acceptance of
  the prior checkpoint.
- Test evidence can reveal a repair or a missing intermediate step. The primary
  agent must explain the proposed roadmap change and receive Leonardo's
  approval before changing this list or implementing the new work.
- A repair inside an approved step is allowed only when it stays inside that
  step's approved purpose and files. A material scope or contract change needs
  a new plan and approval.
- Any earlier Bxx, Rxx, Sxx, roadmap, interface, or other project decision can
  be revised or removed with evidence, impact review, Leonardo's approval,
  authoritative-record updates, and explicit supersession. An accepted step
  remains historical evidence.

## Standard step cycle

Every Step 1–70 uses this cycle, including evaluation-only Steps 31, 53, and
70:

1. Read `development-status.md`, `ai-use-log.md`, and the authoritative design
   and technical documents for the step.
2. Inspect Git state and all accepted dependencies.
3. Present the exact step plan and wait for Leonardo's approval.
4. Create the required stored work order and contribution record. Select and
   pass the exact model and reasoning effort in the S13 routing matrix to every
   spawned subagent; do not rely on inherited defaults.
5. Implement only the approved scope in the controlled local Git workflow.
6. Run the step's automated, static, browser, and integration checks.
7. Complete a primary pre-review audit, obtain one independent read-only review,
   and correct every blocker or required finding. The reviewer reports all
   findings from its complete packet in one result. Repeat applicable checks
   and obtain a fresh review after a technical or material-governance
   correction. A narrow record-only or mechanical-formatting correction uses
   focused primary validation unless it changes authority, evidence meaning, or
   a technical claim that cannot be mechanically checked.
8. Integrate the reviewed result on local `main` and run the applicable full
   verification.
9. Start the game locally when the step has a player-visible result. Give
   Leonardo one plain-language test packet with the objective, controls,
   actions, expected results, what to report, and a safe stop or recovery step.
10. Correct approved-scope defects. After a technical or player-visible
    correction, repeat applicable checks, obtain a fresh independent review,
    and repeat Leonardo testing until the result is acceptable. Record-only and
    mechanical-formatting corrections use the narrower review rule in step 7.
11. Leonardo explicitly accepts the step. Technical checks cannot replace his
    player-experience judgment.
12. Update `development-status.md`, `step-acceptance-log.md`,
    `ai-use-log.md`, the work order, contribution record, evidence summaries,
    and affected control documents. Commit the accepted state locally. No
    remote action occurs.

The primary agent also creates a local committed resume checkpoint whenever a
step enters `plan approved`, `implementing`, `technical review`, `Leonardo
testing`, `correcting`, `accepted`, `blocked`, or `superseded`. The checkpoint
records the exact active plan, work order, contribution record, evidence,
defect, and next permitted action. A later session does not continue from an
uncommitted conversation state.

For a documentation-only, automated-only, or invisible foundation step,
Leonardo's check can be a short result review instead of direct play. The step
plan must say this before approval.

## Decision revision and review cadence

Any earlier project decision can be revised or removed after evidence emerges.
The primary agent records the old and proposed decision, reason, impact on
interfaces, consumers, saves, tests, content, assets, accessibility, privacy,
and roadmap, then obtains Leonardo's approval before changing authoritative
records or dependent work. The prior decision remains visible as
`superseded`; an accepted step remains historical evidence.

Before each independent review, the primary agent runs one complete audit of
the approved scope, current records, requirements, tests, privacy, and claims.
The reviewer receives the reconciled complete packet and reports all findings
at once. Full fresh review is required after a correction affecting code,
runtime behaviour, dependencies, security, privacy, accessibility,
test-contracts, interfaces, or material governance. Narrow status, reference,
prose, or formatting corrections that do not change authority, evidence
meaning, or a technical claim that cannot be mechanically checked use focused
primary validation and complete diff review. A correction that changes any of
those things requires a full fresh independent review.

## Responsibility boundary

| Participant         | Responsibility                                                                                                                                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Leonardo            | Owns creative direction, priorities, scope decisions, aesthetic selection, player-experience judgment, private play testing, defect observations, step approval, step acceptance, roadmap changes, and every public decision.                                           |
| Primary Codex agent | Owns repository inspection, step plans, technical explanation, code and test implementation, local-server operation, automated and browser checks, debugging, licence and provenance checks, integration, durable status records, and plain-language test instructions. |
| Read-only reviewer  | Reviews the controlled diff and evidence for errors, contract violations, missing tests, privacy, accessibility, and provenance problems. It cannot change files or accept a step.                                                                                      |

AI contribution records must describe the actual agent work. They must not
present Leonardo as the manual author of code that an agent wrote. Leonardo's
creative direction, design decisions, test observations, approvals, and
acceptance remain his contributions.

## Delegation and model routing

Delegation is useful when work is independent, bounded, and improves speed,
coverage, or context isolation. It is not useful merely because an agent is
available. The primary agent owns the plan, Leonardo communication, decisions,
integration, validation, and durable records. It can use the controlled worker
for one non-overlapping implementation assignment, the fresh-context reviewer
for each approved implementation result and technical or material-governance
correction, and the asset researcher before Leonardo selects a candidate.
Record-only and mechanical-formatting corrections follow the narrower review
cadence above. Each receives a focused source packet rather than the complete
chat.

The exact Sol, Terra, Luna, reasoning-effort, unavailable-model, `max`, and
`ultra` rules are authoritative in S13. A step may run at most two subagents
at once. A worker cannot review its own work or spawn another agent.

## Temporary and final assets

Early steps can use simple project-created shapes, flat colours, text, and
synthetic test sounds. They must be marked as temporary and must not be
presented as the final aesthetic.

Any external or generated candidate needs a dedicated research and approval
step before integration. Research must show source, creator, exact licence,
public redistribution and modification rights, attribution, likely technical
fit, cost, and known risk. Leonardo reviews the candidate and approves,
rejects, or requests modification. A candidate does not enter the repository
until its manifest record and the integration plan are approved. Modified
assets return to Leonardo for review before acceptance.

Steps 33–38 each have two controlled substeps. Substep A is research, rights
verification, candidate comparison, and Leonardo's selection or requested
modification. It ends with a committed decision checkpoint and imports no
candidate. Substep B starts only after the selected candidate has an approved
manifest record and Leonardo approves a separate integration plan. It imports,
modifies when approved, integrates, and tests only that material. Leonardo
reviews a modified asset again before he accepts Substep B. Approval of Substep
A never authorizes Substep B.

## Definite step list

The `Depends on` column gives the minimum accepted predecessor. A later plan
can also name additional technical dependencies from S13.

Three terms in the list have these plain-language meanings:

- `IndexedDB` is the browser's private local storage for game saves and
  settings.
- A `traceability manifest` is a list that connects each approved requirement
  to its check and evidence.
- `Interaction Assist` is an optional accessibility setting that makes it
  easier to select and use nearby objects.

| Step | Deliverable and Leonardo checkpoint                                                                                                                                                                                                                                                                                                                        |                                 Depends on |
| ---: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------: |
|    0 | Record this incremental workflow, preserve the S01–S14 baseline, and request separate Gate-1 approval. No code, package, test, asset, or deployment file exists.                                                                                                                                                                                           |                                          — |
|    1 | Create the exact S01 package baseline and a basic local start page. Leonardo confirms that the local page opens and identifies the game without an error.                                                                                                                                                                                                  | 0 and separate Gate 1 plus Step-1 approval |
|    2 | Add compatibility checks, startup diagnostics, loading state, and clear safe error screens. Leonardo checks one normal start and controlled failure messages.                                                                                                                                                                                              |                                          1 |
|    3 | Add the S02 application structure, lifecycle, request queue, and clean shutdown with temporary adapters. Leonardo reviews the visible startup result; automated checks prove module boundaries.                                                                                                                                                            |                                          2 |
|    4 | Add the S03 initial campaign state and S04 command/result foundation. Leonardo checks a private diagnostic view that shows controlled state changes without exposing raw save data.                                                                                                                                                                        |                                          3 |
|    5 | Add S06 source content envelopes, slice/fallback/full profiles, strings, and validation. Leonardo checks understandable validation results; only the slice profile is allowed to be complete.                                                                                                                                                              |                              4 and Gate 4A |
|    6 | Add the S12 fixture schema, traceability manifest, shared test utilities, and initial foundation evidence. Leonardo reviews the plain-language evidence summary.                                                                                                                                                                                           |                                          5 |
|    7 | Render the first temporary Three.js room with no external asset. Leonardo checks that the scene loads and remains stable.                                                                                                                                                                                                                                  |                              6 and Gate 6A |
|    8 | Add temporary lighting, materials, science display, resize handling, and graphics presets. Leonardo compares the visible presets and checks that information is not colour-only.                                                                                                                                                                           |                                          7 |
|    9 | Build the exact S08 floor with temporary geometry, openings, collision surfaces, room labels, and recovery anchors. Leonardo reviews the floor from fixed inspection points.                                                                                                                                                                               |                                          8 |
|   10 | Add first-person keyboard, mouse, and controller movement plus camera rules. Leonardo tests movement, comfort, collision, and safe recovery.                                                                                                                                                                                                               |                                          9 |
|   11 | Add interaction targeting, highlight, prompts, reach, obstruction, and environmental inspection. Leonardo tests correct and incorrect targets.                                                                                                                                                                                                             |                                         10 |
|   12 | Add focused-station entry, camera transition, station actions, cancellation, and restoration. Leonardo tests that control always returns safely.                                                                                                                                                                                                           |                                         11 |
|   13 | Add IndexedDB creation, settings storage, automatic saving, Continue, backup rotation, and confirmed New Game replacement. Leonardo closes and resumes a controlled local campaign.                                                                                                                                                                        |                                         12 |
|   14 | Add recovery, repair, migration offers, stale-tab protection, Archive support, and Clear Saved Data. Leonardo tests safe controlled recovery cases with supplied instructions.                                                                                                                                                                             |                                         13 |
|   15 | Add main menu, pause, controls, remapping, settings, and safe campaign exit after the required rules, persistence, and interaction boundaries are accepted. Leonardo tests navigation with keyboard, mouse, and the available controller path.                                                                                                             |                                         14 |
|   16 | Add the first complete accessibility and responsive-layout foundation: scale, contrast, reduced motion, captions, focus, Interaction Assist, and unsupported-size blocking. Leonardo tests his preferred settings and recovery.                                                                                                                            |                                         15 |
|   17 | Add New Game, protagonist name up to 64 visible characters, pronouns, opening setup, and onboarding. Leonardo tests valid and rejected identity input and the opening flow.                                                                                                                                                                                |                                         16 |
|   18 | Add the 64-period semester, energy, pressure, Research Status, action costs, warnings, and break action. Leonardo tests visible cause and effect without needing internal numeric knowledge.                                                                                                                                                               |                                         17 |
|   19 | Add crossed-period processing, safe points, scheduler queue, crash handling, and Week-16 boundary rules. Leonardo checks a short controlled time-transition scenario.                                                                                                                                                                                      |                                         18 |
|   20 | Add messages, notifications, notices, room events, reminders, expiry, and duplicate prevention. Leonardo checks that information arrives once and at a safe time.                                                                                                                                                                                          |                                         19 |
|   21 | Add experiment selection, sample grouping, preparation, checks, action costs, and temporary station feedback. Leonardo tests the Choose and Prepare stages.                                                                                                                                                                                                |                                         20 |
|   22 | Add incubation, asynchronous timing, monitoring windows, intervention, missed monitoring, and equipment or sample state. Leonardo tests Incubate and Monitor trade-offs.                                                                                                                                                                                   |                                         21 |
|   23 | Add analysis, biological variation, evidence quality, caveats, repetition, abandonment, and record creation. Leonardo completes the full temporary experiment loop and checks causal feedback.                                                                                                                                                             |                                         22 |
|   24 | Add the manuscript board, claims, figures, requirements, revision history, integrity warnings, and immutable commits. Leonardo tests a contradictory revision request.                                                                                                                                                                                     |                                         23 |
|   25 | Add text-led dialogue, choices, relationship trust, concerns, support results, and consequences with temporary presentation. Leonardo checks clarity and tone in a short conversation sequence.                                                                                                                                                            |                                         24 |
|   26 | Add the cutscene timeline, checkpoints, skip rules, captions, restoration, and synthetic temporary audio. Leonardo tests complete, skipped, interrupted, and resumed scenes.                                                                                                                                                                               |                                         25 |
|   27 | Research representative visual and audio candidates and build no asset until Leonardo approves the benchmark selection and any permitted modifications.                                                                                                                                                                                                    |                            26 and Gate 26A |
|   28 | Integrate the approved benchmark assets in one representative slice area and add the slice science presentation. Leonardo approves the style direction or requests rework.                                                                                                                                                                                 |                                         27 |
|   29 | Add the complete approved early-weeks slice tutorial, dialogue, narrative, manuscript rehearsal, experiment, messages, and completion content. Leonardo reviews its words, humour, clarity, and pacing.                                                                                                                                                    |                                         28 |
|   30 | Connect the complete slice journey and verify save, recovery, accessibility, supported browsers, performance method, and privacy. Leonardo completes a guided pre-slice check.                                                                                                                                                                             |                                         29 |
|   31 | Run Leonardo's 20–30-minute private slice review, correct blockers and approved-scope defects, and record explicit slice acceptance.                                                                                                                                                                                                                       |                                         30 |
|   32 | Add the five-act campaign shell, phase transitions, content slots, and complete local traversal without final prose. Leonardo checks the campaign map and transition clarity.                                                                                                                                                                              |                                         31 |
|   33 | In Substep A, research and approve the modular environment asset set. In a separately planned and approved Substep B, add the approved manifest records and integrate only selected items and approved modifications. Leonardo reviews the integrated environment.                                                                                         |                                         32 |
|   34 | In Substep A, research and approve laboratory equipment and prop families. In a separately planned and approved Substep B, add the approved manifest records and integrate only selected items and approved modifications. Leonardo reviews the integrated equipment and props.                                                                            |                                         33 |
|   35 | In Substep A, research or create and approve organoid, trace, imaging, and science-effect candidates. In a separately planned and approved Substep B, add the approved manifest records and integrate them. Leonardo checks legibility, tone, motion, and fiction safety.                                                                                  |                                         34 |
|   36 | In Substep A, research or create and approve character concepts, models, silhouettes, and shared animation candidates. In a separately planned and approved Substep B, add the approved manifest records and integrate only selected designs and approved modifications. Leonardo reviews the integrated characters.                                       |                                         35 |
|   37 | In Substep A, research and approve final fonts, icons, interface templates, contrast values, and institutional graphic language. In a separately planned and approved Substep B, add the approved manifest records, integrate the selection, and test it. Leonardo reviews the integrated interface.                                                       |                                         36 |
|   38 | In Substep A, research or create and approve room ambience, interface cues, six music roles, and five non-lexical dialogue palettes. In a separately planned and approved Substep B, add the approved manifest records, integrate the selection, and test caption and mute redundancy with no voice acting. Leonardo reviews the complete audio direction. |                                         37 |
|   39 | Complete and tune the fallback laser/sham experiment template with final presentation and content. Leonardo tests its identity and decisions.                                                                                                                                                                                                              |                                         38 |
|   40 | Complete and tune the fallback combined damage-range/repair experiment template with final presentation and content. Leonardo tests its wider-condition and interpretation decisions.                                                                                                                                                                      |                                         39 |
|   41 | Complete and tune the fallback batch experiment template with final presentation and content. Leonardo tests its replication and evidence trade-offs.                                                                                                                                                                                                      |                                         40 |
|   42 | Complete and tune the fallback oxygen-deprivation experiment template with final presentation and content. Leonardo tests its distinct risk and monitoring pattern.                                                                                                                                                                                        |                                         41 |
|   43 | Complete manuscript progression, the PI confidence and integrity model, PIIM cards, and response consequences. Leonardo tests a controlled manuscript arc.                                                                                                                                                                                                 |                                         42 |
|   44 | Complete preprint, submission, rejection, peer-review forms, reviewer demands, messages, and safe narrative ordering. Leonardo tests a controlled publication sequence.                                                                                                                                                                                    |                                         43 |
|   45 | Complete academic and industry route readiness, irreversible final choice, paper states, relationship consequences, and modular ending resolver. Leonardo tests representative ending vectors.                                                                                                                                                             |                                         44 |
|   46 | Author and integrate fallback Act 1 with final-safe prose and content validation. Leonardo plays and approves the act.                                                                                                                                                                                                                                     |                                         45 |
|   47 | Author and integrate fallback Act 2. Leonardo plays and approves the act, including the manuscript contradiction.                                                                                                                                                                                                                                          |                                         46 |
|   48 | Author and integrate fallback Act 3. Leonardo plays and approves submission and rejection pacing.                                                                                                                                                                                                                                                          |                                         47 |
|   49 | Author and integrate fallback Act 4. Leonardo plays and approves competing futures and review pressure.                                                                                                                                                                                                                                                    |                                         48 |
|   50 | Author and integrate fallback Act 5, epilogues, Archive, Departures, Institutional Citations, and replay return. Leonardo tests representative conclusions.                                                                                                                                                                                                |                                         49 |
|   51 | Complete fallback character schedules, room states, lighting periods, environmental accretion, and declining institute roster. Leonardo checks continuity and navigation throughout the acts.                                                                                                                                                              |                                         50 |
|   52 | Complete fallback balance, repetition, accessibility, save/recovery, direct-browser, performance, memory, loading, asset, licence, and privacy checks. Leonardo reviews the complete fallback evidence packet.                                                                                                                                             |                                         51 |
|   53 | Run Leonardo's approximately 90-minute private fallback review, correct blockers and approved-scope defects, and record explicit fallback acceptance.                                                                                                                                                                                                      |                                         52 |
|   54 | Expand and accept full content for Weeks 1–2 while preserving the accepted opening.                                                                                                                                                                                                                                                                        |                                         53 |
|   55 | Expand and accept full content for Weeks 3–4, including separate full-game damage-range and repair-state templates in place of the fallback combined template.                                                                                                                                                                                             |                                         54 |
|   56 | Expand and accept full content for Weeks 5–6.                                                                                                                                                                                                                                                                                                              |                                         55 |
|   57 | Expand and accept full content for Weeks 7–8.                                                                                                                                                                                                                                                                                                              |                                         56 |
|   58 | Expand and accept full content for Weeks 9–10.                                                                                                                                                                                                                                                                                                             |                                         57 |
|   59 | Expand and accept full content for Weeks 11–12, including the full-game cardiotoxic-drug template and its commercial and integrity pressure.                                                                                                                                                                                                               |                                         58 |
|   60 | Expand and accept full content for Weeks 13–14.                                                                                                                                                                                                                                                                                                            |                                         59 |
|   61 | Expand and accept full content for Weeks 15–16 and the complete late-gate order.                                                                                                                                                                                                                                                                           |                                         60 |
|   62 | Complete and accept Haoran's optional scenes, support, concerns, credit effects, and ending afterbeats.                                                                                                                                                                                                                                                    |                                         61 |
|   63 | Complete and accept Samira's optional scenes, support, concerns, rivalry or alliance effects, and ending afterbeats.                                                                                                                                                                                                                                       |                                         62 |
|   64 | Complete and accept Gabriel's optional scenes, facility support, institutional memory, boundaries, and ending afterbeats.                                                                                                                                                                                                                                  |                                         63 |
|   65 | Complete and accept Camila's messages, remote call, offer, route effects, portrait presentation, and ending afterbeats.                                                                                                                                                                                                                                    |                                         64 |
|   66 | Complete and accept Elena's remaining interactions plus editor, reviewer, administrator, committee, and collaborator remote roles.                                                                                                                                                                                                                         |                                         65 |
|   67 | Complete replay variation, deterministic selection, repetition control, all route combinations, and all 29 ending modules. Leonardo tests a representative matrix and the Archive.                                                                                                                                                                         |                                         66 |
|   68 | Complete final visual polish, remaining approved assets, animation, lighting, effects, provenance, attribution, and credits. Leonardo performs the final visual review.                                                                                                                                                                                    |                                         67 |
|   69 | Complete final audio, mix, captions, accessibility, browser, performance, memory, loading, long-session, diagnostic, privacy, content, and technical quality work. Leonardo reviews the final evidence packet and plays the required checks.                                                                                                               |                                         68 |
|   70 | Run the complete private approximately three-hour playthrough and clean-context comprehension review, correct all blockers and approved-scope defects, and record Leonardo's final local-game acceptance.                                                                                                                                                  |                                         69 |

## Milestone gates inside the step sequence

| Milestone                  |               Required accepted step | What it permits after a new step plan                      |
| -------------------------- | -----------------------------------: | ---------------------------------------------------------- |
| Technical baseline         | Step 0 plus separate Gate-1 approval | Step 1 only                                                |
| First local runtime        |                               Step 1 | Step 2                                                     |
| Core loop proof            |                              Step 26 | Asset benchmark research in Step 27                        |
| Vertical-slice acceptance  |                              Step 31 | Step 32; it does not authorize the fallback as one batch   |
| Fallback acceptance        |                              Step 53 | Step 54; it does not authorize the full game as one batch  |
| Full local-game acceptance |                              Step 70 | A later release-candidate or public-action discussion only |

## Current position

Step 0 and the S00–S14 documents are complete. Leonardo approved Gate 1,
accepted Steps 1 and 2, and approved the exact Step-3 application-lifecycle
plan on 2026-09-02. The controlled worker submitted `MR-WO-WP00-005` at
`f4130acb6f555cb55ff09f30b5f89e3ca49a4d89`. The complete primary audit
passed. Fresh independent technical review found no technical issue and one
narrow current-record correction. Focused primary validation of that
correction passed. The exact reviewed worker range is integrated on local
`main` as `d2a63f5` and `d26ffe1`. Complete main-branch validation passed.
Leonardo confirmed the four expected lines after repeated reloads and
explicitly accepted Step 3 on 2026-09-02. He then approved the exact Step-4
plan and evidence-led `MR-IF-002 v2` creation-input refinement. The first two
submissions and complete audit passed their checks, but complete independent
review blocked integration. Leonardo approved `MR-IF-002 v3` and superseding
`MR-WO-WP01-002` and `MR-WO-WP00-007`. The rules correction runs first; the
diagnostic correction waits for its verified submission.
The next complete review found four further required issues. The resumed Sol
`high` worker proved that `v3` could not represent the exact route and PIIM
prerequisites and stopped without edits. Leonardo approved frozen
`MR-IF-002 v4`, active `MR-WO-WP01-003`, and waiting `MR-WO-WP00-008` on
2026-09-03.
Step 5, Three.js, game systems, asset research, a remote, licence, deployment,
and public action remain blocked.

## Correction gates attached to existing steps

These named gates do not create new integer steps or work packages. They do not authorize later steps as a batch.

- Gate 4A, before revised Step-4 acceptance: approve the corrected creative/technical baseline and named schedule targets; review and validate the amended Step-4 candidate before integration and Leonardo's existing acceptance exercise.
- Gate 6A, attached to Step 6: preserve the reference traces and semantic cases as fixture data and map each to an existing requirement. Steps 5–6 provide content envelopes, schema, manifest and test utilities. Content for future acts may remain an explicitly incomplete test-only fixture; no production profile is falsely marked complete. Execute only rules that exist. Replay calendar/monitoring parts after Steps 18–23, and claim cases after Step 24. Complete full journeys when their remaining rules arrive.
- Gate 26A, after Step 26 and before Step 27: run a temporary internal scenario starting at period 43 with an oxygen window due, a manuscript revision and a colleague/career opportunity with a competing deadline. Use existing temporary rooms and text. Steps 18–26 supply clock, scheduler, monitoring, records, board, relationships and presentation. Pull forward only the career-task completion/expiry subset from Step 43 if Step 25 does not yet expose it. Do not implement final career selection for this gate.
- In the same gate, run a tail scenario starting at period 56. If final route choices or ending resolution are needed, pull forward only their pure transition subset from Steps 44–45 and use test-only result modules. Keep final prose and presentation in Steps 46–50. A fixture which merely declares an ending passed is insufficient. Required tests cover exact 63 boundary, no extra advance, finalization once, and the ability to reach a valid ending when optional tasks were missed.
- Before Step 27 benchmark selection, review feasibility for every planned asset role: possible approved source route, licence/cost evidence status, adaptation work and technical uncertainty. This is planning evidence; no candidate is selected, imported or purchased. Steps 33–38 still require their existing research/selection and separate integration plans.

The Step-26 plan must list exact relocated rule functions, exclusive paths and tests before implementation. The corresponding later step removes only duplicated implementation, retaining full integration and acceptance. Do not claim the pressure or tail gate has passed until its actual runtime dependencies and test evidence exist.

## Routing pointer

S13 is the authority for prospective Astra/Sol/Terra/Luna routing and actual-use records. Earlier model descriptions above preserve the pre-correction workflow only. The integer Step 0–70 IDs and ten work-package IDs remain unchanged.

## 2026-09-06 — Corrected Step 4 and Gate 4A accepted

Leonardo explicitly accepted corrected Step 4 after supplying the expected diagnostic and normal-page screenshots. C01–C06 approval, amended-code checks, complete/focused reviews, local integration, main verification and user acceptance complete Gate 4A. Steps 1–4 are accepted. The next permitted action is the separate exact Step 5 plan for S06 source content envelopes, profiles, strings and validation; no Step 5 implementation is approved. Current authority: development-status.md and the latest step-acceptance-log.md entry. Earlier correction-cycle descriptions above remain historical evidence.

## 2026-09-07 — Approved GitHub synchronization

Leonardo authorized origin `git@github.com:LeonardoPaccianiMori/portfolio-game-minor-revisions.git`, an initial main push and automatic pushes of future approved, validated, reviewed and integrated main commits. The destination was empty when inspected. The primary owns fetch/integration/push; work branches remain local. Earlier no-remote restrictions are superseded for this exact destination and operation only. No licence, deployment, release or visibility change is authorized. Step5 remains in preparation; D3 is still pending. AGENTS.md contains the continuing synchronization rule. The actual push result is verified against origin/main and reported after execution.
