#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rulesDir = path.join(root, '.codex', 'rules');
const fixturesDir = path.join(root, 'tests', 'fixtures', 'codex-rules');
const stableCodes = new Set();

function fail(code, message) {
  console.error(`${code}: ${message}`);
  process.exitCode = 1;
}

const ruleFiles = fs.existsSync(rulesDir)
  ? fs.readdirSync(rulesDir).filter((name) => name.endsWith('.json')).sort()
  : [];
if (ruleFiles.length === 0) fail('CODEX-RULES-EMPTY', 'no JSON command rules found');

const rules = new Map();
for (const file of ruleFiles) {
  const relative = path.posix.join('.codex/rules', file);
  let rule;
  try {
    rule = JSON.parse(fs.readFileSync(path.join(rulesDir, file), 'utf8'));
  } catch (error) {
    fail('CODEX-RULE-INVALID-JSON', `${relative}: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }
  if (!/^CMD-\d{3}$/.test(rule.id) || stableCodes.has(rule.id)) fail('CODEX-RULE-ID', `${relative} has duplicate/invalid id`);
  stableCodes.add(rule.id);
  if (rule.kind !== 'command-execution' || !['deny', 'require-approval'].includes(rule.decision)) fail('CODEX-RULE-KIND', `${relative} is not an execution control`);
  if (typeof rule.pattern !== 'string' || !rule.statement) fail('CODEX-RULE-METADATA', `${relative} is missing pattern or statement`);
  try { new RegExp(rule.pattern, rule.flags ?? ''); } catch (error) { fail('CODEX-RULE-REGEX', `${relative}: ${error instanceof Error ? error.message : String(error)}`); }
  for (const expectation of ['match', 'nonMatch']) {
    if (!rule.examples?.[expectation]) fail('CODEX-RULE-EXAMPLE', `${relative} has no ${expectation} example`);
  }
  rules.set(rule.id, rule);
}

const fixtureFiles = fs.existsSync(fixturesDir)
  ? fs.readdirSync(fixturesDir).filter((name) => name === 'canonical.json').sort()
  : [];
for (const file of fixtureFiles) {
  const relative = path.posix.join('tests/fixtures/codex-rules', file);
  let fixture;
  try { fixture = JSON.parse(fs.readFileSync(path.join(fixturesDir, file), 'utf8')); }
  catch (error) { fail('CODEX-FIXTURE-INVALID-JSON', `${relative}: ${error instanceof Error ? error.message : String(error)}`); continue; }
  for (const item of fixture.cases ?? []) {
    const rule = rules.get(item.ruleId);
    if (!rule) { fail('CODEX-RULE-UNKNOWN', `${relative}: ${item.ruleId}`); continue; }
    const actual = new RegExp(rule.pattern, rule.flags ?? '').test(item.command) ? 'match' : 'nonMatch';
    if (actual !== item.expected) fail('CODEX-RULE-PROBE', `${relative}: ${item.ruleId} expected ${item.expected}, got ${actual}`);
  }
}
console.log(`codex rules: ${rules.size} controls and ${fixtureFiles.length} fixture files checked`);
if (process.exitCode) process.exit(process.exitCode);
