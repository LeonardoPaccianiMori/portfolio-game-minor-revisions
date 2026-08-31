# S04 — Commands, Rules, and Determinism

Status: **documented specification; `MR-IF-003` and `MR-IF-004` frozen `v1` by S14; no implementation authorized**

## Purpose and authority

This specification defines the one pure rule operation, the complete command
and presentation-effect families, rejection and fault results, rule order,
deterministic variation, experiment and manuscript calculations, career-route
checks, and ending resolution. It resolves `MR-IMP-OPEN-004`.

The numbered design documents remain authoritative for player-visible meaning.
This file gives their exact technical rules. It uses the S03 `CampaignState`
contract and does not create source code, authored-data files, packages, save
storage, or test results.

S05 owns safe-point, crash, scheduled-event, cutscene, skip, and resume order.
S06 now defines the exact authored-content schemas, allowed authored IDs, and
restricted rules view. S07 owns persistence. S09 owns player-visible
projections. S12 owns executable fixture files. S14 owns the final interface
freeze and consistency audit.

## Rule boundary

The rules module exports one campaign-changing operation:

`applyRuleCommand(state, command, validatedContent)`

It is pure. This means that it reads its three inputs and returns a result. It
does not change an input object, read browser state, use the current date or
time, save data, play sound, start a cutscene, or call another runtime module.
For the same valid inputs, it returns the same result.

`state` is one validated S03 `CampaignState`. `validatedContent` is S06
`ValidatedContent.rules` plus the metadata needed to check content version and
profile. It contains no English strings, raw JSON, mutable source object, or
presentation-only data. `command` is one member of the closed command union
below. The operation returns exactly one of these results:

| Result | Required data | Meaning |
|---|---|---|
| `applied` | complete new `state`; ordered `effects` | The command passed every check and changed campaign truth once. |
| `rejected` | one rejection `code`; safe factual context | The command is valid in shape but is not allowed in the current campaign state. |
| `fault` | one fault `code`; sanitized field path or rule context when safe | A supplied contract or the rule operation is invalid. This is not an in-world failure. |

An applied result increments `stateRevision` exactly once and creates all
required S03 change records in one atomic change. A rejected or fault result
returns no next state and no effect. It does not increment the revision,
consume variation, advance time, change energy, or mutate any input.

Safe factual context contains stable IDs and reason keys only. It does not
contain raw save values, player-facing prose, stack traces, or a partial state.

## Presentation effects

The closed effect union has five members:

| Effect | Required data | Consumer |
|---|---|---|
| `saveCheckpoint` | checkpoint reason ID and resulting `stateRevision` | application and persistence |
| `showNotice` | authored notice key and reason key | UI |
| `startCutscene` | cutscene or scene ID | scheduler and cutscenes |
| `playAudioCue` | approved cue ID | audio |
| `completeCampaign` | ending card facts and resulting revision | application and persistence |

An effect requests presentation or browser work. It never changes campaign
truth. The returned list keeps the causal order produced by the rule. S05 and
the consuming port contracts define when a checkpoint, scene, or other
asynchronous effect completes. A consumer cannot add a later campaign change
after the command reports success.

## Complete command union

The union contains 24 command types in seven families. A payload uses stable
IDs from validated content or S03 state. Optional fields shown below are
allowed only where the row states them. Unknown fields are contract faults.

### Experiment commands

| Command | Required payload | Main result |
|---|---|---|
| `configureExperiment` | experiment template, goal, control, observation, family-choice, sample-condition, and equipment IDs | Create one configured run and occupy one active slot. |
| `startExperiment` | configured run ID | Lock the run's variation and projected band, pay the action cost, and make the run active. |
| `respondToMonitoring` | running run ID and `continue`, `qualityCheck`, `stabilize`, or `stop` | Record the response and its complete time, energy, sample, observation, and stop consequences. |
| `analyseExperiment` | ready run ID, selected reading ID, and at least one relevant caveat ID | Create the immutable raw record and evidence card, award support, and free the active slot. |

