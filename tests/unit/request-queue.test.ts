import { describe, expect, it } from 'vitest';

import { createRequestQueue } from '../../src/application/index.ts';

describe('request queue', () => {
  it('runs tasks in order', async () => {
    const order: number[] = [];
    const queue = createRequestQueue(() => undefined);

    const first = queue.enqueue(async () => {
      await Promise.resolve();
      order.push(1);
    });
    const second = queue.enqueue(() => {
      order.push(2);
    });
    const third = queue.enqueue(() => {
      order.push(3);
    });

    await Promise.all([first, second, third]);
    await queue.whenIdle();

    expect(order).toEqual([1, 2, 3]);
  });

  it('routes task failures to the error handler and keeps the queue alive', async () => {
    const errors: unknown[] = [];
    const order: string[] = [];
    const queue = createRequestQueue((error) => {
      errors.push(error);
    });

    await queue.enqueue(() => {
      throw new Error('boom');
    });
    await queue.enqueue(() => {
      order.push('after');
    });

    expect(errors).toHaveLength(1);
    expect(order).toEqual(['after']);
  });
});
