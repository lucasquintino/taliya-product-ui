import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/consumer-package-sync-stale-installed-probe");
const reportDir = resolve(root, "tmp/consumer-package-sync-stale-installed-probe-report");
const localReleaseManifest = JSON.parse(readFileSync(resolve(root, "dist-packages/taliya-product-ui-local-manifest.json"), "utf8"));
const packageFiles = localReleaseManifest.packages.map((packageInfo) => packageInfo.tarball);
const installedFiles = [
  ["packages/tokens", "node_modules/@taliya/tokens", ["README.md", "dist/index.d.ts", "dist/index.js", "src/tokens.css"]],
  ["packages/ui", "node_modules/@taliya/ui", ["README.md", "dist/index.d.ts", "dist/index.js", "src/styles.css"]],
  [
    "packages/crm",
    "node_modules/@taliya/crm",
    ["README.md", "dist/index.d.ts", "dist/index.js", "dist/standard-page-kit.d.ts", "dist/standard-page-kit.js", "src/styles.css"]
  ]
];

rmSync(probeRoot, { force: true, recursive: true });
rmSync(reportDir, { force: true, recursive: true });
mkdirSync(resolve(probeRoot, "vendor/taliya-product-ui"), { recursive: true });

for (const fileName of packageFiles) {
  const sourcePath = resolve(root, "dist-packages", fileName);
  if (!existsSync(sourcePath)) {
    console.error(`Probe setup failed: missing local tarball ${sourcePath}`);
    process.exit(1);
  }
  copyFileSync(sourcePath, resolve(probeRoot, "vendor/taliya-product-ui", fileName));
}

for (const [sourceRoot, installedRoot, files] of installedFiles) {
  for (const file of files) {
    const sourcePath = resolve(root, sourceRoot, file);
    const installedPath = resolve(probeRoot, installedRoot, file);
    if (!existsSync(sourcePath)) {
      console.error(`Probe setup failed: missing source package file ${sourcePath}`);
      process.exit(1);
    }
    mkdirSync(dirname(installedPath), { recursive: true });
    cpSync(sourcePath, installedPath);
  }
}

const staleFile = resolve(probeRoot, "node_modules/@taliya/crm/dist/index.d.ts");
const staleText = readFileSync(staleFile, "utf8").replace(' | "compact-stacked"', "");
writeFileSync(staleFile, staleText);

const result = spawnSync(
  process.execPath,
  [
    "scripts/audit-consumer-package-sync.mjs",
    "--check",
    "--consumer",
    probeRoot,
    "--vendor",
    "vendor/taliya-product-ui",
    "--out-dir",
    reportDir,
    "--report-label",
    "stale-installed-probe"
  ],
  {
    cwd: root,
    encoding: "utf8"
  }
);

if (result.status === 0) {
  console.error("Negative probe failed: stale installed @taliya/crm dist/index.d.ts was accepted.");
  process.exit(1);
}

const combinedOutput = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!combinedOutput.includes("@taliya/crm/dist/index.d.ts")) {
  console.error("Negative probe failed: stale installed file was not reported in the audit output.");
  console.error(combinedOutput);
  process.exit(1);
}

console.log("Negative probe passed: stale installed package files fail the consumer package sync audit.");
