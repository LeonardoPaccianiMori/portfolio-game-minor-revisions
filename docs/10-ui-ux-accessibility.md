# UI, UX, and Accessibility

Status: **C01–C06 approved on 2026-09-06; current authority is the correction sections below and the interface register. Earlier B/R/S lifecycle records are historical. Runtime evidence remains step-specific.**

## Interaction principles

The interface supports first-person exploration without turning the floor into
a checklist. It must make costs, consequences, science, and available help
clear before the player commits. It must not use permanent task lists, minimaps,
objective arrows, or a stream of alerts that hides the world.

All required information has at least two channels: text, icon, colour, sound,
or visible object state. Colour and sound are never the only channel. The game
uses clear English and sentence case. It does not depend on expert science
knowledge, fast reading, drag actions, timed button presses, holds, or precise
motor actions.

Required interface text gives the plain-language meaning before or beside a
technical label. If academic precision makes a core instruction harder to
understand, the core instruction uses the simpler accurate-enough form and an
optional record holds the nuance. A player must not need an external source or
the design documents to understand the current objective, experiment purpose,
cost, warning, or consequence.

## Supported devices and controls

The first release targets desktop and laptop browsers only. Mobile and tablet
play are outside this release scope. The game supports keyboard and mouse and
a standard controller. Every core action has an option on both input systems.

