import {
  createInitialCampaignState,
  validateCampaignState,
  type CampaignCreationInput,
  type CampaignState,
  type CheckedResult,
} from '../rules';

type CreateCampaignState = (input: CampaignCreationInput) => CheckedResult<CampaignState>;
type ValidateCampaignState = (value: unknown) => CheckedResult<CampaignState>;

export interface CampaignStateDiagnosticSummary {
  profile: 'Standard' | 'Supported';
  revision: number | '—';
  periodIndex: number | '—';
  energy: number | '—';
  evidence: number | '—';
  paperConfidence: number | '—';
  integrity: number | '—';
  validation: 'Passed' | 'Unavailable';
}

const diagnosticInput = (pressureProfile: 'standard' | 'supported'): CampaignCreationInput => ({
  campaignId: '00000000-0000-4000-8000-000000000004',
  campaignSeed: 1_363_162_018,
  contentVersion: '1.0.0',
  buildProfileId: 'full',
  pressureProfile,
  protagonist: { name: 'Morgan', pronounSet: 'theyThem' },
});

const unavailableSummary = (
  profile: CampaignStateDiagnosticSummary['profile'],
): CampaignStateDiagnosticSummary => ({
  profile,
  revision: '—',
  periodIndex: '—',
  energy: '—',
  evidence: '—',
  paperConfidence: '—',
  integrity: '—',
  validation: 'Unavailable',
});

const createSummary = (
  pressureProfile: 'standard' | 'supported',
  createState: CreateCampaignState,
  validateState: ValidateCampaignState,
): CampaignStateDiagnosticSummary => {
  const profile = pressureProfile === 'standard' ? 'Standard' : 'Supported';
  const created = createState(diagnosticInput(pressureProfile));
  if (created.kind === 'failure') return unavailableSummary(profile);
  const validated = validateState(created.value);
  if (validated.kind === 'failure') return unavailableSummary(profile);
  return {
    profile,
    revision: validated.value.metadata.stateRevision,
    periodIndex: validated.value.calendar.periodIndex,
    energy: validated.value.campaignValues.energy,
    evidence: validated.value.campaignValues.evidence,
    paperConfidence: validated.value.campaignValues.elenaPaperConfidence,
    integrity: validated.value.campaignValues.integrity,
    validation: 'Passed',
  };
};

export const buildCampaignStateDiagnosticSummaries = (
  createState: CreateCampaignState = createInitialCampaignState,
  validateState: ValidateCampaignState = validateCampaignState,
): readonly CampaignStateDiagnosticSummary[] =>
  Object.freeze([
    Object.freeze(createSummary('standard', createState, validateState)),
    Object.freeze(createSummary('supported', createState, validateState)),
  ]);

export const isCampaignStateDiagnosticLocation = (search: string): boolean =>
  search === '?diagnostic=campaign-state';

const field = (name: string, value: number | string): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  const term = document.createElement('dt');
  term.textContent = name;
  const description = document.createElement('dd');
  description.textContent = String(value);
  fragment.append(term, description);
  return fragment;
};

export const renderCampaignStateDiagnostic = (root: HTMLElement): void => {
  const panel = document.createElement('main');
  panel.className = 'campaign-diagnostic';
  const heading = document.createElement('h1');
  heading.textContent = 'Campaign state diagnostic';
  const comparison = document.createElement('div');
  comparison.className = 'campaign-diagnostic-comparison';

  for (const summary of buildCampaignStateDiagnosticSummaries()) {
    const article = document.createElement('article');
    article.className = 'campaign-diagnostic-card';
    const title = document.createElement('h2');
    title.textContent = summary.profile;
    const facts = document.createElement('dl');
    facts.append(
      field('Profile', summary.profile),
      field('Revision', summary.revision),
      field('Period index', summary.periodIndex),
      field('Energy', summary.energy),
      field('Evidence', summary.evidence),
      field('Paper confidence', summary.paperConfidence),
      field('Integrity', summary.integrity),
      field('Validation', summary.validation),
    );
    article.append(title, facts);
    comparison.append(article);
  }

  panel.append(heading, comparison);
  root.replaceChildren(panel);
};
