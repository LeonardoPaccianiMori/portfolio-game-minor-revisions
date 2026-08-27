# Content Specification

Status: **B03 campaign inventory and B08 presentation boundaries approved; full authored inventory incomplete**

This document will become the exhaustive inventory of content required for the
approved game. It records the B03 campaign minimum. B10 will assign stable IDs,
line counts, dependencies, ownership, and final completion state.

## Campaign content categories

| Act | Required content families | Approved B03 minimum |
|---|---|---|
| Supplementary data | Opening PI scene, laboratory onboarding, laser replication, controls, failures, equipment and relationship events | Weeks 1–5; **Clarified** and **A Complete Narrative**; early Haoran, Samira, and Gabriel opportunities |
| Manuscript hell | Revision-board requests, contradictory edit chains, figures, claims, version callbacks, PI meetings | Weeks 6–7; **What We Had**; three required contradictory revision cycles |
| Submission | Preprint flow, journal submissions, rejection messages, resubmission transitions | Weeks 8–9; **Public Record**; The Common Archive, three rejection messages, and `PIIM` receipt |
| Competing futures | Review reports, editor decisions, oxygen/drug demands, industry emails/calls, interviews, PI pressure | Weeks 10–15; **Helpful Comments**, **A Reasonable Response**, three reviewer reports, one editor, Morrow, Aldercroft, and late character scenes |
| Decision and epilogue | Route choice, neither-route handling, modular paper/integrity/energy/relationship scenes | Week 16; **06:42** plus B06 epilogue modules |

## Approved B03 campaign inventory

- One 16-week narrative calendar with five acts.
- Seven mandatory real-time scenes: **Clarified**, **A Complete Narrative**,
  **What We Had**, **Public Record**, **Helpful Comments**, **A Reasonable
  Response**, and **06:42**.
- Ten optional character scenes: two for Haoran, two for Samira, two for
  Gabriel, one for Elena, and three Morrow contacts with Camila.
- One public-preprint event, three early journal rejections, one `PIIM` editor,
  and three `PIIM` reviewer reports.
- One Week 13 Aldercroft invitation-or-rejection message.
- Four Week 14 paper-response forms: defensible resubmission, Elena's stronger
  response, journal withdrawal, and public-record withdrawal.
- One Week 15 cascade: `PIIM` state, conditional Morrow offer, and Elena's
  private response.
- One Week 16 career-choice scene. Its B06 epilogue uses career, paper,
  integrity, energy, and relationship state.
- A 15–20-minute target and 22-minute maximum for all non-interactive scenes.

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
- every save flag, event flag, content identifier, and English text key.

## B08 language and voice boundary

The first release uses English only. It does not plan localization. Dialogue is
text-led. Supporting characters can use small original non-lexical vocal
palettes, but the game has no full voice acting, lip sync, cloned voice, or
required information carried only by sound. B10 must inventory the exact
English strings, captions, non-lexical sound variants, music cues, and
attribution records.

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
- The 90-minute fallback cut line and any later mandatory-versus-optional
  changes.
- Randomized/conditional content pools and repeat-prevention rules.
- Exact English text, caption, non-lexical sound, and music inventory.
- Content authoring formats and validation tooling.
