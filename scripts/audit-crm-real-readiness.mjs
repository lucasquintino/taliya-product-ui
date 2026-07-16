import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");
const releaseCandidateInProgress = process.env.TALIYA_RELEASE_CANDIDATE_IN_PROGRESS === "1";

function readJson(relativePath) {
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required report: ${relativePath}`);
  }

  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function readText(relativePath) {
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }

  return readFileSync(absolutePath, "utf8");
}

function row(id, status, evidence, meaning) {
  return { id, status, evidence, meaning };
}

function reportRowStatus(pass) {
  return pass ? "pass" : "fail";
}

function hasPassingPublicApi(publicApi, name) {
  return publicApi.rows?.some((item) => item.name === name && item.pass === true) ?? false;
}

function requirementFromGoal(goal, requirement) {
  return goal.requirements?.find((item) => item.requirement === requirement);
}

const goalCompletion = readJson("specs/001-product-ui-foundation/goal-completion-audit.json");
const libraryStatus = readJson("specs/001-product-ui-foundation/library-consumption-status.json");
const releaseCandidate = readJson("specs/001-product-ui-foundation/release-candidate-audit.json");
const readiness = readJson("specs/001-product-ui-foundation/library-readiness-gate.json");
const registryPublication = readJson("specs/001-product-ui-foundation/registry-publication-audit.json");
const registryConsumerAdoption = readJson("specs/001-product-ui-foundation/registry-consumer-adoption-audit.json");
const publicApi = readJson("specs/001-product-ui-foundation/public-api-audit.json");
const consumerPageKit = readJson("specs/001-product-ui-foundation/consumer-page-kit-audit.json");
const consumerBootstrap = readJson("specs/001-product-ui-foundation/consumer-bootstrap-audit.json");
const futureFixture = readJson("specs/001-product-ui-foundation/future-consumer-fixture-audit.json");
const futureDiscovery = readJson("specs/001-product-ui-foundation/future-consumer-discovery-audit.json");
const futureAdoption = readJson("specs/001-product-ui-foundation/future-consumer-adoption-audit.json");
const remainingPageCoverage = readJson("specs/001-product-ui-foundation/remaining-page-coverage-audit.json");
const componentApiContract = readText("specs/001-product-ui-foundation/contracts/component-api-contract.md");
const drawerLifecycleContract = readText("specs/001-product-ui-foundation/contracts/drawer-lifecycle-contract.md");
const crmIndex = readText("packages/crm/src/index.tsx");
const uiIndex = readText("packages/ui/src/index.tsx");

const requiredPageKitComponents = [
  "CrmProductShell",
  "PageFilterBar",
  "PageQuickFilters",
  "DataTable",
  "TablePagination",
  "LeadTable",
  "TaskTable",
  "ChecklistTable",
  "ApprovalTable",
  "StudentTable",
  "ReplacementTable",
  "KanbanBoard",
  "KanbanColumn",
  "KanbanCard",
  "CrmRecordDrawer",
  "ChecklistDrawer",
  "FinancePriorityPanel",
  "StatePage",
  "LoadingState",
  "ErrorState",
  "EmptyState",
  "Panel",
  "PanelHeader",
  "PanelBody"
];
const missingPublicComponents = requiredPageKitComponents.filter((name) => !hasPassingPublicApi(publicApi, name));

const dynamicPageContractSnippets = [
  "Reusable page patterns in `@taliya/crm`, such as `WorkListDetailPage`, must be slot-based templates",
  "PageFilterBar` is the single official page filter surface",
  "PageQuickFilters` is the single official quick-filter rail",
  "Official CRM page tables such as `TaskTable`, `ChecklistTable`, `ApprovalTable`, `StudentTable`, and `ReplacementTable` are data-presentational components",
  "CrmProductShell` owns the product-page chrome"
];
const missingDynamicPageContractSnippets = dynamicPageContractSnippets.filter((snippet) => !componentApiContract.includes(snippet));

