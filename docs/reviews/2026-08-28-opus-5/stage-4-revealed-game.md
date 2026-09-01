# Player-Behaviour Review: _Minor Revisions_

## 1. Corpus confirmation

I received and read the following files completely:

| #   | File                                    | Read in full | Notes                                                                                          |
| --- | --------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| 1   | `docs/02-player-experience-and-loop.md` | Yes          | Core loop, time/energy economy, B10 action-cost table.                                         |
| 2   | `docs/03-narrative-and-campaign.md`     | Yes          | 16-week beat sheet, mandatory scenes, submission ladder, Morrow/Aldercroft, epilogue contract. |
| 3   | `docs/04-science-and-experiments.md`    | Yes          | Evidence model, damage ladder, six templates, authored baselines.                              |
| 4   | `docs/05-characters-and-dialogue.md`    | Yes          | Cast, working-trust contract, schedules, dialogue rules.                                       |
| 5   | `docs/06-world-and-level-design.md`     | Yes          | Floor plan, station placement, act states, schedules, staging.                                 |
| 6   | `docs/07-systems-and-balance.md`        | Yes          | Full numeric state model, thresholds, outcome bands, route readiness, final resolver.          |
| 7   | `docs/08-endings-and-state-matrix.md`   | Yes          | Route unlocks, PIIM band, ending modules, citations, archive rules.                            |
| 8   | `docs/09-art-audio-and-assets.md`       | Yes          | Presentation, palette, asset limits, licensing gate.                                           |
| 9   | `docs/10-ui-ux-accessibility.md`        | Yes          | HUD, Research Status, menus, save/archive, accessibility baseline.                             |
| 10  | `docs/11-technical-architecture.md`     | Yes          | State model, determinism, persistence, recovery, testing.                                      |
| 11  | `docs/12-content-specification.md`      | Yes          | Authoritative content catalogue with IDs, effects, English draft.                              |

No file was absent, empty, truncated, or unreadable. Referenced but **not supplied**: `01-*` (vision), `13-testing-and-evaluation.md`, `15-implementation-contract.md`, `assets/ASSET_MANIFEST.md`, `strings.en.json`. Their absence does not block this review; where a prediction depends on them, I flag it in Part 11.

---

## 2. The revealed game (300–500 words)

Stripped of framing, this is a **fixed-length deterministic scheduling game with a legible three-condition route gate and a satirical narrative skin**.

The player receives 64 indivisible time tokens across 16 immovable weeks. Roughly 48–62 of them are needed for a "route"; the rest are slack. Every meaningful action costs 1–3 tokens plus 0–2 energy, and the cost is always displayed **before** commitment. Energy is a soft secondary currency: it can be refilled by a 1-period break, and running it to zero costs one extra period plus incidental damage. Time, not energy, is the binding constraint.

The rules layer is unusually transparent. Research Status shows evidence points as a band, PI confidence as a band, integrity as segments, and five trust bars. Trust moves in fixed ±10/±20 steps from authored choices only. Evidence moves +2/+1/0 from analysed results. PI confidence moves in ±5/±10 steps from requests and claim commits. Route unlocks are published as arithmetic: Aldercroft needs a research plan plus two of three named thresholds; Morrow needs reply + call + preprint + Developing + Camila ≥41 + no confession. Both start close to satisfied: PI confidence 45 and Elena 60 mean a player only has to _avoid_ losing ground, and Camila starts at 40 with a single +10 reply available.

Experiment outcomes are not a skill test. Preparation quality selects one of three probability bands; a stored seed then locks a variation that reloading cannot reroll. Preparation is not modelled as player craft — it is modelled as _spend more periods on quality-check monitoring and controls_. So experiments resolve into a resource conversion: **periods + energy → evidence points → packet label → route condition and PIIM cards**.

The narrative layer is on rails. Seven mandatory scenes occur in every run at fixed weeks. Weak work never delays the calendar; it only changes which of a small set of labelled routes remains. There is no early failure state, no game-over, no permadeath of the campaign. Consequently the only real loss the system can impose is _route closure_ and _label downgrade_.

Integrity is the one system that is deliberately made non-instrumental. Fabrication improves PIIM card appearance and costs nothing that any published unlock condition tests, except a voluntary confession to Camila. Honesty costs nothing either, unless the player wanted the appearance of met cards.

What the design therefore teaches is: **read the published thresholds, pay the cheapest actions that satisfy them, keep energy above zero, take the free +10 conversations, and treat integrity as a purely expressive dial.** The game's satire is delivered through text; its mechanics deliver a solvable, low-variance planning puzzle whose optimal play is legible by roughly Week 3.

---

## 3. Player behaviour classes

Using 100 hypothetical players as a device to enumerate _kinds_ of behaviour (no distribution claimed):

**Class A — Threshold optimisers.** Open Research Status constantly, treat route conditions as a checklist, plan period budgets, never crash, take every +10 trust option, choose claim level by PI-confidence arithmetic rather than belief.

**Class B — Narrative role-players.** Choose lines that fit a self-image ("I am the careful postdoc" / "I am the tired one who caves"). Read records. Accept route loss as story. Rarely check Research Status mid-week.

**Class C — Completionists.** Attempt every optional scene, every experiment including repeats and the drug template, both career routes open at Week 16, and maximum citations. This is the class most likely to hit the energy wall the docs describe.

**Class D — Curiosity/exploratory players.** Inspect all 30 environmental items, walk the floor at night to see the act-state changes, test the exit interaction before Week 16, deliberately try a weak run to see what breaks.

**Class E — Transgression testers.** Deliberately fabricate to see whether the game punishes them; deliberately withdraw the public record to see the "no route" ending; confess to Camila to see the closure.

**Class F — Minimalists / speed-finishers.** Discover that no gate waits and no failure ends the game, then do only mandatory content plus the two cheapest route conditions, ending the campaign in far fewer than 64 productive periods.

**Class G — Misreaders.** Believe energy is the main survival resource; believe integrity affects endings mechanically more than it does; believe the preprint claim level matters more than it does; believe scenes can be missed.

---

## 4. Early-, middle-, and late-game learned behaviour

### Early (Weeks 1–5, "Supplementary data")

Trained lessons:

