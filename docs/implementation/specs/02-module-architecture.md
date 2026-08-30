# S02 — Module Architecture

Status: **approved technical contract; no implementation authorized**

## Purpose and authority

This specification defines the runtime module graph, public boundaries,
ownership, lifecycle, request ordering, visual-frame ordering, and error
boundaries for *Minor Revisions*. It is subordinate to the numbered design
documents and to the S01 toolchain and repository contract.

This file does not authorize source code, package files, assets, a remote,
licence files, deployment configuration, or implementation work. Detailed
campaign types, rule commands, scheduling, content schemas, persistence data,
world geometry, UI data, rendering data, diagnostics, and executable fixture
formats remain with S03–S12.

## Plain-language terms

| Term | Meaning in this specification |
|---|---|
| Module | One part of the game with one named responsibility. |
| Coordinator | The application module that controls the order of campaign requests and presentation work. |
| Port | A small named list of operations that the application is allowed to use on another module. |
| Adapter | A browser-facing module that implements one port. |
| Projection | Read-only plain data prepared for presentation. It is not the complete campaign state. |
| Bootstrap | The startup code that checks the environment, creates modules, and transfers ownership to the application. |
| Lifecycle | The allowed states and transitions from creation through shutdown. |
| Frame | One visual screen update. It does not advance campaign time. |

## Module inventory

Runtime source uses exactly these public modules. Tests remain under `tests/`
and are not a runtime module.

| Module | Primary responsibility | Explicit exclusion |
|---|---|---|
| `bootstrap` | Establish the fatal-error boundary, prepare startup UI, create dependencies, and start the application. | Does not contain campaign rules. |
| `application` | Coordinate requests, own the active in-memory `CampaignState`, and send projections and effects to ports. | Does not own browser objects. |
| `platform` | Check browser capabilities and report page visibility. | Does not inspect campaign or saved data. |
| `rules` | Validate campaign commands and return a new state and typed effects. | Imports no runtime module and uses no browser object. |
| `content` | Validate and expose authored content through stable plain-data contracts. | Does not render or mutate campaign state. |
| `persistence` | Read, validate, save, recover, complete, and clear local records. | Does not retain the application’s live state object. |
| `world` | Maintain plain world presentation and provide bounded movement and interaction context. | Owns no Three.js, DOM, audio, or storage object. |
| `rendering` | Own Three.js objects, required visual resources, graphics settings, and drawing. | Does not decide campaign outcomes. |
| `input` | Own raw keyboard, mouse, controller, pointer-lock, and binding events. | Does not change campaign state directly. |
| `player` | Calculate movement and viewing direction from plain input and collision data. | Owns no Three.js camera and does not change campaign state. |
| `interaction` | Identify the current valid target and turn an action into a typed application request. | Cannot apply the request. |
| `ui` | Own semantic HTML and CSS screens, menus, prompts, captions, and player-facing errors. | Receives projections, not `CampaignState`. |
| `audio` | Own audio buffers, audio nodes, buses, settings, and spatial audio updates. | Cannot carry required meaning without a non-audio alternative. |
| `cutscenes` | Run presentation timelines and return plain camera, actor, dialogue, choice, and completion instructions. | Cannot advance campaign rules or campaign time directly. |

Do not create broad `shared`, `utils`, `services`, or `managers` runtime
folders. A private helper stays with the module that owns its purpose.

S13 assigns the exact future module owners:

- `MR-WP-00`: `bootstrap`, `application`, and `platform`;
- `MR-WP-01`: `rules` and `content`;
- `MR-WP-02`: `persistence`;
- `MR-WP-03`: `world` and `rendering`;
- `MR-WP-04`: `input`, `player`, and `interaction`;
- `MR-WP-05`: `ui`; and
- `MR-WP-06`: `audio` and `cutscenes`.

One module path has one owner at one time. An integration package cannot edit
a module to repair it silently; the primary agent returns the defect to its
owner through an approved repair work order.

## Public entrances and import graph

Each runtime module exposes one public `index.ts`. A module can import another
module only through that public entrance. Importing another module's private
file is forbidden.

