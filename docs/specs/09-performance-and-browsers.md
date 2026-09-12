# B9 — Performance, Browsers, and Diagnostics

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B9).**

## Reference class (approved)

- A named modest laptop: for example an Intel i5 with integrated Iris Xe
  graphics, 16 GB RAM, SSD, and a 1920×1080 display.
- 60-minute sessions are the test length.
- The exact machine is recorded at the first measurement. Measured results are
  evidence, not claims.

## Budgets (approved; initial targets to confirm by measurement)

| Target               | Initial value                  |
| -------------------- | ------------------------------ |
| Frame rate, standard | 60 fps target, 30 fps floor    |
| Low preset           | Playable at the 30 fps floor   |
| Memory               | 512 MB ceiling during play     |
| Load time            | Under 5 seconds locally        |
| Build size           | 25 MB including bundled assets |

The first measurement confirms or revises these with recorded evidence. A
budget change requires the approved change process.

## Measurement (approved)

- Manual profiling on the reference class.
- Recorded evidence for startup, normal play, and crowded-room scenarios.
- No telemetry and no external reporting.

## Browsers (approved)

- Current Chrome, Edge, and Firefox desktop.
- Automated Chromium, Firefox, and WebKit checks.
- Safari is best-effort until direct evidence exists.

## Compatibility (approved)

- WebGL2 is required and checked before a new game starts.
- Unsupported browsers see a plain explanation; the game never enters a broken
  state.

## Diagnostics (approved)

- A local error screen with sanitized details the player can copy.
- No external reporting, and an error never destroys the save.

## Profiles (approved)

- Low, standard, and high, with a safe default of standard.
- Changes apply immediately and grant no gameplay advantage.
- The selected profile is stored in the settings store.

## Long sessions (approved)

- 60-minute sessions stay stable.
- Resources are released correctly on shutdown and restart, and re-entering
  scenes does not accumulate resources.

## Open items moved to later blocks

- Exact measured values on the reference class (first measurements).
- Acceptance rows and evidence format (B10).
