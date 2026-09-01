# S05 Calendar, Scheduler, Events, and Cutscenes

Status: **documented technical specification; no implementation authorized**

This specification fixes the 64-period calendar, safe-point scheduler, event
queue, expiry, message, reminder, crash, room-event, cutscene, reload, recap,
and final-campaign order for _Minor Revisions_. It also defines candidate
`MR-IF-005` and the S05-owned campaign part of candidate `MR-IF-011`.

The numbered design documents remain the authority for player-visible story,
meaning, content, balance, and presentation. S03 owns stored campaign shape.
S04 owns the closed 24-command rule boundary, its five effects, atomic
transitions, and deterministic variation. S06 will own exact authored content
objects, IDs not already fixed by B10, priorities, deadlines, variants, and
text. S07 owns physical save storage and recovery. S09 owns UI and input
presentation. S10 now owns camera, animation, rendering, audio, and the
complete presentation half of the cutscene interface. S12 later defines the
fixture contract named here. S14 later completes the cross-interface audit.

Nothing in S05 creates game code, package configuration, a production asset,
save data, test evidence, or implementation permission.

## Terms

- A **period** is one of the four fixed work segments in a campaign week.
- A **safe point** is a valid campaign state in which no campaign command,
  manual equipment interaction, or cutscene is active.
- The **scheduler** is the pure rules component that decides the next
  automatic command or player-facing delivery at a safe point.
- A **cue** is an approved world or desk signal that makes a queued scene
  available to start. It is not a quest marker.
- A **checkpoint** is a verified safe campaign state saved for recovery.
- A **presentation token** is a temporary, unsaved value that connects one
  cutscene request to its current presentation response. It is not campaign
  truth.
- A **fixture** is a fixed starting state, trigger, expected instruction trace,
  and expected final state that S12 will later encode as an executable test.

## Calendar contract

`calendar.periodIndex` is a safe integer from `0` through `63`. It maps to the
fixed 16-week campaign as follows:

- week number is `floor(periodIndex / 4) + 1`;
- remainder `0` is early;
- remainder `1` is late;
- remainder `2` is night; and
- remainder `3` is after-hours.

The first campaign state is period `0`, Week 1 early. Period `63` is Week 16
after-hours. A period window includes its stated final period. No action can
advance beyond period `63`.

Walking, looking, reading, ordinary dialogue, menus, pausing, browser focus,
visual frames, the current date, and elapsed real time never advance the
calendar. Loading never advances time. Only an applied S04 command with an
approved period cost, an approved crash transition, or an approved scene
period effect can change `periodIndex`.

A time-costing action is indivisible. The complete action either applies with
its full cost and consequences or does not apply. The player cannot stop it at
an intermediate crossed period.

## Crossed-period order

If a transition changes period `P` to later period `Q`, processing examines
each entered period in order: `P + 1`, `P + 2`, and so on through `Q`.

For each entered period, use this order:

1. apply experiment progress and make newly due monitoring attention factual;
2. resolve deadlines, window endings, and authored automatic transitions;
3. expire old optional content before new content unlocks;
4. update the floor act, time-of-day state, normal character roster, required
   character overrides, and room windows;
5. calculate newly eligible events and put them in the queue; and
6. expose the next approved notification or cue only after all earlier
   automatic work is stable.

The scheduler preserves the causal order of the S04 change history. It does
not combine several campaign changes into one invented transition. Each
automatic campaign change is one checked S04 system command and increments
the campaign revision exactly once.

Before an action applies, one combined warning lists every guaranteed or known
consequence crossed by that action. It identifies the action and includes, as
applicable, experiment attention, deadline or optional-content loss, route or
message expiry, zero-energy push-through, and the guaranteed crash period. The
player confirms once. A crash that then crosses monitoring windows marks them
missed without a second confirmation.

## Safe-point eligibility

Scheduler processing can start only when all of these statements are true:

- the supplied campaign state passed S03 and connected-content validation;
- no S04 command is being applied;
- no manual equipment interaction is unresolved;
- no cutscene presentation is active; and
- no earlier scheduler process is active.

The application uses one ordered campaign-request queue from S02. A new
campaign-changing request waits while safe-point processing is active. Visual
movement and frames remain outside this queue and cannot change campaign
truth.