- **Costs are always pre-announced.** After two or three confirmations, the player learns to trust the cost preview and stops hesitating. Uncertainty about spending disappears very early.
- **Walking, reading, and talking are free.** This is stated and reinforced. Players learn to do all exploration, inspection, and dialogue reading in a batch, because it never charges. This makes the floor a _free_ layer and the stations a _paid_ layer — a very clean mental separation.
- **The calendar does not wait.** Week 5 opens manuscript work "even with a weak packet". A player who discovers this once learns that the campaign cannot be lost by underperforming, only relabelled.
- **Analysis is the only thing that converts work into evidence.** The chain configure(1p/1e) → start(1–2p) → monitor(1p) → analyse(1p/1e) is fixed and repetitive. By the second cycle it is routine, not decision.
- **Quality monitoring costs 1 energy more than routine monitoring** and, per the band table, moves preparation toward Robust. This is the earliest optimisation discovered: pay the extra segment, get 80/20 instead of 20/60/20.
- **Trust is a vending machine.** Optional scenes cost 1 period, 0 energy, and hand out +10. Class A and C players learn immediately that these are the cheapest state changes in the game.

### Middle (Weeks 6–12, manuscript and review)

- **Claim level is a dial with published effects** (careful −5, strong +5, inflated +10 PI, with integrity cost only for record handling, not for claim level). Players learn that _inflated claim_ is not itself an integrity loss under the stated rules — integrity only moves on omission (−10), altered reading (−25), unsupported reading (−45). This is a crucial learned distinction: **overselling is free; misreporting is not.**
- **PI confidence is easy to farm.** Fully answering a request is +10; a commit is +5 or +10. Losing 10 requires actively ignoring something. Players learn Supportive/Invested is a near-default.
- **Research plan before Week 12 is a single 1-period action** that gates the entire academic route. Once known, it becomes an obligatory tick, taken as early as legal (W8).
- **The Morrow chain is three cheap actions** (reply 1p/0e, call 1p/1e, keep offer open) plus a preprint that happens in every run anyway. Players learn the industry route is the cheapest route in the game.
- **Repeats have diminishing returns and the game says so.** This kills grinding as a strategy — deliberately. Players learn to stop after the first repeat.
- **Reviewer conflict is answered by cards, not by prose.** Batch, oxygen, claim-scope. Three binary-ish objects. Players stop reading reports for meaning and start reading them for card mapping.

### Late (Weeks 13–16)

- **Nothing new can be earned.** Aldercroft resolves W13 on conditions frozen earlier; Morrow resolves W15; PIIM resolves W15 from the W14 commit. Weeks 15–16 contain almost no player agency except the final choice.
- **Slack periods become worthless.** Since no route condition is still open and no scene can be added, leftover time has no sink except optional scenes that have mostly expired (most expire W12–W14). This produces a _dead tail_.
- **The final choice is a menu selection, not a gamble.** Availability is fully known by W15; the player has already been told through Research Status route feedback.
- **Citations become the only remaining collectible.** Class C players will consciously route toward MR-CIT-07 (record-handling decision) and MR-CIT-08 (respond to a concern) because they are the only ones requiring specific late behaviour.

---

## 5. Dominant, safe, expressive, and neglected actions

### Dominant (highest value per period)

| Action                             | Cost    | Return                                      | Why dominant                                             |
| ---------------------------------- | ------- | ------------------------------------------- | -------------------------------------------------------- |
| Optional local character scene     | 1p / 0e | +10 trust, often a flag, sometimes +1 EV    | Only 0-energy state-changing action with a large effect. |
| Report to Elena                    | 1p / 0e | +10 PI confidence                           | Free-energy 10-point swing on a 100-scale gated band.    |
| Morrow reply                       | 1p / 0e | +10 Camila, opens whole route               | Opens the cheapest career route for one light action.    |
| Research plan                      | 1p / 1e | Gates entire academic route                 | Single-point-of-failure unlock.                          |
| Quality-check monitor              | 1p / 1e | Moves outcome band from 20/60/20 to 80/20/0 | Converts 1 energy into a large expected-evidence gain.   |
| Samira "Not in My Figure" → credit | 1p / 0e | +10 trust, **+1 EV**, citation              | The only optional scene that pays evidence.              |

### Safe (low risk, low information cost)

- Routine monitor (1p/0e) — never harmful, keeps the window from lapsing.
- Protected break in a fresh week (1p → +2 energy) — the efficient break; later breaks (1p → +1) are strictly worse and players will learn to take at most one per week.
- Careful claim — costs 5 PI, protects against nothing mechanical, but avoids the "requirements warning" and the harder reviewer wording.
- Reading everything — free.

### Costly / irrational

- **Cancelling an active experiment.** Loses the group _and_ the spent time, gains nothing. Players learn never to do it after one accident.
- **Second and third protected breaks in a week.** Half the return of the first.
- **Later repeats.** The game announces their futility.
- **Night/after-hours focused work in Standard when an early/late period is available.** +1 energy for identical output. Rationally, night work is only for players who have run out of daylight periods in a week — but since periods are just an ordered list of 64 and each week has exactly one of each, the "surcharge" is really a _fixed tax on half of all periods_, not an avoidable choice. This is a subtle point players will misread at first (see §11).
- **Pushing through at zero energy.** One extra period lost, a missed monitoring window, plus possible route closure. Strictly worse than a 1-period break in almost all states.
- **Public-record withdrawal.** Closes both routes and forces End of Contract. It is a pure self-destruct button and will be pressed only by Class E.

### Neglected

- **The drug-exposure template** (2p start + 1p monitor + 1p analyse + energy) for a benefit described only as "can strengthen Morrow context" and "never required". Optimisers will skip it; only Class C and D will run it.
- **The exit interaction before Week 16** (one dry line).
- **Environmental text** for anyone not in Class D — explicitly never required for any fact.
- **Research Status route feedback** for Class B/F, who don't open the panel.
- **Gabriel's service pass-through** (unlocked at trust 61) — a walking convenience in a floor whose loop is 75–90 m and where walking is free. It has almost no mechanical value; it will be read as a flavour reward, which is likely its intent, but it will not motivate trust-building.
- **The manuscript board's expressive depth** — card arrangement, snapshots, version comparison. Since only the committed claim level and card coverage have stated effects, the arranging is decorative.

---

## 6. Incentive and feedback-loop map

**Primary conversion chain (the real game):**

```
periods + energy
  → preparation quality (quality-check monitors, controls)
  → outcome band (80/20/0 | 20/60/20 | 0/20/80)
  → biological + evidence result
  → evidence support points (+2 / +1 / 0)
  → packet label (Thin/Developing/Coherent/Substantial)
  → (a) Aldercroft condition 1
    (b) Morrow minimum (Developing — already the start value)
    (c) PIIM batch & oxygen cards
  → Week 15 paper state (adjacent-outcome seed only)
  → ending subtitle
```

**Secondary chain (cheaper, stronger per period):**

```
1 free-energy period
  → optional scene / report to Elena
  → ±10 trust or ±10 PI confidence
  → Aldercroft conditions 2 and 3, Morrow condition
```

