export interface CompatibilityProbe {
  createCanvas(): HTMLCanvasElement;
}

export interface CompatibilityResult {
  readonly supported: boolean;
  readonly webgl2: boolean;
  readonly reason: string | null;
}

const defaultProbe: CompatibilityProbe = {
  createCanvas: () => document.createElement('canvas'),
};

export const detectCompatibility = (
  probe: CompatibilityProbe = defaultProbe,
): CompatibilityResult => {
  try {
    const canvas = probe.createCanvas();
    const context = canvas.getContext('webgl2');

    if (context === null) {
      return {
        supported: false,
        webgl2: false,
        reason: 'This browser does not provide WebGL2, which the game requires.',
      };
    }

    return { supported: true, webgl2: true, reason: null };
  } catch {
    return {
      supported: false,
      webgl2: false,
      reason: 'The graphics compatibility check could not run in this browser.',
    };
  }
};
