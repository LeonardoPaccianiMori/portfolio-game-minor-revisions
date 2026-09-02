export type ApplicationLifecycle = 'new' | 'starting' | 'ready' | 'stopping' | 'stopped' | 'failed';

export type ApplicationFault = Readonly<{
  code: 'MR-APPLICATION-UNEXPECTED';
  operation: 'start' | 'request' | 'frame' | 'stop';
  severity: 'fatal';
}>;

export type ApplicationOperationResult =
  | Readonly<{ kind: 'success' }>
  | Readonly<{ kind: 'unavailable'; reason: 'notReady' | 'notRestartable' }>
  | Readonly<{ kind: 'failure'; fault: ApplicationFault }>;

export type ApplicationRequest = Readonly<{
  kind: 'settingsOrLocalData';
  action: 'clearSavedData';
}>;

export type FrameUpdate = Readonly<{ deltaSeconds: number }>;
export type ApplicationStatus = Readonly<{
  lifecycle: ApplicationLifecycle;
  acceptsRequests: boolean;
  frameLoopActive: boolean;
}>;

type StartStopPort = Readonly<{
  start: () => void | Promise<void>;
  stop: () => void | Promise<void>;
}>;

export type PlatformPort = Readonly<{
  startVisibilityWatch: (handler: (visible: boolean) => void) => void | Promise<void>;
  stopVisibilityWatch: () => void | Promise<void>;
}>;
export type TimingPort = Readonly<{
  startFrameLoop: (handler: (frame: FrameUpdate) => void) => void;
  pauseFrameLoop: () => void;
  resumeFrameLoop: () => void;
  stopFrameLoop: () => void;
}>;
export type DiagnosticsPort = Readonly<{
  createDiagnostic: (fault: ApplicationFault) => unknown;
}>;
export type PersistencePort = StartStopPort & Readonly<{ clearSavedData: () => Promise<void> }>;
export type InputControlPort = StartStopPort &
  Readonly<{ readFrameInput: () => Readonly<Record<string, never>> }>;
export type UiPort = StartStopPort & Readonly<{ updateFrame: (frame: FrameUpdate) => void }>;
export type PlayerPort = StartStopPort &
  Readonly<{
    updateFrame: (
      frameInput: Readonly<Record<string, never>>,
      movementContext: Readonly<Record<string, never>>,
    ) => Readonly<Record<string, never>>;
  }>;
export type WorldPort = StartStopPort &
  Readonly<{
    getMovementContext: () => Readonly<Record<string, never>>;
    updateFrame: (frame: FrameUpdate) => void;
    getInteractionContext: () => Readonly<Record<string, never>>;
  }>;
export type InteractionPort = StartStopPort &
  Readonly<{
    updateFrame: (
      playerData: Readonly<Record<string, never>>,
      interactionContext: Readonly<Record<string, never>>,
    ) => void;
  }>;
export type RenderingPort = StartStopPort & Readonly<{ render: (frame: FrameUpdate) => void }>;
export type AudioPort = StartStopPort & Readonly<{ updateFrame: (frame: FrameUpdate) => void }>;
export type CutscenePort = StartStopPort & Readonly<{ updateFrame: (frame: FrameUpdate) => void }>;

export type ApplicationDependencies = Readonly<{
  platform: PlatformPort;
  timing: TimingPort;
  diagnostics: DiagnosticsPort;
  persistence: PersistencePort;
  input: InputControlPort;
  ui: UiPort;
  player: PlayerPort;
  world: WorldPort;
  interaction: InteractionPort;
  rendering: RenderingPort;
  audio: AudioPort;
  cutscenes: CutscenePort;
}>;
export type ValidatedContent = Readonly<{ kind: 'temporaryNoContent' }>;
export type ApplicationController = Readonly<{
  start: () => Promise<ApplicationOperationResult>;
  stop: () => Promise<ApplicationOperationResult>;
  submit: (request: ApplicationRequest) => Promise<ApplicationOperationResult>;
  updateFrame: (frame: FrameUpdate) => ApplicationOperationResult;
  getStatus: () => ApplicationStatus;
}>;

type OwnerName =
  | 'platform'
  | 'persistence'
  | 'interaction'
  | 'player'
  | 'world'
  | 'rendering'
  | 'ui'
  | 'audio'
  | 'cutscenes'
  | 'timing'
  | 'input';

