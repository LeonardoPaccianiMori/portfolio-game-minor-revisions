# Systems and Balance

Status: **approved through B08; runtime implementation and tuning deferred**

## State model and player visibility

| State | Internal representation | Player-facing feedback |
|---|---|---|
| Semester time | 64 work periods across 16 weeks | Current week and early, late, night, or after-hours period on the permanent HUD |
| Energy | 0–5 segments | Five-segment bar on the permanent HUD |
| Evidence | 0–12 support points | Thin, Developing, Coherent, or Substantial packet label in Research Status |
| PI confidence | 0–100 | Cautious, Conditional, Supportive, or Invested desk label and Elena's response |
| Research integrity | 0–100 plus permanent history flags | Five-segment bar and factual warnings in Research Status |
| Working trust | 0–100 for each main character plus permanent flags | One five-segment bar for Elena, Haoran, Samira, Gabriel, and Camila |

The player can open Research Status at any time. It contains evidence, PI
confidence, integrity, working trust, current route feedback, and the reason
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

## Time, pacing, and pressure profiles

The fixed semester has 64 work periods: early, late, night, and after-hours in
each of 16 weeks. Walking, reading, and ordinary dialogue cost no period.
Meaningful actions cost one, two, or three periods, and state the cost before
commitment.

| Action class | Time cost | Standard energy cost |
|---|---:|---:|
| Light work | 1 period | 0 |
| Focused work | 1 period | 1 |
| Intense work | 2 periods | 2 |
| Rare major commitment | 3 periods | 2 |

Normal experiment, analysis, manuscript, and communication work normally use
the focused class. Demanding work, repeats, difficult revisions, and sample or
equipment recovery use the intense class. B10 assigns the exact class to each
authored action.

Early and late are normal work periods. Night and after-hours add one energy
segment to focused or intense work in Standard profile and reduce access to
people and shared services. Exact schedules are in
`06-world-and-level-design.md`.

Standard profile starts with four energy segments. Supported starts with five,
removes the late-work energy surcharge, restores three segments through each
protected break, and gives an extra clear warning before a gate or irreversible
choice. Both profiles have the same calendar, narrative, routes, and endings.
Supported has no stigma or content penalty.

In Standard profile, the first protected break in a week costs one period and
restores two segments. Later protected breaks cost one period and restore one.
At zero energy, the player can push through one focused or intense task. At its
next safe point, the protagonist crashes, loses one further work period,
restores two segments, and misses any monitoring window that passed during the
crash. A crash can damage evidence, lose optional content, or close a route. It
cannot begin during manual equipment interaction or a cutscene.

A defensible route needs about 48–52 productive periods. A normal run with a
repeat, relationship work, or recovery needs about 52–56. A high-evidence
paper path can use 58–62. No viable route requires a crash. A player risks a
crash by trying to maximize evidence, PI confidence, relationships, and both
career routes in one run.

## B07 period schedule and spatial event rules

The following normal anchors apply to every named work period unless an
authored campaign beat, optional scene, equipment event, or relationship result
overrides them. They are location rules, not simulated crowd behaviour.

| Character | Early | Late | Night | After-hours |
|---|---|---|---|---|
| Elena | PI office | Main laboratory or PI office | Scene only | Absent except **The Future** |
| Haoran | Tissue culture | Main laboratory or shared desks | Rare desk scene | Absent |
| Samira | Shared desks or break room | Imaging room | Scene only | Absent |
| Gabriel | Facility station | Facility station or imaging room | Remote or on-call only | Absent |
| Camila | Remote only | Remote only | Remote only | Remote only |

Early and late retain full normal service. Night and after-hours retain
laboratory and desk work, but reduce access to people and shared services.
Equipment can run at every period. A room or station may have a visible queue,
fault, booking limit, or repair state when an authored event requires it.

A mandatory weekly beat becomes due at the first safe point in its stated
week. The game gives an in-world cue and does not let the player begin another
time-costing action first. This preserves the fixed calendar without a
teleport, a physical room lock, or an unsafe interruption. Optional scenes
remain available through their stated deadline. `06-world-and-level-design.md`
defines their spatial positions and the exact floor access rules.

## Experiment resolution

Outcomes must be reproducible enough for players to learn. Resolution depends
on sample health/history, preparation, equipment condition, monitoring,
intervention, biological variability, and control quality. Randomness may
model variability but cannot dominate or conceal the causal model.

A new game creates a stored campaign seed. When an experiment starts, the
system records its earned outcome range. Reloading or closing the game cannot
reroll it. A new game can use a different seed. A different setup, control
choice, or sample state can produce a different result for a stated reason.

Each experiment has two result layers.

- **Biological result:** complete recovery, partial recovery, failed recovery,
  or unreliable result.
- **Evidence quality:** usable, inconclusive, suspicious, or worth repeating.

Partial and failed recovery can give useful information. An unreliable result
can require a repeat or a different control. The player must be able to
distinguish the two layers through the structure, rhythm, and repatterning-index
views plus plain-language result labels.

