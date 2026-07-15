import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

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
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

function runGit(consumerRoot, gitArgs) {
  return spawnSync("git", ["-C", consumerRoot, ...gitArgs], {
    cwd: root,
    encoding: "utf8"
  });
}

function gitRootStatus(consumerRoot) {
  const result = runGit(consumerRoot, ["rev-parse", "--show-toplevel"]);
  const gitRoot = (result.stdout ?? "").trim();
  return {
    isGitRepo: result.status === 0 && gitRoot.length > 0,
    gitRoot,
    error: result.status === 0 ? "" : (result.stderr ?? "").trim()
  };
}

function configStatus(consumerRoot, gitRoot, configPath) {
  const absolutePath = resolve(consumerRoot, configPath);
  const exists = existsSync(absolutePath);
  const relativeToConsumer = relative(consumerRoot, absolutePath).replaceAll("\\", "/");
  const relativeToGitRoot = gitRoot ? relative(gitRoot, absolutePath).replaceAll("\\", "/") : relativeToConsumer;
  const trackedResult = gitRoot ? runGit(consumerRoot, ["ls-files", "--error-unmatch", relativeToGitRoot]) : { status: 1, stderr: "" };
  const statusResult = gitRoot ? runGit(consumerRoot, ["status", "--short", "--", relativeToGitRoot]) : { stdout: "" };
  let jsonValid = false;
  let jsonError = "";

  if (exists) {
    try {
      JSON.parse(readFileSync(absolutePath, "utf8"));
      jsonValid = true;
    } catch (error) {
      jsonError = error instanceof Error ? error.message : String(error);
    }
  }

  return {
    path: relativeToConsumer,
    absolutePath,
    exists,
    jsonValid,
    jsonError,
    gitPath: relativeToGitRoot,
    tracked: trackedResult.status === 0,
    gitStatus: (statusResult.stdout ?? "").trim(),
    pass: exists && jsonValid && trackedResult.status === 0
  };
}

const consumerRoot = resolve(root, optionValue("--consumer", "../taliya-internal"));
const readinessConfig = optionValue("--readiness-config", "taliya-readiness.config.json");
const pageKitConfig = optionValue("--page-kit-config", "taliya-page-kit.config.json");
const reportLabel = optionValue("--report-label", "");
const outputDir = resolve(root, optionValue("--out-dir", specDir));
const persistReports = !checkMode || outputDir !== specDir;
const reportBaseName = reportBasename("consumer-config-versioning-audit", reportLabel);
const reportJsonPath = resolve(outputDir, `${reportBaseName}.json`);
const reportMdPath = resolve(outputDir, `${reportBaseName}.md`);

const rootStatus = existsSync(consumerRoot)
  ? gitRootStatus(consumerRoot)
  : { isGitRepo: false, gitRoot: "", error: "Consumer root does not exist" };
const configRows = [
  configStatus(consumerRoot, rootStatus.gitRoot, readinessConfig),
  configStatus(consumerRoot, rootStatus.gitRoot, pageKitConfig)
];
const failed = configRows.filter((row) => !row.pass);

const report = {
  generatedAt: new Date().toISOString(),
  status: rootStatus.isGitRepo && failed.length === 0 ? "pass" : "fail",
  checkMode,
  consumerRoot,
  reportLabel: reportLabel || "default",
  git: rootStatus,
  configRows,
  summary: {
    failedConfigs: failed.map((row) => row.path),
    untrackedConfigs: configRows.filter((row) => row.exists && !row.tracked).map((row) => row.path),
    missingConfigs: configRows.filter((row) => !row.exists).map((row) => row.path),
    invalidJsonConfigs: configRows.filter((row) => row.exists && !row.jsonValid).map((row) => row.path)
  }
};

if (persistReports) {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
}

const rows = configRows
  .map((row) => {
    const status = row.pass ? "Pass" : "Fail";
    const gitStatus = row.gitStatus ? `\`${row.gitStatus}\`` : "clean/tracked";
    const json = row.jsonValid ? "valid" : row.jsonError || "n/a";
    return `| \`${row.path}\` | ${row.exists ? "yes" : "no"} | ${json} | ${row.tracked ? "yes" : "no"} | ${gitStatus} | ${status} |`;
  })
  .join("\n");

if (persistReports) writeFileSync(
  reportMdPath,
  `# Consumer Config Versioning Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit checks whether consumer-owned Taliya readiness config files exist, are parseable JSON, and are tracked by the consumer repository. It is part of the aggregate readiness gate for configured consumers.

Consumer: \`${consumerRoot}\`

Report label: \`${report.reportLabel}\`

Git repo: ${rootStatus.isGitRepo ? "yes" : "no"}

Git root: \`${rootStatus.gitRoot || "n/a"}\`

## Config Files

| File | Exists | JSON | Git tracked | Git status | Status |
| --- | --- | --- | --- | --- | --- |
${rows}

## Summary

- Missing configs: ${report.summary.missingConfigs.map((item) => `\`${item}\``).join(", ") || "None"}
- Invalid JSON configs: ${report.summary.invalidJsonConfigs.map((item) => `\`${item}\``).join(", ") || "None"}
- Untracked configs: ${report.summary.untrackedConfigs.map((item) => `\`${item}\``).join(", ") || "None"}
`
);

console.log(`Consumer config versioning audit: ${report.status}`);
if (persistReports) {
  console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
  console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);
}

if (checkMode && report.status !== "pass") {
  console.error(`Consumer config files are not versioning-clean: ${report.summary.failedConfigs.join(", ") || "unknown"}`);
  process.exit(1);
}