const drawerContractSnippets = [
  "A drawer is not just a visual side panel",
  "header",
  "object identity",
  "why it appears now",
  "safe next action",
  "blocked/permission/quota/data states",
  "TaskDrawer",
  "ChecklistDrawer",
  "ApprovalDrawer",
  "CaseDrawer",
  "StudentDrawer",
  "ClassDrawer",
  "ReplacementDrawer",
  "PaymentDrawer",
  "LeadDrawer",
  "AgentFlowDrawer",
  "UsageDrawer"
];
const missingDrawerContractSnippets = drawerContractSnippets.filter((snippet) => !drawerLifecycleContract.includes(snippet));

const dynamicApiRows = [
  {
    component: "CrmProductShell",
    source: crmIndex,
    snippets: [
      "export interface CrmProductShellProps",
      "drawer?: React.ReactNode",
      "drawerPlacement?:",
      "drawerSize?:",
      "pageHeaderRhythm?:",
      "contentLayout?:"
    ]
  },
  {
    component: "PageFilterBar",
    source: crmIndex,
    snippets: [
      "export interface PageFilterBarFilter",
      "placement?: \"primary\" | \"advanced\"",
      "filters?: PageFilterBarFilter[]",
      "actions?: React.ReactNode",
      "onFilterValueChange?:",
      "searchVisible?:"
    ]
  },
  {
    component: "PageQuickFilters",
    source: crmIndex,
    snippets: [
      "export interface PageQuickFilterItem",
      "items?: PageQuickFilterItem[]",
      "actions?: React.ReactNode",
      "onSelect?:",
      "selectionTone?:"
    ]
  },
  {
    component: "CrmRecordDrawer",
    source: crmIndex,
    snippets: [
      "export interface CrmRecordDrawerFact",
      "export interface CrmRecordDrawerSection",
      "export interface CrmRecordDrawerAction",
      "export interface CrmRecordDrawerTab",
      "actions?: CrmRecordDrawerAction[]",
      "onAction?:"
    ]
  },
  {
    component: "DataTable",
    source: uiIndex,
    snippets: [
      "export interface DataTableColumn",
      "export interface DataTableProps",
      "columns: Array<DataTableColumn",
      "rows:",
      "T extends { id: string }",
      "onRowClick?:"
    ]
  }
].map((item) => {
  const missing = item.snippets.filter((snippet) => !item.source.includes(snippet));
  return {
    component: item.component,
    pass: missing.length === 0,
    missing
  };
});

const domainDrawerNames = [
  "TaskDrawer",
  "ChecklistDrawer",
  "ApprovalDrawer",
  "CaseDrawer",
  "StudentDrawer",
  "ClassDrawer",
  "PaymentDrawer",
  "ReplacementDrawer",
  "LeadDrawer",
  "AgentFlowDrawer",
  "UsageDrawer",
  "SupportTicketDrawer",
  "TenantSecurityDrawer"
];
const drawerApiRows = domainDrawerNames.map((name) => {
  const props = `export interface ${name}Props`;
  const state = name === "ApprovalDrawer" ? "export type ApprovalPanelState" : `export type ${name}State`;
  return {
    component: name,
    pass: crmIndex.includes(props) && crmIndex.includes(state),
    missing: [!crmIndex.includes(props) ? props : "", !crmIndex.includes(state) ? state : ""].filter(Boolean)
  };
});

const starterRows = consumerBootstrap.starterFiles?.rows ?? [];
const starterRequiredFiles = [
  "components/crm-shell-client.tsx",
  "features/crm/work-list/work-list-page.tsx",
  "features/crm/kanban/kanban-page.tsx",
  "app/crm/page.tsx",
  "app/crm/kanban/page.tsx"
];
const missingStarterFiles = starterRequiredFiles.filter(
  (file) => !starterRows.some((item) => item.file === file && item.pass === true)
);
const fixtureSmokePass =
  futureFixture.status === "pass" &&
  futureFixture.assertions?.smoke?.status === "pass" &&
  futureFixture.assertions?.smoke?.subpathManifestMatches === true &&
  futureFixture.assertions?.starterFiles?.pass === true;

const internalPageKitPass =
  consumerPageKit.summary?.pass === true &&
  consumerPageKit.routeCoverage?.pass === true &&
  (consumerPageKit.componentContractRows ?? []).every((item) => item.pass === true);
const technicalReleaseCandidatePass =
  releaseCandidateInProgress ||
  (releaseCandidate.status === "pass" && libraryStatus.technicalReleaseCandidatePass === true);
