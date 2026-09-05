# Minor Revisions: design and implementation-workflow review

Review date: 2026-09-05. This is a read-only assessment, not an implementation plan or step acceptance.

The premise does not need a restart. The compact floor, paper-versus-career distinction, optional misconduct, local deterministic rules, and separation of biological results from evidence quality form a coherent design. However, the documents are not yet a dependable implementation contract. Several important rules and pieces of authored text disagree. The workflow also delays evidence about the complete game while spending substantial effort on foundation and control records.

My recommendation is a bounded correction pass before more dependent implementation. Preserve Steps 1–3 and the existing Step-4 work. Do not repeat the whole B00–S14 programme or discard work because a new model is available.

## Scope and current state

The review covered the numbered design corpus 00–15, glossary, decision history, asset manifest, both complete Opus review programmes and their protocols/validation/register, S01–S13 and the S14 audit, implementation controls, development roadmap, agent configuration, and relevant Step-4 work-order and worktree evidence. Two read-only evidence agents supported technical and prior-review coverage. The main agent checked material findings against their sources.

Historical anchors are B10 `ea7e95d`, review-resolution baseline `ce9cd52`, S14 `5b868bb`, and Step-0 workflow `6e0c4cc`. The assessment considers those decisions as preserved in the current documents, including later corrections. Current workflow findings are identified separately. It is not a new full code audit of Step 4, runtime playtest, or certification of asset rights.

The main checkout is `9e3dba9`, with Steps 1–3 accepted. The diagnostic worktree is newer: `f7192fa`, with a 2026-09-04 record that the Step-4 combined audit is complete and fresh independent review is next. The rules branch is at `f2babe9`. Both inspected Step-4 worktrees were clean. The newer work is not integrated or accepted on main. “About 80%” is your estimate, not a measured repository completion value. See the [preserved branch handover](handover.md).

## Findings to resolve before dependent work

### 1. Prove that the campaign can be scheduled

**High priority; known balance risk with an additional proof gap.** The R01 audit gives optimistic minimum totals of 55 Standard periods and 51 Supported periods. It excludes night surcharges, imperfect use of the energy cap, and conditional room-response costs. It does not demonstrate a legal sequence through experiment windows, mandatory scenes, monitoring, character availability, and career deadlines. An aggregate total below the semester budget is necessary but insufficient. The sentence “the minimum route fits both profiles” is stronger than the evidence.

The same audit shows that the thorough-honest fixture needs at least 69 Standard periods or 65 Supported periods. It cannot fit the nominal 64-period budget even under optimistic assumptions. This need not be wrong: sacrifice can be intended in both profiles. Leonardo can reduce action demand, change recovery, redefine this archetype, or accept explicit sacrifices in both profiles. That decision is still open.

**Change:** specify and later execute at least one legal honest Standard schedule and one Supported schedule, with exact period indices, energy, windows, mandatory actions, room responses, and result assumptions. Include a weakened-result route and the final-period boundary. State the selected balance policy explicitly. Also reconcile the budget: S05 starts at index 0 and prohibits advancing beyond 63, which permits 63 advances, while R01 subtracts demand from 64. These are 64 clock states, not automatically 64 spendable advances. Do not tune random percentages to repair a scheduling defect. Thin is also currently unreachable from starting evidence 3; either retain it as a deliberately unused label or revise evidence progression with route impacts checked.

Sources: [economy audit](../../../docs/07-systems-and-balance.md:98), [required reachability](../../../docs/13-testing-and-evaluation.md:150).

### 2. The Week-1 slice needs an explicit time contract

**High priority; concrete specification gap.** The slice includes configure, start, monitor, analysis, Gabriel’s queue scene, and a manuscript rehearsal. Configure/start/monitor/analyse already cost four periods. The campaign starts at period index 0; four advances reach Week 2. Gabriel’s conversation adds another period, and the rehearsal has no explicit time exception. Normal manuscript actions cost additional time. The full-game rules cannot simply produce the stated Week-1-only slice.

**Change:** choose an explicit evaluation-only clock rule or extend the slice window. Give the rehearsal its exact state, cost, save, and completion behaviour. Preserve the real energy and monitoring pressures needed for a useful evaluation. A zero-time rehearsal alone does not solve the whole slice schedule.

