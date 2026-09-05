# Minor Revisions

_Minor Revisions_ is a planned first-person Three.js academic-survival game
about a developmental-biology postdoc trying to turn a promising cardiac
organoid result into a publishable paper before a final semester ends.

The tone is witty, sarcastic, and bitterly comic. The science remains legible;
the institution becomes increasingly surreal through plausible bureaucratic
accretion, contradiction, and absence. Publication is not automatically a
happy ending, and an industry role can offer an exit from the academic
survival loop without being presented as a perfect life.

## Repository status

Read [development-status.md](docs/implementation/development-status.md) for the accepted main head, pending work, approved scope and exact next action. Read the [acceptance log](docs/implementation/step-acceptance-log.md) for historical approvals and tests, and the [AI-use log](docs/implementation/ai-use-log.md) for actual contributions.

The numbered design documents define game meaning; implementation specifications define approved technical contracts. The [interface register](docs/implementation/interfaces.md) gives current versions. The [development roadmap](docs/implementation/development-roadmap.md) preserves Steps 0–70 and the correction gates. A documented plan or candidate patch is not an accepted implementation.

Earlier Opus review reports remain under [reviews](docs/reviews/); the [recommendation register](docs/reviews/recommendation-register.md) preserves their resolution history. The [Astra correction package](docs/reviews/2026-09-05-astra/baseline-candidate.md) records the later correction decision and its evidence.

## Documentation

The numbered documents divide the design into implementation-owned domains.
Confirmed decisions, unresolved questions, and acceptance requirements must
remain explicit. Start with the design index and decision log. During technical
specification, also start with the implementation status and roadmap. Review
reports remain advisory and cannot change the numbered documents without
Leonardo's later decision.

## Repository boundary

This repository owns detailed game design, future source code, tests, assets,
and runtime configuration. Leonardo's private Career Center remains canonical
for project status, career evidence, and portfolio-readiness decisions.

No GitHub remote exists. Leonardo alone decides when to create and push a
remote. A future public release is planned to use MIT for code and CC BY 4.0
for Leonardo's original non-code work. No public licence file is added now.
Every third-party asset keeps its own verified licence and attribution path.

## Step-1 foundation file guide

The Step-1 foundation uses these small configuration and test files:

- `.gitignore` keeps generated and local-only files out of Git.
- `.npmrc` enforces exact saved versions and the package's Node requirement.
- `.nvmrc` records Node `24.20.0` for local version selection.
- `.prettierignore` excludes generated output and local tool directories from
  formatting checks.
- `eslint.config.js` defines the JavaScript and TypeScript quality rules.
- `index.html` is the plain local foundation page.
- `package-lock.json` fixes the complete installed dependency tree.
- `package.json` fixes the package versions and approved commands.
- `playwright.config.ts` defines the three-browser local page tests.
- `prettier.config.js` defines the repository formatting rules.
- `tests/e2e/MR-WP-00/start-page.spec.ts` checks the page in Chromium,
  Firefox, and WebKit without an external request.
- `tests/unit/MR-WP-00/foundation.test.ts` checks the exact foundation
  contract without starting a browser.
- `tsconfig.json` defines strict TypeScript checking.
- `vite.config.ts` defines the loopback-only local server and production
  build.
- `vitest.config.ts` defines the Node-only foundation test and future coverage
  boundaries.
