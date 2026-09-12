# B10 — Testing, Evaluation, and Agent Workflow

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B10).**

## Test layers (approved)

| Layer              | Scope                                                          |
| ------------------ | -------------------------------------------------------------- |
| Unit               | `rules` and `content` validation                               |
| Browser            | `world`, `player`, `interaction`, `ui`, `audio`, `persistence` |
| Content validation | Schemas, references, counts, word budget, and safety flags     |
| Manual             | Leonardo's direct play and per-act reviews                     |

- Tests use controlled fakes for time, events, and storage. No network.
- A failing test is never relabelled as a pass.

## Fixtures and acceptance (approved)

- Stable acceptance rows per requirement.
- Traceability from design decisions to tests to evidence.
- Fixtures are versioned with the content.

## Evaluation (approved)

- Leonardo's direct testing is the primary human evidence.
- An agent-run comprehension probe supports it.
- Informal testers are optional: no data collection and no research framing.
- Per-act joke-density reviews; negative results are recorded.

## Evidence (approved)

- Every step records its commands, results, and limitations.
- No invented, inferred, or relabelled results.
- Evidence is durable and private.

## Agent workflow (approved)

- The primary owns plans, tracked writes, records, integration, and push.
- Subagents are read-only reviewers and researchers, or one bounded worker at a
  time. They cannot commit, delegate, or use the network.
- Independent review comes from a different model family.
- Step records replace the former work orders and contribution files.

## Step lifecycle (approved)

1. Approved exact plan.
2. Step record created.
3. Implementation by the primary or one worker.
4. Checks.
5. Primary pre-review audit.
6. Fresh independent review.
7. Corrections.
8. Integration on `main`.
9. Leonardo's test for player-visible steps.
10. Explicit acceptance.
11. Records and push.

## Cost snapshots (approved)

- Every milestone commit includes a cost snapshot row in `docs/costs.md`
  (`D-011`).

## Release boundary and definition of done (approved)

- No release, licence, deployment, or portfolio work before final acceptance.
- The A8 stop rules apply: if the vertical slice fails the fun, humour, and
  comprehension checks after one correction cycle, pause and re-scope.
- Done means implemented, tested, reviewed, accepted, and recorded.
