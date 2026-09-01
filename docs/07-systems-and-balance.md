# Systems and Balance

Status: **B10 documented; implementation approval pending**

## State model and player visibility

| State                    | Internal representation                            | Player-facing feedback                                                          |
| ------------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Semester time            | 64 work periods across 16 weeks                    | Current week and early, late, night, or after-hours period on the permanent HUD |
| Energy                   | 0–5 segments                                       | Five-segment bar on the permanent HUD                                           |
| Evidence                 | 0–12 support points                                | Thin, Developing, Coherent, or Substantial packet label in Research Status      |
| Elena's paper confidence | 0–100                                              | Cautious, Conditional, Supportive, or Invested desk label and Elena's response  |
| Research integrity       | 0–100 plus permanent history flags                 | Five-segment bar and factual warnings in Research Status                        |
| Working trust            | 0–100 for each main character plus permanent flags | One five-segment bar for Elena, Haoran, Samira, Gabriel, and Camila             |

The player can open Research Status at any time. It contains evidence, Elena's
paper confidence, integrity, working trust, current route feedback, and the reason
for each material state change. These displays show the current system state,
not moral worth or friendship.

## B08 feedback and access contract

The permanent HUD keeps time and energy at upper left, valid interaction
prompts at lower centre, and quiet safe-message indicators at upper right.
Research Status is a large readable quick panel. It cannot cover a required
subtitle or confirmation, and it does not show hidden formulas, raw flags, or
a completion percentage.

Every material state change gives a short stated reason. Integrity warnings are
factual and do not give a moral label. Before an action, the player sees its
time and energy cost. State and science feedback use at least two of text,
icon, colour, sound, and object state. Captions and speaker names default on;
high contrast, scale, reduced motion, and Interaction Assist must not hide or
change a route, value, or consequence.

The desk work queue selects one of five act-state comic lines. It places the
line below the factual queue and never changes the queue state. Six contextual
internal reactions each have one saved consumed flag. They fire only after the
first matching night, missed monitoring window, zero-energy push-through,
crash, Compromised integrity state, or unresolved concern. Eight early
character lines use the same once-only rule but have no command, cost, choice,
or trust effect. `MR-ACT-EXIT-CHECK` costs no time or energy and selects one of
five act-state responses before the Week-16 final scene.

## Time, pacing, and pressure profiles

The fixed semester has 64 work periods: early, late, night, and after-hours in
each of 16 weeks. Walking, reading, and ordinary dialogue cost no period.
Meaningful actions cost one, two, or three periods, and state the cost before
commitment.

| Action class          | Time cost | Standard energy cost |
| --------------------- | --------: | -------------------: |
| Light work            |  1 period |                    0 |
| Focused work          |  1 period |                    1 |
| Intense work          | 2 periods |                    2 |
| Rare major commitment | 3 periods |                    2 |

Normal experiment, analysis, manuscript, and communication work normally use
the focused class. Demanding work, repeats, difficult revisions, and sample or
equipment recovery use the intense class. B10 assigns the exact class to each
authored action.

Early and late are normal work periods. Night and after-hours add one energy
segment to focused or intense work in Standard profile and reduce access to
people and shared services. Exact schedules are in
`06-world-and-level-design.md`.

Standard profile starts with four energy segments. Supported starts with five,
removes the night and after-hours energy surcharge, and restores three segments
through each protected break. Both profiles receive the same clear warnings.
They have the same calendar, narrative, routes, endings, period costs, deadlines, and
expiry rules. Supported changes the pressure structure as well as tolerance;
it has no stigma or content penalty.

`MR-ACT-BREAK` costs one period and no energy. Every Standard break restores
two segments. Every Supported break restores three. Breaks are not capped per
week, and restoration cannot exceed five segments.
At zero energy, the player can push through one focused or intense task. The
completed task stores one pending crash and its nearby recovery anchor. At the
next safe point, the protagonist crashes, loses one further work period,
restores two segments, and misses any monitoring window that passed during the
crash. Pending crashes cannot stack, and a push-through is unavailable when
its guaranteed crash would require a period after Week 16 after-hours. A crash
can damage evidence, lose optional content, or close a route. It cannot begin
during manual equipment interaction or a cutscene.

