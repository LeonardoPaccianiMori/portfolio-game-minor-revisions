# Technical Architecture

Status: **B10 documented; implementation approval pending**

## Scope and boundary

This document defines the approved technical direction for the first release.
It does not authorize game code, package files, production assets, a remote,
or deployment work. B10 is documented, but the implementation gate remains
blocked until Leonardo gives separate approval.

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
- Use `npm` and commit its lockfile. At implementation start, record one
  supported Node LTS version in `.nvmrc`. Exact package and Node versions are
  an implementation-start record, not a reason to change the approved design.
- Do not add a service worker in the first release. Normal browser caching is
  allowed, but the game makes no promise that a first launch works offline.

## Runtime modules and ownership

Each module has one primary responsibility. Game rules must not import or
depend on Three.js. Rendering code must not decide campaign outcomes.

| Module | Primary responsibility | Rules boundary |
|---|---|---|
| Boot and compatibility | Check browser capabilities, load settings, show truthful loading and error screens. | It creates no campaign until required capabilities pass. |
| Rendering and world | Own the Three.js renderer, continuous floor scene, cameras, lighting, graphics profile, and resource visibility. | It displays state and effects only. |
| Player and input | Own first-person movement, look, pointer lock, controller input, remapping, and focused-view transitions. | It sends action requests; it does not change campaign state directly. |
| Interaction | Resolve nearby valid targets and open focused station views. | It turns player intent into typed rule commands. |
| Game rules | Validate typed commands and return the next serializable state plus presentation effects. | It is deterministic for a given state, command, and saved variation. |
| Authored content | Hold validated data for experiments, events, dialogue conditions, room states, and endings. | It has stable identifiers and no rendering objects. |
| UI and accessibility | Render semantic overlays, menus, captions, settings, prompts, and browser-view safety. | It reads state and sends commands through the input layer. |
| Audio and cutscenes | Own audio buses, scene timelines, scene skip, checkpoints, and input restoration. | It consumes approved effects and cannot silently advance time. |
| Persistence | Validate, migrate, save, load, recover, archive, and clear local records. | It stores serializable data only. |
| Tests and developer tools | Test rules, schemas, migrations, browser flows, and build quality. | It has no runtime gameplay authority. |

## State, rules, and authored data

### Campaign state

The active campaign source of truth is one serializable `CampaignState`. It
contains at least:

- campaign and schema versions, stable campaign identifier, and saved seed;
- semester clock, pressure profile, energy, evidence, PI confidence,
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
  cutscene recaps, and permanent consequence flags; and
- the identifiers and state needed for the ending card and Institutional
  Citation evaluation.

It contains no Three.js objects, DOM nodes, audio nodes, functions, real-time
timestamps that drive play, or browser-specific object references.

### Commands, effects, and deterministic variation

Every meaningful action is a typed command. Examples include starting or
monitoring an experiment, analysing a record, committing a manuscript
revision, advancing a work period, answering a message, beginning a scene,
and making a final choice. The rules module validates a command against the
current state and returns:

1. the next `CampaignState`; and
2. a typed list of presentation effects, such as a message, cue, cutscene,
   save request, UI refresh, or sound request.

The game uses a small deterministic pseudo-random number generator. A new
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

### Content and strings contract

The source catalogue in 12-content-specification.md is the design authority.
Implementation must split authored data into validated JSON objects and one
English strings.en.json file. JSON stores IDs, conditions, effects, action
cost IDs, dependencies, windows, expiry, and test links. The English file
stores all player-facing text keys and values.

Every meaningful action object has one fixed forecast key. Every material
state effect has one fixed reason key. The UI can present separate authored
labels, values, and reason fields, but cannot generate or assemble prose. A
full build contains and counts the full-build English strings. A fallback build
contains and counts only the fallback selection; excluded content is not
bundled as unreferenced text. Either shipped file must remain within 6,000
unique English words.