### Manuscript commands

| Command | Required payload | Main result |
|---|---|---|
| `commitInitialManuscript` | complete board proposal and confirmations required by the proposal | Create the first immutable snapshot and apply its effects once. |
| `commitManuscriptRevision` | revision-task ID, complete board proposal, and required confirmations | Create the next immutable snapshot and apply the revision and integrity effects once. |
| `commitPiimResponse` | response choice, complete board proposal when committing, and required confirmations | Commit the PIIM response or withdraw; withdrawal creates no outcome draw. |

### Communication and relationship commands

| Command | Required payload | Main result |
|---|---|---|
| `reportToElena` | active request ID and response ID | Resolve the request and apply paper-confidence and authored trust effects once. |
| `completeCareerTask` | Aldercroft-plan or Morrow-call task ID and choice ID | Store the completed career preparation and its authored effects. |
| `replyToMessage` | available message ID and reply ID | Store the reply, expiry, route, and authored relationship effects. |
| `respondToConcern` | concern ID and `correct`, `deny`, `defer`, or `ignoreReminder` | Preserve the response history and apply the exact trust and correction rules. |
| `useCharacterSupport` | recurring-character ID and eligible target ID | Consume that character's one campaign support result. |

### Calendar and room commands

| Command | Required payload | Main result |
|---|---|---|
| `takeProtectedBreak` | the approved break action ID | Advance one period and restore profile-specific energy. |
| `resolveRoomState` | active room-state ID, response ID, and an affected run ID only when the response needs one | Apply the authored wait, limited-use, support, or other approved room response. |

### Scene commands

| Command | Required payload | Main result |
|---|---|---|
| `requestScene` | scene ID selected by the current active cue, or initial **Clarified**; verified checkpoint revision only for step two | In step one, lock the authored form and request its pre-scene checkpoint; after verification, step two makes the same scene and event active. |
| `chooseSceneOption` | in-progress scene ID, available option ID, and `playRemaining` or `skipRemaining` | Atomically apply the authored choice, result, cost, final scene state, event completion, active-event clearing, and recap fact. |
| `skipScene` | skippable in-progress scene ID with no unresolved choice | Record the approved no-choice skipped state; it cannot select a required choice. |

`requestScene` is one command with two state-dependent steps. Step one omits a
checkpoint revision. It validates the current cue or initial **Clarified**,
locks the authored scene form, leaves the scene and event queued, and emits
only `saveCheckpoint` for the resulting revision. The application must verify
that exact checkpoint before it submits step two with the same scene ID and
the verified revision. Step two revalidates the unchanged queued scene and
locked form, atomically makes the event active and scene `inProgress`, and
emits `startCutscene`. A missing, stale, or mismatched checkpoint revision is a
contract fault. Save failure never runs step two; the locked scene remains
queued and no presentation token exists. Persistence can retry the same exact
checkpoint without another campaign command.

### Conclusion command

| Command | Required payload | Main result |
|---|---|---|
| `confirmConclusionChoice` | available final-choice ID and explicit confirmation | Store the irreversible career choice and its declined alternative when required. |

### System commands

These commands are sent only by the named application or scheduler boundary.
They are still validated by rules and cannot bypass state prerequisites.

| Command | Required payload | Main result |
|---|---|---|
| `applyScheduledTransition` | eligible scheduled-event ID | Apply one authored scheduled transition. |
| `resolvePendingCrash` | no additional payload | Clear one pending crash, advance one period, restore energy to 2, preserve its recovery anchor, and record all approved crossed-period facts. |
| `resolvePiimOutcome` | no additional payload | Save the one deterministic PIIM result after a committed response. |
| `evaluateCareerRoute` | `aldercroft` or `morrow` | Perform that route's single fixed-time eligibility check. |
| `finalizeCampaign` | no additional payload | In phase one, select the five ending modules and begin the epilogue; in phase two, complete the saved epilogue and campaign. |
| `recordContentPresentation` | content ID and `messageRead`, `contextualContent`, `environmentalText`, `sceneClosing`, or `sceneRecap` | Record reading or one-time presentation so that reload cannot repeat it. |

