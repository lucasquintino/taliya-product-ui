#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const storyDir = path.join(root, 'apps', 'docs', 'src', 'stories');
const preview = fs.readFileSync(path.join(root, 'apps', 'docs', '.storybook', 'main.ts'), 'utf8');
const css = fs.readFileSync(path.join(root, 'packages', 'ui', 'src', 'styles.css'), 'utf8');
const files = fs.readdirSync(storyDir).filter((file) => file.endsWith('.stories.tsx'));
const errors = [];
if (!preview.includes('@storybook/addon-a11y')) errors.push('A11Y-ADDON-MISSING');
if (!css.includes('prefers-reduced-motion: reduce')) errors.push('A11Y-REDUCED-MOTION-MISSING');
for (const file of files) {
  const source = fs.readFileSync(path.join(storyDir, file), 'utf8');
  if (!source.includes('export default')) errors.push(`A11Y-STORY-META-MISSING:${file}`);
}
console.log(JSON.stringify({ status: errors.length ? 'fail' : 'pass', storyCount: files.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
