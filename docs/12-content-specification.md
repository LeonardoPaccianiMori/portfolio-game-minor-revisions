# Content Specification

Status: **B10 documented; implementation approval pending**

## Authority and scope

This is the authoritative B10 catalogue and initial English draft for
*Minor Revisions*. It defines the shipped content boundary. The later runtime
must encode the non-text fields in validated JSON and put all player-facing
English text only in strings.en.json. Those future files do not exist yet.

No runtime system may create free-form dialogue, reports, notices, or endings.
It can only select an approved item or an approved saved variant from this
catalogue. A content revision that changes a condition, effect, cost, text
meaning, or count requires an approved design decision.

The full game has:

| Content family | Full-game count | Fallback count or rule |
|---|---:|---|
| Experiment templates | 6 | 4: laser/sham, combined range/repair, batch, oxygen |
| Mandatory scenes | 7 | All 7 |
| Optional character scenes | 10 | 7: four local scenes and the three Camila contacts |
| Primary records | 20 | 18; drug and separate repair records are absent |
| Ending modules | 29 | All 29 |
| Institutional Citations | 12 | All 12 |
| Environmental text items | 30 | 20 selected items; no required fact depends on them |

The released English text must contain no more than 6,000 unique words. Count
words after lowercasing strings.en.json. Count names and contractions as words.
Ignore identifiers, markup, and punctuation. This document is below that
limit; the later content check must measure the generated string file.

The fallback is a coherent 90-minute game, not a damaged full game. It keeps
the complete five-act story, all mandatory scenes, all ending types, and the
industry route. It removes drug exposure, Haoran's late scene, Samira's early
scene, Gabriel's late scene, and their related non-essential variants.

## Stable identifier and text-key rules

Every stable content identifier begins with MR-. Requirements use the separate
form MR-REQ-DOMAIN-NUMBER. Content objects use one of these prefixes:

| Prefix | Use |
|---|---|
| MR-SCN- | Mandatory scene |
| MR-OPT- | Optional character scene or contact |
| MR-EXP- | Full-game experiment template |
| MR-FB- | Fallback-only composition |
| MR-ACT- | Player action |
| MR-TASK- | In-world request or work item |
| MR-REC- | Primary record |
| MR-ENV- | Environmental text item |
| MR-CIT- | Institutional Citation |
| MR-END- | Ending module |
| MR-TUT- | Tutorial prompt |
| MR-UI- | Menu, warning, or interface string |
| MR-AUD- | Dialogue-sound, ambience, or cue role |
| MR-MUS- | Music-stem role |

A text key is a stable lower-case dot path. Examples are
scene.clarified.elena.opening and record.cosmos.body. Each text key occurs
once in strings.en.json. Content JSON refers to keys and never repeats English
text.

Each future content object must contain:

- id;
- type;
- week or act window;
- prerequisite IDs and conditional state;
- expiry or permanent availability;
- one-time or repeat rule;
- state effects and action-cost ID;
- text keys;
- linked requirements; and
- linked test IDs.

## Effect notation and common action catalogue

This catalogue uses the following short forms. The later JSON stores the full
typed effects.

| Short form | Meaning |
|---|---|
| P+N or P-N | PI confidence changes by N |
| I+N or I-N | Integrity changes by N, subject to the approved recovery limit |
| T:Name+N or T:Name-N | Named working-trust change |
| EV+N | Evidence-support change |
| FLAG:name | A permanent consequence flag |
| ROUTE:name | A career-route state change |

All effects occur only after the player confirms the related action. A dialogue
choice never silently spends time. The main action IDs and costs are fixed:

| Action ID | Action | Periods | Standard energy | Requirement | Test |
|---|---|---:|---:|---|---|
| MR-ACT-SAMPLE-CONFIGURE | Select and configure a sample group | 1 | 1 | MR-REQ-LOOP-001 | MR-TEST-EXP-001 |
| MR-ACT-START-FOCUSED | Start laser/sham, repair-state, or drug work | 1 | 1 | MR-REQ-LOOP-001 | MR-TEST-EXP-001 |
| MR-ACT-START-INTENSE | Start range, batch, oxygen, or repeat work | 2 | 2 | MR-REQ-LOOP-001 | MR-TEST-EXP-001 |
| MR-ACT-MONITOR-ROUTINE | Routine monitor or stop | 1 | 0 | MR-REQ-LOOP-001 | MR-TEST-EXP-001 |
| MR-ACT-MONITOR-QUALITY | Quality check or stabilizing monitor | 1 | 1 | MR-REQ-LOOP-001 | MR-TEST-EXP-001 |
| MR-ACT-ANALYSE | Analyse a record and create an evidence card | 1 | 1 | MR-REQ-EXP-001 | MR-TEST-EXP-001 |
| MR-ACT-REPORT-ELENA | Report a completed request to Elena | 1 | 0 | MR-REQ-NARR-002 | MR-TEST-NARR-001 |
| MR-ACT-MANUSCRIPT-DRAFT | Create initial manuscript draft | 3 | 2 | MR-REQ-LOOP-001 | MR-TEST-NARR-001 |
| MR-ACT-MANUSCRIPT-COMMIT | Commit PI revision or preprint | 1 | 1 | MR-REQ-NARR-001 | MR-TEST-NARR-001 |
| MR-ACT-PIIM-COMMIT | Commit PIIM response or withdrawal | 3 | 2 | MR-REQ-NARR-001 | MR-TEST-NARR-001 |
| MR-ACT-CAREER-FOCUSED | Complete research plan or Morrow video call | 1 | 1 | MR-REQ-CHAR-001 | MR-TEST-CHAR-001 |
| MR-ACT-RELATIONSHIP | Reply to Morrow or complete local optional scene | 1 | 0 | MR-REQ-CHAR-001 | MR-TEST-CHAR-001 |

The five middle mandatory scenes advance one period without energy cost.
Clarified and 06:42 have no separate period cost. The controller shows the
cost before the player confirms it.

### Action, experiment, and task English draft

The Action column above is the exact action label. The runtime uses these
matching text keys:

| Text key | Initial English text |
|---|---|
| action.sampleConfigure.label | Select and configure sample group |
| action.startFocused.label | Start focused experiment |
| action.startIntense.label | Start intensive experiment |
| action.monitorRoutine.label | Monitor or stop |
| action.monitorQuality.label | Run quality check |
| action.analyse.label | Analyse and create evidence card |
| action.reportElena.label | Report to Elena |
| action.manuscriptDraft.label | Create initial manuscript draft |
| action.manuscriptCommit.label | Commit revision |
| action.piimCommit.label | Commit PIIM response |
| action.careerFocused.label | Complete career action |
| action.relationship.label | Continue conversation |

| Text key | Initial English text |
|---|---|
| experiment.laserSham | Repeat the recovery result with a matched sham. Keep the comparison visible. |
| experiment.damageRange | Ask where recovery remains clear, mixed, or absent. Do not turn one condition into a universal boundary. |
| experiment.batchCheck | Check whether a second batch resembles the first without demanding that it become identical. |
| experiment.repairState | Read whether repatterning appears alongside recovery. The result can show association, not cause. |
| experiment.oxygenLoss | Test whether the recovery pattern remains interpretable after the oxygen-loss challenge. |
| experiment.drugExposure | Test a bounded drug-response question. The result can inform assay use, not promise a treatment. |
| task.laserSham | Replicate the initial recovery result and include the sham. |
| task.damageRange | Map the limited range of the recovery pattern. |
| task.batchCheck | Check one additional tissue batch. |
| task.repairState | Read the repair-state signal with structure and rhythm. |
| task.manuscript | Draft the paper with the packet that exists, not the packet that would be convenient. |
| task.preprint | Post the current manuscript to The Common Archive. |
| task.morrowReply | Reply to Camila before the conversation window closes. |
| task.researchPlan | Complete the five-year research plan before Week 12. |
| task.piimOxygen | Answer the required oxygen-loss question before the response deadline. |
| task.piimResponse | Submit a response, withdraw from PIIM, or withdraw the public record. |
| manuscript.claim.careful | Recovery is linked to a transient repatterning state. |
| manuscript.claim.strong | The transient repatterning state supports recovery in this model. |
| manuscript.claim.inflated | Treat the transient repatterning state as if it governs recovery. This is unsupported. |
| manuscript.requirements.title | Active requirements |
| manuscript.requirements.missing | The current draft has a visible evidence or authorship gap. |
| manuscript.requirements.commit | Commit this revision? The record cannot be restored from an earlier snapshot. |

## Selection, variants, and repeat prevention

- A mandatory scene has one base variant and, at most, one saved low-evidence
  variant. It runs once.
- An optional scene has one base variant and, at most, one saved conditional
  variant. It runs once or expires once.
- A primary record can have result variants. The selected variant is saved
  with the record and never rerolls.
- A repeat is allowed only once for laser/sham, range, batch, or repair-state
  work. It is a second run of the same template, not new content.
- An environmental item can be inspected once for its full text. It remains
  visible as dressing after the first inspection.
- A citation can unlock once. Its archive entry remains available.

