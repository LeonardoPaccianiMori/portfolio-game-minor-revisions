# UI, UX, and Accessibility

Status: **B10 documented; implementation approval pending**

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

## Supported devices and controls

The first release targets desktop and laptop browsers only. Mobile and tablet
play are outside this release scope. The game supports keyboard and mouse and
a standard controller. Every core action has an option on both input systems.

| Function | Keyboard and mouse | Controller |
|---|---|---|
| Move | \`WASD\` or arrow keys | Left stick |
| Look | Mouse | Right stick |
| Interact or confirm | \`E\` | Normal confirm button |
| Research Status | \`Tab\` | Normal view button |
| Pause or go back | \`Escape\` | Normal menu button |

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

## Gameplay interface

The permanent HUD is quiet and has three fixed areas:

| Area | Content | Rule |
|---|---|---|
| Upper left | Current week, named work period, and five-segment energy bar. | Always readable; it does not show hidden formulas. |
| Lower centre | Current interaction prompt. | Shows only for a valid nearby target. |
| Upper right | Quiet new-message and safe-notification indicators. | An indicator does not force an immediate response. |

The player opens **Research Status** with its assigned control. It is a large,
readable quick-menu panel for evidence, PI confidence, integrity, five working
trust bars, route feedback, and stated reasons for material changes. It cannot
cover a required subtitle or confirmation. It gives clear non-spoiling route
feedback but does not reveal hidden flags, raw formulas, or a completion
percentage.

The shared desk is the diegetic hub for email, calendar, work queue, analysis,
and manuscript work. It can report remote status but cannot operate laboratory
equipment remotely. Every received message remains in a readable inbox.
Important messages state their deadline and time cost. The notebook, inbox,
and Research Status give context, not a permanent quest-arrow system.

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

New Game asks for the protagonist's name, pronouns, and pressure profile.
Standard is the default. Supported is equal in story and content; it is not
called easy. The selected profile is fixed for the whole save. A player must
start a New Game to use another profile. If an active save exists, New Game
requires confirmation before replacement.

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

Safe saves occur at approved experiment, manuscript, and scene boundaries.
Save and Quit gives a clear confirmation at the last safe state. On campaign
completion, the game removes the full active state and retains a compact ending
card. Archive keeps the 12 most recent ending cards and the persistent
Institutional Citation record. It does not retain full earlier saves or every
previous cinematic. Settings includes **Clear Saved Data** with a clear
confirmation.

Skipping a cutscene adds a concise recap, including its choice and immediate
result, to the inbox or Research Status. Normal cutscenes do not replay during
an active save. The Archive provides ending cards, citations, and ending
summaries only. `11-technical-architecture.md` defines save schemas,
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

MR-TEST-UI-001 must verify the New Game flow, fixed pressure profile,
replacement confirmation, Save and Quit, local-data clear confirmation, and
Archive headings. MR-TEST-A11Y-001 must verify the 150 percent scale,
1280 by 720 view, keyboard and controller core actions, captions, reduced
motion, contrast, and Interaction Assist rules. These checks are private to
Leonardo and Codex.

The UI must continue to use IndexedDB only for local game data. It must not
use a cookie for saves, ownership, discovery, or expiry. The active save has
no automatic expiration. Browser closure and connection loss must not advance
game time.

## Deliberate later verification

11-technical-architecture.md defines browser scope, controller roles, UI
runtime architecture, pointer-lock behaviour, save schemas, migrations,
validation, corruption recovery, and the performance boundary. Exact rendered
layout measurements, browser results, and implementation evidence remain
future facts. This document does not authorize implementation code or
production assets.
