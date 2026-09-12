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
not record failed, interrupted, considered, or abandoned runs. Token and dollar
totals are tracked separately in `docs/costs.md`. Do not store
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

In the same session it recorded the asset-sourcing policy (`D-006`), set up the
token and cost ledger with the `/cost-snapshot` command (`D-008`,
`docs/costs.md`), and documented Block A2 in `docs/design/02-core-loop.md`
(`D-007`). It then confirmed the A2 details, documented Block A3 in
`docs/design/03-pressure-and-failure.md` (`D-010`), made milestone cost
snapshots part of every milestone commit (`D-011`), opened Block A4, and then
documented Block A4 in `docs/design/04-narrative.md` (`D-012`) and opened
Block A5. It then documented Block A5 in `docs/design/05-characters.md`
(`D-013`) and opened Block A6. It documented Block A6 in
`docs/design/06-world-and-presentation.md` (`D-014`) and opened Block A7. It
then documented Block A7 in `docs/design/07-content-and-evaluation.md`
(`D-015`) and opened Block A8, the final design block.
