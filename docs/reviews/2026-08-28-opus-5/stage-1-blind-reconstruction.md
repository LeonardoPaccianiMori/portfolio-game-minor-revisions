# 1. Corpus confirmation

Supplied files, each read completely:

| File                                    | Status                                     |
| --------------------------------------- | ------------------------------------------ |
| `docs/02-player-experience-and-loop.md` | Read completely. Substantive, untruncated. |
| `docs/03-narrative-and-campaign.md`     | Read completely. Substantive, untruncated. |
| `docs/04-science-and-experiments.md`    | Read completely. Substantive, untruncated. |
| `docs/05-characters-and-dialogue.md`    | Read completely. Substantive, untruncated. |
| `docs/06-world-and-level-design.md`     | Read completely. Substantive, untruncated. |
| `docs/07-systems-and-balance.md`        | Read completely. Substantive, untruncated. |
| `docs/08-endings-and-state-matrix.md`   | Read completely. Substantive, untruncated. |
| `docs/09-art-audio-and-assets.md`       | Read completely. Substantive, untruncated. |
| `docs/10-ui-ux-accessibility.md`        | Read completely. Substantive, untruncated. |
| `docs/11-technical-architecture.md`     | Read completely. Substantive, untruncated. |
| `docs/12-content-specification.md`      | Read completely. Substantive, untruncated. |

Notes on corpus boundaries (not blocking): the numbering implies missing
documents `01`, `13` (`13-testing-and-evaluation.md`), `14`, and
`15-implementation-contract.md`, all of which are referenced by supplied files.
`assets/ASSET_MANIFEST.md` is referenced but not supplied. No supplied file is
empty, truncated, or unreadable, so I proceed. All references to those absent
documents are treated as unverifiable pointers, and I flag them in §11.

---

# 2. Reconstructed game (300–500 words)

_Minor Revisions_ is a first-person, single-player, browser-based narrative
management game about the last sixteen weeks of a fixed-term postdoctoral
contract. The player is a lightly authored developmental biologist (player-chosen
name and pronouns) on one ~400 m² university research floor at fictional
Bellwether University, working on a lab-grown cardiac tissue model that appears
to enter a temporary "repair state" after limited damage. The scientific finding
is real inside the fiction; the antagonist is the institution's expanding
definition of "enough evidence."

Structurally it is a resource-constrained, calendar-locked campaign. The semester
is 64 discrete work periods (early, late, night, after-hours × 16 weeks). Walking,
reading, and talking are free; committing to work costs 1–3 periods and 0–2 energy
segments from a five-segment bar. Seven mandatory story scenes occur in fixed
weeks in every run; they cannot be delayed by unfinished work. Failure is
absorbed rather than punished: at a gate, weak work opens a stated lower-evidence
route, and there is no game-over before Week 16.

The play loop is a five-stage asynchronous experiment cycle (select sample group,
configure, start, monitor at the physical station, analyse into an evidence card),
with at most three concurrent sample groups, run against six authored experiment
templates. Preparation quality sets an outcome band; a stored campaign seed picks
only within it, so reloading cannot reroll. Results resolve as two separate
layers: biological result and evidence quality, read through three abstract views
(structure, rhythm, repatterning index).

The second half is a manuscript card board rather than a text editor. The player
arranges evidence, figures, claims, controls, and authorship cards, and chooses a
claim level — careful, strong, or inflated — under contradictory pressure from
Professor Elena Markovic. A fixed submission ladder (The Common Archive preprint,
_Cosmos_, _Knowledge_, _Developmental Systems Letters_, then `PIIM`) leads to one
major-revision round with three conflicting reviewers and three response cards.
The player may report honestly, omit, alter, or invent — as explicit, confirmed
narrative actions, never as a simulated forgery minigame.

Four numeric systems run in parallel: evidence support (0–12), PI confidence
(0–100), research integrity (0–100 plus permanent flags), and five 0–100 working
trust bars (Elena, Haoran, Samira, Gabriel, Camila). These gate two career routes:
an Aldercroft interview and a Morrow Biotech industry offer. At 06:42 in Week 16
the player walks the dark floor to the exit and picks an available route, leaves
deliberately, or leaves because nothing remains. A modular 60–90-second epilogue
assembles career scene, paper aftershock, one relationship afterbeat, integrity
treatment, and fatigue treatment, then an ending card with twelve satirical
"Institutional Citations" persisting in a local Archive.

Target length is roughly three hours, entirely local, English-only, no accounts.

---

# 3. Core fantasy and likely player relationship

## Core fantasy

**Explicit / high confidence.** The fantasy is _not_ scientific discovery or
mastery of laboratory technique. `04-science-and-experiments.md` states "The
player does not discover a real laboratory protocol" (via `02`), forbids
operational quantities, and abstracts timing into "same shift, next day, several
days." The fantasy offered is **occupational and moral**: being the competent,
tired person who must decide what evidence deserves to be claimed, whose credit
gets recorded, and what the work is worth relative to a life.

More precisely, three overlapping fantasies:

1. **Legible authorship of a compromise.** (`interpretation`, high) The player is
   promised that consequences are readable — Research Status "explains visible
   changes without showing hidden formulas" (`12`, `tutorial.status`), every
   material change gives "a short stated reason" (`07`) — while the world is
   deliberately illegible in its demands. The fantasy is understanding your own
   descent even when you cannot control it.
2. **Survival as achievement.** (`explicit`, high) `02` calls Standard "the
   intended survival-game profile." Reaching Week 16 with a defensible record and
   intact relationships is the aspirational outcome; reaching Week 16 at all is
   guaranteed.
3. **Refusal as a real option.** (`explicit`, high) **Out of Scope** — deliberate
   departure with routes still available — is an equal ending, "not a hidden best
   ending" (`03`, `08`).

## Player relationship

**The game as honest institution.** (`interpretation`, high) Every design
decision points the same way: the game itself behaves with the integrity the
fictional university lacks. It shows time and energy cost _before_ commitment
(`02`, `10`), never interrupts an active experiment with a message (`02`, `03`,
`07`), never lets browser closure advance time (`10`, `11`), never allows a
missed monitoring window without a clear warning, and states expiries "rather
than silently removing" them (`07`). Elena reinterprets, forgets, and reframes;
the software never does. This is the central relational move of the design: the
player is squeezed by the fiction and protected by the system.

**The game as record-keeper rather than judge.** (`explicit`, high) "The game
does not show a moral score" (`05`); integrity warnings are "factual and do not
give a moral label" (`07`); citation MR-CIT-07 (Selective Transparency
Distinction) fires for correction _or_ omission _or_ alteration _or_ fabrication
and "the archive retains no moral rank" (`12`). The game watches, records
permanently (`FLAG:` flags survive trust recovery), and declines to condemn.

**The game as a thing that will not let you win by grinding.** (`implied`, high)
Repeats have diminishing returns and the game tells you when another repeat is
pointless (`04`, `07`); "There is no free emergency catch-up resource" (`02`,
`07`); "No universally optimal schedule should trivialize the campaign" (`07`).

---

# 4. Inferred design pillars

Ordered by evidentiary weight. None is stated as a pillar in the supplied files;
all are reconstructed.

**P1. The calendar is sovereign; only quality is negotiable.**
`explicit`, high. `03` campaign invariants: "The fixed weekly gates do not wait
for unfinished work"; "All seven mandatory scenes occur once in every run. State
changes their content, not their place in the calendar." `07`: "Weak work changes
the available paper path, not the calendar." This inverts the usual management-game
bargain — you cannot buy time with effort, only outcomes with time.

**P2. Failure is informational, never terminal.**
`explicit`, high. `02`: "Failure should normally reveal information, force a
trade-off, alter a relationship, or advance the narrative rather than only erase
progress." `07`: "The campaign never gives a global game-over screen before Week
16." Even the crash — the harshest punishment — restores energy and yields a
consequence rather than a reset.

**P3. Every cost is disclosed; no hidden formula, no hidden dice.**
`explicit`, high. Pre-commitment cost display (`02`, `07`, `10`); the "short
plain-language forecast of the likely trade-off" (`02`, `07`); seed locked at
experiment start so "Reloading or closing the game cannot reroll it" (`07`,
`11`); Research Status shows no "hidden formulas, raw flags, or a completion
percentage" (`07`).

**P4. Integrity is a set of authored decisions, not a simulation or a meter to
optimise.**
`explicit`, high. "The game provides no practical method for falsification"
(`03`, `04`, `07`, `12`). Integrity choices appear as three labelled options in
`MR-SCN-A-REASONABLE-RESPONSE` with fixed costs (I-10 / I-25 / I-45). `07`:
"Integrity must not be a simplistic morality meter that always maximizes all
outcomes."

**P5. One dense, continuous, walkable place that changes meaning rather than
shape.**
`explicit`, high. `06`: "academic terrarium," one continuous scene, no loading
screens, no room locks, five persistent act states that "alter room function and
story meaning, not the room plan."

**P6. Bounded, authored, countable content — no generation, no procedural
padding.**
`explicit`, high. `12` fixes exact counts (6/7/10/20/29/12/30) and a 6,000-word
ceiling; `11` forbids the rules module from assembling sentences or using a
language model; `05` forbids "unbounded contextual barks."

