# Narrative and Campaign

Status: **B10 documented; implementation approval pending**

## Premise

The protagonist enters the final semester of a fixed-term postdoc with genuinely
promising data. Professor Elena Markovic says only a few supplementary data
points and a few more experiments are needed. Publication appears urgent
because it may allow the protagonist to compete for another academic position.

The discovery is real within the fiction. The satire comes from the expanding
definition of sufficient evidence, contradictory incentives, and the mismatch
between the paper's felt urgency and its eventual effect on the protagonist's
life.

## Fictional world frame

The campaign takes place at **Bellwether University**, in the **Department of
Developmental Systems**. The protagonist works in the **Cardiac Patterning
Group**. These names are fictional. The world must not reproduce a real
university, department, research group, or person.

The group uses **The Common Archive** to publish the preprint. **Morrow
Biotech** reads the preprint and contacts the protagonist about assay
development. The company is interested in a credible research result and the
protagonist's experimental judgement. It is not interested in a proven
regenerative treatment.

## Campaign invariants

- The campaign covers a 16-week final semester. It starts and ends at 06:42.
- The player remains on the university research floor. There is no home scene,
  sleep action, or automatic daily reset.
- Day and night change around the player as work, story events, and controlled
  time passages advance the calendar.
- All seven mandatory scenes occur once in every run. State changes their
  content, not their place in the calendar.
- No early failure ends the game. Weak evidence, compromised work, damaged
  relationships, and closed career routes change later content and the final
  choice.
- The fixed weekly gates do not wait for unfinished work. At a gate, the player
  takes a lower-evidence route, narrows the claim, or loses a stated optional
  opportunity.
- Important messages wait until an active experiment reaches a safe stopping
  point. They cannot disappear or interrupt the player without warning.
- The fixed calendar, submission order, and final week do not change between
  runs. Results, available optional scenes, relationships, reports, and career
  routes can change.

## Semester beat sheet

| Week | Act | Required campaign beat |
|---:|---|---|
| 1 | Supplementary data | **Clarified** opens at 06:42. Laser replication and sham work begin. |
| 2 | Supplementary data | Damage-and-recovery range work begins. Gabriel's facility limit creates the first delay. |
| 3 | Supplementary data | Batch evidence creates uncertainty. Samira's imaging conflict appears. |
| 4 | Supplementary data | Repair-state evidence becomes available. Haoran's work-pressure scene can occur. |
| 5 | Supplementary data | **A Complete Narrative** ends the act. Elena opens manuscript work, even with a weak packet. |
| 6 | Manuscript hell | Elena removes cautious wording, then asks for it back. |
| 7 | Manuscript hell | **What We Had** confronts the player with a manuscript close to its first careful form. |
| 8 | Submission | **Public Record** posts the preprint. *Cosmos* and *Knowledge* reject. Camila writes after the second rejection. |
| 9 | Submission | *Developmental Systems Letters* rejects. `PIIM` receives the manuscript. |
| 10 | Competing futures | **Helpful Comments** delivers the `PIIM` reports. Camila's video call can occur. |
| 11–12 | Competing futures | The player answers reviewers and completes the required oxygen-loss work. |
| 13 | Competing futures | Aldercroft sends a final-round invitation or a polite rejection. |
| 14 | Competing futures | **A Reasonable Response** requires resubmission, journal withdrawal, or public-record withdrawal. |
| 15 | Competing futures | `PIIM` gives its final state. Morrow makes an eligible player a formal offer. Elena reacts privately. |
| 16 | Decision | **06:42** moves from the research floor to the exit and the final career choice. |

Weeks 8 and 9 deliberately have no open experiment template. This is not idle
time. Play shifts from laboratory work to the preprint, journal rejections,
manuscript administration, career tasks, and relationships. The batch window
still ends in Week 6. This change of rhythm separates the first experiment
cycle from the reviewer-driven cycle that starts in Week 10.

Weeks 15 and 16 deliberately use emptier rooms and fewer demands. This quiet
tail supports the final choice, but it must not force the player to wait with
no safe way to advance. The private campaign prototype must test this point.
Do not add a reward-generating period sink or filler relationship action before
that evidence exists.

## Mandatory scenes

