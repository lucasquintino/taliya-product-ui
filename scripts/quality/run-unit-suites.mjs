#!/usr/bin/env node
/* global process */

import path from 'node:path';
import { runChildren } from './run-children.mjs';

const root = process.cwd();
const vitest = path.join(root, 'node_modules', 'vitest', 'vitest.mjs');
const packages = ['tokens', 'ui', 'crm'];
const report = runChildren(packages.map((name) => ({ id: name, command: process.execPath, args: [vitest, 'run', '--config', 'vitest.config.ts'], cwd: path.join(root, 'packages', name), timeoutMs: 120000 })), { cwd: root });
for (const result of report.results) if (result.output) process.stdout.write(result.output);
process.exit(report.exitCode);