const success = Object.freeze({ kind: 'success' } as const);
const fault = (operation: ApplicationFault['operation']): ApplicationFault =>
  Object.freeze({ code: 'MR-APPLICATION-UNEXPECTED', operation, severity: 'fatal' });

class Controller implements ApplicationController {
  private lifecycle: ApplicationLifecycle = 'new';
  private acceptsRequests = false;
  private frameLoopActive = false;
  private readonly started = new Set<OwnerName>();
  private requestTail: Promise<void> = Promise.resolve();
  private startPromise: Promise<ApplicationOperationResult> | undefined;
  private cleanupPromise: Promise<ApplicationOperationResult> | undefined;
  private stopRequested = false;

  public constructor(
    private readonly dependencies: ApplicationDependencies,
    private readonly validatedContent: ValidatedContent,
  ) {}

  public start(): Promise<ApplicationOperationResult> {
    if (this.lifecycle === 'ready') return Promise.resolve(success);
    if (this.lifecycle === 'starting' && this.startPromise !== undefined) return this.startPromise;
    if (this.lifecycle !== 'new') {
      return Promise.resolve(Object.freeze({ kind: 'unavailable', reason: 'notRestartable' }));
    }
    this.lifecycle = 'starting';
    this.startPromise = this.startOwnedServices();
    return this.startPromise;
  }

  public async stop(): Promise<ApplicationOperationResult> {
    if (this.lifecycle === 'stopped') return success;
    if (this.lifecycle === 'failed') return (await this.cleanupPromise) ?? success;
    if (this.lifecycle === 'new') {
      this.lifecycle = 'stopped';
      return success;
    }
    if (this.cleanupPromise !== undefined) return await this.cleanupPromise;
    this.stopRequested = true;
    this.acceptsRequests = false;
    this.lifecycle = 'stopping';
    this.cleanupPromise = this.stopAfterStartup();
    return await this.cleanupPromise;
  }

  public submit(request: ApplicationRequest): Promise<ApplicationOperationResult> {
    if (!this.acceptsRequests || this.lifecycle !== 'ready') {
      return Promise.resolve(Object.freeze({ kind: 'unavailable', reason: 'notReady' }));
    }
    let complete: (result: ApplicationOperationResult) => void = () => undefined;
    const result = new Promise<ApplicationOperationResult>((resolve) => {
      complete = resolve;
    });
    this.requestTail = this.requestTail.then(async () => {
      if (!this.acceptsRequests || this.lifecycle !== 'ready') {
        complete(Object.freeze({ kind: 'unavailable', reason: 'notReady' }));
        return;
      }
      try {
        await this.processRequest(request);
        complete(success);
      } catch {
        const applicationFault = fault('request');
        complete(Object.freeze({ kind: 'failure', fault: applicationFault }));
        this.beginFatalCleanup(applicationFault);
      }
    });
    return result;
  }

  public updateFrame(frame: FrameUpdate): ApplicationOperationResult {
    if (this.lifecycle !== 'ready' || !this.frameLoopActive) {
      return Object.freeze({ kind: 'unavailable', reason: 'notReady' });
    }
    try {
      const frameInput = this.dependencies.input.readFrameInput();
      this.dependencies.cutscenes.updateFrame(frame);
      const playerData = this.dependencies.player.updateFrame(
        frameInput,
        this.dependencies.world.getMovementContext(),
      );
      this.dependencies.world.updateFrame(frame);
      this.dependencies.interaction.updateFrame(
        playerData,
        this.dependencies.world.getInteractionContext(),
      );
      this.dependencies.audio.updateFrame(frame);
      this.dependencies.ui.updateFrame(frame);
      this.dependencies.rendering.render(frame);
      return success;
    } catch {
      const applicationFault = fault('frame');
      this.beginFatalCleanup(applicationFault);
      return Object.freeze({ kind: 'failure', fault: applicationFault });
    }
  }

  public getStatus(): ApplicationStatus {
    return Object.freeze({
      lifecycle: this.lifecycle,
      acceptsRequests: this.acceptsRequests,
      frameLoopActive: this.frameLoopActive,
    });
  }