The earlier estimates of 48–52, 52–56, and 58–62 productive periods are
superseded by the R01 audit below. The approved action catalogue does not yet
support those estimates.

## R01 period, energy, and evidence audit

This paper audit closes the previously undefined action counts. It is a design
fixture, not measured play evidence. Each count uses only an approved action.
Every run has one monitoring action, except oxygen loss, which has two. The
maximizing fixture uses the one allowed repeat of laser/sham, damage range,
batch check, and repair-state work.

| Action                                | Minimum defensible | Thorough honest | Maximizing |
| ------------------------------------- | -----------------: | --------------: | ---------: |
| Configure sample group                |                  5 |               6 |         10 |
| Start focused experiment              |                  2 |               3 |          3 |
| Start intense experiment or repeat    |                  3 |               3 |          7 |
| Monitor                               |                  6 |               7 |         11 |
| Analyse                               |                  5 |               6 |         10 |
| Report to Elena                       |                  5 |               5 |          6 |
| Initial manuscript draft              |                  1 |               1 |          1 |
| PI revision or preprint commit        |                  3 |               3 |          3 |
| PIIM response commit                  |                  1 |               1 |          1 |
| Research-plan or Morrow video action  |                  1 |               2 |          2 |
| Morrow or local relationship action   |                  0 |               7 |          9 |
| Mandatory scene period advances       |                  5 |               5 |          5 |
| **Non-break period demand**           |             **44** |          **56** |     **79** |
| **Energy before late-work surcharge** |             **26** |          **30** |     **46** |

The minimum fixture completes the five required experiment templates, their
reports, the required manuscript path, and the Aldercroft research plan. The
thorough-honest fixture also completes drug work, both career preparations,
and seven selected relationship actions. The maximizing fixture completes all
six templates, all four permitted repeats, both career preparations, and all
nine time-costing non-video relationship contacts. It is demand analysis, not
a promise that every item can fit its content window.

Conditional room-response periods remain separate from the base table. A run
that waits for `MR-ROOM-IMAGING-SERVICE-LIMIT` adds one period. A run that has
earned and uses `MR-SUP-GABRIEL-SERVICE` adds zero periods for that response and
therefore saves exactly one period against the waiting route. The support does
not remove an experiment's normal configure or start cost. The economy fixture
must report both adjustments:

| Imaging-service route      | Period adjustment to the selected base fixture |
| -------------------------- | ---------------------------------------------: |
| Wait for normal service    |                                             +1 |
| Use earned Gabriel support |                                             +0 |

The break counts below are optimistic lower bounds. They assume that every
restored segment is useful, assign no focused or intense action to night or
after-hours, and ignore the five-segment cap between actions. A real schedule
can need more breaks, not fewer.

| Fixture            | Standard breaks | Standard total / slack | Supported breaks | Supported total / slack |
| ------------------ | --------------: | ---------------------: | ---------------: | ----------------------: |
| Minimum defensible |              11 |                 55 / 9 |                7 |                 51 / 13 |
| Thorough honest    |              13 |                69 / -5 |                9 |                 65 / -1 |
| Maximizing         |              21 |              100 / -36 |               14 |                93 / -29 |

The result does not confirm the earlier balance claim. The minimum route fits
both profiles. The thorough-honest fixture cannot fit either profile even
under the optimistic assumptions. The mandatory Week-6 revision added in R03
uses the existing one-period, one-energy manuscript action. It removes
Supported's former one-period theoretical slack. Maximizing all systems is
deliberately impossible. No reward, route threshold, or action price changes
in this audit. A later balance decision must reduce demand, change recovery,
change the intended scope of the thorough-honest archetype, or explicitly
accept that it requires sacrifice in both profiles.

