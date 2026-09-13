import type { CampaignState } from './campaign-state.ts';
import { EVIDENCE_TRACKS } from './commands.ts';
import type {
  AssignEvidenceCommand,
  CommandRejectionReason,
  CommandResult,
  EvidenceTrack,
  PresentationEffect,
} from './commands.ts';

export const EVIDENCE_STATES = ['current', 'stale'] as const;
export type EvidenceState = (typeof EVIDENCE_STATES)[number];

export interface Evidence {
  readonly id: string;
  readonly state: EvidenceState;
  readonly track: EvidenceTrack;
  readonly overlap: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const rejection = (reason: CommandRejectionReason, message: string): CommandResult => ({
  ok: false,
  reason,
  message,
});

export const validateEvidenceList = (value: unknown): readonly string[] => {
  if (!Array.isArray(value)) {
    return ['evidence must be a list'];
  }

  const issues: string[] = [];

  value.forEach((entry, index) => {
    if (!isRecord(entry)) {
      issues.push(`evidence[${index}] must be an object`);
      return;
    }

    if (typeof entry['id'] !== 'string' || entry['id'].trim().length === 0) {
      issues.push(`evidence[${index}].id must be a non-empty string`);
    }

    if (!EVIDENCE_STATES.includes(entry['state'] as EvidenceState)) {
      issues.push(`evidence[${index}].state is unknown`);
    }

    if (!EVIDENCE_TRACKS.includes(entry['track'] as EvidenceTrack)) {
      issues.push(`evidence[${index}].track is unknown`);
    }

    if (typeof entry['overlap'] !== 'boolean') {
      issues.push(`evidence[${index}].overlap must be a boolean`);
    }
  });

  return issues;
};

export const staleCurrentEvidence = (evidence: readonly Evidence[]): readonly Evidence[] =>
  evidence.map((entry) =>
    entry.state === 'current' ? { ...entry, state: 'stale' as const } : entry,
  );

export const assignEvidence = (
  state: CampaignState,
  command: AssignEvidenceCommand,
): CommandResult => {
  const evidenceId = command.evidenceId.trim();
  if (evidenceId.length === 0) {
    return rejection('invalid-command', 'The evidence identifier is empty.');
  }

  if (!EVIDENCE_TRACKS.includes(command.track)) {
    return rejection('invalid-command', 'The evidence track is not valid.');
  }

  if (state.evidence.some((entry) => entry.id === evidenceId)) {
    return rejection('duplicate-evidence', 'This evidence is already attached.');
  }

  const overlap = command.track === 'both';
  const effects: PresentationEffect[] = [
    {
      kind: 'evidence-assigned',
      payload: { evidenceId, track: command.track, overlap },
    },
  ];

  return {
    ok: true,
    state: {
      ...state,
      evidence: [
        ...state.evidence,
        { id: evidenceId, state: 'current', track: command.track, overlap },
      ],
    },
    effects,
  };
};
