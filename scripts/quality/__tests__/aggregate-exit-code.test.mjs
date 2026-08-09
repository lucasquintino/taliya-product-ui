import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import process from 'node:process';
import { runChildren } from '../run-children.mjs';

const child = (source, id, timeoutMs) => ({ id, command: process.execPath, args: ['-e', source], timeoutMs });

test('aggregate runner propagates a failing child exit code', () => {
  const report = runChildren([child('process.exit(0)', 'pass'), child('console.error("FAIL-CHILD"); process.exit(7)', 'fail')]);
  assert.equal(report.exitCode, 7);
  assert.equal(report.results[1].failureCode, 'CHILD_EXIT_NONZERO');
});

test('aggregate runner propagates a timeout as a non-zero decision', () => {
  const report = runChildren([child('setTimeout(() => {}, 1000)', 'timeout', 25)]);
  assert.notEqual(report.exitCode, 0);
  assert.equal(report.results[0].failureCode, 'CHILD_TIMEOUT');
});
