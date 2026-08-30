# S08 — World Geometry and Interaction

Status: **documented technical specification; no implementation authorized**

This specification fixes the coordinate system, floor plan, walkable geometry,
collision, player movement, camera limits, semantic locations, anchors,
interaction targets, focused-station geometry, room-state presentation, world
projection, faults, and required future fixtures for *Minor Revisions*.

S02 owns the module graph, public ports, frame order, lifecycle, and failure
boundaries. S03 owns saved semantic world facts. S04 owns campaign commands and
outcomes. S05 owns safe-point, crash, scene, and scheduler order. S06 owns
content and semantic location identities. S07 owns persistence. S08 maps those
plain facts to one fixed navigable floor and supplies plain movement and target
contexts. It does not give presentation code authority over campaign truth.

S09 owns device inputs, remapping, pointer capture, complete focus state,
prompts, UI, and accessibility presentation. S10 now owns Three.js objects,
rendering, lighting, visual transitions, resources, animation, audio, and
cutscene camera work. S12 will encode the fixtures named here. S14 will audit
and freeze connected interfaces.

Nothing in S08 creates game code, package configuration, runtime geometry,
production assets, test evidence, a licence, a remote, deployment, or
implementation permission.

## Terms

- A **world unit** is one metre.
- An **anchor** is a stable named floor position and facing direction.
- A **recovery anchor** is the safe location used after load, crash, or scene
  recovery instead of a saved physical pose.
- A **target volume** is a simple invisible shape that makes an object usable
  without depending on the triangles of its visible model.
- A **raycast** is an invisible straight-line check from the camera that finds
  what the player is looking at and whether another object blocks it.
- A **focused view** is a temporary station or reading view that stops free
  movement without moving the saved player body.
- A **projection** is a read-only description of what the floor must currently
  present. It is not the complete campaign state.
- **Kinematic movement** means that code moves the player through explicit
  collision checks. There is no general physics engine.
- A **fixture** is a fixed input and expected result that S12 will later encode
  as an executable test.

## Coordinate and spatial authority

One world unit equals one metre. `Y` is height. `X` runs west to east and `Z`
runs north to south. Normal walkable floor is `Y = 0`.

The origin `(0, 0, 0)` is the centre of the main laboratory. Authored compass
headings use:

| Heading | Direction |
|---:|---|
| `0°` | North, toward decreasing `Z`. |
| `90°` | East, toward increasing `X`. |
| `180°` | South, toward increasing `Z`. |
| `270°` | West, toward decreasing `X`. |

One fixed plain spatial plan owns rooms, circulation, walls, openings,
collision footprints, anchors, station placement, and interaction targets.
Rendering creates visible Three.js objects from that plan but does not define
collision or campaign truth. The floor is not procedurally generated.

Authored distances use metres with no more than three decimal places.
Validation uses a `0.001 m` tolerance only when it compares edges that should
meet. It rejects missing or non-finite values, zero or negative dimensions,
inverted ranges, and geometry outside the approved construction bounds.

Spatial records use stable uppercase ASCII IDs of 1–128 characters:

- `MR-ROOM-` for room and circulation areas;
- `MR-WALL-` for wall segments;
- `MR-OPEN-` for openings;
- `MR-COL-` for collision shapes;
- `MR-ANCHOR-` for named positions; and
- `MR-TGT-` for interaction targets.

These spatial records are not authored-content objects in the S06 content
catalogue. The two namespaces can use the same family prefix, but no complete
ID can identify both an S06 authored-content object and an S08 spatial record.

An ID is never reused for another meaning. Stable IDs, not file order,
Three.js object order, browser timing, or randomness, decide processing order
and ties. Fixed records can derive simpler wall and collision rectangles at
startup only when identical records always produce the identical ordered
result.

## Floor dimensions and construction limits

The six clear room interiors are exact:

| Room | `X` range | `Z` range | Clear size | Area |
|---|---:|---:|---:|---:|
| Main laboratory | `-5.00` to `+5.00` | `-4.25` to `+4.25` | `10 × 8.5 m` | `85 m²` |
| Tissue culture | `-10.15` to `-5.15` | `-3.50` to `+3.50` | `5 × 7 m` | `35 m²` |
| Imaging and facility | `+5.15` to `+12.15` | `-4.25` to `+3.75` | `7 × 8 m` | `56 m²` |
| PI office | `-5.00` to `-1.00` | `-9.40` to `-4.40` | `4 × 5 m` | `20 m²` |
| Shared desks | `-0.85` to `+10.15` | `-9.40` to `-4.40` | `11 × 5 m` | `55 m²` |
| Break room | `-10.15` to `-4.15` | `+5.15` to `+10.15` | `6 × 5 m` | `30 m²` |

The rooms total `281 m²`. The nominal circulation, exit, recess, and service
allocation is `119 m²`, for the approved approximately `400 m²` floor.

Normal construction remains inside `X -10.35` to `+12.35` and `Z -9.60` to
`+10.35`. This rectangle is only a construction limit. It does not create
floor or walkable space.

The ceiling is `3.00 m` above the floor. Floor slabs extend `0.20 m` below
`Y = 0`. Internal walls are `0.15 m` thick and outer walls are `0.20 m` thick.
Core doors are `1.10 m` wide and `2.10 m` high.

## Circulation and service allocation

Playable circulation uses these rectangles:

| Area | `X` range | `Z` range | Area |
|---|---:|---:|---:|
| West connector | `-10.15` to `-5.15` | `+3.65` to `+5.15` | `7.50 m²` |
| South corridor | `-4.00` to `+12.15` | `+4.40` to `+6.40` | `32.30 m²` |
| South circulation return | `-4.00` to `+5.20` | `+6.55` to `+10.05` | `32.20 m²` |
| Exit vestibule | `+8.15` to `+12.15` | `+6.55` to `+9.55` | `12.00 m²` |

These four rectangles total `84 m²`.

The `25 m²` northwest allocation is `X -10.15` to `-5.15` and `Z -8.50` to
`-3.50`. It contains:

- a playable eastern connector at `X -6.65` to `-5.15`;
- a `0.15 m` separating wall at `X -6.80` to `-6.65`; and
- non-playable service space at `X -10.15` to `-6.80`.

The service side is solid dressing. Only the approved PI-office and
tissue-culture openings enter the connector.

The `10 m²` northeast service allocation is `X +10.15` to `+12.15` and
`Z -9.40` to `-4.40`. It is non-playable, has solid collision, and has no
gameplay opening. A visible service door is dressing only.

The approximately `400 m²` plan counts both service allocations. The
northwest allocation already includes its `7.50 m²` playable connector; the
connector is not additional area. No other hidden or implied space is
walkable.

## Required topology and openings

Permanent connectivity is:

- PI office to shared desks;
- PI-office side to tissue culture through the northwest connector;
- shared desks to main laboratory;
- main laboratory to tissue culture;
- main laboratory to imaging;
- main laboratory to south corridor;
- tissue culture to west connector to break room;
- break room to south corridor and south return; and
- south corridor to exit.

The west connector to break-room opening is `1.50 m` wide at
`X -7.65, Z +5.15`. The south-corridor to south-return opening is `1.50 m`
wide at `X +1.00, Z +6.475`.

Automatic-door centres are:

| Connection | Centre `X` | Centre `Z` |
|---|---:|---:|
| PI office to northwest connector | `-5.075` | `-6.50` |
| Tissue culture to northwest connector | `-5.90` | `-3.575` |
| PI office to shared desks | `-0.925` | `-7.00` |
| Shared desks to main laboratory | `+2.50` | `-4.325` |
| Tissue culture to main laboratory | `-5.075` | `+1.25` |
| Main laboratory to imaging | `+5.075` | `-1.25` |
| Main laboratory to south corridor | `-1.50` | `+4.325` |
| Tissue culture to west connector | `-7.65` | `+3.575` |
| Break room to south corridor | `-4.075` | `+5.75` |
| Break room to south return | `-4.075` | `+8.00` |
| South corridor to exit vestibule | `+10.15` | `+6.475` |

Normal automatic-door collision openings remain permanently clear. A visual
door trigger extends `1.25 m` from each side of its opening. S10 can animate a
panel, but the panel cannot become gameplay collision or arrive too late to
let the player pass. Service doors do not react.