Evidence reachability also remains unpriced, but its current bounds are now
explicit:

- the campaign starts at 3, so Thin is not reachable because raw support never
  decreases;
- five required usable results give 10 more points and reach the cap of 12;
- five useful partial results give 5 more points and end at 8, Coherent;
- five inconclusive results give no points and end at 3, Developing;
- the optional drug result can add 0, 1, or 2, and Samira's usable evidence can
  add 1; and
- four permitted repeats can add between 0 and 4 in total because each Usable
  repeat gives at most one.

Therefore, required strong work can reach Substantial without optional work,
while required partial work reaches Coherent. The four packet labels do not
currently create four reachable experiences. R01 does not change starting
support or reward values. R02 defines result and quality rules, and S04 fixes
the repeat yield. Any evidence re-pricing still requires a later explicit
balance decision.

## B07 period schedule and spatial event rules

The following normal anchors apply to every named work period unless an
authored campaign beat, optional scene, equipment event, or relationship result
overrides them. They are location rules, not simulated crowd behaviour.

| Character | Early                      | Late                             | Night                  | After-hours                  |
| --------- | -------------------------- | -------------------------------- | ---------------------- | ---------------------------- |
| Elena     | PI office                  | Main laboratory or PI office     | Scene only             | Absent except **The Future** |
| Haoran    | Tissue culture             | Main laboratory or shared desks  | Rare desk scene        | Absent                       |
| Samira    | Shared desks or break room | Imaging room                     | Scene only             | Absent                       |
| Gabriel   | Facility station           | Facility station or imaging room | Remote or on-call only | Absent                       |
| Camila    | Remote only                | Remote only                      | Remote only            | Remote only                  |

Early and late retain full normal service. Night and after-hours retain
laboratory and desk work, but reduce access to people and shared services.
Equipment can run at every period. A room or station may have a visible queue,
fault, booking limit, or repair state when an authored event requires it.

A mandatory weekly beat becomes due at the first safe point in its stated
week. **Clarified** starts after its verified opening checkpoint. Every later
scene gives an in-world cue and does not let the player begin another
time-costing action first. This preserves the fixed calendar without a
teleport, a physical room lock, or an unsafe interruption. Optional cues do
not block work, and optional scenes remain available through their inclusive
deadline. `06-world-and-level-design.md` defines their spatial positions and
the exact floor access rules.

## Experiment resolution

Outcomes must be reproducible enough for players to learn. Resolution depends
on sample health/history, preparation, equipment condition, monitoring,
intervention, biological variability, and control quality. Randomness may
model variability but cannot dominate or conceal the causal model.

A new game creates a stored campaign seed. When an experiment starts, the
system locks one deterministic variation value and records the current
projected preparation band. Reloading or closing the game cannot reroll that
value. Visible sample, equipment, and monitoring events can change the
projected band. The final band locks at the last monitoring or resolution
point, and the stored value selects only inside it. A new game can use a
different seed. A different family choice, equipment state, sample condition,
or monitoring history can produce a different result for a stated reason.

Each experiment has two result layers.

- **Biological result:** complete recovery, partial recovery, failed recovery,
  or unreliable result.
- **Evidence quality:** usable, inconclusive, suspicious, or worth repeating.

Partial and failed recovery can give useful information. An unreliable result
can require a repeat or a different control. The player must be able to
distinguish the two layers through the structure, rhythm, and repatterning-index
views plus plain-language result labels.

Biological result begins with the authored experiment baseline, then responds
only to sample condition, the family-specific choice, equipment state,
monitoring state, and small saved variation. Evidence quality responds to
control quality, observation coverage, monitoring, fatigue, and raw-record
handling. Control quality cannot change biological reality.

The biological preparation calculation uses issue counts:

