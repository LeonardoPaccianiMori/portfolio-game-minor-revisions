# Player Experience and Core Loop

Status: **B10 documented; implementation approval pending**

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
Standard profile. `MR-ACT-BREAK` is a protected break. It costs one period and
no energy. Every Standard break restores two segments, and every Supported
break restores three, up to the five-segment limit. Breaks are not capped per
week.

At zero energy, the player can push through one focused or intense task. At
its next safe point, the protagonist has an involuntary crash at the desk,
break room, or laboratory. The crash advances one further work period, restores
two energy segments, and resolves any monitoring window passed during it as
missed. It can damage evidence, lose an optional opportunity, or close a route.
It cannot begin during a manual equipment action or cutscene. There is no home
scene, voluntary sleep action, or global game-over screen before Week 16.

Standard is the intended survival-game profile. Supported starts with one more
energy segment, restores one more segment per protected break, and removes the
night and after-hours energy surcharge. It therefore changes the pressure
structure as well as its tolerance. It keeps the calendar, narrative, routes,
ending content, period costs, deadlines, and warnings unchanged. All players receive
the same clear warning before a gate, expiry, missed monitoring window, or
irreversible choice. Supported has no stigma or content penalty.

## Recurring five-stage experiment loop

1. **Select sample group:** choose one labelled sample group for an approved
   research goal. At most three groups can be active at one time.
2. **Configure:** select the goal, matched or limited control quality, and an
   observation focus: structure, rhythm, or paired observation. Each template
   also gives one qualitative family-specific choice. Paired observation is
   not a free best option: it needs the quality-check monitoring action to
   produce full paired coverage.
3. **Start and run:** start the work at the setup station. The group becomes
   active while the player performs other work.
4. **Monitor:** travel to the relevant station at a meaningful monitoring
   point. Every run has one monitoring window, except oxygen-loss work, which
   has two. Inspect the current projected preparation band and its reasons,
   then continue, spend attention on a quality check or stabilizing action, or
   stop the experiment.
5. **Analyse and interpret:** use the analysis workstation to inspect the raw
   observations before any interpretation. Select one primary reading and at
   least one relevant caveat, then create an evidence card for later manuscript
   work.

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

Each experiment reports two separate layers. A sample condition can show
complete, partial, failed, or unreliable biological recovery. A complete
template record then summarizes its evidence as strong, limited, or weak.

- **Biological result:** complete recovery, partial recovery, failed recovery,
  or unreliable result.
- **Evidence quality:** usable, inconclusive, suspicious, or worth repeating.

The evidence-quality labels have fixed meanings:

- **Usable:** the valid record supports the stated conclusion.
- **Inconclusive:** the valid record does not answer the stated question.
- **Worth repeating:** a clear, recoverable process issue limits the record and
  one permitted repeat remains.
- **Suspicious:** the raw record contains an unexplained internal mismatch.
  This label does not by itself mean that the player or a character committed
  misconduct.

The player reads three simple evidence views: tissue structure, rhythm, and the
repatterning index. These views show clear states such as strong, unclear,
mixed, or failed. The analysis view shows observations before the system asks
for a reading. The player chooses the primary reading and a relevant caveat;
the system stores both. Limited results can support disagreement between the
views. The game does not show exact probabilities or real biological data.

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
Its focused view lets the player select one of the three physical tray
positions, read its sample condition and next window, and confirm a tray
action. The tray remains visible while the panel is open. This is selection
and confirmation, not a dexterity task.
The desk work queue repeats the state in words, such as running, check ready,
attention needed, or ready for analysis. The queue informs the player but
cannot control equipment remotely. Meaningful inspection and intervention
require a visit to the station.

The imaging bay focused view lets the player switch among structure, rhythm,
and repatterning views and record an observation. Switching views costs no
time. Only a confirmed monitoring or analysis action advances time. There are
no hidden correct clicks, timed targets, or dexterity tests.

An active group occupies one of the three slots from preparation through final
analysis. Final archiving frees the slot. A stop confirmation frees the slot
immediately, loses the current sample and its elapsed work, preserves earlier
archived records, and creates only a stop log for the current run. It also
names any opportunity that will expire before a replacement can finish.
Stopping is therefore a visible triage choice when a slot, later monitoring
burden, or expiring task is more valuable than the current run.

Before a meaningful action, the game gives a short plain-language forecast of
the likely trade-off. After the result, it records what is observed separately
from what is inferred. An action-caused effect is explained when the evidence
supports that explanation. Poor results always provide useful information, a
clear reason to repeat, or a lower-quality route forward. Mandatory progress
never requires a perfect result.