## Work-item and experiment catalogue

The six full-game templates use the approved qualitative baselines. They never
show quantities, settings, timings, or a real protocol. A strong result gives
the stated strong reading; a limited result gives the stated limited reading;
a weak result gives the stated weak reading.

| ID | Window and expiry | Prerequisite | Baseline: strong / limited / weak | Completion effect | Text key | Requirement / test |
|---|---|---|---|---|---|---|
| MR-EXP-LASER-SHAM | W1 after Clarified to W4 after-hours | MR-SCN-CLARIFIED | Clear recovery with stable sham / partial recovery or unclear control / unreliable record | Creates MR-REC-LASER-SHAM; supports the next request | experiment.laserSham | MR-REQ-EXP-001 / MR-TEST-EXP-001 |
| MR-EXP-DAMAGE-RANGE | W2 early to W4 after-hours | Analysed laser/sham record | Clear recovery boundary / mixed recovery range / no useful range | Creates MR-REC-DAMAGE-RANGE | experiment.damageRange | MR-REQ-EXP-001 / MR-TEST-EXP-001 |
| MR-EXP-BATCH-CHECK | W3 early to W6 after-hours | Analysed laser/sham record | Similar response in another batch / partial or mixed second batch / mismatch or unreliable batch | Creates MR-REC-BATCH-CHECK and PIIM batch card input | experiment.batchCheck | MR-REQ-EXP-002 / MR-TEST-EXP-001 |
| MR-EXP-REPAIR-STATE | W4 early to W6 after-hours | Analysed damage-range record | Repatterning tracks recovery / tracks only part of recovery / stress signal unclear | Creates MR-REC-REPAIR-STATE | experiment.repairState | MR-REQ-EXP-003 / MR-TEST-EXP-001 |
| MR-EXP-OXYGEN-LOSS | W10 after Helpful Comments to W12 after-hours; analysis before W14 | MR-SCN-HELPFUL-COMMENTS | Constrained recovery after challenge / delayed or mixed recovery / no usable recovery | Creates MR-REC-OXYGEN-LOSS and PIIM oxygen card input | experiment.oxygenLoss | MR-REQ-EXP-001 / MR-TEST-EXP-001 |
| MR-EXP-DRUG-EXPOSURE | W10 after Camila contact to W12 after-hours; analysis before W14 | MR-OPT-CAMILA-INITIAL | Useful condition-dependent response / mixed response / unreliable response | Creates MR-REC-DRUG-EXPOSURE; can strengthen Morrow context | experiment.drugExposure | MR-REQ-EXP-001 / MR-TEST-EXP-001 |

MR-EXP-REPAIR-STATE is associated with recovery. It never proves that the
repair state causes recovery. This rule applies to every result string,
manuscript option, report, and ending module.

The work items are:

| ID | Work item | Window / expiry | Depends on | Completion and effect | Text key | Test |
|---|---|---|---|---|---|---|
| MR-TASK-LASER-SHAM | Replicate the initial result with a sham | W1–W4 | Clarified | Enables laser/sham record and report to Elena | task.laserSham | MR-TEST-EXP-001 |
| MR-TASK-DAMAGE-RANGE | Establish a limited recovery range | W2–W4 | Laser/sham analysis | Enables range record | task.damageRange | MR-TEST-EXP-001 |
| MR-TASK-BATCH-CHECK | Check a second tissue batch | W3–W6 | Laser/sham analysis | Enables batch record and later PIIM card | task.batchCheck | MR-TEST-EXP-001 |
| MR-TASK-REPAIR-STATE | Read the repair-state signal carefully | W4–W6 | Damage-range analysis | Enables repair-state record | task.repairState | MR-TEST-EXP-001 |
| MR-TASK-MANUSCRIPT | Draft the paper with the current packet | W5–W7 | A Complete Narrative | Requires MR-ACT-MANUSCRIPT-DRAFT | task.manuscript | MR-TEST-NARR-001 |
| MR-TASK-PREPRINT | Commit and post the preprint | W8 only | Manuscript draft | Sets public-record state | task.preprint | MR-TEST-NARR-001 |
| MR-TASK-MORROW-REPLY | Reply to Camila | W8–W10 | Morrow initial contact | Opens video-call eligibility | task.morrowReply | MR-TEST-CHAR-001 |
| MR-TASK-RESEARCH-PLAN | Draft five-year research plan | W8–W11 | Manuscript draft | Required for Aldercroft eligibility | task.researchPlan | MR-TEST-CHAR-001 |
| MR-TASK-PIIM-OXYGEN | Answer the oxygen-loss request | W10–W12 | Helpful Comments | Opens PIIM oxygen response card | task.piimOxygen | MR-TEST-EXP-001 |
| MR-TASK-PIIM-RESPONSE | Submit response, withdraw journal, or withdraw record | W14 only | PIIM reports | Sets Week-15 paper state path | task.piimResponse | MR-TEST-NARR-001 |

The fallback replaces MR-EXP-DAMAGE-RANGE and MR-EXP-REPAIR-STATE with
MR-FB-EXP-RANGE-REPAIR. It uses one combined qualitative result: a clear,
mixed, or weak relation between recovery and repatterning. It has no separate
causal claim and creates MR-FB-REC-RANGE-REPAIR. It is not a seventh
full-game template.

## Primary-record catalogue

Primary records are the readable records that move the main story or explain
a main experiment. They are not all possible evidence cards. A repeat creates
a linked repeat note under its original experiment record and does not add a
new primary-record ID.

| ID | Type and delivery | Week / expiry | Dependencies and effects | Text key | Requirement / test |
|---|---|---|---|---|---|
| MR-REC-PROJECT-NOTEBOOK | Project notebook at shared desks | W1; permanent | After Clarified; explains current work | record.projectNotebook | MR-REQ-CONTENT-002 / MR-TEST-CONT-001 |
| MR-REC-LASER-SHAM | Analysis record | W1–W4; permanent after analysis | MR-EXP-LASER-SHAM; evidence-card source | record.laserSham | MR-REQ-EXP-001 / MR-TEST-EXP-001 |
| MR-REC-DAMAGE-RANGE | Analysis record | W2–W4; permanent after analysis | MR-EXP-DAMAGE-RANGE; evidence-card source | record.damageRange | MR-REQ-EXP-001 / MR-TEST-EXP-001 |
| MR-REC-BATCH-CHECK | Analysis record | W3–W6; permanent after analysis | MR-EXP-BATCH-CHECK; PIIM batch-card source | record.batchCheck | MR-REQ-EXP-002 / MR-TEST-EXP-001 |
| MR-REC-REPAIR-STATE | Analysis record | W4–W6; permanent after analysis | MR-EXP-REPAIR-STATE; claim-scope context | record.repairState | MR-REQ-EXP-003 / MR-TEST-EXP-001 |
| MR-REC-OXYGEN-LOSS | Analysis record | W10–W13; permanent after analysis | MR-EXP-OXYGEN-LOSS; PIIM oxygen-card source | record.oxygenLoss | MR-REQ-EXP-001 / MR-TEST-EXP-001 |
| MR-REC-DRUG-EXPOSURE | Analysis record | W10–W13; permanent after analysis | MR-EXP-DRUG-EXPOSURE; Morrow context only | record.drugExposure | MR-REQ-EXP-001 / MR-TEST-EXP-001 |
| MR-REC-MANUSCRIPT-V1 | Manuscript snapshot | W5–W8; permanent after commit | Initial draft; claim-level record | record.manuscriptV1.careful, record.manuscriptV1.strong, or record.manuscriptV1.inflated | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-REC-PREPRINT-RECEIPT | Common Archive receipt | W8; permanent | Public Record; sets public preprint | record.preprintReceipt | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-REC-COSMOS | Journal rejection | W8; permanent | Public record | record.cosmos | MR-REQ-NARR-002 / MR-TEST-NARR-001 |
| MR-REC-KNOWLEDGE | Journal rejection | W8; permanent | Cosmos delivered | record.knowledge | MR-REQ-NARR-002 / MR-TEST-NARR-001 |
| MR-REC-DSL | Journal rejection | W9; permanent | Knowledge delivered | record.dsl | MR-REQ-NARR-002 / MR-TEST-NARR-001 |
| MR-REC-PIIM-RECEIPT | PIIM receipt | W9; permanent | DSL delivered | record.piimReceipt | MR-REQ-NARR-002 / MR-TEST-NARR-001 |
| MR-REC-REVIEWER-1 | Reviewer 1 report | W10; permanent | Helpful Comments | record.reviewer1 | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-REC-REVIEWER-2 | Reviewer 2 report | W10; permanent | Helpful Comments | record.reviewer2 | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-REC-REVIEWER-3 | Reviewer 3 report | W10; permanent | Helpful Comments | record.reviewer3 | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-REC-PIIM-EDITOR | Editor letter | W10; permanent | Reviewer reports | record.piimEditor | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-REC-MORROW-CONTACT | Morrow email thread | W8–W10; permanent after first delivery | Knowledge rejection; expiry can close Morrow | record.morrowContact.initial or record.morrowContact.followUp | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-REC-ALDERCROFT | Aldercroft letter | W13; permanent | Research-plan and route check | record.aldercroft.invitation or record.aldercroft.rejection | MR-REQ-END-001 / MR-TEST-END-001 |
| MR-REC-PIIM-FINAL | PIIM final decision | W15; permanent | Week-14 response band | record.piimFinal.published, record.piimFinal.accepted, record.piimFinal.review, or record.piimFinal.rejected | MR-REQ-END-001 / MR-TEST-END-001 |

