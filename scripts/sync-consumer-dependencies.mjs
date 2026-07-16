import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

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
const readinessConfigPath = resolve(consumerRoot, optionValue("--readiness-config", "taliya-readiness.config.json"));
const write = hasFlag("--write");
const check = hasFlag("--check");

if (!existsSync(manifestPath)) {
  console.error(`Local release manifest not found: ${manifestPath}`);
  process.exit(1);
}

if (!existsSync(packageJsonPath)) {
  console.error(`Consumer package.json not found: ${packageJsonPath}`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
if (manifest.schemaVersion !== 1 || manifest.channel !== "local-tarball" || !Array.isArray(manifest.packages)) {
  console.error("Invalid local release manifest.");
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const readinessConfig = existsSync(readinessConfigPath) ? JSON.parse(readFileSync(readinessConfigPath, "utf8")) : {};
const channel = readinessConfig.distribution?.channel === "npm-registry" ? "npm-registry" : "local-tarball";
const nextPackageJson = JSON.parse(JSON.stringify(packageJson));
nextPackageJson.dependencies = nextPackageJson.dependencies ?? {};

const rows = manifest.packages.map((packageRow) => {
  const expected = channel === "npm-registry" ? `^${packageRow.version}` : `file:${vendorRelative}/${packageRow.tarball}`;
  const actual = nextPackageJson.dependencies[packageRow.name] ?? "";
  if (write && actual !== expected) {
    nextPackageJson.dependencies[packageRow.name] = expected;
  }

  return {
    name: packageRow.name,
    expected,
    actual,
    pass: actual === expected,
    action: actual === expected ? "unchanged" : write ? "updated" : "would-update"
  };
});

const changed = JSON.stringify(packageJson, null, 2) !== JSON.stringify(nextPackageJson, null, 2);
if (write && changed) {
  writeFileSync(packageJsonPath, `${JSON.stringify(nextPackageJson, null, 2)}\n`);
}

console.log(`Consumer dependency sync ${write ? "write" : "dry-run"} for ${consumerRoot} (${channel})`);
for (const row of rows) {
  console.log(`${row.action}: ${row.name} -> ${row.expected}`);
}

const changedAfterWrite = write && rows.some((row) => row.action === "updated");
if (write && changedAfterWrite) {
  console.log(`Updated ${relative(root, packageJsonPath).replaceAll("\\", "/")}`);
}

if (check && !rows.every((row) => row.pass)) {
  console.error(`Consumer package.json dependencies do not match the ${channel} release channel.`);
  process.exit(1);
}
