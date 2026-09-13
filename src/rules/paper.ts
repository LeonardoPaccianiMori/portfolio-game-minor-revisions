export const PAPER_REQUIREMENT_IDS = [
  'controls',
  'replicates',
  'mechanism',
  'impact',
  'presentation',
] as const;
export type PaperRequirementId = (typeof PAPER_REQUIREMENT_IDS)[number];

export const PAPER_REQUIREMENT_STATES = ['open', 'satisfied', 'stale'] as const;
export type PaperRequirementState = (typeof PAPER_REQUIREMENT_STATES)[number];

export interface PaperRequirement {
  readonly id: PaperRequirementId;
  readonly state: PaperRequirementState;
}

export interface PaperState {
  readonly framing: string;
  readonly revision: number;
  readonly requirements: readonly PaperRequirement[];
}

export interface PaperEditOk {
  readonly ok: true;
  readonly paper: PaperState;
}

export interface PaperEditFailure {
  readonly ok: false;
  readonly reason: string;
}

export type PaperEditOutcome = PaperEditOk | PaperEditFailure;

export type PaperEdit =
  | { readonly kind: 'add'; readonly requirementId: PaperRequirementId }
  | { readonly kind: 'reframe'; readonly framing: string }
  | { readonly kind: 'revert'; readonly requirementId: PaperRequirementId };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value);

export const createInitialPaper = (): PaperState => ({
  framing: 'initial',
  revision: 0,
  requirements: [],
});

export const validatePaper = (value: unknown): readonly string[] => {
  if (!isRecord(value)) {
    return ['paper must be an object'];
  }

  const issues: string[] = [];

  if (typeof value['framing'] !== 'string' || value['framing'].trim().length === 0) {
    issues.push('paper.framing must be a non-empty string');
  }

  if (!isInteger(value['revision']) || value['revision'] < 0) {
    issues.push('paper.revision is out of range');
  }

  const requirements = value['requirements'];
  if (!Array.isArray(requirements)) {
    issues.push('paper.requirements must be a list');
  } else {
    requirements.forEach((entry, index) => {
      if (!isRecord(entry)) {
        issues.push(`paper.requirements[${index}] must be an object`);
        return;
      }

      if (!PAPER_REQUIREMENT_IDS.includes(entry['id'] as PaperRequirementId)) {
        issues.push(`paper.requirements[${index}].id is unknown`);
      }

      if (!PAPER_REQUIREMENT_STATES.includes(entry['state'] as PaperRequirementState)) {
        issues.push(`paper.requirements[${index}].state is unknown`);
      }
    });
  }

  return issues;
};

export const applyPaperEdit = (paper: PaperState, edit: PaperEdit): PaperEditOutcome => {
  if (edit.kind === 'add') {
    if (!PAPER_REQUIREMENT_IDS.includes(edit.requirementId)) {
      return { ok: false, reason: `unknown requirement: ${edit.requirementId}` };
    }

    if (paper.requirements.some((requirement) => requirement.id === edit.requirementId)) {
      return { ok: false, reason: `requirement already present: ${edit.requirementId}` };
    }

    return {
      ok: true,
      paper: {
        ...paper,
        requirements: [...paper.requirements, { id: edit.requirementId, state: 'open' }],
      },
    };
  }

  if (edit.kind === 'reframe') {
    const framing = edit.framing.trim();
    if (framing.length === 0) {
      return { ok: false, reason: 'framing must not be empty' };
    }

    return {
      ok: true,
      paper: {
        ...paper,
        framing,
        revision: paper.revision + 1,
        requirements: paper.requirements.map((requirement) =>
          requirement.state === 'satisfied'
            ? { ...requirement, state: 'stale' as const }
            : requirement,
        ),
      },
    };
  }

  if (!PAPER_REQUIREMENT_IDS.includes(edit.requirementId)) {
    return { ok: false, reason: `unknown requirement: ${edit.requirementId}` };
  }

  if (!paper.requirements.some((requirement) => requirement.id === edit.requirementId)) {
    return { ok: false, reason: `unknown requirement: ${edit.requirementId}` };
  }

  return {
    ok: true,
    paper: {
      ...paper,
      requirements: paper.requirements.map((requirement) =>
        requirement.id === edit.requirementId
          ? { ...requirement, state: 'open' as const }
          : requirement,
      ),
    },
  };
};
