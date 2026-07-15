import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const outputDir = mkdtempSync(join(tmpdir(), "taliya-pack-stale-artifacts-probe-"));
const packageNames = ["tokens", "ui", "crm"];
const staleHashes = new Map();

for (const packageName of packageNames) {
  const packageJson = JSON.parse(readFileSync(resolve(root, "packages", packageName, "package.json"), "utf8"));
  const tarball = `${packageJson.name.replace("@", "").replace("/", "-")}-${packageJson.version}.tgz`;
  const staleContent = `stale-${packageName}`;
  writeFileSync(join(outputDir, tarball), staleContent);
  staleHashes.set(tarball, createHash("sha256").update(staleContent).digest("hex"));
}
writeFileSync(join(outputDir, "taliya-product-ui-local-manifest.json"), '{"schemaVersion":1,"packages":[]}\n');

const result = spawnSync(
  process.execPath,
  ["scripts/pack-local-packages.mjs", "--output-dir", outputDir],
  { cwd: root, encoding: "utf8" }
);
if (result.status !== 0) {
  console.error(result.stdout);
  console.error(result.stderr);
  process.exit(result.status ?? 1);
}

const manifest = JSON.parse(readFileSync(join(outputDir, "taliya-product-ui-local-manifest.json"), "utf8"));
if (manifest.packages.length !== packageNames.length) {
  console.error("Fresh package manifest did not contain all official packages.");
  process.exit(1);
}

for (const packageInfo of manifest.packages) {
  const bytes = readFileSync(join(outputDir, packageInfo.tarball));
  const actualHash = createHash("sha256").update(bytes).digest("hex");
  if (actualHash === staleHashes.get(packageInfo.tarball) || actualHash !== packageInfo.sha256) {
    console.error(`Stale or mismatched artifact survived packing: ${packageInfo.tarball}`);
    process.exit(1);
  }
}

console.log("Local package stale-artifact probe passed.");