Eligibility is rechecked after:

- campaign creation;
- every applied campaign command;
- event-presentation completion or cancellation;
- cutscene completion or approved skip; and
- a validated load.

An expected rejected player request does not trigger scheduler progress. A
rejected command or fault changes no state and emits no effect under S04.

## `MR-IF-005` scheduler boundary

Candidate `MR-IF-005` is owned by `rules`. Its consumers are application,
narrative, cutscenes, persistence coordination, UI projection, content
validation, and tests.

The pure operation is specified as:

`getNextSchedulerInstruction(state, trigger, validatedContent)`

It does not mutate inputs, read browser or wall-clock state, save data, show
UI, start a cutscene, or call another runtime module. The same valid inputs
produce the same result.

### Triggers

The closed trigger set is:

- `campaignCreated`;
- `commandApplied`, with the accepted command identity and previous and next
  state revisions;
- `eventPresentationCompleted`, with the event ID and accepted presentation
  receipt; and
- `validatedLoad`.

No timer, frame, focus, visibility, resize, animation, or audio callback can
trigger scheduler processing.

### Results

The operation returns exactly one of these results:

| Result         | Required data                                                               | Meaning                                              |
| -------------- | --------------------------------------------------------------------------- | ---------------------------------------------------- |
| `command`      | One complete S04 system command and scheduler reason key                    | Apply one automatic campaign change through S04.     |
| `notification` | Event ID and authored content reference                                     | Present one approved no-time notification.           |
| `sceneCue`     | Event ID, scene ID, cue reference, required flag, and approved access facts | Make one queued scene due through the world or desk. |
| `settled`      | Current campaign revision and scheduler revision                            | No automatic change or delivery is pending.          |
| `fault`        | One S05 fault code and sanitized context                                    | Scheduler or cutscene coordination is invalid.       |

A scheduler result never contains player-facing prose, a partial campaign
state, a Three.js object, camera data, a save payload, or an audio object.
Player-facing text and cue data come from validated S06 content.

The application asks for one instruction, applies or presents it, then asks
again only after the result completes. It continues until the scheduler
returns `settled` or one scene remains active. It never runs two scheduler
processes at once.

## Scheduler state refinements

S03's `lastSafePointRevision` field is renamed `lastSchedulerRevision` before
implementation. No save migration is required because no implementation or
real save exists.

`lastSchedulerRevision` changes only when an applied command changes scheduler
event or queue truth. A harmless eligibility check, `settled` result, ignored
duplicate response, browser frame, or other no-change operation creates no
revision.

Every stored scheduler event contains:

- its stable event ID;
- one lifecycle state;
- `firstEligiblePeriod`, which is a period index or `null`; and
- `resolvedPeriod`, which is its completion or expiry period or `null`.

Delivery type, opening and final periods, required or optional status,
priority, authored order, prerequisites, variants, cue references, and text
remain in validated S06 content. Stored campaign state records facts, not a
copy of authored definitions.

Event states remain `locked`, `eligible`, `queued`, `active`, `completed`, and
`expired`. Eligibility is one-way. A valid locked event becomes eligible once,
queues once, and cannot return to locked. It requires all of the following:

- the current period is in its approved window;
- all prerequisites are true;
- it has not already been used or resolved; and
- no permanent block applies.

Required story content does not expire. Optional content expires once at the
end of its inclusive window. Content that is already active finishes normally
after its window closes.

## Queue and priority

The queue contains unique event IDs only. Each queued ID has event state
`queued`. At most one event is active. The active event is absent from the
queue and has event state `active`. An in-progress scene matches that active
event. Completed, skipped, or expired content cannot be active or queued.

The fixed scheduler priority is:

1. pending crash;
2. experiment attention;
3. mandatory content;
4. required messages or reminders; and
5. optional content.

Within the same priority, order events by:

1. earliest expiry;
2. earliest first eligible period;
3. authored order; and
4. stable event ID.

Queued optional content does not block time-costing work. Required queued
content blocks another time-costing action after its approved cue becomes due.
Temporary character absence can pause physical access to a scene, but it does
not extend the scene's deadline. Required content must have an authored desk or
world fallback so that temporary access cannot deadlock the campaign.

