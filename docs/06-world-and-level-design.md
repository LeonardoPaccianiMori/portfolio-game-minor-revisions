# World and Level Design

Status: **approved through B07; presentation execution deferred**

## Confirmed world structure

The game takes place primarily on one compact, densely designed research floor
at Bellwether University rather than across a multi-building campus. The
Department of Developmental Systems contains the Cardiac Patterning Group and
the shared facilities used by the group. The floor is an evolving "academic
terrarium": small enough for asset reuse, dense enough for repeated spaces to
acquire new narrative meaning.

## Required playable spaces

- **Main laboratory:** preparation and shared equipment.
- **Tissue-culture room:** organoid maintenance and sample health.
- **Imaging room:** laser injury, microscopy, rhythm and contraction analysis.
- **Shared desk area:** the protagonist's email, data analysis, calendar, and
  manuscript board, plus workspaces for Haoran and Samira.
- **PI office:** meetings and real-time cutscenes; mysteriously warmer and
  better lit than the rest of the floor.
- **Facility station:** Gabriel's operational base near the imaging and shared
  equipment areas.
- **Break room and corridor:** colleagues, gossip, notices, and environmental
  storytelling.
- **Building exit:** mundane at first and increasingly meaningful and inviting
  as the industry route develops.

## B04 functional interaction locations

B04 fixes six functional locations. B07 decides their room placement,
dimensions, adjacency, and visual form.

| Location | Player use |
|---|---|
| Sample bench | Select, label, and configure a sample group. |
| Experiment setup station | Start a laser, oxygen-loss, or drug-exposure experiment. |
| Active sample rack | Read the physical label and current state of each active group. |
| Imaging and monitoring bay | Inspect evidence views and make a monitoring decision. |
| Analysis workstation | Interpret results and create evidence cards. |
| Manuscript desk | Arrange paper cards, respond to requests, and commit revisions. |

The desk work queue can show status from elsewhere on the floor, but it cannot
operate equipment. This supports repeated movement through a compact laboratory
without requiring a general item inventory.

## B02 character-location boundary

These are broad location contracts. The B07 schedule below gives the exact
period anchors:

| Character | Main physical or communication locations |
|---|---|
| Elena Markovic | PI office, main laboratory, and planned walk-throughs |
| Haoran Zhao | Tissue-culture room, main laboratory bench, and shared desk area |
| Samira El-Masri | Imaging room, shared desk area, and break room |
| Gabriel da Silva | Facility station, imaging room, and shared equipment areas |
| Camila Torres | Email and video calls at the protagonist's desk |
| Editor and reviewers | Messages and reports only |

Camila, the editor, and the reviewers do not need physical navigation or 3D
models during the playable semester. B07 documents exact schedules, routes,
event staging, and crowd implication.

## Implied wider university

Inaccessible doors, windows, announcements, posters, email, booking systems,
and characters who are always elsewhere imply a larger university without
requiring it to be modelled. Inaccessible spaces must feel intentional rather
than like missing content.

## Environmental progression

Across the five acts:

- new notices cover old notices;
- temporary repairs become permanent;
- equipment accumulates booking labels and contradictory instructions;
- clutter and malfunction increase;
- lighting becomes colder during manuscript and peer-review pressure;
- access and character behaviour change with relationships and events;
- the organoids remain conspicuously alive while the protagonist tires;
- the exit becomes visually more appealing.

## First-person constraints

Rooms and corridors must avoid third-person camera concerns but still support
comfortable first-person navigation, readable interaction distances, and
clear landmarks. Occasional external cinematic cameras may show the
protagonist or reframe a relationship scene.

## B07 scaled floor plan

The complete floor is about **400 m²**, including circulation, the exit, and
small utility areas. A complete walking loop is 75–90 m. Core work stations
are 5–20 m apart. North is at the top of this construction plan:

```text
PI office ───────── Shared desks
    │                    │
Tissue culture ─── Main laboratory ─── Imaging / facility
    │                    │
Break room ─────── South corridor ─── Exit vestibule
```

| Space | Approximate size | Primary use |
|---|---:|---|
| Main laboratory | 10 m × 8.5 m, 85 m² | Sample preparation and experiment setup. |
| Tissue-culture room | 5 m × 7 m, 35 m² | Active sample rack and tissue health. |
| Imaging and facility room | 7 m × 8 m, about 55 m² | Monitoring bay, imaging, and service work. |
| Shared desks | 11 m × 5 m, 55 m² | Analysis, manuscript, messages, and desk scenes. |
| PI office | 4 m × 5 m, 20 m² | Elena's meetings and required scenes. |
| Break room | 6 m × 5 m, 30 m² | Protected break, small talk, and notices. |
| Corridor, exit, and utility | about 120 m² | South corridor, exit vestibule, door recesses, and non-playable service space. |

