import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { decisionFingerprint, stableStringify } from '../run-gate.mjs';
import { evidenceContentHash, normalizedEvidence } from '../write-evidence.mjs';

test('unchanged gate decisions have equal fingerprints despite timing fields', () => {
  const base = { gateId: 'G-GOV', status: 'pass', exitCode: 0, startedAt: '2026-08-08T12:00:00Z', endedAt: '2026-08-08T12:00:01Z', decisionFingerprint: 'ignored' };
  const later = { ...base, startedAt: '2026-08-09T12:00:00Z', endedAt: '2026-08-09T12:00:04Z' };
  assert.equal(decisionFingerprint(base), decisionFingerprint(later));
  assert.equal(stableStringify({ b: 1, a: 2 }), '{"a":2,"b":1}');
});

test('unchanged evidence has equal normalized content hash despite freshness timestamps', () => {
  const base = { artifactId: 'artifact', decision: 'pass', generatedAt: '2026-08-08T12:00:00Z', validUntil: '2026-08-09T12:00:00Z', sha256: 'old' };
  const later = { ...base, generatedAt: '2026-08-09T12:00:00Z', validUntil: '2026-08-10T12:00:00Z', sha256: 'new' };
  assert.deepEqual(normalizedEvidence(base), normalizedEvidence(later));
  assert.equal(evidenceContentHash(base), evidenceContentHash(later));
});
