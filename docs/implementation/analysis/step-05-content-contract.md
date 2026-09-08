# Step 5 content contract candidate

Date: 2026-09-06. State: candidate, not a frozen interface or implementation permission. Preparation approved by Leonardo. Base: `32d6a01`; preparation branch: `work/MR-WP-01-step5-contracts`. Proposed successors are MR-IF-002 v6, MR-IF-003 v3, MR-IF-005 v3, MR-IF-006 v3 and MR-IF-010 v3. Their current frozen versions remain authoritative until this packet's exact amendment is approved. Campaign schema stays2; content envelope schema stays1; content version is1.1.0; compatible earlier content versions initially `[]`.

## 1. Boundaries and decisions

Step5 creates checked content data and build/startup validation. It does not implement conditions/effects execution, game-time advancement, experiments, manuscript transitions, persistence, movement, cutscenes, audio playback or a complete playable slice. Step6 owns the general S12 fixture schema/manifest; Step5 uses ordinary unit fixtures with explicit requirement references. Static content dependency/condition checks are not proof of full runtime journeys. Those run when their rules exist under Gate6A.

Source authorities: design12 (catalogue and literal text), design04 (science), S03 (stored facts), S04 (commands/costs/scientific rules), S05 (scheduler), S06 (envelopes/validation/strings), S09 (input and presentation semantics), S13 (ownership and step workflow), and the accepted C01–C06 corrections. Historical passages cannot reset content to1.0.0 or the slice to Week1 only.

The exact representation below is proposed shared architecture. It deliberately makes missing choices visible. Sections10–12 name content decisions that must be settled before a complete production slice catalogue can pass. Neither a worker nor validation may fill them by guessing. Existing game rules are not revised merely to make content fit.

## 2. Schema notation

All objects are strict: exactly the listed keys; no optional properties unless a discriminated variant explicitly omits them. `T?` means required key with `T|null`, never omitted. `List<T>` retains order; `Set<T>` is a sorted duplicate-free JSON array. `Map<T>` is an object with explicit validated keys; it is not permission for arbitrary data fields. Every nested shape is strict. No `unknown`, arbitrary expression, extensible field dictionary or unregistered field path enters validated content.

Primitive aliases:

- `Id`: S06 uppercase authored ID grammar,1–128 characters; accepted prefixes determined by field owner. Campaign-local `run:`, `raw:`, `evidence:`, `snapshot:` are not authored IDs.
- `Key`: S06 dot-separated lower-camel ASCII text key,1–128 characters.
- `Version`: three nonnegative safe integer components, no leading zeroes except zero.
- `Period`: safe integer0–63. `Window={first:Period,last:Period}` with first<=last. Slice profile horizon0–11 is independent of an included full-game template's authored start window.
- `Int`: safe integer, rejects negative zero. `Profile='full'|'fallback'|'slice'`.
- `Family`: the18 S06 families in its manifest order. File names are S06's exact paths, including hyphenated room-states/environmental-items/contextual-lines.
- `Ref={family:Family,id:Id}` points to a top-level item. `OwnedRef={owner:Ref,id:Id}` points to a typed nested definition. Reference fields below specify the allowed family/subtype; the generic spelling cannot relax it.
- `Trace={requirementIds:Set<Id>,testIds:Set<Id>}`; both nonempty for required/counted objects. Requirement/test IDs resolve against the existing design15 registry, not a fabricated Step6 manifest.
- `Availability={window:Window?,when:Conditions,blocking:Conditions,expiry:'permanent'|'afterWindow',repeat:'once'|'repeatable'}`. `permanent` means no expiry, not always eligible; window can still define first eligibility. `afterWindow` requires a window. Blocking's empty group means no block; the leaf/group truth rules below specify this special use explicitly.
- `TextForm={id:Id,when:Conditions,bodyKeys:List<Key>}`; bodyKeys nonempty. Form IDs use MR-FORM-. Base form has empty conditions. Ordered conditional forms select the first matching form, except scenes which have at most one conditional form; saved selections remain S03/S05-owned.

Proposed field names are explicit; there is no conversion from display labels to field names at runtime.

## 3. Source and built envelopes

```ts
Manifest = {
  packageId: 'minor-revisions-content'; schemaVersion: 1;
  contentVersion: Version; language: 'en'; dataFiles: List<string>;
  stringsFile: 'content/strings.en.json';
  profileFiles: ['content/profiles/full.json','content/profiles/fallback.json','content/profiles/slice.json'];
  compatibleEarlierVersions: Set<Version>;
}
DataFile<F> = {schemaVersion:1; family:F; items:List<Item<F>>}
ProfileSource = {
  schemaVersion:1; id:Profile; implementationStatus:'complete'|'incomplete';
  campaignMode:'campaign'|'evaluationSlice';
  selections: {[F in Family]: Set<Id>};
  replacements: List<{family:Family; fromId:Id; toId:Id}>;
  expectedCounts: {[F in Family]: Int};
  sliceCompletionId:'MR-UI-SLICE-COMPLETE'|null;
}
BuiltMetadata = {
  packageId:'minor-revisions-content'; schemaVersion:1; contentVersion:Version;
  language:'en'; profileId:Profile; compatibleEarlierVersions:Set<Version>;
  expectedCounts:{[F in Family]:Int};
}
BuiltItem<F> = Omit<Item<F>, 'trace'>;
BuiltPackage = {metadata:BuiltMetadata; families:{[F in Family]:List<BuiltItem<F>>}; strings:Map<string>}
```

`dataFiles` equals the18 exact S06 paths in order, not a user-controlled list. Source strings is a single sorted Key→English map. Manifest versions/compatibility exclude the current version and later versions; no replacement automatically grants save compatibility. Built items contain the exact family fields below except source-only trace. The builder copies by allowlist and the browser rejects trace, requirement/test links, source paths and other development metadata. Counts equal top-level selected counts per family; subtype counts (mandatory/optional scenes, records, endings, etc.) are separate invariants derived from item tags. Nested semantic definitions never increase experiment/primary-record counts.

A replacement is direct, same-family, sorted by family/fromId, and must satisfy S06 one-to-one/no-chain/no-cycle rules. Both definitions must exist in the source; the built package contains only selected target definitions. No original unselected alias survives into the built runtime. Saved-ID migration remains a separate S07 operation.

Only the three S06 completion combinations are valid. Source validation can validate incomplete inactive profiles without pretending their final closure/counts/text exist. Requesting any incomplete profile fails. A complete slice requires its exact selected ID/text manifest and all selected dependencies; an empty catalogue with `complete` is invalid.

Proposed function signatures:

```ts
type RawSourceFiles = ReadonlyMap<string, Uint8Array>;
type ContentIssue = {code:IssueCode; file:string; path:string; idOrKey:string|null};
type Result<T> = {kind:'valid';value:T}|{kind:'invalid';issues:readonly ContentIssue[]};
validateSourceCatalogue(raw:RawSourceFiles): Result<ValidatedSourceCatalogue>;
createBuiltContentPackage(source:ValidatedSourceCatalogue, profile:Profile): Result<BuiltPackage>;
validateContentPackage(raw:unknown): Result<ValidatedContent>;
```

The pure input map includes all listed paths and no others. The Node owner discovers files only to reject unexpected paths; it cannot use discovery to select content. Strict fatal UTF-8 decoding, JSON duplicate-member detection (including escaped duplicate keys), BOM rejection, permitted JSON syntax and final-newline/LF checks precede shapes. `ValidatedSourceCatalogue` is an opaque checked copy with no public constructor; builder validates provenance or revalidates on a forged input. The staged source may contain all profiles and is never passed to browser consumers. No I/O, browser API or data mutation occurs in `src/content/`.

`IssueCode` is exactly S06's16 codes: malformedJson, invalidManifest, invalidProfile, invalidObject, invalidId, invalidText, duplicateId, duplicateTextKey, missingReference, wrongReferenceFamily, circularReference, incompleteProfile, excludedDependency, countMismatch, invariantFailure, wordLimitExceeded. Issues contain no English value, absolute path, stack or save/player data. File is a known relative source path, or `built-content` for browser validation. JSON path uses escaped JSON Pointer segments; root is `/`. Stages follow S06's18-stage order. Within a stage sort by manifest path order, item ID, path, code; suppress dependent errors after an item fails its own shape to avoid fabricated follow-on results. Never return partial checked data.

## 4. Conditions and closed fact registries

`Conditions={allOf:List<Leaf>,anyOf:List<Leaf>,noneOf:List<Leaf>}`. Lists contain leaves only, no nesting or code. For eligibility, all empty is true; anyOf empty adds no requirement. For a blocking field, all empty means false (no block). Conditions are data to validate, not executable Step5 rules.

Every Leaf uses exact `type` plus the following payload. Where a field registry is listed, any other value is invalid. Stored-state types are copied from the public MR-IF-002 contract during the approved implementation; no private rules import.

| type                | Exact additional fields                                                                                                                                                                                                                                  | Legal targets and values                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| periodInWindow      | `window:Window`                                                                                                                                                                                                                                          | Current calendar period                                                                                                                                         |
| actIs               | `value:FloorAct`                                                                                                                                                                                                                                         | Five S03 world.floorAct values                                                                                                                                  |
| pressureProfileIs   | `value:'standard' \| 'supported'`                                                                                                                                                                                                                        | Metadata pressure                                                                                                                                               |
| enumIs              | `fact:'claimLevel' \| 'haoranAuthorship' \| 'samiraAuthorship', value:string \| null`                                                                                                                                                                    | claimLevel: careful/strong/inflated/null; authorship: notIncluded/credited/declined                                                                             |
| booleanIs           | `fact:'pendingCrash' \| 'camilaReplySent' \| 'morrowVideoCompleted' \| 'fabricationConfessedToCamila', value:boolean`                                                                                                                                    | Exact S03 calendar/careerProgress facts                                                                                                                         |
| integerInRange      | `fact:'energy' \| 'evidence' \| 'elenaPaperConfidence' \| 'integrity' \| 'integrityRecoveryUsed', minimum:Int, maximum:Int`                                                                                                                              | Bounds within0–5/0–12/0–100/0–100/0–10 respectively                                                                                                             |
| idPresenceIs        | `collection:'completedContentIds' \| 'expiredContentIds' \| 'readMessageIds' \| 'consumedContextualContentIds' \| 'displayedEnvironmentalTextIds' \| 'recordedSceneClosingIds' \| 'recordedSceneRecapIds' \| 'citationIds', target:Ref, present:boolean` | Exact S03 ContentHistory lists; target family constrained by list                                                                                               |
| contentStateIs      | `target:Ref, state:string`                                                                                                                                                                                                                               | scenes: S03 SceneState.state; messages: MessageState.state; tasks: RequestState or RevisionTask per task subtype; events: ScheduledEvent.state; no other family |
| experimentStateIs   | `experimentId:Id, runNumber:1 \| 2 \| null, field:'stage' \| 'sampleCondition' \| 'equipmentState' \| 'attentionState' \| 'finalResultBand', value:string \| null`                                                                                       | Exact S03 ExperimentRun field union; null only finalResultBand; null runNumber means any permitted run; no matching run gives false                             |
| manuscriptStateIs   | One of the four exact variants in subsection4.1                                                                                                                                                                                                          | Targets and values are correlated; a general target/value union is not accepted.                                                                                |
| concernStateIs      | `concernId:Id, field:'visible' \| 'response' \| 'routeImpact', value:boolean \| string \| null`                                                                                                                                                          | visible boolean; response correct/deny/defer/ignoreReminder/null; impact none/aldercroft/morrow/both                                                            |
| routeStateIs        | `route:'aldercroft' \| 'morrow', state:'locked' \| 'developing' \| 'available' \| 'closed' \| 'chosen' \| 'declined'`                                                                                                                                    | S03 route record                                                                                                                                                |
| relationshipStateIs | `characterId:Id, field:'trust' \| 'introduced' \| 'permanentBreach' \| 'supportConsumed', minimum:Int \| null, maximum:Int \| null, value:boolean \| null`                                                                                               | trust uses0–100 bounds,value null; booleans bounds null,value boolean; recurring character reference required                                                   |
| piimStateIs         | `fact:'batch' \| 'oxygen' \| 'claim' \| 'outcome', value:string \| null`                                                                                                                                                                                 | cards met/partlyMet/notMet/null; outcome published/acceptedPendingFinalWork/underReview/rejected/null                                                           |
| paperStateIs        | `fact:'preprint' \| 'journal' \| 'final', value:string \| null`                                                                                                                                                                                          | Exact S03 preprintState/journalState/finalPaperState unions                                                                                                     |
| fatigueStateIs      | `fact:'pendingCrash' \| 'crashCount' \| 'energy', minimum:Int \| null, maximum:Int \| null, value:boolean \| null`                                                                                                                                       | boolean for pendingCrash; bounds0–64 for crashCount,0–5 energy                                                                                                  |
| conclusionStateIs   | `fact:'state' \| 'choice', value:string \| null`                                                                                                                                                                                                         | S03 ConclusionStateName; choice aldercroft/morrow/leave/neither/null                                                                                            |
| countInRange        | `collection:'analysedRuns' \| 'activeRuns' \| 'rawRecords' \| 'evidenceCards' \| 'snapshots' \| 'citations', minimum:Int, maximum:Int`                                                                                                                   | Nonnegative bounds, min<=max; active max3, citations max12; remaining max safe integer                                                                          |

### 4.1 Exact special predicates and source compatibility limits

`manuscriptStateIs` requirement: target is an owned `interface` semantic definition with `kind='requirement'`, value met/missing/conflict/unsupported/null, evaluated on current snapshot; absent current snapshot gives false. Reading: target is a top-level interface/scienceDefinition with kind reading, value honest/altered/unsupported, matches at least one included current-board card using that selectedReadingId; no card gives false. ReviewerForm: target identifies an owned reviewerForms definition in a `records` reviewer item; its owner identifies the saved reviewer record, value base/conditional/null. The nested definition must be one of that record's declared reviewerForms. hasSnapshot requires target=null and boolean value.

Exact `manuscriptStateIs` variants (all include that type literal):

- `{fact:'requirement',target:OwnedRef,value:'met'|'missing'|'conflict'|'unsupported'|null}`; target is interface/requirement.
- `{fact:'reading',target:Ref,value:'honest'|'altered'|'unsupported'}`; target is interface/scienceDefinition of kind reading.
- `{fact:'reviewerForm',target:OwnedRef,value:'base'|'conditional'|null}`; target is records/reviewerForms.
- `{fact:'hasSnapshot',target:null,value:boolean}`.

`FloorAct` is exactly S03 WorldState.floorAct: orderlyButOverbooked, manuscriptClutter, rejectionAndPublicRecord, reviewPressure, decisionHorizon. `HistoryCollection` is exactly the eight lists in idPresenceIs. These are explicit schema aliases, not free-form strings.

The historical `FLAG:openingCaution`, acceptedQueue, limitedFacilityUse and pressedFacility meanings have no dedicated S03 booleans. Candidate mapping uses the already saved committed option identity in `contentHistory.selectedVariantsById[choiceId]`, not new arbitrary flags. That requires extending `contentStateIs` with an explicit variant `{type:'contentStateIs', target:OwnedRef, selectedOptionId:Id}` (and no state property), restricted to an owned choice and one of its options. This is a proposed MR-IF-006 representation, not a change to campaign schema or an authority to write generic state. Registered future consumers must use the same mapping. Any other design flag not reducible to an existing saved choice remains a named contract gap; do not add a catch-all `flag` dictionary.

Effects, targets, types and source meanings must be validated against the exact owner's definition. The union above is closed but does not pretend every full-game narrative condition is authorable yet. A missing future field requires an explicit interface amendment, not casting a string. No future profile can become complete until all of its required predicates have been mapped.

## 5. Authored effects

Every effect has `type`, `owner:CommandTag`, and `reasonKey:Key`. CommandTag is exactly the24 accepted RuleCommand discriminants. Content does not supply arbitrary serialized RuleCommand objects or the5 RuleEffect payloads. Each attachment supplies its fixed owning command; an effect claiming another owner is invalid. Scene choice effects and the complete result of a scene with a final choice belong to chooseSceneOption. Only the permitted no-choice skip result belongs to skipScene. requestScene prepares and starts presentation; it never applies scene-completion results. Clarified creates its notebook/task and Gabriel resolves the room in the same final-choice transaction as their choice delta. Deferred event delivery uses applyScheduledTransition. The final attachment table must name all allowed owners; unknown combinations are rejected.

| type                | Exact additional fields                                                                                    | Constraint                                                                                                                                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| adjustMetric        | `metric:'elenaPaperConfidence' \| 'integrity' \| 'evidence' \| 'trust', characterId:Id \| null, delta:Int` | characterId only for trust. Delta within corresponding metric range; applied/clamped and integrity-recovery cap owned by S04, never by the content validator. Approved source effect must match exactly; not merely be in range. |
| setFact             | `fact:'camilaReplySent' \| 'morrowVideoCompleted' \| 'fabricationConfessedToCamila', value:boolean`        | Exact career facts only; slice needs none. No free enum assignment or campaign field path. Additional authored enum targets need explicit future registry approval.                                                              |
| recordHistory       | `collection:HistoryCollection, target:Ref`                                                                 | Same closed eight history lists as idPresenceIs; list/family compatibility must hold. Nonrepeatable delivery is an S04/S05 responsibility.                                                                                       |
| applyDomainResult   | `result:DomainResult`                                                                                      | Closed variants below; no generic result payload                                                                                                                                                                                 |
| applyActionCost     | `actionId:Id`                                                                                              | Exact action family reference and owner binding; no period/energy override. At most one cost effect per transaction; no cost again when command already consumes its action binding.                                             |
| requestPresentation | `presentation:PresentationRef`                                                                             | Closed five variants below, no literal English or arbitrary ending card                                                                                                                                                          |

`DomainResult` exact variants:

- `{kind:'activateTask',taskId:Id}` references a task whose availability admits this originating scene/event.
- `{kind:'recordPrimary',recordId:Id}` references a primary record with matching source owner.
- `{kind:'selectOption',choice:OwnedRef,optionId:Id}` saves the selected option; selected option must be the choice being committed, never a different choice.
- `{kind:'resolveRoom',roomStateId:Id,routeId:Id,equipmentState:'ready'|'limited'}` matches that room's authored route exactly, scoped to its approved affected new runs.
- `{kind:'applySupport',characterId:Id,target:Ref}` requires the S04 once-per-campaign support identity; slice supports Gabriel's authored route only if explicitly selected.
- `{kind:'commitManuscript',taskId:Id}` references manuscript/rehearsal task; payload contains no precomputed snapshot/results. Actual board proposal comes from the player command and rules.
- `{kind:'completeSlice',taskId:'MR-SLICE-CLAIM-REHEARSAL',interfaceId:'MR-UI-SLICE-COMPLETE'}` requires slice profile and identifies the completion presentation associated with a committed rehearsal snapshot. Pure rules neither verify a save nor emit completion before verification; the application verifies the existing saveCheckpoint result before showing this interface. It is not a sixth RuleEffect.

Other full-game domain result kinds are reserved as unresolved, not accepted strings; inactive incomplete profiles contain no invented effect payloads. Before authoring later acts, each needed domain variant must be mapped explicitly to approved S04 rules.

`PresentationRef` exact variants:

- `{kind:'saveCheckpoint',reasonId:Id}`;
- `{kind:'showNotice',interfaceId:Id,noticeKey:Key}`;
- `{kind:'startCutscene',sceneId:Id}`;
- `{kind:'playAudioCue',audioId:Id}`;
- `{kind:'completeCampaign'}` (no other fields; forbidden in slice). Final card/stateRevision are rule output, never authored input.

Proposed slice attachments: Clarified choices use adjustMetric(P±5) and selectOption; Clarified completion activates laser task and records notebook. Gabriel choices use adjustMetric(trust±10/0), selectOption and the corresponding resolveRoom result. Rehearsal commits its snapshot with one action cost; application-owned completion presentation follows successful verification of the resulting saveCheckpoint. Availability/tutorial conditions are never effects. Scene period cost0 for Clarified, optional Gabriel action1/0, rehearsal1/1; no inferred additional cost.

### 5.1 Slice attachment registry

The following is the closed candidate slice attachment registry. It excludes the unimplemented full/fallback campaign results. The allowed command is a transaction owner, not an instruction to recursively dispatch another command. A mismatch fails validation. Each operation still uses the exact source reason key; where no fitting approved reason exists, the source manifest remains incomplete until a literal is proposed and approved.

