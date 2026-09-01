import { bootstrapStartup } from './startup';

const root = document.querySelector('#app');

if (root instanceof HTMLElement) {
  bootstrapStartup(root);
}
