# B4 — Content and Data

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B4).**

## Content layout (approved)

| Path                      | Contents                                            |
| ------------------------- | --------------------------------------------------- |
| `content/paper/`          | Claims, requirements, evidence definitions, framing |
| `content/fellowship/`     | Requirements, answer options, deadline, panel data  |
| `content/events/`         | Authored events with conditions and effects         |
| `content/scenes/`         | Authored scene text and choice data                 |
| `content/messages/`       | Emails and institutional messages                   |
| `content/notices/`        | Environmental notices and forms                     |
| `content/endings/`        | The four endings and the personnel file             |
| `content/strings.en.json` | The English string table, keyed by ID               |
| `content/manifest.json`   | Content version and validated counts                |

## Stable IDs (approved)

- Dotted namespaces, for example `paper.claim.mechanism`,
  `paper.requirement.controls`, `paper.evidence.sequence.2`,
  `fellowship.requirement.impact`, `fellowship.answer.impact.inflate`,
  `event.rent.1`, `scene.pi-office.3`, `message.funding-review`,
  `notice.wellness.4`, and `ending.hollow`.
- IDs are never reused. A rename becomes a new ID with a migration note.

## Schemas and validation (approved)

- Strict schemas validated at build.
- Invalid, dangling, duplicated, or missing content fails the build.
- Validation covers references, counts, word budget, and safety flags.
- Placeholder text is not final content. Development-only incomplete markers
  can never ship.

## Text (approved)

- One English strings file keyed by ID.
- No dialogue is generated at runtime.
- Text is separated from logic.

## Shared evidence (approved)

- One evidence set. Each evidence object has an ID, a state (current or stale),
  and a track assignment: paper, fellowship, or both.
- Assigning to both sets an overlap flag. Discovered overlap damages both
  evaluations.
- The fellowship's feasibility and impact answers read the current framing; a
  reframe marks dependent answers stale.

## Authored events (approved)

- Events are data with conditions and effects.
- They are evaluated deterministically in a fixed documented order.
- The same state, seed, and command always produce the same event outcome.

## Safety and completeness (approved)

- Fictional, non-actionable science. No real protocol, treatment claim, or
  unsupported capability.
- Incomplete content markers are development-only and fail the build if they
  would ship.
- The word budget from Block A7 is checked by the validator.

## Open items moved to later blocks

- Exact schema fields and the event catalogue (implementation).
- Save and migration linkage (B5).
- Fixtures, acceptance rows, and evidence (B10).
