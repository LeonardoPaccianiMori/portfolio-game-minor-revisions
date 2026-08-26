# Implementation Contract

Status: **implementation prohibited; contract skeleton seeded**

## Authorization gate

No agent or contributor may implement game code until
`00-design-index.md` records Leonardo's explicit approval and marks the gate
`approved`. Repository initialization is not implementation authorization.

## Source-of-truth order

1. Leonardo's explicit current instruction.
2. Latest approved numbered design document.
3. `decision-log.md` for approval and supersession history.
4. Approved requirement and content identifiers.
5. Code and tests, which must conform to the documents rather than silently
   redefining them.

Conflicts must be surfaced. An implementation agent may not choose a creative
answer merely because one option is easier to code.

## Required pre-implementation artifacts

- Approved architecture and dependency policy.
- Requirement IDs with acceptance criteria.
- Final state model, event schema, save schema, and migrations.
- Final content IDs and ownership.
- Supported browsers/devices and performance budgets.
- Accessibility baseline and control map.
- Asset inventory and licensing path.
- Vertical-slice work breakdown, validation, and stop criteria.

## Later agent contract

Every worker assignment must state:

- date, model, and reasoning effort;
- owned files and subsystem;
- requirements and content IDs implemented;
- task instructions;
- inputs and outputs;
- forbidden scope and unresolved decisions;
- tests and evidence required;
- integration dependencies;
- privacy, licensing, and performance constraints.

## Agent contribution record

Each completed work package must also record the agent output, tests and review
results, Leonardo's decisions and corrections, and the final commit. Full
private conversations must stay private. Selected task examples can be used in
a later public case study after a separate review.

Public evidence must clearly separate Leonardo's creative direction,
requirements, review, testing, and final decisions from the material
implementation work done by agents.

Workers are not alone in the repository. They must not revert others' work,
must adapt to compatible concurrent changes, and must report conflicts instead
of guessing. Shared files require explicit ownership or coordination.

## Completion standard

Code running once is not completion. A work package is complete only when its
approved behaviour, failure handling, save implications, accessibility,
performance, tests, documentation, and asset provenance meet the requirement.

## Initial requirement namespaces

The exact scheme is open. Expected domains include `VISION`, `LOOP`, `EXP`,
`NARR`, `CHAR`, `WORLD`, `STATE`, `END`, `ART`, `AUDIO`, `UI`, `A11Y`, `SAVE`,
`PERF`, `CONTENT`, and `TEST`.

## Open decisions

- Final requirement format, traceability matrix, contribution-record template,
  and approval workflow.
- Branching, review, commit, and integration conventions.
- Work-package boundaries and agent sequence.
- CI gates and definition of done per subsystem.
