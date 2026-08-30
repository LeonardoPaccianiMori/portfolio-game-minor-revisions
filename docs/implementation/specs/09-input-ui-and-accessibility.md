# S09 — Input, UI, and Accessibility

Status: **documented technical specification; no implementation authorized**

This specification fixes the device-independent action map, keyboard, mouse,
and controller behaviour, pointer capture, input modes, screen inventory,
interface navigation, settings, responsive layout, accessibility acceptance,
player-facing persistence failures, UI lifecycle, and required future fixtures
for *Minor Revisions*.

S02 owns application order, lifecycle, and failure boundaries. S03–S06 own
campaign truth, rules, scheduling, and authored text. S07 owns local storage and
returns only its nine approved failure categories. S08 owns movement, target,
and focused-view geometry. S09 converts physical input into plain actions and
presents read-only player-visible facts. It cannot change campaign truth.

S10 now owns rendered presentation and audio resources. S11 now owns exact
browser capability results, graphics values, local performance advice,
sanitized diagnostics, and measured-performance limits. S12 will encode the
fixtures named here. S14 will audit and freeze connected interfaces.

Nothing in S09 creates game code, package configuration, runtime UI, tests,
production assets, a licence, a remote, deployment, or implementation
permission.

## Terms

- A **game action** is a named function that can use different physical keys
  or buttons.
- **Pointer capture** means that the browser hides the cursor and uses mouse
  movement to control the camera.
- A **dead zone** is the small area near the centre of a controller stick that
  ignores accidental movement.
- A **UI projection** is a complete read-only packet that contains only what
  the current interface can show.
- A **semantic control** is a normal browser control with a meaningful name,
  role, value, and state.
- A **fixture** is a fixed input and expected result that S12 will later encode
  as an executable test.

## Closed action map

The complete player action families are:

- Move;
- Look;
- UI Navigate;
- Primary Action;
- Back/Pause;
- Research Status;
- Previous Panel;
- Next Panel; and
- Interaction Assist.

Primary Action interacts during free movement and confirms or advances in an
interface. Back closes the current safe interface first. It opens Pause only
when no closable interface is open. One physical input cannot affect two
interface layers. Scene skipping is an explicit Pause-menu command, not a
hidden extra action.

### Default bindings

| Action | Keyboard and mouse | Controller |
|---|---|---|
| Move | `WASD` or arrow keys | Left stick |
| Look | Mouse movement | Right stick |
| UI Navigate | Arrow keys; `Tab` and `Shift+Tab` move between controls | Directional pad |
| Primary Action | `E` to interact; `Enter` or `Space` to confirm | South face button |
| Back/Pause | `Escape` | Menu button |
| Research Status | `Tab` | View button |
| Previous Panel | `Q` | Left shoulder button |
| Next Panel | `R` | Right shoulder button |
| Interaction Assist | `F` | West face button |

Mouse clicks can use visible interface controls. The same action meaning is
used on each device.

## Device conversion and active device

Movement and looking are continuous values read once per visual frame.
Interact, Confirm, Back, Research Status, panel changes, and Interaction Assist
are single-press actions sent through the ordered application path. No key,
button, mouse event, browser object, or DOM node crosses into player or rules
logic.

Prompts use the last device that gave meaningful input. Small stick drift
cannot select a controller or change prompts. The first connected standard
controller that gives meaningful input becomes active. Another controller can
become active after a deliberate button press when no action is pending.
Disconnection clears all controller values and returns prompts to keyboard and
mouse until another deliberate controller input occurs.

Use detected Xbox-style, PlayStation-style, or generic labels only when the
mapping is reliable. Otherwise use neutral text such as **Confirm Button**,
**View Button**, and **Menu Button**. Controls always shows the active mapping
in text.

The first release requires no vibration, adaptive trigger, touchpad gesture,
motion control, controller audio, or platform-specific feature. No required
meaning depends on one.

### Stick and look values

Controller movement uses a circular `0.18` dead zone. Controller look uses a
circular `0.15` dead zone. After the dead zone, input rises smoothly and
linearly to full strength at `0.95`. Partial movement produces partial walking
speed.

Directional interface navigation activates at `0.60` and must return below
`0.40` before an opposite direction can activate. It waits `0.35 seconds`
before repeat and then repeats every `0.10 seconds`.

Mouse look defaults to `0.12°` per reported mouse unit. Its range is
`0.04°–0.40°` in `0.01°` steps. Horizontal and vertical look use the same
value. There is no added smoothing or acceleration.

