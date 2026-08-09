/* global process */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fixtureDirectory = path.join(root, 'tests', 'fixtures', 'evidence');

export function loadEvidenceFixtures() {
  return fs.readdirSync(fixtureDirectory).filter((file) => file.endsWith('.json')).sort().map((file) => JSON.parse(fs.readFileSync(path.join(fixtureDirectory, file), 'utf8')));
}

export function canonicalGateRun() {
  return {
    schemaVersion: '1.1.0', runId: '0bf24249-38e7-4495-bcd5-87dac51ac8e6', gateId: 'G-ARCH', profileIds: ['ui-component'], policyVersion: '1.0.0', stage: 'pr',
    source: { commitSha: '743cc5baf94f39d910f53cfd7c0876785ae83041', sourceTreeHash: 'a'.repeat(64), dirty: false },
    configHash: 'b'.repeat(64), command: ['node', 'scripts/quality/validate-governance.mjs'], workingDirectory: '.',
    runner: { operatingSystem: 'windows', architecture: 'x64', nodeVersion: '24.15.0', timezone: 'UTC' }, startedAt: '2026-08-08T12:00:00Z', endedAt: '2026-08-08T12:00:03Z', attempt: 1,
    status: 'pass', exitCode: 0, failureCodes: [], inputFingerprints: { source: 'a'.repeat(64), policy: 'b'.repeat(64) }, evidenceIds: ['04910716-cf11-422e-bbd4-e1dcb1b934d1'], decisionFingerprint: 'c'.repeat(64)
  };
}

export function canonicalEvidence() {
  return {
    schemaVersion: '1.1.0', artifactId: '04910716-cf11-422e-bbd4-e1dcb1b934d1', kind: 'architecture-report', relativePath: 'artifacts/quality/architecture-report.json', sha256: 'd'.repeat(64),
    producer: { gateRunId: '0bf24249-38e7-4495-bcd5-87dac51ac8e6', gateId: 'G-ARCH' }, source: { commitSha: '743cc5baf94f39d910f53cfd7c0876785ae83041', sourceTreeHash: 'a'.repeat(64), dirty: false },
    inputFingerprints: { source: 'a'.repeat(64), policy: 'b'.repeat(64) }, tool: { name: 'architecture-audit', version: '1.0.0' }, environment: { operatingSystem: 'windows', architecture: 'x64', nodeVersion: '24.15.0', timezone: 'UTC' },
    generatedAt: '2026-08-08T12:00:03Z', freshness: { policyId: 'release-evidence-24h', maxAgeHours: 24, validUntil: '2026-08-09T12:00:03Z' }, decision: 'pass', waiverIds: [], normalized: true, containsSecrets: false, sensitivity: 'internal'
  };
}

export function materializeFixture(fixture) {
  const instance = fixture.kind === 'gate-run' ? canonicalGateRun() : canonicalEvidence();
  if (fixture.remove) delete instance[fixture.remove];
  return instance;
}

export function validateGateRun(instance) {
  const errors = [];
  if (!instance.source?.commitSha || !instance.source?.sourceTreeHash || typeof instance.source?.dirty !== 'boolean') errors.push({ code: 'GATE-RUN-SOURCE-MISSING' });
  if (!instance.inputFingerprints || Object.keys(instance.inputFingerprints).length === 0) errors.push({ code: 'GATE-RUN-INPUT-MISSING' });
  if (!instance.runner) errors.push({ code: 'GATE-RUN-RUNNER-MISSING' });
  if (!instance.command?.length || !instance.workingDirectory) errors.push({ code: 'GATE-RUN-COMMAND-MISSING' });
  return errors;
}

export function validateEvidence(instance) {
  const errors = [];
  if (!instance.source?.commitSha || !instance.source?.sourceTreeHash || typeof instance.source?.dirty !== 'boolean') errors.push({ code: 'EVIDENCE-SOURCE-MISSING' });
  if (!instance.inputFingerprints || Object.keys(instance.inputFingerprints).length === 0) errors.push({ code: 'EVIDENCE-INPUT-MISSING' });
  if (!instance.tool?.name || !instance.tool?.version) errors.push({ code: 'EVIDENCE-TOOL-MISSING' });
  if (!instance.freshness?.policyId || !instance.freshness?.validUntil) errors.push({ code: 'EVIDENCE-FRESHNESS-MISSING' });
  return errors;
}
