import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';
import { checkTrace } from './schedule-checker.mjs';

const data = JSON.parse(
  readFileSync(new URL('./campaign-schedules.json', import.meta.url), 'utf8'),
);
const fresh = (id = 'core-standard') =>
  globalThis.structuredClone(data.traces.find((trace) => trace.id === id));
for (const trace of data.traces) {
  test(`${trace.id}: authored arithmetic`, () => assert.deepEqual(checkTrace(trace), []));
}
test('64 clock states do not permit a 64th advance', () => {
  const t = fresh();
  t.rows.push({
    action: 'break',
    periodBefore: 63,
    energyBefore: 5,
    periods: 1,
    baseEnergy: 0,
    workClass: 'recovery',
    surcharge: 0,
    energyAfter: 5,
    periodAfter: 64,
  });
  assert.ok(checkTrace(t).some((e) => e.includes('horizon exceeded')));
});
test('the complete opening cannot be claimed as Week 1', () => {
  const t = fresh('opening-standard');
  t.maxPeriod = 3;
  assert.ok(checkTrace(t).some((e) => e.includes('horizon exceeded')));
});
test('Standard intensive work pays the night surcharge once', () => {
  const t = fresh();
  const r = t.rows.find((row) => row.action === 'intense');
  r.surcharge = 2;
  assert.ok(checkTrace(t).some((e) => e.includes('once-per-action')));
});
test('Supported does not inherit the Standard surcharge', () => {
  const t = fresh('core-supported');
  t.rows[5].surcharge = 1;
  assert.ok(checkTrace(t).some((e) => e.includes('once-per-action')));
});
test('an energy overdraft is not silent push-through', () => {
  const t = fresh();
  t.rows[3].baseEnergy = 6;
  assert.ok(checkTrace(t).some((e) => e.includes('unaffordable')));
});
test('the five-energy cap rejects banking surplus recovery', () => {
  const t = fresh();
  const r = t.rows.find((row) => row.workClass === 'recovery' && row.energyBefore === 5);
  r.energyAfter = 7;
  assert.ok(checkTrace(t).some((e) => e.includes('incorrect declared result')));
});
test('discontinuous rows cannot conceal a missing action', () => {
  const t = fresh();
  t.rows.splice(4, 1);
  assert.ok(checkTrace(t).some((e) => e.includes('discontinuous')));
});
test('fractional and unknown arithmetic inputs fail', () => {
  const t = fresh();
  t.rows[3].periods = 0.5;
  t.rows[4].workClass = 'invented';
  assert.equal(checkTrace(t).filter((e) => e.includes('invalid explicit')).length, 2);
});
test('a break cannot be reclassified as free recovery', () => {
  const t = fresh();
  const r = t.rows.find((row) => row.action === 'break');
  r.periods = 0;
  assert.ok(checkTrace(t).some((e) => e.includes('invalid break')));
});
test('a hypothetical replacement cost is not silently accepted as free configuration', () => {
  const t = fresh();
  const r = t.rows.find((row) => row.action === 'configure');
  r.periods = 1;
  assert.ok(checkTrace(t).some((e) => e.includes('invalid free planning')));
});
