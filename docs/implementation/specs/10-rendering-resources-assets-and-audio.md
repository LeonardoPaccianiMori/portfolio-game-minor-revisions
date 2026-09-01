# S10 Rendering, Resources, Assets, and Audio

Status: **documented; Gate 1 ready for Leonardo approval; no implementation authorized**

This specification fixes the rendering, visual-resource, animation, cutscene
presentation, asset-provenance, and audio contracts for _Minor Revisions_. It
does not select an asset, create source code, or report a measured browser or
performance result.

The numbered design documents remain authoritative for creative intent,
player-visible meaning, content roles, and production limits. S02 owns module
boundaries and lifecycle. S05 owns campaign-safe cutscene meaning. S06 owns
semantic content IDs. S08 owns geometry, anchors, movement, and world
projection. S09 owns input, semantic UI, captions, settings, and accessibility.
S10 owns only their rendering, resource, presentation, and audio execution.

## Plain-language terms

- A **render pass** is one complete drawing of the three-dimensional scene.
- A **scene graph** is the organised set of objects that the renderer draws.
- A **material** controls how a visible surface reacts to light.
- A **texture** is an image used on a three-dimensional surface.
- A **shader** is custom graphics code that changes how the graphics processor
  draws pixels or objects. This release uses no project-owned custom shader.
- A **clip** is one reusable character animation.
- A **bus** is one shared volume channel for a category of sound.
- A **spatial sound** changes volume and left-to-right position according to
  its three-dimensional source and the listener.
- A **fixture** is a fixed future test setup with known input and expected
  results. Naming a fixture does not mean that the test exists or passes.

## Renderer and canvas

The rendering module creates exactly one Three.js `WebGLRenderer` and one
opaque canvas. Semantic HTML UI remains above the canvas. The canvas never
contains the only copy of required text, a choice, a caption, a warning, or a
state cue.

Rendering uses one direct scene pass. It uses no post-processing chain. The
renderer uses:

- WebGL2;
- built-in antialiasing;
- a depth buffer;
- no stencil buffer;
- no preserved drawing buffer;
- sRGB output colour space;
- ACES Filmic tone mapping; and
- exposure `1.0`.

The canvas uses its displayed CSS size multiplied by the selected graphics
pixel ratio. A resize accepts only positive finite dimensions. It updates the
renderer, active camera aspect, and S09 projection data together before the
next visible frame. A zero-sized, hidden, or blocked view does not allocate a
new drawing buffer. It keeps the last safe size and resumes only after a valid
size exists.

Graphics quality is selected by the player. S10 does not change it
automatically. S11 now fixes the exact Low, Standard, and High pixel-ratio,
detail, particle, frame, workload, resource, and failed-measurement values.

## Scene graph and atomic projection

One continuous scene contains five stable top-level groups:

1. Static Environment;
2. Changing Environment;
3. Characters;
4. Visual Effects; and
5. Cutscene-Only Objects.

Every registered visual object has one stable object ID, one owning group, one
resource role, one visibility rule, and one approved S08 anchor or transform.
The renderer does not identify objects by visible label, array position, or
Three.js-generated identifier.

World applies one complete validated S08 projection before control returns.
Rendering then applies all visibility, material, light, character, environment,
and effect changes for that projection as one complete visual update. It never
shows a mixture of two campaign revisions. Static geometry remains fixed except
for the one S08 Gabriel passage. Presentation cannot change campaign truth.

Only two or three nearby rooms need full detail. Distant rooms use approved
lower-detail resources and visibility without changing collision, access,
semantic location, or the continuous-floor rule. No room loading screen,
gameplay portal, runtime network request, or visible asset pop-in is permitted.

## Camera roles

The renderer supports exactly three camera roles:

- **First Person** for normal movement;
- **Focused** for an S08 station or desk-monitor view; and
- **Cutscene** for authored scene presentation.