Biological result begins with the authored experiment baseline, then responds
to sample state, selected approach, equipment condition, and small saved
variation. Evidence quality responds to control quality, monitoring, quality
checks, missed windows, fatigue, and record handling. Saved variation can move
the biological result by one adjacent category only. It cannot make an expected
failure complete recovery or hide a major player-caused evidence problem. B10
defines each experiment's authored baseline.

## Evidence, PI confidence, integrity, and trust

Evidence has 12 maximum support points.

| Support | Packet label |
|---:|---|
| 0–2 | Thin |
| 3–5 | Developing |
| 6–8 | Coherent |
| 9–12 | Substantial |

The game starts at three points, Developing. A new usable result with
appropriate controls gives two points. A useful partial result or first repeat
gives one. An inconclusive result gives zero, but can answer a reviewer or
show the next useful action. Later repeats have diminishing returns. The game
states when another repeat is unlikely to improve support. Raw evidence remains
available after analysis and never decreases. Omitting a card does not erase
raw support; it weakens the paper response instead.

PI confidence starts at 45, Conditional.

| Value | Desk state |
|---:|---|
| 0–24 | Cautious |
| 25–49 | Conditional |
| 50–74 | Supportive |
| 75–100 | Invested |

Fully answering an active PI request with useful work gives 10 points; partly
answering it gives five. Deferring, refusing, or missing it removes 10.
Committing a careful, strong, or inflated claim changes PI confidence by minus
five, plus five, or plus 10. Revealing a clear weakness in the current packet
removes 10. Each request or committed revision changes PI confidence once.
Values remain between zero and 100.

Research integrity starts at 100. Honest reporting of weak work causes no
loss. Omitting valid evidence removes 10 points, changing a reported reading
removes 25, and adding an unsupported reading removes 45. Restoring valid
omitted evidence or correcting a current draft can recover at most 10 total
points in one run. A permanent alteration or fabrication record remains even
if the visible value partly recovers.

| Value | Visible segments |
|---:|---:|
| 81–100 | 5 |
| 61–80 | 4 |
| 41–60 | 3 |
| 21–40 | 2 |
| 1–20 | 1 |
| 0 | 0 |

Integrity displays factual warnings where needed. It does not display a moral
label.

Each recurring character has working trust on the same 0–100 scale.

| Value | Working-trust status |
|---:|---|
| 0–20 | Damaged |
| 21–40 | Strained |
| 41–60 | Working |
| 61–80 | Trusted |
| 81–100 | Strong |

| Character | Initial value |
|---|---:|
| Elena | 60 |
| Haoran | 60 |
| Samira | 40 |
| Gabriel | 60 |
| Camila | 40 when her Week 8 bar appears |

A minor authored choice changes working trust by 10 points and a major action
by 20. Values do not drift without a clear event. Ignoring a direct request
counts as an authored action when its deadline expires. At 61 or above, a
character can offer one bounded support action in the related scene. At 20 or
below, they can withhold help, confront the player, or distance themselves.
Permanent flags retain denied credit, fabrication concerns, and closed routes
even after the visible bar later improves.

## Experiment interaction state

At most three labelled sample groups are active. A group occupies a slot from
preparation until final analysis. It moves through a visible running,
check-ready, attention-needed, or ready-for-analysis condition. Its physical
rack signal and its desk work-queue label show the same condition.

The player configures a goal, control quality, and observation focus. An
authored family-specific choice can add one qualitative decision. The player
then starts the run, monitors it at meaningful points, and analyses it. The
work queue cannot control the sample remotely. Meaningful monitoring and
intervention require the physical station.

At a monitoring point, the player can continue, spend attention on a quality
check or stabilizing action, or stop. A clear warning appears before the player
advances past the window. Passing it can weaken evidence quality or result
reliability. Stopping loses the sample group and elapsed game time. Final
analysis frees the active slot. Raw evidence survives both outcomes.

Equipment queues, faults, and access restrictions are authored choices, not
random hard barriers. They offer a stated route such as waiting, negotiating,
asking Gabriel for help, using a limited alternative, or changing the plan.

## Causal feedback and recovery

Before a meaningful action, the game gives a short plain-language forecast of
the likely trade-off. After resolution, it separates observation from
interpretation. It identifies an action-caused effect only where the game has
enough evidence to support that statement.

Poor results must always give useful information, a clear repeat reason, or a
lower-quality route forward. Mandatory progress cannot require a perfect
result. The player can repeat work, change controls, revise a claim, omit
evidence, or use a more limited paper route. B10 owns exact authored outcome
weights and post-playtest tuning.

## Pressure and trade-offs

- Concurrent experiments compete with writing, administration, rest,
  relationships, and industry communication.
- Skipping or rushing controls can save time but weaken integrity and future
  interpretability.
- Extra work can improve evidence while consuming the resources needed to
  finish the manuscript or maintain relationships.
