# Art, Audio, and Assets

Status: **B10 documented; implementation approval pending**

## Presentation thesis

*Minor Revisions* uses **stylized institutional realism**. Bellwether
University is a near-present, slightly dated university research floor. It is
recognizable and plausible, not photorealistic. Its comedy comes from
institutional language, bad policy, contradictory labels, temporary repairs,
and accumulated clutter. It does not use cyberpunk, retro-futurist, glossy
science-fiction, distorted architecture, giant props, cartoon slapstick, body
horror, or glitch horror.

The cardiac model and its data displays are the only visibly advanced parts of
the world. Laboratory furniture and equipment remain recognizable. Science and
character stakes remain grounded even when the institution becomes absurd.

## Environment style, materials, and palette

Use clean, low-to-mid-poly geometry with soft bevels and readable silhouettes.
The floor uses one modular building kit across its eight spaces. Detail comes
from text, screens, labels, notices, paper, lighting, and small state changes,
not from many unique high-detail models.

Materials are matte painted metal, off-white plastic, frosted glass, paper,
and light wear. Do not use photoreal textures, heavy grime, or elaborate
surface damage. Each phase can use only the B07 allowance of one major and two
minor physical room changes across the whole floor. Live-text or SVG notices,
labels, paper, and stamps use the separate bounded accretion rule.

| Colour role | Approved use |
|---|---|
| Warm paper beige | Main institutional surfaces and documents. |
| Cool blue-grey | Architecture, windows, and neutral technical surfaces. |
| Institutional green | Secondary furniture, signs, and restrained institutional detail. |
| Charcoal | Text, frames, and high-contrast structure. |
| Soft amber | PI-office warmth and careful caution states. |
| Coral-pink | Living organoids and recovery activity. |
| Cyan or teal | Data, analysis, and readable scientific signals. |
| Amber | Warning and attention-needed signals. |
| Muted red | Serious faults only. |

Important status never depends on colour alone. Text, icons, object state, or
sound repeats each meaning. Exact colour values are selected only after a
contrast check. The PI office remains warmer than the rest of the floor. From
Week 8, the exit becomes more inviting for every player, independent of Morrow
eligibility or ending route.

## Lighting, science displays, and effects

Lighting uses authored presets for the five act states and four work periods.
It does not simulate a continuous real-time day. Most room lighting is static.
Organoids, monitors, warnings, and the exit can use small dynamic lights.

Scientific presentation uses clean fictional tissue images, rhythm traces, and
data panels. It must show readable qualitative states, not real microscopy
data, laboratory images, raw operational data, or a real protocol. Each key
result has plain-English text, icons, and labels in addition to its visual
form.

Effects are restrained: organoid beating, imaging sweeps, monitor glow, and
status pulses. The game has no gore, sudden flash, body horror, hallucination,
or glitch effect. Reduced-motion settings remove non-essential motion and
flashes without removing needed information.

The institution becomes surreal through bureaucratic accretion, not visual
impossibility. Existing live-text or SVG notices, labels, paper, and stamps can
accumulate, overlap, or contradict an earlier item at safe act transitions.
They do not distort architecture, scale props, change collision, create a
glitch effect, or add a new asset family. The thirty approved environmental
IDs remain the complete set.

## Characters, animation, and cinematics

Only Elena, Haoran, Samira, and Gabriel need on-floor character models during
the playable semester. Camila remains remote and uses one simple original 2D
portrait on the desk monitor during her video call. She needs no 3D model,
lip-sync rig, or facial animation. The protagonist appears only as a simple
partial figure or silhouette in selected external shots. Other people remain
remote, off-screen, or environmental.

Characters have realistic stylized proportions, clear role-based silhouettes,
and no cultural costume or real-person likeness. Use a small shared animation
set: idle, walk, turn, sit or lean, station work, and several conversation
gestures. Do not use lip sync, performance capture, or detailed facial rigs.
Original non-lexical dialogue sounds can time simple head and hand motion.

In-engine cinematics use clear framing, slow movement, and few cuts. External
cameras appear only when they add meaning. A scene always restores first-person
control at the correct location. B03 and B06 keep their existing skip,
caption, checkpoint, and time limits.

## Typography and interface art