## Mandatory scene scripts

Each mandatory scene is real-time, skippable, captioned, and safe at a
checkpoint. Its skip recap is part of the stated text. The planned main-scene
time is 14 minutes 45 seconds. A 75-second epilogue keeps the total below the
22-minute non-interactive limit.

| ID | Week | Duration | Start condition | Period effect | Variant rule | Requirement / test |
|---|---:|---:|---|---|---|---|
| MR-SCN-CLARIFIED | 1 | 2:20 | Game opening | None | One base form | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-SCN-A-COMPLETE-NARRATIVE | 5 | 1:50 | First safe point in W5 | Advance 1, energy 0 | Packet base or low-evidence | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-SCN-WHAT-WE-HAD | 7 | 2:10 | First safe point in W7 | Advance 1, energy 0 | Claim-alignment base or conflict | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-SCN-PUBLIC-RECORD | 8 | 1:15 | Manuscript committed | Advance 1, energy 0 | Careful/strong presentation only | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-SCN-HELPFUL-COMMENTS | 10 | 2:40 | PIIM reports ready | Advance 1, energy 0 | Stronger or weaker evidence wording | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-SCN-A-REASONABLE-RESPONSE | 14 | 2:20 | Response board ready | Advance 1, energy 0; later response action costs 3/2 | One base form | MR-REQ-NARR-001 / MR-TEST-NARR-001 |
| MR-SCN-0642 | 16 | 2:10 | W16 after-hours | None | Available-route form | MR-REQ-END-001 / MR-TEST-END-001 |

### MR-SCN-CLARIFIED

Location: tissue-culture rack, main laboratory, then PI office. Prerequisite:
new game. Completion creates MR-REC-PROJECT-NOTEBOOK and
MR-TASK-LASER-SHAM. It also saves one opening stance. This stance changes
Elena's first response but not the laboratory outcome.

| Beat | Speaker | Text key | Initial English text |
|---|---|---|---|
| 1 | Internal | scene.clarified.internal.opening | The tissue should not be doing that. It has had a long night and no grant deadline. |
| 2 | Elena | scene.clarified.elena.opening | It recovered. Good. Do not celebrate yet. We need to make the result unarguable. |
| 3 | Elena | scene.clarified.elena.request | Run the replication and the sham. Then map the range. Then check another batch. A few supplementary pieces. |
| 4 | Player choice A | scene.clarified.choice.start | Start with the replication and sham. |
| 5 | Player choice B | scene.clarified.choice.limit | First, write down what this result does not show. |
| 6 | Elena after A | scene.clarified.elena.afterStart | Exactly. Precision first. Then we can use a more useful word than preliminary. |
| 7 | Elena after B | scene.clarified.elena.afterLimit | Of course. We will be careful after we have enough evidence to be confident. |
| 8 | Internal | scene.clarified.internal.close | A few supplementary pieces is a phrase with a flexible skeleton. |

Choice A effect: P+5. Choice B effect: P-5 and FLAG:openingCaution. Neither
choice changes the required task. Skip recap key:
scene.clarified.recap — Elena calls the recovery result promising and asks for
replication, sham, range, batch, and repair-state evidence.

### MR-SCN-A-COMPLETE-NARRATIVE

Location: PI office. Prerequisite: W5 safe point. Completion creates
MR-TASK-MANUSCRIPT. The scene uses the low-evidence form if the packet is Thin
or Developing.

| Beat | Speaker | Text key | Base English text |
|---|---|---|---|
| 1 | Elena | scene.complete.elena.opening | We have a complete narrative. |
| 2 | Player | scene.complete.player.question | Complete enough to write, or complete enough to submit? |
| 3 | Elena | scene.complete.elena.answer | Writing is how a result learns what it still needs. Start the draft. |
| 4 | Player choice A | scene.complete.choice.careful | Draft the careful claim first. |
| 5 | Player choice B | scene.complete.choice.strong | Draft the strongest claim the current record can carry. |
| 6 | Elena | scene.complete.elena.close | Good. We can make it cautious later, once it has acquired momentum. |
| 7 | Internal | scene.complete.internal.close | The paper now exists as a future argument with a file name. |

Low-evidence replacement for beat 1:
scene.complete.elena.lowEvidence — We have enough of a narrative to begin
repairing it in public.

Choice A effect: P-5 and default manuscript claim Careful. Choice B effect:
P+5 and default manuscript claim Strong. Both create the same work item.
Skip recap key: scene.complete.recap — Elena opens manuscript work even though
the packet remains incomplete.

### MR-SCN-WHAT-WE-HAD

Location: shared desks, then PI office. Prerequisite: initial manuscript
snapshot. Completion requires one MR-ACT-MANUSCRIPT-COMMIT action after the
scene. The conflict form appears if the last committed claim is Inflated or if
a visible requirements warning remains.

| Beat | Speaker | Text key | Base English text |
|---|---|---|---|
| 1 | Internal | scene.whatWeHad.internal.opening | The new file differs from the old file in exactly the way a corridor differs from a maze. |
| 2 | Elena | scene.whatWeHad.elena.request | Put back the first sentence. It was premature then. It has become restrained now. |
| 3 | Player | scene.whatWeHad.player.question | It is almost the first version. |
| 4 | Elena | scene.whatWeHad.elena.answer | Yes. But now it has been revised by history. |
| 5 | Player choice A | scene.whatWeHad.choice.careful | Commit the careful wording. |
| 6 | Player choice B | scene.whatWeHad.choice.strong | Keep the strong wording and mark it for defence. |
| 7 | Elena | scene.whatWeHad.elena.close | This is why revision matters. It gives the original thought a more recent date. |

Conflict replacement for beat 2:
scene.whatWeHad.elena.conflict — Keep the language ambitious. Also restore the
careful version. The reviewer will appreciate that we considered both.

Choice A effect: P-5 and claim Careful. Choice B effect: P+5 and claim Strong.
The player can later make an explicit integrity choice on the board. This scene
does not make one for the player. Skip recap key: scene.whatWeHad.recap —
Elena asks for a return to wording close to the first careful draft.

### MR-SCN-PUBLIC-RECORD

Location: manuscript desk. Prerequisite: W8 and a committed manuscript. The
player must confirm MR-ACT-MANUSCRIPT-COMMIT to post the preprint. Completion
sets the public-record state and creates MR-REC-PREPRINT-RECEIPT.

| Beat | Speaker | Text key | Initial English text |
|---|---|---|---|
| 1 | System | scene.publicRecord.system.ready | The Common Archive is ready to make this version permanent enough for everyone else. |
| 2 | Internal | scene.publicRecord.internal.check | The form asks whether the manuscript is ready. It has a box for yes and no box for not meaningfully. |
| 3 | Player choice | scene.publicRecord.choice.post | Post the preprint. |
| 4 | System | scene.publicRecord.system.posted | Public record created. Revisions will now be called context. |
| 5 | Internal | scene.publicRecord.internal.close | Somewhere outside this floor, the paper has become a fact with a link. |

The careful or strong presentation changes only the title shown on the form.
The preprint posts in every run. Skip recap key: scene.publicRecord.recap —
The manuscript is posted to The Common Archive and becomes public.

### MR-SCN-HELPFUL-COMMENTS

Location: shared desks, then PI office. Prerequisite: W10 safe point.
Completion creates MR-REC-REVIEWER-1, MR-REC-REVIEWER-2,
MR-REC-REVIEWER-3, MR-REC-PIIM-EDITOR, and MR-TASK-PIIM-OXYGEN. The weaker
form appears if the packet is Thin or the claim is Inflated.

| Beat | Speaker | Text key | Base English text |
|---|---|---|---|
| 1 | Editor message | scene.helpful.editor.opening | The reviewers find the manuscript interesting. Please address all concerns in a focused revision. |
| 2 | Elena | scene.helpful.elena.opening | This is excellent. They agree that the paper needs more work. |
| 3 | Player | scene.helpful.player.question | Reviewer Three says the repair state may be stress, not recovery. |
| 4 | Elena | scene.helpful.elena.answer | Then we show that it is a useful stress response with recovery nearby. That is almost the same thing. |
| 5 | Player choice A | scene.helpful.choice.evidence | Build the response around the visible record. |
| 6 | Player choice B | scene.helpful.choice.complete | Build the response around a complete narrative. |
| 7 | Elena | scene.helpful.elena.close | Good. The requests are minor revisions in the useful sense. |

Weaker-form replacement for beat 4:
scene.helpful.elena.weakEvidence — Then we must make the record look less
incomplete. That is a different kind of experiment.

