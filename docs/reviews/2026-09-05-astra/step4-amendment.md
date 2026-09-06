# Approved Step4 amendment execution

Approved2026-09-06 under MR-IMP-DEC-309 and baseline-candidate.md. Corrected base: 450972cd7a7417e6fae2456e57d0320553aefc86. Branch work/MR-WP-00-step4-corrected; primary owns all tracked edits. No implementation worker was spawned because the state/schema/fixtures share one narrow contract. Fresh technical review will use Sol xhigh, read-only, after complete primary audit.

## Preserved source

Transplant source: f7192fa838b89c1615f1adceffa53b5421c4e78f. Source and test files copied exactly once before amendment; historical work-order/contribution records retained in their final submitted form. Original main/Step4 branches remain intact. Approved npm12.0.2 and Node24.20.0 retained. S01 and original MR-IMP-DEC-308 preserved; no package-lock or dependency upgrade.

Exact transplanted paths:

- `docs/implementation/contributions/MR-CONTRIB-WP00-006.md`
- `docs/implementation/contributions/MR-CONTRIB-WP00-007.md`
- `docs/implementation/contributions/MR-CONTRIB-WP00-008.md`
- `docs/implementation/contributions/MR-CONTRIB-WP00-009.md`
- `docs/implementation/contributions/MR-CONTRIB-WP01-001.md`
- `docs/implementation/contributions/MR-CONTRIB-WP01-002.md`
- `docs/implementation/contributions/MR-CONTRIB-WP01-003.md`
- `docs/implementation/specs/01-toolchain-and-repository.md`
- `docs/implementation/work-orders/MR-WO-WP00-007.md`
- `docs/implementation/work-orders/MR-WO-WP00-008.md`
- `docs/implementation/work-orders/MR-WO-WP00-009.md`
- `docs/implementation/work-orders/MR-WO-WP01-002.md`
- `docs/implementation/work-orders/MR-WO-WP01-003.md`
- `package.json`
- `src/bootstrap/campaign-state-diagnostic.ts`
- `src/bootstrap/index.ts`
- `src/bootstrap/main.ts`
- `src/bootstrap/startup.css`
- `src/rules/campaign-state-codec.ts`
- `src/rules/campaign-state-schema.ts`
- `src/rules/campaign-state-types.ts`
- `src/rules/campaign-state.ts`
- `src/rules/command-contract.ts`
- `src/rules/index.ts`
- `tests/e2e/MR-WP-00/campaign-state-diagnostic.spec.ts`
- `tests/unit/MR-WP-00/architecture.test.ts`
- `tests/unit/MR-WP-00/campaign-state-diagnostic.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`
- `tests/unit/MR-WP-01/campaign-state-codec.test.ts`
- `tests/unit/MR-WP-01/campaign-state.test.ts`
- `tests/unit/MR-WP-01/campaign-test-data.ts`
- `tests/unit/MR-WP-01/command-contract.test.ts`

## Amendment and checks

Apply only approved v5/schema2 state fields, invariants, codec/creation compatibility, scientific support and slice completion. Command count24 and effect count5 remain fixed. No scheduler/content/persistence engine is implemented. Run focused tests, npm run check, npm run verify, primary audit and Sol xhigh complete review before integration. Preserve actual results and final reviewed commit here. Leonardo's diagnostic acceptance remains pending.

## Completed amendment — 2026-09-06

The primary changed only the approved state/diagnostic/tests and control records. Schema2 rejects schema1; raw scientificFacts are strict; startedPeriod records the post-start origin; saved monitoring includes missed while the player command remains four choices. Known six-template expiry boundaries are checked. Automatic start expiry saves no variation/response/raw/card, and analysis expiry saves locked variation and prior responses without a fabricated stop. Current manuscript requirements use recovery facts, same-record association and genuine matched control, while explicit dishonest reporting retains apparent support. Slice completion requires the separate profile/checkpoint boundaries. The canonical codec carries the new fields without a migration or extra command. MR-IF-004, all 24 commands and five effects remain unchanged.

Existing synthetic analysed/stop examples moved their impossible period0 responses to valid post-action period1. Oxygen examples now use separate windows. Honest Strong/Inflated fixtures carry the association caveat and ninth requirement. The diagnostic creation fixture now identifies content1.1.0. Duplicate-key codec cases were adjusted to the new fixture version without changing parser behavior. The decisions-file change only formats the preserved original npm308 table to satisfy the required formatter.

### Primary checks and complete audit

- `npm run check`: passed TypeScript, lint, formatting and 253 unit tests in 12 files.
- `npm run verify`: passed lint, formatting, the same 253 tests with coverage, production build and all 21 browser flows across Chromium, Firefox and WebKit.
- Coverage: statements90.34%, branches90.32%, functions86.15%, lines92.13%; required thresholds passed. Build:115 modules, no source maps.
- Controlled startup-failure browser tests intentionally emit their named injected error; all assertions passed. They are not unexplained application failures.
- Source/contract audit: exact schema fields, applicable requirement sets, current-snapshot reconstruction, null configured origin, missed/real response offsets, three disjoint stop paths, raw/card exclusion, slice gate, unchanged command/effect/determinism boundaries and schema1 refusal checked against the approved S03–S07 corrections. Codec positive controls preserve the new nested facts and missed responses. New semantic tests include no honest causal support, false same-record association, limited control and deliberately false reported support.
- Scope/history audit: approved documentation base450972c and single transplant8bd4d97; no repeated rules import, package/lockfile change, asset or deployment. Steps1–3 accepted history remains intact. Current-state addenda identify this cycle and preserve earlier submissions as historical evidence.
- Privacy/network audit: no campaign data logging, external request or storage API was added; the diagnostic exposes only its approved safe summaries. Existing browser flows check normal-page separation and controlled failure behavior. No remote is configured. No Career Center record changed. `git diff --check` passed.
- Actual AI contributions are recorded in `../../implementation/ai-use-log.md`. Primary gpt-6-astra effort is unknown; read-only Terra/medium source work is identified separately. Fresh Sol/xhigh detailed review follows this complete primary audit and has not yet occurred at this checkpoint.

