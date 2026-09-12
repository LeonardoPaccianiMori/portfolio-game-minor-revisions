# B2 — Architecture and Module Boundaries

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B2).**

## Module list (approved)

| Module        | Responsibility                                                   | Owns                                   |
| ------------- | ---------------------------------------------------------------- | -------------------------------------- |
| `application` | Coordinator, lifecycle, request queue, and the single frame loop | Nothing browser-specific; dependencies |
| `rules`       | Campaign state, commands, outcomes, and determinism              | No browser objects                     |
| `content`     | Schemas, validation, and authored-data views                     | No browser objects                     |
| `world`       | Three.js scene, geometry, and rendering                          | Three.js objects                       |
| `player`      | Movement and camera behaviour                                    | No Three.js objects of its own         |
| `input`       | Raw device conversion: keyboard, mouse, and controller           | Device events                          |
| `interaction` | Targeting, stations, and environmental inspection                | No browser resources                   |
| `ui`          | Desk board, screens, overlays, and captions                      | DOM                                    |
| `audio`       | Audio graph, cues, and sound                                     | Web Audio                              |
| `persistence` | IndexedDB save, recovery, and migration                          | IndexedDB                              |
| `platform`    | Compatibility detection, timing, and browser feature checks      | Browser detection APIs                 |

## Import direction (approved)

- One-way dependencies only; no cycles.
- `rules` and `content` are pure: no DOM, Three.js, IndexedDB, or Web Audio.
- `world` owns Three.js; `persistence` owns IndexedDB; `audio` owns Web Audio;
  `ui` owns the DOM; `input` owns device events.
- Other modules request work through the `application` coordinator.

## Lifecycle (approved)

- One application coordinator owns startup, the frame loop, the request queue,
  and shutdown.
- Startup is ordered; shutdown runs in reverse and is repeat-safe.
- The request queue serializes work that must happen in order.

## Dependencies (approved)

- Dependencies are passed in by the caller. No hidden global singletons.
- Each module can be constructed with fakes for isolated tests.

## Rules purity (approved)

- Rules are deterministic and serializable.
- No I/O in `rules`. Presentation effects are returned as plain data and
  applied by the presentation modules.
- A saved seed governs variation: the same state plus the same command
  produces the same result.

## Failure boundary (approved)

- A safe error screen; sanitized diagnostics; no raw errors shown to the
  player.
- No telemetry, analytics, or external reporting.

## Ownership (approved)

- One owner per browser object; no module reaches into another module's
  resources.
- Specialist ownership: `world` for Three.js, `persistence` for IndexedDB,
  `audio` for Web Audio, `ui` for the DOM, and `input` for device events.

## Testing boundaries (approved)

- Unit tests cover `rules` and `content`.
- Browser tests cover `world`, `player`, `interaction`, `ui`, `audio`, and
  `persistence`.
- Tests use controlled fakes for time, events, and storage; no real network.

## Open items moved to later blocks

- Exact interfaces and data shapes (B3–B5).
- World, camera, and interaction detail (B6).
- Rendering and audio detail (B8).
- Test utilities, fixtures, and acceptance evidence (B10).