Choice A effect: FLAG:responseEvidenceIntent. Choice B effect:
FLAG:responseNarrativeIntent. Both leave later integrity decisions explicit.
Skip recap key: scene.helpful.recap — PIIM requests batch evidence,
oxygen-loss work, and a careful response to conflicting reviewer concerns.

### MR-SCN-A-REASONABLE-RESPONSE

Location: shared desks, then PI office. Prerequisite: W14 safe point and PIIM
reports read. The player selects one top-level response. A resubmission opens a
second, explicit evidence-handling choice. Every final commitment uses
MR-ACT-PIIM-COMMIT.

| Beat | Speaker | Text key | Initial English text |
|---|---|---|---|
| 1 | Elena | scene.response.elena.opening | We can give them a reasonable response. Reasonable is a broad and generous word. |
| 2 | System | scene.response.system.warning | Your response changes the paper record and may change career routes. Review the evidence cards before you commit. |
| 3 | Player choice A | scene.response.choice.defensible | Submit a defensible response. |
| 4 | Player choice B | scene.response.choice.stronger | Submit Elena's stronger response. |
| 5 | Player choice C | scene.response.choice.withdrawJournal | Withdraw from PIIM. |
| 6 | Player choice D | scene.response.choice.withdrawPublic | Withdraw the public record. |
| 7 | Elena | scene.response.elena.close | Good. It is now a response. The journal may decide whether it is an answer. |

Defensible response effect: uses only supported cards; I unchanged; sets
FLAG:responseDefensible. Stronger response opens exactly one of these clear
second choices:

| Choice | Text key | Effect |
|---|---|---|
| Exclude a valid contrary card | scene.response.stronger.omit | I-10 and FLAG:omission |
| Change a reported reading | scene.response.stronger.alter | I-25 and FLAG:alteredReading |
| Add an unsupported reading | scene.response.stronger.fabricate | I-45 and FLAG:fabrication |

The game gives no method for falsification. Journal withdrawal sets
FLAG:journalWithdrawal. Public-record withdrawal sets FLAG:publicWithdrawal
and closes both routes. Skip recap key: scene.response.recap — The player
chooses a response path, a journal withdrawal, or a public-record withdrawal.

### MR-SCN-0642

Location: research floor and exit vestibule. Prerequisite: W16 after-hours.
The scene reads route availability before it shows choices. It sends the chosen
career label to the ending resolver. The scene does not add random results.

| Beat | Speaker | Text key | Initial English text |
|---|---|---|---|
| 1 | Internal | scene.0642.internal.opening | The clock says 06:42 again. The building has kept excellent records of my presence. |
| 2 | System | scene.0642.system.routes | Available next steps are shown below. You may choose only an available route. |
| 3 | Aldercroft choice | scene.0642.choice.academia | Attend the Aldercroft interview. You do not owe it optimism. |
| 4 | Morrow choice | scene.0642.choice.morrow | Accept Morrow's offer. You do not owe it gratitude. |
| 5 | Leave choice | scene.0642.choice.leave | Leave without choosing either available route. |
| 6 | Neither form | scene.0642.choice.neither | Leave. The building has reached the end of its contract with you. |
| 7 | Internal | scene.0642.internal.close | The door opens with the confidence of a system that will not notice what happens next. |

If no route is available, only the neither form appears. If one or two routes
are available, Leave remains available. Skip recap key: scene.0642.recap —
The player leaves Bellwether through the selected available route, or without
one.

## Optional character-scene scripts

Every optional scene uses MR-ACT-RELATIONSHIP unless it is Camila's video call,
which uses MR-ACT-CAREER-FOCUSED. The action cost is shown before acceptance.
An ignored local scene expires at its stated end point. It changes no main
calendar event. The only route-critical expiry is the Morrow email thread.

| ID | Window / expiry | Entry condition | Main effect type | Fallback | Requirement / test |
|---|---|---|---|---|---|
| MR-OPT-HAORAN-BORROWED-TIME | W1–W4; expires W4 after-hours | Haoran is at tissue culture | Haoran trust | Keep | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-HAORAN-MISSING-REPLICATE | W9–W14; expires W14 after-hours | A visible record supports concern | Haoran trust / concern flag | Remove | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-SAMIRA-SHARED-INSTRUMENT | W2–W5; expires W5 after-hours | Imaging booking conflict | Samira trust | Remove | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-SAMIRA-NOT-IN-MY-FIGURE | W6–W12; expires W12 after-hours | Samira has useful evidence | Samira trust / credit flag | Keep | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-GABRIEL-QUEUE | W1–W4; expires W4 after-hours | Facility limit is active | Gabriel trust / queue state | Keep | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-GABRIEL-ARCHIVE | W10–W14; expires W14 after-hours | A visible record supports concern | Gabriel trust / concern flag | Remove | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-ELENA-FUTURE | W6–W9 after-hours; expires W9 | Elena is present after-hours | Elena trust | Keep | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-CAMILA-INITIAL | W8–W10; follow-up at W10 | Knowledge rejection delivered | Camila trust / Morrow route | Keep | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-CAMILA-VIDEO | W10 only | Initial reply sent | Camila trust / Morrow route | Keep | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |
| MR-OPT-CAMILA-OFFER | W15 only | Morrow eligibility check | Camila trust / offer state | Keep | MR-REQ-CHAR-001 / MR-TEST-CHAR-001 |

### MR-OPT-HAORAN-BORROWED-TIME

Location: tissue culture. Text keys:

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Haoran | optional.haoran.borrowed.opening | The maintenance list has learned to reproduce. I have not. | None |
| Player A | optional.haoran.borrowed.help | I can take the late check. | T:Haoran+10 |
| Player B | optional.haoran.borrowed.plan | Show me what can wait without becoming urgent by email. | T:Haoran+0 |
| Player C | optional.haoran.borrowed.decline | I cannot take another task. | T:Haoran-10 |
| Haoran | optional.haoran.borrowed.close | Thank you. Or understood. Both are useful to know. | None |

Choice A sets FLAG:helpedHaoran. Choice C sets FLAG:declinedHaoran. The scene
does not give or remove the player's evidence.

### MR-OPT-HAORAN-MISSING-REPLICATE

Location: shared desks. This scene appears only when a visible record,
reported reading, or authorship state supports Haoran's concern. It does not
invent hidden knowledge.

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Haoran | optional.haoran.missing.opening | I may be reading this wrong. The record does not line up with the figure. | None |
| Player A | optional.haoran.missing.correct | You are right. I will correct the record. | T:Haoran+10; allowed I recovery; FLAG:correction |
| Player B | optional.haoran.missing.deny | The figure is a summary, not a confession. | T:Haoran-20; FLAG:haoranConcern |
| Player C | optional.haoran.missing.defer | Leave it with me. Do not move it yet. | T:Haoran-10; FLAG:haoranConcern |
| Haoran | optional.haoran.missing.close | I hope the record is still allowed to be more useful than the story. | None |

### MR-OPT-SAMIRA-SHARED-INSTRUMENT

Location: imaging booking board. The player selects a social response, not a
technical setting.

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Samira | optional.samira.shared.opening | The booking system says we both have priority. It does not say which century. | None |
| Player A | optional.samira.shared.share | Take the slot. I can move mine. | T:Samira+10; FLAG:sharedImaging |
| Player B | optional.samira.shared.swap | Can we trade the next useful window instead? | T:Samira+0 |
| Player C | optional.samira.shared.keep | I need this booking for the paper. | T:Samira-10; FLAG:tookImagingPriority |
| Samira | optional.samira.shared.close | Good. The machine remains neutral. We will try to imitate it. | None |

### MR-OPT-SAMIRA-NOT-IN-MY-FIGURE

Location: shared desks or break room. If the player uses Samira's useful
evidence, the authored outcome always credits her as co-author.

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Samira | optional.samira.figure.opening | I have a result that may help your response. I do not want it to become a decorative control. | None |
| Player A | optional.samira.figure.credit | Use it with your name on the paper. | T:Samira+10; EV+1; FLAG:samiraCoauthor |
| Player B | optional.samira.figure.joint | Add it as a joint supplementary note. | T:Samira+0; EV+1; FLAG:samiraCoauthor |
| Player C | optional.samira.figure.separate | Keep it in your record. I will not use it. | T:Samira-10 |
| Samira | optional.samira.figure.close | Credit is a small word for a large ownership problem. | None |

### MR-OPT-GABRIEL-QUEUE

Location: facility station. The facility limit is an authored queue event.

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Gabriel | optional.gabriel.queue.opening | I have one usable slot, three urgent requests, and a policy that believes urgency can be ranked. | None |
| Player A | optional.gabriel.queue.wait | Keep the queue. I will use the later window. | T:Gabriel+10; FLAG:acceptedQueue |
| Player B | optional.gabriel.queue.limited | Use the limited slot and record the limit. | T:Gabriel+0; FLAG:limitedFacilityUse |
| Player C | optional.gabriel.queue.press | My deadline needs priority. | T:Gabriel-10; FLAG:pressedFacility |
| Gabriel | optional.gabriel.queue.close | Thank you. I will enter that into the system as a human decision. | None |

