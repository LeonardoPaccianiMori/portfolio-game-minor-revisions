# Independent Design Review Protocol

Status: **review completed; findings discussion pending**

## Purpose

This protocol defines an independent frontier-LLM review of the complete
*Minor Revisions* design before Leonardo considers implementation approval. It
does not ask whether the project is a generally good or commercially attractive
game. It asks whether the documented mechanics, incentives, progression,
narrative, presentation, pacing, and content would produce the game that
Leonardo intends to make.

The review has two priorities:

- approximately 80 percent of the work reconstructs the implied game, checks
  vision alignment, and analyses player incentives; and
- approximately 20 percent critiques the design within its approved creative
  vision.

The reviewer provides evidence and recommendations. It cannot approve
implementation, change an approved decision, or edit an authoritative design
document. Leonardo keeps final creative authority.

## Reviewed snapshot and evidence rules

The first review uses design snapshot
`ea7e95d0ad33c7c9fd76466ea25bf726a4fb3ee8`. Every report must record:

- model and exact model identifier;
- provider;
- review date;
- reasoning or effort setting;
- source commit;
- files supplied;
- files that the model confirms it read;
- input, output, and cache token counts when available;
- reported API cost when available; and
- truncation, context, tool, or access limits.

The reviewer must stop and identify the problem if a required file is absent,
empty, truncated, or unreadable. It must not silently continue with an
incomplete packet.

The review uses only the supplied repository snapshot. It does not use web
research, Career Center, earlier private conversations, real people or
institutions, other games, or assumed implementation. A later task can perform
comparative or external research if Leonardo approves it.

Important claims must cite a file plus a heading, stable content ID, scene ID,
requirement ID, or other precise design object. Line numbers are useful when
available, but they are not required. The reviewer must separate:

1. facts stated directly in the documents;
2. implications of concrete design decisions;
3. interpretations or predictions; and
4. missing or underspecified information.

Confidence for an inference must be `high`, `medium`, or `low`. The reviewer
must flag contradictions. It must not resolve them by assumption.

## Review architecture

### Lane A: reconstruction, alignment, and constrained critique

Run Stages 1, 2, and 3 in one model conversation. Stage 1 receives only the
blind design packet. Preserve its answer before any vision file is supplied.
Stage 2 adds the vision and process packet. Stage 3 uses the complete corpus
and the two preserved reports.

### Lane B: revealed-game analysis

Run Stage 4 in a new model conversation with no Stage-1, Stage-2, or Stage-3
answer in its context. Part A receives only the blind design packet. Preserve
its behavioural prediction before Part B receives the explicit vision. This
separation reduces bias from the intended answer and earlier criticism.

Claude Opus 5 is the primary reviewer. If Gemini 3.1 Pro is used, its preferred
role is the independent Stage-4 lane. Do not give one model the other model's
answer until both independent analyses are complete.

## File packets

### Blind design packet for Stages 1 and 4A

Supply exactly these files from the reviewed snapshot:

- `docs/02-player-experience-and-loop.md`
- `docs/03-narrative-and-campaign.md`
- `docs/04-science-and-experiments.md`
- `docs/05-characters-and-dialogue.md`
- `docs/06-world-and-level-design.md`
- `docs/07-systems-and-balance.md`
- `docs/08-endings-and-state-matrix.md`
- `docs/09-art-audio-and-assets.md`
- `docs/10-ui-ux-accessibility.md`
- `docs/11-technical-architecture.md`
- `docs/12-content-specification.md`

This packet contains the concrete game design. It still reveals the premise and
some local presentation goals because those facts are part of the design. It
does not reveal the formal vision, intended audience, emotional promise,
success criteria, portfolio purpose, decision history, or evaluation rubric.

Do not supply these files during Stage 1 or Stage 4A:

- `README.md`
- `AGENTS.md`
- `docs/00-design-index.md`
- `docs/01-vision-and-pillars.md`
- `docs/13-testing-and-evaluation.md`
- `docs/14-production-plan.md`
- `docs/15-implementation-contract.md`
- `docs/decision-log.md`
- `docs/glossary.md`
- `assets/ASSET_MANIFEST.md`
- this review protocol or any review report; and
- any Career Center file.

### Vision and process packet for Stages 2 and 3

After Stage 1 is complete, add these files from the same snapshot:

- `README.md`
- `AGENTS.md`
- `docs/00-design-index.md`
- `docs/01-vision-and-pillars.md`
- `docs/13-testing-and-evaluation.md`
- `docs/14-production-plan.md`
- `docs/15-implementation-contract.md`
- `docs/decision-log.md`
- `docs/glossary.md`
- `assets/ASSET_MANIFEST.md`

