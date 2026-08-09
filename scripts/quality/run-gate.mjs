#!/usr/bin/env node
/* global console, process */

import crypto from 'node:crypto';
import { runChildren } from './run-children.mjs';

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortValue(value[key])]));
  return value;
}

export function stableStringify(value) { return JSON.stringify(sortValue(value)); }
export function decisionFingerprint(run) {
  const normalized = { ...run };
  delete normalized.startedAt;
  delete normalized.endedAt;
  delete normalized.durationMs;
  delete normalized.runId;
  return crypto.createHash('sha256').update(stableStringify(normalized)).digest('hex');
}

export function runGate({ runId, gateId, profileIds, policyVersion, stage = 'pr', source, configHash, command, workingDirectory = '.', runner, inputFingerprints, evidenceIds = [], attempt = 1, timeoutMs }) {
  const startedAt = new Date().toISOString();
  const result = runChildren([{ id: gateId, command: command[0], args: command.slice(1), timeoutMs }], { cwd: workingDirectory });
  const endedAt = new Date().toISOString();
  const child = result.results[0];
  const run = {
    schemaVersion: '1.1.0', runId, gateId, profileIds, policyVersion, stage, source, configHash, command, workingDirectory, runner, startedAt, endedAt, attempt,
    status: result.exitCode === 0 ? 'pass' : child.timedOut ? 'error' : 'fail', exitCode: result.exitCode, failureCodes: child.failureCode ? [child.failureCode] : [], inputFingerprints, evidenceIds
  };
  return { ...run, decisionFingerprint: decisionFingerprint(run) };
}

if (process.argv[1]?.endsWith('run-gate.mjs')) console.error('GATE-RUN-CLI: use runGate() from a profile-specific wrapper');
