# Player Experience and Core Loop

Status: **approved through B04; numerical balance and full UI work deferred**

## Perspective and interaction

The player explores freely in first person. Persistent animated hands are not
required. Equipment responds through object animation, sound, and interface
feedback. Selective hand animation is a later playtest-driven option, not a
dependency.

The player uses one context-sensitive interaction action. When a relevant
object is nearby and targeted, it receives a small visual highlight and a
short label. The player can then enter a focused station view. The game does
not put permanent arrows or labels on every object.

Laboratory play uses medium abstraction. The player physically moves among
samples, equipment, the desk, and characters, but the meaningful challenge is
choosing what to do, what evidence to trust, and what cost to accept. Focused
work uses clear selections rather than physical simulation of laboratory tools.

## Campaign time and continuity

The narrative covers a 16-week final semester. The player stays on the
Bellwether University research floor through a continuous day-and-night work
loop. There is no home scene, sleep action, or automatic daily reset. The
changing light, empty rooms, instrument runs, messages, and character presence
show the passing day and night.

Work, story events, and controlled time passages advance the compressed
calendar. A player may later use a short local break, but it cannot function as
a full recovery or a substitute for sleep. B05 owns the exact time costs,
energy effects, detailed pause behaviour, and scheduling rules.

Important messages wait until an active experiment reaches a safe stopping
point. They do not interrupt the player without warning or disappear because
the player is using equipment.

## Recurring five-stage experiment loop

1. **Select sample group:** choose one labelled sample group for an approved
   research goal. At most three groups can be active at one time.
2. **Configure:** select the goal, control quality, and observation focus:
   structure, rhythm, or both. An authored experiment can add one
   family-specific fictional choice.
3. **Start and run:** start the work at the setup station. The group becomes
   active while the player performs other work.
4. **Monitor:** travel to the relevant station at a meaningful monitoring
   point. Continue as planned, spend attention on a quality check or
   stabilizing action, or stop the experiment.
5. **Analyse and interpret:** use the analysis workstation to compare the
   evidence views, classify the result, record caveats, and create an evidence
   card for later manuscript work.

The player does not discover a real laboratory protocol. The first
laser-and-sham task is guided by Elena or Gabriel. Later tasks can use an
in-world project notebook that explains the current request, known evidence,
and open scientific question. The notebook is not a quest-marker system.

## Confirmed outcome principles

- Experiments run asynchronously; waiting creates competing decisions rather
  than dead time.
- Outcomes depend on sample health and history, preparation, equipment
  condition, monitoring and intervention, biological variability, and rushed
  or skipped controls.
- Outcomes are not purely random. The player must be able to learn causal
  patterns even when information is incomplete.
- Failure should normally reveal information, force a trade-off, alter a
  relationship, or advance the narrative rather than only erase progress.
- A successful result can create additional demands rather than simple relief.

## Scientific feedback model

Each experiment reports two separate layers:

- **Biological result:** complete recovery, partial recovery, failed recovery,
  or unreliable result.
- **Evidence quality:** usable, inconclusive, suspicious, or worth repeating.

The player reads three simple evidence views: tissue structure, rhythm, and the
repatterning index. These views show clear states such as strong, unclear,
mixed, or failed. The player can learn causal patterns from these views without
reading raw biological data.

The manuscript board offers careful, strong, and inflated claims about the
repair state. Claim choice changes integrity, PI confidence, and later reviewer
pressure.

## Station, sample, and feedback rules

The laboratory has six functional locations: a sample bench, experiment setup
station, active sample rack, imaging and monitoring bay, analysis workstation,
and manuscript desk. B07 decides their exact rooms and layout.

The active rack gives each group a physical label and a simple state signal.
The desk work queue repeats the state in words, such as running, check ready,
attention needed, or ready for analysis. The queue informs the player but
cannot control equipment remotely. Meaningful inspection and intervention
require a visit to the station.

An active group occupies one of the three slots from preparation through final
analysis. Final archiving frees the slot. The raw result remains in the
laboratory record, but the physical group cannot be reused for a different
experiment. Cancelling an active experiment loses that group and the game time
already spent.

Before a meaningful action, the game gives a short plain-language forecast of
the likely trade-off. After the result, it records what is observed separately
from what is inferred. An action-caused effect is explained when the evidence
supports that explanation. Poor results always provide useful information, a
clear reason to repeat, or a lower-quality route forward. Mandatory progress
never requires a perfect result.

Equipment queues, faults, and access limits are authored situations. They give
clear choices to wait, negotiate, ask Gabriel for help, use a limited
alternative, or change the experiment plan. They are not random barriers.

## Interruptions, recovery, and continuity

Important messages first appear as world signals, then as safe queue
notifications, then as an optional response or scene. Non-critical messages
can be deferred. A scene never begins while an equipment action needs player
attention, and every deadline is stated clearly.

A monitoring window remains available until the player deliberately advances
game time after a clear warning. Advancing past it can produce a weaker or less
reliable result. Menus, pause, and browser closure never cause a missed check.
The game saves at safe states, including experiment-stage changes, monitoring
choices, analysis archiving, manuscript commits, and scene boundaries. Game
time does not pass while the game is closed. B05 owns time costs and B09 owns
the persistence implementation.

## Other play modes

- The manuscript is managed through an interactive revision board, not a
  simulated word processor. Sections, figures, claims, and supplementary items
  respond to contradictory requests and retain visible revision history.
- Dialogue and action choices express priorities, integrity, relationships,
  and coping style without constructing wholly different protagonists.
- Email, notices, and environmental changes convey the wider institution.
- Real-time in-engine cutscenes may temporarily control input and camera, then
  restore play or present a choice.
- Mandatory and optional narrative scenes use the B03 time budget: a 15–20
  minute target and a 22-minute maximum for all non-interactive scenes. They
  remain skippable, captioned, and safe around checkpoints.

## Deferred decisions

- Exact movement bindings, interaction range, HUD composition, and detailed
  control map belong to B08.
- Semester-to-real-time conversion, pausing rules, time costs, short-break
  effects, difficulty, and scheduling values belong to B05.
- Exact room placement, layout, and navigation paths belong to B07.
- Outcome formulas, variability, and repeat costs belong to B05.
- Save schema, corruption recovery, and browser support belong to B09.
- Exact tutorial text, authored experiment instances, and replay content
  belong to B10.
