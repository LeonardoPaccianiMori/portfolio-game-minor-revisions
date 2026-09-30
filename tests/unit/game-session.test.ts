import { describe, expect, it } from 'vitest';

import { DEVELOPMENT_SEED, createGameSession } from '../../src/application/index.ts';

describe('the game session', () => {
  it('starts from the development seed', () => {
    const session = createGameSession();

    expect(session.state().seed).toBe(DEVELOPMENT_SEED);
    expect(session.state().week).toBe(1);
    expect(session.message()).toBeNull();
  });

  it('applies successful commands and clears the message', () => {
    const session = createGameSession();
    const result = session.perform({ type: 'performAction', action: 'rest' });

    expect(result.ok).toBe(true);
    expect(session.state().actionsLeft).toBe(2);
    expect(session.state().history).toEqual(['action:rest']);
    expect(session.message()).toBeNull();
  });

  it('records rejection messages without changing the state', () => {
    const session = createGameSession();
    const before = JSON.stringify(session.state());
    const result = session.perform({ type: 'performAction', action: 'experiment' });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(session.message()).toBe(result.message);
    }

    expect(JSON.stringify(session.state())).toBe(before);
  });
});
