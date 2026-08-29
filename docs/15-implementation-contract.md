# Implementation Contract

Status: **B10 documented; implementation specification in progress; code prohibited**

## Authorization gate

No agent or contributor may implement game code until S00–S14 are documented,
the technical-specification gate is complete, and `00-design-index.md` records
Leonardo's separate vertical-slice implementation approval. Completion of the
technical baseline does not itself grant that approval.

No agent may create a remote, push a remote, publish a release, deploy the
game, add a public licence file, import an unverified asset, or change a
creative decision without a new Leonardo instruction.

## Source-of-truth order

1. Leonardo's explicit current instruction.
2. Latest approved numbered design document for creative intent, game rules,
   and player-visible meaning.
3. Frozen files under `docs/implementation/specs/` for exact technical
   contracts.
4. This implementation contract and its requirement map.
5. `docs/decision-log.md` and `docs/implementation/decisions.md` for approval
   and supersession history.
6. Approved content IDs and text keys.
7. Tests and code, which must conform to all higher sources.

Conflicts must be surfaced. An implementation specification cannot silently
change a numbered design decision. An implementation worker may not choose a
creative or shared technical answer merely because it is easier to code.

## Requirement format

Requirements use MR-REQ-DOMAIN-NUMBER. A requirement record must contain its
ID, behaviour, source document, acceptance criteria, linked tests, primary
work package, dependencies, and status. The initial status is approved design,
not implemented.

