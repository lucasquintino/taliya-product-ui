#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function stepEnd(lines, start) {
  const indent = lines[start].match(/^\s*/)?.[0].length ?? 0;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (new RegExp(`^\\s{${indent}}-\\s`).test(lines[index])) return index;
  }
  return lines.length;
}

function jobStart(lines, index) {
  for (let cursor = index; cursor >= 0; cursor -= 1) {
    if (/^  [A-Za-z0-9_-]+:\s*$/.test(lines[cursor])) return cursor;
  }
  return -1;
}

export function validateWorkflowBootstrap(source, expectedPnpmVersion, relativePath = 'workflow.yml') {
  const errors = [];
  const lines = source.replaceAll('\r\n', '\n').split('\n');
  const pnpmSteps = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (!/^-?\s*uses:\s*pnpm\/action-setup@/.test(lines[index].trimStart())) continue;
    const end = stepEnd(lines, index);
    const versionLine = lines.slice(index + 1, end).find((line) => /^\s*version:\s*/.test(line));
    const version = versionLine?.replace(/^\s*version:\s*/, '').trim().replace(/^['"]|['"]$/g, '');
    pnpmSteps.push({ index, version });
    if (version !== expectedPnpmVersion) {
      errors.push(`CI-PNPM-VERSION: ${relativePath}:${index + 1} installs pnpm ${version ?? 'without a version'}, expected ${expectedPnpmVersion}`);
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    if (!/^-?\s*uses:\s*actions\/setup-node@/.test(lines[index].trimStart())) continue;
    const end = stepEnd(lines, index);
    const cachesPnpm = lines.slice(index + 1, end).some((line) => /^\s*cache:\s*['"]?pnpm['"]?\s*$/.test(line));
    if (!cachesPnpm) continue;
    const currentJobStart = jobStart(lines, index);
    const precedingSetup = pnpmSteps.findLast((step) => step.index > currentJobStart && step.index < index);
    if (!precedingSetup) {
      errors.push(`CI-PNPM-ORDER: ${relativePath}:${index + 1} enables the pnpm cache before pnpm is installed in the same job`);
    }
  }

  if (pnpmSteps.length > 0) {
    const corepackLine = lines.findIndex((line) => /\bcorepack\s+pnpm\b/.test(line));
    if (corepackLine >= 0) {
      errors.push(`CI-PNPM-DISPATCH: ${relativePath}:${corepackLine + 1} bypasses the pnpm binary installed by pnpm/action-setup`);
    }
  }

  const storyInteractionLine = lines.findIndex((line) => /run-story-interactions\.mjs/.test(line));
  if (storyInteractionLine >= 0) {
    const browserInstallLine = lines.findIndex((line) => /playwright\s+install(?:\s+--with-deps)?\s+chromium/.test(line));
    if (browserInstallLine < 0 || browserInstallLine > storyInteractionLine) {
      errors.push(`CI-PLAYWRIGHT-INSTALL: ${relativePath}:${storyInteractionLine + 1} runs Storybook interactions before installing Chromium`);
    }
  }

  const externalConsumerLine = lines.findIndex((line) => /registry-consumer-adoption:audit/.test(line));
  if (externalConsumerLine >= 0 && /library-portability\.ya?ml$/.test(relativePath)) {
    errors.push(`CI-HERMETIC-CONSUMER: ${relativePath}:${externalConsumerLine + 1} requires an unversioned sibling consumer in a clean-clone job`);
  }

  if (/release-certification\.ya?ml$/.test(relativePath)) {
    const releaseGateLine = lines.findIndex((line) => /run-portability-gates\.mjs\s+--release/.test(line));
    const buildLine = lines.findIndex((line) => /run:\s+pnpm\s+build\s*$/.test(line));
    if (releaseGateLine >= 0 && (buildLine < 0 || buildLine > releaseGateLine)) {
      errors.push(`CI-RELEASE-BUILD-ORDER: ${relativePath}:${releaseGateLine + 1} runs distributable public API gates before building declarations`);
    }
  }

  return errors;
}

function parseLockfileOverrides(source) {
  const lines = source.replaceAll('\r\n', '\n').split('\n');
  const start = lines.findIndex((line) => line === 'overrides:');
  if (start < 0) return {};
  const overrides = {};
  for (const line of lines.slice(start + 1)) {
    if (/^\S/.test(line)) break;
    const match = line.match(/^  (.+?):\s+(.+)$/);
    if (match) overrides[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
  return overrides;
}

export function validatePackageManagerConfig(packageJson, workspaceSource, lockfileSource) {
  const errors = [];
  const match = /^pnpm@(\d+)\.(\d+)\.(\d+)$/.exec(packageJson.packageManager ?? '');
  if (!match) return ['CI-PNPM-PIN: packageManager must pin an exact pnpm version'];
  const major = Number(match[1]);
  if (major < 11 && /^(?:allowBuilds|overrides):/m.test(workspaceSource)) {
    errors.push('CI-PNPM-CONFIG: pnpm before v11 must keep overrides/build policy in package.json, not pnpm-workspace.yaml');
  }
  for (const [name, command] of Object.entries(packageJson.scripts ?? {})) {
    if (/\bcorepack\s+pnpm\b/.test(command)) {
      errors.push(`CI-PNPM-SCRIPT-DISPATCH: package.json script ${name} bypasses the pnpm binary selected by the caller`);
    }
  }
  const configuredOverrides = packageJson.pnpm?.overrides ?? {};
  const lockedOverrides = parseLockfileOverrides(lockfileSource);
  const configuredEntries = Object.entries(configuredOverrides).sort(([left], [right]) => left.localeCompare(right));
  const lockedEntries = Object.entries(lockedOverrides).sort(([left], [right]) => left.localeCompare(right));
  if (JSON.stringify(configuredEntries) !== JSON.stringify(lockedEntries)) {
    errors.push('CI-PNPM-LOCK: package.json pnpm.overrides and pnpm-lock.yaml overrides differ');
  }
  return errors;
}

export function validatePnpmSubprocessDispatch(source, relativePath = 'script.mjs') {
  const errors = [];
  const directCorepackExecution = /(?:spawnSync|spawn|execFileSync|execFile)\s*\(\s*['"]corepack(?:\.cmd)?['"]/;
  const corepackCommandVariable = /\b(?:const|let|var)\s+\w*(?:pnpm|corepack)\w*\s*=\s*[^;\r\n]*['"]corepack(?:\.cmd)?['"]/i;
  if (directCorepackExecution.test(source) || corepackCommandVariable.test(source)) {
    errors.push(`CI-PNPM-SUBPROCESS-DISPATCH: ${relativePath} bypasses the pnpm binary selected by the caller`);
  }
  return errors;
}

function walkJavaScriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : walkJavaScriptFiles(absolutePath);
    return /\.[cm]?js$/.test(entry.name) ? [absolutePath] : [];
  });
}

export function validateRepository(root) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const expectedPnpmVersion = packageJson.packageManager?.replace(/^pnpm@/, '');
  const workspaceSource = fs.readFileSync(path.join(root, 'pnpm-workspace.yaml'), 'utf8');
  const lockfileSource = fs.readFileSync(path.join(root, 'pnpm-lock.yaml'), 'utf8');
  const errors = validatePackageManagerConfig(packageJson, workspaceSource, lockfileSource);
  const workflowsDir = path.join(root, '.github', 'workflows');
  for (const name of fs.readdirSync(workflowsDir).filter((entry) => /\.ya?ml$/.test(entry)).sort()) {
    const relativePath = path.posix.join('.github/workflows', name);
    errors.push(...validateWorkflowBootstrap(fs.readFileSync(path.join(workflowsDir, name), 'utf8'), expectedPnpmVersion, relativePath));
  }
  for (const absolutePath of walkJavaScriptFiles(path.join(root, 'scripts'))) {
    const relativePath = path.relative(root, absolutePath).replaceAll(path.sep, '/');
    errors.push(...validatePnpmSubprocessDispatch(fs.readFileSync(absolutePath, 'utf8'), relativePath));
  }
  return errors;
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const root = process.cwd();
  const errors = validateRepository(root);
  for (const error of errors) console.error(error);
  if (errors.length) process.exit(1);
  console.log('CI bootstrap: package-manager pin, lockfile configuration, and workflow cache order pass');
}
