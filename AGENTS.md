# Minor Revisions Agent Contract

These rules apply to the entire repository.

## Current phase

The repository is in design and evaluation. Do not create game code, package
configuration, production assets, or deployment configuration until
`docs/00-design-index.md` marks the implementation-readiness gate `approved`
following Leonardo's explicit approval.

## Mandatory bootstrap

Before non-trivial work, read `README.md`, `docs/00-design-index.md`,
`docs/decision-log.md`, and every domain document relevant to the task.

## Design authority

- Numbered design documents are authoritative for implementation details.
- `docs/decision-log.md` records approvals and supersessions; it does not
  replace the full specification.
- Distinguish `confirmed`, `proposed`, and `open`. Never turn an inference or a
  plausible idea into a confirmed decision.
- Every creative or technical choice that affects implementation must be
  written in the relevant document before code depends on it.
- Preserve a universal fictional world. Do not reproduce real people,
  institutions, or Leonardo's experiences literally.

## Change discipline

- Update the design index and decision log when a decision changes document
  readiness or supersedes an earlier choice.
- Do not silently resolve contradictions. Record them and ask Leonardo.
- Use real commit timestamps. Do not fabricate project history.
- Keep credentials, private employer material, and unlicensed assets out of
  the repository.
- Record every external asset in `assets/ASSET_MANIFEST.md` before integration.

## Later implementation work

When implementation is authorized, give each worker explicit file or subsystem
ownership. Workers are not alone in the repository: they must preserve and
accommodate others' changes, avoid overlapping edits, and report assumptions.
All implementation must trace to approved requirements and acceptance criteria
in `docs/15-implementation-contract.md`.
