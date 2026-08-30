# S01 — Toolchain and Repository Contract

Status: **frozen; S01 approved and documented; no implementation authorized**

## Purpose and authority

This specification fixes the development toolchain, package policy,
repository layout, configuration, commands, and local-environment boundary for
*Minor Revisions*. It implements the approved technical direction in
`../../11-technical-architecture.md` and is subordinate to the numbered design
documents.

This document does not authorize game code, package files, source or content
directories, production assets, deployment configuration, a remote, a public
licence, or a release. Those files can exist only after Gate 1 is complete and
Leonardo separately approves Gate 2.

The exact versions below were verified against official Node and npm registry
metadata on 2026-08-29. S01 fixes them before code. Gate 2 requires a fresh
compatibility, security, licence, clean-install, and verification check.

## Leonardo's working boundary

Leonardo is not a software engineer or game developer. *Minor Revisions* is a
hobby project, and he has no prior Three.js coding experience. Documentation
and future agent handoffs must:

- define a specialized term when it first appears;
- explain why a technical choice matters and what Leonardo must do;
- provide copyable commands, expected results, and plain-language recovery;
- not require Leonardo to implement or debug Three.js himself; and
- preserve Leonardo's authority over design, scope, approval, and private
  evaluation.

This boundary does not reduce the quality, test, accessibility, provenance, or
review requirements.

## Exact environment

| Component | Frozen version or boundary | Purpose |
|---|---|---|
| Node.js | `24.20.0` LTS, Krypton | Runs development and build tools. |
| npm | `11.19.0` | Installs the exact package graph and runs project commands. |
| TypeScript | `6.0.3` | Checks strict source types. TypeScript 7.0.2 is excluded because the approved TypeScript ESLint version supports TypeScript below 6.1. |
| Browser language target | `ES2022` with DOM and DOM iterable libraries | Gives current desktop browsers a stable modern target without experimental language features. |

Node `26` is not approved because it is not an LTS line on the S01 verification
date. `.nvmrc` records `24.20.0`. `package.json` records the exact Node engine
and `packageManager: npm@11.19.0`. npm uses `engine-strict=true`.

Node, npm, and an existing desktop browser are computer-level prerequisites.
Every project-owned input and output lives under
`/home/lpm/Desktop/minor-revisions`.

## Exact dependency baseline

### Shipped runtime dependencies

| Package | Version | Licence | Approved use |
|---|---:|---|---|
| `three` | `0.185.1` | MIT | Direct Three.js rendering and 3D presentation. |
| `idb` | `8.0.3` | ISC | Typed IndexedDB access for local persistence. |
| `zod` | `4.5.2` | MIT | Runtime validation of authored and saved data. |

No other runtime dependency is approved. The game cannot use React, React
Three Fiber, a game engine, a runtime CDN, a service worker, a runtime API,
analytics, telemetry, or automatic error reporting.

### Development-only dependencies

| Package | Version | Licence | Approved use |
|---|---:|---|---|
| `typescript` | `6.0.3` | Apache-2.0 | Strict type checking. |
| `vite` | `8.2.2` | MIT | Local server and static production build. |
| `vitest` | `4.1.11` | MIT | Deterministic unit tests. |
| `@vitest/coverage-v8` | `4.1.11` | MIT | Formal coverage reports. |
| `@playwright/test` | `1.62.1` | Apache-2.0 | Chromium, Firefox, and WebKit browser flows. |
| `eslint` | `10.9.1` | MIT | JavaScript and TypeScript safety checks. |
| `typescript-eslint` | `8.68.0` | MIT | Type-aware TypeScript lint rules. |
| `@eslint/js` | `10.0.1` | MIT | ESLint JavaScript rules. |
| `prettier` | `3.9.6` | MIT | Stable formatting. |
| `@types/node` | `24.13.3` | MIT | Node types aligned with the Node 24 line. |
| `cross-env` | `10.1.0` | MIT | Portable local Playwright-browser paths. |
| `globals` | `17.11.0` | MIT | Explicit browser and Node global-variable sets. |

Official registry metadata marked none of these exact versions as deprecated on
2026-08-29. This metadata check is not a substitute for the Gate-2 clean
installation, security audit, or licence review.

## Package and lockfile policy

- The future package name is `minor-revisions` and `private` is `true` so npm
  publication fails safely.
- The package uses ECMAScript modules through `type: module`.
- Every direct dependency and development dependency uses an exact version;
  no caret, tilde, wildcard, tag, URL, Git reference, or local path is allowed.
- `package-lock.json` is mandatory, committed, and generated only with the
  frozen npm version.
