# Development Cost Ledger (v2)

Status: **current**

Last updated: 2026-09-13.

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

| Snapshot   | Milestone                     | Sessions |   Cost | Δ cost | Input | Output | Cache read | Cache write | Commit  |
| ---------- | ----------------------------- | -------: | -----: | -----: | ----: | -----: | ---------: | ----------: | ------- |
| 2026-09-11 | v2 restart; Blocks A1 and A2  |        8 |  $1.99 |      — |  3.5M | 113.1K |      36.4M |      116.0K | 3706120 |
| 2026-09-11 | Block A3; milestone cost rule |        8 |  $2.02 | +$0.03 |  3.5M | 122.2K |      40.2M |      116.0K | abcce99 |
| 2026-09-11 | Block A4; Block A5 opened     |        8 |  $2.11 | +$0.09 |  4.0M | 126.0K |      43.1M |      116.0K | 30156e9 |
| 2026-09-11 | Block A5; Block A6 opened     |        8 |  $2.20 | +$0.09 |  4.5M | 128.8K |      45.1M |      116.0K | 2462fab |
| 2026-09-11 | Block A6; Block A7 opened     |        8 |  $2.21 | +$0.01 |  4.5M | 131.9K |      47.6M |      116.0K | 9b86ec7 |
| 2026-09-11 | Block A7; Block A8 opened     |        8 |  $2.22 | +$0.01 |  4.5M | 135.0K |      50.2M |      116.0K | aeffc1e |
| 2026-09-11 | Block A8; A4 and A5 reopened  |        8 |  $2.23 | +$0.01 |  4.5M | 138.0K |      52.8M |      116.0K | 928f5e2 |
| 2026-09-11 | A4-A5 revisions; Phase A done |        8 |  $2.34 | +$0.11 |  5.0M | 145.4K |      57.0M |      116.0K | a4e81d8 |
| 2026-09-11 | Fellowship linkage; Block B1  |        8 |  $2.37 | +$0.03 |  5.1M | 152.3K |      62.5M |      116.0K | 20e476e |
| 2026-09-11 | Block B2; Block B3 opened     |        8 |  $2.38 | +$0.01 |  5.1M | 155.5K |      65.3M |      116.0K | df091bd |
| 2026-09-11 | Block B3; Block B4 opened     |        8 |  $2.39 | +$0.01 |  5.1M | 158.4K |      68.1M |      116.0K | 8c3ae07 |
| 2026-09-11 | Block B4; Block B5 opened     |        8 |  $2.40 | +$0.01 |  5.1M | 161.2K |      71.0M |      116.0K | f32223c |
| 2026-09-11 | Block B5; Block B6 opened     |        8 |  $2.41 | +$0.01 |  5.1M | 164.0K |      73.9M |      116.0K | 9a0f905 |
| 2026-09-11 | Block B6; Block B7 opened     |        8 |  $2.43 | +$0.02 |  5.1M | 166.7K |      76.8M |      116.0K | a75f3fe |
| 2026-09-11 | Block B7; Block B8 opened     |        8 |  $2.44 | +$0.01 |  5.1M | 169.5K |      79.7M |      116.0K | e079f91 |
| 2026-09-11 | Block B8; Block B9 opened     |        8 |  $2.45 | +$0.01 |  5.1M | 172.3K |      82.6M |      116.0K | 5eb8ddd |
| 2026-09-11 | Block B9; Block B10 opened    |        8 |  $2.46 | +$0.01 |  5.1M | 175.2K |      85.6M |      116.0K | bc35a89 |
| 2026-09-11 | Block B10; Phase B complete   |        8 |  $2.47 | +$0.01 |  5.1M | 178.1K |      88.6M |      116.0K | 818e0c1 |
| 2026-09-11 | Phase C approved; C1 opened   |        8 |  $2.49 | +$0.02 |  5.1M | 180.6K |      91.6M |      116.0K | 5aa0c0f |
| 2026-09-11 | Block C1; Block C2 opened     |        8 |  $2.50 | +$0.01 |  5.1M | 183.7K |      94.6M |      116.0K | 558bfc0 |
| 2026-09-11 | Block C2; Phase C complete    |        8 |  $2.53 | +$0.03 |  5.1M | 188.8K |      99.6M |      116.0K | 046b3f1 |
| 2026-09-13 | STEP-001 accepted             |        9 |  $2.94 | +$0.41 |  5.2M | 228.6K |     115.1M |      116.0K | 34c7e9b |
| 2026-09-13 | STEP-002 accepted             |       11 |  $3.41 | +$0.47 |  5.3M | 279.1K |     137.7M |      116.0K | 8b5cdec |
| 2026-09-13 | STEP-003 accepted             |       12 |  $3.69 | +$0.28 |  5.4M | 307.3K |     152.6M |      116.0K | 507353d |
| 2026-09-13 | STEP-004 accepted             |       14 |  $4.29 | +$0.60 |  5.5M | 362.4K |     174.0M |      116.0K | b012d36 |
| 2026-09-13 | STEP-005 accepted             |       15 |  $4.73 | +$0.44 |  5.6M | 402.1K |     197.9M |      116.0K | f4a5a27 |
| 2026-09-13 | STEP-006 accepted             |       16 |  $5.25 | +$0.52 |  5.8M | 439.4K |     222.2M |      116.0K | d8e23c9 |
| 2026-09-13 | STEP-007 accepted             |       18 |  $6.06 | +$0.81 |  5.9M | 506.5K |     256.0M |      116.0K | d4e62d9 |
| 2026-09-13 | STEP-008 accepted             |       20 |  $6.76 | +$0.70 |  6.1M | 530.3K |     287.1M |      116.0K | 15ce77d |
| 2026-09-13 | STEP-009 accepted             |       21 |  $7.69 | +$0.93 |  7.2M | 586.7K |     299.5M |      116.0K | 6da989a |
| 2026-09-13 | STEP-010 accepted             |       23 |  $9.18 | +$1.49 |  7.4M | 647.6K |     319.6M |      116.0K | bdea888 |
| 2026-09-15 | STEP-011 accepted             |       28 | $10.21 | +$1.03 |  7.9M | 725.1K |     362.2M |      459.8K | 16e0ae1 |
| 2026-09-15 | STEP-012 accepted             |       32 | $10.65 | +$0.44 |  8.0M | 792.4K |     415.4M |      734.7K | 7a37d77 |