Gabriel's pass-through is `1.10 m` wide, centred at `X +8.00, Z -4.325`.
Before unlock, one named wall segment supplies normal wall collision. Unlock
still requires the approved respectful queue choice, Working-or-better
Gabriel trust, and no permanent breach. The application removes the segment
only at a safe atomic world update. The passage stays visibly open for the
rest of that campaign and can never remove another required route.

The building exit is an interaction boundary, not free movement. Its outer
wall collision remains solid during normal play. Before Week 16 the target
gives the approved internal response. The final scene can present departure
without moving the free-movement player outside the floor.

## Static collision and walkable floor

Every approved room, circulation rectangle, and northwest connector uses one
flat floor surface at `Y = 0`. Connected surfaces have no step, slope, gap, or
height change. The outer edge is blocked. The player cannot fall or enter
non-playable service space.

Walls extend from floor to ceiling. Approved doorways remove their complete
width from player-height collision. Glass uses the same collision rule as an
opaque wall. Overlapping wall ends are merged into stable, non-duplicated
rectangles.

Walls, glass, and large furniture use simple rectangular collision
footprints. Small clutter, decoration, environmental text, and interaction
target volumes have no collision. Visible model triangles never define
collision.

Static validation rejects any collision footprint that covers a permanent
opening, station approach, recovery anchor, character anchor, or required
`1.20 m` route. It checks inside and outside corners and the complete walkable
boundary.

## Station placement

The large functional furniture footprints are:

| Station | `X` range | `Z` range |
|---|---:|---:|
| Sample bench | `-4.30` to `-1.00` | `-3.85` to `-3.10` |
| Experiment setup | `+0.30` to `+4.30` | `+2.80` to `+3.60` |
| Active sample rack | `-9.75` to `-9.10` | `-1.50` to `+1.50` |
| Imaging bay | `+10.85` to `+11.75` | `-0.75` to `+2.75` |
| Facility station | `+9.00` to `+11.20` | `-3.95` to `-3.25` |
| Service alcove | `+5.55` to `+6.35` | `+1.00` to `+3.25` |
| Analysis workstation | `+1.00` to `+4.20` | `-8.95` to `-8.15` |
| Manuscript desk | `+5.00` to `+8.20` | `-8.95` to `-8.15` |

Each core station retains its approved clear approach area of at least
`1.20 m` width and `1.50 m` depth. Analysis and manuscript are separate
targets with separate approaches. Both desk fronts face south. Camila's call
uses the analysis monitor and creates no extra station or explorable room.

The imaging booking board is mounted on the north wall immediately west of
Gabriel's pass-through. None of the imaging, facility, service, booking, or
desk geometry obstructs a doorway or the conditional passage.

## Anchor contract

Every anchor contains its stable ID, semantic location ID, purpose, `X/Y/Z`
position, and authored facing. The closed anchor purposes are:

- player recovery;
- character placement;
- scene staging; and
- station approach.

Anchor coordinates are presentation mappings. Only a semantic recovery anchor
ID is saved. Physical position, camera transform, and temporary focus are not.

There is one permanent player-recovery anchor for each of the ten S06
semantic locations. `MR-LOC-CORRIDOR` means the west and northwest connector.
`MR-LOC-SOUTH-CORRIDOR` means the south corridor and return. Imaging and the
facility remain separate semantic anchors inside their shared room.

Ordinary walking does not change campaign state. An applied action, scene
checkpoint, crash fact, or other approved campaign result selects its authored
recovery anchor. Every recovery anchor is reachable through permanent routes,
has at least `0.50 m` of clear space around the player centre, and cannot be
conditional or obstructed by characters or room states. Load does not guess a
nearby substitute.

### Recovery anchors

All recovery anchors use `Y = 0`:

| Semantic location | `X` | `Z` | Facing |
|---|---:|---:|---|
| Tissue culture | `-7.65` | `+2.00` | North |
| Main laboratory | `0.00` | `0.00` | North |
| PI office | `-3.00` | `-6.80` | North |
| Shared desks | `+0.50` | `-5.70` | East |
| Imaging | `+7.50` | `-0.50` | East |
| Facility | `+9.70` | `-2.40` | North |
| Break room | `-7.00` | `+7.50` | East |
| General corridor connector | `-7.65` | `+4.40` | East |
| South corridor | `+1.00` | `+5.40` | East |
| Exit vestibule | `+10.15` | `+8.00` | South |

