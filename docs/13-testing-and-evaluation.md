# Testing and Evaluation

Status: **B10 documented; implementation approval pending**

## Evaluation boundary

Testing is private to Leonardo and Codex. This is a personal creative project,
not a research study or commercial product test. Do not recruit external
players, collect participant data, use consent forms, run surveys, or require
external science or narrative review.

Leonardo is the only human play evaluator. Codex provides automated tests,
private technical checks, content checks, and documented review. The approved
[`independent LLM design review`](reviews/independent-design-review-protocol.md)
is outside B10 testing. Claude Opus 5 completed the review on 2026-08-28 against
the B10 snapshot. The reports, metadata, and Codex validation notes are stored
in [`reviews/2026-08-28-opus-5/`](reviews/2026-08-28-opus-5/). It is an advisory
specification audit, not external playtesting, scientific validation,
narrative authority, or a vote on implementation. Its recommendations do not
change the design until Leonardo accepts them. The review must be discussed
before Leonardo considers the separate implementation-readiness approval.

No test result exists yet. This document defines future evidence only.

Review findings use three evidence levels: a document fact, an inference from
the design, or measured private play evidence. Predictions about fun, boredom,
optimization, comedy, traversal, comprehension, or likely player behaviour are
hypotheses until an approved private prototype or game evaluation tests them.
Do not present a design-review prediction as a measured result.

## Test identifiers and required evidence

| Test ID | Scope | Required future evidence |
|---|---|---|
| MR-TEST-CONT-001 | Content data and English strings | Validated IDs, references, counts, text keys, word count, and fiction-boundary scan |
| MR-TEST-EXP-001 | Experiment actions and outcomes | Unit fixtures for all six templates, repeats, bands, monitoring, and result/evidence separation |
| MR-TEST-NARR-001 | Calendar, mandatory scenes, records, and manuscript | Unit and browser paths for every required scene and fixed gate |
| MR-TEST-CHAR-001 | Optional scenes and career routes | Window, expiry, trust, concern, credit, and Morrow/Aldercroft fixtures |
| MR-TEST-WORLD-001 | Floor states and environmental content | Act windows, scene anchors, no required fact in optional text, and no trapping path |
| MR-TEST-END-001 | Ending resolver and Archive | All valid route states, 29 modules, 12 citations, and 12-card retention |
| MR-TEST-SAVE-001 | IndexedDB persistence and recovery | Safe saves, replacement, backup, migration, corruption, completion, and data clearing |
| MR-TEST-UI-001 | Main menu, status, prompts, and save controls | Keyboard flow, controller roles where available, text keys, and confirmations |
| MR-TEST-A11Y-001 | Accessibility baseline | Captions, scale, contrast, motion, Interaction Assist, and browser-view checks |
| MR-TEST-TECH-001 | Compatibility and deterministic rules | WebGL2, storage, modules, deterministic seed, no elapsed-time advance, and sanitized errors |
| MR-TEST-PERF-001 | Build size and manual performance | Compressed size audit, reference-device notes, frame samples, and resource-session notes |
| MR-TEST-RELEASE-001 | Public-release boundary | Dependency, licence, asset, privacy, title, and release-package audit |

Every implementation requirement must link to at least one of these test IDs.
Every content object must link to a requirement and a test. A failed test has a
plain-language record of cause, fix, and retest result.

## Automated-test targets

The automated suite must meet these targets before a release candidate:

- At least 90 percent line coverage and 85 percent branch coverage in pure
  rules, persistence, and content-validation modules.
- One valid and one rejected-command test for every typed command.
- Full branch coverage for campaign-ending resolution, content validation,
  active-save recovery, forward migration, active-save replacement, and local
  data clearing.
- A fixture for every experiment template, every earned outcome band, every
  one-time expiry, all four paper states, all four career labels, all
  twenty-nine ending modules, and all twelve Citations.
- A content scan that rejects missing text keys, orphaned text keys, duplicate
  IDs, invalid dependencies, unbounded content generation, wrong counts, and
  English text above 6,000 unique words.