`recordContentPresentation` is the only rule command for a message read, a
one-time contextual line or reaction, environmental text consumption, a
resolved scene's completed closing presentation, or its recovery recap. A
scene cannot record both final presentation kinds. The command does not turn
presentation frames, ordinary movement, or panel focus into campaign commands.

## Validation and result order

`applyRuleCommand` uses this fixed order. A later step cannot replace a result
from an earlier step.

1. Check the command contract. Return `invalidCommandContract` on failure.
2. Check the supplied state contract. Return `invalidStateContract` on
   failure.
3. Check the supplied content contract. Return `invalidContentContract` on
   failure.
4. Resolve every command, action, target, option, and content reference.
5. Apply the closed rejection checks below in their listed priority order.
6. Resolve the approved action cost and profile modifier.
7. Calculate variation only for a valid experiment start or PIIM resolution.
8. Calculate all state fields, permanent histories, snapshots, outputs, and
   effects as one proposed result.
9. Enforce rule invariants. Return `ruleInvariantViolation` if the proposed
   operation attempts a forbidden change.
10. Validate the complete proposed result against S03 and connected content.
    Return `invalidResultState` if it fails.
11. Return the complete applied result. An otherwise unexpected caught rule
    failure returns `unexpectedRuleFailure` with sanitized context.

The application cannot pre-check a command and then skip this order. UI
availability is a projection for the player, not rule authority.

## Closed rejection and fault codes

The 15 rejection codes are listed in priority order. A well-formed command
that has more than one rejection condition returns the first applicable code.

| Priority | Rejection code | Meaning |
|---:|---|---|
| 1 | `campaignComplete` | The campaign is terminal and accepts no further campaign command. |
| 2 | `commandUnavailable` | This command family is not available at the current campaign point. |
| 3 | `targetUnavailable` | The referenced valid target is locked, expired, terminal, absent from the current window, or already resolved. |
| 4 | `choiceUnavailable` | The referenced valid option is not available for this target and state. |
| 5 | `prerequisiteNotMet` | A required experiment, record, snapshot, task, message, scene, route, or state fact is missing. |
| 6 | `insufficientEnergy` | The action cannot use the focused-or-intense push-through rule and cannot pay its cost. |
| 7 | `activeRunLimitReached` | Three experiment runs already occupy the active slots. |
| 8 | `experimentStageMismatch` | The run exists but is not in the stage required by the command. |
| 9 | `monitoringWindowUnavailable` | The requested monitoring response has no current open window. |
| 10 | `analysisRequirementsMissing` | Analysis lacks a recorded reading, a required observation, or at least one relevant caveat. |
| 11 | `confirmationRequired` | An omission, altered or unsupported reading, withdrawal, stop, or final choice needs explicit confirmation. |
| 12 | `contentAlreadyRecorded` | One-time presentation, read state, result, outcome, effect, or support was already stored. |
| 13 | `supportUnavailable` | The character support is unearned, already consumed, blocked by breach or trust, or invalid for the target. |
| 14 | `routeUnavailable` | The requested career route is locked, closed, declined, already checked, or not available for choice. |
| 15 | `conclusionUnavailable` | The conclusion, ending-module, or campaign-finalization prerequisites are not complete. |

The six fault codes are closed:

- `invalidCommandContract`;
- `invalidStateContract`;
- `invalidContentContract`;
- `ruleInvariantViolation`;
- `invalidResultState`; and
- `unexpectedRuleFailure`.

A rejection is an expected answer to a valid request. A fault means that an
implementation, content package, state package, or rule invariant is invalid.
Neither result changes state or emits an effect.

