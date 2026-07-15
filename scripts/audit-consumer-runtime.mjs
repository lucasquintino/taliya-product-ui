import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

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

const consumerRoot = resolve(root, optionValue("--consumer", "../taliya-internal"));
const commandList = optionValue("--commands", "typecheck,lint,test,build")
  .split(",")
  .map((command) => command.trim())
  .filter(Boolean);
const outputDir = resolve(root, optionValue("--out-dir", specDir));
const persistReports = !checkMode || outputDir !== specDir;
const reportJsonPath = resolve(outputDir, `${reportBasename("consumer-runtime-audit")}.json`);
const reportMdPath = resolve(outputDir, `${reportBasename("consumer-runtime-audit")}.md`);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function runScript(scriptName) {
  const startedAt = Date.now();
  const command = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "npm";
  const commandArgs = process.platform === "win32"
    ? ["/d", "/s", "/c", "npm", "run", scriptName]
    : ["run", scriptName];
  const result = spawnSync(command, commandArgs, {
    cwd: consumerRoot,
    encoding: "utf8"
  });
  const durationMs = Date.now() - startedAt;
  const spawnError = result.error ? `${result.error.name}: ${result.error.message}` : "";

  return {
    script: scriptName,
    commandText: `npm run ${scriptName}`,
    status: result.status === 0 && !spawnError ? "pass" : "fail",
    exitCode: result.status,
    durationMs,
    stdout: (result.stdout ?? "").trim(),
    stderr: [spawnError, result.stderr ?? ""].filter(Boolean).join("\n").trim()
  };
}

const packageJsonPath = resolve(consumerRoot, "package.json");
const packageJsonExists = existsSync(packageJsonPath);
const packageJson = packageJsonExists ? readJson(packageJsonPath) : null;
const packageScripts = packageJson?.scripts ?? {};
const missingScripts = packageJsonExists ? commandList.filter((scriptName) => !packageScripts[scriptName]) : commandList;

const rows = [];
if (packageJsonExists && missingScripts.length === 0) {
  for (const scriptName of commandList) {
    const row = runScript(scriptName);
    rows.push(row);
    if (checkMode && row.status === "fail") break;
  }
}

const failed = rows.filter((row) => row.status === "fail");
const report = {
  generatedAt: new Date().toISOString(),
  consumerRoot,
  packageJsonExists,
  requestedScripts: commandList,
  missingScripts,
  status: packageJsonExists && missingScripts.length === 0 && failed.length === 0 && rows.length === commandList.length ? "pass" : "fail",
  rows
};

if (persistReports) {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
}

const rowsMd = rows.length
  ? rows.map((row) => `| \`${row.script}\` | \`${row.commandText}\` | ${row.status} | ${row.exitCode ?? "n/a"} | ${row.durationMs} |`).join("\n")
  : "| None | None | n/a | n/a | n/a |";
const missingMd = missingScripts.length ? missingScripts.map((scriptName) => `- \`${scriptName}\``).join("\n") : "- None";

if (persistReports) writeFileSync(
  reportMdPath,
  `# Consumer Runtime Audit

Generated: ${report.generatedAt}

Consumer: \`${consumerRoot}\`

Status: ${report.status}

This audit runs the consumer app runtime/build gates that prove the installed Taliya packages still work in the current consumer. It is not source-image 1:1 certification.

## Scripts

| Script | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
${rowsMd}

## Missing Scripts

${missingMd}
`
);

console.log(`Consumer runtime audit: ${report.status}`);
if (persistReports) {
  console.log(`Wrote ${reportMdPath}`);
  console.log(`Wrote ${reportJsonPath}`);
}

if (checkMode && report.status !== "pass") {
  const failedScripts = failed.map((row) => row.script).join(", ") || "none";
  const missing = missingScripts.join(", ") || "none";
  console.error(`Failed scripts: ${failedScripts}`);
  console.error(`Missing scripts: ${missing}`);
  process.exit(1);
}