### Core station approach anchors

All station approach anchors use `Y = 0`:

| Station | `X` | `Z` | Facing |
|---|---:|---:|---|
| Sample bench | `-2.65` | `-2.35` | North |
| Experiment setup | `+2.30` | `+2.05` | South |
| Active rack | `-8.35` | `0.00` | West |
| Imaging bay | `+10.10` | `+1.00` | East |
| Analysis workstation | `+2.60` | `-7.40` | North |
| Manuscript desk | `+6.60` | `-7.40` | North |

Supporting interaction anchors use `Y = 0`:

| Interaction | `X` | `Z` | Facing |
|---|---:|---:|---|
| Facility queue terminal | `+10.10` | `-2.45` | North |
| Imaging booking board | `+6.90` | `-3.00` | North |
| Imaging service alcove | `+7.10` | `+2.10` | West |
| PI-office scene point | `-3.00` | `-6.20` | North |
| Protected break | `-8.10` | `+7.80` | West |
| Exit interaction | `+10.15` | `+8.90` | South |
| Exit access panel | `+11.45` | `+8.40` | East |

### Character and step-aside anchors

Physical characters use authored anchors and short authored paths. Camila has
no physical anchor.

| Character and location | Normal `X, Z` | Step-aside `X, Z` |
|---|---:|---:|
| Elena, PI office | `-3.80, -7.80` | `-4.30, -7.80` |
| Elena, main laboratory | `+3.70, +0.60` | `+4.35, +0.60` |
| Haoran, tissue culture | `-6.40, -1.00` | `-6.00, -1.60` |
| Haoran, main laboratory | `-3.20, +1.60` | `-3.90, +1.60` |
| Haoran, shared desks | `+4.20, -5.60` | `+4.90, -5.60` |
| Samira, shared desks | `+8.80, -6.30` | `+9.45, -6.30` |
| Samira, break room | `-8.50, +8.40` | `-9.20, +8.40` |
| Samira, imaging | `+7.60, +2.40` | `+6.90, +2.40` |
| Gabriel, facility | `+11.25, -2.25` | `+11.55, -2.80` |
| Gabriel, imaging | `+8.20, +1.60` | `+7.50, +1.60` |

A physical character has a soft `0.35 m` horizontal boundary. When the player
comes within `1.20 m` and the character obstructs movement, the character uses
the fixed short path to its step-aside anchor. Characters do not push the
player, change campaign state, roam, or use a navigation mesh. If presentation
movement fails, the character boundary becomes temporarily non-blocking. A
visible character can never trap the player.

### Scene stage anchors

Required scenes reuse five fixed stages:

- tissue-rack stage: active-rack approach anchor;
- main-laboratory stage: `X +0.50, Z -1.50`, facing north;
- PI-office stage: PI-office scene point;
- shared-desks stage: `X +4.80, Z -5.70`, facing north; and
- exit stage: exit-vestibule recovery anchor.

Required stage and recovery sequences are:

| Scene | Stages | Control returns at |
|---|---|---|
| **Clarified** | Tissue rack, main laboratory, PI office | Shared-desks recovery anchor |
| **A Complete Narrative** | PI office | PI-office recovery anchor |
| **What We Had** | Shared desks, PI office | PI-office recovery anchor |
| **Public Record** | Manuscript desk | Shared-desks recovery anchor |
| **Helpful Comments** | Shared desks, PI office | PI-office recovery anchor |
| **A Reasonable Response** | Shared desks, PI office | PI-office recovery anchor |
| **06:42** | Shared desks, exit stage | Exit-vestibule recovery anchor |

Optional scenes reuse existing anchors: **Borrowed Time** uses the active
rack, **The Missing Replicate** the shared-desks stage, **Shared Instrument**
the booking board, **Not in My Figure** its locked shared-desks or break-room
form, **The Queue** the facility terminal, **The Archive** the service alcove,
**The Future** the PI-office stage, and Camila's call the analysis monitor.
Control returns at that location's permanent recovery anchor. S10 owns the
documented camera shots, actor animation, and complete restoration contract.

