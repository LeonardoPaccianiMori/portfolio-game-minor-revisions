import type { Command } from '../rules/index.ts';

export interface Station {
  readonly propId: string;
  readonly prompt: string;
  readonly command: Command | null;
  readonly opensBoard: boolean;
}

export const STATIONS: readonly Station[] = [
  {
    propId: 'prop.lab.bench-north',
    prompt: 'Work an experiment step',
    command: { type: 'performAction', action: 'experiment' },
    opensBoard: false,
  },
  {
    propId: 'prop.grow.row-2',
    prompt: 'Work an experiment step',
    command: { type: 'performAction', action: 'experiment' },
    opensBoard: false,
  },
  {
    propId: 'prop.break.table',
    prompt: 'Rest',
    command: { type: 'performAction', action: 'rest' },
    opensBoard: false,
  },
  {
    propId: 'prop.pi.desk',
    prompt: 'Meet the PI',
    command: { type: 'meetPI' },
    opensBoard: false,
  },
  {
    propId: 'prop.hub.desk',
    prompt: 'Open the desk board',
    command: null,
    opensBoard: true,
  },
];
