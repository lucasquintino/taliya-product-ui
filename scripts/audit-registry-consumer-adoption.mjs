import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const check = args.includes("--check");

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

const consumerRoot = resolve(root, optionValue("--consumer", "../taliya-internal"));
const specDir = resolve(root, "specs/001-product-ui-foundation");
const reportJsonPath = resolve(specDir, "registry-consumer-adoption-audit.json");
const reportMdPath = resolve(specDir, "registry-consumer-adoption-audit.md");
const existingReport = existsSync(reportJsonPath) ? JSON.parse(readFileSync(reportJsonPath, "utf8")) : null;

function readJson(filePath) {
  return existsSync(filePath) ? JSON.parse(readFileSync(filePath, "utf8")) : null;
}

const registryPublication = readJson(resolve(specDir, "registry-publication-audit.json"));
const consumerPackage = readJson(resolve(consumerRoot, "package.json"));
const lockfile = readJson(resolve(consumerRoot, "package-lock.json"));
const readinessConfig = readJson(resolve(consumerRoot, "taliya-readiness.config.json"));
const packageSpecs = ["tokens", "ui", "crm"].map((directory) => {
  const packageJson = readJson(resolve(root, "packages", directory, "package.json"));
  return { name: packageJson.name, version: packageJson.version };
});
const version = packageSpecs[0]?.version ?? "";
const expectedRange = `^${version}`;

const rows = packageSpecs.map((spec) => {
  const dependency = consumerPackage?.dependencies?.[spec.name] ?? null;
  const rootLockDependency = lockfile?.packages?.[""]?.dependencies?.[spec.name] ?? null;
  const lockEntry = lockfile?.packages?.[`node_modules/${spec.name}`] ?? null;
  const installedPackage = readJson(resolve(consumerRoot, "node_modules", ...spec.name.split("/"), "package.json"));
  const registryResolved = typeof lockEntry?.resolved === "string" && lockEntry.resolved.startsWith("https://registry.npmjs.org/");
  const pass =
    dependency === expectedRange &&
    rootLockDependency === expectedRange &&
    lockEntry?.version === version &&
    registryResolved &&
    installedPackage?.version === version;
  return {
    ...spec,
    expectedRange,
    dependency,
    rootLockDependency,
    lockVersion: lockEntry?.version ?? null,
    lockResolved: lockEntry?.resolved ?? null,
    installedVersion: installedPackage?.version ?? null,
    registryResolved,
    pass
  };
});

const registryPublicationPass =
  registryPublication?.status === "pass-published" &&
  registryPublication?.currentVersion === version;
const distributionConfigPass =
  readinessConfig?.distribution?.channel === "npm-registry" &&
  readinessConfig?.distribution?.version === version;
const noEffectiveVendorDependencies = rows.every((row) =>
  !String(row.dependency ?? "").startsWith("file:") &&
  !String(row.rootLockDependency ?? "").startsWith("file:") &&
  !String(row.lockResolved ?? "").startsWith("file:")
);
const status =
  registryPublicationPass &&
  distributionConfigPass &&
  noEffectiveVendorDependencies &&
  rows.every((row) => row.pass)
    ? "pass-registry-adoption"
    : "not-adopted";
const report = {
  generatedAt: check && existingReport?.generatedAt ? existingReport.generatedAt : new Date().toISOString(),
  status,
  consumerRoot,
  currentVersion: version,
  registryPublicationPass,
  distributionConfigPass,
  noEffectiveVendorDependencies,
  adoptedPackageCount: rows.filter((row) => row.pass).length,
  expectedPackageCount: rows.length,
  rows
};
const markdown = `# Registry Consumer Adoption Audit

Generated: ${report.generatedAt}

Status: ${status}

This report proves that the real Internal consumer uses the published npm packages rather than vendored tarball dependency sources.

- Consumer: \`${consumerRoot}\`
- Version: \`${version}\`
- Registry publication: ${registryPublicationPass ? "pass" : "missing"}
- Distribution config: ${distributionConfigPass ? "pass" : "pending"}
- No effective vendor dependencies: ${noEffectiveVendorDependencies ? "pass" : "fail"}
- Adopted packages: ${report.adoptedPackageCount}/${rows.length}

| Package | Dependency | Root lock | Locked version | Registry resolved | Installed | Status |
| --- | --- | --- | --- | --- | --- | --- |
${rows.map((row) => `| \`${row.name}\` | \`${row.dependency ?? "missing"}\` | \`${row.rootLockDependency ?? "missing"}\` | \`${row.lockVersion ?? "missing"}\` | ${row.registryResolved ? "yes" : "no"} | \`${row.installedVersion ?? "missing"}\` | ${row.pass ? "pass" : "pending"} |`).join("\n")}
`;

if (check) {
  const currentJson = existsSync(reportJsonPath) ? readFileSync(reportJsonPath, "utf8") : "";
  const currentMd = existsSync(reportMdPath) ? readFileSync(reportMdPath, "utf8") : "";
  if (currentJson !== `${JSON.stringify(report, null, 2)}\n` || currentMd !== markdown) {
    console.error("Registry consumer adoption audit is stale. Run `corepack pnpm registry-consumer-adoption:audit:update`.");
    process.exit(1);
  }
} else {
  writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(reportMdPath, markdown);
}

console.log(`Registry consumer adoption audit: ${status}; ${report.adoptedPackageCount}/${rows.length} packages.`);
if (status !== "pass-registry-adoption") process.exit(1);
