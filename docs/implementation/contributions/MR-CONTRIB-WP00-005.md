---
id: MR-CONTRIB-WP00-005
type: implementation-contribution
status: accepted
work_order: MR-WO-WP00-005
work_package: MR-WP-00
created: 2026-09-02
updated: 2026-09-02
base_commit: cb19a1e99b365aa98f8dbec4e33b9fde31864a5e
provider: OpenAI
model: gpt-5.6-sol
reasoning_level: high
---

# MR-CONTRIB-WP00-005 — Step-3 application-lifecycle submission

## Scope and result

The controlled worker submitted only the approved Step-3 application
lifecycle. One controller now owns the `new`, `starting`, `ready`, `stopping`,
`stopped`, and safe `failed` states; non-restart; one ordered asynchronous
request queue; one controlled frame loop; input-and-loop-first reverse cleanup;
repeat-safe stop; temporary inactive no-game adapters; bootstrap ownership
transfer; public module entrances; and architecture checks.

The visible Step-2 wording, compatibility order, controlled-failure behaviour,
retry path, diagnostic privacy, package, configuration, and frozen interfaces
remain unchanged. The complete primary pre-review audit passed. Independent
technical review and its required narrow current-record correction passed.
The reviewed result is integrated on local `main`, and complete main-branch
validation passed. Leonardo confirmed the expected visible page after repeated
reloads and explicitly accepted Step 3 on 2026-09-02.

## Changed files

- `src/application/controller.ts`
- `src/application/index.ts`
- `src/bootstrap/application-bootstrap.ts`
- `src/bootstrap/index.ts`
- `src/bootstrap/main.ts`
- `src/bootstrap/startup.ts`
- `src/bootstrap/temporary-adapters.ts`
- `src/platform/index.ts`
- `src/platform/timing.ts`
- `tests/e2e/MR-WP-00/start-page.spec.ts`
- `tests/unit/MR-WP-00/application-bootstrap.test.ts`
- `tests/unit/MR-WP-00/application-fakes.ts`
- `tests/unit/MR-WP-00/application.test.ts`
- `tests/unit/MR-WP-00/architecture.test.ts`
- `tests/unit/MR-WP-00/foundation.test.ts`
- `tests/unit/MR-WP-00/platform-timing.test.ts`
- `tests/unit/MR-WP-00/startup.test.ts`

## Authority

Work order: `MR-WO-WP00-005`. Requirements: applicable Step-3 subsets of
`MR-REQ-TECH-001` and `MR-REQ-TEST-001`. Interfaces: application-lifecycle
subset of frozen `MR-IF-001`, applicable timing, startup, and privacy subset of
frozen `MR-IF-014`, and evidence boundary of frozen `MR-IF-015`.

The result supplies partial evidence for `MR-S02-FIX-001`,
`MR-S02-FIX-004`–`007`, and `MR-S02-FIX-009`–`010`. It preserves accepted
Step-2 evidence for `MR-S02-FIX-002` and supplies automated evidence toward,
not completion of, `MR-S12-ACC-003`. It supplies worker and primary-audit
evidence for `MR-S13-CON-001`, `MR-S13-GATE-001`, `MR-S13-GIT-001`,
`MR-S13-OWN-001`, `MR-S13-REV-001`, and `MR-S13-WO-001`.

No frozen interface, requirement, roadmap sequence, or player-visible decision
changed. Step 4 and every public action remain blocked.

## Worker commits

- `d3c11c2a23a6a473d43ecd29d377d6eb34b691f2` — `MR-WP-00 Add application lifecycle controller`.
- `f4130acb6f555cb55ff09f30b5f89e3ca49a4d89` — `MR-WP-00 Connect lifecycle to safe startup`.

## Integrated commits

- `d2a63f5e4c516036380c4adaaf634d4e1e62534b` — integrated worker commit
  `d3c11c2a23a6a473d43ecd29d377d6eb34b691f2`.
- `d26ffe119040dd16ba3ff4f22ffcf90375de570a` — integrated worker commit
  `f4130acb6f555cb55ff09f30b5f89e3ca49a4d89`.

The 17 integrated paths match the reviewed worker head exactly.

## Commands and results

The worker verified the exact clean branch, base commit, Node `24.20.0`, npm
`11.19.0`, protected-file hashes, and absent remote before editing. Its six
focused Step-3 files passed 41 tests. `npm run check` passed 111 tests.
`npm run build` passed with 16 transformed modules. The Step-3 start-page flows
passed six checks, and the preserved Step-2 failure flows passed nine checks
across Chromium, Firefox, and WebKit.

