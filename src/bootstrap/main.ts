import {
  bootstrapApplication,
  isCampaignStateDiagnosticLocation,
  renderCampaignStateDiagnostic,
} from './index';

const root = document.querySelector('#app');

if (root instanceof HTMLElement) {
  if (isCampaignStateDiagnosticLocation(window.location.search)) {
    renderCampaignStateDiagnostic(root);
  } else {
    bootstrapApplication(root);
  }
}
