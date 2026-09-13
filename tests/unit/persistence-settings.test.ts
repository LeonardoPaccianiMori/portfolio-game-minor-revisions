import { describe, expect, it } from 'vitest';

import {
  DEFAULT_SETTINGS,
  resolveSettings,
  validateSettings,
} from '../../src/persistence/index.ts';

describe('settings', () => {
  it('validates the defaults', () => {
    expect(validateSettings(DEFAULT_SETTINGS)).toEqual({
      ok: true,
      settings: DEFAULT_SETTINGS,
    });
  });

  it('rejects malformed settings with precise issues', () => {
    const result = validateSettings({
      captions: 'yes',
      reducedMotion: false,
      scale: 3,
      volume: -1,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toContain('captions must be a boolean');
      expect(result.issues).toContain('scale is out of range');
      expect(result.issues).toContain('volume is out of range');
    }
  });

  it('falls back to defaults for missing or invalid records', () => {
    expect(resolveSettings(undefined)).toEqual(DEFAULT_SETTINGS);
    expect(resolveSettings({ captions: true })).toEqual(DEFAULT_SETTINGS);
    expect(resolveSettings({ ...DEFAULT_SETTINGS, volume: 0.4 })).toEqual({
      ...DEFAULT_SETTINGS,
      volume: 0.4,
    });
  });
});