| Function            | Keyboard and mouse     | Controller            |
| ------------------- | ---------------------- | --------------------- |
| Move                | \`WASD\` or arrow keys | Left stick            |
| Look                | Mouse                  | Right stick           |
| Interact or confirm | \`E\`                  | Normal confirm button |
| Research Status     | \`Tab\`                | Normal view button    |
| Pause or go back    | \`Escape\`             | Normal menu button    |

The exact controller-button labels can adapt to the detected controller, but
the move, look, confirm, view, and menu roles must remain consistent. Settings
must provide remapping, look sensitivity, look inversion, field of view, and
reduced-motion controls.

The default camera has no head bob, motion blur, or camera shake. Optional
camera effects remain off unless the player enables them. A centre reticle is
optional. A valid object shows its short label, one available action, and its
time and energy cost before commitment. The player can leave a focused view
before confirmation at no cost.

Entering a station view stops player movement. It does not advance campaign
time by itself. Time advances only when the player confirms a time-costing
task. Focused views use clear selections and ordinary confirm actions, not
drag-only, hold-only, timed, or precision-motor input.

`implementation/specs/08-world-geometry-and-interaction.md` fixes the
supporting spatial contract: camera limits, interaction range, target priority,
environmental glance priority, and focused-station entry and return.
`implementation/specs/09-input-ui-and-accessibility.md` now fixes the complete
player-facing action, binding, pointer-capture, input-mode, prompt, focus,
screen, settings, accessibility, responsive-layout, and failure behaviour.

## Gameplay interface

The permanent HUD is quiet and has three fixed areas:

| Area         | Content                                                       | Rule                                               |
| ------------ | ------------------------------------------------------------- | -------------------------------------------------- |
| Upper left   | Current week, named work period, and five-segment energy bar. | Always readable; it does not show hidden formulas. |
| Lower centre | Current interaction prompt.                                   | Shows only for a valid nearby target.              |
| Upper right  | Quiet new-message and safe-notification indicators.           | An indicator does not force an immediate response. |

Ten designated short environmental items can also use the lower-centre area as
a close-range glance surface. When the player looks at one and no
higher-priority interaction is active, the complete line appears without an
action label, click, or time cost. It is semantic HTML text, follows the UI
scale and contrast settings, and uses no marker, animation, or Interaction
Assist highlight. Looking away dismisses it. Each line records its one-time
display; the physical notice remains in the room. The other twenty items use
focused inspection.

The player opens **Research Status** with its assigned control. It is a large,
readable quick-menu panel for evidence, Elena's paper confidence, integrity, five working
trust bars, route feedback, and stated reasons for material changes. It cannot
cover a required subtitle or confirmation. It gives clear non-spoiling route
feedback but does not reveal hidden flags, raw formulas, or a completion
percentage.

Working trust appears only as a five-segment bar, a descriptive state, and a
factual reason for a change. The interface never shows the internal 0–100
value, numeric delta, formula, or support threshold. The bar is the
protagonist's estimate of willingness to cooperate, not an institutional score,
friendship meter, or moral rank.

The shared desk is the diegetic hub for email, calendar, work queue, analysis,
and manuscript work. It can report remote status but cannot operate laboratory
equipment remotely. Every received message remains in a readable inbox.
Important messages state their deadline and time cost. The notebook, inbox,
and Research Status give context, not a permanent quest-arrow system.

The manuscript focused view shows fixed labelled positions: Claim, three
Figures with linked Evidence, two Controls, Caveat, Authorship, Supplementary,
and Active Request. Empty positions remain visible. Selecting a card shows its
source, quality, caveat, and current connections. Ordinary select, confirm,
back, and comparison controls cover all board work; dragging is never required.

The requirements panel lists each rule as Met, Missing, Conflict, or
Unsupported and gives a plain-language reason. It does not use a moral label or
block a deliberate incomplete commit. Before confirmation, it shows the
action-specific time and energy cost, unmet requirements, record changes, authorship
changes, and irreversible integrity action, if present.

Camila's video call uses the protagonist's desk monitor as a focused view. It
shows a simple original 2D portrait, captions, speaker name, and non-lexical
sounds. It uses no 3D model, lip sync, full voice, or recorded talking-head
video.

The interface follows the fair-rules principle in `01-vision-and-pillars.md`.
It states known costs, deadlines, expiry, and irreversible consequences. It
does not reveal deliberately hidden formulas, flags, or uncertain outcomes,
but it cannot use missing or misleading feedback to simulate institutional
pressure.

Science views use labelled structure, rhythm, and repatterning-index panels
with plain-English summaries, icons, and visible state. A graph or tissue image
must not require colour alone for interpretation. An irreversible report or
revision commit requires a clear confirmation that states the immediate cost or
record consequence.

Before an experiment commitment, the station shows **Robust**, **Mixed**, or
**Compromised** as the current projected preparation band and gives each
plain-language reason. It never shows the hidden percentage table. After
resolution, the result view names the player-controlled factors that changed
the final band. Biological variation remains identified as variation, not as a
hidden player error.

The active-rack focused view keeps the physical three-position tray visible.
The player selects a tray, reads Stable, Stressed, or Failing plus its next
window, and confirms an available action. The imaging focused view lets the
player switch among structure, rhythm, and repatterning tabs, compare their raw
observations, and record a reading. Switching tabs and leaving either view are
free. These views use the ordinary select, confirm, and back controls. They use
no hidden correct click, timed input, drag, or dexterity test.

Analysis shows raw observations before interpretation. It then requires one
primary reading and at least one relevant caveat. A limited result can show
disagreement between views. The selected reading and caveat stay visible on
the evidence card and later manuscript board.

The stop confirmation states that the active slot is freed, the current sample
and elapsed work are lost, earlier archived records remain, and the current
run creates no evidence card. It names any relevant opportunity that can expire
before a replacement finishes.

## Dialogue, reading, and tutorial

Dialogue appears in a lower-screen panel with the speaker name. It has no 2D
portrait panel. Internal thought uses a simple distinct text treatment.
Dialogue advances manually. Required dialogue stays short. Reports use
headings, cards, and bullets. Important choices offer two to four clear options
with no timed response.

Week 1 uses the tissue-culture opening and Elena's first request as the
tutorial. It has no separate training room or test puzzle. Dismissible
contextual prompts introduce movement, interaction, focused views, costs,
Research Status, and local saving. Help and Controls remain available from the
pause menu at no game-time cost.

## Menus, onboarding, and pressure profile

The main menu has **Continue**, **New Game**, **Archive**, **Settings**,
**Accessibility**, and **Credits/Licences**. The pause menu has **Resume**,
**Research Status**, **Settings**, **Accessibility**, **Save and Quit**, and
**Main Menu**.

Settings has Audio, Display, Controls, Accessibility, and Local Data
categories. Changes apply immediately and persist locally. Audio provides
Master, Music, Ambience/Effects, and Dialogue Sounds controls.

New Game asks for the protagonist's name, pronouns, and pressure profile. The
name accepts 1–64 visible Unicode characters and uses the exact S03
normalization and rejection rules. Pronoun choices are she/her, he/him, and
they/them. Standard is the default. Supported is equal in story and content;
it is not called easy. The selected profile is fixed for the whole save. A
player must start a New Game to use another profile. If an active save exists,
New Game requires confirmation before replacement.

Both profiles receive the same clear warnings before gates, expiry, missed
monitoring windows, and irreversible choices. Supported changes energy and
recovery tolerance. It never withholds information from Standard or adds
information that Standard does not receive.

The first New Game displays a short content note about academic pressure,
burnout, insecure work, and ethical pressure around research records. It does
not spoil routes or endings.

## Local save, archive, and replay

The game stores one active local save per browser profile in IndexedDB only.
It does not use cookies for save state, ownership, or save discovery. It has
no account, server-side save, uploaded player data, or automatic expiration of
an unfinished save. Browser closure and a lost connection do not advance game
time.

Safe saves occur at approved experiment, manuscript, and scene boundaries. A
safe save can contain queued events and a pending crash, but not an active
scene. Save and Quit during an unresolved scene returns to the verified
pre-scene checkpoint. After the result is saved, it uses the verified
post-scene state. On campaign completion, the game removes the full active
state and backup only after it atomically stores the compact ending card and
Citation state. Archive has two areas. **Departures** shows the 12 most recent
ending cards newest first, without empty slots, an expected-run count, or a
completion percentage. **Institutional Citations** shows the persistent
12-item collectible set. Neither gives a gameplay advantage. The Archive does
not retain full earlier saves or every previous cinematic.

Continue uses the valid active campaign. If active is missing or unusable and
backup is valid, the UI offers recovery and never chooses it silently. Separate
confirmations govern New Game replacement, unusable-campaign discard, damaged
Archive repair, one-way campaign migration, and **Clear Saved Data**. Clear
Saved Data lists settings, campaign, backup, Departures, Citations, and
metadata. It deletes the complete local database or reports failure; it never
claims partial success. S07 supplies the exact safe result and failure codes.

Skip before an unresolved cutscene choice advances to that choice and cannot
select it. After a choice, the player can play or skip the remaining
presentation without changing the saved result. A skipped scene adds a concise
authored recap, including its choice and immediate result, to the inbox or
Research Status. If saved closing dialogue is interrupted, Continue shows the
same recap and never replays the choice. Normal cutscenes do not replay during
an active save. Mouse capture requires a new player confirmation after a
scene, reload, or focus change. The Archive provides ending cards, citations,
and ending summaries only. `11-technical-architecture.md` defines save schemas,
migrations, data validation, corruption recovery, and the storage boundary.

## Accessibility baseline

Captions and speaker names are on by default. Accessibility settings must
include text and UI scale, high contrast, colour-independent signals, look
sensitivity, inversion, field of view, reduced head bob, reduced camera shake,
reduced flashes, reduced motion, and Interaction Assist.

Interaction Assist briefly highlights usable objects in the current room only.
It does not draw a path, arrow, or minimap. Reduced-motion mode removes
non-essential camera motion, flashes, and screen effects while retaining all
needed information and full playability.

At 150% text and UI scale, required controls, captions, prompts, and state
information must remain usable at 1280 × 720. The game is designed first for
16:9 browser windows, but required UI must remain usable in wider and 4:3
desktop windows. Fullscreen is optional. If the view becomes too small, the
game pauses safely and gives resize advice.

The game uses English only. It does not plan later localization. This is a
scope decision, not a claim that English is accessible to every player.

## B08 acceptance criteria

- Desktop/laptop keyboard-mouse and controller play both support every core
  action, with the approved defaults and remapping.
- The HUD, Research Status, inbox, dialogue, focused views, and menus follow
  the stated visibility, cost, and no-objective-arrow rules.
- The ten glance-display items use semantic scaled text, yield to a
  higher-priority interaction, and receive no marker or Interaction Assist
  highlight. The other twenty items keep focused inspection.
- New Game, pressure-profile lock, local save, completion archive, data
  clearing, and cutscene-recap behaviour follow the local-only contract.
- Captions, speaker names, reading controls, motion controls, Interaction
  Assist, and multi-channel information support are present by default or in
  the approved settings.
- Required UI remains usable at 150% scale and 1280 × 720, and a small browser
  view pauses safely rather than hiding required choices.
- The game contains the content note, English-only boundary, and no mobile or
  tablet first-release commitment.

## B10 content and test boundary

The exact English text for tutorial prompts, menus, confirmations, save
recovery, compatibility messages, ending-card headings, and the content note
is authoritative in 12-content-specification.md. A later UI implementation
must use those text keys. It must not add a second source of player-facing
English text or use generated wording.

If S06 content validation fails, bootstrap shows
`MR-UI-CONTENT-INVALID`: “Game content could not be verified. No saved
campaign data was changed.” Campaign controls stay disabled. The game does not
load, replace, or repair a save and does not switch to another build profile.
The slice uses `MR-UI-SLICE-COMPLETE` for its separate evaluation ending.

MR-TEST-UI-001 must verify the New Game flow, fixed pressure profile,
replacement confirmation, Save and Quit, local-data clear confirmation,
Archive headings, and glance-display priority. MR-TEST-A11Y-001 must verify the
150 percent scale, 1280 by 720 view, keyboard and controller core actions,
captions, reduced motion, contrast, and glance-display and Interaction Assist
rules. These checks are private to Leonardo and the coding agent.

S12 must also encode the nine S09 fixture groups from `MR-S09-INP-001` through
`MR-S09-JRN-001`. They cover exact device conversion, input and focus modes,
the closed screen inventory, settings, accessibility, failures, responsive
layout, lifecycle, and complete keyboard-and-mouse and controller journeys.
No S09 test or result exists yet.

Implementation S10 connects this semantic interface to one opaque canvas,
three camera roles, Reduced Motion rendering equivalents, complete cutscene
restoration, the four existing audio controls, sound-caption timing, visible
audio failure meaning, and Camila's one desk-monitor portrait. Required
information remains outside the canvas and never depends on colour, motion, or
sound alone. Implementation S11 adds the exact combined blocking-capability
reasons, non-blocking controller message, player-selected graphics profiles,
once-per-session local performance advice, and warning, recoverable, and fatal
diagnostic presentation. It adds no screen outside the S09 inventory.
S14 completed the connected audit. `MR-IF-010`–`MR-IF-012` and `MR-IF-014`
are frozen `v1`. Their frozen status does not authorize implementation, and
the later browser, accessibility, audio, and presentation checks still apply.

The UI must continue to use IndexedDB only for local game data. It must not
use a cookie for saves, ownership, discovery, or expiry. The active save has
no automatic expiration. Browser closure and connection loss must not advance
game time.

## Deliberate later verification

11-technical-architecture.md and S09–S11 define browser scope, controller
roles, UI and presentation architecture, pointer-capture behaviour, save
schemas, migrations, validation, corruption recovery, interface lifecycle,
diagnostic privacy, and the performance boundary. Exact rendered layout
measurements, browser results, performance results, and implementation evidence
remain future facts. This document does not authorize implementation code or
production assets.