The allowed runtime import direction is:

1. `rules` imports no runtime module.
2. `content` can import only public `rules` types or functions.
3. `application` can import only public `rules` and `content` contracts.
4. Each browser adapter can import only public `application` contracts.
5. `bootstrap` can import every public module entrance for construction.
6. No module can import `bootstrap`.

Browser adapters cannot import one another. Circular imports are forbidden.
The future architecture check must reject a forbidden direction, a circular
import, a private-file import, or a browser object outside its approved owner.

Browser-object ownership is exact:

- Three.js objects stay in `rendering`;
- DOM objects stay in `bootstrap` or `ui`;
- game-database IndexedDB objects stay in `persistence`; the `platform` module
  can own only its empty S11 compatibility-probe handle until it closes and
  deletes that probe;
- audio buffers and audio nodes stay in `audio`; and
- raw browser input events stay in `input`.

## Campaign-state and command boundary

`application` owns the only live in-memory `CampaignState`. `rules` receives a
state value and command and returns a new state plus typed effects. It does not
mutate the supplied state. Detailed state and command types belong to S03 and
S04.

Anything that changes campaign state follows:

`application -> rules -> new state and effects -> persistence and presentation`

Movement, looking, target highlighting, animation, audio position, and drawing
can bypass campaign rules because they do not change campaign state. A browser
failure cannot change campaign state.

Persistence receives validated serializable snapshots. World, rendering, UI,
audio, and cutscenes receive only bounded read-only projections or effects.
No browser module can retain or mutate `CampaignState`.

## Application controller

`application` exports `createApplication(dependencies, validatedContent)`. The
factory returns an unstarted `ApplicationController`.

| Operation | Contract |
|---|---|
| `start()` | Start application-owned services and enter `ready`, or return a typed failure. |
| `stop()` | Stop input and loops first, release all owned resources, and return a typed result. Repetition is harmless. |
| `submit(request)` | Put one typed discrete request through the ordered application path and return its completed result. |
| `updateFrame(frame)` | Perform one visual update. It cannot apply a campaign rule or start unfinished background work. |
| `getStatus()` | Return read-only lifecycle and availability information. It returns no campaign state. |

`ApplicationRequest` is a closed family, not an arbitrary message. Its outer
categories are campaign creation or continuation, campaign rule commands,
save-and-quit work, settings or local-data actions, and recovery choices.
S03, S04, S07, S08, and S09 define the exact connected variants and fields.

Only `bootstrap` receives the complete controller. UI and input receive only
the approved `submit(request)` callback. The timing module receives only the
frame callback. Presentation modules receive pushed projections; they cannot
pull state from the controller.

## Application dependencies and ports

`ApplicationDependencies` is one named object containing exactly twelve
ports. It also receives `ValidatedContent` separately. Pure rules are imported
directly and are not a port.

All port inputs and outputs are typed plain data. A port cannot expose its
implementation object, a general service getter, a browser object, or a
campaign-state reference.

### Platform, timing, and diagnostics

| Port | Public operations |
|---|---|
| `PlatformPort` | `checkCompatibility()`, `startVisibilityWatch(handler)`, `stopVisibilityWatch()` |
| `TimingPort` | `startFrameLoop(handler)`, `pauseFrameLoop()`, `resumeFrameLoop()`, `stopFrameLoop()` |
| `DiagnosticsPort` | `createDiagnostic(fault)` |

`TimingPort` rejects a second permanent loop. Repeated pause and stop are
safe. S11 makes `checkCompatibility()` one single-active asynchronous
operation returning the exact six-entry plain report. It makes
`createDiagnostic(fault)` one synchronous typed conversion returning the exact
sanitized record. `DiagnosticsPort` sends nothing remotely and cannot inspect
saves or campaign data. Bootstrap owns its private diagnostic adapter; S11
does not add a public runtime module.

### Persistence, input, and UI