The reviewer then has the complete design corpus. Treat
`docs/01-vision-and-pillars.md` as the principal statement of intended creative
vision. Use the other added files to understand boundaries, priorities,
acceptance criteria, production constraints, and decision status. An approved
decision is evidence of intent. Approval is not evidence that the decision is
coherent or effective.

### Vision reveal for Stage 4B

After Stage 4A is complete, add only:

- `docs/01-vision-and-pillars.md`

Stage 4B compares the locked behavioural prediction with the explicit vision.
It must not revise the prediction to make it agree with the vision.

## Stage 1 prompt: blind reconstruction

```text
You are an independent game-design analyst. You have received a limited packet
of concrete design documents for one game. You have not received the project's
formal vision, intended-audience statement, emotional promise, success rubric,
production history, or decision log.

First, list every supplied file and confirm that you read it completely. Stop
if a required file is absent, empty, truncated, or unreadable.

Your task is to reconstruct the game described by the decisions. Do not assess
whether it is a good game. Do not suggest an improvement. Do not use web
research, comparisons with other games, or information outside the supplied
files.

Answer this question:

"What game do these design decisions actually describe?"

Infer and analyse:

- the core player fantasy;
- the intended player experience;
- the emotional arc;
- tone, humour, atmosphere, and aesthetic identity;
- gameplay and narrative philosophy;
- pacing and repetition philosophy;
- the relationship between the game and the player;
- the likely target player;
- inferred design pillars;
- what the game appears deliberately not to be;
- the mechanics and content that most strongly define its identity;
- emergent qualities that might not be deliberate;
- contradictions or tensions between systems;
- ambiguities and mixed signals; and
- material information that is absent or underspecified.

Focus on interactions between systems. At minimum, test the relationships
between:

- the 64-period semester, action costs, energy, crash, and fixed story gates;
- experiment preparation, monitoring, outcome bands, evidence quality, and
  manuscript claims;
- PI confidence, visible integrity, five trust relationships, and career-route
  availability;
- manuscript revision, research records, ethical actions, peer review, and
  paper outcomes;
- optional character scenes, time pressure, and mechanical value;
- repeated use of one continuous floor, environmental change, and exploration;
- authored content volume, scene time, and the three-hour target;
- UI visibility, pressure profiles, save behaviour, and player planning; and
- modular endings, persistent Citations, and replay incentives.

For every material conclusion, classify it as `explicit`, `implied`, or
`interpretation`. Give confidence as `high`, `medium`, or `low`, and cite the
specific files and design objects that support it.

Use this report structure:

1. Corpus confirmation
2. Reconstructed game in 300-500 words
3. Core fantasy and likely player relationship
4. Inferred design pillars
5. Emotional, tonal, aesthetic, and pacing arc
6. System-interaction analysis
7. Mechanics that define the game's identity
8. Likely target player and likely exclusions
9. Emergent qualities
10. Contradictions, tensions, and mixed signals
11. Missing or underspecified information
12. Evidence table with conclusion, classification, confidence, and sources

Do not include recommendations, fixes, a quality score, praise, or a verdict.
```

## Stage 2 prompt: vision alignment audit

```text
You have now received the project's formal vision and the remaining design,
evaluation, production, and decision documents. First, list the new files and
confirm that you read each one completely. Stop if a required file is absent,
empty, truncated, or unreadable.

Preserve your Stage-1 reconstruction. Do not rewrite it to make it agree with
the newly revealed intentions.

Compare:

INTENDED GAME
versus
GAME IMPLIED BY THE CONCRETE DESIGN.

This stage is an alignment audit. Do not yet recommend design changes. Treat
`docs/01-vision-and-pillars.md` as the principal vision source. Treat the
approved mechanics and authored content as evidence of likely player
experience. Approval status does not prove alignment.

Classify each important design decision or system interaction as:

- strongly reinforces the vision;
- supports the vision;
- neutral;
- weakens the vision; or
- actively contradicts the vision.

Look especially for:

- mechanics that encourage behaviour contrary to the desired fantasy;
- optimization that reduces curiosity, uncertainty, immersion, exploration,
  humour, solidarity, discomfort, or complicity;
- progression that changes the player's relationship with the world in an
  unintended way;
- gameplay tone that conflicts with narrative, dialogue, visual, or audio
  tone;
- systems that work alone but collectively produce a different game;
- a secondary system that could become mechanically dominant;
- a central vision principle that has weak gameplay support;
- a comic system that becomes routine administration rather than fun satire;
- an ethical system that becomes a simple resource calculation;
- pressure that becomes either trivial optimization or exhausting monotony;
- the industry or academic route becoming an unintended good or bad ending;
- visible bars and feedback changing the intended ambiguity;
- the authored content and repeated floor failing to support the intended
  three-hour arc; and
- accessibility or pressure-profile rules that change meaning rather than
  only access or tolerance.

Use this report structure:

1. Corpus confirmation
2. Concise statement of the intended game
3. Concise restatement of the locked Stage-1 implied game
4. Alignment matrix with vision principle, concrete decision, classification,
   likely player experience, confidence, and sources
5. Strongest expressions of the vision
6. Greatest threats to the vision
7. Underrepresented parts of the vision
8. Emergent qualities stronger than the formal vision suggests
9. Intention-versus-experience mismatches
10. Risks that are unusual but creatively coherent
11. Missing evidence and unresolved contradictions

Do not include solutions. Do not reward a document because it states the right
goal. Evaluate what its rules and content are likely to cause.
```