First Person and Focused use a vertical field of view from `60 degrees` through
`90 degrees`. The stored setting remains owned by S09. Cutscene uses
`45 degrees` by default and permits an authored value from `35 degrees` through
`60 degrees`. Every camera uses near distance `0.10 m` and far distance `50 m`.

A focused-view transition fades out for `0.15 s`, changes to the exact S08
focused camera, and fades in for `0.15 s`. Reduced Motion replaces both fades
with one immediate cut. Leaving focus restores the exact prior First Person
camera and S09 input state. An unknown or incomplete restoration state is a
fault; the renderer never guesses a camera.

Cutscene camera movement is limited to `1.0 m/s` translation and `30 degrees/s`
rotation. It uses zero roll. Every shot needs a static-safe framing that remains
clear when Reduced Motion removes camera movement.

## Lighting and shadows

Lighting uses exactly twenty authored presets: the five approved act states
multiplied by the four approved work periods. Each preset contains:

- one global fill light;
- one main directional light;
- no more than eight room lights; and
- no more than four accent lights.

The PI office stays warmer than the surrounding floor. The exit becomes more
inviting from Week 8 for every player. Later states can become colder and
sparser, but do not introduce horror lighting or change route meaning.

A preset change completes over `1.0 s`. It cannot flash, show an unsafe
half-preset, or change campaign state. Reduced Motion keeps this safe gradual
light change because it is not camera or object movement.

Only the main directional light casts shadows. The release uses one fixed
soft-shadow method. No more than twelve moving objects cast shadows at one
time. Shadow quality is:

| Graphics quality | Directional shadow map |
| ---------------- | ---------------------: |
| Low              |                    Off |
| Standard         |          `1024 x 1024` |
| High             |          `2048 x 2048` |

S11 now owns the exact measured-performance method and response. A worker
cannot silently change these values in response to an unrecorded observation.

## Materials, textures, and colour

Visible lit surfaces use built-in `MeshStandardMaterial`. Approved unlit
notices, indicators, and simple effects can use `MeshBasicMaterial`. The
project uses no custom shader and no runtime shader patch.

Colour textures use sRGB interpretation. Normal, roughness, metalness, and
other data textures use non-colour interpretation. Texture orientation and
channel use must match the selected verified asset record. Normal maps have a
maximum size of `1024 x 1024`, except for a rare approved `2048 x 2048` source
record. No `4096 x 4096` texture is permitted. S11 now fixes total calculated
graphics-memory, live-texture, and clean-download budgets.

In-world text uses live HTML where S09 requires semantics, or local SVG and
project-owned canvas textures for mounted world text. It does not use a
photographed or baked text image as the only readable source.

Reusable surfaces share material instances where practical. Simple frosted
glass uses opacity `0.35`; it does not use transmission, refraction, or a
custom glass shader. Paper, notices, and decals use separate surfaces with at
least `0.003 m` separation. No more than three such layers occupy one mounting
slot. Stable object IDs determine their draw order.

The candidate S10 colour values are:

| Role                | Value     |
| ------------------- | --------- |
| Paper beige         | `#D8CFB8` |
| Cool blue-grey      | `#6F7C85` |
| Institutional green | `#55705D` |
| Charcoal            | `#24282C` |
| Soft amber          | `#D6A15B` |
| Organoid coral-pink | `#D46F82` |
| Data teal           | `#2F8F97` |
| Attention amber     | `#C98224` |
| Serious-fault red   | `#A84444` |

Teal means scientific or neutral data. Amber means attention. Red means a
serious fault. Green does not mean success. Text, icon, sound, shape, or object
state repeats every important colour meaning. These candidate values require
the exact S09 contrast checks before implementation acceptance. A failed check
requires an approved replacement; no value can change silently.

## Character animation

Elena, Haoran, Samira, and Gabriel use one common humanoid skeleton and these
ten shared animation roles:

1. Idle;
2. Walk;
3. Turn Left;
4. Turn Right;
5. Sit;
6. Lean;
7. Station Work;
8. Open Gesture;
9. Concern Gesture; and
10. Dismiss Gesture.

They use no detailed facial rig, lip sync, performance capture, cloned voice,
or real-person likeness. Each visible animated character has one Three.js
animation mixer. A clip is identified by its stable animation-role ID. A
missing required clip fails asset preparation. The system does not substitute
an unrelated motion.

Clips contain no root motion. Root motion is animation data that moves the
character through the world. S08 paths and cutscene timelines remain the only
owners of position and facing. Clip changes blend for `0.20 s`. A character
plays one main body clip at a time. Only Idle can add a small breathing layer.

Pause, a hidden browser tab, a blocked small view, and the applicable S09
interruption state freeze animation. Resume continues from the frozen
presentation time without catch-up.

Environmental animation uses short loops for fans, screens, indicators, and
laboratory equipment. Every loop has a stable animation ID and defined start
state. A loop outside the active nearby-room set stops visual work. When it
becomes active, it uses the correct current presentation time. Reduced Motion
stops decorative loops and preserves required state communication through a
static equivalent.

## Science and organoid effects

Science effects use exactly five stable roles: Data Flow, Sample Pulse, Scan
Sweep, Organoid Activity, and Warning. Each role has one defined semantic
purpose. Effects use simple Three.js shapes, lines, and flat images with the
approved built-in materials. They use no custom shader.

The complete visible scene contains no more than 500 effect particles. An
organoid or scientific state never depends on colour alone. Shape, motion,
symbol, nearby text, or another visible object state repeats its meaning.
Reduced Motion replaces repeated pulsing and sweeping with a static
equivalent. No effect changes evidence, experiment truth, or campaign state.

## Cutscene presentation

Each cutscene resource record has a fixed list of actors, camera shots, visual
effects, audio cues, captions, choices, and required resources. Presentation
validates the complete list before start. A missing required item prevents the
presentation and returns the controlled S05 failure response.

Camila uses exactly one original two-dimensional portrait in the focused
protagonist desk-monitor view. It is not a separate portrait panel and has no
additional emotional portrait variants. Her name, complete dialogue, captions,
and non-lexical sounds remain in semantic HTML. She has no Three.js character,
lip sync, full voice, or recorded talking-head video.

Before the cutscene starts, presentation records the current camera role and
pose, physical-character placements, animation states, visible world
projection, UI and caption state, audio state, and allowed S09 controls. One
temporary presentation token ties this record to the active S05 request.

The cutscene timeline owns presentation only. It cannot choose, apply a rule,
advance campaign time, save, or change campaign truth. Exactly one cutscene
presentation can exist. The timeline uses the S05 choice, checkpoint, skip,
closing, recap, and terminal-response order.

Completion, approved skip, and controlled presentation failure perform one
complete restoration. They stop scene-only animation and audio, remove
cutscene-only objects, restore the correct world projection, camera, UI,
captions, audio role, and controls, then submit the one permitted matching S05
response. A missing or inconsistent restoration fact is a fault. Presentation
does not construct a partial state or guess a value.

## Specialist resource ownership

There is no general resource manager or resource port. Rendering owns all
visual resource records and loaded visual resources, including Three.js
geometry, materials, textures, GLB or glTF scenes, animation clips, and
Camila's portrait image. UI owns only the semantic HTML portrait element and
receives the validated stable local presentation reference. Audio owns decoded
audio buffers, source nodes, gain nodes, and buses. Application coordinates
preparation order but owns no browser resource.

Each specialist owner uses stable resource records with:

- stable resource ID;
- semantic content or presentation role;
- resource type;
- exact future local repository path;
- required or optional status;
- owning specialist module;
- sharing group where applicable;
- asset-manifest reference for a production asset; and
- defined fallback or failure result.

No runtime system guesses a path or file name. A resource shared inside one
specialist module loads once and remains available while any live consumer
uses it. Only its owner releases it, and only after no live consumer uses it.

