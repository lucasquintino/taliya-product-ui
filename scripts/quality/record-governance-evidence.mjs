#!/usr/bin/env node
/* global Buffer, console, process */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const artifactRelative = 'artifacts/quality/g-governance.json';
const artifactPath = path.join(root, ...artifactRelative.split('/'));
const normalizedBytes = (file) => {
  const raw = fs.readFileSync(file);
  try { return Buffer.from(raw.toString('utf8').replaceAll('\r\n', '\n').replaceAll('\r', '\n'), 'utf8'); }
  catch { return raw; }
};
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const isGeneratedEvidencePath = (relative) => relative.startsWith('artifacts/') || /^specs\/001-product-ui-foundation\/.*-audit(?:-[^/]+)?\.(?:json|md)$/.test(relative);
const fileHash = (relative) => sha256(normalizedBytes(path.join(root, ...relative.split('/'))));
const run = (command, args) => {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8' });
  return { command: [command, ...args].join(' '), status: result.status ?? 1, output: `${result.stdout ?? ''}${result.stderr ?? ''}`.trim() };
};

const porcelain = run('git', ['status', '--porcelain']).output;
if (porcelain) {
  console.error('G-GOV-EVIDENCE-DIRTY: capture requires a clean tree');
  process.exitCode = 1;
} else {
  const revision = run('git', ['rev-parse', 'HEAD']).output;
  const tracked = run('git', ['ls-files', '-co', '--exclude-standard', '-z']).output.split('\0')
    .filter(Boolean)
    .map((entry) => entry.replaceAll('\\', '/'))
    .filter((entry) => !isGeneratedEvidencePath(entry))
    .sort();
  const sourceRows = tracked.map((relative) => `${relative}\0${fileHash(relative)}\0${normalizedBytes(path.join(root, ...relative.split('/'))).length}\n`);
  const sourceTreeHash = sha256(Buffer.from(sourceRows.join(''), 'utf8'));
  const commands = [
    ['direct-policy', [process.execPath, 'scripts/quality/validate-governance.mjs', '--check']],
    ['aggregate-gate', [process.execPath, 'scripts/quality/run-governance-gate.mjs', '--check']],
    ['negative-probes', [process.execPath, 'scripts/quality/probe-governance-gate.mjs']]
  ];
  const results = commands.map(([id, args]) => {
    const result = run(args[0], args.slice(1));
    return { id, command: args.join(' '), exitCode: result.status, passed: result.status === 0, outputSha256: sha256(Buffer.from(result.output, 'utf8')) };
  });
  const now = new Date();
  const evidence = {
    schemaVersion: 'g-governance.v1',
    artifactId: 'g-governance',
    gateId: 'G-GOV',
    decision: results.every((result) => result.passed) ? 'pass' : 'fail',
    sourceRevision: revision,
    sourceTreeHash,
    sourceTreeFileCount: tracked.length,
    cleanTreeBeforeCapture: true,
    inputFingerprints: {
      policy: fileHash('governance/quality-policy.json'),
      skillManifest: fileHash('.specify/integrations/codex.manifest.json'),
      featurePointer: fileHash('.specify/feature.json'),
      instructionRoot: fileHash('AGENTS.md')
    },
    runner: { operatingSystem: process.platform, architecture: process.arch, nodeVersion: process.version, ci: process.env.CI === 'true' },
    generatedAt: now.toISOString(),
    validUntil: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    commands: results
  };
  fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
  fs.writeFileSync(artifactPath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`G-GOV evidence: ${evidence.decision}, revision ${revision}, ${tracked.length} source files`);
  if (evidence.decision !== 'pass') process.exitCode = 1;
}
