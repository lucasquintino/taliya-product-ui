/* global process */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
export const thresholds = Object.freeze({ lines: 90, functions: 90, branches: 85, changedLines: 95 });

export function validateCoveragePolicy(policy) {
  const errors = [];
  for (const [name, minimum] of Object.entries(thresholds)) if (policy.thresholds?.[name] !== minimum) errors.push({ code: `COVERAGE-THRESHOLD-${name.toUpperCase()}` });
  if (!Number.isInteger(policy.criticalRows) || policy.criticalRows < 1) errors.push({ code: 'COVERAGE-CRITICAL-BEHAVIOR' });
  return errors;
}

export function loadCoverageFixtures() {
  const directory = path.join(root, 'tests', 'fixtures', 'coverage');
  return fs.readdirSync(directory).filter((file) => file.endsWith('.json')).sort().map((file) => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')));
}