Worker `npm run verify` passed lint, formatting, 111 unit tests, coverage, the
16-module build, and all 15 browser flows. Coverage was 90.41 percent
statements, 88.77 percent branches, 79.91 percent functions, and 93.27 percent
lines. The worker's scope, protected-file, production, network, source-map,
privacy, exact-wording, Git-whitespace, remote, and clean-state checks passed.

The primary agent independently repeated `npm run check`: all eight unit files
and 111 tests passed. Primary `npm run verify` passed lint, formatting, the same
coverage, the 16-module production build, and all 15 Chromium, Firefox, and
WebKit flows. Controlled browser-failure logs were expected test evidence.

The complete primary audit verified the exact two-commit range and 17 owned
paths; public entrances and allowed import direction; no circular or private
cross-module import; exact lifecycle, startup order, request serialization,
stable-frame order, typed failure, non-restart, input-and-loop-first shutdown,
reverse cleanup, and repeat-safe stop evidence; unchanged package, lockfile,
configuration, thresholds, and coverage ignores; no Three.js, campaign, save,
storage, telemetry, external request, source map, production console path, or
unapproved browser object in the new lifecycle surface; exact visible wording;
production output; Git whitespace; clean worker head; and absent remote. It
found no blocker, required correction, unsupported claim, privacy issue, or
scope change before independent review.

## Independent review

On 2026-09-02, a fresh independent OpenAI `gpt-5.6-sol` reviewer using `xhigh`
reasoning reviewed authority commit
`2ca6cc8b71bb356cad6d902f5a2efb8054b8c56d` and the exact worker range
`d3c11c2a23a6a473d43ecd29d377d6eb34b691f2` through
`f4130acb6f555cb55ff09f30b5f89e3ca49a4d89`. It found no blocker, advisory
finding, code, runtime, interface, privacy, network, test-contract, or scope
problem. It found one required record-only group: the design index retained
activation wording, and development status named the older activation commit
as the last committed checkpoint.

The primary agent corrected those two current references and reconciled the
current records with the passed review. Focused formatting, repository,
reference, whitespace, staged-scope, and diff validation passed. S13 requires
no fresh review because this narrow correction changes no authority, evidence
meaning, interface, requirement, code, runtime, dependency, security, privacy,
accessibility, or test contract. The exact two worker commits are technically
approved for integration and are now integrated on local `main`.

## Corrections

The first two write attempts were rejected until Leonardo directly approved
the disclosed cross-workspace implementation risk; neither attempt changed a
file. The first formatter and test runs then met the expected outside-workspace
write restriction and were repeated with narrow approved access.

During implementation, the worker removed invalid freezing of mutable
controller and timing instances, restored synchronous Step-2 cancellation,
corrected one unit-test microtask assumption, and added a bounded
`ApplicationStartupError` so the typed application fault follows the lint and
sanitized-bootstrap boundary. All later focused and complete checks passed.

## Known limitations

- This is partial S02 evidence. It does not implement or complete
  `MR-S02-FIX-003`, `MR-S02-FIX-008`, or complete `MR-S12-ACC-003`.
- The request queue uses only the approved closed settings-or-local-data
  `clearSavedData` request with a temporary no-op persistence port. It proves
  ordering without creating or reading saved data.
- Temporary ports use frozen empty plain data and no campaign, content, save,
  DOM, IndexedDB, audio, Three.js, or external object.
- The real timing adapter owns one `requestAnimationFrame` loop with zero first
  and resume delta, non-negative delta, a 0.05-second cap, and repeat-safe
  pause and stop. The temporary platform adapter does not yet install a real
  visibility listener.
- No campaign state, rules, content validation, real persistence, game UI,
  input binding, Three.js scene, gameplay, asset, performance measurement,
  remote, licence, deployment, publication, or Step-4 result exists.

## Leonardo decision

Leonardo approved the exact Step-3 plan and later directly approved its
disclosed cross-workspace implementation. On 2026-09-02, he checked the
integrated local page, supplied a screenshot that showed the four expected
lines, reported that repeated reloads kept the same result, and explicitly
accepted Step 3. The raw screenshot and its machine path are not stored. This
acceptance does not approve Step 4.
