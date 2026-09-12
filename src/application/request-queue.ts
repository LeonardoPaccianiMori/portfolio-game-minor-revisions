export type QueueTask = () => Promise<void> | void;

export interface RequestQueue {
  enqueue(task: QueueTask): Promise<void>;
  whenIdle(): Promise<void>;
}

export const createRequestQueue = (onError: (error: unknown) => void): RequestQueue => {
  let tail: Promise<void> = Promise.resolve();

  const enqueue = (task: QueueTask): Promise<void> => {
    const next = tail.then(async () => {
      try {
        await task();
      } catch (error) {
        try {
          onError(error);
        } catch {
          // The error handler must never break the queue.
        }
      }
    });

    tail = next;
    return next;
  };

  return {
    enqueue,
    whenIdle: () => tail,
  };
};
