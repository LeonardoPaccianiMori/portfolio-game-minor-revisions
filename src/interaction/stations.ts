import type { Command } from '../rules/index.ts';

export interface Station {
  readonly propId: string;
  readonly prompt: string;
  readonly command: Command | null;
}

export const STATIONS: readonly Station[] = [
  {
    propId: 'prop.lab.bench-north',
    prompt: 'Work an experiment step',
    command: { type: 'performAction', action: 'experiment' },
  },
  {
    propId: 'prop.grow.row-2',
    prompt: 'Work an experiment step',
    command: { type: 'performAction', action: 'experiment' },
  },
  {
    propId: 'prop.break.table',
    prompt: 'Rest',
    command: { type: 'performAction', action: 'rest' },
  },
  {
    propId: 'prop.pi.desk',
    prompt: 'Meet the PI',
    command: { type: 'meetPI' },
  },
  {
    propId: 'prop.hub.desk',
    prompt: 'Inspect the desk',
    command: null,
  },
];
