# Technical Architecture

Status: **B10 documented; implementation approval pending**

## Scope and boundary

This document defines the approved technical direction for the first release.
It does not authorize game code, package files, production assets, a remote,
or deployment work. B10 is documented, but the implementation gate remains
blocked until Leonardo gives separate approval.

S02 defines the exact subordinate module graph, public ports, lifecycle,
ownership, frame order, and error boundaries in
`implementation/specs/02-module-architecture.md`.

The game is a self-contained static browser game. It has no account, server
data, uploaded player data, analytics, telemetry, runtime API, runtime CDN, or
runtime network dependency after its static files are delivered. A later
portfolio task may publish a static build only. It must not copy this source
into the portfolio repository or reuse *Wanderer* code or assets without a
separate rights and provenance review.

## Stack and build policy

- Use strict TypeScript and Vite.
- Use direct Three.js for the 3D scene. Do not use React, React Three Fiber, or
  a full game engine.
- Use semantic HTML and CSS overlays for all important interface content.
- Keep runtime dependencies limited to Three.js, `idb`, and Zod. Bundle them
  locally. Do not load a runtime dependency from a CDN.
- Use `npm` and commit its lockfile. S01 freezes the exact Node LTS, npm,
  package, configuration, and command baseline in
  `implementation/specs/01-toolchain-and-repository.md`. Gate 2 requires a
  fresh compatibility, security, licence, clean-install, and verification
  check; a failed check reopens the affected S01 contract.
- Do not add a service worker in the first release. Normal browser caching is
  allowed, but the game makes no promise that a first launch works offline.

## Runtime modules and ownership

Each module has one primary responsibility. Game rules must not import or
depend on Three.js. Rendering code must not decide campaign outcomes.

| Module | Primary responsibility | Rules boundary |
|---|---|---|
| Bootstrap | Prepare fatal errors and boot UI, check the environment, create modules, and transfer ownership. | It creates no campaign and contains no campaign rule. |
| Application | Coordinate ordered requests and own the active in-memory campaign state. | It alone sends commands to rules and distributes returned state and effects. |
| Platform | Report required browser capabilities and page visibility. | It cannot inspect campaign or saved data. |
| Game rules | Validate typed commands and return the next serializable state plus presentation effects. | It is deterministic for a given state, command, and saved variation. |
| Authored content | Hold validated data for experiments, events, dialogue conditions, room states, and endings. | It has stable identifiers and no rendering objects. |
| Persistence | Validate, migrate, save, load, recover, archive, and clear local records. | It stores validated serializable snapshots only. |
| World | Maintain plain world presentation and bounded movement and interaction context. | It owns no browser object and cannot change campaign state. |
| Rendering | Own the Three.js renderer, visual resources, cameras, lighting, visibility, and graphics profile. | It displays state and effects only. |
| Input | Own raw browser input, pointer lock, controller input, and remapping. | It sends requests or frame input and cannot change campaign state directly. |
| Player | Calculate first-person movement and look from plain input and collision context. | It owns no Three.js camera and cannot change campaign state. |
| Interaction | Resolve nearby valid targets and focused actions. | It returns a typed application request and cannot apply it. |
| UI and accessibility | Render semantic overlays, menus, captions, settings, prompts, and browser-view safety. | It receives read-only projections and sends requests. |
| Audio | Own audio buffers, nodes, buses, cues, and audio settings. | It consumes approved requests and cannot carry required meaning alone. |
| Cutscenes | Own presentation timelines, skip, checkpoints, and input-restoration instructions. | It consumes approved effects and cannot advance campaign rules or time directly. |

Tests stay under `tests/`. Each runtime module has one public entrance and no
browser module can import another browser module. Rules contain no browser
dependency. S02 contains the exact allowed import directions and twelve
application ports.

## State, rules, and authored data

### Campaign state

The active campaign source of truth is one serializable `CampaignState`. It
contains at least:

- campaign and schema versions, stable campaign identifier, and saved seed;
- semester clock, pressure profile, energy, evidence, Elena's paper confidence,
  integrity, and working trust;
- active sample groups, sample-condition history, equipment state, biological
  issue counts, projected and final preparation bands, locked variation values,
  monitoring and observation coverage, stop logs, raw records, evidence cards,
  selected readings, and selected caveats;
- manuscript slot contents, card connections, selected caveat, factual
  requirements state, committed snapshots, contradictory-revision task state,
  saved reviewer variants, PIIM response cards, paper state, and authorship and
  integrity history;
- received messages, route state, character and scene state, floor act state,
  support-result consumption, concern and reminder state, consumed contextual
  and environmental-line IDs, cutscene recaps, and permanent consequence
  flags; and
- the identifiers and state needed for the ending card and Institutional
  Citation evaluation.

