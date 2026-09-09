import { describe, expect, it } from 'vitest';
import { decodeJsonFile } from '../../../src/content/json';

const bytes = (text: string) => new TextEncoder().encode(text);

describe('strict content JSON', () => {
  it('decodes UTF-8 JSON with LF and one final newline', () => {
    expect(decodeJsonFile(bytes('{"name":"Morgán"}\n'), 'content/manifest.json')).toEqual({
      kind: 'valid',
      value: { name: 'Morgán' },
    });
  });
  it.each([
    ['{"value":1,"value":2}\n', 'malformedJson'],
    ['{"value":1,"\\u0076alue":2}\n', 'malformedJson'],
  ])('rejects duplicate members before ordinary parsing', (text, code) => {
    expect(decodeJsonFile(bytes(text), 'content/data/actions.json')).toMatchObject({
      kind: 'invalid',
      issues: [{ code }],
    });
  });
  it('uses the text-specific duplicate code without returning the value', () => {
    const result = decodeJsonFile(
      bytes('{"safe.key":"private","\\u0073afe.key":"public"}\n'),
      'content/strings.en.json',
      'duplicateTextKey',
    );
    expect(result).toEqual({
      kind: 'invalid',
      issues: [
        {
          code: 'duplicateTextKey',
          file: 'content/strings.en.json',
          path: '/safe.key',
          idOrKey: 'safe.key',
        },
      ],
    });
    expect(JSON.stringify(result)).not.toContain('private');
  });
  it.each(['{"a":1}', '\ufeff{"a":1}\n', '{"a":1}\r\n', '{"a":NaN}\n'])(
    'rejects BOM, CR, missing newline, and non-JSON values',
    (text) => {
      expect(decodeJsonFile(bytes(text), 'content/manifest.json')).toMatchObject({
        kind: 'invalid',
        issues: [{ code: 'malformedJson' }],
      });
    },
  );
});
