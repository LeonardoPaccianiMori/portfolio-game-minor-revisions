import { createInitialCampaignState } from '../../../src/rules';
import type { CampaignCreationInput, CampaignState } from '../../../src/rules';

export const standardInput: CampaignCreationInput = {
  campaignId: '00000000-0000-4000-8000-000000000001',
  campaignSeed: 305_419_896,
  contentVersion: '1.0.0',
  buildProfileId: 'full',
  pressureProfile: 'standard',
  protagonist: { name: 'Morgan', pronounSet: 'theyThem' },
};

export const initialCampaign = (input: CampaignCreationInput = standardInput): CampaignState => {
  const result = createInitialCampaignState(input);
  if (result.kind === 'failure') throw new Error('Controlled campaign creation failed');
  return result.value;
};

export const copyCampaign = (state: CampaignState = initialCampaign()): CampaignState =>
  structuredClone(state);
