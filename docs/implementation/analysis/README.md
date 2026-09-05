# Campaign correction analysis

Status: candidate C01–C06, not a runtime implementation or frozen rule. See `../../reviews/2026-09-05-astra/baseline-candidate.md` for the exact proposed decision.

## Run

Use Node 24.20.0, no installation or new dependency:

```
node docs/implementation/analysis/schedule-checker.mjs
node docs/implementation/analysis/schedule-checker.test.mjs
```

Node's built-in test module runs 23 named tests directly. `node --test` is also supported; in the current environment its reporter aggregates the file into one suite-level result. The checker only recomputes explicit period/energy arithmetic, once-per-action night surcharges and capped recovery. It does not implement a command, search for routes, process events, check scientific outcomes or certify prerequisite/roster correctness.

`campaign-schedules.json` is static authored data. `planning` is an analysis label for the candidate's free light configuration action, not a new runtime work class. No trace uses push-through. Zero-energy light actions remain valid. Every unfilled campaign period is an explicit protected break; free-time slack is not silently skipped. The no-time completion labels are expected semantic results, not executed ending resolvers.

## Candidate timing and manual ledger

The source contracts are `../../12-content-specification.md` action/experiment/task/scene tables, `../../06-world-and-level-design.md` rosters, S04 Time/Energy and Career Routes, S05 Crossed-period order and Fixed campaign chain. C01 differences are explicit in the candidate patch. Required automatic notices are read at first safe point; they add no period. Required scenes run before the next work action, even when a record could be analysed then.

| Trace / work   | Start completion | Monitoring pre-command periods | Analysis / report          | Manual finding                                                                                                                                       |
| -------------- | ---------------: | ------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core laser     |                2 | 2                              | 3→4 / 4→5                  | Queue resolved at 0, Ready, configured at 1.                                                                                                         |
| Core range     |                9 | 9                              | 11→12 / 12→13              | Laser analysed; imaging wait 5→6; range starts 7, within W2–W4.                                                                                      |
| Core repair    |               16 | 16                             | 18→19 / 19→20              | Range analysed; monitor16→17 before due W5 scene17→18.                                                                                               |
| Core batch     |               35 | 35                             | 37→38 / 38→39              | New W9 start limit; Helpful Comments at 36 runs before analysis. Its frozen batch-limited reviewer form can be answered by the later analysed batch. |
| Core oxygen    |               44 | 44, 46                         | 47→48 / 48→49              | Helpful Comments already complete; Gabriel restores Ready for zero extra response cost. Break between windows is legal.                              |
| Broader laser  |                2 | 2                              | 3→4 / 4→5                  | Gabriel accepted queue at early period 0.                                                                                                            |
| Broader range  |                8 | 8                              | 9→10 / 10→11               | Samira shares imaging at late period 5; Ready.                                                                                                       |
| Broader repair |               14 | 14                             | 15→16 / 17→18              | Haoran help at early period 12; W5 scene before report.                                                                                              |
| Broader batch  |               28 | 28                             | 32→33 / 33→34              | Monitor28→29 before due Public Record scene29→30.                                                                                                    |
| Broader oxygen |               43 | 43, 45                         | 48→49 / 49→50              | First run occupies one slot until analysis.                                                                                                          |
| Broader drug   |               45 | 46                             | 50→51 / no required report | Reply/video done, starts W12; oxygen's second monitor runs before drug's final monitor. Two of three slots occupied.                                 |

Core-supported uses exactly core-standard action periods with Supported energy; it is a conservative reference, not an optimal Supported schedule. The industry-only variant replaces the research plan at the same period with a protected break. The neither variant does the same in the core trace and never replies to Camila. The weakened Supported variant uses the core schedule with five Inconclusive records, honest caveats, no Camila reply and evidence remaining 3; its plan cannot satisfy Aldercroft's evidence threshold.

Report-to-Elena is a light desk action (`02-player-experience-and-loop.md`, action table), so it does not require her physical night presence. The broader Haoran contact is at period 12 early, Samira shared-instrument at period 5 late, and Samira credit at period40 under the optional-scene roster override in `06-world-and-level-design.md` (Weeks10–14 normal early roster contains only Gabriel). Camila contacts are remote. Required scenes have their authored location override/fallback. No optional local scene is scheduled against an absent roster.

## Required scenes, routes and outcomes

Core mandatory scene starts: 0, 17, 26, 29, 36, 52, 63. A Complete Narrative queues at16 and starts after higher-priority monitoring. Core initial draft 22→25, required caution revision 25→26, What We Had follow-up 28→29, preprint 30→31, plan 40→41, PIIM response 53→56. The draft overruns Week 6 but Remove Caution remains due after the draft, as C01 explicitly states; it is not erased by week expiry. A protected break at 27 is allowed before the required work commit, after the due scene.

Broader mandatory starts: 0, 16, 24, 29, 36, 52, 63. Public Record queues at28 and starts after higher-priority monitoring. Draft 19→22, caution revision 22→23, follow-up 25→26, preprint 30→31, plan 35→36, reply 34→35, video 38→39, PIIM 53→56. Plan is before period 44; video is within periods 36–39. All included results have arrived by period 51.

