#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const featurePath = path.join(root, '.specify', 'feature.json');
const registryPath = path.join(root, 'specs', 'README.md');

function fail(code, message) {
  console.error(`${code}: ${message}`);
  process.exitCode = 1;
}

let feature;
try { feature = JSON.parse(fs.readFileSync(featurePath, 'utf8')); }
catch (error) { fail('SPEC-STATUS-JSON', error instanceof Error ? error.message : String(error)); }

const expected = {
  directory: 'specs/006-engineering-quality-hardening',
  feature: '006-engineering-quality-hardening',
  phase: 'implementation',
  lifecycle: 'IMPLEMENTATION_IN_PROGRESS',
  authorization: 'APPROVED_FOR_IMPLEMENTATION',
  taskRange: 'T101-T176'
};
if (feature?.feature_directory !== expected.directory) fail('SPEC-STATUS-ACTIVE-DIRECTORY', 'active feature directory is not 006');
if (feature?.active_feature !== expected.feature) fail('SPEC-STATUS-ACTIVE-FEATURE', 'active feature is not 006');
if (feature?.phase !== expected.phase || feature?.lifecycle !== expected.lifecycle) fail('SPEC-STATUS-PHASE', 'active lifecycle is not implementation in progress');
if (feature?.authorization !== expected.authorization) fail('SPEC-STATUS-AUTHORIZATION', 'implementation authorization is not approved');
if (feature?.approved_task_range !== expected.taskRange) fail('SPEC-STATUS-TASK-RANGE', 'approved task range is not T101-T176');

const registry = fs.existsSync(registryPath) ? fs.readFileSync(registryPath, 'utf8') : '';
if (!registry.includes('`006-engineering-quality-hardening` | `IMPLEMENTATION_IN_PROGRESS` | `APPROVED_FOR_IMPLEMENTATION`')) fail('SPEC-STATUS-REGISTRY', 'README does not declare exactly the active 006 state');
for (const id of ['001-product-ui-foundation', '002-readiness-evidence-portability', '003-official-story-anatomy', '004-human-route-review', '005-joint-product-certification']) {
  if (!registry.includes(`| \`${id}\` | `)) fail('SPEC-STATUS-HISTORICAL-MISSING', `${id} is absent from specs registry`);
}
console.log('spec status: one active implementation feature and five historical feature records verified');
if (process.exitCode) process.exit(process.exitCode);
