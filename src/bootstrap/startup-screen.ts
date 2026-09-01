import type { CompatibilityReport } from '../platform/compatibility';
import type { SanitizedDiagnostic } from './diagnostics';

const blockingText: Readonly<Record<string, string>> = Object.freeze({
  webgl2: '3D graphics are not available.',
  indexedDb: 'Local saved data is not available.',
  esModules: 'This browser cannot run this version of Minor Revisions.',
  webAudio: 'Required browser audio is not available.',
  pointerLock: 'The browser cannot provide the mouse control required for movement.',
});

type StartupScreenAdapters = Readonly<{
  copyText: (value: string) => Promise<void>;
  reloadPage: () => void;
}>;

const element = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
};

export class StartupScreen {
  public constructor(
    private readonly root: HTMLElement,
    private readonly adapters: StartupScreenAdapters,
  ) {}

  public showChecking(): void {
    const title = element('h1', 'Minor Revisions');
    const stage = element('p', 'Checking browser');
    stage.className = 'startup-stage';
    stage.setAttribute('role', 'status');
    stage.setAttribute('aria-live', 'polite');
    this.replace(title, stage);
  }

  public showReady(report: CompatibilityReport): void {
    const title = element('h1', 'Minor Revisions');
    const stage = element('p', 'Ready');
    stage.className = 'startup-stage';
    stage.setAttribute('role', 'status');
    const passed = element('p', 'Startup checks passed.');
    const limitation = element('p', 'Game systems are not yet available.');
    const nodes: HTMLElement[] = [title, stage, passed, limitation];
    if (report.overall === 'degraded') {
      nodes.push(element('p', 'Controller input is unavailable. Use keyboard and mouse.'));
    }
    this.replace(...nodes);
  }

  public showBlocked(report: CompatibilityReport, retry: () => void): void {
    const title = element('h1', 'Minor Revisions');
    const heading = element('h2', 'Browser check blocked');
    const list = element('ul');
    for (const capability of report.capabilities) {
      if (capability.required && capability.status !== 'ready') {
        const reason = blockingText[capability.id];
        if (reason !== undefined) {
          list.append(element('li', reason));
        }
      }
    }
    const unchanged = element('p', 'Campaign data did not change.');
    const guidance = element(
      'p',
      'Use a current desktop browser with the required features enabled, then retry the local check.',
    );
    const retryButton = element('button', 'Retry Check');
    retryButton.type = 'button';
    retryButton.addEventListener('click', retry, { once: true });
    this.replace(title, heading, list, unchanged, guidance, retryButton);
    retryButton.focus();
  }

  public showFatal(diagnostic: SanitizedDiagnostic): void {
    const heading = element('h1', 'Minor Revisions must stop because it cannot continue safely.');
    const explanation = element(
      'p',
      'An unexpected startup problem stopped this local page before game systems became available.',
    );
    const code = element('p');
    code.append('Issue code: ', element('code', diagnostic.record.code));
    const actionRow = element('div');
    actionRow.className = 'startup-actions';
    const copyButton = element('button', 'Copy Diagnostic');
    copyButton.type = 'button';
    copyButton.addEventListener('click', () => {
      void this.adapters.copyText(diagnostic.copyForm).catch(() => undefined);
    });
    const reloadButton = element('button', 'Reload Page');
    reloadButton.type = 'button';
    reloadButton.addEventListener('click', this.adapters.reloadPage);
    actionRow.append(copyButton, reloadButton);
    this.replace(heading, explanation, code, actionRow);
    copyButton.focus();
  }

  private replace(...nodes: HTMLElement[]): void {
    const panel = element('section');
    panel.className = 'startup-panel';
    panel.append(...nodes);
    this.root.replaceChildren(panel);
  }
}
