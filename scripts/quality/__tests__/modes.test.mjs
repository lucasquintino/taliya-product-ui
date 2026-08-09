import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { assertWritable, parseMode } from '../modes.mjs';

test('mode parser distinguishes check and update', () => {
  assert.equal(parseMode(['--check']), 'check');
  assert.equal(parseMode(['--update']), 'update');
  assert.equal(parseMode([]), 'update');
});

test('mode parser rejects conflicting switches', () => {
  assert.throws(() => parseMode(['--check', '--update']), /MODE-CONFLICT/);
  assert.throws(() => assertWritable('check', ['report.json']), /MODE-READ-ONLY/);
});