| Scene | Week | Primary location | Required narrative function |
|---|---:|---|---|
| **Clarified** | 1 | Main laboratory and PI office | Elena sees the overnight result and reframes the next work as a small clarification. |
| **A Complete Narrative** | 5 | PI office | Elena permits manuscript work regardless of packet quality. The packet changes later fragility. |
| **What We Had** | 7 | Player desk and PI office | The third contradictory revision brings the paper close to its original careful version. |
| **Public Record** | 8 | Player desk | The player posts the preprint to The Common Archive. |
| **Helpful Comments** | 10 | Player desk and PI office | The player receives the editor letter and three reports. Elena calls the demands manageable. |
| **A Reasonable Response** | 14 | Player desk and PI office | The player chooses a defensible response, Elena's stronger response, or withdrawal. |
| **06:42** | 16 | Research floor and building exit | The player confirms Aldercroft, accepts Morrow, or leaves without either route. |

Scenes are real-time, skippable, captioned, and safe around checkpoints. The
seven main scenes together target 14–18 minutes. The ending epilogue adds 60–90 seconds inside the
22-minute maximum for all non-interactive scenes. Messages, reports, and
manuscript work remain player-controlled.

## B07 spatial scene staging

Every required scene becomes due at a safe point in its stated week. A lit
office, open door, desk message, voice, or character presence gives an
in-world cue. The player can continue to walk, inspect, and read, but cannot
start another time-costing task before the due scene occurs. This is a time
gate, not a room lock or teleport. The B08 presentation contract controls
camera, animation, audio, and visual execution.

| Scene | Spatial sequence and cue |
|---|---|
| **Clarified** | The player starts at the tissue-culture rack, sees the recovery state, walks to the main laboratory, then follows Elena to the PI office. Control returns at shared desks. |
| **A Complete Narrative** | A warm lit PI office and revision stack call the player from the work loop. |
| **What We Had** | A changed manuscript at shared desks calls the player to the desk, then Elena's office. |
| **Public Record** | A desk message and the manuscript station contain the complete scene. |
| **Helpful Comments** | The editor letter arrives at shared desks. Elena is available in the PI office after the report is read. |
| **A Reasonable Response** | The response board at shared desks leads to the PI-office decision. |
| **06:42** | The dark floor remains walkable. The player follows the now-bright exit route to the glass vestibule. |

## B08 scene presentation and access contract

Scenes use in-engine cinematics with clear framing, slow movement, and few
cuts. External cameras appear only when they add meaning. The camera always
returns control at the correct physical location. Four on-floor characters use
the shared small animation set. Camila, the editor, and reviewers remain remote
during the playable semester.

Dialogue remains text-led. Supporting characters can use original non-lexical
sounds, but they never carry required information or form real words. The
protagonist has no spoken performance. Captions and speaker names are on by
default. Dialogue advances manually, and important choices remain untimed.

Every scene is skippable and safe around a checkpoint. A skip writes a concise
recap of the choice and immediate result into the inbox or Research Status.
Normal scenes do not replay during an active save. The seven main scenes
together remain inside the approved 14-18-minute target, and the modular epilogue remains
inside the 22-minute total non-interactive-scene maximum.

## Submission ladder and peer review

The manuscript moves through four fictional journals in a fixed order.

| Week | Journal or service | Campaign response |
|---:|---|---|
| 8 | The Common Archive | The preprint becomes public in every run. It can be defensible, weak, or compromised. |
| 8 | *Cosmos* | It calls the result “of specialist interest” and says it does not change a broad field. |
| 8 | *Knowledge* | It calls the claim attractive but asks for direct proof rather than inference. |
| 9 | *Developmental Systems Letters* | It calls the observation strong but the mechanism incomplete. |
| 9–10 | *Proceedings of the International Institute of Morphodynamics* (`PIIM`) | It sends the paper to three reviewers and begins the only major-revision round. |

The names parody academic status and journal escalation. Later presentation
must not copy a real journal's logo, page design, or other protected brand
features. Before a public remote, the B10 release plan requires a title and
brand check. No check has occurred yet.

Dr. Leila Haddad is the named `PIIM` editor. She appears only through concise,
polite messages. She calls all reports helpful and asks the player to address
all concerns, even where the reports conflict.

| Reviewer | Fixed position | Variable detail |
|---|---|---|
| Reviewer 1 | Enthusiastic about the observation; asks for clearer batch evidence. | Wording and examples respond to visible evidence quality. |
| Reviewer 2 | Sees assay value; requires the oxygen-loss challenge and careful claims. | The strength of the request responds to claim level and support. |
| Reviewer 3 | Calls laser injury artificial and the repair state a stress response. | Can identify a visible mismatch, but has no hidden knowledge of fabrication. |

