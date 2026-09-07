# Minor Revisions — Step 5 plan

Date: 2026-09-06. Status: contract preparation approved by Leonardo on 2026-09-06; resulting contracts and code implementation remain candidates.
Accepted base: local main32d6a01. Steps0–4 and Gate4A are complete. Numbered roadmap remains0–70.

## Purpose and unchanged deliverable

Step5 adds S06 source content envelopes, slice/fallback/full profiles, English strings and validation. An envelope is the strict outer structure of a data file. Only the slice can be complete in this phase. The final deliverable must distinguish a structurally valid source catalogue from a playable game and from executed campaign journeys.

The roadmap also retains gates4A,6A and26A; these are attached checks, not extra numbered steps. Some pure transitions are brought forward only when needed for the pressure/tail tests. Asset feasibility is checked before Step27 selection. Steps33–38 keep separate candidate-selection and integration approvals.

## Approved scope: primary contract preparation within Step5

No additional numbered step is added. This preparation makes the implementation order concrete before a worker starts.

1. Define exact JSON/TypeScript shapes for all18 content families, common fields, condition payloads, six authored-effect payloads, the permitted target/fact/value registries, and source/profile/generated-package/result/issue/view types. Each semantic field maps to an existing approved S03–S06 fact or S04 command. No arbitrary campaign path or executable content expression is allowed.
2. Produce representative valid and invalid examples for conditions, effects, references, scientific facts, profile selection and errors. Examples are contract evidence, not production prose or executed game journeys.
3. Define the exact slice content selection and source-to-text mapping, identifying missing literal material instead of writing invented replacements. Maintain Step5's root content deliverable. S13 assigns root content to WP07 during the slice phase; this is a separate owner from WP01's content-system code, not permission to remove the roadmap deliverable. Any unresolved creative choice returns to Leonardo.
4. Specify phase-aware commands: retain default dev/build selecting full and rejecting its incomplete profile; propose explicit dev:slice/build:slice entry points and a verify sequence that expects incomplete-full/fallback rejection and verifies the complete slice. No silent default-profile switch. Resolve the exact package/Vite/Playwright changes before approving implementation.
5. Define build filtering versus browser package validation, safe content failure, and the public content-module boundary. Keep campaign creation/state2 and content-envelope1 distinct; content version is1.1.0 under the approved correction. No guessed schema1 campaign migration.
6. Record field-contract, build-command and ownership implications in an impact table. Where exact shared contracts change, propose an explicit MR-IF-006 successor and any affected S01/S02/S13 update for Leonardo's approval. Do not silently call a new shared rule an implementation detail.

### Proposed tracked preparation paths

- Add `docs/implementation/plans/step-05-content-foundation.md`: exact implementation plan, ownership, source packet, scripts, checks and acceptance.
- Add `docs/implementation/analysis/step-05-content-contract.md`: candidate schemas, closed registries, examples, slice source mapping and interface impact.
- Modify `docs/implementation/open-issues.md`, `status.md`, `development-status.md`, `step-acceptance-log.md`, `ai-use-log.md`: candidate status, actual completed contributions, current next action and stable issue references. Reserve new issue IDs only after checking every preserved record.
- Keep frozen specifications/interfaces unchanged during candidate drafting. The final candidate names the exact S06/interface/S01/S02/S13 amendments to approve before code relies on them.

Preparation validation: every field/reference checked against approved numbered design and S03–S06; exact source/ownership map; positive/negative contract examples; default-full rejection and explicit-slice verification design; no fabricated text/fallback deadline; Markdown format and diff checks; one independent high-level review of the complete candidate.

Proposed local preparation commit: `Prepare Step 5 content contracts and implementation plan`. No remote/push, dependency installation, root build/configuration edits, runtime changes, asset import or Career Center write.

### Delegation table

| Task                                                                          | Role/model/effort                                                         | Owned paths                                                        | Dependency and packet                                                  | Reason/order                                                                                |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Contract synthesis, plan and tracked records                                  | Primary Sol high by project default; actual use recorded separately       | Preparation paths above                                            | Accepted main; S01–S06, S12/S13, design12, MR-IF-006 and Step5 roadmap | Primary resolves shared meanings and ownership first                                        |
| Candidate high-level review                                                   | Fresh read-only reviewer, gpt-6-astra xhigh                               | None                                                               | Complete contract/plan, impact table and cited source packet           | Independent review of architecture/shared contracts; after primary audit, no implementation |
| Later content-system implementation, after final exact contract/plan approval | Controlled worker, gpt-5.6-sol high                                       | Proposed `src/content/` and related `tests/unit/MR-WP-01/` only    | Frozen candidate successor, exact work order and clean base            | Complex validation; isolated paths; no creative/shared-rule decisions                       |
| Later authored source conversion                                              | Primary under WP07 ownership, or separately approved Sol/Terra work order | Root `content/` only                                               | Exact accepted slice selection and literal source map                  | Separate ownership from content code; no invented prose                                     |
| Later build/startup wiring                                                    | Primary under WP00 ownership                                              | Exact package/Vite/Playwright/bootstrap paths listed in final plan | Accepted contract and tested content public boundary                   | Shared root/configuration paths need a single owner                                         |
| Later detailed code review                                                    | Fresh read-only reviewer, gpt-5.6-sol xhigh                               | None                                                               | Complete implementation diff, approved packet, tests and primary audit | Required before integration and acceptance                                                  |