Controller look defaults to `180°/s` horizontally and `120°/s` vertically. One
sensitivity value from `0.50×` to `2.00×` changes both values together. Mouse
and controller vertical inversion are separate and off by default.

## Input modes and priority

Input has exactly five modes:

| Mode | Permitted input |
|---|---|
| Disabled | No player action. |
| Free Movement | Move, Look, Primary Action, Research Status, Back/Pause, and Interaction Assist. |
| Focused Interface | Interface navigation, Primary Action, Back, and approved panel changes. |
| Overlay Interface | Interface navigation, Primary Action, Back when permitted, and approved shortcuts. |
| Cutscene | Advance, choice navigation, Pause, and approved skip handling. |

A mode change clears held keys and buttons, controller-stick values, repeat
timers, and pending movement before the new mode accepts input. Failure keeps
input Disabled and uses the approved technical-error path.

Confirm, Back, Research Status, and Interaction Assist activate once per
press. Holding them does not repeat. Mode changes, hidden tabs, controller
disconnection, and browser-focus loss clear all held input.

Only one main interface can be active, with at most one required confirmation
above it. Priority from highest to lowest is:

1. fatal error or unsafe window size;
2. required confirmation or choice;
3. cutscene;
4. Pause;
5. focused station;
6. Research Status; and
7. free movement.

Lower layers receive no input. A required choice cannot be closed or bypassed
with Back.

## Pointer capture and safe return

Pointer capture is active only during free keyboard-and-mouse movement. It is
released for focused stations, Research Status, menus, dialogue choices,
cutscenes, confirmations, blocked browser views, fullscreen changes, hidden
tabs, and loss of browser focus.

The game requests pointer capture only after a clear player click. It never
captures the mouse automatically. If the browser refuses or releases capture,
movement becomes zero and a Resume message appears. Mouse users click Resume.
Controller users press Primary Action and return without mouse capture.

After a menu, focused view, cutscene, reload, hidden tab, or browser-focus
loss, movement and look start from zero. Browser interruption never advances
campaign time.

## Remapping

Keyboard-and-mouse and controller bindings are saved separately as global
settings. Changes apply immediately. Controls contains separate **Keyboard and
Mouse** and **Controller** panels, **Test Bindings**, and **Restore Defaults**.

Each binding row shows the action, current binding, and **Change**. Change
opens a listening state that accepts one valid input or Cancel. The input that
opened this state cannot become the new binding.

Keyboard movement directions and all discrete actions can use one keyboard
key. Discrete actions can also use supported mouse buttons. Modifier-only
keys, operating-system combinations, browser reload or fullscreen keys, and
unidentified inputs are invalid. Controller sticks remain Move and Look. The
directional pad remains UI Navigate. Other controller actions can use ordinary
buttons. Guide and system buttons are invalid.

One physical input cannot perform two actions in the same context. A conflict
offers **Swap** or **Cancel** and never replaces a binding silently. Each
device must retain complete Move, Look, Primary Action, Back/Pause, UI
Navigate, and Research Status control. The player cannot leave with an
incomplete map.

Test Bindings causes no campaign action. Leaving waits for the settings-save
result or states that the new map is active only for the current session.

## Free-movement display

A small static centre dot appears by default during free movement. It has a
high-contrast outline and no animation. It disappears during menus, focused
views, dialogue, and cutscenes. Display can turn it off. It never shows an
objective or hidden target.

The lower-centre interaction prompt shows:

- the selected object's short label;
- the available action;
- the current key or controller button; and
- any time or energy cost.

A free action says **No time or energy cost**. The prompt disappears when the
target is blocked, out of range, or inactive. A glance-only environmental item
replaces the prompt with its complete line and shows no button or action.

One Interaction Assist press highlights visible usable objects in the current
semantic room for `2.5 seconds`. A second press restarts the time. It shows
outlines and short labels only. It shows no route, arrow, minimap, distance, or
off-screen marker. It excludes inactive targets and all ten glance-only items.
Required progress never depends on it.

The normal upper-left display shows `Week number · named work period` and an
Energy row with five segments plus text such as `Energy: 3 of 5`. Filled and
empty segments differ by shape and contrast, not colour alone. It shows no
formula, hidden threshold, objective list, or completion percentage.

