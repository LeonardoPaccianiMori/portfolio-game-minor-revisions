# Content Specification

Status: **structure seeded; authored inventory incomplete**

This document will become the exhaustive inventory of content required for the
approved game. It currently records confirmed categories and explicitly avoids
inventing final counts.

## Campaign content categories

| Act | Required content families | Exact inventory |
|---|---|---|
| Supplementary data | Opening PI scene, laboratory onboarding, laser replication, controls, failures, equipment and relationship events | Open |
| Manuscript hell | Revision-board requests, contradictory edit chains, figures, claims, version callbacks, PI meetings | Open |
| Submission | Preprint flow, journal submissions, rejection messages, resubmission transitions | Open |
| Competing futures | Review reports, editor decisions, oxygen/drug demands, industry emails/calls, interviews, PI pressure | Open |
| Decision and epilogue | Route choice, neither-route handling, modular paper/integrity/energy/relationship scenes | Open |

## Required authored inventories

The final specification must enumerate, identify, and cross-reference:

- every mandatory and optional campaign event;
- every PI and reviewer request and its prerequisites;
- every experiment variant, control, sample state, outcome, and readable clue;
- every manuscript section, figure, claim, supplementary item, and revision;
- every email, notice, sign, announcement, report, and environmental change;
- every dialogue scene, choice, response, relationship consequence, and
  internal narration line;
- every cutscene, camera sequence, caption, skip point, and checkpoint;
- every room state, prop state, equipment failure, access change, and NPC
  schedule;
- every tutorial, prompt, menu, tooltip, warning, and accessibility string;
- every ending module and valid combination;
- every sound, music cue, visual effect, animation, model, texture, font, and
  attribution;
- every save flag, event flag, content identifier, and localization key.

## Content-ID convention

A final convention is not approved. Candidate prefixes include `ACT`, `EVT`,
`EXP`, `REQ`, `DIA`, `MAIL`, `CUT`, `END`, `LOC`, and `AST`. IDs must remain
stable once implementation begins and must map to requirements and tests.

## Scope discipline

- Reuse systems, rooms, equipment, and characters with changed context rather
  than padding runtime through near-duplicate content.
- Optional content must reinforce character, science, consequence, or satire.
- The three-hour target is not permission for unbounded dialogue or asset work.
- The 90-minute fallback must be expressible as a coherent subset, not a
  damaged full game.

## Open decisions

- Exact item counts, IDs, ownership, dependencies, and completion state.
- Mandatory versus optional content and the 90-minute fallback cut line.
- Randomized/conditional content pools and repeat-prevention rules.
- Localization and voice-production inventory.
- Content authoring formats and validation tooling.
