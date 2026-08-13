#!/usr/bin/env node
/* global console, process */

import path from 'node:path';
import { runChildren } from './run-children.mjs';

const root = process.cwd();
const scripts = [
  ['validate-governance.mjs', ['--check']],
  ['validate-waivers.mjs', ['--check']],
  ['validate-skills.mjs', []],
  ['validate-codex-rules.mjs', []],
  ['validate-ci-bootstrap.mjs', []],
  ['validate-spec-status.mjs', []]
];
const policyIndex = process.argv.indexOf('--policy');
const policy = policyIndex >= 0 ? process.argv[policyIndex + 1] : undefined;
const commands = scripts.map(([script, args]) => {
  const forwarded = [...args];
  if (script === 'validate-governance.mjs' && policy) forwarded.push('--policy', policy);
  return { id: script, command: process.execPath, args: [path.join(root, 'scripts', 'quality', script), ...forwarded] };
});
const report = runChildren(commands, { cwd: root });
for (const result of report.results) {
  if (result.output) process.stdout.write(result.output);
}
if (report.exitCode !== 0) console.error(`G-GOV: failed with exit code ${report.exitCode}`);
process.exit(report.exitCode);
