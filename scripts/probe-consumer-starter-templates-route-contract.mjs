import { existsSync, mkdtempSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const tempDir = mkdtempSync(join(tmpdir(), "taliya-starter-route-contract-probe-"));
const originalConfigPath = resolve(specDir, "contracts/consumer-page-kit-config.example.json");
const reportJsonPath = resolve(specDir, "consumer-starter-templates-audit.json");
const reportMdPath = resolve(specDir, "consumer-starter-templates-audit.md");
const backupConfigPath = join(tempDir, "consumer-page-kit-config.example.json");
const originalReportJson = readFileSync(reportJsonPath, "utf8");
const originalReportMd = readFileSync(reportMdPath, "utf8");

copyFileSync(originalConfigPath, backupConfigPath);

function loadProbeConfig() {
  const config = JSON.parse(readFileSync(backupConfigPath, "utf8"));
  const workListRoute = config.routes?.find((route) => route.route === "/crm");
  const workListShell = workListRoute?.requiredLocalComponents?.find((requirement) => requirement.name === "CrmShellClient");

  if (!workListShell) {
    throw new Error("Expected the official starter config to contain /crm CrmShellClient as a route-local component.");
  }

  return { config, workListShell };
}

function runInvalidCase({ label, mutate, expectedContractId, expectedContractExists, expectedLinkedComponentMatches }) {
  const { config, workListShell } = loadProbeConfig();
  mutate(workListShell);
  writeFileSync(originalConfigPath, `${JSON.stringify(config, null, 2)}\n`);

  const result = spawnSync(process.execPath, ["scripts/audit-consumer-starter-templates.mjs"], {
    cwd: root,
    encoding: "utf8"
  });

  if (result.status !== 0) {
    throw new Error(`Expected consumer-starter-templates audit to compute ${label}, but it crashed.`);
  }

  if (!existsSync(reportJsonPath)) {
    throw new Error("Expected consumer-starter-templates audit to write its probe report.");
  }

  const report = JSON.parse(readFileSync(reportJsonPath, "utf8"));
  const failedRow = report.routeLocalContractRows?.find(
    (row) => row.route === "/crm" && row.componentName === "CrmShellClient"
  );

  if (
    report.status !== "fail" ||
    failedRow?.componentContractId !== expectedContractId ||
    failedRow?.contractExists !== expectedContractExists ||
    (expectedLinkedComponentMatches !== undefined && failedRow?.linkedContractComponentMatches !== expectedLinkedComponentMatches) ||
    failedRow?.pass !== false
  ) {
    throw new Error(`Expected starter templates probe report to fail for ${label}.\n${JSON.stringify(report, null, 2)}`);
  }
}

try {
  runInvalidCase({
    label: "a route-local component without componentContractId",
    mutate: (workListShell) => {
      delete workListShell.componentContractId;
    },
    expectedContractId: null,
    expectedContractExists: false
  });
  runInvalidCase({
    label: "a route-local componentContractId that points to no component contract",
    mutate: (workListShell) => {
      workListShell.componentContractId = "missing-shell-wrapper-contract";
    },
    expectedContractId: "missing-shell-wrapper-contract",
    expectedContractExists: false
  });
  runInvalidCase({
    label: "a route-local componentContractId that points to another component contract",
    mutate: (workListShell) => {
      workListShell.componentContractId = "crm-work-list-wrapper";
    },
    expectedContractId: "crm-work-list-wrapper",
    expectedContractExists: true,
    expectedLinkedComponentMatches: false
  });
} finally {
  copyFileSync(backupConfigPath, originalConfigPath);
  writeFileSync(reportJsonPath, originalReportJson);
  writeFileSync(reportMdPath, originalReportMd);
}

const restoreCheck = spawnSync(process.execPath, ["scripts/audit-consumer-starter-templates.mjs", "--check"], {
  cwd: root,
  encoding: "utf8"
});

if (restoreCheck.status !== 0) {
  console.error("Expected consumer-starter-templates audit to pass after restoring the official config.");
  console.error(`${restoreCheck.stdout ?? ""}\n${restoreCheck.stderr ?? ""}`.trim());
  process.exit(1);
}

console.log(`Consumer starter templates route contract probe passed; restored ${relative(root, originalConfigPath).replaceAll("\\", "/")}.`);
