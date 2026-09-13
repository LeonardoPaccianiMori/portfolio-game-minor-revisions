---
id: STEP-004
type: development-step
status: technical-review
phase: 1
gate: foundation
created: 2026-09-13
updated: 2026-09-13
base_commit: 1c7b9df9b9501db26bc8fa54424b712c5d12ad92
branch: work/step-004-persistence
primary_model: opencode-go/deepseek-v4.1-flash
primary_variant: max
---

# STEP-004 — Persistence skeleton

## Objective

Introduce local persistence so a campaign survives closing the browser.

## Plain-language effect

The game can save the campaign automatically, load it on return, keep a
last-known-good backup, and clear all local data on request. Nothing leaves the
machine.

## Owned paths

- `src/persistence/` (database, campaign store, settings store, clear data,
  persistence factory, barrel)
- `src/rules/campaign-state.ts` (the carried ADV-3 validation correction)
- `tests/unit/persistence-settings.test.ts`,
  `tests/unit/rules-state-bounds.test.ts`
- `tests/e2e/persistence.spec.ts`

## Prohibited paths

- `docs/**` except the step record; `AGENTS.md`, `README.md`, `opencode.json`,
  `.opencode/**`
- Game rules or player-visible changes, autosave scheduling, interface wiring,
  migrations beyond version 1, archive or ending-card logic, 3D, content,
  assets, and any release, licence, or deployment action

## Allowed sources

- `docs/specs/02-architecture.md`, `docs/specs/03-state-and-rules.md`,
  `docs/specs/05-persistence.md`, `docs/specs/10-testing-and-workflow.md`,
  `docs/specs/11-development-pathway.md`,
  `docs/specs/12-development-steps.md`
- `AGENTS.md`, `docs/design/00-process.md`

## Authority and traceability

- B5 (database, save points, recovery, migration, clear data, privacy and
  concurrency); B3 (versioning); B2 (persistence owns IndexedDB); B10 (browser
  tests for persistence). Carried correction ADV-3 from the STEP-003 review.

## Accepted dependencies

- STEP-003 accepted by Leonardo on 2026-09-13.
- The STEP-004 plan approved by Leonardo on 2026-09-13.

## Plan

The primary implements this layer. One fresh independent review by
`mr-reviewer` (`opencode-go/glm-5.3`, `max`), a different model family from
the primary (`opencode-go/deepseek-v4.1-flash`, `max`). No worker is used: the
storage schema is tightly coupled to B5, so a worker would add setup overhead
without an isolation benefit.

## Tasks

1. Database module: open and upgrade the `minor-revisions` database with the
   five stores (campaign, backup, settings, archive, meta) at version 1.
2. Campaign save: validate before writing, rotate the current campaign into the
   backup, and write plain JSON.
3. Campaign load: read, parse, and validate; return exactly one of _loaded_,
   _empty_, or _invalid_; never partially accept.
4. Backup read for a future recovery screen.
5. Settings: a typed object with defaults, validation, save, and load.
6. Clear all data: one explicit call that wipes the five stores.
7. Carried correction ADV-3: bound `seed` and `rngState` to
   `[0, 4294967295]`, make top-level keys strict, keep the three fixed
   relationship keys, keep flags open, and record the decision.
8. Unit tests for settings and the ADV-3 bounds; a browser test exercising real
   IndexedDB: save and load round-trip, backup rotation, invalid handling,
   settings, and clear.
9. Run every required check.

## Non-goals

- No autosave scheduling, interface wiring, or player-visible change.
- No migration beyond version 1 and no archive or ending-card logic.
- No game rule beyond the carried ADV-3 validation bounds.

## Required checks and evidence

- `npm run check`
- `npm run build`
- `npm run test:e2e`
- `git diff --check` and a clean `git status`

## Safety and quality boundaries

- Persistence is the only module that opens IndexedDB; no other module touches
  storage.
- No telemetry, network, accounts, or external sync.
- No credentials, personal data, or machine paths in tracked files.

## Execution record

- Base: `1c7b9df9b9501db26bc8fa54424b712c5d12ad92`.
- Branch: `work/step-004-persistence`.
- Implementation commit: `fad8e36ec16e32f51ca305dadf5baa966927bf21`
  (`Add local persistence skeleton`).
- `npm run check`: passed; typecheck, ESLint, Prettier, 42 unit tests, and the
  content check.
- `npm run build`: passed; `dist/index.html` and one bundled module.
- `npm run test:e2e`: 9 passed (start page, controlled startup failure, and the
  real IndexedDB persistence round-trip, backup, settings, and clear in
  Chromium, Firefox, and WebKit).
- `git diff --check` and `git status`: clean at the branch head.

## Independent review

Pending. The focused reviewer packet is the step record, the base and head
commits, the complete diff, the B2, B3, B5, B10, C1, and C2 specifications, and
the recorded check results.

## Corrections

None yet.

## Leonardo decision

Plan approved 2026-09-13. Implementation and checks complete; independent
review, Leonardo result review, and acceptance pending.
