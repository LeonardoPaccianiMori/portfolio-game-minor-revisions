# Testing and Evaluation

Status: **B09 documented; later evaluation thresholds unresolved**

## Evaluation sequence

1. Complete the design-readiness gate.
2. Build and evaluate a 20–30-minute vertical slice containing one complete
   experiment cycle, a consequential failure, a PI interaction, a manuscript
   update, exploration, and save/resume.
3. Continue to full production only if the loop is understandable, enjoyable,
   technically feasible, and capable of carrying the satire.
4. Evaluate the 90-minute fallback before expanding to the approximately
   three-hour target.

## B09 technical test and quality contract

Use Vitest for pure game rules, typed commands, state transitions, Zod
schemas, migrations, deterministic seed behaviour, and ending-state fixtures.
Rules tests must prove that reload cannot reroll a locked outcome and that a
valid command cannot create an invalid state.

Use Playwright for browser flows. Required flows include compatibility failure,
New Game, pressure-profile lock, save and reload, active-save replacement,
backup recovery, keyboard interaction, browser-view safety, 150% UI scale, and
key accessibility settings. Run Playwright on Chromium, Firefox, and WebKit.
WebKit evidence is useful compatibility evidence, but it is not a Safari claim.

Use ESLint for TypeScript quality and Prettier for configured formatting.
After implementation is authorized, `npm run check` runs type, lint, format,
and unit checks; `npm run test:e2e` runs browser tests; `npm run build` creates
the production build; and `npm run verify` runs the complete local quality
gate. No code or package configuration is authorized by this requirement.

After Leonardo approves a public GitHub remote, GitHub Actions may run the same
checks on pushes and pull requests. It must not deploy the game, require a
deployment secret, collect player data, or change the local-only data model.
Coverage percentages and exact test-count targets remain B10 decisions.

## Required test domains

### Systems

- Experiment outcomes follow inspectable causes and bounded variability.
- Time, energy, evidence, PI confidence, integrity, and relationships update
  consistently.
- Authored events do not deadlock or become impossible after valid choices.
- Manuscript history and route readiness remain coherent.

### Narrative and content

- Every reachable branch has required dialogue, captions, and consequences.
- Contradictory requests are intentional and comprehensible.
- The satire remains bitterly comic without requiring insider expertise.
- No text accidentally identifies or reproduces real people or institutions.

### Saves

- Close/reload and connection interruption preserve the last safe state.
- Cutscene skip, choice confirmation, and act transition cannot corrupt saves.
- Schema migration, invalid data, and fallback recovery are tested.

### Accessibility and UX

- Keyboard-mouse and controller controls, first-person motion, text, captions,
  contrast, timing, and irreversible choices meet the approved B08 baseline.
- Players can understand experimental evidence without wet-lab expertise.
- At 150% text and UI scale, required controls, captions, prompts, and state
  information remain usable at 1280 × 720.
- Reduced motion removes non-essential motion and flashes without hiding
  information or blocking play. Interaction Assist highlights only usable
  objects in the current room and never becomes a path or objective arrow.
- A small browser view pauses safely and gives resize advice. Required UI
  remains usable in 16:9, wider, and 4:3 desktop windows.

### Performance and compatibility

- The supported desktop-browser targets are current Chrome, Edge, and Firefox.
  Safari is best-effort only. Do not make a public Safari-support claim without
  direct Safari evidence.
- The approved reference class is an 11th-generation Intel i5, Intel Iris Xe,
  16 GB RAM, and current Chrome. Performance evidence must record the exact
  device model, graphics driver, operating system, browser, and browser
  version.
- Manual profiling must measure the B08 target of 60 fps at 1920 × 1080
  Standard and 30 fps at 1280 × 720 Low on the reference class. CI cannot make
  a truthful frame-rate claim by itself.
- The initial compressed download is no more than 75 MB and does not exceed
  100 MB without renewed approval. A local build audit reports this size.
- Long sessions and repeated act transitions do not leak material resources.
- Browser preflight must report missing WebGL2, IndexedDB, ES modules, Web
  Audio, pointer lock, or controller support correctly. It must block campaign
  creation for missing WebGL2, IndexedDB, or ES modules.

### Science, privacy, and licensing

- Public scientific wording respects the fictional boundary.
- No actionable protocol, credential, private data, or unapproved telemetry is
  present.
- Every distributed asset and dependency has compatible provenance and
  attribution.
- Each third-party or generated asset appears in the asset manifest before
  integration, has public-repository and deployed-game redistribution rights,
  permits required modification, and has an attribution path in the repository
  and Credits/Licences page.

## B08 acceptance checks

- Verify that every important cue has a text, icon, or visible-state duplicate;
  colour and sound never carry required information alone.
- Verify captions and speaker names default on, and that muted dialogue sounds
  do not remove required dialogue meaning.
- Verify New Game, fixed pressure profile, one-active-save confirmation,
  completion archive, Clear Saved Data, and cutscene-recap behaviour.
- Verify that no account, server save, uploaded player data, save cookie, or
  automatic unfinished-save expiration is present.
- Verify that the first New Game shows the approved content note and that the
  release does not imply mobile, tablet, or localization support.

## Approved experience criteria

Playtests must check these B00 requirements:

- A player without academic experience can explain the main objective.
- A player can understand why each main experiment matters.
- A player can identify visible effects from important choices.
- The first part can cause laughter.
- The later parts create pressure and discomfort.
- The ending communicates that publication does not solve academic precarity.
- The industry route is attractive but imperfect.
- At least one choice or ending gives the player a reason for discussion.

B10 must set the playtest method, sample sizes, and numeric pass thresholds.

## Evidence to retain

- Automated test output and coverage appropriate to the chosen architecture.
- State-transition and ending-matrix test fixtures.
- Performance captures for representative devices.
- Build-size audit output, package lockfile, and runtime dependency security
  and licence review results.
- Playtest protocol, participant context, observations, and changes.
- Accessibility review and known limitations.
- Asset and dependency audit.

## Open decisions

- Numeric success thresholds for the vertical slice and full game.
- Playtest audience, sample size, tasks, consent, and feedback instruments.
- Exact coverage expectations, browser-fixture depth, and test-count targets.
- Measured performance results, exact reference-device details, and a later
  decision on whether to obtain direct Safari evidence.
- Scientific and narrative review process before publication.
- Stop/reframe thresholds after the vertical slice.
