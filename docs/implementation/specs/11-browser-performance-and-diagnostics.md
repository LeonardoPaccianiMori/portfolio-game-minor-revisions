# S11 Browser, Performance, and Diagnostics

Status: **documented specification; implementation and measured evidence prohibited**

## Purpose and boundary

This specification defines the browser check, graphics profiles, performance
and resource budgets, measurement method, local diagnostics, privacy boundary,
and response to a failed measurement. It completes candidate `MR-IF-014`.

It does not create a browser check, renderer, performance test, diagnostic
record, package file, source file, asset, or measured result. The values in
this document are approved targets. They are not evidence that a future build
meets them.

The numbered design documents remain authoritative for player-visible meaning.
S01 owns the toolchain and planned repository paths. S02 owns bootstrap and
module lifecycle. S07 owns game persistence. S08 owns movement timing. S09 owns
screens, input, settings, and accessibility. S10 owns rendering, resources,
graphics-context recovery, and audio. S12 later defines the fixture contract
named here. S14 later completes the contradiction and interface-freeze audit.

## Plain-language terms

| Term | Meaning |
|---|---|
| Compatibility probe | A small temporary check that asks whether a browser feature is present and usable. |
| Pixel ratio | The internal drawing resolution relative to the visible browser area. It does not change HTML text clarity. |
| Frame | One visual update. Campaign time does not advance because a frame occurs. |
| Draw call | One instruction that sends a group of objects to the graphics processor. |
| Rendered triangle | One basic 3D surface processed for a frame, including applicable shadow work. |
| Warm-up | A short period before recording results, so one-time start work does not distort normal-play evidence. |
| Slowest 1 percent | The average rate across the slowest one percent of recorded frames. It reveals stutter that a simple average can hide. |
| Sanitized | Restricted to approved safe fields, with private or uncontrolled technical text removed. |
| MiB | 1,048,576 bytes. |
| GiB | 1,073,741,824 bytes. |

## Supported browser boundary

The supported first-release targets are the latest stable desktop Chrome,
Edge, and Firefox major versions available when the release candidate is
tested. The evidence records the exact browser version, operating system,
graphics driver, date, and game commit. Public wording states the tested
versions and date. It does not create a permanent promise for later browser
versions or untested operating systems.

Automated browser flows use Chromium, Firefox, and WebKit. A WebKit result is
extra functional evidence and is not a Safari-support claim. Safari remains
best effort because direct Safari testing is outside the approved plan. Mobile
and tablet browsers remain outside the first release.

Compatibility is decided by direct feature checks. Browser name, version, and
user-agent text never decide whether the game can start.

## Compatibility report

`checkCompatibility()` returns one immutable version-1 plain record. The
record contains:

- `schemaVersion: 1`;
- `overall`: `supported`, `degraded`, or `blocked`; and
- exactly six capability entries in the fixed order below.

Each entry contains only:

- stable capability ID;
- `required`, a Boolean;
- `status`: `ready`, `unavailable`, or `failed`; and
- one stable safe reason code or `null`.

| Order | Capability ID | Required | Ready meaning |
|---:|---|---:|---|
| 1 | `esModules` | Yes | The module entry executed. |
| 2 | `webgl2` | Yes | A temporary WebGL2 context was created. |
| 3 | `indexedDb` | Yes | An empty temporary database was created, closed, and deleted. |
| 4 | `webAudio` | Yes | The standard browser audio interface is present. |
| 5 | `pointerLock` | Yes | The standard request and exit functions are present. |
| 6 | `controller` | No | The standard controller interface is present. |

All required entries ready gives `supported`. A controller entry that is not
ready while every required entry is ready gives `degraded`. Any required entry
that is not ready gives `blocked`. One screen lists every blocking result; the
game does not reveal them one at a time.

The report contains no browser name, version, device detail, saved-data fact,
campaign fact, player name, timestamp, random identifier, or raw error.

## Probe order and lifecycle

The browser checks run in the exact capability order above. JavaScript-module
support uses the module entry and a static non-module fallback. WebGL2 uses a
temporary canvas with the approved S10 context attributes. The canvas and its
context become unreachable after the result is recorded.

The IndexedDB check uses one empty temporary database named
`minor-revisions-capability-probe`. It reads no existing database. It creates no
store and records no game, player, browser, or device fact. The platform module
closes and deletes it before returning. S07 persistence remains the only owner
of the `minor-revisions` game database and its records.

