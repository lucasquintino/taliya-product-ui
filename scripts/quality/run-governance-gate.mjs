#!/usr/bin/env node
/* global console, process */

import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const scripts = [
  ['validate-governance.mjs', ['--check']],
  ['validate-waivers.mjs', ['--check']],
  ['validate-skills.mjs', []],
  ['validate-codex-rules.mjs', []],
  ['validate-spec-status.mjs', []]
];
const policyIndex = process.argv.indexOf('--policy');
const policy = policyIndex >= 0 ? process.argv[policyIndex + 1] : undefined;
let exitCode = 0;
for (const [script, args] of scripts) {
  const forwarded = [...args];
  if (script === 'validate-governance.mjs' && policy) forwarded.push('--policy', policy);
  const result = spawnSync(process.execPath, [path.join(root, 'scripts', 'quality', script), ...forwarded], { cwd: root, encoding: 'utf8' });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) exitCode = result.status ?? 1;
}
if (exitCode !== 0) console.error(`G-GOV: failed with exit code ${exitCode}`);
process.exit(exitCode);
