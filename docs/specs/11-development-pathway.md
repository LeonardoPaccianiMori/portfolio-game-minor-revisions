# C1 — Pathway Model, Gates, and Step Format

Status: **Documented — approved by Leonardo on 2026-09-10 (Block C1).**

## Development phases (approved)

1. **Foundation** — toolchain, repository, start page, and the save skeleton.
2. **Core rules and the week loop** — state, commands, resources, and the paper
   and fellowship tracks.
3. **World and interaction** — the compact floor, movement, stations, and the
   desk board.
4. **Content** — scenes, messages, notices, events, and endings.
5. **Presentation and assets** — visual language, audio, and licensed assets.
6. **Integration and polish** — performance, accessibility, diagnostics, and
   browser checks.
7. **Final acceptance** — the private playthrough and final acceptance.

## Gates (approved)

| Gate             | Required evidence                                                  | What it permits                   |
| ---------------- | ------------------------------------------------------------------ | --------------------------------- |
| First playable   | One complete week loop in the 3D department with automated checks  | Continue to systems and content   |
| Slice            | Act I complete with temporary assets; Leonardo plays 15–20 minutes | Continue to the full content      |
| Content complete | All twelve weeks, scenes, and endings present with placeholders    | Continue to assets and polish     |
| Feature complete | Real assets, audio, accessibility, and performance in place        | Final acceptance                  |
| Final acceptance | Leonardo's full 60-minute playthrough                              | Release-candidate discussion only |

## Step size (approved)

- One reviewable deliverable per step, ideally one working session.
- Merging or splitting a step requires Leonardo's approval and a roadmap
  update.

## Step records (approved)

- Location: `docs/development/steps/`.
- File name: `STEP-<three digits>-<slug>.md`.
- Frontmatter: `id`, `type`, `status`, `phase`, `gate`, `created`, `updated`,
  `base_commit`, `branch`, `primary_model`, and `primary_variant`.
- Sections: `Objective`, `Plain-language effect`, `Owned paths`,
  `Prohibited paths`, `Allowed sources`, `Authority and traceability`,
  `Accepted dependencies`, `Plan`, `Tasks`, `Non-goals`,
  `Required checks and evidence`, `Safety and quality boundaries`,
  `Execution record`, `Independent review`, `Corrections`, and
  `Leonardo decision`.

## Numbering (approved)

- Step numbers are sequential and never reused.
- Legacy v1 records remain in Git history only.

## Dependencies (approved)

- A step starts only after its accepted predecessors and its own approved exact
  plan.
- Approval of one step never approves a later step.

## Review cadence (approved)

- Every step runs one primary pre-review audit and one fresh independent
  review from a different model family.
- Record-only corrections use focused primary validation.
- No worker reviews its own work.

## Milestones (approved)

- Every milestone step includes its cost snapshot in `docs/costs.md` and an
  update to `docs/design/00-process.md` in the same commit.

## Open items moved to later blocks

- The ordered step list (C2).
