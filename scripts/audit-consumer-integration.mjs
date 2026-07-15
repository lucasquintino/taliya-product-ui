import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const check = args.includes("--check");

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

const consumerRoot = path.resolve(root, optionValue("--consumer", "../taliya-internal"));
const vendorDir = optionValue("--vendor", "vendor/taliya-product-ui").replaceAll("\\", "/").replace(/\/$/, "");
const reportLabel = optionValue("--report-label", "");
const outputDir = path.resolve(root, optionValue("--out-dir", specDir));
const persistReports = !check || outputDir !== specDir;

function reportBasename(baseName) {
  if (!reportLabel) return baseName;

  const normalized = reportLabel.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

const reportJsonPath = path.join(outputDir, `${reportBasename("consumer-integration-audit")}.json`);
const reportMdPath = path.join(outputDir, `${reportBasename("consumer-integration-audit")}.md`);
const standardPageKitManifestPath = path.join(specDir, "contracts/standard-page-kit.manifest.json");

const activeDirs = ["app", "components", "features"];
const extendedDirs = ["app", "components", "features", "tests", "scripts"];
const requiredPackages = ["@taliya/tokens", "@taliya/ui", "@taliya/crm"];
const vendorManifestPath = path.join(consumerRoot, vendorDir, "taliya-product-ui-local-manifest.json");
const localReleaseManifestPath = path.join(root, "dist-packages/taliya-product-ui-local-manifest.json");
const vendorManifest = fs.existsSync(vendorManifestPath) ? JSON.parse(fs.readFileSync(vendorManifestPath, "utf8")) : null;
const localReleaseManifest = fs.existsSync(localReleaseManifestPath) ? JSON.parse(fs.readFileSync(localReleaseManifestPath, "utf8")) : null;
const requiredPackageSources = Object.fromEntries(
  requiredPackages.map((packageName) => {
    const manifestRow =
      vendorManifest?.packages?.find((row) => row.name === packageName) ??
      localReleaseManifest?.packages?.find((row) => row.name === packageName);
    return [packageName, manifestRow ? `file:${vendorDir}/${manifestRow.tarball}` : ""];
  })
);
const installedPackageSpecs = [
  {
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    requiredFiles: ["package.json", "dist/index.js", "dist/index.d.ts", "src/tokens.css"],
    requiredExports: [".", "./tokens.css"]
  },
  {
    packageName: "@taliya/ui",
    packagePath: ["@taliya", "ui"],
    requiredFiles: ["package.json", "dist/index.js", "dist/index.d.ts", "src/styles.css"],
    requiredExports: [".", "./styles.css"]
  },
  {
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    requiredFiles: ["package.json", "dist/index.js", "dist/index.d.ts", "dist/standard-page-kit.js", "dist/standard-page-kit.d.ts", "src/styles.css"],
    requiredExports: [".", "./standard-page-kit", "./styles.css"]
  }
];
const installedPackageContractMarkers = [
  {
    id: "crm-product-shell-drawer-size-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type CrmProductShellDrawerSize = \"default\" | \"compact\";",
      "drawerSize?: CrmProductShellDrawerSize;"
    ]
  },
  {
    id: "crm-product-shell-compact-drawer-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-window--drawer-compact",
      "var(--taliya-layout-crm-product-shell-drawer-compact-width)",
      "var(--taliya-layout-crm-checklist-drawer-width)"
    ]
  },
  {
    id: "crm-task-drawer-compact-size-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type TaskDrawerSize = \"default\" | \"compact\";",
      "size?: TaskDrawerSize;"
    ]
  },
  {
    id: "crm-task-drawer-compact-size-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-task-drawer.tcrm-drawer-frame.tcrm-task-drawer--compact",
      "var(--taliya-layout-crm-task-drawer-compact-width)",
      "var(--taliya-control-crm-work-list-detail-filter-icon-size)"
    ]
  },
  {
    id: "crm-task-drawer-activity-order-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type TaskDrawerActivityOrder = \"history-comments\" | \"comments-history\";",
      "activityOrder?: TaskDrawerActivityOrder;"
    ]
  },
  {
    id: "crm-task-drawer-compact-density-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      "--taliya-control-crm-task-drawer-fact-row-height: var(--taliya-control-crm-task-drawer-compact-fact-row-height);",
      "--taliya-control-crm-task-drawer-header-min-height: var(--taliya-control-crm-task-drawer-compact-header-min-height);",
      "--taliya-control-crm-task-drawer-section-gap: var(--taliya-control-crm-task-drawer-compact-section-gap);",
      ".tcrm-task-drawer--compact .tcrm-task-drawer__copilot"
    ]
  },
  {
    id: "tokens-task-drawer-compact-work-list-density",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-task-drawer-compact-width: var(--taliya-layout-crm-checklist-drawer-width);",
      "--taliya-control-crm-work-list-detail-filter-padding-x: 8px;",
      "--taliya-control-crm-work-list-detail-filter-gap: 6px;",
      "--taliya-control-crm-work-list-detail-filter-icon-size: 14px;",
      "--taliya-control-crm-work-list-detail-filter-count-size: 18px;",
      "--taliya-control-crm-work-list-detail-filter-count-padding-x: 0px;"
    ]
  },
  {
    id: "tokens-task-drawer-compact-inner-density",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-control-crm-task-drawer-compact-header-min-height: 122px;",
      "--taliya-control-crm-task-drawer-compact-fact-row-height: 28px;",
      "--taliya-control-crm-task-drawer-compact-section-gap: 10px;",
      "--taliya-control-crm-task-drawer-compact-copilot-icon-size: 18px;"
    ]
  },
  {
    id: "crm-product-shell-page-header-rhythm-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type CrmProductShellFrame = \"fullscreen\" | \"window\" | \"window-inset\" | \"reference\";",
      "export type CrmProductShellPageHeaderRhythm = \"default\" | \"spacious\" | \"compact-stacked\" | \"dashboard\" | \"reports\" | \"support\" | \"internal-overview\" | \"internal-tenants\" | \"stacked\" | \"agents\" | \"agents-routines\" | \"agents-routine-detail\" | \"agents-flow-detail\" | \"agents-publish\" | \"settings-hub\" | \"overview\" | \"operation\" | \"inbox\" | \"usage\" | \"usage-overview\" | \"billing\" | \"billing-invoices\";",
      "pageHeaderRhythm?: CrmProductShellPageHeaderRhythm;"
    ]
  },
  {
    id: "crm-agent-catalog-source-frame-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-stage--frame-window-inset.tcrm-empty-shell-stage",
      ".tcrm-product-shell-stage--page-header-agents .tcrm-product-shell-page-header",
      "grid-template-columns: var(--taliya-layout-crm-agent-catalog-columns);"
    ]
  },
  {
    id: "tokens-agent-catalog-source-frame",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-agent-catalog-columns: repeat(3, minmax(280px, 445px));",
      "--taliya-layout-crm-agent-catalog-card-width: 445px;",
      "--taliya-layout-crm-product-shell-main-header-agents-height: 123px;",
      "--taliya-layout-crm-product-shell-header-agents-copy-offset-y: 31px;"
    ]
  },
  {
    id: "crm-agent-routines-source-frame-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-stage--page-header-agents-routines .tcrm-product-shell-page-header",
      ".tcrm-dashboard-page-stack:has(.tcrm-agent-routine-intro)",
      "var(--taliya-layout-crm-agent-routines-intro-grid-gap)",
      "var(--taliya-control-crm-agent-routine-card-min-height)"
    ]
  },
  {
    id: "tokens-agent-routines-source-frame",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-main-header-agents-routines-height: 175px;",
      "--taliya-layout-crm-agent-routines-max-width: 1224px;",
      "--taliya-layout-crm-agent-routines-intro-grid-gap: 25px;",
      "--taliya-control-crm-agent-routine-card-min-height: 265px;",
      "--taliya-control-crm-agent-routine-intro-gap: 27px;"
    ]
  },
  {
    id: "crm-agent-publish-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"agent-publish\"",
      "rightPanelVariant?",
      "AgentPublishRoutineWorkspace"
    ]
  },
  {
    id: "crm-agent-publish-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-stage--page-header-agents-publish .tcrm-product-shell-page-header",
      ".tcrm-product-shell-stage--content-agent-publish .tcrm-page-family-content.tcrm-product-shell-content",
      "var(--taliya-layout-crm-product-shell-content-agent-publish-padding)"
    ]
  },
  {
    id: "tokens-agent-publish-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-main-header-agents-publish-height: 85px;",
      "--taliya-layout-crm-product-shell-header-agents-publish-copy-offset-y: 0px;",
      "--taliya-layout-crm-product-shell-header-agents-publish-margin-left: 86px;",
      "--taliya-layout-crm-product-shell-content-agent-publish-padding: 0 6px 18px 82px;"
    ]
  },
  {
    id: "crm-agent-execution-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"agent-execution\"",
      "AgentFlowDrawerState = \"flow\" | \"routine\" | \"test\" | \"publish\" | \"execution\"",
      "ExecutionReceipt"
    ]
  },
  {
    id: "crm-agent-routine-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"agent-routine\"",
      "\"agents-routine-detail\"",
      "AgentRoutineWorkspace",
      "AgentFlowDrawerState = \"flow\" | \"routine\""
    ]
  },
  {
    id: "crm-agent-routine-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--agent-routine",
      ".tcrm-product-shell-stage--page-header-agents-routine-detail",
      ".tcrm-product-shell-stage--content-agent-routine",
      ".tcrm-agent-flow-drawer--routine"
    ]
  },
  {
    id: "tokens-agent-routine-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-main-header-agents-routine-detail-height: 141px;",
      "--taliya-layout-crm-agent-flow-drawer-routine-width: 388px;",
      "--taliya-layout-crm-product-shell-agent-routine-drawer-top: 143px;",
      "--taliya-control-crm-agent-routine-flow-card-routine-detail-height: 198px;"
    ]
  },
  {
    id: "crm-agent-flow-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"agent-flow\"",
      "\"agents-flow-detail\"",
      "AgentFlowWorkspace",
      "AgentFlowDrawerState = \"flow\" | \"routine\""
    ]
  },
  {
    id: "crm-agent-flow-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--agent-flow",
      ".tcrm-product-shell-stage--page-header-agents-flow-detail",
      ".tcrm-product-shell-stage--content-agent-flow",
      "var(--taliya-layout-crm-product-shell-agent-flow-drawer-right)"
    ]
  },
  {
    id: "tokens-agent-flow-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-main-header-agents-flow-detail-height: 140px;",
      "--taliya-layout-crm-product-shell-agent-flow-drawer-width: 395px;",
      "--taliya-layout-crm-product-shell-agent-flow-drawer-top: 139px;",
      "--taliya-control-crm-agent-flow-section-panel-mode-flow-detail-height: 148px;"
    ]
  },
  {
    id: "crm-agent-test-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"agent-test\"",
      "SimulationRunner",
      "AgentFlowDrawerState = \"flow\" | \"routine\" | \"test\""
    ]
  },
  {
    id: "crm-agent-test-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--agent-test .tcrm-simulation-runner",
      ".tcrm-product-shell-stage--content-agent-test",
      "var(--taliya-layout-crm-product-shell-agent-test-drawer-width)"
    ]
  },
  {
    id: "tokens-agent-test-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-agent-test-drawer-width: 382px;",
      "--taliya-layout-crm-product-shell-agent-test-drawer-top: 139px;",
      "--taliya-control-crm-simulation-runner-test-panel-height: 572px;",
      "--taliya-control-crm-simulation-runner-test-action-height: 51px;"
    ]
  },
  {
    id: "crm-agent-execution-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--drawer-panel.tcrm-right-panel-layout--agent-execution",
      "var(--taliya-layout-crm-right-panel-agent-execution-columns)",
      "var(--taliya-layout-crm-right-panel-agent-execution-offset-x)"
    ]
  },
  {
    id: "tokens-agent-execution-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-right-panel-agent-execution-main-width: 1007px;",
      "--taliya-layout-crm-right-panel-agent-execution-rail-width: 368px;",
      "--taliya-layout-crm-right-panel-agent-execution-offset-x: -5px;",
      "--taliya-layout-crm-right-panel-agent-execution-columns: var(--taliya-layout-crm-right-panel-agent-execution-main-width) var(--taliya-layout-crm-right-panel-agent-execution-rail-width);"
    ]
  },
  {
    id: "crm-settings-hub-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "layoutVariant?: \"default\" | \"opportunity\" | \"support\" | \"settings-hub\";",
      "SettingsHubCard",
      "topNavSelection?: \"auto\" | \"none\";"
    ]
  },
  {
    id: "crm-settings-hub-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-stage--page-header-settings-hub .tcrm-product-shell-page-header",
      ".tcrm-product-shell-stage--content-settings-hub .tcrm-page-family-content.tcrm-product-shell-content",
      "var(--taliya-layout-crm-product-shell-content-settings-hub-padding)"
    ]
  },
  {
    id: "tokens-settings-hub-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-main-header-settings-hub-height: 161px;",
      "--taliya-layout-crm-product-shell-header-settings-hub-copy-offset-y: 36px;",
      "--taliya-layout-crm-product-shell-header-settings-hub-margin-left: 96px;",
      "--taliya-layout-crm-product-shell-content-settings-hub-padding: 0 67px 28px 94px;"
    ]
  },
  {
    id: "crm-settings-permissions-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"settings-permissions\"",
      "SettingsPermissionsWorkspace",
      "SettingsAgentPanel"
    ]
  },
  {
    id: "crm-settings-permissions-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--settings-permissions",
      ".tcrm-product-shell-stage--content-settings-permissions .tcrm-product-shell-main::before",
      "var(--taliya-layout-crm-right-panel-settings-permissions-columns)"
    ]
  },
  {
    id: "tokens-settings-permissions-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-right-panel-settings-permissions-main-width: 887px;",
      "--taliya-layout-crm-right-panel-settings-permissions-rail-width: 440px;",
      "--taliya-layout-crm-settings-permissions-source-width: 847px;",
      "--taliya-control-crm-permission-matrix-settings-permissions-height: 256px;"
    ]
  },
  {
    id: "crm-settings-payments-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"settings-payments\"",
      "SettingsPaymentsWorkspace",
      "PaymentMethodRowState"
    ]
  },
  {
    id: "crm-settings-payments-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--settings-payments",
      ".tcrm-product-shell-stage--content-settings-payments",
      "var(--taliya-layout-crm-right-panel-settings-payments-columns)"
    ]
  },
  {
    id: "tokens-settings-payments-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-right-panel-settings-payments-main-width: 940px;",
      "--taliya-layout-crm-right-panel-settings-payments-rail-width: 352px;",
      "--taliya-control-crm-settings-payments-method-row-height: 144px;"
    ]
  },
  {
    id: "crm-settings-agenda-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"settings-agenda\"",
      "SettingsAgendaWorkspace",
      "SettingsAgendaWorkspaceProps"
    ]
  },
  {
    id: "crm-settings-agenda-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--settings-agenda",
      ".tcrm-product-shell-stage--content-settings-agenda",
      "var(--taliya-layout-crm-right-panel-settings-agenda-columns)"
    ]
  },
  {
    id: "tokens-settings-agenda-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-right-panel-settings-agenda-main-width: 884px;",
      "--taliya-layout-crm-right-panel-settings-agenda-rail-width: 382px;",
      "--taliya-control-crm-settings-agenda-first-section-height: 266px;"
    ]
  },
  {
    id: "crm-settings-notifications-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"settings-notifications\"",
      "SettingsNotificationsWorkspace",
      "SettingsNotificationsWorkspaceProps"
    ]
  },
  {
    id: "crm-settings-notifications-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--settings-notifications",
      ".tcrm-product-shell-stage--content-settings-notifications",
      "var(--taliya-layout-crm-right-panel-settings-notifications-columns)"
    ]
  },
  {
    id: "tokens-settings-notifications-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-right-panel-settings-notifications-main-width: 890px;",
      "--taliya-layout-crm-right-panel-settings-notifications-rail-width: 386px;",
      "--taliya-control-crm-settings-notifications-first-section-height: 293px;"
    ]
  },
  {
    id: "crm-billing-subscription-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "\"billing-subscription\"",
      "BillingSubscriptionWorkspace",
      "BillingSubscriptionWorkspaceProps"
    ]
  },
  {
    id: "crm-billing-subscription-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-right-panel-layout--billing-subscription",
      ".tcrm-product-shell-stage--content-billing-subscription",
      "var(--taliya-layout-crm-right-panel-billing-subscription-columns)"
    ]
  },
  {
    id: "tokens-billing-subscription-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-right-panel-billing-subscription-main-width: 934px;",
      "--taliya-layout-crm-right-panel-billing-subscription-rail-width: 334px;",
      "--taliya-type-crm-billing-subscription-drawer-title-size: 14px;"
    ]
  },
  {
    id: "crm-product-shell-content-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type CrmProductShellContentLayout =",
      "\"work-list-compact\"",
      "\"main-priority\"",
      "\"kanban\"",
      "\"agent-publish\"",
      "\"settings-hub\"",
      "\"support\"",
      "\"internal-overview\"",
      "\"internal-tenants\"",
      "\"internal-tenant-detail\"",
      "contentLayout?: CrmProductShellContentLayout;"
    ]
  },
  {
    id: "crm-product-shell-content-layout-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-stage--content-work-list .tcrm-product-shell-content",
      "var(--taliya-layout-crm-product-shell-content-work-list-padding)",
      ".tcrm-product-shell-stage--content-main-priority .tcrm-product-shell-content",
      "var(--taliya-layout-crm-product-shell-content-main-priority-padding)",
      ".tcrm-product-shell-stage--content-kanban .tcrm-product-shell-content",
      "var(--taliya-layout-crm-product-shell-content-kanban-padding)"
    ]
  },
  {
    id: "crm-internal-overview-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "browserUrl?: string;",
      "export interface SupportTicketDrawerProps",
      "variant?: \"support\" | \"internal\";",
      "export interface InternalShellProps extends Omit<CrmProductShellProps, \"variant\">"
    ]
  },
  {
    id: "crm-internal-overview-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-support-ticket-drawer--internal",
      ".tcrm-product-shell-stage--content-internal-overview .tcrm-product-shell-content",
      ".tcrm-product-shell-stage--page-header-internal-overview .tcrm-product-shell-page-header",
      ".tcrm-product-shell-stage--content-internal-overview.tcrm-product-shell-stage--drawer-floating > .tcrm-support-ticket-drawer--internal"
    ]
  },
  {
    id: "crm-internal-tenants-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type TenantSummaryDrawerState = \"active\" | \"risk\" | \"loading\" | \"blocked\" | \"closed\";",
      "export interface TenantSummaryDrawerProps",
      "export declare function TenantSummaryDrawer"
    ]
  },
  {
    id: "crm-internal-tenants-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-tenant-summary-drawer.tcrm-drawer-frame",
      ".tcrm-product-shell-stage--content-internal-tenants",
      ".tcrm-product-shell-stage--page-header-internal-tenants .tcrm-product-shell-page-header",
      ".tcrm-product-shell-stage--drawer-floating > .tcrm-tenant-summary-drawer"
    ]
  },
  {
    id: "crm-internal-tenant-detail-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export interface TenantDetailLayoutProps",
      "footerNote?: React.ReactNode;",
      "export declare function TenantDetailLayout"
    ]
  },
  {
    id: "crm-internal-tenant-detail-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-stage--content-internal-tenant-detail .tcrm-tenant-detail-layout",
      ".tcrm-product-shell-stage--content-internal-tenant-detail .tcrm-security-rule-panel",
      ".tcrm-product-shell-stage--content-internal-tenant-detail .tcrm-tenant-detail-layout__footer",
      ".tcrm-product-shell-stage--content-internal-tenant-detail .tcrm-product-shell-content"
    ]
  },
  {
    id: "crm-setup-shell-global-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export interface SetupPageProps",
      "frameVariant?: \"default\" | \"guided\" | \"guided-block\" | \"guided-main\" | \"guided-wide\" | \"guided-review\" | \"shell-global\";",
      "export declare function SetupPage"
    ]
  },
  {
    id: "crm-setup-shell-global-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-setup-page--frame-shell-global",
      ".tcrm-setup-page--frame-guided",
      ".tcrm-setup-page--frame-guided-block",
      ".tcrm-setup-page--frame-guided-main",
      ".tcrm-setup-page--frame-guided-wide",
      ".tcrm-setup-page--frame-guided-review",
      ".tcrm-setup-page--frame-shell-global .tcrm-setup-page__shell.tcrm-setup-shell",
      "--taliya-layout-crm-setup-shell-columns: var(--taliya-layout-crm-setup-shell-global-columns)",
      "--taliya-layout-crm-setup-bottom-bar-height: var(--taliya-layout-crm-setup-shell-global-bottom-bar-height)"
    ]
  },
  {
    id: "crm-setup-students-worklist-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export interface CrmWorklistTableProps",
      "caption?: React.ReactNode;",
      "export interface SetupStudentsWorkspaceProps",
      "export declare function SetupStudentsWorkspace"
    ]
  },
  {
    id: "crm-setup-students-worklist-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-setup-students-workspace__summary-grid",
      ".tcrm-setup-students-workspace .tcrm-worklist-table__caption",
      "var(--taliya-layout-crm-setup-students-summary-height)",
      "var(--taliya-layout-crm-setup-students-worklist-height)"
    ]
  },
  {
    id: "tokens-setup-students-worklist",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-setup-students-summary-height: 285px;",
      "--taliya-layout-crm-setup-students-worklist-height: 315px;",
      "--taliya-control-crm-setup-students-list-row-height: 44px;",
      "--taliya-control-crm-setup-students-worklist-row-height: 39px;"
    ]
  },
  {
    id: "crm-setup-classes-worklist-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-setup-classes-workspace__summary-grid",
      ".tcrm-setup-classes-workspace .tcrm-worklist-table__caption",
      "var(--taliya-layout-crm-setup-classes-source-card-height)",
      "var(--taliya-layout-crm-setup-classes-worklist-height)"
    ]
  },
  {
    id: "tokens-setup-classes-worklist",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-setup-classes-summary-height: 285px;",
      "--taliya-layout-crm-setup-classes-worklist-height: 315px;",
      "--taliya-layout-crm-setup-classes-source-card-height: 66px;",
      "--taliya-control-crm-setup-classes-worklist-row-height: 39px;"
    ]
  },
  {
    id: "crm-weekly-hours-schedule-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export interface WeeklyHoursGridSlot",
      "meta?: React.ReactNode;",
      "tone?: ComponentTone;",
      "axis?: string[];",
      "variant?: \"availability\" | \"schedule\";",
      "export declare function WeeklyHoursGrid"
    ]
  },
  {
    id: "crm-setup-agenda-schedule-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-setup-agenda-workspace__calendar .tcrm-weekly-hours-grid[data-variant=\"schedule\"]",
      ".tcrm-weekly-hours-grid__schedule-column button[data-tone=\"warning\"]",
      ".tcrm-setup-agenda-workspace__legend",
      "var(--taliya-layout-crm-setup-agenda-schedule-axis-rows)",
      "var(--taliya-control-crm-setup-agenda-schedule-event-height)"
    ]
  },
  {
    id: "tokens-setup-guided-wide-agenda",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-setup-shell-guided-wide-columns: 207px 1062px 338px;",
      "--taliya-layout-crm-setup-shell-guided-wide-column-gap: 15px;",
      "--taliya-layout-crm-setup-agenda-summary-height: 150px;",
      "--taliya-layout-crm-setup-agenda-body-height: 460px;",
      "--taliya-layout-crm-setup-agenda-schedule-axis-rows: repeat(6, 50px);",
      "--taliya-control-crm-setup-agenda-schedule-event-height: 44px;"
    ]
  },
  {
    id: "tokens-setup-guided-review",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-setup-shell-guided-review-columns: 210px 1064px 344px;",
      "--taliya-layout-crm-setup-shell-guided-review-topbar-height: 74px;",
      "--taliya-layout-crm-setup-shell-guided-review-body-height: 807px;",
      "--taliya-layout-crm-setup-shell-guided-review-bottom-bar-height: 52px;",
      "--taliya-control-crm-setup-shell-guided-review-step-row-height: 60px;",
      "--taliya-control-crm-setup-shell-guided-review-step-marker-size: 24px;"
    ]
  },
  {
    id: "crm-setup-welcome-agent-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export interface SetupAgentChatProps",
      "variant?: \"step\" | \"welcome\";",
      "export declare function SetupAgentChat"
    ]
  },
  {
    id: "crm-setup-welcome-agent-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-setup-agent-chat--welcome",
      ".tcrm-setup-agent-chat__message--welcome",
      ".tcrm-setup-agent-chat--welcome .tcrm-setup-agent-chat__quick-replies",
      "var(--taliya-layout-crm-setup-shell-welcome-topbar-height)",
      "var(--taliya-control-crm-setup-agent-chat-welcome-message-height)"
    ]
  },
  {
    id: "tokens-setup-welcome-agent",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-setup-shell-welcome-topbar-height: 95px;",
      "--taliya-layout-crm-setup-shell-welcome-padding: 8px 16px 16px 32px;",
      "--taliya-layout-crm-setup-agent-chat-welcome-message-width: 342px;",
      "--taliya-control-crm-setup-agent-chat-welcome-message-height: 302px;",
      "--taliya-control-crm-setup-agent-chat-welcome-quick-height: 45px;"
    ]
  },
  {
    id: "tokens-product-shell-content-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-content-work-list-padding: 0 28px 28px 27px;",
      "--taliya-layout-crm-product-shell-content-main-priority-padding: 0 28px 27px 16px;",
      "--taliya-layout-crm-product-shell-content-kanban-padding: 0 28px 28px 24px;"
    ]
  },
  {
    id: "crm-replacement-floating-drawer-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-stage--drawer-floating > .tcrm-replacement-drawer",
      "var(--taliya-layout-crm-product-shell-replacement-floating-drawer-top)",
      ".tcrm-replacement-drawer__fact[data-fact=\"credit\"]",
      "var(--taliya-control-crm-replacement-drawer-credit-fact-row-height)"
    ]
  },
  {
    id: "tokens-replacement-floating-drawer",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-replacement-floating-drawer-top: 104px;",
      "--taliya-control-crm-replacement-drawer-title-offset-top: 28px;",
      "--taliya-control-crm-replacement-drawer-credit-fact-row-height: 45px;",
      "--taliya-control-crm-replacement-drawer-footer-gap: 5px;"
    ]
  },
  {
    id: "tokens-activity-feed-source-density",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-control-crm-activity-feed-padding: 24px 30px 28px 28px;",
      "--taliya-control-crm-activity-feed-header-height: 64px;",
      "--taliya-control-crm-activity-feed-row-height: 64px;",
      "--taliya-control-crm-activity-feed-row-gap: 8px;"
    ]
  },
  {
    id: "crm-product-shell-page-header-rhythm-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-stage--page-header-spacious .tcrm-product-shell-page-header",
      "var(--taliya-layout-crm-product-shell-main-header-spacious-height)",
      ".tcrm-product-shell-stage--page-header-compact-stacked .tcrm-product-shell-page-header",
      "var(--taliya-layout-crm-product-shell-main-header-compact-stacked-height)",
      ".tcrm-product-shell-stage--page-header-dashboard .tcrm-product-shell-page-header",
      "var(--taliya-layout-crm-product-shell-main-header-dashboard-height)",
      "var(--taliya-layout-crm-product-shell-header-dashboard-copy-offset-y)",
      "var(--taliya-layout-crm-product-shell-content-dashboard-padding)",
      ".tcrm-product-shell-stage--page-header-stacked .tcrm-product-shell-page-header",
      "var(--taliya-layout-crm-product-shell-main-header-stacked-height)",
      "var(--taliya-layout-crm-product-shell-header-stacked-copy-offset-y)",
      "var(--taliya-layout-crm-product-shell-header-stacked-copy-gap)",
      "var(--taliya-layout-crm-product-shell-header-stacked-actions-offset-y)",
      ".tcrm-product-shell-stage--page-header-overview .tcrm-product-shell-page-header",
      "var(--taliya-layout-crm-product-shell-main-header-overview-height)",
      "var(--taliya-control-crm-page-filter-bar-overview-padding)"
    ]
  },
  {
    id: "tokens-product-shell-page-header-rhythm",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-main-header-spacious-height: 72px;",
      "--taliya-layout-crm-product-shell-main-header-compact-stacked-height: 72px;",
      "--taliya-layout-crm-product-shell-main-header-dashboard-height: 74px;",
      "--taliya-layout-crm-product-shell-main-header-overview-height: 90px;",
      "--taliya-layout-crm-product-shell-header-dashboard-copy-offset-y: 18px;",
      "--taliya-layout-crm-product-shell-content-dashboard-padding: 0 41px 28px 52px;",
      "--taliya-layout-crm-product-shell-main-header-stacked-height: 96px;",
      "--taliya-layout-crm-product-shell-header-stacked-copy-offset-y: 14px;",
      "--taliya-layout-crm-product-shell-header-stacked-copy-gap: 8px;",
      "--taliya-layout-crm-product-shell-header-stacked-actions-offset-y: 26px;",
      "--taliya-control-crm-page-filter-bar-overview-padding: 10px;"
    ]
  },
  {
    id: "tokens-product-shell-topnav-rhythm",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-topbar-nav-left: 458px;",
      "--taliya-control-segmented-shell-gap: 16px;",
      "--taliya-control-segmented-shell-item-height: 42px;",
      "--taliya-control-segmented-shell-item-padding-x: 22px;",
      "--taliya-color-crm-product-shell-segmented-bg: transparent;",
      "--taliya-color-crm-product-shell-segmented-border: transparent;",
      "--taliya-shadow-crm-product-shell-segmented: none;"
    ]
  },
  {
    id: "tokens-product-shell-surface-rhythm",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-surface-product-page: #F9F9FB;",
      "--taliya-shadow-crm-product-shell-panel: 0 10px 20px rgba(20, 22, 28, 0.012), 0 1px 0 rgba(255, 255, 255, 0.74) inset;",
      "--taliya-shadow-crm-product-shell-control: 0 6px 14px rgba(20, 22, 28, 0.018), 0 1px 0 rgba(255, 255, 255, 0.72) inset;"
    ]
  },
  {
    id: "ui-segmented-shell-topnav-css",
    packageName: "@taliya/ui",
    packagePath: ["@taliya", "ui"],
    file: "src/styles.css",
    requiredText: [
      ".tl-segmented--shell",
      "var(--taliya-color-crm-product-shell-segmented-bg)",
      "var(--taliya-color-crm-product-shell-segmented-border)",
      "var(--taliya-shadow-crm-product-shell-segmented)",
      "var(--taliya-control-segmented-shell-gap)",
      "var(--taliya-control-segmented-shell-padding)",
      ".tl-segmented--shell .tl-segmented__item",
      "var(--taliya-control-segmented-shell-item-height)",
      "var(--taliya-control-segmented-shell-item-padding-x)"
    ]
  },
  {
    id: "crm-shell-topnav-nav-pill-rendering",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.js",
    requiredText: [
      "export function CrmShellTopNav",
      "return (_jsx(\"nav\", { className: cn(\"tcrm-empty-shell-nav\", className)",
      "return (_jsx(CrmTopbarNavChip",
      "onChange?.(item.id)"
    ]
  },
  {
    id: "ui-official-icon-sizing-css",
    packageName: "@taliya/ui",
    packagePath: ["@taliya", "ui"],
    file: "src/styles.css",
    requiredText: [
      ".tl-icon-button--md > .tl-icon",
      "var(--taliya-control-icon-button-md-icon)",
      ".tl-filter-select > .tl-icon",
      "var(--taliya-control-select-item-icon-size)",
      ".tl-filter-select__option-icon > .tl-icon",
      ".tl-filter-select__option-check > .tl-icon"
    ]
  },
  {
    id: "ui-official-base-icon-sizing-css",
    packageName: "@taliya/ui",
    packagePath: ["@taliya", "ui"],
    file: "src/styles.css",
    requiredText: [
      ".tl-icon",
      "--tl-icon-size",
      "var(--taliya-control-icon-size-md)"
    ]
  },
  {
    id: "ui-official-base-icon-sizing-runtime",
    packageName: "@taliya/ui",
    packagePath: ["@taliya", "ui"],
    file: "dist/index.js",
    requiredText: [
      "\"--tl-icon-size\"",
      "const iconStyle",
      "style: iconStyle"
    ]
  },
  {
    id: "crm-product-shell-floating-drawer-reserve-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-window--drawer-floating .tcrm-product-shell-main",
      ".tcrm-product-shell-window--drawer-floating .tcrm-product-shell-main .tcrm-empty-shell-topbar",
      ".tcrm-product-shell-window--drawer-floating .tcrm-product-shell-main .tcrm-empty-shell-topbar {\n  right: 0;",
      "var(--taliya-layout-crm-product-shell-floating-drawer-reserved-width)"
    ]
  },
  {
    id: "crm-product-shell-content-drawer-topbar-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-product-shell-window--drawer-content .tcrm-product-shell-main .tcrm-empty-shell-topbar",
      "right: 0;"
    ]
  },
  {
    id: "tokens-product-shell-floating-drawer-reserve",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-floating-drawer-reserved-width: var(--taliya-control-drawer-width-sm);"
    ]
  },
  {
    id: "tokens-page-filter-bar-search-flow",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-page-filter-bar-search-min-width: 224px;",
      "--taliya-layout-crm-page-filter-bar-search-basis: 320px;",
      "--taliya-layout-crm-page-filter-bar-search-max-width: 360px;"
    ]
  },
  {
    id: "tokens-page-filter-bar-compact-flow",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-page-filter-bar-compact-search-min-width: 188px;",
      "--taliya-layout-crm-page-filter-bar-compact-search-basis: 220px;",
      "--taliya-layout-crm-page-filter-bar-compact-search-max-width: 260px;",
      "--taliya-layout-crm-page-filter-bar-compact-filter-width: 84px;"
    ]
  },
  {
    id: "tokens-page-filter-bar-tight-flow",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-page-filter-bar-tight-search-min-width: 252px;",
      "--taliya-layout-crm-page-filter-bar-tight-search-basis: 264px;",
      "--taliya-layout-crm-page-filter-bar-tight-search-max-width: 276px;",
      "--taliya-layout-crm-page-filter-bar-tight-filter-width: 78px;",
      "--taliya-control-crm-page-filter-bar-tight-action-padding-x: 12px;"
    ]
  },
  {
    id: "tokens-page-quick-filter-soft-selection",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-color-crm-page-quick-filter-selected-soft-bg: var(--taliya-color-crm-kanban-manual-bg);",
      "--taliya-color-crm-page-quick-filter-selected-soft-border: rgba(94, 142, 232, 0.18);",
      "--taliya-color-crm-page-quick-filter-selected-soft-fg: var(--taliya-color-crm-kanban-manual-fg);"
    ]
  },
  {
    id: "tokens-approval-panel-history-rhythm",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-control-crm-approval-panel-timeline-item-height: 16px;",
      "--taliya-control-crm-approval-panel-timeline-time-width: 36px;"
    ]
  },
  {
    id: "tokens-finance-priority-panel-density",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-control-crm-finance-priority-panel-padding: 16px;",
      "--taliya-control-crm-finance-priority-panel-gap: 12px;",
      "--taliya-control-crm-finance-priority-panel-row-height: 50px;"
    ]
  },
  {
    id: "crm-page-filter-bar-flex-flow-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-page-filter-bar.tl-filter-bar",
      "display: flex;",
      "var(--taliya-layout-crm-page-filter-bar-search-basis)",
      "var(--taliya-layout-crm-page-filter-bar-search-max-width)",
      "var(--taliya-layout-crm-page-filter-bar-search-min-width)",
      ".tcrm-page-filter-bar__actions",
      "margin-left: auto;"
    ]
  },
  {
    id: "crm-page-filter-bar-density-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "density?: \"standard\" | \"comfortable\" | \"compact\" | \"tight\";",
      "export declare function PageFilterBar"
    ]
  },
  {
    id: "crm-page-filter-bar-compact-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-page-filter-bar--compact",
      "var(--taliya-layout-crm-page-filter-bar-compact-search-basis)",
      "var(--taliya-layout-crm-page-filter-bar-compact-search-max-width)",
      "var(--taliya-layout-crm-page-filter-bar-compact-search-min-width)",
      "var(--taliya-layout-crm-page-filter-bar-compact-filter-width)"
    ]
  },
  {
    id: "crm-page-filter-bar-tight-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-page-filter-bar--tight",
      "var(--taliya-layout-crm-page-filter-bar-tight-search-basis)",
      "var(--taliya-layout-crm-page-filter-bar-tight-search-max-width)",
      "var(--taliya-layout-crm-page-filter-bar-tight-search-min-width)",
      "var(--taliya-layout-crm-page-filter-bar-tight-filter-width)",
      "var(--taliya-control-crm-page-filter-bar-tight-action-padding-x)"
    ]
  },
  {
    id: "crm-page-quick-filters-selection-tone-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type PageQuickFiltersSelectionTone = \"strong\" | \"soft\";",
      "selectionTone?: PageQuickFiltersSelectionTone;"
    ]
  },
  {
    id: "crm-page-quick-filters-soft-selection-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-page-quick-filters__item--selection-soft[aria-pressed=\"true\"]",
      "var(--taliya-color-crm-page-quick-filter-selected-soft-bg)",
      "var(--taliya-color-crm-page-quick-filter-selected-soft-border)",
      "var(--taliya-color-crm-page-quick-filter-selected-soft-fg)"
    ]
  },
  {
    id: "crm-approval-panel-history-rhythm-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-approval-panel__history li",
      "var(--taliya-control-crm-approval-panel-timeline-time-width)",
      "var(--taliya-control-crm-approval-panel-timeline-item-height)"
    ]
  },
  {
    id: "crm-finance-priority-panel-density-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-finance-priority-panel.tl-panel",
      "var(--taliya-control-crm-finance-priority-panel-padding)",
      "var(--taliya-control-crm-finance-priority-panel-gap)",
      "var(--taliya-control-crm-finance-priority-panel-row-height)"
    ]
  },
  {
    id: "crm-work-list-detail-main-priority-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type WorkListDetailPageLayoutMode =",
      "\"main-priority\"",
      "\"compact-rail\"",
      "\"wide-main\"",
      "layoutMode?: WorkListDetailPageLayoutMode;"
    ]
  },
  {
    id: "crm-work-list-detail-main-priority-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-work-list-detail-page--main-priority .tcrm-work-list-detail-page__layout",
      "var(--taliya-layout-crm-work-list-detail-main-priority-rail-width)",
      ".tcrm-work-list-detail-page--main-priority .tcrm-page-quick-filters",
      "var(--taliya-control-crm-work-list-detail-main-priority-rail-padding)",
      "var(--taliya-control-crm-work-list-detail-main-priority-filter-padding-x)",
      "var(--taliya-control-crm-work-list-detail-main-priority-filter-gap)",
      "var(--taliya-control-crm-work-list-detail-main-priority-filter-icon-size)",
      "var(--taliya-control-crm-work-list-detail-main-priority-filter-count-size)",
      "var(--taliya-control-crm-work-list-detail-main-priority-filter-count-padding-x)"
    ]
  },
  {
    id: "tokens-work-list-detail-main-priority",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-work-list-detail-main-priority-rail-width: 176px;",
      "--taliya-control-crm-work-list-detail-main-priority-rail-padding: 18px 8px 14px;",
      "--taliya-control-crm-work-list-detail-main-priority-filter-padding-x: 4px;",
      "--taliya-control-crm-work-list-detail-main-priority-filter-gap: 4px;",
      "--taliya-control-crm-work-list-detail-main-priority-filter-icon-size: 13px;",
      "--taliya-control-crm-work-list-detail-main-priority-filter-count-size: 18px;",
      "--taliya-control-crm-work-list-detail-main-priority-filter-count-padding-x: 0px;"
    ]
  },
  {
    id: "ui-filter-select-value-trigger-api",
    packageName: "@taliya/ui",
    packagePath: ["@taliya", "ui"],
    file: "dist/index.d.ts",
    requiredText: [
      "clearable?: boolean;",
      "icon?: IconName;",
      "triggerDisplay?: \"label-value\" |",
      "\"value\";"
    ]
  },
  {
    id: "ui-search-input-embedded-filter-api-css",
    packageName: "@taliya/ui",
    packagePath: ["@taliya", "ui"],
    file: "dist/index.d.ts",
    requiredText: [
      "filterPlacement?: \"separate\" | \"embedded\";"
    ]
  },
  {
    id: "ui-search-input-embedded-filter-css",
    packageName: "@taliya/ui",
    packagePath: ["@taliya", "ui"],
    file: "src/styles.css",
    requiredText: [
      ".tl-search-input--filter-embedded",
      ".tl-search-input--filter-embedded .tl-search-input__field .tl-input-shell",
      ".tl-search-input--filter-embedded .tl-search-input__filter"
    ]
  },
  {
    id: "crm-page-filter-bar-embedded-search-filter-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "searchFilterPlacement?: \"separate\" | \"embedded\";"
    ]
  },
  {
    id: "tokens-compact-checklist-drawer",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-checklist-drawer-width: 342px;",
      "--taliya-layout-crm-product-shell-drawer-compact-width: var(--taliya-layout-crm-checklist-drawer-width);",
      "--taliya-control-crm-checklist-drawer-section-header-height: 32px;",
      "--taliya-control-crm-checklist-drawer-step-row-height: 35px;",
      "--taliya-control-crm-checklist-drawer-step-row-padding-y: 5px;",
      "--taliya-control-crm-checklist-drawer-step-index-width: 16px;"
    ]
  },
  {
    id: "tokens-checklist-table-dot-selection",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-color-crm-checklist-row-bg-selected: rgba(94, 142, 232, 0.06);",
      "--taliya-shadow-crm-checklist-table-row-selected: none;"
    ]
  },
  {
    id: "crm-checklist-drawer-rhythm-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-checklist-drawer.tcrm-drawer-frame .tcrm-drawer-frame__meta",
      ".tcrm-checklist-drawer.tcrm-drawer-frame .tcrm-drawer-frame__header h2",
      "var(--taliya-control-crm-checklist-drawer-section-header-height)",
      "var(--taliya-control-crm-checklist-drawer-step-row-height)",
      "var(--taliya-control-crm-checklist-drawer-step-row-padding-y)",
      "var(--taliya-control-crm-checklist-drawer-step-index-width)"
    ]
  },
  {
    id: "crm-checklist-table-dot-selection-css",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "src/styles.css",
    requiredText: [
      ".tcrm-checklist-table__data .tl-table__row--selected",
      "var(--taliya-color-crm-checklist-row-bg-selected)",
      "var(--taliya-shadow-crm-checklist-table-row-selected)",
      ".tcrm-checklist-table__title-cell.is-selected::before"
    ]
  }
];
const requiredCssImports = [
  'import "@taliya/tokens/tokens.css";',
  'import "@taliya/ui/styles.css";',
  'import "@taliya/crm/styles.css";'
];
const allowedTaliyaSubpathImports = new Set([
  "@taliya/tokens/tokens.css",
  "@taliya/ui/styles.css",
  "@taliya/crm/styles.css"
]);
const forbiddenImports = ["@radix-ui/", "lucide-react"];
const legacyRootVariables = [
  "--bg",
  "--surface",
  "--surface-muted",
  "--text",
  "--muted",
  "--border",
  "--accent",
  "--accent-soft",
  "--danger",
  "--warning",
  "--ok",
  "--shadow"
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function walk(dirPath, extensions, files = []) {
  if (!exists(dirPath)) return files;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "tmp") continue;
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(entryPath, extensions, files);
      continue;
    }

    if (extensions.some((extension) => entry.name.endsWith(extension))) {
      files.push(entryPath);
    }
  }

  return files;
}

