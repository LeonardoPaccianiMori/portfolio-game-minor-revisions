import { describe, expect, it } from 'vitest';

import {
  applyPaperEdit,
  createInitialPaper,
  createInitialState,
  dispatch,
  validateState,
} from '../../src/rules/index.ts';
import type { PaperRequirementId, PaperState } from '../../src/rules/index.ts';

describe('paper track', () => {
  it('starts empty with a framing label', () => {
    const paper = createInitialPaper();

    expect(paper.framing).toBe('initial');
    expect(paper.revision).toBe(0);
    expect(paper.requirements).toEqual([]);
    expect(paper.evidence).toEqual([]);
  });

  it('adds requirements and refuses duplicates or unknown ids', () => {
    const added = applyPaperEdit(createInitialPaper(), {
      kind: 'add',
      requirementId: 'controls',
    });

    expect(added.ok).toBe(true);
    if (added.ok) {
      expect(added.paper.requirements).toEqual([{ id: 'controls', state: 'open' }]);

      const duplicate = applyPaperEdit(added.paper, {
        kind: 'add',
        requirementId: 'controls',
      });
      expect(duplicate.ok).toBe(false);
    }

    const unknown = applyPaperEdit(createInitialPaper(), {
      kind: 'add',
      requirementId: 'funding' as unknown as PaperRequirementId,
    });

    expect(unknown.ok).toBe(false);
  });

  it('reframes the paper and makes evidence and satisfied requirements stale', () => {
    const paper: PaperState = {
      framing: 'initial',
      revision: 0,
      requirements: [
        { id: 'controls', state: 'satisfied' },
        { id: 'impact', state: 'open' },
      ],
      evidence: [
        { id: 'paper.evidence.sequence.1', state: 'current', track: 'paper' },
        { id: 'paper.evidence.sequence.2', state: 'stale', track: 'paper' },
      ],
    };

    const result = applyPaperEdit(paper, {
      kind: 'reframe',
      framing: 'community relevance',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.paper.framing).toBe('community relevance');
      expect(result.paper.revision).toBe(1);
      expect(result.paper.requirements).toEqual([
        { id: 'controls', state: 'stale' },
        { id: 'impact', state: 'open' },
      ]);
      expect(result.paper.evidence).toEqual([
        { id: 'paper.evidence.sequence.1', state: 'stale', track: 'paper' },
        { id: 'paper.evidence.sequence.2', state: 'stale', track: 'paper' },
      ]);
    }

    expect(applyPaperEdit(paper, { kind: 'reframe', framing: '   ' }).ok).toBe(false);
  });

  it('reverts a requirement to open', () => {
    const paper: PaperState = {
      framing: 'initial',
      revision: 1,
      requirements: [{ id: 'controls', state: 'stale' }],
      evidence: [],
    };

    const result = applyPaperEdit(paper, {
      kind: 'revert',
      requirementId: 'controls',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.paper.requirements).toEqual([{ id: 'controls', state: 'open' }]);
    }

    expect(applyPaperEdit(paper, { kind: 'revert', requirementId: 'mechanism' }).ok).toBe(false);
  });

  it('does not mutate the original paper', () => {
    const paper = createInitialPaper();
    const before = JSON.stringify(paper);

    applyPaperEdit(paper, { kind: 'add', requirementId: 'controls' });

    expect(JSON.stringify(paper)).toBe(before);
  });

  it('attaches evidence through the command and refuses duplicates', () => {
    const state = createInitialState(1);
    const attached = dispatch(state, {
      type: 'assignEvidence',
      evidenceId: 'paper.evidence.sequence.1',
      track: 'paper',
    });

    expect(attached.ok).toBe(true);
    if (attached.ok) {
      expect(attached.state.paper.evidence).toEqual([
        { id: 'paper.evidence.sequence.1', state: 'current', track: 'paper' },
      ]);
    }

    const duplicate = dispatch(attached.ok ? attached.state : state, {
      type: 'assignEvidence',
      evidenceId: 'paper.evidence.sequence.1',
      track: 'paper',
    });

    expect(duplicate).toEqual({
      ok: false,
      reason: 'duplicate-evidence',
      message: 'This evidence is already attached to the paper.',
    });
  });

  it('rejects an empty evidence identifier', () => {
    const result = dispatch(createInitialState(1), {
      type: 'assignEvidence',
      evidenceId: '   ',
      track: 'paper',
    });

    expect(result).toEqual({
      ok: false,
      reason: 'invalid-command',
      message: 'The evidence identifier is empty.',
    });
  });

  it('validates the paper inside the campaign state', () => {
    const state = createInitialState(1);
    const invalid = { ...state, paper: { ...state.paper, framing: '' } };

    const result = validateState(invalid);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toContain('paper.framing must be a non-empty string');
    }
  });
});
