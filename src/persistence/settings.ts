export interface Settings {
  readonly captions: boolean;
  readonly reducedMotion: boolean;
  readonly scale: number;
  readonly volume: number;
}

export const SETTINGS_MIN_SCALE = 0.8;
export const SETTINGS_MAX_SCALE = 1.5;

export const DEFAULT_SETTINGS: Settings = {
  captions: true,
  reducedMotion: false,
  scale: 1,
  volume: 1,
};

export interface SettingsValidationOk {
  readonly ok: true;
  readonly settings: Settings;
}

export interface SettingsValidationFailure {
  readonly ok: false;
  readonly issues: readonly string[];
}

export type SettingsValidation = SettingsValidationOk | SettingsValidationFailure;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const validateSettings = (value: unknown): SettingsValidation => {
  if (!isRecord(value)) {
    return { ok: false, issues: ['settings must be an object'] };
  }

  const issues: string[] = [];

  if (typeof value['captions'] !== 'boolean') {
    issues.push('captions must be a boolean');
  }

  if (typeof value['reducedMotion'] !== 'boolean') {
    issues.push('reducedMotion must be a boolean');
  }

  const scale = value['scale'];
  if (
    typeof scale !== 'number' ||
    !Number.isFinite(scale) ||
    scale < SETTINGS_MIN_SCALE ||
    scale > SETTINGS_MAX_SCALE
  ) {
    issues.push('scale is out of range');
  }

  const volume = value['volume'];
  if (typeof volume !== 'number' || !Number.isFinite(volume) || volume < 0 || volume > 1) {
    issues.push('volume is out of range');
  }

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return { ok: true, settings: value as unknown as Settings };
};

export const resolveSettings = (value: unknown): Settings => {
  const validation = validateSettings(value);
  return validation.ok ? validation.settings : DEFAULT_SETTINGS;
};