function relativeToConsumer(filePath) {
  return path.relative(consumerRoot, filePath).replaceAll("\\", "/");
}

function lineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function findInFiles(files, matcher) {
  const matches = [];

  for (const filePath of files) {
    const source = read(filePath);
    for (const match of matcher(source)) {
      matches.push({
        file: relativeToConsumer(filePath),
        line: match.line,
        text: match.text
      });
    }
  }

  return matches;
}

function packageStatus() {
  const packageJsonPath = path.join(consumerRoot, "package.json");
  if (!exists(packageJsonPath)) {
    return {
      pass: false,
      missing: requiredPackages,
      details: ["Missing package.json"]
    };
  }

  const packageJson = JSON.parse(read(packageJsonPath));
  const allDeps = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
    ...(packageJson.peerDependencies ?? {})
  };
  const missing = requiredPackages.filter((packageName) => !allDeps[packageName]);
  const sourceRows = requiredPackages.map((packageName) => ({
    packageName,
    actual: allDeps[packageName] ?? "missing",
    expected: requiredPackageSources[packageName],
    pass: allDeps[packageName] === requiredPackageSources[packageName]
  }));
  const sourceMismatches = sourceRows.filter((row) => !row.pass);

  return {
    pass: missing.length === 0 && sourceMismatches.length === 0,
    missing,
    sourceRows,
    sourceMismatches,
    details: [
      ...requiredPackages.map((packageName) => `${packageName}: ${allDeps[packageName] ?? "missing"}`),
      ...sourceRows.map((row) => `${row.packageName} source: ${row.pass ? "pass" : `expected ${row.expected}, got ${row.actual}`}`)
    ]
  };
}