**P7. Accessibility and player dignity are non-negotiable and route-neutral.**
`explicit`, high. Supported profile keeps identical narrative and endings and
"has no stigma or content penalty" (`02`, `07`); graphics presets "never change
rules, route access, information, accessibility content, or outcomes" (`09`,
`11`); dual-channel information everywhere; no drag, hold, timed, or precision
input anywhere (`04`, `10`).

**P8. Consequence permanence over reversibility.**
`explicit`, high. One active save, safe-point-only saves, no chapter rewind, no
snapshot undo after commit (`07`, `08`, `10`, `11`); permanent flags outlive
recovered trust bars (`05`, `07`).

---

# 5. Emotional, tonal, aesthetic, and pacing arc

## Tone and humour

**Bureaucratic euphemism as the comic engine.** `explicit`, high. `05`: "Bitter
comedy should arise from plausible language, euphemism, contradiction, and
self-justification." The drafted text confirms the register precisely — Form 18B
asks "permission to treat a temporary arrangement as temporary"
(`env.bureaucracy.01`); the wellness notice recommends a pause "after submitting
the form that records why you could not pause" (`env.bureaucracy.05`); _Knowledge_
declines because "direct proof has not yet agreed to exist"
(`record.knowledge.body`). The joke is always institutional language colliding
with material reality. Nobody is a buffoon.

**Load-bearing dryness of the protagonist's internal voice.** `explicit`, high.
`05` specifies observant, dry, controlled, sharper inside than outside, more tired
and direct as pressure rises, and explicitly warns against "a constant stream of
jokes." Drafted lines match: "The tissue should not be doing that. It has had a
long night and no grant deadline" (`scene.clarified.internal.opening`); "A few
supplementary pieces is a phrase with a flexible skeleton"
(`scene.clarified.internal.close`).

**Satire that refuses villains.** `explicit`, high. `05`: Elena is "not a simple
villain," "can be a mentor, a source of harm, or both"; the industry contact
"cannot become a flawless rescuer." `MR-OPT-ELENA-FUTURE` "reveals pressure
without excusing harm" (`12`). `12` prohibits mocking "nationality, disability,
precarious workers, or scientific ignorance" — the satire is aimed strictly
upward at systems.

## Aesthetic identity

**Stylized institutional realism; the mundane made slightly wrong.** `explicit`,
high. `09` bans cyberpunk, retro-futurism, glossy sci-fi, photorealism, distorted
architecture, giant props, cartoon slapstick, body horror, glitch horror, gore,
and flashes. Palette: warm paper beige, cool blue-grey, institutional green,
charcoal, plus soft amber (PI warmth), coral-pink (living organoids), cyan/teal
(data), amber (attention), muted red (serious faults only). The two visual
anomalies are deliberate and thematic: the cardiac model and its data displays
are "the only visibly advanced parts of the world," and the PI office is
"mysteriously warmer and better lit than the rest of the floor" (`06`).

**Audio as quiet, non-hostile presence.** `explicit`, high. Six modular music
stems that "become colder and thinner later in the semester"; routine play has no
constant score; the mix "must avoid hostile alarms, constant noise, or horror
music" (`09`). No voice acting; five eight-sound non-lexical vocal palettes; the
protagonist never speaks aloud, preserving projection after name/pronoun choice.

## The intended emotional arc

`implied`/`interpretation`, high, from the `03` beat sheet, `06` act states, `07`
period-budget estimates, and `09` lighting/music progression:

| Weeks | Act                | Designed feeling                                                                                                                                                                                                                  |
| ----- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1–4   | Supplementary data | Competence and mild pride. The result is real. Requests seem finite. Facility friction and colleague needs appear as manageable texture. Floor is "orderly but overbooked."                                                       |
| 5–7   | Manuscript hell    | Vertigo and absurdity. Elena permits writing regardless of packet quality, then contradicts herself; **What We Had** returns the paper "close to its original careful version." Light turns colder; revision clutter accumulates. |
| 8–9   | Submission         | Exposure, then serial deflation. Preprint becomes public in every run; three rejections arrive; Camila's email offers an exit. The exit light starts becoming inviting for everyone.                                              |
| 10–14 | Competing futures  | Grinding pressure and moral squeeze. Three contradictory reviewers, mandatory oxygen-loss work, an unmeetable "address all concerns" instruction, and the explicit integrity fork in Week 14.                                     |
| 15–16 | Decision           | Emptiness and quiet agency. Emptier rooms, cleared desks, most inviting exit. 06:42 returns; the choice is small, personal, and unrewarded by the institution.                                                                    |

