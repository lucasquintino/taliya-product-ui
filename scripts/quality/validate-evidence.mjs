#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';
import { validateEvidence } from './contract-fixtures.mjs';

export function validateEvidenceRecord(record, { commitSha, sourceTreeHash, dirty = false, inputFingerprints = {} } = {}) {
  const errors = validateEvidence(record).map((error) => error.code);
  if (record.source?.commitSha && commitSha && record.source.commitSha !== commitSha) errors.push('EVIDENCE-FOREIGN-REVISION');
  if (record.source?.sourceTreeHash && sourceTreeHash && record.source.sourceTreeHash !== sourceTreeHash) errors.push('EVIDENCE-SOURCE-HASH-MISMATCH');
  if (dirty || record.source?.dirty !== false) errors.push('EVIDENCE-DIRTY-TREE');
  for (const [name, expected] of Object.entries(inputFingerprints)) if (record.inputFingerprints?.[name] !== expected) errors.push('EVIDENCE-INPUT-MISMATCH');
  if (record.freshness?.validUntil && new Date(record.freshness.validUntil).valueOf() <= Date.now()) errors.push('EVIDENCE-STALE');
  return [...new Set(errors)];
}

if (process.argv[1]?.endsWith('validate-evidence.mjs')) {
  const fileIndex = process.argv.indexOf('--file');
  const file = fileIndex >= 0 ? process.argv[fileIndex + 1] : undefined;
  if (!file) { console.error('EVIDENCE-FILE-MISSING: --file is required'); process.exit(2); }
  const record = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
  const commitIndex = process.argv.indexOf('--commit');
  const treeIndex = process.argv.indexOf('--source-tree-hash');
  const errors = validateEvidenceRecord(record, {
    commitSha: commitIndex >= 0 ? process.argv[commitIndex + 1] : undefined,
    sourceTreeHash: treeIndex >= 0 ? process.argv[treeIndex + 1] : undefined,
    dirty: process.argv.includes('--dirty')
  });
  console.log(JSON.stringify({ status: errors.length ? 'fail' : 'pass', errors }, null, 2));
  if (errors.length) process.exitCode = 1;
}