function installedPackageStatus() {
  const rows = installedPackageSpecs.map((spec) => {
    const packageRoot = path.join(consumerRoot, "node_modules", ...spec.packagePath);
    const packageJsonPath = path.join(packageRoot, "package.json");
    const packageJsonExists = exists(packageJsonPath);
    const packageJson = packageJsonExists ? JSON.parse(read(packageJsonPath)) : null;
    const missingFiles = spec.requiredFiles.filter((filePath) => !exists(path.join(packageRoot, filePath)));
    const exportsPresent = Object.keys(packageJson?.exports ?? {});
    const missingExports = spec.requiredExports.filter((exportName) => !exportsPresent.includes(exportName));
    const nameMatches = packageJson?.name === spec.packageName;
    const versionPresent = typeof packageJson?.version === "string" && packageJson.version.length > 0;

    return {
      packageName: spec.packageName,
      packageRoot: relativeToConsumer(packageRoot),
      packageJsonExists,
      nameMatches,
      version: packageJson?.version ?? null,
      versionPresent,
      requiredFiles: spec.requiredFiles,
      missingFiles,
      requiredExports: spec.requiredExports,
      exportsPresent,
      missingExports,
      pass: packageJsonExists && nameMatches && versionPresent && missingFiles.length === 0 && missingExports.length === 0
    };
  });

  return {
    pass: rows.every((row) => row.pass),
    rows,
    details: rows.flatMap((row) => [
      `${row.packageName}: ${row.pass ? "installed entrypoints ok" : "installed entrypoints failed"}`,
      `${row.packageName} version: ${row.version ?? "missing"}`,
      `${row.packageName} missing files: ${row.missingFiles.length ? row.missingFiles.join(", ") : "none"}`,
      `${row.packageName} missing exports: ${row.missingExports.length ? row.missingExports.join(", ") : "none"}`
    ])
  };
}