### MR-OPT-GABRIEL-ARCHIVE

Location: imaging service alcove. It appears only if a visible record supports
Gabriel's concern.

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Gabriel | optional.gabriel.archive.opening | The archive has two versions of this reading. It prefers the earlier one. | None |
| Player A | optional.gabriel.archive.correct | Add a correction note and keep both versions visible. | T:Gabriel+10; allowed I recovery; FLAG:correction |
| Player B | optional.gabriel.archive.dismiss | The later figure is the one that matters. | T:Gabriel-20; FLAG:gabrielConcern |
| Player C | optional.gabriel.archive.private | Keep the discrepancy inside the group for now. | T:Gabriel-10; FLAG:gabrielConcern |
| Gabriel | optional.gabriel.archive.close | Archives are patient. They do not need to be persuaded. | None |

### MR-OPT-ELENA-FUTURE

Location: PI office after-hours. The scene reveals pressure without excusing
harm.

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Elena | optional.elena.future.opening | The renewal panel wants a five-year plan. It has not asked whether I will have a fifth year. | None |
| Player A | optional.elena.future.empathy | That is not a reasonable way to run a group. | T:Elena+10 |
| Player B | optional.elena.future.boundary | The deadline is becoming the method. | T:Elena-10; FLAG:challengedElena |
| Player C | optional.elena.future.align | Tell me which result will make the panel calm down. | T:Elena+0; FLAG:alignedWithElena |
| Elena | optional.elena.future.close | Panels do not calm down. They merely move to another meeting. | None |

### MR-OPT-CAMILA-INITIAL

Location: protagonist desk. The initial email appears after Knowledge rejects
the paper. It remains actionable through W10. If ignored, the follow-up uses
the same record. Ignoring both closes Morrow.

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Camila | optional.camila.initial.opening | I read your preprint. The assay question is interesting, especially because you describe its limits. Would you talk? | None |
| Player A | optional.camila.initial.careful | Reply with the current evidence and its limits. | T:Camila+10; ROUTE:morrowConversation |
| Player B | optional.camila.initial.strong | Reply with the strongest supported framing. | T:Camila+0; ROUTE:morrowConversation |
| Player C | optional.camila.initial.defer | Leave the message for later. | None; follow-up remains |
| Camila follow-up | optional.camila.initial.followUp | I know the end of a semester has no spare minutes. I would still value a short call. | None |

Follow-up expiry text key: optional.camila.initial.expired — No reply was
sent. Morrow has filled its current conversation slot. Effect:
ROUTE:morrowClosed.

### MR-OPT-CAMILA-VIDEO

Location: protagonist desk. Prerequisite: a sent reply. The scene is a
one-period focused career action. Camila judges only the player's stated
description.

| Speaker or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Camila | optional.camila.video.opening | We build assays that must survive ordinary use, not only a good figure. What do you think the model can tell us? | None |
| Player A | optional.camila.video.careful | It can show a constrained recovery pattern and where the evidence stops. | T:Camila+10; FLAG:morrowVideoDone |
| Player B | optional.camila.video.strong | It can support a strong assay hypothesis if the limits remain visible. | T:Camila+0; FLAG:morrowVideoDone |
| Player C | optional.camila.video.oversell | I would call it proven, although the record is still catching up. | T:Camila-10; FLAG:morrowConcern; FLAG:morrowVideoDone |
| Player D | optional.camila.video.confess | I changed or invented part of the reported record. | T:Camila-20; ROUTE:morrowClosed; FLAG:confessedToCamila |
| Camila | optional.camila.video.close | Clear limits are not a weakness. They are how a result becomes usable. | None |

### MR-OPT-CAMILA-OFFER

Location: protagonist desk. This is a Week-15 contact, not the final career
choice. If all Morrow conditions pass, it shows the offer form. Otherwise it
shows the no-offer form. The player can keep the offer open for Week 16 or
close it.

| Form or choice | Text key | Initial English text | Effect |
|---|---|---|---|
| Offer | optional.camila.offer.opening | We can offer Research Scientist, Cardiac Assay Development. The work has deadlines, budgets, and fewer committee adjectives. | ROUTE:morrowAvailable |
| Keep open | optional.camila.offer.keep | Keep the offer open until 06:42. | T:Camila+10 |
| Decline now | optional.camila.offer.decline | Thank Camila and decline the offer. | ROUTE:morrowClosed |
| No offer | optional.camila.offer.noOffer | We will not move forward this time. Your work was interesting, but the role needs a clearer fit. | ROUTE:morrowClosed |
| Player | optional.camila.offer.close | Thank you for reading it as work, not as a promise. | None |

## Primary-record English draft

The following strings are the initial English draft for the twenty primary
records. A result record uses exactly one saved result form. It is selected by
the locked outcome and can be read again from the desk record.

| Record ID | Text key | Initial English text |
|---|---|---|
| MR-REC-PROJECT-NOTEBOOK | record.projectNotebook.body | Objective: test whether the recovery result repeats when treated as a result rather than as a prophecy. Keep the sham visible. Keep the limits visible. |
| MR-REC-LASER-SHAM | record.laserSham.strong | Observation: the matched sham remains stable. The damaged group regains a clear boundary and coordinated rhythm. Interpretation: the result is repeatable in this record. |
| MR-REC-LASER-SHAM | record.laserSham.limited | Observation: recovery is partial, or the sham record is unclear. Interpretation: the result can support a limited claim and a clearer repeat. |
| MR-REC-LASER-SHAM | record.laserSham.weak | Observation: the record is unreliable. Interpretation: this run cannot support the claim, but it identifies a control or monitoring problem. |
| MR-REC-DAMAGE-RANGE | record.damageRange.strong | Observation: recovery appears inside a clear limited-damage boundary. Interpretation: the range narrows the question without explaining the mechanism. |
| MR-REC-DAMAGE-RANGE | record.damageRange.limited | Observation: recovery changes across the range, but no single boundary is clear. Interpretation: the manuscript must describe mixed conditions. |
| MR-REC-DAMAGE-RANGE | record.damageRange.weak | Observation: no useful recovery range is visible. Interpretation: do not turn absence of a boundary into a boundary. |
| MR-REC-BATCH-CHECK | record.batchCheck.strong | Observation: a second batch shows a similar recovery pattern. Interpretation: batch support improves confidence but does not make the result universal. |
| MR-REC-BATCH-CHECK | record.batchCheck.limited | Observation: the second batch partly resembles the first. Interpretation: the response can state partial batch support. |
| MR-REC-BATCH-CHECK | record.batchCheck.weak | Observation: the batch differs or is unreliable. Interpretation: the paper must retain a batch limitation. |
| MR-REC-REPAIR-STATE | record.repairState.strong | Observation: the repatterning index rises while tissue pattern and rhythm recover. Interpretation: the repair state is associated with recovery. |
| MR-REC-REPAIR-STATE | record.repairState.limited | Observation: the index tracks only one part of recovery. Interpretation: the association is incomplete and needs careful wording. |
| MR-REC-REPAIR-STATE | record.repairState.weak | Observation: the stress signal is unclear. Interpretation: this record does not establish the repair-state association. |
| MR-REC-OXYGEN-LOSS | record.oxygenLoss.strong | Observation: recovery remains constrained after the oxygen-loss challenge. Interpretation: the model has a useful stress-and-recovery response. |
| MR-REC-OXYGEN-LOSS | record.oxygenLoss.limited | Observation: recovery is delayed or mixed after the challenge. Interpretation: the response answers part of the reviewer request. |
| MR-REC-OXYGEN-LOSS | record.oxygenLoss.weak | Observation: no usable recovery record remains after the challenge. Interpretation: the response must state this limit. |
| MR-REC-DRUG-EXPOSURE | record.drugExposure.strong | Observation: the response changes with the drug condition. Interpretation: the assay may be useful for a bounded safety question. |
| MR-REC-DRUG-EXPOSURE | record.drugExposure.limited | Observation: the drug response is mixed. Interpretation: it is a useful discussion point, not a product promise. |
| MR-REC-DRUG-EXPOSURE | record.drugExposure.weak | Observation: the drug record is unreliable. Interpretation: it should not carry an industry claim. |
| MR-REC-MANUSCRIPT-V1 | record.manuscriptV1.careful | Title: Transient Repatterning Accompanies Spatial-Rhythmic Recovery in Cardiac Tissue. Current claim: recovery is linked to a transient repatterning state. |
| MR-REC-MANUSCRIPT-V1 | record.manuscriptV1.strong | Title: Transient Repatterning Supports Spatial-Rhythmic Recovery in Cardiac Tissue. Current claim: the state supports recovery within this model. |
| MR-REC-MANUSCRIPT-V1 | record.manuscriptV1.inflated | Title: Reconstructive Rhythmogenesis Governs Cardiac Tissue Recovery. Current claim treats the state as if it drives recovery. Warning: the visible record does not support this claim. |
| MR-REC-PREPRINT-RECEIPT | record.preprintReceipt.body | The Common Archive has created a public record. It can now be read by people who have no access to your corridor, your queue, or your reasons. |
| MR-REC-COSMOS | record.cosmos.body | Decision: decline. The observation may interest specialists, but the work does not change a broad field. We wish you a focused next submission. |
| MR-REC-KNOWLEDGE | record.knowledge.body | Decision: decline. The claim is attractive, but direct proof has not yet agreed to exist. We encourage a journal with a more local appetite. |
| MR-REC-DSL | record.dsl.body | Decision: decline. The observation is strong, but the mechanism remains incomplete. We recommend a venue that values an observation with aspirations. |
| MR-REC-PIIM-RECEIPT | record.piimReceipt.body | Submission received. The Proceedings of the International Institute of Morphodynamics thanks you for a manuscript that fits our current definition of international. |
| MR-REC-REVIEWER-1 | record.reviewer1.body | Reviewer 1: The observation is promising. Please clarify whether the batch evidence reflects a repeatable pattern or a single persuasive afternoon. |
| MR-REC-REVIEWER-2 | record.reviewer2.body | Reviewer 2: The assay may be useful. Please include the oxygen-loss challenge and keep causal language inside the evidence. |
| MR-REC-REVIEWER-3 | record.reviewer3.body | Reviewer 3: Laser injury is artificial. The reported repair state may be stress with better public relations. Address the mismatch between record and claim. |
| MR-REC-PIIM-EDITOR | record.piimEditor.body | Editor: The reports are constructive and should all be addressed. Where they conflict, please provide a response that is complete, concise, and persuasive. |
| MR-REC-MORROW-CONTACT | record.morrowContact.initial | Subject: Your preprint and a possible assay role. We value results that remain useful after their first exciting figure. Would you be open to a short conversation? |
| MR-REC-MORROW-CONTACT | record.morrowContact.followUp | Subject: Re: Your preprint. I know the semester is busy. If the timing is wrong, a short reply is still useful. |
| MR-REC-ALDERCROFT | record.aldercroft.invitation | Aldercroft University invites you to a final-round interview for Assistant Professor of Developmental Cardiac Systems. Please bring a five-year plan and a stable interpretation of the next five years. |
| MR-REC-ALDERCROFT | record.aldercroft.rejection | Aldercroft University will not proceed to the final round. The committee found the field highly competitive and your future insufficiently pre-confirmed. |
| MR-REC-PIIM-FINAL | record.piimFinal.published | Decision: published. The paper is now a citable object and an immediate request for a new supporting analysis. |
| MR-REC-PIIM-FINAL | record.piimFinal.accepted | Decision: accepted pending final work. Please complete the remaining minor production tasks before the result can become permanent. |
| MR-REC-PIIM-FINAL | record.piimFinal.review | Decision: under review. The manuscript remains active inside a process with no visible clock. |
| MR-REC-PIIM-FINAL | record.piimFinal.rejected | Decision: reject or withdraw. The public preprint may remain, along with the version of the work that reached it. |

