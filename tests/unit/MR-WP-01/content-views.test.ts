import { describe, expect, it } from 'vitest';
import { validateContentPackage } from '../../../src/content';
import { builtContentFixture } from './campaign-test-data';

describe('immutable content views', () => {
  it('returns explicit deeply frozen rule and presentation projections', () => {
    const built = builtContentFixture();
    const checked = validateContentPackage(built);
    expect(checked.kind).toBe('valid');
    if (checked.kind === 'invalid') return;
    expect(Object.isFrozen(checked.value)).toBe(true);
    expect(Object.isFrozen(checked.value.rules.families.experiments[0])).toBe(true);
    const ruleExperiment = checked.value.rules.families.experiments[0] as unknown as Record<
      string,
      unknown
    >;
    const presentationExperiment = checked.value.presentation.families
      .experiments[0] as unknown as { outcomes: Record<string, unknown>[] };
    expect(ruleExperiment).not.toHaveProperty('labelKey');
    expect(ruleExperiment).not.toHaveProperty('questionKeys');
    expect((ruleExperiment.outcomes as Record<string, unknown>[])[0]).not.toHaveProperty('bodyKey');
    expect(presentationExperiment.outcomes[0]).toHaveProperty('bodyKey');
    const tutorial = checked.value.presentation.families.tutorials[0] as unknown as {
      inputActions: unknown[];
    };
    expect(tutorial.inputActions).toEqual([
      { action: 'move', labelKey: 'input.action.move' },
      { action: 'look', labelKey: 'input.action.look' },
    ]);
  });
  it('copies input and rejects source trace in a browser package', () => {
    const built = structuredClone(builtContentFixture());
    const checked = validateContentPackage(built);
    expect(checked.kind).toBe('valid');
    if (checked.kind === 'invalid') return;
    (built.strings as Record<string, string>)['ui.content.invalid'] = 'Changed';
    expect(checked.value.strings['ui.content.invalid']).not.toBe('Changed');
    const traced = structuredClone(builtContentFixture()) as unknown as {
      families: { characters: Record<string, unknown>[] };
    };
    traced.families.characters[0]!.trace = { requirementIds: [], testIds: [] };
    expect(validateContentPackage(traced)).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invalidObject' }],
    });
  });
});
