#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'taliya-typecheck-'));
const configPath = path.join(temp, 'tsconfig.json');
const sourceFiles = spawnSync('git', ['ls-files', 'packages/tokens/src', 'packages/ui/src', 'packages/crm/src'], { cwd: root, encoding: 'utf8' }).stdout
  .split(/\r?\n/)
  .filter((file) => file && /\.(?:ts|tsx)$/.test(file) && !/\.test\.(?:ts|tsx)$/.test(file) && !file.endsWith('test.setup.ts'))
  .map((file) => path.join(root, file).replaceAll('\\', '/'));
const config = {
  extends: path.join(root, 'tsconfig.base.json').replaceAll('\\', '/'),
  compilerOptions: {
    noEmit: true,
    composite: false,
    types: ['node'],
    typeRoots: [path.join(root, 'node_modules/@types').replaceAll('\\', '/')],
    paths: {
      '@taliya/tokens': [path.join(root, 'packages/tokens/src/index.ts').replaceAll('\\', '/')],
      '@taliya/ui': [path.join(root, 'packages/ui/src/index.tsx').replaceAll('\\', '/')],
      '@taliya/crm': [path.join(root, 'packages/crm/src/index.tsx').replaceAll('\\', '/')]
    }
  },
  files: sourceFiles
};
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
try {
  const tsc = path.join(root, 'node_modules', 'typescript', 'bin', 'tsc');
  const result = spawnSync(process.execPath, [tsc, '-p', configPath], { cwd: root, encoding: 'utf8' });
  if (result.error) console.error(`TYPECHECK-CLEAN-SPAWN: ${result.error.message}`);
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) {
    console.error(`TYPECHECK-CLEAN: failed with exit code ${result.status ?? 1}`);
    process.exitCode = result.status ?? 1;
  } else console.log('TYPECHECK-CLEAN: source graph passed without sibling dist resolution');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