The fallback uses record.fallback.rangeRepair.body in place of the separate
range and repair-state records: Observation: recovery and repatterning move
together in some conditions and apart in others. Interpretation: the model
supports a bounded association, not a demonstrated cause.

## Environmental-text catalogue

Environmental text is optional flavour. It must not be the only source of a
required objective, scientific result, route condition, or safety warning.
Every item displays once on first inspection in its active window and stays as
visible dressing until its stated room state changes.

### Bureaucracy

| ID | Room and window | Text key | Initial English text |
|---|---|---|---|
| MR-ENV-BUR-01 | Main laboratory, W1–W4 | env.bureaucracy.01 | Form 18B: request permission to treat a temporary arrangement as temporary. |
| MR-ENV-BUR-02 | Corridor, W1–W7 | env.bureaucracy.02 | Please keep this corridor clear for emergency access, planned access, and access that has acquired a meeting. |
| MR-ENV-BUR-03 | Facility station, W3–W14 | env.bureaucracy.03 | Queue policy: urgency is assessed in the order it was correctly documented. |
| MR-ENV-BUR-04 | PI office, W1–W9 | env.bureaucracy.04 | Grant renewal checklist: demonstrate stability while adapting continuously. |
| MR-ENV-BUR-05 | Break room, W5–W14 | env.bureaucracy.05 | Wellness notice: take a restorative pause after submitting the form that records why you could not pause. |
| MR-ENV-BUR-06 | Exit vestibule, W15–W16 | env.bureaucracy.06 | Building access ends at contract end. Personal uncertainty remains open access. |

### Publication and career traces

| ID | Room and window | Text key | Initial English text |
|---|---|---|---|
| MR-ENV-PUB-01 | Shared desks, W1–W4 | env.publication.01 | Draft title advice: remove all caveats except the ones reviewers will later request. |
| MR-ENV-PUB-02 | PI office, W5–W7 | env.publication.02 | Revision schedule: version final, version final-two, version final-used, version final-real. |
| MR-ENV-PUB-03 | Corridor, W8–W9 | env.publication.03 | Common Archive poster: public access to work, private access to certainty. |
| MR-ENV-PUB-04 | Shared desks, W10–W14 | env.publication.04 | Seminar announcement: publish early, publish often, remain surprisingly available. |
| MR-ENV-PUB-05 | Break room, W10–W14 | env.publication.05 | Career workshop: turn your temporary skills into a permanent narrative. |
| MR-ENV-PUB-06 | Exit vestibule, W15–W16 | env.publication.06 | Aldercroft visitor guide: the future is located upstairs, subject to committee approval. |

### Personal traces

| ID | Room and window | Text key | Initial English text |
|---|---|---|---|
| MR-ENV-PER-01 | Tissue culture, W1–W4 | env.personal.01 | Haoran's list says: write chapter; revise chapter; explain why chapter is not yet a chapter. |
| MR-ENV-PER-02 | Shared desks, W2–W12 | env.personal.02 | Samira's sketchbook note: a pattern can be real before it becomes useful to a figure. |
| MR-ENV-PER-03 | Facility station, W1–W14 | env.personal.03 | Gabriel's binder label: repairs that were urgent until the budget meeting. |
| MR-ENV-PER-04 | PI office, W6–W9 | env.personal.04 | Under a grant calendar: remember that everyone is trying. This does not make the calendar kind. |
| MR-ENV-PER-05 | Break room, W8–W14 | env.personal.05 | Coffee machine note: out of service, unlike the people who wrote this note. |
| MR-ENV-PER-06 | Shared desks, W15–W16 | env.personal.06 | Desk label removed. A pale rectangle remains, professionally neutral. |

### Repairs and warnings

| ID | Room and window | Text key | Initial English text |
|---|---|---|---|
| MR-ENV-REP-01 | Main laboratory, W1–W4 | env.repair.01 | Temporary cable route. Do not remove until the temporary permanent route is installed. |
| MR-ENV-REP-02 | Imaging room, W3–W7 | env.repair.02 | Instrument status: available with limitations. Please define limitations after use. |
| MR-ENV-REP-03 | Corridor, W5–W14 | env.repair.03 | Safety notice: report a loose tile before it becomes a historical feature. |
| MR-ENV-REP-04 | Facility station, W10–W14 | env.repair.04 | Service log: issue reproduced. Cause pending a more funded person. |
| MR-ENV-REP-05 | Tissue culture, W10–W14 | env.repair.05 | Environmental stability notice: fluctuations are within the range of institutional experience. |
| MR-ENV-REP-06 | Break room, W15–W16 | env.repair.06 | Appliance replacement request closed: problem resolved by the end of the financial year. |

### Exit-facing material

| ID | Room and window | Text key | Initial English text |
|---|---|---|---|
| MR-ENV-EXIT-01 | South corridor, W1–W4 | env.exit.01 | Exit route. Alarm will sound only if the building notices you. |
| MR-ENV-EXIT-02 | Exit vestibule, W5–W7 | env.exit.02 | Visitor map: campus services, career office, and one arrow pointing elsewhere. |
| MR-ENV-EXIT-03 | South corridor, W8–W9 | env.exit.03 | Morrow Biotech transit poster: practical questions deserve practical time. |
| MR-ENV-EXIT-04 | Exit vestibule, W10–W14 | env.exit.04 | Door maintenance complete. The building can now release people efficiently. |
| MR-ENV-EXIT-05 | South corridor, W15–W16 | env.exit.05 | Please return keys, badges, and any belief that the position was permanent. |
| MR-ENV-EXIT-06 | Exit vestibule, W15–W16 | env.exit.06 | Outside temperature: ordinary. Outside future: not measured. |

The fallback includes all Bureaucracy and Exit-facing material, plus the first
four Publication and career traces, the first two Personal traces, and the
first two Repairs and warnings.

## Institutional Citations

Institutional Citations are satirical stamps. They unlock as a response to
meaningful play and then appear in the local Archive. No citation requires an
unethical choice. A citation that can react to an integrity problem has an
alternative defensible trigger.