function installedPackageContractStatus() {
  const rows = installedPackageContractMarkers.map((marker) => {
    const packageRoot = path.join(consumerRoot, "node_modules", ...marker.packagePath);
    const markerPath = path.join(packageRoot, marker.file);
    const fileExists = exists(markerPath);
    const source = fileExists ? read(markerPath) : "";
    const missingText = marker.requiredText.filter((text) => !source.includes(text));

    return {
      id: marker.id,
      packageName: marker.packageName,
      file: relativeToConsumer(markerPath),
      fileExists,
      requiredText: marker.requiredText,
      missingText,
      pass: fileExists && missingText.length === 0
    };
  });

  return {
    pass: rows.every((row) => row.pass),
    rows,
    details: rows.map((row) =>
      `${row.id}: ${row.pass ? "installed contract markers ok" : `missing ${row.missingText.join(", ") || "file"}`}`
    )
  };
}

function standardPageKitRuntimeStatus() {
  const expectedManifest = JSON.parse(read(standardPageKitManifestPath));
  const expectedComponents = Array.isArray(expectedManifest.components) ? expectedManifest.components : [];
  const expectedCount = expectedComponents.length;
  const expectedNames = new Set(expectedComponents.map((component) => component.name));
  const expectedKeys = new Set(expectedComponents.map((component) => `${component.package}:${component.name}`));
  const script = [
    "import('@taliya/crm')",
    ".then((mod) => {",
    "const manifest = mod.standardPageKitManifest;",
    "const components = Array.isArray(manifest?.components) ? manifest.components : [];",
    "console.log(JSON.stringify({",
    "hasManifest: Boolean(manifest),",
    "version: manifest?.version ?? null,",
    "count: components.length,",
    "components: components.map((component) => ({",
    "name: component.name,",
    "package: component.package,",
    "story: component.story,",
    "category: component.category",
    "}))",
    "}));",
    "})",
    ".catch((error) => { console.error(error?.stack || String(error)); process.exit(1); });"
  ].join("");
  const result = spawnSync(process.execPath, ["-e", script], {
    cwd: consumerRoot,
    encoding: "utf8"
  });

  let parsed = null;
  try {
    parsed = result.stdout ? JSON.parse(result.stdout) : null;
  } catch {
    parsed = null;
  }

  const runtimeComponents = Array.isArray(parsed?.components) ? parsed.components : [];
  const names = new Set(runtimeComponents.map((component) => component.name));
  const runtimeKeys = new Set(runtimeComponents.map((component) => `${component.package}:${component.name}`));
  const missingNames = Array.from(expectedNames).filter((name) => !names.has(name));
  const missingRows = expectedComponents.filter((component) => !runtimeKeys.has(`${component.package}:${component.name}`));
  const extraRows = runtimeComponents.filter((component) => !expectedKeys.has(`${component.package}:${component.name}`));
  const exactParity =
    parsed?.hasManifest === true &&
    parsed.version === 1 &&
    parsed.count === expectedCount &&
    missingRows.length === 0 &&
    extraRows.length === 0 &&
    JSON.stringify(runtimeComponents) === JSON.stringify(expectedComponents);
  const orderOrFieldDrift =
    parsed?.hasManifest === true &&
    parsed.version === 1 &&
    parsed.count === expectedCount &&
    missingRows.length === 0 &&
    extraRows.length === 0 &&
    !exactParity;
  const pass =
    result.status === 0 &&
    parsed?.hasManifest === true &&
    parsed.version === 1 &&
    parsed.count === expectedCount &&
    missingNames.length === 0 &&
    exactParity;

  return {
    pass,
    expectedCount,
    status: result.status,
    hasManifest: parsed?.hasManifest ?? false,
    version: parsed?.version ?? null,
    count: parsed?.count ?? 0,
    missingNames,
    exactParity,
    orderOrFieldDrift,
    missingRows,
    extraRows,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? "").trim()
  };
}