## Per-model snapshots

Cumulative per-model totals, captured with each milestone snapshot. The
per-model delta between two snapshots is the difference between their rows.

### 2026-09-13 — after STEP-006

| Model               | Messages |  Input | Output | Cache read | Cache write | Estimated cost |
| ------------------- | -------: | -----: | -----: | ---------: | ----------: | -------------: |
| deepseek-v4.1-flash |      459 |   5.1M | 745.2K |     220.1M |           0 |        $1.8777 |
| glm-5.3             |      149 | 478.7K | 176.6K |       4.2M |           0 |        $2.5304 |
| grok-4.6            |       16 | 170.4K |  16.9K |     771.8K |           0 |        $0.8285 |
| qwen3.8-flash       |       10 |     60 |   5.7K |     544.7K |      116.0K |        $0.0346 |

The reviewers (glm-5.3) are currently the largest cost line, larger than the
main session (deepseek-v4.1-flash), and the aborted grok run accounts for
$0.8285.

### 2026-09-13 — after STEP-007

| Model               | Messages |  Input | Output | Cache read | Cache write | Estimated cost |
| ------------------- | -------: | -----: | -----: | ---------: | ----------: | -------------: |
| deepseek-v4.1-flash |      492 |   5.2M | 774.5K |     249.4M |           0 |        $1.9864 |
| glm-5.3             |      187 | 596.2K | 226.9K |       5.3M |           0 |        $3.2145 |
| grok-4.6            |       16 | 170.4K |  16.9K |     771.8K |           0 |        $0.8285 |
| qwen3.8-flash       |       10 |     60 |   5.7K |     544.7K |      116.0K |        $0.0346 |

### 2026-09-13 — after STEP-008

