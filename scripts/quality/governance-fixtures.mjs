import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const fixtureRoot = resolve(repoRoot, "tests/fixtures/governance");
const policySchemaPath = resolve(
  repoRoot,
  "specs/006-engineering-quality-hardening/contracts/quality-policy.schema.json"
);
const waiverSchemaPath = resolve(
  repoRoot,
  "specs/006-engineering-quality-hardening/contracts/waiver.schema.json"
);

const expectedProfiles = new Set([
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
]);

const expectedGates = new Set([
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
]);

const policyRequired = [
  "schemaVersion",
  "policyId",
  "policyVersion",
  "constitutionVersion",
  "effectiveFrom",
  "rules",
  "changeProfiles",
  "gates",
  "architectureBudgets",
  "performanceBudgets",
  "waiverPolicy"
];

const waiverRequired = [
  "schemaVersion",
  "waiverId",
  "decision",
  "policyVersion",
  "ruleId",
  "ruleSeverity",
  "riskCategory",
  "scope",
  "reason",
  "risk",
  "compensatingControls",
  "compensatingEvidenceIds",
  "owner",
  "approvedBy",
  "trackingIssue",
  "approvalRevision",
  "createdAt",
  "approvedAt",
  "expiresAt",
  "status"
];

const safeRepositoryPath = /^(?!\/)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\/\/)[A-Za-z0-9._@-]+(?:\/[A-Za-z0-9._@-]+)*$/;
const safeMatcherPath = /^(?!\/)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\/\/)[A-Za-z0-9._@*?{}!,+-]+(?:\/[A-Za-z0-9._@*?{}!,+-]+)*$/;

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function pointerSegments(pointer) {
  if (!pointer.startsWith("/")) throw new Error(`Invalid JSON pointer: ${pointer}`);
  return pointer
    .slice(1)
    .split("/")
    .map((segment) => segment.replaceAll("~1", "/").replaceAll("~0", "~"));
}

function mutate(instance, mutation) {
  const segments = pointerSegments(mutation.path);
  let current = instance;
  for (const segment of segments.slice(0, -1)) {
    if (current === null || typeof current !== "object" || !(segment in current)) {
      throw new Error(`Mutation path does not exist: ${mutation.path}`);
    }
    current = current[segment];
  }
  const leaf = segments.at(-1);
  if (mutation.op === "replace" && !(leaf in current)) {
    throw new Error(`Replacement path does not exist: ${mutation.path}`);
  }
  if (mutation.op !== "replace" && mutation.op !== "add") {
    throw new Error(`Unsupported fixture mutation: ${mutation.op}`);
  }
  current[leaf] = clone(mutation.value);
}

export function loadGovernanceFixtures(kind) {
  const directory = resolve(fixtureRoot, kind);
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => {
      const descriptorPath = resolve(directory, entry.name);
      const descriptor = readJson(descriptorPath);
      const sourcePath = resolve(repoRoot, descriptor.source);
      const instance = clone(readJson(sourcePath));
      for (const mutation of descriptor.mutations ?? []) mutate(instance, mutation);
      return { ...descriptor, descriptorPath, sourcePath, instance };
    });
}

function error(code, path, message) {
  return { code, path, message };
}

function requiredErrors(value, required, prefix) {
  return required
    .filter((key) => !(key in value))
    .map((key) => error(`${prefix}_${key.toUpperCase()}_REQUIRED`, `/${key}`, `${key} is required`));
}

function validateSchemaContract(schema, required, expectedVersion, prefix) {
  const errors = [];
  if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema") {
    errors.push(error(`${prefix}_SCHEMA_DRAFT_REQUIRED`, "/$schema", "Draft 2020-12 is required"));
  }
  if (!required.every((key) => schema.required?.includes(key))) {
    errors.push(error(`${prefix}_SCHEMA_REQUIRED_SET`, "/required", "schema required set is incomplete"));
  }
  if (schema.properties?.schemaVersion?.const !== expectedVersion) {
    errors.push(error(`${prefix}_SCHEMA_VERSION_CONTRACT`, "/properties/schemaVersion", "schema version contract changed"));
  }
  return errors;
}

function validateOwner(value, path) {
  const errors = [];
  if (!value || typeof value !== "object") return [error("POLICY_OWNER_OBJECT_REQUIRED", path, "owner must be an object")];
  if (typeof value.id !== "string" || value.id.length < 2) errors.push(error("POLICY_RULE_OWNER_REQUIRED", `${path}/id`, "owner id must contain at least two characters"));
  if (!["team", "role", "person"].includes(value.kind)) errors.push(error("POLICY_OWNER_KIND_INVALID", `${path}/kind`, "owner kind is invalid"));
  return errors;
}