The upper-right display shows unread messages and recent status updates. The
unread count is accessible and is visually capped at `9+`. One short temporary
line can appear for `4 seconds`. Full reasons, deadlines, and costs remain in
Inbox or Research Status. Sound is optional and never the only notice.

Required confirmations, dialogue choices, and captions have priority over the
normal display. Prompts and temporary lines hide when they would overlap
required text. The week, period, and energy display can hide during a cutscene
or full-screen interface.

## Research Status

Research Status has exactly **Overview**, **Research**, **People**, and
**Routes**.

- Overview shows week, work period, energy, fixed pressure profile, current
  paper state, and known deadlines.
- Research shows evidence status, Elena's paper confidence, Integrity, and
  factual reasons for changes.
- People shows the five visible working-trust estimates.
- Routes shows current non-spoiling Morrow and Aldercroft feedback.

It uses descriptive states, approved five-segment displays, and plain reasons.
It never shows an internal `0–100` value, formula, hidden flag, hidden route
condition, secret-condition count, objective checklist, or total completion
percentage. A known failed or closed condition remains visible with its reason.

Evidence uses **Thin**, **Developing**, **Coherent**, or **Substantial**.
Elena's paper confidence uses **Cautious**, **Conditional**, **Supportive**, or
**Invested**. Integrity uses zero to five segments and factual warnings, with
no moral label. It keeps known omissions, changed or unsupported readings, and
corrections visible. A later improvement cannot hide a permanent action.

Each visible person has five segments and **Damaged**, **Strained**,
**Working**, **Trusted**, or **Strong**, plus the latest factual reason. Camila
appears only after her Week-8 introduction. Numeric trust values and hidden
support conditions never appear.

A route is absent until introduced. Its visible state is **Developing**,
**Available**, **Closed**, **Chosen**, or **Declined**. The panel shows only
known requirements in factual sentences, known deadlines by week and period,
and permanent results. It shows no checklist, percentage, hidden count, or
unknown question mark.

Research Status opens from free movement or Pause at no campaign cost. It
cannot open above a required choice, confirmation, cutscene, or focused
station. Its information can update without changing the selected section.
Closing returns to the prior safe state with zero movement and the normal
Resume rule.

## Closed screen inventory

The UI projection can select only these main states:

- startup and compatibility;
- main menu;
- content note and New Game;
- Continue recovery, migration, and unusable-campaign discard;
- Archive and Archive repair;
- Settings, Accessibility, Help, and Controls;
- Credits/Licences;
- free-movement HUD;
- Research Status;
- shared-desk hub;
- focused stations and focused environmental reading;
- dialogue and cutscene choice;
- Pause;
- confirmation;
- too-small-view block;
- save or storage failure; and
- fatal error.

One main state and one permitted confirmation can exist. Required text appears
immediately with no typewriter effect. Long reports, messages, credits, and
summaries use headings and vertical scrolling. Selection and scroll position
remain while the screen stays open. Reading never advances campaign time,
deadlines, monitoring windows, or choices.

## Startup, main menu, and campaign entry

Startup shows the title and one factual stage: **Checking browser**, **Loading
content**, **Opening local data**, **Preparing game**, or **Ready**. It shows no
invented percentage or early success animation. Menu controls stay unavailable
until required work succeeds.

A missing required browser capability shows one blocking screen with every
missing capability, the exact S11 plain reason, the fact that campaign data did
not change, **Retry Check**, and safe browser guidance. Missing controller
support uses the exact non-blocking S11 keyboard-and-mouse message. Muted or
unavailable audio keeps required text and visual meaning. A required player
action for audio or pointer capture is not a campaign action.

After a valid start, suspended or unavailable audio shows one small semantic
**Audio paused** status message. When the browser can resume audio, it includes
one clear **Resume Audio** action. It is not a campaign action, does not change
story timing, and does not remove captions or visible cues. The message closes
when audio resumes or when audio is no longer available to resume.

The main menu order is **Continue**, **New Game**, **Archive**, **Settings**,
**Accessibility**, and **Credits/Licences**. Continue remains visible but is
disabled with **No active campaign** when no usable campaign exists. Archive
has a clear empty state. A browser game has no Quit button.

Before the first New Game in a browser database, the content note names
academic pressure, burnout, insecure work, and ethical pressure around
research records. **Continue** records acknowledgement in settings. **Back**
creates no campaign. Accessibility keeps permanent access to the note.