`PIIM` gives major revisions, not rejection, in Week 10. It has no second full
review loop. In Week 15, the paper is in one of four states: published,
accepted pending final work, still under review, or rejected/withdrawn. The
outcome is not a moral reward: defensible work can fail, and undetected
fabricated work can publish.

The response uses visible batch-evidence, oxygen-loss, and claim-scope cards.
The three cards set an earned response band. The stored campaign seed chooses
only between adjacent outcomes in that band. Exact card rules are in
08-endings-and-state-matrix.md and 07-systems-and-balance.md.

## Morrow and Aldercroft

### Morrow Biotech

Camila sends her initial Morrow email after the second rejection in Week 8. It
remains actionable until Week 10. If the player ignores it, she sends one
polite follow-up. Ignoring both messages closes the industry route. A reply
can lead to a Week 10 video call and, for an eligible and professionally
reliable player, a Week 15 formal offer for **Research Scientist, Cardiac Assay
Development**.

Eligibility requires the reply, video call, public preprint, at least a
Developing evidence packet, at least 41 Camila working trust, and no
fabrication confession to Camila. The optional drug experiment can strengthen
this route but is never required. A visible conflict can also close the offer.

The Morrow role has multi-year security, clear pay, and better working
conditions. Its trade-offs are product deadlines, client priorities, and less
personal ownership of the work. Camila evaluates what the player says about the
work. She cannot see hidden game state. A confession of fabrication closes the
Morrow offer.

### Aldercroft University

In Week 13, Aldercroft sends either a final-round interview invitation or a
polite rejection. The role is **Assistant Professor of Developmental Cardiac
Systems**. Its application asks for a five-year research plan and evidence of
independent scientific direction. Elena treats the paper as proof of both.

The player must complete the one-period research plan before Week 12. The
invitation also needs two of the following: Coherent or Substantial evidence,
Supportive or Invested PI confidence, and at least 41 Elena working trust. A
serious evidence concern visible to Aldercroft or Elena blocks the route. A
hidden integrity problem alone does not.

The `PIIM` result does not automatically create or remove an Aldercroft
invitation. Publication does not secure the job, and a late journal rejection
does not automatically cancel the interview. In Week 16, an available academic
route means that the player confirms they will attend the interview. The game
does not show the interview.

## Optional character scenes

There are ten optional character scenes. Their absence removes a possible
benefit or relationship change; it does not end the campaign. The Morrow
email rule is the only exception. The game signals availability through normal
desk messages, room changes, and character presence. It uses no quest markers.

| Character | Scene | Window | Spatial anchor | Narrative purpose |
|---|---|---|---|---|
| Haoran | **Borrowed Time** | Weeks 1–4 | Tissue-culture room | He asks for help with work that is at risk. |
| Haoran | **The Missing Replicate** | Weeks 9–14 | Shared desks | He questions missing or altered evidence where the record supports concern. |
| Samira | **Shared Instrument** | Weeks 2–5 | Imaging booking board | The player shares, negotiates for, or takes imaging time. |
| Samira | **Not in My Figure** | Weeks 6–12 | Shared desks or break room | She offers useful evidence and asks for proper credit. |
| Gabriel | **The Queue** | Weeks 1–4 | Facility station | He asks the player to accept a facility delay or limit. |
| Gabriel | **The Archive** | Weeks 10–14 | Imaging service alcove | He notices a supported mismatch in the evidence record and can warn the player. |
| Elena | **The Future** | Weeks 6–9 | PI office after-hours | An after-hours conversation shows grant-renewal pressure and fear. |
| Camila | Initial email | Weeks 8–10 | Protagonist desk | The player can reply to Morrow's first approach. |
| Camila | Video call | Week 10 | Protagonist desk | The player explains the work carefully, strongly, or dishonestly. |
| Camila | Formal offer conversation | Week 15 | Protagonist desk | The player receives or loses the Morrow offer. |

## Manuscript, credit, and integrity choices

The revision board has three approved title and claim forms:

| Claim level | Title form |
|---|---|
| Careful | *Transient Repatterning Accompanies Spatial-Rhythmic Recovery in Cardiac Tissue* |
| Strong | *Transient Repatterning Supports Spatial-Rhythmic Recovery in Cardiac Tissue* |
| Inflated | *Reconstructive Rhythmogenesis Governs Cardiac Tissue Recovery* |

