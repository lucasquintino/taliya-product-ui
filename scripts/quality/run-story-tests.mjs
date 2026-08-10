#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const requestedDirIndex = process.argv.indexOf('--storybook-dir');
const requestedDir = requestedDirIndex >= 0 ? process.argv[requestedDirIndex + 1] : null;
const outputDir = requestedDir ? path.resolve(root, requestedDir) : fs.mkdtempSync(path.join(os.tmpdir(), 'taliya-storybook-'));
const storybook = path.join(root, 'node_modules', 'storybook', 'dist', 'bin', 'dispatcher.js');
const args = ['build', '--config-dir', path.join(root, 'apps', 'docs', '.storybook'), '--output-dir', outputDir];
const result = requestedDir ? { status: 0, stdout: '', stderr: '' } : spawnSync(process.execPath, [storybook, ...args], { cwd: root, encoding: 'utf8' });
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
const index = path.join(outputDir, 'index.json');
const status = result.status === 0 && fs.existsSync(index) ? 'pass' : 'fail';
if (status === 'pass') {
  const catalog = JSON.parse(fs.readFileSync(index, 'utf8'));
  const storyCount = Object.keys(catalog.entries ?? {}).length;
  if (storyCount === 0) { console.error('STORY-TEST-EMPTY: static catalog has no stories'); process.exitCode = 1; }
  else console.log(`STORY-TEST: static build/catalog pass (${storyCount} stories)`);
} else {
  console.error(`STORY-TEST-BUILD-FAILED: exit ${result.status ?? 1}`);
  process.exitCode = result.status ?? 1;
}
if (!requestedDir) fs.rmSync(outputDir, { recursive: true, force: true });