New Game uses one form for protagonist name, pronouns, and pressure profile,
then a review and confirmation. The name follows the approved 1–64-character
rules. Standard pressure is selected by default. Supported is not called easy.
If an active campaign exists, confirmation states that New Game replaces the
active campaign and backup. Invalid fields disable confirmation and show a
specific reason.

Continue loads only valid active data. A required one-way migration opens its
confirmation. If active data is unusable and backup is valid, Continue opens
the recovery offer and never selects it automatically. If neither is usable,
discard is separate. Archive repair and whole-database clearing never appear
inside ordinary Continue.

## Pause and leaving a campaign

From free movement, Pause shows **Resume**, **Research Status**, **Settings**,
**Accessibility**, **Save and Quit**, and **Main Menu**. Movement and look stop
immediately. Child screens return to Pause with Back. Pausing costs no campaign
time. The Accessibility child screen contains the approved Help and Controls
content, so it remains available from Pause without adding another main Pause
item.

Save and Quit requests the approved safe save, blocks repeated input, and shows
progress. Success closes the campaign and returns to the main menu. Failure
keeps Pause open and offers Retry or Cancel. It never claims success before
storage confirms it.

Main Menu requires confirmation and states that Continue will use the last
verified save. It creates no new save and is unavailable during a save or
campaign transition. A later load uses the approved recovery anchor, not the
last temporary walking or camera position.

## Settings record and screens

Settings has **Audio**, **Display**, **Controls**, **Accessibility**, and
**Local Data**. Reversible changes preview immediately and use one ordered
settings-save queue. A failed save keeps the value for the current session,
preserves the previous stored settings, and shows **Retry Saving**.

Audio, Display, Controls, and Accessibility each have **Restore Section
Defaults** with a confirmation that lists the changes. Local Data has no
restore command. Settings never change campaign facts, pressure profile,
Departures, Citations, or progress.

The complete settings schema version is `1`. It contains only:

- Master, Music, Ambience/Effects, and Dialogue Sounds levels;
- Low, Standard, or High graphics profile, field of view, and centre reticle;
- separate keyboard-and-mouse and controller bindings;
- mouse sensitivity, controller sensitivity, and two vertical-inversion
  choices;
- Text Scale, Interface Scale, High Contrast, Sound Captions, Speaker Names,
  Head Bob, Camera Shake, Reduced Motion, Reduced Flashes, and Interaction
  Assist; and
- content-note acknowledgement.

Fullscreen state, active device, pointer capture, selected screen, campaign
facts, and temporary previews are not saved.

The four audio levels use `0–100%` in `5%` steps and default to `100%`. Master
at zero mutes all audio. Every required sound meaning also has visible meaning.
S10 owns the exact four-bus graph and safe relative mix inside each audio
group.

Standard graphics is default. S11 fixes the Low, Standard, and High drawing,
detail, particle, shadow, and frame values. A failed change returns to the last
complete profile. The game never changes quality automatically. One local
once-per-session advisory can recommend the next lower profile and offer
Display Settings without pausing play. Field of view defaults to `70°`, ranges
from `60°` to `90°` in `1°` steps, and never changes campaign rules. The centre
reticle defaults on. Fullscreen is an explicit **Enter Fullscreen** or **Exit
Fullscreen** command and is never automatic or saved.

Text Scale and Interface Scale separately offer `100%`, `125%`, and `150%` and
default to `100%`. Text Scale changes dialogue, captions, reports, messages,
prompts, and descriptions. Interface Scale changes controls, icons, panels,
spacing, and focus indicators.

High Contrast defaults off. Colour-independent shape, label, icon, and pattern
meaning is always active. Sound Captions and Speaker Names default on.

Head Bob and Camera Shake each offer **Off**, **Reduced**, and **Full** and
default to Off. Motion blur is unavailable. Reduced Motion defaults off. When
on, it temporarily forces head bob and camera shake off and removes
non-essential panel motion, camera transitions, parallax, and pulsing. Turning
it off restores the player's prior selections.

Reduced Flashes defaults on. It replaces non-essential flashes with steady
highlights or short fades. No information depends on flashing. S10 owns the
exact approved visual limits.

Interaction Assist defaults on. Both vertical-inversion choices default off.
Bindings, sensitivity, field of view, and other defaults are the exact values
in this specification. Content-note acknowledgement defaults false.

Missing settings use defaults. Unknown, missing, invalid, or unsupported fields
invalidate a stored complete record. Invalid or unsupported settings remain
stored, use defaults for the current session, and show a warning. The next
explicit valid settings change can replace the complete invalid record only
after confirmation.