## Stage 3 prompt: design critique within the vision

```text
Use the complete corpus, your locked Stage-1 reconstruction, and your Stage-2
alignment audit. Now critique the design within its approved creative vision.

Ask:

"Given the game this project deliberately wants to be, how can the documented
design produce that experience more reliably?"

The creative vision is a constraint. Do not redesign the project into a more
conventional game. Do not optimize primarily for mass-market appeal. Do not
apply a generic best practice without a project-specific causal reason. Do not
treat an unusual, demanding, or polarizing decision as a flaw when it
coherently serves the vision. You can call a choice risky but creatively
coherent.

Consider:

- weak, redundant, or mechanically dominant systems;
- complexity that does not create a distinct player experience;
- missing interactions between existing systems;
- mechanics or content that do not justify their cost;
- pacing, repetition, and content-distribution problems;
- unintended incentives and dominant strategies;
- thematic and mechanical disconnects;
- weak consequences or unclear causality;
- likely player behaviour under the documented information and feedback;
- underspecified decisions that can cause implementation divergence;
- conflicts between the full target, fallback, and vertical slice; and
- changes that could protect ambition while reducing production risk.

Classify issues as:

- `CRITICAL`: likely to make the implemented game contradict a central vision
  principle or fail as a coherent experience;
- `SIGNIFICANT`: likely to weaken a major part of the intended experience; or
- `OPTIONAL`: a bounded improvement or creative opportunity that is not
  necessary for coherence.

For each issue, provide:

- severity;
- affected vision principle;
- exact evidence;
- causal mechanism;
- likely player behaviour or experience;
- recommendation;
- smallest sufficient change;
- affected documents and systems;
- risk created by the recommendation;
- a way to test or prototype the change; and
- confidence.

Also identify decisions that should be preserved without change because they
strongly serve the vision.

Use this report structure:

1. Executive diagnosis
2. Preserve without change
3. Critical issues
4. Significant issues
5. Optional opportunities
6. Underspecified implementation decisions
7. Cross-system changes with the highest value
8. Prototype or evaluation questions
9. Prioritized recommendation table

Do not create a long list to appear thorough. Include only supported findings.
Avoid excessive praise, excessive politeness, and criticism for its own sake.
```

## Stage 4A prompt: blind incentives and revealed game

```text
You are in a new independent review conversation. You have received only the
concrete design packet. You have not received the formal vision or any earlier
review report.

First, list every supplied file and confirm that you read it completely. Stop
if a required file is absent, empty, truncated, or unreadable.

Ignore what the documents claim the game wants to mean. Analyse what the
documented rules, rewards, constraints, information, feedback loops,
progression, and route conditions would teach players to do.

Do not suggest improvements in Part A. Do not use web research or comparisons
with other games. Do not invent missing rules. Do not predict unsupported
numeric percentages.

Use a thought experiment with 100 hypothetical players only to identify
plausible behaviour classes. Do not claim a measured distribution.

Answer:

- What do players learn to care about?
- What do they learn to ignore?
- Which actions become routine, dominant, safe, costly, or irrational?
- What strategies and habits are likely to emerge?
- What information supports or prevents optimization?
- How do visible energy, integrity, and relationship bars affect behaviour?
- When are experiments science, puzzles, scheduling tasks, or resource
  conversions?
- When do manuscript and integrity choices become expressive choices, and
  when do they become route calculations?
- Are optional scenes worth their time cost for mechanical, narrative, or
  emotional reasons?
- How do Standard and Supported pressure profiles change behaviour?
- How do save rules, locked outcomes, no chapter rewind, ending cards, and
  Citations affect risk and replay?
- What behaviours are trained in early, middle, and late campaign phases?
- What emotional relationship with the game follows from these incentives?
- What values does the game reveal through what it rewards and permits?

Separate:

1. mechanically rational behaviour;
2. narratively plausible behaviour;
3. exploratory or expressive behaviour;
4. likely misunderstanding; and
5. behaviour that depends on missing information.

Use this report structure:

1. Corpus confirmation
2. Revealed game in 300-500 words
3. Player behaviour classes
4. Early-, middle-, and late-game learned behaviour
5. Dominant, safe, expressive, and neglected actions
6. Incentive and feedback-loop map
7. Standard-versus-Supported comparison
8. Ethical-choice behaviour
9. Career-route and ending behaviour
10. Emotional relationship created by the incentives
11. Missing information that prevents a firm prediction
12. Evidence table with confidence and sources

Do not compare this result with an intended vision. Do not recommend changes.
```

