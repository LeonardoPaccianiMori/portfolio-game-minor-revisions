import { describe, expect, it } from 'vitest';

import { detectCompatibility } from '../../src/platform/index.ts';

const canvasWith = (context: unknown): HTMLCanvasElement =>
  ({ getContext: () => context }) as unknown as HTMLCanvasElement;

describe('compatibility detection', () => {
  it('reports support when WebGL2 is available', () => {
    const result = detectCompatibility({ createCanvas: () => canvasWith({}) });

    expect(result).toEqual({ supported: true, webgl2: true, reason: null });
  });

  it('reports a safe reason when WebGL2 is missing', () => {
    const result = detectCompatibility({ createCanvas: () => canvasWith(null) });

    expect(result.supported).toBe(false);
    expect(result.webgl2).toBe(false);
    expect(result.reason).toContain('WebGL2');
  });

  it('reports a safe reason when the probe throws', () => {
    const result = detectCompatibility({
      createCanvas: () => {
        throw new Error('raw detail');
      },
    });

    expect(result.supported).toBe(false);
    expect(result.reason).not.toContain('raw detail');
  });
});