| Attachment                        | Command owner            | Allowed authored operations                                                                                                                             |
| --------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clarified START/LIMIT choice      | chooseSceneOption        | selectOption for that choice; confidence delta+5/-5; activateTask MR-TASK-LASER-SHAM and recordPrimary MR-REC-PROJECT-NOTEBOOK once in the final result |
| Gabriel WAIT/LIMITED/PRESS choice | chooseSceneOption        | selectOption for that choice; Gabriel trust delta+10/0/-10; resolveRoom for the matching facility route; the one MR-ACT-RELATIONSHIP cost               |
| Facility WAIT basic route         | resolveRoomState         | resolveRoom Ready; the one MR-ACT-ROOM-WAIT cost                                                                                                        |
| Facility LIMITED basic route      | resolveRoomState         | resolveRoom Limited; no response cost                                                                                                                   |
| Facility expiry event             | applyScheduledTransition | resolveRoom Limited only; no additional cost                                                                                                            |
| Rehearsal task                    | commitInitialManuscript  | the single slice rehearsal cost and commitManuscript, with completeSlice directive tied to the resulting snapshot/checkpoint                            |

`requestScene` never applies any row above. For the two selected scenes, a no-choice skip cannot substitute for an unresolved choice. Skipping the closing after a final choice does not reapply the scene result. Report-to-Elena and other experiment commands use their approved S04 algorithms and action bindings, not an invented free-form authored delta. Their exact selected result definitions remain source-manifest closure work.

Per-transaction cost ownership is explicit: either the command binding identifies the one action cost or one allowed applyActionCost attachment does; never both. Section18 chooses one representation for the slice: commands consume their registered action binding and no selected slice attachment contains applyActionCost. The validator rejects a duplicate charge even if both amounts happen to be equal.

Static data carries the completion interface/task identity, not a precomputed save success. `completeSlice` becomes eligible for display only when the application has verified the exact resulting checkpoint under existing S03/S07 semantics. Step5 validates those identities; it does not perform a save or set a completed campaign.

## 6. Proposed family data shapes

Every top-level item has `{id:Id,type:<literal subtype>,trace:Trace}` plus exactly the row fields. The row is the proposed structural field list; the unresolved semantic mappings below prevent freezing it. `availability` is included only where listed. The authoring order of scenes/forms/beats/options is meaningful and must not be sorted as a set. Nested IDs are globally unique across every top-level and nested owner; family/type lookup includes both owner and nested definition kind. Technical nested IDs proposed in section10 are candidate IDs, not existing authored content.

| family / type                          | Exact remaining fields                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| characters / character                 | `nameKey:Key, roleKey:Key, presence:'physical' \| 'remote', speakerId:Id, relationshipId:Id \| null`                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| locations / location                   | `nameKey:Key, roomType:'tissueCulture' \| 'mainLab' \| 'piOffice' \| 'sharedDesks' \| 'imaging' \| 'facility' \| 'breakRoom' \| 'corridor' \| 'southCorridor' \| 'exitVestibule', cueRoles:Set<'required' \| 'optional' \| 'warning'>, mappingKey:Id`                                                                                                                                                                                                                                                                                          |
| actions / action                       | `labelKey:Key, workClass:'recovery' \| 'light' \| 'focused' \| 'intense' \| 'major', periodCost:Int, baseEnergyCost:Int, command:CommandTag, forecastKey:Key, reasonKeys:Set<Key>`                                                                                                                                                                                                                                                                                                                                                             |
| experiments / experiment               | `availability:Availability, family:'laserSham' \| 'damageRange' \| 'batchCheck' \| 'repairState' \| 'oxygenLoss' \| 'drugExposure' \| 'rangeRepair', labelKey:Key, questionKeys:Record<'baseline' \| 'higherRisk',Key> \| null, pairedLimitForecastKey:Key \| null, maxRuns:1 \| 2, goalIds:Set<Id>, options:List<ExperimentOption>, stageActions:StageActions, monitoringOffsets:List<{first:Int,last:Int}>, recordId:Id, evidenceIdPattern:'evidence:run:<templateId>:<runNumber>', scienceDefinitionIds:Set<Id>, outcomes:List<OutcomeRow>` |
| tasks / experimentRequest              | `availability:Availability,labelKey:Key, command:'reportToElena', experimentId:Id, choices:List<Choice>, resultRefs:Set<Ref>, activeRequestId:Id`                                                                                                                                                                                                                                                                                                                                                                                              |
| tasks / manuscript                     | `availability:Availability,labelKey:Key, command:'commitInitialManuscript' \| 'commitManuscriptRevision' \| 'commitPiimResponse', actionId:Id, allowedClaimIds:Set<Id>, resultRefs:Set<Ref>, activeRequestId:Id \| null`                                                                                                                                                                                                                                                                                                                       |
| tasks / sliceRehearsal                 | `availability:Availability,labelKey:Key, command:'commitInitialManuscript', actionId:Id, allowedClaimIds:Set<Id>, experimentId:'MR-EXP-LASER-SHAM', completionId:'MR-UI-SLICE-COMPLETE', activeRequestId:null`                                                                                                                                                                                                                                                                                                                                 |
| tasks / career                         | `availability:Availability,labelKey:Key, command:'completeCareerTask', choices:List<Choice>, resultRefs:Set<Ref>, activeRequestId:null`                                                                                                                                                                                                                                                                                                                                                                                                        |
| roomStates / roomState                 | `availability:Availability, locationId:Id, affectedExperimentIds:Set<Id>, activationEventId:Id, forecastKey:Key, routes:List<RoomRoute>, expiryRouteId:Id`                                                                                                                                                                                                                                                                                                                                                                                     |
| events / event                         | `availability:Availability, status:'required'\|'optional', priority:'automaticTransition' \| 'mandatoryContent' \| 'requiredMessage' \| 'optionalContent', authoredOrder:integer0..9999, delivery:Delivery, cue:Cue \| null, fallback:Delivery \| null, threadId:Id \| null, effects:List<Effect>`                                                                                                                                                                                                                                             |
| scenes / scene                         | `availability:Availability, eventId:Id, locationIds:List<Id>, cue:Cue \| null, mandatory:boolean, baseForm:SceneForm, conditionalForm:SceneForm \| null, choices:List<Choice>, periodEffect:0 \| 1, completionEffects:List<Effect>, closingBeats:List<Beat>, recapKey:Key \| null`                                                                                                                                                                                                                                                             |
| messages / message                     | `availability:Availability, eventId:Id,senderId:Id,threadId:Id,subjectKey:Key,forms:List<TextForm>,choices:List<Choice>,deferral:'leaveAvailable' \| 'expireAtWindow',followupEventIds:Set<Id>,expiryEffects:List<Effect>`                                                                                                                                                                                                                                                                                                                     |
| notifications / notification           | `availability:Availability,eventId:Id,senderId:Id,threadId:Id \| null,forms:List<TextForm>,presentation:'desk' \| 'direct',followupEventIds:Set<Id>`                                                                                                                                                                                                                                                                                                                                                                                           |
| records / primaryRecord                | `availability:Availability,family:'notebook' \| 'experiment' \| 'manuscript' \| 'reviewer' \| 'career' \| 'support',titleKey:Key,forms:List<TextForm>,source:Ref,selection:'onCreation' \| 'onAnalysis' \| 'onRevision' \| 'onReview',repeatNoteKeys:List<Key>,reviewerForms:List<{id:Id,value:'base' \| 'conditional'}>`                                                                                                                                                                                                                      |
| endings / ending                       | `family:'career' \| 'paper' \| 'relationship' \| 'integrity' \| 'fatigue',when:Conditions,bodyKey:Key,variants:List<TextForm>`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| citations / citation                   | `titleKey:Key,bodyKey:Key,when:Conditions,permanent:true,archiveOrder:Int`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| environmentalItems / environmentalItem | `availability:Availability,locationId:Id,acts:Set<FloorAct>,presentation:'glance' \| 'focused',textKeys:List<Key>`                                                                                                                                                                                                                                                                                                                                                                                                                             |
| contextualLines / contextualLine       | `availability:Availability,speakerId:Id,when:Conditions,textKey:Key`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| tutorials / tutorial                   | `availability:Availability,trigger:TutorialTrigger,headingKey:Key,bodyKey:Key,acknowledgement:'dismissible',inputActions:Set<InputAction>`                                                                                                                                                                                                                                                                                                                                                                                                     |
| interface / interface                  | `availability:Availability,purpose:InterfacePurpose,textKeys:List<Key>,confirmation:'none' \| 'required',dynamicFields:Set<DynamicField>,definitions:List<InterfaceDefinition>`                                                                                                                                                                                                                                                                                                                                                                |
| interface / scienceDefinition          | `kind:ScienceKind,meaning:ScienceMeaning,labelKey:Key`; exact kind/meaning pair and literal ID/label from C02                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| audio / audioRole                      | `role:'ambience' \| 'music' \| 'requiredCue' \| 'optionalCue' \| 'warningCue' \| 'confirmationCue' \| 'dialogue',meaningKey:Key,duplicateInterfaceId:Id \| null,handoffRoleId:Id`                                                                                                                                                                                                                                                                                                                                                              |

New task subtypes may be added only by approved contract change. No `tasks/type:any` catch-all exists. Prose-free no-op technical scaffolding is not a substitute for required selected fields.

### 6.1 Nested shapes and enums

- `Choice={id:Id,options:List<Option>,recapKey:Key|null}`;2–4 options. `Option={id:Id,labelKey:Key,when:Conditions,effects:List<Effect>,confirmationKey:Key|null,recapKey:Key,closingBeats:List<Beat>}`. An option with an irreversible/costly effect needs its approved confirmation. The option ID persists the choice; it is never a display string.
- `SceneForm={id:Id,when:Conditions,beats:List<Beat>}`; nonempty. `Beat={id:Id,speakerId:Id|null,textKey:Key|null,choiceId:Id|null,locationId:Id|null}`; exactly one textKey or choiceId; speaker required for text, null for choice. Choice options must not also appear as automatically spoken beats. No duration is inferred from text word count.
- `Cue={id:Id,locationId:Id,interfaceId:Id,audioId:Id|null}`; no resource URL. `Delivery={kind:'transition'|'scene'|'message'|'notification',target:Ref|null}`; transition has null target and nonempty event effects; others require matching family.
- `RoomRoute={id:Id,labelKey:Key,when:Conditions,actionId:Id|null,equipmentState:'ready'|'limited',controlKind:'matched'|'limited',observationCoverage:'full'|'limited',effects:List<Effect>}`; null action means no extra response cost, not missing data. Limited route has limited control/coverage under C03.
- `ExperimentOption={id:Id,kind:'goal'|'control'|'observation'|'sample'|'equipment'|'familyChoice',labelKey:Key,value:string}`. `value` is discriminated by kind: goal uses one of the experiment's closed goal IDs; control matched/limited; observation structure/rhythm/paired; sample stable/stressed/failing; equipment ready/limited/unavailable; familyChoice baseline/higherRisk. No additional string value is accepted. A laser/sham question key is stored in `questionKeys` under the same exact `familyChoice` value; it is not an option label or an executable predicate.
- `StageActions={configure:Id,start:Id,monitor:Id,qualityMonitor:Id,stabilize:Id,stop:Id,analyse:Id,report:Id}`; every action reference checks matching command/work class/cost. The approved design12 action table explicitly shares IDs: monitor/stop both use MR-ACT-MONITOR-ROUTINE (1 period,0 energy); qualityMonitor/stabilize both use MR-ACT-MONITOR-QUALITY (1 period,1 base energy). Shared action references are intentional; do not create separate action IDs or prices. Stop retains its existing confirmation text experiment.stop.confirm.
- `ScienceDefinition` is a top-level interface item, stored once and referenced by all experiments. Its science fields are `{kind:'structure'|'rhythm'|'repatterning'|'control'|'reading'|'caveat',meaning:string,labelKey:Key}`. `ScienceKind`/`ScienceMeaning` are the corresponding discriminated unions, not arbitrary strings. Meanings are exactly S06 C02 table rows: structure/rhythm recovery/partial/none/unobserved; repatterning tracksRecovery/noAssociation/unobserved; control matched/limited; reading recovery/association/noRecovery/unresolved; caveat condition/association/process. Exact ID→meaning→label equality follows the approved table; no ID-spelling inference.
- `OutcomeRow={familyChoice:'baseline'|'higherRisk',resultBand:'strong'|'limited'|'weak',observation:'structure'|'rhythm'|'paired',controlKind:'matched'|'limited',structureId:Id,rhythmId:Id,repatterningId:Id,controlId:Id,readingIds:Set<Id>,caveatIds:Set<Id>,bodyKey:Key}`. Exactly one row per permitted combination; derived scientificFacts are compared to explicit approved semantic definitions. S04 owns band/bucket choice. Missing authored outcome meaning is not filled with true facts.
- `InterfaceDefinition` union: `{id:Id,kind:'claim',value:'careful'|'strong'|'inflated',labelKey:Key}` or `{id:Id,kind:'requirement',value:<one of the accepted ManuscriptRequirementKey values>,labelKey:Key}`. These are nested semantic definitions, not extra records. Exact claim IDs and source labels are proposed in section10.
- `TutorialTrigger`: section19's closed firstSemanticEvent variant. It describes an existing feature becoming relevant, not an input the player must discover before seeing help. No event execution occurs in Step5.
- `InterfacePurpose`: menuContinue/menuNewGame/menuSaveQuit/saveSuccess/saveFailure/saveRecovery/saveReset/replaceSave/clearData/researchStatus/controls/settings/accessibility/profile/contentInvalid/sliceRehearsal/sliceComplete/claim/requirement/availabilityCue/confirmation. Any other purpose is a future explicit addition.
- `DynamicField`: actionPeriods/actionEnergy/controlLabel/currentValue/protagonistName/subjectPronoun/objectPronoun/possessiveAdjective/possessivePronoun/reflexivePronoun. A dynamic field is a separately presented semantic value, not string concatenation.
- Section19 supplies the proposed nine semantic input values and selected S08 mapping identities. Audio handoff roles still require their exact selected S10 mapping before code can accept them. Never resolve an asset path or browser API from a handoff ID.

## 7. References, graphs and counts

Validation builds separate typed indexes for top-level family and nested-owner definitions. Speaker IDs are either selected characters' speakerId or the seven fixed S06 noncharacter speaker roles; they are not fictional additional characters. Location IDs must be selected. Nested references cannot cross owners unless their field explicitly permits it.

A scene/event or experiment/record can legitimately refer back to its owning definition. Do not reject every cycle in the total reference graph: distinguish ownership backlinks (allowed) from prerequisites, variant prerequisites, thread follow-ups and replacement chains (acyclic). Dependency closure includes both kinds; cycle rejection applies only to the designated prerequisite/follow-up/replacement edges. Effect outputs must not be mistaken for prerequisites when checking a scene that creates its own task/record.

Profile count invariants apply to selected content: the full14 contextual objects/30 environmental objects/29 ending modules/12 Citations are not imposed on slice. Full/fallback specific approved subtype counts come from design12/S06; inactive incomplete profiles validate only present counts. Native fallback composition is already approved in design12; it is distinct from migrating saved full-game selections. S06 forbids a many-to-one mapping when it loses a saved selection. Check whether any later mapping actually does so before proposing a new decision; this does not block the current slice. MR-IMP-OPEN-020 remains the unauthored fallback window, not permission to guess either rule.

Static reachability in Step5 means reference closure and noncontradictory authored prerequisite/window paths within the selected profile. It does not simulate clocks, pressure, costs, experiments, choices or endings. Do not mark a full runtime journey test passed. Any S06 language requiring executed journey proof at this step must be explicitly qualified in the proposed amendment and mapped to Gate6A/later rules, without removing those future checks.

## 8. Pure runtime views and safe startup

`ValidatedContent` exposes only deeply frozen checked copies:

- metadata: exact BuiltMetadata;
- rules: non-English condition/effect/action/experiment/task/room/event/record/ending/citation facts; narrative beats and English values removed; required reason keys and authored notice keys retained for S04 output;
- presentation: selected character/location labels, scene/forms/beats/options, message/notification/tutorial/interface/environment/contextual/audio roles, retaining keys but no executable effects or hidden metric deltas;
- strings: selected Key→English map.

Projection is by explicit per-family allowlist, not `delete` of a few known fields from a generic object. Subsection8.1 enumerates the proposed projected fields and nested boundaries. Its outcome projection must follow the final approved D3 row shape before worker assignment. Consumer ports receive only their required view. Freeze protects mutation; it is not a security claim that a caller holding the entire content value cannot inspect its other properties. Bootstrap owns the complete value only for construction. Rules never receive English values.

Build adapter uses exact S06 selection/filter/revalidation. Runtime startup imports the selected generated package, validates it before constructing application dependencies, and on failure shows the exact fixed S06 message: “Game content could not be verified. No saved campaign data was changed.” No campaign/store is opened or modified. Current empty temporary application content remains temporary; Step5 must not pretend it is an implemented campaign module. A minimal explicit content readiness input can be added to construction only with the S02 impact approved; no broad application API replacement.

The existing Step4 diagnostic stays a safe synthetic initial-state check and must be labelled as such; it does not certify content completeness or change the selected slice build to full. Its original full-profile synthetic input can remain as a pure test value. Query strings cannot select a production content profile.

### 8.1 Explicit view projections

The following allowlists define both views. Every projected top-level item retains `id` and `type`; no item retains `trace`. An absent column entry means no additional fields. Listed nested objects use the nested projection rules below, never an unchecked shallow copy. No future schema field enters either view until its projection is added explicitly. Family arrays retain selected authored order. Runtime indexes, if built privately, cannot add public fields.

| Family/subtype              | Additional rules fields                                                                                                                       | Additional presentation fields                                                                      |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| characters                  | presence, speakerId, relationshipId                                                                                                           | nameKey, roleKey, presence, speakerId                                                               |
| locations                   | roomType                                                                                                                                      | nameKey, roomType, cueRoles, mappingKey                                                             |
| actions                     | workClass, periodCost, baseEnergyCost, command, reasonKeys                                                                                    | labelKey, workClass, periodCost, baseEnergyCost, forecastKey, reasonKeys                            |
| experiments                 | availability, family, maxRuns, goalIds, options, stageActions, monitoringOffsets, recordId, evidenceIdPattern, scienceDefinitionIds, outcomes | family, labelKey, questionKeys, pairedLimitForecastKey, options, scienceDefinitionIds, outcomes     |
| tasks/experimentRequest     | availability, command, experimentId, choices, resultRefs, activeRequestId                                                                     | labelKey, choices                                                                                   |
| tasks/manuscript            | availability, command, actionId, allowedClaimIds, resultRefs, activeRequestId                                                                 | labelKey, allowedClaimIds                                                                           |
| tasks/sliceRehearsal        | availability, command, actionId, allowedClaimIds, experimentId, completionId, activeRequestId                                                 | labelKey, allowedClaimIds, completionId                                                             |
| tasks/career                | availability, command, choices, resultRefs, activeRequestId                                                                                   | labelKey, choices                                                                                   |
| roomStates                  | availability, locationId, affectedExperimentIds, activationEventId, routes, expiryRouteId                                                     | locationId, forecastKey, routes                                                                     |
| events                      | availability, status, priority, authoredOrder, delivery, cue, fallback, threadId, effects                                                     | cue                                                                                                 |
| scenes                      | availability, eventId, locationIds, mandatory, baseForm, conditionalForm, choices, periodEffect, completionEffects, recapKey                  | eventId, locationIds, cue, baseForm, conditionalForm, choices, periodEffect, closingBeats, recapKey |
| messages                    | availability, eventId, senderId, threadId, forms, choices, deferral, followupEventIds, expiryEffects                                          | senderId, subjectKey, forms, choices                                                                |
| notifications               | availability, eventId, senderId, threadId, forms, followupEventIds                                                                            | senderId, forms, presentation                                                                       |
| records                     | availability, family, forms, source, selection, reviewerForms                                                                                 | family, titleKey, forms, repeatNoteKeys, reviewerForms                                              |
| endings                     | family, when, variants                                                                                                                        | family, bodyKey, variants                                                                           |
| citations                   | when, permanent                                                                                                                               | titleKey, bodyKey, permanent, archiveOrder                                                          |
| environmentalItems          | availability, locationId, acts                                                                                                                | locationId, presentation, textKeys                                                                  |
| contextualLines             | availability, speakerId, when                                                                                                                 | speakerId, textKey                                                                                  |
| tutorials                   | availability, trigger, inputActions                                                                                                           | headingKey, bodyKey, acknowledgement, inputActions                                                  |
| interface/interface         | availability, purpose, confirmation, definitions                                                                                              | purpose, textKeys, confirmation, dynamicFields, definitions                                         |
| interface/scienceDefinition | kind, meaning                                                                                                                                 | kind, meaning, labelKey                                                                             |
| audio                       | role                                                                                                                                          | role, meaningKey, duplicateInterfaceId, handoffRoleId                                               |