## Focused stations and desk work

Each focused station has a title, current object or sample status, main work
area, and bottom action row. Back and the available Primary Action stay
visible. The first meaningful control receives focus. Arrow keys or the
directional pad move between choices. Previous and Next Panel change approved
tabs. `Tab` and `Shift+Tab` use a stable complete order. Mouse users select the
same controls. No task requires dragging.

Before every time-costing action, a review states the action, time, energy,
known result, expiry risk, and irreversible consequence when applicable.
Confirm applies it. Back changes nothing. Rejection keeps the same station and
selection, gives the reason, and changes no campaign state.

The shared-desk sections are **Inbox**, **Calendar**, **Work Queue**,
**Analysis**, and **Manuscript**. The selection remains only while the player
stays at the desk.

Inbox uses newest-first messages with unread state, sender, subject, received
period, known deadline, and known action cost. Opening marks read through the
approved presentation command. Replies show cost and consequence before
confirmation. Expired messages remain readable.

Calendar shows all 16 weeks, current period, known deadlines, monitoring
windows, and completed fixed gates without hidden events. Work Queue shows at
most two required and three optional requests, with status, location, deadline,
cost, and known expiry result. It cannot operate laboratory equipment remotely.

Analysis first shows eligible locked raw records. Structure, Rhythm, and
Repatterning are fixed panels. Each visual has a text summary, labels, and
non-colour meaning. Recording requires one permitted primary reading, at least
one relevant caveat, and a review of quality and disagreement. Success creates
the locked evidence card. Rejection keeps all selections.

The manuscript board shows Claim, three Figure positions with Evidence, two
Controls, Caveat, Authorship, Supplementary, and Active Request. Wide views use
a stable grid. Limited views use the same ordered vertical sections. Empty
positions remain visible. Selecting a position opens permitted cards and shows
source, quality, caveat, connections, and conflict before Place, Replace, or
Remove. The requirements panel uses **Met**, **Missing**, **Conflict**, and
**Unsupported**. Revision review lists claim, costs, unmet requirements,
record and authorship changes, and irreversible Integrity action.

Experiment Setup uses **Experiment**, **Sample and Control**, **Conditions**,
and **Review**. It contains only approved qualitative choices and no actionable
real-world protocol. Review shows the projected **Robust**, **Mixed**, or
**Compromised** band, reasons, slot use, costs, and monitoring window.

The active rack keeps three left-to-right tray positions. Each shows Empty or
its sample, **Stable**, **Stressed**, or **Failing**, experiment stage, and next
monitoring window. Stop uses the approved consequence confirmation.

Imaging uses Structure, Rhythm, and Repatterning. Comparison and panel changes
are free. Recording a reading uses explicit selection and review. There is no
tracing, timing, cursor-precision, or hidden correct-click task.

Facility Queue, Imaging Booking, and Imaging Service Limit state the problem,
affected equipment, condition, known expiry, and forecast before responses.
Each response shows costs, resulting **Ready** or **Limited** condition, known
relationship effect, and remaining possible work. Confirmation follows the
S05 settlement order. The view stays disabled until saving, scheduling, and
the S08 world update finish. Expiry shows the Limited fallback without implying
a physical route change.

## Dialogue, captions, choices, and tutorials

Dialogue releases pointer capture and stops movement. Required text appears
complete. Primary Action advances one entry only after it is complete. Holding
does not advance more entries. Dialogue never advances automatically.

Two to four choice options appear vertically with no time limit. Selecting an
option does not apply it; Primary Action confirms it. Back can open Pause but
cannot bypass a required choice. An irreversible choice uses its extra
confirmation.

Pause in a skippable scene shows **Skip to Choice**, **Skip Remaining Scene**,
or **Skip Scene**, as applicable. Each needs confirmation and never selects a
choice. The approved authored recap follows every skip.

Spoken dialogue appears once in the lower dialogue panel with the speaker name;
it is not duplicated as subtitles. Sound captions such as `[door closes]`
appear directly above it. Captions never cover dialogue, choice, confirmation,
prompt, or required warning. They move upward when needed, and temporary
notifications wait.

Captions use high-contrast text, an opaque background, and no more than three
wrapped lines. At large scale they grow upward without hiding a required
control. Manual dialogue remains until advance. A sound caption remains for
the relevant sound duration and at least `2.5 seconds`. S10 connects timing to
actual cues without changing placement or readability.

