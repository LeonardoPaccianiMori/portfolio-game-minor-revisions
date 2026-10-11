# B6 — World, Movement, and Interaction

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B6); revised
2026-09-15 with the slice dimensions and recovery-anchor baseline, revised
2026-09-29 with the first-person movement baseline, revised 2026-09-30
with the interaction and station baseline, revised 2026-10-11 with the
act and room-state baseline, and revised 2026-10-11 with the short-scene
baseline.**

## Floor (approved)

- Six spaces in one continuous walkable layout: the desk hub, the soil lab,
  the grow room, the PI's office, the corridor, and the break room.
- The floor is small enough to cross in under a minute. Exact metres are fixed
  in the implementation.
- One continuous scene; there are no loading rooms.

### Slice dimensions (implementation baseline)

- Wall thickness 0.2 m, wall height 3 m, door width 1.6 m, player radius
  0.35 m.
- The corridor runs 20.2 by 3 m. The desk hub and the soil lab (10 by 8 m
  each) sit north of it; the grow room (8 by 8 m), the PI's office (6 by 8 m),
  and the break room (5.8 by 8 m) sit south of it. Every room opens onto the
  corridor through one doorway.
- Each space has one recovery anchor; the start anchor is in the desk hub.
- A permanent connectivity test samples the floor on a grid across several
  phases and proves that the walkable floor forms one connected region that
  contains every space and every recovery anchor.

## Movement (approved)

- Comfortable first-person walking with keyboard, mouse, and controller.
- Actions are remappable; the mapping is fixed in B7.
- No head-bob, no forced motion, and no jumping puzzles.

### Slice movement baseline (implementation)

- The camera is the first-person camera at 1.6 m eye height; walking is
  3.0 m/s, keyboard turning and pitching is 120°/s, gamepad stick turning is
  150°/s, mouse look is 0.0025 radians per pixel, and the pitch is limited to
  ±85°. The eye height never bobs.
- The run starts at the desk-hub start anchor, facing the desk board.
- Movement resolves through the static collision and cannot tunnel through
  walls; recovery returns the nearest safe anchor for the future recovery
  control.

## Collision (approved)

- Static collision shapes only; no physics engine.
- No fall damage and no precision-movement requirement.

## Interaction (approved)

- One context-sensitive action with raycast targeting and a short reach.
- The target highlights and shows a prompt; obstruction gives clear feedback.
- Nearby objects can be inspected without committing an action.

### Slice interaction baseline (implementation)

- A forward ray from the eye with a 2.5 m reach; the nearest hit wins, and a
  wall hit before the target reports as blocked. Each prop's interaction
  volume is its footprint up to eye height, so a level gaze still reaches
  low furniture.
- Stations: the soil-lab north bench and the grow-room middle row work an
  experiment step; the break-room table rests; the PI's office desk meets the
  PI; the desk-hub desk is inspect-only until the desk board arrives. Every
  other prop is inspect-only with a plain label.
- The interact key is E and the controller's primary button; the prompt line
  sits at the bottom centre and also shows rejection messages. Interaction
  Assist settings arrive with the accessibility work.

## Division of play (approved)

- Experiments and station actions happen in 3D.
- The paper, the fellowship, and resources live on the desk board.
- Conversations happen in the characters' rooms.

## Room states (approved)

- Authored per-act changes show accretion and decline.
- When a room state affects play, its forecast and effects are visible before
  the player commits to entering.

### Slice room-state baseline (implementation)

- The week implies the act: weeks 1–4 Act I, 5–8 Act II, 9–12 Act III.
- Each act carries a palette (background, ambient and sun light, and the
  pressure accent) and authored prop states: the grow rows decline in height
  and colour across the acts, the desk board yellows, and the bench
  metalwork dulls. The world applies them when the act changes.
- These states are presentation-only in the slice; when an Act content step
  gives a room state a play effect, the B6 forecast rule above applies.
- Collision is unchanged by the prop states.

## No trapping (approved)

- Every space can be exited.
- Recovery anchors return the player to a safe point at any time.

## Short scenes (approved)

- The camera holds briefly for authored moments, then control returns
  automatically.
- Scenes are skip-safe and never force motion.

### Slice short-scene baseline (implementation)

- A scene is data: a stable id, a camera pose, a hold length, and a caption.
  The opening placeholder scene is an establishing look at the department.
- The runner eases the camera in for 0.8 s, holds for the authored time (5 s
  in the placeholder), and eases back for 0.8 s; the whole authored span
  completes correctly even when one frame carries all of it. Any input skips
  the scene instantly: any key, any mouse or gamepad button, locked mouse
  movement, or gamepad activity. The player's own pose is never changed, and
  control returns exactly where they stood.
- While a scene plays, movement, interaction, and board input pause; the
  caption and the skip hint show in the prompt line.
- Act content steps replace the placeholder and add the authored scenes
  through the same mechanism.

## Open items moved to later blocks

- Exact geometry and dimensions (implementation).
- Input mapping and accessibility detail (B7).
- Rendering and materials (B8).
