import { describe, expect, it } from 'vitest';

import {
  ACTS,
  ACT_LABELS,
  ACT_PALETTES,
  ACT_PROP_STATES,
  actForWeek,
} from '../../src/world/act-states.ts';
import type { ActId } from '../../src/world/act-states.ts';
import { PROPS } from '../../src/world/floor-plan.ts';

const rowScale = (act: ActId, propId: string): number =>
  ACT_PROP_STATES[act].find((state) => state.propId === propId)?.scaleY ?? 0;

describe('the act mapping', () => {
  it('maps the weeks to the three acts', () => {
    expect([actForWeek(1), actForWeek(4)]).toEqual(['act-1', 'act-1']);
    expect([actForWeek(5), actForWeek(8)]).toEqual(['act-2', 'act-2']);
    expect([actForWeek(9), actForWeek(12)]).toEqual(['act-3', 'act-3']);
  });

  it('defines a labelled palette with a distinct accent for every act', () => {
    for (const act of ACTS) {
      expect(ACT_LABELS[act].length).toBeGreaterThan(0);
      const palette = ACT_PALETTES[act];
      expect(palette.ambientIntensity).toBeGreaterThan(0);
      expect(palette.ambientIntensity).toBeLessThanOrEqual(1.5);
      expect(palette.sunIntensity).toBeGreaterThan(0);
      expect(palette.sunIntensity).toBeLessThanOrEqual(1.5);
    }

    const accents = ACTS.map((act) => ACT_PALETTES[act].accent);
    expect(new Set(accents).size).toBe(ACTS.length);
  });

  it('declines the grow rows across the acts', () => {
    for (const propId of ['prop.grow.row-1', 'prop.grow.row-2', 'prop.grow.row-3']) {
      expect(rowScale('act-1', propId)).toBeGreaterThan(rowScale('act-2', propId));
      expect(rowScale('act-2', propId)).toBeGreaterThan(rowScale('act-3', propId));
    }
  });

  it('references real props with bounded states', () => {
    const ids = new Set(PROPS.map((prop) => prop.id));

    for (const act of ACTS) {
      expect(ACT_PROP_STATES[act].length).toBeGreaterThan(0);

      for (const state of ACT_PROP_STATES[act]) {
        expect(ids.has(state.propId)).toBe(true);
        expect(state.scaleY).toBeGreaterThan(0);
        expect(state.scaleY).toBeLessThanOrEqual(1);
        expect(Number.isInteger(state.color)).toBe(true);
        expect(state.color).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
