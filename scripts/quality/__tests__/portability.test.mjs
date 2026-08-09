import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { deterministicTimestamp, normalizeRepositoryPath, normalizeText, stableDecision } from '../portability.mjs';

test('line endings normalize to the same decision', () => {
  assert.equal(normalizeText('.a {\r\n  color: red;\r\n}'), normalizeText('.a {\n  color: red;\n}'));
});

test('Windows and POSIX repository paths normalize identically', () => {
  assert.equal(normalizeRepositoryPath('.\\scripts\\quality\\run-gate.mjs'), 'scripts/quality/run-gate.mjs');
  assert.equal(normalizeRepositoryPath('./scripts/quality/run-gate.mjs'), 'scripts/quality/run-gate.mjs');
});

test('timestamps and decisions are locale/timezone independent and repeatable', () => {
  assert.equal(deterministicTimestamp('2026-08-08T12:00:00-03:00'), '2026-08-08T15:00:00.000Z');
  const value = { status: 'pass', counts: { b: 2, a: 1 } };
  assert.deepEqual(stableDecision(value), stableDecision(JSON.parse(JSON.stringify(value))));
});