`checkCompatibility()` is asynchronous because the storage probe is
asynchronous. Only one check can be active. A second call while one is active
returns a typed already-running result and starts no work. Cancellation closes
temporary handles, requests deletion of the probe database, releases the
temporary graphics reference, and returns no partial accepted report. Retry
starts a new complete operation only after the earlier operation has settled.

The platform check reads no campaign or saved data. Expected missing support
and failed probes are typed results, not thrown browser errors.

## Permission and later-failure boundary

The presence check does not pretend that later player permission has already
succeeded. Audio unlock happens through S10 after the player's first accepted
menu action. If the initial audio context cannot be created or resumed, no
campaign is created or loaded. The menu remains safe and the failure path uses
the approved diagnostic and recovery controls.

Pointer lock is requested only when entering free movement. Refusal leaves the
campaign unchanged and offers **Try Again** or **Return to Main Menu**. A
player can connect or disconnect a controller later; controller connection is
therefore live input state rather than a new compatibility report.

An accepted startup report is not rewritten. A later graphics, persistence,
audio, pointer-lock, or controller failure follows its owning S07, S09, or S10
path. It cannot change campaign truth or silently restart the application.

## Player-facing compatibility result

The S09 boot screen retains its approved stages and blocking-screen shape. The
required capability reasons are:

| Capability | Plain reason |
|---|---|
| `webgl2` | **3D graphics are not available.** |
| `indexedDb` | **Local saved data is not available.** |
| `esModules` | **This browser cannot run this version of Minor Revisions.** |
| `webAudio` | **Required browser audio is not available.** |
| `pointerLock` | **The browser cannot provide the mouse control required for movement.** |

The screen states that campaign data did not change. It offers **Retry Check**
and safe browser guidance without a runtime external link. Missing controller
support uses the non-blocking message **Controller input is unavailable. Use
keyboard and mouse.**

## Exact graphics profiles

Standard remains the default. The player selects quality. The game never
changes it automatically.

The canvas drawing ratio is the smaller of the browser device-pixel ratio and
the profile cap. The cap does not enlarge a low-density display beyond its
native density.

| Profile | Pixel-ratio cap | Full-detail rooms | Cosmetic particles | Directional shadow map | Frame ceiling |
|---|---:|---:|---:|---:|---:|
| Low | `0.75` | 2 | 100 | Off | 30 fps |
| Standard | `1.00` | 2 | 300 | `1024 x 1024` | 60 fps |
| High | `1.50` | 3 | 500 | `2048 x 2048` | 60 fps |

Required objects, station state, science meaning, interaction targets,
captions, warnings, accessibility content, and semantic HTML remain present in
all profiles. The particle values apply only to cosmetic particles. The S10
static or bounded required science cues remain intact.

A graphics change applies from Settings. If drawing-buffer or resource
allocation fails, rendering returns to the last complete valid profile and
shows one plain warning. The failed profile is not stored. Low can be
recommended after poor measured runtime speed, but the player makes the
change.

## Frame-rate and processor targets

The approved reference class is an 11th-generation Intel i5 with Intel Iris Xe
graphics and 16 GB RAM. Future evidence must identify the actual device model.

| Profile | Viewport | Average pass floor | Slowest-1-percent floor | Central-processor 95-percent limit | Graphics-processor 95-percent limit |
|---|---:|---:|---:|---:|---:|
| Low | `1280 x 720` | 29 fps | 24 fps | 12 ms | 28 ms |
| Standard | `1920 x 1080` | 57 fps | 45 fps | 8 ms | 14 ms |
| High | `1920 x 1080` | 29 fps | 24 fps | 12 ms | 28 ms |

Low and High therefore target 30 fps; Standard targets 60 fps. The pass floors
allow normal display timing near 29.97 or 59.94 while preserving the intended
target. Central- and graphics-processor measurements are separate overlapping
work, so their values are not added together.

Low draws at most 30 frames per second. Standard and High draw at most 60.
A display above 60 Hz does not make the game draw extra frames. A display below
60 Hz remains usable but cannot provide valid 60-frame evidence.

## Per-frame scene and live-resource budgets

The budgets include the main render and applicable shadow work.

| Profile | Draw calls per frame | Rendered triangles per frame |
|---|---:|---:|
| Low | 150 | 250,000 |
| Standard | 250 | 500,000 |
| High | 350 | 750,000 |

At one time, the renderer owns no more than:

- 40 compiled graphics programs;
- 160 textures; and
- 300 geometry objects.

Shared resources count once. Old-session, closed-scene, replaced, and cancelled
resources disappear from live counts after safe cleanup. A profile fails its
workload budget even when one short frame meets its rate target.