### Limits and future content obligation

Step4 validates saved state; it does not execute action costs, resolve experiments, advance the scheduler, calculate manuscript transitions, save to production storage or prove campaign reachability. Source-ID/scientificFacts equality, selected honest reading semantics and the successful authored rehearsal action need the later connected catalogue and transition tests. A structural slice checkpoint is not evidence that the rehearsal action has run.

MR-IMP-OPEN-020: `MR-FB-EXP-RANGE-REPAIR` has no approved last-start boundary. Primary verified the Terra source result against `docs/12-content-specification.md` (six-template table, fallback replacement paragraph and fallback selection) and S06's corrected timing. No boundary was inferred. For templates without a known authored boundary, Step4 checks the expiry result shape and references but leaves timing proof to connected content. Its fallback fixture's period1 is deliberately synthetic, not a proposed design window. Approve the missing fallback window before dependent fallback content/scheduler work. This does not block current Step4 structural support.

### Review packet and next gate

Fresh read-only Sol xhigh review must examine the complete corrected-base-to-submission code/test packet, the approved baseline and the new amendment diff, relevant frozen contracts, these checks and limits, and the exact prior submission/contribution history. Report all blockers, required corrections and advisories together. The project reviewer profile has no model/effort pin; the assignment explicitly selects Sol xhigh and prohibits writes, further delegation and user contact. Original Sol worker code is not attributed to Astra. Local main integration and Leonardo's diagnostic test remain pending. The approved implementation commit message is `MR-WP-01 Align Step 4 with corrected game contracts`.

## Complete independent review of3dcd8af — 2026-09-06

OpenAI gpt-5.6-sol xhigh, fresh read-only `step4_final_review`, applying the unpinned project reviewer contract through an explicitly selected generic agent. Reviewed the full corrected-base450972c through3dcd8af packet plus focused transplant amendment. No blocker, four required findings, no advisory. No writes, network, delegated agents or independently rerun checks.

1. Missed responses must retain a preparation-issue lower bound after ordered later stabilization, and analysed records with a miss must have limited coverage. Authority: S03 correction last paragraph, S04 preparation table and design12 missed-observation paragraph. The new two-miss robust positive fixture exposed the missing check.
2. Analysis expiry after the full response set must retain the already locked final band; incomplete running expiry retains null. Authority: S04 final-band lock and approved expiry preservation.
3. Issue019 already belongs to the original npm amendment. Restore that resolved record and give the fallback question the unused020 ID.
4. Reconcile status.md current issue, next-action, interface and Step4 fields; old v4 worker pointers are not current authority.

Primary verified all four findings against their cited sources. The record fixes are applied at this correcting checkpoint; the two source fixes and isolated regression tests follow. No new game rule or scope approval is needed. Prior tests remain evidence for3dcd8af, not proof that these findings were already fixed.

## Review repairs and affected primary audit — 2026-09-06

Correcting checkpointb7ed67b preserves the complete findings. Primary implemented a minimum remaining missed-issue count from ordered responses: a later stabilization can remove at most one earlier missed issue. This does not reconstruct authored equipment/risk/sample contributions. Analysed runs containing a missed observation require limited coverage even when a later stabilization removed the issue. Analysis-expired stopped runs retain a final band exactly when all windows were resolved; incomplete running expiry and player/configured stops still require null. Tests isolate each wrong value against a valid positive control, include stabilization before versus after a miss, and round-trip a missed-final-window expiry. The earlier two-miss fixture now correctly has two issues and a compromised band.

Primary also restored issue019's original resolved npm meaning and moved the fallback question to unused020. The issue table, current issue paragraph and status/resume fields now agree. Original worker/contribution files were not changed. Earlier checkpoint wording and results remain dated evidence, not claims that findings were absent.

`npm run check` passed259 unit tests in12 files plus typecheck/lint/format. `npm run verify` passed259 tests, coverage (90.39% statements,90.37% branches,86.15% functions,92.17% lines),115-module production build and all21 browser flows. An initial check caught the existing architecture text scan interpreting the word “window” in a new comment as a browser global; only the comment wording changed, and the unchanged architecture test passes. Current full check/verify results supersede that failed attempt. No test-contract relaxation occurred.

Affected primary audit is complete: the two changed invariant areas match design12 missed-observation meaning and S03/S04 lock/expiry rules; three stop paths, issue-band equality, codec preservation and later connected-content boundary still hold. Scope/privacy/package/old-branch checks remain unchanged; diff whitespace and formatting pass. All four complete-review findings are addressed; a fresh focused Sol xhigh review of the correction and affected dependencies is next. No main integration or Leonardo acceptance has occurred.
