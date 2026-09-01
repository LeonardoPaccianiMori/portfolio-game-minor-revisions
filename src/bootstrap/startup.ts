import {
  cancelCompatibilityCheck,
  checkCompatibility,
  type CompatibilityCheckResult,
} from '../platform/compatibility';
import { createUnexpectedDiagnostic, type SanitizedDiagnostic } from './diagnostics';
import { StartupScreen } from './startup-screen';

type StartupDependencies = Readonly<{
  checkCompatibility: () => Promise<CompatibilityCheckResult>;
  cancelCompatibilityCheck: () => Promise<void>;
  showChecking: () => void;
  showReady: (report: Extract<CompatibilityCheckResult, { kind: 'complete' }>['report']) => void;
  showBlocked: (
    report: Extract<CompatibilityCheckResult, { kind: 'complete' }>['report'],
    retry: () => void,
  ) => void;
  showFatal: (diagnostic: SanitizedDiagnostic) => void;
  createUnexpectedDiagnostic: (fault: unknown) => SanitizedDiagnostic;
  addErrorListener: (listener: (fault: unknown) => void) => () => void;
}>;

export type StartupHandle = Readonly<{
  stop: () => Promise<void>;
}>;

class StartupCoordinator {
  private fatal = false;
  private stopped = false;
  private removeFatalListeners: (() => void) | undefined;

  public constructor(private readonly dependencies: StartupDependencies) {}

  public start(): StartupHandle {
    this.removeFatalListeners = this.dependencies.addErrorListener((fault) => this.fail(fault));
    this.dependencies.showChecking();
    void this.runCheck().catch((fault: unknown) => this.fail(fault));
    return Object.freeze({ stop: async () => await this.stop() });
  }

  private async runCheck(): Promise<void> {
    const result = await this.dependencies.checkCompatibility();
    if (this.stopped || this.fatal || result.kind === 'cancelled') {
      return;
    }
    if (result.kind === 'alreadyRunning') {
      throw new Error('Compatibility operation was already active.');
    }
    if (result.report.overall === 'blocked') {
      this.dependencies.showBlocked(result.report, () => {
        if (this.stopped || this.fatal) {
          return;
        }
        this.dependencies.showChecking();
        void this.runCheck().catch((fault: unknown) => this.fail(fault));
      });
      return;
    }
    this.dependencies.showReady(result.report);
  }

  private fail(fault: unknown): void {
    if (this.stopped || this.fatal) {
      return;
    }
    this.fatal = true;
    const diagnostic = this.dependencies.createUnexpectedDiagnostic(fault);
    this.dependencies.showFatal(diagnostic);
  }

  private async stop(): Promise<void> {
    if (this.stopped) {
      return;
    }
    this.stopped = true;
    this.removeFatalListeners?.();
    this.removeFatalListeners = undefined;
    await this.dependencies.cancelCompatibilityCheck();
  }
}

const browserErrorBoundary = (listener: (fault: unknown) => void): (() => void) => {
  const onError = (event: ErrorEvent): void => listener(event.error);
  const onUnhandledRejection = (event: PromiseRejectionEvent): void => listener(event.reason);
  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onUnhandledRejection);
  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onUnhandledRejection);
  };
};

export const bootstrapStartup = (root: HTMLElement): StartupHandle => {
  const screen = new StartupScreen(root, {
    copyText: async (value) => {
      if (navigator.clipboard === undefined) {
        throw new Error('Clipboard is unavailable.');
      }
      await navigator.clipboard.writeText(value);
    },
    reloadPage: () => window.location.reload(),
  });
  const coordinator = new StartupCoordinator({
    checkCompatibility,
    cancelCompatibilityCheck,
    showChecking: () => screen.showChecking(),
    showReady: (report) => screen.showReady(report),
    showBlocked: (report, retry) => screen.showBlocked(report, retry),
    showFatal: (diagnostic) => screen.showFatal(diagnostic),
    createUnexpectedDiagnostic: (fault) => createUnexpectedDiagnostic('BOOTSTRAP', fault),
    addErrorListener: browserErrorBoundary,
  });
  return coordinator.start();
};

export const createStartupCoordinatorForTests = (dependencies: StartupDependencies) => {
  const coordinator = new StartupCoordinator(dependencies);
  return Object.freeze({ start: (): StartupHandle => coordinator.start() });
};
