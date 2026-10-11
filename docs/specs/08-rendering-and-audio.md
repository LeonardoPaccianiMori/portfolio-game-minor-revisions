# B8 — Rendering, Assets, and Audio

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B8); revised
2026-10-11 with the slice act-lighting baseline.**

## Renderer (approved)

- Three.js with WebGL2 required.
- Flat, stylized materials and simple lighting.
- One continuous scene, with no heavy post-processing.

## Presets (approved)

- Low, standard, and high control shadows, draw distance, and effects.
- The reference machine class is fixed in B9. The low preset must stay
  playable.

## Asset pipeline (approved)

- Roles: environment, props, characters, interface, and audio.
- Sourcing follows `D-006`: reuse permissively licensed assets, modify where
  the licence allows, and otherwise create original work.
- Every asset passes research, licence verification, and technical review
  before integration, and is recorded in `assets/ASSET_MANIFEST.md`.
- Assets are bundled locally. There is no runtime fetch.

## Placeholders (approved)

- Temporary geometry and synthetic sounds are allowed until a real asset is
  approved.
- Placeholders are labelled and are never presented as final.

## Resource ownership (approved)

- `world` owns visual resources; `audio` owns audio resources.
- Shared loading and disposal rules apply, and resources are released on
  shutdown.
- No module reaches into another module's resources.

## Audio (approved)

- One ambience bed per space.
- Cue classes for interface feedback and pressure.
- The cold synth motif marks escalation.
- No voice acting. Captions cover non-speech cues.
- Audio never carries required information alone.

## Characters (approved)

- Stylized, silhouette-first presentation.
- A small shared animation set.
- Text-led dialogue with speaker names.

## Visual language (approved)

- A restrained palette with one pressure accent colour.
- Act-based lighting supports the tone curve: warmer in Act I, cooler in
  Act II, and cold with absurd flashes in Act III.
- Institutional notices and room states change by act.

### Slice act-lighting baseline (implementation)

- Three act palettes with distinct pressure accents: Act I warm and green,
  Act II cooler, duller, and cluttered, Act III cold and thin. The world
  applies the background, the ambient and sun colours and intensities, and
  the authored prop states when the act changes.
- Final palette values arrive with the visual-language step (STEP-025).

## Open items moved to later blocks

- Final palettes, contrast values, and asset identifiers (implementation).
- Performance budgets and the reference class (B9).
- Accessibility acceptance rows (B10).
