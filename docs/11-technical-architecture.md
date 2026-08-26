# Technical Architecture

Status: **B04 interaction and continuity constraints added; stack and schemas unresolved**

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

## Required architectural capabilities

- Deterministic or inspectable game-state transitions.
- Asynchronous experiment scheduling and monitoring.
- Data-driven authored events and conditional narrative triggers.
- Manuscript version history and contradictory request tracking.
- Relationship, paper, integrity, energy, evidence, and career-route state.
- Cutscene sequencing with skip, captions, checkpoint, and input restoration.
- Modular epilogue composition.
- Asset provenance and runtime asset inventory.
- Local save serialization, validation, migration, and recovery.
- Test hooks for state combinations and time progression.

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
