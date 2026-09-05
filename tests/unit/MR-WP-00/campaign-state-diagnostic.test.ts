import { describe, expect, it } from 'vitest';

import {
  buildCampaignStateDiagnosticSummaries,
  isCampaignStateDiagnosticLocation,
} from '../../../src/bootstrap';
import type { CampaignState, CheckedResult } from '../../../src/rules';

describe('Step-4 private campaign-state diagnostic', () => {
  it('selects only the exact private query', () => {
    expect(isCampaignStateDiagnosticLocation('?diagnostic=campaign-state')).toBe(true);
    expect(isCampaignStateDiagnosticLocation('')).toBe(false);
    expect(isCampaignStateDiagnosticLocation('?diagnostic=campaign-state&extra=true')).toBe(false);
    expect(isCampaignStateDiagnosticLocation('?diagnostic=other')).toBe(false);
  });

  it('projects only the approved equal starting facts and pressure difference', () => {
    expect(buildCampaignStateDiagnosticSummaries()).toEqual([
      {
        profile: 'Standard',
        revision: 0,
        periodIndex: 0,
        energy: 4,
        evidence: 3,
        paperConfidence: 45,
        integrity: 100,
        validation: 'Passed',
      },
      {
        profile: 'Supported',
        revision: 0,
        periodIndex: 0,
        energy: 5,
        evidence: 3,
        paperConfidence: 45,
        integrity: 100,
        validation: 'Passed',
      },
    ]);
  });

  it('converts a creation failure to a fixed safe result', () => {
    const fail = (): CheckedResult<CampaignState> => ({
      kind: 'failure',
      issue: { path: '/metadata/campaignId', reason: 'invalidId' },
    });
    const summaries = buildCampaignStateDiagnosticSummaries(fail);
    const output = JSON.stringify(summaries);
    expect(summaries.every((summary) => summary.validation === 'Unavailable')).toBe(true);
    expect(output).not.toContain('campaignId');
    expect(output).not.toContain('invalidId');
    expect(output).not.toContain('/metadata');
  });
});