Elena can force movement between these forms, then ask for the careful version
again. She uses the phrase “minor revisions” in Week 1 and Week 7. After the
formal `PIIM` major-revision decision, she again calls the work minor revisions
“in the useful sense.”

The protagonist is first author and Elena is senior author. Haoran can earn,
lose, or be denied co-authorship through the player's choices. Samira must
receive co-authorship if the player uses her useful evidence.

The player can report results honestly, selectively exclude valid evidence,
alter an existing result, or invent a result. The game provides no practical
method for falsification. Such choices occur as clear narrative actions on the
analysis or manuscript board.

Fabrication can remain undiscovered. Haoran and Gabriel can only notice a
mismatch supported by the player's visible evidence trail. They can confront or
distance themselves, but they do not automatically report the player. The
player can deny, conceal, or confess. The paper, relationships, and career
routes react to evidence and disclosed actions, not random punishment.

## Week 14 response and Week 15 consequences

| Week 14 choice | Week 15 response |
|---|---|
| Defensible resubmission | `PIIM` gives a state based on evidence, claims, and reviewer concerns. |
| Elena's stronger response | The player can use selective reporting, altered results, or fabrication. `PIIM` can still publish if concerns appear answered. |
| Journal withdrawal | `PIIM` records the withdrawal. The public preprint can remain available. |
| Public-record withdrawal | The player also removes the preprint. This can remove both career routes. |

The B05 response-band and route rules determine the Week 15 state. The
narrative calendar does not change after any Week 14 choice.

## Final choice and ending boundary

At 06:42 in Week 16, the player walks from the dark research floor to the
building exit. If routes remain available, the player can confirm the
Aldercroft interview, accept Morrow's offer, or leave without either. Leaving
is a deliberate uncertain choice, not a hidden best ending. A poor run can
leave neither route viable.

A short approved modular epilogue follows the confirmation.

## B06 epilogue contract

Each ending takes place six months after the Week 16 choice. It lasts 60–90
seconds and follows one fixed order: career scene, paper-aftershock, one
relationship afterbeat, 4–6-second final image, then the ending summary. The
epilogue is real-time, skippable, captioned, and safe around checkpoints.

| Career ending | Label | Compact non-explorable setting | Central consequence |
|---|---|---|---|
| Aldercroft chosen | **Pending Appointment** | Bellwether desk or PI office | A temporary bridge appointment and another committee delay; the interview does not prove a permanent job. |
| Morrow chosen | **Transferable Skills** | Small Morrow assay room | The player has stability and product pressure, not perfect rescue. |
| Deliberate departure | **Out of Scope** | University exit with a short outward view | The player has uncertainty, relief, and an open future. |
| No viable route | **End of Contract** | Cleared Bellwether desk, then exit | The fixed term ends, but the player retains agency beyond the university. |

The final image is an external wide shot. It shows the protagonist only from
behind or as a silhouette, then fades to the ending card. B08 fixes the final
camera and visual-treatment boundary.

The paper-aftershock uses one short object, message, or spoken line, rather
than another scene. A published paper becomes an item in another request or
meeting; accepted final work continues through routine administration; an
under-review paper remains unresolved; and rejected or withdrawn work either
remains available as a preprint or has a clear cost when its public record is
removed. It adds no new random paper result.

## B10 content map and authored draft

The authoritative content catalogue and initial English draft are in
`12-content-specification.md`. The mandatory scene IDs are:

- `MR-SCN-CLARIFIED`
- `MR-SCN-A-COMPLETE-NARRATIVE`
- `MR-SCN-WHAT-WE-HAD`
- `MR-SCN-PUBLIC-RECORD`
- `MR-SCN-HELPFUL-COMMENTS`
- `MR-SCN-A-REASONABLE-RESPONSE`
- `MR-SCN-0642`

The ten optional scene IDs, twenty primary records, request prerequisites,
expiries, state effects, captions, and skip recaps are also authoritative in
that document. The full campaign uses all seven mandatory scenes and ten
optional character scenes. The fallback uses all mandatory scenes, four local
character scenes, and the three Camila contacts; it removes the three named
late or early local scenes and drug exposure.

No future content system may generate dialogue freely. A main scene has at
most two meaningful state variants. An optional scene or report has at most two
meaningful variants. The selection is saved and one-time content does not
repeat in a campaign.

Before a public remote exists, a title-conflict and brand check must examine
*Minor Revisions*, the fictional journal names, and the fictional organization
names. The game must not copy real journal branding or imply real affiliation.
