# B3 — State, Commands, and Determinism

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B3).**

## Campaign state (approved shape)

| Field           | Meaning                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| `version`       | Schema version                                                          |
| `seed`          | Saved campaign seed                                                     |
| `week`          | Current week, 1–12                                                      |
| `actionsLeft`   | Actions remaining in the current week                                   |
| `crashed`       | Whether the current week is lost to a crash                             |
| `energy`        | Energy segments, 0–5                                                    |
| `standing`      | Up-or-out meter                                                         |
| `integrity`     | Hidden complicity measure                                               |
| `relationships` | Trust for Voss, Dario, and Mara                                         |
| `paper`         | Paper track: framing, revision, and requirements                        |
| `fellowship`    | Fellowship track: framing, requirements, answers, deadline, and outcome |
| `evidence`      | Shared evidence set with track assignment and overlap flag              |
| `history`       | Per-run record used by endings and narration                            |
| `flags`         | Authored event flags                                                    |

The state is one serializable object. It contains no functions, class
instances, or browser handles.

## Commands (approved)

| Command                                       | Effect                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------- |
| `performAction { action }`                    | Spend one of the week's three action slots and its energy on one action               |
| `assignEvidence { evidenceId, track }`        | Assign a result to the paper, the fellowship, or both                                 |
| `answerRequirement { requirementId, answer }` | Answer a fellowship requirement honestly, inflate, fabricate, imitate, or leave blank |
| `comply { action }`                           | Take one of the five complicity actions                                               |
| `meetPI`                                      | Enter the PI meeting flow                                                             |
| `quit`                                        | Confirm and end the run                                                               |
| `advanceWeek`                                 | End the week early, or consume a lost week; reset slots and restore energy            |

Commands are plain data and are validated before execution. Resting is
`performAction { action: 'rest' }`; there is no separate rest command.

## Results (approved)

- Success returns a new state plus presentation effects as plain data.
- Rejection returns a stable reason code and a plain-language explanation, with
  no state change.
- No partial mutation: the caller replaces the state atomically.

## Determinism (approved)

- One seeded PRNG stored in the state; every random draw comes from it.
- No wall-clock, no `Math.random`, and no external input in rules.
- The same state plus command plus seed produces the same result.
- Authored events are data with conditions and effects, evaluated in a fixed
  documented order.

## Forecasts (approved)

- Costs, deadlines, and irreversible consequences are shown before the player
  commits.
- Numeric formulas may stay hidden; qualitative outcomes and warnings may not.

## Invalid commands (approved)

- Rejected explicitly with a stable reason code and a plain-language
  explanation.
- The interface surfaces the reason, and the state is unchanged.

## Versioning (approved)

- The state carries `version`. Persistence owns migration (B5).
- Content references use stable IDs (B4).
- A save with an unknown version is refused safely; it is never guessed.

## Open items moved to later blocks

- Exact field lists and reason codes (B4 and B5).
- Content IDs and the event catalogue (B4).
- Migration and save schemas (B5).
