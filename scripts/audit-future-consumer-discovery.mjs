import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, relative, resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const checkMode = args.includes("--check");

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function packageJsonStatus(candidateRoot) {
  const packageJsonPath = resolve(candidateRoot, "package.json");
  if (!existsSync(packageJsonPath)) return { exists: false, dependencies: {}, scripts: {} };
  const packageJson = readJson(packageJsonPath);
  return {
    exists: true,
    name: packageJson.name ?? "",
    dependencies: {
      ...(packageJson.dependencies ?? {}),
      ...(packageJson.devDependencies ?? {})
    },
    scripts: packageJson.scripts ?? {}
  };
}

function inspectCandidate(candidateRoot) {
  const name = basename(candidateRoot);
  const packageStatus = packageJsonStatus(candidateRoot);
  const hasReadinessConfig = existsSync(resolve(candidateRoot, "taliya-readiness.config.json"));
  const hasPageKitConfig = existsSync(resolve(candidateRoot, "taliya-page-kit.config.json"));
  const hasCrmRoute = existsSync(resolve(candidateRoot, "app/crm")) || existsSync(resolve(candidateRoot, "src/app/crm"));
  const taliyaDeps = Object.keys(packageStatus.dependencies).filter((dependency) => dependency.startsWith("@taliya/"));
  const requiredTaliyaDeps = ["@taliya/tokens", "@taliya/ui", "@taliya/crm"];
  const missingTaliyaDeps = requiredTaliyaDeps.filter((dependency) => !taliyaDeps.includes(dependency));
  const hasTaliyaCrmIdentity = /crm|taliya/i.test(name) || /crm|taliya/i.test(packageStatus.name ?? "");
  const excludedReasons = [];
  const nonCandidateReasons = [];

  if (name === "taliya-product-ui") excludedReasons.push("library repo");
  if (name === "taliya-internal") excludedReasons.push("current Internal consumer, not future CRM");
  if (name.startsWith("agentes-landing-system")) excludedReasons.push("landing project");
  if (!packageStatus.exists) excludedReasons.push("missing package.json");

  const score = [
    hasReadinessConfig,
    hasPageKitConfig,
    hasCrmRoute,
    taliyaDeps.length > 0,
    /crm|taliya/i.test(name)
  ].filter(Boolean).length;
  if (excludedReasons.length === 0) {
    if (!hasReadinessConfig) nonCandidateReasons.push("missing taliya-readiness.config.json");
    if (!hasPageKitConfig) nonCandidateReasons.push("missing taliya-page-kit.config.json");
    if (!hasCrmRoute) nonCandidateReasons.push("missing app/crm or src/app/crm route");
    if (taliyaDeps.length === 0) {
      nonCandidateReasons.push("missing @taliya/* package dependencies");
    } else if (missingTaliyaDeps.length > 0) {
      nonCandidateReasons.push(`missing required @taliya packages: ${missingTaliyaDeps.join(", ")}`);
    }
    if (!hasTaliyaCrmIdentity) {
      nonCandidateReasons.push(`name/packageName do not identify a Taliya CRM app (${packageStatus.name || "unnamed"})`);
    }
  }
  const hasRequiredFutureCrmEvidence =
    packageStatus.exists &&
    hasReadinessConfig &&
    hasPageKitConfig &&
    hasCrmRoute &&
    missingTaliyaDeps.length === 0 &&
    hasTaliyaCrmIdentity;

  return {
    path: candidateRoot,
    name,
    packageName: packageStatus.name ?? "",
    hasPackageJson: packageStatus.exists,
    hasReadinessConfig,
    hasPageKitConfig,
    hasCrmRoute,
    taliyaDeps,
    requiredTaliyaDeps,
    missingTaliyaDeps,
    score,
    excludedReasons,
    nonCandidateReasons,
    isFutureCrmCandidate: excludedReasons.length === 0 && hasRequiredFutureCrmEvidence
  };
}

const scanRoot = resolve(root, optionValue("--scan-root", ".."));
const reportLabel = optionValue("--report-label", "");
const outDir = resolve(root, optionValue("--out-dir", specDir));
const persistReports = !checkMode || outDir !== specDir;

function normalizedReportLabel() {
  if (!reportLabel) return "";

  const normalized = reportLabel.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return normalized;
}

function reportBasename(baseName) {
  const normalized = normalizedReportLabel();
  return normalized ? `${baseName}-${normalized}` : baseName;
}

mkdirSync(outDir, { recursive: true });

const reportBaseName = reportBasename("future-consumer-discovery-audit");
const reportJsonPath = resolve(outDir, `${reportBaseName}.json`);
const reportMdPath = resolve(outDir, `${reportBaseName}.md`);
const scanRootExists = existsSync(scanRoot);
const directories = scanRootExists
  ? readdirSync(scanRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => resolve(scanRoot, entry.name))
  : [];
const candidates = directories.map(inspectCandidate).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
const futureCrmCandidates = candidates.filter((candidate) => candidate.isFutureCrmCandidate);

const report = {
  generatedAt: new Date().toISOString(),
  reportLabel: reportLabel || "default",
  scanRoot,
  scanRootExists,
  status: scanRootExists ? "pass" : "fail",
  errors: scanRootExists ? [] : [`scan root does not exist: ${scanRoot}`],
  futureCrmCandidateCount: futureCrmCandidates.length,
  futureCrmCandidates,
  scannedCount: candidates.length,
  candidates
};

if (persistReports) writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const rows = candidates
  .filter((candidate) => candidate.score > 0 || candidate.hasPackageJson)
  .map((candidate) => {
    const excluded = candidate.excludedReasons.length ? candidate.excludedReasons.join(", ") : "none";
    const nonCandidate = candidate.nonCandidateReasons.length ? candidate.nonCandidateReasons.join("; ") : "none";
    return `| \`${candidate.name}\` | \`${candidate.packageName || "none"}\` | ${candidate.score} | ${candidate.isFutureCrmCandidate ? "yes" : "no"} | ${candidate.hasReadinessConfig ? "yes" : "no"} | ${candidate.hasPageKitConfig ? "yes" : "no"} | ${candidate.hasCrmRoute ? "yes" : "no"} | ${candidate.taliyaDeps.join(", ") || "none"} | ${excluded} | ${nonCandidate} |`;
  })
  .join("\n");

if (persistReports) writeFileSync(
  reportMdPath,
  `# Future Consumer Discovery Audit

Generated: ${report.generatedAt}

Report label: \`${report.reportLabel}\`

Status: ${report.status}

This audit scans local sibling directories for a real future CRM consumer app. It does not create or modify a consumer; it records whether a plausible app already exists for adoption gates.

Scan root: \`${scanRoot}\`

Scan root exists: ${scanRootExists ? "yes" : "no"}

Errors: ${report.errors.length ? report.errors.map((error) => `\`${error}\``).join(", ") : "none"}

Future CRM candidates found: ${futureCrmCandidates.length}

## Candidates

| Directory | Package name | Score | Future CRM candidate | Readiness config | Page-kit config | CRM route | Taliya deps | Excluded | Non-candidate reasons |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
${rows || "| None | none | 0 | no | no | no | no | none | none | none |"}

## Interpretation

${futureCrmCandidates.length > 0
  ? futureCrmCandidates.map((candidate) => `- Candidate: \`${candidate.path}\``).join("\n")
  : "- No real future CRM consumer app was found in the scanned local sibling directories."}
`
);

console.log(`Future consumer discovery audit: ${report.status}; ${futureCrmCandidates.length} candidate(s)`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  console.error(report.errors.join("\n"));
  process.exit(1);
}