One initial loading screen prepares every required campaign asset before
Continue or New Game becomes available. The game has no room loading screen
and no runtime network request. Already-loaded resources for a later act can
be prepared safely in the background without visible pop-in. Background work
does not start from a visual frame callback.

A missing required resource blocks start or the affected cutscene and returns
a controlled error without changing campaign data. An optional resource can
use only its approved functional placeholder. A late result from an old or
cancelled session is ignored and released. It cannot change the current room,
UI, story state, or resource record.

Restart, return to title, campaign replacement, and application shutdown use
the S02 reverse-order teardown. They stop timing and input, stop cutscenes and
audio, cancel unfinished preparation, remove event listeners, release owned
graphics and audio resources, clear temporary presentation state, and make
repeated teardown harmless. A new session uses new specialist instances.

## Placeholder and provenance boundary

Every placeholder has `PLACEHOLDER` in its file name and resource record. It
preserves the needed scale, connection points, silhouette, and function. It
cannot imitate final art or conceal that the production role is unresolved.

Every production asset needs the complete record required by
`assets/ASSET_MANIFEST.md`: creator, exact source, licence and version,
attribution, modification, public-repository and deployed-web redistribution
evidence, technical facts, hash after integration, verification date, and
reviewer. The resource record points to that verified manifest record.

S10 selects, downloads, generates, and imports no asset. A later separately
approved process must keep every accepted project file and provenance record
inside the `minor-revisions` repository. It cannot use a complete pre-built
laboratory, an unmodified character pack, a real likeness or voice, private
source material, real branding, or unclear redistribution rights.

## Audio context and bus graph

Audio creates one Web Audio API context after the player's first accepted
action. It does not try to bypass browser permission. Missing required Web
Audio support during the start-up compatibility check blocks campaign creation
and shows the S09 blocking capability message.

The audio graph has exactly four total buses:

1. Master;
2. Music;
3. Ambience/Effects; and
4. Dialogue Sounds.

Music, Ambience/Effects, and Dialogue Sounds connect to Master. Every source
connects to exactly one of those three category buses. The existing S09 Master,
Music, Ambience/Effects, and Dialogue Sounds settings control these exact
buses from `0%` through `100%`. A change uses a `0.05 s` fade to avoid an audio
click.

Mute sets the applicable bus output to zero. It does not change story timing,
captions, animation, or cue sequencing. Muting, suspension, or an audio-output
failure after a valid start never changes campaign state. Required meaning
remains available through text, icons, and visible object state. Suspended
audio shows the S09 audio-status message and Resume Audio action.

## Ambience and spatial sound

The eight content-owned ambience roles are the main laboratory, tissue culture,
imaging and facility, shared desks, PI office, break room, corridor, and exit.
Each space uses one base ambience role. A space change uses a `1.0 s` crossfade.
Work-period and act presentation can change the approved base variation without
creating a separate weekly role.

Sounds from visible three-dimensional equipment can use spatial audio. The
audio listener follows the active camera position and zero-roll facing. A
spatial source uses reference distance `1 m`, maximum distance `20 m`, and
gradual reduction between them. It cannot be the only way to find a required
task.

Music, Camila's dialogue sounds, semantic interface sounds, and accessibility
alerts are not spatial. Spatial equipment sounds remain Sound Effects on the
combined Ambience/Effects bus. They are not extra ambience roles.

## Cues and interruption

The content catalogue has exactly three system-cue roles: Routine Message,
Experiment Attention, and Required Safe Scene. S10 adds no cue role. Each keeps
its required text, icon, station, in-world, or task duplicate.

Runtime playback uses four priority levels:

1. Critical Alert;
2. Narrative;
3. Interaction; and
4. Decorative.

Priority is playback behaviour, not a new content role. A higher-priority cue
can stop or temporarily reduce a lower-priority cue when both would be unclear.
A lower-priority cue cannot stop a higher-priority cue. Equal-priority cues use
their authored order.

