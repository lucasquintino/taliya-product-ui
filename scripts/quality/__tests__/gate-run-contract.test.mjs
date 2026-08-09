import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { loadEvidenceFixtures, materializeFixture, validateGateRun } from '../contract-fixtures.mjs';

for (const fixture of loadEvidenceFixtures().filter((item) => item.kind === 'gate-run')) {
  test(`gate-run contract: ${fixture.id}`, () => {
    const errors = validateGateRun(materializeFixture(fixture));
    if (fixture.expected === 'valid') assert.deepEqual(errors, []);
    else assert.ok(errors.some((error) => error.code === fixture.failureCode), `${fixture.id}: ${JSON.stringify(errors)}`);
  });
}