function cssImportStatus() {
  const layoutPath = path.join(consumerRoot, "app/layout.tsx");
  if (!exists(layoutPath)) {
    return {
      pass: false,
      imports: [],
      details: ["Missing app/layout.tsx"]
    };
  }

  const source = read(layoutPath);
  const imports = Array.from(source.matchAll(/^import\s+["'][^"']+["'];/gm)).map((match) => match[0]);
  const positions = requiredCssImports.map((importLine) => imports.indexOf(importLine));
  const present = positions.every((position) => position >= 0);
  const ordered = present && positions.every((position, index) => index === 0 || position > positions[index - 1]);

  return {
    pass: present && ordered,
    imports,
    details: [
      present ? "Required CSS imports are present." : `Missing CSS imports: ${requiredCssImports.filter((line) => !imports.includes(line)).join(", ")}`,
      ordered ? "Required CSS imports are ordered tokens -> ui -> crm." : "Required CSS imports are not ordered tokens -> ui -> crm."
    ]
  };
}

function globalsStatus() {
  const globalsPath = path.join(consumerRoot, "app/globals.css");
  if (!exists(globalsPath)) {
    return {
      pass: false,
      details: ["Missing app/globals.css"],
      legacyVariables: [],
      missingTokenUsages: ["--taliya-surface-page", "--taliya-color-text-primary", "--taliya-type-font-primary", "--taliya-type-body-size"]
    };
  }

  const source = read(globalsPath);
  const legacyVariables = legacyRootVariables.filter((variableName) => source.includes(variableName));
  const requiredTokenUsages = [
    "--taliya-surface-page",
    "--taliya-color-text-primary",
    "--taliya-type-font-primary",
    "--taliya-type-body-size"
  ];
  const missingTokenUsages = requiredTokenUsages.filter((tokenName) => !source.includes(tokenName));

  return {
    pass: legacyVariables.length === 0 && missingTokenUsages.length === 0,
    details: [
      legacyVariables.length === 0 ? "No legacy local visual root variables." : `Legacy variables found: ${legacyVariables.join(", ")}`,
      missingTokenUsages.length === 0 ? "Root body uses official token variables." : `Missing token usages: ${missingTokenUsages.join(", ")}`
    ],
    legacyVariables,
    missingTokenUsages
  };
}

