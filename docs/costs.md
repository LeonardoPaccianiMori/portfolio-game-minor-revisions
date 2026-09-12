# Development Cost Ledger (v2)

Status: **current**

Last updated: 2026-09-11.

## Purpose

Track tokens and estimated cost of developing _Minor Revisions_ under opencode,
starting from the v2 restart. The numbers come from opencode's own session
data.

## How to read the numbers

Run these in the repository root:

- Totals: `opencode stats --project ""` (the empty project argument selects the
  current project).
- Per-model: `opencode stats --project "" --models`.
- Per-session detail:
  `opencode db --format tsv "SELECT datetime(time_created/1000,'unixepoch') AS created, substr(id,1,12) AS session, title, model, agent, round(cost,4) AS usd, tokens_input, tokens_output, tokens_cache_read, tokens_cache_write, tokens_reasoning FROM session WHERE directory = '$PWD' ORDER BY time_created"`

Record a milestone snapshot with the `/cost-snapshot` command.

The dollar figures are opencode's estimates using the model catalog prices. If
they ever disagree with OpenCode Go billing, billing is the authority.

## What is not covered

- The v1 development (Codex, GPT-5.6, and the Claude Opus reviews) has no token
  or cost data in this repository. The v1 AI-use log was preserved in Git at
  `c438b7f30059c47cc80d19363a92833d1ae002b3`; it excluded cost data by design,
  except where the separate Opus review metadata recorded it. Your provider
  dashboards remain the only possible source for that period.
- Aborted, failed, or interrupted model runs still cost money and are included
  on purpose.

## Baseline snapshot — 2026-09-11 (v2 restart, Block A1, Block A2)

- Sessions: 8
- Estimated cost: **$1.99**
- Input: 3.5M tokens; output: 113.1K; cache read: 36.4M; cache write: 116.0K

| Model               | Messages | Estimated cost |
| ------------------- | -------- | -------------- |
| deepseek-v4.1-flash | 179      | $0.8119        |
| grok-4.6            | 16       | $0.8285        |
| glm-5.3             | 9        | $0.3165        |
| qwen3.8-flash       | 10       | $0.0346        |

Note: the grok-4.6 figure is mostly one aborted review run. Aborted runs are
real spend and stay in the ledger.

## Ledger

| Snapshot   | Milestone                     | Sessions |  Cost | Δ cost | Input | Output | Cache read | Cache write | Commit  |
| ---------- | ----------------------------- | -------: | ----: | -----: | ----: | -----: | ---------: | ----------: | ------- |
| 2026-09-11 | v2 restart; Blocks A1 and A2  |        8 | $1.99 |      — |  3.5M | 113.1K |      36.4M |      116.0K | 3706120 |
| 2026-09-11 | Block A3; milestone cost rule |        8 | $2.02 | +$0.03 |  3.5M | 122.2K |      40.2M |      116.0K | abcce99 |
| 2026-09-11 | Block A4; Block A5 opened     |        8 | $2.11 | +$0.09 |  4.0M | 126.0K |      43.1M |      116.0K | 30156e9 |
| 2026-09-11 | Block A5; Block A6 opened     |        8 | $2.20 | +$0.09 |  4.5M | 128.8K |      45.1M |      116.0K | 2462fab |
| 2026-09-11 | Block A6; Block A7 opened     |        8 | $2.21 | +$0.01 |  4.5M | 131.9K |      47.6M |      116.0K | 9b86ec7 |
| 2026-09-11 | Block A7; Block A8 opened     |        8 | $2.22 | +$0.01 |  4.5M | 135.0K |      50.2M |      116.0K | aeffc1e |
| 2026-09-11 | Block A8; A4 and A5 reopened  |        8 | $2.23 | +$0.01 |  4.5M | 138.0K |      52.8M |      116.0K | 928f5e2 |
| 2026-09-11 | A4-A5 revisions; Phase A done |        8 | $2.34 | +$0.11 |  5.0M | 145.4K |      57.0M |      116.0K | a4e81d8 |
| 2026-09-11 | Fellowship linkage; Block B1  |        8 | $2.37 | +$0.03 |  5.1M | 152.3K |      62.5M |      116.0K | 20e476e |
| 2026-09-11 | Block B2; Block B3 opened     |        8 | $2.38 | +$0.01 |  5.1M | 155.5K |      65.3M |      116.0K | df091bd |
| 2026-09-11 | Block B3; Block B4 opened     |        8 | $2.39 | +$0.01 |  5.1M | 158.4K |      68.1M |      116.0K | 8c3ae07 |