The secondary chain is _cheaper per unlock_ than the primary chain. Two of Aldercroft's three conditions (PI confidence, Elena trust) are purchasable through 0-energy conversations and request reporting; only one requires experimental labour. Since only **two of three** are needed, **a player can unlock Aldercroft without ever reaching a Coherent packet.** That is the single most consequential incentive in the document set, and it teaches: _talk, don't experiment._

**Damping loops (deliberate, and effective):**

- Diminishing repeats + explicit warning → prevents grinding.
- Fixed calendar → prevents stalling.
- No catch-up resource → prevents deficit spirals from being recoverable by a single action, but also prevents them from being fatal.
- Locked seed at experiment start → prevents save-scumming.
- Raw record permanent → prevents evidence deletion strategies.

**Missing loops:**

- No loop punishes _doing less_. Slack time has no decay, no accumulating penalty, no rival who advances. Samira is described as a potential rival for "the same academic opportunity" but no rule makes her progress if the player idles.
- No loop rewards evidence beyond the thresholds. Substantial (9–12) and Coherent (6–8) are identical for Aldercroft; PIIM cards are met/partly/not met, not scaled. So evidence has a **hard ceiling of usefulness at ~6–8 points**, and points 9–12 are cosmetic (an ending-summary label).
- No loop connects energy to anything except the crash. Ending energy affects only the fatigue module's _tone_. So energy is worth spending down to 1 with no consequence, provided you never hit the crash.

---

## 7. Standard versus Supported

The documented differences are: start 5 vs 4 segments; breaks restore 3 vs 2/1; no night/after-hours surcharge; extra warnings before gates and irreversible choices. Same calendar, same 64 periods, same routes, same endings.

Behavioural consequences:

- **Supported removes the only recurring cost pressure.** With no late-period surcharge and 3-segment breaks, energy essentially stops being a constraint. A Supported player spends one period per week on a break and is permanently solvent. The game becomes a pure period-allocation puzzle — which, given that 48–62 of 64 periods are needed even for the high-evidence path, is still a real constraint but a fully deterministic one.
- **Standard's pressure is mild and front-loaded.** Four segments, +1 on half the periods, and a first-break restore of 2 means a Standard player must break more often but still cannot easily crash unless they choose to (Class C behaviour). The crash is described as reachable mainly by "trying to maximize evidence, PI confidence, relationships, and both career routes in one run" — i.e., it is a _completionist penalty_, not a baseline threat.
- **The extra warnings in Supported are an information advantage, not a difficulty change.** Warnings before gates and irreversible choices reduce the chance of accidental route loss. Under the stated framing ("no content penalty, no stigma"), an optimiser who learns this will pick Supported for the strictly better information — profile choice becomes a mild dominant strategy question rather than a tone preference.
- **Profile is locked per save and set at New Game, before the player understands the economy.** This means the first choice is uninformed. Class G will pick Standard because it is default and called "intended", then discover the crash rules mid-run with no way to change.
- Because both profiles produce identical endings and citations, there is no completionist reason to replay in Standard. Replay motivation must come from route/ending variety alone.

---

## 8. Ethical-choice behaviour

The integrity system is described as morally non-scored, and it is: no moral label, no morality meter, no automatic detection, no reward for virtue.

What the rules _actually_ teach:

1. **Inflated claims are ethically loud but mechanically free.** Claim level changes PI confidence and reviewer difficulty. It does not touch integrity. The three integrity losses attach only to omission/alteration/fabrication of _reported readings_. A player who wants the satire experience of overselling can do so at zero integrity cost — and gain +10 PI confidence, which is one third of an Aldercroft condition.
2. **Fabrication is mechanically near-free and occasionally profitable.** Per the response contract: "An altered or invented reported result can appear to meet a card where no visible record contradicts it." Discovery requires a _visible_ record mismatch, and the player controls whether that mismatch exists. Consequences of undiscovered fabrication: an ending module of tone (`ending.integrity.undiscovered`), a possible Haoran/Gabriel scene the player can deny (−20 trust to one character), and a Camila confession the player simply never makes. Neither career route is closed by hidden integrity — both documents state this explicitly and twice.
3. **Therefore fabrication is a rational route to met PIIM cards for a player with a weak packet.** A Class A player who has fallen behind on evidence learns that the "stronger response" path can convert a mixed band into "all cards met" without any published unlock penalty. The cost is a bar and an epilogue paragraph.
4. **Honesty is also free.** Honest reporting of weak work costs nothing; the defensible route just accepts a lower response band. So the choice is genuinely between _appearance-of-cards_ and _nothing_, with the loss column containing only expressive items.
5. **The correction path is a small arbitrage.** Restoring omitted evidence recovers up to 10 integrity in a run, and both `optional.haoran.missing.correct` and `optional.gabriel.archive.correct` grant +10 trust _and_ allowed integrity recovery. So the sequence _omit (−10 I) → get caught → correct (+10 trust, +10 I recovery)_ nets a trust gain at roughly zero integrity cost. Some optimisers will find this.
6. **Denial is cheap; deferral is cheaper.** Deny = −20 trust + concern flag; defer = −10 trust + the same concern flag. Since the flag is identical, deferral strictly dominates denial. Players who read the outcomes will always defer.
7. **Samira's credit is not a moral choice.** Crediting her gives +10 trust, +1 EV, a citation, and — per the rules — is mandatory if you use her evidence anyway. Refusing gives −10 and nothing. There is no trade-off; this will be experienced as a formality.
8. **The one genuinely costly ethical act is confessing to Camila** (−20 trust, route closed). It is the only place where honesty has a stated mechanical price. Class E will press it once for the ending; nobody else will.

Net: integrity choices are **expressive by construction**, and the game succeeds at making them non-instrumental — but it also makes them non-costly, which means they will read as _free flavour_ rather than as _hard choices_. The satire lands in text; the tension does not land in system.

---

## 9. Career-route and ending behaviour

**Route accounting as a player will reconstruct it:**

_Aldercroft:_ research plan (1p, W8–W11) + 2 of {Coherent evidence, Supportive PI, Elena ≥41} + no _visible_ serious evidence concern. Starting PI is 45 (Conditional) — one answered request (+10) reaches Supportive. Elena starts at 60, already above 41; only losing 20 points drops her below. **So two of three conditions are satisfied by default or by one cheap action.** Aldercroft is effectively guaranteed to anyone who does not actively antagonise Elena and completes one 1-period task before Week 12.

_Morrow:_ reply + call + preprint (automatic) + Developing packet (the starting value) + Camila ≥41 (starts 40; the careful reply gives +10) + no confession. **Also effectively guaranteed** to anyone who answers one email and takes one call.

