import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const fixtureRoot = resolve(root, `tmp/consumer-lockfile-stale-${process.pid}`);
const manifest = JSON.parse(readFileSync(resolve(root, "dist-packages/taliya-product-ui-local-manifest.json"), "utf8"));

function writeText(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

rmSync(fixtureRoot, { recursive: true, force: true });
mkdirSync(fixtureRoot, { recursive: true });

const dependencies = Object.fromEntries(
  manifest.packages.map((packageInfo) => [
    packageInfo.name,
    `file:vendor/taliya-product-ui/${packageInfo.tarball}`
  ])
);
const packages = {
  "": {
    name: "consumer-lockfile-stale-probe",
    version: "0.0.0",
    dependencies
  }
};

for (const packageInfo of manifest.packages) {
  packages[`node_modules/${packageInfo.name}`] = {
    version: packageInfo.version,
    resolved: `file:vendor/taliya-product-ui/stale-${packageInfo.tarball}`
  };
}

writeText(
  resolve(fixtureRoot, "package-lock.json"),
  `${JSON.stringify({ name: "consumer-lockfile-stale-probe", version: "0.0.0", lockfileVersion: 3, requires: true, packages }, null, 2)}\n`
);

const result = spawnSync(
  process.execPath,
  [
    "scripts/audit-consumer-lockfile.mjs",
    "--check",
    "--consumer",
    fixtureRoot,
    "--vendor",
    "vendor/taliya-product-ui",
    "--out-dir",
    "tmp/consumer-lockfile-stale-probe",
    "--report-label",
    "stale-probe"
  ],
  {
    cwd: root,
    encoding: "utf8"
  }
);

rmSync(fixtureRoot, { recursive: true, force: true });

if (result.status === 0) {
  console.error("Expected consumer lockfile audit to fail for stale resolved tarballs, but it passed.");
  console.error(result.stdout);
  process.exit(1);
}

const combinedOutput = `${result.stdout}\n${result.stderr}`;
if (!combinedOutput.includes("Consumer lockfile audit: fail") && !combinedOutput.includes("not aligned")) {
  console.error("Stale lockfile failed without the expected lockfile failure signal.");
  console.error(combinedOutput);
  process.exit(1);
}

console.log("Consumer lockfile stale probe: pass");