const activeSourceFiles = activeDirs.flatMap((dirName) =>
  walk(path.join(consumerRoot, dirName), [".ts", ".tsx", ".js", ".jsx"])
);
const extendedSourceFiles = extendedDirs.flatMap((dirName) =>
  walk(path.join(consumerRoot, dirName), [".ts", ".tsx", ".js", ".jsx"])
);
const activeCssFiles = activeDirs.flatMap((dirName) =>
  walk(path.join(consumerRoot, dirName), [".css", ".module.css"])
);

const forbiddenImportMatches = findInFiles(extendedSourceFiles, (source) => {
  const matches = [];
  for (const forbiddenImport of forbiddenImports) {
    let index = source.indexOf(forbiddenImport);
    while (index >= 0) {
      matches.push({ line: lineNumber(source, index), text: forbiddenImport });
      index = source.indexOf(forbiddenImport, index + forbiddenImport.length);
    }
  }
  return matches;
});

const forbiddenTaliyaSubpathMatches = findInFiles(extendedSourceFiles, (source) =>
  Array.from(source.matchAll(/(?:from\s+|import\s*)["'](@taliya\/(?:tokens|ui|crm)\/[^"']+)["']/g))
    .filter((match) => !allowedTaliyaSubpathImports.has(match[1]))
    .map((match) => ({
      line: lineNumber(source, match.index ?? 0),
      text: match[1]
    }))
);