It contains no Three.js objects, DOM nodes, audio nodes, functions, real-time
timestamps that drive play, or browser-specific object references. S03 now
defines its exact ten-section shape, stable IDs, stored-versus-derived facts,
safe integers, immutable histories, cross-section invariants, complete initial
fixture, rejected fixtures, and canonical JSON representation. `MR-IF-002` is
candidate `v1`; later blocks cannot add campaign fields silently.

### Commands, effects, and deterministic variation

Every meaningful campaign action is one of the 24 S04 typed commands in seven
families. One pure `applyRuleCommand` operation validates it against the
current state and separate validated content. It returns Applied with a new
complete state and ordered effects, Rejected with one of 15 expected codes, or
Fault with one of six contract or invariant codes. A rejection or fault leaves
state, revision, history, time, energy, variation, and effects unchanged.

The closed presentation-effect union is `saveCheckpoint`, `showNotice`,
`startCutscene`, `playAudioCue`, and `completeCampaign`. An effect requests
browser or presentation work. It cannot change campaign truth.

The game uses a small deterministic pseudo-random number generator. S04 fixes
the two namespaces, versioned UTF-8 key, FNV-1a constants, unsigned
campaign-seed combination, one Mulberry32 step, and 0–99 mapping. A new
campaign stores its seed. When an experiment starts, the game records its
locked variation and current projected preparation band. The band is derived
from visible biological issues and can change through later sample, equipment,
stabilizing, or monitoring events. The last monitoring or resolution command
records the final band. The locked value then selects only inside that band.
Reloading cannot reroll the value or reverse a saved band change.

PIIM keeps its separate approved locked response-band rule. The PRNG never
replaces authored causal rules or allows a result outside its approved final
band. Controls, observation coverage, zero-energy fatigue, and record handling
are evidence-quality inputs and cannot modify biological reality.

Manuscript resolution is deterministic. A commit command validates slot
capacity and card references, calculates Met, Missing, Conflict, and
Unsupported states, records PIIM card states when relevant, applies the stated
effects, and stores a snapshot. Unmet requirements do not invalidate the
command. The Week-7 scene cannot become eligible until the initial draft and
`MR-TASK-REMOVE-CAUTION` commits are both stored.

Every event, experiment, manuscript revision, scene, ending module, and
permanent consequence has a stable identifier. Authored data is validated by
Zod before use. Invalid authored data is a development error, not a fallback
random event.

S04 also fixes the time and energy operation, experiment and evidence rules,
manuscript and integrity truth, PIIM buckets, career-route checks, and ending
resolver. `MR-IF-003` and `MR-IF-004` are candidate `v1`. S05 fixes the pure
scheduler and campaign-facing cutscene coordination. S06 now defines authored
content and candidate `MR-IF-006`. S07 now defines persistence and candidate
`MR-IF-007`. S09–S10, S12, and S14 still own their named connected contracts
and freeze evidence.

### Content and strings contract

The source catalogue in 12-content-specification.md is the design authority.
S06 defines its exact subordinate `content/` tree, strict manifest and family
files, explicit full, fallback, and slice profiles, one English
`strings.en.json`, compatibility mappings, validation order, and candidate
`MR-IF-006`. JSON stores IDs, conditions, effects, action-cost IDs,
dependencies, windows, expiry, and test links. The English file stores all
player-facing text keys and values.

Every meaningful action object has one fixed forecast key. Every material
state effect has one fixed reason key. The UI can present separate authored
labels, values, and reason fields, but cannot generate or assemble prose. A
full build contains and counts the full-build English strings. A fallback build
contains and counts only the fallback selection; excluded content is not
bundled as unreferenced text. Either shipped file must remain within 6,000
unique English words.

CampaignState stores a content version, immutable build profile, selected
content variants, completed and expired one-time content IDs, and citation
unlock IDs. It stores no copied dialogue or report text. A content migration
must preserve an existing selection or replace it only with an explicitly
mapped compatible item.

Successful validation creates immutable metadata, rules, presentation, and
string views. Rules and scheduler receive no English values. Raw JSON is not
read outside the content module. A failed check creates no partial content,
changes no save, and never switches build profile.

The rules module may select a saved approved variant. It must not assemble
sentences, use a language model, fill an arbitrary template, or create a new
event. The validator must reject duplicate IDs, missing string keys, invalid
dependencies, invalid effect targets, and a count outside the B10 catalogue.
It must also reject an operational room state without a visible window,
forecast, expiry response, and at least two valid routes with different stated
costs. Optional desk work must reference a defined character, career, wording,
or room-state content ID.
The validator must also reject a meaningful action without a forecast key, a
material effect without a reason key, a manuscript card in an invalid or
duplicate slot, a missing PIIM-card rule, more than two variants for one
reviewer, an invalid reviewer condition, or a build-specific English string
file above the word limit.

