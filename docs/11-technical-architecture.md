# Technical Architecture

Status: **approved through B08; stack and schemas unresolved**

## Confirmed platform

- Browser game built with Three.js.
- Eventual deployment on Leonardo's portfolio website alongside *Wanderer*.
- First-person exploration on a compact university research floor.
- No user account required.
- Real-time in-engine cutscenes.
- Desktop and laptop browser release only; no mobile or tablet first release.
- Keyboard-mouse and standard-controller support.
- English-only release scope.

No framework, bundler, language variant, physics library, animation library,
audio library, testing stack, or hosting integration is selected yet.

## Save direction

Real save state uses IndexedDB. Do not use cookies for save state, ownership,
or save discovery. Saves are browser- and device-specific unless a later
approved export/import feature adds portability. There is no account,
server-side save, uploaded player data, or automatic expiration of an
unfinished save.

Save checkpoints must be safe around cutscenes and major choices. A connection
interruption or browser close must not erase meaningful progress. Schema
versioning and migrations are required before implementation but not yet
designed.

The player experience requires saves at experiment-stage changes, monitoring
choices, analysis archiving, manuscript commits, and scene boundaries. Closing
or pausing the game must not advance game time or cause an experiment check to
be missed. B09 must implement this rule without relying on real-world elapsed
time.

A new game must create and persist a campaign seed. The seed determines only
small variation inside an earned experiment or PIIM response band. Reloading,
closing the browser, or resuming a save must not reroll that variation. B09
owns the exact seed, state-transition, serialization, and migration schema.

A completed campaign must create a compact local ending card and update the
local Institutional Citation archive. The game has one active local save per
browser profile. On completion it removes the full active state; Archive keeps
the 12 most recent ending cards and the persistent citation record. A New Game
uses a new seed and no gameplay state from an earlier campaign. It requires
confirmation when it replaces an active save. B09 owns the exact data schema,
archive recovery, migration, validation, and user-controlled data clearing.

## B08 presentation and performance boundary

Runtime art uses GLB/glTF models, shared geometry and materials where practical,
mostly 1K textures, rare 2K major assets, no 4K textures, live text or SVG for
readable UI, and compressed browser-ready audio. The game has Low, Standard,
and High graphics presets. Standard is the default. Presets change visual cost
only: shadows, render scale, and cosmetic effects.

The target is 60 fps at 1920 × 1080 in Standard on B09 baseline hardware, and
30 fps at 1280 × 720 in Low. The initial compressed download target is no more
than 75 MB and must not exceed 100 MB without renewed approval. Normal browser
cache holds runtime assets; IndexedDB is for local game data. B09 must select
the exact baseline hardware and browser matrix, implement loading and codecs,
and measure these targets.

## Required architectural capabilities

- Deterministic or inspectable game-state transitions and campaign-seed use.
- Asynchronous experiment scheduling and monitoring.
- Data-driven authored events and conditional narrative triggers.
- Manuscript version history and contradictory request tracking.
- Relationship, paper, integrity, energy, evidence, and career-route state.
- Cutscene sequencing with skip, captions, checkpoint, and input restoration.
- Modular epilogue composition.
- Asset provenance and runtime asset inventory.
- Local save serialization, validation, migration, and recovery.
- Local ending-card and Institutional Citation archive persistence.
- Test hooks for state combinations and time progression.
- Settings, captions, scale, contrast, motion, input, and local-data controls
  that satisfy the approved B08 user interface contract.

## B07 continuous-floor constraint

The research floor is one continuous level. Room loading screens, gameplay
portals, and streaming transitions are not allowed. Doors, glass partitions,
and corridor bends limit sightlines. At most two or three nearby rooms need
full visual detail at one time. Distant rooms may use lower-detail geometry,
lighting, sound, silhouettes, and message signals.

B09 selects the rendering, collision, navigation, occlusion, level-of-detail,
and loading implementation. It must preserve the B07 room sizes, clear paths,
automatic core doors, and the rule that characters cannot trap the player.

## Relationship to Unpaid

Historical Three.js prototypes exist at
`/home/lpm/Documents/unpaid-intern-game/game` and
`/home/lpm/Documents/unpaid`. They are inspiration only. Timed pressure,
relationships, witness/visibility consequences, task systems, narration,
branching outcomes, and modular event state may be studied later. No code reuse
is approved without a separate technical and rights review.

## Security and privacy boundary

The game should function without accounts, analytics, or server-side personal
data by default. Any analytics, telemetry, external services, or networked
features require separate approval, privacy review, and failure handling.

## Open decisions

- TypeScript versus JavaScript, build tooling, application structure, and
  dependency policy.
- Rendering pipeline, physics/collision, navigation, animation, audio, and UI
  integration.
- State model, event schema, experiment model, save schema, migrations, and
  corruption recovery.
- Exact browser matrix, baseline device, memory budget, loading budget,
  render scale, and measured frame-time validation.
- Deployment boundary with the portfolio and offline/interruption behaviour.
- Testing layers, CI, error reporting, observability, and dependency updates.