Nested allowlists:

- Rules Availability, Conditions, Ref, OwnedRef, StageActions, Delivery, Window and the closed effect/result variants retain every validated field. Reason keys and explicit notice keys are identifiers needed by S04, not English values. A cue in the rules view retains id/locationId/interfaceId/audioId so the scheduler can emit the approved cue; it contains no resource.
- Rules TextForm and SceneForm retain id/when only. Rules Choice retains id/options; Rules Option retains id/when/effects/confirmationKey/recapKey. The confirmation and recap identifiers support the approved command result; rules never read their English values. Rules RoomRoute uses the subsection20.2 union: every variant retains kind/id/when/effects; `directResolve` also retains actionId/resultReasonKey/result; `openScene` retains eventId; `sceneResolve` retains actionId/resultReasonKey/trigger/result. No obsolete flattened equipment/control/coverage fields exist.
- Rules ExperimentOption retains id/kind/value; Rules LaserOutcomeRow retains section18's candidate input fields for the approved section16 D3 mapping and semantic result IDs, excluding bodyKey. The later frozen amendment must preserve this exclusion. Rules InterfaceDefinition retains id/kind/value, and reviewerForms retains id/value.
- Presentation TextForm retains id/bodyKeys; SceneForm retains id/beats; Choice retains id/options/recapKey; Option retains id/labelKey/confirmationKey/recapKey/closingBeats. Presentation RoomRoute also uses the strict union: `directResolve` retains kind/id/labelKey/actionId/result; `openScene` retains kind/id/labelKey/eventId; `sceneResolve` retains kind/id, its null labelKey/actionId, trigger and result. Only directResolve/openScene variants can become room-choice controls; sceneResolve stays an internal join from the committed scene option. Beat retains all validated fields: only IDs and one text-key or choice reference, no conditions/effects.
- Presentation ExperimentOption retains id/kind/labelKey; presentation outcome entries retain their exact identity/input discriminants, semantic result IDs and bodyKey. They are definitions for projection of a currently visible result, not permission to expose future results in the player interface. InterfaceDefinition retains id/kind/value/labelKey; reviewerForms retains id/value. Cue retains its validated semantic references.
- All other listed primitive values, ID arrays, key arrays and closed semantic enums are copied exactly. Neither view retains source references. English values occur only in strings. Metadata is the exact BuiltMetadata object.

The presentation definition view remains private to the application/presentation assembly. A player's UI receives only the current S09 projection, not the entire future-story dictionary. This boundary does not claim that client-side data is secret from a person inspecting a browser bundle.

Projection cases required before code acceptance: source trace omitted and rejected in a built item; effect deltas absent from the presentation view; S04 reason/notice keys present in the rules view with no English values; all form/option IDs retained to join rule-selected state to exact text; an extra source field cannot enter a view; input mutation cannot change either view; nested arrays/objects are deeply immutable.

## 9. Phase-aware commands and tool ownership

Proposed root script changes (same exact dependencies/lockfile):

| Command                       | Proposed behavior                                                                                                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                 | After implementation: Vite default mode requests full and fails with incompleteProfile while full is incomplete                                                   |
| `npm run dev:slice`           | `vite --mode slice`; fixed selected slice                                                                                                                         |
| `npm run build`               | `npm run typecheck && vite build`; default full must fail while incomplete                                                                                        |
| `npm run build:slice`         | `npm run typecheck && vite build --mode slice`                                                                                                                    |
| `npm run content:check`       | `node --experimental-strip-types scripts/check-content.ts`; validates source and prints safe relative issues only                                                 |
| `npm run test:build-profiles` | `node --experimental-strip-types --test scripts/test-build-profiles.ts`; full/fallback/unknown rejection and explicit slice success in isolated temporary outputs |
| `npm run check`               | Existing typecheck/lint/format/unit sequence plus content:check                                                                                                   |
| `npm run verify`              | lint, format, test:coverage, content:check, test:build-profiles, build:slice, test:e2e in that order                                                              |
| `npm run test:e2e`            | Existing command; Playwright server uses dev:slice under the accepted phase contract                                                                              |

Primary preparation proof on Node24.20.0 passed: a temporary ESM `.ts` entry imported a value and a type through an explicit `.ts` relative path, ran with `--experimental-strip-types`, and passed installed TypeScript6 typechecking with `--moduleResolution bundler --allowImportingTsExtensions --noEmit`. Proposed Node-loaded modules use erasable syntax and explicit `.ts` relative imports throughout their transitive graph. Add `allowImportingTsExtensions:true` and `scripts/**/*.ts` to tsconfig, and Node globals for scripts to ESLint. Existing extensionless rules runtime imports must not enter that graph; type-only public imports are erased. This is a loading proof only, not a completed content/build integration test.

Vite resolves omitted development/build modes to `development`/`production`. The adapter maps those two built-in modes to full, explicit `full` to full, `fallback` to fallback, and `slice` to slice; every other mode yields invalidProfile. This explicit mapping is necessary for the default scripts above. No process environment or query value selects the profile. The Vite plugin loads the one checked package through the candidate virtual module `virtual:minor-revisions-content` (declaration `src/content-package.d.ts`, WP00). It never generates tracked JSON or imports the raw catalogue into browser code. Before each requested build it removes only that requested output directory under the configured build/temp root, then validates; profile-selection/content failure leaves no stale usable output for that Vite invocation. This guarantee does not cover a preceding failed typecheck, because Vite has not run. A typecheck failure reports failure and must never be described as a fresh successful build; it can leave the prior dist files in place. No arbitrary caller path is recursively removed. The profile test invokes the actual Vite command with fixed modes and isolated output roots, checks the expected issue code, then inspects output identity and excluded strings. Its test implementation is still future work.

Default/full/fallback failure tests assert the safe `incompleteProfile` code and absence of usable output, not merely nonzero exit. Unknown modes reject invalidProfile. Browser tampering tests use a controlled test harness, never a shipped query parameter to bypass validation. Old startup/diagnostic behavior remains under explicit slice development; runtime query input cannot switch profiles. Test-only data never enters a selected production package.

Root owners: primary WP00 owns package.json, vite.config.ts, playwright.config.ts, tsconfig.json and eslint.config.js for the Node script include/import rules, bootstrap wiring and related tests. WP01 worker owns src/content and its unit tests. Primary WP07 owns root content during this phase. No worker edits another owner's file. New `.ts` build files require exact ESLint/typecheck inclusion and cannot use browser globals accidentally.

## 10. Slice source map and technical identities

This table is the preparation inventory, not a claim that selected data already exists. Existing IDs/keys are retained. Proposed nested IDs are technical identity assignments requiring the candidate approval; they do not introduce new characters, choices or game costs. Full/fallback selection records remain incomplete, with explicit arrays/counts and no fake prose.

| Selected group             | Existing authority and source keys                                                                                                                                                                                                             | Proposed representation / completeness condition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Clarified                  | design12 §MR-SCN-CLARIFIED; `MR-SCN-CLARIFIED`; `scene.clarified.internal.opening`, `.elena.opening`, `.elena.request`, `.choice.start`, `.choice.limit`, `.elena.afterStart`, `.elena.afterLimit`, `.internal.close`, `.recap`                | Reuse scene ID as event ID is forbidden by global authored uniqueness: candidate event `MR-EVT-CLARIFIED`; form `MR-FORM-CLARIFIED-BASE`; choice `MR-CHO-CLARIFIED`; options `MR-CHO-CLARIFIED-START`, `MR-CHO-CLARIFIED-LIMIT`; beats `MR-BEAT-CLARIFIED-01`–`04` for three speech beats then choice. Selected option closingBeats contains its one Elena response. Scene closingBeats then contains MR-BEAT-CLARIFIED-07, speaker MR-SPK-INTERNAL, key scene.clarified.internal.close. The two option response beats are MR-BEAT-CLARIFIED-05 and MR-BEAT-CLARIFIED-06, speaker MR-CHR-ELENA; only the selected one plays. Skip uses the existing recap without playing either closing. Scene period0, mandatory, initially eligible, permanent; priority mandatoryContent,order0. |
| Laser/sham                 | design12 experiment/action/task/record tables; `MR-EXP-LASER-SHAM`, `MR-TASK-LASER-SHAM`, `MR-REC-LASER-SHAM`; `experiment.laserSham`, `task.laserSham`, `record.laserSham.strong \| limited \| weak`; C03 two question labels                 | Existing start window through15, monitoring offsets[0,1], run count2. Options/result matrix require section11 resolution. Template definition is shared with later profiles; slice horizon11 constrains actions separately. No experiment event/result is fabricated now.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Notebook                   | design12 notebook catalogue and English draft                                                                                                                                                                                                  | Select literal `record.projectNotebook.body` as the body key; treat catalogue `record.projectNotebook` as its key stem, not a second string. `MR-REC-PROJECT-NOTEBOOK` source is Clarified. Title text remains to be mapped explicitly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Facility route and Gabriel | design12 room table and §MR-OPT-GABRIEL-QUEUE; forecast `room.facilityQueue.forecast`; route keys `room.route.wait \| limited \| gabriel`; dialogue `optional.gabriel.queue.opening \| wait \| limited \| press \| closeA \| closeB \| closeC` | Candidate event `MR-EVT-FACILITY-QUEUE`; routes `MR-CHO-FACILITY-WAIT \| LIMITED \| GABRIEL`; optional scene event `MR-EVT-GABRIEL-QUEUE`, form `MR-FORM-GABRIEL-QUEUE-BASE`, choice `MR-CHO-GABRIEL-QUEUE`; options suffix WAIT/LIMITED/PRESS. Wait/press Ready; limited Limited; trust+10/0/-10. Basic limited route no extra response action. Triggers/confirmation/recap gaps are section11.                                                                                                                                                                                                                                                                                                                                                                                     |
| Tutorial001–008            | exact eight design12 rows: tutorial.move/interact/station/cost/sample/monitor/status/save                                                                                                                                                      | Body literals exist; distinct heading literals and precise trigger→input references do not all exist. Candidate: reuse six existing S09 topic headings for the eight tutorial bodies, with explicit first-feature triggers and semantic inputs in section19. No Step5 movement/persistence implementation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Save/recovery and menus    | `MR-UI-MENU-CONTINUE`, `MR-UI-MENU-NEW`, `MR-UI-MENU-SAVEQUIT`, `MR-UI-REPLACE-SAVE`, `MR-UI-SAVE-SUCCESS`, `MR-UI-SAVE-FAILURE`, `MR-UI-SAVE-RECOVERY`, `MR-UI-SAVE-RESET`; their exact design12 keys                                         | Include the eight rows as content only. Their source strings mention Archive; that text does not pull full ending/Citation data into slice. No enabled persistence controls until their step. Content-invalid fixed S06 message also included.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Claims and rehearsal       | corrected claim literals `manuscript.claim.careful \| strong \| inflated`; `MR-SLICE-CLAIM-REHEARSAL`; `MR-UI-SLICE-COMPLETE`; horizon0–11, cost1/1 focused                                                                                    | Candidate action `MR-ACT-SLICE-CLAIM-REHEARSAL`; interface semantic claim IDs `MR-CLAIM-CAREFUL \| STRONG \| INFLATED`, stored once. All three labels are visible; Leonardo approved honest Careful-only completion (D1). Strong/Inflated remain visible for comparison and cannot be committed in this rehearsal. Snapshot identity remains S03 `snapshot:<revision>`, not a new authored ID.                                                                                                                                                                                                                                                                                                                                                                                       |
| Scientific definitions     | all selected C02 rows in design12/S06 and mechanically defined `science.*` keys                                                                                                                                                                | Stored once under interface/scienceDefinition subtype; experiments reference them. Exact selected subset follows the approved laser outcome matrix; include no unused later-template labels.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Characters and speakers    | S06 exact recurring IDs; opening uses Elena, Gabriel and internal/protagonist speaker roles                                                                                                                                                    | Candidate selected character definitions Elena/Gabriel only; fixed S03 relationship roster still has five records and is not authored content selection. Physical Haoran/Samira starting placements need the later world/content boundary decision if their world display enters slice. Their absence cannot silently invalidate initial state or create unnamed character models.                                                                                                                                                                                                                                                                                                                                                                                                   |
| Locations                  | S06 semantic IDs for culture/main lab/PI office/facility/shared desks; S08 mapping                                                                                                                                                             | Candidate exact selected location set these five. All selected location labels must come from approved source; no invented room names. Additional corridor/traversal locations belong when world behavior is integrated, with explicit slice closure expansion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Audio roles                | design12 audio-role table; no slice-specific list currently exists                                                                                                                                                                             | Recommended candidate selects semantic culture/lab/PI/facility ambience roles, scene/attention cues and Elena/Gabriel dialogue palettes; assets remain absent. Exact finite IDs: AMB-CULTURE/LAB/PI/IMAGING, CUE-SCENE/ATTENTION, EL-01..08, GA-01..08. MR-MUS-01 opening role if approved. No audio resource or licence is implied. Empty audio is the alternative, requiring an explicit slice-contract decision, not an automatic omission.                                                                                                                                                                                                                                                                                                                                       |
| Excluded families          | slice boundary excludes later scenes/messages/endings/Citations/environmental distractions                                                                                                                                                     | Candidate empty messages, notifications, endings, citations, environmentalItems, contextualLines arrays until a selected required dependency proves otherwise. Profile completeness cannot ignore a referenced excluded item.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

The inventory currently has real unresolved typed/result/text dependencies. Therefore it cannot honestly supply final selection counts or a `complete` production slice yet. Final implementation approval must attach a fully enumerated ID/Key/count list with no ranges/stems used as runtime selections. Technical ID ranges in this document are drafting notation only; the approved source manifest will enumerate every ID.

## 11. Concrete pending source decisions

These are the remaining gates to a complete implementation packet. The contract can be reviewed now; code/root content cannot start while these are unresolved. Prefer one consolidated decision rather than repeated worker interruptions.

| Decision                                   | Exact recommended candidate                                                                                                                                                                                                                                                                                                                                                                                                    | Why still needs approval/evidence                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 — Slice claim interaction (approved)    | Show all three existing claim labels. Permit honest Careful commit after a usable laser reading with relevant control/caveat; Strong/Inflated remain visible with missing-support explanations. Completion follows successful Careful rehearsal and verified save checkpoint within11.                                                                                                                                         | Leonardo explicitly approved this recommendation on2026-09-06. This is a slice-only exception to general confirmed incomplete manuscript commits. Record in the exact frozen amendment before code; no further D1 approval is needed. |
| D2 — Minimal missing UI text               | `ui.slice.complete`: “Slice complete.”; `ui.slice.rehearsal`: “Review the claim.”; `ui.slice.rehearsalForecast`: “Review the claim before completing this slice.”; `ui.slice.rehearsalConfirm`: “Save this claim and complete the slice?”; `ui.slice.rehearsalReason`: “The claim rehearsal is complete.”; the six existing S09 heading labels mapped in section19 (supersedes the proposed shared “Getting started” heading). | New literal text, presented for review here; costs remain separate dynamic values. Does not supply unapproved scene recaps, record titles or warning text. Those need source mapping or further candidate wording.                    |
| D3 — Laser raw outcomes (approved)         | Section16 supplies the approved biological result and observation projection, source text and representative vectors. It distinguishes absent/unobserved/partial recovery and room/quality limits without changing C02 meanings.                                                                                                                                                                                               | Leonardo approved this exact mapping on2026-09-08. Record it in the final amendment before authoring production rows; no further D3 approval is needed. No numeric laboratory results or real protocols are added.                    |
| D4 — Monitoring action bindings (resolved) | Routine monitor and stop both bind MR-ACT-MONITOR-ROUTINE, cost1/0. Quality check and stabilize both bind MR-ACT-MONITOR-QUALITY, cost1/1. Stop uses experiment.stop.confirm.                                                                                                                                                                                                                                                  | Design12 main action table lines140–141 and forecast rows186–187 already specify these meanings. Primary corrected the earlier inventory omission; no new game decision or approval is needed.                                        |
| D5 — Scene/event/trigger definitions       | Approve technical IDs in section10; Clarified priority/order and0-period effect above. Facility uses existing W1–W4 window, first shared-facility conflict, expiry Limited. Gabriel closes by committed option; section19 adds exact option-specific recap candidates and tutorial triggers.                                                                                                                                   | “First conflict” still needs a typed trigger and cue definition; room/model interactions do not exist at Step5. Tutorials similarly need exact public input-action registry mapping.                                                  |
| D6 — Audio and slice dependency extent     | Select only semantic role records listed in section10; postpone all actual resources to their asset steps. Include only the character/location dependencies needed by the approved slice content; qualify later world closure separately.                                                                                                                                                                                      | Source slice list is not a complete audio/world-content selection. Approval of semantic roles is not asset selection/integration.                                                                                                     |
| D7 — Phase validation                      | Approve explicit slice dev/build and verification of expected incomplete-profile failures, preserving default full. Static content closure in Step5; actual journeys remain Gate6A/later rules.                                                                                                                                                                                                                                | Changes root command/test contract and clarifies S06 reachability timing. Must be a named S01/S06/S13 amendment.                                                                                                                      |

If D5 or another open decision requires additional authoring, do it in primary-owned candidate documentation and obtain the resulting concrete decision before workers. D3 is closed. Do not treat approval of this architecture document as approval of unspecified future data. The preparation deliverable remains useful and reviewable with the remaining holds explicitly open.

## 12. Representative contract cases

The following compact JSON records are illustrative contract examples. IDs in examples are candidate identifiers, never silently shipped content. Tests eventually include valid complete catalogues as positive controls; a lone valid leaf is not a valid package.

Valid condition (Step4 starting energy4 is inside the range; runtime execution deferred):

```json
{ "type": "integerInRange", "fact": "energy", "minimum": 0, "maximum": 5 }
```

Invalid closed target, even though JSON is structurally valid:

```json
{
  "type": "integerInRange",
  "fact": "/metadata/campaignSeed",
  "minimum": 0,
  "maximum": 5
}
```

Valid existing Gabriel wait-choice delta attachment:

```json
{
  "type": "adjustMetric",
  "owner": "chooseSceneOption",
  "reasonKey": "reason.trust.help",
  "metric": "trust",
  "characterId": "MR-CHR-GABRIEL",
  "delta": 10
}
```

The reason key above exists in design12 and the Gabriel wait-choice delta is already approved. A standalone effect still needs its valid owning choice in a complete catalogue. Changing owner to configureExperiment, adding a campaign path, substituting delta500, or placing this in a harmless contextual line is invalid. Any legal-range delta differing from the source-approved choice is also invalid; schemas alone do not authorize game changes.

Case matrix:

| Case                                                                  | Expected result and evidence                                                                                                                                              |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Duplicate escaped JSON member                                         | malformedJson/duplicateTextKey according to parsing stage; no value. Duplicate text members specifically use duplicateTextKey; duplicate members elsewhere malformedJson. |
| Missing explicit null/common field or extra field                     | invalidObject, exact relative file/JSON path; no inferred default                                                                                                         |
| Control semantic definition says matched but ID is MR-CONTROL-LIMITED | invariantFailure; no validated package                                                                                                                                    |
| TRACKS-RECOVERY with no same-record recovery                          | invariantFailure                                                                                                                                                          |
| Honest RECOVERY reading with both recovery facts false                | invariantFailure                                                                                                                                                          |
| Explicit dishonest reported support                                   | source allows the approved reading/integrity route; raw facts unchanged; campaign rule test remains separate from content validation                                      |
| Full requested while incomplete                                       | incompleteProfile and no usable build, no fallback switch                                                                                                                 |
| Slice complete but later ending dependency selected                   | excludedDependency/invariantFailure per first failing S06 stage                                                                                                           |
| Source scene↔owning event delivery backlink                           | valid ownership relationship, not a false circularReference                                                                                                               |
| Prerequisite cycle A→B→A or replacement A→B→C                         | circularReference                                                                                                                                                         |
| Selected strings at6000/6001 unique words                             | valid / wordLimitExceeded; exact NFC/lowercase/apostrophe/placeholder normalization from S06                                                                              |
| Failed Vite profile build after successful slice build                | no stale usable requested output after Vite profile/content rejection; preceding typecheck failure may retain old output but never reports fresh success                  |
| Caller mutates raw source after validation                            | immutable checked output unchanged                                                                                                                                        |
| Consumer attempts to mutate frozen view                               | value remains unchanged; view slicing prevents legitimate rules port from receiving prose                                                                                 |
| Invalid embedded package at startup                                   | fixed content-invalid message; no campaign/save mutation; diagnostic is not a bypass                                                                                      |