## Safe-point processing algorithm

At one accepted trigger, the application and pure scheduler repeat this
sequence:

1. validate the complete state and connected content without repairing either;
2. reject concurrent scheduler ownership;
3. if a scene is active, wait for its presentation result;
4. if a pending crash exists, return its one S04 resolution command;
5. process crossed periods from earliest to latest through one S04 command at
   a time;
6. apply all automatic transitions, expiries, and world-semantic updates
   before exposing player-facing content;
7. evaluate event eligibility and queue each newly eligible event once;
8. finish one-time late gate work in its fixed causal order;
9. return the highest-priority notification or scene cue; and
10. return `settled` only when no pending crash, crossed transition, expiry,
    eligibility change, notification, due cue, or active event remains.

The operation records visited scheduler facts for the current process. If the
same unresolved scheduler fact repeats without a campaign revision or valid
presentation receipt, return `schedulerCycleDetected`. It cannot loop forever
or silently discard the item.

If the scheduler selects a system command and S04 rejects it, this is not a
normal player rejection. It is `schedulerCommandRejected`, because the
scheduler claimed that the command was eligible. Stop processing.

## Pending crash state machine

Only a completed focused or intense zero-energy push-through creates a pending
crash. The command stores the approved nearby recovery anchor at the time the
push-through completes. Pending crashes cannot stack.

At the next valid safe point, crash resolution occurs before other queued
content. It:

1. clears the pending crash;
2. advances exactly one period;
3. restores energy to `2` for both pressure profiles;
4. records the entered crash period permanently;
5. processes every period boundary and missed monitoring window crossed by the
   crash; and
6. preserves the stored recovery anchor as the player's safe world location.

A push-through is rejected when its guaranteed crash would require period
`64`. The player receives the approved no-cost explanation. No pending crash
is created.

Crash resolution cannot interrupt a command, manual equipment interaction, or
cutscene. It happens at the first later safe point. Monitoring windows crossed
by the crash become missed once, earliest first, without a second player
confirmation. One long action or its crash can miss both oxygen monitoring
windows.

## Monitoring and expiry

Monitoring windows include their final period. Entering the period after a
window closes makes an unresolved window missed. A missed window resolves
once. The scheduler processes multiple missed windows from earliest to latest.

An optional event expires before content opening at the same entered period.
Expiry applies its authored factual result once and removes the event from the
queue. Repeating the safe-point process or reloading cannot reapply expiry.

Required story events remain available until resolved. A terminal campaign can
prevent content that is no longer meaningful, but ordinary deadline passage
cannot erase a required story event.

## Messages, reminders, and notices

Message states are `locked`, `available`, `read`, `replied`, and `expired`. A
reply can imply read. Reading and replying cost no time unless the separate
authored contact is an approved time-costing task. Reading never changes the
calendar by itself.

Available messages remain present until reply or expiry. Closing a message is
deferral, not resolution. Only an approved required task or reminder can block
time-costing work. A routine unread message does not.

The Camila initial-contact path uses exactly one follow-up. If no reply exists,
the follow-up becomes available at the first Week-10 safe point. If no reply
exists at the end of Week 10 after-hours, the thread expires and closes Morrow
once. Reload and repeated safe points cannot send another follow-up or close
the route twice.

Deferring a serious evidence concern schedules one no-cost required reminder.
Correction or an explicit no-response result resolves it. No second reminder
is created.

Closing a notification changes only its presentation state. The underlying
event or task resolves only through its approved rule command or expiry.

## World updates, cues, and room events

After a period change, world-semantic state updates in this order:

1. floor act;
2. time of day;
3. normal character roster;
4. required character overrides;
5. room windows and operational facts; and
6. available cues.

The scheduler then rechecks the scene, location, experiment attention, active
event, terminal state, and required access facts before returning a scene cue.
The cue does not itself start the scene.

An authored room problem activates once, costs no time to appear, and affects
only its related work. Its player response uses `resolveRoomState`. If its
window expires unresolved, the approved fallback applies once. Related
optional content expires first. The Week-14 imaging fallback applies before
**A Reasonable Response** becomes due.