| Requirement | Behaviour and acceptance criteria | Source | Test | Primary work package |
|---|---|---|---|---|
| MR-REQ-VISION-001 | Preserve understandable, bitterly comic institutional satire through active play and plausible bureaucratic accretion. Prefer broad comprehension to academic precision in required text, keep optional nuance, and keep science, architecture, evidence meaning, and human stakes grounded. Keep active play engaging and absurdist as the arc becomes darker. | 01, 02, 04, 05, 06, 09, 10, 12 | MR-TEST-VISION-001, MR-TEST-CONT-001 | MR-WP-08 |
| MR-REQ-LOOP-001 | Implement the approved action costs, `MR-ACT-BREAK`, five queue lines, six internal reactions, five exit responses, 64-period calendar, pressure profiles, universal warnings, energy rules, crash, and no pre-W16 global game over. Preserve the R03-updated economy fixture results until Leonardo approves a later balance change. | 02, 07, 12 | MR-TEST-EXP-001, MR-TEST-NARR-001 | MR-WP-01 |
| MR-REQ-EXP-001 | Implement the five-stage loop, active-sample limit, exact sample/equipment states, one monitoring window per normal run and two for oxygen loss, physical rack and imaging interaction, raw-first interpretation, selected reading and caveat, stop triage, record creation, and non-actionable science boundary. The full build requires all six templates. The fallback requires exactly laser/sham, combined range/repair, batch, and oxygen. | 02, 04, 10, 12 | MR-TEST-EXP-001, MR-TEST-UI-001 | MR-WP-01 |
| MR-REQ-EXP-002 | Use the approved biological issue mapping, projected and final outcome bands, locked seed variation, evidence-quality priority and definitions, support points, current reachability bounds, and batch/oxygen response-card inputs. Control, observation, fatigue, and raw-record handling must not alter biological reality. Do not reprice evidence or infer repeat yield without later Leonardo approval. | 04, 07 | MR-TEST-EXP-001 | MR-WP-01 |
| MR-REQ-EXP-003 | Never present the repair state as proven cause of recovery or expose a real laboratory protocol. | 04, 12 | MR-TEST-CONT-001 | MR-WP-08 |
| MR-REQ-NARR-001 | Run the fixed 16-week campaign, seven mandatory scenes, initial manuscript, mandatory Week-6 contradiction, Week-7 reversal, two-form reviewer reports, PIIM response, and Week-16 decision in the approved order. | 03, 12 | MR-TEST-NARR-001 | MR-WP-08 |
| MR-REQ-NARR-002 | Deliver messages, records, rejections, and safe-gated scenes without unsafe interruption or silent expiry. | 02, 03, 12 | MR-TEST-NARR-001 | MR-WP-08 |
| MR-REQ-CHAR-001 | Implement the ten optional character scenes, eight bounded contextual lines, Week-5 opening-caution variant, drug-result acknowledgement, non-numeric five-segment trust presentation, five once-per-campaign support results, credit rules, concern visibility and response, Camila call, and exact route conditions. | 03, 05, 07, 10, 12 | MR-TEST-CHAR-001 | MR-WP-08 |
| MR-REQ-WORLD-001 | Implement one continuous accessible floor with approved stations, exact declining background roster, anchors, act states, text-only bureaucratic accretion, ten glance items, navigation limits, no player trapping, and exactly the three catalogued operational room states. Each operational state needs its visible forecast, expiry fallback, and two-or-more stated routes. | 06, 10, 11, 12 | MR-TEST-WORLD-001, MR-TEST-CONT-001 | MR-WP-03 |
| MR-REQ-END-001 | Resolve routes, paper state, integrity, fatigue, public-withdrawal variant, unchosen route, and all five relationship consequences into the approved irreversible final choice and 29 ending modules. | 08, 12 | MR-TEST-END-001 | MR-WP-01 |
| MR-REQ-END-002 | Store the 12 most recent chronological Departures and the separate twelve-item Institutional Citation collectible set without gameplay carry-over or an implied required run count. | 08, 11, 12 | MR-TEST-END-001, MR-TEST-SAVE-001 | MR-WP-02 |
| MR-REQ-ART-001 | Follow stylized institutional realism, institutional-surrealism limits, text-only accretion, asset budgets, provenance checks, and public-redistribution boundary. | 06, 09, assets | MR-TEST-RELEASE-001 | MR-WP-03 |
| MR-REQ-AUDIO-001 | Implement the approved ambience, cue, music, non-lexical dialogue, caption, mute, and no-voice-acting boundaries. | 05, 09, 12 | MR-TEST-UI-001, MR-TEST-A11Y-001 | MR-WP-06 |
| MR-REQ-UI-001 | Implement semantic HUD, Research Status, desk hub, subordinate queue flavour, close-range environmental text, the fixed manuscript-board positions and factual requirements panel, menus, costs, projected-band reasons without exact probabilities, raw-first analysis, stop consequences, confirmations, text keys, and no objective-arrow rule. | 02, 10, 12 | MR-TEST-UI-001 | MR-WP-05 |
| MR-REQ-A11Y-001 | Meet the approved scale, contrast, caption, motion, input, Interaction Assist, and small-view criteria. | 10 | MR-TEST-A11Y-001 | MR-WP-05 |
| MR-REQ-SAVE-001 | Use one validated IndexedDB active save, backup, migration, recovery, Archive, local-data clear, and no save cookie or expiry. | 10, 11 | MR-TEST-SAVE-001 | MR-WP-02 |
| MR-REQ-TECH-001 | Use the approved strict TypeScript, Vite, direct Three.js, local dependency, deterministic rules, manuscript and reviewer state, forecast/reason validation, build-specific string validation, no-network architecture, S02 module graph, one-way imports, single application coordinator, state ownership, specialist resource ownership, lifecycle, request queue, frame loop, and failure boundaries. | 11, implementation S01–S02 | MR-TEST-TECH-001, MR-S02-FIX-001–010 | MR-WP-00 |
| MR-REQ-PERF-001 | Meet the graphics-profile, build-size, browser, reference-device, resource, and measurement boundaries. | 09, 11, 13 | MR-TEST-PERF-001 | MR-WP-09 |
| MR-REQ-CONTENT-001 | Use stable content IDs, validated JSON, one build-specific strings.en.json, fixed forecast and reason keys, saved reviewer variants, no generated text, excluded-build text removal, and the 6,000-word limit. | 03, 05, 12 | MR-TEST-CONT-001 | MR-WP-01 |
| MR-REQ-CONTENT-002 | Ship the approved full and fallback content counts, fourteen contextual lines, five queue lines, five exit responses, operational room states, defined optional desk references, dependencies, expiry, effects, records, citations, and environmental items. | 06, 08, 12 | MR-TEST-CONT-001 | MR-WP-08 |
| MR-REQ-TEST-001 | Meet automated, browser, private-evaluation, traversal-and-repetition evidence, and coverage targets. | 13 | All MR-TEST IDs | MR-WP-09 |
| MR-REQ-RELEASE-001 | Preserve privacy, title/brand, licence, attribution, remote, and portfolio-handoff boundaries. | 01, 09, 13, 14 | MR-TEST-RELEASE-001 | MR-WP-09 |

## Planned work packages and ownership

The paths below are planned future paths. They are not created by this
document. A worker owns the listed paths only for its package. Shared design
documents, content interfaces, and integration files require explicit
coordination.