Use **IBM Plex Sans** for dialogue, menus, notices, and headers, and **IBM Plex
Mono** only for data, timestamps, figures, and system labels. The verified
open-licence font files must be self-hosted in the public repository before
integration. If a verified licence cannot be obtained, use a compatible
open-licence replacement with the same two roles.

Use sentence case for normal labels and choices. All caps appear only for rare
formal warnings or institutional stamps. Do not add a decorative display font,
retro pixel font, or tiny all-caps text. Layout, colour, paper, and wording
create the visual identity.

## Bounded visual asset inventory

The following are approved limits. B10 fixes the required asset roles and
content counts. It does not select a source asset, file, codec, or final asset
identifier before its rights and technical facts are verified.

| Asset group | B08 limit or rule |
|---|---|
| Building | One modular kit for the eight B07 floor spaces. |
| Props | No more than 24 core reusable 3D prop families. |
| Narrative room detail | Reusable notices, labels, paper, screen, and decal templates; no unique model for each beat. |
| People | Four physical NPCs plus one simple protagonist silhouette. |
| Science | Original organoids, main laboratory stations, data views, and science VFX. |
| Interface | Reusable 2D templates for email, manuscript cards, notices, data screens, and menus. |
| Identity assets | Original character designs, fictional notices, main stations, and interface layouts. |

Licensed generic assets can support chairs, desks, storage, cables, basic
shelves, and minor equipment. Adapt them to the visual language when the
licence permits it. Do not use a complete pre-built laboratory scene or an
unmodified character pack.

Runtime models use GLB/glTF. Share geometry and materials where practical.
Most 3D texture maps are limited to 1K. A rare major object may use 2K. Do not
use 4K textures. UI, data, and readable notices use live text or SVG rather
than baked image text. Audio uses compressed browser-ready formats.
`11-technical-architecture.md` defines the local bundle and resource boundary.
Exact codecs, source files, metadata, and browser results are deliberate
implementation-stage verified facts. They are not selected in this repository
now.

## Performance and download boundary

The game has Low, Standard, and High graphics presets. Standard is the default.
The presets change visual cost only, such as shadows, render scale, and
cosmetic effects. They do not change game rules, route access, information, or
accessibility content.

The design target is 60 fps at 1920 × 1080 in Standard on the B09 baseline
hardware, and 30 fps at 1280 × 720 in Low. The initial compressed download
target is no more than 75 MB. It must not exceed 100 MB without Leonardo's
renewed approval. Runtime game assets use normal browser cache; IndexedDB is
reserved for local game data rather than the general asset cache.

`11-technical-architecture.md` defines the reference hardware class, browser
scope, graphics-profile boundary, loading behaviour, and build-size audit.
Implementation must measure these targets and select actual asset codecs after
assets are verified. These are content and player-experience limits, not proof
of measured performance.

## Dialogue sound and voice boundary

Dialogue is text-led. Supporting characters, including Camila, use small
original non-lexical vocal palettes with controlled pitch and rhythm variation.
The sounds never form real words, carry required information, imitate a real
person, or imitate another game. The protagonist's spoken dialogue remains
text-only to preserve player projection after name and pronoun selection.

Do not use voice acting, lip sync, performance capture, cloned voices, or a
real person's voice. Captions and speaker names carry all required dialogue
meaning.

Camila's call uses her 2D portrait, captions, and the same non-lexical sound
contract. It does not use full voice, lip sync, or a talking-head video asset.

## Ambience, cues, music, and mix

Each room has a quiet identity sound. Use ventilation and instruments in the
laboratories, soft organoid rhythm in tissue culture, scanner activity near
imaging, work sounds at desks, a warmer quiet PI office, and sparse corridor,
break-room, and exit ambience. One base ambience layer per space and work
period changes with the act state. Do not create separate room audio for every
week.

| Cue | Use | Required duplicate channel |
|---|---|---|
| Routine message | Normal inbox or queue update. | Queue text and icon. |
| Experiment attention | A group needs monitoring or a visible state changed. | Work-queue text and station state. |
| Required safe scene | A due scene can begin at the next safe point. | In-world cue and task state. |

Important sounds become clearer near their source. The player never has to
find a task by sound alone. The mix must avoid hostile alarms, constant noise,
or horror music.

