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

export function evaluateChangedCoverage({ covered, total, threshold = thresholds.changedLines }) {
  if (!Number.isInteger(covered) || !Number.isInteger(total) || covered < 0 || total < 0 || covered > total) {
    return { status: "invalid", code: "COVERAGE-CHANGED-INPUT" };
  }
  if (total === 0) return { status: "not-applicable", covered, total, percent: 100, threshold };
  const percent = Number(((covered / total) * 100).toFixed(2));
  return { status: percent >= threshold ? "pass" : "fail", covered, total, percent, threshold };
}

export function loadCoverageFixtures() {
  const directory = path.join(root, 'tests', 'fixtures', 'coverage');
  return fs.readdirSync(directory).filter((file) => file.endsWith('.json')).sort().map((file) => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')));
}