| Port | Public operations |
|---|---|
| `PersistencePort` | `start()`, `readStartupData()`, `loadCampaign(source)`, `saveCampaign(snapshot)`, `completeCampaign(completion)`, `saveSettings(settings)`, `clearSavedData()`, `stop()` |
| `InputControlPort` | `start()`, `setMode(mode)`, `readFrameInput()`, `applyBindings(bindings)`, `stop()` |
| `UiPort` | `start()`, `showBoot(status)`, `showStartMenu(data)`, `openCampaign(projection)`, `present(projection)`, `updateFrame(frameData)`, `closeCampaign()`, `showFatal(diagnostic)`, `stop()` |

Persistence operations return the S07 common asynchronous success-or-failure
result. S07 fixes their exact inputs, outputs, queue, records, transaction
rules, validation, recovery, migration, Archive, clearing, lifecycle, and
failure codes through candidate `MR-IF-007`. Only `persistence` can access
IndexedDB. Input sends discrete actions through `submit(request)` and supplies
continuous movement and look input once per frame. UI receives no full
campaign state or raw stored record. S09 now fixes the exact five input modes,
device conversion, binding rules, complete revisioned UI projection, semantic
action dispatch, screen lifecycle, settings, and player-facing failure use
through candidate `MR-IF-009` and `MR-IF-010`.

### Player, world, and interaction

| Port | Public operations |
|---|---|
| `PlayerPort` | `start()`, `openCampaign(projection)`, `updateFrame(frameInput, movementContext)`, `closeCampaign()`, `stop()` |
| `WorldPort` | `start()`, `openCampaign(projection)`, `present(projection)`, `getMovementContext(playerData)`, `updateFrame(frameData)`, `getInteractionContext(playerData)`, `closeCampaign()`, `stop()` |
| `InteractionPort` | `start()`, `openCampaign(projection)`, `updateFrame(playerData, interactionContext)`, `resolveAction(action)`, `closeCampaign()`, `stop()` |

Player results contain plain position and view data. Movement and interaction
contexts contain only the collision or target information required for the
current operation. `resolveAction` returns a request and cannot apply it.
S08 fixes the plain frame values, player result, contexts, target geometry,
focus geometry, lifecycle meanings, and S08 fault boundary. S09 now defines
device conversion, remapping, pointer capture, complete focus state, prompts,
and accessibility use. Their connected `MR-IF-009` is candidate `v1`.

### Rendering, audio, and cutscenes

| Port | Public operations |
|---|---|
| `RenderingPort` | `start()`, `prepareRequiredResources(profile)`, `openCampaign(projection)`, `present(projection)`, `applyGraphicsSettings(settings)`, `render(frameData)`, `closeCampaign()`, `stop()` |
| `AudioPort` | `start()`, `prepareRequiredResources()`, `unlockAfterPlayerAction()`, `openCampaign(projection)`, `present(audioRequests)`, `applyAudioSettings(settings)`, `updateFrame(listenerData)`, `closeCampaign()`, `stop()` |
| `CutscenePort` | `start()`, `openCampaign(projection)`, `play(request)`, `updateFrame(frameData)`, `handleAction(action)`, `closeCampaign()`, `stop()` |

Rendering owns every Three.js resource. Audio owns every audio buffer and
node. Cutscenes return plain presentation instructions and cannot apply rules.
Audio unlocking follows browser rules and happens only after a player action.

## Resource ownership

There is no general shared resource service or general resource port.
Specialist ownership replaces the earlier central-resource-manager shorthand:

- `rendering` owns visual geometry, materials, textures, models, and
  animations;
- `audio` owns audio buffers and audio nodes;
- `world` and `cutscenes` use plain requests and projections;
- `application` controls preparation order but owns no browser resource; and
- any resource shared inside one specialist module has one named owner.

The creator owns cleanup unless ownership is explicitly transferred. Shared
resources have one named owner. Cleanup can be repeated safely. A module that
creates a temporary resource cleans its own partial work before it reports
failure.

## Bootstrap, creation, and ownership transfer

`bootstrap` exports `bootstrapApplication(root)`, where `root` is the existing
page area that contains the game. It returns either:

- success with a `BootstrapHandle` that exposes only `stop()` and
  `getStatus()`; or
- failure with a safe player-facing reason and sanitized diagnostic.

