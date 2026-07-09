import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const fixtureRoot = resolve(root, `tmp/consumer-vendor-sync-stale-manifest-${process.pid}`);
const vendorRoot = resolve(fixtureRoot, "vendor/taliya-product-ui");
const manifest = JSON.parse(readFileSync(resolve(root, "dist-packages/taliya-product-ui-local-manifest.json"), "utf8"));

function writeText(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

rmSync(fixtureRoot, { recursive: true, force: true });
mkdirSync(vendorRoot, { recursive: true });

for (const packageInfo of manifest.packages) {
  copyFileSync(resolve(root, packageInfo.file), resolve(vendorRoot, packageInfo.tarball));
}

writeText(
  resolve(vendorRoot, "taliya-product-ui-local-manifest.json"),
  `${JSON.stringify({ ...manifest, packages: manifest.packages.slice(0, 2) }, null, 2)}\n`
);

const result = spawnSync(
  process.execPath,
  [
    "scripts/sync-consumer-vendor.mjs",
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
  console.error("Expected sync-consumer-vendor --check to fail for a stale vendor manifest, but it passed.");
  console.error(result.stdout);
  process.exit(1);
}

const combinedOutput = `${result.stdout}\n${result.stderr}`;
if (!combinedOutput.includes("would-copy") && !combinedOutput.includes("did not produce a fully synchronized vendor directory")) {
  console.error("Stale vendor manifest failed without the expected sync failure signal.");
  console.error(combinedOutput);
  process.exit(1);
}

console.log("Consumer vendor sync stale manifest probe: pass");