| Input                                    | Biological issue effect                                           |
| ---------------------------------------- | ----------------------------------------------------------------- |
| Stable sample or Ready equipment         | None                                                              |
| Stressed sample or Limited equipment     | Add one issue each                                                |
| Failing sample                           | One severe issue; band is Compromised                             |
| Higher-risk template choice              | Add one issue                                                     |
| Each missed biological monitoring window | Add one issue                                                     |
| Valid stabilizing action                 | Remove one eligible non-severe issue                              |
| Unavailable equipment                    | Block normal start and offer only an authored room-state response |

Zero issues gives Robust, one gives Mixed, and two or one severe issue gives
Compromised. The system shows the current band and plain-language reasons
before commitment. It does not show exact probabilities. After resolution, it
names the player-controlled factors that affected the final band.

Evidence quality uses the following priority:

1. Suspicious for an unexplained conflict inside the raw record.
2. Worth repeating for a clear recoverable process limit while one permitted
   repeat remains.
3. Usable when the valid record answers the stated conclusion.
4. Inconclusive when the valid record does not answer the question, including
   a process-limited record with no repeat left.

A suspicious scientific record does not automatically mean misconduct. A
later mismatch between raw and reported evidence is an integrity event. Only
a zero-energy push-through creates fatigue-related evidence risk; fatigue
cannot change the biological issue count. Saved variation cannot hide a severe
issue or a major evidence problem. B10 defines each experiment baseline.

## Evidence, Elena's paper confidence, integrity, and trust

Evidence has 12 maximum support points.

| Support | Packet label |
| ------: | ------------ |
|     0–2 | Thin         |
|     3–5 | Developing   |
|     6–8 | Coherent     |
|    9–12 | Substantial  |

The game starts at three points, Developing. An original Usable result with a
matched control and full required observation coverage gives two points. An
honestly narrowed original Usable result with a limited control or limited
coverage gives one. Any Usable repeat gives at most one. Suspicious, Worth
repeating, and Inconclusive results give zero, but can answer a reviewer or
show the next useful action. Samira's properly credited contribution gives one
once. The game states when another repeat is unlikely to improve support. Raw
evidence remains available after analysis and never decreases. Omitting a card
does not erase raw support; it weakens the paper response instead.

Elena's paper confidence starts at 45, Conditional. It measures her confidence
that the paper supports its current claim. Elena working trust separately
measures her willingness to support the protagonist as a colleague.

|  Value | Desk state  |
| -----: | ----------- |
|   0–24 | Cautious    |
|  25–49 | Conditional |
|  50–74 | Supportive  |
| 75–100 | Invested    |

Fully answering an active PI request with useful work gives 10 points; partly
answering it gives five. Deferring, refusing, or missing it removes 10.
Committing a careful, strong, or inflated claim changes Elena's paper
confidence by minus five, plus five, or plus 10. Revealing a clear weakness in
the current packet removes 10. Each request or committed revision changes
paper confidence once.
Values remain between zero and 100.

Research integrity starts at 100. Honest reporting of weak work causes no
loss. Omitting valid evidence removes 10 points, changing a reported reading
removes 25, and adding an unsupported reading removes 45. Restoring valid
omitted evidence or correcting a current draft can recover at most 10 total
points in one run. A permanent alteration or fabrication record remains even
if the visible value partly recovers.

|  Value | Visible segments |
| -----: | ---------------: |
| 81–100 |                5 |
|  61–80 |                4 |
|  41–60 |                3 |
|  21–40 |                2 |
|   1–20 |                1 |
|      0 |                0 |

Integrity displays factual warnings where needed. It does not display a moral
label.

Each recurring character has working trust on the same 0–100 scale.

|  Value | Working-trust status |
| -----: | -------------------- |
|   0–20 | Damaged              |
|  21–40 | Strained             |
|  41–60 | Working              |
|  61–80 | Trusted              |
| 81–100 | Strong               |

