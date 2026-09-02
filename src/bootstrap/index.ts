export {
  bootstrapApplication,
  createApplicationBootstrapForTests,
  startTemporaryApplication,
} from './application-bootstrap';
export type { BootstrapHandle } from './application-bootstrap';
export {
  bootstrapStartup,
  createStartupCoordinatorForTests,
  installBrowserErrorBoundaryForTests,
} from './startup';
export type { StartupHandle } from './startup';
export { createStartupScreenForTests } from './startup-screen';
export type { SanitizedDiagnostic } from './diagnostics';
