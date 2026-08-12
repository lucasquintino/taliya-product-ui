import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { evaluateChangedCoverage, loadCoverageFixtures, validateCoveragePolicy } from '../coverage-policy.mjs';

for (const fixture of loadCoverageFixtures()) {
  test(`coverage policy: ${fixture.id}`, () => {
    const errors = validateCoveragePolicy(fixture);
    if (fixture.expected === 'valid') assert.deepEqual(errors, []);
    else assert.ok(errors.some((error) => error.code === fixture.failureCode));
  });
}

test('coverage policy: changed lines meet the 95 percent threshold', () => {
  assert.equal(evaluateChangedCoverage({ covered: 19, total: 20 }).status, 'pass');
  assert.equal(evaluateChangedCoverage({ covered: 18, total: 20 }).status, 'fail');
});

test('coverage policy: no executable changed lines is not applicable', () => {
  assert.equal(evaluateChangedCoverage({ covered: 0, total: 0 }).status, 'not-applicable');
});
