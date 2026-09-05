# Preserved implementation handover

Inspected 2026-09-05. Main and both current Step4 worktrees were clean before correction work. Steps 1–3 remain accepted; Step4 remains unaccepted.

- Main: `9e3dba938ea814484c70b5bb1d78694f2be34a4b`.
- Rules branch: `f2babe975073fb3c4d5dc09d703aed225c9fd005`.
- Combined diagnostic: `f7192fa838b89c1615f1adceffa53b5421c4e78f`.
- Shared main/combined base: `580c8d9`.
- Primary correction branch: `work/astra-correction-package`, based on main above. The primary uses a temporary worktree because the game repository is outside the default writable root; local Git administration was authorized through the sandbox review. No worker edits occur there.

The combined branch is not descended from current main. Its full history contains the rules copies, diagnostic and approved npm amendment. Do not merge it wholesale and do not also integrate the separate rules branch. Main's one-line S03 v4 heading fix must survive.

## Exact transplant source

After the revised baseline is approved, reviewed, committed and integrated into main, record that new exact head and create the Step4 amendment branch from it. Compare every source path against f7192fa. Carry the final combined version of these paths once, with the original commit references in the contribution log:

- `package.json` (npm 12.0.2 only; Node remains 24.20.0).
- `src/bootstrap/campaign-state-diagnostic.ts`, `index.ts`, `main.ts`, `startup.css`.
- `src/rules/campaign-state-codec.ts`, `campaign-state-schema.ts`, `campaign-state-types.ts`, `campaign-state.ts`, `command-contract.ts`, `index.ts`.
- `tests/e2e/MR-WP-00/campaign-state-diagnostic.spec.ts`.
- `tests/unit/MR-WP-00/architecture.test.ts`, `campaign-state-diagnostic.test.ts`, `foundation.test.ts`.
- `tests/unit/MR-WP-01/campaign-state-codec.test.ts`, `campaign-state.test.ts`, `campaign-test-data.ts`, `command-contract.test.ts`.

Earlier source commits run from `3bd8b18` / `0fc7d39` through `1b3d6d5` and `f7192fa`; final source contents, not a second replay of duplicated rules history, define the transplant. `71a20a3` records the approved npm amendment. S01 must carry that approval without creating a new upgrade.

Import the missing historical work-order/contribution files from the combined packet intact, checking duplicate IDs against main. Reconcile its updates to AGENTS, README, design index/contract, decision/status/interface/review logs and S13 against the corrected baseline; never copy old current-state paragraphs over newer decisions. Preserve its already completed work-order heading correction.

The combined packet reports 228 tests and 21 browser flows in its previous audit. This package does not claim to have rerun them. It still needs fresh review on the final amended candidate and applicable complete checks before integration.

## IDs and provenance

Across inspected main and Step4 branches, the next unused primary-control order/contribution pair is WP00-010; the next rules pair is WP01-004. Reserve no delegated-work ID without an actual assignment. Historical missing WP00-003 is not reusable. Candidate preparation is primary work recorded in execution.md and the AI-use log. Exact future hashes are recorded after the corresponding commits exist.
