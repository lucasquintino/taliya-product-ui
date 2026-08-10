/* global console, process */

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validatePolicyFixture } from "./governance-fixtures.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const policyOverrideIndex = process.argv.indexOf("--policy");
const policyOverride = policyOverrideIndex >= 0 ? process.argv[policyOverrideIndex + 1] : undefined;
const policyPath = policyOverride ? resolve(repoRoot, policyOverride) : resolve(repoRoot, "governance/quality-policy.json");
const matrixPath = resolve(repoRoot, "specs/006-engineering-quality-hardening/ci-gate-matrix.md");

const expectedProfiles = [
  "sdd-only",
  "governance",
  "documentation-only",
  "tokens",
  "ui-component",
  "crm-component",
  "storybook-docs",
  "dependency-build",
  "workflow-release",
  "full"
];
const expectedGates = [
  "GATE-SDD-APPROVED",
  "G-GOV",
  "G-TYPE",
  "G-LINT",
  "G-UNIT",
  "G-COV",
  "G-ARCH",
  "G-TOKENS",
  "G-STORY-BUILD",
  "G-STORY-TEST",
  "G-A11Y",
  "G-E2E-PR",
  "G-E2E-RELEASE",
  "G-VISUAL",
  "G-SEC-RUNTIME",
  "G-SEC-TOOLCHAIN",
  "G-SEC-SAST",
  "G-SEC-SECRETS",
  "G-PERF",
  "G-PACK",
  "G-CONSUMER",
  "G-PROVENANCE",
  "G-RELEASE"
];
const expectedProfileGates = {
  "sdd-only": ["GATE-SDD-APPROVED"],
  governance: ["G-GOV", "G-LINT", "G-UNIT", "G-PROVENANCE"],
  "documentation-only": ["G-GOV", "G-PROVENANCE"],
  tokens: ["G-GOV", "G-TYPE", "G-LINT", "G-UNIT", "G-COV", "G-ARCH", "G-TOKENS", "G-STORY-BUILD", "G-STORY-TEST", "G-A11Y", "G-VISUAL", "G-PERF", "G-PACK", "G-CONSUMER", "G-PROVENANCE"],
  "ui-component": ["G-GOV", "G-TYPE", "G-LINT", "G-UNIT", "G-COV", "G-ARCH", "G-TOKENS", "G-STORY-BUILD", "G-STORY-TEST", "G-A11Y", "G-E2E-PR", "G-E2E-RELEASE", "G-VISUAL", "G-SEC-SAST", "G-PERF", "G-PACK", "G-CONSUMER", "G-PROVENANCE"],
  "crm-component": ["G-GOV", "G-TYPE", "G-LINT", "G-UNIT", "G-COV", "G-ARCH", "G-TOKENS", "G-STORY-BUILD", "G-STORY-TEST", "G-A11Y", "G-E2E-PR", "G-E2E-RELEASE", "G-VISUAL", "G-SEC-SAST", "G-PERF", "G-PACK", "G-CONSUMER", "G-PROVENANCE"],
  "storybook-docs": ["G-GOV", "G-TYPE", "G-LINT", "G-UNIT", "G-STORY-BUILD", "G-STORY-TEST", "G-A11Y", "G-E2E-PR", "G-E2E-RELEASE", "G-VISUAL", "G-PROVENANCE"],
  "dependency-build": ["G-GOV", "G-TYPE", "G-LINT", "G-UNIT", "G-ARCH", "G-SEC-RUNTIME", "G-SEC-TOOLCHAIN", "G-SEC-SAST", "G-SEC-SECRETS", "G-PERF", "G-PACK", "G-CONSUMER", "G-PROVENANCE"],
  "workflow-release": ["G-GOV", "G-LINT", "G-UNIT", "G-SEC-RUNTIME", "G-SEC-TOOLCHAIN", "G-SEC-SAST", "G-SEC-SECRETS", "G-PERF", "G-PACK", "G-CONSUMER", "G-PROVENANCE", "G-RELEASE"],
  full: expectedGates
};

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function issue(code, path, message) {
  return { code, path, message };
}

function exactKeys(actual, expected, prefix, code) {
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  return [
    ...actual.filter((value) => !expectedSet.has(value)).map((value) => issue(code, `${prefix}/${value}`, "unknown canonical identifier")),
    ...expected.filter((value) => !actualSet.has(value)).map((value) => issue(`${code}_MISSING`, prefix, `missing canonical identifier ${value}`))
  ];
}