Use six short modular music loops or stems. Their style is dry electronic
pulse, soft laboratory tone, and occasional over-formal institutional melody.
They become colder and thinner later in the semester. They support menus,
important scenes, and state changes; routine play does not have a constant
score. The later mix can become sparse, but it must not turn the game into
horror or remove every dry institutional accent from active play.

The settings menu provides separate master, music, ambience/effects, and
dialogue-sound volume controls. Captions remain the source of required
information when a sound channel is muted.

## Public asset, licence, and attribution policy

The game and its code will later be published in a public GitHub repository.
Every third-party asset must permit public redistribution in both that
repository and the deployed web game, modification where required, and clear
attribution. Permission only to display an asset on a web page is insufficient.

Prefer original assets, CC0, CC-BY, Open Font License, MIT, Apache, or paid
assets with equally clear public redistribution and modification rights. Do
not use non-commercial or no-derivatives assets by default. A public portfolio
can have promotional value, so those licences create avoidable uncertainty.

Reusable online visual and audio assets are allowed when they meet these rules.
If an asset cannot be redistributed, modified, and attributed correctly,
recreate it or exclude it. Do not copy real university, journal, company, or
game branding. Use fictional signs and original layouts.

Every external or generated asset must be entered in
`../assets/ASSET_MANIFEST.md` before integration. The manifest records source,
creator, licence/version, attribution, modification, redistribution limits,
and verification. The public repository and game Credits and Licences page
must provide clear attribution.

Generated assets are allowed only when the relevant terms permit public reuse.
Their manifest record also names the tool or service, date, source inputs,
human changes, and any release uncertainty. Do not use real people's
likenesses, voices, or private source material.

## B10 asset planning and sourcing gate

The B10 asset plan defines roles, not selected source files. The design
requires one modular floor kit, twenty reusable prop families, six functional
station kits, four physical NPCs, one protagonist silhouette, reusable
interface templates, eight room-ambience roles, three system-cue roles, five
eight-sound dialogue palettes, six music-stem roles, and twenty lighting
presets. The twenty lighting presets are the five act states by the four work
periods.

The twenty prop families are: desk, chair, storage unit, shelf, laboratory
bench, stool, glass partition, automatic door, generic monitor, keyboard,
paper stack, notice rail, clipboard, cable or tray, generic equipment housing,
coffee machine, break-room table, corridor sign, service panel, and exit
fixture. These are visual roles. They do not identify a model source.

Before any external or generated asset enters even a prototype, use this
sequence:

1. Identify a candidate and its exact source page or original-work record.
2. Check public redistribution, modification, attribution, and deployed-web
   use against the future public-source boundary.
3. Record the candidate in ASSET_MANIFEST.md with its exact licence version,
   creator, attribution, modifications, and verification date.
4. Check style, technical format, texture size, and browser suitability.
5. Integrate the asset only after the record is complete and verified.

Do not add an unverified asset to a temporary folder, prototype, or source
branch. A candidate found during research is not an asset selection. Do not
use a source with unclear public redistribution rights merely because it has a
free download.

Verified sources, exact codecs, source file hashes, final file names, colour
values, browser measurements, and final attribution text are deliberate later
facts. They must be recorded before integration, not guessed in B10.

## B08 presentation and asset acceptance criteria

- The world uses the approved near-present institutional style, modular asset
  limits, palette roles, and no prohibited visual treatment.
- Four physical NPCs, the protagonist silhouette boundary, the shared animation
  set, and the cinematic rules bound character production.
- Every key science, status, and audio cue has non-colour and non-audio
  information support.
- The audio plan has five supporting-character vocal palettes, room ambience,
  three cue types, and six modular music stems without full voice production.
- Runtime asset formats follow the GLB/glTF, texture-size, live-text, and
  compressed-audio and graphics-preset rules.
- The initial download target, graphics-preset boundary, B09 architecture,
  and B10 measurement responsibility remain explicit.
- No asset is integrated without a public-repository-compatible licence,
  manifest record, and attribution path.

## Deliberate later verification

The rendering, asset-loading, browser-scope, resource, and quality-preset
architecture is documented in 11-technical-architecture.md. The content
catalogue owns notice text, cue roles, and music roles. Exact source selection,
colour values after contrast checks, codecs, final asset identifiers, file
names, dependency choices, and measured performance remain later verified
facts. This document does not authorize asset import or production
implementation.
