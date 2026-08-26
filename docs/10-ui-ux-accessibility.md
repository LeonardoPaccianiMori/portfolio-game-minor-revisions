# UI, UX, and Accessibility

Status: **B04 interaction baseline approved; full B08 specification unresolved**

## Confirmed interface surfaces

- First-person interaction prompts and equipment feedback.
- Semester scheduling and experiment status.
- Player desk with email, data analysis, and manuscript revision board.
- Result inspection for structure, rhythm, contamination, environment, and
  tissue health.
- Dialogue choices, notifications, and route decisions.
- Automatic local save and resume without an account.

The full HUD, screen layout, detailed interaction grammar, and visibility of
state are not confirmed.

## Approved B04 interaction baseline

- A nearby relevant object has a small visual highlight and short
  context-sensitive label. The game does not place permanent objective arrows
  or labels on every object.
- A focused station view uses clear selection rather than a drag-only or
  precision-motor action. It supports mouse, keyboard, and controller input.
- The active sample rack uses a physical state signal. The desk work queue
  repeats that state in words, so colour is never the only status signal.
- A meaningful action gives a plain-language forecast of its likely trade-off.
  An irreversible dishonest report or revision commit requires clear
  confirmation.
- Messages use a world signal, safe queue notification, then optional response
  or scene. Deadlines must be explicit.
- Pause, menus, and browser closure do not advance game time or create a missed
  monitoring check. Safe checkpoints support exit and resume.

The full control map, prompt wording, UI layout, visual treatment, settings,
and accessibility test criteria remain B08 work.

## Confirmed cutscene requirements

Real-time cutscenes must be skippable, captioned, and safe around save
checkpoints. Input control must be restored reliably after completion, skip,
reload, or interruption.

## UX principles derived from confirmed design

- The player must distinguish usable, inconclusive, suspicious, and repeatable
  results without expert biological knowledge.
- Causes and consequences should be learnable without exposing every hidden
  flag.
- Waiting must expose meaningful choices, not force idle real time.
- Emails, signs, and manuscript content must remain readable in a browser.
- First-person targeting must be comfortable in compact rooms.
- UI should support the institutional visual language without sacrificing
  clarity for satire.

## Accessibility candidates requiring explicit approval

- Full captions and speaker labels for every voiced or meaningful audio event.
- Keyboard and mouse remapping plus an alternative to hold interactions.
- Adjustable look sensitivity, field of view, head-bob, camera shake, and
  motion effects.
- High-contrast theme and detailed cue design beyond the approved
  plain-language-label rule.
- Scalable text, readable fonts, UI safe areas, and adjustable dialogue speed.
- Pause during most planning and reading interactions.
- Reduced time pressure or narrative-focused difficulty option.
- Save recovery, cutscene replay or summary, and warning before irreversible
  choices.

These are proposed minimums, not yet an approved accessibility specification.

## Open decisions

- Supported input devices and complete control map.
- HUD composition, state visibility, menus, tutorial, and onboarding.
- Desktop versus mobile/tablet support; mobile is not currently promised.
- Accessibility baseline, settings, defaults, and test criteria.
- Save-slot, continue, restart, chapter, and replay UX.
- Localization, text volume, reading level, and content warnings.