| ID | Title and trigger | Play notification text | Archive description | Requirement / test |
|---|---|---|---|---|
| MR-CIT-01 | Supplementary Stabilization — analyse the first usable laser/sham record | Citation received: your initial clarification has achieved a stable need for further clarification. | Awarded for converting a repeat into a structured reason to continue. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-02 | Narrative Convergence — commit a manuscript revision after a contradictory PI request | Citation received: two incompatible versions now agree to coexist. | Awarded for preserving narrative continuity across revision history. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-03 | Contextual Completeness — meet all three PIIM response cards, or state all three limits clearly in a defensible response | Citation received: context has reached the approved level of completeness. | Awarded for making the response look complete without claiming that certainty exists. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-04 | Public Dissemination Compliance — post the preprint | Citation received: the result is now available for professionally managed misunderstanding. | Awarded for creating a public record. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-05 | Collegial Load-Bearing Recognition — help Haoran or share an imaging slot | Citation received: collegial support has been recorded as additional capacity. | Awarded for carrying a shared load without turning it into a metric. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-06 | Authorship Harmonization Notice — credit Samira when using her evidence | Citation received: contributor alignment has been restored. | Awarded for recording shared work as shared work. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-07 | Selective Transparency Distinction — correct a record, omit a valid card, alter a reading, or add an unsupported reading | Citation received: a distinction has been made between record and presentation. | Awarded when the player makes a material record-handling decision. The archive retains no moral rank. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-08 | Archival Continuity Citation — read a concern from Haoran or Gabriel and respond | Citation received: the archive has been invited to participate in continuity. | Awarded for facing a visible record mismatch, whether by correction or refusal. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-09 | Provisional Appointment Readiness — receive Aldercroft invitation | Citation received: future potential has reached interviewable resolution. | Awarded for meeting the visible academic-route conditions. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-10 | Translational Availability Recognition — receive Morrow offer | Citation received: your limits have been classified as product-relevant. | Awarded for opening the Morrow route. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-11 | Scope Realignment Certificate — choose Out of Scope | Citation received: the project has been responsibly moved outside the current scope. | Awarded for a deliberate departure when a route remained available. | MR-REQ-END-002 / MR-TEST-END-001 |
| MR-CIT-12 | Contractual Closure Commendation — reach End of Contract | Citation received: the fixed term has concluded with documented compliance. | Awarded when no career route remains at 06:42. | MR-REQ-END-002 / MR-TEST-END-001 |

## Tutorial and interface English draft

The tutorial runs only during Week 1 and may be dismissed. Help and Controls
remain available at no game-time cost. Required UI strings use semantic text in
addition to the canvas.

| ID | Text key | Initial English text |
|---|---|---|
| MR-TUT-001 | tutorial.move | Move with WASD or arrow keys. Use the mouse to look. |
| MR-TUT-002 | tutorial.interact | Look at a marked object and press E to interact. |
| MR-TUT-003 | tutorial.station | A focused view stops movement. It does not spend time until you confirm an action. |
| MR-TUT-004 | tutorial.cost | This action costs time and energy. Review both before you confirm. |
| MR-TUT-005 | tutorial.sample | Active samples have a physical label here and a matching desk-queue status. |
| MR-TUT-006 | tutorial.monitor | A monitoring window needs a deliberate choice. Menus and browser closure do not advance it. |
| MR-TUT-007 | tutorial.status | Press Tab to open Research Status. It explains visible changes without showing hidden formulas. |
| MR-TUT-008 | tutorial.save | The game saves at safe points. Save and Quit returns here after the save completes. |
| MR-TUT-009 | tutorial.optional | A colleague has time for a short conversation. It may expire, but it is not a quest marker. |
| MR-UI-CONTENT-NOTE | ui.contentNote | Content note: this game includes academic pressure, burnout, insecure work, and ethical pressure around research records. |
| MR-UI-MENU-CONTINUE | ui.menu.continue | Continue |
| MR-UI-MENU-NEW | ui.menu.newGame | New Game |
| MR-UI-MENU-ARCHIVE | ui.menu.archive | Archive |
| MR-UI-MENU-SETTINGS | ui.menu.settings | Settings |
| MR-UI-MENU-ACCESSIBILITY | ui.menu.accessibility | Accessibility |
| MR-UI-MENU-CREDITS | ui.menu.credits | Credits and Licences |
| MR-UI-MENU-SAVEQUIT | ui.menu.saveQuit | Save and Quit |
| MR-UI-MENU-STATUS | ui.menu.researchStatus | Research Status |
| MR-UI-PROFILE-STANDARD | ui.profile.standard | Standard: the intended pressure profile. |
| MR-UI-PROFILE-SUPPORTED | ui.profile.supported | Supported: the same story with clearer warnings and more energy tolerance. |
| MR-UI-PROFILE-LOCK | ui.profile.lock | This pressure profile is fixed for this save. Start a New Game to use another profile. |
| MR-UI-REPLACE-SAVE | ui.confirm.replaceSave | Start a new game and replace the current active local save? The Archive will remain. |
| MR-UI-CLEAR-DATA | ui.confirm.clearData | Clear all local game data, including settings, the active save, Archive cards, and Citations? This cannot be undone. |
| MR-UI-SAVE-SUCCESS | ui.save.success | Saved at a safe point. |
| MR-UI-SAVE-FAILURE | ui.save.failure | The local save did not complete. Keep this tab open and try again. |
| MR-UI-SAVE-RECOVERY | ui.save.recovery | The active save could not be read. A last known good save is available. |
| MR-UI-SAVE-RESET | ui.save.reset | Neither local save can be recovered. You can reset local game data after confirmation. |
| MR-UI-RESIZE | ui.resize | This browser view is too small for a safe choice. The game is paused. Enlarge the window and continue. |
| MR-UI-WEBGL | ui.compatibility.webgl | This game needs WebGL2. Your browser cannot start a campaign here. |
| MR-UI-STORAGE | ui.compatibility.storage | This game needs local browser storage to save safely. Your browser cannot start a campaign here. |
| MR-UI-MODULES | ui.compatibility.modules | This browser cannot load the required game modules. |
| MR-UI-CONTROLLER | ui.compatibility.controller | Controller support is not available. Keyboard and mouse controls remain available. |
| MR-UI-ACTION-WARNING | ui.action.warning | This action changes time, energy, or the record. Confirm only when you are ready. |
| MR-UI-IRREVERSIBLE | ui.action.irreversible | This report changes the visible manuscript record. Earlier snapshots cannot undo it. |
| MR-UI-ROUTE-FEEDBACK | ui.route.feedback | A future route needs more visible support. Research Status can show the next non-spoiling condition. |
| MR-UI-ENDING-RECORD | ui.ending.record | Record |
| MR-UI-ENDING-PEOPLE | ui.ending.people | People |
| MR-UI-ENDING-CITATIONS | ui.ending.citations | Institutional Citations |

## Audio-content roles

No audio file, codec, source, or licence is selected in this design phase.
These IDs define required roles only. Each supporting-character palette has
eight original non-lexical sounds. The sounds carry no required meaning and do
not form words.

| Palette | Cue IDs | Role descriptions |
|---|---|---|
| Elena | MR-AUD-EL-01 through MR-AUD-EL-08 | low acknowledgement, clipped agreement, measured concern, dry exhale, rising interruption, short laugh, tired pause, quiet close |
| Haoran | MR-AUD-HA-01 through MR-AUD-HA-08 | small greeting, hesitant question, quick thanks, nervous laugh, thinking hum, surprised breath, relieved exhale, quiet close |
| Samira | MR-AUD-SA-01 through MR-AUD-SA-08 | brief greeting, sceptical hum, dry laugh, careful pause, sharp inhale, warm acknowledgement, tired exhale, quiet close |
| Gabriel | MR-AUD-GA-01 through MR-AUD-GA-08 | practical greeting, short acknowledgement, queue-warning sigh, quick laugh, thinking hum, tool-side pause, firm exhale, quiet close |
| Camila | MR-AUD-CA-01 through MR-AUD-CA-08 | remote greeting, attentive acknowledgement, concise laugh, thinking hum, polite pause, concerned breath, warm close, call-end tone |

| ID | Audio role | Use |
|---|---|---|
| MR-AUD-AMB-LAB | Main-laboratory ambience | Ventilation, distant equipment, light room tone |
| MR-AUD-AMB-CULTURE | Tissue-culture ambience | Soft organoid rhythm and ventilation |
| MR-AUD-AMB-IMAGING | Imaging and facility ambience | Scanner and service-room tone |
| MR-AUD-AMB-DESKS | Shared-desks ambience | Keyboards, paper, and sparse office tone |
| MR-AUD-AMB-PI | PI-office ambience | Warmer quiet room tone |
| MR-AUD-AMB-BREAK | Break-room ambience | Refrigerator, coffee machine, and quiet room tone |
| MR-AUD-AMB-CORRIDOR | Corridor ambience | Ventilation and distant building tone |
| MR-AUD-AMB-EXIT | Exit ambience | Door mechanism, street tone, and more open air |
| MR-AUD-CUE-MESSAGE | Routine message cue | Must duplicate queue text and icon |
| MR-AUD-CUE-ATTENTION | Experiment-attention cue | Must duplicate station state and queue text |
| MR-AUD-CUE-SCENE | Required safe-scene cue | Must duplicate in-world cue and task state |

