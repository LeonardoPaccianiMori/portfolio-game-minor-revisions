import { describe, expect, it } from 'vitest';

import { CampaignStateCodec } from '../../../src/rules';
import { initialCampaign } from './campaign-test-data';

describe('canonical campaign-state JSON', () => {
  it('uses compact fixed key order, retains Unicode, and has stable bytes', () => {
    const state = initialCampaign();
    state.narrative.protagonist.name = 'Morgán';
    const before = structuredClone(state);
    const first = CampaignStateCodec.serialize(state);
    const second = CampaignStateCodec.serialize(state);
    expect(first).toEqual(second);
    expect(state).toEqual(before);
    if (first.kind === 'failure') return;
    expect(first.value).not.toContain('\n');
    expect(first.value).not.toContain('Morg\\u00e1n');
    expect(first.value.indexOf('"metadata"')).toBeLessThan(first.value.indexOf('"calendar"'));
    expect(first.value.indexOf('"calendar"')).toBeLessThan(first.value.indexOf('"campaignValues"'));
    expect(first.value.indexOf('"campaignValues"')).toBeLessThan(
      first.value.indexOf('"experiments"'),
    );
    expect(first.value.indexOf('"experiments"')).toBeLessThan(first.value.indexOf('"manuscript"'));
    expect(first.value.indexOf('"manuscript"')).toBeLessThan(first.value.indexOf('"narrative"'));
    expect(first.value.indexOf('"narrative"')).toBeLessThan(first.value.indexOf('"relationships"'));
    expect(first.value.indexOf('"relationships"')).toBeLessThan(first.value.indexOf('"world"'));
    expect(first.value.indexOf('"world"')).toBeLessThan(first.value.indexOf('"contentHistory"'));
    expect(first.value.indexOf('"contentHistory"')).toBeLessThan(
      first.value.indexOf('"conclusion"'),
    );
  });

  it('round-trips to fresh state and identical canonical text', () => {
    const state = initialCampaign();
    const serialized = CampaignStateCodec.serialize(state);
    expect(serialized.kind).toBe('success');
    if (serialized.kind === 'failure') return;
    const parsed = CampaignStateCodec.parse(serialized.value);
    expect(parsed.kind).toBe('success');
    if (parsed.kind === 'failure') return;
    expect(parsed.value).toEqual(state);
    expect(parsed.value).not.toBe(state);
    expect(parsed.value.metadata).not.toBe(state.metadata);
    const again = CampaignStateCodec.serialize(parsed.value);
    expect(again).toEqual(serialized);
    parsed.value.calendar.pendingCrash = true;
    expect(state.calendar.pendingCrash).toBe(false);
  });

  it('canonicalizes every ID-keyed record without changing meaningful list order', () => {
    const canonical = initialCampaign();
    const reordered = initialCampaign();
    reordered.manuscript.reviewerReportsById = Object.fromEntries(
      Object.entries(reordered.manuscript.reviewerReportsById).reverse(),
    );
    reordered.narrative.routesById = Object.fromEntries(
      Object.entries(reordered.narrative.routesById).reverse(),
    );
    reordered.narrative.scheduler.eventsById = Object.fromEntries(
      Object.entries(reordered.narrative.scheduler.eventsById).reverse(),
    );
    reordered.relationships.byId = Object.fromEntries(
      Object.entries(reordered.relationships.byId).reverse(),
    );
    reordered.world.characterPlacementsById = Object.fromEntries(
      Object.entries(reordered.world.characterPlacementsById).reverse(),
    );
    reordered.world.roomStatesById = Object.fromEntries(
      Object.entries(reordered.world.roomStatesById).reverse(),
    );
    const first = CampaignStateCodec.serialize(canonical);
    const second = CampaignStateCodec.serialize(reordered);
    expect(first.kind).toBe('success');
    expect(second).toEqual(first);
  });

  it('returns sanitized typed failures for invalid JSON and invalid decoded state', () => {
    expect(CampaignStateCodec.parse('{')).toEqual({
      kind: 'failure',
      issue: { path: '/', reason: 'wrongType' },
    });
    expect(CampaignStateCodec.parse('{"camera":true}')).toEqual({
      kind: 'failure',
      issue: { path: '/camera', reason: 'forbiddenPresentationField' },
    });
  });

  it('returns the safe typed failure instead of throwing for deeply nested JSON', () => {
    const text = `${'['.repeat(20_000)}null${']'.repeat(20_000)}`;
    expect(() => CampaignStateCodec.parse(text)).not.toThrow();
    expect(CampaignStateCodec.parse(text)).toEqual({
      kind: 'failure',
      issue: { path: '/', reason: 'wrongType' },
    });
  });

  it.each([
    '"contentVersion":"do-not-return","contentVersion":"1.1.0"',
    '"contentVersion":"do-not-return","\\u0063ontentVersion":"1.1.0"',
  ])('rejects one duplicate member in an otherwise valid campaign: %s', (duplicateMember) => {
    const serialized = CampaignStateCodec.serialize(initialCampaign());
    expect(serialized.kind).toBe('success');
    if (serialized.kind === 'failure') return;
    const text = serialized.value.replace('"contentVersion":"1.1.0"', duplicateMember);
    const ordinaryLastMemberText = JSON.stringify(JSON.parse(text) as unknown);
    expect(CampaignStateCodec.parse(ordinaryLastMemberText).kind).toBe('success');

    const result = CampaignStateCodec.parse(text);
    expect(result).toEqual({
      kind: 'failure',
      issue: { path: '/', reason: 'wrongType' },
    });
    expect(JSON.stringify(result)).not.toContain('do-not-return');
  });

  it('does not serialize invalid or cyclic input and returns no partial text', () => {
    const invalid = initialCampaign();
    invalid.calendar.periodIndex = 64;
    expect(CampaignStateCodec.serialize(invalid)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invalidNumber' },
    });
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(CampaignStateCodec.serialize(cyclic)).toMatchObject({ kind: 'failure' });
  });
});
