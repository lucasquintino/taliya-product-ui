import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const args = process.argv.slice(2);

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

const write = args.includes("--write");
const check = args.includes("--check");
const consumerRoot = resolve(root, optionValue("--consumer", "../taliya-internal"));
const registryReportPath = resolve(root, optionValue("--registry-report", "specs/001-product-ui-foundation/registry-publication-audit.json"));
const packageJsonPath = resolve(consumerRoot, "package.json");
const readinessConfigPath = resolve(consumerRoot, "taliya-readiness.config.json");

for (const filePath of [registryReportPath, packageJsonPath, readinessConfigPath]) {
  if (!existsSync(filePath)) {
    console.error(`Required migration input is missing: ${filePath}`);
    process.exit(1);
  }
}

const registryReport = JSON.parse(readFileSync(registryReportPath, "utf8"));
const packageSpecs = ["tokens", "ui", "crm"].map((directory) =>
  JSON.parse(readFileSync(resolve(root, "packages", directory, "package.json"), "utf8"))
);
const versions = new Set(packageSpecs.map((packageJson) => packageJson.version));
const version = packageSpecs[0]?.version ?? "";
const registryProven =
  registryReport.status === "pass-published" &&
  registryReport.currentVersion === version &&
  registryReport.publishedPackageCount === packageSpecs.length;

if (versions.size !== 1 || !version) {
  console.error("Official package versions are not aligned.");
  process.exit(1);
}
if (write && !registryProven) {
  console.error(`Refusing registry migration: publication is not proven for ${version}.`);
  process.exit(1);
}

const expectedRange = `^${version}`;
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const readinessConfig = JSON.parse(readFileSync(readinessConfigPath, "utf8"));
const rows = packageSpecs.map((packageSpec) => ({
  name: packageSpec.name,
  actual: packageJson.dependencies?.[packageSpec.name] ?? null,
  expected: expectedRange
}));
const distributionPass =
  readinessConfig.distribution?.channel === "npm-registry" &&
  readinessConfig.distribution?.version === version;
const dependenciesPass = rows.every((row) => row.actual === row.expected);

if (write) {
  packageJson.dependencies = packageJson.dependencies ?? {};
  for (const row of rows) packageJson.dependencies[row.name] = row.expected;
  readinessConfig.distribution = { channel: "npm-registry", version };
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  writeFileSync(readinessConfigPath, `${JSON.stringify(readinessConfig, null, 2)}\n`);

  const install = spawnSync("npm", ["install"], { cwd: consumerRoot, stdio: "inherit" });
  if (install.status !== 0) process.exit(install.status ?? 1);
}

console.log(`Consumer registry migration ${write ? "applied" : "checked"}: ${consumerRoot}`);
for (const row of rows) console.log(`${row.name}: ${row.actual ?? "missing"} -> ${row.expected}`);
console.log(`Registry publication proven: ${registryProven}`);
console.log(`Distribution config: ${distributionPass ? "current" : "pending"}`);

if (check && (!registryProven || !dependenciesPass || !distributionPass)) process.exit(1);
