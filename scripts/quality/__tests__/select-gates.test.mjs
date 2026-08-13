import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { selectGates } from '../select-gates.mjs';

test('profile and stage select canonical gates', () => {
  assert.deepEqual(selectGates({ profile: 'governance', stage: 'pr' }).requiredGates, ['G-GOV', 'G-LINT', 'G-UNIT', 'G-PROVENANCE']);
  assert.ok(selectGates({ profile: 'full', stage: 'release' }).requiredGates.includes('G-RELEASE'));
});

test('unknown profile and stage fail closed', () => {
  assert.throws(() => selectGates({ profile: 'unknown' }), /GATE-PROFILE-UNKNOWN/);
  assert.throws(() => selectGates({ profile: 'governance', stage: 'unknown' }), /GATE-STAGE-UNKNOWN/);
});