Consequence: **the Week 16 "dramatic climax" of choosing between routes will, for most competent play, be a menu with both options lit.** The doc frames "no viable route" as the outcome of a poor run, but the published thresholds make a poor run hard to achieve accidentally. The realistic ways to end with no route are: ignore both Camila emails _and_ skip the research plan; or deliberately withdraw the public record.

This trains a specific behaviour: **players learn that the endings are chosen, not earned.** Once both routes are open, "Out of Scope" (leave anyway) is a purely expressive selection, and Class B/D/E players will take it precisely because it is the only choice that costs something notional.

**Citations shape late behaviour more than routes do.** Twelve stamps, four of them mutually exclusive endings (09, 10, 11, 12 — you cannot get Out of Scope and End of Contract in one run). Since the Archive persists across campaigns and keeps 12 cards, Class C players will plan multi-run collection. The archive gives no gameplay advantage, so the motivation is purely completion — which the design has correctly isolated, but which also means the _only_ structural replay driver is a checklist.

**Risk behaviour under the save rules.** One active save, safe-point autosaves, locked outcome variation, no chapter rewind, and completion that _deletes_ the active state. Effects:

- Save-scumming an experiment is impossible and stated to be impossible. Players stop trying after one attempt.
- Because reloading cannot change outcomes, and because no outcome is fatal, **there is no reason to play cautiously.** Risk-taking is not punished and not rewarded; it is simply flattened.
- Because completion deletes the save and there is no rewind, a player who wants to see a second ending must replay all 16 weeks. Given that the campaign is ~3 hours and the first ~2.5 hours are identical on rails, this is a heavy tax. Most players will see one ending and read about the others.
- The New Game replacement confirmation plus locked pressure profile means a player who wants to try Supported must destroy their run. This discourages mid-campaign experimentation entirely.

---

## 10. Emotional relationship created by the incentives

The mechanics produce a specific emotional shape, which may or may not be the intended one:

- **Early: mild competence pleasure.** Costs are legible, actions are safe, everything is explained. There is no fear, because nothing can be lost.
- **Middle: administrative rhythm.** The dominant verbs are _report_, _commit_, _reply_, _check the panel_. The satire's target (bureaucratic churn) is enacted, but so is bureaucratic churn's characteristic emotion: low-grade tedium with occasional wit. Because the loop is fixed at five stages and repeats six times, the experiment layer becomes a chore with good copy.
- **Late: anticlimax.** Route availability is decided by W13/W15; Weeks 15–16 have no purchasable state. The player walks a dark floor to a menu whose options they already knew.
- **Throughout: safety.** No game-over, no missable mandatory content, no unrecoverable position, no hidden failure, warnings before every irreversible act, and an explicit promise that "serious setbacks... never stop the campaign". The system is protective to the point that pressure must be _imagined_ by the player rather than _felt_ from the rules.
- **The bars invite instrumentalisation of people.** Five visible 0–100 trust bars with ±10/±20 authored steps and a published 61 threshold for "one bounded support action" mean colleagues are read as unlockables. A player watching Haoran's bar move +10 when they help him is being told, in system language, that kindness is a currency with an exchange rate. This directly undercuts the stated intent that the bars "do not measure friendship or moral worth" — visibility plus quantisation plus a threshold reward is exactly what makes something a score.
- **Integrity's freeness produces detachment.** Because misconduct costs almost nothing enforceable, the transgression will be experienced as _reading about_ misconduct rather than _committing_ it. Guilt requires stakes.

The likely dominant emotion is **wry recognition rather than pressure** — an interactive essay with a competent planning layer, in which the player is safe and the protagonist is nominally not.

---

## 11. Missing information that prevents firm prediction

Predictions above are bounded by these gaps:

1. **Absolute period budget vs. demand is not fully derivable.** 64 periods exist; 48–62 are "needed"; but the catalogue's actions do not sum to a verifiable total. I cannot confirm whether the schedule is genuinely tight or comfortably slack. If it is slack, nearly every "cost" analysis above becomes weaker.
2. **How preparation quality maps to bands is unstated.** The band table exists (80/20/0 etc.) but no rule says how many quality checks or which control settings produce "Robust". This is the single largest gap: it determines whether experiments are a puzzle or a fixed toll.
3. **"Control quality" and "observation focus" options are named but never enumerated with effects.** Without them I cannot say whether configuration is a real decision.
4. **Whether night/after-hours are avoidable.** Weeks contain exactly one of each of four periods, implying the surcharge is unavoidable on half of all work, not a choice. If some other rule allows choosing when to work within a week, the analysis changes.
5. **Monitoring window timing.** "Meaningful monitoring point" is undefined in period terms. Whether a run occupies 1 or 4 periods between start and analysis changes the whole schedule.
6. **How PIIM cards are computed** from records. "Met / partly met / not met" per card is stated; the mapping from evidence records to card state is not. This determines whether fabrication is actually the shortcut I describe.
7. **Equipment queues and faults** are called "authored situations" with no frequency, trigger, or cost. If frequent, they are the real difficulty; if rare, they are flavour.
8. **What "visible" means for a mismatch** that lets Haoran/Gabriel raise a concern, or that blocks Aldercroft. This is the hinge of the entire integrity system and is left to implementation.
9. **`13-testing-and-evaluation.md` and `15-implementation-contract.md`** are referenced repeatedly and absent; they may contain the missing band and card mappings.
10. **The vision document is absent**, so I cannot and do not compare outcomes to intent.
11. **Whether Research Status shows numeric values or only labels.** The docs say labels and bars, no formulas — but a five-segment bar plus a stated reason per change is enough for a careful player to reverse-engineer the ±10/±20 economy within one run. Whether that happens depends on presentation detail not fixed here.

---

## 12. Evidence table

