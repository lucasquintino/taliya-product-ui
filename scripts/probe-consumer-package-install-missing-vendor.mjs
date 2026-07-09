import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const fixtureRoot = resolve(root, `tmp/consumer-package-install-missing-vendor-${process.pid}`);
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

writeText(
  resolve(fixtureRoot, "package.json"),
  `${JSON.stringify({ name: "consumer-package-install-missing-vendor-probe", private: true, dependencies }, null, 2)}\n`
);

const result = spawnSync(
  process.execPath,
  [
    "scripts/install-consumer-packages.mjs",
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
  console.error("Expected install-consumer-packages --check to fail when vendor tarballs are missing, but it passed.");
  console.error(result.stdout);
  process.exit(1);
}

const combinedOutput = `${result.stdout}\n${result.stderr}`;
if (!combinedOutput.includes("tarball-missing") && !combinedOutput.includes("install plan is not ready")) {
  console.error("Missing-vendor install plan failed without the expected failure signal.");
  console.error(combinedOutput);
  process.exit(1);
}

console.log("Consumer package install missing-vendor probe: pass");
