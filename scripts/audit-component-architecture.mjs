import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const storiesDir = path.join(root, "apps/docs/src/stories");
const crmSourcePath = path.join(root, "packages/crm/src/index.tsx");

const allowedStoryPrefixes = [
  "Foundations / Tokens",
  "Primitives / UI",
  "CRM / Shell / Components",
  "CRM / Shell / JourneyShellCanvas",
  "CRM / Image Coverage",
  "CRM / Layout",
  "CRM / Tasks",
  "CRM / Timeline",
  "CRM / Kanban",
  "CRM / Agenda",
  "CRM / Setup",
  "CRM / Access",
  "CRM / Subscription",
  "CRM / Billing",
  "CRM / Usage",
  "CRM / Approvals",
  "CRM / Config",
  "CRM / Inbox",
  "CRM / Operational",
  "CRM / Reports",
  "CRM / Agent",
  "CRM / Agents",
  "CRM / Profile",
  "CRM / Surface",
  "CRM / Internal",
  "CRM / Students",
  "CRM / Documents",
  "CRM / Finance",
  "CRM / Sales",
  "CRM / Retention",
  "CRM / Support",
  "CRM / Data Quality",
  "CRM / Advanced States"
];

const nativeControlPatterns = [
  ["button", /<button\b/g],
  ["input", /<input\b/g],
  ["select", /<select\b/g],
  ["textarea", /<textarea\b/g],
  ["anchor", /<a\b/g]
];