- PI confidence can rise while integrity falls, and vice versa.
- Failure should alter knowledge or opportunity rather than function as a pure
  time tax.
- A careful manuscript claim can protect integrity but reduce PI confidence. A
  strong claim can increase PI confidence. An inflated claim can increase PI
  confidence, harm integrity, and cause harder reviewer demands.

## Requests, gates, and soft failure

The request system is hybrid. Mandatory weekly beats and core PI requests are
authored and fixed. Optional requests, character scenes, equipment problems,
and wording changes come from small authored sets selected by current state.
The game has no unlimited procedural requests.

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

Each PI or reviewer request creates a small revision task. The player can
support it with evidence, soften wording, defer it, omit evidence, or request
another experiment. The response affects time, coherence, PI confidence,
evidence alignment, relationships, or integrity. The repair-state claim still
has careful, strong, and inflated levels.

A requirements panel lists active requests, missing controls, conflicting
claims, and authorship obligations. It warns about a weak or compromised draft
but does not prevent a deliberate choice, except where the campaign requires a
submission, response, or withdrawal.

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

## Interruptions and safe continuity

An interruption uses a world signal, safe queue notification, then optional
response or scene. Non-critical messages can be deferred. A scene cannot start
while equipment needs attention, and a deadline must be explicit.

Safe checkpoints occur at experiment-stage changes, monitoring decisions,
analysis archiving, manuscript commits, and scene boundaries. Menus, pause,
and browser closure do not advance game time or cause a missed monitoring
window. The B05 time and progression rules apply. B08 fixes one active local
IndexedDB save per browser profile, no automatic unfinished-save expiration,
and a completion Archive with 12 ending cards plus persistent Institutional
Citations. B09 defines persistence schemas and recovery.

## PIIM response band

PIIM has three visible response cards: batch evidence, oxygen-loss challenge,
and claim scope and reviewer response. Each card is met, partly met, or not
met. The manuscript board shows the current reason. A strong but overstated
claim can weaken the claim-scope card even where the result looks impressive.

| Earned response band | Week 15 paper state |
|---|---|
| All three cards met and no visible evidence contradiction | Published or accepted pending final work |
| Mixed cards | Accepted pending final work or under review |
| Weak or mismatched cards | Under review or rejected |
| Journal or public-record withdrawal | Rejected or withdrawn |

The stored seed chooses only between the adjacent outcomes in the earned band.
It cannot turn a strong response into rejection or a weak response into
publication. An altered or invented reported result can appear to meet a card
where no visible record contradicts it. It does not repair integrity.

## Career-route readiness

The player can receive an Aldercroft invitation in Week 13 only if they
complete the one-period five-year research-plan task before Week 12, have at
least two of the following three conditions, and have no serious evidence
concern visible to Aldercroft or Elena:

- Coherent or Substantial evidence packet;
- Supportive or Invested PI confidence;
- at least 41 Elena working trust.

A hidden integrity problem alone does not block an Aldercroft route. A late
PIIM result does not change an existing invitation.

The player can receive the Week 15 Morrow offer only if they reply to Camila,
attend the video call, keep the public preprint available, have at least a
Developing evidence packet, have at least 41 Camila working trust, and do not
confess fabrication to Camila. The optional drug experiment improves this
route but is never required. Hidden integrity alone does not close it; a
visible conflict or confession can.

Before a route deadline, Research Status gives clear non-spoiling feedback,
such as Aldercroft needs a stronger research case or Morrow needs a reply. It
does not reveal the full formula or hidden flags.

## B06 final-state resolution

The Week 16 result first checks route closure. Public-record withdrawal closes
both routes and therefore creates **End of Contract**. Otherwise, a player can
choose **Pending Appointment** only when Aldercroft is available, or
**Transferable Skills** only when Morrow is available. **Out of Scope** is the
separate deliberate-departure choice when at least one route is available.
**End of Contract** is used only when no route remains. When both routes are
available, the summary records the unchosen route as an alternative declined.

Morrow can coexist with journal rejection or journal withdrawal, but not with
public-record withdrawal. Aldercroft can coexist with every paper state except
public-record withdrawal.

The paper state has no new random result after Week 16. Published remains
published; accepted pending final work becomes published through routine final
processing; under review remains unresolved; and rejected or withdrawn remains
rejected or withdrawn. Evidence has no separate epilogue module because its
effects already appear through paper state and route readiness. The ending
summary still shows the final evidence-packet label.

| Integrity state | Ending rule |
|---|---|
| Defensible | Honest reporting, or a corrected omission, with no changed reported reading or unsupported result. |
| Compromised | An unresolved omission, with no changed reported reading or unsupported result. |
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

## Deferred decisions

- B07 schedule, room, and event staging rules are documented in
  `06-world-and-level-design.md` and `05-characters-and-dialogue.md`.
- B09 owns data schemas, seed serialization, save migration, browser support,
  and runtime implementation.
- B10 owns exact experiment baselines, request content, dialogue, and tuned
  values after playtests.
