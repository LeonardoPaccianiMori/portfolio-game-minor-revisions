# B6 — World, Movement, and Interaction

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B6); revised
2026-09-15 with the slice dimensions and recovery-anchor baseline.**

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
  phases and proves that the region reachable from the start anchor contains
  every space and every recovery anchor. Isolated sampling slivers that no
  player can enter are excluded by construction.

## Movement (approved)

- Comfortable first-person walking with keyboard, mouse, and controller.
- Actions are remappable; the mapping is fixed in B7.
- No head-bob, no forced motion, and no jumping puzzles.

## Collision (approved)

- Static collision shapes only; no physics engine.
- No fall damage and no precision-movement requirement.

## Interaction (approved)

- One context-sensitive action with raycast targeting and a short reach.
- The target highlights and shows a prompt; obstruction gives clear feedback.
- Nearby objects can be inspected without committing an action.

## Division of play (approved)

- Experiments and station actions happen in 3D.
- The paper, the fellowship, and resources live on the desk board.
- Conversations happen in the characters' rooms.

## Room states (approved)

- Authored per-act changes show accretion and decline.
- When a room state affects play, its forecast and effects are visible before
  the player commits to entering.

## No trapping (approved)

- Every space can be exited.
- Recovery anchors return the player to a safe point at any time.

## Short scenes (approved)

- The camera holds briefly for authored moments, then control returns
  automatically.
- Scenes are skip-safe and never force motion.

## Open items moved to later blocks

- Exact geometry and dimensions (implementation).
- Input mapping and accessibility detail (B7).
- Rendering and materials (B8).
