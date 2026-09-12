# B1 — Toolchain and Repository

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B1).**

## Toolchain policy (approved)

- Exact pins; no version ranges.
- Everything is bundled locally at build time.
- No runtime CDN, API, analytics, or external service.
- Package manager: npm, with a committed lockfile.

## Runtime (approved)

- Node: the current active LTS, recorded exactly in `.nvmrc` and the package
  `engines` field. The exact number is chosen at the first development step.
- The game runs locally as a static build and requires WebGL2.

## Development tooling (approved)

- Strict TypeScript.
- ESLint and Prettier.
- Vitest for unit and content-validation tests.
- Playwright for Chromium, Firefox, and WebKit.

## Repository layout (approved)

- `src/` — application source; the module list is fixed in B2.
- `tests/` — unit and end-to-end tests.
- `content/` — authored content and its data files.
- `scripts/` — content validation and build helpers.
- `docs/` — design documents and Phase B specifications.
- `assets/` — approved assets only, tracked in `ASSET_MANIFEST.md`.

## Quality commands (approved)

| Command                | Meaning                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Local development server                                          |
| `npm run build`        | Typecheck and production build                                    |
| `npm run typecheck`    | Strict TypeScript check                                           |
| `npm run lint`         | ESLint                                                            |
| `npm run format:check` | Prettier check                                                    |
| `npm run test`         | Vitest unit and content tests                                     |
| `npm run test:e2e`     | Playwright browser tests                                          |
| `npm run check`        | Typecheck, lint, format, unit tests, and content validation       |
| `npm run verify`       | Complete local verification including browser tests and the build |

## Dependency policy (approved)

- Every dependency is reviewed and pinned. Prefer the standard library and
  existing dependencies.
- No runtime network dependency.
- The lockfile is committed, and a clean install is required before release
  candidate builds.

## Assets (approved)

- No asset enters before research and Leonardo's approval (`D-006`).
- `assets/ASSET_MANIFEST.md` records source, creator, exact licence,
  attribution, cost, and technical review for every asset.

## Open items moved to later blocks

- Exact Node and package versions (first development step).
- Module list and import rules (B2).
- Content schemas and validation rules (B4).
- Test structure and acceptance evidence (B10).
