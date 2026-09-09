import { describe, expect, it, vi } from 'vitest';

import {
  createApplicationBootstrapForTests,
  validateStartupContent,
} from '../../../src/bootstrap/application-bootstrap';
import { builtContentFixture } from '../MR-WP-01/campaign-test-data';
import { createApplicationFakes } from './application-fakes';

describe('Step 5 content bootstrap', () => {
  it('accepts a checked copy of the exact slice package', () => {
    const source = builtContentFixture();
    const result = validateStartupContent(source);
    expect(result?.metadata.profileId).toBe('slice');
    expect(result).not.toBe(source);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('rejects an invalid embedded package safely', () => {
    const source = structuredClone(builtContentFixture()) as unknown as {
      metadata: { contentVersion: string };
    };
    source.metadata.contentVersion = '9.9.9';
    const fake = createApplicationFakes();
    const createDependencies = vi.fn(() => fake.dependencies);
    const createController = vi.fn();
    const showContentFailure = vi.fn();
    const bootstrap = createApplicationBootstrapForTests({
      createDependencies,
      createController,
    });

    const handle = bootstrap.bootstrap(
      {} as HTMLElement,
      {
        kind: 'valid',
        value: source as unknown as ReturnType<typeof builtContentFixture>,
      },
      showContentFailure,
    );

    expect(showContentFailure).toHaveBeenCalledWith(
      expect.anything(),
      'Game content could not be verified. No saved campaign data was changed.',
    );
    expect(createDependencies).not.toHaveBeenCalled();
    expect(createController).not.toHaveBeenCalled();
    expect(fake.calls).toEqual([]);
    expect(handle.getStatus()).toEqual({
      lifecycle: 'failed',
      acceptsRequests: false,
      frameLoopActive: false,
    });
  });
});