| Character |                  Initial value |
| --------- | -----------------------------: |
| Elena     |                             60 |
| Haoran    |                             60 |
| Samira    |                             40 |
| Gabriel   |                             60 |
| Camila    | 40 when her Week 8 bar appears |

A minor authored choice changes working trust by 10 points and a major action
by 20. Values do not drift without a clear event. Ignoring a direct request
counts as an authored action when its deadline expires. The interface shows
only the five-segment bar, descriptive state, and factual reason for a change.
It never shows numeric values, deltas, formulas, or support thresholds.

Each character has one distinct, once-per-campaign support result. It requires
a relevant supportive choice, no permanent breach, and Working or better trust
when used. Haoran removes one eligible visible preparation issue before start.
Samira supplies one properly credited evidence contribution. Gabriel resolves
the approved imaging-service limit without a wait. Elena identifies one
missing Aldercroft-plan requirement before its commit; she does not change a
PIIM card or scientific result. Camila provides the complete Morrow role and
trade-off briefing without changing eligibility. At Damaged, a character can
withhold help, confront the player, or distance themselves. Permanent flags
retain denied credit, fabrication concerns, and closed routes even after the
visible bar later improves.

## Experiment interaction state

At most three labelled sample groups are active. A group occupies a slot from
preparation until final analysis. It moves through a visible running,
check-ready, attention-needed, or ready-for-analysis condition. Its physical
rack signal and its desk work-queue label show the same condition.

These three slots are the complete sample-capacity constraint. The game has no
separate finite sample-supply resource.

The player configures a goal, matched or limited control quality, structure,
rhythm, or paired observation, and one qualitative template-specific choice.
Paired observation gives full paired coverage only when the player spends the
quality-check monitor action. The player then starts the run, monitors it at
meaningful points, and analyses it. The work queue cannot control the sample
remotely. Meaningful monitoring and intervention require the physical station.

At a monitoring point, the player can continue, spend attention on a quality
check or stabilizing action, or stop. A clear warning appears before the player
advances past the window. Each missed biological window adds one preparation
issue and each missed observation reduces evidence coverage. Stopping frees
the slot immediately, loses the current sample and elapsed work, and preserves
only earlier archived raw records. It creates a stop log, not an evidence card.
The confirmation also identifies any opportunity that can expire before a
replacement finishes. Final analysis frees the slot and archives the raw
record.

Equipment queues, faults, and access restrictions use the three authored room
states in `06-world-and-level-design.md`. They are not random hard barriers.
Every state offers at least two stated routes with different costs. No other
room state can block an action.

## Causal feedback and recovery

Before a meaningful action, the game gives a short plain-language forecast of
the likely trade-off. After resolution, it separates observation from
interpretation. It identifies an action-caused effect only where the game has
enough evidence to support that statement.

Poor results must always give useful information, a clear repeat reason, or a
lower-quality route forward. Mandatory progress cannot require a perfect
result. The player can repeat work, change controls, revise a claim, omit
evidence, or use a more limited paper route. B10 sets the authored outcome
bands and baselines. A later recorded slice review may adjust only the approved
band percentages.

## Pressure and trade-offs

- Concurrent experiments compete with writing, administration, rest,
  relationships, and industry communication.
- Skipping or rushing controls can save time but weaken integrity and future
  interpretability.
- Extra work can improve evidence while consuming the resources needed to
  finish the manuscript or maintain relationships.
- Elena's paper confidence can rise while integrity falls, and vice versa.
- Failure should alter knowledge or opportunity rather than function as a pure
  time tax.
- A careful manuscript claim can protect integrity but reduce Elena's paper
  confidence. A strong claim can increase paper confidence. An inflated claim
  can increase paper confidence, harm integrity, and cause harder reviewer
  demands.

## Requests, gates, and soft failure

The request system is authored. Mandatory weekly beats and core PI requests
are fixed. Optional desk items can refer only to a catalogued character,
career, wording, or room-state event selected by current state. There are no
uncatalogued optional PI requests and no unlimited procedural requests.