| #   | Predicted behaviour                                                                          | Confidence  | Primary source                                                                                     |
| --- | -------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| 1   | Players batch free actions (walk, read, talk) and treat stations as the only "spending"      | High        | 02: "Walking, reading, and ordinary dialogue use no period"                                        |
| 2   | Optional scenes are the cheapest state change and become routine for optimisers              | High        | 12 action table (MR-ACT-RELATIONSHIP 1p/0e); 07 trust ±10                                          |
| 3   | "Report to Elena" (1p/0e, +10 PI) is a dominant repeated action                              | High        | 12 MR-ACT-REPORT-ELENA; 07 "Fully answering... gives 10 points"                                    |
| 4   | Aldercroft is obtainable without strong evidence, via PI confidence + Elena trust            | High        | 07/08 "two of these three"; starting PI 45, Elena 60                                               |
| 5   | Morrow is obtainable with two cheap actions from a default-satisfied baseline                | High        | 08 route contract; 07 starting Camila 40; careful reply +10                                        |
| 6   | Both routes open at Week 16 in most competent runs; the "climax" is a free menu              | High        | Combination of 4 and 5                                                                             |
| 7   | Evidence above ~6–8 points has no mechanical use                                             | High        | 07 packet bands; Aldercroft needs "Coherent or Substantial"; PIIM cards are ternary                |
| 8   | Repeat-grinding does not emerge                                                              | High        | 04/07 diminishing returns + explicit in-game warning                                               |
| 9   | Save-scumming does not emerge                                                                | High        | 07/11 locked outcome at start; seed stored; reload cannot reroll                                   |
| 10  | Cancelling an experiment is learned-once-then-never                                          | High        | 02/07 "Stopping loses the sample group and elapsed game time"                                      |
| 11  | Second/third weekly breaks are avoided                                                       | High        | 07 first break +2, later +1, both 1 period                                                         |
| 12  | Inflated claims are used freely because they cost no integrity                               | High        | 07 integrity losses attach only to omission/alteration/invention; claim gives P+10                 |
| 13  | Undiscovered fabrication is mechanically near-free and can be rational for a weak packet     | High        | 07/08 "hidden integrity problem alone does not block/close"; 08 "can appear to meet a card"        |
| 14  | Deferral dominates denial in the Haoran/Gabriel concern scenes                               | High        | 12: deny −20 + flag; defer −10 + same flag                                                         |
| 15  | Correct-after-omission is a small trust arbitrage                                            | Medium      | 12 correct choices give +10 trust and "allowed I recovery"; 07 caps recovery at 10                 |
| 16  | Crediting Samira is read as a formality, not a dilemma                                       | High        | 12: +10 trust, +1 EV, citation, no downside; 03 credit is mandatory if evidence used               |
| 17  | Drug-exposure template is skipped by optimisers                                              | Medium-high | 03/04/08 "never required", "can strengthen"; 4+ periods of cost                                    |
| 18  | Weeks 15–16 are a dead tail with no purchasable state                                        | High        | 03 beat sheet; 07 route checks resolve W13/W15                                                     |
| 19  | Trust bars cause instrumental reading of colleagues                                          | High        | 05/07 visible 0–100 bars, fixed ±10/±20, published 61 support threshold                            |
| 20  | Energy is not a real constraint except for completionists                                    | Medium-high | 07 "No viable route requires a crash"; break economy; 5 segments                                   |
| 21  | Supported is informationally superior with no content cost, making it weakly dominant        | Medium-high | 07/10 identical calendar/routes/endings + extra warnings + no surcharge                            |
| 22  | Profile choice is made uninformed and locked                                                 | High        | 10 New Game flow; "fixed for the whole save"                                                       |
| 23  | Replay is driven only by citation completion, and is expensive (full 16 weeks, save deleted) | Medium-high | 08 archive rules; 10 no rewind; 11 completion deletes active state                                 |
| 24  | Environmental text is ignored by non-explorers                                               | High        | 06/12 "Required information never depends on an inspectable environment item alone"                |
| 25  | Gabriel's pass-through is not a meaningful trust incentive                                   | Medium      | 06 shortcut on a free-walking 75–90 m loop                                                         |
| 26  | Public-record withdrawal is pressed only as deliberate experimentation                       | High        | 08 closes both routes → forced End of Contract                                                     |
| 27  | Manuscript card-arranging is decorative relative to claim level and card coverage            | Medium      | 07 manuscript system vs. stated effects; only claim commit and PIIM cards have numeric effects     |
| 28  | Players cannot accidentally lose mandatory content                                           | High        | 03 "All seven mandatory scenes occur once in every run"; 07 no game-over                           |
| 29  | Quality-check monitoring is the standard purchase once band table is inferred                | Medium      | 07 band table + 12 MR-ACT-MONITOR-QUALITY; mapping from checks to band is unstated (see §11.2)     |
| 30  | Night/after-hours surcharge is experienced as an unavoidable tax, not a choice               | Medium      | 02/07 surcharge rules; period structure implies one of each per week; no stated scheduling freedom |

---

_End of report._

---

## File confirmation

I have received and read `docs/01-vision-and-pillars.md` completely. It is intact, not truncated, and readable. My Stage-4A report (Sections 1–12) stands unmodified; the following sections are appended without revising any earlier prediction.

---

# 13. Vision comparison

## 13.1 Behaviours that reinforce the intended experience

