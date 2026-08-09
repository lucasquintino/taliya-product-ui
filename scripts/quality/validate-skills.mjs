#!/usr/bin/env node
/* global console, process */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const manifestPath = path.join(repoRoot, '.specify', 'integrations', 'codex.manifest.json');

function fail(code, message) {
  console.error(`${code}: ${message}`);
  process.exitCode = 1;
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

if (!fs.existsSync(manifestPath)) {
  fail('SKILL-MANIFEST-MISSING', 'codex manifest does not exist');
} else {
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    fail('SKILL-MANIFEST-INVALID-JSON', error instanceof Error ? error.message : String(error));
  }

  const files = manifest?.files;
  if (!files || typeof files !== 'object' || Array.isArray(files)) {
    fail('SKILL-MANIFEST-FILES-MISSING', 'manifest.files must be an object');
  } else {
    const entries = Object.entries(files);
    if (entries.length === 0) fail('SKILL-MANIFEST-EMPTY', 'manifest references no skills');

    for (const [relativePath, expectedHash] of entries) {
      const normalized = path.posix.normalize(relativePath.replaceAll('\\', '/'));
      if (normalized !== relativePath || path.posix.isAbsolute(relativePath) || normalized.startsWith('../')) {
        fail('SKILL-PATH-UNSAFE', `non-portable skill path: ${relativePath}`);
        continue;
      }
      if (!normalized.startsWith('.agents/skills/') || !normalized.endsWith('/SKILL.md')) {
        fail('SKILL-PATH-OUTSIDE-REGISTRY', `skill is outside .agents/skills: ${relativePath}`);
        continue;
      }
      const absolutePath = path.join(repoRoot, ...normalized.split('/'));
      if (!fs.existsSync(absolutePath)) {
        fail('SKILL-FILE-MISSING', relativePath);
        continue;
      }
      const actualHash = sha256(absolutePath);
      if (actualHash !== expectedHash) {
        fail('SKILL-HASH-MISMATCH', `${relativePath} expected ${expectedHash} got ${actualHash}`);
      }
      const content = fs.readFileSync(absolutePath, 'utf8');
      if (!/^#\s+.+/m.test(content) || !/##\s+(Purpose|Procedure|Rules)/m.test(content)) {
        fail('SKILL-METADATA-MISSING', `${relativePath} needs a title and operational section`);
      }
      if (/([A-Za-z]:[\\/]|\\\\|\/Users\/|\/home\/|C:\\Users\\)/i.test(content)) {
        fail('SKILL-CONTENT-NONPORTABLE', `${relativePath} contains a machine-specific path`);
      }
    }
    console.log(`skills: ${entries.length} repository-local manifest entries checked`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