const officialPrimitiveNames = [
  "Avatar",
  "Badge",
  "Button",
  "ButtonGroup",
  "Card",
  "Checkbox",
  "Chip",
  "ComposerInput",
  "DataTable",
  "Drawer",
  "FilterBar",
  "FilterChip",
  "Icon",
  "IconButton",
  "Input",
  "List",
  "ListItem",
  "Panel",
  "PasswordInput",
  "ProgressBar",
  "Radio",
  "Select",
  "SocialAuthButton",
  "StatusDot",
  "Stepper",
  "Tabs",
  "TaliyaLogo",
  "Toggle"
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function storyFiles() {
  return fs.readdirSync(storiesDir)
    .filter((file) => file.endsWith(".stories.tsx"))
    .map((file) => path.join(storiesDir, file));
}

function storyTitle(source) {
  return source.match(/title:\s*["']([^"']+)["']/)?.[1] ?? null;
}

function componentBlocks(source) {
  const blocks = [];
  const re = /export\s+function\s+([A-Z][A-Za-z0-9_]*)[\s\S]*?(?=\nexport\s+(?:function|interface|type|const)\s+[A-Z]|\nconst\s+[A-Z]|\nfunction\s+[A-Z]|$)/g;
  let match;
  while ((match = re.exec(source))) {
    blocks.push({ name: match[1], body: match[0] });
  }
  return blocks;
}

function countMatches(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

const stories = storyFiles().map((filePath) => {
  const source = read(filePath);
  const title = storyTitle(source);
  return {
    file: path.relative(root, filePath).replaceAll("\\", "/"),
    title,
    validTitle: Boolean(title && allowedStoryPrefixes.some((prefix) => title === prefix || title.startsWith(`${prefix} /`))),
    legacyBatchTitle: Boolean(title && /(^| \/ )Batch \d+($| \/ )/.test(title))
  };
});

const crmSource = read(crmSourcePath);
const nativeControlDebt = componentBlocks(crmSource)
  .map(({ name, body }) => {
    const nativeControls = Object.fromEntries(
      nativeControlPatterns
        .map(([kind, pattern]) => [kind, countMatches(body, pattern)])
        .filter(([, count]) => count > 0)
    );
    const primitiveUses = officialPrimitiveNames.filter((componentName) => {
      return new RegExp(`<${componentName}(\\s|>|\\.)`).test(body);
    });

    return { component: name, nativeControls, primitiveUses };
  })
  .filter((row) => Object.keys(row.nativeControls).length > 0);

const nativeControlTotals = nativeControlDebt.reduce((totals, row) => {
  for (const [kind, count] of Object.entries(row.nativeControls)) {
    totals[kind] = (totals[kind] ?? 0) + count;
  }
  return totals;
}, {});

const justifiedRootComponents = new Set([
  "CrmBrowserToolbarButton",
  "CrmShellAvatar",
  "CrmOperationalRow",
  "ActivityFeed",
  "OperationActivityTable",
  "KanbanCard",
  "MiniCalendar",
  "SetupShell",
  "SetupChoiceCard",
  "SetupImportSourceCard",
  "SetupReviewPanel",
  "AccessFooterLinks",
  "IntegrationStatusRow",
  "CommentThread",
  "TaskDrawer",
  "ReplacementDrawer",
  "WeeklyHoursGrid",
  "RoleCard",
  "PermissionRoleCard",
  "PaymentMethodRow",
  "UsageOriginRow",
  "ModeCard",
  "PreflightChecklist",
  "ScenarioList",
  "FinancePriorityPanel",
  "PaymentCaseCard",
  "PipelineCard",
  "TrialClassCard",
  "EnrollmentChecklist",
  "RiskCard",
  "PageQuickFilters",
  "WaitlistPanel",
  "TaskQueueList",
  "TaskTable"
]);

const justifiedRootContracts = {
  CrmBrowserToolbarButton: "Toolbar browser control: native button is the component root; icon rendering is delegated to `Icon`.",
  CrmShellAvatar: "Account/avatar trigger: native button is the component root; avatar visual is delegated to `Avatar`.",
  CrmOperationalRow: "Operational row: native button is the full compound row root; icon, status, and chip visuals are delegated to official primitives.",
  ActivityFeed: "Timeline event root/action: native button represents an interactive event row, not a standalone button primitive.",
  OperationActivityTable: "Operation activity table row: native button is the full row root for row-open behavior; header/action controls use official primitives.",
  KanbanCard: "Interactive kanban card anatomy: native buttons are card-level roots for draggable/selectable card affordances.",
  MiniCalendar: "Calendar day cell anatomy: native button is the semantic day cell root.",
  SetupShell: "Shell account selector root: native button wraps an avatar/account compound control.",
  SetupChoiceCard: "Selectable setup option card: native button is the full card root.",
  SetupImportSourceCard: "Selectable import-source card: native button is the full card root.",
  SetupReviewPanel: "Review-area selector: native button is the compound published-area root; checkbox state uses `Checkbox`.",
  AccessFooterLinks: "Footer legal/navigation link: native anchor is required semantic navigation.",
  IntegrationStatusRow: "Provider row action: native button is the interactive status row root.",
  CommentThread: "Comment row action: native button is the interactive comment/root affordance.",
  TaskDrawer: "Checklist row action: native button is a row-level task completion root.",
  ReplacementDrawer: "Replacement option row: native button is the selectable option-card root.",
  WeeklyHoursGrid: "Schedule grid controls: native buttons are day/slot cells with domain-specific grid anatomy.",
  RoleCard: "Selectable role card: native button is the compound card root.",
  PermissionRoleCard: "Selectable permission-role summary: native button is the complete compound card root; icon, status, and checklist visuals use official primitives.",
  PaymentMethodRow: "Selectable payment method row: native button is the compound row root.",
  UsageOriginRow: "Usage origin row: native button is the expandable/inspectable row root.",
  ModeCard: "Selectable agent mode card: native button is the compound card root.",
  PreflightChecklist: "Preflight checklist item/action: native buttons are checklist-row roots where the whole row is interactive.",
  ScenarioList: "Scenario list item: native button is the selectable row root.",
  FinancePriorityPanel: "Finance priority row: native button is the full source-derived row root; icon and panel visuals are delegated to official primitives.",
  PaymentCaseCard: "Payment case card: native buttons are card-level domain roots; icon actions use `IconButton`.",
  PipelineCard: "Pipeline card: native button is the selectable card root; icon actions use `IconButton`.",
  TrialClassCard: "Trial class card: native button is the selectable row/card root.",
  EnrollmentChecklist: "Enrollment checklist row: native button is the completion/selection row root.",
  RiskCard: "Retention risk card: native button is the card-level action root.",
  PageQuickFilters: "Quick filter row: native button is the full selectable filter row root; icon and count visuals are delegated to official primitives.",
  WaitlistPanel: "Waitlist row: native button is the full selectable domain-row root; status visuals are delegated to `Chip` and the container to `Panel`.",
  TaskQueueList: "Task queue row: native button is the selectable task row root.",
  TaskTable: "Task table row/action anatomy: native button is the row-level domain action, while generic actions use primitives."
};

const needsPrimitiveComponents = new Set([]);

function primitiveReuseStatus(row) {
  if (needsPrimitiveComponents.has(row.component)) {
    return {
      status: "Primitive faltante",
      action: "Extrair primitive oficial antes de substituir; nao simular com outro controle."
    };
  }

  if (justifiedRootComponents.has(row.component)) {
    return {
      status: "Justificado",
      action: justifiedRootContracts[row.component] ?? "Native element is the documented official root anatomy for this compound component."
    };
  }

  return {
    status: "Refatorar",
    action: "Trocar controles internos por primitives oficiais equivalentes ou extrair novo primitive antes do proximo batch."
  };
}

const classifiedNativeControlDebt = nativeControlDebt.map((row) => ({
  ...row,
  classification: primitiveReuseStatus(row)
}));
const primitiveReuseClassification = {
  justified: classifiedNativeControlDebt.filter((row) => row.classification.status === "Justificado").length,
  refactor: classifiedNativeControlDebt.filter((row) => row.classification.status === "Refatorar").length,
  missingPrimitive: classifiedNativeControlDebt.filter((row) => row.classification.status === "Primitive faltante").length
};

const report = {
  storyArchitecture: {
    total: stories.length,
    invalidTitleCount: stories.filter((story) => !story.validTitle).length,
    legacyBatchTitleCount: stories.filter((story) => story.legacyBatchTitle).length,
    invalidTitles: stories.filter((story) => !story.validTitle),
    legacyBatchTitles: stories.filter((story) => story.legacyBatchTitle)
  },
  crmPrimitiveReuse: {
    scannedComponents: componentBlocks(crmSource).length,
    componentsWithNativeControls: nativeControlDebt.length,
    nativeControlTotals,
    primitiveReuseClassification,
    nativeControlDebt: classifiedNativeControlDebt
  }
};

const reportPath = path.join(root, "specs/001-product-ui-foundation/component-architecture-audit.json");
if (!checkMode) fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

function markdownTableCell(value) {
  return String(value).replaceAll("|", "\\|");
}

function writeMarkdownReport(reportValue) {
  const rows = reportValue.crmPrimitiveReuse.nativeControlDebt.map((row) => {
    const classification = row.classification;
    const nativeControls = Object.entries(row.nativeControls)
      .map(([kind, count]) => `${kind}:${count}`)
      .join(", ");
    const primitiveUses = row.primitiveUses.length > 0 ? row.primitiveUses.join(", ") : "-";

    return `| \`${markdownTableCell(row.component)}\` | ${markdownTableCell(nativeControls)} | ${markdownTableCell(primitiveUses)} | ${classification.status} | ${markdownTableCell(classification.action)} |`;
  });

  const markdown = [
    "# Component Architecture Audit",
    "",
    "Generated by `pnpm components:audit:update`.",
    "",
    "## Storybook architecture",
    "",
    `- Stories scanned: ${reportValue.storyArchitecture.total}`,
    `- Invalid titles: ${reportValue.storyArchitecture.invalidTitleCount}`,
    `- Legacy \`CRM / Batch\` titles: ${reportValue.storyArchitecture.legacyBatchTitleCount}`,
    "- Removed obsolete gallery story: `apps/docs/src/stories/CrmBatch9Patterns.stories.tsx`",
    "",
    "Accepted namespaces:",
    "",
    "- `Foundations / Tokens`",
    "- `Primitives / UI`",
    "- `CRM / Shell / Components`",
    "- `CRM / Image Coverage`",
    "- `CRM / <official family> / <component>`",
    "",
    "## CRM primitive reuse",
    "",
    `- CRM function components scanned: ${reportValue.crmPrimitiveReuse.scannedComponents}`,
    `- Components with native controls: ${reportValue.crmPrimitiveReuse.componentsWithNativeControls}`,
    `- Justified compound-root controls: ${reportValue.crmPrimitiveReuse.primitiveReuseClassification.justified}`,
    `- Controls requiring refactor: ${reportValue.crmPrimitiveReuse.primitiveReuseClassification.refactor}`,
    `- Controls requiring a missing primitive: ${reportValue.crmPrimitiveReuse.primitiveReuseClassification.missingPrimitive}`,
    "- Native control totals:",
    ...Object.entries(reportValue.crmPrimitiveReuse.nativeControlTotals).map(([kind, count]) => `  - ${kind}: ${count}`),
    "",
    "Native controls are not automatically wrong. They are allowed only when the native element is the official root anatomy of the component, such as an interactive card, row, calendar day, or browser toolbar control. They are debt when they recreate an existing primitive control such as `Button`, `IconButton`, `Input`, `Checkbox`, `Select`, `Tabs`, `Chip`, `FilterChip`, `ComposerInput`, or `DataTable`.",
    "",
    "| Component | Native controls | Official primitives already used | Status | Required action |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
    "",
    "## Closure rule",
    "",
    "This debt is closed only when every `Refatorar` row is converted to official primitives, and every `Primitive faltante` row is resolved by extracting the missing primitive. `Justificado` rows are allowed only because their action cell documents the deliberate component anatomy contract."
  ].join("\n");

  const markdownPath = path.join(root, "specs/001-product-ui-foundation/component-architecture-audit.md");
  if (!checkMode) fs.writeFileSync(markdownPath, `${markdown}\n`);
  return markdownPath;
}

const markdownPath = writeMarkdownReport(report);

if (checkMode) {
  const hasStoryFailure = report.storyArchitecture.invalidTitleCount > 0 || report.storyArchitecture.legacyBatchTitleCount > 0;
  const hasPrimitiveReuseFailure =
    report.crmPrimitiveReuse.primitiveReuseClassification.refactor > 0 ||
    report.crmPrimitiveReuse.primitiveReuseClassification.missingPrimitive > 0;
  if (hasStoryFailure || hasPrimitiveReuseFailure) {
    console.error("Component architecture check failed.");
    console.error(JSON.stringify({
      storyArchitecture: report.storyArchitecture,
      primitiveReuseClassification: report.crmPrimitiveReuse.primitiveReuseClassification,
      unresolvedNativeControls: report.crmPrimitiveReuse.nativeControlDebt.filter((row) => row.classification.status !== "Justificado")
    }, null, 2));
    process.exit(1);
  }
}

console.log(checkMode ? "Component architecture check passed." : `Component architecture audit written to ${path.relative(root, reportPath)} and ${path.relative(root, markdownPath)}`);
console.log(`Story titles: ${report.storyArchitecture.total} scanned, ${report.storyArchitecture.invalidTitleCount} invalid, ${report.storyArchitecture.legacyBatchTitleCount} legacy batch titles.`);
console.log(`CRM primitive reuse: ${report.crmPrimitiveReuse.scannedComponents} components scanned, ${report.crmPrimitiveReuse.componentsWithNativeControls} components contain native compound roots.`);
console.log(`CRM primitive reuse classification: ${JSON.stringify(report.crmPrimitiveReuse.primitiveReuseClassification)}`);
console.log(`Native control totals: ${JSON.stringify(report.crmPrimitiveReuse.nativeControlTotals)}`);