const registryPublicationPass =
  registryPublication.status === "pass-published" &&
  registryPublication.publishedPackageCount === registryPublication.expectedPackageCount &&
  registryPublication.expectedPackageCount === 3;
const registryConsumerAdoptionPass =
  registryConsumerAdoption.status === "pass-registry-adoption" &&
  registryConsumerAdoption.registryPublicationPass === true &&
  registryConsumerAdoption.distributionConfigPass === true &&
  registryConsumerAdoption.noEffectiveVendorDependencies === true &&
  registryConsumerAdoption.adoptedPackageCount === registryConsumerAdoption.expectedPackageCount &&
  registryConsumerAdoption.expectedPackageCount === 3;
const futureProcessPass =
  futureDiscovery.status === "pass" &&
  futureAdoption.status === "pass" &&
  libraryStatus.futureCrmProcessPass === true;
const realFutureCrmAdoptionExecuted = libraryStatus.futureCrmRealAdoptionExecuted === true;
const scopedVisualAcceptance =
  requirementFromGoal(goalCompletion, "Approved source-image visual parity")?.status === "scoped-out-by-product-acceptance";
const remainingPageCoveragePass =
  remainingPageCoverage.status === "pass" &&
  remainingPageCoverage.storyCount === 54 &&
  remainingPageCoverage.checkedStoryCount === 54 &&
  (remainingPageCoverage.failedStories ?? []).length === 0 &&
  (remainingPageCoverage.sourceMarkerRows ?? []).every((item) => item.present === true) &&
  (remainingPageCoverage.specificCompositionRows ?? []).every((item) => item.present === true) &&
  (remainingPageCoverage.forbiddenMarkerRows ?? []).every((item) => item.present === false);

