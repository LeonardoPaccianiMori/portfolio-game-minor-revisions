# 03 — Pressure, Resources, and Failure

Status: **Documented — approved by Leonardo on 2026-09-10 (Block A3). The
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
| Time (weeks)  | Visible                     | Twelve turns; every action costs one week                      |
| Energy        | Visible, five segments      | Spent by actions; restored by rest and weekends; crash at zero |
| Standing      | Visible                     | Up-or-out meter; ejection with warning                         |
| Integrity     | Hidden, with clear feedback | Changed by complicity actions; drives endings                  |
| Relationships | Visible as trust            | Permanent rupture possible                                     |
| Money         | Event-driven                | Recurring rent pressure forces a choice                        |

## Action costs (approved shape; baseline numbers proposed)

Every action costs one week. Energy costs differ by action:

| Action                         | Energy |
| ------------------------------ | -----: |
| Work an experiment step        |     −1 |
| Analyse results                |     −1 |
| Write or revise the manuscript |     −1 |
| Meet the PI                    |      0 |
| Help or confront a colleague   |      0 |
| Rest                           |     +2 |

Each turn restores one energy automatically at the week boundary. Energy starts
at five and cannot exceed five. The baseline is tuned in the slice.

## Energy and the crash

- Five segments, shown plainly.
- At zero, the player crashes: the next week is lost, and one consequence
  triggers — evidence goes stale, standing falls, or a relationship strains.
- A crash is not death and does not end the run by itself, but a second crash
  in the same act can end it as a burnout ending.
- The game never hides an approaching crash: the player sees the energy level
  and knows the risk.

## Standing and ejection

- Standing rises with publication progress, PI favour, and colleague goodwill.
- Standing falls with failed demands, complaints, absence, and visible
  shortcuts that are caught.
- Ejection arrives with two turns of warning and a stated reason. It is a
  reachable ending, not a surprise.
- Standing is the literal up-or-out mechanism: the pyramid is the system.

## Integrity (hidden)

- Integrity changes through the five complicity actions.
- Feedback is immediate and plain: the game states what the player just did
  without moralising.
- Integrity is hidden as a number but visible as consequence: dialogue,
  available options, and endings change.

## Relationships

- The PI and the two colleagues have visible trust states.
- Choices can break trust permanently; there is no soft undo.
- A relationship can rupture during the run, and the endings name who stayed.

## Money

- A recurring rent-and-pay event forces one choice per act: ask the PI for an
  advance (costs standing or creates an obligation), take a side job (costs
  actions), or borrow from a colleague (costs a relationship).
- The meagre salary is satire, but the pressure it creates is real.

## Quitting

- Quitting is always available, with a confirmation that states the
  consequences.
- It leads to its own ending, not a failure screen.

## Escalation

- Each act raises the cost of progress and the chance of staleness: the
  institution extracts more for the same work.
- Escalation is visible in the requirements meter and in the PI's behaviour.

## Run-end summary

- Ejection by standing (warned).
- Burnout after repeated crashes.
- Quitting.
- The contract's natural end, where the paper outcome plus the ending
  resolution decides the epilogue.

## Open items moved to later blocks

- Endings and their determinants (A4).
- Character arcs and rupture scenes (A5).
- Exact tuning and difficulty (Phase B and the slice).
- Interface presentation of resources (A6 and Phase B).
