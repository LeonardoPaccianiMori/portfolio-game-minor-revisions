import { createInitialState, dispatch } from '../rules/index.ts';
import type { CampaignState, Command, CommandResult } from '../rules/index.ts';

export const DEVELOPMENT_SEED = 1;

export interface GameSession {
  state(): CampaignState;
  perform(command: Command): CommandResult;
  message(): string | null;
}

export const createGameSession = (seed: number = DEVELOPMENT_SEED): GameSession => {
  let state = createInitialState(seed);
  let message: string | null = null;

  return {
    state() {
      return state;
    },
    perform(command) {
      const result = dispatch(state, command);

      if (result.ok) {
        state = result.state;
        message = null;
      } else {
        message = result.message;
      }

      return result;
    },
    message() {
      return message;
    },
  };
};