| Model               | Messages |  Input | Output | Cache read | Cache write | Estimated cost |
| ------------------- | -------: | -----: | -----: | ---------: | ----------: | -------------: |
| deepseek-v4.1-flash |      525 |   5.2M | 809.6K |     279.1M |           0 |        $2.1094 |
| glm-5.3             |      226 | 697.5K | 249.8K |       6.6M |           0 |        $3.7894 |
| grok-4.6            |       16 | 170.4K |  16.9K |     771.8K |           0 |        $0.8285 |
| qwen3.8-flash       |       10 |     60 |   5.7K |     544.7K |      116.0K |        $0.0346 |

### 2026-09-13 — after STEP-009

| Model               | Messages |  Input | Output | Cache read | Cache write | Estimated cost |
| ------------------- | -------: | -----: | -----: | ---------: | ----------: | -------------: |
| deepseek-v4.1-flash |      591 |   6.1M | 873.8K |     290.5M |           0 |        $2.3137 |
| glm-5.3             |      255 | 898.9K | 284.5K |       7.7M |           0 |        $4.5116 |
| grok-4.6            |       16 | 170.4K |  16.9K |     771.8K |           0 |        $0.8285 |
| qwen3.8-flash       |       10 |     60 |   5.7K |     544.7K |      116.0K |        $0.0346 |

The glm-5.3 line grew by $0.7222 with the STEP-009 independent review. No
worker model was used in this step.

### 2026-09-13 — after STEP-010

| Model               | Messages |  Input | Output | Cache read | Cache write | Estimated cost |
| ------------------- | -------: | -----: | -----: | ---------: | ----------: | -------------: |
| deepseek-v4.1-flash |      684 |   6.2M | 977.6K |     307.5M |           0 |        $2.4351 |
| glm-5.3             |      322 |   1.1M | 349.4K |      10.8M |           0 |        $5.8800 |
| grok-4.6            |       16 | 170.4K |  16.9K |     771.8K |           0 |        $0.8285 |
| qwen3.8-flash       |       10 |     60 |   5.7K |     544.7K |      116.0K |        $0.0346 |

The glm-5.3 line grew by $1.3684 with the STEP-010 independent review and
re-review. No worker model was used in this step.

### 2026-09-15 — after STEP-011

| Model               | Messages |  Input | Output | Cache read | Cache write | Estimated cost |
| ------------------- | -------: | -----: | -----: | ---------: | ----------: | -------------: |
| deepseek-v4.1-flash |      801 |   6.5M |   1.1M |     346.8M |           0 |        $2.6837 |
| glm-5.3             |      343 |   1.3M | 375.4K |      11.6M |           0 |        $6.4701 |
| gpt-5.6-luna        |       45 |    135 |  50.2K |       2.5M |      343.8K |        $0.1962 |
| grok-4.6            |       16 | 170.4K |  16.9K |     771.8K |           0 |        $0.8285 |
| qwen3.8-flash       |       10 |     60 |   5.7K |     544.7K |      116.0K |        $0.0346 |

The glm-5.3 line grew by $0.5901 with the cancelled first review attempt and
the workflow session before the model switch; the four `gpt-5.6-luna` review
rounds together cost $0.1962 (D-045). No worker model was used in this step.

### 2026-09-15 — after STEP-012

| Model               | Messages |  Input | Output | Cache read | Cache write | Estimated cost |
| ------------------- | -------: | -----: | -----: | ---------: | ----------: | -------------: |
| deepseek-v4.1-flash |      937 |   6.6M |   1.2M |     396.7M |           0 |        $2.9271 |
| glm-5.3             |      343 |   1.3M | 375.4K |      11.6M |           0 |        $6.4701 |
| gpt-5.6-luna        |       99 |    297 |  97.5K |       5.7M |      618.7K |        $0.3864 |
| grok-4.6            |       16 | 170.4K |  16.9K |     771.8K |           0 |        $0.8285 |
| qwen3.8-flash       |       10 |     60 |   5.7K |     544.7K |      116.0K |        $0.0346 |

The +$0.44 covers the D-047 worker-model session, the STEP-012 implementation,
and three `gpt-5.6-luna` review rounds; the Luna rounds across both steps total
$0.3864. No worker model was used in this step.