English placeholder spelling is another exact representational choice: proposed `{protagonistName}`, `{subjectPronoun}`, `{objectPronoun}`, `{possessiveAdjective}`, `{possessivePronoun}`, `{reflexivePronoun}` only. Literal braces outside those tokens are invalid. This names S06's existing six meanings; source strings using different spellings must be mapped without inventing additional variables. Key maps reject HTML tags/scripts, unknown placeholders and arbitrary expressions; scientific-safety/funny/voice review remains human/primary review, not a regex claim.

## 13. Impact, implementation holds and handover

| Affected authority      | Proposed change to approve in final packet                                                                        | Consumer/test impact                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| MR-IF-006 / S06         | v3 exact schemas, nested semantic ownership, source/result/view fields, registries, selected slice map and limits | content/build/bootstrap/rules/scheduler/UI/persistence tests; no campaign schema change      |
| S01 package/toolchain   | exact explicit slice scripts, phase-aware verify, Node script import proof and TS config inclusion                | foundation assertions, Vite/Playwright, existing check/verify commands; no dependency change |
| S02                     | validated content readiness and generated-package import at bootstrap; retain public module entrances             | startup tests, safe failure and temporary adapter isolation                                  |
| S13                     | exact Step5 WP01/WP07/WP00 ownership and phase validation commands                                                | work orders/contribution records; no new work package or numbered step                       |
| Design12/S06 slice text | D1 and D3 approved slice rules; D2/D5/D6 candidate additions only; D4 existing action bindings                    | source catalogue completeness and semantic cases; asset plans remain separate                |
| S12 / Gate6A            | Step5 native tests demonstrate structural contract; shared fixture format and runtime replay remain Step6/later   | no false shared-manifest or runtime journey pass                                             |

Current candidate does not freeze absent full-campaign payloads, generate runtime prose, mark a production slice complete or begin code. Proposed fixed text is explicitly identified for review. Worker orders cannot be issued until the final selected contract fills every field registry/projection and the unresolved source facts in D1–D7 (D4 is resolved from existing authority). Historical checkpoint `735816b` preserves the candidate implementation-file outline. The final approval packet must include a current exact implementation plan and state which decisions it settles. MR-IMP-OPEN-021 stays open until that exact package is approved;020 remains separate.

## 14. Primary readiness audit and remaining work

The candidate is suitable for independent gap/architecture review, not implementation approval. Leaf examples in section12 illustrate expected classification; no content validator exists to execute them. The Node loading proof is the only executable technical experiment in this preparation. No production source selection, content build, or campaign journey has passed.

The following details must be closed in candidate documentation under the existing preparation authority before an exact implementation approval request:

1. Validate subsection8.1's enumerated projections against the final source schema. Finish semantic mappings for PIIM roles, claim levels, all accepted manuscript requirements and concern route impacts; include only the slice dependencies now and keep unsupported later-profile content incomplete.
2. Finish the attachment-to-command table and fact/value correlations. Verify saved-choice use against the once-selected variant invariant; a structural `Record<string,string>` alone is insufficient proof of the intended meaning.
3. Extend the outcome key beyond observation choice/control when coverage, reliability or process facts affect raw truth. Explicitly distinguish authored biological outcome from runtime observation/reliability projection. The section6 OutcomeRow is a candidate sketch and cannot stand in for that missing mapping.
4. Complete selected literal titles, confirmations, recaps, tutorials, reasons and input/world/audio registries. Do not make creative source gaps appear merely by demanding redundant text fields: reuse approved text where its meaning fits, and justify each genuinely new literal.
5. Resolve every complete-profile selection/count and each missing reference. The source table includes approved D1, resolved D4, recommendations and unfinished source-definition work; blanket approval cannot authorize the unfinished parts.
6. Reconcile any S06 invariant that requires later runtime algorithms with the exact later gate. Static prerequisite satisfiability also needs a defined algorithm or a narrower named check; it cannot be claimed from reference closure alone.

These holds belong to MR-IMP-OPEN-021. Full/fallback result variants can remain explicitly unsupported while those profiles are incomplete, but the current slice contract must become fully closed before implementation. No number of passing schema examples substitutes for that closure.

## 15. Independent high-level review and disposition

A fresh read-only reviewer examined the full candidate/plan, control diff and permitted sources on2026-09-06. Requested routing: gpt-6-astra/xhigh for high-level shared-contract review. Actual exact model/effort could not be verified; see ai-use-log.md. No code, runtime or content-validator tests ran. Verdict: suitable only as a draft gap record; known readiness holds block code.

- R1: corrected scene result ownership to final chooseSceneOption (or permitted no-choice skipScene), not requestScene.
- R2: separated built items from source trace and retained reason/notice keys without English values in the rules view. Subsection8.1 now enumerates the candidate recursive projections; final outcome-shape alignment and semantic-role mappings remain in section14.
- R3: split manuscript predicates into correlated variants and restored required/optional event status and order0–9999.
- R4: restored the approved final Clarified internal closing and ordered, speaker-specific selected response beats.
- R5: recorded Leonardo's newly approved Careful-only rehearsal completion as a slice-only exception; frozen amendment still pending.
- D3 remains a real source gap: biology, observation masks, control, coverage, reliability, raw semantic IDs and permitted readings need their exact mapping.
- A1: monitor/stop and quality/stabilize already share their approved costs; no new D4 decision.
- A2: narrowed the fallback warning to actual saved-selection loss, distinct from approved native fallback composition.
- A3: changed unverifiable runtime identity wording; absence of exposed metadata does not prove a routing mismatch.

2026-09-08 disposition: Leonardo approved the complete section16 D3 mapping. This closes the D3 source-meaning finding. The final authoritative amendment and exact profile selection remain pending.

These corrections do not close the known section14 implementation holds. The full exact candidate needs independent high-level review after those holds are closed, before its freeze/implementation approval request. No reviewer or primary accepts Step5 here.

## 16. D3 approved laser-result contract

Leonardo approved this exact D3 mapping on2026-09-08. It closes the laser source meaning without another random draw, extra support points, or invented causal evidence. It must enter the final authoritative amendment before source files or code use it. It applies to both baseline and higherRisk questions. Their existing preparation issue and saved question remain different; the same earned biological category retains the same meaning.

### Biological result definitions

| Candidate nested identity        | Existing result category | Approved underlying meaning                                                                                                                                                            |
| -------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MR-EXP-LASER-SHAM-RESULT-STRONG  | Strong                   | Clear structure recovery and coordinated rhythm recovery; result is interpretable.                                                                                                     |
| MR-EXP-LASER-SHAM-RESULT-LIMITED | Limited                  | Partial structure recovery; rhythm recovery is not observed in the result. This chooses the partial-recovery branch of the existing “partial recovery or unclear control” description. |
| MR-EXP-LASER-SHAM-RESULT-WEAK    | Weak                     | Unreliable record; neither view establishes recovery. It does not establish that recovery failed.                                                                                      |

No laser row establishes repatterning association in this approved slice mapping: its raw repatterning ID is MR-REPATTERNING-UNOBSERVED. This is absence of an observation, not a fictional finding of no association. Later templates must still provide the required association-present and association-absent examples; this slice mapping does not author those results.

The existing S04 seed/band/bucket table chooses Strong/Limited/Weak. Control selection, viewing choice and quality check never choose a different biological result. Limited equipment and the higher-risk choice retain their approved effects on preparation before the result is determined.

### Approved observation projection

- Structure focus retains the structure observation only; rhythm is MR-RHYTHM-UNOBSERVED.
- Rhythm focus retains the rhythm observation only; structure is MR-STRUCTURE-UNOBSERVED.
- Paired focus with the quality-check response and full room coverage retains both observations.
- Paired focus without quality check, or with the limited room route, retains structure only and marks rhythm MR-RHYTHM-UNOBSERVED. Leonardo approved this retained view on2026-09-08; it was not already stated in C02/C03. The forecast must show the limit before the player commits.
- For Strong, a retained structure/rhythm uses its RECOVERY ID. For Limited, retained structure uses MR-STRUCTURE-PARTIAL and retained rhythm uses MR-RHYTHM-NONE. For Weak, every raw view uses UNOBSERVED, including a selected view: unreliable evidence cannot prove absence or recovery.
- The control ID is exactly the approved stored controlKind. The limited room route always yields MR-CONTROL-LIMITED and limited coverage. It cannot yield matched/full through quality check. With ready equipment, single focus can have full coverage of that selected view; full coverage does not mean that both views were selected.
- Fatigue, monitoring, remaining-repeat and mismatch facts remain separate inputs to the existing S04 evidence-quality priority. A positive raw observation does not automatically make a card Usable. No quality state or support point is pre-awarded by these source definitions.

A missed observation always sets observationCoverage to limited, including a single-focus run with ready equipment. The approved laser-specific mapping retains any otherwise reliable selected observation, but marks its coverage limit explicitly and sends the missed/process fact through S04 quality priority. It does not turn an unreliable result into a reliable one or award Usable status. For paired focus, a missed response has no qualityCheck and therefore retains at most structure. Leonardo approved this retained-observation choice on2026-09-08; the earlier source mandated the coverage reduction but did not choose the retained view.

The finite source matrix must enumerate permitted combinations of biological result, focus, room coverage and monitoring response (continue/qualityCheck/stabilize/missed), and reject contradictory room/control inputs. These approved fixed projection rules produce those rows; no authored expression evaluator is permitted. Step5 validates the matrix; later S04 command work executes the approved lookup.

### Honest reading compatibility

Use C02's existing predicates. RECOVERY needs at least one positive retained recovery observation; CONDITION and ASSOCIATION are relevant under the existing C02 table; the association caveat limits the claim and does not assert association evidence. PROCESS is also available when a process/coverage limit exists. ASSOCIATION is unavailable for this approved laser mapping because its association fact is never established. NO-RECOVERY is possible for the Limited rhythm-only result because its only selected observation is NONE; the unselected structure is not a selected missing observation. UNRESOLVED applies to Weak or a process-limited/inconclusive record. A Weak result cannot become a NO-RECOVERY result merely because both recovery booleans are false. The later connected check must use the saved focus to distinguish an unselected view from a failed selected observation.

D1 completion still requires a compatible honest **Usable** recovery card, control and caveat. Merely selecting the Careful label does not complete the rehearsal. A weak result is not rewritten to guarantee success; existing permitted repeat/restart behaviour remains in force.

### Approved fixed source text

Retain the existing strong body only for a full paired Strong observation. Do not show its unqualified rhythm sentence after a structure-only view. Approved additional fixed bodies:

| Key                               | Exact candidate text                                                                                                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| record.laserSham.strongStructure  | Observation: structure recovery is visible in this run. Rhythm recovery was not established. The control and coverage labels show the limits of the comparison.             |
| record.laserSham.strongRhythm     | Observation: coordinated rhythm recovery is visible in this run. Structure recovery was not established. The control and coverage labels show the limits of the comparison. |
| record.laserSham.limitedStructure | Observation: structure recovery is partial in this run. Rhythm recovery was not established. The result supports only the stated observation.                               |
| record.laserSham.limitedRhythm    | Observation: rhythm recovery was not observed in this run. Structure recovery was not established. This record does not support a recovery claim.                           |
| record.laserSham.limitedPaired    | Observation: structure recovery is partial, but rhythm recovery was not observed. The result supports only the stated structure observation.                                |
| forecast.laserPairedLimit         | Without a quality check and full room coverage, this paired view can establish only the structure observation. An unreliable result may establish neither view.             |

Use existing record.laserSham.weak for Weak, plus the exact raw semantic labels. The existing general Limited body remains available only where its wording matches the approved result; no duplicate string is selected merely to retain an unused variant. The source-selection manifest must assign every reachable row one exact fixed body. Leonardo approved these D3 source additions on2026-09-08. They are fixed authored text, not generated runtime prose.

### Representative expected vectors for the approved mapping

| Input                                                | Exact raw observation result                                                                                 | Meaning check                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Strong, structure, ready/matched                     | STRUCTURE-RECOVERY, RHYTHM-UNOBSERVED, REPATTERNING-UNOBSERVED, CONTROL-MATCHED                              | Recovery only in the selected structure view; no association.                                     |
| Strong, rhythm, ready/matched                        | STRUCTURE-UNOBSERVED, RHYTHM-RECOVERY, REPATTERNING-UNOBSERVED, CONTROL-MATCHED                              | Recovery only in the selected rhythm view.                                                        |
| Strong, paired, quality check, ready/matched         | STRUCTURE-RECOVERY, RHYTHM-RECOVERY, REPATTERNING-UNOBSERVED, CONTROL-MATCHED                                | Both recovery observations; still no association.                                                 |
| Strong, paired, routine, ready/matched               | STRUCTURE-RECOVERY, RHYTHM-UNOBSERVED, REPATTERNING-UNOBSERVED, CONTROL-MATCHED                              | Limited paired coverage; cannot claim the missing rhythm.                                         |
| Strong, paired, quality check, limited route         | STRUCTURE-RECOVERY, RHYTHM-UNOBSERVED, REPATTERNING-UNOBSERVED, CONTROL-LIMITED                              | Quality check cannot reverse the room-route constraint.                                           |
| Limited, paired, quality check, ready/matched        | STRUCTURE-PARTIAL, RHYTHM-NONE, REPATTERNING-UNOBSERVED, CONTROL-MATCHED                                     | Narrow structure recovery; no rhythm recovery.                                                    |
| Limited, rhythm, ready/matched                       | STRUCTURE-UNOBSERVED, RHYTHM-NONE, REPATTERNING-UNOBSERVED, CONTROL-MATCHED                                  | Honest no-recovery reading for the selected rhythm view; no positive recovery support.            |
| Strong, structure, ready/matched, missed observation | STRUCTURE-RECOVERY, RHYTHM-UNOBSERVED, REPATTERNING-UNOBSERVED, CONTROL-MATCHED; observationCoverage limited | Missing monitoring reduces coverage even for single focus; S04 still determines evidence quality. |
| Weak, any otherwise permitted configuration          | STRUCTURE-UNOBSERVED, RHYTHM-UNOBSERVED, REPATTERNING-UNOBSERVED, stored exact CONTROL                       | Unreliable, not evidence of biological failure; no positive support.                              |

All IDs in the vector table have their existing MR- prefix. These are approved expected vectors, not executed validator tests. Reject: limited route with matched control, unreliable row with RECOVERY/PARTIAL, unselected view marked recovered, any laser association claim under this approved table, or a result row that depends on control/focus to change its biological category.

### Section16 science review

A separate read-only high-level review found no fundamental science conflict preventing Leonardo's review of this proposal. It required correction of the forecast guarantee and explicit missed-observation coverage; the primary applied both above before approval. It also confirmed the need to disclose Limited rhythm-only's inability to complete D1 and to retain the existing association caveat for recovery readings. Leonardo approved these data and meaning choices on2026-09-08. They are not executed results or implementation readiness. The exact final matrix and quality-input bindings remain part of contract closure. Requested model/effort Astra/xhigh; actual exact identity/effort unavailable, recorded as unknown. No code or vectors ran.

## 17. Reviewed preparation checkpoint and validation

The focused high-level follow-up confirmed R1–R5 corrections and found the draft safe to commit as a preparation checkpoint, with two explicit pre-code closure notes. Primary limited the stale-output guarantee to Vite profile/content failures (an earlier typecheck can retain old output) and separated pure rehearsal commit from application-owned checkpoint verification/completion UI. Section5.1 further spells out candidate slice attachment owners; final cost-binding and source-literal closure remains required. No new command or D1 approval is needed.

Primary checks on this checkpoint: exact seven authorized documentation paths; all three illustrative JSON blocks parse; Markdown table/code boundaries, D1/D4 decision status, Clarified closing and scene-owner checks; Prettier and git diff whitespace checks. The temporary Node24.20.0 explicit `.ts` import and installed TypeScript6 no-emit proof passed. No runtime/source/configuration/dependency/asset changes, no content-validator execution, no new unit/browser tests and no complete production catalogue. Section16 vector rows are proposed expectations only.

Leonardo approved D3 on2026-09-08, including its asymmetric Limited result, observation restrictions and fixed source text. D1 is approved and D4 was already specified. Remaining preparation work: close the final outcome/source schemas, exact selected IDs/keys/counts, fitting reasons/recaps/headings, tutorial/facility triggers, semantic role mappings and final work-order paths. Then review the complete final contract and request approval of its exact amendments and Step5 implementation. Do not ask for preparation approval again or present this checkpoint as completion of Step5 preparation.

## 18. Remaining structural closure: exact candidate refinements

This section refines the draft within the existing preparation approval. D3 is approved, but MR-IF-006 remains frozen at v2 until Leonardo approves the final amendment. Where a shape below replaces an earlier sketch, the replacement is explicit.

### Outcome identity and observation inputs

Replace the earlier section6 OutcomeRow sketch with the following finite candidate row. `monitoringResponse` is a stored completed/missed response, not a new command. `stop` is excluded because a stopped run produces no raw record. For this one-window laser template, there is exactly one response; oxygen and other later templates remain outside this matrix.

```ts
LaserOutcomeRow = {
  familyChoice:'baseline'|'higherRisk';
  biologicalResult:'strong'|'limited'|'weak';
  observation:'structure'|'rhythm'|'paired';
  access:'readyMatched'|'limitedRoute';
  monitoringResponse:'continue'|'qualityCheck'|'stabilize'|'missed';
  biologicalResultId:Id;
  structureId:Id; rhythmId:Id; repatterningId:Id; controlId:Id;
  observationCoverage:'full'|'limited';
  bodyKey:Key;
}
BiologicalResultDefinition = {
  id:Id; value:'strong'|'limited'|'weak';
}
```

The row key is the first five fields. The source contains exactly one row for each of their144 combinations (2×3×3×2×4), in that lexicographic field/value order as written. Row keys are not new saved authored IDs. Three BiologicalResultDefinition objects are owned once by the laser experiment and referenced by biologicalResultId; their IDs are section16's proposed Strong/Limited/Weak identities. The two research questions stay attached to familyChoice and do not double the three biological definitions. Section16 determines candidate row outputs. The matched versus limited access binding comes from the configured run's approved room route; it does not overwrite an existing run after a room changes.

Do not read this144-row shape as a support or card-quality table. Existing S04 still resolves suspicious/worthRepeating/usable/inconclusive from the saved process facts, available repeat and selected reading. Fatigue and mismatch do not choose a different biological or observation row. Any later requirement that they suppress a raw observation must be an explicit shared-rule amendment, not a worker inference.

Honest reading compatibility is a separate closed semantic relation from C02, evaluated against the row, selected focus and saved process/quality facts. Remove `readingIds` and `caveatIds` from OutcomeRow; they falsely suggest that rows alone can decide every process-limited reading. The experiment retains scienceDefinitionIds for permitted choices; C02 supplies their predicates. Apparent altered/unsupported reporting uses the existing S04 integrity route and never rewrites these rows. No Step5 predicate execution or command implementation is authorized.

The selected laser/sham object is the strict `LaserShamExperiment` variant. It adds these exact fields to the common experiment fields:

```ts
labelKey: 'experiment.laserSham';
questionKeys: {
  baseline: 'experiment.laserSham.question.baseline';
  higherRisk: 'experiment.laserSham.question.higherRisk';
}
pairedLimitForecastKey: 'forecast.laserPairedLimit';
biologicalResults: List<BiologicalResultDefinition>;
outcomes: List<LaserOutcomeRow>;
```

The static semantic validator requires exactly one `familyChoice` option for `baseline` and one for `higherRisk`. Each value maps to the same property in `questionKeys`; no other question property or key is permitted. It also requires the four literal fields above to equal the selected key registry. `pairedLimitForecastKey` is a presentation key for a validated row whose `observation` is `paired` and whose `observationCoverage` is `limited`. It describes the approved D3 paired-view limit. It does not choose an outcome or contain an executable expression.

The section8.1 rules projection retains all row fields except bodyKey and all biological definition fields. It excludes labelKey, questionKeys and pairedLimitForecastKey. Presentation retains the exact row key, semantic IDs, observationCoverage and bodyKey; the three exact text fields; and biological definitions with id/value. Inactive incomplete profiles cannot ship a different experiment family before its exact text and outcome-row variants are defined. Validation can recognize its family tag but must reject any authored text or result payload for which no closed schema exists. The selected-key audit must resolve every one of the 213 keys through an explicit object field, nested field or named fixed interface group; a value present only in `strings.en.json` fails as an unreferenced selected key.

### Reference target typing

The generic Ref and OwnedRef spellings are notation, not a universal reference permission. The following history references replace the earlier blanket top-level Ref assumption:

| History collection            | Legal target                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| completedContentIds           | Top-level scene, event, task or roomState definition                                                    |
| expiredContentIds             | Top-level expirable event, message or task definition                                                   |
| readMessageIds                | Top-level message definition                                                                            |
| consumedContextualContentIds  | Top-level contextualLine or notification definition, as its public once-only record operation specifies |
| displayedEnvironmentalTextIds | Top-level environmentalItem definition                                                                  |
| recordedSceneClosingIds       | Top-level scene definition; identifies its final closing receipt, not a beat                            |
| recordedSceneRecapIds         | Top-level scene definition; identifies its final recap receipt, not a text key                          |
| citationIds                   | Top-level citation definition; forbidden in slice                                                       |

Before freezing these sets, compare them to each approved S04/S05 operation that writes the named history. A structural S03 string array alone cannot establish which consumers write it. The selected slice must use only verified memberships; unsupported full-campaign writes remain held. In particular, do not add an environmental item, notification, event or room result merely because its ID fits the grammar.

### One action-cost owner

For the slice, choose the registered command action binding as the sole cost owner. Action definitions hold costs; no selected slice effect list contains applyActionCost. The six S06 authored effect discriminants remain recognized by the source schema, but applyActionCost is invalid on a slice attachment whose command already has a binding. Replace section5.1's undecided either/or representation with this rule. Clarified has no extra action cost; its0-period scene effect remains explicit. Gabriel's final choice consumes MR-ACT-RELATIONSHIP exactly once, whichever closing mode follows. Facility WAIT consumes MR-ACT-ROOM-WAIT; LIMITED consumes no response action. Rehearsal consumes its slice action exactly once; save retry consumes none.

### Deterministic checks that Step5 can honestly claim

Source validation checks exact shapes, references, ID/key uniqueness, table coverage, authored fixed costs, semantic row consistency, selected dependency closure, specified acyclic prerequisite graphs, explicit time-window intersections and required selected strings/counts. It does not claim satisfiability of arbitrary state predicates or a playable route from these checks. Replace section7's broad “noncontradictory authored prerequisite/window paths” claim with these named structural checks. Mutually exclusive leaf tests can reject direct contradictions on the same fact inside allOf, but complete symbolic path search is outside Step5.

Gate6A and later command/scheduler steps retain the actual temporal, cost, pressure, science, save and campaign replay checks. The eventual amendment must give each deferred S06 journey requirement its named owning step/gate. The final code approval packet cannot describe a Step5 static pass as a full-game or slice playthrough.

Primary temporary enumeration on2026-09-06–07 generated144 unique candidate row keys, with42 full-coverage and102 limited-coverage rows, including48 Weak rows. It checked question-invariant observation outputs, weak/unobserved rows, limited-room control/coverage, missed-response coverage, focus masks and the selected Strong-paired and Limited-rhythm vectors. This arithmetic checks the approved mapping only; it is not a production validator test or evidence that any seed can complete the slice. The routine used a Cartesian product of the five field lists above and the exact section16 projection rules; no runtime game file was written.

## 19. Concrete remaining text and input proposals

Prepared on2026-09-07. These tables close the earlier vague requests for titles, reasons and recaps with exact candidate text. They remain proposed. Leonardo need not author technical keys. Approval of D1 does not approve these new strings.

### New short text proposed for D2/D5

| Candidate key                       | Exact English value                                                                               | Purpose                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| record.projectNotebook.title        | Project notebook                                                                                  | Notebook title; existing body is unchanged.                |
| record.laserSham.title              | Laser/sham analysis                                                                               | Analysis title; the selected body follows D3.              |
| reason.pi.openingChoice             | Elena's paper confidence changed because of your reply about the initial result.                  | Clarified's existing +5/-5 result.                         |
| optional.gabriel.queue.recapWait    | You kept the queue. Gabriel reserved the later slot. Normal access is available.                  | Recap only after the confirmed WAIT choice.                |
| optional.gabriel.queue.recapLimited | You accepted the limited slot and recorded its limit. The equipment remains Limited for this run. | Recap only after confirmed LIMITED.                        |
| optional.gabriel.queue.recapPress   | You asked for priority. Gabriel moved your request ahead. Normal access is available.             | Recap only after confirmed PRESS.                          |
| character.elena.role                | Principal investigator                                                                            | Existing role label from design05, Elena cast paragraph.   |
| character.gabriel.role              | Facility scientist                                                                                | Existing role label from design05, Gabriel cast paragraph. |

For Gabriel, use the selected option's recapKey. Do not play a generic recap that loses the confirmed route. Change scene.recapKey and Choice.recapKey to explicit null for this optional scene; each option supplies its recap. Clarified retains its existing scene.clarified.recap for both choices. This is a proposed shape refinement: a committed choice uses its required non-null option.recapKey. A permitted no-choice terminal route requires and uses a non-null scene.recapKey. A terminal route without its required recap is invalid; content contains no executable selection expression.

Use existing ui.action.warning as the general confirmation explanation. Show the existing action cost separately. A normal choice still needs Primary Action confirmation, but it does not need a second generic irreversible-choice modal unless S04/S09 actually requires that modal. Do not add an extra confirmation merely because the option changes trust. Stop keeps experiment.stop.confirm; rehearsal keeps D2's exact proposed ui.slice.rehearsalConfirm.

Use the existing six S09 topic labels as tutorial headings through new technical keys rather than the earlier proposed tutorial.heading / “Getting started”. This supersedes that single-heading proposal before approval:

| Tutorial   | Proposed heading key and existing literal         | Body key          | Semantic input references            |
| ---------- | ------------------------------------------------- | ----------------- | ------------------------------------ |
| MR-TUT-001 | tutorial.heading.moveLook — Move and Look         | tutorial.move     | move, look                           |
| MR-TUT-002 | tutorial.heading.interact — Interact              | tutorial.interact | primaryAction                        |
| MR-TUT-003 | tutorial.heading.focusedViews — Focused Views     | tutorial.station  | primaryAction, backPause, uiNavigate |
| MR-TUT-004 | tutorial.heading.costs — Time and Energy Costs    | tutorial.cost     | primaryAction, backPause             |
| MR-TUT-005 | tutorial.heading.focusedViews — Focused Views     | tutorial.sample   | primaryAction                        |
| MR-TUT-006 | tutorial.heading.costs — Time and Energy Costs    | tutorial.monitor  | primaryAction                        |
| MR-TUT-007 | tutorial.heading.researchStatus — Research Status | tutorial.status   | researchStatus                       |
| MR-TUT-008 | tutorial.heading.localSaving — Local Saving       | tutorial.save     | backPause, primaryAction             |

The six topic headings come from S09, Week1 tutorial paragraph; the eight bodies come from design12 rows1126–1133. Sharing a heading does not merge the eight tutorial identities or first-display receipts.

### Exact input-name representation

S09 specifies nine action meanings but does not assign MR-prefixed authored IDs. The final candidate tutorial field is `inputActions:Set<InputAction>`. Its only slice trigger is the firstSemanticEvent variant below; no separate input-trigger variant is selected. This avoids inventing a tenth content family or a registry of fake authored objects. InputAction is the exact closed candidate spelling: move, look, uiNavigate, primaryAction, backPause, researchStatus, previousPanel, nextPanel, interactionAssist. These map one-to-one to S09's nine action names. They are semantic values, not bindings; remapping a key never edits content.

Tutorial triggers need semantic lifecycle events, not an assertion that the player already pressed the action being explained. Candidate exact first-eligibility names are: freeMovementReady, interactionTargetReady, focusedViewOpened, actionCostShown, sampleConfigured, monitoringWindowAvailable, researchStatusAvailable, safeSaveAvailable. Each tutorial001–008 uses the corresponding name in that order. Replace the earlier generic TutorialTrigger sketch for this slice with `{kind:'firstSemanticEvent',event:<one of those eight literals>}`. The later owning input/UI/application/experiment step must emit the event only when its feature exists. Step5 validates the names and source mapping; no tutorial can fire from the current temporary startup.

Trigger availability is a proposed presentation timing contract. A tutorial remains dismissible with the current input binding; it does not consume periods or choose an action. Later UI work must reconcile its first-display receipt with the S03 history model before execution, rather than silently storing an arbitrary ID in an unrelated list.

### Existing labels that need keys, not new prose

| Selected item         | Candidate key               | Existing literal source                |
| --------------------- | --------------------------- | -------------------------------------- |
| MR-CHR-ELENA          | character.elena.name        | Elena — design12 Clarified script      |
| MR-CHR-GABRIEL        | character.gabriel.name      | Gabriel — design12 queue script        |
| MR-LOC-TISSUE-CULTURE | location.tissueCulture.name | Tissue culture — S08 recovery anchors  |
| MR-LOC-MAIN-LAB       | location.mainLab.name       | Main laboratory — S08 recovery anchors |
| MR-LOC-PI-OFFICE      | location.piOffice.name      | PI office — S08 recovery anchors       |
| MR-LOC-SHARED-DESKS   | location.sharedDesks.name   | Shared desks — S08 recovery anchors    |
| MR-LOC-FACILITY       | location.facility.name      | Facility — S08 recovery anchors        |

Location.mappingKey uses the existing exact semantic MR-LOC identity and the S08 map, not an asset path or invented coordinate. No label authorizes geometry, a character model or an audio file. The selected early content still has two character definitions and five location definitions as proposed in section10; the fixed S03 relationship/placement roster is not removed. Later world integration must explicitly close any additional selected label dependencies.

### Review and evidence boundary

The bounded read-only source scan located existing keys and distinguished authored literals from catalogue headings. Primary checked S08's recovery-anchor labels, S09's tutorial/confirmation paragraph and design12's Gabriel script. The new title/role/reason/recap strings above are primary proposals, not claimed source quotations. Source labels and technical key assignments remain separate. Leonardo approved D3's science and result text in section16 on2026-09-08.

### 2026-09-07 focused review and binding-text hold

The fresh high-level review found no blocker to a draft checkpoint or D3 design discussion, confirmed the144-row structure/projections and cost ownership, and required one explicit source conflict. Design12's tutorial.move, tutorial.interact and tutorial.status bodies hard-code keyboard/mouse instructions (WASD/mouse, E, Tab). S09 requires the current input binding. The semantic inputActions list does not correct those fixed sentences. Before production content or tutorial execution, propose and approve neutral fixed wording with separately displayed current bindings, or a precise equivalent presentation rule. Do not claim the existing three bodies are suitable for every device/remap. This is part of021/D2/D5, not a new numbered step.

Primary also applied the two advisory wording corrections: state the final semantic input field/firstSemanticEvent trigger directly, and use required option recap for a committed choice versus required scene recap for a no-choice terminal route. Gabriel's role now uses the existing design05 label Facility scientist. These changes record source evidence and clarify the proposed shape; no runtime accessibility behavior is implemented.

Completed checks: source comparisons noted above,144-row temporary enumeration and focused invariants, three illustrative JSON blocks parsed, Markdown table boundaries, exact seven-document scope, formatting and diff whitespace. Independent review remains draft-level. D3 is approved. Other new fixed text, selected profile closure and the final amendment/implementation packet remain unapproved or incomplete as marked.

## 20. Final closure candidate for Leonardo's amendment review

Prepared on 2026-09-08 under the existing Step 5 preparation approval. This section is the proposed closure of D2, D5, D6 and D7. For implementation review, it supersedes every earlier candidate schema, selection, route, audio, source-gap, ownership and readiness sketch in sections 1–15 and 18–19 where the text conflicts. Section 16 remains the approved D3 meaning. Section 17 remains historical review evidence. D1 and D3 remain approved. D4 remains existing authority. The choices in this section are concrete candidates until Leonardo approves the final amendment packet.

### 20.1 Binding-safe tutorial text and receipt

Replace only the three device-specific tutorial bodies. The other five design 12 bodies remain exact.

| Key               | Proposed exact replacement                                                      |
| ----------------- | ------------------------------------------------------------------------------- |
| tutorial.move     | Use Move to travel through the room. Use Look to change your view.              |
| tutorial.interact | Look at a marked object and use Primary Action to interact.                     |
| tutorial.status   | Open Research Status to review visible changes without showing hidden formulas. |

The source field is `inputActions:List<InputAction>`. It is ordered, contains no duplicate and uses the exact order in the tutorial table below. The immutable content presentation copy contains ordered `{action,labelKey}` rows only. It never contains a key, button, device name or `currentBinding` value. When tutorial UI exists, the S09 UI projection joins each static row to the current binding from `InputView` at display time. That later joined `TutorialPromptView` is owned by UI under MR-IF-010; it is not validated or frozen inside the MR-IF-006 content package. The selected input-label keys are:

| InputAction    | Text key                    | Existing S09 label |
| -------------- | --------------------------- | ------------------ |
| move           | input.action.move           | Move               |
| look           | input.action.look           | Look               |
| uiNavigate     | input.action.uiNavigate     | UI Navigate        |
| primaryAction  | input.action.primaryAction  | Primary Action     |
| backPause      | input.action.backPause      | Back/Pause         |
| researchStatus | input.action.researchStatus | Research Status    |

The unused `previousPanel`, `nextPanel` and `interactionAssist` values remain legal in the closed `InputAction` type but are not selected by the eight slice tutorials. This does not create authored binding IDs. The exact ordered values are: tutorial 001 `move,look`; 002 `primaryAction`; 003 `primaryAction,backPause,uiNavigate`; 004 `primaryAction,backPause`; 005 `primaryAction`; 006 `primaryAction`; 007 `researchStatus`; and 008 `backPause,primaryAction`.

The first display uses the existing S03 `completedContentIds` collection. Its permitted targets gain selected tutorial IDs. `recordContentPresentation` gains the exact `tutorialShown` kind. A first display records the tutorial ID once; Help replay reads the same content without submitting another command. This is a proposed MR-IF-002 v6/S03, MR-IF-003 v3/S04 and MR-IF-010 v3/S09 correlation. It adds no campaign field and no settings field.

### 20.2 Exact room, event, cue and rehearsal bindings

`Delivery` becomes a strict union:

```ts
Delivery =
  | {kind:'transition'; target:
      | {kind:'activateRoom'; roomState:{family:'roomStates';id:Id}}
      | {kind:'resolveRoom'; route:{owner:{family:'roomStates';id:Id};id:Id}}}
  | {kind:'scene'; target:{family:'scenes';id:Id}}
  | {kind:'message'; target:{family:'messages';id:Id}}
  | {kind:'notification'; target:{family:'notifications';id:Id}};
```

An automatic transition has no arbitrary command or expression. Its target is one typed room activation or one typed owned room route. The scheduler applies that fixed result. Every selected event has an empty `effects` list because the delivery target owns the one domain result. `fallback` follows the same union. A scene-event fallback can reference only the owning room state's exact `expiryRouteId`; it cannot contain a second hidden route. This strict union supersedes the generic `Ref` sketch in section6.1.

`RoomRoute` becomes the following strict result union. `EmptyConditions` is exactly `{allOf:[],anyOf:[],noneOf:[]}`:

```ts
RoomResult = {
  equipmentState:'ready'|'limited';
  controlKind:'matched'|'limited';
  observationCoverage:'full'|'limited';
};
RoomRoute =
  | {kind:'directResolve'; id:Id; labelKey:Key; when:Conditions;
      actionId:Id|null; resultReasonKey:Key; result:RoomResult;
      effects:[]}
  | {kind:'openScene'; id:Id; labelKey:Key; when:Conditions;
      actionId:null; resultReasonKey:null; eventId:Id; effects:[]}
  | {kind:'sceneResolve'; id:Id; labelKey:null; when:EmptyConditions;
      actionId:null; resultReasonKey:Key;
      trigger:{eventId:Id;optionId:Id}; result:RoomResult; effects:[]};
```

A `directResolve` or `sceneResolve` route closes the room state. An `openScene` route leaves it unresolved. Every selected room route has an empty `effects` list because its strict result and registered command action own the change and cost. The three `sceneResolve` routes are not displayed as basic room choices; each is reachable only from its exact Gabriel event and committed option pair. The open-scene route materializes the referenced optional event as eligible through `resolveRoomState`, and the ordinary scheduler then exposes its cue. It adds no saved pending-route field and no generic event effect.

This is one explicit MR-IF-003 v3/MR-IF-005 v3/S04/S05 exception to the current general event-creation rule. `resolveRoomState` is the sole creator of `MR-EVT-GABRIEL-QUEUE`. It can create that event only when the facility room is unresolved, the event has no earlier lifecycle record and the current period is inside its effective window. While that event is queued, eligible or active, the direct WAIT, LIMITED and GABRIEL routes are unavailable. A committed option applies its one correlated `sceneResolve` route, completes the event and suppresses fallback. Expiry applies the owning room's direct LIMITED route exactly once only while the room remains unresolved, then expires the event. A resolved room makes both the event result and its fallback ineligible. These guards preserve one-time fallback and prevent a pending optional event from replacing an existing room result.

Representative queued case: `resolveRoomState` creates `MR-EVT-GABRIEL-QUEUE`, the scheduler changes it to `queued` and exposes its cue, then attempts to use direct WAIT, LIMITED or GABRIEL each return the ordinary unavailable result with no state change. An already active Gabriel scene can finish after its window under the existing S05 rule.

The exact selected bindings are candidate amendments. Every new technical identity remains candidate until Leonardo approves this complete packet. The authored facility and Gabriel windows stay 0–15 (W1–W4); the slice horizon prevents use after period11.

The exact selected bindings are:

| Owner                     | Exact candidate binding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clarified event           | `MR-EVT-CLARIFIED`; window 0–0; prerequisite new campaign/queued opening; status required; priority mandatoryContent; authoredOrder 0; scene delivery to `MR-SCN-CLARIFIED`; cue null; fallback null; effects empty. Clarified remains the sole cue bypass. MR-IF-002 v6/S03 and MR-IF-005 v3/S05 replace the frozen opening event map key, queue value and active-event identity `MR-SCN-CLARIFIED` with `MR-EVT-CLARIFIED`; the stored scene remains `MR-SCN-CLARIFIED` and its `eventId` is `MR-EVT-CLARIFIED`. Campaign schema remains 2. Content version 1.1.0 accepts no earlier content version, Step 4 produced no persistence implementation, and no schema-1 fact or migration is guessed. |
| Clarified scene           | Locations tissue culture, main laboratory, PI office and shared desks; mandatory; periodEffect 0; base form/choice/option/beat identities from section 10; no scene cue; committed option applies the exact confidence delta, stores its option, creates `MR-TASK-LASER-SHAM` and `MR-REC-PROJECT-NOTEBOOK`; existing recap remains the no-closing recovery.                                                                                                                                                                                                                                                                                                                                         |
| Facility activation event | `MR-EVT-FACILITY-QUEUE`; authored window 0–15; effective evaluation-slice use is limited by the profile horizon 0–11; available after completed `MR-SCN-CLARIFIED`; status required; priority automaticTransition; authoredOrder 0; transition delivery; cue null; fallback null; effects empty. Its identity must equal `MR-ROOM-FACILITY-QUEUE.activationEventId`; applying it changes that room state from inactive to unresolved. This is the slice's exact interpretation of the first W1–W4 shared-facility conflict. Full/fallback keep their own authored calendar window.                                                                                                                   |
| Facility WAIT             | `MR-ROOM-FACILITY-QUEUE-WAIT`; action `MR-ACT-ROOM-WAIT`; result reason `reason.room.ready`; resolve Ready/matched/full.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Facility LIMITED          | `MR-ROOM-FACILITY-QUEUE-LIMITED`; action null; result reason `reason.room.limited`; resolve Limited/limited/limited. It is also `expiryRouteId`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Facility GABRIEL          | `MR-ROOM-FACILITY-QUEUE-GABRIEL`; action null; result reason null; open scene event `MR-EVT-GABRIEL-QUEUE`; no immediate room result.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Gabriel WAIT result       | `MR-ROOM-FACILITY-QUEUE-GABRIEL-WAIT`; scene-result trigger event `MR-EVT-GABRIEL-QUEUE`, option `MR-CHO-GABRIEL-QUEUE-WAIT`; result reason `reason.room.ready`; resolve Ready/matched/full.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Gabriel LIMITED result    | `MR-ROOM-FACILITY-QUEUE-GABRIEL-LIMITED`; scene-result trigger event `MR-EVT-GABRIEL-QUEUE`, option `MR-CHO-GABRIEL-QUEUE-LIMITED`; result reason `reason.room.limited`; resolve Limited/limited/limited.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Gabriel PRESS result      | `MR-ROOM-FACILITY-QUEUE-GABRIEL-PRESS`; scene-result trigger event `MR-EVT-GABRIEL-QUEUE`, option `MR-CHO-GABRIEL-QUEUE-PRESS`; result reason `reason.room.ready`; resolve Ready/matched/full.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Gabriel event             | `MR-EVT-GABRIEL-QUEUE`; materialized only by the GABRIEL route; authored window 0–15; effective evaluation-slice use is limited by the profile horizon 0–11; status optional; priority optionalContent; authoredOrder 0; scene delivery to `MR-OPT-GABRIEL-QUEUE`; cue `MR-CUE-GABRIEL-QUEUE`; transition fallback through the owning room's LIMITED expiry route; effects empty.                                                                                                                                                                                                                                                                                                                    |
| Gabriel cue               | `MR-CUE-GABRIEL-QUEUE`; location `MR-LOC-FACILITY`; interface `MR-UI-CUE-OPTIONAL`; audio null.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Gabriel scene             | Facility location; optional; periodEffect 0. `MR-ACT-RELATIONSHIP` is charged once by the committed option command. WAIT, LIMITED and PRESS use the exact three scene-result route IDs above and change trust by +10, 0 and -10 respectively. Each stores its selected option and uses its section 19 option recap and approved choice-specific closing. Expiry uses the direct LIMITED route without dialogue or trust change.                                                                                                                                                                                                                                                                      |
| Experiment-attention cue  | `MR-CUE-EXPERIMENT-ATTENTION`; location `MR-LOC-TISSUE-CULTURE`; interface `MR-UI-CUE-ATTENTION`; audio `MR-AUD-CUE-ATTENTION`. It is a generated cue instance for an active laser run, not an additional event or top-level content family item.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Rehearsal task            | `MR-SLICE-CLAIM-REHEARSAL`; selected only by slice; availability requires an analysed `MR-EXP-LASER-SHAM` run and no earlier rehearsal completion; action `MR-ACT-SLICE-CLAIM-REHEARSAL`; claim definitions Careful/Strong/Inflated remain visible; only an honest Careful proposal that satisfies D1 can commit. The resulting save checkpoint must verify before `MR-UI-SLICE-COMPLETE` is shown. No cue or scheduler event is added.                                                                                                                                                                                                                                                              |