### Safe-point scheduler

The pure rules-owned scheduler runs only after campaign creation, an applied
command, event-presentation completion, or validated load. It returns one S04
system command, notification, scene cue, settled result, or typed fault at a
time. The application completes that instruction before it asks again. The
scheduler reads the calendar and conditional authored events, queues each
eligible event once, and respects crash, experiment-attention, deadline,
message, room, cutscene, and final-campaign order. It does not use elapsed real
time, browser timers, frames, focus, or background-tab time to advance campaign
state. Implementation S05 defines candidate `MR-IF-005` and its required
future fixtures.

## World, rendering, and interaction runtime

The complete Bellwether floor uses one continuous Three.js scene. There are no
room loading screens, gameplay portals, crowd simulation, or runtime network
requests. One initial loading screen prepares all required campaign assets
before Continue or New Game becomes available.

Specialist modules own their resources. Rendering owns Three.js geometry,
materials, textures, GLB/glTF scenes, and animation resources. Audio owns audio
buffers and audio nodes. There is no general shared resource manager or port.
The application controls preparation order but owns no browser resource.

The rendering module must:

- own loaded geometry, materials, textures, and GLB/glTF scenes;
- share reusable resources where practical and dispose only resources it owns;
- use visibility control, corridor sightline limits, and lower-detail distant
  rooms so that only two or three nearby rooms need full detail;
- prepare already-loaded later-act resources safely in the background without
  visible pop-in;
- preserve the B07 floor plan, room access, and no-character-trapping rule;
  and
- retain no untracked GPU resource after a long session, an act transition,
  or a completed campaign.

The audio module applies the equivalent ownership and cleanup rule to audio
buffers and nodes. A resource shared inside one specialist module has one named
owner. World and cutscenes exchange plain requests and presentation data only.

Use a kinematic first-person player controller, static collision shapes, and
interaction raycasts. Do not add a physics engine. Physical characters use
authored anchors and short authored paths. Do not add a general navigation
mesh, pathfinding system, or free NPC roaming.

S08 now fixes the exact floor plan, collision footprints, player dimensions and
movement limits, camera values, anchors, target volumes, focused-station
geometry, projection, no-trap rules, and related future fixtures in
`implementation/specs/08-world-geometry-and-interaction.md`. This document
keeps rendering, resource, animation, and cutscene presentation ownership with
S10.

Use Three.js animation mixers for reusable animation clips. A small
code-owned cutscene timeline controls camera, actor movement, dialogue,
audio, checkpoints, skipping, choices, and input restoration. A reload never
restores half-open UI, pointer lock, or an incomplete animation. It resumes at
the last verified safe state and provides the approved recap when needed.
Rules retain all authority for choices, time, scene results, and campaign
state. One temporary presentation token connects one active request to its
responses. Skip before a required choice advances only to that choice. After a
saved result, interruption uses closing or recap recovery and never reapplies
the result. S05 defines the draft campaign-facing part of `MR-IF-011`; S10 must
still define camera, actor, audio, resource, and full restoration behaviour.

## Interface, input, and audio runtime

All important UI is semantic HTML and CSS outside the canvas. The canvas does
not contain the only copy of text, an important choice, a caption, or a state
cue. The UI layer implements the B08 scale, contrast, reduced-motion,
Interaction Assist, caption, and small-browser-view rules.

Input is action-based. The default controller roles are:

- left stick: movement;
- right stick: look;
- south face button: interact and confirm;
- View button: Research Status; and
- Menu button: pause or go back.

Keyboard and mouse use the approved B08 defaults. Both input systems support
all core actions and remapping. Pointer lock is active only during free
first-person movement. It is released for UI, focused views, menus, and
cutscenes.

One Web Audio API Audio Manager owns Master, Music, Ambience/Effects, and
Dialogue Sounds buses. It starts only after player interaction. Required
meaning remains available through text, captions, icons, or visible state when
audio is unavailable or muted.

## Local persistence and recovery

Use IndexedDB database `minor-revisions`, starting at layout version `1`. Its
exact stores and singleton keys are:

| Store | Contents | Retention |
|---|---|---|
| `settings` | `current`; audio, display, control, accessibility, and local-data preferences. | Until the player clears local data. |
| `activeCampaign` | `current`; one validated unfinished canonical campaign envelope. | Replaced at each verified safe save. |
| `activeCampaignBackup` | `previous`; one last-known-good campaign envelope. | Stores the prior active record that passed validation. |
| `endingCards` | Campaign ID; compact completion records shown as **Departures**. | Keep the 12 highest completion sequences. |
| `institutionalCitations` | `current`; Citation IDs and first-unlock sequences. | Persists between campaigns. |
| `metadata` | `database`; layout version, direct migration history, and next completion sequence. | Managed only by persistence. |

