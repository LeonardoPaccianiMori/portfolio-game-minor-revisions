# Holistic Game Assessment Protocol

## Purpose

This review asks whether the documented design presents a coherent, distinctive,
and plausibly enjoyable game. It also reconstructs Leonardo's apparent creative
expectations without pretending that an external model can know preferences that
have not been stated.

The review does not prove that the game is fun. It evaluates the strength of the
fun hypothesis and identifies claims that require a vertical-slice test.

## Stage 1 prompt: blind identity and appeal assessment

```text
You are an independent senior game-design critic. You have received a limited
packet of concrete design documents for one game. You have not received its
formal vision statement, intended-audience statement, production history,
decision log, prior review reports, or designer commentary.

First, list every supplied file and confirm that you read each file completely.
Stop if a required file is absent, empty, truncated, or unreadable.

Assess the game that these concrete decisions actually describe. This is not a
commercial forecast, a mass-market review, or a request to compare the project
with successful genre games. Do not use web research or outside information.

Answer these central questions:

1. Does this design have a clear and easily identifiable identity?
2. What, if anything, makes that identity distinctive?
3. Does the design support a credible hypothesis that the game will be fun or
   compelling to play?
4. Are its narrative direction and artistic direction clear from the concrete
   design alone?
5. Does it appear to be a coherent game rather than a coherent collection of
   documents?

Treat “fun” as several different questions. Analyse:

- moment-to-moment pleasure during movement, inspection, experiment work,
  monitoring, analysis, manuscript work, and conversations;
- short-loop satisfaction across one or two work periods;
- campaign-level momentum across the 64-period semester;
- narrative anticipation, humour, pressure, ethical tension, and emotional
  payoff;
- discovery, mastery, expressive choice, consequence, and replay value;
- likely repetition, administrative friction, dead time, or boredom; and
- which fun claims can only be tested in a playable vertical slice.

At minimum, examine the interactions between:

- one continuous university floor and the repeated action loop;
- the experiment chain, evidence interpretation, manuscript claims, and peer
  review;
- visible state bars, fixed story gates, pressure profiles, and player planning;
- energy, involuntary crashes, relationships, integrity, and route access;
- optional scenes and environmental text versus time pressure;
- bitter comedy, institutional absurdity, grounded science, and human stakes;
- stylized institutional realism, scientific colour and motion, interface,
  non-lexical dialogue sounds, ambience, and music;
- authored content volume, the approximately three-hour target, and replay;
  and
- the ending architecture and the meaning players are likely to take from it.

Distinguish:

- explicit facts in the supplied documents;
- implications of concrete design decisions;
- your interpretations and predictions; and
- absent or underspecified information.

Give high, medium, or low confidence for every important inference. Cite files
and stable design objects, requirement IDs, content IDs, scene IDs, or headings.
Do not suggest improvements or recommendations in this stage. Do not give a
numerical score. Avoid praise used only for politeness and criticism used only
to appear rigorous.

Use this report structure:

1. Corpus confirmation
2. The game in one sentence
3. Identity fingerprint
4. Distinctive versus generic elements
5. Quality thesis: strong, fragile, unclear, or mixed, with reasons
6. Fun hypothesis by time scale
7. Likely player behaviours and sources of engagement
8. Likely friction, repetition, and boredom
9. Narrative direction and emotional arc
10. Artistic and audio direction
11. Coherence between mechanics, narrative, and presentation
12. Likely audience and likely exclusions
13. Claims that require a playable prototype
14. Contradictions, ambiguities, and missing information
15. Evidence table
```

## Stage 2 prompt: latent expectations reconstruction

```text
You have now received the formal vision, decision history, evaluation plan,
production constraints, and other project-level documents. First, list the new
files and confirm that you read each file completely. Stop if a required file
is absent, empty, truncated, or unreadable.

Preserve your Stage-1 conclusions. Do not rewrite them to agree with the newly
revealed intentions.

The designer says that he does not yet know all of his expectations for this
game. Reconstruct the strongest expectation map that the evidence supports.
Do not claim to know the designer personally. Do not infer a preference only
because it would be conventional or commercially useful.

Separate four classes:

1. Explicit expectations and non-negotiable constraints.
2. Strongly implied preferences shown by repeated approved choices.
3. Plausible but uncertain preferences.
4. Genuine open axes where the documents do not establish an expectation.

For each inferred preference, cite the specific approved decisions that support
it and give high, medium, or low confidence. State plausible alternative
interpretations when confidence is not high.

Then compare the expectation map with the game reconstructed in Stage 1. Assess:

- identity and distinctiveness;
- the desired kinds of fun and engagement;
- comedy and absurdism;
- bitterness, humanity, and non-nihilism;
- narrative meaning and the academia-to-industry tension;
- artistic and audio identity;
- the balance between grounded science and surreal institution;
- the balance between a personal creative outlet and a credible game;
- the approximately three-hour ambition; and
- the secondary goal of demonstrating effective direction of LLM agents
  without turning the fiction into an AI showcase.

Identify the expectation axes that Leonardo must ultimately settle through
creative judgment or prototype experience. For each open axis, state the two or
three materially different directions already latent in this design and what a
player would experience under each direction. Do not recommend one direction
yet.

Use this report structure:

1. New corpus confirmation
2. Explicit expectation map
3. Strongly implied preference map
4. Uncertain inferred preferences
5. Genuine open expectation axes
6. Alignment with the Stage-1 identity
7. Alignment of likely fun with desired experience
8. Narrative-direction alignment
9. Artistic and audio-direction alignment
10. Productive creative tensions
11. Accidental or unresolved tensions
12. Decisions that need Leonardo's judgment or a prototype
13. Evidence table with class, confidence, and sources

Do not provide design recommendations in this stage.
```

