import { bootstrapApplication } from './index';

const root = document.querySelector('#app');

if (root instanceof HTMLElement) {
  bootstrapApplication(root);
}