| ID | Music-stem role |
|---|---|
| MR-MUS-01 | Opening pulse: dry, low electronic motion |
| MR-MUS-02 | Orderly pressure: restrained laboratory rhythm |
| MR-MUS-03 | Manuscript loop: thin formal melody |
| MR-MUS-04 | Public record: bright institutional swell |
| MR-MUS-05 | Review pressure: colder reduced pulse |
| MR-MUS-06 | Exit horizon: sparse open chord |

## Ending-module English draft

The ending resolver selects exactly one career module, one paper-aftershock,
one relationship afterbeat, one integrity treatment, and one fatigue
treatment. The four career modules, four paper modules, fifteen relationship
modules, four integrity modules, and two fatigue modules total 29.

### Career modules

| ID | Selection | Text key | Initial English text |
|---|---|---|---|
| MR-END-CAREER-ACADEMIA | Pending Appointment | ending.career.academia | Six months later, the Bellwether desk is temporary again. Aldercroft has not made a final decision, but another committee has asked for another document. |
| MR-END-CAREER-MORROW | Transferable Skills | ending.career.morrow | Six months later, Morrow has a clear project board and a product deadline. The work is finite only in the way a useful job can be finite. |
| MR-END-CAREER-LEAVE | Out of Scope | ending.career.leave | Six months later, the exit is still ordinary. The future is not solved, but it is no longer waiting in the same corridor. |
| MR-END-CAREER-NONE | End of Contract | ending.career.none | Six months later, the desk has been cleared. The contract ended on time. The person who held it did not. |

### Paper-aftershock modules

| ID | Selection | Text key | Initial English text |
|---|---|---|---|
| MR-END-PAPER-PUBLISHED | Published | ending.paper.published | A message asks whether the published figure can support a new grant aim by Friday. |
| MR-END-PAPER-ACCEPTED | Accepted pending final work | ending.paper.accepted | A production editor requests a final change that is described as administrative and takes the whole afternoon. |
| MR-END-PAPER-REVIEW | Under review | ending.paper.review | The manuscript remains under review, a condition that has acquired furniture. |
| MR-END-PAPER-REJECTED | Rejected or withdrawn | ending.paper.rejected | The preprint link remains, or its absence remains visible. Neither version finishes the work cleanly. |

### Relationship-afterbeat modules

| ID | Selection | Text key | Initial English text |
|---|---|---|---|
| MR-END-REL-ELENA-SUPPORT | Elena, support | ending.relationship.elena.support | Elena sends a short note: I meant some of what I said. I should have meant more of it sooner. |
| MR-END-REL-ELENA-AMBIGUOUS | Elena, ambiguous | ending.relationship.elena.ambiguous | Elena forwards a funding notice with no message. It is help, or it is habit, or both. |
| MR-END-REL-ELENA-DISTANCE | Elena, distance | ending.relationship.elena.distance | Elena's old revision note remains in the archive without a reply. |
| MR-END-REL-HAORAN-SUPPORT | Haoran, support | ending.relationship.haoran.support | Haoran sends a chapter draft with a note that the dates are finally moving in the right direction. |
| MR-END-REL-HAORAN-AMBIGUOUS | Haoran, ambiguous | ending.relationship.haoran.ambiguous | Haoran's desk is occupied by another list. The old one is folded underneath. |
| MR-END-REL-HAORAN-DISTANCE | Haoran, distance | ending.relationship.haoran.distance | Haoran asks for a record only through formal channels. The message is careful and very short. |
| MR-END-REL-SAMIRA-SUPPORT | Samira, support | ending.relationship.samira.support | Samira sends a new pattern sketch. It has no figure number and no apology. |
| MR-END-REL-SAMIRA-AMBIGUOUS | Samira, ambiguous | ending.relationship.samira.ambiguous | Samira's name appears beside yours in an old supplementary file, correct but not close. |
| MR-END-REL-SAMIRA-DISTANCE | Samira, distance | ending.relationship.samira.distance | Samira's result appears elsewhere with the credit it needed. |
| MR-END-REL-GABRIEL-SUPPORT | Gabriel, support | ending.relationship.gabriel.support | Gabriel labels an old repair as fixed and writes: this one actually is. |
| MR-END-REL-GABRIEL-AMBIGUOUS | Gabriel, ambiguous | ending.relationship.gabriel.ambiguous | Gabriel's service log shows the same queue problem under a new project name. |
| MR-END-REL-GABRIEL-DISTANCE | Gabriel, distance | ending.relationship.gabriel.distance | The archive contains a discrepancy note that was never answered. It remains there. |
| MR-END-REL-CAMILA-SUPPORT | Camila, support | ending.relationship.camila.support | Camila writes that clear limits saved the team a bad decision. The sentence is direct and kind. |
| MR-END-REL-CAMILA-AMBIGUOUS | Camila, ambiguous | ending.relationship.camila.ambiguous | Camila sends a company update. It is relevant enough to feel intentional. |
| MR-END-REL-CAMILA-DISTANCE | Camila, distance | ending.relationship.camila.distance | The Morrow thread is archived with a polite closing line and no next step. |

### Integrity and fatigue modules

| ID | Selection | Text key | Initial English text |
|---|---|---|---|
| MR-END-INTEGRITY-DEFENSIBLE | Defensible record | ending.integrity.defensible | The record is limited, readable, and still yours to explain. |
| MR-END-INTEGRITY-COMPROMISED | Unresolved omission | ending.integrity.compromised | One missing card keeps changing the shape of the story whenever you look at it. |
| MR-END-INTEGRITY-UNDISCOVERED | Seriously undermined, not visible to others | ending.integrity.undiscovered | The published version looks stable. The private record has a different kind of rhythm. |
| MR-END-INTEGRITY-VISIBLE | Seriously undermined, visible concern | ending.integrity.visible | A request for clarification arrives with two records attached. Neither has forgotten the other. |
| MR-END-FATIGUE-CLEAR | No crash and ending energy above one | ending.fatigue.clear | The final image holds still long enough to look like rest. |
| MR-END-FATIGUE-EXHAUSTED | Crash occurred or ending energy is zero or one | ending.fatigue.exhausted | The final image loses focus for a moment, then holds. The next day is not shown. |

The ending card uses these fixed headings: Record, People, and Institutional
Citations. It shows labels and bars, not hidden flags, formulas, or a moral
rank.

## Vertical-slice and fallback content boundaries

The vertical slice is a Week-1-only evaluation build. It contains:

1. MR-SCN-CLARIFIED;
2. the laser/sham setup, start, monitor, analysis, and record;
3. MR-OPT-GABRIEL-QUEUE;
4. a compact manuscript-board claim choice that reuses the full claim cards;
5. MR-TUT-001 through MR-TUT-008; and
6. a safe save, close, and resume flow.

The slice makes one compact manuscript choice earlier than the full W5
calendar. It is a test-only rehearsal of the claim-card interaction. It does
not change the full game's Week-5 manuscript requirement.

The 90-minute fallback includes:

- all seven MR-SCN mandatory scenes;
- MR-EXP-LASER-SHAM, MR-FB-EXP-RANGE-REPAIR, MR-EXP-BATCH-CHECK, and
  MR-EXP-OXYGEN-LOSS;
- MR-OPT-HAORAN-BORROWED-TIME, MR-OPT-SAMIRA-NOT-IN-MY-FIGURE,
  MR-OPT-GABRIEL-QUEUE, MR-OPT-ELENA-FUTURE, and all three Camila contacts;
- eighteen primary records, with MR-FB-REC-RANGE-REPAIR replacing
  MR-REC-DAMAGE-RANGE and MR-REC-REPAIR-STATE, and without
  MR-REC-DRUG-EXPOSURE;
- all ending modules and citations; and
- the stated selected environmental-text subset.

It excludes MR-EXP-DRUG-EXPOSURE, MR-OPT-HAORAN-MISSING-REPLICATE,
MR-OPT-SAMIRA-SHARED-INSTRUMENT, and MR-OPT-GABRIEL-ARCHIVE. It may not add a
replacement optional scene to recover the removed content count.

## Content validation and handoff checks

MR-TEST-CONT-001 must prove all of the following before a release candidate:

- every stable content ID is unique and matches its prefix;
- every referenced text key exists exactly once in strings.en.json;
- every required content object links to a requirement and test ID;
- every dependency, window, expiry, and effect references a valid object;
- every one-time object has a saved completion or expiry state;
- the full-game counts are 6, 7, 10, 20, 29, 12, and 30 in the order stated
  at the start of this document;
- the fallback selection exactly matches its stated cut line;
- no text claims that the repair state causes recovery;
- no text contains actionable laboratory instructions; and
- the measured unique English-word count is no more than 6,000.

MR-TEST-NARR-001, MR-TEST-CHAR-001, MR-TEST-EXP-001, MR-TEST-END-001, and
MR-TEST-WORLD-001 test the reachable conditional paths. The complete
requirement and work-package map is in 15-implementation-contract.md.

No entry in this document authorizes implementation, production assets, a
package file, a remote, or deployment work.
