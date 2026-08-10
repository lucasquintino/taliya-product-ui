#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const packFlag = process.argv.indexOf('--pack-dir');
const packDir = path.resolve(root, packFlag >= 0 ? process.argv[packFlag + 1] : 'dist-packages');
const packages = ['taliya-tokens', 'taliya-ui', 'taliya-crm'];
const errors = [];
const tarballs = new Map();
for (const name of packages) {
  const tarball = fs.readdirSync(packDir, { withFileTypes: true }).find((entry) => entry.isFile() && entry.name.startsWith(`${name}-`) && entry.name.endsWith('.tgz'));
  if (!tarball) { errors.push(`CONSUMER-TARBALL-MISSING:${name}`); continue; }
  tarballs.set(name, path.join(packDir, tarball.name));
  const list = spawnSync('tar', ['-tf', path.join(packDir, tarball.name)], { encoding: 'utf8' });
  if (list.status !== 0) { errors.push(`CONSUMER-TARBALL-INVALID:${name}`); continue; }
  const entries = list.stdout.split(/\r?\n/).filter(Boolean);
  if (!entries.some((entry) => entry === 'package/dist/index.js')) errors.push(`CONSUMER-RUNTIME-MISSING:${name}`);
  if (!entries.some((entry) => entry === 'package/dist/index.d.ts')) errors.push(`CONSUMER-TYPES-MISSING:${name}`);
  if (name !== 'taliya-tokens' && !entries.some((entry) => entry === 'package/src/styles.css')) errors.push(`CONSUMER-CSS-MISSING:${name}`);
  if (entries.some((entry) => entry.includes('node_modules') || entry.includes('workspace:'))) errors.push(`CONSUMER-WORKSPACE-LEAK:${name}`);
}
if (!errors.length) {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'taliya-packed-consumer-'));
  try {
    const packageJson = {
      name: 'taliya-packed-consumer-runtime',
      private: true,
      type: 'module',
      dependencies: Object.fromEntries([...tarballs].map(([name, file]) => [`@taliya/${name.replace('taliya-', '')}`, `file:${file}`]))
    };
    fs.writeFileSync(path.join(fixture, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`);
    const tokenFile = tarballs.get('taliya-tokens');
    const uiFile = tarballs.get('taliya-ui');
    const crmFile = tarballs.get('taliya-crm');
    fs.writeFileSync(path.join(fixture, '.pnpmfile.cjs'), `module.exports = { hooks: { readPackage(pkg) {\n  if (pkg.name === '@taliya/ui') pkg.dependencies = { ...(pkg.dependencies || {}), '@taliya/tokens': 'file:${tokenFile.replaceAll('\\', '/')}'};\n  if (pkg.name === '@taliya/crm') pkg.dependencies = { ...(pkg.dependencies || {}), '@taliya/tokens': 'file:${tokenFile.replaceAll('\\', '/')}', '@taliya/ui': 'file:${uiFile.replaceAll('\\', '/')}' };\n  return pkg;\n} } };\n`);
    const installArgs = process.platform === 'win32' ? ['/d', '/s', '/c', 'pnpm install --ignore-scripts --no-frozen-lockfile'] : ['install', '--ignore-scripts', '--no-frozen-lockfile'];
    const install = spawnSync(process.platform === 'win32' ? 'cmd.exe' : 'pnpm', installArgs, { cwd: fixture, encoding: 'utf8', shell: false });
    if (install.status !== 0) {
      errors.push(`CONSUMER-INSTALL-FAILED:${(install.stderr || install.stdout || '').trim().slice(0, 2000)}`);
    } else {
      const runtime = spawnSync(process.execPath, ['--input-type=module', '-e', "const tokens=await import('@taliya/tokens'); const ui=await import('@taliya/ui'); const crm=await import('@taliya/crm'); if(!tokens || !ui.Button || !crm.CrmProductShell) process.exit(2); console.log('packed consumer runtime imports pass');"], { cwd: fixture, encoding: 'utf8' });
      if (runtime.status !== 0) errors.push(`CONSUMER-RUNTIME-FAILED:${(runtime.stderr || runtime.stdout || '').trim().slice(0, 2000)}`);
      const lock = path.join(fixture, 'pnpm-lock.yaml');
      if (fs.existsSync(lock) && fs.readFileSync(lock, 'utf8').includes('workspace:')) errors.push('CONSUMER-WORKSPACE-LEAK:lockfile');
    }
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
}
console.log(JSON.stringify({ packDir: path.relative(root, packDir).replaceAll('\\', '/'), status: errors.length ? 'fail' : 'pass', errors }, null, 2));
if (errors.length) process.exitCode = 1;
