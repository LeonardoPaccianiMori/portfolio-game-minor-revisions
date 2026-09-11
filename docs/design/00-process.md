# Minor Revisions — v2 Design Restart and Working Process

Status: **Active — v2 design in progress; no implementation is authorized.**

Last updated: 2026-09-10.

## Why this file exists

This is the durable anchor for the v2 restart. Read it first in any new session,
before any other document. If a session is lost, compacted, or resumed later,
the current block, its questions, and the exact next action are recorded here.

## Restart declaration

- On 2026-09-10 Leonardo approved a full restart of the game and its
  documentation (v2).
- Every document that existed before the restart was removed from the working
  tree in the restart commit. It is preserved only in Git history at the
  pre-restart head `c438b7f30059c47cc80d19363a92833d1ae002b3` (the v1 archive).
- v1 material may be consulted as inspiration. It has no authority, is not an
  approved v2 decision, and must not be copied into v2 without fresh
  discussion and Leonardo's approval.
- No game code exists. The v1 development pathway (R1–R63) is void.
- Kept from before the restart: the opencode workflow and configuration, the
  local toolchain, the repository discipline (approval, provenance, review,
  acceptance), and Leonardo's standing GitHub synchronization authorization.

## How we work

- One block at a time.
- Ask small groups of related questions and preserve every unresolved answer.
- Before writing any document, present a synthesis separating **Confirmed**,
  **Proposed**, and **Open** decisions.
- A block document is written only after Leonardo's explicit approval of that
  synthesis.
- Update this file and `docs/design/decision-log.md` in the same commit as the
  block document.
- Do not silently resolve contradictions. Record them and ask.
- v1 is never quoted as authority. It may be cited as inspiration and must be
  labelled as such.
- Nothing is implemented before Phase A and Phase B are approved.

## Phases

### Phase A — Clean-slate design (current)

| #   | Block                                | Document                       | Status        |
| --- | ------------------------------------ | ------------------------------ | ------------- |
| A1  | Concept and experience promise       | `01-vision.md`                 | Documented    |
| A2  | Core loop and survival system        | `02-core-loop.md`              | Documented    |
| A3  | Pressure, resources, and failure     | `03-pressure-and-failure.md`   | Documented    |
| A4  | Narrative and structure              | `04-narrative.md`              | In discussion |
| A5  | Characters and voice                 | `05-characters.md`             | Not started   |
| A6  | World and presentation               | `06-world-and-presentation.md` | Not started   |
| A7  | Content and evaluation               | `07-content-and-evaluation.md` | Not started   |
| A8  | Technical constraints and production | `08-production-constraints.md` | Not started   |

A later block may reopen an earlier one when it changes that block's premises.
That reopening is recorded in the decision log.

### Phase B — Technical specification (fresh)

Written after Phase A. It will define the stack, architecture, data, interfaces,
testing, persistence, world runtime, interface, audio, performance, and
acceptance. Nothing from v1 is inherited by default; the same choices may be
re-approved on their merits.

### Phase C — Development pathway (fresh)

A new multi-phase pathway with small, reviewable steps, one approved plan at a
time. It is written only after Phases A and B are approved.

## Session protocol

1. Read this file, `docs/design/decision-log.md`,
   `docs/ai-use-log.md`, and the current block document.
2. Confirm the current block and its status.
3. Work one block. Ask focused questions in small groups.
4. Summarize the answers and mark contradictions or gaps.
5. Present the block synthesis: Confirmed, Proposed, Open.
6. On Leonardo's explicit approval, write the block document, update this file
   and the decision log, and append the milestone cost snapshot to
   `docs/costs.md`.
7. Commit and push under the standing GitHub authorization. Every milestone
   commit includes its cost snapshot.

The `/design-session` command starts this protocol.

## Decision rules

- Every decision is `confirmed`, `proposed`, or `open`.
- Nothing becomes confirmed until Leonardo approves it explicitly.
- Every choice that affects implementation is written before code depends on it.
- Measured facts need an approved method, target, and response rule. Do not
  invent a result before execution.
- Superseded decisions stay visible with a reason, date, and explicit
  `superseded` status.
- Preserve a universal fictional world. Do not reproduce real people,
  institutions, or Leonardo's experiences literally.