CampaignState stores a content version, selected content variants, completed
and expired one-time content IDs, and citation unlock IDs. It stores no copied
dialogue or report text. A content migration must preserve an existing
selection or replace it only with an explicitly mapped compatible item.

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

The scheduler runs only after an explicit game-time change or another approved
safe state. It reads the calendar and conditional authored events, queues the
next eligible event, and respects experiment-attention and cutscene safety
rules. It does not use elapsed real time, browser timers, or background-tab
time to advance campaign state.

## World, rendering, and interaction runtime

The complete Bellwether floor uses one continuous Three.js scene. There are no
room loading screens, gameplay portals, crowd simulation, or runtime network
requests. One initial loading screen prepares all required campaign assets
before Continue or New Game becomes available.

The rendering and resource manager must:

- own loaded geometry, materials, textures, GLB/glTF scenes, and audio
  buffers;
- share reusable resources where practical and dispose only resources it owns;
- use visibility control, corridor sightline limits, and lower-detail distant
  rooms so that only two or three nearby rooms need full detail;
- prepare already-loaded later-act resources safely in the background without
  visible pop-in;
- preserve the B07 floor plan, room access, and no-character-trapping rule;
  and
- retain no untracked GPU or audio resource after a long session, an act
  transition, or a completed campaign.

Use a kinematic first-person player controller, static collision shapes, and
interaction raycasts. Do not add a physics engine. Physical characters use
authored anchors and short authored paths. Do not add a general navigation
mesh, pathfinding system, or free NPC roaming.

Use Three.js animation mixers for reusable animation clips. A small
code-owned cutscene timeline controls camera, actor movement, dialogue,
audio, checkpoints, skipping, choices, and input restoration. A reload never
restores half-open UI, pointer lock, or an incomplete animation. It resumes at
the last verified safe state and provides the approved recap when needed.

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

Use one versioned IndexedDB database. Its logical stores are:

| Store | Contents | Retention |
|---|---|---|
| `settings` | Audio, display, control, accessibility, and local-data preferences. | Until the player clears local data. |
| `activeCampaign` | One validated unfinished `CampaignState`. | Replaced at each verified safe save. |
| `activeCampaignBackup` | One last-known-good validated active-campaign record. | Stores the prior record that passed validation before the latest safe save. |
| `endingCards` | Compact completion records. | Keep the 12 most recent cards. |
| `institutionalCitations` | Persistent citation unlock record. | Persists between campaigns. |
| `metadata` | Database schema version, migration history, and technical record metadata. | Managed only by the persistence module. |

Before a save, validate the serializable campaign data. In one IndexedDB
transaction, preserve the prior verified active record as backup and write the
new active record. Save and Quit waits for that transaction to complete and
reports a failure clearly if it cannot complete.

On load, validate the active record with its declared schema version. If it
fails, validate and offer the backup. A recovery never overwrites the failing
source record before the player accepts it. If both records fail, explain the
problem in plain language and offer a confirmed reset. Do not use a cookie for
save state, ownership, or discovery.

Migrations are forward-only and tested. A migration reads and validates a
source record, creates a new valid record, and only then replaces the stored
version. A failed migration leaves the source record unchanged. Game state
never uses real elapsed time, so browser closure and connection loss cannot
advance the semester.

At completion, one transaction creates the ending card, retains the 12 newest
cards, updates citations, and removes full active-campaign and backup data.
New Game confirms replacement of an active campaign and creates a new seed.
Clear Saved Data requires confirmation and removes this database, including
settings, campaign records, archive, citations, and metadata. The running UI
then returns to default settings.

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

- Exact Node and package versions are fixed only when implementation begins.
- Exact source assets, audio codecs, source file hashes, and measured
  performance are verified before their integration or public claim.
- A future external Safari test service could provide direct Safari evidence,
  but it is not part of the approved first-release plan.

Nothing in this document authorizes implementation before the design-index
gate is explicitly approved.
