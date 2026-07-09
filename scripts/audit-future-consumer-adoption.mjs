import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, relative, resolve } from "node:path";
import { validateReadinessConfig } from "./consumer-config-validation.mjs";

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

function reportBasename(baseName, label) {
  if (!label) return baseName;

  const normalized = normalizeLabel(label);
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

const discoveryPath = resolve(root, optionValue("--discovery", "specs/001-product-ui-foundation/future-consumer-discovery-audit.json"));
const reportLabel = optionValue("--report-label", "");
const outDir = resolve(root, optionValue("--out-dir", specDir));
const readinessReportDir = resolve(root, optionValue("--readiness-report-dir", specDir));
const reportBaseName = reportBasename("future-consumer-adoption-audit", reportLabel);
const reportJsonPath = resolve(outDir, `${reportBaseName}.json`);
const reportMdPath = resolve(outDir, `${reportBaseName}.md`);

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function normalizeLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function adoptionStatus(candidate) {
  const readinessConfigPath = resolve(candidate.path, "taliya-readiness.config.json");
  const row = {
    path: candidate.path,
    name: candidate.name || basename(candidate.path),
    readinessConfigPath,
    readinessConfigExists: existsSync(readinessConfigPath),
    readinessConfigValid: false,
    readinessConfigErrors: [],
    reportLabel: "",
    readinessReportPath: "",
    readinessReportExists: false,
    readinessReportStatus: "missing",
    readinessReportConsumerRoot: "",
    pass: false
  };

  if (!row.readinessConfigExists) {
    row.readinessConfigErrors.push("missing taliya-readiness.config.json");
    return row;
  }

  const readinessConfig = readJson(readinessConfigPath, `readiness config for ${row.name}`);
  const errors = validateReadinessConfig(readinessConfig);
  row.readinessConfigErrors = errors;
  row.readinessConfigValid = errors.length === 0;
  row.reportLabel = normalizeLabel(readinessConfig.reportLabel || row.name);

  if (!row.readinessConfigValid) return row;
  if (!row.reportLabel) {
    row.readinessConfigErrors.push("reportLabel or directory name must normalize to a non-empty label");
    return row;
  }

  row.readinessReportPath = resolve(readinessReportDir, `library-readiness-gate-${row.reportLabel}.json`);
  row.readinessReportExists = existsSync(row.readinessReportPath);
  if (!row.readinessReportExists) return row;

  const readinessReport = readJson(row.readinessReportPath, `readiness report for ${row.name}`);
  row.readinessReportStatus = readinessReport.status ?? "missing";
  row.readinessReportConsumerRoot = readinessReport.consumerRoot ?? "";
  row.pass =
    row.readinessReportStatus === "pass" &&
    resolve(row.readinessReportConsumerRoot) === resolve(candidate.path) &&
    readinessReport.reportLabel === row.reportLabel;

  return row;
}

if (!existsSync(discoveryPath)) {
  console.error("Missing future-consumer-discovery-audit.json. Run corepack pnpm future-consumer-discovery:audit first.");
  process.exit(1);
}

const discovery = readJson(discoveryPath, "future consumer discovery audit");
const candidates = Array.isArray(discovery.futureCrmCandidates) ? discovery.futureCrmCandidates : [];
const rows = candidates.map(adoptionStatus);
const failedRows = rows.filter((row) => !row.pass);
const discoveryStatus = discovery.status ?? "missing";
const discoveryErrors = Array.isArray(discovery.errors) ? discovery.errors : [];
const report = {
  generatedAt: new Date().toISOString(),
  status: discoveryStatus === "pass" && failedRows.length === 0 ? "pass" : "fail",
  checkMode,
  discoveryStatus,
  discoveryGeneratedAt: discovery.generatedAt ?? "",
  discoveryErrors,
  futureCrmCandidateCount: candidates.length,
  adoptedCandidateCount: rows.filter((row) => row.pass).length,
  rows,
  summary: {
    missingAdoptionEvidence: failedRows.map((row) => row.path)
  }
};

writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const tableRows = rows
  .map((row) => {
    const reportPath = row.readinessReportPath ? relative(root, row.readinessReportPath).replaceAll("\\", "/") : "none";
    const errors = row.readinessConfigErrors.length ? row.readinessConfigErrors.join("; ") : "none";
    return `| \`${row.name}\` | \`${row.path}\` | ${row.readinessConfigExists ? "yes" : "no"} | \`${row.reportLabel || "none"}\` | \`${reportPath}\` | ${row.readinessReportStatus} | ${row.pass ? "Pass" : "Fail"} | ${errors} |`;
  })
  .join("\n");

writeFileSync(
  reportMdPath,
  `# Future Consumer Adoption Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit turns future CRM discovery into adoption evidence. If no real future CRM candidate is discovered, the audit passes with zero rows and records that adoption cannot be executed yet. If candidates exist, each one must have a labeled \`library-readiness-gate-<label>.json\` report whose consumer root matches the candidate and whose status is \`pass\`.

Discovery generated: \`${report.discoveryGeneratedAt || "unknown"}\`

Discovery status: ${report.discoveryStatus}

Discovery errors: ${report.discoveryErrors.length ? report.discoveryErrors.map((error) => `\`${error}\``).join(", ") : "none"}

Future CRM candidates: ${report.futureCrmCandidateCount}

Adopted candidates: ${report.adoptedCandidateCount}

## Candidate Adoption

| Candidate | Path | Readiness config | Report label | Readiness report | Report status | Status | Config errors |
| --- | --- | --- | --- | --- | --- | --- | --- |
${tableRows || "| None | none | no | none | none | none | Pass | none |"}
`
);

console.log(`Future consumer adoption audit: ${report.status}`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  if (report.discoveryStatus !== "pass") {
    console.error(`Future CRM discovery is not pass: ${report.discoveryStatus}`);
    if (report.discoveryErrors.length) console.error(report.discoveryErrors.join("\n"));
  }
  console.error(`Future CRM candidates missing adoption evidence: ${report.summary.missingAdoptionEvidence.join(", ")}`);
  process.exit(1);
}