Sources: [slice selection](../../../docs/implementation/specs/06-content-data-and-build-profiles.md:682), [action costs](../../../docs/12-content-specification.md:134), [clock mapping](../../../docs/implementation/specs/05-calendar-scheduler-events-and-cutscenes.md:41).

### 3. Claims need scientific support, not only occupied card slots

**High priority; contract-level gap.** Strong says that the transient repatterning state “supports recovery.” Its rules require two different experiment templates, structure/rhythm coverage, a matched control, and a caveat. They do not explicitly map the association that the claim names to the honest readings or raw facts that establish it. All experiment records can contain repatterning observations, so the named repair-state experiment need not be the only possible source. The gap is that two cards must not pass merely because they satisfy template and coverage counts.

Also review whether “supports recovery” communicates a causal function despite the explicit rule that the repair state is only associated with recovery. This is a wording risk, not a request for more biological realism.

**Change:** define the scientific facts each claim needs and which honest cards establish those facts. Require the relevant association facts from any approved source that can establish them, or narrow the wording. Add tests where card counts pass but the scientific association is absent. Keep the explicit possibility of dishonest reported support separate from honest raw support.

Sources: [claim resolver](../../../docs/implementation/specs/04-commands-rules-and-determinism.md:402), [science progression](../../../docs/04-science-and-experiments.md:62), [claim wording](../../../docs/12-content-specification.md:341).

### 4. Some experiment choices have penalties but no defined benefit

**High priority for the core loop.** A higher-risk family choice adds one preparation issue. The design promises a broader or more novel record, but the technical outcome and reward contracts do not define how that broader record changes the question answered, usable evidence, manuscript, reviewer response, or authored feedback. An implementer must either invent that benefit or create an option that only worsens the odds.

Matched and limited controls also use the same configuration cost, while matched controls support stronger evidence. There is no clear general reason to choose limited controls voluntarily. A broader question can have narrative value without extra points, but that value must exist in the authored result.

**Change:** specify one concrete trade-off per family choice: a different answer, coverage, opportunity, cost, or constraint. Where there is no intended trade-off, make the weaker condition a consequence of circumstances rather than a nominally equivalent strategic option. Test both options against the same seed and circumstances.

Sources: [promised choice effect](../../../docs/04-science-and-experiments.md:104), [preparation penalty](../../../docs/implementation/specs/04-commands-rules-and-determinism.md:307), [evidence rewards](../../../docs/implementation/specs/04-commands-rules-and-determinism.md:369).

### 5. Authored text can contradict the state that selects it

**High priority; several concrete defects.** The catalogue validates identifiers and counts, but those checks cannot establish that a selected sentence is true.

| Example                                                                                                                   | Why the wording can be false                                                                    | Correction                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Strong laser result says the matched sham remains stable. Weak laser result attributes failure to controls or monitoring. | The form is selected by biological outcome; controls and monitoring history are separate facts. | Select factual clauses from the relevant facts, or write outcome-only text. |
| Samira’s ambiguous ending says her name appears beside yours in a supplementary file.                                     | Starting trust 40 selects ambiguous even if her work was never used.                            | Condition on actual authorship, or use neutral text.                        |
| Undiscovered-misconduct ending says “The published version looks stable.”                                                 | Misconduct can coexist with under-review or rejected/withdrawn work.                            | Use the actual paper state or state-neutral wording.                        |
| Week-6 task says the claim now carries the requested confidence.                                                          | A commit is required, but claim selection remains free.                                         | Distinguish compliance, resistance, and incomplete revision.                |
| Manuscript UI says the confirmation costs one period/one energy.                                                          | Initial draft and PIIM commitment cost three periods/two energy.                                | Read the actual action cost.                                                |
| Supported description promises “clearer warnings.”                                                                        | Both profiles explicitly receive the same warnings.                                             | Correct the description.                                                    |

**Change:** introduce a semantic content test: for each state-selected form, list the facts its words assume and test counterexamples. Cross product paper, integrity, authorship, relationship, and raw/evidence-quality states where they interact. This can mostly use existing modules and revised prose; it does not require a large new narrative tree.