No implementation worker is spawned during preparation. All assignments use focused packets and at most two subagents at once. Reviewers do not edit or accept work. Actual completed model/effort use is recorded separately from requested settings.

## Later implementation acceptance criteria to finalize in the packet

- All18 family envelopes and profile records are strict, deterministic and explicit.
- Valid source creates checked copies; invalid input produces safe ordered issues and no partial package.
- Selected content has only its dependencies and text; excluded content and development-only metadata do not enter the build.
- Missing references, duplicate IDs/JSON members, wrong families, invalid conditions/effects, semantic-fact mismatches, invalid text/placeholders and word limits have isolated negative tests.
- Slice is genuinely complete for its approved content selection; full/fallback stay explicitly incomplete and cannot build. No claim of runtime campaign reachability before the rules exist.
- No rule engine, scheduler, persistence, 3D scene or external/generated visual/audio asset is implemented here.
- Applicable type/lint/format/unit/coverage/build/browser checks pass under the exact amended phase commands; complete primary audit and fresh Sol xhigh review precede local integration.
- Leonardo receives understandable validation results and a small controlled-invalid example, not raw technical logs. Final exact display/test route is specified before implementation approval.

## Asset instruction confirmation

AGENTS.md explicitly requires source, licence, redistribution, modification, attribution, cost and technical review for external/generated candidates before integration approval. Modified candidates return to Leonardo. Development-roadmap.md's Temporary and final assets section requires candidate comparison, selection or requested modification, approved manifest and a separately approved integration plan. Steps33–38 Substep A never authorizes Substep B. These requirements cover object props, equipment, environment, characters and audio as applicable.

## Approval boundary

Leonardo already approved the bounded Step5 contract-preparation scope above. Do not request that approval again. The resulting exact shared-contract amendment and implementation plan return as one concrete review packet before code begins. This is required because the frozen S06 document currently names condition/effect types without fully specifying their payloads/target registries, and its default-full build failure needs explicit reconciliation with the existing mandatory verify command. It is not a request to reapprove Step4 or change the71-step roadmap.

## Candidate implementation ownership and sequence

This file is a preparation plan with a candidate implementation outline. It is not yet an executable work order. The section14 holds in the companion contract must be closed before the exact code packet is presented for approval.

1. **Primary contract closure:** finish the source decisions, literal ID/key/count manifest, owner/command bindings and recursive view projections. Present exact proposed amendments to S06/MR-IF-006, S01, S02 and S13, plus any necessary design12 additions. Keep frozen authorities unchanged until approval.
2. **WP01, Sol high, sequential after approval:** own new `src/content/index.ts`, `types.ts`, `source.ts`, `json.ts`, `schemas.ts`, `references.ts`, `profiles.ts`, `semantics.ts`, `views.ts` and `tests/unit/MR-WP-01/content-*.test.ts`. Public entry exports only approved source/build/runtime operations and immutable types. Private file subdivision is candidate; the final work order enumerates paths. No source I/O, commands execution or creative content.
3. **WP07, primary, after the approved literal manifest:** own `content/manifest.json`, `content/strings.en.json`, the18 S06 data files listed in the contract's source authority, and `content/profiles/{full,fallback,slice}.json`. This conversion stays with the primary because source meanings and closure decisions remain coupled to the approved contract. It may run alongside WP01 only after both share the frozen source shapes. No generated or external assets.
4. **WP00, primary, after WP01 public boundary:** own `scripts/check-content.ts`, `scripts/test-build-profiles.ts`, `scripts/content-build.ts`, `src/content-package.d.ts`, `vite.config.ts`, `package.json`, `tsconfig.json`, `eslint.config.js`, `playwright.config.ts`, and content startup wiring in `src/bootstrap/{main,application-bootstrap,startup-screen,temporary-adapters}.ts`. Add narrow content-bootstrap/build tests and adjust affected existing foundation, architecture, startup and browser assertions. Shared root wiring stays with one owner; the final work order enumerates exact test files and affected assertions before approval (candidate virtual-module strategy is contract section9). No lockfile/dependency change.
5. **Primary integration audit, then fresh Sol xhigh review:** verify content closure, safe failures, copies/projections, excluded strings, profile output isolation and all existing Step4 behaviour under explicit slice startup. Run amended check/verify. Resolve defects and perform required focused review before integration.
6. **Leonardo test and acceptance:** start `npm run dev:slice`; present normal content-ready startup with game systems still unavailable, then the controlled invalid-package test evidence and its exact safe message. No shipped validation bypass. This checks the content foundation, not a playable slice. Step6 remains a separate plan and approval.

