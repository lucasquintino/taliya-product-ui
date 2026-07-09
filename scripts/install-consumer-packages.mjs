import { existsSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const args = process.argv.slice(2);

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

const consumerRoot = resolve(root, optionValue("--consumer", "../taliya-internal"));
const manifestPath = resolve(root, optionValue("--manifest", "dist-packages/taliya-product-ui-local-manifest.json"));
const vendorRelative = optionValue("--vendor", "vendor/taliya-product-ui").replaceAll("\\", "/").replace(/\/$/, "");
const packageJsonPath = resolve(consumerRoot, "package.json");
const write = hasFlag("--write");
const check = hasFlag("--check");

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Invalid ${label} JSON: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

if (!existsSync(manifestPath)) {
  console.error(`Local release manifest not found: ${manifestPath}`);
  process.exit(1);
}

if (!existsSync(packageJsonPath)) {
  console.error(`Consumer package.json not found: ${packageJsonPath}`);
  process.exit(1);
}

const manifest = readJson(manifestPath, "local release manifest");
if (manifest.schemaVersion !== 1 || manifest.channel !== "local-tarball" || !Array.isArray(manifest.packages)) {
  console.error("Invalid local release manifest.");
  process.exit(1);
}

const packageJson = readJson(packageJsonPath, "consumer package");
const rows = manifest.packages.map((packageRow) => {
  const expectedDependency = `file:${vendorRelative}/${packageRow.tarball}`;
  const actualDependency = packageJson.dependencies?.[packageRow.name] ?? "";
  const vendorTarballPath = resolve(consumerRoot, vendorRelative, packageRow.tarball);
  const tarballExists = existsSync(vendorTarballPath);

  return {
    name: packageRow.name,
    expectedDependency,
    actualDependency,
    vendorTarballPath,
    tarballExists,
    pass: actualDependency === expectedDependency && tarballExists
  };
});

console.log(`Consumer package install plan for ${consumerRoot}`);
for (const row of rows) {
  const status = row.pass ? "ready" : "blocked";
  const dependencyStatus = row.actualDependency === row.expectedDependency ? "dependency-ok" : "dependency-mismatch";
  const tarballStatus = row.tarballExists ? "tarball-ok" : "tarball-missing";
  console.log(`${status}: ${row.name} ${dependencyStatus} ${tarballStatus}`);
}

const failedRows = rows.filter((row) => !row.pass);
if (failedRows.length > 0) {
  console.error(`Consumer package install plan is not ready: ${failedRows.map((row) => row.name).join(", ")}`);
  process.exit(1);
}

const installArgs = [
  "install",
  "--force",
  "--no-audit",
  "--no-fund",
  ...rows.map((row) => row.expectedDependency)
];

console.log(`Install command: npm ${installArgs.join(" ")}`);

if (!write) {
  if (check) {
    console.log("Consumer package install plan check: pass");
  }
  process.exit(0);
}

const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(npmBin, installArgs, {
  cwd: consumerRoot,
  stdio: "inherit"
});

if (result.status !== 0 || result.error) {
  if (result.error) {
    console.error(`${result.error.name}: ${result.error.message}`);
  }
  process.exit(result.status ?? 1);
}

console.log(`Installed local Taliya packages in ${relative(root, consumerRoot).replaceAll("\\", "/")}`);
