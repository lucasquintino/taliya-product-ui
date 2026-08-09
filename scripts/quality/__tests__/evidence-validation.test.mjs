import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { canonicalEvidence } from '../contract-fixtures.mjs';
import { validateEvidenceRecord } from '../validate-evidence.mjs';

const context = { commitSha: canonicalEvidence().source.commitSha, sourceTreeHash: canonicalEvidence().source.sourceTreeHash, inputFingerprints: canonicalEvidence().inputFingerprints };

test('evidence validation rejects a stale record', () => {
  const record = canonicalEvidence();
  record.freshness.validUntil = '2020-01-01T00:00:00Z';
  assert.ok(validateEvidenceRecord(record, context).includes('EVIDENCE-STALE'));
});

test('evidence validation rejects a foreign revision and source hash', () => {
  const record = canonicalEvidence();
  assert.ok(validateEvidenceRecord(record, { ...context, commitSha: 'a'.repeat(40), sourceTreeHash: 'b'.repeat(64) }).includes('EVIDENCE-FOREIGN-REVISION'));
  assert.ok(validateEvidenceRecord(record, { ...context, sourceTreeHash: 'b'.repeat(64) }).includes('EVIDENCE-SOURCE-HASH-MISMATCH'));
});

test('evidence validation rejects dirty trees and mismatched inputs', () => {
  const record = canonicalEvidence();
  assert.ok(validateEvidenceRecord(record, { ...context, dirty: true }).includes('EVIDENCE-DIRTY-TREE'));
  assert.ok(validateEvidenceRecord(record, { ...context, inputFingerprints: { policy: 'c'.repeat(64) } }).includes('EVIDENCE-INPUT-MISMATCH'));
});