Room problems cannot create a permanent campaign block. Their basic wait or
limited route remains available when a related optional character scene is
absent or expired.

## Fixed campaign chain

### Opening

A new campaign starts at period `0` with only `MR-SCN-CLARIFIED` queued. The
scene's form is locked and the pre-scene checkpoint must save successfully
before presentation starts. **Clarified** is the only scene that starts
automatically rather than through a player-used world or desk cue.

### Mandatory manuscript and submission chain

The fixed causal chain is:

1. complete **Clarified**;
2. complete the early experiment requirements that make **A Complete
   Narrative** due;
3. complete **A Complete Narrative**;
4. commit the initial manuscript draft;
5. complete `MR-TASK-REMOVE-CAUTION`;
6. complete **What We Had**;
7. commit its required follow-up manuscript revision;
8. complete **Public Record** and post the preprint;
9. record the Common Archive receipt;
10. record the _Cosmos_ rejection;
11. record the _Knowledge_ rejection;
12. make Camila's first message eligible;
13. at the first Week-9 safe point, record the _Developmental Systems
    Letters_ rejection and then the `PIIM` receipt;
14. at the first Week-10 safe point, lock the reviewer forms and make
    **Helpful Comments** due;
15. complete the approved reviewer work and make **A Reasonable Response** due
    in Week 14; and
16. resolve `PIIM` once in Week 15 after the response.

Required follow-up work costs remain separate from scene period effects:

| Follow-up work                 | Periods | Energy |
| ------------------------------ | ------: | -----: |
| Initial manuscript draft       |       3 |      2 |
| Remove Caution                 |       1 |      1 |
| What We Had follow-up revision |       1 |      1 |
| Preprint commit                |       1 |      1 |
| PIIM response work             |       3 |      2 |

### Mandatory scene period effects

| Scene                     | Periods | Energy |
| ------------------------- | ------: | -----: |
| **Clarified**             |       0 |      0 |
| **A Complete Narrative**  |       1 |      0 |
| **What We Had**           |       1 |      0 |
| **Public Record**         |       1 |      0 |
| **Helpful Comments**      |       1 |      0 |
| **A Reasonable Response** |       1 |      0 |
| **06:42**                 |       0 |      0 |

Scene and follow-up costs never merge into one hidden charge.

## Fixed late-gate order

The late campaign uses this exact order:

1. entering Week 12 expires an unfinished Aldercroft research plan before any
   new Week-12 content;
2. before the Week-13 Aldercroft check, resolve all Week-12 expiries and any
   scheduled concern reminder;
3. evaluate Aldercroft once, save the result, and then deliver its invitation
   or rejection message;
4. in Week 14, resolve deadlines and the imaging fallback, calculate the three
   `PIIM` response cards, and make **A Reasonable Response** due; an absent
   oxygen result becomes `notMet`;
5. at the first Week-15 safe point after the response, resolve `PIIM` once; a
   withdrawal creates no draw;
6. evaluate Morrow once and deliver Camila's offer or no-offer contact;
7. the Week-15 Camila contact costs one period and zero energy; keeping the
   offer open preserves Morrow, while decline, no offer, or expiry closes it;
8. after Camila's contact or expiry, deliver Elena's one-time private reaction
   to the saved `PIIM` paper state; it costs no time, changes no route or
   relationship, and does not reveal Camila's private contact; and
9. at period `63`, finish a pending crash first, expire optional content, block
   new time costs, calculate final choices, set `choicePending`, and make
   **06:42** due at the exit.

S06 assigns Elena's reaction the stable notification ID
`MR-NOT-ELENA-PIIM-REACTION` with four saved-paper-state forms and authored
text keys. It is a notification, not a scene, replyable message, or one of the
fourteen `MR-CTX` objects.

## Event delivery types

Validated S06 content defines one of three delivery types:

- `automatic`: the scheduler returns one S04 system command;
- `notification`: the scheduler returns one no-time player-facing delivery;
  and
- `scene`: the scheduler returns one world or desk cue and later coordinates
  one active cutscene presentation.

Notifications complete through one approved rule change or one recorded
presentation receipt. Only scene delivery remains an active scheduler event.
At most one cutscene presentation exists.

