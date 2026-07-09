import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const checkMode = args.includes("--check");

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function reportBasename(baseName, label) {
  if (!label) return baseName;
  const normalized = label.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized ? `${baseName}-${normalized}` : baseName;
}

function runGit(consumerRoot, gitArgs) {
  return spawnSync("git", ["-C", consumerRoot, ...gitArgs], { cwd: root, encoding: "utf8" });
}

function fileHash(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

const consumerRoot = resolve(root, optionValue("--consumer", "../taliya-internal"));
const sourceDir = resolve(root, optionValue("--source", "dist-packages"));
const vendorDir = resolve(consumerRoot, optionValue("--vendor", "vendor/taliya-product-ui"));
const reportLabel = optionValue("--report-label", "");
const reportJsonPath = resolve(specDir, `${reportBasename("consumer-vendor-versioning-audit", reportLabel)}.json`);
const reportMdPath = resolve(specDir, `${reportBasename("consumer-vendor-versioning-audit", reportLabel)}.md`);
const localReleaseManifest = JSON.parse(readFileSync(resolve(sourceDir, "taliya-product-ui-local-manifest.json"), "utf8"));
const packageFiles = [
  ...localReleaseManifest.packages.map((packageInfo) => packageInfo.tarball),
  "taliya-product-ui-local-manifest.json"
];
const gitRootResult = runGit(consumerRoot, ["rev-parse", "--show-toplevel"]);
const gitRoot = (gitRootResult.stdout ?? "").trim();
const isGitRepo = gitRootResult.status === 0 && gitRoot.length > 0;

const rows = packageFiles.map((fileName) => {
  const sourcePath = resolve(sourceDir, fileName);
  const vendorPath = resolve(vendorDir, fileName);
  const sourceExists = existsSync(sourcePath);
  const vendorExists = existsSync(vendorPath);
  const gitPath = isGitRepo ? relative(gitRoot, vendorPath).replaceAll("\\", "/") : relative(consumerRoot, vendorPath).replaceAll("\\", "/");
  const trackedResult = isGitRepo ? runGit(consumerRoot, ["ls-files", "--error-unmatch", gitPath]) : { status: 1 };
  const statusResult = isGitRepo ? runGit(consumerRoot, ["status", "--short", "--", gitPath]) : { stdout: "" };
  const sourceSha256 = sourceExists ? fileHash(sourcePath) : "";
  const vendorSha256 = vendorExists ? fileHash(vendorPath) : "";

  return {
    fileName,
    sourceExists,
    vendorExists,
    tracked: trackedResult.status === 0,
    gitStatus: (statusResult.stdout ?? "").trim(),
    synced: sourceExists && vendorExists && sourceSha256 === vendorSha256,
    pass: sourceExists && vendorExists && trackedResult.status === 0 && sourceSha256 === vendorSha256
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  consumerRoot,
  sourceDir,
  vendorDir,
  reportLabel: reportLabel || "default",
  git: { isGitRepo, gitRoot },
  status: rows.every((row) => row.pass) ? "pass" : "fail",
  rows
};

writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(
  reportMdPath,
  `# Consumer Vendor Versioning Audit

Generated: ${report.generatedAt}

Status: ${report.status}

Consumer: \`${consumerRoot}\`

This audit checks that consumer vendor tarballs and the local release manifest exist, match local \`dist-packages\`, and are tracked by the consumer git repository.

| Package | Source exists | Vendor exists | Git tracked | Git status | Synced | Status |
| --- | --- | --- | --- | --- | --- | --- |
${rows.map((row) => `| \`${row.fileName}\` | ${row.sourceExists ? "yes" : "no"} | ${row.vendorExists ? "yes" : "no"} | ${row.tracked ? "yes" : "no"} | ${row.gitStatus ? `\`${row.gitStatus}\`` : "clean/tracked"} | ${row.synced ? "yes" : "no"} | ${row.pass ? "Pass" : "Fail"} |`).join("\n")}
`
);

console.log(`Consumer vendor versioning audit: ${report.status}`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  console.error(`Vendor versioning failed: ${rows.filter((row) => !row.pass).map((row) => row.fileName).join(", ")}`);
  process.exit(1);
}