Equipment queues, faults, and access limits use only the authored room states
in `06-world-and-level-design.md` and `12-content-specification.md`. Every
operational state gives at least two clear routes with different time,
relationship, or evidence costs. They are not random barriers.

## Workload and soft failure

The desk shows at most two high-priority required requests and three optional
items at one time. Every optional item must name a defined character, career,
wording, or room-state event. There are no uncatalogued optional PI requests.
Active sample groups use their separate work queue.
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
time does not pass while the game is closed. The B09 persistence contract is
defined in `11-technical-architecture.md`.

## Other play modes

The manuscript is managed through an interactive revision board, not a
simulated word processor. It has one claim slot, three figure slots with one
linked evidence card each, two control slots, one selected caveat strip, one
authorship slot, one supplementary slot, and one active-request slot. Unused
slots stay visible.

The player selects a claim, connects available cards, selects a caveat from an
included evidence card, resolves authorship where needed, and reviews the
requirements panel. Careful needs one supported figure/evidence pair, one
relevant control, and one caveat. Strong needs two supported pairs from
different templates, structure and rhythm coverage, one matched control, and
one caveat. Inflated adds a causal-support requirement that honest campaign
evidence cannot fill.

The requirements panel uses factual states: met, missing, conflict, or
unsupported. It never calls a choice correct, wrong, good, or bad. The player
can commit with unmet requirements. A commit stores the complete arrangement,
requirements state, reported readings, omissions, authorship, and current
request. Earlier snapshots remain readable but are not free undo.

- Sections, figures, claims, and supplementary items respond to contradictory
  requests and retain visible revision history.
- Dialogue and action choices express priorities, integrity, relationships,
  and coping style without constructing wholly different protagonists.
- Email, notices, and environmental changes convey the wider institution.
- Real-time in-engine cutscenes may temporarily control input and camera, then
  restore play or present a choice.
- Mandatory and optional narrative scenes plus the ending epilogue use the
  22-minute maximum for all non-interactive scenes. The seven main scenes
  together target 14–18 minutes; each ending uses a 60–90-second epilogue. They remain skippable,
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

## B10 authored action-cost contract

The following costs apply in Standard profile. Supported keeps the same period
costs and uses its approved energy adjustments.

| Authored action | Periods | Standard energy | Notes |
|---|---:|---:|---|
| Select and configure a sample group | 1 | 1 | One focused setup action. |
| Start laser/sham, repair-state, or drug work | 1 | 1 | One focused start action. |
| Start range, batch, oxygen-loss, or repeat work | 2 | 2 | One intense start action. |
| Routine monitor or stop | 1 | 0 | A light deliberate check. |
| Quality-check or stabilizing monitor | 1 | 1 | A focused monitoring choice. |
| Analyse and create an evidence card | 1 | 1 | One focused analysis action. |
| Report a completed request to Elena | 1 | 0 | A light desk action. |
| Initial manuscript draft | 3 | 2 | The single rare major commitment. |
| PI revision or preprint commit | 1 | 1 | One focused board action. |
| `PIIM` response commit | 3 | 2 | A rare major commitment. |
| Five-year research plan or Morrow video call | 1 | 1 | One focused career action. |
| Morrow reply or optional local character scene | 1 | 0 | A light relationship action. |
| Wait for an authored room response | 1 | 0 | Clears a stated room-state delay; it never creates evidence by itself. |
| Protected break | 1 | 0 | Restores two energy in Standard or three in Supported. |

The five middle mandatory scenes—**A Complete Narrative**, **What We Had**,
**Public Record**, **Helpful Comments**, and **A Reasonable Response**—advance
one work period when they end, but cost no energy. **Clarified** and **06:42**
have no separate period cost. This lets the fixed calendar advance through
story events without charging dialogue as ordinary work.

The content catalogue assigns these costs to every authored action. No later
agent may add a new time-costing action class without a requirement change.
The R01 paper audit in `07-systems-and-balance.md` enumerates every action used
by the minimum-defensible, thorough-honest, and maximizing demand fixtures.

## B10 content and implementation boundary

`12-content-specification.md` contains the exact tutorial, experiment,
manuscript, and replay content. `11-technical-architecture.md` contains the
save and browser boundary. Measured implementation evidence remains future
evidence and does not alter this approved loop without a recorded decision.
