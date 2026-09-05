import { readFileSync } from 'node:fs';
import process from 'node:process';
import { pathToFileURL, URL } from 'node:url';

// Analysis arithmetic only. This does not implement a game command or scheduler.
export function checkTrace(trace) {
  const errors = [];
  const integer = (n) => Number.isSafeInteger(n) && n >= 0;
  if (!['standard', 'supported'].includes(trace.profile)) return ['unknown profile'];
  if (!integer(trace.maxPeriod) || trace.maxPeriod > 63) return ['invalid horizon'];
  if (!Array.isArray(trace.rows) || trace.rows.length === 0) return ['missing rows'];
  let period = 0;
  let energy = trace.profile === 'standard' ? 4 : 5;
  const classes = ['planning', 'light', 'focused', 'intense', 'major', 'recovery'];
  for (const [index, row] of trace.rows.entries()) {
    const fail = (message) => errors.push(`row ${index + 1}: ${message}`);
    if (!integer(row.periods) || !integer(row.baseEnergy) || !classes.includes(row.workClass)) {
      fail('invalid explicit arithmetic input');
      continue;
    }
    if (row.periodBefore !== period || row.energyBefore !== energy)
      fail('discontinuous starting values');
    if (row.workClass === 'recovery' && (row.periods !== 1 || row.baseEnergy !== 0))
      fail('invalid break');
    if (row.workClass === 'planning' && (row.periods !== 0 || row.baseEnergy !== 0))
      fail('invalid free planning action');
    const surcharge = Number(
      trace.profile === 'standard' &&
        period % 4 >= 2 &&
        ['focused', 'intense'].includes(row.workClass),
    );
    if (row.surcharge !== surcharge) fail('incorrect once-per-action surcharge');
    energy =
      row.workClass === 'recovery'
        ? Math.min(5, energy + (trace.profile === 'standard' ? 2 : 3))
        : energy - row.baseEnergy - surcharge;
    period += row.periods;
    if (energy < 0) fail('unaffordable without a separate crash contract');
    if (period > trace.maxPeriod) fail('horizon exceeded');
    if (row.energyAfter !== energy || row.periodAfter !== period) fail('incorrect declared result');
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const data = JSON.parse(
    readFileSync(new URL('./campaign-schedules.json', import.meta.url), 'utf8'),
  );
  let failed = false;
  for (const trace of data.traces) {
    const errors = checkTrace(trace);
    const matches = trace.expectedValid === (errors.length === 0);
    failed ||= !matches;
    process.stdout.write(
      `${trace.id}: ${errors.length === 0 ? 'arithmetic passes' : errors.join('; ')}\n`,
    );
  }
  if (failed) process.exitCode = 1;
}