## Player collision body and movement

The player collision body is an upright cylinder with:

- radius `0.30 m`;
- diameter `0.60 m`;
- height `1.75 m`;
- eye height `1.62 m`; and
- floor-level centre as its position reference.

There is no jump, crouch, sprint, stamina, platforming, stairs, slope, or
height-changing movement.

Movement values are:

| Value | Contract |
|---|---:|
| Maximum speed | `2.40 m/s` |
| Acceleration | `12 m/s²` |
| Stopping rate | `18 m/s²` |
| Maximum processed frame delta | `0.05 s` |
| Maximum full-speed request per processed frame | `0.12 m` |
| Wall safety gap | `0.02 m` |
| Maximum collision contacts per frame | `4` |

Forward, backward, and sideways speed are equal. Diagonal input is normalized
so it is not faster. A controller stick can request partial speed. Wall
contact cannot add speed.

Excess browser delay is discarded. The first frame after a hidden tab, pause,
small-view block, or interruption produces zero movement. There is no catch-up
movement and browser delay never changes campaign time.

The player receives a plain `canMove`. It is false during focused stations,
cutscenes, pause, menus, a too-small view, or a technical block. False sets
speed to zero and stores no momentum. Returning to movement starts from rest.
S09 owns the exact input-state machine and S10 owns cutscene camera control.

### Collision calculation

Collision uses the flat floor. Each static rectangle is expanded by the player
radius plus the `0.02 m` safety gap; the algorithm then sweeps the player's
centre point along the complete requested movement path.

For each contact, it:

1. finds the earliest collision;
2. moves to the last safe point;
3. removes only the remaining movement into that surface; and
4. continues the safe component along the surface.

Equal contacts use stable collision ID. Opposing surfaces stop movement. If
four contacts do not resolve the request, the unsafe remainder is discarded
and the last valid position is retained. Furniture cannot be pushed.

## Free and focused camera

Free movement uses temporary floor position, compass yaw, and pitch. Yaw can
turn through `360°`. Upward and downward look are each limited to `80°`. Roll
is always `0°`.

The base camera stays on the player-cylinder centre line at `Y +1.62 m`. It
cannot lean or offset through a wall. The default vertical field of view is
`70°`, with an approved setting range of `60°` to `90°`. Near draw distance is
`0.10 m`; far normal-floor draw distance is `50 m`. Browser aspect ratio
changes automatically without changing vertical field of view.

The base camera has no head bob, shake, roll, or motion blur. Later optional
effects cannot change collision, targeting, anchors, or campaign state.
Cutscenes use temporary S10 camera instructions. Returning from a cutscene or
focused view restores the unchanged base pose. Physical pose and camera pose
are not saved; load uses the semantic recovery anchor, its authored heading,
level pitch, and zero speed.

Core station focus cameras use the approach anchor at normal eye height and
look at these points:

| Station | Look point `X, Y, Z` |
|---|---:|
| Sample bench | `-2.65, 0.90, -3.45` |
| Experiment setup | `+2.30, 0.95, +3.20` |
| Active rack | `-9.42, 1.20, 0.00` |
| Imaging bay | `+11.30, 1.20, +1.00` |
| Analysis workstation | `+2.60, 1.10, -8.55` |
| Manuscript desk | `+6.60, 0.95, -8.55` |

The fixed focus camera uses the player's selected field of view. It does not
move the physical collision body.

## Semantic room detection

Current semantic location is calculated from the player centre and the
approved floor rectangles. It is temporary presentation information used for
ambience, scene cues, and current-room Interaction Assist. It is not saved and
cannot change campaign truth.

`MR-LOC-FACILITY` is the nested area `X +8.60` to `+12.15` and `Z -4.25` to
`-1.50` inside the imaging/facility room. The remainder of that room is
`MR-LOC-IMAGING`.

`MR-LOC-CORRIDOR` covers the west and northwest connectors.
`MR-LOC-SOUTH-CORRIDOR` covers the south corridor and southern return. Room
interiors take priority over circulation, and the exit vestibule remains its
own location.