The new cue, room-result and Gabriel-trust strings are:

| Key                         | Proposed exact English value                                                            |
| --------------------------- | --------------------------------------------------------------------------------------- |
| ui.cue.experimentAttention  | An experiment needs attention.                                                          |
| ui.cue.optionalConversation | An optional conversation is available.                                                  |
| reason.room.ready           | Normal room access is available because the selected response resolved the conflict.    |
| reason.room.limited         | Room access remains limited because the constrained route resolved with limited access. |
| reason.trust.respect        | Working trust changed because the confirmed choice respected Gabriel's time and limits. |
| reason.trust.pressure       | Working trust changed because the confirmed choice pressed for priority over the queue. |

Tutorial `firstSemanticEvent` values remain presentation events. They never enter the four S05 scheduler-trigger values.

### 20.3 Exact slice world and audio-role boundary

Select all five recurring character definitions because S03 stores all five relationship identities and four physical placements. Select all ten semantic locations because S08 uses the complete connected local floor, recovery anchors and current-room projection. This corrects section 10's earlier two-character/five-location subset.

The audio family contains semantic roles only. Remove `handoffRoleId`: S10 already requires the content audio-role ID itself as the stable handoff identity. Replace `duplicateInterfaceId` with `visibleDuplicate:'none'|'dialogueText'|'experimentAttentionState'`. The selected attention cue uses `experimentAttentionState`; dialogue roles use `dialogueText`; ambience and music use `none`. No audio resource, path, file, codec, source, licence, duration or playback instruction enters Step 5.

The exact selected audio IDs are 26 roles. This list is literal:

```text
MR-AUD-AMB-LAB
MR-AUD-AMB-CULTURE
MR-AUD-AMB-IMAGING
MR-AUD-AMB-DESKS
MR-AUD-AMB-PI
MR-AUD-AMB-BREAK
MR-AUD-AMB-CORRIDOR
MR-AUD-AMB-EXIT
MR-AUD-CUE-ATTENTION
MR-AUD-EL-01
MR-AUD-EL-02
MR-AUD-EL-03
MR-AUD-EL-04
MR-AUD-EL-05
MR-AUD-EL-06
MR-AUD-EL-07
MR-AUD-EL-08
MR-AUD-GA-01
MR-AUD-GA-02
MR-AUD-GA-03
MR-AUD-GA-04
MR-AUD-GA-05
MR-AUD-GA-06
MR-AUD-GA-07
MR-AUD-GA-08
MR-MUS-01
```

`MR-AUD-CUE-MESSAGE` and `MR-AUD-CUE-SCENE` are excluded because the slice has no selected message and Clarified bypasses a scene cue. The optional Gabriel cue is silent. Haoran, Samira and Camila dialogue palettes are excluded because they have no selected slice dialogue. The selected role does not claim that its later asset exists.

Each audio role has one exact `meaningKey`. The source description is content-owned semantic text. The built presentation view retains `id`, `role`, `meaningKey` and `visibleDuplicate`; it contains no asset handoff ID or resource data. Tutorial content presentation retains `id`, `headingKey`, `bodyKey` and ordered `{action,labelKey}` rows derived from the selected `inputActions`. The later S09 UI view joins the current binding at display time. Room and event views recursively copy the strict result/delivery variants above. These rules close the affected recursive projections in section8.1.

### 20.4 Exact phase-command amendment

The final amendment names S01, S06, S12 and S13. S12's current statement that no new top-level npm command is required is superseded for the Step 5 phase. S13's generic worker `npm run build` rule is qualified while default full is intentionally incomplete.

| Command                       | Exact candidate behavior                                                                                                                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                 | `vite`; built-in development mode maps to full and returns safe `incompleteProfile` while full is incomplete.                                                                                                              |
| `npm run dev:slice`           | `vite --mode slice`.                                                                                                                                                                                                       |
| `npm run build`               | `npm run typecheck && vite build`; built-in production mode maps to full and returns safe `incompleteProfile` while full is incomplete.                                                                                    |
| `npm run build:slice`         | `npm run typecheck && vite build --mode slice`.                                                                                                                                                                            |
| `npm run content:check`       | `node --experimental-strip-types scripts/check-content.ts`. It validates the source catalogue, requires slice complete, and requires full/fallback incomplete.                                                             |
| `npm run test:build-profiles` | `node --experimental-strip-types --test scripts/test-build-profiles.ts`. It checks default/full/fallback rejection, unknown-mode rejection, isolated output cleanup, slice success, package identity and excluded strings. |
| `npm run check`               | `npm run typecheck && npm run lint && npm run format:check && npm test && npm run content:check`.                                                                                                                          |
| `npm run verify`              | `npm run lint && npm run format:check && npm run test:coverage && npm run content:check && npm run test:build-profiles && npm run build:slice && npm run test:e2e`.                                                        |
| `npm run test:e2e`            | Existing Playwright command; its web server uses `npm run dev:slice` during this phase.                                                                                                                                    |

For Step 5 submissions and integration, `build:slice` is the applicable successful build check. The expected `build` rejection is checked by `test:build-profiles`; it is not reported as a failed gate. Default full remains unchanged. No alias silently selects slice.

### 20.5 Exact top-level slice selection and counts

The following is the proposed literal `slice` selection. It totals 97 top-level items. Every listed ID is written separately in the profile JSON. Ranges below are documentation compression only; the final profile enumerates every member.

| Family             | Expected count | Exact selected IDs                                                                                                                                                                                                   |
| ------------------ | -------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| characters         |              5 | `MR-CHR-ELENA`, `MR-CHR-HAORAN`, `MR-CHR-SAMIRA`, `MR-CHR-GABRIEL`, `MR-CHR-CAMILA`                                                                                                                                  |
| locations          |             10 | `MR-LOC-TISSUE-CULTURE`, `MR-LOC-MAIN-LAB`, `MR-LOC-PI-OFFICE`, `MR-LOC-SHARED-DESKS`, `MR-LOC-IMAGING`, `MR-LOC-FACILITY`, `MR-LOC-BREAK-ROOM`, `MR-LOC-CORRIDOR`, `MR-LOC-SOUTH-CORRIDOR`, `MR-LOC-EXIT-VESTIBULE` |
| actions            |              8 | `MR-ACT-SAMPLE-CONFIGURE`, `MR-ACT-START-FOCUSED`, `MR-ACT-MONITOR-ROUTINE`, `MR-ACT-MONITOR-QUALITY`, `MR-ACT-ANALYSE`, `MR-ACT-RELATIONSHIP`, `MR-ACT-ROOM-WAIT`, `MR-ACT-SLICE-CLAIM-REHEARSAL`                   |
| experiments        |              1 | `MR-EXP-LASER-SHAM`                                                                                                                                                                                                  |
| tasks              |              2 | `MR-TASK-LASER-SHAM`, `MR-SLICE-CLAIM-REHEARSAL`                                                                                                                                                                     |
| roomStates         |              1 | `MR-ROOM-FACILITY-QUEUE`                                                                                                                                                                                             |
| events             |              3 | `MR-EVT-CLARIFIED`, `MR-EVT-FACILITY-QUEUE`, `MR-EVT-GABRIEL-QUEUE`                                                                                                                                                  |
| scenes             |              2 | `MR-SCN-CLARIFIED`, `MR-OPT-GABRIEL-QUEUE`                                                                                                                                                                           |
| messages           |              0 | empty                                                                                                                                                                                                                |
| notifications      |              0 | empty                                                                                                                                                                                                                |
| records            |              2 | `MR-REC-PROJECT-NOTEBOOK`, `MR-REC-LASER-SHAM`                                                                                                                                                                       |
| endings            |              0 | empty                                                                                                                                                                                                                |
| citations          |              0 | empty                                                                                                                                                                                                                |
| environmentalItems |              0 | empty                                                                                                                                                                                                                |
| contextualLines    |              0 | empty                                                                                                                                                                                                                |
| tutorials          |              8 | `MR-TUT-001`, `MR-TUT-002`, `MR-TUT-003`, `MR-TUT-004`, `MR-TUT-005`, `MR-TUT-006`, `MR-TUT-007`, `MR-TUT-008`                                                                                                       |
| interface          |             29 | the 14 selected interface items and 15 science definitions listed below                                                                                                                                              |
| audio              |             26 | the 26 literal IDs in subsection 20.3                                                                                                                                                                                |

The slice excludes `MR-ACT-REPORT-ELENA` and `MR-ACT-BREAK`. The source-defined evaluation path does not include a report or a break. No approved laser active-request/response identities exist. `MR-TASK-LASER-SHAM` is therefore the slice's `experimentMilestone` task: Clarified activates it, and the first laser analysis completes it. It has no report response list. The full/fallback report contract remains incomplete. The experiment `StageActions` shape is exactly `{configure,start,monitor,qualityMonitor,stabilize,stop,analyse}`; report is not an experiment-stage action. The selected action references are five unique experiment actions because monitor/stop and qualityMonitor/stabilize intentionally share IDs.

The selected milestone task is the following strict variant; it replaces the earlier task-family rows for this one selected object:

```ts
ExperimentMilestoneTask = {
  id:'MR-TASK-LASER-SHAM'; type:'experimentMilestone'; trace:Trace;
  availability:Availability; labelKey:'task.laserSham';
  command:'analyseExperiment';
  experiment:{family:'experiments';id:'MR-EXP-LASER-SHAM'};
  completion:{kind:'firstSuccessfulAnalysis';
    record:{family:'records';id:'MR-REC-LASER-SHAM'}};
  resultRefs:[{family:'records';id:'MR-REC-LASER-SHAM'}];
  activeRequestId:null;
};
```

Clarified activates this task once. The first successful `analyseExperiment` command for the referenced experiment creates the referenced record and marks the active task completed in the same S04 transaction. A rejected analysis, a stopped run and a later repeat do not complete it again. The rules view retains every field except `labelKey`; the presentation view retains only `id`, `type` and `labelKey`. Both views are recursively copied and immutable. No task choice, report response or executable completion predicate exists.

Recap selection uses one strict structural union. A scene with one shared recap requires non-null `scene.recapKey`, null `Choice.recapKey` and null `Option.recapKey` on every option; Clarified uses `scene.clarified.recap`. A scene with option-specific recaps requires null `scene.recapKey`, null `Choice.recapKey` and one non-null `Option.recapKey` on every option; Gabriel Queue uses this form. A no-choice terminal scene requires non-null `scene.recapKey`. Choice-level recap is reserved and null in every selected slice scene. This supersedes section6.1's always-non-null option recap and resolves section19's general-rule conflict. A skipped or interrupted closing uses the one recap selected by this union and never loses it.

Representative recap structures:

```json
{
  "sceneId": "MR-SCN-CLARIFIED",
  "sceneRecapKey": "scene.clarified.recap",
  "choiceRecapKey": null,
  "optionRecapKeys": [null, null]
}
```

```json
{
  "sceneId": "MR-OPT-GABRIEL-QUEUE",
  "sceneRecapKey": null,
  "choiceRecapKey": null,
  "optionRecapKeys": [
    "optional.gabriel.queue.recapWait",
    "optional.gabriel.queue.recapLimited",
    "optional.gabriel.queue.recapPress"
  ]
}
```

The following is invalid because a selected shared-recap scene has no recap:

```json
{
  "sceneId": "MR-SCN-CLARIFIED",
  "sceneRecapKey": null,
  "choiceRecapKey": null,
  "optionRecapKeys": [null, null]
}
```

The record shapes also close exactly for this selection. They replace the earlier single `primaryRecord` sketch for these two selected objects:

```ts
NotebookRecord = {
  id:'MR-REC-PROJECT-NOTEBOOK'; type:'notebook'; trace:Trace;
  availability:Availability; titleKey:'record.projectNotebook.title';
  baseForm:{id:'MR-FORM-PROJECT-NOTEBOOK-BASE';
    when:EmptyConditions; bodyKeys:['record.projectNotebook.body']};
  source:{family:'scenes';id:'MR-SCN-CLARIFIED'};
  selection:'onCreation'; repeatNoteKeys:[];
};
LaserExperimentRecord = {
  id:'MR-REC-LASER-SHAM'; type:'experiment'; trace:Trace;
  availability:Availability; titleKey:'record.laserSham.title';
  source:{family:'experiments';id:'MR-EXP-LASER-SHAM'};
  selection:{kind:'laserOutcomeRow';
    experimentId:'MR-EXP-LASER-SHAM';
    allowedBodyKeys:[
      'record.laserSham.strong',
      'record.laserSham.strongStructure',
      'record.laserSham.strongRhythm',
      'record.laserSham.limitedPaired',
      'record.laserSham.limitedStructure',
      'record.laserSham.limitedRhythm',
      'record.laserSham.weak'
    ]};
  repeatNoteKeys:[];
};
```

The notebook rules view retains `id`, `type`, `availability`, `source`, `selection` and `baseForm:{id,when}`. Its presentation view retains `id`, `type`, `titleKey`, `baseForm:{id,bodyKeys}` and `repeatNoteKeys`. The laser rules view retains `id`, `type`, `availability`, `source` and `selection:{kind,experimentId}`. Its presentation view retains `id`, `type`, `titleKey`, the complete `selection` value and `repeatNoteKeys`. The laser presentation resolves its body only from the saved run's exact validated `LaserOutcomeRow.bodyKey`, which must be a member of `allowedBodyKeys`. Both views are recursively copied and immutable. Neither selected record has `forms`, `conditionalForm` or `reviewerForms`; those fields belong only to later strict record variants in incomplete profiles.

The eight action definitions use the following exact command, cost and text-key bindings. `reasonKeys` is the sorted unique set in the last column.

| Action                         | Command / class / cost                                 | Label / forecast                                            | Permitted reason keys                                                                                             |
| ------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `MR-ACT-SAMPLE-CONFIGURE`      | configureExperiment / light / 0 periods, 0 energy      | `action.sampleConfigure.label` / `forecast.sampleConfigure` | `reason.band.choice`, `reason.band.equipment`, `reason.band.sample`                                               |
| `MR-ACT-START-FOCUSED`         | startExperiment / focused / 1 period, 1 energy         | `action.startFocused.label` / `forecast.startFocused`       | `reason.energy.work`, `reason.time.action`                                                                        |
| `MR-ACT-MONITOR-ROUTINE`       | respondToMonitoring / light / 1 period, 0 energy       | `action.monitorRoutine.label` / `forecast.monitorRoutine`   | `reason.band.monitor`, `reason.time.action`                                                                       |
| `MR-ACT-MONITOR-QUALITY`       | respondToMonitoring / focused / 1 period, 1 energy     | `action.monitorQuality.label` / `forecast.monitorQuality`   | `reason.band.monitor`, `reason.band.stabilized`, `reason.energy.work`, `reason.time.action`                       |
| `MR-ACT-ANALYSE`               | analyseExperiment / focused / 1 period, 1 energy       | `action.analyse.label` / `forecast.analyse`                 | `reason.energy.work`, `reason.evidence.limited`, `reason.evidence.result`, `reason.time.action`                   |
| `MR-ACT-RELATIONSHIP`          | chooseSceneOption / light / 1 period, 0 energy         | `action.relationship.label` / `forecast.relationship`       | `reason.room.limited`, `reason.room.ready`, `reason.time.action`, `reason.trust.pressure`, `reason.trust.respect` |
| `MR-ACT-ROOM-WAIT`             | resolveRoomState / light / 1 period, 0 energy          | `action.roomWait.label` / `forecast.roomWait`               | `reason.room.ready`, `reason.time.action`                                                                         |
| `MR-ACT-SLICE-CLAIM-REHEARSAL` | commitInitialManuscript / focused / 1 period, 1 energy | `ui.slice.rehearsal` / `ui.slice.rehearsalForecast`         | `reason.energy.work`, `reason.paper.commit`, `reason.time.action`                                                 |

`full` and `fallback` each use `implementationStatus:'incomplete'`, `campaignMode:'campaign'`, empty selections for all 18 families, zero expected counts, no replacements and `sliceCompletionId:null`. `slice` uses `implementationStatus:'complete'`, `campaignMode:'evaluationSlice'`, the 97 selections above, no replacements and `sliceCompletionId:'MR-UI-SLICE-COMPLETE'`. This is the exact initial profile state. Later full/fallback authoring must amend these records before either can build.

The evaluation slice has one narrow MR-IF-002 v6/S03 and MR-IF-006 v3/S06 dormant-state exception. The shared campaign schema creates `MR-REC-REVIEWER-1`, `MR-REC-REVIEWER-2` and `MR-REC-REVIEWER-3` with null forms, plus inactive `MR-ROOM-IMAGING-BOOKING` and `MR-ROOM-IMAGING-SERVICE-LIMIT`. These five exact IDs are reserved structural state entries in `evaluationSlice`; they are not selected authored content and do not change the 97-item profile count. Connected state/content validation accepts an absent content definition only for these five exact IDs, only under build profile `slice`, and only while each entry retains its exact initial dormant form.

The exception fails if a reviewer form becomes non-null; either omitted room becomes unresolved or resolved; an event, history, route, scene, task, record or other content value references one of these IDs; any command targets one; or a campaign-mode profile omits its required definition. `MR-ROOM-FACILITY-QUEUE` is selected and never receives the exception. An unknown extra state ID also fails. The slice cannot activate or present an omitted item and cannot continue into full/fallback. Later full/fallback profiles must select all required authored definitions before becoming complete. This preserves the fixed campaign shape without shipping unreachable later content.

The dormant-state check belongs to the proposed MR-IF-002 v6 connected operation, not to the S06 content-source result:

```ts
validateCampaignStateAgainstContent(
  state:CampaignState,
  metadata:BuiltMetadata,
  rules:ContentRulesView
): CheckedResult<CampaignState>
```

`CheckedResult` remains the S03 union with one `CampaignValidationIssue {path,reason}` on failure. The operation returns a new checked campaign copy on success and never changes its inputs. Representative valid dormant state for the slice uses three null reviewer forms and the two exact inactive room entries. `validateCampaignStateAgainstContent` rejects `MR-REC-REVIEWER-1.form='base'` without its selected definition and `MR-ROOM-IMAGING-BOOKING.condition='unresolved'` without its selected definition with S03 `reason:'invalidReference'`. `validateSourceCatalogue` rejects a selected event that references omitted `MR-ROOM-IMAGING-SERVICE-LIMIT` with S06 `code:'missingReference'`. `createBuiltContentPackage` rejects a complete profile with an invalid profile/mode combination with S06 `code:'invalidProfile'`. Every failure uses the exact state or content path and leaves its inputs unchanged.

The following connected-validation fragment is valid only with the `slice` build profile and `evaluationSlice` campaign mode:

```json
{
  "buildProfile": "slice",
  "campaignMode": "evaluationSlice",
  "reviewerReportsById": {
    "MR-REC-REVIEWER-1": { "id": "MR-REC-REVIEWER-1", "form": null },
    "MR-REC-REVIEWER-2": { "id": "MR-REC-REVIEWER-2", "form": null },
    "MR-REC-REVIEWER-3": { "id": "MR-REC-REVIEWER-3", "form": null }
  },
  "roomStatesById": {
    "MR-ROOM-IMAGING-BOOKING": {
      "id": "MR-ROOM-IMAGING-BOOKING",
      "condition": "inactive"
    },
    "MR-ROOM-IMAGING-SERVICE-LIMIT": {
      "id": "MR-ROOM-IMAGING-SERVICE-LIMIT",
      "condition": "inactive"
    }
  }
}
```

This fragment is invalid because excluded reviewer content has become active:

```json
{
  "buildProfile": "slice",
  "campaignMode": "evaluationSlice",
  "reviewerReportsById": {
    "MR-REC-REVIEWER-1": { "id": "MR-REC-REVIEWER-1", "form": "base" }
  }
}
```

For `validateCampaignStateAgainstContent`, the invalid form returns `reason:'invalidReference'` at `/manuscript/reviewerReportsById/MR-REC-REVIEWER-1/form`. An activated omitted room returns the same reason at `/world/roomStatesById/<id>/condition`. For `validateSourceCatalogue`, a selected content reference to a dormant ID returns `code:'missingReference'` at that source reference path. No seventeenth `ContentIssue` code is added. Validation changes neither source nor campaign state.

The 14 non-science interface items are:

```text
MR-UI-MENU-CONTINUE
MR-UI-MENU-NEW
MR-UI-MENU-SAVEQUIT
MR-UI-REPLACE-SAVE
MR-UI-SAVE-SUCCESS
MR-UI-SAVE-FAILURE
MR-UI-SAVE-RECOVERY
MR-UI-SAVE-RESET
MR-UI-ACTION-WARNING
MR-UI-CONTENT-INVALID
MR-UI-SLICE-REHEARSAL
MR-UI-SLICE-COMPLETE
MR-UI-CUE-ATTENTION
MR-UI-CUE-OPTIONAL
```

The 15 selected top-level science definitions are:

```text
MR-STRUCTURE-RECOVERY
MR-STRUCTURE-PARTIAL
MR-STRUCTURE-UNOBSERVED
MR-RHYTHM-RECOVERY
MR-RHYTHM-NONE
MR-RHYTHM-UNOBSERVED
MR-REPATTERNING-UNOBSERVED
MR-CONTROL-MATCHED
MR-CONTROL-LIMITED
MR-READING-RECOVERY
MR-READING-NO-RECOVERY
MR-READING-UNRESOLVED
MR-CAVEAT-CONDITION
MR-CAVEAT-ASSOCIATION
MR-CAVEAT-PROCESS
```

The exact nested identity totals are contract invariants, not profile counts. Clarified has one form, one choice, two options and seven beats:

```text
MR-FORM-CLARIFIED-BASE
MR-CHO-CLARIFIED
MR-CHO-CLARIFIED-START
MR-CHO-CLARIFIED-LIMIT
MR-BEAT-CLARIFIED-01
MR-BEAT-CLARIFIED-02
MR-BEAT-CLARIFIED-03
MR-BEAT-CLARIFIED-04
MR-BEAT-CLARIFIED-05
MR-BEAT-CLARIFIED-06
MR-BEAT-CLARIFIED-07
```

Gabriel Queue has one form, one choice, three options and five beats:

```text
MR-FORM-GABRIEL-QUEUE-BASE
MR-CHO-GABRIEL-QUEUE
MR-CHO-GABRIEL-QUEUE-WAIT
MR-CHO-GABRIEL-QUEUE-LIMITED
MR-CHO-GABRIEL-QUEUE-PRESS
MR-BEAT-GABRIEL-QUEUE-01
MR-BEAT-GABRIEL-QUEUE-02
MR-BEAT-GABRIEL-QUEUE-03
MR-BEAT-GABRIEL-QUEUE-04
MR-BEAT-GABRIEL-QUEUE-05
```

The other nested identities are the six literal room-route IDs in subsection20.2, `MR-FORM-PROJECT-NOTEBOOK-BASE`, the fourteen laser option IDs below, the three biological-result IDs in section16, the three rehearsal claim IDs below and the nine rehearsal requirement IDs below. The laser matrix contains exactly 144 ordered rows. Row keys are the five-field tuple from section18 and are not authored IDs.

Rehearsal claim definitions:

```text
MR-UI-SLICE-REHEARSAL-CLAIM-CAREFUL
MR-UI-SLICE-REHEARSAL-CLAIM-STRONG
MR-UI-SLICE-REHEARSAL-CLAIM-INFLATED
```

Rehearsal requirement definitions:

```text
MR-UI-SLICE-REHEARSAL-REQ-SUPPORTED-FIGURE
MR-UI-SLICE-REHEARSAL-REQ-RELEVANT-CONTROL
MR-UI-SLICE-REHEARSAL-REQ-DISTINCT-FIGURES
MR-UI-SLICE-REHEARSAL-REQ-STRUCTURE-COVERAGE
MR-UI-SLICE-REHEARSAL-REQ-RHYTHM-COVERAGE
MR-UI-SLICE-REHEARSAL-REQ-MATCHED-CONTROL
MR-UI-SLICE-REHEARSAL-REQ-CAVEAT
MR-UI-SLICE-REHEARSAL-REQ-ASSOCIATION-SUPPORT
MR-UI-SLICE-REHEARSAL-REQ-CAUSAL-SUPPORT
```

These twelve definitions belong to `MR-UI-SLICE-REHEARSAL`; they are not extra top-level interface items. This removes two unnecessary catalogue objects and keeps every nested identity in the approved `MR-UI-` prefix.

The fourteen laser options are:

```text
MR-EXP-LASER-SHAM-GOAL-REPLICATION
MR-EXP-LASER-SHAM-CONTROL-MATCHED
MR-EXP-LASER-SHAM-CONTROL-LIMITED
MR-EXP-LASER-SHAM-OBSERVATION-STRUCTURE
MR-EXP-LASER-SHAM-OBSERVATION-RHYTHM
MR-EXP-LASER-SHAM-OBSERVATION-PAIRED
MR-EXP-LASER-SHAM-SAMPLE-STABLE
MR-EXP-LASER-SHAM-SAMPLE-STRESSED
MR-EXP-LASER-SHAM-SAMPLE-FAILING
MR-EXP-LASER-SHAM-EQUIPMENT-READY
MR-EXP-LASER-SHAM-EQUIPMENT-LIMITED
MR-EXP-LASER-SHAM-EQUIPMENT-UNAVAILABLE
MR-EXP-LASER-SHAM-FAMILY-BASELINE
MR-EXP-LASER-SHAM-FAMILY-HIGHER-RISK
```

The requirement-definition label keys and proposed exact labels are:

| Key                                              | Proposed exact English label |
| ------------------------------------------------ | ---------------------------- |
| manuscript.requirement.supportedFigure           | Supported figure             |
| manuscript.requirement.relevantControl           | Relevant control             |
| manuscript.requirement.distinctExperimentFigures | Distinct experiment figures  |
| manuscript.requirement.structureCoverage         | Structure coverage           |
| manuscript.requirement.rhythmCoverage            | Rhythm coverage              |
| manuscript.requirement.matchedControl            | Matched control              |
| manuscript.requirement.caveat                    | Caveat                       |
| manuscript.requirement.associationSupport        | Association support          |
| manuscript.requirement.causalSupport             | Causal support               |

### 20.6 Exact selected fixed-string manifest

The complete slice selects exactly **213 unique English keys**. Every key below is literal. The source profile and built package use no prefix, range or wildcard. A key referenced by more than one selected object appears once.

```text
action.analyse.label
action.monitorQuality.label
action.monitorRoutine.label
action.relationship.label
action.roomWait.label
action.sampleConfigure.label
action.startFocused.label
audio.amb.break
audio.amb.corridor
audio.amb.culture
audio.amb.desks
audio.amb.exit
audio.amb.imaging
audio.amb.lab
audio.amb.pi
audio.cue.attention
audio.elena.role01
audio.elena.role02
audio.elena.role03
audio.elena.role04
audio.elena.role05
audio.elena.role06
audio.elena.role07
audio.elena.role08
audio.gabriel.role01
audio.gabriel.role02
audio.gabriel.role03
audio.gabriel.role04
audio.gabriel.role05
audio.gabriel.role06
audio.gabriel.role07
audio.gabriel.role08
audio.music.openingPulse
character.camila.name
character.camila.role
character.elena.name
character.elena.role
character.gabriel.name
character.gabriel.role
character.haoran.name
character.haoran.role
character.samira.name
character.samira.role
experiment.analysis.caveat
experiment.analysis.reading
experiment.band.compromised
experiment.band.mixed
experiment.band.robust
experiment.equipment.limited
experiment.equipment.ready
experiment.equipment.unavailable
experiment.goal.replication
experiment.laserSham
experiment.laserSham.family.baseline
experiment.laserSham.family.higherRisk
experiment.laserSham.question.baseline
experiment.laserSham.question.higherRisk
experiment.observation.paired
experiment.observation.rhythm
experiment.observation.structure
experiment.quality.inconclusive
experiment.quality.repeat
experiment.quality.suspicious
experiment.quality.usable
experiment.sample.failing
experiment.sample.stable
experiment.sample.stressed
experiment.stop.confirm
experiment.stop.expiry
forecast.analyse
forecast.laserPairedLimit
forecast.monitorQuality
forecast.monitorRoutine
forecast.relationship
forecast.roomWait
forecast.sampleConfigure
forecast.startFocused
input.action.backPause
input.action.look
input.action.move
input.action.primaryAction
input.action.researchStatus
input.action.uiNavigate
location.breakRoom.name
location.corridor.name
location.exitVestibule.name
location.facility.name
location.imaging.name
location.mainLab.name
location.piOffice.name
location.sharedDesks.name
location.southCorridor.name
location.tissueCulture.name
manuscript.claim.careful
manuscript.claim.inflated
manuscript.claim.strong
manuscript.lane.caveat
manuscript.lane.claim
manuscript.lane.control
manuscript.lane.figure
manuscript.requirement.associationSupport
manuscript.requirement.careful
manuscript.requirement.causalSupport
manuscript.requirement.caveat
manuscript.requirement.conflict
manuscript.requirement.distinctExperimentFigures
manuscript.requirement.inflated
manuscript.requirement.matchedControl
manuscript.requirement.met
manuscript.requirement.missing
manuscript.requirement.relevantControl
manuscript.requirement.rhythmCoverage
manuscript.requirement.strong
manuscript.requirement.structureCoverage
manuscript.requirement.supportedFigure
manuscript.requirement.unsupported
manuscript.requirements.missing
manuscript.requirements.title
optional.gabriel.queue.closeA
optional.gabriel.queue.closeB
optional.gabriel.queue.closeC
optional.gabriel.queue.limited
optional.gabriel.queue.opening
optional.gabriel.queue.press
optional.gabriel.queue.recapLimited
optional.gabriel.queue.recapPress
optional.gabriel.queue.recapWait
optional.gabriel.queue.wait
reason.band.choice
reason.band.equipment
reason.band.monitor
reason.band.sample
reason.band.stabilized
reason.energy.work
reason.evidence.limited
reason.evidence.result
reason.paper.commit
reason.pi.openingChoice
reason.room.limited
reason.room.ready
reason.time.action
reason.trust.pressure
reason.trust.respect
record.laserSham.limitedPaired
record.laserSham.limitedRhythm
record.laserSham.limitedStructure
record.laserSham.strong
record.laserSham.strongRhythm
record.laserSham.strongStructure
record.laserSham.title
record.laserSham.weak
record.projectNotebook.body
record.projectNotebook.title
room.facilityQueue.forecast
room.route.gabriel
room.route.limited
room.route.wait
scene.clarified.choice.limit
scene.clarified.choice.start
scene.clarified.elena.afterLimit
scene.clarified.elena.afterStart
scene.clarified.elena.opening
scene.clarified.elena.request
scene.clarified.internal.close
scene.clarified.internal.opening
scene.clarified.recap
science.caveatAssociation
science.caveatCondition
science.caveatProcess
science.controlLimited
science.controlMatched
science.readingNoRecovery
science.readingRecovery
science.readingUnresolved
science.repatterningUnobserved
science.rhythmNone
science.rhythmRecovery
science.rhythmUnobserved
science.structurePartial
science.structureRecovery
science.structureUnobserved
task.laserSham
tutorial.cost
tutorial.heading.costs
tutorial.heading.focusedViews
tutorial.heading.interact
tutorial.heading.localSaving
tutorial.heading.moveLook
tutorial.heading.researchStatus
tutorial.interact
tutorial.monitor
tutorial.move
tutorial.sample
tutorial.save
tutorial.station
tutorial.status
ui.action.warning
ui.confirm.replaceSave
ui.content.invalid
ui.cue.experimentAttention
ui.cue.optionalConversation
ui.menu.continue
ui.menu.newGame
ui.menu.saveQuit
ui.save.failure
ui.save.recovery
ui.save.reset
ui.save.success
ui.slice.complete
ui.slice.rehearsal
ui.slice.rehearsalConfirm
ui.slice.rehearsalForecast
ui.slice.rehearsalReason
```

The exact value authority is closed as follows:

| Key group                                                  | Exact value authority                                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Existing design12 keys                                     | The matching row in `docs/12-content-specification.md`; no wording change, except the three tutorial replacements in subsection20.1. |
| Laser questions and qualitative options                    | The exact design04 C01 question and B04 choice text, assigned to the literal keys below.                                             |
| D3 laser result keys                                       | Candidate section16, already approved by Leonardo on 2026-09-08.                                                                     |
| Titles, opening reason and Gabriel recaps                  | Candidate section19.                                                                                                                 |
| D2 rehearsal, tutorial heading/input and cue/room text     | Candidate subsections20.1–20.2 and the existing D2 row in section11.                                                                 |
| Science labels                                             | The exact C02 ID-to-key-to-label table below.                                                                                        |
| Character, location, requirement and audio key assignments | The exact tables below.                                                                                                              |

The newly assigned character keys use design05 names and source-supported short roles:

| Key                    | Exact English value    |
| ---------------------- | ---------------------- |
| character.elena.name   | Elena Markovic         |
| character.elena.role   | Principal investigator |
| character.haoran.name  | Haoran Zhao            |
| character.haoran.role  | PhD student            |
| character.samira.name  | Samira El-Masri        |
| character.samira.role  | Peer postdoc           |
| character.gabriel.name | Gabriel da Silva       |
| character.gabriel.role | Facility scientist     |
| character.camila.name  | Camila Torres          |
| character.camila.role  | Industry contact       |

Name labels omit academic honorifics because the separate role label supplies professional context. Elena, Samira, Gabriel and Camila use the role in their design05 heading. Haoran's proposed short role `PhD student` comes from the body statement that he is a third-year PhD student; his broader heading is `junior researcher`. Leonardo's D6 approval selects these exact display values.

The newly assigned location keys use the exact S06/S08 semantic labels:

| Key                         | Exact English value |
| --------------------------- | ------------------- |
| location.tissueCulture.name | Tissue culture      |
| location.mainLab.name       | Main laboratory     |
| location.piOffice.name      | PI office           |
| location.sharedDesks.name   | Shared desks        |
| location.imaging.name       | Imaging             |
| location.facility.name      | Facility            |
| location.breakRoom.name     | Break room          |
| location.corridor.name      | Corridor            |
| location.southCorridor.name | South corridor      |
| location.exitVestibule.name | Exit vestibule      |

The laser option and question assignments are:

| Key                                      | Exact English value                              |
| ---------------------------------------- | ------------------------------------------------ |
| experiment.laserSham.question.baseline   | Does recovery recur in the matched comparison?   |
| experiment.laserSham.question.higherRisk | Does recovery extend to the broader injury case? |
| experiment.goal.replication              | Replication and sham                             |
| science.controlMatched                   | Matched comparison                               |
| science.controlLimited                   | Limited comparison                               |
| experiment.observation.structure         | Structure view                                   |
| experiment.observation.rhythm            | Rhythm view                                      |
| experiment.observation.paired            | Paired observation                               |
| experiment.laserSham.family.baseline     | Prioritize the matched comparison.               |
| experiment.laserSham.family.higherRisk   | Include the broader injury case.                 |

The option objects reuse `science.controlMatched` and `science.controlLimited`; they do not duplicate those two strings under experiment keys. Sample, equipment, preparation-band, evidence-quality, analysis and stop keys retain their exact existing design12 values.

The selected science definitions use the exact C02 mechanical keys and labels:

| Semantic ID                | Text key                       | Exact English value                                  |
| -------------------------- | ------------------------------ | ---------------------------------------------------- |
| MR-STRUCTURE-RECOVERY      | science.structureRecovery      | Structure recovery observed                          |
| MR-STRUCTURE-PARTIAL       | science.structurePartial       | Partial structure recovery observed                  |
| MR-STRUCTURE-UNOBSERVED    | science.structureUnobserved    | Structure recovery not established                   |
| MR-RHYTHM-RECOVERY         | science.rhythmRecovery         | Rhythm recovery observed                             |
| MR-RHYTHM-NONE             | science.rhythmNone             | No rhythm recovery observed                          |
| MR-RHYTHM-UNOBSERVED       | science.rhythmUnobserved       | Rhythm recovery not established                      |
| MR-REPATTERNING-UNOBSERVED | science.repatterningUnobserved | Repatterning relation not established                |
| MR-CONTROL-MATCHED         | science.controlMatched         | Matched comparison                                   |
| MR-CONTROL-LIMITED         | science.controlLimited         | Limited comparison                                   |
| MR-READING-RECOVERY        | science.readingRecovery        | Recovery appears in the observed condition           |
| MR-READING-NO-RECOVERY     | science.readingNoRecovery      | Recovery was not observed                            |
| MR-READING-UNRESOLVED      | science.readingUnresolved      | This record does not settle the question             |
| MR-CAVEAT-CONDITION        | science.caveatCondition        | This conclusion is limited to the observed condition |
| MR-CAVEAT-ASSOCIATION      | science.caveatAssociation      | These observations do not establish a causal role    |
| MR-CAVEAT-PROCESS          | science.caveatProcess          | The recorded process or coverage limit remains       |

The nine requirement-definition labels are the table in subsection20.5. The content-invalid assignment is `ui.content.invalid` = “Game content could not be verified. No saved campaign data was changed.” The three claim labels, four selected manuscript lanes, four requirement-result labels and three claim-explanation strings retain the exact design12 values. The selected lanes are Claim, Figures and linked evidence, Controls and Caveat. The selected results are Met, Missing, Conflict and Unsupported.

Each selected audio ID maps one-to-one to the following exact `meaningKey` and source description. These descriptions do not authorize an audio asset:

| Key                      | Exact English value                       |
| ------------------------ | ----------------------------------------- |
| audio.amb.lab            | Main-laboratory ambience                  |
| audio.amb.culture        | Tissue-culture ambience                   |
| audio.amb.imaging        | Imaging and facility ambience             |
| audio.amb.desks          | Shared-desks ambience                     |
| audio.amb.pi             | PI-office ambience                        |
| audio.amb.break          | Break-room ambience                       |
| audio.amb.corridor       | Corridor ambience                         |
| audio.amb.exit           | Exit ambience                             |
| audio.cue.attention      | Experiment-attention cue                  |
| audio.elena.role01       | low acknowledgement                       |
| audio.elena.role02       | clipped agreement                         |
| audio.elena.role03       | measured concern                          |
| audio.elena.role04       | dry exhale                                |
| audio.elena.role05       | rising interruption                       |
| audio.elena.role06       | short laugh                               |
| audio.elena.role07       | tired pause                               |
| audio.elena.role08       | quiet close                               |
| audio.gabriel.role01     | practical greeting                        |
| audio.gabriel.role02     | short acknowledgement                     |
| audio.gabriel.role03     | queue-warning sigh                        |
| audio.gabriel.role04     | quick laugh                               |
| audio.gabriel.role05     | thinking hum                              |
| audio.gabriel.role06     | tool-side pause                           |
| audio.gabriel.role07     | firm exhale                               |
| audio.gabriel.role08     | quiet close                               |
| audio.music.openingPulse | Opening pulse: dry, low electronic motion |

The accepted D3 outcome-body selector is exact: Weak uses `record.laserSham.weak`; Strong uses `record.laserSham.strong` only when both recovery views are retained, otherwise `record.laserSham.strongStructure` or `record.laserSham.strongRhythm`; Limited uses `record.laserSham.limitedPaired` when both views are retained, otherwise `record.laserSham.limitedStructure` or `record.laserSham.limitedRhythm`. The old general `record.laserSham.limited` is excluded.