File reading, large decoding, and first-time graphics-program compilation do
not occur inside the visible frame callback. Required starting resources are
prepared before **Ready**. Later-act preparation can use already downloaded
files in the background outside the frame loop. It finishes before the asset
is visible and produces no pop-in or campaign-time change.

## Memory and download budgets

After initial loading on the reference computer, the targets are:

| Resource | Limit |
|---|---:|
| JavaScript working memory | 192 MiB |
| Calculated owned graphics resources | 384 MiB |
| Decoded audio | 96 MiB |
| Complete browser-tab working set | 1 GiB |

Browsers do not expose a portable exact graphics-memory value. The graphics
figure is calculated from owned texture formats and dimensions, geometry
buffers, shadow and drawing buffers, and other owned render targets. The
calculation method and inputs remain in the evidence summary.

The first clean visit transfers no more than 75 MB, where one MB is 1,000,000
bytes. It includes every file required before Continue or New Game becomes
available. Source maps, tests, reports, and local evidence are not shipped and
do not count. Browser cache does not reduce the clean-first-visit result.

| Initial transfer | Result |
|---|---|
| At or below 75 MB | Pass. |
| Above 75 MB through 100 MB | Target failure; optimize or obtain a separate approved exception. |
| Above 100 MB | Blocked until Leonardo renews approval. |

IndexedDB remains game-data storage and is not an asset cache.

## Loading and long-session targets

With files already downloaded, the production build on the reference computer
and current Chrome must reach **Ready** from page start within 20 seconds at
Standard. Opening a new or saved campaign from the ready menu must finish
within 5 seconds. Internet transfer time is excluded because it varies; the
download budget controls its bounded part.

The long-session check lasts 60 minutes. It repeats station entry and exit,
scenes, every act transition, return to title, and campaign reload. After
normal cleanup and a stable comparison point, JavaScript working memory can be
no more than 10 percent above its warmed baseline. Closed resources, audio
sources, listeners, callbacks, and old-session objects cannot remain active.
Continued growth or retained closed resources is a release blocker.

## Visibility and local advisory sampling

When the page becomes hidden, the visual loop pauses, held input clears,
pointer lock releases, and no performance sample is recorded. Returning starts
with zero movement and discards missing real time. Campaign time never advances
because the page was hidden.

The production game can keep one in-memory advisory frame sample during free
movement. It waits 5 seconds, then measures two consecutive 10-second windows.
A warning is eligible below 45 fps on Standard or High, or below 24 fps on Low.
Loading, menus, focused interfaces, cutscenes, hidden pages, and browser
interruptions are excluded.

The warning appears at most once per application session and never pauses
play. High recommends Standard. Standard recommends Low. Low recommends closing
heavy applications or using a smaller browser window. The player can open
Display Settings or dismiss the warning.

The game does not read processor count, browser device-memory hints, battery
state, network speed, graphics-card identity, or similar device-fingerprinting
facts. Advisory samples remain in memory, enter no campaign or save, and are
not formal release evidence.

## Performance scenarios

Formal performance evidence uses five fixed deterministic situations:

1. clean initial loading;
2. the busiest permitted normal floor view;
3. the imaging station with its science display active;
4. the most demanding cutscene; and
5. a late act change followed by movement through every room.

The busiest floor view uses the applicable maximum nearby detail, physical
characters, approved lights, shadow casters, particles, and effects. S12 owns
the exact executable snapshot or route identifiers. The content and visual
state remain identical across repeated runs of one profile.

## Valid measurement environment

A valid performance check uses:

- the production build served locally;
- the exact tested commit and content profile;
- a clean browser profile with no extensions;
- hardware acceleration enabled;
- normal plugged-in power and no overclocking;
- 100-percent browser zoom and the exact viewport;
- heavy background applications closed; and
- an empty cache for download evidence or a warmed cache for frame evidence.

Frame, processor, graphics, and memory values come from the browser's built-in
local performance tools. Chrome supplies the detailed processor, graphics,
and memory breakdown because other browser tools report them differently. A
development-server result cannot replace production-build evidence.

Each active performance scene receives a 60-second warm-up followed by three
separate 3-minute measurements. The median result determines the pass. Loading,
a complete cutscene, and an act transition use their full natural duration
rather than an artificial three-minute loop. A failed run cannot be discarded
unless an external interruption is recorded.

Chrome, Edge, and Firefox must meet the profile frame-rate targets on the
reference computer. Detailed processor and memory limits are release evidence
from Chrome only. WebKit receives automated functional checks, not a frame-rate
claim.