At a doorway, location changes only when the player centre crosses the middle
of the wall opening. Exactly on the line, the previous location remains until
movement continues. A walkable point that belongs to no approved semantic
location is a geometry fault.

## Interaction-target register

One fixed target register contains every usable world target. Each record has:

- a stable `MR-TGT-...` ID;
- one of `station`, `character`, `scenePoint`, `focusedInspection`,
  `environmentalGlance`, or `exitBoundary`;
- semantic location ID;
- simple target volume;
- optional approach anchor and focus-camera ID; and
- label text key and, when applicable, an action text key.

An `environmentalGlance` record has a label text key and an explicit `null`
action text key because it shows no prompt or action. Every other target has
both keys.

The closed temporary target states are `inactive`, `inspectionOnly`,
`available`, `requiredScene`, and `focused`. A visible model can remain when
its target is inactive. Application and rules calculate availability; target
presentation does not decide campaign truth.

Normal station targets are at least `0.60 × 0.60 m`. Wall panels and notice
targets are at least `0.90 × 0.70 m`. A character target covers its body from
`Y 0.25` to `1.90 m`. The exit target covers the complete `1.10 × 2.10 m`
doorway. A target can be larger than a small control but cannot extend into
another object or through a wall.

## Raycast and target selection

The normal interaction ray begins at the centre of the camera and extends
`2.25 m`. Distance is measured to the first point of the target volume, not
the object's origin. Walls, glass, closed barriers, characters, and large
furniture stop the ray. A target attached to the first blocking object remains
selectable at that surface; a target behind it does not.

Small visible objects use the larger meaningful support surface when needed,
such as a noticeboard rather than one sheet of paper. Visible mesh triangles
and decoration do not decide selection.

Only one target is active. The most directly viewed valid target wins, then
the nearer target, then stable target ID for an exact tie. A close-range
environmental glance appears only when no normal target has priority.

An interaction request includes target ID and current world-projection
revision. Before focus or action, application checks range, clear sight,
availability, movement permission, and revision again. A stale or invalid
request changes nothing and refreshes the prompt. Looking, inspecting, or
focusing never applies a time-costing campaign command by itself.

## Focused-station lifecycle

Only one focused view can exist. It cannot nest another focused view,
cutscene, or menu. Entry temporarily disables walking and free look, stores
the unchanged base camera pose, and uses the approved focus camera. Entering,
leaving, or switching a free view tab costs no campaign time or energy.

The player can leave before confirmation. Laboratory equipment still requires
physical presence. The shared desk can report remote status but cannot operate
laboratory equipment.

After confirmation of a time-costing station action, application:

1. disables station controls;
2. applies the rules command;
3. validates and saves an applied result;
4. settles required scheduler work;
5. applies the complete new world projection; and
6. only then restores control or transfers it to a due crash or cutscene.

A rejected command changes nothing and shows its reason in the same station
view. If the target becomes invalid before entry completes, focus does not
open. A due crash or cutscene closes focus and takes priority.

## Environmental interaction

Environmental items have no collision. They attach to fixed wall, desk,
noticeboard, label, or equipment mounting slots. Two items can share a slot
only when their act windows cannot overlap. Text or visibility changes cannot
change furniture, route, or target geometry.

A close-range glance item requires a clear centre-camera view within `1.50 m`
and no higher-priority interaction. It uses no prompt, marker, action, or
Interaction Assist highlight. When its complete line first appears,
application records the one-time presentation through S04
`recordContentPresentation`.

A focused environmental item uses the normal `2.25 m` range. Interact opens
semantic text outside the canvas, disables movement, and costs no time or
energy. Back restores the unchanged camera pose. Interaction Assist can
highlight these focused items. Required information depends on neither form.

The exact full and fallback environmental selections remain S06 content. S10
owns visible mounting assets and later-act styling without changing the fixed
slots or targets.

## Operational room targets

The three approved operational room states map to:

| Room state | Physical targets |
|---|---|
| `MR-ROOM-FACILITY-QUEUE` | Facility terminal and imaging bay |
| `MR-ROOM-IMAGING-BOOKING` | Booking board and imaging bay |
| `MR-ROOM-IMAGING-SERVICE-LIMIT` | Service alcove and imaging bay |