The desk shows at most two high-priority required requests and three optional
requests at one time. Active sample groups use their separate queue. Week 5
manuscript work, Week 8 preprint, Week 10 peer review, Week 14 response, and
Week 16 conclusion happen in every run. Weak work changes the available paper
path, not the calendar.

There is no free emergency catch-up resource. At a gate, unfinished required
work opens a lower-evidence route: repeat later, narrow the claim, accept a
weak packet, or withdraw. Optional work can expire. The game states this
expiry clearly rather than silently removing it.

The campaign never gives a global game-over screen before Week 16. A forced
crash, weak packet, missed opportunity, damaged relationship, or lost route is
a serious consequence but still leads to a final state. Only stated conditions
close a route immediately: public-record withdrawal closes both routes;
ignoring both Camila messages or confessing fabrication closes Morrow; and an
Aldercroft rejection closes academia.

## Manuscript system

The physical manuscript desk contains figure, evidence, claim, control,
authorship, request, and supplementary cards. The player connects cards to
figures and claims rather than typing a paper. Analysis creates evidence cards
with research-question, control, evidence-view, quality, and caveat tags.

The board has one claim slot, three figure slots with one linked evidence card
each, two control slots, one caveat strip, one authorship slot, one
supplementary slot, and one active-request slot. The caveat must come from an
included evidence card. A card can occupy only one board position in a commit.

| Claim    | Factual support requirements                                                                                               |
| -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Careful  | One supported figure/evidence pair, one relevant control, and one selected caveat.                                         |
| Strong   | Two supported pairs from different templates, structure and rhythm coverage, one matched control, and one selected caveat. |
| Inflated | Every Strong requirement plus causal support. Honest campaign evidence cannot fill the causal requirement.                 |

An altered or unsupported reported reading can appear to fill the Inflated
causal requirement if no visible record contradicts it. This changes the
reported board, not the locked raw record or integrity history.

Each PI or reviewer request creates a small revision task. The player can
support it with evidence, soften wording, defer it, omit evidence, or request
another experiment. The response affects time, coherence, Elena's paper
confidence, evidence alignment, relationships, or integrity. The repair-state
claim still has careful, strong, and inflated levels.

A requirements panel lists every slot and active request as met, missing,
conflict, or unsupported. It also lists authorship obligations. These are
factual support states, not moral labels. The panel never prevents a commit,
except where the campaign requires the player to choose submission, response,
or withdrawal before the fixed gate can continue.

A change becomes permanent only when the player commits a revision. The commit
creates a visible version snapshot. Leaving the board before a commit discards
only the current arrangement. Earlier snapshots support comparison, but do not
undo consequences after a commit.

## Integrity and irreversible loss

The raw laboratory record is permanent and locked. The player can report it
honestly, omit valid evidence, change a reported reading, or add an unsupported
reading in analysis or manuscript work. A dishonest report requires a clear
confirmation and has no moral-score label. The game does not show a practical
falsification method.

The original record cannot be erased. The player cannot restore an abandoned
sample group, reverse a committed report, or use an earlier manuscript
snapshot as a free undo. Fabrication can still remain undiscovered when the
visible record does not support another character's concern.

A misconduct flag alone stays hidden. A public contradiction is visible to
Aldercroft. A mismatch raised by Haoran or Gabriel is visible to Elena. Samira
can raise a valid concern supported by an honest limitation or caveat, or by a
visible mismatch. There is no random discovery.

Correction resolves the concern, preserves its history, gives the approved
trust increase, and permits the limited integrity recovery. Denial removes 20
trust, ends the immediate discussion, and leaves the concern unresolved.
Deferral removes 10 trust and schedules one no-cost reminder. Ignoring that
reminder removes another 10 trust and leaves the concern unresolved. Each
concern grants correction trust and integrity recovery at most once. An
unresolved concern becomes serious only at the Week 13 Aldercroft check.