| Vision element                                             | Reinforcing mechanic                                                                                                            | Predicted behaviour that delivers it                                                                                                                                                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pillar 1 — survival through decisions, not dexterity       | Cost preview before every commitment; no timed/precision input; period budget                                                   | Players plan in periods and reason about allocation. Stage 4A §4 "early: costs are always pre-announced" — this is the vision working exactly as written.                                                                                                           |
| Pillar 2 — plausible science, intelligible causes          | Locked seed, no save-scum, stated causal reasons, diminishing repeats with explicit warning                                     | Players stop trying to reroll after one attempt (§12 #9) and stop grinding (§12 #8). Both keep the science layer legible rather than slot-machine-like.                                                                                                             |
| Pillar 3 — success does not resolve the system             | PIIM result cannot create or remove an Aldercroft invitation; Morrow needs only a preprint; evidence useful only to ~6–8 points | Players discover that the paper — the thing consuming the whole middle game — is career-irrelevant. This is the **single strongest vision-to-mechanic alignment in the corpus.** The satire is not merely asserted in dialogue; it is enforced by the unlock table. |
| Pillar 3 / calendar indifference                           | Fixed weekly gates that "do not wait for unfinished work"; scenes occur in every run regardless of quality                      | Players learn the institution is indifferent to their effort. The Week-5 "manuscript opens even with a weak packet" rule is a mechanically expressed joke.                                                                                                          |
| Pillar 4 — exit meaningful, not utopian                    | Morrow epilogue text; Out of Scope as a real selectable option; no route labelled best                                          | Class B/D/E players choosing to leave with routes open (§9) is precisely the "reason for discussion" criterion.                                                                                                                                                     |
| Pillar 6 / humour execution rule                           | Institutional Citations as diegetic stamps; record and notice text carrying the comedy                                          | Class C/D players collect and read them; MR-CIT-07's refusal to morally rank record-handling is a genuine satirical act inside a system, not a line of dialogue.                                                                                                    |
| Audience — no expert knowledge required                    | Plain-language result labels; three readable evidence views; no raw data                                                        | Supported. Nothing in the predicted behaviour requires biology literacy.                                                                                                                                                                                            |
| Non-goals (no combat, horror, crafting, procedural sprawl) | Fully honoured                                                                                                                  | No predicted behaviour class works around them.                                                                                                                                                                                                                     |
| Emotional promise — "characters continue to matter"        | Five persistent trust bars, permanent breach flags that outlast recovery                                                        | Permanent flags mean a late apology cannot buy back a denied credit. That is a correct implementation of consequence.                                                                                                                                               |

## 13.2 Behaviours that weaken or contradict the vision

**(a) "Uncomfortable complicity" has no mechanical purchase price.**
Vision: pressure and complicity increase through the semester. Stage 4A §8: inflated claims cost zero integrity; hidden fabrication closes no route; deferral strictly dominates denial; correction after omission is a small net-positive arbitrage. The player is _told_ they are complicit and _shown_ an epilogue paragraph, but never made to pay. Complicity that costs nothing is observed, not experienced.

**(b) Pressure is asserted but not produced.**
Vision: "the later parts create pressure and discomfort." Stage 4A §7 and §12 #20: energy is solvable with one break per week; no game-over; no missable mandatory content; warnings before every irreversible act; explicit guarantee that setbacks "never stop the campaign." The system is engineered to be safe. A player cannot be cornered, so the burnout theme is delivered by prose against a substrate of comfort.

**(c) Pillar 1's core fiction — the moving standard — is mechanically bounded.**
The premise is that "the standard for a publishable paper keeps moving." Mechanically, the standard stops at Coherent (6–8 points) and three ternary PIIM cards. Once a player finds the ceiling (§6, §12 #7), the treadmill visibly ends. The joke is that the demands are endless; the arithmetic says they are finite and modest.

**(d) The climax is chosen rather than earned.**
Vision: "when both career routes are viable, their choice is the dramatic climax." Stage 4A §9: both routes are near-default. Aldercroft needs two of three conditions, two of which (PI 45→55 with one report; Elena 60, already above 41) are satisfied by not misbehaving. Morrow needs one reply and one call from a starting Camila value of 40 with a +10 option available. The dramatic climax arrives pre-paid.

**(e) Solidarity is over-rewarded as currency and under-rewarded as meaning.**
Vision: "small acts of solidarity can have value even when they do not change the institution." Mechanically, helping Haoran or crediting Samira is the **highest-return action per period in the game** (0 energy, +10 trust, sometimes +1 EV, sometimes a citation). Solidarity is not a grace note against an indifferent system; it is the efficient play. Class A players will help Haoran for the same reason they run a quality check.

**(f) Quantified relationships contradict the stated framing.**
Vision and B05 both insist trust "does not measure friendship or moral worth." Five visible 0–100 bars, fixed ±10/±20 steps, a published 61 support threshold, and a 41 route gate make them a score. Stage 4A §10 and §12 #19: colleagues are read as unlockables. The design says one thing; the HUD says another.

**(g) Compact depth degrades into a repeated toll in the middle, then a dead tail.**
Pillar 5 promises "dense consequences." Stage 4A §4 and §12 #18: the five-stage loop repeats six times with no structural variation, and Weeks 15–16 contain no purchasable state. The density is front- and mid-loaded; the last eighth of the campaign is walking.

**(h) The comedy's non-dialogue channel is opt-out by construction.**
Humour execution rule: environment details and player-facing records are "part of the comedy, not only dialogue delivery." But `12` states required information never depends on environmental items, and Stage 4A §5 predicts optimisers and role-players skip them. Thirty of the game's funniest authored lines sit behind a voluntary inspect action with zero mechanical return.

## 13.3 Intended values the mechanics do not reward

1. **Honesty.** No mechanical benefit. Its only stated price appears when honesty is _volunteered_ to Camila (−20, route closed). The game charges for confession and gives nothing for integrity.
2. **Scientific curiosity.** Evidence beyond the threshold is cosmetic. Running the drug template, or a repeat for interest's sake, is strictly wasteful.
3. **Rest as a human act.** The protected break is a resource conversion (1 period → 2 energy) with a documented efficiency ordering. It never means anything.
4. **Resisting the PI.** `optional.elena.future.boundary` costs −10 Elena — one of the three Aldercroft conditions. Speaking up is the only priced stance in that scene.
5. **Bearing the weight of the choice.** No route requires sacrifice; the endgame does not force a trade.
6. **Discomfort itself.** Nothing in the reward structure asks the player to sit with a bad position, because no position is bad enough to sit with.

## 13.4 Unintended values the mechanics do reward

1. **Threshold satisficing.** Do exactly enough; the ceiling is published.
2. **Appearance management over substance.** Inflated claim: +10 PI, zero integrity, harder reviewers — a trade, not a transgression. The mechanically expressed lesson is _overselling is normal practice_.
3. **Non-confrontation.** Defer (−10 + flag) dominates deny (−20 + identical flag). The optimal response to being caught is to say nothing decisive.
4. **Agreeableness toward power.** Empathising with Elena pays +10; aligning with her pays 0; challenging her pays −10.
5. **Instrumental sociability.** People are the cheapest state-change vendors on the floor.
6. **Minimal engagement.** Class F (mandatory content + two cheap unlocks) reaches a good ending faster than Class C, who risk the only real penalty in the game.
7. **Checklist completion.** Twelve Citations across a persistent archive with no gameplay effect are the only structural replay driver.

---

# 14. Incentive threats

Ordered by threat to the stated vision, not by mechanical size.

**T1 — The two-of-three Aldercroft gate makes laboratory work optional.**
Both socially purchasable conditions start at or near threshold. A player can reach a Coherent-free academic invitation through conversation and compliance alone. This threatens Pillar 1 (decisions about _scientific_ time), Pillar 2 (science as the substrate), and the experience criterion "a player can understand why each main experiment matters" — because mechanically, several of them do not.

**T2 — Integrity is free, so complicity is theatre.**
Every documented consequence of hidden misconduct is a bar, a flag, an optional confrontation the player may defer, and an epilogue paragraph. The vision's emotional centre — "uncomfortable complicity" — has no mechanical anchor. Class E discovers this deliberately; Class A discovers it while looking for a cheap route to met PIIM cards.

**T3 — Solvable energy plus no failure state removes felt pressure.**
One break per week plus a 62-period slack budget plus an explicit no-game-over guarantee means the survival framing is nominal. The word "survival" appears in the vision; nothing in the rules can kill.

**T4 — Full transparency enables complete optimisation by roughly Week 3.**
Research Status shows every band, every stated reason, and non-spoiling route feedback that names the missing condition. Combined with quantised ±10/±20 steps, the economy is reverse-engineerable inside one run. This directly serves the criterion "a player can see how important choices change the game state" while destroying the possibility of uncertainty-driven pressure. It is a genuine conflict between two things the vision wants.

**T5 — The evidence ceiling turns the moving-standard satire into a solved equation.**
Points 9–12 buy a label. Once known, the premise inverts: the demands are not endless, they are cheap.

**T6 — Both-routes-default deflates the climax.**
The final scene becomes a preference poll. "At least one choice or ending gives the player a reason for discussion" survives (Out of Scope is discussable), but the _stakes_ of that discussion are self-assigned.

**T7 — Supported is weakly dominant on information.**
Identical content, identical endings, identical citations, plus extra warnings before gates and irreversible choices. A player told there is "no stigma or content penalty" and offered strictly better information has been given a dominant option. This pushes the population toward the lower-pressure profile, compounding T3.

**T8 — Weeks 15–16 have no sink for remaining periods.**
Optional scenes have mostly expired by W12–W14; routes resolve W13/W15. Slack periods in the final eighth are unspendable. The intended "bitter but human ending" is preceded by administrative idling.

**T9 — Comedy delivery leaks through the opt-out channel.**
Environmental text and record flavour carry a large share of the satire and are, by explicit rule, never required and never rewarded. The criterion "the first part can make the player laugh" depends on players choosing an unrewarded verb.

**Bounding note on Stage 4A §5:** the PI-confidence farming I flagged is capped by `07`'s rule that "each request or committed revision changes PI confidence once," so "Report to Elena" is bounded by authored request count rather than unbounded. The action remains the best zero-energy return in the game, but it is not farmable. I record this refinement here rather than editing the locked prediction.

---

# 15. Creatively coherent risks

These are incentive structures that look like flaws on a balance sheet but are defensible expressions of the vision. I flag them as _deliberate risks worth keeping_, not as problems.

**C1 — Publication is career-irrelevant.**
Mechanically, the PIIM outcome touches neither route. This is Pillar 3 implemented as arithmetic rather than as dialogue, and it is the most confident, least sentimental thing in the design. The only risk is _when_ players learn it: if Research Status route feedback reveals it in Week 9, the middle game becomes knowingly futile labour rather than experienced futile labour. That timing is worth protecting, not the rule.

**C2 — Resistance is taxed and compliance is not.**
Challenging Elena costs 10 points of a route condition; empathy pays. This is uncomfortable and correct. Institutions do price dissent. Keep it, provided the player can see the price before paying — which the cost-preview contract already guarantees for actions, though not for dialogue stances.

**C3 — Overselling is not misconduct.**
Separating claim inflation (a PI-confidence trade) from record falsification (an integrity loss) is a precise satirical distinction, and one that most fiction gets wrong. The risk is that players read "inflated costs nothing" as a balance oversight rather than a thesis. This is a legibility problem, not a rules problem.

**C4 — Undiscovered fabrication can publish.**
Explicitly stated as "not a moral reward." Correct and brave. The problem identified in T2 is not that it can succeed; it is that it costs nothing _at all_ along the way.

**C5 — The calendar ignores the player.**
Fixed gates that do not wait produce genuine institutional indifference. The dead tail (T8) is the cost of this, and it is a fair price.

**C6 — The trust bars are quantified people.**
Currently framed sincerely, which creates the contradiction in §13.2(f). But a game whose subject is institutional quantification of human beings could own this: the bars are visible _because_ the institution measures colleagues, not because the game does. That reframing costs no mechanics and converts a contradiction into a joke.

---

# 16. Bounded recommendations

Each is a minimal change to an existing system. None introduces a new genre, resource, subsystem, or content family beyond the approved catalogue counts.

---

### R1 — Make evidence a required Aldercroft condition, not one of three interchangeable ones

- **Affected system:** B05 route-unlock contract (`07`, `08`).
- **Change:** Aldercroft requires the research plan, **Coherent or Substantial evidence**, and **one** of {Supportive/Invested PI confidence, Elena ≥41} — instead of any two of three.
- **Causal reason:** two of the current three conditions start at or near threshold and are purchased with zero-energy conversation. Laboratory work is therefore skippable for the academic route.
- **Likely benefit:** restores Pillars 1 and 2 and the criterion "a player can understand why each main experiment matters." Reconnects the experiment loop to the ending.
- **Possible new risk:** narrows the academic route; players who under-perform experimentally lose it more often. Mitigated by the existing non-spoiling route feedback and by Morrow remaining open.
- **Confidence:** High that behaviour changes; medium-high that it is net-positive for the vision.

---

### R2 — Bind claim scope to evidence support so points 9–12 have a use

- **Affected system:** PIIM response band, claim-scope card (`07`, `08`).
- **Change:** the claim-scope card is _met_ only when the committed claim level is supported by the packet — Careful at Developing+, Strong at Coherent+, Inflated never met. (`07` already gestures at this: "a strong but overstated claim can weaken the claim-scope card.") Formalise it.
- **Causal reason:** the evidence ceiling currently sits at ~6 points; Substantial buys only a summary label, so the moving-standard premise dies once the ceiling is found.
- **Likely benefit:** extends the useful evidence range across its full 0–12 span; makes ambition genuinely cost work; makes the careful/strong/inflated dial a real trade instead of a free +5/+10.
- **Possible new risk:** increases optimisation legibility further; makes Careful strictly correct at low evidence — though that is thematically defensible.
- **Confidence:** Medium-high.

---

### R3 — Give concealment a _time_ cost without giving it a moral one

- **Affected system:** integrity flags, optional-scene scheduling (`07`, `12`).
- **Change:** an unresolved `omission` / `alteredReading` / `fabrication` flag makes the corresponding Haoran or Gabriel concern scene **due at the next safe point** (like a mandatory beat) rather than optional, and each non-correcting response consumes one period. Career-route availability and detection rules remain exactly as written.
- **Causal reason:** T2 — misconduct is currently free in every currency the game tracks. Charging periods rather than routes preserves "undetected fabrication can publish" (C4) while ending the free-lunch.
- **Likely benefit:** delivers "uncomfortable complicity" as an experience — the player feels the _maintenance cost of a lie_ in the only currency that binds.
- **Possible new risk:** could read as punishment; risks turning integrity into a route calculation, which `07` and `08` explicitly reject. Mitigated because the cost lands in slack time, not in unlocks.
- **Confidence:** Medium. This is the sharpest trade-off in the list and the one most in tension with a stated design principle.

---

### R4 — Remove the defer-dominates-deny inversion

- **Affected system:** `12` optional-scene effect tables (`MR-OPT-HAORAN-MISSING-REPLICATE`, `MR-OPT-GABRIEL-ARCHIVE`).
- **Change:** make denial and deferral produce _different_ flags — denial closes the concern permanently at −20; deferral leaves the concern live and re-raisable at the character's next window.
- **Causal reason:** both currently set the identical concern flag, so the −10 option strictly dominates the −20 option. The confrontation collapses into arithmetic.
- **Likely benefit:** restores a real choice between paying now and paying later; small, contained, uses existing flag machinery.
- **Possible new risk:** none significant; adds one flag and one re-raise condition.
- **Confidence:** High.

---

### R5 — Cap protected breaks at one per week

- **Affected system:** energy economy (`02`, `07`).
- **Change:** one protected break per week, restoring 2 (Standard) / 3 (Supported). Remove the later-break-restores-1 tier.
- **Causal reason:** the existing tier is already dominated and never rationally taken (§5), so it is dead rules text; and unlimited breaks make energy a solved conversion rather than a constraint.
- **Likely benefit:** energy becomes a genuine weekly budget; the crash moves from "completionist penalty" toward "reachable consequence," supporting the intended pressure arc without adding a failure state.
- **Possible new risk:** crashes become more common; since `07` already guarantees crashes are non-terminal and cannot occur mid-interaction, the downside is bounded. Supported's higher restore keeps the accessibility promise intact.
- **Confidence:** Medium-high.

---

### R6 — Make Supported differ only in energy tolerance

- **Affected system:** pressure profiles (`07`, `10`).
- **Change:** move "an extra clear warning before a gate or irreversible choice" out of the Supported profile and into the universal contract, which `02` and `07` already promise to all players ("every deadline is stated clearly," "the player sees an action, its time cost, and its energy cost before commitment").
- **Causal reason:** T7 — Supported currently offers strictly better information at no stated cost, making it weakly dominant and undermining the "intended survival-game profile" framing of Standard.
- **Likely benefit:** removes a dominant option; preserves the no-stigma promise; strengthens rather than weakens accessibility, since clarity becomes universal.
- **Possible new risk:** essentially none. Slightly reduces the felt distinctiveness of Supported.
- **Confidence:** High.

---

### R7 — Give Weeks 15–16 a sink that reuses existing modules

- **Affected system:** late-campaign scheduling; B06 afterbeat selection (`03`, `07`, `08`).
- **Change:** allow leftover W15–W16 periods to be spent on a short closing exchange with any present on-floor character (reusing `MR-ACT-RELATIONSHIP`, 1p/0e). It grants no trust and unlocks no route; it only **influences which character is selected for the epilogue relationship afterbeat** among tied candidates.
- **Causal reason:** T8 — the final eighth has no purchasable state, so agency evaporates before the ending.
- **Likely benefit:** restores meaningful spending in the tail; lets the player choose _whose absence the ending is about_, which is expressive rather than optimising; adds no new ending modules (the fifteen afterbeats already exist).
- **Possible new risk:** the tie-break rule in `05`/`08` becomes slightly more complex. Content count is unchanged.
- **Confidence:** Medium-high.

---

### R8 — Make keeping both routes open cost something

- **Affected system:** Morrow offer handling and Aldercroft confirmation (`08`, `12` `MR-OPT-CAMILA-OFFER`).
- **Change:** `optional.camila.offer.keep` ("keep the offer open until 06:42") costs one period and sets a visible flag Elena can react to (−10 Elena, no route closure). Confirming Aldercroft attendance in Week 16 remains free.
- **Causal reason:** T6 — arriving at 06:42 with both routes lit currently costs nothing, so the climax carries no prior commitment.
- **Likely benefit:** the endgame choice acquires a small, honest prior cost; hedging becomes a decision rather than a default; keeps every documented ending reachable.
- **Possible new risk:** could close Aldercroft for a player already at Elena 41–50; the existing route-feedback warnings mitigate this, and R6 makes those warnings universal.
- **Confidence:** Medium.

---

### R9 — Surface environmental text without adding a marker system

- **Affected system:** environmental-item presentation (`06`, `10`, `12`).
- **Change:** allow an `MR-ENV-` item to display its one-line text on first proximity-and-glance in its active window, rather than requiring a confirmed inspect. Interaction Assist rules, no-arrow rules, and the "never required" rule are unchanged.
- **Causal reason:** T9 — thirty authored comic lines currently sit behind an unrewarded verb that Classes A, B, and F will not perform.
- **Likely benefit:** the humour execution rule ("comedy through environment, not only dialogue") reaches the players most likely to miss it; directly supports the criterion "the first part can make the player laugh."
- **Possible new risk:** ambient text noise during travel; mitigated by the existing one-time display rule and the one-major-two-minor change budget per phase.
- **Confidence:** Medium-high.

---

### R10 — Reframe the trust bars as institutional instruments, not sincere measures

- **Affected system:** Research Status presentation and its heading strings (`07`, `10`, `12` `MR-UI-*`).
- **Change:** no numeric or rule change. Present the five bars under an explicitly institutional label and framing line — a workload/collegiality readout the _floor_ maintains — rather than as a neutral game statistic.
- **Causal reason:** §13.2(f) — visible, quantised, threshold-gated bars are read as a score no matter what the design document says. The contradiction is in the framing, not the numbers.
- **Likely benefit:** converts an unintended value (people as unlockables) into an intended joke (institutions quantify people); costs almost nothing; strengthens Pillar 6 and the humour execution rule.
- **Possible new risk:** a small number of players may read the framing as excusing the instrumentalisation rather than satirising it.
- **Confidence:** Medium-high.

---

### R11 — Price the drug-exposure template into relevance, or state its irrelevance in-fiction

- **Affected system:** optional experiment value (`04`, `08`, `12`).
- **Change:** either (a) let an analysed `MR-REC-DRUG-EXPOSURE` substitute for one partly-met PIIM card when the claim is Careful; or (b) leave it mechanically inert and give Camila one authored line acknowledging that the extra work did not change her decision.
- **Causal reason:** §12 #17 — a 4-period optional template whose only stated benefit is "can strengthen Morrow context" is skipped by every optimiser, so an authored experiment family goes unseen.
- **Likely benefit:** (a) recovers the content; (b) converts the waste into a joke that reinforces Pillar 3 ("more work bought nothing"). Both are consistent with the vision; (b) is the cheaper and more thematically pointed option.
- **Possible new risk:** (a) adds a route-adjacent use for an explicitly optional experiment, slightly complicating the PIIM card contract.
- **Confidence:** Medium.

---

### Recommendation dependency note

R1, R2, and R5 together restore experimental labour, evidence range, and energy pressure — they are the load-bearing set for Pillars 1 and 2. R3, R4, and R10 address complicity and the reading of people. R6, R7, R8, R9, and R11 are low-risk repairs to profile dominance, the dead tail, endgame commitment, comedy delivery, and orphaned content. If only three are adopted, R1, R4, and R6 give the largest alignment gain per unit of change; R4 and R6 are near-zero-risk.
