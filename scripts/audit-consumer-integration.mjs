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

function reportBasename(baseName) {
  if (!reportLabel) return baseName;

  const normalized = reportLabel.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

const reportJsonPath = path.join(specDir, `${reportBasename("consumer-integration-audit")}.json`);
const reportMdPath = path.join(specDir, `${reportBasename("consumer-integration-audit")}.md`);
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
      "export type CrmProductShellPageHeaderRhythm = \"default\" | \"spacious\" | \"compact-stacked\" | \"dashboard\" | \"stacked\" | \"overview\";",
      "pageHeaderRhythm?: CrmProductShellPageHeaderRhythm;"
    ]
  },
  {
    id: "crm-product-shell-content-layout-api",
    packageName: "@taliya/crm",
    packagePath: ["@taliya", "crm"],
    file: "dist/index.d.ts",
    requiredText: [
      "export type CrmProductShellContentLayout = \"default\" | \"work-list\" | \"main-priority\" | \"kanban\";",
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
    id: "tokens-product-shell-content-layout",
    packageName: "@taliya/tokens",
    packagePath: ["@taliya", "tokens"],
    file: "src/tokens.css",
    requiredText: [
      "--taliya-layout-crm-product-shell-content-work-list-padding: 0 28px 28px 27px;",
      "--taliya-layout-crm-product-shell-content-main-priority-padding: 0 28px 28px 16px;",
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
      "density?: \"standard\" | \"compact\" | \"tight\";",
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
      "export type WorkListDetailPageLayoutMode = \"standard\" | \"main-priority\";",
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

fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

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
fs.writeFileSync(reportMdPath, markdown);

console.log(`Consumer integration audit written to ${path.relative(root, reportJsonPath)} and ${path.relative(root, reportMdPath)}`);
console.log(`Consumer integration: ${report.summary.pass ? "pass" : "fail"}`);

if (check && !report.summary.pass) {
  console.error(`Failed checks: ${failedChecks.join(", ")}`);
  process.exit(1);
}