## File map (v2)

- `docs/design/00-process.md` — this file, the durable process anchor
- `docs/design/decision-log.md` — approved v2 decisions
- `docs/design/01-vision.md` and later block documents — written on approval
- `docs/ai-use-log.md` — actual primary and subagent model use
- `docs/costs.md` — token and estimated cost ledger, with `/cost-snapshot`
- `AGENTS.md` — the agent contract
- `README.md` — project front page
- `opencode.json`, `.opencode/agent/`, `.opencode/command/` — workflow
  configuration
- v1 archive: Git commit `c438b7f30059c47cc80d19363a92833d1ae002b3`

## Current task — Phase A, Block A3

Block A1 is documented in `docs/design/01-vision.md` (approved 2026-09-10).
Block A2 is documented in `docs/design/02-core-loop.md`; its core decisions and
details are approved. Block A3 is documented in
`docs/design/03-pressure-and-failure.md`. Block A4 (narrative and structure) is
in discussion; its questions are below. The earlier block questions and session
records further down are preserved as history.

### A4 questions

1. Story spine: the PI's project and the paper's core claim?
2. The contract clock: why twelve weeks, and what deadline drives it?
3. Act structure: three acts of four turns; what escalates in each?
4. The PI's arc: does the PI change, harden, or fall?
5. The two colleagues: who are they, and what arcs do they carry?
6. Fixed events: which anchors (funding review, conference, rent, the review)
   hold the acts in place?
7. Endings: which three or four paths, and what determines each?
8. Tone curve: how does the comedy thin across the acts?
9. Meta moments: where does the institution break the fourth wall?

### A3 questions (answered and documented)

1. Action costs: each action trades a week and energy in different amounts; is
   that the right shape?
2. Energy: five segments, and a crash at zero costs the next week and leaves a
   consequence?
3. Standing (up-or-out): publication progress, PI favour, and colleague
   goodwill raise it; failed demands and complaints lower it; ejection comes
   with two turns of warning?
4. Integrity: hidden, with clear feedback after each complicity action, and
   consequences in the endings?
5. Relationships: permanent rupture is possible; no soft undo?
6. Money: one recurring rent event that forces a choice (ask the PI for an
   advance, take a side job, borrow from a colleague)?
7. Quitting: always available with confirmation and its own ending?
8. Escalation: the institution raises costs and staleness as the acts progress?

### A2 questions (answered and documented)

1. Turn shape: one week per turn, twelve turns, three actions each, or a
   different rhythm?
2. Main screen: a desk board showing requests, manuscript, and resources, with
   the 3D department used for atmosphere and selected scenes?
3. Experiments: abstract assignments of two to four steps rather than a
   detailed simulation?
4. Moving standard: a visible publication-requirements meter that the PI edits
   with add, reframe, and revert, with evidence marked current or stale?
5. Complicity actions: inflate a claim, drop a replicate, take credit, flatter
   the PI, dump work; each buys survival and costs integrity, relationships, or
   both?
6. Resources and failure: time, energy, and standing visible; integrity hidden
   with visible symptoms; relationships persistent; a recurring pay-and-rent
   event; zero energy causes a crash, not death; standing below the line causes
   a warned ejection?
7. The review set piece: five to eight minutes, absurd and partly arbitrary
   reviewer reports that the player can learn to game?
8. The reveal: the goalpost is designed to move; how openly should the game
   admit this while staying legible and warned?

### Session 0 raw answers (Leonardo, unapproved)

1. A personal artistic outlet and a portfolio project for directing LLM agents.
   A survival game inside academia: fun but a harsh critique, with absurdist
   tones like _The Stanley Parable_, without recreating that game.
2. The game argues that academia rests on toxic, exploitative labour of junior
   figures, almost a pyramid scheme: you climb one step or you are out. It
   laughs at this while still criticising what is rotten.
3. The laugh is recognition: "haha, I was exploited that way too". People who
   tried an academic career and left are the most likely to enjoy it.
4. The intended feeling: "haha, this is terrible and it is exactly what I went
   through".
5. The pressure: ridiculous hours for meagre pay, constant burnout, and the
   moment of publication revealing that the hard work is glossed over or judged
   very superficially by reviewers.
