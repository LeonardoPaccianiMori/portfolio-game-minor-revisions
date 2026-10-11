export const ACTS = ['act-1', 'act-2', 'act-3'] as const;
export type ActId = (typeof ACTS)[number];

export const ACT_LABELS: Readonly<Record<ActId, string>> = {
  'act-1': 'The promise',
  'act-2': 'The grind',
  'act-3': 'The spiral',
};

export const actForWeek = (week: number): ActId =>
  week <= 4 ? 'act-1' : week <= 8 ? 'act-2' : 'act-3';

export interface ActPalette {
  readonly background: number;
  readonly ambient: number;
  readonly ambientIntensity: number;
  readonly sun: number;
  readonly sunIntensity: number;
  readonly accent: number;
}

export const ACT_PALETTES: Readonly<Record<ActId, ActPalette>> = {
  'act-1': {
    background: 0xdfe5ea,
    ambient: 0xffffff,
    ambientIntensity: 0.8,
    sun: 0xffefd0,
    sunIntensity: 0.85,
    accent: 0xffb35c,
  },
  'act-2': {
    background: 0xcfd6da,
    ambient: 0xe8eef2,
    ambientIntensity: 0.72,
    sun: 0xe8e4d0,
    sunIntensity: 0.7,
    accent: 0xd98a4a,
  },
  'act-3': {
    background: 0xbcc7cf,
    ambient: 0xdfe8ee,
    ambientIntensity: 0.65,
    sun: 0xd6e2ea,
    sunIntensity: 0.55,
    accent: 0xc75b3c,
  },
};

export interface PropState {
  readonly propId: string;
  readonly color: number;
  readonly scaleY: number;
}

const rows = (color: number, scaleY: number): readonly PropState[] => [
  { propId: 'prop.grow.row-1', color, scaleY },
  { propId: 'prop.grow.row-2', color, scaleY },
  { propId: 'prop.grow.row-3', color, scaleY },
];

export const ACT_PROP_STATES: Readonly<Record<ActId, readonly PropState[]>> = {
  'act-1': [
    ...rows(0x6b8f4a, 1),
    { propId: 'prop.hub.board', color: 0xf7f3e6, scaleY: 1 },
    { propId: 'prop.lab.bench-north', color: 0x9aa3a8, scaleY: 1 },
    { propId: 'prop.lab.bench-west', color: 0x9aa3a8, scaleY: 1 },
    { propId: 'prop.lab.machine', color: 0x9aa3a8, scaleY: 1 },
    { propId: 'prop.break.counter', color: 0x9aa3a8, scaleY: 1 },
  ],
  'act-2': [
    ...rows(0x85855a, 0.85),
    { propId: 'prop.hub.board', color: 0xe8dfc4, scaleY: 1 },
    { propId: 'prop.lab.bench-north', color: 0x8f979c, scaleY: 1 },
    { propId: 'prop.lab.bench-west', color: 0x8f979c, scaleY: 1 },
    { propId: 'prop.lab.machine', color: 0x8f979c, scaleY: 1 },
    { propId: 'prop.break.counter', color: 0x8f979c, scaleY: 1 },
  ],
  'act-3': [
    ...rows(0x8a7a5f, 0.55),
    { propId: 'prop.hub.board', color: 0xcfc4a8, scaleY: 1 },
    { propId: 'prop.lab.bench-north', color: 0x7f878c, scaleY: 1 },
    { propId: 'prop.lab.bench-west', color: 0x7f878c, scaleY: 1 },
    { propId: 'prop.lab.machine', color: 0x7f878c, scaleY: 1 },
    { propId: 'prop.break.counter', color: 0x7f878c, scaleY: 1 },
  ],
};