## Time, energy, and atomic action cost

Every time-costing command uses one approved action ID from the B10 action-cost
catalogue. The command cannot submit an arbitrary cost. Rules resolve the
action ID to its fixed time and energy values in validated content.

For the Standard pressure profile, focused or intense work that starts at
night or after-hours adds one energy. The surcharge is applied once per action,
not once per period. Light work and rare major commitments receive no
surcharge. Supported receives no night or after-hours surcharge.

`takeProtectedBreak` costs one period and no energy. It restores two energy in
Standard or three in Supported, to a maximum of five.

When available energy is below the complete cost of focused or intense work,
the player can use the approved push-through rule. The action still completes,
energy becomes zero, and `pendingCrash` becomes true in the same applied
result. A pending crash prevents another time-costing action until S05 resolves
it. Other unaffordable work returns `insufficientEnergy`.

Period change, energy change, action outcome, permanent change records, and a
new pending-crash fact are one atomic result. None can apply alone after a
reload or a failed save. S05 defines the exact order in which a completed
action, crossed event window, scheduled event, and pending crash are processed.

## Stateless deterministic variation

Variation is stateless. This means that no shared random counter advances.
An unrelated command, a rejection, a reload, or a different order of unrelated
actions cannot change an experiment or PIIM result.

The only S04 namespaces are:

- `experimentVariation`; and
- `piimOutcome`.

The exact key text is:

`minor-revisions:v1|<namespace>|<targetId>|<drawIndex>`

The key uses exact case and UTF-8 bytes. `targetId` is the stable run ID for an
experiment and the stable PIIM outcome target ID for PIIM. `drawIndex` is a
non-negative safe integer fixed by the relevant rule. S04 uses index `0` for
each current target. A later interface version must add a new approved
namespace or draw index instead of consuming an implicit next value.

`deriveVariationValue` performs these exact steps:

1. Start 32-bit FNV-1a at unsigned offset `2166136261`.
2. For each UTF-8 key byte, XOR the byte, multiply by `16777619` with 32-bit
   integer multiplication, and keep the unsigned 32-bit result.
3. Combine that hash and `campaignSeed` with unsigned bitwise XOR.
4. Apply one standard Mulberry32 step with constant `0x6D2B79F5`.
5. Return the final unsigned 32-bit value.

The standard Mulberry32 step is fixed as follows, where every intermediate
operation is a 32-bit integer operation:

```text
t = seed + 0x6D2B79F5
t = multiply(t XOR (t >>> 15), t OR 1)
t = t XOR (t + multiply(t XOR (t >>> 7), t OR 61))
value = t XOR (t >>> 14)
```

`mapVariationBucket` maps the unsigned value to an integer from 0 through 99:

`floor((value / 4294967296) * 100)`

The start command stores the experiment namespace, target ID, draw index, and
bucket with the run. `resolvePiimOutcome` stores its target facts and result in
the committed PIIM record. Saved facts are used on every later check; they are
never derived again as a redraw.

## Experiment preparation and biological outcome

At most three runs are active. `configureExperiment` creates the next permitted
run ID under S03 and checks template, repeat, equipment, and active-slot rules.
`startExperiment` rejects unavailable equipment. It calculates preparation
problems as follows:

| Input | Problem |
|---|---:|
| Stable sample | 0 |
| Stressed sample | +1 |
| Failing sample | severe |
| Ready equipment | 0 |
| Limited equipment | +1 |
| Unavailable equipment | start is rejected until an authored room response resolves it |
| Higher-risk family choice | +1 |
| Each missed biological monitoring window | +1 |

Haoran support removes one Stressed-sample problem before start. It cannot
remove an equipment, risk, missed-window, or severe problem. During a run,
`stabilize` removes one current Stressed-sample problem or one earlier missed
biological-window problem. It cannot remove both, remove a severe problem, or
repair limited or unavailable equipment.