The same cue does not start again while it plays unless its verified resource
record permits overlap. A stopped cue uses a `0.05 s` fade. The mix avoids
hostile alarms, constant noise, and horror presentation.

## Music roles

Music uses the six existing content roles without renaming them:

| ID          | Role                                           |
| ----------- | ---------------------------------------------- |
| `MR-MUS-01` | Opening pulse: dry, low electronic motion      |
| `MR-MUS-02` | Orderly pressure: restrained laboratory rhythm |
| `MR-MUS-03` | Manuscript loop: thin formal melody            |
| `MR-MUS-04` | Public record: bright institutional swell      |
| `MR-MUS-05` | Review pressure: colder reduced pulse          |
| `MR-MUS-06` | Exit horizon: sparse open chord                |

Story and presentation request a stable role ID, never an audio file path.
Only one music role can play. A role change uses a `2.0 s` crossfade. Requesting
the active role does not start a duplicate. Routine exploration permits
silence; the game does not require a continuous score.

A cutscene can temporarily request one role. Completion, skip, or failure
restores the correct role or silence for the current presentation state. Music
can become colder and thinner later, but cannot imply that one ending is the
morally correct result.

## Non-lexical dialogue sounds

Elena, Haoran, Samira, Gabriel, and Camila each have one palette of exactly
eight short original non-lexical sounds. The palette keeps the character-
specific stable cue IDs and role descriptions in `docs/12-content-specification.md`.
S10 does not replace them with one common set of emotional labels.

These sounds can use breaths, hums, and simple vocal tones. They form no real
word, imitate no real person or other game, and carry no required information.
The visible dialogue and speaker name contain the complete meaning. When more
than one cue is valid, the same sound does not occur twice in immediate
succession.

No protagonist voice, full voice acting, cloned voice, lip sync, or
performance-capture audio is permitted.

## Captions and redundant meaning

Every required sound has a visual equivalent. Dialogue uses its complete
authored text. Critical alerts use a visible symbol and message. The three
system cues keep their content-owned duplicates. Progress never depends on
hearing a sound.

S09 owns caption layout and duration. S10 starts the matching sound caption
with the cue and keeps it for the sound duration and at least `2.5 s`. Muting
or an output failure does not remove the caption. Manual dialogue remains until
the player advances it.

## Fault handling

Expected unavailable optional resources use only their approved fallback.
Required-resource, invalid-resource-record, unknown visual object, missing
animation, invalid camera, cutscene-resource, restoration, audio-context, and
graphics-context failures return a typed sanitized failure to application.
They never expose a file-system path, browser object, or campaign data.

If the browser loses the graphics context, rendering stops and S09 shows a
recovery message. A successful safe restoration rebuilds owned graphics
resources and reapplies the complete current projection. A failed restoration
offers a controlled return to title. Neither path advances campaign state.

Old-session resource completions, audio callbacks, animation callbacks, and
cutscene responses are ignored. An unexpected fault stops the affected
presentation boundary, keeps the last valid campaign state, disables unsafe
control, and follows the S02 fatal-failure route.

## Required future fixtures

S10 requires these future fixture groups:

