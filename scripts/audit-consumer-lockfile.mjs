import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

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

function reportBasename(baseName) {
  const label = optionValue("--report-label", "");
  if (!label) return baseName;

  const normalized = label.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Invalid ${label} JSON: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

const consumerRoot = resolve(root, optionValue("--consumer", "../taliya-internal"));
const vendorRelative = optionValue("--vendor", "vendor/taliya-product-ui").replaceAll("\\", "/").replace(/\/$/, "");
const manifestPath = resolve(root, optionValue("--manifest", "dist-packages/taliya-product-ui-local-manifest.json"));
const lockfilePath = resolve(consumerRoot, optionValue("--lockfile", "package-lock.json"));
const readinessConfigPath = resolve(consumerRoot, optionValue("--readiness-config", "taliya-readiness.config.json"));
const registryReportPath = resolve(root, optionValue("--registry-report", "specs/001-product-ui-foundation/registry-publication-audit.json"));
const outputDir = resolve(root, optionValue("--out-dir", specDir));
const persistReports = !checkMode || outputDir !== specDir;
const reportJsonPath = resolve(outputDir, `${reportBasename("consumer-lockfile-audit")}.json`);
const reportMdPath = resolve(outputDir, `${reportBasename("consumer-lockfile-audit")}.md`);

if (!existsSync(manifestPath)) {
  console.error(`Local release manifest not found: ${manifestPath}`);
  process.exit(1);
}

if (!existsSync(lockfilePath)) {
  console.error(`Consumer lockfile not found: ${lockfilePath}`);
  process.exit(1);
}

const manifest = readJson(manifestPath, "local release manifest");
const lockfile = readJson(lockfilePath, "consumer lockfile");
const readinessConfig = existsSync(readinessConfigPath) ? readJson(readinessConfigPath, "consumer readiness config") : {};
const registryReport = existsSync(registryReportPath) ? readJson(registryReportPath, "registry publication report") : null;
if (manifest.schemaVersion !== 1 || manifest.channel !== "local-tarball" || !Array.isArray(manifest.packages)) {
  console.error("Invalid local release manifest.");
  process.exit(1);
}

const channel = readinessConfig.distribution?.channel === "npm-registry" ? "npm-registry" : "local-tarball";
const rootPackage = lockfile.packages?.[""] ?? {};
const rows = manifest.packages.map((packageInfo) => {
  const registryRow = registryReport?.rows?.find((row) => row.name === packageInfo.name && row.version === packageInfo.version);
  const expectedDependency = channel === "npm-registry"
    ? `^${packageInfo.version}`
    : `file:${vendorRelative}/${packageInfo.tarball}`;
  const expectedResolved = channel === "npm-registry"
    ? registryRow?.tarball ?? ""
    : expectedDependency;
  const rootDependency = rootPackage.dependencies?.[packageInfo.name] ?? "";
  const packageEntry = lockfile.packages?.[`node_modules/${packageInfo.name}`] ?? null;

  return {
    name: packageInfo.name,
    expectedVersion: packageInfo.version,
    lockVersion: packageEntry?.version ?? "",
    expectedDependency,
    expectedResolved,
    rootDependency,
    resolved: packageEntry?.resolved ?? "",
    entryExists: Boolean(packageEntry),
    dependencyPass: rootDependency === expectedDependency,
    versionPass: packageEntry?.version === packageInfo.version,
    resolvedPass: Boolean(expectedResolved) && packageEntry?.resolved === expectedResolved,
    integrityPass: channel !== "npm-registry" || (Boolean(registryRow?.integrity) && packageEntry?.integrity === registryRow.integrity),
    pass:
      Boolean(packageEntry) &&
      rootDependency === expectedDependency &&
      packageEntry.version === packageInfo.version &&
      Boolean(expectedResolved) &&
      packageEntry.resolved === expectedResolved &&
      (channel !== "npm-registry" || (Boolean(registryRow?.integrity) && packageEntry.integrity === registryRow.integrity))
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  status: rows.every((row) => row.pass) ? "pass" : "fail",
  checkMode,
  consumerRoot,
  lockfile: lockfilePath,
  manifest: manifestPath,
  vendor: vendorRelative,
  channel,
  readinessConfig: readinessConfigPath,
  registryReport: registryReportPath,
  rows
};

if (persistReports) {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
}

const rowsMd = rows
  .map((row) => `| \`${row.name}\` | ${row.entryExists ? "yes" : "no"} | \`${row.expectedVersion}\` | \`${row.lockVersion || "missing"}\` | ${row.dependencyPass ? "pass" : "fail"} | ${row.resolvedPass ? "pass" : "fail"} | ${row.integrityPass ? "pass" : "fail"} | ${row.pass ? "pass" : "fail"} |`)
  .join("\n");

if (persistReports) writeFileSync(
  reportMdPath,
  `# Consumer Lockfile Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit checks whether the consumer \`package-lock.json\` is aligned with its declared distribution channel. Local consumers must resolve the versioned vendor tarballs; registry consumers must resolve the exact published tarballs and integrity metadata.

Consumer: \`${consumerRoot}\`

Channel: \`${channel}\`

Lockfile: \`${lockfilePath}\`

Manifest: \`${relative(root, manifestPath).replaceAll("\\", "/")}\`

| Package | Lock entry | Expected version | Lock version | Root dependency | Resolved tarball | Integrity | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowsMd}
`
);

console.log(`Consumer lockfile audit: ${report.status}`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  console.error(`Consumer lockfile is not aligned: ${rows.filter((row) => !row.pass).map((row) => row.name).join(", ") || "unknown"}`);
  process.exit(1);
}