The condition, forecast, expiry, and response routes are readable at those
targets before commitment. An unresolved state changes the relevant
interaction, not geometry. The affected imaging target opens the approved
wait, limited, or available scene/support routes before normal work can start.

Start, resolution, or expiry changes the visible indicator and affected target
states together at a safe projection update. It cannot add collision, close a
door, move furniture, or change an anchor. The approved expiry fallback leaves
the station physically reachable in its limited state.

## World projection

Application sends world one complete read-only projection containing:

- campaign revision;
- floor act and work period;
- saved recovery anchor ID;
- Elena, Haoran, Samira, and Gabriel anchor IDs or absence;
- the three operational room-state facts;
- persistent environmental-item IDs;
- Gabriel-pass open state; and
- required-scene location or temporary character overrides.

It does not send complete `CampaignState`.

World applies a projection only after rules and saved data are valid. All
related changes appear together at a safe presentation point. Movement and
interaction remain disabled until the complete projection is ready. Ordinary
walking and camera movement do not create a projection.

The world can present objects, character placement, target availability, and
the conditional passage. It cannot change time, energy, relationships,
evidence, integrity, or another campaign fact. If atomic presentation fails,
the prior valid projection remains and control stays disabled.

Static walls, doors, large furniture, station positions, and normal collision
are created once per open campaign. Floor act and work period change only
lights, non-colliding clutter, notices, equipment indicators, and character
presence. Gabriel's one-way unlock is the only campaign change to static
collision.

Projection changes occur after the new campaign state is saved and before
control returns. A player cannot see an object appear during free movement.
S10 owns the visual transition. Each floor act keeps the approved maximum of
one major and two minor physical presentation changes. These objects have no
collision and cannot cover a target or required information. Existing
environmental IDs can change text, paper, labels, and stamps without using the
physical-change allowance.

## Plain frame contexts

S08 refines the existing S02 ports without adding public methods.

`PlayerPort.updateFrame` receives plain device-independent data:

- frame delta seconds;
- forward and sideways values from `-1` to `+1`;
- requested yaw and pitch changes;
- `canMove`;
- `canLook`; and
- world revision.

S09 will translate physical devices into those values. The request contains no
key, button, browser event, DOM node, or Three.js object.

A successful player result contains floor position, yaw, pitch, current speed,
and collision IDs touched during that frame. Invalid values or a mismatched
world revision discard the frame and preserve the prior pose.

`WorldPort.getMovementContext` returns nearby static collision rectangles,
character soft boundaries, walkable boundary, and world revision.
`WorldPort.getInteractionContext` returns current semantic location, visible
candidate targets, blocking shapes, and world revision. Both are immutable,
plain, and limited to the current frame. They contain no campaign state or
visual resource.

## Lifecycle and failure contract

The approved S02 port methods keep these S08 meanings:

- `start()` validates the fixed spatial plan and target register;
- `openCampaign()` clears temporary focus and movement, applies a complete
  projection, and restores the recovery anchor at level pitch and zero speed;
- `present()` accepts a newer projection or an identical retry, but rejects an
  older or conflicting same-revision projection;
- `closeCampaign()` clears pose, focus, current target, and character
  presentation; and
- repeated `closeCampaign()` and `stop()` are harmless.

Normal no-change interaction rejections are:

- `noTarget`;
- `targetOutOfRange`;
- `targetBlocked`;
- `targetInactive`;
- `worldRevisionChanged`;
- `interactionNotAllowed`; and
- `focusAlreadyActive`.

They preserve campaign, projection, pose, and focus except that application
can refresh a stale prompt.

Fatal S08 faults are invalid fixed geometry, invalid projection, unknown or
obstructed recovery anchor, conflicting same-revision projection, failed
atomic world update, and failed cleanup. Campaign commands and player control
remain disabled and the existing S02 sanitized fatal path owns display.

An invalid one-frame request discards that frame. Reaching the four-contact
movement limit discards only the unsafe remainder and keeps the last valid
pose. Neither event changes campaign state.

## Traversal and no-trap contract

