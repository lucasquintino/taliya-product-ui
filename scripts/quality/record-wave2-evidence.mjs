#!/usr/bin/env node
/* global console, process */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const node = process.execPath;
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const run = (command, args, cwd = root) => {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  return { exitCode: result.status ?? 1, outputSha256: sha256(output), output: output.trim() };
};
const revision = run('git', ['rev-parse', 'HEAD']).output;
const commands = [
  ['G-TYPE', node, ['scripts/quality/typecheck-clean.mjs'], root],
  ['G-LINT', node, ['node_modules/eslint/bin/eslint.js', 'packages/tokens/src', 'packages/ui/src', 'packages/crm/src', 'apps/docs/src'], root],
  ['G-UNIT', node, ['scripts/quality/run-unit-suites.mjs'], root],
  ['G-ARCH', node, ['scripts/audit-package-boundaries.mjs', '--check'], root],
  ['G-TOKENS', node, ['scripts/audit-design-tokens.mjs', '--check'], root],
  ['G-PROVENANCE', node, ['--test', 'scripts/quality/__tests__/gate-run-contract.test.mjs', 'scripts/quality/__tests__/evidence-provenance.test.mjs', 'scripts/quality/__tests__/evidence-validation.test.mjs'], root]
];
const now = new Date();
fs.mkdirSync(path.join(root, 'artifacts', 'quality'), { recursive: true });
let failed = false;
for (const [gateId, command, args, cwd] of commands) {
  const result = run(command, args, cwd);
  const record = {
    schemaVersion: 'gate-evidence.v1', gateId, decision: result.exitCode === 0 ? 'pass' : 'fail', sourceRevision: revision,
    runner: { operatingSystem: process.platform, architecture: process.arch, nodeVersion: process.version }, generatedAt: now.toISOString(),
    command: [command, ...args].join(' '), workingDirectory: path.relative(root, cwd).replaceAll('\\', '/') || '.', exitCode: result.exitCode, outputSha256: result.outputSha256
  };
  fs.writeFileSync(path.join(root, 'artifacts', 'quality', `${gateId.toLowerCase().replaceAll('gate-', 'g-')}.json`), `${JSON.stringify(record, null, 2)}\n`);
  console.log(`${gateId}: ${record.decision}`);
  if (result.exitCode !== 0) { failed = true; console.error(result.output); }
}
if (failed) process.exitCode = 1;