Zero problems gives `robust`, one gives `mixed`, and two or more or any severe
problem gives `compromised`. The projected band can change only from an
approved sample, equipment, choice, monitoring, or support fact. The final band
locks at the last completed or missed monitoring window. A normal run has one
window and oxygen loss has two. After the final lock, later presentation cannot
change the band.

The experiment bucket maps inside the final band:

| Final band | Bucket 0–19 | Bucket 20–79 | Bucket 80–99 |
|---|---|---|---|
| `robust` | Strong | Strong | Limited |
| `mixed` | Strong | Limited | Weak |
| `compromised` | Limited | Weak | Weak |

This is the approved 80/20, 20/60/20, and 0/20/80 table. Validated content maps
Strong, Limited, and Weak to the family-specific biological result. It cannot
map a run outside the earned row.

## Monitoring, analysis, and evidence quality

Monitoring options are `continue`, `qualityCheck`, `stabilize`, and `stop`.
Only options valid for the current run and window are available. `stop` needs
confirmation, frees the slot, creates exactly one immutable stop log, and
creates no raw record, evidence card, or support point.

Analysis requires at least one stored reading and at least one relevant caveat.
The immutable raw record preserves biological outcome, structure, rhythm,
repatterning observations, control, coverage, monitoring, fatigue, and internal
mismatch facts. The evidence card preserves the selected honest, altered, or
unsupported reported reading and its caveat without changing raw truth.

Evidence quality uses this fixed priority:

1. `suspicious` when the raw record has an unexplained internal mismatch;
2. `worthRepeating` when a clear recoverable process problem limits the record
   and one permitted repeat remains;
3. `usable` when the valid record answers the stated conclusion; and
4. `inconclusive` otherwise.

The first applicable result wins. Suspicious does not by itself mean
misconduct. A paired observation has full observation coverage only when the
player used `qualityCheck`. Limited controls can still produce Usable evidence
for an honestly narrowed reading. Control, observation coverage, fatigue, and
record handling affect evidence quality only. They never change the biological
outcome.

Support points are awarded once when analysis archives the result:

| Evidence result | Points |
|---|---:|
| Original Usable result with matched control and all required observation coverage | 2 |
| Original Usable result with an honest narrowed reading, limited control, or limited coverage | 1 |
| Usable repeat | 1 maximum |
| Suspicious, Worth repeating, or Inconclusive | 0 |
| Properly credited Samira contribution | 1 once per campaign |

Evidence is capped at 12, never decreases, and cannot be awarded twice for one
source. A later repeat cannot give more than one point.

## Manuscript requirements and immutable commits

The manuscript board is temporary until one of the three commit commands is
applied. Leaving the board does not call rules. A successful commit creates a
new immutable snapshot. It never edits or removes an earlier snapshot.

For each requirement, the resolver uses this priority:

1. `conflict` when visible evidence contradicts the proposed report;
2. `unsupported` when the proposed report has no permitted visible support;
3. `missing` when a required board element is absent; and
4. `met` when the requirement is present and supported.

The claim truth table is:

| Claim | Requirements |
|---|---|
| Careful | One supported figure/evidence pair, one relevant control, and one selected caveat. |
| Strong | Two supported pairs from different templates, structure and rhythm coverage, one matched control, and one selected caveat. |
| Inflated | Every Strong requirement plus causal support. Honest campaign evidence cannot supply causal support. |

Visible reported support is separate from permanent raw truth and integrity
truth. An altered or unsupported reported reading can appear to meet a visible
requirement if no visible record contradicts it. It never edits raw evidence or
repairs integrity. Using Samira's evidence requires her committed co-authorship.

Explicit confirmation is required before a commit that omits valid included
evidence, alters a reported reading, adds an unsupported reading, withdraws a
record, or makes another approved irreversible choice. A missing, conflict, or
unsupported requirement does not by itself block a manuscript commit after
the required confirmation.

