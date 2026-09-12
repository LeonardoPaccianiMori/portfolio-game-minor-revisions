# 08 — Technical Constraints and Production

Status: **Documented — approved by Leonardo on 2026-09-10 (Block A8).**

## Stack (approved)

- Strict TypeScript, Vite, direct Three.js, and locally bundled dependencies.
- npm with a recorded Node LTS.
- A static local build; no runtime CDN or external service.

## Architecture (approved)

- Separate modules for rules and content, world and rendering, player and
  input, interface, audio, persistence, and tests.
- Rules are deterministic and return serializable state plus presentation
  effects.
- State and content are validated, and no dialogue is generated at runtime.

## Persistence (approved)

- Browser-local IndexedDB save.
- No accounts, no telemetry, no analytics, and no runtime network.

## Browsers (approved)

- Current Chrome, Edge, and Firefox desktop.
- Automated Chromium, Firefox, and WebKit checks.
- Safari is best-effort until direct evidence exists.

## Performance (approved)

- A named reference machine class, low/standard/high graphics presets, and
  60-minute sessions.
- Exact numbers are fixed in Phase B.

## Budget and capacity (approved)

- EUR 150 ceiling for non-LLM exceptional costs.
- No hard cap on model spend; `docs/costs.md` is reviewed at every phase gate.
- Production is capacity-based: small steps, honest estimates, and stop rules.

## Stop rules (approved)

- If the vertical slice fails the fun, humour, and comprehension checks after
  one correction cycle, pause and re-scope instead of pressing on.
- A failing test cannot be relabelled as a pass.

## Development (approved)

- A fresh multi-phase pathway in Phase C, one approved step at a time.
- The opencode workflow, independent review, and step records apply.

## Release boundary (approved)

- No public release, licence, deployment, or portfolio work until the game
  passes final acceptance.
- The existing GitHub remote is the only remote.

## Open items moved to later blocks

- Exact versions, performance numbers, schemas, and test methods (Phase B).
- The A4 and A5 reopening may adjust the content budget; revisit at content
  planning.