Week 1 introduces **Move and Look**, **Interact**, **Focused Views**, **Time and
Energy Costs**, **Research Status**, and **Local Saving** when each first becomes
relevant. Prompts use semantic text, the current binding, and **Dismiss**. Each
first display is recorded once. Help can replay all six topics without changing
their saved presentation history. Help also shows current bindings, focused-
view navigation, save and recovery meaning, and accessibility summaries.

## Notifications

The four classes are **Message received**, **Status changed**, **Deadline
approaching**, and **Save result**. Notifications never apply rules.

At most one temporary line appears for `4 seconds`. Others wait in received
order. Dialogue, confirmations, cutscenes, and too-small-view advice pause the
display without losing notices. A notice does not flash or capture focus.

Messages persist in Inbox. Material status and deadline meaning persists in
Research Status or Calendar. A failed save remains until response. Only a
successful routine save can be temporary only. Sound and animation are
optional duplicates.

## Archive, local data, and credits

Archive opens on **Departures** and shows ending cards newest first. Each shows
completion date, protagonist name and pronouns, career label, paper state,
Integrity consequence, fatigue consequence, and summary access. It shows no
rank, score, empty slot, completion percentage, or expected campaign count.

**Institutional Citations** has twelve fixed positions. Unlocked Citations show
title, description, and first-unlock order. Locked positions say **Not yet
received** and reveal no condition. The interface does not imply that all are
required.

Local Data states that data stays in the current browser profile. It lists
Settings, Active Campaign, Backup, Departures, Institutional Citations, and
Metadata with only presence and safe counts. Clear Saved Data lists all
affected areas, reports success only after whole-database deletion, and never
claims partial deletion.

Credits/Licences is static and scrollable, with Game, Tools and Libraries,
Visual Assets, Audio Assets, and Fonts. It uses verified build data and makes
no runtime web request. A labelled external link asks before opening a new tab.

## Recovery, migration, and repair

Backup recovery states that active data cannot be used and shows the backup's
protagonist, week, work period, and verified save sequence. **Recover Backup**
and **Cancel** are the only actions. Recovery changes neither the source backup
nor unrelated data.

One-way migration states current and required campaign versions, that the
update cannot be reversed inside the game, and that the original remains as
backup. **Update Campaign** and **Cancel** are separate. Failure preserves the
source and keeps Continue blocked.

Unusable-campaign discard lists only active campaign and backup. Archive repair
separately lists the damaged Archive area and valid retained data. They never
combine as one repair. Cancel starts selected. Each result is reported only
after confirmation from persistence.

## Confirmation and error placement

Routine time-costing work uses **Confirm Action** and **Back**. An irreversible
campaign choice uses a full explanation, a choice-specific label, and Cancel
selected first. Save replacement, discard, Archive repair, migration, and
Clear Saved Data use separate destructive confirmations that list affected
local data.

The input that opens a confirmation cannot confirm it. It must be released
before a new press. Held or repeated input does nothing. A destructive
confirmation also requires focus to move from Cancel to its explicit action.

A correctable field error appears beside its field and receives focus after
failed confirmation. An action rejection appears in the current station or
panel. A persistence or settings failure uses its approved message. A fatal
error replaces all interaction and follows the S11 sanitized-diagnostic
boundary.

## Persistence failure messages

S07 returns one of nine codes. S09 maps them without raw browser errors:

| Code | Player-facing behaviour |
|---|---|
| `notStarted`, `unavailable` | At startup: **Saved data is not available.** During a failed campaign save add: **Your latest action was not saved.** Offer Try Again and Return to Main Menu; campaign-changing actions remain blocked. |
| `blocked` | **Another Minor Revisions tab is preventing access to saved data. Close the other tab, then try again.** Offer Try Again and Return to Main Menu. |
| `quotaExceeded` | **The browser does not have enough storage to save this campaign. Existing saved data is unchanged.** Offer Try Again and Return to Main Menu. Delete nothing automatically. |
| `unsupportedVersion` | **This saved data was created by a newer version of Minor Revisions and cannot be opened safely.** Preserve data and offer Reload Game and Return to Main Menu. |
| `invalidData` | **This saved campaign cannot be read safely.** Route to valid backup recovery, or to Main Menu and the separate confirmed discard. Never guess a repair. |
| `incompatibleContent` | **This campaign uses game content that this version cannot load.** Route to a compatible backup if one exists; otherwise return to Main Menu. Never change content version or build profile silently. |
| `revisionConflict` | Open the cross-tab conflict screen below. Never use a normal save retry. |
| `transactionFailed` | **The save did not complete. Existing saved data is unchanged.** Offer Try Again only when S07 marks the exact retry safe. Otherwise offer Load Latest Save and Return to Main Menu. |

