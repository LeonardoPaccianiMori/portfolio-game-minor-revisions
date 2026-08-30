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
| MR-TEST-VISION-001 | Comprehension, engagement, comedy, and pacing | Clean-context comprehension result plus Leonardo's slice, fallback, and full-game vision checks |
| MR-TEST-CONT-001 | Content data and English strings | Validated IDs, references, counts, text keys, word count, and fiction-boundary scan |
| MR-TEST-EXP-001 | Experiment actions and outcomes | Unit fixtures for all six full-build templates or the approved four-template fallback composition, repeats, bands, monitoring, and result/evidence separation |
| MR-TEST-NARR-001 | Calendar, mandatory scenes, records, and manuscript | Unit and browser paths for every required scene and fixed gate |
| MR-TEST-CHAR-001 | Optional scenes and career routes | Window, expiry, trust, concern, credit, contextual-line, and Morrow/Aldercroft fixtures |
| MR-TEST-WORLD-001 | Floor states and environmental content | Act rosters, scene anchors, environmental display, no required optional fact, and no trapping path |
| MR-TEST-END-001 | Ending resolver and Archive | All valid route states, 29 modules, 12 Citations, exact compact cards, newest-first order, and 12-card retention |
| MR-TEST-SAVE-001 | IndexedDB persistence and recovery | S07 save, recovery, migration, completion, clearing, concurrency, repair, and failure fixture groups |
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
- A content scan that rejects missing, orphaned, or duplicate text keys;
  duplicate IDs; invalid dependencies; unbounded content generation; wrong
  counts; and English text above 6,000 unique words.
- A design-document scan that rejects interrupted Markdown tables and
  conflicting approved numeric claims across authoritative documents.
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
- all six full-build templates, or the approved fallback composition of
  laser/sham, combined range/repair, batch, and oxygen, expose their approved
  baseline-preserving and higher-risk family choices without operational
  laboratory detail;
- Stable, Stressed, Failing, Ready, Limited, Unavailable, each missed window,
  and one valid stabilizing action produce the exact approved issue count;
- zero, one, two, and one-severe-issue fixtures produce Robust, Mixed,
  Compromised, and Compromised respectively;
- Unavailable equipment blocks normal start and offers only a valid authored
  room-state route;
- the locked variation value survives closing and reloading while later saved
  monitoring can still change the projected and final preparation band;
- final Robust, Mixed, and Compromised bands select only their approved Strong,
  Limited, or Weak results;
- matched and limited controls, structure, rhythm, paired observation, quality
  monitoring, missed coverage, zero-energy fatigue, and raw-record conflict
  change only evidence quality;
- paired observation without the quality-check monitor does not give full
  paired coverage;
- Usable, Inconclusive, Worth repeating, and Suspicious each resolve through
  their approved priority and definition;
- a suspicious raw record does not set a misconduct flag, while a later
  raw-versus-reported mismatch remains an integrity event;
- analysis always shows raw observations first, then stores one primary
  reading and at least one caveat;
- stopping frees the active slot, loses the current sample and elapsed work,
  preserves earlier archived records, creates no evidence card, and names a
  relevant expiring opportunity;
- the repair state is associated with recovery but is never represented as
  demonstrated cause; and
- no valid path needs a perfect outcome or a crash.

The rules suite must also reproduce the updated paper fixture counts: minimum
defensible demand of 44 periods and 26 energy before late-work surcharge;
thorough-honest demand of 56 periods and 30 energy; and maximizing demand of
79 periods and 46 energy. The optimistic Standard totals are 55, 69, and 100;
the Supported totals are 51, 65, and 93. It must not claim that the
thorough-honest fixture fits either profile until a later approved balance
decision changes the input rules.

The minimum-defensible fixture must remain achievable in both profiles while
giving up meaningful optional work. No fixture can require personal misconduct
or force a Compromised result. Hidden misconduct creates no automatic
maintenance task, detection roll, moral punishment, or route penalty.

The manuscript and PIIM fixtures must show that:

- all fixed manuscript positions enforce capacity and valid card references;
- Careful, Strong, and Inflated use their exact factual requirements for every
  packet band, while an incomplete commit remains possible;
- honest evidence cannot fill Inflated causal support, but a changed or
  unsupported reported reading can appear to fill it when no visible conflict
  exists;
- every batch, oxygen, and claim-scope card reaches Met, Partly Met, and Not
  Met through its stated rule;
- all three PIIM outcome bands are reachable, including one middle-band path
  with a Developing packet and honestly stated limitations;
- an honest absent-result statement can unlock `MR-CIT-03` without improving
  the related paper-response card;
- each reviewer selects exactly one of two visible-state forms and preserves
  that form after reload; and
- **What We Had** is reachable only after the initial draft and mandatory
  Week-6 contradictory revision are both committed.