## Measurement evidence record

Raw browser-profiler exports can exist temporarily only in the S01 ignored
local performance-artifact path inside this repository. They are not committed
or published. A sanitized tracked summary contains:

- evidence ID and date;
- commit and content profile;
- scenario and graphics profile;
- exact device model, processor, graphics processor, RAM, driver, operating
  system, browser, and browser version;
- viewport, device-pixel ratio, browser zoom, power condition, and profiler;
- warm-up and run durations;
- each of the three measured results;
- median frame, processor, graphics, memory, resource-count, loading, or size
  result as applicable;
- approved limit and pass, fail, invalid, or not-measured status;
- invalid-run or exception reason; and
- retest and regression result when applicable.

The tracked summary excludes computer name, operating-system user name, local
user paths, extensions, browsing history, and personal information.

## Invalid, failed, and repeated measurements

A run affected by an extension, heavy background work, power saving, thermal
slowdown, unexpected browser update, viewport error, or other external
interruption is `invalid`, not passing or failing. The cause is recorded and
the complete three-run group is repeated. If valid evidence cannot be
produced, the result remains `notMeasured` and its gate stays blocked.

A frame-rate or processor failure first receives a condition check. Future
work then optimizes code, resources, or presentation without changing game
meaning. The complete failed scenario and one previously passing regression
scenario are rerun. Standard or Low failure blocks the release candidate. High
must be fixed or separately approved for change or removal; it cannot ship as
a known unusable option.

A memory or download failure records the largest contributors before
optimization. Retained released resources, continued long-session growth, or
an unresolved hard download boundary blocks release. Any other memory
exception needs Leonardo's separate approval. The game never lowers quality,
removes content, changes a budget, or reports success silently.

## Sanitized diagnostic record

`createDiagnostic()` converts one typed fault description into one complete
version-1 plain record. The record contains exactly:

- `schemaVersion: 1`;
- stable `code`;
- `severity`: `warning`, `recoverable`, or `fatal`;
- `phase`;
- owning `module`;
- failed `operation`;
- `buildVersion`;
- `contentVersion` or `null`;
- graphics profile or `null`;
- the six safe capability statuses or `null` when no report exists;
- up to eight stable approved context codes; and
- the closed permitted recovery-action list.

Missing optional values use `null`; missing lists are empty. Arbitrary strings
are not allowed. A code uses `MRD1-MODULE-FAULT`, uppercase ASCII, with a
maximum of 64 characters. The same fault has the same code. It contains no
random or session identifier.

The player receives separate authored plain English that states what failed,
whether progress changed, and what action is safe. The code never substitutes
for that explanation.

The canonical copy form is one fixed-key-order JSON line encoded as UTF-8 and
no larger than 2 KiB. It exists in memory for the current failure only. A
semantic **Copy Diagnostic** control writes it to the clipboard only after the
player acts.

## Diagnostic privacy boundary

A diagnostic cannot contain:

- player name or pronouns;
- campaign, save, completion, or device identifier;
- campaign state, save payload, storage record, storage inventory, or typed
  player input;
- authored dialogue or document text;
- browser or operating-system user name;
- device or graphics-card name;
- file path, local path, web address, source map, or stack trace;
- raw browser error name or message;
- free-form parameter, object serialization, or arbitrary context; or
- personal or third-party data.

Diagnostics are not stored, uploaded, sent, included in analytics, copied
automatically, or written to a production console. There is no telemetry or
automatic error report.

A local development build can retain the original technical `Error` object in
memory and show it in the local developer console. It cannot attach campaign
or saved data. Production output exposes only the sanitized record.

## Diagnostic severity and recovery

| Severity | Player result |
|---|---|
| Warning | Play continues and one quiet notice appears. |
| Recoverable | The affected operation stops, the last valid state remains, and only safe recovery actions appear. |
| Fatal | Campaign control stops and one semantic full-screen message offers **Copy Diagnostic** and **Reload Page**. |

**Try Again** appears only when repeating the operation is proven idempotent
and cannot duplicate or damage data. A fatal application cannot restart its
controller; Reload Page creates a new bootstrap lifecycle.

`createDiagnostic()` is synchronous and performs no browser, storage,
clipboard, console, or network work. An unknown fault maps to the owning
module's stable `MRD1-MODULE-UNEXPECTED` result. If diagnostic conversion
itself fails, the fixed minimal `MRD1-DIAGNOSTICS-CREATION_FAILED` record is
used directly. It cannot recursively request another diagnostic.