A settings-save failure is non-blocking. Its value stays active for the current
session and the UI says: **This setting is active now, but it was not saved.**
Try Again remains in Settings.

If another tab changes, completes, recovers, clears, or replaces the campaign,
the stale tab blocks campaign-changing actions and says: **This campaign
changed in another browser tab. This tab cannot save or replace the newer
progress.** It offers only **Load Latest Save** and **Return to Main Menu**.
Loading replaces the stale tab's unsaved state after confirmation. No merge or
last-writer-wins behaviour exists.

On return from a hidden or inactive tab, the application checks the saved
campaign before it accepts a campaign-changing action. Looking and read-only
information cannot overwrite data.

## Semantic access and responsive layout

All menus, tabs, lists, buttons, fields, messages, captions, and confirmations
use semantic browser controls with meaningful names. The 3D canvas never owns
the only required text, choice, cost, warning, or state cue.

The focused control always has a high-contrast, colour-independent outline. A
panel keeps focus inside until it closes. Closing returns focus to its opener
or the nearest safe replacement.

Assistive-reading software receives panel titles, control names, selected
states, validation reasons, required alerts, and changed status text in a
controlled order. Quiet changes do not interrupt required dialogue or
confirmation. This baseline does not claim that the 3D floor is navigable
without vision or that every assistive technology is certified.

Normal text has at least `4.5:1` contrast against its background. Large text,
focus outlines, and essential control shapes have at least `3:1`. Normal and
High Contrast modes must pass.

The supported minimum is `960 × 540` browser layout pixels at `100%` scales.
All three scales are tested at `1280 × 720`, including both scales at `150%`.
Wider and `4:3` desktop views remain supported. Mobile and tablet are outside
the first release.

Wide panels can use two columns or side-by-side comparison. Limited width or
large scale uses one ordered column or stable alternating comparison. Required
controls need no horizontal scrolling. Long text scrolls vertically while its
title and Back remain available.

Below either minimum dimension, the game releases pointer capture, clears
movement, freezes presentation safely, and shows resize advice above the
current screen. Campaign time does not advance. A valid size restores the prior
safe interface. Free movement still needs Resume and begins at zero speed.

Every required action and screen must work with keyboard only and controller
only. Focus must remain visible, follow a logical order, and have an available
return path. Automated semantic checks and one manual screen-reader check must
confirm names, states, errors, and updates. This is a practical baseline, not
complete accessibility certification.

## UI projection and action dispatch

One immutable UI projection contains:

- projection revision;
- current main screen and optional permitted confirmation;
- available semantic action IDs and required target IDs;
- current device labels and complete bindings;
- validated settings and temporary preview state; and
- only approved player-visible campaign facts for the selected screen.

It contains no complete `CampaignState`, raw save record, hidden number, hidden
route condition, mutable content object, browser database object, DOM node, or
Three.js object.

Every UI action sends its action ID, target ID when required, and current
projection revision to application. UI never changes campaign truth. A stale
or unavailable action changes nothing, refreshes the complete projection, and
gives a factual reason when needed.

The projection is complete for one revision. UI does not merge partial
campaign packets or infer availability. An identical projection retry is
harmless. An older or conflicting same-revision projection is a fault.

## UI lifecycle and failures

The boot screen starts first. Other controls activate only after their required
data is ready. A partial screen never accepts input.

When one full screen replaces another, the old screen closes before the new
screen accepts input. Input during the transition is ignored. Closing removes
temporary messages, timers, held state, repeat state, scroll state, pointer
capture when applicable, and owned listeners. Repeated cleanup is harmless and
cannot leave an invisible control active.

Campaign opening clears all prior campaign UI, then accepts one fresh complete
projection. Campaign closing removes selected targets, focused stations,
dialogue, queued campaign notices, and campaign-derived screen data. Global
settings remain application-long.

A recoverable screen-opening failure restores the previous safe screen and
offers **Try Again** and **Back**. A retry cannot repeat an already successful
campaign action.

