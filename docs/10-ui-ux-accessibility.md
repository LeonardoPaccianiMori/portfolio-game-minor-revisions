# UI, UX, and Accessibility

Status: **approved through B07; full B08 specification unresolved**

## Confirmed interface surfaces

- First-person interaction prompts and equipment feedback.
- Semester scheduling and experiment status.
- Player desk with email, data analysis, and manuscript revision board.
- Result inspection for structure, rhythm, contamination, environment, and
  tissue health.
- Dialogue choices, notifications, and route decisions.
- Automatic local save and resume without an account.
- Research Status with evidence, PI confidence, integrity, working trust, and
  route feedback.

The full visual layout and detailed interaction grammar are not confirmed.

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

## Approved B05 state and pressure feedback

- The permanent HUD shows the current week and named work period, plus the
  five-segment energy bar.
- Research Status shows the evidence-packet label, PI-confidence label,
  five-segment integrity bar, and one five-segment working-trust bar for each
  recurring character.
- A material state change gives a short stated reason. Integrity warnings are
  factual and do not apply moral labels.
- Before a route deadline, Research Status gives a clear non-spoiling message,
  but does not disclose a full formula or hidden flags.
- Standard is the intended pressure profile. Supported keeps the same calendar,
  narrative, routes, and ending content, but provides clearer warnings and
  more energy tolerance. It has no content penalty.
- The game has no global game-over screen before Week 16. A crash or lost route
  produces stated consequences and continues toward the final state.

## Confirmed cutscene requirements

Real-time cutscenes must be skippable, captioned, and safe around save
checkpoints. Input control must be restored reliably after completion, skip,
reload, or interruption.

## Approved B06 ending and replay surfaces

- The ending epilogue is real-time, skippable, captioned, and safe around a
  final checkpoint. It lasts 60–90 seconds inside the 22-minute total
  non-interactive-scene maximum.
- The ending card uses the career label as its heading. Paper, integrity, and
  human-state modules provide context without a moral ranking.
- The ending summary has **Record**, **People**, and **Institutional
  Citations** sections. Record shows career, paper, evidence, integrity, and
  fatigue labels. People shows five working-trust bars and short status lines.
- The summary does not show hidden flags, raw formulas, or a completion
  percentage.
- Institutional Citations use short diegetic institutional-stamp notifications
  when earned. The ending summary shows citations earned in the run and the
  local archive.
- A new campaign has no gameplay carry-over or chapter rewind. Its archive
  remains available through local save data.

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

## B07 compact-floor constraints

The complete playable area is one continuous first-person floor. Required
paths have clear walking space, and each core station has enough room for a
comfortable approach and focused view. Furniture can block movement, but no
character, scene, or decorative object can trap the player or create a
precision movement task. Core doors open automatically.

Room signs, the tissue-culture glow, the warm PI office, and the exit light
give orientation. The game still uses no permanent objective arrow or minimap.
When a required scene is due, an in-world cue and the existing task state give
direction without a teleport. B08 must turn these constraints into the final
control, prompt, motion, contrast, and accessibility design.

## Accessibility candidates requiring explicit approval

- Full captions and speaker labels for every voiced or meaningful audio event.
- Keyboard and mouse remapping plus an alternative to hold interactions.
- Adjustable look sensitivity, field of view, head-bob, camera shake, and
  motion effects.
- High-contrast theme and detailed cue design beyond the approved
  plain-language-label rule.
- Scalable text, readable fonts, UI safe areas, and adjustable dialogue speed.
- Pause during most planning and reading interactions.
- Further accessibility adjustments beyond the approved Supported profile.
- Save recovery, cutscene replay or summary, and warning before irreversible
  choices.

These are proposed minimums, not yet an approved accessibility specification.

## Open decisions

- Supported input devices and complete control map.
- HUD composition, state visibility, menus, tutorial, and onboarding.
- Desktop versus mobile/tablet support; mobile is not currently promised.
- Accessibility baseline, settings, defaults, and test criteria.
- Exact save-slot, continue, restart, archive, and replay layout.
- Localization, text volume, reading level, and content warnings.