MR-TEST-NARR-001 and MR-TEST-CHAR-001 must show that:

- all seven mandatory scenes occur once in the fixed campaign calendar;
- a scene waits for a safe stopping point and never interrupts a required
  equipment action;
- all ten optional scenes use their stated condition, window, expiry, and
  saved result;
- `FLAG:openingCaution` selects its Week-5 dialogue variation and changes no
  mechanic;
- all eight character-context lines use their stated person, anchor, window,
  and once-only state without a choice, cost, or trust effect;
- each of the five support results requires its supportive choice, Working or
  better trust, no breach, and unused state; fires once only; and produces its
  exact bounded effect without improving a PIIM card directly;
- an imaging-service waiting route adds one period, while earned Gabriel
  support adds zero and saves exactly one period without changing normal
  experiment costs;
- every concern fixture proves its stated visibility, correction history,
  denial result, no-cost deferral reminder, ignored-reminder trust loss, and
  Week-13 serious-concern transition;
- correction grants trust and limited integrity recovery once per concern and
  never rewrites a raw record or committed snapshot;
- the fallback removes Gabriel's Queue scene, retains his Archive scene and
  the basic queue routes, and makes MR-CIT-08 reachable through a valid concern
  from Samira or Gabriel, including one honest-limitation path;
- ignored Morrow messages close only the stated industry route;
- Morrow requires three analysed records and one honest limitation or caveat,
  but not a weak result, publication, a Coherent packet, or drug exposure;
- an analysed drug record selects exactly one useful, mixed, or unreliable
  Camila acknowledgement without changing Morrow eligibility or a PIIM card;
- Aldercroft requires the plan, Coherent or Substantial evidence, Supportive or
  Invested Elena's paper confidence or at least 41 Elena trust, and no
  unresolved serious concern;
- keeping both routes open adds no cost; the irreversible final choice records
  the unchosen route and shows its gains and losses;
- public-record withdrawal closes both routes and selects the separate
  `publicWithdrawal` End of Contract text without increasing the 29-module
  count; and
- a hidden integrity problem alone does not create an unsupported route block.

The calendar fixture must also show that Weeks 8–9 have no open experiment
template but retain their approved manuscript, journal, career, and
relationship work. A private full-campaign prototype must record whether Weeks
15–16 ever force idle waiting. If it does, return `MR-REV-007` for a new design
decision; do not add filler as a test workaround.

MR-TEST-CONT-001 and MR-TEST-END-001 must show that:

- the content catalogue has the approved full and fallback counts;
- every authored line has an English text key;
- every meaningful action and material effect has a valid forecast or reason
  key, with no runtime prose generation;
- all five queue lines and five exit responses select only by act state;
- all six internal reactions fire once at their exact trigger and change no
  game state;
- all fourteen `MR-CTX-*` objects ship in full and fallback builds;
- no runtime path generates dialogue or a report;
- all twenty-nine ending modules select in the approved order;
- the four paper states do not change randomly after Week 16;
- Departures retains the twelve newest ending cards without empty slots or a
  completion count, while Institutional Citations remains a separate visible
  persistent 12-item collectible set;
- one relationship receives the dramatized afterbeat and the People summary
  selects one existing consequence sentence for all five characters;
- Camila's call uses the desk monitor, original 2D portrait role, captions, and
  non-lexical sounds, with no 3D model, lip sync, full voice, or recorded video;
  and
- no Citation requires unethical play.

The content test measures the actual build-specific strings.en.json after
lowercasing and punctuation removal. It must contain no more than 6,000 unique
English words, and it must not bundle strings excluded from that build.

MR-TEST-WORLD-001 and MR-TEST-CONT-001 must also show that all three
operational room states have their exact trigger, window, forecast, expiry,
fallback, and two-or-more valid routes. No uncatalogued room state can block
work. Optional desk content must refer to a defined character, career, wording,
or room-state object. The R01 demand fixtures exclude conditional
room-response periods, and a wait route adds exactly one period and no energy.
The same tests must reproduce the exact five-stage background roster, preserve
every required or optional actor override, and keep Week 15–16 background
presence empty. Exactly ten environmental items use the one-time close-range
glance rule. The other twenty require focused inspection. Live-text and SVG
accretion must use only the existing thirty IDs and must not change collision,
architecture, or required information.

### Save, interruption, and technical checks

MR-TEST-SAVE-001 and MR-TEST-TECH-001 must show that:

- safe points save after experiment-stage changes, monitoring choices,
  analysis archiving, manuscript commits, and scene boundaries;
- browser closure, connection loss, menus, and pause never advance game time;
- the active campaign is validated before save and the prior valid state is
  available as a backup;
- exact retry does not rotate backup, while an older, conflicting, invalid,
  over-1-MiB, quota-failed, or concurrent-tab write changes no record;