## Scene eligibility and cue use

A queued scene first becomes due through its authored world or desk cue. Only
**Clarified** bypasses cue use. Required cues block another time-costing action;
optional cues do not.

When the player uses a cue, the application submits `requestScene` for exactly
the active cue's scene. The opening workflow submits the same command for the
initial queued **Clarified** scene. The command cannot start a different
eligible or queued scene. Immediately before start, the scheduler rechecks:

- event and scene lifecycle state;
- cue identity and current location;
- required access and character override;
- active experiment attention;
- absence of another active event; and
- absence of a terminal campaign state.

A normal state change that makes the cue stale returns an existing S04
rejection and changes nothing. A scheduler-selected internal command that its
own state rejects is an S05 fault.

## Pre-scene transaction

`requestScene` is one existing S04 command used in two state-dependent steps.
This preserves the closed command and effect totals while keeping the
checkpoint free of an active cutscene.

Scene preparation and start use this order:

1. the first `requestScene` call validates the current cue or initial
   **Clarified**, selects and locks the approved authored scene form, saves it
   in campaign state, and leaves the scene and event queued;
2. that first applied result emits only `saveCheckpoint` for its resulting
   state revision;
3. the application saves and verifies that exact pre-scene checkpoint;
4. only after success, the application submits `requestScene` again with the
   same scene ID and verified checkpoint revision;
5. the second call revalidates the unchanged queued scene and locked form,
   atomically removes the event from the queue, sets the event `active`, sets
   the scene `inProgress`, and sets the matching active event ID; and
6. that second applied result emits `startCutscene` and the application creates
   the temporary presentation token.

If form selection or checkpoint save fails, the scene does not start. It stays
queued and no presentation token is created. The locked form does not reroll.
Persistence can retry the same exact checkpoint without another campaign
command. A missing, stale, or mismatched checkpoint revision cannot activate
the scene.

## `MR-IF-011` S05 cutscene boundary

The campaign-facing part of `MR-IF-011` is candidate `v1`. S05 owns campaign state,
checkpoint, token, choice, skip, completion, reload, recap, and failure
meaning. S10 now defines the timeline, camera, actor, animation, audio, visual
resource, and full restoration contract. The complete interface is candidate.

### Presentation request

One request contains only:

- scene ID and locked form ID;
- authored timeline and location references;
- approved dialogue, caption, choice, and skip references;
- restoration facts expressed as semantic IDs; and
- one temporary unsaved presentation token.

It contains no rule operation, campaign-state reference, mutable content
object, Three.js object, DOM node, audio node, or save authority.

### Presentation responses

The closed response set is:

- `ready`;
- `choicePoint`;
- `skipRequested`;
- `finished`;
- `cancelled`; and
- `failure` with sanitized typed context.

The presentation layer has no rule authority. It cannot select a choice,
advance campaign time, complete a scene, alter state, or save a checkpoint.
Only a matching current token is accepted.

One cutscene presentation can exist at a time. A duplicate terminal response
for an already resolved token is ignored and recorded only in sanitized
diagnostics. A late response for an old token is ignored. A malformed response,
unknown current token, impossible response order, or response for a different
active scene is `cutsceneProtocolViolation`.

## Control during a scene

While a scene is active, disable:

- player movement and interaction;
- equipment use;
- time-costing work; and
- unrelated campaign commands.

Allow:

- dialogue advance;
- an available authored choice;
- pause;
- settings and accessibility controls;
- captions;
- approved skip behaviour; and
- safe exit.

Pause, browser focus loss, a hidden tab, or a too-small window freezes only
presentation time. It does not advance the campaign, finish a line, select a
choice, or trigger scheduler work.

## Choice and skip state machine

Skip before an unresolved choice fast-forwards presentation only to the next
choice point. It does not submit `skipScene` and cannot choose for the player.

The final choice request uses `chooseSceneOption` and includes the scene ID,
available option ID, and one of:

- `playRemaining`; or
- `skipRemaining`.

The accepted final choice atomically records:

- the choice;
- normal or skipped finish mode;
- complete scene result;
- scene period effect;
- resulting campaign state and history;
- completed or skipped scene and event state;
- cleared active event; and
- the recap key needed after a skipped or interrupted closing.

`skipScene` is valid only when no unresolved choice remains. It applies the
approved no-choice skip result and cannot invent or select a required choice.

Skipped scenes use fixed authored recaps. They do not replay. Skipping has no
different campaign result from making the same authored choice and skipping
only the remaining presentation.

## Scene completion and presentation receipt

The final accepted choice or no-choice skip commits campaign truth before
optional closing dialogue. Its applied result emits `saveCheckpoint`, and the
application verifies that exact post-result state before optional closing
presentation continues. The scene is no longer active even while that closing
presentation remains visible.

Each resolved scene ultimately stores exactly one final presentation state:

- `closingPlayed`; or
- `recapShown`.

The value can remain `null` only between the saved campaign result and its
closing or recap receipt.

If closing presentation finishes, the application records `sceneClosing`
through `recordContentPresentation`. If closing presentation is interrupted
before that receipt exists, the next validated load shows the authored recap
and records `sceneRecap`. It never reopens the choice or reapplies the result.

A skipped scene records its fixed authored recap. A normally completed scene
does not receive a recap when its closing receipt exists.

## Restoration

After scene campaign truth is saved, presentation restores:

- the S08 approved semantic exit anchor and its exact safe physical mapping;
- current world act and time of day;
- camera and visual state;
- UI and caption state;
- scheduler readiness; and
- normal controls.

Pointer or mouse capture always requires a new player confirmation. It cannot
resume automatically after a scene, reload, focus change, or browser prompt.

If restoration fails, campaign control remains disabled. The application
reloads the verified post-scene checkpoint. The saved result remains true and
the authored recap explains the missing closing presentation.

S10 owns the exact camera, actor, audio, animation, rendering, and teardown
steps. S05 fixes only their campaign-safe order and recovery meaning.

## Failure, Save and Quit, and reload

Failure before the result save restores the verified pre-scene checkpoint and
restarts the scene from its locked authored form. No choice or result exists.

Failure after the result save keeps the post-scene result and uses closing or
recap recovery. It cannot undo time, energy, choice, event completion, or other
saved campaign truth.

Save and Quit during an unresolved scene returns to the pre-scene checkpoint.
Save and Quit after result save uses the verified post-scene state. A stored
save cannot contain an active event or `inProgress` scene.

Continue restores the complete saved calendar, world, experiments, rooms,
messages, tasks, event queue, selected scene forms, and presentation receipts
before control returns. Loading never:

- advances time;
- expires content;
- creates a new variation draw;
- chooses a different authored form; or
- reconstructs a partial camera, UI, or cutscene timeline.

After load, the scheduler can resolve a saved pending crash or expose already
eligible queued content without treating load as a period transition. Expiry
occurs only from a real crossed-period history, not because the browser was
closed.

A save with an active event or `inProgress` scene is invalid. Persistence must
offer recovery under S07; it must not guess a partial presentation state.

## Save boundary

A safe save can contain queued events and one pending crash. It cannot contain
an active cutscene or unresolved manual equipment interaction. Save and Quit
stores only a verified safe state.

The pre-scene checkpoint must succeed before a scene starts. The post-result
state must be verified before optional closing presentation can be treated as
recoverable. S07 will define database transactions, backups, and physical
write recovery; S05 defines which campaign states are eligible to save.

## Week 16 and campaign completion

At period `63`, no new time-costing action is accepted. Scheduler processing
first resolves a pending crash that entered the final period, then applies all
final optional expiry, prepares available choices, sets conclusion state
`choicePending`, and makes **06:42** due at the exit.

The final choice uses an irreversible confirmation. It records the chosen
route or deliberate departure, records any declined available alternative,
completes or skips **06:42**, and costs no time.

`finalizeCampaign` has two state-dependent phases:

1. select and save exactly one approved career, paper, integrity, fatigue, and
   relationship module, then set `epilogueInProgress` and request the epilogue;
2. after successful play, approved skip, or recap recovery, mark the epilogue
   and campaign completed and emit the existing `completeCampaign` effect.