Expected compatibility failures are typed results, not unexplained crashes.

Module factories create inactive objects. They do not start permanent loops,
attach permanent listeners, or load large resources. The explicit early boot
screen and fatal-error boundary are the only early startup actions.

Bootstrap owns objects during construction. After `createApplication()`
succeeds, ownership transfers to the controller, including any port that the
approved early bootstrap steps already started. The controller must not start
such a port twice. If failure occurs before transfer, bootstrap cleans created
or started objects in reverse order. `BootstrapHandle.stop()` delegates to the
controller after transfer.

A factory can receive configuration, browser objects that its module owns,
and limited application callbacks. It cannot receive another browser adapter.

## Lifecycle and startup

The application lifecycle is:

`new -> starting -> ready -> stopping -> stopped`

An unrecoverable failure enters `failed`. A stopped or failed controller
cannot restart. Restart requires a new controller or a page reload.

The complete startup order is:

1. Install the fatal-error boundary.
2. Start the boot screen and diagnostic path.
3. Check browser capabilities.
4. Validate authored content.
5. Start persistence, complete approved layout and supporting-record
   migrations, and read safe settings, metadata, campaign, Archive, and
   Citation summaries.
6. Create or start the coordinator and remaining browser modules.
7. Prepare required presentation resources.
8. Start input and show Continue or New Game only when startup is ready.

No campaign is created before required capabilities and content validation
pass. Each required asynchronous step must complete before startup reports
success.

## Campaign opening and closing

Modules that can retain campaign-specific presentation use
`openCampaign(projection)` and `closeCampaign()`. This contract applies to
world, rendering, player, interaction, UI, audio, and cutscenes.

Before a new or loaded campaign opens, input is disabled and the old campaign
is closed completely. The application then supplies fresh projections. A
module cannot retain data, selected targets, active cues, timelines, or other
campaign-specific presentation from the prior campaign.

If campaign opening fails partway through, completed steps close in reverse
order. Repeated closing is harmless.

## Request ordering and asynchronous work

Campaign-changing requests use one ordered queue. The application completes
one request and all work required for its result before it starts the next.
Movement, looking, target updates, and visual frames do not enter this queue.

Pure rules complete immediately. A frame update completes immediately and
cannot start untracked unfinished work. Storage, saving, resource loading, and
stopping can be asynchronous. If success depends on that work, the work must
finish before success is returned. Unfinished work cannot later alter campaign
state silently.

## Visual-frame order

`TimingPort` owns the only permanent visual loop. Each frame uses this order:

1. Read current continuous input.
2. Update an active cutscene or focused view.
3. If free movement is allowed, update player movement and view.
4. Update world presentation.
5. Resolve the current interaction target.
6. Update spatial audio and temporary UI information.
7. Render the completed frame.

If the page becomes hidden, the loop can pause. When it resumes, the first
frame cannot process the missing browser time as movement or animation
catch-up. S08 fixes the safe movement delta at `0.05 seconds`; S11 now fixes
the measurement method and browser-performance evidence boundary. Browser time
never advances campaign time.

## Shutdown

Shutdown first blocks new requests, disables input, and stops the frame loop.
It then closes active cutscenes and campaign presentation before stopping
audio, UI, rendering, world, player, interaction, persistence, platform
listeners, and remaining bootstrap listeners in reverse owned order.

Each owner removes the listeners and resources it created. Shutdown does not
attempt an unsafe page-close save. Repeated stop is harmless, including after
partial startup or failure.

## Failure model and boundaries

There are three outcomes:

| Outcome | Meaning | Campaign guarantee |
|---|---|---|
| Rejected player action | The request is valid in shape but not allowed by current rules. | State is unchanged. |
| Recoverable failure | One module operation failed, but the application can return to a known safe state. | Browser failure cannot change state; a failed save cannot damage the prior safe save. |
| Fatal failure | Campaign integrity is uncertain, an essential module is unavailable, or required cleanup failed. | Campaign commands and input are disabled. |

Expected failures return typed results. Unexpected exceptions are caught at
the module call boundary and converted into typed faults. The failing module
first cleans its partial work; the application then decides reject, recover,
or fail.