- `.npmrc` sets `engine-strict=true`, `save-exact=true`, and
  `package-lock=true`.
- Leonardo uses `npm install` for normal local preparation. Agents and future
  automatic checks use `npm ci` and cannot repair a lock mismatch silently.
- No automatic dependency-update bot or automatic major-version migration is
  allowed.

## Planned repository tree

The following paths are planned contracts. S01 does not create them.

```text
minor-revisions/
├── index.html                  Vite entry page
├── src/                        Future TypeScript, CSS, and runtime modules
├── content/                    Authored data and English strings
├── assets/                     Verified assets and ASSET_MANIFEST.md
├── tests/
│   ├── unit/                   Pure deterministic tests
│   ├── e2e/                    Browser-flow tests
│   └── fixtures/               Approved test inputs and expected results
├── scripts/                    Portable repository checks and audits
├── docs/                       Design and implementation specification
└── root configuration files   Tool configuration listed below
```

S02 owns the exact `src/` module tree. S06 owns the exact `content/` tree and
build profiles. S10 owns asset integration. S12 owns fixture schemas. S01 does
not pre-empt those contracts.

There is one npm project at repository root. Do not create a nested `game/`
project, workspace, submodule, linked package, symbolic link to an external
project input, or second implementation repository. The build and tests cannot
read Career Center, the portfolio repository, *Unpaid*, or another local
folder.

Do not create a general Vite `public/` directory as an unchecked asset area.
An exceptional fixed-name static file needs later approval and the same
provenance and build checks as other assets.

Generated local paths remain inside the repository and are ignored by Git.
They include `node_modules/`, `dist/`, `coverage/`, `playwright-report/`,
`test-results/`, `local-artifacts/performance/`, tool caches, logs, and
Playwright-managed browser copies. S13 adds `.worktrees/` for primary-created
isolated local assignment folders after implementation approval. The S11
local performance path can hold temporary raw profiler exports; neither path
is part of a build or tracked evidence.
Editor, operating-system, secret, and `.env` files are also ignored and cannot
control the project.

## Configuration contract

The future root configuration inventory is exact:

- `.nvmrc` and `.npmrc`;
- `package.json` and `package-lock.json`;
- `tsconfig.json`;
- `vite.config.ts`;
- `vitest.config.ts`;
- `playwright.config.ts`;
- `eslint.config.js`;
- `prettier.config.js`;
- `.prettierignore`; and
- `.gitignore`.

The README must explain each file in plain language.

### TypeScript

TypeScript uses `strict`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `noImplicitOverride`,
`noFallthroughCasesInSwitch`, `noUnusedLocals`, `noUnusedParameters`,
`forceConsistentCasingInFileNames`, `isolatedModules`,
`verbatimModuleSyntax`, `moduleDetection: force`, `resolveJsonModule`, and
`noEmit`. The module target is `ESNext`, module resolution is `Bundler`, and
the language target is `ES2022`.

Explicit `any` is prohibited. An uncertain external value remains `unknown`
until an approved validator or type guard checks it. Experimental TypeScript
features are prohibited.

### Vite

- The development server binds only to `127.0.0.1` on fixed port `5173` and
  fails if that port is occupied.
- The built-preview server binds only to `127.0.0.1` on fixed port `4173` and
  fails if that port is occupied.
- `base` is `./`, output is `dist/`, the target is `es2022`, old output is
  cleared, and production source maps are disabled.
- Production filenames use Vite's content hashes. Normal Vite minification is
  allowed.
- `.env` loading is disabled. No `VITE_` or other environment value can change
  game rules, content, accessibility, or release behaviour.

### ESLint and Prettier

ESLint uses the recommended JavaScript, TypeScript, and type-checked rules. It
checks for unsafe assignments, floating or misused promises, incomplete
switches, and explicit `any`. Browser and Node files receive separate explicit
global sets.

Prettier uses two spaces, semicolons, single quotes, trailing commas, a
100-character print width, spaces instead of tabs, and LF line endings. It
checks TypeScript, JavaScript, CSS, JSON, Markdown, and supported configuration
files. Normal checks never edit a file. Only `npm run format` can apply
formatting. No Git hook or editor integration is required.

### Vitest and Playwright

Vitest uses the Node environment for pure deterministic logic. Normal tests do
not create coverage output. The formal coverage command uses V8 and enforces
the B10 target of at least 90 percent line coverage and 85 percent branch
coverage in rules, persistence logic, and content validation. S12 defines the
exact included modules, exclusions, and fixtures.