## Interruptions and safe continuity

An interruption uses a world signal, safe queue notification, then optional
response or scene. Non-critical messages can be deferred. Closing a message
does not reply or resolve it. A scene cannot start while equipment needs
attention, and a deadline must be explicit.

Safe checkpoints occur at experiment-stage changes, monitoring decisions,
analysis archiving, manuscript commits, and scene boundaries. A safe save can
contain queued events and one pending crash, but not an active scene. Menus,
pause, browser focus loss, and browser closure do not advance game time or
cause a missed monitoring window. The B05 time and progression rules apply.
B08 fixes one active local IndexedDB save per browser profile, no automatic
unfinished-save expiration, and a completion Archive with 12 ending cards
plus persistent Institutional Citations. `11-technical-architecture.md`
defines persistence schemas, validation, migration, and recovery.

## PIIM response band

PIIM has three visible response cards: batch evidence, oxygen-loss challenge,
and claim scope and reviewer response. Each card is Met, Partly Met, or Not
Met. The manuscript board shows the current reason.

| Response card                     | Met                                                                           | Partly Met                                                                                            | Not Met                                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Batch evidence                    | A relevant Usable batch record with its control and caveat is included.       | A valid limited, Inconclusive, or Worth repeating batch record is included with its limitation.       | The record is absent, omitted, visibly contradicted, or replaced only by a visibly unsupported reading.                  |
| Oxygen-loss challenge             | A relevant Usable oxygen-loss record with its control and caveat is included. | A valid limited, Inconclusive, or Worth repeating oxygen-loss record is included with its limitation. | The record is absent, omitted, visibly contradicted, or replaced only by a visibly unsupported reading.                  |
| Claim scope and reviewer response | The selected Careful or Strong claim meets all board requirements.            | A Careful or Strong claim has exactly one missing support requirement and states that limitation.     | Two or more requirements are missing, an honest Inflated claim lacks causal support, or a visible contradiction remains. |

An altered or invented reading can make a response card appear Met if it fills
the visible requirement and no visible record contradicts it. This does not
restore integrity. Clearly stating that a missing result is absent keeps its
card Not Met, but can satisfy the separate `MR-CIT-03` transparency trigger.

| Earned response band                                                            | Week 15 paper state                         |
| ------------------------------------------------------------------------------- | ------------------------------------------- |
| All three cards Met and no visible evidence contradiction                       | Published or accepted pending final work    |
| At least one card Met, all other cards Partly Met, and no visible contradiction | Accepted pending final work or under review |
| Any card Not Met, all three cards only Partly Met, or a visible contradiction   | Under review or rejected                    |
| Journal or public-record withdrawal                                             | Rejected or withdrawn                       |

The stored seed chooses only between the adjacent outcomes in the earned band.
It cannot turn a strong response into rejection or a weak response into
publication. An altered or invented reported result can appear to meet a card
where no visible record contradicts it. It does not repair integrity.

## Career-route readiness

The player can receive an Aldercroft invitation in Week 13 only if they:

- complete the one-period five-year research-plan task before Week 12;
- have a Coherent or Substantial evidence packet;
- have either Supportive or Invested Elena's paper confidence, or at least 41
  Elena working trust; and
- have no unresolved serious concern visible to Aldercroft or Elena.

A hidden integrity problem alone does not block an Aldercroft route. A late
PIIM result does not change an existing invitation. Publication is not
required.

The player can receive the Week 15 Morrow offer only if they reply to Camila,
attend the video call, keep the public preprint available, have at least three
analysed experiment records, include at least one honestly stated limitation or
caveat, have at least 41 Camila working trust, and do not confess fabrication
to Camila. A weak result, publication, a Coherent packet, and drug exposure are
not required. Hidden integrity alone does not close it; a visible conflict or
confession can.