- Browser tests in Chromium, Firefox, and WebKit for the stated core flows.
  WebKit result is not a Safari support claim.

The coverage target applies to deterministic game rules, persistence, and
content validation. It does not reward canvas rendering code that is better
checked through browser flows and private manual review.

## Required private test flows

### Rules and content

MR-TEST-EXP-001 must show that:

- each experiment begins from its approved baseline;
- `MR-ACT-BREAK` has its approved one-period, zero-energy cost and restores
  two energy in Standard or three in Supported without changing other state;
- each normal experiment and permitted repeat has one monitoring window, while
  oxygen loss has two;
- robust, mixed, and compromised preparation select only the approved outcome
  bands;
- closing or reloading cannot reroll a locked outcome;
- monitoring, quality checks, missed windows, fatigue, and control quality
  change only the approved outcome or evidence layer;
- the repair state is associated with recovery but is never represented as
  demonstrated cause; and
- no valid path needs a perfect outcome or a crash.

The rules suite must also reproduce the R01 paper fixture counts: minimum
defensible demand of 43 periods and 25 energy before late-work surcharge;
thorough-honest demand of 55 periods and 29 energy; and maximizing demand of
78 periods and 45 energy. It must report the current optimistic lower-bound
totals for Standard and Supported. It must not silently claim that the
thorough-honest Standard fixture fits until a later approved balance decision
changes the input rules.

MR-TEST-NARR-001 and MR-TEST-CHAR-001 must show that:

- all seven mandatory scenes occur once in the fixed campaign calendar;
- a scene waits for a safe stopping point and never interrupts a required
  equipment action;
- all ten optional scenes use their stated condition, window, expiry, and
  saved result;
- ignored Morrow messages close only the stated industry route;
- Aldercroft and Morrow use the approved visible conditions;
- public-record withdrawal closes both routes; and
- a hidden integrity problem alone does not create an unsupported route block.

The calendar fixture must also show that Weeks 8–9 have no open experiment
template but retain their approved manuscript, journal, career, and
relationship work. A private full-campaign prototype must record whether Weeks
15–16 ever force idle waiting. If it does, return `MR-REV-007` for a new design
decision; do not add filler as a test workaround.

MR-TEST-CONT-001 and MR-TEST-END-001 must show that:

- the content catalogue has the approved full and fallback counts;
- every authored line has an English text key;
- no runtime path generates dialogue or a report;
- all twenty-nine ending modules select in the approved order;
- the four paper states do not change randomly after Week 16;
- the Archive retains the twelve newest ending cards and persistent Citation
  state; and
- no Citation requires unethical play.

### Save, interruption, and technical checks

MR-TEST-SAVE-001 and MR-TEST-TECH-001 must show that:

- safe points save after experiment-stage changes, monitoring choices,
  analysis archiving, manuscript commits, and scene boundaries;
- browser closure, connection loss, menus, and pause never advance game time;
- the active campaign is validated before save and the prior valid state is
  available as a backup;
- a damaged active save offers the backup without overwriting it;
- a failed migration preserves its source record;
- campaign completion removes the full active and backup state only after an
  ending card and Citation state are stored;
- New Game confirms active-save replacement; and
- Clear Saved Data confirms before removing settings, save, Archive, Citations,
  and metadata.

The compatibility flow checks WebGL2, IndexedDB, ES modules, Web Audio, pointer
lock, and controller availability. Missing WebGL2, IndexedDB, or ES modules
blocks a new campaign. Missing controller support retains keyboard-mouse play.
The game has no telemetry, analytics, automatic error report, account, server
save, save cookie, or automatic unfinished-save expiration.

### UI and accessibility checks

MR-TEST-UI-001 and MR-TEST-A11Y-001 must show that:

- keyboard-mouse and controller input cover every core action where a
  controller is available;
