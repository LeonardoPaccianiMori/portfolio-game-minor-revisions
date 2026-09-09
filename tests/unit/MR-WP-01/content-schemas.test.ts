import { describe, expect, it } from 'vitest';
import {
  countUniqueWords,
  validateDataEnvelope,
  validateStringsShape,
} from '../../../src/content/schemas';
import { CONTENT_FAMILIES } from '../../../src/content/types';
import { builtContentFixture } from './campaign-test-data';

describe('strict family and text schemas', () => {
  it('rejects an extra family-item field', () => {
    const character = {
      ...builtContentFixture().families.characters[0],
      trace: { requirementIds: ['MR-REQ-CONTENT-001'], testIds: ['MR-TEST-CONT-001'] },
      portraitUrl: 'private',
    };
    expect(
      validateDataEnvelope(
        { schemaVersion: 1, family: 'characters', items: [character] },
        'characters',
      ),
    ).toMatchObject({ kind: 'invalid', issues: [{ code: 'invalidObject' }] });
  });
  it('rejects an unregistered condition fact', () => {
    const task = structuredClone(builtContentFixture().families.tasks[0]) as Record<
      string,
      unknown
    >;
    const availability = task.availability as { when: { allOf: unknown[] } };
    availability.when.allOf = [
      { type: 'integerInRange', fact: '/metadata/campaignSeed', minimum: 0, maximum: 5 },
    ];
    const authored = {
      ...task,
      trace: { requirementIds: ['MR-REQ-CONTENT-001'], testIds: ['MR-TEST-CONT-001'] },
    };
    expect(
      validateDataEnvelope({ schemaVersion: 1, family: 'tasks', items: [authored] }, 'tasks'),
    ).toMatchObject({ kind: 'invalid', issues: [{ code: 'invalidObject' }] });
  });
  it('checks NFC, placeholders, markup, and the exact word normalization', () => {
    expect(validateStringsShape({ 'safe.text': 'Use {protagonistName}’s result.' })).toMatchObject({
      kind: 'valid',
    });
    expect(validateStringsShape({ 'safe.text': '<script>alert(1)</script>' })).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invalidText' }],
    });
    expect(validateStringsShape({ 'safe.text': 'Use {campaignSeed}.' })).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invalidText' }],
    });
    expect(countUniqueWords({ a: 'Result result', b: 'Morgan’s result {protagonistName}' })).toBe(
      2,
    );
  });
  it('accepts every condition and effect variant plus dormant slice families', () => {
    const trace = {
      requirementIds: ['MR-REQ-CONTENT-001'],
      testIds: ['MR-TEST-CONT-001'],
    };
    const ref = (family: string, id: string) => ({ family, id });
    const owner = (family: string, id: string, childId: string) => ({
      owner: ref(family, id),
      id: childId,
    });
    const leaves = [
      { type: 'periodInWindow', window: { first: 0, last: 1 } },
      { type: 'actIs', value: 'orderlyButOverbooked' },
      { type: 'pressureProfileIs', value: 'standard' },
      { type: 'enumIs', fact: 'claimLevel', value: 'careful' },
      { type: 'enumIs', fact: 'haoranAuthorship', value: null },
      { type: 'booleanIs', fact: 'pendingCrash', value: false },
      { type: 'integerInRange', fact: 'energy', minimum: 0, maximum: 5 },
      {
        type: 'idPresenceIs',
        collection: 'completedContentIds',
        target: ref('events', 'MR-EVT-TEST'),
        present: true,
      },
      {
        type: 'contentStateIs',
        target: owner('scenes', 'MR-SCN-TEST', 'MR-CHO-TEST'),
        selectedOptionId: 'MR-OPT-TEST',
      },
      {
        type: 'contentStateIs',
        target: ref('messages', 'MR-MSG-TEST'),
        state: 'available',
      },
      {
        type: 'experimentStateIs',
        experimentId: 'MR-EXP-TEST',
        runNumber: null,
        field: 'finalResultBand',
        value: null,
      },
      {
        type: 'experimentStateIs',
        experimentId: 'MR-EXP-TEST',
        runNumber: 1,
        field: 'sampleCondition',
        value: 'stable',
      },
      { type: 'manuscriptStateIs', fact: 'hasSnapshot', target: null, value: true },
      {
        type: 'manuscriptStateIs',
        fact: 'reading',
        target: ref('records', 'MR-REC-TEST'),
        value: 'honest',
      },
      {
        type: 'manuscriptStateIs',
        fact: 'requirement',
        target: owner('records', 'MR-REC-TEST', 'MR-REQ-TEST'),
        value: null,
      },
      {
        type: 'manuscriptStateIs',
        fact: 'reviewerForm',
        target: owner('records', 'MR-REC-TEST', 'MR-FORM-TEST'),
        value: 'base',
      },
      { type: 'concernStateIs', concernId: 'MR-CONCERN-TEST', field: 'visible', value: true },
      { type: 'concernStateIs', concernId: 'MR-CONCERN-TEST', field: 'response', value: null },
      {
        type: 'concernStateIs',
        concernId: 'MR-CONCERN-TEST',
        field: 'routeImpact',
        value: 'both',
      },
      { type: 'routeStateIs', route: 'aldercroft', state: 'developing' },
      {
        type: 'relationshipStateIs',
        characterId: 'MR-CHR-TEST',
        field: 'trust',
        minimum: 0,
        maximum: 100,
        value: null,
      },
      {
        type: 'relationshipStateIs',
        characterId: 'MR-CHR-TEST',
        field: 'introduced',
        minimum: null,
        maximum: null,
        value: true,
      },
      { type: 'piimStateIs', fact: 'outcome', value: 'published' },
      { type: 'piimStateIs', fact: 'batch', value: null },
      { type: 'paperStateIs', fact: 'preprint', value: 'public' },
      { type: 'paperStateIs', fact: 'journal', value: 'submitted' },
      { type: 'paperStateIs', fact: 'final', value: null },
      {
        type: 'fatigueStateIs',
        fact: 'pendingCrash',
        minimum: null,
        maximum: null,
        value: false,
      },
      { type: 'fatigueStateIs', fact: 'crashCount', minimum: 0, maximum: 1, value: null },
      { type: 'fatigueStateIs', fact: 'energy', minimum: 0, maximum: 5, value: null },
      { type: 'conclusionStateIs', fact: 'state', value: 'unresolved' },
      { type: 'conclusionStateIs', fact: 'choice', value: null },
      { type: 'countInRange', collection: 'activeRuns', minimum: 0, maximum: 1 },
      { type: 'countInRange', collection: 'citations', minimum: 0, maximum: 2 },
      { type: 'countInRange', collection: 'rawRecords', minimum: 0, maximum: 2 },
    ];
    const conditions = { allOf: leaves, anyOf: [], noneOf: [] };
    const emptyConditions = { allOf: [], anyOf: [], noneOf: [] };
    const availability = {
      window: { first: 0, last: 2 },
      when: emptyConditions,
      blocking: emptyConditions,
      expiry: 'afterWindow',
      repeat: 'repeatable',
    };
    const commonEffect = { owner: 'applyScheduledTransition', reasonKey: 'reason.test' };
    const effects = [
      {
        type: 'adjustMetric',
        ...commonEffect,
        metric: 'trust',
        characterId: 'MR-CHR-TEST',
        delta: -1,
      },
      { type: 'setFact', ...commonEffect, fact: 'camilaReplySent', value: true },
      {
        type: 'recordHistory',
        ...commonEffect,
        collection: 'completedContentIds',
        target: ref('events', 'MR-EVT-TEST'),
      },
      { type: 'applyActionCost', ...commonEffect, actionId: 'MR-ACT-TEST' },
      ...[
        { kind: 'activateTask', taskId: 'MR-TASK-TEST' },
        { kind: 'recordPrimary', recordId: 'MR-REC-TEST' },
        {
          kind: 'selectOption',
          choice: owner('scenes', 'MR-SCN-TEST', 'MR-CHO-TEST'),
          optionId: 'MR-OPT-TEST',
        },
        {
          kind: 'resolveRoom',
          roomStateId: 'MR-ROOM-TEST',
          routeId: 'MR-ROUTE-TEST',
          equipmentState: 'ready',
        },
        { kind: 'applySupport', characterId: 'MR-CHR-TEST', target: ref('tasks', 'MR-TASK-TEST') },
        { kind: 'commitManuscript', taskId: 'MR-TASK-TEST' },
        {
          kind: 'completeSlice',
          taskId: 'MR-SLICE-CLAIM-REHEARSAL',
          interfaceId: 'MR-UI-SLICE-COMPLETE',
        },
      ].map((result) => ({ type: 'applyDomainResult', ...commonEffect, result })),
      ...[
        { kind: 'saveCheckpoint', reasonId: 'MR-REASON-TEST' },
        { kind: 'showNotice', interfaceId: 'MR-UI-TEST', noticeKey: 'notice.test' },
        { kind: 'startCutscene', sceneId: 'MR-SCN-TEST' },
        { kind: 'playAudioCue', audioId: 'MR-AUD-TEST' },
        { kind: 'completeCampaign' },
      ].map((presentation) => ({ type: 'requestPresentation', ...commonEffect, presentation })),
    ];
    const items = [
      {
        family: 'events',
        item: {
          id: 'MR-EVT-TEST',
          type: 'event',
          trace,
          availability,
          status: 'required',
          priority: 'mandatoryContent',
          authoredOrder: 1,
          delivery: { kind: 'scene', target: ref('scenes', 'MR-SCN-TEST') },
          cue: {
            id: 'MR-CUE-TEST',
            locationId: 'MR-LOC-TEST',
            interfaceId: 'MR-UI-TEST',
            audioId: null,
          },
          fallback: { kind: 'notification', target: ref('notifications', 'MR-NOT-TEST') },
          threadId: null,
          effects,
        },
      },
      {
        family: 'messages',
        item: {
          id: 'MR-MSG-TEST',
          type: 'message',
          trace,
          availability,
          eventId: 'MR-EVT-TEST',
          senderId: 'MR-CHR-TEST',
          threadId: 'MR-THREAD-TEST',
          subjectKey: 'message.test.subject',
          forms: [],
          choices: [],
          deferral: 'leaveAvailable',
          followupEventIds: [],
          expiryEffects: [],
        },
      },
      {
        family: 'notifications',
        item: {
          id: 'MR-NOT-TEST',
          type: 'notification',
          trace,
          availability,
          eventId: 'MR-EVT-TEST',
          senderId: 'MR-CHR-TEST',
          threadId: null,
          forms: [],
          presentation: 'direct',
          followupEventIds: [],
        },
      },
      {
        family: 'endings',
        item: {
          id: 'MR-END-TEST',
          type: 'ending',
          trace,
          family: 'career',
          when: conditions,
          bodyKey: 'ending.test',
          variants: [],
        },
      },
      {
        family: 'citations',
        item: {
          id: 'MR-CIT-TEST',
          type: 'citation',
          trace,
          titleKey: 'citation.test.title',
          bodyKey: 'citation.test.body',
          when: emptyConditions,
          permanent: true,
          archiveOrder: 0,
        },
      },
      {
        family: 'environmentalItems',
        item: {
          id: 'MR-ENV-TEST',
          type: 'environmentalItem',
          trace,
          availability,
          locationId: 'MR-LOC-TEST',
          acts: ['orderlyButOverbooked'],
          presentation: 'focused',
          textKeys: ['environment.test'],
        },
      },
      {
        family: 'contextualLines',
        item: {
          id: 'MR-CTX-TEST',
          type: 'contextualLine',
          trace,
          availability,
          speakerId: 'MR-CHR-TEST',
          when: conditions,
          textKey: 'context.test',
        },
      },
    ] as const;
    for (const { family, item } of items)
      expect(validateDataEnvelope({ schemaVersion: 1, family, items: [item] }, family).kind).toBe(
        'valid',
      );
  });
  it('rejects wrong value types at every distinct authored-item structure', () => {
    type Segment = string | number;
    type Data = Record<string, unknown>;
    const isData = (value: unknown): value is Data =>
      typeof value === 'object' && value !== null && !Array.isArray(value);
    const trace = {
      requirementIds: ['MR-REQ-CONTENT-001'],
      testIds: ['MR-TEST-CONT-001'],
    };
    const seen = new Set<string>();
    const unexpectedValid: string[] = [];
    let mutationCount = 0;
    let invalidStringCount = 0;

    for (const family of CONTENT_FAMILIES)
      for (const builtItem of builtContentFixture().families[family]) {
        const authored = { ...structuredClone(builtItem), trace } as Data;
        const itemId = String(authored.id);
        const checkMutation = (
          path: readonly Segment[],
          replacement: unknown,
          suffix: string,
          mustReject = true,
        ): boolean => {
          const mutated = structuredClone(authored);
          let owner: unknown = mutated;
          for (const segment of path.slice(0, -1)) owner = (owner as Data)[segment as keyof Data];
          if (path.length === 0) mutated.__unexpected = true;
          else (owner as Data)[path.at(-1)! as keyof Data] = replacement;
          const outcome = validateDataEnvelope(
            { schemaVersion: 1, family, items: [mutated] },
            family,
          );
          if (mustReject && outcome.kind === 'valid')
            unexpectedValid.push(`${family}:${itemId}:${path.join('/')}:${suffix}`);
          return outcome.kind === 'invalid';
        };
        const walk = (value: unknown, path: readonly Segment[], parentTag: string): void => {
          const normalizedPath = path
            .map((segment) => (typeof segment === 'number' ? '*' : segment))
            .join('/');
          if (Array.isArray(value)) {
            const signature = `${family}:${normalizedPath}:array:${parentTag}`;
            if (!seen.has(signature)) {
              seen.add(signature);
              mutationCount += 1;
              checkMutation(path, {}, 'wrong-type');
            }
            for (const [index, entry] of value.entries()) walk(entry, [...path, index], parentTag);
            return;
          }
          if (isData(value)) {
            const tag = ['type', 'kind', 'purpose']
              .map((key) => (typeof value[key] === 'string' ? `${key}=${value[key]}` : ''))
              .filter(Boolean)
              .join(',');
            const shape = Object.keys(value).sort().join(',');
            const signature = `${family}:${normalizedPath}:object:${shape}:${tag}:${parentTag}`;
            if (!seen.has(signature)) {
              seen.add(signature);
              mutationCount += 1;
              const mutated = structuredClone(authored);
              let target: unknown = mutated;
              for (const segment of path) target = (target as Data)[segment as keyof Data];
              (target as Data).__unexpected = true;
              const outcome = validateDataEnvelope(
                { schemaVersion: 1, family, items: [mutated] },
                family,
              );
              if (outcome.kind === 'valid')
                unexpectedValid.push(`${family}:${itemId}:${path.join('/')}:extra-field`);
            }
            for (const [key, entry] of Object.entries(value))
              walk(entry, [...path, key], tag || parentTag);
            return;
          }
          const signature = `${family}:${normalizedPath}:${typeof value}:${parentTag}`;
          if (seen.has(signature)) return;
          seen.add(signature);
          mutationCount += 1;
          const replacement =
            typeof value === 'string'
              ? 1
              : typeof value === 'number' || typeof value === 'boolean'
                ? 'invalid'
                : {};
          checkMutation(path, replacement, 'wrong-type');
          if (
            typeof value === 'string' &&
            checkMutation(path, '__invalid__', 'invalid-string', false)
          )
            invalidStringCount += 1;
        };
        walk(authored, [], 'item');
      }

    expect(unexpectedValid.slice(0, 10)).toEqual([]);
    expect(mutationCount).toBeGreaterThan(200);
    expect(invalidStringCount).toBeGreaterThan(100);
  });
});