| Work package | Owned planned paths and responsibility | Depends on | Required evidence |
|---|---|---|---|
| MR-WP-00 Foundation | package files, TypeScript/Vite setup, static check configuration, `src/bootstrap`, `src/application`, `src/platform`, and architecture checks | Gate approval, frozen shared interfaces | Clean local quality commands, dependency record, compatibility and S02 architecture fixtures |
| MR-WP-01 Rules and content schema | src/rules, src/content, schemas, deterministic PRNG, commands, experiment, ending resolver | MR-WP-00 | Rule fixtures, schema checks, content-validation output |
| MR-WP-02 Persistence | src/persistence and persistence tests | MR-WP-00, MR-WP-01 state interface | Save, backup, migration, recovery, Archive fixtures |
| MR-WP-03 World and rendering | src/world, src/rendering, visual-resource ownership, approved asset-loading boundary, floor collision and visibility | MR-WP-00, verified asset records | Continuous-floor checks, visual-resource ownership notes, navigation checks |
| MR-WP-04 Input and interaction | src/player, src/input, src/interaction | MR-WP-00, MR-WP-03 target interface | Keyboard/controller action tests and focused-view checks |
| MR-WP-05 UI and accessibility | src/ui, semantic overlays, menu, settings, status, accessibility tests | MR-WP-01, MR-WP-02, MR-WP-04 interfaces | UI, scale, captions, small-view, and input evidence |
| MR-WP-06 Audio and cutscenes | src/audio, src/cutscenes, audio-resource ownership, cue wiring, skip and input restoration | MR-WP-01, MR-WP-03, MR-WP-05 interfaces | Audio ownership and fallback, caption, and cutscene save/skip tests |
| MR-WP-07 Vertical-slice integration | Week-1 selected content, integration fixes, slice evidence | MR-WP-01 through MR-WP-06 | Vertical-slice private gate evidence |
| MR-WP-08 Campaign content integration | Remaining full or fallback content data, scene wiring, record and ending text integration | MR-WP-07 | Content counts, route matrix, citation and ending checks |
| MR-WP-09 Quality and release preparation | Test harness, performance audit, asset/dependency audit, private evidence and release checklist | All prior packages | Verify command output and approved release-boundary audit |

MR-WP-07 is the first integration target. MR-WP-08 begins only after the
vertical-slice gate passes. MR-WP-09 can prepare non-mutating checks during
development, but it cannot publish, create a remote, or deploy.

## Worker-assignment contract

Every future worker assignment must state:

- the objective and owned paths;
- the exact requirements, content IDs, dependencies, and acceptance criteria;
- the model and reasoning effort selected for the task;
- allowed inputs, prohibited scope, and unresolved decisions;
- the required tests, evidence, and documentation update;
- asset, privacy, accessibility, and performance limits; and
- the integration contact and expected handoff.

Workers are not alone in the repository. They must preserve and accommodate
other work, never revert unrelated changes, avoid overlapping edits, report a
conflict instead of guessing, and update their work to fit compatible changes.
They cannot make a design decision, publish a change, contact Leonardo, or
modify a remote.

Each completed package must have a private contribution record with the date,
requirements, model, reasoning effort, instructions, owned files, output,
tests, review result, Leonardo's corrections, and final commit.

## Branch, review, and integration rules

Until a remote exists, main remains the local integration branch. A future
worker uses an approved short-lived branch named work/MR-WP-number-topic unless
Leonardo explicitly approves another local workflow. A worker makes atomic
commits that name its work package and does not bundle unrelated formatting.

Before integration, the primary reviewer must:

1. inspect the full diff and staged paths;
2. verify requirement and content-ID links;
3. run the applicable quality commands and test fixtures;
4. check save, accessibility, asset, privacy, and performance implications;
5. record any known limitation; and
6. confirm that no unapproved creative or technical scope entered the change.

Parallel work is allowed only for non-overlapping owned paths with frozen
interfaces. Shared rules, content schemas, and integration files have one
named owner at a time. Runtime imports must follow S02; browser adapters cannot
call one another. No worker force-pushes, rewrites history, creates a remote,
or pushes a remote.

## Requirement-level definition of done

A requirement or work package is done only when:

1. its approved behaviour and failure path are implemented;
2. every linked requirement, content object, and text key is valid;
3. its linked automated and browser tests pass;
4. it preserves save, migration, accessibility, input, and cutscene effects;
5. it has no unsupported science, generated text, hidden telemetry, or
   unverified asset;
6. it meets the applicable performance and download boundary;
7. its documentation, traceability, and contribution record are current; and
8. Leonardo reviews and accepts the integrated result.

Code running once, a green screenshot, a successful build, or agent
self-report is not enough.

## Specification and measurement boundary

The S01–S14 programme decides exact tool versions, dependencies, schemas,
interfaces, algorithms, source ownership, asset and codec policy, supported
browser boundary, measurement methods, targets, and failure responses before
code begins. Asset candidates can be researched and approved, but no asset
file enters the repository during specification.

The programme does not invent execution results. Integrated asset hashes,
measured browser behaviour, measured performance, measured build size, and
play-evaluation results become facts only after the applicable build exists.
Remote timing, public visibility, release timing, and portfolio deployment
also remain subject to separate Leonardo instructions.

Nothing in this contract authorizes implementation before the technical
baseline and the separate design-index gate are explicitly approved.
