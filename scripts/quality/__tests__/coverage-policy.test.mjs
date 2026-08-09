import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { loadCoverageFixtures, validateCoveragePolicy } from '../coverage-policy.mjs';

for (const fixture of loadCoverageFixtures()) {
  test(`coverage policy: ${fixture.id}`, () => {
    const errors = validateCoveragePolicy(fixture);
    if (fixture.expected === 'valid') assert.deepEqual(errors, []);
    else assert.ok(errors.some((error) => error.code === fixture.failureCode));
  });
}