Sources: [experiment record text](../../../docs/12-content-specification.md:952), [ending modules](../../../docs/12-content-specification.md:1231), [Week-6 task](../../../docs/12-content-specification.md:580), [UI cost](../../../docs/10-ui-ux-accessibility.md:106), [profile wording](../../../docs/12-content-specification.md:1144).

## Design risks to test earlier

### 6. The current slice cannot validate the full game’s central pressure

**High production risk; recommendation, not a measured failure.** A first laser run is useful for controls, presentation, and save behaviour. It cannot prove competing experiment schedules, contradictory manuscript revisions, the PIIM response, both career preparations, or late-game pacing. Steps 24–25 already test revision and relationship components, but the combined publication, career, and full-act sequences arrive around Steps 43–50, after substantial asset production.

**Change:** retain the polished opening slice, but bring forward a small rules-only campaign trace and a temporary playable mid-campaign scenario. The latter should combine a monitoring deadline, manuscript revision, and career or colleague opportunity. Also test the empty Weeks 15–16 tail early. These are internal test scenarios, not additional shipped content. Introduce them through a bounded roadmap amendment rather than a new full specification programme.

Sources: [slice gate](../../../docs/13-testing-and-evaluation.md:396), [later implementation order](../../../docs/implementation/development-roadmap.md:228), [late-tail risk](../../../docs/03-narrative-and-campaign.md:77).

### 7. The prose needs character and state review before it becomes fixed runtime content

**Editorial judgement; not a playtest result.** Many lines are individually effective. However, the cast often shares the same polished bureaucratic joke structure. Haoran, Samira, Gabriel, Elena, and the internal narrator frequently finish exchanges with an institutional aphorism. That can weaken the promised human differences and make the comedy predictable.

There are also generic branch joins, such as Haoran’s “Thank you. Or understood. Both are useful to know.” They preserve a small branch count but make the character sound aware of alternative player choices. The assigned scene durations are targets; a short script plus manually advanced dialogue does not establish a measured two-minute scene or a hard maximum reading time.

**Change, subject to Leonardo’s creative judgment:** make a focused editorial pass with distinct speech habits, some direct non-comic lines, and endings that respond to the chosen option. Review one scene in motion before expanding this treatment. Keep the private Leonardo-only playtest boundary. The clean-context LLM check supports comprehension; it cannot certify fun or broad audience response.

Sources: [optional scripts](../../../docs/12-content-specification.md:772), [character voice requirements](../../../docs/05-characters-and-dialogue.md:224), [evaluation limits](../../../docs/13-testing-and-evaluation.md:445).

### 8. Scope counts do not prove playtime or production feasibility

**Production risk.** Six thousand unique words measures vocabulary, not total prose or reading time. The unique-word cap does not bound total authored words or reading time. The fallback and full game retain the same 64-period calendar, all seven mandatory scenes, all endings, and much of the same structure. Adding two templates, three scenes, and some environmental text does not by itself explain a change from 90 to 180 minutes. Neither duration is measured.

The asset plan is bounded but still includes four adapted characters and animations, original station/science presentation, five vocal palettes, and music under a EUR 150 non-LLM budget. The required whole-plan feasibility gate is sensible and should happen early.

**Change:** add total authored-word and representative per-run reading estimates alongside any vocabulary cap. Treat duration as a target to measure, not a reason to add repeated walking or confirmation. Complete asset feasibility before major visual work. Reframe scope only after evidence and Leonardo’s decision.

Sources: [word-count rule](../../../docs/12-content-specification.md:42), [fallback cut line](../../../docs/12-content-specification.md:1287), [asset feasibility](../../../docs/14-production-plan.md:74).

## Subagent and implementation workflow

The existing safeguards are useful: one primary decision-maker, focused source packets, exclusive file ownership, isolated worktrees for delegated writes, read-only independent review, and no worker delegation. Keep them. More agents or a more capable model will not resolve contradictory contracts automatically.

I recommend these changes:

1. **Use Astra as the primary agent as requested.** Keep the actual historical Sol/Opus attribution. Astra primary should resolve ambiguous rules, shared contracts, and integration decisions. A delegated Astra worker can implement a difficult but already approved contract. Terra remains an option for bounded implementation and evidence scans; Luna is useful only for genuinely mechanical work. Use Sol or a separate Astra context for independent technical review. This is a proposed allocation, not a claim that this project has benchmarked the models.
2. **Remove the old model matrix from the repeated control prose.** Keep role responsibilities in instructions and exact defaults in configuration. Record the actual model and effort per completed assignment. Reviewers and researchers currently pin their models in custom TOML files. Official documentation says those model and effort values override the resolved spawn, default, or parent values. Switching the parent or passing a spawn override does not replace a value pinned in that custom file. Update both the routing rule and those files in a later approved change.
3. **Review the contract before delegating risky implementation.** Before state, scheduler, manuscript, persistence, or content work, check that the contract can represent a few complete legal scenarios and rejects a few precise counterexamples. A missing rule returns to the primary before code work. Step 4 demonstrates why reviewing only a completed implementation is too late for representability gaps.
4. **Separate conformance review from adversarial game review.** One review asks whether code implements the approved contract. The other asks whether the contract and selected text can produce coherent play. Use the latter at risk gates rather than on every trivial change. Give it authoritative sources and expected behaviours without the author’s persuasive explanation of why the solution is correct.
5. **Give small work to the primary when delegation adds no value.** Keep two concurrent subagents as a sensible ceiling, not a quota. Use parallel read-only exploration or genuinely independent implementation paths. A downstream diagnostic that waits for rules is sequential work.
6. **Reduce review and record churn through an approved policy change.** Use one complete review of the submitted packet, then focused independent review of corrections and their affected dependencies. Repeat the complete review when the correction changes shared behaviour, authority, or broader assumptions. Do not send the same full repository back for every isolated test or wording fix. Keep required checks; improve their focus.
7. **Make current status have one source.** Use one short resume record naming the accepted main head and any newer unintegrated worktree packet. Other control documents should link to it rather than repeat the full changing history. Main still contains conflicting v3/v4 wording, and current work-order headings differ from S13’s exact required schema. Resolve these mechanically before relying on a work-order validator; do not make every formatting mismatch a game-design decision.
8. **Make the handover explicit.** Reconcile the newer Step-4 branch packet with main, verify what the interrupted session completed, then assign the remaining independent review under the revised model policy. Preserve unintegrated work and existing approvals. Do not restart Step 4 or let two sessions independently integrate the same branch.

Current sources: [S13 routing and review](../../../docs/implementation/specs/13-agent-work-orders-and-integration.md:268), [step cycle](../../../docs/implementation/development-roadmap.md:48), [work-order schema](../../../docs/implementation/specs/13-agent-work-orders-and-integration.md:203), [current work order](../../../docs/implementation/work-orders/MR-WO-WP01-003.md:120), [official Codex subagent configuration](https://learn.chatgpt.com/docs/agent-configuration/subagents).

## What the earlier reviews achieved

The Opus reviews and R00–R07 decisions materially improved the design: clearer forecasts, distinct biological/evidence results, manuscript support cards, bounded room obstructions, concern handling, repeated comedy, and private evaluation. They correctly separated predictions from measured play evidence.

Their completion does not mean every risk passed. Economy calibration, evidence progression, late-tail pacing, comprehension, traversal, and asset feasibility still need their specified evidence. The deliberate rejection of automatic punishment for hidden misconduct is an approved creative choice, not an unresolved defect. Neither external testers nor a different ending philosophy are required to repair the findings above.

See the [recommendation register](../../../docs/reviews/recommendation-register.md:107).

## Suggested discussion order

1. Select the honest-path balance policy and repair the campaign/slice time contracts.
2. Resolve claim support, experiment-choice value, and text/state contradictions.
3. Approve a small workflow/model/handover amendment and earlier campaign-risk tests.
4. Resume the preserved Step-4 packet, then continue with the corrected baseline.

No tracked game or Career Center file was changed. No implementation, test run, integration, commit, or publication was performed by this review.

Independent critical review found no blocker and requested three clarifications: preserve the available balance options, define scientific fact-to-claim support without requiring one specific template, and retain shared-rule decisions with the primary agent. All three are incorporated.