function validateSafePaths(values, path, matcher = false, code = "POLICY_INVALID_PATH") {
  if (!Array.isArray(values) || values.length === 0) return [error(`${code}_REQUIRED`, path, "at least one path is required")];
  const pattern = matcher ? safeMatcherPath : safeRepositoryPath;
  return values.flatMap((value, index) =>
    typeof value === "string" && pattern.test(value)
      ? []
      : [error(code, `${path}/${index}`, "path must be repository-relative and traversal-safe")]
  );
}

export function validatePolicyFixture(fixture) {
  const policy = fixture.instance;
  const errors = [];
  const schema = readJson(policySchemaPath);
  errors.push(...validateSchemaContract(schema, policyRequired, "1.1.0", "POLICY"));
  errors.push(...requiredErrors(policy, policyRequired, "POLICY"));
  if (policy.schemaVersion !== "1.1.0") errors.push(error("POLICY_SCHEMA_VERSION", "/schemaVersion", "schemaVersion must be 1.1.0"));

  for (const profileId of Object.keys(policy.changeProfiles ?? {})) {
    if (!expectedProfiles.has(profileId)) errors.push(error("POLICY_UNKNOWN_PROFILE", `/changeProfiles/${profileId}`, "profile is not canonical"));
    const profile = policy.changeProfiles[profileId];
    if (profile?.pathMatchers) errors.push(...validateSafePaths(profile.pathMatchers, `/changeProfiles/${profileId}/pathMatchers`, true));
    for (const stage of ["pr", "nightly", "release"]) {
      for (const gate of profile?.requiredGates?.[stage] ?? []) {
        if (!expectedGates.has(gate)) errors.push(error("POLICY_UNKNOWN_GATE", `/changeProfiles/${profileId}/requiredGates/${stage}`, "gate is not canonical"));
      }
    }
  }

  for (const gateId of Object.keys(policy.gates ?? {})) {
    if (!expectedGates.has(gateId)) errors.push(error("POLICY_UNKNOWN_GATE", `/gates/${gateId}`, "gate is not canonical"));
  }

  for (const [ruleId, rule] of Object.entries(policy.rules ?? {})) {
    if (!/^RULE_[A-Z0-9_-]+$/.test(ruleId)) errors.push(error("POLICY_RULE_ID_INVALID", `/rules/${ruleId}`, "rule id is invalid"));
    errors.push(...requiredErrors(rule, ["statement", "scope", "severity", "enforcementKind", "evidenceKinds", "owner", "references", "waiverPolicy", "lifecycle"], `POLICY_RULE_${ruleId}`));
    if (rule.owner) errors.push(...validateOwner(rule.owner, `/rules/${ruleId}/owner`));
    if (rule.scope) errors.push(...validateSafePaths(rule.scope, `/rules/${ruleId}/scope`, true));
  }
  return { errors };
}

function parseDate(value, path, errors) {
  const parsed = new Date(value);
  if (typeof value !== "string" || Number.isNaN(parsed.valueOf())) errors.push(error("WAIVER_DATE_INVALID", path, "date-time is invalid"));
  return parsed;
}

export function validateWaiverFixture(fixture) {
  const waiver = fixture.instance;
  const errors = [];
  const schema = readJson(waiverSchemaPath);
  errors.push(...validateSchemaContract(schema, waiverRequired, "1.1.0", "WAIVER"));
  errors.push(...requiredErrors(waiver, waiverRequired, "WAIVER"));
  if (waiver.schemaVersion !== "1.1.0") errors.push(error("WAIVER_SCHEMA_VERSION", "/schemaVersion", "schemaVersion must be 1.1.0"));
  if (waiver.decision !== "risk-accepted") errors.push(error("WAIVER_NONCANONICAL_DECISION", "/decision", "decision must be risk-accepted"));
  if (!["active", "expired", "revoked", "resolved"].includes(waiver.status)) errors.push(error("WAIVER_INVALID_STATUS", "/status", "status is not canonical"));
  if (waiver.scope?.paths) errors.push(...validateSafePaths(waiver.scope.paths, "/scope/paths", false, "WAIVER_INVALID_PATH"));
  if (waiver.owner?.id && waiver.owner.id === waiver.approvedBy?.id) errors.push(error("WAIVER_OWNER_APPROVER_COLLISION", "/approvedBy/id", "owner and approver must differ"));
  const createdAt = parseDate(waiver.createdAt, "/createdAt", errors);
  const approvedAt = parseDate(waiver.approvedAt, "/approvedAt", errors);
  const expiresAt = parseDate(waiver.expiresAt, "/expiresAt", errors);
  if (expiresAt.valueOf() <= approvedAt.valueOf()) errors.push(error("WAIVER_EXPIRY_ORDER", "/expiresAt", "expiry must follow approval"));
  if (expiresAt.valueOf() - createdAt.valueOf() > 60 * 24 * 60 * 60 * 1000) errors.push(error("WAIVER_EXPIRY_OVER_LIMIT", "/expiresAt", "waiver exceeds sixty days"));
  return { errors };
}