Choose Clarified start stance (+5 confidence), careful manuscript choices and honest fully answered reports. Starting confidence 45 plus opening 5 and five full reports permits Aldercroft >=50 despite careful-claim deductions. Both full-support cores reach evidence >=6 by the period-48 check. A serious visible concern or public withdrawal is absent. The broader careful Camila reply/video add 20 trust, sufficient from the documented starting trust to pass >=41. Three analysed records and an honest limitation exist before the period-56 Morrow check. PIIM resolves before the Morrow contact; its exact accepted/published/review/rejected outcome is not assumed and does not itself determine career eligibility.

These are outcome-conditional references: no concrete seed is claimed to produce all usable results before the real catalogue and result mapping exist. The weakened trace proves only arithmetic and the specified eligibility counterexample, not that one chosen seed supplies all five Inconclusive results. Runtime tests must establish compatible fixed seeds or typed controlled fixtures without claiming natural-seed reachability.

## Slice, boundaries and costs

Each opening completes Clarified and Gabriel queue, free configuration, focused start, routine monitor, analysis, a break and rehearsal. It ends at period 6. Selected evaluation content excludes the full report/request chain and later campaign content. Rehearsal completion requires a verified slice checkpoint with its snapshot; simply reaching period 6 is insufficient.

Both normal and latest monitoring starts are represented. An unanswered normal window is missed on entering S+2; oxygen windows expire on S+2 and S+4. These are manual contract cases for later scheduler tests, not behavior of this checker. Add runtime counterexamples for a long action/crash crossing both windows, event expiry before next unlock, a required task at insufficient energy, and final action 62→63 versus rejected 63→64. The arithmetic tests already reject the extra advance, an impossible Week-1 opening, cap overflow and silent energy overdraft.

The base core uses Gabriel support rather than a late-service wait. The two `core-late-wait-*` variants instead wait at 41→42, recover at 42→43, start oxygen 43→45, monitor at 45 and 47, analyse 48→49 and report 49→50. They explicitly reschedule the windows; they finish before the same Week14 gate and pass both profiles' arithmetic. The two quality-monitor opening variants pay focused monitoring and its actual surcharge, add recovery before analysis, and finish at period7. These are authored alternatives, not runtime proof.

## Pressure and tail risk

Core laboratory/report work finishes at 49; broader at 51. Mandatory PIIM ends at 56. The current tail then contains up to seven break advances (six after the broader offer), often at full energy. This is direct design evidence of an underfilled late tail, not a reason to add arbitrary chores. Gate 26A must test whether the final waiting period feels intentional. If it does not, bring back a targeted pacing decision (for example a stated voluntary passage to the final scene), rather than silently compressing the approved calendar.

## Reading-volume evidence

`reading-volume.json` records 4,747 word tokens in 41 English-text tables from the original catalogue at main9e3dba9, with source-line counts. The method excludes rule prose and inline authored recaps/variants, removes text keys before spaced em dashes, and includes mutually exclusive branches. It is a reproducible partial authored-volume measure, not the shipped vocabulary count or a per-run total. A separate evidence explorer counted 4,762 before removing the five support text-key prefixes; the 15-token difference is explained by that cleaning step.

The mandatory-scene/Week6 tables contain 561 tokens across all table branches. Required inline variants, recaps and confirmations are additional. A full run's read text cannot be inferred exactly until the chosen state/reading path is encoded. For a stated 500-word scene-text example, reading alone is 3.33/2.50/2.00 minutes at 150/200/250 words per minute; this is an example calculation, not measured duration of the mandatory scenes. The assigned 14:45 scene total remains a production timing target. Runtime instrumentation must count actual displayed/optional-read strings separately and compare private playtime with the 90/180-minute targets.

## Refined observation and late-start cases

Every normal reference explicitly chooses a single view: laser/repair/oxygen/drug structure, range/batch rhythm. Routine monitoring supplies the selected single-view coverage; no paired coverage is assumed. Unselected structure/rhythm fields are UNOBSERVED, not positive recovery facts. The quality-opening variants explicitly choose paired views and pay qualityCheck. All asserted Usable/recovery outcomes are controlled conditional assumptions, not inferred from monitoring alone.

The additional broader-strong-supported trace uses the same timing as the broader route. It selects repair association plus range rhythm in early snapshots, and repair+batch+oxygen at PIIM, all with the association caveat. It therefore exercises one scientifically supported Strong board without treating two card IDs as association. The ordinary broader route remains Careful.

Oxygen's final allowed start is44→46. An earliest response sequence46→47 and48→49 leaves analysis49→50/report50→51. A start at45 is rejected. Configured-window expiry and the period52 unanalysed-run expiry are explicit candidate scheduler contracts, not behavior of the arithmetic checker. Later tests must prove no stranded slot, no invented monitoring response, no rerolled variation, idempotent stop logs and preserved analysed records. startedPeriod stores the post-start period used as offset origin.

The same proxy on the applied candidate preview is **4,797 words**, an increase of50 over the original4,747. It deliberately excludes the new semantic/question tables with different column headers as well as inline prose/recaps. These are partial comparable counts, not complete authored volume or per-run reading time.