function validatePolicy(policy) {
  const errors = [...validatePolicyFixture({ instance: policy }).errors];
  errors.push(...exactKeys(Object.keys(policy.changeProfiles ?? {}), expectedProfiles, "/changeProfiles", "POLICY_UNKNOWN_PROFILE"));
  errors.push(...exactKeys(Object.keys(policy.gates ?? {}), expectedGates, "/gates", "POLICY_UNKNOWN_GATE"));

  for (const [profileId, profile] of Object.entries(policy.changeProfiles ?? {})) {
    for (const stage of ["pr", "nightly", "release"]) {
      const expected = expectedProfileGates[profileId] ?? [];
      const actual = profile.requiredGates?.[stage] ?? [];
      if (JSON.stringify(actual) !== JSON.stringify(expected)) errors.push(issue("POLICY_PROFILE_GATE_MATRIX_DRIFT", `/changeProfiles/${profileId}/requiredGates/${stage}`, "profile gate set/order differs from ci-gate-matrix.md"));
      for (const gate of profile.requiredGates?.[stage] ?? []) {
        if (!(gate in policy.gates)) errors.push(issue("POLICY_PROFILE_GATE_REFERENCE", `/changeProfiles/${profileId}/requiredGates/${stage}`, `unknown gate ${gate}`));
      }
    }
    for (const gate of Object.keys(profile.nonApplicableGates ?? {})) {
      if (!(gate in policy.gates)) errors.push(issue("POLICY_PROFILE_NON_APPLICABLE_REFERENCE", `/changeProfiles/${profileId}/nonApplicableGates/${gate}`, `unknown gate ${gate}`));
    }
    for (const [exampleKind, paths] of Object.entries(profile.examples ?? {})) {
      if (!Array.isArray(paths) || paths.length === 0) errors.push(issue("POLICY_PROFILE_EXAMPLE_REQUIRED", `/changeProfiles/${profileId}/examples/${exampleKind}`, "profile examples must not be empty"));
    }
  }

  for (const [gateId, gate] of Object.entries(policy.gates ?? {})) {
    if (gate.blocking !== true) errors.push(issue("POLICY_GATE_NOT_BLOCKING", `/gates/${gateId}/blocking`, "all declared gates are blocking"));
    if (gate.checkModeReadOnly !== true) errors.push(issue("POLICY_GATE_NOT_READ_ONLY", `/gates/${gateId}/checkModeReadOnly`, "check mode must be read-only"));
    if (!Array.isArray(gate.negativeProbes) || gate.negativeProbes.length === 0) errors.push(issue("POLICY_GATE_NEGATIVE_PROBE_REQUIRED", `/gates/${gateId}/negativeProbes`, "every gate needs a negative probe"));
    for (const [index, probe] of (gate.negativeProbes ?? []).entries()) {
      if (!existsSync(resolve(repoRoot, probe.fixture))) errors.push(issue("POLICY_PROBE_FIXTURE_MISSING", `/gates/${gateId}/negativeProbes/${index}/fixture`, `missing fixture ${probe.fixture}`));
      if (!/^[A-Z][A-Z0-9_-]{2,63}$/.test(probe.expectedFailureCode ?? "")) errors.push(issue("POLICY_PROBE_FAILURE_CODE_INVALID", `/gates/${gateId}/negativeProbes/${index}/expectedFailureCode`, "failure code must be stable"));
    }
  }

  const matrix = readFileSync(matrixPath, "utf8");
  const matrixGateIds = [...matrix.matchAll(/^\| `(G(?:ATE-SDD-APPROVED|-[A-Z0-9-]+))` \|/gm)].map((match) => match[1]);
  if (JSON.stringify([...new Set(matrixGateIds)].sort()) !== JSON.stringify([...expectedGates].sort())) errors.push(issue("POLICY_MATRIX_GATE_DRIFT", "/gates", "policy gate inventory differs from ci-gate-matrix.md"));
  return errors;
}

const policy = readJson(policyPath);
const errors = validatePolicy(policy);
const report = {
  validator: "validate-governance",
  mode: process.argv.includes("--check") ? "check" : "check",
  policyPath: "governance/quality-policy.json",
  policyVersion: policy.policyVersion,
  profiles: Object.keys(policy.changeProfiles ?? {}).length,
  gates: Object.keys(policy.gates ?? {}).length,
  status: errors.length === 0 ? "pass" : "fail",
  errors
};
console.log(JSON.stringify(report, null, 2));
if (errors.length > 0) process.exitCode = 1;
