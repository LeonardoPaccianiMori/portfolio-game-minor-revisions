import type { CompatibilityReport } from '../platform';
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

type StartupDocument = Readonly<Pick<Document, 'createElement'>>;

export const CONTENT_INVALID_MESSAGE =
  'Game content could not be verified. No saved campaign data was changed.';

const element = <K extends keyof HTMLElementTagNameMap>(
  startupDocument: StartupDocument,
  tag: K,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const node = startupDocument.createElement(tag);
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
};

export class StartupScreen {
  public constructor(
    private readonly root: HTMLElement,
    private readonly adapters: StartupScreenAdapters,
    private readonly startupDocument: StartupDocument = document,
  ) {}

  public showChecking(): void {
    const title = element(this.startupDocument, 'h1', 'Minor Revisions');
    const stage = element(this.startupDocument, 'p', 'Checking browser');
    stage.className = 'startup-stage';
    stage.setAttribute('role', 'status');
    stage.setAttribute('aria-live', 'polite');
    this.replace(title, stage);
  }

  public showReady(report: CompatibilityReport): void {
    const title = element(this.startupDocument, 'h1', 'Minor Revisions');
    const stage = element(this.startupDocument, 'p', 'Ready');
    stage.className = 'startup-stage';
    stage.setAttribute('role', 'status');
    const passed = element(this.startupDocument, 'p', 'Startup checks passed.');
    const limitation = element(this.startupDocument, 'p', 'Game systems are not yet available.');
    const nodes: HTMLElement[] = [title, stage, passed, limitation];
    if (report.overall === 'degraded') {
      nodes.push(
        element(
          this.startupDocument,
          'p',
          'Controller input is unavailable. Use keyboard and mouse.',
        ),
      );
    }
    this.replace(...nodes);
  }

  public showContentInvalid(): void {
    const title = element(this.startupDocument, 'h1', 'Minor Revisions');
    const stage = element(this.startupDocument, 'p', 'Content check blocked');
    stage.className = 'startup-stage';
    stage.setAttribute('role', 'alert');
    const message = element(this.startupDocument, 'p', CONTENT_INVALID_MESSAGE);
    this.replace(title, stage, message);
  }

  public showBlocked(report: CompatibilityReport, retry: () => void): void {
    const title = element(this.startupDocument, 'h1', 'Minor Revisions');
    const heading = element(this.startupDocument, 'h2', 'Browser check blocked');
    const list = element(this.startupDocument, 'ul');
    for (const capability of report.capabilities) {
      if (capability.required && capability.status !== 'ready') {
        const reason = blockingText[capability.id];
        if (reason !== undefined) {
          list.append(element(this.startupDocument, 'li', reason));
        }
      }
    }
    const unchanged = element(this.startupDocument, 'p', 'Campaign data did not change.');
    const guidance = element(
      this.startupDocument,
      'p',
      'Use a current desktop browser with the required features enabled, then retry the local check.',
    );
    const retryButton = element(this.startupDocument, 'button', 'Retry Check');
    retryButton.type = 'button';
    retryButton.addEventListener('click', retry, { once: true });
    this.replace(title, heading, list, unchanged, guidance, retryButton);
    retryButton.focus();
  }

  public showFatal(diagnostic: SanitizedDiagnostic): void {
    const heading = element(
      this.startupDocument,
      'h1',
      'Minor Revisions must stop because it cannot continue safely.',
    );
    const explanation = element(
      this.startupDocument,
      'p',
      'An unexpected startup problem stopped this local page before game systems became available.',
    );
    const code = element(this.startupDocument, 'p');
    code.append('Issue code: ', element(this.startupDocument, 'code', diagnostic.record.code));
    const actionRow = element(this.startupDocument, 'div');
    actionRow.className = 'startup-actions';
    const copyButton = element(this.startupDocument, 'button', 'Copy Diagnostic');
    copyButton.type = 'button';
    copyButton.addEventListener('click', () => {
      void this.adapters.copyText(diagnostic.copyForm).catch(() => undefined);
    });
    const reloadButton = element(this.startupDocument, 'button', 'Reload Page');
    reloadButton.type = 'button';
    reloadButton.addEventListener('click', this.adapters.reloadPage);
    actionRow.append(copyButton, reloadButton);
    this.replace(heading, explanation, code, actionRow);
    copyButton.focus();
  }

  private replace(...nodes: HTMLElement[]): void {
    const panel = element(this.startupDocument, 'section');
    panel.className = 'startup-panel';
    panel.append(...nodes);
    this.root.replaceChildren(panel);
  }
}

export const createStartupScreenForTests = (
  root: HTMLElement,
  adapters: StartupScreenAdapters,
  startupDocument: StartupDocument,
): StartupScreen => new StartupScreen(root, adapters, startupDocument);
