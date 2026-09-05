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