## Required future fixtures

S11 requires exactly three fixture groups.

### `MR-S11-CMP-001` — Compatibility

Exactly eight setups cover:

1. all six capabilities ready and supported;
2. each required capability unavailable or failed as variants of one setup;
3. multiple simultaneous required failures on one screen;
4. controller unavailable with degraded keyboard-and-mouse play;
5. active-probe rejection, cancellation cleanup, and successful retry;
6. initial audio unlock success and failure before campaign creation or load;
7. pointer-lock refusal and safe retry or main-menu return; and
8. later graphics, persistence, audio, pointer, and controller loss routed to
   the owning system without changing the accepted report.

### `MR-S11-PERF-001` — Performance

Exactly nine setups cover:

1. the complete Low profile;
2. the complete Standard profile;
3. the complete High profile;
4. frame, processor, draw-call, triangle, live-resource, and frame-ceiling
   boundary calculations;
5. memory, loading, campaign-opening, and clean-download boundaries;
6. the five deterministic performance scenarios and three-run median record;
7. the 60-minute resource-stability and cleanup boundary;
8. hidden-page pause, zero-movement resume, local advisory sampling, and
   manual-only profile choice; and
9. failure, invalid evidence, not-measured state, exception, retest, and
   passing-regression response.

### `MR-S11-DIA-001` — Diagnostics

Exactly eight setups cover:

1. non-blocking warning;
2. recoverable failure with safe retry;
3. recoverable failure without retry;
4. fatal failure and reload-only lifecycle;
5. unknown-fault conversion;
6. diagnostic-conversion failure and non-recursive minimal fallback;
7. allowed fields, prohibited fields, canonical order, 2-KiB limit, explicit
   copy, memory-only lifetime, and no remote or persistent output; and
8. development raw-error visibility versus production sanitized-only output.

Automated fixtures can verify records, calculations, boundaries, state
preservation, privacy, and failure response. They cannot prove real browser
support, frame rate, processor time, memory use, loading time, or download
size. Those facts require a future production build and the approved real
method. No S11 fixture file or result exists now.

## Connected interface lifecycle

`MR-IF-014`, Compatibility, performance, and sanitized diagnostic record, is
candidate `v1` through this specification.

The platform owner supplies the asynchronous compatibility record and owns
only its temporary probes. Persistence retains exclusive game-database
ownership. Rendering consumes the graphics-profile and resource budgets. UI
consumes only safe capability, advisory, and diagnostic presentation facts.
Audio and input retain their S09–S10 permission and runtime-loss ownership.
Bootstrap's private diagnostic adapter implements `DiagnosticsPort`, converts
typed faults, and owns no browser resource or campaign data. S11 adds no public
runtime module. Performance evidence is an offline evaluation artifact, not a
runtime port and not campaign state.

This result refines `MR-IF-001` startup, `MR-IF-007` temporary-probe separation,
`MR-IF-009` pointer and controller failure use, `MR-IF-010` player-facing
status and errors, `MR-IF-012` audio availability, and `MR-IF-013` resource
budgets. Each remains candidate and no implementation signature is authorized.
S12 now owns the future executable form and expected-value contract. S14 owns
the complete browser, contradiction, consumer, and freeze audit.

## S11 acceptance and handoff

S11 is documented only when:

- the browser, capability, permission, profile, frame, processor, workload,
  memory, download, loading, long-session, visibility, advisory, measurement,
  evidence, diagnostic, privacy, recovery, and fixture contracts above are
  present;
- connected numbered design and S01–S10 specification statements contain no
  contradictory target or ownership;
- `MR-IF-014` is candidate `v1` and every affected candidate consumer is
  identified;
- `MR-IMP-OPEN-011` is resolved;
- implementation controls preserve the connected S12 fixture and acceptance
  contract;
- no real browser, performance, memory, size, or test result is claimed; and
- all implementation gates remain blocked.

S12 now owns the future executable-format test vectors, expected values,
traceability, automated-versus-manual classification, and complete acceptance
matrix. S13 now fixes future package ownership, validation cadence, review,
evidence, and integration. S14 later completed the technical-specification
programme. S11–S14 create no implementation permission.

## S14 audit record

The S14 cross-interface and contradiction audit is complete. Every shared
interface defined or connected by this specification is frozen `v1` through
the interface register and `specification-audit.md`. Earlier candidate-state
statements preserve the interface lifecycle before S14; they are not the
current state. No executable fixture or measured result exists. Gate 1 is
ready for Leonardo's separate approval, and no implementation is authorized.
