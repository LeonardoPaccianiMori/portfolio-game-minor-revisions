# Technical Architecture

Status: **approved through B07; stack and schemas unresolved**

## Confirmed platform

- Browser game built with Three.js.
- Eventual deployment on Leonardo's portfolio website alongside *Wanderer*.
- First-person exploration on a compact university research floor.
- No user account required.
- Real-time in-engine cutscenes.

No framework, bundler, language variant, physics library, animation library,
audio library, testing stack, or hosting integration is selected yet.

## Save direction

Real save state should use IndexedDB. A small first-party cookie may be used
only for a save/version marker or preferences if useful; it must not hold the
primary save. Saves are browser- and device-specific unless a later approved
export/import feature adds portability.

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

A completed campaign must create a local ending card and update the local
Institutional Citation archive. A new campaign uses a separate save record and
seed, with no gameplay state carried from an earlier campaign. The archive is
preserved across campaigns. B09 owns the exact data schema, archive recovery,
save-slot policy, and user-controlled data clearing.

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
- Browser/device support, resolution, frame-time, memory, bundle, and loading
  budgets.
- Deployment boundary with the portfolio and offline/interruption behaviour.
- Testing layers, CI, error reporting, observability, and dependency updates.
