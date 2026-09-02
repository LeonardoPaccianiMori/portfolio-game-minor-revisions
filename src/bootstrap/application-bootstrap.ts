import {
  createApplication,
  type ApplicationController,
  type ApplicationDependencies,
  type ApplicationFault,
  type ValidatedContent,
} from '../application';
import { createTimingPort } from '../platform';
import { bootstrapStartup, type StartupHandle } from './startup';
import { createTemporaryApplicationDependencies } from './temporary-adapters';

export type BootstrapHandle = StartupHandle;

type ApplicationFactories = Readonly<{
  createDependencies: () => ApplicationDependencies;
  createController: (
    dependencies: ApplicationDependencies,
    content: ValidatedContent,
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

export const startTemporaryApplication = async (): Promise<ApplicationController> =>
  await startApplication(productionFactories);

export const bootstrapApplication = (root: HTMLElement): BootstrapHandle =>
  bootstrapStartup(root, startTemporaryApplication);

export const createApplicationBootstrapForTests = (factories: ApplicationFactories) =>
  Object.freeze({
    start: async (): Promise<ApplicationController> => await startApplication(factories),
  });
