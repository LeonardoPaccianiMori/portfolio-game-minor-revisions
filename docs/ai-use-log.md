# AI Use Log (v2)

Status: **current; private; project-specific**

Last updated: 2026-09-10.

## Purpose and scope

This is the private source of truth for AI contributions to _Minor Revisions_
after the 2026-09-10 v2 design restart. It records the provider, exact model,
actual reasoning variant or effort, role, completed work, phase, and durable
evidence. It applies only to this project.

The v1 log is preserved in Git at commit
`c438b7f30059c47cc80d19363a92833d1ae002b3`. Its entries are not re-attributed
here.

## Recording rule

Add one entry for every primary opencode session that completes project work
and one entry for every completed subagent contribution. Each entry states:

- the date or date range;
- provider, exact model, and actual reasoning variant or effort;
- role and completed work;
- phase or block; and
- durable supporting evidence, such as a commit, document, or review record.

Record actual values. If the exact model or reasoning variant is genuinely
unavailable, write `unknown`; do not infer it from a configuration default. Do
not record failed, interrupted, considered, or abandoned runs. Do not store
credentials, personal data, raw conversation, hidden reasoning, or machine
paths.

## Completed history

### 2026-09-10 — v2 design restart opened

OpenCode Go `opencode-go/deepseek-v4.1-flash`, primary session, actual
reasoning variant `unknown`: executed Leonardo's approved full design restart.
It created `docs/design/00-process.md` and `docs/design/decision-log.md`,
removed the v1 documents from the working tree while recording their archive
commit, rewrote `README.md` and `AGENTS.md` for v2, replaced the development
commands with the design-session command, and opened Phase A Block A1. It made
no game design decision and wrote no game code. Evidence: the v2 restart
commit and `docs/design/00-process.md`.

In the same session it completed Block A1 with Leonardo, obtaining and
recording his decisions on concept, thesis, tone, audience, length, form,
failure, resources, cast, scientific field, darkness, and replay, and wrote
`docs/design/01-vision.md`. Evidence: `docs/design/01-vision.md`, `D-005` in
the v2 decision log, and the Block A1 commit.
