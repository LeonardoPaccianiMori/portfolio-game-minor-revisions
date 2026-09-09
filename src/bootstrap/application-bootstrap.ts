import {
  createApplication,
  type ApplicationController,
  type ApplicationDependencies,
  type ApplicationFault,
  type ValidatedContent as ApplicationContent,
} from '../application';
import {
  validateContentPackage,
  type BuiltContentPackage,
  type ValidatedContent,
} from '../content';
import { createTimingPort } from '../platform';
import { bootstrapStartup, type StartupHandle } from './startup';
import { CONTENT_INVALID_MESSAGE, StartupScreen } from './startup-screen';
import { createTemporaryApplicationDependencies } from './temporary-adapters';

export type BootstrapHandle = StartupHandle;

type ApplicationFactories = Readonly<{
  createDependencies: () => ApplicationDependencies;
  createController: (
    dependencies: ApplicationDependencies,
    content: ApplicationContent,
  ) => ApplicationController;
}>;

class ApplicationStartupError extends Error {
  public constructor(public readonly fault: ApplicationFault) {
    super('The application could not start safely.');
    this.name = 'ApplicationStartupError';
  }
}

const startApplication = async (
  factories: ApplicationFactories,
): Promise<ApplicationController> => {
  const dependencies = factories.createDependencies();
  const controller = factories.createController(dependencies, { kind: 'temporaryNoContent' });
  const result = await controller.start();
  if (result.kind !== 'success') {
    throw result.kind === 'failure'
      ? new ApplicationStartupError(result.fault)
      : new Error('Application did not start.');
  }
  return controller;
};

const productionFactories: ApplicationFactories = Object.freeze({
  createDependencies: () => createTemporaryApplicationDependencies(createTimingPort()),
  createController: createApplication,
});

export const validateStartupContent = (raw: BuiltContentPackage): ValidatedContent | null => {
  const result = validateContentPackage(raw);
  return result.kind === 'valid' ? result.value : null;
};

export const startTemporaryApplication = async (): Promise<ApplicationController> =>
  await startApplication(productionFactories);

const contentFailureHandle = (): BootstrapHandle =>
  Object.freeze({
    stop: () => Promise.resolve(),
    getStatus: () =>
      Object.freeze({
        lifecycle: 'failed' as const,
        acceptsRequests: false,
        frameLoopActive: false,
      }),
  });

export type StartupContentSource =
  { readonly kind: 'valid'; readonly value: BuiltContentPackage } | { readonly kind: 'invalid' };

type ContentFailurePresenter = (root: HTMLElement, message: string) => void;

const bootstrapWithContent = (
  root: HTMLElement,
  contentSource: StartupContentSource,
  factories: ApplicationFactories,
  showContentFailure: ContentFailurePresenter,
): BootstrapHandle => {
  const validated =
    contentSource.kind === 'valid' ? validateStartupContent(contentSource.value) : null;
  if (validated === null) {
    showContentFailure(root, CONTENT_INVALID_MESSAGE);
    return contentFailureHandle();
  }
  return bootstrapStartup(root, async () => await startApplication(factories));
};

export const bootstrapApplication = (
  root: HTMLElement,
  contentSource: StartupContentSource,
): BootstrapHandle =>
  bootstrapWithContent(root, contentSource, productionFactories, (target) => {
    new StartupScreen(target, {
      copyText: () => Promise.resolve(),
      reloadPage: () => window.location.reload(),
    }).showContentInvalid();
  });

export const createApplicationBootstrapForTests = (factories: ApplicationFactories) =>
  Object.freeze({
    start: async (): Promise<ApplicationController> => await startApplication(factories),
    bootstrap: (
      root: HTMLElement,
      contentSource: StartupContentSource,
      showContentFailure: ContentFailurePresenter,
    ): BootstrapHandle => bootstrapWithContent(root, contentSource, factories, showContentFailure),
  });
