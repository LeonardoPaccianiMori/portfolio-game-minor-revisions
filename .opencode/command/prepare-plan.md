---
description: Prepare the exact Minor Revisions step plan for Leonardo's approval.
agent: plan
---

Prepare the exact repository plan for the requested step: $ARGUMENTS.

Read `AGENTS.md`, `docs/implementation/development-status.md`,
`docs/implementation/development-roadmap.md`,
`docs/implementation/step-acceptance-log.md`,
`docs/implementation/ai-use-log.md`, `docs/implementation/specs/13-agent-work-orders-and-integration.md`,
and every authoritative design or specification document the step depends on.

Present one plan with these exact sections:

1. Purpose and player-visible (or documentation) effect.
2. Owned paths and prohibited paths.
3. Authority and traceability: requirements, interfaces, content IDs,
   fixtures, and acceptance rows.
4. Accepted dependencies and required earlier evidence.
5. Exact tasks and non-goals.
6. Required checks, commands, and evidence.
7. Local run method and Leonardo test packet: objective, controls, actions,
   expected results, what to report, and a safe recovery step.
8. Proposed commit messages and commit boundaries.
9. Delegation table naming each task, role, owned paths, dependencies, model,
   reasoning variant, selection reason, focused source packet, and whether it is
   parallel or sequential. When the primary retains a task, state why a worker
   would not improve it.
10. Safety, privacy, accessibility, asset, network, and performance boundaries.
11. Explicit statement of what the plan does not authorize.

Do not implement, commit, or change any file. End by asking Leonardo for
explicit approval of that one plan.