- captions and speaker names start enabled;
- required information is not colour-only or sound-only;
- no core action needs drag-only, hold-only, timed, or precise-motor input;
- Research Status, the inbox, and all confirmations have semantic text;
- the active pressure profile cannot change inside an active save;
- 150 percent text and UI scale remains usable at 1280 by 720;
- reduced motion removes non-essential movement and flashes without removing
  required information;
- Interaction Assist highlights only usable objects in the current room; and
- a browser view that is too small pauses safely and gives resize advice.

### Performance, assets, privacy, and release checks

MR-TEST-PERF-001 uses the approved Intel i5 and Iris Xe reference class after
implementation. The evidence names the actual device, driver, operating
system, browser, and browser version. It records:

- 60 frames per second target at 1920 by 1080 Standard;
- 30 frames per second target at 1280 by 720 Low;
- initial compressed download at or below 75 MB, with renewed Leonardo
  approval required above 100 MB; and
- a long-session and act-transition resource check.

Codex may run automated Chromium, Firefox, and WebKit checks. Leonardo will
not perform a manual Safari check. Do not state that Safari is supported
without direct Safari evidence.

MR-TEST-RELEASE-001 checks:

- no actionable wet-lab protocol or claim that the repair state causes
  recovery;
- no credential, private data, real-person material, account, upload,
  telemetry, or unapproved network feature;
- every third-party or generated asset and dependency has public
  redistribution, modification, attribution, and manifest evidence before
  integration;
- no unverified asset appears even in a prototype;
- the future title and brand check occurs before a public remote; and
- the future source release uses the agreed licence plan and credits path.

This is a fiction and release-boundary check. It is not an external scientific
or narrative review.

## Vertical-slice evaluation

The vertical slice is the Week-1-only 20–30-minute evaluation build. It
contains the opening, laser/sham loop, Gabriel queue choice, analysis, compact
manuscript claim choice, and safe save/resume flow.

Its private completion check requires:

1. all applicable automated checks pass;
2. Leonardo completes one Standard-profile run from opening to safe resume;
3. Codex verifies a limited or missed-monitoring fixture as well as the
   routine path;
4. the opening objective, action costs, evidence views, queue choice, claim
   choice, and save behaviour are understandable in the approved content;
5. no blocker exists in save recovery, accessibility, licensed assets, or the
   fiction boundary; and
6. the slice remains a coherent 20–30-minute segment without unexplained
   placeholder content.

Leonardo records each item as pass, needs rework, or not yet checked. The slice
does not pass if any item is needs rework or not yet checked. There is no
participant count, survey score, or external-playtest requirement.

## Fallback and full-game evaluation

Before full expansion, the 90-minute fallback must pass the same private
quality gate with its exact cut line. Leonardo checks its complete campaign,
one constrained evidence path, one weakened path, one available career route,
one no-route result, and an ending-card Archive result. Codex runs the full
automated matrix and private technical review.

Before a release candidate, Leonardo reviews the eight experience criteria:

- the main objective is understandable without academic knowledge;
- each main experiment has an understandable purpose;
- important choices have visible effects;
- the first part can be funny;
- later pressure and discomfort are present;
- publication does not solve precarity;
- industry is attractive but imperfect; and
- at least one choice or ending can prompt thought or discussion.

For each criterion, Leonardo records pass or a concrete change request. All
eight must pass before release preparation. This is private creative review,
not a claim about a general audience.

## Evidence records and known limits

Keep private evidence for future decisions:

- command, state, ending, content, and save-test output;
- coverage and browser-test reports;
- build-size report and manual performance notes;
- Leonardo's private vertical-slice, fallback, and full-game checklists;
- asset and dependency audit records;
- known accessibility and browser limitations; and
- changes made after failed checks.

Do not publish private conversations, save payloads, personal data, or a
private test diary. Any later public case study selects only safe evidence
after a separate review.

Exact Node and package versions, actual assets and codecs, measured frame
rates, browser versions, and a public release date are deliberate later facts.
They are not assumptions or current claims.