Candidate implementation commit boundaries: `Define Step 5 content validation`, `Add approved slice content catalogue`, and `Wire phase-aware content startup`. Exact amendment and work-order commits will be named in the final approval packet. These messages do not authorize code now.

## Gradual testing requirement

`AGENTS.md`, Incremental development and Leonardo review, requires one approved step at a time, technical checks and independent review before user acceptance. `development-roadmap.md`, Purpose, explicitly states: “It replaces a one-shot vertical-slice build with frequent Leonardo reviews.” Steps1–30 assemble and test the slice gradually; Step31 accepts it. Step53 accepts the fallback, and Step70 accepts the full local game. There are71 numbered steps0–70. Gates4A,6A and26A do not add numbered steps or authorize batches.

## Fresh-session continuation prompt

> Continue Minor Revisions in `/home/lpm/Desktop/minor-revisions` using GPT-5.6 Sol with high reasoning. Read AGENTS.md and follow the mandatory bootstrap, starting with docs/implementation/development-status.md. Fetch origin safely and inspect Git state. Step4 is accepted. Step5 contract preparation is already approved; do not ask for that approval again. Read this Step5 plan and analysis/step-05-content-contract.md, especially sections14–19 and their review findings. D1 is approved: show all three claims, but complete the early rehearsal only with an honest Careful claim. D4 monitoring/stop costs already exist. D3 laser results remain pending; do not infer approval from a request to continue. Obtain that concrete decision before finalizing dependent result data. Meanwhile, resolve the tutorial fixed-key/current-binding conflict and finish the exact selected IDs, keys, counts, source types and ownership within candidate preparation. Present the complete reviewed amendment and implementation plan before code begins. Use separate Sol xhigh implementation review; keep Astra subagents for high-level work only and Sol/Terra/Luna for delegated implementation. Keep gradual testing, separate step acceptance and asset approval. Commit and push approved, validated and reviewed main changes to the configured origin. Do not force-push or change assets, deployment, visibility or Career Center.

## Current approval and next-action checklist — 2026-09-07

- **Accepted:** Steps0–4 and Gate4A; the model handoff does not restart them.
- **Approved work:** Step5 candidate contract preparation and this Sol primary handoff. GitHub origin/main synchronization and full local-artifacts exclusion are already approved and implemented.
- **Approved game choice:** D1, all three claims visible but honest Careful-only rehearsal completion.
- **Existing resolved rule:** D4, routine/stop1 period0 energy; quality/stabilize1 period1 base energy.
- **Pending D3:** Strong clear recovery; Limited partial structure/no rhythm; Weak unreliable, with the proposed observation limits and text in section16. Limited rhythm-only cannot complete the Careful rehearsal without a suitable repeat/restart. This proposal is not approved.
- **Other open preparation:** exact final selected source manifest and counts, remaining semantic definitions/trigger bindings, D2/D5 candidate text, D6 selected audio/world role closure, D7 phase-command amendment, and the three tutorial bodies with hard-coded input bindings. The full readiness list is contract section14 with refinements18–19.
- **First action after bootstrap:** check whether Leonardo has answered D3 since this handoff. If not, present its concise concrete choice while continuing independent candidate work. Do not request broad Step5 code approval from the current incomplete draft.
- **Before implementation:** finish the exact candidate, primary audit and independent high-level shared-contract review; obtain approval for the explicit frozen amendments and exact code/work orders. These approvals are separate from preparation.

## 2026-09-07 continuation within approved preparation

Current work starts from local checkpoint735816b on the existing preparation worktree. Modify only the candidate contract/plan and the already authorized five control records. Purpose: close outcome-row identity, command cost ownership, static validation scope, source titles/recaps/headings and semantic input names. Review the new material as one focused high-level packet. Proposed checkpoint message: `Refine Step 5 result and presentation contracts`. Validation: primary source comparison,144-row temporary candidate arithmetic, literal/Markdown syntax, exact documentation scope, formatting and diff checks; independent high-level review of the new contract meaning. No preparation reapproval is required.

Delegation this continuation: Terra/high requested for the bounded read-only UI-source evidence scan; no owned writes and no science duplication. Astra/xhigh requested for the fresh high-level review of the outcome/input/source contract refinements after primary audit; no implementation. Primary owns all candidate writes and verifies citations. The role files permit these assignments; actual model/effort is logged only if exposed. No implementation worker can begin while the final contract and design choices are unapproved.

D3 remains a concrete pending choice in contract section16. Section18 turns that proposed meaning into a144-row finite structure; the arithmetic is not a completed content validation test. Section19 supplies the exact additional titles/reasons/recaps and reuses existing headings. These are candidate additions for Leonardo's review, not assumed approval from a request to continue.