## Stage 4B prompt: revealed game versus vision

```text
You have now received `docs/01-vision-and-pillars.md`. Confirm that you read it
completely.

Keep your Stage-4A behavioural prediction locked. Do not rewrite it to agree
with the vision.

Compare the revealed game from Stage 4A with the explicit vision. Identify:

- behaviours that reinforce the intended experience;
- behaviours that weaken or contradict it;
- intended values that the mechanics do not reward;
- unintended values that the mechanics do reward;
- dominant strategies that threaten the vision;
- risky but creatively coherent incentive structures; and
- the smallest system changes that could improve alignment.

For each proposed change, state the affected system, causal reason, likely
benefit, possible new risk, and confidence. Do not redesign the game into a
different genre.

Append this comparison to the preserved Stage-4A report under:

13. Vision comparison
14. Incentive threats
15. Creatively coherent risks
16. Bounded recommendations
```

## Optional follow-up prompt

```text
Review the preserved reports without adding a new general critique. Select the
five findings that most need a decision before implementation.

For each finding:

- state the exact disagreement or risk;
- show the strongest evidence for and against it;
- identify whether it needs a design decision, document clarification,
  prototype, balance test, or no action;
- ask one neutral question that Leonardo must answer; and
- identify every affected design document.

Then list findings that appear important but should wait for the vertical
slice because the current documents cannot resolve them reliably.
```

## Provider-specific use

### Claude Opus 5

Use the standard API mode, not premium fast mode. Use the strongest practical
reasoning or effort setting that keeps each report complete. Give the complete
file packet before the task instruction, keep file boundaries explicit, and
request Markdown rather than JSON. Opus performs Stages 1-3 in one preserved
conversation and Stage 4 in a new conversation.

Do not let polished prose replace the evidence table. If the answer is close to
its output limit, continue the same report from the last complete heading. Do
not ask for a compressed rewrite.

### Gemini 3.1 Pro

If used, prefer it for the independent Stage-4 lane. Give it the same exact
snapshot and packet boundaries. Ask it to complete the evidence and incentive
tables before writing synthesis because long-context summaries can otherwise
hide system interactions. Do not show it the Opus reports until its independent
Stage-4 report is preserved.

## Storage and decision boundary

Initial API responses remain outside Git until Codex checks that:

- the model read the complete required packet;
- the report is not truncated;
- citations refer to supplied files;
- no Career Center or unrelated private information entered the response;
- Stage 1 and Stage 4A contain no leaked vision packet;
- recommendations appear only in the stages that permit them; and
- model metadata and token use are complete.

The 2026-08-28 Claude Opus 5 run passed these checks. The reviewed Markdown
reports, metadata, and validation qualifications are stored in
`docs/reviews/2026-08-28-opus-5/`. Raw API response JSON is not retained in the
repository.

After a separate tracked-change approval, reviewed reports can use:

- `docs/reviews/YYYY-MM-DD-opus-5/stage-1-blind-reconstruction.md`
- `docs/reviews/YYYY-MM-DD-opus-5/stage-2-vision-alignment.md`
- `docs/reviews/YYYY-MM-DD-opus-5/stage-3-design-critique.md`
- `docs/reviews/YYYY-MM-DD-opus-5/stage-4-revealed-game.md`
- `docs/reviews/YYYY-MM-DD-opus-5/review-metadata.md`

After Leonardo and Codex discuss the findings, a later
`review-decision-record.md` records each material recommendation as accepted,
rejected, deferred, or requiring a prototype. Only accepted decisions can
change the numbered design documents. The external reviewer never changes the
implementation gate.