const rows = [
  row(
    "official-packages-and-release",
    reportRowStatus(technicalReleaseCandidatePass && registryPublicationPass),
    "release-candidate-audit.json, library-consumption-status.json, and registry-publication-audit.json",
    technicalReleaseCandidatePass && registryPublicationPass
      ? "Packages are buildable, installable, audited, release-ready, and all three exact versions are public on npm."
      : `Official release is incomplete: technicalCandidate=${technicalReleaseCandidatePass}, registryPublished=${registryPublication.publishedPackageCount}/${registryPublication.expectedPackageCount}.`
  ),
  row(
    "current-internal-fully-consuming",
    reportRowStatus(libraryStatus.currentInternalConsumptionPass === true && internalPageKitPass),
    "library-consumption-status.json and consumer-page-kit-audit.json",
    "Internal functionally consumes official shell, filters, tables, kanban, drawers, route states, and wrapper roots without local visual clones."
  ),
  row(
    "current-internal-registry-adoption",
    reportRowStatus(registryConsumerAdoptionPass),
    "registry-consumer-adoption-audit.json",
    registryConsumerAdoptionPass
      ? "Internal resolves all three official packages from npm with aligned manifests, lockfile, installed versions, and distribution config."
      : `Internal still lacks official registry adoption: adopted=${registryConsumerAdoption.adoptedPackageCount}/${registryConsumerAdoption.expectedPackageCount}, distributionConfig=${registryConsumerAdoption.distributionConfigPass}.`
  ),
  row(
    "standard-page-kit-complete",
    reportRowStatus(publicApi.summary?.pass === true && missingPublicComponents.length === 0),
    "public-api-audit.json and standard-page-kit.manifest.json",
    missingPublicComponents.length === 0
      ? "The standard page kit exposes the core components needed to start CRM pages."
      : `Missing required page-kit components: ${missingPublicComponents.join(", ")}.`
  ),
  row(
    "remaining-page-story-coverage",
    reportRowStatus(remainingPageCoveragePass),
    "remaining-page-coverage-audit.json and static Storybook index",
    remainingPageCoveragePass
      ? "Every remaining page/image has an individual static Storybook entry using official page compositions, with generic table/metric/kanban placeholders rejected."
      : `Remaining page coverage is incomplete or too generic: status=${remainingPageCoverage.status}, stories=${remainingPageCoverage.checkedStoryCount}/${remainingPageCoverage.storyCount}, failed=${(remainingPageCoverage.failedStories ?? []).length}.`
  ),
  row(
    "dynamic-page-contracts",
    reportRowStatus(missingDynamicPageContractSnippets.length === 0 && dynamicApiRows.every((item) => item.pass)),
    "component-api-contract.md and package public interfaces",
    missingDynamicPageContractSnippets.length === 0 && dynamicApiRows.every((item) => item.pass)
      ? "Pages are composed through official shell/filter/quick-filter/table slots, rows, state props, and callbacks."
      : `Dynamic page contract gaps: ${[
          ...missingDynamicPageContractSnippets,
          ...dynamicApiRows.flatMap((item) => item.missing.map((snippet) => `${item.component}: ${snippet}`))
        ].join(", ")}.`
  ),
  row(
    "dynamic-drawer-contracts",
    reportRowStatus(missingDrawerContractSnippets.length === 0 && dynamicApiRows.find((item) => item.component === "CrmRecordDrawer")?.pass && drawerApiRows.every((item) => item.pass)),
    "drawer-lifecycle-contract.md and package drawer interfaces",
    missingDrawerContractSnippets.length === 0 && drawerApiRows.every((item) => item.pass)
      ? "Drawers have one reusable record drawer contract plus domain drawers with explicit states, props, actions, facts, sections, tabs, and callbacks."
      : `Dynamic drawer contract gaps: ${[
          ...missingDrawerContractSnippets,
          ...drawerApiRows.flatMap((item) => item.missing.map((snippet) => `${item.component}: ${snippet}`))
        ].join(", ")}.`
  ),
  row(
    "new-consumer-bootstrap",
    reportRowStatus(consumerBootstrap.status === "pass" && missingStarterFiles.length === 0),
    "consumer-bootstrap-audit.json",
    missingStarterFiles.length === 0
      ? "A new CRM consumer can bootstrap configs and starter files using official shell, work-list, filter, table, kanban/card, and drawer roots."
      : `Missing bootstrap starter files: ${missingStarterFiles.join(", ")}.`
  ),
  row(
    "installed-future-consumer-fixture",
    reportRowStatus(fixtureSmokePass),
    "future-consumer-fixture-audit.json",
    "A synthetic installed future CRM consumer resolves package exports, CSS entrypoints, runtime manifest, starter files, and SSR smoke markers."
  ),
  row(
    "future-crm-adoption-process",
    reportRowStatus(futureProcessPass),
    "future-consumer-discovery/adoption audits and library-consumption-status.json",
    "The future CRM discovery/adoption process is guarded by positive, negative, partial, and mismatch probes."
  ),
  row(
    "real-future-crm-adoption",
    realFutureCrmAdoptionExecuted ? "pass" : "not-executed",
    "future-consumer-discovery-audit.json and future-consumer-adoption-audit.json",
    "The real future CRM app has been connected and has matching labeled readiness evidence."
  ),
  row(
    "visual-scope",
    reportRowStatus(scopedVisualAcceptance),
    "goal-completion-audit.json and certification-scope-decision-audit.json",
    "Current Internal/library acceptance has an explicit product-scoped visual decision; visual queue remains tracked separately."
  )
];

const failedRows = rows.filter((item) => item.status === "fail");
const reportStatus = failedRows.length > 0
  ? "fail"
  : realFutureCrmAdoptionExecuted
    ? "pass-global-crm-ready"
    : "pass-ready-to-start-crm-real";
const nextActions = [];

if (!registryPublicationPass) {
  nextActions.push("Publish @taliya/tokens, @taliya/ui, and @taliya/crm at the exact aligned version through the official npm release workflow.");
}
if (!registryConsumerAdoptionPass) {
  nextActions.push("Migrate taliya-internal from vendored tarballs to the published npm versions and refresh its manifest, lockfile, installed modules, and distribution config.");
}
if (!realFutureCrmAdoptionExecuted) {
  nextActions.push(
    "Create or connect the real CRM app.",
    "Bootstrap or version taliya-readiness.config.json and taliya-page-kit.config.json in the CRM app.",
    "Compose CRM pages only from official page-kit roots; promote missing variants back into @taliya/ui or @taliya/crm.",
    "Run labeled readiness and future-consumer adoption gates for the real CRM app."
  );
}
if (nextActions.length === 0) {
  nextActions.push("Keep consumer gates green as CRM real pages expand.");
}

