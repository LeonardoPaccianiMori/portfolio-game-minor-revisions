# Asset Manifest

Status: **B10 documented; no production asset selected or imported**

## Purpose and integration gate

This manifest is the source of truth for asset provenance. Every external,
generated, or original production asset must have a complete verified record
here before it enters the repository as an asset. This rule also applies to a
prototype, temporary asset folder, test scene, or branch.

Public downloadability is not permission. Verify the exact licence version,
creator, public-source redistribution, modification, deployed-web use,
attribution, and compatibility with the future public release. A candidate
found during research is not an approved asset and must not be copied into the
repository before verification.

The future public-source plan is MIT for code and CC BY 4.0 for Leonardo's
original non-code work. No public licence file is added now. Third-party
material keeps its own verified licence and attribution terms.

## B10 planning inventory

The following are asset roles and counts, not selected asset records. Do not
turn them into manifest rows until a real source or original-work record is
available and verified.

| Planning role | Count or limit | Source status |
|---|---:|---|
| Modular floor kit | 1 | No source selected |
| Reusable prop families | 20 planned; never more than 24 | No source selected |
| Functional station kits | 6 | No source selected |
| Physical NPC models | 4 | No source selected |
| Protagonist silhouette | 1 | No source selected |
| Camila desk-monitor portrait | 1 original 2D portrait | No source selected |
| Reusable interface templates | Bounded reusable set | No source selected |
| Room-ambience roles | 8 | No source selected |
| System-cue roles | 3 | No source selected |
| Non-lexical dialogue palettes | 5 palettes with 8 sounds each | No source selected |
| Music-stem roles | 6 | No source selected |
| Lighting presets | 20 | Authored settings, not a third-party asset |
| Live text and SVG notices | Author-authored content | No source selected |

The approved planned prop families are: desk, chair, storage unit, shelf,
laboratory bench, stool, glass partition, automatic door, generic monitor,
keyboard, paper stack, notice rail, clipboard, cable or tray, generic
equipment housing, coffee machine, break-room table, corridor sign, service
panel, and exit fixture.

## Phase-1 feasibility record

Before vertical-slice asset production, every planning role must have a
feasibility result. Record the likely reusable or original source route,
licence and redistribution risk, estimated non-LLM direct cost, estimated
original-work effort, and `feasible`, `needs rework`, or `remove role` result.
This planning record does not approve a candidate or permit file integration.
The four physical NPCs, five non-lexical vocal palettes, six music stems,
modular floor, and prop families cannot remain `not checked` when the slice
gate begins.

The EUR 150 production ceiling applies to non-LLM project purchases. Normal
LLM subscriptions, token use, token limits, and limit resets are outside it.
No paid hosting or runtime external service is planned.

## Allowed-source boundary

Prefer original work, CC0, CC BY, Open Font License, MIT, Apache, or paid
assets with equally clear public redistribution and modification rights.
Do not use non-commercial, no-derivatives, unclear, display-only, or
private-use assets by default.

Do not select a complete pre-built laboratory scene, an unmodified character
pack, real university, journal, company, or game branding, a real person's
likeness or voice, private source material, or an asset with unclear
redistribution terms. Recreate or exclude an unsuitable role.

Generated assets are allowed only when the relevant terms permit public reuse.
They need the tool or service, date, source inputs, human changes, terms,
uncertainty, and release path. Do not use private source material or a real
person's likeness or voice as input.

## Required asset record fields

Before integration, each real record must state:

| Field | Required information |
|---|---|
| Asset ID | Stable final identifier. Do not use a planning-role label as an asset ID. |
| File or files | Exact future repository path and source-format details. |
| Purpose | Approved game role and linked content or requirement IDs. |
| Creator | Individual, organisation, or Leonardo. |
| Source | Exact source URL or original-work record. |
| Licence | Exact licence name, version, and relevant terms link. |
| Attribution | Exact credit text and Credits/Licences placement. |
| Modification | All expected or completed changes. |
| Redistribution | Evidence for public repository and deployed-game redistribution. |
| Technical facts | Format, codec where relevant, texture size, source version, and file hash after integration. |
| Verification | Verification date, reviewer, and any remaining uncertainty. |

## Current verified asset records

| Asset ID | File(s) | Purpose | Creator | Source | Licence | Attribution | Modification | Redistribution | Technical facts | Verification |
|---|---|---|---|---|---|---|---|---|---|---|
| None | None | This design repository contains no production assets. | None | None | None | None | None | None | None | 2026-08-28 confirmed |

## Required check before integration

1. Confirm the asset role is within the approved inventory and style.
2. Complete every required record field above.
3. Confirm public redistribution, modification, and attribution rights.
4. Check the technical format against the approved GLB or glTF, texture,
   live-text, audio, and download boundaries.
5. Add the Credits/Licences entry plan.
6. Review the completed manifest record before integration.

Exact source files, codecs, hashes, final asset IDs, and browser measurements
are deliberate later verified facts. Do not invent or pre-approve them in this
document.