A fatal failure disables all game input and shows: **Minor Revisions must stop
because it cannot continue safely.** It shows only the plain explanation,
sanitized issue code, **Copy Diagnostic**, and **Reload Page**. It starts no
emergency save, copies or reloads nowhere automatically, and makes no claim
about the latest action. Reload uses normal S07 validation and recovery to
select the last verified state.

## Required future fixtures

S09 requires these future fixture groups:

| Fixture group | Required coverage |
|---|---|
| `MR-S09-INP-001` | Every keyboard, mouse, and controller action; defaults; remapping; conflicts; held and repeat rules; sensitivity; dead zones; active-device changes; disconnection; and labels. |
| `MR-S09-FOC-001` | All five modes; pointer capture; focused stations; menus; dialogue; cutscenes; confirmations; hidden tabs; browser focus; small-view block; priority; and no carried input. |
| `MR-S09-UI-001` | Every screen and overlay; navigation order; visible focus; HUD; prompts; costs; scrolling; dialogue; captions; notifications; audio-status and Resume Audio; confirmations; errors; and Archive. |
| `MR-S09-SET-001` | Every field, allowed value, default, immediate preview, save, failed save, invalid stored record, section reset, remapping, and Reduced Motion interaction. |
| `MR-S09-A11Y-001` | Keyboard-only and controller-only use; semantic controls; focus; speaker names; captions; contrast ratios; colour-independent meaning; motion; flashes; assist; and manual assistive-reading check. |
| `MR-S09-ERR-001` | All nine persistence codes; operation-specific text; safe and unsafe retry; tab conflict; screen recovery; fatal stop; reload; and sanitized output. |
| `MR-S09-RSP-001` | `16:9`, wide, and `4:3`; three scales; `960 × 540` at `100%`; `1280 × 720` with both scales at `150%`; responsive comparison; vertical scrolling; and too-small blocking. |
| `MR-S09-LIF-001` | Startup; partial failure; screen replacement; repeated close; campaign replacement; owned cleanup; capture release; recoverable retry; fatal stop; and reload recovery. |
| `MR-S09-JRN-001` | Keyboard-and-mouse and controller journeys through startup, New Game, tutorial, focused action, Research Status, Settings, Pause, Save and Quit, and Continue. |

Fixtures also prove that reading, input transitions, layout changes, hidden-tab
time, and browser-focus loss never advance campaign truth. No test or result
exists yet. S12 owns executable format and values. S14 owns final browser,
accessibility, contradiction, and interface-freeze evidence.

## Connected interface lifecycle

`MR-IF-009`, Action-based input and interaction target, is candidate `v1`.
S08 supplies movement, camera, collision, targets, and focus geometry. S09
supplies physical-device conversion, action mapping, remapping, pointer
capture, input modes, focus, prompts, and accessibility behaviour. Input owns
device conversion and bindings. Existing S08 world, player, and interaction
owners keep their parts.

`MR-IF-010`, UI view model and semantic action dispatch, is candidate `v1`.
UI owns the projection and semantic screen lifecycle. Application owns action
validation and dispatch. Rules, persistence, input, content, captions, menus,
and tests consume only their approved limited parts.

Neither interface is frozen or available for implementation. S10 now completes
the presentation connections through candidate `MR-IF-008` and
`MR-IF-011`–`MR-IF-013`. S12 must encode executable fixtures, and S14 must
complete the cross-interface audit.

## S09 acceptance and handoff

S09 is documented only when:

- this complete action, device, input-mode, pointer-capture, remapping, screen,
  navigation, settings, accessibility, responsive-layout, persistence-message,
  UI-projection, lifecycle, fault, and fixture contract is present;
- S02–S08 and the connected numbered design documents contain no contradictory
  input, UI, or accessibility claim;
- `MR-IF-009` and `MR-IF-010` are candidate `v1` with all later evidence named;
- `MR-IMP-OPEN-009` is resolved;
- implementation controls preserve this S09 result and its connected S12
  fixture and acceptance contract;
- every implementation gate remains blocked; and
- Leonardo's approved documentation is committed.

S10 now owns the documented rendering, resource, asset, and audio connection.
S11 now owns the documented browser, graphics-budget, local advisory,
diagnostic, privacy, and measurement connection. `MR-IF-014` is candidate
`v1`. S12 now supplies the future executable fixture and acceptance contract.
S13 now assigns `input`, `player`, and `interaction` to `MR-WP-04` and semantic
UI, CSS, and accessibility to `MR-WP-05`. S14 is the current next technical-
specification block.