The second phase cannot select new modules or redraw a paper result. Repeating
either phase after its saved result is rejected and records no change under
the existing S04 contract.

## Rejection and fault behaviour

A well-formed player request that is not available in the current campaign
state returns the first applicable S04 rejection. It changes no state, time,
energy, revision, history, event, presentation receipt, or variation fact.

The closed S05 fault codes are:

- `schedulerInvariantViolation`;
- `schedulerCycleDetected`;
- `schedulerCommandRejected`;
- `cutsceneProtocolViolation`; and
- `unexpectedSchedulerFailure`.

On one of these faults:

1. stop further scheduler and cutscene processing;
2. keep the last fully validated and accepted campaign state;
3. emit no further scheduler instruction or presentation effect;
4. do not save an uncertain in-memory state;
5. disable campaign controls;
6. show the approved recovery message; and
7. reload the latest verified checkpoint.

The application replaces its current state only after the returned S04 state
passes all connected S03 and S05 post-checks. If the post-check fails, the
proposed state and effects are not published.

An unexpected caught scheduler exception becomes
`unexpectedSchedulerFailure` with sanitized context. Raw state, content text,
save payloads, stack traces, browser paths, and personal data never appear in
player-facing output.

## Required consistency checks

Before processing, after every accepted scheduler command, and after load,
check all of the following without silent repair:

- all scheduler event IDs exist in validated content;
- every event has exactly one valid lifecycle state;
- the queue is unique and contains only queued events;
- at most one active event exists and it is not queued;
- an in-progress scene matches the active event;
- a completed, skipped, or expired scene is not active or queued;
- first-eligible and resolved periods agree with lifecycle state;
- selected scene forms and final presentation receipts exist only for scenes
  that have reached the applicable state;
- `lastSchedulerRevision` is not later than campaign revision;
- permanent event, scene, message, route, and content histories do not move
  backward; and
- conclusion state and **06:42** state agree.

Any conflict returns `schedulerInvariantViolation`. Do not delete, reorder,
infer, or regenerate campaign facts to make the state pass.

## Required S05 fixture groups

S12 must later encode every group below. S05 names the required evidence but
does not claim that a fixture file or passing test exists.

Each fixture contains:

- the complete starting campaign state;
- validated content facts used by the case;
- the trigger or player request;
- every expected scheduler result and accepted S04 command in order;
- the exact final campaign state and presentation receipts;
- all expected revision and history changes; and
- important fields that must remain unchanged.

