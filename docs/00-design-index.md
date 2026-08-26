# Design Index and Readiness Gate

Status: **seeded; not implementation-ready**

This index is the completeness contract for *Minor Revisions*. `Seeded` means
the document contains all decisions confirmed as of 2026-08-26 plus explicit
gaps. It does not mean that the domain is finished.

| Document | Domain | Status | Principal unresolved work |
|---|---|---|---|
| `01-vision-and-pillars.md` | Thesis, tone, scope | Seeded | Audience, detailed non-goals, success criteria |
| `02-player-experience-and-loop.md` | Moment-to-moment play | Seeded | Exact interactions, time model, tuning |
| `03-narrative-and-campaign.md` | Five-act story | Seeded | Beat sheet, event order, branching details |
| `04-science-and-experiments.md` | Fictional science | Seeded | Origin, mechanism, controls, exact experiment chain |
| `05-characters-and-dialogue.md` | Cast and voice | Seeded | Names, identities, arcs, dialogue system |
| `06-world-and-level-design.md` | Institute floor | Seeded | Layout, traversal, unlocks, room specifications |
| `07-systems-and-balance.md` | State and rules | Seeded | Formulas, visibility, thresholds, balance |
| `08-endings-and-state-matrix.md` | Outcomes | Seeded | Unlock rules, combinations, epilogue content |
| `09-art-audio-and-assets.md` | Presentation | Seeded | Audio direction, budgets, concrete asset inventory |
| `10-ui-ux-accessibility.md` | Interface and access | Seeded | Control scheme, HUD, accessibility baseline |
| `11-technical-architecture.md` | Runtime design | Seeded | Stack, modules, save schema, performance budget |
| `12-content-specification.md` | Content inventory | Seeded | Exact counts and all authored content |
| `13-testing-and-evaluation.md` | Quality evidence | Seeded | Targets, playtest protocol, acceptance thresholds |
| `14-production-plan.md` | Delivery strategy | Seeded | Time/cost budget, milestones, stop criteria |
| `15-implementation-contract.md` | Agent handoff | Seeded | Requirement IDs and approved work packages |
| `decision-log.md` | Approved decisions | Current | Continue for every material choice |
| `glossary.md` | Shared terminology | Seeded | Expand as systems receive final names |
| `../assets/ASSET_MANIFEST.md` | Asset provenance | Ready for use | No assets selected yet |

## Implementation-readiness gate

The gate may be changed to `approved` only after Leonardo explicitly approves
the latest complete specification and all of the following are true:

- every implementation-affecting choice is confirmed or deliberately deferred
  outside the approved scope;
- narrative beats, characters, experiment content, state transitions, and
  ending conditions are internally consistent;
- UI, controls, accessibility, save behaviour, and failure recovery have
  testable acceptance criteria;
- the science is fictionalized safely and does not imply unsupported real-world
  regenerative capability or provide actionable wet-lab protocols;
- technical architecture, performance targets, supported browsers, and data
  schemas are specified;
- the asset inventory has acceptable provenance and licensing paths;
- the vertical-slice scope, production budget, evaluation method, and stop or
  reframe criteria are approved;
- `docs/15-implementation-contract.md` maps agent-owned work packages to
  requirements and validation.

Current gate: **blocked by unresolved design decisions; no implementation
authorized**.
