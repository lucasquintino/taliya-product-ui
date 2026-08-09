#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const policy = JSON.parse(fs.readFileSync(path.join(root, 'governance', 'quality-policy.json'), 'utf8'));

export function selectGates({ profile, stage = 'pr' }) {
  const selected = policy.changeProfiles?.[profile];
  if (!selected) throw new Error(`GATE-PROFILE-UNKNOWN: ${profile}`);
  if (!['pr', 'nightly', 'release'].includes(stage)) throw new Error(`GATE-STAGE-UNKNOWN: ${stage}`);
  const required = selected.requiredGates?.[stage] ?? [];
  const excluded = Object.keys(selected.nonApplicableGates ?? {});
  const unknown = [...required, ...excluded].filter((gate) => !policy.gates?.[gate]);
  if (unknown.length) throw new Error(`GATE-REFERENCE-UNKNOWN: ${unknown.join(',')}`);
  return { profile, stage, requiredGates: [...new Set(required)], nonApplicableGates: excluded };
}

if (process.argv[1]?.endsWith('select-gates.mjs')) {
  const profileIndex = process.argv.indexOf('--profile');
  const stageIndex = process.argv.indexOf('--stage');
  try {
    const result = selectGates({ profile: profileIndex >= 0 ? process.argv[profileIndex + 1] : undefined, stage: stageIndex >= 0 ? process.argv[stageIndex + 1] : 'pr' });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
