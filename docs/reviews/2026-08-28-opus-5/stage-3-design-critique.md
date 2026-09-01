# Stage 3 — Design Critique Within the Approved Vision

---

## 1. Executive diagnosis

The corpus is unusually disciplined. Scope, non-goals, content counts, test IDs,
provenance gates, and work packages are internally consistent, and several vision
principles — failure architecture, publication-as-anticlimax, solidarity as a
real mechanic, no moral score — are translated into rules with precision that is
rare at this stage.

The design's weakness is not scope, coherence, or ambition. It is that **three of
the vision's four hardest promises are asserted in prose and carried by almost no
mechanism**:

1. **"Difficulty from interpretation."** Every primary record ships with its
   interpretation already written (`record.*.strong/limited/weak` are all
   "Observation: … Interpretation: …"). The player selects experiments and reads
   verdicts. The stated meaningful challenge — "choosing what to do, what
   evidence to trust, and what cost to accept" (`02`) — has no object that
   represents _the player's_ reading.

2. **"Difficulty from ethical choices" / "uncomfortable complicity."** Integrity
   gates nothing. Inflation pays **+10 PI confidence**, which is a genuine
   Aldercroft currency. Altered and fabricated readings cost 25 and 45 integrity
   points that purchase no consequence except an epilogue label and two
   conditional scenes — and the 90-minute fallback deletes both of those scenes.
   In the version most likely to ship, dishonesty is free and unwitnessed.

3. **"Fun and absurdist throughout" / humour from responsive systems.** Comedy is
   assigned to `MR-WP-08` (content integration) and tested by
   `MR-TEST-CONT-001`, which checks no tonal property. The interface the player
   touches ~60 times is specified as factual and non-moral, the single most
   frequent action (protected break) has no content object at all, and the main
   satire vehicle (30 environmental items) is optional, one-shot, and skippable
   under time pressure.

There is also one dominant strategy that inverts a pillar: **the
minimum-effort playthrough produces the Morrow offer.** Morrow requires
"at least a Developing evidence packet," and `07` states the campaign _starts_ at
Developing. A player who runs no successful experiments, drafts the paper, posts
the automatic preprint, and answers two emails is eligible; the same player fails
Aldercroft. Combined with Camila being the only warmly written character and
`Transferable Skills` being the least bleak epilogue, the laziest path is also
the kindest-feeling one. `01` explicitly forbids industry from reading as
salvation.

Everything above is fixable with small, bounded changes that use objects the
design already owns — evidence-card caveat tags, the requirements panel, the
`PIIM` response cards, the act-state text mechanism, and the "bounded support
action" that `05` and `07` promise but `12` never instantiates. None of the
recommendations below requires a new floor, a new experiment family, a new
mandatory scene, or a new action-cost class.

---

## 2. Preserve without change

These serve the vision more strongly than any alternative I can construct from
the corpus. They should be treated as load-bearing.

**2.1 Fixed gates that never wait for unfinished work.**
`03` invariants; `07` requests/gates. This single rule produces the game's
characteristic failure texture — arriving at a mandatory scene with a paper you
know is inadequate — and is the mechanical basis of "uncomfortable complicity."
Any softening would convert the game into a conventional deadline manager.

**2.2 The preprint posting in every run.**
`03`; `12` `MR-SCN-PUBLIC-RECORD` ("The preprint posts in every run"). This is
the corpus's most efficient thematic device: guaranteed irreversibility, zero
branching cost, and `scene.publicRecord.internal.check` is the best line in the
draft.

**2.3 Seed-locked earned outcome bands with no reroll.**
`07` band table; `11` PRNG rules. Removes save-scumming, guarantees causal
learnability, and makes variance read as biology. Do not add a reroll, retry, or
rewind under any pressure.

**2.4 No pre-Week-16 game-over; gates open lower-evidence routes.**
`02`, `07`. Directly implements pillar 3. The crash's fencing (cannot begin
during a manual equipment action or cutscene; restores two segments; never
required by any viable route) is correctly priced as a bad trade rather than a
punishment.

**2.5 Locked raw record with a mutable reported record, and no falsification
method.**
`04`, `07`, `03`. This is the precondition for the entire integrity theme being
about _presentation_ rather than forgery, and it is what keeps the game inside
its Teen/12+ and safety boundaries.

**2.6 Visibility-gated misconduct: fabrication can publish; honest work can
fail.**
`03`, `07`, `08`. Risky and polarizing, and exactly the thesis. Do not add
automatic detection or karmic correction.

**2.7 No moral score, factual integrity warnings, un-ranked citations.**
`05`, `07`, `08`, `12` `MR-CIT-07`. Held consistently across nine documents.

**2.8 Solidarity as material value.**
Samira's credit choice (EV+1, 1 period, 0 energy), Gabriel's ≥61 pass-through,
the correction options that repair both trust and integrity. `06`, `12`. Pillar
"solidarity remains meaningful" is implemented, not asserted. `MR-CIT-05`
satirising its own reward is a genuinely good move.

**2.9 Out of Scope requiring an available route.**
`07`/`08` B06 resolution. Prevents departure from becoming a free quit button
while keeping it dignified. This guard is doing more work than it looks like.

**2.10 The pre-authored fallback and the €150/stop-rule production discipline.**
`12`, `14`. The existence of a _designed_ contraction rather than an improvised
one is the main reason the project's ambition is credible. Only its cut line
needs attention (see 3.1), not its existence.

---

## 3. Critical issues

---

### C1 — The fallback deletes the entire social consequence of complicity, and it is the likely shipped artifact