Validation checks that the source string map has exactly these 213 selected keys for slice, that every selected object reference resolves, and that no additional key enters the built package. Full and fallback may contain other staged source strings while they remain incomplete, but a requested incomplete profile still fails before a usable package exists.

### 20.7 Exact amendment and implementation work orders

The complete amendment impact is:

| Authority/interface                | Exact proposed amendment                                                                                                                                                                                                                                                                                                                  | Owner and affected checks                                                                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| MR-IF-002 v6 / S03                 | Keep campaign schema 2; split the opening event identity to `MR-EVT-CLARIFIED` while the scene stays `MR-SCN-CLARIFIED`; permit selected tutorial IDs in `completedContentIds`; add the exact five-ID evaluation-slice dormant-state exception and rejection rules. No schema-1 migration or compatible earlier content version is added. | WP01 state files and campaign-state tests named below. S07 keeps exact content-version/profile rejection and needs no interface revision. |
| MR-IF-003 v3 / S04                 | Add `tutorialShown` to `recordContentPresentation`; define first-analysis milestone completion; permit the one correlated room open-scene result and three exact Gabriel scene-result routes; retain verified-checkpoint ownership before slice completion UI.                                                                            | WP01 content/state tests now; later command execution at Steps 20, 23 and 24.                                                             |
| MR-IF-005 v3 / S05                 | Permit `resolveRoomState` to create only the registered Gabriel optional event under the exact one-time eligibility, direct-route lockout, terminal-result and fallback guards in subsection 20.2; use `MR-EVT-CLARIFIED` as the opening scheduler identity.                                                                              | Static correlation tests in Step 5; scheduler, room-event and dialogue journeys at Steps 19, 20 and 25.                                   |
| MR-IF-006 v3 / S06                 | Freeze the complete strict schema/registry/view contract in this candidate, the 97-item/213-key slice, its five exact dormant structural state IDs, initial incomplete full/fallback records, content version 1.1.0, structural-check limit and phase-profile behavior.                                                                   | WP01 validation tests, WP07 source catalogue, WP00 build/profile/bootstrap tests, then later connected consumers.                         |
| MR-IF-010 v3 / S09                 | Define ordered static tutorial `{action,labelKey}` rows in content and the later UI-owned join to `InputView.currentBinding`; current bindings never enter immutable content validation.                                                                                                                                                  | Step 5 validates static rows only. UI/input integration owns the joined tutorial prompt at Steps 15 and 17.                               |
| S01                                | Add the exact commands in subsection 20.4 without a dependency or lockfile change.                                                                                                                                                                                                                                                        | WP00 package/foundation checks and build-profile test.                                                                                    |
| S02                                | Import only the validated generated package through the virtual module; return the fixed safe content error before application or persistence work.                                                                                                                                                                                       | WP00 architecture, bootstrap and startup failure tests.                                                                                   |
| S12                                | Supersede the Step 5 no-new-command statement; Step 6 owns executable fixture files and Gate 6A preserves their traceability without claiming unavailable journeys.                                                                                                                                                                       | `MR-S06-VAL-001`, `REF-001`, `STR-001`, `OBJ-001`, `SLC-001` and `FLT-001`; later owners are in the table below.                          |
| S13                                | Add the exact Step 5 WP01 order and the WP07/WP00 primary plans below; use `build:slice` as the successful phase build and `test:build-profiles` for expected default/full/fallback rejection.                                                                                                                                            | Work-order validation, contribution record, primary audit, fresh Sol xhigh implementation review and integration checks.                  |
| design 12                          | Retain approved D1/D3 and existing D4; add only Leonardo-approved D2/D5/D6 tutorial, task, event, room, recap, character, location, semantic-audio and slice text choices from section 20.                                                                                                                                                | WP07 literal conversion and primary source comparison.                                                                                    |
| `interfaces.md` current-state note | In the later approved amendment commit, qualify its historical “Step 4 is unaccepted” sentence as the state at the correction freeze. Do not alter frozen v2/v5 history before approval.                                                                                                                                                  | Primary record-only correction; current `development-status.md` remains the live resume authority.                                        |

Step 5 structural validation and later execution ownership remain separate:

| Deferred S06 obligation                                        | Step 5 evidence                                                | First execution owner                                                      | Complete connected proof |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------ |
| Reference closure, exact counts and direct condition conflicts | Source validation and isolated contract cases                  | Step 6/Gate 6A preserves executable fixtures                               | Step 30                  |
| Opening mandatory event and Clarified scene                    | Exact event/scene/state correlations                           | Step 17 opening, Step 19 scheduler and Step 26 cutscene                    | Step 30                  |
| Facility activation, direct routes, Gabriel expiry and choice  | Exact routes, windows, guards and expected static correlations | Steps 19–20 scheduler/events; Step 25 dialogue and relationship result     | Step 30                  |
| Laser milestone, result matrix and record                      | 144-row coverage and strict semantic validation                | Steps 21–23 experiment execution                                           | Step 30                  |
| Careful rehearsal, final choice and completion checkpoint      | Strict definitions, reference closure and D1/D3 semantic cases | Step 13 save, Step 24 manuscript command and Step 29 selected presentation | Step 30                  |
| Tutorial first display and current binding                     | Ordered static rows and receipt targets                        | Step 15 UI/input, Step 17 onboarding and Step 29 selected content          | Step 30                  |
| Required messages in the slice                                 | Empty selected family; no positive reachability claim          | Later profiles must add exact messages before becoming complete            | Their owning later step  |

Step 5 owns only the complete-slice source/package cases and the explicit rejection of incomplete full/fallback profiles. Step 14 owns the generic save, recovery and migration mechanism. Steps 39–51 add fallback content and mapping fixtures by feature; Step 52 owns the complete fallback package/profile and combined fallback migration evidence before Step 53 acceptance. Steps 54–68 add full content and mapping fixtures by feature; Step 69 owns the complete full package/profile and combined full migration evidence before Step 70 acceptance. A partial Step 5 slice check cannot satisfy, remove or pre-approve any of those later fixture groups.

After Leonardo approves the amendment and code packet, the primary first creates `Approve Step 5 content contracts`. That commit updates the listed frozen authorities, decisions and controls. It then creates `Authorize Step 5 content validation`, whose draft `MR-WO-WP01-004` records the first commit's exact 40-character hash as `base_commit`. The worker cannot start until that generated hash, the approved state, all S13 headings and the complete repository-relative paths validate. This two-commit binding is necessary because a work-order file cannot contain the hash of its own commit. The approval covers this deterministic binding; it does not permit a placeholder in the actual order.

The worker branch and worktree begin at the recorded amendment commit, not at the later authorization commit. The primary gives the worker the exact authorization-commit ID and the complete approved order in its assignment packet. Before editing, the worker reads the tracked order without changing its branch by running `git show <authorization-commit>:docs/implementation/work-orders/MR-WO-WP01-004.md` and checks that its `base_commit` equals `HEAD`. Thus, the approved order is available as a tracked Git object while the owned worktree stays at the exact recorded base. The worker does not cherry-pick the order or edit documentation.

The exact `MR-WO-WP01-004` candidate fields are: type `implementation-work-order`; status `approved` only after Leonardo's approval; work package `MR-WP-01`; sequence `4`; created/updated `2026-09-08`; provider OpenAI; model `gpt-5.6-sol`; reasoning `high`; model selected `2026-09-07`; branch `work/MR-WP-01-step5-content`; worktree `.worktrees/MR-WP-01-step5-content/`; supersedes `null`; and the amendment commit as the exact base. Its body has these exact S13 assignments:

- Objective and plain-language effect: implement strict content decoding, validation, checked copies/views, profiles and the approved opening-event identity. Invalid source returns safe ordered issues and no partial package.
- Owned source paths: `src/content/index.ts`, `src/content/json.ts`, `src/content/profiles.ts`, `src/content/references.ts`, `src/content/schemas.ts`, `src/content/semantics.ts`, `src/content/source.ts`, `src/content/types.ts`, `src/content/views.ts`, `src/rules/campaign-state-schema.ts` and `src/rules/campaign-state.ts`.
- Owned test paths: `tests/unit/MR-WP-01/campaign-state-codec.test.ts`, `tests/unit/MR-WP-01/campaign-state.test.ts`, `tests/unit/MR-WP-01/campaign-test-data.ts`, `tests/unit/MR-WP-01/content-json.test.ts`, `tests/unit/MR-WP-01/content-profiles.test.ts`, `tests/unit/MR-WP-01/content-public-boundary.test.ts`, `tests/unit/MR-WP-01/content-references.test.ts`, `tests/unit/MR-WP-01/content-schemas.test.ts`, `tests/unit/MR-WP-01/content-semantics.test.ts`, `tests/unit/MR-WP-01/content-source.test.ts` and `tests/unit/MR-WP-01/content-views.test.ts`.
- Prohibited paths: every path outside that owned list, including `.codex/`, `AGENTS.md`, `assets/`, `content/`, `docs/`, root package/build/configuration files, `src/bootstrap/`, `src/persistence/` and browser tests.
- Allowed sources: `docs/04-science-and-experiments.md`, `docs/10-ui-ux-accessibility.md`, `docs/12-content-specification.md`, `docs/15-implementation-contract.md`, `docs/implementation/analysis/step-05-content-contract.md`, `docs/implementation/development-status.md`, `docs/implementation/interfaces.md`, `docs/implementation/specs/02-module-architecture.md`, `docs/implementation/specs/03-domain-model-and-state.md`, `docs/implementation/specs/04-commands-rules-and-determinism.md`, `docs/implementation/specs/05-calendar-scheduler-events-and-cutscenes.md`, `docs/implementation/specs/06-content-data-and-build-profiles.md`, `docs/implementation/specs/09-input-ui-and-accessibility.md`, `docs/implementation/specs/12-test-vectors-and-acceptance.md`, `docs/implementation/specs/13-agent-work-orders-and-integration.md` and `docs/implementation/work-orders/MR-WO-WP01-004.md`.
- Authority and traceability: `MR-REQ-CONTENT-001`, `MR-REQ-EXP-001`, `MR-REQ-TECH-001`, `MR-REQ-UI-001`; MR-IF-002 v6, MR-IF-003 v3, MR-IF-005 v3, MR-IF-006 v3 and MR-IF-010 v3; `MR-S06-VAL-001`, `MR-S06-REF-001`, `MR-S06-STR-001`, `MR-S06-OBJ-001`, `MR-S06-SLC-001`, `MR-S06-FLT-001`; and `MR-S12-ACC-002`, `MR-S12-ACC-017`, `MR-S12-ACC-018`, `MR-S12-ACC-019`, `MR-S12-ACC-025` and `MR-S12-ACC-043`.
- Accepted dependencies: accepted Steps 0–4 and Gate 4A, the exact amendment commit, content envelope schema 1, campaign schema 2, content version 1.1.0 and no compatible earlier content version.
- Tasks: implement only the candidate's strict source/result/issue/view operations; reject duplicate JSON members before normal parsing; validate references, semantics, profile closure and deterministic issue order; return immutable checked copies; align the opening event identity; implement `validateCampaignStateAgainstContent` with the exact five-ID exception and S03 `CheckedResult`; and add the isolated positive/negative tests named by the acceptance packet.
- Non-goals: source I/O, command/scheduler execution, persistence, dynamic input bindings, production prose, root content conversion, build/startup wiring, assets, Three.js, external access and creative/shared-rule decisions.
- Required checks and evidence: focused WP01 tests; campaign-state codec/state tests; `npm run check`; `npm run test:coverage`; and `npm run build`, which is the successful existing build at this pre-WP00 base; `git diff --check`; exact owned-path and no-dependency checks; one commit `MR-WP-01 Define Step 5 content validation`; and a handoff with exact commit/parent, files, checks, limitations and actual model/effort. After WP00 supplies the phase commands and source package, the assembled candidate must also pass `npm run content:check`, `npm run test:build-profiles`, `npm run build:slice` and the amended `npm run verify`. The expected default-full and fallback failures occur inside `test:build-profiles`; they are not failed gates.
- Safety and quality boundaries: no raw content, absolute path, stack trace, saved player data or machine detail in issues; no mutation of input or output; no arbitrary expression/path; no partial package; no network, telemetry, asset, dependency or campaign migration.
- Handoff: submitted is not reviewed, integrated, tested by Leonardo or accepted. The primary performs the complete audit before fresh Sol xhigh review.

The two primary execution plans then use these exact boundaries:

1. `Add approved slice content catalogue`. WP07 starts from the primary candidate branch that contains the authorization commit and the verified `MR-WP-01` submission commit. WP07 owns `content/actions.json`, `content/audio.json`, `content/characters.json`, `content/citations.json`, `content/contextual-lines.json`, `content/endings.json`, `content/environmental-items.json`, `content/events.json`, `content/experiments.json`, `content/interface.json`, `content/locations.json`, `content/manifest.json`, `content/messages.json`, `content/notifications.json`, `content/profiles/fallback.json`, `content/profiles/full.json`, `content/profiles/slice.json`, `content/records.json`, `content/room-states.json`, `content/scenes.json`, `content/strings.en.json`, `content/tasks.json` and `content/tutorials.json`. Allowed sources are the approved section 20 manifest, amended design 12/S06 and the approved WP01 public types. It converts only the 97 items and 213 keys, runs the content unit suite and diff/scope/literal checks, and changes no code, root configuration, dependency or asset. The primary retains this work because WP07 owns authored root content and each literal must stay coupled to Leonardo's approved source decisions.
2. `Wire phase-aware content startup`. WP00 starts from the next primary candidate commit, which contains the authorization commit, the verified `MR-WP-01` submission and the WP07 catalogue commit. WP00 owns `eslint.config.js`, `package.json`, `playwright.config.ts`, `scripts/check-content.ts`, `scripts/content-build.ts`, `scripts/test-build-profiles.ts`, `src/bootstrap/application-bootstrap.ts`, `src/bootstrap/main.ts`, `src/bootstrap/startup-screen.ts`, `src/bootstrap/temporary-adapters.ts`, `src/content-package.d.ts`, `tsconfig.json`, `vite.config.ts`, `tests/e2e/MR-WP-00/campaign-state-diagnostic.spec.ts`, `tests/e2e/MR-WP-00/start-page.spec.ts`, `tests/e2e/MR-WP-00/startup-failures.spec.ts`, `tests/unit/MR-WP-00/application-bootstrap.test.ts`, `tests/unit/MR-WP-00/application-fakes.ts`, `tests/unit/MR-WP-00/application.test.ts`, `tests/unit/MR-WP-00/architecture.test.ts`, `tests/unit/MR-WP-00/content-bootstrap.test.ts`, `tests/unit/MR-WP-00/content-build.test.ts`, `tests/unit/MR-WP-00/foundation.test.ts` and `tests/unit/MR-WP-00/startup.test.ts`. Allowed sources are amended S01/S02/S06/S09/S12/S13, the approved WP01 public boundary and the approved source catalogue. It implements subsection 20.4, safe startup and profile isolation; runs the exact check/verify/profile/browser suite; and changes no lockfile, dependency, source meaning or asset. The primary retains this work because WP00 owns shared root configuration and startup wiring, which need one integration owner after the content boundary exists.

The primary also updates the applicable authoritative documents, `docs/decision-log.md`, `docs/implementation/decisions.md`, `docs/implementation/interfaces.md`, `docs/implementation/open-issues.md`, `docs/implementation/status.md`, `docs/implementation/development-status.md`, `docs/implementation/step-acceptance-log.md`, `docs/implementation/ai-use-log.md`, the new work-order record and later contribution evidence at the named amendment/work-order/integration commit boundaries. These writes remain primary-owned and are not delegated.

The implementation delegation order is exact:

| Task                               | Role/model/effort                                  | Owned paths                           | Dependency and order                                         | Selection reason                                                                                     |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Authority and order commits        | Primary; actual session use recorded               | Named documentation/control paths     | First, after Leonardo approval                               | Shared authority, approval records and Git control remain primary responsibilities.                  |
| Content validation and state ID    | Controlled worker; OpenAI gpt-5.6-sol/high         | Exact `MR-WO-WP01-004` paths          | Sequential after the authority and work-order commits        | Complex closed-schema validation benefits from one isolated implementation context.                  |
| Literal source conversion          | Primary under WP07; actual session use recorded    | Exact root `content/` paths above     | After the verified WP01 commit on the candidate branch       | Literal conversion remains coupled to Leonardo's approved source meanings and WP07 ownership.        |
| Build and startup wiring           | Primary under WP00; actual session use recorded    | Exact root/bootstrap/test paths above | After the WP01 public boundary and approved source catalogue | Shared root configuration and startup paths need one owner with the full assembled candidate.        |
| Candidate assembly and audit       | Primary; actual session use recorded               | Candidate branch and control records  | After all three implementation commits and complete checks   | The primary must verify ownership, source fidelity, privacy, checks and contribution evidence.       |
| Detailed implementation review     | Fresh read-only reviewer; OpenAI gpt-5.6-sol/xhigh | None                                  | After the complete candidate audit                           | A separate detailed reviewer must test the implementation claims before main integration.            |
| Main integration                   | Primary; actual session use recorded               | `main` and named integration records  | Only after review has no required or blocker finding         | S13 assigns ordered cherry-pick, main validation, remote synchronization and records to the primary. |
| Content-foundation test/acceptance | Leonardo                                           | None                                  | Last; separate from implementation review and Step 6         | Leonardo checks the visible safe result and makes the separate Step 5 acceptance decision.           |

No implementation assignee can delegate, change source meaning, edit another owner's path or use a remote. At most two subagents run at once. Reviewers do not edit, integrate or accept work.

The exact Leonardo evidence route is: start `npm run dev:slice` and confirm the existing normal startup lines `Minor Revisions`, `Ready`, `Startup checks passed.` and `Game systems are not yet available.` The primary then runs `npx vitest run tests/unit/MR-WP-00/content-bootstrap.test.ts -t "rejects an invalid embedded package safely"` and reports its plain result. That test injects one controlled invalid package through the test factory, expects “Game content could not be verified. No saved campaign data was changed.”, and proves that application start and persistence do not run. No query, shipped mode or browser control bypasses validation.

WP01 begins only after the amendments and exact work order are approved. The primary assembles a separate candidate branch in dependency order: authorization commit, verified WP01 submission, WP07 catalogue, then WP00 wiring. It audits that complete candidate and sends it to a fresh Sol xhigh reviewer. Only after the review has no unresolved required or blocker finding can the primary copy the reviewed commits to `main`, run the main checks and push. Leonardo then tests `npm run dev:slice` and the controlled invalid-content case before Step 5 acceptance. No implementation, asset integration or Step 5 acceptance is authorized by this candidate section.

### 20.8 Complete-candidate review correction

The first fresh high-level review of section 20 requested Astra/xhigh; its actual model and effort were not exposed. It confirmed the 97-item and 213-key arithmetic, but found eight shared-contract groups before approval: opening event identity, milestone/record variants, recap selection, room-event lifecycle, static-versus-dynamic tutorial fields, complete S13 assignment data, deferred journey ownership and fallback wording. Primary applied all eight corrections in subsections 20.1, 20.2, 20.5 and 20.7. The correction also makes all pre-section-20 conflicting sketches historical for implementation review and adds the complete C02 key mapping. No authority is frozen and no code runs because of these corrections.

The corrected primary audit passed. It checked the cited S03/S05/S06/S09/S13 conflicts and sources, all 97 selected items, all 213 mapped unique keys, 144 unique laser rows with 42 full/102 limited coverage and 48 Weak rows, 26 audio roles, 29 interface items, every representative JSON block, exact six-file scope, formatting, whitespace, current approval language and common credential patterns. It found no remaining primary blocker. One fresh high-level review of the corrected meaning remains before Leonardo receives the packet.

That second fresh high-level review also requested Astra/xhigh; its actual model and effort were not exposed. It reconfirmed every stated item/key/audio/interface/laser count and found four required closure groups: the five dormant initial-state IDs, the queued Gabriel guard, exact laser text attachments and the S13 execution sequence. Primary added the narrow evaluation-slice exception and cases, confirmed and tested the queued guard meaning, attached all four experiment keys to strict fields and projections, and made the work-order bases, checks, commit prefix, selection reasons, candidate review and main-integration order exact.

The same reviewer performed a focused read-only check of those corrections. Primary then separated S03 connected-state `invalidReference` from S06 `missingReference`/`invalidProfile`, replaced the obsolete flattened route projections and assigned later full/fallback evidence owners. The final focused check found no blocker or required finding and judged the candidate ready for Leonardo's combined amendment and implementation-plan decision. Primary removed its one advisory phrase that gave `openScene` a nonexistent null result. That mechanical correction follows the strict union and changes no meaning. This verdict is approval readiness only; it is not implementation or runtime evidence.
