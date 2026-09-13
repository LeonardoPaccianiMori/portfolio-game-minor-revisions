---
description: Snapshot token and cost usage into the v2 cost ledger.
agent: build
---

Append a cost snapshot to `docs/costs.md`.

1. Run `opencode stats --project ""` and `opencode stats --project "" --models`
   in the repository root.
2. When per-session detail is useful, run:
   `opencode db --format tsv "SELECT datetime(time_created/1000,'unixepoch') AS created, substr(id,1,12) AS session, title, model, agent, round(cost,4) AS usd, tokens_input, tokens_output, tokens_cache_read, tokens_cache_write, tokens_reasoning FROM session WHERE directory = '$PWD' ORDER BY time_created"`
3. Add a dated row to the Ledger table with the cumulative cost, the delta from
   the previous snapshot, the current milestone, and the current commit.
   Use only real values; never estimate or invent.
4. Append a cumulative per-model table under "Per-model snapshots" with the
   same milestone, listing each model's messages, input, output, cache read,
   cache write, and estimated cost, so per-model deltas can be derived.
5. Note any abort, failure, or unusual spend in the row or a short note below
   the table.
6. Commit and push the record-only change.
