import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const checkMode = process.argv.includes("--check");

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function normalizeLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function reportBasename(baseName, label) {
  if (!label) return baseName;

  const normalized = normalizeLabel(label);
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

const decisionPath = resolve(root, optionValue("--decision", "specs/001-product-ui-foundation/certification-scope-decision.json"));
const reportLabel = optionValue("--report-label", "");
const reportBaseName = reportBasename("certification-scope-decision-audit", reportLabel);
const reportJsonPath = resolve(specDir, `${reportBaseName}.json`);
const reportMdPath = resolve(specDir, `${reportBaseName}.md`);
const examplePath = resolve(specDir, "contracts/certification-scope-decision.example.json");

const allowedScopes = ["full-image-1:1-required", "current-internal-library-readiness-accepted"];
const requiredAcceptanceStatements = [
  "I understand this does not certify every approved CRM image as 1:1.",
  "I accept current Internal/library readiness as the scoped completion bar.",
  "Remaining source-image parity work stays tracked in the visual certification backlog."
];

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function validateDecision(decision) {
  const errors = [];
  if (!decision || typeof decision !== "object" || Array.isArray(decision)) {
    return ["Decision root must be an object"];
  }

  if (!allowedScopes.includes(decision.scope)) {
    errors.push(`scope must be one of: ${allowedScopes.join(", ")}`);
  }

  if (decision.scope === "current-internal-library-readiness-accepted") {
    if (decision.accepted !== true) errors.push("accepted must be true for scoped completion acceptance");
    if (typeof decision.acceptedBy !== "string" || decision.acceptedBy.trim().length === 0) {
      errors.push("acceptedBy must be a non-empty string");
    }
    if (typeof decision.acceptedAt !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(decision.acceptedAt)) {
      errors.push("acceptedAt must be a YYYY-MM-DD date string");
    }
    if (!Array.isArray(decision.acceptanceStatements)) {
      errors.push("acceptanceStatements must be an array");
    } else {
      for (const statement of requiredAcceptanceStatements) {
        if (!decision.acceptanceStatements.includes(statement)) {
          errors.push(`acceptanceStatements missing: ${statement}`);
        }
      }
    }
  }

  return errors;
}

const decisionExists = existsSync(decisionPath);
const exampleExists = existsSync(examplePath);
let decision = null;
let validationErrors = [];
let exampleValidationErrors = [];
let scopedCompletionAccepted = false;

if (!exampleExists) {
  exampleValidationErrors.push("missing contracts/certification-scope-decision.example.json");
} else {
  const exampleDecision = readJson(examplePath, "certification scope decision example");
  exampleValidationErrors = validateDecision(exampleDecision);
  if (exampleDecision.scope !== "current-internal-library-readiness-accepted") {
    exampleValidationErrors.push("example scope must be current-internal-library-readiness-accepted");
  }
  if (exampleDecision.accepted !== true) {
    exampleValidationErrors.push("example accepted must be true");
  }
}

if (decisionExists) {
  decision = readJson(decisionPath, "certification scope decision");
  validationErrors = validateDecision(decision);
  scopedCompletionAccepted =
    validationErrors.length === 0 &&
    decision.scope === "current-internal-library-readiness-accepted" &&
    decision.accepted === true;
}

const report = {
  generatedAt: new Date().toISOString(),
  status: validationErrors.length === 0 && exampleValidationErrors.length === 0 ? "pass" : "fail",
  checkMode,
  decisionPath: relative(root, decisionPath).replaceAll("\\", "/"),
  decisionExists,
  examplePath: relative(root, examplePath).replaceAll("\\", "/"),
  exampleExists,
  exampleValidationErrors,
  scope: decision?.scope ?? "full-image-1:1-required",
  scopedCompletionAccepted,
  requiredAcceptanceStatements,
  validationErrors
};

writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

writeFileSync(
  reportMdPath,
  `# Certification Scope Decision Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit records whether product has explicitly scoped full source-image 1:1 certification out of goal completion. By default, when no decision file exists, full-image 1:1 certification remains required for global completion.

Decision file: \`${report.decisionPath}\`

Decision exists: ${report.decisionExists ? "yes" : "no"}

Example file: \`${report.examplePath}\`

Example valid: ${report.exampleValidationErrors.length === 0 ? "yes" : "no"}

Current scope: \`${report.scope}\`

Scoped completion accepted: ${report.scopedCompletionAccepted ? "yes" : "no"}

## Required Acceptance Statements

${requiredAcceptanceStatements.map((statement) => `- ${statement}`).join("\n")}

## Validation Errors

${report.validationErrors.length ? report.validationErrors.map((error) => `- ${error}`).join("\n") : "- None"}

## Example Validation Errors

${report.exampleValidationErrors.length ? report.exampleValidationErrors.map((error) => `- ${error}`).join("\n") : "- None"}
`
);

console.log(`Certification scope decision audit: ${report.status}`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  console.error(`Certification scope decision is invalid: ${[...validationErrors, ...exampleValidationErrors].join("; ")}`);
  process.exit(1);
}