**Cyclical rather than climactic closure.** `explicit`, high. The semester starts
and ends at 06:42 (`03` invariant; `scene.0642.internal.opening`: "The clock says
06:42 again. The building has kept excellent records of my presence."). The 60–90
second epilogue then denies resolution on purpose — publication produces an
immediate new demand (`ending.paper.published`), acceptance produces an afternoon
of administration, Aldercroft produces "another committee" (`ending.career.academia`).

## Pacing and repetition philosophy

**Asynchrony converts waiting into pressure.** `explicit`, high. `02`:
"Experiments run asynchronously; waiting creates competing decisions rather than
dead time." Up to three groups, monitoring windows at physical stations, and free
walking mean the loop is a scheduling problem, not a queue.

**Repetition is re-contextualisation, not content reuse.** `explicit`, high. `06`
frames the floor as "dense enough for repeated spaces to acquire new narrative
meaning," with strict change budgets — "at most one major and two minor room
changes" per phase across the whole floor, appearing only "on safe room entry,
never as a visible pop-in."

**Anti-grind guardrails throughout.** `explicit`, high. One repeat per eligible
template (`04`, `12`); diminishing returns with explicit notice; desk capped at
two required + three optional requests (`02`, `07`); three active sample slots;
"Approximately three hours should contain escalation, not repetitive grinding"
(`07`).

---

# 6. System-interaction analysis

## 6.1 64 periods, action costs, energy, crash, fixed gates

**The arithmetic is deliberately tight and the design says so.** `explicit`, high.
`07` gives 64 total periods against route budgets: defensible ≈48–52 productive
periods, normal-with-repeat ≈52–56, high-evidence path 58–62. So the slack is
roughly 12–16 periods for a defensible run and 2–6 for a maximal one.

**Energy is the real limiter, not periods.** `implied`, high. Cross-multiplying
`02`'s cost table with a full workload: a typical experiment cycle is
configure (1p/1e) + start focused (1p/1e) + monitor (1p/0–1e) + analyse (1p/1e) =
4 periods, 3–4 energy. Five templates plus one repeat ≈ 24–28 periods and 18–24
energy. Add manuscript draft (3p/2e), several commits (1p/1e each), the `PIIM`
response (3p/2e), research plan and Morrow call (1p/1e each). Total energy demand
plainly exceeds the ~4 starting segments many times over, so **protected breaks
are structurally mandatory**, not optional. In Standard, the first weekly break
restores 2 and later breaks restore 1, each costing a period. A player needing,
say, 30 energy across the semester must spend on the order of 15–20 periods on
breaks alone. This is the hidden centre of the time budget and it is never stated
as such in any supplied file — the documents present energy as pressure texture
while the maths makes it the dominant scheduling constraint. (`interpretation`,
medium-high.)

**Night and after-hours are a genuine dilemma rather than a strict penalty.**
`explicit`, high. They add +1 energy to focused/intense work in Standard and
reduce access to people and services (`02`, `06`, `07`) — but equipment "can run
at every period." So the two "extra" periods per week convert energy into time,
at the cost of relationships and optional scenes (Elena is "Absent except **The
Future**"; Haoran and Gabriel absent after-hours). The player who works nights
buys evidence with trust — a quiet, elegant coupling. (`implied`, high.)

**Supported profile changes the maths, not the map.** `explicit`, high. Five
starting segments, no night surcharge, breaks restoring 3 instead of 2/1. The
night-work dilemma partly evaporates in Supported: the trust-versus-evidence
tension weakens because working nights becomes cheap. This is a real, unremarked
divergence in _thematic_ experience between profiles even though narrative content
is identical (`interpretation`, medium).

**The crash is the game's only involuntary event, and it is carefully fenced.**
`explicit`, high. At zero energy the player may push one more focused/intense
task; at the next safe point the crash costs one further period, restores two
segments, resolves any passed monitoring window as missed, and may damage
evidence, lose an optional opportunity, or close a route. It "cannot begin during
a manual equipment action or cutscene." `07`: "No viable route requires a crash."
So the crash is priced as a bad trade, not a death — and its epilogue module
(`MR-END-FATIGUE-EXHAUSTED`) affects tone only, never paper or route.

**The gates and the clock create a specific and unusual failure texture.**
`interpretation`, high. Because Week 5, 8, 10, 14, 15, 16 fire regardless, running
out of time does not stall the player — it _arrives at the scene under-equipped_.
Combined with "A Complete Narrative" explicitly permitting manuscript work on a
Thin packet, the game's characteristic bad outcome is not "you failed to reach the
event" but "you reached the event with a paper you know is inadequate, and Elena
called it complete." The low-evidence variant of that scene
(`scene.complete.elena.lowEvidence` — "We have enough of a narrative to begin
repairing it in public") is the design thesis in one line.

**Mandatory scenes are period-charged but energy-free.** `explicit`, high. The
five middle scenes advance one period at zero energy; `Clarified` and `06:42`
cost nothing. So five of the 64 periods are consumed by story, and the intent is
stated: "This lets the fixed calendar advance through story events without
charging dialogue as ordinary work" (`02`). Net available work periods are
therefore ~59.

## 6.2 Preparation → outcome bands → evidence quality → claims

**A two-layer result with two different input sets.** `explicit`, high. `04`/`07`:
biological result responds to authored baseline, sample state, approach, equipment
condition, and small saved variation; evidence quality responds to controls,
monitoring, quality checks, missed windows, fatigue, and record handling. Only
biological result is band-and-seed driven; evidence quality appears to be
deterministic from player behaviour (`implied`, medium — no file states this
explicitly, but only the biological layer is described as subject to saved
variation).

**The band table makes preparation the dominant variable and forbids injustice in
both directions.** `explicit`, high. `07`: robust 80/20/0, mixed 20/60/20,
compromised 0/20/80. Two guarantees follow: robust preparation cannot yield a weak
result, and compromised preparation cannot yield a strong one. Combined with
seed-locking at start (`07`, `11`), the game deliberately eliminates save-scumming
and eliminates the feeling of arbitrary punishment — variability exists as flavour
inside an earned envelope.

**Evidence support is coarse and saturates early.** `implied`, high. 12 points
max; start at 3 (Developing); a usable new result with proper controls gives 2;
partial or first repeat gives 1; inconclusive gives 0. Five required templates at
2 points each = 10, plus the starting 3 = 13, capped at 12 = Substantial. So a
player who runs the five required templates well, with no optional or repeat work,
reaches the top band. The optional drug template and repeats are therefore
**not needed for evidence** — repeats are recovery mechanisms for limited or weak
outcomes, and drug work is purely Morrow-flavour. Conversely, thresholds are
forgiving: Coherent (6) needs only the starting 3 plus roughly two good results.
The consequence is that evidence is hard to fail and easy to max, which shifts the
game's real difficulty onto energy, trust, and claim discipline. (`interpretation`,
medium-high.)

**Claim level is where evidence becomes politics.** `explicit`, high. Careful
(P-5), Strong (P+5), Inflated (P+10 with integrity damage and harder reviewers)
per `07`. Crucially the `PIIM` claim-scope card can be weakened by overstatement
even where the underlying result is impressive (`07`, `08`), so evidence and claim
interact multiplicatively rather than additively: strong evidence plus inflated
claim is worse than strong evidence plus careful claim in review, while better in
PI confidence.

**Monitoring is the loop's only skill expression, and it is a travel decision.**
`explicit`, high. The desk queue mirrors rack state in words but "cannot control
equipment remotely" (`02`, `04`, `06`, `07`), so every meaningful check costs a
walk and a period. Routine monitor (1p/0e) versus quality-check monitor (1p/1e) is
the recurring micro-decision: 1 energy for better evidence quality. With three
concurrent groups, the player is repeatedly choosing which of three groups gets
the expensive attention — the closest thing this game has to combat.

## 6.3 PI confidence, integrity, five trust bars, career routes

**Two career routes, two different gating philosophies.** `explicit`, high.
Aldercroft (`08`) = one timed task (research plan before Week 12) + two of three
{Coherent+ evidence, Supportive+ PI confidence, Elena trust ≥41} + no _visible_
evidence concern. Morrow = reply + video call + public preprint + Developing+
evidence + Camila trust ≥41 + no fabrication confession. Academia measures
institutional standing and PI alignment; industry measures communication,
responsiveness, and honesty-as-clarity. The two routes reward different behaviours
in the same run, which is the structural argument the game is making.

**Visibility is the integrity system's load-bearing concept.** `explicit`, high.
Repeatedly: "A hidden integrity problem alone does not block Aldercroft"; "Hidden
integrity alone does not close it; a visible conflict or confession can" (`07`,
`08`); "Fabrication can remain undiscovered" (`03`, `05`). Integrity is thus
_not_ a gate — it is an ending modifier and a social-risk surface. The system
therefore encodes a specific claim about academia: dishonesty is punished by
exposure, not by dishonesty.

**PI confidence and integrity are engineered as an inverse pair, softly.**
`explicit`, high. Inflated claims give P+10 and I-45; careful claims give P-5.
`07` states the tension plainly ("PI confidence can rise while integrity falls,
and vice versa"). But note the asymmetry: PI confidence is a _route requirement_
(Supportive/Invested is one of Aldercroft's three conditions) while integrity is
not. Mechanically, sacrificing integrity buys route access; keeping integrity
buys only a better epilogue label and lower social risk. (`interpretation`,
medium-high — the documents never acknowledge this asymmetry.)

**The honest path is nonetheless well-supported.** `implied`, high. Aldercroft
needs two of three; a careful player can satisfy Coherent evidence (easy, per
6.2) and Elena trust ≥41 (starting 60, so two minor negatives of tolerance), and
skip PI confidence entirely. Careful claims cost 5 PI confidence each against a
starting 45; answering a PI request fully gives +10. So honest, responsive work
sustains routes without integrity damage.

**Trust arithmetic is coarse and forgiving-but-permanent.** `explicit`, high.
0–100, ±10 minor, ±20 major, no drift, five bars (Elena 60, Haoran 60, Samira 40,
Gabriel 60, Camila 40). Thresholds at 41 (route eligibility, "Working"), 61
(character offers one bounded support action), 20 (withholding, confrontation,
distancing). Samira and Camila both start at 40 — one point below the 41 gate —
so **both require at least one deliberate positive interaction to become useful**.
That is a precise, intentional-looking design choice: the two women who are
peers/outsiders rather than institutional superiors must be actively earned.
(`implied`, high; the choice tables confirm the +10 options exist —
`optional.samira.figure.credit`, `optional.camila.initial.careful`.)

**Gabriel's trust is the only spatial reward in the game.** `explicit`, high.
`06`: the service pass-through linking shared desks and imaging "opens only when
Gabriel working trust is 61 or more. It is a reward for respectful work, not a
required route." Since Gabriel starts at 60, a single +10 (`optional.gabriel.queue.wait`)
unlocks it, and a single -10 (`press`) plus another negative removes access. This
makes one relationship convert directly into saved walking time across the whole
back half of the campaign — the strongest instance of relationship-as-mechanic.

## 6.4 Manuscript, records, ethics, peer review, paper state

**A permanent raw record plus a mutable presentation layer.** `explicit`, high.
`07`: "The raw laboratory record is permanent and locked." `04`: omitting a card
"can weaken a manuscript or reviewer response, but cannot erase the scientific
record." The player edits only what is _reported_. This is the mechanical core of
the game's ethics: the truth persists and remains discoverable, so dishonesty is
a bet on nobody looking.

**Peer review is a three-card audit with a fixed, non-moral resolution.**
`explicit`, high. `07`/`08`: batch evidence, oxygen-loss challenge, claim scope +
reviewer response; each met / partly met / not met; four bands mapping to Week-15
states; the seed picks only between adjacent outcomes in the earned band. And
explicitly: "defensible work can fail, and undetected fabricated work can
publish" (`03`). The system is built so that outcome is not desert.

**Reviewer 3 is a designed unwinnable objection.** `implied`, high. `03` fixes
Reviewer 3's position: laser injury is artificial and the repair state is a stress
response — and `04` establishes as _fiction-level truth_ that the repair state is
associated with recovery and cannot be shown to cause it. Reviewer 3 is therefore
correct, and the editor asks the player to "address all concerns" including
conflicting ones (`record.piimEditor.body`: "complete, concise, and persuasive").
The only honest response is to concede a limitation. Elena's alternative is to
reframe stress as "a useful stress response with recovery nearby. That is almost
the same thing" (`scene.helpful.elena.answer`). The peer-review act is thus a
manufactured moral trap with no clean win, only a defensible loss.

**The integrity fork is a single, explicitly-priced menu.** `explicit`, high.
`MR-SCN-A-REASONABLE-RESPONSE`: defensible (I unchanged), or "stronger" opening
exactly one of omit (I-10, `FLAG:omission`), alter (I-25, `FLAG:alteredReading`),
fabricate (I-45, `FLAG:fabrication`). Plus journal withdrawal
(`FLAG:journalWithdrawal`) and public-record withdrawal (`FLAG:publicWithdrawal`,
closes both routes). Recovery is capped at 10 points total per run (`07`), so
alteration and fabrication are irreversible in practice — which the three-tier
ending taxonomy (defensible / compromised / seriously undermined) then encodes:
omission alone can be corrected back to defensible; any altered reading or
unsupported result is permanently "seriously undermined."

**Public-record withdrawal is the game's only self-inflicted total loss.**
`explicit`, high. It closes both routes and forces **End of Contract** (`07`,
`08`). Notably it is the _most_ scrupulous available action — retracting a paper
you no longer trust — and it is mechanically the worst. Whether that is intended
irony is unstated; it reads as deliberate given the epilogue text
(`ending.paper.rejected`: "The preprint link remains, or its absence remains
visible. Neither version finishes the work cleanly.") and `08`'s insistence that
End of Contract still leaves "agency beyond the university." (`interpretation`,
medium.)

## 6.5 Optional scenes, time pressure, mechanical value

**Ten optional scenes, priced almost free, with unequal mechanical payoffs.**
`explicit`, high. `12`: all optional scenes use `MR-ACT-RELATIONSHIP` (1 period,
0 energy) except Camila's video call (`MR-ACT-CAREER-FOCUSED`, 1p/1e). At 1 period
and no energy, they are the cheapest meaningful actions in the game.

Payoff ranking (`implied`, high):

| Scene                                                                          | Mechanical value                                                |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `MR-OPT-CAMILA-INITIAL` / `-VIDEO` / `-OFFER`                                  | Route-critical. Ignoring both emails closes Morrow permanently. |
| `MR-OPT-GABRIEL-QUEUE`                                                         | Unlocks the shortcut (Gabriel 60→70) plus queue state.          |
| `MR-OPT-SAMIRA-NOT-IN-MY-FIGURE`                                               | EV+1 on choices A _and_ B, plus `FLAG:samiraCoauthor`.          |
| `MR-OPT-ELENA-FUTURE`                                                          | Elena trust, after-hours only (energy-surcharge context).       |
| `MR-OPT-HAORAN-*`, `MR-OPT-SAMIRA-SHARED-INSTRUMENT`, `MR-OPT-GABRIEL-ARCHIVE` | Trust and permanent flags; no direct evidence or route effect.  |

**The mid-game concern scenes are conditional on the player's own record.**
`explicit`, high. `MR-OPT-HAORAN-MISSING-REPLICATE` and `MR-OPT-GABRIEL-ARCHIVE`
appear "only if a visible record supports concern" and do not "invent hidden
knowledge." So an honest run simply never sees two of the ten scenes — content
availability is a function of the player's ethics. Both offer a correction option
(+10 trust, allowed integrity recovery, `FLAG:correction`) and two concealment
options (-20 or -10, plus a concern flag). These are the game's redemption doors.

**A quiet mechanical dominance for the honest social player.** `interpretation`,
medium-high. Samira's credit choice gives EV+1 for one period and no energy —
strictly cheaper than any experiment path to a support point (which costs ≥4
periods and ≥3 energy). Gabriel's shortcut saves walking for eight weeks for one
period. So the socially generous player is _also_ the efficient player, which is
a striking alignment given the game's theme. The documents never claim this;
`07`'s pressure list frames relationships as a competitor for resources ("Extra
work can improve evidence while consuming the resources needed to finish the
manuscript or maintain relationships"), which understates how cheap relationships
actually are.

## 6.6 One floor, environmental change, exploration

**Travel is the metronome.** `explicit`, high. 400 m², a 75–90 m loop, stations
5–20 m apart, fixed brisk walking speed with no sprint, and the shortest work loop
named as PI office → shared desks → main laboratory → tissue culture → PI office
(`02`, `06`). Because walking is free in game-time but not in real time, travel is
pure pacing: it converts scheduling decisions into felt physical work without
charging the player periods. The documents state the intent — stations "close
enough to support repeated first-person travel, but far enough apart that a
queue, a colleague, or a changed room state can become meaningful" (`02`).

**Exploration is explicitly not a discovery mechanic.** `explicit`, high. No
inventory, no pickups, no hidden-object hunt, one main station cluster and at most
two optional inspectables per room (`06`); no minimap, no objective arrows, no
quest markers (`02`, `06`, `10`); Interaction Assist highlights only within the
current room and "does not draw a path, arrow, or minimap." Three landmarks —
organoid glow, warm PI office, exit light — replace navigation UI.

**The environment is a slow, budgeted mood instrument.** `explicit`, high. Five
act states, four period lighting layers, 20 lighting presets (5×4), 30
environmental text items in five categories, one major + two minor room changes
per phase, changes only on safe room entry. `06`: "Details persist unless a later
event visibly replaces them."

**The exit is a designed emotional gradient, and it is universal.** `explicit`,
high. "From Week 8, the exit light, notices, and outside view become more inviting
for every player. This does not depend on Morrow eligibility and does not imply a
best ending" (`06`, `09`). Before Week 16 the exit interaction "gives one dry
internal response. It does not start a false escape sequence."

**Environmental text is strictly non-load-bearing.** `explicit`, high. "Required
information never depends on an inspectable environment item alone" (`06`, `12`).
So exploration is entirely optional flavour — which means the fiction's density
lives in text the player may fully skip.

## 6.7 Content volume, scene time, three-hour target

**The budget is unusually explicit and internally consistent.** `explicit`, high.
Seven mandatory scenes at 2:20 + 1:50 + 2:10 + 1:15 + 2:40 + 2:20 + 2:10 = **14:45**
(as `12` states), inside the 14–18-minute target; plus a 60–90-second epilogue
(planned 75s), total ~16 minutes, inside the 22-minute non-interactive maximum.
Against ~180 minutes total, non-interactive content is ~9%.

**Text volume is capped at 6,000 unique words, measured post-lowercasing on
`strings.en.json`.** `explicit`, high. This is a very tight budget for 7 mandatory
scenes with variants, 10 optional scenes, 20 primary records with up to 3 result
forms each, 30 environmental items, 29 ending modules, 12 citations, and the full
UI/tutorial string set. It is a _unique_-word cap rather than total wordcount, so
reuse is unlimited — but it strongly implies a consistent, narrow, controlled
diction, which matches the flat institutional register of the drafted text.

**Per-scene content density must be extremely high.** `implied`, high. The drafted
scenes are 5–8 beats each. `MR-SCN-CLARIFIED` at 2:20 across 8 beats implies
~17 seconds per beat, mostly manual-advance reading time with camera work. Scene
length is thus achieved by pacing and staging rather than volume of dialogue.

**Three hours implies roughly 55–60 productive periods actually played.**
`interpretation`, medium. If ~59 work periods are available and a run uses 48–62,
then a period plus its travel and station interaction occupies roughly 2.5–3.5
minutes of real time. That is a plausible cadence for walk-plus-focused-view, and
it means the _entire_ game is about 60 discrete decisions plus travel plus 16
minutes of cinematics. This is a very small number of decisions for a three-hour
game, which puts enormous weight on each one being legible and consequential — a
requirement the pre-commitment cost disclosure and stated-reason feedback are
clearly built to satisfy.

**Fallback scope is pre-authored, not improvised.** `explicit`, high. `12` defines
a coherent 90-minute fallback: 4 templates (merging range+repair into
`MR-FB-EXP-RANGE-REPAIR`), all 7 mandatory scenes, 7 optional scenes, 18 records,
all 29 ending modules, all 12 citations, 20 environmental items — and explicitly
forbids adding replacement optional scenes to restore the count. A separate
Week-1-only vertical slice is also specified.

## 6.8 UI visibility, pressure profiles, saves, planning

**Planning is supported but not automated.** `explicit`, high. The player gets:
permanent week/period/energy HUD; pre-commitment time and energy cost; Research
Status with stated reasons and non-spoiling route feedback ("Aldercroft needs a
stronger research case," `MR-UI-ROUTE-FEEDBACK`); the desk work queue mirroring
rack state; explicit expiry statements. The player does _not_ get: a task list,
objective arrows, minimap, completion percentage, hidden formulas, or raw flags.
So planning is a _mental_ activity fed by honest but coarse information.

**Two-sided asymmetry in what is hidden.** `implied`, high. Bars and labels are
visible (evidence packet label, PI confidence label, integrity segments, five
trust bars); underlying numbers and permanent flags are not. So the player can
see they are in "Working" trust with Camila but not that the threshold is 41.
`08`: the summary shows "labels and bars, not hidden flags, raw formulas, or a
completion percentage." Route feedback exists precisely to compensate.

**Save behaviour reinforces commitment rather than experimentation.** `explicit`,
high. One active local IndexedDB save per browser profile; safe-point-only saves
(experiment-stage changes, monitoring choices, analysis archiving, manuscript
commits, scene boundaries); no chapter rewind; New Game requires confirmed
replacement; seed and outcome bands locked at experiment start so reloading
cannot reroll (`07`, `08`, `10`, `11`). Combined with a `activeCampaignBackup`
store, forward-only migrations, and a recovery path that "never overwrites the
failing source record before the player accepts it," the persistence design is
notably protective _and_ notably anti-undo. The player is protected from loss and
denied retries.

**Pressure profile is locked at New Game and content-identical.** `explicit`,
high. `MR-UI-PROFILE-LOCK`: "This pressure profile is fixed for this save. Start a
New Game to use another profile." Since a completed campaign deletes the active
state (`08`, `10`, `11`), switching profiles means restarting the whole campaign.

**Time cannot pass while the game is not running.** `explicit`, high. Stated in
`02`, `07`, `10`, `11`, and enforced architecturally: `CampaignState` contains no
"real-time timestamps that drive play," and the safe-point scheduler "does not use
elapsed real time, browser timers, or background-tab time." No idle-game pressure
of any kind.

## 6.9 Modular endings, Citations, replay

**Endings are combinatorial in presentation, categorical in label.** `explicit`,
high. Four labels (Pending Appointment, Transferable Skills, Out of Scope, End of
Contract) × 4 paper aftershocks × 15 relationship afterbeats × 4 integrity
treatments × 2 fatigue treatments = 29 modules assembling ~480 nominal
combinations, of which one career label headlines the card. `08`: paper,
integrity, and human modules "provide subtitle context without creating a moral
ranking of endings."

**End of Contract is not selectable.** `explicit`, high. `07`/`08`: it "occurs
only when no route remains." The player can _fail into_ it but cannot _choose_
it — the game refuses to let despair be a stated preference, while Out of Scope
provides a dignified voluntary exit.

**The resolver is strictly deterministic post-Week-16.** `explicit`, high. "The
paper state has no new random result after Week 16"; accepted becomes published
"through routine final processing"; the aftershock "adds no new random paper
result." Evidence gets no epilogue module because its effects already routed
through paper state and career availability — only its label appears in the
summary.

**Replay incentive is thin by design and concentrated in Citations.**
`explicit`/`interpretation`, high. The Archive keeps the 12 most recent ending
cards plus persistent Institutional Citations and "carries no gameplay advantage,
route, or state into a new campaign" (`08`, `10`). No New Game+, no unlocks, no
carryover, no chapter rewind. The only accumulating object across runs is the
citation set — 12 satirical stamps, none requiring unethical play, several of
which are mutually exclusive within a single run (MR-CIT-09 Aldercroft, MR-CIT-10
Morrow, MR-CIT-11 Out of Scope, MR-CIT-12 End of Contract). MR-CIT-11 requires a
route to be available and declined; MR-CIT-12 requires none available. So
**completing all 12 citations requires at least three, arguably four, campaigns**
with different route outcomes. That is the sole structural replay driver, and it
is deliberately weak — a collection of jokes rather than a progression system.
(`interpretation`, high.)

**One-time content and saved variants suppress replay-as-exploration within a
run.** `explicit`, high. `12`: mandatory scenes have at most one saved variant and
run once; optional scenes run once or expire once; record result variants are
saved and "never reroll"; normal cutscenes "do not replay during an active save."

---

# 7. Mechanics that define the game's identity

Ranked by how much the game would change without them.

**1. The pre-commitment cost display + free walking/reading/talking.**
`explicit`, high (`02`, `07`, `10`). This single pairing defines the entire feel:
the world is free to inhabit, and only commitment is expensive. It makes the game
a series of deliberate, informed purchases rather than a time-attack.

**2. Fixed weekly gates that do not wait.** `explicit`, high (`03` invariants,
`07`). Converts time management from "can I finish?" to "what will I have when the
deadline arrives regardless?"

**3. Physical-presence requirement for monitoring, with a remote status mirror.**
`explicit`, high (`02`, `04`, `06`, `07`). The single decision that makes a
first-person 3D floor necessary rather than decorative. Without it this could be a
menu game.

**4. The two-layer result (biological vs evidence quality).** `explicit`, high
(`02`, `04`, `07`). Separates "what the tissue did" from "what you can honestly
say about it" — the mechanical seed of the whole manuscript act.

**5. Seed-locked earned outcome bands.** `explicit`, high (`07`, `11`). Kills
save-scumming, guarantees causal learnability, and makes variance feel like
biology rather than dice.

**6. Locked raw record + mutable reported record.** `explicit`, high (`04`, `07`).
The precondition for the integrity system to be about _presentation_ rather than
forgery.

**7. Visibility-gated consequences for misconduct.** `explicit`, high (`03`, `05`,
`07`, `08`). Fabrication can publish; honest work can be rejected. This is the
game's thesis expressed as a rule.

**8. Manuscript as a card board with claim levels and committed snapshots.**
`explicit`, high (`02`, `07`, `12`). Makes writing playable without simulating
writing; the commit-is-permanent rule makes wording a decision.

**9. Energy, protected breaks, and the involuntary crash.** `explicit`, high
(`02`, `07`). The body as a resource, with rest priced as lost work — and the
crash as the only moment the game takes control away.

**10. Gabriel's trust-gated pass-through.** `explicit`, high (`06`). The only
place a relationship becomes level geometry. Small, but uniquely expressive.

**11. Institutional Citations.** `explicit`, high (`08`, `12`). The satire's
punchline delivery system and the only cross-run persistence.

**12. The 06:42 bookend and the walk to the exit.** `explicit`, high (`03`, `06`,
`12`). The framing device that reinterprets the whole campaign as a loop the
player is choosing whether to re-enter.

---

# 8. Likely target player and likely exclusions

## Likely target player

`interpretation`, medium-high, from tone, mechanics, reading load, and length.

- **Primary:** current or former academic researchers, PhD students, and
  postdocs. The specificity of the humour is the strongest signal — "version
  final, version final-two, version final-used, version final-real"
  (`env.publication.02`); "urgency is assessed in the order it was correctly
  documented" (`env.bureaucracy.03`); the "minor revisions" running joke used in
  Week 1, Week 7, and after a formal major-revision decision (`03`); the editor
  asking for a response that is "complete, concise, and persuasive" to conflicting
  reports. Much of this lands hardest on people who have lived it.
- **Secondary:** players of short, text-forward, choice-consequence narrative
  games and light management sims who tolerate reading, value legible systems,
  and want a three-hour complete experience with authored consequence rather than
  mechanical mastery.
- **Tertiary:** players interested in research-ethics and precarious-labour
  subject matter as subject matter — the game's willingness to let fabrication go
  unpunished and honesty go unrewarded implies an audience that finds that
  interesting rather than frustrating.
- **Also implied:** an accessibility-conscious audience, given the depth of the
  a11y contract (dual-channel information everywhere, 150% scale at 1280×720,
  reduced motion, no timed/precision input, Interaction Assist, captions default
  on, an equal-content Supported profile).
- **Also implied:** a portfolio-review audience. `09` and `11` discuss public
  GitHub publication, licence provenance, `ASSET_MANIFEST.md`, and a portfolio
  task. Some design conservatism (no engine, no physics, no voice acting,
  four NPCs) is legible as demonstrable-scope discipline.

## Likely exclusions

- **Players wanting simulation depth or protocol authenticity.** `explicit`, high.
  Non-actionable protocols, three abstract time groups, no quantities, no raw
  data, no operational settings (`04`, `09`).
- **Players wanting mechanical mastery or difficulty tuning.** `explicit`, high.
  No combat, no dexterity, no timed input, no drag/hold; two profiles that differ
  only in tolerance; graphics presets that cannot change rules.
- **Players wanting optimisation and completion.** `explicit`, high. No completion
  percentage, no universally optimal schedule, hidden thresholds, diminishing
  returns, one repeat per template, no New Game+.
- **Players wanting to save-scum or retry.** `explicit`, high. Locked seed, safe
  points only, one active save, no rewind.
- **Players wanting moral scoring or a best ending.** `explicit`, high. No moral
  score, no ending ranking, Out of Scope explicitly "not a hidden best ending."
- **Mobile and tablet players.** `explicit`, high (`10`).
- **Non-English readers.** `explicit`, high. `10`: English only, no planned
  localization, acknowledged as "a scope decision, not a claim that English is
  accessible to every player."
- **Players wanting romance or a customisable protagonist.** `explicit`, high.
  "The game has no romance system" (`05`); name and pronouns only, no appearance
  creator, no branching origin.
- **Players seeking exploration, collection, or environmental discovery as
  reward.** `implied`, high. No inventory, no pickups, no hidden items, and
  environmental text explicitly non-load-bearing.
- **Players sensitive to burnout, insecure employment, and research-ethics
  pressure.** `explicit`, high. Hence the mandatory content note
  (`ui.contentNote`).
- **Safari-primary players.** `explicit`, high. Best-effort only, no support
  claim without evidence (`11`).

---

# 9. Emergent qualities

Effects that follow from the rules but are not stated as goals in any supplied
file.

**9.1 The game's real difficulty curve is energy management, not evidence.**
`interpretation`, medium-high. As computed in 6.1 and 6.2, evidence saturates
easily while energy demand far exceeds supply, forcing a recurring
break-versus-work rhythm. The felt experience will be less "can I get good data?"
and more "when can I afford to stop?" — which is thematically apt but not
presented as the central tension anywhere.

**9.2 Kindness is efficient.** `interpretation`, medium-high. Samira's credit
choice gives EV+1 for 1 period / 0 energy (cheaper than any experimental route to
a support point); Gabriel's queue deference unlocks a permanent shortcut for the
same price. The game's ethical path is also its optimal path in several places,
which slightly undercuts the "hard trade-off" framing in `07`'s pressure list.

**9.3 An honest run has less content.** `interpretation`, high.
`MR-OPT-HAORAN-MISSING-REPLICATE` and `MR-OPT-GABRIEL-ARCHIVE` require a visible
record mismatch, and `MR-CIT-08` (Archival Continuity) requires responding to such
a concern. So the scrupulous player sees fewer scenes and can lock themselves out
of at least one citation. Content availability is inversely correlated with
integrity.

**9.4 Night work is a trust tax.** `interpretation`, high. Because Elena, Haoran,
Samira, and Gabriel are absent or scene-only at night and after-hours (`05`, `06`,
`07`), the player who converts energy into time by working late systematically
misses the cheap relationship actions that gate routes and shortcuts. This is a
strong, elegant coupling that no document names as a designed trade.

**9.5 Elena's schedule builds friction into the required loop.** `interpretation`,
medium. `MR-ACT-REPORT-ELENA` costs 1 period / 0 energy and Elena anchors to the
PI office (early) or lab/office (late), absent at night. The "shortest work loop"
begins and ends at the PI office (`02`), so reporting is cheap only during
people-hours — subtly pushing the player toward day work and thus toward the
energy surcharge dilemma from the other direction.

**9.6 The player will learn to distrust the phrase "minor revisions" as a
mechanic.** `interpretation`, high. Elena uses it in Week 1, Week 7, and after the
formal major-revision decision (`03`). The title of the game is the euphemism.
Repetition of a phrase across contexts becomes a legible signal of institutional
gaslighting rather than a joke — an emergent semantic mechanic.

**9.7 Free walking makes the floor into a meditative buffer.** `interpretation`,
medium. Because travel costs no game time and there is no sprint, jump, or stamina,
the player can wander indefinitely at zero cost. Between decisions, the game
becomes a quiet architectural space — a de-facto rest mode the systems do not
acknowledge. The dry exit interaction before Week 16 (`06`) suggests the designers
anticipated aimless wandering.

**9.8 The three-slot sample limit produces a rhythm rather than a puzzle.**
`interpretation`, medium. With six templates (five required), one repeat each,
sequential prerequisites (range needs laser analysis, repair needs range
analysis), and windows that mostly do not overlap heavily, the practical number of
genuinely simultaneous groups is likely 2, not 3. The third slot may function
mostly as headroom.

**9.9 The Supported profile is thematically different, not just easier.**
`interpretation`, medium. Removing the night surcharge dissolves the trust-versus-
evidence coupling in 9.4 and makes protected breaks (3 segments) efficient enough
that the "body as constraint" theme softens considerably. Content is identical;
the argument the systems make is not.

**9.10 The permanent-flag layer creates a shadow state the player can feel but
never read.** `interpretation`, medium-high. `FLAG:haoranConcern`,
`FLAG:samiraCoauthor`, `FLAG:morrowConcern`, `FLAG:openingCaution`, and so on
persist and override recovered trust bars (`05`: "A permanent breach overrides a
later high working-trust bar"). Since bars are visible and flags are not, players
will observe bars rising while behaviour stays cold — producing an accurate
emotional simulation of a damaged professional relationship, arguably beyond what
the documents claim.

**9.11 Because the preprint posts in every run, the story has a guaranteed point
of irreversibility.** `interpretation`, high. `03`/`12`: the preprint "posts in
every run"; the form "has a box for yes and no box for not meaningfully"
(`scene.publicRecord.internal.check`). Whatever the player's packet, Week 8 makes
it public. That guarantees every playthrough contains a moment of publishing
something the player may know is inadequate — a structural complicity device.

**9.12 Withdrawal is punished and correction is cheap.** `interpretation`, medium.
Public-record withdrawal (scrupulous) forces the worst ending; correcting an
omission (also scrupulous) costs almost nothing and restores defensible status.
The system therefore rewards fixing over retracting, which is a specific ethical
stance that no document articulates.

---

# 10. Contradictions, tensions, and mixed signals

**10.1 "Survival game" versus "no failure state."** `explicit` tension, high.
`02` calls Standard "the intended survival-game profile," but no early failure
ends the game, there is no game-over before Week 16, gates always open a route
forward, and even the crash restores energy. The survival is _qualitative_ — you
survive with a worse record — which is coherent but sits uneasily with the genre
word chosen. Players arriving on "survival" may find the stakes diffuse.

**10.2 Integrity is central thematically but non-blocking mechanically.**
`implied` tension, high. Integrity has its own 0–100 value, five-segment display,
permanent flags, three-tier ending taxonomy, and the most dramatic single choice
in the game — yet it gates nothing. Both routes explicitly ignore hidden
integrity (`07`, `08`). PI confidence, by contrast, gates Aldercroft and rises
with inflation. The most morally weighted number is the least mechanically
coupled one.

**10.3 Relationships are framed as a competing resource but priced as cheap.**
`implied` tension, medium-high. `07`: extra work "consum[es] the resources needed
to... maintain relationships." But local optional scenes cost 1 period / 0 energy,
while a single experiment cycle costs ~4 periods / ~3 energy. The stated
opportunity cost is small relative to the framing. (Partly rescued by the night-work
coupling in 9.4, which is never stated.)

**10.4 Evidence caps easily while the design implies scarcity.** `implied`
tension, medium-high. `07` presents four packet tiers and route thresholds as
meaningful gradation, but five required templates at strong quality plus the
starting 3 points overshoots the 12-point maximum. Substantial appears reachable
without any optional work. The "high-evidence paper path can use 58–62 periods"
claim in `07` is therefore hard to reconcile with the point arithmetic unless
repeats and Substantial-tier work are far less efficient than the stated point
values suggest.

**10.5 "Not a quest-marker system" versus a fairly comprehensive guidance stack.**
`explicit`/`implied` tension, medium. The documents repeatedly disclaim quest
markers, arrows, minimaps, and task lists (`02`, `06`, `10`), yet provide: a desk
work queue with per-group status words, a capped active-request list (2 required +
3 optional), stated deadlines and expiries, a project notebook explaining current
requests, Research Status route feedback, Interaction Assist highlighting, and
three navigational landmarks. Functionally this is close to a quest log
distributed diegetically. The disclaimer is about _presentation_, not about
information availability — a mixed signal about how much orientation work the
player actually does.

**10.6 Fabrication is a headline theme with a very small surface area.**
`implied` tension, medium-high. Fabrication is discussed extensively across `03`,
`04`, `05`, `07`, `08`. Mechanically it appears as: one option
(`scene.response.stronger.fabricate`, I-45) in one Week-14 scene, plus omission
and alteration options on the analysis/manuscript board, plus a confession option
in Camila's video call, plus two conditional concern scenes. There is no
progressive slide into misconduct, no partial or ambiguous data handling, no
accumulating small compromises — the design explicitly refuses a falsification
method. The theme's weight in prose greatly exceeds its interactive footprint.

**10.7 Public-record withdrawal: the scrupulous act with the worst outcome.**
`explicit` tension, high. It closes both routes and forces **End of Contract**
(`07`, `08`). Whether this is intended irony or an unintended punishment of
integrity is not addressed anywhere in the supplied files.

**10.8 The 6,000 unique-word cap versus the catalogue's breadth.** `implied`
tension, medium. Seven mandatory scenes with variants, ten optional scenes with
4–6 lines each, 20 records with up to 3 result forms, 30 environmental items, 29
ending modules, 12 citations with three text fields each, ~9 tutorial prompts,
~35 UI strings. `12` claims "This document is below that limit," which is
plausible for the _drafted_ text, but the cap is on the final generated string
file and leaves little headroom for expansion, requirements panels, forecast
strings, warning texts, or Research Status reason strings — many of which are
specified as required but not drafted.

**10.9 Camila's route criticality versus her non-appearance.** `implied` tension,
medium. Camila is one of five trust bars, gates an entire ending, and has three
scenes — yet `05` and `09` forbid a Camila model or in-person appearance,
including in the epilogue. Her "video call" therefore has no visual embodiment
specified. `12` gives her an eight-sound vocal palette and a "call-end tone,"
implying an audio-plus-interface presentation, but the presentation of the most
route-critical optional scene in the game is left to inference.

**10.10 Two scene-time contracts stated slightly differently.** `explicit` minor
inconsistency, high. `02` and `03` state the seven main scenes "target 14–18
minutes"; `12` fixes them at exactly 14:45 and the epilogue at 75 seconds. These
are compatible (14:45 is within 14–18) but the range in the upstream documents is
already closed in the content spec, meaning the flexibility described upstream no
longer exists.

**10.11 "A Reasonable Response" costs both a scene period and an action.**
`explicit` minor tension, medium. `12`'s scene table: the scene advances 1 period
at 0 energy, "later response action costs 3/2." So Week 14 consumes 4 of the
week's 4 periods for the response alone if the player also needs the oxygen
analysis (which must complete before W14). The Week 14 schedule is extremely
tight, and no document notes this.

**10.12 Elena's low-evidence variant may make Thin packets narratively
_preferable_.** `interpretation`, low-medium. The low-evidence forms of
**A Complete Narrative** and **Helpful Comments** contain some of the sharpest
satirical lines in the draft ("enough of a narrative to begin repairing it in
public"). A player optimising for tonal payoff rather than outcomes has a mild
incentive to under-perform. Minor, and possibly intended.

**10.13 The 400 m² floor with 4 NPCs and no crowd, versus "densely designed."**
`implied` tension, low-medium. `06` promises an "academic terrarium" that is
"dense enough for repeated spaces to acquire new narrative meaning," while also
capping room detail at one station cluster plus two optional objects, capping
visible change at one major and two minor per phase, forbidding any crowd, and
scheduling four NPCs to single anchors per period. Density must come almost
entirely from text, notices, lighting, and sound.

---

# 11. Missing or underspecified information

Classified by whether the gap is internal to the supplied corpus or attributable
to the withheld documents.

## Referenced but not supplied

- `01`-numbered document (vision/requirements) — absent from corpus.
- `13-testing-and-evaluation.md` — referenced by `07`, `10`, `11`, `12` for
  coverage targets, private evaluation method, and performance pass evidence.
- `15-implementation-contract.md` — referenced by `12` for "the complete
  requirement and work-package map."
- `assets/ASSET_MANIFEST.md` — referenced by `06` and `09`.
- All `MR-REQ-*` requirement definitions. `12` links every content object to
  requirement IDs (`MR-REQ-LOOP-001`, `MR-REQ-EXP-001/002/003`,
  `MR-REQ-NARR-001/002`, `MR-REQ-CHAR-001`, `MR-REQ-END-001/002`,
  `MR-REQ-CONTENT-002`) whose text appears nowhere in the corpus.
- `MR-TEST-WORLD-001` and `MR-TEST-UI-001`/`MR-TEST-A11Y-001` details beyond the
  short summaries in `10`.

## Gaps internal to the supplied design

**Configuration semantics.** `explicit` gap, high. Every experiment offers goal,
control quality, and observation focus (structure / rhythm / both), plus one
family-specific qualitative choice. No document states what these options _do_ —
how control quality maps onto the robust/mixed/compromised band, whether
observation focus restricts which evidence views resolve, or what the
family-specific choices actually are beyond one-line themes. This is the primary
moment-to-moment decision in the core loop and its mechanics are unspecified.

**Band assignment rules.** `explicit` gap, high. `07` names the inputs
(configuration, equipment state, monitoring, fatigue, quality choices) and the
three band probabilities, but not the mapping from inputs to band. There is no
threshold, weighting, or worked example.

**Evidence-quality determination.** `implied` gap, high. Four states (usable /
inconclusive / suspicious / worth repeating) responding to six factors, with no
stated rule. "Suspicious" in particular is never defined — it is unclear whether
it is a player-caused artefact, a reviewer hazard, or a record-handling signal.

**Sample health, history, and equipment condition.** `implied` gap, medium-high.
Both are named repeatedly as outcome inputs and both appear in `CampaignState`
(`11`), but no document defines their scales, how they degrade or recover, what
"sample or equipment recovery" (an intense-class action per `02`) costs or
achieves, or how the player observes them.

**Monitoring window mechanics.** `implied` gap, medium-high. We know windows
exist, are announced, persist until deliberate time advance, and can be missed
with a warning. We do not know how many windows an experiment has, how they are
distributed across periods, or how much evidence quality a missed window costs.

**Sample group acquisition.** `implied` gap, medium. The player "selects" a
labelled group; where groups come from, whether supply is limited, and what
happens to the supply when a group is cancelled or lost are unaddressed. `04`
says a cancelled group is lost — lost from what pool is unclear.

**Fatigue's effect on results.** `implied` gap, medium-high. Fatigue is listed as
an evidence-quality input in `04` and `07`, but no threshold or magnitude is
given. It is unclear whether low energy degrades outcomes continuously or only at
zero.

**Manuscript board interaction detail.** `implied` gap, medium-high. Card types
are enumerated (figure, evidence, claim, control, authorship, request,
supplementary), and commits create snapshots — but how cards connect, what
constitutes a valid figure, what the requirements panel checks, and how many
revisions the campaign expects are not specified. `MR-ACT-MANUSCRIPT-COMMIT` is a
single action ID covering an unbounded number of revision events.

**PI request generation.** `implied` gap, medium. `07` describes a hybrid system
with "small authored sets selected by current state," and PI confidence changes
of ±10/±5 per request — but the request pool is not enumerated in `12`, which
lists only ten `MR-TASK-*` items, most of them main-line. The optional-request
content that fills the desk's three optional slots is largely absent.

**Equipment queue and fault content.** `implied` gap, medium-high. Named as
authored situations with five stated player responses across `02`, `04`, `07` —
but `12` contains only `MR-OPT-GABRIEL-QUEUE` as an instance. The catalogue's
counted families do not include an equipment-event family, so it is unclear
whether these are content objects at all.

**The protected break.** `implied` gap, medium. It is a break-room interaction
costing 1 period and restoring energy, but has no `MR-ACT-*` ID in `12`'s action
table, no text keys, and no scene content — despite being, per §6.1, arguably the
most frequently used action in the game.

**Research Status content strings.** `implied` gap, medium. `07` requires "a short
stated reason" for every material state change and non-spoiling route feedback;
`12` supplies one generic string (`ui.route.feedback`) and no per-change reason
strings. Similarly the "short plain-language forecast" required before every
meaningful action has no drafted text.

**Reviewer-report variability.** `implied` gap, medium. `03` says reviewer wording
and examples "respond to visible evidence quality," but `12` gives each reviewer a
single body string with no variants, unlike records that have three result forms.

**Response-card evaluation.** `implied` gap, medium-high. Three cards, each met /
partly met / not met, feeding four bands. No document states what evidence
satisfies each card — e.g. whether a "limited" batch record partly meets the batch
card, or how claim scope is scored against the committed claim level.

**Aldercroft's determination timing.** `implied` gap, medium. `08` gives the Week
13 conditions but not the evaluation moment or how "no serious evidence concern
visible to Aldercroft or Elena" is computed — which flags count as visible to an
external committee is undefined.

**Optional-scene trigger specifics.** `implied` gap, medium. "A visible record
supports concern" gates two scenes; the precise flag or record conditions are not
enumerated.

**Total interactive playtime derivation.** `implied` gap, medium. The three-hour
target appears in `07` as a balance principle, but no document derives it from
period count, travel distance, or interaction time. My estimate in §6.7 is
inference.

**Opening stance persistence.** `implied` gap, low-medium. `FLAG:openingCaution`
is set in `MR-SCN-CLARIFIED` but is never referenced again in any supplied file.

**How the 06:42 scene presents unavailable routes.** `implied` gap, low-medium.
`12` says only available routes are choosable and only the "neither form" appears
when none remain; whether closed routes are shown greyed, explained, or omitted is
unstated.

**Word-count accounting for the fallback and slice.** `implied` gap, low. The
6,000-word cap applies to the released string file; whether the fallback's cut
content is removed from the file or merely unreferenced is unaddressed.

---

# 12. Evidence table

|   # | Conclusion                                                                                                                                               | Class                     | Conf.         | Sources / design objects                                                                                                         |
| --: | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
|   1 | First-person, single-player, static browser game on one continuous ~400 m² floor; ~3 hours                                                               | explicit                  | high          | `06` floor plan & acceptance criteria; `07` "Approximately three hours"; `11` scope, static build, one continuous Three.js scene |
|   2 | 16-week / 64-period fixed calendar starting and ending at 06:42; 7 mandatory scenes in fixed weeks every run                                             | explicit                  | high          | `02` campaign time; `03` invariants + beat sheet; `12` scene table                                                               |
|   3 | Gates never wait for unfinished work; weak work changes the paper path, not the calendar                                                                 | explicit                  | high          | `03` invariants; `07` requests/gates; `02` workload and soft failure                                                             |
|   4 | No game-over before Week 16; failure is informational                                                                                                    | explicit                  | high          | `02` outcome principles; `07` soft failure; `03` invariants                                                                      |
|   5 | Costs (time + energy) always shown before commitment; walking, reading, ordinary dialogue are free                                                       | explicit                  | high          | `02` B08 contract & cost table; `07` time/pacing; `10` interaction principles                                                    |
|   6 | Energy, not periods, is the binding constraint; protected breaks are effectively mandatory                                                               | interpretation            | medium-high   | Arithmetic over `02` cost table + `07` break rules + `12` action IDs vs 64-period budget                                         |
|   7 | Crash is the sole involuntary event; fenced from equipment actions/cutscenes; never required by any route                                                | explicit                  | high          | `02` energy section; `07` pressure profiles                                                                                      |
|   8 | Night/after-hours convert energy into time at the cost of people-access                                                                                  | implied                   | high          | `02`; `07` period schedule; `05`/`06` schedule tables (Elena absent except **The Future**)                                       |
|   9 | Supported profile is content-identical and dissolves the night-work dilemma                                                                              | explicit / interpretation | high / medium | `02`; `07` profiles; `MR-UI-PROFILE-SUPPORTED`, `MR-UI-PROFILE-LOCK`                                                             |
|  10 | Five-stage experiment loop, max 3 concurrent groups, monitoring requires physical presence                                                               | explicit                  | high          | `02` loop; `04` B04 contract; `06` functional-location placement; `07` interaction state                                         |
|  11 | Two-layer results: biological result + evidence quality, from different input sets                                                                       | explicit                  | high          | `02` feedback model; `04` B05 contract; `07` experiment resolution                                                               |
|  12 | Preparation sets an outcome band (80/20/0, 20/60/20, 0/20/80); seed locks variation at start; reload cannot reroll                                       | explicit                  | high          | `07` B10 outcome-band table; `11` PRNG/determinism                                                                               |
|  13 | Evidence saturates easily: 5 required templates × 2 + starting 3 ≥ 12 cap                                                                                | interpretation            | medium-high   | `07` support scale & starting value; `04` B05 point rules; `12` six templates                                                    |
|  14 | Claim level trades PI confidence against integrity and reviewer difficulty; overstatement can weaken the claim-scope card                                | explicit                  | high          | `07` PI confidence rules & PIIM band; `04` claim table; `08` response contract                                                   |
|  15 | Raw record permanent; only the reported record is mutable; no falsification method provided                                                              | explicit                  | high          | `07` integrity/irreversible loss; `04` B05 contract; `03` integrity choices; `12` response fork                                  |
|  16 | Misconduct is gated by _visibility_, not detection certainty; fabrication can publish, honest work can fail                                              | explicit                  | high          | `03` peer review + integrity; `07` career readiness; `08` route-unlock + PIIM contracts                                          |
|  17 | Integrity gates no route; PI confidence does — the most moral number is the least coupled                                                                | implied                   | high          | `07`/`08` route conditions vs integrity rules                                                                                    |
|  18 | Two routes reward different behaviours: Aldercroft = standing/alignment; Morrow = responsiveness/clarity                                                 | explicit                  | high          | `03` Morrow & Aldercroft; `08` B05 route-unlock contract                                                                         |
|  19 | Samira and Camila both start at 40, one below the 41 gate — must be actively earned                                                                      | implied                   | high          | `05`/`07` starting values & thresholds; `12` `optional.samira.figure.credit`, `optional.camila.initial.careful`                  |
|  20 | Gabriel trust ≥61 unlocks a physical shortcut — the only relationship-as-geometry mechanic                                                               | explicit                  | high          | `06` routes/sightlines; `12` `MR-OPT-GABRIEL-QUEUE` (+10 from 60)                                                                |
|  21 | Optional scenes cost 1 period / 0 energy; several are strictly efficient (Samira EV+1; Gabriel shortcut)                                                 | implied                   | medium-high   | `12` `MR-ACT-RELATIONSHIP`; `optional.samira.figure.*` effects; vs 4-period experiment cycles                                    |
|  22 | Honest play yields _less_ content: two optional scenes and one citation require a visible record mismatch                                                | interpretation            | high          | `12` `MR-OPT-HAORAN-MISSING-REPLICATE`, `MR-OPT-GABRIEL-ARCHIVE`, `MR-CIT-08`                                                    |
|  23 | Reviewer 3's objection is fiction-level correct and unanswerable; the honest response is to concede                                                      | implied                   | high          | `03` reviewer table; `04` repair state "does not cause recovery"; `record.piimEditor.body`                                       |
|  24 | Preprint posts in every run regardless of packet quality — guaranteed irreversible complicity beat                                                       | explicit                  | high          | `03` submission ladder; `12` `MR-SCN-PUBLIC-RECORD` ("The preprint posts in every run")                                          |
|  25 | Public-record withdrawal is the most scrupulous act and forces the worst ending                                                                          | explicit                  | high          | `03` Week 14 table; `07` B06 resolution; `08` compatibility contract                                                             |
|  26 | End of Contract cannot be chosen; Out of Scope is the dignified voluntary exit                                                                           | explicit                  | high          | `07` B06 final-state; `08` B06 contract; `MR-CIT-11`/`MR-CIT-12`                                                                 |
|  27 | Endings modular: 4 labels + 29 modules, no moral ranking, no post-Week-16 randomness                                                                     | explicit                  | high          | `03` B06 epilogue; `08` modular structure + inventory; `12` ending draft                                                         |
|  28 | Replay driven only by 12 Institutional Citations; ≥3 runs needed for all 12; no carryover advantage                                                      | explicit / interpretation | high          | `08` archive rules; `12` citation table (MR-CIT-09/10/11/12 mutually exclusive); `10` archive/replay                             |
|  29 | Environment is a budgeted mood instrument; environmental text is never load-bearing                                                                      | explicit                  | high          | `06` act states, change limits, B10 boundary; `12` environmental catalogue                                                       |
|  30 | Exit becomes inviting from Week 8 for every player, independent of route                                                                                 | explicit                  | high          | `06` semester states; `09` lighting                                                                                              |
|  31 | Exploration is not a discovery mechanic: no inventory, pickups, hidden objects, minimap, or arrows                                                       | explicit                  | high          | `06` stations/objects; `02`; `10` interaction principles                                                                         |
|  32 | Non-interactive content ~16 min (14:45 scenes + 75 s epilogue) of ~180 min                                                                               | explicit                  | high          | `12` scene durations; `02`/`03` 14–18-min target and 22-min maximum                                                              |
|  33 | Content is bounded, counted, and non-generative (6/7/10/20/29/12/30; ≤6,000 unique words)                                                                | explicit                  | high          | `12` authority table + `MR-TEST-CONT-001`; `11` content/strings contract; `05` dialogue boundary                                 |
|  34 | ~60 total meaningful decisions across 3 hours, placing heavy weight on legibility per decision                                                           | interpretation            | medium        | `07` period budgets vs `07` three-hour principle; `02` cost tables                                                               |
|  35 | A pre-authored 90-minute fallback and a Week-1 vertical slice exist as scope contingencies                                                               | explicit                  | high          | `12` fallback/slice sections                                                                                                     |
|  36 | Save design is protective but anti-undo: one active save, safe points only, locked seeds, no rewind                                                      | explicit                  | high          | `07` continuity; `08` local-data contract; `10` save/archive; `11` persistence + backup store                                    |
|  37 | Real time never advances game state; no idle pressure                                                                                                    | explicit                  | high          | `10`; `11` safe-point scheduler + CampaignState prohibitions                                                                     |
|  38 | The game behaves with the integrity the institution lacks (disclosure, no surprise interruption, stated expiries)                                        | interpretation            | high          | `02` interruptions/continuity; `03` invariants; `07` gates; `10` UI rules                                                        |
|  39 | No moral score anywhere; integrity warnings factual; citations un-ranked                                                                                 | explicit                  | high          | `05` dialogue principles; `07` integrity display; `08`/`12` `MR-CIT-07`                                                          |
|  40 | Aesthetic = stylized institutional realism with an explicit prohibited-style list; organoids and data are the only advanced visuals; PI office is warmer | explicit                  | high          | `09` thesis, palette, effects; `06` PI-office note & floor presentation                                                          |
|  41 | Humour = bureaucratic euphemism and self-justification; no villains; satire aimed upward with protected groups excluded                                  | explicit                  | high          | `05` dialogue principles + Elena/Camila rules; `12` env text & `MR-OPT-ELENA-FUTURE`; `06`/`12` B10 environmental boundary       |
|  42 | No voice acting; text-led dialogue; 5 × 8 non-lexical palettes; silent protagonist                                                                       | explicit                  | high          | `05` B08 contract; `09` dialogue sound boundary; `12` audio roles                                                                |
|  43 | Accessibility is route-neutral and extensive; no timed, drag, hold, or precision input anywhere                                                          | explicit                  | high          | `10` baseline + acceptance criteria; `04` B08 science access; `09` presets rule; `11` graphics-profile boundary                  |
|  44 | Target player skews academic/ex-academic, narrative-systems literate, reading-tolerant                                                                   | interpretation            | medium-high   | `12` env & record satire specificity; `03` submission ladder; `05` voice; `10` English-only, desktop-only                        |
|  45 | Explicitly not: simulation, mastery game, optimiser, romance, mobile, localized, moral-scored, or open-ended                                             | explicit                  | high          | `04` safety boundary; `05` no romance; `10` device/language scope; `07` balance principles; `08` no ranking                      |
|  46 | Core loop mechanics (configuration effects, band assignment, evidence-quality rules, monitoring counts, sample/equipment state) are unspecified          | explicit gap              | high          | Absence across `02`, `04`, `07`; inputs named without mappings                                                                   |
|  47 | The protected break has no action ID, cost entry, or content object despite being high-frequency                                                         | implied gap               | medium        | `02`/`07` break rules vs `12` action table omission                                                                              |
|  48 | Optional PI requests, equipment events, Research Status reason strings, and action forecasts are required but not catalogued                             | implied gap               | medium-high   | `07` hybrid request system & causal feedback vs `12` ten `MR-TASK-*` items                                                       |
|  49 | Fabrication's prose weight far exceeds its interactive footprint (essentially one priced menu plus a confession option)                                  | implied                   | medium-high   | Extensive treatment in `03`/`04`/`05`/`07`/`08` vs `12` `MR-SCN-A-REASONABLE-RESPONSE` + `optional.camila.video.confess`         |
|  50 | Week 14 is arithmetically near-saturated (scene period + 3-period response = 4 of 4 periods)                                                             | implied                   | medium        | `12` scene table note "later response action costs 3/2"; `02` 4-periods-per-week structure                                       |