The geometry fixture uses recovery anchors, station approaches, doorway
centres, and permanent openings as route checkpoints. It sweeps the complete
player cylinder in both directions; a point-only path is insufficient.

It proves:

- every required route has at least `1.20 m` physical clear width;
- every core station retains `1.50 m` approach depth;
- every permanent connection works in both directions;
- the complete authored walking loop is `75–90 m`; and
- the exit and all six core stations are reachable from every recovery anchor.

The checks repeat with Gabriel's passage closed and open, each operational
state, every normal character roster, and every required or optional scene
placement. Opening the shortcut can only add a connection. Floor acts, room
states, and characters cannot remove a required route. These are validation
tests, not a runtime navigation system.

## Required future fixtures

S08 requires these future fixture groups:

| Fixture group | Required coverage |
|---|---|
| `MR-S08-GEO-001` | Units, construction bounds, all rooms and circulation, service allocations, areas, walls, openings, and floor union. |
| `MR-S08-COL-001` | Wall and furniture contact, corners, sliding, equal-hit IDs, opposing surfaces, four-contact limit, and boundary containment. |
| `MR-S08-MOV-001` | Speed, acceleration, stopping, diagonal normalization, partial movement, delta limit, interruption zero frame, permission loss, and no catch-up. |
| `MR-S08-ANC-001` | Every recovery, station, supporting, character, step-aside, and scene anchor; clear space; exact restoration; and invalid-anchor rejection. |
| `MR-S08-TGT-001` | Range boundaries, target sizes, blocked sight, surface attachment, deterministic selection, environmental priority, room membership, and stale revision. |
| `MR-S08-FOC-001` | Every focus camera, unchanged physical pose, free exit, one-focus rule, invalid entry, rejected command, applied-command order, and crash or cutscene priority. |
| `MR-S08-WLD-001` | Semantic locations, complete projection application, retry and revision rules, act and period changes, room-state targets, character placement, and Gabriel passage. |
| `MR-S08-TRV-001` | Full-cylinder traversal for all routes, anchors, stations, roster and scene variants, room states, and both shortcut states. |
| `MR-S08-FLT-001` | Every normal rejection and fatal fault, with exact unchanged pose, projection, focus, and campaign expectations. |

Fixtures also prove that physical walking and looking never change campaign
state, that hidden-tab or pause time never creates movement, that presentation
cannot invent availability, and that no Three.js object is needed by a plain
unit fixture.

S12 owns executable fixture shape and expected-value files. S14 owns connected
browser evidence and interface-freeze audit. No test or result exists yet.

## Connected interface lifecycle

`MR-IF-008` is candidate `v1`. S08 defines the spatial plan,
projection, semantic room detection, anchors, characters, conditional
passage, and world lifecycle. S10 now completes renderer, resource, visibility,
transition, and cutscene presentation. Neither block changes the other's
authority.

`MR-IF-009` is candidate `v1`. S08 defines device-independent frame values,
player result, collision and interaction contexts, target geometry, selection,
station-focus geometry, and S08 rejections. S09 now defines device mappings,
remapping, pointer capture, complete focus states, prompts, and accessibility
behaviour.

`MR-IF-001`–`MR-IF-013` are now candidate `v1` through their owning connected
specifications. No interface is frozen, and no status authorizes
implementation.

## S08 acceptance and handoff

S08 is documented only when:

- this complete coordinate, floor, service, topology, wall, opening,
  collision, movement, camera, anchor, target, focus, room-state, projection,
  lifecycle, failure, traversal, and fixture contract is present;
- S02–S07 and the connected numbered design documents contain no
  contradictory world or interaction claim;
- the S08 part of `MR-IF-008` was draft after S08 and the complete interface is
  now candidate `v1` through S10, while connected `MR-IF-009` remains candidate;
- `MR-IMP-OPEN-008` is resolved;
- the implementation controls preserve the documented S08 result and record
  S11 as the current next block after documented S10;
- every implementation gate remains blocked; and
- Leonardo's approved documentation is committed.

S09 owns the documented input, UI, and accessibility connection. S10 now owns
the documented rendering, resource, asset, audio, and presentation connection.
S11 is the next technical-specification block and cannot begin until the S10
documentation commit exists and Leonardo separately approves moving to S11.
