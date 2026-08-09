#!/usr/bin/env node
/* global console, process */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

export function runChildren(commands, { cwd = process.cwd(), timeoutMs = 120000 } = {}) {
  const results = [];
  let exitCode = 0;
  for (const child of commands) {
    const result = spawnSync(child.command, child.args ?? [], { cwd, encoding: 'utf8', timeout: child.timeoutMs ?? timeoutMs });
    const timedOut = result.error?.code === 'ETIMEDOUT';
    const failureCode = timedOut ? 'CHILD_TIMEOUT' : result.signal ? 'CHILD_SIGNAL' : result.status === 0 ? undefined : 'CHILD_EXIT_NONZERO';
    const childResult = { id: child.id, command: [child.command, ...(child.args ?? [])].join(' '), exitCode: result.status ?? 1, signal: result.signal ?? null, timedOut, failureCode, output: `${result.stdout ?? ''}${result.stderr ?? ''}` };
    results.push(childResult);
    if (failureCode) exitCode = childResult.exitCode || 1;
  }
  return { exitCode, results };
}

if (process.argv[1]?.endsWith('run-children.mjs')) {
  const file = process.argv[process.argv.indexOf('--commands-file') + 1];
  if (!file) {
    console.error('CHILD-RUNNER-CONFIG: --commands-file is required');
    process.exit(2);
  }
  const commands = JSON.parse(fs.readFileSync(file, 'utf8'));
  const report = runChildren(commands);
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.exitCode);
}