- a damaged or missing active save offers valid backup without silently
  selecting or changing it;
- every failed database, record, campaign-schema, or content migration
  preserves its source;
- campaign completion atomically stores sequence, ending card, Citation merge,
  newest-12 retention, metadata advance, and active and backup deletion;
- New Game confirms atomic active-save replacement;
- targeted confirmed repairs preserve unrelated valid data; and
- Clear Saved Data confirms before whole-database deletion, closes connections,
  reports blocked deletion, and never claims partial success.

S12 must encode `MR-S07-SAV-001`, `MR-S07-REC-001`, `MR-S07-MIG-001`,
`MR-S07-CMP-001`, `MR-S07-CLR-001`, and `MR-S07-FLT-001` with the exact S07
inputs, results, failure codes, and unchanged-store expectations.

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
- the rack and imaging focused views support select, confirm, back, free view
  switching, and non-dexterity use through keyboard-mouse and controller;
- projected preparation bands show Robust, Mixed, or Compromised with reasons
  but no exact probability, and resolved results identify player-controlled
  factors;
- the stop confirmation states slot, sample, elapsed-work, earlier-record,
  evidence-card, and relevant-expiry consequences;
- the active pressure profile cannot change inside an active save;
- 150 percent text and UI scale remains usable at 1280 by 720;
- reduced motion removes non-essential movement and flashes without removing
  required information;
- Interaction Assist highlights only usable objects in the current room; and
- close-range environmental text uses semantic scaled text, yields to a
  higher-priority interaction, and receives no Interaction Assist marker; and
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

The slice records station visits, total traversal seconds, traversal share of
session time, monitoring visits with no decision, confirmations per minute,
contextual lines displayed, and environmental lines read. These are private
development measurements, not telemetry. Do not set an arbitrary numeric pass
limit before prototype evidence exists. Before the first run, Leonardo and
Codex record the qualitative questions that the measurements will answer:

- Does travel create a short decision pause, or does it dominate useful play?
- Does every required monitoring visit reveal a decision, changed state, or
  meaningful consequence?
- Does each confirmation protect a material or irreversible choice, or does it
  only repeat information?
- Do contextual and environmental lines add comic or human texture without
  hiding factual status?
- Does any required repeated action feel like filler?

Leonardo records each answer as pass or a concrete rework request. Measurements
support the judgment but cannot prove that the loop is fun. After the slice,
later approved tuning can set a numeric concern band when the evidence makes
one useful.

## MR-TEST-VISION-001

This private test has two parts. First, a fresh Codex context receives only the
actual build-specific player-facing strings and representative captures of the
current objective, the three evidence views, Research Status, and the relevant
choice screens. It receives no numbered design document, review report, hidden
formula, or intended answer. It must explain:

1. the campaign objective and deadline;
2. why the laser-and-sham task matters;
3. what the repatterning index can and cannot show;
4. what a Thin evidence packet means for the current work; and
5. the cost and likely consequence of the shown choices.

An absent, materially wrong, or unexplained insider-only answer creates a
specific rewrite request and a new clean-context run. This checks
comprehension only. It does not test humour, emotional response, broad audience
appeal, or scientific accuracy.

Second, Leonardo checks that active play remains engaging and absurdist while
the arc becomes darker: repeated work and travel have purpose; the first act
can be funny; later comedy can become darker or less frequent but does not
disappear; pressure does not remove meaningful agency; and the final result is
bitter but human. Each item receives pass or a concrete rework request. The
test passes only when both parts pass.

## Fallback and full-game evaluation

Before full expansion, the 90-minute fallback must pass the same private
quality gate and `MR-TEST-VISION-001` with its exact cut line. Leonardo checks
its complete campaign, one constrained evidence path, one weakened path, one
available career route, one no-route result, and an ending-card Archive result.
Codex runs the full automated matrix and private technical review.

For every documentation change before implementation, check that Markdown
tables have no blank-line interruption, text keys are unique inside the
catalogue, and scene-time, experiment-count, prop-count, and other approved
numeric claims agree across authoritative files. Report a conflict instead of
silently selecting one value.

Before a release candidate, Leonardo repeats `MR-TEST-VISION-001` and reviews
the experience criteria:

- the main objective is understandable without design documents or academic
  knowledge;
- each main experiment states an understandable question and consequence;
- important choices have visible effects;
- repeated work and travel do not become filler;
- the first part can be funny, and later active play keeps darker comic or
  absurd responses;
- later pressure and discomfort are present without removing agency;
- publication does not solve precarity;
- industry is attractive but imperfect; and
- at least one choice or ending can prompt thought or discussion.

For each criterion, Leonardo records pass or a concrete change request. All
must pass before release preparation. This is private creative review, not a
claim that every player will have the same response.

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