Before a route deadline, Research Status gives clear non-spoiling feedback,
such as Aldercroft needs a stronger research case or Morrow needs a reply. It
does not reveal the full formula or hidden flags.

## B06 final-state resolution

The Week 16 result first checks route closure. Public-record withdrawal closes
both routes and creates **End of Contract** with the separate
`publicWithdrawal` text variant, without moral praise. Otherwise, a player can
choose **Pending Appointment** only when Aldercroft is available, or
**Transferable Skills** only when Morrow is available. **Out of Scope** is the
separate deliberate-departure choice when at least one route is available.
**End of Contract** is used only when no route remains. When both routes are
available, the summary records the unchosen route as an alternative declined.
Keeping both routes available has no additional time, trust, or route cost.
The final confirmation is irreversible and states the concrete gain and loss
for the selected route.

Morrow can coexist with journal rejection or journal withdrawal, but not with
public-record withdrawal. Aldercroft can coexist with every paper state except
public-record withdrawal.

The paper state has no new random result after Week 16. Published remains
published; accepted pending final work becomes published through routine final
processing; under review remains unresolved; and rejected or withdrawn remains
rejected or withdrawn. Evidence has no separate epilogue module because its
effects already appear through paper state and route readiness. The ending
summary still shows the final evidence-packet label.

| Integrity state      | Ending rule                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Defensible           | Honest reporting, or a corrected omission, with no changed reported reading or unsupported result. |
| Compromised          | An unresolved omission, with no changed reported reading or unsupported result.                    |
| Seriously undermined | Any changed reported reading or unsupported result, whether or not another character discovers it. |

An undiscovered seriously undermined record produces private unease, a fragile
record, or future risk. A visible mismatch produces a direct professional or
relationship consequence. A compromised record is an unresolved limitation,
not an automatic scandal.

Fatigue has an epilogue module only if the player crashed or ends Week 16 with
zero or one energy segment. It changes the career scene tone, visual detail,
and relationship afterbeat; it cannot change paper state or route availability.

## Balance principles

- No universally optimal schedule should trivialize the campaign.
- Consequences must be legible enough to feel earned without exposing every
  hidden narrative flag.
- Integrity must not be a simplistic morality meter that always maximizes all
  outcomes.
- Recovery and constructive failure must remain possible.
- Approximately three hours should contain escalation, not repetitive grinding.

## B10 outcome-band and tuning contract

Each started experiment locks one saved variation value and shows its current
projected preparation band. The final earned band locks at the last monitoring
or resolution point. Reloading cannot change the variation or any earned state
change.

| Earned band             | Strong | Limited | Weak |
| ----------------------- | -----: | ------: | ---: |
| Robust preparation      |    80% |     20% |   0% |
| Mixed preparation       |    20% |     60% |  20% |
| Compromised preparation |     0% |     20% |  80% |

Sample condition, equipment state, the family-specific choice, and biological
monitoring set the band through the issue-count rules above. Controls,
observation coverage, fatigue, and record handling set evidence quality, not
biological reality. The seed selects only inside the final band. A major
player-caused problem cannot become a strong result through variation, and
robust preparation cannot become a weak result through variation.

The approved action-cost table is in `02-player-experience-and-loop.md`. The
authored template baselines are in `04-science-and-experiments.md`. Every
catalogue action and test fixture must reference both where relevant.

The exact pure command boundary, 24-command and five-effect unions, rejection
and fault order, atomic time and energy application, deterministic FNV-1a and
Mulberry32 bucket, preparation, evidence, manuscript, integrity, PIIM, route,
and ending algorithms are documented in implementation S04. Implementation
S05 fixes safe-point, crash, event, cutscene, skip, resume, and finalization
order.

After the vertical-slice internal evaluation, a recorded balance change may
alter the three percentages only. It may not add a new outcome type, hide a
player-caused failure, change a fixed campaign gate, or create a new mandatory
experiment without Leonardo's explicit approval.