Playwright uses local Chromium, Firefox, and WebKit projects against the local
server. It records no video by default. It keeps a trace and screenshot only
for a failed test. Reports stay in ignored repository folders and cannot
contain player names, save payloads, or personal data. A WebKit result is not a
Safari-support claim. S11 separately requires direct dated current-stable
Chrome, Edge, and Firefox evidence for a future support claim; Playwright's
managed browsers do not replace it.

`PLAYWRIGHT_BROWSERS_PATH=0` keeps Playwright-managed browser copies inside the
installed project dependencies. `cross-env` applies that setting portably.

## Exact command contract

| Command | Exact future action | Meaning for Leonardo |
|---|---|---|
| `npm install` | Install from the exact manifest and update only a consistent lockfile. | Prepare the project normally. |
| `npm ci` | Recreate exact installed dependencies from the committed lockfile. | Agent and future automatic clean installation. |
| `npm run setup:browsers` | `cross-env PLAYWRIGHT_BROWSERS_PATH=0 playwright install chromium firefox webkit` | One-time installation of local automated-test browsers. |
| `npm run dev` | `vite` | Start the local game at `http://localhost:5173`. |
| `npm run build` | `npm run typecheck && vite build` | Create checked static files in `dist/`. |
| `npm run preview` | `vite preview` | Inspect the built files at `http://localhost:4173`. |
| `npm run typecheck` | `tsc --noEmit` | Find TypeScript safety errors. |
| `npm run lint` | `eslint .` | Find code-quality and unsafe-code errors. |
| `npm run format:check` | `prettier --check .` | Report formatting differences without editing. |
| `npm run format` | `prettier --write .` | Apply formatting explicitly. |
| `npm test` | `vitest run` | Run the fast deterministic tests once. |
| `npm run test:coverage` | `vitest run --coverage` | Run formal coverage evidence. |
| `npm run test:e2e` | `cross-env PLAYWRIGHT_BROWSERS_PATH=0 playwright test` | Run local browser flows. |
| `npm run check` | `npm run typecheck && npm run lint && npm run format:check && npm test` | Run the fast local gate. |
| `npm run verify` | `npm run lint && npm run format:check && npm run test:coverage && npm run build && npm run test:e2e` | Run the complete local gate without duplicate unit-test execution. |

Each failed command must return a non-zero exit status and provide a concise
plain-language next action. A worker cannot make a failing check pass by
disabling a rule, excluding an affected file, changing a target, or adding an
unapproved dependency.

## Network and local-data boundary

Internet access is allowed only for an intentional package or Playwright
browser installation, an approved dependency update, or an approved audit.
After preparation, `dev`, `build`, `preview`, `check`, `verify`, browser tests,
and the game cannot contact an external service. The loopback development and
preview servers are local and allowed.

No password, credential, personal-data fixture, uploaded data, employer
material, or local `.env` file can enter this repository. Developer settings
cannot change player-visible rules, content, accessibility meaning, or
outcomes.

## Update and revalidation policy

Recheck versions before Gate 2, before each later production phase, after a
security warning, after any approved dependency change, and before a release.
An update must:

1. state the reason and exact old and new versions;
2. review release notes, engine and peer compatibility, security, licence, and
   public-redistribution effects;
3. change one coherent dependency group without unrelated updates;
4. regenerate the lockfile with the approved npm version;
5. complete a clean `npm ci` and `npm run verify`;
6. review the complete dependency and file diff; and
7. receive Leonardo's approval when it changes a frozen S01 contract.

If Gate-2 installation or verification fails, reopen the affected S01
decision. Do not use a global package, a hidden version override, a disabled
check, an undocumented patch, or an external local path as a workaround.

## Acceptance and measured-later boundary

S01 is complete when the exact versions, dependencies, commands, paths,
configuration, environment, update rules, licences, and failure response agree
across the specification and control documents. Documentation validation is
evidence for S01 only.

The following remain future evidence because implementation is not authorized:

- a generated package lock and its integrity records;
- successful package and Playwright-browser installation;
- actual command, build, coverage, and browser-test results;
- browser compatibility, build size, resource use, frame rate, and play
  quality; and
- any remote, release, or deployment result.

`MR-IF-001` was `not started` after S01 and is now candidate `v1` through S02
and the connected S12 fixture contract. S02 owns the exact runtime bootstrap
and application-lifecycle interface. S13 now assigns root configuration,
`index.html`, foundation scripts, `bootstrap`, `application`, and `platform`
to `MR-WP-00` and fixes the isolated branch, worktree, commit, review, and
integration process. No implementation worker can use this S01 toolchain
contract until Gate 1 and the separate Gate-2 approval are complete.
