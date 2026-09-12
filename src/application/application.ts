export interface ApplicationFault {
  readonly code: string;
  readonly message: string;
}

export interface ApplicationStage {
  readonly name: string;
  readonly run: () => ApplicationFault | null | Promise<ApplicationFault | null>;
}

export interface StartupOutcome {
  readonly status: 'ready' | 'failed';
  readonly fault: ApplicationFault | null;
}

export interface FrameLoopLike {
  start(): void;
  stop(): void;
}

export interface ApplicationOptions {
  readonly startup: readonly ApplicationStage[];
  readonly shutdown: readonly ApplicationStage[];
  readonly frameLoop: FrameLoopLike;
}

export interface Application {
  start(): Promise<StartupOutcome>;
  stop(): Promise<void>;
  isRunning(): boolean;
}

export const createApplication = (options: ApplicationOptions): Application => {
  let running = false;
  let startPromise: Promise<StartupOutcome> | null = null;

  const runShutdown = async (): Promise<void> => {
    for (const stage of [...options.shutdown].reverse()) {
      try {
        await stage.run();
      } catch {
        // Shutdown is best-effort; one failing cleanup never blocks the others.
      }
    }
  };

  const start = (): Promise<StartupOutcome> => {
    if (startPromise !== null) {
      return startPromise;
    }

    startPromise = (async (): Promise<StartupOutcome> => {
      for (const stage of options.startup) {
        let fault: ApplicationFault | null;
        try {
          fault = await stage.run();
        } catch {
          fault = {
            code: `startup:${stage.name}`,
            message: 'The game could not start.',
          };
        }

        if (fault !== null) {
          await runShutdown();
          return { status: 'failed', fault };
        }
      }

      try {
        options.frameLoop.start();
      } catch {
        await runShutdown();
        return {
          status: 'failed',
          fault: {
            code: 'startup:frame-loop',
            message: 'The game could not start.',
          },
        };
      }

      running = true;
      return { status: 'ready', fault: null };
    })();

    return startPromise;
  };

  const stop = async (): Promise<void> => {
    if (!running) {
      return;
    }

    try {
      options.frameLoop.stop();
    } catch {
      // Shutdown is best-effort; a failing loop stop must not block cleanup.
    }

    await runShutdown();
    running = false;
  };

  return {
    start,
    stop,
    isRunning: () => running,
  };
};
