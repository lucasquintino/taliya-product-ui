import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const fixtureRoot = resolve(root, `tmp/consumer-dependencies-stale-${process.pid}`);
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
    `file:vendor/taliya-product-ui/stale-${packageInfo.tarball}`
  ])
);

writeText(
  resolve(fixtureRoot, "package.json"),
  `${JSON.stringify({ name: "consumer-dependencies-stale-probe", private: true, dependencies }, null, 2)}\n`
);

const result = spawnSync(
  process.execPath,
  [
    "scripts/sync-consumer-dependencies.mjs",
    "--check",
    "--consumer",
    fixtureRoot,
    "--vendor",
    "vendor/taliya-product-ui"
  ],
  {
    cwd: root,
    encoding: "utf8"
  }
);

rmSync(fixtureRoot, { recursive: true, force: true });

if (result.status === 0) {
  console.error("Expected sync-consumer-dependencies --check to fail for stale package.json dependencies, but it passed.");
  console.error(result.stdout);
  process.exit(1);
}

const combinedOutput = `${result.stdout}\n${result.stderr}`;
if (!combinedOutput.includes("would-update") && !combinedOutput.includes("dependencies do not match")) {
  console.error("Stale dependency check failed without the expected dependency-sync failure signal.");
  console.error(combinedOutput);
  process.exit(1);
}

console.log("Consumer dependency sync stale manifest probe: pass");