  private async startOwnedServices(): Promise<ApplicationOperationResult> {
    void this.validatedContent;
    try {
      await this.startOwner('platform', () =>
        this.dependencies.platform.startVisibilityWatch((visible) => {
          if (!this.frameLoopActive) return;
          try {
            if (visible) this.dependencies.timing.resumeFrameLoop();
            else this.dependencies.timing.pauseFrameLoop();
          } catch {
            this.beginFatalCleanup(fault('frame'));
          }
        }),
      );
      await this.startOwner('persistence', () => this.dependencies.persistence.start());
      await this.startOwner('interaction', () => this.dependencies.interaction.start());
      await this.startOwner('player', () => this.dependencies.player.start());
      await this.startOwner('world', () => this.dependencies.world.start());
      await this.startOwner('rendering', () => this.dependencies.rendering.start());
      await this.startOwner('ui', () => this.dependencies.ui.start());
      await this.startOwner('audio', () => this.dependencies.audio.start());
      await this.startOwner('cutscenes', () => this.dependencies.cutscenes.start());
      this.dependencies.timing.startFrameLoop((frame) => {
        this.updateFrame(frame);
      });
      this.started.add('timing');
      this.frameLoopActive = true;
      await this.startOwner('input', () => this.dependencies.input.start());
      if (this.stopRequested) {
        return Object.freeze({ kind: 'unavailable', reason: 'notReady' });
      }
      this.lifecycle = 'ready';
      this.acceptsRequests = true;
      return success;
    } catch {
      const applicationFault = fault('start');
      this.lifecycle = 'failed';
      this.acceptsRequests = false;
      this.cleanupPromise = this.cleanupStarted('failed', applicationFault);
      await this.cleanupPromise;
      return Object.freeze({ kind: 'failure', fault: applicationFault });
    }
  }

  private async startOwner(name: OwnerName, start: () => void | Promise<void>): Promise<void> {
    await start();
    this.started.add(name);
  }

  private async stopAfterStartup(): Promise<ApplicationOperationResult> {
    await this.startPromise;
    return await this.cleanupStarted('stopped');
  }

  private beginFatalCleanup(applicationFault: ApplicationFault): void {
    if (this.lifecycle === 'failed' || this.lifecycle === 'stopped') return;
    this.lifecycle = 'failed';
    this.acceptsRequests = false;
    this.cleanupPromise ??= this.cleanupStarted('failed', applicationFault);
  }

  private async cleanupStarted(
    terminal: 'stopped' | 'failed',
    originalFault?: ApplicationFault,
  ): Promise<ApplicationOperationResult> {
    let cleanupFailed = false;
    const stop = async (name: OwnerName, operation: () => void | Promise<void>): Promise<void> => {
      if (!this.started.delete(name)) return;
      try {
        await operation();
      } catch {
        cleanupFailed = true;
      }
    };
    await stop('input', () => this.dependencies.input.stop());
    await stop('timing', () => this.dependencies.timing.stopFrameLoop());
    this.frameLoopActive = false;
    if (terminal === 'stopped') await this.requestTail;
    await stop('cutscenes', () => this.dependencies.cutscenes.stop());
    await stop('audio', () => this.dependencies.audio.stop());
    await stop('ui', () => this.dependencies.ui.stop());
    await stop('rendering', () => this.dependencies.rendering.stop());
    await stop('world', () => this.dependencies.world.stop());
    await stop('player', () => this.dependencies.player.stop());
    await stop('interaction', () => this.dependencies.interaction.stop());
    await stop('persistence', () => this.dependencies.persistence.stop());
    await stop('platform', () => this.dependencies.platform.stopVisibilityWatch());
    this.lifecycle = cleanupFailed ? 'failed' : terminal;
    if (cleanupFailed || originalFault !== undefined) {
      return Object.freeze({ kind: 'failure', fault: originalFault ?? fault('stop') });
    }
    return success;
  }

  private async processRequest(request: ApplicationRequest): Promise<void> {
    switch (request.action) {
      case 'clearSavedData':
        await this.dependencies.persistence.clearSavedData();
        return;
    }
  }
}

export const createApplication = (
  dependencies: ApplicationDependencies,
  validatedContent: ValidatedContent,
): ApplicationController => new Controller(dependencies, validatedContent);
