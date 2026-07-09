import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const checkMode = args.includes("--check");
const writeMode = args.includes("--write");

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function reportBasename(baseName) {
  const label = optionValue("--report-label", "");
  if (!label) return baseName;

  const normalized = label.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

function optionalArg(name) {
  const value = optionValue(name, "");
  return value ? [name, value] : [];
}

const consumerArg = optionValue("--consumer", "../taliya-internal");
const consumerRoot = resolve(root, consumerArg);
const vendorArg = optionValue("--vendor", "vendor/taliya-product-ui");
const manifestArg = optionValue("--manifest", "dist-packages/taliya-product-ui-local-manifest.json");
const reportLabel = optionValue("--report-label", "");
const reportLabelArgs = reportLabel ? ["--report-label", reportLabel] : [];
const outputDir = resolve(root, optionValue("--out-dir", specDir));
const reportJsonPath = resolve(outputDir, `${reportBasename("consumer-refresh-audit")}.json`);
const reportMdPath = resolve(outputDir, `${reportBasename("consumer-refresh-audit")}.md`);
const commonArgs = ["--consumer", consumerRoot, "--vendor", vendorArg, "--manifest", manifestArg, ...reportLabelArgs];

function runStep(id, commandArgs, options = {}) {
  const startedAt = Date.now();
  const result = spawnSync(process.execPath, commandArgs, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20
  });

  return {
    id,
    commandText: `node ${commandArgs.join(" ")}`,
    required: options.required !== false,
    status: result.status === 0 && !result.error ? "pass" : "fail",
    exitCode: result.status,
    durationMs: Date.now() - startedAt,
    stdoutTail: (result.stdout ?? "").trim().split(/\r?\n/).filter(Boolean).slice(-12),
    stderrTail: [
      result.error ? `${result.error.name}: ${result.error.message}` : "",
      ...(result.stderr ?? "").trim().split(/\r?\n/).filter(Boolean).slice(-12)
    ].filter(Boolean)
  };
}

const steps = [
  runStep("vendor-sync", [
    "scripts/sync-consumer-vendor.mjs",
    writeMode ? "--write" : "--check",
    ...commonArgs
  ]),
  runStep("dependency-sync", [
    "scripts/sync-consumer-dependencies.mjs",
    writeMode ? "--write" : "--check",
    ...commonArgs
  ]),
  runStep("install-plan", [
    "scripts/install-consumer-packages.mjs",
    writeMode ? "--write" : "--check",
    ...commonArgs
  ]),
  runStep("lockfile", [
    "scripts/audit-consumer-lockfile.mjs",
    "--check",
    ...commonArgs,
    ...optionalArg("--out-dir")
  ]),
  runStep("package-sync", [
    "scripts/audit-consumer-package-sync.mjs",
    "--check",
    "--consumer",
    consumerRoot,
    "--vendor",
    vendorArg,
    ...reportLabelArgs
  ])
];

const failed = steps.filter((step) => step.required && step.status !== "pass");
const report = {
  generatedAt: new Date().toISOString(),
  status: failed.length === 0 ? "pass" : "fail",
  mode: writeMode ? "write" : "check",
  checkMode,
  consumerRoot,
  vendor: vendorArg,
  manifest: manifestArg,
  reportLabel: reportLabel || "default",
  steps
};

mkdirSync(outputDir, { recursive: true });
writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const rowsMd = steps
  .map((step) => `| \`${step.id}\` | \`${step.commandText}\` | ${step.status} | ${step.exitCode ?? "n/a"} | ${step.durationMs} |`)
  .join("\n");

writeFileSync(
  reportMdPath,
  `# Consumer Refresh Audit

Generated: ${report.generatedAt}

Status: ${report.status}

Mode: \`${report.mode}\`

Consumer: \`${consumerRoot}\`

Vendor: \`${vendorArg}\`

Manifest: \`${manifestArg}\`

This audit orchestrates the local package refresh flow for a consumer: vendor sync, package.json dependency sync, package install plan or install, lockfile alignment, and installed package sync.

| Step | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
${rowsMd}
`
);

console.log(`Consumer refresh audit: ${report.status}`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  console.error(`Consumer refresh failed: ${failed.map((step) => step.id).join(", ") || "unknown"}`);
  process.exit(1);
}