Before a save, validate the complete canonical campaign, content references,
profile, version, and S05 safe point. Enforce the 1 MiB canonical-JSON limit.
In one transaction, preserve the prior verified active record as backup and
write the new active record. Exact retry is idempotent. Older, conflicting,
invalid, quota-failed, or concurrent-tab writes change neither record. Save
and Quit waits for the correct transaction and reports failure clearly.

On load, validate active and backup separately. Continue loads active only. If
active is missing or unusable and backup is valid, offer recovery; never select
backup silently. Accepted recovery copies validated backup to active and keeps
backup unchanged. If neither record is usable, offer confirmed campaign-only
discard. Do not use a cookie for save state, ownership, or discovery.

Migrations are forward-only direct approved steps. Each validates its source,
creates and validates a copy, and only then writes. Campaign migration needs
confirmation and preserves the source as backup. A failed migration leaves the
source unchanged. Game state never uses real elapsed time.

At completion, one transaction assigns a completion sequence, stores the card,
merges Citation first-unlock sequences, retains the 12 highest sequences,
advances metadata, and removes active and backup. Departures appears newest
first without empty slots or a completion percentage. New Game confirms and
atomically replaces a usable active campaign. Clear Saved Data confirms and
deletes the complete database after connections close. S07 defines targeted
Archive repair, metadata recovery, the operation queue, the eight-operation
candidate `MR-IF-007`, and all failure cases.

## Browser, deployment, and performance boundary

The start-up compatibility check tests WebGL2, IndexedDB, ES modules, Web
Audio API, pointer lock, and standard controller API support. Missing WebGL2,
IndexedDB, or ES modules blocks campaign creation and explains the reason.
Missing controller support keeps keyboard-mouse play available and clearly
states that controller play is unavailable. The normal first-person release
requires pointer lock and Web Audio support.

The supported desktop-browser targets are current Chrome, Edge, and Firefox.
Automated browser tests run on Chromium, Firefox, and WebKit. Safari is a
best-effort compatibility target only. Do not claim Safari support in public
material without direct Safari test evidence.

The reference performance class is an 11th-generation Intel i5 with Intel Iris
Xe graphics, 16 GB RAM, and current Chrome. Later performance evidence must
name the exact device model, graphics driver, operating system, browser, and
browser version. The target is 60 fps at 1920 × 1080 in Standard and 30 fps at
1280 × 720 in Low on that reference class. The initial compressed download
target is no more than 75 MB. It must not exceed 100 MB without renewed
approval.

One graphics-profile module owns Low, Standard, and High. These profiles change
visual cost only, such as shadow quality, render scale, and cosmetic effects.
They never change rules, route access, information, accessibility content, or
outcomes. A local build audit reports the compressed initial-download size.
Frame-rate and long-session resource evidence comes from manual profiling on
the reference device and supported browser targets; CI cannot make a truthful
frame-rate claim by itself.

## Errors, testing, CI, and maintenance

The game has no analytics or automatic error reporting. It shows a plain local
error message and a copyable sanitized diagnostic code. It must not include a
save payload, player name, browser storage contents, or other personal data.

Use these quality tools after implementation is authorized:

| Tool | Required use |
|---|---|
| Vitest | Pure rules, commands, state transitions, schemas, migrations, deterministic variation, and ending-state fixtures. |
| Playwright | Boot, compatibility, New Game, save and reload, backup recovery, keyboard interaction, browser-view safety, UI scale, and key accessibility flows. |
| ESLint | TypeScript code-quality checks. |
| Prettier | Consistent TypeScript, CSS, JSON, and Markdown formatting checks where configured. |

The local quality commands will be `npm run check` for type, lint, format, and
unit checks; `npm run test:e2e` for browser tests; `npm run build` for the
production build; and `npm run verify` for the complete local gate. The B10
coverage targets, private evaluation method, and performance pass evidence are
defined in 13-testing-and-evaluation.md.

After Leonardo approves a public GitHub remote, a GitHub Actions workflow may
run the same checks on pushes and pull requests. It does not deploy the game,
use deployment secrets, or send player data. Before each release, and after a
runtime dependency change, review runtime dependency security and licence
status. Do not use an automatic dependency-update bot. Every asset and
dependency must continue to meet the public redistribution, modification, and
attribution boundary.

## Deliberate later verification

- Exact Node and package versions are frozen in S01 before implementation and
  rechecked before Gate 2. Actual installation and command results remain
  future evidence.
- Exact source assets, audio codecs, source file hashes, and measured
  performance are verified before their integration or public claim.
- A future external Safari test service could provide direct Safari evidence,
  but it is not part of the approved first-release plan.

Nothing in this document authorizes implementation before the design-index
gate is explicitly approved.
