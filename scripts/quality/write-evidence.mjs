#!/usr/bin/env node
/* global process */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { stableStringify } from './run-gate.mjs';

export function normalizedEvidence(evidence) {
  const normalized = { ...evidence };
  delete normalized.generatedAt;
  delete normalized.sha256;
  delete normalized.validUntil;
  return normalized;
}

export function evidenceContentHash(evidence) {
  return crypto.createHash('sha256').update(stableStringify(normalizedEvidence(evidence))).digest('hex');
}

export function writeEvidence(relativePath, evidence, root = process.cwd()) {
  const artifact = { ...evidence, sha256: evidenceContentHash(evidence), normalized: true };
  const target = path.join(root, ...relativePath.split('/'));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(artifact, null, 2)}\n`);
  return artifact;
}
