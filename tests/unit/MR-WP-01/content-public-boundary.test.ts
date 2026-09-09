import { describe, expect, it } from 'vitest';
import * as content from '../../../src/content';

describe('content public boundary', () => {
  it('exports only the four checked operations at runtime', () => {
    expect(Object.keys(content).sort()).toEqual([
      'createBuiltContentPackage',
      'validateCampaignStateAgainstContent',
      'validateContentPackage',
      'validateSourceCatalogue',
    ]);
    expect(content).not.toHaveProperty('decodeJsonFile');
    expect(content).not.toHaveProperty('createExpectedLaserOutcomes');
  });
});