The main laboratory and shared desks use glass partitions. Tissue culture and
imaging are enclosed glass rooms. Gabriel's facility station is immediately
outside, or directly beside, the imaging room. The PI office looks toward the
shared desks. The break room opens onto the south corridor. The exit is not
visible from every room.

## B07 routes, sightlines, and landmarks

The main work loop is PI office, shared desks, main laboratory, tissue culture,
then PI office. The support loop is tissue culture, main laboratory, south
corridor, break room, then tissue culture. Imaging attaches to the main
laboratory. The exit attaches to the south corridor.

Gabriel's service pass-through later links shared desks and imaging. It opens
only when Gabriel working trust is 61 or more. It is a reward for respectful
work, not a required route. No other shortcut or player-controlled door exists.

Three landmarks give orientation without a minimap or permanent objective
arrows:

- the organoid glow in tissue culture;
- the warm PI office; and
- the exit light in the south corridor.

Room signs, equipment sound, corridor bends, doors, and glass partitions give
additional orientation and limit long sightlines. The player can usually see
the next room or a landmark, but cannot see the entire floor at once.

## B07 access, doors, and movement

All core rooms are accessible from Week 1. Later acts change bookings,
staging, lights, equipment state, and character presence. They do not use
artificial room locks. Before Week 16, the exit interaction gives one dry
internal response. It does not start a false escape sequence.

Core doors open automatically. Labelled service and storage doors imply the
wider building and remain non-playable dressing. Active scenes can prevent a
new time-costing action, but they do not close a room or teleport the player.

The floor uses a fixed brisk walking speed. It has no stamina, sprint, jump,
crouch, platforming, or movement puzzle. Required routes keep about 1.2 m of
clear passage, and each active station has about 1.5 m of approach space.
Walls, glass, and large furniture use simple collision. Characters use soft
collision and step aside. They cannot trap the player.

## B07 tutorial and opening path

The game begins at 06:42 in Week 1, beside the active sample rack in tissue
culture. The player sees unexpected recovery, walks to the main laboratory,
and Elena enters. **Clarified** begins there and moves to the PI office.
Control returns at shared desks.

This route teaches the sample state, room signs, movement, the first
interaction, and the relation between bench work, a PI request, and desk work.
It does not use a floating tutorial arrow, a separate training room, or a
forced input drill.

## B07 functional stations and room objects

There is no loose pickup system, general item inventory, or hidden-object
hunt. Each room has one main functional station cluster and no more than two
optional inspectable or social objects. The player can inspect an object for
story or start a stated interaction. It does not enter an inventory.

| Room | Main station cluster | Optional objects and story support |
|---|---|---|
| Main laboratory | Sample bench and experiment setup station | Booking screen; equipment labels. |
| Tissue culture | Active sample rack | Status display; maintenance notice. |
| Imaging and facility | Imaging and monitoring bay | Queue terminal; service alcove. |
| Shared desks | Analysis workstation and manuscript desk | Haoran's moving thesis list; Samira's sketchbook. |
| PI office | Required scene area | Grant calendar; revision stack. |
| Break room | Protected-break interaction | Noticeboard; damaged coffee machine. |
| Corridor and exit | Exit boundary and access terminal | Posters; access panel; changing notices. |

The six B04 functional locations therefore have fixed placement:

| Functional location | B07 location |
|---|---|
| Sample bench | Main laboratory. |
| Experiment setup station | Main laboratory. |
| Active sample rack | Tissue-culture room. |
| Imaging and monitoring bay | Imaging room. |
| Analysis workstation | Shared desks. |
| Manuscript desk | Shared desks. |

The desk can show a work queue from elsewhere, but cannot operate equipment.
Meaningful monitoring, intervention, and equipment work still require the
short physical walk to the station.

## B07 required and optional scene staging

Every required scene becomes due only at a safe point. An in-world cue, such
as a voice, lit office, open door, desk message, or character presence, calls
the player to it. The player can walk freely, but cannot start another
time-costing action before the scene occurs. Optional scenes remain available
until their stated deadline.

| Scene | B07 spatial staging |
|---|---|
| **Clarified** | Tissue-culture rack to main laboratory, then PI office. Control returns at shared desks. |
| **A Complete Narrative** | PI office, called by its warm light and revision stack. |
| **What We Had** | Shared desks, then PI office. |
| **Public Record** | Shared-desk manuscript station. |
| **Helpful Comments** | Shared desks, then PI office. |
| **A Reasonable Response** | Shared desks, then PI office. |
| **06:42** | Research floor to the glass exit vestibule. |

