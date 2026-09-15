# 03 — Pressure, Resources, and Failure

Status: **Documented and revised — approved by Leonardo on 2026-09-10
(Block A3), revised the same day to add the fellowship, revised
2026-09-13 with the complicity, rent-event, and fellowship answer baselines,
and revised 2026-09-15 with the panel and review outcome baselines, and
2026-09-15 with the run-end baselines. The
baseline tuning numbers below are a starting point for the vertical slice and
may be adjusted by evidence through the approved change process.**

## Purpose

This block defines what the player spends, what runs out, what breaks, and how
the run can end before the contract does. It implements the survival thesis:
the institution makes a sustainable life impossible, and the player chooses
what to sacrifice.

## Resources at a glance

| Resource      | Visibility                  | Behaviour                                                      |
| ------------- | --------------------------- | -------------------------------------------------------------- |
| Time (weeks)  | Visible                     | Twelve turns, each with three action slots                     |
| Energy        | Visible, five segments      | Spent by actions; restored by rest and weekends; crash at zero |
| Standing      | Visible                     | Up-or-out meter; ejection with warning                         |
| Integrity     | Hidden, with clear feedback | Changed by complicity actions; drives endings                  |
| Relationships | Visible as trust            | Permanent rupture possible                                     |
| Money         | Event-driven                | Recurring rent pressure forces a choice                        |

Starting baseline: energy 5, standing 50, integrity 100, and each relationship 50. These are the approved slice baseline and may be tuned by evidence.

## Action costs (approved shape; baseline numbers proposed)

Every action consumes one of the week's three action slots. Energy costs differ
by action:

| Action                          | Energy |
| ------------------------------- | -----: |
| Work an experiment step         |     −1 |
| Analyse results                 |     −1 |
| Write or revise the manuscript  |     −1 |
| Work on the fellowship proposal |     −1 |
| Meet the PI                     |      0 |
| Help or confront a colleague    |      0 |
| Rest                            |     +2 |

Each turn restores one energy automatically at the week boundary. Energy starts
at five and cannot exceed five. The baseline is tuned in the slice. Answering
one fellowship requirement is proposal work: it spends one action slot and one
energy, like writing.

## Energy and the crash

- Five segments, shown plainly.
- At zero, the player crashes: the next week is lost, and one consequence
  triggers — evidence goes stale, standing falls, or a relationship strains.
- The baseline consequence is a standing loss of 10 until the evidence and
  relationship variants arrive at STEP-006 and STEP-008.
- A crash is not death and does not end the run by itself, but a second crash
  in the same act can end it as a burnout ending.
- The game never hides an approaching crash: the player sees the energy level
  and knows the risk.

## Standing and ejection

- Standing rises with publication progress, fellowship progress, PI favour,
  and colleague goodwill.
- Standing falls with failed demands, missed fellowship milestones, complaints,
  absence, and visible shortcuts that are caught.
- Ejection arrives with two turns of warning and a stated reason. It is a
  reachable ending, not a surprise.
- Standing is the literal up-or-out mechanism: the pyramid is the system.

## Integrity (hidden)

- Integrity changes through the five complicity actions.
- Feedback is immediate and plain: the game states what the player just did
  without moralising.
- Integrity is hidden as a number but visible as consequence: dialogue,
  available options, and endings change.

## Complicity baseline (approved 2026-09-13)

Each complicity action costs integrity and may change standing or a
relationship; two actions restore one action slot. Complicity does not spend an
action slot and is refused only when no decision is possible. The baseline
values for the slice:

| Action           | Standing | Integrity | Slots | Relationships |
| ---------------- | -------: | --------: | ----: | ------------- |
| Inflate a claim  |      +10 |       −15 |     — | —             |
| Drop a replicate |        — |       −10 |    +1 | —             |
| Take credit      |      +10 |       −10 |     — | Dario −20     |
| Flatter the PI   |        — |        −5 |     — | Voss +10      |
| Dump work        |        — |       −10 |    +1 | Mara −15      |

Meters clamp at their bounds, and each action sets a permanent flag and a
history entry so the endings can return to it by name. These are tunable slice
baselines.

## Relationships

- The PI and the two colleagues have visible trust states.
- Choices can break trust permanently; there is no soft undo.
- A relationship can rupture during the run, and the endings name who stayed.

## Money

- A recurring rent-and-pay event forces one choice per act: ask the PI for an
  advance (costs standing or creates an obligation), take a side job (costs
  actions), or borrow from a colleague (costs a relationship).
- Baselines for the slice: the advance costs 5 standing, the side job costs one
  action slot, and the loan costs 10 Mara trust.
- The meagre salary is satire, but the pressure it creates is real.

## The fellowship deadline

- The proposal deadline is fixed at the end of Act II. Missing it closes the
  renewal path and lowers standing; it does not end the run.
- The panel outcome arrives early in Act III: funded (hollow continuity),
  waitlisted (cruel ambiguity), or rejected (the renewal path closes).
- The outcome is partly arbitrary and partly learnable. It feeds the ending
  matrix but never unlocks a clean win.
- Panel baselines for the slice: funded at 12 or more, waitlisted at 8 or more,
  otherwise rejected; standing +10, 0, or −5. A rejection closes renewal.
- Shared evidence, shared reframes, and shared complicity link the two
  documents, while the administrative requirements stay independent.

## The review and its outcomes

- The paper is submitted when its meter is fully satisfied; if it is not, the
  review is a desk rejection and renewal closes without a reading.
- Verdict baselines for the slice: accept +10 standing, minor revision +5,
  major revision 0, reject −5.
- Discovery drops the review verdict one rank and costs 10 integrity; it also
  forces the panel to reject. Fabricated answers, both-track results, and
  taking Dario's credit are the risk items, and being caught is permanent.

## Quitting

- Quitting is always available, with a confirmation that states the
  consequences.
- It leads to its own ending, not a failure screen.

## Escalation

- Each act raises the cost of progress and the chance of staleness: the
  institution extracts more for the same work.
- Escalation is visible in the requirements meter and in the PI's behaviour.

## Run-end summary

- Ejection by standing: the warning starts at standing 20 or below, and the
  player has two turns to recover; rising above 20 clears the live warning,
  and reaching the deadline still below it ends the run.
- Burnout: a second crash inside the same act (weeks 1–4, 5–8, and 9–12) ends
  the run.
- Quitting is always available and leads to the leaving ending, never a
  failure screen.
- The contract's natural end, where the paper outcome, fellowship outcome, and
  the ending resolution decide the epilogue.

## Open items moved to later blocks

- Endings and their determinants (A4).
- Character arcs and rupture scenes (A5).
- Exact tuning and difficulty (Phase B and the slice).
- Interface presentation of resources (A6 and Phase B).