const classNameMatches = findInFiles(activeSourceFiles, (source) =>
  Array.from(source.matchAll(/\b(?:[A-Za-z][A-Za-z0-9]*ClassName|className)\s*=/g)).map((match) => ({
    line: lineNumber(source, match.index ?? 0),
    text: match[0].trim()
  }))
);

const extraCssFiles = activeCssFiles
  .map(relativeToConsumer)
  .filter((filePath) => filePath !== "app/globals.css");

const report = {
  consumerRoot,
  vendorDir,
  reportLabel: reportLabel || "default",
  vendorManifest: {
    path: relativeToConsumer(vendorManifestPath),
    present: Boolean(vendorManifest),
    packageCount: vendorManifest?.packages?.length ?? 0
  },
  generatedAt: new Date().toISOString(),
  packageStatus: packageStatus(),
  installedPackageStatus: installedPackageStatus(),
  installedPackageContractStatus: installedPackageContractStatus(),
  standardPageKitRuntimeStatus: standardPageKitRuntimeStatus(),
  cssImportStatus: cssImportStatus(),
  globalsStatus: globalsStatus(),
  forbiddenImportStatus: {
    pass: forbiddenImportMatches.length === 0,
    matches: forbiddenImportMatches
  },
  forbiddenTaliyaSubpathImportStatus: {
    pass: forbiddenTaliyaSubpathMatches.length === 0,
    allowedSubpaths: Array.from(allowedTaliyaSubpathImports),
    matches: forbiddenTaliyaSubpathMatches
  },
  activeClassNameStatus: {
    pass: classNameMatches.length === 0,
    matches: classNameMatches
  },
  activeCssStatus: {
    pass: extraCssFiles.length === 0,
    extraCssFiles
  }
};

