import type { ContentIssue, ContentIssueCode, ContentResult } from './types.ts';

export const escapePointer = (value: string): string =>
  value.replaceAll('~', '~0').replaceAll('/', '~1');

type Duplicate = { readonly path: string; readonly key: string };

class JsonScanner {
  private index = 0;
  private readonly text: string;
  readonly duplicates: Duplicate[] = [];

  constructor(text: string) {
    this.text = text;
  }

  scan(): void {
    this.space();
    this.value('');
    this.space();
    if (this.index !== this.text.length) throw new Error('json');
  }

  private space(): void {
    while (/\s/u.test(this.text[this.index] ?? '')) this.index += 1;
  }

  private value(path: string): void {
    this.space();
    const token = this.text[this.index];
    if (token === '{') this.object(path);
    else if (token === '[') this.array(path);
    else if (token === '"') void this.string();
    else if (token === '-' || (token !== undefined && /[0-9]/u.test(token))) this.number();
    else if (this.text.startsWith('true', this.index)) this.index += 4;
    else if (this.text.startsWith('false', this.index)) this.index += 5;
    else if (this.text.startsWith('null', this.index)) this.index += 4;
    else throw new Error('json');
  }

  private object(path: string): void {
    this.index += 1;
    this.space();
    if (this.text[this.index] === '}') {
      this.index += 1;
      return;
    }
    const keys = new Set<string>();
    for (;;) {
      this.space();
      if (this.text[this.index] !== '"') throw new Error('json');
      const key = this.string();
      const keyPath = `${path}/${escapePointer(key)}`;
      if (keys.has(key)) this.duplicates.push({ path: keyPath, key });
      keys.add(key);
      this.space();
      if (this.text[this.index] !== ':') throw new Error('json');
      this.index += 1;
      this.value(keyPath);
      this.space();
      const next = this.text[this.index];
      if (next === '}') {
        this.index += 1;
        return;
      }
      if (next !== ',') throw new Error('json');
      this.index += 1;
    }
  }

  private array(path: string): void {
    this.index += 1;
    this.space();
    if (this.text[this.index] === ']') {
      this.index += 1;
      return;
    }
    let item = 0;
    for (;;) {
      this.value(`${path}/${item}`);
      item += 1;
      this.space();
      const next = this.text[this.index];
      if (next === ']') {
        this.index += 1;
        return;
      }
      if (next !== ',') throw new Error('json');
      this.index += 1;
    }
  }

  private string(): string {
    const start = this.index;
    this.index += 1;
    for (;;) {
      const token = this.text[this.index];
      if (token === undefined || token.charCodeAt(0) < 0x20) throw new Error('json');
      if (token === '"') {
        this.index += 1;
        return JSON.parse(this.text.slice(start, this.index)) as string;
      }
      if (token === '\\') {
        this.index += 1;
        const escaped = this.text[this.index];
        if (escaped === 'u') {
          const digits = this.text.slice(this.index + 1, this.index + 5);
          if (!/^[0-9a-fA-F]{4}$/u.test(digits)) throw new Error('json');
          this.index += 5;
          continue;
        }
        if (escaped === undefined || !/["\\/bfnrt]/u.test(escaped)) throw new Error('json');
      }
      this.index += 1;
    }
  }

  private number(): void {
    const match = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/u.exec(this.text.slice(this.index));
    if (match === null) throw new Error('json');
    this.index += match[0].length;
  }
}

const invalid = (code: ContentIssueCode, file: string, path = '/'): ContentResult<never> => ({
  kind: 'invalid',
  issues: [{ code, file, path, idOrKey: null }],
});

export const decodeJsonFile = (
  bytes: Uint8Array,
  file: string,
  duplicateCode: ContentIssueCode = 'malformedJson',
): ContentResult<unknown> => {
  if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf)
    return invalid('malformedJson', file);
  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return invalid('malformedJson', file);
  }
  if (text.startsWith('\uFEFF') || text.includes('\r') || !text.endsWith('\n'))
    return invalid('malformedJson', file);
  const scanner = new JsonScanner(text);
  try {
    scanner.scan();
  } catch {
    return invalid('malformedJson', file);
  }
  if (scanner.duplicates.length > 0) {
    const issues: ContentIssue[] = scanner.duplicates.map(({ path, key }) => ({
      code: duplicateCode,
      file,
      path: path || '/',
      idOrKey: duplicateCode === 'duplicateTextKey' ? key : null,
    }));
    return { kind: 'invalid', issues };
  }
  try {
    return { kind: 'valid', value: JSON.parse(text) as unknown };
  } catch {
    return invalid('malformedJson', file);
  }
};