The optional-scene anchors are fixed: **Borrowed Time** is in tissue culture;
**The Missing Replicate** at shared desks; **Shared Instrument** at the imaging
booking board; **Not in My Figure** at shared desks or in the break room;
**The Queue** at the facility station; **The Archive** in the imaging service
alcove; **The Future** in the PI office after-hours; and Camila's messages and
calls at the protagonist desk.

## B07 character presence and schedules

Characters use authored location schedules. They do not use free roaming or a
simulated crowd. A short authored walk can occur in a scene. A campaign beat,
optional scene, equipment event, or relationship result overrides the normal
anchor.

| Character | Early | Late | Night | After-hours |
|---|---|---|---|---|
| Elena | PI office | Main laboratory or PI office | Scene only | Absent except **The Future** |
| Haoran | Tissue culture | Main laboratory or shared desks | Rare desk scene | Absent |
| Samira | Shared desks or break room | Imaging room | Scene only | Absent |
| Gabriel | Facility station | Facility station or imaging room | Remote or on-call only | Absent |
| Camila | Remote only | Remote only | Remote only | Remote only |

Early and late have normal service. Night has quiet rooms, available desk and
laboratory work, and limited people. After-hours has reduced light, empty
corridors, and limited shared services. Equipment can remain active in every
period when its authored booking or fault state permits it.

## B07 semester states and environmental storytelling

The floor has five persistent act states. They alter room function and story
meaning, not the room plan.

| Weeks | State | Floor change |
|---|---|---|
| 1–4 | Orderly but overbooked | Booking pressure, early maintenance, and working equipment. |
| 5–7 | Manuscript clutter | Revision piles, contradictory notes, and increasingly cold shared work. |
| 8–9 | Rejection and public record | Preprint and rejection traces appear. The exit begins to look more inviting. |
| 10–14 | Review pressure | Colder light, repairs, warnings, queue pressure, and accumulated clutter. |
| 15–16 | Decision horizon | Emptier rooms, accumulated debris, cleared desk traces, and the most inviting exit. |

The time-of-day layer combines with the act state:

| Period | Functional lighting and activity |
|---|---|
| Early | Blue-grey exterior light and normal service. |
| Late | Flat daylight and full fluorescent activity. |
| Night | Dark windows, quiet rooms, and equipment light pools. |
| After-hours | Reduced lighting, emptier corridors, and limited shared services. |

The PI office stays warmer than the surrounding floor. From Week 8, the exit
light, notices, and outside view become more inviting for every player. This
does not depend on Morrow eligibility and does not imply a best ending.

Environmental storytelling uses five categories:

- bureaucracy and policy;
- grant, publication, and career traces;
- personal traces;
- repairs, warnings, and clutter; and
- exit-facing signs.

Details persist unless a later event visibly replaces them. Updates occur only
at an act boundary or a major scene. Across the whole floor, each phase permits
at most one major and two minor room changes. A change appears only on safe
room entry, never as a visible pop-in in front of the player.

## B07 continuous-floor performance boundary

The floor has no room loading screens. Doors, glass partitions, and bends limit
sightlines. At most two or three nearby rooms need full detail at once. Distant
rooms use lower-detail geometry, sound, lighting, silhouettes, and messages.
There is no simulated crowd. Sound, lighting, silhouettes, notices, and remote
communication imply the wider university.

B09 chooses the technical rendering, collision, navigation, occlusion,
level-of-detail, and loading method. It must meet this spatial contract.

## B07 acceptance criteria

B07 is complete only if all of the following are true:

- the construction plan has the approved topology, approximately 400 m² floor
  area, room dimensions, 75–90 m loop, and 5–20 m core station spacing;
- all six functional locations are placed, and no required equipment action
  can occur remotely from the desk;
- all core rooms are available from Week 1, the pass-through is optional, and
  the exit behaves correctly before and during Week 16;
- the opening route, seven required scenes, and ten optional scene anchors
  have stated spatial staging without teleport or false room locks;
- every normal work period has a character-presence rule and authored events
  can override it safely;
- the five act states, time layers, environmental categories, and persistence
  limits can be implemented without changing the floor plan;
- the object inventory has no loose pickups, hidden item hunt, or unbounded
  prop requirement; and
- the level can be implemented as one continuous floor with bounded visible
  detail and no simulated crowd.

## Deferred work

B08 owns final palette, materials, lighting technology, character appearance,
camera, animation, audio, controls, UI, accessibility settings, and asset
inventory. B09 owns the technical implementation and measured performance
budget. B10 owns exact scene text, notice text, prop identifiers, and full
content counts. No B07 decision authorizes implementation code or production
assets.
