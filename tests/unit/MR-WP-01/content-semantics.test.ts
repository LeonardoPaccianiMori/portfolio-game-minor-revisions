import { describe, expect, it } from 'vitest';
import { validateContentPackage } from '../../../src/content';
import { builtContentFixture } from './campaign-test-data';

describe('closed content semantics', () => {
  it('accepts all 144 ordered laser rows and key D3 vectors', () => {
    const built = builtContentFixture();
    const experiment = built.families.experiments[0] as unknown as {
      outcomes: readonly Record<string, unknown>[];
    };
    expect(experiment.outcomes).toHaveLength(144);
    expect(experiment.outcomes).toContainEqual(
      expect.objectContaining({
        biologicalResult: 'strong',
        observation: 'paired',
        access: 'readyMatched',
        monitoringResponse: 'qualityCheck',
        structureId: 'MR-STRUCTURE-RECOVERY',
        rhythmId: 'MR-RHYTHM-RECOVERY',
        observationCoverage: 'full',
      }),
    );
    expect(experiment.outcomes).toContainEqual(
      expect.objectContaining({
        biologicalResult: 'weak',
        structureId: 'MR-STRUCTURE-UNOBSERVED',
        rhythmId: 'MR-RHYTHM-UNOBSERVED',
      }),
    );
  });
  it('rejects a row that turns limited access into matched control', () => {
    const built = structuredClone(builtContentFixture());
    const experiment = built.families.experiments[0] as unknown as {
      outcomes: { access: string; controlId: string }[];
    };
    const row = experiment.outcomes.find((entry) => entry.access === 'limitedRoute')!;
    row.controlId = 'MR-CONTROL-MATCHED';
    expect(validateContentPackage(built)).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invariantFailure' }],
    });
  });
  it('rejects a second authored action-cost owner', () => {
    const built = structuredClone(builtContentFixture());
    const scene = built.families.scenes[1] as unknown as { completionEffects: unknown[] };
    scene.completionEffects.push({
      type: 'applyActionCost',
      owner: 'chooseSceneOption',
      reasonKey: 'reason.time.action',
      actionId: 'MR-ACT-RELATIONSHIP',
    });
    expect(validateContentPackage(built)).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invariantFailure' }],
    });
  });
  it.each([
    [
      'character registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        (built.families.characters[0] as unknown as { speakerId: string }).speakerId =
          'MR-CHR-ELENA';
      },
    ],
    [
      'location registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        (built.families.locations[0] as unknown as { cueRoles: string[] }).cueRoles = ['warning'];
      },
    ],
    [
      'task registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        (built.families.tasks[0] as unknown as { allowedClaimIds: string[] }).allowedClaimIds = [];
      },
    ],
    [
      'room-route registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        const room = built.families.roomStates[0] as unknown as {
          routes: { trigger?: { optionId: string } }[];
        };
        room.routes[3]!.trigger!.optionId = 'MR-CHO-GABRIEL-QUEUE-PRESS';
      },
    ],
    [
      'event registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        (built.families.events[2] as unknown as { status: string }).status = 'required';
      },
    ],
    [
      'scene registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        const scene = built.families.scenes[1] as unknown as {
          baseForm: { beats: { speakerId: string | null }[] };
        };
        scene.baseForm.beats[1]!.speakerId = 'MR-CHR-GABRIEL';
      },
    ],
    [
      'record registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        const record = built.families.records[0] as unknown as {
          selection: { allowedBodyKeys: string[] };
        };
        record.selection.allowedBodyKeys.pop();
      },
    ],
    [
      'interface registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        const entry = built.families.interface.find(
          (item) => item.id === 'MR-UI-CUE-OPTIONAL',
        ) as unknown as { dynamicFields: string[] };
        entry.dynamicFields = ['currentValue'];
      },
    ],
    [
      'audio registry',
      (built: ReturnType<typeof builtContentFixture>) => {
        (built.families.audio[8] as unknown as { visibleDuplicate: string }).visibleDuplicate =
          'none';
      },
    ],
  ])('rejects one isolated %s mismatch', (_name, mutate) => {
    const built = structuredClone(builtContentFixture());
    mutate(built);
    expect(validateContentPackage(built)).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invariantFailure' }],
    });
  });
});