## Stage 3 prompt: holistic critique and recommendations

```text
Use the complete corpus and preserve the findings from Stages 1 and 2. You may
now critique the design and make recommendations.

Answer directly, with qualifications where needed:

- Does Minor Revisions currently look like a good game design on its own terms?
- Does it have a unique and easily identifiable identity?
- Does it support a credible fun hypothesis for moment-to-moment play and for a
  three-hour campaign?
- Are its narrative, artistic, and audio directions clear?
- Do those directions match the explicit and inferred expectations?
- What cannot be known before a playable vertical slice exists?

Treat the creative vision as a constraint. Do not redesign the project into a
more conventional, more commercial, or more mass-market game. Do not reject an
unusual or polarizing choice merely because it is risky. You may conclude that
a choice is risky but creatively coherent.

Focus on interactions between systems and on the game the player will
experience. Examine weak or absent sources of pleasure, mechanically dominant
secondary systems, repetition, pacing, unintended incentives, narrative and
mechanical disconnects, unclear artistic execution, systems that do not pull
their weight, and complexity that is not earning a player-facing result.

For each recommendation:

- assign a temporary ID in the form HGA-R01, HGA-R02, and so on;
- classify it as CRITICAL, SIGNIFICANT, or OPTIONAL;
- classify its evidence as DOCUMENT-SUPPORTED or PROTOTYPE-REQUIRED;
- state the diagnosed problem;
- cite the concrete source decisions;
- state the likely player effect;
- propose the smallest change that can test or improve the issue;
- state what part of the approved vision the change preserves;
- state risks or costs introduced by the change;
- identify affected design documents and systems; and
- define a minimum prototype or review test that could confirm or reject it.

Do not repeat the same issue under multiple IDs. Distinguish a missing design
decision from a design decision that you believe is weak. Do not assume that
the project will use external playtesters. Leonardo and Codex are the only
approved evaluators.

Use this report structure:

1. Direct verdict
2. Identity verdict
3. Fun-hypothesis verdict
4. Narrative-direction verdict
5. Artistic and audio-direction verdict
6. Expectation-alignment verdict
7. Strongest existing design commitments
8. Critical recommendations
9. Significant recommendations
10. Optional recommendations
11. Prototype-required questions and minimum tests
12. Elements that should not be normalized or removed
13. Prioritized next decision sequence
14. Final risk statement
```

## Stage 4 prompt: reconciliation with the first review

```text
You are given two preserved review sets for the same frozen game-design
snapshot:

- the first independent alignment and revealed-game review; and
- the later holistic identity, appeal, expectations, and quality review.

You are not reviewing the game again. Do not invent a new recommendation. Your
task is to reconcile the review findings without silently merging differences.

First, list every supplied report and confirm that you read it completely. Stop
if a report is absent, empty, truncated, or unreadable.

For every material recommendation or actionable finding, classify the
relationship as one of:

- DUPLICATE: materially the same issue and proposed direction;
- REINFORCING: distinct evidence or reasoning supports the same concern;
- CONFLICTING: the reports recommend incompatible directions or use
  incompatible assumptions;
- GENUINELY NEW: the later review adds an issue not present in the first;
- QUALIFYING: the later review narrows, conditions, or corrects an earlier
  claim;
- SUPERSEDING CANDIDATE: a later formulation is more precise and could replace
  an earlier formulation after Leonardo's decision; or
- NON-ACTIONABLE OBSERVATION: useful context that should not become a design
  task.

Produce candidate entries for a controlled recommendation register. Each entry
must have:

- a stable proposed ID in the form MR-REV-001, MR-REV-002, and so on;
- a concise title;
- the source review and source finding or recommendation IDs;
- the relationship classification;
- severity, preserving disagreement when the reports differ;
- document-supported, prototype-required, or mixed evidence;
- the shared diagnosis, if any;
- the recommendation alternatives, without choosing between conflicts;
- the affected design documents and systems;
- the minimum decision or test needed;
- status `unreviewed`; and
- any qualification from Codex validation notes.

Do not mark an entry accepted, rejected, deferred, or prototype required on
Leonardo's behalf. Do not change the design. Do not treat a model's prediction
as measured player behaviour. End with a short list of the genuinely new
questions that Leonardo should discuss before implementation.
```