const checks = [
  ["Required packages", report.packageStatus.pass],
  ["Vendor release manifest", report.vendorManifest.present && report.vendorManifest.packageCount === requiredPackages.length],
  ["Installed package entrypoints", report.installedPackageStatus.pass],
  ["Installed package contract markers", report.installedPackageContractStatus.pass],
  ["Installed CRM standard page-kit runtime manifest", report.standardPageKitRuntimeStatus.pass],
  ["CSS import order", report.cssImportStatus.pass],
  ["Tokenized global reset", report.globalsStatus.pass],
  ["No forbidden implementation imports", report.forbiddenImportStatus.pass],
  ["No forbidden Taliya package subpath imports", report.forbiddenTaliyaSubpathImportStatus.pass],
  ["No active local className hooks", report.activeClassNameStatus.pass],
  ["No extra active consumer CSS files", report.activeCssStatus.pass]
];
const failedChecks = checks.filter(([, pass]) => !pass).map(([name]) => name);
report.summary = {
  pass: failedChecks.length === 0,
  failedChecks
};

if (persistReports) {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
}

const markdown = [
  "# Consumer Integration Audit",
  "",
  `Consumer: \`${consumerRoot}\``,
  `Vendor: \`${vendorDir}\``,
  "",
  "| Check | Status |",
  "| --- | --- |",
  ...checks.map(([name, pass]) => `| ${name} | ${pass ? "Pass" : "Fail"} |`),
  "",
  "## Details",
  "",
  ...report.packageStatus.details.map((detail) => `- ${detail}`),
  `- Vendor release manifest: ${report.vendorManifest.present ? "present" : "missing"} (${report.vendorManifest.packageCount}/${requiredPackages.length}) at ${report.vendorManifest.path}`,
  ...report.installedPackageStatus.details.map((detail) => `- ${detail}`),
  ...report.installedPackageContractStatus.details.map((detail) => `- ${detail}`),
  `- Standard page-kit runtime manifest: ${report.standardPageKitRuntimeStatus.pass ? "pass" : "fail"}`,
  `- Standard page-kit runtime exact parity: ${report.standardPageKitRuntimeStatus.exactParity ? "pass" : "fail"}`,
  `- Standard page-kit runtime count: ${report.standardPageKitRuntimeStatus.count}/${report.standardPageKitRuntimeStatus.expectedCount}`,
  `- Standard page-kit runtime missing names: ${report.standardPageKitRuntimeStatus.missingNames.length ? report.standardPageKitRuntimeStatus.missingNames.join(", ") : "none"}`,
  `- Standard page-kit runtime missing rows: ${report.standardPageKitRuntimeStatus.missingRows.length ? report.standardPageKitRuntimeStatus.missingRows.map((row) => `${row.package}:${row.name}`).join(", ") : "none"}`,
  `- Standard page-kit runtime extra rows: ${report.standardPageKitRuntimeStatus.extraRows.length ? report.standardPageKitRuntimeStatus.extraRows.map((row) => `${row.package}:${row.name}`).join(", ") : "none"}`,
  `- Standard page-kit runtime order/field drift: ${report.standardPageKitRuntimeStatus.orderOrFieldDrift ? "yes" : "no"}`,
  ...report.cssImportStatus.details.map((detail) => `- ${detail}`),
  ...report.globalsStatus.details.map((detail) => `- ${detail}`),
  `- Forbidden import matches: ${report.forbiddenImportStatus.matches.length}`,
  `- Forbidden Taliya package subpath import matches: ${report.forbiddenTaliyaSubpathImportStatus.matches.length}`,
  `- Active className matches: ${report.activeClassNameStatus.matches.length}`,
  `- Extra active CSS files: ${report.activeCssStatus.extraCssFiles.length}`,
  ""
].join("\n");
if (persistReports) fs.writeFileSync(reportMdPath, markdown);

if (persistReports) console.log(`Consumer integration audit written to ${path.relative(root, reportJsonPath)} and ${path.relative(root, reportMdPath)}`);
console.log(`Consumer integration: ${report.summary.pass ? "pass" : "fail"}`);

if (check && !report.summary.pass) {
  console.error(`Failed checks: ${failedChecks.join(", ")}`);
  process.exit(1);
}