**Severity:** `CRITICAL`
**Affected vision principle:** Emotional arc stage 3 ("uncomfortable
complicity"); `12`'s own promise that "The fallback is a coherent 90-minute
game, not a damaged full game"; `01` "solidarity remains meaningful."

**Exact evidence.**
`12` fallback exclusions: "It excludes MR-EXP-DRUG-EXPOSURE,
MR-OPT-HAORAN-MISSING-REPLICATE, MR-OPT-SAMIRA-SHARED-INSTRUMENT, and
MR-OPT-GABRIEL-ARCHIVE. It may not add a replacement optional scene to recover
the removed content count." `MR-OPT-HAORAN-MISSING-REPLICATE` and
`MR-OPT-GABRIEL-ARCHIVE` are the only two content objects in the entire
catalogue where a colleague notices a record mismatch — `03` and `05` both state
that "Haoran and Gabriel can only notice a mismatch supported by the player's
visible evidence trail." The fallback nonetheless retains the full Week-14
integrity fork (`scene.response.stronger.omit/alter/fabricate`) and claims to
retain "all ending modules and citations." `14` stop rule 5 permits the project
to "remain a fallback."

**Causal mechanism.**
Removing both discovery scenes removes every path by which misconduct becomes
interpersonal. What remains is a private numeric change (I-10/-25/-45), one
epilogue integrity module, and the Camila confession — which the player controls
and can simply not select. Fabrication in the fallback therefore has no witness,
no confrontation, no correction door, and no cost.

**Likely player experience.**
A fallback player who inflates and fabricates experiences a smooth, unopposed
run and one moderately bleak epilogue line
(`ending.integrity.undiscovered`: "The published version looks stable. The
private record has a different kind of rhythm."). Complicity becomes information
the player holds about themselves rather than something the game makes them feel.
Simultaneously, `MR-CIT-08` ("read a concern from Haoran or Gabriel and
respond") has no trigger, so the fallback cannot deliver the citation set it
claims to deliver, and `13`'s `MR-TEST-END-001` fixture for all twelve citations
cannot pass.

**Recommendation.**
Preserve one mismatch-discovery beat in the fallback without changing the
optional-scene count, by attaching it as the conditional variant of a scene the
fallback already keeps.

**Smallest sufficient change.**
Two edits:

1. Give `MR-OPT-SAMIRA-NOT-IN-MY-FIGURE` (retained in fallback; already at shared
   desks; window W6–12) its permitted single conditional variant: when a visible
   record, reported reading, or authorship state supports concern, Samira raises
   it, with the same three-response shape as the existing discovery scenes
   (correct / deny / defer). `12` already allows "at most one saved conditional
   variant" per optional scene.
2. Widen `MR-CIT-08`'s trigger from "Haoran or Gabriel" to "a colleague," and add
   the corresponding one-line permission in `03` and `05` ("Samira can also
   notice a mismatch supported by the visible record").

**Affected documents and systems.** `03` (integrity encounters), `05`
(authorship and integrity encounters), `12` (`MR-OPT-SAMIRA-NOT-IN-MY-FIGURE`,
`MR-CIT-08`, fallback section), `13` (`MR-TEST-CHAR-001`, `MR-TEST-END-001`).
Systems: optional-scene selection, permanent flags, citation unlock.

**Risk created.** Slightly complicates Samira's characterisation, which `05`
currently frames around competition and credit rather than record integrity.
Mitigated by `05`'s existing latitude ("rival, ally, or exhausted
co-conspirator") and by the fact that her scene is already conditional on the
player _using her evidence_, which makes a record concern natural.

**Test / prototype.** `MR-TEST-CHAR-001` fixture matrix: run the fallback
content set with `FLAG:alteredReading` set and assert that exactly one discovery
scene becomes available and `MR-CIT-08` unlocks. Additionally assert the
converse: a fully honest fallback run reaches all citations except those
requiring route states it did not achieve.

**Confidence.** High. The exclusion list, the mismatch-source rule, and the
citation trigger are all explicit and directly contradict each other.

---

### C2 — The minimum-effort playthrough yields the Morrow offer, making industry the easy and emotionally warmest ending

**Severity:** `CRITICAL`
**Affected vision principle:** Pillar 4 ("the exit is meaningful, not utopian…
not presented as moral perfection"); Pillar 1 ("survival through decisions");
`01` success criterion "The industry route is attractive but imperfect."

**Exact evidence.**
`08` Morrow conditions: "reply to Camila and attendance at her video call; a
public preprint still available; at least Developing evidence; at least 41 Camila
working trust; no confession of fabrication to Camila." `07`: "The game starts at
three points, Developing." `12`: the preprint "posts in every run"; Camila starts
at 40 and `optional.camila.initial.careful` gives T:Camila+10. `MR-TASK-MANUSCRIPT`
depends only on `MR-SCN-A-COMPLETE-NARRATIVE`, which occurs in every run
regardless of packet quality.

By contrast, Aldercroft requires the research plan plus **two of three** {Coherent
or Substantial evidence, Supportive or Invested PI confidence, Elena ≥41}, so a
player with no experimental progress fails it.

**Causal mechanism.**
Every Morrow condition is a conversation or an automatic campaign event. None
requires a successful experiment, a good result, an analysed record, or a
defensible claim. The evidence floor is the starting value, so the evidence
condition is satisfied at t=0. The result is a route whose gate is orthogonal to
the game's entire core loop.

**Likely player experience.**
Two divergent failures. A player who under-performs — through inexperience,
crashes, or deliberate coasting — finds that exactly one route remains open, and
it is the one with the calmest epilogue (`ending.career.morrow`: "a clear project
board and a product deadline… finite only in the way a useful job can be
finite"), the warmest relationship afterbeat (`ending.relationship.camila.support`:
"The sentence is direct and kind"), and a citation
(`MR-CIT-10`). A player who works hard and honestly gets Aldercroft, whose
epilogue is a bridge appointment and another committee document. Effort correlates
inversely with epilogue comfort, and industry becomes rescue.

**Recommendation.**
Make Morrow's gate test _demonstrated experimental judgement_ rather than a
packet label. This is thematically exact: `04` states Morrow is "interested in
the method and the protagonist's culture, microscopy, image analysis,
perturbation, failure-diagnosis, and quality-control skills," and
`optional.camila.video.close` says "Clear limits are not a weakness. They are how
a result becomes usable."

**Smallest sufficient change.**
Replace Morrow's "at least a Developing evidence packet" with "at least three
analysed primary records, at least one of which reports a limited or weak result
honestly." This reuses existing record state and existing honesty flags, adds no
content, and cannot be satisfied at campaign start. Additionally, revise
`ending.career.morrow` to name one concrete relinquished scientific question, as
`03` already promises ("product deadlines, client priorities, and less personal
ownership of the work") but the current string only gestures at.

**Affected documents and systems.** `03` (Morrow eligibility), `07`
(career-route readiness), `08` (B05 route-unlock contract), `12`
(`MR-OPT-CAMILA-OFFER`, `ending.career.morrow`). Systems: route resolver, record
state, ending modules.

**Risk created.** A player who cancels or loses sample groups could fall below
three analysed records and lose both routes, producing **End of Contract**. That
is consistent with `08` ("A poor run may leave neither route viable"), but it
raises the floor for the worst ending. Three analysed records is reached by any
run that completes even the first three required templates, so the risk is low.
Second risk: strengthening Morrow's gate could make it feel _more_ prestigious
rather than differently valued; the honest-limitation clause is what prevents
this, because it rewards reporting a weak result, not producing a strong one.

**Test / prototype.** Add a `MR-TEST-CHAR-001` fixture: a "minimum-effort"
campaign that completes no experiment and asserts that no career route is
available at Week 16. Add a paired fixture: three analysed records including one
honest weak result, with a Thin packet, and assert Morrow available.

**Confidence.** High. The gate condition and the starting evidence value are both
explicit and arithmetically incompatible with the intended trade-off.

---

### C3 — Integrity is mechanically inert while inflation is the cheapest route currency, so ethics becomes free rather than uncomfortable

**Severity:** `CRITICAL`
**Affected vision principle:** Pillar 1 ("difficulty comes from… ethical
choices"); emotional arc ("uncomfortable complicity"); `07` balance principle
("Integrity must not be a simplistic morality meter").

**Exact evidence.**
`07`: careful claim −5 PI, strong +5, inflated **+10**; "Fully answering an
active PI request with useful work gives 10 points." Integrity: omission −10,
changed reading −25, unsupported reading −45; recovery capped at "at most 10
total points in one run." `08`: "A hidden integrity problem alone does not block
Aldercroft"; "A hidden integrity problem alone does not close Morrow."
Aldercroft accepts "Supportive or Invested PI confidence" as one of its three
conditions. PI confidence starts at 45.

**Causal mechanism.**
Across a campaign with an initial draft plus several `MR-ACT-MANUSCRIPT-COMMIT`
actions, consistently inflating claims can plausibly move PI confidence by
+30–40 while consistently careful claims lose 15–20 — a swing spanning
Conditional to Invested on a 0–100 scale. That swing is one of Aldercroft's three
gate conditions. Meanwhile the offsetting integrity loss purchases nothing: it
does not gate a route, does not cost a period, and its only guaranteed effect is
an epilogue string. The `PIIM` claim-scope penalty exists but is stated purely
qualitatively ("A strong but overstated claim **can** weaken the claim-scope
card"), so it cannot be relied on as a counterweight.

**Likely player experience.**
The systems-literate player notices within two or three commits that inflation is
free PI confidence and that Research Status never converts integrity into a
warning about route access. Ethics becomes a roleplay preference expressed against
the grain of the mechanics. The sincere player has the mirror-image problem: their
restraint costs PI confidence and buys a label. Neither experience is
_uncomfortable_; one is unpunished and the other is unrewarded. This is the
listed failure mode "an ethical system that becomes a simple resource
calculation," in its worst form — a calculation whose answer is always the same.

**Recommendation.**
Do not make integrity a route gate; that would break the thesis that fabrication
can publish. Instead, make a compromised record cost the resource the player was
trying to save: **time and attention**. A misrepresented record requires ongoing
maintenance.

**Smallest sufficient change.**
Two edits:

1. Add one authored consequence: when `FLAG:alteredReading` or
   `FLAG:fabrication` is set, one **record-consistency task** becomes required at
   the desk in each remaining act (`MR-TASK-RECORD-CONSISTENCY`, resolved by an
   existing light or focused desk action at 1 period / 1 energy, with no PI or
   integrity effect). It is not a punishment message; it is administrative
   upkeep, which is also the funniest possible framing.
2. Make the `PIIM` claim-scope card rule explicit rather than qualitative in
   `07`/`08`: an Inflated committed claim sets claim scope to **not met** unless
   the packet is Substantial and the response omits no valid card.

This keeps `08`'s "hidden integrity does not block a route" rule intact while
making dishonesty cost 2–4 periods and 2–4 energy in a 64-period budget that
Stage-1 arithmetic shows is already tight.

**Affected documents and systems.** `07` (integrity, PI confidence, PIIM band),
`08` (response contract, route-unlock), `12` (one task ID, one action label, 2–3
strings, `MR-TEST-EXP-001`/`MR-TEST-NARR-001` links), `02` (action-cost table
note). Systems: request queue, safe-point scheduler, response-card evaluation.

**Risk created.** `02` states "No later agent may add a new time-costing action
class without a requirement change." The recommendation adds a _task_, not a new
cost class — it reuses light/focused costs — but this must be recorded as an
explicit decision or it will be read as a violation. Second risk: the maintenance
task could feel like a punishment tax rather than satire if its text is neutral;
its wording must sit in the institutional-euphemism register, not the
warning register.

**Test / prototype.** Vitest fixture: run two identical campaigns, one careful and
one inflating-and-altering, and compare available productive periods at Week 14
and route availability at Week 16. The desired result is that dishonesty buys PI
confidence _and_ costs periods, so both paths can reach a route by different
sacrifices. If the dishonest run still has more slack, the maintenance cadence is
too light.

**Confidence.** High for the diagnosis (all figures explicit). Medium-high for
the specific remedy magnitude; the cadence is a tuning value the slice should set.

---

### C4 — The longest stretch of the game is administrative, and the vision's comedy has no presence in the actions the player repeats

**Severity:** `CRITICAL`
**Affected vision principle:** Pillar 6 ("the game must remain fun and absurdist
throughout"; humour from "institutional language, physical environment, and
**responsive systems**"); the Humour Execution Rule ("Every serious game system
must allow comic, satirical, or strange feedback"); `07` ("Approximately three
hours should contain escalation, not repetitive grinding").

**Exact evidence.**
`15` maps `MR-REQ-VISION-001` (comic satire) to `MR-WP-08` and to
`MR-TEST-CONT-001`, whose checks in `12` and `13` contain no tonal criterion.
`07` requires integrity warnings that are "factual and do not give a moral label"
and forecasts in plain language; `12`'s UI draft is uniformly neutral
(`ui.save.success` "Saved at a safe point."; `ui.action.warning` "This action
changes time, energy, or the record."). The **protected break** — which Stage-1
arithmetic shows is structurally mandatory and probably the single most frequent
action in the game — has no `MR-ACT-*` ID, no cost row in `12`'s action table, no
text key, and no content. `MR-ACT-MONITOR-ROUTINE` costs 1 period / 0 energy and
is described as "A light deliberate check," with no requirement that it present a
decision. Environmental items display once and are explicitly non-load-bearing.

**Causal mechanism.**
The mid-campaign loop is: walk to a station, confirm, walk back, take a break,
confirm. The comic content sits in three places the loop does not touch —
optional environmental text (skippable), authored scenes (five in the whole
middle act, energy-free but calendar-fixed), and twelve citations spread across
three hours. The recurring surface is deadpan by explicit rule. Weeks 6–14 are
simultaneously the longest stretch and the one where `06`/`09` specify colder
light and thinner music.

**Likely player experience.**
Act 1 is funny, as intended. Acts 2–4 become bookkeeping performed inside a
progressively colder building, with humour arriving in occasional authored bursts
rather than from play. The vision's most distinctive claim — comedy _through_
systems — is the one most likely to be missing from the finished game.

**Recommendation.**
Give the two highest-frequency interactions an authored comic surface that does
not compromise the factual-warning rule, and require that every monitoring visit
be a decision.

**Smallest sufficient change.**
Three edits, all cheap:

1. Catalogue the protected break as an action (`MR-ACT-BREAK`, 1 period, energy
   restore per `07`) with one act-state-indexed break-room line — five strings,
   reusing the `MR-ENV-*` display mechanism. The break room already has an
   authored noticeboard and a damaged coffee machine (`06`); this makes the most
   repeated action the game's most reliable joke delivery point.
2. Add one act-state-indexed flavour line to the desk work-queue panel — five
   strings — kept strictly beside, never instead of, the required status words
   ("running / check ready / attention needed / ready for analysis").
3. Specify in `04`/`07` that a monitoring window exists only where at least two
   materially different options are available; a visit with no decision is not a
   window and costs nothing.

Ten new strings and one rule constraint. No new systems.

**Affected documents and systems.** `02` (action-cost table), `04` (monitoring
contract), `07` (experiment interaction state), `09` (cue roles unaffected),
`12` (action catalogue, break strings, queue strings), `13`
(`MR-TEST-EXP-001` monitoring fixture). Systems: request/queue UI, monitoring
resolution, protected break.

**Risk created.** Edit 3 removes some 1-period expenditures, which frees periods
and loosens the calendar — and Stage-1 analysis shows energy, not periods, is the
binding constraint, so the effect is small but real. It should be measured
against `07`'s 48–62-period route budgets rather than assumed neutral. Edit 2
risks cluttering a panel that `10` requires to stay quiet; the flavour line must
be typographically subordinate and must not appear in the HUD.

**Test / prototype.** The vertical slice already contains the laser/sham loop and
the tutorials. Instrument it to record: number of monitoring visits, number of
visits that presented no choice, real time per period, and periods spent on
breaks. Then apply `13`'s experience criterion 4 ("The first part can make the
player laugh") to the slice _with_ and _without_ the break and queue flavour
lines, since those are the only comic surfaces present in a Week-1 build besides
`Clarified`, the Gabriel queue, and the rejection records.

**Confidence.** High for the structural diagnosis (the omissions and the
work-package mapping are explicit). Medium for the magnitude of the felt
monotony, since no playtime measurement exists anywhere in the corpus.

---

### C5 — Records arrive pre-interpreted, so the pillar's "interpretation" axis and the manuscript's promised judgement have no object

**Severity:** `CRITICAL`
**Affected vision principle:** Pillar 1 ("difficulty comes from planning,
**interpretation**, time allocation, and ethical choices"); `02` ("the meaningful
challenge is choosing what to do, **what evidence to trust**, and what cost to
accept"); `07` causal-feedback rule ("After resolution, it separates observation
from interpretation").

**Exact evidence.**
`12`'s primary-record draft delivers every result as a fused pair — for example
`record.repairState.limited`: "Observation: the index tracks only one part of
recovery. **Interpretation: the association is incomplete and needs careful
wording.**" `record.damageRange.weak`: "Interpretation: do not turn absence of a
boundary into a boundary." `04` states analysis "creates an evidence card. It
records the research question, controls, available evidence views, evidence
quality, and **caveats**" — but no document specifies who chooses the caveats or
what choosing differently does. `07` names the inputs to evidence quality without
any mapping. `12`'s manuscript strings offer only three pre-written claim levels.

**Causal mechanism.**
The game does the scientific reasoning and then asks the player to select a
political register for it (careful / strong / inflated). The player's remaining
judgement is a wording decision, not an evidential one. Because the record
already tells the player "needs careful wording," the inflated option is
signposted as wrong rather than tempting — which weakens complicity as well as
interpretation.

**Likely player experience.**
Analysis becomes a confirm-to-collect step (1 period, 1 energy, +2 support
points) rather than the game's second core decision. The manuscript board then
arranges conclusions the game already reached. The most distinctive promise in
`02` — that laboratory play uses medium abstraction because the real challenge is
epistemic — is undelivered.

**Recommendation.**
Move interpretation to the player at the analysis step, using the evidence-card
caveat tags the design already owns, and make the downstream systems read those
selections.

**Smallest sufficient change.**
Four edits:

1. Split each primary-record string into `record.X.observation` (shipped) and
   remove the fused interpretation sentence. Word count is roughly neutral.
2. At `MR-ACT-ANALYSE`, present 2–4 authored caveat tags per record variant; the
   player selects the set that goes on the evidence card. One set is fully
   supported by the observation; the others overstate or understate.
3. Have the manuscript **requirements panel** (already specified in `07`) flag a
   mismatch between committed claim level and the caveats on the cards supporting
   it, and have the `PIIM` **claim-scope card** read that mismatch. Both objects
   already exist.
4. Define omitting a caveat as a distinct, lesser integrity action than omitting a
   whole card, priced below the current −10.

**Affected documents and systems.** `02` (feedback model), `04` (B05 evidence
contract, analysis), `07` (integrity scale, PIIM cards, causal feedback), `12`
(record strings, caveat strings, `MR-ACT-ANALYSE`), `13` (`MR-TEST-EXP-001`,
`MR-TEST-CONT-001` word count). Systems: evidence cards, requirements panel,
response-card evaluation, integrity.

**Risk created.** This adds a selection to an action performed 5–7 times per run.
If the caveat options are not sharply differentiated, it becomes the busywork the
vision forbids. It also increases the unique-word count against a 6,000-word cap
that `12` already describes as nearly met — roughly 3 tags × 18 result variants
is a real cost and may require trimming environmental text. Third risk: it makes
the player responsible for scientific judgement, which slightly raises the
knowledge floor the audience statement is trying to keep low; the tags must be
written in plain reasoning language, not domain vocabulary.

**Test / prototype.** Build the caveat step into the vertical slice's single
laser/sham analysis. Then check three things: whether a first-time player can
distinguish the supported tag set from the overstated one using only the
observation text; whether the choice still feels meaningful on a third repetition
(use the fallback's repeat path); and whether `MR-TEST-CONT-001`'s word count
still passes after the record split.

**Confidence.** High for the diagnosis — the fused strings and the unspecified
caveat authorship are explicit. Medium-high for the remedy, which is the largest
single change I am recommending and the one most in need of slice validation.

---

## 4. Significant issues

---

### S4.1 — The institution's obstruction is promised by four documents and catalogued nowhere

**Severity:** `SIGNIFICANT`
**Affected vision principle:** Pillar 2 ("surreal institution"); Pillar 6
(humour from responsive systems); the title's own subject — contradictory minor
demands.

**Evidence.** `02`, `04`, and `07` all specify authored equipment queues, faults,
and access limits with five stated player responses ("wait, negotiate, ask
Gabriel for help, use a limited alternative, or change the experiment plan").
`07` specifies a hybrid request system with **three optional desk request slots**
and ±5/±10 PI confidence per request, "selected by current state" from "small
authored sets." `12`'s authority table contains **no content family** for either,
and its ten `MR-TASK-*` items are almost all main-line. The only catalogued
obstruction instance in the entire corpus is `MR-OPT-GABRIEL-QUEUE`.

**Causal mechanism.** The content specification is authoritative and count-bound
(`MR-TEST-CONT-001` asserts "the full-game counts are 6, 7, 10, 20, 29, 12, and
30"). An uncounted family will not be built. The desk's three optional slots will
therefore be filled from the ten optional character scenes, which have windows
and expire — leaving the desk empty for much of the campaign.

**Likely experience.** The institution obstructs the player once (Gabriel, Weeks
1–4) and then stops. Bookings, faults, policy changes, and contradictory small
requests — the substance of the satire and the reason `06` gives every room a
booking screen, queue terminal, and notice rail — never materialise as play.

**Recommendation.** Add one counted content family of authored institutional
obstructions, priced to be cheap and fully cuttable in the fallback.

**Smallest sufficient change.** Add **six** `MR-OBS-*` objects (booking conflict,
instrument limitation, policy change, service delay, access restriction,
contradictory notice), each with a room, an act window, the five stated responses
mapped to existing action costs, one trust or time effect, and two strings. Add
the family to `12`'s authority table with a fallback count of two, and to
`MR-TEST-CONT-001`'s count assertion.

**Affected documents/systems.** `07` (request system), `12` (authority table, new
family, `MR-TEST-CONT-001`), `06` (room objects already support them), `13`
(`MR-TEST-WORLD-001`). Systems: request queue, safe-point scheduler, equipment
state.

**Risk.** Scope increase against a 6–8 h/week capacity. Mitigated by making the
family fully cuttable (fallback keeps two) and by reusing existing action IDs so
no new cost class appears. Second risk: obstruction events can become random
barriers, which `02` explicitly forbids; each must have a stated route forward.

**Test.** `MR-TEST-WORLD-001` fixture: assert at least one obstruction is
available in each of the five act states and that each offers ≥2 responses with
different costs.

**Confidence.** High.

---

### S4.2 — The evidence scale saturates, so three of its four tiers and both of its optional sources do no work

**Severity:** `SIGNIFICANT`
**Affected vision principle:** Pillar 1 ("survival through decisions");
"complexity that does not create a distinct player experience."

**Evidence.** `07`: maximum 12 support points; start at 3 (Developing); "A new
usable result with appropriate controls gives two points"; five required
templates. 3 + (5 × 2) = 13, capped at 12 = Substantial. `04` and `07` both
specify one repeat per eligible template with diminishing returns and an explicit
notice when a further repeat is pointless. `MR-EXP-DRUG-EXPOSURE` is optional and
`03` says it "can strengthen this route but is never required."

**Causal mechanism.** Competent completion of the mandatory experiment chain
reaches the top tier. Repeats, the drug template, and Samira's EV+1 therefore
have no evidential purpose on a successful run; they matter only as recovery from
limited or weak results. Aldercroft's "Coherent or Substantial evidence"
condition becomes nearly automatic for any player who does the required work.

**Likely experience.** A player who wants a strong paper discovers there is
nothing to push toward. The four packet labels compress into "did the required
work" versus "didn't," and the optional drug experiment reads as pure flavour
despite `03` and `04` presenting it as a strategic industry lever.

**Recommendation.** Re-price so that the required chain lands in Coherent and
Substantial requires at least one optional source.

**Smallest sufficient change.** Two figures: lower starting support from 3 to 2,
and specify that `MR-EXP-OXYGEN-LOSS` contributes to the `PIIM` oxygen response
card but not to support points (it is a reviewer requirement, not new evidence
for the original claim — which is also thematically accurate). Result:
2 + (4 × 2) = 10 = Coherent; Substantial requires drug work, a successful repeat,
or Samira's card.

**Affected documents/systems.** `07` (evidence scale, starting value),
`04` (B05 point rules), `08`/`07` (Aldercroft condition unchanged but harder),
`12` (`MR-EXP-OXYGEN-LOSS` completion effect). Systems: evidence support,
route readiness, `PIIM` cards.

**Risk.** Aldercroft becomes modestly harder, since one of its three conditions
now requires optional work. Acceptable — it needs only two of three — but it must
be checked against `07`'s claim that "A defensible route needs about 48–52
productive periods." Second risk: lowering the start to 2 puts the campaign in
Thin at Week 1, which may read as discouraging in `Clarified`'s aftermath; the
Research Status label wording should be checked.

**Test.** Vitest fixture set: required-chain-only run asserts Coherent;
required-chain-plus-drug asserts Substantial; required-chain-with-one-weak-result
asserts Developing and confirms a repeat can recover it.

**Confidence.** High on the arithmetic; medium on the specific re-pricing, which
the slice cannot validate and the fallback gate should.

---

### S4.3 — Two of five trust bars gate nothing, and the "bounded support action" promised for all five is never authored

**Severity:** `SIGNIFICANT`
**Affected vision principle:** `01` success criterion "A player can see how
important choices change the game state and later events"; "solidarity remains
meaningful."

**Evidence.** `05` and `07` both state: "At 61 or above, a character can offer
one bounded support action in the related scene." `12` contains **no support
action for any character**. Mechanically, Elena's bar gates Aldercroft (≥41),
Camila's gates Morrow (≥41), Gabriel's gates the pass-through (≥61); Haoran's and
Samira's bars gate nothing — Samira's benefits arrive through
`FLAG:samiraCoauthor` and EV+1, not her bar.

**Causal mechanism.** Five identically presented bars imply five equivalent
systems. Two are narrative-only. The one rule that would give every bar a
mechanical payoff — the ≥61 support action — exists as a promise in two documents
and as content in none, so it will not be implemented.

**Likely experience.** Players will invest in Elena, Camila, and Gabriel and
correctly conclude that Haoran and Samira are sentiment. That is the opposite of
"small acts of solidarity remain meaningful," and it makes the hierarchy of the
fiction (help flows up, not down) accidentally true at the mechanical level too.

**Recommendation.** Author the five support actions that the design already
promises.

**Smallest sufficient change.** Five bounded, once-per-campaign support actions
at ≥61, each reusing an existing cost and effect type: Haoran takes one
monitoring visit (saves 1 period); Samira contributes one evidence card (EV+1,
already precedented); Gabriel waives one obstruction or queue delay; Elena
answers one `PIIM` reviewer point (improves one response card by one step);
Camila provides one framing that strengthens the claim-scope card. Two strings
each.

**Affected documents/systems.** `05`, `07` (support-action rule made concrete),
`12` (five entries + strings, `MR-TEST-CHAR-001` links), `13`
(`MR-TEST-CHAR-001`). Systems: trust thresholds, request queue, response cards.

**Risk.** Haoran's and Gabriel's actions save periods, which loosens the
calendar; Elena's and Camila's touch the `PIIM` band and must not let a weak
response reach a band it did not earn — cap each at one step and forbid crossing
from "not met" to "met." Third risk: support actions could make high trust
strictly optimal, converting relationships into upgrades; keeping them
once-per-campaign and modest limits this.

**Test.** `MR-TEST-CHAR-001`: for each character, assert the action is offered at
61, not offered at 60, offered once only, and — for Elena and Camila — that it
cannot move a `PIIM` card from not met to met.

**Confidence.** High. The gap between the stated rule and the content catalogue
is explicit.

---

### S4.4 — Most of the satire is optional, one-shot, and competes with time pressure

**Severity:** `SIGNIFICANT`
**Affected vision principle:** Pillar 2 ("surreal institution"); Pillar 6.

**Evidence.** `12`: thirty `MR-ENV-*` items, each with "a one-time display rule,"
displayed "once on first inspection in its active window." `06` and `12`:
"Required information never depends on an inspectable environment item alone."
`06` caps visible change at "at most one major and two minor room changes" per
phase across the whole floor. Meanwhile `07` states there is no free catch-up
resource and route budgets consume 48–62 of ~59 usable periods.

**Causal mechanism.** The player under calendar pressure has no reason to inspect
optional objects, and the design guarantees they lose nothing by skipping them. A
substantial fraction of the game's identity is therefore opt-in flavour in a game
that penalises browsing with nothing but opportunity cost — which is enough.

**Likely experience.** An efficient player finishes a three-hour campaign having
read perhaps a third of the thirty items, and the institution's absurdity registers
mainly through Elena's dialogue and the journal rejections.

**Recommendation.** Convert a subset from inspectable to ambient, so the floor
speaks without being interrogated.

**Smallest sufficient change.** Designate ten of the thirty items as **ambient on
first safe room entry** (displayed as a brief non-blocking notice, no interaction,
no cost), keeping twenty inspectable. This uses `06`'s existing "change appears
only on safe room entry" rule and does not violate the no-required-information
boundary.

**Affected documents/systems.** `06` (environmental content boundary), `12`
(`MR-ENV-*` display rule), `10` (notice presentation must not cover captions or
confirmations), `13` (`MR-TEST-WORLD-001`).

**Risk.** Ambient notices intrude on first-person exploration and could read as
pop-up UI, which `10` and `06` both guard against. They must be diegetic
(a notice the camera passes, a screen state) rather than an overlay, and reduced
motion must suppress any animation.

**Test.** `MR-TEST-WORLD-001`: assert each ambient item fires once, only on safe
entry, never during a cutscene or equipment action, and never overlaps a required
confirmation.

**Confidence.** Medium-high. The mechanism is clear; the magnitude of the
skipping behaviour is inference from the period budget.

---

### S4.5 — Tone and accessibility are validated after the last gate that could act on the result

**Severity:** `SIGNIFICANT`
**Affected vision principle:** the entire experience promise; `01`'s eight
success criteria.

**Evidence.** `13`'s vertical-slice completion check has six items — automated
checks, one Standard run, a monitoring fixture, comprehension of objective/costs/
views/choices/save, absence of blockers, and slice coherence. None concerns
humour, discomfort, or academic-knowledge independence. The eight experience
criteria (including "The first part can make the player laugh" and "the main
objective is understandable without academic knowledge") appear only under
"Before a release candidate," which `14` places in Phase 5 — after the Phase 3
fallback gate and Phase 4 full build. `15` maps `MR-REQ-VISION-001` only to
`MR-TEST-CONT-001`, which tests no tonal property. `13` also forbids external
players, so no outside reader will ever assess criterion 1.

**Causal mechanism.** `14`'s stop and reframe rules are keyed to phase gates. If
no gate tests tone, tone cannot trigger a reframe. The project's most subjective
and most vision-critical properties are checked when the content is already
written.

**Likely experience.** Not a player-facing issue directly, but the most likely
route by which a well-executed build misses the vision without anyone noticing in
time.

**Recommendation.** Move the three testable-at-slice criteria into the
vertical-slice gate.

**Smallest sufficient change.** Add criteria 1, 2, and 4 from `01`'s list
("objective understandable without academic knowledge," "each main experiment has
an understandable purpose," "the first part can make the player laugh") as items
7–9 of `13`'s vertical-slice check. Within `13`'s no-participant boundary, add one
artifact-based proxy for criterion 1: the Week-1 player-facing strings are read in
isolation, without design documents, and the objective must be reconstructible
from them alone.

**Affected documents/systems.** `13` (slice gate, full-game gate), `14` (phase
gate wording), `15` (`MR-REQ-VISION-001` test link).

**Risk.** A subjective item can stall the slice gate indefinitely, and `13`
requires that "The slice does not pass if any item is needs rework." Criterion 4
in particular is unfalsifiable by one evaluator who wrote the jokes. This is a
genuine limit of the approved no-external-testing boundary and the change reduces
rather than eliminates it.

**Test.** The change _is_ a test. Its own validation is whether the slice gate
produces at least one recorded change request on tonal grounds; if it never does,
the item is decorative.

**Confidence.** High on the structural gap; low on whether the proxy meaningfully
substitutes for an outside reader.

---

### S4.6 — Supported profile alters the dominant loop, not only tolerance

**Severity:** `SIGNIFICANT`
**Affected vision principle:** `02`/`07` ("Both profiles have the same calendar,
narrative, routes, and endings… Supported has no stigma or content penalty");
`01` audience breadth.

**Evidence.** Standard: 4 starting segments, +1 energy for night/after-hours
focused or intense work, first weekly break restores 2 and later breaks restore

1. Supported: 5 segments, no night surcharge, every break restores 3. `07`
   states productive-period budgets (48–52 / 52–56 / 58–62) **only for Standard**,
   with no Supported equivalent.

**Causal mechanism.** Stage-1 arithmetic identifies break scheduling as the
game's dominant recurring constraint. Supported reduces break frequency by
roughly half while removing the night-work energy dilemma. The narrative content
is identical, but the _pressure structure_ — which `02` calls "the intended
survival-game profile" — is materially different, and no budget exists to confirm
the profile is tuned rather than merely loosened.

**Likely experience.** A Supported player experiences a more comfortable game
that reaches the same endings — which is the point — but may also miss the
central felt argument that work capacity is finite. `01` wants the game to be
playable without academic knowledge, not to be optionally about something else.

**Recommendation.** Tune Supported explicitly rather than asserting equivalence.

**Smallest sufficient change.** Add a Supported-profile productive-period budget
to `07` alongside the three Standard figures, and state which single concession
carries the tolerance (candidate: five starting segments plus break restoration
of 3, with the night surcharge retained, so the trust-versus-time dilemma
survives in both profiles).

**Affected documents/systems.** `02`, `07` (profiles), `10` (`ui.profile.supported`
wording), `13` (`MR-TEST-EXP-001` fatigue fixtures per profile).

**Risk.** Retaining the night surcharge in Supported reduces tolerance for
players who need it most, which cuts against the accessibility intent. The budget
figure must be established before deciding which concession to keep; this
recommendation is a decision to measure, not a decision to tighten.

**Test.** Two Vitest fixtures running an identical decision script under each
profile, reporting periods spent on breaks and total productive periods. If
Supported's productive periods exceed Standard's by more than the intended
tolerance margin, the profile is loosened rather than tuned.

**Confidence.** Medium-high.

---

## 5. Optional opportunities

**O1 — End of Contract cannot distinguish principled withdrawal from collapse.**
`07`/`08`: public-record withdrawal closes both routes and produces **End of
Contract**; so does simply having no route left. `12` gives one career module
(`ending.career.none`) and one paper module (`ending.paper.rejected`) covering
both. A player who deliberately retracts work they no longer trust — arguably the
most ethically serious act available — receives the same ending as a player who
ran out of everything. Smallest change: add one variant of
`ending.career.none` or `ending.paper.rejected` keyed to `FLAG:publicWithdrawal`.
Two strings. Risk: none material; it does not create a new ending label, which
`08` fixes at four. Confidence: high.

**O2 — A fully honest player cannot complete the citation set.** `12` states "No
citation requires an unethical choice," yet `MR-CIT-08` fires on responding to a
colleague's concern, and both trigger scenes require a visible record mismatch or
an authorship state supporting concern. Smallest change: add the alternative
defensible trigger that `12`'s own rule requires — responding to a colleague's
correct concern about a limitation the player reported honestly. One string plus
a condition. Confidence: medium-high.

**O3 — Reviewer reports are static while records have three variants.**
`03` says reviewer "wording and examples respond to visible evidence quality,"
but `12` gives each reviewer a single body string. The three reports are among the
most-reread objects in the game and the crux of the `PIIM` act. Smallest change:
one variant each keyed to packet label or claim level — three strings. Risk: word
budget. Confidence: high on the gap, medium on its importance.

**O4 — The pre-Week-16 exit is the cheapest available emotional throughline and
is used once.** `06`: "Before Week 16, the exit interaction gives one dry internal
response." The exit is simultaneously specified as becoming more inviting from
Week 8 for every player (`06`, `09`) and given a single static line. Smallest
change: index the response to the five act states — five strings — so the pull
toward leaving is voiced by the protagonist rather than only lit by the level.
Serves pillar 4 at near-zero cost. Confidence: high.

**O5 — `FLAG:openingCaution` is set and never read.** `12`
`MR-SCN-CLARIFIED` choice B sets it; nothing in the corpus references it again.
Either give it one downstream reference (a natural candidate is the low-evidence
variant selection in `A Complete Narrative`) or remove it, since `13`'s content
scan will flag orphaned state. Confidence: high.

---

## 6. Underspecified implementation decisions

These will cause divergence between the documents and the build, or will cause
an implementer to invent a mechanic. Ordered by divergence risk.

|   # | Undefined decision                                                                                                                                                                                                                                                                                                                                             | Divergence risk                                                                                                              | Where it must land                         |
| --: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
|   1 | **Configuration → outcome band mapping.** `07` names the inputs (configuration, equipment state, monitoring, fatigue, quality choices) and the three band probabilities but no weighting, threshold, or worked example. The three preparation choices (goal, control quality, observation focus) plus one family-specific choice have no stated effect at all. | Very high — this is the primary moment-to-moment decision in the core loop. Two implementers will build two different games. | `04` B04/B05, `07` outcome-band contract   |
|   2 | **Evidence-quality resolution and the meaning of "suspicious."** Four states responding to six factors, with no rule. "Suspicious" is never defined anywhere in the corpus.                                                                                                                                                                                    | Very high — it feeds the `PIIM` cards and the integrity system.                                                              | `04` B05, `07`                             |
|   3 | **`PIIM` response-card scoring.** Three cards × three states feed four bands, but nothing states what evidence meets, partly meets, or fails a card, or how claim scope is scored against the committed claim level.                                                                                                                                           | High — determines Week 15 for every run.                                                                                     | `07` PIIM band, `08` B05 response contract |
|   4 | **"Serious evidence concern visible to Aldercroft or Elena."** An Aldercroft gate condition with no definition of which flags are visible to an external committee. Interacts directly with C3, since it is the only guard against inflation buying Aldercroft.                                                                                                | High                                                                                                                         | `07`, `08`                                 |
|   5 | **Monitoring window count, distribution, and penalty magnitude.** Windows exist, are announced, persist, and can be missed with a warning; nothing states how many per experiment or what missing one costs.                                                                                                                                                   | High — sets the travel cadence and therefore the felt pacing.                                                                | `04`, `07`                                 |
|   6 | **Protected break has no action ID, cost row, text key, or content object**, despite being structurally mandatory.                                                                                                                                                                                                                                             | High — an implementer will invent it.                                                                                        | `02` cost table, `12` action catalogue     |
|   7 | **Sample health/history and equipment condition.** Both are named outcome inputs and both appear in `CampaignState` (`11`); neither has a scale, a degradation rule, an observation channel, or a recovery cost, though `02` prices "sample or equipment recovery" as intense-class work.                                                                      | Medium-high                                                                                                                  | `04`, `07`, `11`                           |
|   8 | **Fatigue's effect on results.** Listed as an evidence-quality input with no threshold or magnitude; unclear whether it degrades continuously or only at zero.                                                                                                                                                                                                 | Medium-high                                                                                                                  | `07`                                       |
|   9 | **Research Status reason strings and pre-action forecast strings.** `07` mandates a stated reason for every material change and a plain-language forecast before every meaningful action; `12` supplies one generic route string and no forecast text — inside a word cap `12` says is nearly met.                                                             | Medium-high — a required feature with no content and no budget.                                                              | `12`, `07`                                 |
|  10 | **Optional PI request pool.** `07` specifies three optional desk slots filled from authored conditional sets; `12` catalogues none. (See S4.1.)                                                                                                                                                                                                                | Medium-high                                                                                                                  | `12`                                       |
|  11 | **Manuscript board interaction rules.** Card types are enumerated and commits create snapshots, but how cards connect, what the requirements panel checks, and how many commits a campaign expects are unspecified. `MR-ACT-MANUSCRIPT-COMMIT` is one ID covering an unbounded number of events.                                                               | Medium-high                                                                                                                  | `07` manuscript system, `12`               |
|  12 | **Camila's video-call presentation.** She gates an entire ending and has an eight-sound palette including a "call-end tone," yet `05` and `09` forbid a Camila model or in-person appearance. No document states how the call is presented.                                                                                                                    | Medium                                                                                                                       | `05`, `09`, `10`                           |
|  13 | **Sample-group supply.** The player "selects" a labelled group; the pool, its limits, and the effect of losing a group are unstated, though `04` says a cancelled group is lost.                                                                                                                                                                               | Medium                                                                                                                       | `04`, `07`                                 |
|  14 | **Non-interactive scene time has three conflicting approved values.** `decision-log` (2026-08-26, never superseded): 15–20 minutes. `02`/`03`: 14–18 minutes. `12`: exactly 14:45 + 75 s. The content spec is below the decision log's floor.                                                                                                                  | Medium — a documentation contradiction that `AGENTS.md` forbids resolving silently.                                          | `decision-log`, `02`, `03`, `12`           |
|  15 | **Word-count measurement scope.** The 6,000-unique-word cap applies to the generated `strings.en.json`, but items 9, 10, C5, S4.1, and S4.3 all add required strings, and it is unstated whether fallback-excluded content is removed from the file or merely unreferenced.                                                                                    | Medium                                                                                                                       | `12`, `13`                                 |

---

## 7. Cross-system changes with the highest value

Ranked by vision impact per unit of production cost. Each uses objects the design
already owns.

**7.1 Player-committed interpretation at analysis (C5).**
Touches the most systems for the least new machinery: evidence cards already have
caveat tags; the requirements panel already exists; the `PIIM` claim-scope card
already exists. It converts analysis from a collection step into the game's second
core decision, gives pillar 1's "interpretation" clause an object, makes the
inflated claim _tempting_ rather than signposted, and creates a graduated
integrity action (omitting a caveat) below the current cliff at −10.
Simultaneously fixes underspecified items 2 and 3 by forcing a definition of what
a card "meets."

**7.2 Time cost for a misrepresented record (C3).**
The single highest-leverage rule change in the report. It connects integrity to
the calendar and energy — the game's scarce resources — without making integrity
a route gate, without adding detection, and without breaking the thesis that
fabrication can publish. It also produces the funniest available consequence:
dishonesty generates paperwork.

**7.3 Morrow's evidence-judgement condition (C2).**
Two clauses reconnect the career-route system to the core loop, remove the
minimum-effort dominant strategy, and make Camila's stated values
(`optional.camila.video.close`: "Clear limits are not a weakness") mechanically
true rather than merely spoken.

**7.4 The five bounded support actions (S4.3).**
Fulfils an existing two-document promise, gives Haoran's and Samira's bars
mechanical existence, and creates the only place where trust converts into time
or evidence — which is what makes "solidarity remains meaningful" survive contact
with a 64-period budget.

**7.5 Comic surface on the two highest-frequency actions plus the monitoring-window
constraint (C4).**
Ten strings and one rule. The cheapest available defence of pillar 6, and the only
recommendation here that directly addresses the middle two hours of play.

**7.6 Fallback discovery variant plus `MR-CIT-08` widening (C1).**
Protects the emotional arc in the version most likely to ship, and resolves two
live contradictions with `12`'s own rules and `13`'s test requirements.

---

## 8. Prototype or evaluation questions

All are answerable inside the approved Week-1 vertical slice, the fallback gate,
or Vitest fixtures. None requires external participants.

**Slice-answerable (Phase 2):**

1. **Real time per work period.** Instrument the slice. This is the only way to
   validate the three-hour target, which no document derives. If a period plus
   travel and confirmation runs materially above ~3 minutes, the 48–62-period
   budgets and the three-hour promise are incompatible.
2. **Does the caveat-selection step read as judgement or as busywork?** Present
   the laser/sham record's observation without an interpretation and check whether
   a reader can identify the supported caveat set. Repeat on the third exposure
   using the repeat path.
3. **How many monitoring visits present no decision?** Count them. If more than a
   small minority, C4's third edit is required rather than optional.
4. **Do the break and queue flavour lines produce the intended tonal effect?**
   Run the slice with and without them. This is the only tonal A/B the corpus
   permits.
5. **Can the Week-1 objective be reconstructed from player-facing strings alone,
   with no design documents in view?** The proxy for `01`'s criterion 1 under
   `13`'s no-participant boundary.
6. **Is the outcome band legible?** After the slice's single experiment, can the
   player state which of their preparation choices affected the result? If not,
   underspecified item 1 must be resolved before Phase 3, because pillar 1's
   causal-learning promise fails silently.

**Fixture-answerable (Phase 1–2, Vitest):**

7. **Minimum-effort route audit.** A campaign that completes no experiment: assert
   which routes are available at Week 16 under current rules and under C2's
   revised gate.
8. **Honest-versus-dishonest period budget.** Two identical decision scripts,
   one careful and one altering, compared on available productive periods at
   Week 14. Sets C3's maintenance cadence.
9. **Evidence saturation check.** Required-chain-only run: assert the resulting
   packet label under current pricing and under S4.2's revision.
10. **Fallback citation reachability.** Run the fallback content set with each
    integrity flag state and assert all twelve citations are reachable across the
    minimum number of campaigns.

**Fallback-gate-answerable (Phase 3):**

11. **Does the middle act escalate or repeat?** Play the 90-minute fallback and
    record, per act, how many decisions were materially different from the
    previous act's decisions. This is the only direct test of `07`'s "escalation,
    not repetitive grinding" principle.
12. **Does complicity land without a discovery scene?** Run the fallback
    dishonestly with and without C1's Samira variant and compare the recorded
    experience against arc stage 3.

---

## 9. Prioritized recommendation table

| Pri. | ID   | Issue                                                               | Severity    | Smallest sufficient change                                                                                                                   | Cost                                   | Vision impact                                                                     | Conf.                        |
| ---: | ---- | ------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------- |
|    1 | C3   | Integrity inert; inflation is the cheapest route currency           | CRITICAL    | One record-consistency task per remaining act on `alteredReading`/`fabrication`; make the Inflated → claim-scope-not-met rule explicit       | 1 task ID, ~3 strings, 2 rule edits    | Restores ethics as a difficulty axis without breaking the "can publish" thesis    | High                         |
|    2 | C2   | Minimum-effort play yields Morrow                                   | CRITICAL    | Replace "at least Developing" with "≥3 analysed primary records, ≥1 honest limited/weak result"; add one cost line to `ending.career.morrow` | 2 clause edits, 1 string               | Removes the dominant strategy; makes industry a trade-off rather than an escape   | High                         |
|    3 | C1   | Fallback deletes complicity's social layer; `MR-CIT-08` unreachable | CRITICAL    | Conditional variant on `MR-OPT-SAMIRA-NOT-IN-MY-FIGURE`; widen `MR-CIT-08` to "a colleague"                                                  | 1 variant (~5 strings), 1 trigger edit | Protects the emotional arc in the likely shipped build; resolves 2 contradictions | High                         |
|    4 | C5   | Records arrive pre-interpreted                                      | CRITICAL    | Split observation from interpretation; player selects caveat tags at analysis; requirements panel and claim-scope card read them             | ~3 tags × 18 variants; 4 rule edits    | Gives pillar 1's interpretation clause an object; makes inflation tempting        | High diag. / Med-high remedy |
|    5 | C4   | Mid-game is administrative; comedy absent from repeated actions     | CRITICAL    | Catalogue `MR-ACT-BREAK` with 5 act-indexed lines; 5 act-indexed queue lines; require ≥2 options per monitoring window                       | 10 strings, 1 action ID, 1 rule        | Cheapest defence of pillar 6 across the game's longest stretch                    | High struct. / Med magnitude |
|    6 | S4.3 | Two trust bars gate nothing; promised support actions unauthored    | SIGNIFICANT | Author the five ≥61 bounded support actions                                                                                                  | 5 entries, ~10 strings                 | Makes all five relationships mechanically real                                    | High                         |
|    7 | S4.1 | Institutional obstruction promised but uncatalogued                 | SIGNIFICANT | Add 6 `MR-OBS-*` objects (fallback keeps 2) to the counted families                                                                          | 6 objects, ~12 strings                 | Restores the institution as an active system, not a backdrop                      | High                         |
|    8 | S4.2 | Evidence saturates; optional sources do no work                     | SIGNIFICANT | Start at 2; oxygen-loss feeds the `PIIM` card, not support points                                                                            | 2 figures                              | Makes four packet tiers and optional work meaningful                              | High arith. / Med pricing    |
|    9 | S4.5 | Tone validated after the last reframing gate                        | SIGNIFICANT | Move `01` criteria 1, 2, 4 into the slice gate; add the strings-only comprehension proxy                                                     | 3 gate items                           | Only mechanism by which a tonal miss can be caught in time                        | High gap / Low proxy         |
|   10 | S4.4 | Satire is optional, one-shot, skippable                             | SIGNIFICANT | Make 10 of 30 `MR-ENV-*` items ambient on first safe room entry                                                                              | 1 rule edit                            | Lets the floor speak without interrogation                                        | Med-high                     |
|   11 | S4.6 | Supported profile alters the dominant loop                          | SIGNIFICANT | Add a Supported productive-period budget to `07`; then decide which concession carries tolerance                                             | 1 measurement, 1 figure                | Keeps the profile a tolerance setting rather than a different argument            | Med-high                     |
|   12 | O1   | End of Contract conflates principled withdrawal with collapse       | OPTIONAL    | One ending variant keyed to `FLAG:publicWithdrawal`                                                                                          | 2 strings                              | Preserves the meaning of the game's boldest choice                                | High                         |
|   13 | O4   | Pre-W16 exit voiced once                                            | OPTIONAL    | Index the exit response to the five act states                                                                                               | 5 strings                              | Cheapest emotional throughline for pillar 4                                       | High                         |
|   14 | O2   | Honest player cannot complete the citation set                      | OPTIONAL    | Add the defensible alternative trigger `12`'s own rule requires                                                                              | 1 string, 1 condition                  | Removes a self-contradiction                                                      | Med-high                     |
|   15 | O3   | Reviewer reports static                                             | OPTIONAL    | One variant each keyed to packet or claim                                                                                                    | 3 strings                              | Sharpens the `PIIM` act's central objects                                         | Med                          |
|   16 | O5   | `FLAG:openingCaution` orphaned                                      | OPTIONAL    | Reference it in `A Complete Narrative` variant selection, or remove                                                                          | 1 edit                                 | Prevents a content-scan failure                                                   | High                         |

Items 1–5 should be resolved before Phase 1 begins, because each changes a rule
that `MR-WP-01` (rules and content schema) will encode. Items 6–8 and 10 should be
resolved before `MR-WP-08` (campaign content integration), since they change
counted content families that `MR-TEST-CONT-001` asserts. Item 9 must be resolved
before the Phase 2 gate is run, or it cannot apply. Items 12–16 can land at any
point before the release-candidate gate.
