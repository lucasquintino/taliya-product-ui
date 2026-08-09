#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const matrix = JSON.parse(fs.readFileSync(path.join(root, 'tests', 'contracts', 'public-behavior-matrix.json'), 'utf8'));
const storyFiles = fs.readdirSync(path.join(root, 'apps', 'docs', 'src', 'stories')).filter((file) => file.endsWith('.stories.tsx'));
const storyText = storyFiles.map((file) => fs.readFileSync(path.join(root, 'apps', 'docs', 'src', 'stories', file), 'utf8')).join('\n');
const components = matrix.rows.filter((row) => row.kind === 'component');
const missing = components.filter((row) => !new RegExp(`\\b${row.symbol}\\b`).test(storyText));
const result = { schemaVersion: 'story-isolation.v1', storyFileCount: storyFiles.length, componentCount: components.length, missing: missing.map((row) => row.symbol), status: missing.length ? 'fail' : 'pass' };
console.log(JSON.stringify(result, null, 2));
if (missing.length) process.exitCode = 1;