| Fixture group                             | Required coverage                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MR-S10-RND-001` — Rendering              | Exactly five setups: base renderer; quality levels; lighting transition; layered papers and decals; and Reduced Motion effects. Together they also check canvas resize, colour handling, materials, shadows, palette roles, science effects, and the absence of custom shaders.                                                                                             |
| `MR-S10-SCN-001` — Character and Cutscene | Exactly five setups: shared animation roles; missing animation; focused-view transition; complete cutscene; and skipped cutscene with full restoration. Together they also check camera limits, Camila's monitor portrait, one active token, audio and UI restoration, stale responses, and controlled failure.                                                             |
| `MR-S10-RES-001` — Resource and Audio     | Exactly six setups: shared resource loading; optional-resource failure; required-resource failure; four audio-bus routes; room-ambience transition; and suspended audio. Together they also check specialist ownership, initial preparation, provenance and placeholders, music and dialogue roles, cue priority, spatial sound, mute, cancellation, release, and teardown. |

The lifecycle fault cases attach to these three groups. They cover restart
during loading, restart during a cutscene, return to title while audio plays,
a late result from an old session, graphics-context loss with successful
rebuild, and graphics-context loss with controlled return to title. Each leaves
one clean session and unchanged campaign truth.

No fixture file, automated test, browser result, performance result, or asset
result exists now. S12 owns executable format and expected values. S14 owns the
final contradiction and interface-freeze audit.

## Connected interface lifecycle

`MR-IF-008`, World state and presentation projection, is candidate `v1`. S08
owns geometry, anchors, world projection, and semantic location. S10 completes
renderer visibility, resource application, visual transitions, cutscene
presentation, and teardown.

`MR-IF-011`, Cutscene timeline, checkpoint, skip, and restoration, is candidate
`v1`. S05 owns campaign request, token, checkpoint, choice, skip, completion,
reload, closing, recap, and failure meaning. S10 owns timeline, camera, actor,
animation, audio, resources, and complete presentation restoration.

`MR-IF-012`, Audio bus, cue, and dialogue-sound request, is candidate `v1`.
Audio owns browser audio objects. UI, rules effects, world, cutscenes, settings,
and tests exchange only stable IDs and limited plain data for buses, cues,
spatial sources, mute, suspension, captions, availability, and teardown.

`MR-IF-013`, Asset and resource ownership lifecycle, is candidate `v1`. It is
not a general resource manager or port. It records the plain-data request,
ownership, preparation, availability, cancellation, and release contract used
across application, rendering, audio, world, cutscenes, and bootstrap's private
diagnostic adapter. Each specialist keeps its browser objects and loaded
resources private.

At S10 documentation, no interface was frozen or available for implementation.
S11 later adds candidate `MR-IF-014` compatibility, graphics-profile,
resource-budget, diagnostic, and
measured-evidence consumers. S12 adds executable fixtures. S14 performs the
cross-interface freeze audit.

## S10 acceptance and handoff

S10 is documented only when:

- this renderer, scene, camera, lighting, shadow, material, texture, colour,
  animation, effect, cutscene, specialist-resource, placeholder, provenance,
  audio, ambience, spatial-sound, cue, music, dialogue-sound, caption,
  lifecycle, fault, and fixture contract is present;
- the approved correction decisions replace the rejected general resource
  manager, five-bus graph, renamed music roles, common dialogue roles, portrait
  variants, general audio-unavailable rule, and extra ambience layers;
- numbered design documents and S02–S09 contain no contradictory claim;
- `MR-IF-008`, `MR-IF-011`, `MR-IF-012`, and `MR-IF-013` are candidate `v1`;
- `MR-IMP-OPEN-010` is resolved;
- implementation controls preserve the connected S12 fixture and acceptance
  contract;
- every implementation gate remains blocked; and
- Leonardo's approved documentation is committed.

S11 owns browser compatibility, exact graphics-profile values, performance and
memory budgets, profiling, diagnostics, privacy, and the response to failed
measurements. S12 now owns the future executable fixture and acceptance
contract. S13 now assigns world and rendering to `MR-WP-03`, input and
interaction to `MR-WP-04`, UI to `MR-WP-05`, and audio and cutscenes to
`MR-WP-06`. S14 later completed the technical-specification programme.

## S14 audit record

The S14 cross-interface and contradiction audit is complete. Every shared
interface defined or connected by this specification is frozen `v1` through
the interface register and `specification-audit.md`. Earlier candidate-state
statements preserve the interface lifecycle before S14; they are not the
current state. No executable fixture or measured result exists. Gate 1 is
ready for Leonardo's separate approval, and no implementation is authorized.