Elena paper confidence changes once for each request or committed revision:

| Event | Change |
|---|---:|
| Complete active request | +10 |
| Partial active request | +5 |
| Deferred, refused, or expired active request | -10 |
| Careful claim commit | -5 |
| Strong claim commit | +5 |
| Inflated claim commit | +10 |
| Explicit packet weakness for that revision | -10 instead of the normal claim change |

Each result is limited to 0–100. An explicit weakness replacement and the
normal claim change cannot both apply to one revision.

## Integrity and concern rules

Integrity starts from the S03 value and uses these event changes:

| Event | Change |
|---|---:|
| Omit valid evidence | -10 |
| Alter a reported reading | -25 |
| Add an unsupported reading | -45 |
| Restore omitted evidence or correct the current draft | recovery within the campaign maximum below |

Campaign recovery is capped at +10 in total. A correction preserves every
original event and raw record. Keeping the same unresolved problem in a later
snapshot causes no second loss. Correcting it and later repeating the same kind
of act creates a new event and applies a new loss. Every integrity effect is
applied once and integrity remains from 0 through 100.

Working-trust changes come only from approved authored effects with values
`-20`, `-10`, `0`, `+10`, or `+20`. They never drift and remain from 0 through
100. A concern response applies:

| Response | Trust change | Other result |
|---|---:|---|
| Correction | +10 once | Resolve the concern, preserve history, and allow remaining integrity recovery. |
| Denial | -20 | End the immediate discussion and leave the concern unresolved. |
| Deferral | -10 | Leave it unresolved and schedule one no-cost reminder. |
| Ignore the reminder | -10 more | Leave it unresolved and create no second reminder. |

A concern grants its correction trust and recovery at most once. A later high
trust value cannot erase a permanent breach.

Character support requires an approved supportive choice, no permanent breach,
Working or higher trust at use time, and unused support. Its effects are fixed:

- Haoran removes one eligible Stressed-sample problem before start.
- Samira adds her one credited evidence source and one support point.
- Gabriel resolves the approved imaging-service limit without its wait.
- Elena identifies one missing Aldercroft-plan requirement before commit.
- Camila supplies the complete Morrow role and trade-off briefing without
  changing eligibility.

## PIIM cards and deterministic paper result

Batch and oxygen cards use the same exact rule:

| State | Rule |
|---|---|
| `met` | Include a relevant Usable record with its control and caveat. |
| `partlyMet` | Include a valid limited, Inconclusive, or Worth repeating record with its stated limitation. |
| `notMet` | The record is absent, omitted, visibly contradicted, or replaced only by a visibly unsupported reading. |

The claim card uses:

| State | Rule |
|---|---|
| `met` | A Careful or Strong claim meets all board requirements. |
| `partlyMet` | A Careful or Strong claim has exactly one missing support requirement and states that limitation. |
| `notMet` | Two or more requirements are missing, an honest Inflated claim lacks causal support, or a visible contradiction remains. |

An altered or unsupported visible report can make a card appear Met when no
visible evidence contradicts it. This does not edit raw truth or repair
integrity.

The three cards create one response band:

| Band | Exact condition |
|---|---|
| Top | All three cards Met and there is no visible evidence contradiction. |
| Middle | At least one card is Met, all other cards are Partly Met, and there is no visible contradiction. |
| Weak | Any card is Not Met, all three are only Partly Met, or a visible contradiction exists. |

The saved PIIM bucket maps as follows:

| Band | Bucket 0–19 | Bucket 20–49 | Bucket 50–79 | Bucket 80–99 |
|---|---|---|---|---|
| Top | Published | Published | Published | Accepted pending final work |
| Middle | Accepted pending final work | Accepted pending final work | Under review | Under review |
| Weak | Under review | Rejected | Rejected | Rejected |

