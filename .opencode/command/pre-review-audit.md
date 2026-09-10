---
description: Run the primary pre-review audit before independent review.
agent: build
---

Run the one complete primary pre-review audit for the active step: $ARGUMENTS.

Reconcile, against the approved plan and the actual repository state:

1. every changed path against its owned and prohibited paths;
2. every control record, step record, requirement, interface, fixture, and
   acceptance row;
3. every command result, including failures, and whether each result is
   current;
4. privacy, security, network, accessibility, asset, licence, and provenance
   boundaries;
5. current-state language and stale references;
6. Git state, branch, base commit, and diff scope.

Report the audit result plainly: pass or the exact blockers and required
corrections found. Then prepare the focused reviewer packet containing the
approved plan, base and head commits, complete diff, relevant specifications,
check results, and recorded limitations. Ask the independent reviewer to report
all findings in one structured result.

Do not edit files during the audit beyond recording its own result. Do not
integrate or accept the step.