Errors are caught at:

1. bootstrap construction and startup;
2. each queued application request and port call; and
3. each visual frame.

Bootstrap also owns browser listeners for otherwise uncaught errors and
unhandled rejected operations. It converts them into the same fatal path and
removes the listeners during shutdown. It does not send data or reload the
page automatically.

A fatal screen uses semantic HTML, disables campaign commands, and shows only
sanitized diagnostic information. It cannot include a save payload, player
name, storage contents, or other personal data.

## Test fakes and architecture acceptance

Every port has a plain test fake under the future `tests/` tree. A fake records
calls and returns configured success, delay, recoverable failure, or fatal
failure. It uses no Three.js, DOM, IndexedDB, audio, real browser event, or real
timer. Application tests use these fakes; browser-adapter tests remain
separate.

S12 will encode the following S02 scenarios in its executable fixture format:

| Fixture ID | Required scenario | Expected result |
|---|---|---|
| `MR-S02-FIX-001` | Complete supported startup | Exact startup order; one ready controller and one frame loop. |
| `MR-S02-FIX-002` | Required capability missing | No campaign or application start; safe compatibility result and reverse bootstrap cleanup. |
| `MR-S02-FIX-003` | Invalid authored content | No campaign start; fatal development result and reverse bootstrap cleanup. |
| `MR-S02-FIX-004` | Failure after some modules start | The failing owner cleans partial work; completed owners stop in reverse order. |
| `MR-S02-FIX-005` | Normal and repeated stop | Input and loop stop first; every owned resource cleans once; later stop is harmless. |
| `MR-S02-FIX-006` | Two campaign requests arrive together | The second begins only after the first and its required effects complete. |
| `MR-S02-FIX-007` | Visual frames during queued asynchronous work | Frames can present the current stable projection but cannot change campaign state. |
| `MR-S02-FIX-008` | Replace or load a campaign | The prior campaign closes completely before fresh projections open. |
| `MR-S02-FIX-009` | Unexpected frame or port exception | It becomes a typed fault; fatal conditions disable input and campaign requests. |
| `MR-S02-FIX-010` | Architecture import scan | Forbidden, circular, private-file, and browser-object boundary violations are rejected. |

These are specification fixtures, not measured test results. No implementation
or executable test exists yet.

## Interface lifecycle

`MR-IF-001`, Runtime bootstrap and application lifecycle, is candidate `v1`
after this specification. `application` owns the controller contract;
`bootstrap` owns the browser startup entry. Planned consumers remain all
runtime modules, UI, and tests.

Candidate status does not authorize code. S12 supplies the final executable
fixture format and exact connected data. S14 performs the cross-interface
consistency audit before `MR-IF-001` can become frozen. Any candidate change
requires an affected-consumer list, compatibility and migration effects,
updated fixtures, and Leonardo's approval.

## Deferred contracts and unchanged gates

The following are deliberately deferred to their owning blocks:

- exact `CampaignState` fields and projections: S03;
- exact rule commands, effects, and transition results: S04;
- scheduler and cutscene state machines: S05;
- authored content and `ValidatedContent` schemas: S06;
- persistence records and transaction algorithms: S07;
- world, movement, camera, and interaction values: S08;
- input modes, UI models, settings, and accessibility detail: S09, now
  documented through candidate `MR-IF-009` and `MR-IF-010`;
- rendering, asset, animation, audio, and cutscene presentation data: S10, now
  documented through candidate `MR-IF-008` and `MR-IF-011`–`MR-IF-013`;
- compatibility, graphics-budget, performance-evidence, and diagnostic fields:
  S11, now documented through candidate `MR-IF-014`; and
- executable fixture format and the acceptance matrix: now documented in S12;
  and
- exact future work-package ownership, dependencies, work orders, review, and
  integration: now documented in S13.

S02 resolves `MR-IMP-OPEN-002`. S03 and `MR-IMP-OPEN-003` are next. Technical
specification, vertical-slice implementation, full-game implementation,
remote, licence, asset, deployment, and public-release gates remain blocked.