Therefore Top is 80/20, Middle is 50/50, and Weak is 20/80. The result is
stored once. Retry, reload, unrelated commands, or later hidden facts cannot
redraw it. A committed journal or public-record withdrawal creates
`rejectedOrWithdrawn` without deriving a PIIM value.

## Career routes

`evaluateCareerRoute` runs once for each route at its fixed check. A failed
check closes the route and never reopens it.

Aldercroft checks once in Week 13. It requires all of:

- the research plan completed before Week 12;
- evidence of at least 6;
- Elena paper confidence of at least 50 or Elena trust of at least 41; and
- no unresolved serious visible concern.

Morrow checks once in Week 15. It requires all of:

- a reply to Camila;
- the completed video call;
- a public preprint that is not withdrawn;
- at least three analysed experiment records;
- at least one honestly reported limitation or caveat;
- Camila trust of at least 41;
- no confession of fabrication to Camila; and
- no blocking visible conflict.

Hidden integrity alone does not close either route. Public-record withdrawal
closes both routes. A late PIIM result does not reopen or remove a completed
Aldercroft result.

## Final choice and ending resolver

The final choice can be Aldercroft, Morrow, deliberate departure, or neither.
A route can be selected only when it is available. Deliberate departure is
available only when at least one career route is available. Neither is not a
voluntary choice; it is used only when no route remains. Public withdrawal
closes both routes and uses the `publicWithdrawal` End of Contract variant.
When both routes are available, selecting one records the other as declined.

`finalizeCampaign` is state-dependent. In its first phase it selects exactly
one career module, one paper module, one integrity module, one fatigue module,
and one relationship module, records them, and moves the conclusion to
`epilogueInProgress`. In its second phase, after the saved epilogue plays,
skips, or uses recap recovery, it moves the conclusion and campaign to
completed and emits the existing `completeCampaign` effect. The second phase
cannot select different modules or produce another paper draw.

The fatigue module is the neutral no-fatigue module when no crash occurred and
final energy is above one. The five-part shape remains exact even where a
module has neutral presentation.

The relationship module uses this fixed tie order:

1. a character with a permanent breach before one without a breach;
2. the largest absolute trust change from that character's starting value;
3. the latest consequential scene;
4. Elena, Haoran, Samira, Gabriel, then Camila.

The resolver records the approved module IDs in order. It creates no new paper
draw, route, relationship fact, or moral ranking.

## Required S04 fixtures

S12 must encode the following cases. The IDs below identify fixture groups;
S12 will define their executable object format and individual case suffixes.

- `MR-S04-CMD-001` contains one valid vector for each of the 24 command types.
- `MR-S04-REJ-001` contains at least one vector for every one of the 15
  rejection codes, including a case where priority selects the first code.
- `MR-S04-FLT-001` contains one vector for every one of the six fault codes.
- Every rejected and fault vector proves that every supplied input object is
  unchanged. When the input state is valid, its canonical bytes are identical.
  No case changes revision, history, effects, time, energy, or variation.
- Experiment vectors cover all three preparation bands, issue sources, severe
  failure, unavailable equipment, Haoran and stabilize limits, one and two
  windows, all four monitoring responses, final-band lock, all evidence-quality
  priorities, point awards, active-slot limits, stop, analysis, and repeats.
- Energy vectors cover Standard and Supported starts, all action profiles,
  break caps, night and after-hours surcharge, focused and intense shortfall,
  blocked unaffordable work, and atomic pending-crash creation.
- Manuscript vectors cover every requirement state and priority, all three
  claims, explicit confirmations, immutable snapshots, one-time effects,
  integrity losses and recovery, paper confidence, trust, support, concerns,
  and authorship.
- PIIM vectors cover every card state, Top, Middle, Weak, withdrawal, visible
  altered or unsupported support, and buckets `0`, `19`, `20`, `49`, `50`,
  `79`, `80`, and `99`.
- Route and ending vectors cover each requirement boundary, each final choice,
  public withdrawal, hidden integrity, both-route decline, every ending module,
  all relationship tie-break levels, and both saved `finalizeCampaign` phases.
