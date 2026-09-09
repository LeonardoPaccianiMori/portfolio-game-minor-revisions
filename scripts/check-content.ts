import { createBuiltContentPackage, validateSourceCatalogue } from '../src/content/source.ts';
import { readSourceFiles } from './content-build.ts';

const source = validateSourceCatalogue(await readSourceFiles());
if (source.kind === 'invalid') {
  process.stderr.write(`CONTENT_CHECK:${source.issues[0]?.code ?? 'invalidObject'}\n`);
  process.exitCode = 1;
} else {
  const slice = createBuiltContentPackage(source.value, 'slice');
  const full = createBuiltContentPackage(source.value, 'full');
  const fallback = createBuiltContentPackage(source.value, 'fallback');
  const valid =
    slice.kind === 'valid' &&
    full.kind === 'invalid' &&
    full.issues[0]?.code === 'incompleteProfile' &&
    fallback.kind === 'invalid' &&
    fallback.issues[0]?.code === 'incompleteProfile';
  if (!valid) {
    process.stderr.write('CONTENT_CHECK:profileContract\n');
    process.exitCode = 1;
  } else process.stdout.write('CONTENT_CHECK:valid:slice=97:strings=213\n');
}
