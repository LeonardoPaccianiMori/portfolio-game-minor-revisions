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
- `npm run test:e2e`: 9 passed before the R-1 correction and 12 after it
  (start page, controlled startup failure, the persistence round-trip, backup,
  settings, clear, and invalid-data handling) in Chromium, Firefox, and WebKit.
- `git diff --check` and `git status`: clean at the branch head.

## Independent review

First review on 2026-09-13 by `mr-reviewer` (`opencode-go/glm-5.3`, variant
`max`), a different model family from the primary: no blocker, one required
correction (R-1, applied), and seven advisories (ADV-A to ADV-G; B and C fixed
in the correction, A and D to G recorded with owners).

A fresh independent review covers the corrected result before integration.

Re-review on 2026-09-13 by a fresh `mr-reviewer` session (`opencode-go/glm-5.3`,
variant `max`): R-1, ADV-B, and ADV-C are genuinely, minimally, and completely
applied; no blocker and no required finding remains. Two documentation
advisories were recorded for STEP-034 (RE-ADV-1: record the corrupt-record
lifecycle decision; RE-ADV-2: note that `createPersistence` is the application
surface and the opener and keys exist for tests).

## Corrections

Applied before integration from the first independent review:

- **R-1 (required):** the browser test now plants a corrupt campaign record and
  asserts that `load()` returns `invalid` with issues, that `save()` refuses an
  invalid state, and that the corrupt record never replaces the backup. The
  invalid branch and the save-refusal path are now covered.
- **ADV-B:** `save()` validates the current record before rotating it into the
  backup, so corrupt data cannot displace the last known good state.
- **ADV-C:** the raw IndexedDB handle was removed from the public `Persistence`
  interface, keeping one-owner discipline.
- **ADV-A:** the STEP-003 ADV-4 tests (PRNG resume and missing-field edge
  cases) move explicitly to STEP-005; this step's rules touch was limited to
  the carried ADV-3 validation bounds.
- **ADV-D:** recorded decisions: the campaign is stored as a plain state object
  through IndexedDB structured clone, not a JSON string; the save spans
  separate transactions, so rotation is not atomic; atomicity belongs to
  STEP-034.
- **ADV-E:** ownership of the `meta` store contents (schema version, content
  version, save timestamps) is assigned to STEP-034.
- **ADV-F:** settings intentionally tolerate unknown keys for forward
  compatibility, while the versioned campaign state stays strict. The two
  policies are deliberate and recorded here.
- **ADV-G:** the acceptance bookkeeping (cost snapshot, process file, AI-use
  log, decision log) is completed in the acceptance commit, as before.
- **RE-ADV-1:** STEP-034 records the corrupt-record lifecycle decision: a later
  valid save overwrites a corrupt campaign while the guarded backup survives.
- **RE-ADV-2:** STEP-034 records that `createPersistence` is the application
  surface, while `openCampaignDatabase` and the store keys exist for tests and
  storage-owning code.

## Leonardo decision

Plan approved 2026-09-13. Implementation and checks complete; independent
review, Leonardo result review, and acceptance pending.
