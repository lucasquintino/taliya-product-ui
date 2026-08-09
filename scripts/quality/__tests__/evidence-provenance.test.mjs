import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { loadEvidenceFixtures, materializeFixture, validateEvidence } from '../contract-fixtures.mjs';

for (const fixture of loadEvidenceFixtures().filter((item) => item.kind === 'evidence')) {
  test(`evidence provenance contract: ${fixture.id}`, () => {
    const errors = validateEvidence(materializeFixture(fixture));
    if (fixture.expected === 'valid') assert.deepEqual(errors, []);
    else assert.ok(errors.some((error) => error.code === fixture.failureCode), `${fixture.id}: ${JSON.stringify(errors)}`);
  });
}
