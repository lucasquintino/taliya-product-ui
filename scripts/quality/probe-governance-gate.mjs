#!/usr/bin/env node
/* global console, process */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const tempRoot = mkdtempSync(path.join(tmpdir(), 'taliya-governance-probe-'));
const sourcePolicy = JSON.parse(readFileSync(path.join(root, 'governance', 'quality-policy.json'), 'utf8'));
const cases = [
  {
    id: 'unknown-gate',
    expected: 'POLICY_UNKNOWN_GATE_MISSING',
    mutate(policy) { delete policy.gates['G-GOV']; }
  },
  {
    id: 'non-blocking-gate',
    expected: 'POLICY_GATE_NOT_BLOCKING',
    mutate(policy) { policy.gates['G-GOV'].blocking = false; }
  },
  {
    id: 'unknown-profile',
    expected: 'POLICY_UNKNOWN_PROFILE',
    mutate(policy) { policy.changeProfiles['probe-profile'] = { ...policy.changeProfiles.governance }; }
  }
];
let failed = false;
try {
  for (const testCase of cases) {
    const candidate = JSON.parse(JSON.stringify(sourcePolicy));
    testCase.mutate(candidate);
    const candidatePath = path.join(tempRoot, `${testCase.id}.json`);
    writeFileSync(candidatePath, JSON.stringify(candidate, null, 2));
    const result = spawnSync(process.execPath, [
      path.join(root, 'scripts', 'quality', 'run-governance-gate.mjs'),
      '--check', '--policy', path.relative(root, candidatePath)
    ], { cwd: root, encoding: 'utf8' });
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
    if (result.status === 0 || !output.includes(testCase.expected)) {
      failed = true;
      console.error(`G-GOV-PROBE-FAILED: ${testCase.id} did not fail with ${testCase.expected}`);
    } else {
      console.log(`G-GOV-PROBE-PASS: ${testCase.id} -> ${testCase.expected}`);
    }
  }
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
if (failed) process.exitCode = 1;
