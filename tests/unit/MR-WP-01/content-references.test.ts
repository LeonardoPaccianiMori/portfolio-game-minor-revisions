import { describe, expect, it } from 'vitest';
import { validateContentPackage } from '../../../src/content';
import { builtContentFixture } from './campaign-test-data';

describe('content reference closure', () => {
  it('rejects a selected reference to an absent dormant room', () => {
    const built = structuredClone(builtContentFixture());
    const event = built.families.events[1] as unknown as {
      delivery: { target: { roomState: { id: string } } };
    };
    event.delivery.target.roomState.id = 'MR-ROOM-IMAGING-SERVICE-LIMIT';
    expect(validateContentPackage(built)).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'missingReference' }],
    });
  });
  it('distinguishes a wrong-family target from a missing target', () => {
    const built = structuredClone(builtContentFixture());
    const task = built.families.tasks[1] as unknown as { experiment: { id: string } };
    task.experiment.id = 'MR-REC-LASER-SHAM';
    expect(validateContentPackage(built)).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'wrongReferenceFamily' }],
    });
  });
});