6. The PI makes increasingly absurd paper requests; experiments cost time and
   energy; the PI demands more, changes their mind, ignores input, and forces
   restarts that loop back to the beginning. Leonardo asked for help turning
   this into a clear game system, and for a more fitting name if one exists.
7. Boundaries are unresolved beyond "never bland or boring".
8. Non-negotiable: the critique of academia and the sarcastic, caustic,
   absurdist tone. Everything else can change or be given up.
9. One run: 60 minutes maximum. Cutscenes are dropped.
10. Inspirations: _The Stanley Parable_ (meta-game, sophisticated humour),
    _Superliminal_ (unique identity), _1984_ and _Sostiene Pereira_ (living
    inside a dystopian authority).

### Block A1 decisions so far (Leonardo, 2026-09-10)

- Inspirations corrected: _The Stanley Parable_, _Superliminal_, and
  _Mini Metro_ (minimalist visual style). _1984_ and _Sostiene Pereira_ are
  removed.
- Title: keep _Minor Revisions_. _The Last Author_ is recorded as a candidate
  to re-evaluate later.
- Meta layer: diegetic institutional voice, with occasional surprising meta
  moments. Confirmed.
- Form: compact 3D department plus a desk/interface layer. Confirmed.
- Audience: comprehension required for non-academics; insider recognition
  rewarded. Confirmed.
- Failure: early ejection or quitting is a real, warned ending. Confirmed.
- Money: one recurring pay and rent pressure event. Confirmed.
- Cast: the PI plus two colleagues, written deeply. Confirmed.
- Replay: three or four meaningfully different sacrifice paths. Confirmed.
- Scientific field: a complete change is confirmed. Soil microbiome or deep
  biosphere remains open, with a primary-agent recommendation awaiting
  Leonardo's choice.
- Content darkness: open, with a three-level primary-agent recommendation
  awaiting Leonardo's choice.

Block A1 is complete when the scientific field and the darkness level are
chosen. `01-vision.md` is written after that.

## Session 0 questions

1. In one sentence, what is the game? If that is hard, describe the single
   moment you most want a player to experience.
2. What should the player feel at the beginning, the middle, and the end?
3. What is the central recurring tension or impossible choice?
4. What does the player actually spend their time doing, and how does that
   create pressure?
5. Finish this sentence: "The game argues that ______."
6. What must never happen, and what would make you say "that's not it"?
7. How long is one run, and how much replay do you want?
8. What should the ending leave behind: relief, anger, sadness, resolve, or
   ambiguity?
9. Name two or three works and what exactly you envy in each.
10. What is non-negotiable, and what are you willing to give up?

## Carry-over observations from the v1 reviews (inspiration, not decisions)

The three independent reviews of the v1 documents, recorded in the v1 AI-use
log, found these recurring risks. They are prompts for Phase A and may be
rejected:

- The core loop repeated the same five stages across the experiment templates,
  with differences mostly at the label level.
- Roughly fifteen minutes of authored mandatory scenes supported a three-hour
  target; most story arrived through records and repeated systems.
- The comedy used one dominant register across narration, dialogue, notices,
  and collectibles; the likely reaction was wry recognition rather than
  laughter.
- Characters were schematic: one pressure, one quirk, one scene each.
- Hidden numeric states conflicted with the promise of fair, legible rules.
- A balance audit found the intended honest play style over budget in both
  pressure profiles, and a "Thin" evidence tier was unreachable.
- One human evaluator, with external playtesting disallowed, limited what
  could be learned about fun, comprehension, and humour before release.
- The v1 identity worth re-examining was the pairing of a claim/integrity
  system with institutional surrealism, and the manuscript as a moral object.

## Open items carried into Block A1 (prompts, not decisions)

- Target run length, including whether short and dense with high replay beats
  a longer campaign.
- Presentation and perspective: first-person 3D, a 3D/hybrid with
  decision-focused interaction, or a 2D or 2.5D form.
- Number of principal characters and depth per character.
- Number of authored experiments and how much routine is abstracted.
- Whether limited private playtesting is allowed.
- Content word budget and how much of it is dialogue versus system text.