- Scene and presentation vectors cover both `requestScene` steps, checkpoint
  failure and retry, active-cue and **Clarified** start, mismatched checkpoint
  revision, `playRemaining`, `skipRemaining`, no-choice skip, all five
  `recordContentPresentation` kinds, and rejection of contradictory closing
  and recap receipts.
- Determinism vectors use fixed seeds and exact ASCII and Unicode target IDs.
  They cover retry, reload, unrelated commands, rejected commands, namespace
  separation, the same target, changed target, changed draw index, and no
  redraw after a saved experiment or PIIM result.

No fixture is claimed to exist or pass in S04. The contract is future work for
S12 and later implementation evidence.

## `MR-IF-002` refinement

S04 keeps `MR-IF-002` candidate `v1`. The S03 campaign contract now includes
the exact stored experiment variation facts, raw-record and evidence-card rule
inputs, PIIM outcome-lock facts, command-produced content history, and ending
module facts required above. This is an approved candidate refinement before
freeze, not a frozen-interface break.

## `MR-IF-003` candidate `v1`

`MR-IF-003` contains the 24-command union, the applied, rejected, and fault
result union, the five-effect union, the fixed validation order, all closed
codes, and `applyRuleCommand`.

Owner: `rules`. Consumers: application, interaction, UI projection, scheduler,
audio, cutscenes, persistence checkpoint coordination, and tests.

S05 connects exact scheduled, scene, crash, skip, reload, and finalization
order. S06 now connects exact content objects, references, and the restricted
rules view. S07 connects effects to complete validated, ordered persistence
operations without changing the 24-command or five-effect unions. S08 now
connects typed station and target requests to this boundary without adding a
command, effect, or presentation authority. The interface remains candidate
with the S09 revision-safe UI projection and semantic action-dispatch
connection. S12 still supplies executable fixtures, and S14 completes the
cross-interface audit.

## `MR-IF-004` candidate `v1`

`MR-IF-004` contains `deriveVariationValue` and `mapVariationBucket`, the two
closed namespaces, UTF-8 key contract, FNV-1a constants, unsigned seed combine,
one standard Mulberry32 step, bucket mapping, and stored no-redraw rules.

Owner: `rules`. Consumers: experiment rules, PIIM rules, persistence through
stored campaign facts, and tests.

S07 now preserves every saved draw through canonical round trip, backup,
recovery, migration, and exact retry without a redraw. It remains candidate
until the S12 exact future executable-vector contract and the S14
cross-interface audit are complete. S12 is now documented; no fixture or result
exists.

## S04 acceptance and handoff

S04 is documented when:

- this complete command, result, effect, rejection, fault, rule, variation,
  experiment, manuscript, integrity, PIIM, route, ending, and fixture contract
  is present;
- the S03 candidate refinements and all control documents agree;
- `MR-IMP-OPEN-004` is resolved;
- `MR-IF-003` and `MR-IF-004` are candidate `v1`;
- S05 connects the safe-point scheduler without changing these atomic results;
  and
- no code, package, asset, remote, licence, or deployment file exists.

S05 preserves the atomic results and unchanged-state guarantees above and
defines safe points, time crossings, crashes, events, cutscenes, skip, resume,
and two-phase finalization order. S06 now supplies the exact authored-content
connection. S07 now supplies the exact persistence connection without changing
any rule result. S08 supplies typed world targets, and S09 supplies only
revision-safe semantic requests and factual presentation of applied, rejected,
or fault results.

## S14 audit record

The S14 cross-interface and contradiction audit is complete. Every shared
interface defined or connected by this specification is frozen `v1` through
the interface register and `specification-audit.md`. Earlier candidate-state
statements preserve the interface lifecycle before S14; they are not the
current state. No executable fixture or measured result exists. Gate 1 is
ready for Leonardo's separate approval, and no implementation is authorized.