const report = {
  generatedAt: new Date().toISOString(),
  status: reportStatus,
  currentInternalReady: libraryStatus.currentInternalConsumptionPass === true,
  crmRealCanStart: failedRows.length === 0,
  realFutureCrmAdoptionExecuted,
  globalGoalComplete: libraryStatus.globalGoalComplete === true,
  counts: {
    standardPageKitComponents: publicApi.requiredCount,
    requiredCorePageKitComponents: requiredPageKitComponents.length,
    remainingPageStories: remainingPageCoverage.storyCount,
    remainingPageStoriesChecked: remainingPageCoverage.checkedStoryCount,
    domainDrawerFamilies: domainDrawerNames.length,
    internalCoveredRoutes: consumerPageKit.routeCoverage?.discoveredRoutes?.length ?? 0,
    publishedPackages: registryPublication.publishedPackageCount ?? 0,
    registryAdoptedPackages: registryConsumerAdoption.adoptedPackageCount ?? 0,
    futureCrmCandidates: futureDiscovery.futureCrmCandidateCount ?? 0,
    adoptedFutureCrmCandidates: futureAdoption.adoptedCandidateCount ?? 0
  },
  rows,
  dynamicApiRows,
  drawerApiRows,
  missingPublicComponents,
  missingStarterFiles,
  nextActions
};

const markdownRows = rows
  .map((item) => `| \`${item.id}\` | ${item.status} | ${item.evidence} | ${item.meaning} |`)
  .join("\n");

const md = `# CRM Real Readiness Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This report answers whether \`taliya-product-ui\` is practically ready to start the real CRM implementation and what still blocks global completion. It consolidates the official package, Internal adoption, page-kit, dynamic page/drawer, bootstrap, future-consumer, and visual-scope evidence.

## Summary

- Current Internal ready: \`${report.currentInternalReady}\`
- CRM real can start from the library: \`${report.crmRealCanStart}\`
- Real future CRM adoption executed: \`${report.realFutureCrmAdoptionExecuted}\`
- Global goal complete: \`${report.globalGoalComplete}\`

## Counts

- Standard page-kit components: ${report.counts.standardPageKitComponents}
- Required core page-kit components checked: ${report.counts.requiredCorePageKitComponents}
- Remaining page/image stories checked: ${report.counts.remainingPageStoriesChecked}/${report.counts.remainingPageStories}
- Domain drawer families checked: ${report.counts.domainDrawerFamilies}
- Internal covered routes: ${report.counts.internalCoveredRoutes}
- Published npm packages: ${report.counts.publishedPackages}/3
- Registry-adopted Internal packages: ${report.counts.registryAdoptedPackages}/3
- Future CRM candidates discovered: ${report.counts.futureCrmCandidates}
- Future CRM candidates adopted: ${report.counts.adoptedFutureCrmCandidates}

## Requirement Rows

| Area | Status | Evidence | Meaning |
| --- | --- | --- | --- |
${markdownRows}

## Dynamic Page APIs

| Component | Status | Missing |
| --- | --- | --- |
${dynamicApiRows.map((item) => `| \`${item.component}\` | ${item.pass ? "pass" : "fail"} | ${item.missing.length ? item.missing.map((snippet) => `\`${snippet}\``).join(", ") : "none"} |`).join("\n")}

## Drawer APIs

| Drawer | Status | Missing |
| --- | --- | --- |
${drawerApiRows.map((item) => `| \`${item.component}\` | ${item.pass ? "pass" : "fail"} | ${item.missing.length ? item.missing.map((snippet) => `\`${snippet}\``).join(", ") : "none"} |`).join("\n")}

## Next Actions

${report.nextActions.map((item) => `- ${item}`).join("\n")}
`;

if (!checkMode) {
  writeFileSync(resolve(specDir, "crm-real-readiness-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(resolve(specDir, "crm-real-readiness-audit.md"), md);
}

console.log(`CRM real readiness audit: ${report.status}`);
console.log("Wrote specs/001-product-ui-foundation/crm-real-readiness-audit.md");
console.log("Wrote specs/001-product-ui-foundation/crm-real-readiness-audit.json");

if (checkMode && failedRows.length > 0) {
  console.error(`Failed CRM real readiness rows: ${failedRows.map((item) => item.id).join(", ")}`);
  process.exit(1);
}