| Fixture group     | Required coverage                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MR-S05-CAL-001`  | Initial period, all four period labels, inclusive final window, multi-period crossing, expiry before unlock, and period-63 boundary.                                                                                |
| `MR-S05-SCH-001`  | All four triggers, one-step processing, priority order, all tie-breakers, `settled`, no duplicates, and no real-time trigger.                                                                                       |
| `MR-S05-CRS-001`  | Push-through, combined warning, pending crash, period-64 rejection, recovery anchor, missed windows, and both oxygen windows missed.                                                                                |
| `MR-S05-MSG-001`  | Message lifecycle, implied read, close as deferral, Camila follow-up and expiry, concern reminder, and no duplicate reminder.                                                                                       |
| `MR-S05-ROOM-001` | Each authored room activation, related-work scope, optional-content expiry first, fallback once, and Week-14 imaging order.                                                                                         |
| `MR-S05-GATE-001` | Week-12 plan expiry, Week-13 Aldercroft, Week-14 response cards, Week-15 PIIM and Morrow, Elena reaction, and Week-16 final preparation.                                                                            |
| `MR-S05-SCN-001`  | Clarified automatic start, cue start, both `requestScene` steps, form lock, checkpoint success, failure and retry, mismatched revision, active-state invariants, all scene period effects, and separate work costs. |
| `MR-S05-SKP-001`  | Pre-choice skip, final choice with both finish modes, no-choice skip, required-choice protection, fixed recap, and no replay.                                                                                       |
| `MR-S05-REC-001`  | Pause, focus loss, hidden tab, small window, failure before and after save, Save and Quit, Continue, closing receipt, recap receipt, and pointer-capture confirmation.                                              |
| `MR-S05-END-001`  | Period 63, all route combinations, irreversible confirmation, declined alternatives, two-phase finalization, epilogue play, skip, recap, and completion once.                                                       |
| `MR-S05-FLT-001`  | Every S05 fault, normal stale-request rejection, duplicate and late tokens, unchanged-state proof, disabled control, and verified-checkpoint recovery.                                                              |

## Required complete journeys

S12 must include these connected journeys in addition to isolated fixtures:

### `MR-S05-JNY-001` normal mandatory campaign

Start at New Game and continue through the complete manuscript, preprint,
submission, reviewer, response, `PIIM`, Week-15 contact, **06:42**, and epilogue
chain. Prove that every mandatory event occurs once and in order, and that
scene period effects remain separate from follow-up action costs.

### `MR-S05-JNY-002` high-pressure crossing

Use one long approved action that crosses several periods, misses monitoring,
creates a pending crash, expires optional content, and unlocks required
content. Prove the one combined warning, entered-period order, crash priority,
one-time expiry, missed-window order, and stable final queue.

### `MR-S05-JNY-003` late-route matrix

Cover Aldercroft only, Morrow only, both routes, neither route, and deliberate
departure while a route exists. Every case reaches **06:42**, saves the five
ending modules, completes or skips the epilogue, and completes the campaign
exactly once.

S06 supplies final content references. S07 supplies the exact physical
checkpoint, required-save blocking, backup, load, recovery, migration, and
completion transactions plus persistence fixture groups. S09 now supplies the
player-visible UI, input-mode, choice, skip, recap, and interruption fixtures.
S08 supplies the semantic-anchor, world-projection, and focus return contract.
S10 supplies complete presentation fixtures. S12
joins them without weakening this S05 campaign order.

## Interface lifecycle

`MR-IF-005` is candidate `v1` after S05. Its owner, consumers, inputs,
outputs, triggers, failures, invariants, and required fixtures are complete at
the specification level. It is not frozen and does not authorize code. S06
now supplies its authored event, delivery, cue, form, choice, and reference
connection. S07 supplies its persistence specification connection through
candidate `MR-IF-007`; S09 supplies its UI and input connection through
candidate `MR-IF-009` and `MR-IF-010`. S10 supplies its cutscene presentation,
resource, audio, and restoration evidence. S12 later supplies its connected
fixture contract, and S14 completes the audit evidence.

`MR-IF-011` is candidate `v1` through the combined S05 campaign-safe order and
S10 presentation timeline, camera, actor, audio, resource-ownership, and full-
restoration contract. It is not frozen and does not authorize code.

`MR-IF-002` remains candidate `v1` with the approved scheduler-field rename,
event lifecycle facts, and final scene-presentation state. `MR-IF-003` remains
candidate `v1` with clarified scheduler and scene use. Its command total stays
24 and its effect total stays five. At S05 documentation, no interface was
frozen.

## S05 acceptance and handoff

S05 is documented only when:

- this complete calendar, safe-point, crossed-period, crash, event, queue,
  message, reminder, room, scene, interruption, reload, recap, late-gate,
  ending, fault, and fixture contract is present;
- S03 and S04 contain the approved connected refinements;
- numbered design documents contain no contradictory player-visible claim;
- `MR-IF-005` is candidate `v1`; the S05 part of `MR-IF-011` was draft after
  S05 and the complete connected interface is now candidate through S10;
- `MR-IMP-OPEN-005` is resolved and S06 is the durable next block;
- the repository control documents agree; and
- Leonardo's approved documentation is committed.

S06 now defines the exact content-data split, schemas, references, delivery
data, stable IDs, English strings, full/fallback/slice profiles, validation,
and content migration meaning without changing this S05 order. S07 now
defines physical storage and recovery without changing this S05 order. S12 now
supplies the future fixture, journey, and acceptance contract without changing
the scheduler order.

## S14 audit record

The S14 cross-interface and contradiction audit is complete. Every shared
interface defined or connected by this specification is frozen `v1` through
the interface register and `specification-audit.md`. Earlier candidate-state
statements preserve the interface lifecycle before S14; they are not the
current state. No executable fixture or measured result exists. Gate 1 is
ready for Leonardo's separate approval, and no implementation is authorized.
