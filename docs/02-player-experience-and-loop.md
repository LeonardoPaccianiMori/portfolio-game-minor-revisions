# Player Experience and Core Loop

Status: **approved through B08; authored content and runtime work deferred**

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

The semester has 64 work periods: four in each of the 16 weeks. The named
periods are early, late, night, and after-hours. A period represents compressed
working time, not a literal calendar day. Work, story events, and controlled
time passages advance this calendar. Walking, reading, and ordinary dialogue
use no period. A meaningful action costs one, two, or three periods, and shows
that cost before the player commits.

Experiments update first when an action enters a new period. A due message or
scene then waits for the next safe stopping point. In the final Week 16
after-hours period, the clock returns to 06:42 and the exit scene begins. The
player cannot spend additional time after that point.

Early and late periods are normal work time. Night and after-hours periods
allow laboratory and desk work, but increase energy cost and reduce access to
people and shared services. Exact character and facility schedules are in
`06-world-and-level-design.md`.

Important messages wait until an active experiment reaches a safe stopping
point. They do not interrupt the player without warning or disappear because
the player is using equipment.

## Energy, pressure, and recovery

Energy has five visible segments. Standard profile starts at four segments;
Supported profile starts at five. It represents work capacity, not literal
sleep deprivation.

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

Night and after-hours add one energy segment to focused or intense work in the
Standard profile. A protected break costs one period. The first protected break
in a week restores two segments; later breaks restore one. In Supported
profile, protected breaks restore three segments and late work has no added
energy cost.

At zero energy, the player can push through one focused or intense task. At
its next safe point, the protagonist has an involuntary crash at the desk,
break room, or laboratory. The crash advances one further work period, restores
two energy segments, and resolves any monitoring window passed during it as
missed. It can damage evidence, lose an optional opportunity, or close a route.
It cannot begin during a manual equipment action or cutscene. There is no home
scene, voluntary sleep action, or global game-over screen before Week 16.

Standard is the intended survival-game profile. Supported keeps the calendar,
narrative, routes, and ending content unchanged, but adds clearer warnings and
more time tolerance. It has no stigma or content penalty.

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

B07 places the sample bench and experiment setup station in the main
laboratory, the active sample rack in tissue culture, the imaging and
monitoring bay in the imaging room, and the analysis workstation and manuscript
desk in shared desks. The player can read status at the desk but must visit the
physical room for meaningful monitoring or equipment work. The shortest work
loop is PI office, shared desks, main laboratory, tissue culture, then PI
office. Its stations are close enough to support repeated first-person travel,
but far enough apart that a queue, a colleague, or a changed room state can
become meaningful.

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

## Workload and soft failure

The desk shows at most two high-priority required requests and three optional
requests at one time. Active sample groups use their separate work queue.
Mandatory beats use the fixed weekly calendar. Weak work changes the available
paper path; it does not delay the calendar.

There is no free emergency catch-up resource. At a fixed gate, unfinished work
opens a stated lower-evidence route: repeat later, narrow the claim, accept a
weak packet, or withdraw. Optional work can expire, but the game records the
lost opportunity clearly. Serious setbacks, including a crash, weak evidence,
damaged relationships, or a closed route, never stop the campaign before the
Week 16 conclusion.

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
time does not pass while the game is closed. B09 owns the persistence
implementation.

## Other play modes

- The manuscript is managed through an interactive revision board, not a
  simulated word processor. Sections, figures, claims, and supplementary items
  respond to contradictory requests and retain visible revision history.
- Dialogue and action choices express priorities, integrity, relationships,
  and coping style without constructing wholly different protagonists.
- Email, notices, and environmental changes convey the wider institution.
- Real-time in-engine cutscenes may temporarily control input and camera, then
  restore play or present a choice.
- Mandatory and optional narrative scenes plus the ending epilogue use the
  22-minute maximum for all non-interactive scenes. Main scenes target 14–18
  minutes; each ending uses a 60–90-second epilogue. They remain skippable,
  captioned, and safe around checkpoints.

## B08 interaction and access contract

The release targets desktop and laptop browsers with keyboard-mouse and
standard-controller support. The default keyboard map uses WASD or arrows to
move, mouse to look, E to interact, Tab for Research Status, and Escape to
pause or go back. The controller has equivalent move, look, confirm, view, and
menu roles. Core actions support both input systems, and settings provide
remapping, look sensitivity, inversion, field of view, and reduced motion.

The quiet permanent HUD shows week, work period, and energy at upper left; a
valid interaction prompt at lower centre; and quiet safe-message indicators at
upper right. Research Status is a readable quick panel for state, trust bars,
route feedback, and stated changes. It does not expose hidden formulas or
cover required subtitles or confirmations. The player sees an action, its time
cost, and its energy cost before commitment. A station view stops movement but
only a confirmed task advances time.

Captions and speaker names default on. Required state and science information
uses text, icons, colour, sound, or object state in at least two ways.
Focused views never require dragging, holding, timed input, or precise motor
actions. Interaction Assist can briefly highlight usable objects in the current
room, without adding a path, objective arrow, or minimap. The Week-1 opening
uses dismissible contextual prompts; Help and Controls remain available at no
game-time cost.

One active local IndexedDB save preserves progress at approved safe points.
The game uses no account, server save, save cookie, or automatic unfinished-save
expiration. Completion removes the full active state and adds a compact ending
card to the local Archive. The archive keeps the 12 most recent ending cards
and the persistent Institutional Citation record.

## Deferred decisions

- B07 room placement, layout, and navigation paths are documented in
  docs/06-world-and-level-design.md.
- Exact authored experiment baselines and content counts belong to B10.
- Save schema, corruption recovery, exact browser matrix, and UI runtime
  implementation belong to B09.
- Exact tutorial text, authored experiment instances, and replay content
  belong to B10.
